<!DOCTYPE html>
<?php
include "_php/lib.php";
$sample=(isset($_GET["sample"])?safeValue($_GET["sample"]):"Minimalist");
switch($sample)
{
	case "NeoClassic":$folder="neo-classic";break;
	case "Classic":$folder="classic";break;
	case "Rosewood":$folder="rosewood";break;
	case "Tatami":$folder="tatami";break;
	case "Troyes":$folder="troyes";break;
	
	case "Bamboo":$folder="minimalist";break;
	// "BBCode" does not use $folder
	case "Bordeaux":$folder="minimalist";break;
	// "Charset" does not use $folder
	case "Eidogo":$folder="eidogo";break;
	case "Fm":$folder="fm";break;
	case "Forum":$folder="forum";break;
	// "Iframe" does not use $folder
	case "Include":$folder="minimalist";break;
	case "Iroha":$folder="iroha";break;
	case "Jdg":$folder="jdg";break;
	case "Kifla":$folder="kifla";break;
	// "Kogo" does not use $folder
	// "Loader" does not use $folder
	case "Manuscript":$folder="minimalist";break;
	// "Mixed" does not use $folder
	case "Multilang":$folder="minimalist";break;
	// "Rules" does not use $folder
	case "Rfg":$folder="rfg";break;
	case "Tactigo":$folder="minimalist";break;
	case "Tiger":$folder="tiger";break;
	case "Tsumego":$folder="minimalist";break;
	case "WGo":$folder="wgo";break;
	default: $folder="minimalist";
}
$configs=array(
	"Basic","Comment","Diagram","Edit","Game",
	"Kifu","Lesson","Loop","Problem","Replay",
	"Score","Tree","Zero");
$scripts=array();
forEach($configs as $c) $scripts[$c]=$folder."/_maker/".lcfirst($c).".php";

