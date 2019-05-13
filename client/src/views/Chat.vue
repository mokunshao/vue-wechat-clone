<template>
  <div class="chat" v-if="targetUser">
    <Header :title="targetUser.username" :hasLeft="true" btnIcon="ellipsis-h" goBackTo="/contact"/>
    <div class="container">
      <div class="content_wrap" v-for="(item,index) in messageList" :key="index">
        <div class="left_msg" v-if="item.source == 'other'">
          <img :src="targetUser.avatar" alt="img">
          <span>{{item.msg}}</span>
        </div>
        <div class="right_msg" v-if="item.source=='self'">
          <span>{{item.msg}}</span>
          <img :src="user.avatar" alt="img">
        </div>
      </div>
    </div>
    <div class="footerWrap">
      <input type="text" v-model="messageValue">
      <button :disabled="!messageValue" @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import websocket from "../socket.js";

export default {
  name: "Chat",
  components: {
    Header
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  data() {
    return {
      targetUser: null,
      messageValue: "",
      messageList: []
    };
  },
  methods: {
    saveMessage() {
      let message = {
        target: {
          avatar: this.targetUser.avatar,
          username: this.targetUser.username,
          _id: this.targetUser._id
        },
        count: 0,
        message: this.messageList,
        user_id: this.user.id
      };
      this.$axios.post("/api/chat/addmsg", message).then(() => {
        this.messageValue = "";
      });
    },
    sendMessage() {
      const msgObj = {
        target: this.targetUser._id,
        current: this.user.id,
        msg: this.messageValue
      };
      websocket.send(msgObj);
      this.messageList.push({
        msg: this.messageValue,
        source: "self"
      });
      this.saveMessage();
      this.messageValue = "";
    },
    getMessage() {
      this.$axios(`/api/chat/msg/${this.user.id}`).then(res => {
        let result = res.data.filter(data => {
          return data.target._id === this.targetUser._id;
        });
        if (result.length > 0) {
          this.messageList = result[0].message;
        }
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.targetUser = to.params.user;
      vm.getMessage();
    });
  },
  mounted() {
    websocket.init(
      { user: this.user },
      message => {
        this.messageList.push({ msg: message.msg, source: "other" });
        this.saveMessage();
      },
      error => console.log(error)
    );
  }
};
</script>

<style lang="scss" scoped>
.chat {
  height: 100%;
  .container {
    height: calc(100% - 100px);
    box-sizing: border-box;
    background-color: #f1f1f1;
    padding: 8px;
    overflow-y: scroll;
  }
  .footerWrap {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    border-top: 1px solid #d9d9d9;
    position: absolute;
    bottom: 0;
    padding: 8px;
    background-color: #fafafa;
    & input {
      width: 77%;
      height: 30px;
      outline: none;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
    }
    & button {
      width: 20%;
      height: 34px;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      margin-left: 8px;
      outline: none;
      background-color: #f1f1f1;
    }
    & button[disabled] {
      background-color: #d9d9d9;
      cursor: not-allowed;
      pointer-events: none;
    }
  }
}

.left_msg {
  justify-content: flex-start;
}
.right_msg {
  justify-content: flex-end;
}
.left_msg,
.right_msg {
  width: 100%;
  display: flex;
  margin: 5px 0;
}
.content_wrap img {
  width: 3rem;
  height: 3rem;
}
.content_wrap span {
  display: inline-block;
  max-width: 65%;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  margin: 0 5px;
  padding: 8px;
  box-sizing: border-box;
  word-break: break-all;
}
.left_msg span {
  background-color: #fff;
}
.right_msg span {
  background-color: #0fce0d;
}
</style>
