var antlr4 = require('antlr4'),
    BugsHuntsLexer = require('./lang/BugHuntsLexer'),
    BugsHuntsParser = require('./lang/BugHuntsParser');

exports.parseInstructions = function (instructions, listener) {
    var chars = new antlr4.InputStream(instructions);
    var lexer = new BugsHuntsLexer.BugHuntsLexer(chars);
    var tokens = new antlr4.CommonTokenStream(lexer);
    var parser = new BugsHuntsParser.BugHuntsParser(tokens);
    var tree = parser.items();
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);
};