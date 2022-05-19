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
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-primary" @click="moveWrite()"
          >글쓰기</b-button
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="articles.length">
        <b-table-simple hover responsive>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>글번호</b-th>
              <b-th>제목</b-th>
              <b-th>조회수</b-th>
              <b-th>작성자</b-th>
              <b-th>작성일</b-th>
            </b-tr>
          </b-thead>
          <tbody>
            <!-- 하위 component인 ListRow에 데이터 전달(props) -->
            <board-list-item
              v-for="article in articles"
              :key="article.articleno"
              v-bind="article"
            />
          </tbody>
        </b-table-simple>
      </b-col>
      <!-- <b-col v-else class="text-center">도서 목록이 없습니다.</b-col> -->
    </b-row>
  </b-container>
</template>

<script>
/* eslint-disable */
import { listArticle, searchArticleBySubject } from "@/api/board.js";
import BoardListItem from "@/components/board/item/BoardListItem";

export default {
  name: "BoardList",
  components: {
    BoardListItem,
  },
  data() {
    return {
      articles: [],
      text: "",
    };
  },
  created() {
    let param = {
      pg: 1,
      spp: 20,
      key: null,
      word: null,
    };
    listArticle(
      param,
      (response) => {
        this.articles = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "boardRegister" });
    },
    search() {
      // http.get(`/board/search?text=${this.text}`).then(({ data }) => {
      //   this.articles = data;
      //   console.log(this.articles);
      // });
      let param = {
        pg: 1,
        spp: 10,
        key: null,
        word: null,
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
