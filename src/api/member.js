import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${userid}`).then(success).catch(fail);
}

function deleteUserInfo(userid, success, fail) {
  api.delete(`/user/info/${userid}`).then(success).catch(fail);
}

function changeUserInfo(user, success, fail) {
  api.put(`/user/info`, JSON.stringify(user)).then(success).catch(fail);
}

function checkUserId(userid, success, fail) {
  api.get(`/user/${userid}`).then(success).catch(fail);
}

function signUp(user, success, fail) {
  api.post(`/user/info`, JSON.stringify(user)).then(success).catch(fail);
}

function getAllUser(success, fail) {
  api.get(`/user/info`).then(success).catch(fail);
}
// function logout(success, fail)

export {
  login,
  findById,
  deleteUserInfo,
  changeUserInfo,
  checkUserId,
  signUp,
  getAllUser,
};
