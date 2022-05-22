import React from "react";
import styled from "@emotion/styled";

import { unit } from "../styles";
import { cardClassName } from "./launch-tile";
import { getBackgroundImage } from "../utils";

const LaunchDetail = ({ id, site, rocket }: any) => (
	<Card
		className={cardClassName}
		style={{
			backgroundImage: getBackgroundImage(id),
		}}
	>
		<h3>
			{rocket && rocket.name} ({rocket && rocket.type})
		</h3>
		<h5>{site}</h5>
	</Card>
);

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Card = styled.div({
	height: 365,
	marginBottom: unit * 4,
});

export default LaunchDetail;
