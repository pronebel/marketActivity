var app = getApp()
import ajaxhelper from '../../utils/ajaxhelper.js';
import checkLogin from '../../utils/checkLogin.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personalInfor: '', //个人信息
    headerPhoto: '../../images/mo-header.png', //头像
    weChatName: '', //名字
    endtimes: '', //过期时间
    childNo: true, //子账号提示
    Mymobile: '',
    vips: false
  },

  getMineInfor() {
    let param = {}
    ajaxhelper.get(app.globalData.frontJSHost + 'member/select', param, this, this.thatMineInfor)
  },

  thatMineInfor(states) {
    if (states.bizCode) {
      this.setData({ personalInfor: states.data.shop })
      if (states.data.shop.mobile && states.data.shop.address) {
        this.setData({ perfect: true })
        wx.setStorage({
          key: 'shop',
          data: states.data.shop,
        })
      }
    }
  },

  helpCemter() {//帮助中心
    wx.navigateTo({
      url: '../helpCenter/helpCenter',
    })
  },
  canMine() { //联系我们
    wx.navigateTo({
      url: '../contactUs/contactUs',
    })
  },
  drawCash() { //资金提现
    wx.navigateTo({
      url: '../withdrawCash/withdrawCash',
    })
  },
  storeSet() {
    wx.navigateTo({
      url: '../storeModify/storeModify',
    })
  },
  smallShop() { //微店秀
    wx.navigateTo({
      url: '../storeShow/storeShow',
    })
  },
  subAccount() { //子账号
    var member = wx.getStorageSync('member');
    var parentId = member.parentId;
    if (parentId == null || parentId == 0) {
      let param = {
      }
      ajaxhelper.get(app.globalData.frontJSHost + 'member/countShopSon', param, this, function (res) {
        if (res.data) {
          console.log(res.status);
          wx.navigateTo({
            url: '../subAccount/subAccount_List/subAccount_List',
          })
        } else {
          wx.navigateTo({
            url: '../subAccount/subAccount_enter/subAccount_enter',
          })
        }
      })

    } else {
      wx.navigateTo({
        url: '../subAccount/scan_success/scan_success',
      })
    }

  },
  cancalOut() {
    wx.scanCode({
      success: (res) => {
        wx.navigateTo({
          url: '../verification/verification?code=' + res.result,
        })
      }
    })
  },
  creactOut() {
    wx.navigateTo({
      url: '../workList/workList',
    })
  },

  activityOut() {
    let shop = wx.getStorageSync('shop')
    wx.navigateTo({
      url: '../administerList/administerList',
    })
  },

  sellPro(e) {
    let vips = false
    wx.navigateTo({
      url: '../MembersToBuy/MembersToBuy?vip=' + vips
    })
  },

  dueTo() {
    let param = {}
    ajaxhelper.get(app.globalData.frontJSHost + 'shop/info', param, this, function (res) {
      if (res.bizCode == 200) {
        if (res.data.vip) {
          this.setData({ endtimes: app.toDate(res.data.validDate), vips: true })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 检查有没有登录，第二个参数是回调函数 第一个参数为token  第二个为member对象
    checkLogin.login(this, function (param, param2, param3) {
      if (param3.parentId == 0 || param3.parentId == null || param3.parentId == '') { this.setData({ childNo: false }) }
      var gg = wx.getStorageSync('getUserInfo')
      console.log(param3)
      this.setData({ headerPhoto: gg.avatarUrl, weChatName: gg.nickName, Mymobile: param3.mobile, personalInfor: param2, endtimes: app.toDate(param2.endDate) })
      // this.dueTo()
      let token = wx.getStorageSync('Token_date')
      if (token.Token) { this.dueTo() }
    })
    
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
  onShareAppMessage: function () { }
})