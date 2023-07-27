<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="initial-scale=1.0,user-scalable=yes">
<?php include "../../_php/version.php";?>
<title>Documentation for maxiGos v<?=$v?></title>
<style>
p.note {font-style:italic;}
h1+em,
h1+em+nav {display:block;text-align:center;}
h1+em+nav {margin-top:0.5em;}
pre,
.code
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
p.code, div.code {text-align:left;}
.important {color:black;font-weight:bold;}
table.params {border-collapse: collapse;}
table.params th, table.params td {border: 1px solid black;padding: 3px;}
.parameter,
.attribute,
.component,
.config,
.theme,
.jsFile,
.phpFile,
.sgfFile,
.tag
{
	color:#c33;
}
h1 {font-size:2em;text-align: center;}
h2:before {content: counter(h2counter) ". ";}
h2 {font-size:1.8em;counter-increment: h2counter;counter-reset: h3counter;}
h3:before {content: counter(h2counter) "." counter(h3counter) ". " ;}
h3 {font-size:1.6em;counter-increment: h3counter;counter-reset: h4counter;}
h4:before {content: counter(h2counter) "." counter(h3counter) "." counter(h4counter) ". ";}
h4 {font-size:1.4em;counter-increment: h4counter;counter-reset: h5counter;}
h5:before {content: counter(h2counter) "." counter(h3counter) "." counter(h4counter) "." counter(h5counter) ". ";}
h5 {font-size:1.2em;counter-increment: h5counter;}
img.flag
{
	margin-left:1em;
	margin-right:0.5em;
	vertical-align:middle;
	width:1.8em;
	height:auto;
}
h2 .component,
h3 .component,
h4 .component,
h5 .component,
h6 .component
{
	color:#000;
}
figure.maxigosSample
{
	background:#eee;
	padding:1rem;
}
/* BordeauxSample example */
.BordeauxSample
{
	background:#ddd;
	padding:1em;
}
.BordeauxSample .mxMinimalistTheme .mxInnerGobanDiv svg
{
	background:#a72926;
}
.BordeauxSample .mxMinimalistTheme .mxGobanLines
{
	stroke:#fff;
}
.BordeauxSample .mxMinimalistTheme .mxStars
{
	stroke:#fff;
	fill:#fff;
	stroke-width:5px;
}
.BordeauxSample .mxMinimalistTheme .mxMark.mxOnEmpty:not(.mxPointBackground)
{
	fill:none;
	stroke:#fff;
}
.BordeauxSample .mxMinimalistTheme text.mxOnEmpty
{
	fill:#fff;
	stroke:none;
}
</style>
</head>
<body>
<nav><?=(file_exists("../../../index.php")?"<a href=\"../../../index.php?lang=en\">Home</a>":"")?><!--
--><a href="<?=str_replace("/_fr/","/_en/",$_SERVER["SCRIPT_NAME"])?>"><img alt="English" class="flag" src="../../_img/flag/en.svg">English</a><!--
--><a href="<?=str_replace("/_en/","/_fr/",$_SERVER["SCRIPT_NAME"])?>"><img alt="Français" class="flag" src="../../_img/flag/fr.svg">Fran&ccedil;ais</a></nav>
<h1>Documentation for maxiGos v<?=$v?></h1>
<em>Copyright 1998-<?=date("Y")?> - FM&amp;SH</em>
<nav><a href="download.php">Download</a></nav>
<h2>What is maxiGos?</h2>
<p>MaxiGos is a set of sgf viewers to display
go diagrams, games or problems in a web page.</p>
<p>You can use maxiGos free of charge on your website
(BSD type <a href="../license.txt">license</a>).</p>
<h2>What are the pre-requisites?</h2>
<p>The end user browser must be HTML5 compliant, with javascript enabled.</p>
<p>If you use only maxiGos stand-alone viewers (that are in javascript),
there are no pre-requisite on the server where maxiGos is installed.</p>
<p>However, if you are using the full version of maxiGos (which uses javascript, css and php),
it may be necessary to have php available on the server.</p>
<h2>How to quick start?</h2>
<p>Download one of the maxiGos viewers from <a href="download.php">this page</a>,
for instance "maxigos-neo-classic-game.js"</p>
<p>Move or copy it somewhere on your website.</p>
<p>If the sgf file you want to display is called "blood-vomit-en.sgf",
insert in the &lt;body&gt; part of a html page
where you want the viewer displays a code as:</p>
<pre><code>&lt;script
	src="ppp/maxigos-neo-classic-game.js"
	data-maxigos-sgf="qqq/blood-vomit-en.sgf"&gt;
&lt;/script&gt;</code></pre>
<p>Replace "ppp/" by a relative path between the html page and the "maxigos-neo-classic-game.js" maxiGos script.</p>
<p>Replace "qqq/" by a relative path between the html page and the "blood-vomit-en.sgf" sgf file.</p>
<p>You should get the result below:</p>
<figure class="maxigosSample">
<script
	src="../../_sample/neo-classic/_alone/maxigos-neo-classic-game.js"
	data-maxigos-sgf="../../_sample/_sgf/game/blood-vomit-en.sgf">
</script>
</figure>
<p><a href="../../_sample/?lang=en">More samples here!</a>
<h2>How to install the full version of maxiGos?</h2>
<p>To install the full version of maxiGos,
<a href="download.php">download maxiGos archive</a>, unzip and copy it
anywhere in your web site. No database required.</p>
<p>If you don't want to install the full version of maxiGos, you can just download one stand-alone viewer.
See <a href="#using-a-stand-alone-viewer">Using a stand-alone viewer</a> chapter for more details.</p>
<p>To test the full version, launch
<a href="../../_sample/?lang=en">_maxigos/_sample/</a> page
in a browser.</p>
<p>The end user has nothing to do on his device. He has just to let javascript enable in his browser.</p>
<h2>How to use maxiGos?</h2>
<p>The basic way to insert maxiGos in a web page is:<p>
<ul>
<li>to use a stand-alone viewer in javascript</li>
</ul>
<p>But we can also use:</p>
<ul>
<li>a plugin (actually there are two plugins available: for joomla and for wordpress)</li>
<li>a BBCode</li>
<li>a maker in php that builds "on the fly" a viewer</li>
<li>a loader in javascript that builds "on the fly" a viewer and downloads it with AJAX</li>
</ul>
<h3 id="using-a-stand-alone-viewer">Using a stand-alone viewer</h3>
<p>Use a stand-alone viewer if you want to keep things simple.</p>
<p>A stand-alone viewer is a maxiGos viewer where all the code and ressources
are in a single javascript file.</p>
<p>These files are stored in "_alone" folders of the samples provided with maxiGos.
These samples can be found in the "_sample" folder.</p>
<h4>The code to insert in your web page</h4>
<p>Include in your web page where you want the viewer displays something
&lt;script&gt; and &lt;/script&gt; tags with the javascript file name of a stand-alone viewer
as value of the "src" attribute,
and a sgf file name or a sgf record or an url that generates a sgf record as value
of the "data-maxigos-sgf" attribute.</p>
<p>If one uses a sgf file name, the code is for instance:</p>
<pre><code>&lt;script
	src="xxx/maxigos-neo-classic-problem.js"
	data-maxigos-sgf="yyy/myFirstSgf.sgf"&gt;
&lt;/script&gt;</code></pre>
<p>Another way is to place a sgf file name or a sgf record or an url that generates a sgf record
between &lt;script&gt; and &lt;/script&gt; tags. For instance:</p>
<pre><code>&lt;script
	src="xxx/maxigos-neo-classic-problem.js"&gt;
	yyy/myFirstSgf.sgf
&lt;/script&gt;</code></pre>
<p>Of course, you have to adapt the path (here "xxx") before "maxigos-problem.js" script 
which contains the code of a stand-alone viewer, 
taking into account where you stored it, and where your web page is.
It's a relative path between your web page and the folder that contains the script file.
<p>You have to adapt the path (here "yyy") before the sgf file name, 
taking into account where you stored it, and where your web page is.
It's a relative path between your web page and the folder that contains the file.
</p>
<p>If one uses a sgf record, the code is for instance:</p>
<pre><code>&lt;script
	src="xxx/maxigos-neo-classic-problem.js"
	data-maxigos-sgf="(;FF[4]GM[1]SZ[19]VW[aa:ii]FG[1]AW[ee]AB[de][fe][ed];B[ef]C[Correct!])"&gt;
&lt;/script&gt;</code></pre>
<p>Another way is:</p>
<pre><code>&lt;script
	src="xxx/maxigos-neo-classic-problem.js"&gt;
	(;FF[4]GM[1]SZ[19]VW[aa:ii]FG[1]AW[ee]AB[de][fe][ed];B[ef]C[Correct!])
&lt;/script&gt;</code></pre>
<p class="note">Note: when one inserts directly a sgf record in a page as in above samples,
the CA property is useless and ignored if present,
since the sgf record charset is necessarily the same as the charset of the page.</p>
<p>If one uses the "data-maxigos-sgf" attribute, the code is for instance:</p>
<p>If one uses an url that generates a sgf record,
one must add the "data-maxigos-source-filter" attribute
which value is a regular expression that matches the url. The code is for instance:</p>
<pre><code>&lt;script
	src="xxx/maxigos-neo-classic-problem.js"
	data-maxigos-source-filter="/download/file\.php\?id=[0-9]+$"
	data-maxigos-sgf="/download/file.php?id=23"&gt;
&lt;/script&gt;</code></pre>
<p>Another way is:</p>
<pre><code>&lt;script
	src="xxx/maxigos-neo-classic-problem.js"
	data-maxigos-source-filter="/download/file\.php\?id=[0-9]+$"&gt;
	/download/file.php?id=23
&lt;/script&gt;</code></pre>
<p>The url must respect the "same origin" policy
(i.e. same protocol, same domain, same port as the calling page).</p>
<p class="note">Note 1: one doesn't need to install all maxiGos files on the server to use 
a stand-alone viewer. 
One just has to copy (anywhere) on the web server the viewer script file.
If the language is not english or french, one also has to include the internationalization file
of this language (one of those stored in "_i18n" folder).</p>
<p class="note">Note 2: in theory, a stand-alone viewer should not use external resources (images, ...). 
If an external resource is required, maxiGos looks for it at the place
where this ressource is in the full version.</p>
<h4>Customization of stand-alone viewers</h4>
<p>Customization of stand-alone viewers can be done by using "data-maxigos-xxx" attributes, 
where "xxx" is a maxiGos parameter 
(see the "Component parameters" chapter to learn more about maxiGos parameters). 
Because only lower case letters are allowed in attribute names, 
replace any upper case letter by its lower case form prefixed by "-". 
For instance the attribute name for "in3dOn" maxiGos parameter is "data-maxigos-in3d-on".</p>
<p>Many things can be changed using attributes. For instance, below is a way to display a diagram 
without 3D effects using a neo-classic viewer that initially displays
with 3D effects:</p>
<pre><code>
&lt;script
	src="xxx/maxigos-neo-classic-diagram.js"
	data-maxigos-in3d-on="0"&gt;
	data-maxigos-sgf="(;FF[4]GM[1]SZ[19]VW[aa:ii]FG[1]AW[ee]AB[de][fe][ed])"&gt;
