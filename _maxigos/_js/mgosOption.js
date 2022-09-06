// maxiGos v7 > mgosOption.js
if(!mxG.G.prototype.createOption)
{
mxG.fr("Options","Options");
mxG.fr("Options_Short","O");
mxG.fr("Cancel","Annuler");
mxG.fr("OK","OK");
mxG.fr("Mark on last","Affichage d'une marque sur le dernier coup");
mxG.fr("Indices","Affichage des coordonnées");
mxG.fr("As in book","Comme dans les livres");
mxG.fr("Numbering","Numérotation");
mxG.fr("Marks and labels","Marques et étiquettes");
mxG.fr("Variation marks","Indication des variations");
mxG.fr("Show variations of current move instead of next move","Affichage des alternatives au coup courant au lieu des variations du coup suivant");
mxG.fr("In 3d","Affichage en 3d");
mxG.fr("When clicking on the goban","Un click sur le goban :");
mxG.fr("place a variation","place une variation");
mxG.fr("try to guess the next move","essaie de deviner le coup suivant");
mxG.fr("from","à partir de");
mxG.fr("with","avec");
mxG.fr("Loop time:","Temps pour l'affichage en boucle :");
mxG.fr("Animated stone","Pierres animées");
mxG.fr("Animated stone time:","Temps pour l'animation des pierres :");
mxG.en("Options_Short","O");
mxG.G.prototype.getValidNum=function(v)
{
	var n=parseInt(v);
	if(isNaN(n)) return 1;
	return n;
};
mxG.G.prototype.doChangeMarkOnLast=function()
{
	var e=this.getE("MarkOnLastOnCheckbox");
	this.markOnLastOn=e.checked?1:0;
	this.updateAll();
};
mxG.G.prototype.doChangeNumbering=function()
{
	var e=this.getE("NumberingOnCheckbox"),nf,nw;
	nf=this.getE("NumFromTextInput");
	nw=this.getE("NumWithTextInput");
	if(nf) nf.disabled=!e.checked;
	if(nw) nw.disabled=!e.checked;
	if(this.optionBoxOn)
	{
		this.numberingOn=e.checked?1:0;
		this.configNumberingOn=this.numberingOn;
		if(this.hasC("Tree")) this.hasToSetTree=1;
		this.updateAll();
	}
};
mxG.G.prototype.doKeyupNumFrom=function()
{
	var e=this.getE("NumFromTextInput");
	this.numFrom=this.getValidNum(e.value);
	if(this.hasC("Tree")) this.hasToSetTree=1;
	this.updateAll();
};
mxG.G.prototype.doKeyupNumWith=function()
{
	var e=this.getE("NumWithTextInput");
	this.numWith=this.getValidNum(e.value);
	if(this.hasC("Tree")) this.hasToSetTree=1;
	this.updateAll();
};
mxG.G.prototype.doChangeMarksAndLabels=function()
{
	var e=this.getE("MarksAndLabelsOnCheckbox");
	this.marksAndLabelsOn=e.checked?1:0;
	this.updateAll();
};
mxG.G.prototype.doChangeAsInBook=function()
{
	var e=this.getE("AsInBookOnCheckbox");
	this.asInBookOn=e.checked?1:0;
	this.configAsInBookOn=this.asInBookOn;
	this.updateAll();
};
mxG.G.prototype.doChangeIndices=function()
{
	var e=this.getE("IndicesOnCheckbox");
	this.indicesOn=e.checked?1:0;
	this.configIndicesOn=this.indicesOn;
	this.updateAll();
};
mxG.G.prototype.doChangeVariationMarks=function()
{
	var e=this.getE("VariationMarksOnCheckbox");
	this.variationMarksOn=e.checked?1:0;
	this.configVariationMarksOn=this.variationMarksOn;
	this.styleMode=this.variationMarksOn?this.styleMode&~2:this.styleMode|2;
	this.updateAll();
};
mxG.G.prototype.doChangeSiblings=function()
{
	var e=this.getE("SiblingsOnCheckbox");
	this.siblingsOn=e.checked?1:0;
	this.configSiblingsOn=this.siblingsOn;
	this.styleMode=this.siblingsOn?this.styleMode|1:this.styleMode&~1;
	this.updateAll();
};
mxG.G.prototype.setIn3dClass=function()
{
	var e=this.getE("GlobalBoxDiv");
	e.className=e.className.replace((this.in3dOn?"mxIn2d":"mxIn3d"),(this.in3dOn?"mxIn3d":"mxIn2d"));
};
mxG.G.prototype.doChangeIn3d=function()
{
	var e=this.getE("In3dOnCheckbox");
	this.in3dOn=e.checked?1:0;
	this.setIn3dClass();
	this.updateAll();
};
mxG.G.prototype.doKeyupLoopTime=function()
{
	var e=this.getE("LoopTimeTextInput");
	this.loopTime=this.getValidNum(e.value);
	this.updateAll();
};
mxG.G.prototype.doChangeAnimatedStone=function()
{
	var e=this.getE("AnimatedStoneOnCheckbox");
	this.animatedStoneOn=e.checked?1:0;
	this.updateAll();
};
mxG.G.prototype.doKeyupAnimatedStoneTime=function()
{
	var e=this.getE("AnimatedStoneTextInput");
	this.animatedStoneTime=this.getValidNum(e.value);
	this.updateAll();
};
mxG.G.prototype.doChangeCan=function()
{
	var e;
	e=this.getE("CanVariationRadio");
	this.canPlaceVariation=e.checked?1:0;
	e=this.getE("CanGuessRadio");
	this.canPlaceGuess=e.checked?1:0;
	this.updateAll();
};
mxG.G.prototype.doChangeScoreMethod=function(m)
{
	let e,z=null;
	if(e=this.getE("TrivialScoreMethodRadio")) if(e.checked) z="trivial";	
	if(e=this.getE("CountingScoreMethodRadio")) if(e.checked) z="counting";	
	if(e=this.getE("PropagateScoreMethodRadio")) if(e.checked) z="propagate";	
	if(e=this.getE("EstimateScoreMethodRadio")) if(e.checked) z="estimate";
	if(z) this.scoreMethod=z;
	this.updateAll();
};
mxG.G.prototype.doOptionOK=function()
{
	var e;
	if(e=this.getE("MarkOnLastOnCheckbox")) this.markOnLastOn=e.checked?1:0;
	if(e=this.getE("NumberingOnCheckbox")) {this.numberingOn=e.checked?1:0;this.configNumberingOn=this.numberingOn;if(this.hasC("Tree")) this.hasToSetTree=1;}
	if(e=this.getE("NumFromTextInput")) {this.numFrom=this.getValidNum(e.value);if(this.hasC("Tree")) this.hasToSetTree=1;}
	if(e=this.getE("NumWithTextInput")) {this.numWith=this.getValidNum(e.value);if(this.hasC("Tree")) this.hasToSetTree=1;}
	if(e=this.getE("MarksAndLabelsOnCheckbox")) this.marksAndLabelsOn=e.checked?1:0;
	if(e=this.getE("AsInBookOnCheckbox")) {this.asInBookOn=e.checked?1:0;this.configAsInBookOn=this.asInBookOn;}
	if(e=this.getE("IndicesOnCheckbox")) {this.indicesOn=e.checked?1:0;this.configIndicesOn=this.indicesOn;}
	if(e=this.getE("VariationMarksOnCheckbox")) {this.variationMarksOn=e.checked?1:0;this.configVariationMarksOn=this.variationMarksOn;this.styleMode=this.variationMarksOn?this.styleMode&~2:this.styleMode|2;}
	if(e=this.getE("SiblingsOnCheckbox")) {this.siblingsOn=e.checked?1:0;this.configSiblingsOn=this.siblingsOn;this.styleMode=this.siblingsOn?this.styleMode|1:this.styleMode&~1;}
	if(e=this.getE("In3dOnCheckbox")) {this.in3dOn=e.checked?1:0;this.setIn3dClass();if(this.hasC("Tree")) this.hasToSetTree=1;}
	if(e=this.getE("CanVariationRadio")) this.canPlaceVariation=e.checked?1:0;
	if(e=this.getE("CanGuessRadio")) this.canPlaceGuess=e.checked?1:0;
	if(e=this.getE("LoopTimeTextInput")) this.loopTime=this.getValidNum(e.value);
	if(e=this.getE("AnimatedStoneOnCheckbox")) this.animatedStoneOn=e.checked?1:0;
	if(e=this.getE("AnimatedStoneTimeTextInput")) this.animatedStoneTime=this.getValidNum(e.value);
	if(this.hasC("Score"))
	{
		let z=null;
		if(e=this.getE("TrivialScoreMethodRadio")) if(e.checked) z="trivial";	
		if(e=this.getE("CountingScoreMethodRadio")) if(e.checked) z="counting";	
		if(e=this.getE("PropagateScoreMethodRadio")) if(e.checked) z="propagate";	
		if(e=this.getE("EstimateScoreMethodRadio")) if(e.checked) z="estimate";
		if(z) this.scoreMethod=z;
	}
	this.hideGBox("ShowOption");
};
mxG.G.prototype.buildOption=function()
{
	var s="",c;
	s+="<div class=\"mxP\">";
	if(!this.hideMarkOnLastOn)
	{
		s+="<div><label><input type=\"checkbox\"";
		if(this.optionBoxOn) s+=" onchange=\""+this.g+".doChangeMarkOnLast()\"";
		s+=" id=\""+this.n+"MarkOnLastOnCheckbox\">";
		s+=this.local("Mark on last")+"</label></div>";
	}
	if(!this.hideNumberingOn)
	{
		s+="<div>";
		s+="<label>";
		s+="<input type=\"checkbox\"";
		s+=" onchange=\""+this.g+".doChangeNumbering()\"";
		s+=" id=\""+this.n+"NumberingOnCheckbox\">";
		s+=this.local("Numbering");
		s+=" <span class=\"mxNumFromTextSpan\">"+(mxG.Z[this.lang]["•"]?"":("<label for=\""+this.n+"NumFromTextInput\">"+this.local("from")))+"</label>";
		s+=" <input class=\"mxNumFromTextInput\" type=\"text\" id=\""+this.n+"NumFromTextInput\" size=\"3\" maxlength=\"3\" ";
		s+=(this.optionBoxOn?"onkeyup=\""+this.g+".doKeyupNumFrom()\">":">")+"</span>";
		s+=" <span class=\"mxNumWithTextSpan\">"+(mxG.Z[this.lang]["•"]?("<label for=\""+this.n+"NumFromTextInput\">"+this.local("from")):("<label for=\""+this.n+"NumWithTextInput\">"+this.local("with")))+"</label>";
		s+=" <input class=\"mxNumWithTextInput\" type=\"text\" id=\""+this.n+"NumWithTextInput\" size=\"3\" maxlength=\"3\" ";
		s+=(this.optionBoxOn?"onkeyup=\""+this.g+".doKeyupNumWith()\">":">")+(mxG.Z[this.lang]["•"]?("<label for=\""+this.n+"NumWithTextInput\">"+this.local("with")):"")+"</span>";
		s+="</label>";
		s+="</div>";
	}
	if(!this.hideMarksAndLabelsOn)
	{
		s+="<div>";
		s+="<label><input type=\"checkbox\"";
		if(this.optionBoxOn) s+=" onchange=\""+this.g+".doChangeMarksAndLabels()\"";
		s+=" id=\""+this.n+"MarksAndLabelsOnCheckbox\">";
		s+=this.local("Marks and labels")+"</label>";
		s+="</div>";
	}
	if(!this.hideAsInBookOn)
	{
		s+="<div>";
		s+="<label><input type=\"checkbox\"";
		if(this.optionBoxOn) s+=" onchange=\""+this.g+".doChangeAsInBook()\"";
		s+=" id=\""+this.n+"AsInBookOnCheckbox\">";
		s+=this.local("As in book")+"</label>";
		s+="</div>";
	}
	if(!this.hideIndicesOn)
	{
		s+="<div>";
		s+="<label><input type=\"checkbox\"";
		if(this.optionBoxOn) s+=" onchange=\""+this.g+".doChangeIndices()\"";
		s+=" id=\""+this.n+"IndicesOnCheckbox\">";
		s+=this.local("Indices")+"</label>";
		s+="</div>";
	}
	if(this.hasC("Variation")&&!this.hideVariationMarksOn)
	{
		s+="<div>";
		s+="<label><input type=\"checkbox\"";
		if(this.optionBoxOn) s+=" onchange=\""+this.g+".doChangeVariationMarks()\"";
		s+=" id=\""+this.n+"VariationMarksOnCheckbox\">";
		s+=this.local("Variation marks")+"</label>";
		s+="</div>";
	}
	if(this.hasC("Variation")&&!this.hideSiblingsOn)
	{
		s+="<div>";
		s+="<label><input type=\"checkbox\"";
		if(this.optionBoxOn) s+=" onchange=\""+this.g+".doChangeSiblings()\"";
		s+=" id=\""+this.n+"SiblingsOnCheckbox\">";
		s+=this.local("Show variations of current move instead of next move")+"</label>";
		s+="</div>";
	}
	if(!this.hideIn3dOn)
	{
		s+="<div>";
		s+="<label><input type=\"checkbox\"";
		if(this.optionBoxOn) s+=" onchange=\""+this.g+".doChangeIn3d()\"";
		s+=" id=\""+this.n+"In3dOnCheckbox\">";
		s+=this.local("In 3d")+"</label>";
		s+="</div>";
	}
	s+="</div>";
	c=0;
	if(this.hasC("Variation")&&!this.hideCanVariation) c++;
	if(this.hasC("Guess")&&!this.hideCanGuess) c++;
	if(c>1)
	{
		s+="<div class=\"mxP\">";
		s+="<div>"+this.local("When clicking on the goban")+"</div>";
		if(this.hasC("Variation")&&!this.hideCanVariation)
		{
			s+="<div>";
			s+="<label>";
			s+="<input name=\""+this.n+"ChangeCanRadio\" value=\"1\" type=\"radio\"";
			if(this.optionBoxOn) s+=" onchange=\""+this.g+".doChangeCan()\"";
			s+=" id=\""+this.n+"CanVariationRadio\">";
			s+=this.local("place a variation")+"</label>";
			s+="</div>";
		}
		if(this.hasC("Guess")&&!this.hideCanGuess)
		{
			s+="<div>";
			s+="<label>";
			s+="<input name=\""+this.n+"ChangeCanRadio\" value=\"2\" type=\"radio\"";
			if(this.optionBoxOn) s+=" onchange=\""+this.g+".doChangeCan()\"";
			s+=" id=\""+this.n+"CanGuessRadio\">";
			s+=this.local("try to guess the next move")+"</label>";
			s+="</div>";
		}
		s+="</div>";
	}
	s+="<div class=\"mxP\">";
	if(this.hasC("Loop")&&!this.hideLoopTime)
	{
		s+="<div>";
		s+="<label>"+this.local("Loop time:");
		s+=" <input type=\"text\" size=\"9\" maxlength=\"9\"";
		if(this.optionBoxOn) s+=" onkeyup=\""+this.g+".doKeyupLoopTime()\"";
		s+=" id=\""+this.n+"LoopTimeTextInput\" class=\"mxLoopTimeTextInput\"";
		s+="</label>";
		s+="</div>";
	}
	if(this.hasC("AnimatedStone")&&!this.hideAnimatedStoneOn)
	{
		s+="<div>";
		s+="<label><input type=\"checkbox\"";
		if(this.optionBoxOn) s+=" onchange=\""+this.g+".doChangeAnimatedStone()\"";
		s+=" id=\""+this.n+"AnimatedStoneOnCheckbox\">";
		s+=this.local("Animated stone")+"</label>";
		s+="</div>";
	}
	if(this.hasC("AnimatedStone")&&!this.hideAnimatedStoneTime)
	{
		s+="<div>";
		s+="<label>"+this.local("Animated stone time:");
		s+=" <input class=\"mxAnimatedStoneTimeTextInput\" type=\"text\" size=\"9\" maxlength=\"9\" ";
		if(this.optionBoxOn) s+=" onkeyup=\""+this.g+".doKeyupAnimatedStoneTime()\"";
		s+=" id=\""+this.n+"AnimatedStoneTimeTextInput\" class=\"mxAnimatedStoneTimeTextInput\">";
		s+="</label>";
		s+="</div>";
	}
	if(this.hasC("Score")&&!this.hideScoreMethod)
	{
		s+="<div class=\"mxP\">";
		s+="<div>"+this.local("Score method:")+"</div>";
		s+="<div>";
		s+="<label>";
		s+="<input name=\""+this.n+"ChangeScoreMethodRadio\" value=\"1\" type=\"radio\"";
		if(this.optionBoxOn) s+=" onchange=\""+this.g+".doChangeScoreMethod()\"";
		s+=" id=\""+this.n+"TrivialScoreMethodRadio\">";
		s+=this.local("trivial")+"</label>";
		s+="</div>";
		s+="<div>";
		s+="<label>";
		s+="<input name=\""+this.n+"ChangeScoreMethodRadio\" value=\"2\" type=\"radio\"";
		if(this.optionBoxOn) s+=" onchange=\""+this.g+".doChangeScoreMethod()\"";
		s+=" id=\""+this.n+"CountingScoreMethodRadio\">";
		s+=this.local("counting")+"</label>";
		s+="</div>";
		s+="<div>";
		s+="<label>";
		s+="<input name=\""+this.n+"ChangeScoreMethodRadio\" value=\"3\" type=\"radio\"";
		if(this.optionBoxOn) s+=" onchange=\""+this.g+".doChangeScoreMethod()\"";
		s+=" id=\""+this.n+"PropagateScoreMethodRadio\">";
		s+=this.local("propagate")+"</label>";
		s+="</div>";
		s+="<div>";
		s+="<label>";
		s+="<input name=\""+this.n+"ChangeScoreMethodRadio\" value=\"4\" type=\"radio\"";
		if(this.optionBoxOn) s+=" onchange=\""+this.g+".doChangeScoreMethod()\"";
		s+=" id=\""+this.n+"EstimateScoreMethodRadio\">";
		s+=this.local("estimate")+"</label>";
		s+="</div>";
		s+="</div>";
	}
	s+="</div>";
	return s;
};
mxG.G.prototype.setInputOption=function()
{
	var e;
	if(e=this.getE("MarkOnLastOnCheckbox")) e.checked=(this.markOnLastOn==1);
	if(e=this.getE("NumberingOnCheckbox")) e.checked=(this.numberingOn>=1);
	if(e=this.getE("NumFromTextInput")) {e.value=this.numFrom;e.disabled=!this.numberingOn;}
	if(e=this.getE("NumWithTextInput")) {e.value=this.numWith;e.disabled=!this.numberingOn;}
	if(e=this.getE("MarksAndLabelsOnCheckbox")) e.checked=(this.marksAndLabelsOn==1);
	if(e=this.getE("AsInBookOnCheckbox")) e.checked=(this.asInBookOn==1);
	if(e=this.getE("IndicesOnCheckbox")) e.checked=(this.indicesOn==1);
	if(e=this.getE("VariationMarksOnCheckbox")) e.checked=(this.variationMarksOn==1);
	if(e=this.getE("SiblingsOnCheckbox")) e.checked=(this.siblingsOn==1);
	if(e=this.getE("In3dOnCheckbox")) e.checked=(this.in3dOn==1);
	// set only one of radio below since others are automatically set to false
	if((e=this.getE("CanVariationRadio"))&&(this.canPlaceVariation==1)) e.checked=true;
	if((e=this.getE("CanGuessRadio"))&&(this.canPlaceGuess==1)) e.checked=true;
	// set only one of radio below since others are automatically set to false
	if((e=this.getE("TrivialScoreMethodRadio"))&&(this.scoreMethod=="trivial"))
		e.checked=true;
	if((e=this.getE("CountingScoreMethodRadio"))&&(this.scoreMethod=="counting"))
		e.checked=true;
	if((e=this.getE("PropagateScoreMethodRadio"))&&(this.scoreMethod=="propagate"))
		e.checked=true;
	if((e=this.getE("EstimateScoreMethodRadio"))&&(this.scoreMethod=="estimate"))
		e.checked=true;
	if(e=this.getE("LoopTimeTextInput")) e.value=this.loopTime;
	if(e=this.getE("AnimatedStoneOnCheckbox"))
		e.checked=(this.animatedStoneOn==1);
	if(e=this.getE("AnimatedStoneTimeTextInput"))
		e.value=(this.animatedStoneTime?this.animatedStoneTime:this.loopTime?this.loopTime:1000);
};
mxG.G.prototype.doOption=function()
{
	var s;
	if(this.gBox=="ShowOption") {this.hideGBox("ShowOption");return;}
	if(!this.getE("ShowOptionDiv"))
	{
		s="<div class=\"mxShowContentDiv\" tabindex=\"0\">";
		s+="<h1>"+this.local("Options")+"</h1>";
		s+=this.buildOption();
		s+="</div>";
		s+="<div class=\"mxOKDiv\">";
		s+="<button type=\"button\" onclick=\""+this.g+".doOptionOK()\"><span>"+this.local("OK")+"</span></button>";
		s+="<button type=\"button\" onclick=\""+this.g+".hideGBox('ShowOption')\"><span>"+this.local("Cancel")+"</span></button>";
		s+="</div>";
		this.createGBox("ShowOption").innerHTML=s;
	}
	this.setInputOption();
	this.showGBox("ShowOption");
};
mxG.G.prototype.updateOption=function()
{
	if(this.optionBoxOn) this.setInputOption();
	if(this.getE("OptionBtn"))
	{
		if(this.gBox=="ShowOption") this.selectBtn("Option");
		else this.unselectBtn("Option");
	}
};
mxG.G.prototype.initOption=function()
{
	if(this.optionBtnOn)
		this.addBtn(this.getE("OptionDiv"),{n:"Option",v:this.alias("Options","optionAlias")});
};
mxG.G.prototype.createOption=function()
{
	var s="";
	this.optionBoxOn=this.setA("optionBoxOn",0,"bool");
	this.optionBtnOn=this.setA("optionBtnOn",0,"bool");
	this.optionAlias=this.setA("optionAlias",null,"string");
	this.hideCanGuess=this.setA("hideCanGuess",0,"bool");
	this.hideCanVariation=this.setA("hideCanVariation",0,"bool");
	this.hideMarkOnLastOn=this.setA("hideMarkOnLastOn",0,"bool");
	this.hideNumberingOn=this.setA("hideNumberingOn",0,"bool");
	this.hideMarksAndLabelsOn=this.setA("hideMarksAndLabelsOn",0,"bool");
	this.hideAsInBookOn=this.setA("hideAsInBookOn",0,"bool");
	this.hideIndicesOn=this.setA("hideIndicesOn",0,"bool");
	this.hideVariationMarksOn=this.setA("hideVariationMarksOn",0,"bool");
	this.hideSiblingsOn=this.setA("hideSiblingsOn",0,"bool");
	this.hideIn3dOn=this.setA("hideIn3dOn",0,"bool");
	this.hideLoopTime=this.setA("hideLoopTime",0,"bool");
	this.hideAnimatedStoneOn=this.setA("hideAnimatedStoneOn",0,"bool");
	this.hideAnimatedStoneTime=this.setA("hideAnimatedStoneTime",0,"bool");
	this.hideScoreMethod=this.setA("hideScoreMethod",0,"bool");
	if(this.optionBoxOn||this.optionBtnOn)
	{
		s+="<div class=\"mxOptionDiv\" id=\""+this.n+"OptionDiv\">";
		if(!this.optionBtnOn) s+=this.buildOption();
		s+="</div>";
	}
	return s;
};
}
