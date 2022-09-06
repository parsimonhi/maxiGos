// maxiGos v7 > mgosVersion.js
if(!mxG.G.prototype.createVersion)
{
mxG.G.prototype.createVersion=function()
{
	var s="";
	this.versionBoxOn=this.setA("versionBoxOn",0,"bool");
	if(this.versionBoxOn)
	{
		s+="<div class=\"mxVersionDiv\" id=\""+this.n+"VersionDiv\">"
		s+="<span>maxiGos "+mxG.V+"</span></div>";
	}
	return s;
};
}
