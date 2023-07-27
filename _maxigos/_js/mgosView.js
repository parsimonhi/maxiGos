// maxiGos v8 > mgosView.js
if(!mxG.G.prototype.createView)
{
mxG.fr("2d/3d","2d/3d");
mxG.fr("Stone shadow","Ombre des pierres");
mxG.fr("Stretching","Étirement");
mxG.fr("Colors","Couleurs");
mxG.fr("Thickness","Épaisseurs");
mxG.fr("Zoom+","Agrandir");
mxG.fr("No zoom","Normal");
mxG.fr("Zoom-","Réduire");
mxG.fr("Reset","Réinitialiser");
mxG.fr("Goban background color:","Couleur de fond du goban :");
mxG.fr("Goban background image:","Image de fond du goban :");
mxG.fr("Line color:","Couleur des lignes :");
mxG.fr("Line thickness:","Épaisseur des lignes :");
mxG.fr("Mark thickness:","Épaisseur des marques :");
mxG.fr("Star radius:","Rayon des hoshis :");
mxG.fr("Stone outline thickness:","Épaisseur des contours des pierres :");
mxG.fr("Text outline thickness:","Épaisseur des contours des lettres :");
mxG.G.prototype.setViewItemCoche=function(b,v)
{
	let e=this.getE(b+"Btn");
	e.classList.add(v?"mxCoched":"mxCochable");
	e.classList.remove(v?"mxCochable":"mxCoched");
}
mxG.G.prototype.setViewCoche=function()
{
	this.setViewItemCoche("In3d",this.in3dOn);
	this.setViewItemCoche("Stretching",this.stretching=="0,0,1,1"?0:1);
	this.setViewItemCoche("StoneShadow",this.stoneShadowOn);
	this.setViewItemCoche("Colors",0);
	this.setViewItemCoche("Thickness",0);
	this.setViewItemCoche("ZoomPlus",this.gscale>1?1:0);
	this.setViewItemCoche("NoZoom",this.gscale==1?1:0);
	this.setViewItemCoche("ZoomMinus",this.gscale<1?1:0);
	this.setViewItemCoche("Reset",0);
};
mxG.G.prototype.setIndicesView=function()
{
	let g=this.getE("GobanSvg").querySelector(".mxIndices");
	if(g)
	{
		g.setAttributeNS(null,"fill",this.scr.glc);
		if(this.sw4text!="0")
		{
			g.setAttributeNS(null,"stroke",this.scr.glc);
			g.setAttributeNS(null,"stroke-width",this.scr.sw4text);
		}
		else
		{
			g.removeAttributeNS(null,"stroke");
			g.removeAttributeNS(null,"stroke-width");
		}
	}
}
mxG.G.prototype.setGobanBk=function()
{
	let g,svg,im,bk,c;
	g=this.getE("GobanDiv");
	if(!g) return;
	svg=g.querySelector("svg");
	im=g.querySelector("svg>image");
	if(im) svg.removeChild(im);
	if(this.gbki)
	{
		if(this.gbki!="none")
		{
			// if one creates the image using document.createElementNS
			// get error: 414 (Request-URI Too Long)
			// so discard this method at the moment
			im='';
  			im+='<image';
			im+=' x="0" y="0" width="'+this.scr.w+'" height="'+this.scr.h+'"';
			im+=' preserveAspectRatio="none"';
			im+=' href="'+this.gbki+'"';
			im+='/>';
			svg.innerHTML=svg.innerHTML.replace(/(<rect[^>]+Outer)/,im+"$1");
		}
	}
	bk=g.querySelector(".mxWholeRect");
	c=this.gbkc?((this.gbkc=="transparent")?"none":this.gbkc):"none";
	if(bk) bk.setAttributeNS(null,"fill",c);
};
mxG.G.prototype.setInputColors=function()
{
	let e,c,list,k,km,bkk;
	if(this.gbki&&(this.gbki!="none"))
	{
		c="";
		bkk=Object.keys(this.bk);
		km=bkk.length;
		for(k=0;k<km;k++) if(this.bk[bkk[k]]==this.gbki) break;
		if(k<km)
		{
			e=document.querySelector("[name="+this.n+"GobanBkRadio][value="+bkk[k]+"]");
			e.checked=true;
		}
		else
		{
			e=document.querySelector("[name="+this.n+"GobanBkRadio][value=none]");
			e.checked=true;
		}
	}
	else
	{
		c=this.gbkc;
		e=document.querySelector("[name="+this.n+"GobanBkRadio][value=none]");
		e.checked=true;
	}
	this.getE("GobanBkTextInput").value=c;
	this.getE("LineColorTextInput").value=this.scr.glc;
};
mxG.G.prototype.doTextInputGobanBk=function()
{
	e=document.querySelector("[name="+this.n+"GobanBkRadio][value=none]");
	e.checked=true;
};
mxG.G.prototype.buildColors=function()
{
	let s="";
	s+="<h1 tabindex=\"0\">"+this.local("Colors")+"</h1>";
	s+="<p>";
	s+="<label class=\"mxGobanBkTextInput\" for=\""+this.n+"GobanBkTextInput\">"+this.local("Goban background color:");
	s+=" <input type=\"text\" oninput=\""+this.g+".doTextInputGobanBk()\" id=\""+this.n+"GobanBkTextInput\">";
	s+="</label>";
	s+="</p>";
	s+="<p>";
	s+=this.local("Goban background image:");
	s+="</p>";
	s+="<p>";
	s+="<label class=\"mxGobanBkRadio\">";
	s+="<input name=\""+this.n+"GobanBkRadio\" checked value=\"none\" type=\"radio\">";
	s+=" "+this.local("None")+"</label>";
	s+="<label class=\"mxGobanBkRadio\">";
	s+="<input name=\""+this.n+"GobanBkRadio\" value=\"Bamboo\" type=\"radio\">";
	s+=" "+this.local("Bamboo")+"</label>";
	s+="<label class=\"mxGobanBkRadio\">";
	s+="<input name=\""+this.n+"GobanBkRadio\" value=\"Beech\" type=\"radio\">";
	s+=" "+this.local("Beech")+"</label>";
	s+="<label class=\"mxGobanBkRadio\">";
	s+="<input name=\""+this.n+"GobanBkRadio\" value=\"Cherry\" type=\"radio\">";
	s+=" "+this.local("Cherry")+"</label>";
	s+="<label class=\"mxGobanBkRadio\">";
	s+="<input name=\""+this.n+"GobanBkRadio\" value=\"Kaya\" type=\"radio\">";
	s+=" "+this.local("Kaya")+"</label>";
	s+="<label class=\"mxGobanBkRadio\">";
	s+="<input name=\""+this.n+"GobanBkRadio\" value=\"Pine\" type=\"radio\">";
	s+=" "+this.local("Pine")+"</label>";
	s+="<label class=\"mxGobanBkRadio\">";
	s+="<input name=\""+this.n+"GobanBkRadio\" value=\"Rosewood\" type=\"radio\">";
	s+=" "+this.local("Rosewood")+"</label>";
	s+="<label class=\"mxGobanBkRadio\">";
	s+="<input name=\""+this.n+"GobanBkRadio\" value=\"Troyes\" type=\"radio\">";
	s+=" "+this.local("Troyes")+"</label>";
	s+="</p>";
	s+="<p>";
	s+="<label class=\"mxLineTextInput\">"+this.local("Line color:");
	s+=" <input type=\"text\" id=\""+this.n+"LineColorTextInput\">";
	s+="</label>";
	s+="</p>";
	return s;
};
mxG.G.prototype.doColorsOK=function()
{
	let e,a,b,c;
	e=document.querySelector("[name="+this.n+"GobanBkRadio]:checked");
	if(!e||(e.value=="none")) c="none";
	else c=this.bk[e.value];
	this.gbki=c;
	if(c=="none")
	{
		a=this.getE("GobanBkTextInput").value;
		if(!CSS.supports('color',a)) a="transparent";
	}
	else a="";
	this.gbkc=a;
	b=this.getE("LineColorTextInput").value;
	if(!CSS.supports('color',b)) b="#000";
	this.scr.glc=b;
	window.localStorage.setItem("gbki",this.gbki);
	window.localStorage.setItem("gbkc",this.gbkc);
	window.localStorage.setItem("glc",this.scr.glc);
	this.updateAll();
};
mxG.G.prototype.doColors=function()
{
	let btns=[{n:"OK",a:"Colors"},{n:"Cancel"}];
	this.doDialog("EditColors",this.buildColors(),btns);
	this.setInputColors();
};
mxG.G.prototype.setInputThickness=function()
{
	this.getE("R4starInput").value=this.scr.r4star;
	this.getE("Sw4gridInput").value=this.scr.sw4grid;
	this.getE("Sw4markInput").value=this.scr.sw4mark;
	this.getE("Sw4stoneInput").value=this.scr.sw4stone;
	this.getE("Sw4textInput").value=this.scr.sw4text;
};
mxG.G.prototype.buildThickness=function()
{
	let s="";
	s+="<h1 tabindex=\"0\">"+this.local("Thickness")+"</h1>";
	s+="<p>";
	s+="<label class=\"mxR4starInput\">"+this.local("Star radius:");
	s+=" <input type=\"text\" id=\""+this.n+"R4starInput\">";
	s+="</label>";
	s+="</p>";
	s+="<p>";
	s+="<label class=\"mxSw4gridInput\">"+this.local("Line thickness:");
	s+=" <input type=\"text\" id=\""+this.n+"Sw4gridInput\">";
	s+="</label>";
	s+="</p>";
	s+="<p>";
	s+="<label class=\"mxSw4markInput\">"+this.local("Mark thickness:");
	s+=" <input type=\"text\" id=\""+this.n+"Sw4markInput\">";
	s+="</label>";
	s+="</p>";
	s+="<p>";
	s+="<label class=\"mxSw4stoneInput\">"+this.local("Stone outline thickness:");
	s+=" <input type=\"text\" id=\""+this.n+"Sw4stoneInput\">";
	s+="</label>";
	s+="</p>";
	s+="<p>";
	s+="<label class=\"mxSw4textInput\">"+this.local("Text outline thickness:");
	s+=" <input type=\"text\" id=\""+this.n+"Sw4textInput\">";
	s+="</label>";
	s+="</p>";
	return s;
};
mxG.G.prototype.numberize=function(s)
{
	let n=parseFloat(s);
	if(!n||(n<0)||(n>this.scr.d)) return "0";
	return n+"";
};
mxG.G.prototype.doThicknessOK=function()
{
	this.scr.r4star=this.numberize(this.getE("R4starInput").value);
	window.localStorage.setItem("r4star",this.scr.r4star);
	this.scr.sw4grid=this.numberize(this.getE("Sw4gridInput").value);
	window.localStorage.setItem("sw4grid",this.scr.sw4grid);
	this.scr.sw4mark=this.numberize(this.getE("Sw4markInput").value);
	window.localStorage.setItem("sw4mark",this.scr.sw4mark);
	this.scr.sw4stone=this.numberize(this.getE("Sw4stoneInput").value);
	window.localStorage.setItem("sw4stone",this.scr.sw4stone);
	this.scr.sw4text=this.numberize(this.getE("Sw4textInput").value);
	window.localStorage.setItem("sw4text",this.scr.sw4text);
	this.hasToSetGoban=1;
	if(this.hasC("Edit")) this.hasToSetEditTools=1;
	if(this.hasC("Tree")) this.hasToSetTree=1;
	this.updateAll();
};
mxG.G.prototype.doThickness=function()
{
	let btns=[{n:"OK",a:"Thickness"},{n:"Cancel"}];
	this.doDialog("EditThickness",this.buildThickness(),btns);
	this.setInputThickness();
};
mxG.G.prototype.doZoom=function(s)
{
	if(this.hasC("Menu")) this.toggleMenu("View",0);
	if(s=="+") this.gscale*=1.1;
	else if(s=="-") this.gscale/=1.1;
	else this.gscale=1;
	this.gscale=Number(this.gscale.toFixed(1));
	window.localStorage.setItem("gscale",this.gscale);
	if(this.gscale!=1)
		this.getE("GlobalBoxDiv").style.setProperty('--gobanScale',this.gscale);
	else
		this.getE("GlobalBoxDiv").style.removeProperty('--gobanScale');
	this.updateAll();
};
mxG.G.prototype.doZoomPlus=function(){this.doZoom("+");};
mxG.G.prototype.doNoZoom=function(){this.doZoom("=");};
mxG.G.prototype.doZoomMinus=function(){this.doZoom("-");};
mxG.G.prototype.doIn3d=function()
{
	if(this.hasC("Menu")) this.toggleMenu("View",0);
	this.in3dOn=this.in3dOn?0:1;
	this.setIn3d();
	this.hasToSetGoban=1;
	if(this.hasC("Tree")) this.hasToSetTree=1;
	if(this.hasC("Edit")) this.hasToSetEditTools=1;
	window.localStorage.setItem("in3dOn",this.in3dOn+"");
	this.updateAll();
};
mxG.G.prototype.doStretching=function()
{
	if(this.hasC("Menu")) this.toggleMenu("View",0);
	if(this.stretching=="0,0,1,1") this.stretching="0,1,1,2";
	else this.stretching="0,0,1,1";
	this.hasToSetGoban=1;
	if(this.hasC("Tree")) this.hasToSetTree=1;
	if(this.hasC("Edit")) this.hasToSetEditTools=1;
	window.localStorage.setItem("stretching",this.stretching);
	this.updateAll();
};
mxG.G.prototype.doStoneShadow=function()
{
	if(this.hasC("Menu")) this.toggleMenu("View",0);
	this.stoneShadowOn=this.stoneShadowOn?0:1;
	this.hasToSetGoban=1;
	if(this.hasC("Tree")) this.hasToSetTree=1;
	if(this.hasC("Edit")) this.hasToSetEditTools=1;
	window.localStorage.setItem("stoneShadowOn",this.stoneShadowOn+"");
	this.updateAll();
};
mxG.G.prototype.doReset=function()
{
	if(this.hasC("Menu")) this.toggleMenu("View",0);
	this.doNoZoom(); // otherwise cannot reset zoom properly
	window.localStorage.clear();
	this.in3dOn=this.setA("in3dOn",0,"bool");
	this.setIn3d();
	this.stoneShadowOn=this.setA("stoneShadowOn",0,"bool");
	this.stretching=this.setA("stretching","0,0,1,1","string");
	this.initView();
	this.hasToSetGoban=1;
	if(this.hasC("Tree")) this.hasToSetTree=1;
	if(this.hasC("Edit")) this.hasToSetEditTools=1;
	this.updateAll();
}
mxG.G.prototype.updateAfterView=function()
{
	// must be executed after all updates
	// so call it updateAfterView and add AfterView as a component
	this.setGobanBk();
	this.setIndicesView();
};
mxG.G.prototype.initView=function()
{
	let e=this.getE("GlobalBoxDiv"),dir,v,s,indicesOff;
	dir="../_img/bk/";
	this.bk={};
	this.bk["Bamboo"]="data:image/jpeg;base64,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";
	this.bk["Beech"]="data:image/jpeg;base64,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";
	this.bk["Cherry"]="data:image/jpeg;base64,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";
	this.bk["Kaya"]="data:image/jpeg;base64,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";
	this.bk["Pine"]="data:image/jpeg;base64,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";
	this.bk["Rosewood"]="data:image/jpeg;base64,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";
	this.bk["Troyes"]="data:image/jpeg;base64,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";
	// assume minimalist theme (no goban elements set in css)
	// assume goban background is transparent
	// assume lines, star points, marks ... have the same color and are black
	if(v=window.localStorage.getItem("in3dOn"))
	{
		this.in3dOn=parseInt(v);
		this.setIn3d();
	}
	if(v=window.localStorage.getItem("gbki")) this.gbki=v; else this.gbki="none";
	if(v=window.localStorage.getItem("gbkc")) this.gbkc=v; else this.gbkc="transparent";
	if(v=window.localStorage.getItem("glc")) this.scr.glc=v; else this.scr.glc="#000";
	if(v=window.localStorage.getItem("r4star")) this.scr.r4star=v; else this.scr.r4star="2.5";
	if(v=window.localStorage.getItem("sw4grid")) this.scr.sw4grid=v; else this.scr.sw4grid="1";
	if(v=window.localStorage.getItem("sw4mark")) this.scr.sw4mark=v; else this.scr.sw4mark="1";
	if(v=window.localStorage.getItem("sw4stone")) this.scr.sw4stone=v; else this.scr.sw4stone="1";
	if(v=window.localStorage.getItem("sw4text")) this.scr.sw4text=v; else this.scr.sw4text="0";
	if(v=window.localStorage.getItem("stretching")) this.stretching=v;
	if(v=window.localStorage.getItem("stoneShadowOn")) this.stoneShadowOn=parseInt(v);
	if(v=window.localStorage.getItem("gscale")) this.gscale=parseFloat(v); else this.gscale=1;
	if(this.gscale!=1) this.getE("GlobalBoxDiv").style.setProperty('--gobanScale',this.gscale);
};
mxG.G.prototype.createView=function()
{
	// menuViewItems is used by "Menu" component
	this.menuViewItems=
	[
		{n:"In3d",v:this.local("2d/3d")},
		{n:"Stretching",v:this.local("Stretching")},
		{n:"StoneShadow",v:this.local("Stone shadow")},
		{n:"Colors",v:this.local("Colors")},
		{n:"Thickness",v:this.local("Thickness")},
		{n:"ZoomPlus",v:this.local("Zoom+")},
		{n:"NoZoom",v:this.local("No zoom")},
		{n:"ZoomMinus",v:this.local("Zoom-")},
		{n:"Reset",v:this.local("Reset")}
	];
	return "";
};
}