&lt;/script&gt;
</code></pre>
<p>It is also possible to make some changes in the css file 
(as for goban background in the above sample).</p>
<h3>Using a "plugin"</h3>
<p>See the plugin pages
(for <a href="http://jeudego.org/maxiGos/joomla.php?lang=en">joomla</a>
or for <a href="http://jeudego.org/maxiGos/wordpress.php?lang=en">wordpress</a>)
for more details.</p>
<h3>Using a "BBCode"</h3>
<p>See the <a href="http://jeudego.org/maxiGos/phpBB.php?lang=en">BBCode page</a>
for more details.</p>
<h3>Using a "maker" in php</h3>
<p>Use a maker when you need to heavily customize the viewer.</p>
<p>The maker is a php script that generates "on the fly" the javascript code of a maxiGos viewer,
using data found in its code.</p>
<h4>The line to insert in your web page</h4>
<p>Include in your web page where you want the viewer displays something a line such as:</p>
<pre><code>&lt;script
	src="xxx/classic/_maker/basic.php"
	data-maxigos-sgf="yyy/myFirstSgf.sgf"&gt;
&lt;/script&gt;</code></pre>
<p>Of course, you have to adapt the path (here "ppp") before the php script (here "classic/_maker/basic.php") 
which is called a maker, taking into account where you installed maxiGos, and where your web page is.
It's a relative path between the folder where your web page is and the folder where the maker script file is.</p>
<p>The sgf can be specified as for stand-alone viewers.</p>

<h4>Customization of makers</h4>
<p>The customization of makers can be done as for stand-alone viewers.</p>

<h3>Using a "loader" in javascript</h3>
<p>Use a loader when you need to insert sgf data between other html tag such as &lt;div&gt; and &lt;/div&gt;.
This method is notably slower than others.</p>

<h4>The code to insert in your web page</h4>
<p>Insert for instance in your web page several &lt;div&gt; and &lt;/div&gt; tags
with one attribute named "data-maxigos" which value is a maxiGos configuration name.
</p>
<p>Insert a sgf file name or a sgf record or an url that can generate a sgf record
between each of these tags.</p>
<p>Insert "mgosLoader.js" script in the web page after all these tags. 
This script will replace each &lt;div&gt; and &lt;/div&gt; tags contents by a maxiGos viewer 
that displays those contents.</p>
<p>For instance:</p>
<pre><code>&lt;div data-maxigos="problem"&gt;
	(;FF[4]GM[1]SZ[19]VW[aa:lh]FG[1]AW[ee]AB[de][fe][ed];B[ef]C[Correct!])
&lt;/div&gt;
&lt;div data-maxigos="basic"&gt;
	(;FF[4]GM[1]SZ[19];B[qd])
&lt;/div&gt;
&lt;script src="ppp/_js/mgosLoader.js"&gt;&lt;/script&gt;</code></pre>
<p>Of course, you have to adapt the path (here "ppp/") before "_js/mgosLoader.js", 
taking into account where you installed maxiGos, and where your web page is.
It's a relative path between your web page and the "loader" script file.</p>

<h4>Customization of loaders</h4>
<p>As for stand-alone players, customization of loaders can be done by adding
"data-maxigos-xxx" attributes to the tag where the viewer displays,
and where "xxx" is a maxiGos parameter.</p>
<h2>Internationalization</h2>
<p>The default language for maxiGos is the language of the tag where it displays
(i.e. the language specified by the html "lang" attribute of the tag,
or by the html lang attribute of one of the ancestors of the tag).</p>
<p>In practice, the lang attribute is often specified for the html tag itself.</p>
<p>If no lang attribute is specified, maxiGos tries to use the language of the navigator
or english.</p>
<p>You can force the language to be english by adding
<span style="color:red;">data-maxigos-l="en"</span> to each tag where a maxiGos viewer will display.</p>
<p>For instance:</p>
<pre><code>&lt;script
	src="ppp/maxigos-neo-classic-basic.js"
	data-maxigos-l="en"
	data-maxigos-sgf="qqq/myFirstSgf.sgf"&gt;
&lt;/script&gt;</code></pre>
<p>Note that maxiGos doesn't translate sgf content. It can just change the language of its own messages, button labels, …</p>
<p>To set another language, insert before the first call to maxiGos scripts 
an internationalization script for this other language.
For instance, for japanese, you can insert the "maxigos-i18n-ja.js" script found in "_i18n" folder
using something like 
(replace "ppp" by a relative path between your web page and "_i18n" folder):</p>
<pre><code>&lt;script src="ppp/_i18n/maxigos-i18n-ja.js"&gt;&lt;/script&gt;</code></pre>
<p>If you can't or don't want to insert this ligne each time in your web page,
you can simply add the code which is inside the internationalization script of the desired language
at the beginning of the script of the viewer you are using.</p>
<p>Then add <span style="color:red;">data-maxigos-l="ja"</span> to each tag where a maxiGos viewer will display such as:</p>
<pre><code>&lt;script data-maxigos-l="ja" src="ppp/maxigos-neo-classic-basic.js"&gt;qqq/myFirstSgf.sgf&lt;/script&gt;</code></pre>
<p>All internationalization scripts delivered with maxiGos are in "_i18n" folder.
If the internationalization script for a language doesn't exist, 
you can try to create it (try to do it from the japanese one).</p>
<p class="note">Note 1: if you create an internationalization file,
it is a good pratice to choose a ISO 639 language code
(for instance "ja" for japanese, not "jp").</p>
<p class="note">Note 2: when using a "maker" (see the corresponding chapter)
the easiest way is
to use the "lang" parameter of the maker to change the language.</p>
<h2>Encoding</h2>
<h3>Encoding of your page</h3>
<p>MaxiGos works in "UTF-8", but can be included in a page which is not in "UTF-8".</p>
<p>When using a maxiGos stand-alone viewer script or an internationalization script in a page which 
is not in "UTF-8", just add charset="UTF-8" to any &lt;script&gt; tag that includes 
maxiGos scripts in your page.</p>
<p>For instance:</p>
<pre><code>&lt;script charset="UTF-8" src="/_maxigos/_alone/maxigos-basic.js"&gt;</code></pre> 
<h3>Encoding of sgf files</h3>
<p>MaxiGos can well display sgf files encoded in different charsets 
if the sgf CA property in these sgf files is properly set. 
In this case, maxiGos catches the value of the CA property then changes the encoding 
of the sgf file to "UTF-8". 
If a sgf file has no charset, maxiGos assumes that the charset is "ISO-8859-1" 
which is the defaut value of the CA property according to the sgf standard. 
Unfortunately, the CA property is often missing even when the actual charset of the file 
is not "ISO-8859-1", especially for sgf files encoded in asian charsets. 
And maxiGos doesn't (cannot?) try to guess what is the correct charset when there is 
no CA property in the sgf file. 
The only way for the moment to solve this problem is to use a text editor to add the correct CA property 
in the sgf file.</p>
<p>Note that when the actual charset of the sgf file is "UTF-8", 
the value of the CA property must be set "UTF-8" too (a missing CA property is not convenient in this case).</p>
<p>If one inserts some sgf record as is in the code of a page using a text editor, maxiGos assumes 
that the encoding of this record is the same as the encoding of the page (it is always the case in theory) 
and therefore ignores the CA property.</p>
<p>When maxiGos produces a sgf record, the result is always in UTF-8.</p>
<p>Even if in theory maxiGos can be included in a page which is not in "UTF-8" and read sgf files that are not in "UTF-8", 
the best is to use UTF-8 everywhere when possible.</p>
<h3>Encoding and language</h3>
<p>Encoding and language are different. "UTF-8" is convenient for any(?) language, 
so it is the best choice as encoding when you can use it. When it is not possible, 
take care since some encoding cannot display some caracters of some languages. 
For instance, japanese words of a sgf file in Shift-JIS cannot be transformed automatically and displayed in a page in "ISO-8859-1", 
but it can be transformed automatically and displayed in a page in "UTF-8".</p>
<p>Don't use charset names such as "UTF-8", "ISO-8859-1", "Shift-JIS", "Big5", "GB18030" as value of "lang" attribute
or "data-maxigos-l" parameter.
Use language codes instead, such as "en", "fr", "ja", zh-hans", "zh-hant"....</p>
<h2>Advanced usage</h2>
<h3>Components</h3>
<p>MaxiGos javascript code is split in several file scripts. 
Five of them, mgos_lib.js, mgos_rls.js, mgos_prs.js, mgos_src.js and mgos.js, 
share common functions.
Other javascript scripts contain component codes (usually one component per file script).
For instance, the goban, the navigation bar or the comment box are components.</p>
<p>The name of a component file starts with "mgos" followed by the component name and the ".js" extension.</p>
<p>Each component has parameters than can be set using
"data-maxigos-xxx" attributes (where "xxx" is a parameter name).</p>
<p>The components are:</p>
<ul>
<li>"About" (to display some information about the viewer),</li>
<li>"AnimatedStone" (to place a stone on the goban using an animation),</li>
<li>"BackToGame" (button to go to the nearest move of the main variation that was not add by the user),</li>
<li>"Cartouche" (a container for players names, their levels and the number of their prisoners),</li>
<li>"Comment" (simple comment, displays C sgf property),</li>
<li>"Cut" (button to cut a branch in the game tree, used with the "Edit" component),</li>
<li>"Edit" (to modify a sgf file, used with the "Info" and "Menu" components),</li>
<li>"File" (to create, open, save or send by email sgf files, used with the "Sgf" component, evenly used with the "Menu" component),</li>
<li>"Goban" (goban, displays sgf B, W, AB, AW, AE, LB, MA, CR, SQ, TR, TB, TW, ST, PL, and FG properties),</li>
<li>"Goto" (to go to another move in the game tree using a slider or an input field).</li>
<li>"Guess" (to try to guess the next move),</li>
<li>"Header" (to display sgf EV, RO, PB, PW, BR, WR, DT, PC, RU, TM, KM, HA, RE and GC properties),</li>
<li>"Help" (button to display help),</li>
<li>"Image" (button to generate a png image of the current state of the goban),</li>
<li>"Info" (to change EV, RO, DT, PC, PB, PW, BR, WR, KM, HA, RE, GC, AN, CP, SO, US, RU, TM, OT, ON, BT, WT, GN properties, used most often with the "Edit" component),</li>
<li>"Lesson" (to display comment in a balloon, sgf C, BM, DO, IT and TE properties),</li>
<li>"Loop" (to display moves in loop),</li>
<li>"Menu" (menu manager, used with at least one component among "File", "Edit" and "View"),</li>
<li>"MoveInfo" (to display last move information),</li>
<li>"Navigation" (buttons to navigate in the game tree),</li>
<li>"NotSeen" (to display list of moves as in book, need the "Diagram" component),</li>
<li>"Options" (to modify numbering, show/hide mark on the last move, ...),</li>
<li>"Pass" (pass button, to make a pass),</li>
<li>"Score" (score button, to add/remove TB and TW properties),</li>
<li>"Sgf" (sgf button, sgf record builder),</li>
<li>"Solve" ("retry" and "undo" buttons, provide an answer to the user move if found in the sgf),</li>
<li>"Speed" (loop speed, used with the "Loop" component),</li>
<li>"Tree" (game tree),</li>
<li>"Variations" (variation management),</li>
<li>"Version" (displays maxiGos version).</li>
<li>"View" (functions that change view, evenly used with the "Menu" component).</li>
</ul>
<h3>Global parameters</h3>
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">allowFileAsSource</span></td>
<td><span class="attribute">data-maxigos-allow-file-as-source</span></td>
<td>If 1, maxiGos accepts sgf files as data input.
</td><td>(0,1)</td><td>1</td></tr>
<tr>
<td><span class="parameter">allowStringAsSource</span></td>
<td><span class="attribute">data-maxigos-allow-string-as-source</span></td>
<td>If 1, maxiGos accepts sgf string records as data input.
</td><td>(0,1)</td><td>1</td></tr>
<tr>
<td><span class="parameter">initMethod</span></td>
<td><span class="attribute">data-maxigos-init-method</span></td>
<td>Initial action: display the goban as it was before the "first" move,
or after the "last" move, or "loop"
(in this case, <span class="component">Loop</span> component is required),
or advance of n nodes in the game tree.</td><td>"first", "last", "loop" or an integer</td><td>"first"</td></tr>
<tr>
<td><span class="parameter">sgfLoadCoreOnly</span></td>
<td><span class="attribute">data-maxigos-sgf-load-core-only</span></td>
<td>If 1, one keeps core information only on the game (EV, RO, DT, PC, PB, PW, BR, BW, BT, BW, RU, TM, OT, HA, KM, RE) when decoding sgf.</td><td>(0,1)</td><td>0</td></tr>
<tr>
<td><span class="parameter">sgfLoadMainOnly</span></td>
<td><span class="attribute">data-maxigos-sgf-load-main-only</span></td>
<td>If 1, one keeps main variation only when decoding sgf.</td><td>(0,1)</td><td>0</td></tr>
<tr>
<td><span class="parameter">sgfSaveCoreOnly</span></td>
<td><span class="attribute">data-maxigos-sgf-save-core-only</span></td>
<td>If 1, one keeps core information only on the game (EV, RO, DT, PC, PB, PW, BR, BW, BT, BW, RU, TM, OT, HA, KM, RE) when encoding sgf.</td><td>(0,1)</td><td>0</td></tr>
<tr>
<td><span class="parameter">sgfSaveMainOnly</span></td>
<td><span class="attribute">data-maxigos-sgf-load-main-only</span></td>
<td>If 1, one keeps main variation only when encoding sgf.</td><td>(0,1)</td><td>0</td></tr>
<tr>
<td><span class="parameter">sourceFilter</span></td>
<td><span class="attribute">data-maxigos-source-filter</span></td>
<td>A string representing a regular expression that the sgf source has to match
when it is inserted between html tags where the sgf viewer displays.
This parameter is useful for instance to discard unwanted data source
inserted by a user on a forum.
</td><td>Regular expression</td><td>^[^?]+\\.sgf$</td></tr>
</table>

