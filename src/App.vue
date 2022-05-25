<template>
  <div id="app">
    <navi-bar />
    <router-view />
  </div>
</template>

<script>
import NaviBar from "@/components/layout/HeaderNaviBar.vue";

//주석
export default {
  name: "App",
  components: {
    NaviBar,
  },
};
</script>

<style>
@font-face {
  font-family: "myfont";
  src: url("@/assets/fonts/KOTRA_GOTHIC.ttf") format("woff");
  font-weight: normal;
  font-style: normal;
}
.App {
  text-align: center;
  font-size: 50px;
  font-family: myfont;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
  font-weight: bold;
  color: chartreuse;
}

a.router-link-exact-active {
  color: #3aa4ca;
}
</style>
