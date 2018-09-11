// pages/plan2/plan2.js
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    console.log(options.imgdir);
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
    if (!this.data.cityName) {
      wx.showToast({
        title: '确认地址',
        icon: 'none'
      })
      return false;
    }
    var imageInfo = {
      cut_image: this.data.cut_image,
      original_image: this.data.original_image
    }
    wx.uploadFile({
      url: constant.SERVER_URL + "/FileUploadServlet",
      filePath: imageInfo,
      name: 'imageInfo',
      formData: {
        //和服务器约定的token, 一般也可以放在header中
        'user': 'test'
      },
      success: function(res) {
        console.log(res);
      },
      fail: function(e) {
        console.log(e);
      },
      complete: function() {
        wx.hideToast(); //隐藏Toast
      }
    })

    wx.uploadFile.onProgressUpdate((res) => {
      console.log('上传进度', res.progress)
      console.log('已经上传的数据长度', res.totalBytesSent)
      console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
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
