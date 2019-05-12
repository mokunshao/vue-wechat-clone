<template>
  <div>
    <Header title="我"/>
    <div class="container">
      <ProfileCell :user="user"/>
      <div class="btnWrapper">
        <YButton @click="logout">
          <template v-slot:default>退出登录</template>
        </YButton>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import YButton from "../components/YButton";
import ProfileCell from "../components/ProfileCell";

export default {
  name: "Me",
  components: {
    Header,
    YButton,
    ProfileCell
  },
  methods: {
    logout() {
      localStorage.removeItem("wxToken");
      this.$router.push("/login");
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
