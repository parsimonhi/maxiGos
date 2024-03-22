<?php
header ('Content-Type:text/html;charset=ISO-8859-1');
?>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="ISO-8859-1">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Règle du jeu de go</title>
<style>
body {font-family:serif;font-size:15px;margin:0;padding:1px;}
h1 {text-align:center;color:#900;}
h2 {color:#900;margin:0;padding:0.5em 0;}
span.definition {color:#900;font-weight:bold;}
p.important {font-weight:bold;}
main
{
	margin:0 auto;
	padding:0.5em;
	column-count:4;
	column-rule-style:solid;
}
figure
{
	margin:0 0 1em 0;
	padding:0;
}
figcaption,
figcaption p
{
	margin:0;
	padding:0;
}
figure div.mxGlobal
{
	max-width:60%;
}
figure div.mxGlobal .mxMark.mxOnBlack
{
	stroke-width:1.5px;
}
figure div.mxGlobal .mxMark.mxOnWhite
{
	stroke-width:1.25px;
}
</style>
</head>
<body>
<h1>Règle du jeu de go</h1>

<main>

<h2>Déroulement du jeu</h2>
<p>
Le go se joue à deux sur une <span class="definition">grille</span>
de 19x19 lignes, 
avec des <span class="definition">pierres</span> noires et blanches. 
Parfois, des grilles plus petites sont utilisées, en particulier pour l'initiation.
</p>
<p class="important">
Celui qui commence joue avec les pierres noires.
À tour de rôle, les joueurs
posent une pierre de leur couleur sur une intersection inoccupée de la grille 
ou bien ils passent (essentiellement pour indiquer qu'ils pensent la partie terminée).
</p>

<h2>Libertés</h2>
<p>
Des intersections sont <span class="definition">voisines</span> si elles sont reliées par une ligne de la grille et sans autre intersection entre elles. 
Les <span class="definition">libertés</span> d'une pierre sont les intersections inoccupées voisines de l'intersection sur laquelle est cette pierre. 
Des pierres de même couleur sont <span class="definition">connectées</span> si elles sont sur des intersections voisines. Elles mettent alors leurs libertés en commun.
</p>

<figure>
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-indices-on="0"
		data-maxigos-sgf="../_sgf/rules/adjacent.sgf">
</script>
<figcaption>
<p>'a' et 'b' sont voisines, mais 'b' et 'c' ne le sont pas.</p>
</figcaption>
</figure>

<figure>
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0"
		data-maxigos-sgf="../_sgf/rules/liberties.sgf">
</script>
<figcaption>
<p>La pierre marquée d'un triangle a quatre libertés ('a', 'b', 'c' et 'd'), 
celle marquée d'un carré trois ('e', 'f' et 'g') 
et celle marquée d'une croix deux ('h' et 'i').
</p>
</figcaption>
</figure>

<figure>
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0"
		data-maxigos-sgf="../_sgf/rules/connection.sgf">
</script>
<figcaption>
<p>Les quatre pierres blanches marquées d'une croix sont connectées 
et ont cinq libertés ('a', 'b', 'c', 'd', et 'e').
</p>
</figcaption>
</figure>

<h2>Capture</h2>
<p class="important">
Si un joueur supprime la dernière liberté de
pierres adverses, il les capture en les retirant de la grille. 
De plus, il ne doit pas supprimer la dernière liberté
de ses propres pierres, 
sauf s'il capture au moins une pierre adverse.
</p>

<figure>
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0"
		data-maxigos-sgf="../_sgf/rules/captureSimpleBefore.sgf">
</script>
<figcaption>
<p>Si Noir joue en 'a',
il supprime la dernière liberté des pierres blanches marquées d'une croix...
</p>
</figcaption>
</figure>

<figure>
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0"
		data-maxigos-sgf="../_sgf/rules/captureSimpleAfter.sgf">
</script>
<figcaption>
<p>...alors Noir, après avoir posé la pierre 1,
capture ces pierres blanches en les retirant de la grille.
</p>
</figcaption>
</figure>

<figure>
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-indices-on="0"
		data-maxigos-sgf="../_sgf/rules/captureNoLib1.sgf">
</script>
<figcaption>
<p>Si Noir joue en 'a', il n'a pas de liberté,
mais il supprime la dernière liberté des pierres blanches marquées
d'une croix...</p>
</figcaption>
</figure>

<figure>
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-indices-on="0"
		data-maxigos-sgf="../_sgf/rules/captureNoLib2.sgf">
</script>
<figcaption>
<p>...alors Noir capture ces pierres en les retirant de la grille,
ce qui donne deux libertés à la pierre 1 qu'il vient de jouer.</p>
</figcaption>
</figure>

<figure>
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-indices-on="0"
		data-maxigos-sgf="../_sgf/rules/suicide.sgf">
</script>
<figcaption>

<p>Si Noir joue en 'a', il supprime la dernière liberté de ses pierres
et ne capture rien. C'est interdit.</p>
</figcaption>
</figure>

<h2>Répétition</h2>
<p class="important">
Un joueurs ne doit pas, en posant une pierre, ramener la grille dans un état identique à l'un de ceux qu'il lui
a lui-même déjà donné.
</p>

<figure>
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-indices-on="0"
		data-maxigos-sgf="../_sgf/rules/repetition1.sgf">
</script>
<figcaption>
<p>Si Noir joue en 'a', il capture la pierre marquée d'une croix (il lui enlève sa dernière liberté).
</p>
</figcaption>
</figure>

<figure>
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-indices-on="0"
		data-maxigos-as-in-book-on="0"
		data-maxigos-sgf="../_sgf/rules/repetition2.sgf">
</script>
<figcaption>
<p>Une fois que Noir a joué 1,
Blanc ne peut pas rejouer en 'b' immédiatement
et capturer la pierre noire car dans ce cas, 
il reproduirait la situation du diagramme précédent.
</p>
</figcaption>
</figure>

<p> Blanc doit donc jouer ailleurs. 
Si Noir répond en jouant lui aussi ailleurs,
Blanc pourra à nouveau jouer en 'b',
puisque l'état de la grille aura changé. 
Alors ce sera au tour de Noir de devoir jouer ailleurs,
et ainsi de suite,
tant qu'aucun des deux joueurs ne connecte ses pierres,
empêchant ainsi une nouvelle capture.</p>

<h2>Fin de la partie</h2>
<p>Des intersections inoccupéees sont
<span class="definition">entourées</span> par un joueur
si toutes leurs voisines sont occupées par ses pierres.</p>

<p class="important">
La partie s'arrête lorsque les deux joueurs passent consécutivement. 
Ils peuvent alors retirer de la grille toutes les pierres adverses 
qu'ils sont certains de pouvoir capturer. 
Puis ils comptent leurs points qui sont le nombre d'intersections
qu'ils sont certains de pouvoir occuper 
ou entourer avec leurs pierres.<br><br>
En cas de désaccord des joueurs sur le statut de certaines intersections, 
la partie reprend dans l'état où elle s'était arrêtée 
jusqu'à deux nouveaux passes consécutifs, sachant qu'ensuite, 
aucune des pierres encore sur la grille ne pourra être retirée,
et que les points des joueurs seront le nombre d'intersections
qu'ils occupent ou entourent avec leurs pierres.<br><br>
Enfin,
Blanc reçoit des <span class="definition">points compensation</span>
(le plus souvent entre 5,5 et 7,5 points),
Noir ayant eu l'avantage de commencer.<br><br>
Le gagnant est celui qui a le plus de points.
</p>

<p>Si des intersections ne sont entourées par aucun des joueurs,
elles sont <span class="definition">neutres</span>, 
et ne donnent de points à personne.</p>

<figure>
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-indices-on="0"
		data-maxigos-numbering-on="0"
		data-maxigos-sgf="../_sgf/rules/countG.sgf">
</script>
<figcaption>
<p>Les joueurs viennent de passer.
Blanc retire la pierre marquée d'une croix
qu'il est certain de pouvoir capturer.</p>
</figcaption>
</figure>

<figure>
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-indices-on="0"
		data-maxigos-sgf="../_sgf/rules/countB.sgf">
</script>
<figcaption>
<p>Noir entoure 7 intersections en haut à gauche,
6 en bas à droite, et a 26 pierres sur la grille, soit 39 points.</p>
</figcaption>
</figure>

<figure>
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-indices-on="0"
		data-maxigos-sgf="../_sgf/rules/countW.sgf">
</script>
<figcaption>
<p>Blanc entoure 8 intersections en bas à gauche,
7 en haut à droite,
et a 27 pierres sur la grille,
soit 42 points.</p>
</figcaption>
</figure>

<p>Blanc a donc 3 points de plus que Noir.
Si on lui ajoute les points de compensation (par exemple 7,5 points),
il gagne de 10,5 points.</p>

<p>Pour compter plus rapidement, on peut donner durant la partie
une pierre à l'adversaire à chaque fois que l'on passe,
obliger Blanc à passer le dernier,
et placer à la fin de la partie les pierres que l'on a capturées
dans le territoire adverse.</p>

<p>On sera alors certain qu'il y aura autant de pierres noires
que de pierres blanches sur la grille,
et on pourra donc se contenter de ne compter
que les intersections inoccupées restantes.</p>

<h2>Handicap</h2>
<p>Parfois on donnera un handicap à l'un des joueurs,
consistant à le laisser jouer plusieurs coups de suite en début de partie,
ou à modifier le nombre de points de compensation.</p>

</main>

<script src="../_js/mgosIframe.js"></script>
</body>
</html>
