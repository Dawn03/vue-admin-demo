<template>
  <div class="tree-menu">
    <el-tree
      ref="menuTreeNode"
      :data="menuData"
      :props="defaultProps"
      empty-text="暂无数据"
      :highlight-current="true"
      node-key="id"
      :check-strictly="true"
      :default-expand-all="expandAll"
      :default-expanded-keys="defaultExpand"
      :filter-node-method="filterNode"
      :default-checked-keys="checkedArr"
      :show-checkbox="showCheckbox"
      @node-click="handleNodeClick"
      @check-change="handleCheckChange"
      @check="clickDeal"
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
  // updated() {
  //   // 给多选树设置默认值 参数 id 组成的数组
  //   console.log("this.checkedArr", this.checkedArr);
  //   this.$refs.menuTreeNode.setCheckedKeys(this.checkedArr);
  // },
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
    /* 当前选中节点   节点选中状态发生变化时的回调*/
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
    },
    /* 当复选框被点击的时候触发*/
    clickDeal(currentObj, treeStatus) {
      // 用于：父子节点严格互不关联时，父节点勾选变化时通知子节点同步变化，实现单向关联。
      const selected = treeStatus.checkedKeys.indexOf(currentObj.id); // -1未选中
      // 选中
      if (selected !== -1) {
        // 子节点只要被选中父节点就被选中
        this.selectedParent(currentObj);
        // 统一处理子节点为相同的勾选状态
        this.uniteChildSame(currentObj, true);
      } else {
        // 未选中 处理子节点全部未选中
        if (currentObj.childs.length !== 0) {
          this.uniteChildSame(currentObj, false);
        }
      }
    },
    // 统一处理子节点为相同的勾选状态
    uniteChildSame(treeList, isSelected) {
      this.$refs.menuTreeNode.setChecked(treeList.id, isSelected);
      for (let i = 0; i < treeList.childs.length; i++) {
        this.uniteChildSame(treeList.childs[i], isSelected);
      }
    },
    // 统一处理父节点为选中
    selectedParent(currentObj) {
      const currentNode = this.$refs.menuTreeNode.getNode(currentObj);
      if (currentNode.parent.key !== undefined) {
        this.$refs.menuTreeNode.setChecked(currentNode.parent, true);
        this.selectedParent(currentNode.parent);
      }
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
