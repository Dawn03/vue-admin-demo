<template>
  <div class="cache  wrapper_content">
    <div id="cacheLeft" ref="cacheLeft" class="cache-left">
      <CacheList
        :cacheMessage="cacheKeyMessage"
        :tableHead="keyTableHead"
        :tableData="keyTableData"
        @rowClick="rowClick"
        @reLoadFunc="reLoadKeyFunc"
      ></CacheList>
    </div>

    <div id="cacheMddile" ref="cacheMddile" class="cache-mddile">
      <span id="btn1" class="toglebtn icon1" @click="arrowClick('btn1')">
        <i
          :class="
            arrow1 === true ? 'el-icon-caret-left' : 'el-icon-caret-right'
          "
          class="icon-position "
        ></i>
      </span>
      <CacheList
        :cacheMessage="cacheValMessage"
        :tableHead="valTableHead"
        :tableData="valTableData"
        @reLoadFunc="reLoadValFunc"
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

    <div id="cacheRight" ref="cacheRight" class="cache-right"></div>
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
      leftWidth: '25%',
      middleWidth: '35%',
      rightWidth: '40%',
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
      valTableData: []
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
    arrowClick(btn) {
      // console.log(57, btn)
      const cacheLeft = this.$refs.cacheLeft
      const cacheMddile = this.$refs.cacheMddile
      const cacheRight = this.$refs.cacheRight
      const eLWidth = cacheLeft.style.width
      const eRWidth = cacheRight.style.width
      if (btn === 'btn1') {
        this.arrow1 = !this.arrow1
        if (eLWidth !== '0px') {
          cacheLeft.style.width = '0px'
        } else {
          cacheLeft.style.width = '25%'
        }
      } else {
        this.arrow2 = !this.arrow2
        if (eRWidth !== '0px') {
          cacheRight.style.width = '0px'
        } else {
          cacheRight.style.width = '40%'
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.cache {
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
  .cache-left {
    width: 25%;
    display: inline-block;
    height: 100%;
    transition: width 1s;
    -webkit-transition: width 1s;
    // border: 1px solid blue;
  }
  .cache-mddile {
    // width: 100%;
    flex: 1;
    border-left: 10px solid #fafafa;
    border-right: 10px solid #fafafa;
    height: 100%;
    position: relative;
    // outline: 1px solid red;
    transition: width 1s;
    -webkit-transition: width 1s;
    .toglebtn {
      position: absolute;
      display: inline-block;
      top: 200px;
      background: #eee;
      height: 70px;
      width: 10px;
      line-height: 70px;
      .icon-position {
        margin-left: -3px;
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
    width: 40%;
    height: 100%;
    // border: 1px solid green;
    transition: width 1s;
    -webkit-transition: width 1s;
  }
  .td-color {
    color: #1890ff;
    cursor: pointer;
  }
}
</style>
