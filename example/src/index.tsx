import { createRoot } from "react-dom/client";
import App from "./App";
import "./App.css";
import "react-chat-elements-typed/styles.css";
import { StrictMode } from "react";

const root = createRoot(document.getElementById("app") as HTMLElement);
root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);
