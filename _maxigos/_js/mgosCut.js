// maxiGos v7 > mgosCut.js
if(!mxG.G.prototype.createCut)
{
mxG.fr("Cut","Couper");
mxG.fr("Cut_Short","X");
mxG.en("Cut_Short","X");
mxG.G.prototype.doSimpleCut=function()
{
	var aN,SZ,ST;
	aN=this.cN.Dad;
	if((aN==this.rN)&&(aN.Kid.length==1))
	{
		SZ=this.getInfoS("SZ");
		ST=this.getInfoS("ST");
	}
	aN.Kid.splice(aN.Focus-1,1);
	aN.Focus=(aN.Kid.length)?1:0;
	if(aN==this.rN)
	{
		if(aN.Focus) aN=aN.Kid[0];
		else
		{
			aN=new mxG.N(aN,"FF",4);
			aN.P.GM=["1"];
			aN.P.CA=["UTF-8"];
			aN.P.SZ=[SZ];
			aN.P.ST=[ST];
		}
	}
	this.backNode(aN);
	if(this.hasC("Tree")) this.hasToSetTree=1;
	this.updateAll();
};
mxG.G.prototype.updateCut=function()
{
	if(this.getE("SimpleCutBtn"))
	{
		if(this.gBox||(this.hasC("Score")&&this.canPlaceScore))
			this.disableBtn("SimpleCut");
		else this.enableBtn("SimpleCut");
	}
};
mxG.G.prototype.initCut=function()
{
	if(this.cutBtnOn)
		this.addBtn(this.getE("CutDiv"),{n:"SimpleCut",v:this.alias("Cut","cutAlias")});
};
mxG.G.prototype.createCut=function()
{
	this.cutBtnOn=this.setA("cutBtnOn",0,"bool");
	this.cutAlias=this.setA("cutAlias",null,"string");
	return this.createBtnBox("Cut");
};
}
