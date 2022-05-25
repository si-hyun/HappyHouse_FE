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
      v-for="(apt, index) in likeApts"
      :key="index"
    >
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

      <b-button @click="goMap(apt.serialno)" variant="outline-primary"
        >지도에서 보기</b-button
      >
      <b-button
        @click="deleteApt(apt.serialno)"
        variant="outline-danger"
        class="mx-2"
        >삭제</b-button
      >
    </b-card>
  </b-row>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "MyLikeApt",
  filters: {
    getAptName(value) {
      return value.split(" ").slice(-1)[0];
    },
  },
  computed: {
    ...mapState("houseStore", ["likeApts"]),
  },
  methods: {
    ...mapMutations("houseStore", ["SET_WANT_SEE_APT"]),
    ...mapActions("houseStore", ["deleteLikeApt"]),
    deleteApt(serialno) {
      this.deleteLikeApt(serialno);
    },
    goMap(serialno) {
      this.SET_WANT_SEE_APT(serialno);
      this.$router.push({ name: "house" });
    },
  },
};
</script>

<style></style>
