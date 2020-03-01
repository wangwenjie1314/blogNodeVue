<template>
  <div class="app-warper" :class="$root.commonSize" id="app">
    <transition name="el-fade-in" mode="out-in">
      <router-view class="app-content" />
    </transition>
    <div class="app-footer">{{made}}</div>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      made: blogConfig.made
    };
  }
};
</script>
<style lang="less">
@import "assets/css/core.less";

.app-warper {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  .app-content {
    flex: 1;
  }
  .app-footer {
    padding: 10px 0;
    font-size: 12px;
    text-align: center;
    color: rgba(69, 90, 100, 0.6);
  }
  &.large {
    .van-doc-block__title {
      font-weight: bolder;
      line-height: 22px;
    }
    .van-cell--large {
      padding-top: 15px;
      padding-bottom: 15px;
    }
    .van-cell__value {
      color: #666;
    }
    .van-uploader__upload {
      width: 100px;
      height: 100px;
    }
    .van-dialog__header,
    .van-button--large,
    .van-cell__value,
    .van-field__control,
    .van-doc-block__title,
    .van-cell--large .van-cell__title,
    .van-radio__label {
      font-size: 19px;
    }
  }
}

.van-overlay {
  background-color: #000;
}
.van-dialog__header {
  padding: 15px 0;
}
.van-doc-block__title {
  margin: 0;
  padding: 32px 16px 16px;
  color: rgba(69, 90, 100, 0.6);
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  padding-top: 20px;
}
</style>
