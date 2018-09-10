// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseAddr:false,
    addressName:'王大陆',
    addressPhone:33456677654,
    provinceName:'',
    cityName:'',
    countyName:'',
    addressDetails:'多少卡机的撒开了就是打开了房饭都是靠捡垃圾范德萨开发发动机阿里'
  },
  // 选择地址
  bindChooseAddr() {
    console.log(3333);
    let that = this
    wx.chooseAddress({
      success(res) {
        that.setData({
          addressName:res.userName,
          addressPhone: res.telNumber,
          addressDetails:res.detailInfo,
          provinceName:res.provinceName,
          cityName:res.cityName,
          countyName:res.countyName,
          chooseAddr:true
        })

        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      },
      fail(res) {
        that.setData({
          chooseAddr:false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
