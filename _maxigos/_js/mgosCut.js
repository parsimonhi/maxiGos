// maxiGos v8s > mgosCut.js
if(!mxG.G.prototype.createCut)
{
mxG.fr("Cut","Couper");
mxG.G.prototype.doSimpleCut=function()
{
	let aN,SZ,ST;
	aN=this.cN.Dad;
	if((aN==this.rN)&&(aN.Kid.length==1))
	{
		SZ=this.getInfo("SZ");
		ST=this.getInfo("ST");
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
mxG.G.prototype.initCut=function()
{
	if(this.cutBtnOn)
	{
		let o={n:"SimpleCut",v:this.alias("Cut","cutAlias")},
			s=this.local("Cut");
		if(o.v!=s) o.t=s;
		this.addBtn(this.getE("CutDiv"),o);
	}
};
mxG.G.prototype.createCut=function()
{
	this.cutBtnOn=this.setA("cutBtnOn",0,"bool");
	this.cutAlias=this.setA("cutAlias",null,"string");
	return this.cutBtnOn?this.createBtnBox("Cut"):"";
};
}
