<template>
  <div>
    <b-row class="mt-4 mb-4 text-center">
      <!-- <b-col class="sm-3">
      <b-form-input
        v-model.trim="dongCode"
        placeholder="동코드 입력...(예 : 11110)"
        @keypress.enter="sendKeyword"
      ></b-form-input>
    </b-col>
    <b-col class="sm-3" align="left">
      <b-button variant="outline-primary" @click="sendKeyword">검색</b-button>
    </b-col> -->
      <b-col class="sm-3">
        <b-form-select
          id="sidoSelect"
          v-model="sidoCode"
          :options="sidos"
          @change="gugunList"
        ></b-form-select>
      </b-col>
      <b-col class="sm-3">
        <b-form-select
          id="gugunSelect"
          v-model="gugunCode"
          :options="guguns"
          @change="searchApt"
        ></b-form-select>
      </b-col>
    </b-row>
    <b-row>
      <!-- <b-pagination-nav
        limit="10"
        id="pageNav"
        :number-of-pages="numOfPage"
        base-url="#"
      ></b-pagination-nav> -->
      <!-- <nav id="pageNav" aria-label="Pagination">
        <ul id="pageUl" class="pagination b-pagination"></ul> -->
      <!-- <ul id="pageUl"></ul> -->
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

/*
  namespaced: true를 사용했기 때문에 선언해줍니다.
  index.js 에서 modules 객체의 '키' 이름입니다.

  modules: {
    키: 값
    memberStore: memberStore,
    houseStore: houseStore
  }
*/
const houseStore = "houseStore";

export default {
  name: "HouseSearchBar",
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      sido: "",
      gugun: "",
      currentPage: 1,
      perPage: 10,
      numOfPage: 1,
      // rows: 100,
    };
  },
  computed: {
    ...mapState(houseStore, ["sidos", "guguns", "houses", "totalCount"]),
    // sidos() {
    //   return this.$store.state.sidos;
    // },
  },
  created() {
    // this.$store.dispatch("getSido");
    // this.sidoList();
    this.CLEAR_SIDO_LIST();
    this.getSido();
  },
  methods: {
    ...mapActions(houseStore, [
      "getSido",
      "getGugun",
      "getHouseList",
      "getAllHouseList",
      "getHouseListPage",
      "getAllHouseList",
    ]),
    ...mapMutations(houseStore, [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "SET_CUR_SIDO",
      "SET_CUR_GUGUN",
    ]),
    // sidoList() {
    //   this.getSido();
    // },
    gugunList() {
      console.log(this.sidoCode);
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) {
        this.getGugun(this.sidoCode);
        let select = document.getElementById("sidoSelect");
        this.sido = select.options[select.selectedIndex].text;
        this.SET_CUR_SIDO(this.sido);
        console.log(this.sido);
      }
    },
    searchApt() {
      if (this.gugunCode) {
        // this.getHouseList(this.gugunCode);
<<<<<<< HEAD
        this.getAllHouseList(this.gugunCode);
=======
        this.getHouseList(this.gugunCode);
        // this.getAllHouseList(this.gugunCode);
>>>>>>> 57d2922032fee779ecd44978698c567b9b358ae8
        let select = document.getElementById("gugunSelect");
        this.gugun = select.options[select.selectedIndex].text;
        this.SET_CUR_GUGUN(this.gugun);
        console.log(this.gugun);

        //houselist를 비동기적으로 가져오기 때문에 1초 기다린 후 지도에 마커 표시
        setTimeout(() => {
          this.$emit("displayMarkers", this.sido, this.gugun);

          // let nav = document.getElementById("pageNav");
          // let ul = nav.firstChild;
          // let val = this.totalCount / this.perPage;
          // this.numOfPage = Math.floor(
          //   this.totalCount % this.perPage == 0 ? val : val + 1
          // );
          // console.log("totalCount:", this.totalCount);
          // console.log("numOfPage", this.numOfPage);

          // setTimeout(() => {
          //   //페이지 선택 표시 초기화
          //   // for (let i = 2; i < ul.children.length - 2; i++) {
          //   //   console.log(ul.children[i].textContent);
          //   //   let li = ul.children[i];
          //   //   li.classList.remove("active");
          //   // }
          //   ul.children[this.currentPage + 1].classList.remove("active");
          //   ul.children[2].classList.add("active");
          //   this.currentPage = 1;

          //   for (let i = 2; i < ul.children.length - 2; i++) {
          //     let li = ul.children[i];
          //     li.addEventListener("click", () => {
          //       this.searchAptPage(i - 1);
          //     });
          //   }
          // }, 500);
        }, 1000);
      }
    },
    // searchAptPage(pageno) {
    //   console.log("searchAptPage()");
    //   if (this.gugunCode) {
    //     this.getHouseListPage({ gugunCode: this.gugunCode, pageno });
    //     let nav = document.getElementById("pageNav");
    //     let ul = nav.firstChild;
    //     ul.children[this.currentPage + 1].classList.remove("active");
    //     this.currentPage = pageno;

    //     //houselist를 비동기적으로 가져오기 때문에 1초 기다린 후 지도에 마커 표시
    //     setTimeout(() => {
    //       this.$emit("displayMarkers", this.sido, this.gugun);
    //     }, 1000);
    //   }
    // },
  },
};
</script>

<style></style>
