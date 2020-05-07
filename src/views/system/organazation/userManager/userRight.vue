<template>
  <div class="user-right-box">
    <div class="current-type clearfix">
      <div class="fl">
        <i class="el-icon-user"></i>
        <span>用户管理</span>
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
        <el-button type="primary" icon="el-icon-plus" size="mini">
          新增
        </el-button>
        <el-dropdown size="mini" @click="showImportAndExport">
          <el-button type="primary" size="mini">
            更多
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" size="mini">
            <el-dropdown-item>导入</el-dropdown-item>
            <el-dropdown-item>导出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div>
      <InputFilter
        v-show="btnText == '隐藏'"
        :form-item="formInline"
        @searchIt="searchIt"
        @clearform="clearform"
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
          <el-button size="mini" @click="getMore"> 更多 </el-button>
        </template>
      </InputFilter>
      <InputFilter
        v-show="showMore"
        :form-item="moreFormItem"
        @filterPanel="showFilterPanel"
      />
    </div>
    <TableTree
      :table-head="tableHead"
      :table-data="tableData"
      :column-widths="columnWidths"
      :slot-columns="slotColumns"
      :table-fit="tableFit"
      style="margin-top: 10px;"
    >
      <!-- <template slot="chechbox">
        <el-table-column type="selection" width="40"></el-table-column>
      </template> -->
      <template slot="loginAccount" slot-scope="scope">
        <span class="td-color" @click="loginAccount(scope.row)">{{
          scope.row.loginAccount
        }}</span>
      </template>
      <template slot="userAlias" slot-scope="scope">
        <span class="td-color">{{ scope.row.userAlias }}</span>
      </template>
      <template slot="vehicle_license" slot-scope="scope">
        <span class="td-color">{{ scope.row.vehicle_license }}</span>
      </template>
      <template slot="oprate">
        <el-table-column fixed="right" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="editHandleClick(scope.row)"
            >
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button type="text" size="small" @click="stopUse(scope.row)">
              <i class="el-icon-video-pause"></i>
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="deleteHandleClick(scope.row)"
            >
              <i class="el-icon-delete"></i>
            </el-button>

            <el-popover placement="right" trigger="click">
              <div>
                <el-button
                  type="text"
                  size="small"
                  @click="assignRole(scope.row)"
                >
                  分配角色
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
                  @click="resetPassword(scope.row)"
                >
                  重置密码
                  <i class="el-icon-coin"></i>
                </el-button>
              </div>
              <el-button
                slot="reference"
                type="text"
                size="small"
                @click="moreHandleClick(scope.row)"
              >
                <i v-show="changeArrowDirection" class="el-icon-arrow-down"></i>
                <i v-show="!changeArrowDirection" class="el-icon-arrow-up"></i>
              </el-button>
            </el-popover>
            <!-- <el-button
              type="text"
              size="small"
              @click="moreHandleClick(scope.row)"
            >
              <i v-show="changeArrowDirection" class="el-icon-arrow-down"></i>
              <i v-show="!changeArrowDirection" class="el-icon-arrow-up"></i>
            </el-button> -->
          </template>
        </el-table-column>
      </template>
    </TableTree>
    <!-- 筛选搜索对话框 -->
    <DailogFrame
      :dialog-visible="showDailog"
      :title-name="titleName"
      @closeDialog="closeDialog"
    ></DailogFrame>
    <!-- table行点击对话框 -->
    <userEditPanel ref="userEditPanel"></userEditPanel>
    <AssignRole ref="assignRolePanel"></AssignRole>
    <DataRights ref="dataRightsPanel"></DataRights>
  </div>
