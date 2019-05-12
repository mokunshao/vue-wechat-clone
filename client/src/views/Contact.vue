<template>
  <div class="contact">
    <Header title="通讯录" btnIcon="user-plus"/>
    <div class="container">
      <div class="containWrap">
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
      friendList: []
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
  }
}
</style>