$lang=(isset($_GET["lang"])?$_GET["lang"]:"en");
$lang=safeValue($lang);
if(!in_array($lang,array("en","fr","ja","zh-hans","zh-hant"))) $lang="en";
$lang2=(($lang=="fr")?"fr":"en");
$title="Maxigos";
$HomeLabel="Home";
$DocumentationLabel="Documentation";
$modifiedLabel="modified";
$topLabel="Top";
$bottomLabel="Bottom";
$ExecutionTimeLabel="Execution time: ";
$maxigosNumLabel=" Maxigos";
$pageWidthLabel="page width: ";
$aloneScriptSample="Alone script sample";
if ($lang=="fr")
{
	$title="Maxigos";
	$HomeLabel="Accueil";
	$DocumentationLabel="Documentation";
	$modifiedLabel="modifié";
	$topLabel="Haut";
	$bottomLabel="Bas";
	$ExecutionTimeLabel="Temps d'exécution : ";
	$maxigosNumLabel=" Maxigos";
	$pageWidthLabel="largeur de la page : ";
	$aloneScriptSample="Exemple de script autonome";
}
else if ($lang=="ja")
{
	$title="マキシゴス例";
	$HomeLabel="ホーム";
	$DocumentationLabel="文書";
	$modifiedLabel="変更された";
	$topLabel="上"; // or トップ?
	$bottomLabel="下"; // or ボトム?
	$ExecutionTimeLabel="実行時間 ";
	$maxigosNumLabel="個のマキシゴス";
	$pageWidthLabel="ページ幅 ";
	$aloneScriptSample="単独スクリプト例";
}
else if ($lang=="zh-hans")
{
	$title="Maxigos例";
	$HomeLabel="首页";
	$DocumentationLabel="手明书";
	$modifiedLabel="修改";
	$topLabel="上";
	$bottomLabel="下";
	$ExecutionTimeLabel="执行时间 ";
	$maxigosNumLabel="个Maxigos";
	$pageWidthLabel="页面宽度 ";
	$aloneScriptSample="Alone script sample";
}
else if ($lang=="zh-hant")
{
	$title="Maxigos例";
	$HomeLabel="首頁";
	$DocumentationLabel="手明書";
	$modifiedLabel="修改";
	$topLabel="上";
	$bottomLabel="下";
	$ExecutionTimeLabel="執行時間 ";
	$maxigosNumLabel="個Maxigos";
	$pageWidthLabel="頁面寬度 ";
	$aloneScriptSample="Alone script sample";
}
$subtitle=$sample;
?>
<html lang="<?=$lang?>">
<?php
function themeMenu()
{
	global $lang;
	$s="<nav>\n";
	$s.="<a href=\"?sample=Classic&lang=$lang\">Classic</a>\n";
	$s.="<a href=\"?sample=Minimalist&lang=$lang\">Minimalist</a>\n";
	$s.="<a href=\"?sample=NeoClassic&lang=$lang\">NeoClassic</a>\n";
	$s.="<a href=\"?sample=Rosewood&lang=$lang\">Rosewood</a>\n";
	$s.="<a href=\"?sample=Tatami&lang=$lang\">Tatami</a>\n";
	$s.="<a href=\"?sample=Troyes&lang=$lang\">Troyes</a>\n";
	$s.="</nav>\n";
	$s.="<nav>\n";
	$s.="<a href=\"?sample=Bamboo&lang=$lang\">Bamboo</a>\n";
	$s.="<a href=\"?sample=BBCode&lang=$lang\">BBCode</a>\n";
	$s.="<a href=\"?sample=Bordeaux&lang=$lang\">Bordeaux</a>\n";
	$s.="<a href=\"?sample=Charset&lang=$lang\">Charset</a>\n";
	$s.="<a href=\"?sample=Eidogo&lang=$lang\">Eidogo</a>\n";
	$s.="<a href=\"?sample=Fm&lang=$lang\">Fm</a>\n";
	$s.="<a href=\"?sample=Forum&lang=$lang\">Forum</a>\n";
	$s.="<a href=\"?sample=Iframe&lang=$lang\">Iframe</a>\n";
	$s.="<a href=\"?sample=Include&lang=$lang\">Include</a>\n";
	$s.="<a href=\"?sample=Iroha&lang=$lang\">Iroha</a>\n";
	$s.="<a href=\"?sample=Jdg&lang=$lang\">Jdg</a>\n";
	$s.="<a href=\"?sample=Kifla&lang=$lang\">Kifla</a>\n";
	if(kogo()) $s.="<a href=\"?sample=Kogo&lang=$lang\">Kogo</a>\n";
	$s.="<a href=\"?sample=Loader&lang=$lang\">Loader</a>\n";
	$s.="<a href=\"?sample=Manuscript&lang=$lang\">Manuscript</a>\n";
	$s.="<a href=\"?sample=Mixed&lang=$lang\">Mixed</a>\n";
	$s.="<a href=\"?sample=Multilang&lang=$lang\">Multilang</a>\n";
	$s.="<a href=\"?sample=Rfg&lang=$lang\">Rfg</a>\n";
	$s.="<a href=\"?sample=Rules&lang=$lang\">Rules</a>\n";
	$s.="<a href=\"?sample=Tactigo&lang=$lang\">Tactigo</a>\n";
	$s.="<a href=\"?sample=Tiger&lang=$lang\">Tiger</a>\n";
	$s.="<a href=\"?sample=Tsumego&lang=$lang\">Tsumego</a>\n";
	$s.="<a href=\"?sample=WGo&lang=$lang\">WGo</a>\n";
	$s.="</nav>\n";
	echo $s;
}
function langMenu()
{
	global $sample,$lang,$lang2,$HomeLabel,$DocumentationLabel;
	$s="<nav>\n";
	$s.="<a lang=\"en\" href=\"?sample=$sample&lang=en\"><img alt=\"english\" src=\"../_img/flag/en.svg\"></a>\n";
	$s.="<a lang=\"fr\" href=\"?sample=$sample&lang=fr\"><img alt=\"français\" src=\"../_img/flag/fr.svg\"></a>\n";
	$s.="<a lang=\"ja\" href=\"?sample=$sample&lang=ja\"><img alt=\"日本語\" src=\"../_img/flag/ja.svg\"></a>\n";
	$s.="<a lang=\"zh-hans\" href=\"?sample=$sample&lang=zh-hans\"><img alt=\"简体字\" src=\"../_img/flag/zh-cn.svg\"></a>\n";
	$s.="<a lang=\"zh-hant\" href=\"?sample=$sample&lang=zh-hant\"><img alt=\"繁體字\" src=\"../_img/flag/zh-tw.svg\"></a>\n";
	$s.="<a href=\"../../?lang=$lang\">$HomeLabel</a>\n";
	$s.="<a href=\"../_doc/_$lang2/documentation.php\">$DocumentationLabel</a>\n";
	$s.="</nav>\n";
	echo $s;
}
function makeConfigForMenu($c)
{
	global $scripts;
	if (file_exists($scripts[$c])) return "<a href=\"#".lcfirst($c)."\">".$c."</a>\n";
	return "";
}
function configMenu()
{
	global $configs;
	global $topLabel,$bottomLabel;
	$s="<nav>\n";
	$s.="<a href=\"#top\">$topLabel</a>\n";
	forEach($configs as $c) $s.=makeConfigForMenu($c);
	$s.="<a href=\"#bottom\">$bottomLabel</a>\n";
	$s.="</nav>\n";
	echo $s;
}
function oneScript($src,$params,$sgf)
{
	global $sample;
	echo "<script\n";
	echo "\tsrc=\"".$src."\"\n";
	if ($params) echo "\t".$params."\n";
	if ($sgf) echo "\tdata-maxigos-sgf=\"".$sgf."\"\n";
	echo ">\n</script>\n";
}
?>
<head>
<script>
// compute various data
let date1=new Date();
if (typeof mxG=='undefined') mxG={};
if (!mxG.ExecutionTime) mxG.ExecutionTime=function()
{
	let list,s=(new Date().getTime()-date1.getTime())+"ms";
	list=document.querySelectorAll(".executionTime");
	if(list) for(let k=0;k<list.length;k++) list[k].innerHTML=s;
};
function magicCountMaxigos()
{
	let list,s=mxG.D?mxG.D.length-1:"0";
	list=document.querySelectorAll(".maxigosNum");
	if(list) for(let k=0;k<list.length;k++) list[k].innerHTML=s;
}
window.addEventListener("load",magicCountMaxigos);
function magicGetPageWidth()
{
	let list=document.querySelectorAll(".pageWidth");
	if(list) for(let k=0;k<list.length;k++)
		list[k].innerHTML=document.body.clientWidth+"px";
}
function magicResizeOberver()
{
	if(ResizeObserver)
		new ResizeObserver(magicGetPageWidth).observe(document.body);
}
window.addEventListener("load",magicResizeOberver);
</script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="description" content="Various samples for maxiGos sgf viewer">
<style>
body
{
	font-family:sans-serif;
	margin:0;
	padding:0;
	min-width:10em;
}
header, footer
{
	padding:4px;
	background:#0002;
}
section.sample>nav
{
	background:#0002;
	display:block;
}
section.sampleBody
{
	padding:0.125em;
}
header nav a, footer nav a, section.sample>nav a
{
	display:inline-block;
	padding:0.5em;
	color:#000;
	vertical-align:middle;
}
header nav img, footer nav img
{
	width:2.1em;
	height:auto;
	vertical-align:center;
}
h1.z
{
	font-size:2em;
	margin:0.25em;
	padding:0;
}
div.computedData {margin:0.5em;}
h2.z
{
	font-size:1.5em;
	margin:0;
	padding:0.33em;
	background:#000;
	color:#fff;
}
h3.z
{
	text-align:center;
	margin:1em 0 0.5em 0;
}
p.z
{
	margin:1em 0.5em;
}
.aloneLink
{
	color:#000;
	padding:1em 0.5em;
}
div.mxGlobalBoxDiv
{
	margin:0.5em auto;
}
<?php if ($sample=="Eidogo") {?>
body.EidogoSample
{
}
<?php }?>
<?php if ($sample=="Rosewood") {?>
/* Rosewood */
body.RosewoodSample
{
	background:#ec7;
}
body.RosewoodSample section.sample:after
{
	display:block;
	content:"";
	background:url(../_img/other/dragon.png);
	height:20vh;
	background-size:contain;
	background-repeat:no-repeat;
	background-position:center;
}
body.RosewoodSample .reference
{
	margin:0 1em 0 0;
	margin:0;
	text-align:center;
	font-style:italic;
	font-size:0.5em;
}
body.RosewoodSample .reference a
{
	color:#000;
}
body.RosewoodSample section.sample>div:last-of-type
{
	margin-bottom:0;
}
<?php }?>
<?php if (($sample=="Bamboo")||($sample=="Mixed")) {?>
/* Bamboo */
.BambooSample section.sample,
section.sample section.BambooSample
{
	background:#beb;
	padding-bottom:1em;
}
.BambooSample section.sample>div:last-of-type,
section.sample section.BambooSample>div:last-of-type
{
	margin-bottom:0;
}
.BambooSample .mxMinimalistTheme
{
	--btnBk:#beb;
}
.BambooSample .mxMinimalistTheme:not(.mxEditConfig) div.mxGobanDiv
{
	border:0;
}
.BambooSample .mxMinimalistTheme:not(.mxEditConfig) .mxGobanDiv svg
{
	background-image:url(../_img/bk/bamboo-mini.jpg);
	background-size:100% 100%;
	background-repeat:no-repeat;
}
<?php } ?>
<?php if ($sample=="BBCode") { ?>
/* BBCode */
.computedData {display:none;}
iframe
{
	display:block;
	box-sizing:border-box;
	width:100%;
	border:0;
	overflow:hidden;
	margin:0 auto;
}
<?php } ?>
<?php if (($sample=="Bordeaux")||($sample=="Mixed")) {?>
/* Bordeaux */
.BordeauxSample section.sample,
section.sample section.BordeauxSample
{
	background:#eee;
	padding-bottom:1em;
}
.BordeauxSample section.sample>div:last-of-type,
section.sample section.BordeauxSample>div:last-of-type
{
	margin-bottom:0;
}
.BordeauxSample .mxMinimalistTheme:not(.mxEditConfig) div.mxGobanDiv
{
	border:0;
}
.BordeauxSample .mxMinimalistTheme:not(.mxEditConfig) .mxInnerGobanDiv svg
{
	background:#a72926;
}
.BordeauxSample .mxMinimalistTheme:not(.mxEditConfig) .mxGobanLines
{
	stroke:#fff;
}
.BordeauxSample .mxMinimalistTheme:not(.mxEditConfig) .mxStars
{
	stroke:#fff;
	fill:#fff;
	stroke-width:3px;
}
.BordeauxSample .mxMinimalistTheme:not(.mxEditConfig) .mxIndices text,
.BordeauxSample .mxMinimalistTheme:not(.mxEditConfig) text.mxOnEmpty
{
	fill:#fff;
	stroke:none;
}
.BordeauxSample .mxMinimalistTheme:not(.mxEditConfig) .mxMark.mxOnEmpty:not(.mxPointBackground),
.BordeauxSample .mxMinimalistTheme:not(.mxEditConfig) rect.mxPointBackground.mxVariation.mxOnFocus
{
	fill:none;
	stroke:#fff;
}
<?php }?>
<?php if ($sample=="Charset") { ?>
.computedData {display:none;}
<?php }?>
<?php if ($sample=="Fm") { ?>
.FmSample
{
	background:url(../_img/other/tatami-green.gif);
}
.FmSample>header
{
	background:none;
	padding:0;
}
.FmSample>footer
{
	padding:0;
}
.FmSample>header nav
{
	background:#fff;
	padding-left:4px;
	padding-right:4px;
}
.FmSample>header nav:first-of-type
{
	padding-top:4px;
}
.FmSample>header nav:last-of-type
{
	padding-bottom:4px;
}
.FmSample>header nav a
{
	color:#000;
}
.FmSample>main,
.FmSample>footer
{
	box-sizing:border-box;
	max-width:60em;
	min-width:15em;
	margin:0 auto;
}
.FmSample>main
{
	background:#eeb;
	margin-top:0;
	padding:1em;
}
.FmSample .banner
{
	list-style-type:none;
	max-width:60em;
	margin:0 auto;
	padding:0;
	display:flex;
}
.FmSample .banner img
{
	display:block;
	max-width:100%;
}
.FmSample>h1
{
	box-sizing:border-box;
	position:relative;
	font-size:2em;
	max-width:calc(60em / 2);
	text-align:center;
	margin:0 auto;
	color:#090;
	background:#eeb;
	padding-left:calc(1em / 2);
	padding-right:calc(1em / 2);
}
.FmSample>h1:after
{
	content:url(../_img/other/go.svg);
	display:block;
	position:absolute;
	box-sizing:border-box;
	top:0.25em;
	right:0.25em;
	width:1.5em;
	height:1.5em;
	padding:0.125em;
	margin:0;
	border:1px solid #000;
	border-radius:75em;
	background:#fff;
}
.FmSample footer nav
{
	background:#777;
	color:#fff;
}
.FmSample header a,
.FmSample footer a
{
	color:#fff;
}
.FmSample div.z,
.FmSample p.z
{
	margin-left:0;
	margin-right:0;
	padding-left:0;
	padding-right:0;
}
<?php } ?>
<?php if ($sample=="Forum") { ?>
/* Forum */
.ForumSample
{
	color:#333;
}
.ForumSample header,
.ForumSample footer
{
	padding:0;
	background:transparent;
}
.ForumSample header>nav,
.ForumSample footer>nav
{
	background:#cadceb;
	margin-left:4px;
	margin-right:4px;
}
.ForumSample header>nav:first-of-type,
.ForumSample footer>nav:first-of-type
{
	margin-top:4px;
	border-top-left-radius:4px;
	border-top-right-radius:4px;
}
.ForumSample header>nav:last-of-type,
.ForumSample footer>nav:last-of-type
{
	margin-bottom:4px;
	border-bottom-left-radius:4px;
	border-bottom-right-radius:4px;
}
.ForumSample h2.z
{
	background:#0588c8;
	border-radius:4px;
	margin:4px;
}
.ForumSample h2.z+nav
{
	background:#cadceb;
	border-radius:4px;
	margin:4px;
}
.ForumSample h1,
.ForumSample header>nav a,
.ForumSample footer>nav a,
.ForumSample h2.z+nav a,
.ForumSample .sampleBody>h3
{
	color:#0f5289;
}
.ForumSample main>div.z.computedData,
.ForumSample main>p.z
{
	color:#536482;
}

.ForumSample header>nav a:focus,
.ForumSample header>nav a:hover,
.ForumSample footer>nav a:focus,
.ForumSample footer>nav a:hover,
.ForumSample h2.z+nav a:focus,
.ForumSample h2.z+nav a:hover
{
	color:#bc2a4d;
}
.ForumSample .sampleBody
{
	padding-top:0.5em;
	padding-bottom:0.5em;
	border-radius:4px;
	margin:4px;
}
.ForumSample main>section.sample:nth-of-type(2n+1) .sampleBody
{
	background:#e2ebf2;
}
.ForumSample main>section.sample:nth-of-type(2n) .sampleBody
{
	background:#ecf3f7;
}
<?php } ?>
<?php if ($sample=="Iframe") { ?>
/* Iframe */
.computedData {display:none;}
iframe
{
	display:block;
	box-sizing:border-box;
	width:100%;
	border:0;
	overflow:hidden;
	margin:0 auto;
}
<?php } ?>
<?php if ($sample=="Kifla") { ?>
.KiflaSample
{
	background:#ddd;
}
<?php } ?>
<?php if ($sample=="Jdg") { ?>
/* Jdg */
body
{
	font-family:"Avenir Next","Segoe UI",sans-serif;
}
<?php } ?>
<?php if ($sample=="Manuscript") { ?>
/* Manuscript */
.ManuscriptSample
{
	background:url(../_img/bk/cherry-mini.jpg);
	background-size:100% 100%;
	color:#fff;
}
.ManuscriptSample header,
.ManuscriptSample footer
{
	background:transparent;
}
.ManuscriptSample nav a
{
	color:#fff;
}
.ManuscriptSample .mxMinimalistTheme
{
	--manuscriptFontFamily:"LingWai SC","LingWai TC",cursive;
	--gobanMaxWidth:42em;
	background:#fff;
	color:#696;
	padding:1em 1em 0 1em;
}
.ManuscriptSample .mxMinimalistTheme.mxKifuConfig .mxHeaderDiv
{
	border:1px solid #696;
	margin-bottom:1em;
	padding:0.5em;
	color:#33f;
	font-family:var(--manuscriptFontFamily);
	font-weight:bold;
}
.ManuscriptSample .mxMinimalistTheme.mxKifuConfig .mxHeaderDiv .mxTitleP
{
	text-align:center;
}
.ManuscriptSample .mxMinimalistTheme.mxKifuConfig .mxHeaderDiv p
{
	margin:0;
}
.ManuscriptSample .mxMinimalistTheme.mxKifuConfig .mxHeaderDiv .mxHeaderSpan
{
	color:#696;
	font-family:Arial,sans-serif;
	font-weight:normal;
}
.ManuscriptSample .mxMinimalistTheme .mxGobanDiv svg
{
}
.ManuscriptSample .mxMinimalistTheme .mxIndices
{
	fill:#696;
	stroke:#696;
	stroke-width:0.5px;
}
.ManuscriptSample .mxMinimalistTheme .mxGobanLines
{
	stroke:#696;
}
.ManuscriptSample .mxMinimalistTheme .mxStars
{
	fill:#696;
	stroke:none;
	r:2px;
}
.ManuscriptSample .mxMinimalistTheme circle.mxBlack
{
	fill:none;
	stroke:none;
}
.ManuscriptSample .mxMinimalistTheme circle.mxWhite
{
	fill:none;
	stroke:none;
}
.ManuscriptSample .mxMinimalistTheme text.mxOnBlack
{
	font-family:var(--manuscriptFontFamily);
	fill:#33f;
	stroke:#33f;
	stroke-width:1px;
}
.ManuscriptSample .mxMinimalistTheme text.mxOnWhite
{
	font-family:var(--manuscriptFontFamily);
	fill:#f33;
	stroke:#f33;
	stroke-width:1px;
}
.ManuscriptSample .mxMinimalistTheme .mxFocus rect
{
	stroke:#696;
}
.ManuscriptSample .mxMinimalistTheme text.mxVariation
{
	fill:#696;
	stroke:#696;
}
.ManuscriptSample .mxMinimalistTheme rect.mxPointBackground.mxVariation,
.ManuscriptSample .mxMinimalistTheme rect.mxPointBackground.mxVariation.mxOnFocus
{
	fill:#fff;
	stroke:#696;
}
.ManuscriptSample .mxMinimalistTheme .mxNavigationDiv polygon,
.ManuscriptSample .mxMinimalistTheme .mxNavigationDiv rect
{
	fill:#696;
}
.ManuscriptSample .mxMinimalistTheme .mxNavigationDiv button:focus
{
	background:none;
	outline:1px solid #696;
}
.ManuscriptSample .mxMinimalistTheme .mxNotSeenDiv circle.mxBlack,
.ManuscriptSample .mxMinimalistTheme .mxNotSeenDiv circle.mxWhite
{
	fill:none;
	stroke:#696;
}
.ManuscriptSample .mxMinimalistTheme .mxNotSeenDiv circle.mxBlack+text
{
	font-family:var(--manuscriptFontFamily);
	fill:#33f;
	stroke:#33f;
	stroke-width:1px;
}
.ManuscriptSample .mxMinimalistTheme .mxNotSeenDiv circle.mxWhite+text
{
	font-family:var(--manuscriptFontFamily);
	fill:#f33;
	stroke:#f33;
	stroke-width:1px;
}
.ManuscriptSample .mxMinimalistTheme .mxNotSeenDiv .mxTextSomewhere
{
	fill:#696;
	stroke:#696;
}
.ManuscriptSample .mxMinimalistTheme .mxVersionDiv
{
}
<?php } ?>
<?php if ($sample=="Rfg") { ?>
/* Rfg */
#rfg div.mxGlobalBoxDiv
{
	margin-top:1em;
	margin-bottom:1em;
}
<?php } ?>
<?php if ($sample=="Rules") { ?>
/* Rules */
body.RulesSample iframe
{
	display:block;
	box-sizing:border-box;
	width:100%;
	border:0;
	overflow:hidden;
	margin:0 auto;
}
.computedData {display:none;}
<?php } ?>
<?php if (($sample=="Troyes")||($sample=="Mixed")) {?>
/* Troyes */
.TroyesSample
{
	background:#ecdfc3;
	padding-bottom:1px;
}
<?php }?>
<?php if ($sample=="Tactigo") { ?>
/* Tactigo */
.TactigoSample
{
	font-family:"Segoe UI",Arial,sans-serif;
}
.TactigoSample h1
{
	background:#333;
	color:#fff;
	font-family:"Arial Narrow",Arial,sans-serif;
	font-weight:normal;
	vertical-align:baseline;
	letter-spacing:0.125em;
	font-size:1.5em;
	padding:0.125em;
	margin-bottom:1em;
}
.TactigoSample h1:before
{
	content:"初段";
	display:inline-block;
	padding:0 0.5em;
	color:#fe0000;
	text-decoration:none;
	font-size:1.5em;
	font-family:"Hiragino Maru Gothic ProN",Arial,sans-serif;
	vertical-align:baseline;
	letter-spacing:0;
}
.TactigoSample h1 a
{
	color:#fff;
	text-decoration:none;
}
.TactigoSample div.mxGlobalBoxDiv.mxMinimalistTheme
{
	--gobanMaxWidth:calc(1em * 449 / 16);
	display:flex;
	flex-direction:column;
}
.TactigoSample div.mxGlobalBoxDiv .mxCommentDiv
{
	order:3;
}
.TactigoSample div.mxGlobalBoxDiv .mxGobanSvg
{
	box-shadow:2px 2px 16px rgba(0,0,0,0.3);
}
.TactigoSample div.mxGlobalBoxDiv .mxGobanSvg .mxWholeRect
{
	fill:#e6bb7c;
}
.TactigoSample div.mxGlobalBoxDiv .mxGobanSvg .mxGobanLines
{
	stroke:#333;
}
.TactigoSample div.mxGlobalBoxDiv .mxGobanSvg .mxStars
{
	stroke:#333;
	fill:#333;
}
<?php } ?>
<?php if ($sample=="Tsumego") {?>
/* Tsumego */
.TsumegoSample
{
	--tsumegoBk:#ac7; /* historic: #c2db8d */
}
.TsumegoSample main
{
	padding:0 0.125em;
}
.TsumegoSample h1,
.TsumegoSample .computedData,
.TsumegoSample p.z
{
	font-family:"Helvetica Neue",Arial,sans-serif;
	color:#666;
	font-weight:200;
}
.TsumegoSample h1 a
{
	color:#000;
	text-decoration:none;
}
.TsumegoSample h1 a:focus,
.TsumegoSample h1 a:hover
{
	outline:none;
	color:#f00;
}
.TsumegoSample section
{
	font-family:"Helvetica Neue",Arial,sans-serif;
	font-weight:300;
	margin:2em auto;
	border-radius:1em;
	box-shadow:0.125em 0.125em 0.375em #ccc;
	min-width:19em;
}
.TsumegoSample section:nth-of-type(1)
{
	max-width:calc(1em * 282 / 16 + 10em);
}
.TsumegoSample section:nth-of-type(2)
{
	max-width:calc(1em * 445 / 16 + 10em);
}
.TsumegoSample section h2
{
	font-size:1.5em;
	background:var(--tsumegoBk);
	border-radius:0.67em 0.67em 0 0;
	margin:0;
	padding:0.5em;
	text-align:center;
	font-weight:300;
	color:#fff;
}
.TsumegoSample section h2>span:first-of-type
{
	display:inline-block;
	margin:0 0.5em;
}
.TsumegoSample section h2>span:last-of-type
{
	display:inline-block;
	height:1.5em;
	line-height:1.5em;
	font-size:0.5em;
	margin:0 1em;
	padding:0 0.5em;
	border-radius:0.75em;
	background:#fff;
	vertical-align:middle;
}
.TsumegoSample section h2>span:last-of-type>span:first-of-type
{
	color:#ed0;
}
.TsumegoSample section h2>span:last-of-type>span:last-of-type
{
	color:#ddd;
}
.TsumegoSample div.mxGlobalBoxDiv
{
	display:grid;
	grid-template-columns:auto 4em;
	grid-template-rows:auto auto;
	grid-column-gap:2em;
	margin:0 auto;
	padding:2em;
}
.TsumegoSample div.mxGlobalBoxDiv.mxIn3d.mxIndicesOff
{
	--gobanMaxWidth:100%;
}
.TsumegoSample div.mxGlobalBoxDiv .mxGobanDiv
{
	grid-column:1 / 2;
	grid-row:1 / 2;
	box-shadow:0.125em 0.125em 0.375em #ccc;
}
.TsumegoSample div.mxGlobalBoxDiv .mxGobanDiv .mxMarkOnLast
{
	fill:#f00;
}
.TsumegoSample div.mxGlobalBoxDiv .mxGobanDiv .mxFocus rect
{
	stroke:#f00;
	stroke-width:1.5px;
}
.TsumegoSample div.mxGlobalBoxDiv .mxCommentDiv
{
	padding-top:1em;
	grid-column:1 / 2;
	grid-row:2 / 3;
}
.TsumegoSample div.mxGlobalBoxDiv .mxSolveDiv
{
	grid-column:2 / 3;
	grid-row:1 / 3;
	display:flex;
	flex-direction:column;
	justify-content:center;
	align-items:center;
	gap:1em;
}
.TsumegoSample div.mxGlobalBoxDiv .mxSolveDiv button
{
	box-shadow:0.125em 0.125em 0.375em #ccc;
	width:100%;
	padding:20%;
	margin:0;
	background:#fff;
}
.TsumegoSample div.mxGlobalBoxDiv .mxSolveDiv button svg path
{
	fill:var(--tsumegoBk);
}
.TsumegoSample div.mxGlobalBoxDiv .mxSolveDiv button:focus:not([disabled]),
.TsumegoSample div.mxGlobalBoxDiv .mxSolveDiv button:hover:not([disabled])
{
	background:var(--tsumegoBk);
}
.TsumegoSample div.mxGlobalBoxDiv .mxSolveDiv button:focus:not([disabled]) svg path,
.TsumegoSample div.mxGlobalBoxDiv .mxSolveDiv button:hover:not([disabled]) svg path
{
	fill:#fff;
}
.TsumegoSample div.mxGlobalBoxDiv .mxSolveDiv button[disabled]
{
	box-shadow:0.125em 0.125em 0.375em #999;
}
.TsumegoSample div.mxGlobalBoxDiv .mxSolveDiv button[disabled] svg path
{
	fill:#000;
}
.TsumegoSample div.mxGlobalBoxDiv .mxVersionDiv
{
	display:none;
}
.TsumegoSample div.mxGlobalBoxDiv .mxGobanDiv svg
{
	background-image:url(../_img/bk/kaya-mini.jpg);
	background-size:100% 100%;
	background-repeat:no-repeat;
}
<?php }?>
<?php if (($sample=="Zanzibar")||($sample=="Mixed")) {?>
/* Zanzibar */
.ZanzibarSample
{
	background:#1eb63b;
	padding-bottom:1px;
}
.ZanzibarSample div.mxGlobalBoxDiv .mxGobanDiv svg
{
	background:#00a3dd;
}
.ZanzibarSample div.mxGlobalBoxDiv .mxGobanDiv svg radialGradient:nth-of-type(2) stop:nth-of-type(1)
{
	stop-color:#fcd117;
}
.ZanzibarSample div.mxGlobalBoxDiv .mxGobanDiv svg radialGradient:nth-of-type(2) stop:nth-of-type(2)
{
	stop-color:#cca117;
}
.ZanzibarSample div.mxGlobalBoxDiv .mxGobanDiv svg radialGradient:nth-of-type(2) stop:nth-of-type(3)
{
	stop-color:#3c1117;
}
.ZanzibarSample div.mxGlobalBoxDiv .mxGobanDiv svg .mxMarkOnLast.mxOnBlack
{
	fill:#deb317;
}
.ZanzibarSample div.mxGlobalBoxDiv .mxGobanDiv svg .mxMarkOnLast.mxOnWhite
{
	fill:#2d2d2d;
}
<?php }?>
</style>
<title><?=$title?></title>
</head>
<body class="<?=$sample?>Sample">
<script src="../_i18n/maxigos-i18n-fr.js"></script>
<script src="../_i18n/maxigos-i18n-ja.js"></script>
<script src="../_i18n/maxigos-i18n-zh-hans.js"></script>
<script src="../_i18n/maxigos-i18n-zh-hant.js"></script>
<script src="../_i18n/maxigos-i18n-en.js"></script>

