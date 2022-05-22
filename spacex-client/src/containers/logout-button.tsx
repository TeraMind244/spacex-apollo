import React from "react";
import styled from "@emotion/styled";
import { useApolloClient } from "@apollo/client";

import { menuItemClassName } from "../components/menu-item";
import { isLoggedInVar } from "../cache";
import { colors } from "../styles";

import { ReactComponent as ExitIcon } from "../assets/icons/exit.svg";

const LogoutButton = () => {
	const client = useApolloClient();

	return (
		<StyledButton
			data-testid="logout-button"
			className={menuItemClassName}
			onClick={() => {
				// Evict and garbage-collect the cached user object
				client.cache.evict({ fieldName: "me" });
				client.cache.evict({ fieldName: "launches" });
				client.cache.gc();

				// Remove user details from localStorage
				localStorage.removeItem("token");
				localStorage.removeItem("userId");

				// Set the logged-in status to false
				isLoggedInVar(false);
			}}
		>
			<ExitIcon width={48} height={48} fill={colors.textSecondary} />
			Logout
		</StyledButton>
	);
};

export default LogoutButton;

const StyledButton = styled.button({
	border: "none",
	padding: 0,
	backgroundColor: "transparent",
});
