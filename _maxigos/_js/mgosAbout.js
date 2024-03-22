// maxiGos v8 > mgosAbout.js
if(!mxG.G.prototype.createAbout)
{
mxG.fr("About","À propos");
mxG.fr(" Close ","Fermer");
mxG.fr("Source code:","Code source :");
mxG.fr("Theme:","Thème :");
mxG.fr("Configuration:","Configuration :");
mxG.fr("License:","Licence :");
mxG.fr("Copyright","Copyright");
mxG.G.prototype.buildAbout=function()
{
	let a,b,c,d,e,s;
	a=`<a href="https:/`+`/jeudego.org/maxiGos">maxiGos</a>`;
	b=this.theme;
	c=this.config;
	d=`<a href="https:/`+`/opensource.org/licenses/BSD-3-Clause">BSD</a>`;
	e=`1998-${mxG.Y} ${mxG.C}`;
	s=`<h1 tabindex="0">maxiGos ${mxG.V}</h1>`
	+`<p>${this.local("Source code:")} ${this.alias(a,"aboutSourceCodeAlias")}</p>`
	+`<p>${this.local("Theme:")} ${this.alias(b,"aboutThemeAlias")}</p>`
	+`<p>${this.local("Configuration:")} ${this.alias(c,"aboutConfigAlias")}</p>`
	+`<p>${this.local("License:")} ${this.alias(d,"aboutLicenseAlias")}</p>`
	+`<p>${this.local("Copyright")} ${this.alias(e,"aboutCopyrightAlias")}</p>`;
	return s;
}
mxG.G.prototype.doAbout=function()
{
	this.doDialog("ShowAbout",this.buildAbout(),[{n:" Close "}]);
}
mxG.G.prototype.initAbout=function()
{
	if(this.aboutBtnOn)this.addBtnClickListener("About");
}
mxG.G.prototype.createAbout=function()
{
	this.aboutBtnOn=this.setA("aboutBtnOn",0,"bool");
	this.aboutAlias=this.setA("aboutAlias",null,"string");
	this.aboutSourceCodeAlias=this.setA("aboutSourceCodeAlias",null,"string");
	this.aboutThemeAlias=this.setA("aboutThemeAlias",null,"string");
	this.aboutConfigAlias=this.setA("aboutConfigAlias",null,"string");
	this.aboutLicenseAlias=this.setA("aboutLicenseAlias",null,"string");
	this.aboutCopyrightAlias=this.setA("aboutCopyrightAlias",null,"string");
	return this.aboutBtnOn?this.createBtn("About"):"";
}
}
