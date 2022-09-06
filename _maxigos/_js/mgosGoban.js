// maxiGos v7 > mgosGoban.js
if(!mxG.G.prototype.createGoban)
{
// Words below are used in mgos_src.js
mxG.fr("Goban","Goban");
mxG.fr("Bowl","Bol");
mxG.fr("Black","Noir");
mxG.fr("White","Blanc");
mxG.fr("B","N");
mxG.fr("W","B");
mxG.G.prototype.deplonkGoban=function(a)
{
	this.ig.style.visibility="visible";
	this.doNotFocusGobanJustAfter=a;
	this.ig.focus();
};
mxG.G.prototype.plonk=function()
{
	if(!this.silentFail)
	{
		let a=this.doNotFocusGobanJustAfter?1:0,z=this.k;
		this.ig.style.visibility="hidden";
		setTimeout(function(){mxG.D[z].deplonkGoban(a);},50);
	}
};
mxG.G.prototype.xy=function(x,y)
{
	return (x-this.xl)*(this.yb-this.yt+1)+y-this.yt;
};
mxG.G.prototype.xy2s=function(x,y)
{return (x&&y)?String.fromCharCode(x+((x>26)?38:96),y+((y>26)?38:96)):"";};
mxG.G.prototype.getEmphasisColor=function(k)
{
	if(k)
	{
		if(k&this.goodnessCode.Good) return this.goodColor?this.goodColor:0;
		if(k&this.goodnessCode.Bad) return this.badColor?this.badColor:0;
		if(k&this.goodnessCode.Even) return this.evenColor?this.evenColor:0;
		if(k&this.goodnessCode.Warning) return this.warningColor?this.warningColor:0;
		if(k&this.goodnessCode.Unclear) return this.unclearColor?this.unclearColor:0;
		if(k&this.goodnessCode.OffPath) return this.offPathColor?this.offPathColor:0;
		if(k&this.goodnessCode.Focus) return this.focusColor?this.focusColor:0;
	}
	return this.neutralColor?this.neutralColor:0;
};
mxG.G.prototype.getEmphasisClass=function(k)
{
	if(k)
	{
		if(k&this.goodnessCode.Good) return "mxGood";
		if(k&this.goodnessCode.Bad) return "mxBad";
		if(k&this.goodnessCode.Even) return "mxEven";
		if(k&this.goodnessCode.Warning) return "mxEven";
		if(k&this.goodnessCode.Unclear) return "mxUnclear";
		if(k&this.goodnessCode.OffPath) return "mxOffPath";
		if(k&this.goodnessCode.Focus) return "mxFocus";
	}
	return "mxNeutral";
};
mxG.G.prototype.inView=function(x,y)
{
	return (x>=this.xl)&&(y>=this.yt)&&(x<=this.xr)&&(y<=this.yb);
};
mxG.G.prototype.isNextMove=function(x,y)
{
	var aN,s,a,b;
	if(!(this.styleMode&3))
	{
		aN=this.kidOnFocus(this.cN);
		if(aN)
		{
			if(aN.P.B) s=aN.P.B[0];
			else if(aN.P.W) s=aN.P.W[0];
			else s="";
			if(s)
			{
				a=s.c2n(0);
				b=s.c2n(1);
				if((a==x)&&(b==y)) return aN;
			}
		}
	}
	return 0;
};
mxG.G.prototype.setIndices=function()
{
	var indicesOn=this.indicesOn;
	if(this.configIndicesOn===null)
		this.indicesOn=((parseInt(this.getInfoS("FG")+"")&1)?0:1);
	if(this.indicesOn&&(this.xl==1)) this.xli=0;else this.xli=this.xl;
	if(this.indicesOn&&(this.yt==1)) this.yti=0;else this.yti=this.yt;
	if(this.indicesOn&&(this.xr==this.DX)) this.xri=this.DX+1;else this.xri=this.xr;
	if(this.indicesOn&&(this.yb==this.DY)) this.ybi=this.DY+1;else this.ybi=this.yb;
};
mxG.G.prototype.setNumbering=function()
{
	if(this.configAsInBookOn===null)
		this.asInBookOn=((parseInt(this.getInfoS("FG")+"")&256)?1:0);
	if((this.configNumberingOn===null)||this.numberingOn)
	// doubtful test (not as in maxigos 6.x but why)
	{
		var aN=this.cN;
		this.numberingOn=parseInt(this.getInfoS("PM")+"");
		if(this.numberingOn&&(aN!=this.rN))
		{
			var ka=0,kb=0,kc=0,de,bN=null,cN=null,fg;
			while(aN!=this.rN)
			{
				if(!bN&&aN.P.MN) {kb=ka;bN=aN;}
				if(!cN&&aN.P.FG) {kc=ka;cN=aN;}
				if(aN.P.AB||aN.P.AW||aN.P.AE) break;
				if(aN.P.B||aN.P.W) ka++;
				aN=aN.Dad;
			}
			if(!cN) {cN=this.kidOnFocus(this.rN);kc=ka;}
			de=((!cN.P.B&&!cN.P.W)?1:0);
			fg=ka-kc+(bN?parseInt(bN.P.MN[0]+"")-ka+kb-((bN==cN)?de:0):0);
			this.numFrom=ka-kc;
			if(!this.numFrom) {this.numFrom=1;fg++;}
			if(this.numberingOn==2) fg=fg%100;
			this.numWith=fg;
		}
		else
		{
			this.numFrom=1;
			this.numWith=1;
		}
	}
};
mxG.G.prototype.addMarksAndLabels=function()
{
	if(!this.marksAndLabelsOn) return;
	var MX=["MA","TR","SQ","CR","LB","TB","TW"];
	var k,aLen,s,s2,x,y,x1,y1,x2,y2,z;
	for(z=0;z<7;z++)
	{
		if(this.cN.P[MX[z]])
			aLen=this.cN.P[MX[z]].length;
		else
			aLen=0;
		for(k=0;k<aLen;k++)
		{
			s=this.cN.P[MX[z]][k];
			if(MX[z]=="LB")
			{
				if(s.length>3)
				{
					x=s.c2n(0);
					y=s.c2n(1);
					if(this.inView(x,y))
					{
						s2=s.substring(3).replace(/\(/g,'&#40;').replace(/\)/g,'&#41;');
						this.vStr[this.xy(x,y)]="|"+s2+"|";
					}
				}
			}
			else if(s.length==2)
			{
				x=s.c2n(0);
				y=s.c2n(1);
				if(this.inView(x,y))
					this.vStr[this.xy(x,y)]="_"+MX[z]+"_";
			}
			else if(s.length==5)
			{
				x1=s.c2n(0);
				y1=s.c2n(1);
				x2=s.c2n(3);
				y2=s.c2n(4);
				for(x=x1;x<=x2;x++)
					for(y=y1;y<=y2;y++)
						if(this.inView(x,y))
							this.vStr[this.xy(x,y)]="_"+MX[z]+"_";
			}
		}
	}
};
mxG.G.prototype.isNumbered=function(aN)
{
	if(!(aN.P["B"]||aN.P["W"])) return 0;
	if(this.configNumberingOn!==null) return this.numberingOn;
	var bN=((aN==this.rN)?this.kidOnFocus(aN):aN);
	while(bN!=this.rN)
	{
		if(bN.P["PM"]) return parseInt(bN.P["PM"][0]+"");
		bN=bN.Dad;
	}
	return 1;
};
mxG.G.prototype.getAsInTreeNum=function(xN)
{
	// return num of the node as it was when placed
	var aN=xN,ka=0,kb=0,kc=0,de,bN=null,cN=null,fg;
	while(aN!=this.rN)
	{
		if(!bN&&aN.P["MN"]) {bN=aN;kb=ka;}
		if(!cN&&aN.P["FG"]) {cN=aN;kc=ka;}
		if(aN.P["AB"]||aN.P["AW"]||aN.P["AE"]) break;
		if(aN.P["B"]||aN.P["W"]) ka++;
		if((aN.Dad.P["B"]&&aN.P["B"])||(aN.Dad.P["W"]&&aN.P["W"])) ka++; // tenuki
		aN=aN.Dad;
	}
	if(!cN) {cN=this.kidOnFocus(this.rN);kc=ka;}
	de=((!cN.P.B&&!cN.P.W)?1:0);
	fg=ka-kc+(bN?parseInt(bN.P.MN[0]+"")-ka+kb-((bN==cN)?de:0):0);
	if(this.isNumbered(xN)==2) fg=fg%100;
	return fg+kc;
};
mxG.G.prototype.getVisibleMove=function(x,y)
// if(asInBookOn and numberingOn) return the visible move as in book
// 		return the move which was on (x,y) when the current first numbered move was played if any
//		else return the first move played later on (x,y) if any
//		else return 0
// else return the last move played at (x,y) if any
{
	var k,kmin,kmax;
	if(this.asInBookOn&&this.numberingOn)
	{
		kmin=Math.min(this.gor.setup+this.numFrom,this.gor.play);
		for(k=kmin;k>0;k--)
			if((!this.gor.getO(k)||(this.gor.getO(k)>=kmin))&&(this.gor.getX(k)==x)&&(this.gor.getY(k)==y)&&(this.gor.getNat(k)!="E")) return k;
		kmax=this.gor.getBanNum(x,y);
		if(!kmax) kmax=this.gor.play;
		for(k=(kmin+1);k<=kmax;k++)
			if((this.gor.getX(k)==x)&&(this.gor.getY(k)==y)&&(this.gor.getNat(k)!="E")) return k;
		return this.gor.getBanNum(x,y);
	}
	else return this.gor.getBanNum(x,y);
};
mxG.G.prototype.getVisibleNat=function(n)
{
	// n is the num of the visible move in gor history
	return this.gor.getNat(n);
};
mxG.G.prototype.getTenuki=function(m,n)
{
	var k,r=0;
	for(k=m;k>n;k--) if(this.gor.getNat(k)==this.gor.getNat(k-1)) r++;
	return r;
};
mxG.G.prototype.getCoreNum=function(m)
{
	// m is the num of the move in gor history
	var s=this.gor.setup;
	if(m>s)
	{
		var n=s+this.numFrom,r;
		if(m>=n) {r=m-n+this.numWith+this.getTenuki(m,n);return (r<1)?"":r+"";}
	}
	return "";
};
mxG.G.prototype.getVisibleNum=function(m)
{
	// m is the num of the move in gor history
	if(this.numberingOn) return this.getCoreNum(m);
	return "";
};
mxG.G.prototype.preTerritory=function(x,y,nat,m)
{
	if(this.marksAndLabelsOn&&(this.cN.P.TB||this.cN.P.TW))
	{
		if(this.asInBookOn&&(m!="_TB_")&&(m!="_TW_"))
		{
			if((nat=="B")&&(this.gor.getBanNat(x,y)=="W")) m="_TW_";
			else if((nat=="W")&&(this.gor.getBanNat(x,y)=="B")) m="_TB_";
		}
	}
	return m;
};
mxG.G.prototype.addNatAndNum=function(x,y,z)
{
	var m=this.getVisibleMove(x,y),n=this.getVisibleNum(m),k=this.xy(x,y);
	this.vNat[k]=this.getVisibleNat(m);
	this.vStr[k]=(this.markOnLastOn&&(z==k)&&!n)?
					(this.numAsMarkOnLastOn?this.getCoreNum(m):"_ML_"):n;
	this.vStr[k]=this.preTerritory(x,y,this.vNat[k],this.vStr[k]);
};
mxG.G.prototype.disableGoban=function()
{
	var e=this.ig;
	if(!e.hasAttribute("data-maxigos-disabled"))
	{
		e.setAttribute("data-maxigos-disabled","1");
		if(this.canGobanFocus) e.setAttribute("tabindex","-1");
	}
};
mxG.G.prototype.enableGoban=function()
{
	var e=this.ig;
	if(e.hasAttribute("data-maxigos-disabled"))
	{
		e.removeAttribute("data-maxigos-disabled");
		if(this.canGobanFocus) e.setAttribute("tabindex","0");
	}
};
mxG.G.prototype.isGobanDisabled=function()
{
	return this.ig.hasAttribute("data-maxigos-disabled");
};
mxG.G.prototype.setGoban=function()
{
	// has to set goban when first drawing
	// or after modifying sgf, indicesOn, DX, DY, ...
	this.scr.setInternalParameters();
	this.ig.innerHTML=this.scr.makeGoban();
	this.hasToSetGoban=0;
};
mxG.G.prototype.updateGoban=function()
{
	var i,j,k,x,y,z=-1,m,pFocus;
	if(this.scr.in3dOn!=this.in3dOn)
	{
		this.scr.in3dOn=this.in3dOn;
		this.hasToSetGoban=1;
	}
	if(this.scr.stoneShadowOn!=this.stoneShadowOn)
	{
		this.scr.stoneShadowOn=this.stoneShadowOn;
		this.hasToSetGoban=1;
	}
	if(this.scr.stretching!=this.stretching)
	{
		this.scr.stretching=this.stretching;
		this.hasToSetGoban=1;
	}
	if(this.scr.indicesOn!=this.indicesOn)
	{
		this.scr.indicesOn=this.indicesOn;
		this.hasToSetGoban=1;
	}
	if((this.scr.DX!=this.DX)||(this.scr.DY!=this.DY))
	{
		this.scr.DX=this.DX;
		this.scr.DY=this.DY;
		this.hasToSetGoban=1;
	}
	if((this.scr.xl!=this.xl)||(this.scr.xr!=this.xr)
		||(this.scr.yt!=this.yt)||(this.scr.yb!=this.yb))
	{
		this.scr.xl=this.xl;
		this.scr.xr=this.xr;
		this.scr.yt=this.yt;
		this.scr.yb=this.yb;
		this.hasToSetGoban=1;
	}
	this.vNat=[];
	this.vStr=[];
	if(this.markOnLastOn)
	{
		m=this.gor.play;
		if(this.gor.getAct(m)=="")
		{
			x=this.gor.getX(m);
			y=this.gor.getY(m);
			if(this.inView(x,y)) z=this.xy(x,y);
		}
	}
	for(i=this.xl;i<=this.xr;i++)
		for(j=this.yt;j<=this.yb;j++)
			this.addNatAndNum(i,j,z); // (i,j) is in view
	this.addMarksAndLabels();
	if(this.hasC("Variation")) this.addVariationMarks();
	if(this.gobanFocusVisible&&this.inView(this.xFocus,this.yFocus))
		pFocus={x:this.xFocus,y:this.yFocus};
	else
		pFocus={x:0,y:0};
	if(this.hasToSetGoban) {this.setGoban();q=1;}
	else q=0;
	this.scr.draw(this.vNat,this.vStr,pFocus);
	if(q&&this.hasC("Edit")&&this.selection) this.selectView();
	if(this.gBox) this.disableGoban(); else this.enableGoban();
};
mxG.G.prototype.moveFocusInView=function()
{
	this.xFocus=Math.min(Math.max(this.xFocus,this.xl),this.xr);
	this.yFocus=Math.min(Math.max(this.yFocus,this.yt),this.yb);
};
mxG.G.prototype.doFocusGoban=function(ev)
{
	// warning: all browsers don't manage event order in the same way
	if(this.doNotFocusGobanJustAfter) return;
	this.moveFocusInView();
	this.gobanFocusVisible=1;
	if(this.inView(this.xFocus,this.yFocus))
		this.scr.draw(this.vNat,this.vStr,{x:this.xFocus,y:this.yFocus});
	else
		this.scr.draw(this.vNat,this.vStr,{x:0,y:0});
};
mxG.G.prototype.hideGobanFocus=function()
{
	this.gobanFocusVisible=0;
	this.scr.draw(this.vNat,this.vStr,{x:0,y:0});
};
mxG.G.prototype.doBlur4FocusGoban=function(ev)
{
	// when leaving a document, document.activeElement remains the last focused element
	// if the goban was on focus with an invisible focus mark, do not focus it just after 
	var magic=(!this.gobanFocusVisible&&(document.activeElement==this.ig));
	if(this.gobanFocusVisible) this.hideGobanFocus();
	this.doNotFocusGobanJustAfter=(magic?1:0);
};
mxG.G.prototype.doMouseDown4FocusGoban=function(ev)
{
	// after a click on the goban, hide focus mark if any,
	// and do not focus the goban just after
	if(this.gobanFocusVisible) this.hideGobanFocus();
	this.doNotFocusGobanJustAfter=1;
};
mxG.G.prototype.doContextMenu4FocusGoban=function(ev)
{
	if(this.gobanFocusVisible) this.hideGobanFocus();
	this.doNotFocusGobanJustAfter=0;
};
mxG.G.prototype.doKeydownGoban=function(ev)
{
	var r=0;
	if(!this.gobanFocusVisible)
	{
		if(this.hasC("Navigation")) this.doKeydownNavigation(ev);
		else if(this.hasC("Solve")) this.doKeydownSolve(ev);
		return;
	}
	switch(mxG.getKCode(ev))
	{
		case 37:case 72:this.xFocus--;r=1;break;
		case 39:case 74:this.xFocus++;r=1;break;
		case 38:case 85:this.yFocus--;r=1;break;
		case 40:case 78:this.yFocus++;r=1;break;
	}
	if(r)
	{
		this.moveFocusInView();
		if(this.hasC("Edit")&&(this.editTool=="Select"))
		{
			if(this.inSelect==2) this.selectGobanArea(this.xFocus,this.yFocus);
			else this.gobanFocusVisible=1;
		}
		this.updateAll();
		ev.preventDefault();
	}
};
mxG.G.prototype.initGoban=function()
{
	var k=this.k;
	if(this.specialStoneOn&&this.in3dOn) this.alea8=mxG.shuffle([0,1,2,3,4,5,6,7]);
	if(this.canGobanFocus)
	{
		// add event listeners to InnerGobanDiv otherwise side effect when a gBox is shown
		this.ig.addEventListener("keydown",function(ev){mxG.D[k].doKeydownGoban(ev);},false);
		this.ig.addEventListener("focus",function(ev){mxG.D[k].doFocusGoban(ev);},false);
		this.ig.addEventListener("blur",function(ev){mxG.D[k].doBlur4FocusGoban(ev);},false);
		this.ig.addEventListener("mousedown",function(ev){mxG.D[k].doMouseDown4FocusGoban(ev);},false);
		this.ig.addEventListener("contextmenu",function(ev){mxG.D[k].doContextMenu4FocusGoban(ev);},false);
	}
	this.scr.init();
	this.hasToSetGoban=1;
};
mxG.G.prototype.createGoban=function()
{
	var s="";
	this.pointsNumMax=this.setA("pointsNumMax",0,"int");
	this.magicParentNum=this.setA("magicParentNum",0,"int");
	this.stoneShadowOn=this.setA("stoneShadowOn",0,"bool");
	this.stretching=this.setA("stretching","0,0,1,1","string");
	this.specialStoneOn=this.setA("specialStoneOn",0,"bool");
	this.indicesOn=this.setA("indicesOn",null,"bool");
	this.hideLeftIndices=this.setA("hideLeftIndices",0,"bool");
	this.hideTopIndices=this.setA("hideTopIndices",0,"bool");
	this.hideRightIndices=this.setA("hideRightIndices",0,"bool");
	this.hideBottomIndices=this.setA("hideBottomIndices",0,"bool");
	this.asInBookOn=this.setA("asInBookOn",null,"bool");
	this.numberingOn=this.setA("numberingOn",null,"bool");
	this.marksAndLabelsOn=this.setA("marksAndLabelsOn",null,"bool");
	this.markOnLastOn=this.setA("markOnLastOn",0,"bool");
	this.numAsMarkOnLastOn=this.setA("numAsMarkOnLastOn",0,"bool");
	this.japaneseIndicesOn=this.setA("japaneseIndicesOn",0,"bool");
	this.oldJapaneseIndicesOn=this.setA("oldJapaneseIndicesOn",0,"bool");
	this.oldJapaneseNumberingOn=this.setA("oldJapaneseNumberingOn",0,"bool");
	this.eraseGridUnder=this.setA("eraseGridUnder",0,"bool");
	this.gridPadding=this.setA("gridPadding",0,"float");
	this.gridMargin=this.setA("gridMargin",0,"float");
	this.gobanPadding=this.setA("gobanPadding",0,"float");
	this.gobanMargin=this.setA("gobanMargin",0,"float");
	this.territoryMark=this.setA("territoryMark","MS","string");
	//this.canGobanFocus=this.setA("canGobanFocus",0,"bool");
	// to improve!
	this.canGobanFocus=(this.hasC("Solve")
				   ||this.hasC("Variation")
				   ||this.hasC("Guess")
				   ||this.hasC("Score"))?1:0;
	if(this.hasC("Edit"))
	{
		this.configIndicesOn=null;
		this.configAsInBookOn=null;
		this.configNumberingOn=null;
	}
	else
	{
		this.configIndicesOn=this.indicesOn;
		this.configAsInBookOn=this.asInBookOn;
		this.configNumberingOn=this.numberingOn;
	}
	if(this.canGobanFocus)
	{
		this.xFocus=0;
		this.yFocus=0;
	}
	this.numFrom=1;
	this.numWith=1;
	this.goodnessCode={Good:1,Bad:2,Even:4,Warning:8,Unclear:16,OffPath:32,Focus:64};
	s+="<div class=\"mxGobanDiv\" id=\""+this.n+"GobanDiv\">";
	s+="<div class=\"mxInnerGobanDiv\" id=\""+this.n+"InnerGobanDiv\"";
	s+=" tabindex=\""+(this.canGobanFocus?0:-1)+"\"";
	s+=">";
	s+="</div>";
	s+="</div>";
	return s;
};
}
