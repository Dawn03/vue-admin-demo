<template>
  <div class="server  wrapper_content">
    <el-row :gutter="20" class="tc ">
      <el-col :span="8">
        <ServerCard :bar-data="cpu">
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
                {{ dyData.cpu.cpuNum }} / {{ dyData.cpu.cpuLogicalNum }}
              </el-col>
            </el-row>
            <el-row class="inner-row bg">
              <el-col :span="12"> 核心频率 </el-col>
              <el-col :span="12">{{ dyData.cpu.maxGhz }}</el-col>
            </el-row>
            <el-row class="inner-row">
              <el-col :span="12"> 系统 / 用户 </el-col>
              <el-col :span="12">
                <span :class="moreThan(50, dyData.cpu.sysPerc) ? 'rc' : 'gc'">
                  {{ dyData.cpu.sysPerc }}
                </span>
                <span :class="moreThan(50, dyData.cpu.sysPerc) ? 'rc' : 'gc'">
                  {{ dyData.cpu.userPerc }}
                </span>
              </el-col>
            </el-row>
            <el-row class="inner-row bg">
              <el-col :span="12"> 使用率 </el-col>
              <el-col :span="12">
                <span :class="moreThan(50, dyData.cpu.sysPerc) ? 'rc' : 'gc'">
                  {{ dyData.cpu.usedPerc }}
                </span>
              </el-col>
            </el-row>
          </template>
        </ServerCard>
      </el-col>
      <el-col :span="8">
        <ServerCard :bar-data="mem">
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
              <el-col :span="8"> {{ dyData.mem.total }} </el-col>
              <el-col :span="8"> {{ dyData.jvm.heapMax }} </el-col>
            </el-row>
            <el-row class="inner-row bg">
              <el-col :span="8"> 已用内存 </el-col>
              <el-col :span="8">{{ dyData.mem.used }}</el-col>
              <el-col :span="8"> {{ dyData.jvm.heapUsed }} </el-col>
            </el-row>
            <el-row class="inner-row">
              <el-col :span="8"> 剩余内存 </el-col>
              <el-col :span="8"> {{ dyData.mem.free }} </el-col>
              <el-col :span="8"> {{ dyData.jvm.heapAvailable }} </el-col>
            </el-row>
            <el-row class="inner-row bg">
              <el-col :span="8"> 使用率 </el-col>
              <el-col :span="8">
                <span :class="moreThan(50, dyData.cpu.sysPerc) ? 'rc' : 'gc'">
                  {{ dyData.mem.usedPerc }}
                </span>
              </el-col>
              <el-col :span="8">
                <span :class="moreThan(50, dyData.cpu.sysPerc) ? 'rc' : 'gc'">
                  {{ dyData.jvm.usedPerc }}
                </span>
              </el-col>
            </el-row>
          </template>
        </ServerCard>
      </el-col>
      <el-col :span="8">
        <ServerCard :bar-data="jvm">
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
              <el-col :span="8"> {{ dyData.jvm.heapInit }} </el-col>
              <el-col :span="8"> {{ dyData.jvm.nonHeapInit }} </el-col>
            </el-row>
            <el-row class="inner-row bg">
              <el-col :span="8"> 最大内存 </el-col>
              <el-col :span="8">{{ dyData.jvm.heapMax }}</el-col>
              <el-col :span="8"> {{ dyData.jvm.nonHeapMax }} </el-col>
            </el-row>
            <el-row class="inner-row">
              <el-col :span="8"> 已用内存 </el-col>
              <el-col :span="8"> {{ dyData.jvm.heapUsed }} </el-col>
              <el-col :span="8"> {{ dyData.jvm.nonHeapUsed }} </el-col>
            </el-row>
            <el-row class="inner-row bg">
              <el-col :span="8"> 可用内存 </el-col>
              <el-col :span="8"> {{ dyData.jvm.heapAvailable }} </el-col>
              <el-col :span="8"> {{ dyData.jvm.nonHeapAvailable }} </el-col>
            </el-row>
          </template>
        </ServerCard>
      </el-col>
    </el-row>
    <ServerCard class="car-box tl " :bar-data="server">
      <template slot="content">
        <el-row class="ti">
          <el-col :span="12">
            <el-row class="inner-row bg ">
              <el-col :span="6">服务器名称</el-col>
              <el-col :span="18"> {{ data.server.hostName }} </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row class="inner-row  bg  ">
              <el-col :span="6">操作系统</el-col>
              <el-col :span="18"> {{ data.server.osName }} </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="ti">
          <el-col :span="12">
            <el-row class="inner-row">
              <el-col :span="6">服务器IP</el-col>
              <el-col :span="18"> {{ data.server.hostAddress }} </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row class="inner-row ">
              <el-col :span="6">系统架构</el-col>
              <el-col :span="18"> {{ data.server.osArch }} </el-col>
            </el-row>
          </el-col>
        </el-row>
      </template>
    </ServerCard>

    <ServerCard class="car-box tl " :bar-data="java">
      <template slot="content">
        <el-row class="ti">
          <el-col :span="12">
            <el-row class="inner-row bg">
              <el-col :span="6">Java名称</el-col>
              <el-col :span="18"> {{ data.server.javaName }} </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row class="inner-row  bg t-l">
              <el-col :span="6">Java版本</el-col>
              <el-col :span="18"> {{ data.server.javaVersion }} </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="ti">
          <el-col :span="12">
            <el-row class="inner-row">
              <el-col :span="6">启动时间</el-col>
              <el-col :span="18"> {{ data.server.startTime }} </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row class="inner-row ">
              <el-col :span="6">运行时长</el-col>
              <el-col :span="18"> {{ data.server.uptime }} </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="inner-row bg ti">
          <el-col :span="3">安装路径</el-col>
          <el-col :span="21"> {{ data.server.javaHome }} </el-col>
        </el-row>
        <el-row class="inner-row ti">
          <el-col :span="3">启动参数</el-col>
          <el-col :span="21">
            <div v-for="(item, index) in data.server.javaArgs" :key="index">
              {{ item }}
            </div>
          </el-col>
        </el-row>
      </template>
    </ServerCard>

    <ServerCard class="car-box tl" :bar-data="platform">
      <template slot="content">
        <el-row class="inner-row bg ti">
          <el-col :span="3">当前工作路径</el-col>
          <el-col :span="21"> {{ data.server.userDir }} </el-col>
        </el-row>
        <el-row class="inner-row ti">
          <el-col :span="3">日志存放路径</el-col>
          <el-col :span="21"> {{ data.server.logPath }} </el-col>
        </el-row>
        <el-row class="inner-row ti">
          <el-col :span="3">上传文件路径</el-col>
          <el-col :span="21"> {{ data.server.userfilesDir }} </el-col>
        </el-row>
      </template>
    </ServerCard>

    <ServerCard class="car-box tl" :bar-data="disk">
      <template slot="content">
        <TableTree
          :table-head="tableHead"
          :table-data="data.diskList"
          :table-fit="tableFit"
          style="margin-top: 10px;"
          :show-page="false"
          :min-heigth="80"
        >
          <template slot="index">
            <el-table-column
              fixed
              label="#"
              type="index"
              align="center"
              width="50"
            ></el-table-column>
          </template>
        </TableTree>
      </template>
    </ServerCard>
  </div>
</template>
<script>
import ServerCard from './serverCard'
import TableTree from '@/components/tableTree'
// import { clearFilterVal, getInputVal, dictTypeMap } from "@/utils/pubFunc";
import { sysApi } from '../../../../api/systemMonitor'
export default {
  name: 'Server',
  inject: ['reload'],
  components: {
    ServerCard,
    TableTree
  },
  data() {
    return {
      dyData: {},
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
      },
      server: {
        icon: 'fa icon-screen-tablet',
        text: '服务器信息'
      },
      java: {
        icon: 'fa icon-cup',
        text: 'Java虚拟机信息'
      },
      platform: {
        icon: 'fa icon-eyeglass',
        text: '平台参数'
      },
      disk: {
        icon: 'fa icon-drawer',
        text: '磁盘状态'
      },
      tableFit: true,
      tableHead: {
        name: '盘符名称',
        mount: '盘符路径',
        type: '文件系统',
        total: '总大小',
        avail: '可用大小',
        used: '已用大小',
        usedPerc: '已用百分比'
      },
      tableData: []
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
        this.dyData = res
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
    font-size: 14px;
    line-height: 36px;
  }
  .car-box {
    margin-top: 20px;
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
