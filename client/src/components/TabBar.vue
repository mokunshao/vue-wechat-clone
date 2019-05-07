<template>
  <div class="tabBar">
    <router-link
      class="tabItem"
      v-for="item in data"
      :to="item.path"
      :key="item.title"
      active-class="isSelected"
    >
      <div class="tabItemIcon">
        <font-awesome-icon :icon="item.icon"/>
      </div>
      <div class="tabItemLabel">{{item.title}}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  props: {
    data: Array
  }
};
</script>

<style lang="scss" scoped>
.tabBar {
  box-sizing: border-box;
  // width: 100%;
  // position: fixed;
  // bottom: 0;
  background-image: linear-gradient(
    180deg,
    #d9d9d9,
    #d9d9d9 50%,
    transparent 0
  );
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-color: #fafafa;
  display: flex;
  text-align: center;
  .tabItem {
    display: block;
    padding: 7px 0;
    flex: 1;
    .tabItemIcon {
      svg {
        width: 24px;
        height: 24px;
        margin: 0 auto 5px;
      }
    }
    .tabItemLabel {
      color: inherit;
      font-size: 12px;
      line-height: 1;
    }
  }
}

a {
  text-decoration: none;
  color: #888;
}

.isSelected {
  color: #20af0e;
}
</style>
