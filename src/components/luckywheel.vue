<template>
  <div class="container">
    <div class="scroll_text">
      <marqueeX :sendVal="dm"></marqueeX>
    </div>
    <div class="box">
      <div class="header">
        <img :src="backImg" alt />
        <p>活动大厅</p>
      </div>
    </div>
    <div class="lucky-wheel">
      <div class="lucky-title"></div>
      <div class="wheel-main">
        <div class="wheel-pointer" @click="beginRotate()"></div>
        <div class="wheel-bg" :style="rotateStyle">
          <div class="prize-list">
            <div
              class="prize-item"
              v-for="(item,index) in prizeList"
              :key="index"
              :style="item.style"
            >
              <div class="prize-pic">
                <img :src="item.icon" />
              </div>
              <!-- <div class="prize-type">{{item.name}}</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main-bg"></div>
      <div class="bg-p"></div>
      <div class="content">
        <div class="count">
          <p style="font-size:.8rem">
            <span class="go_btn" @click="getchance">看视频获取抽奖机会</span>
          </p>
        </div>
      </div>
      <div class="tip2">
        <div class="tip2-title">中奖记录</div>
        <div class="tip2-content">
          <li v-for="(item,key) in goodsList" :key="key">
            <span>{{item.date}}</span>
            <span>{{item.award}}</span>
          </li>
        </div>
      </div>
      <div class="tip">
        <div class="tip-title">活动规则</div>
        <div class="tip-content">
          <p>1. 每个用户每天有4次抽奖机会，第一次可直接抽奖，其余3次可通过观看小视频获取，每完整观看一次小视频可进行一次抽奖。</p>
          <p>2. 每次观看完小视频即可获得奖励，中途退出视为放弃抽奖机会。</p>
          <p>3. 每日0点刷新抽奖机会。</p>
          <p>4. 本活动最终解释权归XX小说所有。</p>
        </div>
      </div>
    </div>
    <div class="toast" v-show="prize">
      <div class="toast-container">
        <!-- <img :src="toastIcon" class="toast-picture" /> -->
        <div class="close" @click="closeToast()"></div>
        <div class="toast-title">{{toastTitle}}</div>
        <div class="toast-btn">
          <div class="toast-cancel" @click="closeToast">关闭</div>
        </div>
      </div>
    </div>
    <div class="toast-mask" v-show="prize"></div>
    <div class="toast" v-show="loginValid2">
      <div class="toast-container">
        <!-- <img :src="toastIcon" class="toast-picture" /> -->
        <div class="close" @click="loginValid2=false"></div>
        <div class="toast-title">请先登录</div>
        <div class="toast-btn">
          <div class="toast-cancel" @click="back">确认</div>
        </div>
      </div>
    </div>
    <div class="toast" v-show="havenot">
      <div class="toast-container">
        <!-- <img :src="toastIcon" class="toast-picture" /> -->
        <div class="close" @click="havenot = false"></div>
        <div class="toast-title">暂无抽奖机会</div>
        <div class="toast-btn">
          <div class="toast-cancel" @click="havenot = false">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "@/utils/bridge.js";
import { prizeList } from "./config";
import axios from "axios";
const CIRCLE_ANGLE = 360;

