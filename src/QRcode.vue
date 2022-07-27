<template>
  <div id="qrCode">
    <div id="code"></div>
    <canvas id="canvas"></canvas>
  </div>
</template>
<script>
import QRCode from "qrcode";
export default {
  props: {
    url: {
      type: String
    }
  },
  data() {
    return {
      msg: "hello vue",
      codes: ""
    };
  },

  components: {
    QRCode: QRCode
  },

  methods: {
    useqrcode() {
      var canvas = document.getElementById("canvas");
      QRCode.toCanvas(canvas, this.url, function(error) {
        if (error) console.error(error);
      });
    }
  },

  mounted() {
    this.useqrcode();
  }
};
</script>
<style>
#qrCode {
  text-align: center;
}
</style>
