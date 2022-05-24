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
    houses: {{ allhouses }}
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
    <b-table
      striped
      hover
      id="user-table"
      :items="allhouses"
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
      perPage: 5,
      currentPage: 1,
    };
  },
  computed: {
    ...mapState(houseStore, ["allhouses"]),
    // houses() {
    //   return this.$store.state.houses;
    // },
  },
  methods: {},
  computed: {
    rows() {
      return this.allhouses.length;
    },
  },
};
</script>

<style></style>
