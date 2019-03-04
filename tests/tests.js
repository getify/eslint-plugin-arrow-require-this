"use strict";

QUnit.test( "one arrow, this (always)", function test(assert){
	var code = `
		var x = y => this.foo(y);
	`;

	var results = eslinter.verify(code,alwaysOptions);

	assert.expect(1);
	assert.strictEqual( results.length, 0, "no errors" );
} );

QUnit.test( "two nested arrows, both this (always)", function test(assert){
	var code = `
		var x = y => this.foo(z => this.bar(z));
	`;

	var results = eslinter.verify(code,alwaysOptions);

	assert.expect(1);
	assert.strictEqual( results.length, 0, "no errors" );
} );

QUnit.test( "one arrow with param arrow, both this (always)", function test(assert){
	var code = `
		var x = (y = z => this.foo(z)) => this.bar(w);
	`;

	var results = eslinter.verify(code,alwaysOptions);

	assert.expect(1);
	assert.strictEqual( results.length, 0, "no errors" );
} );

QUnit.test( "two separate arrows, both this (always)", function test(assert){
	var code = `
		var x = y => this.foo(y);
		var z = w => this.bar(w);
	`;

	var results = eslinter.verify(code,alwaysOptions);

	assert.expect(1);
	assert.strictEqual( results.length, 0, "no errors" );
} );

QUnit.test( "simple arrow, no this (always)", function test(assert){
	var code = `
		var x = y => y;
	`;

	var results = eslinter.verify(code,alwaysOptions);
	var [{ ruleId, messageId, } = {}] = results || [];

	assert.expect(3);
	assert.strictEqual( results.length, 1, "only 1 error" );
	assert.strictEqual( ruleId, "@getify/arrow-require-this/all", "ruleId" );
	assert.strictEqual( messageId, "noThis", "messageId" );
} );

QUnit.test( "two separate arrows, no this (always)", function test(assert){
	var code = `
		var x = y => foo(y);
		var z = w => bar(w);
	`;

	var results = eslinter.verify(code,alwaysOptions);
	var [
		{ ruleId: ruleId1, messageId: messageId1, } = {},
		{ ruleId: ruleId2, messageId: messageId2, } = {},
	] = results || [];

	assert.expect(5);
	assert.strictEqual( results.length, 2, "only 2 errors" );
	assert.strictEqual( ruleId1, "@getify/arrow-require-this/all", "ruleId1" );
	assert.strictEqual( messageId1, "noThis", "messageId1" );
	assert.strictEqual( ruleId2, "@getify/arrow-require-this/all", "ruleId2" );
	assert.strictEqual( messageId2, "noThis", "messageId2" );
} );

QUnit.test( "two nested arrows, one this nested (always)", function test(assert){
	var code = `
		var x = y => z => this.foo(z);
	`;

	var results = eslinter.verify(code,alwaysOptions);
	var [{ ruleId, messageId, } = {}] = results || [];

	assert.expect(3);
	assert.strictEqual( results.length, 1, "only 1 error" );
	assert.strictEqual( ruleId, "@getify/arrow-require-this/all", "ruleId" );
	assert.strictEqual( messageId, "noThis", "messageId" );
} );

QUnit.test( "two nested arrows, one this not-nested (always)", function test(assert){
	var code = `
		var x = y => this.foo(z => z);
	`;

	var results = eslinter.verify(code,alwaysOptions);
	var [{ ruleId, messageId, } = {}] = results || [];

	assert.expect(3);
	assert.strictEqual( results.length, 1, "only 1 error" );
	assert.strictEqual( ruleId, "@getify/arrow-require-this/all", "ruleId" );
	assert.strictEqual( messageId, "noThis", "messageId" );
} );

QUnit.test( "two nested arrows, no this (always)", function test(assert){
	var code = `
		var x = y => z => z;
	`;

	var results = eslinter.verify(code,alwaysOptions);
	var [
		{ ruleId: ruleId1, messageId: messageId1, } = {},
		{ ruleId: ruleId2, messageId: messageId2, } = {},
	] = results || [];

	assert.expect(5);
	assert.strictEqual( results.length, 2, "only 2 errors" );
	assert.strictEqual( ruleId1, "@getify/arrow-require-this/all", "ruleId1" );
	assert.strictEqual( messageId1, "noThis", "messageId1" );
	assert.strictEqual( ruleId2, "@getify/arrow-require-this/all", "ruleId2" );
	assert.strictEqual( messageId2, "noThis", "messageId2" );
} );

