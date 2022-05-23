<template>
  <div style="position: relative">
    <div id="map"></div>
    <!-- <p><button @click="removeCircles()">모두 지우기</button><br /></p> -->
    <ul id="category">
      <li id="BK9" data-order="0">
        <span class="category_bg bank"></span>
        은행
      </li>
      <li id="MT1" data-order="1">
        <span class="category_bg mart"></span>
        마트
      </li>
      <li id="PM9" data-order="2">
        <span class="category_bg pharmacy"></span>
        약국
      </li>
      <li id="OL7" data-order="3">
        <span class="category_bg oil"></span>
        주유소
      </li>
      <li id="CE7" data-order="4">
        <span class="category_bg cafe"></span>
        카페
      </li>
      <li id="CS2" data-order="5">
        <span class="category_bg store"></span>
        편의점
      </li>
    </ul>
    <br />
  </div>
</template>

<script>
// import { mapState, mapActions, mapMutations } from "vuex";
// import { mapState } from "vuex";

export default {
  name: "KakaoMap",
  data() {
    return {
      cmarkers: [],
      placeOverlay: null,
      currCategory: "",
      ps: null,
      contentNode: null,
    };
  },
  props: {
    map: Object,
  },
  methods: {
    init() {
      //마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이
      this.placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 });
      // 장소 검색 객체 생성
      this.ps = new kakao.maps.services.Places(map);
      this.contentNode = document.createElement("div");
      // this.contendNode.className = "placeinfo_wrap";
      this.addEventHandle(
        this.contentNode,
        "mousedown",
        kakao.maps.event.preventMap
      );
      this.addEventHandle(
        this.contentNode,
        "touchstart",
        kakao.maps.event.preventMap
      );
      this.placeOverlay.setContent(this.contentNode);

      kakao.maps.event.addListener(this.map, "idle", this.searchPlaces);
    },
    addEventHandle(target, type, callback) {
      if (target.addEventListener) {
        target.addEventListener(type, callback);
      } else {
        target.attachEvent("on" + type, callback);
      }
    },
    onClickCategory(id, className) {
      this.placeOverlay.setMap(null);

      if (className === "on") {
        this.currCategory = "";
        this.changeCategoryClass();
        this.removeCMarkers();
      } else {
        this.currCategory = id;
        this.changeCategoryClass(this);
        this.searchPlaces();
      }
    },
    changeCategoryClass(el) {
      console.log("changeCategoryClass()");
      let category = document.getElementById("category"),
        children = category.children,
        i;

      for (i = 0; i < children.length; i++) {
        children[i].className = "";
      }

      if (el) {
        el.className = "on";
      }
    },
    removeCMarkers() {
      for (let i = 0; i < this.cmarkers.length; i++) {
        this.cmarkers[i].setMap(null);
      }
      this.cmarkers = [];
    },
    searchPlaces() {
      // console.log("searchPlaces()");
      if (!this.currCategory) {
        return;
      }
      // 커스텀 오버레이를 숨깁니다
      this.placeOverlay.setMap(null);

      // 지도에 표시되고 있는 마커를 제거합니다
      this.removeCMarkers();

      this.ps.categorySearch(this.currCategory, this.placesSearchCB, {
        // useMapBounds: true,
        location: this.map.getCenter(),
      });
    },
    // 장소검색이 완료됐을 때 호출되는 콜백함수
    placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
        this.displayPlaces(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
      } else if (status === kakao.maps.services.Status.ERROR) {
        // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
      }
    },
    displayPlaces(places) {
      // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
      // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
      let order = document
        .getElementById(this.currCategory)
        .getAttribute("data-order");

      let displayPlaceInfo = this.displayPlaceInfo;
      for (let i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        let marker = this.addMarkers(
          new kakao.maps.LatLng(places[i].y, places[i].x),
          order
        );

        // 마커와 검색결과 항목을 클릭 했을 때
        // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
        (function (marker, place) {
          kakao.maps.event.addListener(marker, "click", function () {
            displayPlaceInfo(place);
          });
        })(marker, places[i]);
      }

      // //div에 가까운 순으로 결과 출력
      // let aptloc = markers[0].getPosition();
      // //console.log("APT Marker: "+aptloc);
      // for (let i = 0; i < places.length; i++) {
      //   let lat = places[i].y;
      //   let lng = places[i].x;
      //   places[i].distance = getDistance(
      //     lat,
      //     lng,
      //     aptloc.getLat(),
      //     aptloc.getLng()
      //   );
      //   //console.log("distance: "+places[i].distance+"m");
      // }

      // //거리가 가까운 순으로 정렬
      // places.sort(function (a, b) {
      //   if (a.distance < b.distance) return -1;
      //   else if (a.distance > b.distance) return 1;
      //   else return 0;
      // });

      // let table = $("#conviTable");
      // let div = $("#conviDiv");
      // let str = `<tr>
      //  <th>거리</th>
      // <th>이름</th>
      // <th>주소</th>
      // <th>전화번호</th>
      // </tr>`;
      // places.forEach(function (data, index) {
      //   if (index >= 10) return; //10개 까지만 뿌리기
      //   str += `
      //  <tr>
      //  <td>${data.distance}m</td>
      // <td><a href="${data.place_url}">${data.place_name}</a></td>
      // <td>${data.road_address_name}</td>
      // <td>${data.phone}</td>
      // </tr>
      //  `;
      // });
      // div.empty();
      // div.append(`<br><br><h3><strong>주변 편의시설 목록</strong></h3>`);
      // table.empty();
      // table.append(str);
    },
    addMarkers(position, order) {
      let imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(27, 28), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(46, order * 36), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(11, 28), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(this.map); // 지도 위에 마커를 표출합니다
      this.cmarkers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    },
    // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수
    displayPlaceInfo(place) {
      var content =
        '<div class="placeinfo">' +
        '   <a class="title" href="' +
        place.place_url +
        '" target="_blank" title="' +
        place.place_name +
        '">' +
        place.place_name +
        "</a>";

      if (place.road_address_name) {
        content +=
          '    <span title="' +
          place.road_address_name +
          '">' +
          place.road_address_name +
          "</span>" +
          '  <span class="jibun" title="' +
          place.address_name +
          '">(지번 : ' +
          place.address_name +
          ")</span>";
      } else {
        content +=
          '    <span title="' +
          place.address_name +
          '">' +
          place.address_name +
          "</span>";
      }

      content +=
        '    <span class="tel">' +
        place.phone +
        "</span>" +
        "</div>" +
        '<div class="after"></div>';

      this.contentNode.innerHTML = content;
      this.placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
      this.placeOverlay.setMap(this.map);
    },
  },
  mounted() {
    this.$emit("readyMap");

    // 각 카테고리에 클릭 이벤트 등록
    let category = document.getElementById("category"),
      children = category.children;

    for (let i = 0; i < children.length; i++) {
      // children[i].onclick = this.onClickCategory;
      children[i].addEventListener("click", () => {
        this.onClickCategory(children[i].id, children[i].className);
      });
    }

    //kakao.map을 인식 못해서 0.5초 기다린 후 전역 변수 초기화 진행
    setTimeout(this.init, 500);
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 500px;
}

