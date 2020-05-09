<template>
  <div class="assign-role-panel">
    <DailogFrame
      :dialog-visible="showAssginRole"
      :title-name="'角色分配数据权限'"
      @closeDialog="colseAssignRole"
    >
      <template slot="content">
        <div>
          <el-form
            ref="roleForm"
            :model="roleForm"
            label-width="120px"
            class="demo-ruleForm"
            size="mini"
            :rules="rules"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="角色名称：" prop="roleName">
                  <el-input v-model="roleForm.roleName" :disabled="true">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="角色编码：" prop="roleCode">
                  <el-input v-model="roleForm.roleCode" :disabled="true">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="数据范围：" prop="roleCode">
                  <i
                    class="el-icon-question"
                    style="margin-right:10px"
                    title="指定数据权限范围类型，多个角色同时指定，之间为或者关系"
                  ></i>
                  <el-radio
                    v-for="(item, index) in radioArr"
                    :key="index"
                    v-model="dataRange"
                    :label="item.value"
                  >
                    {{ item.label }}
                  </el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="控制业务范围：" prop="userAlias">
                  <i
                    class="el-icon-question"
                    style="margin-right:10px"
                    title="在 addFilter 权限过滤的时候指定适应的业务范围，不指定代表所有生效，如：有的功能看本部门，有的功能看本公司；新的业务范围从字典 sys_role_biz_scope 类型添加。"
                  ></i>
                  <div style="width: calc(100% - 30px); display: inline-block;">
                    <el-input v-model="roleForm.controlRange"> </el-input>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
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
// import { } from "module";
import ColumnBar from "@/components/commonColumn";
import DailogFrame from "@/components/dailogPanel/frame";
import TableTree from "@/components/tableTree";
export default {
  name: "AssignRole",
  components: {
    DailogFrame,
    ColumnBar,
    TableTree
  },
  data() {
    return {
      showAssginRole: false,
      dataRange: "2",
      roleForm: {
        roleName: "",
        roleCode: "",
        dataRange: "3",
        controlRange: ""
      },
      radioArr: [
        {
          label: "未设置",
          value: "1"
        },
        {
          label: "全部数据",
          value: "2"
        },
        {
          label: "自定义数据",
          value: "3"
        },
        {
          label: "本公司数据",
          value: "4"
        },
        {
          label: "本部门和本公司数据",
          value: "5"
        }
      ],
      tableCheckBoxValue: [],
      rules: {
        loginAccount: [{ required: true }],
        roleCode: [{ required: true }]
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
