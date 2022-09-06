// maxiGos v7 > mgosMenu.js
if(!mxG.G.prototype.createMenu)
{
mxG.fr("File","Fichier");
mxG.fr("Edit","Édition");
mxG.fr("View","Affichage");
mxG.fr("Window","Fenêtre");
mxG.fr("Untitled","SansTitre");
mxG.G.prototype.toggleMenu=function(m,s)
{
	var t;
	if(this.toggleMenuTimeout)
	{
		clearTimeout(this.toggleMenuTimeout);
		this.toggleMenuTimeout=0;
	}
	if(s)
	{
		let z=this.k;
		t=this.menuTimeout;
		this.currentMenu=m;
		this.getE(m+"SubMenuDiv").style.display="block";
		this.toggleMenuTimeout=setTimeout(function(){mxG.D[z].toggleMenu(m,0);},t);
	}
	else
	{
		this.currentMenu="";
		this.getE(m+"SubMenuDiv").style.display="none";
	}
};
mxG.G.prototype.doMenu=function(m)
{
	var c=this.currentMenu;
	if(this.gBox) this.hideGBox(this.gBox);
	else if(this.hasC("Score")&&this.canPlaceScore) this.toggleScore();
	if(c) {this.toggleMenu(c,0);if(m==c) return;}
	this.toggleMenu(m,1);
	this.updateAll(); // to update enabled/disabled elements
};
mxG.G.prototype.doFile=function(){this.doMenu("File");};
mxG.G.prototype.doEdit=function(){this.doMenu("Edit");};
mxG.G.prototype.doView=function(){this.setViewCoche();this.doMenu("View");};
mxG.G.prototype.doSwitchWindow=function(k)
{
	this.toggleMenu("Window",0);
	this.rN.cN=this.cN;
	this.rN=this.rNs[k];
	this.backNode(this.rN.cN?this.rN.cN:this.rN.Kid[0]);
	if(this.hasC("Tree")) this.hasToSetTree=1;
	this.updateAll();
};
mxG.G.prototype.doWindow=function()
{
	var k,km,s="",b={};
	km=this.rNs.length;
	for(k=0;k<km;k++)
	{
		b.n="Win"+k;
		if(this.rNs[k].sgf) b.v=this.rNs[k].sgf.replace(/\.sgf$/,"");
		else b.v=this.local("Untitled");
		s+="<button class=\"mxBtn"+((this.rNs[k]==this.rN)?" mxCoched":" mxCochable")+"\" type=\"button\" autocomplete=\"off\" id=\""+this.n+b.n+"Btn\" onclick=\""+this.g+".doSwitchWindow("+k+");\">";
		s+="<span>"+b.v+"</span>";
		s+="</button>";
	}
	this.getE("WindowSubMenuDiv").innerHTML=s;
	this.doMenu("Window");
};
mxG.G.prototype.initMenu=function()
{
	var e,list,k,km,z=this.k,n=[];
	e=this.getE("MenuDiv");
	list=e.querySelectorAll(".mxBtn");
	km=list.length;
	for(k=0;k<km;k++)
	{
		let n=list[k].id.replace(/^[^0-9]+[0-9]+(.*)Btn/,"$1");
		list[k].addEventListener("click",function(){mxG.D[z]["do"+n]();},false);
	}
};
mxG.G.prototype.createMenu=function()
{
	var s="",a,m,k,km;
	this.menus=this.setA("menus","","string");
	this.menuTimeout=this.setA("menuTimeout",10000,"int");
	if(!this.menus) return s;
	a=this.menus.split(/[\s]*[,][\s]*/);
	km=a.length;
	s+="<div class=\"mxMenuDiv\" id=\""+this.n+"MenuDiv\">";
	for(k=0;k<km;k++)
	{
		m=a[k];
		s+="<div class=\"mxOneMenuDiv\" id=\""+this.n+m+"MenuDiv\">";
		s+=this.buildBtn({n:m,v:this.local(m)});
		s+="<div class=\"mxSubMenuDiv\" id=\""+this.n+m+"SubMenuDiv\">";
		if(this["build"+m+"Btns"]) s+=this["build"+m+"Btns"]();
		s+="</div></div>";
	}
	s+="</div>";
	return s;
};
}
