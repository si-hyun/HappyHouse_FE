<template>
  <b-container v-if="houses && houses.length != 0" class="bv-example-row mt-3">
    <div v-if="Array.isArray(houses)">
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
    </div>
  </b-container>
  <b-container v-else class="bv-example-row mt-3">
    <b-row>
      <b-col><b-alert show>주택 목록이 없습니다.</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import HouseListItem from "@/components/house/HouseListItem.vue";
import { mapState } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseList",
  components: {
    HouseListItem,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(houseStore, ["houses"]),
    // houses() {
    //   return this.$store.state.houses;
    // },
  },
  methods: {},
};
</script>

<style></style>
