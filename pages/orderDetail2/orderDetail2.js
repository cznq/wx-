// pages/orderDetail2/orderDetail2.js
const app = getApp();
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView:false,
    ord_no:'',
    order_status:4,
    receive_name:'',
    receive_mobile:'',
    receive_address:'',
    send_name:'',
    send_mobile:'',
    postcard_back_url:'',
    postcard_front_url:'',
    total_fee:0,
    postage_fee:0,
    order_fee:0,
    order_id:'',
    create_time:'',
    pay_type:0,
    help_mobile:0,
    qq_number:0,
    expire_time:0,
    hours:0,
    minutes:0,
    seconds:0,
    ship:false,
    ship_company:'',
    ship_no:'',
    ship_context:'',
    ship_status:'',
    ship_time:'',
    kefu:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options',options.ord_no);
    var that = this;
    that.setData({
      ord_no:options.ord_no
    })
    var url = app.globalData.baseUrlTpost + 'order/order_info?';
    var snsid = app.globalData.userId * 1;
    app.getOpenid().then(function() {
    var reqbody = {
      "common": {
        'snsid': app.globalData.userId,
        'sid': app.globalData.session_id,
        "uid": 0,
        "platform": app.globalData.platform,
        "language": 'CN',
        "device": app.globalData.brand,
        "os_version": app.globalData.system + "-" + app.globalData.version,
        "width": app.globalData.width,
        "height": app.globalData.height,
      },
      "params": {
        'order_no':options.ord_no
      }
    }
    utils.Md5http(url, (dataStr) => {
      console.log('订单详情信息', dataStr);
      if (dataStr.rc.c == 0) {
          var order = dataStr.order;
          var order_status = order.order_status;//订单状态 0:待付款 1:已付款,代发货 2:已失效 3:已发货
          if (order_status === 0) {
              var expire_time = order.expire_time;
              var hours = parseInt((expire_time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              var minutes = parseInt((expire_time % (1000 * 60 * 60)) / (1000 * 60));
              var seconds = parseInt((expire_time % (1000 * 60)) / 1000);
              that.setData({
                hours:hours,
                minutes:minutes,
                seconds:seconds,
                expire_time:expire_time
              })
              that.expireTime();
          }
          var receive_name = order.receive_name;//收件人
          var receive_mobile = order.receive_mobile;//收件人电话
          var receive_address = order.receive_city_name + order.receive_address;//收件地址
          var send_name = order.send_name;//发件人
          var send_mobile = order.send_mobile;//发件人电话
          var postcard_back_url = order.postcard_list[0].postcard_back_url;//明信片背面
          var postcard_front_url = order.postcard_list[0].postcard_front_url;//明信片正面
          var postcard_send_name = order.postcard_list[0].postcard_send_name;//明信片上的发送人
          var total_fee = order.total_fee / 100;//商品总价
          var postage_fee = order.postage_fee / 100;//邮费(以分为单位)
          var coupon_fee = order.coupon_fee / 100;//优惠劵金额(以分为单位)
          var order_fee = order.order_fee / 100;//订单金额(以分为单位)
          var pay_type = order.pay_type;//支付类型0-微信 1-支付宝
          var order_status_desc = order.order_status_desc;//根据expire_time自己显示
          var refund_status = order.refund_status;//退款状态
          var create_time = order.create_time;//创建时间
          var order_id = order.order_id;//订单编号
          var order_no = order.order_no;//订单号
          var create_time = order.create_time;//	创建时间
          var ship_company = order.ship_company;//物流公司
          var ship_no = order.ship_no;//邮寄单号
          var help_mobile = order.help_mobile;//客服电话
          var qq_number = order.qq_number;//	QQ群号
          var pay_time = order.pay_time;//	付款时间
          if (ship_company != void 0) {//存在物流信息
            var ship_context = order.ship.context
            var ship_status = order.ship.status
            var ship_time = order.ship.time
            that.setData({
              ship:true,
              ship_company:ship_company,
              ship_no:ship_no,
              ship_context:ship_context,
              ship_status:ship_status,
              ship_time:ship_time
            })
          }

          that.setData({
            order_status:order_status,
            receive_name:receive_name,
            receive_mobile:receive_mobile,
            receive_address:receive_address,
            send_name:send_name,
            send_mobile:send_mobile,
            postcard_back_url:postcard_back_url,
            postcard_front_url:postcard_front_url,
            total_fee:total_fee,
            postage_fee:postage_fee,
            order_fee:order_fee,
            order_id:order_id,
            create_time:create_time,
            pay_type:pay_type,
            help_mobile:help_mobile,
            qq_number:qq_number,
            showView:true
          })


      } else {
        console.log('获取配置信息接口失败', dataStr);
      }
    }, reqbody);
})

  },
expireTime(){
  var that = this;
  var setInter = setInterval(function(){
    var expire_time = that.data.expire_time -1000;
    var hours = parseInt((expire_time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((expire_time % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = parseInt((expire_time % (1000 * 60)) / 1000);
    that.setData({
      expire_time:expire_time,
      hours:hours,
      minutes:minutes,
      seconds:seconds
    })
  },1000)
},
shipDetail(){
  wx.navigateTo({
    url:'../expressInfo/expressInfo?ord_no='+ this.data.ord_no
  })
},
keepMake(){
  wx.reLaunch({
  url: '../home/home'
})
},
copyShipId(){
  wx.setClipboardData({
  data: this.data.ship_no
})
},
copyOrderId(){
  wx.setClipboardData({
  data: this.data.order_id +""
})
},
contactCusSer(){
  wx.makePhoneCall({
  phoneNumber: this.data.help_mobile //仅为示例，并非真实的电话号码
})
},
copy_qq(){
  wx.setClipboardData({
  data: this.data.qq_number
})
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  contact_custorm(){
    this.setData({
      kefu: true
    })
  },
  cancelKF(){
    this.setData({
      kefu: false
    })
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
