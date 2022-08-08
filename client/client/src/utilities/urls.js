const BASE_URL = "/"; //dev

exports.AUTH_URLS = {
  LOGIN_POST: BASE_URL + "api/v1/auth/login",
  LOGIN_GET: "",
  LOGOUT: BASE_URL + "api/v1/auth/logout",
};

exports.HOT_URLS = {
  LOCATE_BY_ADDRESS: BASE_URL + "api/v1/hot/locate/address",
  GET_SLOTS: BASE_URL + "api/v1/hot/slots",
};

exports.IBC_URLS = {
  LOCATE_BY_ADDRESS: BASE_URL + "api/v1/ibc/locate/address",
  GET_SLOTS: BASE_URL + "api/v1/ibc/slots",
};
