<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col
          cols="11"
          class="bg-light p-3 mb-3 d-flex justify-content-between"
        >
          <span class="pl-5">{{ comment.content }} </span>
          <span class="pr-4">
            {{ comment.userid }} {{ comment.regtime | dateFormat }}</span
          >
        </b-col>

        <b-col class="p-2 mb-3"
          ><b-button
            variant="secondary"
            v-if="checkUserInfo.userid === comment.userid"
            @click="deleteNowComment"
            >X</b-button
          ></b-col
        >
      </b-row>
    </b-container>
  </div>
</template>

<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BoardCommentItem",
  props: {
    comment: Object,
  },
  filters: {
    dateFormat(regtime) {
      return moment(new Date(regtime)).format("YY.MM.DD");
    },
  },
  methods: {
    ...mapActions("commentStore", ["deleteComment"]),
    deleteNowComment() {
      if (confirm("정말로 삭제하시겠습니까?")) {
        this.deleteComment(this.comment);
      }
    },
  },
  computed: {
    ...mapGetters("memberStore", ["checkUserInfo"]),
  },
};
</script>

<style></style>