<h3><span class="component">About</span> component</h3>
<p>This component contains the "About" button in its box,
which allows the user to display some information about the viewer.</p>
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">aboutAlias</span></td>
<td><span class="attribute">data-maxigos-about-alias</span></td>
<td>
Specify what element of the translation array
one has to use to display the label of the "About" button.
The string should contain a "_", and "_" alone means an empty string.
If null, maxiGos displays "About" on the button.</td>
<td>A string</td>
<td>null</td></tr>
<tr>
<td><span class="parameter">aboutBtnOn</span></td>
<td><span class="attribute">data-maxigos-about-btn-on</span></td>
<td>If 1, display the "About" button in its own component box.</td>
<td>(0,1)</td><td>0</td></tr>
</table>

<h3><span class="component">AnimatedStone</span> component</h3>
<p>This component moves the stones from the corner of the goban
to their final location.</p>
<table class="params">
<tr><th>Parameter</th><th>Use</th><th>Description</th><th>Values</th><th>Default value</th></tr>
<tr>
<td><span class="parameter">animatedStoneOn</span></td>
<td><span class="attribute">data-maxigos-animated-stone-on</span></td>
<td>If 1, maxiGos animates the stone placement.</td>
<td>(0,1)</td><td>0</td></tr>
<tr>
<td><span class="parameter">animatedStoneTime</span></td>
<td><span class="attribute">data-maxigos-animated-stone-time</span></td>
<td>Reference time used to compute duration of 
stone translation when placing it on the goban. The actual translation time depends of the distance
between the starting point and the ending point of the translation.<br><br>
Its default value is the value of the "loopTime" parameter if the "Loop" component is in use, 
otherwise 1000 ms.</td>
<td>Number</td><td>1000</td></tr>
</table>

<h3><span class="component">BackToGame</span> component</h3>
<p>This component displays a button to allow
the user to go back to the game after entering
some variations.</p>
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">backToGameAlias</span></td>
<td><span class="attribute">data-maxigos-back-to-game-alias</span></td>
<td>Specify what element of the translation array
one has to use to display the label of the "BackToGame" button.
The string should contain a "_", and "_" alone means an empty string.
If null, maxiGos displays "Back to game" on the button.</td>
<td>A string</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">backToGameBtnOn</span></td>
<td><span class="attribute">data-maxigos-back-to-game-btn-on</span></td>
<td>If 1, display the "BackToGame" button in its own component box.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
</table>

<h3><span class="component">Cartouche</span> component</h3>
<p>This component displays a cartouche for each player,
with his name, his rank, etc.</p>
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">bowlOn</span></td>
<td><span class="attribute">data-maxigos-bowl-on</span></td>
<td>If 1, maxiGos displays bowls in cartouches.</td>
<td>(0,1)</td>
<td>1</td>
</tr>
<tr>
<td><span class="parameter">cartoucheBoxOn</span></td>
<td><span class="attribute">data-maxigos-cartouche-box-on</span></td>
<td>If 1, maxiGos displays cartouches.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">prisonersOn</span></td>
<td><span class="attribute">data-maxigos-prisoners-on</span></td>
<td>If 1, maxiGos displays the number of prisoners of each players in cartouches.</td>
<td>(0,1)</td>
<td>1</td>
</tr>
<tr>
<td><span class="parameter">shortHeaderOn</span></td>
<td><span class="attribute">data-maxigos-short-header-on</span></td>
<td>If 1, maxiGos displays in cartouches for each player
a stone of his color, his name and his level.</td>
<td>(0,1)</td>
<td>1</td>
</tr>
</table>

<h3><span class="component">Comment</span> component</h3>
<p>This component displays sgf comments in its box.</p>
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">allInComment</span></td>
<td><span class="attribute">data-maxigos-all-in-comment</span></td>
<td>If 1, maxiGos concats all comment from game root to current move
and displays it in comment box.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">canCommentFocus</span></td>
<td><span class="attribute">data-maxigos-can-comment-focus</span></td>
<td>If 1, comment box can take the focus.<br><br>
When one are sure that the whole comment can be displayed
without scrollbars, this parameter should be set to 0.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">commentCaptionOn</span></td>
<td><span class="attribute">data-maxigos-comment-caption-on</span></td>
<td>If 1, maxiGos displays a caption ("Comments") for the comment box.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">headerInComment</span></td>
<td><span class="attribute">data-maxigos-header-in-comment</span></td>
<td>
If 1, maxiGos displays the header in the comment box.<br><br>
The <span class="component">Header</span> component has to be in use too, otherwise this parameter has no effect.
</td>
<td>(0,1)</td>
<td>0</td>
</tr></table>

<h3><span class="component">Cut</span> component</h3>
<p>This component displays a button to allow
the user to cut the curent variation.</p>
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">cutAlias</span></td>
<td><span class="attribute">data-maxigos-cut-alias</span></td>
<td>Specify what element of the translation array
one has to use to display the label of the "Cut" button.
The string should contain a "_", and "_" alone means an empty string.
If null, maxiGos displays "Cut" on the button.</td>
<td>A string</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">cutBtnOn</span></td>
<td><span class="attribute">data-maxigos-cut-btn-on</span></td>
<td>If 1, display the "Cut" button in its own component box.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
</table>

<h3><span class="component">Edit</span> component</h3>
<p>This component contains two sub-components: "EditToolBar" and "EditCommentTool".</p>
<p>This component displays a tool bar and a comment editor.</p>
<p>It doesn't have any parameters.</p>

<h3><span class="component">File</span> component</h3>
<p>This component displays a menu to manage files ("New", "Open", "Save", etc.)</p>
<p>It is used with <span class="component">Menu</span> component.</p>
<p>It doesn't have any parameters.</p>

<h3><span class="component">Goban</span> component</h3>
<p>This component displays the goban.</p>
<p>It is the only one mandatory component.</p>
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">asInBookOn</span></td>
<td><span class="attribute">data-maxigos-as-in-book-on</span></td>
<td>If 1, maxiGos displays stones as in books
(i.e. prisoners are left on the goban).
If 0, maxiGos removes prisoners from the goban.
If null, maxiGos looks at sgf FG property
to determine what to do.<br><br>
This parameter is useful to display diagrams, figures and kifus.
</td>
<td>(0,1,null)</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">eraseGridUnder</span></td>
<td><span class="attribute">data-maxigos-erase-grid-under</span></td>
<td>If 1, maxiGos erases grid under
marks and labels.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">gridMargin</span></td>
<td><span class="attribute">data-maxigos-grid-margin</span></td>
<td>Grid margin.</td>
<td>A real integer</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">gridPadding</span></td>
<td><span class="attribute">data-maxigos-grid-padding</span></td>
<td>Grid padding.</td>
<td>A real number</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">gobanMargin</span></td>
<td><span class="attribute">data-maxigos-goban-margin</span></td>
<td>Goban margin.</td>
<td>A real number</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">gobanPadding</span></td>
<td><span class="attribute">data-maxigos-goban-padding</span></td>
<td>Goban padding.</td>
<td>A real number</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">in3dOn</span></td>
<td><span class="attribute">data-maxigos-in3d-on</span></td>
<td>If 1, maxiGos displays stones with a 3d effect.<br><br>
Even if this component is mainly used by
<span class="component">Goban</span> component,
it is also used by <span class="component">Cartouche</span>,
<span class="component">MoveInfo</span>
and <span class="component">NotSeen</span> components.</td>
<td>(0,1)</td>
<td>1</td>
</tr>
<tr>
<td><span class="parameter">indicesOn</span></td>
<td><span class="attribute">data-maxigos-indices-on</span></td>
<td>If 1, maxiGos displays indices.
If 0, maxiGos hides indices.
If null, maxiGos looks for sgf FG property
to determine if indices have to be displayed.</td>
<td>(0,1,null)</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">japaneseIndicesOn</span></td>
<td><span class="attribute">data-maxigos-japanese-indices-on</span></td>
<td>If 1, maxiGos displays "iroha" indices.<br><br>
<span class="parameter">indicesOn</span> should be set to 1.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">marksAndLabelsOn</span></td>
<td><span class="attribute">data-maxigos-marks-and-labels-on</span></td>
<td>If 1, maxiGos displays marks and labels.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">markOnLastOn</span></td>
<td><span class="attribute">data-maxigos-mark-on-last-on</span></td>
<td>If 1, maxiGos displays a mark on the last played move.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">numAsMarkOnLastOn</span></td>
<td><span class="attribute">data-maxigos-num-as-mark-on-last-on</span></td>
<td>If 1, maxiGos displays a number as mark on last played move.<br><br>
<span class="parameter">markOnLastOn</span> should be set to 1.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">numberingOn</span></td>
<td><span class="attribute">data-maxigos-numbering-on</span></td>
<td>If 2, maxiGos displays numbers on stones modulo 100.
If 1, maxiGos displays numbers on stones.
If 0, maxiGos hides numbers on stones.
If null, maxiGos looks for FG, MN et PM sgf properties
to determine how to display numbers on stones.</td>
<td>(0,1,2,null)</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">oldJapaneseIndicesOn</span></td>
<td><span class="attribute">data-maxigos-old-japanese-indices-on</span></td>
<td>If 1, maxiGos uses kanjis to display indices.<br><br>
<span class="parameter">indicesOn</span> has to be set to 1.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">oldJapaneseNumberingOn</span></td>
<td><span class="attribute">data-maxigos-old-japanese-numbering-on</span></td>
<td>If 1, maxiGos uses kanjis to number stones.<br><br>
<span class="parameter">numberingOn</span> parameter should be set to 1.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">pointsNumMax</span></td>
<td><span class="attribute">data-maxigos-points-num-max</span></td>
<td>This parameter is useful when one wants to display
gobans (or part of gobans) with different numbers of lines in the same page.
If 0, maxiGos displays gobans (or part of gobans) as large as possible inside its container.
Otherwise, maxiGos compute the width of a reference goban
which has pointsNumMax vertical lines.
Then it displays all gobans with the same distance between their lines.
Gobans with more than <span class="parameter">pointsNumMax</span> intersections
are displayed with the reference goban width.</td>
<td>A positive integer</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">specialStoneOn</span></td>
<td><span class="attribute">data-maxigos-special-stone-on</span></td>
<td>If 1, maxiGos draws grey curves on white stones
(to imitate shell stones)
and a different glint on black stones
(to imitate slate stones).<br><br>
This is notably slower than the default display.<br><br>
<span class="parameter">in3dOn</span> parameter should be set to 1.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">stoneShadowOn</span></td>
<td><span class="attribute">data-maxigos-stone-shadow-on</span></td>
<td>If 1, maxiGos displays a shadow around the stones.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">stretching</span></td>
<td><span class="attribute">data-maxigos-stretching</span></td>
<td>Specify how many pixels have to be added around the stones.
<br><br>
Number #1 : pixels (svg coordinates) to add horizontally if 3d is on.<br>
Number #2 : pixels (svg coordinates) to add vertically if 3d is on.<br>
Number #3 : pixels (svg coordinates) to add horizontally if 2d is on.<br>
Number #4 : pixels (svg coordinates) to add vertically if 2d is on.<br>
</td>
<td>list of four real numbers</td>
<td>"0,0,1,1"</td>
</tr>
<tr>
<td><span class="parameter">territoryMark</span></td>
<td><span class="attribute">data-maxigos-territory-mark</span></td>
<td>Territory mark shape
(specified by sgf TB and TW properties):
<ul><li>"MA": cross</li><li>"MS": small stones</li></ul>
</td>
<td>("MA","MS")</td>
<td>"MS"</td>
</tr>
</table>

