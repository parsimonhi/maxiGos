<!DOCTYPE html>
<?php
include "../_php/lib.php";
$lang=(isset($_GET["lang"])?safeValue($_GET["lang"]):"en");
?>
<html lang="<?php echo $lang;?>">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<?php
switch($lang)
{
	case "fr":$title="Tests de charset, page en UTF-8, comment.php";break;
	case "ja":$title="文字テスト、UTF-8ページ、comment.php";break;
	case "zh-hans":$title="字符集测试, UTF-8页, comment.php";break;
	case "zh-hant":$title="字符集測試, UTF-8頁, comment.php";break;
	default:$title="Charset tests, page in UTF-8, comment.php";
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
<p>This page is encoded UTF-8.<br>
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
CA[UTF-8]
GM[1]
SZ[19]
C[héhé 石田
CA property value in sgf record is ignored by maxiGos \
in this case, since the sgf record is in the code of the page.])
</script>

<div class="bottomLink"><a href="../?sample=Charset&lang=<?php echo $lang;?>">Index</a></div>
</body>
</html>