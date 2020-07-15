/*新增/编辑 菜单*/
<template>
  <div>
    <DailogPanel
      :dialog-visible="showDailog"
      :title-name="titleName"
      :app-to-body="true"
      @closeDialog="closeDialog"
    >
      <template slot="content">
        <el-form
          ref="logForm"
          :model="logForm"
          label-width="100px"
          class="demo-ruleForm"
          size="mini"
          :rules="logFormRules"
        >
          <DymForm
            :edit-model="editModel"
            :component-list="componentList"
            :form-value.sync="logForm"
          >
          </DymForm>
        </el-form>
      </template>
      <template slot="footer">
        <el-button size="mini" @click="colseBtn">关闭</el-button>
      </template>
    </DailogPanel>
  </div>
</template>
<script>
import DymForm from "@/components/element/dymForm";
import DailogPanel from "@/components/dailogPanel/frame";
import { toTreeData, dictTypeMap, resetVal } from "@/utils/pubFunc";
import { sysApi } from "@/api/systemMonitor";
// import { pubApi } from "@/api/public_request";
// import { returnReg } from "@/utils/validate";

export default {
  name: "",
  components: {
    DailogPanel,
    DymForm
  },
  data() {
    return {
      showDailog: false,
      titleName: "日志详情",
      editModel: "E",
      logForm: {
        logTitle: "",
        logType: "",
        requestUri: "",
        requestParams: "",
        createByName: "",
        createBy: "",
        bizType: "",
        bizKey: "",
        createDate: "",
        remoteAddr: "",
        userAgent: "",
        // isException: "异常",
        deviceName: "",
        browserName: "",
        executeTimeFormat: ""
      },
      componentList: [
        {
          label: "日志标题：",
          prop: "logTitle",
          labelWidth: "120px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          value: "logTitle"
        },
        {
          label: "日志类型：",
          prop: "logType",
          labelWidth: "120px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          value: "logType"
        },
        {
          label: "请求地址：",
          prop: "requestUri",
          labelWidth: "120px",
          componentName: "el-input",
          cols: [24, 24, 24, 24],
          value: "requestUri",
          addIcon: true,
          slotPosition: "prepend",
          iconText: "",
          anotherIcon: true,
          anotherSlotPosition: "append",
          anotherIconText: ""
        },
        {
          label: "提交的数据：",
          prop: "requestParams",
          labelWidth: "120px",
          componentName: "el-input",
          cols: [24, 24, 24, 24],
          value: "requestParams"
        },
        {
          label: "操作用户：",
          prop: "createByName",
          labelWidth: "120px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          value: "createByName"
        },
        {
          label: "操作账号：",
          prop: "createBy",
          labelWidth: "120px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          value: "createBy"
        },
        {
          label: "业务类型：",
          prop: "bizType",
          labelWidth: "120px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          value: "bizType"
        },
        {
          label: "业务主键：",
          prop: "bizKey",
          labelWidth: "120px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          value: "bizKey"
        },
        {
          label: "操作时间：",
          prop: "createDate",
          labelWidth: "120px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          value: "createDate"
        },
        {
          label: "客户端IP：",
          prop: "remoteAddr",
          labelWidth: "120px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          value: "remoteAddr"
        },
        {
          label: "用户代理：",
          prop: "userAgent",
          labelWidth: "120px",
          componentName: "el-input",
          cols: [24, 24, 24, 24],
          value: "userAgent"
        },
        {
          label: "设备名称：",
          prop: "deviceName",
          labelWidth: "120px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          value: "deviceName"
        },
        {
          label: "浏览器名称：",
          prop: "browserName",
          labelWidth: "120px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          value: "browserName"
        },
        {
          label: "响应时间：",
          prop: "executeTimeFormat",
          labelWidth: "120px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          value: "executeTimeFormat"
        }
      ],
      logFormRules: {}
    };
  },
  methods: {
    show(row, type) {
      // console.log("319", type, row);
      this.init(row);
    },
    init(row, param) {
      sysApi
        .getLogDetail({
          key: "id",
          value: row.id
        })
        .then(res => {
          this.logForm = res.log;
          this.componentList[2].iconText = res.log.serverAddr;
          this.componentList[2].anotherIconText = res.log.requestMethod;
          this.showDailog = true;
        });
    },
    colseBtn() {
      this.closeDialog();
    },
    // 关闭对话框选择
    closeDialog() {
      this.showDailog = false;
    }
  }
};
</script>
<style lang="scss" scoped></style>
