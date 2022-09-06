// maxiGos v7 > mgosHeader.js
if(!mxG.G.prototype.createHeader)
{
mxG.fr("Header","Informations");
mxG.fr("Header_Short","E");
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
mxG.fr("buildMonth",function(a)
{
	var m=["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
	return m[parseInt(a)-1];
});
mxG.fr("buildDay",function(a)
{
	if(a=="01") return "1<span class=\"sup\">er</span>";
	return a.replace(/,([0-9]{2})/g,"-$1").replace(/0([1-9])/g,"$1");
});
mxG.fr("buildDate2",function(s)
{
	var r,reg=/(^\s*([0-9]{2})(-([0-9]{2}(,[0-9]{2})*))?)(([^-])(.*))*\s*$/g;
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
	var r,y,m,reg=/(^\s*([0-9]{4})(-([^\.]*))*)(\.)?(.*)\s*$/g,k,km,z;
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
mxG.en("Header_Short","H");
// buildRules, buildTimeLimits, buildKomi, buildResult, buildNumOfMoves
// are called by this.build()
mxG.G.prototype.buildRules=function(a)
{
	return this.local(a.ucFirst());
};
mxG.G.prototype.buildTimeLimits=function(a)
{
	if(a.match(/^[0-9]+$/g))
	{
		var r="",t,h,mn,s;
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
	var a=k+"",b;
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
	var b="";
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
			var c=parseFloat(a.substring(2).replace(",","."));
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
	var aN=this.rN,n=0,p=0,ex="E",v;
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
mxG.G.prototype.buildHeader=function()
{
	var h="",a="",t="",b,c,d,r;
	if(!this.hideTitle)
	{
		if(this.hasC("Title")) t=this.buildTitle();
		else
		{
			t=this.getInfoS("EV");
			a=this.getInfoS("RO");
			if(a) t+=(t?this.local(", "):"")+a;
		}
		if(this.concatDateToTitle&&(a=this.getInfoS("DT"))) t+=(t?" (":"")+this.build("Date",a)+(t?")":"");
	}
	if(t) t="<h1 class=\"mxTitleH1\">"+t+"</h1>";
	if(this.hideBlack) a="";else a=this.getInfoS("PB");
	if(a)
	{
		h+="<span class=\"mxPBSpan\"><span class=\"mxHeaderSpan\">"+this.local("Black")+this.local(": ")+"</span>"+a;
		a=this.getInfoS("BR");
		if(a) h+=this.local(" ")+this.build("Rank",a);
		if(this.concatTeamToPlayer&&(b=this.getInfoS("BT"))) h+=(a?" (":"")+b+(a?")":"");
		h+="</span><br>";
	}
	if(this.hideWhite) a="";else a=this.getInfoS("PW");
	if(a)
	{
		h+="<span class=\"mxPWSpan\"><span class=\"mxHeaderSpan\">"+this.local("White")+this.local(": ")+"</span>"+a;
		a=this.getInfoS("WR");
		if(a) h+=this.local(" ")+this.build("Rank",a);
		if(this.concatTeamToPlayer&&(b=this.getInfoS("WT"))) h+=(a?" (":"")+b+(a?")":"");
		h+="</span><br>";
	}
	if(this.hideDate) a="";else a=this.getInfoS("DT");
	if(a&&!this.concatDateToTitle) h+="<span class=\"mxDTSpan\"><span class=\"mxHeaderSpan\">"+this.local("Date")+this.local(": ")+"</span>"+this.build("Date",a)+"</span><br>";
	if(this.hidePlace) a="";else a=this.getInfoS("PC");
	if(a) h+="<span class=\"mxPCSpan\"><span class=\"mxHeaderSpan\">"+this.local("Place")+this.local(": ")+"</span>"+a+"</span><br>";
	if(this.hideRules) a="";else a=this.getInfoS("RU");
	if(a) h+="<span class=\"mxRUSpan\"><span class=\"mxHeaderSpan\">"+this.local("Rules")+this.local(": ")+"</span>"+this.build("Rules",a)+"</span><br>";
	if(this.hideTimeLimits) a="";else a=this.getInfoS("TM");
	if(a) h+="<span class=\"mxTMSpan\"><span class=\"mxHeaderSpan\">"+this.local("Time limits")+this.local(": ")+"</span>"+this.build("TimeLimits",a)+"</span><br>";
	if(this.hideKomi) a="";else a=this.getInfoS("KM");
	if(a) b="<span class=\"mxHeaderSpan\">"+this.local("Komi")+this.local(": ")+"</span>"+this.build("Komi",a);else b="";
	if(b&&!this.concatKomiToResult) h+="<span class=\"mxKMSpan\">"+b+"</span><br>";
	if(this.hideHandicap) a="";else a=this.getInfoS("HA");
	if(a) c="<span class=\"mxHeaderSpan\">"+this.local("Handicap")+this.local(": ")+"</span>"+this.build("handicap",a);else c="";
	if(c&&!this.concatHandicapToResult) h+="<span class=\"mxHASpan\">"+c+"</span><br>";
	if(!this.hideNumOfMoves)
	{
		a=this.getNumOfMoves()+"";
		if(this.hideNumOfMovesLabel) d=this.build("NumOfMoves",a);
		else d="<span class=\"mxHeaderSpan\">"+this.local("Number of moves")+this.local(": ")+"</span>"+a;
		if(!this.concatNumOfMovesToResult) h+="<span class=\"mxNMSpan\">"+d+"</span><br>";
	}
	else d="";
	if(!this.hideResult&&(a=this.getInfoS("RE")))
	{
		h+="<span class=\"mxRESpan\">";
		r=this.build("Result",a);
		if(!this.hideResultLabel) h+=("<span class=\"mxHeaderSpan\">"+this.local("Result")+this.local(": ")+"</span>"+r);
		else h+=r.ucFirst();
		if((d&&this.concatNumOfMovesToResult)||(c&&this.concatHandicapToResult)||(b&&this.concatKomiToResult))
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
		h+="</span><br>";
	}
	if(h) h="<div class=\"mxP\">"+h+"</div>";
	if(!this.hideGeneralComment&&(a=this.getInfoS("GC")))
		h+="<div class=\"mxP mxGeneralCommentP\">"+a.replace(/\n/g,"<br>")+"</div>";
	return "<div class=\"mxHeaderContentDiv\">"+t+h+"</div>";
};
mxG.G.prototype.doHeader=function()
{
	var e;
	if(this.gBox=="ShowHeader") {this.hideGBox("ShowHeader");return;}
	if(!this.getE("ShowHeaderDiv"))
	{
		let s="",z=this.k;
		s+="<div class=\"mxShowContentDiv\" tabindex=\"0\">";
		s+="</div>";
		s+="<div class=\"mxOKDiv\">";
		s+="<button type=\"button\"><span>"+this.local(" Close ")+"</span></button>";
		s+="</div>";
		this.createGBox("ShowHeader").innerHTML=s;
		btn=this.getE("ShowHeaderDiv").querySelector(".mxOKDiv button");
		btn.addEventListener("click",function(){mxG.D[z].hideGBox('ShowHeader');},false);
	}
	e=this.getE("ShowHeaderDiv").firstChild;
	e.innerHTML=this.buildHeader();
	this.showGBox("ShowHeader");
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
	if(this.getE("HeaderBtn"))
	{
		if(this.gBox=="ShowHeader") this.selectBtn("Header");
		else this.unselectBtn("Header");
	}
};
mxG.G.prototype.initHeader=function()
{
	if(this.headerBtnOn)
		this.addBtn(this.getE("HeaderDiv"),{n:"Header",v:this.alias("Header","headerAlias")});
};
mxG.G.prototype.createHeader=function()
{
	var s="",a="";
	this.canHeaderFocus=this.setA("canHeaderFocus",0,"bool");
	this.concatDateToTitle=this.setA("concatDateToTitle",0,"bool");
	this.concatTeamToPlayer=this.setA("concatTeamToPlayer",0,"bool");
	this.concatKomiToResult=this.setA("concatKomiToResult",0,"bool");
	this.concatHandicapToResult=this.setA("concatHandicapToResult",0,"bool");
	this.concatNumOfMovesToResult=this.setA("concatNumOfMovesToResult",0,"bool");
	this.headerAlias=this.setA("headerAlias",null,"string");
	this.headerBoxOn=this.setA("headerBoxOn",0,"bool");
	this.headerBtnOn=this.setA("headerBtnOn",0,"bool");
	this.hideBlack=this.setA("hideBlack",0,"bool");
	this.hideDate=this.setA("hideDate",0,"bool");
	this.hideGeneralComment=this.setA("hideGeneralComment",0,"bool");
	this.hideKomi=this.setA("hideKomi",0,"bool");
	this.hideHandicap=this.setA("hideHandicap",0,"bool");
	this.hideNumOfMoves=this.setA("hideNumOfMoves",0,"bool");
	this.hideNumOfMovesLabel=this.setA("hideNumOfMovesLabel",0,"bool");
	this.hidePlace=this.setA("hidePlace",0,"bool");
	this.hideResult=this.setA("hideResult",0,"bool");
	this.hideResultLabel=this.setA("hideResultLabel",0,"bool");
	this.hideRules=this.setA("hideRules",0,"bool");
	this.hideTimeLimits=this.setA("hideTimeLimits",0,"bool");
	this.hideTitle=this.setA("hideTitle",0,"bool");
	this.hideWhite=this.setA("hideWhite",0,"bool");
	if(this.headerBoxOn||this.headerBtnOn)
	{
		// add tabindex="0" to this div if it can be scrolled (for keyboard navigation)
		a=(this.headerBoxOn&&this.canHeaderFocus)?" tabindex=\"0\"":"";
		s+="<div class=\"mxHeaderDiv\" id=\""+this.n+"HeaderDiv\""+a+">";
		s+="</div>";
	}
	return s;
};
}
