<template>
  <div class="android">
   
    <div class="header"  >
      <p class="title">
        <md-icon name="arrow-left" style="float:left;font-weight:600" @click="back"></md-icon><span>会员中心</span>
        <span v-if="bOnline==0" class="hfgm" @click="hfgm">恢复购买</span>
      </p>
    </div>
    <div class="header2"  >
      <div class="vip_card" v-if="!hyFlag">
        <p>暂未开通会员</p>
        <div>
          <img :src="boyImg" alt v-show="userMessage.gender==1"/>
          <img :src="girlImg" alt v-show="userMessage.gender==2"/>
          <span>{{userMessage.nickname}}</span>
        </div>
      </div>
      <div class="vip_card2" v-if="hyFlag">
        <div class="syrq">{{userMessage.vipExpireDate | formatDate}}&nbsp;到期</div>
        <p>已开通会员</p>
        <div>
         <img :src="boyImg" alt v-show="userMessage.gender==1"/>
          <img :src="girlImg" alt v-show="userMessage.gender==2"/>
          <span>{{userMessage.nickname}}</span>
        </div>
      </div>
      <p class="hyfl">会员福利</p>
      <div class="hytq">
        <div v-for="(item,key) in hyflList" class="hytqxq">
          <img :src="item.img" alt />
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="content"  >
      <p class="title">选择会员套餐</p>
      <div class="content_tcxq">
        <div
          v-for="(item,key) in tcList"
          :key="key"
          v-on:click="addClass(key,item)"
          v-bind:class="{ selectDiv:key==current}"
        >
          <p>{{item.name}}</p>
          <p>¥<span>{{item.preferentialPrice}}</span>
          </p>
          <p>¥<span>{{item.originalPrice}}</span>
          </p>
          <div v-show="item.description">{{item.description}}</div>
            <span v-show="item.tag">{{item.tag}}</span>
        </div>
      </div>
      <p class="message" v-if="tcList[current]">{{tcList[current].tips}}</p>

      <div class="gm" @click="zf">
        <p>
          立即支付{{selTc.preferentialPrice}}元
          <span>已节省{{selTc.originalPrice-selTc.preferentialPrice}}元</span>
        </p>
      </div>
    </div>

    <p class="fjx"  ></p>
    <div class="zzssm"  >
      <p>自动续费商品声明</p>
      <p>1. 付款：自动续费商品包括“连续包月/连续包季/连续包年”，您确认购买后，会从您选择的支付平台账户中扣费；</p>
      <p>2. 续费会员：续费服务会在到期前24小时扣费，扣费成功后会员有效期自动顺延一个订阅周期。</p>
      <p>3. 取消续费：如需取消自动续费，请在当前订阅周期到期前24小时以前，在相关支付平台中取消订阅。到期前24小内取消，将会收取订阅费用。</p>
      <p>4. 若遇到付款后权益未到账或其他问题，请及时联系客服QQ:3423002297。</p>
    </div>

    <p class="fjx"  ></p>
    <div class="tyxy"  >
      <p>如开通会员即表示您同意如下协议</p>
      <p>
        <a @click="toYsxy">《隐私保护政策》</a>
        <span></span>
        <a @click="toYhxy">《用户服务协议》</a>
      </p>
    </div>
  </div>
</template>
<script>
import "@/utils/bridge.js";
import axios from "axios";
import adImg from "@/assets/andorid/icon_ad.png";
import rbImg from "@/assets/andorid/icon_listen.png";
import ydImg from "@/assets/andorid/icon_read.png";
import bsImg from "@/assets/andorid/icon_vip.png";
import wxImg from "@/assets/andorid/icon_wechat.png";
import zfbImg from "@/assets/andorid/icon_alipay.png";
import txImg from "@/assets/andorid/icon_head_def.png";
import moreImg from "@/assets/andorid/icon_more@2x.png";

import boyImg from "@/assets/andorid/boy.png";
import girlImg from "@/assets/andorid/girl.png";
import { Dialog, Button } from "mand-mobile";

