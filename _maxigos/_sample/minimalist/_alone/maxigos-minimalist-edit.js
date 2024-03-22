// maxiGos v8 Minimalist+Edit copyright 1998-2024 FM&SH, BSD license
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
if(!mxG.G.prototype.createMenu)
{
mxG.fr("File","Fichier");
mxG.fr("Edit","Édition");
mxG.fr("View","Affichage");
mxG.fr("Window","Fenêtre");
mxG.fr("Untitled","SansTitre");
mxG.G.prototype.toggleMenu=function(m,s)
{
	let e=this.getE(m+"SubMenu"),c="mxSubMenuOpen";
	if(s)
	{
		let list=this.getE("MenuBox").querySelectorAll('.mxSubMenu');
		this.getE(m+"Btn").focus();
		for(k=0;k<list.length;k++)
			if(list[k]==e)list[k].classList.add(c);
			else list[k].classList.remove(c);
	}
	else e.classList.remove(c);
}
mxG.G.prototype.addSubMenuItem=function(e,b)
{
	let k=this.k,c=document.createElement("li");
	b.tabindex="-1";
	e.appendChild(c);
	this.addBtn(c,b);
}
mxG.G.prototype.doFocusOneMenu=function(ev)
{
	let e=ev.target;
	this.toggleMenu(e.id.replace(/^d[0-9]+([A-Za-z]+)Btn$/,"$1"),1);
	if(e.classList.contains("mxViewBtn"))this.setViewCoche();
	if(e.classList.contains("mxWindowBtn"))this.setWindowMenu();
}
mxG.G.prototype.doBlurMenu=function(ev)
{
	let e=ev.target,k=this.k;
	while(!e.classList.contains("mxOneMenu"))e=e.parentNode;
	setTimeout(function(){
		if(!e.parentNode.contains(document.activeElement))
			mxG.D[k].toggleMenu(e.id.replace(/^d[0-9]+([A-Za-z]+)Menu$/,"$1"),0);},200);
}
mxG.G.prototype.getFirstEnableMenuBtn=function()
{
	return this.getE("MenuBox").querySelector('button:enabled');
}
mxG.G.prototype.focusFirstSubMenu=function(ev)
{
	let e=ev.target.parentNode.querySelector('.mxSubMenu button');
	if(e)e.focus();
}
mxG.G.prototype.focusPredSubMenu=function(ev)
{
	let e=ev.target.parentNode.previousElementSibling;
	if(e)e.querySelector('button').focus();
	else ev.target.parentNode.parentNode.previousElementSibling.focus();
}
mxG.G.prototype.focusNextSubMenu=function(ev)
{
	let e=ev.target.parentNode.nextElementSibling;
	if(e)e.querySelector('button').focus();
}
mxG.G.prototype.doSwitchWindow=function(k)
{
	this.toggleMenu("Window",0);
	this.rN.cN=this.cN;
	this.rN=this.rNs[k];
	this.backNode(this.rN.cN?this.rN.cN:this.rN.Kid[0]);
	if(this.hasC("Tree"))this.hasToSetTree=1;
	this.updateAll();
}
mxG.G.prototype.setWindowMenu=function()
{
	let s="",b={},items,z=this.k;
	for(let k=0;k<this.rNs.length;k++)
	{
		b.n="Win"+k;
		if(this.rNs[k].sgf)b.v=this.rNs[k].sgf.replace(/\.sgf$/,"");
		else b.v=this.local("Untitled");
		s+=`<li><button tabindex="-1"`
		+` class="mxBtn"${(this.rNs[k]==this.rN)?" mxCoched":" mxCochable"}" id="${this.n+b.n}Btn">`
		+`<span>${b.v}</span></button></li>`;
	}
	this.getE("WindowSubMenu").innerHTML=s;
	items=this.getE("WindowSubMenu").querySelectorAll('.mxBtn');
	for(let k=0;k<items.length;k++)
	{
		items[k].addEventListener("click",function(){mxG.D[z].doSwitchWindow(k);});
		items[k].addEventListener("blur",function(ev){mxG.D[z].doBlurMenu(ev);});
		items[k].addEventListener("keydown",function(ev){mxG.D[z].doKeydownSubMenu(ev);});
	}
}
mxG.G.prototype.doKeydownMenu=function(ev)
{
	if(ev.metaKey||ev.ctrlKey||ev.altKey)return;
	if(ev.key.match(/^[bcotv]$/i))this.doAlphaKeydown(ev);
}
mxG.G.prototype.doKeydownOneMenu=function(ev)
{
	let r;
	if(ev.metaKey||ev.ctrlKey||ev.altKey)return;
	if(ev.key=="ArrowDown"){this.focusFirstSubMenu(ev);r=1;}
	if(r)ev.preventDefault();
}
mxG.G.prototype.doKeydownSubMenu=function(ev)
{
	let r;
	if(ev.metaKey||ev.ctrlKey||ev.altKey)return;
	if(ev.key=="ArrowUp"){this.focusPredSubMenu(ev);r=1;}
	else if(ev.key=="ArrowDown"){this.focusNextSubMenu(ev);r=1;}
	if(r)ev.preventDefault();
}
mxG.G.prototype.doFile=function(){this.toggleMenu("File",1);}
mxG.G.prototype.doEdit=function(){this.toggleMenu("Edit",1);}
mxG.G.prototype.doView=function(){this.toggleMenu("View",1);}
mxG.G.prototype.doWindow=function(){this.toggleMenu("Window",1);}
mxG.G.prototype.initMenu=function()
{
	let a=this.menus,z=this.k;
	this.getE("MenuBox").addEventListener("keydown",function(ev){mxG.D[z].doKeydownMenu(ev);});
	for(let m of a)
	{
		let oneMenu,oneBtn,subMenu,subBtn,items;
		oneMenu=this.getE(m+"Menu");
		subMenu=this.getE(m+"SubMenu");
		this.addBtn(oneMenu,{n:m,v:this.local(m),first:1});
		oneBtn=oneMenu.firstChild;
		oneBtn.addEventListener("focus",function(ev){mxG.D[z].doFocusOneMenu(ev);});
		oneBtn.addEventListener("blur",function(ev){mxG.D[z].doBlurMenu(ev);});
		oneBtn.addEventListener("keydown",function(ev){mxG.D[z].doKeydownOneMenu(ev);});
		items=this["menu"+m+"Items"];
		if(items)for(let i of items)
		{
			this.addSubMenuItem(subMenu,i);
			subBtn=subMenu.querySelector("li:last-of-type .mxBtn");
			subBtn.addEventListener("blur",function(ev){mxG.D[z].doBlurMenu(ev);});
			subBtn.addEventListener("keydown",function(ev){mxG.D[z].doKeydownSubMenu(ev);});
		}
	}
}
mxG.G.prototype.createMenu=function()
{
	let m,a;
	m=this.setA("menus","","string");
	a=this.menus=m?m.split(/[\s]*[,][\s]*/):[];
	if(!a.length)return ``;
	let s=`<menu class="mxMenuBox" id="${this.n}MenuBox">`;
	for(let b of a)
	{
		s+=`<li class="mxOneMenu" id="${this.n+b}Menu">`
		+`<menu class="mxSubMenu" id="${this.n+b}SubMenu"></menu>`
		+`</li>`;
	}
	return s+`</menu>`;
}
}
if(!mxG.G.prototype.createFile)
{
mxG.fr(" Close ","Fermer");
mxG.fr("Add","Ajouter");
mxG.fr("Alert","Alerte");
mxG.fr("Cancel","Annuler");
mxG.fr("Click here to open a sgf file","Cliquer ici pour ouvrir un fichier sgf");
mxG.fr("Close","Fermer");
mxG.fr("Create","Créer");
mxG.fr("Email:","Email :");
mxG.fr("Error","Erreur");
mxG.fr("File name:","Nom du fichier :");
mxG.fr("Goban size","Taille du goban");
mxG.fr("New","Nouveau");
mxG.fr("OK","OK");
mxG.fr("Open","Ouvrir");
mxG.fr("Save","Enregistrer");
mxG.fr("Save on your device","Enregistrer sur votre machine");
mxG.fr("Send","Envoyer");
mxG.fr("Send by email","Envoyer par email");
mxG.fr("This is not a sgf file!","Ce n'est pas un fichier sgf !");
mxG.fr("Untitled","SansTitre");
mxG.fr("Values between 1 and 52:","Valeurs entre 1 et 52 :");
mxG.fr("Your browser cannot do this!","Votre navigateur ne peut pas faire ça !");
mxG.G.prototype.canOpen=function()
{
	let r;
	return !(typeof FileReader=='undefined')&&(r=new FileReader())&&(r.readAsText);
}
mxG.G.prototype.cleanUpSZ=function(s)
{
	let a=s.replace(/[^0-9:x]/g,"").match(/^([0-9]+)([x:]([0-9]+))?$/);
	if(a)
	{
		let DX=mxG.min1max52(a[1]),DY=DX;
		if(a[3])DY=mxG.min1max52(a[3]);
		return (DX==DY)?DX+"":(DX+":"+DY);
	}
	return "19";
}
mxG.G.prototype.doAlert=function(msg)
{
	let s=`<h1 tabindex="0">${this.local("Alert")}</h1><p>${msg}</p>`;
	this.doDialog("Alert",s,[{n:" Close "}]);
}
mxG.G.prototype.doNewOK=function(a)
{
	let aST=this.getInfo("ST"),aSZ=this.getE("DimensionInput").value,aN;
	if(a=="Create")
	{
		if(this.getE("WindowMenu"))
		{
			this.rN.cN=this.cN;
			this.rNs.push(this.rN=new mxG.N(null,null,null));
		}
		else
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
	if(parseInt(aST))aN.P["ST"]=[aST];
	this.backNode(aN);
	if(this.hasC("Tree"))this.hasToSetTree=1;
	this.updateAll();
}
mxG.G.prototype.doAddOK=function()
{
	this.doNewOK("Add");
}
mxG.G.prototype.doCreateOK=function()
{
	this.doNewOK("Create");
}
mxG.G.prototype.doNew=function()
{
	let btns=[{n:"Add",a:"Add"},{n:"Create",a:"Create"},{n:"Cancel"}],
		sz=this.DX+"x"+this.DY,id=`${this.n}DimensionInput`,s;
	s=`<h1 tabindex="0">${this.local("Goban size")}</h1>`
	+`<p>`
	+`<label for="${id}">${this.local("Values between 1 and 52:")} </label>`
	+`<input id="${id}" name="${this.n}DimensionInput" type="text" size="5" value="${sz}">`
	+`</p>`;
	this.doDialog("New",s,btns);
}
mxG.G.prototype.doOpenOK=function()
{
	let a,r;
	r=new FileReader();
	r.gos=this;
	r.f=this.getE("SgfFile").files[0];
	if(!((r.f.name?r.f.name:r.f.fileName).match(/\.sgf$/)))
	{
		this.doAlert(this.local("This is not a sgf file!"));
		return;
	}
	r.addEventListener('load',function(ev)
	{
		let s=ev.target.result,m,c;
		if(!this.c)
		{
			if(m=s.match(/CA\[([^\]]*)\]/))c=m[1].toUpperCase();else c="ISO-8859-1";
			if(c!="UTF-8")
			{
				this.c=c;
				this.readAsText(this.f,c);
				return;
			}
		}
		if(this.gos.getE("WindowMenu"))this.gos.rN.cN=this.gos.cN;
		this.gos.rN=new mxG.P(s,this.sgfLoadCoreOnly,this.sgfLoadMainOnly);
		if(this.gos.getE("WindowMenu"))this.gos.rNs.push(this.gos.rN);
		this.gos.backNode(this.gos.kidOnFocus(this.gos.rN));
		if(this.gos.hasC("Tree"))this.gos.hasToSetTree=1;
		this.gos.rN.sgf=(this.f.name?this.f.name:this.f.fileName);
		this.gos.updateAll();
	});
	r.readAsText(r.f);
}
mxG.G.prototype.doOpen=function()
{
	if(this.canOpen())
	{
		let s=`<h1 tabindex="0">${this.local("Open")}</h1>`
		+`<p>`
		+`<button id="${this.n}SgfFileInput" onclick="document.getElementById('${this.n}SgfFile').click()">${this.local("Click here to open a sgf file")}</button>`
		+`<input type="file" id="${this.n}SgfFile" onchange="${this.g}.doOpenOK()">`
		+`</p>`;
		this.doDialog("Open",s,[{n:" Close "}]);
	}
	else this.doAlert(this.local("Your browser cannot do this!"));
}
mxG.G.prototype.doClose=function()
{
	let k,km,n=0;
	km=this.rNs.length;
	if(this.hasC("Menu"))this.toggleMenu("File",0);
	if(km<2)
	{
		this.rN=new mxG.P("",0,0);
		this.rN.sgf="";
		this.rNs=[this.rN];
		this.backNode(this.kidOnFocus(this.rN));
	}
	else
	{
		k=this.rNs.indexOf(this.rN);
		if(k>=0)this.rNs.splice(k,1);
		this.rN=this.rNs[0];
		this.backNode(this.rN.cN);
	}
	if(this.hasC("Tree"))this.hasToSetTree=1;
	this.updateAll();
}
mxG.G.prototype.doSaveOK=function()
{
	let f=this.getE("SaveFileName").value;
	if(f)
	{
		if(!f.match(/\.sgf$/))f+=".sgf";
		this.rN.sgf=f;
		this.getE("SaveFileName").value=f;
		this.doDownloadSgf(f);
	}
	this.updateAll();
}
mxG.G.prototype.doSave=function()
{
	let f,
		s=`<h1 tabindex="0">${this.local("Save on your device")}</h1>`
		+`<p>`
		+`<label for="${this.n}SaveFileName">${this.local("File name:")} </label>`
		+`<input id="${this.n}SaveFileName" name="FileName" type="text" size="32">`
		+`</p>`;
	this.doDialog("Save",s,[{n:"OK",a:"Save"},{n:"Cancel"}]);
	f=this.rN.sgf?this.rN.sgf:(this.local("Untitled")+".sgf");
	this.getE("SaveFileName").value=f;
}
mxG.G.prototype.doSendOK=function()
{
	let m="mailto:";
	m+=this.getE("SendEmail").value;
	m+="?subject=maxiGos";
	m+="&body="+encodeURIComponent(this.buildSgf());
	window.location.href=m;
	this.updateAll();
}
mxG.G.prototype.doSend=function()
{
	let s=`<h1 tabindex="0">${this.local("Send by email")}</h1>`
		+`<p>`
		+`<label for="${this.n}SendEmail">${this.local("Email:")} </label>`
		+`<input id="${this.n}SendEmail" name="${this.n}SendEmail" type="text" size="40">`
		+`</p>`;
	this.doDialog("Send",s,[{n:"OK",a:"Send"},{n:"Cancel"}]);
}
mxG.G.prototype.createFile=function()
{
	this.menuFileItems=
	[
		{n:"New",v:this.local("New")},
		{n:"Open",v:this.local("Open")},
		{n:"Close",v:this.local("Close")},
		{n:"Save",v:this.local("Save")},
		{n:"Send",v:this.local("Send")}
	];
	return "";
}
}
if(!mxG.G.prototype.createView)
{
mxG.fr("2d/3d","2d/3d");
mxG.fr("Cancel","Annuler");
mxG.fr("Colors","Couleurs");
mxG.fr("Goban background color:","Couleur de fond du goban :");
mxG.fr("Goban background image:","Image de fond du goban :");
mxG.fr("Line color:","Couleur des lignes :");
mxG.fr("Line thickness:","Épaisseur des lignes :");
mxG.fr("Mark thickness:","Épaisseur des marques :");
mxG.fr("No zoom","Normal");
mxG.fr("None","Aucune");
mxG.fr("OK","OK");
mxG.fr("Reset","Réinitialiser");
mxG.fr("Slate and shell","Ardoise et coquillage");
mxG.fr("Star radius:","Rayon des hoshis :");
mxG.fr("Stone outline thickness:","Épaisseur des contours des pierres :");
mxG.fr("Stone shadow","Ombre des pierres");
mxG.fr("Stretching","Étirement");
mxG.fr("Text outline thickness:","Épaisseur des contours des lettres :");
mxG.fr("Thickness","Épaisseurs");
mxG.fr("Zoom+","Agrandir");
mxG.fr("Zoom-","Réduire");
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
	this.setViewItemCoche("SpecialStone",this.specialStoneOn);
	this.setViewItemCoche("ZoomPlus",this.gscale>1?1:0);
	this.setViewItemCoche("NoZoom",this.gscale==1?1:0);
	this.setViewItemCoche("ZoomMinus",this.gscale<1?1:0);
}
mxG.G.prototype.setIndicesView=function()
{
	let g=this.getE("GobanSvg").querySelector(".mxIndices");
	if(g)
	{
		g.setAttributeNS(null,"fill",this.scr.glc);
		if(this.sw4text!="0")
		{
			g.setAttributeNS(null,"stroke",this.scr.glc);
			g.setAttributeNS(null,"stroke-width",this.scr.sw4text);
		}
		else
		{
			g.removeAttributeNS(null,"stroke");
			g.removeAttributeNS(null,"stroke-width");
		}
	}
}
mxG.G.prototype.setGobanBk=function()
{
	let g,svg,im,bk,c;
	g=this.getE("GobanBox");
	if(!g)return;
	im=g.querySelector("svg image");
	if(im)im.remove();
	if(this.gbki)
	{
		if(this.gbki!="none")
		{
			im='';
  			im+='<image';
			im+=' x="0" y="0" width="'+this.scr.w+'" height="'+this.scr.h+'"';
			im+=' preserveAspectRatio="none"';
			im+=' href="'+this.gbki+'"';
			im+='/>';
			svg=g.querySelector("svg");
			svg.innerHTML=svg.innerHTML.replace(/(<rect[^>]+Outer)/,im+"$1");
		}
	}
	bk=g.querySelector(".mxWholeRect");
	c=this.gbkc?((this.gbkc=="transparent")?"none":this.gbkc):"none";
	if(bk)bk.setAttributeNS(null,"fill",c);
}
mxG.G.prototype.setInputColors=function()
{
	let e,c,list,k,km,bkk;
	if(this.gbki&&(this.gbki!="none"))
	{
		c="";
		bkk=Object.keys(this.bk);
		km=bkk.length;
		for(k=0;k<km;k++)if(this.bk[bkk[k]]==this.gbki)break;
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
	this.getE("LineColorTextInput").value=this.scr.glc;
}
mxG.G.prototype.doTextInputGobanBk=function()
{
	e=document.querySelector("[name="+this.n+"GobanBkRadio][value=none]");
	e.checked=true;
}
mxG.G.prototype.buildColors=function()
{
	return `<h1 tabindex="0">${this.local("Colors")}</h1><p>`
	+`<label class="mxGobanBkTextInput" for="${this.n}GobanBkTextInput">${this.local("Goban background color:")}`
	+` <input type="text" oninput="${this.g}.doTextInputGobanBk()" id="${this.n}GobanBkTextInput">`
	+`</label>`
	+`</p><p>${this.local("Goban background image:")}</p><p>`
	+`<label class="mxGobanBkRadio">`
	+`<input name="${this.n}GobanBkRadio" checked value="none" type="radio">`
	+` ${this.local("None")}</label>`
	+`<label class="mxGobanBkRadio">`
	+`<input name="${this.n}GobanBkRadio" value="Bamboo" type="radio">`
	+` ${this.local("Bamboo")}</label>`
	+`<label class="mxGobanBkRadio">`
	+`<input name="${this.n}GobanBkRadio" value="Beech" type="radio">`
	+` ${this.local("Beech")}</label>`
	+`<label class="mxGobanBkRadio">`
	+`<input name="${this.n}GobanBkRadio" value="Cherry" type="radio">`
	+` ${this.local("Cherry")}</label>`
	+`<label class="mxGobanBkRadio">`
	+`<input name="${this.n}GobanBkRadio" value="Kaya" type="radio">`
	+` ${this.local("Kaya")}</label>`
	+`<label class="mxGobanBkRadio">`
	+`<input name="${this.n}GobanBkRadio" value="Pine" type="radio">`
	+` ${this.local("Pine")}</label>`
	+`<label class="mxGobanBkRadio">`
	+`<input name="${this.n}GobanBkRadio" value="Rosewood" type="radio">`
	+` ${this.local("Rosewood")}</label>`
	+`<label class="mxGobanBkRadio">`
	+`<input name="${this.n}GobanBkRadio" value="Troyes" type="radio">`
	+` ${this.local("Troyes")}</label>`
	+`</p><p>`
	+`<label class="mxLineTextInput">`+this.local("Line color:")
	+` <input type="text" id="${this.n}LineColorTextInput">`
	+`</label>`
	+`</p>`;
}
mxG.G.prototype.doColorsOK=function()
{
	let e,a,b,c;
	e=document.querySelector("[name="+this.n+"GobanBkRadio]:checked");
	if(!e||(e.value=="none"))c="none";
	else c=this.bk[e.value];
	this.gbki=c;
	if(c=="none")
	{
		a=this.getE("GobanBkTextInput").value;
		if(!CSS.supports('color',a))a="transparent";
	}
	else a="";
	this.gbkc=a;
	b=this.getE("LineColorTextInput").value;
	if(!CSS.supports('color',b))b="#000";
	this.scr.glc=b;
	window.localStorage.setItem("gbki",this.gbki);
	window.localStorage.setItem("gbkc",this.gbkc);
	window.localStorage.setItem("glc",this.scr.glc);
	this.updateAll();
}
mxG.G.prototype.doColors=function()
{
	let btns=[{n:"OK",a:"Colors"},{n:"Cancel"}];
	this.doDialog("EditColors",this.buildColors(),btns);
	this.setInputColors();
}
mxG.G.prototype.setInputThickness=function()
{
	this.getE("R4starInput").value=this.scr.r4star;
	this.getE("Sw4gridInput").value=this.scr.sw4grid;
	this.getE("Sw4markInput").value=this.scr.sw4mark;
	this.getE("Sw4stoneInput").value=this.scr.sw4stone;
	this.getE("Sw4textInput").value=this.scr.sw4text;
}
mxG.G.prototype.buildThickness=function()
{
	return `<h1 tabindex="0">${this.local("Thickness")}</h1>`
	+`<p><label class="mxR4starInput">`+this.local("Star radius:")
	+` <input type="text" id="${this.n}R4starInput">`
	+`</label></p><p><label class="mxSw4gridInput">`+this.local("Line thickness:")
	+` <input type="text" id="${this.n}Sw4gridInput">`
	+`</label></p><p><label class="mxSw4markInput">`+this.local("Mark thickness:")
	+` <input type="text" id="${this.n}Sw4markInput">`
	+`</label></p><p><label class="mxSw4stoneInput">`+this.local("Stone outline thickness:")
	+` <input type="text" id="${this.n}Sw4stoneInput">`
	+`</label></p><p><label class="mxSw4textInput">`+this.local("Text outline thickness:")
	+` <input type="text" id="${this.n}Sw4textInput">`
	+`</label></p>`;
}
mxG.G.prototype.numberize=function(s)
{
	let n=parseFloat(s);
	if(!n||(n<0)||(n>this.scr.d))return "0";
	return n+"";
}
mxG.G.prototype.doThicknessOK=function()
{
	this.scr.r4star=this.numberize(this.getE("R4starInput").value);
	window.localStorage.setItem("r4star",this.scr.r4star);
	this.scr.sw4grid=this.numberize(this.getE("Sw4gridInput").value);
	window.localStorage.setItem("sw4grid",this.scr.sw4grid);
	this.scr.sw4mark=this.numberize(this.getE("Sw4markInput").value);
	window.localStorage.setItem("sw4mark",this.scr.sw4mark);
	this.scr.sw4stone=this.numberize(this.getE("Sw4stoneInput").value);
	window.localStorage.setItem("sw4stone",this.scr.sw4stone);
	this.scr.sw4text=this.numberize(this.getE("Sw4textInput").value);
	window.localStorage.setItem("sw4text",this.scr.sw4text);
	this.hasToSetGoban=1;
	if(this.hasC("Edit"))this.hasToSetEditTools=1;
	if(this.hasC("Tree"))this.hasToSetTree=1;
	this.updateAll();
}
mxG.G.prototype.doThickness=function()
{
	let btns=[{n:"OK",a:"Thickness"},{n:"Cancel"}];
	this.doDialog("EditThickness",this.buildThickness(),btns);
	this.setInputThickness();
}
mxG.G.prototype.doZoom=function(s)
{
	if(this.hasC("Menu"))this.toggleMenu("View",0);
	if(s=="+")this.gscale*=1.1;
	else if(s=="-")this.gscale/=1.1;
	else this.gscale=1;
	this.gscale=Number(this.gscale.toFixed(1));
	window.localStorage.setItem("gscale",this.gscale);
	if(this.gscale!=1)
		this.getE("Global").style.setProperty('--gobanScale',this.gscale);
	else
		this.getE("Global").style.removeProperty('--gobanScale');
	this.updateAll();
}
mxG.G.prototype.doZoomPlus=function(){this.doZoom("+");}
mxG.G.prototype.doNoZoom=function(){this.doZoom("=");}
mxG.G.prototype.doZoomMinus=function(){this.doZoom("-");}
mxG.G.prototype.doIn3d=function()
{
	if(this.hasC("Menu"))this.toggleMenu("View",0);
	this.in3dOn=this.in3dOn?0:1;
	this.setIn3d();
	this.hasToSetGoban=1;
	if(this.hasC("Tree"))this.hasToSetTree=1;
	if(this.hasC("Edit"))this.hasToSetEditTools=1;
	window.localStorage.setItem("in3dOn",this.in3dOn+"");
	this.updateAll();
}
mxG.G.prototype.doStretching=function()
{
	if(this.hasC("Menu"))this.toggleMenu("View",0);
	if(this.stretching=="0,0,1,1")this.stretching="0,1,1,2";
	else this.stretching="0,0,1,1";
	this.hasToSetGoban=1;
	if(this.hasC("Tree"))this.hasToSetTree=1;
	if(this.hasC("Edit"))this.hasToSetEditTools=1;
	window.localStorage.setItem("stretching",this.stretching);
	this.updateAll();
}
mxG.G.prototype.doStoneShadow=function()
{
	if(this.hasC("Menu"))this.toggleMenu("View",0);
	this.stoneShadowOn=this.stoneShadowOn?0:1;
	this.hasToSetGoban=1;
	if(this.hasC("Tree"))this.hasToSetTree=1;
	if(this.hasC("Edit"))this.hasToSetEditTools=1;
	window.localStorage.setItem("stoneShadowOn",this.stoneShadowOn+"");
	this.updateAll();
}
mxG.G.prototype.doSpecialStone=function()
{
	if(this.hasC("Menu"))this.toggleMenu("View",0);
	this.specialStoneOn=this.specialStoneOn?0:1;
	this.hasToSetGoban=1;
	if(this.hasC("Tree"))this.hasToSetTree=1;
	if(this.hasC("Edit"))this.hasToSetEditTools=1;
	window.localStorage.setItem("specialStoneOn",this.specialStoneOn+"");
	this.updateAll();
}
mxG.G.prototype.doReset=function()
{
	if(this.hasC("Menu"))this.toggleMenu("View",0);
	this.doNoZoom();
	window.localStorage.clear();
	this.in3dOn=this.setA("in3dOn",0,"bool");
	this.setIn3d();
	this.stoneShadowOn=this.setA("stoneShadowOn",0,"bool");
	this.specialStoneOn=this.setA("specialStoneOn",0,"bool");
	this.stretching=this.setA("stretching","0,0,1,1","string");
	this.initView();
	this.hasToSetGoban=1;
	if(this.hasC("Tree"))this.hasToSetTree=1;
	if(this.hasC("Edit"))this.hasToSetEditTools=1;
	this.updateAll();
}
mxG.G.prototype.updateAfterView=function()
{
	this.setGobanBk();
	this.setIndicesView();
}
mxG.G.prototype.initView=function()
{
	let e=this.getE("Global"),dir,v,s,indicesOff;
	dir="../_img/bk/";
	this.bk={};
	this.bk["Bamboo"]="data:image/jpeg;base64,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";
	this.bk["Beech"]="data:image/jpeg;base64,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";
	this.bk["Cherry"]="data:image/jpeg;base64,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";
	this.bk["Kaya"]="data:image/jpeg;base64,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";
	this.bk["Pine"]="data:image/jpeg;base64,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";
	this.bk["Rosewood"]="data:image/jpeg;base64,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";
	this.bk["Troyes"]="data:image/jpeg;base64,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";
	if(v=window.localStorage.getItem("in3dOn"))
	{
		this.in3dOn=parseInt(v);
		this.setIn3d();
	}
	if(v=window.localStorage.getItem("gbki"))this.gbki=v;else this.gbki="none";
	if(v=window.localStorage.getItem("gbkc"))this.gbkc=v;else this.gbkc="transparent";
	if(v=window.localStorage.getItem("glc"))this.scr.glc=v;else this.scr.glc="#000";
	if(v=window.localStorage.getItem("r4star"))this.scr.r4star=v;else this.scr.r4star="2.5";
	if(v=window.localStorage.getItem("sw4grid"))this.scr.sw4grid=v;else this.scr.sw4grid="1";
	if(v=window.localStorage.getItem("sw4mark"))this.scr.sw4mark=v;else this.scr.sw4mark="1";
	if(v=window.localStorage.getItem("sw4stone"))this.scr.sw4stone=v;else this.scr.sw4stone="1";
	if(v=window.localStorage.getItem("sw4text"))this.scr.sw4text=v;else this.scr.sw4text="0";
	if(v=window.localStorage.getItem("stretching"))this.stretching=v;
	if(v=window.localStorage.getItem("stoneShadowOn"))this.stoneShadowOn=parseInt(v);
	if(v=window.localStorage.getItem("specialStoneOn"))this.specialStoneOn=parseInt(v);
	if(v=window.localStorage.getItem("gscale"))this.gscale=parseFloat(v);else this.gscale=1;
	if(this.gscale!=1)this.getE("Global").style.setProperty('--gobanScale',this.gscale);
}
mxG.G.prototype.createView=function()
{
	this.menuViewItems=
	[
		{n:"In3d",v:this.local("2d/3d")},
		{n:"Stretching",v:this.local("Stretching")},
		{n:"StoneShadow",v:this.local("Stone shadow")},
		{n:"SpecialStone",v:this.local("Slate and shell")},
		{n:"Colors",v:this.local("Colors")},
		{n:"Thickness",v:this.local("Thickness")},
		{n:"ZoomPlus",v:this.local("Zoom+")},
		{n:"NoZoom",v:this.local("No zoom")},
		{n:"ZoomMinus",v:this.local("Zoom-")},
		{n:"Reset",v:this.local("Reset")}
	];
	return "";
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
if(!mxG.G.prototype.createHelp)
{
mxG.fr(" Close ","Fermer");
mxG.fr("Help","Aide");
mxG.fr("Help_Data",`<h1 tabindex="0">Aide</h1><h2>Principe général</h2><p>Cet outil permet d\'éditer des parties ou diagrammes de go au format sgf. Cliquez sur le goban pour y placer des pierres, des marques ou des étiquettes. Utilisez le menu pour afficher un nouveau goban, ouvrir un fichier sgf, l\'enregistrer, ou l\'envoyer par email. Utilisez la barre de navigation sous le goban pour parcourir l\'arbre des coups. Cliquer sur l'un des boutons pour effectuer une action spécifique, ou utilisez la barre d\'outils pour changer d\'action. Utilisez la boite de saisie pour commenter la position affichée sur le goban. Cliquez sur un noeud de l\'arbre pour afficher la position correspondante à ce noeud.</p><h2>Les menus</h2><h3>Le menu "Fichier"</h3><p>"Nouveau" : commence la saisie d'un nouvel arbre de coups sur un goban de n\'importe quelle taille pas forcément carré. On peut soit créer un nouvel enregistrement pour cet arbre de coups, soit ajouter l'arbre des coups à l\'enregistrement en cours (auquel cas l'enregistrement en cours contiendra plusieurs arbres de coups) afin de pouvoir éditer plusieurs parties se trouvant dans un même fichier. Cependant il faut savoir que si tel est le cas, beaucoup de lecteurs ne pourront pas lire ces parties.</p><p>"Ouvrir" : ouvre un fichier sgf stocké sur votre machine (ce n\'est pas toujours possible car cela dépend des machines : certains appareils mobiles en particulier ne vous permettront pas cette possibilité).</p><p>"Fermer" : ferme le fichier sgf en cours.</p><p>"Enregistrer" : enregistre votre saisie sous forme de fichier sgf sur votre machine (ce n\'est pas toujours possible car cela dépend des machines : certains appareils mobiles en particulier ne vous permettront pas cette possibilité).</p><p>"Envoyer" : envoie par email votre saisie sous forme de fichier sgf (utile pour les machines ne permettant pas d\'y enregistrer un fichier).</p><h3>Le menu "Édition"</h3><p>"Couper" : coupe une variation. Voir aussi le paragraphe "Couper une variante" ci-dessous pour plus de détails.</p><p>"Copier" : copie une variation. Voir aussi le paragraphe "Copier une variante" ci-dessous pour plus de détails.</p><p>"Coller" : colle une variation. Voir aussi le paragraphe "Coller une variante" ci-dessous pour plus de détails. <p>"Supprimer les commentaires" : permet de supprimer tous les commentaires du sgf.</p></p><h3>Le menu "Affichage"</h3><p>"2d/3d" : affiche le lecteur en 2d ou en 3d.</p><p>"Étirement" : rend le goban légèrement rectangulaire (les gobans physiques sont souvent légèrement rectangulaire).</p><p>"Ombre des pierres" : ajoute une ombre aux pierres (uniquement si l'affichage est en 3d).</p><p>"Couleurs" : permet de changer le fond du goban ou la couleur de ses lignes.</p><p>Pour le fond du goban, on peut choisir n\'importe quelle couleur css ou une image. Pour les lignes, on peut choisir n\'importe quelle couleur css.</p><p>"Agrandir" : agrandit la taille du goban.</p><p>"Normal" : ramène le goban à sa taille initiale.</p><p>"Réduire" : réduit la taille du goban.</p><p>"Réinitialiser" : réinitialise tous les paramètres modifiables via le menu "Affichage".</p><h3>Le menu "Fenêtre"</h3><p>Permet de changer le fichier sgf en cours d\'édition lorsque plusieurs fichiers sont ouverts en même temps.</p><h2>La barre de navigation</h2><p>Ses boutons permettent de se déplacer dans l\'arbre des coups.</p><p>Pour passer, il suffit de cliquer sur le bouton "Passe".</p><p>Il est aussi possible de naviguer en utilisant le clavier. Le goban ou l'arbre des coups doivent avoir le focus pour que cette fonctionalité soit activée : cliquez sur le goban ou l'arbre des coups, ou bien utilisez la touche "Tabulation" pour leur donner ce focus. Appuyez ensuite sur la touche "Majuscule" combinée à l'une des touches de la liste ci-dessous pour naviguer dans l'arbre des coups.</p><ul><li>Touche "Flèche gauche": recule d\'un coup</li><li>Touche "Flèche droite" : place un coup</li><li>Touche "Page précédente" : recule de 10 coups (s\'arrête avant si un coup ayant des variations est rencontré)</li><li>Touche "Page suivante" : place 10 coups (s\'arrête avant si un coup ayant des variations est rencontré)</li><li>Touche "Début" : recule au premier coup</li><li>Touche "Fin" : place tous les coups</li><li>Touche "Flèche vers le haut" : change la variation du prochain coup (en cas de style de variation dit "enfants") ou la variation du coup courant (en cas de style de variation dit "jumeaux")</li><li>Touche "Flèche vers le bas" : change la variation du prochain coup (en cas de style de variation dit "enfants") ou la variation du coup courant (en cas de style de variation dit "jumeaux")</li></ul><p>Pour changer d\'arbre de coups quand plusieurs arbres sont présents dans un enregistrement, on peut se placer sur le premier coup de l\'arbre courant, puis utiliser les touches flèche vers le haut ou flèche vers le bas tout en appuyant sur les touches "Majuscule" + "Option" ou "Alt".</p><p>Si on donne le focus au goban en ayant cliquer dessus, on pourra utiliser les touches précédentes pour se déplacer dans l'arbre des coups.<p>Mais on peut aussi donner le focus au goban via la touche "Tabulation". Dans ce cas, un carré s'affiche sur l'une des intersections du goban. On peut alors utiliser les touches flèche gauche, flèche droite, flèche vers le haut, flèche vers le bas (sans appuyer sur la touche "Majuscule") non pas pour se déplacer dans l\'arbre des coups, mais pour déplacer le carré, et finalement appuyer sur la touche "Retour" pour placer une pierre ou effectuer tout autre action selon l'outil qui est sélectionné dans la barre d'outil.</p><p>En utilisant les touches ci-dessus et les touches "Tabulation", "Majuscule + Tabulation", et "Retour", il est ainsi possible d\'exécuter toutes les commandes de maxiGos.</p><h2>Autres boutons</h2><p>Les boutons "PNG" et "SVG" permettent de fabriquer et afficher une image (format PNG et SVG) représentant la position affichée sur le goban. Cette image peut par exemple être utilisées comme illustration dans vos pages web. Pour l\'enregistrer sur votre machine, vous pouvez par exemple faire un clic-droit sur cette image et sélectionner dans le menu qui s'affiche "Enregistrer l\'image sous...".</p><p>Le bouton "SGF" permet d\'afficher ce qui a été saisi au format sgf (un enregistrement sgf est en fait du texte qui peut aussi être modifier via un simple éditeur de texte). On peut aussi modifier le sgf directement dans la fenêtre qui s\'affiche, ou y copier un autre sgf.</p><p>Le bouton "Score" permet d\'ajouter ou retirer les propriétés indiquant le score (propriétés sgf TB et TW).</p><h2>Vue partielle du goban</h2><p>Pour afficher une vue partielle du goban, cliquez sur l\'outil "Sélection" (un carré en pointillé dans la barre d\'outils), sélectionnez une partie du goban avec la souris ou son équivalent sur votre machine, en cliquant sur le coin supérieur gauche puis sur le coin inférieur droit de ce que vous voulez sélectionner (il n'est pas nécessaire de maintenir le bouton de la souris enfoncé pendant cette opération). Ensuite, cliquez sur l\'outil "Vue partielle/totale" (un petit carré à l\'intérieur d\'un grand carré dans la barre d\'outils) pour réduire le goban à la partie que vous avez sélectionnée.</p><p>Pour désélectionner la sélection sans réduire le goban, cliquez sur l\'outil "Sélection" lorsque celui-ci est déjà sélectionné.</p><p>Pour réafficher en entier le goban, cliquez sur l\'outil "Vue partielle/totale" lorsqu\'aucune sélection n\'est effectuée.</p><p>Important : la vue partielle est appliquée à partir du coup courant. Ceci veut dire que si l'on veut une vue partielle du goban pour l'ensemble d\'un arbre de coups, il faut appliquer la vue partielle via l\'outil "Vue partielle/totale" en étant placé sur le premier coup de cet arbre.</p><h2>Placer un coup et ajouter/retirer une pierre</h2><p>On a deux outils permettant d\'ajouter ou retirer une pierre sur le goban : l\'outil "Placer un coup" et l\'outil "Ajouter/retirer une pierre". L\'outil "Placer un coup" permet de placer une succession de coups éventuellement numérotés, tandis que l\'outil "Ajouter/retirer une pierre" permet de construire une position (ceci sert par exemple à placer des pierres de handicap ou construire la position initiale d\'un problème).</p><h3>L\'outil "Placer un coup"</h3><p>Lorsque l\'outil "Placer un coup" (une pierre noire ou blanche dans la barre d\'outils) est sélectionné, on peut placer des coups sur le goban. Si des pierres se retrouvent sans liberté, elles sont capturées automatiquement.</p><p>L\'éditeur essaie en permanence de déterminer la couleur du prochain coup qui sera placé. Il affiche alors une pierre noire ou une pierre blanche sur cet outil suivant le résultat de cette détermination.</p><p>Il est possible de changer la couleur du prochain coup qui sera posé en cliquant sur l\'outil "Placer un coup" lorque celui-ci est déjà sélectionné (il est donc possible d\'afficher deux coups de suite de la même couleur).</p><h3>L\'outil "Ajouter/retirer une pierre"</h3><p>Lorsque l\'outil "Ajouter/retirer une pierre" (une pierre moitié noire et moitié blanche dans la barre d\'outils) est sélectionné, on peut ajouter ou retirer des pierres sur le goban. Aucune capture n\'est effectuée. Si on clique sur une intersection inoccupée, on y ajoute une noire ou une blanche (si l\'image sur l\'outil a une demi-pierre noire à gauche, on ajoute une pierre noire, et si elle a une demi-pierre blanche à gauche, on ajoute une pierre blanche). Enfin, si on clique sur une intersection occupée, on retire la pierre qui s\'y trouve.</p><p>L\'utilisation de cet outil sur une position obtenue après avoir placé une série de coups a pour effet de réinitialiser la numérotation des coups. Les numéros des coups déjà placés sont retirés et le premier coup placé à partir de cette position aura le numéro 1.</p><p>Pour changer la couleur de la prochaine pierre qui sera posée, il suffit de cliquer sur l\'outil "Ajouter/retirer une pierre" lorsque celui-ci est déjà sélectionné.</p><h2>Couper une variation</h2><p>Pour couper une variation, afficher le premier coup de la variation sur le goban (en naviguant dans l\'arbre des coups via la barre de navigation, ou en cliquant sur la pierre correspondant au coup dans l\'arbre des coups lui-même), puis cliquez sur l\'outil "Couper une branche" (une paire de ciseaux dans la barre d\'outils).</p><h2>Copier une variation</h2><p>Pour copier une variation, afficher le premier coup de la variation sur le goban (en naviguant dans l\'arbre des coups via la barre de navigation, ou en cliquant sur la pierre correspondant au coup dans l\'arbre des coups lui-même), puis cliquez sur l\'outil "Copier une branche" (deux feuilles se superposant dans la barre d\'outils).</p><h2>Coller une variation</h2><p>Pour coller une variation précédemment coupée ou copiée, afficher le dernier coup précédant la variation sur le goban (en naviguant dans l\'arbre des coups via la barre de navigation, ou en cliquant sur la pierre correspondant au coup dans l\'arbre des coups lui-même), puis cliquez sur l\'outil "Coller une branche" (une feuille venant en superposition sur un support dans la barre d\'outils).</p><p class="important">MaxiGos ne fait aucune vérification de cohérence de ce qui sera collé.</p><p>Cette fonction peut être utile quand on s\'aperçoit a posteriori qu\'on a oublié de placer un échange de coups. Il convient alors d\'aller au coup suivant l\'échange, couper la branche, placer les coups manquants, et coller la branche précédemment coupée.</p><p>Cette fonction peut aussi être utile quand on s\'aperçoit a posteriori qu\'on a placé un échange de coups en trop. Il convient alors d\'aller au coup suivant l\'échange, copier la branche, revenir au coup précédent l\'échange, coller la branche précédemment copiée, revenir sur le premier coup de l\'échange à supprimer et couper la branche qui ne contient alors plus que les deux coups de cet échange.</p><h2>Marques et étiquettes</h2><p>Pour ajouter ou retirer une marque ou étiquette, sélectionnez l\'un des outils "Etiquette" (une lettre dans la barre d\'outils), "Marque" (une croix dans la barre d\'outils), "Triangle" (une triangle dans la barre d\'outils), "Cercle" (un cercle dans la barre d\'outils) ou "Carré" (un carré dans la barre d\'outils), puis cliquez sur l\'intersection où vous souhaitez l\'ajouter ou la retirer. Il est possible de changer le texte de la prochaine étiquette qui sera placée en cliquant sur l\'outil "Etiquette", et en entrant au clavier les caractères souhaités. L\'étiquette peut être constituée de plusieurs caractères, mais en pratique, il est préférable de se limiter à des étiquettes de un à trois caractères.</p><h2>Autres outils</h2><h3>L\'outil "Numérotation"</h3><p>L\'outil "Numérotation" (la pierre numérotée dans la barre d\'outils) permet d\'afficher ou cacher la numérotation des pierres placées à l\'aide de l\'outil "Placer un coup".</p><p>On peut ne modifier la numérotation qu\'à partir de la position courante si on le souhaite. Bien qu\'en théorie, on puisse le faire à n\'importe quel coup, il est conseillé de ne le faire qu\'en début de variation.</p><p>On peut aussi via cet outil afficher ou non les indices, et afficher ou non les pierres capturées "comme dans les livres".</p><h3>L\'outil "Entête"</h3><p>L\'outil "Entête" ("E" dans la barre d\'outils), permet d\'afficher un formulaire de saisie des propriétés d\'entête des fichiers sgf (évènement, ronde, nom de noir, niveau de noir, nom de blanc, niveau de blanc, ...).</p><h3>L\'outil "Comme dans les livres"</h3><p>L\'outil "Comme dans les livres" ("L" dans la barre d\'outils) permet de changer le mode d\'affichage des pierres capturées. Soit on affiche le goban tel qu\'il serait en partie réelle, soit on affiche le goban en laissant les pierres capturées par des coups numérotés comme dans les livres. Pour passer de l\'un à l\'autre mode, il suffit de cliquer sur l\'outil.</p><p>Note : quand aucune pierre numérotée n\'est visible, cet outil est sans effet.</p><h3>L\'outil "Indices"</h3><p>L\'outil "Indices" ("I" dans la barre d\'outils) permet d\'afficher ou cacher des indices autour du goban. En cas de découpe du goban, les indices ne sont affichés que sur les bords visibles. En cas de sélection d\'une partie du goban contenant des bords avec des indices, ceux-ci sont ajoutés automatiquement à la sélection.</p><h3>L\'outil "Marque sur les variations"</h3><p>L\'outil "Marque sur les variations" ("V" dans la barre d\'outils) permet d\'afficher ou cacher les marques sur les variations. Ces marques sont là uniquement pour vous aider à visualiser la liste des variations possibles à partir d\'une position donnée. Il ne faut pas y faire référence dans le commentaire car elles peuvent ne pas être affichables ou avoir des libellés différents d\'un logiciel à l\'autre. Lorsque vous avez besoin de faire référence à une intersection dans le commentaire, placez plutôt sur le goban des marques et étiquettes à l\'aide de l\'un des outils "Etiquette", "Marque", "Triangle", "Cercle" ou "Carré", ou éventuellement utilisez les indices sur le pourtour du goban. Lorsqu\'une intersection a à la fois une marque de variation et une marque ou étiquette placée à l\'aide de l\'un des outils "Etiquette", "Marque", "Triangle", "Cercle" ou "Carré", c\'est cette dernière qui est affichée.</p><h3>L\'outil "Style"</h3><p>L\'outil "Style" ("S" dans la barre d\'outils) permet de changer le style d\'affichage des variations. Soit on affiche les alternatives au coup courant, soit on affiche les alternatives pour le coup suivant. Pour voir les marques sur les variations, n\'oubliez pas d\'activer aussi le mode "Marque sur les variations".</p><h3>Les outils d\'annotation</h3><p>Ils permettent d\'ajouter des annotations diverses au coup courant (propriétés sgf GB, GW, DM, UC, TE, BM, DO et IT).</p><h3>L\'outil "Trait"</h3><p>L\'outil "Trait" ("T" dans la barre d\'outils) permet d\'indiquer qui a le trait au coup suivant (propriété sgf PL). On l'utilisera en particulier quand le sgf représente la position initiale d'un problème, et qu\'aucun coup suivant n\'est spécifié.</p><h3>Les outils de tranformation</h3><p>Ils permettent d\'effectuer une rotation, une symétrie verticale ou une symétrie horizontale du goban.</p><h2>L\'arbre des coups</h2><p>Il permet de visualiser l\'ensemble des coups (en cliquant sur une pierre de l\'arbre, la position lorsque cette pierre a été jouée est affichée sur le goban).</p><p>Les touches flèches gauche, flèche droite, flèche vers le haut, flèche vers le bas sont utilisées pour faire défiler le contenu de cet arbre lorsqu’il déborde de son conteneur.</p><p>Mais on peut aussi se déplacer dans l\'arbre des coups en utilisant ces flèches du clavier tout en appuyant sur la touche "Majuscule" (voir le chapitre "La barre de navigation" pour plus de détails).</p>`);
mxG.en("Help_Data",`<h1 tabindex="0">Help</h1><h2>Overview</h2><p>With this tool you can edit go games or diagrams in sgf format.</p><h2>Menus</h2><h3>"File" menu</h3><p>Use it to create, open, save or send by email a sgf file.</p><p>"New": display a goban of any size (not necessarily a square). You can either create a move tree in a new record, or add a move tree to the current record (in which case the current record will contain several move trees).</p><p>"Open": open a sgf file stored on your device (not always possible with some devices).</p><p>"Close": close the current sgf file.</p><p>"Save": save what you edit in a sgf file on your device (not always possible with some devices).</p><p>"Send": send by email what you edit (useful if you cannot save what you edit on your device).</p><h3>"Edit" menu</h3><p>"Cut", "Copy" or "Paste" a branch of a game tree (see also "Cut a branch", "Copy a branch" and "Paste a branch" below).</p><p>"Remove comments" remove all the comments from the sgf record.</p><h3>"View" menu</h3><p>Change view (2d/3d effect, stretching, stone shadow, colors, zoom or reset all the settings done using the view menu).</p><p>For the goban lines, on can set any css color.</p><h3>"Window" menu</h3><p>Change the current sgf file.</p><h2>Navigation bar</h2><p>Click on the buttons of the Navigation bar to navigate in the game tree.</p><p>Click on the "Pass" button to pass.</p><p>It is also possible to navigate using the keyboard. The focus has to be on the goban or the game tree in order to activate this feature: click on the goban or the game tree or use the Tab key to give them the focus. Then press the Shift key and one of the following key.</p><ul><li>Left Arrow key: back one move</li><li>Right Arrow key: place one move</li><li>Page Down key: back ten moves of the current variation or go to the previous move that has a variation</li><li>Page Up key: place ten moves of the current variation or go to the next move that has a variation</li><li>Home key: back to first move</li><li>End key: place all moves</li><li>Up Arrow key: change next move variation (if children variation style) or current move variation (if siblings variation style)</li><li>Down Arrow key: change next move variation (if children variation style) or current move variation (if siblings variation style)</li></ul><p>To change the move tree when several move trees are present in a recording, go to the first move of the current tree, then use the Up or Down Arrow keys while pressing the Shift key + Option or Alt key.</p><p>If one gives focus to the goban by having clicked on it, one can use the previous keys to move in the move tree.</p><p>But you can also give focus to the goban via the Tab key. In this case, a square is displayed on one of the intersections of the goban. We can then use the Left Arrow, Right Arrow, Up Arrow, Down Arrow keys (without pressing the Shift key) not to move in the move tree, but to move the square, and finally press the Return key to place a stone or perform any other action depending on the tool that is selected in the toolbar.</p><p>Note that using above keys, Tab key, Shift + Tab key, and Return key, it is possible to execute all maxiGos commands including placement of a stone on the go board.</p><h2>Other buttons</h2><p>"PNG" anf "SVG" buttons: to display a png or svg image of the current position. This image can for example be used as an illustration in your web pages. To save it on your machine, you can right-click on this image and select in the menu that appears "Save image as...".</p><p>"Sgf" button: to display and edit the sgf.</p><p>"Score" button: to add or remove sgf territory properties (sgf properties TB and TW).</p><h2>Partial view of the goban</h2><p>To display a part of the goban only, click on the "Selection" tool (a dashed square in the tool bar), select it with the mouse (ot its equivalent) by clicking on its top left and bottom right corners. (it is not necessary to keep the mouse button down between the two clicks). Then click on the "Partial/full view" tool (a small square inside a bigger one in the tool bar) to finish the job.</p><p>To unselect the selection, click on the "Selection" tool again.</p><p>To display the full goban again, click on the "Partial/full view" tool when no part of the goban is selected.</p><p>Important: the partial view is applied from the current move. This means that if you want a partial view of the goban for the whole of a move tree, you must apply the partial view via the "Partial/total view" tool while being placed on the first move of the move tree.</p><h2>Place a move or add/remove a stone</h2><p>There are two tools that allow to add/remove stones on the goban: "Place a move" and "Add/remove a stone" tools.</p></p><h3>"Place a move" tool</h3><p>The "Place a move" tool (a black stone or white stone in the tool bar) allows to place a serie of moves possibly numbered.</p><p>If some stones are without liberty, they are removed automatically from the goban.</p><p>The editor tries to guess what will be the color of the next move, and changes the color of the stone displayed in the tool accordingly.</p><p>To change the color of the next move, just click again on the "Place a move" tool (thus it is possible to place two moves of the same color in succession).</p><h3>"Add/remove a stone" tool</h3><p>The "Add/remove a stone" tool (a half white/half black stone) allows to add or remove a stone from the goban to setup a position (for instance to place handicap stones or setup the initial position of a problem).</p><p>The color of the next stone will be the color of the left half of the tool. If one clicks on an occupied intersection, the stone is removed.</p><p>To change the color of the next stone, just click again on the "Add/remove a stone" tool.</p><p>Warning: the numerotation restarts to 0 when such a stone is added.</p><h2>Cut/copy/paste a branch</h2><p>One can cut/copy/paste a branch of the tree when one of the "Cut a branch", "Copy a branch" or "Paste a branch" tool is selected.</p><p>MaxiGos does no consistency checking of what will be pasted.</p><p>These tools can be useful when you realize a posteriori that you forgot to place some moves. It is then necessary to go to the move following the missing moves, cut the branch, place the missing moves, and paste the previously cut branch.</p><p>These tools can also be useful when you realize a posteriori that you have placed some unwanted moves. It is then necessary to go to the move following the unwanted moves, copy the branch, return to the move preceding the unwanted moves, paste the previously copied branch, return to the first unwanted move and cut the branch which does not then contain more than the unwanted moves.</p><h2>Marks and labels</h2><p>Click on one of the "Label" (a letter in the tool bar), "Mark" (a cross in the tool bar), "Triangle" (a triangle in the tool bar), "Circle" (a circle in the tool bar) or "Square" (a square in the tool bar) tools, then click on an intersecion to add/remove the corresponding mark or label. The next label that will be add is incrementing automatically (from "A" to "Z", ...), but can be force to any text by clicking on the "Label" tool and replacing the letter in it.</p><h2>Other tools</h2><h3>"Numbering" tool</h3><p>The "Numbering" tool (a numbered stone in the tool bar) shows/hides numbering.</p><h3>"Header" tool</h3><p>The "Header" tool ("H" in the tool bar) allows to edit game information properties (event, round, name of black player, name of white player, ...).</p><h3>"As in book" tool</h3><p>The "As in book" tool ("K" in the tool bar) adds/removes captured stones on the goban as in book/as in real life.</p><h3>"Indices" tool</h3><p>The "Indices" tool ("I" in the tool bar) shows/hides indices arround the goban.</p><h3>"Mark on variation" tool</h3><p>The "Mark on variation" tool ("V" in the tool bar) shows/hides mark on variation.</p><h3>"Style" tool</h3><p>The "Style" tool ("S" in the tool bar) changes variation style. One can display variations of the current move (siblings mode) or variations of the next move (children mode). To see corresponding variation marks, don\'t forget to enable "Mark on variation" mode too.</p><h3>Annotation tools</h3><p>They add various annotations to the current move (sgf properties GB, GW, DM, UC, TE, BM, DO and IT).</p><h3>"Turn" tool</h3><p>The "Turn" tool ("T" in the tool bar) allows to indicate the turn for the next move (PL sgf property).</p><h3>Transform tools</h3><p>They make a rotation, a vertical symmetry or an horizontal symmetry of the goban.</p><h2>Tree</h2><p>It allows to see all the nodes of the game tree (by clicking on a stone of the tree, one returns to the position when the corresponding move was played).</p><p>The Left Arrow, Right Arrow, Up Arrow, Down Arrow keys are used to scroll through the contents of this tree when it overflows its container.</p><p>But you can also move through the move tree using these arrows on the keyboard while pressing the Shift key (see the chapter "The navigation bar" for more details).</p>`);
mxG.G.prototype.doHelp=function()
{
	this.doDialog("ShowHelp",this.local("Help_Data"),[{n:" Close "}]);
}
mxG.G.prototype.initHelp=function()
{
	if(this.helpBtnOn)this.addBtnClickListener("Help");
}
mxG.G.prototype.createHelp=function()
{
	this.helpBtnOn=this.setA("helpBtnOn",0,"bool");
	this.helpAlias=this.setA("helpAlias",null,"string");
	return this.helpBtnOn?this.createBtn("Help"):"";
}
}
if(!mxG.G.prototype.createImage)
{
mxG.fr(" Close ","Fermer");
mxG.fr("PNG","PNG");
mxG.fr("SVG","SVG");
mxG.fr("PNG image of the goban","Image PNG du goban");
mxG.fr("SVG image of the goban","Image SVG du goban");
mxG.G.prototype.b64EncodeUnicode=function(str)
{
	return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
		function toSolidBytes(match,p1){return String.fromCharCode('0x'+p1);}));
}
mxG.G.prototype.svgToDataURL=function(b)
{
	let e1,e2,a,r=2,z,e,s,v,rect1,rect2,mark1,mark2,list;
	e1=this.getE("GobanSvg");
	e2=e1.cloneNode(true);
	rect1=e1.querySelector(".mxWholeRect");
	if(rect1)
	{
		s=window.getComputedStyle(rect1,null);
		v=s.getPropertyValue("fill");
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
	if(b)
	{
		e2.setAttribute("width",b.width*r+"");
		e2.setAttribute("height",b.height*r+"");
	}
	else
	{
		e2.removeAttribute("width");
		e2.removeAttribute("height");
	}
	e2.removeAttribute("id");
	e2.removeAttribute("aria-labelledby");
	e2.removeAttribute("aria-label");
	e2.removeAttribute("aria-live");
	e2.removeAttribute("role");
	e2.removeAttribute("tabindex");
	a=e2.querySelectorAll("g[id]");
	if(a)for(e of a)e.removeAttribute("id");
	a=e2.querySelectorAll(".mxFocus,title,desc");
	if(a)for(e of a)e.remove();
	a=e2.querySelectorAll("[aria-hidden]");
	if(a)for(e of a)e.removeAttribute("aria-hidden");
	z=e2.outerHTML;
	z=z.replace(/ class="[^"]*"/g,"");
	z=z.replace(/ href=/g," xlink:href=");
	z=z.replace(/><\/(rect|circle|path|image|stop)>/g,"/>");
	z=z.replace(/<rect fill="none" stroke="none"[^>]*>/g,"");
	return "data:image/svg+xml;base64,"+this.b64EncodeUnicode(z);
}
mxG.G.prototype.doSvg=function()
{
	let b=this.getE("GobanSvg").getBoundingClientRect(),
		s=`<h1 tabindex="0">${this.local("SVG image of the goban")}</h1>`
		+`<img alt="${this.local("SVG image of the goban")}" id="${this.n}SvgImg"`
		+` width="${b.width}" height="${b.height}"`
		+` src="${this.svgToDataURL(null)}">`;
	this.doDialog("ShowSvg",s,[{n:" Close "}]);
}
mxG.G.prototype.doPng=function()
{
	let img,png,r=2,k=this.k,s,src;
	src=`data:image/svg+xml,<svg xmlns='${this.scr.xmlnsUrl}'/>`;
	s=`<h1 tabindex="0">${this.local("PNG image of the goban")}</h1>`
	+`<img alt="${this.local("PNG image of the goban")}" id="${this.n}PngImg" src="${src}">`;
	this.doDialog("ShowPng",s,[{n:" Close "}]);
	png=this.getE("PngImg");
	img=new Image();
	img.onload=function()
	{
		let canvas=document.createElement('canvas'),w=img.width,h=img.height;
		png.width=w/r;
		png.height=h/r;
		canvas.width=w;
		canvas.height=h;
		setTimeout(function(){
				canvas.getContext('2d').drawImage(img,0,0);
				png.src=canvas.toDataURL("image/png");
			},1);
	}
	img.src=this.svgToDataURL(this.getE("GobanSvg").getBoundingClientRect());
}
mxG.G.prototype.initPng=function()
{
	if(this.pngBtnOn)this.addBtnClickListener("Png");
}
mxG.G.prototype.initSvg=function()
{
	if(this.svgBtnOn)this.addBtnClickListener("Svg");
}
mxG.G.prototype.createPng=function()
{
	this.pngBtnOn=this.setA("pngBtnOn",0,"bool");
	this.pngAlias=this.setA("pngAlias",null,"string");
	return this.pngBtnOn?this.createBtn("Png","PNG"):"";
}
mxG.G.prototype.createSvg=function()
{
	this.svgBtnOn=this.setA("svgBtnOn",0,"bool");
	this.svgAlias=this.setA("svgAlias",null,"string");
	return this.svgBtnOn?this.createBtn("Svg","SVG"):"";
}
mxG.G.prototype.createImage=function()
{
	return ``;
}
}
if(!mxG.G.prototype.createPass)
{
mxG.fr("Pass","Passe");
mxG.G.prototype.doPass=function()
{
	if(this.hasC("Edit"))this.checkEditPlay(0,0);
	else if(this.hasC("Solve")&&this.canPlaceSolve)this.checkSolve(0,0);
	else if(this.hasC("Variation")&&this.canPlaceVariation)this.checkVariation(0,0);
	else if(this.hasC("Guess"))this.checkGuess(0,0);
}
mxG.G.prototype.isPass=function(aN)
{
	let s,x,y;
	if(aN.P["B"]||aN.P["W"])
	{
		s=aN.P["B"]?aN.P["B"][0]:aN.P["W"][0];
		if(s.match(/^[a-zA-Z]{2}$/))
		{
			x=s.c2n(0);
			y=s.c2n(1);
			if((x<1)||(y<1)||(x>this.dimX)||(y>this.dimY))x=y=0;
		}
		else x=y=0;
		return !(x||y);
	}
	return 0;
}
mxG.G.prototype.updatePass=function()
{
	let aN=0,k,km,status,look=0,s,e=this.getE("PassBtn");
	if(!e)return;
	status=this.isPass(this.cN)?1:0;
	if(!(this.styleMode&2))
	{
		if(this.styleMode&1)aN=this.cN.Dad;
		else aN=this.cN;
	}
	if(!this.hasC("Solve")||!this.canPlaceSolve)
	{
		if(aN)
		{
			km=aN.Kid.length;
			if(km)
			{
				if(this.styleMode&1){if(km>1)look=1;}
				else look=1;
			}
		}
		if(look)for(k=0;k<km;k++)if(this.isPass(aN.Kid[k]))status|=2;
	}
	aN=this.kidOnFocus(this.cN);
	if(aN&&this.isPass(aN))status|=4;
	s="mxBtn mxPassBtn";
	if(status&1)s+=" mxJustPlayedPassBtn";
	if(status&2)s+=" mxOnVariationPassBtn";
	if(status&4)s+=" mxOnFocusPassBtn";
	e.className=s;
	if(this.canPassOnlyIfPassInSgf)
	{
		if(status&2)this.enableBtn("Pass");
		else this.disableBtn("Pass");
	}
	else this.enableBtn("Pass");
}
mxG.G.prototype.initPass=function()
{
	if(this.passBtnOn)this.addBtnClickListener("Pass");
}
mxG.G.prototype.createPass=function()
{
	this.passBtnOn=this.setA("passBtnOn",0,"bool");
	this.passAlias=this.setA("passAlias",null,"string");
	this.canPassOnlyIfPassInSgf=this.setA("canPassOnlyIfPassInSgf",0,"bool");
	return this.passBtnOn?this.createBtn("Pass"):"";
}
}
if(!mxG.G.prototype.createScore)
{
mxG.fr(": "," : ");
mxG.fr("Score","Score");
mxG.fr("Score method","Méthode de score");
mxG.fr("trivial","triviale");
mxG.fr("counting","décompte");
mxG.fr("propagate","propagation");
mxG.fr("estimate","estimation");
mxG.fr("ephemeral score","score éphémère");
mxG.fr("Chinese style","chinois");
mxG.fr("Japanese style","japonais");
mxG.fr("Unusual komi","Komi inhabituel");
mxG.fr("Unknown rules","Règle inconnue");
mxG.G.prototype.buildScore=function()
{
	let s="",i,j,cb=0,cw=0,ib=0,iw=0,pb=0,pw=0,handicap,komi,rules,r,
		hasC=this.hasC("C"),expectedKomi;
	rules=this.getInfo("RU");
	if(!rules)rules=this.scoreDefaultRules;
	if(rules)rules=rules.toLowerCase();
	if((rules=="chinese")||(rules=="ing")||(rules=="goe")||(rules=="nz"))r="C";
	else if((rules=="aga")||(rules=="french")||(rules=="british"))r="C";
	else if((rules=="japanese")||(rules=="korean"))r="J";
	else r=null;
	komi=this.getInfo("KM");
	if(komi)
	{
		komi=parseFloat(komi);
		if(!komi)komi=0;
	}
	else if(r=="J")komi=6.5;
	else if(r=="C")komi=7.5;
	else komi=5.5;
	handicap=this.getInfo("HA");
	if(handicap){handicap=parseInt(handicap);if(!handicap)handicap=0;}
	else if(komi==0.5)handicap=1;
	else handicap=0;
	for(i=1;i<=this.DX;i++)
		for(j=1;j<=this.DY;j++)
		{
			switch(this.scoreBan.computed[i][j])
			{
				case "B":cb++;
					if(this.scoreBan.initial[i][j]=="W")pb++;break;
				case "W":cw++;
					if(this.scoreBan.initial[i][j]=="B")pw++;break;
				default:
					switch(this.scoreBan.initial[i][j])
					{
						case "B":ib++;break;
						case "W":iw++;break;
					}
			}
		}
	pb+=this.gor.getPrisoners("B");
	pw+=this.gor.getPrisoners("W");
	if(r=="C")
	{
		if(handicap)expectedKomi=0.5+handicap-1;
		else expectedKomi=7.5;
		if(hasC)s+=`<h1 tabindex="0">`;
		s+=this.local("Score")+" ("+this.local("Chinese style")+")";
		if(hasC)s+="</h1>";else s+="\n";
		if(hasC)s+="<p>";
		s+=this.local("Black")+this.local(": ")+cb+" + "+ib+" = "+(cb+ib);
		if(hasC)s+="</p>";else s+="\n";
		if(hasC)s+="<p>";
		s+=this.local("White")+this.local(": ")+cw+" + "+iw+" + "+komi+" = "+(cw+iw+komi);
		if(hasC)s+="</p>";else s+="\n";
		if(expectedKomi!=komi)
		{
			if(hasC)s+="<p>";
			s+=this.local("Unusual komi");
			if(hasC)s+="</p>";else s+="\n";
		}
	}
	else if(r=="J")
	{
		if(handicap)expectedKomi=0.5;
		else expectedKomi=6.5;
		if(hasC)s+=`<h1 tabindex="0">`;
		s+=this.local("Score")+" ("+this.local("Japanese style")+")";
		if(hasC)s+="</h1>";else s+="\n";
		if(hasC)s+="<p>";
		s+=this.local("Black")+this.local(": ")+cb+" + "+pb+" = "+(cb+pb);
		if(hasC)s+="</p>";else s+="\n";
		if(hasC)s+="<p>";
		s+=this.local("White")+this.local(": ")+cw+" + "+pw+" + "+komi+" = "+(cw+pw+komi);
		if(hasC)s+="</p>";else s+="\n";
		if(expectedKomi!=komi)
		{
			if(hasC)s+="<p>";
			s+=this.local("Unusual komi");
			if(hasC)s+="</p>";else s+="\n";
		}
	}
	else
	{
		if(hasC)s+=`<h1 tabindex="0">`;
		s+=this.local("Score");
		if(hasC)s+="</h1><p>";else s+="\n";
		s+=this.local("Unknown rules");
		if(hasC)s+="</p>";else s+="\n";
	}
	if(hasC)s=`<div class="mxScoreContentDiv">${s}</div>`;
	return s;
}
mxG.G.prototype.getTX=function()
{
	let TX=["TB","TW"];
	let aN,k,aLen,s,x,y,x1,y1,x2,y2,z;
	aN=this.cN4Score;
	for(z=0;z<7;z++)
	{
		if(aN.P[TX[z]])aLen=aN.P[TX[z]].length;else aLen=0;
		for(k=0;k<aLen;k++)
		{
			s=aN.P[TX[z]][k];
			if(s.match(/^[a-zA-Z]{2}$/))
			{
				x=s.c2n(0);
				y=s.c2n(1);
				this.scoreBan.marked[x][y]=(TX[z]=="TB")?"B":"W";
				if(!this.ephemeralScore)
					this.scoreBan.modified[x][y]=this.scoreBan.marked[x][y];
			}
			else if(s.match(/^[a-zA-Z]{2}:[a-zA-Z]{2}$/))
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
}
mxG.G.prototype.removeTX=function(a,b)
{
	let k,km,kp,TX=["TB","TW"],aN,v;
	aN=this.cN4Score;
	v=this.xy2s(a,b);
	for(kp=0;kp<TX.length;kp++)
	{
		if(aN.P[TX[kp]])
		{
			km=aN.P[TX[kp]].length;
			for(k=0;k<km;k++)if(aN.P[TX[kp]][k]==v)break;
			if(k<km)aN.takeOff(TX[kp],k);
		}
	}
}
mxG.G.prototype.addTX=function(tx,a,b)
{
	let aN,v;
	aN=this.cN4Score;
	v=this.xy2s(a,b);
	this.removeTX(a,b);
	if(aN.P[tx])aN.P[tx].push(v);
	else aN.P[tx]=[v];
}
mxG.G.prototype.setTX=function(from)
{
	let i,j;
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
}
mxG.G.prototype.z_estimate=function(x,y)
{
	let nat,z=0;
	if(this.gor.inGoban(x,y))
	{
		nat=this.scoreBan.computed[x][y]?
				this.scoreBan.computed[x][y]:
					this.scoreBan.initial[x][y];
		if((nat=="B")||(nat=="W"))z=(nat=="B"?1:2);
		else z=4;
	}
	return z;
}
mxG.G.prototype.checkNeighbour=function(x,y)
{
	let z=0;
	return this.z_estimate(x-1,y)
		|this.z_estimate(x+1,y)
		|this.z_estimate(x,y-1)
		|this.z_estimate(x,y+1);
}
mxG.G.prototype.currentOwner_estimate=function(x,y)
{
	let nat;
	nat=this.scoreBan.modified[x][y];
	if((nat=="B")||(nat=="W"))return nat;
	nat=this.scoreBan.initial[x][y];
	if((nat=="B")||(nat=="W"))return nat;
	return "E";
}
mxG.G.prototype.currentOwner=function(x,y)
{
	let nat;
	if(this.scoreMethod=="estimate")return this.currentOwner_estimate(x,y);
	nat=this.scoreBan.computed[x][y];
	if((nat=="B")||(nat=="W"))return nat;
	nat=this.scoreBan.initial[x][y];
	if((nat=="B")||(nat=="W"))return nat;
	return "E";
}
mxG.G.prototype.w4po=function(s,x,y,a)
{
	if(this.gor.inGoban(x,y))
	{
		let z;
		z=this.currentOwner(x,y);
		if(z=="B")s.b+=a;else if(z=="W")s.w+=a;
	}
	return s;
}
mxG.G.prototype.possibleOwner=function(x,y)
{
	let s={b:0,w:0},z,i,j,k,n;
	k=9;
	for(i=x-k;i<=x+k;i++)
		for(j=y-k;j<=y+k;j++)
			if((i!=x)||(j!=y))
				if(this.gor.inGoban(i,j)&&(((x-i)*(x-i)+(y-j)*(y-j))<=(k*k)))
				{
					n=Math.pow(3,k-Math.abs(x-i)+k-Math.abs(y-j));
					s=this.w4po(s,i,j,n);
				}
	if(s.b>s.w)return "B";
	if(s.w>s.b)return "W";
	return null;
}
mxG.G.prototype.getNatWhenScore_trivial=function(x,y)
{
	return this.scoreBan.initial[x][y];
}
mxG.G.prototype.getNatWhenScore_counting=function(x,y)
{
	if(this.scoreBan.initial[x][y]=="E")return "E";
	if(this.scoreBan.taken[x][y])return "E";
	return this.scoreBan.initial[x][y];
}
mxG.G.prototype.getNatWhenScore_propagate=function(x,y)
{
	let natm;
	if(this.scoreBan.initial[x][y]=="E")
	{
		if(this.scoreBan.modified[x][y])natm=this.scoreBan.modified[x][y];
		else natm="E";
	}
	else
	{
		if(this.scoreBan.taken[x][y])natm="E";
		else natm=this.scoreBan.initial[x][y];
	}
	return natm;
}
mxG.G.prototype.getNatWhenScore_estimate=function(x,y)
{
	return this.getNatWhenScore_propagate(x,y);
}
mxG.G.prototype.getNatWhenScore=function(x,y)
{
	return this["getNatWhenScore_"+this.scoreMethod](x,y);
}
mxG.G.prototype.guessNextWhenScore=function(x,y)
{
	let a,b,c,po;
	c=this.scoreBan.computed[x][y];
	if((this.lastScoreAct.x==x)&&(this.lastScoreAct.y==y))
	{
		b=this.lastScoreAct.a;
		if((b=="B")&&(c=="W"))a="E";
		else if((b=="B")&&(c==null))a="W";
		else if((b=="W")&&(c=="B"))a="E";
		else if((b=="W")&&(c==null))a="B";
		else if((b=="E")&&(c=="B"))a="W";
		else if((b=="E")&&(c=="W"))a="B";
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
	if(this.gor.inGoban(x,y))
	{
		let xy=this.xy(x,y);
		let natm=this.getNatWhenScore(x,y);
		let onat=(nat=="B"?"W":"B");
		if(this.visitedWhenHasPrisoner[xy])return 0;
		this.visitedWhenHasPrisoner[xy]=1;
		if(this.scoreBan.taken[x][y]==onat)return 1;
		if(natm!=onat)
			return this.hasPrisonerWhenScore(nat,x-1,y)
				|this.hasPrisonerWhenScore(nat,x+1,y)
				|this.hasPrisonerWhenScore(nat,x,y-1)
				|this.hasPrisonerWhenScore(nat,x,y+1);
	}
	return 0;
}
mxG.G.prototype.checkSurrounding=function(x,y)
{
	if(this.gor.inGoban(x,y))
	{
		let xy=this.xy(x,y);
		let natm=this.getNatWhenScore(x,y);
		if(this.visitedWhenCheckSurrounding[xy])return 0;
		this.visitedWhenCheckSurrounding[xy]=1;
		if(natm=="E")
			return this.checkSurrounding(x-1,y)
				|this.checkSurrounding(x+1,y)
				|this.checkSurrounding(x,y-1)
				|this.checkSurrounding(x,y+1);
		if(natm=="B")return 1;
		if(natm=="W")return 2;
	}
	return 0;
}
mxG.G.prototype.canSwapWhenScore=function(nat,x,y)
{
	if(this.scoreBan.computed[x][y])return 1;
	this.visitedWhenHasPrisoner=[];
	return !this.hasPrisonerWhenScore(nat,x,y);
}
mxG.G.prototype.swapWhenScore=function(nat,x,y,d)
{
	let onat=(nat=="B")?"W":"B";
	if(this.gor.inGoban(x,y))
	{
		let xy=this.xy(x,y);
		let natm=this.getNatWhenScore(x,y);
		if(this.visitedWhenSwap[xy])return 0;
		this.visitedWhenSwap[xy]=1;
		if((natm==nat)||(natm=="E"))
		{
			if(d)
			{
				this.scoreBan.computed[x][y]=onat;
				if(this.scoreBan.initial[x][y]==nat)this.scoreBan.taken[x][y]=nat;
			}
			else
			{
				this.scoreBan.computed[x][y]=null;
				if(this.scoreBan.initial[x][y]==nat)this.scoreBan.taken[x][y]=null;
			}
			this.swapWhenScore(nat,x-1,y,d);
			this.swapWhenScore(nat,x+1,y,d);
			this.swapWhenScore(nat,x,y-1,d);
			this.swapWhenScore(nat,x,y+1,d);
		}
	}
}
mxG.G.prototype.computeScoreMarks_trivial=function(v)
{
	let i,j;
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
}
mxG.G.prototype.computeScoreMarks_counting=function(v)
{
	let i,j;
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
					if(z==1)this.scoreBan.computed[i][j]="B";
					else if(z==2)this.scoreBan.computed[i][j]="W";
					else this.scoreBan.computed[i][j]=null;
				}
			}
		}
}
mxG.G.prototype.computeScoreMarks_propagate=function(v)
{
	this.computeScoreMarks_counting(v);
}
mxG.G.prototype.computeScoreMarks_estimate=function(v)
{
	let i,j;
	for(i=1;i<=this.DX;i++)
		for(j=1;j<=this.DY;j++)
		{
			if(!v||v[this.xy(i,j)])
			{
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
	for(i=1;i<=this.DX;i++)
		for(j=1;j<=this.DY;j++)
		{
			if(!v||v[this.xy(i,j)])
			{
				if(this.scoreBan.initial[i][j]=="E")
				{
					let z=this.checkNeighbour(i,j);
					if(z==1)this.scoreBan.computed[i][j]="B";
					else if(z==2)this.scoreBan.computed[i][j]="W";
				}
			}
		}
	for(i=1;i<=this.DX;i++)
		for(j=1;j<=this.DY;j++)
		{
			if(!v||v[this.xy(i,j)])
			{
				this.scoreBan.buffer[i][j]=this.scoreBan.computed[i][j];
				if(this.scoreBan.initial[i][j]=="E")
				{
					let z=this.checkNeighbour(i,j);
					if((z!=1)&&(z!=2))this.scoreBan.buffer[i][j]=null;
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
}
mxG.G.prototype.computeScoreMarks=function(v)
{
	if(this.scoreMethod=="estimate")this.computeScoreMarks_estimate(v);
	else if(this.scoreMethod=="propagate")this.computeScoreMarks_propagate(v);
	else if(this.scoreMethod=="counting")this.computeScoreMarks_counting(v);
	else this.computeScoreMarks_trivial(v);
}
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
}
mxG.G.prototype.checkScore_counting=function(x,y)
{
	let nat=this.scoreBan.initial[x][y],d=this.scoreBan.computed[x][y]?0:1,z;
	if(((nat=="B")||(nat=="W"))&&this.canSwapWhenScore(nat,x,y))
	{
		this.visitedWhenSwap=[];
		this.swapWhenScore(nat,x,y,d);
		this.computeScoreMarks(this.visitedWhenSwap);
	}
	else if(nat=="E")
	{
		this.visitedWhenCheckSurrounding=[];
		z=this.checkSurrounding(x,y);
		this.visitedWhenSwap=[];
		if(z==1)this.swapWhenScore("W",x,y,d);
		else if(z==2)this.swapWhenScore("B",x,y,d);
	}
}
mxG.G.prototype.clearMarkWhenScore=function(c,o,x,y)
{
	if(this.gor.inGoban(x,y)&&!this.scoreBan.modified[x][y]
		&&this.scoreBan.computed[x][y]&&(this.scoreBan.computed[x][y]==c))
	{
		this.visitedWhenSwap=[];
		this.swapWhenScore(o,x,y,0);
	}
}
mxG.G.prototype.checkScore_propagate=function(x,y)
{
	let nat=this.scoreBan.initial[x][y],a,b,c=this.scoreBan.computed[x][y],d=c?0:1,z;
	if(((nat=="B")||(nat=="W"))&&this.canSwapWhenScore(nat,x,y))
	{
		this.visitedWhenSwap=[];
		this.swapWhenScore(nat,x,y,d);
		this.computeScoreMarks(this.visitedWhenSwap);
	}
	else if(nat=="E")
	{
		if(!this.scoreBan.modified[x][y]||(this.scoreBan.modified[x][y]=="E"))
		{
			this.visitedWhenCheckSurrounding=[];
			z=this.checkSurrounding(x,y);
			if(z==1){this.visitedWhenSwap=[];this.swapWhenScore("W",x,y,d);return;}
			if(z==2){this.visitedWhenSwap=[];this.swapWhenScore("B",x,y,d);return;}
		}
		else
		{
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
}
mxG.G.prototype.checkScore_estimate=function(x,y)
{
	let nat=this.scoreBan.initial[x][y];
	if((nat=="B")||(nat=="W"))
	{
		let onat=(nat=="B"?"W":"B");
		if(this.scoreBan.modified[x][y]==onat)this.scoreBan.modified[x][y]="E";
		else this.scoreBan.modified[x][y]=onat;
		this.computeScoreMarks(null);
	}
}
mxG.G.prototype.initScoreBan=function()
{
	let i,j,nat;
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
}
mxG.G.prototype.checkScore=function(x,y)
{
	if(this.scoreMethod=="estimate")this.checkScore_estimate(x,y);
	else if(this.scoreMethod=="propagate")this.checkScore_propagate(x,y);
	else if(this.scoreMethod=="counting")this.checkScore_counting(x,y);
	else this.checkScore_trivial(x,y);
	this.setTX("computed");
	this.updateAll();
}
mxG.G.prototype.enableAllWhenQuitScore=function()
{
	if(this.hasC("Tree"))this.enableTree();
	if(this.disabledElementsWhenScore)
		for(let e of this.disabledElementsWhenScore)
			e.disabled=false;
	this.disabledElementsWhenScore=[];
}
mxG.G.prototype.disableAllWhenEnterScore=function()
{
	let scoreBtn=this.getE("ScoreBtn"),list=this.getE("Global").querySelectorAll("button,input");
	for(let e of list)
	{
		if(!e.disabled&&(e!=scoreBtn))
		{
			this.disabledElementsWhenScore.push(e);
			e.disabled=true;
		}
	}
	if(this.hasC("Tree"))this.disableTree();
}
mxG.G.prototype.toggleScore=function()
{
	if(this.canPlaceScore)
	{
		if(this.ephemeralScore)
		{
			this.setTX("marked");
			if(this.hasC("Edit"))
				this.getE("EditCommentTool").value=this.formerCommentWhenScore;
		}
		this.canPlaceScore=0;
		this.enableAllWhenQuitScore();
		this.canPlaceVariation=this.initialCanPlaceVariationForScore;
		this.canPlaceGuess=this.initialCanPlaceGuessForScore;
		this.canPlaceSolve=this.initialCanPlaceSolveForScore;
		this.canPlaceEdit=this.initialCanPlaceEditForScore;	
		this.marksAndLabelsOn=this.initialmarksAndLabelsOnForScore;
		this.cN4Score=null;
	}
	else
	{
		if(this.ephemeralScore&&this.hasC("Edit"))
			this.formerCommentWhenScore=this.getCommentWhenEdit();
		this.disableAllWhenEnterScore();
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
}
mxG.G.prototype.doScore=function()
{
	this.toggleScore();
	this.updateAll();
}
mxG.G.prototype.updateScore=function()
{
	if(this.getE("ScoreBtn"))
	{
		if(this.canPlaceScore)this.selectBtn("Score");
		else this.unselectBtn("Score");
	}
}
mxG.G.prototype.initScore=function()
{
	if(this.scoreBtnOn)this.addBtnClickListener("Score");
}
mxG.G.prototype.createScore=function()
{
	this.canPlaceScore=0;
	this.scoreBtnOn=this.setA("scoreBtnOn",0,"bool");
	this.ephemeralScore=this.setA("ephemeralScore",0,"bool");
	this.scoreAlias=this.setA("scoreAlias",null,"string");
	this.scoreDefaultRules=this.setA("scoreDefaultRules",null,"string");
	this.scoreInComment=this.setA("scoreInComment",0,"bool");
	this.scoreMethod=this.setA("scoreMethod","trivial","string");
	this.disabledElementsWhenScore=[];
	return this.scoreBtnOn?this.createBtn("Score"):"";
}
}
if(!mxG.G.prototype.createSgf)
{
mxG.xyProps=new Set(["B","W","AB","AW","AE","LB","MA","TR","SQ","CR",
	"VW","AR","DD","LN","SL"]);
mxG.fr(" Close ","Fermer");
mxG.fr("Cancel","Annuler");
mxG.fr("OK","OK");
mxG.fr("SGF","SGF");
mxG.fr("SGF_Long","Télécharger le SGF");
mxG.en("SGF_Long","Download SGF");
mxG.nl2br=function(s)
{
	return (s+'').replace(/\r\n|\n\r|\r|\n/g,'<br>');
}
mxG.sgfEsc=function(s)
{
	return (s+'').replace(/([^\\\]]?)(\\|])/g,'$1'+"\\"+'$2');
}
mxG.G.prototype.runTransform=function(x,s)
{
	let n1,n2,n3,n4,r,D,DX,DY;
	if(x=='SZ')
	{
		D=s.replace(/[^0-9:]/g,"").match(/^([0-9]+)(:([0-9]+))?$/);
		if(D){DX=mxG.min1max52(D[1]);DY=D[3]?mxG.min1max52(D[3]):DX;}
		else DX=DY=19;
		if(this.transform==3)r=DY+((DX==DY)?"":(":"+DX));
		else r=DX+((DX==DY)?"":(":"+DY));
		this.sz=r;
		return r;
	}
	if(mxG.xyProps.has(x))
	{
		D=this.sz.split(":");
		DX=parseInt(D[0]);
		DY=((D.length>1)?parseInt(D[1]):DX);
		if(s.match(/^[a-zA-Z]{2}/))
		{
			let is5=(x!='LB')&&s.match(/^[a-zA-Z]{2}:[a-zA-Z]{2}$/);
			n1=s.c2n(0);
			n2=s.c2n(1);
			if(this.transform==3){if((n1>DY)||(n2>DX))return s;}
			else if((n1>DX)||(n2>DY))return s;
			if(is5)
			{
				n3=s.c2n(3);
				n4=s.c2n(4);
				if(this.transform==3){if((n3>DY)||(n4>DX))return s;}
				else if((n3>DX)||(n4>DY))return s;
			}
			if(this.transform==1)
			{
				if(is5)
				{
					r=this.xy2s(n1,DY+1-n4);
					r+=":"+this.xy2s(n3,DY+1-n2);
				}
				else r=this.xy2s(n1,DY+1-n2);
			}
			else if(this.transform==2)
			{
				if(is5)
				{
					r=this.xy2s(DX+1-n3,n2);
					r+=":"+this.xy2s(DX+1-n1,n4);
				}
				else r=this.xy2s(DX+1-n1,n2);
			}
			else if(this.transform==3)
			{
				if(is5)
				{
					r=this.xy2s(n2,DY+1-n3);
					r+=":"+this.xy2s(n4,DY+1-n1);
				}
				else r=this.xy2s(n2,DY+1-n1);
			}
			if(x=='LB')r+=s.substring(2);
			return r;
		}
		return s;
	}
	return s;
}
mxG.G.prototype.buildAllSgf=function(aN,only,c)
{
	let rc="\n",k,x,y,ym,aText="",first,keep;
	if(c===undefined)c=0;
	if(this.transform&&aN.Dad&&(aN.Dad==this.rN))this.sz=(aN.P['SZ']?aN.P['SZ']+"":"19");
	if((aN.Dad&&(aN.Dad==this.rN))||(aN.Dad&&(aN.Dad.Kid.length>1)))
	{
		if(only&4){if((aN.Dad==this.rN)&&(aN==this.kidOnFocus(aN.Dad)))aText+="(";}
		else if(only&2){if((aN.Dad==this.rN)&&(aN==aN.Dad.Kid[0]))aText+="(";}
		else if((aN.Dad==this.rN)&&(aN==aN.Dad.Kid[0]))aText+="(";
		else{aText+=(rc+"(");c=0;}
	}
	if(aN!=this.rN)
	{
		if(aText[aText.length-1]!="(")
		{
			if(aN.Dad&&aN.Dad.Dad&&(aN.Dad.Dad==this.rN)){aText+=rc;c=0;}
			else if(c>3){aText+=rc;c=0;}else c++;
		}
		first=1;
		for(x in aN.P)
			if(x.match(/^[A-Z]+$/)&&((only&1)?mxG.coreProps.has(x):1))
			{
				if(first){aText+=";";first=0;}
				if(aN.Dad&&(aN.Dad==this.rN)){aText+=rc;c=0;}
				else if((x=="TB")||(x=="TW")){aText+=rc;c=4;}
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
	if(aN.Kid&&aN.Kid.length)
	{
		if(only&4){if(aN!=this.cN)aText+=this.buildAllSgf(this.kidOnFocus(aN),only,c);}
		else if(only&2)aText+=this.buildAllSgf(aN.Kid[0],only,c);
		else for(k=0;k<aN.Kid.length;k++)aText+=this.buildAllSgf(aN.Kid[k],only,c);
	}
	if(only&4){if((aN.Dad==this.rN)&&(aN==this.kidOnFocus(aN.Dad)))aText+=")";}
	else if(only&2){if((aN.Dad==this.rN)&&(aN==aN.Dad.Kid[0]))aText+=")";}
	else{if((aN.Dad&&(aN.Dad==this.rN))||(aN.Dad&&(aN.Dad.Kid.length>1)))aText+=")";}
	return aText;
}
mxG.G.prototype.sgfMandatory=function()
{
	for(let a of this.rN.Kid)
	{
		a.P.FF=["4"];
		a.P.CA=[this.toCharset];
		a.P.GM=["1"];
		a.P.AP=["maxiGos:"+mxG.V];
	}
}
mxG.G.prototype.buildSomeSgf=function(only)
{
	this.sgfMandatory();
	return this.buildAllSgf(this.rN,only,0);
}
mxG.G.prototype.buildSgf=function()
{
	this.sgfMandatory();
	return this.buildAllSgf(this.rN,(this.sgfSaveCoreOnly?1:0)+(this.sgfSaveMainOnly?2:0),0);
}
mxG.G.prototype.popupSgf=function()
{
	let s="<!DOCTYPE html><html><body><pre>\n"+this.buildSgf().noT()+"\n</pre></body></html>";
	if(this.sgfPopup&&!this.sgfPopup.closed)this.sgfPopup.close();
	this.sgfPopup=window.open();
	this.sgfPopup.document.open();
	this.sgfPopup.document.write(s);
	this.sgfPopup.document.close();
	this.sgfPopup.document.title="Sgf";
}
mxG.G.prototype.canDownloadSgf=function()
{
	if(this.toCharset!="UTF-8")return 0;
	return (typeof document.createElement('a').download==='string')?1:0;
}
mxG.G.prototype.doDownloadSgf=function(f)
{
	let u,a;
	if(this.canDownloadSgf())
	{
		u="data:application/octet-stream;charset=utf-8,";
		u+=encodeURIComponent(this.buildSgf());
		a=document.createElement('a');
		a.download=f;
		a.href=u;
		document.body.appendChild(a);
		a.click();
		a.remove();
	}
	else this.popupSgf();
}
mxG.G.prototype.doSgfOK=function()
{
	let s=this.getE("EditSgfDialog").querySelector('textarea').value,sgf,k;
	if(s!=this.sgfBeforeEdit)
	{
		k=this.rNs.indexOf(this.rN);
		sgf=this.rN.sgf?this.rN.sgf:"";
		if(this.getE("WindowMenu"))
		{
			this.rN.cN=this.cN;
		}
		this.rN=new mxG.P(s,this.sgfLoadCoreOnly,this.sgfLoadMainOnly);
		this.rN.sgf=sgf;
		if(this.getE("WindowMenu"))this.rNs[k]=this.rN;
		this.backNode(this.kidOnFocus(this.rN));
		if(this.hasC("Tree"))this.hasToSetTree=1;
		this.updateAll();
	}
}
mxG.G.prototype.doEditSgf=function()
{
	let btns=[{n:"OK",a:"Sgf"},{n:"Cancel"}],s;
	s="<textarea>"+this.buildSgf()+"</textarea>";
	this.doDialog("EditSgf",s,btns);
	this.sgfBeforeEdit=this.getE("EditSgfDialog").querySelector('textarea').value;
}
mxG.G.prototype.doShowSgf=function()
{
	this.doDialog("ShowSgf",this.buildSgf().noT(),[{n:" Close "}]);
}
mxG.G.prototype.doSgf=function()
{
	if(this.sgfAction=="download")
		this.doDownloadSgf(this.rN.sgf?this.rN.sgf:"maxiGos.sgf");
	else if(this.sgfAction=="edit")this.doEditSgf();
	else this.doShowSgf();
}
mxG.G.prototype.initSgf=function()
{
	if(this.sgfBtnOn)this.addBtnClickListener("Sgf");
}
mxG.G.prototype.createSgf=function()
{
	this.sgfAction=this.setA("sgfAction","show","string");
	this.sgfAlias=this.setA("sgfAlias",null,"string");
	this.sgfBtnOn=this.setA("sgfBtnOn",0,"bool");
	this.toCharset=this.setA("toCharset","UTF-8","string");
	return this.sgfBtnOn?this.createBtn("Sgf","SGF"):"";
}
}
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
mxG.fr("Modify (only for this part of the game tree)","Modifier (seulement pour cette partie de l'arbre des coups)");
mxG.fr("Remove (only for this part of the game tree)","Supprimer (seulement pour cette partie de l'arbre des coups)");
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
mxG.S.prototype.makeFromPath=function(p)
{
	return `<svg viewBox="0 0 1024 1024" width="40" height="40"`
	+` role="presentation" aria-hidden="true"><path class="mxFillable" d="${p}"/></svg>`;
}
mxG.S.prototype.makeAloneMark=function(m)
{
	let s,d=this.d,dd=d+2,x=dd/2,y=dd/2,c="#000",o={cls:"mxStrokable"};
	s=`<svg viewBox="0 0 ${dd} ${dd}" width="40" height="40"`
	+` role="presentation" aria-hidden="true">`;
	switch(m)
	{
		case "Circle":s+=this.makeCircle(c,x,y,o);break;
		case "Mark":s+=this.makeMark(c,x,y,o);break;
		case "Square":s+=this.makeSquare(c,x,y,o);break;
		case "Triangle":s+=this.makeTriangle(c,x,y,o);break;
	}
	return s+`</svg>`;
}
mxG.S.prototype.makeAloneToolText=function(txt)
{
	let d=this.d,dd=d+2,x=dd/2,y=dd/2,c="#000";
	return `<svg viewBox="0 0 ${dd} ${dd}" width="40" height="40"`
	+` font-family="${this.ff}" font-size="${this.fs}" font-weight="${this.fw}"`
	+` role="presentation" aria-hidden="true">`
	+`<text text-anchor="middle" fill="${c}" class="mxFillable"`
	+` x="${x}" y="${y+5}">${txt}</text></svg>`;
}
mxG.S.prototype.makeSelectTool=function()
{
	let d=this.d,dd=d+2,x=dd/2,y=dd/2,z=d*3/4,c="#000";
	return `<svg viewBox="0 0 ${dd} ${dd}" width="40" height="40"`
	+` role="presentation" aria-hidden="true">`
	+`<rect stroke-dasharray="2" class="mxStrokable"`
	+` fill="none" stroke="${c}" stroke-width="${this.sw4grid}"`
	+` x="${x-z/2}" y="${y-z/2}" width="${z}" height="${z}"/>`
	+`</svg>`;
}
mxG.S.prototype.makeViewTool=function()
{
	let s,d=this.d,dd=d+2,x=dd/2,y=dd/2,z,c="#000";
	z=d*3/4;
	return `<svg viewBox="0 0 ${dd} ${dd}" width="40" height="40"`
	+` role="presentation" aria-hidden="true">`
	+`<g fill="none" class="mxStrokable" stroke="${c}" stroke-width="${this.sw4grid}">`
	+`<rect x="${x-z/2}" y="${y-z/2}" width="${z}" height="${z}"/>`
	+`<rect x="${x}" y="${y-z/2}" width="${z/2}" height="${z/2}"/>`
	+`</g></svg>`;
}
mxG.S.prototype.makeSemiCircle=function(n,x,y,r,c,o)
{
	let s=`<circle clip-path="url(#${this.p.n}Setup${n}Clip)"`;
	if(o.in3dOn)s+=` fill="url(#${this.p.n+c}RG)"`;
	else s+=` class="${(c=="W")?"":"mxFillable "}mxStrokable"`
		+` fill="${(c=="W")?"#fff":"#000"}" stroke="#000" stroke-width="${this.sw4stone}"`;
	return s+` cx="${x}" cy="${y}" r="${r}"/>`;
}
mxG.S.prototype.makeAloneBiStone=function(nat,o)
{
	let s,d=this.d,dd=d+2,x=dd/2,y=dd/2,c1,c2,r,z;
	z=(this.in3dOn&&this.stoneShadowOn)?this.stoneShadowWidth:0;
	if(nat[1]=="B"){c1="B";c2="W";}else{c1="W";c2="B";}
	s=`<svg width="40" height="40"`
	+` viewBox="${-z} ${-z} ${dd+2*z} ${dd+2*z}"`
	+` role="presentation" aria-hidden="true">`
	+`<defs>`
	+`<clipPath id="${this.p.n}Setup1Clip"><path d="M0 0H${x}V${dd}H0Z"/></clipPath>`
	+`<clipPath id="${this.p.n}Setup2Clip"><path d="M${dd} 0H${x}V${dd}H${dd}Z"/></clipPath>`
	+`</defs>`;
	r=o.in3dOn?d/2:(d-this.sw4stone+1)/2;
	if(o.in3dOn&&this.stoneShadowOn)
	{
		let e=this.stoneShadowWidth;
		s+=`<circle fill="#000" opacity="0.2" cx="${x+e}" cy="${y+e}" r="${r}"/>`;
	}
	s+=this.makeSemiCircle(1,x,y,r,c1,o);
	s+=this.makeSemiCircle(2,x,y,r,c2,o);
	s+=`</svg>`;
	return s;
}
mxG.S.prototype.addSelect=function(xl,yt,xr,yb)
{
	let dx=this.grim+this.gripx+this.gobp+this.gobm,
		dy=this.grim+this.gripy+this.gobp+this.gobm,
		x=this.i2x(xl)-this.dw/2-(xl==1?this.dw+dx:0),
		y=this.j2y(yt)-this.dh/2-(yt==1?this.dh+dy:0),
		w=this.i2x(xr)+this.dw/2-x+(xr==this.DX?this.dw+dx:0),
		h=this.j2y(yb)+this.dh/2-y+(yb==this.DY?this.dh+dy:0),
		b=document.createElementNS(this.xmlnsUrl,"rect");
	b.setAttributeNS(null,"fill","#777");
	b.setAttributeNS(null,"opacity","0.5");
	b.setAttributeNS(null,"stroke","none");
	b.setAttributeNS(null,"x",x);
	b.setAttributeNS(null,"y",y);
	b.setAttributeNS(null,"width",w);
	b.setAttributeNS(null,"height",h);
	b.classList.add("mxSelect");
	this.gc.firstChild.appendChild(b);
}
mxG.S.prototype.removeSelect=function()
{
	let a=this.gc.firstChild,b=a.querySelector('.mxSelect');
	if(b)b.remove();
}
mxG.G.prototype.setViewFromSelection=function()
{
	let aN,s,xl,yt,xr,yb,exXl,exYt,exXr,exYb,exXls,exYts,exXrs,exYbs;
	if(this.selection)
	{
		xl=((this.editXrs>this.editXls)?this.editXls:this.editXrs);
		yt=((this.editYbs>this.editYts)?this.editYts:this.editYbs);
		xr=((this.editXrs>this.editXls)?this.editXrs:this.editXls);
		yb=((this.editYbs>this.editYts)?this.editYbs:this.editYts);
		if(xl<1)xl=1;
		if(yt<1)yt=1;
		if(xr>this.DX)xr=this.DX;
		if(yb>this.DY)yb=this.DY;
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
	if((xl==1)&&(yt==1)&&(xr==this.DX)&&(yb==this.DY))s="";
	else s=this.xy2s(xl,yt)+":"+this.xy2s(xr,yb);
	aN=this.cN;
	if(aN.P.VW)
	{
		aN.takeOff("VW",-1);
		if(s)aN.P.VW=[s];
	}
	else aN.P.VW=[s];
	this.updateAll();
}
mxG.G.prototype.unselectTool=function(tool)
{
	if(!tool||!this.hasEditTool(tool))return;
	this.getE(tool+"Tool").className="mxUnselectedEditTool";
}
mxG.G.prototype.selectTool=function(tool)
{
	if(!tool||!this.hasEditTool(tool))return;
	this.getE(tool+"Tool").className="mxSelectedEditTool";
}
mxG.G.prototype.superSelectTool=function(tool)
{
	if(!tool||!this.hasEditTool(tool))return;
	this.getE(tool+"Tool").className="mxSuperSelectedEditTool";
}
mxG.G.prototype.disableTool=function(tool)
{
	if(!tool||!this.hasEditTool(tool))return;
	if(tool=="Comment")this.getE("EditCommentTool").disabled=true;
	else this.getE(tool+"Tool").disabled=true;
}
mxG.G.prototype.enableTool=function(tool)
{
	if(!tool||!this.hasEditTool(tool))return;
	if(tool=="Comment")this.getE("EditCommentTool").disabled=false;
	else this.getE(tool+"Tool").disabled=false;
}
mxG.G.prototype.disableTools=function()
{
	let k,km=this.tools.length;
	for(k=0;k<km;k++)this.disableTool(this.tools[k]);
	this.disableTool("Comment");
}
mxG.G.prototype.enableTools=function()
{
	let k,km=this.tools.length;
	for(k=0;k<km;k++)this.enableTool(this.tools[k]);
	this.enableTool("Comment");
}
mxG.G.prototype.changeSelectedTool=function(newTool)
{
	if(this.selection)this.unselectView();
	if(this.editTool&&(this.editTool!="ShowInfo")&&(this.editTool!="Numbering"))
		this.unselectTool(this.editTool);
	this.editTool=newTool;
	if((newTool!="ShowInfo")&&(newTool!="Numbering"))this.selectTool(newTool);
}
mxG.G.prototype.doCut=function()
{
	let aN,SZ,ST,z=this.k;
	if(this.hasC("Menu"))this.toggleMenu("Edit",0);
	this.selectTool("Cut");
	this.zN=this.cN;
	aN=this.zN.Dad;
	this.zN.Dad=null;
	if((aN==this.rN)&&(aN.Kid.length==1))
	{
		SZ=this.getInfo("SZ");
		ST=this.getInfo("ST");
	}
	aN.Kid.splice(aN.Focus-1,1);
	aN.Focus=aN.Kid.length?1:0;
	if(aN==this.rN)
	{
		if(aN.Focus)aN=aN.Kid[0];
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
	if(this.hasC("Tree"))this.hasToSetTree=1;
	this.updateAll();
	setTimeout(function(){mxG.D[z].unselectTool("Cut");},200);
}
mxG.G.prototype.doCopy=function()
{
	let z=this.k;
	if(this.hasC("Menu"))this.toggleMenu("Edit",0);
	this.selectTool("Copy");
	this.zN=this.cN.clone(null);
	this.zN.Dad=null;
	setTimeout(function(){mxG.D[z].unselectTool("Copy");},200);
}
mxG.G.prototype.doPaste=function()
{
	let z=this.k;
	if(this.hasC("Menu"))this.toggleMenu("Edit",0);
	this.selectTool("Paste");
	if(this.zN)
	{
		if(this.zN.P.SZ)this.cN=this.rN;
		this.zN.Dad=this.cN;
		this.cN.Kid[this.cN.Kid.length]=this.zN;
		this.zN=this.zN.clone(null);
		this.cN.Focus=this.cN.Kid.length;
		this.backNode((this.cN==this.rN)?this.kidOnFocus(this.cN):this.cN);
		if(this.hasC("Tree"))this.hasToSetTree=1;
		this.updateAll();
	}
	setTimeout(function(){mxG.D[z].unselectTool("Paste");},200);
}
mxG.G.prototype.doRemoveComments=function()
{
	let sgf,sgf1,sgf2,k;
	if(this.hasC("Menu"))this.toggleMenu("Edit",0);
	if(!this.hasC("Sgf"))return;
	sgf1=this.buildSgf();
	sgf2=sgf1.replace(/(\n|;|\])C\[([^\[\]]+|(\[[^\[\]]+\])?)*\]/g,'$1');
	if(sgf2!=sgf1)
	{
		k=this.rNs.indexOf(this.rN);
		sgf=this.rN.sgf?this.rN.sgf:"";
		if(this.getE("WindowMenu"))
		{
			this.rN.cN=this.cN;
		}
		this.rN=new mxG.P(sgf2,this.sgfLoadCoreOnly,this.sgfLoadMainOnly);
		this.rN.sgf=sgf;
		if(this.getE("WindowMenu"))this.rNs[k]=this.rN;
		this.backNode(this.kidOnFocus(this.rN));
		if(this.hasC("Tree"))this.hasToSetTree=1;
		this.updateAll();
	}
}
mxG.G.prototype.doAsInBook=function()
{
	let aN=this.cN,sN=this.kidOnFocus(this.rN),exFig=0,newFig,newAsInBookOn=(this.asInBookOn?0:1);
	while(aN!=this.rN)
	{
		if(aN.P.FG){exFig=parseInt(aN.P.FG[0]);break;}
		aN=aN.Dad;
	}
	if(aN==this.rN)aN=sN;
	newFig=(newAsInBookOn?(exFig|256):(exFig&~256));
	if((aN==sN)&&!newFig)aN.takeOff("FG",0);
	else aN.put("FG",newFig);
	this.updateAll();
}
mxG.G.prototype.doIndices=function()
{
	let aN=this.cN,sN=this.kidOnFocus(this.rN),exFig=0,newFig,newIndicesOn;
	newIndicesOn=(this.indicesOn?0:1);
	while(aN!=this.rN)
	{
		if(aN.P.FG){exFig=parseInt(aN.P.FG[0]);break;}
		aN=aN.Dad;
	}
	if(aN==this.rN)aN=sN;
	newFig=newIndicesOn?(exFig&~1):(exFig|1);
	if((aN==sN)&&!newFig)aN.takeOff("FG",0);
	else aN.put("FG",newFig);
	this.updateAll();
}
mxG.G.prototype.switchFigureOrNot=function()
{
	let e;
	if(this.getE("NewFigureBox").checked)
	{
		if(e=this.getE("FigureOrNot1P"))e.setAttribute("hidden",true);
		else if(e=this.getE("FigureOrNot2P"))e.setAttribute("hidden",true);
	}
	else
	{
		if(e=this.getE("FigureOrNot1P"))e.removeAttribute("hidden");
		else if(e=this.getE("FigureOrNot2P"))e.removeAttribute("hidden");
	}
}
mxG.G.prototype.buildNumbering=function()
{
	let aN=this.cN,s;
	while((aN.Dad!=this.rN)&&!aN.P.FG)aN=aN.Dad;
	s=`<h1 tabindex="0">${this.local("Numbering")}</h1>`;
	if(aN!=this.cN)
	{
		s+=`<p>`
		+`<label for="${this.n}NewFigureBox">${this.local("New (from this point):")} </label>`
		+`<input type="checkbox" id="${this.n}NewFigureBox" onclick="${this.g}.switchFigureOrNot()">`
		+`</p>`;
	}
	if((aN.Dad!=this.rN)&&aN.P.FG)
	{
		s+=`<p class="mxFigureOrNotP" id="${this.n}FigureOrNot1P">`
		+`<input type="radio" id="${this.n}FigureOrNot1Input" name="figureOrNot" checked value="1">`
		+`<label for="${this.n}FigureOrNot1Input">${this.local("Modify (only for this part of the game tree)")}</label>`
		+`</p>`;
	}
	s+=`<p class="mxTabNumberingP">`
	+`<input type="radio" id="${this.n}NumberingOrNot1Input" name="numberingOrNot"`
	+(this.numberingOn?" checked":"")
	+` value="1">`
	+`<label for="${this.n}NumberingOrNot1Input">${this.local("Start numbering with:")} </label>`
	+`<input type="text" id="${this.n}NumWithTextInput" size="3" maxlength="3" value="1"><br>`
	+`<input type="radio" id="${this.n}NumberingOrNot2Input" name="numberingOrNot"`
	+(!this.numberingOn?" checked":"")
	+` value="2">`
	+`<label for="${this.n}NumberingOrNot2Input">${this.local("No numbering")}</label><br><br>`
	+`<input type="checkbox"${this.asInBookOn?" checked":""} id="${this.n}AsInBookInput"> ${this.local("As in book")}<br>`
	+`<input type="checkbox"${this.indicesOn?" checked":""} id="${this.n}IndicesInput"> ${this.local("Indices")}<br>`
	+`</p>`;
	if((aN.Dad!=this.rN)&&aN.P.FG)
		s+=`<p class="mxFigureOrNotP" id="${this.n}FigureOrNot2P">`
		+`<input type="radio" id="${this.n}FigureOrNot2Input" name="figureOrNot" value="2">`
		+`<label for="${this.n}FigureOrNot2Input">${this.local("Remove (only for this part of the game tree)")}</label>`
		+`</p>`;
	return s;
}
mxG.G.prototype.doNumberingOK=function()
{
	let aN;
	if(this.getE("NewFigureBox")&&this.getE("NewFigureBox").checked)aN=this.cN;
	else
	{
		aN=this.cN;
		while((aN.Dad!=this.rN)&&!(aN.P.FG))aN=aN.Dad;
	}
	if(this.getE("FigureOrNot2Input")&&this.getE("FigureOrNot2Input").checked)
	{
		aN.takeOff("FG",0);
		aN.takeOff("PM",0);
		aN.takeOff("MN",0);
	}
	else
	{
		let newNumberingOn=(this.getE("NumberingOrNot1Input").checked?1:0);
		let newNumWith=parseInt(this.getE("NumWithTextInput").value);
		let newAsInBookOn=(this.getE("AsInBookInput").checked?1:0);
		let newIndicesOn=(this.getE("IndicesInput").checked?1:0);
		let newFigure=((newAsInBookOn?256:0)|(newIndicesOn?0:1));
		if(aN==this.kidOnFocus(this.rN))
		{
			if(newFigure)aN.put("FG",newFigure);
			else aN.takeOff("FG",0);
			if((newNumWith>1)&&newNumberingOn)aN.put("MN",newNumWith);
			else aN.takeOff("MN",0);
			if(newNumberingOn!=1)aN.put("PM",newNumberingOn);
			else aN.takeOff("PM",0);
		}
		else
		{
			aN.put("FG",newFigure);
			aN.put("PM",newNumberingOn);
			if(newNumberingOn)aN.put("MN",newNumWith);
			else aN.takeOff("MN",0);
		}
	}
	if(this.hasC("Tree"))this.hasToSetTree=1;
	this.updateAll();
}
mxG.G.prototype.doNumbering=function()
{
	let btns=[{n:"OK",a:"Numbering"},{n:"Cancel"}];
	this.doDialog("EditNumbering",this.buildNumbering(),btns);
}
mxG.G.prototype.doVariation=function()
{
	if(this.styleMode&2)this.styleMode-=2;else this.styleMode+=2;
	this.kidOnFocus(this.rN).put("ST",this.styleMode&~4);
	this.updateAll();
}
mxG.G.prototype.doStyle=function()
{
	if(this.styleMode&1)this.styleMode-=1;else this.styleMode+=1;
	this.kidOnFocus(this.rN).put("ST",this.styleMode&~4);
	this.updateAll();
}
mxG.G.prototype.doPropertySwitch=function(tool)
{
	let z;
	if((tool!="DO")&&(tool!="IT"))z=2;else z=1;
	if(this.cN.P&&this.cN.P[tool])
	{
		if(((this.cN.P[tool][0]+"")=="1")&&(z>1))this.cN.P[tool][0]="2";
		else this.cN.takeOff(tool,0);
	}
	else
	{
		if((tool=="GB")||(tool=="GW")||(tool=="DM")||(tool=="UC"))
		{
			if((tool!="GB")&&this.cN.P&&this.cN.P.GB)this.cN.takeOff("GB",0);
			if((tool!="GW")&&this.cN.P&&this.cN.P.GW)this.cN.takeOff("GW",0);
			if((tool!="DM")&&this.cN.P&&this.cN.P.DM)this.cN.takeOff("DM",0);
			if((tool!="UC")&&this.cN.P&&this.cN.P.UC)this.cN.takeOff("UC",0);
		}
		if((tool=="TE")||(tool=="BM")||(tool=="DO")||(tool=="IT"))
		{
			if((tool!="TE")&&this.cN.P&&this.cN.P.TE)this.cN.takeOff("TE",0);
			if((tool!="BM")&&this.cN.P&&this.cN.P.BM)this.cN.takeOff("BM",0);
			if((tool!="DO")&&this.cN.P&&this.cN.P.DO)this.cN.takeOff("DO",0);
			if((tool!="IT")&&this.cN.P&&this.cN.P.IT)this.cN.takeOff("IT",0);
		}
		this.cN.put(tool,(z>1)?"1":"");
	}
	this.updateAll();
}
mxG.G.prototype.doPL=function()
{
	if(this.cN.P&&this.cN.P.PL)this.cN.takeOff("PL",0);
	else this.cN.put("PL",this.editNextNat);
	this.updateAll();
}
mxG.G.prototype.doTransform=function(transform)
{
	let s,z,a=[],aN,n,k,sgf;
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
		k=this.rNs.indexOf(this.rN);
		sgf=this.rN.sgf?this.rN.sgf:"";
		this.rN=new mxG.P(s,this.sgfLoadCoreOnly,this.sgfLoadMainOnly);
		this.rN.Focus=a.pop();
		this.rN.sgf=sgf;
		this.rNs[k]=this.rN;
		this.backNode(this.kidOnFocus(this.rN));
		if(this.hasC("Tree"))this.hasToSetTree=1;
		while(a.length){this.cN.Focus=a.pop();if(a.length)this.placeNode();}
		this.updateAll();
	}
}
mxG.G.prototype.doEditTool=function(newTool)
{
	if(newTool=="ShowInfo"){this.doInfo();return;}
	if(newTool=="Numbering"){this.doNumbering();return;}
	if(newTool=="Cut"){this.doCut();return;}
	if(newTool=="Copy"){this.doCopy();return;}
	if(newTool=="Paste"){this.doPaste();return;}
	if(newTool=="AsInBook"){this.doAsInBook();return;}
	if(newTool=="Indices"){this.doIndices();return;}
	if(newTool=="Variation"){this.doVariation();return;}
	if(newTool=="Style"){this.doStyle();return;}
	if((newTool=="GB")
	  ||(newTool=="GW")
	  ||(newTool=="DM")
	  ||(newTool=="UC")
	  ||(newTool=="TE")
	  ||(newTool=="BM")
	  ||(newTool=="DO")
	  ||(newTool=="IT")){this.doPropertySwitch(newTool);return;}
	if(newTool=="PL"){this.doPL();return;}
	if(newTool=="View")
	{
		let z=this.k;
		this.selectTool(newTool);
		this.setViewFromSelection();
		setTimeout(function(){mxG.D[z].unselectTool(newTool);},200);
		if(this.editTool=="Select")this.changeSelectedTool("Play");
		return;
	}
	if(this.selection){this.inSelect=0;this.unselectView();}
	if((newTool=="Play")&&(this.editTool=="Play"))
	{
		if(this.editNextNat=="B"){this.editNextNat="W";this.drawSvgTool("Play");}
		else if(this.editNextNat=="W"){this.editNextNat="B";this.drawSvgTool("Play");}
		return;
	}
	if((newTool=="Setup")&&(this.editTool=="Setup"))
	{
		if(this.editAX=="AB"){this.editAX="AW";this.drawSvgTool("Setup");}
		else if(this.editAX=="AW"){this.editAX="AB";this.drawSvgTool("Setup");}
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
	if(newTool=="VM"){this.doTransform(1);return;}
	if(newTool=="HM"){this.doTransform(2);return;}
	if(newTool=="R"){this.doTransform(3);return;}
	this.changeSelectedTool(newTool);
}
mxG.G.prototype.doEditCommentTool=function()
{
	let s=this.getE("EditCommentTool").value;
	if(s)this.cN.put("C",s);
	else this.cN.takeOff("C",0);
}
mxG.G.prototype.getNextEditNat=function()
{
	let aN=this.cN;
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
	for(aN of this.cN.Kid)
	{
		if(aN.P.B)return "B";
		if(aN.P.W)return "W";
	}
	for(aN of this.cN.Dad.Kid)
	{
		if(aN.P.B)return "W";
		if(aN.P.W)return "B";
	}
	return "B";
}
mxG.G.prototype.checkEditPlay=function(a,b)
{
	let nextNat=this.editNextNat,k,km;
	if(!nextNat){this.plonk();return;}
	if((a||b)&&this.gor.isOccupied(a,b)){this.plonk();return;}
	k=0;
	km=this.cN.Kid.length;
	while(k<km)
	{
		let aN=this.cN.Kid[k],x,y,s,nat;
		if(aN.P.B){s=aN.P.B[0];nat="B";}
		else if(aN.P.W){s=aN.P.W[0];nat="W";}
		else{s="";nat="O";}
		if(s.match(/^[a-zA-Z]{2}$/)){x=s.c2n(0);y=s.c2n(1);}
		else if(!s)x=y=0;
		else x=y=-1;
		if((x==a)&&(y==b)&&(nat==nextNat))
		{
			this.cN.Focus=k+1;
			this.backNode(this.cN);
			this.placeNode();
			this.updateAll();
			return;
		}
		else k++;
	}
	this.addPlay(nextNat,a,b);
	this.placeNode();
	if(this.hasC("Tree"))this.hasToSetTree=1;
	this.updateAll();
}
mxG.G.prototype.checkEditSetup=function(x,y,setupTool="Setup")
{
	let aN,p,v,k,km,kp;
	let AX=["AB","AW","AE"];
	if(!this.inView(x,y))return;
	if(this.gor.getBanNat(x,y)!="E")p="AE";else p=this.editAX;
	v=this.xy2s(x,y);
	if(this.cN.P.B||this.cN.P.W)
	{
		aN=new mxG.N(this.cN,p,v);
		this.cN.Focus=this.cN.Kid.length;
		this.placeNode();
		if(this.hasC("Tree"))this.hasToSetTree=1;
		this.updateAll();
		this.changeSelectedTool(setupTool);
	}
	else
	{
		aN=this.cN;
		for(kp=0;kp<3;kp++)
		{
			if(aN.P[AX[kp]])
			{
				km=aN.P[AX[kp]].length;
				for(k=0;k<km;k++)if(aN.P[AX[kp]][k]==v)break;
				if(k<km)aN.takeOff(AX[kp],k);
			}
		}
		this.backNode(aN.Dad);
		aExNat=this.gor.getBanNat(x,y);
		if(aExNat!=p.substring(1,2))
		{
			if(aN.P[p])aN.P[p].push(v);
			else aN.P[p]=[v];
		}
		this.placeNode(aN);
		this.updateAll();
	}
}
mxG.G.prototype.selectGobanArea=function(x,y)
{
	if((this.editTool=="Select")&&this.inSelect&&((x!=this.editXrs)||(y!=this.editYbs)))
	{
		let id,i,j,xl,yt,xr,yb,xl1,yt1,xr1,yb1,xl2,yt2,xr2,yb2;
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
		this.scr.removeSelect();
		this.scr.addSelect(xl,yt,xr,yb);
	}
}
mxG.G.prototype.unselectView=function()
{
	let i,j;
	this.selection=0;
	this.scr.removeSelect();
}
mxG.G.prototype.selectView=function()
{
	let i,j,xl,yt,xr,yb;
	this.selection=1;
	xl=Math.min(this.editXls,this.editXrs);
	yt=Math.min(this.editYts,this.editYbs);
	xr=Math.max(this.editXls,this.editXrs);
	yb=Math.max(this.editYts,this.editYbs);
	this.scr.addSelect(xl,yt,xr,yb);
}
mxG.G.prototype.getNextLabel=function(aLB)
{
	let bLB="";
	if(aLB.match(/^[A-Za-z]$/))
	{
		if(aLB=="Z")bLB="A";
		else if(aLB=="z")bLB="a";
		else bLB=String.fromCharCode(aLB.charCodeAt(0)+1);
	}
	return bLB;
}
mxG.G.prototype.checkEditMarkOrLabel=function(x,y,m)
{
	let v,k,km,kp,aLB,bLB="",MX=["MA","TR","SQ","CR","LB"];
	if(!this.inView(x,y))return;
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
				if(this.cN.P[MX[kp]][k].substring(0,2)==v.substring(0,2))break;
			if((k==km)&&(MX[kp]==m))
			{
				if(m=="LB")bLB=this.getNextLabel(aLB);
				this.cN.P[m][km]=v;
			}
			else if(k<km)
			{
				if(MX[kp]=="LB")bLB=this.cN.P[MX[kp]][k].substring(3);
				this.cN.takeOff(MX[kp],k);
			}
		}
		else if(MX[kp]==m)
		{
			if(m=="LB")bLB=this.getNextLabel(aLB);
			this.cN.P[m]=[v];
		}
	}
	if((m=="LB")&&bLB)this.getE("LabelTool").value=bLB;
	this.backNode(this.cN);
	this.updateAll();
}
mxG.G.prototype.doMouseMoveEdit=function(ev)
{
	if((this.editTool=="Select")&&(this.inSelect==1))
	{
		ev.preventDefault();
		let c=this.scr.getGxy(ev);
		this.selectGobanArea(c.x,c.y);
	}
}
mxG.G.prototype.doMouseDownEditSelect=function(x,y)
{
	if(this.inSelect==1)this.inSelect=0;
	else
	{
		this.inSelect=1;
		if(this.selection)this.unselectView();
		this.editXls=x;
		this.editYts=y;
		this.editXrs=x;
		this.editYbs=y;
		this.selectView();
	}
}
mxG.G.prototype.doMouseDownEdit=function(ev)
{
	if(this.editTool=="Select")
	{
		let c=this.scr.getGxy(ev);
		this.doMouseDownEditSelect(c.x,c.y);
	}
}
mxG.G.prototype.doMouseUpEditSelect=function(x,y)
{
	if((x!=this.editXls)&&(y!=this.editYts))this.inSelect=0;
}
mxG.G.prototype.doMouseUpEdit=function(ev)
{
	if(this.editTool=="Select")
	{
		let c=this.scr.getGxy(ev);
		this.doMouseUpEditSelect(c.x,c.y);
	}
}
mxG.G.prototype.doMouseOutEdit=function(ev)
{
	if(this.editTool=="Select")
	{
		if(this.inSelect)
		{
			let c=this.scr.getGxy(ev,1);
			if((c.x<this.xli)||(c.x>this.xri)||(c.y<this.yti)||(c.y>this.ybi))
				this.inSelect=0;
		}
	}
}
mxG.G.prototype.doKeydownSelect=function(x,y)
{
	if(this.inSelect==2)this.inSelect=0;
	else
	{
		this.inSelect=2;
		if(this.selection)this.unselectView();
		this.editXls=x;
		this.editYts=y;
		this.editXrs=x;
		this.editYbs=y;
		this.selectView();
	}
}
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
	}
}
mxG.G.prototype.drawSvgTool=function(tool)
{
	let e=this.getE(tool+"Tool"),nat,txt,o;
	o={in3dOn:this.in3dOn,stoneShadowOn:this.stoneShadowOn,type:"tool",role:"presentation"};
	switch(tool)
	{
		case "Select":e.innerHTML=this.scr.makeSelectTool();break;
		case "View":e.innerHTML=this.scr.makeViewTool();break;
		case "Play":
			nat=this.editNextNat;
			if(this.hasEditTool("Setup"))s=this.scr.makeAloneStone(nat,"",o);
			else s=this.scr.makeAloneBiStone(nat,o);
			e.innerHTML=s;break;
		case "Setup":nat=this.editAX;e.innerHTML=this.scr.makeAloneBiStone(nat,o);break;
		case "SetupBlack":e.innerHTML=this.scr.makeAloneStone("B","",o);break;
		case "SetupWhite":e.innerHTML=this.scr.makeAloneStone("W","",o);break;
		case "Cut":
		case "Copy":
		case "Paste":
			e.innerHTML=this.scr.makeFromPath(this[tool.toLowerCase()+"SvgPath"]);break;
		case "Circle":
		case "Mark":
		case "Square":
		case "Triangle":e.innerHTML=this.scr.makeAloneMark(tool);break;
		case "Numbering":e.innerHTML=this.scr.makeAloneStone("W",5,o);break;
		case "ShowInfo":e.innerHTML=this.scr.makeAloneToolText(this.local("H"));break;
		case "AsInBook":e.innerHTML=this.scr.makeAloneToolText(this.local("K"));break;
		case "Indices":e.innerHTML=this.scr.makeAloneToolText(this.local("I"));break;
		case "Variation":e.innerHTML=this.scr.makeAloneToolText(this.local("V"));break;
		case "Style":e.innerHTML=this.scr.makeAloneToolText(this.local("S"));break;
		case "GB":e.innerHTML=this.scr.makeAloneToolText(this.local("●+"));break;
		case "GW":e.innerHTML=this.scr.makeAloneToolText(this.local("○+"));break;
		case "DM":e.innerHTML=this.scr.makeAloneToolText(this.local("="));break;
		case "UC":e.innerHTML=this.scr.makeAloneToolText(this.local("~"));break;
		case "TE":e.innerHTML=this.scr.makeAloneToolText(this.local("!"));break;
		case "BM":e.innerHTML=this.scr.makeAloneToolText(this.local("?"));break;
		case "DO":e.innerHTML=this.scr.makeAloneToolText(this.local("?!"));break;
		case "IT":e.innerHTML=this.scr.makeAloneToolText(this.local("!?"));break;
		case "PL":e.innerHTML=this.scr.makeAloneToolText(this.local("T"));break;
		case "R":e.innerHTML=this.scr.makeAloneToolText(this.local("↺"));break;
		case "VM":e.innerHTML=this.scr.makeAloneToolText(this.local("↕"));break;
		case "HM":e.innerHTML=this.scr.makeAloneToolText(this.local("↔"));break;
	}
}
mxG.G.prototype.drawEditTools=function()
{
	let k,km=this.tools.length,tool;
	for(k=0;k<km;k++)
	{
		tool=this.tools[k];
		if(tool&&(tool!="Label"))this.drawSvgTool(tool);
	}
	this.hasToSetEditTools=0;
}
mxG.G.prototype.selectDouble=function(tool)
{
	if(this.cN.P&&this.cN.P[tool])
	{
		if((this.cN.P[tool][0]+"")=="2")this.superSelectTool(tool);
		else this.selectTool(tool);
	}
	else this.unselectTool(tool);
}
mxG.G.prototype.selectSingle=function(tool)
{
	if(this.cN.P&&this.cN.P[tool])this.selectTool(tool);else this.unselectTool(tool);
}
mxG.G.prototype.getCommentWhenEdit=function()
{
	if(this.hasC("Score")&&this.scoreInComment&&this.canPlaceScore)
		return this.buildScore();
	return this.cN.P.C?this.cN.P.C[0]:"";
}
mxG.G.prototype.getInitialMark=function(a)
{
	return a.match(/^([a-z])$/)?"a":"A";
}
mxG.G.prototype.updateEdit=function()
{
	if(this.hasC("Score")&&this.canPlaceScore)return;
	this.enableTools();
	this.editNextNat=this.getNextEditNat();
	if(this.hasToSetEditTools)this.drawEditTools();
	else this.drawSvgTool("Play");
	if(this.pN!=this.cN)
	{
		this.getE("LabelTool").value=this.getInitialMark(this.getE("LabelTool").value);
		this.changeSelectedTool("Play");
		this.pN=this.cN;
	}
	if(this.indicesOn)this.selectTool("Indices");else this.unselectTool("Indices");
	if(this.styleMode&2)this.unselectTool("Variation");else this.selectTool("Variation");
	if(this.styleMode&1)this.unselectTool("Style");else this.selectTool("Style");
	if(this.asInBookOn)this.selectTool("AsInBook");else this.unselectTool("AsInBook");
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
		this.getE("EditCommentTool").value=this.getCommentWhenEdit();
}
mxG.G.prototype.doKeydownLabel=function(ev)
{
	if(ev.key=="Enter")this.changeSelectedTool("Label");
}
mxG.G.prototype.doKeydownTool=function(ev)
{
	if(ev.metaKey||ev.ctrlKey||ev.altKey)return;
	if(ev.key.match(/^[bcmtv]$/i))this.doAlphaKeydown(ev);
}
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
}
mxG.G.prototype.makeTool=function(tool)
{
	let s,id=this.n+tool+"Tool";
	s=` title="${this.local(this.getToolLabel(tool))}" class="mxUnselectedEditTool" id="${id}"`;
	return (tool=="Label")?`<input${s} type="text" value="A">`:`<button${s}></button>`;
}
mxG.G.prototype.initEditTools=function()
{
	let k,km=this.tools.length,tool,e;
	for(k=0;k<km;k++)
	{
		tool=this.tools[k];
		e=this.getE(tool+"Tool");
		if(e)
		{
			let z=this.k,t=tool;
			e.addEventListener("click",function(){mxG.D[z].doEditTool(t);});
			if(tool=="Label")
				e.addEventListener("keydown",function(ev){mxG.D[z].doKeydownLabel(ev);});
			else e.addEventListener("keydown",function(ev){mxG.D[z].doKeydownTool(ev);});
		}
	}
}
mxG.G.prototype.initEdit=function()
{
	let k=this.k;
	if(this.editXls===undefined)this.editXls=this.xl;
	if(this.editYts===undefined)this.editYts=this.yt;
	if(this.editXrs===undefined)this.editXrs=this.xr;
	if(this.editYbs===undefined)this.editYbs=this.yb;
	this.editAX="AB";
	this.editNextNat="B";
	this.initEditTools();
	this.drawEditTools();
	if(!this.editTool)this.changeSelectedTool("Play");
	this.pN=this.cN;
	if(this.hasEditTool("Comment"))
	{
		this.getE("EditCommentTool").addEventListener("change",function(){mxG.D[k].doEditCommentTool();});
		this.getE("EditCommentTool").value="";
	}
}
mxG.G.prototype.hasEditTool=function(tool)
{
	if(tool=="Comment")return 1;
	return this.tools.indexOf(tool)>=0;
}
mxG.G.prototype.createEdit=function()
{
	let s,k=0,m,mm;
	this.tools=[
		"Select","View","Play","Setup","Cut","Copy","Paste",
		"Numbering","ShowInfo","Label","Mark","Circle","Square","Triangle",
		"AsInBook","Indices","Variation","Style",
		"GB","GW","DM","UC","TE","BM","DO","IT","PL","R","VM","HM"];
	this.canPlaceEdit=1;
	this.extraEditToolsOn=1;
	this.et=1;
	this.zN=null;
	this.cutSvgPath="M167,252C149,252 132,255 117,265 7,333 73,500 226,458 280,443 343,472 367,490 407,521 408,522 367,554 344,571 268,594 234,586 170,571 114,590 86,628 48,679 61,748 104,778 145,806 210,809 245,772 273,740 284,710 281,674 276,619 274,615 370,593 464,570 485,574 669,644 800,694 883,714 920,705 949,698 974,684 974,676 974,667 891,632 792,597 692,562 611,528 611,521 611,513 687,480 782,448 971,381 1002,358 920,338 883,328 801,349 661,402 549,444 447,472 434,464 421,456 375,445 334,437 280,425 266,416 272,369 275,335 263,299 235,275 216,258 189,252 167,252ZM169,286C179,286 190,288 200,293 225,305 241,333 239,360 238,388 219,414 192,423 166,433 136,425 117,405 98,386 92,354 103,329 114,303 141,285 169,286ZM170,623C208,623 240,654 240,693 240,731 208,763 170,763 131,763 100,731 100,693 100,654 131,623 170,623 Z";
	this.copySvgPath="M448,640V405H661 874V640 875H661 448ZM810,747C810,734 746,725 661,725 576,725 512,734 512,747 512,759 576,768 661,768 746,768 810,759 810,747ZM810,640C810,628 746,619 661,619 576,619 512,628 512,640 512,652 576,661 661,661 746,661 810,652 810,640ZM810,533C810,521 746,512 661,512 576,512 512,521 512,533 512,545 576,555 661,555 746,555 810,545 810,533ZM149,384V149H362 576V256 363H490 405V491 619H277 149ZM384,491C384,479 345,469 298,469 251,469 213,479 213,491 213,502 251,512 298,512 345,512 384,502 384,491ZM384,384C384,372 345,363 298,363 251,363 213,372 213,384 213,396 251,405 298,405 345,405 384,396 384,384ZM512,277C512,265 448,256 362,256 277,256 213,265 213,277 213,289 277,299 362,299 448,299 512,289 512,277 Z";
	this.pasteSvgPath="M448,661V426H661 875V661 896H661 448ZM811,768C811,755 747,746 661,746 576,746 512,755 512,768 512,780 576,789 661,789 747,789 811,780 811,768ZM811,661C811,649 747,640 661,640 576,640 512,649 512,661 512,673 576,682 661,682 747,682 811,673 811,661ZM811,554C811,542 747,533 661,533 576,533 512,542 512,554 512,566 576,576 661,576 747,576 811,566 811,554ZM149,512C149,256 168,170 201,275 217,323 273,340 416,340 559,340 615,323 630,275 651,208 683,229 683,309V384H544 405V586 789H277 149ZM234,234C234,181 243,170 286,170 324,170 340,157 345,122 350,85 365,74 416,74 466,74 481,85 486,122 491,157 508,170 545,170 589,170 597,181 597,234V298H416 234 Z";
	this.inSelect=0;
	this.selection=0;
	this.editTool=0;
	s=`<div class="mxEditToolbar" id="${this.n}EditToolbar">`;
	for(let t of this.tools)s+=this.makeTool(t);
	s+=`</div>`;
	s+=`<textarea class="mxEditCommentTool" id="${this.n}EditCommentTool" title="${this.local("Comments")}"></textarea>`;
	this.menuEditItems=
	[
		{n:"Cut",v:this.local("Cut")},
		{n:"Copy",v:this.local("Copy")},
		{n:"Paste",v:this.local("Paste")},
		{n:"RemoveComments",v:this.local("Remove comments")}
	];
	return s;
}
}
if(!mxG.G.prototype.createInfo)
{
mxG.fr("Info","Info");
mxG.fr("OK","OK");
mxG.fr("Cancel","Annuler");
mxG.fr("Event","Évènement");
mxG.fr("Round","Ronde");
mxG.fr("Rank","Niveau");
mxG.fr("Komi","Komi");
mxG.fr("Handicap","Handicap");
mxG.fr("Result","Résultat");
mxG.fr("Date","Date");
mxG.fr("Place","Lieu");
mxG.fr("Rules","Règle");
mxG.fr("Time limits","Temps");
mxG.fr("Overtime","Byoyomi");
mxG.fr("Annotations","Annotations");
mxG.fr("Copyright","Copyright");
mxG.fr("Source","Source");
mxG.fr("User","Utilisateur");
mxG.fr("Black team","Équipe de Noir");
mxG.fr("White team","Équipe de Blanc");
mxG.fr("Game name","Nom de la partie");
mxG.fr("Opening","Ouverture");
mxG.fr("General comment","Commentaire général");
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
mxG.G.prototype.popInfo=function(aPropName)
{
	let aN;
	aN=this.kidOnFocus(this.rN);
	aN.takeOff(aPropName,0);
}
mxG.G.prototype.decodeResult=function(a)
{
	this.WN="";
	this.HW="";
	this.SC="";
	if(a)
	{
		this.WN=a.substring(0,1);
		if(this.WN=="0")this.WN="D";
		if(a.substring(1,2)=="+")
		{
			this.WN+="+";
			if(a.substring(2,3)=="R")this.HW="R";
			else if(a.substring(2,3)=="T")this.HW="T";
			else if(a.substring(2,3)=="F")this.HW="F";
			else if(a.length>2)
			{
				this.HW="P";
				this.SC=a.substring(2);
			}
		}
	}
}
mxG.G.prototype.changeInfoStatus=function(el,b)
{
	let c=el.className.replace(" mxBadInput","");
	if(b)el.className=c;else el.className=c+" mxBadInput";
}
mxG.G.prototype.checkRank=function(el,ev)
{
	this.changeInfoStatus(el,(el.value+"").search(/^([0-9]+[kdp]?)?$/)==0);
}
mxG.G.prototype.checkHandicap=function(el,ev)
{
	this.changeInfoStatus(el,!el.value||(((el.value+"").search(/^[0-9]+$/)==0)&&(parseInt(el.value)>1)));
}
mxG.G.prototype.checkReal=function(el,ev)
{
	this.changeInfoStatus(el,(el.value+"").search(/^([0-9]+([.]([0-9]+)?)?)?$/)==0);
}
mxG.G.prototype.encodeResult=function()
{
	let e=this.getE("RE"),WN=this.getE("WN").value,HW;
	if(WN=="D")e.value="Draw";
	else if(WN=="V")e.value="Void";
	else e.value=WN;
	if((WN=="B+")||(WN=="W+"))
	{
		HW=this.getE("HW").value;
		if (!HW||(HW=="P"))e.value+=this.getE("SC").value;
		else e.value+=HW;
	}
}
mxG.G.prototype.buildInfo=function()
{
	this.decodeResult(this.getInfo("RE",0));
	return `<label class="mxGN"><span>${this.local("Game name")}</span><input class="mxGN" id="${this.n}GN" type="text" value=""></label>`
	+`<label class="mxEV"><span>${this.local("Event")}</span><input class="mxEV" id="${this.n}EV" type="text" value=""></label>`
	+`<label class="mxRO"><span>${this.local("Round")}</span><input class="mxRO" id="${this.n}RO" type="text" value=""></label>`
	+`<label class="mxDT"><span>${this.local("Date")}</span><input class="mxDT" id="${this.n}DT" type="text" value=""></label>`
	+`<label class="mxPC"><span>${this.local("Place")}</span><input class="mxPC" id="${this.n}PC" type="text" value=""></label>`
	+`<label class="mxPB"><span>${this.local("Black")}</span><input class="mxPB" id="${this.n}PB" type="text" value=""></label>`
	+`<label class="mxBR"><span>${this.local("Rank")}</span><input class="mxBR" onkeyup="${this.g}.checkRank(this,event);" id="${this.n}BR" type="text" value=""></label>`
	+`<label class="mxPW"><span>${this.local("White")}</span><input class="mxPW" id="${this.n}PW" type="text" value=""></label>`
	+`<label class="mxWR"><span>${this.local("Rank")}</span><input class="mxWR" onkeyup="${this.g}.checkRank(this,event);" id="${this.n}WR" type="text" value=""></label>`
	+`<label class="mxKM"><span>${this.local("Komi")}</span><input class="mxKM" onkeyup="${this.g}.checkReal(this,event);" id="${this.n}KM" type="text" value=""></label>`
	+`<label class="mxHA"><span>${this.local("Handicap")}</span><input class="mxHA" onkeyup="${this.g}.checkHandicap(this,event);" id="${this.n}HA" type="text" value=""></label>`
	+`<div class="mxResult">`
	+`<label class="mxWN" for="${this.n}WN"><span>${this.local("Result")}</span></label>`
	+`<select class="mxWN" id="${this.n}WN">`
	+`<option value=""></option>`
	+`<option value="B+">${this.local("Black")+this.local(" wins")}</option>`
	+`<option value="W+">${this.local("White")+this.local(" wins")}</option>`
	+`<option value="D">${this.local("draw")}</option>`
	+`<option value="V">${this.local("no result")}</option>`
	+`<option value="?">${this.local("unknown")}</option>`
	+`</select>`
	+`<select class="mxHW" id="${this.n}HW">`
	+`<option value=""></option>`
	+`<option value="P">${this.local("on points")}</option>`
	+`<option value="R">${this.local("by resign")}</option>`
	+`<option value="T">${this.local("by time")}</option>`
	+`<option value="F">${this.local("by forfeit")}</option>`
	+`</select>`
	+`<label class="mxSC" for="${this.n}SC"><span>${this.local("by")}</span></label>`
	+`<input class="mxSC" id="${this.n}SC" onkeyup="${this.g}.checkReal(this,event);" type="text" value="">`
	+`<input class="mxRE" id="${this.n}RE" type="hidden" value="">`
	+`</div>`
	+`<label class="mxGC"><span>${this.local("General comment")} </span><textarea class="mxGC" id="${this.n}GC"></textarea></label>`
	+`<label class="mxBT"><span>${this.local("Black team")}</span><input class="mxBT" id="${this.n}BT" type="text" value=""></label>`
	+`<label class="mxWT"><span>${this.local("White team")}</span><input class="mxWT" id="${this.n}WT" type="text" value=""></label>`
	+`<label class="mxRU"><span>${this.local("Rules")}</span><input class="mxRU" id="${this.n}RU" type="text" value=""></label>`
	+`<label class="mxTM"><span>${this.local("Time limits")}</span><input class="mxTM" id="${this.n}TM" type="text" value=""></label>`
	+`<label class="mxOT"><span>${this.local("Overtime")}</span><input class="mxOT" id="${this.n}OT" type="text" value=""></label>`
	+`<label class="mxON"><span>${this.local("Opening")}</span><input class="mxON" id="${this.n}ON" type="text" value=""></label>`
	+`<label class="mxAN"><span>${this.local("Annotations")}</span><input class="mxAN" id="${this.n}AN" type="text" value=""></label>`
	+`<label class="mxCP"><span>${this.local("Copyright")}</span><input class="mxCP" id="${this.n}CP" type="text" value=""></label>`
	+`<label class="mxSO"><span>${this.local("Source")}</span><input class="mxSO" id="${this.n}SO" type="text" value=""></label>`
	+`<label class="mxUS"><span>${this.local("User")}</span><input class="mxUS" id="${this.n}US" type="text" value=""></label>`;
}
mxG.G.prototype.putInfoInBox=function()
{
	let p,pm,IX=["EV","RO","DT","PC","PB","BR","PW","WR","HA","KM","RE","GC","RU","TM","OT","AN","CP","SO","US","GN","BT","WT","ON"];
	pm=IX.length;
	for(p=0;p<pm;p++)
		if(this.getE(IX[p]))
		{
			if(IX[p]=="RE")
			{
				this.decodeResult(this.getInfo("RE",0));
				this.getE("RE").value=this.getInfo("RE",0);
				if(this.getE("WN"))this.getE("WN").value=this.WN;
				if(this.getE("HW"))this.getE("HW").value=this.HW;
				if(this.getE("SC"))this.getE("SC").value=this.SC;
			}
			else this.getE(IX[p]).value=this.getInfo(IX[p],0);
		}
}
mxG.G.prototype.getInfoFromBox=function()
{
	let p,pm,v,IX=["EV","RO","DT","PC","PB","BR","PW","WR","HA","KM","RE","GC","RU","TM","OT","AN","CP","SO","US","GN","BT","WT","ON"];
	pm=IX.length;
	for(p=0;p<pm;p++)
	{
		if(IX[p]=="RE")this.encodeResult();
		if(this.getE(IX[p])&&(v=this.getE(IX[p]).value))this.kidOnFocus(this.rN).put(IX[p],v);
		else this.popInfo(IX[p]);
	}
}
mxG.G.prototype.doInfoOK=function()
{
	this.getInfoFromBox();
	this.updateAll();
}
mxG.G.prototype.doInfo=function()
{
	let btns=[{n:"OK",a:"Info"},{n:"Cancel"}];
	this.doDialog("EditInfo",this.buildInfo(),btns);
	this.putInfoInBox();
}
mxG.G.prototype.createInfo=function()
{
	return ``;
}
}
if(!mxG.G.prototype.createTree)
{
mxG.fr("Game tree","Arbre des coups");
mxG.fr("Variations","Variations");
mxG.fr("buildVariationTreeNum",a=>"Variation "+a[0]+" parmi "+a[1]);
mxG.en("buildVariationTreeNum",a=>"Variation "+a[0]+" of "+a[1]);
mxG.S.prototype.getTxy=function(ev)
{
	let w=this.ddT*this.p.getTreeRatio(),
		c0=this.p.getTreeOffset(),
		c=this.p.tc.getMClick(ev);
	return {x:Math.floor((c.x-c0.x)/w),y:Math.floor((c.y-c0.y)/w)};
}
mxG.S.prototype.makeTreePointDesc=function()
{
	let aN=this.p.cN,nat,s="",x,y,n;
	s+=this.makeOneInfoFromGameTree(aN,1);
	pN=aN.Dad;
	if((n=pN.Kid.length)>1)
	{
		let m=pN.Focus,desc=this.p.build("VariationTreeNum",[m,n]);
		if(desc&&(desc!=([m,n]+"")))s+=". "+desc;
		else s+=". "+this.p.local("Variation")+" "+m;
	}
	return s;
}
mxG.S.prototype.setTreeTitleDesc=function(status)
{
	let s;
	if(status==1)s=this.makeTreePointDesc();
	else s=this.p.local("Game tree");
	this.p.tb.setAttribute("aria-label",s);
}
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
}
mxG.S.prototype.makeOneTreeBlockContainer=function(x,y,z)
{
	let gr,dd=this.ddT,k=this.p.k,m=this.p.treeM,
		n=Math.min(this.p.treeN,this.p.treeRowMax-y),
		w=m*dd,h=n*dd;
	gr=document.createElementNS(this.xmlnsUrl,"svg");
	gr.setAttribute("id",this.p.n+"TreeBlockSvg"+this.p.idt(x,y));
	gr.setAttribute("data-z",z);
	gr.setAttributeNS(null,"width",w);
	gr.setAttributeNS(null,"height",h);
	gr.setAttributeNS(null,"viewBox","0 0 "+w+" "+h);
	gr.setAttributeNS(null,"font-family",this.ff);
	gr.setAttributeNS(null,"font-size",this.fs);
	gr.setAttributeNS(null,"font-weight",this.fw);
	gr.setAttributeNS(null,"text-anchor","middle");
	gr.setAttributeNS(null,"fill","none");
	gr.setAttributeNS(null,"stroke","none");
	gr.setAttribute("role","presentation");
	gr.setAttribute("aria-hidden","true");
	gr.style.maxWidth="none";
	this.p.treeObserver.observe(gr);
	return gr;
}
mxG.S.prototype.drawTreeLines=function(k,p)
{
	let e=document.createElementNS(this.xmlnsUrl,"path");
	e.setAttributeNS(null,"stroke","#000");
	e.setAttributeNS(null,"stroke-width",this.sw4grid);
	e.setAttributeNS(null,"d",p);
	e.classList.add("mxTreeLine");
	this.p.treeBlocks[k].prepend(e);
}
mxG.S.prototype.makeTreeLine=function(s,x,y)
{
	let d=this.dT,dd=this.ddT,r=this.rT,r2=this.r2T,r3=this.r3T,
		xo,yo,x1,y1,x2,y2,n=this.p.treeN,k=Math.floor(y/n);
	xo=x*dd;
	yo=(y-k*n)*dd;
	x1=xo+r2+r;
	y1=yo+r2+r;
	x2=xo+dd;
	y2=yo+dd;
	if(s=="H2L")return "M"+xo+" "+y1+"H"+(xo+r2);
	if(s=="D2TL")return "M"+xo+" "+yo+"L"+(xo+r3)+" "+(yo+r3);
	if(s=="H2R")return "M"+(x2-r2)+" "+y1+"H"+x2;
	if(s=="D2BR")return "M"+(x2-r3)+" "+(y2-r3)+"L"+x2+" "+y2;
	if(s=="V2B")return "M"+x1+" "+(y2-r2)+"V"+y2;
	if(s=="V1")return "M"+x1+" "+yo+"V"+y2;
	if(s=="A1")return "M"+x1+" "+yo+"V"+y1+"L"+x2+" "+y2;
	if(s=="T1")return "M"+x1+" "+yo+"V"+y2+"M"+x1+" "+y1+"L"+x2+" "+y2;
	return "";
}
mxG.S.prototype.drawTreePoint=function(aN)
{
	let gr,e,d=this.dT,dd=this.ddT,r=this.rT,r2=this.r2T,rg,a,cx,cy,
		nat,s="",x,y,xo,yo,xx,yy,c,ac,cls,good,
		n=this.p.treeN,m=this.p.treeM,tree=this.p.tree,p="";
	if(aN.P["B"])nat="B";else if(aN.P["W"])nat="W";else nat="E";
	if(!this.p.hideTreeNumbering&&((nat=="B")||(nat=="W")))
	{
		if(aN.P.C&&this.p.markCommentOnTree)s="?";
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
			e.setAttribute("id",this.p.n+"TreeNodeSpecial"+this.p.idt(x,y));
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
		if(tree[y][x-1]==aN.Dad)p+=this.makeTreeLine("H2L",x,y);
		else p+=this.makeTreeLine("D2TL",x,y);
	}
	if(aN.Kid&&aN.Kid.length)
	{
		if((tree[y][x+1]!=undefined)&&(tree[y][x+1]!=undefined)&&(tree[y][x+1].Dad==aN))
			p+=this.makeTreeLine("H2R",x,y);
		if((tree[y+1]!=undefined)&&(tree[y+1][x+1]!=undefined)&&(tree[y+1][x+1].Dad==aN))
			p+=this.makeTreeLine("D2BR",x,y);
		if((tree[y+1]!=undefined)&&(tree[y+1][x]!=undefined)
			&&((tree[y+1][x].Shape==-1)||(tree[y+1][x].Shape==-2)||(tree[y+1][x].Shape==-3)))
			p+=this.makeTreeLine("V2B",x,y);
	}
	return p;
}
mxG.S.prototype.drawTreeBlock=function(k)
{
	let i,j,jo,jm,nv=Math.min(this.p.treeN,this.p.treeRowMax),p="";
	jo=Math.max(0,k*nv);
	jm=Math.min(jo+nv,this.p.treeRowMax);
	for(j=jo;j<jm;j++)
	{
		if(!this.p.treeCheck[j])
		{
			this.p.treeCheck[j]=1;
			for(i=0;i<this.p.treeColumnMax;i++)
				if((this.p.tree[j]!=undefined)&&(this.p.tree[j][i]!=undefined))
				{
					if(this.p.tree[j][i]&&this.p.tree[j][i].Dad)p+=this.drawTreePoint(this.p.tree[j][i]);
					else
					{
						if(this.p.tree[j][i]&&(this.p.tree[j][i].Shape==-1))p+=this.makeTreeLine("A1",i,j);
						else if(this.p.tree[j][i]&&(this.p.tree[j][i].Shape==-2))p+=this.makeTreeLine("T1",i,j);
						else if(this.p.tree[j][i]&&(this.p.tree[j][i].Shape==-3))p+=this.makeTreeLine("V1",i,j);
					}
				}
		}
	}
	this.drawTreeLines(k,p);
}
mxG.S.prototype.initTree=function()
{
	let d=this.d,r=d/2,r2=Math.floor(r/2);
	this.dT=d;
	this.ddT=d+2*r2;
	this.rT=r;
	this.r2T=r2;
	this.r3T=r2+0.15*d;
}
mxG.G.prototype.idt=function(x,y){return x+"_"+y;}
mxG.G.prototype.getTreeOffset=function()
{
	let b1=this.tc.getBoundingClientRect(),
		b2=this.tc.querySelector('svg').getBoundingClientRect();
	return {x:b2.left-b1.left,y:b2.top-b1.top};
}
mxG.G.prototype.getTreeRatio=function()
{
	let b=this.tc.querySelector('svg').getBoundingClientRect();
	return b.width/(this.scr.ddT*this.treeM);
}
mxG.G.prototype.doClickTree=function(ev)
{
	let aN,c,x,y;
	if(this.isTreeDisabled())return;
	c=this.scr.getTxy(ev);
	x=c.x;
	y=c.y;
	if((this.tree[y]!=undefined)&&(this.tree[y][x]!=undefined))
	{
		aN=this.tree[y][x];
		this.backNode(aN);
		this.updateAll();
	}
}
mxG.G.prototype.doKeydownTree=function(ev)
{
	if(ev.key.match(/^[abcmov]$/i))
	{
		if(this.doAlphaKeydown(ev))return;
	}
	else if(ev.shiftKey||ev.key.match(/^[ufghjkln]$/i))
	{
		if(this.hasC("Navigation"))this.doKeydownNavigation(ev);
	}
}
mxG.G.prototype.buildTreeBlocksContainer=function()
{
	let i,j,k,n,m,dd=this.scr.ddT,e=this.getE("Global");
	m=this.treeColumnMax;
	n=this.treeN;
	this.treeBlocks=[];
	k=0;
	for(j=0;j<this.treeRowMax;j=j+n)
		for(i=0;i<this.treeColumnMax;i=i+m)
			{
				this.treeBlocks.push(this.scr.makeOneTreeBlockContainer(i,j,k));
				k++;
			}
	e.style.setProperty("--treeIntrinsicWidth",m*dd);
	e.style.setProperty("--treeIntrinsicHeight",Math.min(n,this.treeRowMax)*dd);
}
mxG.G.prototype.getEmphasisColor=function(k)
{
	if(k)
	{
		if(k&this.goodnessCode.Good)return this.goodColor?this.goodColor:0;
		if(k&this.goodnessCode.Bad)return this.badColor?this.badColor:0;
		if(k&this.goodnessCode.Even)return this.evenColor?this.evenColor:0;
		if(k&this.goodnessCode.Warning)return this.warningColor?this.warningColor:0;
		if(k&this.goodnessCode.Unclear)return this.unclearColor?this.unclearColor:0;
		if(k&this.goodnessCode.OffPath)return this.offPathColor?this.offPathColor:0;
		if(k&this.goodnessCode.Focus)return this.focusColor?this.focusColor:0;
	}
	return this.neutralColor?this.neutralColor:0;
}
mxG.G.prototype.getEmphasisClass=function(k)
{
	if(k)
	{
		let g=this.goodnessCode;
		if(k&g.Good)return "mxGood";
		if(k&g.Bad)return "mxBad";
		if(k&g.Even)return "mxEven";
		if(k&g.Warning)return "mxWarning";
		if(k&g.Unclear)return "mxUnclear";
		if(k&g.OffPath)return "mxOffPath";
		if(k&g.Focus)return "mxFocus";
	}
	return "mxNeutral";
}
mxG.G.prototype.hasEmphasis=function(aN)
{
	if(aN==this.cN)return this.goodnessCode.Focus;
	return 0;
}
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
}
mxG.G.prototype.computeGoodness=function(aN,good)
{
	return 0;
}
mxG.G.prototype.buildTree=function(aN,io,jo)
{
	let i=io,j=jo,k,km=aN.Kid.length,l,good=0,path,p,pm;
	if(!this.uC)this.setPl();
	if(j==this.treeRowMax){this.tree[j]=[];this.treeRowMax++;}
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
		for(p=0;p<pm;p++){this.tree[path[p].j][path[p].i].Good=aN.Kid[k].Good;}
	}
	this.treeColumnMax=Math.max(this.treeColumnMax,i+1);
	return aN.Good=this.computeGoodness(aN,good);
}
mxG.G.prototype.scrollTreeToShowFocus=function()
{
	let e,i,j,r,left,top,right,bottom,width,height,scrollLeft,scrollTop;
	if(!this.treeNodeOnFocus)return;
	e=this.tb;
	i=this.treeNodeOnFocus.iTree;
	j=this.treeNodeOnFocus.jTree;
	dd=this.scr.ddT;
	r=this.getTreeRatio();
	left=dd*i*r;
	top=dd*j*r;
	right=left+dd*r+1;
	bottom=top+dd*r+1;
	if(e.clientWidth===undefined)return;
	width=e.clientWidth;
	if(!width)return;
	if(e.clientHeight===undefined)return;
	height=e.clientHeight;
	if(!height)return;
	if(e.scrollLeft===undefined)return;
	scrollLeft=e.scrollLeft;
	if(e.scrollTop===undefined)return;
	scrollTop=e.scrollTop;
	if(left<scrollLeft)e.scrollLeft=left;
	else if((right-width)>scrollLeft)e.scrollLeft=right-width;
	if(top<scrollTop)e.scrollTop=top;
	else if((bottom-height)>scrollTop)e.scrollTop=bottom-height;
}
mxG.G.prototype.drawTree=function()
{
	let tc=this.tc;
	this.treeCheck=[];
	this.buildTreeBlocksContainer();
	tc.replaceChildren();
	for(let e of this.treeBlocks)tc.appendChild(e);
	this.scrollTreeToShowFocus();
}
mxG.G.prototype.disableTree=function()
{
	if(!this.tb.hasAttribute("data-maxigos-disabled"))
	{
		this.tb.setAttribute("data-maxigos-disabled","1");
		this.tb.setAttribute("tabindex","-1");
	}
}
mxG.G.prototype.enableTree=function()
{
	if(this.tb.hasAttribute("data-maxigos-disabled"))
	{
		this.tb.removeAttribute("data-maxigos-disabled");
		this.tb.setAttribute("tabindex","0");
	}
}
mxG.G.prototype.isTreeDisabled=function()
{
	return this.tb.hasAttribute("data-maxigos-disabled");
}
mxG.G.prototype.setTree=function()
{
	let k,km=this.rN.Kid.length,aN;
	this.tree=[];
	this.treeRowMax=0;
	this.treeColumnMax=0;
	for(k=0;k<km;k++)
	{
		aN=this.rN.Kid[k];
		while(this.kidOnFocus(aN))aN=this.kidOnFocus(aN);
		this.treeCurrentLast=aN;
		this.buildTree(this.rN.Kid[k],0,this.treeRowMax);
	}
	this.treeM=this.treeColumnMax;
	this.treeN=20;
	this.drawTree();
	this.treeNodeOnFocus=this.cN;
	this.hasToSetTree=0;
}
mxG.G.prototype.clearTreeBlock=function(k)
{
	let nv,gr,j,jo,jm;
	nv=Math.min(this.treeN,this.treeRowMax);
	gr=this.treeBlocks[k];
	if(gr.firstChild)
	{
		gr.replaceChildren();
		jo=k*nv;
		jm=jo+nv;
		for(j=jo;j<jm;j++)this.treeCheck[j]=0;
	}
}
mxG.G.prototype.updateTreeBlock=function(k)
{
	if(!this.treeBlocks[k].firstChild)this.scr.drawTreeBlock(k);
}
mxG.G.prototype.updateTreeEmphasis=function()
{
	let aN,i,j,e,em,treeNode,cx,cy,d,c,cls;
	if(this.treeNodeOnFocus==this.cN)return;
	if(this.treeNodeOnFocus)
	{
		aN=this.treeNodeOnFocus;
		i=aN.iTree;
		j=aN.jTree;
		e=this.getE("TreeEmphasis"+this.idt(i,j));
		if(e&&!this.hasEmphasis(aN))e.remove();
	}
	aN=this.cN;
	this.treeNodeOnFocus=aN;
	if(em=this.hasEmphasis(aN))
	{
		i=aN.iTree;
		j=aN.jTree;
		if(treeNode=this.getE("TreeNode"+this.idt(i,j)))
		{
			e=this.getE("TreeEmphasis"+this.idt(i,j));
			if(e)e.remove();
			d=this.scr.dT+2;
			if(treeNode.tagName.match(/circle/i))
			{
				cx=treeNode.getAttributeNS(null,"cx");
				cy=treeNode.getAttributeNS(null,"cy");
			}
			else
			{
				points=treeNode.getAttributeNS(null,"points");
				cx=parseFloat(points.replace(/^([0-9.]+).*$/,"$1"));
				cy=parseFloat(points.replace(/^[0-9.]+ ([0-9.]+).*$/,"$1"))+d*0.32;
			}
			c=this.getEmphasisColor(em);
			cls=this.getEmphasisClass(em);
			e=this.buildTreeEmphasis(cx,cy,d,c,cls);
			e.setAttribute("id",this.n+"TreeEmphasis"+this.idt(i,j));
			if(treeNodeShadow=this.getE("TreeNodeShadow"+this.idt(i,j)))
				treeNodeShadow.parentNode.insertBefore(e,treeNodeShadow);
			else treeNode.parentNode.insertBefore(e,treeNode);
		}
	}
}
mxG.G.prototype.doMagicTree=function(e)
{
	let k,km=e.length,nv,jo,jm,gr,z;
	nv=Math.min(this.treeN,this.treeRowMax);
	for(k=0;k<km;k++)
	{
		gr=e[k]['target'];
		z=gr.getAttribute("data-z");
		if(e[k]['isIntersecting'])this.updateTreeBlock(z);
		else this.clearTreeBlock(z);
	}
}
mxG.G.prototype.updateTree=function()
{
	if(this.hasToSetTree)this.setTree();
	else this.updateTreeEmphasis();
	this.scrollTreeToShowFocus();
	this.scr.setTreeTitleDesc((this.tb==document.activeElement)?1:0);
}
mxG.G.prototype.doFocusTree=function(ev)
{
	this.tb.setAttribute("aria-busy","false");
}
mxG.G.prototype.doBlurTree=function(ev)
{
	this.tb.setAttribute("aria-busy","true");
	this.scr.setTreeTitleDesc(0);
}
mxG.G.prototype.initTree=function()
{
	let k=this.k;
	this.tb=this.getE("TreeBox");
	this.tc=this.getE("TreeContent");
	this.tb.addEventListener("keydown",function(ev){mxG.D[k].doKeydownTree(ev);});
	this.tb.addEventListener("focus",function(ev){mxG.D[k].doFocusTree(ev);});
	this.tb.addEventListener("blur",function(ev){mxG.D[k].doBlurTree(ev);});
	this.tc.getMClick=mxG.getMClick;
	this.tc.addEventListener("click",function(ev){mxG.D[k].doClickTree(ev);});
	this.scr.initTree();
	this.hasToSetTree=1;
	this.treeObserver=new IntersectionObserver(function(e){mxG.D[k].doMagicTree(e);});
}
mxG.G.prototype.createTree=function()
{
	let a,b;
	this.hideTreeNumbering=this.setA("hideTreeNumbering",0,"bool");
	this.markCommentOnTree=this.setA("markCommentOnTree",0,"bool");
	this.goodnessCode={Good:1,Bad:2,Even:4,Warning:8,Unclear:16,OffPath:32,Focus:64};
	a=` tabindex="0" role="group" aria-live="assertive" aria-busy="true"`;
	b=` data-name="${this.local("Game tree")}"`;
	return `<div class="mxTreeBox" id="${this.n}TreeBox"${a+b}>`
	+`<div class="mxTreeContent" id="${this.n}TreeContent"></div></div>`;
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
mxG.B=[["Menu","File","View","Goban","Navigation","Variation"],[["Help","Sgf","Png","Svg","Score","Pass"],"Edit","Info","Tree","Version"],"AfterView"];
mxG.D[mxG.K]=new mxG.G(mxG.K,mxG.B);
mxG.D[mxG.K].theme="Minimalist";
mxG.D[mxG.K].config="Edit";
mxG.D[mxG.K].style=".mxMinimalistTheme{--gobanScale:1;--gobanMaxWidth:calc(1em * var(--gobanScale) * var(--gobanIntrinsicWidth,445) / 16);--navigationMaxWidth:calc(1em * 445 / 16);--columnMaxWidth:max(var(--gobanMaxWidth),var(--navigationMaxWidth));--border:1px solid #0007;--color:#000;--btnBk:#fff;--btnBorder:1px solid #0007;--btnColor:#000;--selectedBtnBk:#000;--selectedBtnBorder:1px solid #000;--selectedBtnColor:#fff;text-align:left;& button,& select,& textarea{-webkit-appearance:none;-moz-appearance:none;}& [disabled]{cursor:default;}& input[type=file]{visibility:hidden;position:fixed;}& [data-maxigos-disabled],& [disabled]{opacity:0.5;}& form,fieldset{border:0;margin:0;padding:0;}& svg{display:block;width:100%;height:100%;}&,& input,& select,& meter,& button{font-family:sans-serif;font-size:1em;}& p:first-of-type{margin-top:0;}&{max-width:var(--columnMaxWidth);margin:0 auto;}&.mxCommentConfig,&.mxEditConfig,&.mxLessonConfig,&.mxTreeConfig{max-width:calc(var(--columnMaxWidth) * 2 + 0.25em + 4px);display:flex;flex-wrap:wrap;justify-content:center;align-items:stretch;gap:0.25em;}&.mxCommentConfig>div,&.mxEditConfig>div,&.mxLessonConfig>div,&.mxTreeConfig>div{flex:1 1 calc(var(--columnMaxWidth) + 2px);max-width:min(100%,calc(var(--columnMaxWidth) + 2px));display:flex;flex-direction:column;}& .mxSgfParent,& .mxMenuBox{margin:0;padding:min(2.5vw,0.25em);text-align:center;}& .mxSgfParent>div{display:inline-block;margin:0.25em 0;padding:0;}& .mxSgfParent button,& .mxMenuBox button,& dialog button{box-sizing:border-box;margin:min(2.5vw,0.25em);padding:0 min(5vw,0.5em);min-height:1.75em;line-height:1.75em;}& .mxSgfParent button,& .mxMenuBox button{border:var(--btnBorder);background:var(--btnBk);color:var(--btnColor);}& dialog button{border:1px solid #777;background:#fff;color:#000;}& dialog button[value=\"FileInput\"]{min-height:1.75em;height:auto;}& .mxSgfParent button.mxSelectedBtn{background:var(--selectedBtnBk);border:var(--selectedBtnBorder);color:var(--selectedBtnColor);}& dialog,& dialog *{box-sizing:border-box;}& dialog::backdrop{background: #0007;}& dialog{max-width:calc(100% - 5vw);border:0;padding:0;}& dialog .mxContentFieldset{padding:min(2.5vw,0.5em);}& dialog.mxEditOptionsDialog .mxContentFieldset{line-height:1.5em;}& dialog .mxMenuFieldset{background:#eee;min-height:3em;line-height:3em;text-align:center;}& dialog label:not([for]){display:block;}& dialog input[type=text],& dialog select{border:var(--border);background:#fff;}& dialog select{text-align:center;}& dialog a{color:#000;}& dialog img{display:block;margin:0 auto;max-width:100%;height:auto;border:0;}& dialog textarea{display:block;width:100%;border:var(--border);}& .mxEditSgfDialog{min-width:min(80%,var(--gobanMaxWidth));}& .mxEditSgfDialog textarea{font-family:monospace;white-space:pre-wrap;min-height:min(50vh,var(--gobanMaxWidth));}&.mxCommentConfig .mxCommentBox,&.mxTreeConfig .mxCommentBox{box-sizing:border-box;border:var(--border);height:8em;overflow:auto;padding:0.25em;resize:vertical;}&.mxCommentConfig .mxCommentBox{flex:auto;}& .mxGobanBox{flex:auto;display:flex;flex-direction:column;}&.mxCommentConfig .mxGobanBox,&.mxEditConfig .mxGobanBox,&.mxLessonConfig .mxGobanBox,&.mxTreeConfig .mxGobanBox{box-sizing:border-box;border:var(--border);}& .mxGobanContent{max-width:var(--gobanMaxWidth);width:100%;margin:auto;}& meter{--meterGoodColor:#fff;--meterBadColor:#0007;display:block;margin:1em;padding:0;width:calc(100% - 2em);height:0.5em;border:var(--border);border-radius:0.25em;overflow:hidden;background:var(--meterBadColor);}& ::-webkit-meter-bar{width:100%;height:0.5em;border:0;border-radius:0;background:#0000;}& ::-webkit-meter-optimum-value{background:var(--meterGoodColor);}@supports selector(::-moz-meter-bar){& :-moz-meter-optimum::-moz-meter-bar{background:var(--meterGoodColor);}}&.mxGameConfig .mxHeaderBox,&.mxKifuConfig .mxHeaderBox,&.mxReplayConfig .mxHeaderBox{padding:0 2.5%;overflow:auto;}& .mxHeaderTitle{font-weight:bold;}& .mxNavigationBox:not(:empty){max-width:var(--navigationMaxWidth);width:100%;margin:0 auto;display:flex;justify-content:space-around;align-items:center;max-height:3em;}& .mxNavigationBox button{flex:1;max-height:3em;max-width:3em;margin:0;padding:0;border:0;background:none;}& .mxNavigationBox button svg{margin:20% auto;max-width:60%;}& .mxAutoBtn[disabled],& .mxPauseBtn[disabled]{display:none;}& .mxNotSeenBox:not(:empty){max-width:var(--gobanMaxWidth);margin:0.5em auto 0 auto;}& .mxSpeedBox [type=range]{--speedColor: #000;display:block;margin:0;padding:0 1em;width:calc(100% - 2em);height:2.5em;border:0;border-radius:0;background:#0000;-webkit-appearance:none;}& .mxSpeedBox [type=range]::-webkit-slider-runnable-track{box-sizing:border-box;height:0.5em;border:0;border-radius:0.25em;background:var(--speedColor);}& .mxSpeedBox [type=range]::-webkit-slider-thumb{-webkit-appearance:none;margin-top:-0.5em;box-sizing:border-box;width:1.5em;height:1.5em;border:0;border-radius:50%;background:var(--speedColor);}@supports selector(::-moz-range-track) and selector(::-moz-range-thumb){& .mxSpeedBox [type=range]::-moz-range-track{box-sizing:border-box;height:0.5em;border:0;border-radius:0.25em;background:var(--speedColor);}& .mxSpeedBox [type=range]::-moz-range-thumb{box-sizing:border-box;width:1.5em;height:1.5em;border:0;border-radius:50%;background:var(--speedColor);}}& .mxTreeBox{box-sizing:border-box;flex:auto;border:var(--border);height:7em;overflow:auto;resize:vertical;margin-top:0.25em;max-width:100%;}& .mxTreeContent{width:calc(1em * var(--treeIntrinsicWidth) / 16);}& .mxTreeBox svg{width:100%;height:auto;}& .mxVersionBox{text-align:center;min-height:3em;line-height:3em;}& .mxGobanSvg:not(:focus-visible){outline:0;}& .mxGobanSvg:not(:focus-visible) .mxFocus{display:none;}& .mxBtn:focus-visible{position:relative;z-index:10;}&:not(.mxDiagramConfig):not(.mxKifuConfig):not(.mxLoopConfig) .mxGobanBox svg,& button:not([disabled]),& input[type=\"range\"]:not([disabled]),& .mxTreeBox svg circle,& .mxTreeBox svg polygon,& .mxTreeBox svg rect,& .mxTreeBox svg text{cursor:pointer;}}";
mxG.D[mxG.K].style4Edit=".mxMinimalistTheme.mxEditConfig{--subBtnBk:var(--btnBk);--subBtnBorder:var(--border);--subBtnColor:var(--color);--toolBk:#0000;--toolBorder:var(--border);--toolColor:var(--color);--selectedToolBk:#0002;--selectedToolBorder:var(--border);--selectedToolColor:var(--color);--superSelectedToolBk:#0004;--superSelectedToolBorder:var(--border);--superSelectedToolColor:var(--color);--gobanMaxWidth:calc(1em * 511 / 16);max-width:calc(var(--gobanMaxWidth) * var(--gobanScale) * 2 + 0.25em + 4px);&>div{flex:1 1 calc(var(--gobanMaxWidth) * var(--gobanScale) + 2px);max-width:min(100%,calc(var(--gobanMaxWidth) * var(--gobanScale) + 2px));}& .mxGobanBox{margin:auto;width:100%;max-width:min(100%,calc(var(--gobanMaxWidth) * var(--gobanScale) + 2px));}&.mxIn3d .mxGobanBox{max-width:min(100%,calc(var(--gobanMaxWidth) * var(--gobanScale) * 491 / 511 + 2px));}&.mxIndicesOff .mxGobanBox{max-width:min(100%,calc(var(--gobanMaxWidth) * var(--gobanScale) * 463 / 511 + 2px));}&.mxIndicesOff.mxIn3d .mxGobanBox{max-width:min(100%,calc(var(--gobanMaxWidth) * var(--gobanScale) * 445 / 511 + 2px));}& .mxGobanContent{max-width:calc(var(--gobanMaxWidth) * var(--gobanScale) * var(--gobanIntrinsicWidth) / 511);}& .mxEditToolbar{display:grid;grid-template-columns:repeat(auto-fit,minmax(2.25em,1fr));gap:0.125em;}& .mxEditCommentTool{flex:initial;display:block;box-sizing:border-box;resize:vertical;height:7em;width:100%;background:transparent;margin:0.25em 0 0 0;border:var(--border);}& .mxMenuBox,& .mxMenuBox .mxSubMenu{list-style-type:none;}& .mxMenuBox{margin:0;padding:0.25em;}& .mxMenuBox>li{display:inline-block;text-align:left;margin:0;padding:0;}& .mxMenuBox .mxSubMenu{position:absolute;z-index:1;display:none;margin:0.125em 0 0 0;padding:0;}& .mxMenuBox .mxSubMenu li{margin:0;padding:0;}& .mxMenuBox .mxSubMenu.mxSubMenuOpen{display:flex;flex-flow:column;}& .mxMenuBox .mxSubMenu .mxBtn{border:var(--subBtnBorder);background:var(--subBtnBk);color:var(--subBtnColor);margin:0;width:100%;text-align:left;border-bottom:0;}& .mxMenuBox .mxSubMenu li:last-of-type button{border-bottom:var(--subBtnBorder);}& .mxMenuBox .mxSubMenu:has(.mxCochable,.mxCoched) button{padding-left:1.25em;}& .mxMenuBox .mxSubMenu .mxCoched:before{position:absolute;left:0.375em;content:\"\\2713\";}& .mxEditToolbar>*{display:block;box-sizing:border-box;padding:0.125em;background:var(--toolBk);border:var(--toolBorder);border-radius:0;}& .mxEditToolbar input{text-align:center;}& .mxEditToolbar>*{color:var(--toolColor);}& .mxEditToolbar button .mxFillable{fill:var(--toolColor);}& .mxEditToolbar button .mxStrokable{stroke:var(--toolColor);}&.mxIn2d .mxEditToolbar button circle.mxWhite{fill:#fff;stroke:var(--toolColor);}&.mxIn2d .mxEditToolbar button circle.mxBlack{fill:var(--toolColor);stroke:var(--toolColor);}&.mxIn2d .mxEditToolbar button circle.mxWhite+text{fill:var(--toolColor);}& .mxEditToolbar .mxSelectedEditTool{background:var(--selectedToolBk);border:var(--selectedToolBorder);color:var(--selectedToolColor);}& .mxEditToolbar .mxSelectedEditTool text{fill:var(--selectedToolColor);stroke:var(--selectedToolColor);}& .mxEditToolbar .mxSuperSelectedEditTool{background:var(--superSelectedToolBk);border:var(--superSelectedToolBorder);color:var(--superSelectedToolColor);}& .mxEditToolbar .mxSuperSelectedEditTool text{fill:var(--superSelectedToolColor);stroke:var(--superSelectedToolColor);}& dialog.mxShowHelpDialog{counter-reset:helpH2;}& dialog.mxShowHelpDialog h1{font-size:2em;}& dialog.mxShowHelpDialog h2{counter-reset:helpH3;}& dialog.mxShowHelpDialog h2:before{counter-increment:helpH2;content:counter(helpH2) \". \";}& dialog.mxShowHelpDialog h3:before{counter-increment:helpH3;content:counter(helpH2) \".\" counter(helpH3) \". \";}& dialog .mxFigureOrNotP+.mxTabNumberingP{padding-left:2em;}& dialog.mxEditInfoDialog{width:calc(var(--gobanMaxWidth) * 3 / 2);}& dialog.mxEditInfoDialog .mxContentFieldset{display:grid;gap:min(2.5px,0.5em);grid-template-columns:repeat(auto-fit,minmax(min(80%,9em),1fr));}& dialog.mxEditInfoDialog span,& dialog.mxEditInfoDialog span+input[type=text],& dialog.mxEditColorsDialog input[type=text],& dialog.mxEditThicknessDialog input[type=text],& dialog.mxSaveDialog input[type=text],& dialog.mxSendDialog input[type=text]{width:100%;display:block;}& dialog .mxResult,& dialog .mxGC,& dialog .mxGN{grid-column:1 / -1;}& dialog .mxResult{display:flex;flex-wrap:wrap;justify-content:space-between;gap:0.125em;}& dialog .mxResult .mxSC{white-space:nowrap;}}";
mxG.D[mxG.K].a.in3dOn=0;
mxG.D[mxG.K].a.allowStringAsSource=1;
mxG.D[mxG.K].a.allowFileAsSource=1;
mxG.D[mxG.K].a.initMethod="first";
mxG.D[mxG.K].a.stoneShadowOn=0;
mxG.D[mxG.K].a.stretching="0,0,1,1";
mxG.D[mxG.K].a.gridPadding=2;
mxG.D[mxG.K].a.gridMargin=0;
mxG.D[mxG.K].a.gobanPadding=0;
mxG.D[mxG.K].a.gobanMargin=2;
mxG.D[mxG.K].a.indicesOn=null;
mxG.D[mxG.K].a.numberingOn=null;
mxG.D[mxG.K].a.asInBookOn=null;
mxG.D[mxG.K].a.marksAndLabelsOn=1;
mxG.D[mxG.K].a.markOnLastOn=0;
mxG.D[mxG.K].a.numAsMarkOnLastOn=0;
mxG.D[mxG.K].a.japaneseIndicesOn=0;
mxG.D[mxG.K].a.oldJapaneseIndicesOn=0;
mxG.D[mxG.K].a.eraseGridUnder=1;
mxG.D[mxG.K].a.helpBtnOn=1;
mxG.D[mxG.K].a.pngBtnOn=1;
mxG.D[mxG.K].a.svgBtnOn=1;
mxG.D[mxG.K].a.infoBtnOn=0;
mxG.D[mxG.K].a.menus="File,Edit,View,Window";
mxG.D[mxG.K].a.passBtnOn=1;
mxG.D[mxG.K].a.scoreBtnOn=1;
mxG.D[mxG.K].a.toCharset="UTF-8";
mxG.D[mxG.K].a.sgfBtnOn=1;
mxG.D[mxG.K].a.sgfAction="edit";
mxG.D[mxG.K].a.variationMarksOn=0;
mxG.D[mxG.K].a.siblingsOn=0;
mxG.D[mxG.K].a.hideSingleVariationMarkOn=0;
mxG.D[mxG.K].a.variationBoxOn=0;
mxG.D[mxG.K].a.canPlaceVariation=0;
mxG.D[mxG.K].a.versionBoxOn=1;
mxG.D[mxG.K].start();
