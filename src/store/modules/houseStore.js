/* eslint-disable */
import {
  sidoList,
  gugunList,
  houseList,
  registerlikeApt,
  regsiterlikeArea,
  likeAptList,
  likeAreaList,
  deleteLikeApt,
  deleteLikeArea,
  likeAllAptList,
} from "@/api/house.js";

/* eslint-disable */
const houseStore = {
  namespaced: true,
  state: {
    sidos: [{ value: null, text: "선택하세요" }],
    guguns: [{ value: null, text: "선택하세요" }],
    cursido: "",
    curgugun: "",
    curGugunCode: "",
    houses: [],
    totalCount: 0,
    house: null,
    likeApts: [],
    allLikeApts: [],
  },

  getters: {},

  mutations: {
    SET_SIDO_LIST: (state, sidos) => {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
      });
    },
    SET_GUGUN_LIST: (state, guguns) => {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
      });
    },
    CLEAR_SIDO_LIST: (state) => {
      state.sidos = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_GUGUN_LIST: (state) => {
      state.guguns = [{ value: null, text: "선택하세요" }];
    },
    SET_HOUSE_LIST: (state, houses) => {
      //   console.log(houses);
      state.houses = houses;
    },
    SET_DETAIL_HOUSE: (state, house) => {
      state.house = house;
    },
    SET_TOTAL_COUNT: (state, totalCount) => {
      state.totalCount = totalCount;
    },
    SET_CUR_SIDO: (state, sido) => {
      state.cursido = sido;
    },
    SET_CUR_GUGUN: (state, gugun) => {
      state.curgugun = gugun;
    },
    SET_LIKE_APTS: (state, apts) => {
      state.likeApts = apts;
      // console.log(state.likeApts);
    },
    ADD_LIKE_APT(state, apt) {
      state.likeApts.push(apt);
    },
    DELETE_LIKE_APT(state, serialno) {
      for (let i = 0; i < state.likeApts.length; i++) {
        if (state.likeApts[i].serialno === serialno) {
          state.likeApts.splice(i, 1);
          break;
        }
      }
    },
    SET_ALL_LIKE_APT(state, apts) {
      state.allLikeApts = apts;
    },
    SET_CUR_GUGUN_CODE(state, gugunCode) {
      state.curGugunCode = gugunCode;
    }
  },

  actions: {
    getSido: ({ commit }) => {
      sidoList(
        ({ data }) => {
          // console.log(data);
          commit("SET_SIDO_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getGugun: ({ commit }, sidoCode) => {
      const params = {
        sido: sidoCode,
      };
      gugunList(
        params,
        ({ data }) => {
          // console.log(commit, response);
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getHouseList: ({ commit }, gugunCode) => {
      // vue cli enviroment variables 검색
      //.env.local file 생성.
      // 반드시 VUE_APP으로 시작해야 한다.
      const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;
      //   const SERVICE_KEY =
      //     "9Xo0vlglWcOBGUDxH8PPbuKnlBwbWU6aO7%2Bk3FV4baF9GXok1yxIEF%2BIwr2%2B%2F%2F4oVLT8bekKU%2Bk9ztkJO0wsBw%3D%3D";
      const params = {
        LAWD_CD: gugunCode,
        // DEAL_YMD: "202110",
        DEAL_YMD: "202204",
        serviceKey: decodeURIComponent(SERVICE_KEY),
      };
      houseList(
        params,
        (response) => {
          console.log(response.data.response.body);
          commit("SET_TOTAL_COUNT", response.data.response.body.totalCount);
          commit("SET_HOUSE_LIST", response.data.response.body.items.item);
          commit("SET_CUR_GUGUN_CODE", gugunCode);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getHouseListPage: ({ commit }, payload) => {
      let { gugunCode, pageno } = payload;
      console.log("pageno", pageno);
      const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;
      //   const SERVICE_KEY =
      //     "9Xo0vlglWcOBGUDxH8PPbuKnlBwbWU6aO7%2Bk3FV4baF9GXok1yxIEF%2BIwr2%2B%2F%2F4oVLT8bekKU%2Bk9ztkJO0wsBw%3D%3D";
      const params = {
        LAWD_CD: gugunCode,
        DEAL_YMD: "202204",
        pageNo: pageno,
        serviceKey: decodeURIComponent(SERVICE_KEY),
      };
      houseList(
        params,
        (response) => {
          commit("SET_HOUSE_LIST", response.data.response.body.items.item);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getAllHouseList: ({ commit }, payload) => {
      const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;
      const params = {
        LAWD_CD: gugunCode,
        DEAL_YMD: "202204",
        numOfRows: 200,
        serviceKey: decodeURIComponent(SERVICE_KEY),
      };

      setTimeout(() => {
        houseList(
          params,
          (response) => {
            commit("SET_HOUSE_LIST", response.data.response.body.items.item);
          },
          (error) => {
            console.log(error);
          }
        );
      }, 500);
    },
    detailHouse: ({ commit }, house) => {
      // 나중에 house.일련번호를 이용하여 API 호출
      commit("SET_DETAIL_HOUSE", house);
      console.log(house);
    },
    addLikeApt: ({ commit }, apt) => {
      console.log(apt);
      registerlikeApt(
        apt,
        (response) => {
          //console.log(response.data);
          commit("ADD_LIKE_APT", apt);
          alert("관심 매물 등록 성공!");
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getLikeApt: ({ commit }, userid) => {
      likeAptList(
        userid,
        (response) => {
          commit("SET_LIKE_APTS", response.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    deleteLikeApt({ commit }, serialno) {
      console.log("Here is deleteLikeApt");
      console.log(serialno);
      deleteLikeApt(serialno, () => {
        commit("DELETE_LIKE_APT", serialno);
        alert("관심 매물 삭제 완료!");
      });
    },
    getAllLikeApt({ commit }) {
      likeAllAptList(
        (response) => commit("SET_ALL_LIKE_APT", response.data),
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
/* eslint-enable */

export default houseStore;
