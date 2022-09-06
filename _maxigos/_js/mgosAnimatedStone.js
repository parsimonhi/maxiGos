// maxiGos v7 > mgosAnimatedStone.js
if(!mxG.G.prototype.createAnimatedStone)
{
mxG.G.prototype.getAnimated=function()
{
	var aN,s,nat,a,b;
	aN=this.kidOnFocus(this.cN);
	while(aN&&aN.inMove) aN=this.kidOnFocus(aN);
	if(aN)
	{
		if(aN.P.B) {s=aN.P.B[0];nat="B";}
		else if(aN.P.W) {s=aN.P.W[0];nat="W";}
		else s="";
		if(s)
		{
			a=s.c2n(0);
			b=s.c2n(1);
			if(this.inView(a,b)) return {aN:aN,nat:nat,x:a,y:b};
		}
	}
	return null;
};
mxG.G.prototype.doAnimatedStone=function(f)
{
	var c;
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
				var list;
				if(c)
				{
					mxG.D[z].scr.removeAnimatedGoban(c);
					mxG.D[z].animatedList[0].inMove=0;
					mxG.D[z].animatedList.shift();
				}
				mxG.D[z][f]();
			},this.animatedStoneTime);
		}
		else this[f]();
	}
	else this[f]();
};
mxG.G.prototype.checkSolve4AnimatedStone=function(x,y)
{
	if(this.kidOnFocus(this.cN)&&this.kidOnFocus(this.cN).inMove) return;
	this.checkSolveAsUsual(x,y);
};
mxG.G.prototype.doVirtualNext4AnimatedStone=function()
{
	this.doAnimatedStone("doVirtualNextAsUsual");
};
mxG.G.prototype.doNext4AnimatedStone=function()
{
	this.doAnimatedStone("doNextAsUsual");
};
mxG.G.prototype.stepNext4AnimatedStone=function()
{
	this.doAnimatedStone("stepNextAsUsual");
};
mxG.G.prototype.wheelNext4AnimatedStone=function()
{
	this.doAnimatedStone("wheelNextAsUsual");
};
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
		this.wheelNextAsUsual=this.wheelNext;
		this.wheelNext=this.wheelNext4AnimatedStone;
		this.stepNextAsUsual=this.stepNext;
		this.stepNext=this.stepNext4AnimatedStone;
	}
	this.animatedList=[];
	return "";
};
}
