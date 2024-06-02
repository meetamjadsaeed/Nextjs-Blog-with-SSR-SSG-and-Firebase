import axios from "axios";
import { store } from "../../redux";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export function ApiHeaders(headers, isToken = true) {
  const reduxState = store.getState();
  const token = reduxState.persistedReducer.auth.token;

  return {
    ...(isToken ? { Authorization: "Bearer " + token } : {}),
    Authorization: "Bearer " + token,
    ...headers,
  };
}

export default class HttpServices {
  static async get(endpoint, header, tokenRequired) {
    const headers = await ApiHeaders(header, tokenRequired);
    const url = baseUrl + endpoint;
    return axios({ method: "GET", url, headers });
  }

  static async post(endpoint, header, data = {}) {
    const headers = await ApiHeaders(header);
    const url = baseUrl + endpoint;
    return axios({ method: "POST", url, headers, data });
  }

  static async put(endpoint, header, data = {}) {
    const headers = await ApiHeaders(header);
    const url = baseUrl + endpoint;
    return axios({ method: "PUT", url, headers, data });
  }

  static async delete(endpoint, header) {
    const headers = await ApiHeaders(header);
    const url = baseUrl + endpoint;
    return axios({ method: "DELETE", url, headers });
  }

  static async patch(endpoint, header, data = {}) {
    const headers = await ApiHeaders(header);
    const url = baseUrl + endpoint;
    return axios({ method: "PATCH", url, headers, data });
  }
}
