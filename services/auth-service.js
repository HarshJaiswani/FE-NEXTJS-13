import ApiBase from "./api-base";

const login = async ({ email, password }) => {
  const response = await ApiBase.postWithoutHeader("/api/auth/login/", {
    email,
    password,
  });

  if (response.access_token && response.refresh_token) {
    ApiBase.setAccessToken(response.access_token);
    ApiBase.setRefreshToken(response.refresh_token);
  }

  return response;
};

const sendValidationEamil = async (userForm) => {
  const response = await ApiBase.postWithoutHeader(
    "/api/auth/signup/",
    userForm
  );

  return response;
};

const register = async (userForm) => {
  const response = await ApiBase.postWithoutHeader(
    "/api/auth/signup/",
    userForm
  );

  if (response.access_token && response.refresh_token) {
    ApiBase.setAccessToken(response.access_token);
    ApiBase.setRefreshToken(response.refresh_token);
  }

  return response;
};

const getUserDetails = async () => {
  return await ApiBase.get("/api/fetch_all_users/");
};

const getMe = async () => {
  const response = await ApiBase.get("/api/users/");
  return response;
};

const updateMe = async (userForm) => {
  const response = await ApiBase.patch("/api/users/", userForm);
  return response;
};

const logout = async () => {
  const response = await ApiBase.deleteAuthCookies();
  return response;
};

const forgotPassword = async (creds) => {
  const response = await ApiBase.post("/api/auth/forgot_password/", creds);
  return response;
};

const changePassword = async (creds) => {
  const response = await ApiBase.post("/api/auth/change_password/", creds);
  return response;
};

const deactivateMe = async () => {};

const AuthenticationService = {
  logout,
  login,
  getMe,
  updateMe,
  getUserDetails,
  sendValidationEamil,
  register,
  forgotPassword,
  changePassword,
  deactivateMe,
};

export default AuthenticationService;
