var app = getApp()

import ajaxhelper from '../../utils/ajaxhelper.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,// tar切换
    consents: false, //协议状态
    packageInfor: '', //套餐信息
    inforBox: true, //信息填写
    merchantAddres: '', //获取地理位置地址
    latitude: '', //经度
    longitude: '', // 纬度
    merchatName: '', //商家名称
    telPhone: '', //电话号码
    addAddress: '', //补充地址
    waner: '', // 是否可以提交  填写了信息或者本地缓存里面有信息
    cationCode: '', //验证码
    realPay: '', //实付金额
    thatContents: '', //套餐文本
    heiId: '', //购买id
    shortMessage: '获取验证码', //短信息
    short: true,
    ticket: "", // 短信附加信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // this.setData({ inforBox: vpid })
    this.getPackage()

    let shop = wx.getStorageSync('shop')
    // if(shop.mobile) {
    //   this.setData({ inforBox: true, waner: true })
    // } else {
    //   this.setData({ waner: false, inforBox: false })
    // }
  },

  // 
  merchatName(e) { this.setData({ merchatName: e.detail.value }) },
  merchantAddres(e) { this.setData({ merchantAddres: e.detail.value }) },
  telPhone(e) { this.setData({ telPhone: e.detail.value }) },
  addAddress(e) { this.setData({ addAddress: e.detail.value }) },
  cationCode(e) { this.setData({ cationCode: e.detail.value}) },
  // 
  close() { //弹框关闭
    this.setData({ inforBox: true })
  },

  uoOpen() { // 立刻购买
    var that = this
    if(that.data.consents){  // 协议
      // if(that.data.waner) { // 是否填写商铺信息
        let param = {}
        ajaxhelper.get(app.globalData.frontJSHost + '/combo/buy/' + that.data.heiId, param, that, function (res) {
          if (res.bizCode == 200) {
            if (res.data && !res.data.params.hasOwnProperty('errorCode')) {
              var payData = res.data.params;
              let nonceStr = payData.nonceStr;
              let timeStamp = payData.timeStamp;
              let packageValue = payData.package;
              let signPay = payData.signType;
              let paySign = payData.paySign;
              wx.requestPayment({
                timeStamp: timeStamp,
                nonceStr: nonceStr,
                package: packageValue,
                signType: signPay,
                paySign: paySign,
                success: function (res) {
                  console.log(res)
                  wx.redirectTo({
                    url: '../homeCenter/homeCenter',
                  })
                },
                fail: function (res) {
                  that.setData({
                    isChecked: false,
                    text: '支付'
                  })
                  wx.showModal({
                    title: '支付失败',
                    content: '',
                    showCancel: false,
                    confirmText: '确定',
                    confirmColor: '#FF4612',
                    success: function (res) {

                    }
                  })
                }
              })
            } else {
              wx.showToast({
                title: !!res.data.data.params.errorCodeDesc ? res.data.data.params.errorCodeDesc : "订单出错",
                icon: "loading"
              })
            }
          } else {
            wx.showModal({
              title: '购买失败',
              content: res.msg,
              showCancel: false,
              confirmColor: '#FF6B4E',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
          }
        })
      // }else {
        // this.setData({ inforBox: false })
      // }    
    }else {
      wx.showModal({
        title: '提示',
        content: '请同意协议',
        showCancel: false,
        confirmColor: '#FF6B4E',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
  },

  aselect(res) {
    console.log(res); 
  },

  addTrue() { //填写商铺信息
    let param = {
      shop:{
        "name": this.data.merchatName,
        "mobile": this.data.telPhone,
        "latitude": this.data.latitude,
        "longitude": this.data.longitude,
        "latLongAddress": this.data.merchantAddres,
        "address": this.data.addAddress,
        'id': wx.getStorageSync('shop').id,
        'cationCode': this.data.cationCode,
        'ticket': this.data.ticket
      }
    }
    console.log(param)
    if (this.data.merchatName != '' && this.data.telPhone != '' && this.data.merchantAddres != '' && this.data.cationCode && this.data.ticket){
      if(this.data.telPhone.length == 11 ){
        ajaxhelper.put(app.globalData.frontJSHost + 'shop/update', param, this, this.addTrueSuccess)
      }else {
        wx.showToast({
          title: '请正确填写的手机号',
          image: '../../images/tishi.png'
        })
      }  
    }else{
      wx.showToast({
        title: '请正确填写',
        image: '../../images/tishi.png'
      })
    }    
  },
  addTrueSuccess(res){
      if(res.bizCode==200){
        wx.setStorage({
            key: 'shop',
            data: res.data
        })
        // this.setData({ inforBox: true, waner: true })
      }
  },


  chooseAddre() { //地理位置获取
    let that = this;
    wx.chooseLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        let nams = res.name
        that.setData({ merchantAddres: nams, latitude: latitude, longitude: longitude })
        console.log(that.data.merchantAddres);
      }
    })
  },

  getPackage() {
    let param = {}
    ajaxhelper.post(app.globalData.frontJSHost + 'combo/selectList', param, this, this.downLineHi)
  },

  downLineHi(states){ // 获取套餐信息
    if (states.bizCode == 200){
      states.data[0]
      this.setData({
        packageInfor: states.data,
        thatContents: (states.data)[0].details,
        realPay: (states.data)[0].combo.price,
        heiId: (states.data)[0].combo.id
      })
    }
  },

  clickTar(e) { //切换
    let thos = e.currentTarget.dataset.index, i = e.currentTarget.dataset.i
    if (this.data.currentTab == i) {
      return false;
    } else {
      this.setData({
        currentTab: i,
        thatContents: this.data.packageInfor[i].details,
        realPay: this.data.packageInfor[i].combo.price,
        heiId: thos
      })
    }
  },

  agreement() { //同意切换
    let a = this.data.consents
    let b = !a
    this.setData({
      consents: b
    })
  },
  quanp : {timer: 1},
  getVerifCode() { //获取短信验证码
    let telPhone = this.data.telPhone
    var that = this
    wx.request({
      url: app.globalData.frontJSHost + 'sms/'+telPhone, //仅为示例，并非真实的接口地址
      method: 'GET',
      success: function (res) {
        if(res.data.bizCode == 200){
          that.setData({ ticket: res.data.data.data.smsUuid })
        }
      }
    })
  },
  getVerificationCode: function () {
    if (this.data.telPhone){
      if (this.quanp.timer == 1) {
        this.quanp.timer = 0
        var that = this
        var time = 60
        that.getVerifCode()
        var inter = setInterval(function () {
          that.setData({
            shortMessage: time + "s",
            short: false,
          })
          time--
          if (time < 0) {
            that.quanp.timer = 1
            clearInterval(inter)
            that.setData({
              short: true,
              shortMessage: "获取验证码",
            })
          }
        }, 1000)
      }
    }else {
      wx.showToast({
        title: '请正确填写手机号',
        image: '../../images/tishi.png'
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },
})