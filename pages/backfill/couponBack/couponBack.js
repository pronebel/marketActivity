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
    awardControl: 999,
    classType: '',
    musicArr: [],
    currentidx: 0,
    musicidx: 0,
    awardList: [],
    daySmoke: '', //抽奖次数
    reward: '', //奖励次数
    titleData: '', //标题数据
    startdate: '', //
    enddate: '', //
    validity: '',
    mandatory: [], //
    mandaText: '', //
    pullText: '', //
    upText: '',
    purchasePrice: 1, // 现价
    seviceTel: '', //
    merchantAddres: '', //
    storeName: '',
    replenish: '', //
    latitude: '', //
    longitude: '', //
    activityRule: '', //
    merchantName: '', //
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
    mainf:[],
    paybacked: false, //
    pagei: 0,
    paybackList: [
      { name: '红包劵', delFlag: true, atype: 'HONGBAO' },
      { name: '满减劵', delFlag: false, atype: 'MANJIAN' },
      { name: '满折劵', delFlag: false, atype: 'MANZHE' },
      { name: '满赠劵', delFlag: false, atype: 'MANZENG' }
    ], //
    isMusic: '背景音乐1',
    idsMusic: 1, //
    recommendActivities: true,//
    Secur: '红包劵',
    securType: '',
  },
  arrayMandas: { // 组件内全局数组
    arrayManda: [],
    picsBoxs: [],
    staging: '',// 暂存选择音乐名称
    stagingIds: 0, //暂存选择音乐id
    mainPoto: [],
    juancless: 0, //劵类型下标
    juanname: '',
    juantype: ''
  },
  reductions(e) {//奖项开关
    let i = e.currentTarget.dataset.index
    if (e.detail.value) {
      this.data.awardList[i].reductions = false
    } else {
      this.data.awardList[i].reductions = true
    }
    this.setData({ awardList: this.data.awardList })
  },
  reductionNum(e) { //优惠劵数量
    let i = e.currentTarget.dataset.index
    this.data.awardList[i].maxStockCount = e.detail.value
    this.setData({ awardList: this.data.awardList })
  },
  reductionSur(e) { //面额
    let i = e.currentTarget.dataset.index
    this.data.awardList[i].discount = e.detail.value
    this.setData({ awardList: this.data.awardList })
  },
  reductionCond(e) { // 使用条件
    let i = e.currentTarget.dataset.index
    this.data.awardList[i].conditions = e.detail.value
    this.setData({ awardList: this.data.awardList })
  },
  daySmoke(e) { this.setData({ daySmoke: e.detail.value }) },
  reward(e) { this.setData({ reward: e.detail.value }) },
  mandaInput(e) { this.setData({ mandaText: e.detail.value }) },

  securitiesNum(e) { this.setData({ securitiesNum: e.detail.value }) },
  denomination(e) { this.setData({ denomination: e.detail.value }) },

  switchPage(e) { // 劵种选择
    let i = e.currentTarget.dataset.index
    this.arrayMandas.juancless = i
    this.arrayMandas.juanname = e.currentTarget.dataset.text
    this.arrayMandas.juantype = e.currentTarget.dataset.atype
  },
  chooseTicket() { this.setData({ paybacked: true }) },
  switchTitleChange: function (e) {
    this.setData({ recommendActivities: e.detail.value })
  },
  sDown() { this.setData({ mandaTo: true }) },
  bindstartDateChange: function (e) { this.setData({ startdate: e.detail.value }) },
  validity(e) { this.setData({ validity: e.detail.value }) },
  bindendDateChange: function (e) { this.setData({ enddate: e.detail.value }) },

  mandaInput(e) { this.setData({ mandaText: e.detail.value }) },
  merchantAddres(e) { this.setData({ merchantAddres: e.detail.value }) },
  storeName(e) { this.setData({ storeName: e.detail.value }) },
  replenish(e) { this.setData({ replenish: e.detail.value }) },
  seviceTel(e) { this.setData({ seviceTel: e.detail.value }) },
  activityIntroduce(e) { this.setData({ activityIntroduce: e.detail.value }) },
  activityRule(e) { this.setData({ activityRule: e.detail.value }) },
  merchantName(e) { this.setData({ merchantName: e.detail.value }) },


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
  choseMusic(e) {
    let at = this
    Create.choseMusic(e, at)
  },
  audition(e) {
    let at = this
    Create.audition(e, at)
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
    let mbps = states.data.result, mh = { types: 'circle', color: '#ccc', haveTry: true }, that = this, nh = { types: 'success', color: '#success', haveTry: true }
    if (states.bizCode == 200) {
      mbps.map((item,index) => {
        if (item.bgm.id == that.data.idsMusic){
          that.arrayMandas.staging = item.bgm.name
          that.arrayMandas.stagingIds = item.bgm.id
          Object.assign(item.bgm, nh)
          that.setData({ currentidx: index })
        } else {
          Object.assign(item.bgm, mh)
        }
      })
      this.setData({ musicArr: mbps })
    }
  },
  musicClose() {
    this.setData({ lookMusic: true })
  },
  
  //标题选择功能模块
  choiseTles() { //标题选择
    this.setData({ bounces: false })
    Create.sloganChoose(this, 'QUAN')
  },
  radio(e) { this.setData({ upText: e.currentTarget.dataset.text }) },
  titleTrue(e) { // 模态框确定
    this.setData({ bounces: true, pullText: this.data.upText })
  },
  shutDowns() { this.setData({ bounces: true }) },

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
        console.log(states)
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
  friends(ad) {
    let that = ad, prize = []
    that.data.awardList.map((item) => {
      if (item.reductions == false) {
        if (item.maxStockCount && item.discount && item.conditions) {
            item.type = this.data.pageData.quanActModel.quanList[0].type,
            item.name = this.data.pageData.quanActModel.quanList[0].name,
            item.validiteDate = this.data.validity,
            prize.push(item)
        } else {
          Create.prompt('开启优惠劵设置需填写完整')
        }
      }
    })
    return prize
  },
  tooFalse() {
    let mandnames = '姓名,电话,', drl = '';
    this.data.mandatory.map((item) => { // 报名必填 字符串拼接
      mandnames = mandnames + item.name + ','
    });
    var timestampstart = Date.parse(new Date(this.data.startdate)), timestampend = Date.parse(new Date(this.data.enddate)), validity = Date.parse(new Date(this.data.validity))
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
        'id': this.data.pageData.activityBase.id,
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
      "quanActModel": {
        "quanAct": {},
        "quanList": []
      }
    }
    let inputArr = [
      { dataSource: this.data.storeName, errMassage: '地址不能为空' },
      { dataSource: this.data.merchantAddres, errMassage: '地址不能为空' },
      { dataSource: this.data.activityIntroduce, errMassage: '活动介绍不能为空' },
      { dataSource: this.data.mainFigure, errMassage: '活动主图不能为空' },
      { dataSource: this.data.picsBox, errMassage: '活动图片不能为空' },
      { dataSource: this.data.activityRule, errMassage: '活动规则不能为空' }
    ]
    let hongbao = [
      { dataSource: this.data.securitiesNum, errMassage: '活动规则不能为空' },
      { dataSource: this.data.denomination, errMassage: '活动规则不能为空' }
    ]
    let prize = this.friends(this)
    param.quanActModel.quanList = prize
    // if (this.data.Secur != '红包劵') {
      
    //   console.log(prize, '杜鹃花风景')
    //   param.quanActModel.quanList = prize
    // } else {
    //   param.quanActModel.quanList = this.data.awardList
    //   inputArr.concat(hongbao)
    // }
    let massage = Create.formValidation(inputArr), okay = Create.timeCheck(this.data.startdate, this.data.enddate)
    if (massage != 'ok') {
      Create.prompt(massage)
    } else {
      if (okay) {
        if (timestampend < validity) {
          console.log(JSON.stringify(param))
          ajaxhelper.post(app.globalData.frontJSHost + 'activityBase/update', param, this, this.pushUp)
        } else {
          Create.prompt('有效期需大于活动结束时间')
        }
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
    console.log(states)
    let modify = states
    if (modify.bizCode == 200) {
      let startstimes = app.toDate(modify.data.activityBase.startDate), endstimes = app.toDate(modify.data.activityBase.endDate), validity = app.toDate(modify.data.quanActModel.quanList[0].validiteDate)
      let ArrT = modify.data.activityBase.registerMustField.split(',')
      ArrT.pop()
      modify.data.activityBase.hasBgm == 1 && this.setData({ showMusic: true, isMusic: modify.data.activityBase.bgmName, idsMusic: modify.data.activityBase.bgmId })
      let Ctr = this.setVariable(modify.data.activityBase.mainPic), Drl = this.setVariable(modify.data.activityBase.actPics)
      Drl.length < 9 ? this.setData({ leave: false, sword: false }) : this.setData({ leave: true, sword: false })
      Ctr.length < 6 ? this.setData({ leavea: false, sworda: false }) : this.setData({ leavea: true, sworda: false })
      let rt = []
      if(modify.data.quanActModel.quanList[0].type == "HONGBAO"){ rt = modify.data.quanActModel.quanList }else { rt = this.dealWith(modify.data.quanActModel.quanList)}
      this.setData({
          pageData: modify.data,
          startdate: startstimes,
          enddate: endstimes,
          validity: validity,
          mandatory: ArrT,
          mainFigure: Ctr,
          goodsPhos: Ctr.length,
          picsBox: Drl,
          photoNum: Drl.length,
          merchantAddres: modify.data.activityBase.latLongAddress,
          storeName: modify.data.activityBase.shopName,
          pullText: modify.data.activityBase.title,
          latitude: modify.data.activityBase.latitude,
          longitude: modify.data.activityBase.longitude,
          replenish: modify.data.activityBase.address,
          seviceTel: modify.data.activityBase.mobile,
          activityIntroduce: modify.data.activityBase.description,
          activityRule: modify.data.activityBase.rule,
          awardList: rt,
          recommendActivities: modify.data.activityBase.recommendActivities,
          securType: modify.data.quanActModel.quanList[0].type
        })
    }
  },
  dealWith(act) {
    let Arr = act
    if (Arr.length < 6) {
      let ad = 6 - Arr.length
      for (let i = 0; i < ad; i++) {
        Arr.push({ reductions: true, maxStockCount: '', discount: '', conditions: '' })
      }
    }
    // Arr.map((item) => { item.probability = item.probability * 100 })
    return Arr
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