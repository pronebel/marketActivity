var app = getApp();
Page({
  data: {
    currentId:''
  
  },
  showcode:function(e){
    if (this.data.currentId == e.currentTarget.dataset.id){
      this.setData({
        currentId: ''
      })
    }else{
      this.setData({
        currentId: e.currentTarget.dataset.id
      })
    }
    
   
      console.log(this.data.currentId)
  },
  call:function(e){
    wx.showActionSheet({
      itemList: ['400-900-8011', '呼叫'],
      success: function (res) {
        console.log(res.tapIndex);
        if (res.tapIndex==1){
          wx.makePhoneCall({
            phoneNumber: '400-900-8011' //仅为示例，并非真实的电话号码
          })
        }
        
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })  
  }

})