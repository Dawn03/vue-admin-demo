<template>
  <div class="data-rights-panel">
    <DailogFrame
      :dialog-visible="showDataRights"
      :title-name="'用户分配数据权限'"
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
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="登录账号：" prop="loginAccount">
                  <el-input
                    v-model="dataRightsForm.loginAccount"
                    :disabled="true"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="用户昵称：" prop="userAlias">
                  <el-input v-model="dataRightsForm.userAlias" :disabled="true">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <ColumnBar :column-text="'数据权限'"></ColumnBar>
          <el-row style="margin-top:20px;">
            <el-col :span="12">
              <el-row :gutter="200">
                <el-col :span="12">
                  <el-checkbox
                    v-model="checkAll1"
                    @change="handleCheckAllChange1"
                  >
                    机构权限
                  </el-checkbox>
                </el-col>
                <el-col :span="12">
                  <span class="ctrol-btn" @click="switchStatus1">
                    展开 / 折叠
                  </span>
                </el-col>
              </el-row>
              <el-row style="margin-top:20px;">
                <el-col :span="24">
                  <MenuTree
                    ref="menuTreeDom1"
                    :menu-data="menuData"
                    :default-expand="defaultExpand1"
                    :expand-all="expandAll1"
                    :show-checkbox="true"
                  ></MenuTree>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row :gutter="200">
                <el-col :span="12">
                  <el-checkbox
                    v-model="checkAll2"
                    @change="handleCheckAllChange2"
                  >
                    公司权限
                  </el-checkbox>
                </el-col>
                <el-col :span="12">
                  <span class="ctrol-btn" @click="switchStatus2">
                    展开 / 折叠
                  </span>
                </el-col>
              </el-row>
              <el-row style="margin-top:20px;">
                <el-col :span="24">
                  <MenuTree
                    ref="menuTreeDom2"
                    :menu-data="menuData"
                    :default-expand="defaultExpand2"
                    :expand-all="expandAll2"
                    :show-checkbox="true"
                  ></MenuTree>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
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
import ColumnBar from "@/components/commonColumn";
import DailogFrame from "@/components/dailogPanel/frame";
import MenuTree from "@/components/menuTree";
export default {
  name: "DataRights",
  components: {
    DailogFrame,
    ColumnBar,
    MenuTree
  },
  data() {
    return {
      showDataRights: false,
      checked: true,
      dataRightsForm: {
        loginAccount: "",
        userAlias: ""
      },
      rules: {
        loginAccount: [{ required: true }],
        userAlias: [{ required: true }]
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
      ],
      checkAll1: false,
      checkAll2: false,
      defaultExpand1: [],
      defaultExpand2: [],
      expandAll1: false,
      expandAll2: false
    };
  },
  methods: {
    init(row) {
      //   console.log(99, row);
      this.dataRightsForm = JSON.parse(JSON.stringify(row));
      this.showDataRights = true;
    },
    /* 展开或收起选项 */
    switchStatus1() {
      this.expandAll1 = !this.expandAll1;
      this.$refs.menuTreeDom1.showOrHiddenAllNodes();
    },
    switchStatus2() {
      this.expandAll2 = !this.expandAll2;
      this.$refs.menuTreeDom2.showOrHiddenAllNodes();
    },
    /* 保存 */
    saveDataRights() {
      this.$refs.menuTreeDom1.getCheckedKeys();
      this.colseDataRights();
    },
    colseDataRights(formName) {
      this.showDataRights = false;
      this.tableCheckBoxValue = [];
    },
    /* 设置全选反选 */
    handleCheckAllChange1(val) {
      this.$refs.menuTreeDom1.checkAll(val);
    },
    /* 设置全选反选 */
    handleCheckAllChange2(val) {
      this.$refs.menuTreeDom2.checkAll(val);
    }
  }
};
</script>
<style lang="scss" scoped>
.data-rights-panel {
  .ctrol-btn {
    cursor: pointer;
    line-height: 30px;
  }
}
</style>
