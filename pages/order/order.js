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
    addressDetails:'北京市朝阳区酒仙桥街路14号兆维华灯大厦A2区3门2层墨迹风云科技有限公司',
    post_bg:''
  },
  // 选择地址
  bindChooseAddr() {
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
        console.log('res',res);
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.address']) {
              wx.openSetting({
                success(res) {
                  res.authSetting = {
                    "scope.address": true,
                  }
                }
              })
            }
          }
        })
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
    var that = this;

    console.log(options.post_bg);
    that.setData({
      post_bg:options.post_bg
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
