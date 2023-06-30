import axios from "axios";

const BASE_URL = "https://backendloginauth.onrender.com/api/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

// get token from cookies
const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)zaperon\s*\s*([^;]*).*$)|^.*$/,
  "$1"
);

// set token as default header for userRequest instance
userRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;
