<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  name: "App",
  mounted() {
    if (localStorage.wxToken) {
      const decoded = jwt_decode(localStorage.wxToken);
      this.$store.dispatch("setUser", decoded);
    }
  }
};
</script>


<style lang="scss">
html,
body,
#app {
  height: 100%;
  margin: 0;
}
</style>
