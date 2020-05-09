/*授权功能菜单*/
<template>
  <div class="menu-rights-box">
    <ul class=" muenu-box clearfix">
      <li class="first fl">
        <el-row style="margin-top:20px; ">
          <el-col :span="12">
            <el-checkbox v-model="checkAll1" @change="handleCheckAllChange1">
              主导航菜单
            </el-checkbox>
          </el-col>
          <el-col :span="12">
            <div class="ctrol-btn" @click="switchStatus1">
              展开/折叠
            </div>
          </el-col>
        </el-row>
        <MenuTree
          ref="menuTreeDom1"
          :menu-data="menuData"
          :default-expand="defaultExpand1"
          :expand-all="expandAll1"
          :show-checkbox="true"
        ></MenuTree>
      </li>
      <li class="scond fl">
        <el-row style="margin-top:20px;">
          <el-col :span="12">
            <el-checkbox v-model="checkAll2" @change="handleCheckAllChange2">
              演示子系统01
            </el-checkbox>
          </el-col>
          <el-col :span="12">
            <div class="ctrol-btn" @click="switchStatus2">
              展开/折叠
            </div>
          </el-col>
        </el-row>
        <MenuTree
          ref="menuTreeDom2"
          :menu-data="menuData"
          :default-expand="defaultExpand2"
          :expand-all="expandAll2"
          :show-checkbox="true"
        ></MenuTree>
      </li>
      <li class="third fl">
        <el-row style="margin-top:20px; ">
          <el-col :span="12">
            <el-checkbox v-model="checkAll3" @change="handleCheckAllChange3">
              演示子系统02
            </el-checkbox>
          </el-col>
          <el-col :span="12">
            <div class="ctrol-btn" @click="switchStatus3">
              展开/折叠
            </div>
          </el-col>
        </el-row>
        <MenuTree
          ref="menuTreeDom3"
          :menu-data="menuData"
          :default-expand="defaultExpand3"
          :expand-all="expandAll3"
          :show-checkbox="true"
        ></MenuTree>
      </li>
    </ul>
  </div>
</template>
<script>
import MenuTree from "@/components/menuTree";
export default {
  name: "MenuRights",
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
                  label:
                    "财务部sdsw服务无法污染物让人VR分热污染无若无所我认为若无"
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
      ],
      checkAll1: false,
      checkAll2: false,
      checkAll3: false,
      defaultExpand1: [],
      defaultExpand2: [],
      defaultExpand3: [],
      expandAll1: false,
      expandAll2: false,
      expandAll3: false
    };
  },
  methods: {
    /* 展开或收起选项 */
    switchStatus1() {
      this.expandAll1 = !this.expandAll1;
      this.$refs.menuTreeDom1.showOrHiddenAllNodes();
    },
    switchStatus2() {
      console.log(2);
      this.expandAll2 = !this.expandAll2;
      this.$refs.menuTreeDom2.showOrHiddenAllNodes();
    },
    switchStatus3() {
      console.log(3);
      this.expandAll3 = !this.expandAll3;
      this.$refs.menuTreeDom3.showOrHiddenAllNodes();
    },

    /* 设置全选反选 */
    handleCheckAllChange1(val) {
      this.$refs.menuTreeDom1.checkAll(val);
    },
    /* 设置全选反选 */
    handleCheckAllChange2(val) {
      this.$refs.menuTreeDom2.checkAll(val);
    },
    /* 设置全选反选 */
    handleCheckAllChange3(val) {
      this.$refs.menuTreeDom3.checkAll(val);
    }
  }
};
</script>
<style lang="scss" scoped>
.menu-rights-box {
  .ctrol-btn {
    text-align: right;
  }

  .muenu-box {
    .first,
    .scond,
    .third {
      margin: 0 1% 20px 0;
      background: #fafafa;
      // background: salmon;
      padding: 20px;
      min-width: 32%;
      // border: 3px solid darkcyan;
    }
    .first {
    }
    .scond {
    }
    .third {
    }
  }
}
</style>
