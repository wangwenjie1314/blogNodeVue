<template>
  <div class="es-transfer el-transfer">
    <!-- left -->
    <div class="el-transfer-panel">
      <p class="el-transfer-panel__header">
        <label class="el-checkbox">
          <span class="el-checkbox__label">待选择</span>
        </label>
      </p>
      <div class="el-transfer-panel__body">
        <div class="el-transfer-panel__list">
          <slot name="wait">
            <template v-if="listType ==='collapse'">
              <div
                class="el-transfer-panel__collapse"
                v-for="(v, vindex) in transferWaitList"
                :key="vindex"
              >
                <div class="el-transfer-panel__head" @click="toggleCollapse(v)">
                  <i class="fa" :class="!v.open?'fa-right':'fa-down-trangle'"></i>
                  <span>{{v.c_name || v.c_account}}</span>
                </div>
                <div class="el-transfer-panel__box" v-loading="!v.ajaxed" v-show="v.open">
                  <EsTransferChooseList
                    :list="v.children"
                    @toggle="toggleTransferChoose"
                    v-if="v.children && v.children.length"
                  >
                    <template v-slot:state="slotProps">
                      <i
                        class="fa"
                        :class="transferChoose.indexOf(slotProps.node)>-1?'fa-roundcheckfill text-primary':'fa-round text-gray-9'"
                      ></i>
                    </template>
                  </EsTransferChooseList>
                  <p class="el-transfer-panel__empty" v-else>无数据</p>
                </div>
              </div>
            </template>
            <template v-else>
              <EsTransferChooseList :list="transferWaitList" @toggle="toggleTransferChoose">
                <template v-slot:state="slotProps">
                  <i
                    class="fa"
                    :class="transferChoose.indexOf(slotProps.node)>-1?'fa-roundcheckfill text-primary':'fa-round text-gray-9'"
                  ></i>
                </template>
              </EsTransferChooseList>
            </template>
          </slot>
        </div>
        <p class="el-transfer-panel__empty" v-show="!transferWaitList.length">无数据</p>
      </div>
    </div>
    <!-- right-->
    <div class="el-transfer-panel">
      <p class="el-transfer-panel__header">
        <label class="el-checkbox">
          <span class="el-checkbox__label">已选择</span>
        </label>
      </p>
      <div class="el-transfer-panel__body">
        <EsTransferChooseList :list="transferChoose" @toggle="toggleTransferChoose" />
      </div>
    </div>
  </div>
</template>
<script>
import { cloneDeep } from "lodash";
import EsTransferChooseList from "./list";

export default {
  name: "EsTransfer",
  props: {
    listType: {
      type: String,
      default: "list"
    },
    waitList: {
      type: Array
    },
    chooseList: {
      type: Array
    },
    getWaitChildFn: {
      type: Function
    }
  },
  data() {
    return {
      transferWaitList: this.waitList || [],
      transferChoose: cloneDeep(this.chooseList || [])
    };
  },
  watch: {
    waitList(newVal) {
      this.transferWaitList = this.waitList || [];
    }
  },
  components: {
    EsTransferChooseList
  },
  methods: {
    /**
     * 切换手风琴
     */
    async toggleCollapse(v) {
      let vm = this;
      vm.$set(v, "open", !v.open);
      //加载获取子s事件
      if (!v.ajaxed && vm.getWaitChildFn) {
        let list = await vm.getWaitChildFn(v);
        vm.$set(v, "children", list || []);
        vm.$set(v, "ajaxed", true);
      }
    },
    /**
     * 切换选择状态
     */
    toggleTransferChoose(node) {
      let vm = this;
      //已选
      let idx = vm.transferChoose.indexOf(node);
      if (idx > -1) {
        vm.transferChoose.splice(idx, 1);
      } else {
        vm.transferChoose.push(node);
      }
    }
  }
};
</script>
<style lang="less">
.es-transfer {
  width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-transfer-panel {
    width: 48%;
  }
  .el-transfer-panel__list {
    padding: 0;
  }
  .el-transfer-panel__item {
    color: #606266;
  }
  .el-transfer-panel__head {
    padding: 10px;
    color: #606266;
    cursor: pointer;
    background: #fafafa;
    border-bottom: 1px solid #f6f3f3;
    &:hover {
      background: #f5f7fa;
    }
  }
  .el-transfer-panel__box {
    .el-transfer-panel__empty {
      padding: 0;
    }
  }
}
</style>