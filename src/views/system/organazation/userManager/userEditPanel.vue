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
                <el-form-item label="权重（排序）：" prop="userWeight">
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
                <el-form-item label="所在岗位：" prop="employeePosts">
                  <el-select v-model="employeePosts" multiple>
                    <el-option
                      v-for="item in employeePostsOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
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
                      <el-select v-model="scope.row.postCode">
                        <el-option
                          v-for="item in employeePostsOptions"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
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
// import { } from "module";
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
    //    op: add
    // userType: employee
    // userCode:
    // employee.office.officeName: 质量保证部
    // employee.office.officeCode: CDSD01
    // employee.company.companyName: 四川阳光润禾
    // employee.company.companyCode: SCRH
    // oldLoginCode:
    // loginCode: 登录账号：
    // userName: 用户昵称
    // email: 17715333082@163.com
    // mobile: 19915413362
    // phone: 08277648513
    // userWeight: 0
    // employee.empNo: 员工工号
    // employee.empName: 员工姓名
    // !employee.employeePosts:
    // employee.employeePosts: cfo
    // employee.empNameEn: 英文名
    // employee.employeeOfficeList[0].officeName: 质量保证部
    // employee.employeeOfficeList[0].officeCode: CDYL01
    // employee.employeeOfficeList[0].postCode: ceo
    // remarks: 备注信息
    // userRoleString: corpAdmin,demo,dept,test,user,mdemo
    // extend.extendS1: String 1
    // extend.extendS2: String 2
    // extend.extendS3:
    // extend.extendS4:
    // extend.extendS5:
    // extend.extendS6:
    // extend.extendS7:
    // extend.extendS8:
    // extend.extendI1:
    // extend.extendI2:
    // extend.extendI3:
    // extend.extendI4:
    // extend.extendF1:
    // extend.extendF2:
    // extend.extendF3:
    // extend.extendF4:
    // extend.extendD1: 2020-05-08
    // extend.extendD2:
    // extend.extendD3:
    // extend.extendD4:
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
      test: [],
      exHeight: "0px",
      showEditDailog: false,
      innerDialogVisible: false,
      menuTreeTitle: "",
      keyVal: "",
      defaultExpand: ["1"],
      menuData: [],
      gutterVal: 100,

      officeCodeClick: {},
      companyClick: {},
      currentRow: {},
      extentionForm: {
        String11: "",
        String12: "",
        String13: "",
        String14: "",
        String15: "",
        String16: "",
        String17: "",
        String18: "",
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
        op: "add", // add  edit
        userType: "employee", // employee
        userCode: "",
        officeName: "", // 企管部
        officeCode: "", // SDQD01
        companyName: "", // 山东公司
        companyCode: "", // SD
        loginCode: "三生三世", // 登录账号
        userName: "323r23rq", // 用户昵称
        email: "17715333082@163.com", // 17715333082@163.com
        mobile: "19915413362", // 19915413362
        phone: "", // 08277648513
        userWeight: "23", // 22
        empNo: "23", // mdemo
        empName: "ww", // 管员工姓名

        empNameEn: "englishName", // 英文名
        remarks: "备注内容", //
        jqg_roleGrid_corp01: "", // on
        jqg_roleGrid_dept: "", // on
        jqg_roleGrid_user: "", // on
        userRoleString: "" // 角色编码 corp01
        // employeeOfficeList: [] // [],

        // op: "", // add  edit
        // userType: "employee", // employee
        // userCode: "", //
        // officeName: "", // 企管部
        // officeCode: "", // SDQD01
        // companyName: "", // 山东公司
        // companyCode: "", // SD
        // loginCode: "", // 登录账号
        // userName: "", // 用户昵称
        // email: "", // 17715333082@163.com
        // mobile: "", // 19915413362
        // phone: "", // 08277648513
        // userWeight: "", // 22
        // empNo: "", // mdemo
        // empName: "", // 管员工姓名
        // employeePosts: [], // cfo
        // empNameEn: "", // 英文名
        // remarks: "", //
        // jqg_roleGrid_corp01: "", // on
        // jqg_roleGrid_corp01: "", // on
        // jqg_roleGrid_dept: "", // on
        // jqg_roleGrid_user: "", // on
        // userRoleString: "", // 角色编码 corp01
        // employeeOfficeList: [] // [],
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
        userWeight: [{ message: "请选择活动资源", trigger: "change" }]
      },
      slotColumns: ["officeName", "postCode"],
      tableHead: {
        officeName: "附属机构",
        postCode: "附属岗位"
      },
      addCountIndex: 0
    };
  },
  mounted() {
    this.getEmployeePosts();
  },
  methods: {
    // 获取岗位
    getEmployeePosts() {
      orgApi.getEmployeePosts().then(res => {
        this.employeePostsOptions = res;
      });
    },
    /* 显示对话框 */
    show(row, type) {
      this.showEditDailog = true;
      this.titleName = type;
      this.userForm.op = type === "新增" ? "add" : "edit";
      this.currentRow = row;
      console.log(row);
    },
    /* 关闭编辑对话框 */
    closeEditDialog() {
      this.showEditDailog = false;
    },
    /* 触发选择归属机构 */
    institutionChoose(typeText) {
      this.menuTreeTitle = "机构选择";
      this.getInstitutionMenuList();
    },
    /*  触发选择附属公司选择*/
    attchEmployeeChoose(row) {
      this.getInstitutionMenuList();
      this.menuTreeTitle = "附属机构选择";
      this.attchCurrentRow = row;
      // 选择之后值的归属问题
      console.log(523, row);
    },
    /* 获取归属公司列表 */
    getInstitutionMenuList() {
      orgApi.getInstitutionMenuTree().then(res => {
        const attributes = {
          id: "id",
          parentId: "pId",
          label: "name",
          rootId: "0"
        };
        this.menuData = toTreeData(res, attributes);
        this.innerDialogVisible = true;
      });
    },
    /*  触发选择归属公司*/
    companyChoose() {
      this.menuTreeTitle = "归属公司选择";
      orgApi.getCompanyMenuTree().then(res => {
        const attributes = {
          id: "id",
          parentId: "pId",
          label: "name",
          rootId: "0"
        };
        this.menuData = toTreeData(res, attributes);
        this.innerDialogVisible = true;
      });
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
      // console.log(384, data, this.menuTreeTitle);
      if (this.menuTreeTitle === "机构选择") {
        this.userForm.officeName = data.label;
        this.officeCodeClick = data;
      } else if (this.menuTreeTitle === "附属机构选择") {
        for (let i = 0, len = this.employeeOfficeList.length; i < len; i++) {
          if (
            this.attchCurrentRow.flagId === this.employeeOfficeList[i].flagId
          ) {
            console.log(567, data);
            this.employeeOfficeList[i].officeName = data.label;
            this.employeeOfficeList[i].officeCode = data.id;
            this.innerDialogVisible = false;
            return;
          }
        }
      } else {
        this.companyClick = data;
        this.userForm.companyName = data.label;
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
      console.log(this.employeeOfficeList);
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
      console.log("扩展字段值", val);
      this.extentionForm = val;
    },
    /* 获取角色checkbox */
    getCheckVal(checkboxVal) {
      this.userForm.userRoleString = stringVal(checkboxVal, "id");
      // console.log(12345, this.tableChecked);
    },
    /* 提交 */
    submitForm(formName) {
      // this.userForm.userRoleString
      // return;
      console.log(9990, this.employeeOfficeList);
      this.$refs[formName].validate(valid => {
        if (valid) {
          const obj = filterNokeyVal(
            Object.assign(this.extentionForm, this.userForm)
          );
          console.log("submit!", obj);
          obj["employee.office.officeCode"] = this.officeCodeClick.id;
          obj["employee.office.officeName"] = this.officeCodeClick.label;
          obj["employee.company.companyName"] = this.companyClick.label;
          obj["employee.company.companyCode"] = this.companyClick.id;
          obj["employee.empNo"] = this.userForm.empNo;
          obj["employee.empName"] = this.userForm.empName;
          obj["employee.employeePosts"] = this.userForm.employeePosts;
          obj["employee.empNameEn"] = this.userForm.empNameEn;
          obj["employe.employeeOfficeList"] = this.employeeOfficeList;
          console.log(obj);
          orgApi.addNewUser(obj).then(res => {
            console.log(604, res);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    colseUser(formName) {
      this.showEditDailog = false;
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.user-edit-panel {
}
</style>
