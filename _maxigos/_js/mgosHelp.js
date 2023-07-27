// maxiGos v8 > mgosHelp.js
if(!mxG.G.prototype.createHelp)
{
mxG.fr(" Close ","Fermer");
mxG.fr("Help","Aide");
mxG.fr("Help_Short","?");
mxG.fr("Help_Data","<h1 tabindex=\"0\">Aide</h1><h2>Principe général</h2><p>Cet outil permet d\'éditer des parties ou diagrammes de go au format sgf. Cliquez sur le goban pour y placer des pierres, des marques ou des étiquettes. Utilisez le menu pour afficher un nouveau goban, ouvrir un fichier sgf, l\'enregistrer, ou l\'envoyer par email. Utilisez la barre de navigation sous le goban pour parcourir l\'arbre des coups. Cliquer sur l'un des boutons pour effectuer une action spécifique, ou utilisez la barre d\'outils pour changer d\'action. Utilisez la boite de saisie pour commenter la position affichée sur le goban. Cliquez sur un noeud de l\'arbre pour afficher la position correspondante à ce noeud.</p><h2>Les menus</h2><h3>Le menu \"Fichier\"</h3><p>\"Nouveau\" : commence la saisie d'un nouvel arbre de coups sur un goban de n\'importe quelle taille pas forcément carré. On peut soit créer un nouvel enregistrement pour cet arbre de coups, soit ajouter l'arbre des coups à l\'enregistrement en cours (auquel cas l'enregistrement en cours contiendra plusieurs arbres de coups) afin de pouvoir éditer plusieurs parties se trouvant dans un même fichier. Cependant il faut savoir que si tel est le cas, beaucoup de lecteurs ne pourront pas lire ces parties.</p><p>\"Ouvrir\" : ouvre un fichier sgf stocké sur votre machine (ce n\'est pas toujours possible car cela dépend des machines : certains appareils mobiles en particulier ne vous permettront pas cette possibilité).</p><p>\"Fermer\" : ferme le fichier sgf en cours.</p><p>\"Enregistrer\" : enregistre votre saisie sous forme de fichier sgf sur votre machine (ce n\'est pas toujours possible car cela dépend des machines : certains appareils mobiles en particulier ne vous permettront pas cette possibilité).</p><p>\"Envoyer\" : envoie par email votre saisie sous forme de fichier sgf (utile pour les machines ne permettant pas d\'y enregistrer un fichier).</p><h3>Le menu \"Édition\"</h3><p>\"Couper\" : coupe une variation. Voir aussi le paragraphe \"Couper une variante\" ci-dessous pour plus de détails.</p><p>\"Copier\" : copie une variation. Voir aussi le paragraphe \"Copier une variante\" ci-dessous pour plus de détails.</p><p>\"Coller\" : colle une variation. Voir aussi le paragraphe \"Coller une variante\" ci-dessous pour plus de détails. <p>\"Supprimer les commentaires\" : permet de supprimer tous les commentaires du sgf.</p></p><h3>Le menu \"Affichage\"</h3><p>\"2d/3d\" : affiche le lecteur en 2d ou en 3d.</p><p>\"Étirement\" : rend le goban légèrement rectangulaire (les gobans physiques sont souvent légèrement rectangulaire).</p><p>\"Ombre des pierres\" : ajoute une ombre aux pierres (uniquement si l'affichage est en 3d).</p><p>\"Couleurs\" : permet de changer le fond du goban ou la couleur de ses lignes.</p><p>Pour le fond du goban, on peut choisir n\'importe quelle couleur css ou une image. Pour les lignes, on peut choisir n\'importe quelle couleur css.</p><p>\"Agrandir\" : agrandit la taille du goban.</p><p>\"Normal\" : ramène le goban à sa taille initiale.</p><p>\"Réduire\" : réduit la taille du goban.</p><p>\"Réinitialiser\" : réinitialise tous les paramètres modifiables via le menu \"Affichage\".</p><h3>Le menu \"Fenêtre\"</h3><p>Permet de changer le fichier sgf en cours d\'édition lorsque plusieurs fichiers sont ouverts en même temps.</p><h2>La barre de navigation</h2><p>Ses boutons permettent de se déplacer dans l\'arbre des coups.</p><p>Pour passer, il suffit de cliquer sur le bouton \"Passe\".</p><p>Il est aussi possible de naviguer en utilisant le clavier. La barre de navigation ou un de ses éléments doit avoir le focus pour que cette fonctionalité soit activée : cliquez sur la barre de navigation ou l\'un de ses éléments, ou bien utilisez la touche \"Tabulation\" pour leur donner ce focus.</p><ul><li>Touche \"Flèche gauche\": recule d\'un coup</li><li>Touche \"Flèche droite\" : place un coup</li><li>Touche \"Page précédente\" : recule de 10 coups (s\'arrête avant si un coup ayant des variations est rencontré)</li><li>Touche \"Page suivante\" : place 10 coups (s\'arrête avant si un coup ayant des variations est rencontré)</li><li>Touche \"Début\" : recule au premier coup</li><li>Touche \"Fin\" : place tous les coups</li><li>Touche \"Flèche vers le haut\" : change la variation du prochain coup (en cas de style de variation dit \"enfants\") ou la variation du coup courant (en cas de style de variation dit \"jumeaux\")</li><li>Touche \"Flèche vers le bas\" : change la variation du prochain coup (en cas de style de variation dit \"enfants\") ou la variation du coup courant (en cas de style de variation dit \"jumeaux\")</li></ul><p>Pour changer d\'arbre de coups quand plusieurs arbres sont présents dans un enregistrement, on peut se placer sur le premier coup de l\'arbre courant, puis utiliser les touches flèches vers le haut ou flèches vers le bas tout en appuyant sur la touche majuscule.</p><p>Si on donne le focus au goban en ayant cliquer dessus, on pourra utiliser les touches précédentes pour se déplacer dans l'arbre des coups.<p>Mais on peut aussi donner le focus au goban via la touche \"Tabulation\". Dans ce cas, un carré s'affiche sur l'une des intersections du goban. On peut alors utiliser les touches flèche à gauche, flèche à droite, flèche en haut, flèche en bas non pas pour se déplacer dans l\'arbre des coups, mais pour déplacer le carré, et finalement appuyer sur la touche \"Retour\" pour placer une pierre ou effectuer tout autre action selon l'outil qui est sélectionné dans la barre d'outil.</p><p>En utilisant les touches ci-dessus et les touches \"Tabulation\", \"Majuscule + Tabulation\", et \"Retour\", il est ainsi possible d\'exécuter toutes les commandes de maxiGos.</p><h2>Autres boutons</h2><p>Les boutons \"PNG\" et \"SVG\" permettent de fabriquer et afficher une image (format PNG et SVG) représentant la position affichée sur le goban. Cette image peut par exemple être utilisées comme illustration dans vos pages web. Pour l\'enregistrer sur votre machine, vous pouvez par exemple faire un clic-droit sur cette image et sélectionner dans le menu qui s'affiche \"Enregistrer l\'image sous...\".</p><p>Le bouton \"SGF\" permet d\'afficher ce qui a été saisi au format sgf (un enregistrement sgf est en fait du texte qui peut aussi être modifier via un simple éditeur de texte). On peut aussi modifier le sgf directement dans la fenêtre qui s\'affiche, ou y copier un autre sgf.</p><p>Le bouton \"Score\" permet d\'ajouter ou retirer les propriétés indiquant le score (propriétés sgf TB et TW).</p><h2>Vue partielle du goban</h2><p>Pour afficher une vue partielle du goban, cliquez sur l\'outil \"Sélection\" (un carré en pointillé dans la barre d\'outils), sélectionnez une partie du goban avec la souris ou son équivalent sur votre machine, en cliquant sur le coin supérieur gauche puis sur le coin inférieur droit de ce que vous voulez sélectionner (il n'est pas nécessaire de maintenir le bouton de la souris enfoncé pendant cette opération). Ensuite, cliquez sur l\'outil \"Vue partielle/totale\" (un petit carré à l\'intérieur d\'un grand carré dans la barre d\'outils) pour réduire le goban à la partie que vous avez sélectionnée.</p><p>Pour désélectionner la sélection sans réduire le goban, cliquez sur l\'outil \"Sélection\" lorsque celui-ci est déjà sélectionné.</p><p>Pour réafficher en entier le goban, cliquez sur l\'outil \"Vue partielle/totale\" lorsqu\'aucune sélection n\'est effectuée.</p><p>Important : la vue partielle est appliquée à partir du coup courant. Ceci veut dire que si l'on veut une vue partielle du goban pour l'ensemble d\'un arbre de coups, il faut appliquer la vue partielle via l\'outil \"Vue partielle/totale\" en étant placé sur le premier coup de cet arbre.</p><h2>Placer un coup et ajouter/retirer une pierre</h2><p>On a deux outils permettant d\'ajouter ou retirer une pierre sur le goban : l\'outil \"Placer un coup\" et l\'outil \"Ajouter/retirer une pierre\". L\'outil \"Placer un coup\" permet de placer une succession de coups éventuellement numérotés, tandis que l\'outil \"Ajouter/retirer une pierre\" permet de construire une position (ceci sert par exemple à placer des pierres de handicap ou construire la position initiale d\'un problème).</p><h3>L\'outil \"Placer un coup\"</h3><p>Lorsque l\'outil \"Placer un coup\" (une pierre noire ou blanche dans la barre d\'outils) est sélectionné, on peut placer des coups sur le goban. Si des pierres se retrouvent sans liberté, elles sont capturées automatiquement.</p><p>L\'éditeur essaie en permanence de déterminer la couleur du prochain coup qui sera placé. Il affiche alors une pierre noire ou une pierre blanche sur cet outil suivant le résultat de cette détermination.</p><p>Il est possible de changer la couleur du prochain coup qui sera posé en cliquant sur l\'outil \"Placer un coup\" lorque celui-ci est déjà sélectionné (il est donc possible d\'afficher deux coups de suite de la même couleur).</p><h3>L\'outil \"Ajouter/retirer une pierre\"</h3><p>Lorsque l\'outil \"Ajouter/retirer une pierre\" (une pierre moitié noire et moitié blanche dans la barre d\'outils) est sélectionné, on peut ajouter ou retirer des pierres sur le goban. Aucune capture n\'est effectuée. Si on clique sur une intersection inoccupée, on y ajoute une noire ou une blanche (si l\'image sur l\'outil a une demi-pierre noire à gauche, on ajoute une pierre noire, et si elle a une demi-pierre blanche à gauche, on ajoute une pierre blanche). Enfin, si on clique sur une intersection occupée, on retire la pierre qui s\'y trouve.</p><p>L\'utilisation de cet outil sur une position obtenue après avoir placé une série de coups a pour effet de réinitialiser la numérotation des coups. Les numéros des coups déjà placés sont retirés et le premier coup placé à partir de cette position aura le numéro 1.</p><p>Pour changer la couleur de la prochaine pierre qui sera posée, il suffit de cliquer sur l\'outil \"Ajouter/retirer une pierre\" lorsque celui-ci est déjà sélectionné.</p><h2>Couper une variation</h2><p>Pour couper une variation, afficher le premier coup de la variation sur le goban (en naviguant dans l\'arbre des coups via la barre de navigation, ou en cliquant sur la pierre correspondant au coup dans l\'arbre des coups lui-même), puis cliquez sur l\'outil \"Couper une branche\" (une paire de ciseaux dans la barre d\'outils).</p><h2>Copier une variation</h2><p>Pour copier une variation, afficher le premier coup de la variation sur le goban (en naviguant dans l\'arbre des coups via la barre de navigation, ou en cliquant sur la pierre correspondant au coup dans l\'arbre des coups lui-même), puis cliquez sur l\'outil \"Copier une branche\" (deux feuilles se superposant dans la barre d\'outils).</p><h2>Coller une variation</h2><p>Pour coller une variation précédemment coupée ou copiée, afficher le dernier coup précédant la variation sur le goban (en naviguant dans l\'arbre des coups via la barre de navigation, ou en cliquant sur la pierre correspondant au coup dans l\'arbre des coups lui-même), puis cliquez sur l\'outil \"Coller une branche\" (une feuille venant en superposition sur un support dans la barre d\'outils).</p><p class=\"important\">MaxiGos ne fait aucune vérification de cohérence de ce qui sera collé.</p><p>Cette fonction peut être utile quand on s\'aperçoit a posteriori qu\'on a oublié de placer un échange de coups. Il convient alors d\'aller au coup suivant l\'échange, couper la branche, placer les coups manquants, et coller la branche précédemment coupée.</p><p>Cette fonction peut aussi être utile quand on s\'aperçoit a posteriori qu\'on a placé un échange de coups en trop. Il convient alors d\'aller au coup suivant l\'échange, copier la branche, revenir au coup précédent l\'échange, coller la branche précédemment copiée, revenir sur le premier coup de l\'échange à supprimer et couper la branche qui ne contient alors plus que les deux coups de cet échange.</p><h2>Marques et étiquettes</h2><p>Pour ajouter ou retirer une marque ou étiquette, sélectionnez l\'un des outils \"Etiquette\" (une lettre dans la barre d\'outils), \"Marque\" (une croix dans la barre d\'outils), \"Triangle\" (une triangle dans la barre d\'outils), \"Cercle\" (un cercle dans la barre d\'outils) ou \"Carré\" (un carré dans la barre d\'outils), puis cliquez sur l\'intersection où vous souhaitez l\'ajouter ou la retirer. Il est possible de changer le texte de la prochaine étiquette qui sera placée en cliquant sur l\'outil \"Etiquette\", et en entrant au clavier les caractères souhaités. L\'étiquette peut être constituée de plusieurs caractères, mais en pratique, il est préférable de se limiter à des étiquettes de un à trois caractères.</p><h2>Autres outils</h2><h3>L\'outil \"Numérotation\"</h3><p>L\'outil \"Numérotation\" (la pierre numérotée dans la barre d\'outils) permet d\'afficher ou cacher la numérotation des pierres placées à l\'aide de l\'outil \"Placer un coup\".</p><p>On peut ne modifier la numérotation qu\'à partir de la position courante si on le souhaite. Bien qu\'en théorie, on puisse le faire à n\'importe quel coup, il est conseillé de ne le faire qu\'en début de variation.</p><p>On peut aussi via cet outil afficher ou non les indices, et afficher ou non les pierres capturées \"comme dans les livres\".</p><h3>L\'outil \"Entête\"</h3><p>L\'outil \"Entête\" (\"E\" dans la barre d\'outils), permet d\'afficher un formulaire de saisie des propriétés d\'entête des fichiers sgf (évènement, ronde, nom de noir, niveau de noir, nom de blanc, niveau de blanc, ...).</p><h3>L\'outil \"Comme dans les livres\"</h3><p>L\'outil \"Comme dans les livres\" (\"L\" dans la barre d\'outils) permet de changer le mode d\'affichage des pierres capturées. Soit on affiche le goban tel qu\'il serait en partie réelle, soit on affiche le goban en laissant les pierres capturées par des coups numérotés comme dans les livres. Pour passer de l\'un à l\'autre mode, il suffit de cliquer sur l\'outil.</p><p>Note : quand aucune pierre numérotée n\'est visible, cet outil est sans effet.</p><h3>L\'outil \"Indices\"</h3><p>L\'outil \"Indices\" (\"I\" dans la barre d\'outils) permet d\'afficher ou cacher des indices autour du goban. En cas de découpe du goban, les indices ne sont affichés que sur les bords visibles. En cas de sélection d\'une partie du goban contenant des bords avec des indices, ceux-ci sont ajoutés automatiquement à la sélection.</p><h3>L\'outil \"Marque sur les variations\"</h3><p>L\'outil \"Marque sur les variations\" (\"V\" dans la barre d\'outils) permet d\'afficher ou cacher les marques sur les variations. Ces marques sont là uniquement pour vous aider à visualiser la liste des variations possibles à partir d\'une position donnée. Il ne faut pas y faire référence dans le commentaire car elles peuvent ne pas être affichables ou avoir des libellés différents d\'un logiciel à l\'autre. Lorsque vous avez besoin de faire référence à une intersection dans le commentaire, placez plutôt sur le goban des marques et étiquettes à l\'aide de l\'un des outils \"Etiquette\", \"Marque\", \"Triangle\", \"Cercle\" ou \"Carré\", ou éventuellement utilisez les indices sur le pourtour du goban. Lorsqu\'une intersection a à la fois une marque de variation et une marque ou étiquette placée à l\'aide de l\'un des outils \"Etiquette\", \"Marque\", \"Triangle\", \"Cercle\" ou \"Carré\", c\'est cette dernière qui est affichée.</p><h3>L\'outil \"Style\"</h3><p>L\'outil \"Style\" (\"S\" dans la barre d\'outils) permet de changer le style d\'affichage des variations. Soit on affiche les alternatives au coup courant, soit on affiche les alternatives pour le coup suivant. Pour voir les marques sur les variations, n\'oubliez pas d\'activer aussi le mode \"Marque sur les variations\".</p><h3>Les outils d\'annotation</h3><p>Ils permettent d\'ajouter des annotations diverses au coup courant (propriétés sgf GB, GW, DM, UC, TE, BM, DO et IT).</p><h3>L\'outil \"Trait\"</h3><p>L\'outil \"Trait\" (\"T\" dans la barre d\'outils) permet d\'indiquer qui a le trait au coup suivant (propriété sgf PL). On l'utilisera en particulier quand le sgf représente la position initiale d'un problème, et qu\'aucun coup suivant n\'est spécifié.</p><h3>Les outils de tranformation</h3><p>Ils permettent d\'effectuer une rotation, une symétrie verticale ou une symétrie horizontale du goban.</p><h2>L\'arbre des coups</h2><p>Il permet de visualiser l\'ensemble des coups (en cliquant sur une pierre de l\'arbre, le coup correspondant est affiché sur le goban).</p><p>Pour se déplacer dans l\'arbre des coups via la navigation clavier, donnez plutôt le focus à la barre de navigation. Car lorsque l\'arbre des coups a le focus, les touches flèches à gauche, flèche à droite, flèche en haut, flèche en bas servent déjà à faire défiler le contenu de cet arbre.</p>");
mxG.en("Help_Short","?");
mxG.en("Help_Data","<h1 tabindex=\"0\">Help</h1><h2>Overview</h2><p>With this tool you can edit go games or diagrams in sgf format.</p><h2>Menus</h2><h3>\"File\" menu</h3><p>Use it to create, open, save or send by email a sgf file.</p><p>\"New\": display a goban of any size (not necessarily a square). You can either create a move tree in a new record, or add a move tree to the current record (in which case the current record will contain several move trees).</p><p>\"Open\": open a sgf file stored on your device (not always possible with some devices).</p><p>\"Close\": close the current sgf file.</p><p>\"Save\": save what you edit in a sgf file on your device (not always possible with some devices).</p><p>\"Send\": send by email what you edit (useful if you cannot save what you edit on your device).</p><h3>\"Edit\" menu</h3><p>\"Cut\", \"Copy\" or \"Paste\" a branch of a game tree (see also \"Cut a branch\", \"Copy a branch\" and \"Paste a branch\" below).</p><p>\"Remove comments\" remove all the comments from the sgf record.</p><h3>\"View\" menu</h3><p>Change view (2d/3d effect, stretching, stone shadow, colors, zoom or reset all the settings done using the view menu).</p><p>For the goban lines, on can set any css color.</p><h3>\"Window\" menu</h3><p>Change the current sgf file.</p><h2>Navigation bar</h2><p>Click on the buttons of the Navigation bar to navigate in the game tree.</p><p>Click on the \"Pass\" button to pass.</p><p>It is also possible to navigate using the keyboard. The focus has to be on the Navigation bar or one of its elements in order to activate this feature: click on an element of the Navigation bar or use the tab key to give the focus to the navigation bar.</p><ul><li>Left arrow key: back one move</li><li>Right arrow key: place one move</li><li>Page down key: back ten moves of the current variation or go to the previous move that has a variation</li><li>Page up key: place ten moves of the current variation or go to the next move that has a variation</li><li>Home key: back to first move</li><li>End key: place all moves</li><li>Top arrow key: change next move variation (if children variation style) or current move variation (if siblings variation style)</li><li>Bottom arrow key: change next move variation (if children variation style) or current move variation (if siblings variation style)</li></ul><p>To change the move tree when several move trees are present in a recording, go to the first move of the current tree, then use the up or down arrow keys while pressing the shift key.</p><p>If one gives focus to the goban by having clicked on it, one can use the previous keys to move in the move tree.</p><p>But you can also give focus to the goban via the \"Tabulation\" key. In this case, a square is displayed on one of the intersections of the goban. We can then use the left arrow, right arrow, up arrow, down arrow keys not to move in the move tree, but to move the square, and finally press the \"Return\" key to place a stone or perform any other action depending on the tool that is selected in the toolbar.</p><p>Note that using above keys, tab key, shift + tab key, and return key, it is possible to execute all maxiGos commands including placement of a stone on the go board.</p><h2>Other buttons</h2><p>\"PNG\" anf \"SVG\" buttons: to display a png or svg image of the current position. This image can for example be used as an illustration in your web pages. To save it on your machine, you can right-click on this image and select in the menu that appears \"Save image as...\".</p><p>\"Sgf\" button: to display and edit the sgf.</p><p>\"Score\" button: to add or remove sgf territory properties (sgf properties TB and TW).</p><h2>Partial view of the goban</h2><p>To display a part of the goban only, click on the \"Selection\" tool (a dashed square in the tool bar), select it with the mouse (ot its equivalent) by clicking on its top left and bottom right corners. (it is not necessary to keep the mouse button down between the two clicks). Then click on the \"Partial/full view\" tool (a small square inside a bigger one in the tool bar) to finish the job.</p><p>To unselect the selection, click on the \"Selection\" tool again.</p><p>To display the full goban again, click on the \"Partial/full view\" tool when no part of the goban is selected.</p><p>Important: the partial view is applied from the current move. This means that if you want a partial view of the goban for the whole of a move tree, you must apply the partial view via the \"Partial/total view\" tool while being placed on the first move of the move tree.</p><h2>Place a move or add/remove a stone</h2><p>There are two tools that allow to add/remove stones on the goban: \"Place a move\" and \"Add/remove a stone\" tools.</p></p><h3>\"Place a move\" tool</h3><p>The \"Place a move\" tool (a black stone or white stone in the tool bar) allows to place a serie of moves possibly numbered.</p><p>If some stones are without liberty, they are removed automatically from the goban.</p><p>The editor tries to guess what will be the color of the next move, and changes the color of the stone displayed in the tool accordingly.</p><p>To change the color of the next move, just click again on the \"Place a move\" tool (thus it is possible to place two moves of the same color in succession).</p><h3>\"Add/remove a stone\" tool</h3><p>The \"Add/remove a stone\" tool (a half white/half black stone) allows to add or remove a stone from the goban to setup a position (for instance to place handicap stones or setup the initial position of a problem).</p><p>The color of the next stone will be the color of the left half of the tool. If one clicks on an occupied intersection, the stone is removed.</p><p>To change the color of the next stone, just click again on the \"Add/remove a stone\" tool.</p><p>Warning: the numerotation restarts to 0 when such a stone is added.</p><h2>Cut/copy/paste a branch</h2><p>One can cut/copy/paste a branch of the tree when one of the \"Cut a branch\", \"Copy a branch\" or \"Paste a branch\" tool is selected.</p><p>MaxiGos does no consistency checking of what will be pasted.</p><p>These tools can be useful when you realize a posteriori that you forgot to place some moves. It is then necessary to go to the move following the missing moves, cut the branch, place the missing moves, and paste the previously cut branch.</p><p>These tools can also be useful when you realize a posteriori that you have placed some unwanted moves. It is then necessary to go to the move following the unwanted moves, copy the branch, return to the move preceding the unwanted moves, paste the previously copied branch, return to the first unwanted move and cut the branch which does not then contain more than the unwanted moves.</p><h2>Marks and labels</h2><p>Click on one of the \"Label\" (a letter in the tool bar), \"Mark\" (a cross in the tool bar), \"Triangle\" (a triangle in the tool bar), \"Circle\" (a circle in the tool bar) or \"Square\" (a square in the tool bar) tools, then click on an intersecion to add/remove the corresponding mark or label. The next label that will be add is incrementing automatically (from \"A\" to \"Z\", ...), but can be force to any text by clicking on the \"Label\" tool and replacing the letter in it.</p><h2>Other tools</h2><h3>\"Numbering\" tool</h3><p>The \"Numbering\" tool (a numbered stone in the tool bar) shows/hides numbering.</p><h3>\"Header\" tool</h3><p>The \"Header\" tool (\"H\" in the tool bar) allows to edit game information properties (event, round, name of black player, name of white player, ...).</p><h3>\"As in book\" tool</h3><p>The \"As in book\" tool (\"K\" in the tool bar) adds/removes captured stones on the goban as in book/as in real life.</p><h3>\"Indices\" tool</h3><p>The \"Indices\" tool (\"I\" in the tool bar) shows/hides indices arround the goban.</p><h3>\"Mark on variation\" tool</h3><p>The \"Mark on variation\" tool (\"V\" in the tool bar) shows/hides mark on variation.</p><h3>\"Style\" tool</h3><p>The \"Style\" tool (\"S\" in the tool bar) changes variation style. One can display variations of the current move (siblings mode) or variations of the next move (children mode). To see corresponding variation marks, don\'t forget to enable \"Mark on variation\" mode too.</p><h3>Annotation tools</h3><p>They add various annotations to the current move (sgf properties GB, GW, DM, UC, TE, BM, DO and IT).</p><h3>\"Turn\" tool</h3><p>The \"Turn\" tool (\"T\" in the tool bar) allows to indicate the turn for the next move (PL sgf property).</p><h3>Transform tools</h3><p>They make a rotation, a vertical symmetry or an horizontal symmetry of the goban.</p><h2>Tree</h2><p>It allows to see all the nodes of the game tree (by clicking on a stone of the tree, one returns to the position when the corresponding move was played).</p><p>To move in the tree via keyboard navigation, give focus to the navigation bar instead. Because when the move tree has the focus, the left arrow, right arrow, up arrow, down arrow keys are already used to scroll the contents of this tree.</p>");
mxG.G.prototype.doHelp=function()
{
	this.doDialog("ShowHelp",this.local("Help_Data"),[{n:" Close "}]);
};
mxG.G.prototype.initHelp=function()
{
	if(this.helpBtnOn)
		this.addBtn(this.getE("HelpDiv"),{n:"Help",v:this.alias("Help","helpAlias")});
};
mxG.G.prototype.createHelp=function()
{
	this.helpBtnOn=this.setA("helpBtnOn",0,"bool");
	this.helpAlias=this.setA("helpAlias",null,"string");
	return this.helpBtnOn?this.createBtnBox("Help"):"";
};
}
