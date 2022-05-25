<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>상세보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="listArticle">목록</b-button>
      </b-col>
      <b-col class="text-right">
        <b-button
          v-if="article.userid === userInfo.userid"
          variant="outline-info"
          size="sm"
          @click="moveModifyArticle"
          class="mr-2"
          >수정</b-button
        >
        <b-button
          v-if="article.userid === userInfo.userid"
          variant="outline-danger"
          size="sm"
          @click="deleteArticle"
          >삭제</b-button
        >
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${article.subject}</h3><div><h6>${article.userid}</div><div>${article.regtime}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-input-group prepend="댓글 추가" class="mb-5">
      <b-form-textarea
        v-model="newcontent"
        ref="inputcomment"
      ></b-form-textarea>
      <b-button @click="writeNewComment" variant="primary">추가</b-button>
    </b-input-group>
    <!-- 하위 component인 ListRow에 데이터 전달(props) -->
    <board-comment-item
      v-for="(comment, index) in this.comments"
      :comment="comment"
      :key="index"
    />
  </b-container>
</template>
<script>
// import moment from "moment";
import { getArticle, deleteArticle, updateHit } from "@/api/board";
import BoardCommentItem from "@/components/board/item/BoardCommentItem";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "BoardDetail",
  components: { BoardCommentItem },

  data() {
    return {
      article: {},
      fields: ["userid", "content", "regtime"],
      newcontent: "",
    };
  },
  computed: {
    ...mapState("memberStore", ["userInfo"]),
    ...mapGetters("commentStore", ["comments"]),
    message() {
      if (this.article.content)
        return this.article.content.split("\n").join("<br>");
      return "";
    },
  },
  created() {
    getArticle(
      this.$route.params.articleno,
      (response) => {
        this.article = response.data;
        if (this.article.userid !== this.userInfo.userid) {
          updateHit(this.article.articleno);
        }
      },
      (error) => {
        console.log("삭제시 에러발생!!", error);
      }
    );
    this.getComment(this.$route.params.articleno);
  },
  methods: {
    ...mapActions("commentStore", ["getComment", "writeComment"]),
    listArticle() {
      this.$router.push({ name: "boardList" });
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "boardModify",
        params: { articleno: this.article.articleno },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        deleteArticle(this.article.articleno, () => {
          this.$router.push({ name: "boardList" });
        });
      }
    },
    writeNewComment() {
      if (this.newcontent) {
        const newcomment = {
          articleno: this.article.articleno,
          content: this.newcontent,
          userid: this.$store.state.memberStore.userInfo.userid,
          regtime: Date(),
        };
        this.writeComment(newcomment);
        this.newcontent = "";
        //this.$refs.inputcomment.focus();
      } else {
        alert("한 글자 이상 입력해주세요!");
        this.$refs.inputcomment.focus();
      }
    },
  },
  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style></style>
