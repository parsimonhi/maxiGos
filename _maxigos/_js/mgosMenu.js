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
	let e=this.getE(m+"SubMenu"),c="mxSubMenuOpen";
	if(s)
	{
		let list=this.getE("MenuBox").querySelectorAll('.mxSubMenu');
		// some browsers do not give the focus to a button when clicking on it ?!?
		this.getE(m+"Btn").focus();
		for(k=0;k<list.length;k++)
			if(list[k]==e)list[k].classList.add(c);
			else list[k].classList.remove(c);
	}
	else e.classList.remove(c);
}
mxG.G.prototype.addSubMenuItem=function(e,b)
{
	let k=this.k,c=document.createElement("li");
	b.tabindex="-1";
	e.appendChild(c);
	this.addBtn(c,b);
}
mxG.G.prototype.doFocusOneMenu=function(ev)
{
	let e=ev.target;
	this.toggleMenu(e.id.replace(/^d[0-9]+([A-Za-z]+)Btn$/,"$1"),1);
	if(e.classList.contains("mxViewBtn"))this.setViewCoche();
	if(e.classList.contains("mxWindowBtn"))this.setWindowMenu();
}
mxG.G.prototype.doBlurMenu=function(ev)
{
	let e=ev.target,k=this.k;
	while(!e.classList.contains("mxOneMenu"))e=e.parentNode;
	setTimeout(function(){
		if(!e.parentNode.contains(document.activeElement))
			// safari seems to need a long time (thus 200), others need only 10
			mxG.D[k].toggleMenu(e.id.replace(/^d[0-9]+([A-Za-z]+)Menu$/,"$1"),0);},200);
}
mxG.G.prototype.getFirstEnableMenuBtn=function()
{
	return this.getE("MenuBox").querySelector('button:enabled');
}
mxG.G.prototype.focusFirstSubMenu=function(ev)
{
	let e=ev.target.parentNode.querySelector('.mxSubMenu button');
	if(e)e.focus();
}
mxG.G.prototype.focusPredSubMenu=function(ev)
{
	let e=ev.target.parentNode.previousElementSibling;
	if(e)e.querySelector('button').focus();
	else ev.target.parentNode.parentNode.previousElementSibling.focus();
}
mxG.G.prototype.focusNextSubMenu=function(ev)
{
	let e=ev.target.parentNode.nextElementSibling;
	if(e)e.querySelector('button').focus();
}
mxG.G.prototype.doSwitchWindow=function(k)
{
	this.toggleMenu("Window",0);
	this.rN.cN=this.cN;
	this.rN=this.rNs[k];
	this.backNode(this.rN.cN?this.rN.cN:this.rN.Kid[0]);
	if(this.hasC("Tree"))this.hasToSetTree=1;
	this.updateAll();
}
mxG.G.prototype.setWindowMenu=function()
{
	let s="",b={},items,z=this.k;
	for(let k=0;k<this.rNs.length;k++)
	{
		b.n="Win"+k;
		if(this.rNs[k].sgf)b.v=this.rNs[k].sgf.replace(/\.sgf$/,"");
		else b.v=this.local("Untitled");
		s+=`<li><button tabindex="-1"`
		+` class="mxBtn"${(this.rNs[k]==this.rN)?" mxCoched":" mxCochable"}" id="${this.n+b.n}Btn">`
		+`<span>${b.v}</span></button></li>`;
	}
	this.getE("WindowSubMenu").innerHTML=s;
	items=this.getE("WindowSubMenu").querySelectorAll('.mxBtn');
	for(let k=0;k<items.length;k++)
	{
		items[k].addEventListener("click",function(){mxG.D[z].doSwitchWindow(k);});
		items[k].addEventListener("blur",function(ev){mxG.D[z].doBlurMenu(ev);});
		items[k].addEventListener("keydown",function(ev){mxG.D[z].doKeydownSubMenu(ev);});
	}
}
mxG.G.prototype.doKeydownMenu=function(ev)
{
	if(ev.metaKey||ev.ctrlKey||ev.altKey)return;
	if(ev.key.match(/^[bcotv]$/i))this.doAlphaKeydown(ev);
}
mxG.G.prototype.doKeydownOneMenu=function(ev)
{
	let r;
	if(ev.metaKey||ev.ctrlKey||ev.altKey)return;
	if(ev.key=="ArrowDown"){this.focusFirstSubMenu(ev);r=1;}
	if(r)ev.preventDefault();
}
mxG.G.prototype.doKeydownSubMenu=function(ev)
{
	let r;
	if(ev.metaKey||ev.ctrlKey||ev.altKey)return;
	if(ev.key=="ArrowUp"){this.focusPredSubMenu(ev);r=1;}
	else if(ev.key=="ArrowDown"){this.focusNextSubMenu(ev);r=1;}
	if(r)ev.preventDefault();
}
mxG.G.prototype.doFile=function(){this.toggleMenu("File",1);}
mxG.G.prototype.doEdit=function(){this.toggleMenu("Edit",1);}
mxG.G.prototype.doView=function(){this.toggleMenu("View",1);}
mxG.G.prototype.doWindow=function(){this.toggleMenu("Window",1);}
mxG.G.prototype.initMenu=function()
{
	let a=this.menus,z=this.k;
	this.getE("MenuBox").addEventListener("keydown",function(ev){mxG.D[z].doKeydownMenu(ev);});
	for(let m of a)
	{
		let oneMenu,oneBtn,subMenu,subBtn,items;
		oneMenu=this.getE(m+"Menu");
		subMenu=this.getE(m+"SubMenu");
		this.addBtn(oneMenu,{n:m,v:this.local(m),first:1});
		oneBtn=oneMenu.firstChild;
		oneBtn.addEventListener("focus",function(ev){mxG.D[z].doFocusOneMenu(ev);});
		oneBtn.addEventListener("blur",function(ev){mxG.D[z].doBlurMenu(ev);});
		oneBtn.addEventListener("keydown",function(ev){mxG.D[z].doKeydownOneMenu(ev);});
		items=this["menu"+m+"Items"]; // see mgosFile.js, mgosEdit.js, etc.
		if(items)for(let i of items)
		{
			this.addSubMenuItem(subMenu,i);
			subBtn=subMenu.querySelector("li:last-of-type .mxBtn");
			subBtn.addEventListener("blur",function(ev){mxG.D[z].doBlurMenu(ev);});
			subBtn.addEventListener("keydown",function(ev){mxG.D[z].doKeydownSubMenu(ev);});
		}
	}
}
mxG.G.prototype.createMenu=function()
{
	let m,a;
	m=this.setA("menus","","string");
	a=this.menus=m?m.split(/[\s]*[,][\s]*/):[];
	if(!a.length)return ``;
	let s=`<menu class="mxMenuBox" id="${this.n}MenuBox">`;
	for(let b of a)
	{
		s+=`<li class="mxOneMenu" id="${this.n+b}Menu">`
		+`<menu class="mxSubMenu" id="${this.n+b}SubMenu"></menu>`
		+`</li>`;
	}
	return s+`</menu>`;
}
}
