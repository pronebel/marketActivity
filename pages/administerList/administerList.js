var app = getApp()

import ajaxhelper from '../../utils/ajaxhelper.js';
import Create from '../../utils/comment/create.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adminDatas: [], //列表数据
    shows: true, //测试
    pageNo: 1, //页码
    statusType: null, //活动状态
    manScreen: 1, //状态选中
    whichType: null, //活动类型
    menType: 1, //类型选中
    moreBtn: false,
    littleTip: false, //小提示标签
    idx:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAdminList();
  },
  tipClose(){
    this.setData({ littleTip: true })
  },
  openMore(){ //活动管理更多
    let b = this.data.moreBtn
    this.setData({ moreBtn: !b })
  },
  seePosters(tar){ // 点击查看
    /*wx.setStorage({ key: 'informs', data: tar  })
    wx.redirectTo({
      url: '../webView/webView',
    })*/
    console.log(tar)
    // wx.previewImage({
    //   current: tar.currentTarget.dataset.imglink, // 当前显示图片的http链接
    //   urls: [tar.currentTarget.dataset.imglink] // 需要预览的图片http链接列表
    // })
    //跳转H5
    let qrcode = tar.currentTarget.dataset.imglink;
    let mainPic = tar.currentTarget.dataset.mainpic;
    let title = tar.currentTarget.dataset.title;
    wx.redirectTo({
      url: '../jumpPoster/jumpPoster?qrcode=' + qrcode + '&mainPic=' + mainPic + '&title=' + title,
    })
  },
  imgLinkDraw(tar) { //保存图片
    wx.downloadFile({
      url: tar.currentTarget.dataset.imglink, //
      success: function (res) {
        let tempFilePath = res.tempFilePath
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功',
              duration: 2000
            })
          }
        })
      }
    })
  },
  adminReplication (e) {  // 复制功能
    wx.setClipboardData({
      data: e.currentTarget.dataset.links,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },

  downline (e) { //下线
    let mineId = e.currentTarget.dataset.id, mineLine = e.currentTarget.dataset.line
    let param = { activityId: mineId}, that = this
    let member = wx.getStorageSync('member');
    if (member.parentId == null || member.parentId == 0 || member.role == 'SHOPKEPPER') {
        if (mineLine == 'EXPIRED') {
          ajaxhelper.get(app.globalData.frontJSHost + 'activityBase/offline', param, that, that.downLineHi)
        } else {
          wx.showModal({
            title: '确定执行下线？',
            content: '下线后，进行中的活动将不可访问。',
            confirmColor: '#FF6B4E',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                ajaxhelper.get(app.globalData.frontJSHost + 'activityBase/offline', param, that, that.downLineHi)
              } else if (res.cancel) {
                // console.log('用户点击取消')
              }
            }
          })
        }
    } else {
      Create.prompt('您暂无上下线活动权限')
    }



    
  },
  downLineHi (states) {
    if(states.bizCode == 500){
      Create.prompt(states.msg)
    } else if (states.bizCode == 200){
      wx.showToast({
        title: '操作成功',
        icon: 'success',
        duration: 2000
      })
      this.setData({ adminDatas: [], pageNo: 1 })
      this.getAdminList()
    }
  },
  deletingMe(e) { // 删除
    let ace = e.currentTarget.dataset.ids, aoe = e.currentTarget.dataset.type, that = this
    let param = {
      id: ace,
      type: aoe
    }



    wx.showModal({
      title: '删除此活动',
      content: '删除后您将看不到任何相关信息',
      confirmColor: '#FF6B4E',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          
          let member = wx.getStorageSync('member')
          if (member.parentId == null || member.parentId == 0 || member.role == 'SHOPKEPPER') {
            ajaxhelper.get(app.globalData.frontJSHost + 'activityBase/delete', param, that, that.deletsucess)
          } else {
            Create.prompt('您暂无删除活动权限')
          }
          
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  deletsucess(res){
    this.setData({ adminDatas: [], pageNo: 1})
    let param = {
      pageSize: 10,
      pageNo: this.data.pageNo,
      actType: this.data.whichType,
      actStatus: this.data.statusType
    }
    if (this.data.statusType == "null") { param.actStatus = null }
    if (this.data.whichType == "null") { param.actType = null }
    ajaxhelper.post(app.globalData.frontJSHost + 'activityBase/queryPage', param, this, this.setAdminList)
  },
  listBtn (e) { //名单 
    let ace = e.currentTarget.dataset.id, aoe = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '../regRecord/regRecord?activityId=' + ace + '&actType=' + aoe
    })
  },
  jumpBf(tt) {
    let that = this
    let heide = [
      { typea: 'ASSISTANCE_MONEY', routing: 'giveLikeaBack' },
      { typea: 'ASSISTANCE', routing: 'giveLikeBack' },
      { typea: 'FREEBUY', routing: 'zeroBack' },
      { typea: 'ONEYUANBUY', routing: 'oneBack' },
      { typea: 'NYUANBUY', routing: 'nBack' },
      { typea: 'TUAN', routing: 'creactActivity' },
      { typea: 'BARGAIN', routing: 'creactActivity' },
      { typea: 'SECKILL', routing: 'secondsKillBack' },
      { typea: 'LOTTERY', routing: 'luckyDrawBack' },
      { typea: 'QUAN', routing: 'couponBack' }, 
      { typea: 'BIGPACKAGE', routing: 'bigPageBack' }, 
      { typea: 'FREEPRODUCT', routing: 'freePageBack' },
      { typea: 'ASSISTANCE_DISCOUNT', routing: 'giveDiscountBack' },
      { typea: 'MEETING', routing: 'meetingBack' }
    ]
    for (let i = 0; i < heide.length; i++) {
      if (heide[i].typea == tt) { return heide[i].routing }
    }
  },
  upEditor (e) { // 编辑
    let id = e.currentTarget.dataset.ids, typet = e.currentTarget.dataset.type
    let routes = this.jumpBf(typet)

    let member = wx.getStorageSync('member')
    if (member.parentId == null || member.parentId == 0 || member.role == 'SHOPKEPPER') {
      if (routes == 'creactActivity') {
        wx.navigateTo({
          url: '../ModifyEditor/ModifyEditor?ids=' + id + '&type=' + typet,
        })
      } else {
        wx.navigateTo({
          url: '../backfill/' + routes + '/' + routes + '?ids=' + id + '&type=' + typet,
        })
      }
    } else {
      Create.prompt('您暂无编辑活动权限')
    }
    
  },
  getAdminList: function () {
    let param = {
      pageSize: 10,
      pageNo: this.data.pageNo,
      actType: this.data.whichType,
      actStatus: this.data.statusType
    }
    if (this.data.whichType == "null") { param.actType = null }
    if (this.data.statusType == "null") { param.actStatus = null }
    ajaxhelper.post(app.globalData.frontJSHost + 'activityBase/queryPage', param, this, this.setAdminList)
  },
  setAdminList (states) {
    let adminData = states,pageNo = this.data.pageNo;
    if(adminData.bizCode == '200'){
      this.setData({ pageNo: ++pageNo })
      if (adminData.data && adminData.data.result){
        adminData.data.result.map((item) => {
          item.isShow = false
        })
        let newArr = this.data.adminDatas.concat(adminData.data.result)
        newArr.map((item) => { 
          let rg = this.jumpFilter(item.activityBase.actType)
          item.activityBase.aSingle = rg
        })
        this.setData({ adminDatas: newArr })
      }
    }
  },
  jumpFilter(atype) {
    let that = this
    let heide = [
      { typea: 'ASSISTANCE_MONEY', routing: { word: '礼', color: 'ritual'} },
      { typea: 'ASSISTANCE', routing: { word: '礼', color: 'ritual' } },
      { typea: 'FREEBUY', routing: { word: '购', color: 'purchase' } },
      { typea: 'ONEYUANBUY', routing: { word: '购', color: 'purchase' } },
      { typea: 'NYUANBUY', routing: { word: '购', color: 'purchase' } },
      { typea: 'TUAN', routing: { word: '团', color: 'group' } },
      { typea: 'BARGAIN', routing: { word: '砍', color: 'cut' } },
      { typea: 'SECKILL', routing: { word: '秒', color: 'seconds' } },
      { typea: 'LOTTERY', routing: { word: '奖', color: 'will' } },
      { typea: 'QUAN', routing: { word: '劵', color: 'securities' } },
      { typea: 'BIGPACKAGE', routing: { word: '礼', color: 'ritual' } },
      { typea: 'FREEPRODUCT', routing: { word: '礼', color: 'ritual' } },
      { typea: 'ASSISTANCE_DISCOUNT', routing: { word: '折', color: 'ritual' } },
      { typea: 'MEETING', routing: { word: '会', color: 'ritual' } }
    ]
    for (let i = 0; i < heide.length; i++) {
      if (heide[i].typea == atype) { return heide[i].routing }
    }
  },
  mineShow (e) {
    let i = e.currentTarget.dataset.index
    let b = this.data.adminDatas[i].isShow
    this.data.adminDatas[i].isShow = !b
    this.setData({ 
      adminDatas: this.data.adminDatas,
      idx:i
    })
  },

  statusSreen(e) { //状态筛选
    this.setData({ adminDatas: [], pageNo: 1, statusType: e.currentTarget.dataset.type, manScreen: e.currentTarget.dataset.index })
    let param = {
      pageSize: 10,
      pageNo: this.data.pageNo,
      actType: this.data.whichType,
      actStatus: this.data.statusType
    }
    if (this.data.statusType == "null") { param.actStatus = null }
    if (this.data.whichType == "null") { param.actType = null }
    ajaxhelper.post(app.globalData.frontJSHost + 'activityBase/queryPage', param, this, this.setAdminList)
  },

  typeSreen(ae){ //活动类型筛选
    this.setData({ adminDatas: [], pageNo: 1, whichType: ae.currentTarget.dataset.type, menType: ae.currentTarget.dataset.index })
    let param = {
      pageSize: 10,
      pageNo: this.data.pageNo,
      actType: this.data.whichType,
      actStatus: this.data.statusType
    }
    if (this.data.whichType == "null") { param.actType = null }
    if (this.data.statusType == "null") { param.actStatus = null }
    ajaxhelper.post(app.globalData.frontJSHost + 'activityBase/queryPage', param, this, this.setAdminList)
  },
  fineSreen(e){
    this.typeSreen(e)
  },
  lowerSreen(e) {
    let b = this.data.moreBtn
    this.setData({ moreBtn: !b })
    this.typeSreen(e)
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
    this.setData({ pageNo: 1, adminDatas: [], whichType: null, statusType: null, menType: 1, manScreen: 1 })
    this.getAdminList()
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 1400);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getAdminList()
  },

})