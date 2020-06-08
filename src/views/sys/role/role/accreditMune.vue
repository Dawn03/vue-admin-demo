<template>
  <div class="data-rights-panel">
    <DailogFrame
      :dialog-visible="showDataRights"
      :title-name="'角色分配功能权限'"
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
                <el-form-item label="角色名称：" prop="roleName">
                  <el-input v-model="dataRightsForm.roleName" :disabled="true">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="角色编码：" prop="roleCode">
                  <el-input v-model="dataRightsForm.roleCode" :disabled="true">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <ColumnBar :column-text="'授权功能菜单'"></ColumnBar>
          <MenuRights></MenuRights>
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
import MenuRights from "@/components/menuRights";
export default {
  name: "DataRights",
  components: {
    DailogFrame,
    ColumnBar,
    MenuTree,
    MenuRights
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
  methods: {
    init(row) {
      //   console.log(99, row);
      this.dataRightsForm = JSON.parse(JSON.stringify(row));
      this.showDataRights = true;
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
