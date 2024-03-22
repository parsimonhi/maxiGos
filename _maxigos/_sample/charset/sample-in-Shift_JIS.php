<?php header ('Content-Type:text/html;charset=Shift_JIS');?>
<!DOCTYPE html>
<?php
include "../_php/lib.php";
$lang=(isset($_GET["lang"])?safeValue($_GET["lang"]):"en");
?>
<html lang="<?=$lang?>">
<head>
<meta charset="Shift_JIS">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>MaxiGos - Shift_JIS</title>
<style>
body {background:#fff;}
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
<h1>Shift_JIS</h1>

<p>This page is encoded in Shift_JIS but could be encoded in another charset such as UTF-8 as well.<br>
The sgf file is encoded in Shift_JIS but could be encoded in another charset such as UTF-8 as well.<br>
The sgf file must be encoded in the charset specified in its CA property (the most important).<br>
The maxiGos js scripts themselves are encoded in UTF-8 (no good reason to change this).</p>

<p style="color:red;">Because the page is not in UTF-8, 
the key point is to use charset="UTF-8" in the script tags 
that load the js scripts (&lt;script charset="UTF-8" src="..."&gt;).</p>

<p>Start by loading the localization script "maxigos-i18n-ja.js" (for japanese).</p>

<!-- don't forget charset="UTF-8" -->
<script charset="UTF-8" src="../../_i18n/maxigos-i18n-ja.js">
</script>

<h2>Maxigos "Comment"</h2>

<p>Use "comment.php" script.<br>
Read the sgf file "Mingren-001-1F-1-ja-Shift_JIS.sgf" (in this file, CA is Shift_JIS and game information is in japanese).</p>

<!-- don't forget charset="UTF-8" -->
<script lang="ja" charset="UTF-8"
		src="../minimalist/_maker/comment.php"
		data-maxigos-sgf="../_sgf/game/Mingren-001-1F-1-ja-Shift_JIS.sgf">
</script>

<p>Setp 1: maxiGos reads the sgf file, looks at its CA property and sees that it is Shift_JIS.<br>
Step 2: maxiGos transforms the sgf file content from Shift_JIS to UTF-8.<br>
Step 3: the browser detects that the page is in Shift_JIS and the script tags have charset="UTF-8".<br>
Step 4: the browser transforms maxiGos output (strings that are displayed on the screen) from UTF-8 to Shift_JIS.<br>
Step 5: maxiGos displays its labels in japanese (using maxigos-i18n-ja.js script).</p>

<h2>Maxigos "Edit"</h2>

<p>Use "edit.php" script.<br>
Read the sgf file "Mingren-001-1F-1-ja-Shift_JIS.sgf" (in this file, CA is Shift_JIS and game information is in japanese).</p>

<!-- don't forget charset="UTF-8" -->
<script lang="ja" charset="UTF-8"
		data-maxigos-to-charset="Shift_JIS"
		src="../minimalist/_maker/edit.php"
		data-maxigos-sgf="../_sgf/game/Mingren-001-1F-1-ja-Shift_JIS.sgf">
</script>

<p>By default, maxiGos generates sgf in "UTF-8". But here, when the user clicks on the "Sgf" button 
or selects the "Save" menu, 
the charset in the CA property of the sgf is "Shift_JIS" because we set the value of the "toCharset"
parameter to "Shift_JIS" using data-maxigos-to-charset="Shift_JIS" as attribute of the script tag 
that loads the player.</p>

<p>Setp 1: maxiGos reads the sgf file, looks at its CA property and sees that it is Shift_JIS.<br>
Step 2: maxiGos transforms the sgf file content from Shift_JIS to UTF-8.<br>
Step 3: the browser detects that the page is in Shift_JIS and the script tags have charset="UTF-8".<br>
Step 4: the browser transforms maxiGos output (strings that are displayed on the screen) from UTF-8 to Shift_JIS.<br>
Step 5: maxiGos displays its labels in japanese (using maxigos-i18n-ja.js script).<br>
Step 6: if the user clicks on the "Sgf" button, maxiGos looks at the value of the "toCharset" 
parameter and sees that it is "Shift_JIS" and not "UTF-8".<br>
Step 7: maxiGos replaces the CA property of the sgf by "Shift_JIS" then displays the sgf.</p>

<a class="bottomLink" href="../?sample=Charset&lang=<?=$lang?>">Index</a>
</body>
</html>
