// maxiGos v7 > mgosTree.js
if(!mxG.G.prototype.createTree)
{
mxG.fr("Game tree","Arbre des coups");
mxG.G.prototype.idt=function(x,y) {return x+"_"+y;};
mxG.G.prototype.getTreeRatio=function()
{
	// return (size in px)/(size in svg corrdinates) ratio 
	var e=this.getE("TreeBlockSvg"+this.idt(0,0)),
		w=this.ddT*this.treeM,
		b=e.getBoundingClientRect();
	return b.width/w;
};
mxG.G.prototype.getCT=function(ev,xo,yo)
{
	var e=this.getE("TreeBlockSvg"+this.idt(xo,yo)),
		w=this.ddT*this.getTreeRatio(),
		c=e.getMClick(ev),
		x,y;
	x=xo+Math.floor(c.x/w);
	y=yo+Math.floor(c.y/w);
	return {x:x,y:y}
};
mxG.G.prototype.doClickTree=function(ev,xo,yo)
{
	var aN,c,x,y;
	if(this.isTreeDisabled()) return;
	c=this.getCT(ev,xo,yo);
	x=c.x;
	y=c.y;
	if((this.tree[y]!=undefined)&&(this.tree[y][x]!=undefined))
	{
		aN=this.tree[y][x];
		this.backNode(aN);
		this.updateAll();
	}
	// keep focus on tree
	// arrow keys are for scrolling the tree
	// if the user want to use arrow keys to navigate,
	// he has to go back to navigation bar
};
mxG.G.prototype.doScrollTree=function(ev)
{
	if(this.treeLock) return;
	var w=this.ddT*this.getTreeRatio(),
		st=this.td.scrollTop,
		y=Math.floor(st/w),
		n=this.treeN,
		ko=Math.floor(y/n),k,km;
	// add visible blocks around block #ko
	this.addVisibleTreeBlocksOnly(ko);
};
mxG.G.prototype.buildOneTreeBlockContainer=function(x,y)
{
	var gr,dd=this.ddT,k=this.k,
		m=this.treeM,n=this.treeN;
	n=Math.min(n,this.treeRowMax-y);
	gr=document.createElementNS("http://www.w3.org/2000/svg","svg");
	gr.setAttribute("id",this.n+"TreeBlockSvg"+this.idt(x,y));
	gr.setAttributeNS(null,"viewBox","0 0 "+(m*dd)+" "+(n*dd));
	gr.setAttributeNS(null,"font-family",this.scr.ff);
	gr.setAttributeNS(null,"font-size",this.scr.fs); // 14 if stone diameter is 23
	gr.setAttributeNS(null,"font-weight",this.scr.fw);
	gr.setAttributeNS(null,"text-anchor","middle");
	gr.setAttributeNS(null,"fill","none");
	gr.setAttributeNS(null,"stroke","none");
	gr.style.display="block";
	gr.style.width="calc("+this.treeM+" * 2.5em)";
	gr.style.maxWidth="none"; // to be sure (some cms may set it to 100%)
	gr.getMClick=mxG.getMClick;
	if(gr.addEventListener)
		gr.addEventListener("click",function(ev){mxG.D[k].doClickTree(ev,x,y);},false);
	return gr;
};
mxG.G.prototype.buildTreeBlocksContainer=function()
{
	var i,j,n,m;
	m=this.treeColumnMax;
	n=this.treeN;
	this.treeBlocks=[];
	k=0;
	for(j=0;j<this.treeRowMax;j=j+n)
		for(i=0;i<this.treeColumnMax;i=i+m)
			this.treeBlocks.push(this.buildOneTreeBlockContainer(i,j));
};
mxG.G.prototype.drawTreeLine=function(s,x,y,c)
{
	var e,d,dd,r,r2,r3,xo,yo,x1,y1,x2,y2,n=this.treeN;
	if(!c) c="#000";
	k=Math.floor(y/n);
	d=this.dT;
	dd=this.ddT;
	r=d/2;
	r2=r/2;
	r3=r2+0.15*d;
	xo=x*dd;
	yo=(y-k*n)*dd;
	x1=xo+r2+r;
	y1=yo+r2+r;
	x2=xo+dd;
	y2=yo+dd;
	gr=this.treeBlocks[k];
	e=document.createElementNS("http://www.w3.org/2000/svg","path");
	e.setAttributeNS(null,"stroke",c);
	e.setAttributeNS(null,"stroke-width",this.scr.sw4grid);
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
	this.treeBlocks[k].appendChild(e);
};
mxG.G.prototype.hasEmphasis=function(aN)
{
	// for customization
	if(aN==this.cN) return this.goodnessCode.Focus;
	return 0;
};
mxG.G.prototype.makeTreeTriangle=function(x,y,d,c,cls)
{
	var e,x1,y1,x2,y2,x3,y3,z;
	z=d*0.32;
	x1=x;
	y1=y-z;
	x2=x-z;
	y2=y+z*0.8;
	x3=x+z;
	y3=y+z*0.8;
	e=document.createElementNS("http://www.w3.org/2000/svg","polygon");
	e.setAttributeNS(null,"fill","none");
	e.setAttributeNS(null,"stroke",c);
	e.setAttributeNS(null,"stroke-width",this.scr.sw4mark);
	e.setAttributeNS(null,"points",x1+" "+y1+" "+x2+" "+y2+" "+x3+" "+y3);
	e.classList.add(cls);
	return e;
};
mxG.G.prototype.buildTreeEmphasis=function(x,y,d,c,cls)
{
	var e,z=d*0.625;
	e=document.createElementNS("http://www.w3.org/2000/svg","rect");
	// use opacity instead of rgba() to be consistent with goban
	// assume c format is #nnnnnnnn at the moment
	e.setAttributeNS(null,"fill",c?c.substring(0,7):"#000");
	e.setAttributeNS(null,"opacity",c?parseInt(c.substring(7,9),16)/255:"0.1");
	e.setAttributeNS(null,"stroke","none");
	e.setAttributeNS(null,"x",x-z);
	e.setAttributeNS(null,"y",y-z);
	e.setAttributeNS(null,"width",z*2);
	e.setAttributeNS(null,"height",z*2);
	e.classList.add(cls);
	return e;
};
mxG.G.prototype.drawTreePoint=function(aN)
{
	var gr,e,d,r,r2,rg,a,cx,cy,
		nat,s="",x,y,xo,yo,xx,yy,dd,c,ac,cls,good,
		n=this.treeN,m=this.treeM;
	if(aN.P["B"]) nat="B";else if(aN.P["W"]) nat="W";else nat="KA";
	if(!this.hideTreeNumbering&&((nat=="B")||(nat=="W")))
	{
		if(aN.P.C&&this.markCommentOnTree) s="?";
		else s=this.getAsInTreeNum(aN)+"";
	}
	x=aN.iTree;
	y=aN.jTree;
	xx=Math.floor(x/m)*m;
	yy=Math.floor(y/n)*n;
	d=this.dT;
	r=d/2;
	r2=r/2;
	dd=this.ddT;
	xo=(x-xx)*dd;
	yo=(y-yy)*dd;
	cx=xo+r2+r;
	cy=yo+r2+r;
	gr=this.treeBlocks[yy/n];
	if(good=this.hasEmphasis(aN))
	{
		c=this.getEmphasisColor(good);
		cls=this.getEmphasisClass(good);
		e=this.buildTreeEmphasis(cx,cy,d,c,cls);
		e.setAttribute("id",this.n+"TreeEmphasis"+this.idt(x,y));
		gr.appendChild(e);
	}
	if((nat=="B")||(nat=="W"))
	{
		c=(nat=="B")?"Black":"White";
		ac=(nat=="B")?"White":"Black";
		if(this.stoneShadowOn)
		{
			let sw=this.scr.stoneShadowWidth;
			e=document.createElementNS("http://www.w3.org/2000/svg","circle");
			e.setAttribute("id",this.n+"TreeNodeShadow"+this.idt(x,y));
			e.setAttributeNS(null,"cx",cx+sw);
			e.setAttributeNS(null,"cy",cy+sw);
			e.setAttributeNS(null,"r",r);
			e.setAttributeNS(null,"fill","#000");
			// use opacity instead of rgba() to be consistent with goban
			e.setAttributeNS(null,"opacity","0.2");
			e.setAttributeNS(null,"stroke","none");
			gr.appendChild(e);
		}
		e=document.createElementNS("http://www.w3.org/2000/svg","circle");
		e.setAttribute("id",this.n+"TreeNode"+this.idt(x,y));
		e.setAttributeNS(null,"cx",cx);
		e.setAttributeNS(null,"cy",cy);
		if(this.in3dOn)
		{
			rg=this.specialStoneOn?"A":"";
			e.setAttributeNS(null,"fill","url(#"+this.n+c[0]+"RG"+rg+")");
			e.setAttributeNS(null,"stroke","none");
			e.setAttributeNS(null,"r",r);
		}
		else
		{
			e.setAttributeNS(null,"fill",c);
			e.setAttributeNS(null,"stroke","Black");
			e.setAttributeNS(null,"stroke-width",this.scr.sw4stone);
			e.setAttributeNS(null,"r",r-(this.scr.sw4stone-1)/2);
		}
		e.classList.add("mx"+c);
		gr.appendChild(e);
		if(this.in3dOn&&this.specialStoneOn)
		{
			e=document.createElementNS("http://www.w3.org/2000/svg","circle");
			e.setAttribute("id",this.n+"TreeNode"+this.idt(x,y));
			e.setAttributeNS(null,"cx",cx);
			e.setAttributeNS(null,"cy",cy);
			e.setAttributeNS(null,"r",r);
			e.classList.add("mx"+c);
			rg=this.specialStoneOn?"B":"";
			if(c=="White")
			{
				a=this.alea8[((x>>1)+y)%8];
				rg+=a?a:"";
			}
			e.setAttributeNS(null,"fill","url(#"+this.n+c[0]+"RG"+rg+")");
			e.setAttributeNS(null,"stroke","none");
			gr.appendChild(e);
		}
		if(s)
		{
			let dy=5; // vertical align need 5/14*font-size
			e=document.createElementNS("http://www.w3.org/2000/svg","text");
			e.setAttributeNS(null,"x",cx);
			e.setAttributeNS(null,"y",cy+dy);
			e.setAttributeNS(null,"fill",ac);
			if(this.scr.sw4text)
			{
				e.setAttributeNS(null,"stroke",ac);
				e.setAttributeNS(null,"stroke-width",this.scr.sw4text);
			}
			if(s.length>1)
			{
				// using svg transform seems to be the safest way to shrink text width
				let v;
				v="translate("+cx+",0)";
				if(s.length>2) v+=" scale(0.8,1)";
				else v+=" scale(0.9,1)";
				v+=" translate(-"+cx+",0)";
				e.setAttributeNS(null,"transform",v);
			}
			e.classList.add="mxOn"+c;
			e.textContent=s;
			gr.appendChild(e);
		}
	}
	else
	{
		e=this.makeTreeTriangle(cx,cy,d,"#000","mxMark");
		e.setAttribute("id",this.n+"TreeNode"+this.idt(x,y));
		gr.appendChild(e);
	}
	if(x)
	{
		// from dad line
		c=this.getEmphasisColor(aN.Good);
		if(this.tree[y][x-1]==aN.Dad) this.drawTreeLine("H2L",x,y,c);
		else this.drawTreeLine("D2TL",x,y,c);
	}
	if(aN.Kid&&aN.Kid.length)
	{
		// to kids lines
		if((this.tree[y][x+1]!=undefined)&&(this.tree[y][x+1]!=undefined)&&(this.tree[y][x+1].Dad==aN))
		{
			c=this.getEmphasisColor(this.tree[y][x+1].Good);
			this.drawTreeLine("H2R",x,y,c);
		}
		if((this.tree[y+1]!=undefined)&&(this.tree[y+1][x+1]!=undefined)&&(this.tree[y+1][x+1].Dad==aN))
		{
			c=this.getEmphasisColor(this.tree[y+1][x+1].Good);
			this.drawTreeLine("D2BR",x,y,c);
		}
		if((this.tree[y+1]!=undefined)&&(this.tree[y+1][x]!=undefined)
			&&((this.tree[y+1][x].Shape==-1)||(this.tree[y+1][x].Shape==-2)||(this.tree[y+1][x].Shape==-3)))
		{
			c=this.getEmphasisColor(this.tree[y+1][x].Good);
			this.drawTreeLine("V2B",x,y,c);
		}
	}
};
mxG.G.prototype.computeGoodness=function(aN,good)
{
	// for customization
	return 0;
};
mxG.G.prototype.buildTree=function(aN,io,jo)
{
	var i=io,j=jo,k,km=aN.Kid.length,l,good=0,path,p,pm;
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
mxG.G.prototype.drawTreeBlock=function(k,nv)
{
	// draw part of tree only (nv lines from line #k)
	var i,j,jo,jm,c;
	jo=Math.max(0,k);
	jm=Math.min(k+nv,this.treeRowMax);
	for(j=jo;j<jm;j++)
	{
		if(!this.treeCheck[j])
		{
			this.treeCheck[j]=1;
			for(i=0;i<this.treeColumnMax;i++)
				if((this.tree[j]!=undefined)&&(this.tree[j][i]!=undefined))
				{
					if(this.tree[j][i]&&this.tree[j][i].Dad) this.drawTreePoint(this.tree[j][i]);
					else
					{
						// not an object thus add V1, T1, A1
						if(this.tree[j][i]) c=this.getEmphasisColor(this.tree[j][i].Good);
						if(this.tree[j][i]&&(this.tree[j][i].Shape==-1)) this.drawTreeLine("A1",i,j,c);
						else if(this.tree[j][i]&&(this.tree[j][i].Shape==-2)) this.drawTreeLine("T1",i,j,c);
						else if(this.tree[j][i]&&(this.tree[j][i].Shape==-3)) this.drawTreeLine("V1",i,j,c);
					}
				}
		}
	}
};
mxG.G.prototype.afterDrawTree=function()
{
	// for customization
	this.scrollTreeToShowFocus();
};
mxG.G.prototype.drawTree=function()
{
	var nv,k,ko,km,e;
	this.treeCheck=[];
	this.buildTreeBlocksContainer();
	nv=Math.min(this.treeN,this.treeRowMax);
	ko=Math.floor(this.cN.jTree/this.treeN);
	// draw around current node only
	for(k=ko-1;k<=ko+1;k++) this.drawTreeBlock(k*this.treeN,nv);
	km=this.treeBlocks.length;
	// remove previously appended blocks to TreeContentDiv at the very last moment
	while(e=this.tcd.firstChild) this.tcd.removeChild(e); 
	// append blocks to TreeContentDiv
	for(k=0;k<km;k++)
		this.tcd.appendChild(this.treeBlocks[k]);
	this.afterDrawTree();
};
mxG.G.prototype.scrollTreeToShowFocus=function()
{
	var e,i,j,r,
		left,top,right,bottom,width,height,
		scrollLeft,scrollTop;
	if(!this.treeNodeOnFocus) return;
	e=this.td;
	i=this.treeNodeOnFocus.iTree;
	j=this.treeNodeOnFocus.jTree;
	dd=this.ddT;
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
	// remember: remove previous treeContentDiv child at the very last moment
	var k,km=this.rN.Kid.length,aN;
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
	this.treeN=20; // assume no more than 20 visible lines in TreeDiv
	this.drawTree();
	this.treeNodeOnFocus=this.cN;
	this.hasToSetTree=0;
};
mxG.G.prototype.removeAllTreeBlocks=function()
{
	var k,km,nv,gr,jo,j,jm;
	km=this.treeBlocks.length;
	nv=Math.min(this.treeN,this.treeRowMax);
	for(k=0;k<km;k++)
	{
		gr=this.treeBlocks[k];
		while(gr.firstChild) gr.removeChild(gr.firstChild);
		jo=k*nv;
		jm=jo+nv;
		for(j=jo;j<jm;j++) this.treeCheck[j]=0;
	}
};
mxG.G.prototype.addVisibleTreeBlocksOnly=function(ko)
{
	// add only some blocks that are visible or nearly visible in tree content
	// otherwise window resize or window may be very slow when big tree
	// ko is the indice of a visible block in this.treeBlocks
	// assume ko block is at least half of the visible part of the tree
	// thus add also some blocks around ko to try to miss nothing
	// remove other blocks content to minimize the number of tree content elements
	var k,km,nv,gr,jo,j,jm;
	this.treeLock=1; // to avoid problems when scroll tree
	km=this.treeBlocks.length;
	nv=Math.min(this.treeN,this.treeRowMax);
	for(k=0;k<km;k++)
	{
		gr=this.treeBlocks[k];
		if((k<(ko-1))||(k>(ko+1)))
		{
			// remove block #k
			if(gr.firstChild)
			{
				while(gr.firstChild) gr.removeChild(gr.firstChild);
				jo=k*nv;
				jm=jo+nv;
				for(j=jo;j<jm;j++) this.treeCheck[j]=0;
			}
		}
		else if(!gr.firstChild)
		{
			// add block #k
			this.drawTreeBlock(k*nv,nv);
		}
		// else keep block #k as is
	}
	this.treeLock=0;
};
mxG.G.prototype.updateTreeEmphasis=function()
{
	var aN,i,j,e,good,treeNode,cx,cy,d,c,cls;
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
			d=this.dT+2;
			if(treeNode.tagName=="circle")
			{
				cx=treeNode.getAttributeNS(null,"cx");
				cy=treeNode.getAttributeNS(null,"cy");
			}
			else if(treeNode.tagName=="polygon")
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
mxG.G.prototype.updateTree=function()
{
	var ko;
	if(this.hasToSetTree) this.setTree();
	else
	{
		//let d=new Date().getTime();
		ko=Math.floor(this.cN.jTree/this.treeN);
		// this.removeAllTreeBlocks();
		this.addVisibleTreeBlocksOnly(ko);
		this.updateTreeEmphasis();
	}
	this.afterDrawTree();
	if(this.gBox||(this.hasC("Score")&&this.canPlaceScore)) this.disableTree();
	else this.enableTree();
};
mxG.G.prototype.initTree=function()
{
	var k=this.k;
	this.hasToSetTree=1;
	this.dT=this.scr.d; // tree stone d = goban stone d (in svg coordinates)
	this.ddT=this.dT*1.5;
	this.td=this.getE("TreeDiv");
	this.tcd=this.getE("TreeContentDiv");
	this.td.addEventListener("scroll",function(ev){mxG.D[k].doScrollTree(ev);},false);
};
mxG.G.prototype.createTree=function()
{
	var s="",a="";
	this.canTreeFocus=this.setA("canTreeFocus",0,"bool");
	this.hideTreeNumbering=this.setA("hideTreeNumbering",0,"bool");
	this.markCommentOnTree=this.setA("markCommentOnTree",0,"bool");
	this.treeLabelOn=this.setA("treeLabelOn",0,"bool");
	if(this.treeLabelOn)
	{
		s+="<div class=\"mxTreeLabelDiv\" id=\""+this.n+"TreeLabelDiv\">";
		s+=this.local("Game tree");
		s+="</div>";
	}
	// add tabindex="0" to this div if it can be scrolled (for keyboard navigation)
	a=this.canTreeFocus?" tabindex=\"0\"":"";
	s+="<div class=\"mxTreeDiv\" id=\""+this.n+"TreeDiv\""+a+">";
	s+="<div class=\"mxTreeContentDiv\" id=\""+this.n+"TreeContentDiv\">";
	s+="</div>";
	s+="</div>";
	return s;
};
}
