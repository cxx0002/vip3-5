<template>
  <div class="testIos">
    <button @click="getHeader">getHeader</button>
    <button @click="putBooksList">加入书架</button>
    <button @click="openBooks">打开书籍</button>
    <button @click="getAppVersion">查看app版本号</button>
    <button @click="openAnimation">打开转圈动画</button>
    <button @click="openAlert">打开一个弹窗</button>
    <button @click="back">返回</button>
    <button @click="error">Error</button>
    <button @click="checkBook">checkBook</button>
  </div>
</template>
<script>
import "@/utils/bridge.js";
export default {
  name: "TestIOS",
  data() {
    return {
      supportFunctionList: [],
      header: ""
    };
  },
  created() {
    this.$bridge.registerhandlerIOS(
      "td_native_function_purchase",
      (data, responseCallback) => {
        alert("支付成功，" + data);

        // if (data.status == 0) {
        //   this.getMessage();
        // }
      }
    );
    this.$bridge.registerhandlerIOS(
      "td_native_function_rewordVideo",
      (data, responseCallback) => {
        alert("激励视频，" + data);

        // if (data.status == 0) {
        //   this.getMessage();
        // }
      }
    );
  },
  mounted() {
    let that = this;
    setTimeout(()=>{
      that.$bridge.callhandlerIOS(
      "td_js_function_nativeInfo",
      {},
      function responseCallback(data) {
        that.supportFunctionList = JSON.parse(data).supportFunctionList;
        that.header = JSON.parse(data).header;
        alert(data)
      }
    );
    },0)
  },
  methods: {
    getHeader() {
      if (this.supportFunctionList.indexOf("td_js_function_nativeInfo") > -1) {
        this.$bridge.callhandlerIOS(
          "td_js_function_nativeInfo",
          {},
          function responseCallback(responseData) {
            //获取到iOS回调后需要做的事情写在这里
            alert(responseData);
          }
        );
      }
    },
    putBooksList() {

      if (this.supportFunctionList.indexOf("td_js_function_addBook") > -1) {
        this.$bridge.callhandlerIOS(
        "td_js_function_addBook",
        {
          //   action: "onbackpressed",
          book_data: {
            bid: 994,
            _id: "5816b415b06d1d32157790b1",
            author: "辰东",
            cover_new:
              "http://image.smaoxs.com/mixed.com/1624f7233d2e7c8f06c36bf8f3d61704",
            isSerial: true,
            title: "圣墟",
            updated: "2020-01-01 22:52:36",
            lastChapter: "第1479章 一条路走到黑",
            chaptersCount: 1498
          }
        },
        function(responseData) {}
      );
      }
      
    },
    openBooks() {

      if (this.supportFunctionList.indexOf("td_js_function_openBook") > -1) {
        this.$bridge.callhandlerIOS(
        "td_js_function_openBook",
        {
          //   action: "onbackpressed",
          book_data: {
            bid: 994,
            _id: "5816b415b06d1d32157790b1",
            author: "辰东",
            cover_new:
              "http://image.smaoxs.com/mixed.com/1624f7233d2e7c8f06c36bf8f3d61704",
            isSerial: true,
            title: "圣墟",
            updated: "2020-01-01 22:52:36",
            lastChapter: "第1479章 一条路走到黑",
            chaptersCount: 1498
          }
        },
        function(responseData) {}
      );
      }
      
    },
    getAppVersion() {

      if (this.supportFunctionList.indexOf("td_js_function_appVersion") > -1) {
        this.$bridge.callhandlerIOS("td_js_function_appVersion", {}, function(
        responseData
      ) {
        alert(responseData);
      });
      }
      
    },
    openAnimation() {
      let that = this;

      if (this.supportFunctionList.indexOf("td_js_function_animation") > -1) {
         this.$bridge.callhandlerIOS(
        "td_js_function_animation",
        {
          backLevel: 0,
          status: 1
        },
        function(responseData) {
          if (JSON.parse(responseData).status == 0) {
            setTimeout(() => {
              that.closeAnimation();
            }, 3000);
          }
        }
      );
      }
     
    },
    closeAnimation() {

      if (this.supportFunctionList.indexOf("td_js_function_animation") > -1) {
        this.$bridge.callhandlerIOS(
        "td_js_function_animation",
        {
          backLevel: 0,
          status: 0
        },
        function(responseData) {}
      );
      }
      
    },
    openAlert() {

      if (this.supportFunctionList.indexOf("td_js_function_alert") > -1) {
        this.$bridge.callhandlerIOS(
        "td_js_function_alert",
        {
          title: "测试标题",
          message: "测试信息",
          btn_title: "测试"
        },
        function(responseData) {}
      );
      }
      
    },
    back() {

      if (this.supportFunctionList.indexOf("td_js_function_exit") > -1) {
        this.$bridge.callhandlerIOS("td_js_function_exit", {}, function(
        responseData
      ) {});
      }
      
    },
    error() {
      if (this.supportFunctionList.indexOf("aaaad") > -1) {
        this.$bridge.callhandlerIOS("aaaad", {}, function(
        responseData
      ) {});
      }else{
        alert('error')
      }
      
    },
    checkBook(){
      if (this.supportFunctionList.indexOf("td_js_function_checkBooks") > -1) {
        this.$bridge.callhandlerIOS("td_js_function_checkBooks", {books:["994","995","996"]}, function(
        responseData
      ) {
        alert(responseData)
      });
      }else{
        alert('error')
      }
    }

  }
};
</script>
<style scoped>
.testIos {
  margin: 3rem auto;
}
.testIos button {
  width: 80%;
  border: 1px solid #ccc;
  height: 2rem;
  background: none;
  margin-top: 10px;
}
:focus {
  outline: none;
}
</style>