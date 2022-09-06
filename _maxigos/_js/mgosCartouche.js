// maxiGos v7 > mgosCartouche.js
if(!mxG.G.prototype.createCartouche)
{
mxG.fr("Black","Noir");
mxG.fr("White","Blanc");
mxG.fr("Rank","Niv.");
mxG.fr("Caps","Cap.");
mxG.G.prototype.drawImagesInCartouche=function(c)
{
	var e,in3dOn,n,o;
	if(!this.scr.w)
	{
		let z=this.k;
		setTimeout(function(){mxG.D[z].drawImagesInCartouche(c);},100);
		return;
	}
	if(this.prisonersOn&&this.bowlOn) n=this.gor.getPrisoners(c[0]);
	if(this.in3dOn==this[c+"LastIn3dOn"])
	{
		// just update prisoners num if this.bowlOn
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
			e.innerHTML=this.scr.makeAloneStone(c[0],"",o);
		}
	}
	if(this.prisonersOn)
	{
		e=this.getE(c+"PrisonersStoneSpan");
		if(e)
		{
			o={in3dOn:this.in3dOn,stoneShadowOn:this.stoneShadowOn};
			if(this.bowlOn) e.innerHTML=this.scr.makeBowlAndCap(c[0],n?n:"",o);
			else e.innerHTML=this.scr.makeAloneStone((c[0]=="W")?"B":"W","",o);
		}
	}
	this[c+"LastIn3dOn"]=this.in3dOn;
};
mxG.G.prototype.updateCartouche=function(c)
{
	var s,aPlayer,aRank;
	if(!this.cartoucheBoxOn) return;
	if(this.shortHeaderOn)
	{
		aPlayer=this.getInfoS("P"+c[0]);
		if(!aPlayer) aPlayer=this.local(c);
		this.getE(c+"PlayerDiv").innerHTML=aPlayer;
		aRank=this.getInfoS(c[0]+"R");
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
	var s="";
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
