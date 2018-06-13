var app = getApp();

import ajaxhelper from '../../../utils/ajaxhelper.js'
import Create from '../../../utils/comment/create.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mandaTo: true,
    lookMusic: true,
    placehold: true,
    contactName:'',
    musicArr: [],
    isFree:'免费',
    chooseArr:['姓名','电话'],
    currentidx: 0,
    titleData: '', //标题数据
    startdate: '', //
    enddate: '', //
    mandaText: '', //
    pullText: '', //
    purchasePrice: 1, // 现价
    contactTel: '', //
    merchantAddres: '', //
    replenish: '', //
    latitude: '', //
    longitude: '', //
    activityRule: '', //
    merchantNum: '',//
    currentPrice:0,
    sworda: true,
    activityIntroduce: '', //

    showMusic: false, //  
    pics: [], //图片盒子
    goodsPhos: 0, //
    mainFigure: [], //
    mainf: [],
  },
  arrayMandas: { // 组件内全局数组
    arrayManda: [],
    picsBoxs: [],
    staging: '',// 暂存选择音乐名称
    stagingIds: 0, //暂存选择音乐id
    mainPoto: [],
  },
  pullText(e) { this.setData({ pullText: e.detail.value }) },
  
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

  radio(e) { this.setData({ upText: e.currentTarget.dataset.text }) },
  setRequires() { this.setData({ lookMusic:false })},
  merchantAddres(e) { this.setData({ merchantAddres: e.detail.value }) },
  replenish(e) { this.setData({ replenish: e.detail.value }) },
  contactTel(e) { this.setData({ contactTel: e.detail.value }) },
  merchantNum(e) { this.setData({ merchantNum: e.detail.value }) },
  activityIntroduce(e) { this.setData({ activityIntroduce: e.detail.value }) },
  activityRule(e) { this.setData({ activityRule: e.detail.value }) },
  contactName(e) { this.setData({ contactName: e.detail.value})},
  setPrice(e) { this.setData({ currentPrice: e.detail.value*1})},
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

  listenerRadioGroup(e){
    console.log(e.detail.value);
    let arr=e.detail.value;
    arr.unshift('姓名','电话')
    this.setData({ chooseArr:arr})
  },
  backMuisc(e) { //背景音乐设置
    if (e.detail.value) {
      this.setData({ showMusic: true, isFree:'收费' })
    } else {
      this.setData({ showMusic: false, isFree: '免费' })
    }
  },
  trueChoose() { //确定选中
    this.setData({lookMusic: true })
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
 
  Haha(states) {
    let drl = ''
    states.map((item) => {
      item.url
      drl = drl + item.url + ','
    })
    return drl
  },
  tooFalse() {
    let arrStr='';
    this.data.chooseArr.map((item) => { // 报名必填 字符串拼接
      arrStr = arrStr + item + ','
    });
      arrStr = arrStr.substr(0, arrStr.length - 1)
  
    var timestampstart = Date.parse(new Date(this.data.startdate)), timestampend = Date.parse(new Date(this.data.enddate))
    let Crl = this.Haha(this.data.mainFigure)
    let param = {
      'activityBase': {
        'actType': this.data.classType,       
        'title': this.data.pullText,//会议标题 
        'startDate': timestampstart,//会议开始 
        'endDate': timestampend,//会议结束     
        'registerMustField': arrStr,//报名必填  
        'latLongAddress': this.data.merchantAddres,//经纬度地址 
        'latitude': this.data.latitude, //
        'longitude': this.data.longitude,//
        'address': this.data.replenish,//选填地址 
        'description': this.data.activityIntroduce,//会议摘要 
        // 'rule': this.data.activityRule,
        'templateType': this.data.typesName, // 模板类型 
        'mainPic': Crl, //活动主图   
      },
      'buyAct': {
        'contactName': this.data.contactName, //联系人   
        'contactTel': this.data.contactTel, //联系方式   
        'currentPrice': this.data.currentPrice*100,//报名现价 
        'qty': this.data.merchantNum * 1,// 参会人数上限  
        'type': this.data.classType,//活动类型          
      }
    }
    let inputArr = [
      { dataSource: this.data.pullText, errMassage: '会议标题不能为空' },
      { dataSource: this.data.merchantAddres, errMassage: '地址不能为空' },
      { dataSource: this.data.merchantNum, errMassage: '参会人数上限不能为空' },
      { dataSource: this.data.contactName, errMassage: '联系人不能为空' },
      { dataSource: this.data.contactTel, errMassage: '联系方式不能为空' },
      { dataSource: Crl, errMassage: '活动主图不能为空' },
      { dataSource: this.data.activityRule, errMassage: '活动规则不能为空' },
    ]
    let massage = Create.formValidation(inputArr), okay = Create.timeCheck(this.data.startdate, this.data.enddate);
    if (massage != 'ok') {
      Create.prompt(massage)
    } else {
        //电话校验
        let tel = this.data.contactTel;
        let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        console.log(this.Trim(tel,'g'));
        tel = this.Trim(tel, 'g');
        if (tel.length!=11){
          Create.prompt('手机格式不正确');
          return
        }
        if (!myreg.test(tel)) {
          Create.prompt('手机格式不正确');
          return false;
        } 
       
        if (okay) {
          ajaxhelper.post(app.globalData.frontJSHost + 'buyAct/add', param, this, this.pushUp)
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
  Trim(str, is_global){ 
   var result;
   result = str.replace(/(^\s+)|(\s+$)/g, "");
   if (is_global.toLowerCase() == "g") {
   result = result.replace(/\s/g, "");
   }
   return result;
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
    checkLogin.login(this, function (res) {
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
        merchantAddres: shopInfor.latLongAddress,
        replenish: shopInfor.address,
        latitude: shopInfor.latitude,
        longitude: shopInfor.longitude,
        activityRule: '1.需如实填写姓名手机报名;\n2.参加成功后，凭成功二维码到店铺享受优惠。\n3.本次活动不可赠送或者转让，以实际报名信息为准;\n4.此次活动由商家发起与平台无关，活动解释权归本机构所有。'
      });
      this.getTitleList();
    })
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