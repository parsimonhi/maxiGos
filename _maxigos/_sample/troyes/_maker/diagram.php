<?php
header("content-type:application/x-javascript;charset=UTF-8");
include_once "../../_php/lib.php";
$theme="Troyes";
$config="Diagram";
echo copyright($theme,$config);
include "../../../_js/mgos_lib.js";
include "../../../_js/mgos_prs.js";
include "../../../_js/mgos_rls.js";
include "../../../_js/mgos_scr.js";
include "../../../_js/mgos.js";
include "../../../_js/mgosGoban.js";
include "../../../_js/mgosNotSeen.js";
?>
mxG.K++;
mxG.B=["Goban","NotSeen"];
mxG.D[mxG.K]=new mxG.G(mxG.K,mxG.B);
mxG.D[mxG.K].theme="<?=$theme?>";
mxG.D[mxG.K].config="<?=$config?>";
<?php
include "../../_php/insertCss.php";
?>
// general
mxG.D[mxG.K].a.in3dOn=1; // (0,1) default 0
mxG.D[mxG.K].a.initMethod="last"; // ("first","loop","last") default "first"
// Goban
mxG.D[mxG.K].a.stoneShadowOn=1; // (0,1) default 0 (require in3dOn=1)
mxG.D[mxG.K].a.gridPadding=2; // (float) default 0
mxG.D[mxG.K].a.gobanMargin=2; // (float) default 0
mxG.D[mxG.K].a.indicesOn=1; // (0,1,null), default null
mxG.D[mxG.K].a.numberingOn=1; // (0,1,2,null) default null
mxG.D[mxG.K].a.asInBookOn=1; // (0,1,null) default null
mxG.D[mxG.K].a.marksAndLabelsOn=1; // (0,1) default 0
mxG.D[mxG.K].a.markOnLastOn=1; // (0,1) default 0
mxG.D[mxG.K].a.eraseGridUnder=1; // (0,1) default 0
mxG.D[mxG.K].a.territoryMark="MA"; // (string) default "MS"
// start
mxG.D[mxG.K].start();
