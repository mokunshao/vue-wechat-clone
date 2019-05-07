<template>
  <div class="moments">
    <Header title="朋友圈" btnIcon="camera" :hasLeft="true" class="header"></Header>
    <div class="container">
      <Scroll ref="scroll" @pulldown="getLatestData">
        <div class="headWrapper">
          <div class="userInfo">
            <span class="username">{{user.username}}</span>
            <div class="userImg">
              <img :src="user.avatar" :alt="user.username">
            </div>
          </div>
        </div>
        <div class="contentWrapper" style="height:1000px;">
          <CellView v-for="(moment,index) in momentsList" :key="index" :momentsObj="moment"/>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import CellView from "../components/CellView";
import Scroll from "../components/Scroll";
import jwt_decode from "jwt-decode";

export default {
  name: "Moments",
  components: { Header, CellView, Scroll },
  data() {
    return {
      momentsList: {}
    };
  },
  computed: {
    user() {
      const token = localStorage.wxToken;
      const decoded = jwt_decode(token);
      return decoded;
    }
  },
  methods: {
    getLatestData() {
      this.$axios("/api/moment/latest").then(res => {
        this.momentsList = res.data;
        this.$refs.scroll.$emit("refreshEnd");
      });
    }
  },
  mounted() {
    this.getLatestData();
  }
};
</script>

<style lang="scss" scoped>
.moments {
  height: 100%;
  .header {
    position: fixed;
  }
  .container {
    height: calc(100% - 50px);
    padding-top: 50px;
    // overflow: hidden;
    .headWrapper {
      position: relative;
      height: 200px;
      background: url(../assets/cricle_bg.png) no-repeat;
      background-size: 100% 100%;
      .userInfo {
        position: absolute;
        bottom: -30px;
        right: 16px;
        .userImg {
          width: 60px;
          height: 60px;
          padding: 3px;
          border: 1px solid #c5c5c5;
          box-sizing: border-box;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .username {
          position: absolute;
          right: 76px;
          color: white;
        }
      }
    }
  }
}
</style>
