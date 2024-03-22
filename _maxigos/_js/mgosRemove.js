// maxiGos v8s > mgosRemove.js
if(!mxG.G.prototype.createRemove)
{
mxG.fr("Remove","Couper");
mxG.G.prototype.doRemove=function()
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
		if(aN.Focus)aN=aN.Kid[0];
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
	if(this.hasC("Tree"))this.hasToSetTree=1;
	this.updateAll();
}
mxG.G.prototype.initRemove=function()
{
	if(this.removeBtnOn)this.addBtnClickListener("Remove");
}
mxG.G.prototype.createRemove=function()
{
	this.removeBtnOn=this.setA("removeBtnOn",0,"bool");
	this.removeAlias=this.setA("removeAlias",null,"string");
	return this.removeBtnOn?this.createBtn("Remove"):"";
}
}
