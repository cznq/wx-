// pages/plan2/plan2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    preImg: '',
    imgdir:'2',
    cityName:'',
    address_photo:'true'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options.src);
    // console.log(options.imgdir);
    // wx.getImageInfo({
    //   src: options.src,
    //   success: function(res) {
    //     console.log(res.width);
    //     console.log(res.height);
    //   }
    // })
    // if (options.imgdir === "1") {
    //   this.setData({
    //     imgdir:"1"
    //   })
    //   console.log('this.imgdir',this.data.imgdir);
    // }else{
    //   this.setData({
    //     imgdir:"2"
    //   })
    // }
    // this.setData({
    //   preImg:options.src
    // })

  },
  querySel(){//页面选择地址
    this.setData({
      address_photo:true
    })
  },
  titCancel(){//表头取消
    this.setData({
      address_photo:false
    })
  },
  titQuery(){//表头确认
    this.setData({
      address_photo:false
    })
  },
  selectCity(e){//选择地址
    console.log(e);
    console.log(e.target.dataset.cityname);
    var cityName = e.target.dataset.cityname;
    this.setData({
      cityName:cityName
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
