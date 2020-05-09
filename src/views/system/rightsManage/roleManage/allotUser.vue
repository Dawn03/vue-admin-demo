<template>
  <div class="allot-user-panel">
    <DailogFrame
      :dialog-visible="showAssginRole"
      :title-name="'用户分配角色'"
      @closeDialog="colseAssignRole"
    >
      <template slot="content">
        <div>
          <div class="top-btn clearfix">
            <div class="fl">
              <i class="el-icon-user"></i>
              <span>
                角色分配用户（{{ roleForm.roleName }}-{{ roleForm.roleCode }}-{{
                  roleForm.userType
                }}）
              </span>
            </div>
            <div class="fr">
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="mini"
                @click="addUser"
              >
                添加用户
              </el-button>
              <el-button
                type="primary"
                icon="el-icon-circle-close"
                size="mini"
                @click="multipleCancel"
              >
                批量取消
              </el-button>
              <el-button type="primary" icon="el-icon-close" size="mini">
                关闭
              </el-button>
            </div>
          </div>
          <InputFliter :form-item="formInline" style="margin-bottom: 10px;">
            <template slot="btnGroups">
              <el-button type="primary" size="mini" @click="searchBtn">
                查询
              </el-button>
              <el-button size="mini" @click="resetForm"> 重置 </el-button>
            </template>
          </InputFliter>
          <TableTree
            :table-head="tableHead"
            :table-data="tableData"
            :slot-columns="slotColumns"
            @tableCheckBox="tableCheckBox"
          >
            <template slot="chechbox">
              <el-table-column type="selection" width="40"></el-table-column>
            </template>
            <template slot="status" slot-scope="scope">
              <el-button size="mini" type="success" round>
                {{ scope.row.status }}
              </el-button>
            </template>
            <template slot="operate">
              <el-table-column
                fixed="right"
                label="操作"
                width="120"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="singleCancel(scope.row)"
                  >
                    <i class="el-icon-circle-close"></i>
                  </el-button>
                </template>
              </el-table-column>
            </template>
          </TableTree>
          <AddUserPanel ref="showAddUserPanel"></AddUserPanel>
        </div>
      </template>
    </DailogFrame>
  </div>
</template>
<script>
import DailogFrame from "@/components/dailogPanel/frame";
import TableTree from "@/components/tableTree";
import InputFliter from "@/components/inputFliter";
import AddUserPanel from "./addUserPanel";
import { clearFilterVal, getInputVal } from "@/utils/pubFunc";

export default {
  name: "AssignRole",
  components: {
    DailogFrame,
    TableTree,
    InputFliter,
    AddUserPanel
  },
  data() {
    return {
      showAssginRole: false,
      roleForm: {
        roleName: "",
        roleCode: "",
        userType: ""
      },
      tableCheckBoxValue: [],
      slotColumns: ["status"],
      formInline: [
        {
          type: "input",
          value: "",
          key: "acount",
          label: "账号"
        },
        {
          type: "input",
          value: "",
          key: "alias",
          label: "昵称"
        },
        {
          type: "input",
          value: "",
          key: "emial",
          label: "邮箱"
        },
        {
          type: "input",
          value: "",
          key: "phone",
          label: "手机"
        },
        {
          type: "input",
          value: "",
          key: "tel",
          label: "电话"
        }
      ],
      tableHead: {
        loginAccount: "登录账号",
        alias: "用户昵称",
        email: "电子邮箱",
        phome: "手机号码",
        tel: "办公电话",
        updataTime: "更新时间",
        status: "状态"
      },
      tableData: [
        {
          loginAccount: "登录账号",
          alias: "用户昵称",
          email: "电子邮箱",
          phome: "手机号码",
          tel: "办公电话",
          updataTime: "更新时间",
          status: "状态"
        },
        {
          loginAccount: "登录账号",
          alias: "用户昵称",
          email: "电子邮箱",
          phome: "手机号码",
          tel: "办公电话",
          updataTime: "更新时间",
          status: "状态"
        },
        {
          loginAccount: "登录账号",
          alias: "用户昵称",
          email: "电子邮箱",
          phome: "手机号码",
          tel: "办公电话",
          updataTime: "更新时间",
          status: "状态"
        },
        {
          loginAccount: "登录账号",
          alias: "用户昵称",
          email: "电子邮箱",
          phome: "手机号码",
          tel: "办公电话",
          updataTime: "更新时间",
          status: "状态"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    init(row) {
      this.roleForm = JSON.parse(JSON.stringify(row));
      this.showAssginRole = true;
    },
    // 多选操作
    tableCheckBox(row) {
      this.tableCheckBoxValue = row;
      console.log("选中的row", row);
    },
    /* 添加用户 */
    addUser() {
      this.$refs.showAddUserPanel.show();
    },
    /* 批量取消*/
    multipleCancel() {
      if (this.tableCheckBoxValue.length === 0) {
        this.$message({
          message: "请选择需要批量取消的数据",
          type: "warning"
        });
      } else {
        console.log(this.tableCheckBoxValue);
      }
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
    /* 单个取消 */
    singleCancel(row) {
      this.$alertMsgBox("确认要取消该用户角色吗？", "信息")
        .then(() => {
          this.$message.success("成功");
        })
        .catch(() => {
          this.$message.info("取消");
        });
      console.log(row, "单个取消");
    },
    /* 保存 */
    saveAssignRole() {
      console.log(467, this.roleForm, this.tableCheckBoxValue);
      this.colseAssignRole();
    },
    colseAssignRole(formName) {
      this.showAssginRole = false;
      this.resetForm();
      this.tableCheckBoxValue = [];
    }
  }
};
</script>
<style lang="scss" scoped>
.allot-user-panel {
  .top-btn {
    border-bottom: 1px solid #eee;
    height: 50px;
    line-height: 50px;
  }
}
</style>
