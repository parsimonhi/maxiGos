// maxiGos v8 > mgosVersion.js
if(!mxG.G.prototype.createVersion)
{
mxG.G.prototype.createVersion=function()
{
	this.versionBoxOn=this.setA("versionBoxOn",0,"bool");
	if(this.versionBoxOn)
		return `<div class="mxVersionBox" id="${this.n}VersionBox">maxiGos ${mxG.V}</div>`;
	return "";
}
}
