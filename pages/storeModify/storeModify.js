var app = getApp();
import ajaxhelper from '../../utils/ajaxhelper.js'
import Create from '../../utils/comment/create.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoNum: 0, //视频个数
    shopNum: 0, //店铺图片
    pullText: '',
    merchantAddres: '',
    replenish: '',
    seviceTel: '',
    latitude: '', // 精度
    longitude: '', // 纬度
    sword: true, //减号
    leave: false,
    picsBox: [],
    viewVideo: '',
  },
  box: {
    pics: [],
    picsBoxs: []
  },
  //
  pullText(e) { this.setData({ pullText: e.detail.value }) },
  merchantAddres(e) { this.setData({ merchantAddres: e.detail.value }) },
  replenish(e) { this.setData({ replenish: e.detail.value }) },
  seviceTel(e) { this.setData({ seviceTel: e.detail.value }) },
  chooseAddre() { // 商家地址选择
    let that = this;
    wx.chooseLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        let nams = res.name
        that.setData({ merchantAddres: nams, latitude: latitude, longitude: longitude })
      }
    })
  },

  addCamera() { //照片上传
    let that = this, pics = this.box.pics, theNum = 6 - this.data.picsBox.length * 1;
    wx.chooseImage({
      count: theNum, // 可传图片张数
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var imgsrc = res.tempFilePaths;
        pics = pics.concat(imgsrc);
        that.uploadimg({
          url: app.globalData.frontJSHost + 'uploadImageFiles',
          path: pics
        });
      }
    })
  },
  //多张图片上传
  uploadimg(data) {
    var that = this, pics = that.data.picsBox,
      i = data.i ? data.i : 0,
      success = data.success ? data.success : 0,
      fail = data.fail ? data.fail : 0;
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'files',//这里根据自己的实际情况改
      success: (resp) => {
        success++;
        let states = JSON.parse(resp.data)
        if (states.status) {
          that.setData({picsBox: that.data.picsBox.concat(states.data[0].url)})
          that.setData({shopNum: that.data.picsBox.length})
          that.data.picsBox.length > 0 && that.setData({ sword: false })
          that.data.picsBox.length == 6 && that.setData({ leave: true })
        }
      },
      fail: (res) => {
        fail++;

      },
      complete: () => {
        i++;
        that.box.pics = []
        if (i == data.path.length) {   //当图片传完时，停止调用          
        } else {//若图片还没有传完，则继续调用函数
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }

      }
    });
  },

  swordCamera(){
    let r = this.data.picsBox;
    // this.arrayMandas.picsBoxs.splice(this.arrayMandas.picsBoxs.length - 1, 1)
    r.splice(r.length - 1, 1);
    this.setData({picsBox: r, shopNum: r.length})
    if (this.data.picsBox.length < 6) {
      this.setData({leave: false})
    }
    if (this.data.picsBox.length <= 0) {
      this.setData({sword: true})
    }
  },

  goodsUp() {
    var that = this
    that.setData({ succed: true })
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        console.log(res)
        that.upVideo(res)
      }
    })
  },
  upVideo(res) {
    var tempFilePaths = res.tempFilePath, that = this
    console.log(tempFilePaths)
    wx.showLoading({ title: '加载中',mask: true })
    wx.uploadFile({
      url: app.globalData.frontJSHost + 'uploadMusicFiles', //仅为示例，非真实的接口地址
      filePath: res.tempFilePath,
      name: 'files',
      success: function (res) {
        console.log(res)
        let data = res, trd = JSON.parse(data.data)
        console.log(trd)
        if(trd.bizCode == 200 ){
          that.setData({ viewVideo: trd.data[0].url, succed: true })
          wx.showToast({
            title: '上传成功',
          })
          wx.hideLoading()
        }
      },
      fail: function (r) {
        that.setData({ succed: false })
        wx.hideLoading()
      }
    })
  },

  storeSave(){
    let mandnames = ''
    this.data.picsBox.map((item)=>{
      mandnames = mandnames + item + ','
    })
    let param = {
      shop: {
        name: this.data.pullText,
        mobile: this.data.seviceTel,
        latLongAddress: this.data.merchantAddres,
        address: this.data.replenish,
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        picMain: mandnames,
        videoUrl: this.data.viewVideo
      }
    }
    console.log(param)
    ajaxhelper.post(app.globalData.frontJSHost + 'shop/updateShop', param, this, this.storeTem)
  },
  storeTem(res) {
    console.log(res)
    if(res.bizCode == 200){
      wx.setStorage({
        key: 'member',
        data: res.data.member,
      })
      wx.setStorage({
        key: 'shop',
        data: res.data.shop,
      })
      wx.redirectTo({
        url: '../homeCenter/homeCenter',
      })
    }
  },
  //


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let storeInfor = wx.getStorageSync('shop')
    if (storeInfor){
      let r = [], videos = ''
      if (storeInfor.picMain) { 
        r = storeInfor.picMain.split(','); r.pop()
        if(r.length > 0){ this.setData({ sword: false }) }
        if (r.length >= 6) { this.setData({ leave: true }) }
      }

      if (storeInfor.videoUrl) { videos = storeInfor.videoUrl; this.setData({ succed: true }) } else { this.setData({ succed: true }) }
      this.setData({
        pullText: storeInfor.name,
        merchantAddres: storeInfor.latLongAddress,
        replenish: storeInfor.address,
        seviceTel: storeInfor.mobile,
        latitude: storeInfor.latitude, // 精度
        longitude: storeInfor.longitude, // 纬度 
        picsBox: r,
        shopNum: r.length,
        viewVideo: videos
      })
    }else{

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