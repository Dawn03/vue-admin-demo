<template>
  <el-input
    v-model="selected"
    placeholder="请输入密码"
    show-password
    @blur="otherData"
  ></el-input>
</template>

<script>
export default {
  // 组织机构树
  name: 'OrgTree',
  props: {
    value: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selected: ''
    }
  },
  watch: {
    value(val) {
      this.selected = val
    },
    selected(val) {
      this.$emit('input', val)
    }
  },
  created() {
    this.selected = this.value
  },
  methods: {
    otherData() {
      this.$emit('otherData', this.selected)
    }
  }
}
</script>
