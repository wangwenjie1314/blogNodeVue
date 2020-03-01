<!--
  两列布局的选择摸版弹窗 ui见 选择事事号

/**************以下是传递的参数*****************************/
  aliasName: 'name' // 按name展示
  title： '选择事事号' string，
  width: '50%', string
  // 若不需要input搜索框 不传该属性
  searchInputAtr: {
    placeholder: '请输入事事号名称、编号关键字', string
  }
  高级搜索btn的展示：slot占位
  // 若不需要分页 不传该属性
  paginationAtr: {
    pageSize: 20,
    currPage: 1,
    currPageChange: 'handleCurrentPageChange'
  }
  chooseChangeAll: 'handleChooseChangeAll' function 本地全选 不需要传递
  submitChange: 'handleSummitChange' function 点击确定后的回调
  closeChange: 'handleCloseChange' function 点击关闭后的回调
  data: 待选择的项 [{ id: 1, name: 'xxx'}] 必须是包含id name
  hadList: 已选项 [{ id: 1, name: 'xxx' }]
  multiple: 是否多选 默认多选
  disabledList: 禁止选择的项 [1, 2] id数组
  show: 此弹窗是否展示
  loading: 加载动画 boolear
  customSearchInput: 自定义搜索框
 -->

<template>
  <el-dialog
    :width="width || '65%'"
    :title="title || '选择组件'"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="handleClose"
    :append-to-body="true"
    :visible.sync="isThisDialog"
    @close="$emit('update:show', false);"
    class="es-select-things-containers"
  >
    <div class="select-things-containers" v-loading="loading">
      <!-- 左侧栏 -->
      <div class="select-things-item">
        <slot name="contentTitle"></slot>
        <div class="item-left-title" v-if="!customSearchInput">
          <es-input
            :placeholder="searchInputAtr?searchInputAtr.placeholder:''"
            @inputChange="handleSearchChange"
          />
        </div>
        <div class="select-things-info">
          <div v-if="dataList && dataList.length">
            <div
              v-for="(item) in dataList"
              :key="item.c_id"
              class="item"
              @click="handleChooseChange(item)"
            >
              <span>
                {{item[aliasNameKey]}}
                <template
                  v-if="aliasExtendKey && item[aliasExtendKey]"
                >-{{item[aliasExtendKey]}}</template>
              </span>
              <i
                class="fa font-20 select-things-icon"
                :class="{'fa-round': choosedListId.indexOf(item.c_id) === -1,
                'fa-roundcheckfill': choosedListId.indexOf(item.c_id) !== -1,
                'disabled-icon': disabledItems.indexOf(item.c_id) !== -1
              }"
              ></i>
            </div>
          </div>
        </div>
      </div>
      <!-- 分隔线 -->
      <div class="select-things-line"></div>
      <!-- 右侧栏 -->
      <div class="select-things-item">
        <div class="item-right-title">
          <span>已选择</span>
          <el-tag
            v-if="choosedList && choosedList.length"
            size="mini"
            color="#2196F3"
            class="choos-tag"
          >{{ choosedList.length }}</el-tag>
        </div>
        <div class="select-things-info">
          <div v-if="choosedList && choosedList.length">
            <div
              v-for="(choosItem) in choosedList"
              :key="choosItem.c_id"
              class="item"
              @click="handleChooseChange(choosItem)"
            >
              <span>{{ choosItem[aliasNameKey] }}</span>
              <i class="fa font-20 fa-roundclosefill select-things-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <div class="ethings-footer-left">
        <!-- <el-button @click="handleChooseChangeAll()" size="medium" class="el-button--medium">
          {{
            choosedListId.length === totalRow - ((disabledList || []).length)
            ? '全 不 选' : '全 选'
          }}
        </el-button>-->
        <el-pagination
          v-if="dataList.length && paginationAtr"
          class="'page select-things-pagination"
          :page-size="paginationAtr.pageSize"
          :pager-count="5"
          layout="prev, pager, next"
          :current-page.sync="paginationAtr.currPage"
          :total="paginationAtr.totalRow"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
      <div>
        <el-button :size="$root.commonSize" @click="handleClose()">关 闭</el-button>
        <el-button
          type="primary"
          :size="$root.commonSize"
          :loading="loading"
          @click="submitForm()"
        >确 定</el-button>
      </div>
    </div>
    <slot name="innerDialog"></slot>
  </el-dialog>
</template>
<script>
import EsInput from "../EsInput/index";