QUnit.test( "one arrow with param arrow, nested this (always)", function test(assert){
	var code = `
		var x = (y = z => foo(z)) => this.bar(w);
	`;

	var results = eslinter.verify(code,alwaysOptions);
	var [{ ruleId, messageId, } = {}] = results || [];

	assert.expect(3);
	assert.strictEqual( results.length, 1, "only 1 error" );
	assert.strictEqual( ruleId, "@getify/arrow-require-this/all", "ruleId" );
	assert.strictEqual( messageId, "noThis", "messageId" );
} );

QUnit.test( "one arrow with param arrow, param this (always)", function test(assert){
	var code = `
		var x = (y = z => this.foo(z)) => bar(w);
	`;

	var results = eslinter.verify(code,alwaysOptions);
	var [{ ruleId, messageId, } = {}] = results || [];

	assert.expect(3);
	assert.strictEqual( results.length, 1, "only 1 error" );
	assert.strictEqual( ruleId, "@getify/arrow-require-this/all", "ruleId" );
	assert.strictEqual( messageId, "noThis", "messageId" );
} );

QUnit.test( "one non-arrow and one arrow, nested this (always)", function test(assert){
	var code = `
		var x = function(){ return y => this.foo(y); };
	`;

	var results = eslinter.verify(code,alwaysOptions);

	assert.expect(1);
	assert.strictEqual( results.length, 0, "no errors" );
} );


// **********************************************


QUnit.test( "one arrow, this (nested)", function test(assert){
	var code = `
		var x = y => this.foo(y);
	`;

	var results = eslinter.verify(code,nestedOptions);

	assert.expect(1);
	assert.strictEqual( results.length, 0, "no errors" );
} );

QUnit.test( "two nested arrows, both this (nested)", function test(assert){
	var code = `
		var x = y => this.foo(z => this.bar(z));
	`;

	var results = eslinter.verify(code,nestedOptions);

	assert.expect(1);
	assert.strictEqual( results.length, 0, "no errors" );
} );

QUnit.test( "one arrow with param arrow, both this (nested)", function test(assert){
	var code = `
		var x = (y = z => this.foo(z)) => this.bar(w);
	`;

	var results = eslinter.verify(code,nestedOptions);

	assert.expect(1);
	assert.strictEqual( results.length, 0, "no errors" );
} );

QUnit.test( "two separate arrows, both this (nested)", function test(assert){
	var code = `
		var x = y => this.foo(y);
		var z = w => this.bar(w);
	`;

	var results = eslinter.verify(code,nestedOptions);

	assert.expect(1);
	assert.strictEqual( results.length, 0, "no errors" );
} );

QUnit.test( "simple arrow, no this (nested)", function test(assert){
	var code = `
		var x = y => y;
	`;

	var results = eslinter.verify(code,nestedOptions);
	var [{ ruleId, messageId, } = {}] = results || [];

	assert.expect(3);
	assert.strictEqual( results.length, 1, "only 1 error" );
	assert.strictEqual( ruleId, "@getify/arrow-require-this/all", "ruleId" );
	assert.strictEqual( messageId, "noThisNested", "messageId" );
} );

QUnit.test( "two separate arrows, no this (nested)", function test(assert){
	var code = `
		var x = y => foo(y);
		var z = w => bar(w);
	`;

	var results = eslinter.verify(code,nestedOptions);
	var [
		{ ruleId: ruleId1, messageId: messageId1, } = {},
		{ ruleId: ruleId2, messageId: messageId2, } = {},
	] = results || [];

	assert.expect(5);
	assert.strictEqual( results.length, 2, "only 2 errors" );
	assert.strictEqual( ruleId1, "@getify/arrow-require-this/all", "ruleId1" );
	assert.strictEqual( messageId1, "noThisNested", "messageId1" );
	assert.strictEqual( ruleId2, "@getify/arrow-require-this/all", "ruleId2" );
	assert.strictEqual( messageId2, "noThisNested", "messageId2" );
} );

QUnit.test( "two nested arrows, one this nested (nested)", function test(assert){
	var code = `
		var x = y => z => this.foo(z);
	`;

	var results = eslinter.verify(code,nestedOptions);

	assert.expect(1);
	assert.strictEqual( results.length, 0, "no errors" );
} );

