// pages/card_reverse /card_reverse.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    areaVal:'就是打开',
    setTime:'',
    currentIndex:'0',
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
    let setTime = util.mformatTime(new Date());
    that.setData({
      setTime: setTime
    })

  },
  noExpre(e){
    var val = e.detail.value;
    var regStr =  /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEFF]/g
    var regStr2 = /^ +| +$/g
    if (regStr.test(val)) {
      val = val.replace(regStr,'')
    }
    if (regStr2.test(val)) {
      val = val.replace(regStr2,'')
    }
    this.setData({
      areaVal:val
    })
    console.log(val);
  },
  clickSwiper(e){
    console.log(e.currentTarget.dataset.index);
    var currentIndex = e.currentTarget.dataset.index;
    this.setData({
      currentIndex:currentIndex
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