/* map category위한 css */
#category {
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 5px;
  border: 1px solid #909090;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  background: #fff;
  overflow: hidden;
  z-index: 2;
  margin-left: 0;
  padding-left: 0;
}
#category li {
  float: left;
  list-style: none;
  width: 50px;
  border-right: 1px solid #acacac;
  padding: 6px 0;
  text-align: center;
  cursor: pointer;
}
#category li.on {
  background: #eee;
}
#category li:hover {
  background: #ffe6e6;
  border-left: 1px solid #acacac;
  margin-left: -1px;
}
#category li:last-child {
  margin-right: 0;
  border-right: 0;
}
#category li span {
  display: block;
  margin: 0 auto 3px;
  width: 27px;
  height: 28px;
}
#category li .category_bg {
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png)
    no-repeat;
}
#category li .bank {
  background-position: -10px 0;
}
#category li .mart {
  background-position: -10px -36px;
}
#category li .pharmacy {
  background-position: -10px -72px;
}
#category li .oil {
  background-position: -10px -108px;
}
#category li .cafe {
  background-position: -10px -144px;
}
#category li .store {
  background-position: -10px -180px;
}
#category li.on .category_bg {
  background-position-x: -36px;
}
.placeinfo_wrap {
  position: absolute;
  bottom: 28px;
  left: -150px;
  width: 300px;
}
.placeinfo {
  position: relative;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  background: #fff;
}
.placeinfo:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.placeinfo_wrap .after {
  content: "";
  position: relative;
  margin-left: -12px;
  left: 50%;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.placeinfo a,
.placeinfo a:hover,
.placeinfo a:active {
  color: #fff;
  text-decoration: none;
}
.placeinfo a,
.placeinfo span {
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.placeinfo span {
  margin: 5px 5px 0 5px;
  cursor: default;
  font-size: 13px;
}
.placeinfo .title {
  font-weight: bold;
  font-size: 14px;
  border-radius: 6px 6px 0 0;
  margin: -1px -1px 0 -1px;
  padding: 10px;
  color: #fff;
  background: #d95050;
  background: #d95050
    url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png)
    no-repeat right 14px center;
}
.placeinfo .tel {
  color: #0f7833;
}
.placeinfo .jibun {
  color: #999;
  font-size: 11px;
  margin-top: 0;
}
.info {
  position: relative;
  top: 5px;
  left: 5px;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  font-size: 12px;
  padding: 5px;
  background: #fff;
  list-style: none;
  margin: 0;
}
.info:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.info .label {
  display: inline-block;
  width: 50px;
}
.number {
  font-weight: bold;
  color: #00a0e9;
}
</style>
