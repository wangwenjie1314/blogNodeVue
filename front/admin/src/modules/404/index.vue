<template>
  <el-row class="es-404">
    <el-col :span="12">
      <div class="grid-content es-img-404">
        <img
          src="../../assets/images/404.png"
          alt="img"
        />
      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content">
        <el-alert
          title="抱歉！"
          type="error"
          :description="description"
          show-icon
          :closable="false"
        >
        </el-alert>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "NotFound",
  data() {
    return {
      description: this.$route.params.description || "您好像访问了错误地址" //描述信息
    };
  }
};
</script>
<style lang="less">
.es-404 {
  padding-top: 150px;
  .el-alert--error {
    background: transparent;
    margin-top: 100px;
  }
}
.es-img-404 {
  text-align: right;
  img {
    width: 600px;
  }
}
</style>
