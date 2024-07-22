/** @type {import('postcss-load-config').Config} */

module.exports = (ctx) => {
	return {
		map:
			ctx.file?.basename === "ReactChatElements.css"
				? { inline: false }
				: false,
		plugins: {
			tailwindcss: {},
			autoprefixer: ctx.env === "production" ? {} : false,
			cssnano:
				ctx.env === "production" ||
				ctx.file?.basename === "ReactChatElements.css"
					? {
							preset: ["default"],
						}
					: false,
		},
	};
};