<h3><span class="component">Goto</span> component</h3>
<p>This component displays a slider in its own box
to allow the user to move in the sgf tree.</p>
<p>It also provides a text input field for
the navigation bar to displays the current move number
and to allow the user to change the current move.
To display this text input field in the navigation bar, just add "Goto"
to the <span class="parameter">navigations</span> parameter value.</p>
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">gotoBoxOn</span></td>
<td><span class="attribute">data-maxigos-goto-box-on</span></td>
<td>If 1, maxiGos displays a slider in the component box
to move in the sgf tree.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
</table>

<h3><span class="component">Guess</span> component</h3>
<p>This component allows the user to click on the goban
and place a move if this move is in the sgf.</p>
<p>It can also display a guess meter in its own box
that indicates the distance between the user last click
and the nearest continuation move found in the sgf.
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">guessBoxOn</span></td>
<td><span class="attribute">data-maxigos-guess-box-on</span></td>
<td>if 1, maxiGos displays a guess meter in the component box
that indicates the distance between the user last click
and the nearest continuation move found in the sgf.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">canPlaceGuess</span></td>
<td><span class="attribute">data-maxigos-can-place-guess</span></td>
<td>If 1, maxiGos place a move after a click of the user
on a point of the goban
only if there is a move at this point in the sgf.
If 0 and <span class="parameter">canPlaceVariation</span>
is 1, maxiGos place a move after a click of the user
on a point of the goban even if there is no move at this point in the sgf.
If both parameters are 0, maxiGos doesn't place anything
on the goban.<br><br>
This parameter is ignored if
<span class="parameter">canPlaceVariation</span> is 1.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
</table>

<h3><span class="component">Header</span> component</h3>
<p>This component displays a button or a box to display the sgf header.</p>
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">canHeaderFocus</span></td>
<td><span class="attribute">data-maxigos-can-header-focus</span></td>
<td>If 1, header box can take the focus.<br><br>
When one are sure that the whole header can be displayed
without scrollbars, this parameter should be set to 0.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">concatInHeader</span></td>
<td><span class="attribute">data-maxigos-concat-in-header</span></td>
<td>Set of element pairs to concatenate. The pairs can be:
<ul>
<li>DateToTitle: date after the title,</li>
<li>HandicapToResult: handicap after the result,</li>
<li>KomiToResult: komi after the result,</li>
<li>NumOfMovesToResult: number of moves after the result,</li>
<li>TeamToPlayer: team name after the players' name.</li>
</ul>
</td>
<td>Set of chains (comma-separated)</td>
<td>""</td>
</tr>
<tr>
<td><span class="parameter">headerAlias</span></td>
<td><span class="attribute">data-maxigos-header-alias</span></td>
<td>Specify what element of the translation array
one has to use to display the label of the "Header" button.
The string should contain a "_", and "_" alone means an empty string.
If null, maxiGos displays "Header" on the button.</td>
<td>A string</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">headerBoxOn</span></td>
<td><span class="attribute">data-maxigos-header-box-on</span></td>
<td>If 1, maxiGos displays the sgf header in the component box
(values of sgf EV, RO, DT, PC etc. properties).
</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">headerBtnOn</span></td>
<td><span class="attribute">data-maxigos-header-btn-on</span></td>
<td>If 1,
maxiGos displays an "Informations" button in the component box
instead of displaying the header itself. 
A click on this button displays the header in a dialog.
This parameter is ignored if <span class="parameter">headerBoxOn</span> is 1.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideInHeader</span></td>
<td><span class="attribute">data-maxigos-hide-in-header</span></td>
<td>Set of header items to hide. The items can be:
<ul>
<li>Black (name and level of Black, PB and BR sgf properties)</li>
<li>Date (date, DT sgf property)</li>
<li>GeneralComment (general comment, GC sgf property)</li>
<li>Handicap (handicap, HA sgf property)</li>
<li>Komi (komi, KM sgf property)</li>
<li>NumOfMoves (number of moves of the main variation)</li>
<li>NumOfMovesLabel (the "Number of moves:" string)</li>
<li>Place (place, PC sgf property)</li>
<li>Result (result, RE sgf property)</li>
<li>ResultLabel (the "Result:" string)</li>
<li>Rules (rules, RU sgf property)</li>
<li>TimeLimits (time limits, TM sgf property)</li>
<li>Title (title, EV and RO sgf properties)</li>
<li>White (name and level of White, PW and WR sgf properties)</li>
</ul>
</td>
<td>Set of strings (comma-separated)</td>
<td>""</td>
</tr>
<tr>
<td><span class="parameter">translateTitleOn</span></td>
<td><span class="attribute">data-maxigos-translate-title-on</span></td>
<td>If 1, maxiGos tries to translate the title,
using translation functions in "_i18n" scripts files.<br><br>
The title is built from sgf EV and RO properties. 
EV should be "x t" with x as
"1st" or "2nd" or "3rd" or "nth", n a number, 
and t a title name such as "Honinbo", "Meijin", "Ing Cup", ...
RO should be "n" or "n (s)" or "(s)", n a number, 
and s a string among "final", "semi-final", "quarter-final", "playoff", "round" or "game".
</td>
<td>(0,1)</td>
<td>0</td>
</tr>
</table>
<p>Note 1: if headerBoxOn and headerBtnOn are both 0, maxiGos doesn't display the "Header" component box.
But it can still display the header in "Comment" component box if "headerInComment" is set to 1.</p>
<p>Note 2: the difference between the "Header" component and the "Info" component is
that one can modify the content of the header using the "Info" component
while the "Header" component simply displays its content.</p>

<h3><span class="component">Help</span> component</h3>
<p>This component displays a button in its own box
to allows the user to display help in a dialog.</p>
<p>It is designed to be used in <span class="config">Edit</span> configuration.</p>
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">helpBtnOn</span></td>
<td><span class="attribute">data-maxigos-help-btn-on</span></td>
<td>If 1, maxiGos displays the "Help" button.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">helpAlias</span></td>
<td><span class="attribute">data-maxigos-help-alias</span></td>
<td>Specify what element of the translation array
one has to use to display the label of the "Help" button.
The string should contain a "_", and "_" alone means an empty string.
If null, maxiGos displays "Help" on the button.</td>
<td>A string</td>
<td>null</td>
</tr>
</table>

<h3><span class="component">Image</span> component</h3>
<p>This component contains two sub-components: "Png" and "Svg".</p>
<p>Each of them can display a button in their own box to
make a PNG image or a SVG image of the current state of the goban.</p>
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">pngAlias</span></td>
<td><span class="attribute">data-maxigos-png-alias</span></td>
<td>Specify what element of the translation array
one has to use to display the label of the "Png" button.
The string should contain a "_", and "_" alone means an empty string.
If null, maxiGos displays "PNG" on the button.</td>
<td>A string</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">pngBtnOn</span></td>
<td><span class="attribute">data-maxigos-png-btn-on</span></td>
<td>If 1, maxiGos displays the "Png" button.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">svgAlias</span></td>
<td><span class="attribute">data-maxigos-svg-alias</span></td>
<td>Specify what element of the translation array
one has to use to display the label of the "Svg" button.
The string should contain a "_", and "_" alone means an empty string.
If null, maxiGos displays "Svg" on the button.</td>
<td>A string</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">svgBtnOn</span></td>
<td><span class="attribute">data-maxigos-svg-btn-on</span></td>
<td>If 1, maxiGos displays the "Svg" button.</td>
<td>(0,1)</td>
<td>0</td>
</tr></table>

<h3><span class="component">Info</span> component</h3>
<p>This component displays a form in a dialog to edit sgf properties
such as EV, RO, DT, PC, PB, PW, etc.</p>
<p>It is designed to be used in <span class="config">Edit</span> configuration.</p>
<p>It doesn't have any parameters.</p>

<h3><span class="component">Lesson</span> component</h3>
<p>This component displays in its own box an assistant and a bubble
containing sgf comments.</p>
<p>It doesn't have any parameter.</p>

<h3><span class="component">Loop</span> component</h3>
<p>This component displays moves on a loop.</p>
<p>It also provides the "Auto" and "Pause" buttons for the navigation bar,
to start or stop the display on a loop.
To display these buttons in the navigation bar, just add "Loop"
to the <span class="parameter">navigations</span> parameter value.
</p>
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">loopTime</span></td>
<td><span class="attribute">data-maxigos-loop-time</span></td>
<td>Reference time (in milliseconds) used to compute iddle time between the display of two sgf nodes.
Iddle time T is longer when a comment of L bytes length is found in the node in order
to let the user enough time to read the comment.
T is computed by the following formula: T=(L/20+1)*loopTime.</td>
<td>A positive integer</td>
<td>1000</td>
</tr>
<tr>
<td><span class="parameter">initialLoopTime</span></td>
<td><span class="attribute">data-maxigos-loop-time</span></td>
<td>Reference time (in milliseconds) to compute iddle time of the initial node.
This iddle time is computed by the following formula: 
T=initialLoopTime*loopTime/1000.</td>
<td>A positive integer</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">finalLoopTime</span></td>
<td><span class="attribute">data-maxigos-loop-time</span></td>
<td>Reference time (in milliseconds) to compute iddle time of the final node.
This iddle time is computed by the following formula: 
T=finalLoopTime*loopTime/1000.</td>
<td>A positive integer</td>
<td>0</td>
</tr>
</table>

<h3><span class="component">Menu</span> component</h3>
<p>This component displays a list of menus in its own box.</p>
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">menus</span></td>
<td><span class="attribute">data-maxigos-menus</span></td>
<td>List of menus displayed by <span class="component">Menu</span>
component.<br><br>
Available menus are:
"File" (require <span class="component">File</span> component),
"Edit" (require <span class="component">Edit</span> component),
"View" (require <span class="component">View</span> component)
and "Windows".</td>
<td>Comma-separated list of string</td>
<td>""</td>
</tr>
<tr>
<td><span class="parameter">menuTimeout</span></td>
<td><span class="attribute">data-maxigos-menu-timeout</span></td>
<td>The amount of time (in milliseconds) that
the submenus remain visible.</td>
<td>A positive integer</td>
<td>10000</td>
</tr></table>

