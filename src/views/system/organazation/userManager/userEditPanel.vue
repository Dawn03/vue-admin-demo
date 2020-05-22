<template>
  <div class="user-edit-panel">
    <DailogFrame
      :dialog-visible="showEditDailog"
      :title-name="`${titleName}用户`"
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
            <el-row :gutter="gutterVal">
              <el-col :span="12">
                <el-form-item label="归属机构：" prop="officeName">
                  <el-input
                    v-model="userForm['officeName']"
                    @focus="institutionChoose"
                  >
                    <el-button slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="归属公司：" prop="companyName">
                  <el-input
                    v-model="userForm['companyName']"
                    @focus="companyChoose"
                  >
                    <el-button slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="gutterVal">
              <el-col :span="12">
                <el-form-item label="登录账号：" prop="loginCode">
                  <el-input v-model="userForm.loginCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="用户昵称：" prop="userName">
                  <el-input v-model="userForm.userName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="gutterVal">
              <el-col :span="12">
                <el-form-item label="电子邮箱：" prop="email">
                  <el-input v-model="userForm.email">
                    <el-button slot="append" icon="el-icon-message"></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机号：" prop="mobile">
                  <el-input v-model="userForm.mobile">
                    <el-button
                      slot="append"
                      icon="el-icon-mobile-phone"
                    ></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="gutterVal">
              <el-col :span="12">
                <el-form-item label="办公电话：" prop="phone">
                  <el-input v-model="userForm.phone">
                    <el-button slot="append" icon="el-icon-phone"></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="权重（排序）：">
                  <el-input v-model="userForm.userWeight"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <ColumnBar :column-text="'详细信息'"></ColumnBar>
            <el-row :gutter="gutterVal">
              <el-col :span="12">
                <el-form-item label="员工工号：" prop="empNo">
                  <el-input v-model="userForm['empNo']"> </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="员工姓名：" prop="empName">
                  <el-input v-model="userForm['empName']"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="gutterVal">
              <el-col :span="12">
                <el-form-item label="所在岗位：">
                  <el-select v-model="employeePosts" multiple>
                    <el-option
                      v-for="item in employeePostsOptions"
                      :key="item.postCode"
                      :label="item.postName"
                      :value="item.postCode"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="英文名：" prop="empNameEn">
                  <el-input v-model="userForm['empNameEn']"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="附属机构：" prop="englishName">
                  <TableTree
                    :table-head="tableHead"
                    :table-data="employeeOfficeList"
                    :slot-columns="slotColumns"
                    :show-overflow="false"
                    :default-height="200"
                    :show-index="false"
                  >
                    <template slot="officeName" slot-scope="scope">
                      <el-input
                        v-model="scope.row.officeName"
                        @focus="attchEmployeeChoose(scope.row)"
                      >
                        <el-button
                          slot="append"
                          icon="el-icon-search"
                        ></el-button>
                      </el-input>
                    </template>
                    <template slot="postCode" slot-scope="scope">
                      <el-select v-model="scope.row.postName">
                        <el-option
                          v-for="item in employeePostsOptions"
                          :key="item.postName"
                          :label="item.postName"
                          :value="item.postCode"
                        />
                      </el-select>
                    </template>

                    <template slot="operate">
                      <el-table-column
                        fixed="right"
                        label="操作"
                        width="100"
                        align="center"
                      >
                        <template slot-scope="scope">
                          <el-button
                            type="text"
                            size="small"
                            @click="deleteAdd(scope.row)"
                          >
                            <i class="el-icon-delete"></i>
                          </el-button>
                        </template>
                      </el-table-column>
                    </template>
                  </TableTree>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-button
                  type="primary"
                  size="mini"
                  class="el-icon-plus"
                  style="margin-left: 140px;"
                  @click="addNew"
                >
                  增行
                </el-button>
              </el-col>
            </el-row>
            <el-col>
              <el-row :span="24" style="margin-top: 20px;" :rows="4">
                <el-form-item label="备注信息：" prop="remarks">
                  <el-input
                    v-model="userForm.remarks"
                    type="textarea"
                  ></el-input>
                </el-form-item>
              </el-row>
            </el-col>
            <AssignRoleDetail
              v-if="titleName === '新增'"
              ref="roleDetail"
              @tableCheckBoxVal="getCheckVal"
            ></AssignRoleDetail>
            <!-- @click="showExtentionDetail" -->
            <ColumnBar
              :column-text="'扩展字段'"
              :icon-tips="true"
              @showExtentionDetail="showExtentionDom"
            ></ColumnBar>
            <ExtentionFeild
              ref="extentionDom"
              :style="{ height: exHeight }"
              style="overflow: hidden;"
              :extention-form="extentionForm"
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
import ChooseMenuTree from "@/components/chooseMenuTree";
import { returnReg } from "@/utils/validate";
import { toTreeData, filterNokeyVal, stringVal } from "@/utils/pubFunc";
import { orgApi } from "@/api/organization";
import AssignRoleDetail from "./assignRoleDetail";

