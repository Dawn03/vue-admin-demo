<template>
  <div class="corp-admin">
    <div class="current-type clearfix">
      <div class="fl">
        <i class="el-icon-user"></i>
        <span>系统管理员</span>
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
          新增租户管理
        </el-button>
      </div>
    </div>

    <div>
      <InputFilter
        v-show="btnText == '隐藏'"
        :form-item="formInline"
        @statusValChange="statusValChange"
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
      :slot-columns="slotColumns"
      :table-fit="tableFit"
      style="margin-top: 10px;"
    >
      <template slot="loginCode" slot-scope="scope">
        <span class="td-color" @click="editHandleClick(scope.row, '编辑')">{{
          scope.row.loginCode
        }}</span>
      </template>
      <template slot="userWeight" slot-scope="scope">
        <span class="td-color">{{ scope.row.userWeight }}</span>
      </template>

      <template slot="status" slot-scope="scope">
        <span :style="[{ color: scope.row.status === '0' ? '#000' : '#f00' }]">
          {{ swichText("sys_search_status", scope.row.status, "未设置") }}
        </span>
      </template>
      <template slot="operate">
        <el-table-column fixed="right" label="操作" width="140" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="editHandleClick(scope.row, '编辑')"
            >
              <i class="el-icon-edit" title="编辑"></i>
            </el-button>
            <el-button type="text" size="small" @click="stopUse(scope.row)">
              <i
                :class="[
                  scope.row.status === '0'
                    ? 'el-icon-circle-check'
                    : ' el-icon-video-pause'
                ]"
                :title="scope.row.statusText"
              ></i>
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="deleteHandleClick(scope.row)"
            >
              <i class="el-icon-delete" style="color: red;" title="删除"></i>
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="addClick(scope.row,'行新增') "
            >
              <i class="el-icon-plus" title="新增"></i>
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

    <CorpAdminEditAndAddPanel
      ref="corpAdminEditPanel"
      @initListPage="initListPage"
    ></CorpAdminEditAndAddPanel>
  </div>
</template>
<script>
import TableTree from "@/components/tableTree";
import InputFilter from "@/components/inputFliter";
import Pagination from "@/components/pagination";
import CorpAdminEditAndAddPanel from "./corpAdminEditAndAddPanel";

// import { returnReg } from "@/utils/validate"; /* 表单正则验证 */
import { clearFilterVal, getInputVal, dictTypeMap } from "@/utils/pubFunc";
import { roleApi } from "@/api/role";