<header id="top">
<?php
langMenu();
themeMenu();
?>
<?php if ($sample=="Fm") { ?>
<ul class="banner">
<li><img src="../_img/prints/1-1.gif"></li>
<li><img src="../_img/prints/1-2.gif"></li>
<li><img src="../_img/prints/1-3.gif"></li>
<li><img src="../_img/prints/2-1.gif"></li>
<li><img src="../_img/prints/2-2.gif"></li>
<li><img src="../_img/prints/2-3.gif"></li>
<li><img src="../_img/prints/3-1.gif"></li>
<li><img src="../_img/prints/3-2.gif"></li>
<li><img src="../_img/prints/3-3.gif"></li>
<li><img src="../_img/prints/4-1.gif"></li>
<li><img src="../_img/prints/4-2.gif"></li>
<li><img src="../_img/prints/4-3.gif"></li>
<li><img src="../_img/prints/5-1.gif"></li>
<li><img src="../_img/prints/5-2.gif"></li>
<li><img src="../_img/prints/5-3.gif"></li>
</ul>
<?php } ?>
</header>

<?php if ($sample=="Tactigo") { ?>
<h1 class="z"><a href="http://tactigo.free.fr/"><?=$title." - ".$subtitle?></a></h1>
<?php } else {?>
<h1 class="z"><?=$title." - ".$subtitle?></h1>
<?php }?>

