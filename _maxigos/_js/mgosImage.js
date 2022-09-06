// maxiGos v7 > mgosImage.js
if(!mxG.G.prototype.createImage)
{
mxG.fr("Close","Fermer");
mxG.G.prototype.svgToDataURL=function(b)
{
	var e1,e2,a,k,km,r=2,z,e,s,v,rect1,rect2,mark1,mark2;
	e1=this.getE("GobanSvg");
	e2=e1.cloneNode(true);
	// get some css properties and put it in the svg image as attributes
	rect1=e1.querySelector(".mxWholeRect");
	if(rect1)
	{
		s=window.getComputedStyle(rect1,null);
		v=s.getPropertyValue("fill");
		//alert("v="+v);
		//alert("mxWholeRect fill="+rect1.getAttributeNS(null,"fill"));
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
		// set width and height to 100% (svg)
		e2.setAttribute("width","100%");
		e2.setAttribute("height","100%");
	}
	// clean svg
	e2.removeAttribute("id");
	a=e2.querySelectorAll("g[id]");
	km=a.length;
	for(k=0;k<km;k++) a[k].removeAttribute("id");
	a=e2.querySelector(".mxFocus");
	if(a) a.parentNode.removeChild(a);
	z=e2.outerHTML;
	z=z.replace(/ class="[^"]*"/g,"");
	// some applications such as OpenOffice still need to use xlink:href (in 2021)
	if(this.xlink4hrefOn) z=z.replace(/ href=/g," xlink:href=");
	z=z.replace(/><\/(rect|circle|path|image|stop)>/g,"/>");
	z=z.replace(/<rect fill="none" stroke="none"[^>]*>/g,"");
	return "data:image/svg+xml;base64,"+mxG.b64EncodeUnicode(z);
};
mxG.G.prototype.doSvg=function()
{
	if(this.gBox=="ShowSvg"){this.hideGBox("ShowSvg");return;}
	if(!this.getE("ShowSvgDiv"))
	{
		let s="";
		s+="<div class=\"mxShowContentDiv\" tabindex=\"0\">";
		s+="<img id=\""+this.n+"SvgImg\">";
		s+="</div>";
		s+="<div class=\"mxOKDiv\">";
		s+="<button type=\"button\" onclick=\""+this.g+".hideGBox('ShowSvg')\"><span>"+this.local("Close")+"</span></button>";
		s+="</div>";
		this.createGBox("ShowSvg").innerHTML=s;
	}
	this.showGBox("ShowSvg");
	this.getE("SvgImg").src=this.svgToDataURL(null);
};
mxG.G.prototype.doPng=function()
{
	let img,png,b,r=2,k=this.k;
	b=this.getE("GobanSvg").getBoundingClientRect();
	if(this.gBox=="ShowPng"){this.hideGBox("ShowPng");return;}
	if(!this.getE("ShowPngDiv"))
	{
		let s="",
			dummyImg="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E";
		s+="<div class=\"mxShowContentDiv\" tabindex=\"0\">";
		// in theory, scr should be set to something
		s+="<img id=\""+this.n+"PngImg\" src=\""+dummyImg+"\">";
		s+="</div>";
		s+="<div class=\"mxOKDiv\">";
		s+="<button type=\"button\" onclick=\""+this.g+".hideGBox('ShowPng')\"><span>"+this.local("Close")+"</span></button>";
		s+="</div>";
		this.createGBox("ShowPng").innerHTML=s;
	}
	this.showGBox("ShowPng");
	png=this.getE("PngImg");
	img=new Image();
	img.onload=function()
	{
		var canvas=document.createElement('canvas'),
			w=img.width,
			h=img.height;
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
	img.src=this.svgToDataURL(b);
};
mxG.G.prototype.updateImage=function()
{
	if(this.getE("PngBtn"))
	{
		if(this.gBox=="ShowPng") this.selectBtn("Png");
		else this.unselectBtn("Png");
	}
	if(this.getE("SvgBtn"))
	{
		if(this.gBox=="ShowSvg") this.selectBtn("Svg");
		else this.unselectBtn("Svg");
	}
};
mxG.G.prototype.initImage=function()
{
	if(this.pngBtnOn)
		this.addBtn(this.getE("PngDiv"),{n:"Png",v:this.alias("PNG","pngAlias")});
	if(this.svgBtnOn)
		this.addBtn(this.getE("SvgDiv"),{n:"Svg",v:this.alias("SVG","svgAlias")});
};
mxG.G.prototype.createImage=function()
{
	var s="";
	this.xlink4hrefOn=this.setA("xlink4hrefOn",1,"bool"); // replace href by xlink:href
	this.pngBtnOn=this.setA("pngBtnOn",0,"bool");
	this.svgBtnOn=this.setA("svgBtnOn",0,"bool");
	this.pngAlias=this.setA("pngAlias",null,"string");
	this.svgAlias=this.setA("svgAlias",null,"string");
	s+=this.createBtnBox("Png");
	s+=this.createBtnBox("Svg");
	return s;
};
}
