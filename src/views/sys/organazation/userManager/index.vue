<template>
  <div class="user">
    <div id="userLeft" class="user-left">
      <UserLeft
        id="bar"
        :inst-menu-data="instMenuData"
        class="bar transition-box"
        :default-expand="defaultExpand"
        @clickNodeReslut="clickNodeReslut"
      ></UserLeft>
      <span id="btn" class="toglebtn">
        <i
          :class="arrow === true ? 'el-icon-caret-right' : 'el-icon-caret-left'"
          class="icon-position"
        ></i>
      </span>
    </div>
    <div id="userRight" class="user-right">
      <UserRight ref="userRight" :inst-menu-data="instMenuData"></UserRight>
    </div>
  </div>
</template>
<script>
import UserLeft from "./userLeft";
import UserRight from "./userRight";
import { orgApi } from "@/api/organization";
import { toTreeData } from "@/utils/pubFunc";
export default {
  name: "UserManage",
  components: {
    UserLeft,
    UserRight
  },
  data() {
    return {
      arrow: true,
      instMenuData: [],
      defaultExpand: "" // 左侧菜单的默认展开值
    };
  },
  mounted() {
    this.init();
    this.getInsMenuTree();
    this.$store.dispatch("publicData/getOfficeMenuTree");
    this.$store.dispatch("publicData/getCompanyMenuTree");
  },
  methods: {
    init() {
      const _this = this;
      const btn = document.getElementById("btn");
      const userLeft = document.getElementById("userLeft");
      const userRight = document.getElementById("userRight");
      // const bar = document.getElementById("bar");
      btn.addEventListener(
        "click",
        function() {
          _this.arrow = !_this.arrow;
          // const display = bar.style.display;
          // if (display != "none") {
          //   bar.style.display = "none";
          // } else {
          //   bar.style.display = "block";
          // }
          const elWidth = userLeft.style.width;
          if (elWidth != "0px") {
            userLeft.style.width = "0px";
            userRight.style.width = "100%";

            setTimeout(function() {
              bar.style.display = "none";
            }, 1000);
          } else {
            userLeft.style.width = "200px";
            userRight.style.width = "calc(100% - 200px)";
            bar.style.display = "block";
          }
        },
        false
      );
    },
    getInsMenuTree() {
      orgApi.getInstitutionMenuTree({ ctrlPermi: 2 }).then(res => {
        const attributes = {
          id: "id",
          parentId: "pId",
          label: "name",
          rootId: "YD"
        };
        const treeData = toTreeData(res, attributes);
        this.instMenuData = treeData;

        this.defaultExpand = treeData[0].id;
        // console.log("treeData", this.defaultExpand, treeData);
      });
    },
    // 双击树节点获取数据查询结果
    clickNodeReslut(data) {
      this.$refs.userRight.searchBtn(data);
      console.log("左侧树节点双击", data);
    }
  }
};
</script>
<style lang="scss" scoped>
.user {
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  .user-left {
    width: 220px;
    position: relative;
    display: inline-block;
    height: 100%;
    // border-right: 1px solid #fafafa;
    transition: width 1s;
    -webkit-transition: width 1s;
    .bar {
      width: 220px;
      height: 100%;
      // transition: width 1s;
      // -webkit-transition: width 1s;
    }
    .toglebtn {
      position: absolute;
      display: inline-block;
      top: 200px;
      left: 100%;
      background: #eee;
      height: 70px;
      width: 10px;
      line-height: 70px;
      .icon-position {
        margin-left: -3px;
      }
    }
  }
  .user-right {
    display: inline-block;
    width: calc(100% - 220px);
  }
  .td-color {
    color: #1890ff;
    cursor: pointer;
  }
  .table-witth {
  }
}
</style>
