// pages/orderDetail/orderDetail.js
const app = getApp();
const utils = require('../../utils/util.js');
const base64 = require('../../utils/base64.js');
var Base64 = base64.Base64;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderTitle:'all',
    noDetails:false,
    order_list:[],
    backFlag:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!app.globalData.isConnected){
      wx.showToast({
        title:'无网络',
        icon:'none'
      })
      this.setData({
        noDetails:true
      })
      return false;
    }

    if (options.path && options.path =='order') {
      this.setData({
        backFlag:'order'
      })
    }
    // ---获取接口数据---
    var platform = app.globalData.platform;
    var url = app.globalData.baseUrlTpost + 'order/order_list?';
    var reqbody = {
      common: {
        'snsid': app.globalData.userId,
        'sid': app.globalData.session_id,
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
      console.log('order_list',order_list);
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
            'snsid': app.globalData.userId,
            'sid': app.globalData.session_id,
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
            'snsid': app.globalData.userId,
            'sid': app.globalData.session_id,
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
            'snsid': app.globalData.userId,
            'sid': app.globalData.session_id,
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
            'snsid': app.globalData.userId,
            'sid': app.globalData.session_id,
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
              'snsid': app.globalData.userId,
              'sid': app.globalData.session_id,
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
    if (this.data.backFlag == 'order') {
      wx.redirectTo({
        url: '../home/home',
      })
    }else{
      wx.navigateBack({
        url: '../home/home',
      })
    }

  },
  paybtn(e){
    var _that = this;
    console.log('e.currentTarget.dataset.index',e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    _that.data.order_list[index]
    // ---获取接口数据---
    var platform = app.globalData.platform;
    var url = app.globalData.baseUrlTpost + 'order/init_order?';
    var reqbody = {
      common: {
        'snsid': app.globalData.userId,
        'sid': app.globalData.session_id,
        'platform': platform,
        'uid': 0,
        "language": "CN"
      },
      params: {
        postcard_receive_name:'',//明信片上的接收人
        postcard_send_name:'',//明信片上的发送人
        post_mark:'',//邮戳
        postcard_content:'',//明信片上的寄语
        receive_name:_that.data.order_list[index].receive_name,//收件人姓名
        receive_mobile:_that.data.order_list[index].receive_mobile,//收件人电话
        receive_city_name:_that.data.order_list[index].receive_city_name,//收件人城市
        receive_address:_that.data.order_list[index].receive_address,//收件人详细地址
        send_mobile:'',//发送人电话
        send_name:'',//发送人姓名
        receive_msg_flag:'',
        postcard_picture_url:'',//明信片原图
        postcard_picture_type:0,//	0:横图 1:竖图
        postcard_picture_width:0,//图片宽度
        postcard_picture_height:0,//图片高度
        postcard_front_url:_that.data.order_list[index].postcard_front_url_list[0],//明信片正面
        postcard_template:0,//明信片模板
        coupon_ids:'',//优惠券ID
        order_fee:_that.data.order_list[index].order_fee,//订单金额(分为单位)
        pay_type:0,//0-微信 1-支付宝
        order_no:_that.data.order_list[index].order_no//	订单号
      }
    }
    utils.Md5http(url, (dataStr) => {
      console.log('dataStr', dataStr);
      if (dataStr.rc.c == 0) {
        console.log('dataStr.order_no',dataStr.postcard_order_info.order_no);
        console.log('dataStr.pay_sign',dataStr.postcard_order_info.pay_sign);
        var pay_sign = dataStr.postcard_order_info.pay_sign;
        pay_sign = JSON.parse(Base64.decode(pay_sign));
        // console.log('pay_sign',pay_sign);

        wx.requestPayment({
          timeStamp:pay_sign.timeStamp,
          nonceStr:pay_sign.nonceStr,
          package:pay_sign.package,
          signType:pay_sign.signType,
          paySign:pay_sign.paySign,
          success:function (res) {
            console.log(res);
            console.log('成功');
            wx.navigateTo({
              url:'../payComplete/payComplete?path='+'orderDetail'
            })
          },
          fail:function(res){
            console.log(res);
            console.log('失败');
            wx.showToast({
              title:'支付失败',
              icon:'none'
            })

          }
        })
      }
    }, reqbody);
    // 获取接口数据
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
              'snsid': app.globalData.userId,
              'sid': app.globalData.session_id,
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
                  'snsid': app.globalData.userId,
                  'sid': app.globalData.session_id,
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
    wx.hideShareMenu()
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
