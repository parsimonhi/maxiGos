<?php
header ('Content-Type:text/html;charset=UTF-8');
?>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Règle française du jeu de go</title>
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
figure div.mxGlobalBoxDiv
{
	max-width:60%;
}
figure:nth-of-type(1) div.mxGlobalBoxDiv,
figure:nth-of-type(15) div.mxGlobalBoxDiv
{
	max-width:100%;
}
figure div.mxGlobalBoxDiv .mxMark.mxOnBlack
{
	stroke-width:1.5px;
}
figure div.mxGlobalBoxDiv .mxMark.mxOnWhite
{
	stroke-width:1.25px;
}
main a
{
	color:#000;
	text-decoration:none;
}
</style>
</head>
<body>
<h1>Règle française du jeu de go</h1>

<main>

<h2>Matériel</h2>

<p>Le matériel de jeu traditionnel se compose d'un
<span id="goban" class="definition">goban</span> sur lequel est tracé un quadrillage de 19x19
lignes, soit 361 intersections, et de <span id="pierre" class="definition">pierres</span>
qui sont soit noires, soit
blanches. Mais rien n'empêche les joueurs d'utiliser un autre
matériel, et en particulier des gobans de 13x13 ou
9x9 lignes pour les parties d'initiation.</p>

<p>Généralement, la distance entre deux lignes du goban
est approximativement de 24 mm dans le sens de la
longueur et de 22 mm dans le sens de la largeur : le goban
n'est donc pas tout à fait carré. Quant aux
pierres, elles sont de forme biconvexe et d'un diamètre d'environ 22
mm.</p>

<figure class="g19x19">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-sgf="../../../../_sgf/regle/grille.sgf">
</script>
<figcaption>
<span>Fig. 1</span> :
voici un goban de 19x19 lignes. Remarquez que
certains points sont renforcés. On les appelle
<span id="hoshi" class="definition">hoshi</span>.
</figcaption>
</figure>

<h2>Chaîne et libertés</h2>

<p>Deux intersections sont dites voisines quand elles sont sur la même
ligne et sans autre intersection entre elles.</p>

<figure class="g7x7">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-sgf="../../../../_sgf/regle/voisines.sgf">
</script>
<figcaption>
<span>Diag. 1</span> : 'a' et 'b' sont des intersections
voisines, mais 'b' et 'c' ne le sont pas.
</figcaption>
</figure>

<p>Deux pierres sont voisines si elles occupent des intersections voisines.</p>

<p>Une <span class="definition">chaîne</span> est un ensemble de une ou
plusieurs pierres de même couleur voisines de proche en proche.</p>

<p>Les <span class="definition">libertés</span> d'une chaîne sont les
intersections inoccupées voisines des pierres de cette chaîne.</p>

<figure class="g7x7">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-sgf="../../../../_sgf/regle/libertes.sgf">
</script>
<figcaption>
<span>Diag. 2</span> :
les quatre pierres blanches marquées d'un 'X' sont
voisines de proche en proche. Elles forment une chaîne qui a cinq
libertés : les intersections marquées par les lettres 'a',
'b', 'c', 'd', et 'e'.
</figcaption>
</figure>

<h2>Territoire</h2>

<p>Un <span class="definition">territoire</span> est un ensemble de une ou
plusieurs intersections inoccupées voisines de proche en proche, 
délimitées par des pierres de même
couleur.</p>

<figure class="g7x7">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-sgf="../../../../_sgf/regle/territoire.sgf">
</script>
<figcaption>
<span>Diag. 3</span> :
les pierres noires délimitent un territoire de 7
intersections. Notez que le bord de la grille forme une frontière
naturelle du territoire, mais on pourrait bien sûr avoir un territoire qui
ne touche pas du tout le bord (imaginez que la grille est un continent
entouré par la mer, que le bord de la grille représente le rivage,
et que les pierres représentent les frontières entre les pays de ce
continent).
</figcaption>
</figure>

<h2>Déroulement du jeu</h2>

