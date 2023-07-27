// maxiGos v8 > tigerPatch.js

if(!mxG.G.prototype.createTigerComment){

mxG.fr("pass","passe");

mxG.G.prototype.removeTigerCommentMove=function(c)
{
	return c.replace(/^[0-9]*\s*:\s*([^\s])/,"$1").ucF();
};

mxG.G.prototype.doTigerCommentMoveClick=function(s)
{
	let aN=this.rN,k,km=s.length;
	for(k=0;k<km;k++) aN=aN.Kid[parseInt(s.charAt(k))-1];
	this.backNode(aN);
	this.updateAll();
};

mxG.G.prototype.buildTigerCommentMove=function(aN,k,l)
{	
	let c,s,x,y,r="",id=this.n+l+"Span",a=0;
	if(aN==this.cN) this.currentNodeRef=l;
	if(aN.P.B) {s=aN.P.B[0];c="<span class=\"mxTigerCommentCircleSpan mxBlack\">●</span>";} // ●
	else if(aN.P.W) {s=aN.P.W[0];c="<span class=\"mxTigerCommentCircleSpan mxWhite\">○</span>";} // ○
	else s="...";
	if(s!="...")
	{
		if(s.length)
		{
			x=s.c2n(0);
			y=s.c2n(1);
		}
		else {x=0;y=0;}
		r="<span class=\"mxTigerCommentNumberSpan\">"+k+"."+"</span>";
		r+="<span id=\""+id+"\" onclick=\""+this.g+".doTigerCommentMoveClick('"+l+"');\" class=\"mxTigerComment"+((aN!=this.cN)?"No":"")+"FocusSpan\">";
		r+=this.local(c);
		r+="<span class=\"mxTigerCommentCoordinatesSpan\">";
		if(x&&y) r+=""+this.scr.k2c(x)+this.scr.k2n(y);
		else r+=this.local("pass");
		r+="</span> ";
		r+="</span> ";
		a=1;
	}
	else if(aN.Dad!=this.rN)
	{
		r="<span id=\""+id+"\" onclick=\""+this.g+".doTigerCommentMoveClick('"+l+"');\" class=\"mxTigerComment"+((aN!=this.cN)?"No":"")+"FocusSpan\">";
		r+=s;
		r+="</span> ";
		a=2;
	}
	else r="<span id=\""+id+"\" style=\"position:absolute;\"> </span>";
	return a?"<span class=\"mxTigerComment"+((a==2)?"No":"")+"MoveSpan\">"+r+"</span> ":r;
};

mxG.G.prototype.getOneTigerComment=function(aN)
{
	let c=(aN.P.C?aN.P.C[0]:"");
	c=c.noT();
	if(this.hasC("Header")&&this.headerInComment&&(aN.Dad==this.rN)) c=this.buildHeader()+c;
	return c.replace(/\n/g,"<br>");
};

mxG.G.prototype.getAllTigerComment=function(dN,k,l,v)
{
	let aN,s="",c,ko,lo,k1=0,l1="",k2=0,l2="",m,mm;
	mm=dN.Kid.length;
	ko=k;
	lo=l;
	for(m=0;m<mm;m++)
	{
		k1=ko;
		l1=lo;
		if(v||(m>0)) s+="<div class=\"mxTigerCommentVariationDiv\">";
		else s+="<div class=\"mxTigerCommentMainDiv\">";
		aN=dN.Kid[m];
		if(aN.P.B||aN.P.W) {k1++;if((aN.P.B&&aN.Dad.P.B)||(aN.P.W&&aN.Dad.P.W)) k1++;}
		else if(aN.P.AB||aN.P.AW||aN.P.AE) k1=0;
		l1+=(((aN.Dad==dN)?m:0)+1);
		if(m==0) {k2=k1;l2=l1;}
		c=this.getOneTigerComment(aN);
		s+=this.buildTigerCommentMove(aN,k1,l1);
		if(c)
		{
			if(aN.Dad!=this.rN)
			{
				s+="</div><br>";
				s+="<div class=\"mxTigerComment"+((v||(m>0))?"Variation":"Main")+"TextDiv\">";
			}
			s+=this.removeTigerCommentMove(c);
		}
		s+="</div>";
		if(c||(!c&&!m&&(mm>1)&&!v)) s+="<br>";
		if((!v&&!m&&(mm==1))&&(aN.Kid.length)) s+=this.getAllTigerComment(aN,k1,l1,0);
		if(v||(m&&(mm>1)))
		{
			if(aN.Kid.length) s+=this.getAllTigerComment(aN,k1,l1,1);
			else if(!c) s+="<br>";
		}
	}
	if(!v&&(mm>1)) s+=this.getAllTigerComment(dN.Kid[0],k2,l2,0);
	return s;
};

mxG.G.prototype.getTigerComment=function()
{
	if(this.allInComment) return this.getAllTigerComment(this.rN,0,"",0);
	else return this.getOneTigerComment(this.cN);
};

mxG.G.prototype.updateTigerComment=function()
{
	let c="",e=this.getE("TigerCommentDiv"),f;
	if(this.hasC("Solve")&&this.canPlaceSolve) return;
	c=this.getTigerComment();
	if(this.cN.P.BM) e.className="mxTigerCommentDiv mxBM";
	else if(this.cN.P.DO) e.className="mxTigerCommentDiv mxDO";
	else if(this.cN.P.IT) e.className="mxTigerCommentDiv mxIT";
	else if(this.cN.P.TE) e.className="mxTigerCommentDiv mxTE";
	else e.className="mxTigerCommentDiv";
	this.getE("TigerCommentContentDiv").innerHTML=(c?c:"&nbsp;");
	if(this.currentNodeRef)
	{
		f=this.getE(this.currentNodeRef+"Span");
		if(f&&(f.offsetTop<e.scrollTop))
			e.scrollTop=f.offsetTop;
		if(f&&((f.offsetTop+3*f.getBoundingClientRect().height)>(e.scrollTop+e.getBoundingClientRect().height)))
			e.scrollTop=f.offsetTop;
	}
};

mxG.G.prototype.initTigerComment=function()
{
	this.getE("TigerCommentDiv").scrollTop=0;
};

mxG.G.prototype.createTigerComment=function()
{
	let s="",a;
	this.headerInComment=this.setA("headerInComment",0,"bool");
	this.canCommentFocus=this.setA("canCommentFocus",0,"bool");
	this.commentLabelOn=this.setA("commentLabelOn",0,"bool");
	this.allInComment=this.setA("allInComment",0,"bool");
	if(this.commentLabelOn)
	{
		s+="<div class=\"mxTigerCommentLabelDiv\" id=\""+this.n+"TigerCommentLabelDiv\">";
		s+=this.local("Comments");
		s+="</div>";
	}
	a=this.canCommentFocus?" tabindex=\"0\"":"";
	s+="<div class=\"mxTigerCommentDiv\" id=\""+this.n+"TigerCommentDiv\""+a+">";
	s+="<div class=\"mxTigerCommentContentDiv\" id=\""+this.n+"TigerCommentContentDiv\">";
	s+="</div>";
	s+="</div>";
	return s;
};
}
