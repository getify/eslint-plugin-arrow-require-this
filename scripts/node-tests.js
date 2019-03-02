#!/usr/bin/env node

"use strict";

var path = require("path");

var Linter = require("eslint").Linter;
var eslinter = global.eslinter = new Linter();
var arrowRequireThis;

/* istanbul ignore next */
if (process.env.TEST_DIST) {
	arrowRequireThis = require(path.join(__dirname,"..","dist","arrow-require-this.js"));
}
/* istanbul ignore next */
else if (process.env.TEST_PACKAGE) {
	arrowRequireThis = require(path.join(__dirname,".."));
}
else {
	arrowRequireThis = require(path.join(__dirname,"..","lib","index.js"));
}

eslinter.defineRule("arrow-require-this",arrowRequireThis);

global.alwaysOptions = {
	parserOptions: { ecmaVersion: 2015, },
	rules: { "arrow-require-this": ["error","always",], },
};
global.nestedOptions = {
	parserOptions: { ecmaVersion: 2015, },
	rules: { "arrow-require-this": ["error","nested",], },
};
global.defaultOptions = {
	parserOptions: { ecmaVersion: 2015, },
	rules: { "arrow-require-this": ["error",], },
};

global.QUnit = require("qunit");

require(path.join("..","tests","qunit.config.js"));
require(path.join("..","tests","tests.js"));

QUnit.start();
