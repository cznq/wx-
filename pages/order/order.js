// pages/order/order.js
const app = getApp();
const utils = require('../../utils/util.js');
const base64 = require('../../utils/base64.js');
var Base64 = base64.Base64;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getUserInfo: false,
    chooseAddr: false,
    addressName: '王大陆',
    addressPhone: 33456677654,
    provinceName: '',
    cityName: '',
    countyName: '',
    addressDetails: '北京市朝阳区酒仙桥街路14号兆维华灯大厦A2区3门2层墨迹风云科技有限公司',
    post_bg: '',
    original_price: 0, //订单总价
    postage_fee: 0, //邮费0不展示
    postage_copywriting: '', //邮费文案
    express_delivery_copywriting: '', //快递文案
    original_copywriting: '', //原价文案
    imgName: '',
    model_type: '',
    AddreName: '', //收件人
    sender: '', //发送人姓名
    areaVala: '', //内容
    currentIndex: '', //当前序列
    post_bg: '', //背景
    selAddress: '', //选择的地址
    imgdir: '',
    cut_image: ''

  },
  bindChooseAddr() {
    utils.throttle(this.bindChooseAddrM(),1000);
  },
  // 选择地址
  bindChooseAddrM() {
    if(!app.globalData.isConnected || app.globalData.networkType == 'none'){
      wx.showToast({
        title: '网络异常',
        icon: 'none'
      })
      return false;
    }
    let that = this
    wx.chooseAddress({
      success(res) {
        that.setData({
          addressName: res.userName,
          addressPhone: res.telNumber,
          addressDetails: res.detailInfo,
          provinceName: res.provinceName,
          cityName: res.cityName,
          countyName: res.countyName,
          chooseAddr: true
        })
      },
      fail(res) {
        console.log('res', res);
        if (res.errMsg =='chooseAddress:cancel') {
          that.setData({
            chooseAddr: false
          })
          return false
        }
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
          chooseAddr: false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log('that.globalData.platform', app.globalData.platform);
    that.setData({
      cut_image: app.globalData.original_image
    })
    console.log('cut_image', app.globalData.original_image);
    var picture_type = app.globalData.postcard_picture_type //	0:横图 1:竖图
    if (picture_type == '1') {
      that.setData({
        imgdir: '1'
      })
    } else {
      that.setData({
        imgdir: '0'
      })
    }

    console.log('that.data.imgdir', that.data.imgdir);
    var AddreName = options.Addressee //收件人
    var sender = options.sender //发送人姓名
    var areaVal = options.areaVal //内容
    var currentIndex = options.currentIndex //当前序列
    var post_bg = options.post_bg //背景
    var selAddress = options.selAddress //选择的地址
    var imgName = options.imgName
    var model_type = options.model_type
    var original_price = app.globalData.original_price + app.globalData.postage_fee //订单总价
    that.setData({
      post_bg: post_bg,
      original_price: original_price, //订单总价
      postage_copywriting: app.globalData.postage_copywriting, //邮费文案
      express_delivery_copywriting: app.globalData.express_delivery_copywriting, //快递文案
      original_copywriting: app.globalData.original_copywriting, //原价文案
      imgName: imgName,
      model_type:model_type,
      AddreName: AddreName,
      sender: sender,
      areaVal: areaVal,
      currentIndex: currentIndex,
      post_bg: post_bg,
      selAddress: selAddress
    })
    wx.getSetting({ // 查看是否授权
      success: function(res) {
        if (!res.authSetting['scope.userInfo']) {
          that.setData({
            getUserInfo: false
          })
        } else {
          that.setData({
            getUserInfo: true
          })
        }
      },
    });
  },
  //主动获取用户信息权限
  onGotUser() {
    utils.throttle(this.onGotUserInfo(arguments), 500);
  },
  onGotUserInfo: function(e) {
    let userInfo = e[0].detail.userInfo;
    // console.log('onGotUserInfo', e[0].detail.userInfo);
    if (!userInfo) {
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
            wx.openSetting({ //打开设置
              success(res) {
                res.authSetting = {
                  "scope.userInfo": true,
                }
              }
            })
          }
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
          "snsid":app.globalData.userId,
          "uid": 0, //先写死--
          "platform": app.globalData.platform,
          "language": 'CN',
          "device": app.globalData.brand,
          "os_version": app.globalData.system + "-" + app.globalData.version,
          "width": app.globalData.width,
          "height": app.globalData.height,
        },
        "params": {
          "nick":app.globalData.nickName,
          "face": app.globalData.avatarUrl,
          "sex":app.globalData.gender,
        }
      }
      utils.http(url, (dataStr) => {
        console.log('微信用户信息', dataStr);
        if (dataStr.rc.c == 0) {}

      }, reqbody);
      this.paybtn();
    }
  },
  paybtn() {
      if(!app.globalData.isConnected || app.globalData.networkType == 'none'){
        wx.showToast({
          title: '网络异常',
          icon: 'none'
        })
        return false;
      }
    // app.globalData.isConnected
    var _that = this;
    if (!_that.data.chooseAddr) {
      wx.showToast({
        title: '请填写收货地址',
        icon: 'none'
      })
      return false;
    }
    // ---获取接口数据---
    var platform = app.globalData.platform;
    var url = app.globalData.baseUrlTpost + 'order/init_order?';
    var reqbody = {
      common: {
        'snsid': app.globalData.userId,
        'sid': app.globalData.session_id,
        'uid': 0,
        "platform": app.globalData.platform,
        "language": 'CN',
        "device": app.globalData.brand,
        "os_version": app.globalData.system + "-" + app.globalData.version,
        "width": app.globalData.width,
        "height": app.globalData.height
      },
      params: {
        postcard_receive_name: _that.data.AddreName, //明信片上的接收人
        postcard_send_name: _that.data.sender, //明信片上的发送人
        post_mark: _that.data.selAddress, //邮戳
        postcard_content: _that.data.areaVal, //明信片上的寄语
        receive_name: _that.data.addressName, //收件人姓名
        receive_mobile: _that.data.addressPhone, //收件人电话
        receive_city_name: _that.data.provinceName+_that.data.cityName+_that.data.countyName, //收件人城市
        receive_address: _that.data.addressDetails, //收件人详细地址
        send_mobile: '', //发送人电话
        send_name: '', //发送人姓名
        receive_msg_flag: '',
        postcard_picture_url: app.globalData.postcard_picture_url, //明信片原图
        postcard_picture_type: app.globalData.postcard_picture_type, //	0:横图 1:竖图
        postcard_picture_width: app.globalData.postcard_picture_width, //图片宽度
        postcard_picture_height: app.globalData.postcard_picture_height, //图片高度
        postcard_front_url: app.globalData.postcard_front_url, //明信片正面
        postcard_template: _that.data.model_type, //明信片模板
        coupon_ids: '', //优惠券ID
        order_fee: _that.data.original_price * 100, //订单金额(分为单位)
        pay_type: 0, //0-微信 1-支付宝
        order_no: '' //	订单号
      }
    }
    utils.Md5http(url, (dataStr) => {
      console.log('dataStr', dataStr);
      if (dataStr.rc.c == 0) {
        console.log('dataStr.order_no', dataStr.postcard_order_info.order_no);
        console.log('dataStr.pay_sign', dataStr.postcard_order_info.pay_sign);
        var pay_sign = dataStr.postcard_order_info.pay_sign;
        pay_sign = JSON.parse(Base64.decode(pay_sign));
        // console.log('pay_sign',pay_sign);

        wx.requestPayment({
          timeStamp: pay_sign.timeStamp,
          nonceStr: pay_sign.nonceStr,
          package: pay_sign.package,
          signType: pay_sign.signType,
          paySign: pay_sign.paySign,
          success: function(res) {
            console.log(res);
            console.log('成功');
            wx.navigateTo({
              url: '../payComplete/payComplete?path=' + 'order'
            })
          },
          fail: function(res) {
            console.log(res);
            console.log('失败');
            if (app.globalData.platform == 'android') {
              _that.leLaunch()
            } else {
              wx.reLaunch({
                url: '../orderDetail/orderDetail?path=' + 'order'
              })
            }

          }
        })
      }else{
        wx.showToast({
          title:dataStr.rc.p,
          icon:'none'
        })
      }
    }, reqbody);
    // 获取接口数据
  },
  leLaunch() {
    var timer = setTimeout(function() {
      wx.reLaunch({
        url: '../orderDetail/orderDetail?path=' + 'order'
      })
    }, 300)
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
    wx.hideShareMenu();
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
  onShareAppMessage: function() {

  },

})
