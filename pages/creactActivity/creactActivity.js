var app = getApp();

import ajaxhelper from '../../utils/ajaxhelper.js'
import Create from '../../utils/comment/create.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: '',
    startdate: "",
    enddate: '',
    activityTypes: true,
    classType: '',
    titleData: '',
    guige_key: '',
    bounces: true,
    showMusic: false, //音乐选择框
    pullText: '', //活动标题
    upText: '', //设置标题
    mandatory: [], //必填信息添加array
    mandaText: '', // 必填名称
    mandaTo: true,
    must: '',
    pics: [], //图片盒子
    picsBox: [], //图片返回地址盒子
    sword: true,
    leave: false,
    photoNum: 0,
    carenPrice: '', //商品原价
    fullNot: 1,
    merchantAddres: '',
    storeName: '',
    replenish: '', // 补充地址
    latitude: '', // 精度
    longitude: '', // 纬度
    activityIntroduce: '', // 活动介绍
    preferential: 0, //团长优惠
    merchantNum: '', // 商品数量
    seviceTel: '', // 服务电话
    activityRule: '', // 活动规则
    speltPrice: '', // 拼团价格
    speltNum: '', //拼团人数
    advance: true, // 预付款状态
    advanceCharge: '', //预付款值
    goodsPhoto: '', // 商品图片
    goodsPhos: 0, // 商品图片个数
    maxEveryoneBuyCount: 1, //限购人数
    merchantName: '', //商品名称
    cutOriginal: '', // 砍价原价
    cutFloor: '', // 砍价底价
    startAt: '', // 价格区间起价
    endAt: '', // 价格区间最高
    typesName: '', //
    pictwo: '', //
    placehold: false, //
    recommendActivities: true, //是否同店活动
    rulesd: '',
    currentidx: 0,
    musicidx: 0,
    lookMusic: true, //音乐选择
    musicArr: [],
    musicUrl: '',
    isMusic: '告白气球',
    idsMusic: 1, //默认音乐id
  },
  arrayMandas: { // 组件内全局数组
    arrayManda: [],
    picsBoxs: [],
    staging: '',// 暂存选择音乐名称
    stagingIds: 0, //暂存选择音乐id
  },
  bindstartDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startdate: e.detail.value
    })
  },
  bindendDateChange: function (e) {
    this.setData({
      enddate: e.detail.value
    })
  },
  switchTitleChange: function (e) {
    this.setData({ recommendActivities: e.detail.value })
  },
  switchAllChange: function (e) {
    let ro;
    e.detail.value ? (ro = 1, this.setData({ advance: true })) : ( ro =0, this.setData({ advance: false }) ); 
    this.setData({ fullNot: ro })
  },
  // input获取值

  uptextGo(e) { this.setData({ pullText: e.detail.value })},

  mandaInput(e) { this.setData({ mandaText: e.detail.value }) },
  carenPrice(e) { this.setData({ carenPrice: e.detail.value }) },
  preferential(e) { this.setData({ preferential: e.detail.value }) },
  speltNum(e) { this.setData({ speltNum: e.detail.value }) },
  speltPrice(e) { this.setData({ speltPrice: e.detail.value }) },
  merchantAddres(e) { this.setData({ merchantAddres: e.detail.value }) },
  storeName(e) { this.setData({ storeName: e.detail.value }) },
  replenish(e) { this.setData({ replenish: e.detail.value }) },
  seviceTel(e) { this.setData({ seviceTel: e.detail.value }) },
  merchantNum(e) { this.setData({ merchantNum: e.detail.value }) },
  activityIntroduce(e) { this.setData({ activityIntroduce: e.detail.value }) },
  activityRule(e) { this.setData({ activityRule: e.detail.value }) },
  advanceCharge(e) { this.setData({ advanceCharge: e.detail.value }) },
  maxEveryoneBuyCount(e) { this.setData({ maxEveryoneBuyCount: e.detail.value }) },
  merchantName(e) { this.setData({ merchantName: e.detail.value }) },
  startAt(e) { this.setData({ startAt: e.detail.value }) },
  endAt(e) { this.setData({ endAt: e.detail.value }) },
  cutOriginal(e) { this.setData({ cutOriginal: e.detail.value }) },
  cutFloor(e) { this.setData({ cutFloor: e.detail.value }) },

  // 

  getTitleList: function () {
    let param = {
      pageSize: 10,
      pageNo: 1,
      keyword: this.data.classType
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
  //
  // 图片上传功能

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
            if(states.status) {
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

  swordCamera: function() {
    let r = this.data.picsBox;
    this.arrayMandas.picsBoxs.splice(this.arrayMandas.picsBoxs.length - 1, 1)
    r.splice(r.length-1,1);
    this.setData({
      picsBox: r,
      photoNum: r.length
    })
    if(this.data.picsBox.length<9){
      this.setData({
        leave: false
      })
    }
  },
  addCamera () { //照片上传
    let that = this, pics = this.data.pics, theNum = 9 - this.data.picsBox.length*1;
    wx.chooseImage({
      count: theNum, // 可传图片张数
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'], 
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var imgsrc = res.tempFilePaths;
        pics = pics.concat(imgsrc);
        that.setData({ pics: pics });
        that.uploadimg ({
          url: app.globalData.frontJSHost + 'uploadImageFiles',
          path: that.data.pics
        });
      }
    })
  },
  //多张图片上传
  uploadimg (data) {
    var that = this, pics = that.data.pics,
    i=data.i ? data.i : 0,
    success=data.success ? data.success : 0,
    fail=data.fail ? data.fail : 0;
    console.log(data.path,789);
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'files',//这里根据自己的实际情况改
      success: (resp) => {
        success++;
        let states = JSON.parse(resp.data)
        if(states.status) {
          console.log(states.data);
          // 将返回的路径push进数组
          console.log(that);
          that.arrayMandas.picsBoxs = that.arrayMandas.picsBoxs.concat(states.data[0])
          // that.arrayMandas.picsBoxs.push(states.data[0]);
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
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }

      }
    });
  },

  backMuisc(e) { //背景音乐设置
    if(e.detail.value){
      this.setData({ showMusic: true })
    }else {
      this.setData({ showMusic: false })
    }
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
    this.audioCtx.seek(0)
    this.audioCtx.pause()
    this.setData({ lookMusic: true })
  },

  // 获取该组件的id  
  radio (e) {
    this.setData({
      pullText: e.currentTarget.dataset.text
    })
  },

  addBtn (e) { //必填添加
    this.setData({
      mandaTo: false,
      mandaText: ''
    })
  },

  titleTrue (e) { // 模态框确定
    this.setData({
      bounces: true,
      pullText: this.data.pullText
    })
  },

  chooseAddre () {
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

  issue () { // 发布
    let mandnames = '姓名,电话,',drl = '';
    this.data.mandatory.map( (item)=> { // 报名必填 字符串拼接
      mandnames = mandnames + item.name + ','
    });
    console.log(this.data.startdate)
    var timestampstart = Date.parse(new Date(this.data.startdate));
    var timestampend = Date.parse(new Date(this.data.enddate));

    this.data.picsBox.map((item)=> {
      item.url
      drl = drl + item.url + ','
    })
    let resBgm = 0
    this.data.showMusic && (resBgm = 1)
    //
    let postData = {
      'activityBase': {
        'actPics': drl, //活动图片
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
        'mainPic': this.data.goodsPhoto, //活动详情图
        'recommendActivities': this.data.recommendActivities, // 同店活动
        'hasBgm': resBgm,
        'bgmId': this.data.idsMusic
      },
      'tuanAct': {
        'advanceCharge': this.data.advanceCharge*100, // 预付款
        'allOrPart': this.data.fullNot,
        'headerFavour': this.data.preferential*100,
        'maxStockCount': this.data.merchantNum*1, // 商品数量
        'maxEveryoneBuyCount': this.data.maxEveryoneBuyCount, //限购数量
        'originPrice': this.data.carenPrice*100,
        'productName': this.data.merchantName,
        // 'productPics': this.data.goodsPhoto, //活动图片
        'tuanSize': this.data.speltNum,
        'tuanPrice': this.data.speltPrice*100,
      },
      "bargainAct" : {
        "maxStockCount": this.data.merchantNum*1,
        "originPrice": this.data.cutOriginal*100,  // 原价
        "cutMinPrice": this.data.cutFloor*100,   // 底价
        // "productUnit": "",
        "productName": this.data.merchantName,
        // "productImg": this.data.goodsPhoto, // 活动图片
        "minEveryCut": this.data.startAt*100, // 范围值
        "maxEveryCut": this.data.endAt*100
      }
    };
    let inputArr = [
      { dataSource: this.data.pullText, errMassage:'活动标题不能为空'},
      { dataSource: this.data.storeName, errMassage: '店铺名称不能为空' },   
      { dataSource: this.data.merchantAddres, errMassage: '地址不能为空' },
      { dataSource: this.data.merchantName, errMassage: '商品名称不能为空' },
      { dataSource: this.data.merchantNum, errMassage: '商品数量不能为空' },
      { dataSource: this.data.activityIntroduce, errMassage: '活动介绍不能为空' },
      { dataSource: this.data.goodsPhoto, errMassage: '商品图片不能为空' },
      { dataSource: this.data.picsBox, errMassage: '活动图片不能为空' },
      { dataSource: this.data.activityRule, errMassage: '活动规则不能为空' }
    ]
    let tuanArr = [
      { dataSource: this.data.carenPrice, errMassage: '商品原价不能为空' },
      { dataSource: this.data.speltNum, errMassage: '拼团人数不能为空' },
      { dataSource: this.data.speltPrice, errMassage: '拼团价格不能为空' },
      { dataSource: this.data.maxEveryoneBuyCount, errMassage: '限购数量不能为空' }
    ]
    let kanArr = [
      { dataSource: this.data.cutOriginal, errMassage: '原价不能为空' },
      { dataSource: this.data.cutFloor, errMassage: '底价不能为空' },
    ]
    let okay = Create.timeCheck(this.data.startdate, this.data.enddate);
    if (this.data.activityTypes){ //砍价
      let newArr = inputArr.concat(kanArr)
      let massage = this.formValidation(inputArr)
      let chaPrice = (this.data.cutOriginal - this.data.cutFloor) * 100 - (this.data.endAt - this.data.startAt)*100
      if (okay) {
        if (massage !== 'ok') {
          wx.showToast({ title: massage, image: '../../images/tishi.png', duration: 2000 })
        } else {
          if (this.data.cutFloor*1>0){
            if (this.data.startAt * 100 < this.data.endAt * 100) {
              if (this.data.endAt * 100 < this.data.cutOriginal * 100){
                if (this.data.cutOriginal*100 > this.data.cutFloor*100){
                  if (chaPrice>=0){
                    ajaxhelper.post(app.globalData.frontJSHost + 'activityBase/add', postData, this, this.pushUp)
                  }else {
                    Create.prompt('砍价区间差值需小于原价底价差值')
                  }
                } else { Create.prompt('底价不能大于原价') }
              } else { Create.prompt('区间最大值不能大于原价') }   
            }else{
              Create.prompt('请正确填写砍价区间')
            }
          }else { Create.prompt('砍价底价需大于0')}
        }
      }
      
    }else { //拼团
      let newArr = inputArr.concat(tuanArr)
      let massage = this.formValidation(newArr)
      if (okay) {
        if (massage !== 'ok') {
          wx.showToast({ title: massage, image: '../../images/tishi.png', duration: 2000 })
        } else {
          if (this.data.maxEveryoneBuyCount * 1>0){
          if (this.data.preferential * 100 < this.data.speltPrice*100){
            if (this.data.merchantNum * 1 > this.data.speltNum*1){
              if (this.data.carenPrice * 100 > this.data.speltPrice * 100) {
                if (this.data.carenPrice * 100 > this.data.preferential * 100){
                  if (this.data.merchantNum * 1 > (this.data.speltNum * this.data.maxEveryoneBuyCount*1)){
                    if (this.data.advance){// 是否全额支付打开 
                      ajaxhelper.post(app.globalData.frontJSHost + 'activityBase/add', postData, this, this.pushUp)
                    }else {//不全额支付 判断预付款需大于团长优惠低于拼团价格
                      if (this.data.advanceCharge * 1 > this.data.preferential * 1 && this.data.advanceCharge * 1 < this.data.speltPrice) { ajaxhelper.post(app.globalData.frontJSHost + 'activityBase/add', postData, this, this.pushUp) }else {
                        Create.prompt('预付款>团长优惠并且预付款小于拼团价格')
                      }
                    }
                  } else { Create.prompt('拼团人数×限购数量＜商品数量')}
                }else {
                  Create.prompt('商品原价需大于团长优惠')
                }
              }else{
                Create.prompt('商品原价需大于拼团价格')
              }
            }else {
              Create.prompt('商品数量需大于拼团人数')
            }
          }else {
            Create.prompt('拼团价格应大于团长优惠')
          }
          }else {Create.prompt('限购数量需大于0')}
        }
      }
      // else {
      //   wx.showModal({
      //     title: '提示',
      //     content: '活动时间设置有误',
      //     success: function (res) {
      //       if (res.confirm) {}
      //     }
      //   })
      // }
    }
  },
  formValidation(arrs){ //表单校验
    const validate = ( value, errMassage ) => {
      if(!value){
        return errMassage
      }
      return 'success'
    }
    var massa
    for(let i=0; i<arrs.length;i++){
      const attr = arrs[i].dataSource
      const errMassage = arrs[i].errMassage
      const valdateMassage = validate(attr, errMassage)
      if (valdateMassage !== 'success'){
        massa = errMassage
        break
      }else {
        massa = 'ok'
      }
    }
    return massa
  },
  pushUp (states) {
    if(states.bizCode == 200) {
      wx.redirectTo({
        url: '../administerList/administerList',
      })
    }
  },

  mandaSub () { //必填提交
    if (this.data.mandaText){
      this.arrayMandas.arrayManda.push({name:this.data.mandaText});
      this.setData({
        mandaTo: true,
        mandatory: this.arrayMandas.arrayManda
      });
    }else {
      wx.showToast({
        title: '输入不能为空',
        duration: 2000
      })
    }
  },

  removeMe (e) { //必填删除
    let index = e.currentTarget.dataset.key;
    this.arrayMandas.arrayManda.splice(index, 1);
    this.setData({
      mandatory: this.arrayMandas.arrayManda
    })
  },

  choiseTles (e) {
    this.setData({
      bounces: false,
      placehold: false
    })
  },
  onBlur() {
    // this.setData({ placehold: '不超过30个字' })
  },
  shutDown() { //关闭标题模态框
    this.setData({ bounces: true })
  },
  // 
  fun_date(aa) {
    var date1 = new Date(),time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();//time1表示当前时间
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + aa);
    var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
  },
  choseMusic(e) {
    let at = this
    Create.choseMusic(e, at)
  },
  trueChoose() { //确定选中
    this.setData({ isMusic: this.arrayMandas.staging, idsMusic: this.arrayMandas.stagingIds, lookMusic: true })
    this.audioCtx.seek(0)
    this.audioCtx.pause()
  },
  audition(e){
    let at = this
    Create.audition(e, at)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let m = new Date();
    let starttime = m.format('yyyy-MM-dd')
    var thisdate = Date.parse(new Date(starttime))
    var weekdate = thisdate*1 + 604800000
    var endtime = new Date(parseInt(weekdate)).format('yyyy-MM-dd')
    let shopInfor = wx.getStorageSync('shop')
    this.setData({
      classType : options.activityType,
      startdate : starttime,
      enddate: endtime,
      typesName: wx.getStorageSync('names'),
      pictwo: wx.getStorageSync('pictwo'),
      seviceTel: shopInfor.mobile,
      merchantAddres: shopInfor.latLongAddress,
      replenish: shopInfor.address,
      latitude: shopInfor.latitude,
      longitude: shopInfor.longitude,
    });
    if (this.data.classType == "BARGAIN") {
      this.setData({
        activityTypes : true,
        activityRule: '1. 点击我要参加进行报名。报名时候请在备注栏填写收货地址(如需要)；\n2. 每个人只能砍价一次，自己不能给自己砍价；\n3. 砍到自己心仪的价格即可购买，活动以付款成功为准，砍到底价后请及时付款，避免商品售完造成无法购买；\n4. 如有问题请及时联系我们，详细联系方式见活动页面商家信息栏；\n5. 本次活动的优惠资格不可赠送或转让；活动解释权归本机构所有。'
      })
      wx.setNavigationBarTitle({
        title: '砍价活动'
      })
    } else {
      this.setData({
        activityTypes : false,
        activityRule: '1. 点击我要开团或单独开团，可以发起一个新的团。点击我要参与或未满团推荐的团即可参与好友或其他已发起的团；\n2. 填写信息，并付款成功即参团或开团成功；\n3. 如开团提示“活动太火爆，名额已满”，你可以选择参与页面推荐的未满团，或者联系商家增加商品数量；\n4. 活动时间内人数达到所选参团人数，组团成功，活动结束仍未达参团人数则拼团失败；\n5. 拼团失败的的订单，系统将在活动结束后3-5个工作日内原路退回至原支付的微信钱包；\n6. 若人为因素刷单等恶意参与, 本机构有权解除团员参与资格；\n7.本次活动的优惠资格不可赠送或转让；活动解释权归本机构所有；'
      })
      wx.setNavigationBarTitle({
        title: '拼团活动'
      })
    };
    this.getTitleList();
  },

  sDown() {
    this.setData({ mandaTo: true})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('itemBgm',this)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    
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