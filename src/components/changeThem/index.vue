<template>
  <div>
    <svg-icon
      style="fill:#fff;font-size:24px;"
      icon-class="dashboard"
      @click="clickFunc"
    />
    <DailogFrame
      ref="headerPanel"
      :dialog-visible="dialogVisible"
      @closeDialog="handleClose"
    >
      <template slot="title">
        <div>
          <span class="title-name">{{ titleName }}</span>
          <!-- <div>
            <Screenfull id="screenfull" class="right-menu-item hover-effect" />
          </div> -->
        </div>
      </template>
      <template slot="content">
        <div>
          <ThemColor ref="showThem" v-on="$listeners" />
        </div>
      </template>
      <template slot="footer" class="dialog-footer">
        <!-- <div>按钮功能区</div> -->
      </template>
    </DailogFrame>
  </div>
</template>
<script>
import DailogFrame from "../dailogPanel/frame.vue";
import Screenfull from "@/components/Screenfull";
import ThemColor from "./themColor";
export default {
  name: "ChangeThem",
  components: {
    DailogFrame,
    Screenfull,
    ThemColor
  },
  data() {
    return {
      dialogVisible: false,
      titleName: "切换主题"
    };
  },
  mounted() {
    // this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    changeBgColor() {},
    closeThemPanel() {
      this.dialogVisible = false;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    clickFunc() {
      this.dialogVisible = true;
    },
    destroy() {}
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

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
</style>
