// maxiGos v8 > mgosMoveInfo.js
if(!mxG.G.prototype.createMoveInfo)
{
// mxG.fr(" at "," en ");
// mxG.fr("Black","Noir");
mxG.fr("Move information","Information sur le coup"); // for description
// mxG.fr("pass","passe");
// mxG.fr("White","Blanc");
// mxG.S section
mxG.S.prototype.makeTextAfterAloneStone=function(txt,d,c)
{
	// font-family and font-size are set in svg tag
	// bug: cannot use dominant-baseline:central everywhere
	// then just add 5 to y to center text vertically
	return `<text class="mxAfterAloneStone" fill="${c}" x="${d+d/8}" y="${d/2+5}">${txt}</text>`;
}
mxG.S.prototype.makeMoveInfo=function(nat,n,v,o)
{
	let s,d=this.d,dd=d+2,x=dd/2,y=dd/2,z,c,t;
	z=(o.in3dOn&&o.stoneShadowOn)?this.stoneShadowWidth:0;
	s=`<svg`
	// final viewBox, width and height may be modified when rendering
	+` viewBox="${-z} ${-z} ${dd+2*z} ${dd+2*z}"`
	+` width="100%" height="40"` // acceptable size if no css
	+` font-family="${this.ff}"`
	+` font-size="${this.fs}"`
	+` font-weight="${this.fw}"`
	+` aria-labelledby="${this.p.n}MoveInfoTitle ${this.p.n}MoveInfoDesc"`
	+` role="img"`
	+`>`
	+`<title id="${this.p.n}MoveInfoTitle">${this.p.local("Move information")}</title>`;
	c=(nat=="B")?"Black":(nat=="W")?"White":null;
	if(v)
	{
		t=this.p.local(c?c:"")+(n?(c?" ":"")+n:"")+v;
		s+=`<desc id="${this.p.n}MoveInfoDesc">${t}</desc>`;
	}
	s+=`<g aria-hidden="true">`;
	if(c)
	{
		o.opacity=1;
		s+=this.makeStone(c,x,y,d/2,o);
		if(n)s+=this.makeText(n,dd/2,dd/2,(nat=="B")?"White":"Black",o);
		if(v)s+=this.makeTextAfterAloneStone(v,dd,"Black");
	}
	s+=`</g></svg>`;
	return s;
}
// mxG.G section
mxG.G.prototype.adjustMoveInfo=function()
{
	let svg=this.getE("MoveInfoBox").querySelector("svg"),e=this.getE("Global"),w=0,h=0;
	if(svg)
	{
		let x,y,z;
		z=this.stoneShadowOn?this.scr.stoneShadowWidth:0;
		x=0;
		y=-z;
		w=svg.getBBox().width+2; // +2 otherwise the text is truncated (don't know why)
		h=this.scr.d+2*z+2;
		svg.setAttributeNS(null,"viewBox",x+" "+y+" "+w+" "+h);
		svg.setAttributeNS(null,"width",w);
		svg.setAttributeNS(null,"height",h);
	}
	e.style.setProperty("--moveInfoIntrinsicWidth",w);
	e.style.setProperty("--moveInfoIntrinsicHeight",h);
}
mxG.G.prototype.updateMoveInfo=function()
{
	// display the number and the coordinates of the current play
	let m=this.gor.play,n=this.gor.setup,num,s4m;
	if(m>n)
	{
		num=this.getCoreNum(m);
		if(this.onlyMoveNumber)s4m=num;
		else
		{
			let nat,x,y,v,o;
			nat=this.gor.getNat(m);
			x=this.gor.getX(m);
			y=this.gor.getY(m);
			if(x&&y)v=this.local(" at ")+this.scr.k2c(x)+this.scr.k2n(y);
			else v=this.local(" ")+this.local("pass");
			o={in3dOn:this.in3dOn,stoneShadowOn:this.stoneShadowOn};
			if(this.oldJapaneseNumberingOn)
			{
				o.vertical=1;
				num=this.scr.k2okanji(num);
			}
			o.cls="mxNumber mxOn"+((nat=="B")?"Black":"White");
			s4m=this.scr.makeMoveInfo(nat,num,v,o);
		}
	}
	else s4m="";
	this.getE("MoveInfoBox").innerHTML=s4m;
	this.adjustMoveInfo();
}
mxG.G.prototype.createMoveInfo=function()
{
	this.onlyMoveNumber=this.setA("onlyMoveNumber",0,"bool");
	return `<div class="mxMoveInfoBox" id="${this.n}MoveInfoBox"></div>`;
}
}
