<template>
  <div class="chat" v-if="targetUser">
    <Header :title="targetUser.username" :hasLeft="true" btnIcon="ellipsis-h" goBackTo="/contact"/>
  </div>
</template>

<script>
import Header from "../components/Header";

export default {
  name: "Chat",
  components: {
    Header
  },
  data() {
    return {
      targetUser: null
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.targetUser = to.params.user;
    });
  }
};
</script>

<style lang="scss" scoped>
.chat {
  background: #f1f1f1;
  height: 100%;
}
</style>
