// maxiGos v8 > mgosComment.js
if(!mxG.G.prototype.createComment)
{
mxG.fr("Comments","Commentaire");
mxG.fr("No comment!","Sans commentaire !");
mxG.fr("buildMove",k=>"Coup "+k);
mxG.en("buildMove",k=>"Move "+k);
mxG.G.prototype.getCoreComment=function(aN)
{
	return aN.P.C?aN.P.C[0].noT():"";
}
mxG.G.prototype.getOneComment=function(aN)
{
	let c;
	if(this.hasC("Score")&&this.scoreInComment&&this.canPlaceScore)c=this.buildScore();
	else
	{
		c=this.getCoreComment(aN).replace(/^\s+/,"");
		if(c)c="<p>"+c.replace(/\n/g,"<br>")+"</p>";
		if(this.hasC("Header")&&this.headerInComment&&(aN.Dad==this.rN)) c=this.buildHeader()+c;
	}
	return c;
}
mxG.G.prototype.getComment=function()
{
	let aN=this.cN,s="";
	if(this.allInComment)
	{
		let bN=this.rN,c,k=0;
		while(bN=this.kidOnFocus(bN))
		{
			if(bN.P.B||bN.P.W){k++;if((bN.P.B&&bN.Dad.P.B)||(bN.P.W&&bN.Dad.P.W))k++;}
			else if(bN.P.AB||bN.P.AW||bN.P.AE)k=0;
			if(c=this.getOneComment(bN))
			{
				if(k)s+=`<span class="mxMoveNumber">${this.build("Move",k)} </span>`;
				s+=c;
			}
			if(bN==aN)break;
		}
	}
	else s=this.getOneComment(aN);
	return s;
}
mxG.G.prototype.doKeydownComment=function(ev)
{
	let r;
	if(ev.metaKey||ev.ctrlKey||ev.altKey)return;
	if(ev.key.match(/^[bitv]$/i))this.doAlphaKeydown(ev);
}
mxG.G.prototype.updateComment=function()
{
	if(this.hasC("Solve")&&this.canPlaceSolve)return;
	let e=this.getE("CommentBox");
	if(this.cN.P.BM)e.className="mxCommentBox mxBM";
	else if(this.cN.P.DO)e.className="mxCommentBox mxDO";
	else if(this.cN.P.IT)e.className="mxCommentBox mxIT";
	else if(this.cN.P.TE)e.className="mxCommentBox mxTE";
	else e.className="mxCommentBox";
	this.getE("CommentContent").innerHTML=this.getComment();
}
mxG.G.prototype.initComment=function()
{
	let k=this.k;
	this.getE("CommentBox").addEventListener("keydown",function(ev){
		mxG.D[k].doKeydownComment(ev);});
}
mxG.G.prototype.createComment=function()
{
	let s,a,b;
	this.headerInComment=this.setA("headerInComment",0,"bool");
	this.allInComment=this.setA("allInComment",0,"bool");
	// add tabindex="0" to be able to scroll it (for keyboard navigation)
	// and to focus it when the user enters "c" when another major component on focus
	a=` tabindex="0"`;
	b=` data-name="${this.local("Comments")}"`;
	s=`<div class="mxCommentBox" id="${this.n}CommentBox"${a+b}>`;
	// because of tabindex="0", use role="group" and aria-live="off"
	// to prevent the comment to be read twice in some circumstances
	// for instance, when chrome + voiceOver + using ctrl+alt+A
	a=` role="group" aria-live="off"`;
	return s+`<div class="mxCommentContent" id="${this.n}CommentContent"${a}></div></div>`;
}
}
