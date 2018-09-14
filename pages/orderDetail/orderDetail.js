// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderTitle:'all',
    noDetails:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  touchTit: function(e) {
    let tag = e.target.dataset.tag;
    switch (tag) {
      case "all":
        this.setData({
          orderTitle: "all",
          noDetails: false
        });
        // url = app.globalData.baseUrl + 'maternal/order/list';
        // var reqbody = {
        //   userId: app.globalData.id
        // }
        // util.http(url, (dataStr) => {
        //   if (dataStr.success) {
        //     console.log(dataStr);
        //     if (!dataStr.data[0] || dataStr.data[0].type != 0) {
        //       console.log('不存在');
        //       this.setData({
        //         noDetails: true
        //       })
        //       return false;
        //     }
        //     console.log(dataStr.data[0].order);
        //     orderDetails = dataStr.data[0].order;
        //     this.setData({
        //       'orderDetails': orderDetails
        //     })
        //   }
        // }, reqbody);

        break;
      case "repay":
        this.setData({
          'orderTitle': "repay",
          noDetails: false
        });
        // url = app.globalData.baseUrl + 'maternal/order/list';
        // var reqbody = {
        //   userId: app.globalData.id
        // }
        // util.http(url, (dataStr) => {
        //   if (dataStr.success) {
        //     console.log(dataStr);
        //     console.log(dataStr.data[4]);
        //     if (!dataStr.data[4]) {
        //       console.log(3333);
        //       this.setData({
        //         noDetails: true,
        //         'orderDetails': []
        //       })
        //       return false;
        //     }
        //     console.log(dataStr.data[4].order);
        //     orderDetails = dataStr.data[4].order;
        //     this.setData({
        //       'orderDetails': orderDetails
        //     })
        //   }
        // }, reqbody);
        break;
      case "resend":
        this.setData({
          orderTitle: "resend",
          noDetails: false
        });
        // url = app.globalData.baseUrl + 'maternal/order/list';
        // var reqbody = {
        //   userId: app.globalData.id
        // }
        // util.http(url, (dataStr) => {
        //   if (dataStr.success) {
        //     console.log('待回收', dataStr);
        //     if (!dataStr.data[3] || dataStr.data[3].type != 3) {
        //       this.setData({
        //         noDetails: true,
        //         orderDetails: []
        //       });
        //       return false;
        //     }
        //     console.log(dataStr.data[3].order);
        //     orderDetails = dataStr.data[3].order;
        //     this.setData({
        //       'orderDetails': orderDetails
        //     })
        //   }
        // }, reqbody);
        break;
      case "sended":
        this.setData({
          orderTitle: "sended",
          noDetails: false
        });
        // url = app.globalData.baseUrl + 'maternal/order/list';
        // var reqbody = {
        //   userId: app.globalData.id
        // }
        // util.http(url, (dataStr) => {
        //   if (dataStr.success) {
        //     console.log('待确认', dataStr);
        //     if (!dataStr.data[1] || dataStr.data[1].type != 1) {
        //       console.log('不存在');
        //       this.setData({
        //         noDetails: true,
        //         orderDetails: []
        //       })
        //       return false;
        //     }
        //     console.log(dataStr.data[1].order);
        //     orderDetails = dataStr.data[1].order;
        //     this.setData({
        //       'orderDetails': orderDetails
        //     })
        //   }
        // }, reqbody);
        break;
        case "Invalid":
          this.setData({
            orderTitle: "Invalid",
            noDetails: false
          });
          // url = app.globalData.baseUrl + 'maternal/order/list';
          // var reqbody = {
          //   userId: app.globalData.id
          // }
          // util.http(url, (dataStr) => {
          //   if (dataStr.success) {
          //     console.log('待确认', dataStr);
          //     if (!dataStr.data[1] || dataStr.data[1].type != 1) {
          //       console.log('不存在');
          //       this.setData({
          //         noDetails: true,
          //         orderDetails: []
          //       })
          //       return false;
          //     }
          //     console.log(dataStr.data[1].order);
          //     orderDetails = dataStr.data[1].order;
          //     this.setData({
          //       'orderDetails': orderDetails
          //     })
          //   }
          // }, reqbody);
          break;
      default:
        console.log('^………');
    }
  },
  cardActive(){
    wx.navigateBack({
      url: '../home/home',
    })
  },
  uploadTap() { //选择图片
    const self = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值
        wx.navigateTo({
          url: '../make/make?src=' + src,
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
