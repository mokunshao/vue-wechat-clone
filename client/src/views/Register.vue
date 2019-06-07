<template>
  <div class="register">
    <div class="header">
      <button @click="$router.push('/login')">取消</button>
    </div>
    <div class="container">
      <div class="title">注册账号</div>
      <div class="content">
        <form>
          <InputGroup placeholder="请填写昵称" v-model="user.username">
            <template v-slot:label>昵称</template>
          </InputGroup>
          <InputGroup placeholder="请填写邮箱" v-model="user.email">
            <template v-slot:label>邮箱</template>
          </InputGroup>
          <InputGroup placeholder="请填写密码" v-model="user.password" type="password">
            <template v-slot:label>密码</template>
          </InputGroup>
          <InputGroup placeholder="请确认密码" v-model="user.password2" type="password">
            <template v-slot:label>确认密码</template>
          </InputGroup>
        </form>
        <YButton :disabled="isDisabled" @click="registerClick" class="button">
          <template v-slot:default>注册</template>
        </YButton>
      </div>
    </div>
  </div>
</template>

<script>
import InputGroup from "../components/InputGroup";
import YButton from "../components/YButton";

export default {
  name: "Register",
  components: {
    InputGroup,
    YButton
  },
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
        password2: ""
      }
    };
  },
  computed: {
    isDisabled() {
      if (
        this.user.username &&
        this.user.email &&
        this.user.password &&
        this.user.password2
      ) {
        return false;
      }
      return true;
    }
  },
  methods: {
    registerClick() {
      const reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (!reg.test(this.user.email)) {
        alert("请输入合法的邮箱地址！");
        return null;
      }
      if (this.user.password !== this.user.password2) {
        alert("两次密码不一致！");
        return null;
      }
      this.$axios.post("/api/user/register", this.user).then(() => {
        this.$router.push("login");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.register {
  height: 100%;
  .header {
    height: 50px;
    padding: 0 10px;
    button {
      border: none;
      outline: none;
      background-color: transparent;
      font-size: 16px;
      color: #20af0e;
    }
  }
  .container {
    padding: 16px;
    .title {
      margin-top: 30px;
      font-size: 22px;
      text-align: center;
    }
  }
  .button {
    margin-top: 30px;
  }
}
</style>
