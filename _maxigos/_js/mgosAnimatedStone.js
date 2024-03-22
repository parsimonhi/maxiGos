// maxiGos v8 > mgosAnimatedStone.js
if(!mxG.G.prototype.createAnimatedStone)
{
// mxG.S section
mxG.S.prototype.addAnimatedGoban=function(c)
{
	let s,tpl,list,k,km,co,xo,yo,xn,yn,z,r=this.d/2,o,cls="mxAnimatedGobanSvg";
	s=`<svg viewBox="0 0 ${this.w} ${this.h}" width="100%" height="100%" class="${cls}">`;
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
	for(k=0;k<km;k++)list[k].style.transition=z;
	this.gc.appendChild(tpl.content);
	list=this.gc.lastChild.querySelectorAll("circle");
	km=list.length;
	this.gc.offsetHeight;
	z="translate("+xn+"px,"+yn+"px)";
	for(k=0;k<km;k++)list[k].style.transform=z;
}
mxG.S.prototype.removeAnimatedGoban=function(c)
{
	let e=this.gc.querySelector("svg:nth-of-type(2)");
	if(e)e.remove();
}
// mxG.G section
mxG.G.prototype.getAnimated=function()
{
	let aN,s,nat,a,b;
	aN=this.kidOnFocus(this.cN);
	while(aN&&aN.inMove)aN=this.kidOnFocus(aN);
	if(aN)
	{
		if(aN.P.B){s=aN.P.B[0];nat="B";}
		else if(aN.P.W){s=aN.P.W[0];nat="W";}
		else s="";
		if(s.match(/^[a-zA-Z]{2}$/))
		{
			a=s.c2n(0);
			b=s.c2n(1);
			if(this.inView(a,b))return {aN:aN,nat:nat,x:a,y:b};
		}
	}
	return null;
}
mxG.G.prototype.doAnimatedStone=function(f)
{
	let c;
	if(this.animatedStoneOn)
	{
		c=this.getAnimated();
		if(c)
		{
			c.aN.inMove=1;
			this.animatedList.push(c.aN);
			this.scr.addAnimatedGoban(c);
		}
		if(this.animatedList.length)
		{
			let z=this.k;
			setTimeout(function(){
				let list;
				if(c)
				{
					mxG.D[z].scr.removeAnimatedGoban(c);
					mxG.D[z].animatedList[0].inMove=0;
					mxG.D[z].animatedList.shift();
				}
				mxG.D[z][f]();
				if(f=="doNextAsUsual")mxG.D[z].moveFocusMarkOnLast();
			},this.animatedStoneTime);
		}
		else this[f]();
	}
	else this[f]();
}
mxG.G.prototype.checkSolve4AnimatedStone=function(x,y)
{
	if(this.kidOnFocus(this.cN)&&this.kidOnFocus(this.cN).inMove)return;
	this.checkSolveAsUsual(x,y);
}
mxG.G.prototype.doVirtualNext4AnimatedStone=function()
{
	this.doAnimatedStone("doVirtualNextAsUsual");
}
mxG.G.prototype.doNext4AnimatedStone=function()
{
	this.doAnimatedStone("doNextAsUsual");
}
mxG.G.prototype.stepNext4AnimatedStone=function()
{
	this.doAnimatedStone("stepNextAsUsual");
}
mxG.G.prototype.deltaNext4AnimatedStone=function()
{
	this.doAnimatedStone("deltaNextAsUsual");
}
mxG.G.prototype.createAnimatedStone=function()
{
	this.animatedStoneOn=this.setA("animatedStoneOn",0,"bool");
	this.animatedStoneTime=this.setA("animatedStoneTime",1000,"int");
	if(this.hasC("Solve"))
	{
		this.checkSolveAsUsual=this.checkSolve;
		this.checkSolve=this.checkSolve4AnimatedStone;
		this.doVirtualNextAsUsual=this.doVirtualNext;
		this.doVirtualNext=this.doVirtualNext4AnimatedStone;
	}
	if(this.hasC("Navigation"))
	{
		this.doNextAsUsual=this.doNext;
		this.doNext=this.doNext4AnimatedStone;
		this.deltaNextAsUsual=this.deltaNext;
		this.deltaNext=this.deltaNext4AnimatedStone;
		this.stepNextAsUsual=this.stepNext;
		this.stepNext=this.stepNext4AnimatedStone;
	}
	this.animatedList=[];
	return "";
}
}
