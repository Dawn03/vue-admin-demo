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
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="editHandleClick({}, '新增')"
        >
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
        @statusValChange="statusValChange"
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
        @statusValChange="statusValChange"
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
      <template slot="loginCode" slot-scope="scope">
        <span class="td-color" @click="editHandleClick(scope.row, '编辑')">{{
          scope.row.loginCode
        }}</span>
      </template>
      <template slot="refName" slot-scope="scope">
        <span>{{ scope.row.refName }}</span>
      </template>
      <template slot="employee.empName" slot-scope="scope">
        {{ scope.row.employee.empName }}
        <!-- <span v-for="(value, key) in scope.row.employee" :key="key">
          <span v-if="key == 'empName'"> {{ value }} </span>
        </span> -->
      </template>
      <template slot="employee.company.companyName" slot-scope="scope">
        {{ scope.row.employee.company.companyName }}
        <!-- <span v-for="(value, key) in scope.row.employee.company" :key="key">
          <span v-if="key == 'companyName'"> {{ value }} </span>
        </span> -->
      </template>
      <template slot="employee.office.officeName" slot-scope="scope">
        <span v-for="(value, key) in scope.row.employee.office" :key="key">
          <span v-if="key == 'officeName'"> {{ value }} </span>
        </span>
      </template>
      <template slot="statusText" slot-scope="scope">
        <el-button round type="success" size="mini">
          {{ scope.row.statusText }}
        </el-button>
      </template>
      <template slot="operate">
        <el-table-column fixed="right" label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="editHandleClick(scope.row, '编辑')"
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

            <el-popover
              placement="right"
              trigger="hover"
              @click="moreHandleClick(scope.row)"
            >
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
    <userEditPanel ref="userEditPanel"></userEditPanel>
    <AssignRole ref="assignRolePanel"></AssignRole>
    <DataRights ref="dataRightsPanel"></DataRights>
    <InAndCompany
      ref="inAndCompanyPanel"
      @getClickNode="getClickNode"
    ></InAndCompany>
  </div>
</template>
<script>
import TableTree from "@/components/tableTree";
import InputFilter from "@/components/inputFliter";
import Pagination from "@/components/pagination";
import UserEditPanel from "./userEditPanel";
import AssignRole from "./assignRole";
import DataRights from "./dataRights";
import InAndCompany from "./insAndcompanyPanel";

