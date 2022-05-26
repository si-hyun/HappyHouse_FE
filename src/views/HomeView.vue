<template>
  <div id="main">
    <div style="text-align: center">
      <h3 class="underline-orange mt-3 mb-5">
        <b-icon icon="house"></b-icon> HAPPY HOUSE
      </h3>
    </div>
    <pre>
      [ Happy House ] &#10;
      Developer: 김수만, 강시현 &#10;
      - 아파트 실거래 자료 조회 서비스 &#10
      - 지역별 아파트 매물 조회 가능 &#10
      - 관심지역 등록 및 조회 가능 &#10;
      - 원하는 조건에 맞춰 필터링하여 검색 가능 &#10;
      - 매물의 위치를 지도에서 확인 가능&#10;
    </pre>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  props: {
    msg: String,
  },
};
</script>
<style scoped>
#main {
  height: 100vh;
  padding: 40px;
  background-image: url("@/assets/main.jpg");
}
pre {
  margin-top: 50px;
  margin-left: 1000px;
  width: 1000px;
  height: 800px;
  padding: 30px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  background-color: #ffffff;
  background-color: rgba(255, 255, 255, 0.5);
}
/* main {
  height: 100vh;
  background-image: url("@/assets/main.jpg");
  background-size: cover;
}

main p {
  height: 700px;
  width: 1000px;
  background-color: rgba(0, 0, 0, 0.132);
}

.underline-orange {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(231, 149, 27, 0.3) 30%
  );
} */
</style>