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
      @currentChange="currentChange"
      @sortChange="sortChange"
      :show-page="false"
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

      <template slot="jobName" slot-scope="scope">
        <span class="td-color tl" @click="logEdit(scope.row, '编辑')">
          {{ scope.row.jobName }}
        </span>
      </template>
      <template slot="logType" slot-scope="scope">
        {{ swichText('sys_log_type', scope.row.logType, '未安装') }}
      </template>
      <template slot="isException" slot-scope="scope">
        <span v-if="scope.row.isException === '0'" style="color:#aaa;">
          {{ swichText('sys_yes_no', scope.row.isException, '未设置') }}
        </span>
        <span v-else style="color:#f00;">
          {{ swichText('sys_yes_no', scope.row.isException, '未设置') }}
        </span>
      </template>
    </TableTree>
    <UserChoosePanel
      ref="userChoosePanel"
      @initPage="initPage"
      @logTypeFunc="logTypeFunc"
    ></UserChoosePanel>
    <LogEdit ref="logEditPanel" @initPage="initPage"></LogEdit>
  </div>
</template>
<script>
import TableTree from '@/components/tableTree'
import InputFilter from '@/components/inputFliter'
import UserChoosePanel from './userChoosePanel'
import TopBtns from '@/components/componentBtns/topBtns/baseBtn'
import LogEdit from './logEdit'
import { clearFilterVal, getInputVal, dictTypeMap } from '@/utils/pubFunc'
import { sysApi } from '../../../../api/systemMonitor'
export default {
  name: 'Menu',
  inject: ['reload'],
  components: {
    TableTree,
    InputFilter,
    UserChoosePanel,
    TopBtns,
    LogEdit
  },
  data() {
    return {
      showSearchVal: false,
      leftMg: {
        icon: 'fa icon-notebook',
        text: '作业调度（定时器：运行中...）'
      },
      btnArr: [
        {
          handlerName: 'View',
          btnText: '查询',
          class: 'fa fa-search'
        },
        {
          handlerName: 'View',
          btnText: '停止定时器',
          class: 'fa fa-stop'
        },
        {
          handlerName: 'ReLoad',
          btnText: '刷新页面',
          class: 'fa fa-refresh'
        },
        {
          handlerName: 'View',
          btnText: '调度日志',
          class: 'fa fa-file-text-o'
        },
        {
          handlerName: 'AddNew',
          btnText: '新增',
          class: 'fa fa-plus'
        }
      ],
      formInline: [
        {
          type: 'input',
          label: '任务名称',
          key: 'jobName',
          value: ''
        },
        {
          type: 'input',
          label: '任务分组',
          key: 'jobGroup',
          value: ''
        }
      ],
      columnTextPostion: {
        // logTitle: 'left',
        // requestUri: 'left'
      },
      columnWidths: {},
      columnSortabel: {},
      slotColumns: ['jobName', 'status'],
      tableHead: {
        jobName: '任务名称',
        jobGroup: '任务分组',
        description: '任务描述',
        invokeTarget: '调用目标字符',
        cronExpression: '周期表达式',
        bizType: '上次运行时间',
        nextFireTime: '下次运行时间',
        status: '状态'
      },
      tableData: [],
      pageNation: {
        jobName: '',
        jobGroup: '',
        pageSize: 20,
        pageNo: 1,
        total: 0,
        orderBy: ''
      },
      tableFit: true
    }
  },
  mounted() {
    this.init(this.pageNation)
  },
  methods: {
    showSearch(val) {
      this.showSearchVal = val
    },
    handlerName(funcName) {
      this[funcName]()
    },
    initPage() {
      this.reload()
    },
    init(param) {
      // console.log(2222, param);
      sysApi.getJob(param).then(res => {
        this.tableData = res
        // this.pageNation.total = res.count
      })
    },

    /* 列表文本转义 */
    swichText(type, val, other) {
      return dictTypeMap(type, val, other)
    },
    /* 获取状态下拉框数据 */
    getStatusOption(type) {
      const selectTypeData = JSON.parse(sessionStorage.getItem('selectDicType'))
      return selectTypeData[type]
    },
    statusValChange(item) {
      this.searchBtn(item)
    },
    // 显示带搜索图标的对话框
    showFilterPanel(item) {
      // console.log(282, item);
      if (item.key === 'logType') {
        this.$refs.userChoosePanel.show()
      }
    },
    /* 获取填入输入框的值  */
    searchBtn(data = {}) {
      const valObj = Object.assign(
        this.pageNation,
        getInputVal(this.formInline)
      )
      this.init(valObj)
    },
    logTypeFunc(refName) {
      this.formInline[3].value = refName
      this.pageNation.selectData = refName
    },
    logEdit(row, type) {
      this.$refs.logEditPanel.show(row, type)
    },
    /* 清除输入框内的值 */
    resetForm() {
      clearFilterVal(this.formInline)
      this.pageNation.pageNo = 1
      this.pageNation.logTitle = ''
      this.pageNation.requestUri = ''
      this.pageNation.logType = ''
      this.pageNation.createByName = ''
      this.pageNation.isException = ''
      this.pageNation.bizType = ''
      this.pageNation.bizKey = ''
      this.pageNation.createDate = ''
      this.pageNation.remoteAddr = ''
      this.pageNation.deviceName = ''
      this.pageNation.browserName = ''
      this.pageNation.selectData = ''
      this.init(this.pageNation)
    },
    currentChange(val) {
      this.pageNation.pageNo = val
      this.init(this.pageNation)
    },
    sortChange(sortVal) {
      this.pageNation.orderBy = sortVal
      this.init(this.pageNation)
    }
  }
}
</script>
<style lang="scss" scoped></style>
