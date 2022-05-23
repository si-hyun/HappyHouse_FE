<template>
  <b-container class="mt-4">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>회원관리</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="10">
        <b-table striped hover :items="users"></b-table>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { getAllUser } from "../../api/member";

export default {
  name: "MemberManage",
  data() {
    return {
      users: [],
    };
  },
  created() {
    getAllUser((response) => {
      this.users = response.data;
    });
  },
  methods: {
    DeleteMember() {
      this.$router.replace({
        name: "deletemyinfo",
      });
    },
  },
};
</script>

<style></style>
