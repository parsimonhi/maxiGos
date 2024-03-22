<?php
function startsWith ($string, $startString) 
{ 
    $len = strlen($startString); 
    return (substr($string, 0, $len) === $startString); 
}
function hyplen2Upper($string)
{
	$a=explode("-",$string);
	$len=count($a);
	$s="";
	for($k=0;$k<$len;$k++) $s.=ucfirst($a[$k]);
	return $s;
}
function printOneInternationalizationScriptLine($langCode)
{
	global $lang;
	$s="maxigos-i18n-$langCode.js";
	$d="../../_i18n";
	$j="$d/$s";
	if($lang=="fr")
	{
		if($langCode=="ja") $l="japonais";
		else if($langCode=="zh-hans") $l="chinois simplifié";
		else if($langCode=="zh-hant") $l="chinois traditionnel";
		else return;
	}
	else
	{
		if($langCode=="ja") $l="japanese";
		else if($langCode=="zh-hans") $l="simplified chinese";
		else if($langCode=="zh-hant") $l="traditional chinese";
		else return;
	}
	echo "<li>";
	if($lang=="fr")
		echo "<a href='$j' download='$s'>Téléchargement de $s</a> ($l)";
	else 
		echo "<a href='$j' download='$s'>Download $s</a> ($l)";
	echo "</li>\n";
}
function printOneDownloadLine($theme,$config)
{
	global $lang;
	$s="maxigos-$theme-$config.js";
	$d="../_sample/$theme/_alone";
	$j="../$d/$s";
	echo "<tr>";
	echo "<th>$s</th>";
	if($lang=="fr")
	{
		echo "<td><a href='$j' download='$s'>Télécharger</a></td>\n";
		echo "<td><a href='../../_sample/_php/aloneViewer.php?lang=$lang&amp;theme=$theme&amp;config=$config'>Exemple</a></td>\n";
	}
	else
	{
		echo "<td><a href='$j' download='$s'>Download</a></td>\n";
		echo "<td><a href='../../_sample/_php/aloneViewer.php?lang=$lang&&amp;theme=$theme&amp;config=$config'>Example</a></td>\n";
	}
	echo "</tr>";
}
function printOneThemeDownloadLines($theme)
{
	$d="../../_sample/$theme/_alone/";
	$files=scandir($d);
	echo "<h4>".hyplen2Upper($theme)."</h4>\n";
	echo "<table class=\"themeTable\">\n";
	for($k=0;$k<count($files);$k++)
	{
		if (!startsWith($files[$k],'.'))
		{
			$config=str_replace("maxigos-$theme-","",$files[$k]);
			$config=str_replace(".js","",$config);
			printOneDownloadLine($theme,$config);
		}
	}
	echo "</table>\n";
}
?>
