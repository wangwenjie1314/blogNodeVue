<template>
  <div class="ice-layout ice-blank-layout">
    <div class="login-page">
      <div class="user-login">
        <div class="login-bg"></div>
        <div class="login-main">
          <h2 class="login-left-title">
            欢迎使用
            <br />
            {{title}}
          </h2>
          <div class="login-content">
            <h4 class="login-title">登录</h4>
            <el-form
              :model="loginForm"
              :rules="loginRules"
              ref="loginForm"
              class="login-form"
              @submit.native.prevent
            >
              <el-form-item prop="c_name">
                <el-input
                  v-model="loginForm.c_name"
                  auto-complete="off"
                  clearable
                  placeholder="请输入用户名"
                >
                  <i slot="prefix" class="el-input__icon fa fa-people"></i>
                </el-input>
              </el-form-item>
              <el-form-item prop="c_password">
                <el-input
                  type="password"
                  v-model="loginForm.c_password"
                  auto-complete="new-password"
                  clearable
                  placeholder="请输入密码"
                >
                  <i slot="prefix" class="el-input__icon fa fa-lock"></i>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  style="width:100%"
                  native-type="submit"
                  type="primary"
                  :loading="loading"
                  @click="submitForm('loginForm')"
                >登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import md5 from "blueimp-md5";
import { mapState, mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      title: blogConfig.title,
      query: this.$route.query || {},
      loginForm: {
        c_name: "",
        c_password: ""
      },
      loginRules: {
        c_name: [
          { required: true, message: "请输入用户名", trigger: "change" },
          { min: 3, message: "最少3个字符", trigger: "change" }
        ],
        c_password: [
          { required: true, message: "请输入密码", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      loading: state => state.loading
    })
  },
  methods: {
    ...mapActions({
      setUser: "setUser"
    }),
    submitForm(formName) {
      let vm = this;
      vm.$refs[formName].validate(valid => {
        if (!valid) {
          vm.$message.error("请填写完整登录信息");
        } else {
          vm.doLogin();
        }
      });
    },
    async doLogin() {
      const vm = this;
      try {
        const { c_name, c_password } = vm.loginForm;
        await vm.$axios.post("adminApi/login", {
          c_name,
          c_password: md5(c_password),
          skipAuth: true
        });
        await vm.setUser({
          c_id: "1",
          c_name
        });
        vm.$router.push({
          name: "Dash"
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style lang="less">
.ice-layout {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-flex: 1;
  -webkit-flex: auto;
  -ms-flex: auto;
  flex: auto;
  background-color: #ececec;
}
.ice-layout {
  background-color: #fafafa;
}
.user-login {
  position: relative;
  height: 100vh;
  .login-bg {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-size: cover;
    background-image: url(../../assets/images/bg-login.jpg);
  }
  .login-main {
    position: absolute;
    top: -100px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    max-width: 1080px;
    margin: 0px auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .login-left-title {
    text-align: center;
    color: rgb(255, 255, 255);
    font-size: 36px;
    letter-spacing: 2px;
    line-height: 48px;
  }
  .login-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 30px 40px;
    background: rgb(255, 255, 255);
    border-radius: 6px;
    box-shadow: rgb(238, 238, 238) 1px 1px 2px;
    .login-title {
      margin: 0px 0px 20px;
      text-align: center;
      color: rgb(48, 128, 254);
      letter-spacing: 12px;
    }
    .login-form {
      width: 250px;
    }
  }
}
</style>
