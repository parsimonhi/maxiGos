<?php
include_once "insertCssLib.php";
// get _common css file
$cssFile="_common.css";
if(isset($cssFolder)) $s=addslashes(file_get_contents($cssFolder.$cssFile)); 
else $s=addslashes(file_get_contents("../_css/".$cssFile));
$a=getCssPart($s,"common");
echo "mxG.D[mxG.K].style=\"".cleanCss($a)."\";\n";

if($config=="Comment")
{
	$a=getCssPart($s,"comment");
	if($a) echo "mxG.D[mxG.K].style4Comment=\"".cleanCss($a)."\";\n";
}

if($config=="Diagram")
{
	$a=getCssPart($s,"diagram");
	if($a) echo "mxG.D[mxG.K].style4Diagram=\"".cleanCss($a)."\";\n";
}

if($config=="Edit")
{
	$a=getCssPart($s,"edit");
	if($a) echo "mxG.D[mxG.K].style4Edit=\"".cleanCss($a)."\";\n";
}

if($config=="Game")
{
	$a=getCssPart($s,"game");
	if($a) echo "mxG.D[mxG.K].style4Game=\"".cleanCss($a)."\";\n";
}

if($config=="Lesson")
{
	$a=getCssPart($s,"lesson");
	if($a) echo "mxG.D[mxG.K].style4Lesson=\"".cleanCss($a)."\";\n";
}

if($config=="Problem")
{
	$a=getCssPart($s,"problem");
	if($a) echo "mxG.D[mxG.K].style4Problem=\"".cleanCss($a)."\";\n";
}

if($config=="Replay")
{
	$a=getCssPart($s,"replay");
	if($a) echo "mxG.D[mxG.K].style4Replay=\"".cleanCss($a)."\";\n";
}

if($config=="Score")
{
	$a=getCssPart($s,"score");
	if($a) echo "mxG.D[mxG.K].style4Score=\"".cleanCss($a)."\";\n";
}

if($config=="Tree")
{
	$a=getCssPart($s,"tree");
	if($a) echo "mxG.D[mxG.K].style4Tree=\"".cleanCss($a)."\";\n";
}
?>
