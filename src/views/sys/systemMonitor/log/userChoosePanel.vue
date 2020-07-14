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
              @clickNodeReslut="clickNodeReslut"
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
              style="margin-bottom: 10px;"
              @searchBtn="searchBtn"
              @resetForm="resetForm"
            >
            </InputFliter>
            <el-row type="flex" :gutter="10">
              <el-col :span="18">
                <TableTree
                  ref="tableDomTree"
                  :table-head="tableHead"
                  :table-data="tableData"
                  :slot-columns="slotColumns"
                  :page-nation="pageNation"
                  @rowClick="rowClick"
                  @rowDblclick="rowDblclick"
                  @currentChange="currentChange"
                >
                  <template slot="status" slot-scope="scope">
                    <span
                      :style="[
                        { color: scope.row.status === '0' ? '#000' : '#f00' }
                      ]"
                    >
                      {{ swichText("sys_search_status", scope.row.status, "") }}
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
        </div>
      </template>
      <template slot="footer">
        <div style="text-indent: 100px;">
          <!-- <el-button
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
            @click="closeDialog('userForm')"
          >
            关闭
          </el-button> -->
        </div>
      </template>
    </DailogFrame>
  </div>
</template>
<script>
import DailogFrame from "@/components/dailogPanel/frame";
import LeftTree from "@/components/leftTree";
import InputFliter from "@/components/inputFliter";
import TableTree from "@/components/tableTree";

import {
  clearFilterVal,
  toTreeData,
  resetVal,
  getInputVal
} from "@/utils/pubFunc";
export default {
  name: "DataRights",
  components: {
    DailogFrame,
    LeftTree,
    InputFliter,
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
          type: "input",
          value: "",
          key: "loginCode",
          width: 90,
          label: "账号"
        },
        {
          type: "input",
          value: "",
          key: "userName",
          width: 90,
          label: "昵称"
        },
        {
          type: "input",
          value: "",
          key: "emial",
          width: 90,
          label: "姓名"
        },
        {
          type: "searchInput",
          value: "",
          key: "phone",
          width: 90,
          label: "机构"
        },
        {
          type: "searchInput",
          value: "",
          key: "phone",
          width: 90,
          label: "公司"
        },
        {
          type: "input",
          value: "",
          key: "mobile",
          width: 90,
          label: "手机"
        }
      ],
      slotColumns: ["status"],
      tableHead: {
        loginCode: "登录账号",
        userName: "用户昵称",
        email: "电子邮箱",
        mobile: "手机号码",
        phone: "办公电话",
        updateDate: "更新时间",
        status: "状态"
      },
      tableData: [],
      pageNation: {
        total: null,
        pageNo: 1,
        pageSize: 20,
        ctrlPermi: 2,
        status: "0"
      },
      tableCheckBoxValue: []
    };
  },
  mounted() {},
  methods: {
    show() {
      this.showUserChoose = true;
      this.$nextTick(() => {
        this.showOrHidden();
      });
      //   console.log(164, this.$store.state.publicData);
      //   this.formDetail = JSON.parse(JSON.stringify(res));
      //   Promise.all([this.getCompanyMenuTree(), this.getOfficeMenuTree()]).then(
      //     res => {
      //       // 已经选择的 默认的
      //       const temp = this.formDetail.userDataScopeList;
      //       for (let i = 0, len = temp.length; i < len; i++) {
      //         if (temp[i]["ctrlType"] === "Company") {
      //           this.companyCheckedArr.push(temp[i].ctrlData);
      //         } else if (temp[i]["ctrlType"] === "Office") {
      //           this.officeCheckedArr.push(temp[i].ctrlData);
      //         }
      //       }
      //       this.showDataRights = true;
      //       this.$nextTick(() => {
      //         this.$refs.menuTreeDom1.expandFirst(this.officeMenuData);
      //         this.$refs.menuTreeDom2.expandFirst(this.companyMenuData);
      //       });
      //     }
      //   );
    },
    showOrHidden() {
      const _this = this;
      const btn = document.getElementById("btn");
      const userLeft = document.getElementById("userLeft");
      const userRight = document.getElementById("userRight");
      const bar = document.getElementById("bar");
      btn.addEventListener(
        "click",
        function() {
          _this.arrow = !_this.arrow;
          const elWidth = userLeft.style.width;
          if (elWidth !== "0px") {
            bar.style.display = "none";
            userLeft.style.width = "0px";
            userRight.style.width = "100%";
          } else {
            userLeft.style.width = "200px";
            userRight.style.width = "calc(100% - 200px)";
            setTimeout(function() {
              bar.style.display = "block";
            }, 800); //
          }
        },
        false
      );
    },
    searchBtn() {
      // const temp = this.formInline.concat(this.moreFormItem);
      const valObj = getInputVal(this.formInline);
      const searchObj = Object.assign(valObj, this.pageNation);
      this.init(searchObj);
      console.log(searchObj);
    },
    rowClick(row) {
      this.tableCheckBoxValue = [];
      this.tableCheckBoxValue.push(row);
    },
    rowDblclick(row) {
      this.saveBtn();
    },
    /*  关闭当前选中 跳转到 编辑页 */
    saveBtn() {
      this.$emit("addUserVal", this.tableCheckBoxValue);
      this.showDailog = false;
    },
    // 单击树节点获取数据查询结果
    clickNodeReslut(data) {
      if (data.type === "click") {
        this.$refs.userRight.searchBtn(data.data);
        // console.log("左侧树节点双击", data);
      }
    },
    // 关闭对话框选择
    closeDialog() {
      this.showUserChoose = false;
      this.resetForm();
    },
    /* 清除输入框内的值 */
    resetForm() {
      this.pageNo = 1;
      this.init(this.pageNation);
      clearFilterVal(this.formInline);
    },
    /* 获取全部机构 */
    getOfficeMenuTree() {
      //   const attributes = {
      //     id: "id",
      //     parentId: "pId",
      //     label: "name",
      //     rootId: "0"
      //   };
      //   return new Promise((resolve, rejec) => {
      //     pubApi
      //       .getOfficeMenuTree({ ctrlPermi: 2, excludeCode: "" })
      //       .then(res => {
      //         this.officeMenuDataSource = JSON.parse(JSON.stringify(res));
      //         this.officeMenuData = toTreeData(res, attributes);
      //         resolve(res);
      //       });
      //   });
    }
  }
};
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
      .icon-position {
        margin-left: -3px;
      }
    }
  }
  .user-right {
    display: inline-block;
    width: calc(100% - 220px);
    .choosed-data {
      border: 1px solid #eee;
      height: 100%;
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
