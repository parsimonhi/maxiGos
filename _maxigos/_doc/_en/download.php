<!DOCTYPE html>
<?php $lang="en";?>
<html lang="<?=$lang?>">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="initial-scale=1.0,user-scalable=yes">
<?php include "../../_php/version.php";?>
<title>Download page for MaxiGos v<?=$v?></title>
<style>
body
{
	hyphens:auto;
	overflow-wrap:anywhere;
}
nav a {display:inline-block;margin:0.25em;}
nav a img {padding-right:0.25em}
.flag
{
	vertical-align:middle;
	width:1.8em;
	height:auto;
}
.menu a {padding-right:1em;vertical-align:middle;}
pre
{
	color:red;
	font-family:monaco;
	font-size:1em;
	background:#3e3e3e;
	color:#e3e3e3;
	padding:1em;
	white-space:pre-wrap;
	text-align:left;
}
.themeTable
{
	border-collapse:collapse;
}
.themeTable th,
.themeTable td
{
	border: 1px solid #000;
	padding:0.5rem;
}
@media (max-width:38em)
{
	table,tr,th,td
	{
		display:block;
	}
	.themeTable th,
	.themeTable td:not(:last-of-type)
	{
		border-bottom:0;
	}
	.themeTable td:last-of-type
	{
		margin-bottom:0.5em;
	}
	ul,li
	{
		margin:0;
		padding:0;
	}
	:not(li)>ul,li
	{
		padding-left:min(10vw,0.5em);
	}
}
@media (max-width:19em)
{
	nav a
	{
		display:block;
	}
}
</style>
</head>
<body>
<nav class="menu"><?=(file_exists("../../../index.php")?"\n<a href=\"../../../index.php?lang=en\">Home</a>\n":"")?>
<?="<a href=\"documentation.php\">Documentation</a>"?>
<a href="<?=str_replace("/_fr/","/_en/",$_SERVER["SCRIPT_NAME"])?>"><img class="flag" src="../../_img/flag/en.svg">English</a>
<a href="<?=str_replace("/_en/","/_fr/",$_SERVER["SCRIPT_NAME"])?>"><img class="flag" src="../../_img/flag/fr.svg">Français</a>
</nav>
<h1>MaxiGos v<?=$v.".".$r?> download page</h1>
<p><em>Copyright 1998-<?=date("Y")?> - FM&SH</em></p>
<p>
MaxiGos is a set of sgf viewers to display go diagrams, games or problems in a web page. 
It is written in php and javascript (the end user has just to let javascript enable in his browser).</p>
<p>You can use maxiGos free of charge on your website (BSD type <a href="../license.txt">license</a>).</p>
<?php
$vbn="_maxigos".$v.$r;
$vbne=$vbn.".zip";
$dir="../../../";
$mxL="fr";
?>
<?php if (file_exists($dir.$vbne)) { ?>
<h2>Download the full version of maxiGos</h2>
<p><a href="<?=$dir.$vbne?>">Click here to download maxiGos V<?=$v.".".$r?></a>.</p>
<?php }?>
<h2>Download a maxiGos stand-alone viewer</h2>
<p>These viewers are designed to work alone.
All the code is embedded in one javascript script file
for english and french (the maxiGos sgf viewer),
and two javascript files for other languages (a "i18n" internationalization script and the maxiGos sgf viewer).</p>
<p>The maxiGos language is the language of the page
(usually set using the lang attribute in the &lt;html&gt; tag).
But you can force maxiGos to use another language.
Just set the lang attribute of the &lt;script&gt; tag
of the stand-alone viewer.
If the language is not english or french,
don't forget to add the convenient "i18n" script
(an internationalization script that you can find in the "_i18n" folder)
before the first maxiGos script.</p>
<p>For instance:</p>
<ul>
<li>To set the language to english (download "maxigos-neo-classic-game.js")
<pre><code>&lt;script lang="en" src="path/maxigos-neo-classic-game.js"&gt;
path-to-a-sgf-file/a-sgf-file.sgf
&lt;/script&gt;</code></pre>
</li>
<li>To set the language to french (download "maxigos-neo-classic-game.js")
<pre><code>&lt;script lang="fr" src="path-to-a-maxigos-script/maxigos-neo-classic-game.js"&gt;
path-to-a-sgf-file/a-sgf-file.sgf
&lt;/script&gt;</code></pre>
</li>
<li>To set the language to japanese (download "maxigos-i18n-ja.js" and "maxigos-neo-classic-game.js")
<pre><code>&lt;script src="path/maxigos-i18n-ja.js"&gt;&lt;/script&gt;
&lt;script lang="ja" src="path/maxigos-neo-classic-game.js"&gt;
path-to-a-sgf-file/a-sgf-file.sgf
&lt;/script&gt;</code></pre>
</li>
</ul>
<p>See the <a href="documentation.php#internationalization">Internationalization</a>
chapter of the documentation for more details.</p>
<?php include("../../_php/lib.php");?>
<h3>Main themes</h3>
<?=printOneThemeDownloadLines("classic")?>
<?=printOneThemeDownloadLines("minimalist")?>
<?=printOneThemeDownloadLines("neo-classic")?>
<?=printOneThemeDownloadLines("rosewood")?>
<?=printOneThemeDownloadLines("tatami")?>
<?=printOneThemeDownloadLines("troyes")?>

