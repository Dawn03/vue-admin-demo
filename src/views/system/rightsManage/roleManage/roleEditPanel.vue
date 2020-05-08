<template>
  <div class="role-edit-panel">
    <DailogFrame
      :dialog-visible="showEditDailog"
      :title-name="titleType"
      @closeDialog="closeEditDialog"
    >
      <template slot="content">
        <div>
          <ColumnBar :column-text="'基本信息'"></ColumnBar>
          <el-form
            ref="roleForm"
            :model="roleForm"
            label-width="100px"
            class="demo-ruleForm"
            size="mini"
            :rules="rules"
          >
            <el-row :gutter="gutterVal">
              <el-col :span="12">
                <el-form-item label="角色名称：" prop="roleName">
                  <el-input v-model="roleForm.roleName">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="角色编码：" prop="roleCode">
                  <el-input v-model="roleForm.roleCode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="gutterVal">

              <el-col :span="12">
                <el-form-item label="排序号：" prop="orderNumber">
                  <el-input v-model="roleForm.orderNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="用户类型：" prop="userType">
                  <el-select v-model="roleForm.userType" style="width: 336px;" placeholder="请选择用户类型">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="gutterVal">
              <el-col :span="12">
                <el-form-item label="系统角色：" prop="RoleRole">
                  <el-radio v-model="roleForm.systemRole" label="1">是</el-radio>
                  <el-radio v-model="roleForm.systemRole" label="2">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="角色分类：" prop="roleClassify">
                  <el-select v-model="roleForm.roleClassify" placeholder="请选择" style="width: 336px;">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :span="24" style="margin-top: 20px;" :rows="4">
              <el-form-item label="备注信息：" prop="remark">
                <el-input
                  v-model="roleForm.remark"
                  type="textarea"
                ></el-input>
              </el-form-item>
            </el-row>
            </el-col>
            <ColumnBar
              :column-text="'扩展字段'"
              :icon-tips="true"
              @showExtentionDetail="showExtentionDom"
            ></ColumnBar>
            <ExtentionFeild
              ref="extentionDom"
              :style="{ height: exHeight }"
              style="overflow: hidden;"
              :extention-form="roleForm.extentionForm"
              @extentionFormVal="extentionFormVal"
            ></ExtentionFeild>
          </el-form>
        </div>
      </template>

      <template slot="footer">
        <div style="text-indent: 100px;">
          <el-button
            type="primary"
            icon="el-icon-check"
            size="mini"
            @click="submitForm('roleForm')"
          >
            保存
          </el-button>
          <el-button
            type="primary"
            icon="el-icon-close"
            size="mini"
            @click="colseRole('roleForm')"
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
import ColumnBar from "@/components/commonColumn";
import ExtentionFeild from "@/components/extentionFeild";
import { returnReg } from "@/utils/validate";
import { createKey } from "@/utils/pubFunc";
export default {
  name: "RoleEdit",
  components: {
    DailogFrame,
    ColumnBar,
    ExtentionFeild
  },
  data() {
    return {
      titleType: "",
      exHeight: "0px",
      showEditDailog: false,
      menuTreeTitle: "",
      gutterVal: 100,
      options: [],
      roleForm: {
        roleName: "",
        roleCode: "",
        orderNumber: "",
        userType: "",
        systemRole: "1",
        roleClassify: "",
        remark: "",
        extentionForm: []
      },
      rules: {
        roleName: [
          {
            // pattern: returnReg("otaGrade"),
            required: true,
            message: "必填信息",
            trigger: "blur"
          }
        ],
        roleCode: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        orderNumber: [{ required: true, message: "请选择活动区域", trigger: "blur" }],
        systemRole: [
          {
            required: true,
            message: "请输入正确的邮箱",
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted() {
    this.initExtention();
  },
  methods: {
    /* 初始化扩展字段 */
    initExtention() {
      const concatArr = createKey("String", 8, "input").concat(
        createKey("Integer", 4, "input"),
        createKey("Float", 4, "input"),
        createKey("Date", 4, "date")
      );
      this.roleForm.extentionForm = concatArr;
    },
    /* 显示对话框 */
    show(row, type) {
      // 编辑机构  新增下级机构  新增机构
      this.titleType = type;
      this.showEditDailog = true;
      this.roleForm = row;
      console.log(row);
    },

    /* 显示扩展字段 */
    showExtentionDom() {
      this.exHeight = this.exHeight == "0px" ? "480px" : "0px";
    },
    /* 扩展字段值 */
    extentionFormVal(val) {
      this.roleForm.extentionForm = val;
    },
    /* 提交 */
    submitForm(formName) {
      // console.log(467, this.roleForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /* 关闭编辑对话框 */
    closeEditDialog() {
      this.showEditDailog = false;
      this.$refs.roleForm.resetFields();
    },
    /* 关闭按钮 */
    colseRole(formName) {
      this.closeEditDialog();
    }
  }
};
</script>
<style lang="scss" scoped>
.role-edit-panel {
}
</style>
