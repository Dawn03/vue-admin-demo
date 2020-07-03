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
        <ColumnBar :column-text="'基本信息'"></ColumnBar>
        <el-form
          ref="menuForm"
          :model="menuForm"
          label-width="100px"
          class="demo-ruleForm"
          size="mini"
          :rules="menuFormRules"
        >
          <DymForm
            :edit-model="editModel"
            :component-list="componentList"
            :form-value.sync="menuForm"
            @focusIt="focusIt"
          >
          </DymForm>
        </el-form>
        <!-- <el-row style="margin-top:20px;">
          <el-col :span="12">
            <el-row style="margin-top:20px;">
              <el-col :span="24">
                <MenuTree
                  ref="menuTreeDom1"
                  :menu-data="officeMenuData"
                  :default-expand="defaultExpand1"
                  :expand-all="expandAll1"
                  :show-checkbox="true"
                  :checked-arr="officeCheckedArr"
                  @passCheckedNode="officePassCheckedNode"
                ></MenuTree>
              </el-col>
            </el-row>
          </el-col>
        </el-row> -->
        <FontChoose ref="showFont" @iconChoose="iconChoose"></FontChoose>
      </template>
      <template slot="footer">
        <el-button size="mini" type="primary" @click="saveBtn">保存</el-button>
        <el-button size="mini" @click="colseBtn">关闭</el-button>
      </template>
    </DailogPanel>
  </div>
</template>
<script>
import DymForm from "@/components/element/dymForm";
import DailogPanel from "@/components/dailogPanel/frame";
import ColumnBar from "@/components/commonColumn";
import MenuTree from "@/components/menuTree";
import FontChoose from "./fontsIcon/index";
import { toTreeData, dictTypeMap, resetVal } from "@/utils/pubFunc";
import { sysApi } from "@/api/systemSet";
import { pubApi } from "@/api/public_request";

