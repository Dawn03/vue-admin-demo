<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    }
  }
};
</script>
<style>
/* 解决table 表格错位问题 */
.el-table--border th.gutter:last-of-type {
  display: block !important;
  width: 17px !important;
}
/* 修改表单验证的默认样式 */
.el-form-item__error {
  color: #fff;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 17px;
  left: 6px;
  z-index: 5;
  background-color: #f56c6c;
  padding: 1px 5px 2px;
  border-radius: 5px;
  line-height: 20px;
  -webkit-box-shadow: 0 5px 10px #dedede;
  box-shadow: 0 5px 10px #dedede;
}
.el-form-item__error:after {
  display: block;
  content: "";
  border-width: 7px 7px 7px 7px;
  border-style: solid;
  border-color: transparent transparent #f56c6c transparent;
  position: absolute;
  left: 14px;
  top: -18px;
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
}
.wrapper_content {
  padding: 0 10px;
}
.r-btn {
  color: #f00;
}
 .td-color {
    color: #1890ff;
    cursor: pointer;
  }
</style>
