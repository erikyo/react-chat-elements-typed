import type { Preview } from "@storybook/react";

import "../src/tailwind.css";
import "../src/styles.css";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color|rgb)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
