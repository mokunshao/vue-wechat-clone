<template>
  <div class="cellWrapper">
    <div class="imgWrapper">
      <img :src="momentsObj.img" alt>
    </div>
    <div class="contentWrapper">
      <div class="cellName">{{momentsObj.name}}</div>
      <div class="cellText" v-if="momentsObj.text">{{momentsObj.text}}</div>
      <div class="cellImgs" v-if="momentsObj.imgs.length > 0">
        <img v-for="(item,index) in momentsObj.imgs" :key="index" :src="item" alt>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CellView",
  props: {
    momentsObj: Object
  }
};
</script>

<style lang="scss" scoped>
.cellWrapper {
  box-sizing: border-box;
  padding: 16px;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  flex-direction: row;
  .imgWrapper {
    flex: 1;
    img {
      width: 40px;
      height: 40px;
    }
  }
  .contentWrapper {
    flex: 9;
    padding-left: 8px;
    .cellName {
      font-weight: bold;
      color: #8cafe6;
    }
    div {
      // margin-top: 8px;
      word-wrap: break-word;
    }
    .cellImgs {
      // width: 100%;
      // overflow: hidden;
      img {
        width: 31%;
        height: 6rem;
        float: left;
        margin-right: 5px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
