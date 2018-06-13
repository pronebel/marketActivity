var app = getApp()
Page({
  data: {
    flag: 'showMe'
  },
  onLoad: function (options) {

  },
  makeIt:function(){
    console.log('a');
  },
  myfocus:function(){
    this.setData({
      flag: 'hideMe'
    })
   
  },
  myblur:function(){
    console.log('s')
    this.setData({
      flag: 'showMe'
    })
  }

})