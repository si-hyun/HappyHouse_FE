import { apiInstance, houseInstance } from "./index.js";

const api = apiInstance();
const house = houseInstance();

function sidoList(success, fail) {
  api.get(`/map/sido`).then(success).catch(fail);
}

function gugunList(params, success, fail) {
  api.get(`/map/gugun`, { params: params }).then(success).catch(fail);
}

function houseList(params, success, fail) {
  house.get(``, { params: params }).then(success).catch(fail);
}

function registerlikeApt(params, success, fail) {
  api.post(`/map/likeapt`, JSON.stringify(params)).then(success).catch(fail);
}

function regsiterlikeArea(params, success, fail) {
  api.post(`/map/likearea`, JSON.stringify(params)).then(success).catch(fail);
}

function likeAptList(userid, success, fail) {
  api.get(`/map/likeapt/${userid}`).then(success).catch(fail);
}

function likeAreaList(userid, success, fail) {
  api.get(`/map/likearea/${userid}`).then(success).catch(fail);
}

function deleteLikeApt(serialno, success, fail) {
  api.delete(`/map/likeapt/${serialno}`).then(success).catch(fail);
}

function deleteLikeArea(serialno, success, fail) {
  api.delete(`/map/likeapt/${serialno}`).then(success).catch(fail);
}

export {
  sidoList,
  gugunList,
  houseList,
  registerlikeApt,
  regsiterlikeArea,
  likeAptList,
  likeAreaList,
  deleteLikeApt,
  deleteLikeArea,
};
