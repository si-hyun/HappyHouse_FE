<template>
  <b-row class="d-flex justify-content-center">
    <!-- img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top -->
    <b-card
      :title="apt.address | getAptName"
      tag="article"
      style="width: 30rem"
      class="mb-4 mx-3"
      v-for="(apt, index) in allLikeApts"
      :key="index"
    >
      <b-icon icon="heart-fill" variant="danger" style="width: 20px; height: 20px;"></b-icon>
      <h6 style="display: inline-block"><b-badge variant="danger">{{ apt.likecnt }}</b-badge></h6>
      <b-card-text>
        <table class="table">
          <tbody>
            <tr>
              <th>가격</th>
              <td>{{ apt.price }}</td>
            </tr>
            <tr>
              <th>면적</th>
              <td>{{ apt.area }}</td>
            </tr>
            <tr>
              <th>층수</th>
              <td>{{ apt.floor }}</td>
            </tr>
            <tr>
              <th>주소</th>
              <td>{{ apt.address }}</td>
            </tr>
          </tbody>
        </table>
      </b-card-text>
    </b-card>
  </b-row>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "AllLikeApt",
  created() {
    this.getAllLikeApt();
  },
  filters: {
    getAptName(value) {
      return value.split(" ").slice(-1)[0];
    },
  },
  computed: {
    ...mapState("houseStore", ["allLikeApts"]),
  },
  methods: {
    ...mapActions("houseStore", ["getAllLikeApt"]),
  },
};
</script>

<style></style>
