<template>
  <div>
    sss
    <tinyEditor ></tinyEditor>
    <TableTree :table-data="tableData" :t-head="tHead">
      <template slot="operate">
        <el-button>操作</el-button>
      </template>
    </TableTree>
  </div>
</template>
<script>
import TableTree from "@/components/tableTree";
import tinyEditor from "@/components/fileManage/tinyEditor";
export default {
  name: "Test",
  components: {
    TableTree,
    tinyEditor
  },
  data() {
    return {
      tHead: {
        name: "姓名",
        age: "年龄", // 数字
        sex: "性别", // 单选
        hobby: "爱好", // 下拉复选
        bornDate: "出生日期", // 出生日期
        describle: "描述" // 描述
      },
      tableData: [
        {
          name: "name2",
          age: "age2", // 数字
          sex: "sex1", // 单选
          hobby: "hobby1", // 下拉复选
          bornDate: "2020/06-02", // 出身日期
          describle: "描述1" // 描述
        },
        {
          name: "name2",
          age: "age2", // 数字
          sex: "sex2", // 单选
          hobby: "hobby2", // 下拉复选
          bornDate: "2020/06-02", // 出身日期
          describle: "描述2" // 描述
        }
      ]
    };
  }
};
</script>
