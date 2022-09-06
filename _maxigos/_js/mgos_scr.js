// maxiGos v7 > mgos_scr.js
// screen output manager
// remember: css properties have priority on svg attributes
if(!mxG.S)
{
mxG.S=function(p)
{
	// set them as soon as possible
	this.p=p; // parent object: mxG.D[k] 
	this.d=23;
	this.ff="Arial,sans-serif";
	this.fs=14;
	this.fw=400;
	this.sw4text="";
	this.sw4mark="1.125";
	this.sw4grid="1.125";
	this.sw4stone="1.125";
	this.stoneShadowWidth=1;
};
mxG.S.prototype.star=function(x,y)
{
	var DX=this.DX,DY=this.DY;
	var Ax=4,Bx=DX+1-Ax,Cx=((DX+1)>>1);
	var Ay=4,By=DY+1-Ay,Cy=((DY+1)>>1);
	var xok=0,yok=0;
	if((DX>11)&&((x==Ax)||(x==Bx))) xok=1;
	if((DX&1)&&((DX>15)||(x==y))&&(x==Cx)) xok=1;
	if((DY>11)&&((y==Ay)||(y==By))) yok=1;
	if((DY&1)&&((DY>15)||(x==y))&&(y==Cy)) yok=1;
	return xok&&yok;
};
mxG.S.prototype.isLabel=function(m)
{
	return /^\(*\|.*\|\)*$/.test(m);
};
mxG.S.prototype.removeLabelDelimiters=function(m)
{
	return m.replace(/^(\(*)\|(.*)\|(\)*)$/,"$1$2$3");
};
mxG.S.prototype.isVariation=function(m)
{
	return /^\(.*\)$/.test(m);
};
mxG.S.prototype.isVariationOnFocus=function(m)
{
	return /^\(\([^()]*\)\)$/.test(m);
};
mxG.S.prototype.removeVariationDelimiters=function(m)
{
	return m.replace(/^\(+([^()]*)\)+$/,"$1");
};
mxG.S.prototype.isMark=function(m)
{
	return /^\(*_(CR|MA|SQ|TR)_\)*$/.test(m);
};
mxG.S.prototype.i2x=function(i)
{
	return this.dw*(i-this.xl+0.5)+this.gbsxl;
};
mxG.S.prototype.j2y=function(j)
{
	return this.dh*(j-this.yt+0.5)+this.gbsyt;
};
mxG.S.prototype.makeText=function(txt,i,j,o)
{
	var s,x,y,dx,dy,c,cls,cls2="",wbk,hbk,w,h,dw2,dh2,dz,sw,sx;
	cls=o.cls;
	c=o.c;
	sw=o.sw;
	dz=this.grim+this.grip;
	txt+="";
	dx=(i<1)?-dz:(i>this.DX)?dz:0;
	dy=(j<1)?-dz:(j>this.DY)?dz:0;
	if((i<1)||(j<1)||(i>this.DX)||(j>this.DY))
	{
		dw2=this.db/2;
		dh2=this.db/2;
	}
	else
	{
		dw2=this.dw/2;
		dh2=this.dh/2;
	}
	x=this.dw*(i-this.xl+1)-dw2+this.gbsxl+dx;
	y=this.dh*(j-this.yt+1)-dh2+this.gbsyt+dy;
	s="<text";
	if(cls) s+=" class=\""+cls+"\"";
	if(c&&!o.ignoreFillAndStroke)
	{
		s+=" fill=\""+c+"\"";
		if (sw) s+=" stroke=\""+c+"\"";
	}
	if (sw&&!o.ignoreFillAndStroke) s+=" stroke-width=\""+sw+"\"";
	if((cls.indexOf("mxVertical")>=0)
		&&((cls.indexOf("mxLen2")>=0)||(cls.indexOf("mxLen3")>=0)))
	{
		// japanese kanji
		// bug? in firefox (08/2019), cannot use css textLength+vertical-rl
		// bug? in safari (08/2019), cannot use css transform-box
		s+=" transform=\"translate(0,"+(y-2)+")";
		if(cls.indexOf("mxLen3")>=0) s+=" scale(1,0.33)";
		else s+=" scale(1,0.5)";
		s+=" translate(0,-"+y+")\"";
		s+=" writing-mode=\"vertical-rl\"";
	}
	else if(txt.length>1)
	{
		// using svg transform seems to be the safest way to shrink text width
		// translate(x,0) scale(sx,1) translate(-x,0)
		// is as matrix(sx,0,0,1,x*(1-sx),0)
		if(txt.length>2) sx=0.8;
		else sx=0.9;
		s+=" transform=\"matrix("+sx+",0,0,1,"+Math.round(x*(1-sx)*100)/100+",0)\"";
	}
	// font-family, font-size and text-anchor are set in svg tag
	// bug, cannot use dominant-baseline:central everywhere
	// then just add 5 to y to center text verticaly
	s+=" x=\""+x+"\" y=\""+(y+5)+"\">";
	s+=txt;
	s+="</text>";
	return s;
};
mxG.S.prototype.make2dStone=function(c,x,y,r,o)
{
	var s;
	s="<circle class=\"mx"+c+"\"";
	if(o.opacity<1) s+="fill-opacity=\""+o.opacity+"\"";
	if(!o.ignoreFillAndStroke) // alone stones, animated stones ...
	{
		let glc=(o.animatedStone&&this.p.glc)?this.p.glc:"#000";
		s+=" fill=\""+(c=="Black"?"#000":"#fff")+"\"";
		s+=" stroke=\""+(((c=="Black")&&o.whiteStroke4Black)?"#fff":glc)+"\"";
		s+=" stroke-width=\""+this.sw4stone+"\"";
	}
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+(r-(this.sw4stone-1)/2)+"\"/>";
	return s;
};
mxG.S.prototype.makeStoneShadow=function(c,x,y,r,o)
{
	var s="",e=this.stoneShadowWidth;
	s+="<circle class=\"mx"+c+"Shadow\"";
	// opacity better than rgba() for exporting
	if(!o.ignoreFillAndStroke) s+=" fill=\"#000\" opacity=\"0.2\"";
	s+=" cx=\""+(x+e)+"\" cy=\""+(y+e)+"\" r=\""+r+"\"/>";
	return s;
};
mxG.S.prototype.make3dStone1=function(c,x,y,r,o)
{
	var s="",e=this.stoneShadowWidth;
	if(o.stoneShadowOn) s+=this.makeStoneShadow(c,x,y,r,o);
	s+="<circle class=\"mx"+c+"\"";
	if(o.opacity<1) s+="fill-opacity=\""+o.opacity+"\"";
	if(!o.ignoreFillAndStroke) s+=" fill=\"url(#"+this.p.n+c[0]+"RG)\"";
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+r+"\"/>";
	return s;
};
mxG.S.prototype.make3dStone2=function(c,x,y,r,o)
{
	// do not ignore fill and stroke here
	var s="",a,rg;
	if(o.stoneShadowOn) s+=this.makeStoneShadow(c,x,y,r,o);
	s+="<circle class=\"mx"+c+"\"";
	if(o.opacity<1) s+="fill-opacity=\""+o.opacity+"\"";
	s+=" fill=\"url(#"+this.p.n+c[0]+"RGA)\"";
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+r+"\"/>";
	s+="<circle class=\"mx"+c+"2\"";
	if(o.opacity<1) s+="fill-opacity=\""+o.opacity+"\"";
	rg="B";
	if(c=="White")
	{
		a=this.p.alea8[Math.round((x+y)/r/2)%8];
		if(a) rg+=a;
	}
	s+=" fill=\"url(#"+this.p.n+c[0]+"RG"+rg+")\"";
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+r+"\"/>";
	return s;
};
mxG.S.prototype.makeStone=function(c,x,y,r,o)
{
	if(o.in3dOn) return this["make3dStone"+(this.p.specialStoneOn?2:1)](c,x,y,r,o);
	else return this.make2dStone(c,x,y,r,o);
};
mxG.S.prototype.makeTextOnAloneStone=function(txt,x,y,d,c,o)
{
	// assume txt is a number
	var s,x,y;
	txt+="";
	s="<text";
	s+=" text-anchor=\"middle\"";
	s+=" fill=\""+c+"\"";
	if(this.sw4text) s+=" stroke=\""+c+"\" stroke-width=\""+this.sw4text+"\"";
	if(txt.length>1)
	{
		if(o.vertical)
		{
			s+=" transform=\"translate(0,"+(y-2)+")";
			if(txt.length>2) s+=" scale(1,0.33)";
			else s+=" scale(1,0.5)";
			s+=" translate(0,-"+y+")\"";
			s+=" writing-mode=\"vertical-rl\"";
		}
		else
		{
			// using svg transform seems to be the safest way to shrink text width
			s+=" transform=\"translate("+x+",0)";
			if(txt.length>2) s+=" scale(0.8,1)";
			else s+=" scale(0.9,1)";
			s+=" translate(-"+x+",0)\"";
		}
	}
	// font-family, font-size and text-anchor are set in svg tag
	// bug, cannot use dominant-baseline:central everywhere
	// then just add 5 to y to center text verticaly
	s+=" x=\""+x+"\" y=\""+(y+5)+"\">";
	s+=txt;
	s+="</text>";
	return s;
};
mxG.S.prototype.makeTextAfterAloneStone=function(txt,d,c)
{
	var s,x,y;
	txt+="";
	x=d+d/8;
	y=d/2;
	s="<text class=\"mxAfterAloneStone\"";
	s+=" fill=\""+c+"\"";
	if(this.sw4text) s+=" stroke=\""+c+"\" stroke-width=\""+this.sw4text+"\"";
	// font-family and font-size are set in svg tag
	// bug, cannot use dominant-baseline:central everywhere
	// then just add 5 to y to center text verticaly
	s+=" x=\""+x+"\" y=\""+(y+5)+"\">";
	s+=txt;
	s+="</text>";
	return s;
};
mxG.S.prototype.makeAloneStone=function(nat,n,o)
{
	var s,d=this.d,dd=d+2,x=dd/2,y=dd/2,z,c,t;
	z=(o.in3dOn&&o.stoneShadowOn)?this.stoneShadowWidth:0;
	s="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	// final viewBox, width and height will be modified when rendering
	s+=" viewBox=\""+(-z)+" "+(-z)+" "+(dd+2*z)+" "+(dd+2*z)+"\"";
	//s+=" width=\""+(dd+2*z)+"\" height=\""+(dd+2*z)+"\"";
	s+=" width=\"40\" height=\"40\""; // acceptable size if no css
	s+=" font-family=\""+this.ff+"\"";
	s+=" font-size=\""+this.fs+"\"";
	s+=" font-weight=\""+this.fw+"\"";
	s+=">";
	c=(nat=="B")?"Black":(nat=="W")?"White":null;
	if(c)
	{
		o.opacity=1;
		s+=this.makeStone(c,x,y,d/2,o);
		if(n) s+=this.makeTextOnAloneStone(n,dd/2,dd/2,dd,(nat=="B")?"White":"Black",o);
	}
	s+="</svg>";
	return s;
};
mxG.S.prototype.makeAloneStoneAndText=function(nat,n,v,o)
{
	var s,d=this.d,dd=d+2,x=dd/2,y=dd/2,z,c,t;
	z=(o.in3dOn&&o.stoneShadowOn)?this.stoneShadowWidth:0;
	s="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	// final viewBox, width and height will be modified when rendering
	s+=" viewBox=\""+(-z)+" "+(-z)+" "+(dd+2*z)+" "+(dd+2*z)+"\"";
	s+=" width=\"100%\" height=\"40\""; // acceptable size if no css
	s+=" font-family=\""+this.ff+"\"";
	s+=" font-size=\""+this.fs+"\"";
	s+=" font-weight=\""+this.fw+"\"";
	s+=">";
	c=(nat=="B")?"Black":(nat=="W")?"White":null;
	if(v)
	{
		t=this.p.local(c?c:"")+(n?(c?" ":"")+n:"")+v;
		s+="<title>"+t+"</title>";
	}
	if(c)
	{
		o.opacity=1;
		s+=this.makeStone(c,x,y,d/2,o);
		if(n) s+=this.makeTextOnAloneStone(n,dd/2,dd/2,dd,(nat=="B")?"White":"Black",o);
		if(v) s+=this.makeTextAfterAloneStone(v,dd,"Black");
	}
	s+="</svg>";
	return s;
};
mxG.S.prototype.makeTextSomewhere=function(txt,x,y,c,centered)
{
	// x: center of the text if centered, beginning of the text otherwise
	// y: center of the text
	var s;
	txt+="";
	s="<text class=\"mxTextSomewhere\"";
	s+=" fill=\""+c+"\"";
	if(this.sw4text) s+=" stroke=\""+c+"\" stroke-width=\""+this.sw4text+"\"";
	if(centered) s+=" text-anchor=\"middle\"";
	// font-family and font-size are set in svg tag
	// bug, cannot use dominant-baseline:central everywhere
	// then just add 5 to y to center text verticaly
	s+=" x=\""+x+"\" y=\""+(y+5)+"\">";
	s+=txt;
	s+="</text>";
	return s;
};
mxG.S.prototype.makeNotSeen=function(a,o)
{
	var k,km,s="",nw,h4ns,title="",i,j,c,x,y,xo;
	var d,dd,ddd,z;
	d=this.d;
	dd=this.d+2;
	z=(o.in3dOn&&o.stoneShadowOn)?this.stoneShadowWidth:0;
	ddd=dd+2*z;
	km=a.length;
	for(k=0;k<km;k++)
	{
		if(k) title+=", ";
		title+=this.p.local(a[k].nat=="B"?"Black":"White")+" "+a[k].n+" "+a[k].t;
		if(a[k].nato) title+=" "+this.p.local(a[k].nato=="B"?"Black":"White")+" "+a[k].no;
	}
	// compute h4ns
	nw=Math.floor(this.w/(4*ddd));
	if(nw<1) nw=1;
	nl=Math.ceil(km/nw);
	h4ns=nl*ddd;
	xo=(this.w-nw*4*ddd+ddd)/2;
	s="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	s+=" id=\""+this.p.n+"NotSeenSvg\" class=\"mxNotSeenSvg\"";
	s+=" viewBox=\"0 0 "+this.w+" "+h4ns+"\"";
	s+=" width=\""+this.w+"\" height=\""+h4ns+"\"";
	s+=" stroke-linecap=\"square\"";
	s+=" font-family=\""+this.ff+"\"";
	s+=" font-size=\""+this.fs+"\"";
	s+=" font-weight=\""+this.fw+"\"";
	s+=">";
	s+="<title>"+title+"</title>"; // accessibility
	if(this.in3dOn)
	{
		s+="<defs>";
		s+=this.makeGradient("Black");
		s+=this.makeGradient("White");
		s+="</defs>";
	}
	for(k=0;k<km;k++)
	{
		i=k%nw;
		j=Math.floor(k/nw);
		c=(a[k].nat=="B")?"Black":"White";
		o.opacity=1;
		x=xo+i*ddd*4+ddd/2;
		y=j*ddd+ddd/2;
		s+=this.makeStone(c,x,y,d/2,o);
		if(a[k].n) s+=this.makeTextOnAloneStone(a[k].n,x,y,dd,(a[k].nat=="B")?"White":"Black",o);
		if(a[k].t)
		{
			if(a[k].nato)
				s+=this.makeTextSomewhere(a[k].t,x+ddd,y,"Black",1);
			else
				s+=this.makeTextSomewhere(a[k].t,x+ddd/2+d/8,y,"Black",0);
		}
		if(a[k].nato)
		{
			c=(a[k].nato=="B")?"Black":"White";
			o.opacity=1;
			x=xo+(i*4+2)*ddd+ddd/2;
			y=j*ddd+ddd/2;
			s+=this.makeStone(c,x,y,d/2,o);
			if(a[k].no) s+=this.makeTextOnAloneStone(a[k].no,x,y,dd,(a[k].nato=="B")?"White":"Black",o);
		}
	}
	s+="</svg>";
	return s;
};
mxG.S.prototype.makeSelectTool=function()
{
	var s,d=this.d,dd=d+2,x=dd/2,y=dd/2,z,c="#000";
	z=d*3/4;
	s="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	s+=" viewBox=\"0 0 "+dd+" "+dd+"\"";
	s+=" width=\"40\" height=\"40\""; // acceptable size if no css
	s+=">";
	s+="<rect stroke-dasharray=\"2\"";
	s+=" fill=\"none\" stroke=\""+c+"\" stroke-width=\""+this.sw4grid+"\"";
	s+=" x=\""+(x-z/2)+"\" y=\""+(y-z/2)+"\"";
	s+=" width=\""+z+"\" height=\""+z+"\"/></g>";
	s+="</svg>";
	return s;
};
mxG.S.prototype.makeViewTool=function()
{
	var s,d=this.d,dd=d+2,x=dd/2,y=dd/2,z,c="#000";
	z=d*3/4;
	s="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	s+=" viewBox=\"0 0 "+dd+" "+dd+"\"";
	s+=" width=\"40\" height=\"40\""; // acceptable size if no css
	s+=">";
	s+="<g fill=\"none\" stroke=\""+c+"\" stroke-width=\""+this.sw4grid+"\">"
	s+="<rect";
	s+=" x=\""+(x-z/2)+"\" y=\""+(y-z/2)+"\"";
	s+=" width=\""+z+"\" height=\""+z+"\"/>";
	s+="<rect";
	s+=" x=\""+x+"\" y=\""+(y-z/2)+"\"";
	s+=" width=\""+z/2+"\" height=\""+z/2+"\"/>";
	s+="</g>";
	s+="</svg>";
	return s;
};
mxG.S.prototype.makeAloneBiStone=function(nat,o)
{
	let s,d=this.d,dd=d+2,x=dd/2,y=dd/2,c1,c2,r,z;
	z=(this.p.in3dOn&&this.p.stoneShadowOn)?this.stoneShadowWidth:0;
	if(nat.slice(-1)=="B"){c1="Black";c2="White";}
	else {c1="White";c2="Black";}
	s="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	s+=" xmlns:xlink=\"http://www.w3.org/1999/xlink\"";
	//s+=" viewBox=\"0 0 "+dd+" "+dd+"\"";
	s+=" viewBox=\""+(-z)+" "+(-z)+" "+(dd+2*z)+" "+(dd+2*z)+"\"";
	s+=" width=\"40\" height=\"40\""; // acceptable size if no css
	s+=">";
	s+="<defs>";
	s+="<clipPath id=\""+this.p.n+"SetupBlackClip\"><path";
	s+=" d=\"M0 0L"+x+" 0L"+x+" "+dd+"L0 "+dd+"Z\"";
	s+="/></clipPath>";
	s+="<clipPath id=\""+this.p.n+"SetupWhiteClip\">";
	s+="<path";
	s+=" d=\"M"+dd+" 0L"+x+" 0L"+x+" "+dd+"L"+dd+" "+dd+"Z\"";
	s+="/>";
	s+="</clipPath>";
	s+="</defs>";
	if(o.in3dOn) r=d/2; else r=(d-this.sw4stone+1)/2;
	if(this.stoneShadowOn)
	{
		let e=this.stoneShadowWidth;
		s+="<circle";
		s+=" fill=\"#000\" opacity=\"0.2\"";
		s+=" cx=\""+(x+e)+"\" cy=\""+(y+e)+"\" r=\""+r+"\"/>";
	}
	s+="<circle";
	s+=" clip-path=\"url(#"+this.p.n+"SetupBlackClip)\"";
	if(o.in3dOn) s+=" fill=\"url(#"+this.p.n+c1[0]+"RG)\"";
	else s+=" fill=\""+c1+"\" stroke=\"#000\" stroke-width=\""+this.sw4stone+"\"";
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+r+"\"";
	s+="/>";
	s+="<circle";
	s+=" clip-path=\"url(#"+this.p.n+"SetupWhiteClip)\"";
	if(o.in3dOn) s+=" fill=\"url(#"+this.p.n+c2[0]+"RG)\"";
	else s+=" fill=\""+c2+"\" stroke=\"#000\" stroke-width=\""+this.sw4stone+"\"";
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+r+"\"";
	s+="/>";
	s+="</svg>";
	return s;
};
mxG.S.prototype.makeMarkOnLast=function(c,x,y,cls)
{
	var s,z;
	z=this.d/6;
	s="<rect class=\""+cls+"\"";
	s+=" fill=\""+c+"\"";
	s+=" x=\""+(x-z)+"\" y=\""+(y-z)+"\"";
	s+=" width=\""+z*2+"\" height=\""+z*2+"\"/>";
	return s;
};
mxG.S.prototype.makeMark=function(c,x,y,cls)
{
	var s,x1,y1,x2,y2,z=this.d*0.28;
	x1=x-z;
	y1=y-z;
	x2=x+z;
	y2=y+z;
	s="<path class=\""+cls+"\"";
	s+=" stroke-width=\""+this.sw4mark+"\" stroke=\""+c+"\" fill=\"none\"";
	s+=" d=\"M"+x1+" "+y1+"L"+x2+" "+y2+"M"+x1+" "+y2+"L"+x2+" "+y1+"\"/>";
	return s;
};
mxG.S.prototype.makeCircle=function(c,x,y,cls)
{
	var s,z=this.d*0.27;
	s="<circle class=\""+cls+"\"";
	s+=" stroke-width=\""+this.sw4mark+"\" stroke=\""+c+"\" fill=\"none\"";
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+z+"\"/>";
	return s;
};
mxG.S.prototype.makeTriangle=function(c,x,y,cls)
{
	var s,x1,y1,x2,y2,x3,y3,z=this.d*0.32;
	x1=x;
	y1=y-z;
	x2=x-z;
	y2=y+z*0.8;
	x3=x+z;
	y3=y+z*0.8;
	s="<polygon class=\""+cls+"\"";
	s+=" stroke-width=\""+this.sw4mark+"\" stroke=\""+c+"\" fill=\"none\"";
	s+=" points=\""+x1+" "+y1+" "+x2+" "+y2+" "+x3+" "+y3+"\"/>";
	return s;
};
mxG.S.prototype.makeSquare=function(c,x,y,cls)
{
	var s,z=this.d*0.27;
	s="<rect class=\""+cls+"\"";
	s+=" stroke-width=\""+this.sw4mark+"\" stroke=\""+c+"\" fill=\"none\"";
	s+=" x=\""+(x-z)+"\" y=\""+(y-z)+"\"";
	s+=" width=\""+z*2+"\" height=\""+z*2+"\"/>";
	return s;
};
mxG.S.prototype.makeAloneMark=function(m)
{
	var s,d=this.d,dd=d+2,x=dd/2,y=dd/2,c="#000",cls="mxTool";
	s="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	s+=" viewBox=\"0 0 "+dd+" "+dd+"\"";
	s+=" width=\"40\" height=\"40\""; // acceptable size if no css
	s+=">";
	switch(m)
	{
		case "Circle":s+=this.makeCircle(c,x,y,cls);break;
		case "Mark":s+=this.makeMark(c,x,y,cls);break;
		case "Square":s+=this.makeSquare(c,x,y,cls);break;
		case "Triangle":s+=this.makeTriangle(c,x,y,cls);break;
	}
	s+="</svg>";
	return s;
};
mxG.S.prototype.makeAloneToolText=function(txt)
{
	// for edit tool only
	// assume text width is smaller than dd
	var s,d=this.d,dd=d+2,x=dd/2,y=dd/2,c="#000";
	s="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	s+=" viewBox=\"0 0 "+dd+" "+dd+"\"";
	s+=" width=\"40\" height=\"40\""; // acceptable size if no css
	s+=" font-family=\""+this.ff+"\"";
	s+=" font-size=\""+this.fs+"\"";
	s+=" font-weight=\""+this.fw+"\"";
	s+=">";
	s+="<text";
	s+=" text-anchor=\"middle\"";
	s+=" fill=\""+c+"\"";
	if(this.sw4text) s+=" stroke=\""+c+"\" stroke-width=\""+this.sw4text+"\"";
	//else s+=" stroke=\"none\"";
	s+=" x=\""+x+"\" y=\""+(y+5)+"\">";
	s+=txt;
	s+="</text>";
	s+="</svg>";
	return s;
};
mxG.S.prototype.makeTerritoryMark=function(a,x,y,cls)
{
	var c=(a=="_TB_")?"Black":"White",o;
	if(this.p.territoryMark=="MA") return this.makeMark(c,x,y,cls);
	o={opacity:1,in3dOn:this.in3dOn,stoneShadowOn:this.stoneShadowOn};
	return this.makeStone(c,x,y,this.d/4.5,o);
};
mxG.S.prototype.makeFocusMark=function(x,y)
{
	var s,z=this.d/2;
	s+="<rect class=\"mxFocusMark\" stroke=\"#000\" fill=\"none\"";
	s+=" x=\""+(x-z)+"\" y=\""+(y-z)+"\"";
	s+=" width=\""+z*2+"\" height=\""+z*2+"\"/>";
	return s;
};
mxG.S.prototype.makeStoneNumberOnGrid=function(i,j,nat,a)
{
	var s="",c,cls,x,y;
	cls="mxOn"+((nat=="B")?"Black":"White");
	cls+=" mx"+i+"_"+j;
	cls+=" mxNumber";
	c=(nat=="B")?"#fff":"#000";
	x=this.i2x(i);
	y=this.j2y(j);
	if(this.oldJapaneseNumberingOn)
	{
		a=this.k2okanji(parseInt(a+""));
		cls+=" mxVertical";
		cls+=" mxLen"+(a+"").length;
	}
	s+=this.makeText(a,i,j,{c:c,cls:cls,ignoreFillAndStroke:1});
	return s;
};
mxG.S.prototype.makeMarkOrLabel=function(i,j,nat,a)
{
	var s="",c,cls,x,y;
	cls="mxOn"+((nat=="B")?"Black":(nat=="W")?"White":"Empty");
	cls+=" mx"+i+"_"+j;
	c=(nat=="B")?"#fff":"#000";
	x=this.i2x(i);
	y=this.j2y(j);
	if((a=="_TB_")||(a=="_TW_"))
		s+=this.makeTerritoryMark(a,x,y,"mxTerritoryMark "+cls);
	else if(a=="_ML_")
		s+=this.makeMarkOnLast(c,x,y,"mxMarkOnLast "+cls);
	else
	{
		if(this.isMark(a)) cls+=" mxMark";
		else if(this.isLabel(a))
		{
			cls+=" mxLabel";
			a=this.removeLabelDelimiters(a);
		}
		if(this.isVariation(a))
		{
			cls+=" mxVariation";
			if(this.isVariationOnFocus(a)) cls+=" mxOnFocus";
			a=this.removeVariationDelimiters(a);
		}
		switch(a)
		{
			case "_MA_":s+=this.makeMark(c,x,y,cls);break;
			case "_TR_":s+=this.makeTriangle(c,x,y,cls);break;
			case "_SQ_":s+=this.makeSquare(c,x,y,cls);break;
			case "_CR_":s+=this.makeCircle(c,x,y,cls);break;
			default:s+=this.makeText(a,i,j,{c:c,cls:cls,sw:this.sw4text});
		}
	}
	return s;
};
mxG.S.prototype.k2katakana=function(ko)
{
	var k=this.DX-ko,s;
	s="イロハニホヘトチリヌルヲワカヨタレソツ";
	s+="ネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス";
	return (k<s.length)?s.charAt(k):"";
};
mxG.S.prototype.k2kanji=function(k)
{
	var s="一二三四五六七八九十";
	if(k<11) return s.charAt(k-1);
	if(k<20) return "十"+s.charAt(k-11);
	return "";
};
mxG.S.prototype.k2okanji=function(s)
{
	var k,ko,a,an,b,bn,c,cn;
	s+="";
	k=parseInt(s);
	if(!k) return s;
	if(k<20) return this.k2kanji(k);
	a=Math.floor(k/100);
	b=Math.floor(k/10)-a*10;
	c=k-b*10-a*100;
	if(a==0) an="";
	else if(a==1) an="口";
	else if(a==2) an="△";
	else if(a==3) an="◯";
	else an="⊙";
	if(b==0) bn="";
	else if(b==1) bn="十";
	else if(b==2) bn="廾";
	else if(b==3) bn="卅";
	else bn=this.k2n(b);
	if(c==0) cn=(b<4)?"":"十";
	else if((b==c)&&(b>3)) cn="〻"; // if(android) cn="々" also possible (too modern?)
	else cn=this.k2kanji(c);
	return an+bn+cn;
};
mxG.S.prototype.k2n=function(k)
{
	if(this.oldJapaneseIndicesOn||this.japaneseIndicesOn) return this.k2okanji(k);
	return (this.DY+1-k)+"";
};
mxG.S.prototype.k2c=function(k)
{
	if(this.oldJapaneseIndicesOn) return this.k2katakana(k);
	if(this.japaneseIndicesOn) return k+"";
	var r=((k-1)%25)+1;
	return String.fromCharCode(r+((r>8)?65:64))+((k>25)?(k-r)/25:"");
};
mxG.S.prototype.getIndices=function(x,y)
{
	if(!this.hideLeftIndices&&(x==0)&&(y>0)&&(y<=this.DY)) return this.k2n(y);
	if(!this.hideTopIndices&&(y==0)&&(x>0)&&(x<=this.DX)) return this.k2c(x);
	if(!this.hideRightIndices&&(x==(this.DX+1))&&(y>0)&&(y<=this.DY)) return this.k2n(y);
	if(!this.hideBottomIndices&&(y==(this.DY+1))&&(x>0)&&(x<=this.DX)) return this.k2c(x);
	return "";
};
mxG.S.prototype.makeIndices=function()
{
	var s,i,j,cls1,cls2,m;
	cls1="mxIndice mxHorizontal";
	if(this.japaneseIndicesOn||this.oldJapaneseIndicesOn) cls2="mxIndice mxVertical";
	else cls2=cls1;
	s="<g class=\"mxIndices\" fill=\"#000\"";
	if(this.sw4text) s+=" stroke=\"#000\" stroke-width=\""+this.sw4text+"\"";
	s+=">";
	if(this.xl==1)
	{
		i=0;
		for(j=this.yt;j<=this.yb;j++)
		{
			m=this.getIndices(i,j);
			s+=this.makeText(m,i,j,{cls:cls2+" mxLen"+m.length});
		}
	}
	if(this.yt==1)
	{
		j=0;
		for(i=this.xl;i<=this.xr;i++)
		{
			m=this.getIndices(i,j);
			s+=this.makeText(m,i,j,{cls:cls1+" mxLen"+m.length});
		}
	}
	if(this.xr==this.DX)
	{
		i=this.DX+1;
		for(j=this.yt;j<=this.yb;j++)
		{
			m=this.getIndices(i,j);
			s+=this.makeText(m,i,j,{cls:cls2+" mxLen"+m.length});
		}
	}
	if(this.yb==this.DY)
	{
		j=this.DY+1;
		for(i=this.xl;i<=this.xr;i++)
		{
			m=this.getIndices(i,j);
			s+=this.makeText(m,i,j,{cls:cls1+" mxLen"+m.length});
		}
	}
	s+="</g>";
	return s;
};
mxG.S.prototype.gridUnder=function(i,j,nat,str)
{
	if((str!="_TB_")&&(str!="_TW_"))
	{
		if((nat=="B")||(nat=="W")) return 0;
		if(str&&(this.isMark(str)||this.isLabel(str)||this.isVariation(str))) return 0;
	}
	return 1;
};
mxG.S.prototype.makeGrid=function(vNat,vStr)
{
	var s="",m,i,j,k,x,y,a,ds;
	s+="<g class=\"mxGobanLines\" fill=\"none\">";
	for(i=this.xl;i<=this.xr;i++)
	{
		x=this.i2x(i);
		y=((this.yt==1)?this.dh/2:0)+this.gbsyt;
		s+="<path class=\"mxGobanLine\"";
		s+=" d=\"M"+x+" "+y;
		if(this.eraseGridUnder)
		{
			m="M";
			for(j=this.yt;j<=this.yb;j++)
			{
				k=this.p.xy(i,j);
				if(this.gridUnder(i,j,vNat[k],vStr[k]))
				{
					if(m=="M")
					{
						if(j>this.yt)
						{
							y=this.gbsyt+(j-this.yt)*this.dh;
							s+=m+x+" "+y;
						}
						m="V";
					}
				}
				else
				{
					if(m=="V") // j > yt
					{
						y=this.gbsyt+(j-this.yt)*this.dh;
						s+=m+y;
						m="M";
					}
				}
			}
		}
		else m="V";
		y=this.gbsyt+(this.yb-this.yt+1)*this.dh-((this.yb==this.DY)?this.dh/2:0);
		if(m=="V") s+=m+y;
		else s+=m+x+" "+y;
		s+="\"/>";
	}
	for(j=this.yt;j<=this.yb;j++)
	{
		x=((this.xl==1)?this.dw/2:0)+this.gbsxl;
		y=this.j2y(j);
		s+="<path class=\"mxGobanLine\"";
		s+=" d=\"M"+x+" "+y;
		if(this.eraseGridUnder)
		{
			m="M";
			for(i=this.xl;i<=this.xr;i++)
			{
				k=this.p.xy(i,j);
				if(this.gridUnder(i,j,vNat[k],vStr[k]))
				{
					if(m=="M")
					{
						if(i>this.xl)
						{
							x=this.gbsxl+(i-this.xl)*this.dw;
							s+=m+x+" "+y;
						}
						m="H";
					}
				}
				else
				{
					if(m=="H") // i > xl
					{
						x=this.gbsxl+(i-this.xl)*this.dw;
						s+=m+x;
						m="M";
					}
				}
			}
		}
		else m="H";
		x=this.gbsxl+(this.xr-this.xl+1)*this.dw-((this.xr==this.DX)?this.dw/2:0);
		if(m=="H") s+=m+x;
		else s+=m+x+" "+y;
		s+="\"/>";
	}
	s+="</g><g class=\"mxStars\" fill=\"#000\">";
	ds=this.d/9;
	for(i=this.xl;i<=this.xr;i++)
		for(j=this.yt;j<=this.yb;j++)
			if(this.star(i,j))
			{
				k=this.p.xy(i,j);
				if(!this.eraseGridUnder||this.gridUnder(i,j,vNat[k],vStr[k]))
				{
					s+="<circle class=\"mxStar mxStar"+i+"_"+j+"\"";
					s+=" cx=\""+this.i2x(i)+"\" cy=\""+this.j2y(j)+"\" r=\""+ds+"\"/>";
				}
			}
	s+="</g>";
	return s;
};
mxG.S.prototype.makeBackground=function(r)
{
	var s,x,y,a,b,cls;
	b=this.indicesOn?this.gobp+this.db+this.grim:0; // indices width
	if(r=="Outer")
	{
		// always indicesOn in this case
		x=((this.xl==1)?this.gobm:this.dw*(1-this.xl)-b);
		y=((this.yt==1)?this.gobm:this.dh*(1-this.yt)-b);
		a=this.grip+b;
		w=this.dw*this.DX+a*2;
		h=this.dh*this.DY+a*2;
	}
	else if(r=="Inner")
	{
		x=((this.xl==1)?this.gobm+b:this.dw*(1-this.xl));
		y=((this.yt==1)?this.gobm+b:this.dh*(1-this.yt));
		a=this.grip;
		w=this.dw*this.DX+a*2;
		h=this.dh*this.DY+a*2;
	}
	else // whole svg
	{
		x=0;
		y=0;
		w=this.w;
		h=this.h;
	}
	cls="mxGobanBackground";
	cls+=(this.indicesOn?" mxWithIndices":"");
	cls+=" mx"+r+"Rect";
	s="<rect class=\""+cls+"\"";
	s+=" fill=\"none\" stroke=\"none\"";
	s+=" x=\""+x+"\" y=\""+y+"\"";
	s+=" width=\""+w+"\" height=\""+h+"\"/>";
	return s;
};
mxG.S.prototype.getWRatio=function()
{
	// get ratio from goban svg to deal the case where no css
	var b=this.p.getE("GobanSvg").getBoundingClientRect();
	return this.w/b.width;
};
mxG.S.prototype.getHRatio=function()
{
	// get ratio from goban svg to deal the case where no css
	var b=this.p.getE("GobanSvg").getBoundingClientRect();
	return this.h/b.height;
};
mxG.S.prototype.getC=function(ev)
{
	var x,y,c=this.ig.getMClick(ev);
	c.x=c.x*this.getWRatio()-this.gbsxl;
	c.y=c.y*this.getHRatio()-this.gbsyt;
	x=Math.max(Math.min(Math.floor(c.x/this.dw)+this.xl,this.xr),this.xl);
	y=Math.max(Math.min(Math.floor(c.y/(this.dh))+this.yt,this.yb),this.yt);
	return {x:x,y:y}
};
mxG.S.prototype.setMagicGobanWidth=function(e)
{
	// using pointsNumMax (number of points in a line of a reference goban)
	// calculate a reduction ratio wr used to display a small gobans or part of a goban
	// with stones of the same diameter as the stone diameter of a reference goban
	// the reduction is applied to e which is ig or one of its ancestors
	var wr,z;
	if((this.xr-this.xl+1)<=this.pointsNumMax)
	{
		z=this.gbsxl+this.gbsxr;
		if(!this.indicesOn)
		{
			if(this.xl!=1) z+=this.gobp+this.db+this.grim;
			if(this.xr!=this.DX) z+=this.gobp+this.db+this.grim;
		}
		wr=this.w/(this.dw*this.pointsNumMax+z)*100;
	}
	else wr=100; // if too large goban, do as if this.pointsNumMax=0
	e.style.width=wr+"%";
	this.wr=wr;
};
mxG.S.prototype.makeGradient1=function(c)
{
	// glass stones
	var s,r,c1,c2,c3;
	r=(c=="Black")?50:100;
	c1=(c=="Black")?"#999":"#fff";
	c2=(c=="Black")?"#333":"#ccc";
	c3=(c=="Black")?"#000":"#333";
	s="<radialGradient id=\""+this.p.n+c[0]+"RG\"";
	s+=" class=\"mx"+c[0]+"RG\"";
	s+=" cx=\"33%\" cy=\"33%\" r=\""+r+"%\">";
	s+="<stop stop-color=\""+c1+"\" offset=\"0\"/>";
	s+="<stop stop-color=\""+c2+"\" offset=\"0.5\"/>";
	s+="<stop stop-color=\""+c3+"\" offset=\"1\"/>";
	s+="</radialGradient>";
	return s;
};
mxG.S.prototype.makeShellEffect=function(o)
{
	var s,s1="<stop stop-color=\"#000\" offset=\"",s2="\" stop-opacity=\"",s3="\"/>";
	s=s1+(o-0.03)+s2+"0"+s3;
	s+=s1+(o-0.02)+s2+"0.0125"+s3;
	s+=s1+o+s2+"0.0375"+s3;
	s+=s1+(o+0.02)+s2+"0.0125"+s3;
	s+=s1+(o+0.03)+s2+"0"+s3;
	return s;
};
mxG.S.prototype.makeGradient2=function(c)
{
	// slate and shell stones
	var s,k,l,rg;
	s=this.makeGradient1(c);
	s+="<radialGradient id=\""+this.p.n+c[0]+"RGA\"";
	s+=" class=\"mx"+c[0]+"RGA\"";
	if(c=="Black")
	{
		s+=" cx=\"50%\" cy=\"50%\" r=\"50%\">";
		s+="<stop stop-color=\"#aaa\" offset=\"0.8\"/>";
		s+="<stop stop-color=\"#666\" offset=\"1\"/>";
	}
	else
	{
		s+=" cx=\"33%\" cy=\"33%\" r=\"100%\">";
		s+="<stop stop-color=\"#fff\" offset=\"0\"/>";
		s+="<stop stop-color=\"#ccc\" offset=\"0.5\"/>";
		s+="<stop stop-color=\"#333\" offset=\"1\"/>";
	}
	s+="</radialGradient>";
	if(c=="Black")
	{
		s+="<radialGradient id=\""+this.p.n+c[0]+"RGB\"";
		s+=" class=\"mx"+c[0]+"RGB\"";
		s+=" cx=\"90%\" cy=\"90%\" r=\"100%\">";
		s+="<stop stop-color=\"#000\" offset=\"0.6\" stop-opacity=\"1\"/>";
		s+="<stop stop-color=\"#000\" offset=\"1\" stop-opacity=\"0\"/>";
		s+="</radialGradient>";
	}
	else
	{
		for(k=0;k<8;k++)
		{
			rg="B";
			if(k) rg+=k;
			s+="<radialGradient id=\""+this.p.n+c[0]+"RG"+rg+"\"";
			s+=" class=\"mx"+c[0]+"RGB\"";
			switch(k)
			{
				case 0:s+=" cx=\"0%\" cy=\"100%\" r=\"120%\">";break;
				case 1:s+=" cx=\"50%\" cy=\"100%\" r=\"120%\">";break;
				case 2:s+=" cx=\"100%\" cy=\"100%\" r=\"120%\">";break;
				case 3:s+=" cx=\"100%\" cy=\"50%\" r=\"120%\">";break;
				case 4:s+=" cx=\"100%\" cy=\"0%\" r=\"120%\">";break;
				case 5:s+=" cx=\"50%\" cy=\"0%\" r=\"120%\">";break;
				case 6:s+=" cx=\"0%\" cy=\"0%\" r=\"120%\">";break;
				case 7:s+=" cx=\"0%\" cy=\"50%\" r=\"120%\">";break;
			}
			for(l=0.05;l<1;l=l+0.15) s+=this.makeShellEffect(l);
			s+="</radialGradient>";
		}
	}
	return s;
};
mxG.S.prototype.makeGradient=function(c)
{
	return this["makeGradient"+(this.p.specialStoneOn?2:1)](c);
};
mxG.S.prototype.addAnimatedGoban=function(c)
{
	var s,tpl,list,k,km,co,xo,yo,xn,yn,z,r=this.d/2,o;
	s="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	s+=" viewBox=\"0 0 "+this.w+" "+this.h+"\"";
	s+=" width=\"100%\" height=\"100%\"";
	s+=" class=\"mxAnimatedGobanSvg\"";
	s+=">";
	co=(c.nat=="B")?"Black":"White";
	xo=(c.nat=="B")?this.w-r:r;
	yo=(c.nat=="B")?this.h-r:r;
	xn=this.i2x(c.x)-xo;
	yn=this.j2y(c.y)-yo;
	o={opacity:1,in3dOn:this.in3dOn,stoneShadowOn:this.stoneShadowOn,animatedStone:1};
	s+=this.makeStone(co,xo,yo,this.d/2,o);
	s+="</svg>";
	tpl=document.createElement("template");
	tpl.innerHTML=s;
	list=tpl.content.querySelectorAll("circle");
	km=list.length;
	z="transform "+this.p.animatedStoneTime/1000+"s ease-out";
	for(k=0;k<km;k++) list[k].style.transition=z;
	this.ig.appendChild(tpl.content);
	list=this.ig.lastChild.querySelectorAll("circle");
	km=list.length;
	this.ig.offsetHeight;
	z="translate("+xn+"px,"+yn+"px)";
	for(k=0;k<km;k++) list[k].style.transform=z;
};
mxG.S.prototype.removeAnimatedGoban=function(c)
{
	var e=this.ig.querySelector("svg:nth-of-type(2)");
	if(e) this.ig.removeChild(e);
};
mxG.S.prototype.makeGoban=function()
{
	var s,c,p;
	var i,j;
	var x,y,x1,y1,x2,y2,w,h,wmax,wr,z,a;
	this.vNat=[];
	this.vStr=[];
	this.w=this.dw*(this.xr-this.xl+1)+this.gbsxl+this.gbsxr;
	this.h=this.dh*(this.yb-this.yt+1)+this.gbsyt+this.gbsyb;
	// if pointsNumMax is not 0, reduce the width of ig or one of its ancestors
	// to be able to display small gobans or parts of goban with the same stone diameter
	// as the stone diameter of a reference goban (which has pointsNumMax on its rows)
	//     if magicParentNum is 0, ig itself is reduced
	//     if magicParentNum is 1, ig parent is reduced
	//     if magicParentNum is 2, ig grandparent is reduced etc.
	// magicParentNum is useful when other components
	// such as "navigation" or "notSeen" should have the same width as ig
	p=this.ig;
	km=this.p.magicParentNum||0;
	for(k=0;k<km;k++) p=p.parentNode;
	this.setMagicGobanWidth(p);
	// convenient width should be set in css
	// style set below is the minimalist style
	//   convenient if style is disabled (goban is well displayed)
	//   convenient for Edit component (need no css)
	s="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	s+=" xmlns:xlink=\"http://www.w3.org/1999/xlink\""; // in case one uses xlink:href
	s+=" id=\""+this.p.n+"GobanSvg\" class=\"mxGobanSvg\"";
	s+=" viewBox=\"0 0 "+this.w+" "+this.h+"\"";
	//s+=" width=\"100%\" height=\"100%\""; // safer, else bug if borders in Chrome?
	s+=" width=\""+this.w+"\" height=\""+this.h+"\"";
	s+=" stroke-linecap=\"square\"";
	s+=" font-family=\""+this.ff+"\"";
	s+=" font-size=\""+this.fs+"\"";
	s+=" font-weight=\""+this.fw+"\"";
	s+=" text-anchor=\"middle\"";
	s+=">";
	s+="<title>"+this.p.local("Goban")+"</title>"; // accessibility
	if(this.in3dOn)
	{
		s+="<defs>";
		s+=this.makeGradient("Black");
		s+=this.makeGradient("White");
		s+="</defs>";
	}
	s+=this.makeBackground("Whole");
	s+=this.makeBackground("Outer");
	if(this.indicesOn) s+=this.makeIndices();
	s+=this.makeBackground("Inner");
	s+="<g id=\""+this.p.n+"Grid\" class=\"mxGrid\"";
	s+=" stroke=\"#000\" stroke-width=\""+this.sw4grid+"\"></g>";
	s+="<g id=\""+this.p.n+"Points\" class=\"mxPoints\"></g>";
	s+="<g id=\""+this.p.n+"Focus\" class=\"mxFocus\"></g>";
	s+="</svg>";
	return s;
};
mxG.S.prototype.setInternalParameters=function()
{
	// internal parameters
	var stretchingArray=this.stretching.split(",");
	this.in3dWidthStretch=parseInt(stretchingArray[0]+"");
	this.in3dHeightStretch=parseInt(stretchingArray[1]+"");
	this.in2dWidthStretch=parseInt(stretchingArray[2]+"");
	this.in2dHeightStretch=parseInt(stretchingArray[3]+"");
	if(this.in3dOn)
	{
		this.pws=this.in3dWidthStretch?this.in3dWidthStretch:0;
		this.phs=this.in3dHeightStretch?this.in3dHeightStretch:0;
	}
	else
	{
		this.pws=this.in2dWidthStretch?this.in2dWidthStretch:0;
		this.phs=this.in2dHeightStretch?this.in2dHeightStretch:0;
	}
	this.dw=this.d+this.pws;
	this.dh=this.d+this.phs;
	this.db=(this.dw+this.dh)/2; // for indices area
	if(this.indicesOn)
	{
		this.gbsxl=((this.xl==1)?this.gobp+this.grim+this.gobm+this.db:0)+this.grip;
		this.gbsyt=((this.yt==1)?this.gobp+this.grim+this.gobm+this.db:0)+this.grip;
		this.gbsxr=((this.xr==this.DX)?this.gobp+this.grim+this.gobm+this.db:0)+this.grip;
		this.gbsyb=((this.yb==this.DY)?this.gobp+this.grim+this.gobm+this.db:0)+this.grip;
	}
	else
	{
		this.gbsxl=((this.xl==1)?this.gobm:0)+this.grip;
		this.gbsyt=((this.yt==1)?this.gobm:0)+this.grip;
		this.gbsxr=((this.xr==this.DX)?this.gobm:0)+this.grip;
		this.gbsyb=((this.yb==this.DY)?this.gobm:0)+this.grip;
	}
};
mxG.S.prototype.init=function()
{
	var p=this.p;
	this.ig=p.getE("InnerGobanDiv"); // DIV where goban displays
	this.stoneShadowOn=p.stoneShadowOn;
	this.pointsNumMax=p.pointsNumMax;
	this.japaneseIndicesOn=p.japaneseIndicesOn;
	this.oldJapaneseIndicesOn=p.oldJapaneseIndicesOn;
	this.oldJapaneseNumberingOn=p.oldJapaneseNumberingOn;
	this.eraseGridUnder=p.eraseGridUnder;
	this.grip=p.gridPadding;
	this.grim=p.gridMargin;
	this.gobp=p.gobanPadding;
	this.gobm=p.gobanMargin;
	this.stretching=p.stretching;
	this.hideLeftIndices=p.hideLeftIndices;
	this.hideTopIndices=p.hideTopIndices;
	this.hideRightIndices=p.hideRightIndices;
	this.hideBottomIndices=p.hideBottomIndices;
};
mxG.S.prototype.getLabelLen=function(a,str)
{
	var len=a.getComputedTextLength();
	len=(str.length>2)?0.8*len:(str.length>1)?len=0.9*len:len;
	len+=0.15*this.dw;
	return Math.max(0.85*this.dw,len);
};
mxG.S.prototype.getHorizontalGridLine=function(j)
{
	var g=this.p.getE("Grid"),list;
	list=g.querySelectorAll("path");
	return list[this.xr-this.xl+1+j-this.yt];
};
mxG.S.prototype.getVerticalGridLine=function(i)
{
	var g=this.p.getE("Grid"),list;
	list=g.querySelectorAll("path");
	return list[i-this.xl];
};
mxG.S.prototype.eraseVerticalGridSegment=function(i,y)
{
	var e,d1,d2,a,b,k,km,x,y1,y2,f1,f2;
	e=this.getVerticalGridLine(i);
	d1=e.getAttributeNS(null,"d");
	a=d1.match(/[^M0-9.-][0-9.-]+/g);
	km=a.length;
	b=[];
	x=this.i2x(i);
	for(k=0;k<km;k++)
	{
		b[k]=parseFloat(a[k].substring(1));
		a[k]=a[k].substring(0,1);
		if(a[k]==" ") a[k]="M";
	}
	y1=Math.max(b[0],y-this.dh/2);
	y2=Math.min(b[km-1],y+this.dh/2);
	d2="M"+x+" "+b[0];
	f1=0;
	f2=0;
	for(k=1;k<km;k++)
	{
		if(!f1)
		{
			if(b[k]>=y1)
			{
				if(a[k]=="V") d2+="V"+y1;
				f1=1;
			}
			else
			{
				if(a[k]=="V") d2+="V"+b[k];
				else d2+="M"+x+" "+b[k];
			}
		}
		if(f1&&!f2)
		{
			if(b[k]>=y2)
			{
				d2+="M"+x+" "+y2;
				f2=1;
			}
		}
		if(f1&&f2&&(b[k]>y2))
		{
			if(a[k]=="V") d2+="V"+b[k];
			else d2+="M"+x+" "+b[k];			
		}
	}
	if(d1!=d2) e.setAttributeNS(null,"d",d2);
};
mxG.S.prototype.eraseVerticalGridSegments=function(i,j,x,y,w)
{
	var i,i1,i2,ik,e;
	i1=Math.max(this.xl,i-Math.floor(w/2/this.dw));
	i2=Math.min(this.xr,i+Math.floor(w/2/this.dw));
	// if (ik==i) the job was done when making the grid
	for(ik=i1;ik<=i2;ik++)
	{
		if(ik!=i)
		{
			this.eraseVerticalGridSegment(ik,y);
			if(this.star(ik,j))
			{
				e=this.p.getE("Grid").querySelector(".mxStar"+ik+"_"+j);
				e.parentNode.removeChild(e);
			}
		}
	}
};
mxG.S.prototype.eraseLongGridSegment=function(i,j,x,y,w)
{
	// is executed only when long label (i.e. almost never)
	var e,d1,d2,a,b,k,km,x1,x2,m;
	e=this.getHorizontalGridLine(j);
	d1=e.getAttributeNS(null,"d");
	a=d1.match(/(M|H)[0-9.-]+/g);
	km=a.length;
	b=[];
	for(k=0;k<km;k++)
	{
		b[k]=parseFloat(a[k].substring(1));
		a[k]=a[k].substring(0,1);
	}
	x1=Math.max(Math.floor((x-w/2)*10)/10,b[0]);
	x2=Math.min(Math.ceil((x+w/2)*10)/10,b[km-1]);
	d2="M"+b[0]+" "+y;
	f1=0;
	f2=0;
	for(k=1;k<km;k++)
	{
		if(!f1)
		{
			if(b[k]>=x1)
			{
				if(a[k]=="H") d2+="H"+x1; // else already in a "M" segement
				f1=1; // x1 found
			}
			else // keep segment before x1 as is
			{
				if(a[k]=="H") d2+="H"+b[k];
				else d2+="M"+b[k]+" "+y;
			}
		}
		if(f1&&!f2)
		{
			if(b[k]>=x2)
			{
				d2+="M"+x2+" "+y;
				f2=1; // x2 found
			}
			// else wait for next segment
		}
		if(f1&&f2&&(b[k]>x2)) // keep segment after x2 as is
		{
			if(a[k]=="H") d2+="H"+b[k];
			else d2+="M"+b[k]+" "+y;
		}
		// else wait for next segment
	}
	if(d1!=d2) e.setAttributeNS(null,"d",d2);
	this.eraseVerticalGridSegments(i,j,x,y,w);
};
mxG.S.prototype.addPointBackground=function(i,j,nat,str)
{
	var a,b,p,cls,x,y,h,w,vof=0;
	if(this.isLabel(str)||this.isVariation(str))
	{
		p=this.p.getE("Points");
		if(a=p.querySelector("text.mx"+i+"_"+j))
		{
			cls="mxPointBackground mx"+i+"_"+j;
			if(this.isLabel(str)) cls+=" mxLabel";
			if(this.isVariation(str)) cls+=" mxVariation";
			if(this.isVariationOnFocus(str))
			{
				cls+=" mxOnFocus";
				if(a.classList.contains("mxOnEmpty")) vof=1;
			}
			if(a.classList.contains("mxOnBlack"))
				cls+=" mxOnBlack";
			else if(a.classList.contains("mxOnWhite"))
				cls+=" mxOnWhite";
			else if(a.classList.contains("mxOnEmpty"))
				cls+=" mxOnEmpty";
			h=0.85*this.dh;
			w=this.getLabelLen(a,str);
			x=parseFloat(a.getAttributeNS(null,"x"));
			y=parseFloat(a.getAttributeNS(null,"y"));
			b=document.createElementNS("http://www.w3.org/2000/svg","rect");
			b.setAttributeNS(null,"fill","none");
			b.setAttributeNS(null,"stroke",vof?"#000":"none");
			if(vof) b.setAttributeNS(null,"stroke-width",this.sw4grid);
			b.setAttributeNS(null,"x",x-w/2);
			b.setAttributeNS(null,"y",y-h/2-5);
			b.setAttributeNS(null,"width",w);
			b.setAttributeNS(null,"height",h);
			b.setAttribute("class",cls);
			a.parentNode.insertBefore(b,a);
			// if (w<=this.dw) the job was done when making the grid
			if(w>this.dw) this.eraseLongGridSegment(i,j,x,y-5,w);
		}
	}
};
mxG.S.prototype.draw=function(vNat,vStr,pFocus)
{
	var i,j,k,km,s="",opacity,nat,str,list,a,b,c,xf,yf,o,z,s1,s2,s3,s4,s5,s6;
	this.p.getE("Grid").innerHTML=this.makeGrid(vNat,vStr);
	this.pNat=this.vNat;
	this.pStr=this.vStr;
	this.vNat=vNat;
	this.vStr=vStr;
	this.pFocus=pFocus;
	// group elements to reduce final svg size
	s1="";
	s2="";
	s3="";
	s4="";
	s5="";
	for(i=this.xl;i<=this.xr;i++)
		for(j=this.yt;j<=this.yb;j++)
		{
			k=this.p.xy(i,j);
			nat=this.vNat[k];
			str=this.vStr[k];
			if((nat=="B")||(nat=="W"))
			{
				c=(nat=="B")?"Black":"White";
				if(this.in3dOn&&this.stoneShadowOn)
				{
					o={ignoreFillAndStroke:1};
					s1+=this.makeStoneShadow(c,this.i2x(i),this.j2y(j),this.d/2,o);
				}
				o={in3dOn:this.in3dOn,stoneShadowOn:0,ignoreFillAndStroke:1};
				o.opacity=((str=="_TB_")||(str=="_TW_"))?0.5:1;
				if(nat=="B")
				{
					s2+=this.makeStone(c,this.i2x(i),this.j2y(j),this.d/2,o);
					if(str&&/^[0-9]+$/.test(str))
						s4+=this.makeStoneNumberOnGrid(i,j,nat,str);
				}
				else
				{
					s3+=this.makeStone(c,this.i2x(i),this.j2y(j),this.d/2,o);
					if(str&&/^[0-9]+$/.test(str))
						s5+=this.makeStoneNumberOnGrid(i,j,nat,str);
				}
			}
		}
	// draw shadows first
	if(s1)
	{
		// opacity better than rgba() for exporting
		s+="<g class=\"mxStoneShadows\" fill=\"#000\" opacity=\"0.2\" stroke=\"none\">";
		s+=s1;
		s+="</g>";
	}
	if(s2)
	{
		s+="<g class=\"mxBlackStones\"";
		if(this.in3dOn)
		{
			if(!this.p.specialStoneOn) s+=" fill=\"url(#"+this.p.n+"BRG)\"";
			s+=" stroke=\"none\">";
		}
		else s+=" fill=\"#000\" stroke=\"#000\" stroke-width=\""+this.sw4stone+"\">";
		s+=s2;
		s+="</g>";
	}
	if(s3)
	{
		s+="<g class=\"mxWhiteStones\"";
		if(this.in3dOn)
		{
			if(!this.p.specialStoneOn) s+=" fill=\"url(#"+this.p.n+"WRG)\"";
			s+=" stroke=\"none\">";
		}
		else s+=" fill=\"#fff\" stroke=\"#000\" stroke-width=\""+this.sw4stone+"\">";
		s+=s3;
		s+="</g>";
	}
	if(s4)
	{
		s6="<g class=\"mxBlackStoneNumbers\"";
		s6+=" fill=\"#fff\"";
		if(this.sw4text) s6+=" stroke=\"#fff\" stroke-width=\""+this.sw4text+"\"";
		s6+=">";
		s6+=s4;
		s6+="</g>";
		s+=s6;
	}
	if(s5)
	{
		s6="<g class=\"mxWhiteStoneNumbers\"";
		s6+=" fill=\"#000\"";
		if(this.sw4text) s6+=" stroke=\"#000\" stroke-width=\""+this.sw4text+"\"";
		s6+=">";
		s6+=s5;
		s6+="</g>";
		s+=s6;
	}
	// do the following last in case of drawing over the neighboring stones
	s1="";
	for(i=this.xl;i<=this.xr;i++)
		for(j=this.yt;j<=this.yb;j++)
		{
			k=this.p.xy(i,j);
			nat=this.vNat[k];
			str=this.vStr[k];
			if(str&&!(((nat=="B")||(nat=="W"))&&/^[0-9]+$/.test(str)))
				s1+=this.makeMarkOrLabel(i,j,nat,str);
		}
	if(s1)
	{
		s3="<g class=\"mxMarksAndLabels\">";
		s3+=s1;
		s3+="</g>";
		s+=s3;
	}
	this.p.getE("Points").innerHTML=s;
	if((xf=this.pFocus.x)&&(yf=this.pFocus.y))
		this.p.getE("Focus").innerHTML=this.makeFocusMark(this.i2x(xf),this.j2y(yf));
	else this.p.getE("Focus").innerHTML="";
	for(i=this.xl;i<=this.xr;i++)
		for(j=this.yt;j<=this.yb;j++)
		{
			k=this.p.xy(i,j);
			if(this.vStr[k]) this.addPointBackground(i,j,this.vNat[k],this.vStr[k]);
		}
};
// loop, navigation and solve buttons
mxG.S.prototype.makeBtnRectangle=function(x)
{
	return "<rect x=\""+x+"\" y=\"0\" width=\"24\" height=\"128\"/>";
};
mxG.S.prototype.makeBtnTriangle=function(x,a)
{
	var z=a*52;
	return "<polygon points=\""+x+" 64 "+(x+z)+" 128 "+(x+z)+" 0\"/>";
};
mxG.S.prototype.makeBtnContent=function(a,t)
{
	// convenient width and height should be set in css
	var s="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	s+=" viewBox=\"0 0 128 128\"";
	s+=" width=\"40\" height=\"40\">"; // acceptable size if no css
	if(t) s+="<title>"+this.p.local(t)+"</title>";
	return s+a+"</svg>";
};
mxG.S.prototype.makeFirstBtn=function()
{
	var s=this.makeBtnRectangle(26)+this.makeBtnTriangle(50,1);
	return this.makeBtnContent(s,"First");
};
mxG.S.prototype.makeTenPredBtn=function()
{
	var s=this.makeBtnTriangle(4,1)+this.makeBtnTriangle(56,1);
	return this.makeBtnContent(s,"10 Previous");
};
mxG.S.prototype.makePredBtn=function()
{
	var s=this.makeBtnTriangle(30,1);
	return this.makeBtnContent(s,"Previous");
};
mxG.S.prototype.makeNextBtn=function()
{
	var s=this.makeBtnTriangle(98,-1);
	return this.makeBtnContent(s,"Next");
};
mxG.S.prototype.makeTenNextBtn=function()
{
	var s=this.makeBtnTriangle(72,-1)+this.makeBtnTriangle(124,-1);
	return this.makeBtnContent(s,"10 Next");
};
mxG.S.prototype.makeLastBtn=function()
{
	var s=this.makeBtnTriangle(78,-1)+this.makeBtnRectangle(78);
	return this.makeBtnContent(s,"Last");
};
mxG.S.prototype.makeAutoBtn=function()
{
	var s=this.makeBtnTriangle(0,1)+this.makeBtnTriangle(128,-1);
	return this.makeBtnContent(s,"Auto");
};
mxG.S.prototype.makePauseBtn=function()
{
	var s=this.makeBtnRectangle(24)+this.makeBtnRectangle(80);
	return this.makeBtnContent(s,"Pause");
};
mxG.S.prototype.makeRetryBtn=function()
{
	var s;
	s="<path d=\"M0 64L64 64L32 92L0 64Z\"/>";
	s+="<path d=\"M24 64A50 50 0 1 1 49 107L57 94A34 34 0 1 0 40 64Z\"/>";
	return this.makeBtnContent(s,"Retry");
};
mxG.S.prototype.makeUndoBtn=function()
{
	var s;
	s="<path d=\"M20,105H108C114.6,105 120,99 120,93V44C120,37 114,32 108,32H40V8L8,40 40,72V48H96C100,48 104,51 104,56V81C104,85 100,89 96,89H20 Z\"/>";
	return this.makeBtnContent(s,"Undo");
};
mxG.S.prototype.makeHintBtn=function()
{
	var s;
	s="<rect x=\"54\" y=\"10\" width=\"20\" height=\"64\" rx=\"5\" ry=\"5\"/>";
	s+="<circle cx=\"64\" cy=\"104\" r=\"14\"/>";
	return this.makeBtnContent(s,"Hint");
};
mxG.S.prototype.makePassBtn=function()
{
	var s;
	s="<path fill-rule=\"evenodd\" d=\"M 64,10 L 118,64 L 64,118 L 10,64 Z M 64,35 L 93,64 L 64,93 L 35,64 Z\"/>";
	return this.makeBtnContent(s,"Pass");
};
mxG.S.prototype.makeFromPath=function(p)
{
	var s="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	s+=" viewBox=\"0 0 1024 1024\"";
	s+=" width=\"40\" height=\"40\">"; // acceptable size if no css
	return s+"<path d='"+p+"'/></svg>";
};
mxG.S.prototype.addSelect=function(i,j)
{
	var b,x,y,w,h,cls;
	w=this.dw;
	h=this.dh;
	if(i==this.xl)
	{
		x=0;
		w=this.i2x(i+1)-this.dw/2;
	}
	else if(i==this.xr)
	{
		x=this.i2x(i-1)+this.dw/2;
		w=this.w-x;
	}
	else
	{
		x=this.i2x(i)-this.dw/2;
		w=this.dw;
	}
	if(j==this.yt)
	{
		y=0;
		h=this.j2y(j+1)-this.dh/2;
	}
	else if(j==this.yb)
	{
		y=this.j2y(j-1)+this.dh/2;
		h=this.h-y;
	}
	else
	{
		y=this.j2y(j)-this.dh/2;
		h=this.dh;
	}
	cls="mxSelect";
	cls+=" mx"+i+"_"+j;
	b=document.createElementNS("http://www.w3.org/2000/svg","rect");
	b.setAttributeNS(null,"fill","#777");
	b.setAttributeNS(null,"opacity","0.5"); // better than rgba() for exporting
	b.setAttributeNS(null,"stroke","none");
	b.setAttributeNS(null,"x",x);
	b.setAttributeNS(null,"y",y);
	b.setAttributeNS(null,"width",w);
	b.setAttributeNS(null,"height",h);
	b.setAttribute("class",cls);
	this.ig.firstChild.appendChild(b);
};
mxG.S.prototype.removeSelect=function(i,j)
{
	var a,b;
	a=this.ig.firstChild;
	b=a.querySelector(".mxSelect.mx"+i+"_"+j);
	if(b) a.removeChild(b);
};
mxG.S.prototype.makeOneStone4Bowl=function(nat,x,y,d,o)
{
	// no shadow inside the bowl
	var s="",o2={};
	// todo: why without o2, o keeps changes below outside this function?
	if (o.hasOwnProperty("opacity")) o2.opacity=o.opacity;
	if (o.hasOwnProperty("stoneShadowOn")) o2.stoneShadowOn=o.stoneShadowOn;
	if (o.hasOwnProperty("whiteStroke4Black")) o2.whiteStroke4Black=o.whiteStroke4Black;
	o.opacity=1;
	o.stoneShadowOn=0;
	o.whiteStroke4Black=1;
	s=this.makeStone(nat=="B"?"Black":"White",x,y,d/2,o);
	if (o2.hasOwnProperty("opacity")) o.opacity=o2.opacity;
	if (o2.hasOwnProperty("stoneShadowOn")) o.stoneShadowOn=o2.stoneShadowOn;
	if (o2.hasOwnProperty("whiteStroke4Black")) o.whiteStroke4Black=o2.whiteStroke4Black;
	return s;
};
mxG.S.prototype.makeBowl=function(nat,o)
{
	// no svg shadow for the bowl
	var s="",x,y,r,i,j,k,km,km2,dk,rk,magicNum;
	magicNum=this.w/this.d*100/this.wr;
	dk=this.bowlW/magicNum*3;
	rk=dk/2;
	x=this.bowlW/2;
	y=(nat=="W")?this.bowlW/2:this.bowlW/2+this.capW;
	r=this.bowlW/2*0.9;
	r2=r-rk;
	s+="<circle class=\"mxBowlBackground\"";
	s+=" fill=\""+((nat=="B")?"#000":"#ccc")+"\"";
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+r+"\"/>";
	km=Math.ceil(2*r2/dk);
	for(i=0;i<km;i++)
		for(j=0;j<km;j++)
		{
			xk=2*r2*(i+((j&1)?0.5:0))/km-r2;
			yk=2*r2*(j+0.5)/km-r2;
			if((xk*xk+yk*yk)<r2*r2)
				s+=this.makeOneStone4Bowl(nat,x+xk,y+yk,dk,o);
		}
	km2=km*km;
	for(k=0;k<km2;k++)
	{
		xk=2*(r2-rk)*Math.random()-(r2-rk);
		yk=2*(r2-rk)*Math.random()-(r2-rk);
		if((xk*xk+yk*yk)<r2*r2)
			s+=this.makeOneStone4Bowl(nat,x+xk,y+yk,dk,o);
	}
	s+="<circle class=\"mxBowl\"";
	if(o.in3dOn) s+=" fill=\"url(#"+this.p.n+nat+"BowlIn3dRG)\"";
	else s+=" fill=\"url(#"+this.p.n+nat+"BowlIn2dRG)\"";
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+r+"\"/>";
	return s;
};
mxG.S.prototype.makeCap=function(nat,n,o)
{
	// no svg shadow for the cap
	var s="",x,y,r,c=(nat=="B")?"Black":"White";
	x=this.bowlW/2;
	y=(nat=="W")?this.bowlW+this.capW/2:this.capW/2;
	dy=this.capW*5/42;
	r=this.capW/2*0.9;
	s+="<circle class=\"mxCap\"";
	if(o.in3dOn) s+=" fill=\"url(#"+this.p.n+nat+"CapIn3dRG)\"";
	else s+=" fill=\"url(#"+this.p.n+nat+"CapIn2dRG)\"";
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+r+"\"/>";
	s+="<text id=\""+this.p.n+c+"PrisonersText"+"\"";
	s+=" fill=\""+c+"\"";
	s+=" x=\""+x+"\" y=\""+y+"\" dy=\""+dy+"\"";
	s+=">";
	s+=n;
	s+="</text>";
	return s;
};
mxG.S.prototype.makeBowlAndCap=function(nat,n,o)
{
	var s="";
	this.bowlW=5*this.d;
	this.capW=4*this.d;
	s+="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	s+=" viewBox=\"0 0 "+this.bowlW+" "+(this.bowlW+this.capW)+"\"";
	s+=" width=\""+this.bowlW+"\" height=\""+(this.bowlW+this.capW)+"\"";
	s+=" font-family=\""+this.ff+"\"";
	s+=" font-size=\""+this.capW/3+"\"";
	s+=" font-weight=\""+this.fw+"\"";
	s+=" text-anchor=\"middle\"";
	s+=">";
	s+="<title>"+this.p.local("Bowl")+"</title>";
	s+="<defs>";
	// use stop-opacity instead of transparent (better support, see ios)
	s+="<radialGradient id=\""+this.p.n+nat+"BowlIn3dRG\"";
	s+=" class=\"mx"+nat+"BowlRG\"";
	s+=" cx=\"50%\" cy=\"50%\" r=\"50%\">";
	s+="<stop stop-color=\"#000\" offset=\"0\" stop-opacity=\"0\"/>";
	s+="<stop stop-color=\"#000\" offset=\"0.7\" stop-opacity=\"0\"/>";
	s+="<stop stop-color=\"#da7\" offset=\"0.7\"/>";
	s+="<stop stop-color=\"#da7\" offset=\"0.8\"/>";
	s+="<stop stop-color=\"#853\" offset=\"0.85\"/>";
	s+="<stop stop-color=\"#964\" offset=\"1\"/>";
	s+="</radialGradient>";
	s+="<radialGradient id=\""+this.p.n+nat+"BowlIn2dRG\"";
	s+=" class=\"mx"+nat+"BowlRG\"";
	s+=" cx=\"50%\" cy=\"50%\" r=\"50%\">";
	s+="<stop stop-color=\"#000\" offset=\"0\" stop-opacity=\"0\"/>";
	s+="<stop stop-color=\"#000\" offset=\"0.7\" stop-opacity=\"0\"/>";
	s+="<stop stop-color=\"#da7\" offset=\"0.7\"/>";
	s+="<stop stop-color=\"#da7\" offset=\"0.8\"/>";
	s+="<stop stop-color=\"#964\" offset=\"0.8\"/>";
	s+="<stop stop-color=\"#964\" offset=\"1\"/>";
	s+="</radialGradient>";
	s+="<radialGradient id=\""+this.p.n+nat+"CapIn3dRG\"";
	s+=" class=\"mx"+nat+"CapRG\"";
	s+=" cx=\"50%\" cy=\"50%\" r=\"50%\">";
	s+="<stop stop-color=\"#a74\" offset=\"0\"/>";
	s+="<stop stop-color=\"#8f5430\" offset=\"0.65\"/>";
	s+="<stop stop-color=\"#741\" offset=\"0.7\"/>";
	s+="<stop stop-color=\"#741\" offset=\"0.8\"/>";
	s+="<stop stop-color=\"#852\" offset=\"0.85\"/>";
	s+="<stop stop-color=\"#964\" offset=\"1\"/>";
	s+="</radialGradient>";
	s+="<radialGradient id=\""+this.p.n+nat+"CapIn2dRG\"";
	s+=" class=\"mx"+nat+"CapRG\"";
	s+=" cx=\"50%\" cy=\"50%\" r=\"50%\">";
	s+="<stop stop-color=\"#a74\" offset=\"0\"/>";
	s+="<stop stop-color=\"#a74\" offset=\"0.7\"/>";
	s+="<stop stop-color=\"#741\" offset=\"0.7\"/>";
	s+="<stop stop-color=\"#741\" offset=\"0.8\"/>";
	s+="<stop stop-color=\"#964\" offset=\"0.8\"/>";
	s+="<stop stop-color=\"#964\" offset=\"1\"/>";
	s+="</radialGradient>";
	s+="</defs>";
	s+=this.makeBowl(nat,o);
	s+=this.makeCap(nat,n,o);
	s+="</svg>";
	return s;
};
}
