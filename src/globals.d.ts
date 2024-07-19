import type { DOMAttributes } from "react";

declare module "react" {
	interface HTMLAttributes<T> extends DOMAttributes<T> {
		tooltip?: string;
	}
}
