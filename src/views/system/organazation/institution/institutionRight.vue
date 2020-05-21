<template>
  <div class="user-right-box">
    <div class="current-type clearfix">
      <div class="fl">
        <i class="el-icon-user"></i>
        <span>机构管理</span>
      </div>
      <div class="fr">
        <el-button
          type="primary"
          icon="el-icon-view"
          size="mini"
          @click="showOrHidden"
        >
          {{ btnText }}
        </el-button>
        <el-button
          type="primary"
          icon="el-icon-refresh"
          size="mini"
          @click="refreshPage"
        >
          刷新
        </el-button>
        <el-button
          type="primary"
          icon="el-icon-arrow-down"
          size="mini"
          @click="expandTable"
        >
          展开
        </el-button>
        <el-button
          type="primary"
          icon="el-icon-arrow-up"
          size="mini"
          @click="foldTable"
        >
          折叠
        </el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="addNew({}, '新增机构')"
        >
          新增
        </el-button>
      </div>
    </div>
    <div>
      <InputFilter v-show="btnText == '隐藏'" :form-item="formInline">
        <template slot="btnGroups">
          <el-button type="primary" size="mini" @click="searchBtn">
            查询
          </el-button>
          <el-button size="mini" @click="resetForm"> 重置 </el-button>
        </template>
      </InputFilter>
    </div>
    <TableTree
      ref="theTable"
      :table-head="tableHead"
      :table-data="tableData"
      :column-widths="columnWidths"
      :slot-columns="slotColumns"
      :table-fit="tableFit"
      style="margin-top: 10px;"
    >
      <template slot="institutionName" slot-scope="scope">
        <span class="td-color" @click="institutionEdit(scope.row, '编辑机构')">
          {{ scope.row.institutionName }}
        </span>
      </template>
      <template slot="userAlias" slot-scope="scope">
        <span class="td-color">{{ scope.row.userAlias }}</span>
      </template>
      <template slot="vehicle_license" slot-scope="scope">
        <span class="td-color">{{ scope.row.vehicle_license }}</span>
      </template>
      <template slot="operate">
        <el-table-column fixed="right" label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="institutionEdit(scope.row, '编辑机构')"
            >
              <i class="el-icon-edit" title="编辑"></i>
            </el-button>
            <el-button type="text" size="small" @click="stopUse(scope.row)">
              <i class="el-icon-video-pause"></i>
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="deleteHandleClick(scope.row)"
            >
              <i class="el-icon-delete" title="删除"></i>
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="institutionEdit(scope.row, '新增下级机构')"
            >
              <i class="el-icon-plus" title="新增下级机构"></i>
            </el-button>
          </template>
        </el-table-column>
      </template>
    </TableTree>
    <!-- 筛选搜索对话框 -->
    <DailogFrame
      :dialog-visible="showDailog"
      :title-name="titleName"
      @closeDialog="closeDialog"
    ></DailogFrame>
    <!-- table行点击对话框 -->
    <InstitutionEditPanel ref="institutionEditPanel"></InstitutionEditPanel>
  </div>
