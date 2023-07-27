// maxiGos v8 > mgosMoveInfo.js
if(!mxG.G.prototype.createMoveInfo)
{
// mxG.fr(" "," ");
mxG.fr("pass","passe");
// mxG.fr(" at "," en ");
mxG.fr("Move information","Information sur le coup"); // for description

// mxG.S section
mxG.S.prototype.makeTextAfterAloneStone=function(txt,d,c)
{
	let x=d+d/8,y=d/2,s="<text aria-hidden=\"true\" class=\"mxAfterAloneStone\" fill=\""+c+"\"";
	// font-family and font-size are set in svg tag
	// bug: cannot use dominant-baseline:central everywhere
	// then just add 5 to y to center text vertically
	s+=" x=\""+x+"\" y=\""+(y+5)+"\">"+txt+"</text>";
	return s;
};
mxG.S.prototype.makeMoveInfo=function(nat,n,v,o)
{
	let s,d=this.d,dd=d+2,x=dd/2,y=dd/2,z,c,t;
	z=(o.in3dOn&&o.stoneShadowOn)?this.stoneShadowWidth:0;
	s="<svg "+this.xmlns+" "+this.xlink;
	s+=" aria-labelledby=\""+this.p.n+"MoveInfoTitle"+" "+this.p.n+"MoveInfoDesc"+"\"";
	// final viewBox, width and height will be modified when rendering
	s+=" viewBox=\""+(-z)+" "+(-z)+" "+(dd+2*z)+" "+(dd+2*z)+"\"";
	s+=" width=\"100%\" height=\"40\""; // acceptable size if no css
	s+=" font-family=\""+this.ff+"\"";
	s+=" font-size=\""+this.fs+"\"";
	s+=" font-weight=\""+this.fw+"\"";
	s+=">";
	s+="<title id=\""+this.p.n+"MoveInfoTitle\">"+this.p.local("Move information")+"</title>";
	c=(nat=="B")?"Black":(nat=="W")?"White":null;
	if(v)
	{
		t=this.p.local(c?c:"")+(n?(c?" ":"")+n:"")+v;
		s+="<desc id=\""+this.p.n+"MoveInfoDesc\">"+t+"</desc>";
	}
	if(c)
	{
		o.opacity=1;
		s+=this.makeStone(c,x,y,d/2,o);
		if(n) s+=this.makeText(n,dd/2,dd/2,(nat=="B")?"White":"Black",o);
		if(v) s+=this.makeTextAfterAloneStone(v,dd,"Black");
	}
	s+="</svg>";
	return s;
};

// mxG.G section
mxG.G.prototype.adjustMoveInfo=function()
{
	let svg=this.getE("MoveInfoDiv").querySelector("svg");
	if(svg)
	{
		let x,y,w,h,z;
		z=this.stoneShadowOn?this.scr.stoneShadowWidth:0;
		x=0;
		y=-z;
		w=svg.getBBox().width+2; // +2 otherwise the text is truncated (don't know why)
		h=this.scr.d+2*z+2;
		svg.setAttributeNS(null,"viewBox",x+" "+y+" "+w+" "+h);
		svg.setAttributeNS(null,"width",w);
		svg.setAttributeNS(null,"height",h);
	}
};
mxG.G.prototype.updateMoveInfo=function()
{
	// display the number and the coordinates of the current play
	let m=this.gor.play,n=this.gor.setup,num,s4m;
	if(m>n)
	{
		num=this.getCoreNum(m);
		if(this.onlyMoveNumber) s4m=num;
		else
		{
			let nat,x,y,v,o;
			nat=this.gor.getNat(m);
			x=this.gor.getX(m);
			y=this.gor.getY(m);
			if(x&&y) v=this.local(" at ")+this.scr.k2c(x)+this.scr.k2n(y);
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
	this.getE("MoveInfoDiv").innerHTML=s4m;
	this.adjustMoveInfo();
};
mxG.G.prototype.createMoveInfo=function()
{
	this.onlyMoveNumber=this.setA("onlyMoveNumber",0,"bool");
	return "<div class=\"mxMoveInfoDiv\" id=\""+this.n+"MoveInfoDiv\"></div>";
};
}
