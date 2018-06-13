var app = getApp()
// pages/storeShow/storeShow.js
Page({
  data: {
    imgUrls: [
      'http://oss-cn-shanghai.aliyuncs.com/cc-image/chuangchuang/cc_other/20180117/20180117_1516182835831.jpg',
      'http://oss-cn-shanghai.aliyuncs.com/cc-image/chuangchuang/cc_other/20180117/20180117_1516182836412.jpg',
      'http://oss-cn-shanghai.aliyuncs.com/cc-image/chuangchuang/cc_other/20180117/20180117_1516182836537.jpg',
      'http://oss-cn-shanghai.aliyuncs.com/cc-image/chuangchuang/cc_other/20180117/20180117_1516182836630.jpg',
      'http://oss-cn-shanghai.aliyuncs.com/cc-image/chuangchuang/cc_other/20180117/20180117_1516182837249.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,

    imgUrls_2: [
      'http://oss-cn-shanghai.aliyuncs.com/cc-image/chuangchuang/cc_other/20180117/20180117_1516182837384.jpg',
      'http://oss-cn-shanghai.aliyuncs.com/cc-image/chuangchuang/cc_other/20180117/20180117_1516182837466.jpg',
      'http://oss-cn-shanghai.aliyuncs.com/cc-image/chuangchuang/cc_other/20180117/20180117_1516182837542.jpg',
      'http://oss-cn-shanghai.aliyuncs.com/cc-image/chuangchuang/cc_other/20180117/20180117_1516182837655.jpg',
      'http://oss-cn-shanghai.aliyuncs.com/cc-image/chuangchuang/cc_other/20180117/20180117_1516182837748.jpg'
    ],
    indicatorDots_2: true,
    autoplay_2: true,
    interval_2: 5000,
    duration_2: 500,
    tabArr : {
      currentTabIndex : 0,
      currentContIndex : 0
    }
  },
  bindTab(e){
    let index = e.target.dataset.id;
    let tabArr = {};
    tabArr.currentTabIndex = index;
    tabArr.currentContIndex = index;
    this.setData({
      tabArr : tabArr
    })
  },
  bindSwiperImg(e){
    let index = e.currentTarget.dataset.index;
    let tabIndex = this.data.tabArr.currentTabIndex;
    wx.navigateTo({
      url: '../storeEdit/storeEdit?id='+(index+1)+'&tabIndex='+tabIndex,
    })
  }
  // bindNormalEvent(e){
  //   this.setData({
  //     bindCurrentEvent: false,
  //     bindNormalEvent: true
  //   })
  // }
})