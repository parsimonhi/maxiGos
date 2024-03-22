// maxiGos v8 > mgosOptions.js
if(!mxG.G.prototype.createOptions)
{
mxG.fr(" from "," à partir de ");
mxG.fr(" with "," avec "); // cannot use just "with" because with is a js keyword?
mxG.fr("Animated stone","Pierres animées");
mxG.fr("Animated stone time","Temps pour l'animation des pierres");
mxG.fr("As in book","Comme dans les livres");
mxG.fr("Cancel","Annuler");
mxG.fr("In 3d","Affichage en 3d");
mxG.fr("Indices","Affichage des coordonnées");
mxG.fr("Loop time","Temps pour l'affichage en boucle");
mxG.fr("Marks and labels","Marques et étiquettes");
mxG.fr("Mark on last","Marque sur le dernier coup");
mxG.fr("Numbering","Numérotation");
mxG.fr("OK","OK");
mxG.fr("Options","Options");
mxG.fr("place a variation","place une variation");
mxG.fr("Show variations of current move instead of next move","Affichage des alternatives au coup courant au lieu des variations du coup suivant");
mxG.fr("try to guess the next move","essaie de deviner le coup suivant");
mxG.fr("Variation marks","Indication des variations");
mxG.fr("When clicking on the goban","Un click sur le goban");
mxG.G.prototype.getValidNum=function(v)
{
	let n=parseInt(v);
	if(isNaN(n))return 1;
	return n;
}
mxG.G.prototype.doChangeMarkOnLast=function()
{
	let e=this.getE("MarkOnLastOnCheckbox");
	this.markOnLastOn=e.checked?1:0;
	this.updateAll();
}
mxG.G.prototype.doChangeNumbering=function()
{
	let e=this.getE("NumberingOnCheckbox"),nf,nw;
	nf=this.getE("NumFromTextInput");
	nw=this.getE("NumWithTextInput");
	if(nf)nf.disabled=!e.checked;
	if(nw)nw.disabled=!e.checked;
	if(this.optionsBoxOn)
	{
		this.numberingOn=e.checked?1:0;
		this.configNumberingOn=this.numberingOn;
		if(this.hasC("Tree"))this.hasToSetTree=1;
		this.updateAll();
	}
}
mxG.G.prototype.doKeyupNumFrom=function()
{
	let e=this.getE("NumFromTextInput");
	this.numFrom=this.getValidNum(e.value);
	if(this.hasC("Tree"))this.hasToSetTree=1;
	this.updateAll();
}
mxG.G.prototype.doKeyupNumWith=function()
{
	let e=this.getE("NumWithTextInput");
	this.numWith=this.getValidNum(e.value);
	if(this.hasC("Tree"))this.hasToSetTree=1;
	this.updateAll();
}
mxG.G.prototype.doChangeMarksAndLabels=function()
{
	let e=this.getE("MarksAndLabelsOnCheckbox");
	this.marksAndLabelsOn=e.checked?1:0;
	this.updateAll();
}
mxG.G.prototype.doChangeAsInBook=function()
{
	let e=this.getE("AsInBookOnCheckbox");
	this.asInBookOn=e.checked?1:0;
	this.configAsInBookOn=this.asInBookOn;
	this.updateAll();
}
mxG.G.prototype.doChangeIndices=function()
{
	let e=this.getE("IndicesOnCheckbox");
	this.indicesOn=e.checked?1:0;
	this.configIndicesOn=this.indicesOn;
	this.updateAll();
}
mxG.G.prototype.doChangeVariationMarks=function()
{
	let e=this.getE("VariationMarksOnCheckbox");
	this.variationMarksOn=e.checked?1:0;
	this.configVariationMarksOn=this.variationMarksOn;
	this.styleMode=this.variationMarksOn?this.styleMode&~2:this.styleMode|2;
	this.updateAll();
}
mxG.G.prototype.doChangeSiblings=function()
{
	let e=this.getE("SiblingsOnCheckbox");
	this.siblingsOn=e.checked?1:0;
	this.configSiblingsOn=this.siblingsOn;
	this.styleMode=this.siblingsOn?this.styleMode|1:this.styleMode&~1;
	this.updateAll();
}
mxG.G.prototype.setIn3dClass=function()
{
	let e=this.getE("Global");
	e.className=e.className.replace((this.in3dOn?"mxIn2d":"mxIn3d"),(this.in3dOn?"mxIn3d":"mxIn2d"));
}
mxG.G.prototype.doChangeIn3d=function()
{
	let e=this.getE("In3dOnCheckbox");
	this.in3dOn=e.checked?1:0;
	this.setIn3dClass();
	this.updateAll();
}
mxG.G.prototype.doKeyupLoopTime=function()
{
	let e=this.getE("LoopTimeTextInput");
	this.loopTime=this.getValidNum(e.value);
	this.updateAll();
}
mxG.G.prototype.doChangeAnimatedStone=function()
{
	let e=this.getE("AnimatedStoneOnCheckbox");
	this.animatedStoneOn=e.checked?1:0;
	this.updateAll();
}
mxG.G.prototype.doKeyupAnimatedStoneTime=function()
{
	let e=this.getE("AnimatedStoneTextInput");
	this.animatedStoneTime=this.getValidNum(e.value);
	this.updateAll();
}
mxG.G.prototype.doChangeCan=function()
{
	let e;
	e=this.getE("CanVariationRadio");
	this.canPlaceVariation=e.checked?1:0;
	e=this.getE("CanGuessRadio");
	this.canPlaceGuess=e.checked?1:0;
	this.updateAll();
}
mxG.G.prototype.doChangeScoreMethod=function(m)
{
	let e,z=null;
	if(e=this.getE("TrivialScoreMethodRadio"))if(e.checked)z="trivial";	
	if(e=this.getE("CountingScoreMethodRadio"))if(e.checked)z="counting";	
	if(e=this.getE("PropagateScoreMethodRadio"))if(e.checked)z="propagate";	
	if(e=this.getE("EstimateScoreMethodRadio"))if(e.checked)z="estimate";
	if(z)this.scoreMethod=z;
	this.updateAll();
}
mxG.G.prototype.doOptionsOK=function()
{
	let e;
	if(e=this.getE("MarkOnLastOnCheckbox"))this.markOnLastOn=e.checked?1:0;
	if(e=this.getE("NumberingOnCheckbox")){this.numberingOn=e.checked?1:0;this.configNumberingOn=this.numberingOn;if(this.hasC("Tree"))this.hasToSetTree=1;}
	if(e=this.getE("NumFromTextInput")){this.numFrom=this.getValidNum(e.value);if(this.hasC("Tree"))this.hasToSetTree=1;}
	if(e=this.getE("NumWithTextInput")){this.numWith=this.getValidNum(e.value);if(this.hasC("Tree"))this.hasToSetTree=1;}
	if(e=this.getE("MarksAndLabelsOnCheckbox"))this.marksAndLabelsOn=e.checked?1:0;
	if(e=this.getE("AsInBookOnCheckbox")){this.asInBookOn=e.checked?1:0;this.configAsInBookOn=this.asInBookOn;}
	if(e=this.getE("IndicesOnCheckbox")){this.indicesOn=e.checked?1:0;this.configIndicesOn=this.indicesOn;}
	if(e=this.getE("VariationMarksOnCheckbox")){this.variationMarksOn=e.checked?1:0;this.configVariationMarksOn=this.variationMarksOn;this.styleMode=this.variationMarksOn?this.styleMode&~2:this.styleMode|2;}
	if(e=this.getE("SiblingsOnCheckbox")){this.siblingsOn=e.checked?1:0;this.configSiblingsOn=this.siblingsOn;this.styleMode=this.siblingsOn?this.styleMode|1:this.styleMode&~1;}
	if(e=this.getE("In3dOnCheckbox")){this.in3dOn=e.checked?1:0;this.setIn3dClass();if(this.hasC("Tree"))this.hasToSetTree=1;}
	if(e=this.getE("CanVariationRadio")){this.canPlaceVariation=e.checked?1:0;this.hasToSetGoban=1;}
	if(e=this.getE("CanGuessRadio")){this.canPlaceGuess=e.checked?1:0;this.hasToSetGoban=1;}
	if(e=this.getE("LoopTimeTextInput"))this.loopTime=this.getValidNum(e.value);
	if(e=this.getE("AnimatedStoneOnCheckbox"))this.animatedStoneOn=e.checked?1:0;
	if(e=this.getE("AnimatedStoneTimeTextInput"))this.animatedStoneTime=this.getValidNum(e.value);
	if(this.hasC("Score"))
	{
		let z="";
		if((e=this.getE("TrivialScoreMethodRadio"))&&e.checked)z="trivial";	
		else if((e=this.getE("CountingScoreMethodRadio"))&&e.checked)z="counting";	
		else if((e=this.getE("PropagateScoreMethodRadio"))&&e.checked)z="propagate";	
		else if((e=this.getE("EstimateScoreMethodRadio"))&&e.checked)z="estimate";
		if(z)this.scoreMethod=z;
	}
	this.updateAll();
}
mxG.G.prototype.buildOptions=function()
{
	let s=``,a=``;
	if(!this.optionsBoxOn)s+=`<h1 tabindex="0">${this.local("Options")}</h1>`;
	if(!this.hideMarkOnLastOn)
	{
		a+=`<label><input type="checkbox"`;
		if(this.optionsBoxOn)a+=` onchange="${this.g}.doChangeMarkOnLast()"`;
		a+=` id="${this.n}MarkOnLastOnCheckbox">${this.local("Mark on last")}</label>`;
	}
	if(!this.hideNumberingOn)
	{
		a+=`<label><input type="checkbox"`
		+` class="mxNumberingOnCheckbox"`
		+` onchange="${this.g}.doChangeNumbering()"`
		+` id="${this.n}NumberingOnCheckbox">`
		+this.local("Numbering")
		+` <span class="mxNumFromText">`
		+(mxG.Z[this.lang]["•"]
			?``
			:`<label for="${this.n}NumFromTextInput">${this.local(" from ")}</label>`)
		+` <input type="text" id="{this.n}NumFromTextInput" size="3" maxlength="3" `
		+(this.optionsBoxOn?`onkeyup="${this.g}.doKeyupNumFrom()">`:`>`)
		+`</span>`
		+` <span class="mxNumWithText">`
		+(mxG.Z[this.lang]["•"]
			?`<label for="${this.n}NumFromTextInput">${this.local(" from ")}</label>`
			:`<label for="${this.n}NumWithTextInput">${this.local(" with ")}</label>`)
		+` <input type="text" id="${this.n}NumWithTextInput" size="3" maxlength="3" `
		+(this.optionsBoxOn?`onkeyup="${this.g}.doKeyupNumWith()">`:`>`)
		+(mxG.Z[this.lang]["•"]
			?`<label for="${this.n}NumWithTextInput">${this.local(" with ")}</label>`
			:``)
		+`</span>`
		+`</label>`;
	}
	if(!this.hideMarksAndLabelsOn)
	{
		a+=`<label><input type="checkbox"`;
		if(this.optionsBoxOn)a+=` onchange="${this.g}.doChangeMarksAndLabels()"`;
		a+=` id="${this.n}MarksAndLabelsOnCheckbox">${this.local("Marks and labels")}</label>`;
	}
	if(!this.hideAsInBookOn)
	{
		a+=`<label><input type="checkbox"`;
		if(this.optionsBoxOn)a+=` onchange="${this.g}.doChangeAsInBook()"`;
		a+=` id="${this.n}AsInBookOnCheckbox">${this.local("As in book")}</label>`;
	}
	if(!this.hideIndicesOn)
	{
		a+=`<label><input type="checkbox"`;
		if(this.optionsBoxOn)a+=` onchange="${this.g}.doChangeIndices()"`;
		a+=` id="${this.n}IndicesOnCheckbox">${this.local("Indices")}</label>`;
	}
	if(this.hasC("Variation")&&!this.hideVariationMarksOn)
	{
		a+=`<label><input type="checkbox"`;
		if(this.optionsBoxOn)a+=` onchange="${this.g}.doChangeVariationMarks()"`;
		a+=` id="${this.n}VariationMarksOnCheckbox">${this.local("Variation marks")}</label>`;
	}
	if(this.hasC("Variation")&&!this.hideSiblingsOn)
	{
		a+=`<label><input type="checkbox"`;
		if(this.optionsBoxOn)a+=` onchange="${this.g}.doChangeSiblings()"`;
		a+=` id="${this.n}SiblingsOnCheckbox">${this.local("Show variations of current move instead of next move")}</label>`;
	}
	if(!this.hideIn3dOn)
	{
		a+=`<label><input type="checkbox"`;
		if(this.optionsBoxOn)a+=` onchange="${this.g}.doChangeIn3d()"`;
		a+=` id="${this.n}In3dOnCheckbox">${this.local("In 3d")}</label>`;
	}
	if(a)s+=`<p>${a}</p>`;
	if((this.hasC("Variation")&&!this.hideCanVariation)
		&&(this.hasC("Guess")&&!this.hideCanGuess))
	{
		s+=`<p>${this.local("When clicking on the goban")}\n`;
		if(this.hasC("Variation")&&!this.hideCanVariation)
		{
			s+=`<label><input name="${this.n}ChangeCanRadio" value="1" type="radio"`;
			if(this.optionsBoxOn)s+=` onchange="${this.g}.doChangeCan()"`;
			s+=` id="${this.n}CanVariationRadio">${this.local("place a variation")}</label>`;
		}
		if(this.hasC("Guess")&&!this.hideCanGuess)
		{
			s+=`<label><input name="${this.n}ChangeCanRadio" value="2" type="radio"`;
			if(this.optionsBoxOn)s+=` onchange="${this.g}.doChangeCan()"`;
			s+=` id="${this.n}CanGuessRadio">${this.local("try to guess the next move")}</label>`;
		}
		s+=`</p>`;
	}
	a=``;
	if(this.hasC("Loop")&&!this.hideLoopTime)
	{
		a+=`<label>${this.local("Loop time")} <input type="text" size="9" maxlength="9"`;
		if(this.optionsBoxOn)a+=` onkeyup="${this.g}.doKeyupLoopTime()"`;
		a+=` id="${this.n}LoopTimeTextInput"></label>`;
	}
	if(this.hasC("AnimatedStone")&&!this.hideAnimatedStoneOn)
	{
		a+=`<label><input type="checkbox"`;
		if(this.optionsBoxOn)a+=` onchange="${this.g}.doChangeAnimatedStone()"`;
		a+=` id="${this.n}AnimatedStoneOnCheckbox">${this.local("Animated stone")}</label>`;
	}
	if(this.hasC("AnimatedStone")&&!this.hideAnimatedStoneTime)
	{
		a+=`<label>${this.local("Animated stone time")} <input type="text" size="9" maxlength="9" `;
		if(this.optionsBoxOn)a+=` onkeyup="${this.g}.doKeyupAnimatedStoneTime()"`;
		a+=` id="${this.n}AnimatedStoneTimeTextInput"></label>`;
	}
	if(a)s+=`<p>${a}</p>`;
	if(this.hasC("Score")&&!this.hideScoreMethod)
	{
		s+=`<p>${this.local("Score method")}`
		+`<label><input name="${this.n}ChangeScoreMethodRadio" value="1" type="radio"`;
		if(this.optionsBoxOn)s+=` onchange="${this.g}.doChangeScoreMethod()"`;
		s+=` id="${this.n}TrivialScoreMethodRadio">${this.local("trivial")}</label>`
		+`<label><input name="${this.n}ChangeScoreMethodRadio" value="2" type="radio"`;
		if(this.optionsBoxOn)s+=` onchange="${this.g}.doChangeScoreMethod()"`;
		s+=` id="${this.n}CountingScoreMethodRadio">${this.local("counting")}</label>`
		+`<label><input name="${this.n}ChangeScoreMethodRadio" value="3" type="radio"`;
		if(this.optionsBoxOn)s+=` onchange="${this.g}.doChangeScoreMethod()"`;
		s+=` id="${this.n}PropagateScoreMethodRadio">${this.local("propagate")}</label>`
		+`<label><input name="${this.n}ChangeScoreMethodRadio" value="4" type="radio"`;
		if(this.optionsBoxOn)s+=` onchange="${this.g}.doChangeScoreMethod()"`;
		s+=` id="${this.n}EstimateScoreMethodRadio">${this.local("estimate")}</label>`
		+`</p>`;
	}
	return s;
}
mxG.G.prototype.setInputOptions=function()
{
	let e;
	if(e=this.getE("MarkOnLastOnCheckbox"))e.checked=(this.markOnLastOn==1);
	if(e=this.getE("NumberingOnCheckbox"))e.checked=(this.numberingOn>=1);
	if(e=this.getE("NumFromTextInput")){e.value=this.numFrom;e.disabled=!this.numberingOn;}
	if(e=this.getE("NumWithTextInput")){e.value=this.numWith;e.disabled=!this.numberingOn;}
	if(e=this.getE("MarksAndLabelsOnCheckbox"))e.checked=(this.marksAndLabelsOn==1);
	if(e=this.getE("AsInBookOnCheckbox"))e.checked=(this.asInBookOn==1);
	if(e=this.getE("IndicesOnCheckbox"))e.checked=(this.indicesOn==1);
	if(e=this.getE("VariationMarksOnCheckbox"))e.checked=(this.variationMarksOn==1);
	if(e=this.getE("SiblingsOnCheckbox"))e.checked=(this.siblingsOn==1);
	if(e=this.getE("In3dOnCheckbox"))e.checked=(this.in3dOn==1);
	// set only one of radio below since others are automatically set to false
	if((e=this.getE("CanVariationRadio"))&&(this.canPlaceVariation==1))e.checked=true;
	if((e=this.getE("CanGuessRadio"))&&(this.canPlaceGuess==1))e.checked=true;
	// set only one of radio below since others are automatically set to false
	if((e=this.getE("TrivialScoreMethodRadio"))&&(this.scoreMethod=="trivial"))
		e.checked=true;
	if((e=this.getE("CountingScoreMethodRadio"))&&(this.scoreMethod=="counting"))
		e.checked=true;
	if((e=this.getE("PropagateScoreMethodRadio"))&&(this.scoreMethod=="propagate"))
		e.checked=true;
	if((e=this.getE("EstimateScoreMethodRadio"))&&(this.scoreMethod=="estimate"))
		e.checked=true;
	if(e=this.getE("LoopTimeTextInput"))e.value=this.loopTime;
	if(e=this.getE("AnimatedStoneOnCheckbox"))
		e.checked=(this.animatedStoneOn==1);
	if(e=this.getE("AnimatedStoneTimeTextInput"))
		e.value=(this.animatedStoneTime?this.animatedStoneTime:this.loopTime?this.loopTime:1000);
}
mxG.G.prototype.doOptions=function()
{
	let btns=[{n:"OK",a:"Options"},{n:"Cancel"}];
	this.doDialog("EditOptions",this.buildOptions(),btns);
	this.setInputOptions();
}
mxG.G.prototype.updateOptions=function()
{
	if(this.optionsBoxOn)
	{
		let e=this.getE("LoopTimeTextInput");
		if(e)e.disabled=this.inLoop?true:false;
	}
	if(this.optionsBoxOn)this.setInputOptions();
}
mxG.G.prototype.initOptions=function()
{
	if(this.optionsBtnOn)this.addBtnClickListener("Options");
}
mxG.G.prototype.createOptions=function()
{
	this.optionsBoxOn=this.setA("optionsBoxOn",0,"bool");
	this.optionsBtnOn=this.setA("optionsBtnOn",0,"bool");
	this.optionsAlias=this.setA("optionsAlias",null,"string");
	this.hideInOptions=this.setA("hideInOptions",new Set(),"set");
	for(let k of this.hideInOptions)if(k.match(/[A-Za-z0-9]+/))this["hide"+k]=1;
	if(this.optionsBoxOn)
	{
		this.optionsBtnOn=0;
		return `<div class="mxOptionsBox" id="{this.n}OptionsBox">${this.buildOptions()}</div>`;
	}
	return this.optionsBtnOn?this.createBtn("Options"):``;
}
}
