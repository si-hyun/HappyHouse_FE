<template>
  <div>
    <b-card no-body class="overflow-hidden">
      <b-row>
        <b-col>
          <p class="mt-0 mb-1">
            {{ comment.userid }} {{ comment.regtime | dateFormat }}
          </p>
        </b-col>
        <b-col>
          <h5 class="mb-0">
            {{ comment.content }}
          </h5>
        </b-col>
        <b-col class="right-align">
          <b-button
            v-if="checkUserInfo.userid === comment.userid"
            @click="deleteNowComment"
            >삭제</b-button
          >
        </b-col>
      </b-row>
    </b-card>
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
    ...mapActions("commentStore", ["getComment", "deleteComment"]),
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
