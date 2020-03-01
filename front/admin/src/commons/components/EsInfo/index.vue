<template>
  <el-form
    ref="addEditForm"
    :model="addEditForm"
    :size="$root.commonSize || 'small'"
    :inline="inline"
    :label-width="labelWidth +'px'"
    class="es-form-info"
    :class="{'all': isScreenAll}"
    v-loading="loading"
  >
    <a
      href="javascript:;"
      class="link-edit text-primary font-14"
      v-if="useEdit"
      @click="addEdit()"
    >编辑</a>
    <div class="es-form-items">
      <!-- form插槽 -->
      <slot name="formitemstart"></slot>
      <template v-for="(v, vindex) in addEditItems">
        <slot :name="'formitem'+ vindex"></slot>
        <el-form-item
          :key="vindex"
          class="es-form-item"
          :class="{'el-form-item-block': v.isBlock}"
          :label="v.title +'：'"
          :prop="v.key"
          v-if="!v.isHidden && !v.isInfoHide"
        >
          <el-image
            v-if="v.type==='pic'"
            style="width: 50px; height: 50px;"
            :src="addEditForm[v.keyinfo || v.key]"
            :fit="'fit'"
            lazy
            :preview-src-list="[addEditForm[v.keyinfo || v.key]]"
          >
            <div
              slot="error"
              class="image-slot"
            >
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <template v-else-if="v.dict">
            <!-- 处理多选-->
            <template v-if="v.isMultiple">
              <template v-for="(vv, vvindex) in addEditForm[v.keyinfo || v.key]">
                <span :key="vvindex">{{vv && dicts[v.dict] && dicts[v.dict][vv]?dicts[v.dict][vv]+(vvindex===addEditForm[v.keyinfo || v.key].length-1?'':'、'):'-'}}</span>
              </template>
            </template>
            <template v-else>{{addEditForm[v.keyinfo || v.key] && dicts[v.dict] && dicts[v.dict][addEditForm[v.keyinfo || v.key]]?dicts[v.dict][addEditForm[v.keyinfo || v.key]]:'-'}}</template>
          </template>
          <template v-else-if="v.type==='boolean'">{{(addEditForm[v.keyinfo || v.key] || '-') | booleanFilter}}</template>
          <div
            v-else-if="v.type==='textarea'"
            class="es-form-item-textarea"
            v-html="textareaFilter(addEditForm[v.keyinfo || v.key] || '-')"
          ></div>
          <template v-else>{{addEditForm[v.keyinfo || v.key] || '-'}}</template>
        </el-form-item>
      </template>
      <!-- form插槽 -->
      <slot name="formitemend"></slot>
    </div>
  </el-form>
</template>
<script>
import { mapState } from "vuex";
import { handleFormData } from "@/commons/services/form";

export default {
  name: "EsInfo",
  props: {
    labelWidth: {
      type: Number,
      default: 120
    },
    tpls: {
      type: Array
    },
    records: {
      type: Object
    },
    inline: {
      type: Boolean,
      default: true
    },
    isScreenAll: {
      type: Boolean,
      default: true
    }, //展示区域占比
    useEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      addEditForm: {}, //表单
      addEditItems: [], //工作项s
      dicts: window.dicts //字典s
    };
  },
  computed: {
    ...mapState({
      loading: state => state.loading
    })
  },
  created() {
    this.renderForm();
  },
  watch: {
    records(newVal) {
      this.renderForm();
    }
  },
  methods: {
    /**
     * 处理表单
     */
    renderForm() {
      let vm = this;
      let { addEditForm } = handleFormData(vm.tpls, vm.records, "info");
      vm.$set(vm, "addEditForm", addEditForm);
      vm.$set(vm, "addEditItems", vm.tpls);
    },
    /**
     * 触发编辑
     */
    addEdit() {
      this.$emit("edit");
    }
  }
};
</script>
<style lang="less">
.es-form-info {
  position: relative;
  .link-edit {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}
.el-card__body {
  .es-form-info {
    .link-edit {
      right: 0;
      top: 0;
    }
  }
}
</style>
