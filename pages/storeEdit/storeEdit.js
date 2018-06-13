// pages/storeEdit/storeEdit.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // isShow : true,
    // placeholder : '请输入文字',
    // canvasId: 'myCanvas',
    // jsonData: {
    //   two: '日式浮世绘海浪纹陶瓷盘',
    //   three: '有时候，内心只是渴望平平静静，温柔古朴的海浪纹线条，温柔古朴的颜色，搭配可口的美食，抚慰一颗孤独的心。瓷感很好，很厚实很日常的一款。',
    //   nowPrice: '99.00',
    //   defaultPrice: '129.00',
    //   value: '',
    // },
    id: '',        //后端需要的ID
    tabIndex: '',  //第几个tab项
    imgId: '',     //每个tab项第几张图
    re_type: ''  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let shopInfor = wx.getStorageSync('shop');
    console.log(shopInfor)
    this.setData({
      id: shopInfor.id,
      imgId: options.id,
      re_type: options.tabIndex === '0' ? 'shop' : 'product'   //区分路由是shop还是product
    })
   
    // wx.showLoading({
    //   title: '请稍等',
    //   mask: true
    // })
    var id = that.data.id;
    var imgId = that.data.imgId;
    var re_type2 = that.data.re_type;
    var red_url = app.globalData.frontJSHost +'redirect/'+ re_type2 + "/" + imgId + "?id=" + id;
    console.log(red_url)
    that.setData({
      red_url: red_url
    })
  },
  bindDialog(e) {
    // let target = e.currentTarget.dataset;
    // let jsonData = this.data.jsonData;
    // let text = target.word;
    // let id = target.id;
    // jsonData.value = text;
    // this.setData({ 
    //   jsonData: jsonData,
    //   isShow: false,
    //   currentId:id,
    // })
  },
  // showPic(e){
  //   var ajaxData = this.data.jsonData;
  //   delete ajaxData.value;
  //   // wx.showLoading({
  //   //   title: '正在生成图片',
  //   //   mask: true,
  //   // })
  //  // this.drawImage(ajaxData);
  //   // this.generateWishesImage().then((res) => {
  //   //   wx.hideLoading()
  //   // }).catch(err => {
  //   //   console.log(err)
  //   //   wx.hideLoading()
  //   // })
  //   // wx.canvasToTempFilePath({
  //   //   x: 100,
  //   //   y: 200,
  //   //   width: 50,
  //   //   height: 50,
  //   //   destWidth: 100,
  //   //   destHeight: 100,
  //   //   canvasId: 'myCanvas',
  //   //   success: function (res) {
  //   //     console.log(res)
  //   //     console.log(res.tempFilePath)
  //   //   }
  //   // },this)
  // },
  drawImage(data){
    //const context = wx.createCanvasContext();
    // context.drawImage('../../images/kan3.png', 0, 0, 300, 350);
    // context.setFontSize(18)
    // context.setFillStyle('#000000')
    // context.fillText(data.two, 20, 370,250)

    // context.setFontSize(11)
    // context.setFillStyle('#666666')
    // context.fillText(data.three, 20, 400,250)

    // context.setFontSize(16)
    // context.setFillStyle('#000000')
    // context.fillText(data.nowPrice, 20, 450,250)

    // wx.drawCanvas({
    //   canvasId: 'myCanvas',
    //   actions: context.getActions()
    // })
  },
  // generateWishesImage(e){},
  changeTextarea(e){
    // let newVal = e.detail.value;
    // let jsonData = this.data.jsonData;
    // jsonData.value = newVal;
    //   this.setData({
    //     jsonData: jsonData
    //   })
  },
  btn_confirm(e){
    // let jsonData = this.data.jsonData;
    // let newVal = jsonData.value;
    // if (newVal){
    //   let id = this.data.currentId;
    //   jsonData[id] = newVal
    // }
    // this.setData({
    //   isShow: true,
    //   jsonData: jsonData,
    // })
  },
  btn_cancel(e){
    // this.setData({
    //   isShow: true
    // })
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