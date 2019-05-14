<template>
  <div class="home">
    <Header title="微信" btnIcon="plus"/>
    <div class="container">
      <UserCell v-for="item in chatDataList" :key="item._id" :user="item.target"/>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import UserCell from "../components/UserCell";

export default {
  name: "Home",
  data() {
    return {
      chatDataList: []
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  beforeRouteEnter(to, form, next) {
    next(vm => {
      vm.$axios.get(`/api/chat/msg/${vm.user.id}`).then(res => {
        vm.chatDataList = res.data;
      });
    });
  },
  components: {
    Header,
    UserCell
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  .container {
    height: calc(100% - 50px);
    overflow: auto;
  }
}
</style>
