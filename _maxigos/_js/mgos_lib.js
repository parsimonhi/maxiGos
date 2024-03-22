// maxiGos v8 > mgos_lib.js
if(typeof mxG=='undefined')mxG={};
if(!mxG.V)
{
mxG.V="8.03";
mxG.Y="2024";
mxG.C="FM&SH";
mxG.D=[];
mxG.K=0;
if(!mxG.Z)mxG.Z=[];
if(!mxG.Z.fr)mxG.Z.fr=[];
if(!mxG.Z.en)mxG.Z.en=[];
String.prototype.c2n=function(k){let n=this.charCodeAt(k);return n-((n<97)?38:96);}
String.prototype.ucF=function(){return this.charAt(0).toUpperCase()+this.slice(1);}
String.prototype.lcF=function(){return this.charAt(0).toLowerCase()+this.slice(1);}
String.prototype.noT=function(){return this.replace(/</g,"&lt;").replace(/>/g,"&gt;");}
String.prototype.noP=function(){return this.replace(/\(/g,"&#40;").replace(/\)/g,"&#41;");}
String.prototype.reP=function(){return this.replace(/&#40;/g,"(").replace(/&#41;/g,")");}
mxG.beep=function()
{
	let a=new AudioContext(),o=new OscillatorNode(a);
	o.connect(a.destination);
	o.start(0);
	o.stop(0.1);
}
mxG.getMClick=function(ev)
{
	let b=this.getBoundingClientRect();
	return {x:ev.clientX-b.left,y:ev.clientY-b.top};
}
mxG.getLang=function(t)
{
	while(t&&!t.lang)t=t.parentNode;
	return t?t.lang:(navigator.language||"en");
}
mxG.fr=function(a,b){mxG.Z.fr[a]=b;}
mxG.en=function(a,b){mxG.Z.en[a]=b;}
mxG.min1max52=function(n){return Math.max(Math.min(-(-n),52),1);}
mxG.monoProps=new Set(["B","KO","MN","W","PL",
	"C","GB","GW","HO","N","UC","V","BM","DO","IT","TE",
	"AP","CA","FF","GM","ST","SZ",
	"AN","BR","BT","CP","DT","EV","GN","GC","ON","OT","PB","PC","PW","RE","RO","RU",
	"SO","TM","US","WR","WT","BL","OB","OW","WL","FG","PM","HA","KM"]);
mxG.coreProps=new Set(["B","W","AB","AW","AE","FF","CA","GM","SZ","VW",
	"EV","RO","DT","PC","PW","WR","WT","PB","BR","BT","RU","TM","OT","HA","KM","RE"]);
}
