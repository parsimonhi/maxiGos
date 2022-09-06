<?php
header("content-type:application/x-javascript;charset=UTF-8");
include_once "../../_php/lib.php";
$theme="WGo";
$config="Basic";
echo copyright($theme,$config);
include "../../../_js/mgos_lib.js";
include "../../../_js/mgos_prs.js";
include "../../../_js/mgos_rls.js";
include "../../../_js/mgos_scr.js";
include "../../../_js/mgos.js";
include "../../../_js/mgosHeader.js";
include "../../../_js/mgosNavigation.js";
include "../../../_js/mgosVariation.js";
include "../../../_js/mgosGoto.js";
include "../../../_js/mgosGoban.js";
include "../../../_js/mgosAbout.js";
?>
mxG.K++;
mxG.B=[["Header","Navigation","Goto","About"],"Goban","Variation"];
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
mxG.D[mxG.K].a.pointsNumMax=19; // (positive integer) default 0
mxG.D[mxG.K].a.stoneShadowOn=1; // (0,1) default 0 (require in3dOn=1)
mxG.D[mxG.K].a.specialStoneOn=1; // (0,1) default 0 (require in3dOn=1)
mxG.D[mxG.K].a.stretching="0,0,1,1"; // (list) default "0,0,1,1"
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
// About
mxG.D[mxG.K].a.aboutBtnOn=1; // (0,1) default 0
mxG.D[mxG.K].a.aboutAlias="_"; // (string) default null
mxG.D[mxG.K].a.aboutThemeAlias="Theme_WGo"; // (string) default null
mxG.en("Theme_WGo","WGo (<a href=\"http://wgo.waltheri.net/\">WGo.js</a> copyright Jan Prokop)"); 
// Goto
mxG.D[mxG.K].a.gotoBoxOn=0; // (0,1) default 0
mxG.D[mxG.K].a.gotoInputOn=1; // (0,1) default 0
mxG.D[mxG.K].a.gotoInputBefore="Next"; // (string) default ""
// Header
mxG.D[mxG.K].a.headerBoxOn=0; // (0,1) default 0
mxG.D[mxG.K].a.headerBtnOn=1; // (0,1) default 0
mxG.D[mxG.K].a.hidePlace=1; // (0,1) default 0
mxG.D[mxG.K].a.hideRules=1; // (0,1) default 0
mxG.D[mxG.K].a.hideTimeLimits=1; // (0,1) default 0
mxG.D[mxG.K].a.hideNumOfMoves=1; // (0,1) default 0
mxG.D[mxG.K].a.headerAlias="_"; // (string) default null
// Navigation
mxG.D[mxG.K].a.navigations="First,TenPred,Pred,Next,TenNext,Last"; // (list) default "First,TenPred,Pred,Next,TenNext,Last"
// Variation
mxG.D[mxG.K].a.variationMarksOn=1; // (0,1,null) default 0
mxG.D[mxG.K].a.siblingsOn=0; // (0,1,null) default 0
mxG.D[mxG.K].a.hideSingleVariationMarkOn=1; // (0,1) default 0
mxG.D[mxG.K].a.variationBoxOn=0; // (0,1) default 0
mxG.D[mxG.K].a.canPlaceVariation=1; // (0,1) default 0
mxG.D[mxG.K].start();