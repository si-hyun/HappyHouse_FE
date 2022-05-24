<template>
  <b-container class="bv-example-row mt-3 text-center">
    <h3 class="underline-green mb-4">
      <b-icon icon="bookmark-heart"></b-icon> 관심매물 Service
    </h3>
    <b-row class="d-flex justify-content-between">
      <!-- img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top -->
      <b-card
        title="Card Title"
        tag="article"
        style="max-width: 20rem"
        class="mb-4"
        v-for="(apt, index) in likeApts"
        :key="index"
      >
        <b-card-text>
          {{ apt.address }}
        </b-card-text>

        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
    </b-row>
  </b-container>
</template>

<script>
import { likeAptList } from "@/api/house.js";

export default {
  name: "LikeAptView",
  data() {
    return {
      likeApts: [],
    };
  },
  created() {
    likeAptList(this.$store.state.memberStore.userInfo.userid, (response) => {
      this.likeApts = response.data;
      console.log("관심매물 불러오기 성공!");
    });
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
