// maxiGos v7 > mgosFile.js
if(!mxG.G.prototype.createFile)
{
mxG.fr("New","Nouveau");
mxG.fr("Open","Ouvrir");
mxG.fr("Close","Fermer");
mxG.fr("Save","Enregistrer");
mxG.fr("Save on your device","Enregistrer sur votre machine");
mxG.fr("Send","Envoyer");
mxG.fr("Send by email","Envoyer par email");
mxG.fr("Goban size","Taille du goban");
mxG.fr("Email:","Email :");
mxG.fr("Create","Créer");
mxG.fr("Add","Ajouter");
mxG.fr("OK","OK");
mxG.fr("Cancel","Annuler");
mxG.fr("Values between 5 and 19:","Valeurs entre 5 et 19 :");
mxG.fr("Values between 1 and 52:","Valeurs entre 1 et 52 :");
mxG.fr("Click here to open a sgf file","Cliquer ici pour ouvrir un fichier sgf");
mxG.fr("File name:","Nom du fichier :");
mxG.fr("Your browser cannot do this!","Votre navigateur ne peut pas faire ça !");
mxG.fr("Error","Erreur");
mxG.fr("Untitled","SansTitre");
mxG.fr("This is not a sgf file!","Ce n'est pas un fichier sgf !");
mxG.G.prototype.cleanUpSZ=function(s)
{
	var a,r;
	s=s.replace(/\s/g,"");
	a=s.match(/^([0-9]+)([x:]([0-9]+))?$/);
	if(a)
	{
		r=Math.min(this.szMax,Math.max(this.szMin,a[1]-0))+"";
		if(a[3]) r+=":"+Math.min(52,Math.max(1,a[3]-0));
	}
	else r="19";
	// return a string like n or m:n where m and n are numbers between 1 and 52
	return r;
};
mxG.G.prototype.doNewOK=function(a)
{
	var aST=this.getInfoS("ST"),
		aSZ=this.getE("DimensionInput").value,
		aN;
	if(a=="create")
	{
		if(this.getE("WindowMenuDiv"))
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
	if(parseInt(aST)) aN.P["ST"]=[aST];
	this.backNode(aN);
	if(this.hasC("Tree")) this.hasToSetTree=1;
	this.hideGBox("New");
};
mxG.G.prototype.doNew=function()
{
	var s,a;
	if(this.hasC("Menu")) this.toggleMenu("File",0);
	if(this.gBox=="New") {this.hideGBox("New");return;}
	if(!this.getE("NewDiv"))
	{
		a=" tabindex=\"0\"";
		s="<div class=\"mxShowContentDiv\""+a+">";
		s+="<h1>"+this.local("Goban size")+"</h1>";
		s+="<div class=\"mxP\">";
		s+="<label for=\""+this.n+"DimensionInput\">"+this.local("Values between "+this.szMin+" and "+this.szMax+":")+"</label>";
		s+=" <input id=\""+this.n+"DimensionInput\" name=\""+this.n+"DimensionInput\" type=\"text\" value=\""+this.DX+"x"+this.DY+"\" size=\"5\">";
		s+="</div>";
		s+="</div>";
		s+="<div class=\"mxOKDiv\">";
		s+="<button type=\"button\" onclick=\""+this.g+".doNewOK('create')\"><span>"+this.local("Create")+"</span></button>";
		s+="<button type=\"button\" onclick=\""+this.g+".doNewOK('add')\"><span>"+this.local("Add")+"</span></button>";
		s+="<button type=\"button\" onclick=\""+this.g+".hideGBox('New')\"><span>"+this.local("Cancel")+"</span></button>";
		s+="</div>";
		this.createGBox("New").innerHTML=s;
	}
	else this.getE("DimensionInput").value=this.DX+"x"+this.DY;
	this.showGBox("New");
};
mxG.G.prototype.doOpenOK=function()
{
	var a,r,e=this.getE("SgfFileInputAlertDiv");
	r=new FileReader();
	r.gos=this;
	r.f=this.getE("SgfFile").files[0];
	if(e)
	{
		if((r.f.name?r.f.name:r.f.fileName).match(/\.sgf$/)) e.innerHTML="";
		else {e.innerHTML=this.local("This is not a sgf file!");return;}
	}
	r.onload=function(evt)
	{
		var s,m,c;
		s=evt.target.result;
		if(!this.c)
		{
			if(m=s.match(/CA\[([^\]]*)\]/)) c=m[1].toUpperCase();else c="ISO-8859-1";
			if(c!="UTF-8")
			{
				// retry with charset found in sgf
				this.c=c;
				this.readAsText(this.f,c);
				return;
			}
		}
		this.gos.mayHaveExtraTags=0;
		if(this.gos.getE("WindowMenuDiv")) this.gos.rN.cN=this.gos.cN;
		this.gos.rN=new mxG.P(s,this.sgfLoadCoreOnly,this.sgfLoadMainOnly);
		if(this.gos.getE("WindowMenuDiv")) this.gos.rNs.push(this.gos.rN);
		this.gos.backNode(this.gos.kidOnFocus(this.gos.rN));
		if(this.gos.hasC("Tree")) this.gos.hasToSetTree=1;
		this.gos.rN.sgf=(this.f.name?this.f.name:this.f.fileName);
		this.gos.hideGBox("Open");
	};
	r.readAsText(r.f);
};
mxG.G.prototype.doOpen=function()
{
	var s,a;
	if(this.hasC("Menu")) this.toggleMenu("File",0);
	if(this.gBox=="Open") {this.hideGBox("Open");return;}
	if(!this.getE("OpenDiv")) this.createGBox("Open");
	a=" tabindex=\"0\"";
	s="<div class=\"mxShowContentDiv\""+a+">";
	s+="<h1>"+this.local("Open")+"</h1>";
	if(mxG.canOpen())
	{
		s+="<div class=\"mxP\">";
		s+="<div id=\""+this.n+"SgfFileInputAlertDiv\" class=\"mxErrorDiv\"></div>";
		s+="<button type=\"button\" id=\""+this.n+"SgfFileInput\" onclick=\""+"document.getElementById('"+this.n+"SgfFile"+"').click();\"><span>"+this.local("Click here to open a sgf file")+"</span></button>";
		s+="</div>";
		s+="</div>";
		s+="<div class=\"mxOKDiv\">";
		s+="<input type=\"file\" id=\""+this.n+"SgfFile\" onchange=\""+this.g+".doOpenOK()\">";
		s+="<button type=\"button\" onclick=\""+this.g+".hideGBox('Open')\"><span>"+this.local("Close")+"</span></button>";
		s+="</div>";
	}
	else
	{
		s+="<div class=\"mxP\">";
		s+=this.local("Your browser cannot do this!");
		s+="</div>";
		s+="</div>";
		s+="<div class=\"mxOKDiv\">";
		s+="<button type=\"button\" onclick=\""+this.g+".hideGBox('Open')\"><span>"+this.local("Close")+"</span></button>";
		s+="</div>";
	}
	this.getE("OpenDiv").innerHTML=s; // replace content anyway to fire again the input file onchange event
	this.showGBox("Open");
};
mxG.G.prototype.doClose=function()
{
	var k,km,n=0;
	km=this.rNs.length;
	if(this.hasC("Menu")) this.toggleMenu("File",0);
	if(km<2)
	{
		this.mayHaveExtraTags=0;
		this.rN=new mxG.P("",0,0);
		this.rN.sgf="";
		this.rNs=[this.rN];
		this.backNode(this.kidOnFocus(this.rN));
	}
	else
	{
		k=this.rNs.indexOf(this.rN);
		if(k>=0) this.rNs.splice(k,1);
		this.rN=this.rNs[0];
		this.backNode(this.rN.cN);
	}
	if(this.hasC("Tree")) this.hasToSetTree=1;
	this.updateAll();
};
mxG.G.prototype.doSaveOK=function()
{
	var f=this.getE("SaveFileName").value;
	if(f)
	{
		if(!f.match(/\.sgf$/)) f+=".sgf";
		this.rN.sgf=f;
		this.getE("SaveFileName").value=f;
		this.downloadSgf(f);
		this.getE("SaveForm").submit(); // just for autocompletion
	}
	this.hideGBox("Save");
};
mxG.G.prototype.doSave=function()
{
	var e,s,a,k,km,i,m,f;
	if(this.hasC("Menu")) this.toggleMenu("File",0);
	if(!this.canDownloadSgf()) {this.popupSgf();return;}
	if(this.gBox=="Save") {this.hideGBox("Save");return;}
	if(!this.getE("SaveDiv"))
	{
		a=" tabindex=\"0\"";
		// use a form to store input values for autocompletion usage
		s="<form class=\"mxShowContentForm\" id=\""+this.n+"SaveForm\" action=\"javascript:void(0)\" method=\"post\">";
		s+="<div class=\"mxShowContentDiv\""+a+">";
		s+="<h1>"+this.local("Save on your device")+"</h1>";
		s+="<div class=\"mxP\"><label for=\""+this.n+"SaveFileName\">"+this.local("File name:")+" </label>";
		s+="<input id=\""+this.n+"SaveFileName\" name=\"FileName\" type=\"text\" value=\"\" size=\"32\">";
		s+="</div>";
		s+="</div>";
		s+="<div class=\"mxOKDiv\">";
		s+="<button type=\"button\" onclick=\""+this.g+".doSaveOK()\"><span>"+this.local("OK")+"</span></button>";
		s+="<button type=\"button\" onclick=\""+this.g+".hideGBox('Save')\"><span>"+this.local("Cancel")+"</span></button>";
		s+="</div>";
		s+="</form>";
		this.createGBox("Save").innerHTML=s;
	}
	f=this.rN.sgf?this.rN.sgf:(this.local("Untitled")+".sgf");
	this.getE("SaveFileName").value=f;
	this.showGBox("Save");
};
mxG.G.prototype.doSendOK=function()
{
	var m='mailto:'+this.getE("SendEmail").value+'?subject=maxiGos&body='+encodeURIComponent(this.buildSgf());
	window.location.href=m;	this.hideGBox("Send");
	this.getE("SendForm").submit(); // just for autocompletion
};
mxG.G.prototype.doSend=function()
{
	var s,a;
	if(this.hasC("Menu")) this.toggleMenu("File",0);
	if(this.gBox=="Send") {this.hideGBox("Send");return;}
	if(!this.getE("SendDiv"))
	{
		a=" tabindex=\"0\"";
		// use a form to store input values for autocompletion usage
		s="<form class=\"mxShowContentForm\" id=\""+this.n+"SendForm\" action=\"javascript:void(0)\" method=\"post\">";
		s+="<div class=\"mxShowContentDiv\""+a+">";
		s+="<h1>"+this.local("Send by email")+"</h1>";
		s+="<div class=\"mxP\"><label for=\""+this.n+"Email\">"+this.local("Email:")+" </label>";
		s+="<input id=\""+this.n+"SendEmail\" name=\""+this.n+"SendEmail\" type=\"text\" value=\"\" size=\"40\"></div>";
		s+="</div>";
		s+="<div class=\"mxOKDiv\">";
		s+="<button type=\"button\" onclick=\""+this.g+".doSendOK()\"><span>"+this.local("OK")+"</span></button>";
		s+="<button type=\"button\" onclick=\""+this.g+".hideGBox('Send')\"><span>"+this.local("Cancel")+"</span></button>";
		s+="</div>";
		s+="</form>";
		this.createGBox("Send").innerHTML=s;
	}
	this.showGBox("Send");
};
mxG.G.prototype.buildFileBtns=function()
{
	var s="";
	s+=this.buildBtn({n:"New",v:this.local("New")});
	s+=this.buildBtn({n:"Open",v:this.local("Open")});
	s+=this.buildBtn({n:"Close",v:this.local("Close")});
	s+=this.buildBtn({n:"Save",v:this.local("Save")});
	s+=this.buildBtn({n:"Send",v:this.local("Send")});
	return s;
};
mxG.G.prototype.createFile=function()
{
	var z=this.k;
	if(!this.szMin) this.szMin=1;
	if(!this.szMax) this.szMax=52;
	window.addEventListener("unload",function(ev)
		{
			if(mxG.D[z].sgfPopup&&!mxG.D[z].sgfPopup.closed)
				mxG.D[z].sgfPopup.close();
		},false);
	return "";
};
}
