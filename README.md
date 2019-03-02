# ESLint Rule: arrow-require-this

[![Build Status](https://travis-ci.org/getify/eslint-plugin-arrow-require-this.svg?branch=master)](https://travis-ci.org/getify/eslint-plugin-arrow-require-this)
[![npm Module](https://badge.fury.io/js/eslint-plugin-arrow-require-this.svg)](https://www.npmjs.org/package/eslint-plugin-arrow-require-this)
[![Dependencies](https://david-dm.org/getify/eslint-plugin-arrow-require-this.svg)](https://david-dm.org/getify/eslint-plugin-arrow-require-this)
[![devDependencies](https://david-dm.org/getify/eslint-plugin-arrow-require-this/dev-status.svg)](https://david-dm.org/getify/eslint-plugin-arrow-require-this?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/getify/eslint-plugin-arrow-require-this/badge.svg?branch=master)](https://coveralls.io/github/getify/eslint-plugin-arrow-require-this?branch=master)

## Overview

The **arrow-require-this** ESLint Rule requires `=>` arrow functions to use a `this` reference.

The purpose of this rule is to prevent usage of `=>` arrow functions as just function shorthand (i.e., `arr.map(x => x * 2)`), which some would argue is an inappropriate usage. The opinion is that instead, `=>` arrow functions should only be used for "lexical this" behavior.

Since `=>` arrow functions don't have their own `this`, they treat any `this` reference as a normal variable to be lexically looked up through its parent scopes until a valid `this` is found (by virtue of finding a non-arrow function, or eventually the global scope itself). This `this` behavior is referred to "lexical this".

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

In this snippet, the `=>` arrow function is inside a normal function and therefore looks up and adopts its `this` (aka, "lexical this") -- which is set to the `o` object by the `o.getData()` call.

By contrast, this rule would throw an error on the following code snippet:

```js
var o = {
    id: 42,
    getData() {
        ajax("https://some.tld/api",resp => console.log(o.id));
    }
};

o.getData();   // 42
```

Here, the `=>` arrow function is lexically closed over the `o` rather than using "lexical this", so it's considered an inappropriate usage.

To pass this rule without an exception, an `=>` arrow function must reference a `this` somewhere in its concise expression body or its full `{ .. }` function body.

## Rule Options

The rule comes can be applied in two forms: `"nested"` (default) and `"always"`.

`"nested"` permits a `this` to appear in a nested `=>` arrow function (i.e., `x = y => z => this.foo(z)`), as long as there is not a non-arrow function boundary crossed.

`"always"` is more strict, requiring every single `=>` arrow function to have its own `this` reference.

### `"nested"`

To use this configuration option (which is the default), use one of these:

```js
"@getify/arrow-require-this": "error"
```

```js
"@getify/arrow-require-this": [ "error", "nested" ]
```

This configuration option allows a `this` to appear either in the `=>` arrow function, or in a nested `=>` arrow function, as long as there is not a non-arrow function boundary to be crossed in between.

These `=>` arrow functions will pass the rule:

```js
var a = b => this.foo(b);

var c = d => e => this.foo(e);

var f = (g = h => this.foo(h)) => g;
```

These `=>` arrow functions will fail the rule:

```js
var a = b => foo(b);

var c = d => this.foo(e => e);

var f = (g = h => h) => this.foo(g);

var h = i => function(){ return j => this.foo(j); };
```

### `"always"`

To use this configuration option:

```js
"@getify/eslint-plugin-arrow-require-this": [ "error", "always" ]
```

This configuration option requires a `this` reference to appear in every single `=>` arrow .

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

## Environment Support

This utility uses ES6 (aka ES2015) features. If you need to support environments prior to ES6, transpile it first (with Babel, etc).

## npm Package

If you want to use this plugin with a global install of ESLint:

```cmd
npm install -g @getify/eslint-plugin-arrow-require-this
```

If you want to use this plugin with a local install of ESLint:

```cmd
npm install @getify/eslint-plugin-arrow-require-this
```

And to load it as a plugin into ESLint, use this plugin name:

```js
"@getify/arrow-require-this"
```

## Use With ESLint CLI

```cmd
eslint .. --plugin @getify/arrow-require-this --rule '@getify/arrow-require-this: error' ..
```

Or:

```cmd
eslint .. --plugin @getify/arrow-require-this --rule '@getify/arrow-require-this: error nested' ..
```


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
