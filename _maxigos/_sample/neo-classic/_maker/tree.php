<?php
header("content-type:application/x-javascript;charset=UTF-8");
include_once "../../_php/lib.php";
$theme="NeoClassic";
$config="Tree";
echo copyright($theme,$config);
include "../../../_js/mgos_lib.js";
include "../../../_js/mgos_prs.js";
include "../../../_js/mgos_rls.js";
include "../../../_js/mgos_scr.js";
include "../../../_js/mgos.js";
include "../../../_js/mgosAbout.js";
include "../../../_js/mgosOptions.js";
include "../../../_js/mgosGoban.js";
include "../../../_js/mgosNavigation.js";
include "../../../_js/mgosVariation.js";
include "../../../_js/mgosGoto.js";
include "../../../_js/mgosComment.js";
include "../../../_js/mgosHeader.js";
include "../../../_js/mgosTree.js";
include "../../../_js/mgosVersion.js";
?>
mxG.K++;
mxG.B=[["About","Options"],"Goban","Navigation","Variation","Goto","Comment","Header","Tree","Version"];
mxG.D[mxG.K]=new mxG.G(mxG.K,mxG.B);
mxG.D[mxG.K].theme="<?=$theme?>";
mxG.D[mxG.K].config="<?=$config?>";
<?php
include "../../_php/insertCss.php";
?>
// general
mxG.D[mxG.K].a.in3dOn=1; // (0,1) default 0
// Goban
mxG.D[mxG.K].a.pointsNumMax=19; // (positive integer) default 0
mxG.D[mxG.K].a.stretching="0,1,1,2"; // (list) default "0,0,1,1"
mxG.D[mxG.K].a.gridPadding=2; // (float) default 0
mxG.D[mxG.K].a.gobanMargin=2; // (float) default 0
mxG.D[mxG.K].a.indicesOn=1; // (0,1,null), default null
mxG.D[mxG.K].a.numberingOn=0; // (0,1,2,null) default null
mxG.D[mxG.K].a.asInBookOn=0; // (0,1,null) default null
mxG.D[mxG.K].a.marksAndLabelsOn=1; // (0,1) default 0
mxG.D[mxG.K].a.markOnLastOn=1; // (0,1) default 0
mxG.D[mxG.K].a.eraseGridUnder=1; // (0,1) default 0
// About
mxG.D[mxG.K].a.aboutBtnOn=1; // (0,1) default 0
// Comment
mxG.D[mxG.K].a.headerInComment=1; // (0,1) default 0
mxG.D[mxG.K].a.canCommentFocus=1; // (0,1) default 0
// Header
mxG.D[mxG.K].a.hideInHeader="NumOfMoves"; // (set) default ""
// Navigation
mxG.D[mxG.K].a.navigations="First,TenPred,Pred,Goto,Next,TenNext,Last"; // (set) default "First,TenPred,Pred,Next,TenNext,Last"
// options
mxG.D[mxG.K].a.optionsBtnOn=1; // (0,1) default 0
// Tree
mxG.D[mxG.K].a.canTreeFocus=1; // (0,1) default 0
// Variation
mxG.D[mxG.K].a.variationMarksOn=1; // (0,1,null) default 0
mxG.D[mxG.K].a.hideSingleVariationMarkOn=1; // (0,1) default 0
mxG.D[mxG.K].a.canPlaceVariation=1; // (0,1) default 0
// Start
mxG.D[mxG.K].start();
