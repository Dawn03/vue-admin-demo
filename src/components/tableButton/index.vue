<template>
  <div>
    <!-- {{rowData}} -->
    <el-button
      type="text"
      size="small"
      @click="editHandleClick(rowData, '编辑')"
    >
      <i class="el-icon-edit" title="编辑"> </i
    ></el-button>
    <el-button type="text" size="small" @click="stopUse(rowData)">
      <i
        :class="[
          rowData.status === '0'
            ? 'el-icon-video-pause'
            : 'el-icon-circle-check '
        ]"
        :title="rowData.status"
      ></i>
    </el-button>
    <el-button type="text" size="small" @click="deleteHandleClick(rowData)">
      <i class="el-icon-delete" style="color: red;" title="删除"></i>
    </el-button>
    <el-button type="text" size="small" @click="deleteHandleClick(rowData)">
      <i class="el-icon-plus" title="新增"></i>
    </el-button>
  </div>
</template>
<script>
export default {
  name: "TableBtn",
  props: ["rowData"],
  methods: {
    editHandleClick(rowData) {
      this.$emit("editHandleClick", rowData);
    },
    stopUse() {},
    deleteHandleClick(rowData) {
      this.$emit("deleteHandleClick", rowData);
    }
  }
};
</script>
<style lang="scss"></style>
