
<template>
  <div class="input-containers">
    <i class="fa fa-search"></i>
    <input
      type="text"
      :placeholder="placeholder || '请输入关键字'"
      v-model="keyWord"
      class="search-input"
      @keyup="handleKeyUp()"
      :disabled="disabled"
    />
    <i class="fa fa-roundclose" v-if="clearable && keyWord" @click="handleClose()"></i>
  </div>
</template>
<script>
/*
* 支持disabled
  placeholder：
  clearable： 是否可清空
*/
export default {
  name: "EsInput",
  props: ["disabled", "placeholder", "clearable"],
  data() {
    return {
      keyWord: ""
    };
  },
  methods: {
    handleKeyUp() {
      const vm = this;
      clearTimeout(vm.timeoutId);
      vm.timeoutId = setTimeout(() => {
        vm.$emit("inputChange", vm.keyWord);
      }, 500);
    },
    handleClose() {
      const vm = this;
      vm.keyWord = "";
      vm.$emit("inputChange", vm.keyWord);
    }
  }
};
</script>
<style lang="less">
.input-containers {
  position: relative;
  display: inline-block;
  margin-right: 20px;
  box-sizing: content-box;
  width: 100%;
  .search-input {
    width: calc(100% - 23px);
    width: 97.5%;
    padding-left: 20px;
    height: 34px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding-left: 20px;
    &:focus {
      outline: none;
      border-color: #409eff;
    }
    &:disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
  .fa-search {
    position: absolute;
    left: 5px;
    top: 10px;
    color: rgba(0, 0, 0, 0.3);
    font-size: 16px;
    z-index: 10;
  }
  .fa-roundclose {
    position: absolute;
    right: -15px;
    top: 12px;
    color: rgba(0, 0, 0, 0.3);
    font-size: 16px;
    z-index: 10;
    cursor: pointer;
  }
}
</style>
