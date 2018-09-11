// pages/photo/photo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardActive:true,
    orderActive:false,
    getUserInfo:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this
    wx.getSetting({ // 查看是否授权
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {

              _that.setData({
                getUserInfo: true
              })

            }
          })
        }else {
          _that.setData({
            getUserInfo: false
          })
        }


      },
    });

    app.getOpenid().then(function (userId) {
      console.log('2userId', userId);
    })
  },
  //主动获取用户信息权限
  onGotUserInfo: function (e) {
    console.log('onGotUserInfo', e.detail.userInfo);
    let userInfo = e.detail.userInfo;
    if (!userInfo) {
      this.setData({
        getUserInfo: true
      })
    } else {
      this.setData({
        getUserInfo: true
      })
    }
  },
  cardActive(){//点击明信片
    if (this.data.cardActive) {
      this.setData({
        cardActive:false,
        orderActive:false
      })
    }else{
      this.setData({
        cardActive:true,
        orderActive:false
      })
    }
  },
  orderActive(){//点击订单
    if (this.data.orderActive) {
      this.setData({
        orderActive:false,
        cardActive:false
      })
    }else{
      this.setData({
        orderActive:true,
        cardActive:false
      })
    }
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
  onShareAppMessage: function () {

  }
})
