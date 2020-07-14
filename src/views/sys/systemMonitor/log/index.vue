<template>
  <div class="post  wrapper_content">
    <TopBtns
      :btn-arr="btnArr"
      :left-mg="leftMg"
      @showSearch="showSearch"
      @handlerName="handlerName"
    ></TopBtns>
    <InputFilter
      v-show="showSearchVal"
      :form-item="formInline"
      @searchBtn="searchBtn"
      @resetForm="resetForm"
      @statusValChange="statusValChange"
      @filterPanel="showFilterPanel"
    >
    </InputFilter>

    <TableTree
      :table-head="tableHead"
      :table-data="tableData"
      :column-widths="columnWidths"
      :column-text-postion="columnTextPostion"
      :slot-columns="slotColumns"
      :table-fit="tableFit"
      style="margin-top: 10px;"
      :column-sortabel="columnSortabel"
      :page-nation="pageNation"
      @currentChange="currentChange"
      @sortChange="sortChange"
    >
      <template slot="index">
        <el-table-column
          fixed
          label=""
          type="index"
          align="center"
          width="50"
        ></el-table-column>
      </template>

      <template slot="logTitle" slot-scope="scope">
        <span class="td-color tl" @click="menuEditAdd(scope.row, '编辑')">
          {{ scope.row.logTitle }}
        </span>
      </template>
      <template slot="logType" slot-scope="scope">
        {{ swichText("sys_log_type", scope.row.logType, "未安装") }}
      </template>
      <template slot="isException" slot-scope="scope">
        <span v-if="scope.row.isException === '0'" style="color:#aaa;">
          {{ swichText("sys_yes_no", scope.row.isException, "未设置") }}
        </span>
        <span v-else style="color:#f00;">
          {{ swichText("sys_yes_no", scope.row.isException, "未设置") }}
        </span>
      </template>
    </TableTree>
    <UserChoosePanel
      ref="userChoosePanel"
      @initPage="initPage"
    ></UserChoosePanel>
  </div>
</template>
<script>
import TableTree from "@/components/tableTree";
import InputFilter from "@/components/inputFliter";
import UserChoosePanel from "./userChoosePanel";
import TopBtns from "@/components/componentBtns/topBtns/baseBtn";
import { clearFilterVal, getInputVal, dictTypeMap } from "@/utils/pubFunc";
import { sysApi } from "../../../../api/systemMonitor";
export default {
  name: "Menu",
  inject: ["reload"],
  components: {
    TableTree,
    InputFilter,
    UserChoosePanel,
    TopBtns
  },
  data() {
    return {
      showSearchVal: false,
      leftMg: {
        icon: "fa fa-bug",
        text: "访问日志"
      },
      btnArr: [
        {
          handlerName: "View",
          btnText: "查询",
          class: "fa fa-search"
        }
      ],
      formInline: [
        {
          type: "input",
          label: "日志标题",
          key: "logTitle",
          value: ""
        },
        {
          type: "input",
          label: "请求地址",
          key: "requestUri",
          value: ""
        },
        {
          type: "select",
          label: "日志类型",
          key: "logType",
          options: this.getStatusOption("sys_log_type"),
          value: ""
        },
        {
          type: "searchInput",
          label: "操作用户",
          key: "logType",
          value: ""
        },
        {
          type: "select",
          label: "是否异常",
          options: this.getStatusOption("sys_search_status"),
          key: "status",
          value: ""
        },
        {
          type: "input",
          label: "业务类型",
          key: "logType",
          value: ""
        },
        {
          type: "input",
          label: "业务主键",
          key: "logType",
          value: ""
        },
        {
          type: "daterange",
          label: "操作时间",
          key: "logType",
          value: ""
        },
        {
          type: "input",
          label: "客户端IP",
          key: "logType",
          value: ""
        }
      ],
      columnTextPostion: {
        logTitle: "left",
        requestUri: "left"
      },
      columnWidths: {
        logTitle: 200,
        requestUri: 180,
        isException: 100, //
        logType: 200,
        createByName: 200,
        currentVersion: 200,
        bizType: 200,
        bizKey: 200,
        createDate: 200,
        remoteAddr: 200,
        deviceName: 200,
        browserName: 200,
        executeTimeFormat: 200
      },
      columnSortabel: {
        logTitle: true,
        requestUri: true,
        logType: true,
        createByName: true,
        currentVersion: true,
        isException: true,
        bizType: true,
        bizKey: true,
        createDate: true,
        remoteAddr: true,
        deviceName: true,
        browserName: true,
        executeTimeFormat: true
      },
      slotColumns: ["logTitle", "isException", "logType"],
      tableHead: {
        logTitle: "日志标题",
        requestUri: "请求地址",
        logType: "日志类型",
        createByName: "操作用户",
        isException: "异常",
        bizType: "业务类型",
        bizKey: "业务主键",
        createDate: "操作时间",
        remoteAddr: "客户端IP",
        deviceName: "设备名称",
        browserName: "浏览器名称",
        executeTimeFormat: "响应时间"
      },
      tableData: [],
      pageNation: {
        moduleName: "",
        mainClassName: "",
        status: "",
        pageSize: 20,
        pageNo: 1,
        total: 0,
        orderBy: ""
      },
      tableFit: true
    };
  },
  mounted() {
    this.init(this.pageNation);
  },
  methods: {
    showSearch(val) {
      this.showSearchVal = val;
    },
    handlerName(funcName) {
      this[funcName]();
    },
    initPage() {
      this.reload();
    },
    init(param) {
      // console.log(2222, param);
      sysApi.getLog(param).then(res => {
        this.tableData = res.list;
        this.pageNation.total = res.count;
      });
    },

    /* 列表文本转义 */
    swichText(type, val, other) {
      return dictTypeMap(type, val, other);
    },
    /* 获取状态下拉框数据 */
    getStatusOption(type) {
      const selectTypeData = JSON.parse(
        sessionStorage.getItem("selectDicType")
      );
      return selectTypeData[type];
    },
    statusValChange(item) {
      this.searchBtn(item);
    },
    // 显示带搜索图标的对话框
    showFilterPanel(item) {
      console.log(282, item);
      if (item.key === "logType") {
        // sysApi.getCompanyMenuTree({ ctrlPermi: 2 }).then(res => {
        //   const attributes = {
        //     id: "id",
        //     parentId: "pId",
        //     label: "name",
        //     rootId: "YD"
        //   };
        //   const treeData = toTreeData(res, attributes);
        this.$refs.userChoosePanel.show();
        // });
      }
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
      clearFilterVal(this.formInline);
      this.pageNation.pageNo = 1;
      this.pageNation.logTitle = "";
      this.pageNation.requestUri = "";
      this.pageNation.logType = "";
      this.pageNation.createByName = "";
      this.pageNation.isException = "";
      this.pageNation.bizType = "";
      this.pageNation.bizKey = "";
      this.pageNation.createDate = "";
      this.pageNation.remoteAddr = "";
      this.pageNation.deviceName = "";
      this.pageNation.browserName = "";
      this.init(this.pageNation);
    },
    currentChange(val) {
      this.pageNation.pageNo = val;
      this.init(this.pageNation);
    },
    sortChange(sortVal) {
      this.pageNation.orderBy = sortVal;
      this.init(this.pageNation);
    }
  }
};
</script>
<style lang="scss" scoped></style>
