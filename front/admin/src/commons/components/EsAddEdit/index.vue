<template>
  <el-dialog
    width="65%"
    :title="(!addEditForm.c_id?'新增':'编辑')+title"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="handleClose"
    :visible.sync="isAddEditDialog"
    :append-to-body="true"
    @close="$emit('update:show', false);"
  >
    <el-form
      ref="addEditForm"
      :model="addEditForm"
      :rules="addEditRules"
      :size="$root.commonSize || 'small'"
      :inline="inline"
      :label-width="(labelWidth || 140) +'px'"
      @submit.native.prevent
    >
      <!-- form插槽 -->
      <slot name="formitemstart"></slot>
      <template v-for="(v, vindex) in addEditItems">
        <slot :name="'formitem'+ vindex"></slot>
        <el-form-item
          :key="vindex"
          :label="v.title +'：'"
          :prop="v.key"
          v-if="!v.isHidden && !(!addEditForm.c_id && v.isAddHidden) && !(addEditForm.c_id && v.isEditHide) && !v.isInfoShow"
          :class="{'el-form-item-block': v.isBlock}"
        >
          <el-select
            v-if="v.type=='select'"
            clearable
            filterable
            :multiple="v.isMultiple"
            v-model="addEditForm[v.key]"
            :disabled="v.isDisabled || v.isReadonly || (addEditForm.c_id && v.isEditReadonly)"
            :placeholder="'请选择'+v.title"
            @change="$emit('selectchange', {
              key: v.key
            })"
          >
            <!-- 支持字典 -->
            <template v-if="v.dict && dicts[v.dict + 'List'] && dicts[v.dict + 'List'].length">
              <el-option
                v-for="(vv, vvindex) in dicts[v.dict + 'List']"
                :label="vv.c_dictname || vv.c_name"
                :value="vv.c_dictcode || vv.c_code"
                :key="vvindex"
              ></el-option>
            </template>
            <!-- 支持列表 -->
            <template v-else-if="v.list && v.list.length">
              <el-option
                v-for="(vv, vvindex) in v.list"
                :label="vv[v.selectKey] || vv.c_name"
                :value="vv[v.valueKey] || vv.c_id"
                :key="vvindex"
              ></el-option>
            </template>
          </el-select>
          <el-date-picker
            v-else-if="v.type==='date' || v.type==='datetime'"
            :type="v.type"
            :value-format="v.type==='datetime'?'yyyy-MM-dd HH:mm':'yyyy-MM-dd'"
            :format="v.type==='datetime'?'yyyy-MM-dd HH:mm':'yyyy-MM-dd'"
            v-model="addEditForm[v.key]"
            :readonly="v.isReadonly || (addEditForm.c_id && v.isEditReadonly)"
            :disabled="v.isDisabled"
            :placeholder="'请选择'+v.title"
            :picker-options="getPickerOptions(v)"
            :editable="false"
          ></el-date-picker>
          <el-upload
            v-else-if="v.type=='pic'"
            class="avatar-uploader"
            style="width:50px;height:50px"
            action="//up.qbox.me/"
            :accept="$dicts.file.accept.img"
            :show-file-list="false"
            :before-upload="(file)=>uploadImg(v.key, file)"
          >
            <img
              v-if="addEditForm[v.key]"
              :src="addEditForm[v.key]"
              class="avatar"
            />
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            ></i>
          </el-upload>
          <el-radio-group
            v-else-if="v.type=='boolean'"
            v-model="addEditForm[v.key]"
            :disabled="v.isDisabled || v.isReadonly || (addEditForm.c_id && v.isEditReadonly)"
          >
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
          <el-input-number
            v-else-if="v.type=='number'"
            v-model="addEditForm[v.key]"
            :disabled="v.isDisabled || v.isReadonly || (addEditForm.c_id && v.isEditReadonly)"
            :controls="false"
            :min="0"
          ></el-input-number>
          <el-input
            v-else
            :type="v.type || 'text'"
            rows="5"
            v-model="addEditForm[v.key]"
            :auto-complete="v.type=='password'?'new-password':'off'"
            :disabled="v.isDisabled || v.isReadonly || (addEditForm.c_id && v.isEditReadonly)"
            clearable
            :placeholder="'请输入'+v.title"
          ></el-input>
        </el-form-item>
      </template>
      <!-- form插槽 -->
      <slot name="formitemend"></slot>
      <el-form-item style="display:block;margin-top:30px;text-align:center">
        <el-button
          type="primary"
          :size="$root.commonSize"
          style="width:200px;"
          native-type="submit"
          @click="submitForm('addEditForm')"
          :loading="loading"
          :disabled="!(addEditItems && addEditItems.length)"
        >{{ submitButtonText || '保存'}}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { mapState } from "vuex";
