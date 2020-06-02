<template>
  <div class="role-edit-panel">
    <DailogFrame
      :dialog-visible="showEditDailog"
      :title-name="titleName"
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
                  <el-input v-model="roleForm.roleName"> </el-input>
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
                <el-form-item label="排序号：" prop="roleSort">
                  <el-input v-model="roleForm.roleSort"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="用户类型：" prop="userType">
                  <el-select
                    v-model="roleForm.userType"
                    style="width:100%;"
                    placeholder="请选择用户类型"
                  >
                    <el-option
                      v-for="item in userStatusOptions"
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
                <el-form-item label="系统角色：" prop="isSys">
                  <el-radio-group
                    v-model="roleForm.isSys"
                    @change="changeSystem"
                  >
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="角色分类：" prop="roleType">
                  <el-select
                    v-model="roleForm.roleType"
                    placeholder="请选择角色分类"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="item in roleType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top: 20px;" :rows="4">
              <el-col :span="24">
                <el-form-item label="备注信息：" prop="remarks">
                  <el-input
                    v-model="roleForm.remarks"
                    type="textarea"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <ColumnBar
              :column-text="'扩展字段'"
              :icon-tips="true"
              @showExtentionDetail="showExtentionDom"
            ></ColumnBar>
            <ExtentionFeild
              ref="extentionDom"
              :style="{ height: exHeight }"
              style="overflow: hidden;"
              :extention-form="roleForm.extend"
              @extentionFormVal="extentionFormVal"
            ></ExtentionFeild>
            <div v-if="titleName == '新增角色'">
              <ColumnBar :column-text="'授权功能菜单'"></ColumnBar>
              <MenuRights @checkTree="checkTreeVal"></MenuRights>
            </div>
          </el-form>
        </div>
      </template>
      <!-- 新增比编辑多授权功能选择项 -->
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
import MenuRights from "@/components/menuRights";
// import { returnReg } from "@/utils/validate";
import { roleApi } from "@/api/role";
export default {
  name: "RoleEdit",
  components: {
    DailogFrame,
    ColumnBar,
    ExtentionFeild,
    MenuRights
  },
  props: {
    userStatusOptions: {
      type: Array,
      default: () => {
        return [];
      }
    },
    roleType: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      titleName: "",
      exHeight: "0px",
      showEditDailog: false,
      menuTreeTitle: "",
      gutterVal: 100,
      options: [],
      roleForm: {
        roleName: "",
        roleCode: "",
        roleSort: "",
        userType: "",
        isSys: "0",
        roleType: "",
        remarks: "",
        extend: {
          extendS1: "",
          extendS2: "",
          extendS3: "",
          extendS4: "",
          extendS5: "",
          extendS6: "",
          extendS7: "",
          extendS8: "",
          extendI1: "",
          extendI2: "",
          extendI3: "",
          extendI4: "",
          extendF1: "",
          extendF2: "",
          extendF3: "",
          extendF4: "",
          extendD1: "",
          extendD2: "",
          extendD3: "",
          extendD4: ""
        }
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
        roleSort: [{ required: true, message: "必填信息", trigger: "blur" }],
        isSys: [
          {
            required: true,
            message: "请选择系统角色",
            trigger: "change"
          }
        ],
        menuMapDefault: [],
        checkTree1: [],
        checkTree2: [],
        checkTree3: [],
        roleMenuListJson: []
      }
    };
  },
  mounted() {},
  methods: {
    /* 显示对话框 */
    show(row, type) {
      // 新增角色

      console.log(row, type);
      this.titleName = type;
      this.showEditDailog = true;
      // if(type === "编辑角色")
      // this.roleForm = row;
      this.roleForm.isSys = "0";
      // if (type === "新增角色") {
      //   this.getAuthorizeData({ roleCode: "" });
      // } else {
      //   this.getAuthorizeData({ roleCode: row.roleCode });
      // }
    },

    /* 显示扩展字段 */
    showExtentionDom() {
      this.exHeight = this.exHeight === "0px" ? "480px" : "0px";
    },
    /* 扩展字段值 */
    extentionFormVal(val) {
      this.roleForm.extentionForm = val;
    },
    checkTreeVal(param) {
      console.log(259, param);
      switch (param.current) {
        case 1:
          this.checkTree1 = param.val || [];
          break;
        case 2:
          this.checkTree2 = param.val || [];
          break;
        case 3:
          this.checkTree3 = param.val || [];
          break;
      }
    },
    changeSystem(val) {
      this.roleForm.isSys = val;
      console.log(272, val);
    },
    /* 提交 */
    submitForm(formName) {
      console.log(467, this.titleName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          const obj = {};
          if (this.titleName === "新增角色") {
            obj.op = "add";
            obj.isNewRecord = true;
          } else {
            obj.op = "edit";
          }
          obj.extend = this.roleForm.extend;
          obj.oldRoleName = this.roleForm.oldRoleName;
          obj.roleName = this.roleForm.roleName;
          obj.roleCode = this.roleForm.roleCode;
          obj.roleSort = this.roleForm.roleSort;
          obj.userType = this.roleForm.userType;
          obj.isSys = this.roleForm.isSys;
          obj.roleType = this.roleForm.roleType;
          obj.remarks = this.roleForm.remarks;
          obj.roleMenuListJson = this.checkTree1.concat(
            this.checkTree2,
            this.checkTree3
          );
          console.log(555, obj.roleMenuListJson);
          roleApi.addRole(obj).then(res => {
            if (res.result === "true") {
              this.$message.success(res.message);
              this.$emit("initPage");
            } else {
              this.$message.warning(res.message);
            }
          });
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      //       op: add
      // oldRoleName:
      // roleName: 角色名称
      // isNewRecord: true
      // roleCode: ROELCODE
      // roleSort: 40
      // userType: employee
      // isSys: 1
      // roleType:
      // remarks
      // roleMenuListJson:[]
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
