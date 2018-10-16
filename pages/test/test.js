// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    const ctx = wx.createCanvasContext('firstCanvas')
    wx.chooseImage({
      count: 1,
      success(res){
        console.log('restempFile',res.tempFiles[0].path);
        console.log('size',res.tempFiles[0].size);
        var imageSize = res.tempFiles[0].size;
        imageSize = that.howSize(imageSize);
        console.log('imageSize',imageSize);
      }
    })
  },
  howSize(limit){
    var size = '';
    if(limit  <  1024){    //小于0.1KB，则转化成B
      size = limit.toFixed(0) + '-' + 'B'
    }else if(limit <  1024 *1024){ //小于0.1MB，则转化成KB
      size = (limit / 1000).toFixed(0) + '-' + 'KB'
    }else if(limit <  1024 *1024 *1024){ //小于0.1GB，则转化成MB
      size = (limit / (1024 *1024)).toFixed(1) + '-' +  'MB'
    }else{                               //其他转化成GB
        size = (limit/(1024 * 1024 * 1024)).toFixed(0) + '-' +  "GB"
    }
     var sizeStr = size + "";                            //转成字符串
     var index = sizeStr.indexOf(".");                    //获取小数点处的索引
     var dou = sizeStr.substr(index + 1 ,2)            //获取小数点后两位的值
     if(dou == "00"){                                //判断后两位是否为00，如果是则删除00
         return sizeStr.substring(0, index) +'-'+ sizeStr.substr(index + 3, 2)
     }
    return size
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
