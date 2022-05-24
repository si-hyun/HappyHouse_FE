<template>
  <b-row class="d-flex justify-content-around">
    <!-- img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top -->
    <b-card
      :title="apt.address | getAptName"
      tag="article"
      style="width: 30rem"
      class="mb-4"
      v-for="(apt, index) in allLikeApts"
      :key="index"
    >
      <b-badge variant="info">{{ apt.likecnt }}</b-badge>
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
  filters: {
    getAptName(value) {
      return value.split(" ").slice(-1)[0];
    },
  },
  computed: {
    ...mapState("houseStore", ["allLikeApts"]),
  },
};
</script>

<style></style>
