<?php
if(isset($_GET["id"])) $id=intval($_GET["id"]);
else $id=0;
if($id==1) echo file_get_contents("../_sgf/game/blood-vomit-en.sgf");
if($id==2) echo file_get_contents("../_sgf/game/blood-vomit-fr.sgf");
if($id==3) echo file_get_contents("../_sgf/game/blood-vomit-ja.sgf");
if($id==4) echo file_get_contents("../_sgf/game/blood-vomit-zh-hans.sgf");
if($id==5) echo file_get_contents("../_sgf/game/blood-vomit-zh-hant.sgf");
else echo "(;GM[1]CA[UTF-8]FF[4]SZ[19])";
?>