// maxiGos v7 > mgosComment.js
if(!mxG.G.prototype.createComment)
{
mxG.fr("Comments","Commentaire");
mxG.fr("buildMove",function(k){return "Coup "+k;});
mxG.en("buildMove",function(k){return "Move "+k;});
mxG.G.prototype.getOneComment=function(aN)
{
	var c;
	if(this.hasC("Score")&&this.scoreInComment&&this.canPlaceScore) c=this.buildScore();
	else
	{
		c=aN.P.C?this.htmlProtect(aN.P.C[0]):"";
		if(c) c="<div class=\"mxP mxCommentP\">"+c+"</div>";
		if(this.hasC("Header")&&this.headerInComment&&(aN.Dad==this.rN))
			c=this.buildHeader()+c;
	}
	return c.replace(/\n/g,"<br>");
};
mxG.G.prototype.getComment=function()
{
	var aN=this.cN;
	if(this.allInComment)
	{
		var bN=this.rN,s="",c,k=0;
		while(bN=this.kidOnFocus(bN))
		{
			if(bN.P.B||bN.P.W) {k++;if((bN.P.B&&bN.Dad.P.B)||(bN.P.W&&bN.Dad.P.W)) k++;}
			else if(bN.P.AB||bN.P.AW||bN.P.AE) k=0;
			if(c=this.getOneComment(bN))
			{
				if(k) s+="<div class=\"mxMoveNumberDiv\">"+this.build("Move",k)+"</div>";
				s+=c;
			}
			if(bN==aN) break;
		}
		return s;
	}
	else return this.getOneComment(aN);
};
mxG.G.prototype.disableComment=function()
{
	var e=this.getE("CommentDiv");
	if(!e.hasAttribute("data-maxigos-disabled"))
	{
		e.setAttribute("data-maxigos-disabled","1");
		if(this.canCommentFocus) e.setAttribute("tabindex","-1");
	}
};
mxG.G.prototype.enableComment=function()
{
	var e=this.getE("CommentDiv");
	if(e.hasAttribute("data-maxigos-disabled"))
	{
		e.removeAttribute("data-maxigos-disabled");
		if(this.canCommentFocus) e.setAttribute("tabindex","0");
	}
};
mxG.G.prototype.isCommentDisabled=function()
{
	return this.getE("CommentDiv").hasAttribute("data-maxigos-disabled");
};
mxG.G.prototype.updateComment=function()
{
	var e=this.getE("CommentDiv");
	if(this.hasC("Solve")&&this.canPlaceSolve) return;
	if(this.cN.P.BM) e.className="mxCommentDiv mxBM";
	else if(this.cN.P.DO) e.className="mxCommentDiv mxDO";
	else if(this.cN.P.IT) e.className="mxCommentDiv mxIT";
	else if(this.cN.P.TE) e.className="mxCommentDiv mxTE";
	else e.className="mxCommentDiv";
	this.getE("CommentContentDiv").innerHTML=this.getComment();
	if(this.gBox) this.disableComment();else this.enableComment();
};
mxG.G.prototype.createComment=function()
{
	var s="",a="";
	this.headerInComment=this.setA("headerInComment",0,"bool");
	this.canCommentFocus=this.setA("canCommentFocus",0,"bool");
	this.commentLabelOn=this.setA("commentLabelOn",0,"bool");
	this.allInComment=this.setA("allInComment",0,"bool");
	// add tabindex="0" to this div if it can be scrolled (for keyboard navigation)
	a=this.canCommentFocus?" tabindex=\"0\"":"";
	if(this.commentLabelOn)
	{
		s+="<div class=\"mxCommentLabelDiv\" id=\""+this.n+"CommentLabelDiv\">";
		s+=this.local("Comments");
		s+="</div>";
	}
	s+="<div class=\"mxCommentDiv\" id=\""+this.n+"CommentDiv\""+a+">";
	s+="<div class=\"mxCommentContentDiv\" id=\""+this.n+"CommentContentDiv\">";
	s+="</div>";
	s+="</div>";
	return s;
};
}
