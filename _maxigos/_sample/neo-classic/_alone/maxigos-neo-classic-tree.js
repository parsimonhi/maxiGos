// maxiGos v8 NeoClassic+Tree copyright 1998-2023 FM&SH, BSD license
if(typeof mxG=='undefined') mxG={};
if(!mxG.V)
{
mxG.V="8.00";
mxG.Y="2023";
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
	s+="<title id=\""+this.p.n+"GobanTitle\"></title>";
	s+="<desc id=\""+this.p.n+"GobanDesc\"></desc>";
	if(this.in3dOn)
		s+="<defs>"+this.makeGradient("Black")+this.makeGradient("White")+"</defs>";
	s+=this.makeBackground("Ghost");
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
				s+=str;
			}
		}
	}
	if(s) s+=this.p.local(" at ");
	if(this.p.lang!="ja") this.latinCoordinates=1;
	s+=this.k2c(i)+this.k2n(j);
	if(this.p.lang!="ja") this.latinCoordinates=0;
	if(sayLast&&last) s+=", "+this.p.local("Last played move");
	return s;
};
mxG.S.prototype.makeGobanTitle=function()
{
	let s="",xf,yf,k,nat,str;
	s=this.p.local("Goban")+" "+this.DX+"x"+this.DY;
	if((this.xl!=1)||(this.yt!=1)||(this.xr!=this.DX)||(this.yb!=this.DY))
	{
		s+=", "+this.p.local("Partial view");
		s+=" "+this.k2c(this.xl)+this.k2n(this.yb);
		s+=" "+this.k2c(this.xr)+this.k2n(this.yt);
	}
	if((xf=this.p.xFocus)&&(yf=this.p.yFocus))
	{
		k=this.p.xy(xf,yf);
		nat=this.vNat[k];
		str=this.vStr[k];
		if(s) s+=", ";
		s+=this.p.local("Cursor on");
		if(s) s+=" ";
		s+=this.makeOneInfo(xf,yf,k,nat,str,1);
	}
	return s;
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
				if(s) s+=", ";
				s+=this.makeOneInfo(i,j,k,nat,str,0);
			}
		}
	if(!s) s=this.p.local("Empty goban");
	return s;
};
mxG.S.prototype.setGobanFocusTitleDesc=function(verbose)
{
	let x=this.p.xFocus,y=this.p.yFocus,ghost,a;
	if(!this.p.inView(x,y)) {x=0;y=0;}
	if(x&&y)this.p.getE("Focus").innerHTML=this.makeFocusMark(this.i2x(x),this.j2y(y));
	else this.p.getE("Focus").innerHTML="";
	this.p.getE("GobanTitle").innerHTML=this.makeGobanTitle()+(verbose?".":"");
	this.p.getE("GobanDesc").innerHTML=this.makeGobanDescription();
	a=this.p.n+"GobanTitle"+(verbose?" "+this.p.n+"GobanDesc":"");
	this.p.getE("GobanSvg").setAttribute("aria-labelledby",a);
	ghost=this.p.getE("GobanSvg").querySelector('.mxGhostRect');
	if(ghost)
	{
		if(ghost.style.display) ghost.style.display="";
		else ghost.style.display="none";
	}
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
mxG.fr("Last played move","dernier coup joué");
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
	a.title=(b.t?b.t:this.local(b.n));
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
if(!mxG.G.prototype.createAbout)
{
mxG.fr("About","À propos");
mxG.fr(" Close ","Fermer");
mxG.fr("Source code:","Code source :");
mxG.fr("Theme:","Thème :");
mxG.fr("Configuration:","Configuration :");
mxG.fr("License:","Licence :");
mxG.fr("Copyright","Copyright");
mxG.fr("About_Short","?");
mxG.en("About_Short","?");
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
		this.addBtn(this.getE("AboutDiv"),{n:"About",v:this.alias("About","aboutAlias")});
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
if(!mxG.G.prototype.createOptions)
{
mxG.fr("Options","Options");
mxG.fr("Options_Short","O");
mxG.fr("Cancel","Annuler");
mxG.fr("OK","OK");
mxG.fr("Indices","Affichage des coordonnées");
mxG.fr("As in book","Comme dans les livres");
mxG.fr("Numbering","Numérotation");
mxG.fr("Marks and labels","Marques et étiquettes");
mxG.fr("Mark on last","Marque sur le dernier coup");
mxG.fr("Variation marks","Indication des variations");
mxG.fr("Show variations of current move instead of next move","Affichage des alternatives au coup courant au lieu des variations du coup suivant");
mxG.fr("In 3d","Affichage en 3d");
mxG.fr("When clicking on the goban","Un click sur le goban");
mxG.fr("place a variation","place une variation");
mxG.fr("try to guess the next move","essaie de deviner le coup suivant");
mxG.fr(" from "," à partir de ");
mxG.fr(" with "," avec ");
mxG.fr("Loop time","Temps pour l'affichage en boucle");
mxG.fr("Animated stone","Pierres animées");
mxG.fr("Animated stone time","Temps pour l'animation des pierres");
mxG.en("Options_Short","O");
mxG.G.prototype.getValidNum=function(v)
{
	let n=parseInt(v);
	if(isNaN(n)) return 1;
	return n;
};
mxG.G.prototype.doChangeMarkOnLast=function()
{
	let e=this.getE("MarkOnLastOnCheckbox");
	this.markOnLastOn=e.checked?1:0;
	this.updateAll();
};
mxG.G.prototype.doChangeNumbering=function()
{
	let e=this.getE("NumberingOnCheckbox"),nf,nw;
	nf=this.getE("NumFromTextInput");
	nw=this.getE("NumWithTextInput");
	if(nf) nf.disabled=!e.checked;
	if(nw) nw.disabled=!e.checked;
	if(this.optionsBoxOn)
	{
		this.numberingOn=e.checked?1:0;
		this.configNumberingOn=this.numberingOn;
		if(this.hasC("Tree")) this.hasToSetTree=1;
		this.updateAll();
	}
};
mxG.G.prototype.doKeyupNumFrom=function()
{
	let e=this.getE("NumFromTextInput");
	this.numFrom=this.getValidNum(e.value);
	if(this.hasC("Tree")) this.hasToSetTree=1;
	this.updateAll();
};
mxG.G.prototype.doKeyupNumWith=function()
{
	let e=this.getE("NumWithTextInput");
	this.numWith=this.getValidNum(e.value);
	if(this.hasC("Tree")) this.hasToSetTree=1;
	this.updateAll();
};
mxG.G.prototype.doChangeMarksAndLabels=function()
{
	let e=this.getE("MarksAndLabelsOnCheckbox");
	this.marksAndLabelsOn=e.checked?1:0;
	this.updateAll();
};
mxG.G.prototype.doChangeAsInBook=function()
{
	let e=this.getE("AsInBookOnCheckbox");
	this.asInBookOn=e.checked?1:0;
	this.configAsInBookOn=this.asInBookOn;
	this.updateAll();
};
mxG.G.prototype.doChangeIndices=function()
{
	let e=this.getE("IndicesOnCheckbox");
	this.indicesOn=e.checked?1:0;
	this.configIndicesOn=this.indicesOn;
	this.updateAll();
};
mxG.G.prototype.doChangeVariationMarks=function()
{
	let e=this.getE("VariationMarksOnCheckbox");
	this.variationMarksOn=e.checked?1:0;
	this.configVariationMarksOn=this.variationMarksOn;
	this.styleMode=this.variationMarksOn?this.styleMode&~2:this.styleMode|2;
	this.updateAll();
};
mxG.G.prototype.doChangeSiblings=function()
{
	let e=this.getE("SiblingsOnCheckbox");
	this.siblingsOn=e.checked?1:0;
	this.configSiblingsOn=this.siblingsOn;
	this.styleMode=this.siblingsOn?this.styleMode|1:this.styleMode&~1;
	this.updateAll();
};
mxG.G.prototype.setIn3dClass=function()
{
	let e=this.getE("GlobalBoxDiv");
	e.className=e.className.replace((this.in3dOn?"mxIn2d":"mxIn3d"),(this.in3dOn?"mxIn3d":"mxIn2d"));
};
mxG.G.prototype.doChangeIn3d=function()
{
	let e=this.getE("In3dOnCheckbox");
	this.in3dOn=e.checked?1:0;
	this.setIn3dClass();
	this.updateAll();
};
mxG.G.prototype.doKeyupLoopTime=function()
{
	let e=this.getE("LoopTimeTextInput");
	this.loopTime=this.getValidNum(e.value);
	this.updateAll();
};
mxG.G.prototype.doChangeAnimatedStone=function()
{
	let e=this.getE("AnimatedStoneOnCheckbox");
	this.animatedStoneOn=e.checked?1:0;
	this.updateAll();
};
mxG.G.prototype.doKeyupAnimatedStoneTime=function()
{
	let e=this.getE("AnimatedStoneTextInput");
	this.animatedStoneTime=this.getValidNum(e.value);
	this.updateAll();
};
mxG.G.prototype.doChangeCan=function()
{
	let e;
	e=this.getE("CanVariationRadio");
	this.canPlaceVariation=e.checked?1:0;
	e=this.getE("CanGuessRadio");
	this.canPlaceGuess=e.checked?1:0;
	this.updateAll();
};
mxG.G.prototype.doChangeScoreMethod=function(m)
{
	let e,z=null;
	if(e=this.getE("TrivialScoreMethodRadio")) if(e.checked) z="trivial";	
	if(e=this.getE("CountingScoreMethodRadio")) if(e.checked) z="counting";	
	if(e=this.getE("PropagateScoreMethodRadio")) if(e.checked) z="propagate";	
	if(e=this.getE("EstimateScoreMethodRadio")) if(e.checked) z="estimate";
	if(z) this.scoreMethod=z;
	this.updateAll();
};
mxG.G.prototype.doOptionsOK=function()
{
	let e;
	if(e=this.getE("MarkOnLastOnCheckbox")) this.markOnLastOn=e.checked?1:0;
	if(e=this.getE("NumberingOnCheckbox")) {this.numberingOn=e.checked?1:0;this.configNumberingOn=this.numberingOn;if(this.hasC("Tree")) this.hasToSetTree=1;}
	if(e=this.getE("NumFromTextInput")) {this.numFrom=this.getValidNum(e.value);if(this.hasC("Tree")) this.hasToSetTree=1;}
	if(e=this.getE("NumWithTextInput")) {this.numWith=this.getValidNum(e.value);if(this.hasC("Tree")) this.hasToSetTree=1;}
	if(e=this.getE("MarksAndLabelsOnCheckbox")) this.marksAndLabelsOn=e.checked?1:0;
	if(e=this.getE("AsInBookOnCheckbox")) {this.asInBookOn=e.checked?1:0;this.configAsInBookOn=this.asInBookOn;}
	if(e=this.getE("IndicesOnCheckbox")) {this.indicesOn=e.checked?1:0;this.configIndicesOn=this.indicesOn;}
	if(e=this.getE("VariationMarksOnCheckbox")) {this.variationMarksOn=e.checked?1:0;this.configVariationMarksOn=this.variationMarksOn;this.styleMode=this.variationMarksOn?this.styleMode&~2:this.styleMode|2;}
	if(e=this.getE("SiblingsOnCheckbox")) {this.siblingsOn=e.checked?1:0;this.configSiblingsOn=this.siblingsOn;this.styleMode=this.siblingsOn?this.styleMode|1:this.styleMode&~1;}
	if(e=this.getE("In3dOnCheckbox")) {this.in3dOn=e.checked?1:0;this.setIn3dClass();if(this.hasC("Tree")) this.hasToSetTree=1;}
	if(e=this.getE("CanVariationRadio")) {this.canPlaceVariation=e.checked?1:0;this.hasToSetGoban=1;}
	if(e=this.getE("CanGuessRadio")) {this.canPlaceGuess=e.checked?1:0;this.hasToSetGoban=1;}
	if(e=this.getE("LoopTimeTextInput")) this.loopTime=this.getValidNum(e.value);
	if(e=this.getE("AnimatedStoneOnCheckbox")) this.animatedStoneOn=e.checked?1:0;
	if(e=this.getE("AnimatedStoneTimeTextInput")) this.animatedStoneTime=this.getValidNum(e.value);
	if(this.hasC("Score"))
	{
		let z=null;
		if(e=this.getE("TrivialScoreMethodRadio")) if(e.checked) z="trivial";	
		if(e=this.getE("CountingScoreMethodRadio")) if(e.checked) z="counting";	
		if(e=this.getE("PropagateScoreMethodRadio")) if(e.checked) z="propagate";	
		if(e=this.getE("EstimateScoreMethodRadio")) if(e.checked) z="estimate";
		if(z) this.scoreMethod=z;
	}
	this.updateAll();
};
mxG.G.prototype.buildOptions=function()
{
	let s="",a="";
	if(!this.optionsBoxOn) s+="<h1 tabindex=\"0\">"+this.local("Options")+"</h1>";
	if(!this.hideMarkOnLastOn)
	{
		a+="<label><input type=\"checkbox\"";
		if(this.optionsBoxOn) a+=" onchange=\""+this.g+".doChangeMarkOnLast()\"";
		a+=" id=\""+this.n+"MarkOnLastOnCheckbox\">";
		a+=this.local("Mark on last")+"</label>";
	}
	if(!this.hideNumberingOn)
	{
		a+="<label>";
		a+="<input type=\"checkbox\" class=\"mxNumberingOnCheckbox\"";
		a+=" onchange=\""+this.g+".doChangeNumbering()\"";
		a+=" id=\""+this.n+"NumberingOnCheckbox\">";
		a+=this.local("Numbering");
		a+=" <span class=\"mxNumFromTextSpan\">";
		a+=mxG.Z[this.lang]["•"]?"":("<label for=\""+this.n+"NumFromTextInput\">"+this.local(" from ")+"</label>");
		a+=" <input class=\"mxNumFromTextInput\" type=\"text\" id=\""+this.n+"NumFromTextInput\" size=\"3\" maxlength=\"3\" ";
		a+=this.optionsBoxOn?"onkeyup=\""+this.g+".doKeyupNumFrom()\">":">";
		a+="</span>";
		a+=" <span class=\"mxNumWithTextSpan\">";
		a+=mxG.Z[this.lang]["•"]?("<label for=\""+this.n+"NumFromTextInput\">"+this.local(" from ")+"</label>"):("<label for=\""+this.n+"NumWithTextInput\">"+this.local(" with ")+"</label>");
		a+=" <input class=\"mxNumWithTextInput\" type=\"text\" id=\""+this.n+"NumWithTextInput\" size=\"3\" maxlength=\"3\" ";
		a+=this.optionsBoxOn?"onkeyup=\""+this.g+".doKeyupNumWith()\">":">";
		a+=mxG.Z[this.lang]["•"]?("<label for=\""+this.n+"NumWithTextInput\">"+this.local(" with ")+"</label>"):"";
		a+="</span>";
		a+="</label>";
	}
	if(!this.hideMarksAndLabelsOn)
	{
		a+="<label><input type=\"checkbox\"";
		if(this.optionsBoxOn) a+=" onchange=\""+this.g+".doChangeMarksAndLabels()\"";
		a+=" id=\""+this.n+"MarksAndLabelsOnCheckbox\">";
		a+=this.local("Marks and labels")+"</label>";
	}
	if(!this.hideAsInBookOn)
	{
		a+="<label><input type=\"checkbox\"";
		if(this.optionsBoxOn) a+=" onchange=\""+this.g+".doChangeAsInBook()\"";
		a+=" id=\""+this.n+"AsInBookOnCheckbox\">";
		a+=this.local("As in book")+"</label>";
	}
	if(!this.hideIndicesOn)
	{
		a+="<label><input type=\"checkbox\"";
		if(this.optionsBoxOn) a+=" onchange=\""+this.g+".doChangeIndices()\"";
		a+=" id=\""+this.n+"IndicesOnCheckbox\">";
		a+=this.local("Indices")+"</label>";
	}
	if(this.hasC("Variation")&&!this.hideVariationMarksOn)
	{
		a+="<label><input type=\"checkbox\"";
		if(this.optionsBoxOn) a+=" onchange=\""+this.g+".doChangeVariationMarks()\"";
		a+=" id=\""+this.n+"VariationMarksOnCheckbox\">";
		a+=this.local("Variation marks")+"</label>";
	}
	if(this.hasC("Variation")&&!this.hideSiblingsOn)
	{
		a+="<label><input type=\"checkbox\"";
		if(this.optionsBoxOn) a+=" onchange=\""+this.g+".doChangeSiblings()\"";
		a+=" id=\""+this.n+"SiblingsOnCheckbox\">";
		a+=this.local("Show variations of current move instead of next move")+"</label>";
	}
	if(!this.hideIn3dOn)
	{
		a+="<label><input type=\"checkbox\"";
		if(this.optionsBoxOn) a+=" onchange=\""+this.g+".doChangeIn3d()\"";
		a+=" id=\""+this.n+"In3dOnCheckbox\">";
		a+=this.local("In 3d")+"</label>";
	}
	if(a) s+="<p>"+a+"</p>";
	if((this.hasC("Variation")&&!this.hideCanVariation)
		&&(this.hasC("Guess")&&!this.hideCanGuess))
	{
		s+="<p>";
		s+=this.local("When clicking on the goban")+"\n";
		if(this.hasC("Variation")&&!this.hideCanVariation)
		{
			s+="<label>";
			s+="<input name=\""+this.n+"ChangeCanRadio\" value=\"1\" type=\"radio\"";
			if(this.optionsBoxOn) s+=" onchange=\""+this.g+".doChangeCan()\"";
			s+=" id=\""+this.n+"CanVariationRadio\">";
			s+=this.local("place a variation")+"</label>";
		}
		if(this.hasC("Guess")&&!this.hideCanGuess)
		{
			s+="<label>";
			s+="<input name=\""+this.n+"ChangeCanRadio\" value=\"2\" type=\"radio\"";
			if(this.optionsBoxOn) s+=" onchange=\""+this.g+".doChangeCan()\"";
			s+=" id=\""+this.n+"CanGuessRadio\">";
			s+=this.local("try to guess the next move")+"</label>";
		}
		s+="</p>";
	}
	a="";
	if(this.hasC("Loop")&&!this.hideLoopTime)
	{
		a+="<label>"+this.local("Loop time");
		a+=" <input type=\"text\" size=\"9\" maxlength=\"9\"";
		if(this.optionsBoxOn) a+=" onkeyup=\""+this.g+".doKeyupLoopTime()\"";
		a+=" id=\""+this.n+"LoopTimeTextInput\" class=\"mxLoopTimeTextInput\">";
		a+="</label>";
	}
	if(this.hasC("AnimatedStone")&&!this.hideAnimatedStoneOn)
	{
		a+="<label><input type=\"checkbox\"";
		if(this.optionsBoxOn) a+=" onchange=\""+this.g+".doChangeAnimatedStone()\"";
		a+=" id=\""+this.n+"AnimatedStoneOnCheckbox\">";
		a+=this.local("Animated stone")+"</label>";
	}
	if(this.hasC("AnimatedStone")&&!this.hideAnimatedStoneTime)
	{
		a+="<label>"+this.local("Animated stone time");
		a+=" <input type=\"text\" size=\"9\" maxlength=\"9\" ";
		if(this.optionsBoxOn) a+=" onkeyup=\""+this.g+".doKeyupAnimatedStoneTime()\"";
		a+=" id=\""+this.n+"AnimatedStoneTimeTextInput\" class=\"mxAnimatedStoneTimeTextInput\">";
		a+="</label>";
	}
	if(a) s+="<p>"+a+"</p>";
	if(this.hasC("Score")&&!this.hideScoreMethod)
	{
		s+="<p>";
		s+=this.local("Score method")+"\n";
		s+="<label>";
		s+="<input name=\""+this.n+"ChangeScoreMethodRadio\" value=\"1\" type=\"radio\"";
		if(this.optionsBoxOn) s+=" onchange=\""+this.g+".doChangeScoreMethod()\"";
		s+=" id=\""+this.n+"TrivialScoreMethodRadio\">";
		s+=this.local("trivial")+"</label>";
		s+="<label>";
		s+="<input name=\""+this.n+"ChangeScoreMethodRadio\" value=\"2\" type=\"radio\"";
		if(this.optionsBoxOn) s+=" onchange=\""+this.g+".doChangeScoreMethod()\"";
		s+=" id=\""+this.n+"CountingScoreMethodRadio\">";
		s+=this.local("counting")+"</label>";
		s+="<label>";
		s+="<input name=\""+this.n+"ChangeScoreMethodRadio\" value=\"3\" type=\"radio\"";
		if(this.optionsBoxOn) s+=" onchange=\""+this.g+".doChangeScoreMethod()\"";
		s+=" id=\""+this.n+"PropagateScoreMethodRadio\">";
		s+=this.local("propagate")+"</label>";
		s+="<label>";
		s+="<input name=\""+this.n+"ChangeScoreMethodRadio\" value=\"4\" type=\"radio\"";
		if(this.optionsBoxOn) s+=" onchange=\""+this.g+".doChangeScoreMethod()\"";
		s+=" id=\""+this.n+"EstimateScoreMethodRadio\">";
		s+=this.local("estimate")+"</label>";
		s+="</p>";
	}
	return s;
};
mxG.G.prototype.setInputOptions=function()
{
	let e;
	if(e=this.getE("MarkOnLastOnCheckbox")) e.checked=(this.markOnLastOn==1);
	if(e=this.getE("NumberingOnCheckbox")) e.checked=(this.numberingOn>=1);
	if(e=this.getE("NumFromTextInput")) {e.value=this.numFrom;e.disabled=!this.numberingOn;}
	if(e=this.getE("NumWithTextInput")) {e.value=this.numWith;e.disabled=!this.numberingOn;}
	if(e=this.getE("MarksAndLabelsOnCheckbox")) e.checked=(this.marksAndLabelsOn==1);
	if(e=this.getE("AsInBookOnCheckbox")) e.checked=(this.asInBookOn==1);
	if(e=this.getE("IndicesOnCheckbox")) e.checked=(this.indicesOn==1);
	if(e=this.getE("VariationMarksOnCheckbox")) e.checked=(this.variationMarksOn==1);
	if(e=this.getE("SiblingsOnCheckbox")) e.checked=(this.siblingsOn==1);
	if(e=this.getE("In3dOnCheckbox")) e.checked=(this.in3dOn==1);
	if((e=this.getE("CanVariationRadio"))&&(this.canPlaceVariation==1)) e.checked=true;
	if((e=this.getE("CanGuessRadio"))&&(this.canPlaceGuess==1)) e.checked=true;
	if((e=this.getE("TrivialScoreMethodRadio"))&&(this.scoreMethod=="trivial"))
		e.checked=true;
	if((e=this.getE("CountingScoreMethodRadio"))&&(this.scoreMethod=="counting"))
		e.checked=true;
	if((e=this.getE("PropagateScoreMethodRadio"))&&(this.scoreMethod=="propagate"))
		e.checked=true;
	if((e=this.getE("EstimateScoreMethodRadio"))&&(this.scoreMethod=="estimate"))
		e.checked=true;
	if(e=this.getE("LoopTimeTextInput")) e.value=this.loopTime;
	if(e=this.getE("AnimatedStoneOnCheckbox"))
		e.checked=(this.animatedStoneOn==1);
	if(e=this.getE("AnimatedStoneTimeTextInput"))
		e.value=(this.animatedStoneTime?this.animatedStoneTime:this.loopTime?this.loopTime:1000);
};
mxG.G.prototype.doOptions=function()
{
	let btns=[{n:"OK",a:"Options"},{n:"Cancel"}];
	this.doDialog("EditOptions",this.buildOptions(),btns);
	this.setInputOptions();
};
mxG.G.prototype.updateOptions=function()
{
	if(this.optionsBoxOn) this.setInputOptions();
};
mxG.G.prototype.initOptions=function()
{
	if(this.optionsBtnOn)
		this.addBtn(this.getE("OptionsDiv"),{n:"Options",v:this.alias("Options","optionsAlias")});
};
mxG.G.prototype.createOptions=function()
{
	let s="";
	this.optionsBoxOn=this.setA("optionsBoxOn",0,"bool");
	this.optionsBtnOn=this.setA("optionsBtnOn",0,"bool");
	this.optionsAlias=this.setA("optionsAlias",null,"string");
	this.hideInOptions=this.setA("hideInOptions",new Set(),"set");
	for(let k of this.hideInOptions) this["hide"+k]=1;
	if(this.optionsBoxOn||this.optionsBtnOn)
	{
		s+="<div class=\"mxOptionsDiv\" id=\""+this.n+"OptionsDiv\">";
		if(!this.optionsBtnOn) s+=this.buildOptions();
		s+="</div>";
	}
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
mxG.G.prototype.doClickGoban=function(ev)
{
	let c=this.scr.getGxy(ev);
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
	if(ev.altKey||ev.key.match(/^[FGHJKLUN]$/i))
	{
		if(this.hasC("Navigation")) this.doKeydownNavigation(ev);
		else if(this.hasC("Solve")) this.doKeydownSolve(ev);
		return;
	}
	switch(ev.key)
	{
		case "ArrowLeft":this.xFocus--;r=1;break;
		case "ArrowRight":this.xFocus++;r=1;break;
		case "ArrowUp":this.yFocus--;r=1;break;
		case "ArrowDown":this.yFocus++;r=1;break;
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
	let r=0,s=ev.shiftKey?1:0;
	if(ev.altKey||ev.key.match(/^[FGHJKLUN]$/i)) switch(ev.key)
	{
		case "Home":case "F":case "f":
			if(this.hasPred()) {this.doFirst();r=1;} break;
		case "PageUp":case "G":case "g":
			if(this.hasPred()) {this.doTenPred();r=1;} break;
		case "ArrowLeft":case "H":case "h":
			if(this.hasPred()) {this.doPred();r=1;} break;
		case "ArrowRight":case "J":case "j":
			if(this.hasNext()) {this.doNext();r=1;} break;
		case "PageDown":case "K":case "k":
			if(this.hasNext()) {this.doTenNext();r=1;} break;
		case "End":case "L":case "l":
			if(this.hasNext()) {this.doLast();r=1;} break;
		case "ArrowUp":case "N":case "n":
			if(this.hasVariation(s)) {this.doTopVariation(s);r=2;} break;
		case "ArrowDown":case "U":case "u":
			if(this.hasVariation(s)) {this.doBottomVariation(s);r=2;} break;
	}
	if(r)
	{
		if(r&1) this.moveFocusMarkOnLast();
		else this.moveFocusMarkOnVariationOnFocus();
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
if(!mxG.G.prototype.createHeader)
{
mxG.fr("Header","Informations");
mxG.fr("Header_Short","E");
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
	if(s) s="<span class=\"mxEVTitleSpan\">"+s+"</span>";
	if(a) a="<span class=\"mxROTitleSpan\">"+a+"</span>";
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
mxG.en("Header_Short","H");
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
		h+="<span class=\"mxPBSpan\"><span class=\"mxHeaderSpan\">"+this.local("Black")+this.local(": ")+"</span>"+a;
		a=this.getInfo("BR");
		if(a) h+=this.local(" ")+this.build("Rank",a);
		if(this.concatTeamToPlayer&&(b=this.getInfo("BT"))) h+=(a?" (":"")+b+(a?")":"");
		h+="</span>";
		z=1;
	}
	a=(this.hideWhite)?0:this.getInfo("PW");
	if(a)
	{
		if(z) h+="<br>";
		h+="<span class=\"mxPWSpan\"><span class=\"mxHeaderSpan\">"+this.local("White")+this.local(": ")+"</span>"+a;
		a=this.getInfo("WR");
		if(a) h+=this.local(" ")+this.build("Rank",a);
		if(this.concatTeamToPlayer&&(b=this.getInfo("WT"))) h+=(a?" (":"")+b+(a?")":"");
		h+="</span>";
		z=1;
	}
	if(this.hideDate) a="";else a=this.getInfo("DT");
	if(a&&!this.concatDateToTitle)
	{
		if(z) h+="<br>";
		h+="<span class=\"mxDTSpan\"><span class=\"mxHeaderSpan\">"+this.local("Date")+this.local(": ")+"</span>"+this.build("Date",a)+"</span>";
		z=1;
	}
	if(this.hidePlace) a="";else a=this.getInfo("PC");
	if(a)
	{
		if(z) h+="<br>";
		h+="<span class=\"mxPCSpan\"><span class=\"mxHeaderSpan\">"+this.local("Place")+this.local(": ")+"</span>"+a+"</span>";
		z=1;
	}
	if(this.hideRules) a="";else a=this.getInfo("RU");
	if(a)
	{
		if(z) h+="<br>";
		h+="<span class=\"mxRUSpan\"><span class=\"mxHeaderSpan\">"+this.local("Rules")+this.local(": ")+"</span>"+this.build("Rules",a)+"</span>";
		z=1;
	}
	if(this.hideTimeLimits) a="";else a=this.getInfo("TM");
	if(a)
	{
		if(z) h+="<br>";
		h+="<span class=\"mxTMSpan\"><span class=\"mxHeaderSpan\">"+this.local("Time limits")+this.local(": ")+"</span>"+this.build("TimeLimits",a)+"</span>";
		z=1;
	}
	if(this.hideKomi) a="";else a=this.getInfo("KM");
	if(a) b="<span class=\"mxHeaderSpan\">"+this.local("Komi")+this.local(": ")+"</span>"+this.build("Komi",a);else b="";
	if(b&&!this.concatKomiToResult)
	{
		if(z) h+="<br>";
		h+="<span class=\"mxKMSpan\">"+b+"</span>";
		z=1;
	}
	if(this.hideHandicap) a="";else a=this.getInfo("HA");
	if(a) c="<span class=\"mxHeaderSpan\">"+this.local("Handicap")+this.local(": ")+"</span>"+this.build("handicap",a);else c="";
	if(c&&!this.concatHandicapToResult)
	{
		if(z) h+="<br>";
		h+="<span class=\"mxHASpan\">"+c+"</span>";
		z=1;
	}
	if(this.hideNumOfMoves) d="";
	else
	{
		a=this.getNumOfMoves()+"";
		if(this.hideNumOfMovesLabel) d=this.build("NumOfMoves",a);
		else d="<span class=\"mxHeaderSpan\">"+this.local("Number of moves")+this.local(": ")+"</span>"+a;
		if(!this.concatNumOfMovesToResult)
		{
			if(z) h+="<br>";
			h+="<span class=\"mxNMSpan\">"+d+"</span>";
			z=1;
		}
	}
	if(!this.hideResult&&(a=this.getInfo("RE")))
	{
		if(z) h+="<br>";
		h+="<span class=\"mxRESpan\">";
		r=this.build("Result",a);
		if(!this.hideResultLabel) h+=("<span class=\"mxHeaderSpan\">"+this.local("Result")+this.local(": ")+"</span>"+r);
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
		h+="</span>";
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
		this.addBtn(this.getE("HeaderDiv"),{n:"Header",v:this.alias("Header","headerAlias")});
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
if(!mxG.G.prototype.createTree)
{
mxG.fr("Game tree","Arbre des coups");
mxG.S.prototype.getTxy=function(ev,xo,yo)
{
	let e=this.p.getE("TreeBlockSvg"+this.p.idt(xo,yo)),
		w=this.ddT*this.p.getTreeRatio(),
		c=e.getMClick(ev),
		x,y;
	x=xo+Math.floor(c.x/w);
	y=yo+Math.floor(c.y/w);
	return {x:x,y:y};
};
mxG.S.prototype.makeTreeTriangle=function(x,y,d,c,cls)
{
	let e,x1,y1,x2,y2,x3,y3,z;
	z=d*0.32;
	x1=x;
	y1=y-z;
	x2=x-z;
	y2=y+z*0.8;
	x3=x+z;
	y3=y+z*0.8;
	e=document.createElementNS(this.xmlnsUrl,"polygon");
	e.setAttributeNS(null,"fill","none");
	e.setAttributeNS(null,"stroke",c);
	e.setAttributeNS(null,"stroke-width",this.sw4mark);
	e.setAttributeNS(null,"points",x1+" "+y1+" "+x2+" "+y2+" "+x3+" "+y3);
	e.classList.add(cls);
	return e;
};
mxG.S.prototype.makeOneTreeBlockContainer=function(x,y)
{
	let gr,dd=this.ddT,k=this.p.k,m=this.p.treeM,n=this.p.treeN;
	n=Math.min(n,this.p.treeRowMax-y);
	gr=document.createElementNS(this.xmlnsUrl,"svg");
	gr.setAttribute("id",this.p.n+"TreeBlockSvg"+this.p.idt(x,y));
	gr.setAttributeNS(null,"width",m*dd);
	gr.setAttributeNS(null,"height",n*dd);
	gr.setAttributeNS(null,"viewBox","0 0 "+(m*dd)+" "+(n*dd));
	gr.setAttributeNS(null,"font-family",this.ff);
	gr.setAttributeNS(null,"font-size",this.fs);
	gr.setAttributeNS(null,"font-weight",this.fw);
	gr.setAttributeNS(null,"text-anchor","middle");
	gr.setAttributeNS(null,"fill","none");
	gr.setAttributeNS(null,"stroke","none");
	gr.style.maxWidth="none";
	gr.getMClick=mxG.getMClick;
	gr.addEventListener("click",function(ev){mxG.D[k].doClickTree(ev,x,y);});
	return gr;
};
mxG.S.prototype.drawTreeLine=function(s,x,y,c)
{
	let e,d=this.dT,dd=this.ddT,r=this.rT,r2=this.r2T,r3=this.r3T,
		xo,yo,x1,y1,x2,y2,n=this.p.treeN,k;
	if(!c) c="#000";
	k=Math.floor(y/n);
	xo=x*dd;
	yo=(y-k*n)*dd;
	x1=xo+r2+r;
	y1=yo+r2+r;
	x2=xo+dd;
	y2=yo+dd;
	gr=this.p.treeBlocks[k];
	e=document.createElementNS(this.xmlnsUrl,"path");
	e.setAttributeNS(null,"stroke",c);
	e.setAttributeNS(null,"stroke-width",this.sw4grid);
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
	this.p.treeBlocks[k].appendChild(e);
};
mxG.S.prototype.drawTreePoint=function(aN)
{
	let gr,e,d=this.dT,dd=this.ddT,r=this.rT,r2=this.r2T,rg,a,cx,cy,
		nat,s="",x,y,xo,yo,xx,yy,c,ac,cls,good,
		n=this.p.treeN,m=this.p.treeM,tree=this.p.tree;
	if(aN.P["B"]) nat="B";else if(aN.P["W"]) nat="W";else nat="KA";
	if(!this.p.hideTreeNumbering&&((nat=="B")||(nat=="W")))
	{
		if(aN.P.C&&this.p.markCommentOnTree) s="?";
		else s=this.p.getAsInTreeNum(aN)+"";
	}
	x=aN.iTree;
	y=aN.jTree;
	xx=Math.floor(x/m)*m;
	yy=Math.floor(y/n)*n;
	xo=(x-xx)*dd;
	yo=(y-yy)*dd;
	cx=xo+r2+r;
	cy=yo+r2+r;
	gr=this.p.treeBlocks[yy/n];
	if(good=this.p.hasEmphasis(aN))
	{
		c=this.p.getEmphasisColor(good);
		cls=this.p.getEmphasisClass(good);
		e=this.p.buildTreeEmphasis(cx,cy,d,c,cls);
		e.setAttribute("id",this.p.n+"TreeEmphasis"+this.p.idt(x,y));
		gr.appendChild(e);
	}
	if((nat=="B")||(nat=="W"))
	{
		c=(nat=="B")?"Black":"White";
		ac=(nat=="B")?"White":"Black";
		if(this.stoneShadowOn)
		{
			let sw=this.stoneShadowWidth;
			e=document.createElementNS(this.xmlnsUrl,"circle");
			e.setAttribute("id",this.p.n+"TreeNodeShadow"+this.p.idt(x,y));
			e.setAttributeNS(null,"cx",cx+sw);
			e.setAttributeNS(null,"cy",cy+sw);
			e.setAttributeNS(null,"r",r);
			e.setAttributeNS(null,"fill","#000");
			e.setAttributeNS(null,"opacity","0.2");
			e.setAttributeNS(null,"stroke","none");
			gr.appendChild(e);
		}
		e=document.createElementNS(this.xmlnsUrl,"circle");
		e.setAttribute("id",this.p.n+"TreeNode"+this.p.idt(x,y));
		e.setAttributeNS(null,"cx",cx);
		e.setAttributeNS(null,"cy",cy);
		if(this.in3dOn)
		{
			rg=this.p.specialStoneOn?"A":"";
			e.setAttributeNS(null,"fill","url(#"+this.p.n+c[0]+"RG"+rg+")");
			e.setAttributeNS(null,"stroke","none");
			e.setAttributeNS(null,"r",r);
		}
		else
		{
			e.setAttributeNS(null,"fill",c);
			e.setAttributeNS(null,"stroke","Black");
			e.setAttributeNS(null,"stroke-width",this.sw4stone);
			e.setAttributeNS(null,"r",r-(this.sw4stone-1)/2);
		}
		e.classList.add("mx"+c);
		gr.appendChild(e);
		if(this.in3dOn&&this.p.specialStoneOn)
		{
			e=document.createElementNS(this.xmlnsUrl,"circle");
			e.setAttribute("id",this.p.n+"TreeNode"+this.p.idt(x,y));
			e.setAttributeNS(null,"cx",cx);
			e.setAttributeNS(null,"cy",cy);
			e.setAttributeNS(null,"r",r);
			e.classList.add("mx"+c);
			a=(c=="White")?Math.floor(x*this.p.alea+y)%8:"";
			e.setAttributeNS(null,"fill","url(#"+this.p.n+c[0]+"RGB"+a+")");
			e.setAttributeNS(null,"stroke","none");
			gr.appendChild(e);
		}
		if(s)
		{
			let dy=5;
			e=document.createElementNS(this.xmlnsUrl,"text");
			e.setAttributeNS(null,"x",cx);
			e.setAttributeNS(null,"y",cy+dy);
			e.setAttributeNS(null,"fill",ac);
			if(this.sw4text!="0")
			{
				e.setAttributeNS(null,"stroke",ac);
				e.setAttributeNS(null,"stroke-width",this.sw4text);
			}
			if(s.length>1)
			{
				let v,sx=(s.length>2)?0.8:0.9;
				v="matrix("+sx+",0,0,1,"+Math.round(cx*(1-sx)*100)/100+",0)";
				e.setAttributeNS(null,"transform",v);
			}
			e.setAttribute("aria-hidden",true);
			e.classList.add="mxOn"+c;
			e.textContent=s;
			gr.appendChild(e);
		}
	}
	else
	{
		e=this.makeTreeTriangle(cx,cy,d,"#000","mxMark");
		e.setAttribute("id",this.p.n+"TreeNode"+this.p.idt(x,y));
		gr.appendChild(e);
	}
	if(x)
	{
		c=this.p.getEmphasisColor(aN.Good);
		if(tree[y][x-1]==aN.Dad) this.drawTreeLine("H2L",x,y,c);
		else this.drawTreeLine("D2TL",x,y,c);
	}
	if(aN.Kid&&aN.Kid.length)
	{
		if((tree[y][x+1]!=undefined)&&(tree[y][x+1]!=undefined)&&(tree[y][x+1].Dad==aN))
		{
			c=this.p.getEmphasisColor(tree[y][x+1].Good);
			this.drawTreeLine("H2R",x,y,c);
		}
		if((tree[y+1]!=undefined)&&(tree[y+1][x+1]!=undefined)&&(tree[y+1][x+1].Dad==aN))
		{
			c=this.p.getEmphasisColor(tree[y+1][x+1].Good);
			this.drawTreeLine("D2BR",x,y,c);
		}
		if((tree[y+1]!=undefined)&&(tree[y+1][x]!=undefined)
			&&((tree[y+1][x].Shape==-1)||(tree[y+1][x].Shape==-2)||(tree[y+1][x].Shape==-3)))
		{
			c=this.p.getEmphasisColor(tree[y+1][x].Good);
			this.drawTreeLine("V2B",x,y,c);
		}
	}
};
mxG.S.prototype.drawTreeBlock=function(k,nv)
{
	let i,j,jo,jm,c;
	jo=Math.max(0,k);
	jm=Math.min(k+nv,this.p.treeRowMax);
	for(j=jo;j<jm;j++)
	{
		if(!this.p.treeCheck[j])
		{
			this.p.treeCheck[j]=1;
			for(i=0;i<this.p.treeColumnMax;i++)
				if((this.p.tree[j]!=undefined)&&(this.p.tree[j][i]!=undefined))
				{
					if(this.p.tree[j][i]&&this.p.tree[j][i].Dad) this.drawTreePoint(this.p.tree[j][i]);
					else
					{
						if(this.p.tree[j][i]) c=this.p.getEmphasisColor(this.p.tree[j][i].Good);
						if(this.p.tree[j][i]&&(this.p.tree[j][i].Shape==-1)) this.drawTreeLine("A1",i,j,c);
						else if(this.p.tree[j][i]&&(this.p.tree[j][i].Shape==-2)) this.drawTreeLine("T1",i,j,c);
						else if(this.p.tree[j][i]&&(this.p.tree[j][i].Shape==-3)) this.drawTreeLine("V1",i,j,c);
					}
				}
		}
	}
};
mxG.S.prototype.initTree=function()
{
	let d=this.d,r=d/2,r2=Math.floor(r/2);
	this.dT=d;
	this.ddT=d+2*r2;
	this.rT=r;
	this.r2T=r2;
	this.r3T=r2+0.15*d;
};
mxG.G.prototype.idt=function(x,y) {return x+"_"+y;};
mxG.G.prototype.getTreeRatio=function()
{
	let b=this.getE("TreeDiv").querySelector('svg').getBoundingClientRect();
	return b.width/(this.scr.ddT*this.treeM);
};
mxG.G.prototype.doClickTree=function(ev,xo,yo)
{
	let aN,c,x,y;
	if(this.isTreeDisabled()) return;
	c=this.scr.getTxy(ev,xo,yo);
	x=c.x;
	y=c.y;
	if((this.tree[y]!=undefined)&&(this.tree[y][x]!=undefined))
	{
		aN=this.tree[y][x];
		this.backNode(aN);
		this.updateAll();
	}
};
mxG.G.prototype.doKeydownTree=function(ev)
{
	this.doKeydownNavigation(ev);
};
mxG.G.prototype.buildTreeBlocksContainer=function()
{
	let i,j,n,m;
	m=this.treeColumnMax;
	n=this.treeN;
	this.treeBlocks=[];
	k=0;
	for(j=0;j<this.treeRowMax;j=j+n)
		for(i=0;i<this.treeColumnMax;i=i+m)
			this.treeBlocks.push(this.scr.makeOneTreeBlockContainer(i,j));
};
mxG.G.prototype.hasEmphasis=function(aN)
{
	if(aN==this.cN) return this.goodnessCode.Focus;
	return 0;
};
mxG.G.prototype.buildTreeEmphasis=function(x,y,d,c,cls)
{
	let e,z=d*0.625;
	e=document.createElementNS(this.scr.xmlnsUrl,"rect");
	e.setAttributeNS(null,"fill",c?c.substring(0,7):"#000");
	e.setAttributeNS(null,"opacity",c?parseInt(c.substring(7,9),16)/255:"0.125");
	e.setAttributeNS(null,"stroke","none");
	e.setAttributeNS(null,"x",x-z);
	e.setAttributeNS(null,"y",y-z);
	e.setAttributeNS(null,"width",z*2);
	e.setAttributeNS(null,"height",z*2);
	e.classList.add(cls);
	return e;
};
mxG.G.prototype.computeGoodness=function(aN,good)
{
	return 0;
};
mxG.G.prototype.buildTree=function(aN,io,jo)
{
	let i=io,j=jo,k,km=aN.Kid.length,l,good=0,path,p,pm;
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
						this.tree[j][i]={Shape:-1,Good:0};
						path.push({i:i,j:j});
					}
					else
					{
						this.tree[j][i]={Shape:-2,Good:0};
						path.push({i:i,j:j});
					}
				}
				else
				{
					this.tree[j][i]={Shape:-3,Good:0};
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
mxG.G.prototype.scrollTreeToShowFocus=function()
{
	let e,i,j,r,left,top,right,bottom,width,height,scrollLeft,scrollTop;
	if(!this.treeNodeOnFocus) return;
	e=this.td;
	i=this.treeNodeOnFocus.iTree;
	j=this.treeNodeOnFocus.jTree;
	dd=this.scr.ddT;
	r=this.getTreeRatio();
	left=dd*i*r;
	top=dd*j*r;
	right=left+dd*r+1;
	bottom=top+dd*r+1;
	if(e.clientWidth===undefined) return;
	width=e.clientWidth;
	if(!width) return;
	if(e.clientHeight===undefined) return;
	height=e.clientHeight;
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
mxG.G.prototype.afterDrawTree=function()
{
	this.scrollTreeToShowFocus();
};
mxG.G.prototype.computeKTB=function()
{
	let grh=this.tcd.firstChild.getBoundingClientRect().height,h=this.td.offsetHeight;
	return Math.ceil(h/grh);
};
mxG.G.prototype.drawTree=function()
{
	let nv,k,ko,km,f,e,tcd=this.tcd,kTB;
	this.treeCheck=[];
	f=!this.treeBlocks;
	this.buildTreeBlocksContainer();
	nv=Math.min(this.treeN,this.treeRowMax);
	ko=Math.floor(this.cN.jTree/this.treeN);
	km=this.treeBlocks.length;
	if(f&&(km>1)) tcd.appendChild(this.treeBlocks[0]);
	kTB=(km>1)?this.computeKTB():1;
	if(f&&(km>1)) tcd.replaceChildren();
	for(k=ko-kTB;k<=ko+kTB;k++)
	{
		if((k>=0)&&this.treeBlocks[k])
		{
			this.treeBlocks[k].innerHTML="<title>"+this.local("Game tree")+"</title>";
			this.scr.drawTreeBlock(k*this.treeN,nv);
		}
	}
	tcd.replaceChildren();
	for(k=0;k<km;k++) tcd.appendChild(this.treeBlocks[k]);
	this.afterDrawTree();
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
	let k,km=this.rN.Kid.length,aN;
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
	this.treeN=8;
	this.drawTree();
	this.treeNodeOnFocus=this.cN;
	this.hasToSetTree=0;
};
mxG.G.prototype.addVisibleTreeBlocksOnly=function(ko)
{
	let k,km,nv,gr,jo,j,jm,kTB;
	this.treeLock=1;
	km=this.treeBlocks.length;
	nv=Math.min(this.treeN,this.treeRowMax);
	kTB=(km>1)?this.computeKTB():1;
	for(k=0;k<km;k++)
	{
		gr=this.treeBlocks[k];
		if((k<(ko-kTB))||(k>(ko+kTB)))
		{
			if(gr.firstChild)
			{
				gr.replaceChildren();
				jo=k*nv;
				jm=jo+nv;
				for(j=jo;j<jm;j++) this.treeCheck[j]=0;
			}
		}
		else if(!gr.firstChild)
		{
			gr.innerHTML="<title>"+this.local("Game tree")+"</title>";
			this.scr.drawTreeBlock(k*nv,nv);
		}
	}
	this.treeLock=0;
};
mxG.G.prototype.updateTreeEmphasis=function()
{
	let aN,i,j,e,good,treeNode,cx,cy,d,c,cls;
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
			d=this.scr.dT+2;
			if(treeNode.tagName.match(/circle/i))
			{
				cx=treeNode.getAttributeNS(null,"cx");
				cy=treeNode.getAttributeNS(null,"cy");
			}
			else if(treeNode.tagName.match(/polygon/i))
			{
				points=treeNode.getAttributeNS(null,"points");
				cx=parseFloat(points.replace(/^([0-9.]+).*$/,"$1"));
				cy=parseFloat(points.replace(/^[0-9.]+ ([0-9.]+).*$/,"$1"))+d*0.32;
			}
			else
			{
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
mxG.G.prototype.doScrollTree=function(ev)
{
	if(this.treeLock||!this.treeBlocks) return;
	let w=this.scr.ddT*this.getTreeRatio(),
		st=this.td.scrollTop,
		y=Math.floor(st/w),
		n=this.treeN,
		ko=Math.floor(y/n),k,km;
	this.addVisibleTreeBlocksOnly(ko);
};
mxG.G.prototype.updateTree=function()
{
	if(this.hasToSetTree) this.setTree();
	else
	{
		let ko=Math.floor(this.cN.jTree/this.treeN);
		this.addVisibleTreeBlocksOnly(ko);
		this.updateTreeEmphasis();
	}
	this.afterDrawTree();
};
mxG.G.prototype.initTree=function()
{
	let k=this.k;
	this.td=this.getE("TreeDiv");
	this.tcd=this.getE("TreeContentDiv");
	this.td.addEventListener("scroll",function(ev){mxG.D[k].doScrollTree(ev);});
	this.td.addEventListener("keydown",function(ev){mxG.D[k].doKeydownTree(ev);});
	this.scr.initTree();
	this.hasToSetTree=1;
	if(ResizeObserver) new ResizeObserver(function(){mxG.D[k].doScrollTree();}).observe(this.td);
};
mxG.G.prototype.createTree=function()
{
	let s="",a="";
	this.canTreeFocus=this.setA("canTreeFocus",0,"bool");
	this.hideTreeNumbering=this.setA("hideTreeNumbering",0,"bool");
	this.markCommentOnTree=this.setA("markCommentOnTree",0,"bool");
	this.treeCaptionOn=this.setA("treeCaptionOn",0,"bool");
	a=this.canTreeFocus?" tabindex=\"0\"":"";
	s+="<div class=\"mxTreeDiv\" id=\""+this.n+"TreeDiv\""+a+">";
	if(this.treeCaptionOn)
	{
		s+="<div class=\"mxTreeCaptionDiv\" id=\""+this.n+"TreeCaptionDiv\">";
		s+=this.local("Game tree");
		s+="</div>";
	}
	s+="<div class=\"mxTreeContentDiv\" id=\""+this.n+"TreeContentDiv\">";
	s+="</div>";
	s+="</div>";
	return s;
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
mxG.B=[["About","Options"],"Goban","Navigation","Variation","Goto","Comment","Header","Tree","Version"];
mxG.D[mxG.K]=new mxG.G(mxG.K,mxG.B);
mxG.D[mxG.K].theme="NeoClassic";
mxG.D[mxG.K].config="Tree";
mxG.D[mxG.K].style=".mxNeoClassicTheme{--gobanMaxWidth:calc(1em * 511 / 16);max-width:var(--gobanMaxWidth);margin:0 auto;text-align:left;}.mxNeoClassicTheme.mxIn3d{--gobanMaxWidth:calc(1em * 491 / 16);}.mxNeoClassicTheme.mxIndicesOff{--gobanMaxWidth:calc(1em * 463 / 16);}.mxNeoClassicTheme.mxIndicesOff.mxIn3d{--gobanMaxWidth:calc(1em * 445 / 16);}.mxNeoClassicTheme button{-webkit-appearance:none;-moz-appearance:none;}.mxNeoClassicTheme input[type=text]{text-align:center;font-size:1em;}.mxNeoClassicTheme button[disabled]{cursor:default;opacity:0.3;}.mxNeoClassicTheme fieldset{border:0;margin:0;padding:0;}.mxNeoClassicTheme svg{display:block;width:100%;height:100%;}.mxNeoClassicTheme,.mxNeoClassicTheme button{font-family:sans-serif;}.mxNeoClassicTheme .mxTitleP{font-weight:bold;color:#c33;}.mxNeoClassicTheme .mxInnerGobanDiv{margin:0 auto;}.mxNeoClassicTheme .mxGobanDiv svg{background-image:url(\"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAAoAZADAREAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAAAgEDAAQH/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwUG/9oADAMBAAIQAxAAAAH7n817+lzy8EpprPBl6HrJlE0IVSIQ5akUmlzy5Z0TSwQJrq0Z482d2qlFYJYruaQKmPO3B2bMpIeiX0bwIzms5dLPRvGeaJp3KApgKkMspnJwJepIJStKZy1MmvRcQ8eelpIkoSK0qFbZTOa4yX0XBUHpl31zksrOa5PXrmZYctQNE6CFps6WcEkvWCXlpEzmuCsjfWYYTQOVsoqFQNIpUEC1kuzLQHts2ueIFRL6tc+i1nm2yKVMsCqRoV6yy9ZlLFSUxmiNIurIXNolSlTa5hlNKwyxMpu1DJWiTk99a3NSkrLOnY2VQl4C8CWFM1SUorICUq2aYzXBVHIk8ze7IWIxWcCXS5wmooVJFCplUk//xAAgEAACAgIDAAMBAAAAAAAAAAAAAQIRITEQEkEgIjJC/9oACAEBAAEFAtC1x2E+WxMsbGdqO2bFLFlllliZY5WXb7E5UdSLqVnYUu8u1rsKQmN8X9b+14vLJr7IvqRY2N1x5/V5vCZpN4LwWS2sfHzlPhb94bPRi35LHCNCYnQxsTMNss9gx4JvKZC6bJb9W2+dtZPbLx/KFofwvj3yzsWxYcdN41FjyMiNFGixkck3lNyPfYXIkP8ABHMWqkxqz2Wh8Lh7obFkvPwr4eG2SVlj1v4Ln2iW3+JL7LRJUQRKOP0pb8SOpR0y+KGsVjapvjqUVxvjrxXCTGucl87jt1xDazL2qETWWX2OuI5RFYo62f/EAB4RAAICAgMBAQAAAAAAAAAAAAEQESAAMCExQEFQ/9oACAEDAQE/AdJvGsBHpxAyNEMM/nc0KCKFuqR6JqcFDxgz6igx7jUIUNpU758BqHOFF//EABgRAQEAAwAAAAAAAAAAAAAAABEAMFBw/9oACAECAQE/AcrMzz01v//EACUQAAEDAgYCAwEAAAAAAAAAAAABEBEgITAxUWFxgQJBQIKR0f/aAAgBAQAGPwJE+LOlCVKXyJ1scnLR5ELky9UWbetcLbA6PymVMiUZTyE4OH20NqIgkyaWRpEw9yBMDqrIlRGVdT6nbRVoaGZBwLQlySarYMUrROR7p2OK4OTo9H9NxbuvGDOFfC1dfHQk7oVlZXURrG5//8QAJhAAAgIBBAEFAAMBAAAAAAAAAAERITFBUWFxgRCRobHB0eHw8f/aAAgBAQABPyGZIyN/Ymxu49QmT8EI6fFjqtyxnyG03M8CojWx6SWXoWhe5fhGHZdvQkpDP5HcYyWjJJPDHYhQnkSRbK4yaHYcIZL2Dq6IRO/4RVeoltOOSyBdjmczYYmfOPo3GZFU6Ez4F4XbMqDEw5mNihhl7/RAeR9ChXqxPS5J7ITLuEc6ZMj2RB9hTcvtlMYX2Jy5bHBu9yT6aDQnVbN9ZsbyJ16KknWxOmyfLJh8CCEG2yTfuBTDozeg3fiQyP0xdhaCtTvfofCE6ti9uEIdQtv9+l1G/wD0l0V7gm1e9PKJGZe+40RGPwgIErEXrSIpykgnCifobVzpCt44GlwdkCvgmnbSWwjObokc80NXkdd7HECXZMmY7liZahmQ9gvAmoMbEScvSUMaaOFgTG7XYgnPDF9iY8fwlEMs1NNaDjp2XIFwNBRv0imlaCijVIvJc+UG14/f6Emd1DV0RfDHOQtGhTZISGyL4IZTL7FGHgnBW7ZmGluzoJKNKex275GocavIikSe0kBkhcJZQjQ+RQI4doWZ9hRzjc/SFHiJfZCZShFTS+DJt6Sf8GA3lNCm2PDyiftPwa8XPgh1+DVtmiJt4GnOoJ7JkQ6d7MUrEcsPBLaZnl4Rz4csWUtnyxuceCs+ENvKHaIcllCdf7BBpoGiW4c3i0hDIU3EMSpdCZShLwn6RxCuCTgyIWgg6NyXgc5HsjNeHDEjkd5Njkz4EHQe7HqXoaYRUS01FaHktNKy0ZRZFahXJu2FPsONfRDOw05G4XO4uxafgTcrHP0NUyNywKS2IlChni/Ya/PwhPmxMNJZJ4UlY7ntAkxdwMmUg8akk2lQPHoTk2lS4G4W+YJr5FWcOBpogf/aAAwDAQACAAMAAAAQPyOEKHzC9hmIWHQpeeGQQDbkfwoyG2U8jgz+f+Wde4JrAp5AIT38Xf8AuE/3h32n6ZgAZckaBaCILiVC9/Wu2/UP/jTDhCKnirgBAU+ho01j/rbpHOzYKaRdAnSQBwP/xAAgEQADAQACAwADAQAAAAAAAAAAAREhMUEQUWFxgfCx/9oACAEDAQE/EJdYzoS7J7GPPCQnol4ILCJjQkPXiEg0SKDSEhKCSSqEspR0rEtE9kowYaXr+RL+v9GtwkxiWYJLoa7JiPYguxsjGznwSoleD4TR8EqINDVwUH8JpxiJgmkPR0W+bWPlEIidkRFIh8Q6EukJbyP0x+vD4Rt/f8hf6cU4ZE9Gh6YK8jV0whNkbFqgjohMhOiE4hcHCHKGlBKsnh4HmHC8RyLX4Y6JQ+jNRODnfE0hIRexvpD5EtO0LBRJL0LdHmiRlMlQ1pyMkJ0xxH1nCpA9hYEUnSprBpjODo5DFg/T8bMPwVtRsSGQniXRxiapOvh0v7TBafEWKH5ExrT0SeOBfRKZThmMbuiYLXpw0/HhO4TRPRY6zIXRtdmsZWjiLwhPo4Y8Kl4sVE29Y2fRxahR6iqMTM6HEhOlFWYJH5LpOz4XxUHi0eJFHkGw5JNFo5KCg0Y37LD/xAAeEQADAAIDAQEBAAAAAAAAAAAAAREQISAxQVFhcf/aAAgBAgEBPxC+CZ2VFEylKX0vTLsZoIMLTZSlKJ0T+jY2Ub8G5hOMuxv4J3bL6XRSl2NlxSlzS59F0el2z9Fs8G2IotuldgyiGIbz1ilOz0/R72ecEd8Nrk4+CxTyi+j7H2enpZm1np7i6nB9FvPzLp0IfR5wW9Ehrgt43y6Eej/MXY+hDF9P0ubw9h1rDLl6EvWd4ax5vHeVrZfmNio3h83j0kdJTsMRBrVF1cbxMQ/h+MvhNUXWNno0bwsTF4IS2ekJwmYQh//EACUQAQABAwIGAwEBAAAAAAAAAAERACExQVFhcYGRsfChwdHh8f/aAAgBAQABPxAMTWxHm/vzTQutpcJqdmXNDIRE3aZKmCpyVuMfFMvOlaJHltRJhlRANeNCi4ILjUCrFIZMTpSlQiZdasBHT2q0LAAkXicUhIwY97UySlcU5My4KSZEC6NopgLXLGxVsljQFLyoFOt70CVuoPEunKn0Wmy8NaA24jtx7npWtA12P8aWMO88YpLWVC68Wi3JN6EyqIyT7eopiwpakEEIl+D8o4LgW7ScdaW1evBEy/D2oVqzKG3+DSLbZHlcPppWgTN1gkDyNKRYdJ80g2iw17xieNPhZtq6uHepsdikNbs+fmiLEYyeVKTMLvQ/KUJiJu7aU5oyGLRzqViLQIBj+03RuYhLzH7pU2V3GPtvU67KsdaNDIskM0aytCA5fzlUrgUaa0RUXCDmLJQo3Rac37+agStyz2/pTQ24/VCyFznSrN7TDW37FME0gLN3geKgCI7wt+CsFpxNQ5hlPDfpUEoSLnvM/XCrOFkgGR3oAZRZDvw93q2DOZ61izh9+6VNcETxob5c5aHimMkMc5oUDdGwmaYU5NTqeKSVoSeZH1UJbUEnmvzQli2TgH60Uusujb+0MHA77elGS4FAC/t6UWw1ydqKtmaFa1b3weiSfPmmA5wNo4f34pJGXtxbNZpkR5ufloJhsXt0qVyaM7QHzSL2MC28x9qiiOo9jk5KijJPlPKmCbA5EWfp61dIAsTu/GOlFY3C49X9jpQWB2Ez/aEgJZRv5oOTK0DyoGRIlhk9dKargzu8P2o0wWeD3NXywyy60j2EhHB/pSzVlPkKIIQHdmPFTIbo5n/KiUiQkck/YpQy2Mv34WlgBGnCoVvm9auF8p91gRYUEbf7RFLYYKYt+I2KV4QY4DrSEwlAboe70OwFBOpFKRyJELqT9lJhUSWua6/LTS/fEcaAXiJulC4WQu6GlNwkfk1IEXC0mvKglwygdtaCZWAKscbdim4aoX940r4bqxpKfpRBYm/181NorXKYmxZXOm1MVktkuTQbySEOm7UGRHN9CbUUD0WhkCxDWLs91o6qYhui3w1Lammcuv1RDZKJI6vHhRgElI1xj6qBsKw/38pw5vReEYpRw15E/T8U4OWFyI0x34dMaa6B7U8qiSloWf2pAmS+U4yCdc1kUalz9RTDPM5Sxp7xoTSlZu/KaQQsok6GlIRLAiduNFHACTzi/eijEFJLhx6UYQAEJHapOkTAXONEhbdtSZk90qKoaLbX/tOCNz73xV+EWSOiVYTIo5+fedCbQleZufPigySb5UGEIcIkpQycV9Mvgq0t2r7dCtSghi030o3EMvZFunkqVxJN48FQuWy9qGxIEf6q5JQ2hcOl6sw0kPLelMIZxv48U0Q1JXfPigXmAXdkHeaJuZkm6IfeVXFPXduc/wApS7cOYDf5qE7c7cdilVhwuWlBBRkt8NXHe4F4fFWJUiJNRvb5KQUIAJbSfWtGYppdg3PrSrSAQSpy2py/KkYtx9NL9qZs1HVwsd4TrSsjEAMTxfqskkhzr17UB2NMB76aVGiAtOdntde9QGl4Jcr25Tbg0sERCReDTnctzocBQHaMx9UqGAnhn6ikZXozJTrSwkLdFfurAOAjLPKnJFksNCoImJFHU2ptsWlOiTSAsTV2jHlpaao43iliBMMaNIlYbr35oEiL6u9qtWwG53pxgk5gOPMU0CXIk8UyQUE2TR3O1JIEGELTv80ojq8ZKKSX1vZ3pQsPAGOdJm4YYl11ikTTE2WKIXFTOIltUwDgKSbR8vb96lz8Jr/aZeE4H+UCRR2fqiTlgkLMmpvTGQTg2dc208VJFg0O1tH/AEqZCzN2mz170JZeWJ95e3VfGMu3DaiKEmZXY4GaEhJ86kLrMrO/RqxJMZNl8qVEvBPK/vWalGWFE5F/fNRADHylD7q+Ve45wPloELxhymB8+GpzcBuxoe8qCxRTB6eWgWpE+VvDQJRuVm8pD/PygQAMGNRsnvChSsoAurpPPWhBkXCmzbB43qWghMgvFIQixi16BSXAOiPxKYSSIr6Sh8eKFgKFJjjUGpZw7/2mSIUcJr//2Q==\");background-size:100% 100%;background-repeat:no-repeat;}.mxNeoClassicTheme.mxIn3d .mxGobanDiv svg{box-shadow:0 0.125em 0.125em rgba(0,0,0,0.1);}.mxNeoClassicTheme text.mxOnEmpty.mxOnFocus{fill:#c33;}.mxNeoClassicTheme :not(.mxPointBackground).mxOnEmpty.mxMark.mxOnFocus{stroke:#c33;}.mxNeoClassicTheme .mxPointBackground{stroke:none;}.mxNeoClassicTheme .mxMarkOnLast{fill:#c33;stroke:#c33;}.mxNeoClassicTheme .mxFocusMark{fill:none;stroke:#c33;}.mxNeoClassicTheme .mxAboutParentDiv{display:flex;justify-content:center;}.mxNeoClassicTheme:not(.mxProblemConfig) .mxCommentDiv,.mxNeoClassicTheme .mxTreeDiv{height:7em;border:1px solid #ddd;margin:0 1px 0.5em 1px;padding:0.25em;overflow:auto;resize:vertical;}.mxNeoClassicTheme .mxTreeDiv{max-height:42em;}.mxNeoClassicTheme .mxTreeDiv svg{width:unset;height:unset;}.mxNeoClassicTheme .mxTreeDiv svg .mxFocus{fill:#c33;opacity:1;}.mxNeoClassicTheme .mxInnerNotSeenDiv:not(:empty){margin:0.5em auto 0 auto;}.mxNeoClassicTheme.mxProblemConfig .mxCommentDiv{display:flex;justify-content:center;min-height:2.25em;}.mxNeoClassicTheme.mxProblemConfig .mxCommentContentDiv p{margin:0.5em;padding:0;line-height:1.25em;}.mxNeoClassicTheme dialog button,.mxNeoClassicTheme .mxAboutParentDiv button{font-size:1em;border:1px solid #ddd;background:transparent;color:#000;margin:0.5em 0.125em;padding:0 0.5em;height:1.75em;line-height:1.75em;white-space:nowrap;text-decoration:none;}.mxNeoClassicTheme input[type=text]{border:1px solid #ddd;}.mxNeoClassicTheme dialog,.mxNeoClassicTheme dialog *{box-sizing:border-box;}.mxNeoClassicTheme dialog::backdrop{background: rgba(0,0,0,0.5);}.mxNeoClassicTheme dialog{min-width:min(50vw,19em);border:1px solid #ddd;background:#fff;text-align:left;padding:0;}.mxNeoClassicTheme dialog form{margin:0;padding:0;}.mxNeoClassicTheme dialog .mxContentFieldset{padding:0.5em;min-width:100%;}.mxNeoClassicTheme dialog .mxMenuFieldset{border-top:1px solid #ddd;min-height:3em;line-height:3em;text-align:center;}.mxNeoClassicTheme dialog label:not([for]){display:block;}.mxNeoClassicTheme dialog a{color:#000;}.mxNeoClassicTheme dialog.mxEditOptionsDialog .mxContentFieldset{line-height:1.75em;}.mxNeoClassicTheme .mxNumberingOnCheckbox:not(:checked)~span{display:none;}.mxNeoClassicTheme .mxNavigationDiv{display:flex;align-items:center;gap:2%;}.mxNeoClassicTheme .mxNavigationDiv button{flex:1;border:0;margin:0;padding:0;background:none;}.mxNeoClassicTheme .mxNavigationDiv button svg{max-width:50%;margin:20% auto;}.mxNeoClassicTheme .mxAutoBtn[disabled],.mxNeoClassicTheme .mxPauseBtn[disabled]{display:none;}.mxNeoClassicTheme .mxGotoInput{margin:1px;width:2.4em;height:1.8em;}.mxNeoClassicTheme .mxSolveDiv{text-align:center;}.mxNeoClassicTheme .mxSolveDiv button{width:10%;min-width:1cm;margin:1% 2%;padding:0;border:0;background:none;}.mxNeoClassicTheme *:not([type=radio]):not([type=checkbox]):focus{outline:none;}.mxNeoClassicTheme .mxGobanSvg:not(:focus-visible) .mxFocus{display:none;}.mxNeoClassicTheme button:focus,.mxNeoClassicTheme button:hover,.mxNeoClassicTheme a:focus,.mxNeoClassicTheme a:hover{color:#c33;}.mxNeoClassicTheme button:focus svg{fill:#c33;}.mxNeoClassicTheme input[type=text]:focus,.mxNeoClassicTheme .mxCommentDiv:focus,.mxNeoClassicTheme .mxTreeDiv:focus{background:#eee;}.mxNeoClassicTheme button,.mxNeoClassicTheme:not(.mxDiagramConfig) .mxGobanDiv svg,.mxNeoClassicTheme .mxTreeDiv svg circle,.mxNeoClassicTheme .mxTreeDiv svg polygon,.mxNeoClassicTheme .mxTreeDiv svg rect,.mxNeoClassicTheme .mxTreeDiv svg text{cursor:pointer;}";
mxG.D[mxG.K].a.in3dOn=1;
mxG.D[mxG.K].a.pointsNumMax=19;
mxG.D[mxG.K].a.stretching="0,1,1,2";
mxG.D[mxG.K].a.gridPadding=2;
mxG.D[mxG.K].a.gobanMargin=2;
mxG.D[mxG.K].a.indicesOn=1;
mxG.D[mxG.K].a.numberingOn=0;
mxG.D[mxG.K].a.asInBookOn=0;
mxG.D[mxG.K].a.marksAndLabelsOn=1;
mxG.D[mxG.K].a.markOnLastOn=1;
mxG.D[mxG.K].a.eraseGridUnder=1;
mxG.D[mxG.K].a.aboutBtnOn=1;
mxG.D[mxG.K].a.headerInComment=1;
mxG.D[mxG.K].a.canCommentFocus=1;
mxG.D[mxG.K].a.hideInHeader="NumOfMoves";
mxG.D[mxG.K].a.navigations="First,TenPred,Pred,Goto,Next,TenNext,Last";
mxG.D[mxG.K].a.optionsBtnOn=1;
mxG.D[mxG.K].a.canTreeFocus=1;
mxG.D[mxG.K].a.variationMarksOn=1;
mxG.D[mxG.K].a.hideSingleVariationMarkOn=1;
mxG.D[mxG.K].a.canPlaceVariation=1;
mxG.D[mxG.K].start();
