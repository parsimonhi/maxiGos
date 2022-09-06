// maxiGos v7 > mgos_lib.js
if(typeof mxG=='undefined') mxG={};
if(!mxG.V)
{
mxG.V="7.02";
mxG.Y="2021";
mxG.C="FM&SH";
mxG.D=[];
mxG.K=0;
if(!mxG.Z) mxG.Z=[];
if(!mxG.Z.fr) mxG.Z.fr=[];
if(!mxG.Z.en) mxG.Z.en=[];
String.prototype.c2n=function(k){var n=this.charCodeAt(k);return n-((n<97)?38:96);};
String.prototype.ucFirst=function(){return this.charAt(0).toUpperCase()+this.slice(1);}
String.prototype.lcFirst=function(){return this.charAt(0).toLowerCase()+this.slice(1);}
mxG.isArray=function(a){return a.constructor===Array;};
mxG.getMClick=function(ev)
{
	var b=this.getBoundingClientRect();
	return {x:ev.clientX-b.left,y:ev.clientY-b.top};
};
mxG.getKCode=function(ev)
{
	var c;
	if(!ev) ev=window.event;
	if(ev.altKey||ev.ctrlKey||ev.metaKey) return 0;
	c=ev.keyCode;
	if(ev.charCode&&(c==0)) c=ev.charCode;
	return c;
};
mxG.createUnselectable=function()
{
	if(!mxG.unselectable)
	{
		let s=document.createElement('style'),c='',k,km;
		let a=['-webkit-','-moz-','-ms-',''];
		km=a.length;
		for(k=0;k<km;k++) c+=(a[k]+'user-select:none;');
		s.type='text/css';
		s.innerHTML='.mxUnselectable {'+c+'}';
		document.getElementsByTagName('head')[0].appendChild(s);
		mxG.unselectable=1;
	}
};
mxG.b64EncodeUnicode=function(str)
{
	return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
		function toSolidBytes(match,p1)
		{
			return String.fromCharCode('0x'+p1);
		}));
};
mxG.random=function(n){return Math.floor(Math.random()*n);};
mxG.shuffle=function(a)
{
	var i,j,z;
	for(i=a.length-1;i>0;i--)
	{
		j=Math.floor(Math.random()*(i+1));
		z=a[i];
		a[i]=a[j];
		a[j]=z;
	}
	return a;
};
mxG.isAndroid=(navigator.userAgent.toLowerCase().indexOf("android")>-1);
mxG.canOpen=function()
{var r;return !(typeof FileReader=='undefined')&&(r=new FileReader())&&(r.readAsText);};
mxG.getLang=function(t)
{
	var lang,m;
	while(t&&!t.lang) t=t.parentNode;
	t=t?t.lang:(navigator.language||"en");
	return t;
}
mxG.fr=function(a,b){if(mxG.Z.fr[a]===undefined) mxG.Z.fr[a]=b;};
mxG.en=function(a,b){if(mxG.Z.en[a]===undefined) mxG.Z.en[a]=b;};
}
