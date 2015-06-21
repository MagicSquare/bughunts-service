// Generated from ./app/src/lang/BugHunts.g by ANTLR 4.5
// jshint ignore: start
var antlr4 = require('antlr4/index');
var BugHuntsListener = require('./BugHuntsListener').BugHuntsListener;
var grammarFileName = "BugHunts.g";

var serializedATN = ["\3\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\3\b&\4\2\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\3\2\3\2\3\2\3\2\7\2\21",
    "\n\2\f\2\16\2\24\13\2\3\3\3\3\5\3\30\n\3\3\4\3\4\5\4\34\n\4\3\5\3\5",
    "\5\5 \n\5\3\6\3\6\5\6$\n\6\3\6\2\2\7\2\4\6\b\n\2\2(\2\22\3\2\2\2\4\25",
    "\3\2\2\2\6\31\3\2\2\2\b\35\3\2\2\2\n!\3\2\2\2\f\21\5\4\3\2\r\21\5\6",
    "\4\2\16\21\5\b\5\2\17\21\5\n\6\2\20\f\3\2\2\2\20\r\3\2\2\2\20\16\3\2",
    "\2\2\20\17\3\2\2\2\21\24\3\2\2\2\22\20\3\2\2\2\22\23\3\2\2\2\23\3\3",
    "\2\2\2\24\22\3\2\2\2\25\27\7\3\2\2\26\30\7\7\2\2\27\26\3\2\2\2\27\30",
    "\3\2\2\2\30\5\3\2\2\2\31\33\7\4\2\2\32\34\7\7\2\2\33\32\3\2\2\2\33\34",
    "\3\2\2\2\34\7\3\2\2\2\35\37\7\5\2\2\36 \7\7\2\2\37\36\3\2\2\2\37 \3",
    "\2\2\2 \t\3\2\2\2!#\7\6\2\2\"$\7\7\2\2#\"\3\2\2\2#$\3\2\2\2$\13\3\2",
    "\2\2\b\20\22\27\33\37#"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ 'null', "'FO'", "'BA'", "'RI'", "'LE'" ];

var symbolicNames = [ 'null', 'null', 'null', 'null', 'null', "Number", 
                      "WS" ];

var ruleNames =  [ "items", "ruleFO", "ruleBA", "ruleRI", "ruleLE" ];

function BugHuntsParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

BugHuntsParser.prototype = Object.create(antlr4.Parser.prototype);
BugHuntsParser.prototype.constructor = BugHuntsParser;

Object.defineProperty(BugHuntsParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

BugHuntsParser.EOF = antlr4.Token.EOF;
BugHuntsParser.T__0 = 1;
BugHuntsParser.T__1 = 2;
BugHuntsParser.T__2 = 3;
BugHuntsParser.T__3 = 4;
BugHuntsParser.Number = 5;
BugHuntsParser.WS = 6;

BugHuntsParser.RULE_items = 0;
BugHuntsParser.RULE_ruleFO = 1;
BugHuntsParser.RULE_ruleBA = 2;
BugHuntsParser.RULE_ruleRI = 3;
BugHuntsParser.RULE_ruleLE = 4;

function ItemsContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = BugHuntsParser.RULE_items;
    return this;
}

ItemsContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ItemsContext.prototype.constructor = ItemsContext;

ItemsContext.prototype.ruleFO = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(RuleFOContext);
    } else {
        return this.getTypedRuleContext(RuleFOContext,i);
    }
};

ItemsContext.prototype.ruleBA = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(RuleBAContext);
    } else {
        return this.getTypedRuleContext(RuleBAContext,i);
    }
};

ItemsContext.prototype.ruleRI = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(RuleRIContext);
    } else {
        return this.getTypedRuleContext(RuleRIContext,i);
    }
};

ItemsContext.prototype.ruleLE = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(RuleLEContext);
    } else {
        return this.getTypedRuleContext(RuleLEContext,i);
    }
};

ItemsContext.prototype.enterRule = function(listener) {
    if(listener instanceof BugHuntsListener ) {
        listener.enterItems(this);
	}
};

ItemsContext.prototype.exitRule = function(listener) {
    if(listener instanceof BugHuntsListener ) {
        listener.exitItems(this);
	}
};




BugHuntsParser.ItemsContext = ItemsContext;

BugHuntsParser.prototype.items = function() {

    var localctx = new ItemsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, BugHuntsParser.RULE_items);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 16;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << BugHuntsParser.T__0) | (1 << BugHuntsParser.T__1) | (1 << BugHuntsParser.T__2) | (1 << BugHuntsParser.T__3))) !== 0)) {
            this.state = 14;
            switch(this._input.LA(1)) {
            case BugHuntsParser.T__0:
                this.state = 10;
                this.ruleFO();
                break;
            case BugHuntsParser.T__1:
                this.state = 11;
                this.ruleBA();
                break;
            case BugHuntsParser.T__2:
                this.state = 12;
                this.ruleRI();
                break;
            case BugHuntsParser.T__3:
                this.state = 13;
                this.ruleLE();
                break;
            default:
                throw new antlr4.error.NoViableAltException(this);
            }
            this.state = 18;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function RuleFOContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = BugHuntsParser.RULE_ruleFO;
    this.param = null; // Token
    return this;
}

RuleFOContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
RuleFOContext.prototype.constructor = RuleFOContext;

RuleFOContext.prototype.Number = function() {
    return this.getToken(BugHuntsParser.Number, 0);
};

RuleFOContext.prototype.enterRule = function(listener) {
    if(listener instanceof BugHuntsListener ) {
        listener.enterRuleFO(this);
	}
};

RuleFOContext.prototype.exitRule = function(listener) {
    if(listener instanceof BugHuntsListener ) {
        listener.exitRuleFO(this);
	}
};




BugHuntsParser.RuleFOContext = RuleFOContext;

BugHuntsParser.prototype.ruleFO = function() {

    var localctx = new RuleFOContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, BugHuntsParser.RULE_ruleFO);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 19;
        this.match(BugHuntsParser.T__0);
        this.state = 21;
        _la = this._input.LA(1);
        if(_la===BugHuntsParser.Number) {
            this.state = 20;
            localctx.param = this.match(BugHuntsParser.Number);
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function RuleBAContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = BugHuntsParser.RULE_ruleBA;
    this.param = null; // Token
    return this;
}

RuleBAContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
RuleBAContext.prototype.constructor = RuleBAContext;

RuleBAContext.prototype.Number = function() {
    return this.getToken(BugHuntsParser.Number, 0);
};

RuleBAContext.prototype.enterRule = function(listener) {
    if(listener instanceof BugHuntsListener ) {
        listener.enterRuleBA(this);
	}
};

RuleBAContext.prototype.exitRule = function(listener) {
    if(listener instanceof BugHuntsListener ) {
        listener.exitRuleBA(this);
	}
};




BugHuntsParser.RuleBAContext = RuleBAContext;

BugHuntsParser.prototype.ruleBA = function() {

    var localctx = new RuleBAContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, BugHuntsParser.RULE_ruleBA);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 23;
        this.match(BugHuntsParser.T__1);
        this.state = 25;
        _la = this._input.LA(1);
        if(_la===BugHuntsParser.Number) {
            this.state = 24;
            localctx.param = this.match(BugHuntsParser.Number);
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function RuleRIContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = BugHuntsParser.RULE_ruleRI;
    this.param = null; // Token
    return this;
}

RuleRIContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
RuleRIContext.prototype.constructor = RuleRIContext;

RuleRIContext.prototype.Number = function() {
    return this.getToken(BugHuntsParser.Number, 0);
};

RuleRIContext.prototype.enterRule = function(listener) {
    if(listener instanceof BugHuntsListener ) {
        listener.enterRuleRI(this);
	}
};

RuleRIContext.prototype.exitRule = function(listener) {
    if(listener instanceof BugHuntsListener ) {
        listener.exitRuleRI(this);
	}
};




BugHuntsParser.RuleRIContext = RuleRIContext;

BugHuntsParser.prototype.ruleRI = function() {

    var localctx = new RuleRIContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, BugHuntsParser.RULE_ruleRI);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 27;
        this.match(BugHuntsParser.T__2);
        this.state = 29;
        _la = this._input.LA(1);
        if(_la===BugHuntsParser.Number) {
            this.state = 28;
            localctx.param = this.match(BugHuntsParser.Number);
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function RuleLEContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = BugHuntsParser.RULE_ruleLE;
    this.param = null; // Token
    return this;
}

RuleLEContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
RuleLEContext.prototype.constructor = RuleLEContext;

RuleLEContext.prototype.Number = function() {
    return this.getToken(BugHuntsParser.Number, 0);
};

RuleLEContext.prototype.enterRule = function(listener) {
    if(listener instanceof BugHuntsListener ) {
        listener.enterRuleLE(this);
	}
};

RuleLEContext.prototype.exitRule = function(listener) {
    if(listener instanceof BugHuntsListener ) {
        listener.exitRuleLE(this);
	}
};




BugHuntsParser.RuleLEContext = RuleLEContext;

BugHuntsParser.prototype.ruleLE = function() {

    var localctx = new RuleLEContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, BugHuntsParser.RULE_ruleLE);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 31;
        this.match(BugHuntsParser.T__3);
        this.state = 33;
        _la = this._input.LA(1);
        if(_la===BugHuntsParser.Number) {
            this.state = 32;
            localctx.param = this.match(BugHuntsParser.Number);
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exports.BugHuntsParser = BugHuntsParser;
