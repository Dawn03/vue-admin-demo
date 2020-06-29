<template>
  <div class="user-edit-panel">
    <DailogFrame
      :dialog-visible="showEditDailog"
      :title-name="`${titleName}租户管理`"
      @closeDialog="closeEditDialog"
    >
      <template slot="content">
        <div>
          <ColumnBar :column-text="'基本信息'"></ColumnBar>
          <el-form
            ref="userForm"
            :model="userForm"
            label-width="140px"
            class="demo-ruleForm"
            size="mini"
            :rules="rules"
          >
            <dym-form
              :edit-model="editModel"
              :component-list="componentList"
              :form-value.sync="dataRightsForm"
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
              :extention-form="extend"
              @extentionFormVal="extentionFormVal"
            ></ExtentionFeild>
            <!-- :extention-form="userForm.extentionForm" -->
          </el-form>
          <ChooseMenuTree
            :inner-dialog-visible="innerDialogVisible"
            :title-name="menuTreeTitle"
            :menu-data="menuData"
            :key-val="keyVal"
            :default-expand="defaultExpand"
            @closeInnerDialog="closeMuneTreeChoose"
            @on-change-keyVal="changeKeyVal"
            @clickNodeReslut="clickNodeReslut"
          ></ChooseMenuTree>
        </div>
      </template>

      <template slot="footer">
        <div style="text-indent: 100px;">
          <el-button
            type="primary"
            icon="el-icon-check"
            size="mini"
            @click="submitForm('userForm')"
          >
            保存
          </el-button>
          <el-button
            type="primary"
            icon="el-icon-close"
            size="mini"
            @click="colseUser('userForm')"
          >
            关闭
          </el-button>
        </div>
      </template>
    </DailogFrame>
  </div>
