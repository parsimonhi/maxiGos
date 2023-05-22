<!DOCTYPE html>
<?php $lang="fr";?>
<html lang="<?php echo $lang;?>">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="initial-scale=1.0,user-scalable=yes">
<?php include_once "../../_php/version.php";?>
<title>Page de téléchargement de maxiGos v<?php print $v;?></title>
<style>
.flag
{
	margin-left:1em;
	margin-right:0.5em;
	vertical-align:middle;
	width:1.8em;
	height:auto;
}
.menu a {padding-right:1em;vertical-align:middle;}
code
{
	display:block;
	padding:0.5rem;
	margin:0.5rem 0;
	color:#e3e3e3;
	background:#3e3e3e;
}
.themeTable
{
	border-collapse:collapse;
}
.themeTable td
{
	border: 1px solid #000;
	padding:0.5rem;
}
</style>
</head>
<body>
<nav class="menu"><?php if (file_exists("../../../index.php")) print "<a href=\"../../../index.php?lang=fr\">Accueil</a>";?><!--
--><a href="documentation.php">Documentation</a><!--
--><a href="<?php print str_replace("/_fr/","/_en/",$_SERVER["SCRIPT_NAME"]);?>"><img class="flag" src="../../_img/flag/en.svg"> English</a><!--
--><a href="<?php print str_replace("/_en/","/_fr/",$_SERVER["SCRIPT_NAME"]);?>"><img class="flag" src="../../_img/flag/fr.svg"> Fran&ccedil;ais</a></nav>
<h1>MaxiGos v<?php print $v.".".$r;?> - Page de téléchargement</h1>
<p><em>Copyright 1998-<?php print date("Y");?> - FM&SH</em></p>
<p>MaxiGos est un ensemble de lecteurs sgf permettant d'afficher
des diagrammes, parties ou problèmes de go dans une page web. 
L'utilisateur final n'a rien d'autre à faire que d'avoir laissé javascript activé dans son navigateur.</p>
<p>Vous pouvez utiliser maxiGos gratuitement pour votre site (<a href="../license.txt">licence</a> de type BSD).</p>
<?php
$vbn="_maxigos".$v.$r;
$vbne=$vbn.".zip";
$dir="../../../";
$mxL="fr";
?>
<?php if (file_exists($dir.$vbne)) { ?>
<h2>Téléchargement de la version complète de maxiGos</h2>
<p><a href="<?php print $dir.$vbne;?>">Cliquez ici pour télécharger maxiGos V<?php print $v.".".$r;?></a>.</p>
<?php }?>
<h2>Téléchargement d'un lecteur autonome maxGos</h2>
<p>Ces lecteurs sont conçus pour fonctionner seuls.
Si vous utilisez l'anglais ou le français, tout le code dont ils ont besoin est encapsulé
dans un seul script (celui du lecteur sgf maxiGos).
Si vous utilisez une autre langue, le code est encapsulé dans deux scripts
(un script d'internationalisation "i18n" et le script du lecteur sgf maxiGos).</p>
<p>
<p>Pour spécifier la langue d'utilisation de maxiGos, on utilise l'attribut "lang"
des balises html. Consultez le chapitre
<a href="documentation.php#internationalisation">Internationalisation</a>
de la documentation pour plus de détails.</p>
<p>Pour les langues autre que le français et l'anglais,
il est nécessaire d'utiliser en plus un script d'internationalisation.</p>
<p>Par exemple, si l'on veut se servir du lecteur "maxigos-neo-classic-game.js" :</p>
<ul>
<li>Pour utiliser maxiGos en français, téléchargez "maxigos-neo-classic-game.js",
et utilisez le code suivant dans vos pages :<br>
<code><pre>
&lt;script lang="fr" src="path-to-a-maxigos-script/maxigos-neo-classic-game.js"&gt;
path-to-a-sgf-file/a-sgf-file.sgf
&lt;/script&gt;
</pre></code>
</li>
<li>Pour utiliser maxiGos en anglais, téléchargez simplement "maxigos-neo-classic-game.js",
et utilisez le code suivant dans vos pages :<br>
<code><pre>
&lt;script lang="en" src="path/maxigos-neo-classic-game.js"&gt;
path-to-a-sgf-file/a-sgf-file.sgf
&lt;/script&gt;
</pre></code>
</li>
<li>Pour utiliser maxiGos en japonais, téléchargez "maxigos-i18n-ja.js" et "maxigos-neo-classic-game.js",
et utilisez le code suivant dans vos pages :<br>
<code><pre>
&lt;script src="path/maxigos-i18n-ja.js"&gt;&lt;/script&gt;
&lt;script lang="ja" src="path/maxigos-neo-classic-game.js"&gt;
path-to-a-sgf-file/a-sgf-file.sgf
&lt;/script&gt;
</pre></code>
</li>
</ul>

<?php
include("../../_php/lib.php");
?>
<h3>Thèmes principaux</h3>
<p>MaxiGos est décliné en plusieurs thèmes et plusieurs configurations.</p>
<?php printOneThemeDownloadLines("classic");?>
<?php printOneThemeDownloadLines("minimalist");?>
<?php printOneThemeDownloadLines("neo-classic");?>
<?php printOneThemeDownloadLines("rosewood");?>
<?php printOneThemeDownloadLines("tatami");?>
<?php printOneThemeDownloadLines("troyes");?>

<h3>Autres thèmes</h3>
<?php printOneThemeDownloadLines("eidogo");?>
<?php printOneThemeDownloadLines("forum");?>
<?php printOneThemeDownloadLines("fm");?>
<?php printOneThemeDownloadLines("iroha");?>
<?php printOneThemeDownloadLines("jdg");?>
<?php printOneThemeDownloadLines("kifla");?>
<?php printOneThemeDownloadLines("rfg");?>
<?php printOneThemeDownloadLines("tiger");?>
<?php printOneThemeDownloadLines("wgo");?>

<h3>Scripts d'internationalisation</h3>
<p>Ci-dessous la liste des scripts d'internationalisation disponibles dans maxiGos :</p>
<ul>
<?php printOneInternationalizationScriptLine('ja');?>
<?php printOneInternationalizationScriptLine('zh-hans');?>
<?php printOneInternationalizationScriptLine('zh-hant');?>
</ul>

<h2>Alerte pour ceux qui utilisaient maxiGos v6</h2>
<p>Beaucoup de changements ont été effectués entre la v6 et la v7.
Consultez la <a href="documentation.php">documentation</a> pour plus de détails.</p>
<p>Cependant, si vous utilisiez déjà les lecteurs autonomes de maxiGos dans des pages en français,
et sans configuration particulière,
vous ne devriez avoir que peu de changements à effectuer
(il vous faudra essentiellement remplacer les anciens lecteurs autonomes par les nouveaux,
et changer le nom des lecteurs autonomes dans vos pages).</p>
<h2>Quoi de neuf dans la version 7.05 ?</h2>
<ul>
<li>La grille du goban est désormais dessinée avec seulement deux path svg
(au lieu d'un path par ligne et un circle par point étoile auparavant,
soit 38 paths et 9 circles pour un goban 19x19).
Cela permet de réduire significativement le nombre de balises du svg.</li>
<li>Supprime le traitement particulier qui était effectué pour les navigateurs Android
lors de la sélection d'une partie du goban dans le composant Edit.</li>
<li>Remplace "&lt;" et "&gt;" par leurs équivalents html quand ils apparaissent
dans le contenu d'une balise svg &lt;text&gt;.</li>
<li>Diverses modifications mineures.</li>
</ul>
<h2>Quoi de neuf dans la version 7.04 ?</h2>
<ul>
<li>Correction d'un bug lors de l'affichage du mot "with" ou de sa traduction dans le composant "Option".</li>
</ul>
<h2>Quoi de neuf dans la version 7.03 ?</h2>
<ul>
<li>Correction d'un bug lors de l'enregistrement du résultat d'une partie.
Le "R" dans "B+R" ou "W+R" manquait en cas de victoire par abandon.</li>
<li>Diverses modifications mineures.</li>
</ul>
<h2>Quoi de neuf dans la version 7.02 ?</h2>
<ul>
<li>Corrige un bug lors du calcul des classes des boites parentes.</li>
<li>Corrige un bug d'affichage de la barre du composant "Speed".</li>
<li>Diverses modifications mineures.</li>
</ul>
<h2>Quoi de neuf dans la version 7.01 ?</h2>
<ul>
<li>Lors de l'utilisation de la roue, on attend plus entre les premiers coups
pour être capable de ne placer qu'un ou quelques coups.</li>
<li>Enregistrement des préférences du composant "View" dans le localStorage du navigateur.</li>
<li>Ajout de coche sur les éléments du menu "View".</li>
<li>Les composants "Png" et "Svg" affichent désormais leur image dans une boite
à la place du goban au lieu de les afficher dans une nouvelle fenêtre.</li>
<li>Ré-écriture complète du composant "Score".</li>
<li>Réduction significative de la taille des images utilisées pour le fond du goban.</li>
<li>Nouvelle manière de télécharger les sgf depuis le serveur
(évite un double chargement quand le fichier sgf n'a pas pour charset UTF-8).</li>
<li>Possibilité pour l'utilisateur de redimensionner la boite de l'arbre des coups
dans la configuration "Edit".</li>
<li>Correction d'un bug qui empêchait le textarea permettant d'éditer les sgf
de s'afficher en entier avec firefox.</li>
<li>Modification de l'étiquette de l'outil "as in book" en version anglaise ("B" devient "K").</li>
<li>Diverses modifications mineures.</li>
</ul>
<h2>Quoi de neuf dans la version 7.00 ?</h2>
<ul>
<li>Nouvelle manière d'inclure les lecteurs maxiGos.</li>
<li>Nouvelle manière de specifier la langue à utiliser dans maxiGos.</li>
<li>Utilisation intensive de Svg au lieu des canvas html5 pour afficher le goban.</li>
<li>Réécriture des Css.</li>
<li>Nombreux changements de paramètres.</li>
<li>Nouveaux exemples.</li>
<li>Nombreuses autres optimisations et corrections.</li>
</ul>

<nav class="menu"><?php if (file_exists("../../index.php")) print "<a href=\"../../index.php?lang=fr\">Accueil</a>";?><!--
--><a href="documentation.php">Documentation</a><!--
--><a href="<?php print str_replace("/fr/","/en/",$_SERVER["SCRIPT_NAME"]);?>"><img class="flag" src="../../_img/flag/en.svg"> English</a><!--
--><a href="<?php print str_replace("/en/","/fr/",$_SERVER["SCRIPT_NAME"]);?>"><img class="flag" src="../../_img/flag/fr.svg"> Fran&ccedil;ais</a></nav>
</body>
</html>