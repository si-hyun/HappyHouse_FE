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
  api.post(`/map/likeapt`, { params }).then(success).catch(fail);
}

function regsiterlikeArea(params, success, fail) {
  api.post(`/map/likearea`, { params }).then(success).catch(fail);
}

function likeAptList(params, success, fail) {
  api.get(`/map/likeapt`, { params }).then(success).catch(fail);
}

function likeAreaList(params, success, fail) {
  api.get(`/map/likearea`, { params }).then(success).catch(fail);
}

export { sidoList, gugunList, houseList, registerlikeApt, regsiterlikeArea, likeAptList, likeAreaList };
