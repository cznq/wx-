// pages/plan/plan.js
import WeCropper from '../we-cropper/we-cropper.js'
const device = wx.getSystemInfoSync()
const width = device.windowWidth
const app = getApp();
const utils = require('../../utils/util.js');
var height = 0;
// 兼容iphoneX
if (device.pixelRatio ===3 && device.screenHeight === 812 && device.screenWidth === 375) {
   height = device.windowHeight - 84
}else{
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
        x: (width - 301) / 2,
        y: (height - 443) / 2,
        width: 301,
        height: 443
      }
    },
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
    const self = this
    this.wecropper.getCropperImage((src) => { //获取裁剪图片
      if (src) {
        wx.showModal({ //预览后提示
          title: '提示',
          content: '为了防止图片被过度剪裁，请确认您已预览图片且人像完整',
          success: function(res) {
            if (res.confirm) { //用户点击确认
              console.log(src)
              self.wecropper.pushOrign(src)
              wx.getImageInfo({ //获取图信息
                src: src,
                success(res) {
                  console.log('图片宽度',res.width);
                    console.log('图片高度',res.height);
                  app.globalData.postcard_picture_width = res.width
                  app.globalData.postcard_picture_height = res.height
                }
              })
              app.globalData.original_image = src;//获取本地切图
              self.setData({
                cut_image: src
              })
              wx.navigateTo({
                url: '../selectAdress/selectAdress?src=' + src + '&imgdir=' + self.data.imgdir + '&original_image=' + self.data.original_image + '&cut_image=' + self.data.cut_image
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })

      } else {
        console.log('获取图片地址失败，请稍后重试')
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
        var imageSize = res.tempFiles[0].size;
        imageSize = utils.howSize(imageSize);
        console.log('imageSize', imageSize);
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
            if (parseInt(numSize) < 300) {
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
            console.log(res.width);
            console.log(res.height);
            if (res.width >= res.height) {
              console.log('横图');
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
              console.log(self.data.cropperOpt.cut.width);
              self.showCavs();

              self.wecropper.pushOrign(src);
            } else {
              console.log('竖图');
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
    var self = this;
    self.showCavs();
    console.log('options.src', options.src);
    if (options.src) { //首次加载图片
      app.globalData.originalImage = options.src;
      wx.getImageInfo({
        src: options.src,
        success: function(res) {
          console.log(res.width);
          console.log(res.height);
          if (res.width >= res.height) {
            console.log('横图');
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
              original_image: options.src
            })
            self.showCavs();
            self.wecropper.pushOrign(options.src);
          } else {
            console.log('竖图');
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

        }
      })
    }

  },
  showCavs() {
    const {
      cropperOpt
    } = this.data

    new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        console.log(`before picture loaded, i can do something`)
        console.log(`current canvas context:`, ctx)
      })
      .on('imageLoad', (ctx) => {
        console.log(`picture loaded`)
        console.log(`current canvas context:`, ctx)
      })
      .on('beforeDraw', (ctx, instance) => {
        console.log(`before canvas draw,i can do something`)
        console.log(`current canvas context:`, ctx)
      })
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
