var app = getApp();
import ajaxhelper from '../../../utils/ajaxhelper.js';
Page({
  data: {
    iconSizes: [70],
    iconColor: ['red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'],
    iconType: ['success', 'info', 'warn', 'waiting', 'safe_success', 'safe_warn',
      'success_circle', 'success_no_circle', 'waiting_circle', 'circle', 'download',
      'info_circle', 'cancel', 'search', 'clear'],
    description:'',
    role:'SHOPKEPPER',
    id:'',
    type:''  

  },
  onLoad: function (e) {
    console.log(e.id);
    console.log(e.role);
    console.log(e.type);
    if (e.role){
      this.setData({
        role: e.role,
      })
    }
    this.setData({
      id: e.id,
      description: e.mark,
      type: e.type
    })
  },
  listenName:function(e){
    console.log(e.detail.value);
    this.setData({
      description: e.detail.value
    })
  },
  swiperChange:function(e){
    console.log(e.detail.value);
    this.setData({
      role: e.detail.value
    })
  },
  //保存
  save:function(){
    if(this.data.type=='add'){
      var nurl = 'member/addSon';
      var title ='添加成功'
    }else{
      var nurl = 'member/updateSon';
      var title = '编辑成功'
    }
    console.log(this.data.role)
    if (this.data.description){
      let param = {
        description: this.data.description,
        role: this.data.role,
        id: this.data.id
      };
      ajaxhelper.post(app.globalData.frontJSHost + nurl, param, this, function (res) {
        console.log(res);
        if (res.bizCode == 200) {
          wx.showToast({
            title: title,
            icon: 'success',
            duration: 2000
          });
          setTimeout(function () {
            wx.redirectTo({
              url: '../subAccount_List/subAccount_List'
            })
          }, 2000)

        } else {
          wx.showToast({
            title: !!res.msg ? res.msg : "请求出错",
            icon: "loading"
          })
        }
      })
    }else{
      wx.showToast({
        title: "备注必填",
        icon: "loading"
      })
    }
   
  }
})