<h3><span class="component">MoveInfo</span> component</h3>
<p>This component displays the current move number and its coordinates
in its own box.</p>
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">onlyMoveNumber</span></td>
<td><span class="attribute">data-maxigos-only-move-number</span></td>
<td>if 1, maxiGos displays the move number only.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
</table>

<h3><span class="component">Navigation</span> component</h3>
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">navigations</span></td>
<td><span class="attribute">data-maxigos-navigations</span></td>
<td>Set of buttons or input displayed by the
<span class="component">Navigation</span> component.<br><br>
The set can contains: "First", "TenPred", "Pred", "Next, "TenNext",
"Last", "Auto", "Pause" and "Goto".<br><br>
"Auto" and "Pause" require the <span class="component">Loop</span> component.<br><br>
"Goto"requires the <span class="component">Goto</span> component.</td>
<td>Set of strings (comma-separated)</td>
<td>"First,TenPred,Pred,Next,TenNext,Last"</td>
</tr>
</table>

<h3><span class="component">NotSeen</span> component</h3>
<p>This component displays the list of moves not
visible on the goban.</p>
<p>This is useful when <span class="parameter">asInBookOn</span>
parameter is set to 1.</p>
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">notSeenTwinStonesOn</span></td>
<td><span class="attribute">data-maxigos-not-seen-twin-stones-on</span></td>
<td>If 1, maxiGos displays on what stone a move is played
if the stone has a number, a label or a mark,
else it displays the coordinates of the move.
If 0, it always displays the coordinates of the move.</td>
<td>(0,1)</td>
<td>1</td>
</tr>
</table>

<h3><span class="component">Options</span> component</h3>
<p>This component displays a button or a box to change options.</p>
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">hideInOptions</span></td>
<td><span class="attribute">data-maxigos-hide-in-options</span></td>
<td>Set of options items to hide. The items can be:
<ul>
<li>AnimatedStoneOn,</li>
<li>AnimatedStoneTime,</li>
<li>AsInBookOn,</li>
<li>CanGuess,</li>
<li>CanVariation,</li>
<li>In3dOn,</li>
<li>IndicesOn,</li>
<li>LoopTime,</li>
<li>MarksAndLabelsOn,</li>
<li>MarkOnLastOn,</li>
<li>NumberingOn,</li>
<li>ScoreMethod,</li>
<li>SiblingsOn,</li>
<li>VariationMarksOn.</li>
</ul>
</td>
<td>Set of strings (comma-separated)</td>
<td>""</td>
</tr>
<tr>
<td><span class="parameter">optionsAlias</span></td>
<td><span class="attribute">data-maxigos-options-alias</span></td>
<td>Specify what element of the translation array
one has to use to display the label of the "Options" button.
The string should contain a "_", and "_" alone means
an empty string.
If null, maxiGos displays "Options" on the button.</td>
<td>A string</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">optionsBoxOn</span></td>
<td><span class="attribute">data-maxigos-options-box-on</span></td>
<td>If 1, maxiGos displays options in the component box.
</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">optionsBtnOn</span></td>
<td><span class="attribute">data-maxigos-options-btn-on</span></td>
<td>If 1, maxiGos displays the "Options" button in the component box.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
</table>

<h3><span class="component">Pass</span> component</h3>
<p>This component displays the "Pass" button in its own box.</p>
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">canPassOnlyIfPassInSgf</span></td>
<td><span class="attribute">data-maxigos-can-pass-only-if-in-sgf</span></td>
<td>If 1, maxiGos enables the "Pass" button only if
one of the next moves in the sgf is a pass.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">passAlias</span></td>
<td><span class="attribute">data-maxigos-pass-alias</span></td>
<td>Specify what element of the translation array
one has to use to display the label of the "Pass" button.
The string should contain a "_", and "_" alone means
an empty string.
If null, maxiGos displays "Pass" on the button.</td>
<td>A string</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">passBtnOn</span></td>
<td><span class="attribute">data-maxigos-pass-btn-on</span></td>
<td>If 1, maxiGos displays the "Pass" button in the component box.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
</table>

<h3><span class="component">Score</span> component</h3>
<p>This component displays the "Score" button in its own box.</p>
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">ephemeralScore</span></td>
<td><span class="attribute">data-maxigos-ephemeral-score</span></td>
<td>If 1, maxiGos doesn't register TB or TW
added by <span class="component">Score</span> component in the Sgf.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">scoreAlias</span></td>
<td><span class="attribute">data-maxigos-score-alias</span></td>
<td>Specify what element of the translation array
one has to use to display the label of the "Score" button.
The string should contain a "_", and "_" alone means
an empty string.
If null, maxiGos displays "Score" on the button.</td>
<td>A string</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">scoreBtnOn</span></td>
<td><span class="attribute">data-maxigos-score-btn-on</span></td>
<td>If 1, maxiGos displays the "Score" button in the component box.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">scoreDefaultRules</span></td>
<td><span class="attribute">data-maxigos-score-default-rules</span></td>
<td>Default rules if no rules found in the Sgf.</td>
<td>A string (AGA, Chinese, Japanese, etc.)</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">scoreMethod</span></td>
<td><span class="attribute">data-maxigos-score-method</span></td>
<td>Specify the method to add/remove TB and TW.<br><br>
Trivial:
a click on a stone adds or removes a TB or a TW of the opposite color of that stone.
A click on an empty point adds, swaps or removes a TB or a TW.
<br><br>
Counting:
a click on a stone adds or removes a TB or a TW of the opposite color of that stone,
as well as on all empty points and stones of the same color next to this stone.
A click on an empty point adds or removes a TB or TW
as well as on all empty points next to this point,
if these points are surrounded by stones of the same color.
</td>
<td>("trivial","counting")</td>
<td>"trivial"</td>
</tr>
<tr>
<td><span class="parameter">scoreInComment</span></td>
<td><span class="attribute">data-maxigos-score-in-comment</span></td>
<td>If 1, maxiGos displays the score in a comment box if any.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
</table>

<h3><span class="component">Sgf</span> component</h3>
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">sgfAction</span></td>
<td><span class="attribute">data-maxigos-sgf-action</span></td>
<td>Action when one clicks on the "Sgf" button.
If "Show", the sgf is display in a box over the goban.
If "Download", the sgf is downloaded
(if it is possible with the device in use).</td>
<td>"Show" or "Download"</td>
<td>"Show"</td>
</tr>
<tr>
<td><span class="parameter">sgfAlias</span></td>
<td><span class="attribute">data-maxigos-sgf-alias</span></td>
<td>Specify what element of the translation array
one has to use to display the label of the "Sgf" button.
The string should contain a "_", and "_" alone means
an empty string.
If null, maxiGos displays "Sgf" on the button.</td>
<td>A string</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">sgfBtnOn</span></td>
<td><span class="attribute">data-maxigos-sgf-btn-on</span></td>
<td>If 1, maxiGos displays the "Sgf" button in the component box.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">toCharset</span></td>
<td><span class="attribute">data-maxigos-to-charset</span></td>
<td>This parameter takes the value
of a charset ("UTF-8", "Big5", "GB18030", "Shift_JIS" ...).
It specifies the charset used to encode sgf files 
(the value of the sgf CA property is replaced by the value
of this parameter).
It is not used when reading or displaying a sgf,
and it can be different from the page charset.
In practice, the best is to use "UTF-8" whenever possible
or to use the charset of the page.
</td>
<td>A string which is a charset code</td>
<td>"UTF-8"</td>
</tr>
</table>

<h3><span class="component">Solve</span> component</h3>
<p>This component displays a list of buttons
to retry, undo, show a hint or pass.</p>
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">canPlaceSolve</span></td>
<td><span class="attribute">data-maxigos-can-place-solve</span></td>
<td>If 1, maxiGos places the user move it is in the sgf,
and answers this move.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">oldSolveBtnOn</span></td>
<td><span class="attribute">data-maxigos-old-solve-btn-on</span></td>
<td>If 1, maxiGos displays the "Retry" button as "First" button,
the "Undo" button as "Pred" button, and the "Hint" button
as "Next" button.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">solves</span></td>
<td><span class="attribute">data-maxigos-solves</span></td>
<td>List of buttons to display in the component box
among "Retry", "Undo", "Pass" and "Hint".</td>
<td>Comma-separated list of string</td>
<td>"Retry,Undo"</td>
</tr>
<tr>
<td><span class="parameter">specialMoveMatch</span></td>
<td><span class="attribute">data-maxigos-special-move-match</span></td>
<td>In theory, the standard way to represent a move played elsewhere (i.e. a tenuki) is 
to put in the sgf two consecutive moves of the opposite color. However, for historical reasons,
some sgf files use other methods to do that such as inserting pass moves, 
or moves played in the invisible part of the goban, or moves played outside the goban.
This parameter is designed to address these cases.<br><br>
If 0, maxiGos places the user move if it matches one of the continuation moves in the sgf 
or if two consecutive moves of the opposite color are found in the sgf.<br><br>
If 1, maxiGos places the user move if it matches one of the continuation moves in the sgf 
or if two consecutive moves of the opposite color are found in the sgf
or if one move in the sgf coordinates are outside the goban (such B[zz] or W[zz] on a 19x19 for instance).<br><br>
If 2, maxiGos places the user move if it matches one of the continuation moves in the sgf 
or if two consecutive moves of the opposite color are found in the sgf
or if one move in the sgf coordinates are outside the goban (such B[zz] or W[zz] on a 19x19 for instance) 
or in the invisble part of the goban (when a VW property is used).<br><br>
If 3, maxiGos places the user move if it matches one of the continuation moves in the sgf 
or if two consecutive moves of the opposite color are found in the sgf
or if one move in the sgf coordinates are outside the goban (such B[zz] or W[zz] on a 19x19 for instance) 
or in the invisble part of the goban (when a VW property is used) or is a pass.<br><br>
</td>
<td>(0,1,2,3)</td>
<td>0</td>
</tr>
</table>

<h3><span class="component">Speed</span> component</h3>
<p>This component show a slider and two buttons to change
the loop speed (i.e. <span class="parameter">loopTime</span> parameter).</p>
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">loopTimeMax</span></td>
<td><span class="attribute">data-maxigos-loop-time-max</span></td>
<td>Maximal time (in millisecondes) between two moves.</td>
<td>A positive real number</td>
<td>10000</td>
</tr>
</table>

<h3><span class="component">Tree</span> component</h3>
<p>This component displays the moves tree.</p>
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">canTreeFocus</span></td>
<td><span class="attribute">data-maxigos-can-tree-focus</span></td>
<td>If 1, tree box can take the focus.<br><br>
When one are sure that the whole tree can be displayed
without scrollbars, this parameter should be set to 0.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideTreeNumbering</span></td>
<td><span class="attribute">data-maxigos-hide-tree-numbering</span></td>
<td>If 1, maxiGos hides numbers on tree stones.</td>
<td>(0,1)</td>
<td>1</td>
</tr>
<tr>
<td><span class="parameter">markCommentOnTree</span></td>
<td><span class="attribute">data-maxigos-mark-comment-on-tree</span></td>
<td>If 1, maxiGos replaces numbers of commented moves
by a "?" in the tree.</td>
<td>(0,1)</td>
<td>1</td>
</tr>
<tr>
<td><span class="parameter">treeCaptionOn</span></td>
<td><span class="attribute">data-maxigos-tree-caption-on</span></td>
<td>If 1, maxiGos displays a caption ("Game tree") for the tree box.</td>
<td>(0,1)</td>
<td>0</td>
</tr></table>

