<template>
  <b-container v-if="houses && houses.length != 0" class="bv-example-row mt-3">
    <!-- <div v-if="Array.isArray(houses)">
      <house-list-item
        v-for="(house, index) in houses"
        :key="index"
        :house="house"
      />
    </div>
    <div v-else>
      <house-list-item
        :house="houses"
      />
    </div> -->
    <b-pagination
      class="mb-3"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      :limit="10"
      @page-click="handleClick"
      aria-controls="my-table"
    ></b-pagination>
    <b-table
      hover
      id="user-table"
      :items="houses"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      @row-clicked="goDetail"
    ></b-table>
  </b-container>
  <b-container v-else class="bv-example-row mt-3">
    <b-row>
      <b-col><b-alert show>주택 목록이 없습니다.</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
//import HouseListItem from "@/components/house/HouseListItem.vue";
import { mapActions, mapState } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseList",
  components: {
    //HouseListItem,
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      fields: ["일련번호", "아파트"],
    };
  },
  computed: {
    ...mapState(houseStore, ["houses"]),
    // houses() {
    //   return this.$store.state.houses;
    // },
    rows() {
      return this.houses.length;
    },
  },
  methods: {
    ...mapActions("houseStore", ["detailHouse"]),
    goDetail(item) {
       this.detailHouse(item);
    },
    handleClick(e, page){
      // console.log(page);
      let start = 10*(page-1);
      let end = (this.houses.length < start + 10 ? this.houses.length : start + 10);
      let houseList = [];
      for(let i=start; i<end; i++){
        houseList.push(this.houses[i]);
      }
      this.$emit("showMarkers", houseList);
    }
  },
};
</script>

<style></style>
