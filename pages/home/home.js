// pages/photo/photo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardActive:true,
    orderActive:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
