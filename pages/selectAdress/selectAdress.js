// pages/plan2/plan2.js
// const html2canvas = require('../../utils/html2canvas.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cut_image: '',
    original_image: '',
    imgdir: '0',//图片方向0为横向
    cityName: '',
    address_photo: false,
    progress: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.globalData.postcard_picture_type = options.imgdir
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
    } else {
      this.setData({
        imgdir: "0",
        cut_image: options.cut_image,
        original_image: options.original_image
      })
    }

  },
  // selImage(){
  //   console.log(222);
  //   // var source = document.querySelector('.selImage');
  //   html2canvas(this.data.original_image).then(function(canvas) {
  //          var imageData = canvas.toDataURL(1);
  //          console.log('imageData',imageData);
  //
  //  });
  //
  // },
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
    console.log(e.target.dataset.cityname);
    var cityName = e.target.dataset.cityname;
    this.setData({
      cityName: cityName
    })

  },
  querySubmit() {
    var _that = this;
    if(!app.globalData.isConnected || app.globalData.networkType == 'none'){
      wx.showToast({
        title: '网络异常',
        icon: 'none'
      })
      return false;
    }
    if (!this.data.cityName) {
      wx.showToast({
        title: '请填写正确地址',
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
      url: 'https://snsup.moji.com/snsupload/upload/json/upload', //http://snsforum.mojitest.com/snsupload/upload/json/upload
      filePath: _that.data.cut_image,
      name: 'image',
      header: {
        'snsid': app.globalData.userId,
        'sid': app.globalData.session_id,
        'filename': 'image.' + filename[filename.length - 1],
        'platform': app.globalData.platform
      },
      formData: {},
      success: function(res) {
        console.log('上传cut_image完成',res);
        wx.hideLoading();
        var data = JSON.parse(res.data);

        if (data.code == 0) {
          app.globalData.postcard_front_url = data.path;
          wx.redirectTo({
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
      // console.log('上传进度', res.progress);
      var progress = res.progress + '%'
      _that.setData({
        progress: progress
      })

    })

  },
  loyerbg: function(){
    return false;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideShareMenu()
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
