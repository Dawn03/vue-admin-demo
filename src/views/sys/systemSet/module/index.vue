<template>
  <div class="post  wrapper_content">
    <TopBtns
      :btn-arr="btnArr"
      :left-mg="leftMg"
      @showSearch="showSearch"
      @handlerName="handlerName"
    ></TopBtns>
    <div>
      <InputFilter
        v-show="showSearchVal"
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
    >
      <template slot="indx">
        <el-table-column
          fixed
          label="序号"
          type="index"
          align="center"
          width="50"
        ></el-table-column>
      </template>

      <template slot="moduleName" slot-scope="scope">
        <span class="td-color tl" @click="menuEditAdd(scope.row, '编辑')">
          {{ scope.row.moduleName }}
        </span>
      </template>
      <template slot="isLoader" slot-scope="scope">
        <span v-if="scope.row.isLoader">
          正常
          <!-- {{ swichText("sys_status", scope.row.status, "未安装") }} -->
        </span>
        <span v-else style="color:#f00;">
          未安装
          <!-- {{ swichText("sys_status", scope.row.status, "未安装") }} -->
        </span>
      </template>
      <template slot="operate">
        <el-table-column fixed="right" label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="menuEditAdd(scope.row, '编辑')"
            >
              <i class="el-icon-edit" title="编辑菜单"></i>
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="menuEditAdd(scope.row, '新增下级')"
            >
              <i class="fa fa-plus-square" title="停用启用"></i>
            </el-button>
            <el-button type="text" size="small" @click="deleteMenu(scope.row)">
              <i style="color:red;" class="el-icon-delete" title="删除菜单"></i>
            </el-button>
          </template>
        </el-table-column>
      </template>
    </TableTree>
    <!-- <menuEdit ref="secAdminEditPanel" @initPage="initPage"></menuEdit> -->
  </div>
</template>
<script>
import TableTree from "@/components/tableTree";
import InputFilter from "@/components/inputFliter";
import menuEdit from "./menuEdit";
import TopBtns from "@/components/componentBtns/topBtns/baseBtn";
import { clearFilterVal, getInputVal, dictTypeMap } from "@/utils/pubFunc";
import { sysApi } from "../../../../api/systemSet";
import { returnReg } from "@/utils/validate";
export default {
  name: "Menu",
  inject: ["reload"],
  components: {
    TableTree,
    InputFilter,
    menuEdit,
    TopBtns
  },
  data() {
    return {
      showSearchVal: false,
      leftMg: {
        icon: "fa icon-grid f14",
        text: "模块管理"
      },
      btnArr: [
        {
          handlerName: "View",
          btnText: "查询",
          class: "fa fa-search"
        },

        {
          handlerName: "AddNew",
          btnText: "新增",
          class: "fa fa-plus"
        }
      ],

      stopOrStart: null,
      sortVal: {},
      TableTreeData: {
        ids: [],
        sorts: []
      },
      formInline: [
        {
          type: "input",
          label: "模块名称",
          key: "menuName",
          value: ""
        },
        {
          type: "input",
          label: "主类全名",
          key: "menuName",
          value: ""
        },
        {
          type: "select",
          label: "状态",
          options: this.getStatusOption("sys_search_status"),
          key: "status",
          value: ""
        }
      ],
      columnTextPostion: {
        menuName: "left"
      },
      columnWidths: {
        description: 400
      },
      slotColumns: ["moduleName", "isLoader"],
      tableHead: {
        moduleName: "模块名称",
        moduleCode: "模块编码",
        description: "模块描述",
        currentVersion: "版本",
        isLoader: "状态" // 1 菜单 2权限
      },
      tableData: [],
      pageNation: {
        pageSize: 20,
        pageNo: 1,
        total: 0
      },
      tableFit: true
    };
  },
  mounted() {
    this.init(this.pageNation);
  },
  methods: {
    showSearch(val) {
      this.showSearchVal = val;
    },
    handlerName(funcName) {
      this[funcName]();
    },
    initPage() {
      this.reload();
    },
    init(param) {
      // console.log(2222, param);
      sysApi.getModule(param).then(res => {
        this.tableData = res.list;
        this.pageNation.total = res.count;
      });
    },
    Sort() {
      const obj = {
        ids: this.TableTreeData.ids, //, JSON.stringify(this.sortVal.id),
        sorts: this.TableTreeData.sorts //, JSON.stringify(this.sortVal.treeSort + "")
      };
      sysApi.updateTreeSort(obj).then(res => {
        if (res.result === "true") {
          this.$message.success(res.message);
          this.reload();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    /* 列表文本转义 */
    swichText(type, val, other) {
      return dictTypeMap(type, val, other);
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
    /* 获取填入输入框的值  */
    searchBtn(data = {}) {
      // menuNameOrig 和 formInline 中的键名不一样 单独写
      const obj = {
        pageSize: this.pageNation.pageSize,
        pageNo: 1,
        sysCode: "default",
        moduleCodes: "",
        menuNameOrig: this.formInline[0].value
      };
      console.log(297, this.formInline);
      // const valObj = Object.assign(obj, getInputVal(this.formInline));
      this.init(obj);
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
    /* 编辑/新增下级表格 */
    menuEditAdd(row, type) {
      this.$refs.secAdminEditPanel.show(row, type);
    },
    AddNew() {
      this.$refs.secAdminEditPanel.show({}, "新增");
    },

    deleteMenu(row) {
      this.$alertMsgBox("确认要删除该菜单及所有子菜单吗？", "信息")
        .then(() => {
          sysApi
            .deleteMenu({
              menuCode: row.menuCode
            })
            .then(res => {
              if (res.result === "true") {
                this.init(this.params);
                this.$message.success(res.message);
              } else {
                this.$message.waring(res.message);
              }
            });
        })
        .catch(() => {
          this.$message.info("取消");
        });
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
