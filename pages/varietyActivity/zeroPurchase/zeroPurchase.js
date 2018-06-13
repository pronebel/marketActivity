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
    musicArr: [],
    currentidx: 0,
    musicidx: 0,
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
  pullText(e) { this.setData({ pullText: e.detail.value }) },
  uptextGo(e) { this.setData({ upText: e.detail.value }) },
  mandaInput(e) { this.setData({ mandaText: e.detail.value }) },
  originPrice(e) { this.setData({ originPrice: e.detail.value }) },
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
      keyword: 'FREEBUY'
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
  choiseTles() { this.setData({ bounces: false, placehold: false }) },
  shutDown() { this.setData({ bounces: true }) },
  radio(e) { this.setData({ upText: e.currentTarget.dataset.text }) },

  mandaInput(e) { this.setData({ mandaText: e.detail.value }) },
  merchantAddres(e) { this.setData({ merchantAddres: e.detail.value }) },
  replenish(e) { this.setData({ replenish: e.detail.value }) },
  seviceTel(e) { this.setData({ seviceTel: e.detail.value }) },
  merchantNum(e) { this.setData({ merchantNum: e.detail.value }) },
  activityIntroduce(e) { this.setData({ activityIntroduce: e.detail.value }) },
  activityRule(e) { this.setData({ activityRule: e.detail.value }) },
  merchantName(e) { this.setData({ merchantName: e.detail.value }) },
  storeName(e) { this.setData({ storeName: e.detail.value }) },
  titleTrue(e) { // 模态框确定
    this.setData({ bounces: true, pullText: this.data.upText })
  },
  addBtn(e) { //必填添加
    this.setData({ mandaTo: false, mandaText: '' })
  },
  mandaSub() { //必填提交
    if (this.data.mandaText) {
      this.arrayMandas.arrayManda.push({ name: this.data.mandaText });
      this.setData({
        mandaTo: true,
        mandatory: this.arrayMandas.arrayManda
      });
    } else {
      wx.showToast({
        title: '输入不能为空',
        duration: 2000
      })
    }
  },
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
    let Drl = this.Haha(this.data.picsBox), Crl = this.Haha(this.data.mainFigure)
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
        'mainPic': Crl, //活动详情图
        'recommendActivities': this.data.recommendActivities, // 同店活动
        'hasBgm': resBgm,
        'bgmId': this.data.idsMusic
      },
      'buyAct': {
        'currentPrice': 0,//现价
        'originPrice': this.data.originPrice * 100,//原价
        'qty': this.data.merchantNum * 1,// 商品数量
        'productName': this.data.merchantName,//商品名称
        'type': this.data.classType,//活动类型
      }
    }
    let inputArr = [
      { dataSource: this.data.pullText, errMassage: '活动标题不能为空' },
      { dataSource: this.data.merchantAddres, errMassage: '地址不能为空' },
      { dataSource: this.data.storeName, errMassage: '店铺名称不能为空' },
      { dataSource: this.data.merchantName, errMassage: '商品名称不能为空' },
      { dataSource: this.data.merchantNum, errMassage: '商品数量不能为空' },
      { dataSource: this.data.activityIntroduce, errMassage: '活动介绍不能为空' },
      { dataSource: Crl, errMassage: '活动主图不能为空' },
      { dataSource: Drl, errMassage: '活动图片不能为空' },
      { dataSource: this.data.activityRule, errMassage: '活动规则不能为空' },
      { dataSource: this.data.originPrice, errMassage: '原价不能为空' }
    ]
    let massage = Create.formValidation(inputArr), okay = Create.timeCheck(this.data.startdate, this.data.enddate);
    if (massage != 'ok') {
      Create.prompt(massage)
    } else {
      if(this.data.originPrice*100 > 0){
        if (okay) {
          ajaxhelper.post(app.globalData.frontJSHost + 'buyAct/add', param, this, this.pushUp)
        }
      } else { Create.prompt('原价需大于0') }
    }
  },
  pushUp(states) {
    if (states.bizCode == 200) {
      let shop = wx.getStorageSync('shop')
      shop.name = this.data.storeName
      wx.setStorage({key: 'shop', data: shop })
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
      activityRule: '1.需如实填写姓名手机报名;\n2.参加成功后，凭成功二维码到店铺享受优惠。\n3.本次活动不可赠送或者转让，以实际报名信息为准;\n4.此次活动由商家发起与平台无关，活动解释权归本机构所有。'
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