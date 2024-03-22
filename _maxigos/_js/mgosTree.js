// maxiGos v8 > mgosTree.js
if(!mxG.G.prototype.createTree)
{
mxG.fr("Game tree","Arbre des coups");
mxG.fr("Variations","Variations");
mxG.fr("buildVariationTreeNum",a=>"Variation "+a[0]+" parmi "+a[1]);
mxG.en("buildVariationTreeNum",a=>"Variation "+a[0]+" of "+a[1]);
// mxG.S section
mxG.S.prototype.getTxy=function(ev)
{
	let w=this.ddT*this.p.getTreeRatio(),
		c0=this.p.getTreeOffset(),
		c=this.p.tc.getMClick(ev);
	return {x:Math.floor((c.x-c0.x)/w),y:Math.floor((c.y-c0.y)/w)};
}
mxG.S.prototype.makeTreePointDesc=function()
{
	let aN=this.p.cN,nat,s="",x,y,n;
	s+=this.makeOneInfoFromGameTree(aN,1);
	pN=aN.Dad;
	if((n=pN.Kid.length)>1)
	{
		let m=pN.Focus,desc=this.p.build("VariationTreeNum",[m,n]);
		if(desc&&(desc!=([m,n]+"")))s+=". "+desc;
		else s+=". "+this.p.local("Variation")+" "+m;
	}
	return s;
}
mxG.S.prototype.setTreeTitleDesc=function(status)
{
	let s;
	if(status==1)s=this.makeTreePointDesc();
	else s=this.p.local("Game tree");
	this.p.tb.setAttribute("aria-label",s);
}
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
}
mxG.S.prototype.makeOneTreeBlockContainer=function(x,y,z)
{
	let gr,dd=this.ddT,k=this.p.k,m=this.p.treeM,
		n=Math.min(this.p.treeN,this.p.treeRowMax-y),
		w=m*dd,h=n*dd;
	gr=document.createElementNS(this.xmlnsUrl,"svg");
	gr.setAttribute("id",this.p.n+"TreeBlockSvg"+this.p.idt(x,y));
	gr.setAttribute("data-z",z);
	gr.setAttributeNS(null,"width",w);
	gr.setAttributeNS(null,"height",h);
	gr.setAttributeNS(null,"viewBox","0 0 "+w+" "+h);
	gr.setAttributeNS(null,"font-family",this.ff);
	gr.setAttributeNS(null,"font-size",this.fs); // 14 if stone diameter is 23
	gr.setAttributeNS(null,"font-weight",this.fw);
	gr.setAttributeNS(null,"text-anchor","middle");
	gr.setAttributeNS(null,"fill","none");
	gr.setAttributeNS(null,"stroke","none");
	gr.setAttribute("role","presentation");
	gr.setAttribute("aria-hidden","true");
	gr.style.maxWidth="none"; // to be sure (some cms may set it to 100%)
	this.p.treeObserver.observe(gr);
	return gr;
}
mxG.S.prototype.drawTreeLines=function(k,p)
{
	let e=document.createElementNS(this.xmlnsUrl,"path");
	e.setAttributeNS(null,"stroke","#000");
	e.setAttributeNS(null,"stroke-width",this.sw4grid);
	e.setAttributeNS(null,"d",p);
	e.classList.add("mxTreeLine");
	this.p.treeBlocks[k].prepend(e);
}
mxG.S.prototype.makeTreeLine=function(s,x,y)
{
	let d=this.dT,dd=this.ddT,r=this.rT,r2=this.r2T,r3=this.r3T,
		xo,yo,x1,y1,x2,y2,n=this.p.treeN,k=Math.floor(y/n);
	xo=x*dd;
	yo=(y-k*n)*dd;
	x1=xo+r2+r;
	y1=yo+r2+r;
	x2=xo+dd;
	y2=yo+dd;
	if(s=="H2L")return "M"+xo+" "+y1+"H"+(xo+r2);
	if(s=="D2TL")return "M"+xo+" "+yo+"L"+(xo+r3)+" "+(yo+r3);
	if(s=="H2R")return "M"+(x2-r2)+" "+y1+"H"+x2;
	if(s=="D2BR")return "M"+(x2-r3)+" "+(y2-r3)+"L"+x2+" "+y2;
	if(s=="V2B")return "M"+x1+" "+(y2-r2)+"V"+y2;
	if(s=="V1")return "M"+x1+" "+yo+"V"+y2;
	if(s=="A1")return "M"+x1+" "+yo+"V"+y1+"L"+x2+" "+y2;
	if(s=="T1")return "M"+x1+" "+yo+"V"+y2+"M"+x1+" "+y1+"L"+x2+" "+y2;
	return "";
}
mxG.S.prototype.drawTreePoint=function(aN)
{
	let gr,e,d=this.dT,dd=this.ddT,r=this.rT,r2=this.r2T,rg,a,cx,cy,
		nat,s="",x,y,xo,yo,xx,yy,c,ac,cls,good,
		n=this.p.treeN,m=this.p.treeM,tree=this.p.tree,p="";
	if(aN.P["B"])nat="B";else if(aN.P["W"])nat="W";else nat="E";
	if(!this.p.hideTreeNumbering&&((nat=="B")||(nat=="W")))
	{
		if(aN.P.C&&this.p.markCommentOnTree)s="?";
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
			e.setAttribute("id",this.p.n+"TreeNodeSpecial"+this.p.idt(x,y));
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
		if(tree[y][x-1]==aN.Dad)p+=this.makeTreeLine("H2L",x,y);
		else p+=this.makeTreeLine("D2TL",x,y);
	}
	if(aN.Kid&&aN.Kid.length)
	{
		// to kids lines
		if((tree[y][x+1]!=undefined)&&(tree[y][x+1]!=undefined)&&(tree[y][x+1].Dad==aN))
			p+=this.makeTreeLine("H2R",x,y);
		if((tree[y+1]!=undefined)&&(tree[y+1][x+1]!=undefined)&&(tree[y+1][x+1].Dad==aN))
			p+=this.makeTreeLine("D2BR",x,y);
		if((tree[y+1]!=undefined)&&(tree[y+1][x]!=undefined)
			&&((tree[y+1][x].Shape==-1)||(tree[y+1][x].Shape==-2)||(tree[y+1][x].Shape==-3)))
			p+=this.makeTreeLine("V2B",x,y);
	}
	return p; // the path to add to the tree lines
}
mxG.S.prototype.drawTreeBlock=function(k)
{
	// draw part of tree only (nv lines from line k*nv)
	let i,j,jo,jm,nv=Math.min(this.p.treeN,this.p.treeRowMax),p="";
	jo=Math.max(0,k*nv);
	jm=Math.min(jo+nv,this.p.treeRowMax);
	for(j=jo;j<jm;j++)
	{
		if(!this.p.treeCheck[j])
		{
			this.p.treeCheck[j]=1;
			for(i=0;i<this.p.treeColumnMax;i++)
				if((this.p.tree[j]!=undefined)&&(this.p.tree[j][i]!=undefined))
				{
					if(this.p.tree[j][i]&&this.p.tree[j][i].Dad)p+=this.drawTreePoint(this.p.tree[j][i]);
					else
					{
						// not an object thus add V1, T1, A1
						if(this.p.tree[j][i]&&(this.p.tree[j][i].Shape==-1))p+=this.makeTreeLine("A1",i,j);
						else if(this.p.tree[j][i]&&(this.p.tree[j][i].Shape==-2))p+=this.makeTreeLine("T1",i,j);
						else if(this.p.tree[j][i]&&(this.p.tree[j][i].Shape==-3))p+=this.makeTreeLine("V1",i,j);
					}
				}
		}
	}
	this.drawTreeLines(k,p);
}
mxG.S.prototype.initTree=function()
{
	let d=this.d,r=d/2,r2=Math.floor(r/2);
	this.dT=d;
	this.ddT=d+2*r2;
	this.rT=r;
	this.r2T=r2;
	this.r3T=r2+0.15*d;
}
// mxG.G section
mxG.G.prototype.idt=function(x,y){return x+"_"+y;}
mxG.G.prototype.getTreeOffset=function()
{
	let b1=this.tc.getBoundingClientRect(),
		b2=this.tc.querySelector('svg').getBoundingClientRect();
	return {x:b2.left-b1.left,y:b2.top-b1.top};
}
mxG.G.prototype.getTreeRatio=function()
{
	// return (size in px)/(size in svg coordinates) ratio 
	let b=this.tc.querySelector('svg').getBoundingClientRect();
	return b.width/(this.scr.ddT*this.treeM);
}
mxG.G.prototype.doClickTree=function(ev)
{
	let aN,c,x,y;
	if(this.isTreeDisabled())return;
	c=this.scr.getTxy(ev);
	x=c.x;
	y=c.y;
	if((this.tree[y]!=undefined)&&(this.tree[y][x]!=undefined))
	{
		aN=this.tree[y][x];
		this.backNode(aN);
		this.updateAll();
	}
}
mxG.G.prototype.doKeydownTree=function(ev)
{
	if(ev.key.match(/^[abcmov]$/i))
	{
		if(this.doAlphaKeydown(ev))return;
	}
	else if(ev.shiftKey||ev.key.match(/^[ufghjkln]$/i))
	{
		if(this.hasC("Navigation"))this.doKeydownNavigation(ev);
	}
}
mxG.G.prototype.buildTreeBlocksContainer=function()
{
	let i,j,k,n,m,dd=this.scr.ddT,e=this.getE("Global");
	m=this.treeColumnMax;
	n=this.treeN;
	this.treeBlocks=[];
	k=0;
	for(j=0;j<this.treeRowMax;j=j+n)
		for(i=0;i<this.treeColumnMax;i=i+m)
			{
				this.treeBlocks.push(this.scr.makeOneTreeBlockContainer(i,j,k));
				k++;
			}
	e.style.setProperty("--treeIntrinsicWidth",m*dd);
	e.style.setProperty("--treeIntrinsicHeight",Math.min(n,this.treeRowMax)*dd);
}
mxG.G.prototype.getEmphasisColor=function(k)
{
	if(k)
	{
		if(k&this.goodnessCode.Good)return this.goodColor?this.goodColor:0;
		if(k&this.goodnessCode.Bad)return this.badColor?this.badColor:0;
		if(k&this.goodnessCode.Even)return this.evenColor?this.evenColor:0;
		if(k&this.goodnessCode.Warning)return this.warningColor?this.warningColor:0;
		if(k&this.goodnessCode.Unclear)return this.unclearColor?this.unclearColor:0;
		if(k&this.goodnessCode.OffPath)return this.offPathColor?this.offPathColor:0;
		if(k&this.goodnessCode.Focus)return this.focusColor?this.focusColor:0;
	}
	return this.neutralColor?this.neutralColor:0;
}
mxG.G.prototype.getEmphasisClass=function(k)
{
	if(k)
	{
		let g=this.goodnessCode;
		if(k&g.Good)return "mxGood";
		if(k&g.Bad)return "mxBad";
		if(k&g.Even)return "mxEven";
		if(k&g.Warning)return "mxWarning";
		if(k&g.Unclear)return "mxUnclear";
		if(k&g.OffPath)return "mxOffPath";
		if(k&g.Focus)return "mxFocus";
	}
	return "mxNeutral";
}
mxG.G.prototype.hasEmphasis=function(aN)
{
	// add some code here for customization
	// for instance when one wants to compute a goodness for each node
	if(aN==this.cN)return this.goodnessCode.Focus;
	return 0; // no goodness computed at the moment
}
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
}
mxG.G.prototype.computeGoodness=function(aN,good)
{
	// for customization
	return 0; // no goodness computed at the moment
}
mxG.G.prototype.buildTree=function(aN,io,jo)
{
	let i=io,j=jo,k,km=aN.Kid.length,l,good=0,path,p,pm;
	if(!this.uC)this.setPl();
	if(j==this.treeRowMax){this.tree[j]=[];this.treeRowMax++;}
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
		for(p=0;p<pm;p++){this.tree[path[p].j][path[p].i].Good=aN.Kid[k].Good;}
	}
	this.treeColumnMax=Math.max(this.treeColumnMax,i+1);
	return aN.Good=this.computeGoodness(aN,good);
}
mxG.G.prototype.scrollTreeToShowFocus=function()
{
	let e,i,j,r,left,top,right,bottom,width,height,scrollLeft,scrollTop;
	if(!this.treeNodeOnFocus)return;
	e=this.tb;
	i=this.treeNodeOnFocus.iTree;
	j=this.treeNodeOnFocus.jTree;
	dd=this.scr.ddT;
	r=this.getTreeRatio();
	left=dd*i*r;
	top=dd*j*r;
	right=left+dd*r+1;
	bottom=top+dd*r+1;
	if(e.clientWidth===undefined)return;
	width=e.clientWidth; // clientWidth=offsetWidth-scrollBarSize in theory?
	if(!width)return;
	if(e.clientHeight===undefined)return;
	height=e.clientHeight; // clientHeight=offsetHeight-scrollBarSize in theory?
	if(!height)return;
	if(e.scrollLeft===undefined)return;
	scrollLeft=e.scrollLeft;
	if(e.scrollTop===undefined)return;
	scrollTop=e.scrollTop;
	if(left<scrollLeft)e.scrollLeft=left;
	else if((right-width)>scrollLeft)e.scrollLeft=right-width;
	if(top<scrollTop)e.scrollTop=top;
	else if((bottom-height)>scrollTop)e.scrollTop=bottom-height;
}
mxG.G.prototype.drawTree=function()
{
	let tc=this.tc;
	this.treeCheck=[];
	this.buildTreeBlocksContainer();
	// remove previously appended blocks to the tree box if any
	tc.replaceChildren();
	// append blocks to the tree box
	for(let e of this.treeBlocks)tc.appendChild(e);
	this.scrollTreeToShowFocus();
	// the drawing itself is done by the callback of this.treeObserver
}
mxG.G.prototype.disableTree=function()
{
	if(!this.tb.hasAttribute("data-maxigos-disabled"))
	{
		this.tb.setAttribute("data-maxigos-disabled","1");
		this.tb.setAttribute("tabindex","-1");
	}
}
mxG.G.prototype.enableTree=function()
{
	if(this.tb.hasAttribute("data-maxigos-disabled"))
	{
		this.tb.removeAttribute("data-maxigos-disabled");
		this.tb.setAttribute("tabindex","0");
	}
}
mxG.G.prototype.isTreeDisabled=function()
{
	return this.tb.hasAttribute("data-maxigos-disabled");
}
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
		while(this.kidOnFocus(aN))aN=this.kidOnFocus(aN);
		this.treeCurrentLast=aN;
		this.buildTree(this.rN.Kid[k],0,this.treeRowMax);
	}
	this.treeM=this.treeColumnMax;
	this.treeN=20; // number of line of a tree block
	this.drawTree();
	this.treeNodeOnFocus=this.cN;
	this.hasToSetTree=0;
}
mxG.G.prototype.clearTreeBlock=function(k)
{
	let nv,gr,j,jo,jm;
	nv=Math.min(this.treeN,this.treeRowMax);
	gr=this.treeBlocks[k];
	if(gr.firstChild)
	{
		gr.replaceChildren();
		jo=k*nv;
		jm=jo+nv;
		for(j=jo;j<jm;j++)this.treeCheck[j]=0;
	}
}
mxG.G.prototype.updateTreeBlock=function(k)
{
	if(!this.treeBlocks[k].firstChild)this.scr.drawTreeBlock(k);
}
mxG.G.prototype.updateTreeEmphasis=function()
{
	let aN,i,j,e,em,treeNode,cx,cy,d,c,cls;
	if(this.treeNodeOnFocus==this.cN)return;
	if(this.treeNodeOnFocus)
	{
		aN=this.treeNodeOnFocus;
		i=aN.iTree;
		j=aN.jTree;
		e=this.getE("TreeEmphasis"+this.idt(i,j));
		if(e&&!this.hasEmphasis(aN))e.remove();
	}
	aN=this.cN;
	this.treeNodeOnFocus=aN;
	if(em=this.hasEmphasis(aN))
	{
		i=aN.iTree;
		j=aN.jTree;
		if(treeNode=this.getE("TreeNode"+this.idt(i,j)))
		{
			e=this.getE("TreeEmphasis"+this.idt(i,j));
			if(e)e.remove();
			d=this.scr.dT+2;
			if(treeNode.tagName.match(/circle/i))
			{
				cx=treeNode.getAttributeNS(null,"cx");
				cy=treeNode.getAttributeNS(null,"cy");
			}
			else // it's a polygon
			{
				points=treeNode.getAttributeNS(null,"points");
				cx=parseFloat(points.replace(/^([0-9.]+).*$/,"$1"));
				cy=parseFloat(points.replace(/^[0-9.]+ ([0-9.]+).*$/,"$1"))+d*0.32;
			}
			c=this.getEmphasisColor(em);
			cls=this.getEmphasisClass(em);
			e=this.buildTreeEmphasis(cx,cy,d,c,cls);
			e.setAttribute("id",this.n+"TreeEmphasis"+this.idt(i,j));
			if(treeNodeShadow=this.getE("TreeNodeShadow"+this.idt(i,j)))
				treeNodeShadow.parentNode.insertBefore(e,treeNodeShadow);
			else treeNode.parentNode.insertBefore(e,treeNode);
		}
	}
}
mxG.G.prototype.doMagicTree=function(e)
{
	let k,km=e.length,nv,jo,jm,gr,z;
	nv=Math.min(this.treeN,this.treeRowMax);
	for(k=0;k<km;k++)
	{
		gr=e[k]['target'];
		z=gr.getAttribute("data-z");
		if(e[k]['isIntersecting'])this.updateTreeBlock(z);
		else this.clearTreeBlock(z);
	}
}
mxG.G.prototype.updateTree=function()
{
	if(this.hasToSetTree)this.setTree();
	else this.updateTreeEmphasis();
	this.scrollTreeToShowFocus();
	this.scr.setTreeTitleDesc((this.tb==document.activeElement)?1:0);
}
mxG.G.prototype.doFocusTree=function(ev)
{
	this.tb.setAttribute("aria-busy","false");
}
mxG.G.prototype.doBlurTree=function(ev)
{
	this.tb.setAttribute("aria-busy","true");
	this.scr.setTreeTitleDesc(0);
}
mxG.G.prototype.initTree=function()
{
	let k=this.k;
	this.tb=this.getE("TreeBox");
	this.tc=this.getE("TreeContent");
	this.tb.addEventListener("keydown",function(ev){mxG.D[k].doKeydownTree(ev);});
	this.tb.addEventListener("focus",function(ev){mxG.D[k].doFocusTree(ev);});
	this.tb.addEventListener("blur",function(ev){mxG.D[k].doBlurTree(ev);});
	this.tc.getMClick=mxG.getMClick;
	this.tc.addEventListener("click",function(ev){mxG.D[k].doClickTree(ev);});
	this.scr.initTree();
	this.hasToSetTree=1;
	this.treeObserver=new IntersectionObserver(function(e){mxG.D[k].doMagicTree(e);});
}
mxG.G.prototype.createTree=function()
{
	let a,b;
	this.hideTreeNumbering=this.setA("hideTreeNumbering",0,"bool");
	this.markCommentOnTree=this.setA("markCommentOnTree",0,"bool");
	this.goodnessCode={Good:1,Bad:2,Even:4,Warning:8,Unclear:16,OffPath:32,Focus:64};
	a=` tabindex="0" role="group" aria-live="assertive" aria-busy="true"`;
	b=` data-name="${this.local("Game tree")}"`;
	return `<div class="mxTreeBox" id="${this.n}TreeBox"${a+b}>`
	+`<div class="mxTreeContent" id="${this.n}TreeContent"></div></div>`;
}
}