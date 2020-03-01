<template>
  <el-container class="el-layout fixed" v-if="$root.loginUser">
    <Header />
    <el-container class="el-layout-content">
      <el-aside class="el-layout-aside" width="200px">
        <Menu />
      </el-aside>
      <el-main class="el-layout-main">
        <breadcrumbs />
        <router-view />
      </el-main>
      <el-footer>{{made}}</el-footer>
    </el-container>
  </el-container>
</template>
<script>
import Header from "../components/Header";
import Menu from "../components/Menu";
import { mapGetters } from "vuex";
import { debounce } from "lodash";
import { localStorage, sessionStorage } from "@/commons/services/cache";

export default {
  name: "Dash",
  data() {
    return {
      made: blogConfig.made
    };
  },
  computed: {
    ...mapGetters({
      user: "userInfo"
    })
  },
  created() {
    //检测有无sessionUserId 没有及时更新
    let sessionUserId = sessionStorage.get("cmsBlogUid");
    let localUserId = localStorage.get("cmsBlogUid");
    if (localUserId != sessionUserId) {
      sessionStorage.put("cmsBlogUid", localUserId);
    }
    this.$root.loginUser = this.user;
  },
  mounted() {
    const vm = this;
    vm.watchWindow();
    window.onresize = vm.watchWindow;
  },
  components: {
    Header,
    Menu
  },
  methods: {
    /**
     * 基于屏幕检测尺寸
     */
    watchWindow: debounce(function() {
      let commonSize =
        document.body.clientWidth && document.body.clientWidth <= 1280
          ? "small"
          : "medium";
      if (commonSize !== this.$root.commonSize) {
        this.$root.commonSize = commonSize;
        this.$root.commonFontSize =
          commonSize === "small" ? "font-12" : "font-14";
      }
    }, 300),
    /**
     * 返回
     */
    goBack() {
      this.$router.back(-1);
    }
  }
};
</script>
<style lang="less">
.el-layout {
  &.fixed {
    .el-layout-header {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      z-index: 99;
    }
    .el-layout-aside {
      position: fixed;
      top: 60px;
      left: 0;
      bottom: 0;
      z-index: 99;
    }
    .el-layout-main {
      margin-left: 200px;
      padding-top: 75px;
      padding-bottom: 60px;
      background: #f9f9f9; //#f5f7fa;
    }
    .el-footer {
      margin-left: 200px;
      text-align: center;
      color: #2a3f54;
      padding: 20px 0;
      font-size: 13px;
    }
    .el-layout-footer {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 99;
    }
  }
}
.el-layout-content {
  min-height: 100vh; //600px;
}
.el-layout-aside {
  background: #203344;
  overflow: hidden;
}
.el-layout-footer {
  background: #e8e8e8;
  padding: 15px 0;
  text-align: center;
  p {
    font-size: 12px;
    color: #999;
    line-height: 30px;
  }
}
.breadcrumb {
  // border-bottom: 1px solid #e7e7e7;
  // margin-bottom: 20px;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  list-style: none;
  margin: -15px 0 0 0;
  padding: 0;
  li.breadcrumb-item {
    float: left;
    position: relative;
    &::before {
      font-size: 12px;
      content: "\e6a3";
      font-family: "iconfont";
      display: inline-block;
      position: absolute;
      top: 18px;
      right: -5px;
    }
    &:last-child {
      &::before {
        display: none;
      }
    }
    > a,
    > span {
      display: block;
      padding: 15px;
      font-size: 14px;
      color: #606266;
      line-height: 20px;
      &.router-link-exact-active,
      &:hover {
        color: #2290ff;
      }
    }
  }
}
</style>