<main>
<p class="z computedData">
<?=$ExecutionTimeLabel?><span class="executionTime">0</span>, 
<span class="maxigosNum">0</span><?=$maxigosNumLabel?>, 
<?=$pageWidthLabel?><span class="pageWidth">0</span>
</p>

<?php if ($sample=="Z") { ?>
<?php // for testings ?>
<?php } else if ($sample=="BBCode") { ?>
<section id="BBCode" class="sample">
<iframe src="BBCode/BBCode.php?lang=<?=$lang?>"></iframe>
</section>
<?php } else if ($sample=="Charset") { ?>
<section id="charset" class="sample">
<?php
switch($lang)
{
	case "fr":$h2="Tests de charset";$page="Page : ";break;
	case "ja":$h2="文字テスト";$page="ページ：　";break;
	case "zh-hans":$h2="字符集测试";$page="页：　";break;
	case "zh-hant":$h2="字符集測試";$page="頁：　";break;
	default:$h2="Charset tests";$page="Page: ";
}
?>
<h2 class="z"><?=$h2?></h2>
<ul>
<li><a href="charset/sample-in-Big5.php?lang=<?=$lang?>">Big5</a></li>
<li><a href="charset/sample-in-GB18030.php?lang=<?=$lang?>">GB18030</a></li>
<li><a href="charset/sample-in-Shift_JIS.php?lang=<?=$lang?>">Shift_JIS</a></li>
<li><a href="charset/sample-in-ISO-8859-1.php?lang=<?=$lang?>">ISO-8859-1</a></li>
<li><a href="charset/sample-in-UTF-8.php?lang=<?=$lang?>">UTF-8</a></li>
</ul>
</section>
<?php } else if ($sample=="Fm") { ?>
<section id="fm" class="sample">
<section class="diagram">
<script src="<?=$scripts["Diagram"]?>"
		data-maxigos-sgf="_sgf/joseki/j1.sgf"
>
</script>
<script src="<?=$scripts["Diagram"]?>"
		data-maxigos-sgf="_sgf/joseki/j2.sgf"
>
</script>
<section class="game">
<script src="<?=$scripts["Game"]?>"
		data-maxigos-sgf="_sgf/game/Hon-1941-1.sgf"
>
</script>
<script src="<?=$scripts["Game"]?>"
		data-maxigos-sgf="_sgf/game/TV9x9-<?=($lang=="fr")?"fr":"en"?>.sgf"
>
</script>
</section>
<section class="problem">
<script src="<?=$scripts["Problem"]?>"
		data-maxigos-sgf="_sgf/problem/p3-<?=($lang=="fr")?"fr":"en"?>.sgf"
>
</script>
</section>
</section>
<?php } else if ($sample=="Include") { ?>
<section id="include" class="sample">
<section class="comment">
<h2 class="z">Sgf filename => script data-maxigos-sgf</h2>
<script src="<?=$scripts["Comment"]?>"
		data-maxigos-sgf="_sgf/game/blood-vomit-<?=$lang?>.sgf"
>
</script>
</section>
<section class="comment">
<h2 class="z">Sgf filename => script tag content</h2>
<script src="<?=$scripts["Comment"]?>"
>
_sgf/game/blood-vomit-<?=$lang?>.sgf
</script>
</section>
<section class="comment">
<h2 class="z">Sgf record => script data-maxigos-sgf</h2>
<script src="<?=$scripts["Comment"]?>"
		data-maxigos-sgf="<?=getSgfFromFileToAttribute('_sgf/game/blood-vomit-'.$lang.'.sgf')?>"
>
</script>
</section>
<section class="comment">
<h2 class="z">Sgf record => script tag content</h2>
<script src="<?=$scripts["Comment"]?>"
>
<?=getSgfFromFileToContent('_sgf/game/blood-vomit-'.$lang.'.sgf')?>
</script>
</section>
<section class="comment">
<h2 class="z">Php script => script data-maxigos-sgf</h2>
<?php
if($lang=="fr") $sgfId=2;
else if($lang=="ja") $sgfId=3;
else if($lang=="zh-hans") $sgfId=4;
else if($lang=="zh-hant") $sgfId=5;
else $sgfId=1;
?>
<script
	src="<?=$scripts["Comment"]?>"
	data-maxigos-sgf="_php/getSgfFile.php?id=<?=$sgfId?>"
	data-maxigos-source-filter="^(..\/)*_php\/getSgfFile\.php\?id=[0-9]+$"
>
</script>
</section>
</section>
<?php } else if ($sample=="Kogo") { ?>
<section id="kogo" class="sample">
<section class="kogo">
<script
	src="minimalist/_maker/edit.php"
	data-maxigos-sgf="<?=kogo()?>"
></script>
</section>
</section>
<?php } else if ($sample=="Loader") { ?>
<section id="loader" class="sample">
<section class="loader">
<div data-maxigos="Game,Eidogo">
_sgf/game/blood-vomit-<?=$lang?>.sgf
</div>
<div data-maxigos="Problem,Eidogo">
_sgf/problem/p3-<?=$lang?>.sgf
</div>
<script src="_js/mgosLoader.js"></script>
</section>
</section>
<?php } else if ($sample=="Manuscript") { ?>
<p class="z">Theme=Minimalist (<?=$modifiedLabel?>), config=Kifu</p>
<section id="manuscript" class="sample">
<section class="kifu">
<script src="<?=$scripts["Kifu"]?>"
		data-maxigos-stretching="0,1,1,2"
		data-maxigos-grid-padding="4"
		data-maxigos-erase-grid-under="0"
		data-maxigos-version-box-on="1"
		data-maxigos-sgf="_sgf/game/blood-vomit-<?=$lang?>.sgf"
>
</script>
</section>
</section>
<?php } else if ($sample=="Iframe") { ?>
<p class="z">Theme=NeoClassic+Iframe</p>
<?php
$query="config=game";
$query.="&theme=neo-classic";
$query.="&lang=".$lang;
$query.="&sgf=".urlencode("../_sgf/game/blood-vomit-".$lang.".sgf");
?>
<iframe src="iframe/iframe.php?<?=$query?>"></iframe>
<?php } else if ($sample=="Mixed") { ?>
<section id="mixed" class="sample">
<section class="BambooSample">
<h2 class="z">Bamboo</h2>
<script
	src="minimalist/_maker/basic.php"
	data-maxigos-in3d-on="1"
	data-maxigos-sgf="_sgf/game/blood-vomit-<?=$lang?>.sgf"
>
</script>
</section>
<section class="BordeauxSample">
<h2 class="z">Bordeaux</h2>
<script
	src="minimalist/_maker/basic.php"
	data-maxigos-sgf="_sgf/game/blood-vomit-<?=$lang?>.sgf"
>
</script>
</section>
<section class="MinimalistSample">
<h2 class="z">Minimalist</h2>
<script
	src="minimalist/_maker/basic.php"
	data-maxigos-sgf="_sgf/game/blood-vomit-<?=$lang?>.sgf"
>
</script>
</section>
<section class="TroyesSample">
<h2 class="z">Troyes</h2>
<script
	src="troyes/_maker/basic.php"
	data-maxigos-sgf="_sgf/game/blood-vomit-<?=$lang?>.sgf"
>
</script>
</section>
<section class="ZanzibarSample">
<h2 class="z">Zanzibar</h2>
<script
	src="minimalist/_maker/basic.php"
	data-maxigos-in3d-on="1"
	data-maxigos-sgf="_sgf/game/blood-vomit-<?=$lang?>.sgf"
>
</script>
</section>
</section>
<?php } else if ($sample=="Multilang") { ?>
<p class="z">Theme=Minimalist, config=Game</p>
<section class="MultilangSample">
<section class="sample">
<h2 lang="en" class="z">English (lang="en")</h2>
<script lang="en" src="minimalist/_maker/game.php"
data-maxigos-sgf="_sgf/game/blood-vomit-en.sgf">
</script>
</section>
<section class="sample">
<h2 lang="fr" class="z">Français (lang="fr")</h2>
<script lang="fr" src="minimalist/_maker/game.php"
data-maxigos-sgf="_sgf/game/blood-vomit-fr.sgf">
</script>
</section>
<section class="sample">
<h2 lang="ja" class="z">日本語 (lang="ja")</h2>
<script lang="ja" src="minimalist/_maker/game.php"
data-maxigos-sgf="_sgf/game/blood-vomit-ja.sgf">
</script>
</section>
<section class="sample">
<h2 lang="zh-hans" class="z">中文～简化字 (lang="zh-hans")</h2>
<script lang="zh-hans" src="minimalist/_maker/game.php"
data-maxigos-sgf="_sgf/game/blood-vomit-zh-hans.sgf">
</script>
</section>
<section class="sample">
<h2 lang="zh-hant" class="z">中文～正體字 (lang="zh-hant")</h2>
<script lang="zh-hant" src="minimalist/_maker/game.php"
data-maxigos-sgf="_sgf/game/blood-vomit-zh-hant.sgf">
</script>
</section>
</section>
<?php } else if ($sample=="Rfg") { ?>
<section id="rfg" class="sample">
<section class="basic">
<h2 class="z">Basic</h2>
<script src="<?=$scripts["Basic"]?>"
		data-maxigos-sgf="_sgf/game/Hon-1941-1.sgf"
>
</script>
</section>
<section class="comment">
<h2 class="z">Comment</h2>
<script src="<?=$scripts["Comment"]?>"
		data-maxigos-sgf="_sgf/game/mn-bdg-<?=(($lang=="fr")?"fr":"en")?>.sgf"
>
</script>
</section>
<section class="diagram">
<h2 class="z">Diagram</h2>
<script src="<?=$scripts["Diagram"]?>"
		data-maxigos-sgf="_sgf/game/blood-vomit.sgf"
>
</script>
<script src="<?=$scripts["Diagram"]?>"
		data-maxigos-sgf="_sgf/joseki/j1.sgf"
>
</script>
</section>
<section class="game">
<h2 class="z">Game</h2>
<script src="<?=$scripts["Game"]?>"
		data-maxigos-sgf="_sgf/game/Hon-1941-2.sgf"
>
</script>
</section>
<section class="problem">
<h2 class="z">Problem</h2>
<script src="<?=$scripts["Problem"]?>"
		data-maxigos-sgf="_sgf/problem/p3-<?=$lang?>.sgf"
>
</script>
</section>
<section class="tree">
<h2 class="z">Tree</h2>
<script src="<?=$scripts["Tree"]?>"
		data-maxigos-sgf="_sgf/game/mn-bdg-<?=(($lang=="fr")?"fr":"en")?>.sgf"
>
</script>
<script src="<?=$scripts["Tree"]?>"
		data-maxigos-sgf="_sgf/game/Mei-1996-2.sgf"
>
</script>
<script src="<?=$scripts["Tree"]?>"
		data-maxigos-sgf="_sgf/game/Hon-1996-5.sgf"
>
</script>
</section>
</section>
<?php } else if ($sample=="Rules") { ?>
<p class="z">Theme=Minimalist, config=Diagram</p>
<section id="Rules" class="sample">
<iframe src="rules/rules-<?=(($lang=="fr")?"fr":"en")?>.php"></iframe>
</section>
<?php } else if ($sample=="Tactigo") {?>
<p class="z">Theme=Minimalist (<?=$modifiedLabel?>), config=Problem</p>
<section id="tactigo" class="sample">
<section class="problem">
<script src="<?=$scripts["Problem"]?>"
		data-maxigos-solves=""
		data-maxigos-in3d-on="1"
		data-maxigos-special-stone-on="1"
		data-maxigos-stretching="0,1,1,2"
		data-maxigos-marks-and-labels-on="1"
		data-maxigos-grid-padding="4"
		data-maxigos-sgf="_sgf/problem/tactigo-<?=$lang?>.sgf"
>
</script>
</section>
</section>
<?php } else if ($sample=="Tiger") {?>
<p class="z">Theme=Tiger</p>
<section id="tiger" class="sample">
<section class="comment">
<h2 class="z">Comment</h2>
<script src="<?=$scripts["Comment"]?>"
data-maxigos-sgf="_sgf/game/mn-bdg-<?=(($lang=="fr")?"fr":"en")?>.sgf">
</script>
<script src="<?=$scripts["Comment"]?>"
data-maxigos-sgf="_sgf/game/TV9x9-<?=(($lang=="fr")?"fr":"en")?>.sgf">
</script>
</section>
<h2 class="z">Tree</h2>
<section class="tree">
<script src="<?=$scripts["Tree"]?>"
data-maxigos-sgf="_sgf/game/mn-bdg-<?=(($lang=="fr")?"fr":"en")?>.sgf">
</script>
<script src="<?=$scripts["Tree"]?>"
data-maxigos-sgf="_sgf/game/TV9x9-<?=(($lang=="fr")?"fr":"en")?>.sgf">
</script>
</section>
</section>

<?php } else if ($sample=="Tsumego") {?>
<p class="z">Theme=Minimalist (<?=$modifiedLabel?>), config=Problem</p>
<?php
	if($lang=="ja") $tsumego="詰め碁";
	else $tsumego="Tsumego";
?>
<section class="problem">
<h2><span><?=$tsumego?> 12x8</span><span><span>★★★</span><span>★★★</span></span></h2>
<script src="<?=$scripts["Problem"]?>"
		data-maxigos-in3d-on="1"
		data-maxigos-points-num-max="0"
		data-maxigos-stretching="0,1,1,2"
		data-maxigos-sgf="_sgf/problem/p3-<?=$lang?>.sgf">
</script>
</section>
<section class="problem">
<h2><span><?=$tsumego?> 19x19</span><span><span>★★★</span><span>★★★</span></span></h2>
<script src="<?=$scripts["Problem"]?>"
		data-maxigos-in3d-on="1"
		data-maxigos-points-num-max="0"
		data-maxigos-sgf="_sgf/problem/tactigo-<?=$lang?>.sgf">
</script>
</section>

<!------------------------------------->
<!-- Main themes + Bamboo + Bordeaux -->
<!------------------------------------->

<?php } else {?>
<?php if (($sample=="Bamboo")||($sample=="Bordeaux")) {?>
<p class="z">Theme=Minimalist (<?=$modifiedLabel?>)</p>
<?php }?>
<?php if (($sample=="Eidogo")) {?>
<p class="z">Theme=<a href="https://github.com/jkk/eidogo/tree/master">Eidogo</a>, code=<a href="https://github.com/parsimonhi/maxiGos">maxiGos</a></p>
<?php }?>
<?php if (($sample=="Forum")) {?>
<p class="z">Theme=Forum</p>
<?php }?>
<?php if (($sample=="Iroha")) {?>
<p class="z">Theme=Iroha</p>
<?php }?>
<?php if (($sample=="Kifla")) {?>
<p class="z">Theme=Kifla</p>
<?php }?>
<?php if (($sample=="WGo")) {?>
<p class="z">Theme=<a href="http://wgo.waltheri.net/">WGo</a>, code=<a href="https://github.com/parsimonhi/maxiGos">maxiGos</a></p>
<?php }?>
<?php if (file_exists($scripts["Basic"])) {?>
<section id="basic" class="sample">
<h2 class="z">Basic</h2>
<?php configMenu();?>
<section class="sampleBody">
<h3 class="z">19x19</h3>
<?php
$src=$scripts["Basic"];
if ($sample=="Bamboo") $params="data-maxigos-in3d-on=\"1\""; else $params="";
$sgf="_sgf/game/blood-vomit-".$lang.".sgf";
oneScript($src,$params,$sgf);
?>
</section>
<section class="sampleBody">
<h3 class="z">9x9</h3>
<?php
$src=$scripts["Basic"];
if ($sample=="Bamboo") $params="data-maxigos-in3d-on=\"1\""; else $params="";
$sgf="_sgf/game/TV9x9-".(($lang=="fr")?"fr":"en").".sgf";
oneScript($src,$params,$sgf);
?>
</section>
<section class="sampleBody">
<h3 class="z">25x25</h3>
<?php
$src=$scripts["Basic"];
$params="data-maxigos-points-num-max=\"0\"";
if ($sample=="Bamboo") $params.=" data-maxigos-in3d-on=\"1\"";
$sgf="_sgf/game/XY25x25.sgf";
oneScript($src,$params,$sgf);
?>
</section>
</section>
<?php }?>

<?php if (file_exists($scripts["Comment"])) {?>
<section id="comment" class="sample">
<h2 class="z">Comment</h2>
<?php configMenu();?>
<section class="sampleBody">
<h3 class="z">19x19</h3>
<?php
$src=$scripts["Comment"];
$params="data-maxigos-points-num-max=\"0\"";
if ($sample=="Bamboo") $params="data-maxigos-in3d-on=\"1\"";else $params="";
$sgf="_sgf/game/mn-bdg-".(($lang=="fr")?"fr":"en").".sgf";
oneScript($src,$params,$sgf);
?>
</section>
<section class="sampleBody">
<h3 class="z">9x9</h3>
<?php
$src=$scripts["Comment"];
if ($sample=="Bamboo") $params="data-maxigos-in3d-on=\"1\""; else $params="";
$sgf="_sgf/game/TV9x9-".(($lang=="fr")?"fr":"en").".sgf";
oneScript($src,$params,$sgf);
?>
</section>
</section>
<?php }?>

<?php if (file_exists($scripts["Diagram"])) {?>
<section id="diagram" class="sample">
<h2 class="z">Diagram</h2>
<?php configMenu();?>
<section class="sampleBody">
<h3 class="z">Dia. 1</h3>
<?php
$src=$scripts["Diagram"];
if ($sample=="Bamboo") $params="data-maxigos-in3d-on=\"1\""; else $params="";
$sgf="_sgf/game/blood-vomit-".$lang.".sgf";
oneScript($src,$params,$sgf);
?>
</section>
<section class="sampleBody">
<h3 class="z">Dia. 2</h3>
<?php
$src=$scripts["Diagram"];
$params="data-maxigos-points-num-max=\"19\"";
if ($sample=="Bamboo") $params.=" data-maxigos-in3d-on=\"1\"";
if ($lang=="ja") $sgf="_sgf/joseki/j1-ja.sgf";
else $sgf="_sgf/joseki/j1.sgf";
oneScript($src,$params,$sgf);
?>
</section>
<section class="sampleBody">
<h3 class="z">Dia. 3</h3>
<?php
$src=$scripts["Diagram"];
$params="data-maxigos-points-num-max=\"19\"";
if ($sample=="Bamboo") $params.=" data-maxigos-in3d-on=\"1\"";
$sgf="_sgf/joseki/j2.sgf";
oneScript($src,$params,$sgf);
?>
</section>
<section class="sampleBody">
<h3 class="z">Dia. 4</h3>
<?php
$src=$scripts["Diagram"];
$params="data-maxigos-indices-on=\"1\"";
$params.=" data-maxigos-numbering-on=\"1\"";
$params.=" data-maxigos-points-num-max=\"0\"";
if ($sample=="Bamboo") $params.=" data-maxigos-in3d-on=\"1\"";
$sgf="_sgf/joseki/j2.sgf";
oneScript($src,$params,$sgf);
?>
</section>
<section class="sampleBody">
<h3 class="z">Dia. 5</h3>
<?php
$src=$scripts["Diagram"];
$params="data-maxigos-indices-on=\"0\"";
$params.=" data-maxigos-points-num-max=\"0\"";
if ($sample=="Bamboo") $params.=" data-maxigos-in3d-on=\"1\"";
if ($lang=="fr")
	$sgf="\n(\n;FF[4]GM[1]SZ[19]\n;LB[jj:Centre][cc:Coin][jc:Bord][jq:Bord du bas]\n)";
else if ($lang=="ja")
	$sgf="\n(\n;FF[4]GM[1]SZ[19]\n;LB[jj:中央][cc:隅][jc:辺][qq:右下隅]\n)";
else if ($lang=="zh-hans")
	$sgf="\n(\n;FF[4]GM[1]SZ[19]\n;LB[jj:中心][cc:角][jc:辺]\n)";
else if ($lang=="zh-hant")
	$sgf="\n(\n;FF[4]GM[1]SZ[19]\n;LB[jj:中心][cc:角][jc:辺]\n)";
else
	$sgf="\n(\n;FF[4]GM[1]SZ[19]\n;LB[jj:Center][cc:Corner][jc:Edge][jq:Bottom edge]\n)";
oneScript($src,$params,$sgf);
?>
</section>
</section>
<?php }?>

<?php if (file_exists($scripts["Edit"])) {?>
<section id="edit" class="sample">
<h2 class="z">Edit</h2>
<?php configMenu();?>
<section class="sampleBody">
<h3 class="z">19x19</h3>
<?php
$src=$scripts["Edit"];
$params="";
$sgf="";
oneScript($src,$params,$sgf);
?>
</section>
</section>
<?php }?>

<?php if (file_exists($scripts["Game"])) {?>
<section id="game" class="sample">
<h2 class="z">Game</h2>
<?php configMenu();?>
<section class="sampleBody">
<h3 class="z">19x19</h3>
<?php
$src=$scripts["Game"];
if ($sample=="Bamboo") $params="data-maxigos-in3d-on=\"1\""; else $params="";
$sgf="_sgf/game/blood-vomit-".$lang.".sgf";
oneScript($src,$params,$sgf);
?>
</section>
<section class="sampleBody">
<h3 class="z">9x9</h3>
<?php
$src=$scripts["Game"];
if ($sample=="Bamboo") $params="data-maxigos-in3d-on=\"1\""; else $params="";
$sgf="_sgf/game/TV9x9-".(($lang=="fr")?"fr":"en").".sgf";
oneScript($src,$params,$sgf);
?>
</section>
</section>
<?php }?>

<?php if (file_exists($scripts["Kifu"])) {?>
<section id="kifu" class="sample">
<h2 class="z">Kifu</h2>
<?php configMenu();?>
<section class="sampleBody">
<h3 class="z">19x19</h3>
<?php
$src=$scripts["Kifu"];
if ($sample=="Bamboo") $params="data-maxigos-in3d-on=\"1\""; else $params="";
$sgf="_sgf/game/blood-vomit-".$lang.".sgf";
oneScript($src,$params,$sgf);
?>
</section>
</section>
<?php }?>

<?php if (file_exists($scripts["Lesson"])) {?>
<section id="lesson" class="sample">
<h2 class="z">Lesson</h2>
<?php configMenu();?>
<section class="sampleBody">
<h3 class="z">19x19</h3>
<?php
$src=$scripts["Lesson"];
$params="data-maxigos-points-num-max=\"0\"";
if ($sample=="Bamboo") $params.=" data-maxigos-in3d-on=\"1\"";
$sgf="_sgf/game/mn-bdg-".(($lang=="fr")?"fr":"en").".sgf";
oneScript($src,$params,$sgf);
?>
</section>
<section class="sampleBody">
<h3 class="z">9x9</h3>
<?php
$src=$scripts["Lesson"];
if ($sample=="Bamboo") $params="data-maxigos-in3d-on=\"1\""; else $params="";
$sgf="_sgf/game/TV9x9-".(($lang=="fr")?"fr":"en").".sgf";
oneScript($src,$params,$sgf);
?>
</section>
</section>
<?php }?>

<?php if (file_exists($scripts["Loop"])) {?>
<section id="loop" class="sample">
<h2 class="z">Loop</h2>
<?php configMenu();?>
<section class="sampleBody">
<h3 class="z">Seq. 1</h3>
<?php
$src=$scripts["Loop"];
if ($sample=="Bamboo") $params="data-maxigos-in3d-on=\"1\""; else $params="";
$sgf="_sgf/joseki/j1.sgf";
oneScript($src,$params,$sgf);
?>
</section>
<section class="sampleBody">
<h3 class="z">Seq. 2</h3>
<?php
$src=$scripts["Loop"];
if ($sample=="Bamboo") $params="data-maxigos-in3d-on=\"1\""; else $params="";
$sgf="_sgf/joseki/j2.sgf";
oneScript($src,$params,$sgf);
?>
</section>
</section>
<?php }?>

<?php if (file_exists($scripts["Problem"])) {?>
<section id="problem" class="sample">
<h2 class="z">Problem</h2>
<?php configMenu();?>
<section class="sampleBody">
<h3 class="z">Prob. 3</h3>
<?php
$src=$scripts["Problem"];
if ($sample=="Bamboo") $params="data-maxigos-in3d-on=\"1\""; else $params="";
$sgf="_sgf/problem/p3-".$lang.".sgf";
oneScript($src,$params,$sgf);
?>
</section>
</section>
<?php }?>

<?php if (file_exists($scripts["Replay"])) {?>
<section id="replay" class="sample">
<h2 class="z">Replay</h2>
<?php configMenu();?>
<section class="sampleBody">
<h3 class="z">19x19</h3>
<?php
$src=$scripts["Replay"];
if ($sample=="Bamboo") $params="data-maxigos-in3d-on=\"1\""; else $params="";
$sgf="_sgf/game/blood-vomit-".$lang.".sgf";
oneScript($src,$params,$sgf);
?>
</section>
<section class="sampleBody">
<h3 class="z">9x9</h3>
<?php
$src=$scripts["Replay"];
if ($sample=="Bamboo") $params="data-maxigos-in3d-on=\"1\""; else $params="";
$sgf="_sgf/game/TV9x9-".(($lang=="fr")?"fr":"en").".sgf";
oneScript($src,$params,$sgf);
?>
</section>
</section>
<?php }?>

<?php if (file_exists($scripts["Score"])) {?>
<section id="score" class="sample">
<h2 class="z">Score</h2>
<?php configMenu();?>
<section class="sampleBody">
<h3 class="z">19x19</h3>
<?php
$src=$scripts["Score"];
if ($sample=="Bamboo") $params="data-maxigos-in3d-on=\"1\""; else $params="";
$sgf="";
oneScript($src,$params,$sgf);
?>
</section>
</section>
<?php }?>

<?php if (file_exists($scripts["Tree"])) {?>
<section id="tree" class="sample">
<h2 class="z">Tree</h2>
<?php configMenu();?>
<section class="sampleBody">
<h3 class="z">19x19</h3>
<?php
$src=$scripts["Tree"];
$params="data-maxigos-indices-on=\"0\"";
if ($sample=="Bamboo") $params.=" data-maxigos-in3d-on=\"1\"";
$sgf="_sgf/game/mn-bdg-".(($lang=="fr")?"fr":"en").".sgf";
oneScript($src,$params,$sgf);
?>
</section>
<section class="sampleBody">
<h3 class="z">9x9</h3>
<?php
$src=$scripts["Tree"];
if ($sample=="Bamboo") $params="data-maxigos-in3d-on=\"1\""; else $params="";
$sgf="_sgf/game/TV9x9-".(($lang=="fr")?"fr":"en").".sgf";
oneScript($src,$params,$sgf);
?>
<?php if(kogo()){?>
</section>
<section class="sampleBody">
<h3 class="z">Kogo</h3>
<?php
$src=$scripts["Tree"];
if ($sample=="Bamboo") $params="data-maxigos-in3d-on=\"1\""; else $params="";
$sgf=kogo();
oneScript($src,$params,$sgf);
?>
<?php }?>
</section>
</section>
<?php }?>

<?php if (file_exists($scripts["Zero"])) {?>
<section id="zero" class="sample">
<h2 class="z">Zero</h2>
<?php configMenu();?>
<section class="sampleBody">
<h3 class="z">19x19</h3>
<?php
$src=$scripts["Zero"];
if ($sample=="Bamboo") $params=" data-maxigos-in3d-on=\"1\""; else $params="";
$sgf="_sgf/game/mn-bdg-".(($lang=="fr")?"fr":"en").".sgf";
oneScript($src,$params,$sgf);
?>
</section>
<section class="sampleBody">
<h3 class="z">9x9</h3>
<?php
$src=$scripts["Zero"];
if ($sample=="Bamboo") $params="data-maxigos-in3d-on=\"1\""; else $params="";
$sgf="_sgf/game/TV9x9-".(($lang=="fr")?"fr":"en").".sgf";
oneScript($src,$params,$sgf);
?>
</section>
</section>
<?php }?>

<?php if ($sample=="Rosewood") {?>
<p class="z reference" lang="en">
<a href="http://lena-bitty.deviantart.com/art/Chinese-Dragon-334787136">Chinese Dragon</a>, Lena Bitty,
<a href="http://creativecommons.org/licenses/by-nd/3.0/">Creative Commons Attribution-No Derivative Works 3.0 License</a>
</p>
<?php }?>
<?php }?>

