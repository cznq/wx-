// pages/orderDetail/orderDetail.js
const app = getApp();
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderTitle:'all',
    noDetails:false,
    order_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // ---获取接口数据---
    var platform = app.globalData.platform;
    var url = app.globalData.baseUrlTpost + 'order/order_list?';
    var reqbody = {
      common: {
        'snsid': '100001236',
        'sid': 'AES5A65396678476B68773864497278596B6559764F59513D3D',
        'platform': platform,
        'uid':0,
        "language": "CN"
      },
      params: {
        order_status:-1,
        page_no:1,
        page_size:20
      }
    }
    utils.Md5http(url, (dataStr) => {
      console.log('获取订单详情信息', dataStr);
      if (dataStr.rc.c == 0) {
      var  order_list = dataStr.order_list;
      if (order_list.length == 0) {
        this.setData({
          noDetails:true
        })
      }
      var time_list = [], time;
      for (var item in order_list) {
        if (order_list.hasOwnProperty(item)) {
          time = utils.formatTime(new Date(order_list[item].create_time))
            order_list[item].time = time
        }
      }
      this.setData({
        order_list:order_list
      })
    }else {
      this.setData({
        noDetails:true
      })
    }
    }, reqbody);
    // 获取接口数据
  },
  touchTit: function(e) {
    let tag = e.target.dataset.tag;
    switch (tag) {
      case "all":
        this.setData({
          orderTitle: "all",
          noDetails: false
        });
        var platform = app.globalData.platform;
        var url = app.globalData.baseUrlTpost + 'order/order_list?';
        var reqbody = {
          common: {
            'snsid': '100001236',
            'sid': 'AES5A65396678476B68773864497278596B6559764F59513D3D',
            'platform': platform,
            'uid':0,
            "language": "CN"
          },
          params: {
            order_status:-1,
            page_no:1,
            page_size:20
          }
        }
        utils.Md5http(url, (dataStr) => {
          console.log('获取订单详情信息', dataStr);
          if (dataStr.rc.c == 0) {
          var  order_list = dataStr.order_list;
          if (order_list.length == 0) {
            this.setData({
              noDetails:true
            })
          }
          var time_list = [], time;
          for (var item in order_list) {
            if (order_list.hasOwnProperty(item)) {
              time = utils.formatTime(new Date(order_list[item].create_time))
                order_list[item].time = time
            }
          }
          this.setData({
            order_list:order_list
          })
        }else {
          this.setData({
            noDetails:true
          })
        }
        }, reqbody);

        break;
      case "repay":
        this.setData({
          'orderTitle': "repay",
          noDetails: false
        });
        var platform = app.globalData.platform;
        var url = app.globalData.baseUrlTpost + 'order/order_list?';
        var reqbody = {
          common: {
            'snsid': '100001236',
            'sid': 'AES5A65396678476B68773864497278596B6559764F59513D3D',
            'platform': platform,
            'uid':0,
            "language": "CN"
          },
          params: {
            order_status: 0,
            page_no:1,
            page_size:20
          }
        }
        utils.Md5http(url, (dataStr) => {
          console.log('获取订单详情待付款', dataStr);
          if (dataStr.rc.c == 0) {
          var  order_list = dataStr.order_list;
          if (order_list.length == 0) {
            this.setData({
              noDetails:true
            })
          }
          var time_list = [], time;
          for (var item in order_list) {
            if (order_list.hasOwnProperty(item)) {
              time = utils.formatTime(new Date(order_list[item].create_time))
                order_list[item].time = time
            }
          }
          this.setData({
            order_list:order_list
          })
        }else {
          this.setData({
            noDetails:true
          })
        }
        }, reqbody);
        break;
      case "resend":
        this.setData({
          orderTitle: "resend",
          noDetails: false
        });
        var platform = app.globalData.platform;
        var url = app.globalData.baseUrlTpost + 'order/order_list?';
        var reqbody = {
          common: {
            'snsid': '100001236',
            'sid': 'AES5A65396678476B68773864497278596B6559764F59513D3D',
            'platform': platform,
            'uid':0,
            "language": "CN"
          },
          params: {
            order_status:1,
            page_no:1,
            page_size:20
          }
        }
        utils.Md5http(url, (dataStr) => {
          console.log('获取订单详情已付款', dataStr);
          if (dataStr.rc.c == 0) {
          var  order_list = dataStr.order_list;
          if (order_list.length == 0) {
            this.setData({
              noDetails:true
            })
          }
          var time_list = [], time;
          for (var item in order_list) {
            if (order_list.hasOwnProperty(item)) {
              time = utils.formatTime(new Date(order_list[item].create_time))
                order_list[item].time = time
            }
          }
          this.setData({
            order_list:order_list
          })
        }else {
          this.setData({
            noDetails:true
          })
        }
        }, reqbody);
        break;
      case "sended":
        this.setData({
          orderTitle: "sended",
          noDetails: false
        });
        var platform = app.globalData.platform;
        var url = app.globalData.baseUrlTpost + 'order/order_list?';
        var reqbody = {
          common: {
            'snsid': '100001236',
            'sid': 'AES5A65396678476B68773864497278596B6559764F59513D3D',
            'platform': platform,
            'uid':0,
            "language": "CN"
          },
          params: {
            order_status:3,
            page_no:1,
            page_size:20
          }
        }
        utils.Md5http(url, (dataStr) => {
          console.log('获取订单详情已发货', dataStr);
          if (dataStr.rc.c == 0) {
          var  order_list = dataStr.order_list;
          if (order_list.length == 0) {
            this.setData({
              noDetails:true
            })
          }
          var time_list = [], time;
          for (var item in order_list) {
            if (order_list.hasOwnProperty(item)) {
              time = utils.formatTime(new Date(order_list[item].create_time))
                order_list[item].time = time
            }
          }
          this.setData({
            order_list:order_list
          })
        }else {
          this.setData({
            noDetails:true
          })
        }
        }, reqbody);
        break;
        case "Invalid":
          this.setData({
            orderTitle: "Invalid",
            noDetails: false
          });
          var platform = app.globalData.platform;
          var url = app.globalData.baseUrlTpost + 'order/order_list?';
          var reqbody = {
            common: {
              'snsid': '100001236',
              'sid': 'AES5A65396678476B68773864497278596B6559764F59513D3D',
              'platform': platform,
              'uid':0,
              "language": "CN"
            },
            params: {
              order_status:2,
              page_no:1,
              page_size:20
            }
          }
          utils.Md5http(url, (dataStr) => {
            console.log('获取订单详情已失效', dataStr);
            if (dataStr.rc.c == 0) {
            var  order_list = dataStr.order_list;
            if (order_list.length == 0) {
              this.setData({
                noDetails:true
              })
            }
            var time_list = [], time;
            for (var item in order_list) {
              if (order_list.hasOwnProperty(item)) {
                time = utils.formatTime(new Date(order_list[item].create_time))
                  order_list[item].time = time
              }
            }
            this.setData({
              order_list:order_list
            })
          }else{
            this.setData({
              noDetails:true
            })
          }
          }, reqbody);
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
  delete_Ord(e){
    var that = this;
    wx.showModal({//预览后提示
      title: '提示',
      content: '订单信息删除之后不再显示相关内容，确认删除订单信息',
      success: function(res) {//确认删除订单提示
        if (res.confirm) {
          var order_no = e.currentTarget.dataset.ord_no;
          console.log('order_no',order_no);
          var platform = app.globalData.platform;
          var url = app.globalData.baseUrlTpost + 'order/del_order?';
          var reqbody = {//删除订单请求体
            common: {
              'snsid': '100001236',
              'sid': 'AES5A65396678476B68773864497278596B6559764F59513D3D',
              'platform': platform,
              'uid':0,
              "language": "CN"
            },
            params: {
              order_no:order_no
            }
          }
          utils.Md5http(url, (dataStr) => {
            if (dataStr.rc.c == 0) {//删除订单成功--从新请求
              var platform = app.globalData.platform;
              var url = app.globalData.baseUrlTpost + 'order/order_list?';
              var reqbody = {
                common: {
                  'snsid': '100001236',
                  'sid': 'AES5A65396678476B68773864497278596B6559764F59513D3D',
                  'platform': platform,
                  'uid':0,
                  "language": "CN"
                },
                params: {
                  order_status:2,
                  page_no:1,
                  page_size:20
                }
              }
              utils.Md5http(url, (dataStr) => {//刷新请求
                if (dataStr.rc.c == 0) {
                var  order_list = dataStr.order_list;
                if (order_list.length == 0) {
                  that.setData({
                    noDetails:true
                  })
                }
                var time_list = [], time;
                for (var item in order_list) {
                  if (order_list.hasOwnProperty(item)) {
                    time = utils.formatTime(new Date(order_list[item].create_time))
                      order_list[item].time = time
                  }
                }
                that.setData({//更新数据
                  order_list:order_list
                })
              }else{
                this.setData({
                  noDetails:true
                })
              }
              }, reqbody);
            }
          }, reqbody);

        }

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
