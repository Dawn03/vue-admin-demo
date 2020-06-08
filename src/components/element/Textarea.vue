<template>
  <div>
    <el-input
      v-model="textarea"
      type="textarea"
      :rows="rowsSpan"
      placeholder="请输入内容"
    >
    </el-input>
  </div>
</template>

<script>
export default {
  name: "Textarea",
  props: {
    textareaValue: {
      type: String,
      default: ""
    },
    rowsSpan: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      textarea: ""
    };
  },
  watch: {
    textareaValue(val) {
      this.textarea = val;
    }
  },
  created() {
    this.textarea = this.textareaValue;
  },
  methods: {
    // otherData() {
    //   this.$emit("otherData", this.selected);
    // }
  }
};
</script>