<?php if (($sample=="Classic")&&($lang=="fr")) {?>
<a class="aloneLink" href="classic/classic-sample-fr.html"><?=$aloneScriptSample?></a>
<?php } else if ($sample=="Classic") {?>
<a class="aloneLink" href="classic/classic-sample-en.html"><?=$aloneScriptSample?></a>
<?php } else if (($sample=="Minimalist")&&($lang=="fr")) {?>
<a class="aloneLink" href="minimalist/minimalist-sample-fr.html"><?=$aloneScriptSample?></a>
<?php } else if ($sample=="Minimalist") {?>
<a class="aloneLink" href="minimalist/minimalist-sample-en.html"><?=$aloneScriptSample?></a>
<?php } else if (($sample=="NeoClassic")&&($lang=="fr")) {?>
<a class="aloneLink" href="neo-classic/neo-classic-sample-fr.html"><?=$aloneScriptSample?></a>
<?php } else if (($sample=="NeoClassic")) {?>
<a class="aloneLink" href="neo-classic/neo-classic-sample-en.html"><?=$aloneScriptSample?></a>
<?php } else if (($sample=="Rosewood")&&($lang=="fr")) {?>
<a class="aloneLink" href="rosewood/rosewood-sample-fr.html"><?=$aloneScriptSample?></a>
<?php } else if ($sample=="Rosewood") {?>
<a class="aloneLink" href="rosewood/rosewood-sample-en.html"><?=$aloneScriptSample?></a>
<?php } else if (($sample=="Tatami")&&($lang=="fr")) {?>
<a class="aloneLink" href="tatami/tatami-sample-fr.html"><?=$aloneScriptSample?></a>
<?php } else if ($sample=="Tatami") {?>
<a class="aloneLink" href="tatami/tatami-sample-en.html"><?=$aloneScriptSample?></a>
<?php } else if (($sample=="Troyes")&&($lang=="fr")) {?>
<a class="aloneLink" href="troyes/troyes-sample-fr.html"><?=$aloneScriptSample?></a>
<?php } else if ($sample=="Troyes") {?>
<a class="aloneLink" href="troyes/troyes-sample-en.html"><?=$aloneScriptSample?></a>
<?php }?>

<p class="z computedData">
<?=$ExecutionTimeLabel?><span class="executionTime">0</span>, 
<span class="maxigosNum">0</span><?=$maxigosNumLabel?>, 
<?=$pageWidthLabel?><span class="pageWidth">0</span>
</p>
</main>

<footer id="bottom">
<?php
themeMenu();
langMenu();
?>
</footer>

</body>
</html>
