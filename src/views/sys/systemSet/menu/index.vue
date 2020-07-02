<template>
  <div class="post  wrapper_content">
    <div class="current-type clearfix">
      <div class="fl">
        <i class="el-icon-user"></i>
      
        <span>菜单管理</span>
      </div>
      <div class="fr">
        <el-button
          type="primary"
          icon="el-icon-view"
          size="mini"
          @click="showOrHidden"
        >
          {{ btnText }}
        </el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="addNew({}, '新增')"
        >
          新增
        </el-button>
      </div>
    </div>
    <div>
      <InputFilter
        :form-item="formInline"
        class="search"
        @searchBtn="searchBtn"
      >
        <template slot="btnGroups">
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="searchBtn"
          >
            查询
          </el-button>
          <el-button size="mini" @click="resetForm"> 重置 </el-button>
        </template>
      </InputFilter>
    </div>

    <TableTree
      :table-head="tableHead"
      :table-data="tableData"
      :column-widths="columnWidths"
      :column-text-postion="columnTextPostion"
      :slot-columns="slotColumns"
      :table-fit="tableFit"
      style="margin-top: 10px;"
      :page-nation="pageNation"
      :show-page="false"
      @currentChange="currentChange"
      @requstLazyLoad="requstLazyLoad"
    >
      <template slot="menuName" slot-scope="scope">
        <span class="td-color tl" @click="menuEdit(scope.row, '编辑')">
          {{ scope.row.menuName }}
        </span>
      </template>
      <template slot="moduleCodes" slot-scope="scope">
        <span class="td-color">
          {{ scope.row.moduleCodes }}
        </span>
      </template>
      <template slot="treeSort" slot-scope="scope">
        <el-input v-model="scope.row.treeSort" class="tree-sort"></el-input>
        <!-- {{ scope.row.treeSort }} -->
      </template>
      <template slot="weight" slot-scope="scope">
        <span v-if="scope.row.weight == '80'" style="color:#c243d6">
          {{ swichText("sys_menu_weight", scope.row.weight, "未设置") }}
        </span>
        <span v-else>
          {{ swichText("sys_menu_weight", scope.row.weight, "未设置") }}
        </span>
      </template>
      <template slot="menuType" slot-scope="scope">
        <span v-if="scope.row.menuType == '2'" style="color:#c243d6">
          {{ swichText("sys_menu_type", scope.row.menuType, "未设置") }}
        </span>
        <span v-else>
          {{ swichText("sys_menu_type", scope.row.menuType, "未设置") }}
        </span>
      </template>
      <template slot="isShow" slot-scope="scope">
        <span v-if="scope.row.isShow === '0'" style="color:#aaa">
          {{ swichText("sys_show_hide", scope.row.isShow, "未设置") }}
        </span>
        <span v-else>
          {{ swichText("sys_show_hide", scope.row.isShow, "未设置") }}
        </span>
      </template>
      <template slot="operate">
        <el-table-column fixed="right" label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="menuEdit(scope.row, '编辑')"
            >
              <i class="el-icon-edit" title="编辑"></i>
            </el-button>
            <el-button type="text" size="small" @click="deleteBtn(scope.row)">
              <i style="color:red;" class="el-icon-delete" title="删除"></i>
            </el-button>
          </template>
        </el-table-column>
      </template>
    </TableTree>
    <menuEdit ref="secAdminEditPanel" @initPage="initPage"></menuEdit>
    <AddUser ref="secAdminAddUser" @addUserVal="addUserVal"></AddUser>
  </div>
