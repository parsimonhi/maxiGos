// maxiGos v7 > mgosEdit.js
if(!mxG.G.prototype.createEdit)
{
mxG.fr("Cut","Couper");
mxG.fr("Copy","Copier");
mxG.fr("Paste","Coller");
mxG.fr("Remove comments","Supprimer les commentaires");
mxG.fr("Selection","Sélection");
mxG.fr("Full/partial view","Vue partielle/totale");
mxG.fr("Place a move","Placer un coup");
mxG.fr("Add/remove a stone","Ajouter/retirer une pierre");
mxG.fr("Add/remove a black stone","Ajouter/retirer une pierre noire");
mxG.fr("Add/remove a white stone","Ajouter/retirer une pierre blanche");
mxG.fr("Cut branch","Couper une branche");
mxG.fr("Copy branch","Copier une branche");
mxG.fr("Paste branch","Coller une branche");
mxG.fr("Label","Étiquette");
mxG.fr("Mark","Marque");
mxG.fr("Circle","Cercle");
mxG.fr("Square","Carré");
mxG.fr("Triangle","Triangle");
mxG.fr("Numbering","Numérotation");
mxG.fr("As in book","Comme dans les livres");
mxG.fr("Indices","Indices");
mxG.fr("Variation marks","Marques sur les variations");
mxG.fr("Variation style","Style des variations");
mxG.fr("Marks and labels","Marques et étiquettes");
mxG.fr("Header","Entête");
mxG.fr("K","L");
mxG.fr("I","I");
mxG.fr("V","V");
mxG.fr("H","E");
mxG.fr("S","S");
mxG.fr("OK","OK");
mxG.fr("Cancel","Annuler");
mxG.fr("New (from this point):","Nouvelle (à partir de cette position) :");
mxG.fr("Modify","Modifier (seulement pour cette partie de l'arbre des coups)");
mxG.fr("Remove","Supprimer (seulement pour cette partie de l'arbre des coups)");
mxG.fr("Start numbering with:","Numéroter en commençant par :");
mxG.fr("No numbering","Ne pas numéroter");
mxG.fr("Good move","Bon coup");
mxG.fr("Bad move","Mauvais coup");
mxG.fr("Doubtful move","Douteux");
mxG.fr("Interesting move","intéressant");
mxG.fr("Good for Black","Bon pour Noir");
mxG.fr("Good for White","Bon pour Blanc");
mxG.fr("Even","Équilibré");
mxG.fr("Unclear","Pas clair");
mxG.fr("Turn in Sgf","Trait dans le Sgf");
mxG.fr("Horizontal mirror","Miroir horizontal");
mxG.fr("Vertical mirror","Miroir vertical");
mxG.fr("Rotate","Rotation");
mxG.fr("Comments","Commentaire");
mxG.G.prototype.setViewFromSelection=function()
{
	var aN,s,xl,yt,xr,yb,exXl,exYt,exXr,exYb,exXls,exYts,exXrs,exYbs;
	if(this.selection)
	{
		xl=((this.editXrs>this.editXls)?this.editXls:this.editXrs);
		yt=((this.editYbs>this.editYts)?this.editYts:this.editYbs);
		xr=((this.editXrs>this.editXls)?this.editXrs:this.editXls);
		yb=((this.editYbs>this.editYts)?this.editYbs:this.editYts);
		if(xl<1) xl=1;
		if(yt<1) yt=1;
		if(xr>this.DX) xr=this.DX;
		if(yb>this.DY) yb=this.DY;
		this.inSelect=0;
		this.unselectView();
	}
	else
	{
		xl=1;
		yt=1;
		xr=this.DX;
		yb=this.DY;
	}
	if((xl==1)&&(yt==1)&&(xr==this.DX)&&(yb==this.DY)) s="";
	else s=this.xy2s(xl,yt)+":"+this.xy2s(xr,yb);
	aN=this.cN;
	if(aN.P.VW)
	{
		aN.TakeOff("VW",-1);
		if(s) aN.P.VW=[s];
	}
	else aN.P.VW=[s];
	this.updateAll();
};
mxG.G.prototype.selectPoint=function(x,y)
{
	this.scr.addSelect(x,y);
};
mxG.G.prototype.unselectPoint=function(x,y)
{
	this.scr.removeSelect(x,y);
};
mxG.G.prototype.unselectTool=function(tool)
{
	if(!tool||!this.hasEditTool(tool)) return;
	this.getE(tool+"Tool").className="mxUnselectedEditTool";
};
mxG.G.prototype.selectTool=function(tool)
{
	if(!tool||!this.hasEditTool(tool)) return;
	this.getE(tool+"Tool").className="mxSelectedEditTool";
};
mxG.G.prototype.superSelectTool=function(tool)
{
	if(!tool||!this.hasEditTool(tool)) return;
	this.getE(tool+"Tool").className="mxSuperSelectedEditTool";
};
mxG.G.prototype.disableTool=function(tool)
{
	if(!tool||!this.hasEditTool(tool)) return;
	if(tool=="Comment") this.getE("CommentToolText").disabled=true;
	else this.getE(tool+"Tool").disabled=true;
};
mxG.G.prototype.enableTool=function(tool)
{
	if(!tool||!this.hasEditTool(tool)) return;
	if(tool.substring(0,4)=="Void") this.getE(tool+"Tool").disabled=true;
	else if(tool=="Comment") this.getE("CommentToolText").disabled=false;
	else this.getE(tool+"Tool").disabled=false;
};
mxG.G.prototype.disableTools=function()
{
	var k,km=this.tools.length;
	for(k=0;k<km;k++) this.disableTool(this.tools[k]);
	this.disableTool("Comment");
};
mxG.G.prototype.enableTools=function()
{
	var k,km=this.tools.length;
	for(k=0;k<km;k++) this.enableTool(this.tools[k]);
	this.enableTool("Comment");
};
mxG.G.prototype.changeSelectedTool=function(newTool)
{
	if(this.selection) this.unselectView();
	if(this.editTool&&(this.editTool!="ShowInfo")&&(this.editTool!="Numbering"))
		this.unselectTool(this.editTool);
	this.editTool=newTool;
	if((newTool!="ShowInfo")&&(newTool!="Numbering")) this.selectTool(newTool);
};
mxG.G.prototype.doCut=function()
{
	var aN,SZ,ST,z=this.k;
	if(this.hasC("Menu")) this.toggleMenu("Edit",0);
	this.selectTool("Cut");
	this.zN=this.cN;
	aN=this.zN.Dad;
	this.zN.Dad=null;
	if((aN==this.rN)&&(aN.Kid.length==1))
	{
		SZ=this.getInfoS("SZ");
		ST=this.getInfoS("ST");
	}
	aN.Kid.splice(aN.Focus-1,1);
	aN.Focus=aN.Kid.length?1:0;
	if(aN==this.rN)
	{
		if(aN.Focus) aN=aN.Kid[0];
		else
		{
			aN=new mxG.N(aN,"FF",4);
			aN.P.GM=["1"];
			aN.P.CA=["UTF-8"];
			aN.P.SZ=[SZ];
			aN.P.ST=[ST];
		}
	}
	this.backNode(aN);
	if(this.hasC("Tree")) this.hasToSetTree=1;
	this.updateAll();
	setTimeout(function(){mxG.D[z].unselectTool("Cut");},200);
};
mxG.G.prototype.doCopy=function()
{
	var z=this.k;
	if(this.hasC("Menu")) this.toggleMenu("Edit",0);
	this.selectTool("Copy");
	this.zN=this.cN.Clone(null);
	this.zN.Dad=null;
	setTimeout(function(){mxG.D[z].unselectTool("Copy");},200);
};
mxG.G.prototype.doPaste=function()
{
	var z=this.k;
	if(this.hasC("Menu")) this.toggleMenu("Edit",0);
	this.selectTool("Paste");
	if(this.zN)
	{
		if(this.zN.P.SZ) this.cN=this.rN;
		this.zN.Dad=this.cN;
		this.cN.Kid[this.cN.Kid.length]=this.zN;
		this.zN=this.zN.Clone(null);
		this.cN.Focus=this.cN.Kid.length;
		this.backNode((this.cN==this.rN)?this.kidOnFocus(this.cN):this.cN);
		if(this.hasC("Tree")) this.hasToSetTree=1;
		this.updateAll();
	}
	setTimeout(function(){mxG.D[z].unselectTool("Paste");},200);
};
mxG.G.prototype.doRemoveComments=function()
{
	var sgf,sgf1,sgf2,k;
	if(this.hasC("Menu")) this.toggleMenu("Edit",0);
	if(!this.hasC("Sgf")) return;
	sgf1=this.buildSgf();
	sgf2=sgf1.replace(/(\n|;|\])C\[([^\[\]]+|(\[[^\[\]]+\])?)*\]/g,'$1');
	if(sgf2!=sgf1)
	{
		this.mayHaveExtraTags=0;
		k=this.rNs.indexOf(this.rN);
		sgf=this.rN.sgf?this.rN.sgf:"";
		if(this.getE("WindowMenuDiv"))
		{
			this.rN.cN=this.cN;
		}
		this.rN=new mxG.P(sgf2,this.sgfLoadCoreOnly,this.sgfLoadMainOnly);
		this.rN.sgf=sgf;
		if(this.getE("WindowMenuDiv")) this.rNs[k]=this.rN;
		this.backNode(this.kidOnFocus(this.rN));
		if(this.hasC("Tree")) this.hasToSetTree=1;
		this.updateAll();
	}
}
mxG.G.prototype.doAsInBook=function()
{
	var aN=this.cN,sN=this.kidOnFocus(this.rN),exFig=0,newFig,newAsInBookOn=(this.asInBookOn?0:1);
	while(aN!=this.rN)
	{
		if(aN.P.FG) {exFig=parseInt(aN.P.FG[0]);break;}
		aN=aN.Dad;
	}
	if(aN==this.rN) aN=sN;
	newFig=(newAsInBookOn?(exFig|256):(exFig&~256));
	if((aN==sN)&&!newFig) aN.TakeOff("FG",0);
	else aN.Set("FG",newFig);
	this.updateAll();
};
mxG.G.prototype.doIndices=function()
{
	var aN=this.cN,sN=this.kidOnFocus(this.rN),exFig=0,newFig,newIndicesOn;
	newIndicesOn=(this.indicesOn?0:1);
	while(aN!=this.rN)
	{
		if(aN.P.FG) {exFig=parseInt(aN.P.FG[0]);break;}
		aN=aN.Dad;
	}
	if(aN==this.rN) aN=sN;
	newFig=newIndicesOn?(exFig&~1):(exFig|1);
	if((aN==sN)&&!newFig) aN.TakeOff("FG",0);
	else aN.Set("FG",newFig);
	this.updateAll();
};
mxG.G.prototype.doNumberingOK=function()
{
	var aN;
	if(this.getE("NewFigureBox")&&this.getE("NewFigureBox").checked) aN=this.cN;
	else
	{
		aN=this.cN;
		while((aN.Dad!=this.rN)&&!(aN.P.FG)) aN=aN.Dad;
	}
	if(this.getE("FigureOrNot2Input")&&this.getE("FigureOrNot2Input").checked)
	{
		aN.TakeOff("FG",0);
		aN.TakeOff("PM",0);
		aN.TakeOff("MN",0);
	}
	else
	{
		var newNumberingOn=(this.getE("NumberingOrNot1Input").checked?1:0);
		var newNumWith=parseInt(this.getE("NumWithTextInput").value);
		var newAsInBookOn=(this.getE("AsInBookInput").checked?1:0);
		var newIndicesOn=(this.getE("IndicesInput").checked?1:0);
		var newFigure=((newAsInBookOn?256:0)|(newIndicesOn?0:1));
		if(aN==this.kidOnFocus(this.rN))
		{
			if(newFigure) aN.Set("FG",newFigure);
			else aN.TakeOff("FG",0);
			if((newNumWith>1)&&newNumberingOn) aN.Set("MN",newNumWith);
			else aN.TakeOff("MN",0);
			if(newNumberingOn!=1) aN.Set("PM",newNumberingOn);
			else aN.TakeOff("PM",0);
		}
		else
		{
			aN.Set("FG",newFigure);
			aN.Set("PM",newNumberingOn);
			if(newNumberingOn) aN.Set("MN",newNumWith);
			else aN.TakeOff("MN",0);
		}
	}
	if(this.hasC("Tree")) this.hasToSetTree=1;
	this.hideGBox("Numbering");
};
mxG.G.prototype.switchFigureOrNot=function()
{
	var e;
	if(this.getE("NewFigureBox").checked)
	{
		if(e=this.getE("FigureOrNot1P")) e.style.display="none";
		else if(e=this.getE("FigureOrNot2P")) e.style.display="none";
	}
	else
	{
		if(e=this.getE("FigureOrNot1P")) e.style.display="block";
		else if(e=this.getE("FigureOrNot2P")) e.style.display="block";
	}
};
mxG.G.prototype.doNumbering=function()
{
	if(this.gBox=="Numbering") {this.hideGBox("Numbering");return;}
	if(!this.getE("NumberingDiv")) this.createGBox("Numbering");
	var aN=this.cN,s="",a;
	while((aN.Dad!=this.rN)&&!aN.P.FG) aN=aN.Dad;
	a=" tabindex=\"0\"";
	s+="<div class=\"mxShowContentDiv\""+a+">";
	s+="<h1>"+this.local("Numbering")+"</h1>";
	if(aN!=this.cN)
	{
		s+="<div class=\"mxP\"><label for=\""+this.n+"NewFigureBox\">"+this.local("New (from this point):")+" </label>";
		s+="<input type=\"checkbox\" "+"id=\""+this.n+"NewFigureBox\" onclick=\""+this.g+".switchFigureOrNot()\">";
		s+="</div>";
	}
	if((aN.Dad!=this.rN)&&aN.P.FG) 
	{
		s+="<div class=\"mxP mxFigureOrNotP\" id=\""+this.n+"FigureOrNot1P\"><input type=\"radio\" id=\""+this.n+"FigureOrNot1Input\" name=\"figureOrNot\" checked value=\"1\">";
		s+="<label for=\""+this.n+"FigureOrNot1Input\">"+this.local("Modify")+"</label>";
		s+="</div>";
	}
	s+="<div class=\"mxP mxTabNumberingP\">";
	s+="<input type=\"radio\" id=\""+this.n+"NumberingOrNot1Input\" name=\"numberingOrNot\"";
	s+=(this.numberingOn?" checked":"");
	s+=" value=\"1\">";
	s+="<label for=\""+this.n+"NumberingOrNot1Input\">"+this.local("Start numbering with:")+" </label>";
	s+="<input type=\"text\" id=\""+this.n+"NumWithTextInput\" size=\"3\" maxlength=\"3\" value=\""+1+"\"><br>";
	s+="<input type=\"radio\" id=\""+this.n+"NumberingOrNot2Input\" name=\"numberingOrNot\"";
	s+=(!this.numberingOn?" checked":"");
	s+=" value=\"2\">";
	s+="<label for=\""+this.n+"NumberingOrNot2Input\">"+this.local("No numbering")+"</label><br><br>";
	s+="<input type=\"checkbox\""+(this.asInBookOn?" checked":"")+" id=\""+this.n+"AsInBookInput\"> "+this.local("As in book")+"<br>";
	s+="<input type=\"checkbox\""+(this.indicesOn?" checked":"")+" id=\""+this.n+"IndicesInput\"> "+this.local("Indices")+"<br>";
	s+="</div>";
	if((aN.Dad!=this.rN)&&aN.P.FG)
	{
		s+="<div class=\"mxP mxFigureOrNotP\" id=\""+this.n+"FigureOrNot2P\"><input type=\"radio\" id=\""+this.n+"FigureOrNot2Input\" name=\"figureOrNot\" value=\"2\">";
		s+="<label for=\""+this.n+"FigureOrNot2Input\">"+this.local("Remove")+"</label></div>";
	}
	s+="</div>";
	s+="<div class=\"mxOKDiv\">";
	s+="<button type=\"button\" onclick=\""+this.g+".doNumberingOK()\"><span>"+this.local("OK")+"</span></button>";
	s+="<button type=\"button\" onclick=\""+this.g+".hideGBox('Numbering')\"><span>"+this.local("Cancel")+"</span></button>";
	s+="</div>";
	this.getE("NumberingDiv").innerHTML=s;
	this.showGBox("Numbering");
};
mxG.G.prototype.doVariation=function()
{
	if(this.styleMode&2) this.styleMode-=2;else this.styleMode+=2;
	this.kidOnFocus(this.rN).Set("ST",this.styleMode&~4);
	this.updateAll();
};
mxG.G.prototype.doStyle=function()
{
	if(this.styleMode&1) this.styleMode-=1;else this.styleMode+=1;
	this.kidOnFocus(this.rN).Set("ST",this.styleMode&~4);
	this.updateAll();
};
mxG.G.prototype.doPropertySwitch=function(tool)
{
	var z;
	if((tool!="DO")&&(tool!="IT")) z=2;else z=1;
	if(this.cN.P&&this.cN.P[tool])
	{
		if(((this.cN.P[tool][0]+"")=="1")&&(z>1)) this.cN.P[tool][0]="2";
		else this.cN.TakeOff(tool,0);
	}
	else
	{
		if((tool=="GB")||(tool=="GW")||(tool=="DM")||(tool=="UC"))
		{
			if((tool!="GB")&&this.cN.P&&this.cN.P.GB) this.cN.TakeOff("GB",0);
			if((tool!="GW")&&this.cN.P&&this.cN.P.GW) this.cN.TakeOff("GW",0);
			if((tool!="DM")&&this.cN.P&&this.cN.P.DM) this.cN.TakeOff("DM",0);
			if((tool!="UC")&&this.cN.P&&this.cN.P.UC) this.cN.TakeOff("UC",0);
		}
		if((tool=="TE")||(tool=="BM")||(tool=="DO")||(tool=="IT"))
		{
			if((tool!="TE")&&this.cN.P&&this.cN.P.TE) this.cN.TakeOff("TE",0);
			if((tool!="BM")&&this.cN.P&&this.cN.P.BM) this.cN.TakeOff("BM",0);
			if((tool!="DO")&&this.cN.P&&this.cN.P.DO) this.cN.TakeOff("DO",0);
			if((tool!="IT")&&this.cN.P&&this.cN.P.IT) this.cN.TakeOff("IT",0);
		}
		this.cN.Set(tool,(z>1)?"1":"");
	}
	this.updateAll();
};
mxG.G.prototype.doPL=function()
{
	if(this.cN.P&&this.cN.P.PL) this.cN.TakeOff("PL",0);
	else this.cN.Set("PL",this.editNextNat);
	this.updateAll();
};
mxG.G.prototype.doTransform=function(transform)
{
	var s,z,a=[],aN,n,k,sgf;
	if(this.hasC("Sgf"))
	{
		aN=this.cN;
		while(aN)
		{
			a.push(aN.Focus);
			aN=aN.Dad;
		}
		this.transform=transform;
		s=this.buildSgf();
		this.transform=0;
		this.mayHaveExtraTags=0;
		k=this.rNs.indexOf(this.rN);
		sgf=this.rN.sgf?this.rN.sgf:"";
		this.rN=new mxG.P(s,this.sgfLoadCoreOnly,this.sgfLoadMainOnly);
		this.rN.Focus=a.pop();
		this.rN.sgf=sgf;
		this.rNs[k]=this.rN;
		this.backNode(this.kidOnFocus(this.rN));
		if(this.hasC("Tree")) this.hasToSetTree=1;
		while(a.length) {this.cN.Focus=a.pop();if(a.length) this.placeNode();}
		this.updateAll();
	}
};
mxG.G.prototype.doEditTool=function(newTool)
{
	if(this.gBox) {if(newTool==this.gBox) this.hideGBox(newTool);return;}
	if(newTool=="ShowInfo") {this.doInfo();return;}
	if(newTool=="Numbering") {this.doNumbering();return;}
	if(newTool=="Cut") {this.doCut();return;}
	if(newTool=="Copy") {this.doCopy();return;}
	if(newTool=="Paste") {this.doPaste();return;}
	if(newTool=="AsInBook") {this.doAsInBook();return;}
	if(newTool=="Indices") {this.doIndices();return;}
	if(newTool=="Variation") {this.doVariation();return;}
	if(newTool=="Style") {this.doStyle();return;}
	if((newTool=="GB")
	  ||(newTool=="GW")
	  ||(newTool=="DM")
	  ||(newTool=="UC")
	  ||(newTool=="TE")
	  ||(newTool=="BM")
	  ||(newTool=="DO")
	  ||(newTool=="IT")) {this.doPropertySwitch(newTool);return;}
	if(newTool=="PL") {this.doPL();return;}
	if(newTool=="View")
	{
		let z=this.k;
		this.selectTool(newTool);
		this.setViewFromSelection();
		setTimeout(function(){mxG.D[z].unselectTool(newTool);},200);
		if(this.editTool=="Select") this.changeSelectedTool("Play");
		return;
	}
	if(this.selection) {this.inSelect=0;this.unselectView();}
	if((newTool=="Play")&&(this.editTool=="Play"))
	{
		if(this.editNextNat=="B") {this.editNextNat="W";this.drawSvgTool("Play");}
		else if(this.editNextNat=="W") {this.editNextNat="B";this.drawSvgTool("Play");}
		return;
	}
	if((newTool=="Setup")&&(this.editTool=="Setup"))
	{
		if(this.editAX=="AB") {this.editAX="AW";this.drawSvgTool("Setup");}
		else if(this.editAX=="AW") {this.editAX="AB";this.drawSvgTool("Setup");}
		return;
	}
	if((newTool=="SetupBlack")&&(this.editTool!="SetupBlack"))
	{
		this.editAX="AB";
		this.changeSelectedTool("SetupBlack");
		return;
	}
	if((newTool=="SetupWhite")&&(this.editTool!="SetupWhite"))
	{
		this.editAX="AW";
		this.changeSelectedTool("SetupWhite");
		return;
	}
	if(newTool=="VM") {this.doTransform(1);return;}
	if(newTool=="HM") {this.doTransform(2);return;}
	if(newTool=="R") {this.doTransform(3);return;}
	this.changeSelectedTool(newTool);
};
mxG.G.prototype.doEditCommentTool=function()
{
	var s=this.getE("CommentToolText").value;
	if(s) this.cN.Set("C",s);
	else this.cN.TakeOff("C",0);
};
mxG.G.prototype.getNextEditNat=function()
{
	var aN,k,km;
	
	// get color from PL
	aN=this.cN;
	if(aN.P.PL) return aN.P.PL[0];
	// get color of this.kidOnFocus(this.cN)
	aN=this.kidOnFocus(this.cN);
	if(aN)
	{
		if(aN.P.B) return "B";
		if(aN.P.W) return "W";
	}
	
	// get opposite color of cN
	aN=this.cN;
	if(aN.P.B) return "W";
	if(aN.P.W) return "B";
	// get opposite color if cN has AB and no AW (handicap game?) or AW and no AB, 
	if(aN.P.AB&&!aN.P.AW) return "W";
	else if(aN.P.AW&&!aN.P.AB) return "B";
	// get color of cN children
	km=this.cN.Kid.length;
	for(k=0;k<km;k++)
	{
		aN=this.cN.Kid[k];
		if(aN.P.B) return "B";
		if(aN.P.W) return "W";
	}
	// get opposite color of cN brothers
	km=this.cN.Dad.Kid.length;
	for(k=0;k<km;k++)
	{
		aN=this.cN.Dad.Kid[k];
		if(aN.P.B) return "W";
		if(aN.P.W) return "B";
	}
	// unable to decide who will play
	return "B";
};
mxG.G.prototype.checkEditPlay=function(a,b)
{
	var nextNat=this.editNextNat,
		s,aN,x,y,nat,k,km;
	if(!nextNat) {this.plonk();return;}
	if((a||b)&&this.gor.isOccupied(a,b)) {this.plonk();return;}
	k=0;
	km=this.cN.Kid.length;
	while(k<km)
	{
		aN=this.cN.Kid[k];
		x=-1;
		y=-1;
		nat="O";
		s="";
		if(aN.P.B) {s=aN.P.B[0];nat="B";}
		else if(aN.P.W) {s=aN.P.W[0];nat="W";}
		if(s.length==2) {x=s.c2n(0);y=s.c2n(1);}
		else if(s.length==0) {x=0;y=0;}
		
		if((x==a)&&(y==b)&&(nat==nextNat)) // there is already a nextNat move on (a,b) thus place it
		{
			this.cN.Focus=k+1;
			this.backNode(this.cN); // why?
			this.placeNode();
			this.updateAll();
			return;
		}
		else k++;
	}
	// (a,b) was not found in the sgf thus add it
	this.addPlay(nextNat,a,b);
	this.placeNode();
	if(this.hasC("Tree")) this.hasToSetTree=1;
	this.updateAll();
};
mxG.G.prototype.checkEditSetup=function(x,y,setupTool="Setup")
{
	// if a B or W is in cN, add AX values on a new cN kids
	// else add/remove AX values on cN
	var aN,p,v,k,km,kp;
	var AX=["AB","AW","AE"];
	if(!this.inView(x,y)) return;
	if(this.gor.getBanNat(x,y)!="E") p="AE";else p=this.editAX;
	v=this.xy2s(x,y);
	if(this.cN.P.B||this.cN.P.W)
	{
		aN=new mxG.N(this.cN,p,v);
		this.cN.Focus=this.cN.Kid.length;
		this.placeNode();
		if(this.hasC("Tree")) this.hasToSetTree=1;
		this.updateAll();
		this.changeSelectedTool(setupTool);
	}
	else
	{
		aN=this.cN;
		// remove AX[x y] if any
		for(kp=0;kp<3;kp++)
		{
			if(aN.P[AX[kp]])
			{
				km=aN.P[AX[kp]].length;
				for(k=0;k<km;k++) if(aN.P[AX[kp]][k]==v) break;
				if(k<km) aN.TakeOff(AX[kp],k);
			}
		}
		// add p[x y] only if something is changed
		this.backNode(aN.Dad);
		aExNat=this.gor.getBanNat(x,y);
		if(aExNat!=p.substring(1,2))
		{
			if(aN.P[p]) aN.P[p].push(v);
			else aN.P[p]=[v];
		}
		this.placeNode(aN);
		this.updateAll();
	}
};
mxG.G.prototype.selectGobanArea=function(x,y)
{
	if((this.editTool=="Select")&&this.inSelect&&((x!=this.editXrs)||(y!=this.editYbs)))
	{
		var id,i,j,xl,yt,xr,yb,xl1,yt1,xr1,yb1,xl2,yt2,xr2,yb2;
		xl1=Math.min(this.editXls,this.editXrs);
		yt1=Math.min(this.editYts,this.editYbs);
		xr1=Math.max(this.editXls,this.editXrs);
		yb1=Math.max(this.editYts,this.editYbs);
		this.editXrs=x;
		this.editYbs=y;
		xl2=Math.min(this.editXls,this.editXrs);
		yt2=Math.min(this.editYts,this.editYbs);
		xr2=Math.max(this.editXls,this.editXrs);
		yb2=Math.max(this.editYts,this.editYbs);
		xl=Math.min(xl1,xl2);
		yt=Math.min(yt1,yt2);
		xr=Math.max(xr1,xr2);
		yb=Math.max(yb1,yb2);
		for(i=xl;i<=xr;i++)
			for(j=yt;j<=yb;j++)
				if((i>=xl2)&&(i<=xr2)&&(j>=yt2)&&(j<=yb2))
				{
					if((i<xl1)||(i>xr1)||(j<yt1)||(j>yb1)) this.selectPoint(i,j);
				}
				else if((i>=xl1)&&(i<=xr1)&&(j>=yt1)&&(j<=yb1)) this.unselectPoint(i,j);
	}
};
mxG.G.prototype.unselectView=function()
{
	var i,j;
	this.selection=0;
	// check all points (easier)
	for(i=0;i<=(this.DX+1);i++)
		for(j=0;j<=(this.DY+1);j++)
			this.unselectPoint(i,j);
};
mxG.G.prototype.selectView=function()
{
	var i,j,xl,yt,xr,yb;
	this.selection=1;
	xl=Math.min(this.editXls,this.editXrs);
	yt=Math.min(this.editYts,this.editYbs);
	xr=Math.max(this.editXls,this.editXrs);
	yb=Math.max(this.editYts,this.editYbs);
	for(i=xl;i<=xr;i++)
		for(j=yt;j<=yb;j++)
			this.selectPoint(i,j);
};
mxG.G.prototype.getNextLabel=function(aLB)
{
	var bLB="";
	if(aLB.match(/^[A-Za-z]$/))
	{
		if(aLB=="Z") bLB="A";
		else if(aLB=="z") bLB="a";
		else bLB=String.fromCharCode(aLB.charCodeAt(0)+1);
	}
	return bLB;
};
mxG.G.prototype.checkEditMarkOrLabel=function(x,y,m)
{
	var v,k,km,kp,aLB,bLB="",MX=["MA","TR","SQ","CR","LB"];
	if(!this.inView(x,y)) return;
	v=this.xy2s(x,y);
	if(m=="LB")
	{
		aLB=this.getE("LabelTool").value;
		v+=":"+aLB;
	}
	for(kp=0;kp<5;kp++)
	{
		if(this.cN.P[MX[kp]])
		{
			km=this.cN.P[MX[kp]].length;
			for(k=0;k<km;k++)
				if(this.cN.P[MX[kp]][k].substring(0,2)==v.substring(0,2)) break;
			if((k==km)&&(MX[kp]==m))
			{
				if(m=="LB") bLB=this.getNextLabel(aLB);
				this.cN.P[m][km]=v;
			}
			else if(k<km)
			{
				if(MX[kp]=="LB") bLB=this.cN.P[MX[kp]][k].substring(3);
				this.cN.TakeOff(MX[kp],k);
			}
		}
		else if(MX[kp]==m)
		{
			if(m=="LB") bLB=this.getNextLabel(aLB);
			this.cN.P[m]=[v];
		}
	}
	if((m=="LB")&&bLB) this.getE("LabelTool").value=bLB;
	this.backNode(this.cN);
	this.updateAll();
};
mxG.G.prototype.doMouseMoveEdit=function(ev)
{
	if((this.editTool=="Select")&&(this.inSelect==1)&&!mxG.isAndroid)
	{
		if(ev.preventDefault) ev.preventDefault();
		var c=this.scr.getC(ev);
		this.selectGobanArea(c.x,c.y);
	}
};
mxG.G.prototype.doMouseDownEditSelect=function(x,y)
{
	if(this.inSelect==1)
	{
		if(mxG.isAndroid) this.selectGobanArea(x,y);
		this.inSelect=0;
	}
	else
	{
		this.inSelect=1;
		if(this.selection) this.unselectView();
		this.editXls=x;
		this.editYts=y;
		this.editXrs=x;
		this.editYbs=y;
		this.selectView();
	}
};
mxG.G.prototype.doMouseDownEdit=function(ev)
{
	if((this.editTool=="Select")&&!mxG.isAndroid)
	{
		var c=this.scr.getC(ev);
		this.doMouseDownEditSelect(c.x,c.y);
	}
};
mxG.G.prototype.doMouseUpEditSelect=function(x,y)
{
	if((x!=this.editXls)&&(y!=this.editYts)) this.inSelect=0;
};
mxG.G.prototype.doMouseUpEdit=function(ev)
{
	if((this.editTool=="Select")&&!mxG.isAndroid)
	{
		var c=this.scr.getC(ev);
		this.doMouseUpEditSelect(c.x,c.y);
	}
};
mxG.G.prototype.doMouseOutEdit=function(ev)
{
	if((this.editTool=="Select")&&!mxG.isAndroid)
	{
		this.inSelect=0;
	}
};
mxG.G.prototype.doKeydownSelect=function(x,y)
{
	if(this.inSelect==2) this.inSelect=0;
	else
	{
		this.inSelect=2;
		if(this.selection) this.unselectView();
		this.editXls=((x==1)?0:((x==this.DX)?this.DX+1:x));
		this.editYts=((y==1)?0:((y==this.DY)?this.DY+1:y));
		this.editXrs=((x==(this.DX+1))?this.DX:((x==0)?1:x));
		this.editYbs=((y==(this.DY+1))?this.DY:((y==0)?1:y));
		this.selectView();
	}
};
mxG.G.prototype.checkEdit=function(x,y)
{
	switch(this.editTool)
	{
		case "Play": this.checkEditPlay(x,y);break;
		case "Setup":
		case "SetupBlack":
		case "SetupWhite": this.checkEditSetup(x,y,this.editTool);break;
		case "Mark": this.checkEditMarkOrLabel(x,y,"MA");break;
		case "Triangle": this.checkEditMarkOrLabel(x,y,"TR");break;
		case "Circle": this.checkEditMarkOrLabel(x,y,"CR");break;
		case "Square": this.checkEditMarkOrLabel(x,y,"SQ");break;
		case "Label": this.checkEditMarkOrLabel(x,y,"LB");break;
		case "Select": if(mxG.isAndroid) this.doMouseDownEditSelect(x,y);break;
	}
};
mxG.G.prototype.doClickEdit=function(ev)
{
	var c;
	if(this.isGobanDisabled()) return;
	if(this.canPlaceEdit)
	{
		c=this.scr.getC(ev);
		this.checkEdit(c.x,c.y);
	}
};
mxG.G.prototype.doKeydownGobanForEdit=function(ev)
{
	var c;
	if(this.gBox&&(this[this.gBox+"Parent"]=="Goban")) return;
	if(this.canPlaceEdit&&this.gobanFocusVisible)
	{
		c=mxG.getKCode(ev);
		if((c==13)||(c==32))
		{
			if(this.editTool=="Select") this.doKeydownSelect(this.xFocus,this.yFocus);
			else this.checkEdit(this.xFocus,this.yFocus);
			ev.preventDefault();
		}
	}
};
mxG.G.prototype.drawSvgTool=function(tool)
{
	var e=this.getE(tool+"Tool"),nat,txt,o;
	o={in3dOn:this.in3dOn,stoneShadowOn:this.stoneShadowOn};
	switch(tool)
	{
		case "Select":
			e.innerHTML=this.scr.makeSelectTool();
			break;
		case "View":
			e.innerHTML=this.scr.makeViewTool();
			break;
		case "Play":
			nat=this.editNextNat;
			if(this.hasEditTool("Setup")) s=this.scr.makeAloneStone(nat,"",o);
			else s=this.scr.makeAloneBiStone(nat,o);
			e.innerHTML=s;
			break;
		case "Setup":
			nat=this.editAX;
			e.innerHTML=this.scr.makeAloneBiStone(nat,o);
			break;
		case "SetupBlack":
			e.innerHTML=this.scr.makeAloneStone("B","",o);
			break;
		case "SetupWhite":
			e.innerHTML=this.scr.makeAloneStone("W","",o);
			break;
		case "Cut":
		case "Copy":
		case "Paste":
			e.innerHTML=this.scr.makeFromPath(this[tool.toLowerCase()+"SvgPath"]);
			break;
		case "Circle":
		case "Mark":
		case "Square":
		case "Triangle":
			e.innerHTML=this.scr.makeAloneMark(tool);
			break;
		case "Numbering":
			e.innerHTML=this.scr.makeAloneStone("W",5,o);break;
		case "ShowInfo":
			e.innerHTML=this.scr.makeAloneToolText(this.local("H"));break;
		case "AsInBook":
			e.innerHTML=this.scr.makeAloneToolText(this.local("K"));break;
		case "Indices":
			e.innerHTML=this.scr.makeAloneToolText(this.local("I"));break;
		case "Variation":
			e.innerHTML=this.scr.makeAloneToolText(this.local("V"));break;
		case "Style":
			e.innerHTML=this.scr.makeAloneToolText(this.local("S"));break;
		case "GB":
			e.innerHTML=this.scr.makeAloneToolText(this.local("●+"));break;
		case "GW":
			e.innerHTML=this.scr.makeAloneToolText(this.local("○+"));break;
		case "DM":
			e.innerHTML=this.scr.makeAloneToolText(this.local("="));break;
		case "UC":
			e.innerHTML=this.scr.makeAloneToolText(this.local("~"));break;
		case "TE":
			e.innerHTML=this.scr.makeAloneToolText(this.local("!"));break;
		case "BM":
			e.innerHTML=this.scr.makeAloneToolText(this.local("?"));break;
		case "DO":
			e.innerHTML=this.scr.makeAloneToolText(this.local("?!"));break;
		case "IT":
			e.innerHTML=this.scr.makeAloneToolText(this.local("!?"));break;
		case "PL":
			e.innerHTML=this.scr.makeAloneToolText(this.local("T"));break;
		case "R":
			e.innerHTML=this.scr.makeAloneToolText(this.local("↺"));break;
		case "VM":
			e.innerHTML=this.scr.makeAloneToolText(this.local("↕"));break;
		case "HM":
			e.innerHTML=this.scr.makeAloneToolText(this.local("↔"));break;
	}
};
mxG.G.prototype.drawEditTools=function()
{
	var k,km=this.tools.length,tool;
	for(k=0;k<km;k++)
	{
		tool=this.tools[k];
		if(tool&&(tool!="Label")) this.drawSvgTool(tool);
	}
	this.hasToSetEditTools=0;
};
mxG.G.prototype.selectDouble=function(tool)
{
	if(this.cN.P&&this.cN.P[tool])
	{
		if((this.cN.P[tool][0]+"")=="2") this.superSelectTool(tool);
		else this.selectTool(tool);
	}
	else this.unselectTool(tool);
};
mxG.G.prototype.selectSingle=function(tool)
{
	if(this.cN.P&&this.cN.P[tool]) this.selectTool(tool);else this.unselectTool(tool);
};
mxG.G.prototype.getCommentWhenEdit=function()
{
	if(this.hasC("Score")&&this.scoreInComment&&this.canPlaceScore)
		return this.buildScore();
	return this.cN.P.C?this.cN.P.C[0]:"";
};
mxG.G.prototype.getInitialMark=function(a)
{
	return a.match(/^([a-z])$/)?"a":"A";
};
mxG.G.prototype.updateEdit=function()
{
	if(this.gBox)
	{
		this.disableTools();
		if((this.gBox=="Numbering")||(this.gBox=="ShowInfo"))
			this.enableTool(this.gBox);
	}
	else if(this.hasC("Score")&&this.canPlaceScore) this.disableTools();
	else this.enableTools();
	this.editNextNat=this.getNextEditNat();
	if(this.hasToSetEditTools) this.drawEditTools();
	else this.drawSvgTool("Play");
	if(this.pN!=this.cN)
	{
		this.getE("LabelTool").value=this.getInitialMark(this.getE("LabelTool").value);
		this.changeSelectedTool("Play");
		this.pN=this.cN;
	}
	if(this.indicesOn) this.selectTool("Indices");else this.unselectTool("Indices");
	if(this.styleMode&2) this.unselectTool("Variation");else this.selectTool("Variation");
	if(this.styleMode&1) this.unselectTool("Style");else this.selectTool("Style");
	if(this.asInBookOn) this.selectTool("AsInBook");else this.unselectTool("AsInBook");
	if(this.extraEditToolsOn)
	{
		this.selectDouble("GB");
		this.selectDouble("GW");
		this.selectDouble("DM");
		this.selectDouble("UC");
		this.selectDouble("TE");
		this.selectDouble("BM");
		this.selectSingle("DO");
		this.selectSingle("IT");
		this.selectSingle("PL");
	}
	if(this.hasEditTool("Comment"))
		this.getE("CommentToolText").value=this.getCommentWhenEdit();
};
mxG.G.prototype.doKeydownLabel=function(ev)
{
	if(mxG.getKCode(ev)==13) this.changeSelectedTool("Label");
};
mxG.G.prototype.getToolLabel=function(tool)
{
	switch(tool)
	{
		case "Select":return "Selection";
		case "View":return "Full/partial view";
		case "Play":return "Place a move";
		case "Setup":return "Add/remove a stone";
		case "SetupBlack":return "Add/remove a black stone";
		case "SetupWhite":return "Add/remove a white stone";
		case "Cut":return "Cut branch";
		case "Copy":return "Copy branch";
		case "Paste":return "Paste branch";
		case "Numbering":return "Numbering";
		case "ShowInfo":return "Header";
		case "Label":return "Label";
		case "Mark":return "Mark";
		case "Circle":return "Circle";
		case "Square":return "Square";
		case "Triangle":return "Triangle";
		case "AsInBook":return "As in book";
		case "Indices":return "Indices";
		case "Variation":return "Variation marks";
		case "Style":return "Variation style";
		case "GB":return "Good for Black";
		case "GW":return "Good for White";
		case "DM":return "Even";
		case "UC":return "Unclear";
		case "TE":return "Good move";
		case "BM":return "Bad move";
		case "DO":return "Doubtful move";
		case "IT":return "Interesting move";
		case "PL":return "Turn in Sgf";
		case "R" :return "Rotate";
		case "VM":return "Vertical mirror";
		case "HM":return "Horizontal mirror";
	}
	return "";
};
mxG.G.prototype.makeTool=function(tool)
{
	var s,id;
	s=" title=\""+this.local(this.getToolLabel(tool))+"\"";
	id=this.n+tool+"Tool";
	s+=" class=\"mxUnselectedEditTool\"";
	s+=" id=\""+id+"\"";
	if(tool=="Label") s="<input"+s+" type=\"text\" value=\"A\">";
	else s="<button"+s+"></button>";
	return s;
};
mxG.G.prototype.buildEditBtns=function()
{
	// for "Menu" component if any
	var s="";
	s+=this.buildBtn({n:"Cut",v:this.local("Cut")});
	s+=this.buildBtn({n:"Copy",v:this.local("Copy")});
	s+=this.buildBtn({n:"Paste",v:this.local("Paste")});
	s+=this.buildBtn({n:"RemoveComments",v:this.local("Remove comments")});
	return s;
};
mxG.G.prototype.initEditTools=function()
{
	var k,km=this.tools.length,tool,e;
	for(k=0;k<km;k++)
	{
		tool=this.tools[k];
		e=this.getE(tool+"Tool");
		if(tool)
		{
			let z=this.k,t=tool;
			e.addEventListener("click",function(){mxG.D[z].doEditTool(t);},false);
			if(tool=="Label")
			{
				e.addEventListener("keydown",function(ev){
					mxG.D[z].doKeydownLabel(ev);},false);
			}
		}
	}
};
mxG.G.prototype.initEdit=function()
{
	var k=this.k;
	if(this.editXls===undefined) this.editXls=this.xl;
	if(this.editYts===undefined) this.editYts=this.yt;
	if(this.editXrs===undefined) this.editXrs=this.xr;
	if(this.editYbs===undefined) this.editYbs=this.yb;
	this.editAX="AB";
	this.editNextNat="B";
	this.initEditTools();
	this.drawEditTools();
	if(!this.editTool) this.changeSelectedTool("Play");
	this.pN=this.cN; // pN: previous node
	this.ig.getMClick=mxG.getMClick;
	this.ig.addEventListener("click",function(ev){mxG.D[k].doClickEdit(ev);},false);
	this.ig.addEventListener("mousemove",function(ev){mxG.D[k].doMouseMoveEdit(ev);},false);
	this.ig.addEventListener("mouseup",function(ev){mxG.D[k].doMouseUpEdit(ev);},false);
	this.ig.addEventListener("mousedown",function(ev){mxG.D[k].doMouseDownEdit(ev);},false);
	this.ig.addEventListener("mouseout",function(ev){mxG.D[k].doMouseOutEdit(ev);},false);
	if(this.canGobanFocus)
		this.ig.addEventListener("keydown",
			function(ev){mxG.D[k].doKeydownGobanForEdit(ev);},false);
	if(this.hasEditTool("Comment"))
	{
		this.getE("CommentToolDiv").addEventListener("click",function(){mxG.D[k].doEditCommentTool();},false);
		this.getE("CommentToolText").addEventListener("change",function(){mxG.D[k].doEditCommentTool();},false);
		this.getE("CommentToolText").value="";
	}
};
mxG.G.prototype.hasEditTool=function(tool)
{
	if(tool=="Comment") return this.editCommentToolOn;
	return this.tools.indexOf(tool)>=0;
};
mxG.G.prototype.createEdit=function()
{
	var s="",k=0,km,m,mm;
	if(this.editCommentToolOn===undefined) this.editCommentToolOn=1;
	if(this.tools===undefined)
		this.tools=[
			"Select","View","Play","Setup","Cut","Copy","Paste",
			"Numbering","ShowInfo","Label","Mark","Circle","Square","Triangle",
			"AsInBook","Indices","Variation","Style",
			"GB","GW","DM","UC","TE","BM","DO","IT","PL","R","VM","HM"];
	this.canPlaceEdit=1;
	this.extraEditToolsOn=1;
	this.et=1; // padding arround canvas tool
	this.zN=null; // cut/copy/paste buffer
	this.cutSvgPath="M167,252C149,252 132,255 117,265 7,333 73,500 226,458 280,443 343,472 367,490 407,521 408,522 367,554 344,571 268,594 234,586 170,571 114,590 86,628 48,679 61,748 104,778 145,806 210,809 245,772 273,740 284,710 281,674 276,619 274,615 370,593 464,570 485,574 669,644 800,694 883,714 920,705 949,698 974,684 974,676 974,667 891,632 792,597 692,562 611,528 611,521 611,513 687,480 782,448 971,381 1002,358 920,338 883,328 801,349 661,402 549,444 447,472 434,464 421,456 375,445 334,437 280,425 266,416 272,369 275,335 263,299 235,275 216,258 189,252 167,252ZM169,286C179,286 190,288 200,293 225,305 241,333 239,360 238,388 219,414 192,423 166,433 136,425 117,405 98,386 92,354 103,329 114,303 141,285 169,286ZM170,623C208,623 240,654 240,693 240,731 208,763 170,763 131,763 100,731 100,693 100,654 131,623 170,623 Z";
	this.copySvgPath="M448,640V405H661 874V640 875H661 448ZM810,747C810,734 746,725 661,725 576,725 512,734 512,747 512,759 576,768 661,768 746,768 810,759 810,747ZM810,640C810,628 746,619 661,619 576,619 512,628 512,640 512,652 576,661 661,661 746,661 810,652 810,640ZM810,533C810,521 746,512 661,512 576,512 512,521 512,533 512,545 576,555 661,555 746,555 810,545 810,533ZM149,384V149H362 576V256 363H490 405V491 619H277 149ZM384,491C384,479 345,469 298,469 251,469 213,479 213,491 213,502 251,512 298,512 345,512 384,502 384,491ZM384,384C384,372 345,363 298,363 251,363 213,372 213,384 213,396 251,405 298,405 345,405 384,396 384,384ZM512,277C512,265 448,256 362,256 277,256 213,265 213,277 213,289 277,299 362,299 448,299 512,289 512,277 Z";
	this.pasteSvgPath="M448,661V426H661 875V661 896H661 448ZM811,768C811,755 747,746 661,746 576,746 512,755 512,768 512,780 576,789 661,789 747,789 811,780 811,768ZM811,661C811,649 747,640 661,640 576,640 512,649 512,661 512,673 576,682 661,682 747,682 811,673 811,661ZM811,554C811,542 747,533 661,533 576,533 512,542 512,554 512,566 576,576 661,576 747,576 811,566 811,554ZM149,512C149,256 168,170 201,275 217,323 273,340 416,340 559,340 615,323 630,275 651,208 683,229 683,309V384H544 405V586 789H277 149ZM234,234C234,181 243,170 286,170 324,170 340,157 345,122 350,85 365,74 416,74 466,74 481,85 486,122 491,157 508,170 545,170 589,170 597,181 597,234V298H416 234 Z";
	this.inSelect=0;
	this.selection=0;
	this.editTool=0;
	s+="<div tabindex=\"-1\"";
	s+=" class=\"mxEditToolBarDiv\" id=\""+this.n+"EditToolBarDiv\">";
	km=this.tools.length;
	for(k=0;k<km;k++) s+=this.makeTool(this.tools[k]);
	s+="</div>";
	if(this.editCommentToolOn)
	{
		s+="<div class=\"mxEditCommentToolDiv\" id=\""+this.n+"CommentToolDiv\">";
		s+="<textarea title=\""+this.local("Comment")+"\" id=\""+this.n+"CommentToolText\"></textarea>";
		s+="</div>";
	}
	return s;
};
}