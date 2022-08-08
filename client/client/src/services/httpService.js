import axios from "axios";
import config from "../config/config.json";

axios.defaults.baseURL = config.apiUrl;

function setCommonHeader(headerName, value) {
  axios.defaults.headers[headerName] = value;
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  setCommonHeader,
};

export default http;
