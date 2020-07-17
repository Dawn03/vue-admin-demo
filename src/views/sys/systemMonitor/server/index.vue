<template>
  <div class="server  wrapper_content">
    <el-row :gutter="20">
      <el-col :span="8">
        <ServerCard :barData="cpu">
          <template slot="head">
            <el-row class="bg head-row">
              <el-col :span="12"> 属性</el-col>
              <el-col :span="12"> 值</el-col>
            </el-row>
          </template>
          <template slot="content">
            <el-row class="inner-row">
              <el-col :span="12"> 核心个数 </el-col>
              <el-col :span="12">
                {{ data.cpu.cpuNum }} / {{ data.cpu.cpuLogicalNum }}
              </el-col>
            </el-row>
            <el-row class="inner-row bg">
              <el-col :span="12"> 核心频率 </el-col>
              <el-col :span="12">{{ data.cpu.maxGhz }}</el-col>
            </el-row>
            <el-row class="inner-row">
              <el-col :span="12"> 系统 / 用户 </el-col>
              <el-col :span="12">
                <span :class="moreThan(50, data.cpu.sysPerc) ? 'rc' : 'gc'">
                  {{ data.cpu.sysPerc }}
                </span>
                <span :class="moreThan(50, data.cpu.sysPerc) ? 'rc' : 'gc'">
                  {{ data.cpu.userPerc }}
                </span>
              </el-col>
            </el-row>
            <el-row class="inner-row bg">
              <el-col :span="12"> 使用率 </el-col>
              <el-col :span="12">
                <span :class="moreThan(50, data.cpu.sysPerc) ? 'rc' : 'gc'">
                  {{ data.cpu.usedPerc }}
                </span>
              </el-col>
            </el-row>
          </template>
        </ServerCard>
      </el-col>
      <el-col :span="8">
        <ServerCard :barData="mem">
          <template slot="head">
            <el-row class="head-row bg">
              <el-col :span="8">属性</el-col>
              <el-col :span="8">内存</el-col>
              <el-col :span="8">JVM</el-col>
            </el-row>
          </template>
          <template slot="content">
            <el-row class="inner-row">
              <el-col :span="8"> 总内存 </el-col>
              <el-col :span="8"> {{ data.mem.total }} </el-col>
              <el-col :span="8"> {{ data.jvm.heapMax }} </el-col>
            </el-row>
            <el-row class="inner-row bg">
              <el-col :span="8"> 已用内存 </el-col>
              <el-col :span="8">{{ data.mem.used }}</el-col>
              <el-col :span="8"> {{ data.jvm.heapUsed }} </el-col>
            </el-row>
            <el-row class="inner-row">
              <el-col :span="8"> 剩余内存 </el-col>
              <el-col :span="8"> {{ data.mem.free }} </el-col>
              <el-col :span="8"> {{ data.jvm.heapAvailable }} </el-col>
            </el-row>
            <el-row class="inner-row bg">
              <el-col :span="8"> 使用率 </el-col>
              <el-col :span="8">
                <span :class="moreThan(50, data.cpu.sysPerc) ? 'rc' : 'gc'">
                  {{ data.mem.usedPerc }}
                </span>
              </el-col>
              <el-col :span="8">
                <span :class="moreThan(50, data.cpu.sysPerc) ? 'rc' : 'gc'">
                  {{ data.jvm.usedPerc }}
                </span>
              </el-col>
            </el-row>
          </template>
        </ServerCard>
      </el-col>
      <el-col :span="8">
        <ServerCard :barData="jvm">
          <template slot="head">
            <el-row class="head-row bg">
              <el-col :span="8">属性</el-col>
              <el-col :span="8">堆</el-col>
              <el-col :span="8">非堆</el-col>
            </el-row>
          </template>
          <template slot="content">
            <el-row class="inner-row">
              <el-col :span="8"> 初始大小 </el-col>
              <el-col :span="8"> {{ data.jvm.heapInit }} </el-col>
              <el-col :span="8"> {{ data.jvm.nonHeapInit }} </el-col>
            </el-row>
            <el-row class="inner-row bg">
              <el-col :span="8"> 最大内存 </el-col>
              <el-col :span="8">{{ data.jvm.heapMax }}</el-col>
              <el-col :span="8"> {{ data.jvm.nonHeapMax }} </el-col>
            </el-row>
            <el-row class="inner-row">
              <el-col :span="8"> 已用内存 </el-col>
              <el-col :span="8"> {{ data.jvm.heapUsed }} </el-col>
              <el-col :span="8"> {{ data.jvm.nonHeapUsed }} </el-col>
            </el-row>
            <el-row class="inner-row bg">
              <el-col :span="8"> 可用内存 </el-col>
              <el-col :span="8"> {{ data.jvm.heapAvailable }} </el-col>
              <el-col :span="8"> {{ data.jvm.nonHeapAvailable }} </el-col>
            </el-row>
          </template>
        </ServerCard>
      </el-col>
    </el-row>
    <ServerCard></ServerCard>
  </div>
