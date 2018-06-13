var app = getApp()
Page({
  data: {
    type:''
  },
  jump(e){
    console.log(e.currentTarget.dataset.type);
    var typeVal = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../helpCenter_con/helpCenter_con?type=' + typeVal,
    })
  },
  // widthDrawal() {
  //   wx.navigateTo({
  //     url: '../helpOthers/withdrawal/withdrawal',
  //   })
  // },
  // creatTuan() {
  //   wx.navigateTo({
  //     url: '../helpOthers/creactTuan/creactTuan',
  //   })
  // },
  // creatKan() {
  //   wx.navigateTo({
  //     url: '../helpOthers/creactKan/creactKan',
  //   })
  // },

})