"use strict";

module.exports = {
	rules: {
		all: {
			meta: {
				type: "problem",
				docs: {
					description: "Require arrow functions to reference the 'this' keyword",
					category: "Possible Errors",
					url: "https://github.com/getify/eslint-plugin-arrow-require-this",
				},
				schema: [
					{
						enum: ["always", "nested"],
					},
				],
				messages: {
					noThis: "Required 'this' not found in arrow function",
					noThisNested: "Required 'this' not found in arrow function (or nested arrow functions)",
					neverThis: "Forbidden 'this' found in arrow function",
				},
			},
			create(context) {
				var alwaysThis = (context.options[0] === "always");
				var nestedThis = (context.options[0] === "nested" || !("0" in context.options));
				var neverThis = (context.options[0] === "never");
				var thisFoundIn = new Set();

				return {
					"ThisExpression": function enter(node) {
						var parentArrow = getParentArrowFunction(context.getAncestors());
						thisFoundIn.add(parentArrow);
					},
					"ArrowFunctionExpression:exit": function exit(node) {
						var foundThis = thisFoundIn.has(node);

						if (foundThis && neverThis) {
							context.report({
								node: node,
								messageId: "neverThis",
							});
						}
						else if (!foundThis && !neverThis) {
							context.report({
								node: node,
								messageId: alwaysThis ? "noThis" : "noThisNested",
							});
						}
						// are we tracking nested `this`?
						else if (foundThis && nestedThis) {
							let parentArrow = getParentArrowFunction(context.getAncestors());
							if (parentArrow) {
								thisFoundIn.add(parentArrow);
							}
						}
					},
				};
			},
		},
	},
};

function getParentArrowFunction(nodes) {
	for (let node of [...nodes].reverse()) {
		// bail if we find a function boundary that's not an arrow
		if (
			node.type == "FunctionExpression" ||
			node.type == "FunctionDeclaration"
		) {
			return;
		}
		else if (node.type == "ArrowFunctionExpression") {
			return node;
		}
	}
}
