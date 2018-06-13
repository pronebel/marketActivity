var app = getApp();

import ajaxhelper from '../../../utils/ajaxhelper.js'
import Create from '../../../utils/comment/create.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    actId: 0,
    pageType: '',
    pageData: '',
    bounces: true,
    mandaTo: true,
    lookMusic: true,
    musicArr: [],
    currentidx: 0,
    musicidx: 0,
    titleData: '', //标题数据
    startdate: '', //
    enddate: '', //
    mandatory: [], //
    mandaText: '', //
    pullText: '', //
    upText: '',
    purchasePrice: 1, // 现价
    seviceTel: '', //
    merchantAddres: '', //
    replenish: '', //
    latitude: '', //
    longitude: '', //
    activityRule: '', //
    merchantName: '', //
    storeName: '',
    merchantNum: '',//
    originPrice: 0, //
    presentPrice: 0,
    idsMusic: 1, //
    largestNum: '',//
    miniNum: '',//
    sworda: true,
    leavea: false,
    classType: '',//
    activityIntroduce: '', //

    showMusic: false, //  
    picsBox: [], //
    pics: [], //图片盒子
    sword: true,
    leave: false,
    photoNum: 0, //
    goodsPhos: 0, //
    mainFigure: [], //
    mainf: [],
    isMusic: '告白气球',
    recommendActivities: true,//
  },
  arrayMandas: { // 组件内全局数组
    arrayManda: [],
    picsBoxs: [],
    staging: '',// 暂存选择音乐名称
    stagingIds: 0, //暂存选择音乐id
    mainPoto: [],
  },
  mandaInput(e) { this.setData({ mandaText: e.detail.value }) },

  switchTitleChange: function (e) {
    this.setData({ recommendActivities: e.detail.value })
  },
  sDown() { this.setData({ mandaTo: true }) },
  bindstartDateChange: function (e) {
    this.setData({
      startdate: e.detail.value
    })
  },
  bindendDateChange: function (e) {
    this.setData({
      enddate: e.detail.value
    })
  },
  // getTitleList: function () {
  //   let param = {
  //     pageSize: 10,
  //     pageNo: 1,
  //     keyword: 'ONEYUANBUY'
  //   }
  //   ajaxhelper.post(app.globalData.frontJSHost + 'titleTemplate/queryPage', param, this, this.setTitleList)
  // },
  // setTitleList(res) {
  //   console.log(res);
  //   let Tdata = res.data;
  //   if (Tdata && Tdata.result) {
  //     this.setData({
  //       titleData: Tdata.result
  //     })
  //   }
  // },
  

  mandaInput(e) { this.setData({ mandaText: e.detail.value }) },
  merchantAddres(e) { this.setData({ merchantAddres: e.detail.value }) },
  replenish(e) { this.setData({ replenish: e.detail.value }) },
  seviceTel(e) { this.setData({ seviceTel: e.detail.value }) },
  merchantNum(e) { this.setData({ merchantNum: e.detail.value }) },
  activityIntroduce(e) { this.setData({ activityIntroduce: e.detail.value }) },
  activityRule(e) { this.setData({ activityRule: e.detail.value }) },
  merchantName(e) { this.setData({ merchantName: e.detail.value }) },
  storeName(e) { this.setData({ storeName: e.detail.value }) },
  chooseAddre() {
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
  audition(e) {
    let at = this
    Create.audition(e, at)
  },
  choseMusic(e) {
    let at = this
    Create.choseMusic(e, at)
  },
  backMuisc(e) { //背景音乐设置
    if (e.detail.value) {
      this.setData({ showMusic: true })
    } else {
      this.setData({ showMusic: false })
    }
  },
  trueChoose() { //确定选中
    this.setData({ isMusic: this.arrayMandas.staging, idsMusic: this.arrayMandas.stagingIds, lookMusic: true })
  },
  setMusic() { //打开音乐
    this.setData({ lookMusic: false })
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
  // 标题选择模块
  radio(e) { this.setData({ upText: e.currentTarget.dataset.text }) },
  choiseTles() { //标题选择
    this.setData({ bounces: false })
    Create.sloganChoose(this, 'SECKILL')
  },
  radio(e) { this.setData({ upText: e.currentTarget.dataset.text }) },
  titleTrue(e) { // 模态框确定
    this.setData({ bounces: true, pullText: this.data.upText })
  },
  shutDowns() { this.setData({ bounces: true }) },
  /***********图片上传功能模块 */
  pushCamera() {
    let that = this, pics = this.data.mainf, theNum = 6 - this.data.mainFigure.length * 1;
    wx.chooseImage({
      count: theNum, // 可传图片张数
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var imgsrc = res.tempFilePaths;
        pics = pics.concat(imgsrc);
        that.setData({ mainf: pics });
        that.pushLoadimg({
          url: app.globalData.frontJSHost + 'uploadImageFiles',
          path: that.data.mainf,
        });
      }
    })
  },
  pushLoadimg(data) {
    var that = this, pics = that.data.mainf, po = data.photos, various = data.goodsPhos, num = data.num,
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
        console.log(states)
        if (states.status) {
          that.arrayMandas.mainPoto = that.arrayMandas.mainPoto.concat(states.data[0])
          that.setData({ mainFigure: that.data.mainFigure.concat(that.arrayMandas.mainPoto) })
          let mainNum = that.data.mainFigure.length;
          if (mainNum == 0) {
            that.setData({ sworda: true, leavea: false, goodsPhos: mainNum }) //+显示
          } else if (mainNum > 0 && mainNum < 6) {
            that.setData({ sworda: false, leavea: false, goodsPhos: mainNum })
          } else {
            that.setData({ sworda: false, leavea: true, goodsPhos: mainNum })
          }
        }
      },
      fail: (res) => {
        fail++;
      },
      complete: () => {
        i++;
        that.setData({ pics: [] })
        that.arrayMandas.mainPoto = []
        if (i == data.path.length) {   //当图片传完时，停止调用
        } else {//若图片还没有传完，则继续调用函数
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.pushLoadimg(data);
        }
      }
    });
  },
  newsfuntions(data) {
    let r = this.data.mainFigure;
    this.arrayMandas.mainPoto.splice(this.arrayMandas.mainPoto.length - 1, 1)
    r.splice(r.length - 1, 1);
    this.setData({
      mainFigure: r,
      goodsPhos: r.length
    })
    if (this.data.mainFigure.length < 6) {
      this.setData({
        leavea: false
      })
    }
    if (this.data.mainFigure.length <= 0) {
      this.setData({
        sworda: true
      })
    }
  },

  addCamera() { //照片上传
    let that = this, pics = this.data.pics, theNum = 9 - this.data.picsBox.length * 1;
    wx.chooseImage({
      count: theNum, // 可传图片张数
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
        console.log('卡萨机会大固定价格花洒')
        let states = JSON.parse(resp.data)
        if (states.status) {
          // 将返回的路径push进数组
          that.arrayMandas.picsBoxs = that.arrayMandas.picsBoxs.concat(states.data[0])
          that.setData({
            picsBox: that.data.picsBox.concat(that.arrayMandas.picsBoxs)
          })
          that.setData({ photoNum: that.data.picsBox.length })
          that.data.picsBox.length > 0 && that.setData({ sword: false })
          that.data.picsBox.length == 9 && that.setData({ leave: true })
        }
        console.log(i);
        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++;
      },
      complete: () => {
        i++;
        that.setData({ pics: [] })
        that.arrayMandas.picsBoxs = []
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
  swordCamera: function () {
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
    if (this.data.picsBox.length <= 0) {
      this.setData({
        sword: true
      })
    }
  },
  Haha(states) {
    let drl = ''
    states.map((item) => {
      item.url
      drl = drl + item.url + ','
    })
    return drl
  },

  //提交发布
  tooFalse() {
    let mandnames = '姓名,电话,', drl = '';
    this.data.mandatory.map((item) => { // 报名必填 字符串拼接
      mandnames = mandnames + item.name + ','
    });
    var timestampstart = Date.parse(new Date(this.data.startdate)), timestampend = Date.parse(new Date(this.data.enddate))
    let resBgm = 0
    this.data.showMusic && (resBgm = 1)
    let Drl = this.Haha(this.data.picsBox), Crl = this.Haha(this.data.mainFigure)
    let param = {
      'activityBase': {
        'id': this.data.pageData.activityBase.id,
        'actPics': Drl, //活动图片
        'actType': this.data.pageData.activityBase.actType,
        'title': this.data.pullText,
        'startDate': timestampstart,
        'endDate': timestampend,
        'shopName': this.data.storeName,
        'registerMustField': this.data.pageData.activityBase.registerMustField,
        'latLongAddress': this.data.merchantAddres,
        'latitude': this.data.latitude,
        'longitude': this.data.longitude,
        'address': this.data.replenish,
        'mobile': this.data.seviceTel,
        'description': this.data.activityIntroduce,
        'rule': this.data.activityRule,
        'templateType': this.data.pageData.activityBase.templateType, // 模板类型
        'mainPic': Crl, //活动详情图
        'recommendActivities': this.data.recommendActivities, // 同店活动
        'hasBgm': resBgm,
        'bgmId': this.data.idsMusic
      },
      'seckillAct': {
        'currentPrice': this.data.pageData.seckillAct.currentPrice,//现价
        'originPrice': this.data.pageData.seckillAct.originPrice,//原价
        'remainStockCount': this.data.merchantNum * 1,// 商品数量
        'maxEveryoneBuyCount': this.data.pageData.seckillAct.maxEveryoneBuyCount, //每人最大购买数量
        'minEveryoneBuyCount': this.data.pageData.seckillAct.minEveryoneBuyCount, //每人最小购买数量
        'productName': this.data.merchantName//商品名称
      }
    }
    let inputArr = [
      { dataSource: this.data.storeName, errMassage: '店铺名称不能为空' },
      { dataSource: this.data.merchantAddres, errMassage: '地址不能为空' },
      { dataSource: this.data.merchantName, errMassage: '商品名称不能为空' },
      { dataSource: this.data.merchantNum, errMassage: '商品数量不能为空' },
      { dataSource: this.data.activityIntroduce, errMassage: '活动介绍不能为空' },
      { dataSource: this.data.mainFigure, errMassage: '活动主图不能为空' },
      { dataSource: this.data.picsBox, errMassage: '活动图片不能为空' },
      { dataSource: this.data.activityRule, errMassage: '活动规则不能为空' },
    ]
    let massage = Create.formValidation(inputArr), okay = Create.timeCheck(this.data.startdate, this.data.enddate)
    if (massage != 'ok') {
      Create.prompt(massage)
    } else {
      if (okay) {
        if (this.data.largestNum * 1 < this.data.merchantNum * 1) {
          ajaxhelper.post(app.globalData.frontJSHost + 'activityBase/update', param, this, this.pushUp)
        } else { Create.prompt('最大数量不能超过商品数量') }
      }
    }
  },
  pushUp(states) {
    if (states.bizCode == 200) {
      let shop = wx.getStorageSync('shop')
      shop.name = this.data.storeName
      wx.setStorage({ key: 'shop', data: shop })
      wx.redirectTo({
        url: '../../administerList/administerList',
      })
    }
  },
  setVariable(arr) { //变数组
    let src = arr.split(','), trc = []
    src.map((item) => { trc.push({ url: item }) })
    trc.pop()
    return trc
  },
  getEditorData() {
    let param = { id: this.data.actId }
    ajaxhelper.get(app.globalData.frontJSHost + 'activityBase/toUpdate', param, this, this.setEditor)
  },
  setEditor(states) {  //数据成功回调
    let modify = states, ro = ''
    if (modify.bizCode == 200) {
      let startstimes = app.toDate(modify.data.activityBase.startDate), endstimes = app.toDate(modify.data.activityBase.endDate)
      let ArrT = modify.data.activityBase.registerMustField.split(',')
      ArrT.pop()
      modify.data.activityBase.hasBgm == 1 && this.setData({ showMusic: true, isMusic: modify.data.activityBase.bgmName, idsMusic: modify.data.activityBase.bgmId })
      let Ctr = this.setVariable(modify.data.activityBase.mainPic), Drl = this.setVariable(modify.data.activityBase.actPics)
      Drl.length < 9 ? this.setData({ leave: false, sword: false }) : this.setData({ leave: true, sword: false })
      Ctr.length < 6 ? this.setData({ leavea: false, sworda: false }) : this.setData({ leavea: true, sworda: false })
      this.setData
      ({
        pageData: modify.data,
        startdate: startstimes,
        enddate: endstimes,
        mandatory: ArrT,
        mainFigure: Ctr,
        goodsPhos: Ctr.length,
        picsBox: Drl,
        photoNum: Drl.length,
        merchantAddres: modify.data.activityBase.latLongAddress,
        storeName: modify.data.activityBase.shopName,
        latitude: modify.data.activityBase.latLongAddress.latitude,
        longitude: modify.data.activityBase.latLongAddress.longitude,
        replenish: modify.data.activityBase.address,
        seviceTel: modify.data.activityBase.mobile,
        merchantName: modify.data.seckillAct.productName,
        merchantNum: modify.data.seckillAct.remainStockCount,
        activityIntroduce: modify.data.activityBase.description,
        activityRule: modify.data.activityBase.rule,
        recommendActivities: modify.data.activityBase.recommendActivities,
        pullText: modify.data.activityBase.title
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ actId: options.ids, pageType: options.type })
    this.getEditorData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('itemBgm', this)
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