var app = getApp();
Page({
  data: {
    currentId: '',
    msg: ""

  },
  addson:function(){
    wx.redirectTo({
      url: '../subAccount_List/subAccount_List'
    })
  },
  becomeson:function(){
    wx.redirectTo({
      url: '../becomeSub/becomeSub'
    })
  }

})