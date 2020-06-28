<template>
  <div class="post  wrapper_content">
    <div class="current-type clearfix">
      <div class="fl">
        <i class="el-icon-user"></i>
        <span>二级管理员</span>
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
      :slot-columns="slotColumns"
      :table-fit="tableFit"
      style="margin-top: 10px;"
    >
      <template slot="loginCode" slot-scope="scope">
        <span class="td-color" @click="secAdminEdit(scope.row, '编辑')">
          {{ scope.row.loginCode }}
        </span>
      </template>
      <template slot="status" slot-scope="scope">
        {{ swichText("sys_search_status", scope.row.status, "未设置") }}
      </template>
      <template slot="operate">
        <el-table-column fixed="right" label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="secAdminEdit(scope.row, '编辑')"
            >
              <i class="el-icon-edit" title="编辑"></i>
            </el-button>
            <!-- <el-button type="text" size="small" @click="stopUsePost(scope.row)">
              <i
                :class="[
                  scope.row.status === '0'
                    ? 'el-icon-video-pause'
                    : 'el-icon-circle-check'
                ]"
                :style="{
                  color: [scope.row.status == '0' ? '#f00' : '#409EFF']
                }"
                :title="swichText('sys_search_status', scope.row.status, '')"
              ></i>
            </el-button> -->
            <el-button type="text" size="small" @click="deleteBtn(scope.row)">
              <i style="color:red;" class="el-icon-delete" title="删除"></i>
            </el-button>
          </template>
        </el-table-column>
      </template>
    </TableTree>
    <Pagination
      :total="pageNation.total"
      :page-size="pageNation.pageSize"
      @currentChange="currentChange"
    ></Pagination>
    <SecAdminEdit ref="secAdminEditPanel" @initPage="initPage"></SecAdminEdit>
    <AddUser ref="secAdminAddUser" @addUserVal="addUserVal"></AddUser>
  </div>
</template>
<script>
import TableTree from "@/components/tableTree";
import InputFilter from "@/components/inputFliter";
import Pagination from "@/components/pagination";
import SecAdminEdit from "./secAdminEdit";
import AddUser from "./addUser";
import { clearFilterVal, getInputVal, dictTypeMap } from "@/utils/pubFunc";
// import { orgApi } from "@/api/organization";
import { roleApi } from "../../../../api/role";
export default {
  name: "UserManage",
  inject: ["reload"],
  components: {
    TableTree,
    InputFilter,
    Pagination,
    SecAdminEdit,
    AddUser
  },
  data() {
    return {
      btnText: "查询",
      stopOrStart: null,
      formInline: [
        {
          type: "input",
          label: "登录账号",
          key: "loginCode",
          value: "",
          width: "100"
        },
        {
          type: "input",
          label: " 昵称",
          key: "userName",
          value: "",
          width: "100"
        },
        {
          type: "input",
          label: "邮箱",
          key: "email",
          value: "",
          width: "100"
        },
        {
          type: "input",
          label: "手机",
          key: "mobile",
          value: "",
          width: "100"
        },
        {
          type: "input",
          label: "电话",
          key: "phone",
          value: "",
          width: "100"
        },
        {
          type: "select",
          label: "状态",
          options: this.getStatusOption("sys_search_status"),
          key: "status",
          value: "",
          width: "100"
        }
      ],
      columnWidths: {
        updateDate: 130
      },
      slotColumns: ["loginCode", "status"],
      tableHead: {
        loginCode: "登录账号",
        userName: "用户昵称",
        email: "电子邮箱",
        mobile: "手机号码",
        phone: "办公电话",
        updateDate: "更新时间",
        status: "状态" // status
      },
      tableData: [],
      pageNation: {
        total: 0,
        pageSize: 20,
        pageNo: 1,
        status: ""
        // postCode: "",
        // postName_like: "",
        // postType: ""
      },
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
      roleApi.getSecAdmin(param).then(res => {
        this.pageNation.total = res.count;
        this.tableData = res.list;
      });
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
      this.$alertMsgBox(`确定要${this.stopOrStartText}该用户吗`, "信息")
        .then(() => {
          orgApi
            .stopUsePost({
              stopOrStart: this.stopOrStart,
              postCode: row.postCode
            })
            .then(res => {
              if (res.result === "true") {
                this.init(this.pageNation);
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
    deleteBtn(row) {
      this.$alertMsgBox(`此操作将永久删除该文件, 是否继续?`, "提示")
        .then(() => {
          orgApi
            .deleteSecAdmin({
              userCode: row.userCode
            })
            .then(res => {
              if (res.result === "true") {
                this.init(this.pageNation);
                this.$message.success(res.message);
              }
            });
        })
        .catch(() => {
          this.$message.info("取消");
        });
    },
    /* 列表文本转义 */
    swichText(type, val, other) {
      return dictTypeMap(type, val, other);
      // console.log(99, dictTypeMap(type, val, other));
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
      const obj = {
        pageSize: this.pageNation.pageSize,
        pageNo: this.pageNation.pageNo
      };
      this.init(obj);
    },
    /* 编辑表格 */
    secAdminEdit(row, type) {
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
