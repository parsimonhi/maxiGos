<?php
header ('Content-Type:text/html;charset=utf-8');
?>
<!DOCTYPE html>
<?php
$_maxigosPath="../../../";
function ANHU($s,$len,$default)
{
	if(!preg_match("/^[A-Za-z0-9_-]+$/",$s)) $s=$default;
	if(strlen($s)>$len) $s=$default;
	return $s;
}
if(isset($_POST["lang"])) $lang=$_POST["lang"];
else if(isset($_GET["lang"])) $lang=$_GET["lang"];
else $lang="en";
$lang=ANHU($lang,16,"en");

if(isset($_POST["config"])) $config=$_POST["config"];
else if(isset($_GET["config"])) $config=$_GET["config"];
else $config="basic";
$config=ANHU($config,64,"basic");

if(isset($_POST["theme"])) $theme=$_POST["theme"];
else if(isset($_GET["theme"])) $theme=$_GET["theme"];
else $theme="minimalist";
$theme=ANHU($theme,64,"minimalist");

$i18nFile=$_maxigosPath."_maxigos/_i18n/maxigos-i18n-".$lang.".js";
if(!file_exists($i18nFile)) $lang="en";
$sgfViewer=$_maxigosPath."_maxigos/_sample/".$theme."/_alone/maxigos-".$theme."-".$config.".js";
if(!file_exists($sgfViewer)) $theme="minimalist";

if(isset($_POST["sgf"])) $sgf=urldecode($_POST["sgf"]);
else if(isset($_GET["sgf"]))
{
	$sgf=urldecode($_GET["sgf"]);
	if(preg_match("/[?()&]/",$sgf)) $sgf="";
	if(!preg_match("/\.sgf$/",$sgf)) $sgf="";
	if(strlen($sgf)>256) $sgf=""; // 64 not enough here
}
else $sgf="";
$sgf=str_replace("<","&lt;",str_replace(">","&gt;",str_replace("\"","&quot;",$sgf)));
?>
<html lang="<?=$lang?>">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<style>
body
{
	margin:0;
	/* add 1px padding to avoid problem with viewer margin if any */
	/* add 1em to keep room for scrollbars */
	padding:1px 1em;
}
.mxMinimalistTheme
{
	margin:1em auto;
}
</style>
</head>
<body>
<script src="<?=$_maxigosPath?>_maxigos/_i18n/maxigos-i18n-<?=$lang?>.js"></script>
<script src="<?=$_maxigosPath?>_maxigos/_sample/<?=$theme?>/_alone/maxigos-<?=$theme.'-'.$config?>.js"
		data-maxigos-sgf="<?=$sgf?>">
</script>
<script src="<?=$_maxigosPath?>_maxigos/_sample/_js/mgosIframe.js"></script>
</body>
</html>
