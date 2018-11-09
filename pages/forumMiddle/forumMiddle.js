// pages/forumMiddle/forumMiddle.js
var app = getApp();
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picture_id:0,
    path:'',
    face:'',
    nick:'',
    width:'',
    height:'',
    location:'',
    sign:'',
    time_type:'',
    upload_time:'',
    is_hot:0,
    remark:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 打开调试
    wx.setEnableDebug({
      enableDebug: true
    })
    console.log('options:',options);
    if (options.picture_id) {
      this.setData({
        picture_id:options.picture_id
      })
    }else if (options.scene != void 0) {
      // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    const scene = decodeURIComponent(options.scene)
    console.log('朋友圈-参数:',scene);
    }else {
      wx.showToast({
        title:'请求参数错误',
        icon:none
      })
      return false
    }
    var that = this;
    // http://snsforum.mojitest.com/forum/h5/json/picture_share
    //   正式地址
    app.getOpenid().then(function() {
    var url = 'http://sns.api.moji.com/forum/h5/json/picture_share?'+'picture_id'+'='+that.data.picture_id+'&';
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
      "params": {}
    }
    utils.Md5http(url, (dataStr) => {
      console.log('sharePicture',dataStr);
      if (dataStr == void 0) {
        return false
      }
      if (dataStr.rc.c !=undefined && dataStr.rc.c == 0) {
        console.log(dataStr.width,dataStr.height);
        var path = dataStr.path; //用户上传图片
        var face = dataStr.face;//头像
        var nick = dataStr.nick;//昵称
        var time_type = dataStr.time_type;//时景显示类型，1 上传时间，2拍摄时间
        var location = dataStr.location;//图片拍摄地址
        var sign = dataStr.sign;//个性签名
        var time_type = dataStr.time_type;//时景显示类型，1 上传时间，2拍摄时间
        var is_hot = dataStr.is_hot;//	是否是热图 1:是 0:否
        var remark = dataStr.remark;
        if (remark != void 0) {
          that.setData({
            remark: remark
          })
        }
        var upload_time = utils.timestampToTime(dataStr.upload_time);
        if (time_type === 1) {
          that.setData({
            time_type:'上传时间',
            upload_time:upload_time
          })
        }
        if (dataStr.width > 345) {
          var middleNum = 345/dataStr.width ;
          var Height = dataStr.height * middleNum;
              Height = Height * 2;
              // return false
          that.setData({
            width: '690rpx',
            height: Height + 'rpx'
          })
        }else if (dataStr.width < 345) {
          var middleNum = 345/dataStr.width;
          var Height = dataStr.height * middleNum;
              Height = Height * 2;
          that.setData({
            width: '690rpx',
            height: Height + 'rpx'
          })
        }else{
          that.setData({
            width: '690rpx',
            height:'518rpx'
          })
        }
        that.setData({
          path:path,
          face:face,
          nick:nick,
          location:location,
          sign:sign,
          is_hot:is_hot
        })

      } else {
        if(dataStr.rc.c !=void 0){
        console.log('获取配置信息接口失败',  dataStr.rc.c);
        if (dataStr.rc.c == 23) {
          wx.showToast({
            title:'未审核',
            icon:'none'
          })
        }

      }
      }
    }, reqbody);
    //小程序首页信息
    var url = app.globalData.baseUrlTpost + 'config/get_config_information?';
    var snsid = app.globalData.userId * 1;
    var reqbody = {
      "common": {
        'snsid': snsid,
        "uid": 0,
        "platform": app.globalData.platform,
        "language": 'CN',
        "device": app.globalData.brand,
        "os_version": app.globalData.system + "-" + app.globalData.version,
        "width": app.globalData.width,
        "height": app.globalData.height,
      },
      "params": {}
    }
    utils.Md5http(url, (dataStr) => {
      console.log('onload首页配置信息', dataStr);
      if (dataStr.rc.c == 0) {
        app.globalData.original_price = dataStr.total_fee / 100 //订单总价
        app.globalData.postage_fee = dataStr.postage_fee / 100 //邮费0不展示
        app.globalData.postage_copywriting = dataStr.postage_copywriting //邮费文案
        app.globalData.express_delivery_copywriting = dataStr.express_delivery_copywriting //快递文案
        app.globalData.original_copywriting = dataStr.original_copywriting //原价文案

      } else {
        console.log('获取配置信息接口失败', dataStr);
      }
    }, reqbody);
    //小程序首页信息结束
  })
  },
  saveImage(){
    wx.showLoading();
    console.log('this.data.path',this.data.path);
    wx.getImageInfo({
  src: this.data.path,
  success (res) {
    wx.saveImageToPhotosAlbum({
      filePath:res.path,
      success(res){
        wx.hideLoading();
        wx.showToast({
          title: '图片已保存到相册'
        })
      }
    })
  }
})

  },
  makeImage(){
    wx.navigateTo({
    url:'../make/make?src=' + this.data.path,
  })
  },
  goMoji(){
    wx.reLaunch({
    url:'../home/home',
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
