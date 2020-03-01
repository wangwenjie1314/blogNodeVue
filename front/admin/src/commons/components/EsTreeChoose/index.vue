<template>
  <el-dialog
    width="65%"
    :title="title || '选择'"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="isTreeDialog"
    :append-to-body="true"
    class="el-dialog-zero"
    @close="$emit('update:show', false);"
  >
    <el-row
      :gutter="10"
      class="es-choose-layout"
    >
      <el-col
        :span="8"
        class="es-choose-left"
      >
        <div class="choose-header">
          <h3 class="title">组织机构</h3>
        </div>
        <div class="choose-content">
          <!-- 通用树状 -->
          <el-tree
            ref="chooseTree"
            node-key="id"
            :data="treeList"
            :props="{
              children: 'children',
              label: 'name'
            }"
            :default-expand-all="true"
            :highlight-current="true"
            :expand-on-click-node="false"
            :empty-text="'加载中...'"
            @node-click="(node) => handleWaitNodeClick(node)"
          >
            <span
              class="choose-tree-node"
              :class="{'disabled':data.disabled}"
              slot-scope="{ node, data }"
            >
              <span class="tree-node-label">{{ node.label }}</span>
              <span
                class="tree-node-ctrl"
                v-if="chooseType=='two'"
              >
                <i
                  class="fa"
                  v-if="!data.disabled"
                  :class="choosed[data.id]?icons[0]:icons[2]"
                />
                <i
                  class="fa fa-roundcheckfill"
                  v-else
                />
              </span>
            </span>
          </el-tree>
        </div>
      </el-col>
      <el-col
        :span="8"
        class="es-choose-center"
      >
        <div class="choose-header">
          <h3 class="title">待选择</h3>
        </div>
        <div class="choose-content">
          <ul
            class="es-choose-list"
            v-if="treeChildList && treeChildList.length"
          >
            <li
              class="choose-list-item"
              :class="{'disabled':node.disabled}"
              v-for="(node, nodeIndex) in treeChildList"
              :key="nodeIndex"
              @click="() => toggleChoose(node)"
            >
              <span class="list-item-name">
                <span class="name">{{ node.name }}</span>
              </span>
              <span class="list-item-state">
                <i
                  class="fa"
                  v-if="!node.disabled"
                  :class="choosed[node.id]?icons[0]:icons[2]"
                />
                <i
                  class="fa fa-roundcheckfill"
                  v-else
                />
              </span>
            </li>
          </ul>
          <div
            class="padding font-12 text-center"
            v-else
          >暂无数据</div>
        </div>
      </el-col>
      <el-col
        :span="8"
        class="es-choose-right"
      >
        <div class="choose-header">
          <h3 class="title">已选择</h3>
        </div>
        <div class="choose-content">
          <ul class="es-choose-list">
            <li
              class="choose-list-item"
              :class="{'disabled':node.disabled}"
              v-for="(node, nodeIndex) in choosed"
              :key="nodeIndex"
              @click="() => toggleChoose(node)"
            >
              <span class="list-item-name">
                <span class="name">{{ node.name }}</span>
              </span>
              <span class="list-item-state">
                <i
                  class="fa"
                  v-if="!node.disabled"
                  :class="choosed[node.id]?icons[1]:icons[2]"
                />
                <i
                  class="fa fa-roundcheckfill"
                  v-else
                />
              </span>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        :size="$root.commonSize"
        @click="isTreeDialog = false"
      >取 消</el-button>
      <el-button
        :size="$root.commonSize"
        type="primary"
        @click="submit()"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { handleTreeV2 } from "../../services/tree";
import { cloneDeep } from "lodash";

