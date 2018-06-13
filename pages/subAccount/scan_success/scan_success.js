var app = getApp();
Page({
  data: {
    iconSizes: [70],
    iconColor: ['red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'],
    iconType: ['success', 'info', 'warn', 'waiting', 'safe_success', 'safe_warn',
      'success_circle', 'success_no_circle', 'waiting_circle', 'circle', 'download',
      'info_circle', 'cancel', 'search', 'clear'],
    shopName:''
  },
  onLoad: function (options){
   var shop = wx.getStorageSync('shop');
   var name = shop.name;
   this.setData({
     shopName: name
   })
 }

 

})