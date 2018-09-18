// pages/order/order.js
const app = getApp();
const utils = require('../../utils/util.js');
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
    post_bg:'',
    original_price:0, //订单总价
    postage_fee:0, //邮费0不展示
    postage_copywriting:'',//邮费文案
    express_delivery_copywriting:'',//快递文案
    original_copywriting:'',//原价文案
    imgName:''
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

    console.log('传参',options);
    var Addressee = options.Addressee //发送人姓名
    var sender = options.sender //收件人
    var areaVal = options.areaVal //内容
    var currentIndex = options.currentIndex //当前序列
    var post_bg = options.post_bg //背景
    var selAddress = options.selAddress //选择的地址
    var imgName  = options.imgName
    that.setData({
      post_bg:post_bg,
      original_price:app.globalData.original_price, //订单总价
      postage_copywriting:app.globalData.postage_copywriting,//邮费文案
      express_delivery_copywriting:app.globalData.express_delivery_copywriting,//快递文案
      original_copywriting:app.globalData.original_copywriting,//原价文案
      imgName:imgName
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
