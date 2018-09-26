// pages/photo/photo.js
const app = getApp();
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardActive:true,
    orderActive:false,
    getUserInfo:false,
    picture_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this
    var url = app.globalData.baseUrlTpost + 'config/get_config_information?';
    var reqbody = {
      "common": {
        "uid": 0,
        "platform": app.globalData.platform,
        "language": app.globalData.language
      },
      "params": {}
    }
    utils.Md5http(url, (dataStr) => {
      console.log('获取首页配置信息',dataStr);
      if (dataStr.rc.c == 0) {
        var picture_list = dataStr.promotion_picture_list;
        _that.setData({
          picture_list:picture_list
        })
        app.globalData.original_price = dataStr.total_fee / 100 //订单总价
        app.globalData.postage_fee = dataStr.postage_fee / 100 //邮费0不展示
        app.globalData.postage_copywriting = dataStr.postage_copywriting//邮费文案
        app.globalData.express_delivery_copywriting = dataStr.express_delivery_copywriting//快递文案
        app.globalData.original_copywriting = dataStr.original_copywriting//原价文案

      }else{
        console.log('获取配置信息接口失败',dataStr);
      }
    }, reqbody);

    wx.getSetting({ // 查看是否授权
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
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
        }else {
          _that.setData({
            getUserInfo: false
          })
        }
      },
    });

    app.getOpenid().then(function (userInfo) {
      console.log('获取登陆成功userInfo', userInfo);
      app.globalData.userId = userInfo.userId;
      app.globalData.openId = userInfo.openId;
      app.globalData.session_id = userInfo.session_id;
    })
  },
  //主动获取用户信息权限
  onGotUser(){
    utils.throttle(this.onGotUserInfo(arguments),500);
  },
  onGotUserInfo: function (e) {
    let userInfo = e[0].detail.userInfo;
      console.log('onGotUserInfo', e[0].detail.userInfo);
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
          const src = res.tempFilePaths[0]
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
  cardActive(){//点击明信片
    // if (this.data.cardActive) {
    //   this.setData({
    //     cardActive:false,
    //     orderActive:false
    //   })
    // }else{
    //   this.setData({
    //     cardActive:true,
    //     orderActive:false
    //   })
    // }
  },
  orderActive(){//点击订单
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
        const src = res.tempFilePaths[0]
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '墨迹时光邮局/明信片小程序制作',
      imageUrl: '../../images/share.jpg',
      path: '/pages/home/home'
    }
  }
})
