// maxiGos v8 > mgosComment.js
if(!mxG.G.prototype.createComment)
{
mxG.fr("Comments","Commentaire");
mxG.fr("buildMove",function(k){return "Coup "+k;});
mxG.en("buildMove",function(k){return "Move "+k;});
mxG.G.prototype.getOneComment=function(aN)
{
	let c;
	if(this.hasC("Score")&&this.scoreInComment&&this.canPlaceScore) c=this.buildScore();
	else
	{
		c=aN.P.C?aN.P.C[0].noT():"";
		if(c) c="<p>"+c+"</p>";
		if(this.hasC("Header")&&this.headerInComment&&(aN.Dad==this.rN))
			c=this.buildHeader()+c;
	}
	return c.replace(/\n/g,"<br>");
};
mxG.G.prototype.getComment=function()
{
	let aN=this.cN;
	if(this.allInComment)
	{
		let bN=this.rN,s="",c,k=0;
		while(bN=this.kidOnFocus(bN))
		{
			if(bN.P.B||bN.P.W) {k++;if((bN.P.B&&bN.Dad.P.B)||(bN.P.W&&bN.Dad.P.W)) k++;}
			else if(bN.P.AB||bN.P.AW||bN.P.AE) k=0;
			if(c=this.getOneComment(bN))
			{
				if(k) s+="<span class=\"mxMoveNumberSpan\">"+this.build("Move",k)+" </span>";
				s+=c;
			}
			if(bN==aN) break;
		}
		return s;
	}
	else return this.getOneComment(aN);
};
mxG.G.prototype.updateComment=function()
{
	let e=this.getE("CommentDiv");
	if(this.hasC("Solve")&&this.canPlaceSolve) return;
	if(this.cN.P.BM) e.className="mxCommentDiv mxBM";
	else if(this.cN.P.DO) e.className="mxCommentDiv mxDO";
	else if(this.cN.P.IT) e.className="mxCommentDiv mxIT";
	else if(this.cN.P.TE) e.className="mxCommentDiv mxTE";
	else e.className="mxCommentDiv";
	this.getE("CommentContentDiv").innerHTML=this.getComment();
};
mxG.G.prototype.createComment=function()
{
	let s="",a="";
	this.headerInComment=this.setA("headerInComment",0,"bool");
	this.canCommentFocus=this.setA("canCommentFocus",0,"bool");
	this.commentCaptionOn=this.setA("commentCaptionOn",0,"bool");
	this.allInComment=this.setA("allInComment",0,"bool");
	// add tabindex="0" to this div if it can be scrolled (for keyboard navigation)
	a=this.canCommentFocus?" tabindex=\"0\"":"";
	s+="<div class=\"mxCommentDiv\" id=\""+this.n+"CommentDiv\""+a+">";
	if(this.commentCaptionOn)
	{
		s+="<div class=\"mxCommentCaptionDiv\" id=\""+this.n+"CommentCaptionDiv\">";
		s+=this.local("Comments");
		s+="</div>";
	}
	s+="<div class=\"mxCommentContentDiv\" id=\""+this.n+"CommentContentDiv\">";
	s+="</div>";
	s+="</div>";
	return s;
};
}