</template>
<script>
import TableTree from "@/components/tableTree";
import ChooseTreePanel from "@/components/pageParts/chooseTreePanel";
import InputFilter from "@/components/inputFliter";
import DailogFrame from "@/components/dailogPanel/frame";
import InstitutionEditPanel from "./institutionEditPanel";
// import { returnReg } from "@/utils/validate"; /* 表单正则验证 */
import { clearFilterVal, getInputVal } from "@/utils/pubFunc";
export default {
  name: "UserRight",
  components: {
    TableTree,
    InputFilter,
    DailogFrame,
    ChooseTreePanel,
    InstitutionEditPanel
  },
  data() {
    return {
      btnText: "查询",
      showDailog: false,

      titleName: "",
      formInline: [
        {
          type: "input",
          label: "机构代码",
          key: "acount",
          value: ""
        },
        {
          type: "input",
          label: "机构名称",
          key: "alias",
          value: ""
        },
        {
          type: "input",
          label: "机构全称",
          key: "name",
          value: ""
        },
        {
          type: "input",
          label: "机构类型",
          key: "phone",

          value: ""
        },
        {
          type: "select",
          label: "状态",
          options: [
            {
              label: "测试1",
              value: "test1"
            },
            {
              label: "测试2",
              value: "test2"
            }
          ],
          key: "status",
          value: ""
        }
      ],
      showMore: false,
      tableFit: true,
      columnWidths: {
        institutionName: 130,
        number: 130,
        format: 130
      },
      slotColumns: ["institutionName"],
      tableHead: {
        institutionName: "机构名称",
        institutionFullName: "机构全称",
        orderNumber: "排序号",
        institutionType: "机构类型",
        updateTime: "更新时间",
        remarkMessage: "备注信息",
        status: "状态"
      },
      tableData: [
        {
          id: 1,
          institutionName: "机构名称",
          institutionFullName: "机构全称1",
          orderNumber: "10",
          institutionType: "机构类型",
          updateTime: "更新时间",
          remarkMessage: "备注信息",
          status: "状态",
          children: [
            {
              id: 11,
              institutionName: "机构名称",
              institutionFullName: "机构全称2",
              orderNumber: "10",
              institutionType: "机构类型",
              updateTime: "更新时间",
              remarkMessage: "备注信息",
              status: "状态",
              children: [
                {
                  id: 111,
                  institutionName: "机构名称",
                  institutionFullName: "机构全称2",
                  orderNumber: "10",
                  institutionType: "机构类型",
                  updateTime: "更新时间",
                  remarkMessage: "备注信息",
                  status: "状态"
                },
                {
                  id: 112,
                  institutionName: "机构名称",
                  institutionFullName: "机构全称2",
                  orderNumber: "10",
                  institutionType: "机构类型",
                  updateTime: "更新时间",
                  remarkMessage: "备注信息",
                  status: "状态"
                }
              ]
            },
            {
              id: 12,
              institutionName: "机构名称",
              institutionFullName: "机构全称3",
              orderNumber: "10",
              institutionType: "机构类型",
              updateTime: "更新时间",
              remarkMessage: "备注信息",
              status: "状态"
            }
          ]
        },
        {
          id: 2,
          institutionName: "机构名称",
          institutionFullName: "机构全称",
          orderNumber: "10",
          institutionType: "机构类型",
          updateTime: "更新时间",
          remarkMessage: "备注信息",
          status: "状态"
        }
      ]
    };
  },
  methods: {
    showOrHidden() {
      this.btnText = this.btnText === "查询" ? "隐藏" : "查询";
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
    refreshPage() {
      this.$refs.theTable.expandFolodTable(this.tableData, false);
    },
    expandTable() {
      this.$refs.theTable.expandFolodTable(this.tableData, true);
    },
    foldTable() {
      this.$refs.theTable.expandFolodTable(this.tableData, false);
    },
    forArr(arr, isExpand) {
      arr.forEach(i => {
        console.log(this.$refs.theTable);
        this.$refs.theTable.toggleRowExpansion(i, isExpand);
        if (i.children) {
          this.forArr(i.children, isExpand);
        }
      });
    },
    addNew(row, type) {
      console.log(row, type);
      this.$refs.institutionEditPanel.show(row, type);
    },
    // 显示对话框选择
    showFilterPanel(item) {
      this.showDailog = true;
      this.titleName = `${item.label}选择`;
    },
    // 关闭对话框选择
    closeDialog() {
      this.showDailog = false;
    },
    /* 编辑表格 */
    institutionEdit(row, type) {
      console.log(321, row, type);
      this.$refs.institutionEditPanel.show(row, type);
    },

    stopUse() {
      this.$alertMsgBox("确认要停用该用户吗?", "信息")
        .then(() => {
          this.$message.success("成功");
        })
        .catch(() => {
          this.$message.info("取消");
        });
    },
    deleteHandleClick(row) {
      this.$alertMsgBox("确认要停用该用户吗", "信息")
        .then(() => {
          this.$message.success("成功");
        })
        .catch(() => {
          this.$message.info("取消");
        });
    }
  }
};
</script>
<style lang="scss">
.el-popover {
  min-width: 100px;
}
</style>
<style lang="scss" scoped>
.user-right-box {
  margin: 0 10px;
  .current-type {
    height: 45px;
    line-height: 45px;
    // width: calc(100% -200px);
    // margin-right: 200px;
    border-bottom: 1px solid #eee;
  }
  .td-color {
    color: #1890ff;
    cursor: pointer;
  }
  .table-witth {
  }
}
</style>
