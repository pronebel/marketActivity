var app = getApp();

import ajaxhelper from '../../../utils/ajaxhelper.js'
import Create from '../../../utils/comment/create.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bounces: true,
    mandaTo: true,
    lookMusic: true,
    placehold: false,
    awardControl: 999,
    classType: '',
    musicArr: [],
    currentidx: 0,
    musicidx: 0,
    awardList: [
      { name: '奖项一', awardControl: true, subject: '', remainQty: '', probability: '' },
      { name: '奖项二', awardControl: true, subject: '', remainQty: '', probability: '' },
      { name: '奖项三', awardControl: true, subject: '', remainQty: '', probability: '' },
      { name: '奖项四', awardControl: true, subject: '', remainQty: '', probability: '' },
      { name: '奖项五', awardControl: true, subject: '', remainQty: '', probability: '' },
      { name: '奖项六', awardControl: true, subject: '', remainQty: '', probability: '' },
      { name: '奖项七', awardControl: true, subject: '', remainQty: '', probability: '' }
    ],
    daySmoke: '', //抽奖次数
    reward: '', //奖励次数
    titleData: '', //标题数据
    startdate: '', //
    enddate: '', //
    mandatory: [], //
    mandaText: '', //
    pullText: '', //
    purchasePrice: 1, // 现价
    seviceTel: '', //
    merchantAddres: '', //
    replenish: '', //
    latitude: '', //
    longitude: '', //
    activityRule: '', //
    merchantName: '', //
    storeName: '',
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
    ctrls: true,
    ctrlTwo: true
  },
  awardControls(e) {//奖项开关
    let i = e.currentTarget.dataset.index
    if (e.detail.value){
      this.data.awardList[i].awardControl = false
      this.arrayMandas.ctrlTwo = true
    }else {
      this.data.awardList[i].awardControl = true
      this.arrayMandas.ctrlTwo = false
    }
    this.setData({ awardList: this.data.awardList })
  },
  awardcontent(e) { //奖品内容
    let i = e.currentTarget.dataset.index
    this.data.awardList[i].subject = e.detail.value
    this.setData({ awardList: this.data.awardList })
  },
  theOdds(e){ //中奖概率
    let i = e.currentTarget.dataset.index
    this.data.awardList[i].probability = e.detail.value
    this.setData({ awardList: this.data.awardList })
  },
  awardNum(e){ //奖励次数
    let i = e.currentTarget.dataset.index
    this.data.awardList[i].remainQty = e.detail.value
    this.setData({ awardList: this.data.awardList })
  },
  daySmoke(e) { this.setData({ daySmoke: e.detail.value }) },
  reward(e) { this.setData({ reward: e.detail.value }) },
  pullText(e) { this.setData({ pullText: e.detail.value }) },
  uptextGo(e) { this.setData({ upText: e.detail.value }) },
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
  getTitleList: function () {
    let param = {
      pageSize: 10,
      pageNo: 1,
      keyword: 'LOTTERY'
    }
    ajaxhelper.post(app.globalData.frontJSHost + 'titleTemplate/queryPage', param, this, this.setTitleList)
  },
  setTitleList(res) {
    console.log(res);
    let Tdata = res.data;
    if (Tdata && Tdata.result) {
      this.setData({
        titleData: Tdata.result
      })
    }
  },
  choiseTles(e) { this.setData({ bounces: false, placehold: false}) },
  shutDown() { this.setData({ bounces: true }) },
  radio(e) { this.setData({ upText: e.currentTarget.dataset.text }) },

  mandaInput(e) { this.setData({ mandaText: e.detail.value }) },
  merchantAddres(e) { this.setData({ merchantAddres: e.detail.value }) },
  replenish(e) { this.setData({ replenish: e.detail.value }) },
  seviceTel(e) { this.setData({ seviceTel: e.detail.value }) },
  activityIntroduce(e) { this.setData({ activityIntroduce: e.detail.value }) },
  activityRule(e) { this.setData({ activityRule: e.detail.value }) },
  merchantName(e) { this.setData({ merchantName: e.detail.value }) },
  storeName(e) { this.setData({ storeName: e.detail.value }) },
  titleTrue(e) { // 模态框确定
    this.setData({ bounces: true, pullText: this.data.upText })
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
    var that = this,
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
          that.data.mainFigure.length > 0 && that.setData({ sworda: false })
          that.data.mainFigure.length == 6 && that.setData({ leavea: true })
          that.setData({ goodsPhos: that.data.mainFigure.length })
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
        sword: true
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
            picsBox: that.arrayMandas.picsBoxs
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
  tooFalse() {
    let mandnames = '姓名,电话,', drl = '';
    this.data.mandatory.map((item) => { // 报名必填 字符串拼接
      mandnames = mandnames + item.name + ','
    });
    var timestampstart = Date.parse(new Date(this.data.startdate)), timestampend = Date.parse(new Date(this.data.enddate))
    let resBgm = 0
    this.data.showMusic && (resBgm = 1)
    let Drl = this.Haha(this.data.picsBox), prize = { trueArr: [], falseArr: [] }, proba = 0
    this.data.awardList.map((item) => {
      if (item.awardControl == false){
        prize.falseArr.push(item)
        if (item.remainQty === 0) { Create.prompt('奖品数量最少不能为0') }else {
          if (item.remainQty !== '' && item.subject && item.probability){
            proba = proba + item.probability * 1
            prize.trueArr.push(item)
          }
        }   
      }
    })
    let param = {
      'activityBase': {
        'actPics': Drl, //活动图片
        'actType': this.data.classType,
        'title': this.data.pullText,
        'startDate': timestampstart,
        'endDate': timestampend,
        'shopName': this.data.storeName,
        'registerMustField': mandnames,
        'latLongAddress': this.data.merchantAddres,
        'latitude': this.data.latitude,
        'longitude': this.data.longitude,
        'address': this.data.replenish,
        'mobile': this.data.seviceTel,
        'description': this.data.activityIntroduce,
        'rule': this.data.activityRule,
        'templateType': this.data.typesName, // 模板类型
        // 'mainPic': Crl, //活动详情图
        'backgroundPic': this.data.pictwo,
        'recommendActivities': this.data.recommendActivities, // 同店活动
        'hasBgm': resBgm,
        'bgmId': this.data.idsMusic
      },
      'luckyDrawAct': {
        'countType': 'EVERY_DAY',
        'count': this.data.daySmoke*1,
        'awardCount': this.data.reward*1,
        //'productName': this.data.merchantName,商品名称
        'type': this.data.classType,//活动类型
      },
      'luckyDrawPrizesList': [] //数组
    }
    let inputArr = [
      { dataSource: this.data.pullText, errMassage: '活动标题不能为空' },
      { dataSource: this.data.merchantAddres, errMassage: '地址不能为空' },
      { dataSource: this.data.activityIntroduce, errMassage: '活动介绍不能为空' },
      { dataSource: this.data.storeName, errMassage: '店铺名称不能为空' },
      // { dataSource: Crl, errMassage: '活动主图不能为空' },
      { dataSource: Drl, errMassage: '活动图片不能为空' },
      { dataSource: this.data.activityRule, errMassage: '活动规则不能为空' },
      { dataSource: this.data.daySmoke, errMassage: '每日抽奖次数不能为空' },
      { dataSource: this.data.reward, errMassage: '邀请好友最多奖励次数不能为空' }
    ]
    let massage = Create.formValidation(inputArr), okay = Create.timeCheck(this.data.startdate, this.data.enddate);
    if (massage != 'ok') {
      Create.prompt(massage)
    } else {
      if (this.data.daySmoke * 1>0){
        if (okay) {
          if (proba > 100) { console.log(proba), Create.prompt('中奖概率之和不能大于等于100%') } else {
            if (prize.falseArr.length > 0){
              if (prize.trueArr.length == prize.falseArr.length){
                prize.trueArr.map((items) => { items.probability = items.probability / 100 })
                param.luckyDrawPrizesList = prize.trueArr
                ajaxhelper.post(app.globalData.frontJSHost + 'luckyDrawAct/add', param, this, this.pushUp)
              } else { Create.prompt('打开的奖品奖品设置需填写完整') }
            }else {
              Create.prompt('最少需设置一个奖项')
            }
          }
        }
      }else { Create.prompt('抽奖次数需大于0') }
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let m = new Date();
    let starttime = m.format('yyyy-MM-dd')
    console.log(starttime)
    var thisdate = Date.parse(new Date(starttime))
    var weekdate = thisdate * 1 + 604800000
    var endtime = new Date(parseInt(weekdate)).format('yyyy-MM-dd')
    let shopInfor = wx.getStorageSync('shop')
    this.setData({
      classType: options.activityType,
      startdate: starttime,
      enddate: endtime,
      typesName: wx.getStorageSync('names'),
      seviceTel: shopInfor.mobile,
      storeName: shopInfor.name,
      merchantAddres: shopInfor.latLongAddress,
      replenish: shopInfor.address,
      latitude: shopInfor.latitude,
      longitude: shopInfor.longitude,
      activityRule: '1.需如实填写姓名手机报名;\n2.活动以平台展示抽奖结果为准;\n3.中奖名额按获奖实际顺序，请及时与我机构联系;\n4.本次活动不可赠送或者转让，以实际报名信息为准;\n5.此次活动由商家发起与平台无关，活动解释权归本机构所有。'
    });
    this.getTitleList();
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