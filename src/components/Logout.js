import React from "react";
import { logout } from "../services/authService";

export default function Logout(props) {
	logout();
	props.onUserStateChanged();
	props.history.push("/");
	return <div>You are being logged out...</div>;
}
