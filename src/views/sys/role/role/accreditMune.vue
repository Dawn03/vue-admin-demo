<template>
  <div class="data-rights-panel">
    <DailogFrame
      :dialog-visible="showDataRights"
      :title-name="titleName"
      @closeDialog="colseDataRights"
    >
      <template slot="content">
        <div>
          <el-form
            ref="dataRightsForm"
            :model="dataRightsForm"
            label-width="100px"
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
          </el-form>
          <ColumnBar :column-text="columnBarName"></ColumnBar>
          <!-- 授权一个  二级权限管理三个 -->
          <MenuRights
            ref="menuRights"
            :t-name1="tName1"
            :t-name2="tName2"
            :t-name3="tName3"
            :menu-tree1="menuTree1"
            :menu-tree2="menuTree2"
            :menu-tree3="menuTree3"
            :checked-memu1="checkedMemu1"
            :checked-memu2="checkedMemu2"
            :checked-memu3="checkedMemu3"
            v-on="$listeners"
          ></MenuRights>
        </div>
      </template>
      <template slot="footer">
        <div style="text-indent: 100px;">
          <el-button
            type="primary"
            icon="el-icon-check"
            size="mini"
            @click="saveDataRights('userForm')"
          >
            保存
          </el-button>
          <el-button
            type="primary"
            icon="el-icon-close"
            size="mini"
            @click="colseDataRights('userForm')"
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

import dymForm from "@/components/element/dymForm";
import ColumnBar from "@/components/commonColumn";
import DailogFrame from "@/components/dailogPanel/frame";
import MenuRights from "@/components/menuRights";
export default {
  name: "DataRights",
  components: {
    DailogFrame,
    ColumnBar,
    MenuRights,
    dymForm
  },
  props: {
    columnBarName: {
      type: String,
      default: "板块标题"
    },
    tName1: {
      type: String,
      default: ""
    },
    tName2: {
      type: String,
      default: ""
    },
    tName3: {
      type: String,
      default: ""
    },
    titleName: {
      type: String,
      default: "提示"
    },
    menuTree1: {
      type: [Array, Object],
      default: () => {
        return {};
      }
    },
    menuTree2: {
      type: [Array, Object],
      default: () => {
        return {};
      }
    },
    menuTree3: {
      type: [Array, Object],
      default: () => {
        return {};
      }
    },
    checkedMemu1: {
      type: [Array, Object],
      default: () => {
        return {};
      }
    },
    checkedMemu2: {
      type: [Array, Object],
      default: () => {
        return {};
      }
    },
    checkedMemu3: {
      type: [Array, Object],
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      editModel: "E",
      showDataRights: false,
      checked: true,
      dataRightsForm: {
        loginAccount: "",
        userAlias: ""
      },
      componentList: [
        {
          label: "角色名称：",
          prop: "roleName",
          labelWidth: "90px",
          disabled: true,
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          maxlength: "64",
          placeholder: "请输入",
          value: "roleName"
        },
        {
          label: "角色编码：",
          prop: "roleCode",
          labelWidth: "90px",
          disabled: true,
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          placeholder: "请输入",
          value: "roleCode"
        }
      ],
      rules: {
        roleName: [{ required: true }],
        roleCode: [{ required: true }]
      },
      menuData: [
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
                  label:
                    "财务部sdsw服务无法污染物让人VR分热污染无若无所我认为若无"
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
      ]
    };
  },
  computed: {
    // checkedMemuData: {
    //   get() {
    //     return this.checkedMemu1;
    //   },
    //   set(val) {
    //     console.log(143, val);
    //   }
    // }
  },
  methods: {
    init(row) {
      this.dataRightsForm = JSON.parse(JSON.stringify(row));
      this.showDataRights = true;
      this.$nextTick(() => {
        // console.log(218, this.checkedMemu1);
        this.$refs.menuRights.setDefaultChecked();
      });
    },
    /* 保存 */
    saveDataRights() {
      // this.$refs.menuTreeDom1.getCheckedKeys();
      this.colseDataRights();
    },
    colseDataRights(formName) {
      this.showDataRights = false;
      this.tableCheckBoxValue = [];
    }
  }
};
</script>
<style></style>
<style lang="scss" scoped>
.data-rights-panel {
  .ctrol-btn {
    cursor: pointer;
    line-height: 30px;
    display: inline-block;
    text-align: right;
    width: 85%;
  }
}
</style>
