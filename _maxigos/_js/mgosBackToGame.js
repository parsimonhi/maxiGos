// maxiGos v8 > mgosBackToGame.js
if(!mxG.G.prototype.createBackToGame)
{
mxG.fr("Back to game","Revenir à la partie");
mxG.fr("BackToGame_Short","R");
mxG.en("BackToGame_Short","B");
mxG.G.prototype.isInMain=function(aN)
{
	let bN=aN;
	while(bN.Dad!=this.rN) {if((bN.Dad.Kid[0]!=bN)||bN.Add) return 0;bN=bN.Dad;}
	return 1;
};
mxG.G.prototype.doBackToGame=function()
{
	let aN=this.rN,bN=this.cN;
	while(bN.Dad!=this.rN) {if(this.isInMain(bN)) break;bN=bN.Dad;}
	this.backNode(bN);
	while(bN.Kid.length) {bN.Focus=1;bN=bN.Kid[0];}
	this.updateAll();
};
mxG.G.prototype.updateBackToGame=function()
{
	if(this.getE("BackToGameDiv"))
	{
		if(this.isInMain(this.cN)) this.disableBtn("BackToGame");
		else this.enableBtn("BackToGame");
	}
};
mxG.G.prototype.initBackToGame=function()
{
	if(this.backToGameBtnOn)
		this.addBtn(this.getE("BackToGameDiv"),{n:"BackToGame",v:this.alias("Back to game","backToGameAlias")});
};
mxG.G.prototype.createBackToGame=function()
{
	this.backToGameBtnOn=this.setA("backToGameBtnOn",0,"bool");
	this.backToGameAlias=this.setA("backToGameAlias",null,"string");
	return this.backToGameBtnOn?this.createBtnBox("BackToGame"):"";
};
}
