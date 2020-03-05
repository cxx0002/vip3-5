<template>
  <div class="ysxy">
    <div class="header">
      <p class="title">
        <md-icon name="arrow-left" style="float:left;font-weight:600" @click="back"></md-icon>用户服务协议
      </p>
    </div>
    <iframe :src="src" id="iframe"></iframe>
  </div>
</template>
<script>
export default {
  name: "Ysxy",
  data() {
    return {
      src: "http://chapter.smaoxs.com/agreement/agree/kdxs.html"
    };
  },
  created() {
    let that = this;

    this.$bridge.registerhandlerAndroid(
      "td_native_function_callback",
      (data, responseCallback) => {
        data = JSON.parse(data);
        if (data.type === "td_native_type_backpressed") {
          that.back();
        }

        // if(data.type ==="td_native_type_normal_callback"){

        // }
      }
    );
  },
  mounted() {
    if (this.$route.params.appPackage == "com_abifong_mfxssc") {
      this.src = "http://chapter.smaoxs.com/agreement/agree/mfxssc.html";
    }
    if (this.$route.params.appPackage == "com_shunmao_xsssydq") {
      this.src = "http://chapter.smaoxs.com/agreement/agree/mfxsydq.html";
    }
    if (this.$route.params.appPackage == "com_shunmao_zymfxs") {
      this.src = "http://chapter.smaoxs.com/agreement/agree/zymfxs.html";
    }
    if (this.$route.params.appPackage == "com_kdmfxs_kxsydq") {
      this.src = "http://chapter.smaoxs.com/agreement/agree/kdxsydq.html";
    }

    if (this.$route.params.appPackage == "com_wanshan_xssc") {
      this.src = "http://chapter.smaoxs.com/agreement/agree/kdxs.html";
    }
     if (this.$route.params.appPackage == "com_wanshan_xsreader") {
      this.src = "http://chapter.smaoxs.com/agreement/agree/zyxsdq.html";
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.header {
  position: fixed;
  display: block;
  width: 100%;
  z-index: 100;
  height: 80px;
  padding: 30px 18px 62px;
  background: rgba(31, 32, 42, 1);
}
.ysxy {
  min-height: 1000px;
  height: auto;
  width: 100%;
}
.header .title {
  height: 34px;
  font-size: 36px;
  text-align: center;
  font-weight: 500;
  color: rgba(253, 253, 253, 1);
}
#iframe {
  margin-top: 80px;
  min-height: 5000px;
  height: auto;
  width: 100%;
}
</style>