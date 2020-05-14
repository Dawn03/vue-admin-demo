<template>
  <div class="assign-role-panel">
    <DailogFrame
      :dialog-visible="showAssginRole"
      :title-name="'用户分配角色'"
      @closeDialog="colseAssignRole"
    >
      <template slot="content">
        <div>
          <el-form
            ref="roleForm"
            :model="roleForm"
            label-width="100px"
            class="demo-ruleForm"
            size="mini"
            :rules="rules"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="登录账号：" prop="loginAccount">
                  <el-input v-model="roleForm.loginAccount" :disabled="true">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="用户昵称：" prop="userAlias">
                  <el-input v-model="roleForm.userAlias" :disabled="true">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <AssignRoleDetail
            :table-head="tableHead"
            :table-data="tableData"
            :table-check-box-value="tableCheckBoxValue"
          ></AssignRoleDetail>
          <!-- <ColumnBar :column-text="'分配角色'"></ColumnBar>
          <TableTree
            :table-head="tableHead"
            :table-data="tableData"
            @tableCheckBox="tableCheckBox"
          >
            <template slot="chechbox">
              <el-table-column type="selection" width="40"></el-table-column>
            </template>
            <template slot="affiation" slot-scope="scope">
              <el-input v-model="scope.row.affiation">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </template>
            <template slot="jobs" slot-scope="scope">
              <el-input v-model="scope.row.jobs">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </template>
          </TableTree> -->
        </div>
      </template>
      <template slot="footer">
        <div style="text-indent: 100px;">
          <el-button
            type="primary"
            icon="el-icon-check"
            size="mini"
            @click="saveAssignRole('userForm')"
          >
            保存
          </el-button>
          <el-button
            type="primary"
            icon="el-icon-close"
            size="mini"
            @click="colseAssignRole('userForm')"
          >
            关闭
          </el-button>
        </div>
      </template>
    </DailogFrame>
  </div>
</template>
<script>
import DailogFrame from "@/components/dailogPanel/frame";
import AssignRoleDetail from "./assignRoleDetail";
export default {
  name: "AssignRole",
  components: {
    DailogFrame,
    AssignRoleDetail
  },
  data() {
    return {
      showAssginRole: false,
      roleForm: {
        loginAccount: "",
        userAlias: ""
      },
      tableCheckBoxValue: [],
      rules: {
        loginAccount: [{ required: true }],
        userAlias: [{ required: true }]
      },
      tableHead: {
        roleName: "角色名称",
        roleCode: "角色编码"
      },
      tableData: [
        {
          roleName: "系统管理员",
          roleCode: "corpAdmin"
        },
        {
          roleName: "业务演示角色",
          roleCode: "demo"
        },
        {
          roleName: "部门经理",
          roleCode: "dept"
        },
        {
          roleName: "普通员工",
          roleCode: "user"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    init(row) {
      //   console.log(99, row);
      this.roleForm = JSON.parse(JSON.stringify(row));
      this.showAssginRole = true;
    },
    // 多选操作
    tableCheckBox(row) {
      this.tableCheckBoxValue = row;
    },
    /* 保存 */
    saveAssignRole() {
      console.log(467, this.roleForm, this.tableCheckBoxValue);
      this.colseAssignRole();
    },
    colseAssignRole(formName) {
      this.showAssginRole = false;
      this.tableCheckBoxValue = [];
    }
  }
};
</script>
<style lang="scss" scoped>
.assign-role-panel {
}
</style>
