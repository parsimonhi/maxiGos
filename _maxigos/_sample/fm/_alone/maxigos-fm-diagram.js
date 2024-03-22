// maxiGos v8 Fm+Diagram copyright 1998-2024 FM&SH, BSD license
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
if(!mxG.G.prototype.createNotSeen)
{
mxG.fr("→","→");
mxG.fr("Invisible moves","Coups invisibles");
mxG.fr("tenuki","ailleurs");
mxG.S.prototype.makeTextSomewhere=function(txt,x,y,c,o)
{
	let s=`<text class="mxTextSomewhere" fill="${c}"`;
	if(o.centered)s+=` text-anchor="middle"`;
	return s+` x="${x}" y="${y+5}">${txt}</text>`;
}
mxG.S.prototype.makeMarkOnAloneStone=function(a,x,y,c,o)
{
	switch(a)
	{
		case "_MA_":return this.makeMark(c,x,y,o);
		case "_TR_":return this.makeTriangle(c,x,y,o);
		case "_SQ_":return this.makeSquare(c,x,y,o);
		case "_CR_":return this.makeCircle(c,x,y,o);
	}
}
mxG.S.prototype.makeNotSeen=function(a,o)
{
	let k,km,s="",nw,h4ns,desc="",i,j,c,oc,x,y,xo,d,dd,ddd,z;
	d=this.d;
	dd=this.d+2;
	z=(o.in3dOn&&o.stoneShadowOn)?this.stoneShadowWidth:0;
	ddd=dd+2*z;
	km=a.length;
	for(k=0;k<km;k++)
	{
		if(desc)desc+=", ";
		desc+=this.p.local(a[k].nat=="B"?"Black":"White")+" "+a[k].n+" "+a[k].t;
		if(a[k].nato)
		{
			desc+=" "+this.p.local(a[k].nato=="B"?"Black":"White")+" ";
			if(this.isMark(a[k].no))
			{
				switch(a[k].no)
				{
					case "_MA_":desc+=this.p.local("Mark");break;
					case "_CR_":desc+=this.p.local("Circle");break;
					case "_SQ_":desc+=this.p.local("Square");break;
					case "_TR_":desc+=this.p.local("Triangle");break;
				}
			}
			else desc+=a[k].no;
		}
	}
	nw=Math.floor(this.w/(4*ddd));
	if(nw<1)nw=1;
	nl=Math.ceil(km/nw);
	h4ns=nl*ddd;
	xo=(this.w-nw*4*ddd+ddd)/2;
	s=`<svg`
	+` viewBox="0 0 ${this.w} ${h4ns}"`
	+` width="${this.w}" height="${h4ns}"`
	+` stroke-linecap="square"`
	+` font-family="${this.ff}"`
	+` font-size="${this.fs}"`
	+` font-weight="${this.fw}"`
	+` aria-labelledby="${this.p.n}NotSeenTitle ${this.p.n}NotSeenDesc"`
	+` role="img"`
	+`>`
	+`<title id="${this.p.n}NotSeenTitle">${this.p.local("Invisible moves")}</title>`
	+`<desc id="${this.p.n}NotSeenDesc">${desc}</desc>`;
	if(this.in3dOn) s+=`<defs>${this.makeGradient("Black")+this.makeGradient("White")}</defs>`;
	s+=`<g aria-hidden="true">`;
	for(k=0;k<km;k++)
	{
		i=k%nw;
		j=Math.floor(k/nw);
		c=(a[k].nat=="B")?"Black":"White";
		oc=(a[k].nat=="B")?"White":"Black";
		o.opacity=1;
		x=xo+i*ddd*4+ddd/2;
		y=j*ddd+ddd/2;
		s+=this.makeStone(c,x,y,d/2,o);
		if(a[k].n)
		{
			o.cls="mxNumber mxOn"+((a[k].nat=="B")?"Black":"White");
			s+=this.makeText(a[k].n,x,y,oc,o);
		}
		if(a[k].t)
		{
			if(a[k].nato)
				s+=this.makeTextSomewhere(a[k].t,x+ddd,y,"Black",{centered:1});
			else
				s+=this.makeTextSomewhere(a[k].t,x+ddd/2+d/8,y,"Black",{centered:0});
		}
		if(a[k].nato)
		{
			let z=a[k].no;
			c=(a[k].nato=="B")?"Black":"White";
			oc=(a[k].nato=="B")?"White":"Black";
			o.opacity=1;
			x=xo+(i*4+2)*ddd+ddd/2;
			y=j*ddd+ddd/2;
			s+=this.makeStone(c,x,y,d/2,o);
			if(z)
			{
				if(this.isMark(z))
				{
					o.cls="mxMark mxOn"+((a[k].nato=="B")?"Black":"White");
					s+=this.makeMarkOnAloneStone(z,x,y,oc,o);
				}
				else if(this.isLabel(z))
				{
					o.cls="mxLabel mxOn"+((a[k].nato=="B")?"Black":"White");
					z=this.removeLabelDelimiters(z);
					s+=this.makeText(z,x,y,oc,o);
				}
				else
				{
					o.cls="mxNumber mxOn"+((a[k].nato=="B")?"Black":"White");
					s+=this.makeText(z,x,y,oc,o);
				}
			}
		}
	}
	s+=`</g></svg>`;
	return s;
}
mxG.G.prototype.buildNotSeen=function()
{
	let k,kmx,y,n,no,nat,nato,s="",t,a=[],o,mo=this.gor.setup+1,m=this.gor.play;
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
						let no2=this.vStr[this.xy(x,y)];
						no2=this.scr.removeVariationDelimiters(no2);
						if((no2=="_TB_")||(no2=="_TW_")||(no2=="_ML_"))no2="";
						if(no2)
						{
							nato=this.vNat[this.xy(x,y)];
							t=this.local("→");
							a.push({nat:nat,n:n,t:t,nato:nato,no:no2});
						}
						else
						{
							t=this.local("→")+" "+this.scr.k2c(x)+this.scr.k2n(y);
							a.push({nat:nat,n:n,t:t});
						}
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
			if(a[k].no)a[k].no=this.scr.k2okanji(a[k].no);
		}
	}
	if(a.length)return this.scr.makeNotSeen(a,o);
	return "";
}
mxG.G.prototype.updateNotSeen=function()
{
	this.getE("NotSeenBox").innerHTML=this.numberingOn?this.buildNotSeen():"";
}
mxG.G.prototype.createNotSeen=function()
{
	this.notSeenTwinStonesOn=this.setA("notSeenTwinStonesOn",1,"bool");
	return `<div class="mxNotSeenBox" id="${this.n}NotSeenBox"></div>`;
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
mxG.B=["Goban","NotSeen","Version"];
mxG.D[mxG.K]=new mxG.G(mxG.K,mxG.B);
mxG.D[mxG.K].theme="Fm";
mxG.D[mxG.K].config="Diagram";
mxG.D[mxG.K].style=".mxFmTheme{--gobanMaxWidth:calc(1em * var(--gobanIntrinsicWidth,445) / 16);--columnMaxWidth:max(var(--gobanMaxWidth),calc(1em * 445 / 16));text-align:left;margin:0 auto;& text{cursor:default;}& [disabled]{cursor:default;opacity:0.3;}& form,fieldset{border:0;margin:0;padding:0;}& svg{display:block;width:100%;height:100%;}&,& button{font-family:sans-serif;font-size:1em;}&{box-sizing:border-box;max-width:var(--columnMaxWidth);}&.mxGameConfig,&.mxProblemConfig{background-color:#0001;}&.mxGameConfig{display:flex;flex-wrap:wrap;justify-content:center;max-width:calc(var(--columnMaxWidth) * 7 / 4);}&.mxGameConfig .mxGobanParent{box-sizing:border-box;max-width:var(--columnMaxWidth);flex:4 1 var(--columnMaxWidth);display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.5em;}&.mxGameConfig .mxHeaderParent{box-sizing:border-box;max-width:var(--columnMaxWidth);width:100%;flex:3 1 calc(var(--columnMaxWidth) * 3 / 4);display:flex;flex-direction:column;justify-content:space-between;padding:min(5vw,0.5em);}&.mxGameConfig .mxSgfParent{text-align:center;}&.mxGameConfig .mxSgfParent button{margin:0.25em;}& .mxVersionBox{text-align:center;min-height:2.5em;line-height:2.5em;}&.mxGameConfig .mxGobanBox{display:flex;width:100%;}& .mxGobanContent{max-width:var(--gobanMaxWidth);margin:auto;}&.mxGameConfig .mxGobanContent{max-width:100%;width:100%;}&.mxIn3d .mxGobanContent{box-shadow:0 0.25em 0.5em rgba(0,0,0,0.3);}& .mxGobanBox svg .mxWholeRect{fill:#fc9;}& text{stroke-width:0.5px;stroke:#000;}& text.mxOnBlack,& .mxBlack+text{stroke:#fff;}& .mxHeaderTitle{color:#900;font-weight:bold;text-align:center;}& p{margin:0;padding:0;}& p:not(:first-child){padding-top:0.5em;}& .mxNotSeenBox:not(:empty){max-width:var(--gobanMaxWidth);margin:0.5em auto 0 auto;}&.mxGameConfig .mxHeaderBox{padding:min(2.5vw,0.25em);margin-bottom:0.5em;max-width:100%;overflow-wrap:anywhere;}&.mxGameConfig .mxGuessBox{flex:0;width:100%;min-height:2.5em;display:flex;align-items:center;}&.mxGameConfig meter{--meterGoodColor:#090;--meterBadColor:#900;--meterBorder:0;display:block;font-size:1em;margin:0 auto;padding:0;width:calc(100% - 4vw);height:0.5em;border:0;border-radius:0.25em;overflow:hidden;background:var(--meterBadColor);}&.mxGameConfig ::-webkit-meter-bar{width:100%;height:0.5em;border:0;border-radius:0;background:#0000;}&.mxGameConfig .mxGuessBox ::-webkit-meter-optimum-value{background:var(--meterGoodColor);}@supports selector(::-moz-meter-bar){&.mxGameConfig .mxGuessBox :-moz-meter-optimum::-moz-meter-bar{background:var(--meterGoodColor);}}&.mxProblemConfig .mxCommentBox{margin:0 auto 0.5em auto;text-align:center;min-height:1.5em;line-height:1.5em;}&.mxProblemConfig .mxCommentContent{display:inline-block;text-align:justify;}&.mxProblemConfig .mxCommentContent p{margin:0;}&.mxProblemConfig .mxCommentBox{padding:0.5em;}& dialog,& dialog *{box-sizing:border-box;}& dialog::backdrop{background: #0007;}& dialog{max-width:calc(100% - 5vw);border:0;padding:0;}& dialog form{background-color:#eeb;}& dialog .mxContentFieldset{padding:min(5vw,0.5em);}& dialog .mxMenuFieldset{background:#0001;min-height:3em;line-height:3em;text-align:center;}& dialog h1{color:#900;}& dialog label:not([for]){display:block;}& dialog input[type=text]{max-width:100%;}& dialog img{display:block;margin:0 auto;max-width:100%;height:auto;border:0;}& dialog.mxShowSgfDialog .mxContentFieldset{font-family:monospace;white-space:pre-wrap;}& .mxOptionsBox{line-height:1.5em;max-width:100%;overflow-wrap:anywhere;}& .mxOptionsBox label:not([for]){display:block;}& .mxNumberingOnCheckbox:not(:checked)~span{display:none;}& a{color:#000;}& .mxNavigationBox{margin-top:1em;width:100%;height:2em;box-sizing:border-box;display:flex;justify-content:space-between;align-items:center;}& .mxNavigationBox button{flex:1;border:0;background:transparent;margin:min(1%,0.25em);padding:0;display:flex;justify-content:center;align-items:center;}& .mxNavigationBox button svg{flex:1;max-width:60%;max-height:80%;margin:auto;}& .mxNavigationBox button.mxAutoBtn[disabled],& .mxNavigationBox button.mxPauseBtn[disabled]{display:none;}& .mxSolveBox{text-align:center;}& .mxSolveBox button{width:min(33%,3.3em);margin:min(6.6%,0.66em);padding:0;border:0;background:none;}& .mxSpeedBox{width:calc(100% - 4vw);margin:0.5em auto;}& .mxSpeedBox input{width:100%;}& :not(:focus-visible){outline:none;}& .mxGobanSvg:not(:focus-visible) .mxFocus{display:none;}& button:not([disabled]),& input[type=range]:not([disabled]),&:not(.mxDiagramConfig) .mxGobanBox svg{cursor:pointer;}}";
mxG.D[mxG.K].a.in3dOn=1;
mxG.D[mxG.K].a.allowStringAsSource=1;
mxG.D[mxG.K].a.allowFileAsSource=1;
mxG.D[mxG.K].a.initMethod="last";
mxG.D[mxG.K].a.stoneShadowOn=0;
mxG.D[mxG.K].a.stretching="0,0,1,1";
mxG.D[mxG.K].a.gridPadding=2;
mxG.D[mxG.K].a.gridMargin=0;
mxG.D[mxG.K].a.gobanPadding=0;
mxG.D[mxG.K].a.gobanMargin=2;
mxG.D[mxG.K].a.indicesOn="null";
mxG.D[mxG.K].a.numberingOn=1;
mxG.D[mxG.K].a.asInBookOn=1;
mxG.D[mxG.K].a.marksAndLabelsOn=1;
mxG.D[mxG.K].a.markOnLastOn=0;
mxG.D[mxG.K].a.numAsMarkOnLastOn=0;
mxG.D[mxG.K].a.japaneseIndicesOn=0;
mxG.D[mxG.K].a.oldJapaneseIndicesOn=0;
mxG.D[mxG.K].a.eraseGridUnder=1;
mxG.D[mxG.K].start();