export default {
  name: "Android",
  components: {
    [Dialog.name]: Dialog
  },
  data() {
    return {
      host: "http://user.smaoxs.com",
      hyFlag: false,
      txImg: txImg,
      boyImg:boyImg,
      girlImg:girlImg,
      hyflList: [
        {
          name: "免广告",
          img: adImg
        },
        {
          name: "尊贵标识",
          img: bsImg
        },

        {
          name: "敬请期待",
          img: moreImg
        }
      ],
      current: 0,
      tcList: [],
      bOnline:1,
      sel: 1,
      selTc: {},
      zfList: [
        {
          name: "支付宝支付",
          img: zfbImg,
          sel: 1
        },
        {
          name: "微信支付",
          img: wxImg,
          sel: 2
        }
      ],
      token: "",
      userMessage: {
        nickname: "暂未登录"
      },
      pub_parm:{}
    };
  },
  created() {
let that = this;
    this.$bridge.registerhandlerIOS(
      "td_native_function_callback",
      (data, responseCallback) => {
        data = JSON.parse(data);
        if (data.type === "td_native_type_purchase") {
          if (data.status == 0) {
            that.getMessage();
            that.getFuqUser();
            Dialog.alert({
              title: "开通成功！",
              content: "恭喜您成为VIP会员～",
              confirmText: "确认",
              onConfirm: () => {
                
              }
            });
          } else {
          }
        }

        if (data.type == "td_native_type_rewordLogin") {
            if (data.status == 0) {
              that.checkAgain()
            } else {
            }
          }
      }
    );
   
  },
  mounted() {
    this.$bridge.callhandlerIOS(
      "td_js_function_headerBg",
      {
        background: "#1F202A"
      },
      function(responseData) {
      }
    );
    let that = this;

    setTimeout(() => {
      this.$bridge.callhandlerIOS(
        "td_js_function_nativeInfo",
        {},
        function responseCallback(data) {
          //获取到iOS回调后需要做的事情写在这里
          that.token = JSON.parse(data).header;
          that.bOnline = JSON.parse(data).bOnline;
          that.pub_parm =JSON.parse(JSON.parse(data).pub_parm) ;
          // that.token = data.header;
          that.getMessage();
        }
      );
    }, 0);
     
  },
  filters: {
    // 定义过滤器
    formatDate(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      return Y + M + D;
    }
  },
  methods: {
    goLogin() {
      this.$bridge.callhandlerAndroid(
        "td_js_function_toLogin",
        {},
        function responseCallback(responseData) {
          //获取到iOS回调后需要做的事情写在这里
        }
      );
    },
    checkAgain(){
      let that = this;
       this.$bridge.callhandlerAndroid(
        "td_js_function_nativeInfo",
        {},
        function responseCallback(data) {
          that.pub_parm = JSON.parse(data).pub_parm;
          //获取到iOS回调后需要做的事情写在这里
          that.token = JSON.parse(data).header;
          that.getMessage();
        }
      );
    },
    getMessage() {
      axios({
        method: "get",
        url: this.host + "/api/v1/vip/products",
        params: {},
        contentType: "application/json",
        headers: { "x-device-data": this.token }
      }).then(res => {
        this.tcList = res.data.data;
        this.selTc = this.tcList[this.current];
      });
      axios({
        method: "get",
        url: this.host + "/api/v1/user",
        params: {},
        contentType: "application/json",
        headers: { "x-device-data": this.token }
      }).then(res => {
        if (res.data.code == 0) {
          this.userMessage = res.data.data;
          this.hyFlag = this.userMessage.vip;
        }
      });
    },
    changezf(key) {
      this.sel = key;
      if (this.sel == 1) {
      }
      if (this.sel == 2) {
      }
    },
    back() {
      this.$bridge.callhandlerIOS("td_js_function_exit", {}, function(
        responseData
      ) {});
    },
    addClass(key, item) {
      this.current = key;
      this.selTc = item;
      console.log(this.selTc.name);
    },
    zf() {
      axios({
        method: "get",
        url: this.host + "/api/v1/user/check",
        params: {},
        contentType: "application/json",
        headers: { "x-device-data": this.token }
      }).then(res => {
        this.loginValid = res.data.data.loginValid;
        if (this.loginValid) {
          let subscription = 0;
          if (this.selTc.subscription) {
            subscription = 1;
          }
          let data = {
            product_id: this.selTc.id,
            productUuid: this.selTc.productUuid,
            subscriptions: subscription,
          };
          this.$bridge.callhandlerIOS("td_js_function_purchase", data, function(
            responseData
          ) {});
        } else {
          let that = this;
          Dialog.alert({
            title: "提示",
            content: "您还没有登录，请前往登录",
            cancelText: "取消",
            confirmText: "去登录",
            onConfirm: () => {
              that.goLogin()
            }
          });
        }
      });
    },
    succeedConfirm() {
      this.hyFlag = !this.hyFlag;
    },
    toYhxy() {
      this.$router.push({
        name: "Yhxy",
        params: { appPackage: this.pub_parm.appPackage }
      });
    },
    toYsxy() {
      this.$router.push({
        name: "Ysxy",
        params: { appPackage: this.pub_parm.appPackage }
      });
    },
    hfgm(){
       this.$bridge.callhandlerIOS("td_js_function_restore_purchase", {}, function(
        responseData
      ) {});
    },
    getFuqUser() {
      this.$bridge.callhandlerIOS(
        "td_js_function_updateUserInfo",
        {},
        function(res) {}
      );
    }
  }
};
</script>
<style scoped>
.hfgm{
  position: absolute;
  right: 10px;
  font-size: 20px;
  line-height: 36px;
}
.header {
  position: fixed;
  display: block;
  width: 100%;
  z-index: 100;
  height: 80px;
  padding: 30px 18px 62px;
  background: rgba(31, 32, 42, 1);
}
.header2 {
  height: 580px;
  padding: 30px 18px 62px;
  background: rgba(31, 32, 42, 1);
}
.header .title {
  height: 34px;
  font-size: 36px;
  text-align: center;
  font-weight: 500;
  color: rgba(253, 253, 253, 1);
}
.content {
  /* height: 1100px; */
  background: rgba(255, 255, 255, 1);
  border-radius: 16px 16px 0px 0px;
  margin-top: -10px;
}
.vip_card {
  height: 200.6px;
  background-image: url("../assets/andorid/vip_card_gray.png");
  background-size: cover;
  border-radius: 16px;
  margin: 80px 14px 30px;
  text-align: left;
  padding: 34px 54px;
}
.vip_card p {
  height: 34px;
  font-size: 36px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(69, 69, 69, 1);
  line-height: 32px;
}
.vip_card div {
  margin-top: 34px;
  display: flex;
}
.vip_card div span {
  line-height: 22px;
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(69, 69, 69, 1);
  padding-left: 10px;
  line-height: 60px;
}
.vip_card div img {
  width: 61px;
  height: 61px;
}
.vip_card2 {
  height: 200.6px;
  background-image: url("../assets/andorid/vip_card_golden.png");
  background-size: cover;
  border-radius: 16px;
  margin: 80px 14px 30px;
  text-align: left;
  padding: 34px 54px;
  position: relative;
}
.syrq {
  position: absolute;
  right: 2px;
  top: -10px;
  height: 50px;
  line-height: 50px;
  background: rgba(225, 184, 123, 1);
  border-radius: 25px 0px 0px 25px;
  font-size: 22px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  padding-left: 13px;
  padding-right: 2px;
}
.vip_card2 p {
  height: 34px;
  font-size: 36px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(69, 69, 69, 1);
  line-height: 32px;
}
.vip_card2 div {
  margin-top: 34px;
  display: flex;
}
.vip_card2 div span {
  line-height: 22px;
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(69, 69, 69, 1);
  padding-left: 10px;
  line-height: 60px;
}
.vip_card2 div img {
  width: 61px;
  height: 61px;
}
.hyfl {
  height: 31px;
  line-height: 32px;
  font-size: 32px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  margin-bottom: 28px;
}
.hytq {
  margin: 29px 46px 23px;
  display: flex;
  justify-content: space-between;
}