<p class="important">Le go se joue à deux. Celui qui commence joue avec les
pierres noires et l'autre avec les blanches. À tour de rôle, les joueurs
posent une pierre de leur couleur sur une intersection inoccupée du
<a href="?chap=1#goban">goban</a> ou bien ils passent.</p>

<p>Passer sert essentiellement à indiquer à l'adversaire que l'on
considère la partie terminée.</p>

<h2>Capture</h2>

<p class="important">Lorqu'un joueur supprime la dernière liberté d'un
chaîne adverse, il la <span class="definition">capture</span> en retirant du
<a href="?chap=1#goban">goban</a> les pierres de cette chaîne. De plus, en posant
une pierre, un joueur ne doit pas construire une chaîne sans
liberté, sauf si par ce coup il capture une chaîne adverse.</p>

<p>Lorsqu'une chaîne n'a plus qu'une liberté, on
dit qu'elle est en <span id="atari" class="definition">atari</span>.</p>

<figure class="g7x7">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-sgf="../../../../_sgf/regle/priseSimple1.sgf">
</script>
<figcaption>
<span>Diag. 4</span> : 
les trois pierres blanches 'X' forment une chaîne qui est
en atari (car elle n'a plus qu'une liberté, en 'a').
</figcaption>
</figure>

<figure class="g7x7">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-sgf="../../../../_sgf/regle/priseSimple2.sgf">
</script>
<figcaption>
<span>Diag. 5</span> :
si Noir joue en 1, il supprime la dernière liberté
des pierres blanches...
</figcaption>
</figure>

<figure class="g7x7">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-sgf="../../../../_sgf/regle/priseSimple3.sgf">
</script>
<figcaption>
<span>Diag. 6</span> :
...alors Noir capture les pierres blanches
et les retire du <a href="?chap=1#goban">goban</a>.
</figcaption>
</figure>

<h2>Vie et mort</h2>

<p>De la règle de capture découle la notion de vie et de
mort : des <span class="definition">pierres mortes</span> sont des pierres
que l'on est sûr de pouvoir capturer sans y perdre par ailleurs, tandis que
des <span class="definition">pierres vivantes</span> sont des pierres que l'on ne
peut plus espérer capturer.</p>

<figure class="g7x7">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-sgf="../../../../_sgf/regle/mort.sgf">
</script>
<figcaption>
<span>Diag. 7</span> :
d'après la règle de capture, Blanc peut jouer en
'a' et prendre Noir. On dit dans ce cas que Noir n'a qu'un œil (l'intersection
'a') et qu'il est mort.
</figcaption>
</figure>

<figure class="g7x7">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-sgf="../../../../_sgf/regle/vie.sgf">
</script>
<figcaption>
<span>Diag. 8</span> :
blanc ne pouvant jouer ni en 'b', ni en 'c', il ne pourra jamais
capturer Noir. On dit alors que Noir a deux yeux (les intersections 'b' et 'c')
et qu'il est vivant.
</figcaption>
</figure>

<figure class="g7x7">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-sgf="../../../../_sgf/regle/seki.sgf">
</script>
<figcaption>
<span>Diag. 9</span> :
si Noir joue en 'd' (ou 'e'), Blanc jouera en 'e' (ou 'd') et le
capturera. De même, si Blanc joue en 'd' (ou 'e'), Noir le capturera.
Autrement dit, personne n'a intérêt à jouer en 'd' ou 'e'.
Dans ce cas, on dit que les pierres 'X' sont vivantes par
<span id="seki" class="definition">seki</span>, et que 'd' et 'e' sont des intersections
neutres.
</figcaption>
</figure>

<h2>Répétition</h2>

<p class="important">Un joueur, en posant une pierre, ne doit pas redonner au
<a href="?chap=1#goban">goban</a> un état identique à l'un de ceux qu'il lui
avait déjà donné.</p>

<p>Les diagrammes qui suivent montrent le cas de
répétition le plus simple et le plus fréquent que l'on
appelle aussi <span id="ko" class="definition">ko</span>.</p>

