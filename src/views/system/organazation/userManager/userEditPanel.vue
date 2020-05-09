<template>
  <div class="user-edit-panel">
    <DailogFrame
      :dialog-visible="showEditDailog"
      :title-name="'编辑用户'"
      @closeDialog="closeEditDialog"
    >
      <template slot="content">
        <div>
          <ColumnBar :column-text="'基本信息'"></ColumnBar>
          <el-form
            ref="userForm"
            :model="userForm"
            label-width="120px"
            class="demo-ruleForm"
            size="mini"
            :rules="rules"
          >
            <el-row :gutter="gutterVal">
              <el-col :span="12">
                <el-form-item label="归属机构：" prop="institution">
                  <el-input
                    v-model="userForm.institution"
                    @focus="institutionChoose"
                  >
                    <el-button slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="归属公司：">
                  <el-input v-model="userForm.company" @focus="companyChoose">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="gutterVal">
              <el-col :span="12">
                <el-form-item label="登录账号：" prop="account">
                  <el-input v-model="userForm.account"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="用户昵称：" prop="alias">
                  <el-input v-model="userForm.alias"></el-input>
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
                <el-form-item label="手机号：" prop="phone">
                  <el-input v-model="userForm.phone">
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
                <el-form-item label="办公电话：" prop="telNumber">
                  <el-input v-model="userForm.telNumber">
                    <el-button slot="append" icon="el-icon-phone"></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="权重（排序）：" prop="weight">
                  <el-input v-model="userForm.weight"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <ColumnBar :column-text="'详细信息'"></ColumnBar>

            <el-row :gutter="gutterVal">
              <el-col :span="12">
                <el-form-item label="员工工号：" prop="employeeIDNumber">
                  <el-input v-model="userForm.employeeIDNumber"> </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="员工姓名：" prop="employeeName">
                  <el-input v-model="userForm.employeeName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="gutterVal">
              <el-col :span="12">
                <el-form-item label="所在岗位：" prop="job">
                  <el-input v-model="userForm.job"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="英文名：" prop="englishName">
                  <el-input v-model="userForm.englishName"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="附属机构：" prop="englishName">
                  <TableTree
                    :table-head="tableHead"
                    :table-data="userForm.tableData"
                    :slot-columns="slotColumns"
                  >
                    <template slot="affiation" slot-scope="scope">
                      <el-input v-model="scope.row.affiation">
                        <el-button
                          slot="append"
                          icon="el-icon-search"
                        ></el-button>
                      </el-input>
                    </template>
                    <template slot="jobs" slot-scope="scope">
                      <el-input v-model="scope.row.jobs">
                        <el-button
                          slot="append"
                          icon="el-icon-search"
                        ></el-button>
                      </el-input>
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
                  style="margin-left: 100px;"
                  @click="addNew"
                >
                  增行
                </el-button>
              </el-col>
            </el-row>
            <el-col>
              <el-row :span="24" style="margin-top: 20px;" :rows="4">
                <el-form-item label="备注信息：" prop="remark">
                  <el-input
                    v-model="userForm.remark"
                    type="textarea"
                  ></el-input>
                </el-form-item>
              </el-row>
            </el-col>

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
              :extention-form="userForm.extentionForm"
              @extentionFormVal="extentionFormVal"
            ></ExtentionFeild>
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
import { createKey } from "@/utils/pubFunc";
export default {
  name: "UserEdit",
  components: {
    DailogFrame,
    ColumnBar,
    TableTree,
    ExtentionFeild,
    ChooseMenuTree
  },
  data() {
    return {
      exHeight: "0px",
      showEditDailog: false,
      innerDialogVisible: false,
      menuTreeTitle: "",
      keyVal: "",
      defaultExpand: ["1"],
      menuData: [],
      gutterVal: 100,
      userForm: {
        institution: "",
        company: "",
        account: "",
        alias: "",
        email: "",
        phone: "",
        telNumber: "",
        employeeIDNumber: "",
        employeeName: "",
        job: "",
        englishName: "",
        tableData: [],
        remark: "",
        extentionForm: [
          {
            lable: "String1",
            value: "",
            type: "input"
          }
        ]
      },
      rules: {
        institution: [
          { required: true, message: "必填信息", trigger: "change" },
          {
            // pattern: returnReg("otaGrade"),
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        account: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 4, max: 20, message: "长度在 4 到 20 个字符", trigger: "blur" }
        ],
        alias: [{ required: true, message: "请选择活动区域", trigger: "blur" }],
        email: [
          {
            pattern: returnReg("email"),
            message: "请输入正确的邮箱",
            trigger: "blur"
          }
        ],
        phone: [
          {
            pattern: returnReg("phone"),
            message: "输入正确的手机号",
            trigger: "blur"
          }
        ],
        telNumber: [
          {
            pattern: returnReg("phone"),
            message:
              "请正确填写您的电话号码，固话为区号(3-4位)号码(7-9位),手机为13,14,15,16,17,18,19号段",
            trigger: "blur"
          },
          {
            pattern: returnReg("telNumber"),
            message:
              "请正确填写您的电话号码，固话为区号(3-4位)号码(7-9位),手机为13,14,15,16,17,18,19号段",
            trigger: "blur"
          }
        ],
        weight: [{ message: "请选择活动资源", trigger: "change" }],
        desc: [{ message: "请填写活动形式", trigger: "blur" }]
      },
      slotColumns: ["affiation", "jobs"],
      tableHead: {
        affiation: "附属机构",
        jobs: "所属岗位"
      },
      // tableData: [],
      addCountIndex: 0
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
      this.userForm.extentionForm = concatArr;
    },
    /* 显示对话框 */
    show(row) {
      this.showEditDailog = true;
      console.log(row);
    },
    /* 关闭编辑对话框 */
    closeEditDialog() {
      this.showEditDailog = false;
    },
    /* 触发选择归属机构 */
    institutionChoose() {
      this.menuTreeTitle = "机构选择";
      console.log(323);
      this.menuData = [
        {
          label: "苑东生物",
          id: "1",
          children: [
            {
              id: "1-1",
              label: "成都硕德",
              children: [
                {
                  id: "1-1-1",
                  label: "质量保证部"
                },
                {
                  id: "1-1-2",
                  label: "财务部"
                }
              ]
            },
            {
              id: "2-1",
              label: "成都优洛生物",
              children: [
                {
                  id: "2-1-1",
                  label: "质量保证部"
                },
                {
                  id: "2-1-2",
                  label: "财务部"
                },
                {
                  id: "2-1-3",
                  label: "生产技术部"
                }
              ]
            }
          ]
        }
      ];
      this.innerDialogVisible = true;
      // console.log(531);
    },
    /*  触发选择归属公司*/
    companyChoose() {
      this.menuTreeTitle = "公司选择";
      this.innerDialogVisible = true;
      this.menuData = [
        {
          label: "苑东生物",
          id: "1",
          children: [
            {
              id: "1-1",
              label: "四川阳光润禾"
            },
            {
              id: "1-2",
              label: "四川青木制药"
            },
            {
              id: "1-3",
              label: "西藏润禾"
            },
            {
              id: "1-4",
              label: "成都硕德"
            },
            {
              id: "1-5",
              label: "成都优诺生物"
            }
          ]
        }
      ];
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
      // console.log(384, data);
      if (this.menuTreeTitle === "机构选择") {
        this.userForm.institution = data.label;
      } else {
        this.userForm.company = data.label;
      }
      this.closeMuneTreeChoose();
      this.keyVal = "";
    },
    /* 新增 */
    addNew() {
      const obj = {
        affiation: "",
        jobs: "",
        id: this.addCountIndex
      };
      this.userForm.tableData.push(obj);
      this.addCountIndex++;
      // console.log(this.userForm.tableData);
    },
    /* 删除新增 */
    deleteAdd(row) {
      // console.log(row);
      for (let i = 0, len = this.userForm.tableData.length; i < len; i++) {
        if (row.id === this.userForm.tableData[i].id) {
          this.userForm.tableData.splice(this.userForm.tableData[i], 1);
          return;
        }
      }
    },
    /* 显示扩展字段 */
    showExtentionDom() {
      this.exHeight = this.exHeight == "0px" ? "480px" : "0px";
    },
    /* 扩展字段值 */
    extentionFormVal(val) {
      this.userForm.extentionForm = val;
    },
    /* 提交 */
    submitForm(formName) {
      // console.log(467, this.userForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit!");
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
