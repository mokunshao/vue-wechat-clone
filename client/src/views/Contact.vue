<template>
  <div class="contact">
    <Header title="通讯录" btnIcon="user-plus"/>
    <div class="container">
      <div class="searchWrap">
        <div class="sear_content">
          <font-awesome-icon class="icon" icon="search"/>
          <input type="text" placeholder="搜索" v-model="searchValue">
        </div>
      </div>
      <div class="contentWrap">
        <UserCell v-for="friend in friendList" :key="friend._id" :user="friend"/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import UserCell from "../components/UserCell";

export default {
  name: "Contact",
  components: {
    Header,
    UserCell
  },
  data() {
    return {
      friendList: [],
      searchValue: ""
    };
  },
  methods: {
    getFriendList() {
      this.$axios
        .get("/api/user/all")
        .then(res => (this.friendList = res.data));
    }
  },
  mounted() {
    this.getFriendList();
  }
};
</script>

<style lang="scss" scoped>
.contact {
  height: 100%;
  .container {
    height: calc(100% - 50px);
    overflow: auto;
    .searchWrap {
      background-color: #f1f1f1;
      box-sizing: border-box;
      padding: 8px;
      .sear_content {
        height: 40px;
        background: #fff;
        padding: 0 10px;
        box-sizing: border-box;
        font-size: 16px;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        .icon {
          color: #888;
          margin-right: 10px;
        }
        input {
          height: 36px;
          width: 90%;
          outline: none;
          border: none;
          font-size: 14px;
        }
      }
    }
  }
}
</style>

