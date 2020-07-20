<template>
  <div>
    <div class="content clearfix">
      <i :class="cacheMessage.iconClass"></i>
      <span>{{ cacheMessage.text }}</span>
      <i class="fr i-m fa fa-refresh" @click="reLoad"></i>
    </div>
    <TableTree
      :table-head="tableHead"
      :table-data="tableData"
      :column-text-postion="columnTextPostion"
      :table-fit="tableFit"
      :show-page="false"
      :high-light="true"
      v-on="$listeners"
    >
      <template slot="index">
        <el-table-column
          fixed
          label=""
          type="index"
          align="center"
          width="50"
        ></el-table-column>
      </template>
      <template slot="operate">
        <el-table-column fixed="right" label="操作" width="70" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              style="color: red;"
              @click="deleteHandleClick(scope.row)"
            >
              <i class="el-icon-delete" title="删除用户" />
            </el-button>
          </template>
        </el-table-column>
      </template>
    </TableTree>
  </div>
</template>
<script>
import TableTree from '@/components/tableTree'
export default {
  name: 'CacheList',
  components: {
    TableTree
  },
  props: {
    cacheMessage: {
      type: Object,
      default: () => {}
    },
    tableHead: {
      type: Object,
      default: () => {}
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableFit: true,
      columnTextPostion: {
        id: 'left'
      }
    }
  },
  methods: {
    reLoad() {
      this.$emit('reLoadFunc')
    },
    deleteHandleClick(row) {
      this.$emit('deleteFunc', row)
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  margin-top: 5px;
  line-height: 30px;
  height: 40px;
  padding: 5px 10px;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
  i {
    // vertical-align: initial;
    margin-right: 10px;
    font-size: 14px;
  }
  .i-m {
    margin-top: 5px;
    cursor: pointer;
  }
}
</style>
