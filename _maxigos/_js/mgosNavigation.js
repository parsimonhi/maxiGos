// maxiGos v7 > mgosNavigation.js
if(!mxG.G.prototype.createNavigation)
{
mxG.fr("First","Début");
mxG.fr("10 Previous","10 précédents");
mxG.fr("Previous","Précédent");
mxG.fr("Next","Suivant");
mxG.fr("10 Next","10 suivants");
mxG.fr("Last","Fin");
mxG.G.prototype.setNFocus=function(b)
{
	var a,e,g;
	a=document.activeElement;
	g=this.ig;
	if(g==a) return;
	e=this.getE(b+"Btn");
	if(e&&!e.disabled&&(a==e)) return;
	this.getE("NavigationDiv").focus();
};
mxG.G.prototype.doFirst=function()
{
	this.backNode(this.kidOnFocus(this.rN));
	this.updateAll();
	this.setNFocus("First");
};
mxG.G.prototype.doTenPred=function()
{
	var k,aN=this.cN;
	for(k=0;k<10;k++)
	{
		if(aN.Dad!=this.rN) aN=aN.Dad;else break;
		if(this.hasC("Variation")&&!(this.styleMode&2))
		{
			if(this.styleMode&1) {if(aN.Dad.Kid.length>1) break;}
			else if(aN.Kid.length>1) break;
		}
	}
	this.backNode((aN==this.rN)?this.kidOnFocus(aN):aN);
	this.updateAll();
	this.setNFocus("TenPred");
};
mxG.G.prototype.doPred=function()
{
	var aN=this.cN.Dad;
	this.backNode((aN==this.rN)?this.kidOnFocus(aN):aN);
	this.updateAll();
	this.setNFocus("Pred");
};
mxG.G.prototype.doNext=function()
{
	this.placeNode();
	this.updateAll();
	this.setNFocus("Next");
};
mxG.G.prototype.doTenNext=function()
{
	for(var k=0;k<10;k++)
	{
		if(this.kidOnFocus(this.cN)) this.placeNode();else break;
		if(this.hasC("Variation")&&!(this.styleMode&2))
		{
			// break if some variations are found
			if(this.styleMode&1) {if(this.cN.Dad.Kid.length>1) break;}
			else if(this.cN.Kid.length>1) break;
		}
	}
	this.updateAll();
	this.setNFocus("TenNext");
};
mxG.G.prototype.doLast=function()
{
	while(this.kidOnFocus(this.cN)) this.placeNode();
	this.updateAll();
	this.setNFocus("Last");
};
mxG.G.prototype.doTopVariation=function(s)
{
	// if(s) it means shift key is pressed
	// used to change of sgf record in case of collection
	var aN,k,km;
	if((this.styleMode&1)||s) aN=this.cN.Dad;else aN=this.cN;
	k=aN.Focus;
	km=aN.Kid.length;
	if(km>1)
	{
		aN.Focus=(k>1)?k-1:km;
		if((this.styleMode&1)||s) this.backNode(this.kidOnFocus(aN));
		this.updateAll();
	}
};
mxG.G.prototype.hasPred=function()
{
	return this.cN.Dad!=this.rN;
};
mxG.G.prototype.hasNext=function()
{
	return this.cN.Kid.length;
};
mxG.G.prototype.hasVariation=function(s)
{
	var aN=this.cN;
	if((this.styleMode&1)||s) aN=aN.Dad;
	return aN.Kid.length>1;
};
mxG.G.prototype.doBottomVariation=function(s)
{
	// if(s) it means shift key is pressed
	// used to change of sgf record in case of collection
	var aN,bN,k,km;
	if((this.styleMode&1)||s) aN=this.cN.Dad;else aN=this.cN;
	k=aN.Focus;
	km=aN.Kid.length;
	if(km>1)
	{
		aN.Focus=(k<km)?k+1:1;
		if((this.styleMode&1)||s) this.backNode(this.kidOnFocus(aN));
		this.updateAll();
	}
};
mxG.G.prototype.doKeydownNavigation=function(ev)
{
	if(this.hasC("Score")&&this.canPlaceScore) return false;
	var r=0,s=ev.shiftKey?1:0;
	switch(mxG.getKCode(ev))
	{
		case 36:case 70:
			if(this.cN.Dad!=this.rN) {this.doFirst();r=1;} break;
		case 33:case 71:
			if(this.cN.Dad!=this.rN) {this.doTenPred();r=1;} break;
		case 37:case 72:
			if(this.cN.Dad!=this.rN) {this.doPred();r=1;} break;
		case 39:case 74:
			if(this.hasNext()) {this.doNext();r=1;} break;
		case 34:case 75:
			if(this.hasNext()) {this.doTenNext();r=1;} break;
		case 35:case 76:
			if(this.hasNext()) {this.doLast();r=1;} break;
		case 38:case 85:
			if(this.hasVariation(s)) {this.doTopVariation(s);r=1;} break;
		case 40:case 78:
			if(this.hasVariation(s)) {this.doBottomVariation(s);r=1;} break;
		case 187:
			if(this.hasC("Pass")) {this.doPass2();r=5;} break;
	}
	if(r) ev.preventDefault();
};
mxG.G.prototype.wheelPred=function()
{
	this.backNode(this.cN.Dad);
	this.updateAll();
};
mxG.G.prototype.wheelNext=function()
{
	this.placeNode();
	this.updateAll();
};
mxG.G.prototype.wheelAction=function(ev,a)
{
	// wheel event is like mouse event
	// means stop keyboard navigation
	if(this.gobanFocusVisible) this.hideGobanFocus();
	if(this.deltaYc===undefined) this.deltaYc=0;
	this.deltaY=Math.abs(ev.deltaY);
	if(!this.deltaYm)
	{
		this["wheel"+a]();
		// wait deltaYc>deltaYm after the first move before playing another one
		this.deltaYm=128;
	}
	else
	{
		if((this.deltaYc+=this.deltaY)>this.deltaYm)
		{
			this["wheel"+a]();
			this.deltaYc=0; // ready for the next move
			// wait less when several moves are played in a row
			if(this.deltaYm>1)this.deltaYm>>=1;
		}
	}
	// don't focus navigation bar otherwise the browser may unwanted scroll
	this.wnto=new Date().getTime();
	ev.preventDefault();
	return false;
};
mxG.G.prototype.doWheelNavigation=function(ev)
{
	var t,d=500,deltaY;
	if(this.hasC("Score")&&this.canPlaceScore) return false;
	if(this.deltaYm===undefined) this.deltaYm=0;
	if(ev.deltaY>0)
	{
		if(this.hasNext()) return this.wheelAction(ev,"Next");
	}
	else if(ev.deltaY<0)
	{
		if(this.hasPred()) return this.wheelAction(ev,"Pred");
	}
	t=new Date().getTime();
	if(this.wnto&&((t-this.wnto)<d))
	{
		this.wnto=t;
		this.deltaYm=0; // ready for another series of moves
		ev.preventDefault();
		return false;
	}
	return true;
};
mxG.G.prototype.updateNavigation=function()
{
	if(this.gBox||(this.hasC("Score")&&this.canPlaceScore))
	{
		this.disableBtn("First");
		this.disableBtn("Pred");
		this.disableBtn("TenPred");
		this.disableBtn("Next");
		this.disableBtn("TenNext");
		this.disableBtn("Last");
	}
	else
	{
		if(this.cN.Kid.length)
		{
			this.enableBtn("Next");
			this.enableBtn("TenNext");
			this.enableBtn("Last");
		}
		else
		{
			this.disableBtn("Next");
			this.disableBtn("TenNext");
			this.disableBtn("Last");
		}
		if(this.cN.Dad==this.rN)
		{
			this.disableBtn("First");
			this.disableBtn("TenPred");
			this.disableBtn("Pred");
		}
		else
		{
			this.enableBtn("First");
			this.enableBtn("TenPred");
			this.enableBtn("Pred");
		}
	}
};
mxG.G.prototype.initNavigation=function()
{
	var e,k=this.k,b,bk,bm;
	this.ig.addEventListener("wheel",function(ev){mxG.D[k].doWheelNavigation(ev);},false);
	e=this.getE("NavigationDiv");
	e.addEventListener("keydown",function(ev){mxG.D[k].doKeydownNavigation(ev);},false);
	b=this.navigations;
	bm=b.length;
	for(bk=0;bk<bm;bk++)
	{
		if(b[bk]=="First")
			this.addBtn(e,{n:"First",v:this.scr.makeFirstBtn(),t:this.local("First")});
		else if(b[bk]=="TenPred")
			this.addBtn(e,{n:"TenPred",v:this.scr.makeTenPredBtn(),t:this.local("10 Previous")});
		else if(b[bk]=="Pred")
			this.addBtn(e,{n:"Pred",v:this.scr.makePredBtn(),t:this.local("Previous")});
		else if(b[bk]=="Next")
			this.addBtn(e,{n:"Next",v:this.scr.makeNextBtn(),t:this.local("Next")});
		else if(b[bk]=="TenNext")
			this.addBtn(e,{n:"TenNext",v:this.scr.makeTenNextBtn(),t:this.local("10 Next")});
		else if(b[bk]=="Last")
			this.addBtn(e,{n:"Last",v:this.scr.makeLastBtn(),t:this.local("Last")});
		else if((b[bk]=="Loop")&&this.hasC("Loop"))
		{
			this.loopBtnOn=1;
			this.addBtn(e,{n:"Auto",v:this.scr.makeAutoBtn(),t:this.local("Auto")});
			this.addBtn(e,{n:"Pause",v:this.scr.makePauseBtn(),t:this.local("Pause")});
		}
	}
};
mxG.G.prototype.createNavigation=function()
{
	var a=["First","TenPred","Pred","Next","TenNext","Last"],s="";
	this.navigations=this.setA("navigations",a,"list");
	s+="<div class=\"mxNavigationDiv\" id=\""+this.n+"NavigationDiv\"";
	// "NavigationDiv" takes the focus via this.setNFocus()
	// buttons are inserted in this.initNavigation()
	s+=" tabindex=\"-1\"></div>";
	return s;
};
}