export default {
  name: "EsTreeChoose",
  // waitDisabled Array ['c_id', ....]
  // waitChildDisabled  Array ['c_id', ...]
  // hadChoosed Array [{c_id: xx, xxx: xxxx}, ...]
  props: [
    "show",
    "title",
    "list",
    "childlist",
    "getChildListFn",
    "multiple",
    "waitDisabled",
    "waitChildDisabled",
    "hadChoosed"
  ],
  data() {
    return {
      isTreeDialog: this.show,
      icons: [
        "fa-roundcheckfill text-primary",
        "fa-roundclosefill text-danger",
        "fa-round text-gray-9"
      ],
      chooseType: "three",
      treeList: [],
      treeChildList: [],
      choosed: {}
    };
  },
  created() {
    this.initTree();
    this.initHadChoosed();
  },
  watch: {
    childlist(newData) {
      let vm = this;
      let tempArr = [];
      newData.map(v => {
        let temp = {
          id: v.c_id || v.id,
          name: v.c_name || v.name
        };
        // 注入禁止选择
        if (vm.waitChildDisabled.indexOf(temp.id) > -1) {
          temp.disabled = true;
        }
        tempArr.push(temp);
      });
      this.treeChildList = tempArr;
    }
  },
  methods: {
    /**
     * 初始化tree
     */
    initTree() {
      let vm = this;
      let tempArr = [];
      vm.list.map(v => {
        tempArr.push({
          id: v.c_id || v.id,
          name: v.c_name || v.name,
          parentId: v.c_parentid || v.parentid
        });
      });
      vm.treeList = handleTreeV2(tempArr);
      if (vm.treeList && vm.treeList.length) {
        setTimeout(() => {
          this.$refs.chooseTree.setCurrentKey(this.treeList[0].id);
          this.handleWaitNodeClick(this.treeList[0]);
        }, 500);
      }
    },
    /**
     * 初始化已选择
     */
    initHadChoosed() {
      if (this.hadChoosed && this.hadChoosed.length) {
        let choosedHash = {};
        this.hadChoosed.map(v => {
          v.id = v.c_id || v.id;
          v.name = v.c_name || v.name;
          choosedHash[v.id] = v;
        });
        this.choosed = choosedHash;
      }
    },
    /**
     * 待选择列表点击时
     */
    async handleWaitNodeClick(node) {
      let vm = this;
      if (node && node.disabled) {
        console.warn("禁止点击");
        return;
      }
      //获取树下列表
      vm.getChildListFn && vm.getChildListFn(node);
    },
    /**
     * 已选择列表 选中/取消
     */
    toggleChoose(node) {
      if (node && node.disabled) {
        console.warn("禁止点击");
        return;
      }
      let choosed = cloneDeep(this.choosed);
      if (Reflect.has(choosed, node.id)) {
        Reflect.deleteProperty(choosed, node.id);
      } else {
        // 单选下新增的时候需要把原来的先滞空
        if (!this.multiple) {
          choosed = {};
        }
        Reflect.set(choosed, node.id, node);
      }
      this.choosed = choosed;
    },
    submit() {
      let vm = this;
      // if (Object.keys(vm.choosed).length < 1) {
      //   vm.$message({
      //     type: "warning",
      //     message: "请您至少选择一项数据"
      //   });
      //   return;
      // }
      // 清洗选中数据
      let arr = [];
      for (let ke in this.choosed) {
        let { id, name } = this.choosed[ke];
        arr.push({
          id,
          name
        });
      }
      console.log(arr, this.choosed);
      this.$emit("success", arr);
      this.isTreeDialog = false;
    }
  }
};
</script>
<style lang="less" scoped>
.es-choose-layout {
  height: calc(100vh - 250px);
  overflow: hidden;
}

.es-choose-left,
.es-choose-center,
.es-choose-right {
  height: 100%;
  background: #f5f6f7;
  overflow: hidden;
  .choose-header {
    height: 45px;
    width: 100%;
    background: #f5f6f8;
    line-height: 45px;
    padding: 0 10px;
    text-align: center;
    .title {
      font-size: 14px;
    }
  }
  .choose-content {
    background: #fff;
    height: calc(100% - 45px);
    overflow-x: hidden;
    overflow-y: auto;
    &.no-header {
      height: 100%;
    }
  }
}

//搜索区域
.choose-header-search {
  display: flex;
  .search-box {
    flex: 1;
  }
}

//选择列表
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

//树状节点样式
.choose-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  &.disabled {
    color: #999;
    cursor: not-allowed;
    .fa {
      color: #ccc;
    }
  }
}
</style>
