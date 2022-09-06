<?php
// output is plain text
header("Content-type:text/plain");
include_once "../../_sample/_php/lib.php";

function makeJsForTheme($theme,$configs)
{
	echo "\n ".$theme." theme\n";
	foreach($configs as $config)
	{
		echo " ".$config." config: ";
		if (makeJs($config,$theme))
			echo "done!\n";
		else echo "fail!\n";
	}
}
if (isConvenientServer())
{
	// do it only on local server
	echo "Make all alone\n";
	$theme="Classic";
	$configs=["Basic","Comment","Diagram","Game","Problem","Tree"];
	makeJsForTheme($theme,$configs);

	$theme="Eidogo";
	$configs=["Basic","Comment","Diagram","Game","Problem","Tree"];
	makeJsForTheme($theme,$configs);

	$theme="Fm";
	$configs=["Game"];
	makeJsForTheme($theme,$configs);

	$theme="Forum";
	$configs=["Basic","Comment","Diagram","Game","Problem","Tree"];
	makeJsForTheme($theme,$configs);

	$theme="Iroha";
	$configs=["Basic","Diagram"];
	makeJsForTheme($theme,$configs);

	$theme="Jdg";
	$configs=["Basic","Comment","Diagram","Game","Problem","Tree"];
	makeJsForTheme($theme,$configs);

	$theme="Kifla";
	$configs=["Game"];
	makeJsForTheme($theme,$configs);

	$theme="Minimalist";
	$configs=["Basic","Comment","Diagram","Edit","Game","Kifu","Lesson","Loop","Problem","Replay","Score","Tree","Zero"];
	makeJsForTheme($theme,$configs);

	$theme="NeoClassic";
	$configs=["Basic","Comment","Diagram","Game","Problem","Tree"];
	makeJsForTheme($theme,$configs);

	$theme="Rfg";
	$configs=["Basic","Comment","Diagram","Game","Problem","Tree"];
	makeJsForTheme($theme,$configs);

	$theme="Rosewood";
	$configs=["Basic","Comment","Diagram","Game","Problem","Tree"];
	makeJsForTheme($theme,$configs);

	$theme="Tatami";
	$configs=["Basic","Comment","Diagram","Game","Problem","Replay","Tree"];
	makeJsForTheme($theme,$configs);

	$theme="Tiger";
	$configs=["Comment","Tree"];
	makeJsForTheme($theme,$configs);

	$theme="Troyes";
	$configs=["Basic","Comment","Diagram","Game","Problem","Tree"];
	makeJsForTheme($theme,$configs);

	$theme="WGo";
	$configs=["Basic","Comment","Diagram","Game","Problem","Tree"];
	makeJsForTheme($theme,$configs);
}
else echo "See you later!";
?>