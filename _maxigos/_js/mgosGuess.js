// maxiGos v8 > mgosGuess.js
if(!mxG.G.prototype.createGuess)
{
mxG.fr("Guess-o-meter","Devinette");
mxG.G.prototype.updateGuessBar=function(dz)
{
	let dzm,pz,p,s;
	if(!this.guessBoxOn)return;
	if(!this.canPlaceGuess)dz=0;
	dzm=(this.DX+this.DY)>>1;
	pz=(dz<=0)?100:100-((dz>dzm)?100:(100*dz/dzm));
	pz=Math.round(Math.max(pz,0));
	// bug safari, need to replace the whole tag to make things working (2023-06-27)
	p=`min="0" max="100" low="0" high="0" optimum="100" value="${pz}"`;
	s=`<meter title="${this.local("Guess-o-meter")}" ${p}></meter>`;
	this.getE("GuessBox").innerHTML=s;
}
mxG.G.prototype.checkBW=function(aN,a,b)
{
	let s="",x,y;
	if(aN.P.B||aN.P.W)
	{
		if(aN.P.B)s=aN.P.B[0];else s=aN.P.W[0];
		if(s.match(/^[a-zA-Z]{2}$/)){x=s.c2n(0);y=s.c2n(1);}
		else x=y=0;
		return (x==a)&&(y==b);
	}
	return 0;
}
mxG.G.prototype.checkGuess=function(a,b)
{
	let aN,bN,k,km,s,x,y,dx,dy,dz=this.DX+this.DY;
	aN=this.cN;
	km=aN.Kid.length;
	if(!km){this.plonk();return;}
	for(k=0;k<km;k++)
	{
		bN=aN.Kid[k];
		
		x=-this.DX;
		y=-this.DY;
		if(!bN.Add&&(bN.P.B||bN.P.W))
		{
			s=bN.P[bN.P.B?"B":"W"][0];
			if(s.match(/^[a-zA-Z]{2}$/))
			{
				x=s.c2n(0);
				y=s.c2n(1);
				if(!this.inView(x,y)){x=0;y=0;}
			}
			else x=y=0;
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
}
mxG.G.prototype.updateGuess=function()
{
	this.updateGuessBar(this.cN.Add?100:0);
}
mxG.G.prototype.createGuess=function()
{
	this.guessBoxOn=this.setA("guessBoxOn",0,"bool");
	this.canPlaceGuess=this.setA("canPlaceGuess",0,"bool");
	// if canPlaceVariation is 1, canPlaceGuess is ignored
	if(this.canPlaceVariation)this.canPlaceGuess=0;
	if(this.guessBoxOn)return `<div class="mxGuessBox" id="${this.n}GuessBox"></div>`;
	return ``;
}
}
