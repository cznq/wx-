// pages/card_reverse /card_reverse.js
const utils = require('../../utils/util.js');

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    areaVal: '就是打开',
    setTime: '',
    selAddress: '',
    mainbg:'',
    color:'',
    currentIndex: '0',
    imgUrls: [{
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '父情节'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        name: '小墨兰'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        name: '附近的'
      },
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '戴假发'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        name: '角度看'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        name: '觉得的'
      }
    ],
    platform: 'ios'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('options', options.cityName);
    var phone = wx.getSystemInfoSync();  //调用方法获取机型    
    var that = this;
    if (phone.platform == 'ios') {   
      that.setData({    
        platform: 'ios'   
      });
    } else if (phone.platform == 'android') {
      that.setData({    
        platform: 'android'   
      });  
    }
    // ---获取接口数据---
    var url = app.globalData.baseUrlTpost + 'config/bg_list_v1?';
    console.log('app.globalData.baseUrlTpost', app.globalData.baseUrlTpost + 'config/bg_list_v1?');
    var reqbody = {
      common: {
        'snsid': '921',
        'sid': 'AES6D4A3231353766677666376D6569784B3539316D72413D3D',
        'platform': 'Android',
        'uid':1,
        "language": "CN"
      },
      params: {}
    }
    utils.Md5http(url, (dataStr) => {
      if (dataStr.rc.c == 0) {
        that.setData({
          imgUrls: dataStr.bg_list
        })
        console.log('dataStr', dataStr);
        console.log('imgUrls', that.data.imgUrls);
        that.setData({
          mainbg:that.data.imgUrls[0].print_bg_url,
          color:that.data.imgUrls[0].color,
        })
      }
    }, reqbody,'Androed');
    // 获取接口数据
    let setTime = utils.mformatTime(new Date());
    that.setData({
      setTime: setTime,
      selAddress: options.cityName
    })

  },
  noExpre(e) {
    var val = e.detail.value;
    var regStr = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEFF]/g
    var regStr2 = /^ +| +$/g
    if (regStr.test(val)) {
      val = val.replace(regStr, '')
    }
    if (regStr2.test(val)) {
      val = val.replace(regStr2, '')
    }
    this.setData({
      areaVal: val
    })
    console.log(val);
  },
  clickSwiper(e) {
    console.log(e.currentTarget.dataset.index);
    var currentIndex = e.currentTarget.dataset.index;
    var mainbg = this.data.imgUrls[currentIndex].print_bg_url;
    var color = this.data.imgUrls[currentIndex].color;
    this.setData({
      currentIndex: currentIndex,
      mainbg:mainbg,
      color:color
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

  }
})
