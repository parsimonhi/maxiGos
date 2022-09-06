// maxiGos v7 > mgos.js
if(!mxG.G)
{
mxG.fr("_",""); // empty string for alias
mxG.en("_",""); // empty string for alias
mxG.G=function(k,b)
{
	this.k=k; // current viewer indice in mxG.D
	this.n="d"+k; // id seed
	this.g="mxG.D["+k+"]"; // current viewer
	this.a={}; // attributes
	this.b=b; // boxes containing components
	this.c=[]; // components
	this.cm=0; // number of components
	this.j=document.scripts[document.scripts.length-1]; // current js script
};
mxG.G.prototype.getE=function(id){return document.getElementById(this.n+id);};
mxG.G.prototype.debug=function(s,a)
{
	var e=this.getE("DebugDiv"),g;
	if(!e)
	{
		e=document.createElement("div");
		e.id=this.n+"DebugDiv";
		g=this.getE("GlobalBoxDiv");
		if(g) g.parentNode.insertBefore(e,g.nextSibling);
		else this.j.parentNode.insertBefore(e,this.j.nextSibling);
	}
	if(a==1) s=e.innerHTML+" "+s;
	else if(a==2) s=e.innerHTML+"<br>"+s;
	e.innerHTML=s;
};
mxG.G.prototype.local=function(s)
{
	if(mxG.Z[this.lang]&&(mxG.Z[this.lang][s]!==undefined))
		return mxG.Z[this.lang][s];
	if(mxG.Z["en"][s]!==undefined)
		return mxG.Z["en"][s];
	return s;
};
mxG.G.prototype.alias=function(s,t)
{
	if(mxG.Z[this.lang]&&this[t]&&(mxG.Z[this.lang][this[t]]!==undefined))
		return mxG.Z[this.lang][this[t]];
	if(mxG.Z["en"][this[t]]!==undefined)
		return mxG.Z["en"][this[t]];
	return this.local(s);
};
mxG.G.prototype.build=function(x,a)
{
	var f="build"+x;
	if(mxG.Z[this.lang]&&mxG.Z[this.lang][f]) return mxG.Z[this.lang][f](a);
	if(this[f]) return this[f](a);
	return a+"";
};
mxG.G.prototype.hasC=function(a)
{
	var c;
	for(c=0;c<this.cm;c++) if(this.c[c]==a) return 1;
	return 0;
};
mxG.G.prototype.kidOnFocus=function(aN){return aN.Focus?aN.Kid[aN.Focus-1]:null;};
mxG.G.prototype.enableBtn=function(b)
{
	var e=this.getE(b+"Btn");
	if(e) e.disabled=false;
};
mxG.G.prototype.disableBtn=function(b)
{
	var e=this.getE(b+"Btn");
	if(e) e.disabled=true;
};
mxG.G.prototype.buildBtn=function(b)
{
	// use addEventListener later instead of onclick right now
	// since CSP can block inline script execution
	var s="";
	s+="<button class=\"mxBtn mx"+b.n+"Btn\"";
	// add title only if b.t is not null else if b.v is null
	// don't add title if b.t is null and b.v is not null (useless)
	if(b.t) s+=" title=\""+b.t+"\"";
	else if(!b.v) s+=" title=\""+this.local(b.n)+"\"";
	s+=" autocomplete=\"off\"";
	s+=" id=\""+this.n+b.n+"Btn\"";
	s+=">";
	s+="<span>";
	s+=(b.v?b.v:this.scr.makeBtnContent(""));
	s+="</span>";
	s+="</button>";
	return s;
};
mxG.G.prototype.addBtn=function(e,b)
{
	var a,k=this.k;
	a=document.createElement("button");
	a.id=this.n+b.n+"Btn";
	a.autocomplete="off";
	a.title=(b.t?b.t:this.local(b.n));
	a.innerHTML="<span>"+(b.v?b.v:this.scr.makeBtnContent(""))+"</span>";
	a.setAttribute("class","mxBtn mx"+b.n+"Btn");
	e.appendChild(a);
	a.addEventListener("click",function(){mxG.D[k]["do"+b.n]();},false);
};
mxG.G.prototype.createBtnBox=function(b)
{
	if(this[b.charAt(0).toLowerCase()+b.slice(1)+"BtnOn"])
		return "<div class=\"mx"+b+"Div\" id=\""+this.n+b+"Div\"></div>";
	return "";
};
mxG.G.prototype.unselectBtn=function(btn)
{
	var e=this.getE(btn+"Btn");
	if(e) e.classList.remove("mxSelectedBtn");
};
mxG.G.prototype.selectBtn=function(btn)
{
	var e=this.getE(btn+"Btn");
	if(e) e.classList.add("mxSelectedBtn");
};
mxG.G.prototype.createGBox=function(b)
{
	var e,g;
	this.gBoxP=this.getE("GlobalBoxDiv").querySelector(".mx"+this.gBoxParent+"Div");
	g=this.gBoxP;
	e=document.createElement('div');
	e.className="mxGBoxDiv mx"+b+"Div";
	e.id=this.n+b+"Div";
	// showGBox may give focus to gBox thus need tabindex="-1"
	e.setAttribute("tabindex","-1");
	e.style.position="absolute";
	e.style.left="0";
	e.style.top="0";
	e.style.right="0";
	e.style.bottom="0";
	e.style.display="none";
	g.style.position="relative";
	g.appendChild(e);
	return e;
};
mxG.G.prototype.hideGBox=function(b)
{
	if(b==this.gBox)
	{
		this.getE(b+"Div").style.display="none";
		this.gBox="";
		this.gBoxP.classList.remove("mxUnder");
		this.updateAll();
	}
};
mxG.G.prototype.showGBox=function(b)
{
	var e,p;
	if(b!=this.gBox)
	{
		if (this.currentMenu) this.toggleMenu(this.currentMenu,0);
		p=this.gBoxP;
		if(this.inLoop) this.inLoop=0; //otherwise form input mess
		if(this.gBox)
		{
			this.getE(this.gBox+"Div").style.display="none";
			p.classList.remove("mxUnder");
		}
		e=this.getE(b+"Div");
		e.style.display="block";
		this.gBox=b;
		p.classList.add("mxUnder");
		e.focus();
		if(this.hasC("Score")&&this.canPlaceScore) this.toggleScore();
		this.updateAll();
	}
};
mxG.G.prototype.htmlProtect=function(s)
{
	// before any output excepting in input field or textarea
	var r=s+'';
	r=r.replace(/</g,'&lt;').replace(/>/g,'&gt;');
	if(this.mayHaveExtraTags)
	{
		r=r.replace(/&lt;br\s?\/?&gt;/gi,'\n');
		r=r.replace(/&lt;p&gt;/gi,'');
		r=r.replace(/&lt;\/p&gt;/gi,'\n\n');
	}
	return r;
};
mxG.G.prototype.getInfoS=function(p)
{
	var aN=this.cN;
	if((p=="MN")||(p=="PM")||(p=="FG")){if(aN==this.rN) aN=this.kidOnFocus(aN);}
	if((p=="PM")||(p=="FG")) while((aN!=this.rN)&&!aN.P[p]) aN=aN.Dad;
	else {aN=this.rN;while(aN&&!aN.P[p]) aN=this.kidOnFocus(aN);}
	if(aN&&aN.P[p]) return this.htmlProtect(aN.P[p][0]+"");
	if(p=="SZ") return "19";
	if(p=="PM") return "1";
	if((p=="ST")||(p=="FG")) return "0";
	return "";
};
mxG.G.prototype.setSz=function()
{
	// return true if DX or DY change 
	var DX=this.DX?this.DX:0;
	var DY=this.DY?this.DY:0;
	var D=this.getInfoS("SZ").split(":");
	this.DX=parseInt(D[0]);
	this.DY=((D.length>1)?parseInt(D[1]):this.DX);
	return (DX!=this.DX)||(DY!=this.DY)
};
mxG.G.prototype.setVw=function()
{
	var aN=this.cN,x,y,s,k,km,xl,yt,xr,yb;
	if(aN==this.rN) aN=this.kidOnFocus(this.rN);
	while((aN!=this.rN)&&!aN.P.VW) aN=aN.Dad;
	xl=(this.xl?this.xl:0);
	yt=(this.yt?this.yt:0);
	xr=(this.xr?this.xr:0);
	yb=(this.yb?this.yb:0);
	if(aN.P.VW)
	{
		this.xl=this.DX;
		this.yt=this.DY;
		this.xr=1;
		this.yb=1;
		km=aN.P.VW.length;
		for(k=0;k<km;k++)
		{
			s=aN.P.VW[k];
			if(s.length==5)
			{
				this.xl=Math.min(this.xl,s.c2n(0));
				this.yt=Math.min(this.yt,s.c2n(1));
				this.xr=Math.max(this.xr,s.c2n(3));
				this.yb=Math.max(this.yb,s.c2n(4));
			}
			else if(s.length==2)
			{
				x=s.c2n(0);
				y=s.c2n(1);
				this.xl=Math.min(this.xl,x);
				this.yt=Math.min(this.yt,y);
				this.xr=Math.max(this.xl,x);
				this.yb=Math.max(this.yt,y);
			}
			else
			{
				this.xl=1;
				this.yt=1;
				this.xr=this.DX;
				this.yb=this.DY;
				break;
			}
		}
		this.xl=Math.max(1,this.xl);
		this.yt=Math.max(1,this.yt);
		this.xr=Math.min(this.DX,this.xr);
		this.yb=Math.min(this.DY,this.yb);
	}
	else
	{
		this.xl=1;
		this.yt=1;
		this.xr=this.DX;
		this.yb=this.DY;
	}
	return (xl!=this.xl)||(yt!=this.yt)||(xr!=this.xr)||(yb!=this.yb);
};
mxG.G.prototype.setPl=function()
{
	var aN=this.rN;
	this.uC="B";
	while(aN.Focus)
	{
		aN=aN.Kid[0];
		if(aN.P)
		{
			if(aN.P.PL)
			{
				this.uC=aN.P.PL;
				break;
			}
			else if(aN.P.B||aN.P.W)
			{
				if(aN.P.B) this.uC="B";
				else if(aN.P.W) this.uC="W";
				break;
			}
		}
	}
	this.oC=((this.uC=="W")?"B":"W");
};
mxG.G.prototype.placeAX=function()
{
	var v,z,k,km,s,x,y,x1,y1,x2,y2,AX=["AB","AW","AE"];
	for(z=0;z<3;z++)
	{
		km=((v=this.cN.P[AX[z]])?v.length:0);
		for(k=0;k<km;k++)
		{
			s=v[k];
			if(s.length==2)
			{
				x=s.c2n(0);
				y=s.c2n(1);
				this.gor.place(AX[z],x,y);
			}
			else if(s.length==5)
			{
				x1=s.c2n(0);
				y1=s.c2n(1);
				x2=s.c2n(3);
				y2=s.c2n(4);
				for(x=x1;x<=x2;x++) for(y=y1;y<=y2;y++) this.gor.place(AX[z],x,y);
			}
		}
	}
};
mxG.G.prototype.placeBW=function(nat)
{
	var s=this.cN.P[nat][0],x=0,y=0;
	if(s.length==2)
	{
		x=s.c2n(0);
		y=s.c2n(1);
	}
	this.gor.place(nat,x,y);
};
mxG.G.prototype.placeNode=function()
{
	if(this.kidOnFocus(this.cN))
	{
		this.cN=this.kidOnFocus(this.cN);
		if(this.cN.P.B) this.placeBW("B");
		else if(this.cN.P.W) this.placeBW("W");
		else if(this.cN.P.AB||this.cN.P.AW||this.cN.P.AE) this.placeAX();
	}
};
mxG.G.prototype.changeFocus=function(aN)
{
	var k,km,bN=aN;
	while(bN!=this.rN)
	{
		if(this.kidOnFocus(bN.Dad)!=bN)
		{
			km=bN.Dad.Kid.length;
			for(k=0;k<km;k++)
				if(bN.Dad.Kid[k]==bN)
				{
					bN.Dad.Focus=k+1;
					break;
				}
		}
		bN=bN.Dad;
	}
};
mxG.G.prototype.backNode=function(aN)
{
	this.changeFocus(aN);
	this.cN=this.rN;
	if(this.setSz()) this.hasToSetGoban=1;
	this.gor.init(this.DX,this.DY);
	while(this.cN!=aN) this.placeNode();
};
mxG.G.prototype.updateAll=function()
{
	var k,km,s;
	if(this.hasC("Variation")) this.setMode();
	this.setVw();
	this.setIndices();
	this.setNumbering();
	km=this.cm;
	for(k=0;k<km;k++)
	{
		s="update"+this.c[k];
		if(this[s]) this[s]();
	}
};
mxG.G.prototype.initAll=function()
{
	var k,km,s;
	km=this.cm;
	for(k=0;k<km;k++)
	{
		s="init"+this.c[k];
		if(this[s]) this[s]();
	}
};
// start
mxG.G.prototype.getA=function()
{
	// 1. set this.t (target tag where the viewer displays)
	// 2. get parameters values from this.t attributes
	// most of the time, this.t is this.j (this script tag itself)
	// 3. store the result in this.a, overwriting its default settings
	// 4. if not already set, try to get this.sgf from this.t tag content
	// 5. if not already set, try to get this.lang from html tags
	var i,im,j,jm,n,s,a,b,t;
	// target tag is this.a.t (as when mgosLoader.js is used) or is this script itself
	this.t=this.a.t||this.j;
	t=this.t;
	im=t.attributes.length;
	for(i=0;i<im;i++)
	{
		n=t.attributes.item(i).nodeName;
		if(n.match(/^data-maxigos-/))
		{
			a=n.replace(/^data-maxigos-/,"").split("-");
			s=a[0];
			jm=a.length;
			for(j=1;j<jm;j++) s+=a[j].ucFirst();
			b=t.getAttribute(n);
			this.a[s]=b.match(/^[0-9]+$/)?parseInt(b):b;
		}
	}
	// sgf and lang parameter are special
	this.sgf=this.a.sgf||t.innerHTML;
	this.lang=this.a.l||mxG.getLang(t); // look at this.a.l for compatibility reason
	t.innerHTML=""; // clean t content before creating sgf viewer
};
mxG.G.prototype.setA=function(a,z,t)
{
	// a: parameter name
	// z: default value
	// t: parameter type (bool, int, float, string or list)
	// to set a bool to null, set it to something which is not 0, 1, "0" or "1"
	// never set a string to null, let it undefined and set its default value to null
	if(!(a in this.a)) return z;
	if(t=="bool") return (this.a[a]+"")=="1"?1:(this.a[a]+"")=="0"?0:null;
	if(t=="int") return parseInt(this.a[a]+"");
	if(t=="float") return parseFloat(this.a[a]+"");
	if(t=="string") return this.a[a]+"";
	if(t=="list") return a?(this.a[a]+"").split(","):[];
	return null;
};
mxG.G.prototype.afterGetS=function(s,hasToShowExecutionTime)
{
	var a,sgf,k,km;
	a=(this.rN&&this.rNs)?this.rNs.indexOf(this.rN):-1;
	sgf=(this.rN&&this.rN.sgf)?this.rN.sgf:"";
	this.rN=new mxG.P(s,this.sgfLoadCoreOnly,this.sgfLoadMainOnly);
	this.rN.sgf=sgf;
	if(a<0) this.rNs=[this.rN]; // create this.rNs and add this.rN
	else this.rNs[a]=this.rN; // replace this.rN in this.rNs
	this.mayHaveExtraTags=0;
	this.setSz();
	this.hasToSetGoban=1;
	if(this.hasC("Tree")) this.hasToSetTree=1;
	this.gor=new mxG.R();
	this.gor.init(this.DX,this.DY);
	this.cN=this.rN;
	this.placeNode();
	if(this.initMethod=="last")
		while(this.kidOnFocus(this.cN)) this.placeNode();
	else if(km=parseInt(this.initMethod+""))
	{
		for(k=0;k<km;k++)
			if(this.kidOnFocus(this.cN)) this.placeNode();
	}
	this.updateAll();
	if(hasToShowExecutionTime&&mxG.ExecutionTime) mxG.ExecutionTime();
};
mxG.G.prototype.getF=function(f)
{
	fetch(f)
	.then(r=>r.arrayBuffer())
	.then(b=>
	{
		let m,c,t;
		t=(new TextDecoder("UTF-8")).decode(b);
		if(m=t.match(/CA\[([^\]]*)\]/)) c=m[1].toUpperCase();
		else c="ISO-8859-1";
		if(c!="UTF-8") return (new TextDecoder(c)).decode(b);
        return t;
    })
    .then(t=>this.afterGetS(t,1));
};
mxG.G.prototype.isSgfRecord=function(s)
{
	return s.indexOf("(")>=0;
};
mxG.G.prototype.getS=function()
{
	var s=this.sgf,f,fo,f1;
	this.mayHaveExtraTags=0;
	if(this.htmlParenthesis)
		s=s.replace(/&#40;/g,'(').replace(/&#41;/g,')');
	if(this.isSgfRecord(s)&&this.allowStringAsSource)
	{
		// s is assumed a sgf record
		// the only case when this.mayHaveExtraTags=1
		// since cms may add some <p> or <br> in sgf record
		this.mayHaveExtraTags=1;
		this.afterGetS(s,1);
		return;
	}
	if(this.allowFileAsSource)
	{
		// s is assumed a sgf file name or a URL returning a sgf record
		f=s.replace(/^\s+([^\s])/,"$1").replace(/([^\s])\s+$/,"$1");
		if(this.sourceFilter)
		{
			if(f.match(new RegExp(this.sourceFilter)))
			{
				this.getF(f);
				return;
			}
		}
		else
		{
			fo=f.split("?")[0];
			if(fo.match(/\.sgf$/))
			{
				this.getF(fo);
				return;
			}
		}
	}
	this.afterGetS("",1);
};
mxG.G.prototype.setC=function(b)
{
	// must be done before createBoxes(), otherwise this.hasC will not work properly
	var a,k,km;
	km=b.length;
	for(k=0;k<km;k++)
	{
		a=b[k];
		if(mxG.isArray(a)) this.setC(a);
		else this.c.push(a);
	}
	this.cm=this.c.length;
};
mxG.G.prototype.createBoxes=function(b)
{
	var a,f,k,km,s="";
	km=b.length;
	for(k=0;k<km;k++)
	{
		a=b[k];
		if(mxG.isArray(a))
			s+="<div>"+this.createBoxes(a)+"</div>";
		else
		{
			f="create"+a;
			if(this[f]) s+=this[f]();
		}
	}
	return s;
};
mxG.G.prototype.addParentClasses=function(p,e)
{
	var k,km,a,b,c,id,r,t;
	km=(e.children?e.children.length:0);
	if(km) for(k=0;k<km;k++)
		this.addParentClasses(p,e.children[k]);
	if(e.id)
	{
		t=e.tagName;
		t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();
		r=new RegExp(this.n+"([a-zA-Z0-9_-]+)"+t);
		b=e.id.replace(r,"$1");
	}
	else b="";
	if(b&&(this.c.indexOf(b)>=0)&&(t=="Div"))
	// keep only div tags to avoid duplicate for b (for instance GuessDiv and GuessSvg)
	{
		a=e.parentNode;
		a.classList.add("mx"+b+"ParentDiv");
		if(a==p) return;
		a=a.parentNode;
		a.classList.add("mx"+b+"GrandParentDiv");
		if(a==p) return;
		c="GrandParentDiv";
		do
		{
			c="Great"+c;
			a=a.parentNode;
			a.classList.add("mx"+b+c);
		} while(a!=p);
	}
};
mxG.G.prototype.createAll=function()
{
	var e,cls;
	this.scr=new mxG.S(this); // must be set as soon as possible
	this.setC(this.b);
	this.in3dOn=this.setA("in3dOn",0,"bool");
	this.allowStringAsSource=this.setA("allowStringAsSource",1,"bool");
	this.allowFileAsSource=this.setA("allowFileAsSource",1,"bool");
	this.gBoxParent=this.setA("gBoxParent","Goban","string");
	this.htmlParenthesis=this.setA("htmlParenthesis",0,"bool");
	this.initMethod=this.setA("initMethod","first","string");
	this.sgfLoadCoreOnly=this.setA("sgfLoadCoreOnly",0,"bool");
	this.sgfLoadMainOnly=this.setA("sgfLoadMainOnly",0,"bool");
	this.sgfSaveCoreOnly=this.setA("sgfSaveCoreOnly",0,"bool");
	this.sgfSaveMainOnly=this.setA("sgfSaveMainOnly",0,"bool");
	this.sourceFilter=this.setA("sourceFilter","^[^?]+\\.sgf$","string");
	cls="mxGlobalBoxDiv";
	cls+=(this.config?" mx"+this.config+"Config":"");
	cls+=(this.theme?" mx"+this.theme+"Theme":"");
	cls+=(this.in3dOn?" mxIn3d":" mxIn2d");
	e=document.createElement("div");
	e.id=this.n+"GlobalBoxDiv";
	e.className=cls;
	e.lang=this.lang; // to be consistent between html and maxiGos
	if(!mxG.Z[this.lang]) mxG.Z[this.lang]=[];
	e.innerHTML=this.createBoxes(this.b);
	this.addParentClasses(e,e);
	if(this.t==this.j)
		// insert global box tag in DOM just after current script tag
		this.j.parentNode.insertBefore(e,this.j.nextSibling);
	else
		// insert global box tag in DOM in target element
		this.t.appendChild(e);
	this.ig=this.getE("InnerGobanDiv"); // init this.ig as soon as possible
};
mxG.G.prototype.appendStyle=function()
{
	var e,id;
	if(this.style)
	{
		id="maxigos"+this.theme+"Style";
		if(!document.getElementById(id))
		{
			e=document.createElement("style");
			e.id=id;
			e.innerHTML=this.style;
			document.getElementsByTagName("head")[0].appendChild(e);
		}
	}
};
mxG.G.prototype.afterLoading=function()
{
	this.appendStyle();
	this.getA();
	this.createAll();
	this.initAll();
	this.getS();
};
mxG.G.prototype.start=function()
{
	var k=this.k;
	if(document.readyState=="complete")
	{
		this.afterLoading();
	}
	else
	{
		window.addEventListener("load",function()
		{
			mxG.D[k].afterLoading();
		},false);
	}
};
}
