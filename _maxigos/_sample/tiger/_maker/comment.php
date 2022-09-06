<?php
header("content-type:application/x-javascript;charset=UTF-8");
include_once "../../_php/lib.php";
$theme="Tiger";
$config="Comment";
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
include "../../../_js/mgosHeader.js";
include "../../../_js/mgosVersion.js";
include "../_js/tigerPatch.js";
?>
mxG.K++;
mxG.B=[[[["Goban"],"Navigation","Loop","Variation"],["TigerComment","Header"]],"Version"];
mxG.D[mxG.K]=new mxG.G(mxG.K,mxG.B);
mxG.D[mxG.K].theme="<?php echo $theme ?>";
mxG.D[mxG.K].config="<?php echo $config ?>";
<?php
include "../../_php/insertCss.php";
?>
// general
mxG.D[mxG.K].a.in3dOn=0; // (0,1) default 1
mxG.D[mxG.K].a.htmlParenthesis=1; // (0,1) default 0
mxG.D[mxG.K].a.allowStringAsSource=1; // (0,1) default 1
mxG.D[mxG.K].a.allowFileAsSource=1; // (0,1) default 1
// mxG.D[mxG.K].a.sourceFilter=""; // (str) default ""
mxG.D[mxG.K].a.initMethod="first"; // ("first","loop","last") default "first"
// Goban
mxG.D[mxG.K].a.pointsNumMax=19; // (positive integer) default 0
mxG.D[mxG.K].a.stoneShadowOn=0; // (0,1) default 0 (require in3dOn=1)
mxG.D[mxG.K].a.stretching="0,0,1,1"; // (list) default "0,0,1,1"
mxG.D[mxG.K].a.gridPadding=2; // (float) default 0
mxG.D[mxG.K].a.gridMargin=0; // (float) default 0
mxG.D[mxG.K].a.gobanPadding=0; // (float) default 0
mxG.D[mxG.K].a.gobanMargin=2; // (float) default 0
mxG.D[mxG.K].a.indicesOn=1; // (0,1,null), default null
mxG.D[mxG.K].a.numberingOn=0; // (0,1,2,null) default null
mxG.D[mxG.K].a.asInBookOn=0; // (0,1,null) default null
mxG.D[mxG.K].a.marksAndLabelsOn=1; // (0,1) default 0
mxG.D[mxG.K].a.markOnLastOn=1; // (0,1) default 0
mxG.D[mxG.K].a.numAsMarkOnLastOn=0; // (0,1) default 0 (require markOnLastOn=1)
mxG.D[mxG.K].a.japaneseIndicesOn=0; // (0,1) default 0 (require indicesOn=1)
mxG.D[mxG.K].a.oldJapaneseIndicesOn=0; // (0,1) default 0 (require indicesOn=1)
mxG.D[mxG.K].a.eraseGridUnder=1; // (0,1) default 0
// Comment
mxG.D[mxG.K].a.headerInComment=1; // (0,1) default 0
mxG.D[mxG.K].a.canCommentFocus=1; // (0,1) default 0
mxG.D[mxG.K].a.allInComment=1; // (0,1) default 0
// Header
mxG.D[mxG.K].a.headerBoxOn=0; // (0,1) default 0
mxG.D[mxG.K].a.headerBtnOn=0; // (0,1) default 0
mxG.D[mxG.K].a.hideNumOfMoves=1; // (0,1) default 0
// Loop
mxG.D[mxG.K].a.loopTime=1000; // (positive integer) default 1000
// Navigation
mxG.D[mxG.K].a.navigations="First,TenPred,Pred,Loop,Next,TenNext,Last"; // (list) default "First,TenPred,Pred,Next,TenNext,Last"
// Variation
mxG.D[mxG.K].a.variationMarksOn=1; // (0,1,null) default 0
mxG.D[mxG.K].a.siblingsOn=0; // (0,1,null) default 0
mxG.D[mxG.K].a.hideSingleVariationMarkOn=1; // (0,1) default 0
mxG.D[mxG.K].a.variationBoxOn=0; // (0,1) default 0
mxG.D[mxG.K].a.canPlaceVariation=1; // (0,1) default 0
mxG.D[mxG.K].start();
// Version
mxG.D[mxG.K].a.versionBoxOn=1; // (0,1) default 0

