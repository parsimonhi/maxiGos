// maxiGos v8 > mgosMenu.js
if(!mxG.G.prototype.createMenu)
{
mxG.fr("File","Fichier");
mxG.fr("Edit","Édition");
mxG.fr("View","Affichage");
mxG.fr("Window","Fenêtre");
mxG.fr("Untitled","SansTitre");
mxG.G.prototype.toggleMenu=function(m,s)
{
	let t;
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
		this.getE(m+"SubMenuDiv").classList.add("mxSubMenuOpen");
		this.toggleMenuTimeout=setTimeout(function(){mxG.D[z].toggleMenu(m,0);},t);
	}
	else
	{
		this.currentMenu="";
		this.getE(m+"SubMenuDiv").classList.remove("mxSubMenuOpen");
	}
};
mxG.G.prototype.closeMenus=function()
{
	let a=this.menus;
	for(let k=0;k<a.length;k++) this.toggleMenu(a[k],0);
}
mxG.G.prototype.doMenu=function(m)
{
	let c=this.currentMenu;
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
	let k,s="",b={},items,z=this.k;
	for(let k=0;k<this.rNs.length;k++)
	{
		b.n="Win"+k;
		if(this.rNs[k].sgf) b.v=this.rNs[k].sgf.replace(/\.sgf$/,"");
		else b.v=this.local("Untitled");
		s+="<button class=\"mxBtn"+((this.rNs[k]==this.rN)?" mxCoched":" mxCochable")+"\" type=\"button\" autocomplete=\"off\" id=\""+this.n+b.n+"Btn\">";
		s+="<span>"+b.v+"</span>";
		s+="</button>";
	}
	this.getE("WindowSubMenuDiv").innerHTML=s;
	items=this.getE("WindowSubMenuDiv").querySelectorAll('.mxBtn');
	for(let k=0;k<items.length;k++)
		items[k].addEventListener("click",function(){mxG.D[z].doSwitchWindow(k);});
	this.doMenu("Window");
};
mxG.G.prototype.initMenu=function()
{
	let a=this.menus;
	for(let k=0;k<a.length;k++)
	{
		let oneMenu,subMenu,items,m=a[k];
		oneMenu=this.getE(m+"MenuDiv");
		this.addBtn(oneMenu,{n:m,v:this.local(m),first:1});
		subMenu=this.getE(m+"SubMenuDiv");
		items=this["menu"+m+"Items"];
		if(items) for(let l=0;l<items.length;l++)
			this.addBtn(subMenu,items[l]);
	}
};
mxG.G.prototype.createMenu=function()
{
	let s="",m,a;
	m=this.setA("menus","","string");
	this.menus=m?m.split(/[\s]*[,][\s]*/):[];
	this.menuTimeout=this.setA("menuTimeout",10000,"int");
	a=this.menus;
	if(!a.length) return s;
	s+="<div class=\"mxMenuDiv\" id=\""+this.n+"MenuDiv\">";
	for(let k=0;k<a.length;k++)
	{
		let m,z;
		m=a[k];
		s+="<div class=\"mxOneMenuDiv\" id=\""+this.n+m+"MenuDiv\">";
		s+="<div class=\"mxSubMenuDiv\" id=\""+this.n+m+"SubMenuDiv\">";
		s+="</div></div>";
	}
	s+="</div>";
	return s;
};
}
