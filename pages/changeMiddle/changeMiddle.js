// pages/changeMiddle/changeMiddle.js
var app = getApp();
var orderId ='';
const utils = require('../../utils/util.js');


const ctx = wx.createCanvasContext('myCanvas')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  canvasShow:false,
   text_x: 58, //x轴
   text_y:97, //y轴
   imageWidth:0,
   imageHeight:0,
   imageUrl: '../../images/changeBag1.jpg',  // 生成的图片路径
   showst:false, //是否完成图片和文字的填入
   userName:'万先生不太拽',
   userImageUrl:'../../images/share.jpg',
   tempFilePath:'',
   orderId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 打开调试
    wx.setEnableDebug({
      enableDebug: true
    })
    if (options.orderId) {
    console.log('options--options',options);
    console.log('传递订单号',options.orderId);
      console.log('传递背景标识',options.seleBg);
      orderId = options.orderId;
      if (options.seleBg == '1') {
      this.setData({
          imageUrl:'../../images/changeBag1.jpg'
        })
      }
      if (options.seleBg == '2') {
      this.setData({
          imageUrl:'../../images/changeBag2.jpg'
        })
      }
      if (options.seleBg =='3' ) {
      this.setData({
          imageUrl:'../../images/changeBag3.jpg'
        })
      }
      if (options.seleBg == '4') {
      this.setData({
          imageUrl:'../../images/changeBag4.jpg'
        })
      }
    }else if (options.scene != void 0) {
      // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    var scene = decodeURIComponent(options.scene)
    console.log('朋友圈-参数:',scene);
    var queryObj= scene.split('=')[1];
    console.log('queryObj',queryObj);

    }
    else {
      wx.showToast({
        title:'请求参数错误',
        icon:'none'
      })
      return false
    }
    var that = this;
    wx.showLoading();
    app.getOpenid().then(function() {
    var url = app.globalData.baseUrlTpost + 'order/order_info?';
    var snsid = app.globalData.userId * 1;
    var reqbody = {
      "common": {
        'snsid': app.globalData.userId,
        'sid': app.globalData.session_id,
        "uid": 0,
        "platform": app.globalData.platform,
        "language": 'CN',
        "device": app.globalData.brand,
        "os_version": app.globalData.system + "-" + app.globalData.version,
        "width": app.globalData.width,
        "height": app.globalData.height,
      },
      "params": {
        order_no:orderId
      }
    }
    utils.Md5http(url, (dataStr) => {
      console.log('success',dataStr);
      if (dataStr.rc.c !=undefined && dataStr.rc.c == 0) {
      var share_image = dataStr.order.postcard_list[0].postcard_front_url;//图片路径
      var send_nick = dataStr.order.send_nick;//昵称
      // 网络图片转本地图片
      wx.getImageInfo({
        src: share_image,
        success (res) {
          that.setData({
            userImageUrl:res.path,
            userName:send_nick
          })
    //图片合成
    var imageWidth = app.globalData.widWidth;
    var imageHeight = (app.globalData.widHeight / 1.51).toFixed(0);
    ctx.drawImage(that.data.imageUrl, 0, 0, imageWidth, imageHeight*1); //重新画上
    ctx.draw();
    ctx.setFontSize(10)//重新画上字体大小
    ctx.setFillStyle('#666')
    var sytext = "【" + that.data.userName + "】"+ "送出了明信片和祝福"
    var text_x = app.globalData.widWidth / 6.4;
    var text_y = (app.globalData.widHeight / 6.5).toFixed(0);
     ctx.fillText(sytext, text_x * 1, text_y * 1)
     ctx.draw(true)
     var userImage_x = app.globalData.widWidth / 6.4;
     var userImage_y = app.globalData.widHeight / 3;
     var userImage_width = app.globalData.widWidth / 1.5;
     var userImage_height = app.globalData.widHeight / 3.6;
     ctx.drawImage(that.data.userImageUrl, userImage_x, userImage_y, userImage_width, userImage_height) //重新画上
     // ctx.draw(true)
     ctx.draw(true,function(){
       wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: imageWidth,
            height: imageHeight * 1,
            fileType:'jpg',
            quality:1,
            canvasId: 'myCanvas',
            success(res) {
                console.log(res.tempFilePath)
                that.setData({
                  tempFilePath:res.tempFilePath
                })
            }
        })
     })
     that.setData({
       canvasShow:true
     })
     wx.hideLoading();
     //图片合成结束
  }
})


      } else {
        console.log('获取配置信息接口失败', dataStr);
        wx.showToast({
          title:dataStr.rc.p,
          icon:'none'
        })
      }
    }, reqbody);
  })



  },
saveImage(){
  wx.showLoading();
  console.log('this.data.tempFilePath',this.data.tempFilePath);
  wx.saveImageToPhotosAlbum({
    filePath:this.data.tempFilePath,
    success(res){
      wx.hideLoading();
      wx.showToast({
        title: '图片已保存到相册'
      })
    }
  })
},
makeImage(){
  wx.reLaunch({
  url:'../home/home'
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
