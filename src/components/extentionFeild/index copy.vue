/*扩展字段*/
<template>
  <div class="extention-box">
    <el-row
      v-for="(item, index) in extentionForm"
      :key="index"
      :gutter="gutterVal"
    >
      <el-col v-for="(val, subIndex) in item" :span="12">
        <!-- {{ val }}， {{ name }} -->
        <!-- {{ subItem }} -->
        <el-form-item
          v-for="(inputVal, keyName, inputIndex) in val"
          :key="inputIndex"
          :label="`${keyName}:`"
        >
          <!-- {{ val }} -->
          <el-input v-model="index"> </el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import xx from "@/xx";
export default {
  name: "ExtentionFeild",
  components: {},
  data() {
    return {
      gutterVal: 100,
      extentionForm: [
        // [
        //   {
        //     lable: "String1",
        //     value: ""
        //   },
        //   {
        //     lable: "String2",
        //     value: ""
        //   }
        // ],
        // [
        //   {
        //     lable: "String3",
        //     value: ""
        //   },
        //   {
        //     lable: "String4",
        //     value: ""
        //   }
        // ]
      ]
    };
  },
  mounted() {
    const concatArr = this.createKey("String", 8).concat(
      this.createKey("Integer", 4),
      this.createKey("Floar", 4),
      this.createKey("Date", 4)
    );
    // console.log(concatArr);
    const result = [];
    let num = 0;
    for (let i = 0, len = concatArr.length; i < len; ) {
      result.push(concatArr.slice(i, (num += 2)));
      i = num;
      //   this.extentionForm.push(result);
    }
    this.extentionForm = result;
    console.log(55, this.extentionForm);
  },
  methods: {
    createKey(keyType, count) {
      const arrKey = [];
      for (let i = 0; i < count; i++) {
        arrKey.push({
          [keyType + (i + 1)]: i
          // value: ""
        });
      }
      return arrKey;
      //   console.log(123, arrKey);
    }
  }
};
</script>
<style lang="scss" scoped>
.extention-box {
}
</style>
