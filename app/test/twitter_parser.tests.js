'use strict';

var should = require('should'),
    twitter_parser = require('../src/twitter_parser'),
    BugsHuntsPrinter = require('../src/BugHuntsPrinter').BugsHuntsPrinter;

var printer = new BugsHuntsPrinter();

describe('tweet parser', function () {
    it('should return ???? when receiving FO 34 FO FO 56777 BA RI', function (done) {
        var instructions = twitter_parser.parseInstructions('FO 34 FO FO 56777 BA RI', printer);

        done();
    });
});