import { statusMap } from "@/utils/pubFunc";
export default {
  name: "CorpAdmin",
  components: {
    TableTree,
    InputFilter,
    Pagination,
    CorpAdminEditAndAddPanel
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
      sys_user_status: [], // 用户状态键值存储
      changeArrowDirection: false,
      currentId: null,
      stopOrStart: null,
      titleName: "",
      stopOrStartText: "", // 停用或者启用
      formInline: [
        {
          type: "input",
          label: "登录账号",
          key: "loginCode",
          value: ""
        },
        {
          type: "input",
          label: "用户昵称",
          key: "userName",
          value: ""
        },
        {
          type: "input",
          label: "租户代码",
          key: "userWeight",
          value: ""
        },
        {
          type: "input",
          label: "租户名称",
          key: "corpName_",
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

      tableFit: true,
      columnWidths: {
        updateDate: 130
        // email: 170
      },
      slotColumns: ["loginCode", "userWeight", "status"],
      tableHead: {
        loginCode: "登录账号",
        userName: "用户昵称",
        corpCode_: "租户代码",
        corpName_: "租户名称",
        email: "电子邮箱",
        mobile: "手机号",
        phone: "办公电话",
        updateDate: "更新时间",
        status: "状态" // status
      },
      tableData: [],
      statusOption: {},
      pageNation: {
        ctrlPermi: 2,
        total: 0,
        pageSize: 20,
        pageNo: 1
      },
      searchVal: {
        loginCode: null,
        mobile: null,
        status: null,
        email: null, // 邮箱
        phone: null, // 08277648513
        orderBy: null //
      }
    };
  },
  mounted() {
    const obj = {
      pageSize: this.pageNation.pageSize,
      pageNo: this.pageNation.pageNo,
      status: ""
    };
    this.init(obj);
    // 获取用户角色
    this.$store.dispatch("role/getRole");
    // console.log(397, '刚刚启动时进入页面')
  },
  methods: {
    init(param) {
      roleApi
        .getCorpAdminList(param)
        .then(res => {
          this.pageNation.total = res.count;
          this.tableData = res.list;
        })
        .catch(error => {
          console.log(error);
        });
    },
    /* 获取状态下拉框数据 */
    getStatusOption(type) {
      const selectTypeData = JSON.parse(
        sessionStorage.getItem("selectDicType")
      );
      return selectTypeData[type];
    },
    /* 列表文本转义 */
    swichText(type, val, other) {
      return dictTypeMap(type, val, other);
      // console.log(99, dictTypeMap(type, val, other));
    },
    initListPage() {
      this.init({
        pageSize: this.pageNation.pageSize,
        pageNo: this.pageNation.pageNo,
        status: ""
      });
    },
    showOrHidden() {
      this.btnText = this.btnText === "查询" ? "隐藏" : "查询";
    },
    // select
    statusValChange(item) {
      this.searchBtn(item);
    },
    /* 获取填入输入框的值  */
    searchBtn(data = {}) {
      this.searchVal = Object.assign(
        this.pageNation,
        getInputVal(this.formInline)
      );
      this.init(this.searchVal);
    },
    /* 清除输入框内的值 */
    resetForm() {
      clearFilterVal(this.formInline);
      this.searchVal = {};
      const obj = {
        pageSize: this.pageNation.pageSize,
        pageNo: this.pageNation.pageNo,
        status: ""
      };
      this.init(obj);
    },
    /* 编辑表格 */
    editHandleClick(row, type) {
      this.$refs.corpAdminEditPanel.show(row, type);
    },
    /* 行点击添加*/
    addClick(row, type) {
      this.$refs.corpAdminEditPanel.show(row, type);
    },

    /* 禁用启用 */
    stopUse(row) {
      const obj = {
        userCode: row.userCode
      };
      if (row.status === "0") {
        obj.type = "disable";
      } else {
        obj.type = "enable";
      }
      const status = row.status === "0" ? "停用" : "启用";
      this.$alertMsgBox(`确定要${status}该用户吗`, "信息")
        .then(() => {
          roleApi.stopUse(obj).then(res => {
            if (res.result === "true") {
              const obj = {
                pageSize: this.pageNation.pageSize,
                pageNo: this.pageNation.pageNo,
                status: ""
              };
              this.init(obj);
              this.$message.success(res.message);
            } else {
              this.$message.warning(res.message);
            }
          });
        })
        .catch(() => {
          this.$message.info("取消");
        });
    },
    deleteHandleClick(row) {
      this.$alertMsgBox("确认要删除该用户吗", "信息")
        .then(() => {
          roleApi.deleteCorpAdmin({ userCode: row.userCode }).then(res => {
            if (res.result === "false") {
              this.$message.warning(res.message);
            } else {
              this.$message.success(res.message);
              const obj = {
                pageSize: this.pageNation.pageSize,
                pageNo: this.pageNation.pageNo,
                status: ""
              };
              this.init(obj);
            }
          });
        })
        .catch(() => {
          this.$message.info("取消");
        });
    },

    resetPassword(row) {
      this.$alertMsgBox(
        `确认要将 ${row.loginCode} 用户密码重置到初始状态吗`,
        "信息"
      )
        .then(() => {
          roleApi.resetPw({ userCode: row.userCode }).then(res => {
            if (res.result === "true") {
              this.$message.success(res.message);
            } else {
              this.$message.warning(res.message);
            }
          });
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
      const obj = {
        pageSize: this.pageNation.pageSize,
        pageNo: this.pageNation.pageNo
      };
      this.init(obj);
    }
  }
};
</script>

<style>
.el-popover {
  padding: 0 0 0 10px;
}
</style>

<style lang="scss" scoped>
.corp-admin {
  width: 100%;
  height: calc(100vh - 100px);
  // display: flex;
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
}
</style>
