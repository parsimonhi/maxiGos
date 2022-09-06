// maxiGos v7 > mgosGoto.js
if(!mxG.G.prototype.createGoto)
{
mxG.G.prototype.getGotoCursorWidth=function()
{
	return this.getE("GotoCursor").getBoundingClientRect().width;
};
mxG.G.prototype.getGotoBarWidth=function()
{
	return this.getE("GotoBar").getBoundingClientRect().width;
};
mxG.G.prototype.setGotoCursorPos=function(w)
{
	this.getE("GotoCursor").setAttribute("x",w*1000/this.getGotoBarWidth());
};
mxG.G.prototype.doKeyupGoto=function()
{
	var k;
	var aN=this.cN;
	var n=parseInt(this.getE("GotoInput").value);
	if(isNaN(n)) n=0;
	k=Math.max(0,this.getAsInTreeNum(aN));
	if(k<n) while(this.kidOnFocus(aN))
	{
		k=Math.max(0,this.getAsInTreeNum(aN));
		if(k>=n) break;
		aN=this.kidOnFocus(aN);
	}
	else if(k>n) while(aN.P&&(aN.P.B||aN.P.W))
	{
		k=Math.max(0,this.getAsInTreeNum(aN));
		if(k<=n) break;
		aN=aN.Dad;
	}
	this.backNode(aN);
	this.updateAll();
};
mxG.G.prototype.doClick2Goto=function(ev)
{
	var ko,k1=0,kn=0,aN=this.rN,wo,w1,wn;
	w1=this.getE("GotoBar").getMClick(ev).x;
	wn=this.getGotoBarWidth();
	wo=this.getGotoCursorWidth();
	while(aN=this.kidOnFocus(aN)) kn++;
	if(kn<2) ko=0;
	else if(kn==2)
	{
		if(this.cN.Dad==this.rN) {if(w1<wo) ko=0;else ko=1;}
		else {if(w1>(wn-wo)) ko=1;else ko=0;}
	}
	else if(w1<wo) ko=0;
	else if(w1>(wn-wo)) ko=kn-1;
	else ko=Math.floor((w1-wo)/(wn-2*wo)*(kn-2))+1;
	aN=this.kidOnFocus(this.rN);
	while(this.kidOnFocus(aN)&&(k1<ko)) {k1++;aN=this.kidOnFocus(aN)};
	this.backNode(aN);
	this.updateAll();
};
mxG.G.prototype.doClickGoto=function(ev)
{
	if(!this.inGoto) this.doClick2Goto(ev);
};
mxG.G.prototype.doMouseMoveGoto=function(ev)
{
	if(this.inGoto)
	{
		let c,wo,wn;
		c=this.getE("GotoBar").getMClick(ev);
		wo=this.getGotoCursorWidth();
		wn=this.getGotoBarWidth();
		this.setGotoCursorPos(Math.min(wn-wo+1,Math.max(0,(c.x-this.gotoClickPos))));
		this.doClick2Goto(ev);
	}
};
mxG.G.prototype.doMouseDownGoto=function(ev)
{
	this.inGoto=1;
	this.gotoClickPos=this.getE("GotoCursor").getMClick(ev).x;
	document.body.classList.add("mxUnselectable");
};
mxG.G.prototype.doMouseUpGoto=function(ev)
{
	this.inGoto=0;
	document.body.classList.remove("mxUnselectable");
};
mxG.G.prototype.updateGotoBox=function()
{
	if(!this.gotoBoxOn) return;
	var ko=0,kn=0,aN,wo,wn;
	wo=this.getGotoCursorWidth();
	wn=this.getGotoBarWidth();
	aN=this.kidOnFocus(this.rN);
	while(aN=this.kidOnFocus(aN)) {kn++;if(aN==this.cN) ko=kn;}
	if(!kn) kn=1;
	if(!this.inGoto) this.setGotoCursorPos(ko/kn*(wn-wo));
};
mxG.G.prototype.updateGotoInput=function()
{
	if(this.gotoInputOn)
	{
		var e=this.getE("GotoInput"),ko,k1=e.value;
		// better to set ko to "" when no number (for instance when numbering doesn't start from 1)
		if(!this.cN.P||!(this.cN.P.B||this.cN.P.W)) ko="";
		else ko=this.getAsInTreeNum(this.cN);
		if(ko!=k1) e.value=ko;
		if(this.gBox) e.disabled=true;
		else e.disabled=false;
	}
};
mxG.G.prototype.updateGoto=function()
{
	this.updateGotoInput();
	this.updateGotoBox();
};
mxG.G.prototype.initGoto=function()
{
	var k=this.k;
	if(this.gotoInputOn)
	{
		let i=document.createElement("input"),
			b=this.gotoInputBefore,
			e=this.getE("NavigationDiv");
		i.type="text";
		i.maxLength="3";
		i.id=this.n+"GotoInput";
		i.value=0;
		i.addEventListener("keyup",function(ev){mxG.D[k].doKeyupGoto();},false);
		i.classList.add("mxGotoInput");
		if(b) e.insertBefore(i,this.getE(b+"Btn"));
		else e.appendChild(i);
	}
	if(this.gotoBoxOn)
	{
		let bar=this.getE("GotoBar"),
			cur=this.getE("GotoCursor");
		mxG.createUnselectable();
		bar.getMClick=mxG.getMClick;
		cur.getMClick=mxG.getMClick;
		bar.addEventListener("click",
			function(ev){mxG.D[k].doClickGoto(ev);},false);
		cur.addEventListener("mousedown",
			function(ev){mxG.D[k].doMouseDownGoto(ev);},false);
		document.addEventListener("mousemove",
			function(ev){mxG.D[k].doMouseMoveGoto(ev);},false);
		document.addEventListener("mouseup",
			function(ev){mxG.D[k].doMouseUpGoto(ev);},false);
		// no need of keydown event (change can be done through navigation bar)
	}
};
mxG.G.prototype.createGoto=function()
{
	var s="";
	this.gotoInputBefore=this.setA("gotoInputBefore","","string");
	this.gotoBoxOn=this.setA("gotoBoxOn",0,"bool");
	this.gotoInputOn=this.setA("gotoInputOn",0,"bool");
	if(this.gotoBoxOn)
	{
		s+="<div class=\"mxGotoDiv\" id=\""+this.n+"GotoDiv\">";
		s+="<svg class=\"mxGotoSvg\" id=\""+this.n+"GotoSvg\"";
		s+=" viewBox=\"0 0 1000 20\"";
		s+=" width=\"100%\" height=\"100%\"";
		s+=" stroke-width=\"2\"";
		s+=">";
		s+="<rect class=\"mxGotoBar\" id=\""+this.n+"GotoBar\"";
		s+=" fill=\"#fff\"";
		s+=" stroke=\"#000\"";
		s+=" x=\"0\" y=\"0\" width=\"1000\" height=\"20\">";
		s+="</rect>";
		s+="<rect class=\"mxGotoCursor\" id=\""+this.n+"GotoCursor\"";
		s+=" fill=\"#000\"";
		s+=" stroke=\"#000\"";
		s+=" x=\"0\" y=\"0\" width=\"20\" height=\"20\">";
		s+="</rect>";
		s+="</svg>";
		s+="</div>";
	}
	return s;
};
}
