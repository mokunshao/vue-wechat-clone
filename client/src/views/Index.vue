<template>
  <div class="index">
    <div class="content">
      <router-view/>
    </div>
    <TabBar :data="tabBarData"/>
  </div>
</template>

<script>
import TabBar from "../components/TabBar";

export default {
  name: "Index",
  components: {
    TabBar
  },
  data() {
    return {
      tabBarData: [
        { title: "微信", icon: "comments", path: "/chat" },
        { title: "通讯录", icon: "address-book", path: "/contact" },
        { title: "发现", icon: "compass", path: "/discover" },
        { title: "我的", icon: "user", path: "/me" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.index {
  display: flex;
  height: 100%;
  flex-direction: column;
  background: #f1f1f1;
  // height: calc(100% - 57px);
  .content {
    flex: 1;
    overflow: auto;
    // display: flex;
    // flex-direction: column;
    // margin-top: 50px;
    // height: calc(100% - 50px);
  }
}
</style>
