<template>
  <div class="tree-menu">
    <el-tree
      ref="menuTreeNode"
      :data="menuData"
      :props="defaultProps"
      empty-text="暂无数据"
      :highlight-current="true"
      node-key="id"
      :default-expand-all="expandAll"
      :default-expanded-keys="defaultExpand"
      :filter-node-method="filterNode"
      :default-checked-keys="checkedArr"
      :show-checkbox="showCheckbox"
      @node-click="handleNodeClick"
      @check-change="handleCheckChange"
    ></el-tree>
  </div>
</template>
<script>
import debounce from "lodash/debounce";
export default {
  name: "MenuTree",
  props: {
    menuData: {
      type: Array,
      default: () => []
    },
    expandAll: {
      type: Boolean,
      default: false
    },
    defaultExpand: {
      type: Array,
      default: () => []
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    checkedArr: {
      type: Array,
      default: () => []
    },
    titleName: {
      // 主要用来区分同个页面多个弹窗选择
      type: String,
      default: ""
    },
    clickType: {
      type: Boolean,
      default: false
    },
    clickResource: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label",
        titleNameVal: ""
      },
      clickCount: 0,
      dbIsTrue: false
    };
  },
  watch: {
    clickType: {
      handler(newVal, val) {
        this.dbIsTrue = newVal;
      },
      immediate: true
    },
    titleName: {
      handler(newVal, val) {
        this.titleNameVal = newVal;
      },
      immediate: true
    }
  },
  methods: {
    /* 当前点击的节点 */
    handleNodeClick(data) {
      // 发送双击事件
      console.log("this.dbIsTrue", this.dbIsTrue);
      if (this.dbIsTrue) {
        // console.log("sssss", data);
        const _this = this;
        this.clickCount++;
        const fnEmitDblClick = debounce(() => {
          if (this.clickCount > 1) {
            _this.$emit("clickNodeReslut", data);
            // console.log("dbclick", data);
          }
          _this.clickCount = 0;
        }, 500);
        fnEmitDblClick();
      } else {
        // console.log("vvvvv", data);
        this.$emit("clickNodeReslut", data);
      }
    },
    /* 搜索关键字 */
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    /* menu 搜索结果 */
    executeFilter(val) {
      this.$refs.menuTreeNode.filter(val);
    },
    /* 收起或者展开所有节点 */
    showOrHiddenAllNodes() {
      const allNodes = this.$refs.menuTreeNode.store._getAllNodes();
      for (let i = 0, len = allNodes.length; i < len; i++) {
        allNodes[i].expanded = this.expandAll;
      }
    },
    /* 当前选中节点 */
    handleCheckChange(data, checked, indeterminate) {
      console.log(84, data, checked, indeterminate);
    },
    /* 全选反选 */
    checkAll(val) {
      if (val) {
        this.$refs.menuTreeNode.setCheckedNodes(this.menuData);
      } else {
        this.$refs.menuTreeNode.setCheckedKeys([]);
      }
    },
    /* 展开第一级 */
    expandFirst(data) {
      console.log(data[0].id, 2222);
      this.$refs.menuTreeNode.store.nodesMap[data[0].id].expanded = true;
    }
  }
};
</script>
<style>
.tree-menu {
  width: auto !important;
}
.el-tree {
  background: transparent;
}
</style>
<style lang="scss" scoped>
.tree-menu {
  width: 200px;
}
</style>
