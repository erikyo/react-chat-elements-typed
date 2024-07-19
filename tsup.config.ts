import { defineConfig } from "tsup";

export default defineConfig((options) => {
	return {
		clean: !options.watch,
		sourcemap: !!options.watch,
		dts: true,
		minify: !options.watch,
		tsconfig: "./tsconfig.json",
		entry: ["./src/**/*.ts?(x)", "!**/__tests__/**/*.{ts,tsx}"],
		format: ["cjs", "esm"],
		outDir: "dist/",
	};
});
