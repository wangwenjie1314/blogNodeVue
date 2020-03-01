<template>
  <div class="el-layout-menu clearfix">
    <el-menu router :default-active="menuName">
      <el-menu-item :index="'/dash/' + v.path" v-for="(v, vindex) in menus" :key="vindex">
        <span slot="title">{{v.meta.breadcrumb}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "Menu",
  data() {
    return {
      menuName: this.$route.path,
      menus: this.$router.options.routes[1].children
    };
  },
  created() {
    console.log(this.menuName);
  }
};
</script>
<style lang="less" scoped>
.el-layout-menu {
  background: #203344;
  .el-menu-title {
    color: #fff;
    padding: 10px 30px;
    border-bottom: 1px solid #294966;
    &:hover {
      cursor: pointer;
      color: #2196f3;
    }
  }
  .el-menu {
    background: #203344;
    height: calc(100vh - 60px); //calc(100vh - 162px);
    overflow-x: hidden;
    overflow-y: auto;
    border-right: none;
    .el-submenu {
      color: #f8f8f8;
    }
    .el-menu-item {
      color: #f8f8f8;
      i {
        color: #f8f8f8;
      }
      &.is-active,
      &:hover {
        color: #fff;
        background: #374c5f;
      }
    }
  }
}
</style>