<figure class="g7x7">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-sgf="../../../../_sgf/regle/repetition1.sgf">
</script>
<figcaption>
<span>Diag. 10</span> :
si Noir joue en 'a', il capture la pierre blanche 'X' qui est en
<a href="?chap=5#atari">atari</a>.
</figcaption>
</figure>

<figure class="g7x7">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-sgf="../../../../_sgf/regle/repetition2.sgf">
</script>
<figcaption>
<span>Diag. 11</span> :
blanc ne peut pas rejouer immédiatement en 'b' et prendre
la pierre noire 1 qui est pourtant en <a href="?chap=5#atari">atari</a> car, sinon, il
reproduirait la situation du diagramme 10. Il doit donc jouer ailleurs. Toute
l'astuce pour Blanc consiste, avec ce coup ailleurs, à essayer de
créer une menace suffisamment grave pour que Noir ait intérêt
à y répondre immédiatement, et n'ait pas le temps de jouer
lui-même en 'b'. Si Noir répond à la menace, Blanc pourra
à nouveau jouer en 'b', puisque son coup précédent aura
changé l'état du <a href="?chap=1#goban">goban</a>. Alors ce sera au tour
de Noir de trouver une menace, et ainsi de suite, tant qu'aucun des deux joueurs
ne connecte.
</figcaption>
</figure>

<h2>Fin de la partie</h2>

<p class="important">La partie s'arrête lorsque les deux joueurs passent
consécutivement. On compte alors les points. Chaque intersection du
territoire d'un joueur lui rapporte un point, ainsi que chacune de ses pierres
encore présentes sur le <a href="?chap=1#goban">goban</a>.</p>

<p class="important">Par ailleurs, commencer est un avantage pour Noir. Aussi, dans
une partie à égalité, Blanc reçoit en échange
des points de compensation, appellés <span id="komi" class="definition">komi</span>.
Le komi est habituellement de 7 points et demi (le demi-point
sert à éviter les parties nulles).</p>

<p>Le gagnant est celui qui a le plus de points.</p>

<figure class="g9x9">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-sgf="../../../../_sgf/regle/decompte1.sgf">
</script>
<figcaption>
<span>Diag. 12</span> :
à ce stade, tous les territoires sont fermés, et aucune
de leurs frontières ne peut être capturée par l'adversaire.
C'est le moment de passer et de compter les points.
<ul>
<li>Noir a 8 points de territoire en bas à
gauche et 2 en haut à droite. Il a de plus 33 pierres sur le jeu. Son
total est de 43 points.</li>
<li>Blanc a 2 points de territoire en haut à
gauche et 9 en bas à droite. Il a de plus 27 pierres sur le jeu. Son total
est de 38 points.</li>
<li><span class="definition">Noir a donc 5 points de plus
que Blanc sur le jeu.</span> Mais si l'on tient compte du komi,
<span class="definition">Blanc gagne de 2 points et demi</span>.</li>
</ul>
</figcaption>
</figure>

<p>En pratique, afin de raccourcir les parties sans en changer le score, les joueurs
pourront, d'un commun accord, retirer du <a href="?chap=1#goban">goban</a> les pierres
mortes adverses juste avant le décompte des points, sans avoir à
rajouter les coups nécessaires à leur capture. En cas de
désaccord (ce qui est en principe exceptionnel), il suffira de continuer
à jouer jusqu'à ce que tous les litiges éventuels soient
réglés.</p>

<figure class="g9x9">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-sgf="../../../../_sgf/regle/decompte2.sgf">
</script>
<figcaption>
<span>Diag. 13</span> :
si Noir joue en 'a', il capture les pierres blanches 'X'. Si
Blanc essaie de les sauver en jouant lui-même en 'a', Noir joue en 'b' et
les capture quand même. Comme par ailleurs, tous les territoires sont
fermés, les deux joueurs passent. Puis Noir retire les pierres 'X' du jeu,
et on peut compter les points. Vérifiez que <span class="definition">Noir
gagne d'un point et demi</span>.
</figcaption>
</figure>

