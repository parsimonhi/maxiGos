// maxiGos v8 > mgosVariation.js
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
	// get color from PL
	aN=this.cN;
	if(aN.P.PL)return aN.P.PL[0];
	// get color of this.kidOnFocus(this.cN)
	aN=this.kidOnFocus(this.cN);
	if(aN)
	{
		if(aN.P.B)return "B";
		if(aN.P.W)return "W";
	}
	// get opposite color of cN
	aN=this.cN;
	if(aN.P.B)return "W";
	if(aN.P.W)return "B";
	// get opposite color if cN has AB and no AW (handicap game?) or AW and no AB, 
	if(aN.P.AB&&!aN.P.AW)return "W";
	else if(aN.P.AW&&!aN.P.AB)return "B";
	// get color of cN children
	if(aN.Kid)for(bN of aN.Kid)
	{
		if(bN.P.B)return "B";
		if(bN.P.W)return "W";
	}
	// get opposite color of cN brothers
	for(bN of aN.Dad.Kid)
	{
		if(bN.P.B)return "W";
		if(bN.P.W)return "B";
	}
	// unable to decide who will play
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
	// (a,b) not in the sgf
	// don't add anything if(this.styleMode&1) since it leads to a mess
	if(this.styleMode&1){this.plonk();return;}
	this.addPlay(this.getVariationNextNat(),a,b);
	this.placeNode();
	if(this.hasC("Tree"))this.hasToSetTree=1;
	this.updateAll();
}
mxG.G.prototype.createVariation=function()
{
	// if canPlaceVariation is 1, canPlaceGuess is ignored
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
