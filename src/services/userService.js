import http from "./httpService";

const apiEndpoint = "http://localhost:3001/users";

export default function registerUser(user) {
	return http.post(apiEndpoint, user);
}