</template>
<script>
import ServerCard from './serverCard'
// import { clearFilterVal, getInputVal, dictTypeMap } from "@/utils/pubFunc";
import { sysApi } from '../../../../api/systemMonitor'
export default {
  name: 'Server',
  inject: ['reload'],
  components: {
    ServerCard
  },
  data() {
    return {
      data: {},
      cpu: {
        icon: 'fa icon-speedometer',
        text: 'CPU'
      },
      mem: {
        icon: 'fa icon-fire',
        text: '内存'
      },
      jvm: {
        icon: 'fa icon-puzzle',
        text: '堆/非堆',
        title: '执行垃圾回收任务',
        rightIcon: 'fa fa-eraser'
      }
    }
  },
  created() {
    this.getServer()
    this.getServerIndex()
  },
  methods: {
    moreThan(target, num) {
      return Number(target) < Number(num.replace('%', ''))
    },
    reLoadKeyFunc() {
      this.getCacheNameList()
    },
    reLoadValFunc() {
      this.rowClick(this.currentRow)
    },
    getServer() {
      sysApi.getServer().then(res => {
        this.data = res
        // this.rowClick(res[0])
      })
    },
    getServerIndex() {
      sysApi.getServerIndex().then(res => {
        this.data = res
        // this.rowClick(res[0])
      })
    },
    showSearch(val) {
      this.showSearchVal = val
    },
    handlerName(funcName) {
      this[funcName]()
    },
    initPage() {
      this.reload()
    },
    // 获取缓存键名列表
    rowClick(row) {
      this.currentRow = row
      sysApi.getCacheKeyList({ id: row.id }).then(res => {
        this.valTableData = res
      })
    },
    // 获取缓存内容
    rowClickVal(row) {
      sysApi
        .getCacheValue({
          cacheName: row.cacheName,
          key: row.id
        })
        .then(res => {
          this.form = res
        })
    },

    arrowClick(btn) {
      const cacheLeft = this.$refs.cacheLeft
      const cacheRight = this.$refs.cacheRight
      const eLWidth = cacheLeft.style.width
      const eRWidth = cacheRight.style.width
      console.log(57, eRWidth)

      if (btn === 'btn1') {
        this.arrow1 = !this.arrow1
        if (eLWidth === '' || eLWidth === '300px') {
          cacheLeft.style.width = '0'
          cacheLeft.style.visibility = 'hidden'
        } else {
          cacheLeft.style.width = '300px'
          cacheLeft.style.visibility = 'visible'
        }
      } else {
        this.arrow2 = !this.arrow2
        if (eRWidth === '' || eRWidth === '400px') {
          cacheRight.style.width = '0'
          cacheRight.style.visibility = 'hidden'
        } else {
          console.log(131)
          cacheRight.style.width = '400px'
          cacheRight.style.visibility = 'visible'
        }
      }
    },
    deleteKeyFunc(row) {
      this.$alertMsgBox('确认要清理该缓存吗？', '信息')
        .then(() => {
          sysApi.deleteKeyFunc({ id: row.id }).then(res => {
            if (res.result === 'true') {
              this.$message.success(res.message)
            } else {
              this.$message.error(res.message)
            }
          })
        })
        .catch(() => {
          this.$message.info('取消')
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.server {
  background: #f9f9f9;
  padding: 20px;
  .head-row {
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    line-height: 36px;
  }
  .inner-row {
    text-align: center;
    font-size: 14px;
    line-height: 36px;
  }
  .bg {
    background: #f9f9f9;
  }
  .rc {
    color: red;
  }
  .gc {
    color: green;
  }
}
</style>
