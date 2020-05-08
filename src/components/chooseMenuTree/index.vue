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
            v-on="$listeners"
          ></MenuTree>
        </el-col>
        <el-col :span="6">
          <span class="ctrol-btn" @click="switchStatus"> 展开 / 折叠 </span>
        </el-col>
      </el-row>
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
    defaultExpand: {
      type: Array,
      default: () => {
        return [];
      }
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
      this.display = this.display == "block" ? " none" : "block";
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
  }
}
.ctrol-btn {
  cursor: pointer;
}
</style>
