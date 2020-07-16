<template>
  <div>
    <DailogFrame
      :dialog-visible="showUserChoose"
      :title-name="'用户选择'"
      @closeDialog="closeDialog"
    >
      <template slot="content">
        <div class="user">
          <div id="userLeft" class="user-left">
            <LeftTree
              id="bar"
              :title-name="'组织机构'"
              :menu-data="instMenuData"
              :show-edit-btn="true"
              v-bind="$attrs"
              :default-expand="defaultExpand"
              class="bar transition-box"
              @clickNodeReslut="clickNodeReslut1"
            ></LeftTree>
            <span id="btn" class="toglebtn">
              <i
                :class="
                  arrow === true ? 'el-icon-caret-right' : 'el-icon-caret-left'
                "
                class="icon-position"
              ></i>
            </span>
          </div>
          <div id="userRight" class="user-right">
            <InputFliter
              :form-item="formInline"
              style="margin: 0 0 10px 5px;"
              @searchBtn="searchBtn"
              @resetForm="resetForm"
              @filterPanel="showFilterPanel"
            >
            </InputFliter>
            <el-row type="flex" :gutter="10" style=" margin-left: 0;">
              <el-col :span="18">
                <TableTree
                  ref="tableDomTree"
                  :table-head="tableHead"
                  :table-data="tableData"
                  :slot-columns="slotColumns"
                  :page-nation="pageNation"
                  :column-sortabel="columnSortabel"
                  :column-widths="columnWidths"
                  @rowClick="rowClick"
                  @rowDblclick="rowDblclick"
                  @currentChange="currentChange"
                  @sortChange="sortChange"
                >
                  <template slot="status" slot-scope="scope">
                    <span
                      :style="[
                        { color: scope.row.status === '0' ? '#000' : '#f00' }
                      ]"
                    >
                      {{ swichText('sys_search_status', scope.row.status, '') }}
                    </span>
                  </template>
                </TableTree>
              </el-col>
              <el-col :span="6">
                <div class="choosed-data">
                  <div style="line-height:50px;">
                    当前已选择{{ tableCheckBoxValue.length }}项:
                  </div>
                  <el-tag
                    v-for="(tag, index) in tableCheckBoxValue"
                    :key="index"
                    style="margin: 0  10px 10px 0;"
                    closable
                    @close="handleClose(tag)"
                  >
                    {{ tag.loginCode }}
                  </el-tag>
                </div>
              </el-col>
            </el-row>
          </div>
          <ChooseMenuTree
            :inner-dialog-visible="innerDialogVisible"
            :title-name="menuTreeTitle"
            :menu-data="menuData"
            :key-val="keyVal"
            :default-expand="defaultExpand1"
            @closeInnerDialog="closeMuneTreeChoose"
            @on-change-keyVal="changeKeyVal"
            @clickNodeReslut="clickNodeReslut"
          ></ChooseMenuTree>
        </div>
      </template>
      <template slot="footer">
        <div style="text-align:right;margin-top: 10px;">
          <el-button
            type="primary"
            icon="el-icon-check"
            size="mini"
            @click="saveChoose('userForm')"
          >
            确定
          </el-button>
          <el-button
            type="primary"
            icon="el-icon-close"
            size="mini"
            @click="closeDialog('userForm')"
          >
            关闭
          </el-button>
        </div>
      </template>
    </DailogFrame>
  </div>
