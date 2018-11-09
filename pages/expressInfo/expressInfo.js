// pages/expressInfo/expressInfo.js
const app = getApp();
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ship_company:'',
    ship_no:'',
    ship_time:'',
    ship_list:[],
    ship_listLen:0,
    receive_address:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ord_no = options.ord_no;
    var that = this;
    var url = app.globalData.baseUrlTpost + 'ship/get_ship_info?';
    var snsid = app.globalData.userId * 1;
    app.getOpenid().then(function() {
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
        'order_no':ord_no
      }
    }
    utils.Md5http(url, (dataStr) => {
      console.log('物流信息', dataStr);
      if (dataStr.rc.c == 0) {
          var ship_company = dataStr.ship_company;
          var ship_no = dataStr.ship_no;
          var ship_time = dataStr.ship_time;
          var ship_list = dataStr.ship_list;
          var ship_listLen = dataStr.ship_list.length;
          var receive_address = dataStr.receive_city_name + dataStr.receive_address;
              receive_address = receive_address.replace(/[\n]/g,"");
          console.log('receive_address',receive_address);
          that.setData({
            ship_list: ship_list,
            ship_listLen:ship_listLen,
            ship_company:ship_company,
            ship_no:ship_no,
            ship_time:ship_time,
            receive_address:receive_address
          })
      } else {
        console.log('获取配置信息接口失败', dataStr);
      }
    }, reqbody);
})
  },
copyOrder(){
  wx.setClipboardData({
  data: this.data.ship_no,
  success (res) {
    wx.getClipboardData({
      success (res) {
      }
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
