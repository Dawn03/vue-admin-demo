<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <MyHeader
      ref="mychild"
      :bg-color="navBgColor"
      @changeThemColor="changeAll"
    />
    <sidebar :bg-color="sideBgColor" class="sidebar-container" />
    <div class="main-container" :bg-color="mainBgColor">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import MyHeader from "@/components/header/index";

// import Hamburger from "@/components/Hamburger";

export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    MyHeader
    // Hamburger
  },
  mixins: [ResizeMixin],
  data() {
    return {
      navBgColor: "#3c8dbc",
      sideBgColor: "#222d32",
      mainBgColor: "#fff"
    };
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
    changeAll(item) {
      this.navBgColor = item.navColor;
      this.sideBgColor = item.sideColor;
      this.mainBgColor = item.mainColor;
      this.$refs.mychild.closeDailog();
      // console.log(this.navBgColor);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }

  .header {
    height: 50px;
    background: $topBackground;
    .head-left {
      position: relative;
      width: 200px;
      .logo-box {
        line-height: 50px;
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
    .head-right {
    }
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
