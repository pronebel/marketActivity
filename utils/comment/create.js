var app = getApp();
import ajaxhelper from '../../utils/ajaxhelper.js'
var commot = {
  formValidation: function (arrs) { //表单校验
    const validate = (value, errMassage) => {
      if (!value) {
        return errMassage
      }
      return 'success'
    }
    var massa
    for (let i = 0; i < arrs.length; i++) {
      const attr = arrs[i].dataSource
      const errMassage = arrs[i].errMassage
      const valdateMassage = validate(attr, errMassage)
      if (valdateMassage !== 'success') {
        massa = errMassage
        break
      } else {
        massa = 'ok'
      }
    }
    return massa
  },
  prompt(msg) { // 公共弹框提示函数
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  choseMusic(e,act) { //背景音乐选择
    let that = act, idx = e.currentTarget.dataset.index, mnames = e.currentTarget.dataset.name, ips = e.currentTarget.dataset.id
    var oldidx = that.data.currentidx, currentidx = e.currentTarget.dataset.index;
    that.data.musicArr[oldidx].bgm.types = 'circle'
    that.data.musicArr[oldidx].bgm.color = '#ccc'
    that.data.musicArr[currentidx].bgm.types = 'success'
    that.data.musicArr[currentidx].bgm.color = '#FF6B4E'
    that.setData({ currentidx: currentidx, musicArr: that.data.musicArr })
    that.arrayMandas.staging = mnames
    that.arrayMandas.stagingIds = ips
  },
  audition(e, act) { //试听功能
    let that = act, oldidx = that.data.musicidx, musicidx = e.currentTarget.dataset.index, ids = e.currentTarget.dataset.ids, urls = e.currentTarget.dataset.url
    if (oldidx == musicidx) { //点击同一个试听按钮时
      if (that.data.musicArr[musicidx].bgm.haveTry) {
        that.audioCtx.setSrc(urls)
        that.audioCtx.play()
      } else {
        that.audioCtx.seek(0)
        that.audioCtx.pause()
      }
    } else { //点击的非同一个按钮将上一关闭打开下一个
      that.audioCtx.setSrc(urls)
      that.data.musicArr[oldidx].bgm.haveTry = true
      that.audioCtx.play()
    }
    that.data.musicArr[musicidx].bgm.haveTry = !that.data.musicArr[musicidx].bgm.haveTry
    that.setData({ musicidx: musicidx, musicArr: that.data.musicArr })
  },
  successMusic(mine,states) {
    let mbps = states.data.result, mh = { types: 'circle', color: '#ccc', haveTry: true }, that = mine, nh = { types: 'success', color: '#FF6B4E', haveTry: true }
    if (states.bizCode == 200) {
      mbps.map((item, index) => {
        if (item.bgm.id == that.data.idsMusic) {
          that.arrayMandas.staging = item.bgm.name
          that.arrayMandas.stagingIds = item.bgm.id
          Object.assign(item.bgm, nh)
          that.setData({ currentidx: index })
        } else {
          Object.assign(item.bgm, mh)
        }
      })
      that.setData({ musicArr: mbps })
    }
  }, 
  mathSign: function(num, rank = 6) {
    if (!num) return (0);
    const sign = num / Math.abs(num);
    const number = num * sign;
    const temp = rank - 1 - Math.floor(Math.log10(number));
    let ans;
    if (temp > 0) {
      ans = parseFloat(number.toFixed(temp));
    } else if (temp < 0) {
      const temp = Math.pow(10, temp);
      ans = Math.round(number / temp) * temp;
    } else {
      ans = Math.round(number);
    }
    return (ans * sign);
  },
  getNowFormatDate: function() { //获取当前时间日期
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },
  timeCheck: function(time1,time2){ //时间判断
    var nowTime = Date.parse(new Date(this.getNowFormatDate()))/1000, startTime = Date.parse(new Date(time1)) / 1000, endTime = Date.parse(new Date(time2)) / 1000, qualified = false
    if (startTime < endTime){
      if (startTime-nowTime<7776000){
        if (endTime-startTime<7776000){
          qualified = true
        }else {
          qualified = false
          this.prompt('结束时间需大于开始时间并且不能大于90天')
        }
      }else {
        qualified = false
        this.prompt('开始时间需大于当前时间并且不能大于90天')
      }
    } else {
      qualified = false
      this.prompt('开始时间需小于结束时间')
    }
    return qualified
  },
  sloganChoose: function (mine,types) { //标题选择
    let param = {
      pageSize: 10,
      pageNo: 1,
      keyword: types
    }, that = mine 
    ajaxhelper.post(app.globalData.frontJSHost + 'titleTemplate/queryPage', param, mine, function(res){
      let Tdata = res.data;
      if (Tdata && Tdata.result) {
        mine.setData({
          titleData: Tdata.result
        })
      }
    })
  }
}

export default commot;
