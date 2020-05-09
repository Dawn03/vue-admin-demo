<template>
  <div class="user-head ">
    <LeftTree :title-name="'组织机构'" :menu-data="menuData"></LeftTree>
  </div>
</template>
<script>
import LeftTree from "@/components/leftTree";
export default {
  components: {
    LeftTree
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
