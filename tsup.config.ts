import { defineConfig } from "tsup";
import { sassPlugin } from "esbuild-sass-plugin";

export default defineConfig((options) => {
	return {
		clean: !options.watch,
		sourcemap: !!options.watch,
		dts: true,
		minify: false,
		tsconfig: "./tsconfig.json",
		entry: [
			"./src/**/*.ts?(x)",
			"./src/style.scss",
			"!**/__tests__/**/*.{ts,tsx}",
			"!**/*.{css}",
		],
		format: ["cjs", "esm"],
		outDir: "dist/",
		esbuildPlugins: [sassPlugin()],
	};
});
