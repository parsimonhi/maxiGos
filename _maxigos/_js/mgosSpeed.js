// maxiGos v8 > mgosSpeed.js
if(!mxG.G.prototype.createSpeed)
{
mxG.fr("Speed","Vitesse");
mxG.G.prototype.setSpeed=function()
{
	// also used in Options
	let e=this.getE("SpeedBox").querySelector('input');
	e.value=100*(1-this.loopTime/this.loopTimeMax);
	return e;
}
mxG.G.prototype.doChangeSpeed=function(ev)
{
	// assume !this.inLoop
	this.loopTime=Math.round((1-ev.target.value/100)*this.loopTimeMax);
	if(this.optionsBoxOn) 
	{
		let e=this.getE("LoopTimeTextInput");
		if(e) e.value=this.loopTime;
	}
}
mxG.G.prototype.updateSpeed=function()
{
	this.getE("SpeedBox").querySelector('input').disabled=this.inLoop?true:false;
	this.setSpeed(); // in case of loopTime changed by the Options component
}
mxG.G.prototype.initSpeed=function()
{
	if(!this.hasC("Loop"))return;
	let k=this.k;
	this.setSpeed().addEventListener("change",function(ev){mxG.D[k].doChangeSpeed(ev);});
}
mxG.G.prototype.createSpeed=function()
{
	let t=this.local("Speed");
	if(!this.hasC("Loop"))return s;
	this.loopTimeMax=this.setA("loopTimeMax",5000,"int");
	return `<div class="mxSpeedBox" id="${this.n}SpeedBox">`
	+`<input type="range" min="0" max="100" title="${t}"></div>`;
}
}