const config = {
  // 总旋转时间
  duration: 3000,
  // 旋转圈数
  circle: 6,
  mode: "linear"
};
import backImg from "../assets/img/back.png";
import marqueeX from "@/components/scrollX";
export default {
  data() {
    return {
      backImg: backImg,
      dm: [],
      host: "http://newtestuser.smaoxs.com",
      endFlag: true,
      count: 100, // 剩余抽奖次数
      duration: 3000, // 转盘旋转时间
      prizeList: [], // 奖品列表
      rotateAngle: 0, // 旋转角度
      index: 0,
      prize: null,
      havenot: false,
      goodsList: [], //获奖记录
      token:
        "VuNpshQD980E987kna2b963xA17pOz0298IPVh0t9unwnf7kOfKksbnmRTGbikQys6pNlYnmnadIRHqt0891ljJGRjD6-j0k0SvboYNGOH5Clf3uOTnmnv5UlhNWi8DboYNCO6xkObnmnaQf7TxyR1kUKqGWlA5f9MKq967RTbxl-hQ5OqdWqdv3nbGb78kvna2bRt5fRjRuRa9yR8Du0S0k9jvC0akp9fdylj9C0SkbRtgbPD==",
      loginStatus: null,
      activityId: 1,
      loginValid: true,
      reallyPrizeList: [
        {
          icon: require("../assets/img/bean_500.png"), // 奖品图片
          // 奖品名称
          isPrize: 1, // 该奖项是否为奖品
          id: 0
        },
        {
          icon: require("../assets/img/give_up.png"),
          name: "谢谢参与",
          isPrize: 0,
          id: 0
        },
        {
          icon: require("../assets/img/bean_one.png"),

          isPrize: 1,
          id: 0
        },
        {
          icon: require("../assets/img/give_up.png"),
          name: "谢谢参与",
          isPrize: 0,
          id: 0
        },
        {
          icon: require("../assets/img/point_ten.png"),

          isPrize: 1,
          id: 0
        },
        {
          icon: require("../assets/img/give_up.png"),
          name: "谢谢参与",
          isPrize: 0,
          id: 0
        },
        {
          icon: require("../assets/img/bean_500.png"),

          isPrize: 1,
          id: 0
        },
        {
          icon: require("../assets/img/give_up.png"),
          name: "谢谢参与",
          isPrize: 0,
          id: 0
        }
      ],
      loginValid2: false
    };
  },
  components: { marqueeX },
  created() {
    //看完视频成功回调
    this.$bridge.registerhandlerAndroid(
      "td_native_function_rewordVideo",
      (data, responseCallback) => {
        data = JSON.parse(data);
        if (data.status == 0) {
          alert("激励视频，" + data);
          this.getMessage();
        }
      }
    );
    // 初始化一些值
    this.angleList = [];
    // 是否正在旋转
    this.isRotating = false;
    // 基本配置
    this.config = config;

    // 获取奖品列表
    this.initPrizeList();
  },
  computed: {
    rotateStyle() {
      return `
        -webkit-transition: transform ${this.config.duration}ms ${this.config.mode};
        transition: transform ${this.config.duration}ms ${this.config.mode};
        -webkit-transform: rotate(${this.rotateAngle}deg);
            transform: rotate(${this.rotateAngle}deg);`;
    },
    toastTitle() {
      return this.prize && this.prize.isPrize === 1
        ? "恭喜您，获得" + this.prize.name
        : "谢谢惠顾";
    },
    toastIcon() {
      return this.prize && this.prize.isPrize === 1
        ? require("../assets/img/congratulation.png")
        : require("../assets/img/sorry.png");
    }
  },
  mounted() {
    setTimeout(() => {
      this.$bridge.callhandlerAndroid(
        "td_js_function_nativeInfo",
        {},
        function responseCallback(responseData) {
          //获取到iOS回调后需要做的事情写在这里
          this.token = JSON.parse(data).header;
        }
      );
      this.checkLogin();
    }, 0);
  },
  methods: {
    getchance() {
      this.$bridge.callhandlerAndroid(
        "td_js_function_rewordVideo",
        {},
        function responseCallback(responseData) {
          //获取到iOS回调后需要做的事情写在这里
        }
      );
    },
    checkLogin() {
      axios({
        method: "get",
        url: this.host + "/api/v1/user/check",
        params: {},
        contentType: "application/json",
        headers: { "x-device-data": this.token }
      }).then(res => {
        this.loginValid = res.data.data.loginValid;
        this.getPrizeList();
        // if (this.loginValid) {
        //   this.getPrizeList();
        // }
      });
    },
    initPrizeList() {
      // 这里可以发起请求，从服务端获取奖品列表
      // 这里使用模拟数据
      this.prizeList = this.formatPrizeList(this.reallyPrizeList);
    },
    // 格式化奖品列表，计算每个奖品的位置
    formatPrizeList(list) {
      // 记录每个奖的位置
      const angleList = [];

      const l = list.length;
      // 计算单个奖项所占的角度
      const average = CIRCLE_ANGLE / l;

      const half = average / 2;

      // 循环计算给每个奖项添加style属性
      list.forEach((item, i) => {
        // 每个奖项旋转的位置为 当前 i * 平均值 + 平均值 / 2
        const angle = -(i * average + half);
        // 增加 style
        item.style = `-webkit-transform: rotate(${angle}deg);
                      transform: rotate(${angle}deg);`;

        // 记录每个奖项的角度范围
        angleList.push(i * average + half);
      });
      this.angleList = angleList;
      return list;
    },
    beginRotate() {
      // 开始抽奖
      // 这里这里向服务端发起请求，得到要获得的奖
      // 可以返回下标，也可以返回奖品 id，通过查询 奖品列表，最终得到下标

      if (this.endFlag) {
        if (this.count > 0) {
          // 随机获取下标

          this.endFlag = false;
          this.count--;
          axios({
            method: "post",
            url: this.host + "/api/v1/activity/turnplate/" + this.activityId,
            data: {},
            contentType: "application/json",
            headers: { "x-device-data": this.token }
          }).then(res => {
            if (res.data.data.id == -1) {
              this.index = Math.floor(Math.random() * [1, 3, 5, 7].length);
            } else {
              this.index = this.getIndex(
                this.reallyPrizeList,
                res.data.data.id
              );
            }

            this.rotating();
            // setTimeout(()=>{
            //   if(res.data.data.id > -1){

            //   this.loginValid2=true
            // }
            // },1000)
          });

          // 开始旋转
        } else {
          this.havenot = true;
        }
      }
    },
    random(max, min = 0) {
      return parseInt(Math.random() * (max - min + 1) + min);
    },
    rotating() {
      const { isRotating, angleList, config, rotateAngle, index } = this;

      if (isRotating) return;

      this.isRotating = true;

      // 计算角度
      const angle =
        // 初始角度
        rotateAngle +
        // 多旋转的圈数
        config.circle * CIRCLE_ANGLE +
        // 奖项的角度
        angleList[index] -
        (rotateAngle % CIRCLE_ANGLE);

      this.rotateAngle = angle;

      // 旋转结束后，允许再次触发
      setTimeout(() => {
        this.rotateOver();
      }, config.duration + 1000);
    },
    rotateOver() {
      this.isRotating = false;

      this.prize = this.reallyPrizeList[this.index];

      this.endFlag = true;
      // console.log(this.prize, this.index);
    },
    //关闭弹窗
    closeToast() {
      this.prize = null;
    },
    getVideo() {
      this.$bridge.callhandlerAndroid(
        "td_js_function_rewordVideo",
        { action: "onbackpressed", data: {} },
        function(res) {}
      );
    },
    //  返回登录
    back() {},
    getList() {
      axios({
        method: "get",
        url: this.host + "/api/v1/activity/turnplate/bingo",
        params: { activityId: this.activityId },
        contentType: "application/json",
        headers: { "x-device-data": this.token }
      }).then(res => {
        this.dm = [];
        for (var i in res.data.data) {
          this.dm[i] = {
            name:
              "恭喜" +
              res.data.data[i].userName +
              "，获得了" +
              res.data.data[i].award +
              "！"
          };
        }
      });
    },
    getPrizeList() {
      axios({
        method: "get",
        url: this.host + "/api/v1/activity/data",
        params: { video: true },
        contentType: "application/json",
        headers: { "x-device-data": this.token }
      }).then(res => {
        if (res.data.code == 0) {
          this.activityId = res.data.data.activityId;
          this.reallyPrizeList[0].name = res.data.data.awards[0].title;
          this.reallyPrizeList[0].id = res.data.data.awards[0].id;
          this.reallyPrizeList[2].name = res.data.data.awards[1].title;
          this.reallyPrizeList[2].id = res.data.data.awards[1].id;
          this.reallyPrizeList[4].name = res.data.data.awards[2].title;
          this.reallyPrizeList[4].id = res.data.data.awards[2].id;
          this.reallyPrizeList[6].name = res.data.data.awards[3].title;
          this.reallyPrizeList[6].id = res.data.data.awards[3].id;
          this.getList();
          setTimeout(() => {
            this.getList();
          }, 15000);
          axios({
            method: "get",
            url: this.host + "/api/v1/activity/turnplate/record",
            params: {},
            contentType: "application/json",
            headers: { "x-device-data": this.token }
          }).then(res => {
            this.goodsList = res.data.data;
          });
        }
      });
    },
    getIndex(arr, value) {
      for (var i = 0, vlen = arr.length; i < vlen; i++) {
        if (arr[i].id == value) {
          return i;
        }
      }
      return -1;
    },
    bringPrize() {
      axios({
        method: "get",
        url: this.host + "/api/v1/activity/turnplate/draw/" + this.activityId,
        params: {},
        contentType: "application/json",
        headers: { "x-device-data": this.token }
      }).then(res => {});
    }
  }
};
</script>
<style scoped>
.box {
  height: 50px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10000;
}
.header {
  background: rgb(219, 76, 25);
  line-height: 50px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-right: 40px;
}
.header img {
  width: 25px;
  height: 25px;
}
.header p {
  text-align: center;
  flex: 1;
  color: #fff;
}
.container {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.lucky-wheel {
  margin-top: 50px;
  width: 100%;
  background: rgb(252, 207, 133) url("../assets/img/color_pillar.png") no-repeat
    center bottom;
  background-size: 100%;
  padding-top: 20px;
}
.lucky-title {
  width: 100%;
  height: 8.125rem;
  background: url("../assets/img/lucky_title.png") no-repeat center top;
  background-size: 100%;
}
.wheel-main {
  margin: 0 auto;
  position: relative;
  width: 295px;
  height: 295px;
}
.wheel-bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: url("../assets/img/draw_wheel.png") no-repeat center top;
  background-size: 100%;
  color: #fff;
}
.wheel-pointer {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  width: 85px;
  height: 85px;
  background: url("../assets/img/draw_btn.png") no-repeat center top;
  background-size: 100%;
  transform: translate3d(-50%, -50%, 0);
}
.wheel-bg div {
  text-align: center;
}
.prize-list {
  width: 100%;
  height: 100%;
  position: relative;
}
.prize-list .prize-item {
  position: absolute;
  width: 95px;
  height: 150px;
  top: 0;
  left: 50%;
  margin-left: -47.5px;
  transform-origin: 50% 100%;
}