<h3><span class="component">Variations</span> component</h3>
<p>This component allows to display variations.</p>
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">canPlaceVariation</span></td>
<td><span class="attribute">data-maxigos-can-place-variation</span></td>
<td>If 1, maxiGos place a move on the point where the user just clicked,
event if the move is not in the sgf.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideSingleVariationMarkOn</span></td>
<td><span class="attribute">data-maxigos-hide-single-variation-marks-on</span></td>
<td>If 1, maxiGos displays variation marks
only if there are at least two marks.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">siblingsOn</span></td>
<td><span class="attribute">data-maxigos-siblings-on</span></td>
<td>If 1, maxiGos displays variations of current node, otherwise of the next node.
If "null", maxiGos displays variations as specified by
the sgf ST property.</td>
<td>(0,1,null)</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">variationBoxOn</span></td>
<td><span class="attribute">data-maxigos-variation-box-on</span></td>
<td>If 1, maxiGos displays a list of variation buttons
in the component box.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">variationMarkSeed</span></td>
<td><span class="attribute">data-maxigos-variation-mark-seed</span></td>
<td>By default, maxiGos generates variation marks starting at "1".
To use something else as variation marks,
set this parameter to a list of characters.
For instance, to use some hiraganas as mark, set this parameter to
"あ,い,う,え,お,か,き,く,け,こ,た,ち,つ,て,と,さ,し,す,せ,そ".
</td>
<td>A list of characters</td>
<td>null</td></tr>
<tr>
<td><span class="parameter">variationMarksOn</span></td>
<td><span class="attribute">data-maxigos-variation-marks-on</span></td>
<td>If 1, maxiGos displays mark on variation. If 0, it hides them.
If "null", maxiGos displays mark on variation as specified
by the sgf ST property.</td>
<td>(0,1,null)</td>
<td>null</td>
</tr>
</table>

<h3><span class="component">Version</span> component</h3>
<p>This component displays maxiGos version in its box.</p>
<table class="params">
<tr>
<th>Parameter</th>
<th>Attribute</th>
<th>Description</th>
<th>Possible values</th>
<th>Default value</th>
</tr>
<tr>
<td><span class="parameter">versionBoxOn</span></td>
<td><span class="attribute">data-maxigos-version-box-on</span></td>
<td>If 1, maxiGos displays its version in component box.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
</table>

<h3><span class="component">View</span> component</h3>
<p>This component displays a menu (used with the "Menu" component)
to modify some display parameters
such as the "in3dOn" parameter, the "shadowOn" parameter, etc.</p>
<p>It doesn't have any parameters.</p>

<h2>Css classes and tags used by maxiGos</h2>
<h3>Overview</h3>
<p>Each maxiGos theme has its own css style sheet stored in "_css"
folder of the samples.</p> 
<p>This style sheet is automatically included to the page by maxiGos.</p>
<p>It is not necessary to add it in the
<span class="tag">&lt;head&gt;</span> tag of the page.</p>
<p>Most html tag of maxiGos have an id and a class.</p>
<p>Tags are:</p>
<ul>
<li>a global <span class="tag">&lt;div&gt;</span></li>
<li>tags that encapsulate each component
(in practice a <span class="tag">&lt;div&gt;</span> tag,
even if it is not a requirement)</li>
<li>various internal tags in components</li>
<li>Some <span class="tag">&lt;div&gt;</span> that group other tags.</li>
</ul>
<p>Each viewer has an id starting by "d", followed by a number
("1" for the first viewer of the page, "2" for the second, etc.)</p>
<p>Each component tag id
is prefixed by its viewer id and followed by the component name and the tag name.
For instance the goban component <span class="tag">&lt;div&gt;</span> id
of the third viewer in the page is "d3GobanDiv".</p>
<p>Each class is prefixed by "mx" instead of the id of the viewer.</p>
<p>The name of the global <span class="tag">&lt;div&gt;</span>
is "GlobalBox". Therefore its id is "dnGlobalBoxDiv",
and its class is "mxGlobalBoxDiv".</p>
<p>As a result, the whole tags of the third viewer in a page are in:</p>
<pre><code>
&lt;div class="mxGlobalBoxDiv" id="d3GlobalBoxDiv"&gt;...&lt;/div&gt;
</code></pre>
<p>Some other classes can be added by maxiGos.</p>
<h3>Class and tag list</h3>
<p>Here is a list of tags that can be styled and the name of the associated classes.</p>

<section class="classList">
<h4>Global box</h4>
<ul>
<li>div.mxGlobalBoxDiv,</li>
<li>div.mx + theme name + Theme,</li>
<li>div.mx + configuration name + Config,</li>
<li>div.mxIn3d or div.mxIn2d according to <span class="parameter">in3dOn</span> value.</li>
<li>div.mxIndicesOn or div.mxIndicesOff according to <span class="parameter">indicesOn</span> value.</li>
</ul>

<h4> Grouping boxes</h4>
<ul>
<li>div.mx + component name + ParentDiv</li>
<li>div.mx + component name + GrandParentDiv</li>
<li>div.mx + component name + GreatGrandParentDiv</li>
<li>div.mx + component name + GreatGreatGrandParentDiv</li>
<li>...</li>
</ul>

<h4>Components</h4>

<ul>
<li>div.mxAboutDiv (<span class="parameter">aboutBtnOn</span>=1)
	<ul>
	<li>button.mxBtn.mxAboutBtn</li>
	</ul>
</ul>

<ul>
<li>div.mxBackToMainDiv (<span class="parameter">backToMainBtnOn</span>=1)
	<ul>
	<li>button.mxBtn.mxBackToMainBtn</li>
	</ul>
</li>
</ul>

<ul>
<li>div.mxCommentDiv
	<ul>
	<li>div.mxCommentCaptionDiv (<span class="parameter">commentCaptionOn</span>=1)</li>
	<li>div.mxCommentContentDiv
		<ul>
		<li>composant <span class="component">Header</span> tags (<span class="parameter">headerInComment</span>=1)</li>
		<li>p
			<ul>
			<li>span.mxMoveNumberSpan (<span class="parameter">allInComment</span>=1)</li>
			<li>span.mxInitialSpan (<span class="component">Solve</span> component)</li>
			<li>span.mxOffpathSpan (<span class="component">Solve</span> component)</li>
			<li>span.mxFailSpan (<span class="component">Solve</span> component)</li>
			<li>span.mxSuccessSpan (<span class="component">Solve</span> component)</li>
			<li>span.mxNowhereSpan (<span class="component">Solve</span> component)</li>
			<li>span.mxForbiddenSpan (<span class="component">Solve</span> component)</li>
			<li>span.mxEndSpan (<span class="component">Solve</span> component)</li>
			</ul>
		</li>
			</ul>
		</li>
		</ul>
	</li>
	</ul>
</li>
</ul>

<ul>
<li>div.mxCutDiv (<span class="parameter">cutBtnOn</span>=1)
	<ul>
	<li>button.mxBtn.mxCutBtn</li>
	</ul>
</li>
</ul>

<ul>
<li>div.mxEditToolBarDiv (<span class="component">Edit</span> component)
	<ul>
	<li>button svg, and input + (.mxUnselectedEditTool or .mxSelectedEditTool)</li>
	</ul>
</li>
</ul>

<ul>
<li>div.mxEditCommentToolDiv (<span class="component">Edit</span> component)
	<ul>
	<li>textarea</li>
	</ul>
</li>
</ul>

<ul>
<li>div.mxGobanDiv
	<ul>
	<li>div.mxInnerGobanDiv
		<ul>
		<li>svg</li>
		</ul>
	</li>
	</ul>
</li>
</ul>

<ul>
<li>div.mxGotoDiv svg</li>
</ul>

<ul>
<li>div.mxGuessDiv svg</li>
</ul>

<ul>
<li>div.mxHeaderDiv (<span class="parameter">headerBtnOn</span>=0)
	<ul>
	<li>p.mxTitleP
		<ul>
		<li>span.mxEVTitleSpan</li>
		<li>span.mxROTitleSpan</li>
		</ul>
	</li>
	<li>p.mxHeaderContentP
		<ul>
		<li>span.mxHeaderSpan</li>
		<li>span.mxPBSpan</li>
		<li>span.mxPWSpan</li>
		<li>span.mxDTSpan</li>
		<li>span.mxPCSpan</li>
		<li>span.mxRUSpan</li>
		<li>span.mxTMSpan</li>
		<li>span.mxKMSpan</li>
		<li>span.mxHASpan</li>
		<li>span.mxNMSpan</li>
		<li>span.mxRESpan</li>
		</ul>
	<li>p.mxGeneralCommentP</li>
	</ul>
</li>
<li>div.mxHeaderDiv (<span class="parameter">headerBtnOn</span>=1)
	<ul>
	<li>button.mxBtn.mxHeaderBtn</li>
	</ul>
</li>
</ul>

<ul>
<li>div.mxHelpDiv (<span class="parameter">helpBtnOn</span>=1)
	<ul>
	<li>button.mxBtn.mxHelpBtn</li>
	</ul>
</li>
</ul>

<ul>
<li>div.mxLessonDiv+(.mxBM, .mxDO, .mxIT, .mxTE or nothing)
	<ul>
	<li>div</li>
	<li>img</li>
	</ul>
</li>
</ul>

<ul>
<li>div.mxMenuDiv
	<ul>
	<li>div.mxOneMenuDiv
		<ul>
		<li>button</li>
		</ul>
	</li>
	<li>div.mxSubMenuDiv
		<ul>
		<li>button</li>
		</ul>
	</li>
	</ul>
</li>
</ul>

<ul>
<li>div.mxMoveInfoDiv
	<ul>
	<li>svg</li>
	</ul>
</li>
</ul>

<ul>
<li>div.mxNavigationDiv
	<ul>
	<li>button.mxBtn.mxFirstBtn
		<ul>
		<li>svg</li>
		</ul>
	</li>
	<li>button.mxBtn.mxTenPredBtn
		<ul>
		<li>svg</li>
		</ul>
	</li>
	<li>button.mxBtn.mxPredBtn
		<ul>
		<li>svg</li>
		</ul>
	</li>
	<li>button.mxBtn.mxNextBtn
		<ul>
		<li>svg</li>
		</ul>
	</li>
	<li>button.mxBtn.mxTenNextBtn
		<ul>
		<li>svg</li>
		</ul>
	</li>
	<li>button.mxBtn.mxLastBtn
		<ul>
		<li>svg</li>
		</ul>
	</li>
	<li>input[type=text] (<span class="component">Goto</span> component)</li>
	<li>button.mxBtn.mxAutoBtn (<span class="component">Loop</span> component)
		<ul>
		<li>svg</li>
		</ul>
	</li>
	<li>button.mxBtn.mxPauseBtn (<span class="component">Loop</span> component)
		<ul>
		<li>svg</li>
		</ul>
	</li>
	</ul>
</li>
</ul>

<ul>
<li>div.mxNotSeenDiv
	<ul>
	<li>div.mxInnerNotSeenDiv
		<ul>
		<li>svg</li>
		</ul>
	</ul>
</li>
</ul>

<ul>
<li>div.mxOptionsDiv (<span class="parameter">optionsBtnOn</span>=0)
	<ul>
	<li>p
		<ul>
		<li>label
			<ul>
			<li>input</li>
			</ul>
		</li>
		</ul>
	</li>
	</ul>
</li>
<li>div.mxOptionsDiv (<span class="parameter">optionsBtnOn</span>=1)
	<ul>
	<li>button.mxBtn.mxOptionsBtn</li>
	</ul>
</li>
</ul>