export default {
  name: "",
  components: {
    DailogPanel,
    DymForm,
    ColumnBar,
    MenuTree,
    FontChoose
  },
  data() {
    return {
      showDailog: false,
      titleName: "编辑菜单",
      editModel: "E",
      currentRow: {},
      menuForm: {
        loginCode: "",
        parent: {
          menuNameOrig: "",
          id: ""
        },
        menuNameOrig: "",
        menuType: "",
        menuName: "",
        moduleCodes: [],
        menuHref: "",
        menuTarget: "",
        treeSort: "",
        permission: "",
        menuIcon: "",
        menuColor: "",
        menuTitle: "",
        isShow: "",
        weight: "",
        remarks: ""
      },
      componentList: [
        {
          label: "上级菜单：",
          prop: "menuNameOrig",
          labelWidth: "120px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          value: "menuNameOrig",
          addIcon: true,
          slotPosition: "append",
          iconType: "el-icon-search"
        },
        {
          label: "菜单类型：",
          prop: "menuType",
          labelWidth: "120px",
          componentName: "RadioChoose",
          cols: [11, 11, 11, 11],
          value: "menuType",
          radios: this.getMenuType("sys_menu_type"),
          questionIcon: true,
          questionText: "标识当前是否是个菜单，还是只是设置权限"
        },
        {
          label: "菜单名称：",
          prop: "menuName",
          labelWidth: "120px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          value: "menuName"
        },
        {
          label: "归属模块：",
          prop: "moduleCodes",
          labelWidth: "120px",
          componentName: "CheckBoxChoose",
          cols: [12, 12, 12, 12],
          value: "moduleCodes",
          options: [],
          questionIcon: true,
          questionText: "指定菜单所属的模块，在开启和禁用模块的时候停用所属菜单"
        },
        {
          label: "链接(Href)：",
          prop: "menuHref",
          labelWidth: "120px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          value: "menuHref",
          questionIcon: true,
          width: "calc(100% - 28px)",
          inline: "inline-block",
          questionText:
            " 链接地址的跟路径，默认在 adminPath 路径下，外部链接需加'http://'; \r 1、如果以  /// 开头，则代表是站点根路径（结果：http://localhost/{href}）\r2、如果以  // 开头，则代表是工程根路径（结果：http://localhost/{ctxPath}/{href}）\r3、如果以  / 开头，则代表是管理根路径（结果：http://localhost/{ctxPath}/{adminPath}/{href}）可带变量，变量格式  {变量名}\r1、jeesite.yml中的key可作为变量设置\r2、{ssoToken} : 单点登录的token编码，url参数中的参数分隔符请使用'%26'进行转义，例如：{projectUrl}/sso/{ssoToken}?url=/sys/user/list?p1=v1%26p2=v2&relogin=true\r3、{userCode} : 当前用户编码\r4、{userName} : 当前用户名称\r5、{userType} : 当前用户类型 "
        },
        {
          label: "目标(Target)：",
          prop: "menuTarget",
          labelWidth: "120px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          value: "menuTarget",
          questionIcon: true,
          width: "calc(100% - 28px)",
          inline: "inline-block",
          questionText:
            "链接打开的目标，默认addTabPage方式（新窗口中打开如：_blank）"
        },
        {
          label: "排序（升序）：",
          prop: "treeSort",
          labelWidth: "120px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          value: "treeSort"
        },
        {
          label: "权限标志：",
          prop: "permission",
          labelWidth: "120px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          value: "permission",
          questionIcon: true,
          width: "calc(100% - 28px)",
          inline: "inline-block",
          questionText:
            "控制器中定义的权限标识，如：@RequiresPermissions('权限标识')"
        },
        {
          label: "菜单图标：",
          prop: "menuIcon",
          labelWidth: "120px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          value: "menuIcon",
          addIcon: true,
          slotPosition: "append",
          iconType: "el-icon-search",
          anotherSlotPosition: "prepend",
          anotherIcon: true,
          anotherIconType: "el-icon-search"
        },
        {
          label: "字体颜色：",
          prop: "menuColor",
          labelWidth: "120px",
          componentName: "el-input",
          cols: [11, 11, 11, 11],
          value: "menuColor",
          colorPicker: ""
        },
        {
          labelWidth: "0px",
          prop: "menuColor",
          componentName: "el-color-picker",
          cols: [1, 1, 1, 1],
          showAlpha: true,
          value: "menuColor"
        },
        {
          label: "页签标题：",
          prop: "menuTitle",
          labelWidth: "120px",
          componentName: "el-input",
          cols: [12, 12, 12, 12],
          value: "menuTitle"
        },

        {
          label: "可见：",
          prop: "isShow",
          labelWidth: "120px",
          componentName: "RadioChoose",
          cols: [12, 12, 12, 12],
          value: "isShow",
          radios: this.getMenuType("sys_show_hide")
        },
        {
          label: "菜单权重：",
          prop: "weight",
          labelWidth: "120px",
          componentName: "BaseSelect",
          cols: [12, 12, 12, 12],
          value: "weight",
          options: this.getMenuType("sys_menu_weight"),
          questionIcon: true,
          width: "calc(100% - 28px)",
          inline: "inline-block",
          questionText:
            "菜单权重：默认20；>=40一般管理员；>=60系统管理员；>=80超级管理员"
        },
        {
          label: "其他信息", // 授权功能菜单
          lineTips: true,
          cols: [24, 24, 24, 24],
          showFlag: false
        },
        {
          label: "备注信息：",
          prop: "remarks",
          componentName: "el-input",
          type: "textarea",
          cols: [24, 24, 24, 24],
          placeholder: "请输入",
          labelWidth: "90px",
          rowsSpan: 4,
          value: "remarks"
        },
        {
          label: "扩展字段", // 授权功能菜单
          lineTips: true,
          cols: [24, 24, 24, 24],
          showFlag: false,
          iconTips: true
        }
      ],
      menuFormRules: {
        menuType: [{ required: true, message: "必填信息", trigger: "blur" }],
        moduleCodes: [{ required: true, message: "必填信息", trigger: "blur" }]
      },
      isIndeterminate1: true,
      officeMenuData: [],
      officeMenuDataSource: [],
      officeCheckedArr: [],
      officeCheckedArrSave: []
    };
  },
  methods: {
    show(row, type) {
      this.currentRow = row;
      this.init(row);
    },
    init(row) {
      Promise.all([
        this.initMenuCodeEdit(row)
        // this.getOfficeMenuTree(),
      ]).then(res => {
        const initData = res[0];
        this.componentList[3].options = [];
        for (let i = 0, len = initData.moduleList.length; i < len; i++) {
          this.componentList[3].options.push({
            value: initData.moduleList[i].id,
            label: initData.moduleList[i].moduleName
          });
        }
      });
    },
    iconChoose(iconName) {
      this.menuForm.menuIcon = iconName;
      this.componentList[8].anotherIconType = iconName;
    },
    /* 获取初始化页面数据 */
    initMenuCodeEdit(row) {
      /* "Company" "Office"  "Role"*/
      return new Promise((resolve, reject) => {
        sysApi.initMenuCodeEdit({ menuCode: row.menuCode }).then(res => {
          // for (let i = 0, len = res.userDataScopeList.length; i < len; i++) {
          // }
          this.menuForm.menuNameOrig = res.menu.menuNameOrig;
          this.menuForm.menuType = res.menu.menuType;
          this.menuForm.menuName = res.menu.menuName;
          this.menuForm.moduleCodes = ["bpm", "cms"]; // res.menu.moduleCodes.split(",");
          this.menuForm.menuHref = res.menu.menuHref;
          this.menuForm.menuTarget = res.menu.menuTarget;
          this.menuForm.treeSort = res.menu.treeSort;
          this.menuForm.permission = res.menu.permission;
          this.menuForm.menuIcon = res.menu.menuIcon;
          this.menuForm.menuColor = res.menu.menuColor;
          this.menuForm.menuTitle = res.menu.menuTitle;
          this.menuForm.isShow = res.menu.isShow + "";
          this.menuForm.weight = res.menu.weight + "";
          this.componentList[8].anotherIconType = res.menu.menuIcon;
          this.showDailog = true;
          resolve(res);
        });
      });
    },
    /* 列表文本转义 */
    getMenuType(type) {
      const selectTypeData = JSON.parse(
        sessionStorage.getItem("selectDicType")
      );
      return selectTypeData[type];
    },
    focusIt(keyName) {
      // console.log(338, keyName);
      this.$refs.showFont.show();
    },
    saveBtn() {
      const obj = {
        userDataScopeListJson: JSON.stringify(tempUserDataScopeListJson)
      };
      // console.log(77, obj);
      // roleApi.saveSecAdmin(obj).then(res => {
      //   if (res.result === "true") {
      //     this.$message.success(res.message);
      //     this.showDailog = false;
      //   } else {
      //     this.$message.error(res.message);
      //   }
      //   console.log(231, this.roleCheckedArrSave);
      // });
    },
    colseBtn() {
      this.closeDialog();
    },
    // 关闭对话框选择
    closeDialog() {
      this.resetForm();
      this.showDailog = false;
    },
    /* 清除输表单里的值 */
    resetForm() {
      this.menuForm.loginCode = "";
      this.menuForm.userName = "";
      this.companyCheckedArr = [];
      this.officeCheckedArr = [];
      this.roleCheckedArr = [];
    }
  }
};
</script>
<style lang="scss" scoped>
.choosed-data {
  border: 1px solid #eee;
  height: 100%;
  padding: 10px;
  border-radius: 4px;
}
.add-user-box {
}
</style>
