<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="initial-scale=1.0,user-scalable=yes">
<meta name="description" content="MaxiGos est un ensemble de lecteurs sgf permettant d'afficher des diagrammes, parties ou problèmes de go dans une page web.">
<?php include "../../_php/version.php";?>
<title>Documentation pour maxiGos v<?php print $v;?></title>
<style>
p.note {font-style:italic;}
h1+em,
h1+em+nav {display:block;text-align:center;}
h1+em+nav {margin-top:0.5em;}
pre,
.code
{
	color:red;
	font-family:monaco;
	font-size:1em;
	background:#3e3e3e;
	color:#e3e3e3;
	padding:1em;
	white-space:pre-wrap;
	text-align:left;
}
p.code, div.code {text-align:left;}
.important {color:black;font-weight:bold;}
table.params {border-collapse: collapse;}
table.params th, table.params td {border: 1px solid black;padding: 3px;}
.parameter,
.attribute,
.component,
.config,
.theme,
.jsFile,
.phpFile,
.sgfFile,
.tag
{
	color:#c33;
}
h1 {font-size:2em;text-align: center;}
h2:before {content: counter(h2counter) ". ";}
h2 {font-size:1.8em;counter-increment: h2counter;counter-reset: h3counter;}
h3:before {content: counter(h2counter) "." counter(h3counter) ". " ;}
h3 {font-size:1.6em;counter-increment: h3counter;counter-reset: h4counter;}
h4:before {content: counter(h2counter) "." counter(h3counter) "." counter(h4counter) ". ";}
h4 {font-size:1.4em;counter-increment: h4counter;counter-reset: h5counter;}
h5:before {content: counter(h2counter) "." counter(h3counter) "." counter(h4counter) "." counter(h5counter) ". ";}
h5 {font-size:1.2em;counter-increment: h5counter;}
img.flag
{
	margin-left:1em;
	margin-right:0.5em;
	vertical-align:middle;
	width:1.8em;
	height:auto;
}
.classList>div {margin:1em 0;}
.classList>div div {margin-left:2em;}
h2 .component,
h3 .component,
h4 .component,
h5 .component,
h6 .component
{
	color:#000;
}
figure.maxigosSample
{
	background:#eee;
	padding:1rem;
}
/* customSmallBordeaux example */
#customSmallBordeaux div.mxGlobalBoxDiv.mxDiagramConfig.mxNeoClassicTheme
{
	--gobanMaxWidth:60em;
}
#customSmallBordeaux div.mxGlobalBoxDiv.mxDiagramConfig.mxNeoClassicTheme svg
{
	background-image:none;
	background:#a72926;
}
#customSmallBordeaux div.mxGlobalBoxDiv.mxDiagramConfig.mxNeoClassicTheme .mxGobanLine,
#customSmallBordeaux div.mxGlobalBoxDiv.mxDiagramConfig.mxNeoClassicTheme .mxMark.mxOnEmpty:not(.mxPointBackground)
{
	stroke:#fff;
}
#customSmallBordeaux div.mxGlobalBoxDiv.mxDiagramConfig.mxNeoClassicTheme .mxStar,
#customSmallBordeaux div.mxGlobalBoxDiv.mxDiagramConfig.mxNeoClassicTheme .mxIndice,
#customSmallBordeaux div.mxGlobalBoxDiv.mxDiagramConfig.mxNeoClassicTheme .mxLabel.mxOnEmpty:not(.mxPointBackground)
{
	fill:#fff;
	stroke:#fff;
}
#customSmallBordeaux div.mxGlobalBoxDiv.mxDiagramConfig.mxNeoClassicTheme .mxPointBackground.mxOnEmpty
{
	fill:#0003;
	stroke:none;
}
</style>
</head>
<body>
<nav><?php if (file_exists("../../../index.php")) print "<a href=\"../../../index.php?lang=fr\">Accueil</a>";?><!--
--><a href="<?php print str_replace("/_fr/","/_en/",$_SERVER["SCRIPT_NAME"]);?>"><img alt="English" class="flag" src="../../_img/flag/en.svg">English</a><!--
--><a href="<?php print str_replace("/_en/","/_fr/",$_SERVER["SCRIPT_NAME"]);?>"><img alt="Français" class="flag" src="../../_img/flag/fr.svg">Français</a></nav>
<h1>Documentation pour maxiGos v<?php print $v;?></h1>
<em>Copyright 1998-<?php print date("Y");?> - FM&SH</em>
<nav><a href="download.php">Téléchargement</a></nav>
<h2>Qu'est-ce que maxiGos ?</h2>
<p>MaxiGos est un ensemble de lecteurs sgf permettant d'afficher
des diagrammes, parties ou problèmes de go dans une page web. </p>
<p>Vous pouvez utiliser maxiGos gratuitement pour votre site (<a href="../license.txt">licence</a> de type BSD).</p>
<h2>Quels sont les prérequis ?</h2>
<p>Le navigateur de l'utilisateur final doit pouvoir interpréter du HTML5,
et doit avoir javascript activé.</p>
<p>Si on utilise uniquement les lecteurs autonomes de maxiGos (qui sont en javascript),
il n'y a aucun prérequis en ce qui concerne le serveur sur lequel ils sont installés.</p>
<p>Si on utilise la version complète de maxiGos (qui utilise javascript, css et php),
le serveur sur lequel il est installé doit disposer de php.</p>
<h2>Comment commencer simplement avec maxiGos ?</h2>
<h3>Un exemple</h3>
<p>Allez à la page des <a href="download.php">téléchargements</a>
et téléchargez l'un des lecteurs maxiGos, par exemple 
<a href="../../_sample/neo-classic/_alone/maxigos-neo-classic-game.js" download="maxigos-neo-classic-game.js">maxigos-neo-classic-game.js</a>.
<p>Copiez-le n'importe où sur votre site.</p>
<p>En supposant que vous voulez afficher le contenu d'un fichier sgf 
nommé <span class="sgfFile">blood-vomit-fr.sgf</span>,
insérez dans la partie <span class="tag">&lt;body&gt;</span> d'une page html
(à l'endroit où vous voulez que le lecteur s'affiche)
un code du genre :</p>
<code><pre>&lt;script src="ppp/maxigos-neo-classic-game.js"&gt;
qqq/blood-vomit-fr.sgf
&lt;/script&gt;</pre></code>
<p>Remplacez "ppp/" par un chemin relatif entre la page html concernée et le script maxiGos <span class="jsFile">maxigos-neo-classic-game.js</span>.</p>
<p>Remplacez "qqq/" par un chemin relatif entre la page html concernée et le fichier sgf <span class="sgfFile">blood-vomit-fr.sgf</span>.</p>
<p>On doit alors obtenir le résultat ci-dessous :</p>
<figure class="maxigosSample">
<script src="../../_sample/neo-classic/_alone/maxigos-neo-classic-game.js">
../../_sample/_sgf/game/blood-vomit-fr.sgf
</script>
</figure>
<h3>Quels sont les lecteurs disponibles et pour quel usage ?</h3>
<p>Il existe plusieurs configurations différentes de maxiGos,
déclinées en plusieurs thèmes.</p>
<p>Configurations principales :</p>
<ul>
<li><span class="component">Basic</span> (un goban et des boutons de navigation), pour afficher simplement une partie,</li>
<li><span class="component">Comment</span> (un goban, des boutons de navigation et une fenêtre de commentaire), pour afficher une partie avec les commentaires,</li>
<li><span class="component">Diagram</span> (un goban et une liste des coups non affichés), pour afficher un diagramme ou une figure,</li>
<li><span class="component">Game</span> (une entête, un goban et des boutons de navigation), pour afficher une partie et les informations sur cette partie,</li>
<li><span class="component">Problem</span> (un goban et des boutons pour revenir en arrière, passer, ou donner une indication de la suite), pour afficher un problème,</li>
<li><span class="component">Tree</span> (un goban, des boutons de navigation, une fenêtre de commentaire, et un arbre des coups), pour afficher une partie avec les commentaires et l'arbre des coups. </li>
</ul>
<p>Thèmes principaux :</p>
<ul>
<li><span class="theme">Classic</span> (le premier thème de maxiGos)</li>
<li><span class="theme">Minimalist</span> (un thème en noir et blanc minimaliste, destiné à être modifié par une feuille de style),</li>
<li><span class="theme">NeoClassic</span> (longtemps le thème par défaut de maxiGos)</li>
<li><span class="theme">Rosewood</span> (un thème d'inspiration chinoise)</li>
<li><span class="theme">Tatami</span> (un thème d'inspiration japonaise)</li>
<li><span class="theme">Troyes</span> (un thème d'inspiration française)</li>
</ul>
<p>Dans de nombreux cas, ces lecteurs suffiront.</p>
<p>Par ailleurs, il existe d'autres configurations secondaires
qui ne sont pas disponibles pour tous les thèmes,
et aussi d'autres thèmes élaborés pour des besoins spécifiques :</p>
<p>Quelques configurations secondaires (thème <span class="theme">Minimalist</span>) :</p>
<ul>
<li><span class="component">Edit</span> (un éditeur sgf),</li>
<li><span class="component">Kifu</span> (une entête, un goban, et une liste des coups non affichés),</li>
<li><span class="component">Lesson</span> (un goban, des boutons de navigation, et une bulle de commentaires, avec lecture en boucle),</li>
<li><span class="component">Loop</span> (un goban qui affiche un sgf en boucle).</li>
<li><span class="component">Replay</span> (une entête, un goban, des boutons de navigation et une barre de devinette).</li>
<li><span class="component">Zero</span> (un goban sans rien d'autre).</li>
</ul>
<p>Quelques thèmes secondaires :</p>
<ul>
<li><span class="theme">Bamboo</span></li>
<li><span class="theme">Bordeaux</span></li>
<li><span class="theme">Eidogo</span></li>
<li><span class="theme">Fm</span></li>
<li><span class="theme">Forum</span></li>
<li><span class="theme">Iroha</span></li>
<li><span class="theme">Jdg</span></li>
<li><span class="theme">Kifla</span></li>
<li><span class="theme">Manuscript</span></li>
<li><span class="theme">Rfg</span></li>
<li><span class="theme">Tactigo</span></li>
<li><span class="theme">Tiger</span></li>
<li><span class="theme">Tsumego</span></li>
<li><span class="theme">WGo</span></li>
</ul>
<p>On peut aussi créer ses propres configurations et ses propres thèmes.</p>
<p>On peut ajouter autant de lecteurs maxiGos que l'on veut dans une page. 
On n'est limité que par les possibilités du serveur web et celles de la machine de l'utilisateur.</p>
<h2>Comment installer la version complète de maxiGos ?</h2>
<p>Rendez-vous à la <a href="download.php">page de téléchargement</a>,
téléchargez l'archive contenant maxiGos,
décompressez-la et copiez l'ensemble des dossiers et fichiers n'importe où 
sur votre site. Aucune base de données n'est nécessaire.</p>
<p>Pour vérifier que cela fonctionne, consultez
<a href="../../_sample/">cette page</a>.</p>
<p>L'utilisateur final n'a rien à installer sur sa machine.
Il lui suffit d'un navigateur avec javascript activé.</p>
<h2>Comment utiliser maxiGos ?</h2>
<p>La méthode principale pour insérer un lecteur maxiGos dans une page web
consiste à utiliser :</p>
<ul>
<li>un "lecteur autonome".</li>
</ul>
<p>Mais on peut aussi éventuellement utiliser :</p>
<ul>
<li>un "plugin" (actuellement, on dispose d'un plugin pour joomla
et d'un plugin pour wordpress),</li>
<li>un "BBCode" (par exemple pour PhpBB),</li>
<li>un "générateur" (script php qui fabrique à la volée un lecteur javascript),</li>
<li>un "chargeur" (script javascript qui charge une lecteur javascript).</li>
</ul>
<h3>Méthode utilisant un lecteur autonome en javascript</h3>
<p>On utilisera un lecteur autonome dans les cas où on souhaite faire simple.</p>
<p>Un lecteur autonome est un lecteur maxiGos
dont tout le code est dans un fichier javascript unique.</p> 
<p>Ces lecteurs sont stockés dans le dossier "_alone" de chaque exemple fourni avec maxiGos.
Ces exemples sont dans le dossier "_sample".</p>
<h4>Le code à insérer dans vos pages</h4>
<p>On insère un couple de balises <span class="tag">&lt;script&gt;</span> et <span class="tag">&lt;/script&gt;</span> dans la page à l'endroit 
où doit s'afficher le lecteur sgf, avec comme valeur de l'attribut <span class="attribute">src</span>
le script de l'un des lecteurs autonomes fournis avec maxiGos.</p>
<p>Pour le sgf, on peut insérer un nom de fichier sgf ou un texte représentant du sgf
ou éventuellement une url générant du sgf (par exemple dans le cas d'un forum phpBB)
soit entre les balises <span class="tag">&lt;script&gt;</span> et <span class="tag">&lt;/script&gt;</span> ou
soit comme valeur de l'attribut <span class="attribute">data-maxigos-sgf</span>.</p>
<p>Si on insère un nom de fichier sgf entre les balises <span class="tag">&lt;script&gt;</span> et <span class="tag">&lt;/script&gt;</span>,
cela donne par exemple :</p>
<code><pre>&lt;script src="xxx/maxigos-neo-classic-problem.js"&gt;
yyy/p3-fr.sgf
&lt;/script&gt;</pre></code>
<p>On obtient :</p>
<figure class="maxigosSample">
<script src="../../_sample/neo-classic/_alone/maxigos-neo-classic-problem.js">
../../_sample/_sgf/problem/p1-fr.sgf
</script>
</figure>
<p>Si on insère un nom de fichier sgf comme valeur de l'attribut <span class="attribute">data-maxigos-sgf</span>,
cela donne par exemple :</p>
<code><pre>&lt;script src="xxx/maxigos-neo-classic-problem.js"
	data-maxigos-sgf="yyy/p2-fr.sgf"&gt;
&lt;/script&gt;</pre></code>
<p>On obtient :</p>
<figure class="maxigosSample">
<script src="../../_sample/neo-classic/_alone/maxigos-neo-classic-problem.js"
		data-maxigos-sgf="../../_sample/_sgf/problem/p2-fr.sgf"
>
</script>
</figure>
<p>Il faut évidemment adapter le chemin (ici "xxx") préfixant le script <span class="jsFile">maxigos-problem.js</span>, 
en fonction de l'endroit où vous l'avez copié sur votre site, et de l'endroit où se trouve 
votre page.
Il s'agit du chemin relatif entre votre page et le script javascript du lecteur autonome.</p>
<p>Il faut aussi adapter le chemin (ici "yyy") préfixant le fichier sgf, 
en fonction de l'endroit où vous l'avez copié sur votre site, et de l'endroit où se trouve 
votre page.
Il s'agit du chemin relatif entre votre page et le fichier sgf.</p>
<p>Si on insère un texte représentant du sgf entre les balises <span class="tag">&lt;script&gt;</span> et <span class="tag">&lt;/script&gt;</span>,
cela donne par exemple :</p>
<code><pre>&lt;script src="xxx/maxigos-neo-classic-problem.js"&gt;
(;FF[4]GM[1]SZ[19]VW[aa:ii]FG[1]AW[ee]AB[de][fe][ed];B[ef]C[Correct !])
&lt;/script&gt;</pre></code>
<p>On obtient :</p>
<figure class="maxigosSample">
<script src="../../_sample/neo-classic/_alone/maxigos-neo-classic-problem.js">
(;FF[4]GM[1]SZ[19]VW[aa:ii]FG[1]AW[ee]AB[de][fe][ed];B[ef]C[Correct !])
</script>
</figure>
<p>Si on insère un texte représentant du sgf comme valeur de
l'attribut <span class="attribute">data-maxigos-sgf</span>,
cela donne par exemple :</p>
<code><pre>&lt;script src="xxx/maxigos-neo-classic-problem.js"
	data-maxigos-sgf="(;FF[4]GM[1]SZ[19]VW[aa:ii]FG[1]AW[ee]AB[de][fe][ed];B[ef]C[Correct !])"&gt;
&lt;/script&gt;</pre></code>
<p class="note">Note : lorsqu'on insère directement un texte représentant du sgf dans la page
comme dans les deux exemples ci-dessus, la propriété sgf CA est inutile
et ignorée même si elle est présente
car l'encodage du texte inséré est forcément le même que celui de la page
(voir le chapitre <a href="#encodage">Encodage</a> pour plus de détails).</p>
<p>Si on insère une url générant du sgf,
il est nécessaire d'ajouter l'attribut <span class="attribute">data-maxigos-source-filter</span>
avec comme valeur une expression régulière qui vérifie si l'url est valide.
Par exemple :</p>
<code><pre>&lt;script src="xxx/maxigos-problem.js"
	data-maxigos-source-filter="/download/file\.php\?id=[0-9]+$"&gt;
/download/file.php?id=23
&lt;/script&gt;</pre></code>
<p>Si on insère une url générant du sgf comme valeur de
l'attribut <span class="attribute">data-maxigos-sgf</span>,
cela donne par exemple :</p>
<code><pre>&lt;script src="xxx/maxigos-problem.js"
	data-maxigos-sgf="/download/file.php?id=23"
	data-maxigos-source-filter="/download/file\.php\?id=[0-9]+$"&gt;
&lt;/script&gt;</pre></code>
<p>L'url doit respecter le principe de "même origine" que la page dans laquelle on l'insère
(même protocole, même domaine, même port). Elle ne peut donc pas être une url d'un autre site.</p>
<p class="note">Note 1 : pour faire fonctionner les lecteurs autonomes, 
on n'a pas besoin d'installer l'ensemble de maxiGos sur le serveur. 
Il suffit d'y copier le script du lecteur choisi tant qu'on n'utilise que le français ou l'anglais.
Si on utilise une langue autre que le français ou l'anglais, 
on aura aussi besoin d'inclure dans la page le script d'internationalisation
de cette langue (l'un de ceux qui sont dans le dossier "_i18n").
Voir le chapitre <a href="#internationalisation">Internationalisation</a> pour plus de détails.</p>
<p class="note">Note 2 : en théorie, un lecteur autonome n'utilise pas
de ressources externes. Ces ressources (principalement des images) sont intégrées
dans le code du lecteur, via des "urls de données" (data base64).</p>
<h4 id="personnalisation-lecteur-autonome">Personnalisation des lecteurs autonomes</h4>
<p>La personnalisation de ces lecteurs peut être faite en utilisant des attributs de la balise 
<span class="tag">&lt;script&gt;</span>.
</p>
<p>Le nom de ces attributs est de la forme <span class="attribute">data-maxigos-xxx</span> avec "xxx" le nom d'un paramètre de maxiGos 
(voir le chapitre <a href="#parametrage">Paramétrage</a> pour en savoir plus sur ces paramètres).</p>
<p>Du fait que seuls les lettres en minuscule sont permises dans le nom des attributs, 
on remplace les majuscules des noms des paramètres maxiGos par leurs équivalents en minuscule 
précédés d'un "-". Par exemple, l'attribut correspondant au paramètre maxiGos <span class="parameter">in3dOn</span>
sera <span class="attribute">data-maxigos-in3d-on</span>.</p>
</p>
<p>Beaucoup de choses peuvent être modifiées en utilisant les attributs. 
Par exemple, pour afficher un diagramme sans effet 3D
avec un lecteur <span class="theme">NeoClassic</span> qui est à l'origine avec effet 3d,
on peut utiliser :</p>
</p>
<code><pre>&lt;script src="xxx/maxigos-neo-classic-diagram.js" data-maxigos-in3d-on="0"&gt;
(;FF[4]GM[1]SZ[19]VW[aa:ii]FG[1]AW[ee]AB[de][fe][ed]LB[ef:a][gg:素晴らしい]TR[ee])
&lt;/script&gt;</pre></code>
<p>On obtient :</p>
<figure class="maxigosSample">
<script src="../../_sample/neo-classic/_alone/maxigos-neo-classic-diagram.js"
		data-maxigos-in3d-on="0">
(;FF[4]GM[1]SZ[19]VW[aa:ii]FG[1]AW[ee]AB[de][fe][ed]LB[ef:a][gg:素晴らしい]TR[ee])
</script>
</figure>
<p>Il est aussi possible de modifier l'aspect du lecteur via des feuilles de style,
comme par exemple la couleur du fond du goban,
mais aussi beaucoup d'autres caractéristiques
(voir le chapitre <a href="#style">Balises et classes css utilisées par maxiGos</a> pour plus de détails).</p>
<p>Par exemple, on peut modifier la taille du lecteur, le fond du goban,
la couleur des lignes, etc. avec :</p>
<code><pre>div.mxGlobalBoxDiv.mxDiagramConfig.mxNeoClassicTheme
{
	--gobanMaxWidth:60em;
}
div.mxGlobalBoxDiv.mxDiagramConfig.mxNeoClassicTheme svg
{
	background-image:none;
	background:#a72926;
}
div.mxGlobalBoxDiv.mxDiagramConfig.mxNeoClassicTheme .mxGobanLine,
div.mxGlobalBoxDiv.mxDiagramConfig.mxNeoClassicTheme .mxMark.mxOnEmpty:not(.mxPointBackground)
{
	stroke:#fff;
}
div.mxGlobalBoxDiv.mxDiagramConfig.mxNeoClassicTheme .mxStar,
div.mxGlobalBoxDiv.mxDiagramConfig.mxNeoClassicTheme .mxIndice,
div.mxGlobalBoxDiv.mxDiagramConfig.mxNeoClassicTheme .mxLabel.mxOnEmpty:not(.mxPointBackground)
{
	fill:#fff;
	stroke:#fff;
}
div.mxGlobalBoxDiv.mxDiagramConfig.mxNeoClassicTheme .mxPointBackground.mxOnEmpty
{
	fill:#0003;
	stroke:none;
}
</pre></code>
<figure id="customSmallBordeaux">
<script src="../../_sample/neo-classic/_alone/maxigos-neo-classic-diagram.js"
		data-maxigos-in3d-on="0">
(;FF[4]GM[1]SZ[19]VW[aa:ii]FG[1]AW[ee]AB[de][fe][ed]LB[ef:a][gg:素晴らしい]TR[ee])
</script>
</figure>
<h3>Méthode utilisant un plugin</h3>
<p>Voir les pages des plugins
(pour <a href="http://jeudego.org/maxiGos/joomla.php?lang=fr">Joomla</a>
et pour <a href="http://jeudego.org/maxiGos/wordpress.php?lang=fr">Wordpress</a>)
pour plus de détails.</p>
<h3>Méthode utilisant un BBCode</h3>
<p>Voir la <a href="http://jeudego.org/maxiGos/phpBB.php?lang=fr">page des BBCodes</a>
pour plus de détails.</p>
<h3>Méthode utilisant un "générateur" en php</h3>
<p>Il s'agit d'une méthode plus sophistiquée que celle utilisant les lecteurs autonomes,
permettant une personnalisation plus lourde.</p>
<p>Un générateur est un script php qui va fabriquer "à la volée" le code javascript du lecteur 
en fonction d'informations de configuration qu'il contient.</p>
<p>Chaque lecteur autonome qui est dans le dossier "_alone" des exemples
fournis avec maxiGos possède son générateur qui lui est dans le dossier "_maker" des exemples.</p>
<h4>La ligne à insérer dans vos pages web</h4>
<p>On inclut à l'endroit où doit s'afficher maxiGos dans la page web une ligne du genre :</p>
<code><pre>&lt;script src="xxx/classic/_maker/basic.php"&gt;
yyy/myFirstSgf.sgf
&lt;/script&gt;</pre></code>
<p>Il faut évidemment adapter le chemin (ici "xxx/") préfixant le script
<span class="phpFile">classic/_maker/basic.php</span> qui est le générateur,
en fonction de l'endroit où vous avez installé maxiGos sur votre site,
et de l'endroit où se trouve votre page.
Il s'agit du chemin relatif entre votre page et le script php du générateur. 
<p>En fait, on peut utiliser le même genre de ligne que pour les lecteurs autonomes,
la seule différence étant qu'on remplace le nom du script autonome (par exemple <span class="jsFile">classic/_alone/maxigos-classic-basic.js</span>)
par le nom de son générateur (par exemple <span class="phpFile">classic/_maker/basic.php</span>).
<h4>Personnalisation des lecteurs insérés par un générateur</h4>
<p>Comme pour les lecteurs autonomes, on peut personnaliser un lecteur
inséré par un générateur
en utilisant des attributs de la forme <span class="attribute">data-maxigos-xxx</span> dans la balise
où s'affiche ce lecteur, et modifier l'aspect du lecteur via des feuilles de style
(voir le chapitre <a href="#personnalisation-lecteur-autonome">Personnalisation des lecteurs autonomes</a> pour plus de détails).</p>
<p>Mais on peut en plus modifier le code du générateur, ce qui donne encore plus de possibilités de personnalisation.</p>
<h3>Méthode utilisant un "chargeur" en javascript</h3>
<p>Cette méthode permet de ne pas avoir à insérer le code de maxiGos 
à chaque endroit de la page où doit s'afficher un lecteur,
mais seulement le code du chargeur une fois en fin de page.
Elle est par contre sensiblement plus lente que les précédentes. 
Il est conseillé de ne l'utiliser que si aucune des méthodes précédentes n'est possible.</p>
<p>Un chargeur est un script javascript qui recherche dans la page toutes les balises
où un lecteur doit être affiché et qui charge à la volée pour chacune de ces balises
le script javascript d'un lecteur maxiGos.</p>
<h4>Les lignes à insérer dans vos pages web</h4>
<p>En pratique, on insère dans la page web aux endroits où l'on souhaite afficher un lecteur 
des balises comme <span class="attribute">&lt;div&gt;</span> et <span class="tag">&lt;/div&gt;</span> dont l'un des attributs est <span class="attribute">data-maxigos</span>.
La valeur de cet attribut est le nom de la configuration de maxiGos à employer, suivi d'une virgule,
suivi du thème maxiGos à employer.</p>
<p>On insère ensuite le nom d'un fichier sgf ou un texte représentant du sgf
ou une url pouvant générer du sgf entre ces balises.
<p>On insère enfin le script <span class="jsFile">mgosLoader.js</span>
(qui est le chargeur fourni avec maxiGos) après toutes les balises de la page
dont l'un des attributs est <span class="attribute">data-maxigos</span>.</p>
<p>Par exemple :</p>
<code><pre>&lt;div data-maxigos="Problem,Classic"&gt;
(;FF[4]GM[1]SZ[19]VW[aa:lh]
EV[N° 1 .|. Niveau 1]
FG[1]ST[2]
AW[ab][bb][cb][db][da]
AB[bc][cc][dc][ec][eb][gb][be]
C[À Noir de jouer]
;B[ba]C[Correct !])
&lt;/div&gt;

&lt;div data-maxigos="Problem,Classic"&gt;
(;FF[4]GM[1]SZ[19]VW[aa:lh]
EV[N° 2 .|. Niveau : 1]
AW[da][ea][fb][dc][ec][fc][ad][bd][cd]
AB[ba][cb][db][eb][ac][bc][cc]
C[À Noir de jouer]
;B[ab]C[Correct !])
&lt;/div&gt;

&lt;script src="ppp/_js/mgosLoader.js"&gt;&lt;/script&gt;</pre></code>
<p>Il faut évidemment adapter le chemin (ici "ppp") préfixant le script <span class="jsFile">mgosLoader.js</span>, 
en fonction de l'endroit où vous avez installé maxiGos sur votre site, 
et de l'endroit où se trouve votre page.</p>
<h4>Personnalisation des lecteurs insérés par un chargeur</h4>
<p>Comme pour les lecteurs autonomes, on peut personnaliser un lecteur
inséré par un chargeur
en utilisant des attributs de la forme <span class="attribute">data-maxigos-xxx</span> dans la balise
où s'affiche ce lecteur, et modifier l'aspect du lecteur via des feuilles de style
(voir le chapitre <a href="#personnalisation-lecteur-autonome">Personnalisation des lecteurs autonomes</a> pour plus de détails).</p>
<h2 id="internationalisation">Internationalisation</h2>
<p>Il est possible d'indiquer à MaxiGos dans quelle langue il doit afficher ses textes.</p>
<h3>Quels sont les parties de maxiGos concernés ?</h3>
<p>Il s'agit principalement des messages, des boutons, des menus,
et éventuellement des textes générés par maxiGos à partir des informations contenues dans les sgf (titre, date, résultat, etc.).</p>
<p>Par contre, les commentaires contenus dans les sgf ne sont pas traduits.</p>
<h3>Quelles sont les langues disponibles ?</h3>
<p>Cinq langues sont pour l'instant disponibles (entre parenthèse les codes langues correspondants) :
l'anglais ("en"), le français ("fr"), le japonais ("ja"),
le chinois simplifié ("zh-hans") et le chinois traditionel ("zh-hant").</p>
<h3>Comment maxiGos détermine la langue à employer ?</h3>
<p>Pour déterminer quelle langue doit être utilisée, maxiGos recherche le code langue correspondant
selon la procédure suivante :</p>
<ul>
<li>il recherche la valeur de l'attribut <span class="attribute">data-maxigos-l</span> de sa balise
(ou de la balise dans laquelle doit s'afficher le lecteur en cas d'utilisation d'un chargeur),</li>
<li>si le paramètre <span class="attribute">data-maxigos-l</span> n'a pas été spécifié,
maxiGos recherche la valeur de l'attribut <span class="attribute">lang</span> de sa balise ou l'une de ses balises parentes
(ou de la balise dans laquelle doit s'afficher le lecteur ou l'une de ses balises parentes en cas d'utilisation d'un chargeur),</li>
<li>si aucun attribut <span class="attribute">lang</span> n'est trouvé, maxiGos utilise la langue du navigateur
si elle est spécifiée, ou l'anglais sinon.</li>
</ul>
<h3>Que faire en pratique ?</h3>
<p>En pratique, le plus simple est de spécifier l'attribut <span class="attribute">lang</span> de la balise <span class="tag">&lt;html&gt;</span>
de la page, ou, si la langue de la page est différente de l'une des langues disponibles
pour maxiGos, de spécifier l'attribut <span class="attribute">lang</span> de la balise de maxiGos
(ou de la balise dans laquelle doit s'afficher le lecteur ou l'une de ses balises parentes en cas d'utilisation d'un chargeur).</p>
<p>Par exemple :</p>
<code><pre>&lt;script src="ppp/maxigos-neo-classic-game.js"
	lang="en"&gt;
qqq/blood-vomit-en.sgf
&lt;/script&gt;</pre></code>
<p>Pour une autre langue que le français et l'anglais,
il faut en plus inclure avant tout appel à maxiGos un script d'internationalisation pour cette autre langue.
Par exemple, pour le japonais, il faut inclure le script <span class="jsFile">maxigos-i18n-ja.js</span> qui se trouve dans le dossier "_i18n/" :</p>
<code><pre>&lt;script src="rrr/maxigos-i18n-ja.js"&gt;&lt;/script&gt;
&lt;script src="ppp/maxigos-neo-classic-game.js"
	lang="ja"&gt;
qqq/blood-vomit-ja.sgf
&lt;/script&gt;</pre></code>
<p>Il faut bien sûr remplacer "rrr" par un chemin relatif entre la page web et le dossier où se trouve le script d'internationalisation.</p>
<p>Si vous ne pouvez pas ou ne souhaitez pas à avoir à insérer cette ligne dans chacune de vos pages, vous pouvez simplement
ajouter le code contenu dans le script d'internationalisation correspondant à la langue choisie au début 
du code des lecteurs maxiGos que vous utilisez.</p>
<p>Tous les scripts d'internationalisation fournis avec maxiGos sont dans le dossier "_i18n".
Si le script d'internationalisation dont vous avez besoin n'existe pas encore, vous pouvez essayer de le créer
(inspirez-vous de celui du japonais).</p>
<p class="note">Note : si vous créez un script d'internationalisation, 
c'est une bonne pratique de choisir un code langue qui soit ISO 639 (par exemple "ja" pour japonais et non pas "jp").</p>
<h3>Internationalisation et encodage</h3>
<p>L'internationalisation et l'encodage sont deux notions différentes.</p>
<p>De préférence, il vaut mieux avoir des pages et des fichiers sgf encodés en "UTF-8".
Mais maxiGos peut fonctionner avec des pages qui ne sont pas en "UTF-8",
et lire des sgf qui de même ne sont pas en "UTF-8"
(voir le chapitre <a href="#encodage">Encodage</a> pour plus de détails).</p> 
<h2 id="encodage">Encodage</h2>
<h3>Encodage de la page dans laquelle on souhaite insérer un lecteur maxiGos</h3>
<p>
MaxiGos fait tout en UTF-8, mais la page dans laquelle est inséré un lecteur maxiGos peut être dans n'importe quel encodage.</p>
<p>Si la page dans laquelle est inséré un script maxiGos n'est pas en UTF-8,
il suffit d'ajouter dans sa balise <span class="tag">&lt;script&gt;</span>
l'attribut <span class="attribute">charset</span> avec la valeur "UTF-8". 
Ainsi, le navigateur pourra transformer de manière appropriée
le contenu de ces scripts dans l'encodage de la page.</p>
<p>Il est à noter que lorsqu'on insère directement du sgf dans la page (sans utiliser de fichier sgf donc), 
maxigos ignore la propriété CA de ce sgf puisque de facto, ce sgf a le même encodage que la page et 
non l'encodage indiqué dans sa propriété CA. A priori, on n'a rien de spécial faire dans ce cas, 
car quand on copie du sgf à l'aide d'un logiciel de traitement de texte dans le code d'une page html/php, 
c'est le logiciel de traitement de texte qui fait la conversion appropriée.</p>
<p>Il faut tout de même que l'encodage réel de la page corresponde à l'encodage spécifié
pour cette page d'une manière ou d'une autre.</p>
<p>Par exemple, si la page a été enregistrée en Shift_JIS, il est souhaitable
qu'elle contienne dans sa partie <span class="tag">&lt;head&gt;</span> la ligne :</p>
<code><pre>&lt;meta charset="Shift_JIS"&gt;</pre></code>
<p>Et le code dans la partie <span class="tag">&lt;body&gt;</span>
appelant un script maxiGos pourrait être dans ce cas :</p>
<code><pre>&lt;script src="rrr/maxigos-i18n-ja.js"
	charset="UTF-8"&gt;
&lt;/script&gt;
&lt;script src="ppp/maxigos-neo-classic-game.js"
	lang="ja"
	charset="UTF-8"&gt;
qqq/blood-vomit-ja.sgf
&lt;/script&gt;</pre></code>
<p>Il existe d'autres manières de spécifier l'encodage d'une page
(par exemple via php ou via la configuration du serveur).
L'important est que la spécification corresponde bien à l'encodage réel de la page.</p>

<h3>Encodage des fichiers sgf</h3>
<p>
L'encodage d'un fichier sgf doit être indiqué dans sa propriété CA. 
Et par défaut, quand un fichier sgf n'a pas de propriété "CA", cela signifie qu'il doit être encodé en ISO-8859-1. 
Si la propriété CA est présente dans le fichier sgf, l'encodage réel du fichier doit correspondre 
à la valeur de la propriété CA.
</p>
<p>
MaxiGos utilise cette propriété CA pour déterminer l'encodage du fichier sgf, 
et transforme tout en UTF-8 (il sera donc toujours un peu plus rapide d'utiliser des fichiers sgf en UTF-8). 
Il est de ce fait possible d'utiliser des fichiers sgf d'encodages variés au sein d'une même page.
</p>
<p>Quand l'affichage n'est pas celui attendu, 
c'est le plus souvent dû au fait que le fichier a un encodage réel différent de celui 
qui a été spécifié dans sa propriété CA (faute malheureusement extrêmement courante dans les fichiers sgf d'origine asiatique). 
Pour corriger ce problème, il faut soit modifier la propriété CA du fichier sgf pour que sa valeur corresponde 
à son encodage réel, soit ré-enregistrer le fichier dans l'encodage spécifié 
dans sa propriété CA (on peut faire tout ça avec la plupart des éditeurs de texte, 
le plus difficile étant de déterminer quel est l'encodage réel du fichier).</p>
<p>Ceci étant, bien qu'en théorie maxiGos peut fonctionner dans une page qui n'est pas en "UTF-8", 
et lire des fichiers qui ne sont pas en "UTF-8", 
il vaut mieux quand on le peut tout faire en UTF-8.</p>
<h3>Encodage et internationalisation</h3>
<p>Encodage et internationalisation sont deux choses différentes. "UTF-8" est adapté pour toute(?) langue, 
aussi c'est le meilleur choix quand on peut l'utiliser. Quand cela n'est pas possible, 
attention, car certains encodages peuvent ne pas afficher certains caractères de certaines langues. 
Par exemple, les mots en japonais d'un fichier sgf
en Shift-JIS ne pourront pas être transformés automatiquement et s'afficher correctement dans une page en "ISO-8859-1". 
Par contre, ils pourront être transformés automatiquement et s'afficher correctement dans une page en 'UTF-8".</p>
<p>N'utilisez pas des noms d'encodage tels que "UTF-8", "ISO-8859-1", "Shift-JIS", "Big5", "GB18030" 
comme valeur des attributs <span class="attribute">lang</span> et <span class="attribute">data-maxigos-l</span>.
Utilisez un code langue comme "en", "fr", "ja", zh-hans" ou "zh-hant".</p>
<h3>Diagnostic à effectuer en cas de mauvais affichage (caractères illisibles ou douteux)</h3>
<h4>Vérifier l'encodage du fichier sgf</h4>
<h5>Le fichier sgf n'a pas de propriété CA</h5>
<p>Si le fichier sgf n'a pas de propriété CA,
et si en ouvrant le fichier avec un éditeur de texte, celui-ci détecte un autre encodage 
que "ISO-8859-1", 
 et si l'affichage du contenu dans l'éditeur semble bon (pas de caractère illisble ou douteux),
il devrait suffire d'ajouter dans le fichier sgf après le premier ";" la propriété CA 
avec comme valeur le nom de l'encodage détecté par l'éditeur (par exemple CA[UTF-8]).</p>
<p>Si le fichier sgf n'a pas de propriété CA,
et si l'encodage détecté par l'éditeur est "ISO-8859-1",
et si l'affichage dans l'éditeur semble mauvais (caractères illisibles ou douteux), alors le problème vient bien du fichier sgf.
Le fichier a probablement mal été enregistré par son auteur et retrouver le bon encodage sera plus ou moins facile :
si l'on arrive à retrouver le bon encodage il faudra transformer
(la méthode dépend de ce que l'auteur a fait)
le fichier et l'enregistrer dans cet encodage,
en n'oubliant pas de donner aussi à la propriété CA du fichier sgf le nom de cet encodage.</p>
<p>Si le fichier sgf n'a pas de propriété CA,
et si l'encodage détecté par l'éditeur est "ISO-8859-1",
et si l'affichage dans l'éditeur semble bon, alors le problème ne vient probablement pas du fichier sgf.</p>
<h5>Le fichier sgf a une propriété CA</h5>
<p>Si le fichier sgf a une propriété CA, et si en ouvrant le fichier avec un éditeur de texte, 
celui-ci détecte un autre encodage que celui indiqué par la propriété CA, 
et si l'affichage du contenu dans l'éditeur semble bon (pas de caractère illisible ou douteux)
il devrait suffire de remplacer la valeur de la propriété CA par le nom de l'encodage détecté par l'éditeur.</p>
<p>Si le fichier sgf a une propriété CA, 
et si l'encodage détecté par l'éditeur correspond à celui indiqué dans la propriété CA du fichier sgf, 
et si l'affichage dans l'éditeur semble mauvais (caractères illisibles ou douteux), alors le problème vient bien du fichier sgf.
Le fichier a probablement mal été enregistré par son auteur et retrouver le bon encodage sera plus ou moins facile :
si l'on arrive à retrouver le bon encodage il faudra transformer
(la méthode dépend de ce que l'auteur a fait)
le fichier et l'enregistrer dans cet encodage,
en n'oubliant pas de donner aussi à la propriété CA du fichier sgf le nom de cet encodage.</p>
<p>Si le fichier sgf a une propriété CA, 
et si l'encodage détecté par l'éditeur correspond à celui indiqué dans la propriété CA du fichier sgf, 
et si l'affichage dans l'éditeur semble bon, alors le problème ne vient probablement pas du fichier sgf.</p>
<h4>Vérifier l'encodage de la page</h4>
<p>Si la page n'est pas encodée en "UTF-8", vérifiez que l'encodage employé dans le fichier sgf
peut effectivement être transformé et affichée avec l'encodage de la page.</p>
<p>Si la page n'est pas encodée en "UTF-8", 
vérifiez que vous avez bien un <span>charset="UTF-8"</span> dans la balise
<span class="tag">&lt;script&gt;</span> du lecteur, et
éventuellement dans la balise <span class="tag">&lt;script&gt;</span>
d'un script d'internationalisation de maxiGos.</p>
<p>Si vous avez créé un composant, ou modifié un composant de maxiGos, 
vérifiez que vous l'avez bien enregistré en "UTF-8" 
(attention au copier-coller d'un code source affiché par un navigateur : 
les caractères non latin peuvent y être mal codés).</p>
<p>Sinon, le problème vient probablement d'ailleurs.</p>
<h2 id="parametrage">Paramétrage</h2>
<p>Un lecteur maxiGos est constitué d'un ensemble de composants,
comme par exemple le goban, la barre de navigation, la boite à commentaires, etc.</p>
<p>Le comportement du lecteur et de chacun de ses composants peut être modifié
par des paramètres.</p>
<p>À chaque paramètre correspond un attribut qui peut être ajouté
à la balise du lecteur maxiGos concerné (ou de la balise dans laquelle doit s'afficher le lecteur
en cas d'utilisation d'un chargeur).</p>
<p>Des exemples sont donnés dans le chapitre <a href="#personnalisation-lecteur-autonome">Personnalisation des lecteurs autonomes</a>.</p>
<p>Les paramètres de maxiGos sont regroupés par composant.</p>
<h3>Liste des composants prédéfinies</h3>
<p>Les composants prédéfinis sont :</p>
<ul>
<li><span class="component">About</span> (affiche des informations sur le lecteur),</li>
<li><span class="component">AnimatedStone</span> (déplace les pierres depuis les coins du goban
vers les intersections où elles sont jouées),</li>
<li><span class="component">BackToGame</span> (permet de revenir au coup
le plus proche dans la variation principale du sgf de départ),</li>
<li><span class="component">Cartouche</span> (affiche une boite avec le nom des joueurs, leurs niveaux et le nombre de leurs prisonniers),</li>
<li><span class="component">Comment</span> (boite à commentaire simple, où s'affiche le contenu de la propriété sgf C et éventuellement un contenu généré par le composant <span class="component">Header</span>),</li>
<li><span class="component">Cut</span> (bouton pour supprimer une branche, ne doit pas être utiliser avec le composant <span class="component">Edit</span>),</li>
<li><span class="component">Edit</span> (barre d'outils et fonctions d'édition pour créer ou modifier un fichier sgf, à utiliser avec les composants <span class="component">Info</span>, <span class="component">Menu</span>, etc.),</li>
<li><span class="component">File</span> (fonctions pour créer, ouvrir, fermer, enregistrer ou envoyer par email un fichier sgf, à utiliser avec les composants <span class="component">Sgf</span> et <span class="component">Menu</span>),</li>
<li><span class="component">Goban</span> (goban où s'affiche le contenu des propriétés sgf B, W, AB, AW, AE, LB, MA, CR, SQ, TR, TB, TW, ST, PL, et FG),</li>
<li><span class="component">Goto</span> (fonctions de déplacement pour changer le coup courant, via une barre de déplacement, ou un champ de saisie du numéro du coup, ou en cliquant sur une pierre du goban).</li>
<li><span class="component">Guess</span> (fonction de devinette de l'un des coups suivants, et barre d'affichage du résultat),</li>
<li><span class="component">Header</span> (bouton, et boite d'entête où s'affiche le contenu des propriétés sgf EV, RO, PB, PW, BR, WR, DT, PC, RU, TM, KM, HA, RE, GC, etc.)</li>
<li><span class="component">Help</span> (bouton et boite d'affichage de l'aide, à utiliser avec le composant <span class="component">Edit</span>),</li>
<li><span class="component">Image</span> (boutons pour générer des images png ou svg),</li>
<li><span class="component">Info</span> (formulaire de modification des propriétés sgf EV, RO, DT, PC, PB, PW, BR, WR, KM, HA, RE, GC, AN, CP, SO, US, RU, TM, OT, ON, BT, WT, GN),</li>
<li><span class="component">Lesson</span> (boite à commentaire sous forme de bulle avec un assistant, où s'affiche le contenu des propriétés sgf C, BM, DO, IT et TE),</li>
<li><span class="component">Loop</span> (boutons d'affichage en boucle),</li>
<li><span class="component">Menu</span> (gestionnaire de menu, à utiliser avec au moins l'un des composants suivants : <span class="component">File</span>, <span class="component">Edit</span> et <span class="component">View</span>),</li>
<li><span class="component">MoveInfo</span> (indicateur de la couleur, du numéro, et des coordonnés du dernier coup),</li>
<li><span class="component">Navigation</span> (boutons permettant de naviguer d'un coup à un autre),</li>
<li><span class="component">NotSeen</span> (boite listant les coups numérotés déjà joués qui ne sont plus visibles sur le goban, avec leurs coordonnées)</li>
<li><span class="component">Options</span> (panneau d'options, pour modifier la numérotation, l'affichage d'une marque sur le dernier coup,...),</li>
<li><span class="component">Pass</span> (bouton de passe),</li>
<li><span class="component">Score</span> (bouton pour ajouter ou retirer les marques de territoire, propriétés sgf TB et TW),</li>
<li><span class="component">Sgf</span> (bouton et boite d'affichage du sgf),</li>
<li><span class="component">Solve</span> (boutons "recommencer tout" et "reprendre un coup", et affichage d'une réponse au coup de l'utilisateur, à utiliser pour les rejoueurs de problème),</li>
<li><span class="component">Speed</span> (barre de réglage de la vitesse d'affichage des coups, à utiliser en conjonction avec <span class="component">Loop</span>),</li>
<li><span class="component">Title</span> (titre, où l'on affiche le contenu des propriétés sgf EV et RO),</li>
<li><span class="component">Tree</span> (arbre des coups),</li>
<li><span class="component">Variations</span> (affichage et éventuellement ajout des variations sur le goban ou dans la boite du composant),</li>
<li><span class="component">Version</span> (affichage de la version de maxiGos).</li>
<li><span class="component">View</span> (fonctions pour modifier l'affichage,
à utiliser avec le composant <span class="component">Menu</span>).</li>
</ul>
<h3 id="parametres-generaux">Paramètres généraux</h3>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">allowFileAsSource</span></td>
<td><span class="attribute">data-maxigos-allow-file-as-source</span></td>
<td>S'il vaut 1, maxiGos, maxiGos accepte les fichiers sgf comme source de données.</td>
<td>(0,1)</td>
<td>1</td>
</tr>
<tr>
<td><span class="parameter">allowStringAsSource</span></td>
<td><span class="attribute">data-maxigos-allow-string-as-source</span></td>
<td>S'il vaut 1, maxiGos, maxiGos accepte les chaines de caractères contenant
du sgf comme source de données.</td>
<td>(0,1)</td>
<td>1</td>
</tr>
<tr>
<td><span class="parameter">htmlParenthesis</span></td>
<td><span class="attribute">data-maxigos-html-parenthesis</span></td>
<td>S'il vaut 1, maxiGos remplace les éventuelles "&amp;#40;" et "&amp;#41;" par "(" et ")"
dans le source sgf lorsque celui-ci est un enregistrement sgf inséré entre les balises
de l'élément html où doit s'afficher le lecteur sgf.
Ce paramètre est utile par exemple en cas
d'utilisation de maxiGos dans les forums fonctionnant avec phpBB3 dont l'éditeur remplace
les "(" et ")" par "&amp;#40;" et "&amp;#41;".</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">initMethod</span></td>
<td><span class="attribute">data-maxigos-init-method</span></td>
<td>Action initiale de maxiGos : aller au début du Sgf ("first"), aller à la fin de la variante principale du Sgf ("last"), parcourir en boucle le Sgf ("loop") ou avancer de n noeuds dans l'arbre des coups. On ne peut utiliser "loop" que si
le composant <span class="component">Loop</span> est aussi utilisé par le lecteur.</td>
<td>("first","loop","last")</td>
<td>"first"</td>
</tr>
<tr>
<td><span class="parameter">sgfLoadCoreOnly</span></td>
<td><span class="attribute">data-maxigos-sgf-load-core-only</span></td>
<td>S'il vaut 1, on ne garde que les informations essentielles sur la partie (EV, RO, DT, PC, PB, PW, BR, BW, BT, BW, RU, TM, OT, HA, KM, RE) lors du décodage du sgf.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">sgfLoadMainOnly</span></td>
<td><span class="attribute">data-maxigos-sgf-load-main-only</span></td>
<td>S'il vaut 1, on ne garde que la variante principale lors du décodage du sgf.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">sgfSaveCoreOnly</span></td>
<td><span class="attribute">data-maxigos-sgf-save-core-only</span></td>
<td>S'il vaut 1, on ne garde que les informations essentielles sur la partie (EV, RO, DT, PC, PB, PW, BR, BW, BT, BW, RU, TM, OT, HA, KM, RE) lors de l'encodage du sgf.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">sgfSaveMainOnly</span></td>
<td><span class="attribute">data-maxigos-sgf-load-main-only</span></td>
<td>S'il vaut 1, on ne garde que la variante principale lors de l'encodage du sgf.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">sourceFilter</span></td>
<td><span class="attribute">data-maxigos-source-filter</span></td>
<td>Une expression régulière que doit respecter le nom de la source sgf.
ce paramètre est utile par exemple pour rejeter une source indésirable
insérée par un utilisateur dans un forum.</td>
<td>Une regex</td>
<td>^[^?]+\\.sgf$</td>
</tr>
</table>

<h3>Composant About</h3>
<p>Ce composant affiche un bouton permettant d'afficher une boite
"À propos", qui contient des informations sur le lecteur
(un lien vers le code source, le thème,
la configuration, la licence utilisée, le copyright).</p>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">aboutAlias</span></td>
<td><span class="attribute">data-maxigos-about-alias</span></td>
<td>Indique dans quel élément du tableau de traduction
il faut rechercher ce qui sera affiché sur le bouton "About".<br><br>
S'il vaut null, maxiGos affiche par défaut "À propos" sur le bouton "About".<br><br>
Il est souhaitable que la valeur contienne au moins un "_".
Et si la valeur ne contient que "_", cela signifie afficher une chaine vide.</td>
<td>Une chaine</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">aboutBtnOn</span></td>
<td><span class="attribute">data-maxigos-about-btn-on</span></td>
<td>S'il vaut 1, maxiGos affiche le bouton "About".</td>
<td>(0,1)</td>
<td>0</td>
</tr>
</table>

<h3>Composant AnimatedStone</h3>
<p>Ce composant déplace les pierres depuis les coins du goban
vers les intersections où elles sont jouées.</p>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">animatedStoneOn</span></td>
<td><span class="attribute">data-maxigos-animated-stone-on</span></td>
<td>S'il vaut 1, maxiGos déplace les pierres depuis les coins du goban
vers les intersections où elles sont jouées.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">animatedStoneTime</span></td>
<td><span class="attribute">data-maxigos-animated-stone-time</span></td>
<td>Temps de réference (en milliseconde) utilisé pour calculer le temps que mettra
une pierre pour aller du bol de pierres à son emplacement sur le goban. Le temps réel dépend de la distance entre le point de début et le point de fin de la translation.<br><br>
Sa valeur par défaut est celle du paramètre <span class="parameter">loopTime</span>
si le composant <span class="component">Loop</span> est utilisé,
1000 ms sinon.</td>
<td>Un nombre réel positif</td>
<td>1000</td>
</tr>
</table>

<h3>Composant BackToGame</h3>
<p>Ce composant affiche un bouton permettant à un utilisateur
ayant essayé quelques variantes de revenir au coup
le plus proche dans la variation principale du sgf de départ.</p>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">backToGameAlias</span></td>
<td><span class="attribute">data-maxigos-back-to-game-alias</span></td>
<td>Indique dans quel élément du tableau de traduction
il faut rechercher ce qui sera affiché sur le bouton "BackToGame".<br><br>
S'il vaut null, maxiGos affiche par défaut "Revenir au sgf" sur le bouton "BackToGame".<br><br>
Il est souhaitable que la valeur contienne au moins un "_".
Et si la valeur ne contient que "_", cela signifie afficher une chaine vide.</td>
<td>Une chaine</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">backToGameBtnOn</span></td>
<td><span class="attribute">data-maxigos-back-to-game-btn-on</span></td>
<td>S'il vaut 1, maxiGos affiche le bouton "BackToGame".</td>
<td>(0,1)</td>
<td>0</td>
</tr>
</table>

<h3>Composant Cartouche</h3>
<p>Ce composant affiche un cartouche pour chaque joueur
pouvant contenir selon son paramétrage
une pierre indiquant la couleur du joueur, son nom, son niveau,
le nombre de ses prisonniers et son bol de pierres.</p>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">bowlOn</span></td>
<td><span class="attribute">data-maxigos-bowl-on</span></td>
<td>S'il vaut 1, maxiGos affiche dans le cartouche les bols de pierres.</td>
<td>(0,1)</td>
<td>1</td>
</tr>
<tr>
<td><span class="parameter">cartoucheBoxOn</span></td>
<td><span class="attribute">data-maxigos-cartouche-box-on</span></td>
<td>S'il vaut 1, maxiGos affiche un cartouche pour chaque joueur.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">prisonersOn</span></td>
<td><span class="attribute">data-maxigos-prisoners-on</span></td>
<td>S'il vaut 1, maxiGos affiche dans le cartouche le nombre de prisonniers de chaque joueur.</td>
<td>(0,1)</td>
<td>1</td>
</tr>
<tr>
<td><span class="parameter">shortHeaderOn</span></td>
<td><span class="attribute">data-maxigos-short-header-on</span></td>
<td>S'il vaut 1, maxiGos affiche dans le cartouche une courte entête
contenant pour chaque joueur une pierre indiquant sa couleur,
son nom et son niveau.</td>
<td>(0,1)</td>
<td>1</td>
</tr>
</table>

<h3>Composant Comment</h3>
<p>Ce composant affiche une boite contenant les commentaires
se trouvant dans le sgf.</p>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">allInComment</span></td>
<td><span class="attribute">data-maxigos-all-in-comment</span></td>
<td>S'il vaut 1, la boite à commentaires contient tous les
commentaires depuis le début du sgf jusqu'au noeud courant,
au lieu de ne contenir que le commentaire pour le noeud courant.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">canCommentFocus</span></td>
<td><span class="attribute">data-maxigos-can-comment-focus</span></td>
<td>S'il vaut 1, la boite à commentaire peut prendre le focus
en navigation clavier (utile quand le commentaire courant
ne peut pas être affiché en totalité dans la boite à commentaires
sans barre de défilement).<br><br>
Par contre, si l'on est certain que le commentaire
pourra être affiché en totalité, il faut laisser ce paramètre à 0.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">commentLabelOn</span></td>
<td><span class="attribute">data-maxigos-comment-label-on</span></td>
<td>S'il vaut 1, maxiGos affiche un titre à la boite à commentaire.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">headerInComment</span></td>
<td><span class="attribute">data-maxigos-header-in-comment</span></td>
<td>S'il vaut 1, maxiGos ajoute au commentaire une entête contenant
les informations du sgf (propriétés EV, DT, PC, PB, PW, BR, WR, etc.)<br><br>
Pour que ce paramètre ait un effet, il faut que le composant
<span class="component">Header</span> soit lui aussi présent.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
</table>

<h3>Composant Cut</h3>
<p>Ce composant affiche un bouton permettant 
de couper l'arbre sgf à partir du noeud courant.</p>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">cutAlias</span></td>
<td><span class="attribute">data-maxigos-cut-alias</span></td>
<td>Indique dans quel élément du tableau de traduction
il faut rechercher ce qui sera affiché sur le bouton "Cut".<br><br>
S'il vaut null, maxiGos affiche par défaut "Couper" sur le bouton "Cut".<br><br>
Il est souhaitable que la valeur contienne au moins un "_".
Et si la valeur ne contient que "_", cela signifie afficher une chaine vide.</td>
<td>Une chaine</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">cutBtnOn</span></td>
<td><span class="attribute">data-maxigos-cut-btn-on</span></td>
<td>S'il vaut 1, maxiGos affiche le bouton "Cut".</td>
<td>(0,1)</td>
<td>0</td>
</tr>
</table>
<p>Note : le bouton s'appelle "SimpleCut" et non pas "Cut" pour éviter une éventuelle
confusion avec l'outil "Cut" du composant <span class="component">Edit</span>.</p>

<h3>Composant Edit</h3>
<p>Il contient deux sous-composants : "EditToolBar" et "EditCommentTool".</p>
<p>Ce composant permet de modifier un sgf.
Il affiche une barre d'outils et un éditeur de commentaire.</p>
<p>Il n'a pas de paramètre.</p>

<h3>Composant File</h3>
<p>Ce composant affiche un menu de gestion de fichier ("Nouveau", "Ouvrir", "Enregistrer", etc.)</p>
<p>Il s'utilise avec le composant <span class="component">Menu</span>.</p>
<p>Il n'a pas de paramètre.</p>

<h3>Composant Goban</h3>
<p>Ce composant affiche le goban.
C'est le seul composant qui doit être obligatoirement présent.</p>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">asInBookOn</span></td>
<td><span class="attribute">data-maxigos-as-in-book-on</span></td>
<td>S'il vaut 1, maxiGos affiche les pierres comme dans les livres
(c'est à dire qu'il laisse les prisonniers en place sur le goban).
S'il vaut 0, maxiGos retire les prisonniers du goban.
S'il vaut null, maxiGos recherche dans les propriétés FG du sgf
s'il faut ou non retirer les prisonniers.<br><br>
Cette propriété est essentielle quand on veut afficher des diagrammes ou des kifus.
</td>
<td>(0,1,null)</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">eraseGridUnder</span></td>
<td><span class="attribute">data-maxigos-erase-grid-under</span></td>
<td>S'il vaut 1, maxiGos efface les lignes de la grille sous
les marques et étiquettes.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">gBoxParent</span></td>
<td><span class="attribute">data-maxigos-g-box-parent</span></td>
<td>Indique un nom de boite par dessus laquelle viendront s'afficher
les dialogues générés via une action de l'utilisateur
(pour changer les options, afficher l'aide, etc.)<br><br>
En pratique, cela sert essentiellement à spécifier un ancètre de "Goban"
lorsque "Goban" est trop petit.</td>
<td>chaine</td>
<td>"Goban"</td>
</tr>
<tr>
<td><span class="parameter">gridMargin</span></td>
<td><span class="attribute">data-maxigos-grid-margin</span></td>
<td>Nombre de pixels à ajouter à l'extérieur de la grille.</td>
<td>Un nombre réel</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">gridPadding</span></td>
<td><span class="attribute">data-maxigos-grid-padding</span></td>
<td>Nombre de pixels à ajouter entre le bord de la grille et son contenu.</td>
<td>Un nombre réel</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">gobanMargin</span></td>
<td><span class="attribute">data-maxigos-goban-margin</span></td>
<td>Nombre de pixels à ajouter entre le bord du goban et son conteneur.</td>
<td>Un nombre réel</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">gobanPadding</span></td>
<td><span class="attribute">data-maxigos-goban-padding</span></td>
<td>Nombre de pixels à ajouter entre le bord du goban et la grille du goban.</td>
<td>Un nombre réel</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">in3dOn</span></td>
<td><span class="attribute">data-maxigos-in3d-on</span></td>
<td>S'il vaut 1, maxiGos affiche les pierres et
éventuellement le goban avec un effet 3d.<br><br>
Bien que ce paramètre soit principalement utilisé dans le composant <span class="component">Goban</span>,
il est aussi utilisé par d'autres composants comme
<span class="component">Cartouche</span>,
<span class="component">MoveInfo</span>
et <span class="component">NotSeen</span>.</td>
<td>(0,1)</td>
<td>1</td>
</tr>
<tr>
<td><span class="parameter">indicesOn</span></td>
<td><span class="attribute">data-maxigos-indices-on</span></td>
<td>S'il vaut 1, maxiGos affiche les indices autour
du goban. S'il vaut 0, maxiGos cache les indices autour du goban.
S'il vaut null, maxiGos recherche dans les propriétés FG du sgf
s'il faut ou non afficher les indices.</td>
<td>(0,1,null)</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">japaneseIndicesOn</span></td>
<td><span class="attribute">data-maxigos-japanese-indices-on</span></td>
<td>S'il vaut 1, maxiGos affiche les indices autour
du goban façon japonaise (système dit "iroha").<br><br>
Pour que ce paramètre ait un effet, il faut que <span class="parameter">indicesOn</span> valle 1.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">magicParentNum</span></td>
<td><span class="attribute">data-maxigos-magic-parent-num</span></td>
<td>Ce paramètre n'a d'effet que si <span class="parameter">pointsNumMax</span> n'est pas nul.
Il indique pour quelle boite parente contenant le goban on
doit appliquer une réduction en cas de goban ou de vues partielles de goban
plus petits que le goban de référence. Ce paramètre est rarement nécessaire.</td>
<td>Un entier positif</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">marksAndLabelsOn</span></td>
<td><span class="attribute">data-maxigos-marks-and-labels-on</span></td>
<td>S'il vaut 1, maxiGos affiche les marques et étiquettes sur le goban.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">markOnLastOn</span></td>
<td><span class="attribute">data-maxigos-mark-on-last-on</span></td>
<td>S'il vaut 1, maxiGos affiche une marque sur le dernier coup placé sur le goban.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">numAsMarkOnLastOn</span></td>
<td><span class="attribute">data-maxigos-num-as-mark-on-last-on</span></td>
<td>S'il vaut 1, maxiGos affiche un numéro comme marque
sur le dernier coup placé sur le goban.<br><br>
Pour que ce paramètre ait un effet, il faut que <span class="parameter">markOnLastOn</span> valle 1.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">numberingOn</span></td>
<td><span class="attribute">data-maxigos-numbering-on</span></td>
<td>S'il vaut 2, maxiGos affiche la numérotation des pierres modulo 100.
S'il vaut 1, maxiGos affiche la numérotation des pierres.
S'il vaut 0, maxiGos cache la numérotation des pierres.
S'il vaut null, maxiGos recherche dans les propriétés FG, MN et PM
du sgf comment il faut afficher la numérotation des pierres.</td>
<td>(0,1,2,null)</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">oldJapaneseIndicesOn</span></td>
<td><span class="attribute">data-maxigos-old-japanese-indices-on</span></td>
<td>S'il vaut 1, maxiGos affiche les indices autour
du goban façon japonaise ancienne (avec des kanjis).<br><br>
Pour que ce paramètre ait un effet, il faut que <span class="parameter">indicesOn</span> valle 1.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<tr>
<td><span class="parameter">oldJapaneseNumberingOn</span></td>
<td><span class="attribute">data-maxigos-old-japanese-numbering-on</span></td>
<td>S'il vaut 1, maxiGos affiche la numérotation des pierres de façon japonaise ancienne (avec des kanjis).<br><br>
Pour que ce paramètre ait un effet, il faut que <span class="parameter">numberingOn</span> valle 1.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">pointsNumMax</span></td>
<td><span class="attribute">data-maxigos-points-num-max</span></td>
<td>Ce paramètre est utile lorsque l'on veut afficher dans une même
page des gobans de différentes tailles ou des vues partielles de goban
en conservant le même espacement entre les lignes.
S'il vaut 0, maxiGos se contente d'agrandir le lecteur autant qu'il le peut
quelque soit son nombre d'intersections.
Sinon, maxiGos calcule la taille qu'occuperait un goban de référence ayant <span class="parameter">pointsNumMax</span>
intersections dans sa largeur. Il affiche ensuite les gobans plus petits ou
les vues partielles de goban avec le même espacement entre les intersections
que pour le goban de référence.
Les gobans ou vues partielles de goban ayant plus de <span class="parameter">pointsNumMax</span> intersections
dans leur largeur ne sont pas concernés.</td>
<td>Un entier positif</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">specialStoneOn</span></td>
<td><span class="attribute">data-maxigos-special-stone-on</span></td>
<td>S'il vaut 1, maxiGos affiche des lignes grises courbes
sur les pierres blanches (imitant les pierres en coquillage)
et un reflet différent sur les pierres noires
(imitant les pierres en ardoise).<br><br>
Cet affichage est plus lent que l'affichage normal.<br><br>
Pour que ce paramètre ait un effet, il faut que <span class="parameter">in3dOn</span> valle 1.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">stoneShadowOn</span></td>
<td><span class="attribute">data-maxigos-stone-shadow-on</span></td>
<td>S'il vaut 1, maxiGos affiche une ombre pour les pierres
du goban.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">stretching</span></td>
<td><span class="attribute">data-maxigos-stretching</span></td>
<td>Indique combien de pixels on doit ajouter autour des pierres.
<br><br>
1er nombre : pixels (en coordonnées svg) à ajouter horizontalement pour un goban en 3d.<br>
2e nombre : pixels (en coordonnées svg) à ajouter verticalement pour un goban en 3d.<br>
3e nombre : pixels (en coordonnées svg) à ajouter horizontalement pour un goban en 2d.<br>
4e nombre : pixels (en coordonnées svg) à ajouter verticalement pour un goban en 2d.<br>
</td>
<td>liste de 4 nombres réels</td>
<td>"0,0,1,1"</td>
</tr>
<tr>
<td><span class="parameter">territoryMark</span></td>
<td><span class="attribute">data-maxigos-territory-mark</span></td>
<td>Indique quel type de marque on on emploie pour marquer les territoires
(ces marques sont spécifiées par les propriétés sgf TB et TW).
<br><br>
"MA" : croix<br>
"MS" : pierres miniatures<br>
</td>
<td>("MA","MS")</td>
<td>"MS"</td>
</tr>
</table>

<h3>Composant Goto</h3>
<p>Ce composant affiche d'une part une barre coulissante permettant de se déplacer
rapidement dans l'arbre des coups et d'autre part un champ de saisie d'un numéro
de coup où l'on souhaite se rendre.</p>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">gotoBoxOn</span></td>
<td><span class="attribute">data-maxigos-goto-box-on</span></td>
<td>S'il vaut 1, maxiGos affiche une barre coulissante permettant
une avance ou un recul rapide dans l'arbre des coups.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">gotoInputOn</span></td>
<td><span class="attribute">data-maxigos-goto-input-on</span></td>
<td>S'il vaut 1, maxiGos affiche un champ de saisie dans lequel
on peut saisir le numéro d'un coup que l'on veut afficher.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">gotoInputBefore</span></td>
<td><span class="attribute">data-maxigos-goto-input-before</span></td>
<td>S'il vaut un nom de bouton présent dans la barre de navigation,
maxiGos insère le champ de saisie du numéro du coup courant devant ce bouton.
Sinon, il l'insère en dernier dans la barre de navigation.</td>
<td>Une chaine</td>
<td>""</td>
</tr>
</table>

<h3>Composant Guess</h3>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">guessBoxOn</span></td>
<td><span class="attribute">data-maxigos-guess-box-on</span></td>
<td>S'il vaut 1, maxiGos affiche une barre indiquant si
l'utilisateur est proche ou pas de deviner
l'un des coups suivants.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">canPlaceGuess</span></td>
<td><span class="attribute">data-maxigos-can-place-guess</span></td>
<td>S'il vaut 1, maxiGos place un coup sur une intersection où
l'utilisateur vient de cliquer uniquement s'il est dans le sgf.
S'il vaut 0 et que le paramètre <span class="parameter">canPlaceVariation</span>
vaut 1, il place un coup sur une intersection où
l'utilisateur vient de cliquer
que ce coup soit ou non dans le sgf. Si ces deux paramètres
vallent 0, maxiGos ne place rien sur le goban
suite à un clic de l'utilisateur.<br><br>
Ce paramètre est ignoré si
<span class="parameter">canPlaceVariation</span> vaut 1.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
</table>

<h3>Composant Header</h3>
<p>Ce composant affiche un bouton, et la boite d'entête où s'affiche le contenu
des propriétés sgf EV, RO, PB, PW, BR, WR, DT, PC, RU, TM, KM, HA, RE, GC, etc.</p>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">canHeaderFocus</span></td>
<td><span class="attribute">data-maxigos-can-header-focus</span></td>
<td>S'il vaut 1, la boite à entête peut prendre le focus
en navigation clavier (utile quand l'entête
ne peut pas être affichée en totalité dans sa boite sans barre de défilement).<br><br>
Par contre, si l'on est certain que l'entête
pourra être affiché en totalité, il faut laisser ce paramètre à 0.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">concatDateToTitle</span></td>
<td><span class="attribute">data-maxigos-concat-date-to-title</span></td>
<td>S'il vaut 1, maxiGos affiche la date après le titre.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">concatTeamToPlayer</span></td>
<td><span class="attribute">data-maxigos-concat-team-to-player</span></td>
<td>S'il vaut 1, maxiGos affiche le nom de l'équipe après le nom des joueurs.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">concatKomiToResult</span></td>
<td><span class="attribute">data-maxigos-concat-komi-to-result</span></td>
<td>S'il vaut 1, maxiGos affiche le komi après le résultat.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">concatHandicapToResult</span></td>
<td><span class="attribute">data-maxigos-concat-handicap-to-result</span></td>
<td>S'il vaut 1, maxiGos affiche le handicap après le résultat.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">concatNumOfMovesToResult</span></td>
<td><span class="attribute">data-maxigos-concat-num-of-moves-to-result</span></td>
<td>S'il vaut 1, maxiGos affiche le nombre de coups après le résultat.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">headerAlias</span></td>
<td><span class="attribute">data-maxigos-header-alias</span></td>
<td>Indique dans quel élément du tableau de traduction
il faut rechercher ce qui sera affiché sur le bouton "Header".<br><br>
S'il vaut null, maxiGos affiche par défaut "Entête" sur le bouton "Header".<br><br>
Il est souhaitable que la valeur contienne un "_".
Et si la valeur ne contient que "_", cela signifie afficher une chaine vide.</td>
<td>Une chaine</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">headerBoxOn</span></td>
<td><span class="attribute">data-maxigos-header-box-on</span></td>
<td>S'il vaut 1, maxiGos affiche l'entête du sgf dans la boite du composant 
(contenu des propriétés sgf EV, RO, etc.)<br><br>
S'il vaut 0, l'entête peut quand même être affichée soit à la place du goban
via un click sur le bouton "Informations" qui s'affiche
dans la boite du composant si <span class="parameter">headerBtnOn</span> vaut 1, 
soit dans la boite à commentaire si <span class="parameter">headerInComment</span> vaut 1,
soit les deux.
</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">headerBtnOn</span></td>
<td><span class="attribute">data-maxigos-header-btn-on</span></td>
<td>S'il vaut 1,
maxiGos affiche un bouton "Informations" dans la boite du composant
au lieu d'y afficher l'entête elle-même. 
Un click sur ce bouton affiche l'entête à la place du goban.
Ce paramètre est sans effet si <span class="parameter">headerBoxOn</span> vaut 1.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideBlack</span></td>
<td><span class="attribute">data-maxigos-hide-black</span></td>
<td>S'il vaut 1,
maxiGos n'affiche pas le nom et le niveau de Noir.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideDate</span></td>
<td><span class="attribute">data-maxigos-hide-date</span></td>
<td>S'il vaut 1, maxiGos n'affiche pas la date.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideGeneralComment</span></td>
<td><span class="attribute">data-maxigos-hide-general-comment</span></td>
<td>S'il vaut 1, maxiGos n'affiche pas le commentaire général.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideHandicap</span></td>
<td><span class="attribute">data-maxigos-hide-handicap</span></td>
<td>S'il vaut 1, maxiGos n'affiche pas le handicap.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideKomi</span></td>
<td><span class="attribute">data-maxigos-hide-komi</span></td>
<td>S'il vaut 1, maxiGos n'affiche pas le komi.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideNumOfMoves</span></td>
<td><span class="attribute">data-maxigos-hide-num-of-moves</span></td>
<td>S'il vaut 1, maxiGos n'affiche pas le nombre de coups.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideNumOfMovesLabel</span></td>
<td><span class="attribute">data-maxigos-hide-num-of-moves-label</span></td>
<td>S'il vaut 1, maxiGos n'affiche pas "Nombre de coups :" devant le nombre de coups.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hidePlace</span></td>
<td><span class="attribute">data-maxigos-hide-place</span></td>
<td>S'il vaut 1, maxiGos n'affiche pas le lieu.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideResult</span></td>
<td><span class="attribute">data-maxigos-hide-result</span></td>
<td>S'il vaut 1, maxiGos n'affiche pas le résultat.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideResultLabel</span></td>
<td><span class="attribute">data-maxigos-hide-result-label</span></td>
<td>S'il vaut 1, maxiGos n'affiche pas "Résultat :" devant le résultat.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideRules</span></td>
<td><span class="attribute">data-maxigos-hide-rules</span></td>
<td>S'il vaut 1, maxiGos n'affiche pas le type de règle.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideTimeLimits</span></td>
<td><span class="attribute">data-maxigos-hide-time-limits</span></td>
<td>S'il vaut 1, maxiGos n'affiche pas la durée de la partie.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideTitle</span></td>
<td><span class="attribute">data-maxigos-hide-title</span></td>
<td>S'il vaut 1,
maxiGos n'affiche pas le titre.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideWhite</span></td>
<td><span class="attribute">data-maxigos-hide-white</span></td>
<td>S'il vaut 1,
maxiGos n'affiche pas le nom et le niveau de Blanc.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
</table>
<p>Note 1 : si <span class="parameter">headerBoxOn</span>
et <span class="parameter">headerBtnOn</span> vallent tous les deux 0,
maxiGos n'affiche pas du tout la boite du composant <span class="component">Header</span>.
Mais il pourra toujours afficher le contenu du composant ailleurs comme par exemple
dans la boite du composant <span class="component">Comment</span>
si <span class="parameter">headerInComment</span> vaut 1.</p>
<p>Note 2 : la différence entre le composant <span class="component">Header</span>
et le composant <span class="component">Info</span> est que
le composant <span class="component">Header</span> ne fait qu'afficher les informations
tandis que le composant <span class="component">Info</span> permet de les modifier.</p>

<h3>Composant Help</h3>
<p>Ce composant affiche un bouton permettant 
d'afficher l'aide de l'éditeur sgf.</p>
<p>Il a été conçu pour s'utiliser avec
le composant <span class="component">Edit</span>.</p>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">helpBtnOn</span></td>
<td><span class="attribute">data-maxigos-help-btn-on</span></td>
<td>S'il vaut 1, maxiGos affiche le bouton "Help".</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">helpAlias</span></td>
<td><span class="attribute">data-maxigos-help-alias</span></td>
<td>Indique dans quel élément du tableau de traduction
il faut rechercher ce qui sera affiché sur le bouton "Help".<br><br>
S'il vaut null, maxiGos affiche par défaut "Aide" sur le bouton "Help".<br><br>
Il est souhaitable que la valeur contienne au moins un "_".
Et si la valeur ne contient que "_", cela signifie afficher une chaine vide.</td>
<td>Une chaine</td>
<td>null</td>
</tr>
</table>

<h3>Composant Image</h3>
<p>Ce composant contient deux sous-composants,
qui affichent chacun un bouton permettant 
de fabriquer une image de la position courante du goban
au format PNG pour l'un et SVG pour l'autre.</p>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">pngAlias</span></td>
<td><span class="attribute">data-maxigos-png-alias</span></td>
<td>Indique dans quel élément du tableau de traduction
il faut rechercher ce qui sera affiché sur le bouton "Png".<br><br>
S'il vaut null, maxiGos affiche par défaut "PNG" sur le bouton "Png".<br><br>
Il est souhaitable que la valeur contienne au moins un "_".
Et si la valeur ne contient que "_", cela signifie afficher une chaine vide.</td>
<td>Une chaine</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">pngBtnOn</span></td>
<td><span class="attribute">data-maxigos-png-btn-on</span></td>
<td>S'il vaut 1, maxiGos affiche le bouton "Png".</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">svgAlias</span></td>
<td><span class="attribute">data-maxigos-svg-alias</span></td>
<td>Indique dans quel élément du tableau de traduction
il faut rechercher ce qui sera affiché sur le bouton "Svg".<br><br>
S'il vaut null, maxiGos affiche par défaut "SVG" sur le bouton "Svg".<br><br>
Il est souhaitable que la valeur contienne au moins un "_".
Et si la valeur ne contient que "_", cela signifie afficher une chaine vide.</td>
<td>Une chaine</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">svgBtnOn</span></td>
<td><span class="attribute">data-maxigos-svg-btn-on</span></td>
<td>S'il vaut 1, maxiGos affiche le bouton "Svg".</td>
<td>(0,1)</td>
<td>0</td>
</tr>
</table>

<h3>Composant Info</h3>
<p>Ce composant affiche une boite d'édition
des propriétés d'information du sgf
comme EV, RO, DT, PC, PB, PW, etc.</p>
<p>Il a été conçu pour s'utiliser avec
le composant <span class="component">Edit</span>.</p>
<p>Il n'a pas de paramètre.</p>

<h3>Composant Lesson</h3>
<p>Ce composant affiche un "assistant" qui affiche les commentaires
dans une bulle.</p>
<p>Il n'a pas de paramètre.</p>

<h3>Composant Loop</h3>
<p>Affiche les boutons "Auto" et "Pause" démarrant ou arrêtant un affichage en boucle.</p>
<p>Ces boutons sont affichés dans la barre de navigation.
Pour cela il faut les ajouter à la liste des boutons
spécifiés par le paramètre <span class="parameter">navigations</span>
du composant <span class="composant">Navigation</span>.</p>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">loopTime</span></td>
<td><span class="attribute">data-maxigos-loop-time</span></td>
<td>Temps de référence en milliseconde servant à calculer le temps d'attente
entre deux coups lors d'un affichage en boucle.
Le temps d'attente T est allongé en cas d'affichage
d'un éventuel commentaire de longueur L et se calcule
selon la formule suivante : 
T=L*loopTime/20+loopTime.</td>
<td>Un entier positif</td>
<td>1000</td>
</tr>
<tr>
<td><span class="parameter">initialLoopTime</span></td>
<td><span class="attribute">data-maxigos-loop-time</span></td>
<td>Temps servant à calculer la durée d'affichage de la position initiale.
La durée d'affichage de cette position se calcule par la formule suivante : 
T=initialLoopTime*loopTime/1000.<br><br>
Si ce paramètre est indéfini, on calcule la durée d'affichage de la position initiale
comme pour n'importe quelle autre position.</td>
<td>Un entier positif</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">finalLoopTime</span></td>
<td><span class="attribute">data-maxigos-loop-time</span></td>
<td>Temps servant à calculer la durée d'affichage de la position finale.
La durée d'affichage de cette position se calcule par la formule suivante : 
T=finalLoopTime*loopTime/1000.<br><br>
Si ce paramètre est indéfini, on calcule la durée d'affichage de la position initiale
comme pour n'importe quelle autre position.</td>
<td>Un entier positif</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">mainVariationOnlyLoop</span></td>
<td><span class="attribute">data-maxigos-main-variation-only-loop</span></td>
<td>S'il vaut 1, maxiGos n'affiche que la variante principale.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
</table>

<h3>Composant Menu</h3>
<p>Ce composant affiche une liste de menus.</p>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">menus</span></td>
<td><span class="attribute">data-maxigos-menus</span></td>
<td>Liste des menus affichés par le composant <span class="component">Menu</span>.<br><br>
Les menus disponibles sont
"File" (requiert la présence du composant <span class="component">File</span>),
"Edit" (requiert la présence du composant <span class="component">Edit</span>),
"View" (requiert la présence du composant <span class="component">View</span>)
et "Windows".</td>
<td>Une liste de chaines</td>
<td>""</td>
</tr>
<tr>
<td><span class="parameter">menuTimeout</span></td>
<td><span class="attribute">data-maxigos-menu-timeout</span></td>
<td>Durée en millisecondes pendant laquelle les sous-menus restent visibles.</td>
<td>Un entier positif</td>
<td>10000</td>
</tr>
</table>

<h3>Composant MoveInfo</h3>
<p>Ce composant affiche dans sa boite le numéro du coup courant
et ses coordonnées.</p>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">onlyMoveNumber</span></td>
<td><span class="attribute">data-maxigos-only-move-number</span></td>
<td>S'il vaut 1, seul le numéro de coup est affiché.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
</table>

<h3>Composant Navigation</h3>
<p>Ce composant affiche une barre de navigation.</p>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">navigations</span></td>
<td><span class="attribute">data-maxigos-navigations</span></td>
<td>Liste des boutons affichés par
le composant <span class="component">Navigation</span>.<br><br>
Les boutons possibles sont
"First", "TenPred", "Pred", "Next, "TenNext", "Last", "Auto" et "Pause".<br><br>
"Auto" et "Pause" requiert la présence du composant <span class="component">Loop</span>.</td>
<td>Une liste de chaines</td>
<td>"First,TenPred,Pred,Next,TenNext,Last"</td>
</tr>
</table>

<h3>Composant NotSeen</h3>
<p>Ce composant affiche la liste des coups joués
non visibles sur le goban.</p>
<p>Il est utile quand le paramètre <span class="parameter">asInBookOn</span>
vaut 1.</p>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">notSeenTwinStonesOn</span></td>
<td><span class="attribute">data-maxigos-not-seen-twin-stones-on</span></td>
<td>S'il vaut 1, maxiGos affiche sur quelle pierre un coup est joué
autant que possible.
S'il vaut 0, il affiche les coordonnées du coup.</td>
<td>(0,1)</td>
<td>1</td>
</tr>
</table>

<h3>Composant Option</h3>
<p>Ce composant affiche un dialogue permettant de changer des options.</p>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">hideAnimatedStoneOn</span></td>
<td><span class="attribute">data-maxigos-hide-animated-stone-on</span></td>
<td>S'il vaut 1, maxiGos cache la case permettant de changer
le paramètre <span class="parameter">animatedStoneOn</span>.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideAnimatedStoneTime</span></td>
<td><span class="attribute">data-maxigos-hide-animated-stone-time</span></td>
<td>S'il vaut 1, maxiGos cache le champ permettant de changer
le paramètre <span class="parameter">animatedStoneTime</span>.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideAsInBookOn</span></td>
<td><span class="attribute">data-maxigos-as-in-book-on</span></td>
<td>S'il vaut 1, maxiGos cache la case permettant de changer
le paramètre <span class="parameter">asInBookOn</span>.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideCanGuess</span></td>
<td><span class="attribute">data-maxigos-can-guess</span></td>
<td>S'il vaut 1, maxiGos cache le bouton permettant de changer
le paramètre <span class="parameter">canGuess</span>.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideCanVariation</span></td>
<td><span class="attribute">data-maxigos-can-variation</span></td>
<td>S'il vaut 1, maxiGos cache le bouton permettant de changer
le paramètre <span class="parameter">canVariation</span>.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideIn3dOn</span></td>
<td><span class="attribute">data-maxigos-hide-in3d-on</span></td>
<td>S'il vaut 1, maxiGos cache la case permettant de changer
le paramètre <span class="parameter">in3dOn</span>.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideIndicesOn</span></td>
<td><span class="attribute">data-maxigos-hide-indices-on</span></td>
<td>S'il vaut 1, maxiGos cache la case permettant de changer
le paramètre <span class="parameter">indicesOn</span>.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideLoopTime</span></td>
<td><span class="attribute">data-maxigos-hide-loop-time</span></td>
<td>S'il vaut 1, maxiGos cache le champ permettant de changer
le paramètre <span class="parameter">loopTime</span>.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideMarksAndLabelsOn</span></td>
<td><span class="attribute">data-maxigos-hide-marks-and-labels-on</span></td>
<td>S'il vaut 1, maxiGos cache la case permettant de changer
le paramètre <span class="parameter">marksAndLabelsOn</span>.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideMarkOnLastOn</span></td>
<td><span class="attribute">data-maxigos-hide-mark-on-last-on</span></td>
<td>S'il vaut 1, maxiGos cache la case permettant de changer
le paramètre <span class="parameter">markOnLastOn</span>.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideNumberingOn</span></td>
<td><span class="attribute">data-maxigos-hide-numbering-on</span></td>
<td>S'il vaut 1, maxiGos cache la case permettant de changer
le paramètre <span class="parameter">numberingOn</span>.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideScoreMethod</span></td>
<td><span class="attribute">data-maxigos-hide-score-method</span></td>
<td>S'il vaut 1, maxiGos cache les boutons permettant de changer
le paramètre <span class="parameter">scoreMethod</span>.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideSiblingsOn</span></td>
<td><span class="attribute">data-maxigos-hide-siblings-on</span></td>
<td>S'il vaut 1, maxiGos cache la case permettant de changer
le paramètre <span class="parameter">siblingsOn</span>.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideVariationMarksOn</span></td>
<td><span class="attribute">data-maxigos-hide-variation-marks-on</span></td>
<td>S'il vaut 1, maxiGos cache la case permettant de changer
le paramètre <span class="parameter">variationMarksOn</span>.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">optionAlias</span></td>
<td><span class="attribute">data-maxigos-option-alias</span></td>
<td>Indique dans quel élément du tableau de traduction
il faut rechercher ce qui sera affiché sur le bouton "Option".<br><br>
S'il vaut null, maxiGos affiche par défaut "Options" sur le bouton "Option".<br><br>
Il est souhaitable que la valeur contienne un "_".
Et si la valeur ne contient que "_", cela signifie afficher une chaine vide.</td>
<td>Une chaine</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">optionBoxOn</span></td>
<td><span class="attribute">data-maxigos-option-box-on</span></td>
<td>S'il vaut 1, maxiGos affiche le dialogue des options dans la boite du composant.<br><br>
S'il vaut 0, le dialogue des options peut quand même être affiché à la place du goban
via un click sur le bouton "Option" qui s'affiche
dans la boite du composant si <span class="parameter">optionBtnOn</span> vaut 1.
</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">optionBtnOn</span></td>
<td><span class="attribute">data-maxigos-option-btn-on</span></td>
<td>S'il vaut 1,
maxiGos affiche un bouton "Option" dans la boite du composant
au lieu d'y afficher le dialogue des options. 
Un click sur ce bouton affiche le dialogue des options à la place du goban.
Ce paramètre est sans effet si <span class="parameter">optionBoxOn</span> vaut 1.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
</table>

<h3>Composant Pass</h3>
<p>Ce composant affiche le bouton "Pass".</p>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">canPassOnlyIfPassInSgf</span></td>
<td><span class="attribute">data-maxigos-can-pass-only-if-in-sgf</span></td>
<td>S'il vaut 1, maxiGos n'active le bouton "Pass" que
si l'un des coups suivants dans le sgf est un passe.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">passAlias</span></td>
<td><span class="attribute">data-maxigos-pass-alias</span></td>
<td>Indique dans quel élément du tableau de traduction
il faut rechercher ce qui sera affiché sur le bouton "Pass".<br><br>
S'il vaut null, maxiGos affiche par défaut "Passe" sur le bouton "Pass".<br><br>
Il est souhaitable que la valeur contienne au moins un "_".
Et si la valeur ne contient que "_", cela signifie afficher une chaine vide.</td>
<td>Une chaine</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">passBtnOn</span></td>
<td><span class="attribute">data-maxigos-pass-btn-on</span></td>
<td>S'il vaut 1, maxiGos affiche le bouton "Pass".</td>
<td>(0,1)</td>
<td>0</td>
</tr>
</table>

<h3>Composant Score</h3>
<p>Ce composant affiche un bouton "Score".</p>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">ephemeralScore</span></td>
<td><span class="attribute">data-maxigos-ephemeral-score</span></td>
<td>S'il vaut 1, maxiGos n'enregistre pas dans le SGF les marques TB ou TW
ajoutées via le composant <span class="component">Score</span>.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">scoreAlias</span></td>
<td><span class="attribute">data-maxigos-score-alias</span></td>
<td>Indique dans quel élément du tableau de traduction
il faut rechercher ce qui sera affiché sur le bouton "Score".<br><br>
S'il vaut null, maxiGos affiche par défaut "Score" sur le bouton "Score".<br><br>
Il est souhaitable que la valeur contienne au moins un "_".
Et si la valeur ne contient que "_", cela signifie afficher une chaine vide.</td>
<td>Une chaine</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">scoreBtnOn</span></td>
<td><span class="attribute">data-maxigos-score-btn-on</span></td>
<td>S'il vaut 1, maxiGos affiche le bouton "Score".</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">scoreDefaultRules</span></td>
<td><span class="attribute">data-maxigos-score-default-rules</span></td>
<td>Règle pat défaut si aucune règle n'est trouvée dans le Sgf.</td>
<td>Une chaine (AGA, Chinese, Japanese, etc.)</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">scoreMethod</span></td>
<td><span class="attribute">data-maxigos-score-method</span></td>
<td>Indique quelle méthode est employée pour ajouter/retirer les marques TB et TW :<br><br>
trivial :
un clic sur une pierre y place ou retire un TB ou un TW
de couleur opposée à celle de la pierre.
Un clic sur une intersection inoccupée y ajoute, permute ou retire un TB ou un TW.
<br><br>
counting :
un clic sur une pierre y place ou retire un TB ou un TW
de couleur opposée à celle de la pierre,
ainsi que sur toutes les intersections inoccupées
ou occupées par une pierre de même couleur
voisines de proche en proche de cette pierre.
Un clic sur une intersection inoccupée y place ou retire un TB ou TW
ainsi que sur toutes les intersections inoccupées
voisines de proche en proche de cette intersection,
si ces intersections sont entourées par des pierres de même couleur.
</td>
<td>("trivial","counting")</td>
<td>"trivial"</td>
</tr>
<tr>
<td><span class="parameter">scoreInComment</span></td>
<td><span class="attribute">data-maxigos-score-in-comment</span></td>
<td>S'il vaut 1, maxiGos affiche le score dans une boite de commentaire
s'il y en a une.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
</table>

<h3>Composant Sgf</h3>

<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">sgfAction</span></td>
<td><span class="attribute">data-maxigos-sgf-action</span></td>
<td>Action à effectuer lorsque l'on clique sur le bouton "Sgf".
S'il vaut "Show", le sgf est affiché dans une boite par dessus le goban.
S'il vaut "Download", il est téléchargé
(si toutefois c'est possible avec la machine utilisée).</td>
<td>"Show" ou "Download"</td>
<td>"Show"</td>
</tr>
<tr>
<td><span class="parameter">sgfAlias</span></td>
<td><span class="attribute">data-maxigos-sgf-alias</span></td>
<td>Indique dans quel élément du tableau de traduction
il faut rechercher ce qui sera affiché sur le bouton "Sgf".<br><br>
S'il vaut null, maxiGos affiche par défaut "SGF" sur le bouton "Sgf".<br><br>
Il est souhaitable que la valeur contienne au moins un "_".
Et si la valeur ne contient que "_", cela signifie afficher une chaine vide.</td>
<td>Une chaine</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">sgfBtnOn</span></td>
<td><span class="attribute">data-maxigos-sgf-btn-on</span></td>
<td>S'il vaut 1, maxiGos affiche le bouton "Sgf".</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">toCharset</span></td>
<td><span class="attribute">data-maxigos-to-charset</span></td>
<td>Ce paramètre a comme valeur le code 
d'un encodage ("UTF-8", "Big5", "GB18030", "Shift_JIS" ...).
Il sert uniquement à indiquer dans quel encodage
les fichiers sgf seront enregistrés par maxiGos 
(sa valeur remplaçant la valeur de la propriété CA initiale du sgf).
Il ne sert pas lors de la lecture ou l'affichage d'un sgf
et peut être différent de l'encodage de la page.
En pratique, il est conseillé que sa valeur soit "UTF-8"
ou éventuellement identique à l'encodage de la page.
</td>
<td>Une chaine</td>
<td>"UTF-8"</td>
</tr>
</table>

<h3>Composant Solve</h3>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">canPlaceSolve</span></td>
<td><span class="attribute">data-maxigos-can-place-solve</span></td>
<td>S'il vaut 1, maxiGos place le coup de l'utilisateur s'il est dans le sgf
et répond à ce coup.</td>
<td>(0,1)</td>
<td>1</td>
</tr>
<tr>
<td><span class="parameter">oldSolveBtnOn</span></td>
<td><span class="attribute">data-maxigos-old-solve-btn-on</span></td>
<td>S'il vaut 1, maxiGos affiche le bouton "Retry" comme le bouton "First",
le bouton "Undo" comme le bouton "Pred", et le bouton "Hint"
comme le bouton "Next".</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">solves</span></td>
<td><span class="attribute">data-maxigos-solves</span></td>
<td>Liste des boutons à afficher pour ce composant.<br><br>
4 boutons sont possibles : "Retry", "Undo", "Pass" et "Hint".</td>
<td>Liste de chaines</td>
<td>"Retry,Undo"</td>
</tr>
<tr>
<td><span class="parameter">specialMoveMatch</span></td>
<td><span class="attribute">data-maxigos-special-move-match</span></td>
<td>En théorie, pour représenter un coup joué "ailleurs" (c.a.d. un "tenuki"),
on insère deux coups consécutifs de la couleur opposée dans le sgf.
Cependant, pour des raisons historiques, certains fichiers sgf utilisent
d'autres méthodes pour faire cela, comme insérer un passe,
un coup joué dans la partie invisble du goban,
ou un coup joué en dehors du goban.
Ce paramètre a pour but de gérer cela.<br><br>
S'il vaut 0, maxiGos place un coup de l'utilisateur s'il correspond à une continuation du sgf ou si deux coups consécutifs de la couleur opposée sont trouvés dans le sgf.<br>
S'il vaut 1, maxiGos place un coup de l'utilisateur s'il correspond à une continuation du sgf ou si deux coups consécutifs de la couleur opposée sont trouvés dans le sgf ou si les coordonnées d'une continuation correspond à un coup à l'extérieur du goban (comme B[zz] ou W[zz] pour un 19x19 par exemple).<br>
S'il vaut 2, maxiGos place un coup de l'utilisateur s'il correspond à une continuation du sgf ou si deux coups consécutifs de la couleur opposée sont trouvés dans le sgf ou si les coordonnées d'une continuation correspond à un coup à l'extérieur du goban (comme B[zz] ou W[zz] pour un 19x19 par exemple)
ou à un coup dans la partie invisible du goban (quand une propriété VW est présente).<br>
S'il vaut 3, maxiGos place un coup de l'utilisateur s'il correspond à une continuation du sgf
ou si deux coups consécutifs de la couleur opposée sont trouvés dans le sgf
ou si les coordonnées d'une continuation correspond à un coup à l'extérieur du goban (comme B[zz] ou W[zz] pour un 19x19 par exemple)
ou à un coup dans la partie invisible du goban (quand une propriété VW est présente)
ou à un passe.</td>
<td>(0,1,2,3)</td>
<td>0</td>
</tr>
</table>

<h3>Composant Speed</h3>
<p>Ce composant affiche une barre de réglage
pour modifier la vitesse de placement des coups lors
d'un affichage en boucle.</p>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">loopTimeMax</span></td>
<td><span class="attribute">data-maxigos-loop-time-max</span></td>
<td>Temps d'affichage (en milliseconde) le plus lent entre deux coups.</td>
<td>Un nombre réel positif</td>
<td>10000</td>
</tr>
</table>

<h3>Composant Title</h3>
<p>Ce composant affiche un titre fabriqué à partir des
propriétés sgf EV et RO. Ce titre peut être affiché soit dans la
boite du composant (si le paramètre <span class="parameter">titleBoxOn</span> vaut 1),
soit dans la boite du composant <span class="component">Header</span>
(si ce composant est présent, et qu'il est paramétré pour afficher le titre),
soit dans la boite du composant <span class="component">Comment</span>
(si ce composant est présent, et qu'il est paramétré pour afficher le titre).</p>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">titleBoxOn</span></td>
<td><span class="attribute">data-maxigos-title-box-on</span></td>
<td>S'il vaut 1, le titre est affiché dans la boite du composant.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">translateTitleOn</span></td>
<td><span class="attribute">data-maxigos-translate-title-on</span></td>
<td>S'il vaut 1, maxiGos essaie de traduire le titre,
en utilisant les fonctions se trouvant dans des scripts d'internationalisation
du dossier "_i18n".<br><br>
Le titre est déduit des propriétés sgf EV et RO. 
Pour que la traduction soit efficace, EV doit être de la forme "x t" avec x de la forme
"1st" ou "2nd" ou "3rd" ou "nth", n étant un nombre, 
et t le nom d'un titre comme "Honinbo", "Meijin", "Ing Cup", ...
RO doit être de la forme "n" ou "n (s)", n étant un nombre, 
et s une chaine parmi "final", "semi-final", "quarter-final", "playoff", "round" ou "game".
</td>
<td>(0,1)</td>
<td>0</td>
</tr>
</table>

<h3>Composant Tree</h3>
<p>Ce composant affiche l'arbre des coups dans sa boite.</p>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">canTreeFocus</span></td>
<td><span class="attribute">data-maxigos-can-tree-focus</span></td>
<td>S'il vaut 1, la boite de l'arbre des coups peut prendre le focus
en navigation clavier (utile quand cet arbre
ne peut pas être affiché en totalité dans sa boite
sans barres de défilement).<br><br>
Par contre, si l'on est certain que l'arbre des coups
pourra être affiché en totalité, il faut laisser ce paramètre à 0.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideTreeNumbering</span></td>
<td><span class="attribute">data-maxigos-hide-tree-numbering</span></td>
<td>S'il vaut 1, maxiGos cache les numéros des coups
dans l'arbre des coups.</td>
<td>(0,1)</td>
<td>1</td>
</tr>
<tr>
<td><span class="parameter">markCommentOnTree</span></td>
<td><span class="attribute">data-maxigos-mark-comment-on-tree</span></td>
<td>S'il vaut 1, maxiGos remplace le numéro des coups commentés
par un "?" dans l'arbre des coups.</td>
<td>(0,1)</td>
<td>1</td>
</tr>
<tr>
<td><span class="parameter">treeLabelOn</span></td>
<td><span class="attribute">data-maxigos-tree-label-on</span></td>
<td>S'il vaut 1, maxiGos affiche un titre à la boite de l'arbre des coups.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
</table>

<h3>Composant Variation</h3>
<p>Ce composant permet d'afficher les variations.</p>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">canPlaceVariation</span></td>
<td><span class="attribute">data-maxigos-can-place-variation</span></td>
<td>S'il vaut 1, maxiGos place un coup sur l'intersection 
où vient de clicker l'utilisateur, que ce coup soit ou non dans le sgf.
S'il vaut 0 et que le paramètre <span class="parameter">canPlaceGuess</span>
vaut 1, il place un coup sur l'intersection où vient de clicker l'utilisateur
uniquement s'il est dans le sgf. Si ces deux paramètres
vallent 0, maxiGos ne place rien sur le goban
suite à un clic de l'utilisateur.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">hideSingleVariationMarkOn</span></td>
<td><span class="attribute">data-maxigos-hide-single-variation-marks-on</span></td>
<td>S'il vaut 1, maxiGos n'affiche les marques de variation
que s'il y en a au moins deux.<br><br>
Les marques de variation permettent à l'utilisateur de pouvoir choisir
la variation qu'il veut suivre en cliquant sur l'intersection
où elle se trouve. S'il n'y a qu'une seule variation,
la marque est moins nécessaire, car on est sûr de pouvoir aller
au coup suivant à l'aide des boutons de navigation.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">siblingsOn</span></td>
<td><span class="attribute">data-maxigos-siblings-on</span></td>
<td>S'il vaut 1, maxiGos affiche les alternatives au coup courant.
S'il vaut 0, il affiche les variations du coup suivant.
S'il vaut null, il utilise la valeur ST du sgf pour
déterminer ce qu'il doit afficher.</td>
<td>(0,1,null)</td>
<td>null</td>
</tr>
<tr>
<td><span class="parameter">variationBoxOn</span></td>
<td><span class="attribute">data-maxigos-variation-box-on</span></td>
<td>S'il vaut 1, maxiGos affiche une boite avec 
une liste de boutons permettant de sélectionner une variation.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
<tr>
<td><span class="parameter">variationMarkSeed</span></td>
<td><span class="attribute">data-maxigos-variation-mark-seed</span></td>
<td>Par défaut, maxiGos génère automatiquement une marque sur les variations
en commençant par "1".
L'utilisation de nombres permet d'éviter de confondre ces marques
avec les marques explicitement placés par les commentateurs
qui sont en général des lettres. 
Pour remplacer ces marques par autre chose,
on peut donner une liste de chaines comme valeur de ce paramètre.<br><br>
Par exemple, pour utiliser des hiraganas comme marques,
on peut donner à ce paramètre la valeur
"あ,い,う,え,お,か,き,く,け,こ,た,ち,つ,て,と,さ,し,す,せ,そ".<br><br>
Quelque soit la valeur de ce paramètre,
si le commentateur a explicitement placé une marque
sur l'intersection concernée, c'est cette marque qui sera affichée
et non pas la marque générée automatiquement par maxiGos.<br><br>
Enfin, pour que ces marques soient effectivement affichées,
il faut bien évidemment que la valeur de la propriété ST dans les fichiers sgf 
ou la valeur des paramètres <span class="parameter">variationMarksOn</span>
et <span class="parameter">hideSingleVariationMarkOn</span> le permettent.
</td>
<td>Une liste de caractères quelconques</td>
<td>"1"</td></tr>
<tr>
<td><span class="parameter">variationMarksOn</span></td>
<td><span class="attribute">data-maxigos-variation-marks-on</span></td>
<td>S'il vaut 1, maxiGos affiche une marque (par défaut un numéro de variante)
sur les intersections où une variation est présente dans le sgf.
S'il vaut 0, il n'en n'affiche pas. Et s'il vaut null,
il utilise la valeur de la propriété sgf ST pour déterminer
s'il doit ou pas afficher ces marques.</td>
<td>(0,1,null)</td>
<td>null</td>
</tr>
</table>

<h3>Composant Version</h3>
<p>Ce composant affiche la version de maxiGos dans sa boite.</p>
<table class="params">
<tr>
<th>Paramètre</th>
<th>Attribut</th>
<th>Description</th>
<th>Valeurs possibles</th>
<th>Valeur par défaut</th>
</tr>
<tr>
<td><span class="parameter">versionBoxOn</span></td>
<td><span class="attribute">data-maxigos-version-box-on</span></td>
<td>S'il vaut 1, la version de maxiGos est affichée dans la boite
du composant.</td>
<td>(0,1)</td>
<td>0</td>
</tr>
</table>

<h3>Composant View</h3>
<p>Ce composant affiche un menu de modification de l'affichage
("2d/3d", "Étirement", "Ombre", "Couleurs", "Agrandir", "Normal", "Réduire").</p>
<p>Il s'utilise avec le composant <span class="component">Menu</span>.</p>
<p>Il n'a pas de paramètre.</p>

<h2 id="style">Balises et classes css utilisées par maxiGos</h2>
<h3>Généralités</h3>
<p>Chaque thème a sa feuille de style qui se trouve dans le dossier "_css" des exemples.</p> 
<p>Cette feuille de style est inclue automatiquement dans la page par maxiGos.</p>
<p>Dans le cas des lecteurs autonomes, elle est déjà incluse dans le code des lecteurs
(on n'a donc pas besoin de la télécharger puis de la téléverser dans le site en ligne),
tandis que dans le cas des générateurs, elle est incluse dans le code des lecteurs
à la volée (on a donc besoin de l'avoir téléchargée puis de la téléverser dans le site
en ligne).</p>
<p>Dans tous les cas, on n'a pas besoin de la déclarer explicitement
dans la partie <span class="tag">&lt;head&gt;</span> de la page
(puisque c'est maxiGos qui s'en charge).
Par contre, on peut si on le souhaite faire des modifications de style en rajoutant
dans les feuilles de style de la page les instructions css appropriées.</p>
<p>La plupart des balises html de maxiGos ont été définies avec une classe et un id.
Cela permet de facilement modifier leur style.<p>
<p>On a comme balises :</p>
<ul>
<li>un <span class="tag">&lt;div&gt;</span> global,</li>
<li>un <span class="tag">&lt;div&gt;</span> encapsulant
chaque composant ayant sa propre boite d'affichage
(sauf pour le composant <span class="component">Title</span>
qui est encapsulé dans un <span class="tag">&lt;h1&gt;</span>),</li>
<li>des balises variées pour les éléments internes des composants,</li>
<li>et enfin des <span class="tag">&lt;div&gt;</span> regroupant d'autres boites.</li>
</ul>
<p>Chaque lecteur a un identifiant qui commence par "d" suivi d'un nombre
(1 pour le 1er lecteur maxiGos apparaissant dans une page, 2 pour le 2e, etc.)</p>
<p>Chaque identifiant de balise encapsulant un composant est préfixé par l'identifiant
de son lecteur, suivi du nom du composant, et suffixé par le nom de la balise.
Par exemple, l'identifiant pour le <span class="tag">&lt;div&gt;</span> encapsulant
le composant <span class="component">Goban</span> du troisième lecteur maxiGos
apparaissant dans une page est "d3GobanDiv".</p>
<p>Chaque classe est préfixée par "mx" au lieu de l'identifiant du lecteur.
Par exemple, la classe du <span class="tag">&lt;div&gt;</span> encapsulant
le composant <span class="component">Goban</span> est "mxGobanDiv".</p>
<p>Le <span class="tag">&lt;div&gt;</span> global a pour nom "GlobalBox". Son identifiant
est donc l'identifiant du lecteur suivi de "GlobalBox" suivi de "Div". Sa
classe est "mxGlobalBoxDiv". Pour le 3e lecteur maxiGos apparaissant dans une page,
le lecteur produira donc comme html :</p> 
<code><pre>&lt;div class="mxGlobalBoxDiv" id="d3GlobalBoxDiv"&gt;...&lt;/div&gt;</pre></code>
<p>Le lecteur ajoute éventuellement d'autres classes selon les besoins.</p>
<p>Le lecteur ajoute au <span class="tag">&lt;div&gt;</span> global la classe
"mx" + nom du thème + "Theme" (par exemple "mxClassicTheme" pour le thème <span class="theme">Classic</span>).</p>
<p>Le lecteur ajoute au <span class="tag">&lt;div&gt;</span> global la classe
"mx" + nom de la configuration + "Config" (par exemple "mxProblemConfig" pour la configuration <span class="config">Problem</span>).</p>
<p>Si on a un affichage en 3d (c'est à dire que 
le paramètre <span class="parameter">In3dOn</span> vaut 1),
le lecteur ajoute au <span class="tag">&lt;div&gt;</span> global la classe "mxIn3d",
sinon le lecteur ajoute la classe "mxIn2d".</p>
<p>Les <span class="tag">&lt;div&gt;</span> des boites de regroupement
n'ont pas d'identifiant. Par contre, elles ont plusieurs classes
de la forme "mx" + nom d'un composant + ("Parent" ou "GrandParent" ou "GreatGrandParent" ou "GreatGreatGrandParent" etc.)+"Div"
(autant de classes qu'elles contiennent de composants).</p>
<p>À l'intérieur de certains composants, on a d'autres balises 
dont beaucoup ont aussi des classes ou des ids, mais c'est moins systématique</p>
<h3>Liste de balises et classes css utilisées par maxiGos</h3>
<p>Voici à titre indicatif une liste de balises que l'on peut styler et le nom des classes associées :</p>

<section class="classList">

<h4> Boite globale</h4>
<div>div.mxGlobalBoxDiv,</div> 
<div>div.mx + nom de theme + Theme,</div>
<div>div.mx + nom de configuration + Config,</div>
<div>div.mxIn3d ou div.mxIn2d selon la valeur du paramètre <span class="parameter">in3dOn</span>.</div>
<h4> Boites de regroupement</h4>
<div>div.mx + nom de composant + ParentDiv</div>
<div>div.mx + nom de composant + GrandParentDiv</div>
<div>div.mx + nom de composant + GreatGrandParentDiv</div>
<div>div.mx + nom de composant + GreatGreatGrandParentDiv</div>
<div>...</div>

<h4> Boites des composants et éléments internes (liste non exhaustive)</h4>

<div>div.mxAboutDiv
	<div>button.mxBtn span (si <span class="parameter">aboutBtnOn</span> vaut 1)</div>
</div>

<div>div.mxBackToMainDiv
	<div>button.mxBtn span (si <span class="parameter">backToMainBtnOn</span> vaut 1)</div>
</div>

<div>div.mxCommentDiv
	<div>div.mxCommentContentDiv
		<div>span.mxMoveNumberSpan (si <span class="parameter">allInComment</span> vaut 1)</div>
		<div>Balises du composant <span class="component">Header</span> (si <span class="parameter">headerInComment</span> vaut 1)</div>
	</div>
</div>

<div>div.mxCommentLabelDiv (si <span class="parameter">commentLabelOn</span> vaut 1)</div>

<div>div.mxCutDiv
	<div>button.mxBtn span (si <span class="parameter">cutBtnOn</span> vaut 1)</div>
</div>

<div>div.mxEditToolBarDiv (dans le composant <span class="component">Edit</span>)
	<div>button svg, et input + (.mxUnselectedEditTool ou .mxSelectedEditTool)</div>
</div>

<div>div.mxEditCommentToolDiv (dans le composant <span class="component">Edit</span>)
	<div>textarea</div>
</div>

<div>div.mxGobanDiv
	<div>div.mxInnerGobanDiv
		<div>svg (pour dessiner le goban)
			<div>Balises internes au svg</div>
		</div>
	</div>
</div>

<div>div.mxGotoDiv svg</div>

<div>div.mxGuessDiv svg</div>

<div>div.mxHeaderDiv
	<div>button.mxBtn span (si <span class="parameter">headerBtnOn</span> vaut 1)</div>
	<div>div.mxShowContentDiv h1 (si <span class="parameter">headerBoxOn</span> vaut 1)</div>
	<div>div.mxShowContentDiv div.mxP span.mxHeaderSpan (si <span class="parameter">headerBoxOn</span> vaut 1)</div>
</div>

<div>div.mxHelpDiv
	<div>button.mxBtn span (si <span class="parameter">helpBtnOn</span> vaut 1)</div>
</div>

<div>div.mxLessonDiv+(.mxBM, .mxDO, .mxIT, .mxTE ou rien)
	<div>div.mxBalloonDiv div.mxBalloonContentDiv</div>
	<div>img.mxAssistantImg</div>
</div>

<div>div.mxMenuDiv
	<div>div.mxOneMenuDiv
		<div>button span</div>
	</div>
	<div>div.mxSubMenuDiv
		<div>button span</div>
	</div>
</div>

<div>div.mxMoveInfoDiv svg</div>
	
<div>div.mxNavigationDiv
	<div>button.mxBtn span svg</div>
	<div>input (type=text), inséré par le composant <span class="component">Goto</span>
	pour afficher ou saisir un numéro de coup</div>
</div>

<div>div.mxNotSeenDiv
	<div>div.mxInnerNotSeenDiv svg</div>
</div>

<div>div.mxOptionsDiv
	<div>button span (si <span class="parameter">optionBtnOn</span> vaut 1)</div>
	<div>h1 (si <span class="parameter">optionBoxOn</span> vaut 1)</div>
	<div>div.mxP input (si <span class="parameter">optionBoxOn</span> vaut 1)</div>
	<div>div.mxP label (si <span class="parameter">optionBoxOn</span> vaut 1)</div>
</div>

<div>div.mxPassDiv
	<div>button.mxPassBtn span (si <span class="parameter">passBtnOn</span> vaut 1)</div>
	<div>button.mxJustPlayedPassBtn span</div>
	<div>button.mxOnVariationPassBtn span</div>
	<div>button.mxOnFocusPassBtn span</div>
</div>

<div>div.mxPngDiv (dans le composant <span class="component">Image</span>)
	<div>button.mxBtn span (si <span class="parameter">pngBtnOn</span> vaut 1)</div>
</div>

<div>div.mxScoreDiv
	<div>button.mxBtn span (si <span class="parameter">scoreBtnOn</span> vaut 1)</div>
</div>

<div>div.mxSgfDiv
	<div>button.mxBtn span (si <span class="parameter">sgfBtnOn</span> vaut 1)</div>
</div>

<div>div.mxSolveDiv
	<div>button.mxBtn span svg</div>
</div>

<div>div.mxSpeedDiv
	<div>button.mxSpeedPlusBtn, le "+"</div>
	<div>div.mxSpeedBarDiv svg, la barre de réglage et le curseur</div>
	<div>button.mxSpeedMinusBtn, le "-"</div>
</div>

<div>div.mxSvgDiv (dans le composant <span class="component">Image</span>)
	<div>button span (si <span class="parameter">svgBtnOn</span> vaut 1)</div>
</div>

<div>h1.mxTitleH1</div>

<div>div.mxTreeDiv
	<div>div.mxTreeContentDiv
		<div>svg</div>
	</div>
</div>

<div>div.mxTreeLabelDiv (si <span class="parameter">treeLabelOn</span> vaut 1)</div>
	
<div>div.mxVersionDiv span</div>

<p>Attention : certains composants
(<span class="component">AnimatedStone</span>, <span class="component">File</span>,
<span class="component">Info</span>, <span class="component">Loop</span>,
<span class="component">View</span>, etc.) 
n'ont pas de boite.</p>

<h4> Boites popup éventuellement affichées par dessus une autre boite</h4>
<p>Par défaut, ces boites s'affichent par dessus la boite div.mxGobanDiv.
Il est possible de modifier ce comportement en utilisant le paramètre
<span class="parameter">gBoxParent</span>.</p>

<div>div.mxGBoxDiv.mxColorsDiv
	<div>div.mxShowContentDiv
		<div>h1</div>
		<div>div.mxP
			<div>label</div>
			<div>input</div>
		</div>
	</div>
	<div>div.mxOKDiv button span</div>
</div>

<div>div.mxGBoxDiv.mxNewDiv
	<div>div.mxShowContentDiv
		<div>h1</div>
		<div>div.mxP
			<div>label</div>
			<div>input</div>
		</div>
	</div>
	<div>div.mxOKDiv button span</div>
</div>
	
<div>div.mxGBoxDiv.mxNumberingDiv
	<div>div.mxShowContentDiv
		<div>h1</div>
		<div>div.mxP
			<div>label</div>
			<div>input</div>
		</div>
	</div>
	<div>div.mxOKDiv button span</div>
</div>

<div>div.mxGBoxDiv.mxOpenDiv
	<div>div.mxShowContentDiv
		<div>h1</div>
		<div>div.mxP
			<div>label</div>
			<div>input</div>
		</div>
	</div>
	<div>div.mxOKDiv button span</div>
</div>

<div>div.mxGBoxDiv.mxSaveDiv
	<div>div.mxShowContentDiv
		<div>h1</div>
		<div>div.mxP
			<div>label</div>
			<div>input</div>
		</div>
	</div>
	<div>div.mxOKDiv button span</div>
</div>

<div>div.mxGBoxDiv.mxSendDiv
	<div>div.mxShowContentDiv
		<div>h1</div>
		<div>div.mxP
			<div>label</div>
			<div>input</div>
		</div>
	</div>
	<div>div.mxOKDiv button span</div>
</div>

<div>div.mxShowHeaderDiv
	<div>div.mxShowContentDiv
		<div>h1</div>
		<div>div.mxP span.mxHeaderSpan</div>
	</div>
	<div>div.mxOKDiv button span</div>
</div>

<div>div.mxShowHelpDiv
	<div>div.mxShowContentDiv
		<div>h1,h2,h3</div>
		<div>div.mxP</div>
	</div>
	<div>div.mxOKDiv button span</div>
</div>

<div>div.mxShowInfoDiv
	<div>div.mxShowContentDiv
		<div>div.mxInfoPageMenuDiv button.mxInfoPageBtn</div>
		<div>div.mxInfoPageMenuDiv button.mxInfoSelectedPageBtn</div>
		<div>div.mxInfoPageDiv
			<div>label</div>
			<div>input</div>
			<div>textarea</div>
		</div>
	</div>
	<div>div.mxOKDiv button span</div>
</div>

<div>div.mxShowOptionDiv
	<div>div.mxShowContentDiv
		<div>h1</div>
		<div>div.mxP
			<div>label</div>
			<div>input</div>
		</div>
	</div>
	<div>div.mxOKDiv button span</div>
</div>

<div>div.mxShowPngDiv
	<div>div.mxShowContentDiv
		<div>img</div>
	</div>
	<div>div.mxOKDiv button span</div>
</div>

<div>div.mxShowSgfDiv
	<div>div.mxShowContentDiv
		<div>div.mxP (si <span class="parameter">allowEditSgf</span> vaut 0)</div>
		<div>textarea (si <span class="parameter">allowEditSgf</span> vaut 1)</div>
	</div>
	<div>div.mxOKDiv button span</div>
</div>

<div>div.mxShowSvgDiv
	<div>div.mxShowContentDiv
		<div>img</div>
	</div>
	<div>div.mxOKDiv button span</div>
</div>

</section>
<h3>Quelques précisions sur le fonctionnement des composants</h3>

<p>Certains composants ont des fonctionnements particuliers qui nécessitent de prendre quelques précautions d'emploi.</p>

<h4>Le composant <span class="component">Edit</span></h4>
<p>Il est divisé en deux boites : une boite div.mxEditToolBarDiv (boite de la barre d'outils), 
et une boite div.mxCommentToolDiv (boite de saisie des commentaires).</p>
<p>La boite div.mxEditToolBarDiv contient des balises internes de différents types (button canvas, button img, button span et input).
Suivant qu'ils sont ou pas sélectionnés par l'utilisateur, 
maxiGos donne à ces tags la classe .mxSelectedEditTool ou .mxUnselectedEditTool.</p>
<p>La boite div.mxEditCommentToolDiv contient un textarea. On peut les styler tous les deux comme on voudra.</p>
<p>Lors de l'affichage d'une fenêtre d'aide ou autre à la place du goban, maxiGos modifie l'opacité (propriétés css "opacity") 
de tous les outils sauf celui qui a éventuellement permis l'affichage de cette fenêtre.</p>
<h4>Le composant <span class="component">Goban</span></h4>
<p>Sa boite principale div.mxGobanDiv contient une boite interne div.mxInnerGobanDiv qui contient un svg
dans lequel est dessiné le goban.</p>
<p>Comme une valeur d'attribut modifiée via css sur un élément svg
a la priorité sur les valeurs des attributs des balises des éléments svg,
on peut modifier beaucoup de ces valeurs dans le css.</p>
<p>Si l'on veut qu'une boite popup comme .mxNumberingDiv, .mxNewDiv, .mxOpenDiv, ... vienne 
s'afficher à la place du goban, maxiGos donne à div.mxGobanDiv
(ou la boite définie par le paramètre gBoxParent)
la propriété css "position:relative;".</p>
<h4>Le composant <span class="component">Image</span></h4>
<p>Il est divisé en 2 boites : une pour le bouton "PNG", et une pour le bouton "SVG".</p>
<h4>Le composant <span class="component">Info</span></h4>
<p>Il affiche la boite div.mxInfoContentDiv qui contient elle-même trois boites : 
une boite div.mxInfoPageMenuDiv et des boites div.mxInfoPageDiv.</p>
<p>La boite div.mxInfoPageMenuDiv contient deux boutons.
Quand l'utilisateur clique sur l'un de ces deux boutons pour 
sélectionner une page, maxiGos change la classe des boutons du menu
en .mxInfoSelectedPageBtn ou .mxInfoPageBtn
selon que la page correspondante est affichée ou pas.</p>
<p>Chaque page div.mxInfoPageDiv contient une série de label+champ. 
Chaque label a une classe ayant pour nom ".m" suivi du nom de la propriété sgf à laquelle 
ils correspondent (par exemple, .mxEV pour la propriété sgf EV).
Chaque champ dans le cas général est un input text qui a une classe ayant pour nom ".m" suivi du nom 
de la propriété sgf à laquelle ils correspondent (par exemple, .mxEV pour la propriété sgf EV). 
Pour la propriété RE (le résultat de la partie), on a trois champs au lieu d'un seul qui ont pour 
classe .mxWN (champ de type select pour choisir le gagnant), 
.mxHW (champ de type select pour choisir le type de victoire) et .mxSC (input text pour le score). 
Pour la propriété GC, le champ est un textarea.</p>
<p>Si maxiGos juge que la saisie dans l'un des champs d'une page div.mxInfoPageDiv est incorrecte, 
il ajoute à ce champ la classe .mxBadInput (attention : les vérifications faites par maxiGos sont 
très approximatives).</p>
<h4>Le composant <span class="component">Pass</span></h4>
<p>Il ne contient qu'une balise interne : button.</p>
<p>Ce bouton a pour classes .mxBtn et .mxPassBtn,
mais on lui ajoute d'autres classes en fonction des 
circonstances :</p>
<ul>
<li>MaxiGos ajoute .mxJustPlayedPassBtn si le coup qui vient d'être placé est un passe,</li>
<li>MaxiGos ajoute .mxOnVariationPassBtn si l'un des coups possibles (suivants ou alternatifs selon le valeur de style) est un passe,</li>
<li>MaxiGos ajoute .mxOnFocusPassBtn si le coup qui va être joué est un passe.</li>
</ul>
<p>Gràce à ce mécanisme, on peut définir dans un fichier css quel aspect devra avoir le bouton en fonction de la situation.</p>
<h4>Le composant <span class="component">Lesson</span></h4>
<p>Sa boite principale est div.mxLessonDiv et contient une boite div.mxBalloonDiv (bulle à commentaire),
et une image img.mxAssistantImg qui représente l'assistant.</p>
<h4>Le composant <span class="component">Menu</span></h4>
<p>Sa boite principale contient une série de couples de boites (div.mxOneMenuDiv, div.mxSubMenuDiv)
correpondant chacun à un menu. La boite div.mxOneMenuDiv, toujours visible, contient un seul bouton 
qui est le titre du menu. La boite div.mxSubMenuDiv, initialement cachée (via un "display:none"), 
contient une série de boutons, chaque bouton correspondant à un choix possible du menu.</p>
<p>Quand l'utilisateur clique sur le bouton d'un div.mxOneMenuDiv, 
le div.mxSubMenuDiv correspondant devient visible (via un "display:block").</p>
<p>La boite div.mxSubMenuDiv sera à nouveau cachée par maxiGos (via un "display:none") si l'utilisateur a fait un choix 
en cliquant sur l'un des boutons que cette boite contient, ou si l'utilisateur clique
sur le bouton de la boite div.mxOneMenuDiv associée, ou si l'utilisateur clique ailleurs, 
ou si aucun choix n'est effectué au bout de quelques secondes.</p>

<h4>Le composant <span class="component">Navigation</span></h4>
<p>Les boutons de navigation sont de type button (&lt;button&gt;&lt;span&gt;&lt;svg&gt;...&lt;/svg&gt;&lt;/span&gt;&lt;/button&gt;).</p>

<h4>Le composant <span class="component">Solve</span></h4>
<p>Lorsque ce composant est utilisé avec le composant
<span class="component">Comment</span>, il peut générer automatiquement
des messages en fonction de la situation :</p>
<ul>
<li>"_initialMessage_"
<p>Texte affiché dans la boite de commentaire 
s'il n'y a pas de propriété C dans le sgf pour le noeud courant
et si c'est la position initiale qui est affichée.</p>
</li>
<li>"_nowhereMessage_"
<p>Texte affiché dans la fenêtre de commentaire 
si l'utilisateur clique sur une intersection
et qu'aucun coup n'y est prévu dans le sgf.</p>
</li>
<li>"_endMessage_"
<p>Texte affiché dans la fenêtre de commentaire 
si l'utilisateur clique sur le goban alors
qu'il n'y a pas de suite prévue dans le sgf.</p>
</li>
<li>"_forbiddenMessage_"
<p>Texte affiché dans la fenêtre de commentaire 
si l'utilisateur essaie de jouer un coup interdit par la règle (intersection déjà occupée, suicide et simple ko uniquement).</p>
</li>
<li>"_failMessage_"
<p>Texte affiché dans la fenêtre de commentaire 
s'il n'y a pas de propriété C dans le sgf pour le noeud courant
et si le coup joué est le dernier de sa branche et de la couleur jouée par maxiGos. 
Si pour une raison ou une autre, on ne souhaite pas voir ce message pour un coup donné, il suffit d'ajouter dans le sgf un commentaire pour ce coup.</p>
</li>
<li>"_successMessage_"
<p>Texte affiché dans la fenêtre de commentaire 
s'il n'y a pas de propriété C dans le sgf pour le noeud courant
et si le coup joué est le dernier de sa branche et de la couleur jouée par l'utilisateur. 
Si pour une raison ou une autre, on ne souhaite pas voir ce message pour un coup donné, il suffit d'ajouter dans le sgf un commentaire pour ce coup.</p>
</li>
</ul>
<p>Pour connaitre les libellés de ces messages pour
l'anglais et le français, voir le début du script "mgosSolve.js".</p>
<p>Pour les autres langues, voir les scripts d'internationalisation
dans le dossier "_i18n".</p>

<h4>Le composant <span class="component">Tree</span></h4>
<p>Lors de l'affichage d'une fenêtre d'aide ou autre à la place du goban,
maxiGos modifie l'opacité (propriété css "opacity") de div.mxTreeDiv.</p>

<h3>Styles et classes modifiés par maxiGos</h3>
<p>Voici en résumé la liste des styles et classes que maxiGos modifie ou impose via des instructions javascript.</p>
<h4>Styles modifés dans le code javascript (liste non limitative)</h4>
<ul>
<li>Composant Edit
<ul>
<li>"display" de #dnFigureOrNot1P et #dnFigureOrNot2P.</li>
</ul>
<li>Composant Goban
<ul>
</li>
<li>"position" de div.mxGobanDiv (ou d'un autre boite
selon la valeur du paramètre
<span class="parameter">gBoxParent</span>)
<li>"width" de div.mxInnerGobanDiv (ou de l'un de ses parents
selon la valeur du paramètre
<span class="parameter">magicParentNum</span>).</li>
<li>"visibility" de div.mxInnerGobanDiv (transitoirement,
pour signaler à l'utilisateur une action impossible).</li>
</ul>
<li>
<li>Composant Info
<ul>
<li>"display" des div.mxInfoPageDiv.</li>
</ul>
</li>
<li>Composant Loop
<ul>
<li>"display" de button.mxAutoBtn et button.mxPauseBtn.</li>
</ul>
</li>
<li>Composant Menu
<ul>
<li>"display" des div.mxSubMenuDiv.</li>
</ul>
</li>
<li>Composant NotSeen
<ul>
<li>"width" de div.mxInnerNotSeenDiv.</li>
</ul>
</li>
<li>Composant Tree
<ul>
<li>"display" et "width" des blocks internes.</li>
</ul>
</li>
<li>Boites popup venant s'afficher à la place du goban (.mxNumberingDiv, .mxNewDiv, .mxOpenDiv, .mxSaveDiv, .mxSendDiv, 
.mxShowHeaderDiv, .mxShowHelpDiv, .mxInfoDiv, .mxShowOptionDiv, .mxShowSgfDiv)
<ul>
<li>"display:none" ou "display:block"</li>
<li>"position:absolute"</li>
<li>"top:0", "left:0", "bottom:0", "right:0"</li>
</ul>
</li>
</ul>
<h4>Classes particulières modifiées dans le code javascript</h4>
<ul>
<li>ajoute .mxIn3d à .mxGlobalBoxDiv si "in3dOn" vaut 1</li>
<li>ajoute .mxIn2d à .mxGlobalBoxDiv si "in3dOn" vaut 0</li>
<li>ajoute .mxUnder à la boite parente (.mxGobanDiv par défault) d'une boite popup 
(.mxNumberingDiv, .mxNewDiv, .mxOpenDiv, ...) lorsque celle-ci est affichée</li>
<li>ajoute .mxBM à .mxLessonDiv si le noeud sgf courant a une propriété BM</li>
<li>ajoute .mxDO à .mxLessonDiv si le noeud sgf courant a une propriété DO</li>
<li>ajoute .mxIT à .mxLessonDiv si le noeud sgf courant a une propriété IT</li>
<li>ajoute .mxTE à .mxLessonDiv si le noeud sgf courant a une propriété TE</li>
<li>ajoute .mxJustPlayedPassBtn à .mxPassBtn si le coup qui vient d'être placé est un passe</li>
<li>ajoute .mxOnVariationPassBtn à .mxPassBtn si l'un des coups possibles (suivants ou alternatifs selon le valeur de style) est un passe</li>
<li>ajoute .mxOnFocusPassBtn à .mxPassBtn si le coup qui va être joué est un passe</li>
<li>remplace .mxUnselectedEditTool par .mxSelectedEditTool en cas de sélection d'un outil dans la barre d'outils du composant <span class="component">Edit</span></li>
<li>remplace .mxSelectedEditTool par .mxSuperSelectedEditTool en cas de sélection d'un outil ayant trois états (quand la propriété sgf qu'il modifie à 3 valeurs et non 2),
dans la barre d'outils du composant <span class="component">Edit</span></li>
<li>remplace .mxSelectedEditTool ou .mxSuperSelectedEditTool par .mxUnselectedEditTool en cas de désélection d'un outil dans la barre d'outils du composant <span class="component">Edit</span></li>
<li>remplace .mxInfoSelectedPageBtn par .mxInfoPageBtn en cas de sélection d'une page dans le composant <span class="component">Info</span></li>
<li>remplace .mxInfoPageBtn par .mxInfoSelectedPageBtn en cas de désélection d'une page dans le composant <span class="component">Info</span></li>
<li>ajoute .mxBadInput à un input si l'utilisateur a entré dans un champ une valeur non conforme selon maxiGos dans une des pages du composant <span class="component">Info</span></li>
</ul>

<h2>Lecteur sur mesure</h2> 

<p>On peut se fabriquer son propre lecteur autonome.
Ce n'est pas très difficile si on connait un peu le php
et le javascript.</p>

<h3>Générateur d'un lecteur sur mesure</h3>

<p>Un générateur est un script php qui permet de fabriquer 
le code javascript d'un lecteur autonome maxiGos.
En utilisant un autre script php, on peut enregistrer
le code généré dans un fichier javascript.
On obtient ainsi un lecteur autonome.
C'est ce que fait par exemple le script makeAllAlone.php
qui se trouve dans le dossier "_php" des exemples de maxiGos.</p>
<p>Un générateur peut aussi servir à afficher un lecteur maxiGos
dans une page : il suffit d'insérer une balise &lt;script&gt;
dans la page à afficher, et d'y mettre comme valeur de l'attribut "src"
le nom du script php du générateur au lieu du nom du script javascript
d'un lecteur autonome maxiGos.</p>
<p>Un certain nombre de générateurs sont disponibles dans les exemples
maxiGos. Ils sont dans le dossier "_maker" de ces exemples.
Ce sont ces générateurs qui ont servi à fabriquer les lecteurs autonomes de maxiGos.</p>
<p>Le suite du code d'un générateur contient plusieurs parties :</p>
<ul>
<li>Une ligne qui indique que le script php du générateur
fabrique un script javascript,</li>
<li>Une partie où l'on inclut les composants dont on a besoin
(via des appels à la fonction include de php),</li>
<li>Une partie où l'on insère directement des instructions javascript
qui permettront de créer le lecteur lors de son exécution dans une page,</li>
<li>Une ligne qui insère la feuille de style dans le code du lecteur
(via l'exécution d'un autre script php),</li>
<li>Une partie où l'on attribue une valeur aux paramètres
via une liste d'instructions en javascript.</li>
<li>Une ligne où l'on inclut l'instruction javascript qui
démarrera le lecteur lors de son exécution dans une page.</li>
</ul>

<h3>Ligne indiquant que l'on fabrique un script javascript</h3>

<p>Tout d'abord, le script php du générateur ayant pour but
de fabriquer un script javascript,
on l'indique en ajoutant au tout début du code du générateur
la ligne :</p>
<code><pre>header("content-type:application/x-javascript;charset=UTF-8");</pre></code>

<h3>Inclusion des composants dans un lecteur sur mesure</h3>

<p>Un lecteur maxiGos est un assemblage de composants,
chaque composant correspondant à une fonctionnalité ou une partie du lecteur. 
Par exemple le goban, la boite à commentaire, ou la barre de navigation sont des composants.</p>
<p>Les scripts javascript de ces composants se trouvent dans le dossier "_js"
du dossier "_maxigos".</p> 
<p>On n'est pas obligé d'utiliser tous les composants. Seuls sont obligatoires
les scripts "mgos_lib.js" (fonctions utilitaires diverses),
"mgos_rls.js" (gestion de la règle du go),
"mgos_prs.js" (analyseur de sgf),
"mgos_scr.js" (fabrication de svg),
"mgos.js" (corps principal du lecteur)
et "mgosGoban.js" (composant <span class="component">Goban</span>).</p>
<p>En utilisant uniquement les composants dont on a vraiment besoin,
on diminue parfois considérablement la taille
et la complexité du code qui sera
téléchargé sur la machine de l'utilisateur, 
et donc le temps que mettra maxiGos à démarrer.</p>
<p>Pour inclure un composant dans le code d'un générateur,
il suffit d'une ligne de php utilisant la fonction "include".
Par exemple, pour inclure le composant <span class="component">Goban</span>
qui a pour script "mgosGoban.js",
on utilise la ligne suivante :</p>
<code><pre>include "../../../_js/mgosGoban.js";</pre></code>
<p class="note">On peut aussi créer ses propres composants qu'il faut alors définir dans un fichier javascript du même genre que pour les composants prédéfinis.</p>
<p class="note">Dans ce fichier il suffira de définir les fonctions "createNomDuComposant()", appelée par maxiGos lors du chargement de la page, 
"initNomDuComposant()" appelée par maxiGos juste après le chargement de la page, et "updateNomDuComposant()" appelée par maxiGos après chaque action de l'utilisateur.
Il faut déclarer ces fonctions en tant que prototype pour la classe "mxG.G" (qui est définie par ailleurs dans "mgos.js"). 
Par exemple, si l'on souhaite créer un composant appelé "Cute" 
dont l'unique action est d'afficher lors du chargement de la page la phrase "Je suis là !", le code correspondant sera :</p>
<code><pre>mxG.G.prototype.createCute=function()
{
	return "&lt;div&gt;Je suis là !&lt;/div&gt;";
};</pre></code>
<p class="note">La définition de "createNomDuComposant()" est obligatoire, mais la définition des autres fonctions est facultative.</p>
<p class="note">Le nom du fichier contenant le composant peut être n'importe quel nom. Il n'a pas besoin d'être préfixé par "mgos" ni même de contenir le nom du composant.</p>
<p class="note">Les fichiers javascript des composants prédéfinis sont dans le dossier "_js". 
Mais un fichier javascript définissant un composant peut être n'importe où dans l'arborescence du site.
Il suffira de le préfixer par un chemin relatif approprié pour pouvoir l'inclure.</p>
<p class="note">Un fichier javascript peut éventuellement contenir la définition de plusieurs composants.</p>
<p class="important">Important : ne pas oublier d'ajouter dans tous les cas les fichiers "mgos_lib.js", "mgos_rls.js", "mgos_prs.js", "mgos_scr.js" et "mgos.js".</p>

<h3>Javascript de création d'un lecteur dans une page</h3>

<p>Le code javascript de création d'un lecteur dans une page doit
incrémenter le compteur de lecteurs maxiGos présents dans la page,
lister les boites à utiliser, créer une instance de lecteur,
lui donner un nom de thème et un nom de configuration.</p>
<p>Par exemple :</p>
<code><pre>mxG.K++;
mxG.B=[["Goban"],"Navigation","Variation"];
mxG.D[mxG.K]=new mxG.G(mxG.K,mxG.B);
mxG.D[mxG.K].theme="Ephemeral";
mxG.D[mxG.K].config="Simple";
</pre></code>
<p>Le nom des boites à utiliser est tout simplement le nom
du composant auquel elles correspondent. On affecte à mxG.B
la liste de ces boites sous forme d'un tableau. On peut regrouper
certaines boites dans un sous-tableau si on le souhaite.
Chaque regroupement donnera lieu à la création par le lecteur
(lors de son exécution dans la page)
d'une boite de regroupement
(c'est à dire une balise &lt;div&gt; qui englobe
les composants contenus dans ce regroupement).
Eventuellement, on peut n'avoir qu'un seul composant dans 
une boite de regroupement, et on peut aussi faire des
regroupements de regroupements.
Cela donne plus de possibilités pour composer et styler le lecteur.</p>
<p>Le thème et la configuration sont
utilisées par les lecteurs maxiGos (lors de leur exécution dans la page)
pour donner à la boite globale des lecteurs
la classe "mx"+nom du thème+"Theme" et la classe
"mx"+nom de la configuration+"Config". Ainsi,
on pourra styler les lecteurs en fonction du nom du thème
et du nom de la configuration en utilisant ces classes.</p>
<p>Le nom du thème et le nom de la configuration doivent
être de préférence une chaine alphanumérique (sans espace)
commençant par une majuscule.</p>

<h3>Inclusion de la feuille de style</h3>

<p>Cette inclusion est effectuée dans le code php
du générateur par l'instruction php suivante :</p>
<code><pre>include "../../_php/insertCss.php";</pre></code>
<p>Le fichier css à insérer est supposé s'appeler "_common.css",
 et être dans un dossier s'appelant "_css",
 frère du dossier "_maker" où se trouve le générateur.</p>
<p>Le script insertCss.php fabrique une instruction javascript
qui permettra ensuite au lecteur maxiGos
(lors de son exécution dans la page) d'insérer la feuille de
style dans la page où devra s'afficher le lecteur.</p>
<h3>Paramétrage des composants</h3>
<p>Pour donner une valeur à un paramètre, la ligne de code javascript
à placer dans un générateur php est de la forme
"mxG.D[mxG.K].a."+"NomDuParametre"="ValeurDuParametre";
Par exemple, pour donner la valeur 1 au paramètre <span class="parameter">in3dOn</span>,
on écrira :</p>
<code><pre>mxG.D[mxG.K].a.in3dOn=1;</pre></code>
<p>Il faut bien faire attention aux majuscules et minuscules,
et ne pas oublier les guillemets quand la valeur du paramètre est
une chaine.</p>
<p>Voir le chapitre <a href="#parametrage">Paramétrage</a>
pour plus d'informations sur les paramètres que l'on peut utiliser.</p>

<h3>Le code de démarrage du lecteur</h3>

<p>Le code d'un générateur finit par une ligne de javascript
démarrant le lecteur après son chargement dans une page.
Cette ligne est :</p>
<code><pre>mxG.D[mxG.K].start();</pre></code>

<h3>Exemple complet</h3>

<p>On commence par créer un sous-dossier dans le dossier "_sample"
de maxiGos, et on l'appelle par exemple "Ephemeral".</p>

<p>On crée dans le dossier "ephemeral" les sous-dossiers
"_css", et "_maker".</p>

<p>On crée un fichier "ephemeral.php" (que l'on enregistrera dans
le dossier _maker") et qui contient :</p>
<code><pre>&lt;?php
header("content-type:application/x-javascript;charset=UTF-8");
include "../../../_js/mgos_lib.js";
include "../../../_js/mgos_prs.js";
include "../../../_js/mgos_rls.js";
include "../../../_js/mgos_scr.js";
include "../../../_js/mgos.js";
include "../../../_js/mgosGoban.js";
include "../../../_js/mgosNavigation.js";
include "../../../_js/mgosVariation.js";
?&gt;
mxG.K++;
mxG.B=[["Goban"],"Navigation","Variation"];
mxG.D[mxG.K]=new mxG.G(mxG.K,mxG.B);
mxG.D[mxG.K].theme="Ephemeral";
mxG.D[mxG.K].config="Simple";
&lt;?php
include "../../_php/insertCss.php";
?&gt;
mxG.D[mxG.K].a.eraseGridUnder=1;
mxG.D[mxG.K].a.in3dOn=1;
mxG.D[mxG.K].a.hideSingleVariationMarkOn=1;
mxG.D[mxG.K].a.canPlaceVariation=1;
mxG.D[mxG.K].start();</pre></code>

<p>On crée un fichier "_common.css" (que l'on enregistrera dans
le dossier _css") et qui contient :</p>
<code><pre>.mxEphemeralTheme.mxSimpleConfig
{
	max-width:30em;
}
.mxEphemeralTheme.mxSimpleConfig .mxGobanDiv svg
{
	background:#9cf;
}
.mxEphemeralTheme.mxSimpleConfig .mxNavigationDiv
{
	display:flex;
	justify-content:space-between;
	margin-top:0.5em;
}
.mxEphemeralTheme.mxSimpleConfig .mxNavigationDiv button
{
	border:0;
	background:none;
	padding:0;
	margin:0 5%;
}
.mxEphemeralTheme.mxSimpleConfig .mxNavigationDiv button svg
{
	width:100%;
	height:auto;
}
.mxEphemeralTheme.mxSimpleConfig .mxNavigationDiv button[disabled] svg
{
	fill:#0007;
}
.mxEphemeralTheme.mxSimpleConfig .mxNavigationDiv button:focus:not([disabled]) svg,
.mxEphemeralTheme.mxSimpleConfig .mxNavigationDiv button:hover:not([disabled]) svg
{
	fill:red;
}
.mxEphemeralTheme.mxSimpleConfig button::-moz-focus-inner
{
	padding:0;border:0;
}
.mxEphemeralTheme.mxSimpleConfig .mxInnerGobanDiv,
.mxEphemeralTheme.mxSimpleConfig .mxNavigationDiv,
.mxEphemeralTheme.mxSimpleConfig .mxNavigationDiv button
{
	outline:none;
}</pre></code>

<p>On a notre générateur prêt à l'emploi. Pour le tester,
on crée la page index.html suivante (que l'on enregistre
directement dans le dossier "Ephemeral") :</p>
<code><pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta charset="utf-8"&gt;
&lt;meta name="viewport" content="width=device-width,initial-scale=1.0"&gt;
&lt;title&gt;Ephemeral&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;h1&gt;Ephemeral&lt;/h1&gt;
&lt;script src="_maker/ephemeral.php"&gt;
(;
GM[1]
FF[4]
CA[UTF-8]
SZ[19]
EV[吐血の一局]
DT[1835-07-27]
PW[本因坊丈和]
PB[赤星因徹]
PC[日本]
RU[Japanese]
KM[0]
RE[W+R]
;B[cp];W[pq];B[qd];W[ed];B[oc];W[eq];B[qo];W[qk]
;B[qi];W[op];B[iq];W[dn];B[ep];W[dp];B[do];W[dq]
;B[co];W[eo];B[fp];W[cq];B[bq];W[br];B[cm];W[gr]
;B[hp];W[en];B[bp];W[ck];B[dl];W[dk];B[el];W[gn]
;B[cr];W[dr];B[bs];W[fq];B[go];W[ar];B[hn];W[gm]
;B[hm];W[gl];B[ek];W[hl];B[di];W[io];B[ho];W[fo]
;B[ch];W[cd];B[lq];W[pn];B[gc];W[qn];B[dc];W[cc]
;B[ec];W[cf];B[il];W[gp];B[nq];W[ic];B[fd];W[lc]
;B[bg];W[bf];B[af];W[bi];B[dj];W[eh];B[fj];W[qg]
;B[oi];W[qe];B[pd];W[nf];B[ok];W[pk];B[ol];W[pj]
;B[rn];W[rm];B[qq];W[qr];B[rr];W[qp];B[rq];W[pr]
;B[rp];W[po];B[pp];W[mp];B[qm];W[pm];B[np];W[mq]
;B[mo];W[lp];B[lo];W[kp];B[no];W[nr];B[or];W[qp]
;B[mr];W[ro];B[pi];W[lr];B[ns];W[ip];B[jr];W[hq]
;B[jn];W[ko];B[kq];W[kn];B[jm];W[km];B[ik];W[mk]
;B[mm];W[ir];B[jq];W[kk];B[mi];W[nm];B[ml];W[ki]
;B[lj];W[lk];B[kj];W[jj];B[kl];W[ll];B[lm];W[oj]
;B[mg];W[jl];B[jk];W[nj];B[ni];W[im];B[in];W[jo]
;B[kl];W[js];B[ks];W[jl];B[im];W[is];B[kl];W[ei]
;B[ej];W[jl];B[hr];W[hs];B[kl];W[cn];B[bn];W[jl]
;B[gs];W[fs];B[kl];W[hi];B[ij];W[jl];B[ls];W[ji]
;B[hj];W[oe];B[kg];W[jg];B[gi];W[nc];B[jf];W[nb]
;B[re];W[if];B[je];W[hd];B[fe];W[gf];B[ff];W[fg]
;B[gg];W[gh];B[hg];W[fi];B[gj];W[ig];B[hh];W[hf]
;B[ii];W[rf];B[pe];W[pf];B[le];W[kd];B[ad];W[kh]
;B[qf];W[ef];B[de];W[qe];B[ld];W[lg];B[kc];W[jd]
;B[qf];W[db];B[eb];W[qe];B[jb];W[od];B[ib];W[mf]
;B[qf];W[jp];B[kr];W[qe];B[lf];W[kf];B[qf];W[hc]
;B[qe];W[hb];B[pg];W[og];B[of];W[cg];B[bh];W[pf]
;B[ph];W[bb];B[da];W[cb];B[fh];W[ac];B[eg];W[bd]
;B[ob];W[oa];B[of];W[mh];B[rj];W[kl])
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre></code>

<p>Il suffit ensuite d'afficher cette page dans un navigateur.</p>

<p>Et voilà !</p>

<h2>Annexes</h2>

<h3>Les dossiers et fichiers de maxiGos</h3>
<ul>
<li>le dossier "_doc" : contient les documentations, les pages de téléchargement, le fichier de licence…,</li>
<li>le dossier "_i18n" : contient les scripts d'internationalisation,</li>
<li>le dossier "_img" : contient des images,</li>
<li>le dossier "_js" : contient les scripts javascript des composants,</li>
<li>le dossier "_php" : contient divers scripts php,</li>
<li>le dossier "_sample" : contient des exemples d'utilisation de maxiGos,
dont les scripts des lecteurs autonomes,
les feuilles de style et les scripts des générateurs.</li>
</ul>

<h3 name="faq">Questions et réponses</h3>
<p class="important">Question : en partant de rien, que dois-je faire au minimum pour insérer 
un lecteur autonome maxiGos dans l'une de mes pages ?</p>
<ol>
<li>Affichez dans un navigateur la <a href="http://jeudego.org/maxiGos/_maxigos/_doc/_fr/download.php">page de téléchargement</a>.</li>
<li>Téléchargez le lecteur autonome "maxigos-neo-classic-basic.js".</li>
<li>Créez à la racine de votre site un dossier "maxiGos" et copiez "maxigos-neo-classic-basic.js dedans.</li>
<li>Insérez dans la page où vous voulez que maxiGos affiche quelquechose les balises
&lt;script&gt; et &lt;/script&gt; avec "/maxiGos/maxigos-neo-classic-basic.js" comme valeur de l'attribut "src",
et insérez entre ces balises un enregistrement sgf. Par exemple :<br>
<code><pre>&lt;script src="/maxiGos/maxigos-basic.js"&gt;(;FF[4]CA[UTF-8]GM[1]SZ[19];B[pd];W[dc];B[pp];W[fp];B[de];W[ee];B[ef];W[ed];B[dg];W[co])&lt;/script&gt;</pre></code>
</li>
<li>Et voilà!</li>
</ol>
<p class="important">Question : avec quels navigateurs maxiGos fonctionne-t-il ?</p>
<p>
Bien que maxiGos ait plus de 20 ans, il a beaucoup évolué.
Il fonctionne bien avec les navigateurs soucieux de respecter
les standards (la plupart des navigateurs dont Chrome, Firefox, Safari et Edge),
mais pas avec des navigateurs comme Internet Explorer. 
Parfois, seules certaines fonctionnalités peuvent ne pas être disponibles
(en particulier quand on utilise l'éditeur qui a besoin de pouvoir
lire et enregistrer des fichiers).
</p>
<p class="important">Question : maxiGos n'affiche rien. 
Comment faire le diagnostic ?</p>
<p>Vérifiez que vous avez bien copié le dossier "_maxigos"
ou le ou les lecteurs que vous envisagez d'utiliser à l'endroit approprié sur le serveur.</li>
<p>Suspectez les chemins préfixant les scripts d'appel à maxiGos dans les lignes 
qui appellent maxiGos dans votre page.</p>
<p>Affichez le code source de la page, et si votre navigateur sait faire ça, 
cliquez sur une ligne qui appelle maxiGos dans votre page.
Si vous avez un message du genre "The requested URL ... was not found on this server" 
le chemin devant le lecteur maxiGos n'est pas bon.
Si par contre il n'y a pas de message d'erreur, cliquez dans le code source sur la ligne 
qui appelle maxiGos. Cela affiche en général le code javascript correspondant à cette ligne.
Si une page blanche apparait, c'est probablement que l'un des scripts de maxiGos a été modifié 
et contient une erreur de syntaxe.
Sinon, si du code javascript apparait, il s'agit probablement d'un bug 
dans le code de maxiGos.</p>
<p class="important">Question : maxiGos affiche le goban mais pas le contenu du fichier sgf. Comment faire le diagnostic ?</p>
<p>Vérifiez si le fichier sgf est bien à l'endroit approprié sur le serveur.</p>
<p>Si c'est bien le cas, suspectez alors le chemin préfixant le nom du fichier sgf ou le nom du fichier
dans la ligne qui insère maxiGos dans votre page.</p>
<p>Il est aussi possible que maxiGos n'ait pas eu le droit d'ouvrir le fichier sgf. 
Il faut dans ce cas placer vos fichiers sgf dans un autre endroit, 
ou changer les droits d'accès à ces fichiers 
(le droit en écriture dans ces fichiers sgf n'est cependant jamais nécessaire,
seul le droit en lecture l'est).</p>
<p class="important">Question: comment changer la taille du goban ?</p>
<p>Il y a plusieurs méthodes pour faire cela.
Avec les lecteurs maxiGos fournis avec les exemples de maxiGos,
le goban est aussi large que possible à l'intérieur de son
conteneur. Le plus simple est donc en général de le mettre dans un conteneur plus petit
ou plus grand.
<p>Cependant on notera que les gobans des lecteurs maxiGos
fournis avec maxiGos ont en général
une largeur maximale spécifiée dans leur feuille de style
via la variable css "--gobanMaxWidth".
On peut donc aussi essayer de modifier la valeur de cette variable css "--gobanMaxWidth".</p>
<p>Par exemple, si l'on veut que tous les gobans ne fassent pas plus de 20em de large,
on peut ajouter dans la feuille de style de la page :</p>
<code><pre>div.mxGlobalBoxDiv
{
	--gobanMaxWidth:20em;
}</pre></code>
<p class="important">Question: comment changer le fond du goban ?</p>
<p>Ceci peut se faire de différentes manières en ajoutant un style
dans votre feuille de style.</p>
<p>Par exemple, pour donner au goban d'un lecteur du
thème Minimalist une couleur bleue clair, on peut
ajouter dans la feuille de style de la page un background
au svg qui dessine le goban :</p>
<code><pre>div.mxMinimalistTheme .mxGobanDiv svg
{
	background-color:#9cf;
}</pre></code>
<p>On peut aussi utiliser d'autres balises, comme par exemple
le rectangle svg de classe .mxWholeRect, et dans ce cas,
on modifie la propriété css fill au lieu de background-color :</p>
<code><pre>div.mxMinimalistTheme .mxWholeRect
{
	fill:#9cf;
}</pre></code>
<p>Il faut évidemment vérifier qu'il n'y a pas dans le css
existant d'autres règles css qui empêcheraient ces modifications
de fonctionner.</p>
<p class="important">Question : comment afficher maxiGos dans une page s'adaptant aux mobiles 
("responsive design") ?</p>
<p>Normalement, maxiGos s'occupe de tout ! Il s'adapte à la taille
de son conteneur, tout en essayant de conserver au mieux la lisibilité
des textes qu'il affiche.</p>
<p>Mais afin de forcer la page à s'ajuster à la taille de l'écran d'un mobile,
n'oubliez pas d'ajouter dans la partie &lt;head&gt; de la page une ligne du genre :</p>
<code><pre>&lt;meta name="viewport" content="width=device-width,initial-scale=1.0"&gt;</pre></code>
<p class="important">Question : j'utilise un lecteur autonome maxiGos mais il s'affiche en français, 
et je souhaite qu'il s'affiche en une autre langue. Que puis-je faire ?</p>
<p>Relisez le chapitre <a href="#internationalisation">Internationalisation</a>.</p>
<p>Si la langue que vous souhaitez utiliser n'a pas encore de script d'internationalisation dans "_maxigos/_i18n/", voir la question suivante.</p>
<p class="important">Question : je voudrais traduire maxiGos en une autre langue. Comment procéder ?</p>
<p>Dupliquez "_maxigos/_i18n/maxigos-i18n-ja.js" et renommez le fichier en remplaçant les deux dernières 
lettres par le code de cette nouvelle langue (de préférence un code ISO 639). 
Remplacez les "ja" par le code de la nouvelle langue.
Remplacez tous les textes qui sont en japonais par leur traduction dans la nouvelle langue 
(ils sont précédés par leurs équivalents en anglais) 
et supprimez ou éventuellement ré-écrivez ou créez si nécessaire les fonctions 
dont le nom commence par "build" ou "transalte"
(ces fonctions sont "buildDate", "buildRank", "buildMove", "buildNumOfMoves", "buildRules", "buildTimeLimits", "buildKomi", "buildResult" et "transalteTitle"). 
Si l'une de ces fonctions est absente, maxiGos utilise des fonctions par défaut pour produire un résultat acceptable. Aussi, vous pouvez laisser de côté 
la réécriture de ces fonctions si cela vous semble trop compliqué. 
Enfin, enregistrez le fichier en UTF-8.</p>
<p class="important">Question : j'utilise maxiGos dans une page qui n'est pas en UTF-8. Comment faire cela ?</p>
<p>Si vous utilisez un lecteur autonome, ajoutez charset="UTF-8" à vos balises contenant le code de maxiGos.
Par exemple :</p>
<code><pre>&lt;script charset="UTF-8" src="_alone/maxigos-minimal-basic.js"&gt;
../_sgf/game/blood-vomit.sgf
&lt;/script&gt;</pre></code>
<em>Remerciements à Adachi K., Alfredo Pernin, Chantal Gajdos, Julien Payrat, Lao Lilin, Mickaël Simon, Motoki Noguchi, 
Olivier Besson, Olivier Dulac, Patrice Fontaine, Tony Yamanaka
et beaucoup d'autres pour leurs conseils ou contributions à ce projet !</em>
<nav><?php if (file_exists("../../index.php")) print "<a href=\"../../index.php?lang=fr\">Accueil</a>";?><!--
--><a href="<?php print str_replace("/_fr/","/_en/",$_SERVER["SCRIPT_NAME"]);?>"><img alt="English" class="flag" src="../../_img/flag/en.svg">English</a><!--
--><a href="<?php print str_replace("/_en/","/_fr/",$_SERVER["SCRIPT_NAME"]);?>"><img alt="Français" class="flag" src="../../_img/flag/fr.svg">Français</a></nav>
</body>
</html>
