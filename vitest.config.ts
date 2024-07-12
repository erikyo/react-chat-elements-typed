/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from "vite";

export default defineConfig({
	test: {
		globals: true,
		environment: "jsdom",
		include: ["src/**/__tests__/**/*.{ts,tsx}"],

		coverage: {
			reporter: ["text", "json", "html"],
			exclude: ["**/node_modules/**", "**/lib/**"],
			include: ["src/**/__tests__/**/*.{ts,tsx}"],
			extension: ["ts", "tsx"],
		},

		setupFiles: "./tests/setup.ts",
	},
});
