var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // url: '../creactActivity/creactActivity?activityType=' + p
    typeValue: '', //类型值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let ap = wx.getStorageSync('types')
    this.setData({ typeValue: ap })
  },
  jumpFilter() {
    let that = this
    let heide = [
      { typea: 'ASSISTANCE_MONEY', routing: 'giveLikea' },
      { typea: 'ASSISTANCE', routing: 'giveLike' },
      { typea: 'FREEBUY', routing: 'zeroPurchase' },
      { typea: 'ONEYUANBUY', routing: 'onePurchase' },
      { typea: 'NYUANBUY', routing: 'nPurchase' },
      { typea: 'TUAN', routing: 'creactActivity' },
      { typea: 'BARGAIN', routing: 'creactActivity' },
      { typea: 'SECKILL', routing: 'secondsKill' },
      { typea: 'LOTTERY', routing: 'luckyDraw' },
      { typea: 'QUAN', routing: 'coupon' },
      { typea: 'BIGPACKAGE', routing: 'bigPage' },
      { typea: 'FREEPRODUCT', routing: 'freePage' },
      { typea: 'ASSISTANCE_DISCOUNT', routing: 'giveDiscount' },
      { typea: 'MEETING', routing: 'meeting' }
    ]
    for(let i=0; i< heide.length; i++){
      if (heide[i].typea == that.data.typeValue) { return heide[i].routing } 
    }
  },
  
  through() {
    let routes = this.jumpFilter()
    if (routes == 'creactActivity'){
      wx.redirectTo({
        url: '../creactActivity/creactActivity?activityType=' + this.data.typeValue,
      })
    } else {
      wx.redirectTo({
        url: '../varietyActivity/' + routes + '/' + routes + '?activityType=' + this.data.typeValue,
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