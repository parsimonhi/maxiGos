// maxiGos v8 WGo+Game copyright 1998-2024 FM&SH, BSD license
if(typeof mxG=='undefined') mxG={};
if(!mxG.V)
{
mxG.V="8.02";
mxG.Y="2024";
mxG.C="FM&SH";
mxG.D=[];
mxG.K=0;
if(!mxG.Z) mxG.Z=[];
if(!mxG.Z.fr) mxG.Z.fr=[];
if(!mxG.Z.en) mxG.Z.en=[];
String.prototype.c2n=function(k){let n=this.charCodeAt(k);return n-((n<97)?38:96);};
String.prototype.ucF=function(){return this.charAt(0).toUpperCase()+this.slice(1);};
String.prototype.lcF=function(){return this.charAt(0).toLowerCase()+this.slice(1);};
String.prototype.noT=function(){return this.replaceAll("<","&lt;").replaceAll(">","&gt;");};
String.prototype.noP=function(){return this.replaceAll("(","&#40;").replaceAll(")","&#41;");};
String.prototype.reP=function(){return this.replaceAll("&#40;","(").replaceAll("&#41;",")");};
mxG.getMClick=function(ev)
{
	let b=this.getBoundingClientRect();
	return {x:ev.clientX-b.left,y:ev.clientY-b.top};
};
mxG.getLang=function(t)
{
	while(t&&!t.lang) t=t.parentNode;
	return t?t.lang:(navigator.language||"en");
};
mxG.fr=function(a,b){mxG.Z.fr[a]=b;};
mxG.en=function(a,b){mxG.Z.en[a]=b;};
}
if(!mxG.N)
{
mxG.N=function(n,p,v)
{
	this.Kid=[];
	this.P={};
	this.Dad=n;
	this.Focus=0;
	if(n) {n.Kid.push(this);if(!n.Focus) n.Focus=1;}
	if(p) this.P[p]=[v];
};
mxG.N.prototype.takeOff=function(p,k)
{
	if(this.P[p])
	{
		if(k<0) this.P[p].splice(0,this.P[p].length);else this.P[p].splice(k,1);
		if(!this.P[p].length) delete this.P[p];
	}
};
mxG.N.prototype.put=function(p,v)
{
	this.P[p]=(typeof(v)=="object")?v:[v];
};
mxG.N.prototype.clone=function(dad)
{
	let p,k,bN=new mxG.N(dad,null,null);
	for(p in this.P) if(p.match(/^[A-Z]+$/)&&this.P.hasOwnProperty(p))
		bN.P[p]=this.P[p].concat();
	for(k=0;k<this.Kid.length;k++)
		bN.Kid[k]=this.Kid[k].clone(bN);
	bN.Focus=this.Focus;
	return bN;
};
}
if(!mxG.P)
{
mxG.P=function(s,coreOnly,mainOnly)
{
	this.rN=new mxG.N(null,null,null);
	this.coreOnly=coreOnly;
	this.mainOnly=mainOnly;
	this.parseSgf(s);
	if(!this.rN.Focus) this.parseSgf("(;FF[4]CA[UTF-8]GM[1]SZ[19])");
	return this.rN;
};
mxG.P.prototype.keep=function(a,p,v)
{
	if((a=="N")||(a=="P")||(a=="V"))
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
	if(!this.coreOnly||this.keep(a,p,v))
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
	s=s.replace(/(^|[^\\])((\\\\)*)\\((\n\r)|(\r\n)|\r|\n)/g,'$1$2 ');
	s=s.replace(/(^|[^\\])((\\\\)*)\\/g,'$1$2').replace(/\\\\/g,'\\');
	return s.replace(/(\n\r)|(\r\n)|\r/g,"\n");
};
mxG.P.prototype.parseValue=function(p,K,c)
{
	let v="",a;
	K++;
	while((K<this.len)&&((a=this.s.charAt(K))!=']'))
	{
		if(a=='\\'){v+=a;K++;a=this.s.charAt(K);}
		if(K<this.len) v+=a;
		K++;
	}
	v=v.match(/^[0-9a-zA-Z+:.]+$/)?v:this.clean(v);
	if(p=="RE"){a=v.slice(0,1);if((a=="V")||(a=="D")) v=a;}
	if(this.nc){this.nc=0;this.out("N",p,v);}
	else if(!c) this.out("P",p,v);
	else this.out("V",p,v);
	K++;
	while(K<this.len)
	{
		a=this.s.charAt(K);
		if((a=='(')||(a==';')||(a==')')||((a>='A')&&(a<='Z'))||(a=='[')) break;
		K++;
	}
	return K;
};
mxG.P.prototype.parseProperty=function(K)
{
	let a,p="",c=0;
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
	let a;
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
	let a=(this.mainOnly?1:0);
	if(this.nv) {if(this.v.length) this.out("v=","","");this.nv=0;}
	else this.out("v+","","");
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
	let K=0;
	this.rN.Kid=[];
	this.rN.Focus=0;
	this.nN=this.rN;
	this.v=[];
	this.nv=0;
	this.nc=0;
	this.s=s;
	this.len=this.s.length;
	while(K<this.len) if(this.s.charAt(K)=='('){K++;K=this.parseVariation(K);} else K++;
	while(this.v.length) this.out("v-","","");
};
}
if(!mxG.R)
{
mxG.R=function()
{
	this.act=[""];
	this.nat=["E"];
	this.x=[0];
	this.y=[0];
	this.o=[0];
};
mxG.R.prototype.init=function(DX,DY)
{
	this.play=0;
	this.setup=0;
	this.DX=DX;
	this.DY=DY;
	this.ban=[];
	for(let i=1;i<=this.DX;i++)
	{
		this.ban[i]=[];
		for(let j=1;j<=this.DY;j++) this.ban[i][j]=0;
	}
	this.prisoners={B:[0],W:[0]};
};
mxG.R.prototype.inGoban=function(x,y)
{
	return (x>=1)&&(y>=1)&&(x<=this.DX)&&(y<=this.DY);
};
mxG.R.prototype.lib=function(nat,x,y)
{
	if(!this.inGoban(x,y)) return 0;
	if(this.nat[this.ban[x][y]]=="E") return 1;
	if(this.nat[this.ban[x][y]]!=nat) return 0;
	let k,km=this.s.length;
	for(k=0;k<km;k++) if((this.s[k].x==x)&&(this.s[k].y==y)) return 0;
	this.s[km]={x:x,y:y};
	if(this.lib(nat,x,y-1)||this.lib(nat,x+1,y)||this.lib(nat,x,y+1)||this.lib(nat,x-1,y))
		return 1;
	return 0;
};
mxG.R.prototype.capture=function(nat,x,y)
{
	this.s=[];
	if(this.lib(nat,x,y)) return 0;
	let n=this.s.length,pt;
	while(this.s.length)
	{
		pt=this.s.pop();
		this.o[this.ban[pt.x][pt.y]]=this.play;
		this.ban[pt.x][pt.y]=0;
	}
	return n;
};
mxG.R.prototype.place=function(nat,x,y)
{
	this.play++;
	let act=((nat.length>1)?"A":""),
		pNat=nat.slice(-1),
		oNat=((pNat=="B")?"W":((pNat=="W")?"B":"E")),
		m=this.play,p;
	this.act[m]=act;
	this.nat[m]=pNat;
	this.prisoners.B[m]=this.prisoners.B[m-1];
	this.prisoners.W[m]=this.prisoners.W[m-1];
	this.o[m]=0;
	if(this.inGoban(x,y))
	{
		this.x[m]=x;
		this.y[m]=y;
		if(act!="A")
		{
			this.ban[x][y]=m;
			p=this.capture(oNat,x-1,y);
			p+=this.capture(oNat,x+1,y);
			p+=this.capture(oNat,x,y-1);
			p+=this.capture(oNat,x,y+1);
			if(p) this.prisoners[pNat][m]+=p;
			else this.prisoners[oNat][m]+=this.capture(pNat,x,y);
		}
		else
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
	for(let k=1;k<=play;k++) this.place(this.act[k]+this.nat[k],this.x[k],this.y[k]);
};
mxG.R.prototype.isOccupied=function(x,y)
{
	return this.nat[this.ban[x][y]]!="E";
};
mxG.R.prototype.isOnlyOne=function(k,nat)
{
	let n=1,x=this.x[k],y=this.y[k];
	if((x>1)&&(this.nat[this.ban[x-1][y]]==nat)) n++;
	if((y>1)&&(this.nat[this.ban[x][y-1]]==nat)) n++;
	if((x<this.DX)&&(this.nat[this.ban[x+1][y]]==nat)) n++;
	if((y<this.DY)&&(this.nat[this.ban[x][y+1]]==nat)) n++;
	return n==1;
};
mxG.R.prototype.hasOnlyOneLib=function(k)
{
	let n=0,x=this.x[k],y=this.y[k];
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
	let m=this.play;
	if(m<4) return 0;
	let pNat=nat.slice(-1),
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
	let m=this.play,
		pNat=nat.slice(-1),oNat=((pNat=="B")?"W":((pNat=="W")?"B":"E")),
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
			&&(this.isOccupied(x,y)||this.isKo(nat,x,y)||this.isSuicide(nat,x,y)));
};
mxG.R.prototype.getBanNum=function(x,y){return this.ban[x][y];};
mxG.R.prototype.getBanNat=function(x,y){return this.nat[this.ban[x][y]];};
mxG.R.prototype.getNat=function(n){return this.nat[n];};
mxG.R.prototype.getX=function(n){return this.x[n];};
mxG.R.prototype.getY=function(n){return this.y[n];};
mxG.R.prototype.getAct=function(n){return this.act[n];};
mxG.R.prototype.getPrisoners=function(nat){return this.prisoners[nat][this.play];};
mxG.R.prototype.getO=function(n){return this.o[n];};
}
if(!mxG.S)
{
mxG.S=function(p)
{
	this.p=p;
	this.d=23;
	this.ff="Arial,sans-serif";
	this.fs=14*this.d/23;
	this.fw=400;
	this.r4star="2.5";
	this.sw4grid="1";
	this.sw4mark="1";
	this.sw4stone="1";
	this.sw4text="0";
	this.stoneShadowWidth=1;
	this.glc="#000";
	this.xmlnsUrl="http://www.w3.org/2000/svg";
	this.xlinkUrl="http://www.w3.org/1999/xlink";
	this.xmlns="xmlns=\""+this.xmlnsUrl+"\"";
	this.xlink=" xmlns:xlink=\""+this.xlinkUrl+"\"";
};
mxG.S.prototype.star=function(x,y)
{
	let DX=this.DX,DY=this.DY,xok=0,yok=0,
		Ax=4,Bx=DX+1-Ax,Cx=(DX+1)>>1,Ay=4,By=DY+1-Ay,Cy=(DY+1)>>1;
	if(DX>15){if((x==Ax)||(x==Bx)||((DX&1)&&(x==Cx))) xok=1;}
	else if(DX>11){if((x==Ax)||(x==Bx)||((x==y)&&(DX&1)&&(x==Cx))) xok=1;}
	else if((DX&1)&&(x==Cx)) xok=1;
	if(DY>15){if((y==Ay)||(y==By)||((DY&1)&&(y==Cy))) yok=1;}
	else if(DY>11){if((y==Ay)||(y==By)||((x==y)&&(DY&1)&&(y==Cy))) yok=1;}
	else if((DY&1)&&(y==Cy)) yok=1;
	return xok&&yok;
};
mxG.S.prototype.i2x=function(i){return this.dw*(i-this.xl+0.5)+this.gbsxl;};
mxG.S.prototype.j2y=function(j){return this.dh*(j-this.yt+0.5)+this.gbsyt;};
mxG.S.prototype.isLabel=function(m){return /^\(*\|.*\|\)*$/.test(m);};
mxG.S.prototype.isMark=function(m){return /^\(*_(CR|MA|SQ|TR)_\)*$/.test(m);};
mxG.S.prototype.isVariation=function(m){return /^\(.*\)$/.test(m);};
mxG.S.prototype.isVariationOnFocus=function(m){return /^\(\([^()]*\)\)$/.test(m);};
mxG.S.prototype.removeLabelDelimiters=function(m)
{
	return m.replace(/^(\(*)\|(.*)\|(\)*)$/,"$1$2$3");
};
mxG.S.prototype.removeVariationDelimiters=function(m)
{
	return m.replace(/^\(+([^()]*)\)+$/,"$1");
};
mxG.S.prototype.makeText=function(txt,x,y,c,o)
{
	let s="<text aria-hidden=\"true\"";
	if(o.ij) s+=" data-maxigos-ij=\""+o.ij+"\"";
	if(!o.ignoreTextAnchor) s+=" text-anchor=\"middle\"";
	if(c&&!o.ignoreFillAndStroke)
	{
		s+=" fill=\""+c+"\"";
		if(this.sw4text!="0") s+=" stroke=\""+c+"\" stroke-width=\""+this.sw4text+"\"";
	}
	if(o.cls) s+=" class=\""+o.cls+"\"";
	txt+="";
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
			let sx=(txt.length>2)?0.8:0.9;
			s+=" transform=\"matrix("+sx+",0,0,1,"+Math.round(x*(1-sx)*100)/100+",0)\"";
		}
	}
	s+=" x=\""+x+"\" y=\""+(y+5)+"\">"+txt+"</text>";
	return s;
};
mxG.S.prototype.make2dStone=function(c,x,y,r,o)
{
	let s="<circle class=\"mx"+c+"\"";
	if(o.opacity<1) s+="fill-opacity=\""+o.opacity+"\"";
	if(!o.ignoreFillAndStroke)
	{
		s+=" fill=\""+(c=="Black"?"#000":"#fff")+"\"";
		s+=" stroke=\""+(((c=="Black")&&o.whiteStroke4Black)?"#fff":"#000")+"\"";
		s+=" stroke-width=\""+this.sw4stone+"\"";
	}
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+(r-(this.sw4stone-1)/2)+"\"/>";
	return s;
};
mxG.S.prototype.makeStoneShadow=function(c,x,y,r,o)
{
	let e=this.stoneShadowWidth,s="<circle";
	if(!o.ignoreFillAndStroke) s+=" fill=\"#000\" opacity=\"0.2\"";
	s+=" cx=\""+(x+e)+"\" cy=\""+(y+e)+"\" r=\""+r+"\"/>";
	return s;
};
mxG.S.prototype.make3dStone1=function(c,x,y,r,o)
{
	let e=this.stoneShadowWidth,s="";
	if(o.stoneShadowOn) s+=this.makeStoneShadow(c,x,y,r,o);
	s+="<circle class=\"mx"+c+"\"";
	if(o.opacity<1) s+="fill-opacity=\""+o.opacity+"\"";
	if(!o.ignoreFillAndStroke) s+=" fill=\"url(#"+this.p.n+c[0]+"RG)\"";
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+r+"\"/>";
	return s;
};
mxG.S.prototype.make3dStone2=function(c,x,y,r,o)
{
	let a,s="";
	if(o.stoneShadowOn) s+=this.makeStoneShadow(c,x,y,r,o);
	s+="<circle class=\"mx"+c+"\"";
	if(o.opacity<1) s+="fill-opacity=\""+o.opacity+"\"";
	s+=" fill=\"url(#"+this.p.n+c[0]+"RGA)\"";
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+r+"\"/>";
	s+="<circle class=\"mx"+c+"2\"";
	if(o.opacity<1) s+="fill-opacity=\""+o.opacity+"\"";
	a=(c=="White")?Math.floor(x*this.p.alea+y)%8:"";
	s+=" fill=\"url(#"+this.p.n+c[0]+"RGB"+a+")\"";
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+r+"\"/>";
	return s;
};
mxG.S.prototype.makeStone=function(c,x,y,r,o)
{
	if(o.in3dOn) return this["make3dStone"+(this.p.specialStoneOn?2:1)](c,x,y,r,o);
	return this.make2dStone(c,x,y,r,o);
};
mxG.S.prototype.makeAloneStone=function(nat,n,o)
{
	let s,d=this.d,dd=d+2,x=dd/2,y=dd/2,z;
	z=(o.in3dOn&&o.stoneShadowOn)?this.stoneShadowWidth:0;
	s="<svg "+this.xmlns+" "+this.xlink;
	s+=" viewBox=\""+(-z)+" "+(-z)+" "+(dd+2*z)+" "+(dd+2*z)+"\"";
	s+=" width=\"40\" height=\"40\"";
	s+=" font-family=\""+this.ff+"\"";
	s+=" font-size=\""+this.fs+"\"";
	s+=" font-weight=\""+this.fw+"\"";
	if(o.ariaHidden) s+=" aria-hidden=\"true\"";
	s+=">";
	if(o.title) s+="<title>"+o.title+"</title>";
	o.opacity=1;
	s+=this.makeStone((nat=="B")?"Black":"White",x,y,d/2,o);
	if(n) s+=this.makeText(n,dd/2,dd/2,(nat=="B")?"White":"Black",o);
	s+="</svg>";
	return s;
};
mxG.S.prototype.makeMarkOnLast=function(c,x,y,o)
{
	let s,z=4;
	s="<rect class=\""+o.cls+"\" fill=\""+c+"\"";
	s+=" x=\""+(x-z)+"\" y=\""+(y-z)+"\" width=\""+z*2+"\" height=\""+z*2+"\"/>";
	return s;
};
mxG.S.prototype.makeMark=function(c,x,y,o)
{
	let s,z=6;
	s="<path class=\""+o.cls+"\"";
	if(o.ij) s+=" data-maxigos-ij=\""+o.ij+"\"";
	s+=" stroke-width=\""+this.sw4mark+"\" stroke=\""+c+"\" fill=\"none\"";
	s+=" d=\"M"+(x-z)+" "+(y-z)+"L"+(x+z)+" "+(y+z)+"M"+(x-z)+" "+(y+z)+"L"+(x+z)+" "+(y-z)+"\"/>";
	return s;
};
mxG.S.prototype.makeCircle=function(c,x,y,o)
{
	let s,z=6.5;
	s="<circle class=\""+o.cls+"\"";
	if(o.ij) s+=" data-maxigos-ij=\""+o.ij+"\"";
	s+=" stroke-width=\""+this.sw4mark+"\" stroke=\""+c+"\" fill=\"none\"";
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+z+"\"/>";
	return s;
};
mxG.S.prototype.makeTriangle=function(c,x,y,o)
{
	let s,z=7.5;
	s="<polygon class=\""+o.cls+"\"";
	if(o.ij) s+=" data-maxigos-ij=\""+o.ij+"\"";
	s+=" stroke-width=\""+this.sw4mark+"\" stroke=\""+c+"\" fill=\"none\"";
	s+=" points=\""+x+" "+(y-z)+" "+(x-z)+" "+(y+z*0.8)+" "+(x+z)+" "+(y+z*0.8)+"\"/>";
	return s;
};
mxG.S.prototype.makeSquare=function(c,x,y,o)
{
	let s,z=6;
	s="<rect class=\""+o.cls+"\"";
	if(o.ij) s+=" data-maxigos-ij=\""+o.ij+"\"";
	s+=" stroke-width=\""+this.sw4mark+"\" stroke=\""+c+"\" fill=\"none\"";
	s+=" x=\""+(x-z)+"\" y=\""+(y-z)+"\" width=\""+z*2+"\" height=\""+z*2+"\"/>";
	return s;
};
mxG.S.prototype.makeTerritoryMark=function(a,x,y,o)
{
	let c=a.match(/_TB_/)?"Black":"White";
	if(this.p.territoryMark=="MA") return this.makeMark(c,x,y,o);
	o={opacity:1,in3dOn:this.in3dOn,stoneShadowOn:this.stoneShadowOn};
	return this.makeStone(c,x,y,5,o);
};
mxG.S.prototype.makeFocusMark=function(x,y)
{
	let z=this.d/2+1,s="<rect class=\"mxFocusMark\" stroke-width=\""+this.sw4grid+"\" stroke=\""+this.glc+"\" fill=\"none\"";
	return s+" x=\""+(x-z)+"\" y=\""+(y-z)+"\" width=\""+z*2+"\" height=\""+z*2+"\"/>";
};
mxG.S.prototype.makeMarkOrLabel=function(i,j,nat,a)
{
	let s="",c=(nat=="B")?"#fff":(nat=="W")?"#000":this.glc,
		cls="mxOn"+((nat=="B")?"Black":(nat=="W")?"White":"Empty"),
		x=this.i2x(i),y=this.j2y(j),o={};
	if(a.match(/^\(*_TB_|_TW_\)*$/))
		s+=this.makeTerritoryMark(a,x,y,{cls:"mxTerritoryMark "+cls});
	else if(a.match(/^\(*_ML_\)*$/))
		s+=this.makeMarkOnLast(c,x,y,{cls:"mxMarkOnLast "+cls});
	else
	{
		if(cls=="mxOnEmpty") o.ij=i+"_"+j;
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
		o.cls=cls;
		switch(a)
		{
			case "_MA_":s+=this.makeMark(c,x,y,o);break;
			case "_TR_":s+=this.makeTriangle(c,x,y,o);break;
			case "_SQ_":s+=this.makeSquare(c,x,y,o);break;
			case "_CR_":s+=this.makeCircle(c,x,y,o);break;
			default:o.ignoreTextAnchor=1;s+=this.makeText(a,x,y,c,o);
		}
	}
	return s;
};
mxG.S.prototype.k2katakana=function(ko)
{
	let k=this.DX-ko,s;
	s="イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス";
	return (k<s.length)?s.charAt(k):"";
};
mxG.S.prototype.k2kanji=function(k)
{
	let s="一二三四五六七八九十";
	if(k<11) return s.charAt(k-1);
	if(k<20) return "十"+s.charAt(k-11);
	return "";
};
mxG.S.prototype.k2okanji=function(s)
{
	let k,ko,a,an,b,bn,c,cn;
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
	else if((b==c)&&(b>3)) cn="〻";
	else cn=this.k2kanji(c);
	return an+bn+cn;
};
mxG.S.prototype.k2n=function(k)
{
	if(!this.latinCoordinates&&(this.p.oldJapaneseIndicesOn||this.p.japaneseIndicesOn))
		return this.k2okanji(k);
	return (this.DY+1-k)+"";
};
mxG.S.prototype.k2c=function(k)
{
	if(!this.latinCoordinates&&this.p.oldJapaneseIndicesOn) return this.k2katakana(k);
	if(!this.latinCoordinates&&this.p.japaneseIndicesOn) return k+"";
	let r=((k-1)%25)+1;
	return String.fromCharCode(r+((r>8)?65:64))+((k>25)?(k-r)/25:"");
};
mxG.S.prototype.getIndices=function(x,y)
{
	if(!this.p.hideLeftIndices&&(x==0)&&(y>0)&&(y<=this.DY)) return this.k2n(y);
	if(!this.p.hideTopIndices&&(y==0)&&(x>0)&&(x<=this.DX)) return this.k2c(x);
	if(!this.p.hideRightIndices&&(x==(this.DX+1))&&(y>0)&&(y<=this.DY)) return this.k2n(y);
	if(!this.p.hideBottomIndices&&(y==(this.DY+1))&&(x>0)&&(x<=this.DX)) return this.k2c(x);
	return "";
};
mxG.S.prototype.makeIndices=function()
{
	let i,j,m,o,c=this.glc,s,dx=this.grim+this.gripx,dy=this.grim+this.gripy;
	s="<g class=\"mxIndices\" fill=\""+c+"\"";
	if(this.sw4text!="0") s+=" stroke=\""+c+"\" stroke-width=\""+this.sw4text+"\"";
	s+=">";
	o=(this.p.japaneseIndicesOn||this.p.oldJapaneseIndicesOn)?{vertical:1}:{};
	o.ignoreTextAnchor=1;
	o.ignoreFillAndStroke=1;
	if(this.xl==1)
	{
		i=0;
		for(j=this.yt;j<=this.yb;j++)
		{
			m=this.getIndices(i,j);
			s+=this.makeText(m,this.i2x(i)-dx,this.j2y(j),c,o);
		}
	}
	if(this.yt==1)
	{
		j=0;
		for(i=this.xl;i<=this.xr;i++)
		{
			m=this.getIndices(i,j);
			s+=this.makeText(m,this.i2x(i),this.j2y(j)-dy,c,o);
		}
	}
	if(this.xr==this.DX)
	{
		i=this.DX+1;
		for(j=this.yt;j<=this.yb;j++)
		{
			m=this.getIndices(i,j);
			s+=this.makeText(m,this.i2x(i)+dx,this.j2y(j),c,o);
		}
	}
	if(this.yb==this.DY)
	{
		j=this.DY+1;
		for(i=this.xl;i<=this.xr;i++)
		{
			m=this.getIndices(i,j);
			s+=this.makeText(m,this.i2x(i),this.j2y(j)+dy,c,o);
		}
	}
	return s+"</g>";
};
mxG.S.prototype.gridUnder=function(i,j,nat,str)
{
	if(str&&str.match(/(_TB_)|(_TW_)/)) return 1;
	if((nat=="B")||(nat=="W")||str) return 0;
	return 1;
};
mxG.S.prototype.makeOneStar=function(i,j)
{
	let rs=this.r4star,x=this.i2x(i),y=this.j2y(j),s;
	s="M"+(x-(-rs))+" "+y+"A"+rs+" "+rs+" 0 1 0 "+(x-rs)+" "+y;
	return s+"A"+rs+" "+rs+" 0 1 0 "+(x-(-rs))+" "+y+"Z";
};
mxG.S.prototype.makeGrid=function(vNat,vStr)
{
	let s="",m,i,j,k,x,y,a,gi;
	s+="<path class=\"mxGobanLines\" stroke-width=\""+this.sw4grid+"\" stroke=\""+this.glc+"\" fill=\"none\" d=\"";
	for(i=this.xl;i<=this.xr;i++)
	{
		x=this.i2x(i);
		this.yGridMin=y=((this.yt==1)?this.dh/2:0)+this.gbsyt;
		s+="M"+x+" "+y;
		if(this.p.eraseGridUnder)
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
					if(m=="V")
					{
						y=this.gbsyt+(j-this.yt)*this.dh;
						s+=m+y;
						m="M";
					}
				}
			}
		}
		else m="V";
		this.yGridMax=y=this.gbsyt+(this.yb-this.yt+1)*this.dh-((this.yb==this.DY)?this.dh/2:0);
		if(m=="V") s+=m+y;
		else s+=m+x+" "+y;
	}
	for(j=this.yt;j<=this.yb;j++)
	{
		this.xGridMin=x=((this.xl==1)?this.dw/2:0)+this.gbsxl;
		y=this.j2y(j);
		s+="M"+x+" "+y;
		if(this.p.eraseGridUnder)
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
					if(m=="H")
					{
						x=this.gbsxl+(i-this.xl)*this.dw;
						s+=m+x;
						m="M";
					}
				}
			}
		}
		else m="H";
		this.xGridMax=x=this.gbsxl+(this.xr-this.xl+1)*this.dw-((this.xr==this.DX)?this.dw/2:0);
		if(m=="H") s+=m+x;
		else s+=m+x+" "+y;
	}
	s+="\"/>";
	s+="<path class=\"mxStars\" fill=\""+this.glc+"\" d=\"";
	for(i=this.xl;i<=this.xr;i++)
		for(j=this.yt;j<=this.yb;j++)
			if(this.star(i,j))
			{
				k=this.p.xy(i,j);
				if(!this.p.eraseGridUnder||this.gridUnder(i,j,vNat[k],vStr[k]))
					s+=this.makeOneStar(i,j);
			}
	s+="\"/>";
	return s;
};
mxG.S.prototype.makeBackground=function(r)
{
	let s,x,y,bx,by,cls;
	bx=this.indicesOn?this.gobp+this.dw+this.grim:0;
	by=this.indicesOn?this.gobp+this.dh+this.grim:0;
	if(r=="Outer")
	{
		x=(this.xl==1)?this.gobm:(this.dw*(1-this.xl)-bx);
		y=(this.yt==1)?this.gobm:(this.dh*(1-this.yt)-by);
		w=this.dw*this.DX+(this.gripx+bx)*2;
		h=this.dh*this.DY+(this.gripy+by)*2;
	}
	else if(r=="Inner")
	{
		x=(this.xl==1)?this.gobm+bx:(this.dw*(1-this.xl));
		y=(this.yt==1)?this.gobm+by:(this.dh*(1-this.yt));
		w=this.dw*this.DX+this.gripx*2;
		h=this.dh*this.DY+this.gripy*2;
	}
	else
	{
		x=y=0;
		w=this.w;
		h=this.h;
	}
	cls="mxGobanBackground"+(this.indicesOn?" mxWithIndices":"")+" mx"+r+"Rect";
	s="<rect class=\""+cls+"\" fill=\"none\" stroke=\"none\"";
	s+=" x=\""+x+"\" y=\""+y+"\" width=\""+w+"\" height=\""+h+"\"/>";
	return s;
};
mxG.S.prototype.getWRatio=function()
{
	let b=this.p.getE("GobanSvg").getBoundingClientRect();
	return this.w/b.width;
};
mxG.S.prototype.getHRatio=function()
{
	let b=this.p.getE("GobanSvg").getBoundingClientRect();
	return this.h/b.height;
};
mxG.S.prototype.getGxy=function(ev,s=0)
{
	let x,y,c=this.ig.firstChild.getMClick(ev);
	c.x=c.x*this.getWRatio()-this.gbsxl;
	c.y=c.y*this.getHRatio()-this.gbsyt;
	x=Math.floor(c.x/this.dw)+this.xl;
	y=Math.floor(c.y/this.dh)+this.yt;
	if(s) return {x:x,y:y};
	x=Math.max(Math.min(x,this.xr),this.xl);
	y=Math.max(Math.min(y,this.yb),this.yt);
	return {x:x,y:y}
};
mxG.S.prototype.refBox=function(){return this.ig;}
mxG.S.prototype.setMagicGobanWidth=function()
{
	if((this.xr-this.xl)<this.p.pointsNumMax)
	{
		let a=this.stretching.split(","),
			in3dWS=-(-a[0]),in3dHS=-(-a[1]),in2dWS=-(-a[2]),in2dHS=-(-a[3]),
			dw0=this.d+(this.in3dOn?(in3dWS?in3dWS:0):(in2dWS?in2dWS:0)),
			gbsx=this.indicesOn?this.gobm+this.gobp+dw0+this.grim+this.gripx:(this.gobm+this.gripx);
		this.wr=100*this.w/(dw0*this.p.pointsNumMax+2*gbsx);
	}
	else
		this.wr=100;
	this.refBox().style.width=this.wr+"%";
};
mxG.S.prototype.makeGradient1=function(c)
{
	let s,b=(c=="Black"),r=b?50:100,
		c1=b?"#999":"#fff",c2=b?"#333":"#ccc",c3=b?"#000":"#333";
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
	let s,s1="<stop stop-color=\"#000\" offset=\"",s2="\" stop-opacity=\"",s3="\"/>";
	s=s1+(o-0.03)+s2+"0"+s3;
	s+=s1+(o-0.02)+s2+"0.0125"+s3;
	s+=s1+o+s2+"0.0375"+s3;
	s+=s1+(o+0.02)+s2+"0.0125"+s3;
	s+=s1+(o+0.03)+s2+"0"+s3;
	return s;
};
mxG.S.prototype.makeGradient2=function(c)
{
	let s=this.makeGradient1(c);
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
		for(let k=0;k<8;k++)
		{
			s+="<radialGradient id=\""+this.p.n+c[0]+"RGB"+k+"\"";
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
			for(let l=0.05;l<1;l=l+0.15) s+=this.makeShellEffect(l);
			s+="</radialGradient>";
		}
	}
	return s;
};
mxG.S.prototype.makeGradient=function(c)
{
	return this["makeGradient"+(this.p.specialStoneOn?2:1)](c);
};
mxG.S.prototype.makeGoban=function()
{
	let s;
	this.vNat=[];
	this.vStr=[];
	this.w=this.dw*(this.xr-this.xl+1)+this.gbsxl+this.gbsxr;
	this.h=this.dh*(this.yb-this.yt+1)+this.gbsyt+this.gbsyb;
	this.setMagicGobanWidth();
	s="<svg "+this.xmlns+" "+this.xlink;
	s+=" id=\""+this.p.n+"GobanSvg\" class=\"mxGobanSvg\" tabindex=\"0\"";
	s+=" viewBox=\"0 0 "+this.w+" "+this.h+"\" width=\""+this.w+"\" height=\""+this.h+"\"";
	s+=" font-family=\""+this.ff+"\" font-size=\""+this.fs+"\" font-weight=\""+this.fw+"\"";
	s+=" stroke-linecap=\"square\" text-anchor=\"middle\"";
	s+=">";
	s+="<my-title id=\""+this.p.n+"GobanTitle\"></my-title>";
	s+="<my-desc id=\""+this.p.n+"GobanDesc\"></my-desc>";
	if(this.in3dOn)
		s+="<defs>"+this.makeGradient("Black")+this.makeGradient("White")+"</defs>";
	s+=this.makeBackground("Whole");
	s+=this.makeBackground("Outer");
	if(this.indicesOn) s+=this.makeIndices();
	s+=this.makeBackground("Inner");
	s+="<g id=\""+this.p.n+"Grid\" class=\"mxGrid\"></g>";
	s+="<g id=\""+this.p.n+"Points\" class=\"mxPoints\"></g>";
	s+="<g id=\""+this.p.n+"Focus\" class=\"mxFocus\"></g>";
	s+="</svg>";
	return s;
};
mxG.S.prototype.setInternalParams=function()
{
	let a=this.stretching.split(","),
		in3dWS=-(-a[0]),in3dHS=-(-a[1]),in2dWS=-(-a[2]),in2dHS=-(-a[3]);
	this.dw=this.d+(this.in3dOn?(in3dWS?in3dWS:0):(in2dWS?in2dWS:0));
	this.dh=this.d+(this.in3dOn?(in3dHS?in3dHS:0):(in2dHS?in2dHS:0));
	this.gripx=this.grip;
	if(this.in3dOn&&Number.isInteger(in3dWS)&&(in3dWS&1)) this.gripx-=0.5;
	else if(!this.in3dOn&&Number.isInteger(in2dWS)&&(in2dWS&1)) this.gripx-=0.5;
	this.gripy=this.grip;
	if(this.in3dOn&&Number.isInteger(in3dHS)&&(in3dHS&1)) this.gripy-=0.5;
	else if(!this.in3dOn&&Number.isInteger(in2dHS)&&(in2dHS&1)) this.gripy-=0.5;
	if(this.indicesOn)
	{
		this.gbsxl=((this.xl==1)?this.gobm+this.gobp+this.dw+this.grim:0)+this.gripx;
		this.gbsyt=((this.yt==1)?this.gobm+this.gobp+this.dh+this.grim:0)+this.gripy;
		this.gbsxr=((this.xr==this.DX)?this.gobm+this.gobp+this.dw+this.grim:0)+this.gripx;
		this.gbsyb=((this.yb==this.DY)?this.gobm+this.gobp+this.dh+this.grim:0)+this.gripy;
	}
	else
	{
		this.gbsxl=((this.xl==1)?this.gobm:0)+this.gripx;
		this.gbsyt=((this.yt==1)?this.gobm:0)+this.gripy;
		this.gbsxr=((this.xr==this.DX)?this.gobm:0)+this.gripx;
		this.gbsyb=((this.yb==this.DY)?this.gobm:0)+this.gripy;
	}
};
mxG.S.prototype.init=function()
{
	let p=this.p;
	this.ig=p.ig;
	this.grip=p.gridPadding;
	this.grim=p.gridMargin;
	this.gobp=p.gobanPadding;
	this.gobm=p.gobanMargin;
	this.ariaOn=1;
};
mxG.S.prototype.getLen=function(a,str)
{
	let len=0;
	if(a.tagName.match(/text/i))
	{
		len=a.getComputedTextLength();
		len=(str.length>2)?0.8*len:(str.length>1)?0.9*len:len;
		len+=0.2*this.dw;
	}
	return Math.max(this.dw-4,Math.ceil(len));
};
mxG.S.prototype.getVerticalGridLine=function(i)
{
	let g=this.p.getE("Grid"),list;
	list=g.querySelectorAll("path");
	return list[i-this.xl];
};
mxG.S.prototype.eraseOneVerticalGridSegment=function(i,y)
{
	let e,d0,d1,d2,a,b,k,km,x,y1,y2,f1,f2;
	x=this.i2x(i);
	e=this.p.getE("Grid").querySelector("path");
	d0=e.getAttributeNS(null,"d");
	re=new RegExp("M"+x+" "+this.yGridMin+"[^H]*?V"+this.yGridMax);
	d1=d0.match(re)[0];
	a=d1.match(/[^M0-9.-][0-9.-]+/g);
	km=a.length;
	b=[];
	for(k=0;k<km;k++)
	{
		b[k]=parseFloat(a[k].substring(1));
		a[k]=a[k].substring(0,1);
		if(a[k]==" ") a[k]="M";
	}
	y1=Math.max(b[0],y-this.dh/2);
	y2=Math.min(b[km-1],y+this.dh/2);
	d2="M"+x+" "+b[0];
	f1=f2=0;
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
	if(d1!=d2) e.setAttributeNS(null,"d",d0.replace(d1,d2));
};
mxG.S.prototype.eraseVerticalGridSegments=function(i,j,x,y,w)
{
	let i1,i2,ik,e;
	i1=Math.max(this.xl,i-Math.floor(w/2/this.dw));
	i2=Math.min(this.xr,i+Math.floor(w/2/this.dw));
	for(ik=i1;ik<=i2;ik++)
	{
		if(ik!=i)
		{
			this.eraseOneVerticalGridSegment(ik,y);
			if(this.star(ik,j))
			{
				e=this.p.getE("Grid").querySelector(".mxStars");
				if(e)
				{
					let s=this.makeOneStar(ik,j),
						d=e.getAttributeNS(null,"d");
					d=d.replace(s,"");
					e.setAttributeNS(null,"d",d);
				}
			}
		}
	}
};
mxG.S.prototype.eraseLongGridSegment=function(i,j,x,y,w)
{
	let e,d0,d1,d2,a,b,k,km,x1,x2,m,re;
	e=this.p.getE("Grid").firstChild;
	d0=e.getAttributeNS(null,"d");
	re=new RegExp("M"+this.xGridMin+" "+y+"[^V]+?H"+this.xGridMax);
	d1=d0.match(re)[0];
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
	f1=f2=0;
	for(k=1;k<km;k++)
	{
		if(!f1)
		{
			if(b[k]>=x1)
			{
				if(a[k]=="H") d2+="H"+x1;
				f1=1;
			}
			else
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
				f2=1;
			}
		}
		if(f1&&f2&&(b[k]>x2))
		{
			if(a[k]=="H") d2+="H"+b[k];
			else d2+="M"+b[k]+" "+y;
		}
	}
	if(d1!=d2) e.setAttributeNS(null,"d",d0.replace(d1,d2));
	this.eraseVerticalGridSegments(i,j,x,y,w);
};
mxG.S.prototype.addPointBackground=function(i,j,nat,str)
{
	let a,b,p,x,y,h,w;
	p=this.p.getE("Points");
	if(a=p.querySelector('[data-maxigos-ij="'+i+'_'+j+'"]'))
	{
		let vof=this.isVariationOnFocus(str);
		h=this.dh-4;
		w=this.getLen(a,str);
		x=this.i2x(i);
		y=this.j2y(j);
		b=document.createElementNS(this.xmlnsUrl,"rect");
		b.setAttributeNS(null,"fill","none");
		b.setAttributeNS(null,"stroke",vof?this.glc:"none");
		b.setAttributeNS(null,"stroke-width",vof?this.sw4grid:"0");
		b.setAttributeNS(null,"x",x-w/2);
		b.setAttributeNS(null,"y",y-h/2);
		b.setAttributeNS(null,"width",w);
		b.setAttributeNS(null,"height",h);
		b.setAttribute("class","mxPointBackground"+" "+a.classList.value);
		a.parentNode.insertBefore(b,a);
		if(this.p.eraseGridUnder&&(w>this.dw)) this.eraseLongGridSegment(i,j,x,y,w);
	}
};
mxG.S.prototype.makeOneInfo=function(i,j,k,nat,str,sayLast)
{
	let s="",last=0,ojio,jio;
	if((nat=="B")||(nat=="W")) s+=this.p.local(nat=="B"?"Black":"White");
	if(s&&str) s+=" ";
	if(str)
	{
		if(str.match(/_ML_/)) last=1;
		else if(str.match(/_TB_/)) s+=this.p.local("Black territory mark");
		else if(str.match(/_TW_/)) s+=this.p.local("White territory mark");
		else
		{
			if(this.isVariation(str))
			{
				if(this.isVariationOnFocus(str))
					s+=this.p.local("Variation on focus")+" ";
				else s+=this.p.local("Variation")+" ";
				str=this.removeVariationDelimiters(str);
			}
			if(this.isMark(str))
			{
				switch(str)
				{
					case "_MA_":s+=this.p.local("Mark");break;
					case "_CR_":s+=this.p.local("Circle");break;
					case "_SQ_":s+=this.p.local("Square");break;
					case "_TR_":s+=this.p.local("Triangle");break;
				}
			}
			else
			{
				if(this.isLabel(str)) str=this.removeLabelDelimiters(str);
				s+="'"+str+"'";
			}
		}
	}
	if(s) s+=this.p.local(" at ");
	if(this.p.lang!="ja") this.latinCoordinates=1;
	s+=this.k2c(i)+this.k2n(j);
	if(this.p.lang!="ja") this.latinCoordinates=0;
	if(sayLast&&last) s+=". "+this.p.local("Last played move");
	return s;
};
mxG.S.prototype.makeShortGobanTitle=function()
{
	let s="",xf,yf,k,nat,str;
	if((xf=this.p.xFocus)&&(yf=this.p.yFocus))
	{
		k=this.p.xy(xf,yf);
		nat=this.vNat[k];
		str=this.vStr[k];
		if(s) s+=". ";
		s+=this.p.local("Cursor on");
		if(s) s+=" ";
		s+=this.makeOneInfo(xf,yf,k,nat,str,1);
	}
	if(this.p.whenVirtualNext)
	{
		let x,y;
		x=this.p.whenVirtualNext.x;
		y=this.p.whenVirtualNext.y;
		k=this.p.xy(x,y);
		nat=this.vNat[k];
		str=this.vStr[k];
		s=this.makeOneInfo(x,y,k,nat,str,0)+". "+s;
	}
	return s+".";
};
mxG.S.prototype.makeGobanTitle=function()
{
	let s=this.p.local("Goban")+" "+this.DX+"x"+this.DY;
	if((this.xl!=1)||(this.yt!=1)||(this.xr!=this.DX)||(this.yb!=this.DY))
	{
		s+=". "+this.p.local("Partial view");
		s+=" "+this.k2c(this.xl)+this.k2n(this.yb);
		s+=" "+this.k2c(this.xr)+this.k2n(this.yt);
	}
	return s+". "+this.makeShortGobanTitle();
};
mxG.S.prototype.makeGobanDescription=function()
{
	let s="",i,j,k,nat,str;
	for(i=this.xl;i<=this.xr;i++)
		for(j=this.yb;j>=this.yt;j--)
		{
			k=this.p.xy(i,j);
			nat=this.vNat[k];
			str=this.vStr[k];
			if((nat=="B")||(nat=="W")||str)
			{
				if(s) s+=". ";
				s+=this.makeOneInfo(i,j,k,nat,str,0);
			}
		}
	if(!s) s=this.p.local("Empty goban");
	return s+".";
};
mxG.S.prototype.setGobanFocusTitleDesc=function(kind)
{
	if(this.p.noLabelledBy) return;
	let x=this.p.xFocus,y=this.p.yFocus,z;
	if(!this.p.inView(x,y)) {x=0;y=0;}
	if(x&&y)this.p.getE("Focus").innerHTML=this.makeFocusMark(this.i2x(x),this.j2y(y));
	else this.p.getE("Focus").innerHTML="";
	if(kind>0) this.p.getE("GobanDesc").innerHTML=this.makeGobanDescription();
	if(this.p.shortTitleOnly)
	{
		this.p.getE("GobanTitle").innerHTML=this.makeShortGobanTitle();
		z=this.p.n+"GobanTitle";
	}
	else
	{
		this.p.getE("GobanTitle").innerHTML=this.makeGobanTitle();
		z=this.p.n+"GobanTitle"+" "+this.p.n+"GobanDesc";
	}
	this.p.getE("GobanSvg").setAttribute("aria-labelledby",z);
};
mxG.S.prototype.drawGoban=function(vNat,vStr)
{
	let s,s1,s2,s3,s4,s5,s6,i,j,k,nat,str,c,o;
	this.p.getE("Grid").innerHTML=this.makeGrid(vNat,vStr);
	this.pNat=this.vNat;
	this.pStr=this.vStr;
	this.vNat=vNat;
	this.vStr=vStr;
	s=s1=s2=s3=s4=s5=s6="";
	for(i=this.xl;i<=this.xr;i++)
		for(j=this.yt;j<=this.yb;j++)
		{
			k=this.p.xy(i,j);
			nat=this.vNat[k];
			str=this.vStr[k];
			if((nat=="B")||(nat=="W"))
			{
				let x=this.i2x(i),y=this.j2y(j);
				c=(nat=="B")?"Black":"White";
				if(this.in3dOn&&this.stoneShadowOn)
				{
					o={ignoreFillAndStroke:1};
					s1+=this.makeStoneShadow(c,x,y,this.d/2,o);
				}
				o={in3dOn:this.in3dOn,stoneShadowOn:0,ignoreFillAndStroke:1};
				o.opacity=((str=="_TB_")||(str=="_TW_"))?0.5:1;
				if(nat=="B") s2+=this.makeStone(c,x,y,this.d/2,o);
				else s3+=this.makeStone(c,x,y,this.d/2,o);
				if(str&&/^[0-9]+$/.test(str))
				{
					c=(nat=="B")?"#fff":"#000",
					o={cls:"mxOn"+((nat=="B")?"Black":"White")+" mxNumber"};
					o.ignoreTextAnchor=1;
					o.ignoreFillAndStroke=1;
					if(this.p.oldJapaneseNumberingOn)
					{
						str=this.k2okanji(-(-str));
						o.vertical=1;
					}
					if(nat=="B") s4+=this.makeText(str,x,y,c,o);
					else s5+=this.makeText(str,x,y,c,o);
				}
			}
		}
	if(s1)
	{
		s+="<g class=\"mxStoneShadows\" fill=\"#000\" opacity=\"0.2\" stroke=\"none\">";
		s+=s1+"</g>";
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
		s+=s2+"</g>";
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
		s+=s3+"</g>";
	}
	if(s4)
	{
		s+="<g class=\"mxBlackStoneNumbers\" fill=\"#fff\"";
		if(this.sw4text!="0") s+=" stroke=\"#fff\" stroke-width=\""+this.sw4text+"\"";
		s+=">"+s4+"</g>";
	}
	if(s5)
	{
		s+="<g class=\"mxWhiteStoneNumbers\" fill=\"#000\"";
		if(this.sw4text!="0") s+=" stroke=\"#000\" stroke-width=\""+this.sw4text+"\"";
		s+=">"+s5+"</g>";
	}
	for(i=this.xl;i<=this.xr;i++)
		for(j=this.yt;j<=this.yb;j++)
		{
			k=this.p.xy(i,j);
			nat=this.vNat[k];
			str=this.vStr[k];
			if(str&&!(((nat=="B")||(nat=="W"))&&/^[0-9]+$/.test(str)))
				s6+=this.makeMarkOrLabel(i,j,nat,str);
		}
	if(s6) s+="<g class=\"mxMarksAndLabels\">"+s6+"</g>";
	this.p.getE("Points").innerHTML=s;
	for(i=this.xl;i<=this.xr;i++)
		for(j=this.yt;j<=this.yb;j++)
		{
			k=this.p.xy(i,j);
			nat=this.vNat[k];
			str=this.vStr[k];
			if(str&&(nat!="B")&&(nat!="W"))
				this.addPointBackground(i,j,nat,str);
		}
	this.setGobanFocusTitleDesc(1);
};
mxG.S.prototype.makeBtnIcon=function(a,t)
{
	let s="";
	s+="<svg "+this.xmlns+" viewBox=\"0 0 128 128\" width=\"40\" height=\"40\" aria-hidden=\"true\">";
	return s+(t?"<title>"+this.p.local(t)+"</title>":"")+a+"</svg>";
};
}
if(!mxG.G)
{
mxG.fr("_","");
mxG.en("_","");
mxG.fr("→","→");
mxG.fr(" "," ");
mxG.fr(": "," : ");
mxG.fr(" at "," en ");
mxG.fr("Alert","Alerte");
mxG.fr("Black","Noir");
mxG.fr("Black territory mark","Marque de territoire noir");
mxG.fr("Circle","Cercle");
mxG.fr("Empty goban","Goban vide");
mxG.fr("Cursor on","Curseur sur");
mxG.fr("Goban","Goban");
mxG.fr("Last played move","Dernier coup joué");
mxG.fr("Mark","Marque");
mxG.fr("Partial view","Vue partielle");
mxG.fr("Square","Carré");
mxG.fr("Triangle","Triangle");
mxG.fr("Variation","Variation");
mxG.fr("Variation on focus","Variation ayant le focus");
mxG.fr("White","Blanc");
mxG.fr("White territory mark","Marque de territoire blanc");
mxG.G=function(k,b)
{
	this.k=k;
	this.n="d"+k;
	this.g="mxG.D["+k+"]";
	this.a={};
	this.b=b;
	this.c=[];
	this.cm=0;
	this.j=document.currentScript;
};
mxG.G.prototype.getE=function(id){return document.getElementById(this.n+id);};
mxG.G.prototype.local=function(s)
{
	if(mxG.Z[this.lang]&&(mxG.Z[this.lang][s]!==undefined)) return mxG.Z[this.lang][s];
	if(mxG.Z["en"][s]!==undefined) return mxG.Z["en"][s];
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
	let f="build"+x;
	if(mxG.Z[this.lang]&&mxG.Z[this.lang][f]) return mxG.Z[this.lang][f](a);
	if(this[f]) return this[f](a);
	return a+"";
};
mxG.G.prototype.hasC=function(a)
{
	for(let c=0;c<this.cm;c++) if(this.c[c]==a) return 1;
	return 0;
};
mxG.G.prototype.kidOnFocus=function(aN){return aN.Focus?aN.Kid[aN.Focus-1]:null;};
mxG.G.prototype.enableBtn=function(b)
{
	if(this.hasC("Score")&&this.canPlaceScore) return;
	let e=this.getE(b+"Btn");
	if(e) e.disabled=false;
};
mxG.G.prototype.disableBtn=function(b)
{
	let e=this.getE(b+"Btn");
	if(e) e.disabled=true;
};
mxG.G.prototype.addBtn=function(e,b)
{
	let k=this.k,a=document.createElement("button");
	a.id=this.n+b.n+"Btn";
	if(b.t) a.title=b.t;
	if(b.v) a.innerHTML=b.v;
	a.classList.add("mxBtn","mx"+b.n+"Btn");
	if(b.first) e.prepend(a); else e.appendChild(a);
	a.addEventListener("click",function(){mxG.D[k]["do"+b.n]();});
};
mxG.G.prototype.createBtnBox=function(b)
{
	return "<div class=\"mx"+b+"Div\" id=\""+this.n+b+"Div\"></div>";
};
mxG.G.prototype.unselectBtn=function(btn)
{
	let e=this.getE(btn+"Btn");
	if(e) e.classList.remove("mxSelectedBtn");
};
mxG.G.prototype.selectBtn=function(btn)
{
	let e=this.getE(btn+"Btn");
	if(e) e.classList.add("mxSelectedBtn");
};
mxG.G.prototype.doDialog=function(name,content,btns)
{
	let dialog=this.getE(name+"Dialog"),b=btns;
	if(this.hasC("Menu")) this.closeMenus();
	if(!dialog)
	{
		let s="";
		dialog=document.createElement("dialog");
		dialog.id=this.n+name+"Dialog";
		dialog.classList.add("mx"+name+"Dialog");
		s+="<form method=\"dialog\">";
		s+="<fieldset class=\"mxContentFieldset\"></fieldset>";
		s+="<fieldset class=\"mxMenuFieldset\">";
		for(let k=0;k<b.length;k++)
		{
			b[k].v=b[k].v?b[k].v:b[k].n;
			s+="<button value=\""+b[k].v+"\">"+this.local(b[k].n)+"</button>";
		}
		dialog.mxParent=this;
		dialog.addEventListener('close',function(){
			for(let k=0;k<b.length;k++)
				if(b[k].a&&(this.returnValue==b[k].v))
					this.mxParent["do"+b[k].a+"OK"]();
		});
		s+="</fieldset>";
		dialog.innerHTML=s;
		this.getE("GlobalBoxDiv").appendChild(dialog);
	}
	dialog.querySelector('.mxContentFieldset').innerHTML=content;
	dialog.showModal();
};
mxG.G.prototype.doAlert=function(msg)
{
	let s="<h1 tabindex=\"0\">"+this.local("Alert")+"</h1><p>"+msg+"</p>";
	this.doDialog("Alert",s,[{n:"OK"}]);
};
mxG.G.prototype.getInfo=function(p,s=1)
{
	let aN=this.cN;
	if((p=="MN")||(p=="PM")||(p=="FG")){if(aN==this.rN) aN=this.kidOnFocus(aN);}
	if((p=="PM")||(p=="FG")) while((aN!=this.rN)&&!aN.P[p]) aN=aN.Dad;
	else {aN=this.rN;while(aN&&!aN.P[p]) aN=this.kidOnFocus(aN);}
	if(aN&&aN.P[p])
	{
		if(s) return (aN.P[p][0]+"").noT();
		return aN.P[p][0]+"";
	}
	if(p=="SZ") return "19";
	if(p=="PM") return "1";
	if((p=="ST")||(p=="FG")) return "0";
	return "";
};
mxG.G.prototype.setSz=function()
{
	let DX=this.DX?this.DX:0,DY=this.DY?this.DY:0,D=this.getInfo("SZ").split(":");
	this.DX=-(-D[0]);
	this.DY=((D.length>1)?-(-D[1]):this.DX);
	return (DX!=this.DX)||(DY!=this.DY);
};
mxG.G.prototype.setVw=function()
{
	let aN=this.cN,xl,yt,xr,yb;
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
		this.xr=this.yb=1;
		for(let k=0;k<aN.P.VW.length;k++)
		{
			let s=aN.P.VW[k];
			if(s.length==5)
			{
				this.xl=Math.min(this.xl,s.c2n(0));
				this.yt=Math.min(this.yt,s.c2n(1));
				this.xr=Math.max(this.xr,s.c2n(3));
				this.yb=Math.max(this.yb,s.c2n(4));
			}
			else if(s.length==2)
			{
				let x=s.c2n(0),y=s.c2n(1);
				this.xl=Math.min(this.xl,x);
				this.yt=Math.min(this.yt,y);
				this.xr=Math.max(this.xl,x);
				this.yb=Math.max(this.yt,y);
			}
			else
			{
				this.xl=this.yt=1;
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
		this.xl=this.yt=1;
		this.xr=this.DX;
		this.yb=this.DY;
	}
	return (xl!=this.xl)||(yt!=this.yt)||(xr!=this.xr)||(yb!=this.yb);
};
mxG.G.prototype.setPl=function()
{
	let aN=this.rN;
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
	let AX=["AB","AW","AE"];
	for(let z=0;z<3;z++)
	{
		let v=this.cN.P[AX[z]];
		if(v) for(let k=0;k<v.length;k++)
		{
			let s=v[k];
			if(s.length==2)
			{
				let x=s.c2n(0),y=s.c2n(1);
				this.gor.place(AX[z],x,y);
			}
			else if(s.length==5)
			{
				let x1=s.c2n(0),y1=s.c2n(1),x2=s.c2n(3),y2=s.c2n(4);
				for(let x=x1;x<=x2;x++) for(let y=y1;y<=y2;y++) this.gor.place(AX[z],x,y);
			}
		}
	}
};
mxG.G.prototype.placeBW=function(nat)
{
	let s=this.cN.P[nat][0],x=0,y=0;
	if(s.length==2){x=s.c2n(0);y=s.c2n(1);}
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
	let bN=aN;
	while(bN!=this.rN)
	{
		if(this.kidOnFocus(bN.Dad)!=bN)
			for(let k=0;k<bN.Dad.Kid.length;k++)
				if(bN.Dad.Kid[k]==bN){bN.Dad.Focus=k+1;break;}
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
	if(this.hasC("Variation")) this.setMode();
	this.setVw();
	this.setIndices();
	this.setNumbering();
	for(let k=0;k<this.cm;k++)
	{
		let s="update"+this.c[k];
		if(this[s]) this[s]();
	}
};
mxG.G.prototype.initAll=function()
{
	for(let k=0;k<this.cm;k++)
	{
		let s="init"+this.c[k];
		if(this[s]) this[s]();
	}
};
mxG.G.prototype.getA=function()
{
	let t;
	this.t=this.a.t||this.j;
	t=this.t;
	for(let i=0;i<t.attributes.length;i++)
	{
		let n=t.attributes.item(i).nodeName;
		if(n.match(/^data-maxigos-/))
		{
			let a=n.replace(/^data-maxigos-/,"").split("-"),s=a[0],b;
			for(let j=1;j<a.length;j++) s+=a[j].ucF();
			b=t.getAttribute(n);
			this.a[s]=b.match(/^[0-9]+$/)?parseInt(b):b;
		}
	}
	this.sgf=this.a.sgf||t.innerHTML;
	this.lang=this.a.l||mxG.getLang(t);
	t.innerHTML="";
};
mxG.G.prototype.setA=function(a,z,t)
{
	if(!(a in this.a)) return z;
	if(t=="bool") return (this.a[a]+"")=="1"?1:(this.a[a]+"")=="0"?0:null;
	if(t=="int") return parseInt(this.a[a]+"");
	if(t=="float") return parseFloat(this.a[a]+"");
	if(t=="string") return this.a[a]+"";
	if(t=="list") return a?(this.a[a]+"").split(","):[];
	if(t=="set") return new Set((this.a[a]+"").split(","));
	return null;
};
mxG.G.prototype.afterGetS=function(s,hasToShowExecutionTime)
{
	let a,sgf,km;
	a=(this.rN&&this.rNs)?this.rNs.indexOf(this.rN):-1;
	sgf=(this.rN&&this.rN.sgf)?this.rN.sgf:"";
	this.rN=new mxG.P(s,this.sgfLoadCoreOnly,this.sgfLoadMainOnly);
	this.rN.sgf=sgf;
	if(a<0) this.rNs=[this.rN];
	else this.rNs[a]=this.rN;
	this.setSz();
	this.hasToSetGoban=1;
	if(this.hasC("Tree")) this.hasToSetTree=1;
	this.gor=new mxG.R();
	this.gor.init(this.DX,this.DY);
	this.cN=this.rN;
	this.placeNode();
	if(this.initMethod=="last") while(this.kidOnFocus(this.cN)) this.placeNode();
	else if(km=parseInt(this.initMethod+""))
		for(let k=0;k<km;k++) if(this.kidOnFocus(this.cN)) this.placeNode();
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
	let a=s.indexOf("("),b=s.indexOf(";");
	return (a>=0)&&(b>a);
};
mxG.G.prototype.getS=function()
{
	let s=this.sgf;
	if(this.isSgfRecord(s)&&this.allowStringAsSource)
	{
		s=s.reP().replace(/<br\s?\/?>/gi,'\n').replace(/<p>/gi,'').replace(/<\/p>/gi,'\n\n');
		this.afterGetS(s,1);
		return;
	}
	if(this.allowFileAsSource)
	{
		let f=s.replace(/^\s+([^\s])/,"$1").replace(/([^\s])\s+$/,"$1");
		if(this.sourceFilter)
		{
			if(f.match(new RegExp(this.sourceFilter)))
			{
				this.getF(f);
				return;
			}
		}
	}
	this.afterGetS("",1);
};
mxG.G.prototype.setC=function(b)
{
	for(let k=0;k<b.length;k++)
	{
		let a=b[k];
		if(Array.isArray(a)) this.setC(a);
		else this.c.push(a);
	}
	this.cm=this.c.length;
};
mxG.G.prototype.createBoxes=function(b)
{
	let s="";
	for(let k=0;k<b.length;k++)
	{
		let a=b[k];
		if(Array.isArray(a)) s+="<div>"+this.createBoxes(a)+"</div>";
		else
		{
			let f="create"+a;
			if(this[f]) s+=this[f]();
		}
	}
	return s;
};
mxG.G.prototype.addParentClasses=function(p,e)
{
	let km=(e.children?e.children.length:0);
	for(let k=0;k<km;k++) this.addParentClasses(p,e.children[k]);
	if(!e.id) return;
	let t=e.tagName.toLowerCase().ucF(),r,a,b,c;
	r=new RegExp(this.n+"([a-zA-Z0-9_-]+)"+t);
	b=e.id.replace(r,"$1");
	if(this.c.indexOf(b)>=0)
	{
		a=e.parentNode;
		if(a==p) return;
		a.classList.add("mx"+b+"ParentDiv");
		a=a.parentNode;
		if(a==p) return;
		a.classList.add("mx"+b+"GrandParentDiv");
		c="GrandParentDiv";
		while((a=a.parentNode)&&(a!=p))
		{
			c="Great"+c;
			a.classList.add("mx"+b+c);
		}
	}
};
mxG.G.prototype.createAll=function()
{
	let e,cls;
	this.scr=new mxG.S(this);
	this.setC(this.b);
	this.in3dOn=this.setA("in3dOn",0,"bool");
	this.allowStringAsSource=this.setA("allowStringAsSource",1,"bool");
	this.allowFileAsSource=this.setA("allowFileAsSource",1,"bool");
	this.initMethod=this.setA("initMethod","first","string");
	this.sgfLoadCoreOnly=this.setA("sgfLoadCoreOnly",0,"bool");
	this.sgfLoadMainOnly=this.setA("sgfLoadMainOnly",0,"bool");
	this.sgfSaveCoreOnly=this.setA("sgfSaveCoreOnly",0,"bool");
	this.sgfSaveMainOnly=this.setA("sgfSaveMainOnly",0,"bool");
	this.sourceFilter=this.setA("sourceFilter","^[^?]+\\.sgf$","string");
	e=document.createElement("div");
	e.id=this.n+"GlobalBoxDiv";
	cls="mxGlobalBoxDiv";
	if(this.config) cls+=" mx"+this.config+"Config";
	if(this.theme) cls+=" mx"+this.theme+"Theme";
	cls+=(this.in3dOn?" mxIn3d":" mxIn2d");
	e.className=cls;
	e.lang=this.lang;
	if(!mxG.Z[this.lang]) mxG.Z[this.lang]=[];
	e.innerHTML=this.createBoxes(this.b);
	this.addParentClasses(e,e);
	if(this.t==this.j)
		this.j.parentNode.insertBefore(e,this.j.nextSibling);
	else
		this.t.appendChild(e);
	this.ig=this.getE("InnerGobanDiv");
};
mxG.G.prototype.appendStyle=function()
{
	function appendOneStyle(c,t,s)
	{
		let id="maxigos"+t+c+"Style";
		if(!document.getElementById(id))
		{
			let e=document.createElement("style");
			e.id=id;
			e.innerHTML=s;
			document.getElementsByTagName("head")[0].appendChild(e);
		}
	}
	if(this.style)
		appendOneStyle("",this.theme,this.style);
	if(this["style4"+this.config])
		appendOneStyle(this.config,this.theme,this["style4"+this.config]);
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
	let k=this.k;
	if(document.readyState=="complete") this.afterLoading();
	else window.addEventListener("DOMContentLoaded",function(){mxG.D[k].afterLoading();});
};
}
if(!mxG.G.prototype.createCartouche)
{
mxG.fr("Black","Noir");
mxG.fr("White","Blanc");
mxG.fr("Rank","Niv.");
mxG.fr("Caps","Cap.");
mxG.fr("Bowl","Bol");
mxG.fr("Black bowl","Bol noir");
mxG.fr("White bowl","Bol blanc");
mxG.fr("Black prisoners","Prisonniers noirs");
mxG.fr("White prisoners","Prisonniers blancs");
mxG.S.prototype.makeOneStone4Bowl=function(nat,x,y,d,o)
{
	let s="",o2={};
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
	let s="",x,y,r,i,j,k,km,km2,dk,rk,magicNum;
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
mxG.S.prototype.updateBowlDescription=function(nat,n)
{
	let b=this.p.getE(nat+"BowlDesc"),oc=(nat=="B")?"White":"Black";
	b.innerHTML=this.p.local(oc+" prisoners")+" "+n;
};
mxG.S.prototype.updateBowlDescription=function(nat,n)
{
	let b=this.p.getE(nat+"BowlDesc"),oc=(nat=="B")?"White":"Black";
	b.innerHTML=this.p.local(oc+" prisoners")+" "+n;
};
mxG.S.prototype.makeCap=function(nat,n,o)
{
	let s="",x,y,r,c=(nat=="B")?"Black":"White";
	x=this.bowlW/2;
	y=(nat=="W")?this.bowlW+this.capW/2:this.capW/2;
	dy=this.capW*5/42;
	r=this.capW/2*0.9;
	s+="<circle class=\"mxCap\"";
	if(o.in3dOn) s+=" fill=\"url(#"+this.p.n+nat+"CapIn3dRG)\"";
	else s+=" fill=\"url(#"+this.p.n+nat+"CapIn2dRG)\"";
	s+=" cx=\""+x+"\" cy=\""+y+"\" r=\""+r+"\"/>";
	s+="<text aria-hidden=\"true\" id=\""+this.p.n+c+"PrisonersText"+"\"";
	s+=" fill=\""+((nat=="B")?"#fff":"#000")+"\"";
	s+=" x=\""+x+"\" y=\""+y+"\" dy=\""+dy+"\"";
	s+=">";
	s+=n;
	s+="</text>";
	return s;
};
mxG.S.prototype.makeBowlAndCap=function(nat,n,o)
{
	let s="",c=(nat=="B")?"Black":"White";
	this.bowlW=5*this.d;
	this.capW=4*this.d;
	s+="<svg "+this.xmlns+" "+this.xlink;
	s+=" viewBox=\"0 0 "+this.bowlW+" "+(this.bowlW+this.capW)+"\"";
	s+=" width=\""+this.bowlW+"\" height=\""+(this.bowlW+this.capW)+"\"";
	s+=" font-family=\""+this.ff+"\"";
	s+=" font-size=\""+this.capW/3+"\"";
	s+=" font-weight=\""+this.fw+"\"";
	s+=" text-anchor=\"middle\"";
	s+=" aria-labelledby=\""+this.p.n+nat+"BowlTitle"+" "+this.p.n+nat+"BowlDesc"+"\"";
	s+=">";
	s+="<title id=\""+this.p.n+nat+"BowlTitle\">"+this.p.local(c+" bowl")+"</title>";
	s+="<desc id=\""+this.p.n+nat+"BowlDesc\"></desc>";
	s+="<defs>";
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
mxG.G.prototype.drawImagesInCartouche=function(c)
{
	let e,in3dOn,n,o;
	if(!this.scr.w)
	{
		let z=this.k;
		setTimeout(function(){mxG.D[z].drawImagesInCartouche(c);},100);
		return;
	}
	if(this.prisonersOn&&this.bowlOn) n=this.gor.getPrisoners(c[0]);
	if(this.in3dOn==this[c+"LastIn3dOn"])
	{
		if(this.prisonersOn&&this.bowlOn)
		{
			e=this.getE(c+"PrisonersText");
			if(e) e.textContent=n?n:"";
		}
		return;
	}
	if(this.shortHeaderOn)
	{
		e=this.getE(c+"PlayerStoneDiv");
		if(e)
		{
			o={in3dOn:this.in3dOn,stoneShadowOn:this.stoneShadowOn};
			o.title=(c[0]=="B")?this.local("Black"):this.local("White");
			e.innerHTML=this.scr.makeAloneStone(c[0],"",o);
		}
	}
	if(this.prisonersOn)
	{
		e=this.getE(c+"PrisonersStoneSpan");
		if(e)
		{
			o={in3dOn:this.in3dOn,stoneShadowOn:this.stoneShadowOn};
			if(this.bowlOn)
			{
				e.innerHTML=this.scr.makeBowlAndCap(c[0],n?n:"",o);
				this.scr.updateBowlDescription(c[0],n);
			}
			else
			{
				o.title=(c[0]=="W")?this.local("Black"):this.local("White");
				e.innerHTML=this.scr.makeAloneStone((c[0]=="W")?"B":"W","",o);
			}
		}
	}
	this[c+"LastIn3dOn"]=this.in3dOn;
};
mxG.G.prototype.updateCartouche=function(c)
{
	let s,aPlayer,aRank;
	if(!this.cartoucheBoxOn) return;
	if(this.shortHeaderOn)
	{
		aPlayer=this.getInfo("P"+c[0]);
		if(!aPlayer) aPlayer=this.local(c);
		this.getE(c+"PlayerDiv").innerHTML=aPlayer;
		aRank=this.getInfo(c[0]+"R");
		this.getE(c+"RankSpan").innerHTML=this.build("Rank",aRank);
	}
	if(this.prisonersOn)
		this.getE(c+"PrisonersSpan").innerHTML=this.gor.getPrisoners(c[0]);
	if(this.shortHeaderOn||this.prisonersOn) this.drawImagesInCartouche(c);
};
mxG.G.prototype.updateWhiteCartouche=function()
{
	this.updateCartouche("White");
};
mxG.G.prototype.updateBlackCartouche=function()
{
	this.updateCartouche("Black");
};
mxG.G.prototype.createCartouche=function(c)
{
	let s="";
	this.cartoucheBoxOn=this.setA("cartoucheBoxOn",0,"bool");
	if(!this.cartoucheBoxOn) return s;
	this.shortHeaderOn=this.setA("shortHeaderOn",1,"bool");
	this.prisonersOn=this.setA("prisonersOn",1,"bool");
	this.bowlOn=this.setA("bowlOn",0,"bool");
	this[c+"LastIn3dOn"]=-1;
	s+="<div class=\"mxCartoucheDiv mx"+c+"\" id=\""+this.n+c+"CartoucheDiv\">";
	if(this.shortHeaderOn)
	{
		s+="<div class=\"mxShortHeaderDiv\" id=\""+this.n+c+"ShortHeaderDiv\">";
		s+="<div class=\"mxPlayerStoneDiv\" id=\""+this.n+c+"PlayerStoneDiv\"></div>";
		s+="<div class=\"mxPlayerDiv\" id=\""+this.n+c+"PlayerDiv\"></div>";
		s+="<div class=\"mxRankDiv\" id=\""+this.n+c+"RankDiv\">";
		s+="<span class=\"mxRankLabelSpan\">"+this.local("Rank")+"</span>";
		s+="<span class=\"mxRankSpan\" id=\""+this.n+c+"RankSpan\">0</span>";
		s+="</div>";
		s+="</div>";
	}
	if(this.prisonersOn)
	{
		s+="<div class=\"mxPrisonersDiv\">";
		s+="<span class=\"mxPrisonersLabelSpan\">"+this.local("Caps")+"</span>";
		s+="<span class=\"mxPrisonersSpan\" id=\""+this.n+c+"PrisonersSpan\">0</span>";
		s+="<span class=\"mxPrisonersStoneSpan\" id=\""+this.n+c+"PrisonersStoneSpan\"></span>";
		s+="</div>";
	}
	s+="</div>";
	return s;
};
mxG.G.prototype.createWhiteCartouche=function()
{
	return this.createCartouche("White");
};
mxG.G.prototype.createBlackCartouche=function()
{
	return this.createCartouche("Black");
};
}
if(!mxG.G.prototype.createHeader)
{
mxG.fr("Header","Informations");
mxG.fr(" "," ");
mxG.fr(", ",", ");
mxG.fr(": "," : ");
mxG.fr(".",",");
mxG.fr("Black","Noir");
mxG.fr("White","Blanc");
mxG.fr(" wins"," gagne");
mxG.fr("Date","Date");
mxG.fr("Place","Lieu");
mxG.fr("Time limits","Durée");
mxG.fr("Rules","Règle");
mxG.fr("Handicap","Handicap");
mxG.fr("Result","Résultat");
mxG.fr("none","aucun");
mxG.fr(" by resign"," par abandon");
mxG.fr(" by time"," au temps");
mxG.fr(" by forfeit"," par forfait");
mxG.fr(" by "," de ");
mxG.fr("game with no result","partie sans résultat");
mxG.fr("draw","partie nulle");
mxG.fr("unknown result","résultat inconnu");
mxG.fr("Komi","Komi ");
mxG.fr(" point"," point");
mxG.fr(" points"," points");
mxG.fr(" Close ","Fermer");
mxG.fr("h","h");
mxG.fr("mn","mn");
mxG.fr("s","s");
mxG.fr(" per player"," par joueur");
mxG.fr("Japanese","japonaise");
mxG.fr("Chinese","chinoise");
mxG.fr("Korean","coréene");
mxG.fr("GOE","Ing");
mxG.fr("AGA","américaine / française");
mxG.fr(" move"," coup");
mxG.fr(" moves"," coups");
mxG.fr("Number of moves","Nombre de coups");
mxG.fr("translateTitle",function(ev,ro)
{
	let s=ev+"",a=ro+"",c="",of="",t="",between="";
	if(a!="")
	{
		if(a.search(/^([0-9]+)$/)==0) t="ronde";
		else if(a.search(/[ ]*\((final|semi-final|quarter-final|playoff|game|round)\)/i)>=0)
		{
			if(s.search(/[ ]+(cup|league)/i)>=0) of=" de la ";else if(s) of=" du ";
			if(a.search(/[ ]*\(final\)/i)>=0) {c="Finale"+of;t="partie";}
			else if(a.search(/[ ]*\(semi-final\)/i)>=0) {c="Demi-finale"+of;t="partie";}
			else if(a.search(/[ ]*\(quarter-final\)/i)>=0) {c="Quart de finale"+of;t="partie";}
			else if(a.search(/[ ]*\(playoff\)/i)>=0) {c="Playoff"+of;t="partie";}
			else if(a.search(/[ ]*\(game\)/i)>=0) t="partie";
			else t="tour";
			a=a.replace(/[ ]*\((final|semi-final|quarter-final|playoff|game|round)\)/i,"");
		}
		else if(a.search(/[ ]*\(final tournament\)/i)>=0)
		{
			if(s.search(/[ ]+(cup|league)/i)>=0) of=" de la ";else if(s) of=" du ";
			c="Tournoi final"+of;t="ronde";
			a=a.replace(/[ ]*\(final tournament\)/i,"");
		}
		if(a.search(/^([0-9]+)/)==0) a=a.replace(/^([0-9]+)(.*)/,t+(t?" ":"")+"$1$2");
	}
	if(s.search(/^([0-9]+)(st|nd|rd|th)/i)>=0)
	{
		s=s.replace(/^([0-9]+)(st|nd|rd|th)[ ]+Female[ ]+(.*)$/i,"$1$2 $3 féminin");
		s=s.replace(/^([0-9]+)(st|nd|rd|th)[ ]+(Former|Old)[ ]+(.*)$/i,"$1$2 ancien $4");
		s=s.replace(/^([0-9]+)(st|nd|rd|th)/i,"$1<span class=\"sup\">e</span>");
		s=s.replace(/^1<span class=\"sup\">e<\/span>/,(s.search(/[ ]+(cup|league)/i)>=0)?"1<span class=\"sup\">re</span>":"1<span class=\"sup\">er</span>");
	}
	s=c+s;
	if(s&&(a.search(/^[a-zA-Z0-9]/)==0)) s+=", ";else if(s&&a) s+=" ";
	if(s) s=s.ucF(); else if(a) a=a.ucF();
	return s+a;
});
mxG.en("translateTitle",function(ev,ro)
{
	let s=ev+"",a=ro+"",c="",t="",before="",between="";
	if(a!="")
	{
		if(a.search(/^([0-9]+)$/)==0) t="round";
		if(a.search(/[ ]*\((final|semi-final|quarter-final|playoff|game|round)\)/i)>=0)
		{
			if(s) before=", ";
			if(a.search(/[ ]*\(final\)/i)>=0) {c=before+"final";t="game";}
			else if(a.search(/[ ]*\(semi-final\)/i)>=0) {c=before+"semi-final";t="game";}
			else if(a.search(/[ ]*\(quarter-final\)/i)>=0) {c=before+"quarter-final";t="game";}
			else if(a.search(/[ ]*\(playoff\)/i)>=0) {c=before+"playoff";t="game";}
			else if(a.search(/[ ]*\(game\)/i)>=0) t="game";
			else t="round";
			a=a.replace(/[ ]*\((final|semi-final|quarter-final|playoff|game|round)\)/i,"");
		}
		else if(a.search(/[ ]*\(final tournament\)/i)>=0)
		{
			if(s) before=", ";
			c=before+"final tournament";t="round";
			a=a.replace(/[ ]*\(final tournament\)/i,"");
		}
		if(a.search(/^([0-9]+)/)==0) a=a.replace(/^([0-9]+)(.*)/,t+(t?" ":"")+"$1$2");
	}
	s=s+c;
	if(s&&(a.search(/^\(/)==0)) between=" ";else if(s&&a) between=", ";
	s=s+between+a;
	return s.ucF();
});
mxG.fr("buildMonth",function(a)
{
	let m=["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
	return m[parseInt(a)-1];
});
mxG.fr("buildDay",function(a)
{
	if(a=="01") return "1<span class=\"sup\">er</span>";
	return a.replace(/,([0-9]{2})/g,"-$1").replace(/0([1-9])/g,"$1");
});
mxG.fr("buildDate2",function(s)
{
	let r,reg=/(^\s*([0-9]{2})(-([0-9]{2}(,[0-9]{2})*))?)(([^-])(.*))*\s*$/g;
	if(s.match(reg))
	{
		r=s.replace(reg,"$8");
		m=s.replace(reg,"$2");
		d=s.replace(reg,"$4");
		return (d?mxG.Z.fr["buildDay"](d)+" ":"")+mxG.Z.fr["buildMonth"](m)+(r?", "+mxG.Z.fr["buildDate2"](r):"");
	}
	return s;
});
mxG.fr("buildDate",function(s)
{
	let r,y,m,reg=/(^\s*([0-9]{4})(-([^\.]*))*)(\.)?(.*)\s*$/g,k,km,z;
	if(s.indexOf("~")>=0)
	{
		r=s.split("~");
		km=r.length;
		z=mxG.Z.fr["buildDate"](r[0]);
		for(k=1;k<km;k++) z+=" ~ "+mxG.Z.fr["buildDate"](r[k]);
		return z;
	}
	s=s.replace(/,([0-9]{4})/g,".$1");
	if(s.match(reg))
	{
		r=s.replace(reg,"$6");
		y=s.replace(reg,"$2");
		m=s.replace(reg,"$4");
		return (m?mxG.Z.fr["buildDate2"](m)+" ":"")+y+(r?", "+mxG.Z.fr["buildDate"](r):"");
	}
	return s;
});
mxG.G.prototype.buildTitle=function()
{
	let ev,ro,f;
	ev=this.getInfo("EV");
	ro=this.getInfo("RO");
	if(this.translateTitleOn) f="translateTitle";else f="buildTitle";
	if(mxG.Z[this.lang]&&mxG.Z[this.lang][f]) return mxG.Z[this.lang][f](ev,ro);
	return ev+((ev&&ro)?this.local(", "):"")+ro;
};
mxG.G.prototype.buildRules=function(a)
{
	return this.local(a.ucF());
};
mxG.G.prototype.buildTimeLimits=function(a)
{
	if(a.match(/^[0-9]+$/g))
	{
		let r="",t,h,mn,s;
		t=parseInt(a);
		h=Math.floor(t/3600);
		if(h) r+=h+this.local("h");
		mn=Math.floor((t-h*3600)/60);
		if(mn) r+=(r?this.local(" "):"")+mn+this.local("mn");
		s=t-h*3600-mn*60;
		if(s) r+=(r?this.local(" "):"")+s+this.local("s");
		return r+this.local(" per player");
	}
	return a;
};
mxG.G.prototype.buildKomi=function(k)
{
	let a=k+"",b;
	if(a.search(/^([0-9]+([,\.]([0-9]+)?)?)?$/)==0)
	{
		b=parseFloat(a.replace(",","."));
		if(b==0) return this.local("none");
		if((b>-2)&&(b<2)) b+=this.local(" point");
		else b+=this.local(" points");
		return (b+"").replace(".",this.local("."));
	}
	return a;
};
mxG.G.prototype.buildResult=function(a)
{
	let b="";
	if(a.substring(0,1)=="B") b=this.local("Black");
	else if(a.substring(0,1)=="W") b=this.local("White");
	else if(a.substring(0,1)=="V") return this.local("game with no result");
	else if(a.substring(0,1)=="D") return this.local("draw");
	else if(a.substring(0,1)=="0") return this.local("draw");
	else if(a.substring(0,1)=="?") return this.local("unknown result");
	else return a;
	b+=this.local(" wins");
	if(a.substring(1,2)=="+")
	{
		if(a.substring(2,3)=="R") b+=this.local(" by resign");
		else if(a.substring(2,3)=="T") b+=this.local(" by time");
		else if(a.substring(2,3)=="F") b+=this.local(" by forfeit");
		else if(a.length>2)
		{
			let c=parseFloat(a.substring(2).replace(",","."));
			b+=this.local(" by ")+c;
			if((c>-2)&&(c<2)) b+=this.local(" point");else b+=this.local(" points");
			b=b.replace(".",this.local("."));
		}
	}
	return b;
};
mxG.G.prototype.buildNumOfMoves=function(k)
{
	return k+((k<2)?this.local(" move"):this.local(" moves"));
};
mxG.G.prototype.getNumOfMoves=function()
{
	let aN=this.rN,n=0,p=0,ex="E",v;
	while(this.kidOnFocus(aN))
	{
		aN=aN.Kid[0];
		if(aN.P.B||aN.P.W)
		{
			n++;
			if(aN.P.B) v=aN.P.B[0];else v=aN.P.W[0];
			if(v) p=0;else p++;
			if((aN.P.B&&(ex=="B"))||(aN.P.W&&(ex=="W"))) {n++;if(p) p++;}
		}
		else if(aN.P.AB||aN.P.AW||aN.P.AE) ex="E";
	}
	return n-p;
};
mxG.G.prototype.buildHeader=function(u=0)
{
	let a="",t="",h="",g="",b,c,d,r,z=0;
	if(!this.hideTitle)
	{
		t=this.buildTitle();
		if(this.concatDateToTitle&&(a=this.getInfo("DT"))) t+=(t?" (":"")+this.build("Date",a)+(t?")":"");
	}
	if(t)
	{
		if(u) t="<h1 tabindex=\"0\" class=\"mxTitleH1\">"+t+"</h1>";
		else t="<p class=\"mxTitleP\">"+t+"</p>";
	}
	a=(this.hideBlack)?0:this.getInfo("PB");
	if(a)
	{
		h+=this.local("Black")+this.local(": ")+a;
		a=this.getInfo("BR");
		if(a) h+=this.local(" ")+this.build("Rank",a);
		if(this.concatTeamToPlayer&&(b=this.getInfo("BT"))) h+=(a?" (":"")+b+(a?")":"");
		z=1;
	}
	a=(this.hideWhite)?0:this.getInfo("PW");
	if(a)
	{
		if(z) h+="<br>";
		h+=this.local("White")+this.local(": ")+a;
		a=this.getInfo("WR");
		if(a) h+=this.local(" ")+this.build("Rank",a);
		if(this.concatTeamToPlayer&&(b=this.getInfo("WT"))) h+=(a?" (":"")+b+(a?")":"");
		z=1;
	}
	if(this.hideDate) a="";else a=this.getInfo("DT");
	if(a&&!this.concatDateToTitle)
	{
		if(z) h+="<br>";
		h+=this.local("Date")+this.local(": ")+this.build("Date",a);
		z=1;
	}
	if(this.hidePlace) a="";else a=this.getInfo("PC");
	if(a)
	{
		if(z) h+="<br>";
		h+=this.local("Place")+this.local(": ")+a;
		z=1;
	}
	if(this.hideRules) a="";else a=this.getInfo("RU");
	if(a)
	{
		if(z) h+="<br>";
		h+=this.local("Rules")+this.local(": ")+this.build("Rules",a);
		z=1;
	}
	if(this.hideTimeLimits) a="";else a=this.getInfo("TM");
	if(a)
	{
		if(z) h+="<br>";
		h+=this.local("Time limits")+this.local(": ")+this.build("TimeLimits",a);
		z=1;
	}
	if(this.hideKomi) a="";else a=this.getInfo("KM");
	if(a) b=this.local("Komi")+this.local(": ")+this.build("Komi",a);else b="";
	if(b&&!this.concatKomiToResult)
	{
		if(z) h+="<br>";
		h+=b;
		z=1;
	}
	if(this.hideHandicap) a="";else a=this.getInfo("HA");
	if(a) c=this.local("Handicap")+this.local(": ")+this.build("handicap",a);else c="";
	if(c&&!this.concatHandicapToResult)
	{
		if(z) h+="<br>";
		h+=c;
		z=1;
	}
	if(this.hideNumOfMoves) d="";
	else
	{
		a=this.getNumOfMoves()+"";
		if(this.hideNumOfMovesLabel) d=this.build("NumOfMoves",a);
		else d=this.local("Number of moves")+this.local(": ")+a;
		if(!this.concatNumOfMovesToResult)
		{
			if(z) h+="<br>";
			h+=d;
			z=1;
		}
	}
	if(!this.hideResult&&(a=this.getInfo("RE")))
	{
		if(z) h+="<br>";
		r=this.build("Result",a);
		if(!this.hideResultLabel) h+=(this.local("Result")+this.local(": ")+r);
		else h+=r.ucF();
		if((d&&this.concatNumOfMovesToResult)
			||(c&&this.concatHandicapToResult)
			||(b&&this.concatKomiToResult))
		{
			let b2,c2,d2;
			h+=" (";
			if(d&&this.concatNumOfMovesToResult) d2=d; else d2="";
			if(c&&this.concatHandicapToResult) c2=c; else c2="";
			if(b&&this.concatKomiToResult) b2=b; else b2="";
			if(d2) h+=d2;
			if(d2&&c2) h+="; ";
			if(c2) h+=c2;
			if((d2||c2)&&b2) h+="; ";
			if(b2) h+=b2;
			h+=")";
		}
		z=1;
	}
	if(h) h="<p class=\"mxHeaderContentP\">"+h+"</p>";
	if(!this.hideGeneralComment&&(a=this.getInfo("GC")))
		g="<p class=\"mxGeneralCommentP\">"+a.replace(/\n/g,"<br>")+"</p>";
	return t+h+g;
};
mxG.G.prototype.doHeader=function()
{
	this.doDialog("ShowHeader",this.buildHeader(1),[{n:" Close "}]);
};
mxG.G.prototype.updateHeader=function()
{
	if(this.headerBoxOn)
	{
		let h=this.buildHeader();
		if(h!=this.header)
		{
			this.getE("HeaderDiv").innerHTML=h;
			this.header=h;
		}
	}
};
mxG.G.prototype.initHeader=function()
{
	if(this.headerBtnOn)
	{
		let o={n:"Header",v:this.alias("Header","headerAlias")},
			s=this.local("Header");
		if(o.v!=s) o.t=s;
		this.addBtn(this.getE("HeaderDiv"),o);
	}
};
mxG.G.prototype.createHeader=function()
{
	this.canHeaderFocus=this.setA("canHeaderFocus",0,"bool");
	this.concatInHeader=this.setA("concatInHeader",new Set(),"set");
	for(let k of this.concatInHeader) this["concat"+k]=1;
	this.headerAlias=this.setA("headerAlias",null,"string");
	this.headerBoxOn=this.setA("headerBoxOn",0,"bool");
	this.headerBtnOn=this.setA("headerBtnOn",0,"bool");
	this.hideInHeader=this.setA("hideInHeader",new Set(),"set");
	this.translateTitleOn=this.setA("translateTitleOn",0,"bool");
	for(let k of this.hideInHeader) this["hide"+k]=1;
	if(this.headerBoxOn||this.headerBtnOn)
	{
		let a=(this.headerBoxOn&&this.canHeaderFocus)?" tabindex=\"0\"":"";
		return "<div class=\"mxHeaderDiv\" id=\""+this.n+"HeaderDiv\""+a+"></div>";
	}
	return "";
};
}
if(!mxG.G.prototype.createNavigation)
{
mxG.fr("First","Début");
mxG.fr("10 Previous","10 précédents");
mxG.fr("Previous","Précédent");
mxG.fr("Next","Suivant");
mxG.fr("10 Next","10 suivants");
mxG.fr("Last","Fin");
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
	if(this.deltaYc===undefined) this.deltaYc=0;
	this.deltaY=Math.abs(ev.deltaY);
	if(!this.deltaYm)
	{
		this["wheel"+a]();
		this.deltaYm=128;
	}
	else
	{
		if((this.deltaYc+=this.deltaY)>this.deltaYm)
		{
			this["wheel"+a]();
			this.deltaYc=0;
			if(this.deltaYm>1)this.deltaYm>>=1;
		}
	}
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
		this.deltaYm=0;
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
	return "<div class=\"mxNavigationDiv\" id=\""+this.n+"NavigationDiv\" tabindex=\"-1\"></div>";
};
}
if(!mxG.G.prototype.createGoto)
{
mxG.fr("Go to ...","Aller à ...");
mxG.G.prototype.doKeyupGotoInput=function()
{
	let k;
	let aN=this.cN;
	let n=parseInt(this.getE("GotoInput").value);
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
mxG.G.prototype.doInputGotoBox=function(ev)
{
	if(this.gotoBoxOn)
	{
		let ko,k1=0,aN=this.rN;
		this.inGoto=1;
		ko=ev.target.value;
		aN=this.kidOnFocus(this.rN);
		while(this.kidOnFocus(aN)&&(k1<ko)) {k1++;aN=this.kidOnFocus(aN)};
		this.backNode(aN);
		this.updateAll();
		this.inGoto=0;
	}
};
mxG.G.prototype.addGotoInput=function()
{
	let k=this.k,
		i=document.createElement("input"),
		e=this.getE("NavigationDiv");
	i.title=this.local("Go to ...");
	i.type="text";
	i.maxLength="3";
	i.id=this.n+"GotoInput";
	i.value=0;
	i.addEventListener("keyup",function(ev){mxG.D[k].doKeyupGotoInput();});
	i.classList.add("mxGotoInput");
	e.appendChild(i);
};
mxG.G.prototype.updateGotoInput=function()
{
	let e=this.getE("GotoInput"),ko,k1=e.value;
	if(!this.cN.P||!(this.cN.P.B||this.cN.P.W)) ko="";
	else ko=this.getAsInTreeNum(this.cN);
	if(ko!=k1) e.value=ko;
};
mxG.G.prototype.updateGotoBox=function()
{
	let ko=0,kn=0,aN,e;
	aN=this.kidOnFocus(this.rN);
	while(aN=this.kidOnFocus(aN)) {kn++;if(aN==this.cN) ko=kn;}
	if(!kn) kn=1;
	e=this.getE("GotoDiv").querySelector('input');
	e.setAttribute("max",kn);
	e.value=ko;
};
mxG.G.prototype.updateGoto=function()
{
	if(this.gotoInputOn) this.updateGotoInput();
	if(this.gotoBoxOn&&!this.inGoto) this.updateGotoBox();
};
mxG.G.prototype.initGoto=function()
{
	if(this.gotoBoxOn)
	{
		let k=this.k,e=this.getE("GotoDiv").querySelector('input');
		e.addEventListener("input",function(ev){mxG.D[k].doInputGotoBox(ev);});
	}
};
mxG.G.prototype.createGoto=function()
{
	let s="",t=this.local("Go to ...");
	this.gotoBoxOn=this.setA("gotoBoxOn",0,"bool");
	this.gotoInputOn=0;
	if(this.gotoBoxOn)
	{
		s+="<div class=\"mxGotoDiv\" id=\""+this.n+"GotoDiv\">";
		s+="<input type=\"range\" step=\"1\" min=\"0\" max=\"1\" title=\""+t+"\">";
		s+="</div>";
	}
	return s;
};
}
if(!mxG.G.prototype.createAbout)
{
mxG.fr("About","À propos");
mxG.fr(" Close ","Fermer");
mxG.fr("Source code:","Code source :");
mxG.fr("Theme:","Thème :");
mxG.fr("Configuration:","Configuration :");
mxG.fr("License:","Licence :");
mxG.fr("Copyright","Copyright");
mxG.G.prototype.buildAbout=function()
{
	let a,b,c,d,e,s="";
	a="https"+":/"+"/jeudego.org/maxiGos";
	a="<a href=\""+a+"\">"+a+"</a>";
	b=this.theme;
	c=this.config;
	d="<a href=\"https"+":/"+"/opensource.org/licenses/BSD-3-Clause\">BSD</a>";
	e="1998-"+mxG.Y+" "+mxG.C;
	s+="<h1 tabindex=\"0\">maxiGos "+mxG.V+"</h1>";
	s+="<p>"+this.local("Source code:")+" "+this.alias(a,"aboutSourceCodeAlias")+"</p>";
	s+="<p>"+this.local("Theme:")+" "+this.alias(b,"aboutThemeAlias")+"</p>";
	s+="<p>"+this.local("Configuration:")+" "+this.alias(c,"aboutConfigAlias")+"</p>";
	s+="<p>"+this.local("License:")+" "+this.alias(d,"aboutLicenseAlias")+"</p>";
	s+="<p>"+this.local("Copyright")+" "+this.alias(e,"aboutCopyrightAlias")+"</p>";
	return s;
};
mxG.G.prototype.doAbout=function()
{
	this.doDialog("ShowAbout",this.buildAbout(),[{n:" Close "}]);
};
mxG.G.prototype.initAbout=function()
{
	if(this.aboutBtnOn)
	{
		let o={n:"About",v:this.alias("About","aboutAlias")},
			s=this.local("About");
		if(o.v!=s) o.t=s;
		this.addBtn(this.getE("AboutDiv"),o);
	}
};
mxG.G.prototype.createAbout=function()
{
	this.aboutBtnOn=this.setA("aboutBtnOn",0,"bool");
	this.aboutAlias=this.setA("aboutAlias",null,"string");
	this.aboutSourceCodeAlias=this.setA("aboutSourceCodeAlias",null,"string");
	this.aboutThemeAlias=this.setA("aboutThemeAlias",null,"string");
	this.aboutConfigAlias=this.setA("aboutConfigAlias",null,"string");
	this.aboutLicenseAlias=this.setA("aboutLicenseAlias",null,"string");
	this.aboutCopyrightAlias=this.setA("aboutCopyrightAlias",null,"string");
	return this.aboutBtnOn?this.createBtnBox("About"):"";
};
}
if(!mxG.G.prototype.createGoban)
{
mxG.G.prototype.deplonkGoban=function()
{
	this.ig.style.visibility="visible";
	this.ig.firstChild.focus();
};
mxG.G.prototype.plonk=function()
{
	let z=this.k;
	this.ig.style.visibility="hidden";
	setTimeout(function(){mxG.D[z].deplonkGoban();},50);
};
mxG.G.prototype.xy=function(x,y){return (x-this.xl)*(this.yb-this.yt+1)+y-this.yt;};
mxG.G.prototype.xy2s=function(x,y){return (x&&y)?String.fromCharCode(x+((x>26)?38:96),y+((y>26)?38:96)):"";};
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
		let g=this.goodnessCode;
		if(k&g.Good) return "mxGood";
		if(k&g.Bad) return "mxBad";
		if(k&g.Even) return "mxEven";
		if(k&g.Warning) return "mxEven";
		if(k&g.Unclear) return "mxUnclear";
		if(k&g.OffPath) return "mxOffPath";
		if(k&g.Focus) return "mxFocus";
	}
	return "mxNeutral";
};
mxG.G.prototype.inView=function(x,y)
{
	return (x>=this.xl)&&(y>=this.yt)&&(x<=this.xr)&&(y<=this.yb);
};
mxG.G.prototype.setIn3d=function()
{
	let e=this.getE("GlobalBoxDiv"),z=this.in3dOn;
	e.classList.remove(z?"mxIn2d":"mxIn3d");
	e.classList.add(z?"mxIn3d":"mxIn2d");
}
mxG.G.prototype.setIndices=function()
{
	let z,e=this.getE("GlobalBoxDiv");
	if(this.configIndicesOn===null)
		this.indicesOn=((parseInt(this.getInfo("FG")+"")&1)?0:1);
	z=this.indicesOn;
	if(z&&(this.xl==1)) this.xli=0;else this.xli=this.xl;
	if(z&&(this.yt==1)) this.yti=0;else this.yti=this.yt;
	if(z&&(this.xr==this.DX)) this.xri=this.DX+1;else this.xri=this.xr;
	if(z&&(this.yb==this.DY)) this.ybi=this.DY+1;else this.ybi=this.yb;
	e.classList.remove(z?"mxIndicesOff":"mxIndicesOn");
	e.classList.add(z?"mxIndicesOn":"mxIndicesOff");
};
mxG.G.prototype.setNumbering=function()
{
	if(this.configAsInBookOn===null)
		this.asInBookOn=((parseInt(this.getInfo("FG")+"")&256)?1:0);
	if((this.configNumberingOn===null)||this.numberingOn)
	{
		let aN=this.cN;
		this.numberingOn=parseInt(this.getInfo("PM")+"");
		if(this.numberingOn&&(aN!=this.rN))
		{
			let ka=0,kb=0,kc=0,de,bN=null,cN=null,fg;
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
		else this.numFrom=this.numWith=1;
	}
};
mxG.G.prototype.addMarksAndLabels=function()
{
	let MX=["MA","TR","SQ","CR","LB","TB","TW"],k,aLen,s,x,y,z;
	for(z=0;z<7;z++)
	{
		aLen=this.cN.P[MX[z]]?this.cN.P[MX[z]].length:0;
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
						this.vStr[this.xy(x,y)]="|"+s.substring(3).noP().noT()+"|";
				}
			}
			else if(s.length==2)
			{
				x=s.c2n(0);
				y=s.c2n(1);
				if(this.inView(x,y)) this.vStr[this.xy(x,y)]="_"+MX[z]+"_";
			}
			else if(s.length==5)
			{
				let x1=s.c2n(0),y1=s.c2n(1),x2=s.c2n(3),y2=s.c2n(4);
				for(x=x1;x<=x2;x++)
					for(y=y1;y<=y2;y++)
						if(this.inView(x,y)) this.vStr[this.xy(x,y)]="_"+MX[z]+"_";
			}
		}
	}
};
mxG.G.prototype.isNumbered=function(aN)
{
	if(!(aN.P["B"]||aN.P["W"])) return 0;
	if(this.configNumberingOn!==null) return this.numberingOn;
	let bN=((aN==this.rN)?this.kidOnFocus(aN):aN);
	while(bN!=this.rN)
	{
		if(bN.P["PM"]) return parseInt(bN.P["PM"][0]+"");
		bN=bN.Dad;
	}
	return 1;
};
mxG.G.prototype.getAsInTreeNum=function(xN)
{
	let aN=xN,ka=0,kb=0,kc=0,de,bN=null,cN=null,fg;
	while(aN!=this.rN)
	{
		if(!bN&&aN.P["MN"]) {bN=aN;kb=ka;}
		if(!cN&&aN.P["FG"]) {cN=aN;kc=ka;}
		if(aN.P["AB"]||aN.P["AW"]||aN.P["AE"]) break;
		if(aN.P["B"]||aN.P["W"]) ka++;
		if((aN.Dad.P["B"]&&aN.P["B"])||(aN.Dad.P["W"]&&aN.P["W"])) ka++;
		aN=aN.Dad;
	}
	if(!cN) {cN=this.kidOnFocus(this.rN);kc=ka;}
	de=((!cN.P.B&&!cN.P.W)?1:0);
	fg=ka-kc+(bN?parseInt(bN.P.MN[0]+"")-ka+kb-((bN==cN)?de:0):0);
	if(this.isNumbered(xN)==2) fg=fg%100;
	return fg+kc;
};
mxG.G.prototype.getVisibleMove=function(x,y)
{
	let k,kmin,kmax;
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
	return this.gor.getNat(n);
};
mxG.G.prototype.getTenuki=function(m,n)
{
	let k,r=0;
	for(k=m;k>n;k--) if(this.gor.getNat(k)==this.gor.getNat(k-1)) r++;
	return r;
};
mxG.G.prototype.getCoreNum=function(m)
{
	let s=this.gor.setup;
	if(m>s)
	{
		let n=s+this.numFrom,r;
		if(m>=n) {r=m-n+this.numWith+this.getTenuki(m,n);return (r<1)?"":r+"";}
	}
	return "";
};
mxG.G.prototype.getVisibleNum=function(m)
{
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
	let m=this.getVisibleMove(x,y),n=this.getVisibleNum(m),k=this.xy(x,y);
	this.vNat[k]=this.getVisibleNat(m);
	this.vStr[k]=(this.markOnLastOn&&(z==k)&&!n)?
					(this.numAsMarkOnLastOn?this.getCoreNum(m):"_ML_"):n;
	this.vStr[k]=this.preTerritory(x,y,this.vNat[k],this.vStr[k]);
};
mxG.G.prototype.moveFocusInView=function()
{
	this.xFocus=Math.min(Math.max(this.xFocus,this.xl),this.xr);
	this.yFocus=Math.min(Math.max(this.yFocus,this.yt),this.yb);
};
mxG.G.prototype.moveFocusMarkOnLast=function()
{
	let a,e,g,m=this.gor.play;
	if(this.gor.getAct(m)=="")
	{
		this.xFocus=this.gor.getX(m);
		this.yFocus=this.gor.getY(m);
		this.moveFocusInView();
	}
	this.scr.setGobanFocusTitleDesc(0);
};
mxG.G.prototype.moveFocusMarkOnVariationOnFocus=function()
{
	let g=this.getE("GobanSvg"),e;
	e=g.querySelector(".mxVariation.mxOnFocus[data-maxigos-ij]");
	if(e)
	{
		let v=e.getAttribute("data-maxigos-ij");
		if(v)
		{
			let c=v.split("_");
			if(c&&(c.length==2))
			{
				this.xFocus=-(-c[0]);
				this.yFocus=-(-c[1]);
				this.moveFocusInView();
				this.scr.setGobanFocusTitleDesc(0);
			}
		}
	}
};
mxG.G.prototype.doClickGoban=function(ev)
{
	let c=this.scr.getGxy(ev);
	this.shortTitleOnly=1;
	if(!this.inView(c.x,c.y)) {this.plonk();return;}
	this.xFocus=c.x;
	this.yFocus=c.y;
	if(this.canPlaceEdit) this.checkEdit(c.x,c.y);
	else if(this.canPlaceSolve) this.checkSolve(c.x,c.y);
	else if(this.canPlaceVariation) this.checkVariation(c.x,c.y);
	else if(this.canPlaceGuess) this.checkGuess(c.x,c.y);
	else if(this.canPlaceScore) this.checkScore(c.x,c.y);
	ev.preventDefault();
};
mxG.G.prototype.doKeydownGoban=function(ev)
{
	let r=0;
	this.shortTitleOnly=1;
	if((ev.key==" ")||(ev.key=="Enter"))
	{
		let x=this.xFocus,y=this.yFocus;
		if(this.canPlaceEdit)
		{
			if(this.editTool=="Select") this.doKeydownSelect(x,y);
			else this.checkEdit(x,y);
		}
		else if(this.canPlaceSolve) this.checkSolve(x,y);
		else if(this.canPlaceVariation) this.checkVariation(x,y);
		else if(this.canPlaceGuess) this.checkGuess(x,y);
		else if(this.canPlaceScore) this.checkScore(x,y);
		ev.preventDefault();
		return;
	}
	if(ev.shiftKey||ev.altKey)
	{
		if(this.hasC("Navigation")) this.doKeydownNavigation(ev);
		else if(this.hasC("Solve")) this.doKeydownSolve(ev);
		return;
	}
	switch(ev.key)
	{
		case "ArrowLeft":case "h":this.xFocus--;r=1;break;
		case "ArrowRight":case "j":this.xFocus++;r=1;break;
		case "ArrowUp":case "u":this.yFocus--;r=1;break;
		case "ArrowDown":case "n":this.yFocus++;r=1;break;
	}
	if(r)
	{
		this.moveFocusInView();
		if(this.hasC("Edit")&&(this.editTool=="Select"))
		{
			if(this.inSelect==2) this.selectGobanArea(this.xFocus,this.yFocus);
			this.updateAll();
		}
		else this.scr.setGobanFocusTitleDesc(0);
		ev.preventDefault();
	}
};
mxG.G.prototype.doBlurGoban=function(ev)
{
	this.shortTitleOnly=0;
	this.scr.setGobanFocusTitleDesc(0);
};
mxG.G.prototype.setGoban=function()
{
	let k=this.k,g;
	this.moveFocusInView();
	this.scr.setInternalParams();
	this.ig.innerHTML=this.scr.makeGoban();
	g=this.getE("GobanSvg");
	g.getMClick=mxG.getMClick;
	g.addEventListener("click",function(ev){mxG.D[k].doClickGoban(ev);});
	g.addEventListener("keydown",function(ev){mxG.D[k].doKeydownGoban(ev);});
	g.addEventListener("blur",function(ev){mxG.D[k].doBlurGoban(ev);});
	if(this.hasC("Navigation"))
		g.addEventListener("wheel",function(ev){mxG.D[k].doWheelNavigation(ev);});
	if(this.hasC("Edit"))
	{
		g.addEventListener("mousemove",function(ev){mxG.D[k].doMouseMoveEdit(ev);});
		g.addEventListener("mouseup",function(ev){mxG.D[k].doMouseUpEdit(ev);});
		g.addEventListener("mousedown",function(ev){mxG.D[k].doMouseDownEdit(ev);});
		g.addEventListener("mouseout",function(ev){mxG.D[k].doMouseOutEdit(ev);});
	}
	this.hasToSetGoban=0;
};
mxG.G.prototype.updateGoban=function()
{
	let i,j,k,x,y,z=-1,m,q;
	if(this.scr.in3dOn!==this.in3dOn)
	{
		this.scr.in3dOn=this.in3dOn;
		this.hasToSetGoban=1;
	}
	if(this.scr.stoneShadowOn!==this.stoneShadowOn)
	{
		this.scr.stoneShadowOn=this.stoneShadowOn;
		this.hasToSetGoban=1;
	}
	if(this.scr.stretching!==this.stretching)
	{
		this.scr.stretching=this.stretching;
		this.hasToSetGoban=1;
	}
	if(this.scr.indicesOn!==this.indicesOn)
	{
		this.scr.indicesOn=this.indicesOn;
		this.hasToSetGoban=1;
	}
	if((this.scr.DX!==this.DX)||(this.scr.DY!==this.DY))
	{
		this.scr.DX=this.DX;
		this.scr.DY=this.DY;
		this.hasToSetGoban=1;
	}
	if((this.scr.xl!==this.xl)||(this.scr.xr!==this.xr)
		||(this.scr.yt!==this.yt)||(this.scr.yb!==this.yb))
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
			this.addNatAndNum(i,j,z);
	if(this.marksAndLabelsOn) this.addMarksAndLabels();
	if(this.hasC("Variation")) this.addVariationMarks();
	if(this.hasToSetGoban) {this.setGoban();q=1;} else q=0;
	this.scr.drawGoban(this.vNat,this.vStr);
	if(q&&this.hasC("Edit")&&this.selection) this.selectView();
};
mxG.G.prototype.initGoban=function()
{
	this.alea=Math.floor(Math.random()*6)+2;
	this.scr.init();
	this.hasToSetGoban=1;
};
mxG.G.prototype.createGoban=function()
{
	this.pointsNumMax=this.setA("pointsNumMax",0,"int");
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
	if(this.hasC("Edit"))
		this.configIndicesOn=this.configAsInBookOn=this.configNumberingOn=null;
	else
	{
		this.configIndicesOn=this.indicesOn;
		this.configAsInBookOn=this.asInBookOn;
		this.configNumberingOn=this.numberingOn;
	}
	this.xFocus=this.yFocus=0;
	this.numFrom=this.numWith=1;
	this.goodnessCode={Good:1,Bad:2,Even:4,Warning:8,Unclear:16,OffPath:32,Focus:64};
	let s="<div class=\"mxGobanDiv\" id=\""+this.n+"GobanDiv\">";
	s+="<div class=\"mxInnerGobanDiv\" id=\""+this.n+"InnerGobanDiv\"";
	return s+"></div></div>";
};
}
if(!mxG.G.prototype.createVariation)
{
mxG.fr("Variations","Variations");
mxG.fr("no variation","aucune");
mxG.G.prototype.setMode=function()
{
	this.styleMode=parseInt(this.getInfo("ST"));
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
mxG.G.prototype.doClickVariation=function(a)
{
	let aN=this.styleMode&1?this.cN.Dad:this.cN;
	if(this.styleMode&1) this.backNode(aN);
	aN.Focus=a+1;
	this.placeNode();
	this.updateAll();
};
mxG.G.prototype.addVariationMarkInBox=function(a,m)
{
	let b=document.createElement("button"),k=this.k;
	if(this.scr.isLabel(m)) m=this.scr.removeLabelDelimiters(m);
	b.innerHTML=m;
	b.addEventListener("click",function(ev){mxG.D[k].doClickVariation(a);});
	this.getE("VariationDiv").appendChild(b);
};
mxG.G.prototype.buildVariationMark=function(l)
{
	if(this.variationMarkSeed) return this.variationMarkSeed[l-1];
	return l+"";
};
mxG.G.prototype.isNextMove=function(x,y)
{
	if(!(this.styleMode&3))
	{
		let aN=this.kidOnFocus(this.cN);
		if(aN)
		{
			let s=aN.P.B?aN.P.B[0]:aN.P.W?aN.P.W[0]:"";
			if(s&&(s.c2n(0)==x)&&(s.c2n(1)==y)) return 1;
		}
	}
	return 0;
};
mxG.G.prototype.addVariationMarks=function()
{
	let aN,k,km,l=0,e=this.getE("VariationDiv"),
		s1="<span class=\"mxVariationsSpan\">"+this.local("Variations")+this.local(": ")+"</span>",
		s2="<span class=\"mxNoVariationSpan\">"+this.local("no variation")+"</span>";
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
			let s=aN.Kid[k].P.B?aN.Kid[k].P.B[0]:aN.Kid[k].P.W?aN.Kid[k].P.W[0]:"",m;
			l++;
			if(s.length==2)
			{
				let x=s.c2n(0),y=s.c2n(1),z=this.xy(x,y);
				if(this.inView(x,y)) m=this.vStr[z];
				else m=this.buildVariationMark(l);
				if((m+"").search(/^\((.*)\)$/)==-1)
				{
					if(!m) m=this.buildVariationMark(l);
					if(!(this.styleMode&2)&&(!(this.styleMode&1)||(aN.Kid[k]!=this.cN)))
					{
						this.vStr[z]="("+m+")";
						if(this.isNextMove(x,y)) this.vStr[z]="("+this.vStr[z]+")";
					}
				}
				if((m+"").search(/^_.*_$/)==0) m=this.buildVariationMark(l);
			}
			else m=this.buildVariationMark(l);
			if(this.variationBoxOn&&(aN.Kid[k]!=this.cN)) this.addVariationMarkInBox(k,m);
		}
};
mxG.G.prototype.getVariationNextNat=function()
{
	let aN,k;
	if(this.hasC("Edit")&&this.editNextNat) return this.editNextNat;
	aN=this.cN;
	if(aN.P.PL) return aN.P.PL[0];
	aN=this.kidOnFocus(this.cN);
	if(aN)
	{
		if(aN.P.B) return "B";
		if(aN.P.W) return "W";
	}
	aN=this.cN;
	if(aN.P.B) return "W";
	if(aN.P.W) return "B";
	if(aN.P.AB&&!aN.P.AW) return "W";
	else if(aN.P.AW&&!aN.P.AB) return "B";
	for(let k=0;k<this.cN.Kid.length;k++)
	{
		aN=this.cN.Kid[k];
		if(aN.P.B) return "B";
		if(aN.P.W) return "W";
	}
	for(let k=0;k<this.cN.Dad.Kid.length;k++)
	{
		aN=this.cN.Dad.Kid[k];
		if(aN.P.B) return "W";
		if(aN.P.W) return "B";
	}
	return "B";
};
mxG.G.prototype.addPlay=function(aP,x,y)
{
	let aN,aV=this.xy2s(x,y);
	aN=new mxG.N(this.cN,aP,aV);
	aN.Add=1;
	this.cN.Focus=this.cN.Kid.length;
};
mxG.G.prototype.checkBW=function(aN,a,b)
{
	if(aN.P.B||aN.P.W)
	{
		let s=aN.P.B?aN.P.B[0]:aN.P.W[0],x,y;
		if(s.length==2) {x=s.c2n(0);y=s.c2n(1);}
		else {x=0;y=0;}
		return (x==a)&&(y==b);
	}
	return 0;
};
mxG.G.prototype.checkAX=function(aN,a,b)
{
	let AX=["AB","AW","AE"];
	for(let z=0;z<3;z++)
	{
		let aP=AX[z];
		if(aN.P[aP])
		{
			for(let k=0;k<aN.P[aP].length;k++)
			{
				let s=aN.P[aP][k],x,y,x1,x2,y1,y2;
				if((s.length==2)&&(s.c2n(0)==a)&&(s.c2n(1)==b)) return 1;
				if(s.length==5)
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
	let aN,bN,ok=0;
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
	for(let k=0;k<aN.Kid.length;k++)
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
	if(this.styleMode&1) {this.plonk();return;}
	this.addPlay(this.getVariationNextNat(),a,b);
	this.placeNode();
	if(this.hasC("Tree")) this.hasToSetTree=1;
	this.updateAll();
};
mxG.G.prototype.createVariation=function()
{
	this.canPlaceVariation=this.setA("canPlaceVariation",0,"bool");
	if(this.canPlaceVariation) this.canPlaceGuess=0;
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
		return "<div class=\"mxVariationDiv\" id=\""+this.n+"VariationDiv\"></div>";
	return "";
};
}
mxG.K++;
mxG.B=[["WhiteCartouche","BlackCartouche"],["Header","Navigation","Goto","About"],"Goban","Variation"];
mxG.D[mxG.K]=new mxG.G(mxG.K,mxG.B);
mxG.D[mxG.K].theme="WGo";
mxG.D[mxG.K].config="Game";
mxG.D[mxG.K].style=".mxWGoTheme{--gobanMaxWidth:calc(1em * 491 / 16);--gobanMinWidth:14em;text-align:left;}.mxWGoTheme.mxIndicesOff{--gobanMaxWidth:calc(1em * 445 / 16);}.mxWGoTheme button{-webkit-appearance:none;-moz-appearance:none;}.mxWGoTheme text{cursor:default;}.mxWGoTheme input[type=text][disabled],.mxWGoTheme button[disabled]{cursor:default;}.mxWGoTheme fieldset{border:0;margin:0;padding:0;}.mxWGoTheme svg{display:block;}.mxWGoTheme,.mxWGoTheme button{font-family:sans-serif;}.mxWGoTheme{max-width:var(--gobanMaxWidth);min-width:var(--gobanMinWidth);line-height:1.4em;font-family:Calibri,Tahoma,Arial,sans-serif;margin:0 auto;}.mxWGoTheme.mxCommentConfig,.mxWGoTheme.mxTreeConfig{box-sizing:border-box;display:flex;flex-wrap:wrap;justify-content:center;max-width:calc((var(--gobanMaxWidth) * 2) + 1em);}.mxWGoTheme.mxCommentConfig>div,.mxWGoTheme.mxTreeConfig>div{box-sizing:border-box;margin:0.125em;}.mxWGoTheme.mxCommentConfig>div:first-of-type,.mxWGoTheme.mxTreeConfig>div:first-of-type{flex:1 1 var(--gobanMaxWidth);max-width:var(--gobanMaxWidth);}.mxWGoTheme.mxCommentConfig>div:last-of-type,.mxWGoTheme.mxTreeConfig>div:last-of-type{flex:1 1 var(--gobanMaxWidth);max-width:var(--gobanMaxWidth);}.mxWGoTheme.mxCommentConfig .mxGobanGrandParentDiv,.mxWGoTheme.mxTreeConfig .mxGobanGrandParentDiv,.mxWGoTheme.mxCommentConfig .mxCommentParentDiv,.mxWGoTheme.mxTreeConfig .mxCommentParentDiv{display:flex;flex-direction:column;justify-content:space-between;}.mxWGoTheme.mxCommentConfig .mxGobanParentDiv,.mxWGoTheme.mxTreeConfig .mxGobanParentDiv{flex:1;display:flex;flex-direction:column;}.mxWGoTheme.mxCommentConfig .mxGobanDiv,.mxWGoTheme.mxTreeConfig .mxGobanDiv{margin:auto;width:100%;}.mxWGoTheme.mxCommentConfig .mxCommentDiv,.mxWGoTheme.mxTreeConfig .mxCommentDiv{flex:auto;height:8em;}.mxWGoTheme.mxTreeConfig .mxTreeDiv{flex:auto;height:9.5em;}.mxWGoTheme.mxCommentConfig .mxCommentDiv,.mxWGoTheme.mxTreeConfig .mxCommentDiv,.mxWGoTheme.mxTreeConfig .mxTreeDiv{position:relative;}.mxWGoTheme.mxCommentConfig .mxCommentContentDiv,.mxWGoTheme.mxTreeConfig .mxCommentContentDiv,.mxWGoTheme .mxTreeContentDiv{position:absolute;}.mxWGoTheme .mxTreeContentDiv{margin:0;padding:0;}.mxWGoTheme.mxBasicConfig .mxGobanDiv,.mxWGoTheme.mxCommentConfig .mxGobanDiv,.mxWGoTheme.mxGameConfig .mxGobanDiv,.mxWGoTheme.mxTreeConfig .mxGobanDiv{background:#f0f0f0;}.mxWGoTheme .mxInnerGobanDiv{margin:0 auto;}.mxWGoTheme .mxGobanDiv svg{width:100%;height:100%;background-image:url(data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCABgAGADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6j1MBpbsZORbDntjntUWqtiCbPP72MfjxU96T5t0QM/6MM8fWq2qx/uXweTPGcfgK/nuW7/rufo8XexD94Nxgm7b/ANAqKJj+5HqkPU/7RqYA4OCDm6bH/fNQxMDJaoQMlIiTj3NMt7ElqMODncfNb8P3lMSIDT48cAQsf/HhSWeBPbH+9NJn8HNSBv8AQIgP+eTDn/eFVvH+vIjqSIAbzbn/AJaSjjvwKjsFKzQdMfYzzj0Jp4Obwt0w054/CktMF4hj/l0PFQ1r/XkV0LN+D5N+c8kR/wBKq3xzd6rznMCcevFWr0EwXn1iH/oNVL3P9p6mo4xboc0N/wBfeQv6/AAcXEp+8d8OePYCiBA118xz+7kGD/vU51KzTHn78PA+gpYOL/nIysuR/wACFX/X4g9i3ckie+/6914/E1HqXMIAzzPHkjtwKW4P76/zwRAv9aXUwAq473EePyFQ1uEehWJznr/x9t/6DTIFDvBxyFiAP1JpWHKYOf8ASZDgf7lPtB80RxziEjn6007lMgiXbLaEHJE75/7+VGjFbO2HqhGO+Nw/wqaNciPAwVlc59MyVFFkWkBzk+UDz6lxTasr/wBdALMZzdN6/v8A+lFn/rUx2s8Y65zmmxECaXAAz5/bvwBTLJQ0rt0YWfB9DzUN7D6F66AMV0Dzloif/Har3y41DUz/ANME71YuDtW44BO+LP6Uy9GL7Uh3+zr0+lO1/wCvUhf1+BFJg3U4OD+8hxz9P8KSD/kIY9pgMfUUTN/pc/Xkwce+aIcDUDjr+97Y7iqvrb+twexPdtma/AH/ACwXP60uqKDGucACeMnv6f4VFcgi51HHT7MmMde/+NTaiT9j3erxZP5VMut/63CPQqJgY5xi6kU8dCVpkBw0QHXEI/IE0/lWfJz/AKUxx/wCo4X3TwDoMRn8ADzSiWxI3IgQ5ziTnHvJiiGIizgwD/qU/wDQxUcQ22oK87iDz6+casxgiziIBGYlP/j/AP8AWq918hdRqgi6l65Pnjk/SpLMAP0J/wBD5/WmFs3Lcc75v5CixbfInQ5s+nfvUFdC1cnEt0QDnfD7HtSX7f6dqeOv2dTjqelNuAGluhk8eSRn8KbeZOqahkHH2UH9DUuVv69Sf6/IJU3XU5xxug5B+hpVGdQPTpL/ADFSy4zMOAd0JJ/KmxBf7Scg9DLz2HIra3X+tyXqRyn/AE/UQQSBbLxUt9/x4gk94uPyqCTP2zVOMf6Op5/H/CptQwLNT/twg+1Q+vz/AFHHoVG3POFJ63Uhx/2zpbSLdJbk56RgHnptam7v9LGc5+1S/wDourNqB/ow6nEfI/3WprVlN6FUMI7aHqTjjHtNVtBusYvaJcnI67xVFv3scCDIxnP/AH96fpU9q5XT2I5C8D6CQf41UndK3YgcPmvM/wDTSYY/AUzTm3SW4PVrNvoOafFk3SEdRJMf5cfrUdgD51twP+PJsn8az7f12NOheuFzLdZOQBDilvEA1DUDj/l2H8qS5OIr1sfwRUXjf8TG+yB/x6A5/A0v6/Mn+vyI58hrnpy0A5/ClhQDUXPr5vP/AAIU64GTPgdWg/pTol/08jgHEp/8eFVbX+u4mRXAxPqJI/5dkH4fNS6scWgPQebEPX0pL07ZdRP8X2deg+tO1cg2x6j9/FnA+lOXX+u4R6FI7RchsE4upAcn1SpbaYeZCh64j/kQf51GFDT5BGReOeR/0zpbRA0tucc7YwMem1qSfvWKa0I4FVhEwPGT05/5af8A16RCRYqBwpjY46ZO8U6NRHbxYODgt+PminIv+hJk4xG4I99wzVv4fkJbjreTdeoOv7yYY/AU3TOXiI7WRGPxNSqNl9Fg/ellyce1Jp2VVCOcWhz271n/AF+RXQt3SkQXvPaMH9P8aS5/5CN8eAPsuDT75P8ARb/IHIT37CoJvmvNTOM7YVTH4f8A16T/AK/Ela/16Es/WbnOXhHH4UsPOocekvX/AHhST8NOMYw8I4/CpIhm+JHULKRz/tDmr6/13J6FTVQQL48ZNspzn3NGsE/ZW6j/AEiHofpUt4hmnuY+APsq8+vJqPWTlJfaeLP6VNRrX+u5cen9ditGcvkHn7a4/wDHKsWqgNbdSSIyf++WqtAxDL/19SH/AMc/+tVqxwRDnsIv/QWpx3CWxVUb7bbjorDHT/lsP8an8rFnH2GyQAj/AHwKiiAMO0cZLKf+/wAKsBttoi9cKwH/AH2P8KvW3yJ6iFcXceOSJJj9OBTNPyYyD977Jz+JNBk2Su3OF885/AU+0UK0g/u2iD86yu7lPRF685juxjjMY/LH+NU2OJ9WbJHQcDpgAf0q3eqRDcgE8zJ+RxVVnCnVjkkF8fU8U3v/AF5kR/r8CS5I3XHP/LeJR+lPjdftbc8hJM+x3Uy8+/OOeLqPr/uiq0Df6c5yf+Wo6+4q7a/13F0P/9k=);background-repeat:repeat;}.mxWGoTheme text{stroke-width:0.5px;stroke:#000;}.mxWGoTheme text.mxOnBlack,.mxWGoTheme .mxBlack+text{stroke:#fff;}.mxWGoTheme .mxTitleP{font-weight:bold;}.mxWGoTheme.mxCommentConfig .mxCommentDiv,.mxWGoTheme.mxTreeConfig .mxCommentDiv,.mxWGoTheme.mxTreeConfig .mxTreeDiv{box-sizing:border-box;background:#f5f5f5;border:1px solid #ddd;}.mxWGoTheme.mxCommentConfig .mxCommentDiv,.mxWGoTheme.mxTreeConfig .mxCommentDiv{overflow:auto;}.mxWGoTheme.mxTreeConfig .mxTreeDiv{overflow:hidden;}.mxWGoTheme.mxTreeConfig .mxTreeContentDiv{height:calc(100% - 2em);width:100%;overflow:auto;}.mxWGoTheme.mxCommentConfig .mxCommentCaptionDiv,.mxWGoTheme.mxTreeConfig .mxCommentCaptionDiv,.mxWGoTheme.mxTreeConfig .mxTreeCaptionDiv{box-sizing:border-box;background:#f0f0f0;border-bottom:1px solid #ddd;padding:0 0.25em;font-size:1em;font-weight:bold;height:2em;line-height:calc(2em - 1px);width:100%;background-size:auto 80%;background-repeat:no-repeat;background-position:99% center;}.mxWGoTheme.mxCommentConfig .mxCommentCaptionDiv,.mxWGoTheme.mxTreeConfig .mxCommentCaptionDiv{background-image:url(\"data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1000 1000\' height=\'1000\' width=\'1000\'><path d=\'M811 187H186c-14 0-26.333 5-37 15-10.667 10-16 22-16 36v365c0 14 5.333 26.333 16 37 10.667 10.667 23 16 37 16h625c14 0 26.333-5.333 37-16 10.667-10.667 16-23 16-37V238c0-14-5.333-26-16-36s-23-15-37-15zm0-105c43.333 0 80.333 15.333 111 46s46 67.667 46 111v365c0 43.333-15.333 80.333-46 111s-67.667 46-111 46H395L239 917V761h-53c-43.333 0-80.333-15.333-111-46s-46-67.667-46-111V239c0-43.333 15.333-80.333 46-111s67.667-46 111-46z\'/></svg>\");}.mxWGoTheme.mxTreeConfig .mxTreeCaptionDiv{background-image:url(\"data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' stroke-width=\'60\' stroke=\'rgb(0,0,0)\' viewBox=\'0 0 1000 1000\' height=\'1000\' width=\'1000\'><circle cx=\'500\' cy=\'800\' r=\'90\'/><circle cx=\'800\' cy=\'200\' r=\'90\'/><circle cx=\'200\' cy=\'600\' r=\'90\'/><circle cx=\'800\' cy=\'600\' r=\'90\'/><circle cx=\'500\' cy=\'400\' r=\'90\'/><path d=\'M200,600L800,200\'/><path d=\'M200,600L500,800\'/><path d=\'M500,400L800,600\'/></svg>\");}.mxWGoTheme.mxCommentConfig .mxCommentContentDiv,.mxWGoTheme.mxTreeConfig .mxCommentContentDiv{padding:0.25em;}.mxWGoTheme.mxTreeConfig .mxTreeDiv{margin-top:0.25em;}.mxWGoTheme .mxInnerNotSeenDiv:not(:empty){margin:0.5em auto 0 auto;}.mxWGoTheme .mxInnerNotSeenDiv{margin:0 auto;}.mxWGoTheme .mxNotSeenSvg{width:100%;height:100%;}.mxWGoTheme.mxProblemConfig .mxCommentDiv{margin:0.5em auto 0 auto;text-align:center;min-height:1.5em;line-height:1.5em;}.mxWGoTheme.mxProblemConfig .mxCommentContentDiv{display:inline-block;text-align:justify;}.mxWGoTheme.mxProblemConfig .mxCommentContentDiv p{margin:0;}.mxWGoTheme input[type=text][disabled],.mxWGoTheme button[disabled]{opacity:0.4;}.mxWGoTheme .mxCartoucheDiv{box-sizing:border-box;background:#f0f0f0;position:relative;min-height:2.5em;line-height:2.5em;padding:0 calc(0.75em *5.75) 0 2.5em;border:1px solid #dcdcdc;}.mxWGoTheme .mxCartoucheDiv:nth-of-type(1){border-bottom:0;}.mxWGoTheme .mxCartoucheDiv .mxPlayerStoneDiv{box-sizing:border-box;position:absolute;left:0;top:0;bottom:0;width:2.5em;padding:0.125em;}.mxWGoTheme .mxCartoucheDiv .mxPlayerStoneDiv svg{width:100%;height:100%;}.mxWGoTheme .mxCartoucheDiv .mxPlayerDiv{box-sizing:border-box;font-weight:bold;}.mxWGoTheme .mxCartoucheDiv .mxRankDiv,.mxWGoTheme .mxCartoucheDiv .mxPrisonersDiv{position:absolute;top:0.25em;bottom:0.25em;box-sizing:border-box;font-size:0.75em;line-height:1.125em;min-width:2.5em;max-width:2.5em;display:flex;flex-direction:column;justify-content:center;align-items:center;border:1px solid #e7e7e7;background:#f5f5f5;}.mxWGoTheme .mxCartoucheDiv .mxRankDiv{right:3em;}.mxWGoTheme .mxCartoucheDiv .mxPrisonersDiv{right:0.25em;}.mxWGoTheme .mxCartoucheDiv .mxPrisonersStoneSpan{display:none;}.mxWGoTheme dialog{min-width:min(50vw,19em);color:#fff;background:rgba(0,0,0,0.75);max-width:var(--gobanMaxWidth);}.mxWGoTheme dialog::backdrop{background: rgba(0,0,0,0.5);}.mxWGoTheme dialog label:not([for]){display:block;}.mxWGoTheme dialog .mxMenuFieldset{text-align:center;}.mxWGoTheme dialog .mxMenuFieldset button{color:#fff;background:#000;border:1px solid #fff;;border-radius:0.25em;font-size:1em;margin:0.5em 0.25em;height:2em;}.mxWGoTheme dialog a{color:#fff;}.mxWGoTheme .mxNumFromTextSpan,.mxWGoTheme .mxNumWithTextSpan{position:relative;left:2em;white-space:nowrap;}.mxWGoTheme .mxNumFromTextSpan:before{content:\"\\a\";white-space:pre-line;}.mxWGoTheme input:not(:checked)~.mxNumFromTextSpan,.mxWGoTheme input:not(:checked)~.mxNumWithTextSpan{display:none;}.mxWGoTheme .mxNavigationParentDiv,.mxWGoTheme .mxSolveDiv{box-sizing:border-box;display:flex;justify-content:space-between;align-items:stretch;margin:0.25em 0;gap:0.5em;}.mxWGoTheme .mxNavigationParentDiv{justify-content:space-between;}.mxWGoTheme .mxSolveDiv{justify-content:center;}.mxWGoTheme .mxNavigationDiv,.mxWGoTheme .mxAboutDiv,.mxWGoTheme .mxHeaderDiv,.mxWGoTheme .mxOptionsDiv{box-sizing:border-box;display:flex;justify-content:space-between;}.mxWGoTheme .mxNavigationDiv{flex:7;gap:calc(1em / 6);align-items:center;}.mxWGoTheme .mxAboutDiv,.mxWGoTheme .mxHeaderDiv,.mxWGoTheme .mxOptionsDiv{flex:1;align-items:center;}.mxWGoTheme .mxNavigationParentDiv button,.mxWGoTheme .mxSolveDiv button{flex:1;aspect-ratio:1 / 1;box-sizing:border-box;font-size:1em;color:#000;background:linear-gradient(to top,#ddd,#fff);box-shadow:none;border-top:1px solid #cecece;border-left:1px solid #d3d3d3;border-right:1px solid #d3d3d3;border-bottom:1px solid #dedede;border-radius:2px;padding:0;}.mxWGoTheme .mxSolveDiv button{max-width:3em;}.mxWGoTheme .mxNavigationDiv button,.mxWGoTheme .mxSolveDiv button{display:flex;justify-content:space-between;align-items:stretch;}.mxWGoTheme .mxNavigationDiv button svg,.mxWGoTheme .mxSolveDiv button svg{width:100%;height:100%;}.mxWGoTheme .mxNavigationDiv button svg{fill:none;background-size:90%;background-position:center;background-repeat:no-repeat;}.mxWGoTheme .mxNavigationDiv .mxFirstBtn svg,.mxWGoTheme .mxNavigationDiv .mxTenPredBtn svg,.mxWGoTheme .mxNavigationDiv .mxPredBtn svg{transform:scaleX(-1);}.mxWGoTheme .mxNavigationDiv .mxPredBtn svg,.mxWGoTheme .mxNavigationDiv .mxNextBtn svg{background-image:url(\"data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' fill=\'%23000\' viewBox=\'0 0 1000 1000\' height=\'1000\' width=\'1000\'><path d=\'M786,523C804,506 803,485 786,473L358,207C323,184 300,211 300,241V755C299,794 331,806 358,789Z\'/></svg>\");}.mxWGoTheme .mxNavigationDiv .mxTenPredBtn svg,.mxWGoTheme .mxNavigationDiv .mxTenNextBtn svg{background-image:url(\"data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' fill=\'%23000\' viewBox=\'0 0 1000 1000\' height=\'1000\' width=\'1000\'><path d=\'M976,521C994,506 994,485 976,475L604,227C572,206 552,229 552,257V739C551,775 580,783 604,769ZM522,521C540,506 540,485 522,475L162,227C131,206 110,230 110,257V739C109,774 138,784 162,769Z\'/></svg>\");}.mxWGoTheme .mxNavigationDiv .mxFirstBtn svg,.mxWGoTheme .mxNavigationDiv .mxLastBtn svg{background-image:url(\"data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' fill=\'%23000\' viewBox=\'0 0 1000 1000\' height=\'1000\' width=\'1000\'><path d=\'M612,521C631,505 629,487 612,475L250,247C219,227 200,250 200,277V719C199,754 226,763 250,749ZM726,789C775,789 800,769 800,731V265C800,226 775,207 726,207 675,207 650,226 650,265V731C650,769 675,789 726,789Z\'/></svg>\");}.mxWGoTheme .mxAboutDiv .mxAboutBtn span,.mxWGoTheme .mxHeaderDiv .mxHeaderBtn span,.mxWGoTheme .mxOptionsDiv .mxOptionsBtn span{color:transparent;display:block;width:100%;height:100%;}.mxWGoTheme .mxAboutDiv .mxAboutBtn span{background-image:url(\"data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1000 1000\' height=\'100%\' width=\'100%\'><path d=\'M 575,771 575,664 Q 575,656 570,651 565,646 557,646 L 450,646 Q 442,646 437,651 432,656 432,664 L 432,771 Q 432,779 437,784 442,789 450,789 L 557,789 Q 565,789 570,784 575,779 575,771 Z M 718,396 Q 718,347 687,305 656,263 610,240 564,217 515,217 379,217 308,336 300,349 312,359 L 386,415 Q 390,418 397,418 406,418 411,411 441,373 459,360 478,347 507,347 534,347 555,362 576,377 576,395 576,416 565,429 554,442 527,454 492,470 463,502 434,534 434,572 L 434,592 Q 434,600 439,605 444,610 452,610 L 559,610 Q 567,610 572,605 577,600 577,592 577,581 589,564 601,547 619,536 637,526 646,520 655,514 672,500 689,486 697,473 705,460 713,439 721,418 720,394 Z M 932,503 Q 932,620 875,718 818,816 719,874 620,932 504,931 388,930 289,874 190,818 133,718 76,618 76,503 76,388 133,288 190,188 289,132 388,76 504,75 620,74 719,132 818,190 875,288 932,386 932,503 Z\'/></svg>\");}.mxWGoTheme .mxHeaderDiv .mxHeaderBtn span{background-image:url(\"data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1000 1000\' height=\'100%\' width=\'100%\'><path d=\'M 687,785 687,856 Q 687,871 676,881 665,891 651,892 L 365,892 Q 350,892 340,881 330,870 329,856 L 329,785 Q 329,770 340,760 351,750 365,749 L 401,749 401,535 365,535 Q 350,535 340,524 330,513 329,499 L 329,428 Q 329,413 340,403 351,393 365,392 L 579,392 Q 594,392 604,403 614,414 615,428 L 615,749 651,749 Q 666,749 676,760 686,771 687,785 Z M 616,142 616,249 Q 616,264 605,274 594,284 580,285 L 437,285 Q 422,285 412,274 402,263 401,249 L 401,142 Q 401,127 412,117 423,107 437,106 L 580,106 Q 595,106 605,117 615,128 616,142 Z\'/></svg>\");}.mxWGoTheme .mxOptionsDiv .mxOptionsBtn span{background-image:url(\"data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1000 1000\' height=\'100%\' width=\'100%\'><path d=\'M 800,550 Q 822,550 836,535 850,520 850,500 850,480 835,465 820,450 800,450 L 200,450 Q 180,450 165,465 150,480 150,500 150,520 164,535 178,550 200,550 L 800,550 Z M 200,650 Q 180,650 165,665 150,680 150,700 150,720 164,735 178,750 200,750 L 800,750 Q 822,750 836,735 850,720 850,700 850,680 835,665 820,650 800,650 L 200,650 Z M 800,350 Q 822,350 836,335 850,320 850,300 850,280 835,265 820,250 800,250 L 200,250 Q 180,250 165,265 150,280 150,300 150,320 164,335 178,350 200,350 L 800,350 Z\'/></svg>\");}.mxWGoTheme .mxNavigationDiv input.mxGotoInput{box-sizing:border-box;display:block;font-family:Arial,sans-serif;font-size:1em;flex:0;width:2em;height:2em;text-align:center;margin:0;padding:0;color:#000;border:1px solid #d3d3d3;border-radius:2px;background:transparent;align-self:center;}.mxWGoTheme.mxIndicesOn .mxNavigationDiv input.mxGotoInput{width:2.3125em;}@media screen and (max-width:50em){.mxWGoTheme{--labelSize:0.75;}.mxWGoTheme.mxCommentConfig .mxCommentParentDiv,.mxWGoTheme.mxTreeConfig .mxCommentParentDiv{position:relative;}.mxWGoTheme.mxTreeConfig .mxTreeContentDiv{height:100%;}.mxWGoTheme.mxTreeConfig .mxTreeCaptionDiv{margin-top:0;}.mxWGoTheme.mxTreeConfig .mxTreeDiv{margin-top:0.25em;}.mxWGoTheme.mxCommentConfig .mxCommentContentDiv,.mxWGoTheme.mxTreeConfig .mxCommentContentDiv,.mxWGoTheme.mxTreeConfig .mxTreeContentDiv{left:calc(2em * var(--labelSize));}.mxWGoTheme.mxCommentConfig .mxCommentDiv,.mxWGoTheme.mxTreeConfig .mxCommentDiv,.mxWGoTheme.mxTreeConfig .mxTreeDiv{max-height:8em;}.mxWGoTheme.mxCommentConfig .mxCommentCaptionDiv,.mxWGoTheme.mxTreeConfig .mxCommentCaptionDiv,.mxWGoTheme.mxTreeConfig .mxTreeCaptionDiv{position:absolute;transform:rotate(-90deg);transform-origin:top left;font-size:calc(1em * var(--labelSize));width:calc(8em / var(--labelSize));height:2em;line-height:2em;z-index:1;border-bottom:1px solid #ddd;}.mxWGoTheme.mxCommentConfig .mxCommentCaptionDiv,.mxWGoTheme.mxTreeConfig .mxCommentCaptionDiv,.mxWGoTheme.mxTreeConfig .mxTreeCaptionDiv{top:calc(8.125em / var(--labelSize) - 2px);}}.mxWGoTheme *:not([type=radio]):not([type=checkbox]):focus{outline:none;}.mxWGoTheme .mxGobanSvg:not(:focus-visible) .mxFocus{display:none;}.mxWGoTheme.mxCommentConfig .mxCommentDiv:focus,.mxWGoTheme.mxTreeConfig .mxCommentDiv:focus,.mxWGoTheme.mxTreeConfig .mxTreeDiv:focus{background:#fafafa;}.mxWGoTheme .mxNavigationParentDiv button:not([disabled]):focus,.mxWGoTheme .mxSolveDiv button:not([disabled]):focus,.mxWGoTheme .mxNavigationDiv input[type=text]:not([disabled]):focus{outline:1px dotted #000;}.mxWGoTheme dialog .mxMenuFieldset button:focus,.mxWGoTheme dialog .mxMenuFieldset button:hover{color:#f00;border:1px solid #f00;}.mxWGoTheme dialog a:focus,.mxWGoTheme dialog a:hover{color:#f00;}.mxWGoTheme .mxNavigationParentDiv button:not([disabled]):hover,.mxWGoTheme .mxSolveDiv button:not([disabled]):hover,.mxWGoTheme .mxNavigationDiv input[type=text]:not([disabled]):hover{background-color:rgba(255,255,255,0.45);border:1px solid rgba(100,100,100,0.3);box-shadow:0 0 20px 0 rgba(150,150,150,0.5);}.mxWGoTheme .mxNavigationDiv button.mxGotoInput:focus{border:1px solid #000;}.mxWGoTheme button,.mxWGoTheme:not(.mxDiagramConfig) .mxGobanDiv svg,.mxWGoTheme .mxTreeDiv svg circle,.mxWGoTheme .mxTreeDiv svg polygon,.mxWGoTheme .mxTreeDiv svg rect,.mxWGoTheme .mxTreeDiv svg text{cursor:pointer;}";
mxG.D[mxG.K].a.in3dOn=1;
mxG.D[mxG.K].a.allowStringAsSource=1;
mxG.D[mxG.K].a.allowFileAsSource=1;
mxG.D[mxG.K].a.initMethod="last";
mxG.D[mxG.K].a.pointsNumMax=19;
mxG.D[mxG.K].a.stoneShadowOn=1;
mxG.D[mxG.K].a.specialStoneOn=1;
mxG.D[mxG.K].a.stretching="0,0,1,1";
mxG.D[mxG.K].a.gridPadding=2;
mxG.D[mxG.K].a.gridMargin=0;
mxG.D[mxG.K].a.gobanPadding=0;
mxG.D[mxG.K].a.gobanMargin=2;
mxG.D[mxG.K].a.indicesOn=0;
mxG.D[mxG.K].a.numberingOn=0;
mxG.D[mxG.K].a.asInBookOn=0;
mxG.D[mxG.K].a.marksAndLabelsOn=0;
mxG.D[mxG.K].a.markOnLastOn=1;
mxG.D[mxG.K].a.numAsMarkOnLastOn=0;
mxG.D[mxG.K].a.japaneseIndicesOn=0;
mxG.D[mxG.K].a.oldJapaneseIndicesOn=0;
mxG.D[mxG.K].a.eraseGridUnder=1;
mxG.D[mxG.K].a.aboutBtnOn=1;
mxG.D[mxG.K].a.aboutAlias="About_wgo";
mxG.en("About_wgo","<span aria-hidden='true'>?</span>");
mxG.D[mxG.K].a.aboutThemeAlias="Theme_WGo";
mxG.en("Theme_WGo","WGo (<a href=\"http://wgo.waltheri.net/\">WGo.js</a> copyright Jan Prokop)");
mxG.D[mxG.K].a.cartoucheBoxOn=1;
mxG.D[mxG.K].a.gotoBoxOn=0;
mxG.D[mxG.K].a.headerBoxOn=0;
mxG.D[mxG.K].a.headerBtnOn=1;
mxG.D[mxG.K].a.hideInHeader="NumOfMoves,Place,Rules,TimeLimits";
mxG.D[mxG.K].a.headerAlias="Header_wgo";
mxG.en("Header_wgo","<span aria-hidden='true'>I</span>");
mxG.D[mxG.K].a.navigations="First,TenPred,Pred,Goto,Next,TenNext,Last";
mxG.D[mxG.K].a.variationMarksOn=1;
mxG.D[mxG.K].a.siblingsOn=0;
mxG.D[mxG.K].a.hideSingleVariationMarkOn=1;
mxG.D[mxG.K].a.variationBoxOn=0;
mxG.D[mxG.K].a.canPlaceVariation=1;
mxG.D[mxG.K].start();
