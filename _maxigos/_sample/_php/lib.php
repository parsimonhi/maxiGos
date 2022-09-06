<?php
function safeValue($a)
{
	return preg_replace("/[^A-Za-z0-9 _-]/","",$a);
}
function base64EncodeImage($f,$t)
{
	if (($t=="gif")||($t=="jpg")||($t=="png")||($t=="svg"))
	{
    	if (file_exists($f))
    	{
        	$img=fread(fopen($f,"r"),filesize($f));
        	return 'data:image/'.$t.';base64,'.base64_encode($img);
		}
	}
    return 'NOK';
}
function getSgfFromFileToContent($f)
{
	// get sgf record from file and convert it if not in UTF-8
	// in order to echo it in tag content
	// warning: use simple quote for regex to simplify backslash use 
	$s=file_get_contents($f);
	if(preg_match('/CA\s*\[([^]]+)\]/',$s,$m)) $charset=$m[1];
	else $charset="ISO-8859-1";
	$charset=strtoupper(preg_replace('/\\s/',"",$charset));
	if($charset!="UTF-8") $s=mb_convert_encoding($s,"UTF-8",$charset);
	// simpler to remove old CA property since sometimes it is not present
	$s=preg_replace('/CA\s*\[([^]]+)\]\s*/',"",$s);
	$s=preg_replace('/GM\s*\[\s*1\s*\]/',"GM[1]\nCA[UTF-8]",$s);
	return $s;
}
function getSgfFromFileToAttribute($f)
{
	// get sgf record from file and convert it if not in UTF-8
	// in order to echo it in tag attribute
	return htmlspecialchars(getSgfFromFileToContent($f));
}
function copyright($config="",$theme="")
{
	echo "// maxiGos v7";
	if ($config&&$theme) echo " ".$config."+".$theme;
	echo " copyright 1998-".date("Y")." FM&SH, BSD license\n\n";
}
function makeJs($config,$theme)
{
	$tmp='tmp.php';
	if($theme=="NeoClassic") $folder="neo-classic";
	else $folder=strtolower($theme);
	if (!file_exists("../../_sample/".$folder."/_maker/".strtolower($config).".php"))
	{
		echo "../../_sample/".$folder."/_maker/".strtolower($config).".php does not exist!<br>";
		return null;
	}
	$targetName="../../_sample/".$folder."/_alone/maxigos-".$folder."-".strtolower($config).".js";
	ob_start();
	$maxigosFileContent=file_get_contents("../../_sample/".$folder."/_maker/".strtolower($config).".php");
	// no need to call header() here since one just saves the content in a file
	// however a call to header() here may change the header() of the calling page
	// thus remove the call to header() here
	$maxigosFileContent=str_replace('header("content-type:application/x-javascript;charset=UTF-8");\n','',$maxigosFileContent);
	$maxigosFileContent=str_replace("include \"../../_php/insertCss.php\";","\$cssFolder=\"../../_sample/".$folder."/_css/\";\ninclude \"_sample/_php/insertCss.php\";",$maxigosFileContent);
	$maxigosFileContent=str_replace("include_once \"../../_php/lib.php","include_once \"_sample/_php/lib.php",$maxigosFileContent);
	$maxigosFileContent=str_replace("include \"../../../","include \"",$maxigosFileContent);
	$maxigosFileContent=str_replace("include \"../_js/","include \"_sample/$folder/_js/",$maxigosFileContent);
	file_put_contents($tmp,$maxigosFileContent);
	$maxigosPath=getcwd();
	$maxigosPath=preg_replace("#^(.*)/[^/]+$#","$1",$maxigosPath);
	$maxigosPath=preg_replace("#^(.*)/[^/]+$#","$1",$maxigosPath);
	set_include_path(get_include_path().PATH_SEPARATOR.$maxigosPath);
	include $tmp;
	$content=ob_get_contents();
	ob_end_clean();
	file_put_contents($targetName,$content);
	$joomlaTargetName="../../../maxigos-joomla/_maxigos/_alone/maxigos-".$folder."-".strtolower($config).".js";
	copy($targetName,$joomlaTargetName);
	$wpTargetName="../../../maxigos-wp/_maxigos/_alone/maxigos-".$folder."-".strtolower($config).".js";
	copy($targetName,$wpTargetName);
	unlink($tmp);
	return ($content?true:false);
}
function isConvenientServer($myServer="127.0.0.1")
{
	// return true if the server is $myServer or a local server
	return (($_SERVER['SERVER_NAME']==$myServer)
		||($_SERVER['SERVER_NAME']=="localhost")
		||preg_match("/^192.168.1/",$_SERVER['SERVER_NAME']));
}
?>