<p><span class="definition">Note importante</span> : en pratique, on peut utiliser
une <a href="?chap=10#MDR">méthode de décompte rapide</a> qui évite
d'avoir à déterminer le nombre des pierres qui sont sur le jeu.
Cette méthode est décrite plus loin dans ce document.</p>

<h2>Partie à handicap</h2>

<p>Parfois, on donne un <span class="definition">handicap</span> à l'un des
joueurs, consistant à laisser l'autre, qui prend Noir, jouer plusieurs
coups de suite au début de la partie. Dans ce cas, Blanc reçoit un
demi-point (toujours pour éviter les parties nulles), et un nombre de
points supplémentaires égal au nombre de coups qu'il n'a pas pu
jouer en début de partie.</p>

<figure class="g19x19">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-sgf="../../../../_sgf/regle/handicap.sgf">
</script>
<figcaption>
<span>Fig. 2</span> :
voici le début d'une partie à 9 pierres de handicap.
Noir commence par poser 9 pierres sur le jeu.
Ce n'est qu'ensuite que Blanc pose sa première pierre (le coup 1 dans cet exemple).
Traditionnellement, Noir place les pierres de handicap sur les <a href="#hoshi">hoshis</a>.
</figcaption>
</figure>

<h2 id="MDR">Méthode de décompte rapide</h2>

<p>Pour déterminer le score sans avoir à compter les pierres de
chaque couleur présentes sur le <a href="?chap=1#goban">goban</a>, on
pourra :</p>

<ul>
<li><span class="important">durant la partie, conserver les pierres que l'on a
capturées, et donner à chaque fois que l'on passe une pierre
à l'adversaire comme si elle avait été
capturée,</span></li>
<li><span class="important">à la fin de la partie, si Noir a joué le
dernier, imposer à Blanc de lui donner une pierre de plus,</span></li>
<li><span class="important">juste avant le décompte des points, placer les
pierres adverses que l'on détient dans les territoires de l'autre.</span></li>
</ul>

<p>Ainsi, à la fin, dans une partie à égalité, chacun
aura utilisé le même nombre de pierres, qui seront toutes sur le
<a href="?chap=1#goban">goban</a> : il sera donc inutile de les compter.</p>

<p>Dans une partie à n handicaps, le total des pierres noires sur le <a href="?chap=1#goban">goban</a>
sera égal au total des pierres blanches plus les
n-1 points supplémentaires. Là encore, il sera donc inutile de
compter les pierres.</p>

<p>Dans les deux cas, le vainqueur sera celui qui possèdera le plus
d'intersections inoccupées, sans oublier, dans les parties à
égalité, d'ajouter le <a href="?chap=8#komi">komi</a> au total de Blanc,
et dans les parties à handicap, d'ajouter un demi point au total du
même Blanc.</p>

<figure class="g9x9">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-sgf="../../../../_sgf/regle/decompteRapide1.sgf">
</script>
<figcaption>
<span>Diag. 14</span> :
cette partie à égalité vient juste de se
terminer, et c'est Noir qui a posé le dernier coup. Durant la partie, Noir
a capturé 5 pierres blanches, et Blanc a capturé 2 pierres noires.
Les pierres 'X' sont retirées du jeu car elles sont sures de se faire
capturer tôt ou tard.
</figcaption>
</figure>

<figure class="g9x9">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-sgf="../../../../_sgf/regle/decompteRapide2.sgf">
</script>
<figcaption>
<span>Diag. 15</span> :
première méthode de décompte pour une
partie à égalité<br><br>
On compte les intersections inoccupées et les pierres qui sont sur le jeu,
sans se préoccuper des pierres capturées.<br>
<ul><li>Noir a 23 intersections dans son territoire et
24 pierres sur le jeu.</li>
<li>Blanc a 14 intersections dans son territoire et 20
pierres sur le jeu. Blanc reçoit de plus un <a href="?chap=8#komi">komi</a> de 7
points et demi.</li>
<li>Noir gagne de (23+24)-(14+20+7,5), soit 5 points et
demi.</li></ul>
</figcaption>
</figure>

