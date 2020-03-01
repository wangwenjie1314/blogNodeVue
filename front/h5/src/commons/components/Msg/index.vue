<template>
  <div class="weui-msg">
    <div class="weui-msg__icon-area">
      <i class="weui-icon_msg" :class="type=='success'?'weui-icon-success':'weui-icon-warn'"></i>
    </div>
    <div class="weui-msg__text-area">
      <h2 class="weui-msg__title" v-if="title">{{title}}</h2>
      <h2 class="weui-msg__title" v-else>操作{{type=='success'?'成功':'失败'}}</h2>
      <p class="weui-msg__desc" v-if="desc">{{desc}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Msg",
  props: ["type", "title", "desc"]
};
</script>
<style lang="less" scoped>
[class^="weui-icon-"],
[class*=" weui-icon-"] {
  display: inline-block;
  vertical-align: middle;
  width: 24px;
  height: 24px;
  -webkit-mask-position: 50% 50%;
  mask-position: 50% 50%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  background-color: currentColor;
}
.weui-icon-success {
  color: #07c160;
}
.weui-icon-success {
  -webkit-mask-image: url(data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm-1.177-7.86l-2.765-2.767L7%2012.431l3.119%203.121a1%201%200%20001.414%200l5.952-5.95-1.062-1.062-5.6%205.6z%22%2F%3E%3C%2Fsvg%3E);
  mask-image: url(data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm-1.177-7.86l-2.765-2.767L7%2012.431l3.119%203.121a1%201%200%20001.414%200l5.952-5.95-1.062-1.062-5.6%205.6z%22%2F%3E%3C%2Fsvg%3E);
}
.weui-icon-warn {
  -webkit-mask-image: url(data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm-.763-15.864l.11%207.596h1.305l.11-7.596h-1.525zm.759%2010.967c.512%200%20.902-.383.902-.882%200-.5-.39-.882-.902-.882a.878.878%200%2000-.896.882c0%20.499.396.882.896.882z%22%2F%3E%3C%2Fsvg%3E);
  mask-image: url(data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm-.763-15.864l.11%207.596h1.305l.11-7.596h-1.525zm.759%2010.967c.512%200%20.902-.383.902-.882%200-.5-.39-.882-.902-.882a.878.878%200%2000-.896.882c0%20.499.396.882.896.882z%22%2F%3E%3C%2Fsvg%3E);
}
.weui-icon-warn {
  color: #fa5151;
}
.weui-icon_msg {
  width: 124px;
  height: 124px;
}
.weui-icon_msg.weui-icon-warn {
  color: #fa5151;
}
.weui-icon_msg-primary {
  width: 124px;
  height: 124px;
}
.weui-icon_msg-primary.weui-icon-warn {
  color: #ffc300;
}

.weui-msg {
  padding-top: 48px;
  padding: calc(48px + constant(safe-area-inset-top))
    constant(safe-area-inset-right) constant(safe-area-inset-bottom)
    constant(safe-area-inset-left);
  padding: calc(48px + env(safe-area-inset-top)) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left);
  text-align: center;
  line-height: 1.4;
  min-height: 100vh;
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  background-color: #ffffff;
}
.weui-msg a:not(.weui-btn) {
  color: #576b95;
  display: inline-block;
  vertical-align: baseline;
}
.weui-msg__icon-area {
  margin-bottom: 32px;
}
.weui-msg__text-area {
  margin-bottom: 32px;
  padding: 0 32px;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  line-height: 1.6;
}
.weui-msg__text-area:first-child {
  padding-top: 96px;
}
.weui-msg__title {
  margin-bottom: 16px;
  font-weight: 700;
  font-size: 22px;
  word-wrap: break-word;
  word-break: break-all;
}
.weui-msg__desc {
  font-size: 17px;
  color: rgba(0, 0, 0, 0.9);
  word-wrap: break-word;
  word-break: break-all;
  margin-bottom: 16px;
}
.weui-msg__desc-primary {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
  word-wrap: break-word;
  word-break: break-all;
  margin-bottom: 16px;
}
.weui-msg__opr-area {
  margin-bottom: 16px;
}
.weui-msg__opr-area .weui-btn-area {
  margin: 0;
}
.weui-msg__opr-area .weui-btn + .weui-btn {
  margin-bottom: 16px;
}
.weui-msg__opr-area:last-child {
  margin-bottom: 96px;
}
.weui-msg__opr-area + .weui-msg__extra-area {
  margin-top: 48px;
}
.weui-msg__tips-area {
  margin-bottom: 16px;
  padding: 0 40px;
}
.weui-msg__opr-area + .weui-msg__tips-area {
  margin-bottom: 48px;
}
.weui-msg__tips-area:last-child {
  margin-bottom: 64px;
}
.weui-msg__tips {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
}
.weui-msg__extra-area {
  margin-bottom: 24px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
}
.weui-msg__extra-area a {
  color: #576b95;
}
</style>