var app = getApp()
import ajaxhelper from '../../utils/ajaxhelper.js';

Page({
  data: {
    flag: 'showMe',
    name:'',
    imgurl:'',
    canWithdraw:'0.00',
    hasFreeze:'0.00',
    msg:''
  },
  onLoad: function (options) {
    this.getData();
    // var that = this;
    // wx.request({
    //   url: app.globalData.frontJSHost + 'shopAccount/selectAccount',
    //   success: function (res) {
    //     if (res.status) {
    //       that.setData({
    //         canWithdraw: res.data.shopAccount.canWithdraw,
    //         name: res.data.member.wxname,
    //         imgurl: res.data.member.logo,
    //       })
    //     }

    //   }
    // })  
  },
  getData: function () {
    let param = {
    }
    ajaxhelper.get(app.globalData.frontJSHost + 'shopAccount/selectAccount', param,this, function (res){
      if (res.status) {
        console.log(res.status);
        var names = wx.getStorageSync('getUserInfo')
        this.setData({
          canWithdraw: res.data.shopAccount.canWithdraw/100,
          name: names.nickName,
          imgurl: names.avatarUrl,
          hasFreeze: res.data.shopAccount.hasFreeze / 100
        })
      }
    })
  },
  withdraw:function(){
    var that = this;
    let param = {
    }
    ajaxhelper.get(app.globalData.frontJSHost + '/shopAccount/wantWithdraw', param, this, function (res) {
      if (res.status) {
        console.log(res.status);
        that.showMsg()
      }else{
        that.setData({
          msg: res.msg
        })
      
        // that.showPop(res.msg)
      }
    })
  },

  showPop: function (msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false,
      confirmColor: '#FF6B4E',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  showMsg: function () {
    var that=this;
    wx.showModal({
      title: '已申请提现',
      content: '已申请提现，可以在提现记录中查看',
      showCancel:false,
      confirmColor:'#FF6B4E',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.getData();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  jumpRecord:function(){
    wx.navigateTo({
      url: '../withdrawRecord/withdrawRecord'
    })
  } 


})