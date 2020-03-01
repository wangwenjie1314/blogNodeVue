<template>
  <div>
    <el-button
      v-if="!disabled"
      type="primary"
      plain
      :disabled="disabled"
      :size="$root.commonSize"
      :loading="loading"
      @click="$emit('choose')"
    >{{title}}</el-button>
    <template v-if="choosedList && choosedList.length && !isHideChoosed">
      <el-tag
        class="ml-5"
        v-for="(vv, vvindex) in choosedList"
        :key="vvindex"
        type="success"
        :closable="!disabled"
        @close="removeItem(vv)"
      >
        <slot name="tagtext" v-bind:item="vv">{{vv.c_name}}</slot>
      </el-tag>
    </template>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "EsChooseBtnTag",
  props: ["title", "list", "disabled", "isHideChoosed"],
  data() {
    return {
      choosedList: this.list || []
    };
  },
  computed: {
    ...mapState({
      loading: state => state.loading
    })
  },
  watch: {
    list(newVal) {
      console.log(newVal);
      this.choosedList = newVal || [];
    }
  },
  methods: {
    removeItem(vv) {
      this.choosedList.splice(this.choosedList.indexOf(vv), 1);
      this.$emit("change", this.choosedList);
    }
  }
};
</script>
