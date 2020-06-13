<template>
  <div class="company wrapper_content">
    <div class="current-type clearfix">
      <div class="fl">
        <i class="el-icon-user"></i>
        <span>公司管理</span>
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
          @click="addNew({}, '新增公司')"
        >
          新增
        </el-button>
      </div>
    </div>
    <InputFilter v-show="btnText == '隐藏'" :form-item="formInline">
      <template slot="btnGroups">
        <el-button type="primary" size="mini" @click="searchBtn">
          查询
        </el-button>
        <el-button size="mini" @click="resetForm"> 重置 </el-button>
      </template>
    </InputFilter>
    <TableTree
      ref="theTable"
      :table-head="tableHead"
      :table-data="tableData"
      :column-widths="columnWidths"
      :slot-columns="slotColumns"
      :table-fit="tableFit"
      style="margin-top: 10px;"
      @requstLazyLoad="requstLazyLoad"
    >
      <template slot="companyName" slot-scope="scope">
        <span class="td-color" @click="companyEdit(scope.row, '编辑公司')">
          {{ scope.row.companyName }}
        </span>
      </template>
      <template slot="area" slot-scope="scope">
        {{ scope.row.area.treeNames }}
      </template>
      <template slot="status" slot-scope="scope">
        <span :style="[{ color: scope.row.status === '0' ? '#000' : '#f00' }]">
          {{ swichText("sys_search_status", scope.row.status, "") }}
        </span>
      </template>
      <template slot="operate">
        <el-table-column fixed="right" label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="companyEdit(scope.row, '公司机构')"
            >
              <i class="el-icon-edit" title="编辑"></i>
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="stopCompanyOrStart(scope.row)"
            >
              <i
                :class="[
                  scope.row.status === '0'
                    ? 'el-icon-video-pause'
                    : 'el-icon-circle-check'
                ]"
                :style="{
                  color: [scope.row.status === '0' ? '#f00' : '#409EFF']
                }"
                :title="scope.row.status === '0' ? '正常' : '停用'"
              ></i>
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="deleteHandleClick(scope.row)"
            >
              <i class="r-btn el-icon-delete" title="删除"></i>
            </el-button>
            <el-button
              type="text"
              @click="companyEdit(scope.row, '新增下级公司')"
            >
              <i class="el-icon-plus" size="small" title="新增下级公司"></i>
            </el-button>
          </template>
        </el-table-column>
      </template>
    </TableTree>
    <AddAndEdit ref="companyEditPanel" @initPage="initPage"></AddAndEdit>
  </div>
</template>
<script>
import TableTree from "@/components/tableTree";
import InputFilter from "@/components/inputFliter";
import AddAndEdit from "./addAndEdit";
import { orgApi } from "@/api/organization";
import { getInputVal, dictTypeMap, clearFilterVal } from "@/utils/pubFunc";
export default {
  name: "Company",
  components: {
    TableTree,
    InputFilter,
    AddAndEdit
  },
  data() {
    return {
      btnText: "查询",
      formInline: [
        {
          type: "input",
          label: "公司代码",
          key: "viewCode",
          value: ""
        },
        {
          type: "input",
          label: "公司名称",
          key: "companyName",
          value: ""
        },
        {
          type: "input",
          label: "公司全称",
          key: "fullName",
          value: ""
        },
        {
          type: "select",
          label: "状态",
          options: this.getStatusOption("sys_search_status"),
          key: "status",
          value: ""
        }
      ],
      showMore: false,
      tableFit: true,
      columnWidths: {
        companyName: 130
      },
      slotColumns: ["companyName", "area", "status"],
      tableHead: {
        companyName: "公司名称",
        fullName: "公司全称",
        treeSort: "排序号",
        area: "归属区域",
        updateDate: "备注信息",
        status: "状态"
      },
      tableData: []
    };
  },
  inject: ["reload"],
  created() {},
  mounted() {
    this.init({});
  },
  methods: {
    initPage() {
      this.reload();
    },
    init(param) {
      orgApi.getCompanyList(param).then(res => {
        for (let i = 0, len = res.length; i < len; i++) {
          if (res.length && res[i].isTreeLeaf === false) {
            res[i].hasChildren = true;
          }
        }
        this.tableData = res;
      });
    },
    // tree 懒加载
    requstLazyLoad(param) {
      console.log(param);
      const obj = {
        ctrlPermi: 2,
        nodeid: param.tree.id,
        parentCode: param.tree.id,
        parentid: param.tree.parentCode,
        n_level: param.tree.treeLevel,
        _search: false,
        status: ""
      };
      orgApi.getCompanyList(obj).then(res => {
        for (let i = 0, len = res.length; i < len; i++) {
          if (!res[i].isTreeLeaf) {
            res[i].hasChildren = true;
          }
        }
        param.resolve(res);
      });
    },
    /* 列表文本转义 */
    swichText(type, val, other) {
      return dictTypeMap(type, val, other);
      // console.log(99, dictTypeMap(type, val, other));
    },
    /* 获取状态下拉框数据 */
    getStatusOption(type) {
      const selectTypeData = JSON.parse(
        sessionStorage.getItem("selectDicType")
      );
      return selectTypeData[type];
    },

    showOrHidden() {
      this.btnText = this.btnText === "查询" ? "隐藏" : "查询";
    },
    /* 获取填入输入框的值  */
    searchBtn(data = {}) {
      // console.log(214, data);
      const obj = {
        status: "",
        ctrlPermi: 2
      };
      const valObj = Object.assign(obj, getInputVal(this.formInline));
      this.init(valObj);
    },
    /* 清除输入框内的值 */
    resetForm() {
      clearFilterVal(this.formInline);
      this.reload();
    },
    refreshPage() {
      this.reload();
      // this.$refs.theTable.expandFolodTable(this.tableData, false);
    },
    expandTable() {
      this.$refs.theTable.expandFolodTable(this.tableData, true);
    },
    foldTable() {
      this.$refs.theTable.expandFolodTable(this.tableData, false);
    },
    forArr(arr, isExpand) {
      arr.forEach(i => {
        // this.$refs.theTable.toggleRowExpansion(i, isExpand);
        if (i.children) {
          this.forArr(i.children, isExpand);
        }
      });
    },
    addNew(row, type) {
      this.$refs.companyEditPanel.show(row, type);
    },
    /* 编辑表格 */
    companyEdit(row, type) {
      this.$refs.companyEditPanel.show(row, type);
    },
    stopCompanyOrStart(row) {
      const typeText = row.status === "0" ? "停用" : "启用";
      this.$alertMsgBox(`确认要${typeText}该用户吗?`, "信息")
        .then(() => {
          orgApi
            .setCompanyStart({
              type: row.status === "0" ? "disable" : "enable",
              companyCode: row.companyCode
            })
            .then(res => {
              if (res.result === "true") {
                this.$message.success(res.message);
                this.reload();
              } else {
                this.$message.waring(res.message);
              }
            });
        })
        .catch(() => {
          this.$message.info("取消");
        });
    },
    deleteHandleClick(row) {
      this.$alertMsgBox("确认要删除该机构及其子机构吗？", "信息")
        .then(() => {
          orgApi
            .deleteCompany({
              companyCode: row.companyCode
            })
            .then(res => {
              if (res.result === "true") {
                this.init({
                  status: "",
                  ctrlPermi: 2
                });
                this.$message.success(res.message);
              } else {
                this.$message.waring(res.message);
              }
            });
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
.company {
  // padding: 0 10px;
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
}
</style>
