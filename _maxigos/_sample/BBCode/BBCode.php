<!DOCTYPE html>
<?php
include "../_php/lib.php";
$lang=(isset($_GET["lang"])?safeValue($_GET["lang"]):"en");
switch($lang)
{
	case "fr":$x=2;break;
	case "ja":$x=3;break;
	case "zh-hans":$x=4;break;
	case "zh-hant":$x=5;break;
	default:$x=1;
}
$y=(($lang=="fr")?2:1);
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
	padding:1px;
	font-family:sans-serif;
}
div.mxGlobal
{
	margin:1em auto;
	padding:0 1em;
	background:transparent;
}
main>h2
{
	font-size:1.25em;
	background:#000;
	color:#fff;
	padding:0.25em 1.25em;
	margin:0;
}
main>p
{
	margin:0 0.5em 0.5em 0.5em;
}
</style>
</head>
<body>

<main>

<?php if ($lang=="fr") {?>
<p>Cet exemple montre comment insérer des lecteurs maxiGos à l'aide de BBCode dans une page
où aucun système de BBCode n'est disponible. Il contient une petite fonction javascript
à inclure en fin de page qui simule le fonctionnement d'un tel système.
</p>
<?php } else {?>
<p>This sample shows how to include various maxiGos players using BBCode on a website
where there is no BBCode parser available.
It provides a small javascript function to include at the bottom of the page
that does the parsing.
</p>
<?php }?>
<h2>Basic (default)</h2>
[sgf]download/file.php?id=11<?=$x?>[/sgf]
<h2>Comment</h2>
[sgf=comment]download/file.php?id=16<?=$y?>[/sgf]
<h2>Diagram</h2>
[sgf=diagram]download/file.php?id=211[/sgf]
<h2>Game</h2>
[sgf=game]download/file.php?id=11<?=$x?>[/sgf]
<h2>Problem</h2>
[sgf=problem]download/file.php?id=43<?=$x?>[/sgf]
<h2>Tree</h2>
[sgf=tree]download/file.php?id=16<?=$y?>[/sgf]
</main>

<script>
(function(lang)
{
	// replace [sgf={identifier}]{url}[/sgf]
	// by <div lang="xy"
	//         data-maxigos-source-filter="r"
	//         data-maxigos={identifier}>{url}</div>
	// where {identifier} is the name of a maxiGos configuration such as "basic", "comment", ...
	// where {url} is an url which gets sgf files such as "download/file.php?id=123"
	// where "xy" is a language code such as "en", "fr", "ja", ...
	// where "r" is a regex which matches {url}
	let e,f,p,r,a,b;
	// adapt the line below to get the html element which encloses your content
	// here, assume the html element is "main"
	e=document.querySelector("main");
	// prepare the regex which retrieves maxigos config and script which gets sgf
	// here, assume config is among (basic|comment|diagram|game|problem|tree)
	r=new RegExp("\\[sgf(=(basic|comment|diagram|game|problem|tree))?\\]([\\s\\S]+?)\\[\\/sgf\\]","g");
	// adapt the lines below to match your url which gets sgf files
	// here, assume the url is as "download/file.php?nnn" where nnn is a number
	f="^download/file\\.php\\?id=[0-9]+?";
	a="lang=\""+lang+"\"";
	b="data-maxigos-source-filter=\""+f+"\"";
	// assume the theme is "Minimalist"
	p="<div "+a+" "+b+" data-maxigos=\"$2,Minimalist\">$3</div>";
	e.innerHTML=e.innerHTML.replace(r,p);
})("<?=$lang?>"); // replace the parameter by a language code such as "en", "fr", "ja", ...
</script>
<?php if (in_array($lang,array("ja","zh-hans","zh-hant"))) {?>
<!-- insert the script that contains translation in $lang -->
<script src="../../_i18n/maxigos-i18n-<?=$lang?>.js"></script>
<?php }?>
<!-- insert the script that runs maxigos viewers -->
<script src="../_js/mgosLoader.js"></script>
<script src="../_js/mgosIframe.js"></script>
</body>
</html>
