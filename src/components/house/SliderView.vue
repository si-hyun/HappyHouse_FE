<template>
  <div>
    <!-- <div class="mt-3" style="text-align: right; color: gray">
      <span>비활성화</span>
    </div> -->
    <div class="d-flex justify-content-around">
      <slider-bar-1 :from="pricefrom" :to="priceto"></slider-bar-1>
      <slider-bar-2 :from="areafrom" :to="areato"></slider-bar-2>
      <slider-bar-3 :from="floorfrom" :to="floorto"></slider-bar-3>
      <slider-bar-4 :from="yearfrom" :to="yearto"></slider-bar-4>
      <button class="btn btn-outline-primary" @click="btnClick">검색</button>
    </div>
    <!-- 
    <div style="d-flex justify-content-start">
      <div>
        <i v-if="pricefrom || priceto"> (price){{ pricefrom }}~{{ priceto }}</i>
        <i v-if="areafrom || areato"> (area){{ areafrom }}~{{ areato }} </i>
        <i v-if="areafrom || areato"> (floor){{ floorfrom }}~{{ floorto }} </i>
        <i v-if="yearfrom || yearto"> (year){{ yearfrom }}~{{ yearto }} </i>
      </div>
    </div> -->
  </div>
</template>

<script>
import SliderBar1 from "@/components/house/SliderBar1.vue";
import SliderBar2 from "@/components/house/SliderBar2.vue";
import SliderBar3 from "@/components/house/SliderBar3.vue";
import SliderBar4 from "@/components/house/SliderBar4.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "SliderView",
  data() {
    return {
      gugunCode: null,
      from: 0,
      to: 0,
      pricefrom: 0,
      priceto: 0,
      areafrom: 0,
      areato: 0,
      floorfrom: 0,
      floorto: 0,
      yearfrom: 0,
      yearto: 0,
    };
  },
  computed: {
    ...mapState("houseStore", ["curGugunCode"]),
  },
  components: {
    SliderBar1,
    SliderBar2,
    SliderBar3,
    SliderBar4,
  },
  methods: {
    ...mapActions("houseStore", ["getFilteredHouseList"]),
    btnClick() {
      let pricefrom = document.getElementById("pricefrom").children[1].value;
      let priceto = document.getElementById("priceto").children[1].value;
      let areafrom = document.getElementById("areafrom").children[1].value;
      let areato = document.getElementById("areato").children[1].value;
      let floorfrom = document.getElementById("floorfrom").children[1].value;
      let floorto = document.getElementById("floorto").children[1].value;
      let yearfrom = document.getElementById("yearfrom").children[1].value;
      let yearto = document.getElementById("yearto").children[1].value;
      console.log("price:", pricefrom, priceto);
      console.log("area:", areafrom, areato);
      console.log("floor:", floorfrom, floorto);
      console.log("year:", yearfrom, yearto);

      let className = document.getElementById("pricefrom").className;
      let str = className.split(" ");
      if (str[str.length - 1] === "ivu-input-wrapper-disabled")
        pricefrom = null;

      className = document.getElementById("areafrom").className;
      str = className.split(" ");
      if (str[str.length - 1] === "ivu-input-wrapper-disabled") areafrom = null;

      className = document.getElementById("floorfrom").className;
      str = className.split(" ");
      if (str[str.length - 1] === "ivu-input-wrapper-disabled")
        floorfrom = null;

      className = document.getElementById("yearfrom").className;
      str = className.split(" ");
      if (str[str.length - 1] === "ivu-input-wrapper-disabled") yearfrom = null;

      this.getFilteredHouseList({
        pricefrom,
        priceto,
        areafrom,
        areato,
        floorfrom,
        floorto,
        yearfrom,
        yearto,
        curGugunCode: this.curGugunCode,
      });
    },
  },
};
</script>

<style>
span::after {
  content: "";
  display: block;
  clear: both;
}
</style>
