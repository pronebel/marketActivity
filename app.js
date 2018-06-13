//app.js
import ajaxhelper from './utils/ajaxhelper.js';
import { signByMd5 } from "./utils/util";
App({
  onLaunch: function (options) { 
    // 给date对象原型增加一个方法 把时间格式处理为yy-mm-dd
    this.format() ;
  }, 
  // 给date对象原型加一个数据格式的方法
  format:function(){
    Date.prototype.format = function (format) {
      var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
      };
      if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1
            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
      }
      return format;
    }
  },

  toDate(number) { // 时间戳转日期
    let n = number;
    let date = new Date(n);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return (Y + M + D)
  },
  globalData:{
    userInfo:null,
    userParam:null,  
    // 测试环境
    // frontJSHost:"http://wechat.test.chuangchuang.cn/cc-huodong-web/",
    // frontJSHost:"https://m2.chuangchuang.cn/cc-huodong-web/",
    frontJSHost:"https://cc.lingkc.com/cc-huodong-web/",
    // frontJSHost: "",
    // 生产环境 
    // frontJSHost: "",
    orderPrivatekey:"KrBwaNoqaaGqBWREPghLqSrKOQBX5GH9",
  },
 
})



