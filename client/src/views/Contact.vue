<template>
  <div class="contact">
    <Header title="通讯录" btnIcon="user-plus"/>
    <div class="container">
      <div class="searchWrap">
        <div class="searchContent">
          <font-awesome-icon class="icon" icon="search"/>
          <input type="text" placeholder="搜索" v-model="searchValue">
        </div>
      </div>
      <div class="contentWrap">
        <UserCell
          @click="cellClick(friend)"
          v-for="friend in friendList"
          :key="friend._id"
          :user="friend"
        />
      </div>
      <div class="countWrap">
        <span>{{friendList.length}}位联系人</span>
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
      allFriends: [],
      friendList: [],
      searchValue: ""
    };
  },
  methods: {
    cellClick(friend) {
      this.$router.push("/profile");
    },
    getFriendList() {
      this.$axios.get("/api/user/all").then(res => {
        this.allFriends = res.data;
        this.friendList = res.data;
      });
    },
    filterData() {
      this.friendList = this.allFriends.filter(friend => {
        return (
          friend.username
            .toLowerCase()
            .indexOf(this.searchValue.toLowerCase()) !== -1
        );
      });
    }
  },
  watch: {
    searchValue() {
      this.filterData();
    }
  },
  mounted() {
    console.log(this.$store)
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
      .searchContent {
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
    .countWrap {
      min-height: 50px;
      box-sizing: border-box;
      color: #888;
      font-size: 16px;
      width: 100%;
      line-height: 50px;
      text-align: center;
    }
  }
}
</style>

