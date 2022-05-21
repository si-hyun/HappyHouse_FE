import { listComment, writeComment, deleteComment } from "@/api/comment";

const commentStore = {
  namespaced: true,
  state: {
    comments: [],
  },
  getters: {
    comments(state) {
      return state.comments;
    },
  },
  mutations: {
    GET_COMMENT(state, data) {
      state.comments = data;
    },
    WRITE_COMMENT(state, comment) {
      state.comments.push(comment);
    },
    DELETE_COMMENT(state, comment) {
      let no = state.comments.indexOf(comment);
      state.comments.splice(no, 1);
    },
  },
  actions: {
    getComment({ commit }, articleno) {
      console.log("불러온다!");
      listComment(
        articleno,
        (response) => {
          commit("GET_COMMENT", response.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    writeComment({ commit }, comment) {
      writeComment(comment, () => {
        commit("WRITE_COMMENT", comment);
      });
    },
    deleteComment({ commit }, comment) {
      deleteComment(comment.commentno, () => {
        commit("DELETE_COMMENT", comment);
      });
    },
  },
};

export default commentStore;
