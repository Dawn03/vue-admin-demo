<template>
  <!-- -->
  <div :style="{ background: bgColor }" class="header  clearfix">
    <div class="head-left">
      <div class="logo-box">
        <img class="logo" src="../../assets/logo2.png" alt="logo" />
        <hamburger
          :is-active="sidebar.opened"
          class="hamburger-container"
          @toggleClick="toggleSideBar"
        />
      </div>
      <span />
    </div>
    <div class="head-middle">
      生产批记录电子化系统
    </div>
    <div class="head-right clearfix">
      <div class="icon-group fl">
        <el-tooltip class=" icon-box" content="全屏" placement="top">
          <Screenfull id="screenfull" class="right-menu-item hover-effect" />
        </el-tooltip>
        <el-tooltip class=" icon-box" content="切换主题" placement="top">
          <ChangeThem
            id="changeThem"
            ref="closeThem"
            class="right-menu-item hover-effect"
            v-on="$listeners"
          />
        </el-tooltip>
      </div>
      <div class="fr"></div>
    </div>
  </div>
</template>

<script>
import Hamburger from "@/components/Hamburger";
import Screenfull from "@/components/Screenfull";
import ChangeThem from "@/components/changeThem";
export default {
  name: "Layout",
  components: {
    Hamburger,
    Screenfull,
    ChangeThem
  },
  props: {
    bgColor: {
      type: String,
      default: ""
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    closeDailog() {
      this.$refs.closeThem.closeThemPanel();
      console.log(232);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.icon-box {
  // outline: 1px solid aqua;
}
.header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  // background: $topBackground;
  .head-left {
    position: relative;
    float: left;
    width: 200px;
    .logo-box {
      margin-left: 20px;
      .logo {
        height: 38px;
        vertical-align: middle;
      }
    }
    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: right;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;
      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
    .switch-btn {
    }
  }
  .head-middle {
    color: #ffffff;
    float: left;
    font-size: 20px;
    font-weight: bold;
    line-height: 50px;
    text-align: center;
    padding: 0 15px;
  }
  .head-right {
    float: right;
    width: 50%;
    height: 50px;
    .icon-group {
      // outline: aqua 2px solid;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }
}
</style>