import { handleFormData } from "@/commons/services/form";
import { handleError } from "@/commons/services/index";

export default {
  name: "EsAddEdit",
  props: [
    "show",
    "title",
    "api",
    "labelWidth",
    "tpls",
    "records",
    "inline",
    "submitButtonText",
    "beforeSendFn", // ajax 发送前
    "cbAjaxData" // success时使用ajaxData
  ],
  data() {
    return {
      isAddEditDialog: this.show,
      addEditForm: {}, //表单
      addEditRules: {}, //表单规则
      addEditItems: [], //工作项s
      dicts: {} //字典s
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
  methods: {
    /**
     * 处理表单
     */
    renderForm() {
      let vm = this;
      let { addEditForm, addEditRules, dicts } = handleFormData(
        vm.tpls,
        vm.records
      );
      vm.dicts = dicts;
      vm.addEditForm = addEditForm;
      vm.addEditRules = addEditRules;
      vm.addEditItems = vm.tpls;
      vm.$emit("init", vm.addEditForm);
    },
    /**
     * 日期配置
     */
    getPickerOptions(v) {
      // 选择日期的时候不让选择当前日期以后的日期
      if (v && v.isNowMax) {
        return {
          disabledDate(time) {
            return time.getTime() > Date.now(); //如果没有后面的-8.64e6就是不可以选择今天的
          }
        };
      } else {
        return {};
      }
    },
    /**
     * 文件上传
     */
    uploadImg(key, file) {
      this.doUplpadImg(key, file);
      return false;
    },
    async doUplpadImg(key, file) {
      let vm = this;
      let { c_httpaddr } = await vm.$upload({
        file: file,
        url: "uploadApi/upload"
      });
      //赋值
      vm.addEditForm[key] = c_httpaddr;
    },
    /**
     * 执行提交
     */
    submitForm(formName) {
      let vm = this;
      vm.$refs[formName].validate(valid => {
        if (!valid) {
          vm.$message.error("请填写完整表单信息");
        } else {
          vm.doSubmit();
        }
      });
    },
    async doSubmit() {
      let vm = this;
      try {
        let ajaxData = JSON.parse(JSON.stringify(vm.addEditForm));
        //私有化定制事件
        if (vm.beforeSendFn) {
          ajaxData = await vm.beforeSendFn(ajaxData);
        }
        //通用处理数据清洗
        vm.tpls.map(v => {
          //处理select 多选
          if (
            v.isMultiple &&
            v.type === "select" &&
            ajaxData[v.key] &&
            Array.isArray(ajaxData[v.key])
          ) {
            ajaxData[v.key] = ajaxData[v.key].join(",");
          }
        });
        let result = await vm.$axios.post(vm.api, ajaxData);
        //msg
        vm.$message({
          message: "操作成功",
          type: "success"
        });
        //是否使用ajaxData
        if (vm.cbAjaxData) {
          vm.$emit("success", ajaxData);
        } else {
          vm.$emit("success", result);
        }
        vm.isAddEditDialog = false;
      } catch (error) {
        if (typeof error === "object" && error.message) {
          vm.$message.error(error.message);
        }
      }
    },
    /**
     * 弹窗关闭
     */
    handleClose(done) {
      let vm = this;
      vm.$refs["addEditForm"].resetFields();
      done();
    }
  }
};
</script>
