  import ajaxhelper from './ajaxhelper.js';
var app = getApp();
var checkLogin = {
  // 检查有没有登录，第二个参数是回调函数 参数是token
  login(ctx,successFun){
    var that = ctx;
    var token_checkout = +new Date();
    var Token_date = wx.getStorageSync('Token_date') && wx.getStorageSync('Token_date').newData;
    var Token = (wx.getStorageSync('Token_date') && wx.getStorageSync('Token_date').Token) || '';
    if (!Token || (!Token_date) || (token_checkout > Token_date)) {
      // 登陆
      wx.login({
        success: function (res) {
          var md = { code: res.code };
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo;
              wx.setStorageSync('getUserInfo', userInfo)
              var nickName = userInfo.nickName;
              var headImageUrl = userInfo.avatarUrl;
              var params = {
                miniCode: md.code,
                userName: nickName,
                userLogo: headImageUrl
              }
              ajaxhelper.get(app.globalData.frontJSHost + 'wechat/member/login', params, this, function (res) {
                if (res.status) {
                  var token = res.data.token;
                  var member = res.data && res.data.member;
                  var shop = res.data && res.data.shop;
                  if (token) {
                    var tokens = token.trim().split('=');
                    if (tokens && tokens.length > 1) {
                      token = tokens[1];
                    }
                  }
                  var newData = +new Date();
                  wx.setStorageSync('Token_date', {
                    Token: token,
                    newData: newData + 30 * 24 * 60 * 60 * 1000,
                  });
                  wx.setStorageSync('shop',shop);
                  wx.setStorageSync('member',member);
                  // 使用同步,不用异步
                  // wx.setStorage({
                  //   key: 'Token_date',
                  //   data: {
                  //     Token: token,
                  //     newData: newData + 30 * 24 * 60 * 60 * 1000,
                  //   },
                  // })
                  // wx.setStorage({
                  //   key: 'shop',
                  //   data: shop,
                  // })
                  // wx.setStorage({
                  //   key: 'member',
                  //   data: member,
                  // })
                  // 回调
                  if (successFun && Object.prototype.toString.call(successFun) === '[object Function]'){
                    successFun.apply(ctx, [token,shop,member]);
                    // successFun.apply(ctx, [token]);
                  }
                  
                }


              });
            }, fail: function () {
              wx.navigateTo({
                url: '../authorized/authorized',
              })
              // 小程序获取用户信息接口更改,暂时不用此方法
              // var params = {
              //   miniCode: md.code
              // }
              // ajaxhelper.get(app.globalData.frontJSHost + 'wechat/member/login', params, this, function (res) {
              //   if (res.status) {
              //     var token = res.data.token;
              //     var member = res.data && res.data.member;
              //     var shop = res.data && res.data.shop;
              //     if (token) {
              //       var tokens = token.trim().split('=');
              //       if (tokens && tokens.length > 1) {
              //         token = tokens[1];
              //       }
              //     }
              //     // 回调
              //     if (successFun && Object.prototype.toString.call(successFun) === '[object Function]') {
              //       successFun.apply(ctx, [token,shop,member]);
              //       // successFun.apply(ctx, [token]);
              //     }
              //     var newData = +new Date();
              //     wx.setStorage({
              //       key: 'Token_date',
              //       data: {
              //         Token: token,
              //         newData: newData + 30 * 24 * 60 * 60 * 1000,
              //       },
              //     })
              //     wx.setStorage({
              //       key: 'shop',
              //       data: shop,
              //     })
              //     wx.setStorage({
              //       key: 'member',
              //       data: member,
              //     })
              //   }
              // })
            }
          })
        }
      });
    } else {
      // 回调
      var member = wx.getStorageSync('member') || '';
      var shop = wx.getStorageSync('shop') || '';
      if (successFun && Object.prototype.toString.call(successFun) === '[object Function]') {
        successFun.apply(ctx, [Token,shop,member]);
      }
    }
  },
}

export default checkLogin;
