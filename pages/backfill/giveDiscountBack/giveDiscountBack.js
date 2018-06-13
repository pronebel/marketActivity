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
    storeName: '',
    replenish: '', //
    latitude: '', //
    longitude: '', //
    activityRule: '', //
    merchantName: '', //
    merchantNum: '',//
    giveLike: 0,
    idsMusic: 1, //
    sworda: true,
    leavea: false,
    largestNum: '', //
    miniNum: '', //
    activityIntroduce: '', //
    activityBaseId: 0,
    assistanceActId: 0,
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
  },
  arrayMandas: { // 组件内全局数组
    arrayManda: [],
    picsBoxs: [],
    staging: '', // 暂存选择音乐名称
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
  getAjaxList: function () {
    let param = {
      id: this.data.pageId
    }
    ajaxhelper.get(app.globalData.frontJSHost + 'activityBase/toUpdate', param, this, this.setListData)
  },
  setListData(res) {
    let modify = res.data;
    if (res.status) {
      let activityBase = modify.activityBase;
      let assistanceAct = modify.assistanceAct;
      this.setData({
        pullText: activityBase.title,
        noChangeData: modify, //不改变的值存储
        startdate: app.toDate(activityBase.startDate),
        enddate: app.toDate(activityBase.endDate),
        originPrice: assistanceAct.originPrice / 100 + '元',
        presentPrice: assistanceAct.currentPrice / 100,
        showMusic: activityBase.hasBgm == 1 ? true : false,
        isMusic: activityBase.bgmName,
        giveLike: assistanceAct.helpCount,
        idsMusic: activityBase.bgmId,
        recommendActivities: activityBase.recommendActivities,
        activityBaseId: activityBase.id,
        largestNum: assistanceAct.maxEveryHelp / 100,
        miniNum: assistanceAct.minEveryHelp / 100,
        merchantAddres: activityBase.latLongAddress,
        storeName: activityBase.shopName,
        replenish: activityBase.address,
        seviceTel: activityBase.mobile,
        merchantName: assistanceAct.productName,
        merchantNum: assistanceAct.remainStockCount,
        activityIntroduce: activityBase.description,
        activityRule: activityBase.rule,
        assistanceActId: assistanceAct.id
      })
      console.log(this.data.showMusic, this.data.miniNum, 9999)
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
        if (mainNum == 0) {
          this.setData({ sworda: true, leavea: false, goodsPhos: mainNum }) //+显示
        } else if (mainNum > 0 && mainNum < 6) {
          this.setData({ sworda: false, leavea: false, goodsPhos: mainNum })
        } else {
          this.setData({ sworda: false, leavea: true, goodsPhos: mainNum })
        }
      }

      if (activityBase.actPics) {   //活动图片
        let arr = [];
        var barr = activityBase.actPics.split(',');
        barr.map((item) => arr.push({ url: item }));
        arr.pop();
        this.setData({ picsBox: arr })
        let mainNum = this.data.picsBox.length;
        if (mainNum == 0) {  //leave + sword -
          this.setData({ leave: false, sword: true, photoNum: mainNum }) //+显示
        } else if (mainNum > 0 && mainNum < 9) {
          this.setData({ leave: false, sword: false, photoNum: mainNum })
        } else {
          this.setData({ leave: true, sword: false, photoNum: mainNum })
        }
      }


    } else {
      Create.prompt(res.msg)
    }
  },
  getTitleList: function () {
    let param = {
      pageSize: 10,
      pageNo: 1,
      keyword: 'ASSISTANCE_MONEY'
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
  radio(e) { this.setData({ upText: e.currentTarget.dataset.text }) },

  mandaInput(e) { this.setData({ mandaText: e.detail.value }) },
  merchantAddres(e) { this.setData({ merchantAddres: e.detail.value }) },
  storeName(e) { this.setData({ storeName: e.detail.value }) },
  replenish(e) { this.setData({ replenish: e.detail.value }) },
  seviceTel(e) { this.setData({ seviceTel: e.detail.value }) },
  merchantNum(e) { this.setData({ merchantNum: e.detail.value }) },
  activityIntroduce(e) { this.setData({ activityIntroduce: e.detail.value }) },
  activityRule(e) { this.setData({ activityRule: e.detail.value }) },
  merchantName(e) { this.setData({ merchantName: e.detail.value }) },
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
    let mbps = states.data.result, mh = { types: 'circle', color: '#ccc', haveTry: true }
    if (states.bizCode == 200) {
      mbps.map((item) => {
        Object.assign(item.bgm, mh)
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
    Create.sloganChoose(this, 'ASSISTANCE')
  },
  radio(e) { this.setData({ upText: e.currentTarget.dataset.text }) },
  titleTrue(e) { // 模态框确定
    this.setData({ bounces: true, pullText: this.data.upText })
  },
  shutDowns() { this.setData({ bounces: true }) },

  pushCamera() {
    let that = this, pics = this.data.pics, theNum = 6 - this.data.mainFigure.length * 1;
    wx.chooseImage({
      count: theNum, // 可传图片张数
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var imgsrc = res.tempFilePaths;
        pics = pics.concat(imgsrc);
        that.setData({ pics: pics });
        that.pushLoadimg({
          url: app.globalData.frontJSHost + 'uploadImageFiles',
          path: that.data.pics,
        });
      }
    })
  },
  pushLoadimg(data) {
    var that = this, pics = that.data.pics, po = data.photos, various = data.goodsPhos, num = data.num,
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
          that.arrayMandas.mainPoto = that.data.mainFigure.concat(states.data[0])
          that.setData({
            mainFigure: that.arrayMandas.mainPoto
          })
          let mainNum = that.data.mainFigure.length;
          if (mainNum == 0) {
            this.setData({ sworda: true, leavea: false, goodsPhos: mainNum }) //+显示
          } else if (mainNum > 0 && mainNum < 6) {
            this.setData({ sworda: false, leavea: false, goodsPhos: mainNum })
          } else {
            this.setData({ sworda: false, leavea: true, goodsPhos: mainNum })
          }
        }
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
          that.pushLoadimg(data);
        }
      }
    });
  },
  newsfuntions(data) {
    let that = this;
    let r = this.data.mainFigure;
    this.arrayMandas.mainPoto.splice(this.arrayMandas.mainPoto.length - 1, 1)
    r.splice(r.length - 1, 1);
    this.setData({
      mainFigure: r,
      goodsPhos: r.length
    })
    let mainNum = that.data.mainFigure.length;

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
          that.arrayMandas.picsBoxs = that.data.picsBox.concat(states.data[0])
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
    var timestampstart = Date.parse(new Date(this.data.startdate)), timestampend = Date.parse(new Date(this.data.enddate))
    let resBgm = 0
    this.data.showMusic && (resBgm = 1)
    let Drl = this.Haha(this.data.picsBox), Crl = this.Haha(this.data.mainFigure);
    let that = this;
    setTimeout(function () {
      let param = {
        'activityBase': {
          'actPics': Drl, //活动图片
          'actType': 'ASSISTANCE',
          'title': that.data.pullText,
          'endDate': timestampend,
          'startDate': timestampstart,
          'shopName': that.data.storeName,
          'registerMustField': mandnames,
          'latLongAddress': that.data.merchantAddres,
          'latitude': that.data.latitude,
          'longitude': that.data.longitude,
          'address': that.data.replenish,
          'mobile': that.data.seviceTel,
          'description': that.data.activityIntroduce,
          'rule': that.data.activityRule,
          'mainPic': Crl, //活动详情图
          'recommendActivities': that.data.recommendActivities, // 同店活动
          'hasBgm': resBgm,
          'bgmId': that.data.idsMusic,
          'id': that.data.activityBaseId
        },
        'assistanceAct': {
          'id': that.data.assistanceActId,
          'remainStockCount': that.data.merchantNum * 1,
          'helpCount': that.data.giveLike,
          'productName': that.data.merchantName,//商品名称
          'maxEveryHelp': that.data.largestNum * 100,
          'minEveryHelp': that.data.miniNum * 100,
          'type': 'WINNING_PRODUCT'
        }
      }
      let inputArr = [
        { dataSource: that.data.pullText, errMassage: '活动标题不能为空' },
        { dataSource: that.data.storeName, errMassage: '地址不能为空' },
        { dataSource: that.data.merchantAddres, errMassage: '地址不能为空' },
        { dataSource: that.data.merchantName, errMassage: '商品名称不能为空' },
        { dataSource: that.data.merchantNum, errMassage: '商品数量不能为空' },
        { dataSource: that.data.activityIntroduce, errMassage: '活动介绍不能为空' },
        { dataSource: that.data.mainFigure, errMassage: '活动主图不能为空' },
        { dataSource: that.data.picsBox, errMassage: '活动图片不能为空' },
        { dataSource: that.data.activityRule, errMassage: '活动规则不能为空' },
        { dataSource: that.data.largestNum, errMassage: '最大价格不能为空' },
        { dataSource: that.data.giveLike, errMassage: '需要点赞数量不能为空' },
      ]
      let massage = Create.formValidation(inputArr), okay = Create.timeCheck(that.data.startdate, that.data.enddate)
      if (massage != 'ok') {
        Create.prompt(massage)
      } else {
        if (okay) {
          ajaxhelper.post(app.globalData.frontJSHost + 'activityBase/update', param, that, that.pushUp)
        }
      }
    }, 100)

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
      pageId: options.ids
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