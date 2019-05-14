<template>
  <div class="home">
    <Header title="微信" btnIcon="plus"/>
    <div class="container">
      <UserCell
        v-for="item in chatDataList"
        :key="item._id"
        :user="item.target"
        :count="item.count"
        @click="$router.push({name:'Chat',params:{user:item.target}})"
      />
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import UserCell from "../components/UserCell";
import websocket from "../socket.js";

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
  mounted() {
    websocket.init(
      { user: this.user },
      message => {
        this.setMessageCount(message);
      },
      error => {
        console.log(error);
      }
    );
  },
  methods: {
    setMessageCount(message) {
      let chatUser = this.chatDataList.filter(chatItem => {
        return chatItem.target._id === message.from;
      });
      // 如果存在， count + 1 并将消息保存在列表中
      if (chatUser.length > 0) {
        chatUser[0].count++;
        chatUser[0].message.push({
          msg: message.msg,
          source: "other"
        });
        this.saveMsg(
          chatUser[0].target,
          chatUser[0].count,
          chatUser[0].message
        );
      } else {
        // 如果不存在， 那么获取用户信息 并现实提醒
        this.getUserInfo(message);
      }
    },
    getUserInfo(message) {
      // 根据id查询用户信息
      this.$axios(`/api/user/${message.from}`).then(res => {
        console.log(res.data);
        const msg = [];
        msg.push({
          msg: message.msg,
          source: "other"
        });

        // 将消息保存在聊天列表中 count为1
        this.chatDataList.push({
          target: res.data,
          count: 1,
          message: msg
        });

        this.saveMsg(res.data, 1, msg);
      });
    },
    saveMsg(targetUser, count, msg) {
      const messageObj = {
        target: {
          avatar: targetUser.avatar,
          username: targetUser.username,
          _id: targetUser._id
        },
        count: count,
        message: msg,
        user_id: this.user.id
      };
      this.$axios.post("/api/chat/addmsg", messageObj).then(() => {
        console.log("数据保存成功");
      });
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
