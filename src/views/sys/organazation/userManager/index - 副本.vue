<template>
  <div class="user">
    <div class="nav">顶部位置预留</div>
    <div class="clearfix">
      <MenuTree
        class="fl"
        :menu-data="menuData"
        :default-expand="['1']"
      ></MenuTree>
      <TableTree
        :table-head="tableHead"
        :table-data="tableData"
        :column-widths="columnWidths"
        :slot-columns="slotColumns"
        :table-fit="tableFit"
        class="fr table-width"
        style=" width: calc(100% - 210px);"
        @tableCheckBox="tableCheckBox"
      >
        <template slot="chechbox">
          <el-table-column type="selection" width="40"></el-table-column>
        </template>
        <template slot="invoice" slot-scope="scope">
          <span class="td-color">{{ scope.row.invoice }}</span>
        </template>
        <template slot="quality" slot-scope="scope">
          <span class="td-color">{{ scope.row.quality }}</span>
        </template>
        <template slot="vehicle_license" slot-scope="scope">
          <span class="td-color">{{ scope.row.vehicle_license }}</span>
        </template>
        <template slot="operate">
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="editHandleClick(scope.row)"
              >
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="deleteHandleClick(scope.row)"
              >
                <i class="el-icon-delete"></i>
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="moreHandleClick(scope.row)"
              >
                <i v-show="changeArrowDirection" class="el-icon-arrow-down"></i>
                <i v-show="!changeArrowDirection" class="el-icon-arrow-up"></i>
              </el-button>
              <!-- <ul>
                <li>分配角色</li>
                <li>数据权限</li>
                <li>重置密码</li>
              </ul> -->
            </template>
          </el-table-column>
        </template>
      </TableTree>
    </div>
  </div>
</template>
<script>
import MenuTree from "@/components/menuTree";
import TableTree from "@/components/tableTree";
export default {
  name: "UserManage",
  components: {
    MenuTree,
    TableTree
  },
  data() {
    return {
      changeArrowDirection: true,
      tableCheckBoxValue: [],
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
      ],
      tableFit: true,
      columnWidths: {
        invoice: 130,
        number: 130,
        format: 130
      },
      slotColumns: ["invoice", "quality", "vehicle_license"],
      tableHead: {
        invoice: "发票信息",
        quality: "合格证",
        number: "车辆编号",
        format: "车辆类型",
        department: "部门归属",
        brand: "车辆品牌",
        card_time: "上牌时间",
        vehicle_license: "行驶证",
        maintenance: "保养说明",
        car_user: "当值司机",
        car_manager: "负责人电话",
        status: "状态",
        useSetion: "使用部门"
      },
      tableData: [
        {
          id: 1,
          number: "车辆编号",
          format: "车辆类型",
          department: "部门归属",
          brand: "车辆品牌",
          card_time: "上牌时间",
          invoice: "发票信息",
          quality: "合格证",
          vehicle_license: "行驶证",
          maintenance: "保养说明",
          car_user: "当值司机",
          car_manager: "负责人电话",
          status: "状态",
          useSetion: "使用部门",
          children: [
            {
              id: 11,
              number: "车辆编号1",
              format: "车辆类型1",
              department: "部门归属1",
              brand: "车辆品牌1",
              card_time: "上牌时间1",
              invoice: "发票信息1",
              quality: "合格证1",
              vehicle_license: "行驶证1",
              maintenance: "保养说明1",
              car_user: "当值司机1",
              car_manager: "负责人电话1",
              status: "状态1",
              useSetion: "使用部门1"
            },
            {
              id: 12,
              number: "车辆编号2",
              format: "车辆类型2",
              department: "部门归属2",
              brand: "车辆品牌2",
              card_time: "上牌时间2",
              invoice: "发票信息2",
              quality: "合格证2",
              vehicle_license: "行驶证2",
              registration: "登记证2",
              maintenance: "保养说明2",
              car_user: "当值司机2",
              car_manager: "负责人电话2",
              status: "状态2",
              useSetion: "使用部门2"
            }
          ]
        },
        {
          id: 2,
          number: "车辆编号",
          format: "车辆类型",
          department: "部门归属",
          brand: "车辆品牌",
          card_time: "上牌时间",
          invoice: "发票信息",
          quality: "合格证",
          vehicle_license: "行驶证",
          registration: "登记证",
          maintenance: "保养说明",
          car_user: "当值司机",
          car_manager: "负责人电话",
          status: "状态",
          useSetion: "使用部门"
        }
      ]
    };
  },
  watch: {
    checkboxVal(valArr) {
      const tempObj = {};
      // 为了保证table 每次都会重渲
      // this.key = this.key + 1;
      for (let i = 0, len = valArr.length; i < len; i++) {
        if (this.headerMap[valArr[i]] && !tempObj[valArr[i]]) {
          tempObj[valArr[i]] = this.headerMap[valArr[i]];
        }
      }
      this.tableHead = tempObj;
    }
  },
  methods: {
    // 多选操作
    tableCheckBox(row) {
      this.tableCheckBoxValue = row;
      console.log("选中的row", row);
    },
    editHandleClick(row) {
      this.$router.replace({ name: "clxxEdit", query: { row: row } });
    },
    deleteHandleClick(row) {
      this.$alertMsgBox("确认要停用该用户吗", "信息")
        .then(() => {
          this.$message.success("成功");
        })
        .catch(() => {
          this.$message.info("取消");
        });
    },
    moreHandleClick(row) {
      this.changeArrowDirection = !this.changeArrowDirection;
    }
  }
};
</script>
<style lang="scss" scoped>
.user {
  width: 100%;
  height: 100%;
  .nav {
    height: 45px;
    text-align: center;
  }
  .td-color {
    color: #1890ff;
    cursor: pointer;
  }
  .table-witth {
  }
}
</style>
