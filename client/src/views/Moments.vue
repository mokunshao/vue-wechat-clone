<template>
  <div class="moments">
    <Header title="朋友圈" btnIcon="camera" :hasLeft="true"></Header>
    <div class="container">
      <img :src="user.avatar" :alt="user.avatar">
      {{user.username}}
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import jwt_decode from "jwt-decode";
export default {
  name: "Moments",
  components: { Header },
  computed: {
    user() {
      const token = localStorage.wxToken;
      const decoded = jwt_decode(token);
      console.log(decoded);
      return decoded;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(100% - 50px);
  padding-top: 50px;
  overflow: auto;
}
</style>
