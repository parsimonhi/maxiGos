<?php
header("content-type:application/x-javascript;charset=UTF-8");
include_once "../../_php/lib.php";
$theme="Minimalist";
$config="Edit";
echo copyright($theme,$config);
include "../../../_js/mgos_lib.js";
include "../../../_js/mgos_prs.js";
include "../../../_js/mgos_rls.js";
include "../../../_js/mgos_scr.js";
include "../../../_js/mgos.js";
include "../../../_js/mgosMenu.js";
include "../../../_js/mgosFile.js";
include "../../../_js/mgosView.js";
include "../../../_js/mgosGoban.js";
include "../../../_js/mgosNavigation.js";
include "../../../_js/mgosVariation.js";
include "../../../_js/mgosHelp.js";
include "../../../_js/mgosImage.js";
include "../../../_js/mgosPass.js";
include "../../../_js/mgosScore.js";
include "../../../_js/mgosSgf.js";
include "../../../_js/mgosEdit.js";
include "../../../_js/mgosInfo.js";
include "../../../_js/mgosTree.js";
include "../../../_js/mgosVersion.js";
?>
mxG.K++;
mxG.B=[["Menu","File","View","Goban","Navigation","Variation"],[["Help","Sgf","Image","Score","Pass"],"Edit","Info","Tree","Version"],"AfterView"];
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
mxG.D[mxG.K].a.indicesOn=null; // (0,1,null), default null
mxG.D[mxG.K].a.numberingOn=null; // (0,1,2,null) default 0
mxG.D[mxG.K].a.asInBookOn=null; // (0,1,null) default 0
mxG.D[mxG.K].a.marksAndLabelsOn=1; // (0,1) default 0
mxG.D[mxG.K].a.markOnLastOn=0; // (0,1) default 0
mxG.D[mxG.K].a.numAsMarkOnLastOn=0; // (0,1) default 0 (require markOnLastOn=1)
mxG.D[mxG.K].a.japaneseIndicesOn=0; // (0,1) default 0 (require indicesOn=1)
mxG.D[mxG.K].a.oldJapaneseIndicesOn=0; // (0,1) default 0 (require indicesOn=1)
mxG.D[mxG.K].a.eraseGridUnder=1; // (0,1) default 0
// Comment
mxG.D[mxG.K].a.headerInComment=1; // (0,1) default 0
mxG.D[mxG.K].a.canCommentFocus=1; // (0,1) default 0
// Edit
// File
// Header
mxG.D[mxG.K].a.headerBoxOn=0; // (0,1) default 0
mxG.D[mxG.K].a.headerBtnOn=0; // (0,1) default 0
mxG.D[mxG.K].a.hideNumOfMoves=1; // (0,1) default 0
mxG.D[mxG.K].a.helpBtnOn=1; // (0,1) default 0
// Image
mxG.D[mxG.K].a.pngBtnOn=1; // (0,1) default 0
mxG.D[mxG.K].a.svgBtnOn=1; // (0,1) default 0
// Info
mxG.D[mxG.K].a.infoBtnOn=0; // (0,1) default 0
// Menu
mxG.D[mxG.K].a.menus="File,Edit,View,Window"; // (string) default ""
// Pass
mxG.D[mxG.K].a.passBtnOn=1; // (0,1) default 0
// Score
mxG.D[mxG.K].a.scoreBtnOn=1; // (0,1) default 0
// Sgf
mxG.D[mxG.K].a.toCharset="UTF-8"; // (string) default UTF-8
mxG.D[mxG.K].a.sgfBtnOn=1; // (0,1) default 0
mxG.D[mxG.K].a.sgfAction="edit"; // (string) default "show"
// Tree
mxG.D[mxG.K].a.canTreeFocus=1; // (0,1) default 0
// Variation
mxG.D[mxG.K].a.variationMarksOn=0; // (0,1,null) default 0
mxG.D[mxG.K].a.siblingsOn=0; // (0,1,null) default 0
mxG.D[mxG.K].a.hideSingleVariationMarkOn=0; // (0,1) default 0
mxG.D[mxG.K].a.variationBoxOn=0; // (0,1) default 0
mxG.D[mxG.K].a.canPlaceVariation=0; // (0,1) default 0
// Version
mxG.D[mxG.K].a.versionBoxOn=1; // (0,1) default 0
mxG.D[mxG.K].start();
