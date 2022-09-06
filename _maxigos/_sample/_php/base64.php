<?php
include "lib.php";
if (isset($_GET["i"])) $i=safeValue($_GET["i"]);
else $i="";
if (isset($_GET["t"])) $t=safeValue($_GET["t"]);
else $t="";
if (isset($_GET["r"])) $r=safeValue($_GET["r"]);
else $r="";
$f="../../_img/".$r."/".$i.".".$t;
echo $f."<br>";
echo base64EncodeImage($f,$t)."<br>";
echo "Done!";
?>
