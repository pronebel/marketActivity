var app = getApp();

import ajaxhelper from '../../../utils/ajaxhelper.js'
import Create from '../../../utils/comment/create.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    noChangeData: "",
    pageId: '',
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
    originPrice: '', //
    idsMusic: 1, //
    sworda: true,
    leavea: false,
    activityIntroduce: '', //

    showMusic: false, //  
    picsBox: [], //
    pics: [], //图片盒子
    sword: true,
    leave: false,
    photoNum: 0, //
    goodsPhos: 0, //
    mainFigure: [], //
    isMusic: '告白气球',
    recommendActivities: true,//
    mainf: [],
    bounces: true
  },
  arrayMandas: { // 组件内全局数组
    arrayManda: [],
    picsBoxs: [],
    staging: '',// 暂存选择音乐名称
    stagingIds: 0, //暂存选择音乐id
    mainPoto: [],
  },
 
  mandaInput(e) { this.setData({ mandaText: e.detail.value }) },
  originPrice(e) { this.setData({ originPrice: e.detail.value }) },
  storeName(e) { this.setData({ storeName: e.detail.value }) },
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
  getAjaxList: function () {
    let param = {
      id: +this.data.pageId
    }
    ajaxhelper.get(app.globalData.frontJSHost + 'activityBase/toUpdate', param, this, this.setTitleList)
  },
  setTitleList(res) {
    let modify = res.data;
    if (res.status) {
      let activityBase = modify.activityBase;
      let buyAct = modify.buyAct;
      console.log(buyAct.productName)
      this.setData({
        noChangeData: modify, //不改变的值存储
        startdate: app.toDate(activityBase.startDate),
        enddate: app.toDate(activityBase.endDate),
        originPrice: buyAct.originPrice / 100,
        showMusic: activityBase.hasBgm == 1 ? true : false,
        recommendActivities: activityBase.recommendActivities,
        largestNum: buyAct.maxBuyCount,
        miniNum: buyAct.minBuyCount,
        merchantAddres: activityBase.latLongAddress,
        storeName: activityBase.shopName,
        replenish: activityBase.address,
        seviceTel: activityBase.mobile,
        merchantName: buyAct.productName,
        merchantNum: buyAct.remainQty,
        activityIntroduce: activityBase.description,
        activityRule: activityBase.rule,
        pullText: activityBase.title
      })
      if (activityBase.hasBgm){
        this.setData({
          isMusic: activityBase.bgmName,
          idsMusic: activityBase.bgmId
        })
      }
      if (activityBase.registerMustField) {  //报名必填
        let arr = [];
        var brr = activityBase.registerMustField.split(',');
        brr.map(item => arr.push({ name: item }));
        arr.pop();
        this.setData({ mandatory: arr })
      }

      if (activityBase.mainPic) {   //活动主图
        let arr = [];
        var barr = activityBase.mainPic.split(',');
        barr.map((item) => arr.push({ url: item }));
        arr.pop();
        this.setData({ mainFigure: arr })
        let mainNum = this.data.mainFigure.length;
        this.setData({ goodsPhos: mainNum })
      }

      if (activityBase.actPics) {   //活动图片
        let arr = [];
        var barr = activityBase.actPics.split(',');
        barr.map((item) => arr.push({ url: item }));
        arr.pop();
        this.setData({ picsBox: arr })
        let mainNum = this.data.picsBox.length;
        this.setData({ photoNum: mainNum })
      }
    } else {
      Create.prompt(res.msg)
    }
   
  },
  mandaInput(e) { this.setData({ mandaText: e.detail.value }) },
  merchantAddres(e) { this.setData({ merchantAddres: e.detail.value }) },
  replenish(e) { this.setData({ replenish: e.detail.value }) },
  seviceTel(e) { this.setData({ seviceTel: e.detail.value }) },
  merchantNum(e) { this.setData({ merchantNum: e.detail.value }) },
  activityIntroduce(e) { this.setData({ activityIntroduce: e.detail.value }) },
  activityRule(e) { this.setData({ activityRule: e.detail.value }) },
  merchantName(e) { this.setData({ merchantName: e.detail.value }) },
  
  removeMe(e) { //必填删除
    let index = e.currentTarget.dataset.key;
    this.arrayMandas.arrayManda.splice(index, 1);
    this.setData({
      mandatory: this.arrayMandas.arrayManda
    })
  },
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
  //标题选择功能模块
  choiseTles() { //标题选择
    this.setData({ bounces: false })
    Create.sloganChoose(this, 'FREEBUY')
  },
  radio(e) { this.setData({ upText: e.currentTarget.dataset.text }) },
  titleTrue(e) { // 模态框确定
    this.setData({ bounces: true, pullText: this.data.upText })
  },
  shutDowns() { this.setData({ bounces: true }) },

  /**** 图片上传功能模块*/
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
          that.arrayMandas.mainPoto = that.arrayMandas.mainPoto.concat(states.data[0])
          that.setData({ mainFigure: that.data.mainFigure.concat(that.arrayMandas.mainPoto) })
          that.setData({ goodsPhos: that.data.mainFigure.length })
          that.data.mainFigure.length > 0 && that.setData({ sworda: false })
          that.data.mainFigure.length == 6 && that.setData({ leavea: true })
        }
      },
      fail: (res) => {
        fail++;
      },
      complete: () => {
        i++;
        that.setData({ mainf: [] })
        that.arrayMandas.mainPoto = [];
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
    let mainNum = this.data.mainFigure.length;
    if (mainNum == 0) {
      this.setData({ sworda: true, leavea: false, goodsPhos: mainNum }) //+显示
    } else if (mainNum > 0 && mainNum < 6) {
      this.setData({ sworda: false, leavea: false, goodsPhos: mainNum })
    } else {
      this.setData({ sworda: false, leavea: true, goodsPhos: mainNum })
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
        let states = JSON.parse(resp.data)
        if (states.status) {
          // 将返回的路径push进数组
          that.arrayMandas.picsBoxs = that.arrayMandas.picsBoxs.concat(states.data[0])
          that.setData({
            picsBox: this.data.picsBox.concat(that.arrayMandas.picsBoxs)
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
  tooFalse() { //发布提交
    let mandnames = '', drl = '';
    this.data.mandatory.map((item) => { // 报名必填 字符串拼接
      mandnames = mandnames + item.name + ','
    });
    var timestampstart = Date.parse(new Date(this.data.startdate)), timestampend = Date.parse(new Date(this.data.enddate))
    let resBgm = 0
    this.data.showMusic && (resBgm = 1)
    let Drl = this.Haha(this.data.picsBox), Crl = this.Haha(this.data.mainFigure);
    let noChangeVal = this.data.noChangeData;  //不改变的值
    var that = this;
    setTimeout(function(){
      let param = {
        'activityBase': {
          'id': noChangeVal.activityBase.id,
          'actPics': Drl, //活动图片
          'actType': noChangeVal.activityBase.actType,
          'title': that.data.pullText,
          'startDate': timestampstart,
          'endDate': timestampend,
          'shopName': that.data.storeName,
          'registerMustField': mandnames,
          'latLongAddress': that.data.merchantAddres,
          'latitude': that.data.latitude,
          'longitude': that.data.longitude,
          'address': that.data.replenish,
          'mobile': that.data.seviceTel,
          'description': that.data.activityIntroduce,
          'rule': that.data.activityRule,
          'templateType': noChangeVal.activityBase.templateType, // 模板类型
          'mainPic': Crl, //活动详情图
          'recommendActivities': that.data.recommendActivities, // 同店活动
          'hasBgm': resBgm,
          'bgmId': that.data.idsMusic
        },
        'buyAct': {
          'currentPrice': 0,//现价
          'id': noChangeVal.buyAct.id,
          'originPrice': that.data.originPrice * 100,//原价
          'remainQty': that.data.merchantNum * 1,// 商品数量
          'productName': that.data.merchantName,//商品名称
          'type': noChangeVal.buyAct.type,//活动类型
        }
      }
      let inputArr = [
        { dataSource: noChangeVal.activityBase.title, errMassage: '活动标题不能为空' },
        { dataSource: that.data.merchantAddres, errMassage: '地址不能为空' },
        { dataSource: that.data.storeName, errMassage: '店铺名称不能为空' },
        { dataSource: that.data.merchantName, errMassage: '商品名称不能为空' },
        { dataSource: that.data.merchantNum, errMassage: '商品数量不能为空' },
        { dataSource: that.data.activityIntroduce, errMassage: '活动介绍不能为空' },
        { dataSource: that.data.mainFigure, errMassage: '活动主图不能为空' },
        { dataSource: that.data.picsBox, errMassage: '活动图片不能为空' },
        { dataSource: that.data.activityRule, errMassage: '活动规则不能为空' },
        { dataSource: that.data.originPrice, errMassage: '原价不能为空' }
      ]
      let massage = Create.formValidation(inputArr), okay = Create.timeCheck(that.data.startdate, that.data.enddate)
      if (massage != 'ok') {
        Create.prompt(massage)
      } else {
        if (okay) {
          ajaxhelper.post(app.globalData.frontJSHost + 'activityBase/update', param, that, that.pushUp)
        }
      }
    },100)
    
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pageId: options.ids,
    });
    this.getAjaxList();
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