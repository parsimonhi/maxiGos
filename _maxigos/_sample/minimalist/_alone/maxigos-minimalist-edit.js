// maxiGos v7 Minimalist+Edit copyright 1998-2022 FM&SH, BSD license

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
// maxiGos v7 > mgos_prs.js
// sgf parser
// mxG.N class (N=Node, P=Property, V=Value)
if(!mxG.N)
{
mxG.N=function(n,p,v)
{
	this.Kid=[];
	this.P={}; // P properties are B, W, AB, ...
	this.Dad=n;
	this.Focus=0; // kid on focus: 0=>no kid, 1=>1st kid, Kid.length=>last kid
	if(n) {n.Kid.push(this);if(!n.Focus) n.Focus=1;}
	if(p) this.P[p]=[v];
};
mxG.N.prototype.TakeOff=function(p,k)
{
	if(this.P[p])
	{
		if(k<0) this.P[p].splice(0,this.P[p].length);else this.P[p].splice(k,1);
		if(!this.P[p].length) delete this.P[p];
	}
};
mxG.N.prototype.Set=function(p,v)
{
	if(typeof(v)=="object") this.P[p]=v;
	else this.P[p]=[v];
};
mxG.N.prototype.Clone=function(dad)
{
	var p,k,bN=new mxG.N(dad,null,null);
	// better to check e.hasOwnProperty(p) when using for...in
	for(p in this.P) if(p.match(/^[A-Z]+$/)&&this.P.hasOwnProperty(p))
		bN.P[p]=this.P[p].concat();
	for(k=0;k<this.Kid.length;k++)
		bN.Kid[k]=this.Kid[k].Clone(bN);
	bN.Focus=this.Focus;
	return bN;
};
}
// mxG.P class
if(!mxG.P)
{
mxG.P=function(s,coreOnly,mainOnly)
{
	// no need to change charset
	this.rN=new mxG.N(null,null,null);
	this.coreOnly=coreOnly;
	this.mainOnly=mainOnly;
	this.parseSgf(s);
	if(!this.rN.Focus)
		this.parseSgf("(;FF[4]CA[UTF-8]GM[1]SZ[19])");
	return this.rN;
};
mxG.P.prototype.keep=function(a,p,v)
{
	if(this.coreOnly&&((a=="N")||(a=="P")||(a=="V")))
		return (p=="B")||(p=="W")||(p=="AB")||(p=="AW")||(p=="AE")
			 ||(p=="FF")||(p=="CA")||(p=="GM")||(p=="SZ")
			 ||(p=="EV")||(p=="RO")||(p=="DT")||(p=="PC")
			 ||(p=="PW")||(p=="WR")||(p=="WT")||(p=="PB")||(p=="BR")||(p=="BT")
			 ||(p=="RU")||(p=="TM")||(p=="OT")||(p=="HA")||(p=="KM")||(p=="RE")
			 ||(p=="VW");
	return 1;
};
mxG.P.prototype.out=function(a,p,v)
{
	if(this.keep(a,p,v))
		switch(a)
		{
			case "N":this.nN=new mxG.N(this.nN,p,v);break;
			case "P":this.nN.P[p]=[v];break;
			case "V":this.nN.P[p].push(v);break;
			case "v=":this.nN=this.v[this.v.length-1];break;
			case "v+":this.v.push(this.nN);break;
			case "v-":this.v.pop();break;
		}
};
mxG.P.prototype.clean=function(s)
{
	var r=s;
	// odd number of \ before \n or \r => sgf soft break
	// remove one \ and the next \n\r, \r\n, \n or \r
	r=r.replace(/([^\\])((\\\\)*)\\((\n\r)|(\r\n)|\r|\n)/g,'$1$2');
	r=r.replace(/^((\\\\)*)\\((\n\r)|(\r\n)|\r|\n)/g,'$1');
	// remove \ preceded by even number of \
	r=r.replace(/([^\\])((\\\\)*)\\/g,'$1$2');
	r=r.replace(/^((\\\\)*)\\/g,'$1');
	// remove \ preceded by \
	r=r.replace(/\\\\/g,'\\');
	// replace \n\r, \r\n, and \r by \n
	r=r.replace(/(\n\r)|(\r\n)|\r/g,"\n");
	// strip html tags
	// r=r.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi,'');
	return r;
};
mxG.P.prototype.parseValue=function(p,K,c)
{
	var v="",a;
	K++; // by-pass '['
	while((K<this.len)&&((a=this.s.charAt(K))!=']'))
	{
		if(a=='\\'){v+=a;K++;a=this.s.charAt(K);}
		if(K<this.len) v+=a;
		K++;
	}
	v=this.clean(v);
	// cannot manage "tt" coordinates if goban size is larger than 19x19
	// if(((p=="B")||(p=="W"))&&(v=="tt")) v="";
	if(p=="RE"){a=v.slice(0,1);if((a=="V")||(a=="D")) v=a;}
	if(this.nc){this.nc=0;this.out("N",p,v);}
	else if(!c) this.out("P",p,v);
	else this.out("V",p,v);
	K++; // by-pass ']'
	while(K<this.len)
	{
		a=this.s.charAt(K);
		if((a=='(')||(a==';')||(a==')')||((a>='A')&&(a<='Z'))||(a=='[')) break;else K++;
	}
	return K;
};
mxG.P.prototype.parseProperty=function(K)
{
	var a,p="",c=0;
	while((K<this.len)&&((a=this.s.charAt(K))!='['))
	{
		if((a>='A')&&(a<='Z')) p+=a;
		K++;
	}
	while((K<this.len)&&(this.s.charAt(K)=='[')){K=this.parseValue(p,K,c);c++;}
	return K;
};
mxG.P.prototype.parseNode=function(K)
{
	var a;
	this.nc=1;
	while(K<this.len)
	{
		switch(a=this.s.charAt(K))
		{
			case '(':
			case ';':
			case ')':return K;
			default: if((a>='A')&&(a<='Z')) K=this.parseProperty(K);else K++;
		}
	}
	return K;
};
mxG.P.prototype.parseVariation=function(K)
{
	var a=(this.mainOnly?1:0);
	if(this.nv){if(this.v.length) this.out("v=","","");this.nv=0;} else this.out("v+","","");
	while(K<this.len)
		switch(this.s.charAt(K))
		{
			case '(':if(a) K++;else return K;break;
			case ';':K++;K=this.parseNode(K);break;
			case ')':K++;
					 if(this.nv){if(this.v.length) this.out("v-","","");} else this.nv=1;
					 if(a) return this.len;break;
			default:K++;
		}
	return K;
};
mxG.P.prototype.parseSgf=function(s)
{
	var K=0;
	this.rN.Kid=[];
	this.rN.Focus=0;
	this.nN=this.rN;
	this.v=[];
	this.nv=0; // if 0, 1st node variation
	this.nc=0; // if 1, create node
	this.s=s;
	this.len=this.s.length;
	while(K<this.len) if(this.s.charAt(K)=='('){K++;K=this.parseVariation(K);} else K++;
	while(this.v.length) this.out("v-","","");
};
}
// maxiGos v7 > mgos_rls.js
// go rules manager
if(!mxG.R)
{
mxG.R=function()
{
	this.act=[""]; // action history ("" as "Play" or "A" as "Add")
	this.nat=["E"]; // nature history ("B" as "Black", "W" as "White" or "E" as "Empty")
	this.x=[0]; // x coordinate of action
	this.y=[0]; // y coordinate of action
	this.o=[0]; // 0 if never taken, m if taken by m 
};
mxG.R.prototype.init=function(DX,DY)
{
	var i,j;
	this.play=0; // action counter
	this.setup=0; // last setup action number
	this.DX=DX; // number of column (19 for classic goban)
	this.DY=DY; // number of row (19 for classic goban)
	this.ban=[]; // goban (each point contains last action done on this point)
	for(i=1;i<=this.DX;i++) // prefer that indices start at 1 for lisibility
	{
		this.ban[i]=[];
		for(j=1;j<=this.DY;j++) this.ban[i][j]=0;
	}
	this.prisoners={B:[0],W:[0]}; // number of prisoner taken by black and white
};
mxG.R.prototype.inGoban=function(x,y)
{
	return (x>=1)&&(y>=1)&&(x<=this.DX)&&(y<=this.DY);
};
mxG.R.prototype.lib=function(nat,x,y)
{
	// return 1 if(x,y) is a liberty, or is nat with liberties
	var k,km;
	if(!this.inGoban(x,y)) return 0;
	if(this.nat[this.ban[x][y]]=="E") return 1;
	if(this.nat[this.ban[x][y]]!=nat) return 0;
	km=this.s.length;
	for(k=0;k<km;k++) if((this.s[k].x==x)&&(this.s[k].y==y)) return 0;
	this.s[km]={x:x,y:y};
	if(this.lib(nat,x,y-1)||this.lib(nat,x+1,y)||this.lib(nat,x,y+1)||this.lib(nat,x-1,y))
		return 1;
	return 0;
};
mxG.R.prototype.capture=function(nat,x,y)
{
	// capture nat stones
	this.s=[];
	if(this.lib(nat,x,y)) return 0;
	var numOfPrisoner=this.s.length,pt;
	while(this.s.length)
	{
		pt=this.s.pop();
		this.o[this.ban[pt.x][pt.y]]=this.play;
		this.ban[pt.x][pt.y]=0;
	}
	return numOfPrisoner;
};
mxG.R.prototype.place=function(nat,x,y)
{
	// works even if the move is not valid
	// nat can be B, W, AB, AW, or AE
	// pNat: player nat, oNat: opponent nat
	this.play++;
	var act=((nat.length>1)?"A":"");
	var pNat=nat.slice(-1);
	var oNat=((pNat=="B")?"W":((pNat=="W")?"B":"E"));
	var prisoners,m=this.play;
	this.act[m]=act;
	this.nat[m]=pNat;
	this.prisoners.B[m]=this.prisoners.B[m-1];
	this.prisoners.W[m]=this.prisoners.W[m-1];
	this.o[m]=0;
	if(this.inGoban(x,y))
	{
		this.x[m]=x;
		this.y[m]=y;
		if(act!="A") // B or W
		{
			this.ban[x][y]=m;
			prisoners=this.capture(oNat,x-1,y);
			prisoners+=this.capture(oNat,x+1,y);
			prisoners+=this.capture(oNat,x,y-1);
			prisoners+=this.capture(oNat,x,y+1);
			if(!prisoners)
			{
				prisoners=this.capture(pNat,x,y); // suicide
				this.prisoners[oNat][m]+=prisoners;
			}
			else this.prisoners[pNat][m]+=prisoners;
		}
		else // AB, AW or AE
		{
			this.setup=m;
			this.ban[x][y]=(pNat!="E"?m:0);
		}
	}
	else
	{
		this.x[m]=0;
		this.y[m]=0;
	}
};
mxG.R.prototype.back=function(play)
{
	this.init(this.DX,this.DY);
	for(var k=1;k<=play;k++) this.place(this.act[k]+this.nat[k],this.x[k],this.y[k]);
};
mxG.R.prototype.isOccupied=function(x,y)
{
	return this.nat[this.ban[x][y]]!="E";
};
mxG.R.prototype.isOnlyOne=function(k,nat)
{
	var n=1,x=this.x[k],y=this.y[k];
	if((x>1)&&(this.nat[this.ban[x-1][y]]==nat)) n++;
	if((y>1)&&(this.nat[this.ban[x][y-1]]==nat)) n++;
	if((x<this.DX)&&(this.nat[this.ban[x+1][y]]==nat)) n++;
	if((y<this.DY)&&(this.nat[this.ban[x][y+1]]==nat)) n++;
	return n==1;
};
mxG.R.prototype.hasOnlyOneLib=function(k)
{
	var n=0,x=this.x[k],y=this.y[k];
	if((x>1)&&(this.nat[this.ban[x-1][y]]=="E")) n++;
	if((y>1)&&(this.nat[this.ban[x][y-1]]=="E")) n++;
	if((x<this.DX)&&(this.nat[this.ban[x+1][y]]=="E")) n++;
	if((y<this.DY)&&(this.nat[this.ban[x][y+1]]=="E")) n++;
	return n==1;
};
mxG.R.prototype.captureOnlyOne=function(k,nat)
{
	return (this.prisoners[nat][k]-this.prisoners[nat][k-1])==1;
};
mxG.R.prototype.isKo=function(nat,x,y)
{
	// japanese ko only
	var m=this.play;
	if(m<4) return 0;
	// pNat:player nat, oNat:opponent nat
	var pNat=nat.slice(-1),
		oNat=((pNat=="B")?"W":((pNat=="W")?"B":"E")),
		xpred=this.x[m],ypred=this.y[m];
	return (((xpred==(x-1))&&(ypred==y))||((xpred==x)&&(ypred==(y-1)))
			||((xpred==(x+1))&&(ypred==y))||((xpred==x)&&(ypred==(y+1))))
			&&this.isOnlyOne(m,oNat)
			&&this.hasOnlyOneLib(m)
			&&this.captureOnlyOne(m,oNat)
			&&(pNat==this.nat[m-1])
			&&(oNat==this.nat[m]);
};
mxG.R.prototype.canCapture=function(nat,x,y)
{
	this.s=[];
	if(this.lib(nat,x,y)) return 0;
	return this.s.length;
};
mxG.R.prototype.isLib=function(x,y)
{
	return this.inGoban(x,y)&&(this.nat[this.ban[x][y]]=="E");
};
mxG.R.prototype.isSuicide=function(nat,x,y)
{
	var m=this.play,
		pNat=nat.slice(-1),
		oNat=((pNat=="B")?"W":((pNat=="W")?"B":"E")),
		s=1,exNat=this.nat[m+1],exBan=this.ban[x][y];
	this.nat[m+1]=pNat;
	this.ban[x][y]=m+1;
	if(this.isLib(x-1,y)||this.isLib(x,y-1)||this.isLib(x+1,y)||this.isLib(x,y+1)
		||this.canCapture(oNat,x-1,y)||this.canCapture(oNat,x,y-1)
		||this.canCapture(oNat,x+1,y)||this.canCapture(oNat,x,y+1)
		||!this.canCapture(pNat,x,y)) s=0;
	this.ban[x][y]=exBan;
	this.nat[m+1]=exNat;
	return s;
};
mxG.R.prototype.isValid=function(nat,x,y)
{
	return (!x&&!y)
			||!(this.inGoban(x,y)
				&&(this.isOccupied(x,y)
					||this.isKo(nat,x,y)
					||this.isSuicide(nat,x,y)));
};
// some useful functions
mxG.R.prototype.getBanNum=function(x,y){return this.ban[x][y];};
mxG.R.prototype.getBanNat=function(x,y){return this.nat[this.ban[x][y]];};
mxG.R.prototype.getNat=function(n){return this.nat[n];};
mxG.R.prototype.getX=function(n){return this.x[n];};
mxG.R.prototype.getY=function(n){return this.y[n];};
mxG.R.prototype.getAct=function(n){return this.act[n];};
mxG.R.prototype.getPrisoners=function(nat){return this.prisoners[nat][this.play];};
mxG.R.prototype.getO=function(n){return this.o[n];};
}
// maxiGos v7 > mgos_scr.js
// screen output manager
// remember: css properties have priority on svg attributes
if(!mxG.S)
{
mxG.S=function(p)
{
	// set them as soon as possible
	this.p=p; // parent object: mxG.D[k] 
	this.d=23;
	this.ff="Arial,sans-serif";
	this.fs=14;
	this.fw=400;
	this.sw4text="";
	this.sw4mark="1.125";
	this.sw4grid="1.125";
	this.sw4stone="1.125";
	this.stoneShadowWidth=1;
};
mxG.S.prototype.star=function(x,y)
{
	var DX=this.DX,DY=this.DY;
	var Ax=4,Bx=DX+1-Ax,Cx=((DX+1)>>1);
	var Ay=4,By=DY+1-Ay,Cy=((DY+1)>>1);
	var xok=0,yok=0;
	if((DX>11)&&((x==Ax)||(x==Bx))) xok=1;
	if((DX&1)&&((DX>15)||(x==y))&&(x==Cx)) xok=1;
	if((DY>11)&&((y==Ay)||(y==By))) yok=1;
	if((DY&1)&&((DY>15)||(x==y))&&(y==Cy)) yok=1;
	return xok&&yok;
};
mxG.S.prototype.isLabel=function(m)
{
	return /^\(*\|.*\|\)*$/.test(m);
};
mxG.S.prototype.removeLabelDelimiters=function(m)
{
	return m.replace(/^(\(*)\|(.*)\|(\)*)$/,"$1$2$3");
};
mxG.S.prototype.isVariation=function(m)
{
	return /^\(.*\)$/.test(m);
};
mxG.S.prototype.isVariationOnFocus=function(m)
{
	return /^\(\([^()]*\)\)$/.test(m);
};
mxG.S.prototype.removeVariationDelimiters=function(m)
{
	return m.replace(/^\(+([^()]*)\)+$/,"$1");
};
mxG.S.prototype.isMark=function(m)
{
	return /^\(*_(CR|MA|SQ|TR)_\)*$/.test(m);
};
mxG.S.prototype.i2x=function(i)
{
	return this.dw*(i-this.xl+0.5)+this.gbsxl;
};
mxG.S.prototype.j2y=function(j)
{
	return this.dh*(j-this.yt+0.5)+this.gbsyt;
};
mxG.S.prototype.makeText=function(txt,i,j,o)
{
	var s,x,y,dx,dy,c,cls,cls2="",wbk,hbk,w,h,dw2,dh2,dz,sw,sx;
	cls=o.cls;
	c=o.c;
	sw=o.sw;
	dz=this.grim+this.grip;
	txt+="";
	dx=(i<1)?-dz:(i>this.DX)?dz:0;
	dy=(j<1)?-dz:(j>this.DY)?dz:0;
	if((i<1)||(j<1)||(i>this.DX)||(j>this.DY))
	{
		dw2=this.db/2;
		dh2=this.db/2;
	}
	else
	{
		dw2=this.dw/2;
		dh2=this.dh/2;
	}
	x=this.dw*(i-this.xl+1)-dw2+this.gbsxl+dx;
	y=this.dh*(j-this.yt+1)-dh2+this.gbsyt+dy;
	s="<text";
	if(cls) s+=" class=\""+cls+"\"";
	if(c&&!o.ignoreFillAndStroke)
	{
		s+=" fill=\""+c+"\"";
		if (sw) s+=" stroke=\""+c+"\"";
	}
	if (sw&&!o.ignoreFillAndStroke) s+=" stroke-width=\""+sw+"\"";
	if((cls.indexOf("mxVertical")>=0)
		&&((cls.indexOf("mxLen2")>=0)||(cls.indexOf("mxLen3")>=0)))
	{
		// japanese kanji
		// bug? in firefox (08/2019), cannot use css textLength+vertical-rl
		// bug? in safari (08/2019), cannot use css transform-box
		s+=" transform=\"translate(0,"+(y-2)+")";
		if(cls.indexOf("mxLen3")>=0) s+=" scale(1,0.33)";
		else s+=" scale(1,0.5)";
		s+=" translate(0,-"+y+")\"";
		s+=" writing-mode=\"vertical-rl\"";
	}
	else if(txt.length>1)
	{
		// using svg transform seems to be the safest way to shrink text width
		// translate(x,0) scale(sx,1) translate(-x,0)
		// is as matrix(sx,0,0,1,x*(1-sx),0)
		if(txt.length>2) sx=0.8;
		else sx=0.9;
		s+=" transform=\"matrix("+sx+",0,0,1,"+Math.round(x*(1-sx)*100)/100+",0)\"";
	}
	// font-family, font-size and text-anchor are set in svg tag
	// bug, cannot use dominant-baseline:central everywhere
	// then just add 5 to y to center text verticaly
	s+=" x=\""+x+"\" y=\""+(y+5)+"\">";
	s+=txt;
	s+="</text>";
	return s;
};
mxG.S.prototype.make2dStone=function(c,x,y,r,o)
{
	var s;
	s="<circle class=\"mx"+c+"\"";
	if(o.opacity<1) s+="fill-opacity=\""+o.opacity+"\"";
	if(!o.ignoreFillAndStroke) // alone stones, animated stones ...
	{
		let glc=(o.animatedStone&&this.p.glc)?this.p.glc:"#000";
		s+=" fill=\""+(c=="Black"?"#000":"#fff")+"\"";
		s+=" stroke=\""+(((c=="Black")&&o.whiteStroke4Black)?"#fff":glc)+"\"";
		s+=" stroke-width=\""+this.sw4stone+"\"";
	}
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+(r-(this.sw4stone-1)/2)+"\"/>";
	return s;
};
mxG.S.prototype.makeStoneShadow=function(c,x,y,r,o)
{
	var s="",e=this.stoneShadowWidth;
	s+="<circle class=\"mx"+c+"Shadow\"";
	// opacity better than rgba() for exporting
	if(!o.ignoreFillAndStroke) s+=" fill=\"#000\" opacity=\"0.2\"";
	s+=" cx=\""+(x+e)+"\" cy=\""+(y+e)+"\" r=\""+r+"\"/>";
	return s;
};
mxG.S.prototype.make3dStone1=function(c,x,y,r,o)
{
	var s="",e=this.stoneShadowWidth;
	if(o.stoneShadowOn) s+=this.makeStoneShadow(c,x,y,r,o);
	s+="<circle class=\"mx"+c+"\"";
	if(o.opacity<1) s+="fill-opacity=\""+o.opacity+"\"";
	if(!o.ignoreFillAndStroke) s+=" fill=\"url(#"+this.p.n+c[0]+"RG)\"";
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+r+"\"/>";
	return s;
};
mxG.S.prototype.make3dStone2=function(c,x,y,r,o)
{
	// do not ignore fill and stroke here
	var s="",a,rg;
	if(o.stoneShadowOn) s+=this.makeStoneShadow(c,x,y,r,o);
	s+="<circle class=\"mx"+c+"\"";
	if(o.opacity<1) s+="fill-opacity=\""+o.opacity+"\"";
	s+=" fill=\"url(#"+this.p.n+c[0]+"RGA)\"";
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+r+"\"/>";
	s+="<circle class=\"mx"+c+"2\"";
	if(o.opacity<1) s+="fill-opacity=\""+o.opacity+"\"";
	rg="B";
	if(c=="White")
	{
		a=this.p.alea8[Math.round((x+y)/r/2)%8];
		if(a) rg+=a;
	}
	s+=" fill=\"url(#"+this.p.n+c[0]+"RG"+rg+")\"";
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+r+"\"/>";
	return s;
};
mxG.S.prototype.makeStone=function(c,x,y,r,o)
{
	if(o.in3dOn) return this["make3dStone"+(this.p.specialStoneOn?2:1)](c,x,y,r,o);
	else return this.make2dStone(c,x,y,r,o);
};
mxG.S.prototype.makeTextOnAloneStone=function(txt,x,y,d,c,o)
{
	// assume txt is a number
	var s,x,y;
	txt+="";
	s="<text";
	s+=" text-anchor=\"middle\"";
	s+=" fill=\""+c+"\"";
	if(this.sw4text) s+=" stroke=\""+c+"\" stroke-width=\""+this.sw4text+"\"";
	if(txt.length>1)
	{
		if(o.vertical)
		{
			s+=" transform=\"translate(0,"+(y-2)+")";
			if(txt.length>2) s+=" scale(1,0.33)";
			else s+=" scale(1,0.5)";
			s+=" translate(0,-"+y+")\"";
			s+=" writing-mode=\"vertical-rl\"";
		}
		else
		{
			// using svg transform seems to be the safest way to shrink text width
			s+=" transform=\"translate("+x+",0)";
			if(txt.length>2) s+=" scale(0.8,1)";
			else s+=" scale(0.9,1)";
			s+=" translate(-"+x+",0)\"";
		}
	}
	// font-family, font-size and text-anchor are set in svg tag
	// bug, cannot use dominant-baseline:central everywhere
	// then just add 5 to y to center text verticaly
	s+=" x=\""+x+"\" y=\""+(y+5)+"\">";
	s+=txt;
	s+="</text>";
	return s;
};
mxG.S.prototype.makeTextAfterAloneStone=function(txt,d,c)
{
	var s,x,y;
	txt+="";
	x=d+d/8;
	y=d/2;
	s="<text class=\"mxAfterAloneStone\"";
	s+=" fill=\""+c+"\"";
	if(this.sw4text) s+=" stroke=\""+c+"\" stroke-width=\""+this.sw4text+"\"";
	// font-family and font-size are set in svg tag
	// bug, cannot use dominant-baseline:central everywhere
	// then just add 5 to y to center text verticaly
	s+=" x=\""+x+"\" y=\""+(y+5)+"\">";
	s+=txt;
	s+="</text>";
	return s;
};
mxG.S.prototype.makeAloneStone=function(nat,n,o)
{
	var s,d=this.d,dd=d+2,x=dd/2,y=dd/2,z,c,t;
	z=(o.in3dOn&&o.stoneShadowOn)?this.stoneShadowWidth:0;
	s="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	// final viewBox, width and height will be modified when rendering
	s+=" viewBox=\""+(-z)+" "+(-z)+" "+(dd+2*z)+" "+(dd+2*z)+"\"";
	//s+=" width=\""+(dd+2*z)+"\" height=\""+(dd+2*z)+"\"";
	s+=" width=\"40\" height=\"40\""; // acceptable size if no css
	s+=" font-family=\""+this.ff+"\"";
	s+=" font-size=\""+this.fs+"\"";
	s+=" font-weight=\""+this.fw+"\"";
	s+=">";
	c=(nat=="B")?"Black":(nat=="W")?"White":null;
	if(c)
	{
		o.opacity=1;
		s+=this.makeStone(c,x,y,d/2,o);
		if(n) s+=this.makeTextOnAloneStone(n,dd/2,dd/2,dd,(nat=="B")?"White":"Black",o);
	}
	s+="</svg>";
	return s;
};
mxG.S.prototype.makeAloneStoneAndText=function(nat,n,v,o)
{
	var s,d=this.d,dd=d+2,x=dd/2,y=dd/2,z,c,t;
	z=(o.in3dOn&&o.stoneShadowOn)?this.stoneShadowWidth:0;
	s="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	// final viewBox, width and height will be modified when rendering
	s+=" viewBox=\""+(-z)+" "+(-z)+" "+(dd+2*z)+" "+(dd+2*z)+"\"";
	s+=" width=\"100%\" height=\"40\""; // acceptable size if no css
	s+=" font-family=\""+this.ff+"\"";
	s+=" font-size=\""+this.fs+"\"";
	s+=" font-weight=\""+this.fw+"\"";
	s+=">";
	c=(nat=="B")?"Black":(nat=="W")?"White":null;
	if(v)
	{
		t=this.p.local(c?c:"")+(n?(c?" ":"")+n:"")+v;
		s+="<title>"+t+"</title>";
	}
	if(c)
	{
		o.opacity=1;
		s+=this.makeStone(c,x,y,d/2,o);
		if(n) s+=this.makeTextOnAloneStone(n,dd/2,dd/2,dd,(nat=="B")?"White":"Black",o);
		if(v) s+=this.makeTextAfterAloneStone(v,dd,"Black");
	}
	s+="</svg>";
	return s;
};
mxG.S.prototype.makeTextSomewhere=function(txt,x,y,c,centered)
{
	// x: center of the text if centered, beginning of the text otherwise
	// y: center of the text
	var s;
	txt+="";
	s="<text class=\"mxTextSomewhere\"";
	s+=" fill=\""+c+"\"";
	if(this.sw4text) s+=" stroke=\""+c+"\" stroke-width=\""+this.sw4text+"\"";
	if(centered) s+=" text-anchor=\"middle\"";
	// font-family and font-size are set in svg tag
	// bug, cannot use dominant-baseline:central everywhere
	// then just add 5 to y to center text verticaly
	s+=" x=\""+x+"\" y=\""+(y+5)+"\">";
	s+=txt;
	s+="</text>";
	return s;
};
mxG.S.prototype.makeNotSeen=function(a,o)
{
	var k,km,s="",nw,h4ns,title="",i,j,c,x,y,xo;
	var d,dd,ddd,z;
	d=this.d;
	dd=this.d+2;
	z=(o.in3dOn&&o.stoneShadowOn)?this.stoneShadowWidth:0;
	ddd=dd+2*z;
	km=a.length;
	for(k=0;k<km;k++)
	{
		if(k) title+=", ";
		title+=this.p.local(a[k].nat=="B"?"Black":"White")+" "+a[k].n+" "+a[k].t;
		if(a[k].nato) title+=" "+this.p.local(a[k].nato=="B"?"Black":"White")+" "+a[k].no;
	}
	// compute h4ns
	nw=Math.floor(this.w/(4*ddd));
	if(nw<1) nw=1;
	nl=Math.ceil(km/nw);
	h4ns=nl*ddd;
	xo=(this.w-nw*4*ddd+ddd)/2;
	s="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	s+=" id=\""+this.p.n+"NotSeenSvg\" class=\"mxNotSeenSvg\"";
	s+=" viewBox=\"0 0 "+this.w+" "+h4ns+"\"";
	s+=" width=\""+this.w+"\" height=\""+h4ns+"\"";
	s+=" stroke-linecap=\"square\"";
	s+=" font-family=\""+this.ff+"\"";
	s+=" font-size=\""+this.fs+"\"";
	s+=" font-weight=\""+this.fw+"\"";
	s+=">";
	s+="<title>"+title+"</title>"; // accessibility
	if(this.in3dOn)
	{
		s+="<defs>";
		s+=this.makeGradient("Black");
		s+=this.makeGradient("White");
		s+="</defs>";
	}
	for(k=0;k<km;k++)
	{
		i=k%nw;
		j=Math.floor(k/nw);
		c=(a[k].nat=="B")?"Black":"White";
		o.opacity=1;
		x=xo+i*ddd*4+ddd/2;
		y=j*ddd+ddd/2;
		s+=this.makeStone(c,x,y,d/2,o);
		if(a[k].n) s+=this.makeTextOnAloneStone(a[k].n,x,y,dd,(a[k].nat=="B")?"White":"Black",o);
		if(a[k].t)
		{
			if(a[k].nato)
				s+=this.makeTextSomewhere(a[k].t,x+ddd,y,"Black",1);
			else
				s+=this.makeTextSomewhere(a[k].t,x+ddd/2+d/8,y,"Black",0);
		}
		if(a[k].nato)
		{
			c=(a[k].nato=="B")?"Black":"White";
			o.opacity=1;
			x=xo+(i*4+2)*ddd+ddd/2;
			y=j*ddd+ddd/2;
			s+=this.makeStone(c,x,y,d/2,o);
			if(a[k].no) s+=this.makeTextOnAloneStone(a[k].no,x,y,dd,(a[k].nato=="B")?"White":"Black",o);
		}
	}
	s+="</svg>";
	return s;
};
mxG.S.prototype.makeSelectTool=function()
{
	var s,d=this.d,dd=d+2,x=dd/2,y=dd/2,z,c="#000";
	z=d*3/4;
	s="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	s+=" viewBox=\"0 0 "+dd+" "+dd+"\"";
	s+=" width=\"40\" height=\"40\""; // acceptable size if no css
	s+=">";
	s+="<rect stroke-dasharray=\"2\"";
	s+=" fill=\"none\" stroke=\""+c+"\" stroke-width=\""+this.sw4grid+"\"";
	s+=" x=\""+(x-z/2)+"\" y=\""+(y-z/2)+"\"";
	s+=" width=\""+z+"\" height=\""+z+"\"/></g>";
	s+="</svg>";
	return s;
};
mxG.S.prototype.makeViewTool=function()
{
	var s,d=this.d,dd=d+2,x=dd/2,y=dd/2,z,c="#000";
	z=d*3/4;
	s="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	s+=" viewBox=\"0 0 "+dd+" "+dd+"\"";
	s+=" width=\"40\" height=\"40\""; // acceptable size if no css
	s+=">";
	s+="<g fill=\"none\" stroke=\""+c+"\" stroke-width=\""+this.sw4grid+"\">"
	s+="<rect";
	s+=" x=\""+(x-z/2)+"\" y=\""+(y-z/2)+"\"";
	s+=" width=\""+z+"\" height=\""+z+"\"/>";
	s+="<rect";
	s+=" x=\""+x+"\" y=\""+(y-z/2)+"\"";
	s+=" width=\""+z/2+"\" height=\""+z/2+"\"/>";
	s+="</g>";
	s+="</svg>";
	return s;
};
mxG.S.prototype.makeAloneBiStone=function(nat,o)
{
	let s,d=this.d,dd=d+2,x=dd/2,y=dd/2,c1,c2,r,z;
	z=(this.p.in3dOn&&this.p.stoneShadowOn)?this.stoneShadowWidth:0;
	if(nat.slice(-1)=="B"){c1="Black";c2="White";}
	else {c1="White";c2="Black";}
	s="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	s+=" xmlns:xlink=\"http://www.w3.org/1999/xlink\"";
	//s+=" viewBox=\"0 0 "+dd+" "+dd+"\"";
	s+=" viewBox=\""+(-z)+" "+(-z)+" "+(dd+2*z)+" "+(dd+2*z)+"\"";
	s+=" width=\"40\" height=\"40\""; // acceptable size if no css
	s+=">";
	s+="<defs>";
	s+="<clipPath id=\""+this.p.n+"SetupBlackClip\"><path";
	s+=" d=\"M0 0L"+x+" 0L"+x+" "+dd+"L0 "+dd+"Z\"";
	s+="/></clipPath>";
	s+="<clipPath id=\""+this.p.n+"SetupWhiteClip\">";
	s+="<path";
	s+=" d=\"M"+dd+" 0L"+x+" 0L"+x+" "+dd+"L"+dd+" "+dd+"Z\"";
	s+="/>";
	s+="</clipPath>";
	s+="</defs>";
	if(o.in3dOn) r=d/2; else r=(d-this.sw4stone+1)/2;
	if(this.stoneShadowOn)
	{
		let e=this.stoneShadowWidth;
		s+="<circle";
		s+=" fill=\"#000\" opacity=\"0.2\"";
		s+=" cx=\""+(x+e)+"\" cy=\""+(y+e)+"\" r=\""+r+"\"/>";
	}
	s+="<circle";
	s+=" clip-path=\"url(#"+this.p.n+"SetupBlackClip)\"";
	if(o.in3dOn) s+=" fill=\"url(#"+this.p.n+c1[0]+"RG)\"";
	else s+=" fill=\""+c1+"\" stroke=\"#000\" stroke-width=\""+this.sw4stone+"\"";
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+r+"\"";
	s+="/>";
	s+="<circle";
	s+=" clip-path=\"url(#"+this.p.n+"SetupWhiteClip)\"";
	if(o.in3dOn) s+=" fill=\"url(#"+this.p.n+c2[0]+"RG)\"";
	else s+=" fill=\""+c2+"\" stroke=\"#000\" stroke-width=\""+this.sw4stone+"\"";
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+r+"\"";
	s+="/>";
	s+="</svg>";
	return s;
};
mxG.S.prototype.makeMarkOnLast=function(c,x,y,cls)
{
	var s,z;
	z=this.d/6;
	s="<rect class=\""+cls+"\"";
	s+=" fill=\""+c+"\"";
	s+=" x=\""+(x-z)+"\" y=\""+(y-z)+"\"";
	s+=" width=\""+z*2+"\" height=\""+z*2+"\"/>";
	return s;
};
mxG.S.prototype.makeMark=function(c,x,y,cls)
{
	var s,x1,y1,x2,y2,z=this.d*0.28;
	x1=x-z;
	y1=y-z;
	x2=x+z;
	y2=y+z;
	s="<path class=\""+cls+"\"";
	s+=" stroke-width=\""+this.sw4mark+"\" stroke=\""+c+"\" fill=\"none\"";
	s+=" d=\"M"+x1+" "+y1+"L"+x2+" "+y2+"M"+x1+" "+y2+"L"+x2+" "+y1+"\"/>";
	return s;
};
mxG.S.prototype.makeCircle=function(c,x,y,cls)
{
	var s,z=this.d*0.27;
	s="<circle class=\""+cls+"\"";
	s+=" stroke-width=\""+this.sw4mark+"\" stroke=\""+c+"\" fill=\"none\"";
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+z+"\"/>";
	return s;
};
mxG.S.prototype.makeTriangle=function(c,x,y,cls)
{
	var s,x1,y1,x2,y2,x3,y3,z=this.d*0.32;
	x1=x;
	y1=y-z;
	x2=x-z;
	y2=y+z*0.8;
	x3=x+z;
	y3=y+z*0.8;
	s="<polygon class=\""+cls+"\"";
	s+=" stroke-width=\""+this.sw4mark+"\" stroke=\""+c+"\" fill=\"none\"";
	s+=" points=\""+x1+" "+y1+" "+x2+" "+y2+" "+x3+" "+y3+"\"/>";
	return s;
};
mxG.S.prototype.makeSquare=function(c,x,y,cls)
{
	var s,z=this.d*0.27;
	s="<rect class=\""+cls+"\"";
	s+=" stroke-width=\""+this.sw4mark+"\" stroke=\""+c+"\" fill=\"none\"";
	s+=" x=\""+(x-z)+"\" y=\""+(y-z)+"\"";
	s+=" width=\""+z*2+"\" height=\""+z*2+"\"/>";
	return s;
};
mxG.S.prototype.makeAloneMark=function(m)
{
	var s,d=this.d,dd=d+2,x=dd/2,y=dd/2,c="#000",cls="mxTool";
	s="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	s+=" viewBox=\"0 0 "+dd+" "+dd+"\"";
	s+=" width=\"40\" height=\"40\""; // acceptable size if no css
	s+=">";
	switch(m)
	{
		case "Circle":s+=this.makeCircle(c,x,y,cls);break;
		case "Mark":s+=this.makeMark(c,x,y,cls);break;
		case "Square":s+=this.makeSquare(c,x,y,cls);break;
		case "Triangle":s+=this.makeTriangle(c,x,y,cls);break;
	}
	s+="</svg>";
	return s;
};
mxG.S.prototype.makeAloneToolText=function(txt)
{
	// for edit tool only
	// assume text width is smaller than dd
	var s,d=this.d,dd=d+2,x=dd/2,y=dd/2,c="#000";
	s="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	s+=" viewBox=\"0 0 "+dd+" "+dd+"\"";
	s+=" width=\"40\" height=\"40\""; // acceptable size if no css
	s+=" font-family=\""+this.ff+"\"";
	s+=" font-size=\""+this.fs+"\"";
	s+=" font-weight=\""+this.fw+"\"";
	s+=">";
	s+="<text";
	s+=" text-anchor=\"middle\"";
	s+=" fill=\""+c+"\"";
	if(this.sw4text) s+=" stroke=\""+c+"\" stroke-width=\""+this.sw4text+"\"";
	//else s+=" stroke=\"none\"";
	s+=" x=\""+x+"\" y=\""+(y+5)+"\">";
	s+=txt;
	s+="</text>";
	s+="</svg>";
	return s;
};
mxG.S.prototype.makeTerritoryMark=function(a,x,y,cls)
{
	var c=(a=="_TB_")?"Black":"White",o;
	if(this.p.territoryMark=="MA") return this.makeMark(c,x,y,cls);
	o={opacity:1,in3dOn:this.in3dOn,stoneShadowOn:this.stoneShadowOn};
	return this.makeStone(c,x,y,this.d/4.5,o);
};
mxG.S.prototype.makeFocusMark=function(x,y)
{
	var s,z=this.d/2;
	s+="<rect class=\"mxFocusMark\" stroke=\"#000\" fill=\"none\"";
	s+=" x=\""+(x-z)+"\" y=\""+(y-z)+"\"";
	s+=" width=\""+z*2+"\" height=\""+z*2+"\"/>";
	return s;
};
mxG.S.prototype.makeStoneNumberOnGrid=function(i,j,nat,a)
{
	var s="",c,cls,x,y;
	cls="mxOn"+((nat=="B")?"Black":"White");
	cls+=" mx"+i+"_"+j;
	cls+=" mxNumber";
	c=(nat=="B")?"#fff":"#000";
	x=this.i2x(i);
	y=this.j2y(j);
	if(this.oldJapaneseNumberingOn)
	{
		a=this.k2okanji(parseInt(a+""));
		cls+=" mxVertical";
		cls+=" mxLen"+(a+"").length;
	}
	s+=this.makeText(a,i,j,{c:c,cls:cls,ignoreFillAndStroke:1});
	return s;
};
mxG.S.prototype.makeMarkOrLabel=function(i,j,nat,a)
{
	var s="",c,cls,x,y;
	cls="mxOn"+((nat=="B")?"Black":(nat=="W")?"White":"Empty");
	cls+=" mx"+i+"_"+j;
	c=(nat=="B")?"#fff":"#000";
	x=this.i2x(i);
	y=this.j2y(j);
	if((a=="_TB_")||(a=="_TW_"))
		s+=this.makeTerritoryMark(a,x,y,"mxTerritoryMark "+cls);
	else if(a=="_ML_")
		s+=this.makeMarkOnLast(c,x,y,"mxMarkOnLast "+cls);
	else
	{
		if(this.isMark(a)) cls+=" mxMark";
		else if(this.isLabel(a))
		{
			cls+=" mxLabel";
			a=this.removeLabelDelimiters(a);
		}
		if(this.isVariation(a))
		{
			cls+=" mxVariation";
			if(this.isVariationOnFocus(a)) cls+=" mxOnFocus";
			a=this.removeVariationDelimiters(a);
		}
		switch(a)
		{
			case "_MA_":s+=this.makeMark(c,x,y,cls);break;
			case "_TR_":s+=this.makeTriangle(c,x,y,cls);break;
			case "_SQ_":s+=this.makeSquare(c,x,y,cls);break;
			case "_CR_":s+=this.makeCircle(c,x,y,cls);break;
			default:s+=this.makeText(a,i,j,{c:c,cls:cls,sw:this.sw4text});
		}
	}
	return s;
};
mxG.S.prototype.k2katakana=function(ko)
{
	var k=this.DX-ko,s;
	s="イロハニホヘトチリヌルヲワカヨタレソツ";
	s+="ネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス";
	return (k<s.length)?s.charAt(k):"";
};
mxG.S.prototype.k2kanji=function(k)
{
	var s="一二三四五六七八九十";
	if(k<11) return s.charAt(k-1);
	if(k<20) return "十"+s.charAt(k-11);
	return "";
};
mxG.S.prototype.k2okanji=function(s)
{
	var k,ko,a,an,b,bn,c,cn;
	s+="";
	k=parseInt(s);
	if(!k) return s;
	if(k<20) return this.k2kanji(k);
	a=Math.floor(k/100);
	b=Math.floor(k/10)-a*10;
	c=k-b*10-a*100;
	if(a==0) an="";
	else if(a==1) an="口";
	else if(a==2) an="△";
	else if(a==3) an="◯";
	else an="⊙";
	if(b==0) bn="";
	else if(b==1) bn="十";
	else if(b==2) bn="廾";
	else if(b==3) bn="卅";
	else bn=this.k2n(b);
	if(c==0) cn=(b<4)?"":"十";
	else if((b==c)&&(b>3)) cn="〻"; // if(android) cn="々" also possible (too modern?)
	else cn=this.k2kanji(c);
	return an+bn+cn;
};
mxG.S.prototype.k2n=function(k)
{
	if(this.oldJapaneseIndicesOn||this.japaneseIndicesOn) return this.k2okanji(k);
	return (this.DY+1-k)+"";
};
mxG.S.prototype.k2c=function(k)
{
	if(this.oldJapaneseIndicesOn) return this.k2katakana(k);
	if(this.japaneseIndicesOn) return k+"";
	var r=((k-1)%25)+1;
	return String.fromCharCode(r+((r>8)?65:64))+((k>25)?(k-r)/25:"");
};
mxG.S.prototype.getIndices=function(x,y)
{
	if(!this.hideLeftIndices&&(x==0)&&(y>0)&&(y<=this.DY)) return this.k2n(y);
	if(!this.hideTopIndices&&(y==0)&&(x>0)&&(x<=this.DX)) return this.k2c(x);
	if(!this.hideRightIndices&&(x==(this.DX+1))&&(y>0)&&(y<=this.DY)) return this.k2n(y);
	if(!this.hideBottomIndices&&(y==(this.DY+1))&&(x>0)&&(x<=this.DX)) return this.k2c(x);
	return "";
};
mxG.S.prototype.makeIndices=function()
{
	var s,i,j,cls1,cls2,m;
	cls1="mxIndice mxHorizontal";
	if(this.japaneseIndicesOn||this.oldJapaneseIndicesOn) cls2="mxIndice mxVertical";
	else cls2=cls1;
	s="<g class=\"mxIndices\" fill=\"#000\"";
	if(this.sw4text) s+=" stroke=\"#000\" stroke-width=\""+this.sw4text+"\"";
	s+=">";
	if(this.xl==1)
	{
		i=0;
		for(j=this.yt;j<=this.yb;j++)
		{
			m=this.getIndices(i,j);
			s+=this.makeText(m,i,j,{cls:cls2+" mxLen"+m.length});
		}
	}
	if(this.yt==1)
	{
		j=0;
		for(i=this.xl;i<=this.xr;i++)
		{
			m=this.getIndices(i,j);
			s+=this.makeText(m,i,j,{cls:cls1+" mxLen"+m.length});
		}
	}
	if(this.xr==this.DX)
	{
		i=this.DX+1;
		for(j=this.yt;j<=this.yb;j++)
		{
			m=this.getIndices(i,j);
			s+=this.makeText(m,i,j,{cls:cls2+" mxLen"+m.length});
		}
	}
	if(this.yb==this.DY)
	{
		j=this.DY+1;
		for(i=this.xl;i<=this.xr;i++)
		{
			m=this.getIndices(i,j);
			s+=this.makeText(m,i,j,{cls:cls1+" mxLen"+m.length});
		}
	}
	s+="</g>";
	return s;
};
mxG.S.prototype.gridUnder=function(i,j,nat,str)
{
	if((str!="_TB_")&&(str!="_TW_"))
	{
		if((nat=="B")||(nat=="W")) return 0;
		if(str&&(this.isMark(str)||this.isLabel(str)||this.isVariation(str))) return 0;
	}
	return 1;
};
mxG.S.prototype.makeGrid=function(vNat,vStr)
{
	var s="",m,i,j,k,x,y,a,ds;
	s+="<g class=\"mxGobanLines\" fill=\"none\">";
	for(i=this.xl;i<=this.xr;i++)
	{
		x=this.i2x(i);
		y=((this.yt==1)?this.dh/2:0)+this.gbsyt;
		s+="<path class=\"mxGobanLine\"";
		s+=" d=\"M"+x+" "+y;
		if(this.eraseGridUnder)
		{
			m="M";
			for(j=this.yt;j<=this.yb;j++)
			{
				k=this.p.xy(i,j);
				if(this.gridUnder(i,j,vNat[k],vStr[k]))
				{
					if(m=="M")
					{
						if(j>this.yt)
						{
							y=this.gbsyt+(j-this.yt)*this.dh;
							s+=m+x+" "+y;
						}
						m="V";
					}
				}
				else
				{
					if(m=="V") // j > yt
					{
						y=this.gbsyt+(j-this.yt)*this.dh;
						s+=m+y;
						m="M";
					}
				}
			}
		}
		else m="V";
		y=this.gbsyt+(this.yb-this.yt+1)*this.dh-((this.yb==this.DY)?this.dh/2:0);
		if(m=="V") s+=m+y;
		else s+=m+x+" "+y;
		s+="\"/>";
	}
	for(j=this.yt;j<=this.yb;j++)
	{
		x=((this.xl==1)?this.dw/2:0)+this.gbsxl;
		y=this.j2y(j);
		s+="<path class=\"mxGobanLine\"";
		s+=" d=\"M"+x+" "+y;
		if(this.eraseGridUnder)
		{
			m="M";
			for(i=this.xl;i<=this.xr;i++)
			{
				k=this.p.xy(i,j);
				if(this.gridUnder(i,j,vNat[k],vStr[k]))
				{
					if(m=="M")
					{
						if(i>this.xl)
						{
							x=this.gbsxl+(i-this.xl)*this.dw;
							s+=m+x+" "+y;
						}
						m="H";
					}
				}
				else
				{
					if(m=="H") // i > xl
					{
						x=this.gbsxl+(i-this.xl)*this.dw;
						s+=m+x;
						m="M";
					}
				}
			}
		}
		else m="H";
		x=this.gbsxl+(this.xr-this.xl+1)*this.dw-((this.xr==this.DX)?this.dw/2:0);
		if(m=="H") s+=m+x;
		else s+=m+x+" "+y;
		s+="\"/>";
	}
	s+="</g><g class=\"mxStars\" fill=\"#000\">";
	ds=this.d/9;
	for(i=this.xl;i<=this.xr;i++)
		for(j=this.yt;j<=this.yb;j++)
			if(this.star(i,j))
			{
				k=this.p.xy(i,j);
				if(!this.eraseGridUnder||this.gridUnder(i,j,vNat[k],vStr[k]))
				{
					s+="<circle class=\"mxStar mxStar"+i+"_"+j+"\"";
					s+=" cx=\""+this.i2x(i)+"\" cy=\""+this.j2y(j)+"\" r=\""+ds+"\"/>";
				}
			}
	s+="</g>";
	return s;
};
mxG.S.prototype.makeBackground=function(r)
{
	var s,x,y,a,b,cls;
	b=this.indicesOn?this.gobp+this.db+this.grim:0; // indices width
	if(r=="Outer")
	{
		// always indicesOn in this case
		x=((this.xl==1)?this.gobm:this.dw*(1-this.xl)-b);
		y=((this.yt==1)?this.gobm:this.dh*(1-this.yt)-b);
		a=this.grip+b;
		w=this.dw*this.DX+a*2;
		h=this.dh*this.DY+a*2;
	}
	else if(r=="Inner")
	{
		x=((this.xl==1)?this.gobm+b:this.dw*(1-this.xl));
		y=((this.yt==1)?this.gobm+b:this.dh*(1-this.yt));
		a=this.grip;
		w=this.dw*this.DX+a*2;
		h=this.dh*this.DY+a*2;
	}
	else // whole svg
	{
		x=0;
		y=0;
		w=this.w;
		h=this.h;
	}
	cls="mxGobanBackground";
	cls+=(this.indicesOn?" mxWithIndices":"");
	cls+=" mx"+r+"Rect";
	s="<rect class=\""+cls+"\"";
	s+=" fill=\"none\" stroke=\"none\"";
	s+=" x=\""+x+"\" y=\""+y+"\"";
	s+=" width=\""+w+"\" height=\""+h+"\"/>";
	return s;
};
mxG.S.prototype.getWRatio=function()
{
	// get ratio from goban svg to deal the case where no css
	var b=this.p.getE("GobanSvg").getBoundingClientRect();
	return this.w/b.width;
};
mxG.S.prototype.getHRatio=function()
{
	// get ratio from goban svg to deal the case where no css
	var b=this.p.getE("GobanSvg").getBoundingClientRect();
	return this.h/b.height;
};
mxG.S.prototype.getC=function(ev)
{
	var x,y,c=this.ig.getMClick(ev);
	c.x=c.x*this.getWRatio()-this.gbsxl;
	c.y=c.y*this.getHRatio()-this.gbsyt;
	x=Math.max(Math.min(Math.floor(c.x/this.dw)+this.xl,this.xr),this.xl);
	y=Math.max(Math.min(Math.floor(c.y/(this.dh))+this.yt,this.yb),this.yt);
	return {x:x,y:y}
};
mxG.S.prototype.setMagicGobanWidth=function(e)
{
	// using pointsNumMax (number of points in a line of a reference goban)
	// calculate a reduction ratio wr used to display a small gobans or part of a goban
	// with stones of the same diameter as the stone diameter of a reference goban
	// the reduction is applied to e which is ig or one of its ancestors
	var wr,z;
	if((this.xr-this.xl+1)<=this.pointsNumMax)
	{
		z=this.gbsxl+this.gbsxr;
		if(!this.indicesOn)
		{
			if(this.xl!=1) z+=this.gobp+this.db+this.grim;
			if(this.xr!=this.DX) z+=this.gobp+this.db+this.grim;
		}
		wr=this.w/(this.dw*this.pointsNumMax+z)*100;
	}
	else wr=100; // if too large goban, do as if this.pointsNumMax=0
	e.style.width=wr+"%";
	this.wr=wr;
};
mxG.S.prototype.makeGradient1=function(c)
{
	// glass stones
	var s,r,c1,c2,c3;
	r=(c=="Black")?50:100;
	c1=(c=="Black")?"#999":"#fff";
	c2=(c=="Black")?"#333":"#ccc";
	c3=(c=="Black")?"#000":"#333";
	s="<radialGradient id=\""+this.p.n+c[0]+"RG\"";
	s+=" class=\"mx"+c[0]+"RG\"";
	s+=" cx=\"33%\" cy=\"33%\" r=\""+r+"%\">";
	s+="<stop stop-color=\""+c1+"\" offset=\"0\"/>";
	s+="<stop stop-color=\""+c2+"\" offset=\"0.5\"/>";
	s+="<stop stop-color=\""+c3+"\" offset=\"1\"/>";
	s+="</radialGradient>";
	return s;
};
mxG.S.prototype.makeShellEffect=function(o)
{
	var s,s1="<stop stop-color=\"#000\" offset=\"",s2="\" stop-opacity=\"",s3="\"/>";
	s=s1+(o-0.03)+s2+"0"+s3;
	s+=s1+(o-0.02)+s2+"0.0125"+s3;
	s+=s1+o+s2+"0.0375"+s3;
	s+=s1+(o+0.02)+s2+"0.0125"+s3;
	s+=s1+(o+0.03)+s2+"0"+s3;
	return s;
};
mxG.S.prototype.makeGradient2=function(c)
{
	// slate and shell stones
	var s,k,l,rg;
	s=this.makeGradient1(c);
	s+="<radialGradient id=\""+this.p.n+c[0]+"RGA\"";
	s+=" class=\"mx"+c[0]+"RGA\"";
	if(c=="Black")
	{
		s+=" cx=\"50%\" cy=\"50%\" r=\"50%\">";
		s+="<stop stop-color=\"#aaa\" offset=\"0.8\"/>";
		s+="<stop stop-color=\"#666\" offset=\"1\"/>";
	}
	else
	{
		s+=" cx=\"33%\" cy=\"33%\" r=\"100%\">";
		s+="<stop stop-color=\"#fff\" offset=\"0\"/>";
		s+="<stop stop-color=\"#ccc\" offset=\"0.5\"/>";
		s+="<stop stop-color=\"#333\" offset=\"1\"/>";
	}
	s+="</radialGradient>";
	if(c=="Black")
	{
		s+="<radialGradient id=\""+this.p.n+c[0]+"RGB\"";
		s+=" class=\"mx"+c[0]+"RGB\"";
		s+=" cx=\"90%\" cy=\"90%\" r=\"100%\">";
		s+="<stop stop-color=\"#000\" offset=\"0.6\" stop-opacity=\"1\"/>";
		s+="<stop stop-color=\"#000\" offset=\"1\" stop-opacity=\"0\"/>";
		s+="</radialGradient>";
	}
	else
	{
		for(k=0;k<8;k++)
		{
			rg="B";
			if(k) rg+=k;
			s+="<radialGradient id=\""+this.p.n+c[0]+"RG"+rg+"\"";
			s+=" class=\"mx"+c[0]+"RGB\"";
			switch(k)
			{
				case 0:s+=" cx=\"0%\" cy=\"100%\" r=\"120%\">";break;
				case 1:s+=" cx=\"50%\" cy=\"100%\" r=\"120%\">";break;
				case 2:s+=" cx=\"100%\" cy=\"100%\" r=\"120%\">";break;
				case 3:s+=" cx=\"100%\" cy=\"50%\" r=\"120%\">";break;
				case 4:s+=" cx=\"100%\" cy=\"0%\" r=\"120%\">";break;
				case 5:s+=" cx=\"50%\" cy=\"0%\" r=\"120%\">";break;
				case 6:s+=" cx=\"0%\" cy=\"0%\" r=\"120%\">";break;
				case 7:s+=" cx=\"0%\" cy=\"50%\" r=\"120%\">";break;
			}
			for(l=0.05;l<1;l=l+0.15) s+=this.makeShellEffect(l);
			s+="</radialGradient>";
		}
	}
	return s;
};
mxG.S.prototype.makeGradient=function(c)
{
	return this["makeGradient"+(this.p.specialStoneOn?2:1)](c);
};
mxG.S.prototype.addAnimatedGoban=function(c)
{
	var s,tpl,list,k,km,co,xo,yo,xn,yn,z,r=this.d/2,o;
	s="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	s+=" viewBox=\"0 0 "+this.w+" "+this.h+"\"";
	s+=" width=\"100%\" height=\"100%\"";
	s+=" class=\"mxAnimatedGobanSvg\"";
	s+=">";
	co=(c.nat=="B")?"Black":"White";
	xo=(c.nat=="B")?this.w-r:r;
	yo=(c.nat=="B")?this.h-r:r;
	xn=this.i2x(c.x)-xo;
	yn=this.j2y(c.y)-yo;
	o={opacity:1,in3dOn:this.in3dOn,stoneShadowOn:this.stoneShadowOn,animatedStone:1};
	s+=this.makeStone(co,xo,yo,this.d/2,o);
	s+="</svg>";
	tpl=document.createElement("template");
	tpl.innerHTML=s;
	list=tpl.content.querySelectorAll("circle");
	km=list.length;
	z="transform "+this.p.animatedStoneTime/1000+"s ease-out";
	for(k=0;k<km;k++) list[k].style.transition=z;
	this.ig.appendChild(tpl.content);
	list=this.ig.lastChild.querySelectorAll("circle");
	km=list.length;
	this.ig.offsetHeight;
	z="translate("+xn+"px,"+yn+"px)";
	for(k=0;k<km;k++) list[k].style.transform=z;
};
mxG.S.prototype.removeAnimatedGoban=function(c)
{
	var e=this.ig.querySelector("svg:nth-of-type(2)");
	if(e) this.ig.removeChild(e);
};
mxG.S.prototype.makeGoban=function()
{
	var s,c,p;
	var i,j;
	var x,y,x1,y1,x2,y2,w,h,wmax,wr,z,a;
	this.vNat=[];
	this.vStr=[];
	this.w=this.dw*(this.xr-this.xl+1)+this.gbsxl+this.gbsxr;
	this.h=this.dh*(this.yb-this.yt+1)+this.gbsyt+this.gbsyb;
	// if pointsNumMax is not 0, reduce the width of ig or one of its ancestors
	// to be able to display small gobans or parts of goban with the same stone diameter
	// as the stone diameter of a reference goban (which has pointsNumMax on its rows)
	//     if magicParentNum is 0, ig itself is reduced
	//     if magicParentNum is 1, ig parent is reduced
	//     if magicParentNum is 2, ig grandparent is reduced etc.
	// magicParentNum is useful when other components
	// such as "navigation" or "notSeen" should have the same width as ig
	p=this.ig;
	km=this.p.magicParentNum||0;
	for(k=0;k<km;k++) p=p.parentNode;
	this.setMagicGobanWidth(p);
	// convenient width should be set in css
	// style set below is the minimalist style
	//   convenient if style is disabled (goban is well displayed)
	//   convenient for Edit component (need no css)
	s="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	s+=" xmlns:xlink=\"http://www.w3.org/1999/xlink\""; // in case one uses xlink:href
	s+=" id=\""+this.p.n+"GobanSvg\" class=\"mxGobanSvg\"";
	s+=" viewBox=\"0 0 "+this.w+" "+this.h+"\"";
	//s+=" width=\"100%\" height=\"100%\""; // safer, else bug if borders in Chrome?
	s+=" width=\""+this.w+"\" height=\""+this.h+"\"";
	s+=" stroke-linecap=\"square\"";
	s+=" font-family=\""+this.ff+"\"";
	s+=" font-size=\""+this.fs+"\"";
	s+=" font-weight=\""+this.fw+"\"";
	s+=" text-anchor=\"middle\"";
	s+=">";
	s+="<title>"+this.p.local("Goban")+"</title>"; // accessibility
	if(this.in3dOn)
	{
		s+="<defs>";
		s+=this.makeGradient("Black");
		s+=this.makeGradient("White");
		s+="</defs>";
	}
	s+=this.makeBackground("Whole");
	s+=this.makeBackground("Outer");
	if(this.indicesOn) s+=this.makeIndices();
	s+=this.makeBackground("Inner");
	s+="<g id=\""+this.p.n+"Grid\" class=\"mxGrid\"";
	s+=" stroke=\"#000\" stroke-width=\""+this.sw4grid+"\"></g>";
	s+="<g id=\""+this.p.n+"Points\" class=\"mxPoints\"></g>";
	s+="<g id=\""+this.p.n+"Focus\" class=\"mxFocus\"></g>";
	s+="</svg>";
	return s;
};
mxG.S.prototype.setInternalParameters=function()
{
	// internal parameters
	var stretchingArray=this.stretching.split(",");
	this.in3dWidthStretch=parseInt(stretchingArray[0]+"");
	this.in3dHeightStretch=parseInt(stretchingArray[1]+"");
	this.in2dWidthStretch=parseInt(stretchingArray[2]+"");
	this.in2dHeightStretch=parseInt(stretchingArray[3]+"");
	if(this.in3dOn)
	{
		this.pws=this.in3dWidthStretch?this.in3dWidthStretch:0;
		this.phs=this.in3dHeightStretch?this.in3dHeightStretch:0;
	}
	else
	{
		this.pws=this.in2dWidthStretch?this.in2dWidthStretch:0;
		this.phs=this.in2dHeightStretch?this.in2dHeightStretch:0;
	}
	this.dw=this.d+this.pws;
	this.dh=this.d+this.phs;
	this.db=(this.dw+this.dh)/2; // for indices area
	if(this.indicesOn)
	{
		this.gbsxl=((this.xl==1)?this.gobp+this.grim+this.gobm+this.db:0)+this.grip;
		this.gbsyt=((this.yt==1)?this.gobp+this.grim+this.gobm+this.db:0)+this.grip;
		this.gbsxr=((this.xr==this.DX)?this.gobp+this.grim+this.gobm+this.db:0)+this.grip;
		this.gbsyb=((this.yb==this.DY)?this.gobp+this.grim+this.gobm+this.db:0)+this.grip;
	}
	else
	{
		this.gbsxl=((this.xl==1)?this.gobm:0)+this.grip;
		this.gbsyt=((this.yt==1)?this.gobm:0)+this.grip;
		this.gbsxr=((this.xr==this.DX)?this.gobm:0)+this.grip;
		this.gbsyb=((this.yb==this.DY)?this.gobm:0)+this.grip;
	}
};
mxG.S.prototype.init=function()
{
	var p=this.p;
	this.ig=p.getE("InnerGobanDiv"); // DIV where goban displays
	this.stoneShadowOn=p.stoneShadowOn;
	this.pointsNumMax=p.pointsNumMax;
	this.japaneseIndicesOn=p.japaneseIndicesOn;
	this.oldJapaneseIndicesOn=p.oldJapaneseIndicesOn;
	this.oldJapaneseNumberingOn=p.oldJapaneseNumberingOn;
	this.eraseGridUnder=p.eraseGridUnder;
	this.grip=p.gridPadding;
	this.grim=p.gridMargin;
	this.gobp=p.gobanPadding;
	this.gobm=p.gobanMargin;
	this.stretching=p.stretching;
	this.hideLeftIndices=p.hideLeftIndices;
	this.hideTopIndices=p.hideTopIndices;
	this.hideRightIndices=p.hideRightIndices;
	this.hideBottomIndices=p.hideBottomIndices;
};
mxG.S.prototype.getLabelLen=function(a,str)
{
	var len=a.getComputedTextLength();
	len=(str.length>2)?0.8*len:(str.length>1)?len=0.9*len:len;
	len+=0.15*this.dw;
	return Math.max(0.85*this.dw,len);
};
mxG.S.prototype.getHorizontalGridLine=function(j)
{
	var g=this.p.getE("Grid"),list;
	list=g.querySelectorAll("path");
	return list[this.xr-this.xl+1+j-this.yt];
};
mxG.S.prototype.getVerticalGridLine=function(i)
{
	var g=this.p.getE("Grid"),list;
	list=g.querySelectorAll("path");
	return list[i-this.xl];
};
mxG.S.prototype.eraseVerticalGridSegment=function(i,y)
{
	var e,d1,d2,a,b,k,km,x,y1,y2,f1,f2;
	e=this.getVerticalGridLine(i);
	d1=e.getAttributeNS(null,"d");
	a=d1.match(/[^M0-9.-][0-9.-]+/g);
	km=a.length;
	b=[];
	x=this.i2x(i);
	for(k=0;k<km;k++)
	{
		b[k]=parseFloat(a[k].substring(1));
		a[k]=a[k].substring(0,1);
		if(a[k]==" ") a[k]="M";
	}
	y1=Math.max(b[0],y-this.dh/2);
	y2=Math.min(b[km-1],y+this.dh/2);
	d2="M"+x+" "+b[0];
	f1=0;
	f2=0;
	for(k=1;k<km;k++)
	{
		if(!f1)
		{
			if(b[k]>=y1)
			{
				if(a[k]=="V") d2+="V"+y1;
				f1=1;
			}
			else
			{
				if(a[k]=="V") d2+="V"+b[k];
				else d2+="M"+x+" "+b[k];
			}
		}
		if(f1&&!f2)
		{
			if(b[k]>=y2)
			{
				d2+="M"+x+" "+y2;
				f2=1;
			}
		}
		if(f1&&f2&&(b[k]>y2))
		{
			if(a[k]=="V") d2+="V"+b[k];
			else d2+="M"+x+" "+b[k];			
		}
	}
	if(d1!=d2) e.setAttributeNS(null,"d",d2);
};
mxG.S.prototype.eraseVerticalGridSegments=function(i,j,x,y,w)
{
	var i,i1,i2,ik,e;
	i1=Math.max(this.xl,i-Math.floor(w/2/this.dw));
	i2=Math.min(this.xr,i+Math.floor(w/2/this.dw));
	// if (ik==i) the job was done when making the grid
	for(ik=i1;ik<=i2;ik++)
	{
		if(ik!=i)
		{
			this.eraseVerticalGridSegment(ik,y);
			if(this.star(ik,j))
			{
				e=this.p.getE("Grid").querySelector(".mxStar"+ik+"_"+j);
				e.parentNode.removeChild(e);
			}
		}
	}
};
mxG.S.prototype.eraseLongGridSegment=function(i,j,x,y,w)
{
	// is executed only when long label (i.e. almost never)
	var e,d1,d2,a,b,k,km,x1,x2,m;
	e=this.getHorizontalGridLine(j);
	d1=e.getAttributeNS(null,"d");
	a=d1.match(/(M|H)[0-9.-]+/g);
	km=a.length;
	b=[];
	for(k=0;k<km;k++)
	{
		b[k]=parseFloat(a[k].substring(1));
		a[k]=a[k].substring(0,1);
	}
	x1=Math.max(Math.floor((x-w/2)*10)/10,b[0]);
	x2=Math.min(Math.ceil((x+w/2)*10)/10,b[km-1]);
	d2="M"+b[0]+" "+y;
	f1=0;
	f2=0;
	for(k=1;k<km;k++)
	{
		if(!f1)
		{
			if(b[k]>=x1)
			{
				if(a[k]=="H") d2+="H"+x1; // else already in a "M" segement
				f1=1; // x1 found
			}
			else // keep segment before x1 as is
			{
				if(a[k]=="H") d2+="H"+b[k];
				else d2+="M"+b[k]+" "+y;
			}
		}
		if(f1&&!f2)
		{
			if(b[k]>=x2)
			{
				d2+="M"+x2+" "+y;
				f2=1; // x2 found
			}
			// else wait for next segment
		}
		if(f1&&f2&&(b[k]>x2)) // keep segment after x2 as is
		{
			if(a[k]=="H") d2+="H"+b[k];
			else d2+="M"+b[k]+" "+y;
		}
		// else wait for next segment
	}
	if(d1!=d2) e.setAttributeNS(null,"d",d2);
	this.eraseVerticalGridSegments(i,j,x,y,w);
};
mxG.S.prototype.addPointBackground=function(i,j,nat,str)
{
	var a,b,p,cls,x,y,h,w,vof=0;
	if(this.isLabel(str)||this.isVariation(str))
	{
		p=this.p.getE("Points");
		if(a=p.querySelector("text.mx"+i+"_"+j))
		{
			cls="mxPointBackground mx"+i+"_"+j;
			if(this.isLabel(str)) cls+=" mxLabel";
			if(this.isVariation(str)) cls+=" mxVariation";
			if(this.isVariationOnFocus(str))
			{
				cls+=" mxOnFocus";
				if(a.classList.contains("mxOnEmpty")) vof=1;
			}
			if(a.classList.contains("mxOnBlack"))
				cls+=" mxOnBlack";
			else if(a.classList.contains("mxOnWhite"))
				cls+=" mxOnWhite";
			else if(a.classList.contains("mxOnEmpty"))
				cls+=" mxOnEmpty";
			h=0.85*this.dh;
			w=this.getLabelLen(a,str);
			x=parseFloat(a.getAttributeNS(null,"x"));
			y=parseFloat(a.getAttributeNS(null,"y"));
			b=document.createElementNS("http://www.w3.org/2000/svg","rect");
			b.setAttributeNS(null,"fill","none");
			b.setAttributeNS(null,"stroke",vof?"#000":"none");
			if(vof) b.setAttributeNS(null,"stroke-width",this.sw4grid);
			b.setAttributeNS(null,"x",x-w/2);
			b.setAttributeNS(null,"y",y-h/2-5);
			b.setAttributeNS(null,"width",w);
			b.setAttributeNS(null,"height",h);
			b.setAttribute("class",cls);
			a.parentNode.insertBefore(b,a);
			// if (w<=this.dw) the job was done when making the grid
			if(w>this.dw) this.eraseLongGridSegment(i,j,x,y-5,w);
		}
	}
};
mxG.S.prototype.draw=function(vNat,vStr,pFocus)
{
	var i,j,k,km,s="",opacity,nat,str,list,a,b,c,xf,yf,o,z,s1,s2,s3,s4,s5,s6;
	this.p.getE("Grid").innerHTML=this.makeGrid(vNat,vStr);
	this.pNat=this.vNat;
	this.pStr=this.vStr;
	this.vNat=vNat;
	this.vStr=vStr;
	this.pFocus=pFocus;
	// group elements to reduce final svg size
	s1="";
	s2="";
	s3="";
	s4="";
	s5="";
	for(i=this.xl;i<=this.xr;i++)
		for(j=this.yt;j<=this.yb;j++)
		{
			k=this.p.xy(i,j);
			nat=this.vNat[k];
			str=this.vStr[k];
			if((nat=="B")||(nat=="W"))
			{
				c=(nat=="B")?"Black":"White";
				if(this.in3dOn&&this.stoneShadowOn)
				{
					o={ignoreFillAndStroke:1};
					s1+=this.makeStoneShadow(c,this.i2x(i),this.j2y(j),this.d/2,o);
				}
				o={in3dOn:this.in3dOn,stoneShadowOn:0,ignoreFillAndStroke:1};
				o.opacity=((str=="_TB_")||(str=="_TW_"))?0.5:1;
				if(nat=="B")
				{
					s2+=this.makeStone(c,this.i2x(i),this.j2y(j),this.d/2,o);
					if(str&&/^[0-9]+$/.test(str))
						s4+=this.makeStoneNumberOnGrid(i,j,nat,str);
				}
				else
				{
					s3+=this.makeStone(c,this.i2x(i),this.j2y(j),this.d/2,o);
					if(str&&/^[0-9]+$/.test(str))
						s5+=this.makeStoneNumberOnGrid(i,j,nat,str);
				}
			}
		}
	// draw shadows first
	if(s1)
	{
		// opacity better than rgba() for exporting
		s+="<g class=\"mxStoneShadows\" fill=\"#000\" opacity=\"0.2\" stroke=\"none\">";
		s+=s1;
		s+="</g>";
	}
	if(s2)
	{
		s+="<g class=\"mxBlackStones\"";
		if(this.in3dOn)
		{
			if(!this.p.specialStoneOn) s+=" fill=\"url(#"+this.p.n+"BRG)\"";
			s+=" stroke=\"none\">";
		}
		else s+=" fill=\"#000\" stroke=\"#000\" stroke-width=\""+this.sw4stone+"\">";
		s+=s2;
		s+="</g>";
	}
	if(s3)
	{
		s+="<g class=\"mxWhiteStones\"";
		if(this.in3dOn)
		{
			if(!this.p.specialStoneOn) s+=" fill=\"url(#"+this.p.n+"WRG)\"";
			s+=" stroke=\"none\">";
		}
		else s+=" fill=\"#fff\" stroke=\"#000\" stroke-width=\""+this.sw4stone+"\">";
		s+=s3;
		s+="</g>";
	}
	if(s4)
	{
		s6="<g class=\"mxBlackStoneNumbers\"";
		s6+=" fill=\"#fff\"";
		if(this.sw4text) s6+=" stroke=\"#fff\" stroke-width=\""+this.sw4text+"\"";
		s6+=">";
		s6+=s4;
		s6+="</g>";
		s+=s6;
	}
	if(s5)
	{
		s6="<g class=\"mxWhiteStoneNumbers\"";
		s6+=" fill=\"#000\"";
		if(this.sw4text) s6+=" stroke=\"#000\" stroke-width=\""+this.sw4text+"\"";
		s6+=">";
		s6+=s5;
		s6+="</g>";
		s+=s6;
	}
	// do the following last in case of drawing over the neighboring stones
	s1="";
	for(i=this.xl;i<=this.xr;i++)
		for(j=this.yt;j<=this.yb;j++)
		{
			k=this.p.xy(i,j);
			nat=this.vNat[k];
			str=this.vStr[k];
			if(str&&!(((nat=="B")||(nat=="W"))&&/^[0-9]+$/.test(str)))
				s1+=this.makeMarkOrLabel(i,j,nat,str);
		}
	if(s1)
	{
		s3="<g class=\"mxMarksAndLabels\">";
		s3+=s1;
		s3+="</g>";
		s+=s3;
	}
	this.p.getE("Points").innerHTML=s;
	if((xf=this.pFocus.x)&&(yf=this.pFocus.y))
		this.p.getE("Focus").innerHTML=this.makeFocusMark(this.i2x(xf),this.j2y(yf));
	else this.p.getE("Focus").innerHTML="";
	for(i=this.xl;i<=this.xr;i++)
		for(j=this.yt;j<=this.yb;j++)
		{
			k=this.p.xy(i,j);
			if(this.vStr[k]) this.addPointBackground(i,j,this.vNat[k],this.vStr[k]);
		}
};
// loop, navigation and solve buttons
mxG.S.prototype.makeBtnRectangle=function(x)
{
	return "<rect x=\""+x+"\" y=\"0\" width=\"24\" height=\"128\"/>";
};
mxG.S.prototype.makeBtnTriangle=function(x,a)
{
	var z=a*52;
	return "<polygon points=\""+x+" 64 "+(x+z)+" 128 "+(x+z)+" 0\"/>";
};
mxG.S.prototype.makeBtnContent=function(a,t)
{
	// convenient width and height should be set in css
	var s="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	s+=" viewBox=\"0 0 128 128\"";
	s+=" width=\"40\" height=\"40\">"; // acceptable size if no css
	if(t) s+="<title>"+this.p.local(t)+"</title>";
	return s+a+"</svg>";
};
mxG.S.prototype.makeFirstBtn=function()
{
	var s=this.makeBtnRectangle(26)+this.makeBtnTriangle(50,1);
	return this.makeBtnContent(s,"First");
};
mxG.S.prototype.makeTenPredBtn=function()
{
	var s=this.makeBtnTriangle(4,1)+this.makeBtnTriangle(56,1);
	return this.makeBtnContent(s,"10 Previous");
};
mxG.S.prototype.makePredBtn=function()
{
	var s=this.makeBtnTriangle(30,1);
	return this.makeBtnContent(s,"Previous");
};
mxG.S.prototype.makeNextBtn=function()
{
	var s=this.makeBtnTriangle(98,-1);
	return this.makeBtnContent(s,"Next");
};
mxG.S.prototype.makeTenNextBtn=function()
{
	var s=this.makeBtnTriangle(72,-1)+this.makeBtnTriangle(124,-1);
	return this.makeBtnContent(s,"10 Next");
};
mxG.S.prototype.makeLastBtn=function()
{
	var s=this.makeBtnTriangle(78,-1)+this.makeBtnRectangle(78);
	return this.makeBtnContent(s,"Last");
};
mxG.S.prototype.makeAutoBtn=function()
{
	var s=this.makeBtnTriangle(0,1)+this.makeBtnTriangle(128,-1);
	return this.makeBtnContent(s,"Auto");
};
mxG.S.prototype.makePauseBtn=function()
{
	var s=this.makeBtnRectangle(24)+this.makeBtnRectangle(80);
	return this.makeBtnContent(s,"Pause");
};
mxG.S.prototype.makeRetryBtn=function()
{
	var s;
	s="<path d=\"M0 64L64 64L32 92L0 64Z\"/>";
	s+="<path d=\"M24 64A50 50 0 1 1 49 107L57 94A34 34 0 1 0 40 64Z\"/>";
	return this.makeBtnContent(s,"Retry");
};
mxG.S.prototype.makeUndoBtn=function()
{
	var s;
	s="<path d=\"M20,105H108C114.6,105 120,99 120,93V44C120,37 114,32 108,32H40V8L8,40 40,72V48H96C100,48 104,51 104,56V81C104,85 100,89 96,89H20 Z\"/>";
	return this.makeBtnContent(s,"Undo");
};
mxG.S.prototype.makeHintBtn=function()
{
	var s;
	s="<rect x=\"54\" y=\"10\" width=\"20\" height=\"64\" rx=\"5\" ry=\"5\"/>";
	s+="<circle cx=\"64\" cy=\"104\" r=\"14\"/>";
	return this.makeBtnContent(s,"Hint");
};
mxG.S.prototype.makePassBtn=function()
{
	var s;
	s="<path fill-rule=\"evenodd\" d=\"M 64,10 L 118,64 L 64,118 L 10,64 Z M 64,35 L 93,64 L 64,93 L 35,64 Z\"/>";
	return this.makeBtnContent(s,"Pass");
};
mxG.S.prototype.makeFromPath=function(p)
{
	var s="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	s+=" viewBox=\"0 0 1024 1024\"";
	s+=" width=\"40\" height=\"40\">"; // acceptable size if no css
	return s+"<path d='"+p+"'/></svg>";
};
mxG.S.prototype.addSelect=function(i,j)
{
	var b,x,y,w,h,cls;
	w=this.dw;
	h=this.dh;
	if(i==this.xl)
	{
		x=0;
		w=this.i2x(i+1)-this.dw/2;
	}
	else if(i==this.xr)
	{
		x=this.i2x(i-1)+this.dw/2;
		w=this.w-x;
	}
	else
	{
		x=this.i2x(i)-this.dw/2;
		w=this.dw;
	}
	if(j==this.yt)
	{
		y=0;
		h=this.j2y(j+1)-this.dh/2;
	}
	else if(j==this.yb)
	{
		y=this.j2y(j-1)+this.dh/2;
		h=this.h-y;
	}
	else
	{
		y=this.j2y(j)-this.dh/2;
		h=this.dh;
	}
	cls="mxSelect";
	cls+=" mx"+i+"_"+j;
	b=document.createElementNS("http://www.w3.org/2000/svg","rect");
	b.setAttributeNS(null,"fill","#777");
	b.setAttributeNS(null,"opacity","0.5"); // better than rgba() for exporting
	b.setAttributeNS(null,"stroke","none");
	b.setAttributeNS(null,"x",x);
	b.setAttributeNS(null,"y",y);
	b.setAttributeNS(null,"width",w);
	b.setAttributeNS(null,"height",h);
	b.setAttribute("class",cls);
	this.ig.firstChild.appendChild(b);
};
mxG.S.prototype.removeSelect=function(i,j)
{
	var a,b;
	a=this.ig.firstChild;
	b=a.querySelector(".mxSelect.mx"+i+"_"+j);
	if(b) a.removeChild(b);
};
mxG.S.prototype.makeOneStone4Bowl=function(nat,x,y,d,o)
{
	// no shadow inside the bowl
	var s="",o2={};
	// todo: why without o2, o keeps changes below outside this function?
	if (o.hasOwnProperty("opacity")) o2.opacity=o.opacity;
	if (o.hasOwnProperty("stoneShadowOn")) o2.stoneShadowOn=o.stoneShadowOn;
	if (o.hasOwnProperty("whiteStroke4Black")) o2.whiteStroke4Black=o.whiteStroke4Black;
	o.opacity=1;
	o.stoneShadowOn=0;
	o.whiteStroke4Black=1;
	s=this.makeStone(nat=="B"?"Black":"White",x,y,d/2,o);
	if (o2.hasOwnProperty("opacity")) o.opacity=o2.opacity;
	if (o2.hasOwnProperty("stoneShadowOn")) o.stoneShadowOn=o2.stoneShadowOn;
	if (o2.hasOwnProperty("whiteStroke4Black")) o.whiteStroke4Black=o2.whiteStroke4Black;
	return s;
};
mxG.S.prototype.makeBowl=function(nat,o)
{
	// no svg shadow for the bowl
	var s="",x,y,r,i,j,k,km,km2,dk,rk,magicNum;
	magicNum=this.w/this.d*100/this.wr;
	dk=this.bowlW/magicNum*3;
	rk=dk/2;
	x=this.bowlW/2;
	y=(nat=="W")?this.bowlW/2:this.bowlW/2+this.capW;
	r=this.bowlW/2*0.9;
	r2=r-rk;
	s+="<circle class=\"mxBowlBackground\"";
	s+=" fill=\""+((nat=="B")?"#000":"#ccc")+"\"";
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+r+"\"/>";
	km=Math.ceil(2*r2/dk);
	for(i=0;i<km;i++)
		for(j=0;j<km;j++)
		{
			xk=2*r2*(i+((j&1)?0.5:0))/km-r2;
			yk=2*r2*(j+0.5)/km-r2;
			if((xk*xk+yk*yk)<r2*r2)
				s+=this.makeOneStone4Bowl(nat,x+xk,y+yk,dk,o);
		}
	km2=km*km;
	for(k=0;k<km2;k++)
	{
		xk=2*(r2-rk)*Math.random()-(r2-rk);
		yk=2*(r2-rk)*Math.random()-(r2-rk);
		if((xk*xk+yk*yk)<r2*r2)
			s+=this.makeOneStone4Bowl(nat,x+xk,y+yk,dk,o);
	}
	s+="<circle class=\"mxBowl\"";
	if(o.in3dOn) s+=" fill=\"url(#"+this.p.n+nat+"BowlIn3dRG)\"";
	else s+=" fill=\"url(#"+this.p.n+nat+"BowlIn2dRG)\"";
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+r+"\"/>";
	return s;
};
mxG.S.prototype.makeCap=function(nat,n,o)
{
	// no svg shadow for the cap
	var s="",x,y,r,c=(nat=="B")?"Black":"White";
	x=this.bowlW/2;
	y=(nat=="W")?this.bowlW+this.capW/2:this.capW/2;
	dy=this.capW*5/42;
	r=this.capW/2*0.9;
	s+="<circle class=\"mxCap\"";
	if(o.in3dOn) s+=" fill=\"url(#"+this.p.n+nat+"CapIn3dRG)\"";
	else s+=" fill=\"url(#"+this.p.n+nat+"CapIn2dRG)\"";
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+r+"\"/>";
	s+="<text id=\""+this.p.n+c+"PrisonersText"+"\"";
	s+=" fill=\""+c+"\"";
	s+=" x=\""+x+"\" y=\""+y+"\" dy=\""+dy+"\"";
	s+=">";
	s+=n;
	s+="</text>";
	return s;
};
mxG.S.prototype.makeBowlAndCap=function(nat,n,o)
{
	var s="";
	this.bowlW=5*this.d;
	this.capW=4*this.d;
	s+="<svg";
	s+=" xmlns=\"http://www.w3.org/2000/svg\"";
	s+=" viewBox=\"0 0 "+this.bowlW+" "+(this.bowlW+this.capW)+"\"";
	s+=" width=\""+this.bowlW+"\" height=\""+(this.bowlW+this.capW)+"\"";
	s+=" font-family=\""+this.ff+"\"";
	s+=" font-size=\""+this.capW/3+"\"";
	s+=" font-weight=\""+this.fw+"\"";
	s+=" text-anchor=\"middle\"";
	s+=">";
	s+="<title>"+this.p.local("Bowl")+"</title>";
	s+="<defs>";
	// use stop-opacity instead of transparent (better support, see ios)
	s+="<radialGradient id=\""+this.p.n+nat+"BowlIn3dRG\"";
	s+=" class=\"mx"+nat+"BowlRG\"";
	s+=" cx=\"50%\" cy=\"50%\" r=\"50%\">";
	s+="<stop stop-color=\"#000\" offset=\"0\" stop-opacity=\"0\"/>";
	s+="<stop stop-color=\"#000\" offset=\"0.7\" stop-opacity=\"0\"/>";
	s+="<stop stop-color=\"#da7\" offset=\"0.7\"/>";
	s+="<stop stop-color=\"#da7\" offset=\"0.8\"/>";
	s+="<stop stop-color=\"#853\" offset=\"0.85\"/>";
	s+="<stop stop-color=\"#964\" offset=\"1\"/>";
	s+="</radialGradient>";
	s+="<radialGradient id=\""+this.p.n+nat+"BowlIn2dRG\"";
	s+=" class=\"mx"+nat+"BowlRG\"";
	s+=" cx=\"50%\" cy=\"50%\" r=\"50%\">";
	s+="<stop stop-color=\"#000\" offset=\"0\" stop-opacity=\"0\"/>";
	s+="<stop stop-color=\"#000\" offset=\"0.7\" stop-opacity=\"0\"/>";
	s+="<stop stop-color=\"#da7\" offset=\"0.7\"/>";
	s+="<stop stop-color=\"#da7\" offset=\"0.8\"/>";
	s+="<stop stop-color=\"#964\" offset=\"0.8\"/>";
	s+="<stop stop-color=\"#964\" offset=\"1\"/>";
	s+="</radialGradient>";
	s+="<radialGradient id=\""+this.p.n+nat+"CapIn3dRG\"";
	s+=" class=\"mx"+nat+"CapRG\"";
	s+=" cx=\"50%\" cy=\"50%\" r=\"50%\">";
	s+="<stop stop-color=\"#a74\" offset=\"0\"/>";
	s+="<stop stop-color=\"#8f5430\" offset=\"0.65\"/>";
	s+="<stop stop-color=\"#741\" offset=\"0.7\"/>";
	s+="<stop stop-color=\"#741\" offset=\"0.8\"/>";
	s+="<stop stop-color=\"#852\" offset=\"0.85\"/>";
	s+="<stop stop-color=\"#964\" offset=\"1\"/>";
	s+="</radialGradient>";
	s+="<radialGradient id=\""+this.p.n+nat+"CapIn2dRG\"";
	s+=" class=\"mx"+nat+"CapRG\"";
	s+=" cx=\"50%\" cy=\"50%\" r=\"50%\">";
	s+="<stop stop-color=\"#a74\" offset=\"0\"/>";
	s+="<stop stop-color=\"#a74\" offset=\"0.7\"/>";
	s+="<stop stop-color=\"#741\" offset=\"0.7\"/>";
	s+="<stop stop-color=\"#741\" offset=\"0.8\"/>";
	s+="<stop stop-color=\"#964\" offset=\"0.8\"/>";
	s+="<stop stop-color=\"#964\" offset=\"1\"/>";
	s+="</radialGradient>";
	s+="</defs>";
	s+=this.makeBowl(nat,o);
	s+=this.makeCap(nat,n,o);
	s+="</svg>";
	return s;
};
}
// maxiGos v7 > mgos.js
if(!mxG.G)
{
mxG.fr("_",""); // empty string for alias
mxG.en("_",""); // empty string for alias
mxG.G=function(k,b)
{
	this.k=k; // current viewer indice in mxG.D
	this.n="d"+k; // id seed
	this.g="mxG.D["+k+"]"; // current viewer
	this.a={}; // attributes
	this.b=b; // boxes containing components
	this.c=[]; // components
	this.cm=0; // number of components
	this.j=document.scripts[document.scripts.length-1]; // current js script
};
mxG.G.prototype.getE=function(id){return document.getElementById(this.n+id);};
mxG.G.prototype.debug=function(s,a)
{
	var e=this.getE("DebugDiv"),g;
	if(!e)
	{
		e=document.createElement("div");
		e.id=this.n+"DebugDiv";
		g=this.getE("GlobalBoxDiv");
		if(g) g.parentNode.insertBefore(e,g.nextSibling);
		else this.j.parentNode.insertBefore(e,this.j.nextSibling);
	}
	if(a==1) s=e.innerHTML+" "+s;
	else if(a==2) s=e.innerHTML+"<br>"+s;
	e.innerHTML=s;
};
mxG.G.prototype.local=function(s)
{
	if(mxG.Z[this.lang]&&(mxG.Z[this.lang][s]!==undefined))
		return mxG.Z[this.lang][s];
	if(mxG.Z["en"][s]!==undefined)
		return mxG.Z["en"][s];
	return s;
};
mxG.G.prototype.alias=function(s,t)
{
	if(mxG.Z[this.lang]&&this[t]&&(mxG.Z[this.lang][this[t]]!==undefined))
		return mxG.Z[this.lang][this[t]];
	if(mxG.Z["en"][this[t]]!==undefined)
		return mxG.Z["en"][this[t]];
	return this.local(s);
};
mxG.G.prototype.build=function(x,a)
{
	var f="build"+x;
	if(mxG.Z[this.lang]&&mxG.Z[this.lang][f]) return mxG.Z[this.lang][f](a);
	if(this[f]) return this[f](a);
	return a+"";
};
mxG.G.prototype.hasC=function(a)
{
	var c;
	for(c=0;c<this.cm;c++) if(this.c[c]==a) return 1;
	return 0;
};
mxG.G.prototype.kidOnFocus=function(aN){return aN.Focus?aN.Kid[aN.Focus-1]:null;};
mxG.G.prototype.enableBtn=function(b)
{
	var e=this.getE(b+"Btn");
	if(e) e.disabled=false;
};
mxG.G.prototype.disableBtn=function(b)
{
	var e=this.getE(b+"Btn");
	if(e) e.disabled=true;
};
mxG.G.prototype.buildBtn=function(b)
{
	// use addEventListener later instead of onclick right now
	// since CSP can block inline script execution
	var s="";
	s+="<button class=\"mxBtn mx"+b.n+"Btn\"";
	// add title only if b.t is not null else if b.v is null
	// don't add title if b.t is null and b.v is not null (useless)
	if(b.t) s+=" title=\""+b.t+"\"";
	else if(!b.v) s+=" title=\""+this.local(b.n)+"\"";
	s+=" autocomplete=\"off\"";
	s+=" id=\""+this.n+b.n+"Btn\"";
	s+=">";
	s+="<span>";
	s+=(b.v?b.v:this.scr.makeBtnContent(""));
	s+="</span>";
	s+="</button>";
	return s;
};
mxG.G.prototype.addBtn=function(e,b)
{
	var a,k=this.k;
	a=document.createElement("button");
	a.id=this.n+b.n+"Btn";
	a.autocomplete="off";
	a.title=(b.t?b.t:this.local(b.n));
	a.innerHTML="<span>"+(b.v?b.v:this.scr.makeBtnContent(""))+"</span>";
	a.setAttribute("class","mxBtn mx"+b.n+"Btn");
	e.appendChild(a);
	a.addEventListener("click",function(){mxG.D[k]["do"+b.n]();},false);
};
mxG.G.prototype.createBtnBox=function(b)
{
	if(this[b.charAt(0).toLowerCase()+b.slice(1)+"BtnOn"])
		return "<div class=\"mx"+b+"Div\" id=\""+this.n+b+"Div\"></div>";
	return "";
};
mxG.G.prototype.unselectBtn=function(btn)
{
	var e=this.getE(btn+"Btn");
	if(e) e.classList.remove("mxSelectedBtn");
};
mxG.G.prototype.selectBtn=function(btn)
{
	var e=this.getE(btn+"Btn");
	if(e) e.classList.add("mxSelectedBtn");
};
mxG.G.prototype.createGBox=function(b)
{
	var e,g;
	this.gBoxP=this.getE("GlobalBoxDiv").querySelector(".mx"+this.gBoxParent+"Div");
	g=this.gBoxP;
	e=document.createElement('div');
	e.className="mxGBoxDiv mx"+b+"Div";
	e.id=this.n+b+"Div";
	// showGBox may give focus to gBox thus need tabindex="-1"
	e.setAttribute("tabindex","-1");
	e.style.position="absolute";
	e.style.left="0";
	e.style.top="0";
	e.style.right="0";
	e.style.bottom="0";
	e.style.display="none";
	g.style.position="relative";
	g.appendChild(e);
	return e;
};
mxG.G.prototype.hideGBox=function(b)
{
	if(b==this.gBox)
	{
		this.getE(b+"Div").style.display="none";
		this.gBox="";
		this.gBoxP.classList.remove("mxUnder");
		this.updateAll();
	}
};
mxG.G.prototype.showGBox=function(b)
{
	var e,p;
	if(b!=this.gBox)
	{
		if (this.currentMenu) this.toggleMenu(this.currentMenu,0);
		p=this.gBoxP;
		if(this.inLoop) this.inLoop=0; //otherwise form input mess
		if(this.gBox)
		{
			this.getE(this.gBox+"Div").style.display="none";
			p.classList.remove("mxUnder");
		}
		e=this.getE(b+"Div");
		e.style.display="block";
		this.gBox=b;
		p.classList.add("mxUnder");
		e.focus();
		if(this.hasC("Score")&&this.canPlaceScore) this.toggleScore();
		this.updateAll();
	}
};
mxG.G.prototype.htmlProtect=function(s)
{
	// before any output excepting in input field or textarea
	var r=s+'';
	r=r.replace(/</g,'&lt;').replace(/>/g,'&gt;');
	if(this.mayHaveExtraTags)
	{
		r=r.replace(/&lt;br\s?\/?&gt;/gi,'\n');
		r=r.replace(/&lt;p&gt;/gi,'');
		r=r.replace(/&lt;\/p&gt;/gi,'\n\n');
	}
	return r;
};
mxG.G.prototype.getInfoS=function(p)
{
	var aN=this.cN;
	if((p=="MN")||(p=="PM")||(p=="FG")){if(aN==this.rN) aN=this.kidOnFocus(aN);}
	if((p=="PM")||(p=="FG")) while((aN!=this.rN)&&!aN.P[p]) aN=aN.Dad;
	else {aN=this.rN;while(aN&&!aN.P[p]) aN=this.kidOnFocus(aN);}
	if(aN&&aN.P[p]) return this.htmlProtect(aN.P[p][0]+"");
	if(p=="SZ") return "19";
	if(p=="PM") return "1";
	if((p=="ST")||(p=="FG")) return "0";
	return "";
};
mxG.G.prototype.setSz=function()
{
	// return true if DX or DY change 
	var DX=this.DX?this.DX:0;
	var DY=this.DY?this.DY:0;
	var D=this.getInfoS("SZ").split(":");
	this.DX=parseInt(D[0]);
	this.DY=((D.length>1)?parseInt(D[1]):this.DX);
	return (DX!=this.DX)||(DY!=this.DY)
};
mxG.G.prototype.setVw=function()
{
	var aN=this.cN,x,y,s,k,km,xl,yt,xr,yb;
	if(aN==this.rN) aN=this.kidOnFocus(this.rN);
	while((aN!=this.rN)&&!aN.P.VW) aN=aN.Dad;
	xl=(this.xl?this.xl:0);
	yt=(this.yt?this.yt:0);
	xr=(this.xr?this.xr:0);
	yb=(this.yb?this.yb:0);
	if(aN.P.VW)
	{
		this.xl=this.DX;
		this.yt=this.DY;
		this.xr=1;
		this.yb=1;
		km=aN.P.VW.length;
		for(k=0;k<km;k++)
		{
			s=aN.P.VW[k];
			if(s.length==5)
			{
				this.xl=Math.min(this.xl,s.c2n(0));
				this.yt=Math.min(this.yt,s.c2n(1));
				this.xr=Math.max(this.xr,s.c2n(3));
				this.yb=Math.max(this.yb,s.c2n(4));
			}
			else if(s.length==2)
			{
				x=s.c2n(0);
				y=s.c2n(1);
				this.xl=Math.min(this.xl,x);
				this.yt=Math.min(this.yt,y);
				this.xr=Math.max(this.xl,x);
				this.yb=Math.max(this.yt,y);
			}
			else
			{
				this.xl=1;
				this.yt=1;
				this.xr=this.DX;
				this.yb=this.DY;
				break;
			}
		}
		this.xl=Math.max(1,this.xl);
		this.yt=Math.max(1,this.yt);
		this.xr=Math.min(this.DX,this.xr);
		this.yb=Math.min(this.DY,this.yb);
	}
	else
	{
		this.xl=1;
		this.yt=1;
		this.xr=this.DX;
		this.yb=this.DY;
	}
	return (xl!=this.xl)||(yt!=this.yt)||(xr!=this.xr)||(yb!=this.yb);
};
mxG.G.prototype.setPl=function()
{
	var aN=this.rN;
	this.uC="B";
	while(aN.Focus)
	{
		aN=aN.Kid[0];
		if(aN.P)
		{
			if(aN.P.PL)
			{
				this.uC=aN.P.PL;
				break;
			}
			else if(aN.P.B||aN.P.W)
			{
				if(aN.P.B) this.uC="B";
				else if(aN.P.W) this.uC="W";
				break;
			}
		}
	}
	this.oC=((this.uC=="W")?"B":"W");
};
mxG.G.prototype.placeAX=function()
{
	var v,z,k,km,s,x,y,x1,y1,x2,y2,AX=["AB","AW","AE"];
	for(z=0;z<3;z++)
	{
		km=((v=this.cN.P[AX[z]])?v.length:0);
		for(k=0;k<km;k++)
		{
			s=v[k];
			if(s.length==2)
			{
				x=s.c2n(0);
				y=s.c2n(1);
				this.gor.place(AX[z],x,y);
			}
			else if(s.length==5)
			{
				x1=s.c2n(0);
				y1=s.c2n(1);
				x2=s.c2n(3);
				y2=s.c2n(4);
				for(x=x1;x<=x2;x++) for(y=y1;y<=y2;y++) this.gor.place(AX[z],x,y);
			}
		}
	}
};
mxG.G.prototype.placeBW=function(nat)
{
	var s=this.cN.P[nat][0],x=0,y=0;
	if(s.length==2)
	{
		x=s.c2n(0);
		y=s.c2n(1);
	}
	this.gor.place(nat,x,y);
};
mxG.G.prototype.placeNode=function()
{
	if(this.kidOnFocus(this.cN))
	{
		this.cN=this.kidOnFocus(this.cN);
		if(this.cN.P.B) this.placeBW("B");
		else if(this.cN.P.W) this.placeBW("W");
		else if(this.cN.P.AB||this.cN.P.AW||this.cN.P.AE) this.placeAX();
	}
};
mxG.G.prototype.changeFocus=function(aN)
{
	var k,km,bN=aN;
	while(bN!=this.rN)
	{
		if(this.kidOnFocus(bN.Dad)!=bN)
		{
			km=bN.Dad.Kid.length;
			for(k=0;k<km;k++)
				if(bN.Dad.Kid[k]==bN)
				{
					bN.Dad.Focus=k+1;
					break;
				}
		}
		bN=bN.Dad;
	}
};
mxG.G.prototype.backNode=function(aN)
{
	this.changeFocus(aN);
	this.cN=this.rN;
	if(this.setSz()) this.hasToSetGoban=1;
	this.gor.init(this.DX,this.DY);
	while(this.cN!=aN) this.placeNode();
};
mxG.G.prototype.updateAll=function()
{
	var k,km,s;
	if(this.hasC("Variation")) this.setMode();
	this.setVw();
	this.setIndices();
	this.setNumbering();
	km=this.cm;
	for(k=0;k<km;k++)
	{
		s="update"+this.c[k];
		if(this[s]) this[s]();
	}
};
mxG.G.prototype.initAll=function()
{
	var k,km,s;
	km=this.cm;
	for(k=0;k<km;k++)
	{
		s="init"+this.c[k];
		if(this[s]) this[s]();
	}
};
// start
mxG.G.prototype.getA=function()
{
	// 1. set this.t (target tag where the viewer displays)
	// 2. get parameters values from this.t attributes
	// most of the time, this.t is this.j (this script tag itself)
	// 3. store the result in this.a, overwriting its default settings
	// 4. if not already set, try to get this.sgf from this.t tag content
	// 5. if not already set, try to get this.lang from html tags
	var i,im,j,jm,n,s,a,b,t;
	// target tag is this.a.t (as when mgosLoader.js is used) or is this script itself
	this.t=this.a.t||this.j;
	t=this.t;
	im=t.attributes.length;
	for(i=0;i<im;i++)
	{
		n=t.attributes.item(i).nodeName;
		if(n.match(/^data-maxigos-/))
		{
			a=n.replace(/^data-maxigos-/,"").split("-");
			s=a[0];
			jm=a.length;
			for(j=1;j<jm;j++) s+=a[j].ucFirst();
			b=t.getAttribute(n);
			this.a[s]=b.match(/^[0-9]+$/)?parseInt(b):b;
		}
	}
	// sgf and lang parameter are special
	this.sgf=this.a.sgf||t.innerHTML;
	this.lang=this.a.l||mxG.getLang(t); // look at this.a.l for compatibility reason
	t.innerHTML=""; // clean t content before creating sgf viewer
};
mxG.G.prototype.setA=function(a,z,t)
{
	// a: parameter name
	// z: default value
	// t: parameter type (bool, int, float, string or list)
	// to set a bool to null, set it to something which is not 0, 1, "0" or "1"
	// never set a string to null, let it undefined and set its default value to null
	if(!(a in this.a)) return z;
	if(t=="bool") return (this.a[a]+"")=="1"?1:(this.a[a]+"")=="0"?0:null;
	if(t=="int") return parseInt(this.a[a]+"");
	if(t=="float") return parseFloat(this.a[a]+"");
	if(t=="string") return this.a[a]+"";
	if(t=="list") return a?(this.a[a]+"").split(","):[];
	return null;
};
mxG.G.prototype.afterGetS=function(s,hasToShowExecutionTime)
{
	var a,sgf,k,km;
	a=(this.rN&&this.rNs)?this.rNs.indexOf(this.rN):-1;
	sgf=(this.rN&&this.rN.sgf)?this.rN.sgf:"";
	this.rN=new mxG.P(s,this.sgfLoadCoreOnly,this.sgfLoadMainOnly);
	this.rN.sgf=sgf;
	if(a<0) this.rNs=[this.rN]; // create this.rNs and add this.rN
	else this.rNs[a]=this.rN; // replace this.rN in this.rNs
	this.mayHaveExtraTags=0;
	this.setSz();
	this.hasToSetGoban=1;
	if(this.hasC("Tree")) this.hasToSetTree=1;
	this.gor=new mxG.R();
	this.gor.init(this.DX,this.DY);
	this.cN=this.rN;
	this.placeNode();
	if(this.initMethod=="last")
		while(this.kidOnFocus(this.cN)) this.placeNode();
	else if(km=parseInt(this.initMethod+""))
	{
		for(k=0;k<km;k++)
			if(this.kidOnFocus(this.cN)) this.placeNode();
	}
	this.updateAll();
	if(hasToShowExecutionTime&&mxG.ExecutionTime) mxG.ExecutionTime();
};
mxG.G.prototype.getF=function(f)
{
	fetch(f)
	.then(r=>r.arrayBuffer())
	.then(b=>
	{
		let m,c,t;
		t=(new TextDecoder("UTF-8")).decode(b);
		if(m=t.match(/CA\[([^\]]*)\]/)) c=m[1].toUpperCase();
		else c="ISO-8859-1";
		if(c!="UTF-8") return (new TextDecoder(c)).decode(b);
        return t;
    })
    .then(t=>this.afterGetS(t,1));
};
mxG.G.prototype.isSgfRecord=function(s)
{
	return s.indexOf("(")>=0;
};
mxG.G.prototype.getS=function()
{
	var s=this.sgf,f,fo,f1;
	this.mayHaveExtraTags=0;
	if(this.htmlParenthesis)
		s=s.replace(/&#40;/g,'(').replace(/&#41;/g,')');
	if(this.isSgfRecord(s)&&this.allowStringAsSource)
	{
		// s is assumed a sgf record
		// the only case when this.mayHaveExtraTags=1
		// since cms may add some <p> or <br> in sgf record
		this.mayHaveExtraTags=1;
		this.afterGetS(s,1);
		return;
	}
	if(this.allowFileAsSource)
	{
		// s is assumed a sgf file name or a URL returning a sgf record
		f=s.replace(/^\s+([^\s])/,"$1").replace(/([^\s])\s+$/,"$1");
		if(this.sourceFilter)
		{
			if(f.match(new RegExp(this.sourceFilter)))
			{
				this.getF(f);
				return;
			}
		}
		else
		{
			fo=f.split("?")[0];
			if(fo.match(/\.sgf$/))
			{
				this.getF(fo);
				return;
			}
		}
	}
	this.afterGetS("",1);
};
mxG.G.prototype.setC=function(b)
{
	// must be done before createBoxes(), otherwise this.hasC will not work properly
	var a,k,km;
	km=b.length;
	for(k=0;k<km;k++)
	{
		a=b[k];
		if(mxG.isArray(a)) this.setC(a);
		else this.c.push(a);
	}
	this.cm=this.c.length;
};
mxG.G.prototype.createBoxes=function(b)
{
	var a,f,k,km,s="";
	km=b.length;
	for(k=0;k<km;k++)
	{
		a=b[k];
		if(mxG.isArray(a))
			s+="<div>"+this.createBoxes(a)+"</div>";
		else
		{
			f="create"+a;
			if(this[f]) s+=this[f]();
		}
	}
	return s;
};
mxG.G.prototype.addParentClasses=function(p,e)
{
	var k,km,a,b,c,id,r,t;
	km=(e.children?e.children.length:0);
	if(km) for(k=0;k<km;k++)
		this.addParentClasses(p,e.children[k]);
	if(e.id)
	{
		t=e.tagName;
		t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();
		r=new RegExp(this.n+"([a-zA-Z0-9_-]+)"+t);
		b=e.id.replace(r,"$1");
	}
	else b="";
	if(b&&(this.c.indexOf(b)>=0)&&(t=="Div"))
	// keep only div tags to avoid duplicate for b (for instance GuessDiv and GuessSvg)
	{
		a=e.parentNode;
		a.classList.add("mx"+b+"ParentDiv");
		if(a==p) return;
		a=a.parentNode;
		a.classList.add("mx"+b+"GrandParentDiv");
		if(a==p) return;
		c="GrandParentDiv";
		do
		{
			c="Great"+c;
			a=a.parentNode;
			a.classList.add("mx"+b+c);
		} while(a!=p);
	}
};
mxG.G.prototype.createAll=function()
{
	var e,cls;
	this.scr=new mxG.S(this); // must be set as soon as possible
	this.setC(this.b);
	this.in3dOn=this.setA("in3dOn",0,"bool");
	this.allowStringAsSource=this.setA("allowStringAsSource",1,"bool");
	this.allowFileAsSource=this.setA("allowFileAsSource",1,"bool");
	this.gBoxParent=this.setA("gBoxParent","Goban","string");
	this.htmlParenthesis=this.setA("htmlParenthesis",0,"bool");
	this.initMethod=this.setA("initMethod","first","string");
	this.sgfLoadCoreOnly=this.setA("sgfLoadCoreOnly",0,"bool");
	this.sgfLoadMainOnly=this.setA("sgfLoadMainOnly",0,"bool");
	this.sgfSaveCoreOnly=this.setA("sgfSaveCoreOnly",0,"bool");
	this.sgfSaveMainOnly=this.setA("sgfSaveMainOnly",0,"bool");
	this.sourceFilter=this.setA("sourceFilter","^[^?]+\\.sgf$","string");
	cls="mxGlobalBoxDiv";
	cls+=(this.config?" mx"+this.config+"Config":"");
	cls+=(this.theme?" mx"+this.theme+"Theme":"");
	cls+=(this.in3dOn?" mxIn3d":" mxIn2d");
	e=document.createElement("div");
	e.id=this.n+"GlobalBoxDiv";
	e.className=cls;
	e.lang=this.lang; // to be consistent between html and maxiGos
	if(!mxG.Z[this.lang]) mxG.Z[this.lang]=[];
	e.innerHTML=this.createBoxes(this.b);
	this.addParentClasses(e,e);
	if(this.t==this.j)
		// insert global box tag in DOM just after current script tag
		this.j.parentNode.insertBefore(e,this.j.nextSibling);
	else
		// insert global box tag in DOM in target element
		this.t.appendChild(e);
	this.ig=this.getE("InnerGobanDiv"); // init this.ig as soon as possible
};
mxG.G.prototype.appendStyle=function()
{
	var e,id;
	if(this.style)
	{
		id="maxigos"+this.theme+"Style";
		if(!document.getElementById(id))
		{
			e=document.createElement("style");
			e.id=id;
			e.innerHTML=this.style;
			document.getElementsByTagName("head")[0].appendChild(e);
		}
	}
};
mxG.G.prototype.afterLoading=function()
{
	this.appendStyle();
	this.getA();
	this.createAll();
	this.initAll();
	this.getS();
};
mxG.G.prototype.start=function()
{
	var k=this.k;
	if(document.readyState=="complete")
	{
		this.afterLoading();
	}
	else
	{
		window.addEventListener("load",function()
		{
			mxG.D[k].afterLoading();
		},false);
	}
};
}
// maxiGos v7 > mgosMenu.js
if(!mxG.G.prototype.createMenu)
{
mxG.fr("File","Fichier");
mxG.fr("Edit","Édition");
mxG.fr("View","Affichage");
mxG.fr("Window","Fenêtre");
mxG.fr("Untitled","SansTitre");
mxG.G.prototype.toggleMenu=function(m,s)
{
	var t;
	if(this.toggleMenuTimeout)
	{
		clearTimeout(this.toggleMenuTimeout);
		this.toggleMenuTimeout=0;
	}
	if(s)
	{
		let z=this.k;
		t=this.menuTimeout;
		this.currentMenu=m;
		this.getE(m+"SubMenuDiv").style.display="block";
		this.toggleMenuTimeout=setTimeout(function(){mxG.D[z].toggleMenu(m,0);},t);
	}
	else
	{
		this.currentMenu="";
		this.getE(m+"SubMenuDiv").style.display="none";
	}
};
mxG.G.prototype.doMenu=function(m)
{
	var c=this.currentMenu;
	if(this.gBox) this.hideGBox(this.gBox);
	else if(this.hasC("Score")&&this.canPlaceScore) this.toggleScore();
	if(c) {this.toggleMenu(c,0);if(m==c) return;}
	this.toggleMenu(m,1);
	this.updateAll(); // to update enabled/disabled elements
};
mxG.G.prototype.doFile=function(){this.doMenu("File");};
mxG.G.prototype.doEdit=function(){this.doMenu("Edit");};
mxG.G.prototype.doView=function(){this.setViewCoche();this.doMenu("View");};
mxG.G.prototype.doSwitchWindow=function(k)
{
	this.toggleMenu("Window",0);
	this.rN.cN=this.cN;
	this.rN=this.rNs[k];
	this.backNode(this.rN.cN?this.rN.cN:this.rN.Kid[0]);
	if(this.hasC("Tree")) this.hasToSetTree=1;
	this.updateAll();
};
mxG.G.prototype.doWindow=function()
{
	var k,km,s="",b={};
	km=this.rNs.length;
	for(k=0;k<km;k++)
	{
		b.n="Win"+k;
		if(this.rNs[k].sgf) b.v=this.rNs[k].sgf.replace(/\.sgf$/,"");
		else b.v=this.local("Untitled");
		s+="<button class=\"mxBtn"+((this.rNs[k]==this.rN)?" mxCoched":" mxCochable")+"\" type=\"button\" autocomplete=\"off\" id=\""+this.n+b.n+"Btn\" onclick=\""+this.g+".doSwitchWindow("+k+");\">";
		s+="<span>"+b.v+"</span>";
		s+="</button>";
	}
	this.getE("WindowSubMenuDiv").innerHTML=s;
	this.doMenu("Window");
};
mxG.G.prototype.initMenu=function()
{
	var e,list,k,km,z=this.k,n=[];
	e=this.getE("MenuDiv");
	list=e.querySelectorAll(".mxBtn");
	km=list.length;
	for(k=0;k<km;k++)
	{
		let n=list[k].id.replace(/^[^0-9]+[0-9]+(.*)Btn/,"$1");
		list[k].addEventListener("click",function(){mxG.D[z]["do"+n]();},false);
	}
};
mxG.G.prototype.createMenu=function()
{
	var s="",a,m,k,km;
	this.menus=this.setA("menus","","string");
	this.menuTimeout=this.setA("menuTimeout",10000,"int");
	if(!this.menus) return s;
	a=this.menus.split(/[\s]*[,][\s]*/);
	km=a.length;
	s+="<div class=\"mxMenuDiv\" id=\""+this.n+"MenuDiv\">";
	for(k=0;k<km;k++)
	{
		m=a[k];
		s+="<div class=\"mxOneMenuDiv\" id=\""+this.n+m+"MenuDiv\">";
		s+=this.buildBtn({n:m,v:this.local(m)});
		s+="<div class=\"mxSubMenuDiv\" id=\""+this.n+m+"SubMenuDiv\">";
		if(this["build"+m+"Btns"]) s+=this["build"+m+"Btns"]();
		s+="</div></div>";
	}
	s+="</div>";
	return s;
};
}
// maxiGos v7 > mgosFile.js
if(!mxG.G.prototype.createFile)
{
mxG.fr("New","Nouveau");
mxG.fr("Open","Ouvrir");
mxG.fr("Close","Fermer");
mxG.fr("Save","Enregistrer");
mxG.fr("Save on your device","Enregistrer sur votre machine");
mxG.fr("Send","Envoyer");
mxG.fr("Send by email","Envoyer par email");
mxG.fr("Goban size","Taille du goban");
mxG.fr("Email:","Email :");
mxG.fr("Create","Créer");
mxG.fr("Add","Ajouter");
mxG.fr("OK","OK");
mxG.fr("Cancel","Annuler");
mxG.fr("Values between 5 and 19:","Valeurs entre 5 et 19 :");
mxG.fr("Values between 1 and 52:","Valeurs entre 1 et 52 :");
mxG.fr("Click here to open a sgf file","Cliquer ici pour ouvrir un fichier sgf");
mxG.fr("File name:","Nom du fichier :");
mxG.fr("Your browser cannot do this!","Votre navigateur ne peut pas faire ça !");
mxG.fr("Error","Erreur");
mxG.fr("Untitled","SansTitre");
mxG.fr("This is not a sgf file!","Ce n'est pas un fichier sgf !");
mxG.G.prototype.cleanUpSZ=function(s)
{
	var a,r;
	s=s.replace(/\s/g,"");
	a=s.match(/^([0-9]+)([x:]([0-9]+))?$/);
	if(a)
	{
		r=Math.min(this.szMax,Math.max(this.szMin,a[1]-0))+"";
		if(a[3]) r+=":"+Math.min(52,Math.max(1,a[3]-0));
	}
	else r="19";
	// return a string like n or m:n where m and n are numbers between 1 and 52
	return r;
};
mxG.G.prototype.doNewOK=function(a)
{
	var aST=this.getInfoS("ST"),
		aSZ=this.getE("DimensionInput").value,
		aN;
	if(a=="create")
	{
		if(this.getE("WindowMenuDiv"))
		{
			this.rN.cN=this.cN;
			this.rNs.push(this.rN=new mxG.N(null,null,null));
		}
		else // no need to keep previous tree
		{
			this.rN.Kid=[];
			this.rN.Focus=0;
		}
		this.rN.sgf="";
	}
	aN=new mxG.N(this.rN,"FF","4");
	aN.P["CA"]=["UTF-8"];
	aN.P["GM"]=["1"];
	aN.P["SZ"]=[this.cleanUpSZ(aSZ)];
	aN.P["AP"]=["maxiGos:"+mxG.V];
	if(parseInt(aST)) aN.P["ST"]=[aST];
	this.backNode(aN);
	if(this.hasC("Tree")) this.hasToSetTree=1;
	this.hideGBox("New");
};
mxG.G.prototype.doNew=function()
{
	var s,a;
	if(this.hasC("Menu")) this.toggleMenu("File",0);
	if(this.gBox=="New") {this.hideGBox("New");return;}
	if(!this.getE("NewDiv"))
	{
		a=" tabindex=\"0\"";
		s="<div class=\"mxShowContentDiv\""+a+">";
		s+="<h1>"+this.local("Goban size")+"</h1>";
		s+="<div class=\"mxP\">";
		s+="<label for=\""+this.n+"DimensionInput\">"+this.local("Values between "+this.szMin+" and "+this.szMax+":")+"</label>";
		s+=" <input id=\""+this.n+"DimensionInput\" name=\""+this.n+"DimensionInput\" type=\"text\" value=\""+this.DX+"x"+this.DY+"\" size=\"5\">";
		s+="</div>";
		s+="</div>";
		s+="<div class=\"mxOKDiv\">";
		s+="<button type=\"button\" onclick=\""+this.g+".doNewOK('create')\"><span>"+this.local("Create")+"</span></button>";
		s+="<button type=\"button\" onclick=\""+this.g+".doNewOK('add')\"><span>"+this.local("Add")+"</span></button>";
		s+="<button type=\"button\" onclick=\""+this.g+".hideGBox('New')\"><span>"+this.local("Cancel")+"</span></button>";
		s+="</div>";
		this.createGBox("New").innerHTML=s;
	}
	else this.getE("DimensionInput").value=this.DX+"x"+this.DY;
	this.showGBox("New");
};
mxG.G.prototype.doOpenOK=function()
{
	var a,r,e=this.getE("SgfFileInputAlertDiv");
	r=new FileReader();
	r.gos=this;
	r.f=this.getE("SgfFile").files[0];
	if(e)
	{
		if((r.f.name?r.f.name:r.f.fileName).match(/\.sgf$/)) e.innerHTML="";
		else {e.innerHTML=this.local("This is not a sgf file!");return;}
	}
	r.onload=function(evt)
	{
		var s,m,c;
		s=evt.target.result;
		if(!this.c)
		{
			if(m=s.match(/CA\[([^\]]*)\]/)) c=m[1].toUpperCase();else c="ISO-8859-1";
			if(c!="UTF-8")
			{
				// retry with charset found in sgf
				this.c=c;
				this.readAsText(this.f,c);
				return;
			}
		}
		this.gos.mayHaveExtraTags=0;
		if(this.gos.getE("WindowMenuDiv")) this.gos.rN.cN=this.gos.cN;
		this.gos.rN=new mxG.P(s,this.sgfLoadCoreOnly,this.sgfLoadMainOnly);
		if(this.gos.getE("WindowMenuDiv")) this.gos.rNs.push(this.gos.rN);
		this.gos.backNode(this.gos.kidOnFocus(this.gos.rN));
		if(this.gos.hasC("Tree")) this.gos.hasToSetTree=1;
		this.gos.rN.sgf=(this.f.name?this.f.name:this.f.fileName);
		this.gos.hideGBox("Open");
	};
	r.readAsText(r.f);
};
mxG.G.prototype.doOpen=function()
{
	var s,a;
	if(this.hasC("Menu")) this.toggleMenu("File",0);
	if(this.gBox=="Open") {this.hideGBox("Open");return;}
	if(!this.getE("OpenDiv")) this.createGBox("Open");
	a=" tabindex=\"0\"";
	s="<div class=\"mxShowContentDiv\""+a+">";
	s+="<h1>"+this.local("Open")+"</h1>";
	if(mxG.canOpen())
	{
		s+="<div class=\"mxP\">";
		s+="<div id=\""+this.n+"SgfFileInputAlertDiv\" class=\"mxErrorDiv\"></div>";
		s+="<button type=\"button\" id=\""+this.n+"SgfFileInput\" onclick=\""+"document.getElementById('"+this.n+"SgfFile"+"').click();\"><span>"+this.local("Click here to open a sgf file")+"</span></button>";
		s+="</div>";
		s+="</div>";
		s+="<div class=\"mxOKDiv\">";
		s+="<input type=\"file\" id=\""+this.n+"SgfFile\" onchange=\""+this.g+".doOpenOK()\">";
		s+="<button type=\"button\" onclick=\""+this.g+".hideGBox('Open')\"><span>"+this.local("Close")+"</span></button>";
		s+="</div>";
	}
	else
	{
		s+="<div class=\"mxP\">";
		s+=this.local("Your browser cannot do this!");
		s+="</div>";
		s+="</div>";
		s+="<div class=\"mxOKDiv\">";
		s+="<button type=\"button\" onclick=\""+this.g+".hideGBox('Open')\"><span>"+this.local("Close")+"</span></button>";
		s+="</div>";
	}
	this.getE("OpenDiv").innerHTML=s; // replace content anyway to fire again the input file onchange event
	this.showGBox("Open");
};
mxG.G.prototype.doClose=function()
{
	var k,km,n=0;
	km=this.rNs.length;
	if(this.hasC("Menu")) this.toggleMenu("File",0);
	if(km<2)
	{
		this.mayHaveExtraTags=0;
		this.rN=new mxG.P("",0,0);
		this.rN.sgf="";
		this.rNs=[this.rN];
		this.backNode(this.kidOnFocus(this.rN));
	}
	else
	{
		k=this.rNs.indexOf(this.rN);
		if(k>=0) this.rNs.splice(k,1);
		this.rN=this.rNs[0];
		this.backNode(this.rN.cN);
	}
	if(this.hasC("Tree")) this.hasToSetTree=1;
	this.updateAll();
};
mxG.G.prototype.doSaveOK=function()
{
	var f=this.getE("SaveFileName").value;
	if(f)
	{
		if(!f.match(/\.sgf$/)) f+=".sgf";
		this.rN.sgf=f;
		this.getE("SaveFileName").value=f;
		this.downloadSgf(f);
		this.getE("SaveForm").submit(); // just for autocompletion
	}
	this.hideGBox("Save");
};
mxG.G.prototype.doSave=function()
{
	var e,s,a,k,km,i,m,f;
	if(this.hasC("Menu")) this.toggleMenu("File",0);
	if(!this.canDownloadSgf()) {this.popupSgf();return;}
	if(this.gBox=="Save") {this.hideGBox("Save");return;}
	if(!this.getE("SaveDiv"))
	{
		a=" tabindex=\"0\"";
		// use a form to store input values for autocompletion usage
		s="<form class=\"mxShowContentForm\" id=\""+this.n+"SaveForm\" action=\"javascript:void(0)\" method=\"post\">";
		s+="<div class=\"mxShowContentDiv\""+a+">";
		s+="<h1>"+this.local("Save on your device")+"</h1>";
		s+="<div class=\"mxP\"><label for=\""+this.n+"SaveFileName\">"+this.local("File name:")+" </label>";
		s+="<input id=\""+this.n+"SaveFileName\" name=\"FileName\" type=\"text\" value=\"\" size=\"32\">";
		s+="</div>";
		s+="</div>";
		s+="<div class=\"mxOKDiv\">";
		s+="<button type=\"button\" onclick=\""+this.g+".doSaveOK()\"><span>"+this.local("OK")+"</span></button>";
		s+="<button type=\"button\" onclick=\""+this.g+".hideGBox('Save')\"><span>"+this.local("Cancel")+"</span></button>";
		s+="</div>";
		s+="</form>";
		this.createGBox("Save").innerHTML=s;
	}
	f=this.rN.sgf?this.rN.sgf:(this.local("Untitled")+".sgf");
	this.getE("SaveFileName").value=f;
	this.showGBox("Save");
};
mxG.G.prototype.doSendOK=function()
{
	var m='mailto:'+this.getE("SendEmail").value+'?subject=maxiGos&body='+encodeURIComponent(this.buildSgf());
	window.location.href=m;	this.hideGBox("Send");
	this.getE("SendForm").submit(); // just for autocompletion
};
mxG.G.prototype.doSend=function()
{
	var s,a;
	if(this.hasC("Menu")) this.toggleMenu("File",0);
	if(this.gBox=="Send") {this.hideGBox("Send");return;}
	if(!this.getE("SendDiv"))
	{
		a=" tabindex=\"0\"";
		// use a form to store input values for autocompletion usage
		s="<form class=\"mxShowContentForm\" id=\""+this.n+"SendForm\" action=\"javascript:void(0)\" method=\"post\">";
		s+="<div class=\"mxShowContentDiv\""+a+">";
		s+="<h1>"+this.local("Send by email")+"</h1>";
		s+="<div class=\"mxP\"><label for=\""+this.n+"Email\">"+this.local("Email:")+" </label>";
		s+="<input id=\""+this.n+"SendEmail\" name=\""+this.n+"SendEmail\" type=\"text\" value=\"\" size=\"40\"></div>";
		s+="</div>";
		s+="<div class=\"mxOKDiv\">";
		s+="<button type=\"button\" onclick=\""+this.g+".doSendOK()\"><span>"+this.local("OK")+"</span></button>";
		s+="<button type=\"button\" onclick=\""+this.g+".hideGBox('Send')\"><span>"+this.local("Cancel")+"</span></button>";
		s+="</div>";
		s+="</form>";
		this.createGBox("Send").innerHTML=s;
	}
	this.showGBox("Send");
};
mxG.G.prototype.buildFileBtns=function()
{
	var s="";
	s+=this.buildBtn({n:"New",v:this.local("New")});
	s+=this.buildBtn({n:"Open",v:this.local("Open")});
	s+=this.buildBtn({n:"Close",v:this.local("Close")});
	s+=this.buildBtn({n:"Save",v:this.local("Save")});
	s+=this.buildBtn({n:"Send",v:this.local("Send")});
	return s;
};
mxG.G.prototype.createFile=function()
{
	var z=this.k;
	if(!this.szMin) this.szMin=1;
	if(!this.szMax) this.szMax=52;
	window.addEventListener("unload",function(ev)
		{
			if(mxG.D[z].sgfPopup&&!mxG.D[z].sgfPopup.closed)
				mxG.D[z].sgfPopup.close();
		},false);
	return "";
};
}
// maxiGos v7 > mgosView.js
if(!mxG.G.prototype.createView)
{
mxG.fr("2d/3d","2d/3d");
mxG.fr("Colors","Couleurs");
mxG.fr("Stone shadow","Ombre des pierres");
mxG.fr("Stretching","Étirement");
mxG.fr("Zoom+","Agrandir");
mxG.fr("No zoom","Normal");
mxG.fr("Zoom-","Réduire");
mxG.fr("Goban background color:","Couleur de fond du goban :");
mxG.fr("Goban background image:","Image de fond du goban :");
mxG.fr("Line color:","Couleur des lignes :");
mxG.G.prototype.setColors=function()
{
	var g,e,list,s,k,km,svg,im,bk,c;
	g=this.getE("GobanDiv");
	if(!g) return;
	svg=g.querySelector("svg");
	im=g.querySelector("svg>image");
	if(im)
	{
		svg.removeChild(im);
	}
	if(this.gbki)
	{
		if(this.gbki!="none")
		{
			// if one creates the image using document.createElementNS
			// get error: 414 (Request-URI Too Long)
			// so discard this method at the moment
			im='';
  			im+='<image';
			im+=' x="0" y="0" width="'+this.scr.w+'" height="'+this.scr.h+'"';
			im+=' preserveAspectRatio="none"';
			im+=' href="'+this.gbki+'"';
			im+='/>';
			svg.innerHTML=svg.innerHTML.replace(/(<rect[^>]+Outer)/,im+"$1");
		}
	}
	bk=g.querySelector(".mxWholeRect");
	c=this.gbkc?((this.gbkc=="transparent")?"none":this.gbkc):"none";
	if(bk) bk.setAttributeNS(null,"fill",c);
	if(this.glc)
	{
		s=".mxGrid";
		s+=",circle.mxMark.mxOnEmpty";
		s+=",rect.mxMark.mxOnEmpty";
		s+=",path.mxMark.mxOnEmpty";
		s+=",polygon.mxMark.mxOnEmpty";
		s+=",rect.mxVariation.mxOnEmpty.mxOnFocus";
		if(this.scr.sw4text)
		{
			s+=",.mxIndices";
			s+=",text.mxLabel.mxOnEmpty";
			s+=",text.mxVariation.mxOnEmpty";
		}
		if(!this.in3dOn) s+=",.mxBlackStones,.mxWhiteStones";
		list=g.querySelectorAll(s);
		km=list.length;
		for(k=0;k<km;k++)
			list[k].setAttributeNS(null,"stroke",this.glc);
		s=".mxIndices";
		s+=",.mxStars";
		s+=",text.mxLabel.mxOnEmpty";
		s+=",text.mxVariation.mxOnEmpty";
		list=g.querySelectorAll(s);
		km=list.length;
		for(k=0;k<km;k++)
			list[k].setAttributeNS(null,"fill",this.glc);
	}
};
mxG.G.prototype.setInputColors=function()
{
	var e,c,list,k,km,bkk;
	if(this.gbki&&(this.gbki!="none"))
	{
		c="";
		bkk=Object.keys(this.bk);
		km=bkk.length;
		for(k=0;k<km;k++) if(this.bk[bkk[k]]==this.gbki) break;
		if(k<km)
		{
			e=document.querySelector("[name="+this.n+"GobanBkRadio][value="+bkk[k]+"]");
			e.checked=true;
		}
		else
		{
			e=document.querySelector("[name="+this.n+"GobanBkRadio][value=none]");
			e.checked=true;
		}
	}
	else
	{
		c=this.gbkc;
		e=document.querySelector("[name="+this.n+"GobanBkRadio][value=none]");
		e.checked=true;
	}
	this.getE("GobanBkTextInput").value=c;
	this.getE("LineColorTextInput").value=this.glc;
};
mxG.G.prototype.doTextInputGobanBk=function()
{
	e=document.querySelector("[name="+this.n+"GobanBkRadio][value=none]");
	e.checked=true;
};
mxG.G.prototype.buildColors=function()
{
	var s="";
	s+="<div class=\"mxP\">";
	s+="<label class=\"mxGobanBkTextInput\" for=\""+this.n+"GobanBkTextInput\">"+this.local("Goban background color:");
	s+="<input type=\"text\" oninput=\""+this.g+".doTextInputGobanBk()\" id=\""+this.n+"GobanBkTextInput\">";
	s+="</label>";
	s+="</div>";
	s+="<div class=\"mxP\">";
	s+="<div>";
	s+=this.local("Goban background image:");
	s+="</div>";
	s+="<label class=\"mxGobanBkRadio\">";
	s+="<input name=\""+this.n+"GobanBkRadio\" checked value=\"none\" type=\"radio\">";
	s+=" "+this.local("None")+"</label>";
	s+="<label class=\"mxGobanBkRadio\">";
	s+="<input name=\""+this.n+"GobanBkRadio\" value=\"Bamboo\" type=\"radio\">";
	s+=" "+this.local("Bamboo")+"</label>";
	s+="<label class=\"mxGobanBkRadio\">";
	s+="<input name=\""+this.n+"GobanBkRadio\" value=\"Beech\" type=\"radio\">";
	s+=" "+this.local("Beech")+"</label>";
	s+="<label class=\"mxGobanBkRadio\">";
	s+="<input name=\""+this.n+"GobanBkRadio\" value=\"Cherry\" type=\"radio\">";
	s+=" "+this.local("Cherry")+"</label>";
	s+="<label class=\"mxGobanBkRadio\">";
	s+="<input name=\""+this.n+"GobanBkRadio\" value=\"Kaya\" type=\"radio\">";
	s+=" "+this.local("Kaya")+"</label>";
	s+="<label class=\"mxGobanBkRadio\">";
	s+="<input name=\""+this.n+"GobanBkRadio\" value=\"Pine\" type=\"radio\">";
	s+=" "+this.local("Pine")+"</label>";
	s+="<label class=\"mxGobanBkRadio\">";
	s+="<input name=\""+this.n+"GobanBkRadio\" value=\"Rosewood\" type=\"radio\">";
	s+=" "+this.local("Rosewood")+"</label>";
	s+="<label class=\"mxGobanBkRadio\">";
	s+="<input name=\""+this.n+"GobanBkRadio\" value=\"Troyes\" type=\"radio\">";
	s+=" "+this.local("Troyes")+"</label>";
	s+="</div>";
	s+="<div class=\"mxP\">";
	s+="<label class=\"mxLineTextInput\">"+this.local("Line color:");
	s+="<input type=\"text\" id=\""+this.n+"LineColorTextInput\">";
	s+="</label>";
	s+="</div>";
	return s;
};
mxG.G.prototype.doColorsOK=function()
{
	var e,c;
	e=document.querySelector("[name="+this.n+"GobanBkRadio]:checked");
	if(!e||(e.value=="none")) c="none";
	else c=this.bk[e.value];
	this.gbki=c;
	this.gbkc=this.getE("GobanBkTextInput").value;
	this.glc=this.getE("LineColorTextInput").value;
	window.localStorage.setItem("gbki",this.gbki);
	window.localStorage.setItem("gbkc",this.gbkc);
	window.localStorage.setItem("glc",this.glc);
	window.localStorage.getItem("glc");
	this.hideGBox("ShowColors");
};
mxG.G.prototype.doColors=function()
{
	if(this.hasC("Menu")) this.toggleMenu("View",0);
	if(this.gBox=="ShowColors") {this.hideGBox("ShowColors");return;}
	if(!this.getE("ShowColorsDiv"))
	{
		s="<div class=\"mxShowContentDiv\" tabindex=\"0\">";
		s+="<h1>"+this.local("Colors")+"</h1>";
		s+=this.buildColors();
		s+="</div>";
		s+="<div class=\"mxOKDiv\">";
		s+="<button type=\"button\" onclick=\""+this.g+".doColorsOK()\"><span>"+this.local("OK")+"</span></button>";
		s+="<button type=\"button\" onclick=\""+this.g+".hideGBox('ShowColors')\"><span>"+this.local("Cancel")+"</span></button>";
		s+="</div>";
		this.createGBox("ShowColors").innerHTML=s;
	}
	this.setInputColors();
	this.showGBox("ShowColors");
};
mxG.G.prototype.doZoom=function(s)
{
	if(this.hasC("Menu")) this.toggleMenu("View",0);
	if(s=="+") this.gmw=this.gmw*1.1;
	else if(s=="-") this.gmw=this.gmw/1.1;
	else this.gmw=this.gmw0;
	window.localStorage.setItem("gmw",this.gmw+"");
	this.updateAll();
};
mxG.G.prototype.doZoomPlus=function(){this.doZoom("+");};
mxG.G.prototype.doNoZoom=function(){this.doZoom("=");};
mxG.G.prototype.doZoomMinus=function(){this.doZoom("-");};
mxG.G.prototype.doIn3d=function()
{
	var a,b,e=this.getE("GlobalBoxDiv");
	if(this.hasC("Menu")) this.toggleMenu("View",0);
	this.in3dOn=this.in3dOn?0:1;
	a=this.in3dOn?"mxIn2d":"mxIn3d";
	b=this.in3dOn?"mxIn3d":"mxIn2d";
	e.className=e.className.replace(a,b);
	this.hasToSetGoban=1;
	if(this.hasC("Tree")) this.hasToSetTree=1;
	if(this.hasC("Edit")) this.hasToSetEditTools=1;
	window.localStorage.setItem("in3dOn",this.in3dOn+"");
	this.updateAll();
};
mxG.G.prototype.doStretching=function()
{
	if(this.hasC("Menu")) this.toggleMenu("View",0);
	if(this.stretching=="0,0,1,1") this.stretching="0,1,1,2";
	else this.stretching="0,0,1,1";
	this.hasToSetGoban=1;
	if(this.hasC("Tree")) this.hasToSetTree=1;
	if(this.hasC("Edit")) this.hasToSetEditTools=1;
	window.localStorage.setItem("stretching",this.stretching);
	this.updateAll();
};
mxG.G.prototype.doStoneShadow=function()
{
	if(this.hasC("Menu")) this.toggleMenu("View",0);
	this.stoneShadowOn=this.stoneShadowOn?0:1;
	this.hasToSetGoban=1;
	if(this.hasC("Tree")) this.hasToSetTree=1;
	if(this.hasC("Edit")) this.hasToSetEditTools=1;
	window.localStorage.setItem("stoneShadowOn",this.stoneShadowOn+"");
	this.updateAll();
};
mxG.G.prototype.setViewItemCoche=function(b,v)
{
	let e=this.getE(b+"Btn");
	e.classList.add(v?"mxCoched":"mxCochable");
	e.classList.remove(v?"mxCochable":"mxCoched");
}
mxG.G.prototype.setViewCoche=function()
{
	this.setViewItemCoche("In3d",this.in3dOn);
	this.setViewItemCoche("Stretching",this.stretching=="0,0,1,1"?0:1);
	this.setViewItemCoche("StoneShadow",this.stoneShadowOn);
	this.setViewItemCoche("Colors",0);
	this.setViewItemCoche("ZoomPlus",this.gmw>this.gmw0?1:0);
	this.setViewItemCoche("NoZoom",this.gmw==this.gmw0?1:0);
	this.setViewItemCoche("ZoomMinus",this.gmw<this.gmw0?1:0);
};
mxG.G.prototype.buildViewBtns=function()
{
	// used in Menu component
	var s="";
	s+=this.buildBtn({n:"In3d",v:this.local("2d/3d")});
	s+=this.buildBtn({n:"Stretching",v:this.local("Stretching")});
	s+=this.buildBtn({n:"StoneShadow",v:this.local("Stone shadow")});
	s+=this.buildBtn({n:"Colors",v:this.local("Colors")});
	s+=this.buildBtn({n:"ZoomPlus",v:this.local("Zoom+")});
	s+=this.buildBtn({n:"NoZoom",v:this.local("No zoom")});
	s+=this.buildBtn({n:"ZoomMinus",v:this.local("Zoom-")});
	return s;
};
mxG.G.prototype.updateAfterView=function()
{
	// must be executed after all updates
	// so call it updateAfterView and add AfterView as a component
	this.setColors();
	this.getE("GlobalBoxDiv").style.setProperty('--gobanMaxWidth',this.gmw+"em");
};
mxG.G.prototype.initView=function()
{
	var e=this.getE("GlobalBoxDiv"),dir,v;
	dir="../_img/bk/";
	this.bk={};
	this.bk["Bamboo"]="data:image/jpeg;base64,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";
	this.bk["Beech"]="data:image/jpeg;base64,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";
	this.bk["Cherry"]="data:image/jpeg;base64,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";
	this.bk["Kaya"]="data:image/jpeg;base64,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";
	this.bk["Pine"]="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gNzAK/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8IAEQgAKAGQAwERAAIRAQMRAf/EABkAAAMBAQEAAAAAAAAAAAAAAAECAwQAB//EABgBAAMBAQAAAAAAAAAAAAAAAAABAgMG/9oADAMBAAIQAxAAAAH2fiuklNgChSnvM071OSHWp0aSJcoqKq1KabMdyoEaA5LMmijSp8HMVDupQVtCRFQRSpAyhql6kDx43s1WPK6Eib4GcxitOmfTUZalO0gUqC617Z5c6ItOkTlwm0hvRwFhpSlmxZHFwBlUkQaJyyxmRHURGJCgAQZoubUgnlit2sYMNnImrZMtRh6qzSnlys03EotGscVaojDtStcSmpqoyVoWWaYpFpxTkYZamirSSBtmcgtok9NBpm6ILkDZoivU8PDjWzWcOelHMovpZsz5PXtFEpTSjZpGVcGq2a55M6YWjSJzUJqcOlHAWGiSDQsji4AFRIjqElljNxCqRbEhkDCJmFza0JeWHu1nBhq5M1bI5ks3qvPrU5sByFKpefU73OTN1qdGkiXKKiqtSmmzHcqgtqBE9KclAUODmIijqUFLXSIqCKUggsZy9SB48b2arHldSUmyk1EYem8//8QAJxAAAQIEBgIDAQEAAAAAAAAAAQIDACExMwQRIiMyNEFCEBJDJBP/2gAIAQEAAQUCF83kw1eHYf5YoaUDQ3UWT8ItK4vHdfk4u8aQDvC375yB0R4zhJ0rmnyeCjHhd1XZV2D2U2kcRH6GbCBpZTumWIxPLEWjyIk7CTv55vw32FHfekvFURNKBqA21V9kDaXGIq+M4cm6Tpj9U2ydUJOgfHgUJg19TCYNz6/0VxJ7IG2kZAVy3DZTJLc3ldh69iZoNxR0vGSbybgqjtOX8RGI4N8EXUWlQeSeLkYir2f3Vn/ueCY908RXyOIqmnr4Vx8+i6JqqD2B2D2vzEeTVdsUZuDsPdjFUVcXactpG/lk/DfYUN9+a8TRAyCDqB21V9kHacjEVfOULOTp4x+qbZGowkaBAjwKEQa+phMG59v6KYk9kHbQcwK57hspmluTyuw9exPA3FDS8JJvm8mGrw7D/LFHShWhuotH4RaVxdG5iJuOXjSAN4W/cCQGj4yhI0rknKZ4KEeF3VSxKh/Qeym0jjH6GTCDpZVumeIxPLEWjU0dj//EAB8RAAICAgIDAQAAAAAAAAAAAAABMUECECBCMkBRMP/aAAgBAwEBPwGitODqKDEvjZ9EYij0aKKOo5HuxjgowMZFuhRpwUIxnn9EIUaf70UUVp8GOCjGDHaKK0/EXiYmIyh8EIRWn6FFFaeltwUKDEUF6oUacFCMOVn0QhRp+hRRWnwY/EoxgxnaKK04OojEvjelBiKPS6lHUcj4McFGBjIt/wD/xAAnEQACAAYDAAEDBQAAAAAAAAAAAQIQMTJBQgMRIVESICMiMDNDcf/aAAgBAgEBPwHY2EQ3s7f1kdTloJeEORWjkqDwRXIjqRXSRsKn7DlhDk7kO8d5uYFSWR+wCXhBcO85W+zltHWUWDcrFJL8jHejkqcohVZqOSoRYOTByYH7Ej/JdfqKIzLE8ClU6pJGUzc3NzDFLI7REN47yO5HKu0dekVOyPAriG5nwL+UdyIzkoKgrhWjkiLByEdUbmJeiFL5FLBgdJejEPB/Ybm5iWZO2UFzFeRXnLRdEVxHaRUNykZ8Cf5GO9EdTkEKrNRyVCLByHJgfkSn36VRmSFLApUO/FJM2SNzc3MMUsjtEQ3jvI7kcr6R36RU6I8GxsIhvZ0/rI6nLQT8IXUVo5Kg8EVyI6kV09hUM/chywhydyNx3m5gVJZH5AJ+EFw7zlT7Ry2j67lFg//EAB8QAAICAwADAQEAAAAAAAAAAAACARADcYERIVFBYf/aAAgBAQAGPwLlIPS1BkF3UDmIQQQYk4dJrpNNbaMcf0kYQgj3TkaptHSBqQgXQn6IcJEGFFqBxd1AxjFkUQnx9JOHSam2ttGMkYSTzbi1OqgalF2RoSRCR9GMkQj7SjHagcxiiEfDpJwjY1PbXOhSRtGMi2F1TC7IGJ8kCbF0dFqRBhRKgcXdQNsxCiik+CTh0mptrbRjJGEg8W4tTqoGpRdkaEgQ5Sj0s1BkFtzEJ6FEHJOHSa6TTW2jHP8ASRhCCPVORTaOkDUpAuhPwQ//xAAiEAACAQQCAwEBAQAAAAAAAAAAAREhMUFhUXEQgZGhscH/2gAIAQEAAT8hewLxwKpleRDmk6Klb8ONOhYYd2ReT+h/oTCCrFbDyh0mFMNakwKnZdKy1BRGnkVgT/AnRXBZ0gb4htLSHS5gkfYVqxCLCQ03KIejwJfJWvbGFcpFYwwk+h88gFe1osEJ9CAMDcPC7+KzVEhO9XkaN6In/wBK3ss9j+iIjJNIWEXI1IU3ZTHAsZSZP1E6GSZ9zFWqpgUxxF5JJsw6RuJKlmS98QJtpEz1jtik9EmsS+ape+xnErXKoOBVbqciUk4RKPRFCXngs7HU4QSF2yw8DyCpdIehhDQv0PPHaRLWTqVHZP1k689jEsS9JDJsjbFR9zK4IeolASlH6D1pLRmc+C9EyWf4Lo2yL58HhX/RXdmRYnDglGB++R2dEZ29eCsMXPQnwEphbRP0eHk4OPnxFMT8PhvyGZyf4RDLEEqQka3EmW2SL1KFFGhKxcietEy/6ULllvsiehE5AtZDSg3AV0fAeU5bJ3NnccCtLwZZJESV3m0k0pYte0S5QtlzngRpIj5itCk9kk/gV4qmPdiUSorFMjAqtlOBOScqhKPRINh4Gp0Oh5DyumWHgWAULtC1MMSHBY4LSbmMoexAfngZT3GNG1xQozJIzJ0jSg+dl9CJgX6eJNfVuJDsImgrgpUiRU6Kp3XoKM2yKwR+BKipgs6SNNANHysLMywgfYRwmw0J2Cs8CXyLD9sSOsV1sVzCDSj55I0f0oRyob6ENwbLcLK7n//aAAwDAQACAAMAAAAQk7eO5hW1kjrTL8cYXTiJbw6DkHxfcGPjxT0HESL/AKbToj0OmoY84/BCPWb07RhCgbPLGw513+lsNNb4Ejp8Upl3kq3u4lKjFb3rM4D0jO41tZMxh2+fnF2sCW5nutv/xAAcEQEBAAMBAQEBAAAAAAAAAAABABEhMRBRQXH/2gAIAQMBAT8QxCJkcQ0kIOrrJLFzgkxZjbY0iDTcMr3xNYnKzlsSeYsSRrdjljbY8HqKXHVwshl1HCEItyUxAYbahw32DOZ8r+jcCLw32kw2eS9iNX6Ruct+4YgffGdTtxIQbnvmSHMlgsmS/WJP0g2Jbym7nKXV+Q6xZy5hltDi+oTRWON9Lpn75OMMzxzYYeGW/HbNxzHYm/VxcMfUeP54+nZi/sdv2exMcfDN8xjJdTyw1HWe3znNzvbdI6zfrN4zna3CLw2jvku7HJI1G78QTlbt8B+yGxqdMpCZnsFiNMtk+WnF+sdl+Q6WbilxjF1PINZsYcS3bDHlTZEbG+rLbZhFwNwlCLSF1iTiTGGdwOY02ciP2W1wwnPFwZnJqclmzZsw7ljdnZZ22fAyJ4Gs4XUmo0EGWG4IYiMI2lWm+w9v/8QAIREBAQEBAQACAgMBAQAAAAAAAQARITFBURBxYYGxkaH/2gAIAQIBAT8QH4+zkxpr92YAz8T0EByx52GNThsjy7N1t5jzS5EDE/NwRn9rEMGVBjcttb4YeXR253ZzD7lfDdgy5lwbPJrvJvqHvbxBdD/NwQBXEEAsY2xj9SGEg6hh1yw4kfp9XoIcMOb+p6G/iBxn3ere3qMsAXtWlUYPRZ8Zdagf7Jdj5Dmoe9lVt1XiXO2KS8L9ydhx2SgPcd7toZScI9vky+P3LAhqWA3ooB7Iz34hgDIxXpa7/UfXy3v6v915Mtfvbxe1r1929nbw/i9FuO/8Xwj29P1azG9Ox7H2vUecn1kePxfccGfh6tZidxke/wAPnkekbO65eV8ct9L028/7t/vWsfq+n7vOCHQtOCN/oviT5J85HAjBwZ93qzvL3WHEXsLQhlBcHIebfHa8ZI+Q5DuSY2dXiTS6lv8AZL1uDvkuQHzfzkafFBwj2+RD/wBw0JYhkE4aIZGf1LQCPBHznPFhRz7swJv4jgckGm3FomDgsrpY/EXW3mHdI6NsYL7jpZ1/H4BGIox5Fl8Ow5LDW+5xT6hl8NnSTBDhz8M7yLjYO3yS6D+bgkLhsUhYxtwfqfB8gLq//8QAIxABAAIDAQACAwEAAwAAAAAAAQARITFBUWFxgZGhsRDB8P/aAAgBAQABPxAr0zlLllvm4AkIVPsIqG3OYj3I4XBm8pQ9hNfUN/5LSFqFD2DXvZoZ2oQCcwQoh05DKGxlC/uJBnKYmQZgxiFW9GJqCuG9zbqUQOQuVCFIMKir3EpVtI+bgN2U1cdlwNMWgvELRvNsXFU/pFGW/mgMdVcQdpsX9w6Cmg+SpUhCz5l4AEBGuswWwOxYWCV+R7MaomsQ6LlqHIOjZTlUV1NQlLoUjJvgXCtrLsyrIlub3LJU0iJoC13+oAbbjT7CLdlQd6iAPySFYzjDVyuOzLCvXNIy7OXBQIlkom6WmCDLYM1qWuBsDjyK2ysMzKqlOsexVBZCmGzKNk1alTJWy+f3CgsBEqZmQlR1dQ2tRcK9v4jA9BGUpZAvGCLzMkNgbasR3U6XGsugSs7noKYlV6A1uMxwlbVlDNRzTkNXHCqxBGwau5+oq/FU3A2FA3DEQbutE7MeaNPqIM8BIsCVoJR6csH2rjjy3+4FDVP1FC1ZLhoFqIoIotFWGrohz74xnPQ2bg2FWMwFjI/wl4kp8O4KS0DifZ6Twy19d1E/tb3Me1XnU+IX/wCE2NDvctTeJ9zoN+porq9zyq0ufdT8/iY3m6Z+tz6Kl/yfQ2b1KMPpxOzW/wAon+ilr3XOpTlX6Q6WrzxCcvpPS8Vq7mCbxbr6nwL/AKuct4LryfxZo8rL6n7PpL97fyWKK7VKYr/zOf8Ac6W63r2bq3Wf+JMdlrnhH6mWwVetSnxbVKYLvT6l0bXpfsI4d1tufuxU4bWedW9T+uVvfJftwVe4SdvOuTGEvGdIt9wUAAhRN4bYQCNhi5fE5QY8jOAmUBVQpyZmIAQvAUGNxse8rf4mbiAsd7LIjKQJhdSRy6QKS41NqlQ4Ft6stuCBecMCrjJ+ErBRw1CO9C4iALyVXJ0wp/MuCkLNXqBR0zMbryCrjkpybj4nCHELospP1Kr4LddRqoKOpxAFOGgcmH4ls9mROFqIoQTJBQG+3EKjxYq8NYg3jNMtJpWoNAfGosEU+o6ygNk33w17GM8CqNwWCwG9weNf4RwxS963BAGK5gXRz4iCy3xUY6Aqx5CWtUvcZNDC4sdYIPkyPiL9y4qi7XHIyo1W+wU11vuVadZIJvg5XyWlRhL/AGFtzuVZ0PpAs3L7lAbdvxNcBQs7C4WU0X8w7LTdctW2V83LLKooYLxu4gh0Qdercjm59Ip4ysa0lfmAUhhLmRdg+CodoSj5i0UbsMuNsw15FiqCS0q4a1U7Iu96g+SpxAZgqaKOeTG5hFDgQjFTdi5ibvwsuzNPfJZiZxPkwOw6ljtlGviNe7G96iqeGiZg8z//2Q==";
	this.bk["Rosewood"]="data:image/jpeg;base64,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";
	this.bk["Troyes"]="data:image/jpeg;base64,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";
	// assume minimalist theme (no goban elements set in css)
	// assume goban background is transparent
	// assume lines, star points, marks ... have the same color and are black
	if(v=window.localStorage.getItem("in3dOn")) this.in3dOn=parseInt(v);
	if(v=window.localStorage.getItem("gbki")) this.gbki=v; else this.gbki="none";
	if(v=window.localStorage.getItem("gbkc")) this.gbkc=v; else this.gbkc="transparent";
	if(v=window.localStorage.getItem("glc")) this.glc=v; else this.glc="#000";
	if(v=window.localStorage.getItem("stretching")) this.stretching=v;
	if(v=window.localStorage.getItem("stoneShadowOn")) this.stoneShadowOn=parseInt(v);
	this.gmw0=parseFloat(getComputedStyle(e).getPropertyValue('--gobanMaxWidth'));
	if(v=window.localStorage.getItem("gmw")) this.gmw=parseFloat(v);
	else this.gmw=this.gmw0;
};
mxG.G.prototype.createView=function()
{
	return "";
};
}
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
// maxiGos v7 > mgosVariation.js
if(!mxG.G.prototype.createVariation)
{
mxG.fr("Variations: ","Variations : ");
mxG.fr("no variation","aucune");
mxG.G.prototype.setMode=function()
{
	this.styleMode=parseInt(this.getInfoS("ST"));
	if(this.configVariationMarksOn===null) this.variationMarksOn=(this.styleMode&2)?0:1;
	else
	{
		if(this.variationMarksOn) this.styleMode&=~2;
		else this.styleMode|=2;
	}
	if(this.configSiblingsOn===null) this.siblingsOn=(this.styleMode&1)?1:0;
	else
	{
		if(this.siblingsOn) this.styleMode|=1;
		else this.styleMode&=~1;
	}
	if(this.hideSingleVariationMarkOn) this.styleMode|=4;
};
mxG.G.prototype.doClickVariationInBox=function(a)
{
	var aN=this.styleMode&1?this.cN.Dad:this.cN;
	if(this.styleMode&1) this.backNode(aN);
	aN.Focus=a+1;
	this.placeNode();
	this.updateAll();
};
mxG.G.prototype.addVariationMarkInBox=function(a,m)
{
	var i=document.createElement("input"),k=this.k;
	if(this.scr.isLabel(m)) m=this.scr.removeLabelDelimiters(m);
	m=m.replace(/&#40;/g,'(').replace(/&#41;/g,')');
	i.type="button";
	i.value=m;
	i.addEventListener("click",function(ev){mxG.D[k].doClickVariationInBox(a);},false);
	this.getE("VariationDiv").appendChild(i);
};
mxG.G.prototype.buildVariationMark=function(l)
{
	if(this.variationMarkSeed) return this.variationMarkSeed[l-1];
	return l+"";
};
mxG.G.prototype.addVariationMarks=function()
{
	var aN,s,k,km,l=0,x,y,z,m,e=this.getE("VariationDiv");
	var s1="<span class=\"mxVariationsSpan\">"+this.local("Variations: ")+"</span>";
	var s2="<span class=\"mxNoVariationSpan\">"+this.local("no variation")+"</span>";
	if(this.variationBoxOn) e.innerHTML=s1;
	if(this.styleMode&1)
	{
		if(!this.cN||!this.cN.Dad) 
		{
			if(this.variationBoxOn) e.innerHTML=s1+s2;
			return;
		}
		aN=this.cN.Dad;
	}
	else
	{
		if(!this.cN||!this.kidOnFocus(this.cN))
		{
			if(this.variationBoxOn) e.innerHTML=s1+s2;
			return;
		}
		aN=this.cN;
	}
	km=aN.Kid.length;
	if((this.styleMode&4)&&(km==1))
	{
		if(this.variationBoxOn) e.innerHTML=s1;
		return;
	}
	for(k=0;k<km;k++)
		if(aN.Kid[k]!=this.cN)
		{
			s="";
			l++;
			if(aN.Kid[k].P.B) s=aN.Kid[k].P.B[0];
			else if(aN.Kid[k].P.W) s=aN.Kid[k].P.W[0];
			if(s.length==2)
			{
				x=s.c2n(0);
				y=s.c2n(1);
				z=this.xy(x,y);
				if(this.inView(x,y))
					m=this.vStr[z];
				else
					m=this.buildVariationMark(l);
				if((m+"").search(/^\((.*)\)$/)==-1)
				{
					if(!m) m=this.buildVariationMark(l);
					if(!(this.styleMode&2)&&(!(this.styleMode&1)||(aN.Kid[k]!=this.cN)))
					{
						this.vStr[z]="("+m+")";
						if(this.isNextMove(x,y)) this.vStr[z]="("+this.vStr[z]+")";
					}
				}
				if((m+"").search(/^_.*_$/)==0)
					m=this.buildVariationMark(l);
			}
			else m=this.buildVariationMark(l);
			if(this.variationBoxOn&&(aN.Kid[k]!=this.cN)) this.addVariationMarkInBox(k,m);
		}
};
mxG.G.prototype.getVariationNextNat=function()
{
	var aN,k,km;
	if(this.hasC("Edit")&&this.editNextNat) return this.editNextNat;
	// get color from PL
	aN=this.cN;
	if(aN.P.PL) return aN.P.PL[0];
	// get color of this.kidOnFocus(this.cN)
	aN=this.kidOnFocus(this.cN);
	if(aN)
	{
		if(aN.P.B) return "B";
		if(aN.P.W) return "W";
	}
	// get opposite color of cN
	aN=this.cN;
	if(aN.P.B) return "W";
	if(aN.P.W) return "B";
	// get opposite color if cN has AB and no AW (handicap game?) or AW and no AB, 
	if(aN.P.AB&&!aN.P.AW) return "W";
	else if(aN.P.AW&&!aN.P.AB) return "B";
	// get color of cN children
	km=this.cN.Kid.length;
	for(k=0;k<km;k++)
	{
		aN=this.cN.Kid[k];
		if(aN.P.B) return "B";
		if(aN.P.W) return "W";
	}
	// get opposite color of cN brothers
	km=this.cN.Dad.Kid.length;
	for(k=0;k<km;k++)
	{
		aN=this.cN.Dad.Kid[k];
		if(aN.P.B) return "W";
		if(aN.P.W) return "B";
	}
	// unable to decide who will play
	return "B";
};
mxG.G.prototype.addPlay=function(aP,x,y)
{
	var aN,aV=this.xy2s(x,y);
	aN=new mxG.N(this.cN,aP,aV);
	aN.Add=1;
	this.cN.Focus=this.cN.Kid.length;
};
mxG.G.prototype.checkBW=function(aN,a,b)
{
	var s="",x,y;
	if(aN.P.B||aN.P.W)
	{
		if(aN.P.B) s=aN.P.B[0];else s=aN.P.W[0];
		if(s.length==2) {x=s.c2n(0);y=s.c2n(1);}
		else {x=0;y=0;}
		return (x==a)&&(y==b);
	}
	return 0;
};
mxG.G.prototype.checkAX=function(aN,a,b)
{
	var AX=["AB","AW","AE"];
	var s,x,y,aP,z,k,aLen,x1,x2,y1,y2;
	s="";
	if(aN.P.AB) aP="AB";
	else if(aN.P.AW) aP="AW";
	else if(aN.P.AE) aP="AE";
	else aP=0;
	if(aP) for(z=0;z<3;z++)
	{
		aP=AX[z];
		if(aN.P[aP])
		{
			aLen=aN.P[aP].length;
			for(k=0;k<aLen;k++)
			{
				s=aN.P[aP][k];
				if(s.length==2)
				{
					x=s.c2n(0);
					y=s.c2n(1);
					if((x==a)&&(y==b)) return 1;
				}
				else if(s.length==5)
				{
					x1=s.c2n(0);
					y1=s.c2n(1);
					x2=s.c2n(3);
					y2=s.c2n(4);
					for(x=x1;x<=x2;x++) for(y=y1;y<=y2;y++) if((x==a)&&(y==b)) return 1;
				}
			}
		}
	}
	return 0;
};
mxG.G.prototype.checkVariation=function(a,b)
{
	var aN,bN,k,km,ok=0;
	if((this.styleMode&1)&&(this.cN.Dad==this.rN)) {this.plonk();return;}
	if(a&&b&&this.gor.isOccupied(a,b))
	{
		aN=this.cN.Dad;
		while(!ok&&(aN!=this.rN))
		{
			if(this.checkBW(aN,a,b)||this.checkAX(aN,a,b)) ok=1;
			else aN=aN.Dad;
		}
		if(ok)
		{
			this.backNode(aN);
			this.updateAll();
		}
		return;
	}
	aN=this.styleMode&1?this.cN.Dad:this.cN;
	km=aN.Kid.length;
	for(k=0;k<km;k++)
	{
		bN=aN.Kid[k];
		if(this.checkBW(bN,a,b))
		{
			if(this.styleMode&1) this.backNode(aN);
			aN.Focus=k+1;
			this.placeNode();
			this.updateAll();
			return;
		}
	}
	// (a,b) not in the sgf
	// don't add anything if(this.styleMode&1) since it leads to a mess
	if(this.styleMode&1) {this.plonk();return;}
	this.addPlay(this.getVariationNextNat(),a,b);
	this.placeNode();
	if(this.hasC("Tree")) this.hasToSetTree=1;
	this.updateAll();
};
mxG.G.prototype.doClickVariation=function(ev)
{
	var c;
	if(this.isGobanDisabled()) return;
	if(this.canPlaceVariation)
	{
		c=this.scr.getC(ev);
		if(!this.inView(c.x,c.y)) {this.plonk();return;}
		this.checkVariation(c.x,c.y);
	}
};
mxG.G.prototype.doKeydownGobanForVariation=function(ev)
{
	var c;
	if(this.isGobanDisabled()) return;
	if(this.canPlaceVariation&&this.gobanFocusVisible)
	{
		c=mxG.getKCode(ev);
		if((c==13)||(c==32))
		{
			this.checkVariation(this.xFocus,this.yFocus);
			ev.preventDefault();
		}
		else if(c==187)
		{
			this.checkVariation(0,0);
			ev.preventDefault();
		}
	}
};
mxG.G.prototype.initVariation=function()
{
	var k=this.k;
	this.ig.getMClick=mxG.getMClick;
	this.ig.addEventListener("click",function(ev){mxG.D[k].doClickVariation(ev);},false);
	if(this.canGobanFocus)
		this.ig.addEventListener("keydown",
			function(ev){mxG.D[k].doKeydownGobanForVariation(ev);},false);
};
mxG.G.prototype.createVariation=function()
{
	var s="";
	// if both canPlaceGuess and canPlaceVariation are 1, canPlaceGuess is ignored
	this.canPlaceVariation=this.setA("canPlaceVariation",0,"bool");
	if(this.canPlaceGuess&&this.canPlaceVariation) this.canPlaceGuess=0;
	this.hideSingleVariationMarkOn=this.setA("hideSingleVariationMarkOn",0,"bool");
	this.siblingsOn=this.setA("siblingsOn",null,"bool");
	this.variationBoxOn=this.setA("variationBoxOn",0,"bool");
	this.variationMarkSeed=this.setA("variationMarkSeed",null,"list");
	this.variationMarksOn=this.setA("variationMarksOn",null,"bool");
	if(this.hasC("Edit"))
	{
		this.configVariationMarksOn=null;
		this.configSiblingsOn=null;
	}
	else
	{
		this.configVariationMarksOn=this.variationMarksOn;
		this.configSiblingsOn=this.siblingsOn;
	}
	if(this.variationBoxOn)
		s+="<div class=\"mxVariationDiv\" id=\""+this.n+"VariationDiv\"></div>";
	return s;
};
}
// maxiGos v7 > mgosHelp.js
if(!mxG.G.prototype.createHelp)
{
mxG.fr(" Close ","Fermer");
mxG.fr("Help","Aide");
mxG.fr("Help_Short","?");
mxG.fr("Help_Data","<h1>Aide</h1> <h2>Principe général</h2> <p> Cet éditeur est composé d\'une barre de menus, d\'un goban, d\'une barre de navigation, d\'une barre d\'outils, d\'une boite de saisie et d\'un arbre. Cliquez sur le goban pour y placer des pierres, des marques ou des étiquettes. Utilisez le menu pour afficher un nouveau goban, ouvrir un fichier sgf, l\'enregistrer, ou l\'envoyer par email. Utilisez la barre de navigation sous le goban pour parcourir l\'arbre des coups. Utilisez la barre d\'outils pour changer d\'action. Utilisez la boite de saisie pour commenter la position affichée sur le goban. Cliquez sur un noeud de l\'arbre pour afficher la position correspondante à ce noeud. </p> <h2>Les menus</h2> <h3>Le menu \"Fichier\"</h3> <p> \"Nouveau\" : affiche un nouveau goban de n\'importe quelle taille pas forcément carré. On peut soit remplacer l\'affichage précédent par ce nouveau goban, soit l\'ajouter afin de pouvoir enregistrer plusieurs parties dans un même fichier (cependant il faut savoir que si tel est le cas, beaucoup de lecteurs ne pourront pas lire ces parties). </p> <p> \"Ouvrir\" : ouvre un fichier sgf stocké sur votre machine (ce n\'est pas toujours possible car cela dépend des machines : certains téléphones en particulier ne vous permettront pas cette possibilité). </p> <p> \"Fermer\" : ferme le fichier sgf en cours. </p> <p> \"Enregistrer\" : enregistre votre saisie sous forme de fichier sgf sur votre machine (ce n\'est pas toujours possible car cela dépend des machines : certains téléphones en particulier ne vous permettront pas cette possibilité). </p> <p> \"Envoyer\" : envoie par email votre saisie sous forme de fichier sgf (utile pour les machines ne permettant pas d\'y enregistrer un fichier). </p> <h3>Le menu \"Édition\"</h3> <p> \"Couper\" : coupe une variation. Voir aussi le paragraphe \"Couper une variante\" ci-dessous pour plus de détails. </p> <p> \"Copier\" : copie une variation. Voir aussi le paragraphe \"Copier une variante\" ci-dessous pour plus de détails. </p> <p> \"Coller\" : colle une variation. Voir aussi le paragraphe \"Coller une variante\" ci-dessous pour plus de détails. <p> \"Supprimer les commentaires\" : permet de supprimer tous les commentaires du sgf. </p> </p> <h3>Le menu \"Affichage\"</h3> <p> \"2d/3d\" : affiche le lecteur en 2d ou en 3d. </p> <p> \"Étirement\" : rend le goban légèrement rectangulaire. </p> <p> \"Ombre des pierres\" : ajoute une ombre aux pierres (uniquement si l'affichage est en 3d). </p> <p> \"Agrandir\" : agrandit la taille du goban. </p> <p> \"Normal\" : ramène le goban à sa taille initiale. </p> <p> \"Réduire\" : réduit la taille du goban. </p> <p> \"Couleurs\" : permet de changer la couleur du fond du goban et de ses lignes. </p> <p>Pour le fond du goban, on peut choisir n\'importe quelle couleur css ou une image. <h3>Le menu \"Fenêtre\"</h3> <p>Permet de changer le fichier sgf en cours d\'édition lorsque plusieurs fichiers sont ouverts.</p> <h2>La barre de navigation</h2> <p> Ses boutons permettent de se déplacer dans l\'arbre des coups. </p> <p> Pour passer, il suffit de cliquer sur le bouton \"Passe\". </p> <p>Il est aussi possible de naviguer en utilisant le clavier. La barre de navigation ou un de ses éléments doit avoir le focus pour que cette fonctionalité soit activée : cliquez sur la barre de navigation ou l\'un de ses éléments, ou bien utilisez la touche \"Tabulation\" pour donner ce focus.</p> <ul> <li>Touche \"Flèche gauche\": recule d\'un coup</li> <li>Touche \"Flèche droite\" : place un coup</li> <li>Touche \"Page précédente\" : recule de 10 coups (s\'arrête si un coup ayant des variations est rencontré)</li> <li>Touche \"Page suivante\" : place 10 coups (s\'arrête si un coup ayant des variations est rencontré)</li> <li>Touche \"Début\" : recule au premier coup</li> <li>Touche \"Fin\" : place tous les coups</li> <li>Touche \"Flèche vers le haut\" : change la variation du prochain coup (en cas de style de variation dit \"enfants\") ou la variation du coup courant (en cas de style de variation dit \"jumeaux\")</li> <li>Touche \"Flèche vers le bas\" : change la variation du prochain coup (en cas de style de variation dit \"enfants\") ou la variation du coup courant (en cas de style de variation dit \"jumeaux\")</li> </ul> <p>Notez qu\'en utilisant les touches ci-dessus et les touches \"Tabulation\", \"Majuscule + Tabulation\", et \"Retour\", il est possible d\'exécuter toutes les commandes de maxiGos y compris placer une pierre sur le goban.</p> <h2>Autres boutons</h2> <p> Les boutons \"PNG\" et \"SVG\" permettent de fabriquer et afficher une image (format PNG et SVG) représentant la position affichée sur le goban. Cette image peut par exemple être utlisée comme illustration dans vos pages web. </p> <p> Le bouton \"Sgf\" permet d\'afficher ce qui a été saisi au format sgf. On peut aussi modifier le sgf directement dans la fenêtre qui s\'affiche, ou y copier un autre sgf. </p> <p> Le bouton \"Score\" permet d\'ajouter ou retirer les propriétés indiquant le score (propriétés sgf TB et TW). </p> <h2>Vue partielle du goban</h2> <p> Pour afficher une vue partielle du goban, cliquez sur l\'outil \"Sélection\" (un carré en pointillé dans la barre d\'outils), sélectionnez une partie du goban avec la souris ou son équivalent sur votre machine, en cliquant sur le coin supérieur gauche puis sur le coin inférieur droit de ce que vous voulez sélectionner (ne pas maintenir le bouton de la souris enfoncé entre les deux clicks). Ensuite, cliquez sur l\'outil \"Vue partielle/totale\" (un petit carré à l\'intérieur d\'un grand carré dans la barre d\'outils) pour réduire le goban à la partie que vous avez sélectionnée. </p> <p> Pour désélectionner la sélection sans réduire le goban, cliquez sur l\'outil \"Sélection\" lorsque celui-ci est déjà sélectionné. </p> <p> Pour réafficher en entier le goban, cliquez sur l\'outil \"Vue partielle/totale\" lorsqu\'aucune sélection n\'est effectuée. </p> <h2>Placer un coup et ajouter/retirer une pierre</h2> <p> On a deux outils permettant d\'ajouter ou retirer une pierre sur le goban : l\'outil \"Placer un coup\" et l\'outil \"Ajouter/retirer une pierre\". L\'outil \"Placer un coup\" permet de placer une succession de coups éventuellement numérotés, tandis que l\'outil \"Ajouter/retirer une pierre\" permet de construire une position (ceci sert par exemple à placer des pierres de handicap ou construire la position initiale d\'un problème). </p> <h3>L\'outil \"Placer un coup\"</h3> <p> Lorsque l\'outil \"Placer un coup\" (une pierre noire ou blanche dans la barre d\'outils) est sélectionné, on peut placer des coups sur le goban. Si des pierres se retrouvent sans liberté, elles sont capturées automatiquement. </p> <p> L\'éditeur essaie en permanence de déterminer la couleur du prochain coup qui sera placé. Il affiche alors une pierre noire ou une pierre blanche sur cet outil suivant le résultat de cette détermination. </p> <p> Il est possible de changer la couleur du prochain coup qui sera posé en cliquant sur l\'outil \"Placer un coup\" lorque celui-ci est déjà sélectionné (il est donc possible d\'afficher deux coups de suite de la même couleur). </p> <h3>L\'outil \"Ajouter/retirer une pierre\"</h3> <p> Lorsque l\'outil \"Ajouter/retirer une pierre\" (une pierre moitié noire et moitié blanche dans la barre d\'outils) est sélectionné, on peut ajouter ou retirer des pierres sur le goban. Aucune capture n\'est effectuée. Si on clique sur une intersection inoccupée, on y ajoute une noire ou une blanche (si l\'image sur l\'outil a une demi-pierre noire à gauche, on ajoute une pierre noire, et si elle a une demi-pierre blanche à gauche, on ajoute une pierre blanche). Enfin, si on clique sur une intersection occupée, on retire la pierre qui s\'y trouve. </p> <p> L\'utilisation de cet outil sur une position obtenue après avoir placé une série de coups a pour effet de réinitialiser la numérotation des coups. Les numéros des coups déjà placés sont retirés et le premier coup placé à partir de cette position aura le numéro 1. </p> <p> Il est possible de changer la couleur de la prochaine pierre qui sera posée en cliquant sur l\'outil \"Ajouter/retirer une pierre\" lorque celui-ci est déjà sélectionné. </p> <h2>Couper une variation</h2> <p> Pour couper une variation, afficher le premier coup de la variation sur le goban (en naviguant dans l\'arbre des coups via la barre de navigation, ou en cliquant sur la pierre correspondant au coup dans l\'arbre des coups lui-même), puis cliquez sur l\'outil \"Couper une branche\" (une paire de ciseaux dans la barre d\'outils). </p> <h2>Copier une variation</h2> <p> Pour copier une variation, afficher le premier coup de la variation sur le goban (en naviguant dans l\'arbre des coups via la barre de navigation, ou en cliquant sur la pierre correspondant au coup dans l\'arbre des coups lui-même), puis cliquez sur l\'outil \"Copier une branche\" (deux feuilles se superposant dans la barre d\'outils). </p> <h2>Coller une variation</h2> <p> Pour coller une variation précédemment coupée ou copiée, afficher le dernier coup précédant la variation sur le goban (en naviguant dans l\'arbre des coups via la barre de navigation, ou en cliquant sur la pierre correspondant au coup dans l\'arbre des coups lui-même), puis cliquez sur l\'outil \"Coller une branche\" (une feuille venant en superposition sur un support dans la barre d\'outils). </p> <p class=\"important\">MaxiGos ne fait aucune vérification de cohérence de ce qui sera collé.</p> <p>Cette fonction peut être utile quand on s\'aperçoit a posteriori qu\'on a oublié de placer un échange de coups. Il convient alors d\'aller au coup suivant l\'échange, couper la branche, placer les coups manquants, et coller la branche précédemment coupée.</p> <p>Cette fonction peut aussi être utile quand on s\'aperçoit a posteriori qu\'on a placé un échange de coups en trop. Il convient alors d\'aller au coup suivant l\'échange, copier la branche, revenir au coup précédent l\'échange, coller la branche précédemment copiée, revenir sur le premier coup de l\'échange à supprimer et couper la branche.</p> <h2>Marques et étiquettes</h2> <p> Pour ajouter ou retirer une marque ou étiquette, sélectionnez l\'un des outils \"Etiquette\" (une lettre dans la barre d\'outils), \"Marque\" (une croix dans la barre d\'outils), \"Triangle\" (une triangle dans la barre d\'outils), \"Cercle\" (un cercle dans la barre d\'outils) ou \"Carré\" (un carré dans la barre d\'outils), puis cliquez sur l\'intersection où vous souhaitez l\'ajouter ou la retirer. Il est possible de changer le texte de la prochaine étiquette qui sera placée en cliquant sur l\'outil \"Etiquette\", et en entrant au clavier les caractères souhaités. L\'étiquette peut être constituée de plusieurs caractères, mais en pratique, il est préférable de se limiter à des étiquettes de un à trois caractères. </p> <h2>Autres outils</h2> <h3>L\'outil \"Numérotation\"</h3> <p> L\'outil \"Numérotation\" (la pierre numérotée dans la barre d\'outils) permet d\'afficher ou cacher la numérotation des pierres placées à l\'aide de l\'outil \"Placer un coup\". </p> <p> On peut ne modifier la numérotation qu\'à partir de la position courante si on le souhaite. Bien qu\'en théorie, on puisse le faire à n\'importe quel coup, il est conseillé de ne le faire qu\'en début de variation. </p> <p> On peut aussi via cet outil afficher ou non les indices, et afficher ou non les pierres capturées comme dans les livres. </p> <h3>L\'outil \"Entête\"</h3> <p> L\'outil \"Entête\" (\"E\" dans la barre d\'outils), permet d\'afficher un formulaire de saisie des propriétés d\'entête des fichiers sgf (évènement, ronde, nom de noir, niveau de noir, nom de blanc, niveau de blanc, ...). </p> <p> Pour quitter le formulaire et réafficher le goban en prenant en compte vos éventuelles modifications, cliquez sur le bouton \"OK\" en bas du formulaire. </p> <p> Pour quitter le formulaire et réafficher le goban sans prendre en compte vos éventuelles modifications, cliquez sur \"E\" dans la barre d\'outils, ou sur le bouton \"Annuler\" en bas du formulaire. </p> <h3>L\'outil \"Comme dans les livres\"</h3> <p> L\'outil \"Comme dans les livres\" (\"L\" dans la barre d\'outils) permet de changer le mode d\'affichage des pierres capturées. Soit on affiche le goban tel qu\'il serait en partie réelle, soit on affiche le goban en laissant les pierres capturées par des coups numérotés comme dans les livres. Pour passer de l\'un à l\'autre mode, il suffit de cliquer sur l\'outil. </p> <p>Note : quand aucune pierre numérotée n\'est visible, cet outil est sans effet.</p> <h3>L\'outil \"Indices\"</h3> <p> L\'outil \"Indices\" (\"I\" dans la barre d\'outils) permet d\'afficher ou cacher des indices autour du goban. En cas de découpe du goban, les indices ne sont affichés que sur les bords visibles. En cas de sélection d\'une partie du goban contenant des bords avec des indices, ceux-ci sont ajoutés automatiquement à la sélection. </p> <h3>L\'outil \"Marque sur les variations\"</h3> <p> L\'outil \"Marque sur les variations\" (\"V\" dans la barre d\'outils) permet d\'afficher ou cacher les marques sur les variations. Ces marques sont là uniquement pour vous aider à visualiser la liste des variations possibles à partir d\'une position donnée. Il ne faut pas y faire référence dans le commentaire car elles peuvent ne pas être affichables ou avoir des libellés différents d\'un logiciel à l\'autre. Lorsque vous avez besoin de faire référence à une intersection dans le commentaire, placez plutôt sur le goban des marques et étiquettes à l\'aide de l\'un des outils \"Etiquette\", \"Marque\", \"Triangle\", \"Cercle\" ou \"Carré\", ou éventuellement utilisez les indices sur le pourtour du goban. Lorsqu\'une intersection a à la fois une marque de variation et une marque ou étiquette placée à l\'aide de l\'un des outils\"Etiquette\", \"Marque\", \"Triangle\", \"Cercle\" ou \"Carré\", c\'est cette dernière qui est affichée. </p> <h3>L\'outil \"Style\"</h3> <p> L\'outil \"Style\" (\"S\" dans la barre d\'outils) permet de changer le style d\'affichage des variations. Soit on affiche les alternatives au coup courant, soit on affiche les alternatives au coup suivant. Pour voir les marques sur les variations, n\'oubliez pas d\'activer aussi le mode \"Marque sur les variations\". </p> <h3>Les outils d\'annotation</h3> <p> Ils permettent d\'ajouter des annotations diverses au coup courant (propriétés sgf GB, GW, DM, UC, TE, BM, DO et IT). </p> <h3>L\'outil \"Trait\"</h3> <p> L\'outil \"Trait\" (\"T\" dans la barre d\'outils) permet d\'indiquer qui a le trait au coup suivant (propriété sgf PL). On l'utilisera en particulier quand le sgf représente la position initiale d'un problème, et qu\'aucun coup suivant n\'est spécifié. </p> <h3>Les outils de tranformation</h3> <p> Ils permettent d\'effectuer une rotation, une symétrie verticale ou une symétrie horizontale du goban. </p> <h2>L\'arbre des coups</h2> <p> Il permet de visualiser l\'ensemble des coups (en cliquant sur une pierre de l\'arbre, le coup correspondant est affiché sur le goban). </p> <h2>Quitter cette aide</h2> <p> Pour quitter cette aide et réafficher le goban, cliquez le bouton \"Aide\" ou sur le bouton \"Fermer\" en bas de ce texte. </p>");
mxG.en("Help_Short","?");
mxG.en("Help_Data","<h1>Help</h1> <h2>Overview</h2> <p> With this tool, you can edit a go game or diagram using the sgf file format. </p> <h2>Menus</h2> <h3>\"File\" menu</h3> <p>Use it to create, open, save or send by email a sgf file.</p> <p> \"New\" button: display a goban of any size (not necessarily a square). You can replace the current data or add new data to them. </p> <p> \"Open\": open a sgf file stored on your device (not always possible with some devices). </p> <p> \"Close\": close the current sgf file. </p> <p> \"Save\": save what you edit in a sgf file on your device (not always possible with some devices). </p> <p> \"Send\": send by email what you edit (useful if you cannot save what you edit on your device). </p> <h3>\"Edit\" menu</h3> <p>\"Cut\", \"Copy\" or \"Paste\" a branch of a game tree (see also \"Cut a branch\", \"Copy a branch\" and \"Paste a branch\" below.</p> <p>\"Remove comments\" remove all the comments from the sgf record.</p> <h3>\"View\" menu</h3> <p>Change view (2d/3d effect, stretching, stone shadow, zoom, colors).</p> <p>For the goban background, on can set any css color or an image. <h3>\"Window\" menu</h3> <p>Change the current sgf file.</p> <h2>Navigation bar</h2> <p> Click on the buttons of the Navigation bar to navigate in the game tree. </p> <p> Click on \"Pass\" button to pass. </p> <p>It is also possible to navigate using the keyboard. The focus has to be on the Navigation bar or one of its elements in order to activate this feature: click on an element of the Navigation bar or use the tab key to give the focus to the navigation bar.</p> <ul> <li>Left arrow key: back one move</li> <li>Right arrow key: place one move</li> <li>Page down key: back ten moves of the current variation or go to the previous move that has a variation</li> <li>Page up key: place ten moves of the current variation or go to the next move that has a variation</li> <li>Home key: back to first move</li> <li>End key: place all moves</li> <li>Top arrow key: change next move variation (if children variation style) or current move variation (if siblings variation style)</li> <li>Bottom arrow key: change next move variation (if children variation style) or current move variation (if siblings variation style)</li> </ul> <p>Note that using above keys, tab key, shift + tab key, and return key, it is possible to execute all maxiGos commands including placement of a stone on the go board.</p> <h2>Other buttons</h2> <p> \"PNG\" anf \"SVG\" buttons: to display a png or svg image of the current position. </p> <p> \"Sgf\" button: to display and edit the sgf. </p> <p> \"Score\" button: to add or remove sgf territory properties (sgf properties TB and TW). </p> <h2>Partial view of the goban</h2> <p> To display a part of the goban only, click on \"Selection\" tool (a dashed square in the tool bar), select it with the mouse (ot its equivalent) by clicking on its top left and bottom right corners. (don\'t keep mouse button down between the two clicks). Then click on \"Partial/full view\" tool (a small sqaure inside a bigger one in the tool bar) to finish the job. </p> <p> To unselect the selection, click on \"Selection\" tool again. </p> <p> To display the full goban again, on \"Partial/full view\" tool when no part of the goban is selected. </p> <h2>Place a move or add/remove a stone</h2> <p> There are two tools that allow to add/remove stones on the goban: \"Place a move\" and \"Add/remove a stone\" tools.</p> </p> <h3>\"Place a move\" tool</h3> <p> \"Place a move\" tool (a black stone or white stone in the tool bar) allows to place a serie of moves possibly numbered. </p> If some stones are without liberty, they are removed automatically from the goban. </p> <p> The editor tries to guess what will be the color of the next move, and changes the color of the stone displayed in the tool accordingly. </p> <p> It is possible to change the color of the next move just by clicking on \"Place a move\" tool (thus it is possible to place two moves of the same color in succession). </p> <h3>\"Add/remove a stone\" tool</h3> <p> \"Add/remove a stone\" tool (a half white/half black stone) allows to add or remove a stone from the goban to setup a position (for instance to place handicap stones or setup the initial position of a problem). </p> <p>The color of the next stone will be the color of the left half of the tool. If one clicks on an occupied intersection, the stone is removed.</p> <p> It is possible to change the color of the next stone just by clicking on \"Add/remove a stone\" tool. </p> <p> Warning: the numerotation restarts to 0 when such a stone is added. </p> <h2>Cut/copy/paste a branch</h2> <p> One can cut/copy/paste a branch of the tree when one of the \"Cut a branch\", \"Copy a branch\" or \"Paste a branch\" is selected. </p> <h2>Marks and labels</h2> <p> Click on one of the \"Label\" (a letter in the tool bar), \"Mark\" (a cross in the tool bar), \"Triangle\" (a triangle in the tool bar), \"Cercle\" (a circle in the tool bar) or \"Square\" (a square in the tool bar), then click on an intersecion to add/remove the corresponding mark or label. The next label that will be add is incrementing automatically (from \"A\" to \"Z\", ...), but can be force to any text by clicking on the \"Label\" tool and replacing the letter in it. </p> <h2>Other tools</h2> <h3>\"Numbering\" tool</h3> <p> \"Numbering\" tool (a numbered stone in the tool bar) shows/hides numbering. </p> <h3>\"Header\" tool</h3> <p> \"Header\" tool (\"H\" in the tool bar) allows to edit game information properties (event, round, name of black player, name of white player, ...). </p> <h3>\"As in book\" tool</h3> <p> \"As in book\" tool (\"K\" in the tool bar) adds/removes captured stones on the goban as in book/as in real life. </p> <h3>\"Indices\" tool</h3> <p> \"Indices\" tool (\"I\" in the tool bar) shows/hides indices arround the goban. </p> <h3>\"Mark on variation\" tool</h3> <p> \"Mark on variation\" tool (\"V\" in the tool bar) shows/hides mark on variation.</p> <h3>\"Style\" tool</h3> <p> \"Style\" tool (\"S\" in the tool bar) changes variation style. One can display variations of the current move (siblings mode) or variations of the next move (children mode). To see corresponding variation marks, don\'t forget to enable \"Mark on variation\" mode too. </p> <h3>Annotation tools</h3> <p> They add various annotations to the current move (sgf properties GB, GW, DM, UC, TE, BM, DO and IT). </p> <h3>\"Turn\" tool</h3> <p> \"Turn\" tool (\"T\" in the tool bar) allows to indicate the turn for the next move (PL sgf property). </p> <h3>Transform tools</h3> <p> They make a rotation, a vertical symmetry or an horizontal symmetry of the goban. </p> <h2>Tree</h2> <p> It allows to see all the nodes of the game tree (by clicking on a stone of the tree, one returns to the position when the corresponding move was played). </p> <h2>Quit this help</h2> <p> To quit this help, and display again the goban, click on \"Help\" button or \"Close\" button at the bottom of this text. </p>");
mxG.G.prototype.doHelp=function()
{
	if(this.gBox=="ShowHelp") {this.hideGBox("ShowHelp");return;}
	if(!this.getE("ShowHelpDiv"))
	{
		var a,s,z=this.k;
		a=" tabindex=\"0\"";
		s="<div class=\"mxShowContentDiv\""+a+" id=\""+this.n+"ShowHelpContentDiv\"></div>";
		s+="<div class=\"mxOKDiv\">";
		s+="<button type=\"button\"><span>"+this.local(" Close ")+"</span></button>";
		s+="</div>";
		this.createGBox("ShowHelp").innerHTML=s;
		this.getE("ShowHelpContentDiv").innerHTML=this.local("Help_Data");
		btn=this.getE("ShowHelpDiv").querySelector(".mxOKDiv button");
		btn.addEventListener("click",function(){mxG.D[z].hideGBox('ShowHelp');},false);
	}
	this.showGBox("ShowHelp");
};
mxG.G.prototype.updateHelp=function()
{
	if(this.getE("HelpBtn"))
	{
		if(this.gBox=="ShowHelp") this.selectBtn("Help");
		else this.unselectBtn("Help");
	}
};
mxG.G.prototype.initHelp=function()
{
	if(this.helpBtnOn)
		this.addBtn(this.getE("HelpDiv"),{n:"Help",v:this.alias("Help","helpAlias")});
};
mxG.G.prototype.createHelp=function()
{
	this.helpBtnOn=this.setA("helpBtnOn",0,"bool");
	this.helpAlias=this.setA("helpAlias",null,"string");
	return this.createBtnBox("Help");
};
}
// maxiGos v7 > mgosImage.js
if(!mxG.G.prototype.createImage)
{
mxG.fr("Close","Fermer");
mxG.G.prototype.svgToDataURL=function(b)
{
	var e1,e2,a,k,km,r=2,z,e,s,v,rect1,rect2,mark1,mark2;
	e1=this.getE("GobanSvg");
	e2=e1.cloneNode(true);
	// get some css properties and put it in the svg image as attributes
	rect1=e1.querySelector(".mxWholeRect");
	if(rect1)
	{
		s=window.getComputedStyle(rect1,null);
		v=s.getPropertyValue("fill");
		//alert("v="+v);
		//alert("mxWholeRect fill="+rect1.getAttributeNS(null,"fill"));
		rect2=e2.querySelector(".mxWholeRect");
		rect2.setAttributeNS(null,"fill",v);
	}
	mark1=e1.querySelector(".mxMarkOnLast");
	if(mark1)
	{
		s=window.getComputedStyle(mark1,null);
		v=s.getPropertyValue("fill");
		mark2=e2.querySelector(".mxMarkOnLast");
		mark2.setAttributeNS(null,"fill",v);
		v=s.getPropertyValue("stroke");
		mark2.setAttributeNS(null,"stroke",v);
	}
	// ignore all styles
	if(b)
	{
		// set width and height to actual svg width and height (png)
		e2.setAttribute("width",b.width*r+"");
		e2.setAttribute("height",b.height*r+"");
	}
	else
	{
		// set width and height to 100% (svg)
		e2.setAttribute("width","100%");
		e2.setAttribute("height","100%");
	}
	// clean svg
	e2.removeAttribute("id");
	a=e2.querySelectorAll("g[id]");
	km=a.length;
	for(k=0;k<km;k++) a[k].removeAttribute("id");
	a=e2.querySelector(".mxFocus");
	if(a) a.parentNode.removeChild(a);
	z=e2.outerHTML;
	z=z.replace(/ class="[^"]*"/g,"");
	// some applications such as OpenOffice still need to use xlink:href (in 2021)
	if(this.xlink4hrefOn) z=z.replace(/ href=/g," xlink:href=");
	z=z.replace(/><\/(rect|circle|path|image|stop)>/g,"/>");
	z=z.replace(/<rect fill="none" stroke="none"[^>]*>/g,"");
	return "data:image/svg+xml;base64,"+mxG.b64EncodeUnicode(z);
};
mxG.G.prototype.doSvg=function()
{
	if(this.gBox=="ShowSvg"){this.hideGBox("ShowSvg");return;}
	if(!this.getE("ShowSvgDiv"))
	{
		let s="";
		s+="<div class=\"mxShowContentDiv\" tabindex=\"0\">";
		s+="<img id=\""+this.n+"SvgImg\">";
		s+="</div>";
		s+="<div class=\"mxOKDiv\">";
		s+="<button type=\"button\" onclick=\""+this.g+".hideGBox('ShowSvg')\"><span>"+this.local("Close")+"</span></button>";
		s+="</div>";
		this.createGBox("ShowSvg").innerHTML=s;
	}
	this.showGBox("ShowSvg");
	this.getE("SvgImg").src=this.svgToDataURL(null);
};
mxG.G.prototype.doPng=function()
{
	let img,png,b,r=2,k=this.k;
	b=this.getE("GobanSvg").getBoundingClientRect();
	if(this.gBox=="ShowPng"){this.hideGBox("ShowPng");return;}
	if(!this.getE("ShowPngDiv"))
	{
		let s="",
			dummyImg="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E";
		s+="<div class=\"mxShowContentDiv\" tabindex=\"0\">";
		// in theory, scr should be set to something
		s+="<img id=\""+this.n+"PngImg\" src=\""+dummyImg+"\">";
		s+="</div>";
		s+="<div class=\"mxOKDiv\">";
		s+="<button type=\"button\" onclick=\""+this.g+".hideGBox('ShowPng')\"><span>"+this.local("Close")+"</span></button>";
		s+="</div>";
		this.createGBox("ShowPng").innerHTML=s;
	}
	this.showGBox("ShowPng");
	png=this.getE("PngImg");
	img=new Image();
	img.onload=function()
	{
		var canvas=document.createElement('canvas'),
			w=img.width,
			h=img.height;
		png.width=w/r;
		png.height=h/r;
		canvas.width=w;
		canvas.height=h;
		// bug Safari?: svg <image> not drawn in the canvas
		//		the first time it is used,
		//		or if Safari is restarted
		// use a setTimeout() as a dirty work-around
		setTimeout(function(){
				canvas.getContext('2d').drawImage(img,0,0);
				png.src=canvas.toDataURL("image/png");
			},1);
	}
	img.src=this.svgToDataURL(b);
};
mxG.G.prototype.updateImage=function()
{
	if(this.getE("PngBtn"))
	{
		if(this.gBox=="ShowPng") this.selectBtn("Png");
		else this.unselectBtn("Png");
	}
	if(this.getE("SvgBtn"))
	{
		if(this.gBox=="ShowSvg") this.selectBtn("Svg");
		else this.unselectBtn("Svg");
	}
};
mxG.G.prototype.initImage=function()
{
	if(this.pngBtnOn)
		this.addBtn(this.getE("PngDiv"),{n:"Png",v:this.alias("PNG","pngAlias")});
	if(this.svgBtnOn)
		this.addBtn(this.getE("SvgDiv"),{n:"Svg",v:this.alias("SVG","svgAlias")});
};
mxG.G.prototype.createImage=function()
{
	var s="";
	this.xlink4hrefOn=this.setA("xlink4hrefOn",1,"bool"); // replace href by xlink:href
	this.pngBtnOn=this.setA("pngBtnOn",0,"bool");
	this.svgBtnOn=this.setA("svgBtnOn",0,"bool");
	this.pngAlias=this.setA("pngAlias",null,"string");
	this.svgAlias=this.setA("svgAlias",null,"string");
	s+=this.createBtnBox("Png");
	s+=this.createBtnBox("Svg");
	return s;
};
}
// maxiGos v7 > mgosPass.js
if(!mxG.G.prototype.createPass)
{
mxG.fr("Pass","Passe");
mxG.fr("Pass_Short","P");
mxG.en("Pass_Short","P");
mxG.G.prototype.doPass2=function()
{
	this.doNotFocusGobanJustAfter=1;
	if(this.hasC("Edit")) this.checkEditPlay(0,0);
	else if(this.hasC("Solve")&&this.canPlaceSolve) this.checkSolve(0,0);
	else if(this.hasC("Variation")&&this.canPlaceVariation) this.checkVariation(0,0);
	else if(this.hasC("Guess")) this.checkGuess(0,0);
};
mxG.G.prototype.doPass=function()
{
	this.doPass2();
};
mxG.G.prototype.isPass=function(aN)
{
	var s,x,y;
	if(aN.P["B"]||aN.P["W"])
	{
		s=(aN.P["B"]?aN.P["B"][0]:aN.P["W"][0]);
		if(s.length==2)
		{
			x=s.c2n(0);
			y=s.c2n(1);
			if((x<1)||(y<1)||(x>this.dimX)||(y>this.dimY)) {x=0;y=0;}
		}
		else {x=0;y=0;}
		return !(x||y);
	}
	return 0;
};
mxG.G.prototype.updatePass=function()
{
	var aN=0,k,km,status,look=0,s,e=this.getE("PassBtn");
	if(!e) return;
	status=this.isPass(this.cN)?1:0;
	if(!(this.styleMode&2))
	{
		if(this.styleMode&1) aN=this.cN.Dad;
		else aN=this.cN;
	}
	if(!this.hasC("Solve")||!this.canPlaceSolve)
	{
		if(aN)
		{
			km=aN.Kid.length;
			if(km)
			{
				if(this.styleMode&1) {if(km>1) look=1;}
				else look=1;
			}
		}
		if(look) for(k=0;k<km;k++) if(this.isPass(aN.Kid[k])) status=status|2;
	}
	aN=this.kidOnFocus(this.cN);
	if(aN&&this.isPass(aN)) status=status|4;
	s="mxBtn mxPassBtn";
	if(status&1) s+=" mxJustPlayedPassBtn";
	if(status&2) s+=" mxOnVariationPassBtn";
	if(status&4) s+=" mxOnFocusPassBtn";
	e.className=s;
	if(this.gBox||(this.hasC("Score")&&this.canPlaceScore)) this.disableBtn("Pass");
	else if(this.canPassOnlyIfPassInSgf)
	{
		if(status&2) this.enableBtn("Pass");
		else this.disableBtn("Pass");
	}
	else this.enableBtn("Pass");
};
mxG.G.prototype.initPass=function()
{
	if(this.passBtnOn)
		this.addBtn(this.getE("PassDiv"),{n:"Pass",v:this.alias("Pass","passAlias")});
};
mxG.G.prototype.createPass=function()
{
	this.passBtnOn=this.setA("passBtnOn",0,"bool");
	this.passAlias=this.setA("passAlias",null,"string");
	this.canPassOnlyIfPassInSgf=this.setA("canPassOnlyIfPassInSgf",0,"bool");
	return this.createBtnBox("Pass");
};
}
// maxiGos v7 > mgosScore.js
if(!mxG.G.prototype.createScore)
{
mxG.fr("Score","Score");
mxG.fr("Score method:","Méthode de score :");
mxG.fr("trivial","triviale");
mxG.fr("counting","décompte");
mxG.fr("propagate","propagation");
mxG.fr("estimate","estimation");
mxG.fr("ephemeral score","score éphémère");
mxG.fr("Black:","Noir :");
mxG.fr("White:","Blanc :");
mxG.fr("Chinese style","chinois");
mxG.fr("Japanese style","japonais");
mxG.fr("Unusual komi","Komi inhabituel");
mxG.fr("Unknown rules","Règle inconnue");

mxG.G.prototype.buildScore=function()
{
	var s="",i,j,cb=0,cw=0,ib=0,iw=0,pb=0,pw=0,handicap,komi,rules,r;
	var hasC=this.hasC("C"),expectedKomi;
	rules=this.getInfoS("RU");
	if(!rules) rules=this.scoreDefaultRules;
	if(rules) rules=rules.toLowerCase();
	if((rules=="chinese")||(rules=="ing")||(rules=="goe")||(rules=="nz")) r="C";
	else if((rules=="aga")||(rules=="french")||(rules=="british")) r="C";
	else if((rules=="japanese")||(rules=="korean")) r="J";
	else r=null;
	komi=this.getInfoS("KM");
	if(komi)
	{
		komi=parseFloat(komi);
		if(!komi) komi=0; // when komi is a string such as BBW, BBBW ...?
	}
	else if(r=="J") komi=6.5;
	else if(r=="C") komi=7.5;
	else komi=5.5; // default sgf value
	// assume komi when handicap is 0.5+handicap-1 if Chinese style rules in the SGF
	// todo:
	//	if handicap is not specified in the SGF,
	//	but some handicap-like AB are at the beginning
	//	try to guess the handicap?
	handicap=this.getInfoS("HA");
	if(handicap) {handicap=parseInt(handicap);if(!handicap) handicap=0;}
	else if(komi==0.5) handicap=1;
	else handicap=0;
	for(i=1;i<=this.DX;i++)
		for(j=1;j<=this.DY;j++)
		{
			switch(this.scoreBan.computed[i][j])
			{
				case "B":cb++;
					if(this.scoreBan.initial[i][j]=="W") pb++;break;
				case "W":cw++;
					if(this.scoreBan.initial[i][j]=="B") pw++;break;
				default:
					switch(this.scoreBan.initial[i][j])
					{
						case "B":ib++;break;
						case "W":iw++;break;
					}
			}
		}
	pb+=this.gor.getPrisoners("B"); // ignore pass penalty
	pw+=this.gor.getPrisoners("W"); // ignore pass penalty
	// when !r, do not display score to avoid inconsistency
	if(r=="C")
	{
		if(handicap) expectedKomi=0.5+handicap-1;
		else expectedKomi=7.5;
		if(hasC) s+="<h1>";
		s+=this.local("Score")+" ("+this.local("Chinese style")+")";
		if(hasC) s+="</h1>"; else s+="\n";
		if(hasC) s+="<p>";
		s+=this.local("Black:")+" "+cb+" + "+ib+" = "+(cb+ib);
		if(hasC) s+="</p>"; else s+="\n";
		if(hasC) s+="<p>";
		s+=this.local("White:")+" "+cw+" + "+iw+" + "+komi+" = "+(cw+iw+komi);
		if(hasC) s+="</p>"; else s+="\n";
		if(expectedKomi!=komi)
		{
			if(hasC) s+="<p>";
			s+=this.local("Unusual komi");
			if(hasC) s+="</p>"; else s+="\n";
		}
	}
	else if(r=="J")
	{
		if(handicap) expectedKomi=0.5;
		else expectedKomi=6.5;
		if(hasC) s+="<h1>";
		s+=this.local("Score")+" ("+this.local("Japanese style")+")";
		if(hasC) s+="</h1>"; else s+="\n";
		if(hasC) s+="<p>";
		s+=this.local("Black:")+" "+cb+" + "+pb+" = "+(cb+pb);
		if(hasC) s+="</p>"; else s+="\n";
		if(hasC) s+="<p>";
		s+=this.local("White:")+" "+cw+" + "+pw+" + "+komi+" = "+(cw+pw+komi);
		if(hasC) s+="</p>"; else s+="\n";
		if(expectedKomi!=komi)
		{
			if(hasC) s+="<p>";
			s+=this.local("Unusual komi");
			if(hasC) s+="</p>"; else s+="\n";
		}
	}
	else
	{
		if(hasC) s+="<h1>";
		s+=this.local("Score");
		if(hasC) s+="</h1>"; else s+="\n";
		if(hasC) s+="<p>";
		s+=this.local("Unknown rules");
		if(hasC) s+="</p>"; else s+="\n";
	}
	if(hasC) s="<div class=\"mxScoreContentDiv\">"+s+"</div>";
	return s;
};
mxG.G.prototype.getTX=function()
{
	var TX=["TB","TW"];
	var aN,k,aLen,s,x,y,x1,y1,x2,y2,z;
	aN=this.cN4Score;
	for(z=0;z<7;z++)
	{
		if(aN.P[TX[z]]) aLen=aN.P[TX[z]].length;else aLen=0;
		for(k=0;k<aLen;k++)
		{
			s=aN.P[TX[z]][k];
			if(s.length==2)
			{
				x=s.c2n(0);
				y=s.c2n(1);
				this.scoreBan.marked[x][y]=(TX[z]=="TB")?"B":"W";
				if(!this.ephemeralScore)
					this.scoreBan.modified[x][y]=this.scoreBan.marked[x][y];
			}
			else if(s.length==5)
			{
				x1=s.c2n(0);
				y1=s.c2n(1);
				x2=s.c2n(3);
				y2=s.c2n(4);
				for(x=x1;x<=x2;x++)
					for(y=y1;y<=y2;y++)
					{
						this.scoreBan.marked[x][y]=(TX[z]=="TB")?"B":"W";
						if(!this.ephemeralScore)
							this.scoreBan.modified[x][y]=this.scoreBan.marked[x][y];
					}
			}
		}
	}
};
mxG.G.prototype.removeTX=function(a,b)
{
	// remove TM[ab] or TW[ab] if any
	var k,km,kp,TX=["TB","TW"],aN,v;
	aN=this.cN4Score;
	v=this.xy2s(a,b);
	for(kp=0;kp<TX.length;kp++)
	{
		if(aN.P[TX[kp]])
		{
			km=aN.P[TX[kp]].length;
			for(k=0;k<km;k++) if(aN.P[TX[kp]][k]==v) break;
			if(k<km) aN.TakeOff(TX[kp],k);
		}
	}
};
mxG.G.prototype.addTX=function(tx,a,b)
{
	// tx is "TB" or "TW"
	var aN,v;
	aN=this.cN4Score;
	v=this.xy2s(a,b);
	this.removeTX(a,b);
	if(aN.P[tx]) aN.P[tx].push(v);
	else aN.P[tx]=[v];
};
mxG.G.prototype.setTX=function(from)
{
	var i,j;
	for(i=1;i<=this.DX;i++)
		for(j=1;j<=this.DY;j++)
		{
			switch(this.scoreBan[from][i][j])
			{
				case "B":this.addTX("TB",i,j);break;
				case "W":this.addTX("TW",i,j);break;
				default:this.removeTX(i,j);
			}
		}
};
mxG.G.prototype.z_estimate=function(x,y)
{
	let nat,z=0;
	if(this.gor.inGoban(x,y))
	{
		nat=this.scoreBan.computed[x][y]?
				this.scoreBan.computed[x][y]:
					this.scoreBan.initial[x][y];
		if((nat=="B")||(nat=="W")) z=(nat=="B"?1:2);
		else z=4;
	}
	return z;
};
mxG.G.prototype.checkNeighbour=function(x,y)
{
	let z=0;
	return this.z_estimate(x-1,y)
		|this.z_estimate(x+1,y)
		|this.z_estimate(x,y-1)
		|this.z_estimate(x,y+1);
};
mxG.G.prototype.currentOwner_estimate=function(x,y)
{
	let nat;
	nat=this.scoreBan.modified[x][y];
	if((nat=="B")||(nat=="W")) return nat;
	nat=this.scoreBan.initial[x][y];
	if((nat=="B")||(nat=="W")) return nat;
	return "E";
};
mxG.G.prototype.currentOwner=function(x,y)
{
	let nat;
	if(this.scoreMethod=="estimate") return this.currentOwner_estimate(x,y);
	nat=this.scoreBan.computed[x][y];
	if((nat=="B")||(nat=="W")) return nat;
	nat=this.scoreBan.initial[x][y];
	if((nat=="B")||(nat=="W")) return nat;
	return "E";
};
mxG.G.prototype.w4po=function(s,x,y,a)
{
	if(this.gor.inGoban(x,y))
	{
		let z;
		z=this.currentOwner(x,y);
		if(z=="B") s.b+=a; else if(z=="W") s.w+=a;
	}
	return s;
};
mxG.G.prototype.possibleOwner=function(x,y)
{
	var s={b:0,w:0},z,i,j,k,n;
	// avoid use of last score action here: mess for little benefit
	k=9;
	for(i=x-k;i<=x+k;i++)
		for(j=y-k;j<=y+k;j++)
			if((i!=x)||(j!=y))
				if(this.gor.inGoban(i,j)&&(((x-i)*(x-i)+(y-j)*(y-j))<=(k*k)))
				{
					n=Math.pow(3,k-Math.abs(x-i)+k-Math.abs(y-j));
					s=this.w4po(s,i,j,n);
				}
	if(s.b>s.w) return "B";
	if(s.w>s.b) return "W";
	return null;
	// todo: better choice? scan more distant points?
};
mxG.G.prototype.getNatWhenScore_trivial=function(x,y)
{
	return this.scoreBan.initial[x][y];
};
mxG.G.prototype.getNatWhenScore_counting=function(x,y)
{
	if(this.scoreBan.initial[x][y]=="E") return "E";
	if(this.scoreBan.taken[x][y]) return "E";
	return this.scoreBan.initial[x][y];
};
mxG.G.prototype.getNatWhenScore_propagate=function(x,y)
{
	let natm;
	if(this.scoreBan.initial[x][y]=="E")
	{
		if(this.scoreBan.modified[x][y]) natm=this.scoreBan.modified[x][y];
		else natm="E";
	}
	else
	{
		if(this.scoreBan.taken[x][y]) natm="E";
		else natm=this.scoreBan.initial[x][y];
	}
	return natm;
};
mxG.G.prototype.getNatWhenScore_estimate=function(x,y)
{
	return this.getNatWhenScore_propagate(x,y);
};
mxG.G.prototype.getNatWhenScore=function(x,y)
{
	// do not use this.scoreBan.computed in getNatWhenScore()
	return this["getNatWhenScore_"+this.scoreMethod](x,y);
};
mxG.G.prototype.guessNextWhenScore=function(x,y)
{
	let a,b,c,po;
	c=this.scoreBan.computed[x][y];
	if((this.lastScoreAct.x==x)&&(this.lastScoreAct.y==y))
	{
		b=this.lastScoreAct.a;
		if((b=="B")&&(c=="W")) a="E";
		else if((b=="B")&&(c==null)) a="W";
		else if((b=="W")&&(c=="B")) a="E";
		else if((b=="W")&&(c==null)) a="B";
		else if((b=="E")&&(c=="B")) a="W";
		else if((b=="E")&&(c=="W")) a="B";
	}
	else
	{
		switch(c)
		{
			case "B":
			case "W":a="E";break;
			default:po=this.possibleOwner(x,y);a=po?po:"B";
		}
	}
	return a;
}
mxG.G.prototype.hasPrisonerWhenScore=function(nat,x,y)
{
	// check if a stone has at least one already marked prisoner as distant neighbour
	if(this.gor.inGoban(x,y))
	{
		let xy=this.xy(x,y);
		let natm=this.getNatWhenScore(x,y);
		let onat=(nat=="B"?"W":"B");
		if(this.visitedWhenHasPrisoner[xy]) return 0;
		this.visitedWhenHasPrisoner[xy]=1;
		if(this.scoreBan.taken[x][y]==onat) return 1;
		// no taken onat stone found, continue with other nat stones or empty points
		if(natm!=onat)
			return this.hasPrisonerWhenScore(nat,x-1,y)
				|this.hasPrisonerWhenScore(nat,x+1,y)
				|this.hasPrisonerWhenScore(nat,x,y-1)
				|this.hasPrisonerWhenScore(nat,x,y+1);
	}
	return 0;
};
mxG.G.prototype.checkSurrounding=function(x,y)
{
	// verify is (x,y) is in an area surrounded by B or W
	// if surrounded by B, return 1
	// if surrounded by W, return 2
	// if surrounded by B and W, return 3
	// if not surrounded by B or W, return 0
	if(this.gor.inGoban(x,y))
	{
		let xy=this.xy(x,y);
		let natm=this.getNatWhenScore(x,y);
		if(this.visitedWhenCheckSurrounding[xy]) return 0;
		this.visitedWhenCheckSurrounding[xy]=1;
		if(natm=="E")
			return this.checkSurrounding(x-1,y)
				|this.checkSurrounding(x+1,y)
				|this.checkSurrounding(x,y-1)
				|this.checkSurrounding(x,y+1);
		if(natm=="B") return 1;
		if(natm=="W") return 2;
	}
	return 0;
};
mxG.G.prototype.canSwapWhenScore=function(nat,x,y)
{
	if(this.scoreBan.computed[x][y]) return 1;
	this.visitedWhenHasPrisoner=[];
	return !this.hasPrisonerWhenScore(nat,x,y);
};
mxG.G.prototype.swapWhenScore=function(nat,x,y,d)
{
	// if d,
	//	add onat mark on all empty points of the area and all stones of nat color
	//		of the area where (x,y) is (ie surrounded by onat stones)
	// else
	//	remove mark on all empty points of the area and all stones of nat color
	//		of the area where (x,y) is (ie surrounded by onat stones)
	// warning: do not use checkSurrounding() during swapWhenScore() process
	let onat=(nat=="B")?"W":"B";
	if(this.gor.inGoban(x,y))
	{
		let xy=this.xy(x,y);
		let natm=this.getNatWhenScore(x,y);
		if(this.visitedWhenSwap[xy]) return 0;
		this.visitedWhenSwap[xy]=1;
		if((natm==nat)||(natm=="E"))
		{
			if(d)
			{
				this.scoreBan.computed[x][y]=onat;
				if(this.scoreBan.initial[x][y]==nat) this.scoreBan.taken[x][y]=nat;
			}
			else
			{
				this.scoreBan.computed[x][y]=null;
				if(this.scoreBan.initial[x][y]==nat) this.scoreBan.taken[x][y]=null;
			}
			this.swapWhenScore(nat,x-1,y,d);
			this.swapWhenScore(nat,x+1,y,d);
			this.swapWhenScore(nat,x,y-1,d);
			this.swapWhenScore(nat,x,y+1,d);
		}
	}
};
mxG.G.prototype.computeScoreMarks_trivial=function(v)
{
	var i,j;
	for(i=1;i<=this.DX;i++)
		for(j=1;j<=this.DY;j++)
		{
			if(!v||v[this.xy(i,j)])
			{
				if(this.scoreBan.modified[i][j])
				{
					switch(this.scoreBan.modified[i][j])
					{
						case "B":this.scoreBan.computed[i][j]="B";break;
						case "W":this.scoreBan.computed[i][j]="W";break;
						default:this.scoreBan.computed[i][j]=null;
					}
				}
			}
		}
};
mxG.G.prototype.computeScoreMarks_counting=function(v)
{
	var i,j;
	for(i=1;i<=this.DX;i++)
		for(j=1;j<=this.DY;j++)
		{
			if(!v||v[this.xy(i,j)])
			{
				if(this.scoreBan.initial[i][j]=="E")
				{
					let z;
					this.visitedWhenCheckSurrounding=[];
					z=this.checkSurrounding(i,j);
					if(z==1) this.scoreBan.computed[i][j]="B";
					else if(z==2) this.scoreBan.computed[i][j]="W";
					else this.scoreBan.computed[i][j]=null;
				}
			}
		}
};
mxG.G.prototype.computeScoreMarks_propagate=function(v)
{
	this.computeScoreMarks_counting(v);
};
mxG.G.prototype.computeScoreMarks_estimate=function(v)
{
	var i,j;
	for(i=1;i<=this.DX;i++)
		for(j=1;j<=this.DY;j++)
		{
			if(!v||v[this.xy(i,j)])
			{
				//console.log(i+" "+j+" "+this.scoreBan.initial[i][j]);
				if(this.scoreBan.initial[i][j]=="E")
					this.scoreBan.computed[i][j]=this.possibleOwner(i,j);
				else
				{
					let nat,onat;
					nat=this.scoreBan.initial[i][j];
					onat=(nat=="B"?"W":"B");
					if(this.scoreBan.modified[i][j]==onat)
					{
						this.scoreBan.taken[i][j]=nat;
						this.scoreBan.computed[i][j]=onat;
					}
					else
					{
						this.scoreBan.taken[i][j]=null;
						this.scoreBan.computed[i][j]=null;
					}
				}
			}
		}
	// clean singletons
	for(i=1;i<=this.DX;i++)
		for(j=1;j<=this.DY;j++)
		{
			if(!v||v[this.xy(i,j)])
			{
				if(this.scoreBan.initial[i][j]=="E")
				{
					let z=this.checkNeighbour(i,j);
					// console.log(i+" "+j+" "+z);
					if(z==1) this.scoreBan.computed[i][j]="B";
					else if(z==2) this.scoreBan.computed[i][j]="W";
				}
			}
		}
	// neutral points
	for(i=1;i<=this.DX;i++)
		for(j=1;j<=this.DY;j++)
		{
			if(!v||v[this.xy(i,j)])
			{
				this.scoreBan.buffer[i][j]=this.scoreBan.computed[i][j];
				if(this.scoreBan.initial[i][j]=="E")
				{
					let z=this.checkNeighbour(i,j);
					if((z!=1)&&(z!=2)) this.scoreBan.buffer[i][j]=null;
				}
			}
		}
	for(i=1;i<=this.DX;i++)
		for(j=1;j<=this.DY;j++)
		{
			if(!v||v[this.xy(i,j)])
			{
				this.scoreBan.computed[i][j]=this.scoreBan.buffer[i][j];
			}
		}
};
mxG.G.prototype.computeScoreMarks=function(v)
{
	if(this.scoreMethod=="estimate") this.computeScoreMarks_estimate(v);
	else if(this.scoreMethod=="propagate") this.computeScoreMarks_propagate(v);
	else if(this.scoreMethod=="counting") this.computeScoreMarks_counting(v);
	else this.computeScoreMarks_trivial(v);
};
mxG.G.prototype.checkScore_trivial=function(a,b)
{
	let po,opo;
	po=this.possibleOwner(a,b);
	po=po?po:"B";
	opo=(po=="B")?"W":"B";
	switch(this.scoreBan.computed[a][b])
	{
		case po:
			switch(this.scoreBan.initial[a][b])
			{
				case opo: this.scoreBan.modified[a][b]="E";break;
				default: this.scoreBan.modified[a][b]=opo;
			};break;
		case opo:
			this.scoreBan.modified[a][b]="E";break;
		default:
			switch(this.scoreBan.initial[a][b])
			{
				case po: this.scoreBan.modified[a][b]=opo;break;
				default: this.scoreBan.modified[a][b]=po;
			}
	}
	this.computeScoreMarks(null);
};
mxG.G.prototype.checkScore_counting=function(x,y)
{
	let nat=this.scoreBan.initial[x][y],d=this.scoreBan.computed[x][y]?0:1,z;
	if(((nat=="B")||(nat=="W"))&&this.canSwapWhenScore(nat,x,y))
	{
		this.visitedWhenSwap=[];
		this.swapWhenScore(nat,x,y,d);
		// restore the territories of dead stones coming back to life
		this.computeScoreMarks(this.visitedWhenSwap);
	}
	else if(nat=="E")
	{
		this.visitedWhenCheckSurrounding=[];
		z=this.checkSurrounding(x,y);
		this.visitedWhenSwap=[];
		if(z==1) this.swapWhenScore("W",x,y,d);
		else if(z==2) this.swapWhenScore("B",x,y,d);
	}
};
mxG.G.prototype.clearMarkWhenScore=function(c,o,x,y)
{
	if(this.gor.inGoban(x,y)&&!this.scoreBan.modified[x][y]
		&&this.scoreBan.computed[x][y]&&(this.scoreBan.computed[x][y]==c))
	{
		this.visitedWhenSwap=[];
		this.swapWhenScore(o,x,y,0);
	}
};
mxG.G.prototype.checkScore_propagate=function(x,y)
{
	let nat=this.scoreBan.initial[x][y],a,b,c=this.scoreBan.computed[x][y],d=c?0:1,z;
	if(((nat=="B")||(nat=="W"))&&this.canSwapWhenScore(nat,x,y))
	{
		this.visitedWhenSwap=[];
		this.swapWhenScore(nat,x,y,d);
		// restore the territories of dead stones coming back to life
		this.computeScoreMarks(this.visitedWhenSwap);
	}
	else if(nat=="E")
	{
		if(!this.scoreBan.modified[x][y]||(this.scoreBan.modified[x][y]=="E"))
		{
			this.visitedWhenCheckSurrounding=[];
			z=this.checkSurrounding(x,y);
			// if (x,y) in a surrounded area, swap the whole area then exit 
			if(z==1) {this.visitedWhenSwap=[];this.swapWhenScore("W",x,y,d);return;}
			if(z==2) {this.visitedWhenSwap=[];this.swapWhenScore("B",x,y,d);return;}
		}
		else
		{
			// clean marks around (x,y) if any
			let o=((c=="B")?"W":"B");
			this.clearMarkWhenScore(c,o,x-1,y);
			this.clearMarkWhenScore(c,o,x+1,y);
			this.clearMarkWhenScore(c,o,x,y-1);
			this.clearMarkWhenScore(c,o,x,y+1);
		}
		a=this.guessNextWhenScore(x,y);
		this.lastScoreAct={a:(c?c:"E"),x:x,y:y};
		this.scoreBan.modified[x][y]=a;
		this.scoreBan.computed[x][y]=((a=="E")?null:a);
	}
};
mxG.G.prototype.checkScore_estimate=function(x,y)
{
	// change stone status
	let nat=this.scoreBan.initial[x][y];
	if((nat=="B")||(nat=="W"))
	{
		let onat=(nat=="B"?"W":"B");
		if(this.scoreBan.modified[x][y]==onat) this.scoreBan.modified[x][y]="E";
		else this.scoreBan.modified[x][y]=onat;
		this.computeScoreMarks(null);
	}
};
mxG.G.prototype.initScoreBan=function()
{
	// initial: goban state
	// marked: initial marks, used to restore marks if ephemeralScore
	// modified: initial marks + marks added by the user
	// taken: stones marked as dead
	// computed: computed marks, those displayed (depends on scoreMethod)
	var i,j,nat;
	this.scoreBan={initial:[],marked:[],modified:[],taken:[],computed:[],buffer:[]};
	for(i=1;i<=this.DX;i++)
	{
		this.scoreBan.initial[i]=[];
		this.scoreBan.marked[i]=[];
		this.scoreBan.modified[i]=[];
		this.scoreBan.taken[i]=[];
		this.scoreBan.computed[i]=[];
		this.scoreBan.buffer[i]=[];
		for(j=1;j<=this.DY;j++)
		{
			nat=this.gor.getBanNat(i,j);
			this.scoreBan.initial[i][j]=nat;
			this.scoreBan.marked[i][j]=null;
			this.scoreBan.modified[i][j]=null;
			this.scoreBan.taken[i][j]=null;
			this.scoreBan.computed[i][j]=null;
			this.scoreBan.buffer[i][j]=null;
		}
	}
	this.getTX();
	this.lastScoreAct={a:"E",x:-1,y:-1};
	this.computeScoreMarks(null);
	this.setTX("computed");
};
mxG.G.prototype.checkScore=function(x,y)
{
	if(this.scoreMethod=="estimate") this.checkScore_estimate(x,y);
	else if(this.scoreMethod=="propagate") this.checkScore_propagate(x,y);
	else if(this.scoreMethod=="counting") this.checkScore_counting(x,y);
	else this.checkScore_trivial(x,y);
	this.setTX("computed");
	this.updateAll();
};
mxG.G.prototype.doClickScore=function(ev)
{
	var c;
	if(this.isGobanDisabled()) return;
	if(this.canPlaceScore)
	{
		c=this.scr.getC(ev);
		if(!this.inView(c.x,c.y)) {this.plonk();return;}
		this.checkScore(c.x,c.y);		
	}
};
mxG.G.prototype.doKeydownGobanForScore=function(ev)
{
	var c;
	if(this.isGobanDisabled()) return;
	if(this.canPlaceScore&&this.gobanFocusVisible)
	{
		c=mxG.getKCode(ev);
		if((c==13)||(c==32))
		{
			this.checkScore(this.xFocus,this.yFocus);
			ev.preventDefault();
		}
	}
};
mxG.G.prototype.toggleScore=function()
{
	// call this function each one wants to enter/quit score mode
	if(this.canPlaceScore)
	{
		if(this.ephemeralScore)
		{
			this.setTX("marked");
			if(this.hasC("Edit"))
				this.getE("CommentToolText").value=this.formerCommentWhenScore;
		}
		this.canPlaceScore=0;
		this.canPlaceVariation=this.initialCanPlaceVariationForScore;
		this.canPlaceGuess=this.initialCanPlaceGuessForScore;
		this.canPlaceSolve=this.initialCanPlaceSolveForScore;
		this.canPlaceEdit=this.initialCanPlaceEditForScore;	
		this.marksAndLabelsOn=this.initialmarksAndLabelsOnForScore;
		this.cN4Score=null;
	}
	else
	{
		if(this.ephemeralScore)
		{
			if(this.hasC("Edit"))
				this.formerCommentWhenScore=this.getCommentWhenEdit();
		}
		this.canPlaceScore=1;
		this.initialCanPlaceVariationForScore=(this.canPlaceVariation?1:0);
		this.initialCanPlaceGuessForScore=(this.canPlaceGuess?1:0);
		this.initialCanPlaceSolveForScore=(this.canPlaceSolve?1:0);
		this.initialCanPlaceEditForScore=(this.canPlaceEdit?1:0);
		this.initialmarksAndLabelsOnForScore=(this.marksAndLabelsOn?1:0);
		this.canPlaceVariation=0;
		this.canPlaceGuess=0;
		this.canPlaceSolve=0;
		this.canPlaceEdit=0;
		this.marksAndLabelsOn=1;
		this.cN4Score=this.cN;
		this.initScoreBan();
	}
};
mxG.G.prototype.doScore=function()
{
	if(this.gBox) this.hideGBox(this.gBox);
	this.toggleScore();
	this.updateAll();
};
mxG.G.prototype.updateScore=function()
{
	if(this.getE("ScoreBtn"))
	{
		if(this.canPlaceScore) this.selectBtn("Score");
		else this.unselectBtn("Score");
	}
};
mxG.G.prototype.initScore=function()
{
	var k=this.k;
	this.ig.getMClick=mxG.getMClick;
	this.ig.addEventListener("click",function(ev){mxG.D[k].doClickScore(ev);},false);
	if(this.canGobanFocus)
		this.ig.addEventListener("keydown",
			function(ev){mxG.D[k].doKeydownGobanForScore(ev);},false);
	if(this.scoreBtnOn)
		this.addBtn(this.getE("ScoreDiv"),{n:"Score",v:this.alias("Score","scoreAlias")});
};
mxG.G.prototype.createScore=function()
{
	this.scoreBtnOn=this.setA("scoreBtnOn",0,"bool");
	this.ephemeralScore=this.setA("ephemeralScore",0,"bool");
	this.scoreAlias=this.setA("scoreAlias",null,"string");
	this.scoreDefaultRules=this.setA("scoreDefaultRules",null,"string");
	this.scoreInComment=this.setA("scoreInComment",0,"bool");
	this.scoreMethod=this.setA("scoreMethod","trivial","string");
	this.canPlaceScore=0;
	return this.createBtnBox("Score");
};
}
// maxiGos v7 > mgosSgf.js
if(!mxG.G.prototype.createSgf)
{
mxG.fr(" Close ","Fermer");
mxG.fr("SGF","SGF");
mxG.fr("SGF_Short","S");
mxG.fr("SGF_Long","Télécharger le SGF");
mxG.en("SGF_Short","S");
mxG.en("SGF_Long","Download SGF");
mxG.nl2br=function(s)
{
	return (s+'').replace(/\r\n|\n\r|\r|\n/g,'<br>');
};
mxG.sgfEsc=function(s)
{
	return (s+'').replace(/([^\\\]]?)(\\|])/g,'$1'+"\\"+'$2');
};
mxG.G.prototype.runTransform=function(x,s)
{
	var c1,c2,c3,c4,n1,n2,n3,n4,r,D,DX,DY;
	if(this.transform)
	{
		if(x=='SZ')
		{
			if(this.transform==3) r=s.replace(/^([0-9]+):([0-9]+)$/,"$2:$1");
			else r=s;
			this.sz=r;
		}
		else if((x=='B')||(x=='W')||(x=='AB')||(x=='AW')||(x=='AE')
			||(x=='LB')||(x=='MA')||(x=='TR')||(x=='SQ')||(x=='CR')
			||(x=='VW')||(x=='AR')||(x=='DD')||(x=='LN')||(x=='SL')
			)
		{
			D=this.sz.split(":");
			DX=parseInt(D[0]);
			DY=((D.length>1)?parseInt(D[1]):DX);
			c1=s.substring(0,1);
			c2=s.substring(1,2);
			n1=c1.c2n();
			n2=c2.c2n();
			if((x!='LB')&&(s.length==5))
			{
				c3=s.substring(3,4);
				c4=s.substring(4,5);
				n3=c3.c2n();
				n4=c4.c2n();
			}
			if(this.transform==1)
			{
				if(s.length==5)
				{
					r=this.xy2s(n1,DY+1-n4);
					r+=":"+this.xy2s(n3,DY+1-n2);
				}
				else r=this.xy2s(n1,DY+1-n2);
			}
			else if(this.transform==2)
			{
				if(s.length==5)
				{
					r=this.xy2s(DX+1-n3,n2);
					r+=":"+this.xy2s(DX+1-n1,n4);
				}
				else r=this.xy2s(DX+1-n1,n2);
			}
			else if(this.transform==3)
			{
				if(s.length==5)
				{
					r=this.xy2s(n2,DY+1-n3);
					r+=":"+this.xy2s(n4,DY+1-n1);
				}
				else r=this.xy2s(n2,DY+1-n1);
			}
			if(x=='LB') r+=s.substring(2);
		}
		else r=s;
	}
	else r=s;
	return r;
};
mxG.G.prototype.buildAllSgf=function(aN,only,c)
{
	// build sgf tree starting at aN
	// if only&1, keep B, W, AB, AE, AW, FF, CA, GM, SZ, EV, RO, DT, PC, PB, BR, BT, PW, WR, WT, RU, TM, OT, HA, KM, RE, VW only
	// if only&2, keep main variation only
	// if only&4, keep variation on focus only (useful when show)
	// remove empty nodes
	var rc="\n",k,x,y,ym,aText="",first,keep;
	if(c===undefined) c=0;
	if(this.transform&&aN.Dad&&(aN.Dad==this.rN)) this.sz=(aN.P['SZ']?aN.P['SZ']+"":"19");
	if((aN.Dad&&(aN.Dad==this.rN))||(aN.Dad&&(aN.Dad.Kid.length>1)))
	{
		if(only&4) {if((aN.Dad==this.rN)&&(aN==this.kidOnFocus(aN.Dad))) aText+="(";}
		else if(only&2) {if((aN.Dad==this.rN)&&(aN==aN.Dad.Kid[0])) aText+="(";}
		else if((aN.Dad==this.rN)&&(aN==aN.Dad.Kid[0])) aText+="(";
		else {aText+=(rc+"(");c=0;}
	}
	if(aN!=this.rN)
	{
		if(aText[aText.length-1]!="(")
		{
			if(aN.Dad&&aN.Dad.Dad&&(aN.Dad.Dad==this.rN)) {aText+=rc;c=0;}
			else if(c>3) {aText+=rc;c=0;} else c++;
		}
		first=1;
		for(x in aN.P)
		{
			if(x.match(/^[A-Z]+$/))
			{
				if(only&1)
				{
					if((x=="B")||(x=="W")||(x=="AB")||(x=="AW")||(x=="AE")
						||(x=="FF")||(x=="CA")||(x=="GM")||(x=="SZ")
						||(x=="EV")||(x=="RO")||(x=="DT")||(x=="PC")
						||(x=="PB")||(x=="BR")||(x=="BT")||(x=="PW")||(x=="WR")||(x=="WT")
						||(x=="RU")||(x=="TM")||(x=="OT")||(x=="HA")||(x=="KM")||(x=="RE")||(x=="VW"))
						keep=1;
					else keep=0;
				}
				else keep=1;
				if(keep)
				{
					if(first) {aText+=";";first=0;} // discard empty node
					if(aN.Dad&&(aN.Dad==this.rN)) {aText+=rc;c=0;}
					else if((x=="TB")||(x=="TW")) {aText+=rc;c=4;}
					aText+=x;
					ym=aN.P[x].length;
					for(y=0;y<ym;y++)
					{
						if(this.transform)
							aText+=("["+mxG.sgfEsc(this.runTransform(x,aN.P[x][y]))+"]");
						else aText+=("["+mxG.sgfEsc(aN.P[x][y])+"]");
					}
				}
			}
		}
	}
	if(aN.Kid&&aN.Kid.length)
	{
		if(only&4) {if(aN!=this.cN) aText+=this.buildAllSgf(this.kidOnFocus(aN),only,c);}
		else if(only&2) aText+=this.buildAllSgf(aN.Kid[0],only,c);
		else for(k=0;k<aN.Kid.length;k++) aText+=this.buildAllSgf(aN.Kid[k],only,c);
	}
	if(only&4) {if((aN.Dad==this.rN)&&(aN==this.kidOnFocus(aN.Dad))) aText+=")";}
	else if(only&2) {if((aN.Dad==this.rN)&&(aN==aN.Dad.Kid[0])) aText+=")";}
	else {if((aN.Dad&&(aN.Dad==this.rN))||(aN.Dad&&(aN.Dad.Kid.length>1))) aText+=")";}
	return aText;
};
mxG.G.prototype.sgfMandatory=function()
{
	var p,km=this.rN.Kid.length;
	for(var k=0;k<km;k++)
	{
		p=this.rN.Kid[k].P;
		p.FF=["4"];
		p.CA=[this.toCharset];
		p.GM=["1"];
		p.AP=["maxiGos:"+mxG.V];
	}
};
mxG.G.prototype.buildSomeSgf=function(only)
{
	this.sgfMandatory();
	return this.buildAllSgf(this.rN,only,0);
};
mxG.G.prototype.buildSgf=function()
{
	this.sgfMandatory();
	return this.buildAllSgf(this.rN,(this.sgfSaveCoreOnly?1:0)+(this.sgfSaveMainOnly?2:0),0);
};
mxG.G.prototype.popupSgf=function()
{
	if(this.sgfPopup&&!this.sgfPopup.closed) this.sgfPopup.close();
	this.sgfPopup=window.open();
	// some browsers (chrome, safari !!!) don't support 'text/plain', thus use default 'text/html'
	// use <pre> tag otherwise line breaks are replaced by spaces
	this.sgfPopup.document.open();
	this.sgfPopup.document.write("<!DOCTYPE html><html><body><pre>\n");
	this.sgfPopup.document.write(this.htmlProtect(this.buildSgf()));
	this.sgfPopup.document.write("\n</pre></body></html>");
	this.sgfPopup.document.close();
	this.sgfPopup.document.title="Sgf"; // not working in all browsers
};
mxG.G.prototype.canDownloadSgf=function()
{
	// also used by File component
	// seems downloaded file is always in UTF-8 (possible to change the charset?)
	// if toCharset is not UTF-8, don't download the file (just display sgf)
	if(this.toCharset!="UTF-8") return 0;
	return (typeof document.createElement('a').download==='string')?1:0;
};
mxG.G.prototype.downloadSgf=function(f)
{
	// also used by File component
	var u,a;
	if(this.canDownloadSgf())
	{
		// Big5, gb18030, Shift_JIS, ... are they usable here?
		u="data:application/octet-stream;charset=utf-8,";
		u+=encodeURIComponent(this.buildSgf());
		a=document.createElement('a');
		document.body.appendChild(a); // firefox requires the link to be in the body
		a.download=f;
		a.href=u;
		a.click();
		document.body.removeChild(a);
	}
	else this.popupSgf(); // just display sgf in the browser
};
mxG.G.prototype.doDownloadSgf=function(f)
{
	this.downloadSgf(f);
};
mxG.G.prototype.doReplaceFromSgf=function()
{
	var s=this.getE("ShowSgfDiv").firstChild.firstChild.value,sgf,k;
	if(s!=this.sgfBeforeEdit)
	{
		this.mayHaveExtraTags=0;
		k=this.rNs.indexOf(this.rN);
		sgf=this.rN.sgf?this.rN.sgf:"";
		if(this.getE("WindowMenuDiv"))
		{
			this.rN.cN=this.cN;
		}
		this.rN=new mxG.P(s,this.sgfLoadCoreOnly,this.sgfLoadMainOnly);
		this.rN.sgf=sgf;
		if(this.getE("WindowMenuDiv")) this.rNs[k]=this.rN;
		this.backNode(this.kidOnFocus(this.rN));
		if(this.hasC("Tree")) this.hasToSetTree=1;
	}
	this.hideGBox("ShowSgf");
};
mxG.G.prototype.doEditSgf=function()
{
	var e;
	if(this.gBox=="ShowSgf") {this.hideGBox("ShowSgf");return;}
	if(!this.getE("ShowSgfDiv"))
	{
		var s="";
		// textarea considerably faster than div contenteditable when pasting big sgf
		s="<div class=\"mxShowContentDiv\">";
		s+="<textarea>";
		s+="</textarea>";
		s+="</div>";
		s+="<div class=\"mxOKDiv\">";
		s+="<button type=\"button\" onclick=\""+this.g+".doReplaceFromSgf()\"><span>"+this.local("OK")+"</span></button>";
		s+="<button type=\"button\" onclick=\""+this.g+".hideGBox('ShowSgf')\"><span>"+this.local("Cancel")+"</span></button>";
		s+="</div>";
		this.createGBox("ShowSgf").innerHTML=s;
	}
	this.sgfBeforeEdit=this.buildSgf();
	e=this.getE("ShowSgfDiv").firstChild.firstChild;
	e.value=this.sgfBeforeEdit;
	this.showGBox("ShowSgf");
};
mxG.G.prototype.doShowSgf=function()
{
	var e;
	if(this.gBox=="ShowSgf") {this.hideGBox("ShowSgf");return;}
	if(!this.getE("ShowSgfDiv"))
	{
		let s,z=this.k;
		s="<div class=\"mxShowContentDiv\" tabindex=\"0\">";
		s+="</div>";
		s+="<div class=\"mxOKDiv\">";
		s+="<button type=\"button\"><span>"+this.local(" Close ")+"</span></button>";
		s+="</div>";
		this.createGBox("ShowSgf").innerHTML=s;
		btn=this.getE("ShowSgfDiv").querySelector(".mxOKDiv button");
		btn.addEventListener("click",function(){mxG.D[z].hideGBox('ShowSgf');},false);
	}
	e=this.getE("ShowSgfDiv").firstChild;
	e.innerHTML=this.htmlProtect(this.buildSgf());
	this.showGBox("ShowSgf");
};
mxG.G.prototype.doSgf=function()
{
	if(this.sgfAction=="download")
		this.doDownloadSgf(this.rN.sgf?this.rN.sgf:"maxiGos.sgf");
	else if(this.sgfAction=="edit") this.doEditSgf();
	else this.doShowSgf();
};
mxG.G.prototype.updateSgf=function()
{
	if(this.getE("SgfBtn"))
	{
		if(this.gBox=="ShowSgf") this.selectBtn("Sgf");
		else this.unselectBtn("Sgf");
	}
};
mxG.G.prototype.initSgf=function()
{
	if(this.sgfBtnOn)
		this.addBtn(this.getE("SgfDiv"),{n:"Sgf",v:this.alias("SGF","sgfAlias")});
};
mxG.G.prototype.createSgf=function()
{
	this.sgfAction=this.setA("sgfAction","show","string");
	this.sgfAlias=this.setA("sgfAlias",null,"string");
	this.sgfBtnOn=this.setA("sgfBtnOn",0,"bool");
	this.toCharset=this.setA("toCharset","UTF-8","string");
	return this.createBtnBox("Sgf");
};
}
// maxiGos v7 > mgosEdit.js
if(!mxG.G.prototype.createEdit)
{
mxG.fr("Cut","Couper");
mxG.fr("Copy","Copier");
mxG.fr("Paste","Coller");
mxG.fr("Remove comments","Supprimer les commentaires");
mxG.fr("Selection","Sélection");
mxG.fr("Full/partial view","Vue partielle/totale");
mxG.fr("Place a move","Placer un coup");
mxG.fr("Add/remove a stone","Ajouter/retirer une pierre");
mxG.fr("Add/remove a black stone","Ajouter/retirer une pierre noire");
mxG.fr("Add/remove a white stone","Ajouter/retirer une pierre blanche");
mxG.fr("Cut branch","Couper une branche");
mxG.fr("Copy branch","Copier une branche");
mxG.fr("Paste branch","Coller une branche");
mxG.fr("Label","Étiquette");
mxG.fr("Mark","Marque");
mxG.fr("Circle","Cercle");
mxG.fr("Square","Carré");
mxG.fr("Triangle","Triangle");
mxG.fr("Numbering","Numérotation");
mxG.fr("As in book","Comme dans les livres");
mxG.fr("Indices","Indices");
mxG.fr("Variation marks","Marques sur les variations");
mxG.fr("Variation style","Style des variations");
mxG.fr("Marks and labels","Marques et étiquettes");
mxG.fr("Header","Entête");
mxG.fr("K","L");
mxG.fr("I","I");
mxG.fr("V","V");
mxG.fr("H","E");
mxG.fr("S","S");
mxG.fr("OK","OK");
mxG.fr("Cancel","Annuler");
mxG.fr("New (from this point):","Nouvelle (à partir de cette position) :");
mxG.fr("Modify","Modifier (seulement pour cette partie de l'arbre des coups)");
mxG.fr("Remove","Supprimer (seulement pour cette partie de l'arbre des coups)");
mxG.fr("Start numbering with:","Numéroter en commençant par :");
mxG.fr("No numbering","Ne pas numéroter");
mxG.fr("Good move","Bon coup");
mxG.fr("Bad move","Mauvais coup");
mxG.fr("Doubtful move","Douteux");
mxG.fr("Interesting move","intéressant");
mxG.fr("Good for Black","Bon pour Noir");
mxG.fr("Good for White","Bon pour Blanc");
mxG.fr("Even","Équilibré");
mxG.fr("Unclear","Pas clair");
mxG.fr("Turn in Sgf","Trait dans le Sgf");
mxG.fr("Horizontal mirror","Miroir horizontal");
mxG.fr("Vertical mirror","Miroir vertical");
mxG.fr("Rotate","Rotation");
mxG.fr("Comments","Commentaire");
mxG.G.prototype.setViewFromSelection=function()
{
	var aN,s,xl,yt,xr,yb,exXl,exYt,exXr,exYb,exXls,exYts,exXrs,exYbs;
	if(this.selection)
	{
		xl=((this.editXrs>this.editXls)?this.editXls:this.editXrs);
		yt=((this.editYbs>this.editYts)?this.editYts:this.editYbs);
		xr=((this.editXrs>this.editXls)?this.editXrs:this.editXls);
		yb=((this.editYbs>this.editYts)?this.editYbs:this.editYts);
		if(xl<1) xl=1;
		if(yt<1) yt=1;
		if(xr>this.DX) xr=this.DX;
		if(yb>this.DY) yb=this.DY;
		this.inSelect=0;
		this.unselectView();
	}
	else
	{
		xl=1;
		yt=1;
		xr=this.DX;
		yb=this.DY;
	}
	if((xl==1)&&(yt==1)&&(xr==this.DX)&&(yb==this.DY)) s="";
	else s=this.xy2s(xl,yt)+":"+this.xy2s(xr,yb);
	aN=this.cN;
	if(aN.P.VW)
	{
		aN.TakeOff("VW",-1);
		if(s) aN.P.VW=[s];
	}
	else aN.P.VW=[s];
	this.updateAll();
};
mxG.G.prototype.selectPoint=function(x,y)
{
	this.scr.addSelect(x,y);
};
mxG.G.prototype.unselectPoint=function(x,y)
{
	this.scr.removeSelect(x,y);
};
mxG.G.prototype.unselectTool=function(tool)
{
	if(!tool||!this.hasEditTool(tool)) return;
	this.getE(tool+"Tool").className="mxUnselectedEditTool";
};
mxG.G.prototype.selectTool=function(tool)
{
	if(!tool||!this.hasEditTool(tool)) return;
	this.getE(tool+"Tool").className="mxSelectedEditTool";
};
mxG.G.prototype.superSelectTool=function(tool)
{
	if(!tool||!this.hasEditTool(tool)) return;
	this.getE(tool+"Tool").className="mxSuperSelectedEditTool";
};
mxG.G.prototype.disableTool=function(tool)
{
	if(!tool||!this.hasEditTool(tool)) return;
	if(tool=="Comment") this.getE("CommentToolText").disabled=true;
	else this.getE(tool+"Tool").disabled=true;
};
mxG.G.prototype.enableTool=function(tool)
{
	if(!tool||!this.hasEditTool(tool)) return;
	if(tool.substring(0,4)=="Void") this.getE(tool+"Tool").disabled=true;
	else if(tool=="Comment") this.getE("CommentToolText").disabled=false;
	else this.getE(tool+"Tool").disabled=false;
};
mxG.G.prototype.disableTools=function()
{
	var k,km=this.tools.length;
	for(k=0;k<km;k++) this.disableTool(this.tools[k]);
	this.disableTool("Comment");
};
mxG.G.prototype.enableTools=function()
{
	var k,km=this.tools.length;
	for(k=0;k<km;k++) this.enableTool(this.tools[k]);
	this.enableTool("Comment");
};
mxG.G.prototype.changeSelectedTool=function(newTool)
{
	if(this.selection) this.unselectView();
	if(this.editTool&&(this.editTool!="ShowInfo")&&(this.editTool!="Numbering"))
		this.unselectTool(this.editTool);
	this.editTool=newTool;
	if((newTool!="ShowInfo")&&(newTool!="Numbering")) this.selectTool(newTool);
};
mxG.G.prototype.doCut=function()
{
	var aN,SZ,ST,z=this.k;
	if(this.hasC("Menu")) this.toggleMenu("Edit",0);
	this.selectTool("Cut");
	this.zN=this.cN;
	aN=this.zN.Dad;
	this.zN.Dad=null;
	if((aN==this.rN)&&(aN.Kid.length==1))
	{
		SZ=this.getInfoS("SZ");
		ST=this.getInfoS("ST");
	}
	aN.Kid.splice(aN.Focus-1,1);
	aN.Focus=aN.Kid.length?1:0;
	if(aN==this.rN)
	{
		if(aN.Focus) aN=aN.Kid[0];
		else
		{
			aN=new mxG.N(aN,"FF",4);
			aN.P.GM=["1"];
			aN.P.CA=["UTF-8"];
			aN.P.SZ=[SZ];
			aN.P.ST=[ST];
		}
	}
	this.backNode(aN);
	if(this.hasC("Tree")) this.hasToSetTree=1;
	this.updateAll();
	setTimeout(function(){mxG.D[z].unselectTool("Cut");},200);
};
mxG.G.prototype.doCopy=function()
{
	var z=this.k;
	if(this.hasC("Menu")) this.toggleMenu("Edit",0);
	this.selectTool("Copy");
	this.zN=this.cN.Clone(null);
	this.zN.Dad=null;
	setTimeout(function(){mxG.D[z].unselectTool("Copy");},200);
};
mxG.G.prototype.doPaste=function()
{
	var z=this.k;
	if(this.hasC("Menu")) this.toggleMenu("Edit",0);
	this.selectTool("Paste");
	if(this.zN)
	{
		if(this.zN.P.SZ) this.cN=this.rN;
		this.zN.Dad=this.cN;
		this.cN.Kid[this.cN.Kid.length]=this.zN;
		this.zN=this.zN.Clone(null);
		this.cN.Focus=this.cN.Kid.length;
		this.backNode((this.cN==this.rN)?this.kidOnFocus(this.cN):this.cN);
		if(this.hasC("Tree")) this.hasToSetTree=1;
		this.updateAll();
	}
	setTimeout(function(){mxG.D[z].unselectTool("Paste");},200);
};
mxG.G.prototype.doRemoveComments=function()
{
	var sgf,sgf1,sgf2,k;
	if(this.hasC("Menu")) this.toggleMenu("Edit",0);
	if(!this.hasC("Sgf")) return;
	sgf1=this.buildSgf();
	sgf2=sgf1.replace(/(\n|;|\])C\[([^\[\]]+|(\[[^\[\]]+\])?)*\]/g,'$1');
	if(sgf2!=sgf1)
	{
		this.mayHaveExtraTags=0;
		k=this.rNs.indexOf(this.rN);
		sgf=this.rN.sgf?this.rN.sgf:"";
		if(this.getE("WindowMenuDiv"))
		{
			this.rN.cN=this.cN;
		}
		this.rN=new mxG.P(sgf2,this.sgfLoadCoreOnly,this.sgfLoadMainOnly);
		this.rN.sgf=sgf;
		if(this.getE("WindowMenuDiv")) this.rNs[k]=this.rN;
		this.backNode(this.kidOnFocus(this.rN));
		if(this.hasC("Tree")) this.hasToSetTree=1;
		this.updateAll();
	}
}
mxG.G.prototype.doAsInBook=function()
{
	var aN=this.cN,sN=this.kidOnFocus(this.rN),exFig=0,newFig,newAsInBookOn=(this.asInBookOn?0:1);
	while(aN!=this.rN)
	{
		if(aN.P.FG) {exFig=parseInt(aN.P.FG[0]);break;}
		aN=aN.Dad;
	}
	if(aN==this.rN) aN=sN;
	newFig=(newAsInBookOn?(exFig|256):(exFig&~256));
	if((aN==sN)&&!newFig) aN.TakeOff("FG",0);
	else aN.Set("FG",newFig);
	this.updateAll();
};
mxG.G.prototype.doIndices=function()
{
	var aN=this.cN,sN=this.kidOnFocus(this.rN),exFig=0,newFig,newIndicesOn;
	newIndicesOn=(this.indicesOn?0:1);
	while(aN!=this.rN)
	{
		if(aN.P.FG) {exFig=parseInt(aN.P.FG[0]);break;}
		aN=aN.Dad;
	}
	if(aN==this.rN) aN=sN;
	newFig=newIndicesOn?(exFig&~1):(exFig|1);
	if((aN==sN)&&!newFig) aN.TakeOff("FG",0);
	else aN.Set("FG",newFig);
	this.updateAll();
};
mxG.G.prototype.doNumberingOK=function()
{
	var aN;
	if(this.getE("NewFigureBox")&&this.getE("NewFigureBox").checked) aN=this.cN;
	else
	{
		aN=this.cN;
		while((aN.Dad!=this.rN)&&!(aN.P.FG)) aN=aN.Dad;
	}
	if(this.getE("FigureOrNot2Input")&&this.getE("FigureOrNot2Input").checked)
	{
		aN.TakeOff("FG",0);
		aN.TakeOff("PM",0);
		aN.TakeOff("MN",0);
	}
	else
	{
		var newNumberingOn=(this.getE("NumberingOrNot1Input").checked?1:0);
		var newNumWith=parseInt(this.getE("NumWithTextInput").value);
		var newAsInBookOn=(this.getE("AsInBookInput").checked?1:0);
		var newIndicesOn=(this.getE("IndicesInput").checked?1:0);
		var newFigure=((newAsInBookOn?256:0)|(newIndicesOn?0:1));
		if(aN==this.kidOnFocus(this.rN))
		{
			if(newFigure) aN.Set("FG",newFigure);
			else aN.TakeOff("FG",0);
			if((newNumWith>1)&&newNumberingOn) aN.Set("MN",newNumWith);
			else aN.TakeOff("MN",0);
			if(newNumberingOn!=1) aN.Set("PM",newNumberingOn);
			else aN.TakeOff("PM",0);
		}
		else
		{
			aN.Set("FG",newFigure);
			aN.Set("PM",newNumberingOn);
			if(newNumberingOn) aN.Set("MN",newNumWith);
			else aN.TakeOff("MN",0);
		}
	}
	if(this.hasC("Tree")) this.hasToSetTree=1;
	this.hideGBox("Numbering");
};
mxG.G.prototype.switchFigureOrNot=function()
{
	var e;
	if(this.getE("NewFigureBox").checked)
	{
		if(e=this.getE("FigureOrNot1P")) e.style.display="none";
		else if(e=this.getE("FigureOrNot2P")) e.style.display="none";
	}
	else
	{
		if(e=this.getE("FigureOrNot1P")) e.style.display="block";
		else if(e=this.getE("FigureOrNot2P")) e.style.display="block";
	}
};
mxG.G.prototype.doNumbering=function()
{
	if(this.gBox=="Numbering") {this.hideGBox("Numbering");return;}
	if(!this.getE("NumberingDiv")) this.createGBox("Numbering");
	var aN=this.cN,s="",a;
	while((aN.Dad!=this.rN)&&!aN.P.FG) aN=aN.Dad;
	a=" tabindex=\"0\"";
	s+="<div class=\"mxShowContentDiv\""+a+">";
	s+="<h1>"+this.local("Numbering")+"</h1>";
	if(aN!=this.cN)
	{
		s+="<div class=\"mxP\"><label for=\""+this.n+"NewFigureBox\">"+this.local("New (from this point):")+" </label>";
		s+="<input type=\"checkbox\" "+"id=\""+this.n+"NewFigureBox\" onclick=\""+this.g+".switchFigureOrNot()\">";
		s+="</div>";
	}
	if((aN.Dad!=this.rN)&&aN.P.FG) 
	{
		s+="<div class=\"mxP mxFigureOrNotP\" id=\""+this.n+"FigureOrNot1P\"><input type=\"radio\" id=\""+this.n+"FigureOrNot1Input\" name=\"figureOrNot\" checked value=\"1\">";
		s+="<label for=\""+this.n+"FigureOrNot1Input\">"+this.local("Modify")+"</label>";
		s+="</div>";
	}
	s+="<div class=\"mxP mxTabNumberingP\">";
	s+="<input type=\"radio\" id=\""+this.n+"NumberingOrNot1Input\" name=\"numberingOrNot\"";
	s+=(this.numberingOn?" checked":"");
	s+=" value=\"1\">";
	s+="<label for=\""+this.n+"NumberingOrNot1Input\">"+this.local("Start numbering with:")+" </label>";
	s+="<input type=\"text\" id=\""+this.n+"NumWithTextInput\" size=\"3\" maxlength=\"3\" value=\""+1+"\"><br>";
	s+="<input type=\"radio\" id=\""+this.n+"NumberingOrNot2Input\" name=\"numberingOrNot\"";
	s+=(!this.numberingOn?" checked":"");
	s+=" value=\"2\">";
	s+="<label for=\""+this.n+"NumberingOrNot2Input\">"+this.local("No numbering")+"</label><br><br>";
	s+="<input type=\"checkbox\""+(this.asInBookOn?" checked":"")+" id=\""+this.n+"AsInBookInput\"> "+this.local("As in book")+"<br>";
	s+="<input type=\"checkbox\""+(this.indicesOn?" checked":"")+" id=\""+this.n+"IndicesInput\"> "+this.local("Indices")+"<br>";
	s+="</div>";
	if((aN.Dad!=this.rN)&&aN.P.FG)
	{
		s+="<div class=\"mxP mxFigureOrNotP\" id=\""+this.n+"FigureOrNot2P\"><input type=\"radio\" id=\""+this.n+"FigureOrNot2Input\" name=\"figureOrNot\" value=\"2\">";
		s+="<label for=\""+this.n+"FigureOrNot2Input\">"+this.local("Remove")+"</label></div>";
	}
	s+="</div>";
	s+="<div class=\"mxOKDiv\">";
	s+="<button type=\"button\" onclick=\""+this.g+".doNumberingOK()\"><span>"+this.local("OK")+"</span></button>";
	s+="<button type=\"button\" onclick=\""+this.g+".hideGBox('Numbering')\"><span>"+this.local("Cancel")+"</span></button>";
	s+="</div>";
	this.getE("NumberingDiv").innerHTML=s;
	this.showGBox("Numbering");
};
mxG.G.prototype.doVariation=function()
{
	if(this.styleMode&2) this.styleMode-=2;else this.styleMode+=2;
	this.kidOnFocus(this.rN).Set("ST",this.styleMode&~4);
	this.updateAll();
};
mxG.G.prototype.doStyle=function()
{
	if(this.styleMode&1) this.styleMode-=1;else this.styleMode+=1;
	this.kidOnFocus(this.rN).Set("ST",this.styleMode&~4);
	this.updateAll();
};
mxG.G.prototype.doPropertySwitch=function(tool)
{
	var z;
	if((tool!="DO")&&(tool!="IT")) z=2;else z=1;
	if(this.cN.P&&this.cN.P[tool])
	{
		if(((this.cN.P[tool][0]+"")=="1")&&(z>1)) this.cN.P[tool][0]="2";
		else this.cN.TakeOff(tool,0);
	}
	else
	{
		if((tool=="GB")||(tool=="GW")||(tool=="DM")||(tool=="UC"))
		{
			if((tool!="GB")&&this.cN.P&&this.cN.P.GB) this.cN.TakeOff("GB",0);
			if((tool!="GW")&&this.cN.P&&this.cN.P.GW) this.cN.TakeOff("GW",0);
			if((tool!="DM")&&this.cN.P&&this.cN.P.DM) this.cN.TakeOff("DM",0);
			if((tool!="UC")&&this.cN.P&&this.cN.P.UC) this.cN.TakeOff("UC",0);
		}
		if((tool=="TE")||(tool=="BM")||(tool=="DO")||(tool=="IT"))
		{
			if((tool!="TE")&&this.cN.P&&this.cN.P.TE) this.cN.TakeOff("TE",0);
			if((tool!="BM")&&this.cN.P&&this.cN.P.BM) this.cN.TakeOff("BM",0);
			if((tool!="DO")&&this.cN.P&&this.cN.P.DO) this.cN.TakeOff("DO",0);
			if((tool!="IT")&&this.cN.P&&this.cN.P.IT) this.cN.TakeOff("IT",0);
		}
		this.cN.Set(tool,(z>1)?"1":"");
	}
	this.updateAll();
};
mxG.G.prototype.doPL=function()
{
	if(this.cN.P&&this.cN.P.PL) this.cN.TakeOff("PL",0);
	else this.cN.Set("PL",this.editNextNat);
	this.updateAll();
};
mxG.G.prototype.doTransform=function(transform)
{
	var s,z,a=[],aN,n,k,sgf;
	if(this.hasC("Sgf"))
	{
		aN=this.cN;
		while(aN)
		{
			a.push(aN.Focus);
			aN=aN.Dad;
		}
		this.transform=transform;
		s=this.buildSgf();
		this.transform=0;
		this.mayHaveExtraTags=0;
		k=this.rNs.indexOf(this.rN);
		sgf=this.rN.sgf?this.rN.sgf:"";
		this.rN=new mxG.P(s,this.sgfLoadCoreOnly,this.sgfLoadMainOnly);
		this.rN.Focus=a.pop();
		this.rN.sgf=sgf;
		this.rNs[k]=this.rN;
		this.backNode(this.kidOnFocus(this.rN));
		if(this.hasC("Tree")) this.hasToSetTree=1;
		while(a.length) {this.cN.Focus=a.pop();if(a.length) this.placeNode();}
		this.updateAll();
	}
};
mxG.G.prototype.doEditTool=function(newTool)
{
	if(this.gBox) {if(newTool==this.gBox) this.hideGBox(newTool);return;}
	if(newTool=="ShowInfo") {this.doInfo();return;}
	if(newTool=="Numbering") {this.doNumbering();return;}
	if(newTool=="Cut") {this.doCut();return;}
	if(newTool=="Copy") {this.doCopy();return;}
	if(newTool=="Paste") {this.doPaste();return;}
	if(newTool=="AsInBook") {this.doAsInBook();return;}
	if(newTool=="Indices") {this.doIndices();return;}
	if(newTool=="Variation") {this.doVariation();return;}
	if(newTool=="Style") {this.doStyle();return;}
	if((newTool=="GB")
	  ||(newTool=="GW")
	  ||(newTool=="DM")
	  ||(newTool=="UC")
	  ||(newTool=="TE")
	  ||(newTool=="BM")
	  ||(newTool=="DO")
	  ||(newTool=="IT")) {this.doPropertySwitch(newTool);return;}
	if(newTool=="PL") {this.doPL();return;}
	if(newTool=="View")
	{
		let z=this.k;
		this.selectTool(newTool);
		this.setViewFromSelection();
		setTimeout(function(){mxG.D[z].unselectTool(newTool);},200);
		if(this.editTool=="Select") this.changeSelectedTool("Play");
		return;
	}
	if(this.selection) {this.inSelect=0;this.unselectView();}
	if((newTool=="Play")&&(this.editTool=="Play"))
	{
		if(this.editNextNat=="B") {this.editNextNat="W";this.drawSvgTool("Play");}
		else if(this.editNextNat=="W") {this.editNextNat="B";this.drawSvgTool("Play");}
		return;
	}
	if((newTool=="Setup")&&(this.editTool=="Setup"))
	{
		if(this.editAX=="AB") {this.editAX="AW";this.drawSvgTool("Setup");}
		else if(this.editAX=="AW") {this.editAX="AB";this.drawSvgTool("Setup");}
		return;
	}
	if((newTool=="SetupBlack")&&(this.editTool!="SetupBlack"))
	{
		this.editAX="AB";
		this.changeSelectedTool("SetupBlack");
		return;
	}
	if((newTool=="SetupWhite")&&(this.editTool!="SetupWhite"))
	{
		this.editAX="AW";
		this.changeSelectedTool("SetupWhite");
		return;
	}
	if(newTool=="VM") {this.doTransform(1);return;}
	if(newTool=="HM") {this.doTransform(2);return;}
	if(newTool=="R") {this.doTransform(3);return;}
	this.changeSelectedTool(newTool);
};
mxG.G.prototype.doEditCommentTool=function()
{
	var s=this.getE("CommentToolText").value;
	if(s) this.cN.Set("C",s);
	else this.cN.TakeOff("C",0);
};
mxG.G.prototype.getNextEditNat=function()
{
	var aN,k,km;
	
	// get color from PL
	aN=this.cN;
	if(aN.P.PL) return aN.P.PL[0];
	// get color of this.kidOnFocus(this.cN)
	aN=this.kidOnFocus(this.cN);
	if(aN)
	{
		if(aN.P.B) return "B";
		if(aN.P.W) return "W";
	}
	
	// get opposite color of cN
	aN=this.cN;
	if(aN.P.B) return "W";
	if(aN.P.W) return "B";
	// get opposite color if cN has AB and no AW (handicap game?) or AW and no AB, 
	if(aN.P.AB&&!aN.P.AW) return "W";
	else if(aN.P.AW&&!aN.P.AB) return "B";
	// get color of cN children
	km=this.cN.Kid.length;
	for(k=0;k<km;k++)
	{
		aN=this.cN.Kid[k];
		if(aN.P.B) return "B";
		if(aN.P.W) return "W";
	}
	// get opposite color of cN brothers
	km=this.cN.Dad.Kid.length;
	for(k=0;k<km;k++)
	{
		aN=this.cN.Dad.Kid[k];
		if(aN.P.B) return "W";
		if(aN.P.W) return "B";
	}
	// unable to decide who will play
	return "B";
};
mxG.G.prototype.checkEditPlay=function(a,b)
{
	var nextNat=this.editNextNat,
		s,aN,x,y,nat,k,km;
	if(!nextNat) {this.plonk();return;}
	if((a||b)&&this.gor.isOccupied(a,b)) {this.plonk();return;}
	k=0;
	km=this.cN.Kid.length;
	while(k<km)
	{
		aN=this.cN.Kid[k];
		x=-1;
		y=-1;
		nat="O";
		s="";
		if(aN.P.B) {s=aN.P.B[0];nat="B";}
		else if(aN.P.W) {s=aN.P.W[0];nat="W";}
		if(s.length==2) {x=s.c2n(0);y=s.c2n(1);}
		else if(s.length==0) {x=0;y=0;}
		
		if((x==a)&&(y==b)&&(nat==nextNat)) // there is already a nextNat move on (a,b) thus place it
		{
			this.cN.Focus=k+1;
			this.backNode(this.cN); // why?
			this.placeNode();
			this.updateAll();
			return;
		}
		else k++;
	}
	// (a,b) was not found in the sgf thus add it
	this.addPlay(nextNat,a,b);
	this.placeNode();
	if(this.hasC("Tree")) this.hasToSetTree=1;
	this.updateAll();
};
mxG.G.prototype.checkEditSetup=function(x,y,setupTool="Setup")
{
	// if a B or W is in cN, add AX values on a new cN kids
	// else add/remove AX values on cN
	var aN,p,v,k,km,kp;
	var AX=["AB","AW","AE"];
	if(!this.inView(x,y)) return;
	if(this.gor.getBanNat(x,y)!="E") p="AE";else p=this.editAX;
	v=this.xy2s(x,y);
	if(this.cN.P.B||this.cN.P.W)
	{
		aN=new mxG.N(this.cN,p,v);
		this.cN.Focus=this.cN.Kid.length;
		this.placeNode();
		if(this.hasC("Tree")) this.hasToSetTree=1;
		this.updateAll();
		this.changeSelectedTool(setupTool);
	}
	else
	{
		aN=this.cN;
		// remove AX[x y] if any
		for(kp=0;kp<3;kp++)
		{
			if(aN.P[AX[kp]])
			{
				km=aN.P[AX[kp]].length;
				for(k=0;k<km;k++) if(aN.P[AX[kp]][k]==v) break;
				if(k<km) aN.TakeOff(AX[kp],k);
			}
		}
		// add p[x y] only if something is changed
		this.backNode(aN.Dad);
		aExNat=this.gor.getBanNat(x,y);
		if(aExNat!=p.substring(1,2))
		{
			if(aN.P[p]) aN.P[p].push(v);
			else aN.P[p]=[v];
		}
		this.placeNode(aN);
		this.updateAll();
	}
};
mxG.G.prototype.selectGobanArea=function(x,y)
{
	if((this.editTool=="Select")&&this.inSelect&&((x!=this.editXrs)||(y!=this.editYbs)))
	{
		var id,i,j,xl,yt,xr,yb,xl1,yt1,xr1,yb1,xl2,yt2,xr2,yb2;
		xl1=Math.min(this.editXls,this.editXrs);
		yt1=Math.min(this.editYts,this.editYbs);
		xr1=Math.max(this.editXls,this.editXrs);
		yb1=Math.max(this.editYts,this.editYbs);
		this.editXrs=x;
		this.editYbs=y;
		xl2=Math.min(this.editXls,this.editXrs);
		yt2=Math.min(this.editYts,this.editYbs);
		xr2=Math.max(this.editXls,this.editXrs);
		yb2=Math.max(this.editYts,this.editYbs);
		xl=Math.min(xl1,xl2);
		yt=Math.min(yt1,yt2);
		xr=Math.max(xr1,xr2);
		yb=Math.max(yb1,yb2);
		for(i=xl;i<=xr;i++)
			for(j=yt;j<=yb;j++)
				if((i>=xl2)&&(i<=xr2)&&(j>=yt2)&&(j<=yb2))
				{
					if((i<xl1)||(i>xr1)||(j<yt1)||(j>yb1)) this.selectPoint(i,j);
				}
				else if((i>=xl1)&&(i<=xr1)&&(j>=yt1)&&(j<=yb1)) this.unselectPoint(i,j);
	}
};
mxG.G.prototype.unselectView=function()
{
	var i,j;
	this.selection=0;
	// check all points (easier)
	for(i=0;i<=(this.DX+1);i++)
		for(j=0;j<=(this.DY+1);j++)
			this.unselectPoint(i,j);
};
mxG.G.prototype.selectView=function()
{
	var i,j,xl,yt,xr,yb;
	this.selection=1;
	xl=Math.min(this.editXls,this.editXrs);
	yt=Math.min(this.editYts,this.editYbs);
	xr=Math.max(this.editXls,this.editXrs);
	yb=Math.max(this.editYts,this.editYbs);
	for(i=xl;i<=xr;i++)
		for(j=yt;j<=yb;j++)
			this.selectPoint(i,j);
};
mxG.G.prototype.getNextLabel=function(aLB)
{
	var bLB="";
	if(aLB.match(/^[A-Za-z]$/))
	{
		if(aLB=="Z") bLB="A";
		else if(aLB=="z") bLB="a";
		else bLB=String.fromCharCode(aLB.charCodeAt(0)+1);
	}
	return bLB;
};
mxG.G.prototype.checkEditMarkOrLabel=function(x,y,m)
{
	var v,k,km,kp,aLB,bLB="",MX=["MA","TR","SQ","CR","LB"];
	if(!this.inView(x,y)) return;
	v=this.xy2s(x,y);
	if(m=="LB")
	{
		aLB=this.getE("LabelTool").value;
		v+=":"+aLB;
	}
	for(kp=0;kp<5;kp++)
	{
		if(this.cN.P[MX[kp]])
		{
			km=this.cN.P[MX[kp]].length;
			for(k=0;k<km;k++)
				if(this.cN.P[MX[kp]][k].substring(0,2)==v.substring(0,2)) break;
			if((k==km)&&(MX[kp]==m))
			{
				if(m=="LB") bLB=this.getNextLabel(aLB);
				this.cN.P[m][km]=v;
			}
			else if(k<km)
			{
				if(MX[kp]=="LB") bLB=this.cN.P[MX[kp]][k].substring(3);
				this.cN.TakeOff(MX[kp],k);
			}
		}
		else if(MX[kp]==m)
		{
			if(m=="LB") bLB=this.getNextLabel(aLB);
			this.cN.P[m]=[v];
		}
	}
	if((m=="LB")&&bLB) this.getE("LabelTool").value=bLB;
	this.backNode(this.cN);
	this.updateAll();
};
mxG.G.prototype.doMouseMoveEdit=function(ev)
{
	if((this.editTool=="Select")&&(this.inSelect==1)&&!mxG.isAndroid)
	{
		if(ev.preventDefault) ev.preventDefault();
		var c=this.scr.getC(ev);
		this.selectGobanArea(c.x,c.y);
	}
};
mxG.G.prototype.doMouseDownEditSelect=function(x,y)
{
	if(this.inSelect==1)
	{
		if(mxG.isAndroid) this.selectGobanArea(x,y);
		this.inSelect=0;
	}
	else
	{
		this.inSelect=1;
		if(this.selection) this.unselectView();
		this.editXls=x;
		this.editYts=y;
		this.editXrs=x;
		this.editYbs=y;
		this.selectView();
	}
};
mxG.G.prototype.doMouseDownEdit=function(ev)
{
	if((this.editTool=="Select")&&!mxG.isAndroid)
	{
		var c=this.scr.getC(ev);
		this.doMouseDownEditSelect(c.x,c.y);
	}
};
mxG.G.prototype.doMouseUpEditSelect=function(x,y)
{
	if((x!=this.editXls)&&(y!=this.editYts)) this.inSelect=0;
};
mxG.G.prototype.doMouseUpEdit=function(ev)
{
	if((this.editTool=="Select")&&!mxG.isAndroid)
	{
		var c=this.scr.getC(ev);
		this.doMouseUpEditSelect(c.x,c.y);
	}
};
mxG.G.prototype.doMouseOutEdit=function(ev)
{
	if((this.editTool=="Select")&&!mxG.isAndroid)
	{
		this.inSelect=0;
	}
};
mxG.G.prototype.doKeydownSelect=function(x,y)
{
	if(this.inSelect==2) this.inSelect=0;
	else
	{
		this.inSelect=2;
		if(this.selection) this.unselectView();
		this.editXls=((x==1)?0:((x==this.DX)?this.DX+1:x));
		this.editYts=((y==1)?0:((y==this.DY)?this.DY+1:y));
		this.editXrs=((x==(this.DX+1))?this.DX:((x==0)?1:x));
		this.editYbs=((y==(this.DY+1))?this.DY:((y==0)?1:y));
		this.selectView();
	}
};
mxG.G.prototype.checkEdit=function(x,y)
{
	switch(this.editTool)
	{
		case "Play": this.checkEditPlay(x,y);break;
		case "Setup":
		case "SetupBlack":
		case "SetupWhite": this.checkEditSetup(x,y,this.editTool);break;
		case "Mark": this.checkEditMarkOrLabel(x,y,"MA");break;
		case "Triangle": this.checkEditMarkOrLabel(x,y,"TR");break;
		case "Circle": this.checkEditMarkOrLabel(x,y,"CR");break;
		case "Square": this.checkEditMarkOrLabel(x,y,"SQ");break;
		case "Label": this.checkEditMarkOrLabel(x,y,"LB");break;
		case "Select": if(mxG.isAndroid) this.doMouseDownEditSelect(x,y);break;
	}
};
mxG.G.prototype.doClickEdit=function(ev)
{
	var c;
	if(this.isGobanDisabled()) return;
	if(this.canPlaceEdit)
	{
		c=this.scr.getC(ev);
		this.checkEdit(c.x,c.y);
	}
};
mxG.G.prototype.doKeydownGobanForEdit=function(ev)
{
	var c;
	if(this.gBox&&(this[this.gBox+"Parent"]=="Goban")) return;
	if(this.canPlaceEdit&&this.gobanFocusVisible)
	{
		c=mxG.getKCode(ev);
		if((c==13)||(c==32))
		{
			if(this.editTool=="Select") this.doKeydownSelect(this.xFocus,this.yFocus);
			else this.checkEdit(this.xFocus,this.yFocus);
			ev.preventDefault();
		}
	}
};
mxG.G.prototype.drawSvgTool=function(tool)
{
	var e=this.getE(tool+"Tool"),nat,txt,o;
	o={in3dOn:this.in3dOn,stoneShadowOn:this.stoneShadowOn};
	switch(tool)
	{
		case "Select":
			e.innerHTML=this.scr.makeSelectTool();
			break;
		case "View":
			e.innerHTML=this.scr.makeViewTool();
			break;
		case "Play":
			nat=this.editNextNat;
			if(this.hasEditTool("Setup")) s=this.scr.makeAloneStone(nat,"",o);
			else s=this.scr.makeAloneBiStone(nat,o);
			e.innerHTML=s;
			break;
		case "Setup":
			nat=this.editAX;
			e.innerHTML=this.scr.makeAloneBiStone(nat,o);
			break;
		case "SetupBlack":
			e.innerHTML=this.scr.makeAloneStone("B","",o);
			break;
		case "SetupWhite":
			e.innerHTML=this.scr.makeAloneStone("W","",o);
			break;
		case "Cut":
		case "Copy":
		case "Paste":
			e.innerHTML=this.scr.makeFromPath(this[tool.toLowerCase()+"SvgPath"]);
			break;
		case "Circle":
		case "Mark":
		case "Square":
		case "Triangle":
			e.innerHTML=this.scr.makeAloneMark(tool);
			break;
		case "Numbering":
			e.innerHTML=this.scr.makeAloneStone("W",5,o);break;
		case "ShowInfo":
			e.innerHTML=this.scr.makeAloneToolText(this.local("H"));break;
		case "AsInBook":
			e.innerHTML=this.scr.makeAloneToolText(this.local("K"));break;
		case "Indices":
			e.innerHTML=this.scr.makeAloneToolText(this.local("I"));break;
		case "Variation":
			e.innerHTML=this.scr.makeAloneToolText(this.local("V"));break;
		case "Style":
			e.innerHTML=this.scr.makeAloneToolText(this.local("S"));break;
		case "GB":
			e.innerHTML=this.scr.makeAloneToolText(this.local("●+"));break;
		case "GW":
			e.innerHTML=this.scr.makeAloneToolText(this.local("○+"));break;
		case "DM":
			e.innerHTML=this.scr.makeAloneToolText(this.local("="));break;
		case "UC":
			e.innerHTML=this.scr.makeAloneToolText(this.local("~"));break;
		case "TE":
			e.innerHTML=this.scr.makeAloneToolText(this.local("!"));break;
		case "BM":
			e.innerHTML=this.scr.makeAloneToolText(this.local("?"));break;
		case "DO":
			e.innerHTML=this.scr.makeAloneToolText(this.local("?!"));break;
		case "IT":
			e.innerHTML=this.scr.makeAloneToolText(this.local("!?"));break;
		case "PL":
			e.innerHTML=this.scr.makeAloneToolText(this.local("T"));break;
		case "R":
			e.innerHTML=this.scr.makeAloneToolText(this.local("↺"));break;
		case "VM":
			e.innerHTML=this.scr.makeAloneToolText(this.local("↕"));break;
		case "HM":
			e.innerHTML=this.scr.makeAloneToolText(this.local("↔"));break;
	}
};
mxG.G.prototype.drawEditTools=function()
{
	var k,km=this.tools.length,tool;
	for(k=0;k<km;k++)
	{
		tool=this.tools[k];
		if(tool&&(tool!="Label")) this.drawSvgTool(tool);
	}
	this.hasToSetEditTools=0;
};
mxG.G.prototype.selectDouble=function(tool)
{
	if(this.cN.P&&this.cN.P[tool])
	{
		if((this.cN.P[tool][0]+"")=="2") this.superSelectTool(tool);
		else this.selectTool(tool);
	}
	else this.unselectTool(tool);
};
mxG.G.prototype.selectSingle=function(tool)
{
	if(this.cN.P&&this.cN.P[tool]) this.selectTool(tool);else this.unselectTool(tool);
};
mxG.G.prototype.getCommentWhenEdit=function()
{
	if(this.hasC("Score")&&this.scoreInComment&&this.canPlaceScore)
		return this.buildScore();
	return this.cN.P.C?this.cN.P.C[0]:"";
};
mxG.G.prototype.getInitialMark=function(a)
{
	return a.match(/^([a-z])$/)?"a":"A";
};
mxG.G.prototype.updateEdit=function()
{
	if(this.gBox)
	{
		this.disableTools();
		if((this.gBox=="Numbering")||(this.gBox=="ShowInfo"))
			this.enableTool(this.gBox);
	}
	else if(this.hasC("Score")&&this.canPlaceScore) this.disableTools();
	else this.enableTools();
	this.editNextNat=this.getNextEditNat();
	if(this.hasToSetEditTools) this.drawEditTools();
	else this.drawSvgTool("Play");
	if(this.pN!=this.cN)
	{
		this.getE("LabelTool").value=this.getInitialMark(this.getE("LabelTool").value);
		this.changeSelectedTool("Play");
		this.pN=this.cN;
	}
	if(this.indicesOn) this.selectTool("Indices");else this.unselectTool("Indices");
	if(this.styleMode&2) this.unselectTool("Variation");else this.selectTool("Variation");
	if(this.styleMode&1) this.unselectTool("Style");else this.selectTool("Style");
	if(this.asInBookOn) this.selectTool("AsInBook");else this.unselectTool("AsInBook");
	if(this.extraEditToolsOn)
	{
		this.selectDouble("GB");
		this.selectDouble("GW");
		this.selectDouble("DM");
		this.selectDouble("UC");
		this.selectDouble("TE");
		this.selectDouble("BM");
		this.selectSingle("DO");
		this.selectSingle("IT");
		this.selectSingle("PL");
	}
	if(this.hasEditTool("Comment"))
		this.getE("CommentToolText").value=this.getCommentWhenEdit();
};
mxG.G.prototype.doKeydownLabel=function(ev)
{
	if(mxG.getKCode(ev)==13) this.changeSelectedTool("Label");
};
mxG.G.prototype.getToolLabel=function(tool)
{
	switch(tool)
	{
		case "Select":return "Selection";
		case "View":return "Full/partial view";
		case "Play":return "Place a move";
		case "Setup":return "Add/remove a stone";
		case "SetupBlack":return "Add/remove a black stone";
		case "SetupWhite":return "Add/remove a white stone";
		case "Cut":return "Cut branch";
		case "Copy":return "Copy branch";
		case "Paste":return "Paste branch";
		case "Numbering":return "Numbering";
		case "ShowInfo":return "Header";
		case "Label":return "Label";
		case "Mark":return "Mark";
		case "Circle":return "Circle";
		case "Square":return "Square";
		case "Triangle":return "Triangle";
		case "AsInBook":return "As in book";
		case "Indices":return "Indices";
		case "Variation":return "Variation marks";
		case "Style":return "Variation style";
		case "GB":return "Good for Black";
		case "GW":return "Good for White";
		case "DM":return "Even";
		case "UC":return "Unclear";
		case "TE":return "Good move";
		case "BM":return "Bad move";
		case "DO":return "Doubtful move";
		case "IT":return "Interesting move";
		case "PL":return "Turn in Sgf";
		case "R" :return "Rotate";
		case "VM":return "Vertical mirror";
		case "HM":return "Horizontal mirror";
	}
	return "";
};
mxG.G.prototype.makeTool=function(tool)
{
	var s,id;
	s=" title=\""+this.local(this.getToolLabel(tool))+"\"";
	id=this.n+tool+"Tool";
	s+=" class=\"mxUnselectedEditTool\"";
	s+=" id=\""+id+"\"";
	if(tool=="Label") s="<input"+s+" type=\"text\" value=\"A\">";
	else s="<button"+s+"></button>";
	return s;
};
mxG.G.prototype.buildEditBtns=function()
{
	// for "Menu" component if any
	var s="";
	s+=this.buildBtn({n:"Cut",v:this.local("Cut")});
	s+=this.buildBtn({n:"Copy",v:this.local("Copy")});
	s+=this.buildBtn({n:"Paste",v:this.local("Paste")});
	s+=this.buildBtn({n:"RemoveComments",v:this.local("Remove comments")});
	return s;
};
mxG.G.prototype.initEditTools=function()
{
	var k,km=this.tools.length,tool,e;
	for(k=0;k<km;k++)
	{
		tool=this.tools[k];
		e=this.getE(tool+"Tool");
		if(tool)
		{
			let z=this.k,t=tool;
			e.addEventListener("click",function(){mxG.D[z].doEditTool(t);},false);
			if(tool=="Label")
			{
				e.addEventListener("keydown",function(ev){
					mxG.D[z].doKeydownLabel(ev);},false);
			}
		}
	}
};
mxG.G.prototype.initEdit=function()
{
	var k=this.k;
	if(this.editXls===undefined) this.editXls=this.xl;
	if(this.editYts===undefined) this.editYts=this.yt;
	if(this.editXrs===undefined) this.editXrs=this.xr;
	if(this.editYbs===undefined) this.editYbs=this.yb;
	this.editAX="AB";
	this.editNextNat="B";
	this.initEditTools();
	this.drawEditTools();
	if(!this.editTool) this.changeSelectedTool("Play");
	this.pN=this.cN; // pN: previous node
	this.ig.getMClick=mxG.getMClick;
	this.ig.addEventListener("click",function(ev){mxG.D[k].doClickEdit(ev);},false);
	this.ig.addEventListener("mousemove",function(ev){mxG.D[k].doMouseMoveEdit(ev);},false);
	this.ig.addEventListener("mouseup",function(ev){mxG.D[k].doMouseUpEdit(ev);},false);
	this.ig.addEventListener("mousedown",function(ev){mxG.D[k].doMouseDownEdit(ev);},false);
	this.ig.addEventListener("mouseout",function(ev){mxG.D[k].doMouseOutEdit(ev);},false);
	if(this.canGobanFocus)
		this.ig.addEventListener("keydown",
			function(ev){mxG.D[k].doKeydownGobanForEdit(ev);},false);
	if(this.hasEditTool("Comment"))
	{
		this.getE("CommentToolDiv").addEventListener("click",function(){mxG.D[k].doEditCommentTool();},false);
		this.getE("CommentToolText").addEventListener("change",function(){mxG.D[k].doEditCommentTool();},false);
		this.getE("CommentToolText").value="";
	}
};
mxG.G.prototype.hasEditTool=function(tool)
{
	if(tool=="Comment") return this.editCommentToolOn;
	return this.tools.indexOf(tool)>=0;
};
mxG.G.prototype.createEdit=function()
{
	var s="",k=0,km,m,mm;
	if(this.editCommentToolOn===undefined) this.editCommentToolOn=1;
	if(this.tools===undefined)
		this.tools=[
			"Select","View","Play","Setup","Cut","Copy","Paste",
			"Numbering","ShowInfo","Label","Mark","Circle","Square","Triangle",
			"AsInBook","Indices","Variation","Style",
			"GB","GW","DM","UC","TE","BM","DO","IT","PL","R","VM","HM"];
	this.canPlaceEdit=1;
	this.extraEditToolsOn=1;
	this.et=1; // padding arround canvas tool
	this.zN=null; // cut/copy/paste buffer
	this.cutSvgPath="M167,252C149,252 132,255 117,265 7,333 73,500 226,458 280,443 343,472 367,490 407,521 408,522 367,554 344,571 268,594 234,586 170,571 114,590 86,628 48,679 61,748 104,778 145,806 210,809 245,772 273,740 284,710 281,674 276,619 274,615 370,593 464,570 485,574 669,644 800,694 883,714 920,705 949,698 974,684 974,676 974,667 891,632 792,597 692,562 611,528 611,521 611,513 687,480 782,448 971,381 1002,358 920,338 883,328 801,349 661,402 549,444 447,472 434,464 421,456 375,445 334,437 280,425 266,416 272,369 275,335 263,299 235,275 216,258 189,252 167,252ZM169,286C179,286 190,288 200,293 225,305 241,333 239,360 238,388 219,414 192,423 166,433 136,425 117,405 98,386 92,354 103,329 114,303 141,285 169,286ZM170,623C208,623 240,654 240,693 240,731 208,763 170,763 131,763 100,731 100,693 100,654 131,623 170,623 Z";
	this.copySvgPath="M448,640V405H661 874V640 875H661 448ZM810,747C810,734 746,725 661,725 576,725 512,734 512,747 512,759 576,768 661,768 746,768 810,759 810,747ZM810,640C810,628 746,619 661,619 576,619 512,628 512,640 512,652 576,661 661,661 746,661 810,652 810,640ZM810,533C810,521 746,512 661,512 576,512 512,521 512,533 512,545 576,555 661,555 746,555 810,545 810,533ZM149,384V149H362 576V256 363H490 405V491 619H277 149ZM384,491C384,479 345,469 298,469 251,469 213,479 213,491 213,502 251,512 298,512 345,512 384,502 384,491ZM384,384C384,372 345,363 298,363 251,363 213,372 213,384 213,396 251,405 298,405 345,405 384,396 384,384ZM512,277C512,265 448,256 362,256 277,256 213,265 213,277 213,289 277,299 362,299 448,299 512,289 512,277 Z";
	this.pasteSvgPath="M448,661V426H661 875V661 896H661 448ZM811,768C811,755 747,746 661,746 576,746 512,755 512,768 512,780 576,789 661,789 747,789 811,780 811,768ZM811,661C811,649 747,640 661,640 576,640 512,649 512,661 512,673 576,682 661,682 747,682 811,673 811,661ZM811,554C811,542 747,533 661,533 576,533 512,542 512,554 512,566 576,576 661,576 747,576 811,566 811,554ZM149,512C149,256 168,170 201,275 217,323 273,340 416,340 559,340 615,323 630,275 651,208 683,229 683,309V384H544 405V586 789H277 149ZM234,234C234,181 243,170 286,170 324,170 340,157 345,122 350,85 365,74 416,74 466,74 481,85 486,122 491,157 508,170 545,170 589,170 597,181 597,234V298H416 234 Z";
	this.inSelect=0;
	this.selection=0;
	this.editTool=0;
	s+="<div tabindex=\"-1\"";
	s+=" class=\"mxEditToolBarDiv\" id=\""+this.n+"EditToolBarDiv\">";
	km=this.tools.length;
	for(k=0;k<km;k++) s+=this.makeTool(this.tools[k]);
	s+="</div>";
	if(this.editCommentToolOn)
	{
		s+="<div class=\"mxEditCommentToolDiv\" id=\""+this.n+"CommentToolDiv\">";
		s+="<textarea title=\""+this.local("Comment")+"\" id=\""+this.n+"CommentToolText\"></textarea>";
		s+="</div>";
	}
	return s;
};
}
// maxiGos v7 > mgosInfo.js
if(!mxG.G.prototype.createInfo)
{
mxG.fr("Info","Info");
mxG.fr("OK","OK");
mxG.fr("Cancel","Annuler");
mxG.fr("Event:","Évènement :");
mxG.fr("Round:","Ronde :");
mxG.fr("Black:","Noir :");
mxG.fr("White:","Blanc :");
mxG.fr("Rank:","Niveau :");
mxG.fr("Komi:","Komi :");
mxG.fr("Handicap:","Handicap :");
mxG.fr("Result:","Résultat :");
mxG.fr("Date:","Date :");
mxG.fr("Place:","Lieu :");
mxG.fr("Rules:","Règle :");
mxG.fr("Time limits:","Temps :");
mxG.fr("Overtime:","Byoyomi :");
mxG.fr("Annotations:","Annotations :");
mxG.fr("Copyright:","Copyright :");
mxG.fr("Source:","Source :");
mxG.fr("User:","Utilisateur :");
mxG.fr("Black team:","Équipe de Noir :");
mxG.fr("White team:","Équipe de Blanc :");
mxG.fr("Game name:","Nom de la partie :");
mxG.fr("Opening:","Ouverture :");
mxG.fr("General comment:","Commentaire général :");
mxG.fr("by resign","par abandon");
mxG.fr("by time","au temps");
mxG.fr("by forfeit","par forfait");
mxG.fr("by","de");
mxG.fr("on points","aux points");
mxG.fr("suspended","suspendu");
mxG.fr("Main","Informations principales");
mxG.fr("Other","Autres informations");
mxG.fr("Black","Noir");
mxG.fr("White","Blanc");
mxG.fr(" wins"," gagne");
mxG.fr("no result","sans résultat");
mxG.fr("draw","partie nulle");
mxG.fr("unknown","inconnu");
mxG.fr("Info_Short","E");
mxG.en("Info_Short","H");
mxG.G.prototype.popInfo=function(aPropName)
{
	// pop info from this.kidOnFocus(this.rN)
	// todo: pop it on the convenient node
	var aN;
	aN=this.kidOnFocus(this.rN);
	// assume that this kind of property has only one value
	aN.TakeOff(aPropName,0);
};
mxG.G.prototype.decodeResult=function(a)
{
	this.WN="";
	this.HW="";
	this.SC="";
	if(a)
	{
		this.WN=a.substring(0,1);
		if(this.WN=="0") this.WN="D";
		if(a.substring(1,2)=="+")
		{
			this.WN+="+";
			if(a.substring(2,3)=="R") this.HW="R";
			else if(a.substring(2,3)=="T") this.HW="T";
			else if(a.substring(2,3)=="F") this.HW="F";
			else if(a.length>2)
			{
				this.HW="P";
				this.SC=a.substring(2);
			}
		}
	}
};
mxG.G.prototype.changeInfoStatus=function(el,b)
{
	var c=el.className.replace(" mxBadInput","");
	if(b) el.className=c;else el.className=c+" mxBadInput";
};
mxG.G.prototype.checkRank=function(el,ev)
{
	this.changeInfoStatus(el,(el.value+"").search(/^([0-9]+[kdp]?)?$/)==0);
};
mxG.G.prototype.checkHandicap=function(el,ev)
{
	this.changeInfoStatus(el,!el.value||(((el.value+"").search(/^[0-9]+$/)==0)&&(parseInt(el.value)>1)));
};
mxG.G.prototype.checkReal=function(el,ev)
{
	this.changeInfoStatus(el,(el.value+"").search(/^([0-9]+([.]([0-9]+)?)?)?$/)==0);
};
mxG.G.prototype.encodeResult=function()
{
	var e=this.getE("RE"),WN=this.getE("WN").value,HW;
	if(WN=="D") e.value="Draw";else if(WN=="V") e.value="Void";else e.value=WN;
	if((WN=="B+")||(WN=="W+"))
	{
		HW=this.getE("HW").value;
		if (!HW||(HW="P")) e.value+=this.getE("SC").value;
		else e.value+=HW;
	}
};
mxG.G.prototype.showMainInfoPage=function()
{
	this.getE("MainInfoPage").style.display="";
	this.getE("OtherInfoPage").style.display="none";
	this.getE("MainInfoBtn").className="mxInfoSelectedPageBtn";
	this.getE("OtherInfoBtn").className="mxInfoPageBtn";
};
mxG.G.prototype.showOtherInfoPage=function()
{
	this.getE("MainInfoPage").style.display="none";
	this.getE("OtherInfoPage").style.display="";
	this.getE("MainInfoBtn").className="mxInfoPageBtn";
	this.getE("OtherInfoBtn").className="mxInfoSelectedPageBtn";
};
mxG.G.prototype.buildInfo=function()
{
	var s="";
	this.decodeResult(this.getInfoS("RE"));
	s+="<div class=\"mxInfoPageMenuDiv\">";
	s+="<button class=\"mxInfoSelectedPageBtn\" id=\""+this.n+"MainInfoBtn\" type=\"button\" onclick=\""+this.g+".showMainInfoPage();\">"+this.local("Main")+"</button>";
	s+="<button class=\"mxInfoPageBtn\" id=\""+this.n+"OtherInfoBtn\" type=\"button\" onclick=\""+this.g+".showOtherInfoPage();\">"+this.local("Other")+"</button>";
	s+="</div>\n";
	s+="<div class=\"mxInfoPageDiv\" id=\""+this.n+"MainInfoPage\">";
	s+=("<label class=\"mxEV\"><span>"+this.local("Event:")+"</span><input class=\"mxEV\" id=\""+this.n+"EV\" type=\"text\" value=\"\"></label>");
	s+=("<label class=\"mxRO\"><span>"+this.local("Round:")+"</span><input class=\"mxRO\" id=\""+this.n+"RO\" type=\"text\" value=\"\"></label>");
	s+=("<label class=\"mxDT\"><span>"+this.local("Date:")+"</span><input class=\"mxDT\" id=\""+this.n+"DT\" type=\"text\" value=\"\"></label>");
	s+=("<label class=\"mxPC\"><span>"+this.local("Place:")+"</span><input class=\"mxPC\" id=\""+this.n+"PC\" type=\"text\" value=\"\"></label>");
	s+=("<label class=\"mxPB\"><span>"+this.local("Black:")+"</span><input class=\"mxPB\" id=\""+this.n+"PB\" type=\"text\" value=\"\"></label>");
	s+=("<label class=\"mxBR\"><span>"+this.local("Rank:")+"</span><input class=\"mxBR\" onkeyup=\""+this.g+".checkRank(this,event);\" id=\""+this.n+"BR\" type=\"text\" value=\"\"></label>");
	s+=("<label class=\"mxPW\"><span>"+this.local("White:")+"</span><input class=\"mxPW\" id=\""+this.n+"PW\" type=\"text\" value=\"\"></label>");
	s+=("<label class=\"mxWR\"><span>"+this.local("Rank:")+"</span><input class=\"mxWR\" onkeyup=\""+this.g+".checkRank(this,event);\" id=\""+this.n+"WR\" type=\"text\" value=\"\"></label>");
	s+=("<label class=\"mxKM\"><span>"+this.local("Komi:")+"</span><input class=\"mxKM\" onkeyup=\""+this.g+".checkReal(this,event);\" id=\""+this.n+"KM\" type=\"text\" value=\"\"></label>");
	s+=("<label class=\"mxHA\"><span>"+this.local("Handicap:")+"</span><input class=\"mxHA\" onkeyup=\""+this.g+".checkHandicap(this,event);\" id=\""+this.n+"HA\" type=\"text\" value=\"\"></label>");
	s+="<div class=\"mxResultDiv\">";
	s+="<label class=\"mxWN\" for=\""+this.n+"WN\"><span>"+this.local("Result:")+"</span></label>";
	s+="<select class=\"mxWN\" id=\""+this.n+"WN\">";
	s+=("<option value=\"\"></option>");
	s+=("<option value=\"B+\""+">"+this.local("Black")+this.local(" wins")+"</option>");
	s+=("<option value=\"W+\""+">"+this.local("White")+this.local(" wins")+"</option>");
	s+=("<option value=\"D\""+">"+this.local("draw")+"</option>");
	s+=("<option value=\"V\""+">"+this.local("no result")+"</option>");
	s+=("<option value=\"?\""+">"+this.local("unknown")+"</option>");
	s+=("</select>");
	s+=("<select class=\"mxHW\" id=\""+this.n+"HW\">");
	s+=("<option value=\"\"></option>");
	s+=("<option value=\"P\""+">"+this.local("on points")+"</option>");
	s+=("<option value=\"R\""+">"+this.local("by resign")+"</option>");
	s+=("<option value=\"T\""+">"+this.local("by time")+"</option>");
	s+=("<option value=\"F\""+">"+this.local("by forfeit")+"</option>");
	s+="</select>";
	s+="<label class=\"mxSC\" for=\""+this.n+"SC\"><span>"+this.local("by")+"</span></label>";
	s+="<input class=\"mxSC\" id=\""+this.n+"SC\" onkeyup=\""+this.g+".checkReal(this,event);\" type=\"text\" value=\"\">";
	s+="<input class=\"mxRE\" id=\""+this.n+"RE\" type=\"hidden\" value=\"\">";
	s+="</div>";
	s+="<label class=\"mxGC\"><span>"+this.local("General comment:")+" </span><textarea class=\"mxGC\" id=\""+this.n+"GC\">"+"</textarea></label>";
	s+="</div>";
	s+="<div class=\"mxInfoPageDiv\" id=\""+this.n+"OtherInfoPage\">";
	s+="<label class=\"mxGN\"><span>"+this.local("Game name:")+"</span><input class=\"mxGN\" id=\""+this.n+"GN\" type=\"text\" value=\"\"></label>";
	s+="<label class=\"mxBT\"><span>"+this.local("Black team:")+"</span><input class=\"mxBT\" id=\""+this.n+"BT\" type=\"text\" value=\"\"></label>";
	s+="<label class=\"mxWT\"><span>"+this.local("White team:")+"</span><input class=\"mxWT\" id=\""+this.n+"WT\" type=\"text\" value=\"\"></label>";
	s+="<label class=\"mxRU\"><span>"+this.local("Rules:")+"</span><input class=\"mxRU\" id=\""+this.n+"RU\" type=\"text\" value=\"\"></label>";
	s+="<label class=\"mxTM\"><span>"+this.local("Time limits:")+"</span><input class=\"mxTM\" id=\""+this.n+"TM\" type=\"text\" value=\"\"></label>";
	s+="<label class=\"mxOT\"><span>"+this.local("Overtime:")+"</span><input class=\"mxOT\" id=\""+this.n+"OT\" type=\"text\" value=\"\"></label>";
	s+="<label class=\"mxON\"><span>"+this.local("Opening:")+"</span><input class=\"mxON\" id=\""+this.n+"ON\" type=\"text\" value=\"\"></label>";
	s+="<label class=\"mxAN\"><span>"+this.local("Annotations:")+"</span><input class=\"mxAN\" id=\""+this.n+"AN\" type=\"text\" value=\"\"></label>";
	s+="<label class=\"mxCP\"><span>"+this.local("Copyright:")+"</span><input class=\"mxCP\" id=\""+this.n+"CP\" type=\"text\" value=\"\"></label>";
	s+="<label class=\"mxSO\"><span>"+this.local("Source:")+"</span><input class=\"mxSO\" id=\""+this.n+"SO\" type=\"text\" value=\"\"></label>";
	s+="<label class=\"mxUS\"><span>"+this.local("User:")+"</span><input class=\"mxUS\" id=\""+this.n+"US\" type=\"text\" value=\"\"></label>";
	s+="</div>";
	return s;
};
mxG.G.prototype.putInfoInBox=function()
{
	var p,pm,IX=["EV","RO","DT","PC","PB","BR","PW","WR","HA","KM","RE","GC","RU","TM","OT","AN","CP","SO","US","GN","BT","WT","ON"];
	pm=IX.length;
	for(p=0;p<pm;p++)
		if(this.getE(IX[p]))
		{
			if(IX[p]=="RE")
			{
				this.decodeResult(this.getInfoS("RE"));
				this.getE("RE").value=this.getInfoS("RE");
				if(this.getE("WN")) this.getE("WN").value=this.WN;
				if(this.getE("HW")) this.getE("HW").value=this.HW;
				if(this.getE("SC")) this.getE("SC").value=this.SC;
			}
			else this.getE(IX[p]).value=this.getInfoS(IX[p]);
		}
};
mxG.G.prototype.getInfoFromBox=function()
{
	var p,pm,v,IX=["EV","RO","DT","PC","PB","BR","PW","WR","HA","KM","RE","GC","RU","TM","OT","AN","CP","SO","US","GN","BT","WT","ON"];
	pm=IX.length;
	for(p=0;p<pm;p++)
	{
		if(IX[p]=="RE") this.encodeResult();
		if(this.getE(IX[p])&&(v=this.getE(IX[p]).value)) this.kidOnFocus(this.rN).Set(IX[p],v);
		else this.popInfo(IX[p]);
	}
};
mxG.G.prototype.doInfoOK=function()
{
	this.getInfoFromBox();
	this.hideGBox("ShowInfo");
};
mxG.G.prototype.doInfo=function()
{
	if(this.gBox=="ShowInfo") {this.hideGBox("ShowInfo");return;}
	if(!this.getE("ShowInfoDiv"))
	{
		let s="",a;
		a=" tabindex=\"0\"";
		s+="<div class=\"mxShowContentDiv\" id=\""+this.n+"ShowInfoContentDiv\""+a+"></div>";
		s+="<div class=\"mxOKDiv\">";
		s+="<button type=\"button\" onclick=\""+this.g+".doInfoOK()\"><span>"+this.local("OK")+"</span></button>";
		s+="<button type=\"button\" onclick=\""+this.g+".hideGBox('ShowInfo')\"><span>"+this.local("Cancel")+"</span></button>";
		s+="</div>";
		this.createGBox("ShowInfo").innerHTML=s;
		this.getE("ShowInfoContentDiv").innerHTML=this.buildInfo();
		this.showMainInfoPage();
	}
	this.showGBox("ShowInfo");
	this.putInfoInBox(); // safer after showGBox because of <select> tags
};
mxG.G.prototype.createInfo=function()
{
	return "";
};
}
// maxiGos v7 > mgosTree.js
if(!mxG.G.prototype.createTree)
{
mxG.fr("Game tree","Arbre des coups");
mxG.G.prototype.idt=function(x,y) {return x+"_"+y;};
mxG.G.prototype.getTreeRatio=function()
{
	// return (size in px)/(size in svg corrdinates) ratio 
	var e=this.getE("TreeBlockSvg"+this.idt(0,0)),
		w=this.ddT*this.treeM,
		b=e.getBoundingClientRect();
	return b.width/w;
};
mxG.G.prototype.getCT=function(ev,xo,yo)
{
	var e=this.getE("TreeBlockSvg"+this.idt(xo,yo)),
		w=this.ddT*this.getTreeRatio(),
		c=e.getMClick(ev),
		x,y;
	x=xo+Math.floor(c.x/w);
	y=yo+Math.floor(c.y/w);
	return {x:x,y:y}
};
mxG.G.prototype.doClickTree=function(ev,xo,yo)
{
	var aN,c,x,y;
	if(this.isTreeDisabled()) return;
	c=this.getCT(ev,xo,yo);
	x=c.x;
	y=c.y;
	if((this.tree[y]!=undefined)&&(this.tree[y][x]!=undefined))
	{
		aN=this.tree[y][x];
		this.backNode(aN);
		this.updateAll();
	}
	// keep focus on tree
	// arrow keys are for scrolling the tree
	// if the user want to use arrow keys to navigate,
	// he has to go back to navigation bar
};
mxG.G.prototype.doScrollTree=function(ev)
{
	if(this.treeLock) return;
	var w=this.ddT*this.getTreeRatio(),
		st=this.td.scrollTop,
		y=Math.floor(st/w),
		n=this.treeN,
		ko=Math.floor(y/n),k,km;
	// add visible blocks around block #ko
	this.addVisibleTreeBlocksOnly(ko);
};
mxG.G.prototype.buildOneTreeBlockContainer=function(x,y)
{
	var gr,dd=this.ddT,k=this.k,
		m=this.treeM,n=this.treeN;
	n=Math.min(n,this.treeRowMax-y);
	gr=document.createElementNS("http://www.w3.org/2000/svg","svg");
	gr.setAttribute("id",this.n+"TreeBlockSvg"+this.idt(x,y));
	gr.setAttributeNS(null,"viewBox","0 0 "+(m*dd)+" "+(n*dd));
	gr.setAttributeNS(null,"font-family",this.scr.ff);
	gr.setAttributeNS(null,"font-size",this.scr.fs); // 14 if stone diameter is 23
	gr.setAttributeNS(null,"font-weight",this.scr.fw);
	gr.setAttributeNS(null,"text-anchor","middle");
	gr.setAttributeNS(null,"fill","none");
	gr.setAttributeNS(null,"stroke","none");
	gr.style.display="block";
	gr.style.width="calc("+this.treeM+" * 2.5em)";
	gr.style.maxWidth="none"; // to be sure (some cms may set it to 100%)
	gr.getMClick=mxG.getMClick;
	if(gr.addEventListener)
		gr.addEventListener("click",function(ev){mxG.D[k].doClickTree(ev,x,y);},false);
	return gr;
};
mxG.G.prototype.buildTreeBlocksContainer=function()
{
	var i,j,n,m;
	m=this.treeColumnMax;
	n=this.treeN;
	this.treeBlocks=[];
	k=0;
	for(j=0;j<this.treeRowMax;j=j+n)
		for(i=0;i<this.treeColumnMax;i=i+m)
			this.treeBlocks.push(this.buildOneTreeBlockContainer(i,j));
};
mxG.G.prototype.drawTreeLine=function(s,x,y,c)
{
	var e,d,dd,r,r2,r3,xo,yo,x1,y1,x2,y2,n=this.treeN;
	if(!c) c="#000";
	k=Math.floor(y/n);
	d=this.dT;
	dd=this.ddT;
	r=d/2;
	r2=r/2;
	r3=r2+0.15*d;
	xo=x*dd;
	yo=(y-k*n)*dd;
	x1=xo+r2+r;
	y1=yo+r2+r;
	x2=xo+dd;
	y2=yo+dd;
	gr=this.treeBlocks[k];
	e=document.createElementNS("http://www.w3.org/2000/svg","path");
	e.setAttributeNS(null,"stroke",c);
	e.setAttributeNS(null,"stroke-width",this.scr.sw4grid);
	if(s=="H2L")
		e.setAttributeNS(null,"d","M"+xo+" "+y1+"L"+(xo+r2)+" "+y1);
	else if(s=="D2TL")
		e.setAttributeNS(null,"d","M"+xo+" "+yo+"L"+(xo+r3)+" "+(yo+r3));	
	else if(s=="H2R")
		e.setAttributeNS(null,"d","M"+(x2-r2)+" "+y1+"L"+x2+" "+y1);
	else if(s=="D2BR")
		e.setAttributeNS(null,"d","M"+(x2-r3)+" "+(y2-r3)+"L"+x2+" "+y2);
	else if(s=="V2B")
		e.setAttributeNS(null,"d","M"+x1+" "+(y2-r2)+"L"+x1+" "+y2);
	else if(s=="V1")
		e.setAttributeNS(null,"d","M"+x1+" "+yo+"L"+x1+" "+y2);
	else if(s=="A1")
		e.setAttributeNS(null,"d","M"+x1+" "+yo+"L"+x1+" "+y1+"L"+x2+" "+y2);
	else if(s=="T1")
		e.setAttributeNS(null,"d","M"+x1+" "+yo+"L"+x1+" "+y2+"M"+x1+" "+y1+"L"+x2+" "+y2);
	e.classList.add("mxTreeLine");
	this.treeBlocks[k].appendChild(e);
};
mxG.G.prototype.hasEmphasis=function(aN)
{
	// for customization
	if(aN==this.cN) return this.goodnessCode.Focus;
	return 0;
};
mxG.G.prototype.makeTreeTriangle=function(x,y,d,c,cls)
{
	var e,x1,y1,x2,y2,x3,y3,z;
	z=d*0.32;
	x1=x;
	y1=y-z;
	x2=x-z;
	y2=y+z*0.8;
	x3=x+z;
	y3=y+z*0.8;
	e=document.createElementNS("http://www.w3.org/2000/svg","polygon");
	e.setAttributeNS(null,"fill","none");
	e.setAttributeNS(null,"stroke",c);
	e.setAttributeNS(null,"stroke-width",this.scr.sw4mark);
	e.setAttributeNS(null,"points",x1+" "+y1+" "+x2+" "+y2+" "+x3+" "+y3);
	e.classList.add(cls);
	return e;
};
mxG.G.prototype.buildTreeEmphasis=function(x,y,d,c,cls)
{
	var e,z=d*0.625;
	e=document.createElementNS("http://www.w3.org/2000/svg","rect");
	// use opacity instead of rgba() to be consistent with goban
	// assume c format is #nnnnnnnn at the moment
	e.setAttributeNS(null,"fill",c?c.substring(0,7):"#000");
	e.setAttributeNS(null,"opacity",c?parseInt(c.substring(7,9),16)/255:"0.1");
	e.setAttributeNS(null,"stroke","none");
	e.setAttributeNS(null,"x",x-z);
	e.setAttributeNS(null,"y",y-z);
	e.setAttributeNS(null,"width",z*2);
	e.setAttributeNS(null,"height",z*2);
	e.classList.add(cls);
	return e;
};
mxG.G.prototype.drawTreePoint=function(aN)
{
	var gr,e,d,r,r2,rg,a,cx,cy,
		nat,s="",x,y,xo,yo,xx,yy,dd,c,ac,cls,good,
		n=this.treeN,m=this.treeM;
	if(aN.P["B"]) nat="B";else if(aN.P["W"]) nat="W";else nat="KA";
	if(!this.hideTreeNumbering&&((nat=="B")||(nat=="W")))
	{
		if(aN.P.C&&this.markCommentOnTree) s="?";
		else s=this.getAsInTreeNum(aN)+"";
	}
	x=aN.iTree;
	y=aN.jTree;
	xx=Math.floor(x/m)*m;
	yy=Math.floor(y/n)*n;
	d=this.dT;
	r=d/2;
	r2=r/2;
	dd=this.ddT;
	xo=(x-xx)*dd;
	yo=(y-yy)*dd;
	cx=xo+r2+r;
	cy=yo+r2+r;
	gr=this.treeBlocks[yy/n];
	if(good=this.hasEmphasis(aN))
	{
		c=this.getEmphasisColor(good);
		cls=this.getEmphasisClass(good);
		e=this.buildTreeEmphasis(cx,cy,d,c,cls);
		e.setAttribute("id",this.n+"TreeEmphasis"+this.idt(x,y));
		gr.appendChild(e);
	}
	if((nat=="B")||(nat=="W"))
	{
		c=(nat=="B")?"Black":"White";
		ac=(nat=="B")?"White":"Black";
		if(this.stoneShadowOn)
		{
			let sw=this.scr.stoneShadowWidth;
			e=document.createElementNS("http://www.w3.org/2000/svg","circle");
			e.setAttribute("id",this.n+"TreeNodeShadow"+this.idt(x,y));
			e.setAttributeNS(null,"cx",cx+sw);
			e.setAttributeNS(null,"cy",cy+sw);
			e.setAttributeNS(null,"r",r);
			e.setAttributeNS(null,"fill","#000");
			// use opacity instead of rgba() to be consistent with goban
			e.setAttributeNS(null,"opacity","0.2");
			e.setAttributeNS(null,"stroke","none");
			gr.appendChild(e);
		}
		e=document.createElementNS("http://www.w3.org/2000/svg","circle");
		e.setAttribute("id",this.n+"TreeNode"+this.idt(x,y));
		e.setAttributeNS(null,"cx",cx);
		e.setAttributeNS(null,"cy",cy);
		if(this.in3dOn)
		{
			rg=this.specialStoneOn?"A":"";
			e.setAttributeNS(null,"fill","url(#"+this.n+c[0]+"RG"+rg+")");
			e.setAttributeNS(null,"stroke","none");
			e.setAttributeNS(null,"r",r);
		}
		else
		{
			e.setAttributeNS(null,"fill",c);
			e.setAttributeNS(null,"stroke","Black");
			e.setAttributeNS(null,"stroke-width",this.scr.sw4stone);
			e.setAttributeNS(null,"r",r-(this.scr.sw4stone-1)/2);
		}
		e.classList.add("mx"+c);
		gr.appendChild(e);
		if(this.in3dOn&&this.specialStoneOn)
		{
			e=document.createElementNS("http://www.w3.org/2000/svg","circle");
			e.setAttribute("id",this.n+"TreeNode"+this.idt(x,y));
			e.setAttributeNS(null,"cx",cx);
			e.setAttributeNS(null,"cy",cy);
			e.setAttributeNS(null,"r",r);
			e.classList.add("mx"+c);
			rg=this.specialStoneOn?"B":"";
			if(c=="White")
			{
				a=this.alea8[((x>>1)+y)%8];
				rg+=a?a:"";
			}
			e.setAttributeNS(null,"fill","url(#"+this.n+c[0]+"RG"+rg+")");
			e.setAttributeNS(null,"stroke","none");
			gr.appendChild(e);
		}
		if(s)
		{
			let dy=5; // vertical align need 5/14*font-size
			e=document.createElementNS("http://www.w3.org/2000/svg","text");
			e.setAttributeNS(null,"x",cx);
			e.setAttributeNS(null,"y",cy+dy);
			e.setAttributeNS(null,"fill",ac);
			if(this.scr.sw4text)
			{
				e.setAttributeNS(null,"stroke",ac);
				e.setAttributeNS(null,"stroke-width",this.scr.sw4text);
			}
			if(s.length>1)
			{
				// using svg transform seems to be the safest way to shrink text width
				let v;
				v="translate("+cx+",0)";
				if(s.length>2) v+=" scale(0.8,1)";
				else v+=" scale(0.9,1)";
				v+=" translate(-"+cx+",0)";
				e.setAttributeNS(null,"transform",v);
			}
			e.classList.add="mxOn"+c;
			e.textContent=s;
			gr.appendChild(e);
		}
	}
	else
	{
		e=this.makeTreeTriangle(cx,cy,d,"#000","mxMark");
		e.setAttribute("id",this.n+"TreeNode"+this.idt(x,y));
		gr.appendChild(e);
	}
	if(x)
	{
		// from dad line
		c=this.getEmphasisColor(aN.Good);
		if(this.tree[y][x-1]==aN.Dad) this.drawTreeLine("H2L",x,y,c);
		else this.drawTreeLine("D2TL",x,y,c);
	}
	if(aN.Kid&&aN.Kid.length)
	{
		// to kids lines
		if((this.tree[y][x+1]!=undefined)&&(this.tree[y][x+1]!=undefined)&&(this.tree[y][x+1].Dad==aN))
		{
			c=this.getEmphasisColor(this.tree[y][x+1].Good);
			this.drawTreeLine("H2R",x,y,c);
		}
		if((this.tree[y+1]!=undefined)&&(this.tree[y+1][x+1]!=undefined)&&(this.tree[y+1][x+1].Dad==aN))
		{
			c=this.getEmphasisColor(this.tree[y+1][x+1].Good);
			this.drawTreeLine("D2BR",x,y,c);
		}
		if((this.tree[y+1]!=undefined)&&(this.tree[y+1][x]!=undefined)
			&&((this.tree[y+1][x].Shape==-1)||(this.tree[y+1][x].Shape==-2)||(this.tree[y+1][x].Shape==-3)))
		{
			c=this.getEmphasisColor(this.tree[y+1][x].Good);
			this.drawTreeLine("V2B",x,y,c);
		}
	}
};
mxG.G.prototype.computeGoodness=function(aN,good)
{
	// for customization
	return 0;
};
mxG.G.prototype.buildTree=function(aN,io,jo)
{
	var i=io,j=jo,k,km=aN.Kid.length,l,good=0,path,p,pm;
	if(!this.uC) this.setPl();
	if(j==this.treeRowMax) {this.tree[j]=[];this.treeRowMax++;}
	this.tree[j][i]=aN;
	aN.iTree=i;
	aN.jTree=j;
	for(k=0;k<km;k++)
	{
		path=[];
		while((this.tree[j]!==undefined)&&(this.tree[j][i+1]!==undefined))
		{
			if(this.tree[j][i]===undefined)
			{
				if((this.tree[j+1]===undefined)||(this.tree[j+1][i+1]===undefined))
				{
					if(k==(km-1))
					{
						this.tree[j][i]={Shape:-1,Good:0}; // A1
						path.push({i:i,j:j});
					}
					else
					{
						this.tree[j][i]={Shape:-2,Good:0}; // T1
						path.push({i:i,j:j});
					}
				}
				else
				{
					this.tree[j][i]={Shape:-3,Good:0}; // V1
					path.push({i:i,j:j});
				}
			}
			j++;
		}
		good=good|this.buildTree(aN.Kid[k],i+1,j);
		pm=path.length;
		for(p=0;p<pm;p++) {this.tree[path[p].j][path[p].i].Good=aN.Kid[k].Good;}
	}
	this.treeColumnMax=Math.max(this.treeColumnMax,i+1);
	return aN.Good=this.computeGoodness(aN,good);
};
mxG.G.prototype.drawTreeBlock=function(k,nv)
{
	// draw part of tree only (nv lines from line #k)
	var i,j,jo,jm,c;
	jo=Math.max(0,k);
	jm=Math.min(k+nv,this.treeRowMax);
	for(j=jo;j<jm;j++)
	{
		if(!this.treeCheck[j])
		{
			this.treeCheck[j]=1;
			for(i=0;i<this.treeColumnMax;i++)
				if((this.tree[j]!=undefined)&&(this.tree[j][i]!=undefined))
				{
					if(this.tree[j][i]&&this.tree[j][i].Dad) this.drawTreePoint(this.tree[j][i]);
					else
					{
						// not an object thus add V1, T1, A1
						if(this.tree[j][i]) c=this.getEmphasisColor(this.tree[j][i].Good);
						if(this.tree[j][i]&&(this.tree[j][i].Shape==-1)) this.drawTreeLine("A1",i,j,c);
						else if(this.tree[j][i]&&(this.tree[j][i].Shape==-2)) this.drawTreeLine("T1",i,j,c);
						else if(this.tree[j][i]&&(this.tree[j][i].Shape==-3)) this.drawTreeLine("V1",i,j,c);
					}
				}
		}
	}
};
mxG.G.prototype.afterDrawTree=function()
{
	// for customization
	this.scrollTreeToShowFocus();
};
mxG.G.prototype.drawTree=function()
{
	var nv,k,ko,km,e;
	this.treeCheck=[];
	this.buildTreeBlocksContainer();
	nv=Math.min(this.treeN,this.treeRowMax);
	ko=Math.floor(this.cN.jTree/this.treeN);
	// draw around current node only
	for(k=ko-1;k<=ko+1;k++) this.drawTreeBlock(k*this.treeN,nv);
	km=this.treeBlocks.length;
	// remove previously appended blocks to TreeContentDiv at the very last moment
	while(e=this.tcd.firstChild) this.tcd.removeChild(e); 
	// append blocks to TreeContentDiv
	for(k=0;k<km;k++)
		this.tcd.appendChild(this.treeBlocks[k]);
	this.afterDrawTree();
};
mxG.G.prototype.scrollTreeToShowFocus=function()
{
	var e,i,j,r,
		left,top,right,bottom,width,height,
		scrollLeft,scrollTop;
	if(!this.treeNodeOnFocus) return;
	e=this.td;
	i=this.treeNodeOnFocus.iTree;
	j=this.treeNodeOnFocus.jTree;
	dd=this.ddT;
	r=this.getTreeRatio();
	left=dd*i*r;
	top=dd*j*r;
	right=left+dd*r+1;
	bottom=top+dd*r+1;
	if(e.clientWidth===undefined) return;
	width=e.clientWidth; // clientWidth=offsetWidth-scrollBarSize in theory?
	if(!width) return;
	if(e.clientHeight===undefined) return;
	height=e.clientHeight; // clientHeight=offsetHeight-scrollBarSize in theory?
	if(!height) return;
	if(e.scrollLeft===undefined) return;
	scrollLeft=e.scrollLeft;
	if(e.scrollTop===undefined) return;
	scrollTop=e.scrollTop;
	if(left<scrollLeft) e.scrollLeft=left;
	else if((right-width)>scrollLeft) e.scrollLeft=right-width;
	if(top<scrollTop) e.scrollTop=top;
	else if((bottom-height)>scrollTop) e.scrollTop=bottom-height;
};
mxG.G.prototype.disableTree=function()
{
	if(!this.td.hasAttribute("data-maxigos-disabled"))
	{
		this.td.setAttribute("data-maxigos-disabled","1");
		if(this.canTreeFocus) this.td.setAttribute("tabindex","-1");
	}
};
mxG.G.prototype.enableTree=function()
{
	if(this.td.hasAttribute("data-maxigos-disabled"))
	{
		this.td.removeAttribute("data-maxigos-disabled");
		if(this.canTreeFocus) this.td.setAttribute("tabindex","0");
	}
};
mxG.G.prototype.isTreeDisabled=function()
{
	return this.td.hasAttribute("data-maxigos-disabled");
};
mxG.G.prototype.setTree=function()
{
	// remember: remove previous treeContentDiv child at the very last moment
	var k,km=this.rN.Kid.length,aN;
	this.tree=[];
	this.treeRowMax=0;
	this.treeColumnMax=0;
	for(k=0;k<km;k++)
	{
		aN=this.rN.Kid[k];
		while(this.kidOnFocus(aN)) aN=this.kidOnFocus(aN);
		this.treeCurrentLast=aN;
		this.buildTree(this.rN.Kid[k],0,this.treeRowMax);
	}
	this.treeM=this.treeColumnMax;
	this.treeN=20; // assume no more than 20 visible lines in TreeDiv
	this.drawTree();
	this.treeNodeOnFocus=this.cN;
	this.hasToSetTree=0;
};
mxG.G.prototype.removeAllTreeBlocks=function()
{
	var k,km,nv,gr,jo,j,jm;
	km=this.treeBlocks.length;
	nv=Math.min(this.treeN,this.treeRowMax);
	for(k=0;k<km;k++)
	{
		gr=this.treeBlocks[k];
		while(gr.firstChild) gr.removeChild(gr.firstChild);
		jo=k*nv;
		jm=jo+nv;
		for(j=jo;j<jm;j++) this.treeCheck[j]=0;
	}
};
mxG.G.prototype.addVisibleTreeBlocksOnly=function(ko)
{
	// add only some blocks that are visible or nearly visible in tree content
	// otherwise window resize or window may be very slow when big tree
	// ko is the indice of a visible block in this.treeBlocks
	// assume ko block is at least half of the visible part of the tree
	// thus add also some blocks around ko to try to miss nothing
	// remove other blocks content to minimize the number of tree content elements
	var k,km,nv,gr,jo,j,jm;
	this.treeLock=1; // to avoid problems when scroll tree
	km=this.treeBlocks.length;
	nv=Math.min(this.treeN,this.treeRowMax);
	for(k=0;k<km;k++)
	{
		gr=this.treeBlocks[k];
		if((k<(ko-1))||(k>(ko+1)))
		{
			// remove block #k
			if(gr.firstChild)
			{
				while(gr.firstChild) gr.removeChild(gr.firstChild);
				jo=k*nv;
				jm=jo+nv;
				for(j=jo;j<jm;j++) this.treeCheck[j]=0;
			}
		}
		else if(!gr.firstChild)
		{
			// add block #k
			this.drawTreeBlock(k*nv,nv);
		}
		// else keep block #k as is
	}
	this.treeLock=0;
};
mxG.G.prototype.updateTreeEmphasis=function()
{
	var aN,i,j,e,good,treeNode,cx,cy,d,c,cls;
	if(this.treeNodeOnFocus==this.cN) return;
	if(this.treeNodeOnFocus)
	{
		aN=this.treeNodeOnFocus;
		i=aN.iTree;
		j=aN.jTree;
		e=this.getE("TreeEmphasis"+this.idt(i,j));
		if(e)
		{
			good=this.hasEmphasis(aN);
			if(good)
			{
				// todo when complex emphasis
			}
			else e.parentNode.removeChild(e);
		}
	}
	aN=this.cN;
	if(good=this.hasEmphasis(aN))
	{
		i=aN.iTree;
		j=aN.jTree;
		treeNode=this.getE("TreeNode"+this.idt(i,j));
		if(treeNode)
		{
			e=this.getE("TreeEmphasis"+this.idt(i,j));
			if(e) e.parentNode.removeChild(e);
			d=this.dT+2;
			if(treeNode.tagName=="circle")
			{
				cx=treeNode.getAttributeNS(null,"cx");
				cy=treeNode.getAttributeNS(null,"cy");
			}
			else if(treeNode.tagName=="polygon")
			{
				points=treeNode.getAttributeNS(null,"points");
				cx=parseFloat(points.replace(/^([0-9.]+).*$/,"$1"));
				cy=parseFloat(points.replace(/^[0-9.]+ ([0-9.]+).*$/,"$1"))+d*0.32;
			}
			else
			{
				// never in theory
				this.treeNodeOnFocus=aN;
				return;
			}
			c=this.getEmphasisColor(good);
			cls=this.getEmphasisClass(good);
			e=this.buildTreeEmphasis(cx,cy,d,c,cls);
			e.setAttribute("id",this.n+"TreeEmphasis"+this.idt(i,j));
			if(treeNodeShadow=this.getE("TreeNodeShadow"+this.idt(i,j)))
				treeNodeShadow.parentNode.insertBefore(e,treeNodeShadow);
			else treeNode.parentNode.insertBefore(e,treeNode);
		}
	}
	this.treeNodeOnFocus=aN;
};
mxG.G.prototype.updateTree=function()
{
	var ko;
	if(this.hasToSetTree) this.setTree();
	else
	{
		//let d=new Date().getTime();
		ko=Math.floor(this.cN.jTree/this.treeN);
		// this.removeAllTreeBlocks();
		this.addVisibleTreeBlocksOnly(ko);
		this.updateTreeEmphasis();
	}
	this.afterDrawTree();
	if(this.gBox||(this.hasC("Score")&&this.canPlaceScore)) this.disableTree();
	else this.enableTree();
};
mxG.G.prototype.initTree=function()
{
	var k=this.k;
	this.hasToSetTree=1;
	this.dT=this.scr.d; // tree stone d = goban stone d (in svg coordinates)
	this.ddT=this.dT*1.5;
	this.td=this.getE("TreeDiv");
	this.tcd=this.getE("TreeContentDiv");
	this.td.addEventListener("scroll",function(ev){mxG.D[k].doScrollTree(ev);},false);
};
mxG.G.prototype.createTree=function()
{
	var s="",a="";
	this.canTreeFocus=this.setA("canTreeFocus",0,"bool");
	this.hideTreeNumbering=this.setA("hideTreeNumbering",0,"bool");
	this.markCommentOnTree=this.setA("markCommentOnTree",0,"bool");
	this.treeLabelOn=this.setA("treeLabelOn",0,"bool");
	if(this.treeLabelOn)
	{
		s+="<div class=\"mxTreeLabelDiv\" id=\""+this.n+"TreeLabelDiv\">";
		s+=this.local("Game tree");
		s+="</div>";
	}
	// add tabindex="0" to this div if it can be scrolled (for keyboard navigation)
	a=this.canTreeFocus?" tabindex=\"0\"":"";
	s+="<div class=\"mxTreeDiv\" id=\""+this.n+"TreeDiv\""+a+">";
	s+="<div class=\"mxTreeContentDiv\" id=\""+this.n+"TreeContentDiv\">";
	s+="</div>";
	s+="</div>";
	return s;
};
}
// maxiGos v7 > mgosVersion.js
if(!mxG.G.prototype.createVersion)
{
mxG.G.prototype.createVersion=function()
{
	var s="";
	this.versionBoxOn=this.setA("versionBoxOn",0,"bool");
	if(this.versionBoxOn)
	{
		s+="<div class=\"mxVersionDiv\" id=\""+this.n+"VersionDiv\">"
		s+="<span>maxiGos "+mxG.V+"</span></div>";
	}
	return s;
};
}
mxG.K++;
mxG.B=[["Menu","File","View","Goban","Navigation","Variation"],[["Help","Sgf","Image","Score","Pass"],"Edit","Info","Tree","Version"],"AfterView"];
mxG.D[mxG.K]=new mxG.G(mxG.K,mxG.B);
mxG.D[mxG.K].theme="Minimalist";
mxG.D[mxG.K].config="Edit";
mxG.D[mxG.K].style=".mxMinimalistTheme{--gobanMaxWidth:30em;--gobanMinWidth:10em;--mainBk:transparent;--barBk:transparent;--barColor:#000;--okBarBk:rgba(0,0,0,0.1);--outerGobanBk:transparent;--outerGobanBorder:rgba(0,0,0,0.3);--navigationBk:transparent;--navigationBtnBk:transparent;--navigationBtnBorder:transparent;--navigationBtnColor:#000;--solveBk:transparent;--solveBtnBk:transparent;--solveBtnBorder:transparent;--solveBtnColor:#000;--gBoxBk:#fff;--commentContentBk:transparent;--commentContentBorder:rgba(0,0,0,0.3);--commentContentColor:#000;--treeContentBk:transparent;--treeContentBorder:rgba(0,0,0,0.3);--treeContentColor:#000;--editToolBarBk:transparent;--editToolBarBorder:transparent;--editToolBarColor:#000;--btnBk:#fff;--btnBorder:rgba(0,0,0,0.3);--btnColor:#000;--subBtnBk:#fff;--subBtnBorder:rgba(0,0,0,0.3);--subBtnColor:#000;--toolBk:#fff;--toolBorder:rgba(0,0,0,0.3);--toolColor:#000;--selectedBtnBk:rgba(0,0,0,0.9);--selectedBtnBorder:rgba(0,0,0,0.7);--selectedBtnColor:#fff;--selectedToolBk:rgba(0,0,0,0.1);--selectedToolBorder:rgba(0,0,0,0.3);--selectedToolColor:#000;--superSelectedToolBk:rgba(0,0,0,0.2);--superSelectedToolBorder:rgba(0,0,0,0.3);--superSelectedToolColor:#000;--focusBk:rgba(0,0,0,0.1);--focusCommentContentBk:transparent;--focusCommentContentBorder:#000;--focusCommentContentColor:#000;--focusTreeContentBk:transparent;--focusTreeContentBorder:#000;--focusTreeContentColor:#000;--focusBtnBk:#fff;--focusBtnBorder:#000;--focusBtnColor:#000;--focusSubBtnBk:#fff;--focusSubBtnBorder:#000;--focusSubBtnColor:#000;--focusNavigationBtnBk:rgba(0,0,0,0.1);--focusNavigationBtnBorder:transparent;--focusNavigationBtnColor:#000;--focusSolveBtnBk:rgba(0,0,0,0.1);--focusSolveBtnBorder:transparent;--focusSolveBtnColor:#000;--focusToolBk:#fff;--focusToolBorder:#000;--focusToolColor:#000;--focusSelectedToolBk:rgba(0,0,0,0.2);--focusSelectedToolBorder:#000;--focusSelectedToolColor:#000;--focusSuperSelectedToolBk:rgba(0,0,0,0.3);--focusSuperSelectedToolBorder:#000;--focusSuperSelectedToolColor:#000;text-align:left;}.mxMinimalistTheme div::-moz-focus-inner,.mxMinimalistTheme button::-moz-focus-inner,.mxMinimalistTheme input[type=text]::-moz-focus-inner,.mxMinimalistTheme a::-moz-focus-inner{padding:0;border:0;}.mxMinimalistTheme div:focus,.mxMinimalistTheme button:focus,.mxMinimalistTheme input[type=text]:focus,.mxMinimalistTheme textarea:focus,.mxMinimalistTheme a:focus{outline:none;}.mxMinimalistTheme button,.mxMinimalistTheme input[type=button],.mxMinimalistTheme textarea{-webkit-appearance:none;-moz-appearance:none;}.mxMinimalistTheme text{cursor:default;}.mxMinimalistTheme button{cursor:pointer;}.mxMinimalistTheme button text{cursor:pointer;}.mxMinimalistTheme input[type=text][disabled],.mxMinimalistTheme button[disabled]{cursor:default;}.mxMinimalistTheme input[type=file]{visibility:hidden;position:fixed;}.mxMinimalistTheme [data-maxigos-disabled]{opacity:0.5;}.mxMinimalistTheme{font-family:sans-serif;}.mxMinimalistTheme button{font-family:sans-serif;}.mxMinimalistTheme{box-sizing:border-box;max-width:var(--gobanMaxWidth);min-width:var(--gobanMinWidth);margin:0 auto;}.mxMinimalistTheme.mxCommentConfig,.mxMinimalistTheme.mxEditConfig,.mxMinimalistTheme.mxLessonConfig,.mxMinimalistTheme.mxTreeConfig{display:flex;flex-wrap:wrap;justify-content:center;align-items:stretch;max-width:calc(var(--gobanMaxWidth) * 2);}.mxMinimalistTheme.mxCommentConfig>div,.mxMinimalistTheme.mxEditConfig>div,.mxMinimalistTheme.mxLessonConfig>div,.mxMinimalistTheme.mxTreeConfig>div{box-sizing:border-box;max-width:var(--gobanMaxWidth);flex:1 1 var(--gobanMaxWidth);padding:0.125em;}.mxMinimalistTheme.mxCommentConfig .mxGobanParentDiv,.mxMinimalistTheme.mxEditConfig .mxGobanParentDiv,.mxMinimalistTheme.mxLessonConfig .mxGobanParentDiv,.mxMinimalistTheme.mxTreeConfig .mxGobanParentDiv,.mxMinimalistTheme.mxCommentConfig .mxCommentParentDiv,.mxMinimalistTheme .mxLessonParentDiv,.mxMinimalistTheme .mxTreeParentDiv{display:flex;flex-direction:column;}.mxMinimalistTheme.mxCommentConfig .mxGobanDiv,.mxMinimalistTheme.mxEditConfig .mxGobanDiv,.mxMinimalistTheme.mxLessonConfig .mxGobanDiv,.mxMinimalistTheme.mxTreeConfig .mxGobanDiv{flex:auto;display:flex;flex-direction:column;width:100%;}.mxMinimalistTheme.mxCommentConfig .mxCommentDiv,.mxMinimalistTheme.mxTreeConfig .mxCommentDiv,.mxMinimalistTheme .mxTreeDiv{height:7em;min-height:2.25em;padding:0.25em;resize:vertical;overflow:auto;}.mxMinimalistTheme.mxCommentConfig .mxCommentDiv,.mxMinimalistTheme .mxTreeDiv{flex:auto;}.mxMinimalistTheme.mxTreeConfig .mxCommentDiv{flex:initial;}.mxMinimalistTheme .mxEditCommentToolDiv,.mxMinimalistTheme .mxTreeDiv{margin:0.25em 0 0 0;}.mxMinimalistTheme.mxEditConfig .mxEditToolBarDiv{flex:none;display:grid;grid-template-columns:repeat(auto-fit,minmax(2.225em,1fr));gap:0.125em;}.mxMinimalistTheme.mxEditConfig .mxEditCommentToolDiv{flex:initial;}.mxMinimalistTheme.mxEditConfig .mxEditCommentToolDiv textarea{display:block;box-sizing:border-box;resize:vertical;height:7em;min-height:2.25em;width:100%;max-width:100%;}.mxMinimalistTheme.mxCommentConfig .mxCommentDiv,.mxMinimalistTheme.mxTreeConfig .mxCommentDiv,.mxMinimalistTheme .mxTreeDiv{position:relative;}.mxMinimalistTheme.mxCommentConfig .mxCommentContentDiv,.mxMinimalistTheme.mxTreeConfig .mxCommentContentDiv,.mxMinimalistTheme .mxTreeContentDiv{position:absolute;}.mxMinimalistTheme .mxVersionDiv{box-sizing:border-box;text-align:center;height:2.5em;line-height:2.5em;}.mxMinimalistTheme.mxCommentConfig .mxGobanDiv,.mxMinimalistTheme.mxEditConfig .mxGobanDiv,.mxMinimalistTheme.mxLessonConfig .mxGobanDiv,.mxMinimalistTheme.mxTreeConfig .mxGobanDiv,.mxMinimalistTheme.mxScoreConfig .mxGobanDiv.mxUnder{box-sizing:border-box;background:var(--outerGobanBk);border:1px solid var(--outerGobanBorder);}.mxMinimalistTheme.mxLessonConfig .mxGobanDiv{background:transparent;border:1px solid transparent;}.mxMinimalistTheme .mxInnerGobanDiv{-webkit-tap-highlight-color:rgba(0,0,0,0);user-select:none;margin:auto;position:relative;}.mxMinimalistTheme .mxGobanDiv svg{box-sizing:border-box;display:block;width:100%;height:100%;pointer-events:none;}.mxMinimalistTheme .mxTitleH1{font-size:1em;padding:0;margin:0 0 0.25em 0;}.mxMinimalistTheme .mxP:not(:first-child){padding-top:0.5em;}.mxMinimalistTheme.mxCommentConfig .mxVersionDiv,.mxMinimalistTheme.mxEditConfig .mxVersionDiv,.mxMinimalistTheme.mxTreeConfig .mxVersionDiv{background:var(--barBk);color:var(--barColor);}.mxMinimalistTheme.mxBasicConfig{background:var(--mainBk);}.mxMinimalistTheme.mxCommentConfig>div,.mxMinimalistTheme.mxTreeConfig>div{background:var(--mainBk);}.mxMinimalistTheme.mxCommentConfig .mxCommentDiv,.mxMinimalistTheme.mxTreeConfig .mxCommentDiv{background:var(--commentContentBk);border:1px solid var(--commentContentBorder);color:var(--commentContentColor);}.mxMinimalistTheme .mxTreeDiv{background:var(--treeContentBk);border:1px solid var(--treeContentBorder);color:var(--treeContentColor);}.mxMinimalistTheme .mxTreeDiv{user-select:none;}.mxMinimalistTheme.mxDiagramConfig{background:var(--mainBk);}.mxMinimalistTheme .mxInnerNotSeenDiv:not(:empty){margin:0.5em auto 0 auto;}.mxMinimalistTheme .mxInnerNotSeenDiv{margin:0 auto;}.mxMinimalistTheme .mxNotSeenSvg{width:100%;height:100%;display:block;}.mxMinimalistTheme.mxEditConfig .mxInnerGobanDiv{}.mxMinimalistTheme.mxEditConfig>div{background:var(--mainBk);}.mxMinimalistTheme.mxEditConfig .mxMenuDiv{background:var(--barBk);}.mxMinimalistTheme .mxSgfParentDiv{background:var(--barBk);}.mxMinimalistTheme.mxEditConfig .mxGobanDiv svg{background-size:100% 100%;background-repeat:no-repeat;}.mxMinimalistTheme.mxEditConfig .mxOneMenuDiv{text-align:left;}.mxMinimalistTheme.mxEditConfig .mxSubMenuDiv{position:absolute;z-index:1;display:none;margin-top:0.125em;}.mxMinimalistTheme.mxEditConfig .mxMenuDiv .mxSubMenuDiv button{width:100%;text-align:left;width:-moz-available;}.mxMinimalistTheme.mxEditConfig .mxMenuDiv .mxSubMenuDiv button.mxCoched,.mxMinimalistTheme.mxEditConfig .mxMenuDiv .mxSubMenuDiv button.mxCochable{padding-left:1.25em;}.mxMinimalistTheme.mxEditConfig .mxMenuDiv .mxSubMenuDiv button.mxCoched span:before{position:absolute;left:0.5em;content:\"✓\";}.mxMinimalistTheme.mxEditConfig .mxEditToolBarDiv{margin:-1px;background:var(--editToolBarBk);border:1px solid var(--editToolBarBorder);color:var(--editToolBarColor);}.mxMinimalistTheme.mxEditConfig .mxEditToolBarDiv button,.mxMinimalistTheme.mxEditConfig .mxEditToolBarDiv input[type=text]{display:block;box-sizing:border-box;font-size:1em;height:2.225em;min-width:2.225em;padding:0.125em;background:var(--toolBk);color:var(--toolColor);border:1px solid var(--toolBorder);border-radius:0;outline:none;}.mxMinimalistTheme.mxEditConfig .mxEditToolBarDiv input[type=text]{padding-top:0.1875em;}.mxMinimalistTheme.mxEditConfig .mxEditToolBarDiv button text{fill:var(--toolColor);stroke:var(--toolColor);}.mxMinimalistTheme.mxEditConfig .mxEditToolBarDiv .mxSelectedEditTool{background:var(--selectedToolBk);border-color:var(--selectedToolBorder);color:var(--selectedToolColor);}.mxMinimalistTheme.mxEditConfig .mxEditToolBarDiv .mxSelectedEditTool text{fill:var(--selectedToolColor);stroke:var(--selectedToolColor);}.mxMinimalistTheme.mxEditConfig .mxEditToolBarDiv .mxSuperSelectedEditTool{background:var(--superSelectedToolBk);border-color:var(--superSelectedToolBorder);color:var(--superSelectedToolColor);}.mxMinimalistTheme.mxEditConfig .mxEditToolBarDiv .mxSuperSelectedEditTool text{fill:var(--superSelectedToolColor);stroke:var(--superSelectedToolColor);}.mxMinimalistTheme.mxEditConfig .mxEditToolBarDiv svg{display:block;width:100%;height:100%;}.mxMinimalistTheme.mxEditConfig .mxEditToolBarDiv div{display:none;width:2.225em;max-width:2.225em;height:2.225em;margin:0 0.125em;}.mxMinimalistTheme.mxEditConfig .mxEditToolBarDiv button:focus,.mxMinimalistTheme.mxEditConfig .mxEditToolBarDiv input[type=text]:focus{background:var(--focusToolBk);border-color:var(--focusToolBorder);color:var(--focusToolColor);}.mxMinimalistTheme.mxEditConfig .mxEditToolBarDiv .mxSelectedEditTool:focus{background:var(--focusSelectedToolBk);border-color:var(--focusSelectedToolBorder);color:var(--focusSelectedToolColor);}.mxMinimalistTheme.mxEditConfig .mxEditToolBarDiv .mxSelectedEditTool:focus text{fill:var(--focusSelectedToolColor);stroke:var(--focusSelectedToolColor);}.mxMinimalistTheme.mxEditConfig .mxEditToolBarDiv .mxSuperSelectedEditTool:focus{background:var(--focusSuperSelectedToolBk);border-color:var(--focusSuperSelectedToolBorder);color:var(--focusSuperSelectedToolColor);}.mxMinimalistTheme.mxEditConfig .mxEditToolBarDiv .mxSuperSelectedEditTool:focus text{fill:var(--focusSuperSelectedToolColor);stroke:var(--focusSuperSelectedToolColor);}.mxMinimalistTheme.mxEditConfig .mxEditCommentToolDiv textarea{background:var(--commentContentBk);border:1px solid var(--commentContentBorder);color:var(--commentContentColor);}.mxMinimalistTheme.mxGameConfig,.mxMinimalistTheme.mxReplayConfig,.mxMinimalistTheme.mxScoreConfig{background:var(--mainBk);}.mxMinimalistTheme.mxGameConfig .mxHeaderDiv,.mxMinimalistTheme.mxReplayConfig .mxHeaderDiv,.mxMinimalistTheme.mxScoreConfig .mxCommentDiv{padding:0.25em 0.25em 0.25em 0.75em;margin-bottom:0.25em;}.mxMinimalistTheme.mxGameConfig .mxHeaderDiv h1,.mxMinimalistTheme.mxReplayConfig .mxHeaderDiv h1{font-size:1em;font-weight:bold;}.mxMinimalistTheme.mxKifuConfig .mxGobanDiv{--gobanMaxWidth:42em;}.mxMinimalistTheme.mxKifuConfig .mxHeaderDiv{padding:0.25em 1.75em;margin-bottom:0.25em;}.mxMinimalistTheme.mxKifuConfig .mxGobanDiv{background:transparent;}.mxMinimalistTheme.mxKifuConfig .mxNotSeenDiv{padding:0.25em 1.75em;background:transparent;}.mxMinimalistTheme.mxKifuConfig .mxHeaderDiv h1{font-size:1em;font-weight:bold;}.mxMinimalistTheme.mxReplayConfig .mxGuessDiv{margin:0.5em 0.5em 0 0.5em;}.mxMinimalistTheme.mxProblemConfig{background:var(--mainBk);}.mxMinimalistTheme.mxProblemConfig .mxCommentDiv{margin:0 auto;padding:0.5em;text-align:center;min-height:1.5em;line-height:1.5em;}.mxMinimalistTheme.mxProblemConfig .mxCommentContentDiv{display:inline-block;text-align:justify;}.mxMinimalistTheme.mxEditConfig .mxMenuDiv,.mxMinimalistTheme.mxEditConfig .mxOKDiv,.mxMinimalistTheme .mxSgfParentDiv{padding:0.25em;text-align:center;}.mxMinimalistTheme.mxEditConfig .mxMenuDiv>div,.mxMinimalistTheme .mxSgfParentDiv>div{display:inline-block;margin:0.25em 0;}.mxMinimalistTheme [disabled]{opacity:0.5;}.mxMinimalistTheme.mxEditConfig .mxMenuDiv button,.mxMinimalistTheme .mxSgfParentDiv button,.mxMinimalistTheme .mxOKDiv button{display:block;box-sizing:border-box;font-size:1em;border:1px solid var(--btnBorder);background:var(--btnBk);color:var(--btnColor);margin:0 0.125em;padding:0 0.5em;height:1.75em;line-height:1.75em;text-decoration:none;white-space:nowrap;text-align:center;}.mxMinimalistTheme.mxEditConfig .mxMenuDiv .mxSubMenuDiv button{border:1px solid var(--subBtnBorder);background:var(--subBtnBk);color:var(--subBtnColor);border-bottom:0;}.mxMinimalistTheme.mxEditConfig .mxMenuDiv .mxSubMenuDiv button:last-of-type{border-bottom:1px solid var(--subBtnBorder);}.mxMinimalistTheme .mxGBoxDiv .mxOKDiv button{margin-top:0.125em;margin-bottom:0.125em;border:1px solid #000;}.mxMinimalistTheme .mxGBoxDiv .mxOKDiv button{margin-top:0.125em;margin-bottom:0.125em;border:1px solid var(--btnBorder);}.mxMinimalistTheme input[type=text]{text-align:center;}.mxMinimalistTheme .mxSgfParentDiv .mxSelectedBtn{background:var(--selectedBtnBk);border:1px solid var(--selectedBtnBorder);color:var(--selectedBtnColor);}.mxMinimalistTheme .mxGBoxDiv{box-sizing:border-box;background:var(--gBoxBk);margin:0;}.mxMinimalistTheme .mxGobanDiv.mxUnder{min-height:7em;}.mxMinimalistTheme .mxUnder .mxInnerGobanDiv{visibility:hidden;}.mxMinimalistTheme .mxGBoxDiv .mxShowContentDiv{box-sizing:border-box;position:absolute;top:0;left:0;right:0;bottom:3em;padding:0.25em;overflow:auto;z-index:1;border:1px solid transparent;}.mxMinimalistTheme .mxGBoxDiv.mxShowSvgDiv .mxShowContentDiv img,.mxMinimalistTheme .mxGBoxDiv.mxShowPngDiv .mxShowContentDiv img{display:block;box-sizing:border-box;height:100%;width:auto;border:0;margin:0 auto;}.mxMinimalistTheme .mxGBoxDiv.mxShowSgfDiv .mxShowContentDiv textarea{display:block;font-family:monospace;box-sizing:border-box;width:100%;height:100%;border:0;resize:none;}.mxMinimalistTheme.mxEditConfig .mxOpenDiv .mxShowContentDiv button{display:block;box-sizing:border-box;font-size:1em;border:1px solid var(--btnBorder);background: var(--btnBk);color: var(--btnColor);margin:0 auto;padding:0 0.5em;height:1.75em;line-height:1.75em;text-decoration:none;white-space:nowrap;text-align:center;}.mxMinimalistTheme.mxEditConfig .mxOpenDiv .mxShowContentDiv button:focus{background:var(--focusBtnBk);border:1px solid var(--focusBtnBorder);color:var(--focusBtnColor);}.mxMinimalistTheme .mxShowColorsDiv .mxShowContentDiv div:nth-of-type(2) label{display:inline-block;min-width:7em;}.mxMinimalistTheme .mxShowColorsDiv .mxShowContentDiv input[type=\"text\"]{margin-left:0.5em;}.mxMinimalistTheme .mxFigureOrNotP+.mxTabNumberingP{padding-left:2em;}.mxMinimalistTheme .mxShowInfoDiv *{box-sizing:border-box;}.mxMinimalistTheme .mxInfoPageMenuDiv{border-bottom:1px solid #000;margin-bottom:0.5em;}.mxMinimalistTheme.mxEditConfig .mxInfoPageMenuDiv button{box-sizing:border-box;display:inline-block;font-size:1em;border:1px solid rgba(0,0,0,0.3);border-bottom:0;border-radius:0.5em 0.5em 0 0;background:#fff;color:#000;margin:0 0.125em;padding:0 0.5em;height:1.75em;line-height:1.75em;text-decoration:none;white-space:nowrap;text-align:center;}.mxMinimalistTheme.mxEditConfig .mxInfoPageMenuDiv button.mxInfoSelectedPageBtn,.mxMinimalistTheme.mxEditConfig .mxInfoPageMenuDiv button:focus{border:1px solid #000;border-bottom:0;}.mxMinimalistTheme .mxInfoPageDiv{display:grid;gap:0.5em;grid-template-columns: repeat(2,1fr);}.mxMinimalistTheme .mxInfoPageDiv input[type=text]{text-align:left;}.mxMinimalistTheme .mxInfoPageDiv textarea{}.mxMinimalistTheme .mxInfoPageDiv>div.mxResultDiv,.mxMinimalistTheme .mxInfoPageDiv>label.mxGC,.mxMinimalistTheme .mxInfoPageDiv>label.mxGN{grid-column:1 / 3;}.mxMinimalistTheme .mxInfoPageDiv>div.mxResultDiv{display:flex;flex-wrap:wrap;justify-content:space-between;}.mxMinimalistTheme .mxInfoPageDiv>div.mxResultDiv label.mxSC{white-space:nowrap;}.mxMinimalistTheme .mxInfoPageDiv>label span{display:block;}.mxMinimalistTheme .mxInfoPageDiv>label span+input[type=text],.mxMinimalistTheme .mxInfoPageDiv>label span+textarea{display:block;width:100%;}.mxMinimalistTheme .mxInfoPageDiv>label span+textarea{height:6em;}.mxMinimalistTheme .mxShowHelpDiv{counter-reset:helpH2;}.mxMinimalistTheme .mxShowHelpDiv h1{font-size:1.6em;}.mxMinimalistTheme .mxShowHelpDiv h2{font-size:1.4em;counter-reset:helpH3;}.mxMinimalistTheme .mxShowHelpDiv h2:before{counter-increment:helpH2;content:counter(helpH2) \". \";}.mxMinimalistTheme .mxShowHelpDiv h3{font-size:1.2em;}.mxMinimalistTheme .mxShowHelpDiv h3:before{counter-increment:helpH3;content:counter(helpH2) \".\" counter(helpH3) \". \";}.mxMinimalistTheme .mxShowHelpDiv h4{font-size:1em;}.mxMinimalistTheme .mxOKDiv{box-sizing:border-box;background:var(--okBarBk);position:absolute;bottom:0;width:100%;max-width:100%;height:3em;overflow:auto;display:flex;justify-content:center;align-items:center;flex-wrap:wrap;z-index:1;}.mxMinimalistTheme.mxEditConfig .mxEditCommentToolDiv textarea:focus,.mxMinimalistTheme.mxTreeConfig .mxCommentDiv:focus{background:var(--focusTreeContentBk);border:1px solid var(--focusTreeContentBorder);color:var(--focusTreeContentColor);}.mxMinimalistTheme.mxEditConfig .mxTreeDiv:focus,.mxMinimalistTheme.mxTreeConfig .mxTreeDiv:focus{background:var(--focusTreeContentBk);border:1px solid var(--focusTreeContentBorder);color:var(--focusTreeContentColor);}.mxMinimalistTheme .mxSgfParentDiv button:focus:not(.mxSelectedBtn),.mxMinimalistTheme .mxMenuDiv button:focus,.mxMinimalistTheme .mxGBoxDiv button:focus{background:var(--focusBtnBk);border:1px solid var(--focusBtnBorder);color:var(--focusBtnColor);}.mxMinimalistTheme .mxMenuDiv .mxSubMenuDiv button:focus{background:var(--focusSubBtnBk);border:1px solid var(--focusSubBtnBorder);color:var(--focusSubBtnColor);}.mxMinimalistTheme .mxMenuDiv .mxSubMenuDiv button:focus{border-bottom:0;}.mxMinimalistTheme .mxMenuDiv .mxSubMenuDiv button:last-of-type:focus{border-bottom:1px solid var(--focusSubBtnBorder);}.mxMinimalistTheme .mxMenuDiv .mxSubMenuDiv button:focus+button{border-top:1px solid var(--focusSubBtnBorder);}.mxMinimalistTheme .mxNavigationDiv button:focus{background:var(--focusNavigationBtnBk);border:1px solid var(--focusNavigationBtnBorder);}.mxMinimalistTheme .mxNavigationDiv button:focus svg{fill:var(--focusNavigationBtnColor);}.mxMinimalistTheme .mxSolveDiv button:focus{background:var(--focusSolveBtnBk);border:1px solid var(--focusSolveBtnBorder);}.mxMinimalistTheme .mxSolveDiv button:focus svg{fill:var(--focusSolveBtnColor);}.mxMinimalistTheme.mxLessonConfig{background:var(--mainBk);}.mxMinimalistTheme.mxLessonConfig>div:first-of-type{align-self:end;}.mxMinimalistTheme .mxLessonDiv{box-sizing:border-box;position:relative;margin:0 auto 0.25em auto;width:100%;}.mxMinimalistTheme .mxLessonDiv>div{position:absolute;bottom:120px;left:10%;right:10%;border-radius:1.5em;font-family:\"Chalkboard SE\",\"Comic Sans MS\",sans-serif;background-color:#fff;text-align:center;}.mxMinimalistTheme .mxLessonDiv>img{display:block;margin:0 auto;}.mxMinimalistTheme .mxLessonDiv>div:empty{display:none;}.mxMinimalistTheme.mxIn3d .mxLessonDiv>div{padding:8px 8px 8px 12px;box-shadow:4px 4px 12px rgba(0,0,0,0.5);}.mxMinimalistTheme.mxIn2d .mxLessonDiv>div{padding:8px;border:1px solid #999;}.mxMinimalistTheme .mxLessonDiv>div>div{display:inline-block;text-align:justify;white-space:normal;position:relative;}.mxMinimalistTheme .mxLessonDiv.mxTE>div>div,.mxMinimalistTheme .mxLessonDiv.mxBM>div>div{margin-left:2.25em;min-height:2.25em;}.mxMinimalistTheme .mxLessonDiv.mxTE>div:before,.mxMinimalistTheme .mxLessonDiv.mxBM>div:before{background-repeat:no-repeat;background-position:left center;background-size:2em;display:block;height:2em;width:2em;content:\"\";position:absolute;top:0.25em;left:0.25em;}.mxMinimalistTheme .mxLessonDiv.mxTE>div:before{background:url(\'data:image/svg+xml;utf8,<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 128 128\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"black\" stroke-width=\"4\" cx=\"64\" cy=\"64\" r=\"48\"/><circle fill=\"black\" cx=\"48\" cy=\"48\" r=\"8\"/><circle fill=\"black\" cx=\"80\" cy=\"48\" r=\"8\"/><path fill=\"none\" stroke=\"black\" stroke-width=\"4\" d=\"M44,78A32 32 0 0 0 84,78\"/></svg>\');}.mxMinimalistTheme .mxLessonDiv.mxBM>div:before{background:url(\'data:image/svg+xml;utf8,<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 128 128\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"black\" stroke-width=\"4\" cx=\"64\" cy=\"64\" r=\"48\"/><circle fill=\"black\" cx=\"48\" cy=\"48\" r=\"8\"/><circle fill=\"black\" cx=\"80\" cy=\"48\" r=\"8\"/><path fill=\"none\" stroke=\"black\" stroke-width=\"4\" d=\"M44,86A32 32 0 0 1 84,86\"/></svg>\');}.mxMinimalistTheme .mxNavigationDiv{box-sizing:border-box;display:flex;justify-content:space-around;align-items:center;height:2.5em;}.mxMinimalistTheme.mxCommentConfig .mxNavigationDiv,.mxMinimalistTheme.mxEditConfig .mxNavigationDiv,.mxMinimalistTheme.mxTreeConfig .mxNavigationDiv{background:var(--navigationBk);}.mxMinimalistTheme .mxNavigationDiv:empty{display:none;}.mxMinimalistTheme .mxNavigationDiv button{flex:1;font-size:1em;border:1px solid var(--navigationBtnBorder);background:var(--navigationBtnBk);margin:0 2%;padding:0;height:2.5em;}.mxMinimalistTheme .mxNavigationDiv button svg{display:block;margin:0 auto;width:100%;max-width:100%;height:1.5em;fill:var(--navigationBtnColor);}.mxMinimalistTheme .mxSolveDiv{text-align:center;padding:1px;background:var(--solveBk);}.mxMinimalistTheme .mxSolveDiv:empty{display:none;}.mxMinimalistTheme .mxSolveDiv button{border:1px solid var(--solveBtnBorder);background:var(--solveBtnBk);margin:0.125em 1em;padding:0;width:10%;min-width:40px;height:auto;}.mxMinimalistTheme .mxSolveDiv button svg{display:block;width:100%;height:100%;fill:var(--solveBtnColor);}.mxMinimalistTheme .mxSpeedDiv{display:flex;align-items:center;margin-top:0.25em;height:2.5em;}.mxMinimalistTheme .mxSpeedDiv button{flex:0;font-size:1em;margin:0;padding:0;border:1px solid transparent;background:none;}.mxMinimalistTheme .mxSpeedDiv svg{flex:1;margin:0 0.5em;}.mxMinimalistTheme .mxSpeedDiv button span{display:block;margin:auto;width:1.5em;height:1.5em;line-height:1.5em;color:transparent;position:relative;}.mxMinimalistTheme .mxSpeedDiv button span:before{content:\"\";display:block;position:absolute;top:calc(50% - 1px);left:25%;bottom:0;right:25%;border-top:2px solid #000;z-index:1;}.mxMinimalistTheme .mxSpeedDiv button:focus{background:rgba(0,0,0,0.1);}.mxMinimalistTheme .mxSpeedDiv button.mxSpeedPlusBtn span:after{content:\"\";display:block;position:absolute;top:25%;left:calc(50% - 1px);bottom:25%;right:0;border-left:2px solid #000;z-index:1;}.mxMinimalistTheme .mxSpeedDiv button.mxSpeedPlusBtn:focus{background:rgba(0,0,0,0.1);}.mxMinimalistTheme .mxSpeedDiv .mxSpeedBar,.mxMinimalistTheme .mxSpeedDiv .mxSpeedCursor{cursor:pointer;}";
// general
mxG.D[mxG.K].a.in3dOn=0; // (0,1) default 1
mxG.D[mxG.K].a.htmlParenthesis=1; // (0,1) default 0
mxG.D[mxG.K].a.allowStringAsSource=1; // (0,1) default 1
mxG.D[mxG.K].a.allowFileAsSource=1; // (0,1) default 1
// mxG.D[mxG.K].a.sourceFilter=""; // (str) default ""
mxG.D[mxG.K].a.initMethod="first"; // ("first","loop","last") default "first"
// Goban
mxG.D[mxG.K].a.pointsNumMax=19; // (positive integer) default 0
mxG.D[mxG.K].a.stoneShadowOn=0; // (0,1) default 0 (require in3dOn=1)
mxG.D[mxG.K].a.stretching="0,0,1,1"; // (list) default "0,0,1,1"
mxG.D[mxG.K].a.gridPadding=2; // (float) default 0
mxG.D[mxG.K].a.gridMargin=0; // (float) default 0
mxG.D[mxG.K].a.gobanPadding=0; // (float) default 0
mxG.D[mxG.K].a.gobanMargin=2; // (float) default 0
mxG.D[mxG.K].a.indicesOn=null; // (0,1,null), default null
mxG.D[mxG.K].a.numberingOn=null; // (0,1,2,null) default 0
mxG.D[mxG.K].a.asInBookOn=null; // (0,1,null) default 0
mxG.D[mxG.K].a.marksAndLabelsOn=1; // (0,1) default 0
mxG.D[mxG.K].a.markOnLastOn=0; // (0,1) default 0
mxG.D[mxG.K].a.numAsMarkOnLastOn=0; // (0,1) default 0 (require markOnLastOn=1)
mxG.D[mxG.K].a.japaneseIndicesOn=0; // (0,1) default 0 (require indicesOn=1)
mxG.D[mxG.K].a.oldJapaneseIndicesOn=0; // (0,1) default 0 (require indicesOn=1)
mxG.D[mxG.K].a.eraseGridUnder=1; // (0,1) default 0
// Comment
mxG.D[mxG.K].a.headerInComment=1; // (0,1) default 0
mxG.D[mxG.K].a.canCommentFocus=1; // (0,1) default 0
// Edit
// File
// Header
mxG.D[mxG.K].a.headerBoxOn=0; // (0,1) default 0
mxG.D[mxG.K].a.headerBtnOn=0; // (0,1) default 0
mxG.D[mxG.K].a.hideNumOfMoves=1; // (0,1) default 0
mxG.D[mxG.K].a.helpBtnOn=1; // (0,1) default 0
// Image
mxG.D[mxG.K].a.pngBtnOn=1; // (0,1) default 0
mxG.D[mxG.K].a.svgBtnOn=1; // (0,1) default 0
// Info
mxG.D[mxG.K].a.infoBtnOn=0; // (0,1) default 0
// Menu
mxG.D[mxG.K].a.menus="File,Edit,View,Window"; // (string) default ""
// Pass
mxG.D[mxG.K].a.passBtnOn=1; // (0,1) default 0
// Score
mxG.D[mxG.K].a.scoreBtnOn=1; // (0,1) default 0
// Sgf
mxG.D[mxG.K].a.toCharset="UTF-8"; // (string) default UTF-8
mxG.D[mxG.K].a.sgfBtnOn=1; // (0,1) default 0
mxG.D[mxG.K].a.sgfAction="edit"; // (string) default "show"
// Tree
mxG.D[mxG.K].a.canTreeFocus=1; // (0,1) default 0
// Variation
mxG.D[mxG.K].a.variationMarksOn=0; // (0,1,null) default 0
mxG.D[mxG.K].a.siblingsOn=0; // (0,1,null) default 0
mxG.D[mxG.K].a.hideSingleVariationMarkOn=0; // (0,1) default 0
mxG.D[mxG.K].a.variationBoxOn=0; // (0,1) default 0
mxG.D[mxG.K].a.canPlaceVariation=0; // (0,1) default 0
// Version
mxG.D[mxG.K].a.versionBoxOn=1; // (0,1) default 0
mxG.D[mxG.K].start();