<h3>Other themes</h3>
<?=printOneThemeDownloadLines("eidogo")?>
<?=printOneThemeDownloadLines("forum")?>
<?=printOneThemeDownloadLines("fm")?>
<?=printOneThemeDownloadLines("iroha")?>
<?=printOneThemeDownloadLines("jdg")?>
<?=printOneThemeDownloadLines("kifla")?>
<?=printOneThemeDownloadLines("rfg")?>
<?=printOneThemeDownloadLines("tiger")?>
<?=printOneThemeDownloadLines("wgo")?>

<h3>Internationalization scripts</h3>
<ul>
<?=printOneInternationalizationScriptLine('ja')?>
<?=printOneInternationalizationScriptLine('zh-hans')?>
<?=printOneInternationalizationScriptLine('zh-hant')?>
</ul>
<h2>What is new in the 8.03 version?</h2>
<ul>
<li>Removed the "BoxDiv" suffix from the global box.</li>
<li>Removed the "Div" suffix from grouping parent boxes.</li>
<li>Removed the "div" tag around components that contain only a button.
The component box becomes the button itself.</li>
<li>Removed the "div.innerNotSeenDiv" and "div.EditCommentDiv" tags.</li>
<li>Replaced the suffix in class names and identifiers of components that are not form elements to "Box".</li>
<li>Changed "CommentContentDiv" to "CommentContent", "EditToolBarDiv" to "EditToolbar", "InnerGobanDiv" to "GobanContent", "TreeContentDiv" to "TreeContent".</li>
<li>Improved information read by screen readers.</li>
<li>Added Audouard coordinates for screen readers (enable/disable with the "A" key when the goban has the focus).</li>
<li>Added --gobanIntrinsicWidth and --gobanIntrinsicHeight css variables to the global box,
removed the "pointsNumMax" parameter and modify the style sheets accordingly.</li>
<li>Added css variables --moveInfoIntrinsicWidth, --moveInfoIntrinsicHeight,
--treeIntrinsicWidth and --treeIntrinsicHeight to the global box.</li>
<li>Changed tags and classes of the "Cartouche" component.</li>
<li>Added the "yaOn" parameter.</li>
<li>Removed the "commentCaptionOn", "treeCaptionOn", "canCommentFocus", canHeaderFocus, "canTreeFocus" and "menuTimeout" parameters.</li>
<li>Improved tree drawing.</li>
<li>Rewrote the "Menu" component.</li>
<li>Changed the name of the "Cut" component to "Remove".</li>
<li>Fixed a bug in maxigos-eidogo-problem.js that crashed on startup.</li>
<li>Emission of a sound in addition to flashing the goban in case of user error.</li>
<li>Lots of changes in style sheets, especially to improve the display for narrow windows.</li>
<li>Various minor changes.</li>
</ul>
<h2>What is new in the 8.02 version?</h2>
<ul>
<li>Improved the functioning of tooltips and information read by screen readers.</li>
<li>Changed key combinations to navigate the move tree
(you must now press the "Shift" key instead of the "Option" or "Alt" key while pressing one of the keyboard arrows to navigate in the move tree).</li>
<li>Simplification of tags and classes of the "Header" component.</li>
<li>Various minor changes.</li>
</ul>
<h2>What is new in the 8.01 version?</h2>
<ul>
<li>Fixed a bug in mgosInfo.js which prevented the SGF from being updated when the header was modified.</li>
</ul>
<h2>What is new in the 8.00 version?</h2>
<ul>
<li>Priority to use "data-maxigos-sgf" attribute to insert a sgf (the w3c validator wants it).
Need to replace any double-quote (or single-quote)
by its html entity &amp;quote;/&amp;#34; (or &amp;#39;)
when inserting a sgf record as value of the "data-maxigos-sgf" attribute
(this replacement is not necessary if the sgf is in a sgf file).
Inserting a sgf between &lt;script&gt; and &lt;/script&gt; tags still works but is deprecated.</li>
<li>Reduced code size.</li>
<li>Improved processing speed.</li>
<li>Improved goban lines sharpness.</li>
<li>Added a description of the goban content for screen readers.</li>
<li>Simplified internal html (such as button content).</li>
<li>Made significant css changes.</li>
<li>Automatically cut css in several parts for a given theme to reduce code size.
Done for "Edit", "Lesson" and "Problem" configs.</li>
<li>Improved tree blocks display (in particular when the tree container is very hight).
Always add enough blocks to cover the part of the tree that the user can see
excepting when style is disabled in the browser.
In this case, when the tree is very high, the user has to click on the tree
to add tree blocks (generating automatically all the tree could be long).</li>
<li>Replace the GBox (which was a kind of homemade dialog) by a html dialog tag.</li>
<li>Replace internal tags of "GotoDiv" by an input[type=range] tag.</li>
<li>Replace internal tags of "GuessDiv" by a meter tag.</li>
<li>Replace internal tags of "SpeedDiv" by an input[type=range] tag.</li>
<li>Display marks or labels (if any on the goban) in the notSeen list.
Previously only stone numbers or coordinates were displayed.</li>
<li>Replace concatXxx parameters by concatInHeader parameter.</li>
<li>Replace hideXxx parameters by hideInHeader and hideInOptions parameters.</li>
<li>Remove mainVariationOnlyLoop, htmlParenthesis, gotoInputOn, gotoInputBefore
and magicParentNum parameters.</li>
<li>Rename the "Option" component in "Options".</li>
<li>XxxParentDiv, XxxGrandParentDiv, XxxGreatGrandParentDiv, etc. classes are no longer added
	to the global box. They are only added to grouping boxes.</li>