</template>
<script>
import TableTree from "@/components/tableTree";
import InputFilter from "@/components/inputFliter";
import menuEdit from "./menuEdit";
import AddUser from "./addUser";
import { clearFilterVal, getInputVal, dictTypeMap } from "@/utils/pubFunc";
// import { orgApi } from "@/api/organization";
import { sysApi } from "../../../../api/systemSet";
export default {
  name: "Menu",
  inject: ["reload"],
  components: {
    TableTree,
    InputFilter,
    menuEdit,
    AddUser
  },
  data() {
    return {
      btnText: "查询",
      stopOrStart: null,
      formInline: [
        {
          type: "input",
          label: "菜单名称",
          key: "menuName",
          value: ""
        }
      ],
      columnTextPostion: {
        menuName: "left"
      },
      columnWidths: {},
      slotColumns: [
        "menuName",
        "moduleCodes",
        "treeSort",
        "isShow",
        "menuType",
        "weight"
      ],
      tableHead: {
        menuName: "菜单名称",
        moduleCodes: "归属模块",
        menuHref: "链接",
        treeSort: "排序",
        menuType: "类型", // 1 菜单 2权限
        isShow: "可见", // 0 隐藏 1可见
        permission: "权限标志",
        weight: "菜单权重"
      },
      tableData: [],
      pageNation: {},
      tableFit: true
    };
  },
  mounted() {
    this.init(this.pageNation);
  },
  methods: {
    initPage() {
      this.reload();
    },
    init(param) {
      // console.log(2222, param);
      sysApi.getMenu(param).then(res => {
        for (let i = 0, len = res.length; i < len; i++) {
          if (res[i].isTreeLeaf === false) {
            res[i].hasChildren = true;
          }
        }
        this.tableData = res;
      });
    },
    // tree 懒加载
    requstLazyLoad(param) {
      console.log(204, param);
      const obj = {
        nodeid: param.tree.id,
        parentCode: param.tree.id,
        parentid: param.tree.parentCode,
        _search: false,
        pageSize: "",
        pageNo: 1
      };
      sysApi.getMenu(obj).then(res => {
        for (let i = 0, len = res.length; i < len; i++) {
          if (!res[i].isTreeLeaf) {
            res[i].hasChildren = true;
          }
        }
        param.resolve(res);
      });
    },
    /* 列表文本转义 */
    swichText(type, val, other) {
      return dictTypeMap(type, val, other);
    },
    showOrHidden() {
      this.btnText = this.btnText === "查询" ? "隐藏" : "查询";
    },
    /* 获取岗位下拉框数据 */
    getPostOption(type) {
      const selectTypeData = JSON.parse(
        sessionStorage.getItem("selectDicType")
      );
      return selectTypeData[type];
    },
    /* 获取状态下拉框数据 */
    getStatusOption(type) {
      const selectTypeData = JSON.parse(
        sessionStorage.getItem("selectDicType")
      );
      return selectTypeData[type];
    },
    stopUsePost(row) {
      if (row.status === "0") {
        this.stopOrStart = "disable";
        this.stopOrStartText = "停用";
      } else {
        this.stopOrStart = "enable";
        this.stopOrStartText = "起用";
      }
      // this.$alertMsgBox(`确定要${this.stopOrStartText}该用户吗`, "信息")
      //   .then(() => {
      //     orgApi
      //       .stopUsePost({
      //         stopOrStart: this.stopOrStart,
      //         postCode: row.postCode
      //       })
      //       .then(res => {
      //         if (res.result === "true") {
      //           this.init(this.pageNation);
      //           this.$message.success(res.message);
      //         } else {
      //           this.$message.warning(res.message);
      //         }
      //       });
      //   })
      //   .catch(() => {
      //     this.$message.info("取消");
      //   });
    },
    deleteBtn(row) {
      this.$alertMsgBox(`此操作将永久删除该文件, 是否继续?`, "提示")
        .then(() => {
          // orgApi
          //   .deleteSecAdmin({
          //     userCode: row.userCode
          //   })
          //   .then(res => {
          //     if (res.result === "true") {
          //       this.init(this.pageNation);
          //       this.$message.success(res.message);
          //     }
          //   });
        })
        .catch(() => {
          this.$message.info("取消");
        });
    },
    /* 获取填入输入框的值  */
    searchBtn(data = {}) {
      // this.pageNation
      const obj = {
        pageSize: this.pageNation.pageSize,
        pageNo: 1,
        status: ""
      };
      const valObj = Object.assign(obj, getInputVal(this.formInline));
      this.init(valObj);
    },
    /* 清除输入框内的值 */
    resetForm() {
      this.pageNation.status = "";
      const valObj = Object.assign(
        this.pageNation,
        clearFilterVal(this.formInline)
      );
      this.init(valObj);
    },
    currentChange(val) {
      this.pageNation.pageNo = val;
      this.init(this.pageNation);
    },
    /* 编辑表格 */
    menuEdit(row, type) {
      this.$refs.secAdminEditPanel.show(row, type);
    },
    addNew(row, type) {
      this.$refs.secAdminAddUser.show(row, type);
    },
    /* 选中的用户 */
    addUserVal(row) {
      this.$refs.secAdminEditPanel.show(row[0], "编辑");
    }
  }
};
</script>
<style lang="scss">
.tree-sort {
  margin: 0 auto;
  .el-input__inner {
    text-align: center;
    height: 20px;
    width: 80px;
  }
}
</style>
<style lang="scss" scoped>
.post {
  .current-type {
    height: 45px;
    line-height: 45px;
    // width: calc(100% -200px);
    // margin-right: 200px;
    border-bottom: 1px solid #eee;
  }
  .top-search {
    width: 100%;
    padding: 10px 10px 0;
  }
  .search {
    padding: 0 10px;
    // outline: 1px solid red;
  }
}
</style>
