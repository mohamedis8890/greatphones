import axios from "axios";

const apiUrl = "http://localhost:3001/";

export function getPhones() {
  return axios.get(apiUrl + "phones");
}

export function getVendors() {
  return axios.get(apiUrl + "vendors");
}
