<template>
  <div>
    <el-table
      ref="tableDom"
      :data="tableData"
      border
      stripe
      :fit="tableFit"
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      @selection-change="handleSelectionChange"
    >
      >
      <slot name="chechbox"></slot>
      <!-- show-overflow-tooltip -->
      <el-table-column
        fixed
        label="序号"
        type="index"
        align="center"
        width="50"
      ></el-table-column>
      <el-table-column
        v-for="(value, key) in tableHead"
        :key="key"
        :prop="value"
        :label="value"
        :width="columnWidths[key]"
        align="center"
      >
        <template slot-scope="scope">
          <slot
            v-if="slotColumns.indexOf(key) > -1"
            :name="key"
            v-bind="scope"
          ></slot>
          <!-- 用于某一列需要特殊处理  判断slotColumns传进来的值key里边是否存在 给调用他的父级传scope -->
          <template v-else>{{ scope.row[key] }}</template>
        </template>
      </el-table-column>
      <slot name="operate"></slot>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    tableFit: {
      type: Boolean,
      default: true
    },
    tableHead: {
      type: Object,
      default: () => {}
    },
    tableData: {
      type: Array,
      default: () => []
    },
    columnWidths: {
      type: Object,
      default: () => ({})
    },
    slotColumns: {
      type: Array,
      default: () => []
    }
  },
  mounted() {},
  methods: {
    handleSelectionChange(val) {
      // console.log(232, val);
      this.$emit("tableCheckBox", val);
    },
    expandFolodTable(arr, isExpand) {
      arr.forEach(i => {
        this.$refs.tableDom.toggleRowExpansion(i, isExpand);
        if (i.children) {
          this.expandFolodTable(i.children, isExpand);
        }
      });
    },
    cancleChecked(tag) {
      this.$refs.tableDom.toggleRowSelection(tag[0], false);
    }
  }
};
</script>
<style>
.el-table--medium th {
  padding: 8px 0;
}
.el-table--medium td {
  padding: 2px 0;
}
</style>
