// pages/plan/plan.js
import WeCropper from '../we-cropper/we-cropper.js'
const device = wx.getSystemInfoSync()
const width = device.windowWidth
const app = getApp();
var pixelRatio = app.globalData.pixelRatio;
const utils = require('../../utils/util.js');
var height = 0;
// 兼容iphoneX
if (device.pixelRatio === 3 && device.screenHeight === 812 && device.screenWidth === 375) {
  height = device.windowHeight - 84
} else {
  height = device.windowHeight - 50
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '上传图片',
    top: 100,
    right: 500,
    bottom: 766,
    left: 0,
    imgUrls: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    bg_src: '../../images/bg.jpg',
    bgimg_w: '',
    bgimg_h: '',
    fixtext: '../../images/dizhi.png',
    original_image: '',
    cut_image: '',
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 301) / 2,// 裁剪框x轴起点
        y: (height - 443) / 2,// 裁剪框y轴期起点
        width: 301,
        height: 443
      }
    },
    canvas2W: width * pixelRatio,
    canvas2H: height * pixelRatio,
    targetid: 'canvas2',
    imgdir: 0,
    is_chooseimg: true //选择图片
  },
  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
  getCropperImage() { //生成图片
    app.aldstat.sendEvent('program_postcard_front_click');//正面生成+1
    const self = this
    this.wecropper.getCropperImage((src) => { //获取裁剪图片
      if (src) {
        let {
          imgLeft,
          imgTop,
          scaleWidth,
          scaleHeight
        } = this.wecropper // 获取图片在原画布坐标位置及宽高
        let {
          x,
          y,
          width,
          height
        } = this.wecropper.cut // 获取裁剪框位置及大小
        const targetCtx = wx.createCanvasContext('canvas2') // 这里是目标canvas画布的id值
        // 所有参数乘设备像素比
        imgLeft = imgLeft * pixelRatio
        imgTop = imgTop * pixelRatio
        scaleWidth = scaleWidth * pixelRatio
        scaleHeight = scaleHeight * pixelRatio
        x = x * pixelRatio
        y = y * pixelRatio
        width = width * pixelRatio
        height = height * pixelRatio
        // console.log('imgLeft', imgLeft);
        // console.log('imgTop', imgTop);
        // console.log('scaleWidth', scaleWidth);
        // console.log('scaleHeight', scaleHeight);
        // console.log('x', x);
        // console.log('y', y);
        // console.log('width', width);
        // console.log('height', height);
        // 新增canvas
        targetCtx.drawImage(app.globalData.originalImage, imgLeft, imgTop, scaleWidth, scaleHeight) // tmp代表被裁剪图片的临时路径
    // 新增canvas
    wx.showModal({ //预览后提示
      title: '提示',
      content: '为了防止图片被过度剪裁，请确认您已预览图片且人像完整',
      success: function(res) {
        if (res.confirm) { //用户点击确认
          wx.showLoading({
            title:'生成中…',
            mask:true
          })
          var tmpPath = '';
          targetCtx.draw(false,function(){
            wx.canvasToTempFilePath({
              canvasId: 'canvas2',
              x,
              y,
              width,
              height,
              fileType:'jpg',
              success(res) {
                 tmpPath = res.tempFilePath
                // console.log('tmpPath',tmpPath)
                app.globalData.original_image = tmpPath; //获取本地切图
                  self.wecropper.pushOrign(src);
                  wx.getImageInfo({ //获取图信息
                    src: src,
                    success(res) {
                      // console.log('图片宽度', res.width);
                      // console.log('图片高度', res.height);
                      app.globalData.postcard_picture_width = res.width
                      app.globalData.postcard_picture_height = res.height
                      wx.hideLoading();
                    }
                  })
                  self.setData({
                    cut_image: src
                  })
                  wx.navigateTo({
                    url: '../selectAdress/selectAdress?src=' + src + '&imgdir=' + self.data.imgdir + '&original_image=' + self.data.original_image + '&cut_image=' + self.data.cut_image
                  })
              }
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  } else {
    console.log('获取图片地址失败，请稍后重试')
    wx.showToast({
      title:'canvas渲染图片失败请重新尝试',
      icon:'none'
    })
  }
})
},
uploadTap() { //选择图片
    const self = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        wx.showLoading();
        var imageSize = res.tempFiles[0].size;
        imageSize = utils.howSize(imageSize);
        var numSize = imageSize.split('-')[0];
        var unitSize = imageSize.split('-')[1];
        switch (unitSize) {
          case 'B':
            wx.showToast({
              title: '图片质量太低请上传更高清晰度的图片',
              icon: 'none'
            })
            return false
            break;
          case 'KB':
            if (parseInt(numSize) < 50) {
              wx.showToast({
                title: '图片质量太低请上传更高清晰度的图片',
                icon: 'none'
              })
              return false
            }
            break;
          default:
        }
        const src = res.tempFilePaths[0];
        app.globalData.originalImage = src;
        //  获取裁剪图片资源后，给data添加src属性及其值
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function(res) {
            if (res.width >= res.height) {
              let cutx = 'cropperOpt.cut.x',
                cuty = 'cropperOpt.cut.y',
                cutW = 'cropperOpt.cut.width',
                cutH = 'cropperOpt.cut.height';
              self.setData({
                [cutx]: (width - 343) / 2,
                [cuty]: (height - 233) / 2,
                [cutW]: 343,
                [cutH]: 233,
                imgdir: 0, //横图 0
                original_image: src
              })
              self.showCavs();

              self.wecropper.pushOrign(src);
            } else {
              let cutx = 'cropperOpt.cut.x',
                cuty = 'cropperOpt.cut.y',
                cutW = 'cropperOpt.cut.width',
                cutH = 'cropperOpt.cut.height';
              self.setData({
                [cutx]: (width - 301) / 2,
                [cuty]: (height - 443) / 2,
                [cutW]: 301,
                [cutH]: 443,
                imgdir: 1,
                original_image: src
              })
              self.showCavs();
              wx.hideLoading();
              self.wecropper.pushOrign(src);
            }

          }
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading();
    app.aldstat.sendEvent('program_postcard_front_show');//订单按钮点击一次+1
    var self = this;
    self.showCavs();
    if (options.src) { //首次加载图片
      wx.getImageInfo({
        src: options.src,
        success: function(res) {
          app.globalData.originalImage = res.path;
          if (res.width >= res.height) {
            let cutx = 'cropperOpt.cut.x',
              cuty = 'cropperOpt.cut.y',
              cutW = 'cropperOpt.cut.width',
              cutH = 'cropperOpt.cut.height';
            self.setData({
              [cutx]: (width - 343) / 2,
              [cuty]: (height - 233) / 2,
              [cutW]: 343,
              [cutH]: 233,
              imgdir: 0, //横图 0
              original_image: options.src//本地切图原图
            })
            self.showCavs();
            self.wecropper.pushOrign(options.src);

          } else {
            let cutx = 'cropperOpt.cut.x',
              cuty = 'cropperOpt.cut.y',
              cutW = 'cropperOpt.cut.width',
              cutH = 'cropperOpt.cut.height';
            self.setData({
              [cutx]: (width - 301) / 2,
              [cuty]: (height - 443) / 2,
              [cutW]: 301,
              [cutH]: 443,
              imgdir: 1
            })
            self.showCavs();

            self.wecropper.pushOrign(options.src);

          }
          // setTimeout(function(){
          //   wx.hideLoading();
          // },1500)

        }
      })
    }

  },
  showCavs() {
    const {
      cropperOpt
    } = this.data

    new WeCropper(cropperOpt)
      .on('ready', (ctx) => {})
      .on('beforeImageLoad', (ctx) => {})
      .on('imageLoad', (ctx) => {})
      .on('beforeDraw', (ctx, instance) => {})
      .updateCanvas();
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
