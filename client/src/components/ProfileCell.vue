<template>
  <div class="cellWrapper" v-if="user">
    <div class="cellTitle">
      <img :src="user.avatar" alt="avatar">
      <span>{{user.username}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileCell",
  props: {
    user: Object
  }
};
</script>

<style lang="scss" scoped>
.cellWrapper {
  margin-top: 15px;
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
</style>
