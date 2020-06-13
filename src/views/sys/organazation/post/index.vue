<template>
  <div class="post  wrapper_content">
    <div class="current-type clearfix">
      <div class="fl">
        <i class="el-icon-user"></i>
        <span>岗位管理</span>
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
          icon="el-icon-plus"
          size="mini"
          @click="addNew({}, '新增')"
        >
          新增
        </el-button>
      </div>
    </div>
    <div>
      <InputFilter :form-item="formInline" class="search">
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
      </InputFilter>
    </div>

    <TableTree
      :table-head="tableHead"
      :table-data="tableData"
      :column-widths="columnWidths"
      :slot-columns="slotColumns"
      :table-fit="tableFit"
      style="margin-top: 10px;"
    >
      <template slot="postName" slot-scope="scope">
        <span class="td-color" @click="postEdit(scope.row, '编辑')">
          {{ scope.row.postName }}
        </span>
      </template>
      <template slot="postType" slot-scope="scope">
        {{ swichText("sys_post_type", scope.row.postType, "未设置") }}
      </template>
      <template slot="status" slot-scope="scope">
        {{ swichText("sys_search_status", scope.row.status, "未设置") }}
      </template>
      <template slot="operate">
        <el-table-column fixed="right" label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="postEdit(scope.row, '编辑')"
            >
              <i class="el-icon-edit" title="编辑"></i>
            </el-button>
            <el-button type="text" size="small" @click="stopUse(scope.row)">
              <i
                :class="[
                  scope.row.status === '0'
                    ? 'el-icon-video-pause'
                    : 'el-icon-circle-check'
                ]"
                :style="{
                  color: [scope.row.status == '0' ? '#f00' : '#409EFF']
                }"
                :title="swichText('sys_search_status', scope.row.status, '')"
              ></i>
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="deleteHandleClick(scope.row)"
            >
              <i class="el-icon-delete" title="删除"></i>
            </el-button>
          </template>
        </el-table-column>
      </template>
    </TableTree>
    <Pagination
      :total="pageNation.total"
      :page-size="pageNation.pageSize"
      @currentChange="currentChange"
    ></Pagination>
    <AddAndEdit ref="postEditPanel" @initPage="initPage"></AddAndEdit>
  </div>
</template>
<script>
import TableTree from "@/components/tableTree";
import InputFilter from "@/components/inputFliter";
import Pagination from "@/components/pagination";
import AddAndEdit from "./addAndEdit";
import { clearFilterVal, getInputVal, dictTypeMap } from "@/utils/pubFunc";
import { orgApi } from "@/api/organization";
export default {
  name: "UserManage",
  inject: ["reload"],
  components: {
    TableTree,
    InputFilter,
    Pagination,
    AddAndEdit
  },
  data() {
    return {
      btnText: "查询",
      formInline: [
        {
          type: "input",
          label: "岗位编码",
          key: "postCode",
          value: ""
        },
        {
          type: "input",
          label: "岗位名称",
          key: "postName",
          value: ""
        },
        {
          type: "select",
          label: "岗位分类",
          key: "postType",
          value: "",
          options: this.getPostOption("sys_post_type")
        },
        {
          type: "select",
          label: "状态",
          options: this.getStatusOption("sys_search_status"),
          key: "status",
          value: ""
        }
      ],
      columnWidths: {
        updateDate: 130
        // email: 170
      },
      slotColumns: ["postName", "postType", "status"],
      tableHead: {
        postName: "岗位名称",
        postCode: "岗位编码",
        postSort: "排序号",
        postType: "岗位分类",
        updateDate: "更新时间",
        remarks: "备注信息", // 无对应键名
        status: "状态" // status
      },
      tableData: [],
      pageNation: {
        total: 0,
        pageSize: 20,
        pageNo: 1,
        status: ""
        // postCode: "",
        // postName_like: "",
        // postType: ""
      },
      tableFit: true
    };
  },
  mounted() {
    this.init(this.pageNation);
  },
  methods: {
    initPage() {
      this.reload();
    },
    init(param) {
      console.log(2222, param);
      orgApi.getPostList(param).then(res => {
        this.pageNation.total = res.count;
        this.tableData = res.list;
      });
    },
    showOrHidden() {
      this.btnText = this.btnText === "查询" ? "隐藏" : "查询";
    },
    /* 获取岗位下拉框数据 */
    getPostOption(type) {
      const selectTypeData = JSON.parse(
        sessionStorage.getItem("selectDicType")
      );
      return selectTypeData[type];
    },
    /* 获取状态下拉框数据 */
    getStatusOption(type) {
      const selectTypeData = JSON.parse(
        sessionStorage.getItem("selectDicType")
      );
      return selectTypeData[type];
    },
    /* 列表文本转义 */
    swichText(type, val, other) {
      return dictTypeMap(type, val, other);
      // console.log(99, dictTypeMap(type, val, other));
    },
    /* 获取填入输入框的值  */
    searchBtn(data = {}) {
      const valObj = Object.assign(
        this.pageNation,
        getInputVal(this.formInline)
      );
      this.init(valObj);
    },
    /* 清除输入框内的值 */
    resetForm() {
      this.pageNation.status = "";
      const valObj = Object.assign(
        this.pageNation,
        clearFilterVal(this.formInline)
      );
      this.init(valObj);
    },
    currentChange(val) {
      const obj = {
        pageSize: this.pageNation.pageSize,
        pageNo: this.pageNation.pageNo
      };
      this.init(obj);
    },
    /* 编辑表格 */
    postEdit(row, type) {
      this.$refs.postEditPanel.show(row, type);
    },
    addNew(row, type) {
      this.$refs.postEditPanel.show(row, type);
    }
  }
};
</script>
<style lang="scss" scoped>
.post {
  .current-type {
    height: 45px;
    line-height: 45px;
    // width: calc(100% -200px);
    // margin-right: 200px;
    border-bottom: 1px solid #eee;
  }
  .top-search {
    width: 100%;
    padding: 10px 10px 0;
  }
  .search {
    padding: 0 10px;
    // outline: 1px solid red;
  }
}
</style>
