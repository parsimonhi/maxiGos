// maxiGos v8 > mgosNavigation.js
if(!mxG.G.prototype.createNavigation)
{
mxG.fr("First","Début");
mxG.fr("10 Previous","10 précédents");
mxG.fr("Previous","Précédent");
mxG.fr("Next","Suivant");
mxG.fr("10 Next","10 suivants");
mxG.fr("Last","Fin");
// mxG.G section
mxG.G.prototype.setNFocus=function(b)
{
	var a,e;
	a=document.activeElement;
	if((this.getE("GobanSvg")==a)||(this.getE("TreeBox")==a))return;
	e=this.getE(b+"Btn");
	if(e&&!e.disabled){if(a!=e)e.focus();return;}
	if(e=this.getE("NavigationBox"))e.focus();
}
mxG.G.prototype.getFirstEnableNavigationBtn=function()
{
	let e=this.getE("NavigationBox");
	if(!e)return null;
	list=e.querySelectorAll(':enabled');
	return (list&&list.length)?list[0]:e;
}
mxG.G.prototype.doFirst=function()
{
	this.backNode(this.kidOnFocus(this.rN));
	this.updateAll();
	this.setNFocus("First");
}
mxG.G.prototype.doTenPred=function()
{
	let k,aN=this.cN;
	for(k=0;k<10;k++)
	{
		if(aN.Dad!=this.rN)aN=aN.Dad;else break;
		if(this.hasC("Variation")&&!(this.styleMode&2))
		{
			if(this.styleMode&1){if(aN.Dad.Kid.length>1)break;}
			else if(aN.Kid.length>1)break;
		}
	}
	this.backNode((aN==this.rN)?this.kidOnFocus(aN):aN);
	this.updateAll();
	this.setNFocus("TenPred");
}
mxG.G.prototype.doPred=function()
{
	let aN=this.cN.Dad;
	this.backNode((aN==this.rN)?this.kidOnFocus(aN):aN);
	this.updateAll();
	this.setNFocus("Pred");
}
mxG.G.prototype.doNext=function()
{
	this.placeNode();
	this.updateAll();
	this.setNFocus("Next");
}
mxG.G.prototype.doTenNext=function()
{
	for(let k=0;k<10;k++)
	{
		if(this.kidOnFocus(this.cN))this.placeNode();else break;
		if(this.hasC("Variation")&&!(this.styleMode&2))
		{
			// break if some variations are found
			if(this.styleMode&1){if(this.cN.Dad.Kid.length>1)break;}
			else if(this.cN.Kid.length>1)break;
		}
	}
	this.updateAll();
	this.setNFocus("TenNext");
}
mxG.G.prototype.doLast=function()
{
	while(this.kidOnFocus(this.cN))this.placeNode();
	this.updateAll();
	this.setNFocus("Last");
}
mxG.G.prototype.doTopVariation=function(s)
{
	// if(s) option key is pressed
	// useful to change of sgf record in case of collection
	let aN,k,km;
	if((this.styleMode&1)||s)aN=this.cN.Dad;else aN=this.cN;
	k=aN.Focus;
	km=aN.Kid.length;
	if(km>1)
	{
		aN.Focus=(k>1)?k-1:km;
		if((this.styleMode&1)||s)this.backNode(this.kidOnFocus(aN));
		this.updateAll();
	}
}
mxG.G.prototype.doBottomVariation=function(s)
{
	// if(s) option key is pressed
	// used to change of sgf record in case of collection
	let aN,bN,k,km;
	if((this.styleMode&1)||s)aN=this.cN.Dad;else aN=this.cN;
	k=aN.Focus;
	km=aN.Kid.length;
	if(km>1)
	{
		aN.Focus=(k<km)?k+1:1;
		if((this.styleMode&1)||s)this.backNode(this.kidOnFocus(aN));
		this.updateAll();
	}
}
mxG.G.prototype.hasPred=function()
{
	return this.cN.Dad!=this.rN;
}
mxG.G.prototype.hasNext=function()
{
	return this.cN.Kid.length;
}
mxG.G.prototype.hasVariation=function(s)
{
	let aN=this.cN;
	if((this.styleMode&1)||s)aN=aN.Dad;
	return aN.Kid.length>1;
}
mxG.G.prototype.doKeydownNavigation=function(ev)
{
	if(ev.metaKey||ev.ctrlKey||(ev.altKey&&!ev.key.match(/^(ArrowUp|ArrowDown|u|n)$/i)))return;
	if(this.hasC("Score")&&this.canPlaceScore)return false;
	let r=0,s=ev.altKey?1:0;
	if(ev.key.match(/^[bcimot]$/i))
	{
		if(this.doAlphaKeydown(ev))return;
	}
	else if(ev.shiftKey||ev.key.match(/^[ufghjkln]$/i))switch(ev.key)
	{
		case "Home":case "f":case "F":
			if(this.hasPred()){this.doFirst();r=1;}break;
		case "PageUp":case "g":case "G":
			if(this.hasPred()){this.doTenPred();r=1;}break;
		case "ArrowLeft":case "h":case "H":
			if(this.hasPred()){this.doPred();r=1;}break;
		case "ArrowRight":case "j":case "J":
			if(this.hasNext()){this.doNext();r=(this.animatedStoneOn?4:1);}break;
		case "PageDown":case "k":case "K":
			if(this.hasNext()){this.doTenNext();r=1;}break;
		case "End":case "l":case "L":
			if(this.hasNext()){this.doLast();r=1;}break;
		case "ArrowUp":case "u":case "U":
			if(this.hasVariation(s)){this.doTopVariation(s);r=2;}break;
		case "ArrowDown":case "n":case "N":
			if(this.hasVariation(s)){this.doBottomVariation(s);r=2;}break;
	}
	if(r)
	{
		this.justMovedInTree=1;
		if(r&1)this.moveFocusMarkOnLast();
		else if(r&2)this.moveFocusMarkOnVariationOnFocus();
		// if r==4, stones are animated
		// the focus mark is moved when the animation ends
		ev.preventDefault();
	}
}
mxG.G.prototype.deltaPred=function()
{
	this.backNode(this.cN.Dad);
	this.updateAll();
}
mxG.G.prototype.deltaNext=function()
{
	this.placeNode();
	this.updateAll();
}
mxG.G.prototype.deltaAction=function(ev,a)
{
	if(this.deltaXYc===undefined)this.deltaXYc=0;
	this.deltaXYc+=Math.abs(this.deltaXY);
	if(this.deltaXYc>this.deltaXYm)
	{
		this["delta"+a]();
		this.deltaXYc=0; // ready for the next move
		// wait less when several moves are played in a row
		if(!this.deltaXYm)this.deltaXYm=64;
		else if(this.deltaXYm>1)this.deltaXYm>>=1;
	}
	// do not focus the navigation bar otherwise the browser may unwanted scroll
	this.wnto=new Date().getTime();
	ev.preventDefault();
}
mxG.G.prototype.doDeltaNavigation=function(ev)
{
	if(Math.abs(this.deltaX)<Math.abs(this.deltaY)) return;
	if(this.hasC("Score")&&this.canPlaceScore)return;
	this.deltaXY=this.deltaX;
	let t,d=999;
	t=new Date().getTime();
	if((!this.wnto)||((t-this.wnto)>d))
	{
		this.wnto=t;
		this.deltaXYm=0;
		// ready to move in the tree
	}
	if(this.deltaXY<0)
	{
		if(this.hasNext()){this.deltaAction(ev,"Next");return;}
		else if(this.deltaXYm)ev.preventDefault();
	}
	else if(this.deltaXY>0)
	{
		if(this.hasPred()){this.deltaAction(ev,"Pred");return;}
		else if(this.deltaXYm)ev.preventDefault();
	}
}
mxG.G.prototype.doWheelNavigation=function(ev)
{
	// console.log("wheel");
	this.deltaX=ev.deltaX;
	this.deltaY=ev.deltaY;
	this.doDeltaNavigation(ev);
}
mxG.G.prototype.updateNavigation=function()
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
mxG.G.prototype.initNavigation=function()
{
	let e=this.getE("NavigationBox");
	if(!e)return;
	let k=this.k;
	e.addEventListener("keydown",function(ev){mxG.D[k].doKeydownNavigation(ev);});
	for(let b of this.navigations)
	{
		if(b=="First")
			this.addBtn(e,{n:"First",v:this.scr.makeBI(this.scr.makeBR(26)+this.scr.makeBT(50,1)),t:this.local("First")});
		else if(b=="TenPred")
			this.addBtn(e,{n:"TenPred",v:this.scr.makeBI(this.scr.makeBT(4,1)+this.scr.makeBT(56,1)),t:this.local("10 Previous")});
		else if(b=="Pred")
			this.addBtn(e,{n:"Pred",v:this.scr.makeBI(this.scr.makeBT(30,1)),t:this.local("Previous")});
		else if(b=="Next")
			this.addBtn(e,{n:"Next",v:this.scr.makeBI(this.scr.makeBT(98,-1)),t:this.local("Next")});
		else if(b=="TenNext")
			this.addBtn(e,{n:"TenNext",v:this.scr.makeBI(this.scr.makeBT(72,-1)+this.scr.makeBT(124,-1)),t:this.local("10 Next")});
		else if(b=="Last")
			this.addBtn(e,{n:"Last",v:this.scr.makeBI(this.scr.makeBT(78,-1)+this.scr.makeBR(78)),t:this.local("Last")});
		else if(b=="Loop")
		{
			this.loopBtnOn=1;
			this.addBtn(e,{n:"Auto",v:this.scr.makeBI(this.scr.makeBT(0,1)+this.scr.makeBT(128,-1)),t:this.local("Auto")});
			this.addBtn(e,{n:"Pause",v:this.scr.makeBI(this.scr.makeBR(24)+this.scr.makeBR(80)),t:this.local("Pause")});
		}
		else if(b=="Goto")
		{
			this.gotoInputOn=1;
			this.addGotoInput();
		}
	}
}
mxG.G.prototype.createNavigation=function()
{
	let a=new Set(["First","TenPred","Pred","Next","TenNext","Last"]);
	this.navigations=this.setA("navigations",a,"set");
	// buttons are inserted in this.initNavigation()
	if(this.navigations.size===0)return "";
	return `<div class="mxNavigationBox" id="${this.n}NavigationBox" tabindex="-1"></div>`;
}
}