export default {
  name: "UserEdit",
  components: {
    DailogFrame,
    ColumnBar,
    TableTree,
    ExtentionFeild,
    ChooseMenuTree,
    AssignRoleDetail
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
      userDetail: {},
      test: [],
      exHeight: "0px",
      showEditDailog: false,
      innerDialogVisible: false,
      menuTreeTitle: "",
      keyVal: "",
      defaultExpand: ["1"],
      menuData: [],
      gutterVal: 100,
      stopOrStart: "",
      officeCodeClick: {},
      currentRow: {},
      extentionForm: {
        String1: "",
        String2: "",
        String3: "",
        String4: "",
        String5: "",
        String6: "",
        String7: "",
        String8: "",
        Integer1: "",
        Integer2: "",
        Integer3: "",
        Integer4: "",
        Float1: "",
        Float2: "",
        Float3: "",
        Float4: "",
        Date1: "",
        Date2: "",
        Date3: "",
        Date4: ""
      },
      attchCurrentRow: {},
      attchOfficeName: "",
      employeePostsOptions: [],
      employeePosts: [], // cfo 所在岗位
      employeeOfficeList: [], // 附属公司列表
      userForm: {
        op: "", // add  edit
        userType: "employee", // employee
        userCode: "",
        officeName: "", // 归属机构
        officeCode: "", //
        companyName: "", // 归属公司
        companyCode: "", //
        oldLoginCode: "",
        loginCode: "", // 登录账号
        userName: "", // 用户昵称
        email: "", //
        mobile: "", //
        phone: "", // 办公电话
        userWeight: "", // 权重
        empNo: "", // 员工编号
        empName: "", // 员工姓名
        empNameEn: "", // 英文名
        remarks: "", //
        userRoleString: "" // 角色编码 string1,string2
      },
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
      addCountIndex: 0
    };
  },
  mounted() {},
  methods: {
    /* 获取编辑详情 */
    getUserDetail(userCode, op) {},
    /* 显示对话框 */
    show(row, type) {
      this.showEditDailog = true;
      this.titleName = type;
      this.currentRow = row;
      if (type === "新增") {
        this.userForm.op = "add";
        this.userForm.userType = row.userType;
        this.userForm.userCode = row.userCode;
      } else {
        this.userForm.op = "edit";
        const obj = {
          userCode: row.userCode,
          op: this.userForm.op
          // _layer: true
        };
        console.log(409, obj);
        orgApi.getUserDetail(obj).then(res => {
          // this.userDetail = res;
          this.userForm.userType = res.empUser.userType;
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
          // this.userForm.userRoleString = res.empUser.userRoleString; // 所在岗位 select 多选
          // this.employeeOfficeList =
          //   row.empUser.employee.company.companyOfficeList;
          // this.userForm = res;
          console.log(406, res);
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
    /* 获取归属公机构列表 */
    getOfficeMenuTree() {
      this.menuData = this.$store.state.publicData.officeList;
      this.innerDialogVisible = true;
    },
    /*  触发选择归属公司*/
    companyChoose() {
      this.menuTreeTitle = "归属公司选择";
      this.menuData = this.$store.state.publicData.companyList;
      this.innerDialogVisible = true;
    },
    /* 关闭选择归属机构或者归属公司 */
    closeMuneTreeChoose() {
      this.innerDialogVisible = false;
    },
    /* changeKeyVal */
    changeKeyVal(val) {
      // console.log(379, val);
      this.keyVal = val;
    },
    /* 菜单树中当前点击的树节点*/
    clickNodeReslut(data) {
      if (this.menuTreeTitle === "机构选择") {
        this.userForm.officeName = data.label;
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
        if (row.flagId === this.employeeOfficeList[i].flagId) {
          this.employeeOfficeList.splice(this.employeeOfficeList[i], 1);
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
      this.extentionForm = val;
    },
    /* 获取角色checkbox */
    getCheckVal(checkboxVal) {
      // this.userForm.userRoleString = stringVal(checkboxVal, "id");
      this.employeePosts = stringVal(checkboxVal, "id");
      // console.log(12345, this.tableChecked);
    },
    /* 提交 */
    submitForm(formName) {
      // employeePosts
      console.log(9990, "this.employeeOfficeList ", this.officeCodeClick);
      this.$refs[formName].validate(valid => {
        if (valid) {
          const obj = filterNokeyVal(this.extentionForm);
          console.log("submit!", obj);
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
          // obj.userRoleString = this.userForm.userRoleString;
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

          // obj["employee.office.officeCode"] =
          //   this.userForm.officeCode || this.officeCodeClick.id;
          // obj["employee.office.officeName"] =
          //   this.userForm.officeName || this.officeCodeClick.label;
          // obj["employee.company.companyName"] =
          //   this.userForm.companyName || this.companyClick.label;
          // obj["employee.company.companyCode"] =
          //   this.userForm.companyCode || this.companyClick.id;
          // obj["employee.empNo"] = this.userForm.empNo || "";
          // obj["employee.empName"] = this.userForm.empName || "";
          // // obj["employee.employeePosts"] = this.employeePosts;
          // obj["employee.employeePosts"] = ["cfo", "dept"];
          // obj["employee.empNameEn"] = this.userForm.empNameEn || "";
          // obj["employe.employeeOfficeList"] = this.employeeOfficeList || []; // 附属岗位
          console.log(obj);
          orgApi.addNewUser(obj).then(res => {
            if (res.result === "false") {
              this.$message.warning(res.message);
            } else {
              this.$message.success(res.message);
            }
          });
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
      console.log(408);
      this.showEditDailog = false;
      this.$refs["userForm"].resetFields();
      this.attchCurrentRow = {};
      this.attchOfficeName = "";
      this.employeePosts = [];
      this.employeeOfficeList = [];
      this.$nextTick(() => {
        this.$refs.roleDetail.toggleSelection();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.user-edit-panel {
}
</style>
