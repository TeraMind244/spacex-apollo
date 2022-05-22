import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/css";
import { Link } from "@reach/router";

import { unit } from "../styles";
import { getBackgroundImage } from "../utils";

const LaunchTile = ({ launch }: any) => {
	const { id, mission, rocket } = launch;
	return (
		<StyledLink
			to={`/launch/${id}`}
			className={cardClassName}
			style={{
				backgroundImage: getBackgroundImage(id),
			}}
		>
			<h3>{mission.name}</h3>
			<h5>{rocket.name}</h5>
		</StyledLink>
	);
};

export default LaunchTile;

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

export const cardClassName = css({
	padding: `${unit * 4}px ${unit * 5}px`,
	borderRadius: 7,
	color: "white",
	backgroundSize: "cover",
	backgroundPosition: "center",
});

const padding = unit * 2;

const StyledLink = styled(Link)({
	display: "block",
	height: 193,
	marginTop: padding,
	textDecoration: "none",
	":not(:last-child)": {
		marginBottom: padding * 2,
	},
});
