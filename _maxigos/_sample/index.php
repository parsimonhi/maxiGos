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

$basicScript=$folder."/_maker/basic.php";
$commentScript=$folder."/_maker/comment.php";
$diagramScript=$folder."/_maker/diagram.php";
$editScript=$folder."/_maker/edit.php";
$gameScript=$folder."/_maker/game.php";
$kifuScript=$folder."/_maker/kifu.php";
$lessonScript=$folder."/_maker/lesson.php";
$loopScript=$folder."/_maker/loop.php";
$problemScript=$folder."/_maker/problem.php";
$replayScript=$folder."/_maker/replay.php";
$scoreScript=$folder."/_maker/score.php";
$treeScript=$folder."/_maker/tree.php";
$zeroScript=$folder."/_maker/zero.php";

$lang=(isset($_GET["lang"])?$_GET["lang"]:"en");
$lang=safeValue($lang);
if(!in_array($lang,array("en","fr","ja","zh-hans","zh-hant"))) $lang="en";
$lang2=(($lang=="fr")?"fr":"en");
$title="Maxigos";
$HomeLabel="Home";
$DocumentationLabel="Documentation";
$ExecutionTimeLabel="Execution time: ";
$execNumOfMaxigosLabel=" Maxigos";
$modifiedLabel="modified";
$topLabel="Top";
$bottomLabel="Bottom";
if ($lang=="fr")
{
	$title="Maxigos";
	$HomeLabel="Accueil";
	$DocumentationLabel="Documentation";
	$ExecutionTimeLabel="Temps d'ex&eacute;cution&nbsp;: ";
	$execNumOfMaxigosLabel=" Maxigos";
	$modifiedLabel="modifi&eacute;";
	$topLabel="Haut";
	$bottomLabel="Bas";
}
else if ($lang=="ja")
{
	$title=mb_encode_numericentity("マキシゴス例",array (0x0,0xffff,0x0,0xffff),"UTF-8");
	$HomeLabel=mb_encode_numericentity("ホーム",array (0x0,0xffff,0x0,0xffff),"UTF-8");
	$DocumentationLabel="&#25991;&#26360;"; // 文書
	$ExecutionTimeLabel="&#23455;&#34892;&#26178;&#38291;: "; // 実行時間
	$execNumOfMaxigosLabel=mb_encode_numericentity("個のマキシゴス",array (0x0,0xffff,0x0,0xffff),"UTF-8");
	$modifiedLabel=mb_encode_numericentity("変更された",array (0x0,0xffff,0x0,0xffff),"UTF-8");
	$topLabel=mb_encode_numericentity("上",array (0x0,0xffff,0x0,0xffff),"UTF-8"); // or トップ?
	$bottomLabel=mb_encode_numericentity("下",array (0x0,0xffff,0x0,0xffff),"UTF-8"); // or ボトム?
}
else if ($lang=="zh-hans")
{
	$title=mb_encode_numericentity("Maxigos例",array (0x0,0xffff,0x0,0xffff),"UTF-8");
	$HomeLabel="&#39318;&#39029;"; // 首页
	$DocumentationLabel="&#25163;&#26126;&#20070;"; // 手明书
	$ExecutionTimeLabel="&#25191;&#34892;&#26102;&#38388;: "; // 执行时间
	$execNumOfMaxigosLabel=mb_encode_numericentity("个Maxigos",array (0x0,0xffff,0x0,0xffff),"UTF-8");
	$modifiedLabel=mb_encode_numericentity("修改",array (0x0,0xffff,0x0,0xffff),"UTF-8");
	$topLabel=mb_encode_numericentity("上",array (0x0,0xffff,0x0,0xffff),"UTF-8");
	$bottomLabel=mb_encode_numericentity("下",array (0x0,0xffff,0x0,0xffff),"UTF-8");
}
else if ($lang=="zh-hant")
{
	$title=mb_encode_numericentity("Maxigos例",array (0x0,0xffff,0x0,0xffff),"UTF-8");
	$HomeLabel=mb_encode_numericentity("首頁",array (0x0,0xffff,0x0,0xffff),"UTF-8");
	$DocumentationLabel=mb_encode_numericentity("手明書",array (0x0,0xffff,0x0,0xffff),"UTF-8");
	$ExecutionTimeLabel=mb_encode_numericentity("執行時間: ",array (0x0,0xffff,0x0,0xffff),"UTF-8");
	$execNumOfMaxigosLabel=mb_encode_numericentity("個Maxigos: ",array (0x0,0xffff,0x0,0xffff),"UTF-8");
	$modifiedLabel=mb_encode_numericentity("修改",array (0x0,0xffff,0x0,0xffff),"UTF-8");
	$topLabel=mb_encode_numericentity("上",array (0x0,0xffff,0x0,0xffff),"UTF-8");
	$bottomLabel=mb_encode_numericentity("下",array (0x0,0xffff,0x0,0xffff),"UTF-8");
}
$subtitle=$sample;
?>
<html lang="<?php echo $lang;?>">
<?php
$basic="Basic";
$comment="Comment";
$diagram="Diagram";
$edit="Edit";
$game="Game";
$kifu="Kifu";
$lesson="Lesson";
$loop="Loop";
$problem="Problem";
$replay="Replay";
$score="Score";
$tree="Tree";
$zero="Zero";
function themeMenu()
{
	global $lang;
	echo "<nav>\n";
	echo "<a href=\"?sample=Classic&lang=$lang\">Classic</a>\n";
	echo "<a href=\"?sample=Minimalist&lang=$lang\">Minimalist</a>\n";
	echo "<a href=\"?sample=NeoClassic&lang=$lang\">NeoClassic</a>\n";
	echo "<a href=\"?sample=Rosewood&lang=$lang\">Rosewood</a>\n";
	echo "<a href=\"?sample=Tatami&lang=$lang\">Tatami</a>\n";
	echo "<a href=\"?sample=Troyes&lang=$lang\">Troyes</a>\n";
	echo "</nav>\n";
	echo "<nav>\n";
	echo "<a href=\"?sample=Bamboo&lang=$lang\">Bamboo</a>\n";
	echo "<a href=\"?sample=BBCode&lang=$lang\">BBCode</a>\n";
	echo "<a href=\"?sample=Bordeaux&lang=$lang\">Bordeaux</a>\n";
	echo "<a href=\"?sample=Charset&lang=$lang\">Charset</a>\n";
	echo "<a href=\"?sample=Eidogo&lang=$lang\">Eidogo</a>\n";
	echo "<a href=\"?sample=Fm&lang=$lang\">Fm</a>\n";
	echo "<a href=\"?sample=Forum&lang=$lang\">Forum</a>\n";
	echo "<a href=\"?sample=Iframe&lang=$lang\">Iframe</a>\n";
	echo "<a href=\"?sample=Include&lang=$lang\">Include</a>\n";
	echo "<a href=\"?sample=Iroha&lang=$lang\">Iroha</a>\n";
	echo "<a href=\"?sample=Jdg&lang=$lang\">Jdg</a>\n";
	echo "<a href=\"?sample=Kifla&lang=$lang\">Kifla</a>\n";
	echo "<a href=\"?sample=Loader&lang=$lang\">Loader</a>\n";
	echo "<a href=\"?sample=Manuscript&lang=$lang\">Manuscript</a>\n";
	echo "<a href=\"?sample=Mixed&lang=$lang\">Mixed</a>\n";
	echo "<a href=\"?sample=Multilang&lang=$lang\">Multilang</a>\n";
	echo "<a href=\"?sample=Rfg&lang=$lang\">Rfg</a>\n";
	echo "<a href=\"?sample=Rules&lang=$lang\">Rules</a>\n";
	echo "<a href=\"?sample=Tactigo&lang=$lang\">Tactigo</a>\n";
	echo "<a href=\"?sample=Tiger&lang=$lang\">Tiger</a>\n";
	echo "<a href=\"?sample=Tsumego&lang=$lang\">Tsumego</a>\n";
	echo "<a href=\"?sample=WGo&lang=$lang\">WGo</a>\n";
	echo "</nav>\n";
}
function langMenu()
{
	global $sample,$lang,$lang2,$HomeLabel,$DocumentationLabel;
	echo "<nav>\n";
	echo "<a href=\"?sample=$sample&lang=en\"><img src=\"../_img/flag/en.svg\"></a>\n";
	echo "<a href=\"?sample=$sample&lang=fr\"><img src=\"../_img/flag/fr.svg\"></a>\n";
	echo "<a href=\"?sample=$sample&lang=ja\"><img src=\"../_img/flag/ja.svg\"></a>\n";
	echo "<a href=\"?sample=$sample&lang=zh-hans\"><img src=\"../_img/flag/zh-cn.svg\"></a>\n";
	echo "<a href=\"?sample=$sample&lang=zh-hant\"><img src=\"../_img/flag/zh-tw.svg\"></a>\n";
	echo "<a href=\"../../?lang=$lang\">$HomeLabel</a>\n";
	echo "<a href=\"../_doc/_$lang2/documentation.php\">$DocumentationLabel</a>\n";
	echo "</nav>\n";
}
function configMenu()
{
	global $sample;
	global $topLabel,$bottomLabel;
	global $basicScript,$commentScript,$diagramScript,$editScript,$gameScript;
	global $kifuScript,$lessonScript,$loopScript,$problemScript,$replayScript;
	global $scoreScript,$treeScript,$zeroScript;
	global $basic,$comment,$diagram,$edit,$game;
	global $kifu,$lesson,$loop,$problem,$replay;
	global $score,$tree,$zero;
	echo "<nav>\n";
	echo "<a href=\"#top\">$topLabel</a>\n";
	if (file_exists($basicScript)) echo "<a href=\"#basic\">$basic</a>\n";
	if (file_exists($commentScript)) echo "<a href=\"#comment\">$comment</a>\n";
	if (file_exists($diagramScript)) echo "<a href=\"#diagram\">$diagram</a>\n";
	if (file_exists($editScript)) echo "<a href=\"#edit\">$edit</a>\n";
	if (file_exists($gameScript)) echo "<a href=\"#game\">$game</a>\n";
	if (($sample=="Minimalist")&&file_exists($kifuScript)) echo "<a href=\"#kifu\">$kifu</a>\n";
	if (file_exists($lessonScript)) echo "<a href=\"#lesson\">$lesson</a>\n";
	if (file_exists($loopScript)) echo "<a href=\"#loop\">$loop</a>\n";
	if (file_exists($problemScript)) echo "<a href=\"#problem\">$problem</a>\n";
	if (file_exists($replayScript)) echo "<a href=\"#replay\">$replay</a>\n";
	if (file_exists($scoreScript)) echo "<a href=\"#score\">$score</a>\n";
	if (file_exists($treeScript)) echo "<a href=\"#tree\">$tree</a>\n";
	if (file_exists($zeroScript)) echo "<a href=\"#zero\">$zero</a>\n";
	echo "<a href=\"#bottom\">$bottomLabel</a>\n";
	echo "</nav>\n";
}
?>
<head>
<script>
var date1=new Date();
// to compute execution time of the page
if (typeof mxG=='undefined') mxG={};
if (!mxG.ExecutionTime) mxG.ExecutionTime=function()
{
	var e,s;
	s=<?php echo "\"".$ExecutionTimeLabel."\"";?>;
	s+=(new Date().getTime()-date1.getTime())+"ms";
	s+=" ("+(mxG.D?mxG.D.length-1:"0")+"<?php echo $execNumOfMaxigosLabel; ?>)";
	if (e=document.getElementById("ExecutionTimeId")) e.innerHTML=s;
	if (e=document.getElementById("ExecutionTimeBisId")) e.innerHTML=s;
};
</script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300..600&display=swap" rel="stylesheet">
<style>
body
{
	font-family:sans-serif;
	margin:0;
	padding:0;
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
div.executionTime {margin:0.5em;}
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
}
p.z
{
	margin:1em 0.5em;
}
div.aloneLink
{
	text-align:center;
}
div.aloneLink a
{
	color:#000;
}
div.mxGlobalBoxDiv
{
	margin-top:1em;
	margin-bottom:1em;
}
div.mxMinimalistTheme
{
	padding-left:1em;
	padding-right:1em;
}
div.mxMinimalistTheme.mxCommentConfig,
div.mxMinimalistTheme.mxEditConfig,
div.mxMinimalistTheme.mxLessonConfig,
div.mxMinimalistTheme.mxTreeConfig
{
	max-width:calc((var(--gobanMaxWidth) * 2) + 2em);
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
body.RosewoodSample div.reference
{
	margin-bottom:1em;
	text-align:center;
	font-size:0.5em;
}
body.RosewoodSample div.reference a
{
	color:#000;
	font-style:italic;
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
	background:#8b8;
	padding-bottom:1em;
}
.BambooSample section.sample>div:last-of-type,
section.sample section.BambooSample>div:last-of-type
{
	margin-bottom:0;
}
.BambooSample div.mxGlobalBoxDiv:not(.mxEditConfig) .mxGobanDiv svg
{
	background-image:url(../_img/bk/bamboo-mini.jpg);
	background-size:100% 100%;
	background-repeat:no-repeat;
}
.BambooSample .mxMinimalistTheme.mxCommentConfig .mxGobanDiv,
.BambooSample .mxMinimalistTheme.mxTreeConfig .mxGobanDiv
{
	border:0;
}
<?php } ?>
<?php if ($sample=="BBCode") { ?>
/* BBCode */
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
	background:#ddd;
	padding-bottom:1em;
}
.BordeauxSample section.sample>div:last-of-type,
section.sample section.BordeauxSample>div:last-of-type
{
	margin-bottom:0;
}
.BordeauxSample .mxMinimalistTheme.mxCommentConfig .mxGobanDiv,
.BordeauxSample .mxMinimalistTheme.mxTreeConfig .mxGobanDiv
{
	border:0;
}
.BordeauxSample .mxMinimalistTheme:not(.mxEditConfig) .mxInnerGobanDiv svg
{
	background:#a72926;
}
.BordeauxSample .mxMinimalistTheme:not(.mxEditConfig) .mxGobanLine
{
	stroke:#fff;
}
.BordeauxSample .mxMinimalistTheme:not(.mxEditConfig) .mxGobanDiv .mxMark.mxOnEmpty:not(.mxPointBackground)
{
	fill:none;
	stroke:#fff;
}
.BordeauxSample .mxMinimalistTheme:not(.mxEditConfig) .mxGobanDiv svg .mxIndices text
{
	stroke:#fff;
	fill:#fff;
}
.BordeauxSample .mxMinimalistTheme:not(.mxEditConfig) .mxStar
{
	stroke:#fff;
	fill:#fff;
}
.BordeauxSample .mxMinimalistTheme:not(.mxEditConfig) text.mxOnEmpty
{
	fill:#fff;
	stroke:#fff;
}
.BordeauxSample .mxMinimalistTheme:not(.mxEditConfig) rect.mxPointBackground.mxVariation.mxOnFocus
{
	fill:none;
	stroke:#fff;
}
.BordeauxSample .mxMinimalistTheme:not(.mxEditConfig) text.mxOnOutside
{
	fill:#fff;
	stroke:#fff;
}
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
/*.FmSample>header img,*/
.FmSample>main,
.FmSample>footer
{
	box-sizing:border-box;
	max-width:54em;
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
	max-width:54em;
	margin:0 auto;
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
	max-width:calc(54em / 2);
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
.FmSample .mxFmTheme
{
	--gobanMaxWidth:25em;
}
<?php } ?>
<?php if ($sample=="Forum") { ?>
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
.ForumSample section.sampleBody>h3
{
	color:#0f5289;
}
.ForumSample main>div.z.executionTime,
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
.ForumSample section.sampleBody
{
	padding-top:0.5em;
	padding-bottom:0.5em;
	border-radius:4px;
	margin:4px;
}
.ForumSample main>section.sample:nth-of-type(2n+1) section.sampleBody
{
	background:#e2ebf2;
}
.ForumSample main>section.sample:nth-of-type(2n) section.sampleBody
{
	background:#ecf3f7;
}
<?php } ?>
<?php if ($sample=="Iframe") { ?>
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
.ManuscriptSample .mxMinimalistTheme.mxKifuConfig .mxHeaderDiv h1
{
	text-align:center;
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
.ManuscriptSample .mxMinimalistTheme .mxIndice
{
	fill:#696;
	stroke:#696;
}
.ManuscriptSample .mxMinimalistTheme .mxGobanLine
{
	stroke:#696;
}
.ManuscriptSample .mxMinimalistTheme .mxStar
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
#flexicontent div.mxGlobalBoxDiv
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
.TactigoSample div.mxGlobalBoxDiv
{
	display:flex;
	flex-direction:column;
}
.TactigoSample div.mxGlobalBoxDiv .mxCommentDiv
{
	order:3;
}
.TactigoSample div.mxGlobalBoxDiv .mxInnerGobanDiv
{
	box-shadow:2px 2px 16px rgba(0,0,0,0.3);
}
.TactigoSample div.mxGlobalBoxDiv .mxGobanSvg .mxWholeRect
{
	fill:#e6bb7c;
}
.TactigoSample div.mxGlobalBoxDiv .mxGobanSvg .mxGobanLine
{
	stroke:#333;
}
.TactigoSample div.mxGlobalBoxDiv .mxGobanSvg .mxStar
{
	stroke:#333;
	fill:#333;
}
<?php } ?>
<?php if ($sample=="Tsumego") {?>
/* Tsumego */
.TsumegoSample h1,
.TsumegoSample .executionTime, .TsumegoSample p.z
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
.TsumegoSample section.sample
{
	padding:1em;
}
.TsumegoSample section.sample>section
{
	font-family:"Helvetica Neue",Arial,sans-serif;
	font-weight:300;
	margin:2em auto;
	padding:0;
	max-width:25em;
	border-radius:1em;
	box-shadow:0.125em 0.125em 0.375em #ccc;
}
.TsumegoSample section.sample>section:nth-of-type(2)
{
	max-width:35em;
}
.TsumegoSample section.sample>section:nth-of-type(2) div.mxGlobalBoxDiv
{
	--gobanMaxWidth:35em;
}
.TsumegoSample section.sample>section h2
{
	font-size:1.5em;
	background:#c2db8d;
	border-radius:0.67em 0.67em 0 0;
	margin:0;
	padding:0.5em;
	text-align:center;
	font-weight:300;
	color:#fff;
}
.TsumegoSample section.sample>section h2>span:first-of-type
{
	display:inline-block;
	margin:0 0.5em;
}
.TsumegoSample section.sample>section h2>span:last-of-type
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
.TsumegoSample section.sample>section h2>span:last-of-type>span:first-of-type
{
	color:#ed0;
}
.TsumegoSample section.sample>section h2>span:last-of-type>span:last-of-type
{
	color:#ddd;
}
.TsumegoSample div.mxGlobalBoxDiv
{
	display:grid;
	grid-template-columns:auto 15%;
	grid-template-rows:auto auto;
	grid-column-gap:2em;
	margin:0 auto;
	padding:2em;
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
}
.TsumegoSample div.mxGlobalBoxDiv .mxSolveDiv button
{
	box-shadow:0.125em 0.125em 0.375em #ccc;
	width:100%;
	padding:20%;
	margin:1em 0;
	background:#fff;
}
.TsumegoSample div.mxGlobalBoxDiv .mxSolveDiv button svg path
{
	fill:#c2db8d;
	stroke:#c2db8d;
	stroke-width:2px;
}
.TsumegoSample div.mxGlobalBoxDiv .mxSolveDiv button:focus:not([disabled]),
.TsumegoSample div.mxGlobalBoxDiv .mxSolveDiv button:hover:not([disabled])
{
	background:#c2db8d;
}
.TsumegoSample div.mxGlobalBoxDiv .mxSolveDiv button:focus:not([disabled]) svg path,
.TsumegoSample div.mxGlobalBoxDiv .mxSolveDiv button:hover:not([disabled]) svg path
{
	fill:#fff;
	stroke:#fff;
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
<title><?php echo $title;?></title>
</head>
<body class="<?php echo $sample;?>Sample">
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
<div class="banner">
<div><img src="../_img/prints/1-1.gif"></div>
<div><img src="../_img/prints/1-2.gif"></div>
<div><img src="../_img/prints/1-3.gif"></div>
<div><img src="../_img/prints/2-1.gif"></div>
<div><img src="../_img/prints/2-2.gif"></div>
<div><img src="../_img/prints/2-3.gif"></div>
<div><img src="../_img/prints/3-1.gif"></div>
<div><img src="../_img/prints/3-2.gif"></div>
<div><img src="../_img/prints/3-3.gif"></div>
<div><img src="../_img/prints/4-1.gif"></div>
<div><img src="../_img/prints/4-2.gif"></div>
<div><img src="../_img/prints/4-3.gif"></div>
<div><img src="../_img/prints/5-1.gif"></div>
<div><img src="../_img/prints/5-2.gif"></div>
<div><img src="../_img/prints/5-3.gif"></div>
</div>
<?php } ?>
</header>

<?php if ($sample=="Tactigo") { ?>
<h1 class="z"><a href="http://tactigo.free.fr/"><?php echo $title." - ".$subtitle;?></a></h1>
<?php } else {?>
<h1 class="z"><?php echo $title." - ".$subtitle;?></h1>
<?php }?>

<main>
<div class="z executionTime" id="ExecutionTimeId"></div>

<?php if ($sample=="Z") { ?>
<?php // for testings ?>
<?php } else if ($sample=="BBCode") { ?>
<section id="BBCode" class="sample">
<iframe src="BBCode/BBCode.php?lang=<?php echo $lang; ?>"></iframe>
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
<h2 class="z"><?php echo $h2; ?></h2>
<ul>
<li><a href="charset/sample-in-Big5.php?lang=<?php print $lang;?>">Big5</a></li>
<li><a href="charset/sample-in-GB18030.php?lang=<?php print $lang;?>">GB18030</a></li>
<li><a href="charset/sample-in-Shift_JIS.php?lang=<?php print $lang;?>">Shift_JIS</a></li>
<li><a href="charset/sample-in-UTF-8.php?lang=<?php print $lang;?>">UTF-8</a></li>
<li><a href="charset/sample-in-ISO-8859-1.php?lang=<?php print $lang;?>">ISO-8859-1</a></li>
</ul>
</section>
<?php } else if ($sample=="Fm") { ?>
<section id="fm" class="sample">
<section class="game">
<script src="<?php echo $gameScript; ?>"
		data-maxigos-sgf="_sgf/game/Hon-1941-1.sgf"
>
</script>
<script src="<?php echo $gameScript; ?>"
		data-maxigos-sgf="_sgf/game/TV9x9-<?php echo ($lang=="fr")?"fr":"en";?>.sgf"
>
</script>
</section>
</section>
<?php } else if ($sample=="Include") { ?>
<section id="include" class="sample">
<section class="comment">
<h2 class="z">Sgf filename => script data-maxigos-sgf</h2>
<script src="<?php echo $commentScript; ?>"
		data-maxigos-sgf="_sgf/game/blood-vomit-<?php echo $lang;?>.sgf"
>
</script>
</section>
<section class="comment">
<h2 class="z">Sgf filename => script tag content</h2>
<script src="<?php echo $commentScript; ?>"
>
_sgf/game/blood-vomit-<?php echo $lang;?>.sgf
</script>
</section>
<section class="comment">
<h2 class="z">Sgf record => script data-maxigos-sgf</h2>
<script src="<?php echo $commentScript; ?>"
		data-maxigos-sgf="<?php echo getSgfFromFileToAttribute('_sgf/game/blood-vomit-'.$lang.'.sgf'); ?>"
>
</script>
</section>
<section class="comment">
<h2 class="z">Sgf record => script tag content</h2>
<script src="<?php echo $commentScript; ?>"
>
<?php echo getSgfFromFileToContent('_sgf/game/blood-vomit-'.$lang.'.sgf'); ?>
</script>
</section>
</section>
<?php } else if ($sample=="Loader") { ?>
<section id="loader" class="sample">
<section class="loader">
<div data-maxigos="Game,Eidogo"
>
_sgf/game/blood-vomit-<?php echo $lang; ?>.sgf
</div>
<div data-maxigos="Problem,Eidogo"
>
_sgf/problem/p3-<?php echo $lang; ?>.sgf
</div>
<script src="_js/mgosLoader.js"></script>
</section>
</section>
<?php } else if ($sample=="Manuscript") { ?>
<p class="z">Theme=Minimalist (<?php echo $modifiedLabel;?>), Config=Kifu</p>
<section id="manuscript" class="sample">
<section class="kifu">
<script src="<?php echo $kifuScript; ?>"
		data-maxigos-stretching="0,1,1,2"
		data-maxigos-grid-padding="4"
		data-maxigos-erase-grid-under="0"
		data-maxigos-version-box-on="1"
		data-maxigos-sgf="_sgf/game/blood-vomit-<?php echo $lang;?>.sgf"
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
<iframe src="iframe/iframe.php?<?php echo $query;?>"></iframe>
<?php } else if ($sample=="Mixed") { ?>
<section id="mixed" class="sample">
<section class="BambooSample">
<h2 class="z">Bamboo</h2>
<script src="minimalist/_maker/basic.php"
		data-maxigos-in3d-on="1"
>
_sgf/game/blood-vomit-<?php echo $lang;?>.sgf
</script>
</section>
<section class="BordeauxSample">
<h2 class="z">Bordeaux</h2>
<script src="minimalist/_maker/basic.php">
_sgf/game/blood-vomit-<?php echo $lang;?>.sgf
</script>
</section>
<section class="MinimalistSample">
<h2 class="z">Minimalist</h2>
<script src="minimalist/_maker/basic.php">
_sgf/game/blood-vomit-<?php echo $lang;?>.sgf
</script>
</section>
<section class="TroyesSample">
<h2 class="z">Troyes</h2>
<script src="troyes/_maker/basic.php">
_sgf/game/blood-vomit-<?php echo $lang;?>.sgf
</script>
</section>
<section class="ZanzibarSample">
<h2 class="z">Zanzibar</h2>
<script src="minimalist/_maker/basic.php"
		data-maxigos-in3d-on="1"
>
_sgf/game/blood-vomit-<?php echo $lang;?>.sgf
</script>
</section>
</section>
<?php } else if ($sample=="Multilang") { ?>
<p class="z">Theme=Minimalist, Config=Game</p>
<section class="MultilangSample">
<section class="sample">
<h2 class="z">English (lang="en")</h2>
<script lang="en" src="minimalist/_maker/game.php">
_sgf/game/blood-vomit-en.sgf
</script>
</section>
<section class="sample">
<h2 class="z">Français (lang="fr")</h2>
<script lang="fr" src="minimalist/_maker/game.php">
_sgf/game/blood-vomit-fr.sgf
</script>
</section>
<section class="sample">
<h2 class="z">日本語 (lang="ja")</h2>
<script lang="ja" src="minimalist/_maker/game.php">
_sgf/game/blood-vomit-ja.sgf
</script>
</section>
<section class="sample">
<h2 class="z">中文～简化字 (lang="zh-hans")</h2>
<script lang="zh-hans" src="minimalist/_maker/game.php">
_sgf/game/blood-vomit-zh-hans.sgf
</script>
</section>
<section class="sample">
<h2 class="z">中文～正體字 (lang="zh-hant")</h2>
<script lang="zh-hant" src="minimalist/_maker/game.php">
_sgf/game/blood-vomit-zh-hant.sgf
</script>
</section>
</section>
<?php } else if ($sample=="Rfg") { ?>
<section id="rfg" class="sample">
<div class="z" id="flexicontent">
<section class="basic">
<h2 class="z">Basic</h2>
<script src="<?php echo $basicScript; ?>"
		data-maxigos-sgf="_sgf/game/Hon-1941-1.sgf"
>
</script>
</section>
<section class="comment">
<h2 class="z">Comment</h2>
<script src="<?php echo $commentScript; ?>"
		data-maxigos-sgf="_sgf/game/mn-bdg-<?php echo ($lang=="fr")?"fr":"en";?>.sgf"
>
</script>
</section>
<section class="diagram">
<h2 class="z">Diagram</h2>
<script src="<?php echo $diagramScript; ?>"
		data-maxigos-sgf="_sgf/game/blood-vomit.sgf"
>
</script>
<script src="<?php echo $diagramScript; ?>"
		data-maxigos-sgf="_sgf/joseki/j1.sgf"
>
</script>
</section>
<section class="game">
<h2 class="z">Game</h2>
<script src="<?php echo $gameScript; ?>"
		data-maxigos-sgf="_sgf/game/Hon-1941-2.sgf"
>
</script>
</section>
<section class="problem">
<h2 class="z">Problem</h2>
<script src="<?php echo $problemScript; ?>"
		data-maxigos-sgf="_sgf/problem/p3-<?php echo $lang;?>.sgf"
>
</script>
</section>
<section class="tree">
<h2 class="z">Tree</h2>
<script src="<?php echo $treeScript; ?>"
		data-maxigos-sgf="_sgf/game/mn-bdg-<?php echo ($lang=="fr")?"fr":"en";?>.sgf"
>
</script>
<script src="<?php echo $treeScript; ?>"
		data-maxigos-sgf="_sgf/game/Mei-1996-2.sgf"
>
</script>
<script src="<?php echo $treeScript; ?>"
		data-maxigos-sgf="_sgf/game/Hon-1996-5.sgf"
>
</script>
</section>
</div>
</section>
<?php } else if ($sample=="Rules") { ?>
<p class="z">Theme=Minimalist, Config=Diagram</p>
<section id="Rules" class="sample">
<iframe src="rules/rules-<?php echo ($lang=="fr"?"fr":"en"); ?>.php"></iframe>
</section>
<?php } else if ($sample=="Tactigo") {?>
<p class="z">Theme=Minimalist (<?php echo $modifiedLabel;?>), Config=Problem</p>
<section id="tactigo" class="sample">
<section class="problem">
<script src="<?php echo $problemScript; ?>"
		data-maxigos-solves=""
		data-maxigos-in3d-on="1"
		data-maxigos-special-stone-on="1"
		data-maxigos-stretching="0,1,1,2"
		data-maxigos-marks-and-labels-on="1"
		data-maxigos-grid-padding="4"
		data-maxigos-sgf="_sgf/problem/tactigo-<?php echo $lang;?>.sgf"
>
</script>
</section>
</section>
<?php } else if ($sample=="Tiger") {?>
<p class="z">Theme=Tiger</p>
<section id="tiger" class="sample">
<section class="comment">
<h2 class="z">Comment</h2>
<script src="<?php echo $commentScript; ?>">
_sgf/game/mn-bdg-<?php echo ($lang=="fr"?"fr":"en");?>.sgf
</script>
<script src="<?php echo $commentScript; ?>">
_sgf/game/TV9x9-<?php echo ($lang=="fr"?"fr":"en");?>.sgf
</script>
</section>
<h2 class="z">Tree</h2>
<section class="tree">
<script src="<?php echo $treeScript; ?>">
_sgf/game/mn-bdg-<?php echo ($lang=="fr"?"fr":"en");?>.sgf
</script>
<script src="<?php echo $treeScript; ?>">
_sgf/game/TV9x9-<?php echo ($lang=="fr"?"fr":"en");?>.sgf
</script>
</section>
</section>

<?php } else if ($sample=="Tsumego") {?>
<p class="z">Theme=Minimalist (<?php echo $modifiedLabel;?>), Config=Problem</p>
<section id="tsumego" class="sample">
<?php
	if($lang=="ja") $tsumego="詰め碁";
	else $tsumego="Tsumego";
?>
<section class="problem">
<h2><span><?php echo $tsumego; ?> 12x8</span><span><span>★★★</span><span>★★★</span></span></h2>
<script src="<?php echo $problemScript; ?>"
		data-maxigos-in3d-on="1"
		data-maxigos-points-num-max="0"
		data-maxigos-stretching="0,1,1,2"
>
_sgf/problem/p3-<?php echo $lang; ?>.sgf
</script>
</section>
<section class="problem">
<h2><span><?php echo $tsumego; ?> 19x19</span><span><span>★★★</span><span>★★★</span></span></h2>
<script src="<?php echo $problemScript; ?>"
		data-maxigos-in3d-on="1"
		data-maxigos-points-num-max="0"
>
_sgf/problem/tactigo-<?php echo $lang; ?>.sgf
</script>
</section>
</section>

<!------------------------------------->
<!-- Main themes + Bamboo + Bordeaux -->
<!------------------------------------->

<?php } else {?>
<?php if (($sample=="Bamboo")||($sample=="Bordeaux")) {?>
<p class="z">Theme=Minimalist (<?php echo $modifiedLabel;?>)</p>
<?php }?>
<?php if (($sample=="Eidogo")) {?>
<p class="z">Theme=Eidogo</p>
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
<p class="z">Theme=WGo</p>
<?php }?>
<?php if (file_exists($basicScript)) {?>
<section id="basic" class="sample">
<h2 class="z"><?php echo $basic; ?></h2>
<?php configMenu();?>
<section class="sampleBody">
<h3 class="z">19x19</h3>
<script src="<?php echo $basicScript; ?>"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
_sgf/game/blood-vomit-<?php echo $lang;?>.sgf
</script>
<h3 class="z">9x9</h3>
<script src="<?php echo $basicScript; ?>"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
_sgf/game/TV9x9-<?php echo ($lang=="fr")?"fr":"en";?>.sgf
</script>
<h3 class="z">25x25</h3>
<script src="<?php echo $basicScript; ?>"
		data-maxigos-points-num-max="0"
		data-maxigos-sgf="_sgf/game/XY25x25.sgf"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
</script>
</section>
</section>
<?php }?>

<?php if (file_exists($commentScript)) {?>
<section id="comment" class="sample">
<h2 class="z"><?php echo $comment; ?></h2>
<?php configMenu();?>
<section class="sampleBody">
<h3 class="z">19x19</h3>
<script src="<?php echo $commentScript; ?>"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
_sgf/game/mn-bdg-<?php echo ($lang=="fr"?"fr":"en");?>.sgf
</script>
<h3 class="z">9x9</h3>
<script src="<?php echo $commentScript; ?>"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
_sgf/game/TV9x9-<?php echo ($lang=="fr"?"fr":"en");?>.sgf
</script>
</section>
</section>
<?php }?>

<?php if (file_exists($diagramScript)) {?>
<section id="diagram" class="sample">
<h2 class="z"><?php echo $diagram; ?></h2>
<?php configMenu();?>
<section class="sampleBody">
<script src="<?php echo $diagramScript; ?>"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
_sgf/game/blood-vomit-<?php echo $lang;?>.sgf
</script>
<script src="<?php echo $diagramScript; ?>"
		data-maxigos-points-num-max="19"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
<?php if ($lang=="ja") { ?>
_sgf/joseki/j1-ja.sgf
<?php } else { ?>
_sgf/joseki/j1.sgf
<?php } ?>
</script>
<script src="<?php echo $diagramScript; ?>"
		data-maxigos-points-num-max="19"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
_sgf/joseki/j2.sgf
</script>
<script src="<?php echo $diagramScript; ?>"
		data-maxigos-indices-on="0"
		data-maxigos-numbering-on="0"
		data-maxigos-points-num-max="1"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
<?php if ($lang=="ja") { ?>
_sgf/joseki/j1-ja.sgf
<?php } else { ?>
_sgf/joseki/j1.sgf
<?php } ?>
</script>
<script src="<?php echo $diagramScript; ?>"
		data-maxigos-indices-on="0"
		data-maxigos-numbering-on="0"
		data-maxigos-points-num-max="1"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
_sgf/joseki/j2.sgf
</script>
<script src="<?php echo $diagramScript; ?>"
		data-maxigos-indices-on="1"
		data-maxigos-numbering-on="1"
		data-maxigos-points-num-max="0"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
<?php if ($lang=="ja") { ?>
_sgf/joseki/j1-ja.sgf
<?php } else { ?>
_sgf/joseki/j1.sgf
<?php } ?>
</script>
<script src="<?php echo $diagramScript; ?>"
		data-maxigos-indices-on="1"
		data-maxigos-numbering-on="1"
		data-maxigos-points-num-max="0"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
_sgf/joseki/j2.sgf
</script>
<script src="<?php echo $diagramScript; ?>"
		data-maxigos-indices-on="0"
		data-maxigos-points-num-max="0"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
<?php if ($lang=="fr") { ?>
(
;FF[4]GM[1]SZ[19]
;LB
[jj:Centre]
[cc:Coin]
[jc:Bord]
)
<?php } else if ($lang=="ja") { ?>
(
;FF[4]GM[1]SZ[19]
;LB
[jj:中央]
[cc:隅]
[jc:辺]
)
<?php } else if ($lang=="zh-hans") { ?>
(
;FF[4]GM[1]SZ[19]
;LB
[jj:中心]
[cc:角]
[jc:辺]
)
<?php } else if ($lang=="zh-hant") { ?>
(
;FF[4]GM[1]SZ[19]
;LB
[jj:中心]
[cc:角]
[jc:辺]
)
<?php } else { ?>
(
;FF[4]GM[1]SZ[19]
;LB
[jj:Center]
[cc:Corner]
[jc:Edge]
)
<?php } ?>
</script>
</section>
</section>
<?php }?>

<?php if (file_exists($editScript)) {?>
<section id="edit" class="sample">
<h2 class="z"><?php echo $edit; ?></h2>
<?php configMenu();?>
<section class="sampleBody">
<script src="<?php echo $editScript; ?>">
</script>
</section>
</section>
<?php }?>

<?php if (file_exists($gameScript)) {?>
<section id="game" class="sample">
<h2 class="z"><?php echo $game; ?></h2>
<?php configMenu();?>
<section class="sampleBody">
<h3 class="z">19x19</h3>
<script src="<?php echo $gameScript; ?>"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
_sgf/game/blood-vomit-<?php echo $lang;?>.sgf
</script>
<h3 class="z">9x9</h3>
<script src="<?php echo $gameScript; ?>"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
_sgf/game/TV9x9-<?php echo ($lang=="fr")?"fr":"en";?>.sgf
</script>
</section>
</section>
<?php }?>

<?php if (($sample=="Minimalist")&&file_exists($kifuScript)) {?>
<!-- only with the original Minimalist in black and white, not customized ones -->
<!-- otherwise, it is not a kifu -->
<section id="kifu" class="sample">
<h2 class="z"><?php echo $kifu; ?></h2>
<?php configMenu();?>
<section class="sampleBody">
<script src="<?php echo $kifuScript; ?>">
_sgf/game/blood-vomit-<?php echo $lang;?>.sgf
</script>
</section>
</section>
<?php }?>

<?php if (file_exists($lessonScript)) {?>
<section id="lesson" class="sample">
<h2 class="z"><?php echo $lesson; ?></h2>
<?php configMenu();?>
<section class="sampleBody">
<script src="<?php echo $lessonScript; ?>"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
_sgf/game/mn-bdg-<?php echo ($lang=="fr"?"fr":"en");?>.sgf
</script>
<script src="<?php echo $lessonScript; ?>"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
_sgf/game/TV9x9-<?php echo ($lang=="fr"?"fr":"en");?>.sgf
</script>
</section>
</section>
<?php }?>

<?php if (file_exists($loopScript)) {?>
<section id="loop" class="sample">
<h2 class="z"><?php echo $loop; ?></h2>
<?php configMenu();?>
<section class="sampleBody">
<script src="<?php echo $loopScript; ?>"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
_sgf/joseki/j1.sgf
</script>
</section>
</section>
<?php }?>

<?php if (file_exists($problemScript)) {?>
<section id="problem" class="sample">
<h2 class="z"><?php echo $problem; ?></h2>
<?php configMenu();?>
<section class="sampleBody">
<script src="<?php echo $problemScript; ?>"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
_sgf/problem/p3-<?php echo $lang;?>.sgf
</script>
</section>
</section>
<?php }?>

<?php if (file_exists($replayScript)) {?>
<section id="replay" class="sample">
<h2 class="z"><?php echo $replay; ?></h2>
<?php configMenu();?>
<section class="sampleBody">
<h3 class="z">19x19</h3>
<script src="<?php echo $replayScript; ?>"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
_sgf/game/blood-vomit-<?php echo $lang;?>.sgf
</script>
<h3 class="z">9x9</h3>
<script src="<?php echo $replayScript; ?>"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
_sgf/game/TV9x9-<?php echo ($lang=="fr")?"fr":"en";?>.sgf
</script>
</section>
</section>
<?php }?>

<?php if (file_exists($scoreScript)) {?>
<section id="score" class="sample">
<h2 class="z"><?php echo $score; ?></h2>
<?php configMenu();?>
<section class="sampleBody">
<h3 class="z">19x19</h3>
<script src="<?php echo $scoreScript; ?>"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
</script>
</section>
</section>
<?php }?>

<?php if (file_exists($treeScript)) {?>
<section id="tree" class="sample">
<h2 class="z"><?php echo $tree; ?></h2>
<?php configMenu();?>
<section class="sampleBody">
<h3 class="z">19x19</h3>
<script src="<?php echo $treeScript; ?>"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
_sgf/game/mn-bdg-<?php echo ($lang=="fr"?"fr":"en");?>.sgf
</script>
<h3 class="z">9x9</h3>
<script src="<?php echo $treeScript; ?>"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
_sgf/game/TV9x9-<?php echo ($lang=="fr"?"fr":"en");?>.sgf
</script>
<?php if(file_exists("../../../../Kogo.sgf")){?>
<h3 class="z">Kogo</h3>
<script src="<?php echo $treeScript; ?>"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
../../../../Kogo.sgf
</script>
<?php }?>
</section>
</section>
<?php }?>

<?php if (file_exists($zeroScript)) {?>
<section id="zero" class="sample">
<h2 class="z"><?php echo $zero; ?></h2>
<?php configMenu();?>
<section class="sampleBody">
<h3 class="z">19x19</h3>
<script src="<?php echo $zeroScript; ?>"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
_sgf/game/blood-vomit-<?php echo $lang;?>.sgf
</script>
<h3 class="z">9x9</h3>
<script src="<?php echo $zeroScript; ?>"
<?php if ($sample=="Bamboo") echo "\t\tdata-maxigos-in3d-on=\"1\"\n";?>
>
_sgf/game/TV9x9-<?php echo ($lang=="fr")?"fr":"en";?>.sgf
</script>
</section>
</section>
<?php }?>

<?php if ($sample=="Rosewood") {?>
<div class="z reference" lang="en">
<a href="http://lena-bitty.deviantart.com/art/Chinese-Dragon-334787136">Chinese Dragon</a>, Lena Bitty,
<a href="http://creativecommons.org/licenses/by-nd/3.0/">Creative Commons Attribution-No Derivative Works 3.0 License</a>
</div>
<?php }?>
<?php }?>

<?php if ($sample=="Classic") {?>
<div class="z aloneLink"><a href="classic/classic-sample.html">Alone script sample</a></div>
<?php } else if ($sample=="Minimalist") {?>
<div class="z aloneLink"><a href="minimalist/minimalist-sample.html">Alone script sample</a></div>
<?php } else if (($sample=="NeoClassic")&&($lang=="fr")) {?>
<div class="z aloneLink"><a href="neo-classic/neo-classic-sample-fr.html">Alone script sample</a></div>
<?php } else if (($sample=="NeoClassic")) {?>
<div class="z aloneLink"><a href="neo-classic/neo-classic-sample-en.html">Alone script sample</a></div>
<?php } else if ($sample=="Rosewood") {?>
<div class="z aloneLink"><a href="rosewood/rosewood-sample.html">Alone script sample</a></div>
<?php } else if ($sample=="Tatami") {?>
<div class="z aloneLink"><a href="tatami/tatami-sample.html">Alone script sample</a></div>
<?php } else if ($sample=="Troyes") {?>
<div class="z aloneLink"><a href="troyes/troyes-sample.html">Alone script sample</a></div>
<?php }?>

<div class="z executionTime" id="ExecutionTimeBisId"></div>
</main>

<footer id="bottom">
<?php
themeMenu();
langMenu();
?>
</footer>

</body>
</html>
