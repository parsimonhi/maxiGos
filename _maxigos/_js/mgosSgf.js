// maxiGos v8 > mgosSgf.js
if(!mxG.G.prototype.createSgf)
{
mxG.fr(" Close ","Fermer");
mxG.fr("SGF","SGF");
mxG.fr("SGF_Long","Télécharger le SGF");
mxG.en("SGF_Long","Download SGF");
mxG.nl2br=function(s)
{
	return (s+'').replace(/\r\n|\n\r|\r|\n/g,'<br>');
};
mxG.sgfEsc=function(s)
{
	return (s+'').replace(/([^\\\]]?)(\\|])/g,'$1'+"\\"+'$2');
};
mxG.G.prototype.runTransform=function(x,s)
{
	let c1,c2,c3,c4,n1,n2,n3,n4,r,D,DX,DY;
	if(this.transform)
	{
		if(x=='SZ')
		{
			if(this.transform==3) r=s.replace(/^([0-9]+):([0-9]+)$/,"$2:$1");
			else r=s;
			this.sz=r;
		}
		else if((x=='B')||(x=='W')||(x=='AB')||(x=='AW')||(x=='AE')
			||(x=='LB')||(x=='MA')||(x=='TR')||(x=='SQ')||(x=='CR')
			||(x=='VW')||(x=='AR')||(x=='DD')||(x=='LN')||(x=='SL')
			)
		{
			D=this.sz.split(":");
			DX=parseInt(D[0]);
			DY=((D.length>1)?parseInt(D[1]):DX);
			c1=s.substring(0,1);
			c2=s.substring(1,2);
			n1=c1.c2n();
			n2=c2.c2n();
			if((x!='LB')&&(s.length==5))
			{
				c3=s.substring(3,4);
				c4=s.substring(4,5);
				n3=c3.c2n();
				n4=c4.c2n();
			}
			if(this.transform==1)
			{
				if(s.length==5)
				{
					r=this.xy2s(n1,DY+1-n4);
					r+=":"+this.xy2s(n3,DY+1-n2);
				}
				else r=this.xy2s(n1,DY+1-n2);
			}
			else if(this.transform==2)
			{
				if(s.length==5)
				{
					r=this.xy2s(DX+1-n3,n2);
					r+=":"+this.xy2s(DX+1-n1,n4);
				}
				else r=this.xy2s(DX+1-n1,n2);
			}
			else if(this.transform==3)
			{
				if(s.length==5)
				{
					r=this.xy2s(n2,DY+1-n3);
					r+=":"+this.xy2s(n4,DY+1-n1);
				}
				else r=this.xy2s(n2,DY+1-n1);
			}
			if(x=='LB') r+=s.substring(2);
		}
		else r=s;
	}
	else r=s;
	return r;
};
mxG.G.prototype.buildAllSgf=function(aN,only,c)
{
	// build sgf tree starting at aN
	// if only&1, keep B, W, AB, AE, AW, FF, CA, GM, SZ, EV, RO, DT, PC, PB, BR, BT, PW, WR, WT, RU, TM, OT, HA, KM, RE, VW only
	// if only&2, keep main variation only
	// if only&4, keep variation on focus only (useful when show)
	// remove empty nodes
	let rc="\n",k,x,y,ym,aText="",first,keep;
	if(c===undefined) c=0;
	if(this.transform&&aN.Dad&&(aN.Dad==this.rN)) this.sz=(aN.P['SZ']?aN.P['SZ']+"":"19");
	if((aN.Dad&&(aN.Dad==this.rN))||(aN.Dad&&(aN.Dad.Kid.length>1)))
	{
		if(only&4) {if((aN.Dad==this.rN)&&(aN==this.kidOnFocus(aN.Dad))) aText+="(";}
		else if(only&2) {if((aN.Dad==this.rN)&&(aN==aN.Dad.Kid[0])) aText+="(";}
		else if((aN.Dad==this.rN)&&(aN==aN.Dad.Kid[0])) aText+="(";
		else {aText+=(rc+"(");c=0;}
	}
	if(aN!=this.rN)
	{
		if(aText[aText.length-1]!="(")
		{
			if(aN.Dad&&aN.Dad.Dad&&(aN.Dad.Dad==this.rN)) {aText+=rc;c=0;}
			else if(c>3) {aText+=rc;c=0;} else c++;
		}
		first=1;
		for(x in aN.P)
		{
			if(x.match(/^[A-Z]+$/))
			{
				if(only&1)
				{
					if((x=="B")||(x=="W")||(x=="AB")||(x=="AW")||(x=="AE")
						||(x=="FF")||(x=="CA")||(x=="GM")||(x=="SZ")
						||(x=="EV")||(x=="RO")||(x=="DT")||(x=="PC")
						||(x=="PB")||(x=="BR")||(x=="BT")||(x=="PW")||(x=="WR")||(x=="WT")
						||(x=="RU")||(x=="TM")||(x=="OT")||(x=="HA")||(x=="KM")||(x=="RE")||(x=="VW"))
						keep=1;
					else keep=0;
				}
				else keep=1;
				if(keep)
				{
					if(first) {aText+=";";first=0;} // discard empty node
					if(aN.Dad&&(aN.Dad==this.rN)) {aText+=rc;c=0;}
					else if((x=="TB")||(x=="TW")) {aText+=rc;c=4;}
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
		}
	}
	if(aN.Kid&&aN.Kid.length)
	{
		if(only&4) {if(aN!=this.cN) aText+=this.buildAllSgf(this.kidOnFocus(aN),only,c);}
		else if(only&2) aText+=this.buildAllSgf(aN.Kid[0],only,c);
		else for(k=0;k<aN.Kid.length;k++) aText+=this.buildAllSgf(aN.Kid[k],only,c);
	}
	if(only&4) {if((aN.Dad==this.rN)&&(aN==this.kidOnFocus(aN.Dad))) aText+=")";}
	else if(only&2) {if((aN.Dad==this.rN)&&(aN==aN.Dad.Kid[0])) aText+=")";}
	else {if((aN.Dad&&(aN.Dad==this.rN))||(aN.Dad&&(aN.Dad.Kid.length>1))) aText+=")";}
	return aText;
};
mxG.G.prototype.sgfMandatory=function()
{
	let p,km=this.rN.Kid.length;
	for(let k=0;k<km;k++)
	{
		p=this.rN.Kid[k].P;
		p.FF=["4"];
		p.CA=[this.toCharset];
		p.GM=["1"];
		p.AP=["maxiGos:"+mxG.V];
	}
};
mxG.G.prototype.buildSomeSgf=function(only)
{
	this.sgfMandatory();
	return this.buildAllSgf(this.rN,only,0);
};
mxG.G.prototype.buildSgf=function()
{
	this.sgfMandatory();
	return this.buildAllSgf(this.rN,(this.sgfSaveCoreOnly?1:0)+(this.sgfSaveMainOnly?2:0),0);
};
mxG.G.prototype.popupSgf=function()
{
	if(this.sgfPopup&&!this.sgfPopup.closed) this.sgfPopup.close();
	this.sgfPopup=window.open();
	// some browsers (chrome, safari !!!) don't support 'text/plain', thus use default 'text/html'
	// use <pre> tag otherwise line breaks are replaced by spaces
	this.sgfPopup.document.open();
	this.sgfPopup.document.write("<!DOCTYPE html><html><body><pre>\n");
	this.sgfPopup.document.write(this.buildSgf().noT());
	this.sgfPopup.document.write("\n</pre></body></html>");
	this.sgfPopup.document.close();
	this.sgfPopup.document.title="Sgf"; // not working in all browsers
};
mxG.G.prototype.canDownloadSgf=function()
{
	// also used by File component
	// seems downloaded file is always in UTF-8 (possible to change the charset?)
	// if toCharset is not UTF-8, don't download the file (just display sgf)
	if(this.toCharset!="UTF-8") return 0;
	return (typeof document.createElement('a').download==='string')?1:0;
};
mxG.G.prototype.downloadSgf=function(f)
{
	// also used by File component
	let u,a;
	if(this.canDownloadSgf())
	{
		// Big5, gb18030, Shift_JIS, ... are they usable here?
		u="data:application/octet-stream;charset=utf-8,";
		u+=encodeURIComponent(this.buildSgf());
		a=document.createElement('a');
		document.body.appendChild(a); // firefox requires the link to be in the body
		a.download=f;
		a.href=u;
		a.click();
		document.body.removeChild(a);
	}
	else this.popupSgf(); // just display sgf in the browser
};
mxG.G.prototype.doDownloadSgf=function(f)
{
	this.downloadSgf(f);
};
mxG.G.prototype.doSgfOK=function()
{
	let s=this.getE("EditSgfDialog").querySelector('textarea').value,sgf,k;
	if(s!=this.sgfBeforeEdit)
	{
		k=this.rNs.indexOf(this.rN);
		sgf=this.rN.sgf?this.rN.sgf:"";
		if(this.getE("WindowMenuDiv"))
		{
			this.rN.cN=this.cN;
		}
		this.rN=new mxG.P(s,this.sgfLoadCoreOnly,this.sgfLoadMainOnly);
		this.rN.sgf=sgf;
		if(this.getE("WindowMenuDiv")) this.rNs[k]=this.rN;
		this.backNode(this.kidOnFocus(this.rN));
		if(this.hasC("Tree")) this.hasToSetTree=1;
		this.updateAll();
	}
};
mxG.G.prototype.doEditSgf=function()
{
	let btns=[{n:"OK",a:"Sgf"},{n:"Cancel"}],s;
	s="<textarea>"+this.buildSgf()+"</textarea>";
	this.doDialog("EditSgf",s,btns);
	this.sgfBeforeEdit=this.getE("EditSgfDialog").querySelector('textarea').value;
};
mxG.G.prototype.doShowSgf=function()
{
	this.doDialog("ShowSgf",this.buildSgf().noT(),[{n:" Close "}]);
};
mxG.G.prototype.doSgf=function()
{
	if(this.sgfAction=="download")
		this.doDownloadSgf(this.rN.sgf?this.rN.sgf:"maxiGos.sgf");
	else if(this.sgfAction=="edit") this.doEditSgf();
	else this.doShowSgf();
};
mxG.G.prototype.initSgf=function()
{
	if(this.sgfBtnOn)
	{
		let o={n:"Sgf",v:this.alias("SGF","sgfAlias")},
			s=this.local("SGF");
		if(o.v!=s) o.t=s;
		this.addBtn(this.getE("SgfDiv"),o);
	}
};
mxG.G.prototype.createSgf=function()
{
	this.sgfAction=this.setA("sgfAction","show","string");
	this.sgfAlias=this.setA("sgfAlias",null,"string");
	this.sgfBtnOn=this.setA("sgfBtnOn",0,"bool");
	this.toCharset=this.setA("toCharset","UTF-8","string");
	return this.sgfBtnOn?this.createBtnBox("Sgf"):"";
};
}
