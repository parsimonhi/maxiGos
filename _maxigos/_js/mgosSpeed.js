// maxiGos v8 > mgosSpeed.js
if(!mxG.G.prototype.createSpeed)
{
mxG.fr("Speed","Vitesse");
mxG.G.prototype.doChangeSpeed=function(ev)
{
	let z=this.inLoop;
	if(z) this.doPause();
	this.loopTime=Math.round((1-ev.target.value/100)*this.loopTimeMax);
	if(z) {this.doAuto();ev.target.focus();}
};
mxG.G.prototype.initSpeed=function()
{
	if(!this.hasC("Loop")) return;
	let e=this.getE("SpeedDiv").querySelector('input'),k=this.k;
	e.value=100*(1-this.loopTime/this.loopTimeMax);
	e.addEventListener("change",function(ev){mxG.D[k].doChangeSpeed(ev);});
};
mxG.G.prototype.createSpeed=function()
{
	let s="",t=this.local("Speed");
	if(!this.hasC("Loop")) return s;
	this.loopTimeMax=this.setA("loopTimeMax",5000,"int");
	s+="<div id=\""+this.n+"SpeedDiv\" class=\"mxSpeedDiv\">";
	s+="<input type=\"range\" min=\"0\" max=\"100\" title=\""+t+"\">";
	s+="</div>";
	return s;
};
}
