<!DOCTYPE html>
<?php
include "lib.php";
$lang=(isset($_GET["lang"])?safeValue($_GET["lang"]):"en");
$theme=(isset($_GET["theme"])?safeValue($_GET["theme"]):"neo-classic");
$config=(isset($_GET["config"])?safeValue($_GET["config"]):"basic");
$s="../".$theme."/_alone/maxigos-".$theme."-".$config.".js";
?>
<html lang="<?php echo $lang;?>">
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
.backLinks {text-align:center;}
.backLinks a {display:inline-block;padding:0.5em;color:#000;}
.flags {display:flex;flex-wrap:wrap;justify-content:center;}
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
<h1 class="scriptNameH1"><?php print basename($j);?></h1>
<?php if (strpos($s,"rfg")!==false) {?>
<div id="flexicontent">
<?php }?>
<?php
print "\n";
if (($lang=="ja")||($lang=="zh-hans")||($lang=="zh-hant"))
	print "<script src=\"".$t."\"></script>\n";
?>
<script src="<?php print $j;?>"><?php print $sgf;?></script>
<?php if (strpos($s,"rfg")!==false) {?>
</div>
<?php }?>
</section>
<div class="flags">
<a href="aloneViewer.php?lang=en&amp;theme=<?php print $theme;?>&amp;config=<?php print $config;?>"><img src="../../_img/flag/en.svg"></a>
<a href="aloneViewer.php?lang=fr&amp;theme=<?php print $theme;?>&amp;config=<?php print $config;?>"><img src="../../_img/flag/fr.svg"></a>
<a href="aloneViewer.php?lang=ja&amp;theme=<?php print $theme;?>&amp;config=<?php print $config;?>"><img src="../../_img/flag/ja.svg"></a>
<a href="aloneViewer.php?lang=zh-hans&amp;theme=<?php print $theme;?>&amp;config=<?php print $config;?>"><img src="../../_img/flag/zh-cn.svg"></a>
<a href="aloneViewer.php?lang=zh-hant&amp;theme=<?php print $theme;?>&amp;config=<?php print $config;?>"><img src="../../_img/flag/zh-tw.svg"></a>
</div>
<div class="backLinks">
<a href="../../../?lang=<?php print $lang;?>"><?php print $home;?></a>
<a href="<?php echo $_SERVER['HTTP_REFERER']; ?>"><?php print $back;?></a>
</div>
</body>
</html>
