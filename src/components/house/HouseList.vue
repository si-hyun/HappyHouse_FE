<template>
  <b-container v-if="houses && houses.length != 0" class="bv-example-row mt-3">
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
import { mapActions, mapState } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseList",
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      fields: ["일련번호", "아파트"],
    };
  },
  computed: {
    ...mapState(houseStore, ["houses"]),
    rows() {
      return this.houses.length;
    },
  },

  methods: {
    ...mapActions("houseStore", ["detailHouse"]),
    goDetail(item) {
      this.detailHouse(item);
    },
  },
};
</script>

<style></style>
