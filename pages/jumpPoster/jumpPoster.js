var app = getApp();

Page({
  data: {
    url: ''
  },

  onLoad: function (options) {
    var qrcode = encodeURIComponent(options.qrcode);
    var title = encodeURIComponent(options.title || '');
    var mainPic = encodeURIComponent(options.mainPic);
    this.setData({
      qrcode,
      mainPic,
      title,
      url: 'https://cc.lingkc.com/cc-knowledge-web/redirect/huodongPoster?mainPic=' + mainPic + '&title=' + title +'&qrcode='+qrcode,
    })
    console.log(options.qrcode)
    console.log(options.title)
    console.log(options.mainPic)
  },
})