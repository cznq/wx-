// pages/card_reverse /card_reverse.js
const app = getApp();
const utils = require('../../utils/util.js');
var fistLine = '';
var secendLine = '';
var areaValRel = '';
var thirdLine = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    Addressee: '', //收件人
    areaVal: '所有快乐，无需假装；此生尽兴，赤诚善良。', //信件内容
    areaValRel: '所有快乐，无需假装；此生尽\n兴，赤诚善良。',
    sender: '', //寄件人
    setTime: '2019-10-03',
    selAddress: '', //地址
    selAddressLen: 5,
    mainbg: '',
    postCard_url: '',
    color: '',
    currentIndex: '0',
    imgName: '',
    model_type: '',
    imgUrls: [{
      url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      name: '父情节'
    }],
    platform: 'iphone',
    androidMix: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var phone = wx.getSystemInfoSync();  //调用方法获取机型    
    var that = this;
    if (phone.platform == 'ios') {   

      that.setData({    
        platform: 'iphone'   
      });
    } else {
      that.setData({    
        platform: 'android'   
      });  
    }
    // ---获取接口数据---
    var platform = that.data.platform;
    var url = app.globalData.baseUrlTpost + 'config/bg_list_v1?';
    var reqbody = {
      common: {
        'snsid': app.globalData.userId,
        'sid': app.globalData.session_id,
        'platform': platform,
        'uid': 0,
        "language": "CN"
      },
      params: {}
    }
    utils.Md5http(url, (dataStr) => {
      // console.log('dataStr', dataStr);
      if (dataStr.rc.c == 0) {
        that.setData({
          imgUrls: dataStr.bg_list
        })
        console.log('imgUrls', that.data.imgUrls);

        that.setData({
          mainbg: that.data.imgUrls[0].url_h5,
          postCard_url: that.data.imgUrls[0].url,
          color: that.data.imgUrls[0].color,
          imgName: that.data.imgUrls[0].name,
          model_type: that.data.imgUrls[0].model_type,
        })
      }
    }, reqbody);
    // 获取接口数据
    let setTime = utils.mformatTime(new Date());
    // console.log('options.cityName',options.cityName);
    var selAddress = options.cityName
    if (selAddress == '其他') {
      selAddress = '墨迹'
    }
    that.setData({
      setTime: setTime,
      selAddress: selAddress
    })
    // console.log('选择的地址', options.cityName);
    var cityName = that.data.selAddress;
    if (cityName.length == 6) {
      that.setData({
        selAddressLen: 6
      })
    }
    if (cityName.length == 7) {
      that.setData({
        selAddressLen: 7
      })
    }
    if (cityName.length == 8) {
      that.setData({
        selAddressLen: 8
      })
    }
    if (app.globalData.model == 'MIX') {
      that.setData({
        androidMix: true
      })

    }
  },
  noExpre(e) {
    var val = e.detail.value;
    var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030|\uFFFD/ig;
    var regStr2 = /^ +| +$/g
    var regStr3 = /\n/g
    if (regStr.test(val)) {
      val = val.replace(regStr, '')
      wx.showToast({
        title: '不支持表情填写',
        icon: 'none'
      })
    }
    if (regStr2.test(val)) {
      val = val.replace(regStr2, '')
    }
    if (regStr3.test(val)) {
      val = val.replace(regStr3, '')
      wx.showToast({
        title: '不支持换行',
        icon: 'none'
      })
    }
    var valLen = this.getByteLen(val);
    console.log('valLen', valLen);
    if (valLen <= 26) { //第一行
      this.setData({
        areaValRel: val
      })
      console.log('this.data.areaValRel',this.data.areaValRel);
    }
    if (valLen > 26 && valLen <= 52) { //第二行
      fistLine = this.cut_str(val, 26);
      secendLine = val.split(fistLine)[1];
      areaValRel = fistLine + '\n' + secendLine;

      this.setData({
        areaValRel:areaValRel
      })
      console.log('secendLine', secendLine);
      console.log('areaValRel', areaValRel);
    }
    if (valLen > 52) {
      var one = this.cut_str(val, 52);
      thirdLine = val.split(one)[1];
      console.log('fistLine',fistLine);
      console.log('secendLine', secendLine);
      console.log('thirdLine',thirdLine);
      areaValRel = fistLine + '\n' + secendLine + '\n' + thirdLine
      this.setData({
        areaValRel:areaValRel
      })
      console.log('areaValRel',areaValRel);
    }
    this.setData({
      areaVal: val
    })
  },
  cut_str(str, len, end = 0) {
    var char_length = 0;
    if (end == 0) {
      for (var i = 0; i < str.length; i++) {
        var son_str = str.charAt(i);
        encodeURI(son_str).length > 2 ? char_length += 2 : char_length += 1;
        console.log('char_length', char_length);
        console.log('len', len);
        if (char_length >= len) {
          var sub_len = char_length == len ? i + 1 : i;
          str = str.substr(0, sub_len);
          return str
        }
      }
    }

  },
  getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
      var length = val.charCodeAt(i);
      if (length >= 0 && length <= 128) {
        len += 1;
      } else {
        len += 2;
      }
    }
    return len;
  },
  addressInput(e) {
    var val = e.detail.value;
    var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030|\uFFFD/ig;
    var regStr2 = /^ +| +$/g
    console.log('escape', escape(val));
    if (regStr.test(val)) {
      val = val.replace(regStr, '')
      wx.showToast({
        title: '不支持表情填写',
        icon: 'none'
      })
    }
    if (regStr2.test(val)) {
      val = val.replace(regStr2, '')
    }
    this.setData({
      Addressee: val
    })
  },
  sendInput(e) {
    var val = e.detail.value;
    var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030|\uFFFD/ig;
    var regStr2 = /^ +| +$/g
    if (regStr.test(val)) {
      val = val.replace(regStr, '')
      wx.showToast({
        title: '不支持表情填写',
        icon: 'none'
      })
    }
    if (regStr2.test(val)) {
      val = val.replace(regStr2, '')
    }
    this.setData({
      sender: val
    })
  },
  addressee(e) {
    console.log(e.detail.value);
    this.setData({
      Addressee: e.detail.value
    })
  },
  areaVal(e) {
    console.log(e.detail.value);
    this.setData({
      areaVal: e.detail.value
    })
  },
  sender(e) {
    console.log(e.detail.value);
    this.setData({
      sender: e.detail.value
    })
  },
  clickSwiper(e) {
    // console.log(e.currentTarget.dataset.index);
    var currentIndex = e.currentTarget.dataset.index;
    var mainbg = this.data.imgUrls[currentIndex].url_h5;
    var postCard_url = this.data.imgUrls[currentIndex].url
    var color = this.data.imgUrls[currentIndex].color;
    var imgName = this.data.imgUrls[currentIndex].name;
    var model_type = this.data.imgUrls[currentIndex].model_type;
    this.setData({
      currentIndex: currentIndex,
      mainbg: mainbg,
      color: color,
      postCard_url: postCard_url,
      imgName: imgName,
      model_type: model_type
    })
  },
  step_btn() {
    var that = this;
    if (that.data.Addressee == '') {
      wx.showToast({
        title: '请填写收件人',
        icon: 'none'
      })
      return false
    }
    if (that.data.areaVal == '') {
      wx.showToast({
        title: '请填写内容',
        icon: 'none'
      })
      return false
    }
    if (that.data.sender == '') {
      wx.showToast({
        title: '请填写寄件人',
        icon: 'none'
      })
      return false
    }
    wx.navigateTo({
      url: '../order/order?post_bg=' + that.data.postCard_url +
        "&Addressee=" + that.data.Addressee +
        "&areaVal=" + that.data.areaValRel + "&sender=" + that.data.sender +
        "&selAddress=" + that.data.selAddress +
        "&currentIndex=" + that.data.currentIndex + "&imgName=" + that.data.imgName +
        "&model_type=" + that.data.model_type
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
    wx.hideShareMenu()
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
