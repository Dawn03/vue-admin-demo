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
          @click="addNew({}, '新增机构')"
        >
          新增
        </el-button>
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
      <template slot="systemRole" slot-scope="scope">
        <span>
          {{ scope.row.systemRole == "1" ? "是" : "否" }}
        </span>
      </template>
      <template slot="status" slot-scope="scope">
        <el-button size="mini" type="success" round>{{
          scope.row.status
        }}</el-button>
      </template>

      <template slot="oprate">
        <el-table-column fixed="right" label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="roleEdit(scope.row, '编辑角色')"
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
              <el-button
                slot="reference"
                type="text"
                size="small"
                @click="moreHandleClick(scope.row)"
              >
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
    <!-- 筛选搜索对话框 -->
    <DailogFrame
      :dialog-visible="showDailog"
      :title-name="titleName"
      @closeDialog="closeDialog"
    ></DailogFrame>
    <!-- table行点击对话框 -->
    <RoleEditPanel ref="RoleEditPanel"></RoleEditPanel>
    <AccreditMenu ref="accreditMenuPanel"></AccreditMenu>
  </div>
</template>
<script>
import TableTree from "@/components/tableTree";
import ChooseTreePanel from "@/components/pageParts/chooseTreePanel";
import InputFilter from "@/components/inputFliter";
import DailogFrame from "@/components/dailogPanel/frame";
import RoleEditPanel from "./roleEditPanel";
import AccreditMenu from "./accreditMune";
// import { returnReg } from "@/utils/validate"; /* 表单正则验证 */
import { clearFilterVal, getInputVal } from "@/utils/pubFunc";
export default {
  name: "RoleTable",
  components: {
    TableTree,
    InputFilter,
    DailogFrame,
    ChooseTreePanel,
    RoleEditPanel,
    AccreditMenu
  },
  data() {
    return {
      changeArrowDirection: false,
      currentId: null,
      btnText: "查询",
      showDailog: false,
      titleName: "",
      formInline: [
        {
          type: "input",
          label: "角色名称",
          key: "acount",
          value: "",
          width: 120
        },
        {
          type: "input",
          label: "角色编码",
          key: "alias",
          value: "",
          width: 120
        },
        {
          type: "select",
          label: "用户类型",
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
          width: 120,
          value: ""
        },
        {
          type: "select",
          label: "系统角色",
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
          value: "",
          width: 120
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
      slotColumns: ["roleName", "systemRole", "status"],
      tableHead: {
        roleName: "角色名称",
        roleCode: "角色编码",
        orderNumber: "排序号",
        systemRole: "系统角色",
        userType: "用户类型",
        dataRange: "数据范围",
        bussinessRange: "业务范围",
        updataTime: "更新时间",
        remarkMessage: "备注信息",
        status: "状态"
      },
      tableData: [
        {
          id: 1,
          roleName: "部门经理",
          roleCode: "dept",
          orderNumber: "40",
          systemRole: "1",
          userType: "员工",
          dataRange: "未设置",
          bussinessRange: "未设置",
          updataTime: "2019-07-08 ",
          remarkMessage: "备注信息",
          status: "正常"
        },
        {
          id: 2,
          roleName: "普通员工",
          roleCode: "user",
          orderNumber: "50",
          systemRole: "2",
          userType: "未设置",
          dataRange: "未设置",
          bussinessRange: "未设置",
          updataTime: "2019-07-09 ",
          remarkMessage: "备注信息",
          status: "正常"
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

    addNew(row, type) {
      console.log(row, type);
      this.$refs.RoleEditPanel.show(row, type);
    },
    moreHandleClick(row) {
      this.currentId = row.id;
      this.changeArrowDirection = !this.changeArrowDirection;
    },
    openDetails(row) {},
    /* 授权菜单 */
    accreditMenu(row) {
      this.$refs.accreditMenuPanel.init(row);
    },
    dataRights(row) {
      this.$refs.dataRightsPanel.init(row);
    },
    allotUser(row) {
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
    roleEdit(row, type) {
      console.log(321, row, type);
      this.$refs.RoleEditPanel.show(row, type);
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
