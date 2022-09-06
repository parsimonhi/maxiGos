<?php
/*
$regex=array(
"`^([\t\s]+)`ism"=>'',
"`^\/\*(.+?)\*\/`ism"=>"",
"`([\n\A;]+)\/\*(.+?)\*\/`ism"=>"$1",
"`([\n\A;\s]+)//(.+?)[\n\r]`ism"=>"$1\n",
"`(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+`ism"=>"\n"
);
*/
$regex=array(
"`^([\t\s]+)`ism"=>'',
"`^\/\*(.+?)\*\/`ism"=>"",
"`([\n\A;]+)\/\*(.+?)\*\/`ism"=>"$1"
);
// get css file
if(isset($cssFolder)) $s=addslashes(file_get_contents($cssFolder."_common.css")); 
else $s=addslashes(file_get_contents("../_css/_common.css"));
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
echo "mxG.D[mxG.K].style=\"".$s."\";\n";
?>
