// maxiGos v8 > mgosImage.js
if(!mxG.G.prototype.createImage)
{
mxG.fr(" Close ","Fermer");
mxG.fr("PNG","PNG");
mxG.fr("SVG","SVG");
mxG.fr("PNG image of the goban","Image PNG du goban");
mxG.fr("SVG image of the goban","Image SVG du goban");
mxG.G.prototype.b64EncodeUnicode=function(str)
{
	return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
		function toSolidBytes(match,p1){return String.fromCharCode('0x'+p1);}));
}
mxG.G.prototype.svgToDataURL=function(b)
{
	let e1,e2,a,r=2,z,e,s,v,rect1,rect2,mark1,mark2,list;
	e1=this.getE("GobanSvg");
	e2=e1.cloneNode(true);
	// get some css properties and put it in the svg image as attributes
	rect1=e1.querySelector(".mxWholeRect");
	if(rect1)
	{
		s=window.getComputedStyle(rect1,null);
		v=s.getPropertyValue("fill");
		rect2=e2.querySelector(".mxWholeRect");
		rect2.setAttributeNS(null,"fill",v);
	}
	mark1=e1.querySelector(".mxMarkOnLast");
	if(mark1)
	{
		s=window.getComputedStyle(mark1,null);
		v=s.getPropertyValue("fill");
		mark2=e2.querySelector(".mxMarkOnLast");
		mark2.setAttributeNS(null,"fill",v);
		v=s.getPropertyValue("stroke");
		mark2.setAttributeNS(null,"stroke",v);
	}
	// ignore all styles
	if(b)
	{
		// set width and height to actual svg width and height (png)
		e2.setAttribute("width",b.width*r+"");
		e2.setAttribute("height",b.height*r+"");
	}
	else
	{
		e2.removeAttribute("width");
		e2.removeAttribute("height");
	}
	// clean svg
	e2.removeAttribute("id");
	e2.removeAttribute("aria-labelledby");
	e2.removeAttribute("aria-label");
	e2.removeAttribute("aria-live");
	e2.removeAttribute("role");
	e2.removeAttribute("tabindex");
	a=e2.querySelectorAll("g[id]");
	if(a)for(e of a)e.removeAttribute("id");
	a=e2.querySelectorAll(".mxFocus,title,desc");
	if(a)for(e of a)e.remove();
	a=e2.querySelectorAll("[aria-hidden]");
	if(a)for(e of a)e.removeAttribute("aria-hidden");
	z=e2.outerHTML;
	z=z.replace(/ class="[^"]*"/g,"");
	// some applications (such as OpenOffice in 2024) still need to use xlink:href
	// instead of href for the svg <image> tag to specify a goban background
	z=z.replace(/ href=/g," xlink:href=");
	z=z.replace(/><\/(rect|circle|path|image|stop)>/g,"/>");
	z=z.replace(/<rect fill="none" stroke="none"[^>]*>/g,"");
	return "data:image/svg+xml;base64,"+this.b64EncodeUnicode(z);
}
mxG.G.prototype.doSvg=function()
{
	let b=this.getE("GobanSvg").getBoundingClientRect(),
		s=`<h1 tabindex="0">${this.local("SVG image of the goban")}</h1>`
		+`<img alt="${this.local("SVG image of the goban")}" id="${this.n}SvgImg"`
		+` width="${b.width}" height="${b.height}"`
		+` src="${this.svgToDataURL(null)}">`;
	this.doDialog("ShowSvg",s,[{n:" Close "}]);
}
mxG.G.prototype.doPng=function()
{
	let img,png,r=2,k=this.k,s,src;
	src=`data:image/svg+xml,<svg xmlns='${this.scr.xmlnsUrl}'/>`; // require ' and not "
	s=`<h1 tabindex="0">${this.local("PNG image of the goban")}</h1>`
	+`<img alt="${this.local("PNG image of the goban")}" id="${this.n}PngImg" src="${src}">`;
	this.doDialog("ShowPng",s,[{n:" Close "}]);
	png=this.getE("PngImg");
	img=new Image();
	img.onload=function()
	{
		let canvas=document.createElement('canvas'),w=img.width,h=img.height;
		png.width=w/r;
		png.height=h/r;
		canvas.width=w;
		canvas.height=h;
		// bug Safari?: svg <image> not drawn in the canvas
		//		the first time it is used,
		//		or if Safari is restarted
		// use a setTimeout() as a dirty work-around
		setTimeout(function(){
				canvas.getContext('2d').drawImage(img,0,0);
				png.src=canvas.toDataURL("image/png");
			},1);
	}
	img.src=this.svgToDataURL(this.getE("GobanSvg").getBoundingClientRect());
}
mxG.G.prototype.initPng=function()
{
	if(this.pngBtnOn)this.addBtnClickListener("Png");
}
mxG.G.prototype.initSvg=function()
{
	if(this.svgBtnOn)this.addBtnClickListener("Svg");
}
mxG.G.prototype.createPng=function()
{
	this.pngBtnOn=this.setA("pngBtnOn",0,"bool");
	this.pngAlias=this.setA("pngAlias",null,"string");
	return this.pngBtnOn?this.createBtn("Png","PNG"):"";
}
mxG.G.prototype.createSvg=function()
{
	this.svgBtnOn=this.setA("svgBtnOn",0,"bool");
	this.svgAlias=this.setA("svgAlias",null,"string");
	return this.svgBtnOn?this.createBtn("Svg","SVG"):"";
}
mxG.G.prototype.createImage=function()
{
	// no need to add the "Image" component in the makers since it does nothing
	// just here because there are some code common to "Png" and "Svg" components
	return ``;
}
}
