<template>
  <div>
    <ColumnBar :column-text="'分配角色'"> </ColumnBar>
    <TableTree
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
    // tableHead: {
    //   type: Object,
    //   default: () => ({})
    // },
    // tableData: {
    //   type: Array,
    //   default: () => {
    //     return [];
    //   }
    // },
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
      },
      tableData: []
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
  mounted() {
    this.getRoleData();
  },
  methods: {
    getRoleData() {
      orgApi.getRole().then(res => {
        // console.log("juse", res);
        this.tableData = res;
      });
    },
    // 多选操作
    tableCheckBox(row) {
      console.log("多选操作", row);
      this.tableCheckBoxValueDetail = row;
    }
  }
};
</script>
