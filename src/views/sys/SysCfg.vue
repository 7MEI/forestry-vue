<template>
  <div>
    <div class="vue-qr">
      <vue-qr :logoSrc="config.logo"
              :text="config.value"
              :size="152"
              :margin="0"
              ref="Qrcode"
              class="vue-qr-img"></vue-qr>
      <el-button  type="primary" plain :href="exportLink" @click="downloadImg" :download="downloadFilename">下载二维码</el-button>
    </div>
  </div>
</template>

<script>
import VueQr from 'vue-qr' //生成二维码
export default {
  name: "SysCfg",
  data() {
    return {
      config: {  //二维码参数
        value: 'https://element.eleme.cn/#/zh-CN/component/layout',//显示的值、跳转的地址
        logo: require('../../assets/img/2.jpg'),//中间logo的地址
      },
      exportLink: '',
      downloadFilename: ''
    }
  },
  components: {
    VueQr
  },
  methods:{
    // 下载二维码图片
    downloadImg () {
      let Qrcode = this.$refs.Qrcode
      this.exportLink = Qrcode.$el.currentSrc
      this.downloadFilename = '二维码'
    }

  }
}
</script>

<style>

</style>