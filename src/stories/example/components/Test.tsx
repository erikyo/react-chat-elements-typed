import React, { useState } from "react";

const TestComponent = () => {
	const [count, setCount] = useState(0);

	return (
		<div>
			<p>Count: {count}</p>
			<button
				type={"button"}
				onKeyDown={console.log}
				onClick={() => setCount(count + 1)}
			>
				Increment
			</button>
		</div>
	);
};

export default TestComponent;
