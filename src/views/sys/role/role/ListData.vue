<template>
  <div class="role-table">
    <div class="current-type clearfix">
      <div class="fl">
        <i class="el-icon-user"></i>
        <span>角色管理</span>
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
          @click="addNew({}, '新增角色')"
        >
          新增
        </el-button>
      </div>
    </div>
    <div>
      <InputFilter v-show="btnText == '隐藏'" :form-item="formInline">
        <template slot="btnGroups">
          <el-button type="primary" size="mini" @click="searchBtn">
            查询
          </el-button>
          <el-button size="mini" @click="resetForm"> 重置 </el-button>
        </template>
      </InputFilter>
    </div>
    <TableTree
      ref="theTable"
      :table-head="tableHead"
      :table-data="tableData"
      :column-widths="columnWidths"
      :slot-columns="slotColumns"
      :table-fit="tableFit"
      style="margin-top: 10px;"
    >
      <template slot="roleName" slot-scope="scope">
        <span class="td-color" @click="roleEdit(scope.row, '编辑角色')">
          {{ scope.row.roleName }}
        </span>
      </template>
      <template slot="isSys" slot-scope="scope">
        <span>
          {{ scope.row.isSys == "1" ? "是" : "否" }}
        </span>
      </template>
      <template slot="statusText" slot-scope="scope">
        <el-button size="mini" type="success" round>
          {{ scope.row.statusText }}
        </el-button>
      </template>

      <template slot="operate">
        <el-table-column fixed="right" label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="roleEdit(scope.row, '编辑角色')"
            >
              <i class="el-icon-edit" title="编辑"></i>
            </el-button>
            <el-button type="text" size="small" @click="stopUse(scope.row)">
              <i class="el-icon-video-pause" title="停用启用"></i>
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="deleteHandleClick(scope.row)"
            >
              <i class="el-icon-delete" title="删除"></i>
            </el-button>
            <el-popover
              placement="right"
              trigger="hover"
              @show="moreHandleClick(scope.row)"
            >
              <div>
                <el-button
                  type="text"
                  size="small"
                  @click="accreditMenu(scope.row)"
                >
                  授权菜单
                  <i class="el-icon-user-solid"></i>
                </el-button>
              </div>
              <div>
                <el-button
                  type="text"
                  size="small"
                  @click="dataRights(scope.row)"
                >
                  数据权限
                  <i class="el-icon-circle-check"></i>
                </el-button>
              </div>
              <div>
                <el-button
                  type="text"
                  size="small"
                  @click="allotUser(scope.row)"
                >
                  分配用户
                  <i class="el-icon-coin"></i>
                </el-button>
              </div>
              <el-button slot="reference" type="text" size="small">
                <i
                  :class="[
                    changeArrowDirection && currentId == scope.row.id
                      ? 'el-icon-d-arrow-left'
                      : 'el-icon-d-arrow-right'
                  ]"
                ></i>
              </el-button>
            </el-popover>
          </template>
        </el-table-column>
      </template>
    </TableTree>
    <Pagination
      :total="pageNation.total"
      :page-size="pageNation.pageSize"
      @currentChange="currentChange"
    ></Pagination>
    <!-- table行点击对话框 -->
    <RoleEditPanel
      ref="RoleEditPanel"
      :user-status-options="formInline[2].options"
      :role-type="roleType"
      @initPage="initPage"
    ></RoleEditPanel>
    <AccreditMenu ref="accreditMenuPanel"></AccreditMenu>
    <DataRights ref="dataRightsPanel"></DataRights>
    <AllotUser ref="allotUserPanel"></AllotUser>
  </div>
