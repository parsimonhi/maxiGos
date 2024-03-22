// maxiGos v8 Minimalist+Basic copyright 1998-2024 FM&SH, BSD license
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
if(!mxG.N)
{
mxG.N=function(n,p,v)
{
	this.Kid=[];
	this.P={};
	this.Dad=n;
	this.Focus=0;
	if(n){n.Kid.push(this);if(!n.Focus)n.Focus=1;}
	if(p)this.P[p]=[v];
}
mxG.N.prototype.takeOff=function(p,k)
{
	if(this.P[p])
	{
		if(k<0)this.P[p].splice(0,this.P[p].length);else this.P[p].splice(k,1);
		if(!this.P[p].length)delete this.P[p];
	}
}
mxG.N.prototype.put=function(p,v)
{
	this.P[p]=(typeof(v)=="object")?v:[v];
}
mxG.N.prototype.clone=function(dad)
{
	let p,k,bN=new mxG.N(dad,null,null);
	for(p in this.P)if(p.match(/^[A-Z]+$/)&&this.P.hasOwnProperty(p))
		bN.P[p]=this.P[p].concat();
	for(k=0;k<this.Kid.length;k++)
		bN.Kid[k]=this.Kid[k].clone(bN);
	bN.Focus=this.Focus;
	return bN;
}
}
if(!mxG.P)
{
mxG.P=function(s,coreOnly,mainOnly)
{
	this.rN=new mxG.N(null,null,null);
	this.keepAll=!coreOnly;
	this.mainOnly=mainOnly;
	this.parseSgf(s);
	if(!this.rN.Focus)this.parseSgf("(;FF[4]CA[UTF-8]GM[1]SZ[19])");
	return this.rN;
}
mxG.P.prototype.out=function(a,p="",v="")
{
	if(this.keepAll||(a=="V")||(((a=="N")||(a=="P"))?mxG.coreProps.has(p):1))
		switch(a)
		{
			case "N":this.nN=new mxG.N(this.nN,p,v);break;
			case "P":if(this.nN.P[p]&&!mxG.monoProps.has(p))this.nN.P[p].push(v);
				else this.nN.P[p]=[v];break;
			case "v=":this.nN=this.v[this.v.length-1];break;
			case "v+":this.v.push(this.nN);break;
			case "v-":this.v.pop();break;
		}
}
mxG.P.prototype.parseValue=function(p,K)
{
	let v="",a;
	K++;
	while((K<this.len)&&((a=this.s.charAt(K))!=']'))
	{
		if(a=='\\'){v+=a;K++;a=(K<this.len)?this.s.charAt(K):"";}
		v+=a;
		K++;
	}
	if(/\r/.test(v))v=v.replace(/\r\n/g,"\n").replace(/(\n\r)|\r/g,"\n");
	if(/\\/.test(v))
		v=v.replace(/((^|[^\\])(\\\\)*)\\\n/g,'$1 ')
			.replace(/((^|[^\\])(\\\\)*)\\($|[^\\])/g,'$1$4')
			.replace(/\\\\/g,'\\');
	if(this.nc){this.nc=0;this.out("N",p,v);}
	else this.out("P",p,v);
	K++;
	while(K<this.len)
	{
		a=this.s.charAt(K);
		if((a=='(')||(a==';')||(a==')')||((a>='A')&&(a<='Z'))||(a=='['))break;
		K++;
	}
	return K;
}
mxG.P.prototype.parseProperty=function(K,p)
{
	let a;
	while((K<this.len)&&((a=this.s.charAt(K))!='[')){if((a>='A')&&(a<='Z'))p+=a;K++;}
	while((K<this.len)&&(this.s.charAt(K)=='['))K=this.parseValue(p,K);
	return K;
}
mxG.P.prototype.parseNode=function(K)
{
	let a;
	this.nc=1;
	while(K<this.len)
	{
		a=this.s.charAt(K);
		if((a=='(')||(a==';')||(a==')'))break;
		K++;
		if((a>='A')&&(a<='Z'))K=this.parseProperty(K,a);
	}
	return K;
}
mxG.P.prototype.parseVariation=function(K)
{
	let a=this.mainOnly;
	if(this.nv){if(this.v.length)this.out("v=");this.nv=0;}
	else this.out("v+");
	while(K<this.len)
		switch(this.s.charAt(K))
		{
			case '(':if(a)K++;else return K;break;
			case ';':K++;K=this.parseNode(K);break;
			case ')':K++;
					 if(this.nv){if(this.v.length)this.out("v-");}else this.nv=1;
					 if(a)return this.len;
					 break;
			default:K++;
		}
	return K;
}
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
	while(K<this.len)if(this.s.charAt(K)=='('){K++;K=this.parseVariation(K);}else K++;
}
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
}
mxG.R.prototype.init=function(DX,DY)
{
	this.play=this.setup=0;
	this.DX=DX;
	this.DY=DY;
	this.ban=[];
	for(let i=1;i<=this.DX;i++)
	{
		this.ban[i]=[];
		for(let j=1;j<=this.DY;j++)this.ban[i][j]=0;
	}
	this.prisoners={B:[0],W:[0]};
}
mxG.R.prototype.inGoban=function(x,y)
{
	return (x>=1)&&(y>=1)&&(x<=this.DX)&&(y<=this.DY);
}
mxG.R.prototype.lib=function(nat,x,y)
{
	if(!this.inGoban(x,y))return 0;
	if(this.nat[this.ban[x][y]]=="E")return 1;
	if(this.nat[this.ban[x][y]]!=nat)return 0;
	let k,km=this.s.length;
	for(k=0;k<km;k++)if((this.s[k].x==x)&&(this.s[k].y==y))return 0;
	this.s[km]={x:x,y:y};
	if(this.lib(nat,x,y-1)||this.lib(nat,x+1,y)||this.lib(nat,x,y+1)||this.lib(nat,x-1,y))
		return 1;
	return 0;
}
mxG.R.prototype.capture=function(nat,x,y)
{
	this.s=[];
	if(this.lib(nat,x,y))return 0;
	let n=this.s.length,pt;
	while(this.s.length)
	{
		pt=this.s.pop();
		this.o[this.ban[pt.x][pt.y]]=this.play;
		this.ban[pt.x][pt.y]=0;
	}
	return n;
}
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
			if(p)this.prisoners[pNat][m]+=p;
			else this.prisoners[oNat][m]+=this.capture(pNat,x,y);
		}
		else
		{
			this.setup=m;
			this.ban[x][y]=(pNat!="E"?m:0);
		}
	}
	else this.x[m]=this.y[m]=0;
}
mxG.R.prototype.back=function(play)
{
	this.init(this.DX,this.DY);
	for(let k=1;k<=play;k++)this.place(this.act[k]+this.nat[k],this.x[k],this.y[k]);
}
mxG.R.prototype.isOccupied=function(x,y)
{
	return this.nat[this.ban[x][y]]!="E";
}
mxG.R.prototype.isOnlyOne=function(k,nat)
{
	let x=this.x[k],y=this.y[k];
	return !(((x>1)&&(this.nat[this.ban[x-1][y]]==nat))
	||((y>1)&&(this.nat[this.ban[x][y-1]]==nat))
	||((x<this.DX)&&(this.nat[this.ban[x+1][y]]==nat))
	||((y<this.DY)&&(this.nat[this.ban[x][y+1]]==nat)));
}
mxG.R.prototype.hasOnlyOneLib=function(k)
{
	let n=0,x=this.x[k],y=this.y[k];
	if((x>1)&&(this.nat[this.ban[x-1][y]]=="E"))n++;
	if((y>1)&&(this.nat[this.ban[x][y-1]]=="E"))n++;
	if((x<this.DX)&&(this.nat[this.ban[x+1][y]]=="E"))n++;
	if((y<this.DY)&&(this.nat[this.ban[x][y+1]]=="E"))n++;
	return n==1;
}
mxG.R.prototype.onlyOneCaptured=function(k,nat)
{
	return (this.prisoners[nat][k]-this.prisoners[nat][k-1])==1;
}
mxG.R.prototype.isKo=function(nat,x,y)
{
	let m=this.play;
	if(m<4)return 0;
	let pNat=nat.slice(-1),
		oNat=((pNat=="B")?"W":((pNat=="W")?"B":"E")),
		xpred=this.x[m],ypred=this.y[m];
	return (((xpred==(x-1))&&(ypred==y))||((xpred==x)&&(ypred==(y-1)))
			||((xpred==(x+1))&&(ypred==y))||((xpred==x)&&(ypred==(y+1))))
			&&this.isOnlyOne(m,oNat)
			&&this.hasOnlyOneLib(m)
			&&this.onlyOneCaptured(m,oNat)
			&&(pNat==this.nat[m-1])
			&&(oNat==this.nat[m]);
}
mxG.R.prototype.canCapture=function(nat,x,y)
{
	this.s=[];
	if(this.lib(nat,x,y))return 0;
	return this.s.length;
}
mxG.R.prototype.isLib=function(x,y)
{
	return this.inGoban(x,y)&&(this.nat[this.ban[x][y]]=="E");
}
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
		||!this.canCapture(pNat,x,y))s=0;
	this.ban[x][y]=exBan;
	this.nat[m+1]=exNat;
	return s;
}
mxG.R.prototype.isValid=function(nat,x,y)
{
	return (!x&&!y)
		||!(this.inGoban(x,y)
			&&(this.isOccupied(x,y)||this.isKo(nat,x,y)||this.isSuicide(nat,x,y)));
}
mxG.R.prototype.getBanNum=function(x,y){return this.ban[x][y];}
mxG.R.prototype.getBanNat=function(x,y){return this.nat[this.ban[x][y]];}
mxG.R.prototype.getNat=function(n){return this.nat[n];}
mxG.R.prototype.getX=function(n){return this.x[n];}
mxG.R.prototype.getY=function(n){return this.y[n];}
mxG.R.prototype.getAct=function(n){return this.act[n];}
mxG.R.prototype.getPrisoners=function(nat){return this.prisoners[nat][this.play];}
mxG.R.prototype.getO=function(n){return this.o[n];}
}
if(!mxG.S)
{
mxG.fr(" at "," en ");
mxG.fr("Arrow keys to explore the goban","Touches fléchées pour explorer le goban");
mxG.fr("Black","Noir");
mxG.fr("Black territory mark","Marque de territoire noir");
mxG.fr("Circle","Cercle");
mxG.fr("Cursor on","Curseur sur");
mxG.fr("Empty goban","Goban vide");
mxG.fr("Goban","Goban");
mxG.fr("Last played move","Dernier coup joué");
mxG.fr("Mark","Marque");
mxG.fr("No move","Pas de coup");
mxG.fr("Number of black stones","Nombre de pierres noires");
mxG.fr("Number of marks or labels","Nombre de marques ou étiquettes");
mxG.fr("Number of white stones","Nombre de pierres blanches");
mxG.fr("Partial view","Vue partielle");
mxG.fr("pass","passe");
mxG.fr("Square","Carré");
mxG.fr("Triangle","Triangle");
mxG.fr("Variation","Variation");
mxG.fr("Variation on focus","Variation ayant le focus");
mxG.fr("White","Blanc");
mxG.fr("White territory mark","Marque de territoire blanc");
mxG.S=function(p)
{
	this.p=p;
	this.d=23;
	this.ff="Arial,sans-serif";
	this.fs=14*this.d/23;
	this.fw=400;
	this.e4ya="3";
	this.r4star="2.5";
	this.sw4grid="1";
	this.sw4mark="1";
	this.sw4stone="1";
	this.sw4text="0";
	this.stoneShadowWidth=1;
	this.glc="#000";
	this.xmlnsUrl="http:/"+"/www.w3.org/2000/svg";
	this.xlinkUrl="http:/"+"/www.w3.org/1999/xlink";
	this.xmlns=` xmlns="${this.xmlnsUrl}"`;
	this.xlink=` xmlns:xlink="${this.xlinkUrl}"`;
}
mxG.S.prototype.star2=function(z,A,B,C,D,E,g,f)
{
	let o=0,q=Math.round((D-g)/10);
	for(let r=q;r>1;r--)
	{
		if((D>(r*10+g))&&!(E%f(r)))
		{
			let F=Math.round(E/f(r));
			for(let s=1;s<r;s++){if((z==(A+s*F))||(z==(B-s*F))){o=1;break;}}
			break;
		}
	}
	return o;
}
mxG.S.prototype.star=function(x,y)
{
	let n=!this.p.yaOn;
	for(let k of [0,1])
	{
		let o=0,z=k?y:x,D=k?this.DY:this.DX,A=4,B=D+1-A,C=(D+1)>>1;
		if((D>21)&&n)
		{
			if(D&1)o=this.star2(z,A,B,C,D,C-A,6,r=>r);
			else o=this.star2(z,A,B,C,D,B-A,1,r=>2*r-1);
		}
		if((D>16)&&(D&1)&&n){if((z==A)||(z==B)||(z==C))o=1;}
		else if(D>11){if((z==A)||(z==B)||((z==C)&&(D&1)&&(x==y)))o=1;}
		else if((z==C)&&(D&1))o=1;
		if(!o)return 0;
	}
	return 1;
}
mxG.S.prototype.i2x=function(i){return this.dw*(i-this.xl+0.5)+this.gbsxl;}
mxG.S.prototype.j2y=function(j){return this.dh*(j-this.yt+0.5)+this.gbsyt;}
mxG.S.prototype.isLabel=function(m){return /^\(*\|.*\|\)*$/.test(m);}
mxG.S.prototype.isMark=function(m){return /^\(*_(CR|MA|SQ|TR)_\)*$/.test(m);}
mxG.S.prototype.isVariation=function(m){return /^\(.*\)$/.test(m);}
mxG.S.prototype.isVariationOnFocus=function(m){return /^\(\([^()]*\)\)$/.test(m);}
mxG.S.prototype.removeLabelDelimiters=function(m)
{
	return m.replace(/^(\(*)\|(.*)\|(\)*)$/,"$1$2$3");
}
mxG.S.prototype.removeVariationDelimiters=function(m)
{
	return m.replace(/^\(+([^()]*)\)+$/,"$1");
}
mxG.S.prototype.makeText=function(txt,x,y,c,o)
{
	let s=`<text`;
	if(o.ij)s+=` data-maxigos-ij="${o.ij}"`;
	if(!o.ignoreTextAnchor)s+=` text-anchor="middle"`;
	if(c&&!o.ignoreFillAndStroke)
	{
		s+=` fill="${c}"`;
		if(this.sw4text!="0")s+=` stroke="${c}" stroke-width="${this.sw4text}"`;
	}
	if(o.cls)s+=` class="${o.cls}"`;
	txt+=``;
	if(txt.length>1)
	{
		if(o.vertical)
		{
			s+=` transform="translate(0,${y-2})`
			+` scale(1,0.${(txt.length>2)?33:5})`
			+` translate(0,${-y})"`
			+` writing-mode="vertical-rl"`;
		}
		else
		{
			let sx=(txt.length>2)?0.8:0.9;
			s+=` transform="matrix(${sx},0,0,1,${Math.round(x*(1-sx)*100)/100},0)"`;
		}
	}
	s+=` x="${x}" y="${y+5}">${txt}</text>`;
	return s;
}
mxG.S.prototype.make2dStone=function(c,x,y,r,o)
{
	let s=`<circle class="mx${c}"`;
	if(o.opacity<1)s+=`fill-opacity="${o.opacity}"`;
	if(!o.ignoreFillAndStroke)
	{
		s+=` fill="${(c=="Black")?"#000":"#fff"}"`
		+` stroke="${((c=="Black")&&o.whiteStroke4Black)?"#fff":"#000"}"`
		+` stroke-width="${this.sw4stone}"`;
	}
	s+=` cx="${x}" cy="${y}" r="${r-(this.sw4stone-1)/2}"/>`;
	return s;
}
mxG.S.prototype.makeStoneShadow=function(c,x,y,r,o)
{
	let e=this.stoneShadowWidth,s=`<circle`;
	if(!o.ignoreFillAndStroke)s+=` fill="#000" opacity="0.2"`;
	return s+` cx="${x+e}" cy="${y+e}" r="${r}"/>`;
}
mxG.S.prototype.make3dStone1=function(c,x,y,r,o)
{
	let e=this.stoneShadowWidth,s=``;
	if(o.stoneShadowOn)s+=this.makeStoneShadow(c,x,y,r,o);
	s+=`<circle class="mx${c}"`;
	if(o.opacity<1)s+=`fill-opacity="${o.opacity}"`;
	if(!o.ignoreFillAndStroke)s+=` fill="url(#${this.p.n+c[0]}RG)"`;
	return s+` cx="${x}" cy="${y}" r="${r}"/>`;
}
mxG.S.prototype.make3dStone2=function(c,x,y,r,o)
{
	let a,s=``;
	if(o.stoneShadowOn)s+=this.makeStoneShadow(c,x,y,r,o);
	s+=`<circle class="mx${c}"`;
	if(o.opacity<1)s+=` fill-opacity="${o.opacity}"`;
	s+=` fill="url(#${this.p.n+c[0]}RGA)" cx="${x}" cy="${y}" r="${r}"/>`
	+`<circle class="mx${c}2"`;
	if(o.opacity<1)s+=` fill-opacity="${o.opacity}"`;
	a=(c==`White`)?Math.floor(x*this.p.alea+y)%8:``;
	return s+` fill="url(#${this.p.n+c[0]}RGB${a})" cx="${x}" cy="${y}" r="${r}"/>`;
}
mxG.S.prototype.makeStone=function(c,x,y,r,o)
{
	if(o.in3dOn)return this["make3dStone"+(this.p.specialStoneOn?2:1)](c,x,y,r,o);
	return this.make2dStone(c,x,y,r,o);
}
mxG.S.prototype.makeAloneStone=function(nat,n,o)
{
	let s,d=this.d,dd=d+2,x=dd/2,y=dd/2,z;
	z=(o.in3dOn&&o.stoneShadowOn)?this.stoneShadowWidth:0;
	s=`<svg viewBox="${-z} ${-z} ${dd+2*z} ${dd+2*z}" width="40" height="40"`
	+` font-family="${this.ff}" font-size="${this.fs}" font-weight="${this.fw}"`;
	if(o.role)s+=` role="${o.role}"`;
	if(!o.title)s+=` aria-hidden="true"`;
	s+=`>`;
	if(o.title)s+=`<title>${o.title}</title><g aria-hidden="true">`;
	o.opacity=1;
	s+=this.makeStone((nat=="B")?"Black":"White",x,y,d/2,o);
	if(n)s+=this.makeText(n,dd/2,dd/2,(nat=="B")?"White":"Black",o);
	if(o.title)s+=`</g>`;
	return s+`</svg>`;
}
mxG.S.prototype.makeMarkOnLast=function(c,x,y,o)
{
	let z=4;
	return `<rect class="${o.cls}" fill="${c}" x="${x-z}" y="${y-z}"`
	+`width="${z*2}" height="${z*2}"/>`;
}
mxG.S.prototype.makeMark=function(c,x,y,o)
{
	let s,z=6;
	s=`<path class="${o.cls}"`;
	if(o.ij)s+=` data-maxigos-ij="${o.ij}"`;
	return s+` stroke-width="${this.sw4mark}" stroke="${c}" fill="none"`
	+` d="M${x-z} ${y-z}L${x+z} ${y+z}M${x-z} ${y+z}L${x+z} ${y-z}"/>`;
}
mxG.S.prototype.makeCircle=function(c,x,y,o)
{
	let s,z=6.5;
	s=`<circle class="${o.cls}"`;
	if(o.ij)s+=` data-maxigos-ij="${o.ij}"`;
	return s+` stroke-width="${this.sw4mark}" stroke="${c}" fill="none"`
	+` cx="${x}" cy="${y}" r="${z}"/>`;
}
mxG.S.prototype.makeTriangle=function(c,x,y,o)
{
	let s,z=7.5;
	s=`<polygon class="${o.cls}"`;
	if(o.ij)s+=` data-maxigos-ij="${o.ij}"`;
	return s+` stroke-width="${this.sw4mark}" stroke="${c}" fill="none"`
	+` points="${x} ${y-z} ${x-z} ${y+z*0.8} ${x+z} ${y+z*0.8}"/>`;
}
mxG.S.prototype.makeSquare=function(c,x,y,o)
{
	let s,z=6;
	s=`<rect class="${o.cls}"`;
	if(o.ij)s+=` data-maxigos-ij="${o.ij}"`;
	return s+` stroke-width="${this.sw4mark}" stroke="${c}" fill="none"`
	+` x="${x-z}" y="${y-z}" width="${z*2}" height="${z*2}"/>`;
}
mxG.S.prototype.makeTerritoryMark=function(a,x,y,o)
{
	let c=a.match(/_TB_/)?"Black":"White";
	if(this.p.territoryMark=="MA")return this.makeMark(c,x,y,o);
	o={opacity:1,in3dOn:this.in3dOn,stoneShadowOn:this.stoneShadowOn};
	return this.makeStone(c,x,y,5,o);
}
mxG.S.prototype.makeFocusMark=function(x,y)
{
	let z=this.d/2+1;
	return `<rect class="mxFocusMark"`
	+` stroke-width="${this.sw4grid}" stroke="${this.glc}" fill="none"`
	+` x="${x-z}" y="${y-z}" width="${z*2}" height="${z*2}"/>`;
}
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
		if(cls=="mxOnEmpty")o.ij=i+"_"+j;
		if(this.isMark(a))cls+=" mxMark";
		else if(this.isLabel(a))
		{
			cls+=" mxLabel";
			a=this.removeLabelDelimiters(a);
		}
		if(this.isVariation(a))
		{
			cls+=" mxVariation";
			if(this.isVariationOnFocus(a))cls+=" mxOnFocus";
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
}
mxG.S.prototype.k2katakana=function(ko)
{
	let k=this.DX-ko,s;
	s="イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセスンバボべど";
	return (k<s.length)?s.charAt(k):"";
}
mxG.S.prototype.k2kanji=function(k)
{
	let s="一二三四五六七八九十";
	if(k<11)return s.charAt(k-1);
	if(k<20)return "十"+s.charAt(k-11);
	return "";
}
mxG.S.prototype.k2okanji=function(s)
{
	let k,ko,a,an,b,bn,c,cn;
	s+="";
	k=parseInt(s);
	if(!k)return s;
	if(k<20)return this.k2kanji(k);
	a=Math.floor(k/100);
	b=Math.floor(k/10)-a*10;
	c=k-b*10-a*100;
	if(a==0)an="";
	else if(a==1)an="口";
	else if(a==2)an="△";
	else if(a==3)an="◯";
	else an="⊙";
	if(b==0)bn="";
	else if(b==1)bn="十";
	else if(b==2)bn="廾";
	else if(b==3)bn="卅";
	else bn=this.k2n(b);
	if(c==0)cn=(b<4)?"":"十";
	else if((b==c)&&(b>3))cn="〻";
	else cn=this.k2kanji(c);
	return an+bn+cn;
}
mxG.S.prototype.k2n=function(k)
{
	if(!this.latinCoordinates&&(this.p.oldJapaneseIndicesOn||this.p.japaneseIndicesOn))
		return this.k2okanji(k);
	return (this.DY+1-k)+``;
}
mxG.S.prototype.k2c=function(k)
{
	if(!this.latinCoordinates&&this.p.oldJapaneseIndicesOn)return this.k2katakana(k);
	if(!this.latinCoordinates&&this.p.japaneseIndicesOn)return k+``;
	let r=((k-1)%25)+1;
	return String.fromCharCode(r+((r>8)?65:64))+((k>25)?(k-r)/25:"");
}
mxG.S.prototype.getIndices=function(x,y)
{
	if(!this.p.hideLeftIndices&&(x==0)&&(y>0)&&(y<=this.DY))return this.k2n(y);
	if(!this.p.hideTopIndices&&(y==0)&&(x>0)&&(x<=this.DX))return this.k2c(x);
	if(!this.p.hideRightIndices&&(x==(this.DX+1))&&(y>0)&&(y<=this.DY))return this.k2n(y);
	if(!this.p.hideBottomIndices&&(y==(this.DY+1))&&(x>0)&&(x<=this.DX))return this.k2c(x);
	return "";
}
mxG.S.prototype.makeIndices=function()
{
	let i,j,m,o,c=this.glc,s,dx=this.grim+this.gripx,dy=this.grim+this.gripy;
	s=`<g class="mxIndices" fill="${c}"`;
	if(this.sw4text!="0")s+=` stroke="${c}" stroke-width="${this.sw4text}"`;
	s+=`>`;
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
	return s+`</g>`;
}
mxG.S.prototype.gridUnder=function(i,j,nat,str)
{
	if(str&&str.match(/(_TB_)|(_TW_)/))return 1;
	if((nat=="B")||(nat=="W")||str)return 0;
	return 1;
}
mxG.S.prototype.makeOneYa=function(i,j)
{
	let a=-(-this.e4ya),b=2*a,c=a+b,x=this.i2x(i),y=this.j2y(j);
	return `M${x+c} ${y+a}h${-b}v${b}M${x+c} ${y-a}h${-b}v${-b}`
		  +`M${x-c} ${y-a}h${b}v${-b}M${x-c} ${y+a}h${b}v${b}`;
}
mxG.S.prototype.makeOneStar=function(i,j)
{
	let rs=this.r4star,x=this.i2x(i),y=this.j2y(j),a=`A${rs} ${rs} 0 1 0 `;
	return `M${x-(-rs)} ${y}${a}${x-rs} ${y}${a}${x-(-rs)} ${y}Z`;
}
mxG.S.prototype.makeGrid=function(vNat,vStr)
{
	let s,m,i,j,k,x,y,a,gi;
	s=`<path class="mxGobanLines" stroke-width="${this.sw4grid}" stroke="${this.glc}" fill="none" d="`;
	for(i=this.xl;i<=this.xr;i++)
	{
		x=this.i2x(i);
		this.yGridMin=y=((this.yt==1)?this.dh/2:0)+this.gbsyt;
		s+=`M${x} ${y}`;
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
		s+=m+((m=="V")?"":(x+" "))+y;
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
		s+=m+x+((m=="H")?"":" "+y);
	}
	s+=`"/>`;
	s+=this.p.yaOn
		?`<path class="mxYaMarks" stroke-width="${this.sw4grid}" stroke="${this.glc}" fill="none" d="`
		:`<path class="mxStars" fill="${this.glc}" d="`;
	for(i=this.xl;i<=this.xr;i++)
		for(j=this.yt;j<=this.yb;j++)
			if(this.star(i,j))
			{
				k=this.p.xy(i,j);
				if(!this.p.eraseGridUnder||this.gridUnder(i,j,vNat[k],vStr[k]))
					s+=this.p.yaOn?this.makeOneYa(i,j):this.makeOneStar(i,j);
			}
	s+=`"/>`;
	return s;
}
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
	cls=`mxGobanBackground mx${r}Rect`;
	return `<rect class="${cls}" fill="none" stroke="none" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
}
mxG.S.prototype.getWRatio=function()
{
	let b=this.p.getE("GobanSvg").getBoundingClientRect();
	return this.w/b.width;
}
mxG.S.prototype.getHRatio=function()
{
	let b=this.p.getE("GobanSvg").getBoundingClientRect();
	return this.h/b.height;
}
mxG.S.prototype.getGxy=function(ev,s=0)
{
	let x,y,c=this.gc.firstChild.getMClick(ev);
	c.x=c.x*this.getWRatio()-this.gbsxl;
	c.y=c.y*this.getHRatio()-this.gbsyt;
	x=Math.floor(c.x/this.dw)+this.xl;
	y=Math.floor(c.y/this.dh)+this.yt;
	if(s)return {x:x,y:y};
	x=Math.max(Math.min(x,this.xr),this.xl);
	y=Math.max(Math.min(y,this.yb),this.yt);
	return {x:x,y:y};
}
mxG.S.prototype.makeGradient1=function(c)
{
	let b=(c=="Black"),r=b?50:100,
		c1=b?"#999":"#fff",c2=b?"#333":"#ccc",c3=b?"#000":"#333";
	return `<radialGradient id="${this.p.n+c[0]}RG"`
	+` class="mx${c[0]}RG"`
	+` cx="33%" cy="33%" r="${r}%">`
	+`<stop stop-color="${c1}" offset="0"/>`
	+`<stop stop-color="${c2}" offset="0.5"/>`
	+`<stop stop-color="${c3}" offset="1"/>`
	+`</radialGradient>`;
}
mxG.S.prototype.makeShellEffect=function(o)
{
	let s1=`<stop stop-color="#000" offset="`,s2=`" stop-opacity="`,s3=`"/>`;
	return s1+(o-3)/100+s2+"0"+s3
	+s1+(o-2)/100+s2+"0.0125"+s3
	+s1+o/100+s2+"0.0375"+s3
	+s1+(o+2)/100+s2+"0.0125"+s3
	+s1+(o+3)/100+s2+"0"+s3;
}
mxG.S.prototype.makeGradient2=function(c)
{
	let s=this.makeGradient1(c);
	s+=`<radialGradient id="${this.p.n+c[0]}RGA" class="mx${c[0]}RGA"`;
	if(c=="Black")
	{
		s+=` cx="50%" cy="50%" r="50%">`
		+`<stop stop-color="#aaa" offset="0.8"/>`
		+`<stop stop-color="#666" offset="1"/>`;
	}
	else
	{
		s+=` cx="33%" cy="33%" r="100%">`
		+`<stop stop-color="#fff" offset="0"/>`
		+`<stop stop-color="#ccc" offset="0.5"/>`
		+`<stop stop-color="#333" offset="1"/>`;
	}
	s+=`</radialGradient>`;
	if(c=="Black")
	{
		s+=`<radialGradient id="${this.p.n+c[0]}RGB" class="mx${c[0]}RGB"`
		+` cx="90%" cy="90%" r="100%">`
		+`<stop stop-color="#000" offset="0.6" stop-opacity="1"/>`
		+`<stop stop-color="#000" offset="1" stop-opacity="0"/>`
		+`</radialGradient>`;
	}
	else
	{
		for(let k=0;k<8;k++)
		{
			s+=`<radialGradient id="${this.p.n+c[0]}RGB${k}" class="mx${c[0]}RGB"`;
			switch(k)
			{
				case 0:s+=` cx="0%" cy="100%" r="120%">`;break;
				case 1:s+=` cx="50%" cy="100%" r="120%">`;break;
				case 2:s+=` cx="100%" cy="100%" r="120%">`;break;
				case 3:s+=` cx="100%" cy="50%" r="120%">`;break;
				case 4:s+=` cx="100%" cy="0%" r="120%">`;break;
				case 5:s+=` cx="50%" cy="0%" r="120%">`;break;
				case 6:s+=` cx="0%" cy="0%" r="120%">`;break;
				case 7:s+=` cx="0%" cy="50%" r="120%">`;break;
			}
			for(let l=5;l<100;l=l+15)s+=this.makeShellEffect(l);
			s+=`</radialGradient>`;
		}
	}
	return s;
}
mxG.S.prototype.makeGradient=function(c)
{
	return this["makeGradient"+(this.p.specialStoneOn?2:1)](c);
}
mxG.S.prototype.makeGoban=function()
{
	let s,e=this.p.getE("Global"),n=this.p.n;
	this.vNat=[];
	this.vStr=[];
	this.w=this.dw*(this.xr-this.xl+1)+this.gbsxl+this.gbsxr;
	this.h=this.dh*(this.yb-this.yt+1)+this.gbsyt+this.gbsyb;
	e.style.setProperty("--gobanIntrinsicWidth",this.w);
	e.style.setProperty("--gobanIntrinsicHeight",this.h);
	s=`<svg`+this.xmlns+this.xlink;
	s+=` id="${n}GobanSvg" class="mxGobanSvg"`
	+` viewBox="0 0 ${this.w} ${this.h}" width="${this.w}" height="${this.h}"`
	+` font-family="${this.ff}" font-size="${this.fs}" font-weight="${this.fw}"`
	+` stroke-linecap="square" text-anchor="middle"`
	+` tabindex="0" role="img" aria-live="assertive" aria-busy="true">`;
	if(this.in3dOn)
		s+=`<defs>${this.makeGradient("Black")+this.makeGradient("White")}</defs>`;
	s+=`<g aria-hidden="true">`;
	s+=this.makeBackground("Whole");
	s+=this.makeBackground("Outer");
	if(this.indicesOn)s+=this.makeIndices();
	return s+this.makeBackground("Inner")
	+`<g id="${n}Grid" class="mxGrid"></g>`
	+`<g id="${n}Points" class="mxPoints"></g>`
	+`<g id="${n}Focus" class="mxFocus"></g>`
	+`</g></svg>`;
}
mxG.S.prototype.setInternalParams=function()
{
	let a=this.stretching.split(","),
		in3dWS=-(-a[0]),in3dHS=-(-a[1]),in2dWS=-(-a[2]),in2dHS=-(-a[3]);
	this.dw=this.d+(this.in3dOn?(in3dWS?in3dWS:0):(in2dWS?in2dWS:0));
	this.dh=this.d+(this.in3dOn?(in3dHS?in3dHS:0):(in2dHS?in2dHS:0));
	this.gripx=this.grip;
	if(this.in3dOn&&Number.isInteger(in3dWS)&&(in3dWS&1))this.gripx-=0.5;
	else if(!this.in3dOn&&Number.isInteger(in2dWS)&&(in2dWS&1))this.gripx-=0.5;
	this.gripy=this.grip;
	if(this.in3dOn&&Number.isInteger(in3dHS)&&(in3dHS&1))this.gripy-=0.5;
	else if(!this.in3dOn&&Number.isInteger(in2dHS)&&(in2dHS&1))this.gripy-=0.5;
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
}
mxG.S.prototype.init=function()
{
	let p=this.p;
	this.gc=p.gc;
	this.grip=p.gridPadding;
	this.grim=p.gridMargin;
	this.gobp=p.gobanPadding;
	this.gobm=p.gobanMargin;
}
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
}
mxG.S.prototype.eraseOneVerticalGridSegment=function(i,y)
{
	let e,d0,d1,d2,a,b,k,km,x,y1,y2,f1,f2;
	x=this.i2x(i);
	e=this.p.getE("Grid").querySelector("path");
	d0=e.getAttributeNS(null,"d");
	re=new RegExp(`M${x} ${this.yGridMin}[^H]*?V${this.yGridMax}`);
	d1=d0.match(re)[0];
	a=d1.match(/[^M0-9.-][0-9.-]+/g);
	km=a.length;
	b=[];
	for(k=0;k<km;k++)
	{
		b[k]=parseFloat(a[k].substring(1));
		a[k]=a[k].substring(0,1);
		if(a[k]==" ")a[k]="M";
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
				if(a[k]=="V")d2+="V"+y1;
				f1=1;
			}
			else
			{
				if(a[k]=="V")d2+="V"+b[k];
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
			if(a[k]=="V")d2+="V"+b[k];
			else d2+="M"+x+" "+b[k];			
		}
	}
	if(d1!=d2)e.setAttributeNS(null,"d",d0.replace(d1,d2));
}
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
				e=this.p.getE("Grid").querySelector(this.p.yaOn?".mxYaMarks":".mxStars");
				if(e)
				{
					let s=this.p.yaOn?this.makeOneYa(ik,j):this.makeOneStar(ik,j),
						d=e.getAttributeNS(null,"d");
					d=d.replace(s,"");
					e.setAttributeNS(null,"d",d);
				}
			}
		}
	}
}
mxG.S.prototype.eraseLongGridSegment=function(i,j,x,y,w)
{
	let e,d0,d1,d2,a,b,k,km,x1,x2,m,re;
	e=this.p.getE("Grid").firstChild;
	d0=e.getAttributeNS(null,"d");
	re=new RegExp(`M${this.xGridMin} ${y}[^V]+?H${this.xGridMax}`);
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
				if(a[k]=="H")d2+="H"+x1;
				f1=1;
			}
			else
			{
				if(a[k]=="H")d2+="H"+b[k];
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
			if(a[k]=="H")d2+="H"+b[k];
			else d2+="M"+b[k]+" "+y;
		}
	}
	if(d1!=d2)e.setAttributeNS(null,"d",d0.replace(d1,d2));
	this.eraseVerticalGridSegments(i,j,x,y,w);
}
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
		b.setAttribute("class","mxPointBackground "+a.classList.value);
		a.parentNode.insertBefore(b,a);
		if(this.p.eraseGridUnder&&(w>this.dw))this.eraseLongGridSegment(i,j,x,y,w);
	}
}
mxG.S.prototype.audouard=function(i,j)
{
	let s,DX=this.DX,DY=this.DY,Cx=(DX+1)/2,Cy=(DY+1)/2;
	if((i<=Cx)&&(j<Cy)){s="a ";if(i==Cx)s+=j;else s+=i+" "+j;}
	else if((i>Cx)&&(j<=Cy)){s="b ";if(j==Cy)s+=(DX+1-i);else s+=(DX+1-i)+" "+j;}
	else if((i>=Cx)&&(j>Cy)){s="c ";if(i==Cx)s+=(DY+1-j);else s+=(DX+1-i)+" "+(DY+1-j);}
	else if((i<Cx)&&(j>=Cy)){s="d ";if(j==Cy)s+=i;else s+=i+" "+(DY+1-j);}
	else s=Cy;
	return s;
}
mxG.S.prototype.makeOneInfoFromGameTree=function(aN,withNum)
{
	let nat,s="",x,y;
	if(aN.P["B"])nat="B";else if(aN.P["W"])nat="W";else nat="E";
	if((nat=="B")||(nat=="W"))
	{
		s+=this.p.local(nat=="B"?"Black":"White");
		if(withNum)s+=` '${this.p.getAsInTreeNum(aN)}'`;
		if(aN.P[nat]&&aN.P[nat][0].match(/^[a-zA-Z]{2}$/))
		{
			x=aN.P[nat][0].c2n(0);
			y=aN.P[nat][0].c2n(1);
		}
		else x=y=0;
		if(x&&y)
		{
			s+=this.p.local(" at ");
			if(localStorage.getItem("Audouard")=="on")s+=`'${this.audouard(x,y)}'`;
			else
			{
				if(this.p.lang!="ja")this.latinCoordinates=1;
				s+=`'${this.k2c(x)+this.k2n(y)}'`;
				if(this.p.lang!="ja")this.latinCoordinates=0;
			}
		}
		else s+=" "+this.p.local("pass");
	}
	else s+=this.p.local("No move");
	return s;
}
mxG.S.prototype.makeOneInfoFromGoban=function(i,j,k,nat,str,sayLast)
{
	let s="",last=0,ojio,jio;
	if((nat=="B")||(nat=="W"))s+=this.p.local(nat=="B"?"Black":"White");
	if(s&&str)s+=" ";
	if(str)
	{
		if(str.match(/_ML_/))last=1;
		else if(str.match(/_TB_/))s+=this.p.local("Black territory mark");
		else if(str.match(/_TW_/))s+=this.p.local("White territory mark");
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
				if(this.isLabel(str))str=this.removeLabelDelimiters(str);
				s+=`'${str}'`;
			}
		}
	}
	if(s)s+=this.p.local(" at ");
	if(localStorage.getItem("Audouard")=="on")s+=`'${this.audouard(i,j)}'`;
	else
	{
		if(this.p.lang!="ja")this.latinCoordinates=1;
		s+=`'${this.k2c(i)+this.k2n(j)}'`;
		if(this.p.lang!="ja")this.latinCoordinates=0;
	}
	if(sayLast&&last)s+=". "+this.p.local("Last played move");
	return s;
}
mxG.S.prototype.makeCommentForDesc=function()
{
	if(this.p.justMovedCursor)
	{
		this.p.justMovedCursor=0;
		if(this.p.hasC("Solve"))
		{
			this.p.clearVirtualFlag();
			this.p.updateSolveComment();
		}
		return "";
	}
	if(this.p.hasC("Solve"))return " "+this.p.getSolveCoreComment(this.p.cN);
	if(this.p.hasC("Comment"))return " "+this.p.getCoreComment(this.p.cN);
	return "";
}
mxG.S.prototype.makeShortGobanDesc=function(status)
{
	let s="",xf,yf,k,nat,str;
	if((xf=this.p.xFocus)&&(yf=this.p.yFocus))
	{
		k=this.p.xy(xf,yf);
		s=this.p.local("Cursor on")+" ";
		s+=this.makeOneInfoFromGoban(xf,yf,k,this.vNat[k],this.vStr[k],1);
	}
	if(this.p.whenVirtualNext)
	{
		let x,y;
		x=this.p.whenVirtualNext.x;
		y=this.p.whenVirtualNext.y;
		k=this.p.xy(x,y);
		s=this.makeOneInfoFromGoban(x,y,k,this.vNat[k],this.vStr[k],0)+". "+s;
	}
	if(this.p.justMovedInTree)
	{
		for(let i=this.xl;i<=this.xr;i++)
			for(let j=this.yt;j<=this.yb;j++)
			{
				k=this.p.xy(i,j);
				nat=this.vNat[k];
				str=this.vStr[k];
				if(str&&(this.isMark(str)||this.isLabel(str)||this.isVariation(str)))
					s+=". "+this.makeOneInfoFromGoban(i,j,k,nat,str,0);
		}
		if(status!=5)this.p.justMovedInTree=0;
	}
	return s+".";
}
mxG.S.prototype.makeGobanTitle=function()
{
	let s=this.p.local("Goban")+" "+this.DX+"x"+this.DY;
	if((this.xl!=1)||(this.yt!=1)||(this.xr!=this.DX)||(this.yb!=this.DY))
	{
		s+=". "+this.p.local("Partial view");
		if(localStorage.getItem("Audouard")=="on")
		{
			s+=` '${this.audouard(this.xl,this.yb)}'`;
			s+=` '${this.audouard(this.xr,this.yt)}'`;
		}
		else
		{
			s+=` '${this.k2c(this.xl)+this.k2n(this.yb)}'`;
			s+=` '${this.k2c(this.xr)+this.k2n(this.yt)}'`;
		}
	}
	return s+".";
}
mxG.S.prototype.makeWhatIsOnTheGoban=function(nb,nw,ne)
{
	let s="";
	if(nb)s+=this.p.local("Number of black stones")+" "+nb;
	if(s&&nw)s+=". ";
	if(nw)s+=this.p.local("Number of white stones")+" "+nw;
	if(s&&ne)s+=". ";
	if(ne)s+=this.p.local("Number of marks or labels")+" "+ne;
	return s;
}
mxG.S.prototype.makeLongGobanDesc=function()
{
	let s="",a="",i,j,k,nat,str,nb=0,nw=0,ne=0,
		wgd=localStorage.getItem("Whole goban desc");
	for(i=this.xl;i<=this.xr;i++)
		for(j=this.yb;j>=this.yt;j--)
		{
			k=this.p.xy(i,j);
			nat=this.vNat[k];
			str=this.vStr[k];
			if((nat=="B")||(nat=="W")||str)
			{
				if(!wgd||(wgd=="on"))
				{
					if(a)a+=". ";
					a+=this.makeOneInfoFromGoban(i,j,k,nat,str,0);
				}
				if(nat=="B")nb++;
				else if(nat=="W")nw++;
				else ne++;
			}
		}
	if(!(nb+nw+ne))s=this.p.local("Empty goban");
	if(s)s+=". ";
	s+=this.p.local("Arrow keys to explore the goban")+". ";
	if((wgd=="off")&&(nb+nw+ne))s+=this.makeWhatIsOnTheGoban(nb,nw,ne);
	else s+=a;
	return s+".";
}
mxG.S.prototype.setGobanFocusTitleDesc=function(status)
{
	if(this.p.noLabelledBy)return;
	let x=this.p.xFocus,y=this.p.yFocus,z,g=this.p.getE("GobanSvg");
	if(!this.p.inView(x,y)){x=0;y=0;}
	if(x&&y)this.p.getE("Focus").innerHTML=this.makeFocusMark(this.i2x(x),this.j2y(y));
	else this.p.getE("Focus").innerHTML="";
	if((g==document.activeElement)&&(status!=6))
		g.setAttribute("aria-label",this.makeShortGobanDesc(status)+this.makeCommentForDesc());
	else
		g.setAttribute("aria-label",this.makeGobanTitle()+" "+this.makeShortGobanDesc(status)+" "+this.makeLongGobanDesc());
}
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
				if(nat=="B")s2+=this.makeStone(c,x,y,this.d/2,o);
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
					if(nat=="B")s4+=this.makeText(str,x,y,c,o);
					else s5+=this.makeText(str,x,y,c,o);
				}
			}
		}
	if(s1)
		s+=`<g class="mxStoneShadows" fill="#000" opacity="0.2" stroke="none">${s1}</g>`;
	if(s2)
	{
		s+=`<g class="mxBlackStones"`;
		if(this.in3dOn)
		{
			if(!this.p.specialStoneOn)s+=` fill="url(#${this.p.n}BRG)"`;
			s+=` stroke="none"`;
		}
		else s+=` fill="#000" stroke="#000" stroke-width="${this.sw4stone}"`;
		s+=`>${s2}</g>`;
	}
	if(s3)
	{
		s+=`<g class="mxWhiteStones"`;
		if(this.in3dOn)
		{
			if(!this.p.specialStoneOn)s+=` fill="url(#${this.p.n}WRG)"`;
			s+=` stroke="none"`;
		}
		else s+=` fill="#fff" stroke="#000" stroke-width="${this.sw4stone}"`;
		s+=`>${s3}</g>`;
	}
	if(s4)
	{
		s+=`<g class="mxBlackStoneNumbers" fill="#fff"`;
		if(this.sw4text!="0")s+=` stroke="#fff" stroke-width="${this.sw4text}"`;
		s+=`>${s4}</g>`;
	}
	if(s5)
	{
		s+=`<g class="mxWhiteStoneNumbers" fill="#000"`;
		if(this.sw4text!="0")s+=` stroke="#000" stroke-width="${this.sw4text}"`;
		s+=`>${s5}</g>`;
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
	if(s6)s+=`<g class="mxMarksAndLabels">${s6}</g>`;
	this.p.getE("Points").innerHTML=s;
	for(i=this.xl;i<=this.xr;i++)
		for(j=this.yt;j<=this.yb;j++)
		{
			k=this.p.xy(i,j);
			nat=this.vNat[k];
			str=this.vStr[k];
			if(str&&(nat!="B")&&(nat!="W"))this.addPointBackground(i,j,nat,str);
		}
	this.setGobanFocusTitleDesc(5);
}
mxG.S.prototype.makeBR=function(x)
{
	return `<rect x="${x}" y="0" width="24" height="128"/>`;
}
mxG.S.prototype.makeBT=function(x,a)
{
	let z=x+a*52;
	return `<polygon points="${x} 64 ${z} 128 ${z} 0"/>`;
}
mxG.S.prototype.makeBI=function(a)
{
	let b=` role="presentation" aria-hidden="true"`;
	return `<svg viewBox="0 0 128 128" width="40" height="40"${b}>${a}</svg>`;
}
}
if(!mxG.G)
{
mxG.fr("_","");
mxG.en("_","");
mxG.G=function(k,b)
{
	this.k=k;
	this.n="d"+k;
	this.g=`mxG.D[${k}]`;
	this.a={};
	this.b=b;
	this.c=[];
	this.config="";
	this.theme="";
	this.j=document.currentScript;
}
mxG.G.prototype.getE=function(id){return document.getElementById(this.n+id);}
mxG.G.prototype.local=function(s)
{
	if(mxG.Z[this.lang]&&(mxG.Z[this.lang][s]!==undefined))return mxG.Z[this.lang][s];
	if(mxG.Z["en"][s]!==undefined)return mxG.Z["en"][s];
	return s;
}
mxG.G.prototype.alias=function(s,t)
{
	if(mxG.Z[this.lang]&&this[t]&&(mxG.Z[this.lang][this[t]]!==undefined))
		return mxG.Z[this.lang][this[t]];
	if(mxG.Z["en"][this[t]]!==undefined)
		return mxG.Z["en"][this[t]];
	return this.local(s);
}
mxG.G.prototype.build=function(x,a)
{
	let f="build"+x;
	if(mxG.Z[this.lang]&&mxG.Z[this.lang][f])return mxG.Z[this.lang][f](a);
	if(this[f])return this[f](a);
	return a+"";
}
mxG.G.prototype.hasC=function(a)
{
	for(let z of this.c)if(z==a)return 1;
	return 0;
}
mxG.G.prototype.kidOnFocus=function(aN){return aN.Focus?aN.Kid[aN.Focus-1]:null;}
mxG.G.prototype.enableBtn=function(b)
{
	if(this.hasC("Score")&&this.canPlaceScore)return;
	let e=this.getE(b+"Btn");
	if(e)e.disabled=false;
}
mxG.G.prototype.disableBtn=function(b)
{
	let e=this.getE(b+"Btn");
	if(e)e.disabled=true;
}
mxG.G.prototype.addBtnClickListener=function(b)
{
	let k=this.k;
	this.getE(b+"Btn").addEventListener("click",function(){mxG.D[k]["do"+b]();});
}
mxG.G.prototype.addBtn=function(e,b)
{
	let k=this.k,a=document.createElement("button");
	a.id=this.n+b.n+"Btn";
	if(b.t)a.title=b.t;
	if(b.v)a.innerHTML=b.v;
	if(b.tabindex)a.setAttribute("tabindex",b.tabindex);
	a.classList.add("mxBtn",`mx${b.n}Btn`);
	if(b.first)e.prepend(a);else e.appendChild(a);
	a.addEventListener("click",function(){mxG.D[k]["do"+b.n]();});
}
mxG.G.prototype.createBtn=function(n,a="")
{
	let v=this.alias(a?a:n,n.lcF()+"Alias"),
		t=this.local(a?a:n),
		s=`<button class="mxBtn mx${n}Btn" id="${this.n+n}Btn"`;
	if(v!=t)s+=` title="${t}"`;
	s+=`>${v}</button>`;
	return s;
}
mxG.G.prototype.unselectBtn=function(btn)
{
	let e=this.getE(btn+"Btn");
	if(e)e.classList.remove("mxSelectedBtn");
}
mxG.G.prototype.selectBtn=function(btn)
{
	let e=this.getE(btn+"Btn");
	if(e)e.classList.add("mxSelectedBtn");
}
mxG.G.prototype.doDialog=function(name,content,btns)
{
	let dialog=this.getE(name+"Dialog"),b=btns;
	if(!dialog)
	{
		let s;
		dialog=document.createElement("dialog");
		dialog.id=this.n+name+"Dialog";
		dialog.classList.add(`mx${name}Dialog`);
		s=`<form method="dialog">`
		+`<fieldset class="mxContentFieldset"></fieldset>`
		+`<fieldset class="mxMenuFieldset">`;
		for(let a of b)
		{
			a.v=a.v?a.v:a.n;
			s+=`<button value="${a.v}">${this.local(a.n)}</button>`;
		}
		dialog.mxParent=this;
		dialog.addEventListener('close',function(){
			for(let a of b)
				if(a.a&&(this.returnValue==a.v))
					this.mxParent[`do${a.a}OK`]();
		});
		s+=`</fieldset>`;
		dialog.innerHTML=s;
		this.getE("Global").prepend(dialog);
	}
	dialog.querySelector('.mxContentFieldset').innerHTML=content;
	dialog.showModal();
}
mxG.G.prototype.getInfo=function(p,s=1)
{
	let aN=this.cN;
	if((p=="MN")||(p=="PM")||(p=="FG")){if(aN==this.rN)aN=this.kidOnFocus(aN);}
	if((p=="PM")||(p=="FG"))while((aN!=this.rN)&&!aN.P[p])aN=aN.Dad;
	else{aN=this.rN;while(aN&&!aN.P[p])aN=this.kidOnFocus(aN);}
	if(aN&&aN.P[p])
	{
		if(s)return (aN.P[p][0]+"").noT();
		return aN.P[p][0]+"";
	}
	if(p=="SZ")return "19";
	if(p=="PM")return "1";
	if((p=="ST")||(p=="FG"))return "0";
	return "";
}
mxG.G.prototype.setSz=function()
{
	let DX=this.DX?this.DX:0,DY=this.DY?this.DY:0,s=this.getInfo("SZ"),
		D=s.replace(/[^0-9:]/g,"").match(/^([0-9]+)(:([0-9]+))?$/);
	if(D){this.DX=mxG.min1max52(D[1]);this.DY=D[3]?mxG.min1max52(D[3]):this.DX;}
	else this.DX=this.DY=19;
	return (DX!=this.DX)||(DY!=this.DY);
}
mxG.G.prototype.setVw=function()
{
	let aN=this.cN,xl,yt,xr,yb;
	if(aN==this.rN)aN=this.kidOnFocus(this.rN);
	while((aN!=this.rN)&&!aN.P.VW)aN=aN.Dad;
	xl=(this.xl?this.xl:0);
	yt=(this.yt?this.yt:0);
	xr=(this.xr?this.xr:0);
	yb=(this.yb?this.yb:0);
	if(aN.P.VW)
	{
		this.xl=this.DX;
		this.yt=this.DY;
		this.xr=this.yb=1;
		for(let s of aN.P.VW)
		{
			if(s.match(/^[a-zA-Z]{2}:[a-zA-Z]{2}$/))
			{
				this.xl=Math.min(this.xl,s.c2n(0));
				this.yt=Math.min(this.yt,s.c2n(1));
				this.xr=Math.max(this.xr,s.c2n(3));
				this.yb=Math.max(this.yb,s.c2n(4));
			}
			else if(s.match(/^[a-zA-Z]{2}$/))
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
}
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
				if(aN.P.PL=="W")this.uC="W";
				break;
			}
			else if(aN.P.B||aN.P.W)
			{
				if(aN.P.W)this.uC="W";
				break;
			}
		}
	}
	this.oC=((this.uC=="W")?"B":"W");
}
mxG.G.prototype.placeAX=function()
{
	for(let p of ["AB","AW","AE"])
	{
		let v=this.cN.P[p];
		if(v)for(let s of v)
		{
			if(s.match(/^[a-zA-Z]{2}$/))
			{
				let x=s.c2n(0),y=s.c2n(1);
				this.gor.place(p,x,y);
			}
			else if(s.match(/^[a-zA-Z]{2}:[a-zA-Z]{2}$/))
			{
				let x1=s.c2n(0),y1=s.c2n(1),x2=s.c2n(3),y2=s.c2n(4);
				for(let x=x1;x<=x2;x++)for(let y=y1;y<=y2;y++)this.gor.place(p,x,y);
			}
		}
	}
}
mxG.G.prototype.placeBW=function(nat)
{
	let s=this.cN.P[nat][0],x=0,y=0;
	if(s.match(/^[a-zA-Z]{2}$/)){x=s.c2n(0);y=s.c2n(1);}
	this.gor.place(nat,x,y);
}
mxG.G.prototype.placeNode=function()
{
	if(this.kidOnFocus(this.cN))
	{
		this.cN=this.kidOnFocus(this.cN);
		if(this.cN.P.B)this.placeBW("B");
		else if(this.cN.P.W)this.placeBW("W");
		else if(this.cN.P.AB||this.cN.P.AW||this.cN.P.AE)this.placeAX();
	}
}
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
}
mxG.G.prototype.backNode=function(aN)
{
	this.changeFocus(aN);
	this.cN=this.rN;
	if(this.setSz())this.hasToSetGoban=1;
	this.gor.init(this.DX,this.DY);
	while(this.cN!=aN)this.placeNode();
}
mxG.G.prototype.updateAll=function()
{
	if(this.hasC("Variation"))this.setMode();
	this.setVw();
	this.setIndices();
	this.setNumbering();
	for(let z of this.c)
	{
		let s="update"+z;
		if(this[s])this[s]();
	}
}
mxG.G.prototype.initAll=function()
{
	for(let z of this.c)
	{
		let s="init"+z;
		if(this[s])this[s]();
	}
}
mxG.G.prototype.getA=function()
{
	let t;
	this.t=this.a.t||this.j;
	t=this.t;
	for(let n of t.getAttributeNames())
	{
		if(n.match(/^data-maxigos-[a-z][a-z0-9-]*$/))
		{
			let a=n.replace(/^data-maxigos-/,"").split("-"),s=a[0],b;
			for(let j=1;j<a.length;j++)s+=a[j].ucF();
			b=t.getAttribute(n);
			this.a[s]=b.match(/^[0-9-]+$/)?-(-b):b;
		}
	}
	this.sgf=this.a.sgf||t.innerHTML;
	this.lang=this.a.l||mxG.getLang(t);
	t.innerHTML="";
}
mxG.G.prototype.setA=function(a,z,t)
{
	if(!(a in this.a))return z;
	if(t=="bool")return (this.a[a]+"")=="1"?1:(this.a[a]+"")=="0"?0:null;
	if(t=="int")return parseInt(this.a[a]+"");
	if(t=="float")return parseFloat(this.a[a]+"");
	if(t=="string")return this.a[a]+"";
	if(t=="set")return this.a[a]?new Set((this.a[a]+"").split(",")):new Set();
	return null;
}
mxG.G.prototype.afterGetS=function(s,hasToShowExecutionTime)
{
	let a,sgf,km;
	a=(this.rN&&this.rNs)?this.rNs.indexOf(this.rN):-1;
	sgf=(this.rN&&this.rN.sgf)?this.rN.sgf:"";
	this.rN=new mxG.P(s,this.sgfLoadCoreOnly,this.sgfLoadMainOnly);
	this.rN.sgf=sgf;
	if(a<0)this.rNs=[this.rN];
	else this.rNs[a]=this.rN;
	this.setSz();
	this.hasToSetGoban=1;
	if(this.hasC("Tree"))this.hasToSetTree=1;
	this.gor=new mxG.R();
	this.gor.init(this.DX,this.DY);
	this.cN=this.rN;
	this.placeNode();
	if(this.initMethod=="last")while(this.kidOnFocus(this.cN))this.placeNode();
	else if(km=parseInt(this.initMethod+""))
		for(let k=0;k<km;k++)if(this.kidOnFocus(this.cN))this.placeNode();
	this.updateAll();
	if(hasToShowExecutionTime&&mxG.ExecutionTime)mxG.ExecutionTime();
}
mxG.G.prototype.getF=function(f)
{
	fetch(f)
	.then(r=>r.arrayBuffer())
	.then(b=>
	{
		let m,c,t;
		t=(new TextDecoder("UTF-8")).decode(b);
		if(m=t.match(/CA\[([^\]]*)\]/))c=m[1].toUpperCase();
		else c="ISO-8859-1";
		if(c!="UTF-8")return (new TextDecoder(c)).decode(b);
        return t;
    })
    .then(t=>this.afterGetS(t,1));
}
mxG.G.prototype.isSgfRecord=function(s)
{
	let a=s.indexOf("("),b=s.indexOf(";");
	return (a>=0)&&(b>a);
}
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
}
mxG.G.prototype.setC=function(b)
{
	for(let a of b)if(Array.isArray(a))this.setC(a);else this.c.push(a);
}
mxG.G.prototype.createBoxes=function(b)
{
	let s="";
	for(let a of b)
	{
		if(Array.isArray(a))s+=`<div>${this.createBoxes(a)}</div>`;
		else
		{
			let f="create"+a;
			if(this[f])s+=this[f]();
		}
	}
	return s;
}
mxG.G.prototype.addParentClasses=function(p,e)
{
	if(e.children)for(let c of e.children)this.addParentClasses(p,c);
	if(!e.id)return;
	let r,a,b,c;
	r=new RegExp(this.n+"([a-zA-Z0-9_-]+)"+"(Box|Btn)");
	b=e.id.replace(r,"$1");
	if(this.c.indexOf(b)>=0)
	{
		a=e.parentNode;
		if(a==p)return;
		a.classList.add(`mx${b}Parent`);
		a=a.parentNode;
		if(a==p)return;
		a.classList.add(`mx${b}GrandParent`);
		c="GrandParent";
		while((a=a.parentNode)&&(a!=p))
		{
			c="Great"+c;
			a.classList.add("mx"+b+c);
		}
	}
}
mxG.G.prototype.createAll=function()
{
	let e;
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
	e.id=this.n+"Global";
	e.className=`mxGlobal mx${this.config}Config mx${this.theme}Theme mxIn${this.in3dOn?"3":"2"}d`;
	e.lang=this.lang;
	if(!mxG.Z[this.lang])mxG.Z[this.lang]=[];
	e.innerHTML=this.createBoxes(this.b);
	this.addParentClasses(e,e);
	if(this.t==this.j)
		this.j.parentNode.insertBefore(e,this.j.nextSibling);
	else
		this.t.appendChild(e);
	this.gc=this.getE("GobanContent");
}
mxG.G.prototype.appendStyle=function()
{
	let s;
	function appendOneStyle(c,t,s)
	{
		let id=`maxigos${t+c}Style`;
		if(!document.getElementById(id))
		{
			let e=document.createElement("style");
			e.id=id;
			e.innerHTML=s;
			document.getElementsByTagName("head")[0].appendChild(e);
		}
	}
	if(s=this.style)appendOneStyle("",this.theme,s);
	if(s=this["style4"+this.config])appendOneStyle(this.config,this.theme,s);
}
mxG.G.prototype.after=function()
{
	this.appendStyle();
	this.getA();
	this.createAll();
	this.initAll();
	this.getS();
}
mxG.G.prototype.start=function()
{
	let k=this.k;
	if(document.readyState=="complete")this.after();
	else window.addEventListener("DOMContentLoaded",function(){mxG.D[k].after();});
}
}
if(!mxG.G.prototype.createGoban)
{
mxG.G.prototype.plonk=function()
{
	let e=this.gc.firstChild;
	mxG.beep();
	e.style.opacity=0;
	setTimeout(function(){e.style.opacity="";},50);
}
mxG.G.prototype.xy=function(x,y){return (x-this.xl)*(this.yb-this.yt+1)+y-this.yt;}
mxG.G.prototype.xy2s=function(x,y){return (x&&y)?String.fromCharCode(x+((x>26)?38:96),y+((y>26)?38:96)):"";}
mxG.G.prototype.inView=function(x,y)
{
	return (x>=this.xl)&&(y>=this.yt)&&(x<=this.xr)&&(y<=this.yb);
}
mxG.G.prototype.setIn3d=function()
{
	let e=this.getE("Global"),z=this.in3dOn;
	e.classList.remove(z?"mxIn2d":"mxIn3d");
	e.classList.add(z?"mxIn3d":"mxIn2d");
}
mxG.G.prototype.setIndices=function()
{
	let z,e=this.getE("Global");
	if(this.configIndicesOn===null)
		this.indicesOn=((parseInt(this.getInfo("FG")+"")&1)?0:1);
	z=this.indicesOn;
	if(z&&(this.xl==1))this.xli=0;else this.xli=this.xl;
	if(z&&(this.yt==1))this.yti=0;else this.yti=this.yt;
	if(z&&(this.xr==this.DX))this.xri=this.DX+1;else this.xri=this.xr;
	if(z&&(this.yb==this.DY))this.ybi=this.DY+1;else this.ybi=this.yb;
	e.classList.remove(z?"mxIndicesOff":"mxIndicesOn");
	e.classList.add(z?"mxIndicesOn":"mxIndicesOff");
}
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
				if(!bN&&aN.P.MN){kb=ka;bN=aN;}
				if(!cN&&aN.P.FG){kc=ka;cN=aN;}
				if(aN.P.AB||aN.P.AW||aN.P.AE)break;
				if(aN.P.B||aN.P.W)ka++;
				aN=aN.Dad;
			}
			if(!cN){cN=this.kidOnFocus(this.rN);kc=ka;}
			de=((!cN.P.B&&!cN.P.W)?1:0);
			fg=ka-kc+(bN?parseInt(bN.P.MN[0]+"")-ka+kb-((bN==cN)?de:0):0);
			this.numFrom=ka-kc;
			if(!this.numFrom){this.numFrom=1;fg++;}
			if(this.numberingOn==2)fg=fg%100;
			this.numWith=fg;
		}
		else this.numFrom=this.numWith=1;
	}
}
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
				if(s.match(/^[a-zA-Z]{2}:./))
				{
					x=s.c2n(0);
					y=s.c2n(1);
					if(this.inView(x,y))
						this.vStr[this.xy(x,y)]="|"+s.substring(3).noP().noT()+"|";
				}
			}
			else if(s.match(/^[a-zA-Z]{2}$/))
			{
				x=s.c2n(0);
				y=s.c2n(1);
				if(this.inView(x,y))this.vStr[this.xy(x,y)]="_"+MX[z]+"_";
			}
			else if(s.match(/^[a-zA-Z]{2}:[a-zA-Z]{2}$/))
			{
				let x1=s.c2n(0),y1=s.c2n(1),x2=s.c2n(3),y2=s.c2n(4);
				for(x=x1;x<=x2;x++)
					for(y=y1;y<=y2;y++)
						if(this.inView(x,y))this.vStr[this.xy(x,y)]="_"+MX[z]+"_";
			}
		}
	}
}
mxG.G.prototype.isNumbered=function(aN)
{
	if(!(aN.P["B"]||aN.P["W"]))return 0;
	if(this.configNumberingOn!==null)return this.numberingOn;
	let bN=((aN==this.rN)?this.kidOnFocus(aN):aN);
	while(bN!=this.rN)
	{
		if(bN.P["PM"])return parseInt(bN.P["PM"][0]+"");
		bN=bN.Dad;
	}
	return 1;
}
mxG.G.prototype.getAsInTreeNum=function(xN)
{
	let aN=xN,ka=0,kb=0,kc=0,de,bN=null,cN=null,fg;
	while(aN!=this.rN)
	{
		if(!bN&&aN.P["MN"]){bN=aN;kb=ka;}
		if(!cN&&aN.P["FG"]){cN=aN;kc=ka;}
		if(aN.P["AB"]||aN.P["AW"]||aN.P["AE"])break;
		if(aN.P["B"]||aN.P["W"])ka++;
		if((aN.Dad.P["B"]&&aN.P["B"])||(aN.Dad.P["W"]&&aN.P["W"]))ka++;
		aN=aN.Dad;
	}
	if(!cN){cN=this.kidOnFocus(this.rN);kc=ka;}
	de=((!cN.P.B&&!cN.P.W)?1:0);
	fg=ka-kc+(bN?parseInt(bN.P.MN[0]+"")-ka+kb-((bN==cN)?de:0):0);
	if(this.isNumbered(xN)==2)fg=fg%100;
	return fg+kc;
}
mxG.G.prototype.getVisibleMove=function(x,y)
{
	let k,kmin,kmax;
	if(this.asInBookOn&&this.numberingOn)
	{
		kmin=Math.min(this.gor.setup+this.numFrom,this.gor.play);
		for(k=kmin;k>0;k--)
			if((!this.gor.getO(k)||(this.gor.getO(k)>=kmin))&&(this.gor.getX(k)==x)&&(this.gor.getY(k)==y)&&(this.gor.getNat(k)!="E"))return k;
		kmax=this.gor.getBanNum(x,y);
		if(!kmax)kmax=this.gor.play;
		for(k=(kmin+1);k<=kmax;k++)
			if((this.gor.getX(k)==x)&&(this.gor.getY(k)==y)&&(this.gor.getNat(k)!="E"))return k;
		return this.gor.getBanNum(x,y);
	}
	else return this.gor.getBanNum(x,y);
}
mxG.G.prototype.getVisibleNat=function(n)
{
	return this.gor.getNat(n);
}
mxG.G.prototype.getTenuki=function(m,n)
{
	let k,r=0;
	for(k=m;k>n;k--)if(this.gor.getNat(k)==this.gor.getNat(k-1))r++;
	return r;
}
mxG.G.prototype.getCoreNum=function(m)
{
	let s=this.gor.setup;
	if(m>s)
	{
		let n=s+this.numFrom,r;
		if(m>=n){r=m-n+this.numWith+this.getTenuki(m,n);return (r<1)?"":r+"";}
	}
	return "";
}
mxG.G.prototype.getVisibleNum=function(m)
{
	if(this.numberingOn)return this.getCoreNum(m);
	return "";
}
mxG.G.prototype.preTerritory=function(x,y,nat,m)
{
	if(this.marksAndLabelsOn&&(this.cN.P.TB||this.cN.P.TW))
	{
		if(this.asInBookOn&&(m!="_TB_")&&(m!="_TW_"))
		{
			if((nat=="B")&&(this.gor.getBanNat(x,y)=="W"))m="_TW_";
			else if((nat=="W")&&(this.gor.getBanNat(x,y)=="B"))m="_TB_";
		}
	}
	return m;
}
mxG.G.prototype.addNatAndNum=function(x,y,z)
{
	let m=this.getVisibleMove(x,y),n=this.getVisibleNum(m),k=this.xy(x,y);
	this.vNat[k]=this.getVisibleNat(m);
	this.vStr[k]=(this.markOnLastOn&&(z==k)&&!n)?
					(this.numAsMarkOnLastOn?this.getCoreNum(m):"_ML_"):n;
	this.vStr[k]=this.preTerritory(x,y,this.vNat[k],this.vStr[k]);
}
mxG.G.prototype.moveFocusInView=function()
{
	this.xFocus=Math.min(Math.max(this.xFocus,this.xl),this.xr);
	this.yFocus=Math.min(Math.max(this.yFocus,this.yt),this.yb);
}
mxG.G.prototype.moveFocusMarkOnLast=function()
{
	let m=this.gor.play;
	if(this.gor.getAct(m)=="")
	{
		this.xFocus=this.gor.getX(m);
		this.yFocus=this.gor.getY(m);
		this.moveFocusInView();
	}
	this.scr.setGobanFocusTitleDesc(1);
}
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
				this.scr.setGobanFocusTitleDesc(2);
			}
		}
	}
}
mxG.G.prototype.doClickGoban=function(ev)
{
	let c=this.scr.getGxy(ev);
	if(!this.inView(c.x,c.y)){this.plonk();return;}
	this.xFocus=c.x;
	this.yFocus=c.y;
	if(this.canPlaceEdit)this.checkEdit(c.x,c.y);
	else if(this.canPlaceSolve)this.checkSolve(c.x,c.y);
	else if(this.canPlaceVariation)this.checkVariation(c.x,c.y);
	else if(this.canPlaceGuess)this.checkGuess(c.x,c.y);
	else if(this.canPlaceScore)this.checkScore(c.x,c.y);
	ev.preventDefault();
}
mxG.G.prototype.toggleAudouard=function()
{
	let a=localStorage.getItem("Audouard");
	localStorage.setItem("Audouard",(a&&(a=="on"))?"off":"on");
}
mxG.G.prototype.toggleWholeGobanDesc=function()
{
	let a=localStorage.getItem("Whole goban desc");
	localStorage.setItem("Whole goban desc",(a&&(a=="on"))?"off":"on");
	this.scr.setGobanFocusTitleDesc(6);
}
mxG.G.prototype.doAlphaKeydown=function(ev)
{
	let r=0;
	if(ev.key.match(/^a$/i)){this.toggleAudouard(ev);r=8;}
	else if(ev.key.match(/^b$/i)){this.getE("GobanSvg").focus();r=8;}
	else if(this.hasC("Comment")&&ev.key.match(/^c$/i)){this.getE("CommentBox").focus();r=8;}
	else if(this.hasC("Edit")&&ev.key.match(/^c$/i)){this.getE("EditCommentTool").focus();r=8;}
	else if(this.hasC("Edit")&&ev.key.match(/^o$/i)){this.getE(this.tools[0]+"Tool").focus();r=8;}
	else if(this.hasC("Header")&&ev.key.match(/^i$/i)){let e=this.getE("HeaderBox");if(e){e.focus();r=8;}}
	else if(this.hasC("Menu")&&ev.key.match(/^m$/i)){let e=this.getFirstEnableMenuBtn();if(e){e.focus();r=8;}}
	else if(this.hasC("Navigation")&&ev.key.match(/^v$/i)){let e=this.getFirstEnableNavigationBtn();if(e){e.focus();r=8;}}
	else if(this.hasC("Solve")&&ev.key.match(/^v$/i)){let e=this.getFirstEnableSolveBtn();if(e){e.focus();r=8;}}
	else if(this.hasC("Tree")&&ev.key.match(/^t$/i)){this.getE("TreeBox").focus();r=8;}
	else if(ev.key.match(/^w$/i)){this.toggleWholeGobanDesc(ev);r=8;}
	if(r)ev.preventDefault();
	return r;
}
mxG.G.prototype.doKeydownGoban=function(ev)
{
	if(ev.metaKey||ev.ctrlKey||(ev.altKey&&!ev.key.match(/^(ArrowUp|ArrowDown|u|n)$/i)))return;
	let r=0,x=this.xFocus,y=this.yFocus;
	if((ev.key==" ")||(ev.key=="Enter"))
	{
		if(this.canPlaceEdit)
		{
			if(this.editTool=="Select")this.doKeydownSelect(x,y);
			else this.checkEdit(x,y);
		}
		else if(this.canPlaceSolve)this.checkSolve(x,y);
		else if(this.canPlaceVariation)this.checkVariation(x,y);
		else if(this.canPlaceGuess)this.checkGuess(x,y);
		else if(this.canPlaceScore)this.checkScore(x,y);
		ev.preventDefault();
		return;
	}
	if(ev.key.match(/^[acimotvw]$/i))
	{
		if(this.doAlphaKeydown(ev))return;
	}
	else if(ev.shiftKey||ev.key.match(/^[ufghjklnpy]$/i))
	{
		if(this.hasC("Navigation"))this.doKeydownNavigation(ev);
		else if(this.hasC("Solve"))this.doKeydownSolve(ev);
		return;
	}
	switch(ev.key)
	{
		case "ArrowLeft":case "s":case "S":x--;r=1;break;
		case "ArrowRight":case "d":case "D":x++;r=1;break;
		case "ArrowUp":case "e":case "E":y--;r=1;break;
		case "ArrowDown":case "x":case "X":y++;r=1;break;
	}
	if(r&&this.inView(x,y))
	{
		if(r==1)this.justMovedCursor=1;
		this.xFocus=x;
		this.yFocus=y;
		this.moveFocusInView();
		if(this.hasC("Edit")&&(this.editTool=="Select"))
		{
			if(this.inSelect==2)this.selectGobanArea(this.xFocus,this.yFocus);
			this.updateAll();
		}
		else this.scr.setGobanFocusTitleDesc(3);
		ev.preventDefault();
	}
}
mxG.G.prototype.doFocusGoban=function(ev)
{
	this.getE("GobanSvg").setAttribute("aria-busy","false");
}
mxG.G.prototype.doBlurGoban=function(ev)
{
	this.getE("GobanSvg").setAttribute("aria-busy","true");
	this.scr.setGobanFocusTitleDesc(4);
}
mxG.G.prototype.setGoban=function()
{
	let k=this.k,g;
	this.moveFocusInView();
	this.scr.setInternalParams();
	this.gc.innerHTML=this.scr.makeGoban();
	g=this.getE("GobanSvg");
	g.getMClick=mxG.getMClick;
	g.addEventListener("click",function(ev){mxG.D[k].doClickGoban(ev);});
	g.addEventListener("keydown",function(ev){mxG.D[k].doKeydownGoban(ev);});
	g.addEventListener("focus",function(ev){mxG.D[k].doFocusGoban(ev);});
	g.addEventListener("blur",function(ev){mxG.D[k].doBlurGoban(ev);});
	if(this.hasC("Navigation"))
		g.addEventListener("wheel",function(ev){mxG.D[k].doWheelNavigation(ev);},{passive:false});
	if(this.hasC("Edit"))
	{
		g.addEventListener("mousemove",function(ev){mxG.D[k].doMouseMoveEdit(ev);});
		g.addEventListener("mouseup",function(ev){mxG.D[k].doMouseUpEdit(ev);});
		g.addEventListener("mousedown",function(ev){mxG.D[k].doMouseDownEdit(ev);});
		g.addEventListener("mouseout",function(ev){mxG.D[k].doMouseOutEdit(ev);});
	}
	this.hasToSetGoban=0;
}
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
			if(this.inView(x,y))z=this.xy(x,y);
		}
	}
	for(i=this.xl;i<=this.xr;i++)
		for(j=this.yt;j<=this.yb;j++)
			this.addNatAndNum(i,j,z);
	if(this.marksAndLabelsOn)this.addMarksAndLabels();
	if(this.hasC("Variation"))this.addVariationMarks();
	if(this.hasToSetGoban){this.setGoban();q=1;}else q=0;
	this.scr.drawGoban(this.vNat,this.vStr);
	if(q&&this.hasC("Edit")&&this.selection)this.selectView();
}
mxG.G.prototype.initGoban=function()
{
	this.alea=Math.floor(Math.random()*6)+2;
	this.scr.init();
}
mxG.G.prototype.createGoban=function()
{
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
	this.yaOn=this.setA("yaOn",0,"bool");
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
	let s=`<div class="mxGobanBox" id="${this.n}GobanBox">`;
	return s+`<div class="mxGobanContent" id="${this.n}GobanContent"></div></div>`;
}
}
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
	var a,e;
	a=document.activeElement;
	if((this.getE("GobanSvg")==a)||(this.getE("TreeBox")==a))return;
	e=this.getE(b+"Btn");
	if(e&&!e.disabled){if(a!=e)e.focus();return;}
	if(e=this.getE("NavigationBox"))e.focus();
}
mxG.G.prototype.getFirstEnableNavigationBtn=function()
{
	let e=this.getE("NavigationBox");
	if(!e)return null;
	list=e.querySelectorAll(':enabled');
	return (list&&list.length)?list[0]:e;
}
mxG.G.prototype.doFirst=function()
{
	this.backNode(this.kidOnFocus(this.rN));
	this.updateAll();
	this.setNFocus("First");
}
mxG.G.prototype.doTenPred=function()
{
	let k,aN=this.cN;
	for(k=0;k<10;k++)
	{
		if(aN.Dad!=this.rN)aN=aN.Dad;else break;
		if(this.hasC("Variation")&&!(this.styleMode&2))
		{
			if(this.styleMode&1){if(aN.Dad.Kid.length>1)break;}
			else if(aN.Kid.length>1)break;
		}
	}
	this.backNode((aN==this.rN)?this.kidOnFocus(aN):aN);
	this.updateAll();
	this.setNFocus("TenPred");
}
mxG.G.prototype.doPred=function()
{
	let aN=this.cN.Dad;
	this.backNode((aN==this.rN)?this.kidOnFocus(aN):aN);
	this.updateAll();
	this.setNFocus("Pred");
}
mxG.G.prototype.doNext=function()
{
	this.placeNode();
	this.updateAll();
	this.setNFocus("Next");
}
mxG.G.prototype.doTenNext=function()
{
	for(let k=0;k<10;k++)
	{
		if(this.kidOnFocus(this.cN))this.placeNode();else break;
		if(this.hasC("Variation")&&!(this.styleMode&2))
		{
			if(this.styleMode&1){if(this.cN.Dad.Kid.length>1)break;}
			else if(this.cN.Kid.length>1)break;
		}
	}
	this.updateAll();
	this.setNFocus("TenNext");
}
mxG.G.prototype.doLast=function()
{
	while(this.kidOnFocus(this.cN))this.placeNode();
	this.updateAll();
	this.setNFocus("Last");
}
mxG.G.prototype.doTopVariation=function(s)
{
	let aN,k,km;
	if((this.styleMode&1)||s)aN=this.cN.Dad;else aN=this.cN;
	k=aN.Focus;
	km=aN.Kid.length;
	if(km>1)
	{
		aN.Focus=(k>1)?k-1:km;
		if((this.styleMode&1)||s)this.backNode(this.kidOnFocus(aN));
		this.updateAll();
	}
}
mxG.G.prototype.doBottomVariation=function(s)
{
	let aN,bN,k,km;
	if((this.styleMode&1)||s)aN=this.cN.Dad;else aN=this.cN;
	k=aN.Focus;
	km=aN.Kid.length;
	if(km>1)
	{
		aN.Focus=(k<km)?k+1:1;
		if((this.styleMode&1)||s)this.backNode(this.kidOnFocus(aN));
		this.updateAll();
	}
}
mxG.G.prototype.hasPred=function()
{
	return this.cN.Dad!=this.rN;
}
mxG.G.prototype.hasNext=function()
{
	return this.cN.Kid.length;
}
mxG.G.prototype.hasVariation=function(s)
{
	let aN=this.cN;
	if((this.styleMode&1)||s)aN=aN.Dad;
	return aN.Kid.length>1;
}
mxG.G.prototype.doKeydownNavigation=function(ev)
{
	if(ev.metaKey||ev.ctrlKey||(ev.altKey&&!ev.key.match(/^(ArrowUp|ArrowDown|u|n)$/i)))return;
	if(this.hasC("Score")&&this.canPlaceScore)return false;
	let r=0,s=ev.altKey?1:0;
	if(ev.key.match(/^[bcimot]$/i))
	{
		if(this.doAlphaKeydown(ev))return;
	}
	else if(ev.shiftKey||ev.key.match(/^[ufghjkln]$/i))switch(ev.key)
	{
		case "Home":case "f":case "F":
			if(this.hasPred()){this.doFirst();r=1;}break;
		case "PageUp":case "g":case "G":
			if(this.hasPred()){this.doTenPred();r=1;}break;
		case "ArrowLeft":case "h":case "H":
			if(this.hasPred()){this.doPred();r=1;}break;
		case "ArrowRight":case "j":case "J":
			if(this.hasNext()){this.doNext();r=(this.animatedStoneOn?4:1);}break;
		case "PageDown":case "k":case "K":
			if(this.hasNext()){this.doTenNext();r=1;}break;
		case "End":case "l":case "L":
			if(this.hasNext()){this.doLast();r=1;}break;
		case "ArrowUp":case "u":case "U":
			if(this.hasVariation(s)){this.doTopVariation(s);r=2;}break;
		case "ArrowDown":case "n":case "N":
			if(this.hasVariation(s)){this.doBottomVariation(s);r=2;}break;
	}
	if(r)
	{
		this.justMovedInTree=1;
		if(r&1)this.moveFocusMarkOnLast();
		else if(r&2)this.moveFocusMarkOnVariationOnFocus();
		ev.preventDefault();
	}
}
mxG.G.prototype.deltaPred=function()
{
	this.backNode(this.cN.Dad);
	this.updateAll();
}
mxG.G.prototype.deltaNext=function()
{
	this.placeNode();
	this.updateAll();
}
mxG.G.prototype.deltaAction=function(ev,a)
{
	if(this.deltaXYc===undefined)this.deltaXYc=0;
	this.deltaXYc+=Math.abs(this.deltaXY);
	if(this.deltaXYc>this.deltaXYm)
	{
		this["delta"+a]();
		this.deltaXYc=0;
		if(!this.deltaXYm)this.deltaXYm=64;
		else if(this.deltaXYm>1)this.deltaXYm>>=1;
	}
	this.wnto=new Date().getTime();
	ev.preventDefault();
}
mxG.G.prototype.doDeltaNavigation=function(ev)
{
	if(Math.abs(this.deltaX)<Math.abs(this.deltaY)) return;
	if(this.hasC("Score")&&this.canPlaceScore)return;
	this.deltaXY=this.deltaX;
	let t,d=999;
	t=new Date().getTime();
	if((!this.wnto)||((t-this.wnto)>d))
	{
		this.wnto=t;
		this.deltaXYm=0;
	}
	if(this.deltaXY<0)
	{
		if(this.hasNext()){this.deltaAction(ev,"Next");return;}
		else if(this.deltaXYm)ev.preventDefault();
	}
	else if(this.deltaXY>0)
	{
		if(this.hasPred()){this.deltaAction(ev,"Pred");return;}
		else if(this.deltaXYm)ev.preventDefault();
	}
}
mxG.G.prototype.doWheelNavigation=function(ev)
{
	this.deltaX=ev.deltaX;
	this.deltaY=ev.deltaY;
	this.doDeltaNavigation(ev);
}
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
}
mxG.G.prototype.initNavigation=function()
{
	let e=this.getE("NavigationBox");
	if(!e)return;
	let k=this.k;
	e.addEventListener("keydown",function(ev){mxG.D[k].doKeydownNavigation(ev);});
	for(let b of this.navigations)
	{
		if(b=="First")
			this.addBtn(e,{n:"First",v:this.scr.makeBI(this.scr.makeBR(26)+this.scr.makeBT(50,1)),t:this.local("First")});
		else if(b=="TenPred")
			this.addBtn(e,{n:"TenPred",v:this.scr.makeBI(this.scr.makeBT(4,1)+this.scr.makeBT(56,1)),t:this.local("10 Previous")});
		else if(b=="Pred")
			this.addBtn(e,{n:"Pred",v:this.scr.makeBI(this.scr.makeBT(30,1)),t:this.local("Previous")});
		else if(b=="Next")
			this.addBtn(e,{n:"Next",v:this.scr.makeBI(this.scr.makeBT(98,-1)),t:this.local("Next")});
		else if(b=="TenNext")
			this.addBtn(e,{n:"TenNext",v:this.scr.makeBI(this.scr.makeBT(72,-1)+this.scr.makeBT(124,-1)),t:this.local("10 Next")});
		else if(b=="Last")
			this.addBtn(e,{n:"Last",v:this.scr.makeBI(this.scr.makeBT(78,-1)+this.scr.makeBR(78)),t:this.local("Last")});
		else if(b=="Loop")
		{
			this.loopBtnOn=1;
			this.addBtn(e,{n:"Auto",v:this.scr.makeBI(this.scr.makeBT(0,1)+this.scr.makeBT(128,-1)),t:this.local("Auto")});
			this.addBtn(e,{n:"Pause",v:this.scr.makeBI(this.scr.makeBR(24)+this.scr.makeBR(80)),t:this.local("Pause")});
		}
		else if(b=="Goto")
		{
			this.gotoInputOn=1;
			this.addGotoInput();
		}
	}
}
mxG.G.prototype.createNavigation=function()
{
	let a=new Set(["First","TenPred","Pred","Next","TenNext","Last"]);
	this.navigations=this.setA("navigations",a,"set");
	if(this.navigations.size===0)return "";
	return `<div class="mxNavigationBox" id="${this.n}NavigationBox" tabindex="-1"></div>`;
}
}
if(!mxG.G.prototype.createVariation)
{
mxG.fr(": "," : ");
mxG.fr("Variations","Variations");
mxG.fr("no variation","aucune");
mxG.G.prototype.setMode=function()
{
	this.styleMode=parseInt(this.getInfo("ST"));
	if(this.configVariationMarksOn===null)this.variationMarksOn=(this.styleMode&2)?0:1;
	else
	{
		if(this.variationMarksOn)this.styleMode&=~2;
		else this.styleMode|=2;
	}
	if(this.configSiblingsOn===null)this.siblingsOn=(this.styleMode&1)?1:0;
	else
	{
		if(this.siblingsOn)this.styleMode|=1;
		else this.styleMode&=~1;
	}
	if(this.hideSingleVariationMarkOn)this.styleMode|=4;
}
mxG.G.prototype.doClickVariation=function(a)
{
	let aN=this.styleMode&1?this.cN.Dad:this.cN;
	if(this.styleMode&1)this.backNode(aN);
	aN.Focus=a+1;
	this.placeNode();
	this.updateAll();
}
mxG.G.prototype.addVariationMarkInBox=function(a,m)
{
	let b=document.createElement("button"),k=this.k;
	if(this.scr.isLabel(m))m=this.scr.removeLabelDelimiters(m);
	b.innerHTML=m;
	b.addEventListener("click",function(ev){mxG.D[k].doClickVariation(a);});
	this.getE("VariationBox").appendChild(b);
}
mxG.G.prototype.buildVariationMark=function(l)
{
	if(this.variationMarkSeed.size)return [...this.variationMarkSeed][l-1];
	return l+"";
}
mxG.G.prototype.isNextMove=function(x,y)
{
	if(!(this.styleMode&3))
	{
		let aN=this.kidOnFocus(this.cN);
		if(aN)
		{
			let s=aN.P.B?aN.P.B[0]:aN.P.W?aN.P.W[0]:"";
			if(s.match(/^[a-zA-Z]{2}$/)&&(s.c2n(0)==x)&&(s.c2n(1)==y))return 1;
		}
	}
	return 0;
}
mxG.G.prototype.addVariationMarks=function()
{
	let aN,k,km,l=0,e=this.getE("VariationBox"),
		s1=`<span class="mxVariationsSpan">${this.local("Variations")+this.local(": ")}</span>`,
		s2=`<span class="mxNoVariationSpan">${this.local("no variation")}</span>`;
	if(this.variationBoxOn)e.innerHTML=s1;
	if(this.styleMode&1)
	{
		if(!this.cN||!this.cN.Dad)
		{
			if(this.variationBoxOn)e.innerHTML=s1+s2;
			return;
		}
		aN=this.cN.Dad;
	}
	else
	{
		if(!this.cN||!this.kidOnFocus(this.cN))
		{
			if(this.variationBoxOn)e.innerHTML=s1+s2;
			return;
		}
		aN=this.cN;
	}
	km=aN.Kid.length;
	if((this.styleMode&4)&&(km==1))
	{
		if(this.variationBoxOn)e.innerHTML=s1;
		return;
	}
	for(k=0;k<km;k++)
		if(aN.Kid[k]!=this.cN)
		{
			let s=aN.Kid[k].P.B?aN.Kid[k].P.B[0]:aN.Kid[k].P.W?aN.Kid[k].P.W[0]:"",m;
			l++;
			if(s.match(/^[a-zA-Z]{2}$/))
			{
				let x=s.c2n(0),y=s.c2n(1);
				if(this.gor.inGoban(x,y))
				{
					let z=this.xy(x,y);
					if(this.inView(x,y))m=this.vStr[z];
					else m=this.buildVariationMark(l);
					if((m+"").search(/^\(.*\)$/)==-1)
					{
						if(!m)m=this.buildVariationMark(l);
						if(!(this.styleMode&2)
						&&(!(this.styleMode&1)||(aN.Kid[k]!=this.cN))
						&&!this.canPlaceGuess)
						{
							this.vStr[z]="("+m+")";
							if(this.isNextMove(x,y))this.vStr[z]="("+this.vStr[z]+")";
						}
					}
					if((m+"").search(/^_.*_$/)==0)m=this.buildVariationMark(l);
				}
				else m=this.buildVariationMark(l);
			}
			else m=this.buildVariationMark(l);
			if(this.variationBoxOn&&(aN.Kid[k]!=this.cN))this.addVariationMarkInBox(k,m);
		}
}
mxG.G.prototype.getVariationNextNat=function()
{
	let aN,bN;
	if(this.hasC("Edit")&&this.editNextNat)return this.editNextNat;
	aN=this.cN;
	if(aN.P.PL)return aN.P.PL[0];
	aN=this.kidOnFocus(this.cN);
	if(aN)
	{
		if(aN.P.B)return "B";
		if(aN.P.W)return "W";
	}
	aN=this.cN;
	if(aN.P.B)return "W";
	if(aN.P.W)return "B";
	if(aN.P.AB&&!aN.P.AW)return "W";
	else if(aN.P.AW&&!aN.P.AB)return "B";
	if(aN.Kid)for(bN of aN.Kid)
	{
		if(bN.P.B)return "B";
		if(bN.P.W)return "W";
	}
	for(bN of aN.Dad.Kid)
	{
		if(bN.P.B)return "W";
		if(bN.P.W)return "B";
	}
	return "B";
}
mxG.G.prototype.addPlay=function(aP,x,y)
{
	let aN,aV=this.xy2s(x,y);
	aN=new mxG.N(this.cN,aP,aV);
	aN.Add=1;
	this.cN.Focus=this.cN.Kid.length;
}
mxG.G.prototype.checkBW=function(aN,a,b)
{
	if(aN.P.B||aN.P.W)
	{
		let s=aN.P.B?aN.P.B[0]:aN.P.W[0],x,y;
		if(s.match(/^[a-zA-Z]{2}$/)){x=s.c2n(0);y=s.c2n(1);}
		else x=y=0;
		return (x==a)&&(y==b);
	}
	return 0;
}
mxG.G.prototype.checkAX=function(aN,a,b)
{
	for(let p of ["AB","AW","AE"])
		if(aN.P[p])
			for(let s of aN.P[p])
			{
				let x,y,x1,x2,y1,y2;
				if((s.match(/^[a-zA-Z]{2}$/))&&(s.c2n(0)==a)&&(s.c2n(1)==b))return 1;
				if(s.match(/^[a-zA-Z]{2}:[a-zA-Z]{2}$/))
				{
					x1=s.c2n(0);
					y1=s.c2n(1);
					x2=s.c2n(3);
					y2=s.c2n(4);
					for(x=x1;x<=x2;x++)for(y=y1;y<=y2;y++)if((x==a)&&(y==b))return 1;
				}
			}
	return 0;
}
mxG.G.prototype.checkVariation=function(a,b)
{
	let aN,bN,ok=0;
	if((this.styleMode&1)&&(this.cN.Dad==this.rN)){this.plonk();return;}
	if(a&&b&&this.gor.isOccupied(a,b))
	{
		aN=this.cN.Dad;
		while(!ok&&(aN!=this.rN))
		{
			if(this.checkBW(aN,a,b)||this.checkAX(aN,a,b))ok=1;
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
			if(this.styleMode&1)this.backNode(aN);
			aN.Focus=k+1;
			this.placeNode();
			this.updateAll();
			return;
		}
	}
	if(this.styleMode&1){this.plonk();return;}
	this.addPlay(this.getVariationNextNat(),a,b);
	this.placeNode();
	if(this.hasC("Tree"))this.hasToSetTree=1;
	this.updateAll();
}
mxG.G.prototype.createVariation=function()
{
	this.canPlaceVariation=this.setA("canPlaceVariation",0,"bool");
	if(this.canPlaceVariation)this.canPlaceGuess=0;
	this.hideSingleVariationMarkOn=this.setA("hideSingleVariationMarkOn",0,"bool");
	this.siblingsOn=this.setA("siblingsOn",null,"bool");
	this.variationBoxOn=this.setA("variationBoxOn",0,"bool");
	this.variationMarkSeed=this.setA("variationMarkSeed",new Set(),"set");
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
		return `<div class="mxVariationBox" id="${this.n}VariationBox"></div>`;
	return ``;
}
}
if(!mxG.G.prototype.createVersion)
{
mxG.G.prototype.createVersion=function()
{
	this.versionBoxOn=this.setA("versionBoxOn",0,"bool");
	if(this.versionBoxOn)
		return `<div class="mxVersionBox" id="${this.n}VersionBox">maxiGos ${mxG.V}</div>`;
	return "";
}
}
mxG.K++;
mxG.B=["Goban","Navigation","Variation","Version"];
mxG.D[mxG.K]=new mxG.G(mxG.K,mxG.B);
mxG.D[mxG.K].theme="Minimalist";
mxG.D[mxG.K].config="Basic";
mxG.D[mxG.K].style=".mxMinimalistTheme{--gobanScale:1;--gobanMaxWidth:calc(1em * var(--gobanScale) * var(--gobanIntrinsicWidth,445) / 16);--navigationMaxWidth:calc(1em * 445 / 16);--columnMaxWidth:max(var(--gobanMaxWidth),var(--navigationMaxWidth));--border:1px solid #0007;--color:#000;--btnBk:#fff;--btnBorder:1px solid #0007;--btnColor:#000;--selectedBtnBk:#000;--selectedBtnBorder:1px solid #000;--selectedBtnColor:#fff;text-align:left;& button,& select,& textarea{-webkit-appearance:none;-moz-appearance:none;}& [disabled]{cursor:default;}& input[type=file]{visibility:hidden;position:fixed;}& [data-maxigos-disabled],& [disabled]{opacity:0.5;}& form,fieldset{border:0;margin:0;padding:0;}& svg{display:block;width:100%;height:100%;}&,& input,& select,& meter,& button{font-family:sans-serif;font-size:1em;}& p:first-of-type{margin-top:0;}&{max-width:var(--columnMaxWidth);margin:0 auto;}&.mxCommentConfig,&.mxEditConfig,&.mxLessonConfig,&.mxTreeConfig{max-width:calc(var(--columnMaxWidth) * 2 + 0.25em + 4px);display:flex;flex-wrap:wrap;justify-content:center;align-items:stretch;gap:0.25em;}&.mxCommentConfig>div,&.mxEditConfig>div,&.mxLessonConfig>div,&.mxTreeConfig>div{flex:1 1 calc(var(--columnMaxWidth) + 2px);max-width:min(100%,calc(var(--columnMaxWidth) + 2px));display:flex;flex-direction:column;}& .mxSgfParent,& .mxMenuBox{margin:0;padding:min(2.5vw,0.25em);text-align:center;}& .mxSgfParent>div{display:inline-block;margin:0.25em 0;padding:0;}& .mxSgfParent button,& .mxMenuBox button,& dialog button{box-sizing:border-box;margin:min(2.5vw,0.25em);padding:0 min(5vw,0.5em);min-height:1.75em;line-height:1.75em;}& .mxSgfParent button,& .mxMenuBox button{border:var(--btnBorder);background:var(--btnBk);color:var(--btnColor);}& dialog button{border:1px solid #777;background:#fff;color:#000;}& dialog button[value=\"FileInput\"]{min-height:1.75em;height:auto;}& .mxSgfParent button.mxSelectedBtn{background:var(--selectedBtnBk);border:var(--selectedBtnBorder);color:var(--selectedBtnColor);}& dialog,& dialog *{box-sizing:border-box;}& dialog::backdrop{background: #0007;}& dialog{max-width:calc(100% - 5vw);border:0;padding:0;}& dialog .mxContentFieldset{padding:min(2.5vw,0.5em);}& dialog.mxEditOptionsDialog .mxContentFieldset{line-height:1.5em;}& dialog .mxMenuFieldset{background:#eee;min-height:3em;line-height:3em;text-align:center;}& dialog label:not([for]){display:block;}& dialog input[type=text],& dialog select{border:var(--border);background:#fff;}& dialog select{text-align:center;}& dialog a{color:#000;}& dialog img{display:block;margin:0 auto;max-width:100%;height:auto;border:0;}& dialog textarea{display:block;width:100%;border:var(--border);}& .mxEditSgfDialog{min-width:min(80%,var(--gobanMaxWidth));}& .mxEditSgfDialog textarea{font-family:monospace;white-space:pre-wrap;min-height:min(50vh,var(--gobanMaxWidth));}&.mxCommentConfig .mxCommentBox,&.mxTreeConfig .mxCommentBox{box-sizing:border-box;border:var(--border);height:8em;overflow:auto;padding:0.25em;resize:vertical;}&.mxCommentConfig .mxCommentBox{flex:auto;}& .mxGobanBox{flex:auto;display:flex;flex-direction:column;}&.mxCommentConfig .mxGobanBox,&.mxEditConfig .mxGobanBox,&.mxLessonConfig .mxGobanBox,&.mxTreeConfig .mxGobanBox{box-sizing:border-box;border:var(--border);}& .mxGobanContent{max-width:var(--gobanMaxWidth);width:100%;margin:auto;}& meter{--meterGoodColor:#fff;--meterBadColor:#0007;display:block;margin:1em;padding:0;width:calc(100% - 2em);height:0.5em;border:var(--border);border-radius:0.25em;overflow:hidden;background:var(--meterBadColor);}& ::-webkit-meter-bar{width:100%;height:0.5em;border:0;border-radius:0;background:#0000;}& ::-webkit-meter-optimum-value{background:var(--meterGoodColor);}@supports selector(::-moz-meter-bar){& :-moz-meter-optimum::-moz-meter-bar{background:var(--meterGoodColor);}}&.mxGameConfig .mxHeaderBox,&.mxKifuConfig .mxHeaderBox,&.mxReplayConfig .mxHeaderBox{padding:0 2.5%;overflow:auto;}& .mxHeaderTitle{font-weight:bold;}& .mxNavigationBox:not(:empty){max-width:var(--navigationMaxWidth);width:100%;margin:0 auto;display:flex;justify-content:space-around;align-items:center;max-height:3em;}& .mxNavigationBox button{flex:1;max-height:3em;max-width:3em;margin:0;padding:0;border:0;background:none;}& .mxNavigationBox button svg{margin:20% auto;max-width:60%;}& .mxAutoBtn[disabled],& .mxPauseBtn[disabled]{display:none;}& .mxNotSeenBox:not(:empty){max-width:var(--gobanMaxWidth);margin:0.5em auto 0 auto;}& .mxSpeedBox [type=range]{--speedColor: #000;display:block;margin:0;padding:0 1em;width:calc(100% - 2em);height:2.5em;border:0;border-radius:0;background:#0000;-webkit-appearance:none;}& .mxSpeedBox [type=range]::-webkit-slider-runnable-track{box-sizing:border-box;height:0.5em;border:0;border-radius:0.25em;background:var(--speedColor);}& .mxSpeedBox [type=range]::-webkit-slider-thumb{-webkit-appearance:none;margin-top:-0.5em;box-sizing:border-box;width:1.5em;height:1.5em;border:0;border-radius:50%;background:var(--speedColor);}@supports selector(::-moz-range-track) and selector(::-moz-range-thumb){& .mxSpeedBox [type=range]::-moz-range-track{box-sizing:border-box;height:0.5em;border:0;border-radius:0.25em;background:var(--speedColor);}& .mxSpeedBox [type=range]::-moz-range-thumb{box-sizing:border-box;width:1.5em;height:1.5em;border:0;border-radius:50%;background:var(--speedColor);}}& .mxTreeBox{box-sizing:border-box;flex:auto;border:var(--border);height:7em;overflow:auto;resize:vertical;margin-top:0.25em;max-width:100%;}& .mxTreeContent{width:calc(1em * var(--treeIntrinsicWidth) / 16);}& .mxTreeBox svg{width:100%;height:auto;}& .mxVersionBox{text-align:center;min-height:3em;line-height:3em;}& .mxGobanSvg:not(:focus-visible){outline:0;}& .mxGobanSvg:not(:focus-visible) .mxFocus{display:none;}& .mxBtn:focus-visible{position:relative;z-index:10;}&:not(.mxDiagramConfig):not(.mxKifuConfig):not(.mxLoopConfig) .mxGobanBox svg,& button:not([disabled]),& input[type=\"range\"]:not([disabled]),& .mxTreeBox svg circle,& .mxTreeBox svg polygon,& .mxTreeBox svg rect,& .mxTreeBox svg text{cursor:pointer;}}";
mxG.D[mxG.K].a.in3dOn=0;
mxG.D[mxG.K].a.allowStringAsSource=1;
mxG.D[mxG.K].a.allowFileAsSource=1;
mxG.D[mxG.K].a.initMethod="last";
mxG.D[mxG.K].a.stoneShadowOn=0;
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
mxG.D[mxG.K].a.variationMarksOn=1;
mxG.D[mxG.K].a.siblingsOn=0;
mxG.D[mxG.K].a.hideSingleVariationMarkOn=1;
mxG.D[mxG.K].a.variationBoxOn=0;
mxG.D[mxG.K].a.canPlaceVariation=1;
mxG.D[mxG.K].start();
