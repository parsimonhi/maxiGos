// maxiGos v7 WGo+Diagram copyright 1998-2023 FM&SH, BSD license

// maxiGos v7 > mgos_lib.js
if(typeof mxG=='undefined') mxG={};
if(!mxG.V)
{
mxG.V="7.03";
mxG.Y="2023";
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
// maxiGos v7 > mgosNotSeen.js
if(!mxG.G.prototype.createNotSeen)
{
mxG.fr("→","→");
mxG.fr("pass","passe");
mxG.fr("tenuki","ailleurs");
mxG.G.prototype.buildNotSeen=function()
{
	var k,kmx,y,n,no,nat,nato,s="",t,a=[],o;
	var mo=this.gor.setup+1,m=this.gor.play;
	for(k=mo;k<=m;k++)
	{
		x=this.gor.getX(k);
		y=this.gor.getY(k);
		nat=this.gor.getNat(k);
		n=this.getVisibleNum(k);
		if(n>0)
		{
			if((n>1)&&(k>mo)&&(nat==this.gor.getNat(k-1)))
			{
				t=this.local("tenuki");
				a.push({nat:(nat=="B"?"W":"B"),n:(n-1),t:t});
			}
			if(!x&&!y)
			{
				t=this.local("pass");
				a.push({nat:nat,n:n,t:t});
			}
			else if(!this.inView(x,y))
			{
				t=this.local("tenuki");
				a.push({nat:nat,n:n,t:t});
			}
			else
			{
				no=this.getVisibleNum(this.getVisibleMove(x,y));
				if(n!=no)
				{
					if(no&&this.notSeenTwinStonesOn)
					{
						nato=this.getVisibleNat(no);
						t=this.local("→");
						a.push({nat:nat,n:n,t:t,nato:nato,no:no});
					}
					else
					{
						t=this.local("→")+" "+this.scr.k2c(x)+this.scr.k2n(y);
						a.push({nat:nat,n:n,t:t});
					}
				}
			}
		}
	}
	o={in3dOn:this.in3dOn,stoneShadowOn:this.stoneShadowOn};
	if(this.oldJapaneseNumberingOn)
	{
		o.vertical=1;
		km=a.length;
		for(k=0;k<km;k++)
		{
			a[k].n=this.scr.k2okanji(a[k].n);
			if(a[k].no) a[k].no=this.scr.k2okanji(a[k].no);
		}
	}
	if(a.length) return this.scr.makeNotSeen(a,o);
	return "";
};
mxG.G.prototype.adjustNotSeen=function()
{
	var e=this.getE("InnerNotSeenDiv");
	if((this.scr.wr<100)&&!this.magicParentNum)
		e.style.width=this.scr.wr+"%";
};
mxG.G.prototype.updateNotSeen=function()
{
	var s=(this.numberingOn?this.buildNotSeen():""),
		e=this.getE("InnerNotSeenDiv");
	e.innerHTML=s;
	this.adjustNotSeen();
};
mxG.G.prototype.createNotSeen=function()
{
	var s="";
	this.notSeenTwinStonesOn=this.setA("notSeenTwinStonesOn",1,"bool");
	s+="<div class=\"mxNotSeenDiv\" id=\""+this.n+"NotSeenDiv\">";
	s+="<div class=\"mxInnerNotSeenDiv\" id=\""+this.n+"InnerNotSeenDiv\">";
	s+="</div>";
	s+="</div>";
	return s;
};
}
mxG.K++;
mxG.B=["Goban","NotSeen"];
mxG.D[mxG.K]=new mxG.G(mxG.K,mxG.B);
mxG.D[mxG.K].theme="WGo";
mxG.D[mxG.K].config="Diagram";
mxG.D[mxG.K].style=".mxWGoTheme{--gobanMaxWidth:30em;text-align:left;}.mxWGoTheme div::-moz-focus-inner,.mxWGoTheme button::-moz-focus-inner,.mxWGoTheme input[type=text]::-moz-focus-inner,.mxWGoTheme a::-moz-focus-inner{padding:0;border:0;}.mxWGoTheme div:focus,.mxWGoTheme button:focus,.mxWGoTheme input[type=text]:focus,.mxWGoTheme a:focus{outline:none;}.mxWGoTheme button,.mxWGoTheme input[type=button],.mxWGoTheme textarea{-webkit-appearance:none;-moz-appearance:none;}.mxWGoTheme text{cursor:default;}.mxWGoTheme button{cursor:pointer;}.mxWGoTheme input[type=text][disabled],.mxWGoTheme button[disabled]{cursor:default;}.mxWGoTheme{font-family:sans-serif;}.mxWGoTheme svg{font-family:arial,sans-serif;}.mxWGoTheme button{font-family:sans-serif;}.mxWGoTheme{max-width:var(--gobanMaxWidth);min-width:15em;line-height:1.4em;font-family:Calibri,Tahoma,Arial,sans-serif;margin:0 auto;}.mxWGoTheme.mxCommentConfig,.mxWGoTheme.mxTreeConfig{box-sizing:border-box;display:flex;flex-wrap:wrap;justify-content:center;max-width:calc((var(--gobanMaxWidth) * 2) + 1em);}.mxWGoTheme.mxCommentConfig>div,.mxWGoTheme.mxTreeConfig>div{box-sizing:border-box;margin:0.125em;}.mxWGoTheme.mxCommentConfig>div:first-of-type,.mxWGoTheme.mxTreeConfig>div:first-of-type{flex:1 1 var(--gobanMaxWidth);max-width:var(--gobanMaxWidth);}.mxWGoTheme.mxCommentConfig>div:last-of-type,.mxWGoTheme.mxTreeConfig>div:last-of-type{flex:1 1 var(--gobanMaxWidth);max-width:var(--gobanMaxWidth);}.mxWGoTheme.mxCommentConfig .mxGobanGrandParentDiv,.mxWGoTheme.mxTreeConfig .mxGobanGrandParentDiv,.mxWGoTheme.mxCommentConfig .mxCommentParentDiv,.mxWGoTheme.mxTreeConfig .mxTreeParentDiv{display:flex;flex-direction:column;justify-content:space-between;}.mxWGoTheme.mxCommentConfig .mxGobanParentDiv,.mxWGoTheme.mxTreeConfig .mxGobanParentDiv{flex:1;display:flex;flex-direction:column;}.mxWGoTheme.mxCommentConfig .mxGobanDiv,.mxWGoTheme.mxTreeConfig .mxGobanDiv{margin:auto;width:100%;}.mxWGoTheme.mxCommentConfig .mxCommentDiv,.mxWGoTheme.mxTreeConfig .mxCommentDiv,.mxWGoTheme.mxTreeConfig .mxTreeDiv{flex:1;min-height:8em;}.mxWGoTheme.mxCommentConfig .mxCommentDiv,.mxWGoTheme.mxEditConfig .mxTreeDiv,.mxWGoTheme.mxTreeConfig .mxCommentDiv,.mxWGoTheme.mxTreeConfig .mxTreeDiv{position:relative;}.mxWGoTheme.mxCommentConfig .mxCommentContentDiv,.mxWGoTheme.mxEditConfig .mxTreeContentDiv,.mxWGoTheme.mxTreeConfig .mxCommentContentDiv,.mxWGoTheme.mxTreeConfig .mxTreeContentDiv{position:absolute;}.mxWGoTheme.mxBasicConfig .mxGobanDiv,.mxWGoTheme.mxCommentConfig .mxGobanDiv,.mxWGoTheme.mxGameConfig .mxGobanDiv,.mxWGoTheme.mxTreeConfig .mxGobanDiv{background:#f0f0f0;}.mxWGoTheme .mxInnerGobanDiv{-webkit-tap-highlight-color:rgba(0,0,0,0);user-select:none;margin:0 auto;position:relative;}.mxWGoTheme .mxGobanDiv svg{box-sizing:border-box;display:block;width:100%;height:100%;pointer-events:none;background-image:url(data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCABgAGADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6j1MBpbsZORbDntjntUWqtiCbPP72MfjxU96T5t0QM/6MM8fWq2qx/uXweTPGcfgK/nuW7/rufo8XexD94Nxgm7b/ANAqKJj+5HqkPU/7RqYA4OCDm6bH/fNQxMDJaoQMlIiTj3NMt7ElqMODncfNb8P3lMSIDT48cAQsf/HhSWeBPbH+9NJn8HNSBv8AQIgP+eTDn/eFVvH+vIjqSIAbzbn/AJaSjjvwKjsFKzQdMfYzzj0Jp4Obwt0w054/CktMF4hj/l0PFQ1r/XkV0LN+D5N+c8kR/wBKq3xzd6rznMCcevFWr0EwXn1iH/oNVL3P9p6mo4xboc0N/wBfeQv6/AAcXEp+8d8OePYCiBA118xz+7kGD/vU51KzTHn78PA+gpYOL/nIysuR/wACFX/X4g9i3ckie+/6914/E1HqXMIAzzPHkjtwKW4P76/zwRAv9aXUwAq473EePyFQ1uEehWJznr/x9t/6DTIFDvBxyFiAP1JpWHKYOf8ASZDgf7lPtB80RxziEjn6007lMgiXbLaEHJE75/7+VGjFbO2HqhGO+Nw/wqaNciPAwVlc59MyVFFkWkBzk+UDz6lxTasr/wBdALMZzdN6/v8A+lFn/rUx2s8Y65zmmxECaXAAz5/bvwBTLJQ0rt0YWfB9DzUN7D6F66AMV0Dzloif/Har3y41DUz/ANME71YuDtW44BO+LP6Uy9GL7Uh3+zr0+lO1/wCvUhf1+BFJg3U4OD+8hxz9P8KSD/kIY9pgMfUUTN/pc/Xkwce+aIcDUDjr+97Y7iqvrb+twexPdtma/AH/ACwXP60uqKDGucACeMnv6f4VFcgi51HHT7MmMde/+NTaiT9j3erxZP5VMut/63CPQqJgY5xi6kU8dCVpkBw0QHXEI/IE0/lWfJz/AKUxx/wCo4X3TwDoMRn8ADzSiWxI3IgQ5ziTnHvJiiGIizgwD/qU/wDQxUcQ22oK87iDz6+casxgiziIBGYlP/j/AP8AWq918hdRqgi6l65Pnjk/SpLMAP0J/wBD5/WmFs3Lcc75v5CixbfInQ5s+nfvUFdC1cnEt0QDnfD7HtSX7f6dqeOv2dTjqelNuAGluhk8eSRn8KbeZOqahkHH2UH9DUuVv69Sf6/IJU3XU5xxug5B+hpVGdQPTpL/ADFSy4zMOAd0JJ/KmxBf7Scg9DLz2HIra3X+tyXqRyn/AE/UQQSBbLxUt9/x4gk94uPyqCTP2zVOMf6Op5/H/CptQwLNT/twg+1Q+vz/AFHHoVG3POFJ63Uhx/2zpbSLdJbk56RgHnptam7v9LGc5+1S/wDourNqB/ow6nEfI/3WprVlN6FUMI7aHqTjjHtNVtBusYvaJcnI67xVFv3scCDIxnP/AH96fpU9q5XT2I5C8D6CQf41UndK3YgcPmvM/wDTSYY/AUzTm3SW4PVrNvoOafFk3SEdRJMf5cfrUdgD51twP+PJsn8az7f12NOheuFzLdZOQBDilvEA1DUDj/l2H8qS5OIr1sfwRUXjf8TG+yB/x6A5/A0v6/Mn+vyI58hrnpy0A5/ClhQDUXPr5vP/AAIU64GTPgdWg/pTol/08jgHEp/8eFVbX+u4mRXAxPqJI/5dkH4fNS6scWgPQebEPX0pL07ZdRP8X2deg+tO1cg2x6j9/FnA+lOXX+u4R6FI7RchsE4upAcn1SpbaYeZCh64j/kQf51GFDT5BGReOeR/0zpbRA0tucc7YwMem1qSfvWKa0I4FVhEwPGT05/5af8A16RCRYqBwpjY46ZO8U6NRHbxYODgt+PminIv+hJk4xG4I99wzVv4fkJbjreTdeoOv7yYY/AU3TOXiI7WRGPxNSqNl9Fg/ellyce1Jp2VVCOcWhz271n/AF+RXQt3SkQXvPaMH9P8aS5/5CN8eAPsuDT75P8ARb/IHIT37CoJvmvNTOM7YVTH4f8A16T/AK/Ela/16Es/WbnOXhHH4UsPOocekvX/AHhST8NOMYw8I4/CpIhm+JHULKRz/tDmr6/13J6FTVQQL48ZNspzn3NGsE/ZW6j/AEiHofpUt4hmnuY+APsq8+vJqPWTlJfaeLP6VNRrX+u5cen9ditGcvkHn7a4/wDHKsWqgNbdSSIyf++WqtAxDL/19SH/AMc/+tVqxwRDnsIv/QWpx3CWxVUb7bbjorDHT/lsP8an8rFnH2GyQAj/AHwKiiAMO0cZLKf+/wAKsBttoi9cKwH/AH2P8KvW3yJ6iFcXceOSJJj9OBTNPyYyD977Jz+JNBk2Su3OF885/AU+0UK0g/u2iD86yu7lPRF685juxjjMY/LH+NU2OJ9WbJHQcDpgAf0q3eqRDcgE8zJ+RxVVnCnVjkkF8fU8U3v/AF5kR/r8CS5I3XHP/LeJR+lPjdftbc8hJM+x3Uy8+/OOeLqPr/uiq0Df6c5yf+Wo6+4q7a/13F0P/9k=);background-repeat:repeat;}.mxWGoTheme text{stroke-width:0.5px;}.mxWGoTheme text.mxOnBlack{fill:#fff;stroke:#fff;}.mxWGoTheme text.mxOnWhite,.mxWGoTheme text.mxOnEmpty{fill:#000;stroke:#000;}.mxWGoTheme rect.mxPointBackground.mxVariation.mxOnFocus{fill:none;stroke:#000;}.mxWGoTheme .mxTitleH1{font-size:1em;padding:0;margin:0.25em 0;}.mxWGoTheme .mxP:not(:first-child){padding-top:0.5em;}.mxWGoTheme.mxCommentConfig .mxCommentDiv,.mxWGoTheme.mxTreeConfig .mxCommentDiv,.mxWGoTheme.mxTreeConfig .mxTreeDiv{box-sizing:border-box;background:#f5f5f5;border:1px solid #ddd;overflow:auto;}.mxWGoTheme.mxTreeConfig .mxTreeLabelDiv{margin-top:0.25em;}.mxWGoTheme.mxCommentConfig .mxCommentLabelDiv,.mxWGoTheme.mxTreeConfig .mxCommentLabelDiv,.mxWGoTheme.mxTreeConfig .mxTreeLabelDiv{box-sizing:border-box;background:#f0f0f0;border:1px solid #ddd;border-bottom:0;padding:0.25em;font-size:1em;font-weight:bold;}.mxWGoTheme.mxCommentConfig .mxCommentLabelDiv,.mxWGoTheme.mxTreeConfig .mxCommentLabelDiv{background-image:url(\"data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1000 1000\' height=\'1000\' width=\'1000\'%3E%3Cpath d=\'M811 187H186c-14 0-26.333 5-37 15-10.667 10-16 22-16 36v365c0 14 5.333 26.333 16 37 10.667 10.667 23 16 37 16h625c14 0 26.333-5.333 37-16 10.667-10.667 16-23 16-37V238c0-14-5.333-26-16-36s-23-15-37-15zm0-105c43.333 0 80.333 15.333 111 46s46 67.667 46 111v365c0 43.333-15.333 80.333-46 111s-67.667 46-111 46H395L239 917V761h-53c-43.333 0-80.333-15.333-111-46s-46-67.667-46-111V239c0-43.333 15.333-80.333 46-111s67.667-46 111-46z\'/%3E%3C/svg%3E\");background-size:auto 80%;background-repeat:no-repeat;background-position:99% center;}.mxWGoTheme.mxTreeConfig .mxTreeLabelDiv{background-image:url(\"data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' stroke-width=\'60\' stroke=\'rgb(0,0,0)\' viewBox=\'0 0 1000 1000\' height=\'1000\' width=\'1000\'%3E%3Ccircle cx=\'500\' cy=\'800\' r=\'90\'/%3E%3Ccircle cx=\'800\' cy=\'200\' r=\'90\'/%3E%3Ccircle cx=\'200\' cy=\'600\' r=\'90\'/%3E%3Ccircle cx=\'800\' cy=\'600\' r=\'90\'/%3E%3Ccircle cx=\'500\' cy=\'400\' r=\'90\'/%3E%3Cpath d=\'M200,600L800,200\'/%3E%3Cpath d=\'M200,600L500,800\'/%3E%3Cpath d=\'M500,400L800,600\'/%3E%3C/svg%3E\");background-size:auto 80%;background-repeat:no-repeat;background-position:99% center;}.mxWGoTheme.mxCommentConfig .mxCommentContentDiv,.mxWGoTheme.mxTreeConfig .mxCommentContentDiv{padding:0.25em;}.mxWGoTheme.mxCommentConfig .mxCommentContentDiv,.mxWGoTheme.mxTreeConfig .mxCommentContentDiv,.mxWGoTheme.mxTreeConfig .mxTreeContentDiv{padding:0.25em;}.mxWGoTheme.mxTreeConfig .mxTreeDiv{user-select:none;}.mxWGoTheme .mxInnerNotSeenDiv:not(:empty){margin:0.5em auto 0 auto;}.mxWGoTheme .mxInnerNotSeenDiv{margin:0 auto;}.mxWGoTheme .mxNotSeenSvg{width:100%;height:100%;display:block;}.mxWGoTheme.mxGameConfig .mxHeaderDiv h1{font-size:1em;font-weight:bold;padding:0;margin:0.25em 0;}.mxWGoTheme.mxProblemConfig .mxCommentDiv{margin:0.5em auto 0 auto;text-align:center;min-height:1.5em;line-height:1.5em;}.mxWGoTheme.mxProblemConfig .mxCommentContentDiv{display:inline-block;text-align:justify;}.mxWGoTheme input[type=text][disabled],.mxWGoTheme button[disabled]{opacity:0.4;}.mxWGoTheme .mxNavigationParentDiv button:not([disabled]):hover,.mxWGoTheme .mxSolveDiv button:not([disabled]):hover,.mxWGoTheme .mxNavigationDiv input[type=text]:not([disabled]):hover{background-color:rgba(255,255,255,0.45);border:1px solid rgba(100,100,100,0.3);box-shadow:0 0 20px 0 rgba(150,150,150,0.5);}.mxWGoTheme .mxCartoucheDiv{box-sizing:border-box;background:#f0f0f0;position:relative;min-height:2.5em;line-height:2.5em;padding:0 calc(0.75em *5.75) 0 2.5em;border:1px solid #dcdcdc;}.mxWGoTheme .mxCartoucheDiv:nth-of-type(1){border-bottom:0;}.mxWGoTheme .mxCartoucheDiv .mxPlayerStoneDiv{box-sizing:border-box;position:absolute;left:0;top:0;bottom:0;width:2.5em;padding:0.125em;}.mxWGoTheme .mxCartoucheDiv .mxPlayerStoneDiv svg{width:100%;height:100%;}.mxWGoTheme .mxCartoucheDiv .mxPlayerDiv{box-sizing:border-box;font-weight:bold;}.mxWGoTheme .mxCartoucheDiv .mxRankDiv,.mxWGoTheme .mxCartoucheDiv .mxPrisonersDiv{position:absolute;top:0.25em;bottom:0.25em;box-sizing:border-box;font-size:0.75em;line-height:1.125em;min-width:2.5em;max-width:2.5em;display:flex;flex-direction:column;justify-content:center;align-items:center;border:1px solid #e7e7e7;background:#f5f5f5;}.mxWGoTheme .mxCartoucheDiv .mxRankDiv{right:3em;}.mxWGoTheme .mxCartoucheDiv .mxPrisonersDiv{right:0.25em;}.mxWGoTheme .mxCartoucheDiv .mxPrisonersStoneSpan{display:none;}.mxWGoTheme.mxCommentConfig .mxCommentDiv:focus,.mxWGoTheme.mxTreeConfig .mxCommentDiv:focus,.mxWGoTheme.mxTreeConfig .mxTreeDiv:focus{background:rgba(0,0,0,0.05);}.mxWGoTheme .mxNavigationParentDiv button:not([disabled]):focus,.mxWGoTheme .mxSolveDiv button:not([disabled]):focus,.mxWGoTheme .mxNavigationDiv input[type=text]:not([disabled]):focus{outline:1px dotted #000;}.mxWGoTheme .mxGBoxDiv{color:#fff;background:rgba(0,0,0,0.75);overflow:auto;}.mxWGoTheme .mxGBoxDiv .mxShowContentDiv{padding:0.25em;}.mxWGoTheme .mxGBoxDiv .mxShowContentDiv h1{font-size:1em;padding:0;margin:0.25em 0;}.mxWGoTheme .mxGBoxDiv .mxOKDiv{text-align:center;}.mxWGoTheme .mxGBoxDiv .mxOKDiv button{color:#fff;background:#000;border:1px solid #fff;;border-radius:0.25em;font-size:1em;margin:0.5em 0.25em;height:2em;line-height:2em;padding:0 1em;}.mxWGoTheme .mxShowOptionDiv{line-height:1.75em;}.mxWGoTheme .mxNumFromTextSpan,.mxWGoTheme .mxNumWithTextSpan{position:relative;left:2em;white-space:nowrap;}.mxWGoTheme .mxNumFromTextSpan:before{content:\"\\a\";white-space:pre-line;}.mxWGoTheme .mxShowOptionDiv input[type=text]{font-size:1em;}.mxWGoTheme input:not(:checked)~.mxNumFromTextSpan,.mxWGoTheme input:not(:checked)~.mxNumWithTextSpan{display:none;}.mxWGoTheme .mxGBoxDiv .mxShowContentDiv a{color:#fff;}.mxWGoTheme .mxGBoxDiv .mxShowContentDiv a:focus,.mxWGoTheme .mxGBoxDiv .mxShowContentDiv a:hover{color:#f00;}.mxWGoTheme .mxGBoxDiv .mxOKDiv button:focus,.mxWGoTheme .mxGBoxDiv .mxOKDiv button:hover{color:#f00;border:1px solid #f00;}.mxWGoTheme:not(.mxLoopConfig) .mxNavigationParentDiv{box-sizing:border-box;display:flex;justify-content:space-between;align-items:center;border:0;margin:4px 0;}.mxWGoTheme .mxSolveDiv{margin:4px 0;}.mxWGoTheme:not(.mxLoopConfig) .mxNavigationDiv,.mxWGoTheme .mxAboutDiv,.mxWGoTheme .mxHeaderDiv,.mxWGoTheme .mxOptionDiv,.mxWGoTheme .mxSolveDiv{box-sizing:border-box;display:flex;justify-content:center;align-items:center;}.mxWGoTheme:not(.mxLoopConfig) .mxNavigationDiv{flex:7;}.mxWGoTheme .mxAboutDiv,.mxWGoTheme .mxHeaderDiv,.mxWGoTheme .mxOptionDiv{flex:1;}.mxWGoTheme .mxAboutDiv{justify-content:flex-end;margin-left:12px;}.mxWGoTheme .mxHeaderDiv,.mxWGoTheme .mxOptionDiv{justify-content:flex-start;margin-right:12px;}.mxWGoTheme .mxNavigationDiv .mxGotoInput{box-sizing:border-box;display:block;font-family:Arial,sans-serif;font-size:1em;flex:1;width:2em;min-width:2em;height:2em;text-align:center;margin:0;padding:0;color:#000;border:1px solid #d3d3d3;border-radius:2px;background:transparent;}.mxWGoTheme .mxNavigationDiv .mxGotoInput:focus{border:1px solid #000;}.mxWGoTheme .mxNavigationParentDiv button,.mxWGoTheme .mxSolveDiv button{display:block;box-sizing:border-box;position:relative;font-size:1em;color:#000;background-color:transparent;background-image:none;background:linear-gradient(to top,#ddd,#fff);box-shadow:none;border-top:1px solid #cecece;border-left:1px solid #d3d3d3;border-right:1px solid #d3d3d3;border-bottom:1px solid #dedede;border-radius:2px;padding:0;margin:0;}.mxWGoTheme .mxNavigationParentDiv button{flex:1;}.mxWGoTheme .mxAboutDiv button{margin-left:4px;}.mxWGoTheme .mxHeaderDiv button,.mxWGoTheme .mxOptionDiv button{margin-right:4px;}.mxWGoTheme .mxNavigationDiv button,.mxWGoTheme .mxNavigationDiv input,.mxWGoTheme .mxSolveDiv button{margin:0 2px;}.mxWGoTheme .mxNavigationParentDiv button svg{display:block;width:100%;height:100%;opacity:0;}.mxWGoTheme .mxSolveDiv button svg{display:block;width:100%;height:100%;max-width:3em;min-width:24px;}.mxWGoTheme .mxNavigationDiv{user-select: none;}.mxWGoTheme .mxNavigationParentDiv button span span{display:none;}.mxWGoTheme .mxNavigationParentDiv button span{display:block;}.mxWGoTheme .mxNavigationDiv .mxFirstBtn span,.mxWGoTheme .mxNavigationDiv .mxTenPredBtn span,.mxWGoTheme .mxNavigationDiv .mxPredBtn span{-webkit-transform:scaleX(-1);transform:scaleX(-1);}.mxWGoTheme .mxNavigationDiv .mxPredBtn span,.mxWGoTheme .mxNavigationDiv .mxNextBtn span{background:url(\"data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1000 1000\' height=\'1000\' width=\'1000\'%3E%3Cpath d=\'M736,523Q750,513 750,497 750,483 736,473L308,207Q284,191 267,201 250,211 250,241L250,755Q250,785 267,795 284,805 308,789Z\'/%3E%3C/svg%3E\");background-size:cover;}.mxWGoTheme .mxNavigationDiv .mxTenPredBtn span,.mxWGoTheme .mxNavigationDiv .mxTenNextBtn span{background:url(\"data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1000 1000\' height=\'1000\' width=\'1000\'%3E%3Cpath d=\'M 926,521Q940,511 940,497 940,483 926,475L554,227Q532,213 517,221 502,229 502,257L502,739Q502,767 517,775 532,783 554,769ZM472,521Q486,511 486,497 486,483 472,475L112,227Q92,213 76,221 60,229 60,257L60,739Q60,767 76,775 92,783 112,769Z\'/%3E%3C/svg>\");background-size:cover;}.mxWGoTheme .mxNavigationDiv .mxFirstBtn span,.mxWGoTheme .mxNavigationDiv .mxLastBtn span{background:url(\"data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1000 1000\' height=\'1000\' width=\'1000\'%3E%3Cpath d=\'M 612,521 Q 626,511 626,497 626,485 612,475 L 250,247 Q 228,233 214,242 200,251 200,277 L 200,719 Q 200,745 214,754 228,763 250,749 Z M 726,789 Q 800,789 800,731 L 800,265 Q 800,207 726,207 650,207 650,265 L 650,731 Q 650,789 726,789Z\'/%3E%3C/svg>\");background-size:cover;}.mxWGoTheme .mxOptionDiv .mxOptionBtn span{background:url(\"data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1000 1000\' height=\'1000\' width=\'1000\'%3E%3Cpath d=\'M 800,550 Q 822,550 836,535 850,520 850,500 850,480 835,465 820,450 800,450 L 200,450 Q 180,450 165,465 150,480 150,500 150,520 164,535 178,550 200,550 L 800,550 Z M 200,650 Q 180,650 165,665 150,680 150,700 150,720 164,735 178,750 200,750 L 800,750 Q 822,750 836,735 850,720 850,700 850,680 835,665 820,650 800,650 L 200,650 Z M 800,350 Q 822,350 836,335 850,320 850,300 850,280 835,265 820,250 800,250 L 200,250 Q 180,250 165,265 150,280 150,300 150,320 164,335 178,350 200,350 L 800,350 Z\'/%3E%3C/svg%3E\");background-size:cover;}.mxWGoTheme .mxHeaderDiv .mxHeaderBtn span{background:url(\"data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1000 1000\' height=\'1000\' width=\'1000\'%3E%3Cpath d=\'M 687,785 687,856 Q 687,871 676,881 665,891 651,892 L 365,892 Q 350,892 340,881 330,870 329,856 L 329,785 Q 329,770 340,760 351,750 365,749 L 401,749 401,535 365,535 Q 350,535 340,524 330,513 329,499 L 329,428 Q 329,413 340,403 351,393 365,392 L 579,392 Q 594,392 604,403 614,414 615,428 L 615,749 651,749 Q 666,749 676,760 686,771 687,785 Z M 616,142 616,249 Q 616,264 605,274 594,284 580,285 L 437,285 Q 422,285 412,274 402,263 401,249 L 401,142 Q 401,127 412,117 423,107 437,106 L 580,106 Q 595,106 605,117 615,128 616,142 Z\'/%3E%3C/svg%3E\");background-size:cover;}.mxWGoTheme .mxAboutDiv .mxAboutBtn span{background:url(\"data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1000 1000\' height=\'1000\' width=\'1000\'%3E%3Cpath d=\'M 575,771 575,664 Q 575,656 570,651 565,646 557,646 L 450,646 Q 442,646 437,651 432,656 432,664 L 432,771 Q 432,779 437,784 442,789 450,789 L 557,789 Q 565,789 570,784 575,779 575,771 Z M 718,396 Q 718,347 687,305 656,263 610,240 564,217 515,217 379,217 308,336 300,349 312,359 L 386,415 Q 390,418 397,418 406,418 411,411 441,373 459,360 478,347 507,347 534,347 555,362 576,377 576,395 576,416 565,429 554,442 527,454 492,470 463,502 434,534 434,572 L 434,592 Q 434,600 439,605 444,610 452,610 L 559,610 Q 567,610 572,605 577,600 577,592 577,581 589,564 601,547 619,536 637,526 646,520 655,514 672,500 689,486 697,473 705,460 713,439 721,418 720,394 Z M 932,503 Q 932,620 875,718 818,816 719,874 620,932 504,931 388,930 289,874 190,818 133,718 76,618 76,503 76,388 133,288 190,188 289,132 388,76 504,75 620,74 719,132 818,190 875,288 932,386 932,503 Z\'/%3E%3C/svg%3E\");background-size:cover;}@media screen and (max-width:50em){.mxWGoTheme{--labelSize:0.75;}.mxWGoTheme.mxCommentConfig .mxCommentParentDiv,.mxWGoTheme.mxTreeConfig .mxCommentParentDiv{position:relative;}.mxWGoTheme.mxTreeConfig .mxTreeLabelDiv{margin-top:0;}.mxWGoTheme.mxTreeConfig .mxTreeDiv{margin-top:0.25em;}.mxWGoTheme.mxCommentConfig .mxCommentContentDiv,.mxWGoTheme.mxTreeConfig .mxCommentContentDiv,.mxWGoTheme.mxTreeConfig .mxTreeContentDiv{left:calc(2em * var(--labelSize));height:8em;}.mxWGoTheme.mxCommentConfig .mxCommentLabelDiv,.mxWGoTheme.mxTreeConfig .mxCommentLabelDiv,.mxWGoTheme.mxTreeConfig .mxTreeLabelDiv{position:absolute;transform:rotate(-90deg);transform-origin:top left;font-size:calc(1em * var(--labelSize));width:calc(8em / var(--labelSize));height:2em;line-height:1.25;z-index:1;border:1px solid #ddd;}.mxWGoTheme.mxCommentConfig .mxCommentLabelDiv,.mxWGoTheme.mxTreeConfig .mxCommentLabelDiv{top:calc(8.125em / var(--labelSize) - 2px);}.mxWGoTheme.mxTreeConfig .mxTreeLabelDiv{top:calc(16.375em / var(--labelSize) - 2px);}}";
// general
mxG.D[mxG.K].a.in3dOn=1; // (0,1) default 1
mxG.D[mxG.K].a.htmlParenthesis=1; // (0,1) default 0
mxG.D[mxG.K].a.allowStringAsSource=1; // (0,1) default 1
mxG.D[mxG.K].a.allowFileAsSource=1; // (0,1) default 1
// mxG.D[mxG.K].a.sourceFilter=""; // (str) default ""
mxG.D[mxG.K].a.initMethod="last"; // ("first","loop","last") default "first"
// Goban
mxG.D[mxG.K].a.pointsNumMax=19; // (positive integer) default 0
mxG.D[mxG.K].a.stoneShadowOn=1; // (0,1) default 0 (require in3dOn=1)
mxG.D[mxG.K].a.specialStoneOn=1; // (0,1) default 0 (require in3dOn=1)
mxG.D[mxG.K].a.stretching="0,0,1,1"; // (list) default "0,0,1,1"
mxG.D[mxG.K].a.gridPadding=2; // (float) default 0
mxG.D[mxG.K].a.gridMargin=0; // (float) default 0
mxG.D[mxG.K].a.gobanPadding=0; // (float) default 0
mxG.D[mxG.K].a.gobanMargin=2; // (float) default 0
mxG.D[mxG.K].a.indicesOn=1; // (0,1,null), default null
mxG.D[mxG.K].a.numberingOn=1; // (0,1,2,null) default null
mxG.D[mxG.K].a.asInBookOn=1; // (0,1,null) default null
mxG.D[mxG.K].a.marksAndLabelsOn=1; // (0,1) default 0
mxG.D[mxG.K].a.markOnLastOn=0; // (0,1) default 0
mxG.D[mxG.K].a.numAsMarkOnLastOn=0; // (0,1) default 0 (require markOnLastOn=1)
mxG.D[mxG.K].a.japaneseIndicesOn=0; // (0,1) default 0 (require indicesOn=1)
mxG.D[mxG.K].a.oldJapaneseIndicesOn=0; // (0,1) default 0 (require indicesOn=1)
mxG.D[mxG.K].a.eraseGridUnder=1; // (0,1) default 0
mxG.D[mxG.K].start();
