// maxiGos v7 > mgosLoop.js
if(!mxG.G.prototype.createLoop)
{
mxG.fr("Auto","En boucle");
mxG.fr("Pause","Pause");
mxG.G.prototype.resetLoop=function()
{
	if(this.loopTimeout&&!this.inStepLoop)
	{
		clearTimeout(this.loopTimeout);
		this.loopTimeout=0;
	}
};
mxG.G.prototype.getLoopTime=function()
{
	if(this.initialLoopTime&&(this.cN.Dad==this.rN)) return Math.round(this.initialLoopTime*this.loopTime/1000);
	if(this.finalLoopTime&&(this.cN.Focus==0)) return Math.round(this.finalLoopTime*this.loopTime/1000);
	if(this.hasC("Comment")||this.hasC("Lesson"))
	{
		var s=(this.cN.P.C?this.cN.P.C[0]:"");
		return Math.floor(s.length*this.loopTime/10+this.loopTime);
	}
	return this.loopTime;
};
mxG.G.prototype.stepNext=function()
{
	this.cN.Focus=1;
	this.placeNode();
	this.updateAll();
};
mxG.G.prototype.stepTreeFirst=function()
{
	this.rN.Focus=1;
	this.backNode(this.kidOnFocus(this.rN));
	this.updateAll();
};
mxG.G.prototype.stepBranchFirst=function()
{
	var aN=this.cN.Dad,bN;
	while((aN!=this.rN)&&(aN.Focus==aN.Kid.length)) aN=aN.Dad;
	if(aN.Focus<aN.Kid.length) aN.Focus++;
	else aN.Focus=1; // aN can be only rootNode in this case
	bN=aN=this.kidOnFocus(aN);
	while(bN.Kid.length) {bN.Focus=1;bN=bN.Kid[0];}
	this.backNode(aN);
	this.updateAll();
};
mxG.G.prototype.stepLoop=function()
{
	// don't use this.setNFocus() here
	// otherwise other viewers in the same page will lose the focus
	var z=this.k;
	this.inStepLoop=1;
	if(this.kidOnFocus(this.cN)) this.stepNext();
	else if(this.mainVariationOnlyLoop) this.stepTreeFirst();
	else if(this.cN.Dad) this.stepBranchFirst();
	this.loopTimeout=setTimeout(function(){mxG.D[z].stepLoop();},this.getLoopTime());
	this.inStepLoop=0;
};
mxG.G.prototype.doAuto=function()
{
	this.inLoop=1;
	this.updateAll();
	this.setNFocus("Pause");
};
mxG.G.prototype.doPause=function()
{
	this.inLoop=0;
	this.updateAll();
	this.setNFocus("Auto");
};
mxG.G.prototype.updateLoop=function()
{
	if(this.inLoop)
	{
		if(!this.loopTimeout)
		{
			let z=this.k;
			this.loopTimeout=setTimeout(function(){mxG.D[z].stepLoop();},this.getLoopTime());
		}
	}
	else this.resetLoop();
	if(this.loopBtnOn)
	{
		if(this.inLoop)
		{
			this.getE("AutoBtn").style.display="none";
			this.getE("PauseBtn").style.display="";
		}
		else
		{
			this.getE("AutoBtn").style.display="";
			this.getE("PauseBtn").style.display="none";
		}
		if(this.gBox)
		{
			this.disableBtn("Auto");
			this.disableBtn("Pause");
		}
		else
		{
			if(this.cN.Kid.length||(this.cN.Dad!=this.rN))
			{
				this.enableBtn("Auto");
				this.enableBtn("Pause");
			}
			else
			{
				this.disableBtn("Auto");
				this.disableBtn("Pause");
			}
		}
	}
};
mxG.G.prototype.initLoop=function()
{
	this.inLoop=(this.initMethod=="loop")?1:0;
};
mxG.G.prototype.createLoop=function()
{
	// require "Navigation"
	this.mainVariationOnlyLoop=this.setA("mainVariationOnlyLoop",0,"bool");
	this.loopTime=this.setA("loopTime",1000,"int");
	this.initialLoopTime=this.setA("initialLoopTime",0,"int");
	this.finalLoopTime=this.setA("finalLoopTime",0,"int");
	this.loopBtnOn=0; // set in this.initNavigation()
	return "";
};
}
