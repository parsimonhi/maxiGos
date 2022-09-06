// maxiGos v7 > mgosNotSeen.js
if(!mxG.G.prototype.createNotSeen)
{
mxG.fr("→","→");
mxG.fr("pass","passe");
mxG.fr("tenuki","ailleurs");
mxG.G.prototype.buildNotSeen=function()
{
	var k,kmx,y,n,no,nat,nato,s="",t,a=[],o;
	var mo=this.gor.setup+1,m=this.gor.play;
	for(k=mo;k<=m;k++)
	{
		x=this.gor.getX(k);
		y=this.gor.getY(k);
		nat=this.gor.getNat(k);
		n=this.getVisibleNum(k);
		if(n>0)
		{
			if((n>1)&&(k>mo)&&(nat==this.gor.getNat(k-1)))
			{
				t=this.local("tenuki");
				a.push({nat:(nat=="B"?"W":"B"),n:(n-1),t:t});
			}
			if(!x&&!y)
			{
				t=this.local("pass");
				a.push({nat:nat,n:n,t:t});
			}
			else if(!this.inView(x,y))
			{
				t=this.local("tenuki");
				a.push({nat:nat,n:n,t:t});
			}
			else
			{
				no=this.getVisibleNum(this.getVisibleMove(x,y));
				if(n!=no)
				{
					if(no&&this.notSeenTwinStonesOn)
					{
						nato=this.getVisibleNat(no);
						t=this.local("→");
						a.push({nat:nat,n:n,t:t,nato:nato,no:no});
					}
					else
					{
						t=this.local("→")+" "+this.scr.k2c(x)+this.scr.k2n(y);
						a.push({nat:nat,n:n,t:t});
					}
				}
			}
		}
	}
	o={in3dOn:this.in3dOn,stoneShadowOn:this.stoneShadowOn};
	if(this.oldJapaneseNumberingOn)
	{
		o.vertical=1;
		km=a.length;
		for(k=0;k<km;k++)
		{
			a[k].n=this.scr.k2okanji(a[k].n);
			if(a[k].no) a[k].no=this.scr.k2okanji(a[k].no);
		}
	}
	if(a.length) return this.scr.makeNotSeen(a,o);
	return "";
};
mxG.G.prototype.adjustNotSeen=function()
{
	var e=this.getE("InnerNotSeenDiv");
	if((this.scr.wr<100)&&!this.magicParentNum)
		e.style.width=this.scr.wr+"%";
};
mxG.G.prototype.updateNotSeen=function()
{
	var s=(this.numberingOn?this.buildNotSeen():""),
		e=this.getE("InnerNotSeenDiv");
	e.innerHTML=s;
	this.adjustNotSeen();
};
mxG.G.prototype.createNotSeen=function()
{
	var s="";
	this.notSeenTwinStonesOn=this.setA("notSeenTwinStonesOn",1,"bool");
	s+="<div class=\"mxNotSeenDiv\" id=\""+this.n+"NotSeenDiv\">";
	s+="<div class=\"mxInnerNotSeenDiv\" id=\""+this.n+"InnerNotSeenDiv\">";
	s+="</div>";
	s+="</div>";
	return s;
};
}
