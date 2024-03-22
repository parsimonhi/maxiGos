// maxiGos v8 > mgosInfo.js
if(!mxG.G.prototype.createInfo)
{
mxG.fr("Info","Info");
mxG.fr("OK","OK");
mxG.fr("Cancel","Annuler");
mxG.fr("Event","Évènement");
mxG.fr("Round","Ronde");
// mxG.fr("Black","Noir");
// mxG.fr("White","Blanc");
mxG.fr("Rank","Niveau");
mxG.fr("Komi","Komi");
mxG.fr("Handicap","Handicap");
mxG.fr("Result","Résultat");
mxG.fr("Date","Date");
mxG.fr("Place","Lieu");
mxG.fr("Rules","Règle");
mxG.fr("Time limits","Temps");
mxG.fr("Overtime","Byoyomi");
mxG.fr("Annotations","Annotations");
mxG.fr("Copyright","Copyright");
mxG.fr("Source","Source");
mxG.fr("User","Utilisateur");
mxG.fr("Black team","Équipe de Noir");
mxG.fr("White team","Équipe de Blanc");
mxG.fr("Game name","Nom de la partie");
mxG.fr("Opening","Ouverture");
mxG.fr("General comment","Commentaire général");
mxG.fr("by resign","par abandon");
mxG.fr("by time","au temps");
mxG.fr("by forfeit","par forfait");
mxG.fr("by","de");
mxG.fr("on points","aux points");
mxG.fr("suspended","suspendu");
mxG.fr("Main","Informations principales");
mxG.fr("Other","Autres informations");
mxG.fr("Black","Noir");
mxG.fr("White","Blanc");
mxG.fr(" wins"," gagne");
mxG.fr("no result","sans résultat");
mxG.fr("draw","partie nulle");
mxG.fr("unknown","inconnu");
mxG.G.prototype.popInfo=function(aPropName)
{
	// pop info from this.kidOnFocus(this.rN)
	// todo: pop it on the convenient node
	let aN;
	aN=this.kidOnFocus(this.rN);
	// assume that this kind of property has only one value
	aN.takeOff(aPropName,0);
}
mxG.G.prototype.decodeResult=function(a)
{
	this.WN="";
	this.HW="";
	this.SC="";
	if(a)
	{
		this.WN=a.substring(0,1);
		if(this.WN=="0")this.WN="D";
		if(a.substring(1,2)=="+")
		{
			this.WN+="+";
			if(a.substring(2,3)=="R")this.HW="R";
			else if(a.substring(2,3)=="T")this.HW="T";
			else if(a.substring(2,3)=="F")this.HW="F";
			else if(a.length>2)
			{
				this.HW="P";
				this.SC=a.substring(2);
			}
		}
	}
}
mxG.G.prototype.changeInfoStatus=function(el,b)
{
	let c=el.className.replace(" mxBadInput","");
	if(b)el.className=c;else el.className=c+" mxBadInput";
}
mxG.G.prototype.checkRank=function(el,ev)
{
	this.changeInfoStatus(el,(el.value+"").search(/^([0-9]+[kdp]?)?$/)==0);
}
mxG.G.prototype.checkHandicap=function(el,ev)
{
	this.changeInfoStatus(el,!el.value||(((el.value+"").search(/^[0-9]+$/)==0)&&(parseInt(el.value)>1)));
}
mxG.G.prototype.checkReal=function(el,ev)
{
	this.changeInfoStatus(el,(el.value+"").search(/^([0-9]+([.]([0-9]+)?)?)?$/)==0);
}
mxG.G.prototype.encodeResult=function()
{
	let e=this.getE("RE"),WN=this.getE("WN").value,HW;
	if(WN=="D")e.value="Draw";
	else if(WN=="V")e.value="Void";
	else e.value=WN;
	if((WN=="B+")||(WN=="W+"))
	{
		HW=this.getE("HW").value;
		if (!HW||(HW=="P"))e.value+=this.getE("SC").value;
		else e.value+=HW;
	}
}
mxG.G.prototype.buildInfo=function()
{
	this.decodeResult(this.getInfo("RE",0));
	return `<label class="mxGN"><span>${this.local("Game name")}</span><input class="mxGN" id="${this.n}GN" type="text" value=""></label>`
	+`<label class="mxEV"><span>${this.local("Event")}</span><input class="mxEV" id="${this.n}EV" type="text" value=""></label>`
	+`<label class="mxRO"><span>${this.local("Round")}</span><input class="mxRO" id="${this.n}RO" type="text" value=""></label>`
	+`<label class="mxDT"><span>${this.local("Date")}</span><input class="mxDT" id="${this.n}DT" type="text" value=""></label>`
	+`<label class="mxPC"><span>${this.local("Place")}</span><input class="mxPC" id="${this.n}PC" type="text" value=""></label>`
	+`<label class="mxPB"><span>${this.local("Black")}</span><input class="mxPB" id="${this.n}PB" type="text" value=""></label>`
	+`<label class="mxBR"><span>${this.local("Rank")}</span><input class="mxBR" onkeyup="${this.g}.checkRank(this,event);" id="${this.n}BR" type="text" value=""></label>`
	+`<label class="mxPW"><span>${this.local("White")}</span><input class="mxPW" id="${this.n}PW" type="text" value=""></label>`
	+`<label class="mxWR"><span>${this.local("Rank")}</span><input class="mxWR" onkeyup="${this.g}.checkRank(this,event);" id="${this.n}WR" type="text" value=""></label>`
	+`<label class="mxKM"><span>${this.local("Komi")}</span><input class="mxKM" onkeyup="${this.g}.checkReal(this,event);" id="${this.n}KM" type="text" value=""></label>`
	+`<label class="mxHA"><span>${this.local("Handicap")}</span><input class="mxHA" onkeyup="${this.g}.checkHandicap(this,event);" id="${this.n}HA" type="text" value=""></label>`
	+`<div class="mxResult">`
	+`<label class="mxWN" for="${this.n}WN"><span>${this.local("Result")}</span></label>`
	+`<select class="mxWN" id="${this.n}WN">`
	+`<option value=""></option>`
	+`<option value="B+">${this.local("Black")+this.local(" wins")}</option>`
	+`<option value="W+">${this.local("White")+this.local(" wins")}</option>`
	+`<option value="D">${this.local("draw")}</option>`
	+`<option value="V">${this.local("no result")}</option>`
	+`<option value="?">${this.local("unknown")}</option>`
	+`</select>`
	+`<select class="mxHW" id="${this.n}HW">`
	+`<option value=""></option>`
	+`<option value="P">${this.local("on points")}</option>`
	+`<option value="R">${this.local("by resign")}</option>`
	+`<option value="T">${this.local("by time")}</option>`
	+`<option value="F">${this.local("by forfeit")}</option>`
	+`</select>`
	+`<label class="mxSC" for="${this.n}SC"><span>${this.local("by")}</span></label>`
	+`<input class="mxSC" id="${this.n}SC" onkeyup="${this.g}.checkReal(this,event);" type="text" value="">`
	+`<input class="mxRE" id="${this.n}RE" type="hidden" value="">`
	+`</div>`
	+`<label class="mxGC"><span>${this.local("General comment")} </span><textarea class="mxGC" id="${this.n}GC"></textarea></label>`
	+`<label class="mxBT"><span>${this.local("Black team")}</span><input class="mxBT" id="${this.n}BT" type="text" value=""></label>`
	+`<label class="mxWT"><span>${this.local("White team")}</span><input class="mxWT" id="${this.n}WT" type="text" value=""></label>`
	+`<label class="mxRU"><span>${this.local("Rules")}</span><input class="mxRU" id="${this.n}RU" type="text" value=""></label>`
	+`<label class="mxTM"><span>${this.local("Time limits")}</span><input class="mxTM" id="${this.n}TM" type="text" value=""></label>`
	+`<label class="mxOT"><span>${this.local("Overtime")}</span><input class="mxOT" id="${this.n}OT" type="text" value=""></label>`
	+`<label class="mxON"><span>${this.local("Opening")}</span><input class="mxON" id="${this.n}ON" type="text" value=""></label>`
	+`<label class="mxAN"><span>${this.local("Annotations")}</span><input class="mxAN" id="${this.n}AN" type="text" value=""></label>`
	+`<label class="mxCP"><span>${this.local("Copyright")}</span><input class="mxCP" id="${this.n}CP" type="text" value=""></label>`
	+`<label class="mxSO"><span>${this.local("Source")}</span><input class="mxSO" id="${this.n}SO" type="text" value=""></label>`
	+`<label class="mxUS"><span>${this.local("User")}</span><input class="mxUS" id="${this.n}US" type="text" value=""></label>`;
}
mxG.G.prototype.putInfoInBox=function()
{
	let p,pm,IX=["EV","RO","DT","PC","PB","BR","PW","WR","HA","KM","RE","GC","RU","TM","OT","AN","CP","SO","US","GN","BT","WT","ON"];
	pm=IX.length;
	for(p=0;p<pm;p++)
		if(this.getE(IX[p]))
		{
			if(IX[p]=="RE")
			{
				this.decodeResult(this.getInfo("RE",0));
				this.getE("RE").value=this.getInfo("RE",0);
				if(this.getE("WN"))this.getE("WN").value=this.WN;
				if(this.getE("HW"))this.getE("HW").value=this.HW;
				if(this.getE("SC"))this.getE("SC").value=this.SC;
			}
			else this.getE(IX[p]).value=this.getInfo(IX[p],0);
		}
}
mxG.G.prototype.getInfoFromBox=function()
{
	let p,pm,v,IX=["EV","RO","DT","PC","PB","BR","PW","WR","HA","KM","RE","GC","RU","TM","OT","AN","CP","SO","US","GN","BT","WT","ON"];
	pm=IX.length;
	for(p=0;p<pm;p++)
	{
		if(IX[p]=="RE")this.encodeResult();
		if(this.getE(IX[p])&&(v=this.getE(IX[p]).value))this.kidOnFocus(this.rN).put(IX[p],v);
		else this.popInfo(IX[p]);
	}
}
mxG.G.prototype.doInfoOK=function()
{
	this.getInfoFromBox();
	this.updateAll();
}
mxG.G.prototype.doInfo=function()
{
	let btns=[{n:"OK",a:"Info"},{n:"Cancel"}];
	this.doDialog("EditInfo",this.buildInfo(),btns);
	this.putInfoInBox();
}
mxG.G.prototype.createInfo=function()
{
	return ``;
}
}
