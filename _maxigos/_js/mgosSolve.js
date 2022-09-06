// maxiGos v7 > mgosSolve.js
if(!mxG.G.prototype.createSolve)
{
mxG.fr("Retry","Recommencer tout");
mxG.fr("Undo","Reprendre un coup");
mxG.fr("Hint","Montrer la suite");
mxG.fr("_initialMessage_","À Noir de jouer !");
mxG.fr("_nowhereMessage_","Hum !");
mxG.fr("_successMessage_","Bravo !");
mxG.fr("_failMessage_","Raté !");
mxG.fr("_forbiddenMessage_","Interdit !");
mxG.fr("_offpathMessage_","Non prévu !");
mxG.fr("_endMessage_","Terminé !");
mxG.en("_initialMessage_","Black to play!");
mxG.en("_nowhereMessage_","Hum!");
mxG.en("_successMessage_","Success!");
mxG.en("_failMessage_","Fail!");
mxG.en("_forbiddenMessage_","Forbidden!");
mxG.en("_offpathMessage_","Off path!");
mxG.en("_endMessage_","End!");
mxG.G.prototype.setSFocus=function(b)
{
	var a,e,g;
	a=document.activeElement;
	g=this.ig;
	if(g==a) return;
	e=this.getE(b+"Btn");
	if(e&&!e.disabled&&(a==e)) return;
	this.getE("SolveDiv").focus();
};
mxG.G.prototype.hasMessage=function(s)
{
	if(mxG.Z[this.lang])
		return mxG.Z[this.lang]["_"+s+"Message_"];
	return "";
};
mxG.G.prototype.doUndo=function()
{
	var aN=this.cN;
	// if something is strange (case of aN with no move)
	// simplify and go back to the beginning
	if((aN.Dad==this.rN)||(!aN.P["B"]&&!aN.P["W"])) {this.doRetry();return;}
	// aN has "B" or "W" and his parent is not this.rN
	// undo the last move whatever its color
	aN=aN.Dad;
	if(this.cN.P[this.oC]&&!this.cN.Add)
	{
		if(aN.P[this.uC]) {aN=aN.Dad;} // else extra virtual move
	}
	// else the user placed the last move
	this.backNode(aN);
	this.updateAll();
	this.setSFocus("Undo");
};
mxG.G.prototype.doRetry=function()
{
	this.backNode(this.kidOnFocus(this.rN));
	this.updateAll();
	this.setSFocus("Retry");
};
mxG.G.prototype.doHint=function()
{
	if(this.cN.Kid.length)
	{
		if(!this.uC) this.setPl();
		if(this.cN.Kid[0].P[this.uC])
		{
			let s=this.cN.Kid[0].P[this.uC][0];
			if(s.length==2)
			{
				x=s.c2n(0);
				y=s.c2n(1);
				// replace B[tt] by B[] and W[tt] by W[]
				// excepted if goban is larger than 19x19
				if((this.DX<=19)&&(this.DY<=19)&&(x==20)&&(y==20)) {x=0;y=0;}
			}
			else {x=0;y=0;}
		}
		else {x=0;y=0;} // Tenuki
		this.checkSolve(x,y);
		this.setSFocus("Hint");
	}
};
mxG.G.prototype.addExtraPlay=function(nat,x,y,tenuki)
{
	var aN,v=this.xy2s(x,y),bN=this.kidOnFocus(this.cN),cN;
	if(bN)
	{
		this.zN=bN.Clone(null);
	}
	if(tenuki||!bN)
	{
		aN=new mxG.N(this.cN,nat,v);
		this.cN.Focus=this.cN.Kid.length;
		if(!bN) aN.Add=1;
	}
	else
	{
		aN=this.cN;
		this.zN.P[nat]=[v];
	}
	if(bN)
	{
		this.zN.Dad=aN;
		aN.Kid[aN.Kid.length]=this.zN;
		aN.Focus=aN.Kid.length;
	}
	this.placeNode();
	if(this.hasC("Tree")) this.hasToSetTree=1;
};
mxG.G.prototype.updateVirtualComment=function(s)
{
	var c,span=s.ucFirst()+"Span";
	c="<span class=\"mx"+span+"\" id=\""+this.n+span+"\">"+this.local("_"+s+"Message_")+"</span>";
	if(this.hasC("Comment")) this.getE("CommentContentDiv").innerHTML=c;
};
mxG.G.prototype.updateSolveComment=function()
{
	var c,s,e;
	if(!this.hasC("Comment")) return;
	e=this.getE("CommentDiv");
	if(this.cN.P.BM) e.className="mxCommentDiv mxBM";
	else if(this.cN.P.DO) e.className="mxCommentDiv mxDO";
	else if(this.cN.P.IT) e.className="mxCommentDiv mxIT";
	else if(this.cN.P.TE) e.className="mxCommentDiv mxTE";
	else e.className="mxCommentDiv";
	c=this.getOneComment(this.cN);
	if(c) this.getE("CommentContentDiv").innerHTML=c;
	else
	{
		this.getE("CommentContentDiv").innerHTML="";
		if((this.cN.Dad==this.rN)&&this.hasMessage("initial"))
			this.updateVirtualComment("initial");
		else if(this.cN.Add&&this.hasMessage("offpath"))
			this.updateVirtualComment("offpath");
		else if(!this.cN.Focus)
		{
			s="";
			if(this.cN.P[this.uC]&&this.hasMessage("success")) s="success";
			else if(this.cN.P[this.oC]&&this.hasMessage("fail")) s="fail";
			if(s) this.updateVirtualComment(s);
		}
	} 
};
mxG.G.prototype.doVirtualNext=function()
{
	if(this.cN.Kid.length&&!this.kidOnFocus(this.cN).P[this.uC])
	{
		this.placeNode();
		this.updateAll();
	}
};
mxG.G.prototype.doSolve=function(a,b)
{
	var x,y,s,aN=this.cN,bN,k=0,km=aN.Kid.length,kz=-1,nat,tenuki=0;
	if(km) do
	{
		bN=aN.Kid[k];
		x=-9;
		y=-9;
		if(bN)
		{
			if(bN.P[this.uC]||(bN.P[this.oC]&&aN.Add))
			{
				s=bN.P[bN.P[this.uC]?this.uC:this.oC][0];
				if(s.length==2)
				{
					x=s.c2n(0);
					y=s.c2n(1);
					// replace B[tt] by B[] and W[tt] by W[]
					// excepted if goban is larger than 19x19
					if((this.DX<=19)&&(this.DY<=19)&&(x==20)&&(y==20)) {x=0;y=0;}
				}
				else {x=0;y=0;}
			}
			else if((bN.P[this.oC]&&!aN.Add)&&(kz<0))
			{
				tenuki=1;
				kz=k;
			}
		}
		if((x==a)&&(y==b))
		{
			aN.Focus=k+1;
			this.placeNode();
			this.updateAll();
			if(this.cN.Kid.length&&!this.kidOnFocus(this.cN).Add)
			{
				if(this.animatedStoneOn) this.doVirtualNext();
				else
				{
					let z=this.k;
					setTimeout(function(){mxG.D[z].doVirtualNext();},200);
				}
			}
			return;
		}
		else if(this.specialMoveMatch&&(kz<0))
		{
			switch(this.specialMoveMatch)
			{
				case 1: if(x&&y&&!this.gor.inGoban(x,y)) kz=k;
						break; // match because outside move found in sgf
				case 2: if(x&&y&&!this.inView(x,y)) kz=k;
						break; // match because outside or hidden move found in sgf
				case 3: if(!this.inView(x,y)) kz=k;
						break; // match because outside or hidden or pass move found in sgf
			}
		}
		// check all kids anyway
		k++;
	}
	while(k<km);
	// the user didn't find any moves
	nat=this.cN.P[this.uC]?this.oC:this.uC;
	if(this.gor.isValid(nat,a,b))
	{
		kz++;
		if(kz||this.canPlaceExtra)
		{
			// "elsewhere" move information was found in the sgf, or can place variation
			// place user move as is
			aN.Focus=kz; // ok even if !kz
			this.addExtraPlay(nat,a,b,tenuki);
			this.updateAll();
			if(kz && this.cN.Focus)
			{
				if(this.animatedStoneOn) this.doVirtualNext();
				else
				{
					let z=this.k;
					setTimeout(function(){mxG.D[z].doVirtualNext();},200);
				}
			}
			return;
		}
		else if(this.hasMessage("nowhere")) this.updateVirtualComment("nowhere");
	}
	else if(this.hasMessage("forbidden")) this.updateVirtualComment("forbidden");
	this.plonk();
};
mxG.G.prototype.checkSolve=function(x,y)
{
	var aN=this.cN,bN,k,km=aN.Kid.length;
	if(!this.uC) this.setPl();
	if(km)
	{
		for(k=0;k<km;k++)
		{
			bN=aN.Kid[k];
			if(bN.P[this.uC]||bN.P[this.oC]) {this.doSolve(x,y);return;}
		}
		// no "B" or "W" properties in continuation nodes
		// don't happen if the sgf is "normal"
		// just place onfocus kid then wait for another user click
		this.placeNode();
		this.updateAll();
	}
	else
	{
		if(this.canPlaceExtra) this.doSolve(x,y);
		else
		{
			if(this.hasMessage("end")) this.updateVirtualComment("end");
			this.plonk(); // sgf end
		}
	}
};
mxG.G.prototype.doClickSolve=function(ev)
{
	var c;
	if(this.isGobanDisabled()) return;
	if(this.canPlaceSolve)
	{
		c=this.scr.getC(ev);
		if(!this.inView(c.x,c.y)) {this.plonk();return;}
		this.checkSolve(c.x,c.y);
	}
};
mxG.G.prototype.doKeydownGobanForSolve=function(ev)
{
	var c;
	if(this.isGobanDisabled()) return;
	if(this.canPlaceSolve&&this.gobanFocusVisible)
	{
		c=mxG.getKCode(ev);
		if((c==13)||(c==32))
		{
			this.checkSolve(this.xFocus,this.yFocus);
			ev.preventDefault();
		}
		else if(c==187)
		{
			this.checkSolve(0,0);
			ev.preventDefault();
		}
	}
};
mxG.G.prototype.doKeydownSolve=function(ev)
{
	var r=0,s=ev.shiftKey?1:0;
	switch(mxG.getKCode(ev))
	{
		case 36:case 70:
			if(this.cN.Dad!=this.rN) {this.doRetry();r=1;} break;
		case 37:case 72:
			if(this.cN.Dad!=this.rN) {this.doUndo();r=1;} break;
		case 187:
			if(this.hasC("Pass")) {this.doPass2();r=5;} break;
	}
	if(r) ev.preventDefault();
};
mxG.G.prototype.updateSolve=function()
{
	if(this.cN.Dad==this.rN)
	{
		this.disableBtn("Retry");
		this.disableBtn("Undo");
	}
	else
	{
		this.enableBtn("Retry");
		this.enableBtn("Undo");
	}
	if(this.cN.Kid.length) this.enableBtn("Hint");
	else this.disableBtn("Hint");
	this.updateSolveComment();
};
mxG.G.prototype.initSolve=function()
{
	var e,k=this.k,b,bm,bk;
	this.ig.getMClick=mxG.getMClick;
	this.ig.addEventListener("click",
		function(ev){mxG.D[k].doClickSolve(ev);},false);
	if(this.canGobanFocus)
		this.ig.addEventListener("keydown",
			function(ev){mxG.D[k].doKeydownGobanForSolve(ev);},false);
	e=this.getE("SolveDiv");
	e.addEventListener("keydown",function(ev){mxG.D[k].doKeydownSolve(ev);},false);
	b=this.solves;
	bm=b.length;
	for(bk=0;bk<bm;bk++)
	{
		if(b[bk]=="Retry")
		{
			if(this.oldSolveBtnOn)
				this.addBtn(e,{n:"Retry",v:this.scr.makeFirstBtn(),t:this.local("Retry")});
			else
				this.addBtn(e,{n:"Retry",v:this.scr.makeRetryBtn(),t:this.local("Retry")});
		}
		else if(b[bk]=="Undo")
		{
			if(this.oldSolveBtnOn)
				this.addBtn(e,{n:"Undo",v:this.scr.makePredBtn(),t:this.local("Undo")});
			else
				this.addBtn(e,{n:"Undo",v:this.scr.makeUndoBtn(),t:this.local("Undo")});
		}
		else if(b[bk]=="Hint")
		{
			if(this.oldSolveBtnOn)
				this.addBtn(e,{n:"Hint",v:this.scr.makeNextBtn(),t:this.local("Hint")});
			else
				this.addBtn(e,{n:"Hint",v:this.scr.makeHintBtn(),t:this.local("Hint")});
		}
		else if((b[bk]=="Pass")&&this.hasC("Pass"))
			this.addBtn(e,{n:"Pass",v:this.scr.makePassBtn(),t:this.local("Pass")});
	}
};
mxG.G.prototype.createSolve=function()
{
	var s="",a=["Retry","Undo"];
	this.canPlaceSolve=this.setA("canPlaceSolve",1,"bool");
	this.oldSolveBtnOn=this.setA("oldSolveBtnOn",0,"bool");
	this.solves=this.setA("solves",a,"list");
	// set specialMoveMatch parameter to manage tenuki
	this.specialMoveMatch=this.setA("specialMoveMatch",0,"int");
	s+="<div class=\"mxSolveDiv\" id=\""+this.n+"SolveDiv\"";
	s+=" tabindex=\"-1\"";
	s+="></div>";
	return s;
};
}