QUnit.test( "two nested arrows, one this not-nested (nested)", function test(assert){
	var code = `
		var x = y => this.foo(z => z);
	`;

	var results = eslinter.verify(code,nestedOptions);
	var [{ ruleId, messageId, } = {}] = results || [];

	assert.expect(3);
	assert.strictEqual( results.length, 1, "only 1 error" );
	assert.strictEqual( ruleId, "@getify/arrow-require-this/all", "ruleId" );
	assert.strictEqual( messageId, "noThisNested", "messageId" );
} );

QUnit.test( "two nested arrows, no this (nested)", function test(assert){
	var code = `
		var x = y => z => z;
	`;

	var results = eslinter.verify(code,nestedOptions);
	var [
		{ ruleId: ruleId1, messageId: messageId1, } = {},
		{ ruleId: ruleId2, messageId: messageId2, } = {},
	] = results || [];

	assert.expect(5);
	assert.strictEqual( results.length, 2, "only 2 errors" );
	assert.strictEqual( ruleId1, "@getify/arrow-require-this/all", "ruleId1" );
	assert.strictEqual( messageId1, "noThisNested", "messageId1" );
	assert.strictEqual( ruleId2, "@getify/arrow-require-this/all", "ruleId2" );
	assert.strictEqual( messageId2, "noThisNested", "messageId2" );
} );

QUnit.test( "one arrow with param arrow, nested this (nested)", function test(assert){
	var code = `
		var x = (y = z => foo(z)) => this.bar(w);
	`;

	var results = eslinter.verify(code,nestedOptions);
	var [{ ruleId, messageId, } = {}] = results || [];

	assert.expect(3);
	assert.strictEqual( results.length, 1, "only 1 error" );
	assert.strictEqual( ruleId, "@getify/arrow-require-this/all", "ruleId" );
	assert.strictEqual( messageId, "noThisNested", "messageId" );
} );

QUnit.test( "one arrow with param arrow, param this (nested)", function test(assert){
	var code = `
		var x = (y = z => this.foo(z)) => bar(w);
	`;

	var results = eslinter.verify(code,nestedOptions);

	assert.expect(1);
	assert.strictEqual( results.length, 0, "no errors" );
} );

QUnit.test( "two arrows with non-arrow between, both this (nested)", function test(assert){
	var code = `
		var x = y => this.foo(function(){ return z => this.bar(z); });
	`;

	var results = eslinter.verify(code,nestedOptions);

	assert.expect(1);
	assert.strictEqual( results.length, 0, "no errors" );
} );

QUnit.test( "two arrows with non-arrow between, nested this (nested)", function test(assert){
	var code = `
		var x = y => foo(function(){ return z => this.bar(z); });
	`;

	var results = eslinter.verify(code,nestedOptions);
	var [{ ruleId, messageId, } = {}] = results || [];

	assert.expect(3);
	assert.strictEqual( results.length, 1, "only 1 error" );
	assert.strictEqual( ruleId, "@getify/arrow-require-this/all", "ruleId" );
	assert.strictEqual( messageId, "noThisNested", "messageId" );
} );

QUnit.test( "one arrow and non-arrow with arrow param, param this (nested)", function test(assert){
	var code = `
		var x = y => foo(function(z = w => this.bar(w)){ return bar(z); });
	`;

	var results = eslinter.verify(code,nestedOptions);
	var [{ ruleId, messageId, } = {}] = results || [];

	assert.expect(3);
	assert.strictEqual( results.length, 1, "only 1 error" );
	assert.strictEqual( ruleId, "@getify/arrow-require-this/all", "ruleId" );
	assert.strictEqual( messageId, "noThisNested", "messageId" );
} );

QUnit.test( "two arrows with non-arrow between, not-nested this (nested)", function test(assert){
	var code = `
		var x = y => this.foo(function(){ return z => bar(z); });
	`;

	var results = eslinter.verify(code,nestedOptions);
	var [{ ruleId, messageId, } = {}] = results || [];

	assert.expect(3);
	assert.strictEqual( results.length, 1, "only 1 error" );
	assert.strictEqual( ruleId, "@getify/arrow-require-this/all", "ruleId" );
	assert.strictEqual( messageId, "noThisNested", "messageId" );
} );

