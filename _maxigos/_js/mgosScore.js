// maxiGos v7 > mgosScore.js
if(!mxG.G.prototype.createScore)
{
mxG.fr("Score","Score");
mxG.fr("Score method:","Méthode de score :");
mxG.fr("trivial","triviale");
mxG.fr("counting","décompte");
mxG.fr("propagate","propagation");
mxG.fr("estimate","estimation");
mxG.fr("ephemeral score","score éphémère");
mxG.fr("Black:","Noir :");
mxG.fr("White:","Blanc :");
mxG.fr("Chinese style","chinois");
mxG.fr("Japanese style","japonais");
mxG.fr("Unusual komi","Komi inhabituel");
mxG.fr("Unknown rules","Règle inconnue");

mxG.G.prototype.buildScore=function()
{
	var s="",i,j,cb=0,cw=0,ib=0,iw=0,pb=0,pw=0,handicap,komi,rules,r;
	var hasC=this.hasC("C"),expectedKomi;
	rules=this.getInfoS("RU");
	if(!rules) rules=this.scoreDefaultRules;
	if(rules) rules=rules.toLowerCase();
	if((rules=="chinese")||(rules=="ing")||(rules=="goe")||(rules=="nz")) r="C";
	else if((rules=="aga")||(rules=="french")||(rules=="british")) r="C";
	else if((rules=="japanese")||(rules=="korean")) r="J";
	else r=null;
	komi=this.getInfoS("KM");
	if(komi)
	{
		komi=parseFloat(komi);
		if(!komi) komi=0; // when komi is a string such as BBW, BBBW ...?
	}
	else if(r=="J") komi=6.5;
	else if(r=="C") komi=7.5;
	else komi=5.5; // default sgf value
	// assume komi when handicap is 0.5+handicap-1 if Chinese style rules in the SGF
	// todo:
	//	if handicap is not specified in the SGF,
	//	but some handicap-like AB are at the beginning
	//	try to guess the handicap?
	handicap=this.getInfoS("HA");
	if(handicap) {handicap=parseInt(handicap);if(!handicap) handicap=0;}
	else if(komi==0.5) handicap=1;
	else handicap=0;
	for(i=1;i<=this.DX;i++)
		for(j=1;j<=this.DY;j++)
		{
			switch(this.scoreBan.computed[i][j])
			{
				case "B":cb++;
					if(this.scoreBan.initial[i][j]=="W") pb++;break;
				case "W":cw++;
					if(this.scoreBan.initial[i][j]=="B") pw++;break;
				default:
					switch(this.scoreBan.initial[i][j])
					{
						case "B":ib++;break;
						case "W":iw++;break;
					}
			}
		}
	pb+=this.gor.getPrisoners("B"); // ignore pass penalty
	pw+=this.gor.getPrisoners("W"); // ignore pass penalty
	// when !r, do not display score to avoid inconsistency
	if(r=="C")
	{
		if(handicap) expectedKomi=0.5+handicap-1;
		else expectedKomi=7.5;
		if(hasC) s+="<h1>";
		s+=this.local("Score")+" ("+this.local("Chinese style")+")";
		if(hasC) s+="</h1>"; else s+="\n";
		if(hasC) s+="<p>";
		s+=this.local("Black:")+" "+cb+" + "+ib+" = "+(cb+ib);
		if(hasC) s+="</p>"; else s+="\n";
		if(hasC) s+="<p>";
		s+=this.local("White:")+" "+cw+" + "+iw+" + "+komi+" = "+(cw+iw+komi);
		if(hasC) s+="</p>"; else s+="\n";
		if(expectedKomi!=komi)
		{
			if(hasC) s+="<p>";
			s+=this.local("Unusual komi");
			if(hasC) s+="</p>"; else s+="\n";
		}
	}
	else if(r=="J")
	{
		if(handicap) expectedKomi=0.5;
		else expectedKomi=6.5;
		if(hasC) s+="<h1>";
		s+=this.local("Score")+" ("+this.local("Japanese style")+")";
		if(hasC) s+="</h1>"; else s+="\n";
		if(hasC) s+="<p>";
		s+=this.local("Black:")+" "+cb+" + "+pb+" = "+(cb+pb);
		if(hasC) s+="</p>"; else s+="\n";
		if(hasC) s+="<p>";
		s+=this.local("White:")+" "+cw+" + "+pw+" + "+komi+" = "+(cw+pw+komi);
		if(hasC) s+="</p>"; else s+="\n";
		if(expectedKomi!=komi)
		{
			if(hasC) s+="<p>";
			s+=this.local("Unusual komi");
			if(hasC) s+="</p>"; else s+="\n";
		}
	}
	else
	{
		if(hasC) s+="<h1>";
		s+=this.local("Score");
		if(hasC) s+="</h1>"; else s+="\n";
		if(hasC) s+="<p>";
		s+=this.local("Unknown rules");
		if(hasC) s+="</p>"; else s+="\n";
	}
	if(hasC) s="<div class=\"mxScoreContentDiv\">"+s+"</div>";
	return s;
};
mxG.G.prototype.getTX=function()
{
	var TX=["TB","TW"];
	var aN,k,aLen,s,x,y,x1,y1,x2,y2,z;
	aN=this.cN4Score;
	for(z=0;z<7;z++)
	{
		if(aN.P[TX[z]]) aLen=aN.P[TX[z]].length;else aLen=0;
		for(k=0;k<aLen;k++)
		{
			s=aN.P[TX[z]][k];
			if(s.length==2)
			{
				x=s.c2n(0);
				y=s.c2n(1);
				this.scoreBan.marked[x][y]=(TX[z]=="TB")?"B":"W";
				if(!this.ephemeralScore)
					this.scoreBan.modified[x][y]=this.scoreBan.marked[x][y];
			}
			else if(s.length==5)
			{
				x1=s.c2n(0);
				y1=s.c2n(1);
				x2=s.c2n(3);
				y2=s.c2n(4);
				for(x=x1;x<=x2;x++)
					for(y=y1;y<=y2;y++)
					{
						this.scoreBan.marked[x][y]=(TX[z]=="TB")?"B":"W";
						if(!this.ephemeralScore)
							this.scoreBan.modified[x][y]=this.scoreBan.marked[x][y];
					}
			}
		}
	}
};
mxG.G.prototype.removeTX=function(a,b)
{
	// remove TM[ab] or TW[ab] if any
	var k,km,kp,TX=["TB","TW"],aN,v;
	aN=this.cN4Score;
	v=this.xy2s(a,b);
	for(kp=0;kp<TX.length;kp++)
	{
		if(aN.P[TX[kp]])
		{
			km=aN.P[TX[kp]].length;
			for(k=0;k<km;k++) if(aN.P[TX[kp]][k]==v) break;
			if(k<km) aN.TakeOff(TX[kp],k);
		}
	}
};
mxG.G.prototype.addTX=function(tx,a,b)
{
	// tx is "TB" or "TW"
	var aN,v;
	aN=this.cN4Score;
	v=this.xy2s(a,b);
	this.removeTX(a,b);
	if(aN.P[tx]) aN.P[tx].push(v);
	else aN.P[tx]=[v];
};
mxG.G.prototype.setTX=function(from)
{
	var i,j;
	for(i=1;i<=this.DX;i++)
		for(j=1;j<=this.DY;j++)
		{
			switch(this.scoreBan[from][i][j])
			{
				case "B":this.addTX("TB",i,j);break;
				case "W":this.addTX("TW",i,j);break;
				default:this.removeTX(i,j);
			}
		}
};
mxG.G.prototype.z_estimate=function(x,y)
{
	let nat,z=0;
	if(this.gor.inGoban(x,y))
	{
		nat=this.scoreBan.computed[x][y]?
				this.scoreBan.computed[x][y]:
					this.scoreBan.initial[x][y];
		if((nat=="B")||(nat=="W")) z=(nat=="B"?1:2);
		else z=4;
	}
	return z;
};
mxG.G.prototype.checkNeighbour=function(x,y)
{
	let z=0;
	return this.z_estimate(x-1,y)
		|this.z_estimate(x+1,y)
		|this.z_estimate(x,y-1)
		|this.z_estimate(x,y+1);
};
mxG.G.prototype.currentOwner_estimate=function(x,y)
{
	let nat;
	nat=this.scoreBan.modified[x][y];
	if((nat=="B")||(nat=="W")) return nat;
	nat=this.scoreBan.initial[x][y];
	if((nat=="B")||(nat=="W")) return nat;
	return "E";
};
mxG.G.prototype.currentOwner=function(x,y)
{
	let nat;
	if(this.scoreMethod=="estimate") return this.currentOwner_estimate(x,y);
	nat=this.scoreBan.computed[x][y];
	if((nat=="B")||(nat=="W")) return nat;
	nat=this.scoreBan.initial[x][y];
	if((nat=="B")||(nat=="W")) return nat;
	return "E";
};
mxG.G.prototype.w4po=function(s,x,y,a)
{
	if(this.gor.inGoban(x,y))
	{
		let z;
		z=this.currentOwner(x,y);
		if(z=="B") s.b+=a; else if(z=="W") s.w+=a;
	}
	return s;
};
mxG.G.prototype.possibleOwner=function(x,y)
{
	var s={b:0,w:0},z,i,j,k,n;
	// avoid use of last score action here: mess for little benefit
	k=9;
	for(i=x-k;i<=x+k;i++)
		for(j=y-k;j<=y+k;j++)
			if((i!=x)||(j!=y))
				if(this.gor.inGoban(i,j)&&(((x-i)*(x-i)+(y-j)*(y-j))<=(k*k)))
				{
					n=Math.pow(3,k-Math.abs(x-i)+k-Math.abs(y-j));
					s=this.w4po(s,i,j,n);
				}
	if(s.b>s.w) return "B";
	if(s.w>s.b) return "W";
	return null;
	// todo: better choice? scan more distant points?
};
mxG.G.prototype.getNatWhenScore_trivial=function(x,y)
{
	return this.scoreBan.initial[x][y];
};
mxG.G.prototype.getNatWhenScore_counting=function(x,y)
{
	if(this.scoreBan.initial[x][y]=="E") return "E";
	if(this.scoreBan.taken[x][y]) return "E";
	return this.scoreBan.initial[x][y];
};
mxG.G.prototype.getNatWhenScore_propagate=function(x,y)
{
	let natm;
	if(this.scoreBan.initial[x][y]=="E")
	{
		if(this.scoreBan.modified[x][y]) natm=this.scoreBan.modified[x][y];
		else natm="E";
	}
	else
	{
		if(this.scoreBan.taken[x][y]) natm="E";
		else natm=this.scoreBan.initial[x][y];
	}
	return natm;
};
mxG.G.prototype.getNatWhenScore_estimate=function(x,y)
{
	return this.getNatWhenScore_propagate(x,y);
};
mxG.G.prototype.getNatWhenScore=function(x,y)
{
	// do not use this.scoreBan.computed in getNatWhenScore()
	return this["getNatWhenScore_"+this.scoreMethod](x,y);
};
mxG.G.prototype.guessNextWhenScore=function(x,y)
{
	let a,b,c,po;
	c=this.scoreBan.computed[x][y];
	if((this.lastScoreAct.x==x)&&(this.lastScoreAct.y==y))
	{
		b=this.lastScoreAct.a;
		if((b=="B")&&(c=="W")) a="E";
		else if((b=="B")&&(c==null)) a="W";
		else if((b=="W")&&(c=="B")) a="E";
		else if((b=="W")&&(c==null)) a="B";
		else if((b=="E")&&(c=="B")) a="W";
		else if((b=="E")&&(c=="W")) a="B";
	}
	else
	{
		switch(c)
		{
			case "B":
			case "W":a="E";break;
			default:po=this.possibleOwner(x,y);a=po?po:"B";
		}
	}
	return a;
}
mxG.G.prototype.hasPrisonerWhenScore=function(nat,x,y)
{
	// check if a stone has at least one already marked prisoner as distant neighbour
	if(this.gor.inGoban(x,y))
	{
		let xy=this.xy(x,y);
		let natm=this.getNatWhenScore(x,y);
		let onat=(nat=="B"?"W":"B");
		if(this.visitedWhenHasPrisoner[xy]) return 0;
		this.visitedWhenHasPrisoner[xy]=1;
		if(this.scoreBan.taken[x][y]==onat) return 1;
		// no taken onat stone found, continue with other nat stones or empty points
		if(natm!=onat)
			return this.hasPrisonerWhenScore(nat,x-1,y)
				|this.hasPrisonerWhenScore(nat,x+1,y)
				|this.hasPrisonerWhenScore(nat,x,y-1)
				|this.hasPrisonerWhenScore(nat,x,y+1);
	}
	return 0;
};
mxG.G.prototype.checkSurrounding=function(x,y)
{
	// verify is (x,y) is in an area surrounded by B or W
	// if surrounded by B, return 1
	// if surrounded by W, return 2
	// if surrounded by B and W, return 3
	// if not surrounded by B or W, return 0
	if(this.gor.inGoban(x,y))
	{
		let xy=this.xy(x,y);
		let natm=this.getNatWhenScore(x,y);
		if(this.visitedWhenCheckSurrounding[xy]) return 0;
		this.visitedWhenCheckSurrounding[xy]=1;
		if(natm=="E")
			return this.checkSurrounding(x-1,y)
				|this.checkSurrounding(x+1,y)
				|this.checkSurrounding(x,y-1)
				|this.checkSurrounding(x,y+1);
		if(natm=="B") return 1;
		if(natm=="W") return 2;
	}
	return 0;
};
mxG.G.prototype.canSwapWhenScore=function(nat,x,y)
{
	if(this.scoreBan.computed[x][y]) return 1;
	this.visitedWhenHasPrisoner=[];
	return !this.hasPrisonerWhenScore(nat,x,y);
};
mxG.G.prototype.swapWhenScore=function(nat,x,y,d)
{
	// if d,
	//	add onat mark on all empty points of the area and all stones of nat color
	//		of the area where (x,y) is (ie surrounded by onat stones)
	// else
	//	remove mark on all empty points of the area and all stones of nat color
	//		of the area where (x,y) is (ie surrounded by onat stones)
	// warning: do not use checkSurrounding() during swapWhenScore() process
	let onat=(nat=="B")?"W":"B";
	if(this.gor.inGoban(x,y))
	{
		let xy=this.xy(x,y);
		let natm=this.getNatWhenScore(x,y);
		if(this.visitedWhenSwap[xy]) return 0;
		this.visitedWhenSwap[xy]=1;
		if((natm==nat)||(natm=="E"))
		{
			if(d)
			{
				this.scoreBan.computed[x][y]=onat;
				if(this.scoreBan.initial[x][y]==nat) this.scoreBan.taken[x][y]=nat;
			}
			else
			{
				this.scoreBan.computed[x][y]=null;
				if(this.scoreBan.initial[x][y]==nat) this.scoreBan.taken[x][y]=null;
			}
			this.swapWhenScore(nat,x-1,y,d);
			this.swapWhenScore(nat,x+1,y,d);
			this.swapWhenScore(nat,x,y-1,d);
			this.swapWhenScore(nat,x,y+1,d);
		}
	}
};
mxG.G.prototype.computeScoreMarks_trivial=function(v)
{
	var i,j;
	for(i=1;i<=this.DX;i++)
		for(j=1;j<=this.DY;j++)
		{
			if(!v||v[this.xy(i,j)])
			{
				if(this.scoreBan.modified[i][j])
				{
					switch(this.scoreBan.modified[i][j])
					{
						case "B":this.scoreBan.computed[i][j]="B";break;
						case "W":this.scoreBan.computed[i][j]="W";break;
						default:this.scoreBan.computed[i][j]=null;
					}
				}
			}
		}
};
mxG.G.prototype.computeScoreMarks_counting=function(v)
{
	var i,j;
	for(i=1;i<=this.DX;i++)
		for(j=1;j<=this.DY;j++)
		{
			if(!v||v[this.xy(i,j)])
			{
				if(this.scoreBan.initial[i][j]=="E")
				{
					let z;
					this.visitedWhenCheckSurrounding=[];
					z=this.checkSurrounding(i,j);
					if(z==1) this.scoreBan.computed[i][j]="B";
					else if(z==2) this.scoreBan.computed[i][j]="W";
					else this.scoreBan.computed[i][j]=null;
				}
			}
		}
};
mxG.G.prototype.computeScoreMarks_propagate=function(v)
{
	this.computeScoreMarks_counting(v);
};
mxG.G.prototype.computeScoreMarks_estimate=function(v)
{
	var i,j;
	for(i=1;i<=this.DX;i++)
		for(j=1;j<=this.DY;j++)
		{
			if(!v||v[this.xy(i,j)])
			{
				//console.log(i+" "+j+" "+this.scoreBan.initial[i][j]);
				if(this.scoreBan.initial[i][j]=="E")
					this.scoreBan.computed[i][j]=this.possibleOwner(i,j);
				else
				{
					let nat,onat;
					nat=this.scoreBan.initial[i][j];
					onat=(nat=="B"?"W":"B");
					if(this.scoreBan.modified[i][j]==onat)
					{
						this.scoreBan.taken[i][j]=nat;
						this.scoreBan.computed[i][j]=onat;
					}
					else
					{
						this.scoreBan.taken[i][j]=null;
						this.scoreBan.computed[i][j]=null;
					}
				}
			}
		}
	// clean singletons
	for(i=1;i<=this.DX;i++)
		for(j=1;j<=this.DY;j++)
		{
			if(!v||v[this.xy(i,j)])
			{
				if(this.scoreBan.initial[i][j]=="E")
				{
					let z=this.checkNeighbour(i,j);
					// console.log(i+" "+j+" "+z);
					if(z==1) this.scoreBan.computed[i][j]="B";
					else if(z==2) this.scoreBan.computed[i][j]="W";
				}
			}
		}
	// neutral points
	for(i=1;i<=this.DX;i++)
		for(j=1;j<=this.DY;j++)
		{
			if(!v||v[this.xy(i,j)])
			{
				this.scoreBan.buffer[i][j]=this.scoreBan.computed[i][j];
				if(this.scoreBan.initial[i][j]=="E")
				{
					let z=this.checkNeighbour(i,j);
					if((z!=1)&&(z!=2)) this.scoreBan.buffer[i][j]=null;
				}
			}
		}
	for(i=1;i<=this.DX;i++)
		for(j=1;j<=this.DY;j++)
		{
			if(!v||v[this.xy(i,j)])
			{
				this.scoreBan.computed[i][j]=this.scoreBan.buffer[i][j];
			}
		}
};
mxG.G.prototype.computeScoreMarks=function(v)
{
	if(this.scoreMethod=="estimate") this.computeScoreMarks_estimate(v);
	else if(this.scoreMethod=="propagate") this.computeScoreMarks_propagate(v);
	else if(this.scoreMethod=="counting") this.computeScoreMarks_counting(v);
	else this.computeScoreMarks_trivial(v);
};
mxG.G.prototype.checkScore_trivial=function(a,b)
{
	let po,opo;
	po=this.possibleOwner(a,b);
	po=po?po:"B";
	opo=(po=="B")?"W":"B";
	switch(this.scoreBan.computed[a][b])
	{
		case po:
			switch(this.scoreBan.initial[a][b])
			{
				case opo: this.scoreBan.modified[a][b]="E";break;
				default: this.scoreBan.modified[a][b]=opo;
			};break;
		case opo:
			this.scoreBan.modified[a][b]="E";break;
		default:
			switch(this.scoreBan.initial[a][b])
			{
				case po: this.scoreBan.modified[a][b]=opo;break;
				default: this.scoreBan.modified[a][b]=po;
			}
	}
	this.computeScoreMarks(null);
};
mxG.G.prototype.checkScore_counting=function(x,y)
{
	let nat=this.scoreBan.initial[x][y],d=this.scoreBan.computed[x][y]?0:1,z;
	if(((nat=="B")||(nat=="W"))&&this.canSwapWhenScore(nat,x,y))
	{
		this.visitedWhenSwap=[];
		this.swapWhenScore(nat,x,y,d);
		// restore the territories of dead stones coming back to life
		this.computeScoreMarks(this.visitedWhenSwap);
	}
	else if(nat=="E")
	{
		this.visitedWhenCheckSurrounding=[];
		z=this.checkSurrounding(x,y);
		this.visitedWhenSwap=[];
		if(z==1) this.swapWhenScore("W",x,y,d);
		else if(z==2) this.swapWhenScore("B",x,y,d);
	}
};
mxG.G.prototype.clearMarkWhenScore=function(c,o,x,y)
{
	if(this.gor.inGoban(x,y)&&!this.scoreBan.modified[x][y]
		&&this.scoreBan.computed[x][y]&&(this.scoreBan.computed[x][y]==c))
	{
		this.visitedWhenSwap=[];
		this.swapWhenScore(o,x,y,0);
	}
};
mxG.G.prototype.checkScore_propagate=function(x,y)
{
	let nat=this.scoreBan.initial[x][y],a,b,c=this.scoreBan.computed[x][y],d=c?0:1,z;
	if(((nat=="B")||(nat=="W"))&&this.canSwapWhenScore(nat,x,y))
	{
		this.visitedWhenSwap=[];
		this.swapWhenScore(nat,x,y,d);
		// restore the territories of dead stones coming back to life
		this.computeScoreMarks(this.visitedWhenSwap);
	}
	else if(nat=="E")
	{
		if(!this.scoreBan.modified[x][y]||(this.scoreBan.modified[x][y]=="E"))
		{
			this.visitedWhenCheckSurrounding=[];
			z=this.checkSurrounding(x,y);
			// if (x,y) in a surrounded area, swap the whole area then exit 
			if(z==1) {this.visitedWhenSwap=[];this.swapWhenScore("W",x,y,d);return;}
			if(z==2) {this.visitedWhenSwap=[];this.swapWhenScore("B",x,y,d);return;}
		}
		else
		{
			// clean marks around (x,y) if any
			let o=((c=="B")?"W":"B");
			this.clearMarkWhenScore(c,o,x-1,y);
			this.clearMarkWhenScore(c,o,x+1,y);
			this.clearMarkWhenScore(c,o,x,y-1);
			this.clearMarkWhenScore(c,o,x,y+1);
		}
		a=this.guessNextWhenScore(x,y);
		this.lastScoreAct={a:(c?c:"E"),x:x,y:y};
		this.scoreBan.modified[x][y]=a;
		this.scoreBan.computed[x][y]=((a=="E")?null:a);
	}
};
mxG.G.prototype.checkScore_estimate=function(x,y)
{
	// change stone status
	let nat=this.scoreBan.initial[x][y];
	if((nat=="B")||(nat=="W"))
	{
		let onat=(nat=="B"?"W":"B");
		if(this.scoreBan.modified[x][y]==onat) this.scoreBan.modified[x][y]="E";
		else this.scoreBan.modified[x][y]=onat;
		this.computeScoreMarks(null);
	}
};
mxG.G.prototype.initScoreBan=function()
{
	// initial: goban state
	// marked: initial marks, used to restore marks if ephemeralScore
	// modified: initial marks + marks added by the user
	// taken: stones marked as dead
	// computed: computed marks, those displayed (depends on scoreMethod)
	var i,j,nat;
	this.scoreBan={initial:[],marked:[],modified:[],taken:[],computed:[],buffer:[]};
	for(i=1;i<=this.DX;i++)
	{
		this.scoreBan.initial[i]=[];
		this.scoreBan.marked[i]=[];
		this.scoreBan.modified[i]=[];
		this.scoreBan.taken[i]=[];
		this.scoreBan.computed[i]=[];
		this.scoreBan.buffer[i]=[];
		for(j=1;j<=this.DY;j++)
		{
			nat=this.gor.getBanNat(i,j);
			this.scoreBan.initial[i][j]=nat;
			this.scoreBan.marked[i][j]=null;
			this.scoreBan.modified[i][j]=null;
			this.scoreBan.taken[i][j]=null;
			this.scoreBan.computed[i][j]=null;
			this.scoreBan.buffer[i][j]=null;
		}
	}
	this.getTX();
	this.lastScoreAct={a:"E",x:-1,y:-1};
	this.computeScoreMarks(null);
	this.setTX("computed");
};
mxG.G.prototype.checkScore=function(x,y)
{
	if(this.scoreMethod=="estimate") this.checkScore_estimate(x,y);
	else if(this.scoreMethod=="propagate") this.checkScore_propagate(x,y);
	else if(this.scoreMethod=="counting") this.checkScore_counting(x,y);
	else this.checkScore_trivial(x,y);
	this.setTX("computed");
	this.updateAll();
};
mxG.G.prototype.doClickScore=function(ev)
{
	var c;
	if(this.isGobanDisabled()) return;
	if(this.canPlaceScore)
	{
		c=this.scr.getC(ev);
		if(!this.inView(c.x,c.y)) {this.plonk();return;}
		this.checkScore(c.x,c.y);		
	}
};
mxG.G.prototype.doKeydownGobanForScore=function(ev)
{
	var c;
	if(this.isGobanDisabled()) return;
	if(this.canPlaceScore&&this.gobanFocusVisible)
	{
		c=mxG.getKCode(ev);
		if((c==13)||(c==32))
		{
			this.checkScore(this.xFocus,this.yFocus);
			ev.preventDefault();
		}
	}
};
mxG.G.prototype.toggleScore=function()
{
	// call this function each one wants to enter/quit score mode
	if(this.canPlaceScore)
	{
		if(this.ephemeralScore)
		{
			this.setTX("marked");
			if(this.hasC("Edit"))
				this.getE("CommentToolText").value=this.formerCommentWhenScore;
		}
		this.canPlaceScore=0;
		this.canPlaceVariation=this.initialCanPlaceVariationForScore;
		this.canPlaceGuess=this.initialCanPlaceGuessForScore;
		this.canPlaceSolve=this.initialCanPlaceSolveForScore;
		this.canPlaceEdit=this.initialCanPlaceEditForScore;	
		this.marksAndLabelsOn=this.initialmarksAndLabelsOnForScore;
		this.cN4Score=null;
	}
	else
	{
		if(this.ephemeralScore)
		{
			if(this.hasC("Edit"))
				this.formerCommentWhenScore=this.getCommentWhenEdit();
		}
		this.canPlaceScore=1;
		this.initialCanPlaceVariationForScore=(this.canPlaceVariation?1:0);
		this.initialCanPlaceGuessForScore=(this.canPlaceGuess?1:0);
		this.initialCanPlaceSolveForScore=(this.canPlaceSolve?1:0);
		this.initialCanPlaceEditForScore=(this.canPlaceEdit?1:0);
		this.initialmarksAndLabelsOnForScore=(this.marksAndLabelsOn?1:0);
		this.canPlaceVariation=0;
		this.canPlaceGuess=0;
		this.canPlaceSolve=0;
		this.canPlaceEdit=0;
		this.marksAndLabelsOn=1;
		this.cN4Score=this.cN;
		this.initScoreBan();
	}
};
mxG.G.prototype.doScore=function()
{
	if(this.gBox) this.hideGBox(this.gBox);
	this.toggleScore();
	this.updateAll();
};
mxG.G.prototype.updateScore=function()
{
	if(this.getE("ScoreBtn"))
	{
		if(this.canPlaceScore) this.selectBtn("Score");
		else this.unselectBtn("Score");
	}
};
mxG.G.prototype.initScore=function()
{
	var k=this.k;
	this.ig.getMClick=mxG.getMClick;
	this.ig.addEventListener("click",function(ev){mxG.D[k].doClickScore(ev);},false);
	if(this.canGobanFocus)
		this.ig.addEventListener("keydown",
			function(ev){mxG.D[k].doKeydownGobanForScore(ev);},false);
	if(this.scoreBtnOn)
		this.addBtn(this.getE("ScoreDiv"),{n:"Score",v:this.alias("Score","scoreAlias")});
};
mxG.G.prototype.createScore=function()
{
	this.scoreBtnOn=this.setA("scoreBtnOn",0,"bool");
	this.ephemeralScore=this.setA("ephemeralScore",0,"bool");
	this.scoreAlias=this.setA("scoreAlias",null,"string");
	this.scoreDefaultRules=this.setA("scoreDefaultRules",null,"string");
	this.scoreInComment=this.setA("scoreInComment",0,"bool");
	this.scoreMethod=this.setA("scoreMethod","trivial","string");
	this.canPlaceScore=0;
	return this.createBtnBox("Score");
};
}