// import { returnReg } from "@/utils/validate"; /* 表单正则验证 */
import { clearFilterVal, getInputVal, toTreeData } from "@/utils/pubFunc";
import { orgApi } from "@/api/organization";
import { statusMap } from "@/utils/pubFunc";
// import { returnReg } from "../../../../utils/validate";
export default {
  name: "UserRight",
  components: {
    TableTree,
    InputFilter,
    UserEditPanel,
    AssignRole,
    DataRights,
    Pagination,
    InAndCompany
  },
  props: {
    instMenuData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      btnText: "查询",
      changeArrowDirection: false,
      currentId: null,
      titleName: "",
      formInline: [
        {
          type: "input",
          label: "账号",
          key: "loginCode",
          value: ""
        },
        {
          type: "input",
          label: "昵称",
          key: "userName",
          value: ""
        },
        {
          type: "input",
          label: "姓名",
          key: "refName",
          value: ""
        },
        {
          type: "input",
          label: "手机",
          key: "mobile",
          value: ""
        },
        {
          type: "select",
          label: "状态",
          options: [
            {
              label: "正常",
              value: "0"
            },
            {
              label: "停用",
              value: "2"
            },
            {
              label: "冻结",
              value: "3"
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
          type: "select",
          label: "岗位",
          key: "employee.postCode",
          options: [
            {
              label: "总经理",
              value: "ceo"
            },
            {
              label: "财务经理",
              value: "cfo"
            },
            {
              label: "人力经理",
              value: "hrm"
            }
          ],
          value: ""
        },
        {
          type: "input",
          label: "电话",
          key: "phone",
          value: ""
        }
      ],
      tableFit: true,
      columnWidths: {
        updateDate: 130
        // email: 170
      },
      slotColumns: [
        "loginCode",
        "refName",
        "employee.empName",
        "employee.company.companyName",
        "employee.office.officeName",
        "statusText"
      ],
      tableHead: {
        loginCode: "登录账号",
        userName: "用户昵称",
        "employee.empName": "员工姓名",
        "employee.company.companyName": "归属机构",
        "employee.office.officeName": "归属公司",
        email: "电子邮箱",
        mobile: "手机号",
        vehicle_license: "办公电话",
        updateDate: "更新时间",
        statusText: "状态"
      },
      tableData: [
        // {
        //   id: 1,
        //   loginCode: "",
        //   refName: "",
        //   employe: {
        //     empName: ""
        //   },
        //   employee: {
        //     company: {
        //       companyName: ""
        //     },
        //     office: {
        //       officeName: ""
        //     }
        //   },
        //   email: "",
        //   mobile: "",
        //   vehicle_license: "",
        //   updateDate: "",
        //   statusText: ""
        // }
      ],
      statusOption: {},
      pageNation: {
        total: 0,
        pageSize: 20,
        pageNo: 1,
        ctrlPermi: 2
      },
      searchVal: {
        loginCode: null,
        refName: null,
        mobile: null,
        status: null,
        "employee.office.officeName": null, // 企管部
        "employee.office.officeCode": null, // SDJN01
        "employee.company.companyName": null, // 济南公司
        "employee.company.companyCode": null, // SDJN
        email: null, // 邮箱
        "employee.postCode": null, // ceo
        phone: null, // 08277648513
        orderBy: null //
      }
    };
  },
  mounted() {
    const obj = {
      pageSize: this.searchVal.pageSize,
      pageNo: this.searchVal.pageNo
    };
    this.init(obj);
    // console.log(397, '刚刚启动时进入页面')
  },
  methods: {
    init(obj) {
      orgApi
        .getUserList(obj)
        .then(response => {
          const obj = {
            "0": "正常",
            "2": "停用",
            "3": "冻结"
          };
          this.pageNation.total = response.count;
          this.tableData = statusMap(response.list, obj);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    showOrHidden() {
      this.btnText = this.btnText === "查询" ? "隐藏" : "查询";
    },
    // select
    statusValChange(val, item) {
      const searchObj = {
        pageSize: this.pageNation.pageSize,
        pageNo: this.pageNation.pageNo
      };
      if (item.key === "status") {
        searchObj.status = val;
        this.init(searchObj);
      } else {
        this.searchVal[item.key] = val;
      }
    },
    /* 获取填入输入框的值  */
    searchBtn(data = {}) {
      this.searchVal["employee.office.officeName"] = data.label;
      this.searchVal["employee.office.officeCode"] = data.id;
      this.searchVal = Object.assign(
        this.searchVal,
        this.pageNation,
        getInputVal(this.formInline),
        getInputVal(this.moreFormItem)
      );
      this.init(this.searchVal);
    },
    /* 清除输入框内的值 */
    resetForm() {
      clearFilterVal(this.formInline);
      clearFilterVal(this.moreFormItem);
      this.searchVal = {};
      const obj = {
        pageSize: this.pageNation.pageSize,
        pageNo: 1
      };
      this.init(obj);
      console.log(this.searchVal);
    },
    /* 切换显示更多条件筛选 */
    getMore() {
      this.showMore = !this.showMore;
    },
    // 显示带搜索图标的对话框
    showFilterPanel(item) {
      this.titleName = `${item.label}选择`;
      if (item.key === "institution") {
        this.$refs.inAndCompanyPanel.show(item, this.instMenuData);
      } else {
        orgApi.getCompanyMenuTree({ ctrlPermi: 2 }).then(res => {
          const attributes = {
            id: "id",
            parentId: "pId",
            label: "name",
            rootId: "0"
          };
          const treeData = toTreeData(res, attributes);
          this.$refs.inAndCompanyPanel.show(item, treeData);
        });
      }
    },
    getClickNode(val, typeVal) {
      console.log("typeVal.key", val);
      if (typeVal.key === "institution") {
        this.moreFormItem[0].value = val.label;
        this.searchVal["employee.office.officeCode"] = val.id;
        this.searchVal["employee.office.officeName"] = val.label;
      } else {
        this.moreFormItem[1].value = val.label;
        this.searchVal["employee.company.companyCode"] = val.id;
        this.searchVal["employee.company.companyName"] = val.label;
      }
    },
    /* 编辑表格 */
    editHandleClick(row, type) {
      this.$refs.userEditPanel.show(row, type);
      console.log(11, row);
    },
    showImportAndExport() {
      alert("button click");
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
          this.$message.success("成功");
        })
        .catch(() => {
          this.$message.info("取消");
        });
    },
    assignRole(row) {
      this.$refs.assignRolePanel.init(row);
    },
    dataRights(row) {
      this.$refs.dataRightsPanel.init(row);
    },
    resetPassword(row) {
      this.$alertMsgBox("确认要将该用户密码重置到初始状态吗", "信息")
        .then(() => {
          this.$message.success("成功");
        })
        .catch(() => {
          this.$message.info("取消");
        });
    },
    moreHandleClick(row) {
      this.currentId = row.id;
      this.changeArrowDirection = !this.changeArrowDirection;
    },
    currentChange(val) {
      this.searchVal.pageNo = val;
      console.log(23323, val);
      const obj = {
        pageSize: this.pageNation.pageSize,
        pageNo: this.pageNation.pageNo
      };
      this.init(obj);
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
