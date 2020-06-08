<template>
  <div>
    <el-radio v-model="radio" label="1">{{ labelName1 }}</el-radio>
    <el-radio v-model="radio" label="2">{{ labelName2 }}</el-radio>
  </div>
</template>

<script>
export default {
  name: "RadioChoose",
  props: {
    radionValue: {
      type: String,
      default: "1"
    },
    labelName1: {
      type: String,
      default: "是"
    },
    labelName2: {
      type: String,
      default: "否"
    }
  },
  data() {
    return {
      radio: "1"
    };
  },
  watch: {
    radionValue(val) {
      console.log(32, val);
      this.radio = val;
    },
    radio(val) {
      this.$emit("input", val);
    }
  },
  created() {
    this.radio = this.radionValue;
  },
  methods: {
    otherData() {
      this.$emit("otherData", this.selected);
    }
  }
};
</script>
