<template>
  <div class=" wrapper_content">
    缓存
  </div>
</template>
<script>
// import { clearFilterVal, getInputVal, dictTypeMap } from "@/utils/pubFunc";
// import { sysApi } from "../../../../api/systemMonitor";
export default {
  name: "Cache",
  inject: ["reload"],
  components: {},
  data() {
    return {};
  },
  mounted() {
    this.init(this.pageNation);
  },
  methods: {
    showSearch(val) {
      this.showSearchVal = val;
    },
    handlerName(funcName) {
      this[funcName]();
    },
    initPage() {
      this.reload();
    },
    init(param) {
      // console.log(2222, param);
      // sysApi.getLog(param).then(res => {
      //   this.tableData = res.list;
      //   this.pageNation.total = res.count;
      // });
    }
  }
};
</script>
<style lang="scss" scoped></style>
