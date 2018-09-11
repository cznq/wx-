// pages/plan/plan.js
import WeCropper from '../we-cropper/we-cropper.js'
const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50
const app = getApp();

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
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    bg_src: '../../images/bg.jpg',
    bgimg_w: '',
    bgimg_h: '',
    fixtext: '../../images/dizhi.png',
    original_image:'',
    cut_image:'',
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 287) / 2,
        y: (height - 443) / 2,
        width: 287,
        height: 443
      }
    },
    imgdir:1,
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
  getCropperImage() {//生成图片
    const self = this
    this.wecropper.getCropperImage((src) => { //获取裁剪图片
      if (src) {
        console.log(src)
        self.wecropper.pushOrign(src)
        wx.previewImage({ //预览
          current: '', // 当前显示图片的http链接
          urls: [src], // 需要预览的图片http链接列表
          success: function() {
            wx.showModal({//预览后提示
              title: '提示',
              content: '为了防止图片被过度剪裁，请确认您已预览图片且人像完整',
              success: function(res) {
                self.setData({
                  cut_image:src
                })
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../selectAdress/selectAdress?src=' + src + '&imgdir=' + self.data.imgdir + '&original_image=' + self.data.original_image + '&cut_image=' + self.data.cut_image
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
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
        const src = res.tempFilePaths[0];
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
                [cuty]: (height - 187) / 2,
                [cutW]: 343,
                [cutH]: 187,
                imgdir: 2, //横图 2
                original_image:src
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
                [cutx]: (width - 287) / 2,
                [cuty]: (height - 443) / 2,
                [cutW]: 287,
                [cutH]: 443,
                imgdir: 1,
                original_image:src
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
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '000000'
    })
    self.showCavs();
    console.log('options.src',options.src);
    if (options.src) {//首次加载图片
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
              [cuty]: (height - 187) / 2,
              [cutW]: 343,
              [cutH]: 187,
              imgdir: 2, //横图 2
              original_image:options.src
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
              [cutx]: (width - 287) / 2,
              [cuty]: (height - 443) / 2,
              [cutW]: 287,
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

// Page({
//   data: {
//     src: "../../image/photo.png",  //绑定image组件的src
//      //略...
//   },
//   onLoad: function (options) {
//       //略...
//   },
//   uploadPhoto() {
//     var that = this;
//     wx.chooseImage({
//       count: 1, // 默认9
//       sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
//       sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
//       success: function (res) {
//         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
//         var tempFilePaths = res.tempFilePaths;
//         upload(that, tempFilePaths);
//       }
//     })
//   }
// })
//
// function upload(page, path) {
//   wx.showToast({
//     icon: "loading",
//     title: "正在上传"
//   }),
//     wx.uploadFile({
//       url: constant.SERVER_URL + "/FileUploadServlet",
//       filePath: path[0],
//       name: 'file',
//       header: { "Content-Type": "multipart/form-data" },
//       formData: {
//         //和服务器约定的token, 一般也可以放在header中
//         'session_token': wx.getStorageSync('session_token')
//       },
//       success: function (res) {
//         console.log(res);
//         if (res.statusCode != 200) {
//           wx.showModal({
//             title: '提示',
//             content: '上传失败',
//             showCancel: false
//           })
//           return;
//         }
//         var data = res.data
//         page.setData({  //上传成功修改显示头像
//           src: path[0]
//         })
//       },
//       fail: function (e) {
//         console.log(e);
//         wx.showModal({
//           title: '提示',
//           content: '上传失败',
//           showCancel: false
//         })
//       },
//       complete: function () {
//         wx.hideToast();  //隐藏Toast
//       }
//     })
// }
