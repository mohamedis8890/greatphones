import http from "./httpService";

const apiUrl = "http://localhost:3001/";

export function getPhones() {
	return http.get(apiUrl + "phones");
}

export function getPhone(id) {
	return http.get(apiUrl + "phones/" + id);
}

export function savePhone(phone) {
	return http.put(apiUrl + "phones/" + phone.id, phone);
}

export function getVendors() {
	return http.get(apiUrl + "vendors");
}

export function getVendor(id) {
	return http.get(apiUrl + "vendors/" + id);
}
