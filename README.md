# ESLint Rule: arrow-require-this

[![Build Status](https://travis-ci.org/getify/eslint-plugin-arrow-require-this.svg?branch=master)](https://travis-ci.org/getify/eslint-plugin-arrow-require-this)
[![npm Module](https://badge.fury.io/js/eslint-plugin-arrow-require-this.svg)](https://www.npmjs.org/package/eslint-plugin-arrow-require-this)
[![Dependencies](https://david-dm.org/getify/eslint-plugin-arrow-require-this.svg)](https://david-dm.org/getify/eslint-plugin-arrow-require-this)
[![devDependencies](https://david-dm.org/getify/eslint-plugin-arrow-require-this/dev-status.svg)](https://david-dm.org/getify/eslint-plugin-arrow-require-this?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/getify/eslint-plugin-arrow-require-this/badge.svg?branch=master)](https://coveralls.io/github/getify/eslint-plugin-arrow-require-this?branch=master)

## Overview

The **arrow-require-this** ESLint Rule requires `=>` arrow functions to reference the `this` keyword.

The purpose of this rule is to prevent usage of `=>` arrow functions as just function shorthand (i.e., `arr.map(x => x * 2)`), which some would argue is a misusage. The opinion follows that: instead, `=>` arrow functions should only be used for "lexical this" behavior.

Since `=>` arrow functions don't have their own `this`, they treat any `this` reference as a normal variable (not a special keyword). That means `this` is just lexically looked up through any parent scopes until a valid definition of `this` is found -- from a non-arrow function, or finally the global scope itself. Such `this` behavior is referred to as "lexical this".

For example:

```js
var o = {
    id: 42,
    getData() {
        ajax("https://some.tld/api",resp => console.log(this.id));
    }
};

o.getData();   // 42
```

In this snippet, the `=>` arrow function is inside a normal function and therefore looks up and adopts its `this` (aka, "lexical this") -- which is set to the `o` object by the `o.getData()` call. Therefore, the **arrow-require-this** rule would not report an error.

By contrast, the **arrow-require-this** rule *would* report an error for:

```js
var o = {
    id: 42,
    getData() {
        ajax("https://some.tld/api",resp => console.log(o.id));
    }
};

o.getData();   // 42
```

Here, the `=>` arrow function is lexically closed over the `o` rather than using "lexical this", so it's considered a misusage of the `=>` arrow function.

To pass the **arrow-require-this** rule without a reported error, all `=>` arrow functions must reference a `this` somewhere in their concise expression body or full `{ .. }` function body.

## Enabling The Plugin

To use **arrow-require-this**, load it as a plugin into ESLint and [configure the rule](#rule-configuration).

### ESLint `.eslintrc.json`

```json
"plugins": [
    "@getify/arrow-require-this"
],
rules: {
    "@getify/arrow-require-this/all": ".."
}
```

### ESLint CLI parameters

```cmd
eslint .. --plugin='@getify/arrow-require-this' --rule='@getify/arrow-require-this/all: error' ..
```

```cmd
eslint .. --plugin='@getify/arrow-require-this' --rule='@getify/arrow-require-this/all: [error,nested]' ..
```

```cmd
eslint .. --plugin='@getify/arrow-require-this' --rule='@getify/arrow-require-this/all: [error,always]' ..
```

### ESLint Node API

To use this plugin in Node.js with the ESLint API, require the npm package first, and then pass the package's instance to `Linter#defineRule(..)`, similar to this:

```js
var arrowRequireThis = require("@getify/eslint-plugin-arrow-require-this");

// ..

var Linter = require("eslint").Linter;
var eslinter = global.eslinter = new Linter();

eslinter.defineRule("@getify/arrow-require-this/all",arrowRequireThis.rules.all);
```

Then you can check some code like this:

```js
eslinter.verify(".. some code ..",{
    rules: {
        "@getify/arrow-require-this/all": ["error","always"]
    }
});
```

## Rule Configuration

The rule can be configured in two modes: `"nested"` (default) and `"always"`.

`"nested"` permits a `this` to appear lower in a nested `=>` arrow function (i.e., `x = y => z => this.foo(z)`), as long as there is no non-arrow function boundary crossed.

`"always"` is more strict, requiring every single `=>` arrow function to have its own `this` reference.

### Configuration: `"nested"`

To select this rule mode (which is the default) in your `.eslintrc.json`:

```js
"@getify/arrow-require-this/all": "error"
```

```js
"@getify/arrow-require-this/all": [ "error", "nested" ]
```

This rule mode allows a `this` to appear either in the `=>` arrow function, or in a nested `=>` arrow function, as long as there is no non-arrow function boundary crossed in between.

These kinds of  `=>` arrow functions will all pass the rule:

```js
var a = b => this.foo(b);

var c = d => e => this.foo(e);

var f = (g = h => this.foo(h)) => g;
```

These types of `=>` arrow functions will each fail the rule:

```js
var a = b => foo(b);

var c = d => this.foo(e => e);

var f = (g = h => h) => this.foo(g);

var h = i => function(){ return j => this.foo(j); };
```

### Configuration: `"always"`

To select this mode of the rule in your `.eslintrc.json`:

```js
"@getify/arrow-require-this/all": [ "error", "always" ]
```

This rule mode requires a `this` reference to appear in every single `=>` arrow .

These `=>` arrow functions will pass the rule:

```js
var a = b => this.foo(b);

var c = d => this.foo(e => this.bar(e));

var f = (g = h => this.foo(h)) => this.bar(g);
```

These `=>` arrow functions will fail the rule:

```js
var a = b => foo(b);

var c = d => e => this.foo(e);

var f = g => this.foo(h => h);

var i = (j = k => k) => this.foo(j);
```

## npm Package

If you want to use this plugin with a global install of ESLint:

```cmd
npm install -g @getify/eslint-plugin-arrow-require-this
```

If you want to use this plugin with a local install of ESLint:

```cmd
npm install @getify/eslint-plugin-arrow-require-this
```

## Environment Support

This utility uses ES6 (aka ES2015) features. If you need to support environments prior to ES6, transpile it first (with Babel, etc).

## Builds

[![Build Status](https://travis-ci.org/getify/eslint-plugin-arrow-require-this.svg?branch=master)](https://travis-ci.org/getify/eslint-plugin-arrow-require-this)
[![npm Module](https://badge.fury.io/js/eslint-plugin-arrow-require-this.svg)](https://www.npmjs.org/package/eslint-plugin-arrow-require-this)

The distribution library file (`dist/arrow-require-this.js`) comes pre-built with the npm package distribution, so you shouldn't need to rebuild it under normal circumstances.

However, if you download this repository via Git:

1. The included build utility (`scripts/build-core.js`) builds (and minifies) `dist/arrow-require-this.js` from source. **The build utility expects Node.js version 6+.**

2. To install the build and test dependencies, run `npm install` from the project root directory.

    - **Note:** This `npm install` has the effect of running the build for you, so no further action should be needed on your part.

4. To manually run the build utility with npm:

    ```cmd
    npm run build
    ```

5. To run the build utility directly without npm:

    ```cmd
    node scripts/build-core.js
    ```

## Tests

A comprehensive test suite is included in this repository, as well as the npm package distribution. The default test behavior runs the test suite using `lib/index.js`.

1. The included Node.js test utility (`scripts/node-tests.js`) runs the test suite. **This test utility expects Node.js version 6+.**

2. Ensure the test dependencies are installed by running `npm install` from the project root directory.

    - **Note:** Starting with npm v5, the test utility is **not** run automatically during this `npm install`. With npm v4, the test utility automatically runs at this point.

3. To run the test utility with npm:

    ```cmd
    npm test
    ```

    Other npm test scripts:

    * `npm run test:dist` will run the test suite against `dist/arrow-require-this.js` instead of the default of `lib/index.js`.

    * `npm run test:package` will run the test suite as if the package had just been installed via npm. This ensures `package.json`:`main` properly references `dist/arrow-require-this.js` for inclusion.

    * `npm run test:all` will run all three modes of the test suite.

4. To run the test utility directly without npm:

    ```cmd
    node scripts/node-tests.js
    ```

### Test Coverage

[![Coverage Status](https://coveralls.io/repos/github/getify/eslint-plugin-arrow-require-this/badge.svg?branch=master)](https://coveralls.io/github/getify/eslint-plugin-arrow-require-this?branch=master)

If you have [Istanbul](https://github.com/gotwarlost/istanbul) already installed on your system (requires v1.0+), you can use it to check the test coverage:

```cmd
npm run coverage
```

Then open up `coverage/lcov-report/index.html` in a browser to view the report.

To run Istanbul directly without npm:

```cmd
istanbul cover scripts/node-tests.js
```

**Note:** The npm script `coverage:report` is only intended for use by project maintainers. It sends coverage reports to [Coveralls](https://coveralls.io/).

## License

All code and documentation are (c) 2019 Kyle Simpson and released under the [MIT License](http://getify.mit-license.org/). A copy of the MIT License [is also included](LICENSE.txt).
