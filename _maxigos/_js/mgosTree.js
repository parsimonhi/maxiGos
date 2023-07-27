// maxiGos v8 > mgosTree.js
if(!mxG.G.prototype.createTree)
{
mxG.fr("Game tree","Arbre des coups");

// mxG.S section
mxG.S.prototype.getTxy=function(ev,xo,yo)
{
	let e=this.p.getE("TreeBlockSvg"+this.p.idt(xo,yo)),
		w=this.ddT*this.p.getTreeRatio(),
		c=e.getMClick(ev),
		x,y;
	x=xo+Math.floor(c.x/w);
	y=yo+Math.floor(c.y/w);
	return {x:x,y:y};
};
mxG.S.prototype.makeTreeTriangle=function(x,y,d,c,cls)
{
	let e,x1,y1,x2,y2,x3,y3,z;
	z=d*0.32;
	x1=x;
	y1=y-z;
	x2=x-z;
	y2=y+z*0.8;
	x3=x+z;
	y3=y+z*0.8;
	e=document.createElementNS(this.xmlnsUrl,"polygon");
	e.setAttributeNS(null,"fill","none");
	e.setAttributeNS(null,"stroke",c);
	e.setAttributeNS(null,"stroke-width",this.sw4mark);
	e.setAttributeNS(null,"points",x1+" "+y1+" "+x2+" "+y2+" "+x3+" "+y3);
	e.classList.add(cls);
	return e;
};
mxG.S.prototype.makeOneTreeBlockContainer=function(x,y)
{
	let gr,dd=this.ddT,k=this.p.k,m=this.p.treeM,n=this.p.treeN;
	n=Math.min(n,this.p.treeRowMax-y);
	gr=document.createElementNS(this.xmlnsUrl,"svg");
	gr.setAttribute("id",this.p.n+"TreeBlockSvg"+this.p.idt(x,y));
	gr.setAttributeNS(null,"width",m*dd);
	gr.setAttributeNS(null,"height",n*dd);
	gr.setAttributeNS(null,"viewBox","0 0 "+(m*dd)+" "+(n*dd));
	gr.setAttributeNS(null,"font-family",this.ff);
	gr.setAttributeNS(null,"font-size",this.fs); // 14 if stone diameter is 23
	gr.setAttributeNS(null,"font-weight",this.fw);
	gr.setAttributeNS(null,"text-anchor","middle");
	gr.setAttributeNS(null,"fill","none");
	gr.setAttributeNS(null,"stroke","none");
	gr.style.maxWidth="none"; // to be sure (some cms may set it to 100%)
	gr.getMClick=mxG.getMClick;
	gr.addEventListener("click",function(ev){mxG.D[k].doClickTree(ev,x,y);});
	return gr;
};
mxG.S.prototype.drawTreeLine=function(s,x,y,c)
{
	let e,d=this.dT,dd=this.ddT,r=this.rT,r2=this.r2T,r3=this.r3T,
		xo,yo,x1,y1,x2,y2,n=this.p.treeN,k;
	if(!c) c="#000";
	k=Math.floor(y/n);
	xo=x*dd;
	yo=(y-k*n)*dd;
	x1=xo+r2+r;
	y1=yo+r2+r;
	x2=xo+dd;
	y2=yo+dd;
	gr=this.p.treeBlocks[k];
	e=document.createElementNS(this.xmlnsUrl,"path");
	e.setAttributeNS(null,"stroke",c);
	e.setAttributeNS(null,"stroke-width",this.sw4grid);
	if(s=="H2L")
		e.setAttributeNS(null,"d","M"+xo+" "+y1+"L"+(xo+r2)+" "+y1);
	else if(s=="D2TL")
		e.setAttributeNS(null,"d","M"+xo+" "+yo+"L"+(xo+r3)+" "+(yo+r3));	
	else if(s=="H2R")
		e.setAttributeNS(null,"d","M"+(x2-r2)+" "+y1+"L"+x2+" "+y1);
	else if(s=="D2BR")
		e.setAttributeNS(null,"d","M"+(x2-r3)+" "+(y2-r3)+"L"+x2+" "+y2);
	else if(s=="V2B")
		e.setAttributeNS(null,"d","M"+x1+" "+(y2-r2)+"L"+x1+" "+y2);
	else if(s=="V1")
		e.setAttributeNS(null,"d","M"+x1+" "+yo+"L"+x1+" "+y2);
	else if(s=="A1")
		e.setAttributeNS(null,"d","M"+x1+" "+yo+"L"+x1+" "+y1+"L"+x2+" "+y2);
	else if(s=="T1")
		e.setAttributeNS(null,"d","M"+x1+" "+yo+"L"+x1+" "+y2+"M"+x1+" "+y1+"L"+x2+" "+y2);
	e.classList.add("mxTreeLine");
	this.p.treeBlocks[k].appendChild(e);
};
mxG.S.prototype.drawTreePoint=function(aN)
{
	let gr,e,d=this.dT,dd=this.ddT,r=this.rT,r2=this.r2T,rg,a,cx,cy,
		nat,s="",x,y,xo,yo,xx,yy,c,ac,cls,good,
		n=this.p.treeN,m=this.p.treeM,tree=this.p.tree;
	if(aN.P["B"]) nat="B";else if(aN.P["W"]) nat="W";else nat="KA";
	if(!this.p.hideTreeNumbering&&((nat=="B")||(nat=="W")))
	{
		if(aN.P.C&&this.p.markCommentOnTree) s="?";
		else s=this.p.getAsInTreeNum(aN)+"";
	}
	x=aN.iTree;
	y=aN.jTree;
	xx=Math.floor(x/m)*m;
	yy=Math.floor(y/n)*n;
	xo=(x-xx)*dd;
	yo=(y-yy)*dd;
	cx=xo+r2+r;
	cy=yo+r2+r;
	gr=this.p.treeBlocks[yy/n];
	if(good=this.p.hasEmphasis(aN))
	{
		c=this.p.getEmphasisColor(good);
		cls=this.p.getEmphasisClass(good);
		e=this.p.buildTreeEmphasis(cx,cy,d,c,cls);
		e.setAttribute("id",this.p.n+"TreeEmphasis"+this.p.idt(x,y));
		gr.appendChild(e);
	}
	if((nat=="B")||(nat=="W"))
	{
		c=(nat=="B")?"Black":"White";
		ac=(nat=="B")?"White":"Black";
		if(this.stoneShadowOn)
		{
			let sw=this.stoneShadowWidth;
			e=document.createElementNS(this.xmlnsUrl,"circle");
			e.setAttribute("id",this.p.n+"TreeNodeShadow"+this.p.idt(x,y));
			e.setAttributeNS(null,"cx",cx+sw);
			e.setAttributeNS(null,"cy",cy+sw);
			e.setAttributeNS(null,"r",r);
			e.setAttributeNS(null,"fill","#000");
			// use opacity instead of rgba() to be consistent with goban
			e.setAttributeNS(null,"opacity","0.2");
			e.setAttributeNS(null,"stroke","none");
			gr.appendChild(e);
		}
		e=document.createElementNS(this.xmlnsUrl,"circle");
		e.setAttribute("id",this.p.n+"TreeNode"+this.p.idt(x,y));
		e.setAttributeNS(null,"cx",cx);
		e.setAttributeNS(null,"cy",cy);
		if(this.in3dOn)
		{
			rg=this.p.specialStoneOn?"A":"";
			e.setAttributeNS(null,"fill","url(#"+this.p.n+c[0]+"RG"+rg+")");
			e.setAttributeNS(null,"stroke","none");
			e.setAttributeNS(null,"r",r);
		}
		else
		{
			e.setAttributeNS(null,"fill",c);
			e.setAttributeNS(null,"stroke","Black");
			e.setAttributeNS(null,"stroke-width",this.sw4stone);
			e.setAttributeNS(null,"r",r-(this.sw4stone-1)/2);
		}
		e.classList.add("mx"+c);
		gr.appendChild(e);
		if(this.in3dOn&&this.p.specialStoneOn)
		{
			e=document.createElementNS(this.xmlnsUrl,"circle");
			e.setAttribute("id",this.p.n+"TreeNode"+this.p.idt(x,y));
			e.setAttributeNS(null,"cx",cx);
			e.setAttributeNS(null,"cy",cy);
			e.setAttributeNS(null,"r",r);
			e.classList.add("mx"+c);
			a=(c=="White")?Math.floor(x*this.p.alea+y)%8:"";
			e.setAttributeNS(null,"fill","url(#"+this.p.n+c[0]+"RGB"+a+")");
			e.setAttributeNS(null,"stroke","none");
			gr.appendChild(e);
		}
		if(s)
		{
			let dy=5; // vertical align need 5/14*font-size
			e=document.createElementNS(this.xmlnsUrl,"text");
			e.setAttributeNS(null,"x",cx);
			e.setAttributeNS(null,"y",cy+dy);
			e.setAttributeNS(null,"fill",ac);
			if(this.sw4text!="0")
			{
				e.setAttributeNS(null,"stroke",ac);
				e.setAttributeNS(null,"stroke-width",this.sw4text);
			}
			if(s.length>1)
			{
				// using svg transform seems to be the safest way to shrink text width
				// transform: translate(cx,0) scale(sx,1) translate(-cx,0)
				let v,sx=(s.length>2)?0.8:0.9;
				v="matrix("+sx+",0,0,1,"+Math.round(cx*(1-sx)*100)/100+",0)";
				e.setAttributeNS(null,"transform",v);
			}
			e.setAttribute("aria-hidden",true);
			e.classList.add="mxOn"+c;
			e.textContent=s;
			gr.appendChild(e);
		}
	}
	else
	{
		e=this.makeTreeTriangle(cx,cy,d,"#000","mxMark");
		e.setAttribute("id",this.p.n+"TreeNode"+this.p.idt(x,y));
		gr.appendChild(e);
	}
	if(x)
	{
		// from dad line
		c=this.p.getEmphasisColor(aN.Good);
		if(tree[y][x-1]==aN.Dad) this.drawTreeLine("H2L",x,y,c);
		else this.drawTreeLine("D2TL",x,y,c);
	}
	if(aN.Kid&&aN.Kid.length)
	{
		// to kids lines
		if((tree[y][x+1]!=undefined)&&(tree[y][x+1]!=undefined)&&(tree[y][x+1].Dad==aN))
		{
			c=this.p.getEmphasisColor(tree[y][x+1].Good);
			this.drawTreeLine("H2R",x,y,c);
		}
		if((tree[y+1]!=undefined)&&(tree[y+1][x+1]!=undefined)&&(tree[y+1][x+1].Dad==aN))
		{
			c=this.p.getEmphasisColor(tree[y+1][x+1].Good);
			this.drawTreeLine("D2BR",x,y,c);
		}
		if((tree[y+1]!=undefined)&&(tree[y+1][x]!=undefined)
			&&((tree[y+1][x].Shape==-1)||(tree[y+1][x].Shape==-2)||(tree[y+1][x].Shape==-3)))
		{
			c=this.p.getEmphasisColor(tree[y+1][x].Good);
			this.drawTreeLine("V2B",x,y,c);
		}
	}
};
mxG.S.prototype.drawTreeBlock=function(k,nv)
{
	// draw part of tree only (nv lines from line #k)
	let i,j,jo,jm,c;
	jo=Math.max(0,k);
	jm=Math.min(k+nv,this.p.treeRowMax);
	for(j=jo;j<jm;j++)
	{
		if(!this.p.treeCheck[j])
		{
			this.p.treeCheck[j]=1;
			for(i=0;i<this.p.treeColumnMax;i++)
				if((this.p.tree[j]!=undefined)&&(this.p.tree[j][i]!=undefined))
				{
					if(this.p.tree[j][i]&&this.p.tree[j][i].Dad) this.drawTreePoint(this.p.tree[j][i]);
					else
					{
						// not an object thus add V1, T1, A1
						if(this.p.tree[j][i]) c=this.p.getEmphasisColor(this.p.tree[j][i].Good);
						if(this.p.tree[j][i]&&(this.p.tree[j][i].Shape==-1)) this.drawTreeLine("A1",i,j,c);
						else if(this.p.tree[j][i]&&(this.p.tree[j][i].Shape==-2)) this.drawTreeLine("T1",i,j,c);
						else if(this.p.tree[j][i]&&(this.p.tree[j][i].Shape==-3)) this.drawTreeLine("V1",i,j,c);
					}
				}
		}
	}
};
mxG.S.prototype.initTree=function()
{
	let d=this.d,r=d/2,r2=Math.floor(r/2);
	this.dT=d;
	this.ddT=d+2*r2;
	this.rT=r;
	this.r2T=r2;
	this.r3T=r2+0.15*d;
};

// mxG.G section
mxG.G.prototype.idt=function(x,y) {return x+"_"+y;};
mxG.G.prototype.getTreeRatio=function()
{
	// return (size in px)/(size in svg coordinates) ratio 
	let b=this.getE("TreeDiv").querySelector('svg').getBoundingClientRect();
	return b.width/(this.scr.ddT*this.treeM);
};
mxG.G.prototype.doClickTree=function(ev,xo,yo)
{
	let aN,c,x,y;
	if(this.isTreeDisabled()) return;
	c=this.scr.getTxy(ev,xo,yo);
	x=c.x;
	y=c.y;
	if((this.tree[y]!=undefined)&&(this.tree[y][x]!=undefined))
	{
		aN=this.tree[y][x];
		this.backNode(aN);
		this.updateAll();
	}
	// keep focus on the tree
	// arrow keys are for scrolling the tree
	// if the user want to use arrow keys to navigate,
	// he has to go back to navigation bar
};
mxG.G.prototype.doKeydownTree=function(ev)
{
	this.doKeydownNavigation(ev);
};
mxG.G.prototype.buildTreeBlocksContainer=function()
{
	let i,j,n,m;
	m=this.treeColumnMax;
	n=this.treeN;
	this.treeBlocks=[];
	k=0;
	for(j=0;j<this.treeRowMax;j=j+n)
		for(i=0;i<this.treeColumnMax;i=i+m)
			this.treeBlocks.push(this.scr.makeOneTreeBlockContainer(i,j));
};
mxG.G.prototype.hasEmphasis=function(aN)
{
	// for customization
	if(aN==this.cN) return this.goodnessCode.Focus;
	return 0;
};
mxG.G.prototype.buildTreeEmphasis=function(x,y,d,c,cls)
{
	let e,z=d*0.625;
	e=document.createElementNS(this.scr.xmlnsUrl,"rect");
	// use opacity instead of rgba() to be consistent with goban
	// assume c format is #nnnnnnnn at the moment
	e.setAttributeNS(null,"fill",c?c.substring(0,7):"#000");
	e.setAttributeNS(null,"opacity",c?parseInt(c.substring(7,9),16)/255:"0.125");
	e.setAttributeNS(null,"stroke","none");
	e.setAttributeNS(null,"x",x-z);
	e.setAttributeNS(null,"y",y-z);
	e.setAttributeNS(null,"width",z*2);
	e.setAttributeNS(null,"height",z*2);
	e.classList.add(cls);
	return e;
};
mxG.G.prototype.computeGoodness=function(aN,good)
{
	// for customization
	return 0;
};
mxG.G.prototype.buildTree=function(aN,io,jo)
{
	let i=io,j=jo,k,km=aN.Kid.length,l,good=0,path,p,pm;
	if(!this.uC) this.setPl();
	if(j==this.treeRowMax) {this.tree[j]=[];this.treeRowMax++;}
	this.tree[j][i]=aN;
	aN.iTree=i;
	aN.jTree=j;
	for(k=0;k<km;k++)
	{
		path=[];
		while((this.tree[j]!==undefined)&&(this.tree[j][i+1]!==undefined))
		{
			if(this.tree[j][i]===undefined)
			{
				if((this.tree[j+1]===undefined)||(this.tree[j+1][i+1]===undefined))
				{
					if(k==(km-1))
					{
						this.tree[j][i]={Shape:-1,Good:0}; // A1
						path.push({i:i,j:j});
					}
					else
					{
						this.tree[j][i]={Shape:-2,Good:0}; // T1
						path.push({i:i,j:j});
					}
				}
				else
				{
					this.tree[j][i]={Shape:-3,Good:0}; // V1
					path.push({i:i,j:j});
				}
			}
			j++;
		}
		good=good|this.buildTree(aN.Kid[k],i+1,j);
		pm=path.length;
		for(p=0;p<pm;p++) {this.tree[path[p].j][path[p].i].Good=aN.Kid[k].Good;}
	}
	this.treeColumnMax=Math.max(this.treeColumnMax,i+1);
	return aN.Good=this.computeGoodness(aN,good);
};
mxG.G.prototype.scrollTreeToShowFocus=function()
{
	let e,i,j,r,left,top,right,bottom,width,height,scrollLeft,scrollTop;
	if(!this.treeNodeOnFocus) return;
	e=this.td;
	i=this.treeNodeOnFocus.iTree;
	j=this.treeNodeOnFocus.jTree;
	dd=this.scr.ddT;
	r=this.getTreeRatio();
	left=dd*i*r;
	top=dd*j*r;
	right=left+dd*r+1;
	bottom=top+dd*r+1;
	if(e.clientWidth===undefined) return;
	width=e.clientWidth; // clientWidth=offsetWidth-scrollBarSize in theory?
	if(!width) return;
	if(e.clientHeight===undefined) return;
	height=e.clientHeight; // clientHeight=offsetHeight-scrollBarSize in theory?
	if(!height) return;
	if(e.scrollLeft===undefined) return;
	scrollLeft=e.scrollLeft;
	if(e.scrollTop===undefined) return;
	scrollTop=e.scrollTop;
	if(left<scrollLeft) e.scrollLeft=left;
	else if((right-width)>scrollLeft) e.scrollLeft=right-width;
	if(top<scrollTop) e.scrollTop=top;
	else if((bottom-height)>scrollTop) e.scrollTop=bottom-height;
};
mxG.G.prototype.afterDrawTree=function()
{
	// for customization
	this.scrollTreeToShowFocus();
};
mxG.G.prototype.computeKTB=function()
{
	let grh=this.tcd.firstChild.getBoundingClientRect().height,h=this.td.offsetHeight;
	return Math.ceil(h/grh);
};
mxG.G.prototype.drawTree=function()
{
	let nv,k,ko,km,f,e,tcd=this.tcd,kTB;
	this.treeCheck=[];
	f=!this.treeBlocks;
	this.buildTreeBlocksContainer();
	nv=Math.min(this.treeN,this.treeRowMax);
	ko=Math.floor(this.cN.jTree/this.treeN);
	km=this.treeBlocks.length;
	// compute kTB
	if(f&&(km>1)) tcd.appendChild(this.treeBlocks[0]);
	kTB=(km>1)?this.computeKTB():1;
	if(f&&(km>1)) tcd.replaceChildren();
	// draw around current node only
	for(k=ko-kTB;k<=ko+kTB;k++)
	{
		if((k>=0)&&this.treeBlocks[k])
		{
			this.treeBlocks[k].innerHTML="<title>"+this.local("Game tree")+"</title>";
			this.scr.drawTreeBlock(k*this.treeN,nv);
		}
	}
	// remove previously appended blocks to the tree box at the very last moment
	tcd.replaceChildren();
	// append blocks to the tree box
	for(k=0;k<km;k++) tcd.appendChild(this.treeBlocks[k]);
	this.afterDrawTree();
};
mxG.G.prototype.disableTree=function()
{
	if(!this.td.hasAttribute("data-maxigos-disabled"))
	{
		this.td.setAttribute("data-maxigos-disabled","1");
		if(this.canTreeFocus) this.td.setAttribute("tabindex","-1");
	}
};
mxG.G.prototype.enableTree=function()
{
	if(this.td.hasAttribute("data-maxigos-disabled"))
	{
		this.td.removeAttribute("data-maxigos-disabled");
		if(this.canTreeFocus) this.td.setAttribute("tabindex","0");
	}
};
mxG.G.prototype.isTreeDisabled=function()
{
	return this.td.hasAttribute("data-maxigos-disabled");
};
mxG.G.prototype.setTree=function()
{
	// remember: remove previous tree box children at the very last moment
	let k,km=this.rN.Kid.length,aN;
	this.tree=[];
	this.treeRowMax=0;
	this.treeColumnMax=0;
	for(k=0;k<km;k++)
	{
		aN=this.rN.Kid[k];
		while(this.kidOnFocus(aN)) aN=this.kidOnFocus(aN);
		this.treeCurrentLast=aN;
		this.buildTree(this.rN.Kid[k],0,this.treeRowMax);
	}
	this.treeM=this.treeColumnMax;
	this.treeN=8; // number of line of a block in the tree box
	this.drawTree();
	this.treeNodeOnFocus=this.cN;
	this.hasToSetTree=0;
};
mxG.G.prototype.addVisibleTreeBlocksOnly=function(ko)
{
	// add only some blocks that are visible or nearly visible in tree content
	// otherwise window resize and refreshing may be very slow when big tree
	// ko is the indice of a visible block in this.treeBlocks
	// assume ko block is at least half of the visible part of the tree
	// thus add also some blocks around ko to try to miss nothing
	// remove other blocks content to minimize the number of tree content elements
	let k,km,nv,gr,jo,j,jm,kTB;
	this.treeLock=1; // to avoid problems when scroll tree
	km=this.treeBlocks.length;
	nv=Math.min(this.treeN,this.treeRowMax);
	kTB=(km>1)?this.computeKTB():1;
	for(k=0;k<km;k++)
	{
		gr=this.treeBlocks[k];
		if((k<(ko-kTB))||(k>(ko+kTB))) // empty block #k
		{
			if(gr.firstChild)
			{
				gr.replaceChildren();
				jo=k*nv;
				jm=jo+nv;
				for(j=jo;j<jm;j++) this.treeCheck[j]=0;
			}
		}
		else if(!gr.firstChild)
		{
			gr.innerHTML="<title>"+this.local("Game tree")+"</title>";
			this.scr.drawTreeBlock(k*nv,nv); // add block #k
		}
		// else keep block #k as is
	}
	this.treeLock=0;
};
mxG.G.prototype.updateTreeEmphasis=function()
{
	let aN,i,j,e,good,treeNode,cx,cy,d,c,cls;
	if(this.treeNodeOnFocus==this.cN) return;
	if(this.treeNodeOnFocus)
	{
		aN=this.treeNodeOnFocus;
		i=aN.iTree;
		j=aN.jTree;
		e=this.getE("TreeEmphasis"+this.idt(i,j));
		if(e)
		{
			good=this.hasEmphasis(aN);
			if(good)
			{
				// todo when complex emphasis
			}
			else e.parentNode.removeChild(e);
		}
	}
	aN=this.cN;
	if(good=this.hasEmphasis(aN))
	{
		i=aN.iTree;
		j=aN.jTree;
		treeNode=this.getE("TreeNode"+this.idt(i,j));
		if(treeNode)
		{
			e=this.getE("TreeEmphasis"+this.idt(i,j));
			if(e) e.parentNode.removeChild(e);
			d=this.scr.dT+2;
			if(treeNode.tagName.match(/circle/i))
			{
				cx=treeNode.getAttributeNS(null,"cx");
				cy=treeNode.getAttributeNS(null,"cy");
			}
			else if(treeNode.tagName.match(/polygon/i))
			{
				points=treeNode.getAttributeNS(null,"points");
				cx=parseFloat(points.replace(/^([0-9.]+).*$/,"$1"));
				cy=parseFloat(points.replace(/^[0-9.]+ ([0-9.]+).*$/,"$1"))+d*0.32;
			}
			else
			{
				// never in theory
				this.treeNodeOnFocus=aN;
				return;
			}
			c=this.getEmphasisColor(good);
			cls=this.getEmphasisClass(good);
			e=this.buildTreeEmphasis(cx,cy,d,c,cls);
			e.setAttribute("id",this.n+"TreeEmphasis"+this.idt(i,j));
			if(treeNodeShadow=this.getE("TreeNodeShadow"+this.idt(i,j)))
				treeNodeShadow.parentNode.insertBefore(e,treeNodeShadow);
			else treeNode.parentNode.insertBefore(e,treeNode);
		}
	}
	this.treeNodeOnFocus=aN;
};
mxG.G.prototype.doScrollTree=function(ev)
{
	if(this.treeLock||!this.treeBlocks) return;
	let w=this.scr.ddT*this.getTreeRatio(),
		st=this.td.scrollTop,
		y=Math.floor(st/w),
		n=this.treeN,
		ko=Math.floor(y/n),k,km;
	// add visible blocks around block #ko
	this.addVisibleTreeBlocksOnly(ko);
};
mxG.G.prototype.updateTree=function()
{
	if(this.hasToSetTree) this.setTree();
	else
	{
		let ko=Math.floor(this.cN.jTree/this.treeN);
		this.addVisibleTreeBlocksOnly(ko);
		this.updateTreeEmphasis();
	}
	this.afterDrawTree();
};
mxG.G.prototype.initTree=function()
{
	let k=this.k;
	this.td=this.getE("TreeDiv");
	this.tcd=this.getE("TreeContentDiv");
	this.td.addEventListener("scroll",function(ev){mxG.D[k].doScrollTree(ev);});
	this.td.addEventListener("keydown",function(ev){mxG.D[k].doKeydownTree(ev);});
	this.scr.initTree();
	this.hasToSetTree=1;
	if(ResizeObserver) new ResizeObserver(function(){mxG.D[k].doScrollTree();}).observe(this.td);
};
mxG.G.prototype.createTree=function()
{
	let s="",a="";
	this.canTreeFocus=this.setA("canTreeFocus",0,"bool");
	this.hideTreeNumbering=this.setA("hideTreeNumbering",0,"bool");
	this.markCommentOnTree=this.setA("markCommentOnTree",0,"bool");
	this.treeCaptionOn=this.setA("treeCaptionOn",0,"bool");
	// add tabindex="0" to this div if it can be scrolled (for keyboard navigation)
	a=this.canTreeFocus?" tabindex=\"0\"":"";
	s+="<div class=\"mxTreeDiv\" id=\""+this.n+"TreeDiv\""+a+">";
	if(this.treeCaptionOn)
	{
		s+="<div class=\"mxTreeCaptionDiv\" id=\""+this.n+"TreeCaptionDiv\">";
		s+=this.local("Game tree");
		s+="</div>";
	}
	s+="<div class=\"mxTreeContentDiv\" id=\""+this.n+"TreeContentDiv\">";
	s+="</div>";
	s+="</div>";
	return s;
};
}