QUnit.test( "two arrows with non-arrow between, no this (nested)", function test(assert){
	var code = `
		var x = y => foo(function(){ return z => bar(z); });
	`;

	var results = eslinter.verify(code,nestedOptions);
	var [
		{ ruleId: ruleId1, messageId: messageId1, } = {},
		{ ruleId: ruleId2, messageId: messageId2, } = {},
	] = results || [];

	assert.expect(5);
	assert.strictEqual( results.length, 2, "only 2 errors" );
	assert.strictEqual( ruleId1, "@getify/arrow-require-this/all", "ruleId1" );
	assert.strictEqual( messageId1, "noThisNested", "messageId1" );
	assert.strictEqual( ruleId2, "@getify/arrow-require-this/all", "ruleId2" );
	assert.strictEqual( messageId2, "noThisNested", "messageId2" );
} );

QUnit.test( "one arrow and one non-arrow, both this (nested)", function test(assert){
	var code = `
		var x = y => this.foo(function(){ return this.bar(z); });
	`;

	var results = eslinter.verify(code,nestedOptions);

	assert.expect(1);
	assert.strictEqual( results.length, 0, "no errors" );
} );

QUnit.test( "one arrow and one non-arrow, nested this (nested)", function test(assert){
	var code = `
		var x = y => foo(function(){ return this.bar(z); });
	`;

	var results = eslinter.verify(code,nestedOptions);
	var [{ ruleId, messageId, } = {}] = results || [];

	assert.expect(3);
	assert.strictEqual( results.length, 1, "only 1 error" );
	assert.strictEqual( ruleId, "@getify/arrow-require-this/all", "ruleId" );
	assert.strictEqual( messageId, "noThisNested", "messageId" );
} );


// **********************************************


QUnit.test( "one arrow, this (default: nested)", function test(assert){
	var code = `
		var x = y => this.foo(y);
	`;

	var results = eslinter.verify(code,defaultOptions);

	assert.expect(1);
	assert.strictEqual( results.length, 0, "no errors" );
} );

QUnit.test( "two nested arrows, both this (default: nested)", function test(assert){
	var code = `
		var x = y => this.foo(z => this.bar(z));
	`;

	var results = eslinter.verify(code,defaultOptions);

	assert.expect(1);
	assert.strictEqual( results.length, 0, "no errors" );
} );

QUnit.test( "one arrow with param arrow, both this (default: nested)", function test(assert){
	var code = `
		var x = (y = z => this.foo(z)) => this.bar(w);
	`;

	var results = eslinter.verify(code,defaultOptions);

	assert.expect(1);
	assert.strictEqual( results.length, 0, "no errors" );
} );

QUnit.test( "two separate arrows, both this (default: nested)", function test(assert){
	var code = `
		var x = y => this.foo(y);
		var z = w => this.bar(w);
	`;

	var results = eslinter.verify(code,defaultOptions);

	assert.expect(1);
	assert.strictEqual( results.length, 0, "no errors" );
} );

QUnit.test( "simple arrow, no this (default: nested)", function test(assert){
	var code = `
		var x = y => y;
	`;

	var results = eslinter.verify(code,defaultOptions);
	var [{ ruleId, messageId, } = {}] = results || [];

	assert.expect(3);
	assert.strictEqual( results.length, 1, "only 1 error" );
	assert.strictEqual( ruleId, "@getify/arrow-require-this/all", "ruleId" );
	assert.strictEqual( messageId, "noThisNested", "messageId" );
} );

QUnit.test( "two separate arrows, no this (default: nested)", function test(assert){
	var code = `
		var x = y => foo(y);
		var z = w => bar(w);
	`;

	var results = eslinter.verify(code,defaultOptions);
	var [
		{ ruleId: ruleId1, messageId: messageId1, } = {},
		{ ruleId: ruleId2, messageId: messageId2, } = {},
	] = results || [];

	assert.expect(5);
	assert.strictEqual( results.length, 2, "only 2 errors" );
	assert.strictEqual( ruleId1, "@getify/arrow-require-this/all", "ruleId1" );
	assert.strictEqual( messageId1, "noThisNested", "messageId1" );
	assert.strictEqual( ruleId2, "@getify/arrow-require-this/all", "ruleId2" );
	assert.strictEqual( messageId2, "noThisNested", "messageId2" );
} );

