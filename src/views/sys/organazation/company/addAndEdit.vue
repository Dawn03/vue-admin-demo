<template>
  <div class="company-edit-panel">
    <DailogFrame
      :dialog-visible="showEditDailog"
      :title-name="titleType"
      @closeDialog="closeEditDialog"
    >
      <template slot="content">
        <el-form
          ref="institutionForm"
          :model="companyForm"
          label-width="100px"
          class="demo-ruleForm"
          size="mini"
          :rules="companyFormRules"
        >
          <DymForm
            :edit-model="editModel"
            :component-list="componentList"
            :form-value.sync="companyForm"
            @focusIt="focusIt"
          >
          </DymForm>
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
      </template>
      <template slot="footer">
        <div style="text-indent: 100px;">
          <el-button
            type="primary"
            icon="el-icon-check"
            size="mini"
            @click="submitForm('institutionForm')"
          >
            保存
          </el-button>
          <el-button
            type="primary"
            icon="el-icon-close"
            size="mini"
            @click="colseOffice('institutionForm')"
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
import DymForm from "@/components/element/dymForm";
import ChooseMenuTree from "@/components/chooseMenuTree";
import ExtentionFeild from "@/components/extentionFeild";
import { returnReg } from "@/utils/validate";
import { orgApi } from "../../../../api/organization";
import { pubApi } from "@/api/public_request";
export default {
  name: "UserEdit",
  components: {
    DailogFrame,
    DymForm,
    ColumnBar,
    ExtentionFeild,
    ChooseMenuTree
  },
  props: {
    officeOptions: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  data() {
    const treeSortValidator = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("必填信息"));
      } else if (!returnReg("positiveInteger").test(value)) {
        callback(new Error("请输入一个正整数!"));
      } else {
        callback();
      }
    };
    const phoneValidator = (rule, value, callback) => {
      console.log(124, value);
      if (value && !returnReg("mobile").test(value)) {
        callback(
          new Error(
            "sdsd 请正确填写您的电话号码，固话为区号(3-4位)号码(7-9位),手机为13,14,15,16,17,18,19号段"
          )
        );
      } else if (value && !returnReg("phone").test(value)) {
        callback(
          new Error(
            "sdsd 请正确填写您的电话号码，固话为区号(3-4位)号码(7-9位),手机为13,14,15,16,17,18,19号段"
          )
        );
      } else {
        callback();
      }
    };
    return {
      showEditDailog: false,
      innerDialogVisible: false,
      menuTreeTitle: "",
      menuData: [],
      keyVal: "",
      defaultExpand: ["1"],
      editModel: "E",
      companyForm: {
        // 必填 名称 编码 全称 排序号
        parent: {
          id: "id", // 上级机构
          officeName: ""
        },
        companyName: "",
        fullName: "",
        treeSort: "",
        area: "",
        updateDate: ""
      },
      componentList: [
        {
          label: "上级公司：",
          prop: "companyName",
          labelWidth: "90px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          placeholder: "请输入",
          value: "companyName",
          addIcon: true,
          slotPosition: "append",
          iconType: "el-icon-search"
        },
        {
          label: "",
          prop: "",
          labelWidth: "90px",
          componentName: "",
          cols: [12, 12, 12, 12],
          placeholder: "",
          value: "",
          height: "28px"
        },
        {
          label: "公司名称：",
          prop: "companyName",
          labelWidth: "90px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          placeholder: "请输入",
          value: "companyName"
        },
        {
          label: "公司编码：",
          prop: "roleCode",
          labelWidth: "90px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          placeholder: "请输入",
          value: "roleCode"
        },
        {
          label: "公司全称：",
          prop: "fullname",
          labelWidth: "90px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          placeholder: "请输入",
          value: "fullname"
        },
        {
          label: "排序号：",
          prop: "roleCode",
          labelWidth: "90px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          placeholder: "请输入",
          value: "roleCode"
        },
        {
          label: "归属区域：",
          prop: "roleCode",
          labelWidth: "90px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          placeholder: "请输入",
          value: "roleCode",
          addIcon: true,
          slotPosition: "append",
          iconType: "el-icon-search"
        },
        {
          label: "包含机构：",
          prop: "include",
          labelWidth: "90px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          placeholder: "请输入",
          value: "include",
          addIcon: true,
          slotPosition: "append",
          iconType: "el-icon-search"
        },
        {
          label: "备注信息：",
          prop: "roleCode",
          labelWidth: "90px",
          componentName: "el-input",
          rowsSpan: 4,
          type: "textarea",
          cols: [24, 24, 24, 24],
          placeholder: "请输入",
          value: "roleCode"
        }
      ],
      titleType: "",
      exHeight: "0px",
      defaultExpand: ["1"],
      gutterVal: 100,
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
      companyFormRules: {
        companyName: [{ required: true, message: "必填信息", trigger: "blur" }],
        include: [{ required: true, message: "必填信息", trigger: "blur" }],
        fullName: [{ required: true, message: "必填信息", trigger: "blur" }],
        companyCode: [{ required: true, message: "请选择", trigger: "change" }],
        treeSort: [
          { required: true, validator: treeSortValidator, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getOfficeMenuTree();
  },
  methods: {
    /* 显示对话框 */
    show(row, type) {
      console.log(303);
      this.showEditDailog = true;
      // 编辑机构  新增下级机构  新增机构
      this.titleType = type;
      if (type === "新增机构") {
        this.showEditDailog = true;
      }
      if (type === "编辑机构" || type === "新增下级机构") {
        /* 获取机构详情 */
        orgApi
          .getOfficeDetail({
            officeCode: row.officeCode
          })
          .then(res => {
            // console.log(321, res);
            const result = JSON.parse(JSON.stringify(res.office));
            for (const key in res.office.extend) {
              result.extend[key] = res.office.extend[key];
            }
            if (res.office.parentCode) {
              const officeSource = this.officeSource.filter(item => {
                return item.id === res.office.parentCode;
              });
              result.parent = {
                id: officeSource[0].id,
                officeName: officeSource[0].name
              };
            } else {
              result.parent = {
                id: "",
                officeName: ""
              };
            }

            // this.institutionForm = result;
            this.showEditDailog = true;
          });
      }
    },
    focusIt(keyNaame) {
      this.$nextTick(() => {
        this.innerDialogVisible = true;
        // this.menuData = this.$store.state.publicData.officeList;
      });
      console.log(300, keyNaame);
    },
    getOfficeMenuTree() {
      pubApi.getOfficeMenuTree().then(res => {
        this.officeSource = res;
      });
    },
    /* 关闭编辑对话框 */
    closeEditDialog() {
      this.colseOffice("institutionForm");
      this.showEditDailog = false;
    },
    /* 触发选择上级机构 */
    institutionChoose() {
      this.$nextTick(() => {
        this.menuData = this.$store.state.publicData.officeList;
        this.innerDialogVisible = true;
      });
    },
    /* 关闭上级机构选择 */
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
      // this.institutionForm.parent.id = data.id;
      // this.institutionForm.parent.officeName = data.label;
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
      // this.institutionForm.tableData.push(obj);
      this.addCountIndex++;
      // console.log(this.institutionForm.tableData);
    },
    /* 显示扩展字段 */
    showExtentionDom() {
      this.exHeight = this.exHeight === "0px" ? "480px" : "0px";
    },
    /* 扩展字段值 */
    extentionFormVal(val) {
      // this.institutionForm.extend = val;
    },
    /* 提交 */
    submitForm(formName) {
      // console.log(1, formName, this.$refs[formName]);
      this.$refs[formName].validate(valid => {
        // console.log(2);
        if (valid) {
          // console.log(3);
          if (this.titleType === "新增机构") {
            // this.institutionForm.isNewRecord = true;
          } else {
            // this.institutionForm.isNewRecord = false;
          }
          // orgApi.saveOfficeAdd(this.institutionForm).then(res => {
          //   if (res.result === "true") {
          //     this.$message.success(res.message);
          //     this.$emit("initPage", {
          //       status: "",
          //       ctrlPermi: 2
          //     });
          //     this.showEditDailog = false;
          //   } else {
          //     this.$message.warning(res.message);
          //   }
          //   this.colseOffice("institutionForm");
          // });
        } else {
          // console.log(4);
          console.log("error submit!!");
          return false;
        }
      });
    },
    colseOffice(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields(); // 清空表单
        this.showEditDailog = false;
      });
      // this.institutionForm.parent.id = "";
      // this.institutionForm.parent.officeName = "";
    }
  }
};
</script>
<style lang="scss" scoped>
.company-edit-panel {
}
</style>