</template>
<script>
import DailogFrame from '@/components/dailogPanel/frame'
import LeftTree from '@/components/leftTree'
import InputFliter from '@/components/inputFliter'
import TableTree from '@/components/tableTree'
import ChooseMenuTree from '@/components/chooseMenuTree'
import { orgApi } from '@/api/organization'
import { pubApi } from '@/api/public_request'
import {
  clearFilterVal,
  toTreeData,
  getInputVal,
  dictTypeMap
} from '@/utils/pubFunc'
export default {
  name: 'DataRights',
  components: {
    DailogFrame,
    LeftTree,
    InputFliter,
    ChooseMenuTree,
    TableTree
  },
  data() {
    return {
      showUserChoose: false,
      arrow: true,
      instMenuData: [],
      defaultExpand: [], // 左侧菜单的默认展开值
      formInline: [
        {
          type: 'input',
          value: '',
          key: 'loginCode',
          width: 90,
          label: '账号'
        },
        {
          type: 'input',
          value: '',
          key: 'userName',
          width: 90,
          label: '昵称'
        },
        {
          type: 'input',
          value: '',
          key: 'refName',
          width: 90,
          label: '姓名'
        },
        {
          type: 'searchInput',
          value: '',
          key: 'officeName',
          width: 90,
          label: '机构'
        },
        {
          type: 'searchInput',
          value: '',
          key: 'companyName',
          width: 90,
          label: '公司'
        },
        {
          type: 'input',
          value: '',
          key: 'mobile',
          width: 90,
          label: '手机'
        }
      ],
      columnWidths: {
        loginCode: 130,
        userName: 130,
        'employee.empName': 130,
        'employee.company.companyName': 130,
        'employee.office.officeName': 130,
        mobile: 130,
        updateDate: 130,
        status: 100
      },
      columnSortabel: {
        loginCode: true,
        userName: true,
        'employee.empName': true,
        'employee.company.companyName': true,
        'employee.office.officeName': true,
        mobile: true,
        updateDate: true,
        status: true
      },
      slotColumns: ['status'],
      tableHead: {
        loginCode: '登录账号',
        userName: '用户昵称',
        'employee.empName': '员工姓名',
        'employee.company.companyName': '归属机构',
        'employee.office.officeName': '归属公司',
        mobile: '手机号码',
        updateDate: '更新时间',
        status: '状态'
      },
      tableData: [],
      pageNation: {
        total: null,
        pageNo: 1,
        pageSize: 20,
        ctrlPermi: 2,
        status: '0',
        orderBy: ''
      },
      searchVal: {
        loginCode: '',
        refName: '',
        mobile: '',
        status: '',
        'employee.office.officeName': '', // 企管部
        'employee.office.officeCode': '', // SDJN01
        'employee.company.companyName': '', // 济南公司
        'employee.company.companyCode': '', // SDJN
        'employee.postCode': '', // ceo
        phone: '' // 08277648513
      },
      tableCheckBoxValue: [],
      innerDialogVisible: false,
      menuTreeTitle: '',
      menuData: [],
      keyVal: '',
      defaultExpand1: ['1'],
      nodeData: {}
    }
  },
  mounted() {
    this.getInsMenuTree()
    this.getUserList(this.pageNation)
  },
  methods: {
    show() {
      this.showUserChoose = true
      this.$nextTick(() => {
        this.showOrHidden()
      })
    },
    searchBtn(data = {}) {
      //   console.log(240, this.menuTreeTitle, this.formInline[3], data);
      this.searchVal = Object.assign(
        this.searchVal,
        this.pageNation,
        getInputVal(this.formInline)
      )
      this.getUserList(this.searchVal)
    },
    rowClick(row) {
      this.tableCheckBoxValue = []
      this.tableCheckBoxValue.push(row)
    },
    rowDblclick(row) {
      this.saveChoose()
    },
    /*  关闭当前选中 跳转到 编辑页 */
    saveChoose() {
      if (this.tableCheckBoxValue.length > 0) {
        this.$emit('logTypeFunc', this.tableCheckBoxValue[0].refName)
      }
      this.showUserChoose = false
    },
    sortChange(sortVal) {
      this.pageNation.orderBy = sortVal
      this.init(this.pageNation)
    },
    currentChange(val) {
      this.pageNation.pageNo = val
      this.getUserList(this.pageNation)
    },
    /* 关闭机构/公司选择 */
    closeMuneTreeChoose(val) {
      if (val === 'sure') {
        this.nodeEvents(this.nodeData)
      }
      this.innerDialogVisible = false
    },
    // 单击左侧树节点
    clickNodeReslut1(data) {
      this.menuTreeTitle = '机构选择'
      this.nodeData = data.data
      if (data.type === 'click') {
        this.nodeEvents(data.data)
      }
    },
    // 双击弹窗树节点选中并关闭
    clickNodeReslut(data) {
      this.nodeData = data.data
      //   if (data.type === "click") {}
      if (data.type === 'dbclick') {
        this.nodeEvents(data.data)
      }
    },
    nodeEvents(data) {
      // console.log(333344, data);
      if (this.menuTreeTitle === '机构选择') {
        this.searchVal['employee.office.officeName'] = data.label
        this.searchVal['employee.office.officeCode'] = data.id
        this.formInline[3].value = data.label
      } else if (this.menuTreeTitle === '公司选择') {
        this.searchVal['employee.company.companyName'] = data.label
        this.searchVal['employee.company.companyCode'] = data.id
        this.formInline[4].value = data.label
      }
      this.innerDialogVisible = false
      this.keyVal = ''
      this.searchBtn(data.data)
    },
    // 显示带搜索图标的对话框
    showFilterPanel(item) {
      if (item.key === 'officeName') {
        this.menuTreeTitle = '机构选择'
        this.getOfficeMenuTree()
      }
      if (item.key === 'companyName') {
        this.menuTreeTitle = '公司选择'
        this.getCompanyMenuTree()
      }
    },
    // 关闭用户选择对话框选择
    closeDialog() {
      this.showUserChoose = false
      this.resetForm()
    },
    /* 取消已经选择tag */
    handleClose(tag) {
      this.tableCheckBoxValue.splice(this.tableCheckBoxValue.indexOf(tag), 1)
      //  const closedTag
      //   this.$refs.tableDomTree.cancleChecked(closedTag);
    },
    /* 清除输入框内的值 */
    resetForm() {
      this.pageNation.pageNo = 1
      this.pageNation.orderBy = ''
      this.pageNation.status = '0'
      this.pageNation.total = 0
      this.searchVal = {
        loginCode: '',
        refName: '',
        mobile: '',
        status: '',
        'employee.office.officeName': '', // 企管部
        'employee.office.officeCode': '', // SDJN01
        'employee.company.companyName': '', // 济南公司
        'employee.company.companyCode': '', // SDJN
        'employee.postCode': '', // ceo
        phone: '' // 08277648513
      }
      this.getUserList(this.pageNation)
      clearFilterVal(this.formInline)
    },
    getUserList(param) {
      orgApi
        .getUserList(param)
        .then(res => {
          this.pageNation.total = res.count
          this.tableData = res.list
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getInsMenuTree() {
      orgApi.getInstitutionMenuTree({ ctrlPermi: 2 }).then(res => {
        const attributes = {
          id: 'id',
          parentId: 'pId',
          label: 'name',
          rootId: '0'
        }
        const treeData = toTreeData(res, attributes)
        this.instMenuData = treeData
      })
    },
    /* 列表文本转义 */
    swichText(type, val, other) {
      return dictTypeMap(type, val, other)
    },
    /* 获取全部机构 */
    getOfficeMenuTree() {
      const attributes = {
        id: 'id',
        parentId: 'pId',
        label: 'name',
        rootId: '0'
      }
      pubApi.getOfficeMenuTree({ ctrlPermi: 2, excludeCode: '' }).then(res => {
        this.menuData = toTreeData(res, attributes)
        this.innerDialogVisible = true
      })
    },
    getCompanyMenuTree() {
      const attributes = {
        id: 'id',
        parentId: 'pId',
        label: 'name',
        rootId: '0'
      }
      pubApi.getCompanyMenuTree().then(res => {
        this.innerDialogVisible = true
        this.menuData = toTreeData(res, attributes)
      })
    },

    /* changeKeyVal */
    changeKeyVal(val) {
      this.keyVal = val
    },
    showOrHidden() {
      const _this = this
      const btn = document.getElementById('btn')
      const userLeft = document.getElementById('userLeft')
      const userRight = document.getElementById('userRight')
      const bar = document.getElementById('bar')
      btn.addEventListener(
        'click',
        function() {
          _this.arrow = !_this.arrow
          const elWidth = userLeft.style.width
          if (elWidth !== '0px') {
            bar.style.display = 'none'
            userLeft.style.width = '0px'
            userRight.style.width = '100%'
          } else {
            userLeft.style.width = '200px'
            userRight.style.width = 'calc(100% - 200px)'
            setTimeout(function() {
              bar.style.display = 'block'
            }, 800) //
          }
        },
        false
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.user {
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  .user-left {
    width: 220px;
    position: relative;
    display: inline-block;
    height: 100%;
    // border-right: 1px solid #fafafa;
    transition: width 1s;
    -webkit-transition: width 1s;
    border-right: 10px solid #fafafa;
    .bar {
      width: 220px;
      height: 100%;
      // transition: width 1s;
      // -webkit-transition: width 1s;
    }
    .toglebtn {
      position: absolute;
      display: inline-block;
      top: 200px;
      left: 100%;
      background: #eee;
      height: 70px;
      width: 10px;
      line-height: 70px;
      cursor: pointer;
      .icon-position {
        margin-left: -3px;
      }
    }
  }
  .user-right {
    display: inline-block;
    width: calc(100% - 250px);
    .choosed-data {
      border: 1px solid #eee;
      height: calc(100% - 38px);
      padding: 10px;
      border-radius: 4px;
    }
  }
  .td-color {
    color: #1890ff;
    cursor: pointer;
  }
}
</style>
