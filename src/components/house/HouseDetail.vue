<template>
  <b-container v-if="house" class="bv-example-row">
    <b-row>
      <b-col
        ><h3>{{ house.아파트 }}</h3></b-col
      >
      <b-col>
        <b-button
          id="likeBtn"
          ref="likeBtn"
          variant="outline-danger"
          @click="registerLikeApt"
        >
          <b-icon icon="heart"> 관심매물 등록 </b-icon>
        </b-button>
        <b-badge variant="danger">{{ likecnt }}</b-badge>
      </b-col>
    </b-row>
    <b-row class="mb-1 mt-1">
      <b-col
        ><b-img :src="require('@/assets/apt.png')" fluid-grow></b-img
      ></b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="secondary"
          >일련번호 : {{ house.일련번호 }}</b-alert
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="primary"
          >아파트 이름 : {{ house.아파트 }}
        </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="info">법정동 : {{ house.법정동 }} </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="warning">층수 : {{ house.층 }}층</b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="danger"
          >거래금액 :
          {{
            (parseInt(house.거래금액.replace(",", "")) * 10000) | price
          }}원</b-alert
        >
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseDetail",
  data() {
    return {
      likecnt: 0,
    };
  },
  computed: {
    ...mapState(houseStore, [
      "house",
      "cursido",
      "curgugun",
      "likeApts",
      "allLikeApts",
    ]),
    // house() {
    //   return this.$store.state.house;
    // },
  },
  filters: {
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  methods: {
    ...mapActions(houseStore, ["addLikeApt"]),
    async registerLikeApt() {
      let serialno = this.house.일련번호;
      for (let i = 0; i < this.likeApts.length; i++) {
        let apt = this.likeApts[i];
        if (apt.serialno === serialno) {
          alert("이미 관심매물로 등록된 매물입니다!");
          return;
        }
      }

      let userid = this.$store.state.memberStore.userInfo.userid;
      let address =
        this.cursido +
        " " +
        this.curgugun +
        " " +
        this.house.도로명 +
        " " +
        this.house.아파트;
      let floor = this.house.층 + "층";
      let area = this.house.전용면적 + "㎡";
      let price = this.house.거래금액.trim() + "만원";
      await this.addLikeApt({ serialno, userid, address, floor, area, price });
      let btn = this.$refs.likeBtn;
      btn.className = "btn btn-danger";
    },
  },
  updated() {
    console.log("changed!");
    let serialno = this.house.일련번호;
    let btn = this.$refs.likeBtn;
    btn.className = "btn btn-outline-danger";
    for (let i = 0; i < this.likeApts.length; i++) {
      let apt = this.likeApts[i];
      if (apt.serialno === serialno) {
        btn.className = "btn btn-danger";
        console.log("like it!");
        break;
      }
    }

    for (let i = 0; i < this.allLikeApts.length; i++) {
      if (this.allLikeApts[i].serialno == this.serialno) {
        this.likecnt = this.allLikeApts[i].likecnt;
        break;
      }
    }
  },
};
</script>

<style></style>
