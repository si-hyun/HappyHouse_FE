<template>
  <b-container
    v-if="allhouses && allhouses.length != 0"
    class="bv-example-row mt-3"
  >
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
      aria-controls="my-table"
    ></b-pagination>
    <b-table
      hover
      id="user-table"
      :items="allhouses"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
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
import { mapState } from "vuex";

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
    ...mapState(houseStore, ["allhouses"]),
    // houses() {
    //   return this.$store.state.houses;
    // },
    rows() {
      return this.allhouses.length;
    },
  },
  methods: {},
};
</script>

<style></style>
