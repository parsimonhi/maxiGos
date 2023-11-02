<!DOCTYPE html>
<?php $lang="fr";?>
<html lang="<?=$lang?>">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="initial-scale=1.0,user-scalable=yes">
<?php include_once "../../_php/version.php";?>
<title>Page de téléchargement de maxiGos v<?=$v?></title>
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
<nav class="menu"><?=(file_exists("../../../index.php")?"<a href=\"../../../index.php?lang=fr\">Accueil</a>":"")?><!--
--><a href="documentation.php">Documentation</a><!--
--><a href="<?=str_replace("/_fr/","/_en/",$_SERVER["SCRIPT_NAME"])?>"><img class="flag" src="../../_img/flag/en.svg"> English</a><!--
--><a href="<?=str_replace("/_en/","/_fr/",$_SERVER["SCRIPT_NAME"])?>"><img class="flag" src="../../_img/flag/fr.svg"> Fran&ccedil;ais</a></nav>
<h1>MaxiGos v<?=$v.".".$r?> - Page de téléchargement</h1>
<p><em>Copyright 1998-<?=date("Y")?> - FM&SH</em></p>
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
<p><a href="<?=$dir.$vbne?>">Cliquez ici pour télécharger maxiGos V<?=$v.".".$r?></a>.</p>
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
<?=printOneThemeDownloadLines("classic")?>
<?=printOneThemeDownloadLines("minimalist")?>
<?=printOneThemeDownloadLines("neo-classic")?>
<?=printOneThemeDownloadLines("rosewood")?>
<?=printOneThemeDownloadLines("tatami")?>
<?=printOneThemeDownloadLines("troyes")?>

<h3>Autres thèmes</h3>
<?=printOneThemeDownloadLines("eidogo")?>
<?=printOneThemeDownloadLines("forum")?>
<?=printOneThemeDownloadLines("fm")?>
<?=printOneThemeDownloadLines("iroha")?>
<?=printOneThemeDownloadLines("jdg")?>
<?=printOneThemeDownloadLines("kifla")?>
<?=printOneThemeDownloadLines("rfg")?>
<?=printOneThemeDownloadLines("tiger")?>
<?=printOneThemeDownloadLines("wgo")?>

<h3>Scripts d'internationalisation</h3>
<p>Ci-dessous la liste des scripts d'internationalisation disponibles dans maxiGos :</p>
<ul>
<?=printOneInternationalizationScriptLine('ja')?>
<?=printOneInternationalizationScriptLine('zh-hans')?>
<?=printOneInternationalizationScriptLine('zh-hant')?>
</ul>
<h2>Quoi de neuf dans la version 8.01 ?</h2>
<ul>
<li>Correction d'un bug dans mgosInfo.js qui empêchait le SGF d'être mis à jour lorsque l'on en modifiait l'entête.</li>
</ul>
<h2>Quoi de neuf dans la version 8.00 ?</h2>
<ul>
<li>Priorité à l'usage de l'attribut "data-maxigos-sgf"
pour insérer du sgf (le validateur du w3c le souhaite).
On a désormais besoin de remplacer tout guillemet double (ou simple)
par leur entité html &amp;quote;/&amp;#34; (ou &amp;#39;)
quand on insère un enregistrement sgf comme valeur de l'attribut "data-maxigos-sgf"
(ce remplacement est par contre inutile si le sgf est dans un fichier sgf).
Insérer un sgf entre les balises &lt;script&gt; et &lt;/script&gt;
continue de fonctionner mais est déprécié.</li>
<li>Réduction de la taille du code.</li>
<li>Amélioration de la vitesse d'exécution.</li>
<li>Amélioration de la netteté des lignes du goban.</li>
<li>Ajout d'une description du goban pour les lecteurs d'écran.</li>
<li>Simplification du html interne (comme par exemple pour le contenu des boutons).</li>
<li>Nombreux changements dans le css.</li>
<li>Séparation automatique du css en plusieurs parties
afin de réduire la taille du code des lecteurs
Fait pour les configurations "Edit", "Lesson" et "Problem".</li>
<li>Amélioration de l'affichage de l'arbre des coups
(en particulier quand cet arbre est très grand).
Affiche toujours une portion suffisante de l'arbre pour couvrir
toute la surface visible par l'utilisateur
(ce n'était pas toujours le cas précédemment)
excepté quand les styles ont été désactivés dans le navigateur.
Dans ce cas, quand l'arbre est très grand, l'utilisateur doit cliquer sur l'arbre
pour provoquer l'affichage de nouvelles parties de l'arbre
(générer automatiquement les très grands arbres peut sinon être très longs).</li>
<li>Remplacement de la GBox (qui étaient des sortes de dialogues faits maison)
par une balise html dialog.</li>
<li>Remplacement des balises internes de "GotoDiv" par une balise input[type=range].</li>
<li>Remplacement des balises internes de "GuessDiv" par une balise meter.</li>
<li>Remplacement des balises internes de "SpeedDiv" par une balise input[type=range].</li>
<li>Affichage des marques et étiquettes (quand il y en a sur le goban)
dans la liste des coups invisibles.
Précédemment, seuls les numéros et coordonnées des coups étaient affichées.</li>
<li>Remplacement des paramètres concatXxx par concatInHeader.</li>
<li>Remplacement des paramètres hideXxx par hideInHeader et hideInOptions.</li>
<li>Suppression des paramètres mainVariationOnlyLoop, htmlParenthesis, gotoInputOn, gotoInputBefore.</li>
<li>Changement du nom du composant "Option" en "Options".</li>
<li>Les classes XxxParentDiv, XxxGrandParentDiv, XxxGreatGrandParentDiv, etc.
ne sont plus ajoutées aux classes de la boite globale.
Elles sont ajoutées seulements aux boites de regroupement.</li>
<li>suppression du composant Title (déplacement de son code dans le compsant Header).</li>
<li>Ajout des items "Reset" et "Thickness" dans le menu "View".</li>
<li>Simplification de la gestion du focus
(utilisation de :focus-visible dans le css pour afficher ou cacher la marque de focus sur le goban).</li>
<li>Correction de bogues mineurs.</li>
</ul>
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

<nav class="menu"><?=(file_exists("../../index.php")?"<a href=\"../../index.php?lang=fr\">Accueil</a>":"")?><!--
--><a href="documentation.php">Documentation</a><!--
--><a href="<?=str_replace("/fr/","/en/",$_SERVER["SCRIPT_NAME"])?>"><img class="flag" src="../../_img/flag/en.svg"> English</a><!--
--><a href="<?=str_replace("/en/","/fr/",$_SERVER["SCRIPT_NAME"])?>"><img class="flag" src="../../_img/flag/fr.svg"> Fran&ccedil;ais</a></nav>
</body>
</html>