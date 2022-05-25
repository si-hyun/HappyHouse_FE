<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>게시글목록</h3></b-alert>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-form @submit.prevent="search()">
          <b-row>
            <b-col>
              <b-form-input
                v-model="text"
                placeholder="글 제목 검색"
                type="text"
              ></b-form-input>
            </b-col>
            <b-button type="submit" variant="primary">검색</b-button>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
    <br />

    <b-table
      hover
      :items="articles"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      sort-icon-right
      @row-clicked="goBoardItem"
    ></b-table>
    <b-pagination
      align="center"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      :limit="10"
      aria-controls="my-table"
    ></b-pagination>
    <b-row class="mb-1">
      <b-col class="text-right mb-3">
        <b-button variant="outline-secondary" @click="moveWrite()"
          >글쓰기
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
/* eslint-disable */
import { listArticle, searchArticleBySubject } from "@/api/board.js";
//import moment from "moment";

export default {
  name: "BoardList",
  data() {
    return {
      sortBy: "age",
      sortDesc: false,
      fields: [
        { subject: "제목" },
        { userid: "글쓴이" },
        { key: "hit", label: "조회수", sortable: true },
        { regtime: "등록시간" },
      ],
      perPage: 10,
      currentPage: 1,
      articles: [],
      text: "",
    };
  },
  created() {
    listArticle(
      (response) => {
        this.articles = response.data;
        console.log(this.articles);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  computed: {
    rows() {
      return this.articles.length;
    },
  },
  // filters: {
  //   datefilter(date,format) {
  //     return moment(new Date(date)).format(format);
  //   },
  // },
  methods: {
    moveWrite() {
      this.$router.push({ name: "boardRegister" });
    },
    search() {
      let param = {
        text: this.text,
      };
      searchArticleBySubject(
        param,
        (response) => {
          this.articles = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    goBoardItem(item) {
      this.$router.push({
        name: "boardDetail",
        params: { articleno: item.articleno },
      });
    },
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
</style>
