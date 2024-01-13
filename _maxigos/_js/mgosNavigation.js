// maxiGos v8 > mgosNavigation.js
if(!mxG.G.prototype.createNavigation)
{
mxG.fr("First","Début");
mxG.fr("10 Previous","10 précédents");
mxG.fr("Previous","Précédent");
mxG.fr("Next","Suivant");
mxG.fr("10 Next","10 suivants");
mxG.fr("Last","Fin");

// mxG.S section
mxG.S.prototype.makeBtnRect=function(x)
{
	return "<rect x=\""+x+"\" y=\"0\" width=\"24\" height=\"128\"/>";
};
mxG.S.prototype.makeBtnTriangle=function(x,a)
{
	let z=a*52;
	return "<polygon points=\""+x+" 64 "+(x+z)+" 128 "+(x+z)+" 0\"/>";
};
mxG.S.prototype.makeFirstBtn=function()
{
	return this.makeBtnIcon(this.makeBtnRect(26)+this.makeBtnTriangle(50,1),"First");
};
mxG.S.prototype.makeTenPredBtn=function()
{
	return this.makeBtnIcon(this.makeBtnTriangle(4,1)+this.makeBtnTriangle(56,1),"10 Previous");
};
mxG.S.prototype.makePredBtn=function()
{
	return this.makeBtnIcon(this.makeBtnTriangle(30,1),"Previous");
};
mxG.S.prototype.makeNextBtn=function()
{
	return this.makeBtnIcon(this.makeBtnTriangle(98,-1),"Next");
};
mxG.S.prototype.makeTenNextBtn=function()
{
	return this.makeBtnIcon(this.makeBtnTriangle(72,-1)+this.makeBtnTriangle(124,-1),"10 Next");
};
mxG.S.prototype.makeLastBtn=function()
{
	return this.makeBtnIcon(this.makeBtnTriangle(78,-1)+this.makeBtnRect(78),"Last");
};
mxG.S.prototype.makeAutoBtn=function()
{
	return this.makeBtnIcon(this.makeBtnTriangle(0,1)+this.makeBtnTriangle(128,-1),"Auto");
};
mxG.S.prototype.makePauseBtn=function()
{
	return this.makeBtnIcon(this.makeBtnRect(24)+this.makeBtnRect(80),"Pause");
};

// mxG.G section
mxG.G.prototype.setNFocus=function(b)
{
	var a,e;
	a=document.activeElement;
	if((this.getE("GobanSvg")==a)||(this.getE("TreeDiv")==a)) return;
	e=this.getE(b+"Btn");
	if(e&&!e.disabled) {if(a!=e) e.focus();return;}
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
	let k,aN=this.cN;
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
	let aN=this.cN.Dad;
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
	for(let k=0;k<10;k++)
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
	// if(s) option key is pressed
	// useful to change of sgf record in case of collection
	let aN,k,km;
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
mxG.G.prototype.doBottomVariation=function(s)
{
	// if(s) option key is pressed
	// used to change of sgf record in case of collection
	let aN,bN,k,km;
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
	let aN=this.cN;
	if((this.styleMode&1)||s) aN=aN.Dad;
	return aN.Kid.length>1;
};
mxG.G.prototype.doKeydownNavigation=function(ev)
{
	if(this.hasC("Score")&&this.canPlaceScore) return false;
	let r=0,s=ev.altKey?1:0;
	if(ev.shiftKey) switch(ev.key)
	{
		case "Home":case "F":
			if(this.hasPred()) {this.doFirst();r=1;} break;
		case "PageUp":case "G":
			if(this.hasPred()) {this.doTenPred();r=1;} break;
		case "ArrowLeft":case "H":
			if(this.hasPred()) {this.doPred();r=1;} break;
		case "ArrowRight":case "J":
			if(this.hasNext()) {this.doNext();r=(this.animatedStoneOn?4:1);} break;
		case "PageDown":case "K":
			if(this.hasNext()) {this.doTenNext();r=1;} break;
		case "End":case "L":
			if(this.hasNext()) {this.doLast();r=1;} break;
		case "ArrowUp":case "U":
			if(this.hasVariation(s)) {this.doTopVariation(s);r=2;} break;
		case "ArrowDown":case "N":
			if(this.hasVariation(s)) {this.doBottomVariation(s);r=2;} break;
	}
	if(r)
	{
		if(r&1) this.moveFocusMarkOnLast();
		else if(r&2) this.moveFocusMarkOnVariationOnFocus();
		// if r==4, stones are animated
		// the focus mark is moved at the end of the animation
		ev.preventDefault();
	}
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
	let t,d=500,deltaY;
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
};
mxG.G.prototype.initNavigation=function()
{
	let e=this.getE("NavigationDiv"),k=this.k;
	e.addEventListener("keydown",function(ev){mxG.D[k].doKeydownNavigation(ev);});
	for(let b of this.navigations)
	{
		if(b=="First")
			this.addBtn(e,{n:"First",v:this.scr.makeFirstBtn(),t:this.local("First")});
		else if(b=="TenPred")
			this.addBtn(e,{n:"TenPred",v:this.scr.makeTenPredBtn(),t:this.local("10 Previous")});
		else if(b=="Pred")
			this.addBtn(e,{n:"Pred",v:this.scr.makePredBtn(),t:this.local("Previous")});
		else if(b=="Next")
			this.addBtn(e,{n:"Next",v:this.scr.makeNextBtn(),t:this.local("Next")});
		else if(b=="TenNext")
			this.addBtn(e,{n:"TenNext",v:this.scr.makeTenNextBtn(),t:this.local("10 Next")});
		else if(b=="Last")
			this.addBtn(e,{n:"Last",v:this.scr.makeLastBtn(),t:this.local("Last")});
		else if(b=="Loop")
		{
			this.loopBtnOn=1;
			this.addBtn(e,{n:"Auto",v:this.scr.makeAutoBtn(),t:this.local("Auto")});
			this.addBtn(e,{n:"Pause",v:this.scr.makePauseBtn(),t:this.local("Pause")});
		}
		else if(b=="Goto")
		{
			this.gotoInputOn=1;
			this.addGotoInput();
		}
	}
};
mxG.G.prototype.createNavigation=function()
{
	let a=new Set(["First","TenPred","Pred","Next","TenNext","Last"]);
	this.navigations=this.setA("navigations",a,"set");
	// buttons are inserted in this.initNavigation()
	return "<div class=\"mxNavigationDiv\" id=\""+this.n+"NavigationDiv\" tabindex=\"-1\"></div>";
};
}
