// maxiGos v7 > mgosGuess.js
if(!mxG.G.prototype.createGuess)
{
mxG.fr("Guess-o-meter","Devinette");
mxG.G.prototype.updateGuessBar=function(dz)
{
	var dzm,pz,bad,good;
	if(!this.guessBoxOn) return;
	if(!this.canPlaceGuess) dz=0;
	dzm=(this.DX+this.DY)>>1;
	bad=this.getE("GuessBad");
	good=this.getE("GuessGood");
	pz=(dz<=0)?1000:1000-((dz>dzm)?1000:((dz*1000)/dzm));
	good.setAttributeNS(null,"width",pz);
	bad.style.visibility=((pz==1000)?"hidden":"visible");
	good.style.visibility=((pz==1000)?"hidden":"visible");
};
mxG.G.prototype.checkBW=function(aN,a,b)
{
	var s="",x,y;
	if(aN.P.B||aN.P.W)
	{
		if(aN.P.B) s=aN.P.B[0];else s=aN.P.W[0];
		if(s.length==2) {x=s.c2n(0);y=s.c2n(1);}
		else {x=0;y=0;}
		return (x==a)&&(y==b);
	}
	return 0;
};
mxG.G.prototype.checkGuess=function(a,b)
{
	var aN,bN,k,km,s,x,y,dx,dy,dz=this.DX+this.DY;
	aN=this.cN;
	km=aN.Kid.length;
	if(!km) {this.plonk();return;}
	for(k=0;k<km;k++)
	{
		bN=aN.Kid[k];
		
		x=-this.DX;
		y=-this.DY;
		if(!bN.Add&&(bN.P.B||bN.P.W))
		{
			s=bN.P[bN.P.B?"B":"W"][0];
			if(s.length==2)
			{
				x=s.c2n(0);
				y=s.c2n(1);
				if(!this.inView(x,y)) {x=0;y=0;}
			}
			else {x=0;y=0;}
		}
		if((x==a)&&(y==b))
		{
			// well guessed, place the move
			if(this.canPlaceGuess)
			{
				aN.Focus=k+1;
				this.placeNode();
				this.updateAll();
			}
			else this.updateGuessBar(0);
			return;
		}
		else
		{
			if(!bN.Add&&x&&y)
			{
				if(a&&b)
				{
					dx=(((x-a)>0)?x-a:a-x);
					dy=(((y-b)>0)?y-b:b-y);
					dz=Math.min(dz,dx+dy);
				}
				else dz=(this.DX+this.DY)>>1;
			}
		}
	}
	this.updateGuessBar(dz);
};
mxG.G.prototype.doClickGuess=function(ev)
{
	var c;
	if(this.isGobanDisabled()) return;
	if(this.canPlaceGuess)
	{
		c=this.scr.getC(ev);
		if(!this.inView(c.x,c.y)) {this.plonk();return;}
		this.checkGuess(c.x,c.y);
	}
};
mxG.G.prototype.doKeydownGobanForGuess=function(ev)
{
	var c;
	if(this.canPlaceGuess&&this.gobanFocusVisible)
	{
		c=mxG.getKCode(ev);
		if((c==13)||(c==32))
		{
			this.checkGuess(this.xFocus,this.yFocus);
			ev.preventDefault();
		}
	}
};
mxG.G.prototype.updateGuess=function()
{
	this.updateGuessBar(this.cN.Add?100:0);
};
mxG.G.prototype.initGuess=function()
{
	var k=this.k;
	this.ig.getMClick=mxG.getMClick;
	this.ig.addEventListener("click",function(ev){mxG.D[k].doClickGuess(ev);},false);
	if(this.canGobanFocus)
		this.ig.addEventListener("keydown",
			function(ev){mxG.D[k].doKeydownGobanForGuess(ev);},false);
};
mxG.G.prototype.createGuess=function()
{
	var s="";
	this.guessBoxOn=this.setA("guessBoxOn",0,"bool");
	// if both canPlaceGuess and canPlaceVariation are 1, canPlaceGuess is ignored
	this.canPlaceGuess=this.setA("canPlaceGuess",0,"bool");
	if(this.canPlaceGuess&&this.canPlaceVariation) this.canPlaceGuess=0;
	if(this.guessBoxOn)
	{
		s+="<div class=\"mxGuessDiv\" id=\""+this.n+"GuessDiv\">";
		s+="<div class=\"mxGuessOMeterDiv\"";
		s+=" title=\""+this.local("Guess-o-meter")+"\"";
		s+=" id=\""+this.n+"GuessOMeterDiv\">";
		s+="<svg class=\"mxGuessSvg\" id=\""+this.n+"GuessSvg\"";
		s+=" viewBox=\"0 0 1000 20\"";
		s+=" width=\"100%\" height=\"100%\"";
		s+=" stroke-width=\"1\"";
		s+=">";
		s+="<rect class=\"mxGuessBar\" id=\""+this.n+"GuessBar\"";
		s+=" fill=\"#fff\"";
		s+=" stroke=\"#000\"";
		s+=" x=\"0.5\" y=\"0.5\" width=\"999\" height=\"19\">";
		s+="</rect>";
		s+="<rect class=\"mxGuessBad\" id=\""+this.n+"GuessBad\"";
		s+=" fill=\"#000\"";
		s+=" stroke=\"#000\"";
		s+=" x=\"0.5\" y=\"0.5\" width=\"999\" height=\"19\">";
		s+="</rect>";
		s+="<rect class=\"mxGuessGood\" id=\""+this.n+"GuessGood\"";
		s+=" fill=\"#fff\"";
		s+=" stroke=\"#000\"";
		s+=" x=\"0.5\" y=\"0.5\" width=\"999\" height=\"19\">";
		s+="</rect>";
		s+="</svg>";
		s+="</div>";
		s+="</div>";
	}
	return s;
};
}
