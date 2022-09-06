<?php
header("content-type:application/x-javascript;charset=UTF-8");
include_once "../../_php/lib.php";
$theme="Fm";
$config="Game";
echo copyright($theme,$config);
include "../../../_js/mgos_lib.js";
include "../../../_js/mgos_prs.js";
include "../../../_js/mgos_rls.js";
include "../../../_js/mgos_scr.js";
include "../../../_js/mgos.js";
include "../../../_js/mgosGoban.js";
include "../../../_js/mgosNavigation.js";
include "../../../_js/mgosLoop.js";
include "../../../_js/mgosVariation.js";
include "../../../_js/mgosTitle.js";
include "../../../_js/mgosHeader.js";
include "../../../_js/mgosOption.js";
include "../../../_js/mgosSpeed.js";
include "../../../_js/mgosImage.js";
include "../../../_js/mgosPass.js";
include "../../../_js/mgosSgf.js";
include "../../../_js/mgosGuess.js";
include "../../../_js/mgosVersion.js";
?>
mxG.K++;
mxG.B=[[["Goban"],"Navigation","Loop","Variation"],["Title","Header","Option","Speed",["Image","Pass","Sgf"],"Guess","Version"]];
mxG.D[mxG.K]=new mxG.G(mxG.K,mxG.B);
mxG.D[mxG.K].theme="<?php echo $theme ?>";
mxG.D[mxG.K].config="<?php echo $config ?>";
<?php
include "../../_php/insertCss.php";
?>
// general
mxG.D[mxG.K].a.in3dOn=1; // (0,1) default 1
mxG.D[mxG.K].a.htmlParenthesis=1; // (0,1) default 0
mxG.D[mxG.K].a.allowStringAsSource=1; // (0,1) default 1
mxG.D[mxG.K].a.allowFileAsSource=1; // (0,1) default 1
// mxG.D[mxG.K].a.sourceFilter=""; // (str) default ""
mxG.D[mxG.K].a.initMethod="last"; // ("first","loop","last") default "first"
// Goban
mxG.D[mxG.K].a.pointsNumMax=0; // (positive integer) default 0
mxG.D[mxG.K].a.stoneShadowOn=0; // (0,1) default 0 (require in3dOn=1)
mxG.D[mxG.K].a.stretching="0,0,1,1"; // (list) default "0,0,1,1"
mxG.D[mxG.K].a.gridPadding=0; // (float) default 0
mxG.D[mxG.K].a.gridMargin=0; // (float) default 0
mxG.D[mxG.K].a.gobanPadding=0; // (float) default 0
mxG.D[mxG.K].a.gobanMargin=2; // (float) default 0
mxG.D[mxG.K].a.indicesOn=0; // (0,1,null), default null
mxG.D[mxG.K].a.numberingOn=0; // (0,1,2,null) default null
mxG.D[mxG.K].a.asInBookOn=0; // (0,1,null) default null
mxG.D[mxG.K].a.marksAndLabelsOn=0; // (0,1) default 0
mxG.D[mxG.K].a.markOnLastOn=0; // (0,1) default 0
mxG.D[mxG.K].a.numAsMarkOnLastOn=0; // (0,1) default 0 (require markOnLastOn=1)
mxG.D[mxG.K].a.japaneseIndicesOn=0; // (0,1) default 0 (require indicesOn=1)
mxG.D[mxG.K].a.oldJapaneseIndicesOn=0; // (0,1) default 0 (require indicesOn=1)
mxG.D[mxG.K].a.eraseGridUnder=1; // (0,1) default 0
// Guess
mxG.D[mxG.K].a.guessBoxOn=1; // (0,1) default 0
mxG.D[mxG.K].a.canPlaceGuess=1; // (0,1) default 0
// Header
mxG.D[mxG.K].a.headerBoxOn=1; // (0,1) default 0
mxG.D[mxG.K].a.headerBtnOn=0; // (0,1) default 0
mxG.D[mxG.K].a.hideTitle=1; // (0,1) default 0
mxG.D[mxG.K].a.hideNumOfMoves=1; // (0,1) default 0
mxG.D[mxG.K].a.concatDateToTitle=1; // (0,1) default 0
mxG.D[mxG.K].a.concatTeamToPlayer=1; // (0,1) default 0
mxG.D[mxG.K].a.concatKomiToResult=1; // (0,1) default 0
mxG.D[mxG.K].a.concatHandicapToResult=1; // (0,1) default 0
mxG.D[mxG.K].a.concatNumOfMovesToResult=0; // (0,1) default 0
// Image
mxG.D[mxG.K].a.svgBtnOn=1; // (0,1) default 0
// Loop
mxG.D[mxG.K].a.loopTime=1000; // (positive integer) default 1000
// Navigation
mxG.D[mxG.K].a.navigations="First,TenPred,Pred,Loop,Next,TenNext,Last"; // (list) default "First,TenPred,Pred,Next,TenNext,Last"
// Option
mxG.D[mxG.K].a.optionBoxOn=1; // (0,1,null) default 0
mxG.D[mxG.K].a.optionBtnOn=0; // (0,1) default 0
mxG.D[mxG.K].a.hideCanScore=1; // (0,1) default 0
mxG.D[mxG.K].a.hideMarkOnlastOn=0; // (0,1) default 0
mxG.D[mxG.K].a.hideNumberingOn=0; // (0,1) default 0
mxG.D[mxG.K].a.hideMarksAndLabelsOn=0; // (0,1) default 0
mxG.D[mxG.K].a.hideAsInBookOn=0; // (0,1) default 0
mxG.D[mxG.K].a.hideIndicesOn=0; // (0,1) default 0
mxG.D[mxG.K].a.hideVariationMarksOn=0; // (0,1) default 0
mxG.D[mxG.K].a.hideSiblingsOn=1; // (0,1) default 0
mxG.D[mxG.K].a.hideIn3dOn=0; // (0,1) default 0
mxG.D[mxG.K].a.hideCanVariation=0; // (0,1) default 0
mxG.D[mxG.K].a.hideCanGuess=0; // (0,1) default 0
mxG.D[mxG.K].a.hideLoopTime=1; // (0,1) default 0
mxG.D[mxG.K].a.hideAnimatedStoneOn=1; // (0,1) default 0
mxG.D[mxG.K].a.hideAnimatedStoneTime=1; // (0,1) default 0
// Pass
mxG.D[mxG.K].a.passBtnOn=1; // (0,1) default 0
// Sgf
mxG.D[mxG.K].a.sgfBtnOn=1; // (0,1) default 0
// Title
mxG.D[mxG.K].a.titleBoxOn=1; // (0,1,null) default 0
mxG.D[mxG.K].a.translateTitleOn=1; // (0,1) default 0
// Variation
mxG.D[mxG.K].a.variationMarksOn=0; // (0,1,null) default 0
mxG.D[mxG.K].a.siblingsOn=0; // (0,1,null) default 0
mxG.D[mxG.K].a.hideSingleVariationMarkOn=1; // (0,1) default 0
mxG.D[mxG.K].a.variationBoxOn=0; // (0,1) default 0
mxG.D[mxG.K].a.canPlaceVariation=0; // (0,1) default 0
// Version
mxG.D[mxG.K].a.versionBoxOn=1; // (0,1) default 0
mxG.D[mxG.K].start();
