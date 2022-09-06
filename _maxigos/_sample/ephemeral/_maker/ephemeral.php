<?php
header("content-type:application/x-javascript;charset=UTF-8");
include "../../../_js/mgos_lib.js";
include "../../../_js/mgos_prs.js";
include "../../../_js/mgos_rls.js";
include "../../../_js/mgos_scr.js";
include "../../../_js/mgos.js";
include "../../../_js/mgosGoban.js";
include "../../../_js/mgosNavigation.js";
include "../../../_js/mgosVariation.js";
?>
mxG.K++;
mxG.B=["Goban","Navigation","Variation"];
mxG.D[mxG.K]=new mxG.G(mxG.K,mxG.B);
mxG.D[mxG.K].theme="Ephemeral";
mxG.D[mxG.K].config="Simple";
<?php
include "../../_php/insertCss.php";
?>
mxG.D[mxG.K].a.eraseGridUnder=1;
mxG.D[mxG.K].a.in3dOn=1;
mxG.D[mxG.K].a.hideSingleVariationMarkOn=1;
mxG.D[mxG.K].a.canPlaceVariation=1;
mxG.D[mxG.K].a.initMethod="3";
mxG.D[mxG.K].start();