var app = getApp();
import ajaxhelper from '../../utils/ajaxhelper.js';

Page({
  data: {
    selected1: true,
    selected2: false,
    // currentTab: 0, //预设当前项的值,
    keyword: "WAIT_WITHDRAW",
    dataList: [],//列表数据
    hasRefresh: false,
    isGetMore: false,
    hasMore: true,
    pageSize: 5,
    pageNo: 1,
    isShow: false,//是否显示没有列表的提示图
   
  },
  selected1: function (e) {
    this.setData({
      selected2: false,
      selected1: true,
      keyword:"WAIT_WITHDRAW"
    }),
      this.setData({
        dataList: [],
        pageNo:1
      })
      this.getListData()
  },
  selected2: function (e) {
    this.setData({
      selected1: false,
      selected2: true,
      keyword: "SUCCESS_WITHDRAW"
    }),
      this.setData({
        dataList: [],
        pageNo: 1
      })
      this.getListData()
  },
  onLoad: function (options){
    this.getListData();//获取列表数据
  },

  getListData() {
    console.log(this.data.keyword)
    let param = {
      "pageNo": this.data.pageNo,
      "pageSize":5,
      "keyword": this.data.keyword
    }
    ajaxhelper.post(app.globalData.frontJSHost + '/withdraw/queryPage' , param, this, function (res) {
      console.log(res);
      if (res.bizCode==200) {
        var result = res.data.result;
        var length = result.length;
        console.log(length)
        var pageNo = this.data.pageNo;
        var hasmore = res.data.totalCount - pageNo * res.data.pageSize;
        this.setData({
          pageNo: ++pageNo,
          hasRefresh: false,
          isGetMore: false,
          hasMore: hasmore
        })

        for (var i = 0; i < length; i++) {
          var gmtCreate = result[i].gmtCreate;
          var time = new Date(gmtCreate).format("yyyy-MM-dd hh:mm:ss");
          result[i].time = time;
        } 
        if (res.data && result) {
          this.setData({
            dataList: this.data.dataList.concat(result)
          })
        }
      } else {
        this.setData({
          hasRefresh: false,
          isGetMore: false,
        })
        wx.showToast({
          title: !!res.message.global ? res.message.global : "请求出错",
          icon: "loading"
        })
      }
      this.setData({
        isShow: true
      })
    })
  },

  //下拉刷新
  onPullDownRefresh() {
    this.setData({
      isShow: false
    })
    if (this.data.hasRefresh) return false;
    this.setData({
      dataList: [],
      hasRefresh: true,
      pageNo: 1
    })
    this.getListData()
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 1400);

  },
  //上拉加载
  onReachBottom() {
    if (this.data.isGetMore) return false;
    if (this.data.hasRefresh) return false;
    if (this.data.hasMore > 0) {
      this.setData({
        isGetMore: true,
        // tip: '正在加载中...'
      })
      this.getListData();
    } else {
      this.setData({
        isGetMore: false,
        // tip: '没有更多数据了...'
      })
      return false
    }
  },
  // 点击标题切换当前页时改变样式
  // swichNav: function (e) {
  //   var that = this;
  //   var id = e.currentTarget.dataset.id;
  //   var cur = e.currentTarget.dataset.current;
  //   if (this.data.currentTab == cur) { return false; }
  //   else {
  //     this.setData({
  //       currentTab: cur,
  //       subjectId: id,
  //       dataList: [],
  //       pageNo: 1
  //     })
  //   }
  //   this.getListData();//获取列表数据
  // }
})

