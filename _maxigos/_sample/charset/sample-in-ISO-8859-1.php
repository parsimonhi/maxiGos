<?php
header ('Content-Type:text/html;charset=ISO-8859-1');
?>
<!DOCTYPE html>
<?php
include "../_php/lib.php";
$lang=(isset($_GET["lang"])?safeValue($_GET["lang"]):"en");
?>
<html lang="<?php echo $lang;?>">
<head>
<meta charset="ISO-8859-1">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<?php
switch($lang)
{
	case "fr":$title="Tests de charset, page en ISO-8859-1, comment.php";break;
	case "ja":$title="&#25991;&#23383;&#12486;&#12473;&#12488;&#12289;ISO-8859-1&#12506;&#12540;&#12472;&#12289;comment.php";break;
	case "zh-hans":$title="&#23383;&#31526;&#38598;&#27979;&#35797;, ISO-8859-1&#39029;, comment.php";break;
	case "zh-hant":$title="&#23383;&#31526;&#38598;&#28204;&#35430;, ISO-8859-1&#38913;, comment.php";break;
	default:$title="Charset tests, page in ISO-8859-1, comment.php";
}
?>
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
.mxGlobalBoxDiv
{
	margin:1em auto;
}
.topLink {text-align:center;margin-bottom:1em;}
.bottomLink {text-align:center;margin-top:1em;}
</style>
<title><?php print $title;?></title>
</head>
<body>
<div class="topLink"><a href="../?sample=Charset&lang=<?php echo $lang;?>">Index</a></div>
<h1><?php print $title;?></h1>
<p>This page is encoded in ISO-8859-1.<br>
<p style="color:red;">Remember: characters such as &#30707; or &#30000; 
that are not in the "ISO-8859-1" character set must be encoded,
using for instance Decimal NCRs.</p>

<h2>Sgf filename encode in UTF-8</h2>
<script src="../minimalist/_maker/comment.php">
_sgf/UTF-8.sgf
</script>
<h2>Sgf filename encode in Big5</h2>
<script charset="UTF-8"
		src="../minimalist/_maker/comment.php">
_sgf/Big5.sgf
</script>
<h2>Sgf filename encode in GB18030</h2>
<script charset="UTF-8"
		src="../minimalist/_maker/comment.php">
_sgf/GB18030.sgf
</script>
<h2>Sgf filename encode in Shift_JIS</h2>
<script charset="UTF-8"
		src="../minimalist/_maker/comment.php">
_sgf/Shift_JIS.sgf
</script>
<h2>Sgf filename encode in ISO-8859-1</h2>
<script charset="UTF-8"
		src="../minimalist/_maker/comment.php">
_sgf/ISO-8859-1.sgf
</script>
<h2>Sgf filename encode in ISO-8859-1 but no charset specified in sgf</h2>
<script charset="UTF-8"
		src="../minimalist/_maker/comment.php">
_sgf/NO-CHARSET.sgf
</script>
<h2>Sgf record</h2>
<script charset="UTF-8"
		src="../minimalist/_maker/comment.php">
(;
FF[4]
CA[ISO-8859-1]
GM[1]
SZ[19]
C[héhé &#30707;&#30000;
CA property value in sgf record is ignored by maxiGos \
in this case, since the sgf record is in the code of the page.])
</script>
<div class="bottomLink"><a href="../?sample=Charset&lang=<?php echo $lang;?>">Index</a></div>
</body>
</html>