<li>Remove the Title component (move its code in the Header component).</li>
<li>Add the "Reset" and "Thickness" items in the "View" menu.</li>
<li>Simplify focus management (use :focus-visible in the css to show/hide the focus mark on the goban).</li>
<li>Fix various minor bugs.</li>
</ul>
<h2>What is new in the 7.05 version?</h2>
<ul>
<li>The goban grid is now drawn with only two svg path
(instead of one path per line and one circle per star point before,
i.e. 38 paths and 9 circles for a 19x19 goban).
This greatly reduces the number of svg tags.</li>
<li>Removes the special processing that was done for Android browsers
when selecting a part of the goban in the Edit component.</li>
<li>Replaces "&lt;" et "&gt;" with their html equivalents
when they appear in the content of an svg &lt;text&gt; tag.</li>
<li>Various minor changes.</li>
</ul>
<h2>What is new in the 7.04 version?</h2>
<ul>
<li>Fix a bug when displaying the word "with" in the "Option" component.</li>
</ul>
<h2>What is new in the 7.03 version?</h2>
<ul>
<li>Fix a bug when saving the result of a game.
The "R" in "B+R" or "W+R" was missing in case of a win by resign.</li>
<li>Various minor changes.</li>
</ul>
<h2>What is new in the 7.02 version?</h2>
<ul>
<li>Fix a bug when computing parent box classes.</li>
<li>Fix a display bug of "Speed" component.</li>
<li>Various minor changes.</li>
</ul>
<h2>What is new in the 7.01 version?</h2>
<ul>
<li>When using the wheel, wait longer between the first moves
to be able to place only one or a few moves.</li>
<li>Store "View" component preferences in the browser localStorage.</li>
<li>Add "coche" for View menu item.</li>
<li>The "Png" and "Svg" components now display their image in a box
over the goban instead of displaying them in a new window.</li>
<li>Rewriting of "Score" component.</li>
<li>Significant reduction in the size of the images used for the background of the goban.</li>
<li>New way to download sgfs from the server
(avoid double loading when the sgf file is not encoded in UTF-8).</li>
<li>Possibility for the user to resize the box of the move tree in "Edit" config.</li>
<li>Fixed a bug which prevented the textarea to edit sgf records
to display in full with firefox.</li>
<li>Various minor changes.</li>
</ul>
<h2>What is new in the 7.00 version?</h2>
<ul>
<li>Modify "as in book" tool label in english version ("B" becomes "K").</li>
<li>New way to call maxiGos viewers.</li>
<li>New way to set the language used in maxiGos.</li>
<li>Extensive use of Svg instead of html5 canvas to display the goban.</li>
<li>Css rewritten.</li>
<li>Many parameters changes.</li>
<li>New set of samples.</li>
<li>Various other optimizations and corrections.</li>
</ul>
<nav class="menu"><?=(file_exists("../../../index.php")?"\n<a href=\"../../../index.php?lang=en\">Home</a>\n":"")?>
<?="<a href=\"documentation.php\">Documentation</a>"?>
<a href="<?=str_replace("/_fr/","/_en/",$_SERVER["SCRIPT_NAME"])?>"><img class="flag" src="../../_img/flag/en.svg">English</a>
<a href="<?=str_replace("/_en/","/_fr/",$_SERVER["SCRIPT_NAME"])?>"><img class="flag" src="../../_img/flag/fr.svg">Français</a>
</nav>
</body>
</html>