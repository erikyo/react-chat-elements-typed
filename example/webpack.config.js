const path = require("node:path");
module.exports = {
	devtool: "inline-source-map",
	server: {
		port: 9988,
	},
	alias: {
		react: path.resolve("./node_modules/react"),
		"react-dom": path.resolve("./node_modules/react-dom"),
	},
};
