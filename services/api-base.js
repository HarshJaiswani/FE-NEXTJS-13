import axios from "axios";
// cookie
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const setAccessToken = async (accessToken) => {
  Cookies.set("accessToken", accessToken, {
    expires: 7, // days
  });
};

export const setRefreshToken = async (refreshToken) => {
  Cookies.set("refreshToken", refreshToken, {
    expires: 7 * 4, // days
  });
};

export const deleteAuthCookies = async () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  return { success: true, message: "Cookies Cleared" };
};

export const getAccessToken = async () => {
  let cookie = Cookies.get("accessToken");
  if (!cookie) {
    let refreshCookie = await getRefreshToken();
    cookie = refreshCookie ? refreshToken(refreshCookie) : null;
  }
  return cookie;
};

export const getRefreshToken = async () => {
  return Cookies.get("refreshToken");
};

export const refreshToken = async (refreshCookie) => {
  const response = await ApiBase.post("/api/token/refresh/", {
    refresh_token: refreshCookie,
  });
  await setAccessToken(response.access_token);
  return response.access_token ?? null;
};

export const get = async (url, query = {}) => {
  let headers = {};

  let token = await getAccessToken();

  if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await axios.get(`${baseUrl}${url}`, {
      params: query,
      headers,
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    return { success: false, message: error.response.data };
  }
};

export const post = async (url, data, _headers = {}) => {
  let headers = {};

  let token = await getAccessToken();

  if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
      ..._headers,
    };
  }

  try {
    const response = await axios.post(`${baseUrl}${url}`, data, {
      headers,
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    return { success: false, message: error.response.data };
  }
};

export const getWithoutHeader = async (url, query = {}) => {
  try {
    const response = await axios.get(`${baseUrl}${url}`, {
      params: query,
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    return { success: false, message: error.response.data };
  }
};

export const postWithoutHeader = async (url, data) => {
  try {
    const response = await axios.post(`${baseUrl}${url}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    return { success: false, message: error.response.data };
  }
};

export const patch = async (url, data) => {
  let headers = {};

  let token = await getAccessToken();

  if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await axios.patch(`${baseUrl}${url}`, data, {
      headers,
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    return { success: false, message: error.response.data };
  }
};

export const erase = async (url) => {
  let headers = {};

  let token = await getAccessToken();

  if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await axios.delete(`${baseUrl}${url}`, {
      headers,
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    return { success: false, message: error.response.data };
  }
};