<ul>
<li>div.mxPassDiv (<span class="parameter">passBtnOn</span>=1)
	<ul>
	<li>button.mxBtn.mxPassBtn
		<ul>
		<li>svg</li>
		</ul>
	<li>button.mxBtn.mxJustPlayedPassBtn
		<ul>
		<li>svg</li>
		</ul>
	</li>
	<li>button.mxBtn.mxOnVariationPassBtn
		<ul>
		<li>svg</li>
		</ul>
	</li>
	<li>button.mxBtn.mxOnFocusPassBtn
		<ul>
		<li>svg</li>
		</ul>
	</li>
	</ul>
</li>
</ul>

<ul>
<li>div.mxPngDiv (<span class="component">Image</span> component, <span class="parameter">pngBtnOn</span>=1)
	<ul>
	<li>button.mxBtn.mxPngBtn</li>
	</ul>
</li>
</ul>

<ul>
<li>div.mxScoreDiv (<span class="parameter">scoreBtnOn</span>=1)
	<ul>
	<li>button.mxBtn.mxScoreBtn</li>
	</ul>
</li>
</ul>

<ul>
<li>div.mxSgfDiv (<span class="parameter">sgfBtnOn</span>=1)
	<ul>
	<li>button.mxBtn.mxSgfBtn</li>
	</ul>
</li>
</ul>

<ul>
<li>div.mxSolveDiv
	<ul>
	<li>button.mxBtn.mxHint
		<ul>
		<li>svg</li>
		</ul>
	</li>
	<li>button.mxBtn.mxPassBtn
		<ul>
		<li>svg</li>
		</ul>
	</li>
	<li>button.mxBtn.mxRetry
		<ul>
		<li>svg</li>
		</ul>
	</li>
	<li>button.mxBtn.mxUndo
		<ul>
		<li>svg</li>
		</ul>
	</li>
	</ul>
</li>
</ul>

<ul>
<li>div.mxSpeedDiv
	<ul>
	<li>button.mxSpeedPlusBtn, the "+"</li>
	<li>div.mxSpeedBarDiv svg, bar and cursor</li>
	<li>button.mxSpeedMinusBtn, le "-"</li>
	</ul>
</li>
</ul>

<ul>
<li>div.mxSvgDiv (<span class="component">Image</span> component, <span class="parameter">svgBtnOn</span>=1)
	<ul>
	<li>button.mxBtn.mxPngBtn</li>
	</ul>
</li>
</ul>

<ul>
<li>div.mxTreeDiv
	<ul>
	<li>div.mxTreeCaptionDiv (<span class="parameter">treeCaptionOn</span>=1)</li>
	<li>div.mxTreeContentDiv
		<ul>
		<li>svg
			<ul>
			<li>Balises internes au svg</li>
			</ul>
		</li>
		</ul>
	</li>
	</ul>
</li>
</ul>

<ul>
<li>div.mxVersionDiv (<span class="parameter">versionBoxOn</span>=1)</li>
</ul>

<p>Warning: some components such as "animatedStone", "loop", ... have no box, 
and some other component boxes are displayed in dialogs (see below).</p>

<h4>Dialogs</h4>
<p>Below, Xxx can be
Alert,
EditColors, EditInfo, EditNumbering, EditOptions, EditSgf,
New, Open, Save, Send,
ShowAbout, ShowHeader, ShowHelp and ShowSgf.
<ul>
<li>dialog.mxXxxDialog
	<ul>
	<li>form
		<ul>
		<li>fieldset.mxContentFieldset
			<ul>
			<li>p</li>
			<li>span</li>
			<li>label</li>
			<li>input</li>
			</ul>
		</li>
		<li>fieldset.mxMenuFieldset
			<ul>
			<li>button</li>
			</ul>
		</li>
		</ul>
	</li>
	</ul>
</li>
</ul>

<ul>
<li>dialog.mxEditInfoDialog form fieldset.mxContentFieldset
	<ul>
	<li>label
		<ul>
		<li>span</li>
		<li>input</li>
		<li>textarea</li>
		</ul>
	</li>
	<li>div.mxResultDiv
		<ul>
		<li>label
			<ul>
			<li>span</li>
			</ul>
		</li>
		<li>select</li>
		<li>input</li>
		</ul>
	</li>
	</ul>
</li>
</ul>

<ul>
<li>dialog.mxEditNumberingDialog form fieldset.mxContentFieldset
	<ul>
	<li>p.mxFigureOrNotP</li>
	<li>p.mxTabNumberingP</li>
	</ul>
</li>
</ul>

<ul>
<li>dialog.mxEditOptionsDialog form fieldset.mxContentFieldset
	<ul>
	<li>p
		<ul>
		<li>span.mxNumFromTextSpan</li>
		<li>input.mxNumFromTextInput</li>
		<li>span.mxNumWithTextSpan</li>
		<li>input.mxNumWithTextInput</li>
		<li>input.mxLoopTimeTextInput</li>
		<li>input.mxAnimatedStoneTimeTextInput</li>
		</ul>
	</ul>
</li>
</ul>

<ul>
<li>dialog.mxEditSgfDialog form fieldset.mxContentFieldset
	<ul>
	<li>textarea</li>
	</ul>
</li>
</ul>

<ul>
<li>dialog.mxShowHeaderDialog form fieldset.mxContentFieldset
	<ul>
	<li>h1.mxTitleH1
		<ul>
		<li>span.mxEVTitleSpan</li>
		<li>span.mxROTitleSpan</li>
		</ul>
	</li>
	<li>p
		<ul>
		<li>span.mxHeaderSpan</li>
		<li>span.mxPBSpan</li>
		<li>span.mxPWSpan</li>
		<li>span.mxDTSpan</li>
		<li>span.mxPCSpan</li>
		<li>span.mxRUSpan</li>
		<li>span.mxTMSpan</li>
		<li>span.mxKMSpan</li>
		<li>span.mxHASpan</li>
		<li>span.mxNMSpan</li>
		<li>span.mxRESpan</li>
		</ul>
	</li>
	<li>p.mxGeneralCommentP</li>
	</ul>
</li>
</ul>

<ul>
<li>dialog.mxShowHelpDialog form fieldset.mxContentFieldset
	<ul>
	<li>h1,h2,h3</li>
	</ul>
</li>
</ul>

<ul>
<li>dialog.mxShowPngDialog form fieldset.mxContentFieldset
	<ul>
	<li>img</li>
	</ul>
</li>
</ul>

<ul>
<li>dialog.mxShowSvgDialog form fieldset.mxContentFieldset
	<ul>
	<li>img</li>
	</ul>
</li>
</ul>

</section>

<h2>Custom viewer</h2>
<p>It is possible to make your own viewer, using a "maker".</p>

<h3>What is a "maker"?</h3>
<p>A maker is a php script that generates a javascript script.</p>
<p>It contains:</p>
<ul>
<li>A line that specifies that the output is a javascript script</li>
<li>A part where one includes some maxiGos components</li>
<li>A part where one inserts some javascript instructions to create a viewer object</li>
<li>A line that inserts the style sheet in the code of the viewer</li>
<li>A part where one sets some parameters</li>
<li>A line to start the viewer</li>
</ul>

<h3>The line that specifies that the output is a javascript script</h3>
<p>This is a php line that uses the header() function:</p>
<pre><code>header("content-type:application/x-javascript;charset=UTF-8");</code></pre>

<h3>The part where one includes some maxiGos components</h3>
<p>One has to include at least the following scripts:
"mgos_lib.js" (utilities), "mgos_rls.js" (go rules management), "mgos_prs.js" (sgf parser),
"mgos_scr.js" (svg builder), "mgos.js" (main code) and "mgosGoban.js" (goban code).</p>
<p>For instance, to include the goban, the php code is:</p>
<pre><code>include "../../../_js/mgosGoban.js";</code></pre>
<em>You can also create your own component.</em>
<em>For instance, to create a component
called "Cute" that just displays "Baduk Go Weiqi",
make a javascript script that contains
a code such as:</em>
<pre><code>if(!mxG.G.prototype.createCute)
{
	mxG.G.prototype.createCute=function()
	{
		return "&lt;div&gt;Baduk Go Weiqi&lt;/div&gt;";
	};
}</code></pre>
<em>Save the code in a file called "Cute.js", then
include it in the maker. For instance,
if the maker is in a folder called "_maker",
and "Cute.js" in a folder called "_js",
and both "_maker" and "_js" folders are in the same folder,
add the following code in the maker:</em>
<pre><code>include "../_js/Cute.js";</code></pre>

<h3>The part where one inserts some javascript instructions to create a viewer object</h3>
<p>In this part, one adds the javascript instructions to create
the viewer object. First, one has to incremente
the viewer counter mxG.K by one.
Then one has to specify what are the boxes we want to display,
in which order, and evenly if they have to be grouped together.
Then one creates the object. Then one sets its theme and its configuration.</p>
<p>For instance, to create a viewer of the "Ephemeral" theme +
"Simple" configuration, that has the cute component one just created,
a goban, a navigation bar and allows variations, the code is:</p> 
<pre><code>mxG.K++;
mxG.B=[Cute,["Goban"],"Navigation","Variation"];
mxG.D[mxG.K]=new mxG.G(mxG.K,mxG.B);
mxG.D[mxG.K].theme="Ephemeral";
mxG.D[mxG.K].config="Simple";
</code></pre>

<h3>The line that inserts the style sheet in the code of the viewer</h3>
<p>This line is:</p>
<pre><code>include "../../_php/insertCss.php";</code></pre>
<p>The "insertCss.php" script expects that there is an existing
css style sheet named "_common.css" in a folder called "_css" which is
in the same folder where the parent directory of the maker is.</p>
<p>For instance, if the maker is in a folder called "_maker"
and "_common.css" is in a folder called "_css",
both "_maker" and "_css" folders have to be in the same folder.</p>

<h3>The part where one sets some parameters</h3>
<p>In this part, on sets the parameters of the components.</p>
<p>For instance, to set <span class="parameter">in3dOn</span> parameter to 1,
on adds in this part:</p>
<pre><code>mxG.D[mxG.K].a.in3dOn=1;</code></pre>

<h3>The line to start the viewer</h3>
<p>Just add the following line:</p>
<pre><code>mxG.D[mxG.K].start();</code></pre>

