import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environment: "jsdom",
		include: ["**/__tests__/**.?(c|m)[jt]s?(x)"],

		coverage: {
			reporter: ["text", "json", "html"],
			exclude: ["**/node_modules/**", "**/dist/**"],
			include: ["**/__tests__/**.?(c|m)[jt]s?(x)"],
			extension: ["ts", "tsx"],
		},
	},
});
