var app = getApp()

import ajaxhelper from '../../utils/ajaxhelper.js'
import Create from '../../utils/comment/create.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageSize: 10,
    pageNo: 1,
    workList: [],
    // activityType: ''
    postersmen: true, // 模态框
    imgActivity: '', //活动图片展示
    actiName: '',
    hasAacat: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDataList();
  },
  getDataList: function() {
    let param = {
      pageSize: 10,
      pageNo: this.data.pageNo,
    }
    ajaxhelper.post(app.globalData.frontJSHost + 'activityTemplate/queryPage', param, this, this.setListData)
  },
  setListData(res){
    let Data = res.data, that = this, pageNo = this.data.pageNo;
    if(Data && Data.result){
      this.setData({ workList: this.data.workList.concat(Data.result), pageNo: ++pageNo, hasAacat: false });
    }
  },
  goMaking(event) {
    var p = event.currentTarget.dataset.type, t = event.currentTarget.dataset.pictwo, n = event.currentTarget.dataset.name;
    wx.setStorage({ key: 'types', data: p })
    wx.setStorage({ key: 'pictwo', data: t })
    wx.setStorage({ key: 'names', data: n })
    let member = wx.getStorageSync('member')
    if (member.parentId == null || member.parentId == 0 || member.role == 'SHOPKEPPER'){
      this.LeoLeo()
    }else {
      Create.prompt('您暂无创建活动权限')
    }
  },

  LeoLeo() {
    let shop = wx.getStorageSync('shop')
    wx.redirectTo({
      url: '../creactPrompt/creactPrompt',
    })
  },

  lookActivity(event) { //查看活动图片
    let img = event.currentTarget.dataset.img
    var p = event.currentTarget.dataset.type, o = event.currentTarget.dataset.picone, t = event.currentTarget.dataset.pictwo, n = event.currentTarget.dataset.name;
    wx.setStorage({ key: 'types', data: p })
    wx.setStorage({ key: 'picone', data: o })
    wx.setStorage({ key: 'pictwo', data: t })
    wx.setStorage({ key: 'names', data: n })
    this.setData({
      imgActivity: img,
      actiName: n,
      postersmen: false
    })
  },
  playGoMaking(){
    this.LeoLeo()
    this.setData({ postersmen: true })
  },
  close() { //弹框关闭
    this.setData({ postersmen: true })
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
    if (this.data.hasAacat) return false
    this.setData({ workList: [], pageNo: 1 })
    this.getDataList();
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 1400);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasAacat) return false
    this.getDataList();
  }
})