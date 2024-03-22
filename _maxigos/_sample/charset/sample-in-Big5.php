<?php header ('Content-Type:text/html;charset=Big5');?>
<!DOCTYPE html>
<?php
include "../_php/lib.php";
$lang=(isset($_GET["lang"])?safeValue($_GET["lang"]):"en");
?>
<html lang="<?=$lang?>">
<head>
<meta charset="Big5">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>MaxiGos - Big5</title>
<style>
body {background:#fff;margin:0;padding:0;}
h1 {text-align:center;}
h2
{
	font-size:1.25em;
	margin:0;
	padding:0.25em;
	background:#000;
	color:#fff;
	text-align:left;
}
.topLink a, .bottomaink b
{
	color:#000;
}
p {padding:0.25em;}
.mxGlobal
{
	margin:1em auto;
}
.topLink {display:block;text-align:center;margin-bottom:1em;}
.bottomLink {display:block;text-align:center;margin-top:1em;}
</style>
</head>
<body>
<a class="topLink" href="../?sample=Charset&lang=<?=$lang?>">Index</a>
<h1>Big5</h1>

<p>This page is encoded in Big5 but could be encoded in another charset
such as UTF-8 as well.<br>
The sgf file is encoded in Big5 but could be encoded in another charset
such as UTF-8 as well.<br>
The sgf file must be encoded in the charset specified in its CA property
(the most important).<br>
The maxiGos js scripts themselves are encoded in UTF-8
(no good reason to change this).</p>

<p style="color:red;">Because the page is not in UTF-8, 
the key point is to use charset="UTF-8" in the script tags 
that load the js scripts :</p>
<p>&lt;script charset="UTF-8" src="..."&gt;</p>

<p>Start by loading the localization script "maxigos-i18n-zh-hant.js"
(for traditionnal chinese).</p>

<!-- don't forget charset="UTF-8" -->
<script charset="UTF-8" src="../../_i18n/maxigos-i18n-zh-hant.js">
</script>

<h2>Maxigos "Comment"</h2>

<p>Use "comment.php" script.<br>
Read the sgf file "Mingren-001-1F-1-zh-hant-Big5.sgf"
(in this file, CA is Big5 and game information is in traditionnal chinese).</p>

<!-- don't forget charset="UTF-8" -->
<script lang="zh-hant"
		charset="UTF-8"
		src="../minimalist/_maker/comment.php"
		data-maxigos-sgf="../_sgf/game/Mingren-001-1F-1-zh-hant-Big5.sgf">
</script>

<p>
Setp 1: maxiGos reads the sgf file, looks at its CA property and sees that it is Big5.<br>
Step 2: maxiGos transforms the sgf file content from Big5 to UTF-8.<br>
Step 3: the browser detects that the page is in Big5 and the script tags have charset="UTF-8".<br>
Step 4: the browser transforms maxiGos output (strings that are displayed on the screen) from UTF-8 to Big5.<br>
Step 5: maxiGos displays its labels in traditionnal chinese (using maxigos-i18n-zh-hant.js script).</p>

<h2>Maxigos "Edit"</h2>

<p>Use "edit.php" script.<br>
Read the sgf file "Mingren-001-1F-1-zh-hant-Big5.sgf"
(in this file, CA is Big5 and game information is in traditionnal chinese).</p>

<!-- don't forget charset="UTF-8" -->
<script lang="zh-hant"
		charset="UTF-8"
		data-maxigos-to-charset="Big5"
		src="../minimalist/_maker/edit.php"
		data-maxigos-sgf="../_sgf/game/Mingren-001-1F-1-zh-hant-Big5.sgf">
</script>

<p>By default, maxiGos generates sgf in "UTF-8". But here, when the user clicks on the "Sgf" button 
or selects the "Save" menu, 
the charset in the CA property of the sgf is "Big5" because we set the value of the "toCharset"
parameter to "Big5" using data-maxigos-to-charset="Big5" as attribute of the script tag 
that loads the player.</p>

<p>Setp 1: maxiGos reads the sgf file, looks at its CA property and sees that it is Big5.<br>
Step 2: maxiGos transforms the sgf file content from Big5 to UTF-8.<br>
Step 3: the browser detects that the page is in Big5 and the script tags have charset="UTF-8".<br>
Step 4: the browser transforms maxiGos output (strings that are displayed on the screen) from UTF-8 to Big5.<br>
Step 5: maxiGos displays its labels in traditionnal chinese (using maxigos-i18n-zh-hant.js script).<br>
Step 6: if the user clicks on the "Sgf" button, maxiGos looks at the value of the "toCharset" 
parameter and sees that it is "Big5" and not "UTF-8".<br>
Step 7: maxiGos replaces the CA property of the sgf by "Big5" then displays the sgf.</p>

<a class="bottomLink" href="../?sample=Charset&lang=<?=$lang?>">Index</a>
</body>
</html>
