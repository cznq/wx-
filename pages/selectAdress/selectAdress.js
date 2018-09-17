// pages/plan2/plan2.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cut_image: '',
    original_image: '',
    imgdir: '2',
    cityName: '',
    address_photo: false,
    progress: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('获取上页传入信息',options);
    console.log('图片方向2为横向',options.imgdir);
    // wx.getImageInfo({
    //   src: options.src,
    //   success: function(res) {
    //     console.log(res.width);
    //     console.log(res.height);
    //   }
    // })
    if (options.imgdir === "1") {
      this.setData({
        imgdir: "1",
        cut_image: options.cut_image,
        original_image: options.original_image
      })
      console.log('this.imgdir', this.data.imgdir);
    } else {
      this.setData({
        imgdir: "2",
        cut_image: options.cut_image,
        original_image: options.original_image
      })
    }
  },
  querySel() { //页面选择地址
    this.setData({
      address_photo: true
    })
  },
  titCancel() { //表头取消
    this.setData({
      address_photo: false,
      cityName: ''
    })
  },
  titQuery() { //表头确认
    this.setData({
      address_photo: false
    })
  },
  selectCity(e) { //选择地址
    console.log(e);
    console.log(e.target.dataset.cityname);
    var cityName = e.target.dataset.cityname;
    this.setData({
      cityName: cityName
    })

  },
  querySubmit() {
    var _that = this;
    if (!this.data.cityName) {
      wx.showToast({
        title: '确认地址',
        icon: 'none'
      })
      return false;
    }
    console.log('cut_imgage', _that.data.cut_image);
    var filename = _that.data.cut_image.split('.');
    console.log('filename.length', filename[filename.length - 1]);
    wx.showLoading({
      title: '上传中',
    })
    const uploadTask = wx.uploadFile({ //上传cut_imgage
      url: 'http://snsforum.mojitest.com/snsupload/upload/json/upload', //http://snsup.moji.com/snsupload/upload/json/upload
      filePath: _that.data.cut_image,
      name: 'image',
      header: {
        'snsid': '921',
        'sid': 'AES6D4A3231353766677666376D6569784B3539316D72413D3D',
        'filename': 'image.' + filename[filename.length - 1],
        'platform': app.globalData.platform
      },
      formData: {},
      success: function(res) {
        console.log(res);
        console.log('上传cut_image完成');
        wx.hideLoading();
        var data = JSON.parse(res.data);
        if (data.code == 0) {
          wx.navigateTo({
            url: '../postCard/postCard?cityName=' + _that.data.cityName
          })
        }
      },
      fail: function(e) {
        console.log('上传cut_image失败');
        wx.hideLoading();
        console.log(e);
      }
    })
    //上传进度
    uploadTask.onProgressUpdate((res) => {
      console.log('上传进度', res.progress);
      var progress = res.progress + '%'
      _that.setData({
        progress: progress
      })

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
