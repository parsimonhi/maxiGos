<?php
header("content-type:application/x-javascript;charset=UTF-8");
include_once "../../_php/lib.php";
$theme="Minimalist";
$config="Score";
echo copyright($theme,$config);
include "../../../_js/mgos_lib.js";
include "../../../_js/mgos_prs.js";
include "../../../_js/mgos_rls.js";
include "../../../_js/mgos_scr.js";
include "../../../_js/mgos.js";
include "../../../_js/mgosGoban.js";
include "../../../_js/mgosNavigation.js";
include "../../../_js/mgosVariation.js";
include "../../../_js/mgosOptions.js";
include "../../../_js/mgosRemove.js";
include "../../../_js/mgosImage.js";
include "../../../_js/mgosSgf.js";
include "../../../_js/mgosScore.js";
include "../../../_js/mgosComment.js";
include "../../../_js/mgosVersion.js";
?>
mxG.K++;
mxG.B=["Goban","Navigation","Variation",["Options","Sgf","Score","Remove","Png","Svg"],"Comment","Version"];
mxG.D[mxG.K]=new mxG.G(mxG.K,mxG.B);
mxG.D[mxG.K].theme="<?=$theme?>";
mxG.D[mxG.K].config="<?=$config?>";
<?php
include "../../_php/insertCss.php";
?>
// general
mxG.D[mxG.K].a.in3dOn=0; // (0,1) default 0
mxG.D[mxG.K].a.allowStringAsSource=1; // (0,1) default 1
mxG.D[mxG.K].a.allowFileAsSource=1; // (0,1) default 1
// mxG.D[mxG.K].a.sourceFilter=""; // (str) default ""
mxG.D[mxG.K].a.initMethod="last"; // ("first","loop","last") default "first"
// Goban
mxG.D[mxG.K].a.stoneShadowOn=0; // (0,1) default 0 (require in3dOn=1)
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
// Image
mxG.D[mxG.K].a.pngBtnOn=1; // (0,1) default 0
mxG.D[mxG.K].a.svgBtnOn=1; // (0,1) default 0
// Options
mxG.D[mxG.K].a.optionsBtnOn=1; // (0,1) default 0
mxG.D[mxG.K].a.hideInOptions="In3dOn,IndicesOn,MarkOnLastOn,NumberingOn,MarksAndLabelsOn,AsInBookOn,VariationMarksOn,SiblingsOn"; // (set) default ""
// Remove
mxG.D[mxG.K].a.removeBtnOn=1; // (0,1) default 0
// Score
mxG.D[mxG.K].a.ephemeralScore=1; // (0,1) default 0
mxG.D[mxG.K].a.scoreBtnOn=1; // (0,1) default 0
mxG.D[mxG.K].a.scoreDefaultRules="AGA"; // (string) default null
mxG.D[mxG.K].a.scoreInComment=1; // (0,1) default 0
mxG.D[mxG.K].a.scoreMethod="trivial"; // (string) default "trivial"
// Sgf
mxG.D[mxG.K].a.toCharset="UTF-8"; // (string) default UTF-8
mxG.D[mxG.K].a.sgfBtnOn=1; // (0,1) default 0
mxG.D[mxG.K].a.sgfAction="edit"; // (string) default "show"
// Variation
mxG.D[mxG.K].a.variationMarksOn=1; // (0,1,null) default 0
mxG.D[mxG.K].a.siblingsOn=0; // (0,1,null) default 0
mxG.D[mxG.K].a.hideSingleVariationMarkOn=1; // (0,1) default 0
mxG.D[mxG.K].a.variationBoxOn=0; // (0,1) default 0
mxG.D[mxG.K].a.canPlaceVariation=1; // (0,1) default 0
mxG.D[mxG.K].start();
