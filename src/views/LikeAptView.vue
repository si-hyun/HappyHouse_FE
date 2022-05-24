<template>
  <b-container fluid class="text-center bv-example-row mt-3 mx-4">
    <h3 class="underline-green mb-4">
      <b-icon icon="bookmark-heart"></b-icon> 관심매물 Service
    </h3>
    <router-view></router-view>
  </b-container>
</template>

<script>
export default {
  name: "likeApt",
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