</template>
<script>
import ColumnBar from "@/components/commonColumn";
import TableTree from "@/components/tableTree";
import ChooseTreePanel from "@/components/pageParts/chooseTreePanel";
import InputFilter from "@/components/inputFliter";
import DailogFrame from "@/components/dailogPanel/frame";
import UserEditPanel from "./userEditPanel";
import AssignRole from "./assignRole";
import DataRights from "./dataRights";
// import { returnReg } from "@/utils/validate"; /* 表单正则验证 */
import { clearFilterVal, getInputVal } from "@/utils/pubFunc";
export default {
  name: "UserRight",
  components: {
    TableTree,
    InputFilter,
    DailogFrame,
    ChooseTreePanel,
    UserEditPanel,
    AssignRole,
    DataRights
  },
  data() {
    return {
      btnText: "查询",
      changeArrowDirection: true,
      showDailog: false,

      titleName: "",
      formInline: [
        {
          type: "input",
          label: "账号",
          key: "acount",
          value: ""
        },
        {
          type: "input",
          label: "昵称",
          key: "alias",
          value: ""
        },
        {
          type: "input",
          label: "姓名",
          key: "name",
          value: ""
        },
        {
          type: "input",
          label: "手机",
          key: "phone",

          value: ""
        },
        {
          type: "select",
          label: "状态",
          options: [
            {
              label: "测试1",
              value: "test1"
            },
            {
              label: "测试2",
              value: "test2"
            }
          ],
          key: "status",
          value: ""
        }
      ],
      showMore: false,
      moreFormItem: [
        {
          type: "searchInput",
          label: "机构",
          key: "institution",
          value: ""
        },
        {
          type: "searchInput",
          label: "公司",
          key: "company",
          value: ""
        },
        {
          type: "input",
          label: "邮箱",
          key: "email",
          value: ""
        },
        {
          type: "input",
          label: "岗位",
          key: "jobs",
          value: ""
        },
        {
          type: "input",
          label: "电话",
          key: "phone",
          width: "120",
          value: ""
        }
      ],
      tableFit: true,
      columnWidths: {
        loginAccount: 130,
        number: 130,
        format: 130
      },
      slotColumns: ["loginAccount", "userAlias", "vehicle_license"],
      tableHead: {
        loginAccount: "登录账号",
        userAlias: "用户昵称",
        number: "员工姓名",
        format: "归属机构",
        department: "归属公司",
        brand: "电子邮箱",
        card_time: "手机号",
        vehicle_license: "办公电话",
        maintenance: "更新时间",
        status: "状态"
      },
      tableData: [
        {
          id: 1,
          loginAccount: "登录账号",
          userAlias: "用户昵称",
          number: "员工姓名",
          format: "归属机构",
          department: "归属公司",
          brand: "电子邮箱",
          card_time: "手机号",
          vehicle_license: "办公电话",
          maintenance: "更新时间",
          status: "状态",
          children: [
            {
              id: 11,
              loginAccount: "登录账号",
              userAlias: "用户昵称",
              number: "员工姓名",
              format: "归属机构",
              department: "归属公司",
              brand: "电子邮箱",
              card_time: "手机号",
              vehicle_license: "办公电话",
              maintenance: "更新时间",
              status: "状态"
            },
            {
              id: 12,
              loginAccount: "登录账号",
              userAlias: "用户昵称",
              number: "员工姓名",
              format: "归属机构",
              department: "归属公司",
              brand: "电子邮箱",
              card_time: "手机号",
              vehicle_license: "办公电话",
              maintenance: "更新时间",
              status: "状态"
            }
          ]
        },
        {
          id: 2,
          loginAccount: "登录账号",
          userAlias: "用户昵称",
          number: "员工姓名",
          format: "归属机构",
          department: "归属公司",
          brand: "电子邮箱",
          card_time: "手机号",
          vehicle_license: "办公电话",
          maintenance: "更新时间",
          status: "状态"
        }
      ]
    };
  },
  methods: {
    showOrHidden() {
      this.btnText = this.btnText === "查询" ? "隐藏" : "查询";
    },
    /* 获取填入输入框的值  */
    searchBtn() {
      // const temp = this.formInline.concat(this.moreFormItem);
      const valObj = getInputVal(this.formInline);
      console.log(valObj);
    },
    /* 清除输入框内的值 */
    resetForm() {
      clearFilterVal(this.formInline);
    },
    /* 切换显示更多条件筛选 */
    getMore() {
      this.showMore = !this.showMore;
    },
    // 显示对话框选择
    showFilterPanel(item) {
      this.showDailog = true;
      this.titleName = `${item.label}选择`;
    },
    // 关闭对话框选择
    closeDialog() {
      this.showDailog = false;
    },
    searchIt(val) {
      // console.log(265, val);
      this.searchVal = val;
      this.pageDetail.page = 1;
      this.initPage(this.pageDetail, this.searchVal);
    },
    clearform() {
      for (let i = 0, len = this.ruleForm.length; i < len; i++) {
        this.ruleForm[i].value = "";
      }
      this.pageDetail.page = 1;
      this.initPage(this.pageDetail, this.searchVal);
    },
    /* 编辑表格 */
    loginAccount(row) {
      this.$refs.userEditPanel.show(row);
      console.log(11, row);
    },
    showImportAndExport() {
      alert("button click");
    },
    stopUse() {
      this.$confirm("确认要停用该用户吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editHandleClick(row) {
      this.$refs.userEditPanel.show(row);
    },
    deleteHandleClick(row) {
      this.$confirm("确认要删除该用户吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    assignRole(row) {
      this.$refs.assignRolePanel.init(row);
    },
    dataRights(row) {
      this.$refs.dataRightsPanel.init(row);
    },
    resetPassword(row) {
      this.$confirm("确认要将该用户密码重置到初始状态吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    moreHandleClick(row) {
      this.changeArrowDirection = !this.changeArrowDirection;
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
.user-right-box {
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