<h3>Full sample</h3>
<p>One creates a folder called "ephemeral" in the "_sample" folder of maxiGos.</p>
<p>The "maker" php code (stored in "ephemeral/_maker/ephemeral.php") is:</p>
<pre><code>&lt;?php
header("content-type:application/x-javascript;charset=UTF-8");
include "../../../_js/mgos_lib.js";
include "../../../_js/mgos_prs.js";
include "../../../_js/mgos_rls.js";
include "../../../_js/mgos_scr.js";
include "../../../_js/mgos.js";
include "../../../_js/mgosGoban.js";
include "../../../_js/mgosNavigation.js";
include "../../../_js/mgosVariation.js";
include "../_js/cute.js";
?&gt;
mxG.K++;
mxG.B=["Cute",["Goban"],"Navigation","Variation"];
mxG.D[mxG.K]=new mxG.G(mxG.K,mxG.B);
mxG.D[mxG.K].theme="Ephemeral";
mxG.D[mxG.K].config="Simple";
&lt;?php
include "../../_php/insertCss.php";
?&gt;
mxG.D[mxG.K].a.eraseGridUnder=1;
mxG.D[mxG.K].a.in3dOn=1;
mxG.D[mxG.K].a.hideSingleVariationMarkOn=1;
mxG.D[mxG.K].a.canPlaceVariation=1;
mxG.D[mxG.K].a.initMethod="42";
mxG.D[mxG.K].start();</code></pre>
<p>The css style sheet code (stored in "ephemeral/_css/_common.css") is:</p>
<pre><code>.mxEphemeralTheme.mxSimpleConfig
{
	max-width:30em;
}
.mxEphemeralTheme.mxSimpleConfig svg
{
	display:block;
}
.mxEphemeralTheme.mxSimpleConfig .mxGobanDiv svg
{
	background:#9cf;
}
.mxEphemeralTheme.mxSimpleConfig .mxNavigationDiv
{
	display:flex;
	justify-content:space-between;
	margin-top:0.5em;
}
.mxEphemeralTheme.mxSimpleConfig .mxNavigationDiv button
{
	border:0;
	background:none;
	padding:0;
	margin:0 5%;
}
.mxEphemeralTheme.mxSimpleConfig .mxNavigationDiv button svg
{
	width:100%;
	height:auto;
}
.mxEphemeralTheme.mxSimpleConfig .mxNavigationDiv button[disabled] svg
{
	fill:#0007;
}
.mxEphemeralTheme.mxSimpleConfig .mxNavigationDiv button:focus:not([disabled]) svg,
.mxEphemeralTheme.mxSimpleConfig .mxNavigationDiv button:hover:not([disabled]) svg
{
	fill:red;
}
.mxEphemeralTheme.mxSimpleConfig>div:first-of-type
{
	color:red;
	padding-bottom:0.5em;
}</code></pre>
<p>The javascript code for the additional "Cute" component (stored in "ephemeral/_js/cute.js") is:</p>
<pre><code>if(!mxG.G.prototype.createCute)
{
	mxG.G.prototype.createCute=function()
	{
		return "&lt;div&gt;Baduk Go Weiqi&lt;/div&gt;";
	};
}</code></pre>
<p>To test, just display the following html page in a browser
(stored in "ephemeral/index.html"):</p>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta charset="utf-8"&gt;
&lt;meta name="viewport" content="width=device-width,initial-scale=1.0"&gt;
&lt;title&gt;Ephemeral&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;h1&gt;Ephemeral&lt;/h1&gt;
&lt;script
	src="_maker/ephemeral.php"
	data-maxigos.sgf="(;
		GM[1]
		FF[4]
		CA[UTF-8]
		SZ[19]
		EV[吐血の一局]
		DT[1835-07-27]
		PW[本因坊丈和]
		PB[赤星因徹]
		PC[日本]
		RU[Japanese]
		KM[0]
		RE[W+R]
		;B[cp];W[pq];B[qd];W[ed];B[oc];W[eq];B[qo];W[qk]
		;B[qi];W[op];B[iq];W[dn];B[ep];W[dp];B[do];W[dq]
		;B[co];W[eo];B[fp];W[cq];B[bq];W[br];B[cm];W[gr]
		;B[hp];W[en];B[bp];W[ck];B[dl];W[dk];B[el];W[gn]
		;B[cr];W[dr];B[bs];W[fq];B[go];W[ar];B[hn];W[gm]
		;B[hm];W[gl];B[ek];W[hl];B[di];W[io];B[ho];W[fo]
		;B[ch];W[cd];B[lq];W[pn];B[gc];W[qn];B[dc];W[cc]
		;B[ec];W[cf];B[il];W[gp];B[nq];W[ic];B[fd];W[lc]
		;B[bg];W[bf];B[af];W[bi];B[dj];W[eh];B[fj];W[qg]
		;B[oi];W[qe];B[pd];W[nf];B[ok];W[pk];B[ol];W[pj]
		;B[rn];W[rm];B[qq];W[qr];B[rr];W[qp];B[rq];W[pr]
		;B[rp];W[po];B[pp];W[mp];B[qm];W[pm];B[np];W[mq]
		;B[mo];W[lp];B[lo];W[kp];B[no];W[nr];B[or];W[qp]
		;B[mr];W[ro];B[pi];W[lr];B[ns];W[ip];B[jr];W[hq]
		;B[jn];W[ko];B[kq];W[kn];B[jm];W[km];B[ik];W[mk]
		;B[mm];W[ir];B[jq];W[kk];B[mi];W[nm];B[ml];W[ki]
		;B[lj];W[lk];B[kj];W[jj];B[kl];W[ll];B[lm];W[oj]
		;B[mg];W[jl];B[jk];W[nj];B[ni];W[im];B[in];W[jo]
		;B[kl];W[js];B[ks];W[jl];B[im];W[is];B[kl];W[ei]
		;B[ej];W[jl];B[hr];W[hs];B[kl];W[cn];B[bn];W[jl]
		;B[gs];W[fs];B[kl];W[hi];B[ij];W[jl];B[ls];W[ji]
		;B[hj];W[oe];B[kg];W[jg];B[gi];W[nc];B[jf];W[nb]
		;B[re];W[if];B[je];W[hd];B[fe];W[gf];B[ff];W[fg]
		;B[gg];W[gh];B[hg];W[fi];B[gj];W[ig];B[hh];W[hf]
		;B[ii];W[rf];B[pe];W[pf];B[le];W[kd];B[ad];W[kh]
		;B[qf];W[ef];B[de];W[qe];B[ld];W[lg];B[kc];W[jd]
		;B[qf];W[db];B[eb];W[qe];B[jb];W[od];B[ib];W[mf]
		;B[qf];W[jp];B[kr];W[qe];B[lf];W[kf];B[qf];W[hc]
		;B[qe];W[hb];B[pg];W[og];B[of];W[cg];B[bh];W[pf]
		;B[ph];W[bb];B[da];W[cb];B[fh];W[ac];B[eg];W[bd]
		;B[ob];W[oa];B[of];W[mh];B[rj];W[kl])"&gt;
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
<p>Et voilà!</p>

<h2>Annexes</h2>
<h3>Folders and files</h3>
<ul>
<li>"_doc": contains documentations, download pages, licence file…</li>
<li>"_i18n": contains internationalization script files,</li>
<li>"_img": contains images.</li>
<li>"_js": contains component javascript files.</li>
<li>"_php": contains various php scripts.</li>
<li>"_sample": contains maxiGos samples,
including stand-alone viewers, style sheets, and viewer makers.</li>
</ul>
<h3 id="faq">Questions and answers</h3>
<p class="important">Question: what is the minimum I have to do to include a maxiGos viewer
in one of my web page using a stand-alone script?</p>
<ol>
<li>Go to the <a href="http://jeudego.org/maxiGos/_maxigos/_doc/_en/download.php">dowload page</a>.</li>
<li>Download "maxigos-neo-classic-basic.js" stand-alone viewer.</li>
<li>Create at the root of your website a "maxiGos" folder and copy "maxigos-neo-classic-basic.js to it.</li>
<li>Insert in the page to the place where you want the viewer displays &lt;script&gt; and &lt;/script&gt;
tags with src value set to "/maxiGos/maxigos-neo-classic-basic.js",
and insert between these tags a sgf record. For instance:<br>
<pre><code>&lt;script
	src="/maxiGos/maxigos-basic.js"
	data-maxigos-sgf="(;FF[4]CA[UTF-8]GM[1]SZ[19];B[pd];W[dc];B[pp];W[fp];B[de];W[ee];B[ef];W[ed];B[dg];W[co])"&gt;
&lt;/script&gt;</code></pre></li>
<li>Et voilà!</li>
</ol>
<p class="important">Question: is maxiGos working with any browsers?</p>
<p>
In theory, maxiGos works with most browsers,
but not with internet explorer.
</p>
<p class="important">Question: maxiGos displays nothing. Why?</p>
<p>Verify if you well copied the "_maxigos" folder to the rigth place on the web server.</p>
<p>Verify paths in the lines where a call to maxiGos is done.</p>
<p class="important">Question: maxiGos displays an empty goban. Why?</p>
<p>Verify that the sgf file is on the rigth place on the web server.</p>
<p>Otherwise the path of the sgf file is probably wrong.</p>
<p>It's also possible that maxiGos has not the right to open the sgf file. 
In this case, put your sgf files in another place or change their access rights. 
(however the writting right is never required).
</p>
<p class="important">Question: how can I change the goban size?</p>
<p>The width of a maxiGos viewer is the width of its container,
so the easiest way is to change the width of the container!</p>
<p>However a maxiGos viewer has a maximal width set in its css,
through the "--gobanMaxWidth" css variable. Changing
the value of this variable is another way to consider.</p>
<p class="important">Question: how can I change the goban background?</p>
<p>There are various ways to achieve this.</p>
<p>Th common way is to change the background of the svg that draws
the goban, or one of its ancestor (if they have the same size) using css.
For instance, for the minimalist theme:</p>
<pre><code>div.mxMinimalistTheme .mxGobanDiv svg
{
	background-color:#9cf;
}</code></pre>
<p>Another way is to change the fill value of the .mxWholeRect svg rect.
For instance, for the minimalist theme:</p>
<pre><code>div.mxMinimalistTheme .mxWholeRect
{
	fill:#9cf;
}</code></pre>
<p class="important">Question: what about "responsive design"?</p>
<p>In theory, maxiGos does all the job.</p>
<p>But don't forget the magic <span class="tag">&lt;meta&gt;</span> tag:</p>
<pre><code>&lt;meta name="viewport" content="width=device-width,initial-scale=1.0"&gt;</code></pre>
<p class="important">Question: I use a maxiGos stand-alone script
which displays all its texts in french and it is the latest thing I want.
What can I do?</p>
<p>Read again the "Internationalization" chapter. Maybe you missed something.</p>
<p>If you need to use a language that has no internationalization file in "_i18n" folder, see next question.</p>
<p class="important">Question: I want to translate maxiGos in another language. How can I process?</p>
<p>Duplicate "_maxigos/_i18n/maxigos-i18n-ja.js" and replace the two last letters of the file name
by the code of the new language (if possible a ISO 639 language code).
Replace all "ja" strings by the code of the new language at the beginning of the file. 
Translate all japanese texts of this file in the new language 
(their equivalents in english are in front of them), 
and rewrite or create or evenly remove functions 
whose name starts by "build" or "translate" 
(these functions are "buildDate", "buildRank", "buildMove", "buildNumOfMoves", "buildRules",
"buildTimeLimits", "buildKomi", "buildResult" and "transalteTitle"). 
If one of these functions is missing, maxiGos uses default functions to produce an acceptable output
so you can drop the rewritting of these functions if it appears too complicated. 
Finally, save the file in UTF-8.</p>
<p class="important">Question: I want to use maxiGos in a page which is not in UTF-8.
What is the correct way to insert it?</p>
<p>If you use a stand-alone viewer, add charset="UTF-8" to any maxiGos script tag.</p>
<p>For instance:</p>
<pre><code>&lt;script
	charset="UTF-8"
	src="_alone/maxigos-minimal-basic.js"
	data-maxigos-sgf="../_sgf/game/blood-vomit.sgf"&gt;
&lt;/script&gt;</code></pre>
<em>Aknowledgements to Adachi K., Alfredo Pernin, Chantal Gajdos, Julien Payrat, Lao Lilin, Mickaël Simon, Motoki Noguchi, 
Olivier Besson, Olivier Dulac, Patrice Fontaine, Tony Yamanaka
and many others for their advices or contributions to this project!</em>
<p><?=(file_exists("../../../index.php")?"<a href=\"../../../index.php?lang=en\">Home</a>":"")?><!--
--><a href="<?=str_replace("/_fr/","/_en/",$_SERVER["SCRIPT_NAME"])?>"><img alt="English" class="flag" src="../../_img/flag/en.svg">English</a><!--
--><a href="<?=str_replace("/_en/","/_fr/",$_SERVER["SCRIPT_NAME"])?>"><img alt="Français" class="flag" src="../../_img/flag/fr.svg">Fran&ccedil;ais</a></p>
</body>
</html>