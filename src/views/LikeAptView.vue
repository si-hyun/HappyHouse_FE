<template>
  <b-container fluid class="text-center bv-example-row mt-3 mx-4">
    <h3 class="underline-green mb-4">
      <b-icon icon="bookmark-heart"></b-icon> 관심매물 Service
    </h3>
    <div>
      <b-nav tabs class="mb-4" align="center">
        <b-nav-item
          style="font-size: 20px"
          :to="{ name: 'AllLikeApt' }"
          :active="$route.name == 'AllLikeApt'"
          >전체 인기 순위</b-nav-item
        >
        <b-nav-item
          style="font-size: 20px"
          :to="{ name: 'MyLikeApt' }"
          :active="$route.name == 'MyLikeApt'"
          >나의 관심 매물</b-nav-item
        >
      </b-nav>
    </div>
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