.hytqxq {
  display: flex;
  flex-direction: column;
  width: 100px;
  text-align: center;
}
.hytqxq img {
  width: 70px;
  height: 69px;
  margin: 0 auto;
  margin-bottom: 21px;
}
.hytqxq span {
  height: 23px;
  font-size: 24px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.content > .title {
  margin-left: 31px;
  padding-top: 26px;
  padding-bottom: 40px;
  height: 31px;
  font-size: 32px;
  font-weight: bold;
  text-align: left;
  color: rgba(27, 27, 27, 1);
}
.content_tcxq {
  display: flex;
  margin: 40px 32px 0;
  justify-content: left;
  flex-wrap: wrap;
}
.content_tcxq > div {
  width: 195px;
  height: 259px;
  background: rgba(255, 255, 255, 0.1);
  border:2px solid rgba(223,185,128,0.5);
  border-radius: 12px;
  margin-bottom: 37px;
  margin-right: 50px;
  position: relative;
}
.content_tcxq > div > span {
  display: inline-block;
  position: absolute;
  top: -15px;
  left: -2px;
  width: 91px;
  height: 30px;
  background: rgba(255, 103, 45, 1);
  border-radius: 15px 0px 15px 0px;
  font-size: 20px;
  line-height: 30px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.content_tcxq > div:nth-of-type(3),
.content_tcxq > div:nth-of-type(6) {
  margin-right: 0px;
}
.content_tcxq > div > p:first-of-type {
  height: 29px;
  line-height: 29px;
  margin-top: 37px;
  margin-bottom: 24px;
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(31, 31, 31, 1);
}
.content_tcxq > div p:nth-of-type(2) {
  height: 42px;
  line-height: 42px;
  font-size: 41px;
  font-family: PingFang SC;
  margin-bottom: 24px;
  font-weight: 400;
  color: rgba(221, 172, 100, 1);
  text-align: center;
}
.content_tcxq > div p:nth-of-type(2) > span {
  font-size: 56px;
  font-weight: bold;
}
.content_tcxq > div p:nth-of-type(3) {
  text-decoration: line-through;
}
.content_tcxq > div p:nth-of-type(3) {
  height: 20px;
  line-height: 20px;
  font-size: 26px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(202, 202, 202, 1);
}
.content_tcxq > div > div {
  position: absolute;
  bottom: -1px;
  text-align: center;
  width: 100%;
  background: #f6ead9;
  padding: 11px 0;
  border-radius: 0 0 10px 10px;
  line-height: 30px;
  font-size: 26px;
  font-family: PingFang SC;
  font-weight: 500;

  color: rgba(221, 172, 100, 1);
}
.message {
  height: 23px;
  text-align: left;
  margin-left: 30px;
  margin-bottom: 20px;
  line-height: 23px;
  margin-bottom: 40px;
  font-size: 22px;
  font-weight: 500;
  color: rgba(179, 179, 179, 1);
}
.gm {
  width: 686px;
  height: 80px;
  background: linear-gradient(
    -83deg,
    rgba(222, 181, 120, 1) 0%,
    rgba(245, 204, 146, 1) 100%
  );
  border-radius: 40px;
  margin: 0 auto 50px;
}
.gm p {
  line-height: 80px;
  font-size: 32px;
  font-family: PingFang SC;
  font-weight: 800;
  color: rgba(129, 83, 16, 1);
}
.gm p span {
  padding-left: 12px;
  font-size: 22px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(129, 83, 16, 1);
}
.fjx {
  background: #eee;
  height: 12px;
}
.zffs {
  margin-top: 50px;
  height: 200px;
  background: rgba(255, 255, 255, 1);
}
.zffs > .title {
  height: 31px;
  font-size: 32px;
  text-align: left;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(10, 10, 10, 1);
  line-height: 30px;
  padding-left: 41px;
  margin-top: 34px;
  margin-bottom: 43px;
}
.zffs > div {
  margin-left: 44px;
  margin-right: 58px;
  margin-bottom: 43px;
  text-align: left;
}
.zffs > div > img {
  width: 50px;
  height: 46px;
}
.zffs > div > span {
  padding-left: 63px;
  height: 26px;
  line-height: 46px;
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(71, 71, 71, 1);
}
.zzssm {
  height: 410px;
  background: rgba(255, 255, 255, 1);
  padding-top: 26px;
  padding-left: 32px;
  padding-right: 22px;
  padding-bottom: 44px;
}
.zzssm p:first-of-type {
  height: 22px;
  font-size: 22px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(153, 151, 151, 1);
  line-height: 32px;
  margin-bottom: 21px;
}
.zzssm p {
  text-align: left;
  font-size: 22px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(179, 179, 179, 1);
  line-height: 36px;
}
.zzssm2 {
  height: 409px;
  background: rgba(255, 255, 255, 1);
  padding-top: 26px;
  padding-left: 32px;
  padding-right: 22px;
  padding-bottom: 44px;
}
.zzssm2 p:first-of-type {
  height: 22px;
  font-size: 22px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(153, 151, 151, 1);
  line-height: 32px;
  margin-bottom: 21px;
  text-align: justify;
}
.zzssm2 p {
  text-align: left;
  font-size: 22px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(179, 179, 179, 1);
  line-height: 36px;
  text-align: justify;
}
.tyxy {
  height: 166px;
  background: rgba(255, 255, 255, 1);
}
.tyxy p {
  margin-top: 31px;
  height: 22px;
  font-size: 22px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(27, 27, 27, 1);
  line-height: 32px;
}
.tyxy p:nth-of-type(2) {
  display: flex;
  margin: 30px 108px;
  justify-content: space-between;
}
.tyxy p a {
  height: 22px;
  font-size: 22px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(179, 179, 179, 1);
  line-height: 34px;
}
.tyxy p span {
  width: 1px;
  height: 32px;
  background: rgba(198, 198, 198, 1);
}
.content_tcxq .selectDiv {
  background:rgba(228,184,120,0.2);
border:2px solid rgba(221,172,100,1);
  border-radius: 12px;
}
.content_tcxq .selectDiv > div {
  background: rgba(225, 186, 129, 1);
  color: rgba(255, 255, 255, 1);
}
.content_tcxq .selectDiv  p:nth-of-type(2){
  color: #CE9139 !important
}
.content_tcxq .selectDiv  p:nth-of-type(2) span{
  color: #CE9139 !important
}
.content_tcxq .selectDiv  p:nth-of-type(3){
  color:#B0AFAF !important
}

.zftp {
  float: right;
  width: 35px !important;
  height: 35px !important;
}
.contain_box {
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
}

</style>