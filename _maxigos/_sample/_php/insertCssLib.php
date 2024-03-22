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
		$z="comment";
		$s=preg_replace("#/\* \|".$z." config\| \*/([^£]*)/\* \|".$z." config\| \*/#i","",$s);
		$z="diagram";
		$s=preg_replace("#/\* \|".$z." config\| \*/([^£]*)/\* \|".$z." config\| \*/#i","",$s);
		$z="edit";
		$s=preg_replace("#/\* \|".$z." config\| \*/([^£]*)/\* \|".$z." config\| \*/#i","",$s);
		$z="game";
		$s=preg_replace("#/\* \|".$z." config\| \*/([^£]*)/\* \|".$z." config\| \*/#i","",$s);
		$z="lesson";
		$s=preg_replace("#/\* \|".$z." config\| \*/([^£]*)/\* \|".$z." config\| \*/#i","",$s);
		$z="problem";
		$s=preg_replace("#/\* \|".$z." config\| \*/([^£]*)/\* \|".$z." config\| \*/#i","",$s);
		$z="replay";
		$s=preg_replace("#/\* \|".$z." config\| \*/([^£]*)/\* \|".$z." config\| \*/#i","",$s);
		$z="score";
		$s=preg_replace("#/\* \|".$z." config\| \*/([^£]*)/\* \|".$z." config\| \*/#i","",$s);
		$z="tree";
		$s=preg_replace("#/\* \|".$z." config\| \*/([^£]*)/\* \|".$z." config\| \*/#i","",$s);
	}
	else if(($c=="comment")||($c=="diagram")||($c=="edit")||($c=="game")||($c=="lesson")
		||($c=="problem")||($c=="replay")||($c=="score")||($c=="tree"))
	{
		$p="#^[^£]*/\* \|".$c." config\| \*/([^£]*)/\* \|".$c." config\| \*/[^£]*$#i";
		if(preg_match($p,$s)) $s=preg_replace($p,"$1",$s);
		else $s="";
	}
	return $s;
}