QUnit.test( "two nested arrows, one this nested (default: nested)", function test(assert){
	var code = `
		var x = y => z => this.foo(z);
	`;

	var results = eslinter.verify(code,defaultOptions);

	assert.expect(1);
	assert.strictEqual( results.length, 0, "no errors" );
} );

QUnit.test( "two nested arrows, one this not-nested (default: nested)", function test(assert){
	var code = `
		var x = y => this.foo(z => z);
	`;

	var results = eslinter.verify(code,defaultOptions);
	var [{ ruleId, messageId, } = {}] = results || [];

	assert.expect(3);
	assert.strictEqual( results.length, 1, "only 1 error" );
	assert.strictEqual( ruleId, "@getify/arrow-require-this/all", "ruleId" );
	assert.strictEqual( messageId, "noThisNested", "messageId" );
} );

QUnit.test( "two nested arrows, no this (default: nested)", function test(assert){
	var code = `
		var x = y => z => z;
	`;

	var results = eslinter.verify(code,defaultOptions);
	var [
		{ ruleId: ruleId1, messageId: messageId1, } = {},
		{ ruleId: ruleId2, messageId: messageId2, } = {},
	] = results || [];

	assert.expect(5);
	assert.strictEqual( results.length, 2, "only 2 errors" );
	assert.strictEqual( ruleId1, "@getify/arrow-require-this/all", "ruleId1" );
	assert.strictEqual( messageId1, "noThisNested", "messageId1" );
	assert.strictEqual( ruleId2, "@getify/arrow-require-this/all", "ruleId2" );
	assert.strictEqual( messageId2, "noThisNested", "messageId2" );
} );

QUnit.test( "one arrow with param arrow, nested this (default: nested)", function test(assert){
	var code = `
		var x = (y = z => foo(z)) => this.bar(w);
	`;

	var results = eslinter.verify(code,defaultOptions);
	var [{ ruleId, messageId, } = {}] = results || [];

	assert.expect(3);
	assert.strictEqual( results.length, 1, "only 1 error" );
	assert.strictEqual( ruleId, "@getify/arrow-require-this/all", "ruleId" );
	assert.strictEqual( messageId, "noThisNested", "messageId" );
} );

QUnit.test( "one arrow with param arrow, param this (default: nested)", function test(assert){
	var code = `
		var x = (y = z => this.foo(z)) => bar(w);
	`;

	var results = eslinter.verify(code,defaultOptions);

	assert.expect(1);
	assert.strictEqual( results.length, 0, "no errors" );
} );

QUnit.test( "two arrows with non-arrow between, both this (default: nested)", function test(assert){
	var code = `
		var x = y => this.foo(function(){ return z => this.bar(z); });
	`;

	var results = eslinter.verify(code,defaultOptions);

	assert.expect(1);
	assert.strictEqual( results.length, 0, "no errors" );
} );

QUnit.test( "two arrows with non-arrow between, nested this (default: nested)", function test(assert){
	var code = `
		var x = y => foo(function(){ return z => this.bar(z); });
	`;

	var results = eslinter.verify(code,defaultOptions);
	var [{ ruleId, messageId, } = {}] = results || [];

	assert.expect(3);
	assert.strictEqual( results.length, 1, "only 1 error" );
	assert.strictEqual( ruleId, "@getify/arrow-require-this/all", "ruleId" );
	assert.strictEqual( messageId, "noThisNested", "messageId" );
} );

QUnit.test( "one arrow and non-arrow with arrow param, param this (default: nested)", function test(assert){
	var code = `
		var x = y => foo(function(z = w => this.bar(w)){ return bar(z); });
	`;

	var results = eslinter.verify(code,defaultOptions);
	var [{ ruleId, messageId, } = {}] = results || [];

	assert.expect(3);
	assert.strictEqual( results.length, 1, "only 1 error" );
	assert.strictEqual( ruleId, "@getify/arrow-require-this/all", "ruleId" );
	assert.strictEqual( messageId, "noThisNested", "messageId" );
} );

QUnit.test( "two arrows with non-arrow between, not-nested this (default: nested)", function test(assert){
	var code = `
		var x = y => this.foo(function(){ return z => bar(z); });
	`;

	var results = eslinter.verify(code,defaultOptions);
	var [{ ruleId, messageId, } = {}] = results || [];

	assert.expect(3);
	assert.strictEqual( results.length, 1, "only 1 error" );
	assert.strictEqual( ruleId, "@getify/arrow-require-this/all", "ruleId" );
	assert.strictEqual( messageId, "noThisNested", "messageId" );
} );

