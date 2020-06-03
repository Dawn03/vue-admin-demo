<template>
  <div>
    <el-row :gutter="10">
      <el-col  :xs="it.cols[0]" :sm="it.cols[1]" :md="it.cols[2]" :lg="it.cols[3]"
          v-for="(it, ind) in componentList" :key="ind">
        <el-form-item v-if="(it.showFlag === undefined  || it.showFlag === true) ? true : false"
          :label="it.label" :label-width="it.labelWidth"  :prop="it.prop" :show-message="it.showMessage">
          <component class="dymForm"  :placeholder="''"
          :clearable="it.clearable" v-if="it.bySelf === true ? false : true "
          :multiple="it.multiple" :options="it.options"
          :disabled="it.disabled || editModel === 'V' ? true : false"
          :collapseTags="it.collapseTags"
          :type="it.type" :prop="it.prop"
          :name="it.name"
          :reload="it.reload"
          :queryParas="buildQueryParas(it.queryName, it.queryValue)"
          :cascaderProps="it.cascaderProps"
          :selectedField="it.selectedField"
          v-model="newFormValue[it.value]"
          :maxlength="it.maxlength"
          :minlength="it.minlength"
          :value-format="it.format"
          :picker-options="it.pickerOptions"
          :is="it.componentName"
          :tagId="it.tagId"
          :autosize="it.autosize"
          :dictTypeCode="it.dictTypeCode"
          :api="it.api"
          :valueKey="it.valueKey"
          :capitalSource="it.capitalSource"
          :loadList="it.loadList"
          :accountWidth="it.accountWidth"
          :timeType="it.timeType"
          :timeSize="it.timeSize"
          :format="it.format" :active-value="'1'" :inactive-value="'0'"
          :percent.sync="newFormValue[it.percent]" :resetValue.sync="it.resetValue"
          :amount.sync="newFormValue[it.amount]"
          :companyId="it.companyId"
          :start-placeholder="it.startPlaceholder"
          :end-placeholder="it.endPlaceholder"
          @selectChanged="selectChanged" @focus="focus"
          @otherData="otherData" @blur="blur" @change="change"
          @onbackblankaccount="onbackblankaccount">
          </component>
        </el-form-item>
        <slot name="bySelf" v-else>
        </slot>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import BaseSelect from '@/components/element/BaseSelect'
import dict from '@/components/element/SelectDictionary.vue' // 字典组件
// import officeTree from '@/components/element/officeTree.vue' // 公司树
// import orgTree from '@/components/element/orgTree.vue' // 根据公司树查询下面机构
// import orgTreeAll from '@/components/element/orgTreeAll.vue' // 查询所有机构
import BaseCascader from '@/components/element/BaseCascader.vue' // 动态树base
import passwd from '@/components/element/passwd.vue' // 密码
import tinyEditor from '@/components/fileManage/tinyEditor.vue' // 富文本编辑器
import autoComplete from '@/components/element/autoComplete.vue' // 自动补充输入框
import reportPhase from '@/components/element/reportPhase.vue' // 期数
import cascaderCompany from '@/components/element/CascaderCompany.vue' // 公司选择
import cascaderDepartment from '@/components/element/CascaderDepartment.vue' // 部门选择
import cascaderOrg from '@/components/element/CascaderOrg.vue' // 机构选择（公司+部门）
import cascaderOrgUser from '@/components/element/CascaderOrgUser.vue' // 机构选择（公司+部门+人员）
import cascaderOrgDownload from '@/components/element/CascaderOrgDownload.vue' // 机构选择（公司+部门+人员）
import cascaderOrgDownloadUser from '@/components/element/CascaderOrgDownloadUser.vue' // 机构选择（公司+部门+人员）
import btnUpload from '@/components/button/btnUpload.vue' // 机构选择（公司+部门+人员）

export default {
  components: {
    BaseSelect,
    dict,
    // officeTree,
    // orgTree,
    // orgTreeAll,
    BaseCascader,
    passwd,
    tinyEditor,
    autoComplete,
    reportPhase,
    cascaderCompany,
    cascaderDepartment,
    cascaderOrg,
    cascaderOrgUser,
    cascaderOrgDownload,
    cascaderOrgDownloadUser,
    btnUpload
  },
  props: {
    componentList: {
      type: [Array],
      required: true
    },
    formValue: {
      type: [Object]
    },
    editModel: {
      type: [String],
      default: function () {
        return ''
      }
    }
  },
  computed: {
    newFormValue: {
      get: function () {
        return this.formValue
      },
      set: function (value) {
        this.$emit('update:formValue', value)
      }
    }
  },
  data () {
    return {
      selectObj: {}
    }
  },
  methods: {
    otherData (value) {
      this.$emit('otherData', value)
    },
    onbackblankaccount (value) {
      this.$emit('onbackblankaccount', value)
    },
    selectChanged (val, name, row) {
      this.selectObj[name] = row
      this.$emit('selectChanged', val, name, this.selectObj)
    },
    buildQueryParas (queryName, queryValue) {
      let obj = {}
      if (typeof (queryName) === 'string') {
        obj[queryName] = this.formValue[queryValue]
      } else if (queryName !== undefined) {
        let list = []
        queryName.forEach((item, index) => {
          let v = queryValue[index]
          if (item === 'enterpriseIds') {
            list.push(this.formValue[v])
            obj[item] = list
          } else {
            obj[item] = this.formValue[v]
          }
        })
      }
      return obj
      // if (this.UtilJs.isEmpty(queryName) || this.UtilJs.isEmpty(queryValue)) {
      //   return
      // } else {
      //   let obj = {}
      //   obj[queryName] = this.formValue[queryValue]
      //   console.log(obj)
      //   return obj
      // }
    },
    focus (event) {
      // this.$emit('focus', event)
    },
    blur (event) {
      // console.log('event', event)
      // this.$emit('blur')
    },
    change (val) {
      this.selectObj[name] = val
      this.$emit('selectChanged', val, name, this.selectObj)
    }
  }
}
</script>