export default {
  name: "EsChoose",
  props: [
    "title",
    "width",
    "multiple",
    "show",
    "searchInputAtr",
    "paginationAtr",
    "submitChange",
    "closeChange",
    "chooseChangeAll",
    "data",
    "hadList",
    "disabledList",
    "loading",
    "aliasName",
    "aliasExtend",
    "customSearchInput"
  ],
  components: {
    EsInput
  },
  data() {
    return {
      isThisDialog: this.show,
      choosedList: JSON.parse(JSON.stringify(this.hadList || [])), // 已选this.hadList ||
      choosedListId: (this.hadList || []).map(item => item.c_id) || [],
      disabledItems: this.disabledList || [],
      dataList: this.data || [],
      aliasNameKey: this.aliasName || "name",
      aliasExtendKey: this.aliasExtend || ""
    };
  },
  watch: {
    data: function(newData, oldData) {
      this.dataList = newData || [];
    },
    hadList: function(newData, oldData) {
      this.choosedList = this.disabledList
        ? newData.filter(item => this.disabledList.indexOf(item.c_id) === -1)
        : newData || [];
      this.choosedListId = this.choosedList.map(item => item.c_id);
    }
  },
  methods: {
    handleClose() {
      if (typeof this.closeChange === "function") {
        this.closeChange();
      }
      this.isThisDialog = false;
    },
    // 选择change
    handleChooseChange(item) {
      if (this.choosedListId.indexOf(item.c_id) === -1) {
        // 禁选
        if (this.disabledItems.indexOf(item.c_id) !== -1) {
          return;
        }
        if (this.multiple || typeof this.multiple === "undefined") {
          // 多选  最新的追加到第一个上面
          this.choosedList.unshift(item);
        } else {
          // 单选
          this.choosedList = [item];
        }
      } else {
        this.choosedList = this.choosedList.filter(
          dataItem => dataItem.c_id !== item.c_id
        );
      }
      this.choosedListId = this.choosedList.map(item => item.c_id);
    },
    // 全选or全不选
    handleChooseChangeAll() {
      const vm = this;
      const disabledLength = (vm.disabledList || []).length;
      if (this.choosedList.length === this.totalRow - disabledLength) {
        // 取消全选
        this.choosedListId = [];
        this.choosedList = [];
        console.log(this.choosedList, "choosedList");
      } else {
        // 全选：重新获取接口 还是本地全选
        if (typeof this.chooseChangeAll === "function") {
          this.chooseChangeAll();
        } else {
          // 过滤掉禁止选的项
          vm.choosedList = this.disabledList
            ? this.data.filter(
                item => this.disabledList.indexOf(item.c_id) === -1
              )
            : this.data || [];
          vm.choosedListId = vm.choosedList.map(item => item.c_id);
        }
      }
    },
    submitForm() {
      let vm = this;
      if (typeof vm.submitChange === "function") {
        vm.submitChange(vm.choosedList);
      }
      vm.isThisDialog = false;
    },
    // 分页操作
    handleCurrentChange(val) {
      if (
        this.paginationAtr &&
        this.paginationAtr.currPageChange &&
        typeof this.paginationAtr.currPageChange === "function"
      ) {
        this.paginationAtr.currPageChange({
          currPage: val
        });
      }
    },
    // 关键字搜索
    handleSearchChange(val) {
      if (
        this.paginationAtr &&
        this.paginationAtr.currPageChange &&
        typeof this.paginationAtr.currPageChange === "function"
      ) {
        //远程搜索
        this.paginationAtr.currPageChange({
          searchKey: val
        });
      } else {
        // 直接根据关键字 本地搜索
        this.dataList = val
          ? this.dataList.filter(
              item => item[this.aliasNameKey].indexOf(val) !== -1
            )
          : this.data;
      }
    }
  }
};
</script>
<style lang="less">
.es-select-things-containers {
  .el-dialog__body {
    padding: 0;
  }
  .dialog-footer {
    display: flex;
    justify-content: space-between;
  }
}
.select-things-containers {
  display: flex;
  background: #f5f6f7;
  padding-bottom: 5px;
  min-height: 400px;
  .select-things-line {
    width: 5px;
  }
  .select-things-item {
    width: 50%;
  }
}
.item-right-title,
.item-left-title {
  height: 50px;
  background: #e9eef1;
  padding: 0 10px;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .input-containers {
    flex: 1;
  }
  .search-btn {
    margin-left: 10px;
    width: 98px;
  }
  .choos-tag {
    color: #fff;
  }
}
.select-things-info {
  padding-left: 5px;
  height: 380px;
  overflow-y: auto;
  background: #fff;
  .item {
    padding: 15px 15px 10px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    .fa-roundcheckfill {
      color: #2196f3;
    }
    .fa-roundclosefill {
      color: #e8382b;
    }
    .disabled-icon {
      color: #f5f7fa;
      cursor: not-allowed;
    }
  }
  .select-things-icon {
    padding-left: 10px;
  }
}
.ethings-footer-left {
  display: flex;
  height: 34px;
  align-items: flex-start;
  .select-things-pagination {
    padding-top: 5px;
  }
}
</style>
