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
      <YButton :disabled="isDisabled" @click="loginClick" class="button">
        <template v-slot:default>登录</template>
      </YButton>
    </div>
    <div class="footer">
      <button class="register" @click="$router.push('/register')">注册账号</button>
    </div>
  </div>
</template>

<script>
import InputGroup from "../components/InputGroup";
import YButton from "../components/YButton";
import jwt_decode from "jwt-decode";

export default {
  name: "Login",
  components: {
    InputGroup,
    YButton
  },
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    isDisabled() {
      if (this.user.email && this.user.password) {
        return false;
      }
      return true;
    }
  },
  methods: {
    loginClick() {
      const reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (!reg.test(this.user.email)) {
        alert("请输入合法的邮箱地址！");
        return;
      }
      this.$axios.post("/api/user/login", this.user).then(res => {
        localStorage.setItem("wxToken", res.data.token);
        const decoded = jwt_decode(res.data.token);
        this.$store.dispatch("setUser", decoded);
        this.$router.push("/");
      });
    }
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
  .button {
    margin-top: 30px;
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
