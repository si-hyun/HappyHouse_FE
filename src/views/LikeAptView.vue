<template>
  <b-container fluid class="text-center bv-example-row mt-3 mx-4">
    <h3 class="underline-green mb-4">
      <b-icon icon="bookmark-heart"></b-icon> 관심매물 Service
    </h3>
    <b-row class="d-flex justify-content-around">
      <!-- img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top -->
      <b-card
        :title="apt.address | getAptName"
        tag="article"
        style="width: 30rem"
        class="mb-4"
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

        <b-button @click="deleteApt(apt.serialno)" variant="danger"
          >Delete</b-button
        >
      </b-card>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "LikeAptView",
  filters: {
    getAptName(value) {
      return value.split(" ").slice(-1)[0];
    },
  },
  computed: {
    ...mapState("houseStore", ["likeApts"]),
  },
  methods: {
    ...mapActions("houseStore", ["deleteLikeApt"]),
    deleteApt(serialno) {
      console.log("Here");
      this.deleteLikeApt(serialno);
    },
  },
};
</script>

<style scoped>
.underline-green {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(56, 233, 40, 0.3) 30%
  );
}
</style>
