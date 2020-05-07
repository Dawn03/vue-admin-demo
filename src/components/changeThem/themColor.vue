<template>
  <div class="them-box">
    <ul class="them-list">
      <li
        v-for="(item, index) in colorArr"
        :key="index"
        class="them-item"
        @click="changeThem(item)"
      >
        <div class="them-detail">
          <div class="head" :style="{ background: item.navColor }"></div>
          <div class="main clearfix">
            <div
              class="main-left fl"
              :style="{ background: item.sideColor }"
            ></div>
            <div
              class="main-right fl"
              :style="{ background: item.mainColor }"
            ></div>
          </div>
        </div>
        <span class="current-color">{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "ThemColor",
  components: {},
  data() {
    return {
      dialogVisible: true,
      colorArr: [
        {
          sideColor: "#222d32",
          navColor: "#3c8dbc",
          mainColor: "#fff",
          text: "蓝"
        },
        {
          sideColor: "#605ca8",
          navColor: "#3c8dbc",
          mainColor: "#fff",
          text: "紫"
        },
        {
          sideColor: "#222d32",
          navColor: "#00a65a",
          mainColor: "#fff",
          text: "绿"
        },
        {
          sideColor: "#222d32",
          navColor: "#f39c12",
          mainColor: "#fff",
          text: "黄"
        }
      ]
    };
  },
  methods: {
    init() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.dialogVisible = false;
    },
    changeThem(item) {
      this.$emit("changeThemColor", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.them-body {
  background: #f4f6f8;
}
.them-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .them-item {
    .them-detail {
      position: relative;
      height: 43px;
      display: block;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
      .head {
        position: absolute;
        height: 13px;
        z-index: 5;
        width: 100%;
        // top: 0;
        background: #222d32;
      }
      .main {
        width: 100%;
        .main-left {
          width: 30px;
          height: 43px;
          background: #3c8dbc;
        }
        .main-right {
          width: calc(100% - 30px);
          height: calc(100% - 30px);
          background: #fff;
        }
      }
    }
    .current-color {
      text-align: center;
      display: inline-block;
      width: 100%;
      // font-size: 16px;
    }
  }
  li {
    width: 30%;
    // border: 1px solid red;
    margin-bottom: 10px;
  }
}
</style>
