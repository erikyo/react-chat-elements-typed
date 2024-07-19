/// <reference types="vitest" />
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
	...configDefaults,
	test: {
		globals: true,
		environment: "jsdom",
		include: ["src/**/__tests__/**/*.{ts,tsx}"],

		coverage: {
			reporter: ["text", "json", "html"],
			exclude: ["**/node_modules/**", "**/__tests__/**", "./lib"],
			include: ["src/**/*.{ts,tsx}"],
			extension: ["ts", "tsx"],
		},

		setupFiles: "./tests/setup.ts",
	},
});
