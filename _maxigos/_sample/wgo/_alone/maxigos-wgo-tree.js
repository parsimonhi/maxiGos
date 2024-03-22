// maxiGos v8 WGo+Tree copyright 1998-2024 FM&SH, BSD license
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
if(!mxG.G.prototype.createCartouche)
{
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
	if (o.hasOwnProperty("opacity"))o2.opacity=o.opacity;
	if (o.hasOwnProperty("stoneShadowOn"))o2.stoneShadowOn=o.stoneShadowOn;
	if (o.hasOwnProperty("whiteStroke4Black"))o2.whiteStroke4Black=o.whiteStroke4Black;
	o.opacity=1;
	o.stoneShadowOn=0;
	o.whiteStroke4Black=1;
	s=this.makeStone(nat=="B"?"Black":"White",x,y,d/2,o);
	if (o2.hasOwnProperty("opacity"))o.opacity=o2.opacity;
	if (o2.hasOwnProperty("stoneShadowOn"))o.stoneShadowOn=o2.stoneShadowOn;
	if (o2.hasOwnProperty("whiteStroke4Black"))o.whiteStroke4Black=o2.whiteStroke4Black;
	return s;
}
mxG.S.prototype.makeBowl=function(nat,o)
{
	let s="",x,y,r,i,j,k,km,km2,dk,rk;
	dk=this.d;
	rk=dk/2;
	x=this.bowlW/2;
	y=(nat=="W")?this.bowlW/2:this.bowlW/2+this.capW;
	r=this.bowlW/2*0.9;
	r2=r-rk;
	s+=`<circle fill="${(nat=="B")?"#000":"#ccc"}" cx="${x}" cy="${y}" r="${r}"/>`;
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
	return s+`<circle fill="url(#${this.p.n+nat}BowlIn${o.in3dOn?3:2}dRG)" cx="${x}" cy="${y}" r="${r}"/>`;
}
mxG.S.prototype.updateBowlDesc=function(nat,n)
{
	let b=this.p.getE(nat+"BowlDesc"),oc=(nat=="B")?"White":"Black";
	b.innerHTML=this.p.local(oc+" prisoners")+" "+n;
}
mxG.S.prototype.makeCap=function(nat,n,o)
{
	let x,y,dy,r,c=(nat=="B")?"Black":"White";
	x=this.bowlW/2;
	y=(nat=="W")?this.bowlW+this.capW/2:this.capW/2;
	dy=this.capW*5/42;
	r=this.capW/2*0.95;
	return `<circle class="mxCap"`
	+` fill="url(#${this.p.n+nat}CapIn${o.in3dOn?3:2}dRG)"`
	+` cx="${x}" cy="${y}" r="${r}"/>`
	+`<text id="${this.p.n+c}PrisonersText" fill="${(nat=="B")?"#fff":"#000"}"`
	+` x="${x}" y="${y}" dy="${dy}">${n}</text>`;
}
mxG.S.prototype.makeBowlAndCap=function(nat,n,o)
{
	let s="",c=(nat=="B")?"Black":"White";
	this.bowlW=6*this.d;
	this.capW=this.bowlW*0.8;
	return `<svg`
	+` viewBox="0 0 ${this.bowlW} ${this.bowlW+this.capW}"`
	+` width="${this.bowlW}" height="${this.bowlW+this.capW}"`
	+` font-family="${this.ff}"`
	+` font-size="${this.capW/3}"`
	+` font-weight="${this.fw}"`
	+` text-anchor="middle"`
	+` aria-labelledby="${this.p.n+nat}BowlTitle ${this.p.n+nat}BowlDesc"`
	+` role="img"`
	+`>`
	+`<title id="${this.p.n+nat}BowlTitle">${this.p.local(c+" bowl")}</title>`
	+`<desc id="${this.p.n+nat}BowlDesc"></desc>`
	+`<defs>`
	+`<radialGradient id="${this.p.n+nat}BowlIn3dRG"`
	+` class="mx${nat}BowlRG"`
	+` cx="50%" cy="50%" r="50%">`
	+`<stop stop-color="#000" offset="0" stop-opacity="0"/>`
	+`<stop stop-color="#000" offset="0.7" stop-opacity="0"/>`
	+`<stop stop-color="#da7" offset="0.7"/>`
	+`<stop stop-color="#da7" offset="0.8"/>`
	+`<stop stop-color="#853" offset="0.85"/>`
	+`<stop stop-color="#964" offset="1"/>`
	+`</radialGradient>`
	+`<radialGradient id="${this.p.n+nat}BowlIn2dRG"`
	+` class="mx${nat}BowlRG"`
	+` cx="50%" cy="50%" r="50%">`
	+`<stop stop-color="#000" offset="0" stop-opacity="0"/>`
	+`<stop stop-color="#000" offset="0.7" stop-opacity="0"/>`
	+`<stop stop-color="#da7" offset="0.7"/>`
	+`<stop stop-color="#da7" offset="0.8"/>`
	+`<stop stop-color="#964" offset="0.8"/>`
	+`<stop stop-color="#964" offset="1"/>`
	+`</radialGradient>`
	+`<radialGradient id="${this.p.n+nat}CapIn3dRG"`
	+` class="mx${nat}CapRG"`
	+` cx="50%" cy="50%" r="50%">`
	+`<stop stop-color="#a74" offset="0"/>`
	+`<stop stop-color="#8f5430" offset="0.65"/>`
	+`<stop stop-color="#741" offset="0.7"/>`
	+`<stop stop-color="#741" offset="0.8"/>`
	+`<stop stop-color="#852" offset="0.85"/>`
	+`<stop stop-color="#964" offset="1"/>`
	+`</radialGradient>`
	+`<radialGradient id="${this.p.n+nat}CapIn2dRG"`
	+` class="mx${nat}CapRG"`
	+` cx="50%" cy="50%" r="50%">`
	+`<stop stop-color="#a74" offset="0"/>`
	+`<stop stop-color="#a74" offset="0.7"/>`
	+`<stop stop-color="#741" offset="0.7"/>`
	+`<stop stop-color="#741" offset="0.8"/>`
	+`<stop stop-color="#964" offset="0.8"/>`
	+`<stop stop-color="#964" offset="1"/>`
	+`</radialGradient>`
	+`</defs>`
	+`<g aria-hidden="true">`
	+this.makeBowl(nat,o)
	+this.makeCap(nat,n,o)
	+`</g>`
	+`</svg>`;
}
mxG.G.prototype.drawImagesInCartouche=function(c)
{
	let e,in3dOn,n,o;
	if(!this.scr.w)
	{
		let z=this.k;
		setTimeout(function(){mxG.D[z].drawImagesInCartouche(c);},100);
		return;
	}
	if(this.prisonersOn&&this.bowlOn)n=this.gor.getPrisoners(c[0]);
	if(this.in3dOn==this[c+"LastIn3dOn"])
	{
		if(this.prisonersOn&&this.bowlOn)
		{
			e=this.getE(c+"PrisonersText");
			if(e)e.textContent=n?n:"";
		}
		return;
	}
	if(this.shortHeaderOn)
	{
		e=this.getE(c+"PlayerStone");
		if(e)
		{
			o={in3dOn:this.in3dOn,stoneShadowOn:this.stoneShadowOn};
			o.title=(c[0]=="B")?this.local("Black"):this.local("White");
			o.role="img";
			e.innerHTML=this.scr.makeAloneStone(c[0],"",o);
		}
	}
	if(this.prisonersOn)
	{
		o={in3dOn:this.in3dOn,stoneShadowOn:this.stoneShadowOn};
		if(this.bowlOn)
		{
			let e=this.getE(c+"Bowl");
			e.innerHTML=this.scr.makeBowlAndCap(c[0],n?n:"",o);
			this.scr.updateBowlDesc(c[0],n);
		}
		else
		{
			let e=this.getE(c+"PrisonersStone");
			o.title=(c[0]=="W")?this.local("Black"):this.local("White");
			o.role="img";
			e.innerHTML=this.scr.makeAloneStone((c[0]=="W")?"B":"W","",o);
		}
	}
	this[c+"LastIn3dOn"]=this.in3dOn;
}
mxG.G.prototype.updateCartouche=function(c)
{
	let s,aPlayer,aRank;
	if(!this.cartoucheBoxOn)return;
	if(this.shortHeaderOn)
	{
		aPlayer=this.getInfo("P"+c[0]);
		if(!aPlayer)aPlayer=this.local(c);
		this.getE(c+"PlayerName").innerHTML=aPlayer;
		aRank=this.getInfo(c[0]+"R");
		this.getE(c+"PlayerRank").innerHTML=this.build("Rank",aRank);
	}
	if(!this.bowlOn&&this.prisonersOn)
		this.getE(c+"PrisonersNum").innerHTML=this.gor.getPrisoners(c[0]);
	if(this.shortHeaderOn||this.prisonersOn)this.drawImagesInCartouche(c);
}
mxG.G.prototype.updateWhiteCartouche=function()
{
	this.updateCartouche("White");
}
mxG.G.prototype.updateBlackCartouche=function()
{
	this.updateCartouche("Black");
}
mxG.G.prototype.createCartouche=function(c)
{
	let s="",n=this.n;
	this.cartoucheBoxOn=this.setA("cartoucheBoxOn",0,"bool");
	if(!this.cartoucheBoxOn)return s;
	this.shortHeaderOn=this.setA("shortHeaderOn",1,"bool");
	this.prisonersOn=this.setA("prisonersOn",1,"bool");
	this.bowlOn=this.setA("bowlOn",0,"bool");
	this[c+"LastIn3dOn"]=-1;
	function m(a,b){return ` class="mx${a}" id="${n+c+a}"`+b;}
	s+=`<div class="mxCartoucheBox mx${c}" id="${this.n+c}CartoucheBox">`;
	if(this.shortHeaderOn)
	{
		s+=`<div${m("ShortHeader","")}>`
		+`<span${m("PlayerStone","")}></span>`
		+`<span${m("PlayerName","")}></span>`
		+`<span`+m("PlayerRank",` data-label="${this.local("Rank")}"></span>`)
		+`</div>`;
	}
	if(this.prisonersOn)
	{
		if(this.bowlOn)s+="<div"+m("Bowl","")+"></div>";
		else
		{
			s+=`<div`+m("Prisoners",` data-label="${this.local("Caps")}">`)
			+`<span${m("PrisonersNum","")}>0</span>`
			+`<span${m("PrisonersStone","")}></span>`
			+`</div>`;
		}
	}
	s+="</div>";
	return s;
}
mxG.G.prototype.createWhiteCartouche=function()
{
	return this.createCartouche("White");
}
mxG.G.prototype.createBlackCartouche=function()
{
	return this.createCartouche("Black");
}
}
if(!mxG.G.prototype.createOptions)
{
mxG.fr(" from "," à partir de ");
mxG.fr(" with "," avec ");
mxG.fr("Animated stone","Pierres animées");
mxG.fr("Animated stone time","Temps pour l'animation des pierres");
mxG.fr("As in book","Comme dans les livres");
mxG.fr("Cancel","Annuler");
mxG.fr("In 3d","Affichage en 3d");
mxG.fr("Indices","Affichage des coordonnées");
mxG.fr("Loop time","Temps pour l'affichage en boucle");
mxG.fr("Marks and labels","Marques et étiquettes");
mxG.fr("Mark on last","Marque sur le dernier coup");
mxG.fr("Numbering","Numérotation");
mxG.fr("OK","OK");
mxG.fr("Options","Options");
mxG.fr("place a variation","place une variation");
mxG.fr("Show variations of current move instead of next move","Affichage des alternatives au coup courant au lieu des variations du coup suivant");
mxG.fr("try to guess the next move","essaie de deviner le coup suivant");
mxG.fr("Variation marks","Indication des variations");
mxG.fr("When clicking on the goban","Un click sur le goban");
mxG.G.prototype.getValidNum=function(v)
{
	let n=parseInt(v);
	if(isNaN(n))return 1;
	return n;
}
mxG.G.prototype.doChangeMarkOnLast=function()
{
	let e=this.getE("MarkOnLastOnCheckbox");
	this.markOnLastOn=e.checked?1:0;
	this.updateAll();
}
mxG.G.prototype.doChangeNumbering=function()
{
	let e=this.getE("NumberingOnCheckbox"),nf,nw;
	nf=this.getE("NumFromTextInput");
	nw=this.getE("NumWithTextInput");
	if(nf)nf.disabled=!e.checked;
	if(nw)nw.disabled=!e.checked;
	if(this.optionsBoxOn)
	{
		this.numberingOn=e.checked?1:0;
		this.configNumberingOn=this.numberingOn;
		if(this.hasC("Tree"))this.hasToSetTree=1;
		this.updateAll();
	}
}
mxG.G.prototype.doKeyupNumFrom=function()
{
	let e=this.getE("NumFromTextInput");
	this.numFrom=this.getValidNum(e.value);
	if(this.hasC("Tree"))this.hasToSetTree=1;
	this.updateAll();
}
mxG.G.prototype.doKeyupNumWith=function()
{
	let e=this.getE("NumWithTextInput");
	this.numWith=this.getValidNum(e.value);
	if(this.hasC("Tree"))this.hasToSetTree=1;
	this.updateAll();
}
mxG.G.prototype.doChangeMarksAndLabels=function()
{
	let e=this.getE("MarksAndLabelsOnCheckbox");
	this.marksAndLabelsOn=e.checked?1:0;
	this.updateAll();
}
mxG.G.prototype.doChangeAsInBook=function()
{
	let e=this.getE("AsInBookOnCheckbox");
	this.asInBookOn=e.checked?1:0;
	this.configAsInBookOn=this.asInBookOn;
	this.updateAll();
}
mxG.G.prototype.doChangeIndices=function()
{
	let e=this.getE("IndicesOnCheckbox");
	this.indicesOn=e.checked?1:0;
	this.configIndicesOn=this.indicesOn;
	this.updateAll();
}
mxG.G.prototype.doChangeVariationMarks=function()
{
	let e=this.getE("VariationMarksOnCheckbox");
	this.variationMarksOn=e.checked?1:0;
	this.configVariationMarksOn=this.variationMarksOn;
	this.styleMode=this.variationMarksOn?this.styleMode&~2:this.styleMode|2;
	this.updateAll();
}
mxG.G.prototype.doChangeSiblings=function()
{
	let e=this.getE("SiblingsOnCheckbox");
	this.siblingsOn=e.checked?1:0;
	this.configSiblingsOn=this.siblingsOn;
	this.styleMode=this.siblingsOn?this.styleMode|1:this.styleMode&~1;
	this.updateAll();
}
mxG.G.prototype.setIn3dClass=function()
{
	let e=this.getE("Global");
	e.className=e.className.replace((this.in3dOn?"mxIn2d":"mxIn3d"),(this.in3dOn?"mxIn3d":"mxIn2d"));
}
mxG.G.prototype.doChangeIn3d=function()
{
	let e=this.getE("In3dOnCheckbox");
	this.in3dOn=e.checked?1:0;
	this.setIn3dClass();
	this.updateAll();
}
mxG.G.prototype.doKeyupLoopTime=function()
{
	let e=this.getE("LoopTimeTextInput");
	this.loopTime=this.getValidNum(e.value);
	this.updateAll();
}
mxG.G.prototype.doChangeAnimatedStone=function()
{
	let e=this.getE("AnimatedStoneOnCheckbox");
	this.animatedStoneOn=e.checked?1:0;
	this.updateAll();
}
mxG.G.prototype.doKeyupAnimatedStoneTime=function()
{
	let e=this.getE("AnimatedStoneTextInput");
	this.animatedStoneTime=this.getValidNum(e.value);
	this.updateAll();
}
mxG.G.prototype.doChangeCan=function()
{
	let e;
	e=this.getE("CanVariationRadio");
	this.canPlaceVariation=e.checked?1:0;
	e=this.getE("CanGuessRadio");
	this.canPlaceGuess=e.checked?1:0;
	this.updateAll();
}
mxG.G.prototype.doChangeScoreMethod=function(m)
{
	let e,z=null;
	if(e=this.getE("TrivialScoreMethodRadio"))if(e.checked)z="trivial";	
	if(e=this.getE("CountingScoreMethodRadio"))if(e.checked)z="counting";	
	if(e=this.getE("PropagateScoreMethodRadio"))if(e.checked)z="propagate";	
	if(e=this.getE("EstimateScoreMethodRadio"))if(e.checked)z="estimate";
	if(z)this.scoreMethod=z;
	this.updateAll();
}
mxG.G.prototype.doOptionsOK=function()
{
	let e;
	if(e=this.getE("MarkOnLastOnCheckbox"))this.markOnLastOn=e.checked?1:0;
	if(e=this.getE("NumberingOnCheckbox")){this.numberingOn=e.checked?1:0;this.configNumberingOn=this.numberingOn;if(this.hasC("Tree"))this.hasToSetTree=1;}
	if(e=this.getE("NumFromTextInput")){this.numFrom=this.getValidNum(e.value);if(this.hasC("Tree"))this.hasToSetTree=1;}
	if(e=this.getE("NumWithTextInput")){this.numWith=this.getValidNum(e.value);if(this.hasC("Tree"))this.hasToSetTree=1;}
	if(e=this.getE("MarksAndLabelsOnCheckbox"))this.marksAndLabelsOn=e.checked?1:0;
	if(e=this.getE("AsInBookOnCheckbox")){this.asInBookOn=e.checked?1:0;this.configAsInBookOn=this.asInBookOn;}
	if(e=this.getE("IndicesOnCheckbox")){this.indicesOn=e.checked?1:0;this.configIndicesOn=this.indicesOn;}
	if(e=this.getE("VariationMarksOnCheckbox")){this.variationMarksOn=e.checked?1:0;this.configVariationMarksOn=this.variationMarksOn;this.styleMode=this.variationMarksOn?this.styleMode&~2:this.styleMode|2;}
	if(e=this.getE("SiblingsOnCheckbox")){this.siblingsOn=e.checked?1:0;this.configSiblingsOn=this.siblingsOn;this.styleMode=this.siblingsOn?this.styleMode|1:this.styleMode&~1;}
	if(e=this.getE("In3dOnCheckbox")){this.in3dOn=e.checked?1:0;this.setIn3dClass();if(this.hasC("Tree"))this.hasToSetTree=1;}
	if(e=this.getE("CanVariationRadio")){this.canPlaceVariation=e.checked?1:0;this.hasToSetGoban=1;}
	if(e=this.getE("CanGuessRadio")){this.canPlaceGuess=e.checked?1:0;this.hasToSetGoban=1;}
	if(e=this.getE("LoopTimeTextInput"))this.loopTime=this.getValidNum(e.value);
	if(e=this.getE("AnimatedStoneOnCheckbox"))this.animatedStoneOn=e.checked?1:0;
	if(e=this.getE("AnimatedStoneTimeTextInput"))this.animatedStoneTime=this.getValidNum(e.value);
	if(this.hasC("Score"))
	{
		let z="";
		if((e=this.getE("TrivialScoreMethodRadio"))&&e.checked)z="trivial";	
		else if((e=this.getE("CountingScoreMethodRadio"))&&e.checked)z="counting";	
		else if((e=this.getE("PropagateScoreMethodRadio"))&&e.checked)z="propagate";	
		else if((e=this.getE("EstimateScoreMethodRadio"))&&e.checked)z="estimate";
		if(z)this.scoreMethod=z;
	}
	this.updateAll();
}
mxG.G.prototype.buildOptions=function()
{
	let s=``,a=``;
	if(!this.optionsBoxOn)s+=`<h1 tabindex="0">${this.local("Options")}</h1>`;
	if(!this.hideMarkOnLastOn)
	{
		a+=`<label><input type="checkbox"`;
		if(this.optionsBoxOn)a+=` onchange="${this.g}.doChangeMarkOnLast()"`;
		a+=` id="${this.n}MarkOnLastOnCheckbox">${this.local("Mark on last")}</label>`;
	}
	if(!this.hideNumberingOn)
	{
		a+=`<label><input type="checkbox"`
		+` class="mxNumberingOnCheckbox"`
		+` onchange="${this.g}.doChangeNumbering()"`
		+` id="${this.n}NumberingOnCheckbox">`
		+this.local("Numbering")
		+` <span class="mxNumFromText">`
		+(mxG.Z[this.lang]["•"]
			?``
			:`<label for="${this.n}NumFromTextInput">${this.local(" from ")}</label>`)
		+` <input type="text" id="{this.n}NumFromTextInput" size="3" maxlength="3" `
		+(this.optionsBoxOn?`onkeyup="${this.g}.doKeyupNumFrom()">`:`>`)
		+`</span>`
		+` <span class="mxNumWithText">`
		+(mxG.Z[this.lang]["•"]
			?`<label for="${this.n}NumFromTextInput">${this.local(" from ")}</label>`
			:`<label for="${this.n}NumWithTextInput">${this.local(" with ")}</label>`)
		+` <input type="text" id="${this.n}NumWithTextInput" size="3" maxlength="3" `
		+(this.optionsBoxOn?`onkeyup="${this.g}.doKeyupNumWith()">`:`>`)
		+(mxG.Z[this.lang]["•"]
			?`<label for="${this.n}NumWithTextInput">${this.local(" with ")}</label>`
			:``)
		+`</span>`
		+`</label>`;
	}
	if(!this.hideMarksAndLabelsOn)
	{
		a+=`<label><input type="checkbox"`;
		if(this.optionsBoxOn)a+=` onchange="${this.g}.doChangeMarksAndLabels()"`;
		a+=` id="${this.n}MarksAndLabelsOnCheckbox">${this.local("Marks and labels")}</label>`;
	}
	if(!this.hideAsInBookOn)
	{
		a+=`<label><input type="checkbox"`;
		if(this.optionsBoxOn)a+=` onchange="${this.g}.doChangeAsInBook()"`;
		a+=` id="${this.n}AsInBookOnCheckbox">${this.local("As in book")}</label>`;
	}
	if(!this.hideIndicesOn)
	{
		a+=`<label><input type="checkbox"`;
		if(this.optionsBoxOn)a+=` onchange="${this.g}.doChangeIndices()"`;
		a+=` id="${this.n}IndicesOnCheckbox">${this.local("Indices")}</label>`;
	}
	if(this.hasC("Variation")&&!this.hideVariationMarksOn)
	{
		a+=`<label><input type="checkbox"`;
		if(this.optionsBoxOn)a+=` onchange="${this.g}.doChangeVariationMarks()"`;
		a+=` id="${this.n}VariationMarksOnCheckbox">${this.local("Variation marks")}</label>`;
	}
	if(this.hasC("Variation")&&!this.hideSiblingsOn)
	{
		a+=`<label><input type="checkbox"`;
		if(this.optionsBoxOn)a+=` onchange="${this.g}.doChangeSiblings()"`;
		a+=` id="${this.n}SiblingsOnCheckbox">${this.local("Show variations of current move instead of next move")}</label>`;
	}
	if(!this.hideIn3dOn)
	{
		a+=`<label><input type="checkbox"`;
		if(this.optionsBoxOn)a+=` onchange="${this.g}.doChangeIn3d()"`;
		a+=` id="${this.n}In3dOnCheckbox">${this.local("In 3d")}</label>`;
	}
	if(a)s+=`<p>${a}</p>`;
	if((this.hasC("Variation")&&!this.hideCanVariation)
		&&(this.hasC("Guess")&&!this.hideCanGuess))
	{
		s+=`<p>${this.local("When clicking on the goban")}\n`;
		if(this.hasC("Variation")&&!this.hideCanVariation)
		{
			s+=`<label><input name="${this.n}ChangeCanRadio" value="1" type="radio"`;
			if(this.optionsBoxOn)s+=` onchange="${this.g}.doChangeCan()"`;
			s+=` id="${this.n}CanVariationRadio">${this.local("place a variation")}</label>`;
		}
		if(this.hasC("Guess")&&!this.hideCanGuess)
		{
			s+=`<label><input name="${this.n}ChangeCanRadio" value="2" type="radio"`;
			if(this.optionsBoxOn)s+=` onchange="${this.g}.doChangeCan()"`;
			s+=` id="${this.n}CanGuessRadio">${this.local("try to guess the next move")}</label>`;
		}
		s+=`</p>`;
	}
	a=``;
	if(this.hasC("Loop")&&!this.hideLoopTime)
	{
		a+=`<label>${this.local("Loop time")} <input type="text" size="9" maxlength="9"`;
		if(this.optionsBoxOn)a+=` onkeyup="${this.g}.doKeyupLoopTime()"`;
		a+=` id="${this.n}LoopTimeTextInput"></label>`;
	}
	if(this.hasC("AnimatedStone")&&!this.hideAnimatedStoneOn)
	{
		a+=`<label><input type="checkbox"`;
		if(this.optionsBoxOn)a+=` onchange="${this.g}.doChangeAnimatedStone()"`;
		a+=` id="${this.n}AnimatedStoneOnCheckbox">${this.local("Animated stone")}</label>`;
	}
	if(this.hasC("AnimatedStone")&&!this.hideAnimatedStoneTime)
	{
		a+=`<label>${this.local("Animated stone time")} <input type="text" size="9" maxlength="9" `;
		if(this.optionsBoxOn)a+=` onkeyup="${this.g}.doKeyupAnimatedStoneTime()"`;
		a+=` id="${this.n}AnimatedStoneTimeTextInput"></label>`;
	}
	if(a)s+=`<p>${a}</p>`;
	if(this.hasC("Score")&&!this.hideScoreMethod)
	{
		s+=`<p>${this.local("Score method")}`
		+`<label><input name="${this.n}ChangeScoreMethodRadio" value="1" type="radio"`;
		if(this.optionsBoxOn)s+=` onchange="${this.g}.doChangeScoreMethod()"`;
		s+=` id="${this.n}TrivialScoreMethodRadio">${this.local("trivial")}</label>`
		+`<label><input name="${this.n}ChangeScoreMethodRadio" value="2" type="radio"`;
		if(this.optionsBoxOn)s+=` onchange="${this.g}.doChangeScoreMethod()"`;
		s+=` id="${this.n}CountingScoreMethodRadio">${this.local("counting")}</label>`
		+`<label><input name="${this.n}ChangeScoreMethodRadio" value="3" type="radio"`;
		if(this.optionsBoxOn)s+=` onchange="${this.g}.doChangeScoreMethod()"`;
		s+=` id="${this.n}PropagateScoreMethodRadio">${this.local("propagate")}</label>`
		+`<label><input name="${this.n}ChangeScoreMethodRadio" value="4" type="radio"`;
		if(this.optionsBoxOn)s+=` onchange="${this.g}.doChangeScoreMethod()"`;
		s+=` id="${this.n}EstimateScoreMethodRadio">${this.local("estimate")}</label>`
		+`</p>`;
	}
	return s;
}
mxG.G.prototype.setInputOptions=function()
{
	let e;
	if(e=this.getE("MarkOnLastOnCheckbox"))e.checked=(this.markOnLastOn==1);
	if(e=this.getE("NumberingOnCheckbox"))e.checked=(this.numberingOn>=1);
	if(e=this.getE("NumFromTextInput")){e.value=this.numFrom;e.disabled=!this.numberingOn;}
	if(e=this.getE("NumWithTextInput")){e.value=this.numWith;e.disabled=!this.numberingOn;}
	if(e=this.getE("MarksAndLabelsOnCheckbox"))e.checked=(this.marksAndLabelsOn==1);
	if(e=this.getE("AsInBookOnCheckbox"))e.checked=(this.asInBookOn==1);
	if(e=this.getE("IndicesOnCheckbox"))e.checked=(this.indicesOn==1);
	if(e=this.getE("VariationMarksOnCheckbox"))e.checked=(this.variationMarksOn==1);
	if(e=this.getE("SiblingsOnCheckbox"))e.checked=(this.siblingsOn==1);
	if(e=this.getE("In3dOnCheckbox"))e.checked=(this.in3dOn==1);
	if((e=this.getE("CanVariationRadio"))&&(this.canPlaceVariation==1))e.checked=true;
	if((e=this.getE("CanGuessRadio"))&&(this.canPlaceGuess==1))e.checked=true;
	if((e=this.getE("TrivialScoreMethodRadio"))&&(this.scoreMethod=="trivial"))
		e.checked=true;
	if((e=this.getE("CountingScoreMethodRadio"))&&(this.scoreMethod=="counting"))
		e.checked=true;
	if((e=this.getE("PropagateScoreMethodRadio"))&&(this.scoreMethod=="propagate"))
		e.checked=true;
	if((e=this.getE("EstimateScoreMethodRadio"))&&(this.scoreMethod=="estimate"))
		e.checked=true;
	if(e=this.getE("LoopTimeTextInput"))e.value=this.loopTime;
	if(e=this.getE("AnimatedStoneOnCheckbox"))
		e.checked=(this.animatedStoneOn==1);
	if(e=this.getE("AnimatedStoneTimeTextInput"))
		e.value=(this.animatedStoneTime?this.animatedStoneTime:this.loopTime?this.loopTime:1000);
}
mxG.G.prototype.doOptions=function()
{
	let btns=[{n:"OK",a:"Options"},{n:"Cancel"}];
	this.doDialog("EditOptions",this.buildOptions(),btns);
	this.setInputOptions();
}
mxG.G.prototype.updateOptions=function()
{
	if(this.optionsBoxOn)
	{
		let e=this.getE("LoopTimeTextInput");
		if(e)e.disabled=this.inLoop?true:false;
	}
	if(this.optionsBoxOn)this.setInputOptions();
}
mxG.G.prototype.initOptions=function()
{
	if(this.optionsBtnOn)this.addBtnClickListener("Options");
}
mxG.G.prototype.createOptions=function()
{
	this.optionsBoxOn=this.setA("optionsBoxOn",0,"bool");
	this.optionsBtnOn=this.setA("optionsBtnOn",0,"bool");
	this.optionsAlias=this.setA("optionsAlias",null,"string");
	this.hideInOptions=this.setA("hideInOptions",new Set(),"set");
	for(let k of this.hideInOptions)if(k.match(/[A-Za-z0-9]+/))this["hide"+k]=1;
	if(this.optionsBoxOn)
	{
		this.optionsBtnOn=0;
		return `<div class="mxOptionsBox" id="{this.n}OptionsBox">${this.buildOptions()}</div>`;
	}
	return this.optionsBtnOn?this.createBtn("Options"):``;
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
	let a,b,c,d,e,s;
	a=`<a href="https:/`+`/jeudego.org/maxiGos">maxiGos</a>`;
	b=this.theme;
	c=this.config;
	d=`<a href="https:/`+`/opensource.org/licenses/BSD-3-Clause">BSD</a>`;
	e=`1998-${mxG.Y} ${mxG.C}`;
	s=`<h1 tabindex="0">maxiGos ${mxG.V}</h1>`
	+`<p>${this.local("Source code:")} ${this.alias(a,"aboutSourceCodeAlias")}</p>`
	+`<p>${this.local("Theme:")} ${this.alias(b,"aboutThemeAlias")}</p>`
	+`<p>${this.local("Configuration:")} ${this.alias(c,"aboutConfigAlias")}</p>`
	+`<p>${this.local("License:")} ${this.alias(d,"aboutLicenseAlias")}</p>`
	+`<p>${this.local("Copyright")} ${this.alias(e,"aboutCopyrightAlias")}</p>`;
	return s;
}
mxG.G.prototype.doAbout=function()
{
	this.doDialog("ShowAbout",this.buildAbout(),[{n:" Close "}]);
}
mxG.G.prototype.initAbout=function()
{
	if(this.aboutBtnOn)this.addBtnClickListener("About");
}
mxG.G.prototype.createAbout=function()
{
	this.aboutBtnOn=this.setA("aboutBtnOn",0,"bool");
	this.aboutAlias=this.setA("aboutAlias",null,"string");
	this.aboutSourceCodeAlias=this.setA("aboutSourceCodeAlias",null,"string");
	this.aboutThemeAlias=this.setA("aboutThemeAlias",null,"string");
	this.aboutConfigAlias=this.setA("aboutConfigAlias",null,"string");
	this.aboutLicenseAlias=this.setA("aboutLicenseAlias",null,"string");
	this.aboutCopyrightAlias=this.setA("aboutCopyrightAlias",null,"string");
	return this.aboutBtnOn?this.createBtn("About"):"";
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
if(!mxG.G.prototype.createComment)
{
mxG.fr("Comments","Commentaire");
mxG.fr("No comment!","Sans commentaire !");
mxG.fr("buildMove",k=>"Coup "+k);
mxG.en("buildMove",k=>"Move "+k);
mxG.G.prototype.getCoreComment=function(aN)
{
	return aN.P.C?aN.P.C[0].noT():"";
}
mxG.G.prototype.getOneComment=function(aN)
{
	let c;
	if(this.hasC("Score")&&this.scoreInComment&&this.canPlaceScore)c=this.buildScore();
	else
	{
		c=this.getCoreComment(aN).replace(/^\s+/,"");
		if(c)c="<p>"+c.replace(/\n/g,"<br>")+"</p>";
		if(this.hasC("Header")&&this.headerInComment&&(aN.Dad==this.rN)) c=this.buildHeader()+c;
	}
	return c;
}
mxG.G.prototype.getComment=function()
{
	let aN=this.cN,s="";
	if(this.allInComment)
	{
		let bN=this.rN,c,k=0;
		while(bN=this.kidOnFocus(bN))
		{
			if(bN.P.B||bN.P.W){k++;if((bN.P.B&&bN.Dad.P.B)||(bN.P.W&&bN.Dad.P.W))k++;}
			else if(bN.P.AB||bN.P.AW||bN.P.AE)k=0;
			if(c=this.getOneComment(bN))
			{
				if(k)s+=`<span class="mxMoveNumber">${this.build("Move",k)} </span>`;
				s+=c;
			}
			if(bN==aN)break;
		}
	}
	else s=this.getOneComment(aN);
	return s;
}
mxG.G.prototype.doKeydownComment=function(ev)
{
	let r;
	if(ev.metaKey||ev.ctrlKey||ev.altKey)return;
	if(ev.key.match(/^[bitv]$/i))this.doAlphaKeydown(ev);
}
mxG.G.prototype.updateComment=function()
{
	if(this.hasC("Solve")&&this.canPlaceSolve)return;
	let e=this.getE("CommentBox");
	if(this.cN.P.BM)e.className="mxCommentBox mxBM";
	else if(this.cN.P.DO)e.className="mxCommentBox mxDO";
	else if(this.cN.P.IT)e.className="mxCommentBox mxIT";
	else if(this.cN.P.TE)e.className="mxCommentBox mxTE";
	else e.className="mxCommentBox";
	this.getE("CommentContent").innerHTML=this.getComment();
}
mxG.G.prototype.initComment=function()
{
	let k=this.k;
	this.getE("CommentBox").addEventListener("keydown",function(ev){
		mxG.D[k].doKeydownComment(ev);});
}
mxG.G.prototype.createComment=function()
{
	let s,a,b;
	this.headerInComment=this.setA("headerInComment",0,"bool");
	this.allInComment=this.setA("allInComment",0,"bool");
	a=` tabindex="0"`;
	b=` data-name="${this.local("Comments")}"`;
	s=`<div class="mxCommentBox" id="${this.n}CommentBox"${a+b}>`;
	a=` role="group" aria-live="off"`;
	return s+`<div class="mxCommentContent" id="${this.n}CommentContent"${a}></div></div>`;
}
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
mxG.fr("no result","sans résultat");
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
mxG.fr("AGA","américaine ou française");
mxG.fr(" move"," coup");
mxG.fr(" moves"," coups");
mxG.fr("Number of moves","Nombre de coups");
mxG.fr("translateTitle",(ev,ro)=>
{
	let s=ev+"",a=ro+"",c="",o="",t="",between="";
	if(a!="")
	{
		if(a.search(/^([0-9]+)$/)==0)t="ronde";
		else if(a.search(/[ ]*\((final|semi-final|quarter-final|playoff|game|round)\)/i)>=0)
		{
			if(s.search(/[ ]+(cup|league)/i)>=0)o=" de la ";else if(s)o=" du ";
			if(a.search(/[ ]*\(final\)/i)>=0){c="Finale"+o;t="partie";}
			else if(a.search(/[ ]*\(semi-final\)/i)>=0){c="Demi-finale"+o;t="partie";}
			else if(a.search(/[ ]*\(quarter-final\)/i)>=0){c="Quart de finale"+o;t="partie";}
			else if(a.search(/[ ]*\(playoff\)/i)>=0){c="Playoff"+o;t="partie";}
			else if(a.search(/[ ]*\(game\)/i)>=0)t="partie";
			else t="tour";
			a=a.replace(/[ ]*\((final|semi-final|quarter-final|playoff|game|round)\)/i,"");
		}
		else if(a.search(/[ ]*\(final tournament\)/i)>=0)
		{
			if(s.search(/[ ]+(cup|league)/i)>=0)o=" de la ";else if(s)o=" du ";
			c="Tournoi final"+o;t="ronde";
			a=a.replace(/[ ]*\(final tournament\)/i,"");
		}
		if(a.search(/^([0-9]+)/)==0)a=a.replace(/^([0-9]+)(.*)/,t+(t?" ":"")+"$1$2");
	}
	if(s.search(/^([0-9]+)(st|nd|rd|th)/i)>=0)
	{
		s=s.replace(/^([0-9]+)(st|nd|rd|th)[ ]+Female[ ]+(.*)$/i,"$1$2 $3 féminin");
		s=s.replace(/^([0-9]+)(st|nd|rd|th)[ ]+(Former|Old)[ ]+(.*)$/i,"$1$2 ancien $4");
		s=s.replace(/^([0-9]+)(st|nd|rd|th)/i,`$1<span class="sup">e</span>`);
		s=s.replace(`1<span class="sup">e</span>`,(s.search(/[ ]+(cup|league)/i)>=0)?`1<span class="sup">re</span>`:`1<span class="sup">er</span>`);
	}
	s=c+s;
	if(s&&(a.search(/^[a-zA-Z0-9]/)==0))s+=", ";else if(s&&a)s+=" ";
	if(s)s=s.ucF();else if(a)a=a.ucF();
	return s+a;
});
mxG.en("translateTitle",(ev,ro)=>
{
	let s=ev+"",a=ro+"",c="",t="",before="",between="";
	if(a!="")
	{
		if(a.search(/^([0-9]+)$/)==0)t="round";
		if(a.search(/[ ]*\((final|semi-final|quarter-final|playoff|game|round)\)/i)>=0)
		{
			if(s)before=", ";
			if(a.search(/[ ]*\(final\)/i)>=0){c=before+"final";t="game";}
			else if(a.search(/[ ]*\(semi-final\)/i)>=0){c=before+"semi-final";t="game";}
			else if(a.search(/[ ]*\(quarter-final\)/i)>=0){c=before+"quarter-final";t="game";}
			else if(a.search(/[ ]*\(playoff\)/i)>=0){c=before+"playoff";t="game";}
			else if(a.search(/[ ]*\(game\)/i)>=0)t="game";
			else t="round";
			a=a.replace(/[ ]*\((final|semi-final|quarter-final|playoff|game|round)\)/i,"");
		}
		else if(a.search(/[ ]*\(final tournament\)/i)>=0)
		{
			if(s)before=", ";
			c=before+"final tournament";t="round";
			a=a.replace(/[ ]*\(final tournament\)/i,"");
		}
		if(a.search(/^([0-9]+)/)==0)a=a.replace(/^([0-9]+)(.*)/,t+(t?" ":"")+"$1$2");
	}
	s=s+c;
	if(s&&(a.search(/^\(/)==0))between=" ";else if(s&&a)between=", ";
	s=s+between+a;
	return s.ucF();
});
mxG.fr("buildMonth",(a)=>
{
	let m=["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
	return m[a-1];
});
mxG.fr("buildDay",(a)=>
{
	if(a=="01")return `1<span class="sup">er</span>`;
	return a.replace(/,([0-9]{2})/g,"-$1").replace(/0([1-9])/g,"$1");
});
mxG.fr("buildDate2",(s)=>
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
mxG.fr("buildDate",(s)=>
{
	let r,y,m,reg=/(^\s*([0-9]{4})(-([^\.]*))*)(\.)?(.*)\s*$/g,k,km,z;
	if(s.indexOf("~")>=0)
	{
		r=s.split("~");
		km=r.length;
		z=mxG.Z.fr["buildDate"](r[0]);
		for(k=1;k<km;k++)z+=" ~ "+mxG.Z.fr["buildDate"](r[k]);
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
	if(this.translateTitleOn)f="translateTitle";else f="buildTitle";
	if(mxG.Z[this.lang]&&mxG.Z[this.lang][f])return mxG.Z[this.lang][f](ev,ro);
	return ev+((ev&&ro)?this.local(", "):"")+ro;
}
mxG.G.prototype.buildRules=function(a)
{
	return this.local(a.ucF());
}
mxG.G.prototype.buildTimeLimits=function(a)
{
	if(a.match(/^[0-9]+$/g))
	{
		let r="",t,h,mn,s;
		t=parseInt(a);
		h=Math.floor(t/3600);
		if(h)r+=h+this.local("h");
		mn=Math.floor((t-h*3600)/60);
		if(mn)r+=(r?this.local(" "):"")+mn+this.local("mn");
		s=t-h*3600-mn*60;
		if(s)r+=(r?this.local(" "):"")+s+this.local("s");
		return r+this.local(" per player");
	}
	return a;
}
mxG.G.prototype.buildKomi=function(k)
{
	let a=k+"",b;
	if(a.search(/^([0-9]+([,\.]([0-9]+)?)?)?$/)==0)
	{
		b=parseFloat(a.replace(",","."));
		if(b==0)return this.local("none");
		if((b>-2)&&(b<2))b+=this.local(" point");
		else b+=this.local(" points");
		return (b+"").replace(".",this.local("."));
	}
	return a;
}
mxG.G.prototype.buildResult=function(a)
{
	let b="";
	if(a.substring(0,1)=="B")b=this.local("Black");
	else if(a.substring(0,1)=="W")b=this.local("White");
	else if(a.substring(0,1)=="V")return this.local("no result");
	else if(a.substring(0,1)=="D")return this.local("draw");
	else if(a.substring(0,1)=="0")return this.local("draw");
	else if(a.substring(0,1)=="?")return this.local("unknown result");
	else return a;
	b+=this.local(" wins");
	if(a.substring(1,2)=="+")
	{
		if(a.substring(2,3)=="R")b+=this.local(" by resign");
		else if(a.substring(2,3)=="T")b+=this.local(" by time");
		else if(a.substring(2,3)=="F")b+=this.local(" by forfeit");
		else if(a.length>2)
		{
			let c=parseFloat(a.substring(2).replace(",","."));
			b+=this.local(" by ")+c;
			if((c>-2)&&(c<2))b+=this.local(" point");else b+=this.local(" points");
			b=b.replace(".",this.local("."));
		}
	}
	return b;
}
mxG.G.prototype.buildNumOfMoves=function(k)
{
	return k+((k<2)?this.local(" move"):this.local(" moves"));
}
mxG.G.prototype.getNumOfMoves=function()
{
	let aN=this.rN,n=0,p=0,ex="E",v;
	while(this.kidOnFocus(aN))
	{
		aN=aN.Kid[0];
		if(aN.P.B||aN.P.W)
		{
			n++;
			if(aN.P.B)v=aN.P.B[0];else v=aN.P.W[0];
			if(v)p=0;else p++;
			if((aN.P.B&&(ex=="B"))||(aN.P.W&&(ex=="W"))){n++;if(p)p++;}
		}
		else if(aN.P.AB||aN.P.AW||aN.P.AE)ex="E";
	}
	return n-p;
}
mxG.G.prototype.buildHeader=function(u=0)
{
	let a="",t="",h="",g="",b,c,d,r,z=0;
	if(!this.hideTitle)
	{
		t=this.buildTitle();
		if(this.concatDateToTitle&&(a=this.getInfo("DT")))t+=(t?" (":"")+this.build("Date",a)+(t?")":"");
	}
	if(t)
	{
		if(u)t=`<h1 tabindex="0">${t}</h1>`;
		else t=`<p class="mxHeaderTitle">${t}</p>`;
	}
	a=(this.hideBlack)?0:this.getInfo("PB");
	if(a)
	{
		h+=`<span>${this.local("Black")+this.local(": ")}</span>`+a;
		a=this.getInfo("BR");
		if(a)h+=this.local(" ")+this.build("Rank",a);
		if(b=this.getInfo("BT"))h+=(a?" (":"")+b+(a?")":"");
		z=1;
	}
	a=(this.hideWhite)?0:this.getInfo("PW");
	if(a)
	{
		if(z)h+="<br>";
		h+=`<span>${this.local("White")+this.local(": ")}</span>`+a;
		a=this.getInfo("WR");
		if(a)h+=this.local(" ")+this.build("Rank",a);
		if(b=this.getInfo("WT"))h+=(a?" (":"")+b+(a?")":"");
		z=1;
	}
	if(this.hideDate)a="";else a=this.getInfo("DT");
	if(a&&!this.concatDateToTitle)
	{
		if(z)h+="<br>";
		h+=`<span>${this.local("Date")+this.local(": ")}</span>`+this.build("Date",a);
		z=1;
	}
	if(this.hidePlace)a="";else a=this.getInfo("PC");
	if(a)
	{
		if(z)h+="<br>";
		h+=`<span>${this.local("Place")+this.local(": ")}</span>`+a;
		z=1;
	}
	if(this.hideRules)a="";else a=this.getInfo("RU");
	if(a)
	{
		if(z)h+="<br>";
		h+=`<span>${this.local("Rules")+this.local(": ")}</span>`+this.build("Rules",a);
		z=1;
	}
	if(this.hideTimeLimits)a="";else a=this.getInfo("TM");
	if(a)
	{
		if(z)h+="<br>";
		h+=`<span>${this.local("Time limits")+this.local(": ")}</span>`+this.build("TimeLimits",a);
		z=1;
	}
	if(this.hideKomi)a="";else a=this.getInfo("KM");
	if(a)b=`<span>${this.local("Komi")+this.local(": ")}</span>`+this.build("Komi",a);else b=``;
	if(b&&!this.concatKomiToResult)
	{
		if(z)h+="<br>";
		h+=b;
		z=1;
	}
	if(this.hideHandicap)a="";else a=this.getInfo("HA");
	if(a)c=`<span>${this.local("Handicap")+this.local(": ")}</span>`+this.build("handicap",a);else c=``;
	if(c&&!this.concatHandicapToResult)
	{
		if(z)h+="<br>";
		h+=c;
		z=1;
	}
	if(this.hideNumOfMoves)d="";
	else
	{
		a=this.getNumOfMoves()+"";
		if(this.concatNumOfMovesToResult)d=this.build("NumOfMoves",a);
		else
		{
			d=`<span>${this.local("Number of moves")+this.local(": ")}</span>`+a;
			if(z)h+="<br>";
			h+=d;
			z=1;
		}
	}
	if(!this.hideResult&&(a=this.getInfo("RE")))
	{
		if(z)h+="<br>";
		r=this.build("Result",a);
		if(!this.hideResultLabel)h+=(`<span>${this.local("Result")+this.local(": ")}</span>`+r);
		else h+=r.ucF();
		if((d&&this.concatNumOfMovesToResult)
			||(c&&this.concatHandicapToResult)
			||(b&&this.concatKomiToResult))
		{
			let b2,c2,d2;
			h+=" (";
			if(d&&this.concatNumOfMovesToResult)d2=d;else d2="";
			if(c&&this.concatHandicapToResult)c2=c;else c2="";
			if(b&&this.concatKomiToResult)b2=b;else b2="";
			if(d2)h+=d2;
			if(d2&&c2)h+="; ";
			if(c2)h+=c2;
			if((d2||c2)&&b2)h+="; ";
			if(b2)h+=b2;
			h+=")";
		}
		z=1;
	}
	if(h)h=`<p class="mxHeaderContent">${h}</p>`;
	if(!this.hideGeneralComment&&(a=this.getInfo("GC")))
		g=`<p class="mxGeneralComment">${a}</p>`;
	return (t+h+g).replace(/\n/g,"<br>");
}
mxG.G.prototype.doHeader=function()
{
	this.doDialog("ShowHeader",this.buildHeader(1),[{n:" Close "}]);
}
mxG.G.prototype.doKeydownHeader=function(ev)
{
	let r;
	if(ev.metaKey||ev.ctrlKey||ev.altKey)return;
	if(ev.key.match(/^[bctv]$/i))this.doAlphaKeydown(ev);
}
mxG.G.prototype.updateHeader=function()
{
	if(this.headerBoxOn)
	{
		let h=this.buildHeader(),k=this.k;
		if(h!=this.header)this.getE("HeaderBox").innerHTML=this.header=h;
		this.getE("HeaderBox").addEventListener("keydown",function(ev){
			mxG.D[k].doKeydownHeader(ev);});
	}
}
mxG.G.prototype.initHeader=function()
{
	if(this.headerBtnOn)this.addBtnClickListener("Header");
}
mxG.G.prototype.createHeader=function()
{
	this.concatInHeader=this.setA("concatInHeader",new Set(),"set");
	for(let z of this.concatInHeader)this["concat"+z]=1;
	this.headerAlias=this.setA("headerAlias",null,"string");
	this.headerBoxOn=this.setA("headerBoxOn",0,"bool");
	this.headerBtnOn=this.setA("headerBtnOn",0,"bool");
	this.hideInHeader=this.setA("hideInHeader",new Set(),"set");
	this.translateTitleOn=this.setA("translateTitleOn",0,"bool");
	for(let z of this.hideInHeader)if(z.match(/[A-Za-z0-9]+/))this["hide"+z]=1;
	if(this.headerBoxOn)
	{
		this.headerBtnOn=0;
		return `<div class="mxHeaderBox" id="${this.n}HeaderBox" tabindex="0"></div>`;
	}
	return this.headerBtnOn?this.createBtn("Header"):``;
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
}mxG.K++;
mxG.B=[["WhiteCartouche","BlackCartouche",["Options","Navigation","Goto","About"],["Goban","Variation"]],["Comment","Header","Tree"]];
mxG.D[mxG.K]=new mxG.G(mxG.K,mxG.B);
mxG.D[mxG.K].theme="WGo";
mxG.D[mxG.K].config="Tree";
mxG.D[mxG.K].style=".mxWGoTheme{container:mxWGoGlobal/inline-size;--gobanMaxWidth:calc(1rem * 491 / 16);text-align:left;&.mxIndicesOff{--gobanMaxWidth:calc(1rem * 445 / 16);}& button{-webkit-appearance:none;-moz-appearance:none;}& text{cursor:default;}& input[type=text]{text-align:center;}& input[type=text][disabled],& button[disabled]{cursor:default;opacity:0.4;}& form,fieldset{border:0;margin:0;padding:0;}& svg{display:block;width:100%;height:100%;}&,& button{font-family:Calibri,Tahoma,Arial,sans-serif;font-size:1rem;}&{max-width:var(--gobanMaxWidth);line-height:1.4rem;margin:0 auto;}&.mxCommentConfig,&.mxTreeConfig{box-sizing:border-box;display:flex;flex-wrap:wrap;justify-content:center;gap:0.25rem;max-width:calc((var(--gobanMaxWidth) * 2) + 1rem);}&.mxCommentConfig>div,&.mxTreeConfig>div{flex:1 1 var(--gobanMaxWidth);max-width:min(100%,var(--gobanMaxWidth));}&.mxCommentConfig .mxGobanGrandParent,&.mxTreeConfig .mxGobanGrandParent,&.mxCommentConfig .mxCommentParent,&.mxTreeConfig .mxCommentParent{display:flex;flex-direction:column;justify-content:space-between;}&.mxCommentConfig .mxGobanParent,&.mxTreeConfig .mxGobanParent{flex:1;display:flex;flex-direction:column;}&.mxCommentConfig .mxGobanBox,&.mxTreeConfig .mxGobanBox{margin:auto;width:100%;}&.mxCommentConfig .mxCommentBox,&.mxTreeConfig .mxCommentBox{flex:auto;height:8rem;}&.mxTreeConfig .mxTreeBox{flex:auto;height:9.5rem;}&.mxBasicConfig .mxGobanBox,&.mxCommentConfig .mxGobanBox,&.mxGameConfig .mxGobanBox,&.mxTreeConfig .mxGobanBox{background:#f0f0f0;}& .mxGobanContent{margin:0 auto;}& .mxGobanBox svg{background-image:url(data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCABgAGADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6j1MBpbsZORbDntjntUWqtiCbPP72MfjxU96T5t0QM/6MM8fWq2qx/uXweTPGcfgK/nuW7/rufo8XexD94Nxgm7b/ANAqKJj+5HqkPU/7RqYA4OCDm6bH/fNQxMDJaoQMlIiTj3NMt7ElqMODncfNb8P3lMSIDT48cAQsf/HhSWeBPbH+9NJn8HNSBv8AQIgP+eTDn/eFVvH+vIjqSIAbzbn/AJaSjjvwKjsFKzQdMfYzzj0Jp4Obwt0w054/CktMF4hj/l0PFQ1r/XkV0LN+D5N+c8kR/wBKq3xzd6rznMCcevFWr0EwXn1iH/oNVL3P9p6mo4xboc0N/wBfeQv6/AAcXEp+8d8OePYCiBA118xz+7kGD/vU51KzTHn78PA+gpYOL/nIysuR/wACFX/X4g9i3ckie+/6914/E1HqXMIAzzPHkjtwKW4P76/zwRAv9aXUwAq473EePyFQ1uEehWJznr/x9t/6DTIFDvBxyFiAP1JpWHKYOf8ASZDgf7lPtB80RxziEjn6007lMgiXbLaEHJE75/7+VGjFbO2HqhGO+Nw/wqaNciPAwVlc59MyVFFkWkBzk+UDz6lxTasr/wBdALMZzdN6/v8A+lFn/rUx2s8Y65zmmxECaXAAz5/bvwBTLJQ0rt0YWfB9DzUN7D6F66AMV0Dzloif/Har3y41DUz/ANME71YuDtW44BO+LP6Uy9GL7Uh3+zr0+lO1/wCvUhf1+BFJg3U4OD+8hxz9P8KSD/kIY9pgMfUUTN/pc/Xkwce+aIcDUDjr+97Y7iqvrb+twexPdtma/AH/ACwXP60uqKDGucACeMnv6f4VFcgi51HHT7MmMde/+NTaiT9j3erxZP5VMut/63CPQqJgY5xi6kU8dCVpkBw0QHXEI/IE0/lWfJz/AKUxx/wCo4X3TwDoMRn8ADzSiWxI3IgQ5ziTnHvJiiGIizgwD/qU/wDQxUcQ22oK87iDz6+casxgiziIBGYlP/j/AP8AWq918hdRqgi6l65Pnjk/SpLMAP0J/wBD5/WmFs3Lcc75v5CixbfInQ5s+nfvUFdC1cnEt0QDnfD7HtSX7f6dqeOv2dTjqelNuAGluhk8eSRn8KbeZOqahkHH2UH9DUuVv69Sf6/IJU3XU5xxug5B+hpVGdQPTpL/ADFSy4zMOAd0JJ/KmxBf7Scg9DLz2HIra3X+tyXqRyn/AE/UQQSBbLxUt9/x4gk94uPyqCTP2zVOMf6Op5/H/CptQwLNT/twg+1Q+vz/AFHHoVG3POFJ63Uhx/2zpbSLdJbk56RgHnptam7v9LGc5+1S/wDourNqB/ow6nEfI/3WprVlN6FUMI7aHqTjjHtNVtBusYvaJcnI67xVFv3scCDIxnP/AH96fpU9q5XT2I5C8D6CQf41UndK3YgcPmvM/wDTSYY/AUzTm3SW4PVrNvoOafFk3SEdRJMf5cfrUdgD51twP+PJsn8az7f12NOheuFzLdZOQBDilvEA1DUDj/l2H8qS5OIr1sfwRUXjf8TG+yB/x6A5/A0v6/Mn+vyI58hrnpy0A5/ClhQDUXPr5vP/AAIU64GTPgdWg/pTol/08jgHEp/8eFVbX+u4mRXAxPqJI/5dkH4fNS6scWgPQebEPX0pL07ZdRP8X2deg+tO1cg2x6j9/FnA+lOXX+u4R6FI7RchsE4upAcn1SpbaYeZCh64j/kQf51GFDT5BGReOeR/0zpbRA0tucc7YwMem1qSfvWKa0I4FVhEwPGT05/5af8A16RCRYqBwpjY46ZO8U6NRHbxYODgt+PminIv+hJk4xG4I99wzVv4fkJbjreTdeoOv7yYY/AU3TOXiI7WRGPxNSqNl9Fg/ellyce1Jp2VVCOcWhz271n/AF+RXQt3SkQXvPaMH9P8aS5/5CN8eAPsuDT75P8ARb/IHIT37CoJvmvNTOM7YVTH4f8A16T/AK/Ela/16Es/WbnOXhHH4UsPOocekvX/AHhST8NOMYw8I4/CpIhm+JHULKRz/tDmr6/13J6FTVQQL48ZNspzn3NGsE/ZW6j/AEiHofpUt4hmnuY+APsq8+vJqPWTlJfaeLP6VNRrX+u5cen9ditGcvkHn7a4/wDHKsWqgNbdSSIyf++WqtAxDL/19SH/AMc/+tVqxwRDnsIv/QWpx3CWxVUb7bbjorDHT/lsP8an8rFnH2GyQAj/AHwKiiAMO0cZLKf+/wAKsBttoi9cKwH/AH2P8KvW3yJ6iFcXceOSJJj9OBTNPyYyD977Jz+JNBk2Su3OF885/AU+0UK0g/u2iD86yu7lPRF685juxjjMY/LH+NU2OJ9WbJHQcDpgAf0q3eqRDcgE8zJ+RxVVnCnVjkkF8fU8U3v/AF5kR/r8CS5I3XHP/LeJR+lPjdftbc8hJM+x3Uy8+/OOeLqPr/uiq0Df6c5yf+Wo6+4q7a/13F0P/9k=);background-repeat:repeat;}& text{stroke-width:0.5px;stroke:#000;}& text.mxOnBlack,& .mxBlack+text{stroke:#fff;}& .mxHeaderTitle{font-weight:bold;}&.mxCommentConfig .mxCommentBox,&.mxTreeConfig .mxCommentBox,&.mxTreeConfig .mxTreeBox{position:relative;box-sizing:border-box;background:#f5f5f5;border:1px solid #ddd;overflow:hidden;}&.mxCommentConfig .mxCommentContent,&.mxTreeConfig .mxCommentContent,&.mxTreeConfig .mxTreeContent{box-sizing:border-box;margin-top:2rem;width:100%;height:calc(100% - 2rem);overflow:auto;}&.mxCommentConfig .mxCommentBox::before,&.mxTreeConfig .mxCommentBox::before,&.mxTreeConfig .mxTreeBox::before{content:attr(data-name);box-sizing:border-box;background:#f0f0f0;display:block;border-bottom:1px solid #ddd;padding:0 2.25rem 0 0.25rem;font-weight:bold;height:2rem;line-height:calc(2rem - 1px);position:absolute;left:0;right:0;}&.mxCommentConfig .mxCommentBox::after,&.mxTreeConfig .mxCommentBox::after{content:url(\"data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1000 1000\'><path d=\'M811 187H186c-14 0-26.333 5-37 15-10.667 10-16 22-16 36v365c0 14 5.333 26.333 16 37 10.667 10.667 23 16 37 16h625c14 0 26.333-5.333 37-16 10.667-10.667 16-23 16-37V238c0-14-5.333-26-16-36s-23-15-37-15zm0-105c43.333 0 80.333 15.333 111 46s46 67.667 46 111v365c0 43.333-15.333 80.333-46 111s-67.667 46-111 46H395L239 917V761h-53c-43.333 0-80.333-15.333-111-46s-46-67.667-46-111V239c0-43.333 15.333-80.333 46-111s67.667-46 111-46z\'/></svg>\");}&.mxTreeConfig .mxTreeBox::after{content:url(\"data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' stroke-width=\'60\' stroke=\'rgb(0,0,0)\' viewBox=\'0 0 1000 1000\'><circle cx=\'500\' cy=\'800\' r=\'90\'/><circle cx=\'800\' cy=\'200\' r=\'90\'/><circle cx=\'200\' cy=\'600\' r=\'90\'/><circle cx=\'800\' cy=\'600\' r=\'90\'/><circle cx=\'500\' cy=\'400\' r=\'90\'/><path d=\'M200,600L800,200\'/><path d=\'M200,600L500,800\'/><path d=\'M500,400L800,600\'/></svg>\");}&.mxCommentConfig .mxCommentBox::after,&.mxTreeConfig .mxCommentBox::after,&.mxTreeConfig .mxTreeBox::after{box-sizing:border-box;display:block;position:absolute;top:0;right:0.25rem;width:2rem;height:2rem;position:absolute;}&.mxCommentConfig .mxCommentContent,&.mxTreeConfig .mxCommentContent{padding:0.25rem;}&.mxTreeConfig .mxTreeBox{margin-top:0.25rem;}& .mxTreeBox svg{width:calc(1rem * var(--treeIntrinsicWidth) / 16);height:auto;}& .mxMoveNumber{font-weight:bold;}& .mxNotSeenBox:not(:empty){margin:0.5rem auto 0 auto;}&.mxProblemConfig .mxCommentBox{margin:0.5rem auto 0 auto;text-align:center;min-height:1.5rem;line-height:1.5rem;}&.mxProblemConfig .mxCommentContent{display:inline-block;text-align:justify;}&.mxProblemConfig .mxCommentContent p{margin:0;}& .mxCartoucheBox{display:grid;grid-template-columns:2.5rem 1fr auto auto;align-items:center;background:#f0f0f0;border:1px solid #dcdcdc;}& .mxCartoucheBox:nth-of-type(1){border-bottom:0;}& .mxShortHeader{grid-column:1/4;display:grid;grid-template-columns:2.5rem 1fr auto;height:100%;align-items:center;}& .mxPlayerName{font-weight:bold;overflow-wrap:anywhere;}& .mxPlayerRank,& .mxPrisoners{display:flex;flex-direction:column;font-size:0.75rem;line-height:1rem;border:1px solid #e7e7e7;background:#f5f5f5;justify-content:center;align-items:center;margin:1px;}& .mxPlayerRank:not(:empty)::before,& .mxPrisoners:not(:empty)::before{content:attr(data-label);}& .mxPrisonersStone{display:none;}& .mxPlayerRank:empty,& .mxPrisoners:empty{display:none;}& dialog,& dialog *{box-sizing:border-box;}& dialog::backdrop{background: rgba(0,0,0,0.5);}& dialog{max-width:calc(100% - 5vw);padding:min(5vw,0.5em);border:0;color:#fff;background:rgba(0,0,0,0.75);}& dialog p{margin:0.25rem 0;padding:0;}& dialog label:not([for]){display:block;}& dialog.mxEditOptionsDialog .mxContentFieldset{line-height:1.75rem;}& dialog .mxMenuFieldset{text-align:center;}& dialog .mxMenuFieldset button{color:#fff;background:#000;border:1px solid #fff;;border-radius:0.25rem;margin:0.5rem 0.25rem;height:2rem;}& dialog a{color:#fff;}& .mxNumberingOnCheckbox:not(:checked)~span{display:none;}& .mxNavigationParent{display:grid;grid-template-columns:10% 76% 10%;justify-content:center;align-items:center;gap:2%;margin:0.125em 0;}& .mxNavigationBox{display:grid;justify-content:center;align-items:center;gap:calc(1% / 0.76);grid-template-columns:repeat(7,calc(10% / 0.76));}& .mxSolveBox{text-align:center;}& .mxNavigationParent button,& .mxSolveBox button{box-sizing:border-box;aspect-ratio:1;color:#000;background:linear-gradient(to top,#ddd,#fff);box-shadow:none;border-top:1px solid #cecece;border-left:1px solid #d3d3d3;border-right:1px solid #d3d3d3;border-bottom:1px solid #dedede;border-radius:2px;margin:0;padding:0;}& .mxSolveBox button{width:min(33%,3.3em);margin:min(6.6%,0.66em);}& .mxNavigationBox button svg{fill:none;background-size:90%;background-position:center;background-repeat:no-repeat;}& .mxNavigationBox .mxFirstBtn svg,& .mxNavigationBox .mxTenPredBtn svg,& .mxNavigationBox .mxPredBtn svg{transform:scaleX(-1);}& .mxNavigationBox .mxPredBtn svg,& .mxNavigationBox .mxNextBtn svg{background-image:url(\"data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' fill=\'%23000\' viewBox=\'0 0 1000 1000\' height=\'1000\' width=\'1000\'><path d=\'M786,523C804,506 803,485 786,473L358,207C323,184 300,211 300,241V755C299,794 331,806 358,789Z\'/></svg>\");}& .mxNavigationBox .mxTenPredBtn svg,& .mxNavigationBox .mxTenNextBtn svg{background-image:url(\"data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' fill=\'%23000\' viewBox=\'0 0 1000 1000\' height=\'1000\' width=\'1000\'><path d=\'M976,521C994,506 994,485 976,475L604,227C572,206 552,229 552,257V739C551,775 580,783 604,769ZM522,521C540,506 540,485 522,475L162,227C131,206 110,230 110,257V739C109,774 138,784 162,769Z\'/></svg>\");}& .mxNavigationBox .mxFirstBtn svg,& .mxNavigationBox .mxLastBtn svg{background-image:url(\"data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' fill=\'%23000\' viewBox=\'0 0 1000 1000\' height=\'1000\' width=\'1000\'><path d=\'M612,521C631,505 629,487 612,475L250,247C219,227 200,250 200,277V719C199,754 226,763 250,749ZM726,789C775,789 800,769 800,731V265C800,226 775,207 726,207 675,207 650,226 650,265V731C650,769 675,789 726,789Z\'/></svg>\");}& .mxNavigationParent span{color:transparent;display:block;width:100%;height:100%;background-size:90%;background-position:center;background-repeat:no-repeat;}& .mxAboutBtn span{background-image:url(\"data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1000 1000\' height=\'100%\' width=\'100%\'><path d=\'M 575,771 575,664 Q 575,656 570,651 565,646 557,646 L 450,646 Q 442,646 437,651 432,656 432,664 L 432,771 Q 432,779 437,784 442,789 450,789 L 557,789 Q 565,789 570,784 575,779 575,771 Z M 718,396 Q 718,347 687,305 656,263 610,240 564,217 515,217 379,217 308,336 300,349 312,359 L 386,415 Q 390,418 397,418 406,418 411,411 441,373 459,360 478,347 507,347 534,347 555,362 576,377 576,395 576,416 565,429 554,442 527,454 492,470 463,502 434,534 434,572 L 434,592 Q 434,600 439,605 444,610 452,610 L 559,610 Q 567,610 572,605 577,600 577,592 577,581 589,564 601,547 619,536 637,526 646,520 655,514 672,500 689,486 697,473 705,460 713,439 721,418 720,394 Z M 932,503 Q 932,620 875,718 818,816 719,874 620,932 504,931 388,930 289,874 190,818 133,718 76,618 76,503 76,388 133,288 190,188 289,132 388,76 504,75 620,74 719,132 818,190 875,288 932,386 932,503 Z\'/></svg>\");}& .mxHeaderBtn span{background-image:url(\"data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1000 1000\' height=\'100%\' width=\'100%\'><path d=\'M 687,785 687,856 Q 687,871 676,881 665,891 651,892 L 365,892 Q 350,892 340,881 330,870 329,856 L 329,785 Q 329,770 340,760 351,750 365,749 L 401,749 401,535 365,535 Q 350,535 340,524 330,513 329,499 L 329,428 Q 329,413 340,403 351,393 365,392 L 579,392 Q 594,392 604,403 614,414 615,428 L 615,749 651,749 Q 666,749 676,760 686,771 687,785 Z M 616,142 616,249 Q 616,264 605,274 594,284 580,285 L 437,285 Q 422,285 412,274 402,263 401,249 L 401,142 Q 401,127 412,117 423,107 437,106 L 580,106 Q 595,106 605,117 615,128 616,142 Z\'/></svg>\");}& .mxOptionsBtn span{background-image:url(\"data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1000 1000\' height=\'100%\' width=\'100%\'><path d=\'M 800,550 Q 822,550 836,535 850,520 850,500 850,480 835,465 820,450 800,450 L 200,450 Q 180,450 165,465 150,480 150,500 150,520 164,535 178,550 200,550 L 800,550 Z M 200,650 Q 180,650 165,665 150,680 150,700 150,720 164,735 178,750 200,750 L 800,750 Q 822,750 836,735 850,720 850,700 850,680 835,665 820,650 800,650 L 200,650 Z M 800,350 Q 822,350 836,335 850,320 850,300 850,280 835,265 820,250 800,250 L 200,250 Q 180,250 165,265 150,280 150,300 150,320 164,335 178,350 200,350 L 800,350 Z\'/></svg>\");}& .mxGotoInput{box-sizing:border-box;font-family:Arial,sans-serif;font-size:1rem;height:100%;margin:0;padding:0;color:#000;border:1px solid #d3d3d3;border-radius:2px;background:transparent;}@container mxWGoGlobal (max-width:50rem){&.mxCommentConfig .mxCommentParent,&.mxTreeConfig .mxCommentParent{--labelSize:0.75;}&.mxCommentConfig .mxCommentContent,&.mxTreeConfig .mxCommentContent,&.mxTreeConfig .mxTreeContent{margin-top:0;margin-left:calc(2rem * var(--labelSize));width:calc(100% - 2rem * var(--labelSize));height:100%;}&.mxCommentConfig .mxCommentBox::before,&.mxTreeConfig .mxCommentBox::before,&.mxTreeConfig .mxTreeBox::before{position:absolute;transform:rotate(-90deg);transform-origin:top left;font-size:calc(1rem * var(--labelSize));width:2em;height:2em;line-height:2em;z-index:1;border-bottom:1px solid #ddd;}&.mxCommentConfig .mxCommentBox::before,&.mxTreeConfig .mxCommentBox::before{width:calc(8em / var(--labelSize));top:calc(8em / var(--labelSize));}&.mxTreeConfig .mxTreeBox::before{width:calc(9.5em / var(--labelSize));top:calc(9.5em / var(--labelSize));}&.mxCommentConfig .mxCommentBox::after,&.mxTreeConfig .mxCommentBox::after,&.mxTreeConfig .mxTreeBox::after{transform:rotate(-90deg);transform-origin:top left;font-size:calc(1rem * var(--labelSize));width:2em;height:2em;top:2.25em;left:0;z-index:2;}}@container mxWGoGlobal (max-width:20rem){& .mxNavigationParent{grid-template-columns:repeat(6,1fr);grid-template-rows:1fr 1fr;gap:1vw;}& .mxHeaderBtn,& .mxOptionsBtn{grid-row:1;grid-column:1;position:relative;z-index:1;}& .mxAboutBtn{grid-row:1;grid-column:6;}& .mxNavigationBox{grid-row:1/-1;grid-column:1/-1;grid-template-columns:repeat(6,1fr);grid-template-rows:1fr 1fr;gap:1vw;}& .mxGotoInput{grid-row:1;grid-column:2/-2;margin-left:10%;margin-right:10%;align-self:stretch;}& .mxNavigationBox .mxBtn{grid-row:2;}& .mxCartoucheBox{grid-template-columns:2.5rem 1fr 2rem 2rem;}& .mxShortHeader{grid-row:1/3;grid-column:1/-1;grid-template-columns:2.5rem 1fr 2rem 2rem;}& .mxPlayerStone{grid-row:1;grid-column:1;}& .mxPlayerName{grid-row:2;grid-column:1/-1;margin:0;padding:0 0.25rem;}& .mxPlayerRank:not(:empty){grid-row:1;grid-column:3;}& .mxPrisoners{margin-top:0.25em;grid-row:1;grid-column:4;}}& *:not([type=radio]):not([type=checkbox]):focus{outline:none;}& .mxGobanSvg:not(:focus-visible) .mxFocus{display:none;}&.mxCommentConfig .mxCommentBox:focus,&.mxProblemConfig .mxCommentBox:focus,&.mxTreeConfig .mxCommentBox:focus,&.mxTreeConfig .mxTreeBox:focus{background:#fafafa;}& .mxNavigationParent button:not([disabled]):focus,& .mxSolveBox button:not([disabled]):focus,& .mxNavigationBox input[type=text]:not([disabled]):focus{outline:1px dotted #000;position:relative;z-index:2;}& dialog .mxMenuFieldset button:focus,& dialog .mxMenuFieldset button:hover{color:#f00;border:1px solid #f00;}& dialog a:focus,& dialog a:hover{color:#f00;}& .mxNavigationParent button:not([disabled]):hover,& .mxSolveBox button:not([disabled]):hover,& .mxNavigationBox input[type=text]:not([disabled]):hover{background-color:rgba(255,255,255,0.45);border:1px solid rgba(100,100,100,0.3);box-shadow:0 0 20px 0 rgba(150,150,150,0.5);}& .mxNavigationBox button.mxGotoInput:focus{border:1px solid #000;}& button,&:not(.mxDiagramConfig) .mxGobanBox svg,& .mxTreeBox svg circle,& .mxTreeBox svg polygon,& .mxTreeBox svg rect,& .mxTreeBox svg text{cursor:pointer;}}";
mxG.D[mxG.K].a.in3dOn=1;
mxG.D[mxG.K].a.allowStringAsSource=1;
mxG.D[mxG.K].a.allowFileAsSource=1;
mxG.D[mxG.K].a.initMethod="first";
mxG.D[mxG.K].a.stoneShadowOn=1;
mxG.D[mxG.K].a.specialStoneOn=1;
mxG.D[mxG.K].a.stretching="0,0,1,1";
mxG.D[mxG.K].a.gridPadding=2;
mxG.D[mxG.K].a.gridMargin=0;
mxG.D[mxG.K].a.gobanPadding=0;
mxG.D[mxG.K].a.gobanMargin=2;
mxG.D[mxG.K].a.indicesOn=1;
mxG.D[mxG.K].a.numberingOn=0;
mxG.D[mxG.K].a.asInBookOn=0;
mxG.D[mxG.K].a.marksAndLabelsOn=1;
mxG.D[mxG.K].a.markOnLastOn=1;
mxG.D[mxG.K].a.numAsMarkOnLastOn=0;
mxG.D[mxG.K].a.japaneseIndicesOn=0;
mxG.D[mxG.K].a.oldJapaneseIndicesOn=0;
mxG.D[mxG.K].a.eraseGridUnder=1;
mxG.D[mxG.K].a.aboutBtnOn=1;
mxG.D[mxG.K].a.aboutAlias="About_wgo";
mxG.en("About_wgo","<span aria-hidden='true'>?</span>");
mxG.D[mxG.K].a.aboutThemeAlias="Theme_WGo";
mxG.en("Theme_WGo","<a href=\"http://wgo.waltheri.net/\">WGo</a> (copyright Jan Prokop)");
mxG.D[mxG.K].a.cartoucheBoxOn=1;
mxG.D[mxG.K].a.headerInComment=1;
mxG.D[mxG.K].a.allInComment=1;
mxG.D[mxG.K].a.gotoBoxOn=0;
mxG.D[mxG.K].a.headerBoxOn=0;
mxG.D[mxG.K].a.headerBtnOn=0;
mxG.D[mxG.K].a.hideInHeader="NumOfMoves,Place,Rules,TimeLimits";
mxG.D[mxG.K].a.navigations="First,TenPred,Pred,Goto,Next,TenNext,Last";
mxG.D[mxG.K].a.optionsAlias="Options_wgo";
mxG.en("Options_wgo","<span aria-hidden='true'>O</span>");
mxG.D[mxG.K].a.optionsBtnOn=1;
mxG.D[mxG.K].a.hideInOptions="In3dOn";
mxG.D[mxG.K].a.variationMarksOn=1;
mxG.D[mxG.K].a.siblingsOn=0;
mxG.D[mxG.K].a.hideSingleVariationMarkOn=1;
mxG.D[mxG.K].a.variationBoxOn=0;
mxG.D[mxG.K].a.canPlaceVariation=1;
mxG.D[mxG.K].start();
