<template>
  <!-- // 也可以这样写,但是没有办法单独控制name age的显示 -->
  <el-dialog
    ref="dialog__wrapper"
    v-dialogDrag
    :visible.sync="dialogVisible"
    :width="width"
    :before-close="handleClose"
    :title="titleName"
    :append-to-body="appToBody"
  >
    <!-- // 这里的插槽会替换title显示的内容 -->
    <div
      slot="title"
      class="header-title"
      style="border-bottom: 1px solid #eee; padding-bottom: 10px;"
    >
      <slot name="title">{{ titleName }}</slot>
    </div>
    <div class="dialog-body">
      <div>
        <slot name="content"> </slot>
      </div>
      <div class="dialog-footer">
        <slot name="footer"> </slot>
      </div>
    </div>
  </el-dialog>
</template>

<script>
// import draggable from "vuedraggable";
export default {
  name: "DailogPane",
  // components: {
  //   draggable
  // },
  props: {
    titleName: {
      type: String,
      default: "提示"
    },
    width: {
      type: String,
      default: "60%"
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    appToBody: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //   dialogVisible: false,
    };
  },
  methods: {
    handleClose() {
      this.$emit("closeDialog");
    }
  }
};
</script>
<style lang="scss">
.el-dialog__header {
  padding: 15px 10px;
  background: #fff;
}
.el-dialog__body {
  // background: #f4f6f8;
  padding: 5px 20px 20px;
  height: 450px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.dialog-footer {
  padding: 20px 0;
}
</style>
<style lang="scss" scoped></style>
