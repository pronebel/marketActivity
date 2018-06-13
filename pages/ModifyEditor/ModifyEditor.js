var app = getApp();

import ajaxhelper from '../../utils/ajaxhelper.js'
import Create from '../../utils/comment/create.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bounces: true,
    mandaTo: true,
    lookMusic: true,
    pageType: '',
    actId: '', //获取跳转的Id
    getDatas: '', // 承接数据
    activityTypes: true, //状态显示
    fullNot: '', //是否全额支付
    goodsPhoto: '', //商品图片
    picsBox: [], //活动图片
    pics: [], //图片盒子
    photoNum: 0, //活动图片个数
    pullText: '', //活动标题
    upText: '',
    merchantAddres: '', //商家地址
    latitude: '', // 精度
    longitude: '', // 纬度
    replenish: '', //补充地址
    enddate: '', // 结束时间
    seviceTel: '', //服务电话
    merchantName: '', //商品名称
    merchantNum: '', //商品数量
    recommendActivities: false,
    activityIntroduce: '', //活动介绍
    activityRule: '', //活动规则
    yuanprice: '',
    diprice: '',
    underp: '',
    upprice: '',
    tyuanprice: '',
    pinprice: '',
    productImg: '',
    sword: true,
    leave: false,
    showMusic: false,
    isMusic: '背景音乐1',
    idsMusic: 6,
    tuanAct: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ actId: options.ids, pageType: options.type })
    this.getEditorData()
  },


  // 

  merchantAddres(e) { this.setData({ merchantAddres: e.detail.value }) },
  replenish(e) { this.setData({ replenish: e.detail.value }) },
  seviceTel(e) { this.setData({ seviceTel: e.detail.value }) },
  merchantNum(e) { this.setData({ merchantNum: e.detail.value }) },
  activityIntroduce(e) { this.setData({ activityIntroduce: e.detail.value }) },
  activityRule(e) { this.setData({ activityRule: e.detail.value }) },
  merchantName(e) { this.setData({ merchantName: e.detail.value }) },

  bindendDateChange: function (e) {
    this.setData({
      enddate: e.detail.value
    })
  },
  switchTitleChange: function (e) {
    this.setData({ recommendActivities: e.detail.value })
  },

  choiseTles() {
    this.setData({ bounces: false })
    Create.sloganChoose(this, 'BIGPACKAGE')
  },
  radio(e) { this.setData({ upText: e.currentTarget.dataset.text }) },
  titleTrue(e) { // 模态框确定
    this.setData({ bounces: true, pullText: this.data.upText })
  },
  shutDowns() { this.setData({ bounces: true }) },

  // 
  backMuisc(e) { //背景音乐设置
    if (e.detail.value) {
      this.setData({ showMusic: true })
    } else {
      this.setData({ showMusic: false })
    }
  },
  choseMusic(e) {
    let at = this
    Create.choseMusic(e, at)
  },
  trueChoose() { //确定选中
    this.setData({ isMusic: this.arrayMandas.staging, idsMusic: this.arrayMandas.stagingIds, lookMusic: true })
  },
  setMusic() { //打开音乐
    this.setData({ lookMusic: false, currentidx: 0 })
    let param = {
      pageNo: 1,
      pageSize: 10
    }
    ajaxhelper.post(app.globalData.frontJSHost + 'bgm/queryPage', param, this, this.successMusic)
  },
  successMusic(states) {
    Create.successMusic(this, states)
  },
  musicClose() {
    this.setData({ lookMusic: true })
  },
  audition(e) {
    let at = this
    Create.audition(e, at)
  },
  // 
  arrayMandas: { // 组件内全局数组
    arrayManda: [],
    picsBoxs: []
  },

  goodsUp: function () {
    let that = this, success = 0;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: app.globalData.frontJSHost + 'uploadImageFiles', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'files',
          success: function (res) {
            let states = JSON.parse(res.data)
            if (states.status) {
              console.log(states);
              success++
              that.setData({ goodsPhoto: states.data[0].url, goodsPhos: success })
              console.log(success)
            }
          },
          file: function () {
            success = 0
          }
        })
      }
    })
  },

  //
  swordCamera: function () {  //活动图片删除
    let r = this.data.picsBox;
    this.arrayMandas.picsBoxs.splice(this.arrayMandas.picsBoxs.length - 1, 1)
    r.splice(r.length - 1, 1);
    this.setData({
      picsBox: r,
      photoNum: r.length
    })
    if (this.data.picsBox.length < 9) {
      this.setData({
        leave: false
      })
    }
  },

  addCamera() { //照片上传
    let that = this, pics = this.data.picsBox;
    wx.chooseImage({
      count: 9 - pics.length, // 可传图片张数
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var imgsrc = res.tempFilePaths;
        pics = pics.concat(imgsrc);
        that.setData({ pics: pics });

        that.uploadimg({
          url: app.globalData.frontJSHost + 'uploadImageFiles',
          path: that.data.pics
        });
      }
    })
  },

  //多张图片上传
  uploadimg(data) {   
    var that = this, pics = that.data.pics,
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
          console.log(states.data);
          // 将返回的路径push进数组
          that.arrayMandas.picsBoxs = that.arrayMandas.picsBoxs.concat(states.data[0])
          // that.arrayMandas.picsBoxs.push(states.data[0]);
          that.setData({
            picsBox: this.data.picsBox.concat(that.arrayMandas.picsBoxs)
          })
          console.log(that.arrayMandas.picsBoxs);
          that.arrayMandas.picsBoxs = []
          that.setData({ photoNum: that.data.picsBox.length })
          that.data.picsBox.length > 0 && that.setData({ sword: false })
          that.data.picsBox.length >= 9 && that.setData({ leave: true })
        }
        console.log(i);
        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++;
        // console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        // console.log(i);
        i++;
        that.setData({ pics: [] })
        if (i == data.path.length) {   //当图片传完时，停止调用          
          // console.log('执行完毕');
          // console.log('成功：' + success + " 失败：" + fail);
        } else {//若图片还没有传完，则继续调用函数
          // console.log(i);
          data.i = i;
          // data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }

      }
    });
  },


  issue(){ //发布
    let drl = ''
    this.data.picsBox.map((item) => {
      item.url
      drl = drl + item.url + ','
    })
    let resBgm = 0
    this.data.showMusic && (resBgm = 1)
    var timestampend = Date.parse(new Date(this.data.enddate)), timestampstart = Date.parse(new Date(this.data.startdate));
    let postData = {
      'activityBase': {
        'id': this.data.actId,
        'actPics': drl,
        'mainPic': this.data.goodsPhoto,
        'actType': this.data.pageType,
        'title': this.data.pullText,
        'endDate': timestampend,
        'startDate': timestampstart,
        'latLongAddress': this.data.merchantAddres,
        'recommendActivities': this.data.recommendActivities,
        'latitude': this.data.latitude, // 精度
        'longitude': this.data.longitude, // 纬度
        'address': this.data.replenish, // 补充地址
        'mobile': this.data.seviceTel, // 服务电话
        'description': this.data.activityIntroduce, // 活动介绍
        'rule': this.data.activityRule, // 活动规则
        'templateType': '', // 模板类型
        'hasBgm': resBgm,
        'bgmId': this.data.idsMusic
      },
      'tuanAct': {
        'productName': this.data.merchantName,
        'productPics': this.data.goodsPhoto,
        'remainStockCount': this.data.merchantNum*1, //商品数量
        // 'tuanSize': this.data.speltNum,
        // 'tuanPrice': this.data.speltPrice,
      },
      "bargainAct": {
        "remainStockCount": this.data.merchantNum*1,
        // "productUnit": "",
        "productName": this.data.merchantName,
        "productImg": this.data.goodsPhoto,
      }
    };
    let okay = Create.timeCheck(this.data.startdate, this.data.enddate);
    if (okay){
      if (this.data.pageType == 'TUAN'){
        if (this.data.merchantNum * 1 > (this.data.getDatas.tuanAct.tuanSize * this.data.getDatas.tuanAct.maxEveryoneBuyCount * 1)){
          ajaxhelper.post(app.globalData.frontJSHost + 'activityBase/update', postData, this, this.pushUp)
        }else {
          Create.prompt('拼团人数×限购数量＜商品数量')
        }
      }else {
        ajaxhelper.post(app.globalData.frontJSHost + 'activityBase/update', postData, this, this.pushUp)
      }
    }
  },
  pushUp (es){ 
    wx.navigateTo({
      url: '../administerList/administerList',
    })
  },


  getEditorData() {
    // let index = this.data.actId
    let param = {
      id: this.data.actId
    }
    ajaxhelper.get(app.globalData.frontJSHost + 'activityBase/toUpdate', param, this, this.setEditor)
  },
  setEditor (states) {  //数据成功回调
    console.log(states)
    let modify = states,ro=''
    if(modify.bizCode == 200) {
      modify.data.activityBase.startDate = this.toDate(modify.data.activityBase.startDate)
      if (modify.data.activityBase.actType == "TUAN"){
        modify.data.tuanAct.allOrPart == 1 ? ro = true : ro = false
        this.setData({
          goodsPhoto: modify.data.activityBase.mainPic,
          merchantName: modify.data.tuanAct.productName,
          merchantNum: modify.data.tuanAct.remainStockCount,
          tyuanprice: (modify.data.tuanAct.originPrice/100).toFixed(2),
          pinprice: (modify.data.tuanAct.tuanPrice / 100).toFixed(2),
          tuanAct: modify.data.tuanAct
        })
        
      } else if (modify.data.activityBase.actType == "BARGAIN"){
        this.setData({
          goodsPhoto: modify.data.activityBase.mainPic,
          merchantName: modify.data.bargainAct.productName,
          merchantNum: modify.data.bargainAct.remainStockCount,
          yuanprice: (modify.data.bargainAct.originPrice/100).toFixed(2),
          diprice: (modify.data.bargainAct.cutMinPrice/100).toFixed(2),
          underp: (modify.data.bargainAct.minEveryCut / 100).toFixed(2),
          upprice: (modify.data.bargainAct.maxEveryCut / 100).toFixed(2)
        })
      }
      
      if (modify.data.activityBase.actPics) {
        let src = modify.data.activityBase.actPics.split(',')
        let trc = []
        src.map((item) => { trc.push({url:item}) })
        trc.pop()
        let biArr = modify.data.activityBase.registerMustField.split(',')
        let ArrT = []
        biArr.map((item) => { ArrT.push({ name: item }) })
        ArrT.pop()
        trc.length >= 9 && this.setData({ leave: true, sword: false })
        this.setData({ picsBox: trc, photoNum: src.length - 1, mandatory: ArrT })
      }
      this.setData({ 
        getDatas: modify.data,
        fullNot: ro,
        pullText: modify.data.activityBase.title,
        startdate: this.toDate(modify.data.activityBase.startDate),
        enddate: this.toDate(modify.data.activityBase.endDate),
        merchantAddres: modify.data.activityBase.latLongAddress,
        replenish: modify.data.activityBase.address,
        seviceTel: modify.data.activityBase.mobile,
        activityIntroduce: modify.data.activityBase.description,
        activityRule: modify.data.activityBase.rule,
        latitude: modify.data.activityBase.latitude,
        longitude: modify.data.activityBase.longitude,
        recommendActivities: modify.data.activityBase.recommendActivities
      })
      modify.data.activityBase.hasBgm == 1 && this.setData({ showMusic: true, isMusic: modify.data.activityBase.bgmName, idsMusic: modify.data.activityBase.bgmId })
    }
  },

  toDate(number) {
    let n = number;
    let date = new Date(n);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return (Y + M + D)
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
    wx.redirectTo({
      url: '../administerList/administerList',
    })
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