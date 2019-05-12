<template>
  <div class="moments">
    <Header
      title="朋友圈"
      btnIcon="camera"
      :hasLeft="true"
      goBackTo="/discover"
      class="header"
      @clickRight="$router.push('/publish')"
    ></Header>
    <div class="container">
      <Scroll ref="scroll" @pulldown="getLatestData" @pullup="loadMore">
        <div class="headWrapper">
          <div class="userInfo">
            <span class="username">{{user.username}}</span>
            <div class="userImg">
              <img :src="user.avatar" :alt="user.username">
            </div>
          </div>
        </div>
        <div class="contentWrapper">
          <CellView v-for="(moment,index) in momentsList" :key="index" :momentsObj="moment"/>
        </div>
      </Scroll>
    </div>
    <Loading :loading="loading"/>
  </div>
</template>

<script>
import Loading from "../components/Loading";
import Header from "../components/Header";
import CellView from "../components/CellView";
import Scroll from "../components/Scroll";

export default {
  name: "Moments",
  components: { Loading, Header, CellView, Scroll },
  data() {
    return {
      momentsList: {},
      page: 2,
      size: 3,
      loading: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    getLatestData() {
      this.loading = true;
      this.$axios("/api/moment/latest").then(res => {
        this.loading = false;
        this.momentsList = res.data;
        this.$refs.scroll.$emit("refreshEnd");
      });
      this.page = 2;
    },
    loadMore() {
      if (this.loading === false) {
        this.loading = true;
        this.$axios.get(`/api/moment/${this.page}/${this.size}`).then(res => {
          this.loading = false;
          const result = [...res.data];
          if (result.length > 0) {
            result.forEach(item => {
              this.momentsList.push(item);
            });
            this.page++;
          } else {
            this.$refs.scroll.$emit("loadedDone");
          }
        });
      }
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
