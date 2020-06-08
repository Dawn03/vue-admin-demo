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
          :menu-data="menuData1"
          :default-expand="defaultExpand1"
          :expand-all="expandAll1"
          :show-checkbox="true"
          @passCheckedNode="passCheckedNode1"
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
          :menu-data="menuData2"
          :default-expand="defaultExpand2"
          :expand-all="expandAll2"
          :show-checkbox="true"
          @passCheckedNode="passCheckedNode2"
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
          :menu-data="menuData3"
          :default-expand="defaultExpand3"
          :expand-all="expandAll3"
          :show-checkbox="true"
          @passCheckedNode="passCheckedNode3"
        ></MenuTree>
      </li>
    </ul>
  </div>
</template>
<script>
import MenuTree from "@/components/menuTree";
import { roleApi } from "@/api/role";
import { toTreeData } from "@/utils/pubFunc";

export default {
  name: "MenuRights",
  components: {
    MenuTree
  },

  data() {
    return {
      menuData1: [],
      menuData2: [],
      menuData3: [],
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
      expandAll3: false,
      checkTree1: [],
      checkTree2: [],
      checkTree3: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    /* 获取授权功能菜单默认数据 */
    init() {
      roleApi.getAuthorizeData({ roleCode: "" }).then(res => {
        const attributes = {
          id: "id",
          parentId: "pId",
          label: "title",
          rootId: "0"
        };
        this.menuData1 = toTreeData(res.menuMap.default, attributes);
        this.menuData2 = toTreeData(res.menuMap.default1, attributes) || [];
        this.menuData3 = toTreeData(res.menuMap.default2, attributes) || [];
      });
    },
    /* 展开或收起选项 */
    switchStatus1() {
      this.expandAll1 = !this.expandAll1;
      this.$refs.menuTreeDom1.showOrHiddenAllNodes();
    },
    switchStatus2() {
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
      console.log(175, val);
      this.$refs.menuTreeDom1.checkAll(val);
      this.$emit("checkTree", { val: val, current: 1 });
    },
    /* 设置全选反选 */
    handleCheckAllChange2(val) {
      console.log(180, val);
      this.$refs.menuTreeDom2.checkAll(val);
      this.$emit("checkTree", { val, current: 2 });
    },
    /* 设置全选反选 */
    handleCheckAllChange3(val) {
      console.log(185, val);
      this.$refs.menuTreeDom3.checkAll(val);
      this.$emit("checkTree", { val, current: 3 });
    },
    // 当前以及勾选节点
    passCheckedNode1(val) {
      this.$emit("checkTree", { val, current: 1 });
      // this.checkTree = val;
      // console.log(190, val);
    },
    // 当前以及勾选节点
    passCheckedNode2(val) {
      this.$emit("checkTree", { val, current: 2 });
      // this.checkTree = val;
      // console.log(190, val);
    },
    // 当前以及勾选节点
    passCheckedNode3(val) {
      this.$emit("checkTree", { val, current: 3 });
      // this.checkTree3 = val;
      // console.log(190, val);
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
