<?php
function cleanCss($s)
{
	// remove comments
	// $s=preg_replace(array_keys($regex),$regex,$s);
	$s=preg_replace("/\/\*(.+?)\*\//ism","",$s);
	// clean spaces
	$s=trim(preg_replace('/\s+/',' ',$s));
	$s=preg_replace('/; /',';',$s);
	$s=preg_replace('/ ?{ ?/','{',$s);
	$s=preg_replace('/ ?} ?/','}',$s);
	$s=preg_replace('/, /',',',$s);
	// modify url paths
	$s=str_replace("url(../../../","url(../",$s);
	return $s;
}
function getCssPart($s,$c)
{
	if($c=="common")
	{
		$z="edit";
		$s=preg_replace("#/\* \|".$z." config\| \*/([^£]*)/\* \|".$z." config\| \*/#i","",$s);
		$z="lesson";
		$s=preg_replace("#/\* \|".$z." config\| \*/([^£]*)/\* \|".$z." config\| \*/#i","",$s);
		$z="problem";
		$s=preg_replace("#/\* \|".$z." config\| \*/([^£]*)/\* \|".$z." config\| \*/#i","",$s);
	}
	else if(($c=="edit")||($c=="lesson")||($c=="problem"))
	{
		$p="#^[^£]*/\* \|".$c." config\| \*/([^£]*)/\* \|".$c." config\| \*/[^£]*$#i";
		if(preg_match($p,$s)) $s=preg_replace($p,"$1",$s);
		else $s="";
	}
	return $s;
}