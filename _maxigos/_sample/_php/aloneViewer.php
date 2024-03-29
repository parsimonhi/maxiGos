<!DOCTYPE html>
<?php
include "lib.php";
$lang=(isset($_GET["lang"])?safeValue($_GET["lang"]):"en");
$theme=(isset($_GET["theme"])?safeValue($_GET["theme"]):"neo-classic");
$config=(isset($_GET["config"])?safeValue($_GET["config"]):"basic");
$s="../".$theme."/_alone/maxigos-".$theme."-".$config.".js";
?>
<html lang="<?=$lang?>">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<?php
$j=$s;
$b=basename($j);
$t="../../_i18n/maxigos-i18n-".$lang.".js";
switch($lang)
{
	case "fr":$back="Retour";$home="Accueil";break;
	case "ja":$back="戻る";$home="ホーム";break;
	case "zh-hans":$back="上一页";$home="首页";break;
	case "zh-hant":$back="上一頁";$home="首頁";break;
	default:$back="Back";$home="Home";
}
if (strpos(strtolower($s),"comment")!==false) $sgf="../_sgf/game/mn-bdg-".(($lang=="fr")?"fr":"en").".sgf";
else if (strpos(strtolower($s),"diagram")!==false) $sgf="../_sgf/joseki/j2.sgf";
else if (strpos(strtolower($s),"edit")!==false) $sgf="";
else if (strpos(strtolower($s),"game")!==false) $sgf="../_sgf/game/Mingren-001-1F-1-".$lang.".sgf";
else if (strpos(strtolower($s),"kifu")!==false) $sgf="../_sgf/game/Mingren-001-1F-1-".$lang.".sgf";
else if (strpos(strtolower($s),"lesson")!==false) $sgf="../_sgf/game/TV9x9-".(($lang=="fr")?"fr":"en").".sgf";
else if (strpos(strtolower($s),"loop")!==false) $sgf="../_sgf/joseki/j1.sgf";
else if (strpos(strtolower($s),"problem")!==false) $sgf="../_sgf/problem/p3-".$lang.".sgf";
else if (strpos(strtolower($s),"tree")!==false) $sgf="../_sgf/game/mn-bdg-".(($lang=="fr")?"fr":"en").".sgf";
else $sgf="../_sgf/game/blood-vomit.sgf";
?>
<style>
body {padding:0;margin:0;}
.scriptNameH1 {text-align:center;}
.backLinks,.flags
{
	list-style-type:none;
	margin:0;
	padding:0;
	display:flex;
	flex-wrap:wrap;
	justify-content:center;
}
.backLinks a
{
	display:block;
	margin:0 0.5em 0.5em 0.5em;
}
.flags img {border:1px solid #eee;display:block;margin:0.5em;width:2.4em;height:auto;}
nav {display:block;background:#eee;text-align:center;}
nav div a {color:#000;}
nav div a:first-of-type:before {content:"(";}
nav div a:last-of-type:after {content:")";}
nav div {display:inline-block;padding:0.125em 0.5em;}
<?php if (strpos($s,"-fm-")!==false) {?>
section {background:#eeb;}
section>h1 {color:#090;margin:0;padding:1em;}
<?php }?>
<?php if (strpos($s,"-rosewood-")!==false) {?>
section {background:#ec7;}
section>h1 {margin:0;padding:1em;}
<?php }?>
<?php if (strpos($s,"-troyes-")!==false) {?>
section {background:#ecdfc4;}
section>h1 {margin:0;padding:1em;}
<?php }?>
</style>
</head>
<body>
<section>
<h1 class="scriptNameH1"><?=basename($j)?></h1>
<?php
print "\n";
if (($lang=="ja")||($lang=="zh-hans")||($lang=="zh-hant"))
	print "<script src=\"".$t."\"></script>\n";
?>
<script src="<?=$j?>" data-maxigos-sgf="<?=$sgf?>"></script>
</section>
<ul class="flags">
<li><a href="aloneViewer.php?lang=en&amp;theme=<?=$theme?>&amp;config=<?=$config?>"><img src="../../_img/flag/en.svg"></a></li>
<li><a href="aloneViewer.php?lang=fr&amp;theme=<?=$theme?>&amp;config=<?=$config?>"><img src="../../_img/flag/fr.svg"></a></li>
<li><a href="aloneViewer.php?lang=ja&amp;theme=<?=$theme?>&amp;config=<?=$config?>"><img src="../../_img/flag/ja.svg"></a></li>
<li><a href="aloneViewer.php?lang=zh-hans&amp;theme=<?=$theme?>&amp;config=<?=$config?>"><img src="../../_img/flag/zh-cn.svg"></a></li>
<li><a href="aloneViewer.php?lang=zh-hant&amp;theme=<?=$theme?>&amp;config=<?=$config?>"><img src="../../_img/flag/zh-tw.svg"></a></li>
</ul>
<ul class="backLinks">
<li><a href="../../../?lang=<?=$lang?>"><?=$home?></a></li>
<?php
if(isset($_SERVER['HTTP_REFERER'])&&$_SERVER['HTTP_REFERER'])
	echo "<li><a href=\"".$_SERVER['HTTP_REFERER']."\">".$back."</a></li>";
?>
</ul>
</body>
</html>
