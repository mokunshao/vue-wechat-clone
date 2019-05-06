<template>
  <header class="header">
    <div class="headerButton" v-if="hasLeft">
      <font-awesome-icon icon="chevron-left"/>
      <button @click="$router.go(-1)">返回</button>
    </div>
    <div class="headerTitle">{{title}}</div>
    <div class="headerButton" v-if="btnIcon">
      <button @click="$emit('clickRight')">
        <font-awesome-icon :icon="btnIcon"/>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String,
    hasLeft: {
      type: Boolean,
      default: false
    },
    btnIcon: String
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  background-color: #272626;
  box-sizing: border-box;
  color: #fff;
  font-size: 18px;
  height: 50px;
  line-height: 1;
  padding: 0 10px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 99;
  .headerButton button {
    background-color: transparent;
    border: 0;
    box-shadow: none;
    color: inherit;
    display: inline-block;
    padding: 0;
    font-size: inherit;
    outline: none;
  }
  .headerTitle {
    flex: 1;
  }
}
</style>

