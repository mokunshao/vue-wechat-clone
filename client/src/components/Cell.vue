<template>
  <router-link :to="path">
    <div class="cellWrapper">
      <div class="cellTitle">
        <img :src="fullSrc" :alt="src">
        <span>{{title}}</span>
      </div>
      <div class="cellRight">
        <font-awesome-icon icon="chevron-right"/>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "Cell",
  props: {
    path: String,
    title: String,
    src: String
  },
  computed: {
    fullSrc() {
      return require("../assets/" + this.src);
    }
  }
};
</script>

<style lang="scss" scoped>
.cellWrapper {
  background-color: #fff;
  box-sizing: border-box;
  color: inherit;
  min-height: 48px;
  display: flex;
  font-size: 16px;
  line-height: 1;
  overflow: hidden;
  padding: 0 10px;
  width: 100%;
  line-height: 48px;
  border-bottom: 1px solid #d9d9d9;
  .cellTitle {
    flex: 1;
    img {
      width: 1.2rem;
      height: 1.2rem;
      vertical-align: middle;
      margin-right: 0.4rem;
    }
    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .cellRight {
    color: #888;
  }
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
