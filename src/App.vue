<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style>
/* 解决table 表格错位问题 */
.el-table--border th.gutter:last-of-type {
  display: block !important;
  width: 17px !important;
}
</style>
