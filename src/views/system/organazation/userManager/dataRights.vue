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
                <el-form-item label="登录账号：" prop="loginCode">
                  <el-input v-model="dataRightsForm.loginCode" :disabled="true">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="用户昵称：" prop="userName">
                  <el-input v-model="dataRightsForm.userName" :disabled="true">
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
                    :menu-data="officeMenuData"
                    :default-expand="defaultExpand1"
                    :expand-all="expandAll1"
                    :show-checkbox="true"
                    :checked-arr="officeCheckedArr"
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
                    :menu-data="companyMenuData"
                    :default-expand="defaultExpand2"
                    :expand-all="expandAll2"
                    :show-checkbox="true"
                    :checked-arr="companyCheckedArr"
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
      formDetail: null,
      dataRightsForm: {
        loginCode: "",
        userName: ""
      },
      rules: {
        loginCode: [{ required: true }],
        userName: [{ required: true }]
      },
      officeMenuData: [],
      officeCheckedArr: [],
      companyMenuData: [],
      companyCheckedArr: [],
      menuData: [
        // {
        //   label: "苑东生物",
        //   id: "1",
        // }
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
    init(res) {
      this.formDetail = JSON.parse(JSON.stringify(res));
      this.dataRightsForm.loginCode = this.formDetail.empUser.loginCode;
      this.dataRightsForm.userName = this.formDetail.empUser.userName;
      this.officeMenuData = this.$store.state.publicData.officeList;
      this.companyMenuData = this.$store.state.publicData.companyList;
      // 已经选择的 默认的
      const temp = this.formDetail.userDataScopeList;
      for (let i = 0, len = temp.length; i < len; i++) {
        if (temp[i]["ctrlType"] === "Company") {
          this.companyCheckedArr.push(temp[i].ctrlData);
        } else if (temp[i]["ctrlType"] === "Office") {
          this.officeCheckedArr.push(temp[i].ctrlData);
        }
      }
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
      console.log(196, this.tableCheckBoxValue);
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
