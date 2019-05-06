<template>
  <div class="moments">
    <Header title="朋友圈" btnIcon="camera" :hasLeft="true" ></Header>
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
      const decode = jwt_decode(token);
      return decode;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
