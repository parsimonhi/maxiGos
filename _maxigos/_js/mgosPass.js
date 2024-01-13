// maxiGos v8 > mgosPass.js
if(!mxG.G.prototype.createPass)
{
mxG.fr("Pass","Passe");
mxG.G.prototype.doPass=function()
{
	if(this.hasC("Edit")) this.checkEditPlay(0,0);
	else if(this.hasC("Solve")&&this.canPlaceSolve) this.checkSolve(0,0);
	else if(this.hasC("Variation")&&this.canPlaceVariation) this.checkVariation(0,0);
	else if(this.hasC("Guess")) this.checkGuess(0,0);
};
mxG.G.prototype.isPass=function(aN)
{
	let s,x,y;
	if(aN.P["B"]||aN.P["W"])
	{
		s=(aN.P["B"]?aN.P["B"][0]:aN.P["W"][0]);
		if(s.length==2)
		{
			x=s.c2n(0);
			y=s.c2n(1);
			if((x<1)||(y<1)||(x>this.dimX)||(y>this.dimY)) {x=0;y=0;}
		}
		else {x=0;y=0;}
		return !(x||y);
	}
	return 0;
};
mxG.G.prototype.updatePass=function()
{
	let aN=0,k,km,status,look=0,s,e=this.getE("PassBtn");
	if(!e) return;
	status=this.isPass(this.cN)?1:0;
	if(!(this.styleMode&2))
	{
		if(this.styleMode&1) aN=this.cN.Dad;
		else aN=this.cN;
	}
	if(!this.hasC("Solve")||!this.canPlaceSolve)
	{
		if(aN)
		{
			km=aN.Kid.length;
			if(km)
			{
				if(this.styleMode&1) {if(km>1) look=1;}
				else look=1;
			}
		}
		if(look) for(k=0;k<km;k++) if(this.isPass(aN.Kid[k])) status=status|2;
	}
	aN=this.kidOnFocus(this.cN);
	if(aN&&this.isPass(aN)) status=status|4;
	s="mxBtn mxPassBtn";
	if(status&1) s+=" mxJustPlayedPassBtn";
	if(status&2) s+=" mxOnVariationPassBtn";
	if(status&4) s+=" mxOnFocusPassBtn";
	e.className=s;
	if(this.canPassOnlyIfPassInSgf)
	{
		if(status&2) this.enableBtn("Pass");
		else this.disableBtn("Pass");
	}
	else this.enableBtn("Pass");
};
mxG.G.prototype.initPass=function()
{
	if(this.passBtnOn)
	{
		let o={n:"Pass",v:this.alias("Pass","passAlias")},
			s=this.local("Pass");
		if(o.v!=s) o.t=s;
		this.addBtn(this.getE("PassDiv"),o);
	}
};
mxG.G.prototype.createPass=function()
{
	this.passBtnOn=this.setA("passBtnOn",0,"bool");
	this.passAlias=this.setA("passAlias",null,"string");
	this.canPassOnlyIfPassInSgf=this.setA("canPassOnlyIfPassInSgf",0,"bool");
	return this.passBtnOn?this.createBtnBox("Pass"):"";
};
}
