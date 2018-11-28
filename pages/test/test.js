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
    var DEFAULT = {
      id: {
        default: 'cropper',
        get: function get () {
          return tmp.id
        },
        set: function set (value) {
          if (typeof (value) !== 'string') {
            // console.error(("id：" + value + " is invalid"));
          }
          tmp.id = value;
        }
      },
      width: {
        default: 750,
        get: function get () {
          return tmp.width
        },
        set: function set (value) {
          if (typeof (value) !== 'number') {
            // console.error(("width：" + value + " is invalid"));
          }
          tmp.width = value;
        }
      },
      height: {
        default: 750,
        get: function get () {
          return tmp.height
        },
        set: function set (value) {
          if (typeof (value) !== 'number') {
            // console.error(("height：" + value + " is invalid"));
          }
          tmp.height = value;
        }
      },
      scale: {
        default: 2.5,
        get: function get () {
          return tmp.scale
        },
        set: function set (value) {
          if (typeof (value) !== 'number') {
            // console.error(("scale：" + value + " is invalid"));
          }
          tmp.scale = value;
        }
      },
      zoom: {
        default: 5,
        get: function get () {
          return tmp.zoom
        },
        set: function set (value) {
          if (typeof (value) !== 'number') {
            console.error(("zoom：" + value + " is invalid"));
          } else if (value < 0 || value > 10) {
            console.error("zoom should be ranged in 0 ~ 10");
          }
          tmp.zoom = value;
        }
      },
      src: {
        default: 'cropper',
        get: function get () {
          return tmp.src
        },
        set: function set (value) {
          if (typeof (value) !== 'string') {
            console.error(("id：" + value + " is invalid"));
          }
          tmp.src = value;
        }
      },
      cut: {
        default: {},
        get: function get () {
          return tmp.cut
        },
        set: function set (value) {
          if (typeof (value) !== 'object') {
            console.error(("id：" + value + " is invalid"));
          }
          tmp.cut = value;
        }
      },
      onReady: {
        default: null,
        get: function get () {
          return tmp.ready
        },
        set: function set (value) {
          tmp.ready = value;
        }
      },
      onBeforeImageLoad: {
        default: null,
        get: function get () {
          return tmp.beforeImageLoad
        },
        set: function set (value) {
          tmp.beforeImageLoad = value;
        }
      },
      onImageLoad: {
        default: null,
        get: function get () {
          return tmp.imageLoad
        },
        set: function set (value) {
          tmp.imageLoad = value;
        }
      },
      onBeforeDraw: {
        default: null,
        get: function get () {
          return tmp.beforeDraw
        },
        set: function set (value) {
          tmp.beforeDraw = value;
        }
      }
    };
    var _default = {};
    var obj = Object.keys(DEFAULT);
    Object.keys(DEFAULT).forEach(function (key) {
      _default[key] = DEFAULT[key].default;
    });
    console.log('_default',_default);
    // Object.assign(self, _default, params);

  },

  click(){
    wx.navigateTo({
      url:'../home/home?sku='+1077777+'&platform'+'='+1+'&gdt_vid'+'='+'wx0ewinbalytptma00'+'&weixinadinfo'+'='+20966864
    })
  },
  // if(app.globalData.click_id !=void 0){
  //   //获取公众号accessToken接口
  //   var url = app.globalData.baseUrlTpost + 'share/get_access_token?';
  //   var snsid = app.globalData.userId * 1;
  //   var reqbody = {
  //     "common": {
  //       'snsid': snsid,
  //       'sid': app.globalData.session_id,
  //       "uid": 0,
  //       "platform": app.globalData.platform,
  //       "language": 'CN',
  //       "device": app.globalData.brand,
  //       "os_version": app.globalData.system + "-" + app.globalData.version,
  //       "width": app.globalData.width,
  //       "height": app.globalData.height,
  //     },
  //     "params": {
  //       appid_type:'2'
  //     }
  //   }
  //   utils.Md5http(url, (dataStr) => {
  //     console.log('获取accessToken接口', dataStr);
  //     if (dataStr.rc.c == 0) {
  //       app.globalData.access_token = dataStr.access_token;
  //     } else {
  //       console.log('获取配置信息接口失败', dataStr);
  //     }
  //   }, reqbody);
  // }
      //获取accessToken接口结束
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
