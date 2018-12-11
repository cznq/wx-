const app = getApp();
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardActive: true,
    orderActive: false,
    getUserInfo: false,
    picture_list: [],
    sharebtn: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(options.gdt_vid != undefined){
       app.globalData.click_id = options.gdt_vid;
       console.log('click_id',app.globalData.click_id);
    }
    // 广告主clickId监听结束
    app.aldstat.sendEvent('program_postcard_first_show');//宣传页展示一次+1v
    var _that = this
    app.getOpenid().then(function() {
      _that.setData({
        onloaded: true
      })
      //首页配置信息
      var url = app.globalData.baseUrlTpost + 'config/get_config_information?';
      var snsid = app.globalData.userId * 1;
      var reqbody = {
        "common": {
          'snsid': snsid,
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
        if (dataStr.rc.c == 0) {
          var picture_list = dataStr.promotion_picture_list;
          _that.setData({
            picture_list: picture_list
          })
          app.globalData.original_price = dataStr.total_fee / 100 //订单总价
          app.globalData.postage_fee = dataStr.postage_fee / 100 //邮费0不展示
          app.globalData.postage_copywriting = dataStr.postage_copywriting //邮费文案
          app.globalData.express_delivery_copywriting = dataStr.express_delivery_copywriting //快递文案
          app.globalData.original_copywriting = dataStr.original_copywriting //原价文案

        } else {
          console.log('获取配置信息接口失败', dataStr);
        }
      }, reqbody);
    })
  //首页配置信息结束
    wx.getSetting({ // 查看是否授权
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              _that.setData({
                getUserInfo: true
              })
              var userInfo = res.userInfo
              app.globalData.nickName = userInfo.nickName
              app.globalData.avatarUrl = userInfo.avatarUrl
              app.globalData.gender = userInfo.gender //性别 0：未知、1：男、2：女
              app.globalData.province = userInfo.province
              app.globalData.city = userInfo.city
              app.globalData.country = userInfo.country
            }
          })
        } else {
          _that.setData({
            getUserInfo: false
          })
        }
      },
    });

  },

  //主动获取用户信息权限
  onGotUser() {
    utils.throttle(this.onGotUserInfo(arguments), 800);
  },
  onGotUserInfo: function(e) {
    app.aldstat.sendEvent('program_postcard_first_make_click');//宣传页制作按钮点击一次+1
    let userInfo = e[0].detail.userInfo;
    // console.log('onGotUserInfo', e[0].detail.userInfo);
    if (!userInfo) {
      this.setData({
        getUserInfo: true
      })
      const self = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success(res) {
          var imageSize = res.tempFiles[0].size;
          imageSize = utils.howSize(imageSize);
          // console.log('imageSize', imageSize);
          var numSize = imageSize.split('-')[0];
          var unitSize = imageSize.split('-')[1];
          console.log(numSize, unitSize);
          switch (unitSize) {
            case 'B':
              wx.showToast({
                title: '图片质量太低请上传更高清晰度的图片',
                icon: 'none'
              })
              return false
              break;
            case 'KB':
              if (parseInt(numSize) < 50) {
                wx.showToast({
                  title: '图片质量太低请上传更高清晰度的图片',
                  icon: 'none'
                })
                return false
              }
              break;
            default:
          }
          const src = res.tempFilePaths[0];
          //  获取裁剪图片资源后，给data添加src属性及其值
          wx.navigateTo({
            url: '../make/make?src=' + src,
          })
        }
      })
    } else {
      this.setData({
        getUserInfo: true
      })
      console.log('e[0].detail.userInfo', e[0].detail.userInfo);
      app.globalData.nickName = userInfo.nickName
      app.globalData.avatarUrl = userInfo.avatarUrl
      app.globalData.gender = userInfo.gender //性别 0：未知、1：男、2：女
      app.globalData.province = userInfo.province
      app.globalData.city = userInfo.city
      app.globalData.country = userInfo.country
      // 通知服务端
      var url = app.globalData.baseUrlT + 'json/profile/set_info';
      var reqbody = {
        "common": {
          "snsid": app.globalData.userId,
          "uid": 0, //先写死--
          "platform": app.globalData.platform,
          "language": app.globalData.language
        },
        "params": {
          "nick": app.globalData.nickName,
          "face": app.globalData.avatarUrl,
          "sex": app.globalData.gender
        }
      }
      utils.http(url, (dataStr) => {
        console.log('微信用户信息', dataStr);
        if (dataStr.rc.c == 0) {}

      }, reqbody);

      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success(res) {
          const src = res.tempFilePaths[0]
          //  获取裁剪图片资源后，给data添加src属性及其值
          wx.navigateTo({
            url: '../make/make?src=' + src,
          })
        }
      })
    }
  },
  cardActive() { //点击明信片
  },
  orderActive() { //点击订单
    app.aldstat.sendEvent('program_postcard_first_order_click');//订单按钮点击一次+1
    wx.navigateTo({
      url: '../orderDetail/orderDetail'
    })
  },
  uploadTap() { //选择图片
    const self = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        wx.showLoading();
        // 获取最新配置
        var imageSize = res.tempFiles[0].size;
        imageSize = utils.howSize(imageSize);
        var numSize = imageSize.split('-')[0];
        var unitSize = imageSize.split('-')[1];
        switch (unitSize) {
          case 'B':
            wx.showToast({
              title: '图片质量太低请上传更高清晰度的图片',
              icon: 'none'
            })
            return false
            break;
          case 'KB':
            if (parseInt(numSize) < 50) {
              wx.showToast({
                title: '图片质量太低请上传更高清晰度的图片',
                icon: 'none'
              })
              return false
            }
            break;
          default:
        }
        const src = res.tempFilePaths[0]
        wx.hideLoading();
        //  获取裁剪图片资源后，给data添加src属性及其值
        wx.navigateTo({
          url: '../make/make?src=' + src,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  loyer() {
    this.setData({
      sharebtn: false
    })
  },
  loyerbtn() {
    var that = this;
    if (!app.globalData.isConnected || app.globalData.networkType == 'none') {
      wx.showToast({
        title: '网络异常',
        icon: 'none'
      })
      return false;
    }
    wx.showLoading({
      title: '进行中...',
      mask: true
    })
    var imgSrc = "https://oss4liview.moji.com/feedstream/2018/11/01/382d0965a933783eff7359b02240f2de.jpg"
    wx.downloadFile({
      url: imgSrc,
      success: function(res) {
        console.log(res); //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function(data) {
            wx.hideLoading();
            wx.showToast({
              title: '图片已保存到相册'
            })
            that.setData({
              sharebtn: false
            })
          },
          fail: function(err) {
            wx.hideLoading();
            console.log(err);
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              // console.log('打开设置窗口')
              wx.openSetting({
                success(res) {
                  console.log(res)
                  res.authSetting = {
                    'scope.writePhotosAlbum': true
                  }
                }
              })
            }
            that.setData({
              sharebtn: false
            })
          }
        })
      }
    })
  },
  sharebtn() {
    this.setData({
      sharebtn: true
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
      app.aldstat.sendEvent('program_postcard_choice_share');//分享+1v
    return {
      title: '好久不见！我给你寄了张明信片',
      imageUrl: '../../images/share.jpg',
      path: '/pages/home/home'
    }
  }
})
