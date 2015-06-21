// Generated from ./app/src/lang/BugHunts.g by ANTLR 4.5
// jshint ignore: start
var antlr4 = require('antlr4/index');


var serializedATN = ["\3\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\2\b\'\b\1\4\2\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\3\2\3\2\3",
    "\2\3\3\3\3\3\3\3\4\3\4\3\4\3\5\3\5\3\5\3\6\6\6\35\n\6\r\6\16\6\36\3",
    "\7\6\7\"\n\7\r\7\16\7#\3\7\3\7\2\2\b\3\3\5\4\7\5\t\6\13\7\r\b\3\2\3",
    "\5\2\13\f\17\17\"\"(\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3\2\2\2",
    "\2\13\3\2\2\2\2\r\3\2\2\2\3\17\3\2\2\2\5\22\3\2\2\2\7\25\3\2\2\2\t\30",
    "\3\2\2\2\13\34\3\2\2\2\r!\3\2\2\2\17\20\7H\2\2\20\21\7Q\2\2\21\4\3\2",
    "\2\2\22\23\7D\2\2\23\24\7C\2\2\24\6\3\2\2\2\25\26\7T\2\2\26\27\7K\2",
    "\2\27\b\3\2\2\2\30\31\7N\2\2\31\32\7G\2\2\32\n\3\2\2\2\33\35\4\62;\2",
    "\34\33\3\2\2\2\35\36\3\2\2\2\36\34\3\2\2\2\36\37\3\2\2\2\37\f\3\2\2",
    "\2 \"\t\2\2\2! \3\2\2\2\"#\3\2\2\2#!\3\2\2\2#$\3\2\2\2$%\3\2\2\2%&\b",
    "\7\2\2&\16\3\2\2\2\5\2\36#\3\b\2\2"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

function BugHuntsLexer(input) {
	antlr4.Lexer.call(this, input);
    this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    return this;
}

BugHuntsLexer.prototype = Object.create(antlr4.Lexer.prototype);
BugHuntsLexer.prototype.constructor = BugHuntsLexer;

BugHuntsLexer.EOF = antlr4.Token.EOF;
BugHuntsLexer.T__0 = 1;
BugHuntsLexer.T__1 = 2;
BugHuntsLexer.T__2 = 3;
BugHuntsLexer.T__3 = 4;
BugHuntsLexer.Number = 5;
BugHuntsLexer.WS = 6;


BugHuntsLexer.modeNames = [ "DEFAULT_MODE" ];

BugHuntsLexer.literalNames = [ 'null', "'FO'", "'BA'", "'RI'", "'LE'" ];

BugHuntsLexer.symbolicNames = [ 'null', 'null', 'null', 'null', 'null', 
                                "Number", "WS" ];

BugHuntsLexer.ruleNames = [ "T__0", "T__1", "T__2", "T__3", "Number", "WS" ];

BugHuntsLexer.grammarFileName = "BugHunts.g";



exports.BugHuntsLexer = BugHuntsLexer;

