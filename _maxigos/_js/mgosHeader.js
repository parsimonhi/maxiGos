// maxiGos v8 > mgosHeader.js
if(!mxG.G.prototype.createHeader)
{
mxG.fr("Header","Informations");
mxG.fr(" "," ");
mxG.fr(", ",", ");
mxG.fr(": "," : ");
mxG.fr(".",",");
mxG.fr("Black","Noir");
mxG.fr("White","Blanc");
mxG.fr(" wins"," gagne");
mxG.fr("Date","Date");
mxG.fr("Place","Lieu");
mxG.fr("Time limits","Durée");
mxG.fr("Rules","Règle");
mxG.fr("Handicap","Handicap");
mxG.fr("Result","Résultat");
mxG.fr("none","aucun");
mxG.fr(" by resign"," par abandon");
mxG.fr(" by time"," au temps");
mxG.fr(" by forfeit"," par forfait");
mxG.fr(" by "," de ");
mxG.fr("game with no result","partie sans résultat");
mxG.fr("draw","partie nulle");
mxG.fr("unknown result","résultat inconnu");
mxG.fr("Komi","Komi ");
mxG.fr(" point"," point");
mxG.fr(" points"," points");
mxG.fr(" Close ","Fermer"); // add space to avoid confusion with menu "Close"
mxG.fr("h","h");
mxG.fr("mn","mn");
mxG.fr("s","s");
mxG.fr(" per player"," par joueur");
mxG.fr("Japanese","japonaise");
mxG.fr("Chinese","chinoise");
mxG.fr("Korean","coréene");
mxG.fr("GOE","Ing");
mxG.fr("AGA","américaine / française");
mxG.fr(" move"," coup");
mxG.fr(" moves"," coups");
mxG.fr("Number of moves","Nombre de coups");
mxG.fr("translateTitle",function(ev,ro)
{
	let s=ev+"",a=ro+"",c="",of="",t="",between="";
	if(a!="")
	{
		if(a.search(/^([0-9]+)$/)==0) t="ronde";
		else if(a.search(/[ ]*\((final|semi-final|quarter-final|playoff|game|round)\)/i)>=0)
		{
			if(s.search(/[ ]+(cup|league)/i)>=0) of=" de la ";else if(s) of=" du ";
			if(a.search(/[ ]*\(final\)/i)>=0) {c="Finale"+of;t="partie";}
			else if(a.search(/[ ]*\(semi-final\)/i)>=0) {c="Demi-finale"+of;t="partie";}
			else if(a.search(/[ ]*\(quarter-final\)/i)>=0) {c="Quart de finale"+of;t="partie";}
			else if(a.search(/[ ]*\(playoff\)/i)>=0) {c="Playoff"+of;t="partie";}
			else if(a.search(/[ ]*\(game\)/i)>=0) t="partie";
			else t="tour";
			a=a.replace(/[ ]*\((final|semi-final|quarter-final|playoff|game|round)\)/i,"");
		}
		else if(a.search(/[ ]*\(final tournament\)/i)>=0)
		{
			if(s.search(/[ ]+(cup|league)/i)>=0) of=" de la ";else if(s) of=" du ";
			c="Tournoi final"+of;t="ronde";
			a=a.replace(/[ ]*\(final tournament\)/i,"");
		}
		if(a.search(/^([0-9]+)/)==0) a=a.replace(/^([0-9]+)(.*)/,t+(t?" ":"")+"$1$2");
	}
	if(s.search(/^([0-9]+)(st|nd|rd|th)/i)>=0)
	{
		s=s.replace(/^([0-9]+)(st|nd|rd|th)[ ]+Female[ ]+(.*)$/i,"$1$2 $3 féminin");
		s=s.replace(/^([0-9]+)(st|nd|rd|th)[ ]+(Former|Old)[ ]+(.*)$/i,"$1$2 ancien $4");
		s=s.replace(/^([0-9]+)(st|nd|rd|th)/i,"$1<span class=\"sup\">e</span>");
		s=s.replace(/^1<span class=\"sup\">e<\/span>/,(s.search(/[ ]+(cup|league)/i)>=0)?"1<span class=\"sup\">re</span>":"1<span class=\"sup\">er</span>");
	}
	s=c+s;
	if(s&&(a.search(/^[a-zA-Z0-9]/)==0)) s+=", ";else if(s&&a) s+=" ";
	if(s) s=s.ucF(); else if(a) a=a.ucF();
	return s+a;
});
mxG.en("translateTitle",function(ev,ro)
{
	let s=ev+"",a=ro+"",c="",t="",before="",between="";
	if(a!="")
	{
		if(a.search(/^([0-9]+)$/)==0) t="round";
		if(a.search(/[ ]*\((final|semi-final|quarter-final|playoff|game|round)\)/i)>=0)
		{
			if(s) before=", ";
			if(a.search(/[ ]*\(final\)/i)>=0) {c=before+"final";t="game";}
			else if(a.search(/[ ]*\(semi-final\)/i)>=0) {c=before+"semi-final";t="game";}
			else if(a.search(/[ ]*\(quarter-final\)/i)>=0) {c=before+"quarter-final";t="game";}
			else if(a.search(/[ ]*\(playoff\)/i)>=0) {c=before+"playoff";t="game";}
			else if(a.search(/[ ]*\(game\)/i)>=0) t="game";
			else t="round";
			a=a.replace(/[ ]*\((final|semi-final|quarter-final|playoff|game|round)\)/i,"");
		}
		else if(a.search(/[ ]*\(final tournament\)/i)>=0)
		{
			if(s) before=", ";
			c=before+"final tournament";t="round";
			a=a.replace(/[ ]*\(final tournament\)/i,"");
		}
		if(a.search(/^([0-9]+)/)==0) a=a.replace(/^([0-9]+)(.*)/,t+(t?" ":"")+"$1$2");
	}
	s=s+c;
	if(s&&(a.search(/^\(/)==0)) between=" ";else if(s&&a) between=", ";
	s=s+between+a;
	return s.ucF();
});
mxG.fr("buildMonth",function(a)
{
	let m=["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
	return m[parseInt(a)-1];
});
mxG.fr("buildDay",function(a)
{
	if(a=="01") return "1<span class=\"sup\">er</span>";
	return a.replace(/,([0-9]{2})/g,"-$1").replace(/0([1-9])/g,"$1");
});
mxG.fr("buildDate2",function(s)
{
	let r,reg=/(^\s*([0-9]{2})(-([0-9]{2}(,[0-9]{2})*))?)(([^-])(.*))*\s*$/g;
	if(s.match(reg))
	{
		r=s.replace(reg,"$8");
		m=s.replace(reg,"$2");
		d=s.replace(reg,"$4");
		return (d?mxG.Z.fr["buildDay"](d)+" ":"")+mxG.Z.fr["buildMonth"](m)+(r?", "+mxG.Z.fr["buildDate2"](r):"");
	}
	return s;
});
mxG.fr("buildDate",function(s)
{
	let r,y,m,reg=/(^\s*([0-9]{4})(-([^\.]*))*)(\.)?(.*)\s*$/g,k,km,z;
	if(s.indexOf("~")>=0)
	{
		r=s.split("~");
		km=r.length;
		z=mxG.Z.fr["buildDate"](r[0]);
		for(k=1;k<km;k++) z+=" ~ "+mxG.Z.fr["buildDate"](r[k]);
		return z;
	}
	s=s.replace(/,([0-9]{4})/g,".$1");
	if(s.match(reg))
	{
		r=s.replace(reg,"$6");
		y=s.replace(reg,"$2");
		m=s.replace(reg,"$4");
		return (m?mxG.Z.fr["buildDate2"](m)+" ":"")+y+(r?", "+mxG.Z.fr["buildDate"](r):"");
	}
	return s;
});
// buildRules, buildTimeLimits, buildKomi, buildResult, buildNumOfMoves
// are called by this.build(), but buildTitle() is called directly
mxG.G.prototype.buildTitle=function()
{
	let ev,ro,f;
	ev=this.getInfo("EV");
	ro=this.getInfo("RO");
	if(this.translateTitleOn) f="translateTitle";else f="buildTitle";
	if(mxG.Z[this.lang]&&mxG.Z[this.lang][f]) return mxG.Z[this.lang][f](ev,ro);
	return ev+((ev&&ro)?this.local(", "):"")+ro;
};
mxG.G.prototype.buildRules=function(a)
{
	return this.local(a.ucF());
};
mxG.G.prototype.buildTimeLimits=function(a)
{
	if(a.match(/^[0-9]+$/g))
	{
		let r="",t,h,mn,s;
		t=parseInt(a);
		h=Math.floor(t/3600);
		if(h) r+=h+this.local("h");
		mn=Math.floor((t-h*3600)/60);
		if(mn) r+=(r?this.local(" "):"")+mn+this.local("mn");
		s=t-h*3600-mn*60;
		if(s) r+=(r?this.local(" "):"")+s+this.local("s");
		return r+this.local(" per player");
	}
	return a;
};
mxG.G.prototype.buildKomi=function(k)
{
	let a=k+"",b;
	if(a.search(/^([0-9]+([,\.]([0-9]+)?)?)?$/)==0)
	{
		b=parseFloat(a.replace(",","."));
		if(b==0) return this.local("none");
		if((b>-2)&&(b<2)) b+=this.local(" point");
		else b+=this.local(" points");
		return (b+"").replace(".",this.local("."));
	}
	return a;
};
mxG.G.prototype.buildResult=function(a)
{
	let b="";
	if(a.substring(0,1)=="B") b=this.local("Black");
	else if(a.substring(0,1)=="W") b=this.local("White");
	else if(a.substring(0,1)=="V") return this.local("game with no result");
	else if(a.substring(0,1)=="D") return this.local("draw");
	else if(a.substring(0,1)=="0") return this.local("draw");
	else if(a.substring(0,1)=="?") return this.local("unknown result");
	else return a;
	b+=this.local(" wins");
	if(a.substring(1,2)=="+")
	{
		if(a.substring(2,3)=="R") b+=this.local(" by resign");
		else if(a.substring(2,3)=="T") b+=this.local(" by time");
		else if(a.substring(2,3)=="F") b+=this.local(" by forfeit");
		else if(a.length>2)
		{
			let c=parseFloat(a.substring(2).replace(",","."));
			b+=this.local(" by ")+c;
			if((c>-2)&&(c<2)) b+=this.local(" point");else b+=this.local(" points");
			b=b.replace(".",this.local("."));
		}
	}
	return b;
};
mxG.G.prototype.buildNumOfMoves=function(k)
{
	return k+((k<2)?this.local(" move"):this.local(" moves"));
};
mxG.G.prototype.getNumOfMoves=function()
{
	let aN=this.rN,n=0,p=0,ex="E",v;
	while(this.kidOnFocus(aN))
	{
		aN=aN.Kid[0];
		if(aN.P.B||aN.P.W)
		{
			n++;
			if(aN.P.B) v=aN.P.B[0];else v=aN.P.W[0];
			if(v) p=0;else p++;
			if((aN.P.B&&(ex=="B"))||(aN.P.W&&(ex=="W"))) {n++;if(p) p++;}
		}
		else if(aN.P.AB||aN.P.AW||aN.P.AE) ex="E";
	}
	return n-p;
};
mxG.G.prototype.buildHeader=function(u=0)
{
	let a="",t="",h="",g="",b,c,d,r,z=0;
	if(!this.hideTitle)
	{
		t=this.buildTitle();
		if(this.concatDateToTitle&&(a=this.getInfo("DT"))) t+=(t?" (":"")+this.build("Date",a)+(t?")":"");
	}
	if(t)
	{
		if(u) t="<h1 tabindex=\"0\" class=\"mxTitleH1\">"+t+"</h1>";
		else t="<p class=\"mxTitleP\">"+t+"</p>";
	}
	a=(this.hideBlack)?0:this.getInfo("PB");
	if(a)
	{
		h+=this.local("Black")+this.local(": ")+a;
		a=this.getInfo("BR");
		if(a) h+=this.local(" ")+this.build("Rank",a);
		if(this.concatTeamToPlayer&&(b=this.getInfo("BT"))) h+=(a?" (":"")+b+(a?")":"");
		z=1;
	}
	a=(this.hideWhite)?0:this.getInfo("PW");
	if(a)
	{
		if(z) h+="<br>";
		h+=this.local("White")+this.local(": ")+a;
		a=this.getInfo("WR");
		if(a) h+=this.local(" ")+this.build("Rank",a);
		if(this.concatTeamToPlayer&&(b=this.getInfo("WT"))) h+=(a?" (":"")+b+(a?")":"");
		z=1;
	}
	if(this.hideDate) a="";else a=this.getInfo("DT");
	if(a&&!this.concatDateToTitle)
	{
		if(z) h+="<br>";
		h+=this.local("Date")+this.local(": ")+this.build("Date",a);
		z=1;
	}
	if(this.hidePlace) a="";else a=this.getInfo("PC");
	if(a)
	{
		if(z) h+="<br>";
		h+=this.local("Place")+this.local(": ")+a;
		z=1;
	}
	if(this.hideRules) a="";else a=this.getInfo("RU");
	if(a)
	{
		if(z) h+="<br>";
		h+=this.local("Rules")+this.local(": ")+this.build("Rules",a);
		z=1;
	}
	if(this.hideTimeLimits) a="";else a=this.getInfo("TM");
	if(a)
	{
		if(z) h+="<br>";
		h+=this.local("Time limits")+this.local(": ")+this.build("TimeLimits",a);
		z=1;
	}
	if(this.hideKomi) a="";else a=this.getInfo("KM");
	if(a) b=this.local("Komi")+this.local(": ")+this.build("Komi",a);else b="";
	if(b&&!this.concatKomiToResult)
	{
		if(z) h+="<br>";
		h+=b;
		z=1;
	}
	if(this.hideHandicap) a="";else a=this.getInfo("HA");
	if(a) c=this.local("Handicap")+this.local(": ")+this.build("handicap",a);else c="";
	if(c&&!this.concatHandicapToResult)
	{
		if(z) h+="<br>";
		h+=c;
		z=1;
	}
	if(this.hideNumOfMoves) d="";
	else
	{
		a=this.getNumOfMoves()+"";
		if(this.hideNumOfMovesLabel) d=this.build("NumOfMoves",a);
		else d=this.local("Number of moves")+this.local(": ")+a;
		if(!this.concatNumOfMovesToResult)
		{
			if(z) h+="<br>";
			h+=d;
			z=1;
		}
	}
	if(!this.hideResult&&(a=this.getInfo("RE")))
	{
		if(z) h+="<br>";
		r=this.build("Result",a);
		if(!this.hideResultLabel) h+=(this.local("Result")+this.local(": ")+r);
		else h+=r.ucF();
		if((d&&this.concatNumOfMovesToResult)
			||(c&&this.concatHandicapToResult)
			||(b&&this.concatKomiToResult))
		{
			let b2,c2,d2;
			h+=" (";
			if(d&&this.concatNumOfMovesToResult) d2=d; else d2="";
			if(c&&this.concatHandicapToResult) c2=c; else c2="";
			if(b&&this.concatKomiToResult) b2=b; else b2="";
			if(d2) h+=d2;
			if(d2&&c2) h+="; ";
			if(c2) h+=c2;
			if((d2||c2)&&b2) h+="; ";
			if(b2) h+=b2;
			h+=")";
		}
		z=1;
	}
	if(h) h="<p class=\"mxHeaderContentP\">"+h+"</p>";
	if(!this.hideGeneralComment&&(a=this.getInfo("GC")))
		g="<p class=\"mxGeneralCommentP\">"+a.replace(/\n/g,"<br>")+"</p>";
	return t+h+g;
};
mxG.G.prototype.doHeader=function()
{
	this.doDialog("ShowHeader",this.buildHeader(1),[{n:" Close "}]);
};
mxG.G.prototype.updateHeader=function()
{
	if(this.headerBoxOn)
	{
		let h=this.buildHeader();
		if(h!=this.header)
		{
			this.getE("HeaderDiv").innerHTML=h;
			this.header=h;
		}
	}
};
mxG.G.prototype.initHeader=function()
{
	if(this.headerBtnOn)
	{
		let o={n:"Header",v:this.alias("Header","headerAlias")},
			s=this.local("Header");
		if(o.v!=s) o.t=s;
		this.addBtn(this.getE("HeaderDiv"),o);
	}
};
mxG.G.prototype.createHeader=function()
{
	this.canHeaderFocus=this.setA("canHeaderFocus",0,"bool");
	this.concatInHeader=this.setA("concatInHeader",new Set(),"set");
	for(let k of this.concatInHeader) this["concat"+k]=1;
	this.headerAlias=this.setA("headerAlias",null,"string");
	this.headerBoxOn=this.setA("headerBoxOn",0,"bool");
	this.headerBtnOn=this.setA("headerBtnOn",0,"bool");
	this.hideInHeader=this.setA("hideInHeader",new Set(),"set");
	this.translateTitleOn=this.setA("translateTitleOn",0,"bool");
	for(let k of this.hideInHeader) this["hide"+k]=1;
	if(this.headerBoxOn||this.headerBtnOn)
	{
		// add tabindex="0" to this div if it can be scrolled (for keyboard navigation)
		let a=(this.headerBoxOn&&this.canHeaderFocus)?" tabindex=\"0\"":"";
		return "<div class=\"mxHeaderDiv\" id=\""+this.n+"HeaderDiv\""+a+"></div>";
	}
	return "";
};
}
