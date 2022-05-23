<template>
  <b-container class="mt-4">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>회원관리</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="10" class="overflow-auto">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>
        <b-table
          striped
          hover
          id="user-table"
          :items="users"
          :per-page="perPage"
          :current-page="currentPage"
        ></b-table>
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
      perPage: 5,
      currentPage: 1,
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
  computed: {
    rows() {
      return this.users.length;
    },
  },
};
</script>

<style></style>