QUnit.test( "two arrows with non-arrow between, no this (default: nested)", function test(assert){
	var code = `
		var x = y => foo(function(){ return z => bar(z); });
	`;

	var results = eslinter.verify(code,defaultOptions);
	var [
		{ ruleId: ruleId1, messageId: messageId1, } = {},
		{ ruleId: ruleId2, messageId: messageId2, } = {},
	] = results || [];

	assert.expect(5);
	assert.strictEqual( results.length, 2, "only 2 errors" );
	assert.strictEqual( ruleId1, "@getify/arrow-require-this/all", "ruleId1" );
	assert.strictEqual( messageId1, "noThisNested", "messageId1" );
	assert.strictEqual( ruleId2, "@getify/arrow-require-this/all", "ruleId2" );
	assert.strictEqual( messageId2, "noThisNested", "messageId2" );
} );

QUnit.test( "one arrow and one non-arrow, both this (default: nested)", function test(assert){
	var code = `
		var x = y => this.foo(function(){ return this.bar(z); });
	`;

	var results = eslinter.verify(code,defaultOptions);

	assert.expect(1);
	assert.strictEqual( results.length, 0, "no errors" );
} );

QUnit.test( "one arrow and one non-arrow, nested this (default: nested)", function test(assert){
	var code = `
		var x = y => foo(function(){ return this.bar(z); });
	`;

	var results = eslinter.verify(code,defaultOptions);
	var [{ ruleId, messageId, } = {}] = results || [];

	assert.expect(3);
	assert.strictEqual( results.length, 1, "only 1 error" );
	assert.strictEqual( ruleId, "@getify/arrow-require-this/all", "ruleId" );
	assert.strictEqual( messageId, "noThisNested", "messageId" );
} );


// **********************************************


QUnit.test( "one arrow, this (never)", function test(assert){
	var code = `
		var x = y => this.foo(y);
	`;

	var results = eslinter.verify(code,neverOptions);
	var [{ ruleId, messageId, } = {}] = results || [];

	assert.expect(3);
	assert.strictEqual( results.length, 1, "only 1 error" );
	assert.strictEqual( ruleId, "@getify/arrow-require-this/all", "ruleId" );
	assert.strictEqual( messageId, "neverThis", "messageId" );
} );

QUnit.test( "two nested arrows, both this (never)", function test(assert){
	var code = `
		var x = y => this.foo(z => this.bar(z));
	`;

	var results = eslinter.verify(code,neverOptions);
	var [
		{ ruleId: ruleId1, messageId: messageId1, } = {},
		{ ruleId: ruleId2, messageId: messageId2, } = {},
	] = results || [];

	assert.expect(5);
	assert.strictEqual( results.length, 2, "only 2 errors" );
	assert.strictEqual( ruleId1, "@getify/arrow-require-this/all", "ruleId1" );
	assert.strictEqual( messageId1, "neverThis", "messageId1" );
	assert.strictEqual( ruleId2, "@getify/arrow-require-this/all", "ruleId2" );
	assert.strictEqual( messageId2, "neverThis", "messageId2" );
} );

QUnit.test( "one arrow with param arrow, both this (never)", function test(assert){
	var code = `
		var x = (y = z => this.foo(z)) => this.bar(w);
	`;

	var results = eslinter.verify(code,neverOptions);
	var [
		{ ruleId: ruleId1, messageId: messageId1, } = {},
		{ ruleId: ruleId2, messageId: messageId2, } = {},
	] = results || [];

	assert.expect(5);
	assert.strictEqual( results.length, 2, "only 2 errors" );
	assert.strictEqual( ruleId1, "@getify/arrow-require-this/all", "ruleId1" );
	assert.strictEqual( messageId1, "neverThis", "messageId1" );
	assert.strictEqual( ruleId2, "@getify/arrow-require-this/all", "ruleId2" );
	assert.strictEqual( messageId2, "neverThis", "messageId2" );
} );