</template>
<script>
import ColumnBar from "@/components/commonColumn";
import DailogFrame from "@/components/dailogPanel/frame";
import TableTree from "@/components/tableTree";
import ExtentionFeild from "@/components/extentionFeild";
import dymForm from "@/components/element/dymForm";
import ChooseMenuTree from "@/components/chooseMenuTree";
import { returnReg } from "@/utils/validate";
import { filterNokeyVal, stringVal } from "@/utils/pubFunc";
import { orgApi } from "@/api/organization";
import { roleApi } from "@/api/role";
import { pubApi } from "@/api/public_request";
// import AssignRoleDetail from "./assignRoleDetail";
import { getOffceList, getCompanyList } from "@/js/publicData";
export default {
  name: "UserEdit",
  components: {
    DailogFrame,
    ColumnBar,
    TableTree,
    ExtentionFeild,
    ChooseMenuTree
    // AssignRoleDetail
  },
  data() {
    const validTelNumber = (rule, value, callback) => {
      const phoneReg = returnReg("phone");
      const telReg = returnReg("telNumber");
      if (!phoneReg.test(value) && !telReg.test(value) && value !== "") {
        callback(
          new Error(
            "请正确填写您的办公号码，固话为区号0(3-4位)号码-(7-9位),手机为1开头的11位手机号段"
          )
        );
      } else {
        callback();
      }
    };
    return {
      titleName: "",
      editModel: "E",
      componentList: [
        {
          label: "租户代码：",
          prop: "userWeight",
          labelWidth: "90px",
          disabled: true,
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          placeholder: "请输入租户代码",
          value: "userWeight"
        },
        {
          label: "租户名称：",
          prop: "corpName_",
          labelWidth: "90px",
          disabled: true,
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          placeholder: "请输入租户名称",
          value: "corpName_"
        }, {
          label: "登录账号：",
          prop: "loginCode",
          labelWidth: "90px",
          disabled: true,
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          placeholder: "请输入租户名称",
          value: "loginCode"
        }
      ],
      form: {},
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
      },
      attchCurrentRow: {},
      attchOfficeName: "",
      employeePostsOptions: [],
      employeePosts: [], // cfo 所在岗位
      userRoleString: "", // 新增-分配角色-保存字段
      employeeOfficeList: [], // 附属公司列表

      rules: {
        officeName: [
          { required: true, message: "请选择归属机构", trigger: "change" },
          {
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        loginCode: [
          { required: true, message: "请输入登录账号", trigger: "blur" },
          { min: 4, max: 20, message: "长度在 4 到 20 个字符", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入用户昵称", trigger: "blur" }
        ],
        email: [
          {
            pattern: returnReg("email"),
            message: "请输入正确的邮箱",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            pattern: returnReg("phone"),
            message: "输入正确的手机号",
            trigger: "blur"
          }
        ],
        phone: [{ validator: validTelNumber, trigger: "change" }],
        userWeight: [{ message: "请填入权重", trigger: "blur" }]
      },
      slotColumns: ["officeName", "postCode"],
      tableHead: {
        officeName: "附属机构",
        postCode: "附属岗位"
      },
      addCountIndex: 0,
      roleChooseList: [],
      offceList: [],
      companyList: []
    };
  },
  mounted() {
    console.log(404);
    getOffceList().then(res => {
      this.offceList = res;
    });

    getCompanyList().then(res => {
      this.companyList = res;
    });
  },
  methods: {
    /* 获取编辑详情 */
    /* 显示对话框 */
    show(row, type) {
      this.titleName = type;
      if (type === "新增") {
        this.userForm.op = "add";
        this.userForm.userType = "employee";
        this.userForm.userCode = "";
        pubApi.getEmployeePosts().then(res => {
          for (let i = 0, len = res.length; i < len; i++) {
            res[i].postName = res[i].name;
            res[i].postCode = res[i].id;
          }
          this.employeePostsOptions = res;
          this.showEditDailog = true;
        });
        /* 新增 分配角色 */
        roleApi.getRoleList().then(res => {
          this.roleChooseList = res;
        });
      } else {
        this.userForm.op = "edit";
        this.userForm.userType = "employee";
        const obj = {
          userCode: row.userCode,
          op: this.userForm.op
          // _layer: true
        };
        orgApi.getUserDetail(obj).then(res => {
          this.userForm.userCode = res.empUser.userCode;
          this.userForm.officeName = res.empUser.employee.office.officeName;
          this.userForm.officeCode = res.empUser.employee.office.officeCode;
          this.userForm.companyName = res.empUser.employee.company.companyName;
          this.userForm.companyCode = res.empUser.employee.company.companyCode;
          this.userForm.oldLoginCode = res.empUser.loginCode;
          this.userForm.loginCode = res.empUser.loginCode;

          this.userForm.userName = res.empUser.userName;
          this.userForm.email = res.empUser.email;
          this.userForm.mobile = res.empUser.mobile;
          this.userForm.phone = res.empUser.phone;
          this.userForm.userWeight = res.empUser.userWeight;
          this.userForm.empNo = res.empUser.employee.empNo;
          this.userForm.empName = res.empUser.employee.empName;
          this.userForm.empNameEn = res.empUser.employee.empNameEn;
          this.employeePostsOptions = res.postList; //  所在岗位选择
          this.employeePosts = res.empUser.employee.employeePosts; //  所在岗位回显
          this.userForm.remarks = res.empUser.remarks;
          this.employeeOfficeList = res.empUser.employee.employeeOfficeList;
          for (const key in res.empUser.extend) {
            this.extend[key] = res.empUser.extend[key];
          }
          this.showEditDailog = true;
        });
      }
    },
    /* 触发选择归属机构 */
    institutionChoose(typeText) {
      this.menuTreeTitle = "机构选择";
      this.getOfficeMenuTree();
    },
    /*  触发选择附属公司选择*/
    attchEmployeeChoose(row) {
      this.getOfficeMenuTree();
      this.menuTreeTitle = "附属机构选择";
      this.attchCurrentRow = row;
      // 选择之后值的归属问题
    },
    /* 获取归属机构列表 */
    getOfficeMenuTree() {
      console.log(473, this.offceList);
      this.menuData = this.offceList;
      this.innerDialogVisible = true;
    },
    /*  触发选择归属公司*/
    companyChoose() {
      this.menuTreeTitle = "归属公司选择";
      this.menuData = this.companyList;
      this.innerDialogVisible = true;
    },
    /* 关闭选择归属机构或者归属公司 */
    closeMuneTreeChoose() {
      this.innerDialogVisible = false;
    },
    /* changeKeyVal */
    changeKeyVal(val) {
      console.log(379, val);
      this.keyVal = val;
    },
    /* 菜单树中当前点击的树节点*/
    clickNodeReslut(data) {
      if (this.menuTreeTitle === "机构选择") {
        this.userForm.officeName = data.label;
        this.userForm.officeCode = data.id;
        this.officeCodeClick = data;
      } else if (this.menuTreeTitle === "附属机构选择") {
        for (let i = 0, len = this.employeeOfficeList.length; i < len; i++) {
          if (
            this.attchCurrentRow.flagId === this.employeeOfficeList[i].flagId
          ) {
            this.employeeOfficeList[i].officeName = data.label;
            this.employeeOfficeList[i].officeCode = data.id;
            this.innerDialogVisible = false;
            return;
          }
        }
      } else {
        this.userForm.companyName = data.label;
        this.userForm.companyCode = data.id;
      }
      this.closeMuneTreeChoose();
      this.keyVal = "";
    },
    /* 新增 */
    addNew() {
      const obj = {
        officeName: "",
        postCode: "",
        officeCode: "",
        flagId: this.addCountIndex
      };
      this.employeeOfficeList.push(obj);
      this.addCountIndex++;
    },
    /* 删除新增 */
    deleteAdd(row) {
      for (let i = 0, len = this.employeeOfficeList.length; i < len; i++) {
        console.log(542, row);
        if (row.flagId === this.employeeOfficeList[i].flagId) {
          this.employeeOfficeList.splice(i, 1);
          return;
        }
      }
    },
    /* 显示扩展字段 */
    showExtentionDom() {
      this.exHeight = this.exHeight === "0px" ? "auto" : "0px";
    },
    /* 扩展字段值 */
    extentionFormVal(val) {
      this.extend = val;
    },
    /* 获取角色checkbox  userRoleString 需要字符串格式*/
    getCheckVal(checkboxVal) {
      // this.employeePosts = checkboxVal;
      this.userRoleString = stringVal(checkboxVal, "id");
      // console.log(12345, this.employeePosts);
    },
    /* 提交 */
    submitForm(formName) {
      // employeePosts
      console.log(9990, this.officeCodeClick);
      this.$refs[formName].validate(valid => {
        if (valid) {
          const obj = {};
          if (this.userRoleString) {
            obj.userRoleString = this.userRoleString;
          }
          obj.extend = this.extend; // :filterNokeyVal();
          obj.op = this.userForm.op;
          obj.userType = this.userForm.userType;
          obj.userCode = this.userForm.userCode;
          obj.oldLoginCode = this.userForm.oldLoginCode;
          obj.loginCode = this.userForm.loginCode;
          obj.userName = this.userForm.userName;
          obj.email = this.userForm.email;
          obj.mobile = this.userForm.mobile;
          obj.phone = this.userForm.phone;
          obj.userWeight = this.userForm.userWeight;
          obj.remarks = this.userForm.remarks;
          obj.employee = {
            office: {
              officeCode: this.userForm.officeCode || "",
              officeName: this.userForm.officeName || ""
            },
            company: {
              companyName: this.userForm.companyName || "",
              companyCode: this.userForm.companyCode || ""
            },
            empNo: this.userForm.empNo || "",
            empName: this.userForm.empName || "",
            employeePosts: this.employeePosts || [],
            empNameEn: this.userForm.empNameEn || "",
            employeeOfficeList: this.employeeOfficeList || []
          };
          orgApi.addNewUser(obj).then(res => {
            if (res.result === "false") {
              this.$message.warning(res.message);
            } else {
              this.$message.success(res.message);
              this.closeEditDialog();
              this.$emit("initListPage");
            }
          });
          /* postFromData 提交方式保存有问题 */
          //   for (const key in this.extend) {
          //   obj["extend." + key] = this.extend[key];
          // }
          // obj.op = this.userForm.op;
          // obj.userType = this.userForm.userType;
          // obj.userCode = this.userForm.userCode;
          // obj.oldLoginCode = this.userForm.oldLoginCode;
          // obj.loginCode = this.userForm.loginCode;
          // obj.userName = this.userForm.userName;
          // obj.email = this.userForm.email;
          // obj.mobile = this.userForm.mobile;
          // obj.phone = this.userForm.phone;
          // obj.userWeight = this.userForm.userWeight;
          // obj.remarks = this.userForm.remarks;
          // obj["employee.office.officeCode"] = this.userForm.officeCode;
          // obj["employee.office.officeName"] = this.userForm.officeName;
          // obj["employee.company.companyName"] = this.userForm.companyName;
          // obj["employee.company.companyCode"] = this.userForm.companyCode;
          // obj["employee.empNo"] = this.userForm.empNo;
          // obj["employee.empName"] = this.userForm.empName;
          // obj["employee.employeePosts"] =
          //   JSON.stringify(this.employeePosts) || [];
          // obj["employee.empNameEn"] = this.userForm.empNameEn;
          // obj["employee.employeeOfficeList"] =
          //   JSON.stringify(this.employeeOfficeList) || [];
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /* 关闭编辑对话框 */
    colseUser() {
      this.closeEditDialog();
    },
    closeEditDialog() {
      this.showEditDailog = false;
      this.$refs["userForm"].resetFields();
      this.attchCurrentRow = {};
      this.attchOfficeName = "";
      this.employeePosts = [];
      this.employeeOfficeList = [];
      for (const key in this.extend) {
        this.extend[key] = "";
      }
      for (const key in this.userForm) {
        this.userForm[key] = "";
      }
      this.$emit("initListPage");
      // this.$refs.roleDetail.toggleSelection();
    }
  }
};
</script>
<style lang="scss" scoped>
.user-edit-panel {
}
</style>
