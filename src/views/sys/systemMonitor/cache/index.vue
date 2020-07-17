<template>
  <div class="cache  wrapper_content">
    <div ref="cacheLeft" class="cache-left">
      <CacheList
        :cache-message="cacheKeyMessage"
        :table-head="keyTableHead"
        :table-data="keyTableData"
        @rowClick="rowClick"
        @reLoadFunc="reLoadKeyFunc"
        @deleteFunc="deleteKeyFunc"
      ></CacheList>
    </div>

    <div ref="cacheMddile" class="cache-mddile">
      <span id="btn1" class="toglebtn icon1" @click="arrowClick('btn1')">
        <i
          :class="
            arrow1 === true ? 'el-icon-caret-left' : 'el-icon-caret-right'
          "
          class="icon-position "
        ></i>
      </span>
      <CacheList
        :cache-message="cacheValMessage"
        :table-head="valTableHead"
        :table-data="valTableData"
        @rowClick="rowClickVal"
        @reLoadFunc="reLoadValFunc"
        @deleteFunc="deleteValFunc"
      ></CacheList>
      <span id="btn2" class="toglebtn icon2" @click="arrowClick('btn2')">
        <i
          :class="
            arrow2 === true ? 'el-icon-caret-right' : 'el-icon-caret-left'
          "
          class="icon-position "
        ></i>
      </span>
    </div>

    <div ref="cacheRight" class="cache-right">
      <div class="content clearfix">
        <i class="fa icon-notebook"></i>
        <span>缓存内容</span>
        <el-button
          icon="fr i-m fa fa-refresh"
          class="fr"
          size="mini"
          @click="clearAllCache"
        >
          清理全部缓存
        </el-button>
      </div>
      <el-form
        style="padding: 10px 30px;"
        :label-position="'top'"
        label-width="80px"
        :model="form"
      >
        <el-form-item label="缓存名称：">
          <el-input v-model="form.cacheName"></el-input>
        </el-form-item>
        <el-form-item label="缓存键名：">
          <el-input v-model="form.key"></el-input>
        </el-form-item>
        <el-form-item label="缓存内容：">
          <el-input v-model="form.value" type="textarea" :rows="10"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import CacheList from './cacheList'
// import { clearFilterVal, getInputVal, dictTypeMap } from "@/utils/pubFunc";
import { sysApi } from '../../../../api/systemMonitor'
export default {
  name: 'Cache',
  inject: ['reload'],
  components: {
    CacheList
  },
  data() {
    return {
      arrow1: true,
      arrow2: true,
      leftWidth: '300px',
      rightWidth: '400px',
      currentRow: {},
      cacheKeyMessage: {
        iconClass: 'fa icon-social-dribbble',
        text: '缓存列表'
      },
      cacheValMessage: {
        iconClass: 'fa icon-menu',
        text: '键名列表'
      },
      keyTableHead: {
        id: '缓存列表'
      },
      keyTableData: [],
      valTableHead: {
        id: '缓存键名'
      },
      valTableData: [],
      form: {
        cacheName: '',
        key: '',
        value: ''
      }
    }
  },
  mounted() {
    this.getCacheNameList()
  },
  methods: {
    reLoadKeyFunc() {
      this.getCacheNameList()
    },
    reLoadValFunc() {
      this.rowClick(this.currentRow)
    },
    getCacheNameList() {
      sysApi.getCacheNameList().then(res => {
        this.keyTableData = res
        // this.rowClick(res[0])
      })
    },
    showSearch(val) {
      this.showSearchVal = val
    },
    handlerName(funcName) {
      this[funcName]()
    },
    initPage() {
      this.reload()
    },
    // 获取缓存键名列表
    rowClick(row) {
      this.currentRow = row
      sysApi.getCacheKeyList({ id: row.id }).then(res => {
        this.valTableData = res
      })
    },
    // 获取缓存内容
    rowClickVal(row) {
      sysApi
        .getCacheValue({
          cacheName: row.cacheName,
          key: row.id
        })
        .then(res => {
          this.form = res
        })
    },

    arrowClick(btn) {
      const cacheLeft = this.$refs.cacheLeft
      const cacheRight = this.$refs.cacheRight
      const eLWidth = cacheLeft.style.width
      const eRWidth = cacheRight.style.width
      console.log(57, eRWidth)

      if (btn === 'btn1') {
        this.arrow1 = !this.arrow1
        if (eLWidth === '' || eLWidth === '300px') {
          cacheLeft.style.width = '0'
          cacheLeft.style.visibility = 'hidden'
        } else {
          cacheLeft.style.width = '300px'
          cacheLeft.style.visibility = 'visible'
        }
      } else {
        this.arrow2 = !this.arrow2
        if (eRWidth === '' || eRWidth === '400px') {
          cacheRight.style.width = '0'
          cacheRight.style.visibility = 'hidden'
        } else {
          console.log(131)
          cacheRight.style.width = '400px'
          cacheRight.style.visibility = 'visible'
        }
      }
    },
    deleteKeyFunc(row) {
      this.$alertMsgBox('确认要清理该缓存吗？', '信息')
        .then(() => {
          sysApi.deleteKeyFunc({ id: row.id }).then(res => {
            if (res.result === 'true') {
              this.$message.success(res.message)
            } else {
              this.$message.error(res.message)
            }
          })
        })
        .catch(() => {
          this.$message.info('取消')
        })
    },
    deleteValFunc(row) {
      // console.log(182, row)
      this.$alertMsgBox('确认要清理该缓存吗？', '信息')
        .then(() => {
          sysApi
            .deleteValFunc({
              cacheName: row.cacheName,
              id: row.id
            })
            .then(res => {
              if (res.result === 'true') {
                this.$message.success(res.message)
              } else {
                this.$message.error(res.message)
              }
            })
        })
        .catch(() => {
          this.$message.info('取消')
        })
    },
    // 清理全部缓存
    clearAllCache() {
      sysApi.clearAll().then(res => {
        if (res.result === 'true') {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.cache {
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  display: -webkit-box;
  // align-items: center;
  // justify-content: center;
  .cache-left {
    width: 300px;
    display: inline-block;
    height: 100%;
    transition: width 1s;
    -webkit-transition: width 1s;
    // border: 1px solid blue;
  }
  .cache-mddile {
    width: 100%;
    flex: 1;
    border-left: 6px solid #fafafa;
    border-right: 6px solid #fafafa;
    height: 100%;
    position: relative;
    // outline: 1px solid red;
    transition: width 1s;
    -webkit-transition: width 1s;
    .toglebtn {
      cursor: pointer;
      position: absolute;
      display: inline-block;
      top: 200px;
      background: #eee;
      height: 70px;
      width: 6px;
      line-height: 70px;
      border-radius: 5px;
      .icon-position {
        margin-left: -5px;
      }
    }
    .icon1 {
      right: 100%;
    }
    .icon2 {
      left: 100%;
    }
  }
  .cache-right {
    display: inline-block;
    width: 400px;
    height: 100%;
    // border: 1px solid green;
    transition: width 1s;
    -webkit-transition: width 1s;
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
      }
    }
  }
  .td-color {
    color: #1890ff;
    cursor: pointer;
  }
}
</style>
