"use strict";

module.exports = {
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
			noThis: "No 'this' found in arrow function",
			noThisNested: "No 'this' found in arrow function (or nested arrow functions)",
		},
	},
	create(context) {
		var requireAlways = (context.options[0] === "always");
		var thisFoundIn = new Set();

		return {
			"ThisExpression": function enter(node) {
				var parentArrow = getParentArrowFunction(context.getAncestors());
				thisFoundIn.add(parentArrow);
			},
			"ArrowFunctionExpression:exit": function exit(node) {
				if (!thisFoundIn.has(node)) {
					context.report({
						node: node,
						messageId: requireAlways ? "noThis" : "noThisNested",
					});
				}
				else if (!requireAlways) {
					let parentArrow = getParentArrowFunction(context.getAncestors());
					if (parentArrow) {
						thisFoundIn.add(parentArrow);
					}
				}
			},
		};
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
