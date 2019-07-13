import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndpoint = "http://localhost:3001/auth";
const tokenKey = "token";
http.setJwt(getJwt());

export function getJwt() {
	return localStorage.getItem(tokenKey);
}

export async function login(email, password) {
	const { data: jwt } = await http.post(apiEndpoint + "/login", {
		email,
		password
	});

	localStorage.setItem(tokenKey, jwt.access_token);
}

export function loginWithJwt(jwt) {
	localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
	try {
		const jwt = localStorage.getItem(tokenKey);
		return jwtDecode(jwt);
	} catch (ex) {
		return null;
	}
}

export function logout() {
	localStorage.removeItem(tokenKey);
}

export default {
	login,
	loginWithJwt,
	getJwt,
	getCurrentUser,
	logout
};