</template>
<script>
import TableTree from "@/components/tableTree";
import Pagination from "@/components/pagination";
import InputFilter from "@/components/inputFliter";
import RoleEditPanel from "./roleEditPanel";
import AccreditMenu from "./accreditMune";
import DataRights from "./dataRights";
import AllotUser from "./allotUser";
// import { returnReg } from "@/utils/validate"; /* 表单正则验证 */
import { clearFilterVal, getInputVal } from "@/utils/pubFunc";
import { roleApi } from "@/api/role";
import { pubApi } from "@/api/public_request";
import { statusMap } from "@/utils/pubFunc";
export default {
  name: "RoleTable",
  components: {
    TableTree,
    InputFilter,
    Pagination,
    RoleEditPanel,
    AccreditMenu,
    DataRights,
    AllotUser
  },
  data() {
    return {
      changeArrowDirection: false,
      currentId: null,
      btnText: "查询",
      total: "",
      pageNation: {
        total: null,
        pageNo: 1,
        pageSize: 2
      },
      formInline: [
        {
          type: "input",
          label: "角色名称",
          key: "roleName_like",
          value: "",
          width: 120
        },
        {
          type: "input",
          label: "角色编码",
          key: "roleCode_like",
          value: "",
          width: 120
        },
        {
          type: "select",
          label: "用户类型",
          options: [],
          key: "userType",
          width: 120,
          value: ""
        },
        {
          type: "select",
          label: "系统角色",
          options: [],
          key: "isSys",
          value: "",
          width: 120
        },
        {
          type: "select",
          label: "状态",
          options: [],
          key: "status",
          width: 120,
          value: ""
        }
      ],
      showMore: false,
      tableFit: true,
      columnWidths: {
        institutionName: 130,
        number: 130,
        format: 130
      },
      slotColumns: ["roleName", "isSys", "statusText"],
      tableHead: {
        roleName: "角色名称",
        roleCode: "角色编码",
        roleSort: "排序号",
        isSys: "系统角色", // 暂无字段
        userType: "用户类型", // 暂无字段
        dataRange: "数据范围", // 暂无字段
        bussinessRange: "业务范围", // 暂无字段
        updateDate: "更新时间",
        remarks: "备注信息",
        statusText: "状态"
      },
      tableData: [],
      statusMapKey: [],
      roleType: []
    };
  },
  mounted() {
    /* 获取用户类型 */
    this.$nextTick(() => {
      this.dictTypeFunc({
        dictType: "sys_user_type",
        status: ""
      });

      /* 获取是否是系统角色  所有涉及是或否 都用该字段查询 */
      this.dictTypeFunc({
        dictType: "sys_yes_no",
        status: ""
      });
      /* 获取 角色分类*/
      this.dictTypeFunc({
        dictType: "sys_role_type",
        status: ""
      });
      this.init({
        pageSize: this.pageNation.pageSize,
        pageNo: this.pageNation.pageNo
      });
    });
  },
  methods: {
    async init(obj) {
      /* 获取角色状态 */
      await this.dictTypeFunc({
        dictType: "sys_search_status",
        status: ""
      });
      roleApi.getRoleManageList(obj).then(res => {
        const temp = JSON.parse(JSON.stringify(res.list));
        const obj = {};
        for (let i = 0, len = temp.length; i < len; i++) {
          obj[temp[i].value] = temp[i].label;
        }
        this.tableData = statusMap(res.list, this.statusMapKey);
        this.pageNation.total = res.count;
      });
    },
    dictTypeFunc(param) {
      pubApi.dictTypeFunc(param).then(res => {
        const userOptions = [];
        for (let i = 0, len = res.length; i < len; i++) {
          if (res[i].status === "0") {
            userOptions.push({
              label: res[i].dictLabel,
              value: res[i].dictValue
            });
          }
        }
        if (param.dictType === "sys_user_type") {
          this.formInline[2].options = userOptions;
        }
        if (param.dictType === "sys_yes_no") {
          this.formInline[3].options = userOptions;
        }
        if (param.dictType === "sys_search_status") {
          this.formInline[4].options = userOptions;
          const obj = {};
          for (let i = 0, len = userOptions.length; i < len; i++) {
            obj[userOptions[i].value] = userOptions[i].label;
          }
          this.statusMapKey = obj;
          // console.log(278, this.statusMapKey);
        }
        if (param.dictType === "sys_role_type") {
          this.roleType = userOptions;
        }
      });
    },
    showOrHidden() {
      this.btnText = this.btnText === "查询" ? "隐藏" : "查询";
    },
    /* 获取填入输入框的值  */
    searchBtn() {
      const valObj = Object.assign(getInputVal(this.formInline), {
        pageSize: this.pageNation.pageSize,
        pageNo: 1
      });
      this.init(valObj);
    },
    /* 清除输入框内的值 */
    resetForm() {
      this.init({
        pageSize: this.pageNation.pageSize,
        pageNo: 1
      });
      clearFilterVal(this.formInline);
    },
    addNew(row, type) {
      // console.log(row, type);
      this.$refs.RoleEditPanel.show(row, type);
    },
    moreHandleClick(row) {
      this.currentId = row.id;
      this.changeArrowDirection = !this.changeArrowDirection;
    },
    /* 授权菜单 */
    accreditMenu(row) {
      this.$refs.accreditMenuPanel.init(row);
    },
    dataRights(row) {
      this.$refs.dataRightsPanel.init(row);
    },
    allotUser(row) {
      this.$refs.allotUserPanel.init(row);
    },

    /* 编辑表格 */
    roleEdit(row, type) {
      // console.log(321, row, type);
      this.$refs.RoleEditPanel.show(row, type);
    },

    stopUse() {
      this.$alertMsgBox("确认要停用该用户吗", "信息")
        .then(() => {
          this.$message.success("成功");
        })
        .catch(() => {
          this.$message.info("取消");
        });
    },
    deleteHandleClick(row) {
      this.$alertMsgBox("确认要删除该用户吗", "信息")
        .then(() => {
          roleApi
            .deleteRole({
              roleCode: row.roleCode
            })
            .then(res => {
              // console.log(357, res);
            });
          this.$message.success("成功");
        })
        .catch(() => {
          this.$message.info("取消");
        });
    },
    currentChange(val) {
      const obj = {
        pageSize: this.pageNation.pageSize,
        pageNo: val
      };
      this.init(obj);
    },
    initPage() {
      this.init({
        pageSize: this.pageSize,
        pageNo: this.pageNo
      });
    }
  }
};
</script>
<style lang="scss">
.el-popover {
  min-width: 100px;
}
</style>
<style lang="scss" scoped>
.role-table {
  margin: 0 10px;
  .current-type {
    height: 45px;
    line-height: 45px;
    // width: calc(100% -200px);
    // margin-right: 200px;
    border-bottom: 1px solid #eee;
  }
  .td-color {
    color: #1890ff;
    cursor: pointer;
  }
  .table-witth {
  }
}
</style>
