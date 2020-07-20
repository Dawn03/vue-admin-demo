<template>
  <div class="swagger  wrapper_content">
    <!-- <p v-html="html"></p> -->
    <!-- src=src="http://192.168.7.107:8980/web/a/jeesite-web/swagger/swagger-ui.html" -->
    <iframe
      src="http://192.168.7.107:8980/web/swagger-ui.html"
      id="mobsf"
      frameborder="0"
      class="self-iframe"
      style="heigth:100%; width:100%;"
    ></iframe>
  </div>
</template>
<script>
import { sysApi } from '../../../../api/systemMonitor'
export default {
  name: 'Swagger',
  inject: ['reload'],
  data() {
    return {
      html: ''
    }
  },
  mounted() {
    this.open()
  },
  methods: {
    open() {
      sysApi.getSwagger().then(res => {
        this.html = res
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.swagger {
  .self-iframe {
    width: 100%;
    min-height: calc(100vh - 90px);
  }
}
</style>
