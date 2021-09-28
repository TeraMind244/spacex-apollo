import React from "react";

import { renderApollo, cleanup } from "../../test-utils";
import ActionButton from "../action-button";
import { cartItemsVar } from "../../cache";

describe("action button", () => {
	// automatically unmount and cleanup DOM after the test is finished.
	afterEach(cleanup);

	const defaultProps = {
		id: "id",
		isBooked: true,
	};

	it("renders without error", () => {
		const { getByTestId } = renderApollo(
			<ActionButton {...defaultProps} />
		);
		expect(getByTestId("action-button")).toBeTruthy();
	});

	it("shows correct label", () => {
		const { getByText, container } = renderApollo(
			<ActionButton {...defaultProps} />
		);
		getByText(/add to cart/i);

		// rerender with different props to same container
		cartItemsVar(["1"]);
		renderApollo(<ActionButton {...defaultProps} id="1" />, { container });
		getByText(/remove from cart/i);
		cartItemsVar([]);

		// rerender with different props to same container
		renderApollo(<ActionButton {...defaultProps} isBooked={true} />, {
			container,
		});
		getByText(/cancel this trip/i);
	});
});
