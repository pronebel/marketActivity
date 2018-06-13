var app = getApp();
import ajaxhelper from '../../../utils/ajaxhelper.js';
Page({
  data: {
    currentId: '',
    msg:"",
    dataList:[],
    chooseId:'',
    mark:'',
    role:'',
    sign:'USING'

  },
  onLoad: function (options) {
    this.getListData();//获取列表数据
  },
  
  getListData() {
    let param = {
    }
    ajaxhelper.post(app.globalData.frontJSHost + 'member/selectList', param, this, function (res) {
      console.log(res);
      if (res.bizCode == 200) {
        var result = res.data;
        this.setData({
          dataList: result
        })
      } else {
        wx.showToast({
          title: !!res.msg ? res.msg : "请求出错",
          icon: "loading"
        })
      }
    })
  },

  showcode: function (e) {
    if (this.data.currentId == e.currentTarget.dataset.id) {
      this.setData({
        currentId: ''
      })
    } else {
      this.setData({
        currentId: e.currentTarget.dataset.id
      })
    }


    console.log(this.data.currentId)
  },
  //选择
  swiperChange: function (e) {
    console.log( e.detail.value);
    let i = e.detail.value;
    this.setData({
      chooseId: this.data.dataList[i].id,
      mark: this.data.dataList[i].description,
      role: this.data.dataList[i].role,
      sign: this.data.dataList[i].status
    })
  
  },
  pop:function(e){
    let that=this;
    console.log(e.currentTarget.dataset.name);
    let name = e.currentTarget.dataset.name;
    if (name == "edit"){
      this.setData({
        msg: "编辑"
      })
    } else if (name == "turnOn" && that.data.sign=="USING") {
      this.setData({
        msg: "禁用"
      })
    } else if (name == "turnOn" && that.data.sign != "USING") {
      this.setData({
        msg: "启用"
      })
    }else{
      this.setData({
        msg: "删除"
      })
    }
    var chooseId = this.data.chooseId;
    if (chooseId===''){
      wx.showToast({
        title: "未选择",
        icon: "loading"
      })
      return
    }
    wx.showModal({
      title: this.data.msg+'提示',
      content: '您确定要' + this.data.msg+'此帐号',
      showCancel: true,
      confirmColor: '#FF6B4E',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          if (name == "edit") {
            let id = that.data.chooseId;
            let mark = that.data.mark;
            let role = that.data.role;
            wx.redirectTo({
              url: '../subAccount_save/subAccount_save?id=' + chooseId + '&mark=' + mark + '&role=' + role + '&type=edit'
            })
          } else if (name == "turnOn"){
            that.changeStatus();
          }else{
            that.deleteIt();
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  scan:function(){
    wx.scanCode({
      success: (res) => {
        console.log(res);
        var id=res.result;
        let param={
        }
        ajaxhelper.get(app.globalData.frontJSHost + 'member/checkAddSon/' + id, param, this, function (res) {
          console.log(res);
          if (res.bizCode == 200) {
            wx.redirectTo({
              url: '../subAccount_save/subAccount_save?id=' + id + '&type=add'
            })
          } else {
            wx.showToast({
              title: !!res.msg ? res.msg : "请求出错",
              icon: "loading"
            })
          }
        })
       
      }
    })
  },
 //启用、禁用
  changeStatus:function(){
    var chooseId = this.data.chooseId;
    var that=this;
    let param = {
    }
    ajaxhelper.get(app.globalData.frontJSHost + 'member/changeStatus/' + chooseId, param, this, function (res) {
      console.log(res);
      if (res.bizCode == 200) {
        that.getListData();//获取列表数据
        if (that.data.sign =='USING'){
           that.setData({
            sign:'FORBIDDEN'
           }) 
        }else{
          that.setData({
            sign:'USING'
          }) 
        }
      } else {
        wx.showToast({
          title: !!res.message.global ? res.message.global : "请求出错",
          icon: "loading"
        })
      }
    })
  },
  //删除
  deleteIt:function(){
    var chooseId = this.data.chooseId;
    var that = this;
    let param = {
    }
    ajaxhelper.get(app.globalData.frontJSHost + 'member/deleteSon/' + chooseId, param, this, function (res) {
      console.log(res);
      if (res.bizCode == 200) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        });
        setTimeout(function () {
          that.getListData();//获取列表数据
        }, 2000)
        
      } else {
        wx.showToast({
          title: !!res.message.global ? res.message.global : "请求出错",
          icon: "loading"
        })
      }
    })
  }

})