var app = getApp()

import ajaxhelper from '../../utils/ajaxhelper.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    adcType: '', //页面传值
    adcId: '', //页面传值
    recordData: [], // 列表数据
    pageNo: 1, //页码
    recordScreen: 'diu', //筛选状态
    recordSc: null,
    telPhone: '', //电话查询
    hasArat: false,
    all:'',
    not:'',
    ready:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ adcType: options.actType, adcId: options.activityId })
    this.recordList();
    this.getNum()
  },
  
  telPhones(e){this.setData({ telPhone: e.detail.value })},
  getNum(){
    let id= this.data.adcId;
    var param={}
    ajaxhelper.get(app.globalData.frontJSHost + 'activityBase/countRoster/'+id, param, this, this.pushNum)
  },
  pushNum(res){
    if (res.status){
      this.setData({
        all: res.data.count,
        not: res.data.countNotVerification,
        ready: res.data.countHasVerification
      })
    }
  },
  recordList () {
    if (this.data.recordScreen == 'diu'){
      this.setData({ recordSc: null })
    }
    let param = {
      "pageNo": this.data.pageNo,
      "pageSize": 10,
      "actType": this.data.adcType,
      "mobile": "",
      "activityId": this.data.adcId*1,
      'commonStatus': this.data.recordSc
    }
    ajaxhelper.post(app.globalData.frontJSHost + 'activityBase/roster', param, this, this.recordShowList)
  },
  recordShowList (states) {
    let showList = states, pageNo = this.data.pageNo
    if(showList.bizCode == 200) {
      this.setData({ pageNo: ++pageNo, hasArat: false })
      if(showList.data.result) {
        showList.data.result.map((item) => {
          item.gmtCreate = this.toDate(item.gmtCreate);
          item.verificationTime == null ? item.verificationTime = '' : item.verificationTime = this.toDate(item.verificationTime);
          item.isShow = false
        })
      }
      if (showList.data.result){
        this.setData({ recordData: this.data.recordData.concat(showList.data.result) })
      }
     
    }
  },

  recordTar(e) {
    this.setData({ recordData: [], pageNo: 1, recordScreen: e.currentTarget.dataset.index, })
    var abc
    if (e.currentTarget.dataset.index == 'diu'){
      abc = null
    }else {
      abc = e.currentTarget.dataset.index
    }
    let param = {
      "pageNo": this.data.pageNo,
      "pageSize": 10,
      "actType": this.data.adcType,
      "mobile": "",
      "activityId": this.data.adcId * 1,
      'commonStatus': abc
    }
    ajaxhelper.post(app.globalData.frontJSHost + 'activityBase/roster', param, this, this.recordShowList)
  },

  telPhoneSeach() {
    console.log(this.data.recordScreen)
    this.setData({ pageNo: 1 })
    var abc
    if (this.data.recordScreen == 'diu') {
      abc = null
    } else {
      abc = this.data.recordScreen
    }
    let param = {
      "pageNo": this.data.pageNo,
      "pageSize": 10,
      "actType": this.data.adcType,
      "mobile": this.data.telPhone,
      "activityId": this.data.adcId * 1,
      'commonStatus': abc
    }
    ajaxhelper.post(app.globalData.frontJSHost + 'activityBase/roster', param, this, this.telSuccess)
  },

  telSuccess(res) {
    this.setData({ recordData: [] })
    this.recordShowList(res)
  },

  toDate(number){  
    let n= number;  
    let date = new Date(n);  
    let Y = date.getFullYear() + '-';  
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';  
    let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();  
    return(Y+ M + D)
  }, 
  
  packUp() { //收起

  },
  showDown(e) {
    let inde = e.currentTarget.dataset.index
    let toggle = this.data.recordData[inde].isShow
    this.data.recordData[inde].isShow = !toggle
    this.setData({
      recordData: this.data.recordData
    })
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
    checkLogin.login(this, function (res) {
      this.setData({ adcType: options.actType, adcId: options.activityId })
      this.recordList();
      this.getNum()
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
    if(this.data.hasArat) {return false}
    this.setData({ pageNo: 1, recordData: [], hasArat: true, recordScreen: 'diu'  })
    this.recordList()
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 1400);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasArat) { return false }
    this.recordList()
  },

})