// maxiGos v8 > mgosCartouche.js
if(!mxG.G.prototype.createCartouche)
{
mxG.fr("Rank","Niv.");
mxG.fr("Caps","Cap.");
mxG.fr("Bowl","Bol");
mxG.fr("Black bowl","Bol noir");
mxG.fr("White bowl","Bol blanc");
mxG.fr("Black prisoners","Prisonniers noirs");
mxG.fr("White prisoners","Prisonniers blancs");
// mxG.S section
mxG.S.prototype.makeOneStone4Bowl=function(nat,x,y,d,o)
{
	// no shadow inside the bowl
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
	// no svg shadow for the bowl
	let s="",x,y,r,i,j,k,km,km2,dk,rk;
	dk=this.d;
	rk=dk/2;
	x=this.bowlW/2;
	y=(nat=="W")?this.bowlW/2:this.bowlW/2+this.capW;
	r=this.bowlW/2*0.9;
	r2=r-rk;
	// bowl background
	s+=`<circle fill="${(nat=="B")?"#000":"#ccc"}" cx="${x}" cy="${y}" r="${r}"/>`;
	// stones
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
	// bowl
	return s+`<circle fill="url(#${this.p.n+nat}BowlIn${o.in3dOn?3:2}dRG)" cx="${x}" cy="${y}" r="${r}"/>`;
}
mxG.S.prototype.updateBowlDesc=function(nat,n)
{
	let b=this.p.getE(nat+"BowlDesc"),oc=(nat=="B")?"White":"Black";
	b.innerHTML=this.p.local(oc+" prisoners")+" "+n;
}
mxG.S.prototype.makeCap=function(nat,n,o)
{
	// no svg shadow for the cap
	let x,y,dy,r,c=(nat=="B")?"Black":"White";
	x=this.bowlW/2;
	y=(nat=="W")?this.bowlW+this.capW/2:this.capW/2;
	dy=this.capW*5/42;
	r=this.capW/2*0.95; // 0.95 (not 0.9) since the cap must be larger than the bowl hole
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
	this.capW=this.bowlW*0.8; // since #da7 external offset is 0.8
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
	// use stop-opacity instead of transparent (better support, see ios)
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
// mxG.G section
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
		// just update prisoners num if this.bowlOn
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
