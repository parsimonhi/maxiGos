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
$standaloneScriptSample="Standalone script sample";
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
	$standaloneScriptSample="Exemple de script autonome";
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
	$standaloneScriptSample="単独スクリプト例";
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
	$standaloneScriptSample="独立脚本示例";
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
	$standaloneScriptSample="獨立腳本示例";
}
if($sample=="Bordeaux") $subtitle="Bordeaux";
else if($sample=="Manuscript") $subtitle="Manuscript";
else if($sample=="Minimalist") $subtitle="Minimalist";
else if($sample=="Multilang") $subtitle="Multilang";
else if($sample=="NeoClassic") $subtitle="NeoClassic";
else if($sample=="Rosewood") $subtitle="Rosewood";
else if($sample=="Tsumego") $subtitle="Tsumego";
else $subtitle=$sample;
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
	$s.="<a lang=\"en\" href=\"?sample=$sample&lang=en\"><img width=\"30\" height=\"20\" alt=\"english\" src=\"../_img/flag/en.svg\"></a>\n";
	$s.="<a lang=\"fr\" href=\"?sample=$sample&lang=fr\"><img width=\"30\" height=\"20\" alt=\"français\" src=\"../_img/flag/fr.svg\"></a>\n";
	$s.="<a lang=\"ja\" href=\"?sample=$sample&lang=ja\"><img width=\"30\" height=\"20\" alt=\"日本語\" src=\"../_img/flag/ja.svg\"></a>\n";
	$s.="<a lang=\"zh-hans\" href=\"?sample=$sample&lang=zh-hans\"><img width=\"30\" height=\"20\" alt=\"简体字\" src=\"../_img/flag/zh-cn.svg\"></a>\n";
	$s.="<a lang=\"zh-hant\" href=\"?sample=$sample&lang=zh-hant\"><img width=\"30\" height=\"20\" alt=\"繁體字\" src=\"../_img/flag/zh-tw.svg\"></a>\n";
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
	let list,s=mxG.D?mxG.D.length-1:""; // no Maxigos found when loader?
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
function doKeydownNav(ev)
{
	if(ev.metaKey||ev.ctrlKey||ev.altKey) return;
	let r=0,e=ev.target.parentNode;
	if(ev.key.match(/^[acz]$/i))
	{
		if(ev.key.match(/^a$/i)) {e.querySelector('a:first-of-type').focus();r=1;}
		else if(ev.key.match(/^z$/i)) {e.querySelector('a:last-of-type').focus();r=1;}
		else if(ev.key.match(/^c$/i)) location.href="#h1Content";
		if(r) ev.preventDefault();
	}
}
function initNav()
{
	let list=document.querySelectorAll('nav a');
	for(let k=0;k<list.length;k++)
		list[k].addEventListener('keydown',function(ev){doKeydownNav(ev);});
}
window.addEventListener("load",initNav);
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
	min-width:6.25em; /* or 100px, min-width of Chrome when max zoom */
}
header, footer, section.sample>nav
{
	background:#0002;
}
section.sampleBody
{
	padding:0.125em;
}
header nav, footer nav, section.sample>nav
{
	display:flex;
	flex-wrap:wrap;
}
header nav a, footer nav a, section.sample>nav a
{
	color:#000;
	margin:0.5em;
}
header nav img, footer nav img
{
	width:1.875em;
	height:auto;
	margin:auto;
}
/* hyphens:auto does not work well enough everywhere (2024/03/01) */
/* use overflow-wrap:anywhere as a general workaround */
/* options and header components in Fm config use also overflow-wrap (see in maxiGos) */
/* shortHeader (in cartouche component) uses also overflow-wrap (see in maxiGos) */
/* comment and header in other components are not concerned since they can be scrolled */
h1,h2,h3,button,a,dialog,p,span {overflow-wrap:anywhere;}
nav a:has(img) {display:flex;}
.sample>ul {margin:0;padding:1em;}
h1.z
{
	font-size:1.5em;
	margin:0.25em;
	padding:0;
}
h2.z
{
	font-size:1.25em;
	margin:0;
	padding:0.33em;
	background:#000;
	color:#fff;
}
h3.z
{
	font-size:1em;
	text-align:center;
	margin:1em 0 0.5em 0;
}
p.z
{
	margin:1em 0.5em;
}
p.z a
{
	color:inherit;
}
.aloneLink
{
	display:inline-block;
	color:#000;
	padding:1em 0.5em;
}
div.mxGlobal
{
	margin:1em auto;
	/*
	resize:horizontal;
	overflow:auto;
	--gobanScale:1;
	background-color:#fff;
	filter:invert(100%);
	*/
}
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
.BambooSample .mxMinimalistTheme:not(.mxEditConfig) div.mxGobanBox
{
	border:0;
}
.BambooSample .mxMinimalistTheme:not(.mxEditConfig) .mxGobanBox svg
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
.BordeauxSample .mxMinimalistTheme:not(.mxEditConfig) div.mxGobanBox
{
	border-color:#0000;
	background:#0007;
}
.BordeauxSample .mxMinimalistTheme:not(.mxEditConfig) .mxGobanContent svg
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
<?php } ?>
<?php if (($sample=="Dark")||($sample=="Mixed")) {?>
.DarkSample
{
	background:#666;
	padding-bottom:1em;
}
.DarkSample div.mxGlobal
{
	background:#0007;
	resize:horizontal;
	overflow:auto;
}
.DarkSample div.mxGlobal .mxNavigationBox
{
	background:#0007;
}
.DarkSample div.mxGlobal .mxNavigationBox svg
{
	filter:invert(100%);
}
.DarkSample .mxGlobal .mxGobanLines
{
	stroke:#fff;
}
.DarkSample .mxGlobal .mxStars
{
	stroke:#fff;
	fill:#fff;
}
.DarkSample .mxGlobal .mxIndices text,
.DarkSample .mxGlobal text.mxOnEmpty
{
	fill:#fff;
	stroke:none;
}
.DarkSample .mxGlobal .mxMark.mxOnEmpty:not(.mxPointBackground)
{
	fill:none;
	stroke:#fff;
}
.DarkSample .mxGlobal rect.mxPointBackground.mxVariation.mxOnFocus
{
	fill:#000;
	stroke:#fff;
}
.DarkSample .mxGlobal rect.mxPointBackground
{
	fill:#000;
	stroke:#000;
}
<?php }?>
<?php if ($sample=="Charset") { ?>
.computedData {display:none;}
<?php }?>
<?php if ($sample=="Fm") { ?>
.FmSample
{
	--FmThemeWidth:60rem; /* rem, not em, since it is used for a h1 later */
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
	max-width:var(--FmThemeWidth);
	margin:0 auto;
}
.FmSample>main
{
	background:#eeb;
	margin-top:0;
	padding:1vw;
}
.FmSample .banner
{
	list-style-type:none;
	max-width:var(--FmThemeWidth);
	margin:0 auto;
	padding:0;
	display:flex;
}
.FmSample .banner img
{
	display:block;
	width:100%;
	height:auto;
	width:100%;
	height:auto;
}
.FmSample>h1
{
	box-sizing:border-box;
	position:relative;
	z-index:1;
	min-width:0;
	max-width:var(--FmThemeWidth);
	text-align:center;
	margin:0 auto;
	color:#090;
	background:#eeb;
	padding:0.5em;
}
.FmSample>h1:after
{
	content:url(../_img/other/go.svg);
	position:absolute;
	z-index:-1;
	display:block;
	font-size:min(5vw,1em);
	width:1.5em;
	height:1.5em;
	line-height:1.5em;
	padding:0.125em;
	top:0.25em;
	right:0.25em;
	border:0.03125em solid #000;
	border-radius:50%;
	background:#fff;
}
.FmSample footer nav
{
	background:#666;
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
.JdgSample
{
	font-family:"Avenir Next","Segoe UI",sans-serif;
}
.JdgSample #diagram h3
{
	text-align:left;
}
.JdgSample #diagram .sampleBody
{
	padding:0.5em;
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
.ManuscriptSample .mxMinimalistTheme.mxKifuConfig .mxHeaderBox
{
	border:1px solid #696;
	margin-bottom:1em;
	padding:0.5em;
	color:#33f;
	font-family:var(--manuscriptFontFamily);
	font-weight:bold;
}
.ManuscriptSample .mxMinimalistTheme.mxKifuConfig .mxHeaderBox .mxHeaderTitle
{
	text-align:center;
}
.ManuscriptSample .mxMinimalistTheme.mxKifuConfig .mxHeaderBox p
{
	margin:0;
}
.ManuscriptSample .mxMinimalistTheme.mxKifuConfig .mxHeaderBox .mxHeaderContent span
{
	color:#696;
	font-family:Arial,sans-serif;
	font-weight:normal;
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
.ManuscriptSample .mxMinimalistTheme .mxNavigationBox polygon,
.ManuscriptSample .mxMinimalistTheme .mxNavigationBox rect
{
	fill:#696;
}
.ManuscriptSample .mxMinimalistTheme .mxNavigationBox button:focus
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
#rfg div.mxGlobal
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
.TactigoSample div.mxGlobal.mxMinimalistTheme
{
	display:flex;
	flex-direction:column;
}
.TactigoSample div.mxGlobal .mxCommentDiv
{
	order:3;
}
.TactigoSample div.mxGlobal .mxGobanSvg
{
	box-shadow:2px 2px 16px rgba(0,0,0,0.3);
}
.TactigoSample div.mxGlobal .mxGobanSvg .mxWholeRect
{
	fill:#e6bb7c;
}
.TactigoSample div.mxGlobal .mxGobanSvg .mxGobanLines
{
	stroke:#333;
}
.TactigoSample div.mxGlobal .mxGobanSvg .mxStars
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
	container:mxTsumegoMain/inline-size;
	padding:0 min(2.5vw,0.25em);
}
.TsumegoSample h1,
.TsumegoSample .computedData,
.TsumegoSample p.z,
.TsumegoSample div.mxGlobal
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
	margin:min(20vw,2em) auto;
	border-radius:1em;
	box-shadow:0.125em 0.125em 0.375em #ccc;
	max-width:max-content;
}
.TsumegoSample section h2
{
	box-sizing:border-box;
	display:flex;
	flex-wrap:wrap;
	gap:min(5vw,0.5em);
	justify-content:center;
	align-items:center;
	width:100%;
	font-size:1.5em;
	background:var(--tsumegoBk);
	border-radius:0.67em 0.67em 0 0;
	margin:0;
	padding:min(5vw,0.5em);
	text-align:center;
	font-weight:300;
	color:#fff;
}
.TsumegoSample section h2>span:last-of-type
{
	display:inline-block;
	min-height:1.5em;
	line-height:1.5em;
	font-size:0.5em;
	margin:0 min(5vw,1em);
	padding:0 min(5vw,0.5em);
	border-radius:0.75em;
	background:#fff;
	vertical-align:middle;
}
.TsumegoSample section h2>span:last-of-type>span:first-of-type
{
	color:#ed0;
	white-space:nowrap;
}
.TsumegoSample section h2>span:last-of-type>span:last-of-type
{
	color:#ddd;
	white-space:nowrap;
}
.TsumegoSample div.mxGlobal
{
	display:grid;
	max-width:none;
	margin:min(5vw,1em) 0;
	padding:min(5vw,1em) min(5vw,2em);
}
.TsumegoSample div.mxGlobal .mxGobanBox svg
{
	grid-row:1;
}
.TsumegoSample div.mxGlobal .mxGobanBox svg
{
	background-image:url(../_img/bk/kaya-mini.jpg);
	background-size:100% 100%;
	background-repeat:no-repeat;
}
.TsumegoSample div.mxGlobal .mxGobanBox .mxMarkOnLast
{
	fill:#f00;
}
.TsumegoSample div.mxGlobal .mxGobanBox .mxFocus rect
{
	stroke:#f00;
	stroke-width:1.5px;
}
.TsumegoSample div.mxGlobal .mxSolveBox
{
	grid-row:2;
	display:flex;
	justify-content:center;
	align-items:center;
	margin:min(5vw,1em) 0 0 0;
	padding:0;
	gap:min(5vw,1em);
}
.TsumegoSample div.mxGlobal .mxSolveBox button
{
	flex:1;
	max-width:min(40vw,4em);
	max-height:min(40vw,4em);
	width:auto;
	height:auto;
	aspect-ratio:1;
	margin:0;
	padding:min(10vw,1em);
	box-shadow:0.125em 0.125em 0.375em #ccc;
	background:#fff;
}
.TsumegoSample div.mxGlobal .mxSolveBox button svg path
{
	fill:var(--tsumegoBk);
}
.TsumegoSample div.mxGlobal .mxSolveBox button:focus:not([disabled]),
.TsumegoSample div.mxGlobal .mxSolveBox button:hover:not([disabled])
{
	background:var(--tsumegoBk);
}
.TsumegoSample div.mxGlobal .mxSolveBox button:focus:not([disabled]) svg path,
.TsumegoSample div.mxGlobal .mxSolveBox button:hover:not([disabled]) svg path
{
	fill:#fff;
}
.TsumegoSample div.mxGlobal .mxSolveBox button[disabled]
{
	box-shadow:0.125em 0.125em 0.375em #999;
}
.TsumegoSample div.mxGlobal .mxSolveBox button[disabled] svg path
{
	fill:#000;
}
.TsumegoSample div.mxGlobal .mxCommentBox
{
	grid-row:3;
	margin:min(5vw,1em) 0 0 0;
	max-width:var(--gobanMaxWidth);
}
.TsumegoSample div.mxGlobal .mxCommentBox p
{
	margin:min(5vw,0.5em);
}
@container mxTsumegoMain (min-width:40em)
{
	.TsumegoSample div.mxGlobal
	{
		padding:1em 2em;
	}
	.TsumegoSample div.mxGlobal .mxCommentBox
	{
		grid-column:1;
		grid-row:2;
		margin:1em 0 0 0;
	}
	.TsumegoSample div.mxGlobal .mxGobanBox
	{
		grid-column:1;
		grid-row:1;
	}
	.TsumegoSample div.mxGlobal .mxSolveBox
	{
		grid-column:2;
		grid-row:1;
		flex-direction:column;
		margin:0 0 0 2em;
		gap:1em;
	}
}
<?php }?>
<?php if (($sample=="Zanzibar")||($sample=="Mixed")) {?>
/* Zanzibar */
.ZanzibarSample
{
	background:#1eb63b;
	padding-bottom:1px;
}
.ZanzibarSample div.mxGlobal .mxGobanBox svg
{
	background:#00a3dd;
}
.ZanzibarSample div.mxGlobal .mxGobanBox svg radialGradient:nth-of-type(2) stop:nth-of-type(1)
{
	stop-color:#fcd117;
}
.ZanzibarSample div.mxGlobal .mxGobanBox svg radialGradient:nth-of-type(2) stop:nth-of-type(2)
{
	stop-color:#cca117;
}
.ZanzibarSample div.mxGlobal .mxGobanBox svg radialGradient:nth-of-type(2) stop:nth-of-type(3)
{
	stop-color:#3c1117;
}
.ZanzibarSample div.mxGlobal .mxGobanBox svg .mxMarkOnLast.mxOnBlack
{
	fill:#deb317;
}
.ZanzibarSample div.mxGlobal .mxGobanBox svg .mxMarkOnLast.mxOnWhite
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
<li><img width="200" height="300" src="../_img/prints/1.webp" alt=""></li>
<li><img width="200" height="300" src="../_img/prints/2.webp" alt=""></li>
<li><img width="200" height="300" src="../_img/prints/3.webp" alt=""></li>
<li><img width="200" height="300" src="../_img/prints/4.webp" alt=""></li>
<li><img width="200" height="300" src="../_img/prints/5.webp" alt=""></li>
</ul>
<?php } ?>
</header>

<?php if ($sample=="Tactigo") { ?>
<h1 class="z" id="h1Content"><a href="http://tactigo.free.fr/"><?=$title." - ".$subtitle?></a></h1>
<?php } else {?>
<h1 class="z" id="h1Content"><?=$title." - ".$subtitle?></h1>
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
<p class="z">Theme = Minimalist (<?=$modifiedLabel?>), config = Kifu</p>
<script src="<?=$scripts["Kifu"]?>"
		data-maxigos-stretching="0,1,1,2"
		data-maxigos-grid-padding="4"
		data-maxigos-erase-grid-under="0"
		data-maxigos-version-box-on="1"
		data-maxigos-sgf="_sgf/game/blood-vomit-<?=$lang?>.sgf"
>
</script>
<?php } else if ($sample=="Iframe") { ?>
<p class="z">Theme = NeoClassic + Iframe</p>
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
<section class="DarkSample">
<h2 class="z">Dark</h2>
<script
	src="minimalist/_maker/basic.php"
	data-maxigos-in3d-on="1"
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
<p class="z">Theme = Minimalist, config = Game</p>
<section class="MultilangSample">
<section class="sample">
<h2 lang="en" class="z">English (lang = "en")</h2>
<script lang="en" src="minimalist/_maker/game.php"
data-maxigos-sgf="_sgf/game/blood-vomit-en.sgf">
</script>
</section>
<section class="sample">
<h2 lang="fr" class="z">Français (lang = "fr")</h2>
<script lang="fr" src="minimalist/_maker/game.php"
data-maxigos-sgf="_sgf/game/blood-vomit-fr.sgf">
</script>
</section>
<section class="sample">
<h2 lang="ja" class="z">日本語 (lang = "ja")</h2>
<script lang="ja" src="minimalist/_maker/game.php"
data-maxigos-sgf="_sgf/game/blood-vomit-ja.sgf">
</script>
</section>
<section class="sample">
<h2 lang="zh-hans" class="z">中文～简化字 (lang = "zh-hans")</h2>
<script lang="zh-hans" src="minimalist/_maker/game.php"
data-maxigos-sgf="_sgf/game/blood-vomit-zh-hans.sgf">
</script>
</section>
<section class="sample">
<h2 lang="zh-hant" class="z">中文～正體字 (lang = "zh-hant")</h2>
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
<p class="z">Theme = Minimalist, config = Diagram</p>
<section id="Rules" class="sample">
<iframe src="rules/rules-<?=(($lang=="fr")?"fr":"en")?>.php"></iframe>
</section>
<?php } else if ($sample=="Tactigo") {?>
<p class="z">Theme = Minimalist (<?=$modifiedLabel?>), config = Problem</p>
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
<p class="z">Theme = Tiger</p>
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
<p class="z">Theme = Minimalist (<?=$modifiedLabel?>), config = Problem</p>
<?php
	if($lang=="ja") $tsumego="詰め碁";
	else $tsumego="Tsumego";
?>
<section class="problem">
<h2><span><?=$tsumego?> 12x8</span><span><span>★★★</span><span>★★★</span></span></h2>
<script src="<?=$scripts["Problem"]?>"
		data-maxigos-in3d-on="1"
		data-maxigos-stretching="0,1,1,2"
		data-maxigos-sgf="_sgf/problem/p3-<?=$lang?>.sgf">
</script>
</section>
<section class="problem">
<h2><span><?=$tsumego?> 19x19</span><span><span>★★★</span><span>★★★</span></span></h2>
<script src="<?=$scripts["Problem"]?>"
		data-maxigos-in3d-on="1"
		data-maxigos-sgf="_sgf/problem/tactigo-<?=$lang?>.sgf">
</script>
</section>

<!------------------------------------->
<!-- Main themes + Bamboo + Bordeaux -->
<!------------------------------------->

<?php } else {?>
<?php if (($sample=="Bamboo")||($sample=="Bordeaux")) {?>
<p class="z">Theme = Minimalist (<?=$modifiedLabel?>)</p>
<?php }?>
<?php if (($sample=="Eidogo")) {?>
<p class="z">Theme = <a href="https://github.com/jkk/eidogo/tree/master">Eidogo</a>, code = <a href="https://github.com/parsimonhi/maxiGos">maxiGos</a></p>
<?php }?>
<?php if (($sample=="Forum")) {?>
<p class="z">Theme = Forum (<a href="https://www.gludion.com/go/">Goswf</a>)</p>
<?php }?>
<?php if (($sample=="Iroha")) {?>
<p class="z">Theme = Iroha</p>
<?php }?>
<?php if (($sample=="Kifla")) {?>
<p class="z">Theme = Kifla</p>
<?php }?>
<?php if (($sample=="WGo")) {?>
<p class="z">Theme = <a href="http://wgo.waltheri.net/">WGo</a>, code = <a href="https://github.com/parsimonhi/maxiGos">maxiGos</a></p>
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
if ($sample=="Bamboo") $params="data-maxigos-in3d-on=\"1\""; else $params="";
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
<section class="sampleBody">
<h3 class="z">13x13</h3>
<?php
$src=$scripts["Comment"];
$params="data-maxigos-indices-on=\"1\"";
if ($sample=="Bamboo") $params.=" data-maxigos-in3d-on=\"1\"";
$sgf="(;GM[1]FF[4]SZ[13])";
oneScript($src,$params,$sgf);
?>
</section>
<section class="sampleBody">
<h3 class="z">52x19</h3>
<?php
$src=$scripts["Comment"];
$params="data-maxigos-indices-on=\"1\"";
if ($sample=="Bamboo") $params.=" data-maxigos-in3d-on=\"1\"";
$sgf="_sgf/game/large.sgf";
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
if ($sample=="Bamboo") $params="data-maxigos-in3d-on=\"1\""; else $params="";
$sgf="_sgf/joseki/j1.sgf";
oneScript($src,$params,$sgf);
?>
</section>
<section class="sampleBody">
<h3 class="z">Dia. 3</h3>
<?php
$src=$scripts["Diagram"];
$params="data-maxigos-indices-on=\"1\"";
$params.=" data-maxigos-numbering-on=\"1\"";
if ($sample=="Bamboo") $params.=" data-maxigos-in3d-on=\"1\"";
$sgf="_sgf/joseki/j2.sgf";
oneScript($src,$params,$sgf);
?>
</section>
<section class="sampleBody">
<h3 class="z">Dia. 4</h3>
<?php
$src=$scripts["Diagram"];
$params="data-maxigos-indices-on=\"0\"";
if ($sample=="Bamboo") $params.=" data-maxigos-in3d-on=\"1\"";
if ($lang=="fr")
	$sgf="\n(\n;FF[4]GM[1]SZ[19]\n;LB[jj:Centre][cc:Coin][jc:Bord][qq:Coin en bas à droite]\n)";
else if ($lang=="ja")
	$sgf="\n(\n;FF[4]GM[1]SZ[19]\n;LB[jj:中央][cc:隅][jc:辺][qq:右下隅]\n)";
else if ($lang=="zh-hans")
	$sgf="\n(\n;FF[4]GM[1]SZ[19]\n;LB[jj:中心][cc:角][jc:辺][qq:右下角]\n)";
else if ($lang=="zh-hant")
	$sgf="\n(\n;FF[4]GM[1]SZ[19]\n;LB[jj:中心][cc:角][jc:辺][qq:右下角]\n)";
else
	$sgf="\n(\n;FF[4]GM[1]SZ[19]\n;LB[jj:Center][cc:Corner][jc:Edge][qq:Bottom right corner]\n)";
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
if ($sample=="Bamboo") $params="data-maxigos-in3d-on=\"1\""; else $params="";
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
<section class="sampleBody">
<h3 class="z">Prob. mini</h3>
<?php
$src=$scripts["Problem"];
if ($sample=="Bamboo") $params="data-maxigos-in3d-on=\"1\""; else $params="";
$sgf="(;GM[1]SZ[3:4](;B[bb])(;B[bc]))";
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
</section>
<?php if(kogo()){?>
<section class="sampleBody">
<h3 class="z">Kogo</h3>
<?php
$src=$scripts["Tree"];
if ($sample=="Bamboo") $params="data-maxigos-in3d-on=\"1\""; else $params="";
$sgf=kogo();
oneScript($src,$params,$sgf);
?>
</section>
<?php }?>
</section>
<?php }?>

<?php if (file_exists($scripts["Zero"])) {?>
<section id="zero" class="sample">
<h2 class="z">Zero</h2>
<?php configMenu();?>
<section class="sampleBody">
<h3 class="z">19x19</h3>
<?php
$params=(($sample=="Bamboo")?" data-maxigos-in3d-on=\"1\"":"");
oneScript($scripts["Zero"],$params,"_sgf/game/Hon-1941-1.sgf");
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
<a class="aloneLink" href="classic/classic-sample-fr.html"><?=$standaloneScriptSample?></a>
<?php } else if ($sample=="Classic") {?>
<a class="aloneLink" href="classic/classic-sample-en.html"><?=$standaloneScriptSample?></a>
<?php } else if (($sample=="Minimalist")&&($lang=="fr")) {?>
<a class="aloneLink" href="minimalist/minimalist-sample-fr.html"><?=$standaloneScriptSample?></a>
<?php } else if ($sample=="Minimalist") {?>
<a class="aloneLink" href="minimalist/minimalist-sample-en.html"><?=$standaloneScriptSample?></a>
<?php } else if (($sample=="NeoClassic")&&($lang=="fr")) {?>
<a class="aloneLink" href="neo-classic/neo-classic-sample-fr.html"><?=$standaloneScriptSample?></a>
<?php } else if (($sample=="NeoClassic")) {?>
<a class="aloneLink" href="neo-classic/neo-classic-sample-en.html"><?=$standaloneScriptSample?></a>
<?php } else if (($sample=="Rosewood")&&($lang=="fr")) {?>
<a class="aloneLink" href="rosewood/rosewood-sample-fr.html"><?=$standaloneScriptSample?></a>
<?php } else if ($sample=="Rosewood") {?>
<a class="aloneLink" href="rosewood/rosewood-sample-en.html"><?=$standaloneScriptSample?></a>
<?php } else if (($sample=="Tatami")&&($lang=="fr")) {?>
<a class="aloneLink" href="tatami/tatami-sample-fr.html"><?=$standaloneScriptSample?></a>
<?php } else if ($sample=="Tatami") {?>
<a class="aloneLink" href="tatami/tatami-sample-en.html"><?=$standaloneScriptSample?></a>
<?php } else if (($sample=="Troyes")&&($lang=="fr")) {?>
<a class="aloneLink" href="troyes/troyes-sample-fr.html"><?=$standaloneScriptSample?></a>
<?php } else if ($sample=="Troyes") {?>
<a class="aloneLink" href="troyes/troyes-sample-en.html"><?=$standaloneScriptSample?></a>
<?php }?>

<p class="z computedData">
<?=$ExecutionTimeLabel?><span class="executionTime">0</span>, 
<span class="maxigosNum">0</span><?=$maxigosNumLabel?>, <?=$pageWidthLabel?><span class="pageWidth">0</span>
</p>
</main>

<footer id="bottom">
<?php
themeMenu();
langMenu();
?>
</footer>
<?php if (isset($_GET["Z1"])) {?>
<script>
(function()
{
	// check i18n
	let a="",e;
	for (const key in mxG.Z.fr)
	{
		if(key!="Help_Data")
		{
			a+="/ "+key;
			if(mxG.Z.fr[key] instanceof Function) a+=" / function()<br>";
			else
			{
				a+=" / "+mxG.Z.fr[key];
				if(mxG.Z.ja) a+=" / "+((mxG.Z.ja[key]!==undefined)?"<span style=\"color:green;\">"+mxG.Z.ja[key]+"</span>":"<span style=\"color:red;\">Error</span>");
				if(mxG.Z["zh-hans"]) a+=" / "+((mxG.Z["zh-hans"][key]!==undefined)?"<span style=\"color:green;\">"+mxG.Z["zh-hans"][key]+"</span>":"<span style=\"color:red;\">Error</span>");
				if(mxG.Z["zh-hant"]) a+=" / "+((mxG.Z["zh-hant"][key]!==undefined)?"<span style=\"color:green;\">"+mxG.Z["zh-hant"][key]+"</span>":"<span style=\"color:red;\">Error</span>")+"<br>";
			}
		}
	}
	e=document.createElement("div");
	e.style.padding="1em";
	e.innerHTML=a;
	document.body.appendChild(e);
})();
</script>
<?php }?>
<?php if (isset($_GET["Z2"])) {?>
<script>
window.addEventListener('load',function()
{
	// check how many html elements are in the page
	function run()
	{
		let tn=[];
		function getElementChildNum(e)
		{
			let n=0,list=e.children;
			if(!list) return 0;
			for(let k=0;k<list.length;k++)
			{
				let t=list[k].tagName;
				tn[t]=tn[t]?tn[t]+1:1;
				n+=getElementChildNum(list[k]);
			}
			return n+list.length;
		}
		console.log(getElementChildNum(document.querySelector('html')),tn);
	}
	run();
	setTimeout(run,5000);
});
</script>
<?php }?>
</body>
</html>
