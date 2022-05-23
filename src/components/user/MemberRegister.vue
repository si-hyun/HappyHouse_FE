<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>회원가입</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <!-- <b-alert show variant="danger" v-if="isLoginError"
              >아이디 또는 비밀번호를 확인하세요.</b-alert
            > -->
            <b-form @submit.stop.prevent>
              <label for="userid">아이디:</label>
              <b-form-input
                id="userid"
                v-model="user.userid"
                required
                placeholder="아이디 입력...."
                :state="validation"
                ref="idinput"
              ></b-form-input>
              <b-form-invalid-feedback :state="validation">
                아이디는 5-10자로 설정해주세요.
              </b-form-invalid-feedback>
              <b-form-valid-feedback :state="validation">
                OK
              </b-form-valid-feedback>
            </b-form>
            <b-button
              type="button"
              variant="secondary"
              class="m-1"
              @click="checkExistId"
              >아이디 확인</b-button
            >
            {{ msg }}
            <b-form-group label="비밀번호:" label-for="userpwd">
              <b-form-input
                type="password"
                id="userpwd"
                v-model="user.userpwd"
                required
                placeholder="비밀번호 입력...."
              ></b-form-input>
            </b-form-group>
            <b-form-group label="이름:" label-for="username">
              <b-form-input
                type="text"
                id="username"
                v-model="user.username"
                required
                placeholder="이름 입력...."
              ></b-form-input>
            </b-form-group>
            <b-form-group label="이메일:" label-for="useremail">
              <b-form-input
                type="email"
                id="useremail"
                v-model="user.email"
                required
                placeholder="이메일 입력...."
              ></b-form-input>
            </b-form-group>
            <b-button
              type="button"
              variant="primary"
              class="m-1"
              @click="SignUp"
              >회원가입</b-button
            >
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
import { checkUserId } from "../../api/member";
const memberStore = "memberStore";

export default {
  name: "MemberRegister",
  data() {
    return {
      user: {
        userid: "",
        userpwd: null,
        username: null,
        email: null,
      },
      msg: "",
    };
  },
  computed: {
    validation() {
      return this.user.userid.length > 4 && this.user.userid.length < 11;
    },
  },
  methods: {
    ...mapActions(memberStore, ["signUp"]),
    checkExistId() {
      checkUserId(this.user.userid, (response) => {
        if (response.data === 0) {
          this.msg = "사용가능한 아이디입니다.";
        } else {
          this.msg =
            "이미 존재하는 아이디입니다. 새로운 아이디를 입력해주세요.";
          this.user.userid = "";
          this.$refs.idinput.focus();
        }
      });
    },
    SignUp() {
      this.signUp(this.user);
      alert("회원가입 성공!");
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style></style>
