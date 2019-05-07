<template>
  <div class="scroll-wrap" ref="wrapper">
    <div>
      <div class="pulldown" v-if="dragTip.showLoading">
        <div class="clear">
          <div class="fl">
            <img width="16" src="../assets/scroll_load.gif" alt="loading">
            <div class="fl">{{dragTip.text}}</div>
          </div>
        </div>
      </div>
      <slot></slot>
      <div class="pullup">
        <div class="clear" v-if="!isDone">
          <div class="fl">
            <img width="16" src="../assets/scroll_load.gif" alt>
            <div class="fl">加载中...</div>
          </div>
        </div>
        <div class="list-donetip" v-else>
          <slot name="doneTip">没有更多数据</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
      dragTip: {
        text: "下拉刷新",
        showLoading: false
      },
      isDone: false
    };
  },
  methods: {
    reset() {
      this.isDone = false;
      setTimeout(() => {
        this.dragTip = {
          text: "下拉刷新",
          showLoading: false
        };
      }, 500);
    },
    initScroll() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 1
      });
      this.scroll.on("scroll", pos => {
        this.dragTip.showLoading = true;
        if (pos.y > 30) {
          this.dragTip.text = "释放刷新";
        }
      });
      this.scroll.on("touchEnd", pos => {
        this.dragTip.showLoading = false;
        if (pos.y > 30) {
          this.dragTip.text = "刷新中...";
          this.$emit("pulldown");
          this.$on("refreshEnd", this.reset);
        }
      });
      this.scroll.on("scrollEnd", () => {
        if (this.scroll.y <= this.scroll.maxScrollY + 50) {
          this.$emit("pullup");
          this.$on("loadedDone", () => {
            this.isDone = true;
          });
        }
      });
    }
  },
  mounted() {
    this.initScroll();
  }
};
</script>

<style lang="scss" scoped>
.scroll-wrap {
  height: 100%;
  .pulldown,
  .pullup {
    height: 50px;
    position: relative;
    color: #888;
    .clear {
      padding: 10px 0px;
      font-size: 0.28rem;
      position: absolute;
      left: 50%;
      top: 5px;
      transform: translate(-50%, 0);
      .fl {
        display: inline-block;
        img {
          vertical-align: middle;
          margin-right: 0.2rem;
        }
      }
    }
    .list-donetip {
      text-align: center;
      line-height: 50px;
      font-size: 0.28rem;
    }
  }
}
</style>
