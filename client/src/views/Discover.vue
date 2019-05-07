<template>
  <div class="discover">
    <Header title="发现"/>
    <div class="content">
      <Cell :path="cellData.path" :title="cellData.title" :src="cellData.src"/>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Cell from "../components/Cell";

export default {
  name: "Discover",
  components: {
    Header,
    Cell
  },
  data() {
    return {
      cellData: {
        src: "pyq.jpg",
        title: "朋友圈",
        path: "/moments"
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.discover {
  height: 100%;
  .content {
    flex: 1;
  }
}
</style>
