<?php
// maxiGos v7 > download/file.php

function doError($n="") {print "Error: ".$n." !";}

$file=NULL;
$data=NULL;
$l=isset($_GET["l"])?"-".$_GET["l"]:"";
if (!preg_match("#^[a-zA-Z0-9_-]*$#",$l)) $l="";
if (isset($_GET["id"]))
{
	if ($_GET["id"]==111) $file="../../_sgf/game/blood-vomit-en.sgf";
	else if ($_GET["id"]==112) $file="../../_sgf/game/blood-vomit-fr.sgf";
	else if ($_GET["id"]==113) $file="../../_sgf/game/blood-vomit-ja.sgf";
	else if ($_GET["id"]==114) $file="../../_sgf/game/blood-vomit-zh-hans.sgf";
	else if ($_GET["id"]==115) $file="../../_sgf/game/blood-vomit-zh-hant.sgf";
	else if ($_GET["id"]==121) $file="../../_sgf/game/Hon-1941-1.sgf";
	else if ($_GET["id"]==131) $file="../../_sgf/game/Hon-1941-2.sgf";
	else if ($_GET["id"]==141) $file="../../_sgf/game/longuest.sgf";
	else if ($_GET["id"]==151) $file="../../_sgf/game/Mingren-001-1F-1-en.sgf";
	else if ($_GET["id"]==152) $file="../../_sgf/game/Mingren-001-1F-1-fr.sgf";
	else if ($_GET["id"]==153) $file="../../_sgf/game/Mingren-001-1F-1-ja.sgf";
	else if ($_GET["id"]==154) $file="../../_sgf/game/Mingren-001-1F-1-zh-hans.sgf";
	else if ($_GET["id"]==155) $file="../../_sgf/game/Mingren-001-1F-1-zh-hant.sgf";
	else if ($_GET["id"]==161) $file="../../_sgf/game/mn-bdg-en.sgf";
	else if ($_GET["id"]==162) $file="../../_sgf/game/mn-bdg-fr.sgf";
	else if ($_GET["id"]==171) $file="../../_sgf/game/mn-bdg-sibling-en.sgf";
	else if ($_GET["id"]==172) $file="../../_sgf/game/mn-bdg-sibling-fr.sgf";
	else if ($_GET["id"]==181) $file="../../_sgf/game/score.sgf";
	else if ($_GET["id"]==191) $file="../../_sgf/game/TV9x9-en.sgf";
	else if ($_GET["id"]==192) $file="../../_sgf/game/TV9x9-fr.sgf";
	else if ($_GET["id"]==201) $file="../../_sgf/joseki/fancy.sgf";
	else if ($_GET["id"]==211) $file="../../_sgf/joseki/j1.sgf";
	else if ($_GET["id"]==221) $file="../../_sgf/joseki/j2.sgf";
	else if ($_GET["id"]==411) $file="../../_sgf/problem/p1-en.sgf";
	else if ($_GET["id"]==412) $file="../../_sgf/problem/p1-fr.sgf";
	else if ($_GET["id"]==413) $file="../../_sgf/problem/p1-ja.sgf";
	else if ($_GET["id"]==414) $file="../../_sgf/problem/p1-zh-hans.sgf";
	else if ($_GET["id"]==415) $file="../../_sgf/problem/p1-zh-hant.sgf";
	else if ($_GET["id"]==421) $file="../../_sgf/problem/p2-en.sgf";
	else if ($_GET["id"]==422) $file="../../_sgf/problem/p2-fr.sgf";
	else if ($_GET["id"]==423) $file="../../_sgf/problem/p2-ja.sgf";
	else if ($_GET["id"]==424) $file="../../_sgf/problem/p2-zh-hans.sgf";
	else if ($_GET["id"]==425) $file="../../_sgf/problem/p2-zh-hant.sgf";
	else if ($_GET["id"]==431) $file="../../_sgf/problem/p3-en.sgf";
	else if ($_GET["id"]==432) $file="../../_sgf/problem/p3-fr.sgf";
	else if ($_GET["id"]==433) $file="../../_sgf/problem/p3-ja.sgf";
	else if ($_GET["id"]==434) $file="../../_sgf/problem/p3-zh-hans.sgf";
	else if ($_GET["id"]==435) $file="../../_sgf/problem/p3-zh-hant.sgf";
	else if ($_GET["id"]==491) $file="../../_sgf/problem/tactigo-en.sgf";
	else if ($_GET["id"]==492) $file="../../_sgf/problem/tactigo-fr.sgf";
	else if ($_GET["id"]==493) $file="../../_sgf/problem/tactigo-ja.sgf";
	else if ($_GET["id"]==494) $file="../../_sgf/problem/tactigo-zh-hans.sgf";
	else if ($_GET["id"]==495) $file="../../_sgf/problem/tactigo-zh-hant.sgf";
	else $file="../../_sgf/miscellaneous/z.sgf";
}
else doError("no data");
if ($file) $data=file_get_contents($file);

if ($file&&$data)
{
	header("Content-Type: application/force-download");
	header("Content-Disposition: attachment; filename=".$file);
	header('Content-Transfer-Encoding: binary');
	print stripslashes($data);
}
?>