import React from "react";
import { gql, useMutation, useReactiveVar, Reference } from "@apollo/client";

import { GET_LAUNCH_DETAILS } from "../pages/launch";
import Button from "../components/button";
import { cartItemsVar } from "../cache";

import * as LaunchDetailTypes from "../pages/__generated__/LaunchDetails";
import * as CancelTypes from "../containers/__generated__/cancel";

export { GET_LAUNCH_DETAILS };

export const CANCEL_TRIP = gql`
	mutation cancel($launchId: ID!) {
		cancelTrip(launchId: $launchId) {
			success
			message
			launches {
				id
				isBooked
			}
		}
	}
`;

const removeLaunchFragment = gql`
	fragment RemoveLaunch on Launch {
		id
	}
`;

interface ActionButtonProps
	extends Pick<LaunchDetailTypes.LaunchDetails_launch, "id"> {}

const CancelTripButton: React.FC<ActionButtonProps> = ({ id }) => {
	const [cancelTrip, { loading, error }] = useMutation<
		CancelTypes.cancel,
		CancelTypes.cancelVariables
	>(CANCEL_TRIP, {
		variables: { launchId: id },
		update: (cache, { data }) => {
			if (data) {
				// Update the user's cached list of trips to remove the trip that was just canceled.
				const launches = data.cancelTrip.launches;
				if (launches) {
					const launch = launches[0];
					cache.modify({
						id: cache.identify({
							__typename: "User",
							id: localStorage.getItem("userId"),
						}),
						fields: {
							trips: (existingTrips) => {
								const launchRef = cache.writeFragment({
									data: launch,
									fragment: removeLaunchFragment,
								});
								return existingTrips.filter(
									(tripRef: Reference) =>
										tripRef === launchRef
								);
							},
						},
					});
				}
			}
		},
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>An error occurred</p>;

	const handleCancelTripButtonClicked = async () => {
		await cancelTrip();
	};

	return (
		<div>
			<Button
				onClick={handleCancelTripButtonClicked}
				data-testid={"action-button"}
			>
				Cancel This Trip
			</Button>
		</div>
	);
};

const ToggleTripButton: React.FC<ActionButtonProps> = ({ id }) => {
	const cartItems = useReactiveVar(cartItemsVar);
	const isInCart = id && cartItems.includes(id);

	return (
		<div>
			<Button
				onClick={() => {
					if (id) {
						cartItemsVar(
							isInCart
								? cartItems.filter((itemId) => itemId !== id)
								: [...cartItems, id]
						);
					}
				}}
				data-testid={"action-button"}
			>
				{isInCart ? "Remove from Cart" : "Add to Cart"}
			</Button>
		</div>
	);
};

const ActionButton: React.FC<
	Pick<
		LaunchDetailTypes.LaunchDetails_launch,
		keyof { id: any; isBooked: any }
	>
> = ({ isBooked, id }) =>
	isBooked ? <CancelTripButton id={id} /> : <ToggleTripButton id={id} />;

export default ActionButton;
