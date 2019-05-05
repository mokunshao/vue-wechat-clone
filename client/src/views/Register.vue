<template>
  <div class="register">
    <div class="header">
      <button @click="$router.push('/login')">取消</button>
    </div>
    <div class="container">
      <div class="title">注册账号</div>
      <div class="content">
        <form>
          <InputGroup placeholder="请填写用户名" v-model="user.username">
            <template v-slot:label>用户名</template>
          </InputGroup>
          <InputGroup placeholder="请填写邮箱" v-model="user.email">
            <template v-slot:label>邮箱</template>
          </InputGroup>
          <InputGroup placeholder="请填写密码" v-model="user.password" type="password">
            <template v-slot:label>密码</template>
          </InputGroup>
          <InputGroup placeholder="请确认密码" v-model="user.password2">
            <template v-slot:label>确认密码</template>
          </InputGroup>
        </form>
      </div>
      <div class="footer">
        <button>注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import InputGroup from "../components/InputGroup";

export default {
  name: "Register",
  components: {
    InputGroup
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
}
</style>
