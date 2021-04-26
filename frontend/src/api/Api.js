import axios from "axios";
import Auth from "../services/Auth";

const BASE_URL = "http://localhost:8080";

const Api = axios.create({
  baseURL: BASE_URL,
});

Api.interceptors.request.use((config) => {
  if (Auth.isLoggedIn()) {
    const authHeader = Auth.getAuthorizationHeader();
    config.headers["common"]["authorization"] = authHeader;
  }

  return config;
});

Api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response && [401, 403].indexOf(err.response.status) !== -1) {
      Auth.logout();
    }

    return Promise.reject(err);
  }
);

// Exporting Api into the global namespace for introspecting
window.Api = Api;

export default Api;
