import { defineConfig } from "tsup";

export default defineConfig((options) => {
	return {
		clean: !options.watch,
		sourcemap: !!options.watch,
		dts: true,
		minify: true,
		tsconfig: "./tsconfig.json",
		entry: [
			"./src/**/*.ts?(x)",
			"./src/style.scss",
			"!**/__tests__/**/*.{ts,tsx}",
			"!**/stories/**/*.{ts,tsx}",
			"!**/*.{css}",
			"!**/*.stories.{ts,tsx}",
		],
		format: ["cjs", "esm"],
		outDir: "dist/",
	};
});
