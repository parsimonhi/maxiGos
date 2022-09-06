// maxiGos v7 > mgosSpeed.js
if(!mxG.G.prototype.createSpeed)
{
mxG.fr("Speed","Vitesse");
mxG.G.prototype.getSpeedCursorWidth=function()
{
	return this.getE("SpeedCursor").getBoundingClientRect().width;
};
mxG.G.prototype.getSpeedBarWidth=function()
{
	return this.getE("SpeedBar").getBoundingClientRect().width;
};
mxG.G.prototype.setSpeedCursorPosFromRatio=function(r)
{
	var x,wo,wn;
	wo=this.getSpeedCursorWidth();
	wn=this.getSpeedBarWidth();
	x=(1000-1)*(1-r)*(wn-wo)/wn+0.5;
	this.getE("SpeedCursor").setAttributeNS(null,"x",x);
};
mxG.G.prototype.doClick2Speed=function(ev)
{
	var wo,w1,wn,wi,r;
	w1=this.getE("SpeedBar").getMClick(ev).x;
	wi=this.speedInCursorPos;
	wn=this.getSpeedBarWidth();
	wo=this.getSpeedCursorWidth();
	w1=w1-wi;
	r=1-Math.min(1,Math.max(0,w1/(wn-wo)));
	this.loopTime=Math.round(r*this.loopTimeMax);
	this.resetLoop();
	this.updateAll();
};
mxG.G.prototype.doClickSpeed=function(ev)
{
	if(!this.inSpeed)
	{
		this.speedInCursorPos=this.getSpeedCursorWidth()/2;
		this.doClick2Speed(ev);
	}
};
mxG.G.prototype.doMouseMoveSpeed=function(ev)
{
	if(this.inSpeed) this.doClick2Speed(ev);
};
mxG.G.prototype.doMouseDownSpeed=function(ev)
{
	this.inSpeed=1;
	this.speedInCursorPos=this.getE("SpeedCursor").getMClick(ev).x;
	document.body.classList.add("mxUnselectable");
};
mxG.G.prototype.doMouseUpSpeed=function(ev)
{
	this.inSpeed=0;
	document.body.classList.remove("mxUnselectable");
};
mxG.G.prototype.setNewSpeedFromRatio=function(r)
{
	this.loopTime=Math.round(r*this.loopTimeMax);
	this.resetLoop();
	this.setSpeedCursorPosFromRatio(r);
};
mxG.G.prototype.doClickSpeedPlus=function()
{
	var r=(this.loopTime-this.loopTimeMax/10)/this.loopTimeMax;
	this.setNewSpeedFromRatio(Math.max(0,r));
	this.updateAll();
};
mxG.G.prototype.doClickSpeedMinus=function()
{
	var r=(this.loopTime+this.loopTimeMax/10)/this.loopTimeMax;
	this.setNewSpeedFromRatio(Math.min(1,r));
	this.updateAll();
};
mxG.G.prototype.doKeydownSpeed=function(ev)
{
	var r=0;
	switch(mxG.getKCode(ev))
	{
		case 39:case 72:case 107:this.doClickSpeedPlus();r=1;break;
		case 37:case 74:case 109:this.doClickSpeedMinus();r=1;break;
	}
	if(r) ev.preventDefault();
};
mxG.G.prototype.updateSpeed=function()
{
	if(!this.hasC("Loop")) return;
	this.setSpeedCursorPosFromRatio(this.loopTime/this.loopTimeMax);
};
mxG.G.prototype.initSpeed=function()
{
	if(!this.hasC("Loop")) return;
	var k=this.k,
		bar=this.getE("SpeedBar"),
		cur=this.getE("SpeedCursor");
	mxG.createUnselectable();
	bar.getMClick=mxG.getMClick;
	cur.getMClick=mxG.getMClick;
	this.getE("SpeedDiv").addEventListener("keydown",
		function(ev){mxG.D[k].doKeydownSpeed(ev);},false);
	this.getE("SpeedMinusBtn").addEventListener("click",
		function(ev){mxG.D[k].doClickSpeedMinus(ev);},false);
	this.getE("SpeedPlusBtn").addEventListener("click",
		function(ev){mxG.D[k].doClickSpeedPlus(ev);},false);
	bar.addEventListener("click",
		function(ev){mxG.D[k].doClickSpeed(ev);},false);
	cur.addEventListener("mousedown",
		function(ev){mxG.D[k].doMouseDownSpeed(ev);},false);
	document.addEventListener("mousemove",
		function(ev){mxG.D[k].doMouseMoveSpeed(ev);},false);
	document.addEventListener("mouseup",
		function(ev){mxG.D[k].doMouseUpSpeed(ev);},false);
	// no need of keydown event (change can be done through speed buttons)
};
mxG.G.prototype.createSpeed=function()
{
	var s="";
	if(!this.hasC("Loop")) return s;
	this.loopTimeMax=this.setA("loopTimeMax",5000,"int");
	s+="<div id=\""+this.n+"SpeedDiv\" class=\"mxSpeedDiv\"";
	s+=" title=\""+this.local("Speed")+"\" tabindex=\"-1\"";
	s+=">";
	s+="<button id=\""+this.n+"SpeedMinusBtn\" type=\"button\" class=\"mxSpeedMinusBtn\"><span>-</span></button>";
	s+="<svg class=\"mxSpeedSvg\" id=\""+this.n+"SpeedSvg\"";
	s+=" viewBox=\"0 0 1000 40\"";
	//s+=" width=\"100%\" height=\"100%\"";
	s+=" stroke-width=\"1\"";
	s+=">";
	s+="<rect class=\"mxSpeedBar\" id=\""+this.n+"SpeedBar\"";
	s+=" fill=\"#fff\"";
	s+=" stroke=\"#000\"";
	s+=" x=\"0.5\" y=\"10\" width=\"999\" height=\"20\">";
	s+="</rect>";
	s+="<rect class=\"mxSpeedCursor\" id=\""+this.n+"SpeedCursor\"";
	s+=" fill=\"#fff\"";
	s+=" stroke=\"#000\"";
	s+=" x=\"0.5\" y=\"0.5\" width=\"20\" height=\"39\">";
	s+="</rect>";
	s+="</svg>";
	s+="<button id=\""+this.n+"SpeedPlusBtn\" type=\"button\" class=\"mxSpeedPlusBtn\"><span>+</span></button>";
	s+="</div>";
	return s;
};
}
