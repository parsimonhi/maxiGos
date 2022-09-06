// maxiGos v7 > mgosMoveInfo.js
if(!mxG.G.prototype.createMoveInfo)
{
mxG.fr(" pass"," passe");
mxG.fr(" at "," en ");
mxG.G.prototype.adjustMoveInfo=function()
{
	var e=this.getE("MoveInfoDiv"),
		list=e.getElementsByTagName("svg"),
		gr,w,z;
	gr=list[0];
	if(gr&&(gr.tagName=="svg"))
	{
		w=gr.getBBox().width;
		z=this.stoneShadowOn?this.scr.stoneShadowWidth:0;
		gr.setAttributeNS(null,"viewBox","0 "+(-z)+" "+w+" "+(this.scr.d+2+2*z));
	}
};
mxG.G.prototype.updateMoveInfo=function()
{
	// display coordinates of current play
	var x,y,m=this.gor.play,n=this.gor.setup,num,nat,s4m,v,o;
	if(m>n)
	{
		x=this.gor.getX(m);
		y=this.gor.getY(m);
		nat=this.gor.getNat(m);
		num=this.getCoreNum(m);
		if(this.onlyMoveNumber) s4m=num+"";
		else
		{
			if(x&&y) v=this.local(" at ")+this.scr.k2c(x)+this.scr.k2n(y);
			else v=this.local(" pass");
			o={in3dOn:this.in3dOn,stoneShadowOn:this.stoneShadowOn};
			if(this.oldJapaneseNumberingOn)
			{
				o.vertical=1;
				num=this.scr.k2okanji(num);
			}
			s4m=this.scr.makeAloneStoneAndText(nat,num,v,o);
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
