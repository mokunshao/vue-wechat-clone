<template>
  <div>
    <Header title="我"/>
    <div class="container">
      <div class="cellWrapper">
        <div class="cellTitle" v-if="user">
          <img :src="user.avatar" alt="avatar">
          <span>{{user.username}}</span>
        </div>
      </div>
      <div class="btnWrapper">
        <YButton @click="logout">
          <template v-slot:default>退出登录</template>
        </YButton>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import jwt_decode from "jwt-decode";
import YButton from "../components/YButton";

export default {
  name: "Me",
  components: {
    Header,
    YButton
  },
  methods: {
    logout() {
      localStorage.removeItem("wxToken");
      this.$router.push("/login");
    }
  },
  computed: {
    user() {
      const token = localStorage.wxToken;
      const decoded = jwt_decode(token);
      return decoded;
    }
  }
};
</script>

<style lang="scss" scoped>
.cellWrapper {
  background-color: #fff;
  box-sizing: border-box;
  font-size: 16px;
  overflow: hidden;
  padding: 10px 8px;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  .cellTitle {
    img {
      width: 4rem;
      height: 4rem;
      vertical-align: middle;
      margin-right: 0.6rem;
    }
    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
}
.btnWrapper {
  box-sizing: border-box;
  margin: 20px;
}
</style>
