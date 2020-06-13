/*带搜索图标输入框的选择弹窗模板 弹窗嵌套弹窗 背景遮罩问题 单独写*/
<template>
  <div class="inner-dailog-box">
    <el-dialog
      ref="dialog__wrapper"
      v-dialogDrag
      :append-to-body="true"
      width="30%"
      :title="titleName"
      :visible.sync="innerDialogVisible"
      :before-close="handleClose"
    >
      <div style="text-align: right; line-height: 40px;">
        <i
          v-show="showKeyVal"
          class="el-icon-caret-top"
          @click="expandFunc"
        ></i>
        <i
          v-show="!showKeyVal"
          class="el-icon-caret-bottom"
          @click="expandFunc"
        ></i>
      </div>
      <div :style="{ display: display }" style="text-align:center;">
        <span>关键字： </span>
        <el-input v-model="keyVal_" style="width: 200px;"> </el-input>
        <el-button type="primary" size="mini" @click="searchKey">
          搜索
        </el-button>
      </div>
      <el-row style="margin-top:20px;">
        <el-col :span="18">
          <MenuTree
            ref="menuTreeDom"
            :menu-data="menuData"
            :default-expand="defaultExpand"
            :expand-all="expandAll"
            :click-type="true"
            :parent-node="parentNode"
            :show-checkbox="showCheckbox"
            :checked-memu="checkedMemu"
            v-on="$listeners"
          ></MenuTree>
        </el-col>
        <el-col :span="6">
          <span class="ctrol-btn" @click="switchStatus"> 展开 / 折叠 </span>
        </el-col>
      </el-row>
      <div class="btn-box">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-check"
          @click="sureAndCloseBtn"
        >
          确定
        </el-button>
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-close"
          @click="sureAndCloseBtn"
        >
          关闭
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import MenuTree from "@/components/menuTree";
export default {
  name: "ChooseMenuTree",
  components: {
    MenuTree
  },
  props: {
    titleName: {
      type: String,
      default: ""
    },
    keyVal: {
      type: String,
      default: ""
    },
    innerDialogVisible: {
      type: Boolean,
      default: false
    },
    menuData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    checkedMemu: {
      type: Array,
      default: () => {
        return [];
      }
    },
    defaultExpand: {
      type: Array,
      default: () => {
        return [];
      }
    },
    parentNode: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showKeyVal: true,
      display: "block",
      expandAll: false
    };
  },
  computed: {
    keyVal_: {
      get() {
        return this.keyVal;
      },
      set(val) {
        /* keyVal_改变由父组件控制 */
        this.$emit("on-change-keyVal", val);
      }
    }
  },
  watch: {
    /* tree 搜索过滤 */
    keyVal_(val) {
      this.$refs.menuTreeDom.executeFilter(val);
    }
  },
  methods: {
    // 关闭对话框选择
    handleClose() {
      this.$emit("closeInnerDialog");
    },
    /* 收或展开 关键字搜素 */
    expandFunc() {
      this.showKeyVal = !this.showKeyVal;
      this.display = this.display === "block" ? " none" : "block";
    },

    /* 展开或收起选项 */
    switchStatus() {
      this.expandAll = !this.expandAll;
      this.$refs.menuTreeDom.showOrHiddenAllNodes();
    },
    /* 搜索关键字  */
    searchKey() {
      console.log("搜索关键字");
      // this.$refs.menuTreeDom.executeFilter(this.keyVal);
    },
    /* 选择的节点的值已经传到组件 所以不需要任何传值 只需关闭弹窗即可  */
    sureAndCloseBtn(val) {
      this.$emit("closeInnerDialog");
      //  this.passCheckedNode(this.)
    },
    // 设置默认选中
    setDefaultChecked(tree) {
      console.log(170, tree, this.checkedMemu);
      this.$refs.menuTreeDom.setDefaultChecked(this.checkedMemu);
    }
  }
};
</script>

<style lang="scss" scoped>
.inner-dailog-box {
  .el-dialog__header {
    padding: 0 10px;
    background: #fff;
  }
  .el-dialog__body {
    background: #f4f6f8;
    padding: 5px 20px;
    height: 300px;
    // position: relative;
  }
}
.ctrol-btn {
  cursor: pointer;
}
.btn-box {
  width: 100%;
  text-align: right;
  padding: 20px 10px;
}
</style>
