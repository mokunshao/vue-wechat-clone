<template>
  <div class="cellWrapper" @click="emit('click')">
    <div class="cellTitle">
      <img :src="user.avatar" alt="avatar">
      <span v-show="count" class="badge">{{count}}</span>
      <span>{{user.username}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCell",
  props: {
    user: Object,
    count: Number
  }
};
</script>

<style lang="scss" scoped>
.cellWrapper {
  background-color: #fff;
  box-sizing: border-box;
  color: inherit;
  display: flex;
  font-size: 16px;
  overflow: hidden;
  padding: 8px;
  width: 100%;
  border-bottom: 1px solid #d9d9d9;
  .cellTitle {
    flex: 1;
    & img {
      width: 2.5rem;
      height: 2.5rem;
      vertical-align: middle;
      margin-right: 0.6rem;
    }
    & span {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .badge {
    background-color: #ff0a0a;
    border-radius: 10px;
    color: #fff;
    display: inline-block;
    font-size: 12px;
    height: 18px;
    line-height: 18px;
    padding: 0 6px;
    text-align: center;
    white-space: nowrap;
    border: 1px solid #fff;
    position: absolute;
    left: 2rem;
  }
}
</style>