QUnit.test( "two separate arrows, both this (never)", function test(assert){
	var code = `
		var x = y => this.foo(y);
		var z = w => this.bar(w);
	`;

	var results = eslinter.verify(code,neverOptions);
	var [
		{ ruleId: ruleId1, messageId: messageId1, } = {},
		{ ruleId: ruleId2, messageId: messageId2, } = {},
	] = results || [];

	assert.expect(5);
	assert.strictEqual( results.length, 2, "only 2 errors" );
	assert.strictEqual( ruleId1, "@getify/arrow-require-this/all", "ruleId1" );
	assert.strictEqual( messageId1, "neverThis", "messageId1" );
	assert.strictEqual( ruleId2, "@getify/arrow-require-this/all", "ruleId2" );
	assert.strictEqual( messageId2, "neverThis", "messageId2" );
} );

QUnit.test( "simple arrow, no this (never)", function test(assert){
	var code = `
		var x = y => y;
	`;

	var results = eslinter.verify(code,neverOptions);

	assert.expect(1);
	assert.strictEqual( results.length, 0, "no errors" );
} );

QUnit.test( "two separate arrows, no this (never)", function test(assert){
	var code = `
		var x = y => foo(y);
		var z = w => bar(w);
	`;

	var results = eslinter.verify(code,neverOptions);

	assert.expect(1);
	assert.strictEqual( results.length, 0, "no errors" );
} );

QUnit.test( "two separate arrows, one this (never)", function test(assert){
	var code = `
		var x = y => this.foo(y);
		var z = w => bar(w);
	`;

	var results = eslinter.verify(code,neverOptions);
	var [{ ruleId, messageId, } = {}] = results || [];

	assert.expect(3);
	assert.strictEqual( results.length, 1, "only 1 error" );
	assert.strictEqual( ruleId, "@getify/arrow-require-this/all", "ruleId" );
	assert.strictEqual( messageId, "neverThis", "messageId" );
} );

QUnit.test( "two nested arrows, one this nested (never)", function test(assert){
	var code = `
		var x = y => foo(z => this.bar(z));
	`;

	var results = eslinter.verify(code,neverOptions);
	var [{ ruleId, messageId, } = {}] = results || [];

	assert.expect(3);
	assert.strictEqual( results.length, 1, "only 1 error" );
	assert.strictEqual( ruleId, "@getify/arrow-require-this/all", "ruleId" );
	assert.strictEqual( messageId, "neverThis", "messageId" );
} );

QUnit.test( "two nested arrows, one this not-nested (never)", function test(assert){
	var code = `
		var x = y => this.foo(z => z);
	`;

	var results = eslinter.verify(code,neverOptions);
	var [{ ruleId, messageId, } = {}] = results || [];

	assert.expect(3);
	assert.strictEqual( results.length, 1, "only 1 error" );
	assert.strictEqual( ruleId, "@getify/arrow-require-this/all", "ruleId" );
	assert.strictEqual( messageId, "neverThis", "messageId" );
} );

QUnit.test( "two nested arrows, no this (never)", function test(assert){
	var code = `
		var x = y => z => z;
	`;

	var results = eslinter.verify(code,neverOptions);

	assert.expect(1);
	assert.strictEqual( results.length, 0, "no errors" );
} );

QUnit.test( "one arrow with param arrow, param this (never)", function test(assert){
	var code = `
		var x = (y = z => this.foo(z)) => bar(w);
	`;

	var results = eslinter.verify(code,neverOptions);
	var [{ ruleId, messageId, } = {}] = results || [];

	assert.expect(3);
	assert.strictEqual( results.length, 1, "only 1 error" );
	assert.strictEqual( ruleId, "@getify/arrow-require-this/all", "ruleId" );
	assert.strictEqual( messageId, "neverThis", "messageId" );
} );

QUnit.test( "one arrow and one non-arrow, both this (never)", function test(assert){
	var code = `
		var x = y => this.foo(function(){ return this.bar(z); });
	`;

	var results = eslinter.verify(code,neverOptions);
	var [{ ruleId, messageId, } = {}] = results || [];

	assert.expect(3);
	assert.strictEqual( results.length, 1, "only 1 error" );
	assert.strictEqual( ruleId, "@getify/arrow-require-this/all", "ruleId" );
	assert.strictEqual( messageId, "neverThis", "messageId" );
} );

QUnit.test( "one arrow and one non-arrow, nested this (never)", function test(assert){
	var code = `
		var x = y => foo(function(){ return this.bar(z); });
	`;

	var results = eslinter.verify(code,neverOptions);

	assert.expect(1);
	assert.strictEqual( results.length, 0, "no errors" );
} );
