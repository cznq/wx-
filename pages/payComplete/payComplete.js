// pages/payComplete/payComplete.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeReturn:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.aldstat.sendEvent('program_postcard_success_show');//支付成功页展示一次+1
  },
  backMain() {
    app.aldstat.sendEvent('program_postcard_success_click',{
      '2':'回到首页'
    });//支付成功页展示一次+1
    this.setData({
      activeReturn:false
    })
    wx.reLaunch({
      url:'../home/home'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideShareMenu();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    if (this.data.activeReturn) {
      wx.reLaunch({
        url:'../home/home'
      })
    }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    app.aldstat.sendEvent('program_postcard_success_click',{
      '1':'分享朋友'
    });//支付成功页展示一次+1
    console.log('res',res);
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '好久不见！我给你寄了张明信片',
      imageUrl: '../../images/share.jpg',
      path: '/pages/home/home'
    }
  }
})
