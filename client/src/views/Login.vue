  <template>
  <div class="login">
    <div class="title">用户登录</div>
    <div class="content">
      <form>
        <InputGroup placeholder="请填写邮箱" v-model="user.email">
          <template v-slot:label>邮箱</template>
        </InputGroup>
        <InputGroup placeholder="请填写密码" v-model="user.password" type="password">
          <template v-slot:label>密码</template>     
        </InputGroup>
      </form>
    </div>
    <div class="footer">
      <button class="register" @click="$router.push('/register')">注册账号</button>
    </div>
  </div>
</template>

<script>
import InputGroup from "../components/InputGroup";

export default {
  name: "Login",
  components: {
    InputGroup
  },
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  box-sizing: border-box;
  padding: 16px;
  .title {
    margin-top: 80px;
    font-size: 22px;
    text-align: center;
  }
  .footer {
    position: absolute;
    left: 0;
    bottom: 16px;
    text-align: center;
    width: 100%;
    color: #888;
    .register {
      outline: none;
      font-size: 16px;
      border: none;
      background-color: transparent;
      color: #7b8ca9;
    }
  }
}
</style>
