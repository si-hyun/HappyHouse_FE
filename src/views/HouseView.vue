<template>
  <b-container class="bv-example-row mt-3 text-center">
    <h3 class="underline-orange">
      <b-icon icon="house-fill"></b-icon> House Service
    </h3>
    <b-row>
      <b-col>
        <house-search-bar @displayMarkers="displayMarkers"></house-search-bar>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6" align="left">
        <house-list />
      </b-col>
      <b-col cols="6">
        <house-detail />
      </b-col>
    </b-row>
    <!-- <kakao-map v-bind="map"></kakao-map> -->
    <kakao-map @readyMap="readyMap"></kakao-map>
  </b-container>
</template>

<script>
import HouseSearchBar from "@/components/house/HouseSearchBar.vue";
import HouseList from "@/components/house/HouseList.vue";
import HouseDetail from "@/components/house/HouseDetail.vue";
import KakaoMap from "@/components/house/KakaoMap.vue";

import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "HouseView",
  components: {
    HouseSearchBar,
    HouseList,
    HouseDetail,
    KakaoMap,
  },
  data() {
    return {
      map: null,
      markers: [],
      geocoder: null,
      cmarkers: [],
      bankList: [],
      martList: [],
      drugList: [],
      gasList: [],
      cafeList: [],
      convList: [],
      customOverlay: null,
      circles: [],
    };
  },
  computed: {
    ...mapState("houseStore", ["sidos", "guguns", "houses"]),
    // sidos() {
    //   return this.$store.state.sidos;
    // },
  },
  methods: {
    ...mapActions("houseStore", ["getSido", "getGugun", "getHouseList"]),
    ...mapMutations("houseStore", ["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST"]),
    readyMap() {
      if (!window.kakao || !window.kakao.maps) {
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}&libraries=services`;
        /* global kakao */
        script.addEventListener("load", () => {
          kakao.maps.load(this.initMap);
        });
        document.head.appendChild(script);
      } else {
        this.initMap();
      }
    },
    initMap() {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567, 16),
        level: 3, // 지도의 확대 레벨
      };
      this.map = new kakao.maps.Map(mapContainer, mapOption);
      console.log("setMap complete");
    },
    removeCircles() {
      for (var i = 0; i < this.circles.length; i++) {
        this.circles[i].circle.setMap(null);
        this.circles[i].polyline.setMap(null);
        this.circles[i].overlay.setMap(null);
      }
      this.circles = [];
    },
    removeMarker() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },
    removeCMarker() {
      for (var i = 0; i < this.cmarkers.length; i++) {
        this.cmarkers[i].setMap(null);
      }
      this.cmarkers = [];
    },
    displayMarkers(sido, gugun) {
      console.log("DisplayMarkers():", this.houses);
      // 주소-좌표 변환 객체를 생성
      this.geocoder = new kakao.maps.services.Geocoder();
      let map = this.map;
      let bounds = new kakao.maps.LatLngBounds();
      for (let i = 0; i < this.houses.length; i++) {
        let address = sido + " " + gugun + " " + this.houses[i].도로명;
        let houseName = this.houses[i].아파트;
        console.log(address);
        // 주소로 좌표를 검색합니다
        this.geocoder.addressSearch(address, function (result, status) {
          // 정상적으로 검색이 완료됐으면
          console.log(status);
          if (status === kakao.maps.services.Status.OK) {
            let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            // 결과값으로 받은 위치를 마커로 표시합니다
            let marker = new kakao.maps.Marker({
              map: map,
              position: coords,
            });
            // 인포윈도우로 장소에 대한 설명을 표시합니다
            let infowindow = new kakao.maps.InfoWindow({
              content: `<div style="width:150px;text-align:center;padding:6px 0;">${houseName}</div>`,
            });
            infowindow.open(map, marker);
            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            bounds.extend(coords);
            map.setBounds(bounds);
          }
        });
      }
    },
    // displayMarkers(places) {
    //   console.log("HouseView - displayMarkers()");
    //   console.log("places:", places);
    //   let fragment = document.createDocumentFragment();
    //   let bounds = new kakao.maps.LatLngBounds();
    //   //var listStr = "";

    //   // 지도에 표시되고 있는 마커를 제거합니다
    //   this.removeMarker();
    //   for (let i = 0; i < places.length; i++) {
    //     let placePosition = new kakao.maps.LatLng(places[i].lat, places[i].lng);
    //     let marker = this.addMarker(placePosition, i);
    //     let itemEl = this.getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
    //     // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    //     // LatLngBounds 객체에 좌표를 추가합니다
    //     bounds.extend(placePosition);
    //     // 마커와 검색결과 항목에 mouseover 했을때
    //     // 해당 장소에 인포윈도우에 장소명을 표시합니다
    //     // mouseout 했을 때는 인포윈도우를 닫습니다
    //     (function (marker, title, code, place) {
    //       kakao.maps.event.addListener(marker, "click", function () {
    //         this.displayInfowindow(marker, title, place);
    //       });
    //       kakao.maps.event.addListener(this.map, "click", function () {
    //         console.log(this.customOverlay);
    //         if (this.customOverlay) this.customOverlay.setMap(null);
    //       });
    //       itemEl.onmouseover = function () {
    //         this.displayInfowindow(marker, title);
    //       };
    //       itemEl.onmouseout = function () {
    //         this.customOverlay.setMap(null);
    //       };
    //     })(marker, places[i].aptName, places[i].aptCode, places[i]);

    //     fragment.appendChild(itemEl);
    //   }
    //   // 마커를 생성하고 지도에 표시합니다
    //   // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    //   this.map.setBounds(bounds);
    // },
    // addMarker(position, idx, title) {
    //   console.log(title);
    //   let imageSrc =
    //       "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
    //     imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
    //     imgOptions = {
    //       spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
    //       spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
    //       offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    //     },
    //     markerImage = new kakao.maps.MarkerImage(
    //       imageSrc,
    //       imageSize,
    //       imgOptions,
    //     ),
    //     marker = new kakao.maps.Marker({
    //       position: position, // 마커의 위치
    //       image: markerImage,
    //     });

    //   marker.setMap(this.map); // 지도 위에 마커를 표출합니다
    //   this.markers.push(marker); // 배열에 생성된 마커를 추가합니다

    //   return marker;
    // },
  },
};
</script>

<style scoped>
.underline-orange {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(231, 149, 27, 0.3) 30%
  );
}
</style>
