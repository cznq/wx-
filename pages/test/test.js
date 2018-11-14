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

  fz(){

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
