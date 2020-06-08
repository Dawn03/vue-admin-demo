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
          <!--  :model="roleForm" -->
          <el-form
            ref="roleForm"
            label-width="100px"
            class="demo-ruleForm small-space"
            size="mini"
            :rules="rules"
            :model="form"
            onsubmit="return false;"
          >
            <dym-form
              :edit-model="editModel"
              :component-list="componentList"
              :form-value.sync="form"
            >
            </dym-form>
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

import dymForm from "@/components/element/dymForm";
import { returnReg } from "@/utils/validate";
import { roleApi } from "@/api/role";
import { pubApi } from "@/api/public_request";
export default {
  name: "RoleEdit",
  components: {
    DailogFrame,
    ColumnBar,
    ExtentionFeild,
    MenuRights,
    dymForm
  },
  props: {
    form: {
      type: Object,
      default: function() {
        return {};
      }
    },
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
      editModel: "E",
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
      componentList: [
        {
          label: "角色名称：",
          prop: "roleName", // 表单验证传入的值
          labelWidth: "90px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          maxlength: "64",
          placeholder: "请输入",
          value: "roleName" // 字段显示的值
        },
        {
          label: "角色编码：",
          prop: "roleCode", // 表单验证传入的值
          labelWidth: "90px",
          // disabled: true,
          componentName: "el-input", // BaseSelect
          cols: [12, 12, 12, 12],
          placeholder: "请输入",
          value: "roleCode"
        },
        {
          label: "排序号：",
          prop: "roleSort",
          labelWidth: "90px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          placeholder: "请输入",
          value: "roleSort"
        },
        {
          label: "用户类型：",
          prop: "userType",
          labelWidth: "90px",
          componentName: "BaseSelect",
          options: [], // this.roleType
          cols: [12, 12, 12, 12],
          placeholder: "请选择",
          value: "userType"
        },
        {
          label: "系统角色：",
          prop: "isSys",
          labelWidth: "90px",
          componentName: "RadioChoose",
          cols: [12, 12, 12, 12],
          placeholder: "请输入",
          value: "isSys"
        },
        {
          label: "角色分类：",
          prop: "roleType",
          labelWidth: "90px",
          componentName: "BaseSelect",
          // requestFun: "pubApi.dictTypeFunc",
          // api: "/a/sys/dictData/listData",  //dictTypeFunc
          // api: pubApi, // dictTypeFunc

          // loadList: "dictTypeFunc",
          // selectOptions: {
          //   dictType: "sys_user_type"
          // },
          options: [], // this.userStatusOptions,
          // options: this.getthis.(),
          //  selectedField: ['id', 'name'],
          cols: [12, 12, 12, 12],
          placeholder: "请选择",
          value: "roleType"
        },
        {
          label: "备注信息：",
          prop: "remarks",
          labelWidth: "90px",
          componentName: "Textarea",
          rowsSpan: 4,
          cols: [24, 24, 24, 24],
          placeholder: "请输入",
          value: "remarks"
        }
      ],

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
        roleSort: [
          {
            required: true,
            pattern: returnReg("positiveInteger"),
            message: "请输入一个正整数",
            trigger: "blur"
          }
        ],
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
  watch: {
    roleType: {
      handler(val, oldVal) {
        this.componentList[3].options = val;
      },
      // 监听到数据变化时立即调用
      immediate: true
    },
    userStatusOptions: {
      handler(val, oldVal) {
        this.componentList[5].options = val;
      },
      // 监听到数据变化时立即调用
      immediate: true
    }
  },
  mounted() {},
  methods: {
    /* 显示对话框 */
    show(row, type) {
      // 新增角色
      console.log("this.userStatusOptions", this.userStatusOptions);
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
    /* 获取用户列表 */
    getUserStatusOptions() {
      const userOptions = [];
      pubApi.dictTypeFunc({ dictType: "sys_user_type" }).then(res => {
        for (let i = 0, len = res.length; i < len; i++) {
          if (res[i].status === "0") {
            userOptions.push({
              label: res[i].dictLabel,
              value: res[i].dictValue
            });
          }
        }
        console.log(3333, userOptions);
        return userOptions;
      });
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
      console.log(467, this.form);
      return;
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
