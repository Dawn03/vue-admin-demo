<template>
  <div>
    <ColumnBar :column-text="'分配角色'"> </ColumnBar>
    <TableTree
      ref="table"
      :table-head="tableHead"
      :table-data="tableData"
      :default-height="200"
      @tableCheckBox="tableCheckBox"
    >
      <template slot="chechbox">
        <el-table-column type="selection" width="40"></el-table-column>
      </template>
      <template slot="affiation" slot-scope="scope">
        <el-input v-model="scope.row.affiation">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </template>
      <template slot="jobs" slot-scope="scope">
        <el-input v-model="scope.row.jobs">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </template>
    </TableTree>
  </div>
</template>
<script>
import ColumnBar from "@/components/commonColumn";
import TableTree from "@/components/tableTree";
import { orgApi } from "@/api/organization";
export default {
  name: "AssignRoleDetail",
  components: {
    ColumnBar,
    TableTree
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    tableCheckBoxValue: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      tableHead: {
        name: "角色名称",
        id: "角色编码"
      }
    };
  },
  computed: {
    tableCheckBoxValueDetail: {
      get() {
        return this.tableCheckBoxValue;
      },
      set(val) {
        this.$emit("tableCheckBoxVal", val);
      }
    }
  },
  mounted() {},
  methods: {
    // 多选回显
    showHadCheckedRow(rows) {
      console.log(105, rows);
      if (rows.length > 0) {
        //  toggleSelection
        this.$refs.table.toggleSelection(rows);
        // rows.forEach(row => {

        // });
      } else {
        /* 无值清空 */
        // this.toggleSelection();
      }
    },
    // 多选操作
    tableCheckBox(row) {
      this.tableCheckBoxValueDetail = row;
    },
    // 清除checkedBox多选操作
    toggleSelection() {
      console.log(999);
      this.$refs.table.toggleSelection();
    }
  }
};
</script>
