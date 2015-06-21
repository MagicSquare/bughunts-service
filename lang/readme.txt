Tiré du site : https://theantlrguy.atlassian.net/wiki/display/ANTLR4/Getting+Started+with+ANTLR+v4

Etape 1 : installation de antlr
- Récupérer antlr-4.5-complete.jar et mettez le dans <VOTRE REPERTOIRE>
- initialisez vos variables d'environnement
export CLASSPATH=".:<VOTRE REPERTOIRE>/antlr-4.5-complete.jar:$CLASSPATH"
alias antlr4=java -Xmx500M -cp <VOTRE REPERTOIRE>/antlr-4.5-complete.jar: org.antlr.v4.Tool
alias grun=java org.antlr.v4.runtime.misc.TestRig

Etape 2 : compiler la grammaire
- récupérer le fichier de grammaire "BugHunts.g" et mettez le dans <VOTRE REPERTOIRE>
- lancez la commande "antlr4 BugHunts.g". Cela devrait générer des fichiers .java
- compilez tous les fichiers java "javac BugHunts*.java"
- lancez le programme de demo : "java BugHuntsDemo 'FO 34 FO FO 56777 BA RI'"
