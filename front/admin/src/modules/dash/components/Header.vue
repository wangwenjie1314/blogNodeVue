<template>
  <el-header class="el-layout-header">
    <el-row>
      <el-col :span="12">
        <div class="logo" @click="goRouter('Dash')">{{title}}</div>
      </el-col>
      <el-col :span="12">
        <div class="logined pull-right mr-15">
          <el-dropdown @command="handleCommand">
            <span style="cursor:pointer;color:#fff">
              <i class="el-icon-s-custom" />
              <span>您好，{{$root.loginUser.c_name}}</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout">
                <i class="fa fa-exit"></i>退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      title: blogConfig.title,
      isPwdDialog: false
    };
  },
  methods: {
    ...mapActions({
      removeUser: "removeUser"
    }),
    /**
     * 跳转路由
     */
    goRouter(name) {
      this.$router.push({
        name
      });
    },
    /**
     * 右上角操作更多
     */
    handleCommand(command) {
      if (command == "logout") {
        this.logout();
      } else if (command == "changepwd") {
        this.isPwdDialog = true;
      }
    },
    /**
     * 退出登录
     */
    async logout() {
      await this.removeUser();
      this.goRouter("Login");
    }
  }
};
</script>
<style lang="less" scoped>
.el-layout-header {
  background-color: #2a3f54;
  color: #fff;
  padding: 0;
  height: 60px;
  line-height: 60px;
  overflow: hidden;
  .logo {
    margin-left: 20px;
    img {
      margin: 17px;
      height: 25px;
      cursor: pointer;
      overflow: hidden;
    }
  }
  ::v-deep .msgbox {
    cursor: pointer;
    .el-badge {
      margin-top: -3px;
    }
    .el-badge__content.is-fixed {
      top: 18px;
    }
  }
  .logined {
    font-size: 14px;
    > span {
      margin: 0 10px;
      cursor: pointer;
      &:hover {
        color: #1989fa;
      }
    }
  }
}
</style>
