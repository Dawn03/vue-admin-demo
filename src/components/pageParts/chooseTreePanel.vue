/*带搜索图标输入框的选择弹窗模板*/
<template>
  <div class="input-choose-box">
    <DailogPanel
      :dialog-visible="showDailog"
      :title-name="titleName"
      @closeDialog="closeDialog"
    >
      <template slot="content">
        <MenuTree :menu-data="menuData"></MenuTree>
      </template>
      <template slot="footer"></template>
    </DailogPanel>
  </div>
</template>
<script>
import DailogPanel from "@/components/dailogPanel/frame";
import MenuTree from "@/components/menuTree";
// import xx from "@/xx";
export default {
  name: "InputTreeChoose",
  components: {
    DailogPanel,
    MenuTree
  },
  data() {
    return {
      showDailog: false,
      titleName: "机构选择",
      menuData: [
        {
          label: "苑东生物",
          id: "1",
          children: [
            {
              id: "1-1",
              label: "成都硕德",
              children: [
                {
                  id: "1-1-1",
                  label: "质量保证部"
                },
                {
                  id: "1-1-2",
                  label: "财务部"
                }
              ]
            },
            {
              id: "2-1",
              label: "成都优洛生物",
              children: [
                {
                  id: "2-1-1",
                  label: "质量保证部"
                },
                {
                  id: "2-1-2",
                  label: "财务部"
                },
                {
                  id: "2-1-3",
                  label: "生产技术部"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    // 关闭对话框选择
    closeDialog() {
      this.showDailog = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.input-choose-box {
}
</style>