<figure class="g9x9">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-sgf="../../../../_sgf/regle/decompteRapide3.sgf">
</script>
<figcaption>
<span>Diag. 16</span> :
deuxième méthode de décompte pour une partie à égalité<br><br>
Chacun place les pierres adverses qu'il a en sa possession dans le territoire de
l'autre (les pierres 'X'). Noir a 9 pierres blanches à placer (5 pierres
capturées pendant la partie, 2 pierres retirées du jeu après
les deux passes marquant la fin de la partie, 1 pierre que Blanc lui donne car
c'est Noir qui a joué le dernier, et 1 pierre pour le passe de Blanc).
Blanc en a 5 (2 pierres capturées pendant la partie, 2 pierres
retirées du jeu après les deux passes marquant la fin de la partie,
et 1 pierre pour le passe de Noir).<br><br>
On ne compte que les intersections inoccupées restantes, sans se
préoccuper de savoir combien il y a de pierres sur le jeu.<br>
<ul><li>Noir a 18 intersections dans son territoire, et
Blanc 5.</li>
<li>On ajoute le <a href="?chap=8#komi">komi</a> de 7 points et
demi à Blanc.</li>
<li>Noir gagne de (18-(5+7,5)), soit toujours 5 points et
demi.</li>
</ul>
</figcaption>
</figure>

<figure class="g9x9">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-sgf="../../../../_sgf/regle/decompteRapide4.sgf">
</script>
<figcaption>
<span>Diag. 17</span> : 
cette partie, qui était à 3 pierres de handicap,
vient juste de se terminer. C'est Blanc qui a joué le dernier coup.
Pendant la partie, Blanc a capturé 5 pierres. Noir n'a capturé
aucune pierre blanche. Après les deux passes marquant la fin de la partie,
Blanc retire les 2 pierres noires 'X' du jeu car il est sûr de pouvoir les
capturer. On peut alors compter les points.
</figcaption>
</figure>

<figure class="g9x9">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-sgf="../../../../_sgf/regle/decompteRapide5.sgf">
</script>
<figcaption>
<span>Diag. 18</span> :
première méthode de décompte pour une partie à handicap<br><br>
On compte les intersections inoccupées et les pierres qui sont sur le jeu,
sans se préoccuper des pierres capturées.<br>
<ul><li>Noir a 28 intersections inoccupées dans
son territoire et 16 pierres sur le jeu.</li>
<li>Blanc a 16 intersections inoccupées dans son
territoire et 21 pierres sur le jeu. Blanc reçoit 2 points
supplémentaires car c'est une partie à 3 pierres de handicap, et un
demi point pour éviter les parties nulles.</li>
<li>Noir gagne de (28+16)-(16+21+2,5), soit 4 points et
demi.</li></ul>
</figcaption>
</figure>

<figure class="g9x9">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js"
		data-maxigos-sgf="../../../../_sgf/regle/decompteRapide6.sgf">
</script>
<figcaption>
<span>Diag. 19</span> :
deuxième méthode de décompte pour une
partie à handicap<br><br>
Chacun place les pierres adverses qu'il a en sa possession dans le territoire de
l'autre (les pierres 'X'). Noir a 1 pierre blanche à placer (celle qui
correspond au passe de Blanc à la fin de la partie). Blanc en a 8 (5
pierres capturées en cours de partie, 2 pierres retirées du jeu
après les deux passes marquant la fin de la partie, et 1 pierre pour un
passe de Noir).<br><br>
Ensuite, on ne compte que les intersections inoccupées restantes, sans se
préoccuper de savoir combien il y avait de pierres de handicap, ni combien
il reste de pierres sur le jeu.<br>
<ul>
<li>Noir a 20 intersections inoccupées dans
son territoire, et Blanc 15.</li>
<li>On n'ajoute qu'un demi point à Blanc pour
éviter les parties nulles.</li>
<li>Noir gagne de (20-15,5), soit toujours 4 points et
demi.</li>
</ul>
</figcaption>
</figure>

</main>

<script src="../_js/mgosIframe.js"></script>
</body>
</html>
