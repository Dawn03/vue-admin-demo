<template>
  <div class="input-filter">
    <el-form :inline="true" :model="formItem.value" class="demo-form-inline ">
      <el-form-item
        v-for="(item, index) in formItem"
        :label="`${item.label}：`"
        style="margin-right: 10px;"
      >
        <!-- :placeholder="`请输入${item.label}`" -->
        <!-- 普通输入框 -->
        <el-input
          v-if="item.type === 'input'"
          v-model="item.value"
          :style="{
            width: item.width ? `${item.width}px` : `${defaultWidth}px`
          }"
        ></el-input>
        <!-- 下拉选择框 -->
        <el-select
          v-if="item.type === 'select'"
          v-model="item.value"
          clearable
          placeholder="请选择"
          :style="{
            width: item.width ? `${item.width}px` : `${defaultWidth}px`
          }"
          @change="changeResult($event, item)"
        >
          <el-option
            v-for="val in item.options"
            :key="val.value"
            :label="val.label"
            :value="val.value"
          >
          </el-option>
        </el-select>
        <!-- 带搜索按钮的框 -->
        <el-input
          v-if="item.type === 'searchInput'"
          v-model="item.value"
          :style="{
            width: item.width ? `${item.width}px` : `${defaultWidth}px`
          }"
          @focus="showChoosePanel(item)"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="showChoosePanel(item)"
          ></el-button>
        </el-input>
      </el-form-item>
      <el-form-item style="margin-left: -12px;">
        <!-- 各页面按钮 -->
        <slot name="btnGroups"></slot>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "InputFilter",
  components: {},
  props: {
    formItem: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      defaultWidth: "150",
      selectOptions: []
    };
  },
  watch: {
    formItem(newVal, val) {
      console.log(78, newVal, val);
      this.selectOptions = newVal;
    }
  },
  methods: {
    changeResult(val, item) {
      this.$emit("statusValChange", val, item);
    },
    showChoosePanel(item) {
      //   console.log(2343);
      this.$emit("filterPanel", item);
    }
  }
};
</script>
<style lang="scss" scoped>
.input-filter {
  display: inline-block;
  margin-top: 10px;
}
</style>
