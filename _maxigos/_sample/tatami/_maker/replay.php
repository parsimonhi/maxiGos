<?php
header("content-type:application/x-javascript;charset=UTF-8");
include_once "../../_php/lib.php";
$theme="Tatami";
$config="Replay";
echo copyright($theme,$config);
include "../../../_js/mgos_lib.js";
include "../../../_js/mgos_prs.js";
include "../../../_js/mgos_rls.js";
include "../../../_js/mgos_scr.js";
include "../../../_js/mgos.js";
include "../../../_js/mgosCartouche.js";
include "../../../_js/mgosGoban.js";
include "../../../_js/mgosAnimatedStone.js";
include "../../../_js/mgosNavigation.js";
include "../../../_js/mgosLoop.js";
include "../../../_js/mgosVariation.js";
include "../../../_js/mgosGoto.js";
include "../../../_js/mgosSpeed.js";
include "../../../_js/mgosOptions.js";
include "../../../_js/mgosHeader.js";
include "../../../_js/mgosRemove.js";
include "../../../_js/mgosPass.js";
include "../../../_js/mgosImage.js";
include "../../../_js/mgosGuess.js";
include "../../../_js/mgosVersion.js";
?>
mxG.K++;
mxG.B=[["WhiteCartouche","Goban","AnimatedStone","BlackCartouche"],
	   "Navigation",
	   "Loop",
	   "Variation",
	   "Guess",
	   "Goto",
	   "Speed",
	   ["Options","Header","Png","Svg","Remove","Pass"],
	   "Version"
	];
mxG.D[mxG.K]=new mxG.G(mxG.K,mxG.B);
mxG.D[mxG.K].theme="<?=$theme?>";
mxG.D[mxG.K].config="<?=$config?>";
<?php
include "../../_php/insertCss.php";
?>
// general
mxG.D[mxG.K].a.in3dOn=1; // (0,1) default 0
mxG.D[mxG.K].a.allowStringAsSource=1; // (0,1) default 1
mxG.D[mxG.K].a.allowFileAsSource=1; // (0,1) default 1
// mxG.D[mxG.K].a.sourceFilter=""; // (str) default ""
mxG.D[mxG.K].a.initMethod="last"; // ("first","loop","last") default "first"
// guessing variations is not very interesting in general
// so one chooses to ignore them
mxG.D[mxG.K].a.sgfLoadMainOnly=1; // (0,1) default 0
// Goban
mxG.D[mxG.K].a.stoneShadowOn=0; // (0,1) default 0 (require in3dOn=1)
mxG.D[mxG.K].a.specialStoneOn=0; // (0,1) default 0 (require in3dOn=1)
mxG.D[mxG.K].a.stretching="0,1,1,2"; // (list) default "0,0,1,1"
mxG.D[mxG.K].a.gridPadding=2; // (float) default 0
mxG.D[mxG.K].a.gridMargin=0; // (float) default 0
mxG.D[mxG.K].a.gobanPadding=0; // (float) default 0
mxG.D[mxG.K].a.gobanMargin=2; // (float) default 0
mxG.D[mxG.K].a.indicesOn=0; // (0,1,null), default null
mxG.D[mxG.K].a.numberingOn=0; // (0,1,2,null) default null
mxG.D[mxG.K].a.asInBookOn=0; // (0,1,null) default null
mxG.D[mxG.K].a.marksAndLabelsOn=0; // (0,1) default 0
mxG.D[mxG.K].a.markOnLastOn=1; // (0,1) default 0
mxG.D[mxG.K].a.numAsMarkOnLastOn=0; // (0,1) default 0 (require markOnLastOn=1)
mxG.D[mxG.K].a.japaneseIndicesOn=0; // (0,1) default 0 (require indicesOn=1)
mxG.D[mxG.K].a.oldJapaneseIndicesOn=0; // (0,1) default 0 (require indicesOn=1)
mxG.D[mxG.K].a.eraseGridUnder=1; // (0,1) default 0
// AnimatedStone
mxG.D[mxG.K].a.animatedStoneOn=1; // (0,1) default 0
// Cartouche
mxG.D[mxG.K].a.cartoucheBoxOn=1; // (0,1) default 0
mxG.D[mxG.K].a.bowlOn=1; // (0,1) default 0
// Goto
mxG.D[mxG.K].a.gotoBoxOn=1; // (0,1) default 0
// Guess
mxG.D[mxG.K].a.guessBoxOn=1; // (0,1) default 0
mxG.D[mxG.K].a.canPlaceGuess=1; // (0,1) default 0
// Header
mxG.D[mxG.K].a.headerBtnOn=1; // (0,1) default 0
mxG.D[mxG.K].a.concatInHeader="NumOfMovesToResult"; // (set) default ""
// Image
mxG.D[mxG.K].a.pngBtnOn=1; // (0,1) default 0
mxG.D[mxG.K].a.svgBtnOn=1; // (0,1) default 0
// Loop
mxG.D[mxG.K].a.loopTime=1000; // (positive integer) default 1000
// Navigation
mxG.D[mxG.K].a.navigations="First,TenPred,Pred,Loop,Next,TenNext,Last"; // (set) default "First,TenPred,Pred,Next,TenNext,Last"
// Options
mxG.D[mxG.K].a.optionsBtnOn=1; // (0,1) default 0
mxG.D[mxG.K].a.hideInOptions="In3dOn,IndicesOn,SiblingsOn"; // (set) default ""
// Remove
mxG.D[mxG.K].a.removeBtnOn=1; // (0,1) default 0
// Pass
mxG.D[mxG.K].a.passBtnOn=1; // (0,1) default 0
// Variation
mxG.D[mxG.K].a.variationMarksOn=1; // (0,1,null) default 0
mxG.D[mxG.K].a.siblingsOn=0; // (0,1,null) default 0
mxG.D[mxG.K].a.hideSingleVariationMarkOn=1; // (0,1) default 0
mxG.D[mxG.K].a.variationBoxOn=0; // (0,1) default 0
mxG.D[mxG.K].a.canPlaceVariation=0; // (0,1) default 0
// Version
mxG.D[mxG.K].a.versionBoxOn=1; // (0,1) default 0
mxG.D[mxG.K].start();
