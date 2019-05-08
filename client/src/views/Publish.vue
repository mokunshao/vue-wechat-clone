<template>
  <div class="publish">
    <div class="header">
      <button @click="$router.go(-1)">取消</button>
      <button @click="publish">发表</button>
    </div>
    <div class="content">
      <div class="text_wrap">
        <textarea placeholder="说说你的感受..." v-model="text"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Publish",
  data() {
    return {
      text: ""
    };
  },
  methods: {
    publish() {}
  }
};
</script>

<style lang="scss" scoped>
.publish {
  height: 100%;
  position: relative;
  overflow: hidden;
  .header {
    height: 50px;
    box-sizing: border-box;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    button {
      border: none;
      outline: none;
      background-color: transparent;
      font-size: 16px;
      &:nth-child(2) {
        color: #20af0e;
      }
    }
  }
  .content {
    box-sizing: border-box;
    padding: 16px;
    .text_wrap textarea {
      width: 100%;
      font-size: 14px;
      min-height: 60px;
      border: none;
      outline: none;
    }
  }
}
</style>
