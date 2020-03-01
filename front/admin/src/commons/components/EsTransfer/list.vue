<template>
  <div class="es-choose-list">
    <div
      class="choose-list-item"
      v-for="(v, vindex) in list"
      :key="vindex"
      @click="$emit('toggle',v)"
    >
      <span class="list-item-name">
        <span class="name">{{ v.c_name || v.c_account }}</span>
      </span>
      <span class="list-item-state">
        <slot name="state" v-bind:node="v">
          <i class="fa fa-roundclosefill text-danger"></i>
        </slot>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "EsTransferChooseList",
  props: ["list"]
};
</script>
<style lang="less" scoped>
.es-choose-list {
  .choose-list-item {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    &:hover {
      background: #f8f8f8;
    }
    &.disabled {
      color: #999;
      cursor: not-allowed;
      .fa {
        color: #ccc;
      }
    }
    .list-item-name {
      flex: 1;
      .face {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        overflow: hidden;
        vertical-align: middle;
        margin-right: 5px;
      }
      .name {
        font-size: 14px;
      }
    }
    .list-item-state {
      width: 30px;
      text-align: right;
      .fa {
        font-size: 16px;
      }
    }
  }
}
</style>