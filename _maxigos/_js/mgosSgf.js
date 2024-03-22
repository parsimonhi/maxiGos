// maxiGos v8 > mgosSgf.js
if(!mxG.G.prototype.createSgf)
{
mxG.xyProps=new Set(["B","W","AB","AW","AE","LB","MA","TR","SQ","CR",
	"VW","AR","DD","LN","SL"]);
mxG.fr(" Close ","Fermer");
mxG.fr("Cancel","Annuler");
mxG.fr("OK","OK");
mxG.fr("SGF","SGF");
mxG.fr("SGF_Long","Télécharger le SGF");
mxG.en("SGF_Long","Download SGF");
mxG.nl2br=function(s)
{
	return (s+'').replace(/\r\n|\n\r|\r|\n/g,'<br>');
}
mxG.sgfEsc=function(s)
{
	return (s+'').replace(/([^\\\]]?)(\\|])/g,'$1'+"\\"+'$2');
}
mxG.G.prototype.runTransform=function(x,s)
{
	let n1,n2,n3,n4,r,D,DX,DY;
	// assume this.transform > 0
	if(x=='SZ')
	{
		D=s.replace(/[^0-9:]/g,"").match(/^([0-9]+)(:([0-9]+))?$/);
		if(D){DX=mxG.min1max52(D[1]);DY=D[3]?mxG.min1max52(D[3]):DX;}
		else DX=DY=19;
		if(this.transform==3)r=DY+((DX==DY)?"":(":"+DX));
		else r=DX+((DX==DY)?"":(":"+DY));
		this.sz=r;
		return r;
	}
	if(mxG.xyProps.has(x))
	{
		D=this.sz.split(":");
		DX=parseInt(D[0]);
		DY=((D.length>1)?parseInt(D[1]):DX);
		if(s.match(/^[a-zA-Z]{2}/))
		{
			let is5=(x!='LB')&&s.match(/^[a-zA-Z]{2}:[a-zA-Z]{2}$/);
			n1=s.c2n(0);
			n2=s.c2n(1);
			if(this.transform==3){if((n1>DY)||(n2>DX))return s;}
			else if((n1>DX)||(n2>DY))return s;
			if(is5)
			{
				n3=s.c2n(3);
				n4=s.c2n(4);
				if(this.transform==3){if((n3>DY)||(n4>DX))return s;}
				else if((n3>DX)||(n4>DY))return s;
			}
			if(this.transform==1)
			{
				if(is5)
				{
					r=this.xy2s(n1,DY+1-n4);
					r+=":"+this.xy2s(n3,DY+1-n2);
				}
				else r=this.xy2s(n1,DY+1-n2);
			}
			else if(this.transform==2)
			{
				if(is5)
				{
					r=this.xy2s(DX+1-n3,n2);
					r+=":"+this.xy2s(DX+1-n1,n4);
				}
				else r=this.xy2s(DX+1-n1,n2);
			}
			else if(this.transform==3)
			{
				if(is5)
				{
					r=this.xy2s(n2,DY+1-n3);
					r+=":"+this.xy2s(n4,DY+1-n1);
				}
				else r=this.xy2s(n2,DY+1-n1);
			}
			if(x=='LB')r+=s.substring(2);
			return r;
		}
		return s;
	}
	return s;
}
mxG.G.prototype.buildAllSgf=function(aN,only,c)
{
	// build sgf tree starting at aN
	// if only&1, keep core props only
	// if only&2, keep main variation only
	// if only&4, keep variation on focus only (useful when show)
	// remove empty nodes
	let rc="\n",k,x,y,ym,aText="",first,keep;
	if(c===undefined)c=0;
	if(this.transform&&aN.Dad&&(aN.Dad==this.rN))this.sz=(aN.P['SZ']?aN.P['SZ']+"":"19");
	if((aN.Dad&&(aN.Dad==this.rN))||(aN.Dad&&(aN.Dad.Kid.length>1)))
	{
		if(only&4){if((aN.Dad==this.rN)&&(aN==this.kidOnFocus(aN.Dad)))aText+="(";}
		else if(only&2){if((aN.Dad==this.rN)&&(aN==aN.Dad.Kid[0]))aText+="(";}
		else if((aN.Dad==this.rN)&&(aN==aN.Dad.Kid[0]))aText+="(";
		else{aText+=(rc+"(");c=0;}
	}
	if(aN!=this.rN)
	{
		if(aText[aText.length-1]!="(")
		{
			if(aN.Dad&&aN.Dad.Dad&&(aN.Dad.Dad==this.rN)){aText+=rc;c=0;}
			else if(c>3){aText+=rc;c=0;}else c++;
		}
		first=1;
		for(x in aN.P)
			if(x.match(/^[A-Z]+$/)&&((only&1)?mxG.coreProps.has(x):1))
			{
				if(first){aText+=";";first=0;} // discard empty node
				if(aN.Dad&&(aN.Dad==this.rN)){aText+=rc;c=0;}
				else if((x=="TB")||(x=="TW")){aText+=rc;c=4;}
				aText+=x;
				ym=aN.P[x].length;
				for(y=0;y<ym;y++)
				{
					if(this.transform)
						aText+=("["+mxG.sgfEsc(this.runTransform(x,aN.P[x][y]))+"]");
					else aText+=("["+mxG.sgfEsc(aN.P[x][y])+"]");
				}
			}
	}
	if(aN.Kid&&aN.Kid.length)
	{
		if(only&4){if(aN!=this.cN)aText+=this.buildAllSgf(this.kidOnFocus(aN),only,c);}
		else if(only&2)aText+=this.buildAllSgf(aN.Kid[0],only,c);
		else for(k=0;k<aN.Kid.length;k++)aText+=this.buildAllSgf(aN.Kid[k],only,c);
	}
	if(only&4){if((aN.Dad==this.rN)&&(aN==this.kidOnFocus(aN.Dad)))aText+=")";}
	else if(only&2){if((aN.Dad==this.rN)&&(aN==aN.Dad.Kid[0]))aText+=")";}
	else{if((aN.Dad&&(aN.Dad==this.rN))||(aN.Dad&&(aN.Dad.Kid.length>1)))aText+=")";}
	return aText;
}
mxG.G.prototype.sgfMandatory=function()
{
	for(let a of this.rN.Kid)
	{
		a.P.FF=["4"];
		a.P.CA=[this.toCharset];
		a.P.GM=["1"];
		a.P.AP=["maxiGos:"+mxG.V];
	}
}
mxG.G.prototype.buildSomeSgf=function(only)
{
	this.sgfMandatory();
	return this.buildAllSgf(this.rN,only,0);
}
mxG.G.prototype.buildSgf=function()
{
	this.sgfMandatory();
	return this.buildAllSgf(this.rN,(this.sgfSaveCoreOnly?1:0)+(this.sgfSaveMainOnly?2:0),0);
}
mxG.G.prototype.popupSgf=function()
{
	// some browsers (chrome, safari !!!) don't support 'text/plain'
	// thus use default 'text/html'
	// use <pre> tag otherwise line breaks are replaced by spaces
	let s="<!DOCTYPE html><html><body><pre>\n"+this.buildSgf().noT()+"\n</pre></body></html>";
	if(this.sgfPopup&&!this.sgfPopup.closed)this.sgfPopup.close();
	this.sgfPopup=window.open();
	this.sgfPopup.document.open();
	this.sgfPopup.document.write(s);
	this.sgfPopup.document.close();
	this.sgfPopup.document.title="Sgf"; // not working in all browsers
}
mxG.G.prototype.canDownloadSgf=function()
{
	// also used by File component
	// seems downloaded file is always in UTF-8 (possible to change the charset?)
	// if toCharset is not UTF-8, don't download the file (just display sgf)
	if(this.toCharset!="UTF-8")return 0;
	return (typeof document.createElement('a').download==='string')?1:0;
}
mxG.G.prototype.doDownloadSgf=function(f)
{
	// also used by File component
	let u,a;
	if(this.canDownloadSgf())
	{
		// Big5, gb18030, Shift_JIS, ... are they usable here?
		u="data:application/octet-stream;charset=utf-8,";
		u+=encodeURIComponent(this.buildSgf());
		a=document.createElement('a');
		a.download=f;
		a.href=u;
		document.body.appendChild(a); // firefox requires the link to be in the body?
		a.click();
		a.remove();
	}
	else this.popupSgf(); // just display sgf in the browser
}
mxG.G.prototype.doSgfOK=function()
{
	let s=this.getE("EditSgfDialog").querySelector('textarea').value,sgf,k;
	if(s!=this.sgfBeforeEdit)
	{
		k=this.rNs.indexOf(this.rN);
		sgf=this.rN.sgf?this.rN.sgf:"";
		if(this.getE("WindowMenu"))
		{
			this.rN.cN=this.cN;
		}
		this.rN=new mxG.P(s,this.sgfLoadCoreOnly,this.sgfLoadMainOnly);
		this.rN.sgf=sgf;
		if(this.getE("WindowMenu"))this.rNs[k]=this.rN;
		this.backNode(this.kidOnFocus(this.rN));
		if(this.hasC("Tree"))this.hasToSetTree=1;
		this.updateAll();
	}
}
mxG.G.prototype.doEditSgf=function()
{
	let btns=[{n:"OK",a:"Sgf"},{n:"Cancel"}],s;
	s="<textarea>"+this.buildSgf()+"</textarea>";
	this.doDialog("EditSgf",s,btns);
	this.sgfBeforeEdit=this.getE("EditSgfDialog").querySelector('textarea').value;
}
mxG.G.prototype.doShowSgf=function()
{
	this.doDialog("ShowSgf",this.buildSgf().noT(),[{n:" Close "}]);
}
mxG.G.prototype.doSgf=function()
{
	if(this.sgfAction=="download")
		this.doDownloadSgf(this.rN.sgf?this.rN.sgf:"maxiGos.sgf");
	else if(this.sgfAction=="edit")this.doEditSgf();
	else this.doShowSgf();
}
mxG.G.prototype.initSgf=function()
{
	if(this.sgfBtnOn)this.addBtnClickListener("Sgf");
}
mxG.G.prototype.createSgf=function()
{
	this.sgfAction=this.setA("sgfAction","show","string");
	this.sgfAlias=this.setA("sgfAlias",null,"string");
	this.sgfBtnOn=this.setA("sgfBtnOn",0,"bool");
	this.toCharset=this.setA("toCharset","UTF-8","string");
	return this.sgfBtnOn?this.createBtn("Sgf","SGF"):"";
}
}
