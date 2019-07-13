import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

export default function ProtectedRoute({
	path,
	render,
	component: Component,
	...rest
}) {
	return (
		<Route
			render={props => {
				if (!getCurrentUser()) return <Redirect to="/login" />;
				return Component ? <Component {...props} /> : render(props);
			}}
			{...rest}
		/>
	);
}
