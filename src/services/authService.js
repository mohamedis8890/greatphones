import http from "./httpService";

const apiEndpoint = "http://localhost:3001/auth";
http.setJwt(getJwt());

export function getJwt() {
  return localStorage.getItem("token");
}

export async function login(email, password) {
  return await http.post(apiEndpoint + "/login", { email, password });
}
