<template>
  <div class="publish">
    <div class="header">
      <button @click="$router.push('/moments')">取消</button>
      <button @click="publish">发表</button>
    </div>
    <div class="content">
      <div class="text_wrap">
        <textarea placeholder="说说你的感受..." v-model="text"></textarea>
      </div>
      <Upload @getImgs="getImgs"/>
    </div>
    <Loading :loading="loading"/>
  </div>
</template>

<script>
import Upload from "../components/Upload";
import Loading from "../components/Loading";

export default {
  name: "Publish",
  components: {
    Upload,
    Loading
  },
  data() {
    return {
      text: "",
      imgs: [],
      loading: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    publish() {
      this.loading = true;
      let postData = {
        username: this.user.username,
        avatar: this.user.avatar,
        text: this.text,
        imgs: this.imgs.join("|")
      };
      this.$axios.post("/api/moment/add", postData).then(() => {
        this.loading = false;
        this.$router.push("/moments");
      });
    },
    getImgs(imgs) {
      this.imgs = [];
      imgs.forEach(img => {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = () => {
          this.imgs.push(reader.result);
        };
      });
    }
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
