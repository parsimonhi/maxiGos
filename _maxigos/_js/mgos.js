// maxiGos v8 > mgos.js
if(!mxG.G)
{
mxG.fr("_",""); // empty string for alias
mxG.en("_",""); // empty string for alias
mxG.G=function(k,b)
{
	this.k=k; // current viewer indice in mxG.D
	this.n="d"+k; // id seed
	this.g=`mxG.D[${k}]`; // current viewer
	this.a={}; // attributes
	this.b=b; // boxes containing components
	this.c=[]; // components
	this.config="";
	this.theme="";
	this.j=document.currentScript; // current js script
}
mxG.G.prototype.getE=function(id){return document.getElementById(this.n+id);}
mxG.G.prototype.local=function(s)
{
	if(mxG.Z[this.lang]&&(mxG.Z[this.lang][s]!==undefined))return mxG.Z[this.lang][s];
	if(mxG.Z["en"][s]!==undefined)return mxG.Z["en"][s];
	return s;
}
mxG.G.prototype.alias=function(s,t)
{
	if(mxG.Z[this.lang]&&this[t]&&(mxG.Z[this.lang][this[t]]!==undefined))
		return mxG.Z[this.lang][this[t]];
	if(mxG.Z["en"][this[t]]!==undefined)
		return mxG.Z["en"][this[t]];
	return this.local(s);
}
mxG.G.prototype.build=function(x,a)
{
	let f="build"+x;
	if(mxG.Z[this.lang]&&mxG.Z[this.lang][f])return mxG.Z[this.lang][f](a);
	if(this[f])return this[f](a);
	return a+"";
}
mxG.G.prototype.hasC=function(a)
{
	for(let z of this.c)if(z==a)return 1;
	return 0;
}
mxG.G.prototype.kidOnFocus=function(aN){return aN.Focus?aN.Kid[aN.Focus-1]:null;}
mxG.G.prototype.enableBtn=function(b)
{
	if(this.hasC("Score")&&this.canPlaceScore)return;
	let e=this.getE(b+"Btn");
	if(e)e.disabled=false;
}
mxG.G.prototype.disableBtn=function(b)
{
	let e=this.getE(b+"Btn");
	if(e)e.disabled=true;
}
mxG.G.prototype.addBtnClickListener=function(b)
{
	let k=this.k;
	this.getE(b+"Btn").addEventListener("click",function(){mxG.D[k]["do"+b]();});
}
mxG.G.prototype.addBtn=function(e,b)
{
	let k=this.k,a=document.createElement("button");
	a.id=this.n+b.n+"Btn";
	if(b.t)a.title=b.t;
	if(b.v)a.innerHTML=b.v;
	if(b.tabindex)a.setAttribute("tabindex",b.tabindex);
	a.classList.add("mxBtn",`mx${b.n}Btn`);
	if(b.first)e.prepend(a);else e.appendChild(a);
	a.addEventListener("click",function(){mxG.D[k]["do"+b.n]();});
}
mxG.G.prototype.createBtn=function(n,a="")
{
	let v=this.alias(a?a:n,n.lcF()+"Alias"),
		t=this.local(a?a:n),
		s=`<button class="mxBtn mx${n}Btn" id="${this.n+n}Btn"`;
	if(v!=t)s+=` title="${t}"`;
	s+=`>${v}</button>`;
	return s;
}
mxG.G.prototype.unselectBtn=function(btn)
{
	let e=this.getE(btn+"Btn");
	if(e)e.classList.remove("mxSelectedBtn");
}
mxG.G.prototype.selectBtn=function(btn)
{
	let e=this.getE(btn+"Btn");
	if(e)e.classList.add("mxSelectedBtn");
}
mxG.G.prototype.doDialog=function(name,content,btns)
{
	let dialog=this.getE(name+"Dialog"),b=btns;
	if(!dialog)
	{
		let s;
		dialog=document.createElement("dialog");
		dialog.id=this.n+name+"Dialog";
		dialog.classList.add(`mx${name}Dialog`);
		s=`<form method="dialog">`
		+`<fieldset class="mxContentFieldset"></fieldset>`
		+`<fieldset class="mxMenuFieldset">`;
		for(let a of b)
		{
			a.v=a.v?a.v:a.n;
			s+=`<button value="${a.v}">${this.local(a.n)}</button>`;
		}
		dialog.mxParent=this;
		// do not use an arrow function here since "this" is used in the function code
		dialog.addEventListener('close',function(){
			for(let a of b)
				if(a.a&&(this.returnValue==a.v))
					this.mxParent[`do${a.a}OK`]();
		});
		s+=`</fieldset>`;
		dialog.innerHTML=s;
		this.getE("Global").prepend(dialog);
	}
	dialog.querySelector('.mxContentFieldset').innerHTML=content;
	dialog.showModal();
}
mxG.G.prototype.getInfo=function(p,s=1)
{
	let aN=this.cN;
	if((p=="MN")||(p=="PM")||(p=="FG")){if(aN==this.rN)aN=this.kidOnFocus(aN);}
	if((p=="PM")||(p=="FG"))while((aN!=this.rN)&&!aN.P[p])aN=aN.Dad;
	else{aN=this.rN;while(aN&&!aN.P[p])aN=this.kidOnFocus(aN);}
	if(aN&&aN.P[p])
	{
		if(s)return (aN.P[p][0]+"").noT();
		return aN.P[p][0]+"";
	}
	if(p=="SZ")return "19";
	if(p=="PM")return "1";
	if((p=="ST")||(p=="FG"))return "0";
	return "";
}
mxG.G.prototype.setSz=function()
{
	let DX=this.DX?this.DX:0,DY=this.DY?this.DY:0,s=this.getInfo("SZ"),
		D=s.replace(/[^0-9:]/g,"").match(/^([0-9]+)(:([0-9]+))?$/);
	if(D){this.DX=mxG.min1max52(D[1]);this.DY=D[3]?mxG.min1max52(D[3]):this.DX;}
	else this.DX=this.DY=19;
	return (DX!=this.DX)||(DY!=this.DY);
}
mxG.G.prototype.setVw=function()
{
	let aN=this.cN,xl,yt,xr,yb;
	if(aN==this.rN)aN=this.kidOnFocus(this.rN);
	while((aN!=this.rN)&&!aN.P.VW)aN=aN.Dad;
	xl=(this.xl?this.xl:0);
	yt=(this.yt?this.yt:0);
	xr=(this.xr?this.xr:0);
	yb=(this.yb?this.yb:0);
	if(aN.P.VW)
	{
		this.xl=this.DX;
		this.yt=this.DY;
		this.xr=this.yb=1;
		for(let s of aN.P.VW)
		{
			if(s.match(/^[a-zA-Z]{2}:[a-zA-Z]{2}$/))
			{
				this.xl=Math.min(this.xl,s.c2n(0));
				this.yt=Math.min(this.yt,s.c2n(1));
				this.xr=Math.max(this.xr,s.c2n(3));
				this.yb=Math.max(this.yb,s.c2n(4));
			}
			else if(s.match(/^[a-zA-Z]{2}$/))
			{
				let x=s.c2n(0),y=s.c2n(1);
				this.xl=Math.min(this.xl,x);
				this.yt=Math.min(this.yt,y);
				this.xr=Math.max(this.xl,x);
				this.yb=Math.max(this.yt,y);
			}
			else
			{
				this.xl=this.yt=1;
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
		this.xl=this.yt=1;
		this.xr=this.DX;
		this.yb=this.DY;
	}
	return (xl!=this.xl)||(yt!=this.yt)||(xr!=this.xr)||(yb!=this.yb);
}
mxG.G.prototype.setPl=function()
{
	let aN=this.rN;
	this.uC="B";
	while(aN.Focus)
	{
		aN=aN.Kid[0];
		if(aN.P)
		{
			if(aN.P.PL)
			{
				if(aN.P.PL=="W")this.uC="W";
				break;
			}
			else if(aN.P.B||aN.P.W)
			{
				if(aN.P.W)this.uC="W";
				break;
			}
		}
	}
	this.oC=((this.uC=="W")?"B":"W");
}
mxG.G.prototype.placeAX=function()
{
	for(let p of ["AB","AW","AE"])
	{
		let v=this.cN.P[p];
		if(v)for(let s of v)
		{
			if(s.match(/^[a-zA-Z]{2}$/))
			{
				let x=s.c2n(0),y=s.c2n(1);
				this.gor.place(p,x,y);
			}
			else if(s.match(/^[a-zA-Z]{2}:[a-zA-Z]{2}$/))
			{
				let x1=s.c2n(0),y1=s.c2n(1),x2=s.c2n(3),y2=s.c2n(4);
				for(let x=x1;x<=x2;x++)for(let y=y1;y<=y2;y++)this.gor.place(p,x,y);
			}
		}
	}
}
mxG.G.prototype.placeBW=function(nat)
{
	let s=this.cN.P[nat][0],x=0,y=0;
	if(s.match(/^[a-zA-Z]{2}$/)){x=s.c2n(0);y=s.c2n(1);}
	this.gor.place(nat,x,y);
}
mxG.G.prototype.placeNode=function()
{
	if(this.kidOnFocus(this.cN))
	{
		this.cN=this.kidOnFocus(this.cN);
		if(this.cN.P.B)this.placeBW("B");
		else if(this.cN.P.W)this.placeBW("W");
		else if(this.cN.P.AB||this.cN.P.AW||this.cN.P.AE)this.placeAX();
	}
}
mxG.G.prototype.changeFocus=function(aN)
{
	let bN=aN;
	while(bN!=this.rN)
	{
		if(this.kidOnFocus(bN.Dad)!=bN)
			for(let k=0;k<bN.Dad.Kid.length;k++)
				if(bN.Dad.Kid[k]==bN){bN.Dad.Focus=k+1;break;}
		bN=bN.Dad;
	}
}
mxG.G.prototype.backNode=function(aN)
{
	this.changeFocus(aN);
	this.cN=this.rN;
	if(this.setSz())this.hasToSetGoban=1;
	this.gor.init(this.DX,this.DY);
	while(this.cN!=aN)this.placeNode();
}
mxG.G.prototype.updateAll=function()
{
	if(this.hasC("Variation"))this.setMode();
	this.setVw();
	this.setIndices();
	this.setNumbering();
	for(let z of this.c)
	{
		let s="update"+z;
		if(this[s])this[s]();
	}
}
mxG.G.prototype.initAll=function()
{
	for(let z of this.c)
	{
		let s="init"+z;
		if(this[s])this[s]();
	}
}
// start
mxG.G.prototype.getA=function()
{
	// 1. set this.t (target tag where the viewer displays)
	// 2. get parameters values from this.t attributes
	// most of the time, this.t is this.j (this script tag itself)
	// 3. store the result in this.a, overwriting its default settings
	// 4. if not already set, try to get this.sgf from this.t tag content
	// 5. if not already set, try to get this.lang from html tags
	let t;
	// target tag is this.a.t (as when mgosLoader.js is used) or is this script itself
	this.t=this.a.t||this.j;
	t=this.t;
	for(let n of t.getAttributeNames())
	{
		if(n.match(/^data-maxigos-[a-z][a-z0-9-]*$/))
		{
			let a=n.replace(/^data-maxigos-/,"").split("-"),s=a[0],b;
			for(let j=1;j<a.length;j++)s+=a[j].ucF();
			b=t.getAttribute(n);
			this.a[s]=b.match(/^[0-9-]+$/)?-(-b):b;
		}
	}
	// sgf and lang parameter are special
	this.sgf=this.a.sgf||t.innerHTML;
	this.lang=this.a.l||mxG.getLang(t); // look at this.a.l for compatibility reason
	t.innerHTML=""; // clean t content before creating sgf viewer
}
mxG.G.prototype.setA=function(a,z,t)
{
	// a: parameter name
	// z: default value
	// t: parameter type (bool, int, float, string or list)
	// to set a bool to null, set it to something which is not 0, 1, "0" or "1"
	// to set a string to null, let it undefined and set its default value to null
	if(!(a in this.a))return z;
	if(t=="bool")return (this.a[a]+"")=="1"?1:(this.a[a]+"")=="0"?0:null;
	if(t=="int")return parseInt(this.a[a]+"");
	if(t=="float")return parseFloat(this.a[a]+"");
	if(t=="string")return this.a[a]+"";
	if(t=="set")return this.a[a]?new Set((this.a[a]+"").split(",")):new Set();
	return null;
}
mxG.G.prototype.afterGetS=function(s,hasToShowExecutionTime)
{
	let a,sgf,km;
	a=(this.rN&&this.rNs)?this.rNs.indexOf(this.rN):-1;
	sgf=(this.rN&&this.rN.sgf)?this.rN.sgf:"";
	this.rN=new mxG.P(s,this.sgfLoadCoreOnly,this.sgfLoadMainOnly);
	this.rN.sgf=sgf;
	if(a<0)this.rNs=[this.rN]; // create this.rNs and add this.rN
	else this.rNs[a]=this.rN; // replace this.rN in this.rNs
	this.setSz();
	this.hasToSetGoban=1;
	if(this.hasC("Tree"))this.hasToSetTree=1;
	this.gor=new mxG.R();
	this.gor.init(this.DX,this.DY);
	this.cN=this.rN;
	this.placeNode();
	if(this.initMethod=="last")while(this.kidOnFocus(this.cN))this.placeNode();
	else if(km=parseInt(this.initMethod+""))
		for(let k=0;k<km;k++)if(this.kidOnFocus(this.cN))this.placeNode();
	this.updateAll();
	if(hasToShowExecutionTime&&mxG.ExecutionTime)mxG.ExecutionTime();
}
mxG.G.prototype.getF=function(f)
{
	fetch(f)
	.then(r=>r.arrayBuffer())
	.then(b=>
	{
		let m,c,t;
		t=(new TextDecoder("UTF-8")).decode(b);
		if(m=t.match(/CA\[([^\]]*)\]/))c=m[1].toUpperCase();
		else c="ISO-8859-1";
		if(c!="UTF-8")return (new TextDecoder(c)).decode(b);
        return t;
    })
    .then(t=>this.afterGetS(t,1));
}
mxG.G.prototype.isSgfRecord=function(s)
{
	let a=s.indexOf("("),b=s.indexOf(";");
	return (a>=0)&&(b>a);
}
mxG.G.prototype.getS=function()
{
	let s=this.sgf;
	if(this.isSgfRecord(s)&&this.allowStringAsSource)
	{
		// s is assumed a sgf record
		// replace "&#40;" by "(" and "&#41; by ")"
		// since some tools may replace "(" by "&#40;" and ")" by "&#41;" in sgf records
		// replace "<br>" by "\n" and "<p>" by "\n\n"
		// since some tools may add them in sgf records
		s=s.reP().replace(/<br\s?\/?>/gi,'\n').replace(/<p>/gi,'').replace(/<\/p>/gi,'\n\n');
		this.afterGetS(s,1);
		return;
	}
	if(this.allowFileAsSource)
	{
		// s is assumed a sgf file name or a URL returning a sgf record
		let f=s.replace(/^\s+([^\s])/,"$1").replace(/([^\s])\s+$/,"$1");
		if(this.sourceFilter)
		{
			if(f.match(new RegExp(this.sourceFilter)))
			{
				this.getF(f);
				return;
			}
		}
	}
	this.afterGetS("",1);
}
mxG.G.prototype.setC=function(b)
{
	// must be done before createBoxes(), otherwise this.hasC will not work properly
	for(let a of b)if(Array.isArray(a))this.setC(a);else this.c.push(a);
}
mxG.G.prototype.createBoxes=function(b)
{
	let s="";
	for(let a of b)
	{
		if(Array.isArray(a))s+=`<div>${this.createBoxes(a)}</div>`;
		else
		{
			let f="create"+a;
			if(this[f])s+=this[f]();
		}
	}
	return s;
}
mxG.G.prototype.addParentClasses=function(p,e)
{
	// add classes to intermediate boxes (ie not the global box nor component boxes)
	if(e.children)for(let c of e.children)this.addParentClasses(p,c);
	if(!e.id)return;
	let r,a,b,c;
	r=new RegExp(this.n+"([a-zA-Z0-9_-]+)"+"(Box|Btn)");
	b=e.id.replace(r,"$1");
	if(this.c.indexOf(b)>=0)
	{
		// assume b is the seed of only one element id when this.createAll() is executed
		a=e.parentNode;
		if(a==p)return;
		a.classList.add(`mx${b}Parent`);
		a=a.parentNode;
		if(a==p)return;
		a.classList.add(`mx${b}GrandParent`);
		c="GrandParent";
		while((a=a.parentNode)&&(a!=p))
		{
			c="Great"+c;
			a.classList.add("mx"+b+c);
		}
	}
}
mxG.G.prototype.createAll=function()
{
	let e;
	this.scr=new mxG.S(this); // must be set as soon as possible
	this.setC(this.b);
	this.in3dOn=this.setA("in3dOn",0,"bool");
	this.allowStringAsSource=this.setA("allowStringAsSource",1,"bool");
	this.allowFileAsSource=this.setA("allowFileAsSource",1,"bool");
	this.initMethod=this.setA("initMethod","first","string");
	this.sgfLoadCoreOnly=this.setA("sgfLoadCoreOnly",0,"bool");
	this.sgfLoadMainOnly=this.setA("sgfLoadMainOnly",0,"bool");
	this.sgfSaveCoreOnly=this.setA("sgfSaveCoreOnly",0,"bool");
	this.sgfSaveMainOnly=this.setA("sgfSaveMainOnly",0,"bool");
	this.sourceFilter=this.setA("sourceFilter","^[^?]+\\.sgf$","string");
	e=document.createElement("div");
	e.id=this.n+"Global";
	e.className=`mxGlobal mx${this.config}Config mx${this.theme}Theme mxIn${this.in3dOn?"3":"2"}d`;
	e.lang=this.lang; // to be consistent between html and maxiGos
	if(!mxG.Z[this.lang])mxG.Z[this.lang]=[];
	e.innerHTML=this.createBoxes(this.b);
	this.addParentClasses(e,e);
	if(this.t==this.j)
		// insert the global box tag in DOM just after current script tag
		this.j.parentNode.insertBefore(e,this.j.nextSibling);
	else
		// insert the global box tag in DOM in target element
		this.t.appendChild(e);
	// init this.gc as soon as possible and before any initXxx()
	this.gc=this.getE("GobanContent");
}
mxG.G.prototype.appendStyle=function()
{
	let s;
	function appendOneStyle(c,t,s)
	{
		let id=`maxigos${t+c}Style`;
		if(!document.getElementById(id))
		{
			let e=document.createElement("style");
			e.id=id;
			e.innerHTML=s;
			document.getElementsByTagName("head")[0].appendChild(e);
		}
	}
	if(s=this.style)appendOneStyle("",this.theme,s);
	if(s=this["style4"+this.config])appendOneStyle(this.config,this.theme,s);
}
mxG.G.prototype.after=function()
{
	this.appendStyle();
	this.getA();
	this.createAll();
	this.initAll();
	this.getS();
}
mxG.G.prototype.start=function()
{
	let k=this.k;
	if(document.readyState=="complete")this.after();
	else window.addEventListener("DOMContentLoaded",function(){mxG.D[k].after();});
}
}
