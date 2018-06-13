var app = getApp();
import ajaxhelper from '../../../utils/ajaxhelper.js';
Page({
  data: {
    url: ""
  },
  onLoad: function (options) {
    this.getListData();//获取列表数据
  },
  getListData() {
    let param = {
    }
    ajaxhelper.get(app.globalData.frontJSHost + 'member/beShopSon', param, this, function (res) {
      console.log(res);
      if (res.bizCode == 200) {
        var url = res.data;
        this.setData({
          url: res.data
        })
      } else {
        wx.showToast({
          title: !!res.message.global ? res.message.global : "请求出错",
          icon: "loading"
        })
      }
    })
  },
  onUnload: function () {
    console.log('index---------onUnload')
      let param = {}
      ajaxhelper.get(app.globalData.frontJSHost + 'member/select', param, this, this.thatMineInfor)
  },
  thatMineInfor(states) {
    if (states.bizCode) {
      console.log(states.data.member)
      // this.setData({ member: states.data.member })
        wx.setStorage({
          key: 'member',
          data: states.data.member,
        })
      
    }
  },
})