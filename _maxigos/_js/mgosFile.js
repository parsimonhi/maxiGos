// maxiGos v8 > mgosFile.js
if(!mxG.G.prototype.createFile)
{
mxG.fr(" Close ","Fermer");
mxG.fr("Add","Ajouter");
mxG.fr("Alert","Alerte");
mxG.fr("Cancel","Annuler");
mxG.fr("Click here to open a sgf file","Cliquer ici pour ouvrir un fichier sgf");
mxG.fr("Close","Fermer");
mxG.fr("Create","Créer");
mxG.fr("Email:","Email :");
mxG.fr("Error","Erreur");
mxG.fr("File name:","Nom du fichier :");
mxG.fr("Goban size","Taille du goban");
mxG.fr("New","Nouveau");
mxG.fr("OK","OK");
mxG.fr("Open","Ouvrir");
mxG.fr("Save","Enregistrer");
mxG.fr("Save on your device","Enregistrer sur votre machine");
mxG.fr("Send","Envoyer");
mxG.fr("Send by email","Envoyer par email");
mxG.fr("This is not a sgf file!","Ce n'est pas un fichier sgf !");
mxG.fr("Untitled","SansTitre");
mxG.fr("Values between 1 and 52:","Valeurs entre 1 et 52 :");
mxG.fr("Your browser cannot do this!","Votre navigateur ne peut pas faire ça !");
mxG.G.prototype.canOpen=function()
{
	let r;
	return !(typeof FileReader=='undefined')&&(r=new FileReader())&&(r.readAsText);
}
mxG.G.prototype.cleanUpSZ=function(s)
{
	// return a string like n or m:n where m and n are numbers between 1 and 52
	let a=s.replace(/[^0-9:x]/g,"").match(/^([0-9]+)([x:]([0-9]+))?$/);
	if(a)
	{
		let DX=mxG.min1max52(a[1]),DY=DX;
		if(a[3])DY=mxG.min1max52(a[3]);
		return (DX==DY)?DX+"":(DX+":"+DY);
	}
	return "19";
}
mxG.G.prototype.doAlert=function(msg)
{
	let s=`<h1 tabindex="0">${this.local("Alert")}</h1><p>${msg}</p>`;
	// do not use "OK" because "OK" doesn't have the same translation
	// when it is used with "Cancel" or alone
	this.doDialog("Alert",s,[{n:" Close "}]);
}
mxG.G.prototype.doNewOK=function(a)
{
	let aST=this.getInfo("ST"),aSZ=this.getE("DimensionInput").value,aN;
	if(a=="Create")
	{
		if(this.getE("WindowMenu"))
		{
			this.rN.cN=this.cN;
			this.rNs.push(this.rN=new mxG.N(null,null,null));
		}
		else // no need to keep previous tree
		{
			this.rN.Kid=[];
			this.rN.Focus=0;
		}
		this.rN.sgf="";
	}
	aN=new mxG.N(this.rN,"FF","4");
	aN.P["CA"]=["UTF-8"];
	aN.P["GM"]=["1"];
	aN.P["SZ"]=[this.cleanUpSZ(aSZ)];
	aN.P["AP"]=["maxiGos:"+mxG.V];
	if(parseInt(aST))aN.P["ST"]=[aST];
	this.backNode(aN);
	if(this.hasC("Tree"))this.hasToSetTree=1;
	this.updateAll();
}
mxG.G.prototype.doAddOK=function()
{
	this.doNewOK("Add");
}
mxG.G.prototype.doCreateOK=function()
{
	this.doNewOK("Create");
}
mxG.G.prototype.doNew=function()
{
	let btns=[{n:"Add",a:"Add"},{n:"Create",a:"Create"},{n:"Cancel"}],
		sz=this.DX+"x"+this.DY,id=`${this.n}DimensionInput`,s;
	s=`<h1 tabindex="0">${this.local("Goban size")}</h1>`
	+`<p>`
	+`<label for="${id}">${this.local("Values between 1 and 52:")} </label>`
	+`<input id="${id}" name="${this.n}DimensionInput" type="text" size="5" value="${sz}">`
	+`</p>`;
	this.doDialog("New",s,btns);
}
mxG.G.prototype.doOpenOK=function()
{
	let a,r;
	r=new FileReader();
	r.gos=this;
	r.f=this.getE("SgfFile").files[0];
	if(!((r.f.name?r.f.name:r.f.fileName).match(/\.sgf$/)))
	{
		this.doAlert(this.local("This is not a sgf file!"));
		return;
	}
	r.addEventListener('load',function(ev)
	{
		let s=ev.target.result,m,c;
		if(!this.c)
		{
			if(m=s.match(/CA\[([^\]]*)\]/))c=m[1].toUpperCase();else c="ISO-8859-1";
			if(c!="UTF-8")
			{
				// retry with charset found in sgf
				this.c=c;
				this.readAsText(this.f,c);
				return;
			}
		}
		if(this.gos.getE("WindowMenu"))this.gos.rN.cN=this.gos.cN;
		this.gos.rN=new mxG.P(s,this.sgfLoadCoreOnly,this.sgfLoadMainOnly);
		if(this.gos.getE("WindowMenu"))this.gos.rNs.push(this.gos.rN);
		this.gos.backNode(this.gos.kidOnFocus(this.gos.rN));
		if(this.gos.hasC("Tree"))this.gos.hasToSetTree=1;
		this.gos.rN.sgf=(this.f.name?this.f.name:this.f.fileName);
		this.gos.updateAll();
	});
	r.readAsText(r.f);
}
mxG.G.prototype.doOpen=function()
{
	if(this.canOpen())
	{
		let s=`<h1 tabindex="0">${this.local("Open")}</h1>`
		+`<p>`
		+`<button id="${this.n}SgfFileInput" onclick="document.getElementById('${this.n}SgfFile').click()">${this.local("Click here to open a sgf file")}</button>`
		// unfortunately, accept attribute does not work well for .sgf files
		+`<input type="file" id="${this.n}SgfFile" onchange="${this.g}.doOpenOK()">`
		+`</p>`;
		this.doDialog("Open",s,[{n:" Close "}]);
	}
	else this.doAlert(this.local("Your browser cannot do this!"));
}
mxG.G.prototype.doClose=function()
{
	let k,km,n=0;
	km=this.rNs.length;
	if(this.hasC("Menu"))this.toggleMenu("File",0);
	if(km<2)
	{
		this.rN=new mxG.P("",0,0);
		this.rN.sgf="";
		this.rNs=[this.rN];
		this.backNode(this.kidOnFocus(this.rN));
	}
	else
	{
		k=this.rNs.indexOf(this.rN);
		if(k>=0)this.rNs.splice(k,1);
		this.rN=this.rNs[0];
		this.backNode(this.rN.cN);
	}
	if(this.hasC("Tree"))this.hasToSetTree=1;
	this.updateAll();
}
mxG.G.prototype.doSaveOK=function()
{
	let f=this.getE("SaveFileName").value;
	if(f)
	{
		if(!f.match(/\.sgf$/))f+=".sgf";
		this.rN.sgf=f;
		this.getE("SaveFileName").value=f;
		this.doDownloadSgf(f);
	}
	this.updateAll();
}
mxG.G.prototype.doSave=function()
{
	let f,
		s=`<h1 tabindex="0">${this.local("Save on your device")}</h1>`
		+`<p>`
		+`<label for="${this.n}SaveFileName">${this.local("File name:")} </label>`
		+`<input id="${this.n}SaveFileName" name="FileName" type="text" size="32">`
		+`</p>`;
	this.doDialog("Save",s,[{n:"OK",a:"Save"},{n:"Cancel"}]);
	f=this.rN.sgf?this.rN.sgf:(this.local("Untitled")+".sgf");
	this.getE("SaveFileName").value=f;
}
mxG.G.prototype.doSendOK=function()
{
	let m="mailto:";
	m+=this.getE("SendEmail").value;
	m+="?subject=maxiGos";
	m+="&body="+encodeURIComponent(this.buildSgf());
	window.location.href=m;
	// let a=`<a href="${m}" target=_blank rel=noopener noreferrer>Send</a>`;
	this.updateAll();
}
mxG.G.prototype.doSend=function()
{
	let s=`<h1 tabindex="0">${this.local("Send by email")}</h1>`
		+`<p>`
		+`<label for="${this.n}SendEmail">${this.local("Email:")} </label>`
		+`<input id="${this.n}SendEmail" name="${this.n}SendEmail" type="text" size="40">`
		+`</p>`;
	this.doDialog("Send",s,[{n:"OK",a:"Send"},{n:"Cancel"}]);
}
mxG.G.prototype.createFile=function()
{
	// menuFileItems is used by the "Menu" component
	this.menuFileItems=
	[
		{n:"New",v:this.local("New")},
		{n:"Open",v:this.local("Open")},
		{n:"Close",v:this.local("Close")},
		{n:"Save",v:this.local("Save")},
		{n:"Send",v:this.local("Send")}
	];
	return "";
}
}
