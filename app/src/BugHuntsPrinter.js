var BugsHuntsListener = require('./lang/BugHuntsListener').BugHuntsListener;


function BugsHuntsPrinter() {
    BugsHuntsListener.call(this); // inherit default listener
    return this;
}

// inherit default listener
BugsHuntsPrinter.prototype = Object.create(BugsHuntsListener.prototype);
BugsHuntsPrinter.prototype.constructor = BugsHuntsPrinter;

// override default listener behavior
BugsHuntsPrinter.prototype.enterRuleFO = function (ctx) {
    if (ctx.param === null) {
        console.log("Call a FO without param");
    } else {
        console.log("Call a FO with param " + parseInt(ctx.param.text));
    }
};

BugsHuntsPrinter.prototype.exitRuleFO = function (ctx) {
};

BugsHuntsPrinter.prototype.enterRuleBA = function (ctx) {
    if (ctx.param === null) {
        console.log("Call a BA without param");
    } else {
        console.log("Call a BA with param " + parseInt(ctx.param.text));
    }
};

BugsHuntsPrinter.prototype.exitRuleBA = function (ctx) {
};

BugsHuntsPrinter.prototype.enterRuleRI = function (ctx) {
    if (ctx.param === null) {
        console.log("Call a RI without param");
    } else {
        console.log("Call a RI with param " + parseInt(ctx.param.text));
    }
};

BugsHuntsPrinter.prototype.exitRuleRI = function (ctx) {
};

BugsHuntsPrinter.prototype.enterRuleLE = function (ctx) {
    if (ctx.param === null) {
        console.log("Call a LE without param");
    } else {
        console.log("Call a LE with param " + parseInt(ctx.param.text));
    }
};

BugsHuntsPrinter.prototype.exitRuleLE = function (ctx) {
};

exports.BugsHuntsPrinter = BugsHuntsPrinter;