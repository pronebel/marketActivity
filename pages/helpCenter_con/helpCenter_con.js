var app = getApp();
Page({
  data: {
    type: ''

  },
  onLoad:function(e){
    console.log(e.type);
    this.setData({
      type: e.type
    })
  },
  showcode: function (e) {
    if (this.data.currentId == e.currentTarget.dataset.id) {
      this.setData({
        currentId: ''
      })
    } else {
      this.setData({
        currentId: e.currentTarget.dataset.id
      })
    }


    console.log(this.data.currentId)
  },
  returnButton:function(){
    wx.navigateTo({
      url: '../helpCenter/helpCenter',
    })
  }

})