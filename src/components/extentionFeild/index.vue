/*扩展字段*/
<template>
  <div class="extention-box">
    <el-row :gutter="gutterVal">
      <el-col
        v-for="(value, key, index) in extentionForm"
        :key="key"
        :span="12"
      >
        <el-form-item :label="`${key}：`">
          <el-input v-if="index < 16" v-model="extentionForm[key]"> </el-input>
          <el-date-picker
            v-else
            v-model="extentionForm[key]"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "ExtentionFeild",
  components: {},
  props: {
    extentionForm: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      gutterVal: 100
      // extentionForm: {
      //   String11: "",
      //   String12: "",
      //   String13: "",
      //   String14: "",
      //   String15: "",
      //   String16: "",
      //   String17: "",
      //   String18: "",
      //   Integer1: "",
      //   Integer2: "",
      //   Integer3: "",
      //   Integer4: "",
      //   Float1: "",
      //   Float2: "",
      //   Float3: "",
      //   Float4: "",
      //   Date1: "",
      //   Date2: "",
      //   Date3: "",
      //   Date4: ""
      // }
    };
  },
  computed: {
    extentionFormDetail: {
      get() {
        return this.extentionForm;
      },
      set(val) {
        this.$emit("extentionFormVal", val);
      }
    }
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.extention-box {
}
</style>
