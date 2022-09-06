// maxiGos v7 > mgosAbout.js
if(!mxG.G.prototype.createAbout)
{
mxG.fr("About","À propos");
mxG.fr(" Close ","Fermer");
mxG.fr("Source code:","Code source :");
mxG.fr("Theme:","Thème :");
mxG.fr("Configuration:","Configuration :");
mxG.fr("License:","Licence :");
mxG.fr("Copyright","Copyright");
mxG.fr("About_Short","?");
mxG.en("About_Short","?");
mxG.G.prototype.doAbout=function()
{
	if(this.gBox=="ShowAbout"){this.hideGBox("ShowAbout");return;}
	if(!this.getE("ShowAboutDiv"))
	{
		let s="",a,b,c,d,e,btn,z=this.k;
		a="http"+":"+"//jeudego.org/maxiGos";
		a="<a href=\""+a+"\">"+a+"</a>";
		b=this.theme;
		c=this.config;
		d="<a href=\"https"+":/"+"/opensource.org/licenses/BSD-3-Clause\">BSD</a>";
		e="1998-"+mxG.Y+" "+mxG.C;
		s+="<div class=\"mxShowContentDiv\" tabindex=\"0\">";
		s+="<h1>maxiGos "+mxG.V+"</h1>";
		s+="<p>"+this.local("Source code:")+" "+this.alias(a,"aboutSourceCodeAlias")+"</p>";
		s+="<p>"+this.local("Theme:")+" "+this.alias(b,"aboutThemeAlias")+"</p>";
		s+="<p>"+this.local("Configuration:")+" "+this.alias(c,"aboutConfigAlias")+"</p>";
		s+="<p>"+this.local("License:")+" "+this.alias(d,"aboutLicenseAlias")+"</p>";
		s+="<p>"+this.local("Copyright")+" "+this.alias(e,"aboutCopyrightAlias")+"</p>";
		s+="</div>";
		s+="<div class=\"mxOKDiv\">";
		s+="<button type=\"button\">";
		s+="<span>"+this.local(" Close ")+"</span>";
		s+="</button>";
		s+="</div>";
		this.createGBox("ShowAbout").innerHTML=s;
		btn=this.getE("ShowAboutDiv").querySelector(".mxOKDiv button");
		btn.addEventListener("click",function(){mxG.D[z].hideGBox('ShowAbout');},false);
	}
	this.showGBox("ShowAbout");
};
mxG.G.prototype.updateAbout=function()
{
	if(this.getE("AboutBtn"))
	{
		if(this.gBox=="ShowAbout") this.selectBtn("About");
		else this.unselectBtn("About");
	}
};
mxG.G.prototype.initAbout=function()
{
	if(this.aboutBtnOn)
		this.addBtn(this.getE("AboutDiv"),{n:"About",v:this.alias("About","aboutAlias")});
};
mxG.G.prototype.createAbout=function()
{
	this.aboutBtnOn=this.setA("aboutBtnOn",0,"bool");
	this.aboutAlias=this.setA("aboutAlias",null,"string");
	this.aboutSourceCodeAlias=this.setA("aboutSourceCodeAlias",null,"string");
	this.aboutThemeAlias=this.setA("aboutThemeAlias",null,"string");
	this.aboutConfigAlias=this.setA("aboutConfigAlias",null,"string");
	this.aboutLicenseAlias=this.setA("aboutLicenseAlias",null,"string");
	this.aboutCopyrightAlias=this.setA("aboutCopyrightAlias",null,"string");
	return this.createBtnBox("About");
};
}
