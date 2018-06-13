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
    contactName: '',
    musicArr: [],
    isFree: '免费',
    chooseArr: ['姓名', '电话'],
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
    currentPrice: 0,
    activityIntroduce: '', //
    switches:false,
    showMusic: false, //  
    pics: [], //图片盒子
    goodsPhos: 0, //
    mainFigure: [], //
    mainf: [],
    chooseArr:[]
  },
  arrayMandas: { // 组件内全局数组
    arrayManda: [],
    picsBoxs: [],
    mainPoto: [],
  },

  //回显数据
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
        startdate: app.toDate(activityBase.startDate),//开始时间
        enddate: app.toDate(activityBase.endDate),//结束时间
        merchantAddres: activityBase.latLongAddress,//经纬度地址
        replenish: activityBase.address,//补充地址
        contactTel: buyAct.contactTel, //联系电话
        contactName: buyAct.contactName,//联系人姓名
        merchantNum: buyAct.remainQty,// 参会人数上限  
        activityIntroduce: activityBase.description,//摘要
        activityRule: activityBase.rule,//规则
        pullText: activityBase.title,    //标题
        currentPrice: (buyAct.currentPrice/100)   //报名费用
      })
    
      if (activityBase.registerMustField) {  //报名必填
        var arr = activityBase.registerMustField.split(',');

        console.log(arr)
        this.setData({ chooseArr: arr })
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
    
      //是否收费
      if (buyAct.currentPrice==0){
        this.setData({ isFree: '免费', switches: false, showMusic: false})
      }else{
        this.setData({ isFree: '收费', switches: true, showMusic: true})
      }
    } else {
      Create.prompt(res.msg)
    }

  },

  pullText(e) { this.setData({ pullText: e.detail.value }) },
  uptextGo(e) { this.setData({ upText: e.detail.value }) },
  mandaInput(e) { this.setData({ mandaText: e.detail.value }) },

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


  radio(e) { this.setData({ upText: e.currentTarget.dataset.text }) },
  setRequires() { this.setData({ lookMusic: false }) },
  merchantAddres(e) { this.setData({ merchantAddres: e.detail.value }) },
  replenish(e) { this.setData({ replenish: e.detail.value }) },
  contactTel(e) { this.setData({ contactTel: e.detail.value }) },
  merchantNum(e) { this.setData({ merchantNum: e.detail.value }) },
  activityIntroduce(e) { this.setData({ activityIntroduce: e.detail.value }) },
  activityRule(e) { this.setData({ activityRule: e.detail.value }) },
  contactName(e) { this.setData({ contactName: e.detail.value }) },
  setPrice(e) { this.setData({ currentPrice: e.detail.value * 1 }) },
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

  listenerRadioGroup(e) {
    console.log(e.detail.value);
    let arr = e.detail.value;
    arr.unshift('姓名', '电话')
    this.setData({ chooseArr: arr })
  },
  backMuisc(e) { //背景音乐设置
    if (e.detail.value) {
      this.setData({ showMusic: true, isFree: '收费'})
    } else {
      this.setData({ showMusic: false, isFree: '免费'})
    }
  },
  trueChoose() { //确定选中
    this.setData({ lookMusic: true })
  },
  musicClose() {
    this.setData({ lookMusic: true })
  },
  reg(a){
   console.log(a)
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
    let noChangeVal = this.data.noChangeData;  //不改变的值
    let arrStr = '';
    this.data.chooseArr.map((item) => { // 报名必填 字符串拼接
      arrStr = arrStr + item + ','
    });
    if (this.data.chooseArr.length > 2) {
      arrStr = arrStr.substr(0, arrStr.length - 1)
    }
    var timestampstart = Date.parse(new Date(this.data.startdate)), timestampend = Date.parse(new Date(this.data.enddate))
    let Crl = this.Haha(this.data.mainFigure)
    let param = {
      'activityBase': {
        'id': noChangeVal.activityBase.id,
        'actType': noChangeVal.activityBase.actType,    
        'title': this.data.pullText,//会议标题 
        'startDate': timestampstart,//会议开始 
        'endDate': timestampend,//会议结束     
        'registerMustField': arrStr,//报名必填  
        'latLongAddress': this.data.merchantAddres,//经纬度地址 
        'latitude': this.data.latitude, 
        'longitude': this.data.longitude,
        'address': this.data.replenish,//选填地址 
        'description': this.data.activityIntroduce,//会议摘要 
        // 'rule': this.data.activityRule,
        'templateType': noChangeVal.activityBase.templateType, // 模板类型 
        'mainPic': Crl, //活动主图   
      },
      'buyAct': {
        'id': noChangeVal.buyAct.id,
        'contactName': this.data.contactName, //联系人   
        'contactTel': this.data.contactTel, //联系方式   
        'currentPrice': this.data.currentPrice * 100,//报名现价 
        'qty': this.data.merchantNum * 1,// 参会人数上限 
        'type': noChangeVal.buyAct.type,//活动类型          
      }
    }
    let inputArr = [
      { dataSource: this.data.pullText, errMassage: '会议标题不能为空' },
      { dataSource: this.data.merchantAddres, errMassage: '地址不能为空' },
      { dataSource: this.data.merchantNum, errMassage: '参会人数上限不能为空' },
      { dataSource: this.data.contactName, errMassage: '联系人不能为空' },
      { dataSource: Crl, errMassage: '活动主图不能为空' },
      // { dataSource: this.data.activityRule, errMassage: '活动规则不能为空' },
    ]
    let massage = Create.formValidation(inputArr), okay = Create.timeCheck(this.data.startdate, this.data.enddate);
    if (massage != 'ok') {
      Create.prompt(massage)
    } else {
      if (okay) {
        ajaxhelper.post(app.globalData.frontJSHost + 'activityBase/update', param, this, this.pushUp)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pageId: options.ids,
    });
    this.getAjaxList();


    
    // this.setData({
    //   classType: options.activityType,
    //   startdate: starttime,
    //   enddate: endtime,
    //   typesName: wx.getStorageSync('names'),
    //   merchantAddres: shopInfor.latLongAddress,
    //   replenish: shopInfor.address,
    //   latitude: shopInfor.latitude,
    //   longitude: shopInfor.longitude,
    //   activityRule: '1.需如实填写姓名手机报名;\n2.参加成功后，凭成功二维码到店铺享受优惠。\n3.本次活动不可赠送或者转让，以实际报名信息为准;\n4.此次活动由商家发起与平台无关，活动解释权归本机构所有。'
    // });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // onReady: function () {
  //   this.audioCtx = wx.createAudioContext('itemBgm', this)
  // },

  onShow: function () {
    checkLogin.login(this, function (res) {
       this.setData({
      pageId: options.ids,
    });
    this.getAjaxList();

    })
  }

})