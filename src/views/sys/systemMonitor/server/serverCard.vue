<template>
  <div class="server-card">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="1">
        <template slot="title">
          <div class="title-box clearfix">
            <span class="fl">
              <i :class="barData.icon" style="margin: 0 6px 0 10px;"></i>
              {{ barData.text }}
            </span>
            <span :title="barData.title" class="fr" style="margin-right: 10px;">
              <i :class="barData.rightIcon"></i>
            </span>
          </div>
        </template>
        <slot name="head"></slot>
        <slot name="content"></slot>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  name: 'CacheList',
  components: {},
  props: {
    barData: {
      type: Object,
      default: () => {}
    }

    // tableData: {
    //   type: Array,
    //   default: () => []
    // }
  },
  data() {
    return {
      activeNames: ['1'],
      tableData11: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
    reLoad() {
      this.$emit('reLoadFunc')
    },
    deleteHandleClick(row) {
      this.$emit('deleteFunc', row)
    }
  }
}
</script>
<style lang="scss">
.server-card {
  border-radius: 3px;
  box-shadow: 0 0 5px #e0e0e0;
  .el-table th {
    background-color: #fafafa;
  }
  .el-table th.is-leaf,
  .el-table td,
  .el-collapse-item__wrap {
    border-bottom: none;
  }
  .el-collapse-item__content {
    padding-bottom: 0;
  }
  .title-box {
    width: 100%;
    font-size: 18px;
  }
}
</style>
