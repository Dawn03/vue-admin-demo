/*新增用户*/
<template>
  <div class="add-user-box">
    <DailogPanel
      :dialog-visible="showDailog"
      :title-name="titleName"
      :app-to-body="true"
      @closeDialog="closeDialog"
    >
      <template slot="content">
        <InputFliter :form-item="formInline" style="margin-bottom: 10px;">
          <template slot="btnGroups">
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="searchBtn"
            >
              查询
            </el-button>
            <el-button size="mini" @click="resetForm"> 重置 </el-button>
          </template>
        </InputFliter>
        <el-row type="flex" :gutter="20">
          <el-col :span="18">
            <TableTree
              ref="tableDomTree"
              :table-head="tableHead"
              :table-data="tableData"
              :slot-columns="slotColumns"
              @tableCheckBox="tableCheckBox"
            >
              <template slot="chechbox">
                <el-table-column type="selection" width="40"></el-table-column>
              </template>
              <template slot="status" slot-scope="scope">
                <el-button size="mini" type="success" round>
                  {{ scope.row.status }}
                </el-button>
              </template>
            </TableTree>
          </el-col>
          <el-col :span="6">
            <div class="choosed-data">
              <el-tag
                v-for="(tag, index) in tableCheckBoxValue"
                :key="index"
                style="margin: 0  10px 10px 0;"
                closable
                @close="handleClose(tag)"
              >
                {{ tag.loginAccount }}
              </el-tag>
            </div>
          </el-col>
        </el-row>
      </template>
    </DailogPanel>
  </div>
</template>
<script>
import DailogPanel from "@/components/dailogPanel/frame";
import InputFliter from "@/components/inputFliter";
import TableTree from "@/components/tableTree";
import { clearFilterVal, getInputVal } from "@/utils/pubFunc";
export default {
  name: "",
  components: {
    DailogPanel,
    InputFliter,
    TableTree
  },
  data() {
    return {
      showDailog: false,
      titleName: "用户选择",
      formInline: [
        {
          type: "input",
          value: "",
          key: "acount",
          label: "账号"
        },
        {
          type: "input",
          value: "",
          key: "alias",
          label: "昵称"
        },
        {
          type: "input",
          value: "",
          key: "emial",
          label: "邮箱"
        },
        {
          type: "input",
          value: "",
          key: "phone",
          label: "手机"
        },
        {
          type: "input",
          value: "",
          key: "tel",
          label: "电话"
        }
      ],
      tableCheckBoxValue: [],
      slotColumns: ["status"],
      tableHead: {
        loginAccount: "登录账号",
        alias: "用户昵称",
        email: "电子邮箱",
        phome: "手机号码",
        tel: "办公电话",
        updataTime: "更新时间",
        status: "状态"
      },
      tableData: [
        {
          loginAccount: "dsd",
          alias: "用户昵称",
          email: "电子邮箱",
          phome: "手机号码",
          tel: "办公电话",
          updataTime: "更新时间",
          status: "状态"
        },
        {
          loginAccount: "fsfff",
          alias: "用户昵称",
          email: "电子邮箱",
          phome: "手机号码",
          tel: "办公电话",
          updataTime: "更新时间",
          status: "状态"
        },
        {
          loginAccount: "ffff",
          alias: "用户昵称",
          email: "电子邮箱",
          phome: "手机号码",
          tel: "办公电话",
          updataTime: "更新时间",
          status: "状态"
        },
        {
          loginAccount: "43343",
          alias: "用户昵称",
          email: "电子邮箱",
          phome: "手机号码",
          tel: "办公电话",
          updataTime: "更新时间",
          status: "状态"
        }
      ]
    };
  },
  methods: {
    show() {
      this.showDailog = true;
    },
    // 关闭对话框选择
    closeDialog() {
      this.showDailog = false;
    },
    /* 获取填入输入框的值  */
    searchBtn() {
      // const temp = this.formInline.concat(this.moreFormItem);
      const valObj = getInputVal(this.formInline);
      console.log(valObj);
    },
    /* 清除输入框内的值 */
    resetForm() {
      clearFilterVal(this.formInline);
    },
    tableCheckBox(row) {
      this.tableCheckBoxValue = row;
      console.log("选中的row", row);
    },
    /* 取消已经选择tag */
    handleClose(tag) {
      const closedTag = this.tableCheckBoxValue.splice(
        this.tableCheckBoxValue.indexOf(tag),
        1
      );
      this.$refs.tableDomTree.cancleChecked(closedTag);
    }
  }
};
</script>
<style lang="scss" scoped>
.add-user-box {
  .choosed-data {
    border: 1px solid navy;
    height: 100%;
  }
}
</style>
