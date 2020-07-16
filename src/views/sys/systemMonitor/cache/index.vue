<template>
  <div class="cache  wrapper_content">
    <div id="cacheLeft" ref="cacheLeft" class="cache-left"></div>

    <div id="cacheMddile" ref="cacheMddile" class="cache-mddile">
      <span id="btn1" class="toglebtn icon1" @click="arrowClick('btn1')">
        <i
          :class="
            arrow1 === true ? 'el-icon-caret-right' : 'el-icon-caret-left'
          "
          class="icon-position "
        ></i>
      </span>
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
// import { clearFilterVal, getInputVal, dictTypeMap } from "@/utils/pubFunc";
// import { sysApi } from "../../../../api/systemMonitor";
export default {
  name: 'Cache',
  inject: ['reload'],
  components: {},
  data() {
    return {
      arrow1: true,
      arrow2: true,
      leftWidth: '25%',
      middleWidth: '35%',
      rightWidth: '40%'
    }
  },
  mounted() {
    this.init(this.pageNation)
  },
  methods: {
    showSearch(val) {
      this.showSearchVal = val
    },
    handlerName(funcName) {
      this[funcName]()
    },
    initPage() {
      this.reload()
    },
    init() {
      // this.showOrHidden();
    },
    arrowClick(btn) {
      console.log(52, btn)
      const cacheLeft = this.$refs.cacheLeft
      const cacheMddile = this.$refs.cacheMddile
      const cacheRight = this.$refs.cacheRight
      const elWidth = cacheLeft.style.width
      // this.cacheMddile.width =
      console.log(123, cacheLeft.style.width)
    },
    showOrHidden() {
      const _this = this
      const btn1 = document.getElementById('btn1')
      const cacheLeft = document.getElementById('cacheLeft')
      const cacheMddile = document.getElementById('cacheMddile')
      // const cacheRight = document.getElementById("cacheRight");
      const bar = document.getElementById('bar')
      btn1.addEventListener(
        'click',
        function() {
          console.log(123)
          _this.arrow = !_this.arrow
          const elWidth = cacheLeft.style.width
          if (elWidth !== '0px') {
            bar.style.display = 'none'
            cacheLeft.style.width = '0px'
            cacheMddile.style.width = '100%'
          } else {
            cacheLeft.style.width = '200px'
            cacheMddile.style.width = 'calc(100% - 200px)'
            setTimeout(function() {
              bar.style.display = 'block'
            }, 800) //
          }
        },
        false
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.cache {
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  .cache-left {
    width: 25%;
    display: inline-block;
    height: 100%;
    transition: width 1s;
    -webkit-transition: width 1s;
    border: 1px solid blue;
  }
  .cache-mddile {
    width: 35%;
    border-left: 10px solid #fafafa;
    border-right: 10px solid #fafafa;
    height: 100%;
    position: relative;
    outline: 1px solid red;
    // .bar {
    //   width: 220px;
    //   height: 100%;
    //   // transition: width 1s;
    //   // -webkit-transition: width 1s;
    // }
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
    border: 1px solid green;
  }
  .td-color {
    color: #1890ff;
    cursor: pointer;
  }
}
</style>
