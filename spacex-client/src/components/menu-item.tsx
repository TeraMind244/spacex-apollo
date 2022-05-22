import styled from "@emotion/styled";
import { css } from "@emotion/css";
import { Link } from "@reach/router";

import { colors, unit } from "../styles";

export const menuItemClassName = css({
	flexGrow: 1,
	width: 0,
	fontFamily: "inherit",
	fontSize: 16,
	color: "inherit",
	letterSpacing: 1.5,
	textTransform: "uppercase",
	textAlign: "center",
	svg: {
		display: "block",
		width: 30,
		margin: `0 auto ${unit}px`,
		fill: colors.secondary,
	},
});

const MenuItem = styled(Link)({
	textDecoration: "none",
});

export default MenuItem;
