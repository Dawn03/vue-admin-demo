<template>
  <div class="institution">
    <div id="institutionLeft" class="institution-left">
      <InstitutionLeft id="bar" class="bar transition-box"></InstitutionLeft>
      <span id="btn" class="toglebtn">
        <i
          :class="arrow === true ? 'el-icon-caret-right' : 'el-icon-caret-left'"
          class="icon-position"
        ></i>
      </span>
    </div>
    <div id="institutionRight" class="institution-right">
      <InstitutionRight></InstitutionRight>
    </div>
  </div>
</template>
<script>
import InstitutionLeft from "./institutionLeft";
import InstitutionRight from "./institutionRight";
export default {
  name: "InstitutionManage",
  components: {
    InstitutionLeft,
    InstitutionRight
  },
  data() {
    return {
      arrow: true
    };
  },
  mounted() {
    const _this = this;
    const btn = document.getElementById("btn");
    const institutionLeft = document.getElementById("institutionLeft");
    const institutionRight = document.getElementById("institutionRight");
    // const bar = document.getElementById("bar");
    btn.addEventListener(
      "click",
      function() {
        _this.arrow = !_this.arrow;
        // const display = bar.style.display;
        // if (display != "none") {
        //   bar.style.display = "none";
        // } else {
        //   bar.style.display = "block";
        // }
        const elWidth = institutionLeft.style.width;
        if (elWidth != "0px") {
          institutionLeft.style.width = "0px";
          institutionRight.style.width = "100%";

          setTimeout(function() {
            bar.style.display = "none";
          }, 1000);
        } else {
          institutionLeft.style.width = "200px";
          institutionRight.style.width = "calc(100% - 200px)";
          bar.style.display = "block";
        }
      },
      false
    );
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.institution {
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  .institution-left {
    width: 200px;
    position: relative;
    display: inline-block;
    height: 100%;
    border-right: 5px solid #fafafa;
    transition: width 1s;
    -webkit-transition: width 1s;
    .bar {
      width: 200px;
      height: 100%;
      // transition: width 1s;
      // -webkit-transition: width 1s;
    }
    .toglebtn {
      position: absolute;
      display: inline-block;
      top: 200px;
      left: 100%;
      background: #eee;
      height: 70px;
      width: 10px;
      line-height: 70px;
      .icon-position {
        margin-left: -3px;
      }
    }
  }
  .institution-right {
    display: inline-block;
    width: calc(100% - 200px);
  }
  .td-color {
    color: #1890ff;
    cursor: pointer;
  }
  .table-witth {
  }
}
</style>
