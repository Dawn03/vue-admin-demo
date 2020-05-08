<template>
  <div class="user-head ">
    <div class="part-left">
      <i class="el-icon-menu"></i>
      <span>组织机构</span>
      <i class="el-icon-edit"></i>
      <i class="el-icon-arrow-down"></i>
      <i class="el-icon-refresh"></i>
    </div>
    <MenuTree :menu-data="menuData" :default-expand="['1']"></MenuTree>
  </div>
</template>
<script>
import MenuTree from "@/components/menuTree";

export default {
  components: {
    MenuTree
  },
  data() {
    return {
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
  }
};
</script>
<style lang="scss" scoped>
.user-head {
  width: 100%;
  line-height: 45px;
  text-align: left;
  text-indent: 5px;
  .part-left {
    border-bottom: 1px solid #eee;
    // width: 200px;
  }
}
</style>
