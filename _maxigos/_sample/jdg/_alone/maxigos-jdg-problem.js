// maxiGos v8 Jdg+Problem copyright 1998-2024 FM&SH, BSD license
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
if(!mxG.G.prototype.createComment)
{
mxG.fr("Comments","Commentaire");
mxG.fr("buildMove",function(k){return "Coup "+k;});
mxG.en("buildMove",function(k){return "Move "+k;});
mxG.G.prototype.getOneComment=function(aN)
{
	let c;
	if(this.hasC("Score")&&this.scoreInComment&&this.canPlaceScore) c=this.buildScore();
	else
	{
		c=aN.P.C?aN.P.C[0].noT():"";
		if(c) c="<p>"+c+"</p>";
		if(this.hasC("Header")&&this.headerInComment&&(aN.Dad==this.rN))
			c=this.buildHeader()+c;
	}
	return c.replace(/\n/g,"<br>");
};
mxG.G.prototype.getComment=function()
{
	let aN=this.cN;
	if(this.allInComment)
	{
		let bN=this.rN,s="",c,k=0;
		while(bN=this.kidOnFocus(bN))
		{
			if(bN.P.B||bN.P.W) {k++;if((bN.P.B&&bN.Dad.P.B)||(bN.P.W&&bN.Dad.P.W)) k++;}
			else if(bN.P.AB||bN.P.AW||bN.P.AE) k=0;
			if(c=this.getOneComment(bN))
			{
				if(k) s+="<span class=\"mxMoveNumberSpan\">"+this.build("Move",k)+" </span>";
				s+=c;
			}
			if(bN==aN) break;
		}
		return s;
	}
	else return this.getOneComment(aN);
};
mxG.G.prototype.updateComment=function()
{
	let e=this.getE("CommentDiv");
	if(this.hasC("Solve")&&this.canPlaceSolve) return;
	if(this.cN.P.BM) e.className="mxCommentDiv mxBM";
	else if(this.cN.P.DO) e.className="mxCommentDiv mxDO";
	else if(this.cN.P.IT) e.className="mxCommentDiv mxIT";
	else if(this.cN.P.TE) e.className="mxCommentDiv mxTE";
	else e.className="mxCommentDiv";
	this.getE("CommentContentDiv").innerHTML=this.getComment();
};
mxG.G.prototype.createComment=function()
{
	let s="",a="";
	this.headerInComment=this.setA("headerInComment",0,"bool");
	this.canCommentFocus=this.setA("canCommentFocus",0,"bool");
	this.commentCaptionOn=this.setA("commentCaptionOn",0,"bool");
	this.allInComment=this.setA("allInComment",0,"bool");
	a=this.canCommentFocus?" tabindex=\"0\"":"";
	s+="<div class=\"mxCommentDiv\" id=\""+this.n+"CommentDiv\""+a+">";
	if(this.commentCaptionOn)
	{
		s+="<div class=\"mxCommentCaptionDiv\" id=\""+this.n+"CommentCaptionDiv\">";
		s+=this.local("Comments");
		s+="</div>";
	}
	s+="<div class=\"mxCommentContentDiv\" id=\""+this.n+"CommentContentDiv\">";
	s+="</div>";
	s+="</div>";
	return s;
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
if(!mxG.G.prototype.createSolve)
{
mxG.fr("Retry","Recommencer tout");
mxG.fr("Undo","Reprendre un coup");
mxG.fr("Hint","Montrer la suite");
mxG.fr("_initialMessage_","À Noir de jouer !");
mxG.fr("_nowhereMessage_","Hum !");
mxG.fr("_successMessage_","Bravo !");
mxG.fr("_failMessage_","Raté !");
mxG.fr("_forbiddenMessage_","Interdit !");
mxG.fr("_offpathMessage_","Non prévu !");
mxG.fr("_endMessage_","Terminé !");
mxG.en("_initialMessage_","Black to play!");
mxG.en("_nowhereMessage_","Hum!");
mxG.en("_successMessage_","Success!");
mxG.en("_failMessage_","Fail!");
mxG.en("_forbiddenMessage_","Forbidden!");
mxG.en("_offpathMessage_","Off path!");
mxG.en("_endMessage_","End!");
mxG.S.prototype.makeRetryBtn=function()
{
	let s="<path d=\"M0 64L64 64L32 92L0 64ZM24 65A50 50 0 1 1 49 107L57 94A34 34 0 1 0 40 65Z\"/>";
	return this.makeBtnIcon(s,"Retry");
};
mxG.S.prototype.makeUndoBtn=function()
{
	let s="<path d=\"M20,105H108C114.6,105 120,99 120,93V44C120,37 114,32 108,32H40V8L8,40 40,72V48H96C100,48 104,51 104,56V81C104,85 100,89 96,89H20 Z\"/>";
	return this.makeBtnIcon(s,"Undo");
};
mxG.S.prototype.makeHintBtn=function()
{
	let s="<rect x=\"54\" y=\"10\" width=\"20\" height=\"64\" rx=\"5\" ry=\"5\"/>";
	s+="<circle cx=\"64\" cy=\"104\" r=\"14\"/>";
	return this.makeBtnIcon(s,"Hint");
};
mxG.S.prototype.makePassBtn=function()
{
	let s="<path fill-rule=\"evenodd\" d=\"M64,10L118,64L64,118L10,64ZM64,35L93,64L64,93L35,64Z\"/>";
	return this.makeBtnIcon(s,"Pass");
};
mxG.G.prototype.setSFocus=function(b)
{
	let a,e,g;
	a=document.activeElement;
	if(this.getE("GobanSvg")==a) return;
	e=this.getE(b+"Btn");
	if(e&&!e.disabled) {if(a!=e) e.focus();return;}
	this.getE("SolveDiv").focus();
};
mxG.G.prototype.hasMessage=function(s)
{
	if(mxG.Z[this.lang])
		return mxG.Z[this.lang]["_"+s+"Message_"];
	return "";
};
mxG.G.prototype.doUndo=function()
{
	let aN=this.cN;
	if((aN.Dad==this.rN)||(!aN.P["B"]&&!aN.P["W"])) {this.doRetry();return;}
	aN=aN.Dad;
	if(this.cN.P[this.oC]&&!this.cN.Add)
	{
		if(aN.P[this.uC]) {aN=aN.Dad;}
	}
	this.backNode(aN);
	this.updateAll();
	this.setSFocus("Undo");
};
mxG.G.prototype.doRetry=function()
{
	this.backNode(this.kidOnFocus(this.rN));
	this.updateAll();
	this.setSFocus("Retry");
};
mxG.G.prototype.doHint=function()
{
	if(this.cN.Kid.length)
	{
		if(!this.uC) this.setPl();
		if(this.cN.Kid[0].P[this.uC])
		{
			let s=this.cN.Kid[0].P[this.uC][0];
			if(s.length==2)
			{
				x=s.c2n(0);
				y=s.c2n(1);
				if((this.DX<=19)&&(this.DY<=19)&&(x==20)&&(y==20)) {x=0;y=0;}
			}
			else {x=0;y=0;}
		}
		else {x=0;y=0;}
		this.checkSolve(x,y);
		this.setSFocus("Hint");
	}
};
mxG.G.prototype.addExtraPlay=function(nat,x,y,tenuki)
{
	let aN,v=this.xy2s(x,y),bN=this.kidOnFocus(this.cN),cN;
	if(bN)
	{
		this.zN=bN.clone(null);
	}
	if(tenuki||!bN)
	{
		aN=new mxG.N(this.cN,nat,v);
		this.cN.Focus=this.cN.Kid.length;
		if(!bN) aN.Add=1;
	}
	else
	{
		aN=this.cN;
		this.zN.P[nat]=[v];
	}
	if(bN)
	{
		this.zN.Dad=aN;
		aN.Kid[aN.Kid.length]=this.zN;
		aN.Focus=aN.Kid.length;
	}
	this.placeNode();
	if(this.hasC("Tree")) this.hasToSetTree=1;
};
mxG.G.prototype.updateVirtualComment=function(s)
{
	let c,span=s.ucF()+"Span";
	c="<p><span class=\"mx"+span+"\" id=\""+this.n+span+"\">"+this.local("_"+s+"Message_")+"</span></p>";
	if(this.hasC("Comment")) this.getE("CommentContentDiv").innerHTML=c;
};
mxG.G.prototype.updateSolveComment=function()
{
	let c,s,e;
	if(!this.hasC("Comment")) return;
	e=this.getE("CommentDiv");
	if(this.cN.P.BM) e.className="mxCommentDiv mxBM";
	else if(this.cN.P.DO) e.className="mxCommentDiv mxDO";
	else if(this.cN.P.IT) e.className="mxCommentDiv mxIT";
	else if(this.cN.P.TE) e.className="mxCommentDiv mxTE";
	else e.className="mxCommentDiv";
	c=this.getOneComment(this.cN);
	if(c) this.getE("CommentContentDiv").innerHTML=c;
	else
	{
		this.getE("CommentContentDiv").innerHTML="";
		if((this.cN.Dad==this.rN)&&this.hasMessage("initial"))
			this.updateVirtualComment("initial");
		else if(this.cN.Add&&this.hasMessage("offpath"))
			this.updateVirtualComment("offpath");
		else if(!this.cN.Focus)
		{
			s="";
			if(this.cN.P[this.uC]&&this.hasMessage("success")) s="success";
			else if(this.cN.P[this.oC]&&this.hasMessage("fail")) s="fail";
			if(s) this.updateVirtualComment(s);
		}
	} 
};
mxG.G.prototype.doVirtualNext=function()
{
	if(this.cN.Kid.length&&!this.kidOnFocus(this.cN).P[this.uC])
	{
		this.placeNode();
		this.updateAll();
		this.moveFocusMarkOnLast();
		this.whenVirtualNext=null;
	}
};
mxG.G.prototype.doSolve=function(a,b)
{
	let x,y,s,aN=this.cN,bN,k=0,km=aN.Kid.length,kz=-1,nat,tenuki=0;
	if(km) do
	{
		bN=aN.Kid[k];
		x=-9;
		y=-9;
		if(bN)
		{
			if(bN.P[this.uC]||(bN.P[this.oC]&&aN.Add))
			{
				s=bN.P[bN.P[this.uC]?this.uC:this.oC][0];
				if(s.length==2)
				{
					x=s.c2n(0);
					y=s.c2n(1);
					if((this.DX<=19)&&(this.DY<=19)&&(x==20)&&(y==20)) {x=0;y=0;}
				}
				else {x=0;y=0;}
			}
			else if((bN.P[this.oC]&&!aN.Add)&&(kz<0))
			{
				tenuki=1;
				kz=k;
			}
		}
		if((x==a)&&(y==b))
		{
			aN.Focus=k+1;
			this.placeNode();
			if(this.cN.Kid.length&&!this.kidOnFocus(this.cN).Add)
			{
				this.noLabelledBy=1;
				this.updateAll();
				this.noLabelledBy=0;
				this.whenVirtualNext={x:a,y:b};
				if(this.animatedStoneOn) this.doVirtualNext();
				else
				{
					let z=this.k;
					setTimeout(function(){mxG.D[z].doVirtualNext();},200);
				}
			}
			else this.updateAll();
			return;
		}
		else if(this.specialMoveMatch&&(kz<0))
		{
			switch(this.specialMoveMatch)
			{
				case 1: if(x&&y&&!this.gor.inGoban(x,y)) kz=k;
						break;
				case 2: if(x&&y&&!this.inView(x,y)) kz=k;
						break;
				case 3: if(!this.inView(x,y)) kz=k;
						break;
			}
		}
		k++;
	}
	while(k<km);
	nat=this.cN.P[this.uC]?this.oC:this.uC;
	if(this.gor.isValid(nat,a,b))
	{
		kz++;
		if(kz||this.canPlaceExtra)
		{
			aN.Focus=kz;
			this.addExtraPlay(nat,a,b,tenuki);
			if(kz && this.cN.Focus)
			{
				this.noLabelledBy=1;
				this.updateAll();
				this.noLabelledBy=0;
				this.whenVirtualNext={x:a,y:b};
				if(this.animatedStoneOn) this.doVirtualNext();
				else
				{
					let z=this.k;
					setTimeout(function(){mxG.D[z].doVirtualNext();},200);
				}
			}
			else this.updateAll();
			return;
		}
		else if(this.hasMessage("nowhere")) this.updateVirtualComment("nowhere");
	}
	else if(this.hasMessage("forbidden")) this.updateVirtualComment("forbidden");
	this.plonk();
};
mxG.G.prototype.checkSolve=function(x,y)
{
	let aN=this.cN,bN,k,km=aN.Kid.length;
	if(!this.uC) this.setPl();
	if(km)
	{
		for(k=0;k<km;k++)
		{
			bN=aN.Kid[k];
			if(bN.P[this.uC]||bN.P[this.oC]) {this.doSolve(x,y);return;}
		}
		this.placeNode();
		this.updateAll();
	}
	else
	{
		if(this.canPlaceExtra) this.doSolve(x,y);
		else
		{
			if(this.hasMessage("end")) this.updateVirtualComment("end");
			this.plonk();
		}
	}
};
mxG.G.prototype.doKeydownSolve=function(ev)
{
	let r=0;
	if(ev.shiftKey) switch(ev.key)
	{
		case "Home":case "F":case "G":
			if(this.cN.Dad!=this.rN) {this.doRetry();r=1;} break;
		case "ArrowLeft":case "H":
			if(this.cN.Dad!=this.rN) {this.doUndo();r=1;} break;
	}
	if(r)
	{
		this.moveFocusMarkOnLast();
		ev.preventDefault();
	}
};
mxG.G.prototype.updateSolve=function()
{
	if(this.cN.Dad==this.rN)
	{
		this.disableBtn("Retry");
		this.disableBtn("Undo");
	}
	else
	{
		this.enableBtn("Retry");
		this.enableBtn("Undo");
	}
	if(this.cN.Kid.length) this.enableBtn("Hint");
	else this.disableBtn("Hint");
	this.updateSolveComment();
};
mxG.G.prototype.initSolve=function()
{
	let e,k=this.k,b,bm,bk;
	e=this.getE("SolveDiv");
	e.addEventListener("keydown",function(ev){mxG.D[k].doKeydownSolve(ev);});
	b=this.solves;
	bm=b.length;
	for(bk=0;bk<bm;bk++)
	{
		if(b[bk]=="Retry")
		{
			if(this.oldSolveBtnOn)
				this.addBtn(e,{n:"Retry",v:this.scr.makeFirstBtn(),t:this.local("Retry")});
			else
				this.addBtn(e,{n:"Retry",v:this.scr.makeRetryBtn(),t:this.local("Retry")});
		}
		else if(b[bk]=="Undo")
		{
			if(this.oldSolveBtnOn)
				this.addBtn(e,{n:"Undo",v:this.scr.makePredBtn(),t:this.local("Undo")});
			else
				this.addBtn(e,{n:"Undo",v:this.scr.makeUndoBtn(),t:this.local("Undo")});
		}
		else if(b[bk]=="Hint")
		{
			if(this.oldSolveBtnOn)
				this.addBtn(e,{n:"Hint",v:this.scr.makeNextBtn(),t:this.local("Hint")});
			else
				this.addBtn(e,{n:"Hint",v:this.scr.makeHintBtn(),t:this.local("Hint")});
		}
		else if((b[bk]=="Pass")&&this.hasC("Pass"))
			this.addBtn(e,{n:"Pass",v:this.scr.makePassBtn(),t:this.local("Pass")});
	}
};
mxG.G.prototype.createSolve=function()
{
	let s="",a=["Retry","Undo"];
	this.canPlaceSolve=this.setA("canPlaceSolve",0,"bool");
	this.oldSolveBtnOn=this.setA("oldSolveBtnOn",0,"bool");
	this.solves=this.setA("solves",a,"list");
	this.specialMoveMatch=this.setA("specialMoveMatch",0,"int");
	s+="<div class=\"mxSolveDiv\" id=\""+this.n+"SolveDiv\"";
	s+=" tabindex=\"-1\"";
	s+="></div>";
	return s;
};
}
if(!mxG.G.prototype.createPass)
{
mxG.fr("Pass","Passe");
mxG.G.prototype.doPass=function()
{
	if(this.hasC("Edit")) this.checkEditPlay(0,0);
	else if(this.hasC("Solve")&&this.canPlaceSolve) this.checkSolve(0,0);
	else if(this.hasC("Variation")&&this.canPlaceVariation) this.checkVariation(0,0);
	else if(this.hasC("Guess")) this.checkGuess(0,0);
};
mxG.G.prototype.isPass=function(aN)
{
	let s,x,y;
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
	let aN=0,k,km,status,look=0,s,e=this.getE("PassBtn");
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
	if(this.canPassOnlyIfPassInSgf)
	{
		if(status&2) this.enableBtn("Pass");
		else this.disableBtn("Pass");
	}
	else this.enableBtn("Pass");
};
mxG.G.prototype.initPass=function()
{
	if(this.passBtnOn)
	{
		let o={n:"Pass",v:this.alias("Pass","passAlias")},
			s=this.local("Pass");
		if(o.v!=s) o.t=s;
		this.addBtn(this.getE("PassDiv"),o);
	}
};
mxG.G.prototype.createPass=function()
{
	this.passBtnOn=this.setA("passBtnOn",0,"bool");
	this.passAlias=this.setA("passAlias",null,"string");
	this.canPassOnlyIfPassInSgf=this.setA("canPassOnlyIfPassInSgf",0,"bool");
	return this.passBtnOn?this.createBtnBox("Pass"):"";
};
}
if(!mxG.G.prototype.createVersion)
{
mxG.G.prototype.createVersion=function()
{
	this.versionBoxOn=this.setA("versionBoxOn",0,"bool");
	if(this.versionBoxOn)
		return "<div class=\"mxVersionDiv\" id=\""+this.n+"VersionDiv\">maxiGos "+mxG.V+"</div>";
	return "";
};
}
mxG.K++;
mxG.B=[[["Goban"],"Solve","Pass"],["Comment","Version"]];
mxG.D[mxG.K]=new mxG.G(mxG.K,mxG.B);
mxG.D[mxG.K].theme="Jdg";
mxG.D[mxG.K].config="Problem";
mxG.D[mxG.K].style=".mxJdgTheme{--gobanMaxWidth:calc(1em * 491 / 16);--gobanMinWidth:6em;--fontFamily:\"Avenir Next\",\"Segoe UI\",Arial,sans-serif;--fontWeight:500;--gobanBk:#ecbe69;--bk:#eee;--color:#444;--focusBk:#ddd;--focusColor:#f00;text-align:left;}.mxJdgTheme.mxIndicesOff{--gobanMaxWidth:calc(1em * 445 / 16);}.mxJdgTheme button{-webkit-appearance:none;-moz-appearance:none;}.mxJdgTheme button{cursor:pointer;}.mxJdgTheme button[disabled]{cursor:default;opacity:0.5;}.mxJdgTheme svg{display:block;width:100%;height:100%;}.mxJdgTheme p:first-of-type{margin-top:0;}.mxJdgTheme p:last-of-type{margin-bottom:0;}.mxJdgTheme,.mxJdgTheme button{font-family:var(--fontFamily);}.mxJdgTheme svg{font-family:var(--fontFamily);font-weight:var(--fontWeight);}.mxJdgTheme{max-width:var(--gobanMaxWidth);min-width:var(--gobanMinWidth);margin:0 auto;}.mxJdgTheme.mxCommentConfig,.mxJdgTheme.mxProblemConfig,.mxJdgTheme.mxTreeConfig{display:flex;flex-wrap:wrap;justify-content:center;align-items:stretch;gap:0.25em;max-width:calc(var(--gobanMaxWidth) * 2 + 0.25em);}.mxJdgTheme>*{max-width:var(--gobanMaxWidth);}.mxJdgTheme.mxCommentConfig>div,.mxJdgTheme.mxProblemConfig>div,.mxJdgTheme.mxTreeConfig>div{box-sizing:border-box;flex:1 1 var(--gobanMaxWidth);display:flex;flex-direction:column;}.mxJdgTheme.mxCommentConfig .mxGobanGrandParentDiv,.mxJdgTheme.mxProblemConfig .mxGobanGrandParentDiv,.mxJdgTheme.mxTreeConfig .mxGobanGrandParentDiv,.mxJdgTheme.mxCommentConfig .mxCommentParentDiv,.mxJdgTheme.mxProblemConfig .mxCommentParentDiv,.mxJdgTheme.mxTreeConfig .mxCommentParentDiv{display:flex;flex-direction:column;justify-content:space-between;}.mxJdgTheme.mxCommentConfig .mxGobanParentDiv,.mxJdgTheme.mxProblemConfig .mxGobanParentDiv,.mxJdgTheme.mxTreeConfig .mxGobanParentDiv{flex:1;display:flex;flex-direction:column;}.mxJdgTheme.mxCommentConfig .mxGobanDiv,.mxJdgTheme.mxProblemConfig .mxGobanDiv,.mxJdgTheme.mxTreeConfig .mxGobanDiv{margin:auto;width:100%;}.mxJdgTheme .mxCommentDiv,.mxJdgTheme .mxTreeDiv{box-sizing:border-box;min-height:2em;height:8em;overflow:auto;flex:auto;min-width:min(100%,99vw);max-width:1px;}.mxJdgTheme .mxVersionDiv{text-align:center;height:3em;line-height:3em;}.mxJdgTheme{color:var(--color);}.mxJdgTheme .mxInnerGobanDiv{margin:0 auto;}.mxJdgTheme .mxGobanDiv svg{background:url(\"data:image/jpeg;base64,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\");background-size:100% 100%;background-repeat:no-repeat;}.mxJdgTheme .mxBlackRadialGradient stop:nth-of-type(1){stop-color:#666;}.mxJdgTheme .mxBlackRadialGradient stop:nth-of-type(2){stop-color:#222;}.mxJdgTheme .mxBlackRadialGradient stop:nth-of-type(3){stop-color:#000;}.mxJdgTheme .mxWhiteRadialGradient stop:nth-of-type(1){stop-color:#fff;}.mxJdgTheme .mxWhiteRadialGradient stop:nth-of-type(2){stop-color:#ddd;}.mxJdgTheme .mxWhiteRadialGradient stop:nth-of-type(3){stop-color:#999;}.mxJdgTheme.mxIn2d .mxBlack,.mxJdgTheme.mxIn2d .mxWhite{stroke:rgba(0,0,0,1);}.mxJdgTheme text{stroke-width:0.25px;stroke:#000;}.mxJdgTheme text.mxOnBlack,.mxJdgTheme .mxBlack+text{stroke:#fff;}.mxJdgTheme .mxGobanDiv .mxVariation.mxOnFocus.mxMark:not(.mxPointBackground){fill:none;stroke:#f00;}.mxJdgTheme .mxGobanDiv .mxVariation.mxOnFocus:not(.mxMark):not(.mxPointBackground){fill:#f00;stroke:#f00;}.mxJdgTheme .mxPointBackground{fill:none;stroke:none;}.mxJdgTheme .mxMarkOnLast{fill:#f00;stroke:#f00;}.mxJdgTheme .mxFocusMark{fill:none;stroke:#f00;stroke-width:1px;}.mxJdgTheme .mxTitleP{font-weight:bold;}.mxJdgTheme.mxProblemConfig .mxCommentContentDiv{margin:auto;}.mxJdgTheme .mxCommentDiv,.mxJdgTheme .mxTreeDiv{overflow:auto;}.mxJdgTheme .mxCommentDiv{padding:0.5em;background:var(--bk);}.mxJdgTheme.mxProblemConfig .mxCommentDiv{height:unset;display:flex;line-height:1.5em;min-height:2.5em;}.mxJdgTheme .mxTreeDiv{background:var(--bk);margin-top:0.25em;}.mxJdgTheme .mxTreeDiv svg{width:unset;height:unset;}.mxJdgTheme.mxTreeConfig .mxTreeDiv svg .mxFocus{fill:#f00;opacity:1;}.mxJdgTheme .mxInnerNotSeenDiv:not(:empty){margin:0.5em auto 0 auto;}.mxJdgTheme.mxGameConfig .mxHeaderDiv{padding:0.5em;background:var(--bk);}.mxJdgTheme .mxNavigationDiv{display:flex;justify-content:space-around;align-items:center;height:3em;}.mxJdgTheme .mxNavigationDiv:empty{display:none;}.mxJdgTheme .mxNavigationDiv button{font-size:1em;flex:1;background:transparent;border:0;margin:0 2%;padding:0;height:3em;width:3em;}.mxJdgTheme .mxNavigationDiv button svg{margin:0 auto;width:100%;max-width:100%;height:1.5em;fill:var(--color);}.mxJdgTheme .mxSolveDiv{text-align:center;height:3em;}.mxJdgTheme .mxSolveDiv:empty{display:none;}.mxJdgTheme .mxSolveDiv button{font-size:1em;border:0;background:transparent;margin:0 1em;padding:0;width:3em;height:3em;}.mxJdgTheme .mxSolveDiv button svg{fill:var(--color);}.mxJdgTheme *:focus{outline:none;}.mxJdgTheme .mxGobanSvg:not(:focus-visible) .mxFocus{display:none;}.mxJdgTheme .mxGobanSvg:focus-visible{filter:brightness(1.1);}.mxJdgTheme .mxCommentDiv:focus-visible,.mxJdgTheme .mxTreeDiv:focus-visible{background:var(--focusBk);}.mxJdgTheme .mxNavigationDiv button:focus svg,.mxJdgTheme .mxSolveDiv button:focus svg{fill:var(--focusColor);}.mxJdgTheme button,.mxJdgTheme:not(.mxDiagramConfig) .mxGobanDiv svg,.mxJdgTheme .mxTreeDiv svg circle,.mxJdgTheme .mxTreeDiv svg polygon,.mxJdgTheme .mxTreeDiv svg rect,.mxJdgTheme .mxTreeDiv svg text{cursor:pointer;}";
mxG.D[mxG.K].a.in3dOn=1;
mxG.D[mxG.K].a.allowStringAsSource=1;
mxG.D[mxG.K].a.allowFileAsSource=1;
mxG.D[mxG.K].a.initMethod="first";
mxG.D[mxG.K].a.pointsNumMax=0;
mxG.D[mxG.K].a.stoneShadowOn=1;
mxG.D[mxG.K].a.stretching="0,1,1,2";
mxG.D[mxG.K].a.gridPadding=2;
mxG.D[mxG.K].a.gridMargin=0;
mxG.D[mxG.K].a.gobanPadding=0;
mxG.D[mxG.K].a.gobanMargin=2;
mxG.D[mxG.K].a.indicesOn=0;
mxG.D[mxG.K].a.numberingOn=0;
mxG.D[mxG.K].a.asInBookOn=0;
mxG.D[mxG.K].a.marksAndLabelsOn=1;
mxG.D[mxG.K].a.markOnLastOn=1;
mxG.D[mxG.K].a.numAsMarkOnLastOn=0;
mxG.D[mxG.K].a.japaneseIndicesOn=0;
mxG.D[mxG.K].a.oldJapaneseIndicesOn=0;
mxG.D[mxG.K].a.eraseGridUnder=1;
mxG.D[mxG.K].a.canCommentFocus=1;
mxG.D[mxG.K].a.canPlaceSolve=1;
mxG.D[mxG.K].a.solves="Retry,Undo";
mxG.D[mxG.K].a.specialMoveMatch=1;
mxG.D[mxG.K].a.versionBoxOn=1;
mxG.D[mxG.K].start();
