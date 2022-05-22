import React from "react";
import styled from "@emotion/styled";

import { unit, colors } from "../styles";

export default function PageContainer(props: any) {
	return (
		<>
			<Bar />
			<Container>{props.children}</Container>
		</>
	);
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Bar = styled.div({
	flexShrink: 0,
	height: 24,
	backgroundColor: colors.primary,
	position: "sticky",
	top: 0,
});

const Container = styled.div({
	display: "flex",
	flexDirection: "column",
	flexGrow: 1,
	width: "100%",
	maxWidth: 600,
	margin: "0 auto",
	padding: unit * 3,
	paddingBottom: unit * 5,
});
