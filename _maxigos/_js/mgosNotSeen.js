// maxiGos v8 > mgosNotSeen.js
if(!mxG.G.prototype.createNotSeen)
{
mxG.fr("→","→");
// mxG.fr("Black","Noir");
// mxG.fr("Circle","Cercle");
mxG.fr("Invisible moves","Coups invisibles");
// mxG.fr("Mark","Marque");
// mxG.fr("pass","passe");
// mxG.fr("Square","Carré");
mxG.fr("tenuki","ailleurs");
// mxG.fr("Triangle","Triangle");
// mxG.fr("White","Blanc");
// mxG.S section
mxG.S.prototype.makeTextSomewhere=function(txt,x,y,c,o)
{
	// x: center of the text if centered, beginning of the text otherwise
	// y: center of the text
	let s=`<text class="mxTextSomewhere" fill="${c}"`;
	if(o.centered)s+=` text-anchor="middle"`;
	// font-family and font-size are set in svg tag
	// bug, cannot use dominant-baseline:central everywhere
	// then just add 5 to y to center text vertically
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
	// compute h4ns
	nw=Math.floor(this.w/(4*ddd));
	if(nw<1)nw=1;
	nl=Math.ceil(km/nw);
	h4ns=nl*ddd;
	xo=(this.w-nw*4*ddd+ddd)/2;
	// always same width as the goban
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
	+`<desc id="${this.p.n}NotSeenDesc">${desc}</desc>`; // accessible?
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
// mxG.G section
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
						// ignore variations style
						// possible since "Variation" component not used in "Diagram"
						no2=this.scr.removeVariationDelimiters(no2);
						// display coordinates if _TB_, _TW_ or _ML
						// _TB_ and _TW_ are numerous when present, better to ignore them
						// _ML_ not present in "Diagram" since numberingOn=1
						if((no2=="_TB_")||(no2=="_TW_")||(no2=="_ML_"))no2="";
						// no2 is a stone number, or a label, or a mark, or ""
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
