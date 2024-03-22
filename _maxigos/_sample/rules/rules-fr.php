<?php
header ('Content-Type:text/html;charset=ISO-8859-1');
?>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="ISO-8859-1">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>R�gle du jeu de go</title>
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
<h1>R�gle du jeu de go</h1>

<main>

<h2>D�roulement du jeu</h2>
<p>
Le go se joue � deux sur une <span class="definition">grille</span>
de 19x19 lignes, 
avec des <span class="definition">pierres</span> noires et blanches. 
Parfois, des grilles plus petites sont utilis�es, en particulier pour l'initiation.
</p>
<p class="important">
Celui qui commence joue avec les pierres noires.
� tour de r�le, les joueurs
posent une pierre de leur couleur sur une intersection inoccup�e de la grille 
ou bien ils passent (essentiellement pour indiquer qu'ils pensent la partie termin�e).
</p>

<h2>Libert�s</h2>
<p>
Des intersections sont <span class="definition">voisines</span> si elles sont reli�es par une ligne de la grille et sans autre intersection entre elles. 
Les <span class="definition">libert�s</span> d'une pierre sont les intersections inoccup�es voisines de l'intersection sur laquelle est cette pierre. 
Des pierres de m�me couleur sont <span class="definition">connect�es</span> si elles sont sur des intersections voisines. Elles mettent alors leurs libert�s en commun.
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
<p>La pierre marqu�e d'un triangle a quatre libert�s ('a', 'b', 'c' et 'd'), 
celle marqu�e d'un carr� trois ('e', 'f' et 'g') 
et celle marqu�e d'une croix deux ('h' et 'i').
</p>
</figcaption>
</figure>

<figure>
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0"
		data-maxigos-sgf="../_sgf/rules/connection.sgf">
</script>
<figcaption>
<p>Les quatre pierres blanches marqu�es d'une croix sont connect�es 
et ont cinq libert�s ('a', 'b', 'c', 'd', et 'e').
</p>
</figcaption>
</figure>

<h2>Capture</h2>
<p class="important">
Si un joueur supprime la derni�re libert� de
pierres adverses, il les capture en les retirant de la grille. 
De plus, il ne doit pas supprimer la derni�re libert�
de ses propres pierres, 
sauf s'il capture au moins une pierre adverse.
</p>

<figure>
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0"
		data-maxigos-sgf="../_sgf/rules/captureSimpleBefore.sgf">
</script>
<figcaption>
<p>Si Noir joue en 'a',
il supprime la derni�re libert� des pierres blanches marqu�es d'une croix...
</p>
</figcaption>
</figure>

<figure>
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0"
		data-maxigos-sgf="../_sgf/rules/captureSimpleAfter.sgf">
</script>
<figcaption>
<p>...alors Noir, apr�s avoir pos� la pierre 1,
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
<p>Si Noir joue en 'a', il n'a pas de libert�,
mais il supprime la derni�re libert� des pierres blanches marqu�es
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
ce qui donne deux libert�s � la pierre 1 qu'il vient de jouer.</p>
</figcaption>
</figure>

<figure>
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-indices-on="0"
		data-maxigos-sgf="../_sgf/rules/suicide.sgf">
</script>
<figcaption>

<p>Si Noir joue en 'a', il supprime la derni�re libert� de ses pierres
et ne capture rien. C'est interdit.</p>
</figcaption>
</figure>

<h2>R�p�tition</h2>
<p class="important">
Un joueurs ne doit pas, en posant une pierre, ramener la grille dans un �tat identique � l'un de ceux qu'il lui
a lui-m�me d�j� donn�.
</p>

<figure>
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-indices-on="0"
		data-maxigos-sgf="../_sgf/rules/repetition1.sgf">
</script>
<figcaption>
<p>Si Noir joue en 'a', il capture la pierre marqu�e d'une croix (il lui enl�ve sa derni�re libert�).
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
<p>Une fois que Noir a jou� 1,
Blanc ne peut pas rejouer en 'b' imm�diatement
et capturer la pierre noire car dans ce cas, 
il reproduirait la situation du diagramme pr�c�dent.
</p>
</figcaption>
</figure>

<p> Blanc doit donc jouer ailleurs. 
Si Noir r�pond en jouant lui aussi ailleurs,
Blanc pourra � nouveau jouer en 'b',
puisque l'�tat de la grille aura chang�. 
Alors ce sera au tour de Noir de devoir jouer ailleurs,
et ainsi de suite,
tant qu'aucun des deux joueurs ne connecte ses pierres,
emp�chant ainsi une nouvelle capture.</p>

<h2>Fin de la partie</h2>
<p>Des intersections inoccup�ees sont
<span class="definition">entour�es</span> par un joueur
si toutes leurs voisines sont occup�es par ses pierres.</p>

<p class="important">
La partie s'arr�te lorsque les deux joueurs passent cons�cutivement. 
Ils peuvent alors retirer de la grille toutes les pierres adverses 
qu'ils sont certains de pouvoir capturer. 
Puis ils comptent leurs points qui sont le nombre d'intersections
qu'ils sont certains de pouvoir occuper 
ou entourer avec leurs pierres.<br><br>
En cas de d�saccord des joueurs sur le statut de certaines intersections, 
la partie reprend dans l'�tat o� elle s'�tait arr�t�e 
jusqu'� deux nouveaux passes cons�cutifs, sachant qu'ensuite, 
aucune des pierres encore sur la grille ne pourra �tre retir�e,
et que les points des joueurs seront le nombre d'intersections
qu'ils occupent ou entourent avec leurs pierres.<br><br>
Enfin,
Blanc re�oit des <span class="definition">points compensation</span>
(le plus souvent entre 5,5 et 7,5 points),
Noir ayant eu l'avantage de commencer.<br><br>
Le gagnant est celui qui a le plus de points.
</p>

<p>Si des intersections ne sont entour�es par aucun des joueurs,
elles sont <span class="definition">neutres</span>, 
et ne donnent de points � personne.</p>

<figure>
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-indices-on="0"
		data-maxigos-numbering-on="0"
		data-maxigos-sgf="../_sgf/rules/countG.sgf">
</script>
<figcaption>
<p>Les joueurs viennent de passer.
Blanc retire la pierre marqu�e d'une croix
qu'il est certain de pouvoir capturer.</p>
</figcaption>
</figure>

<figure>
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-indices-on="0"
		data-maxigos-sgf="../_sgf/rules/countB.sgf">
</script>
<figcaption>
<p>Noir entoure 7 intersections en haut � gauche,
6 en bas � droite, et a 26 pierres sur la grille, soit 39 points.</p>
</figcaption>
</figure>

<figure>
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-indices-on="0"
		data-maxigos-sgf="../_sgf/rules/countW.sgf">
</script>
<figcaption>
<p>Blanc entoure 8 intersections en bas � gauche,
7 en haut � droite,
et a 27 pierres sur la grille,
soit 42 points.</p>
</figcaption>
</figure>

<p>Blanc a donc 3 points de plus que Noir.
Si on lui ajoute les points de compensation (par exemple 7,5 points),
il gagne de 10,5 points.</p>

<p>Pour compter plus rapidement, on peut donner durant la partie
une pierre � l'adversaire � chaque fois que l'on passe,
obliger Blanc � passer le dernier,
et placer � la fin de la partie les pierres que l'on a captur�es
dans le territoire adverse.</p>

<p>On sera alors certain qu'il y aura autant de pierres noires
que de pierres blanches sur la grille,
et on pourra donc se contenter de ne compter
que les intersections inoccup�es restantes.</p>

<h2>Handicap</h2>
<p>Parfois on donnera un handicap � l'un des joueurs,
consistant � le laisser jouer plusieurs coups de suite en d�but de partie,
ou � modifier le nombre de points de compensation.</p>

</main>

<script src="../_js/mgosIframe.js"></script>
</body>
</html>
