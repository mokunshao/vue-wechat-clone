<template>
  <div class="profile">
    <Header title="详细资料" :hasLeft="true" btnIcon="ellipsis-h" goBackTo="/contact"/>
    <div class="container">
      <ProfileCell :user="{username:111,avatar:''}"/>
      <YButton>
        <template v-slot:default>发送消息</template>
      </YButton>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import ProfileCell from "../components/ProfileCell";
import YButton from "../components/YButton";

export default {
  name: "Profile",
  components: {
    Header,
    ProfileCell,
    YButton
  }
};
</script>

<style lang="scss" scoped>
</style>