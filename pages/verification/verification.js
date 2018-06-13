var app = getApp();

import ajaxhelper from '../../utils/ajaxhelper.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    apiCode: '', // 扫码返回code
    sweepInfor: '', //数据
    verificationTime:'',
    headerCode: '扫码成功',
    clickNot: true,
    sweepMoney: '',
    havePay: '',
    actClass: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.code);
    this.setData({ apiCode: options.code })
    this.verification()
  },
  verification () {
    let linkCode = this.data.apiCode
    console.log(linkCode);
    let param = { qrCode: linkCode }
    ajaxhelper.get(app.globalData.frontJSHost + '/verification/toVerification', param, this, this.verificationInfor)
  },
  jumpFilter(atype) {
    let that = this
    let heide = [
      { typea: 'ASSISTANCE_MONEY', routing: '集赞赢现金' },
      { typea: 'ASSISTANCE', routing: '集赞赢礼品' },
      { typea: 'FREEBUY', routing: '零元购' },
      { typea: 'ONEYUANBUY', routing: '一元购' },
      { typea: 'NYUANBUY', routing: 'N元购' },
      { typea: 'OPEN_TUAN', routing: '拼团' },
      { typea: 'JOIN_TUAN', routing: '拼团' },
      { typea: 'OPEN_BARGAIN', routing: '砍价' },
      { typea: 'OPEN_SECKILL', routing: '限时秒杀' },
      { typea: 'LUCK_DRAW', routing: '抽奖' },
      { typea: 'QUAN', routing: '优惠劵' },
      { typea: 'BIGPACKAGE', routing: '大礼包' },
      { typea: 'FREEPRODUCT', routing: '免费领礼品' },
      { typea: 'N_GIFT', routing: 'N元礼品卡' },
      { typea: 'OPEN_TIMEDISCOUNT', routing: '限时购' },
      { typea: 'MEETING', routing: '会议' }
    ]
    for (let i = 0; i < heide.length; i++) {
      if (heide[i].typea == atype) { return heide[i].routing }
    }
  },
  verificationInfor (states) {
    console.log(states);
    if (states.bizCode == 200) {
      let verificationTime = states.data.verificationTime;
      verificationTime == null ? verificationTime = '' : verificationTime=this.toDate(verificationTime);
      console.log(verificationTime)
      let datas = states.data, num;
      datas.originPrice == null ? '' : num = datas.originPrice * 1 / 100
      let paidPrice = (states.data.paidPrice * 1 / 100).toFixed(2);
      let prize = (states.data.originPrice - states.data.paidPrice) / 100, actClass = this.jumpFilter(datas.type)

      this.setData({ verificationTime: verificationTime, sweepInfor: datas, actClass: actClass, sweepMoney: num.toFixed(2), paidPrice: prize, havePay: states.data.paidPrice / 100 })
      
      if (states.data.hasVerification){//已核销
        this.setData({clickNot: false, headerCode: '已核销过'})
        console.log(this.data.headerCode)
      }
      
    }else{
      wx.showToast({
        title: states.msg,
        icon: 'loading',
        duration: 10000
      }) 
      this.setData({ clickNot: false, headerCode: '核销失败' })
    }
  },
  
  canCation () {
    let that = this
    let linkCode = this.data.apiCode
    let param = { qrCode: linkCode }
    ajaxhelper.get(app.globalData.frontJSHost + '/verification/doVerification', param, this, this.doVerificationInfors)
  },
  doVerificationInfors (states) {
    console.log(states);
    if (states.bizCode == 200) {
      wx.showModal({
        title: '核销成功',
        showCancel: false,
        confirmColor: '#FF6B4E',
        content: '核销成功了，历史记录可以在活动报名记录中查看',
        success: function (res) {
          if (res.confirm) {
            console.log('你好核销成功')
            wx.navigateBack({
              delta: 1
            })
            // wx.redirectTo({
            //   url: '../homeCenter/homeCenter',
            // })
          }
        }
      })
    } else if(states.bizCode == 500){
      this.setData({ headerCode: '该订单已核销' })
    }
  },
  toDate(number) {
    let n = number;
    let date = new Date(n);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return (Y + M + D)
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
      checkLogin.login(this, function (res) {
        this.setData({ apiCode: options.code })
        this.verification()
      })
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  }

})