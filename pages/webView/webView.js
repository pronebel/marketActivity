// pages/webView/webView.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ''
  },
  jumpFilte(typed) {// 活动类型名称
    let that = this
    let heide = [
      { typea: 'ASSISTANCE_MONEY', routing: '助力赢现金' },
      { typea: 'ASSISTANCE', routing: '集赞赢礼品' },
      { typea: 'FREEBUY', routing: '0元购' },
      { typea: 'ONEYUANBUY', routing: '1元购' },
      { typea: 'NYUANBUY', routing: 'N元购' },
      { typea: 'TUAN', routing: '拼团' },
      { typea: 'BARGAIN', routing: '砍价' },
      { typea: 'SECKILL', routing: '显示秒杀' },
      { typea: 'LOTTERY', routing: '抽奖' },
      { typea: 'QUAN', routing: '优惠劵' },
      { typea: 'BIGPACKAGE', routing: '大礼包' },
      { typea: 'FREEPRODUCT', routing: '免费领礼品' },
      { typea: 'ASSISTANCE_DISCOUNT', routing: '助力享折扣' }
    ]
    for (let i = 0; i < heide.length; i++) {
      if (heide[i].typea == typed) { return heide[i].routing }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var informs = wx.getStorageSync('informs').currentTarget.dataset.imglink
    console.log(informs)
    let typeName = this.jumpFilte(informs.actType);

    this.setData({
      url: 'https://m2.chuangchuang.cn/cc-knowledge-web/huodongPoster?mainPic=' + informs.mainPic + '&headerLogo=' + informs.headerLogo + '&weixinName=' + informs.weixinName + '&actType=' + typeName + '&title=' + informs.title + '&posterUrl=' + informs.posterUrl
      })
    console.log(this.data.url)
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})