.prize-pic img {
  width: 4.0625rem;
  height: 2.5rem;
  margin-top: 2.2rem;
}
.prize-count {
  font-size: 0.875rem;
}
.prize-type {
  font-size: 0.6rem;
}
.main {
  position: relative;
  width: 100%;
  min-height: 20rem;
  background: rgb(243, 109, 86);
  padding-bottom: 1.6875rem;
}

.main-bg {
  width: 100%;
  height: 6.5625rem;
  position: absolute;
  top: -3.4375rem;
  left: 0;
  background: url("../assets/img/luck_bg.png") no-repeat center top;
  background-size: 100%;
}
.bg-p {
  width: 100%;
  height: 2.95rem;
  background: rgb(252, 207, 133);
}
.content {
  position: absolute;
  top: 1rem;
  left: 0;
  background: rgb(243, 109, 86);
  width: 100%;
  height: 5.1875rem;
  font-size: 1.125rem;
  color: #ffeb39;
}
.content div {
  text-align: center;
  line-height: 2rem;
}
.tip {
  position: relative;
  margin: 2.5rem auto 0;
  width: 17.5rem;
  border: 1px solid #fbc27f;
}
.tip-title {
  position: absolute;
  top: -1rem;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 1rem;
  color: #fccc6e;
  background: rgb(243, 109, 86);
  padding: 0.3125rem 0.625rem;
}
.tip-content {
  padding: 1.5625rem 0.625rem;
  font-size: 0.875rem;
  color: #fff8c5;
  line-height: 1.5;
}
.tip-content p {
  line-height: 1.2rem;
  font-size: 0.775rem;
}
.tip2 {
  position: relative;
  margin: 4rem auto 0;
  width: 17.5rem;
  border: 1px solid #fbc27f;
}
.tip2-title {
  position: absolute;
  top: -1rem;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 1rem;
  color: #fccc6e;
  background: rgb(243, 109, 86);
  padding: 0.3125rem 0.625rem;
}
.tip2-content {
  padding: 0 0.625rem;
  font-size: 0.775rem;
  color: #fff8c5;
  line-height: 1.5;
  margin: 1.5rem 0;
  height: 8rem;
  overflow-y: scroll;
  text-align: left;
}
.tip2-content li {
  display: flex;
  padding: 0 1rem;
}
.tip2-content li span {
  text-align: left;
  padding-left: 2em;
}
.toast-mask {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10000;
  width: 100%;
  height: 100%;
}
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 20000;
  transform: translate(-50%, -50%);
  width: 15.4375rem;
  background: #fff;
  border-radius: 0.3125rem;
  padding: 0.3125rem;
  background-color: rgb(252, 244, 224);
}
.toast-container {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px dotted #fccc6e;
}
.toast-picture {
  position: absolute;
  top: -6.5rem;
  left: -1.5rem;
  width: 18.75rem;
  height: 8.5625rem;
}
.toast-pictrue-change {
  position: absolute;
  top: -1.5rem;
  left: -1.375rem;
  width: 17.5rem;
  height: 3.125rem;
}
.toast-title {
  padding: 2.8125rem 0;
  font-size: 18px;
  color: #fc7939;
  text-align: center;
}
.toast-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.9375rem;
}
.toast-btn div {
  background-image: -moz-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );

  background-image: -ms-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );
  background-image: -webkit-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );
  box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
  width: 4.6875rem;
  height: 1.875rem;
  border-radius: 1.875rem;
  text-align: center;
  line-height: 1.875rem;
  color: #fff;
}
.close {
  position: absolute;
  top: -0.9375rem;
  right: -0.9375rem;
  width: 2rem;
  height: 2rem;
  background: url("../assets/img/close_store.png") no-repeat center top;
  background-size: 100%;
}
.scroll_text {
  position: absolute;
  width: 100%;
  top: 50px;
  color: #fff;
  font-size: 10px;
}
.go_btn {
  display: inline-block;
  background-image: -webkit-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );
  -webkit-box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
  box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
  padding: 0 10px;
  height: 1.375rem;
  border-radius: 1.875rem;
  text-align: center;
  line-height: 1.375rem;
  color: #fccc6e;
}
.go_btn:active {
  color: yellow;
}
</style>

