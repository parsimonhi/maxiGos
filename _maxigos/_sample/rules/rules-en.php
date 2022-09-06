<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>French rules of go</title>
<style>
body {font-family:serif;margin:0;padding:1px;}
p, th, td, li, div {text-align: justify;}
h1 {text-align:center;color: #900;}
h2 {color: #900;margin:0;padding:0.5em 0;}
span.definition {color: #900;font-weight: bold;}
p.important {font-weight: bold;}
section.page
{
	max-width:1111px;
	margin:5em auto;
	padding:0.5em;
	-webkit-column-count:3;
	   -moz-column-count:3;
	        column-count:3;
	-webkit-column-rule-style:solid;
	   -moz-column-rule-style:solid;
	        column-rule-style:solid;
}
table.diagramCard td.diagram
{
	width:50%;
}
table.figureCard td.figure
{
	width:50%;
}
h2
{
	-webkit-column-break-after:avoid;
	        break-after:avoid-column;
}
table {
	-webkit-column-break-inside: avoid;
	               break-inside: avoid;
}
@media (max-width:1110px)
{
	section.page
	{
		-webkit-column-count:2;
		   -moz-column-count:2;
		        column-count:2;
	}
}
@media (max-width:699px)
{
	section.page
	{
		-webkit-column-count:1;
		   -moz-column-count:1;
		        column-count:1;
	}
}
</style>
</head>
<body>
<h1>French rules of go</h1>

<main>

<section class="page">
<h2>Introduction</h2>
<p>The game of go originated in China several thousand years ago. It has been played
in Japan for 1200 years, but has spread to the West only recently. The aim of the
game is to form territories by using the simplest equipment: a board, called a
<b>goban</b>, on which a grid is drawn, and pieces, called <b>stones</b>, which are
placed on the intersections of this grid in alternate turns. The rules can be learnt
in a few minutes and allow beginners swiftly to enjoy thrilling games. Anyone who
would then like to explore the subtleties of the game can join a club or enter
tournaments. They will then be able to observe that, beneath its apparent simplicity,
which makes it accessible to even the youngest players, the game of go is an
inexhaustible treasure trove. In the meantime, these few pages will guide them on
their first steps.</p>

<h2>Equipment</h2>
<p>Traditional equipmemt comprises a goban on which is drawn a grid of 19x19 lines,
forming 361 intersections, and stones which are either black or white. But there is
nothing to prevent players from using other equipment, in particular gobans of 13x13
or 9x9 lines for beginners' games.</p>

<p>In general, the space between two lines on the goban is about 24mm in the lengthwise
direction and 22mm across. The goban is thus not quite square. In the case of the
stones, they are biconvex and have a diameter of about 22mm.</p>

<table class="diagramCard"><tr>
<td class="diagram"><script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0" data-maxigos-points-num-max="0">
../_sgf/rules/grid.sgf</script></td>
<td><p class="diagramText">
	Here is a goban of 19x19 lines. Note that some points are emphasised. These are
	called <b>hoshi</b>.
</p></td></tr></table>

<h2>Chain and liberties</h2>
<p>Two intersections are said to be adjacent when they are on the same line and there
is no other intersection between them.</p>

<table class="diagramCard"><tr>
<td class="diagram"><script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0" data-maxigos-points-num-max="0">../_sgf/rules/adjacent.sgf</script></td>
<td><p class="diagramText">
	Diag. 1: 'a' and 'b' are adjacent intersections, but 'b' and 'c' are not.
</p></td></tr></table>

<p>Two stones are adjacent if they occupy adjacent intersections.</p>

<p>A <b>chain</b> is a group of one or several stones adjacent one to another of the same
colour.</p>

<p>The <b>liberties</b> of a chain are the empty intersections adjacent to the stones of that
chain.</p>

<table class="diagramCard"><tr>
<td class="diagram"><script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0" data-maxigos-points-num-max="0">../_sgf/rules/connection.sgf</script></td>
<td><p class="diagramText">
	Diag. 2: The four white stones marked X are adjacent one to another.
	They form a chain that has five liberties: the intersections marked by the
	letters 'a', 'b', 'c', 'd' and 'e'.
</p></td></tr></table>

<h2>Territory</h2>
<p>A <b>territory</b> is a group of one or several adjacent empty intersections in close
proximity and bordered by stones of the same colour.</p>

<table class="diagramCard"><tr>
<td class="diagram"><script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0" data-maxigos-points-num-max="0">
../_sgf/rules/territory.sgf
</script></td>
<td><p class="diagramText">
	Diag. 3: The black stones border a territory of 7 intersections. Note that
	the edge of the grid forms a natural border to the territory, but it is
	perfectly possible to have a territory that does not touch the edge of the
	board (imagine that the grid is a continent surrounded by the sea, that the
	edge of the board represents the shore, and that the stones represent the
	frontiers between the countries on this continent).
</p></td></tr></table>

<h2>Progress of the game</h2>
<table> <tr><td>
<b>Go is played by two players. The player who starts the game plays with the black
stones and the other with the white stones. Taking turns, the players place a stone
of their own colour on an empty intersection of the goban, or else they pass.
</b></td></tr>
</table>

<p>Passing is essentially a way to indicate to the other player that you consider the
game to be over.</p>

<h2>Capture</h2>
<table> <tr><td><b>When a player fills in the last liberty of an enemy chain, he captures it by
removing the stones in that chain from the goban. Further, when placing a stone, a
player must not form a chain with no liberties, except if, in doing so, he captures
an enemy chain.
</b></td></tr>

</table>

<p>When a chain has only one liberty, it is said to be in <b>atari</b>.</p>

<table class="diagramCard"><tr>
<td class="diagram"><script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0" data-maxigos-points-num-max="0">../_sgf/rules/captureSimpleBefore.sgf</script></td>
<td><p class="diagramText">
Diag. 4: The three white stones X form a chain which is in atari (because it has only
one liberty, at 'a').
</p></td></tr></table>

<table class="diagramCard"><tr>
<td class="diagram"><script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0" data-maxigos-points-num-max="0">../_sgf/rules/captureSimpleDuring.sgf</script></td>
<td><p class="diagramText">
Diag. 5: If Black plays at 1, he fills in the last liberty of the white
stones...</p></td>
</tr></table>

<table class="diagramCard"><tr>
<td class="diagram"><script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0" data-maxigos-points-num-max="0">../_sgf/rules/captureSimpleAfter.sgf</script></td>
<td><p class="diagramText">
Diag. 6: ... and so Black captures the white stones and removes them from the
goban.</p></td>
</tr></table>

<h2>Life and death</h2>
<p>From the capture rule flows the concept of life and death: dead stones are stones
which a player is certain of being able to capture without losing anything elsewhere,
whereas live stones are stones that a player no longer has any hope of capturing.</p>

<table class="diagramCard"><tr>
<td class="diagram">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0" data-maxigos-points-num-max="0">
../_sgf/rules/death.sgf
</script></td>
<td><p class="diagramText">
Diag. 7: According to the capture rule, White can play at 'a' and take Black. In this
case it is said that Black has only one eye (the intersection 'a') and that he is
dead.
</p></td></tr></table>

<table class="diagramCard"><tr>
<td class="diagram">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0" data-maxigos-points-num-max="0">
../_sgf/rules/life.sgf
</script></td>
<td><p class="diagramText">
Diag. 8: White is unable to play at either 'b' or 'c' and so he can never capture
Black. Black is said to have two eyes (the intersections 'b' and 'c') and to be
alive.
</p></td></tr></table>

<table class="diagramCard"><tr>
<td class="diagram"><script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0" data-maxigos-points-num-max="0">../_sgf/rules/seki.sgf</script></td>
<td><p class="diagramText">
Diag. 9: If Black plays at 'd' (or 'e'), White will play at 'e' ( or 'd') and capture
him. Likewise, if White plays at 'd' (or 'e') Black will capture him. In other words,
neither player has any interest in playing at 'd' or 'e'. In this case, the stones
X are said to be alive in <b>seki</b>, and 'd' and 'e' are said to be neutral
intersections.
</p></td></tr></table>

<h2>Repetition</h2>
<table>
<tr><td><b>When placing a stone, a player must not restore the goban to a state identical to any state he had created before.</b></td></tr>
</table>

<p>The following diagrams show the simplest and commonest case of repetition, which
happens to be called <b>ko</b>.</p>

<table class="diagramCard"><tr>
<td class="diagram"><script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0" data-maxigos-points-num-max="0">../_sgf/rules/repetition1.sgf</script></td>
<td><p class="diagramText">
Diag. 10: If Black plays at 'a', he captures the white stone X which is in atari.
</p></td></tr></table>

<table class="diagramCard"><tr>
<td class="diagram"><script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0" data-maxigos-points-num-max="0" data-maxigos-as-in-book-on="0">../_sgf/rules/repetition2.sgf</script></td>
<td><p class="diagramText">
Diag. 11: White cannot play back at 'b' immediately and take the black stone 1,
	even though it is in atari, because otherwise he would be reproducing the
	position of Diagram 10. He must therefore play elsewhere. The shrewd thing
	for White to do, with his move elsewhere, is to try to create a threat
	sufficiently serious for Black to be keen to respond to it immediately and so
	not have time to play at 'b' himself. If Black responds to the
	threat, White will now be able to play at 'b', since his previous move will have
	altered the state on the goban. Then it will be Black's turn to find a threat,
	and so on, so long as neither player connects.
</p></td></tr></table>

</section>
<section class="page">

<h2>End of the game</h2>

<table>
<tr><td><p><b>The game stops when the two players pass one after the other. The points are then
counted up. Each intersection in a player's territory earns him a point, as does each
of his stones still present on the goban.</b></p>

<p>It so happens that it is an advantage for Black to play first. Therefore, in an even
game, White also receives, by way of compensation, points called <b>komi</b>. Komi is
normally 7 and a half points (the half point is used to avoid drawn games).</p>

The winner is the one with more points.
</td></tr>

</table>

<table class="diagramCard"><tr>
<td class="diagram"><script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0" data-maxigos-points-num-max="0">../_sgf/rules/count1.sgf</script></td>
<td><p class="diagramText">
	Diag. 12: At this stage, all the territories have been closed off, and none of
	the borders can be captured by the opponent. This is the time to pass and to
        count up the points.<br/>

	* Black has 8 points of territory in the lower left and 2 in the upper right.
	He also has 33 stones on the board. His total is 43 points.<br/>
	* White has 2 points of territory in the upper left and 9 in the lower right.
	He also has 27 stones on the board. His total is 38 points.<br/>
	* <b>Black thus has 5 points more than White.</b> But if account is taken of the
	komi,
	<b>White wins by 2 and a half.</b>
</p></td></tr></table>

<p>In practice, in order to shorten games without altering the score, the players may,
by mutal agreement, remove dead enemy stones from the goban just before counting up the
points, without having to add the moves necessary to capture them. In case of
disagreement (which is almost always exceptional), it is sufficient to continue the
game until all the possible disputes are settled.</p>

<table class="diagramCard"><tr>
<td class="diagram"><script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0" data-maxigos-points-num-max="0">../_sgf/rules/count2.sgf</script></td>
<td><p class="diagramText">
Diag. 13: If Black plays at 'a', he captures the white stones X. If White tries
	to save them by playing at 'a' himself, Black plays at 'b' and captures them
	anyway. Since, as it happens, all the territories have been closed off, the two
	players pass. Black then removes the stones X from the board, and the points
	are counted up. Confirm that <b>Black wins by a point and a half</b>.
</p></td></tr></table>

<p><b>Important note:</b> in practice, it is possible to use a quick method of counting up which
avoids having to determine the number of stones that are on the board. This method is
described later in this document.</p>

<h2>Handicap game</h2>
<p>Sometimes, a <b>handicap</b> is imposed on one of the players by letting the other, who takes
Black, play several moves in succession at the start of the game. In this case, White
receives a half-point (again to avoid drawn games) and a number of extra points equal
to the number of moves that he was unable to play at the start of the game.</p>

<table class="diagramCard"><tr>
<td class="diagram">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0" data-maxigos-points-num-max="0">
../_sgf/rules/handicap.sgf
</script></td>
<td><p class="diagramText">
Here is the start of a 9-stone handicap game. Black begins by placing 9 stones on the
board. Only then does White place his first stone (move 1 in this example). By
tradition, Black places the handicap stones on the <b>hoshis</b>.
</p></td></tr></table>

<h2>Quick method of counting up</h2>
<p>To determine the score without having to count up the stones of each player still on
the goban, it is possible:</p>

<p><b>	* during the game, to keep the stones you have captured and to give a stone to
	the opponent whenever you pass, as if it had been captured;<br/>
	* at the end of the game, if Black has played last, force White to give him
	an extra stone;<br/>
	* just before counting up the points, place the enemy stones you hold inside
	the other player's territories.<br/>
</b></p>

<p>In this way, in an even game, each player will at the end have used the same number of
stones, which will all be on the goban; there will be no need to count them.</p>

<p>In a game with n handicap stones, the total of black stones on the goban will be equal
to the total of white stones plus the n-1 extra points. So again there will be no need
to count up the stones.</p>

<p>In these two cases, the winner will be whoever has the most empty intersections, not
forgetting, in even games, to add the komi to the White total, and in handicap games
likewise to add a half point to the White total.</p>


<table class="diagramCard"><tr>
<td class="diagram">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0" data-maxigos-points-num-max="0">
../_sgf/rules/countQuick1.sgf
</script></td>
<td><p class="diagramText">
Diag. 14: This even game has just finished, and it is Black who has made the
	last move. During the game, Black captured 5 white stones, and White captured
	2 black stones. The stones marked X are removed from the board because they
	are bound to be captured sooner or later.
</td></tr></table><p>

<table class="diagramCard"><tr>
<td class="diagram">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0" data-maxigos-points-num-max="0">
../_sgf/rules/countQuick2.sgf
</script></td>
<td><p class="diagramText">
Diag. 15: First method of counting up in an even game<br/>

	The empty intersections and the stones that are on the board are counted up,
	the captured stones being ignored.<br/>

	* Black has 23 intersections in his territory and 24 stones on the board.<br/>
	* White has 14 intersections in his territory and 20 stones on the board.<br/>
	White receives in addition a komi of 7 points and a half.<br/>
	* Black wins by (23+24)-(14+20+7.5), or 5 points and a half.<br/>
</td></tr></table><p>

<table class="diagramCard"><tr>
<td class="diagram">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0" data-maxigos-points-num-max="0">
../_sgf/rules/countQuick3.sgf
</script></td>
<td><p class="diagramText">
Diag. 16: Second method of counting up in an even game<p>

	Each player puts the enemy stones in his possession inside the territory of the
	other (the stones marked X). Black has 9 white stones to place (5 stones
	captured during the game, 2 stones removed from the board after the two
	passes signifying the end of the game, 1 stone that White has given him because
	Black played last, and 1 stone for the pass by White). White has 5 (2 stones
	captured during the game, 2 stones removed from the board after the two passes
	signifying the end of the game, and 1 stone for the pass by Black).<br/>

	Only the remaining empty intersections are counted up, with no need to know
	how many stones are on the board.<p>

	* Black has 18 intersections inside his territory, and White 5.<br/>

	* White adds the komi of 7 and a half points.<br/>
	* Black wins by (18-(5+7.5), or again 5 points and a half.<br/>
</td></tr></table><p>

<table class="diagramCard"><tr>
<td class="diagram">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0" data-maxigos-points-num-max="0">
../_sgf/rules/countQuick4.sgf
</script></td>
<td><p class="diagramText">
Diag. 17: This game, which was at three stones handicap, has just finished.
	White played the last move. During the game, White captured 5 stones. Black
	captured no white stones. After the two passes signifying the end of the game,
	White removes the 2 black stones X from the board because he is bound to be
	able to capture them. The points can then be counted up.
</td></tr></table><p>

<table class="diagramCard"><tr>
<td class="diagram">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0" data-maxigos-points-num-max="0">
../_sgf/rules/countQuick5.sgf
</script></td>
<td><p class="diagramText">
Diag. 18: First method of counting up in a handicap game<p>

	The empty intersections and the stones that are on the board are counted up,
	the captured stones being ignored.<p>

	* Black has 28 empty intersections in his territory and 16 stones on the
	board.<br/>
	* White has 16 empty intersections in his territory and 21 stones on the board.
	White receives two extra points because it is a three-stone handicap game, and
        a half point to avoid drawn games.<br/>
	* Black wins by (28+16)-(16+21+2.5), or 4 points and a half.<br/>
</td></tr></table><p>

<table class="diagramCard"><tr>
<td class="diagram">
<script src="../minimalist/_alone/maxigos-minimalist-diagram.js" data-maxigos-indices-on="0" data-maxigos-points-num-max="0">
../_sgf/rules/countQuick6.sgf
</script></td>
<td><p class="diagramText">
	Diag. 19: Second method of counting up in a handicap game<p>

	Each player puts the enemy stones in his possession inside the territory of the
	other (the stones marked X). Black has 1 white stone to place (which corresponds
	to the pass by White at the end of the game). White has 8 (5 stones
	captured in the course of the game, 2 stones removed from the board after the two passes
	signifying the end of the game, and 1 stone for the pass by Black).<p>

	Then only the remaining empty intersections are counted up, with no need to know
	how many handicap stones there were nor how many stones remain on the board.<p>

	* Black has 20 empty intersections inside his territory, and White 15.<br/>
	* White adds only half a point to avoid drawn games.<br/>

	* Black wins by (20-15.5), or again 4 points and a half.<br/>
</td></tr></table><p>

</section>

</main>

<script src="../_js/mgosIframe.js"></script>
</body>
</html>