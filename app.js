const aldstat = require('./utils/ald-stat.js')
const utils = require('./utils/util.js');
//app.js
App({
  onLaunch: function() {
    var _that = this;
    try {
      var res = wx.getSystemInfoSync();
      if (res.platform =='ios') {
        res.platform = 'iPhone'
      }
      _that.globalData.platform = res.platform;
      _that.globalData.language = res.language;
      _that.globalData.model = res.model;//手机型号
      _that.globalData.system = res.system;//操作系统版本
      _that.globalData.version = res.version;//微信版本号
      _that.globalData.width = res.screenWidth;//屏幕宽度
      _that.globalData.height = res.screenHeight;//屏幕高度
      _that.globalData.brand = res.brand;//手机品牌
      console.log('获取设备信息', res);
    } catch (e) {
      console.log('获取系统信息失败');
    }
    wx.getNetworkType({
      success:function(res){
        // console.log('网络类型',res);
        _that.globalData.networkType = res.networkType
        if (_that.globalData.networkType !='none') {
          _that.globalData.isConnected = true
        }
      }
    })
    wx.onNetworkStatusChange(function(res){
      console.log('监听网络状态',res);
      _that.globalData.isConnected = res.isConnected
      _that.globalData.networkType = res.networkType
    })
  },
  getOpenid: function() {
    var _that = this;
    var userInfo = {};
    // userInfo = wx.getStorageSync('userInfo');
    return new Promise(function(resolve, reject) {
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log('当前coded为', res.code);
          _that.globalData.code = res.code;
          // 首次登陆调注册接口获取openid&&userid
          if (!userInfo.userId || userInfo.userId == undefined) {
            var url = _that.globalData.baseUrlT + 'applet/loginByCode';
            var reqbody = {
              "common": {
                "uid": 0, //先写死--
                "platform": _that.globalData.platform,
                "language": _that.globalData.language
              },
              "params": {
                "code": res.code
              }
            }
            utils.http(url, (dataStr) => {
              console.log('据code获取登陆信息', dataStr);
              if (dataStr.code == 0) {
                _that.globalData.userId = dataStr.sns_id;
                _that.globalData.openId = dataStr.open_id;
                _that.globalData.session_id = dataStr.session_id;
                console.log('app.globalData.userId',_that.globalData.userId);
                console.log('app.globalData.openId',_that.globalData.openId);
                // userInfo = {
                //   userId: _that.globalData.userId,
                //   openId: _that.globalData.openId,
                //   session_id: _that.globalData.session_id
                // }
                // wx.setStorageSync('userInfo', userInfo);
                resolve(userInfo);
              } else {
                wx:showToast({
                  title:'登陆接口失败',
                  icon:'none'
                })
              }
            }, reqbody);
          } else {
            resolve(userInfo);
          }
        }
      })
    });
  },
  globalData: {
    isConnected:false,
    networkType:'none',
    userInfo: null,
    baseUrl: 'http://192.168.1.232:8883/api/',//登陆接口
    baseUrlT: 'https://uc.api.moji.com/mapi/',//登陆接口线上接口
    baseUrlPost: 'http://192.168.1.232:8886/postcard/',//明信片接口
    baseUrlTpost: 'https://pcd.api.moji.com/',//明信片线上接口
    baseUrluploadFile:'http://snsforum.mojitest.com/snsupload/upload/json/upload',//上传接口
    baseUrlTuploadFile:'https://snsup.moji.com/snsupload/upload/json/upload',//上传线上接口
    language: '',
    platform: '',
    model:'',
    version:'',
    system:'',
    width:'',
    height:'',
    brand:'',
    userId: '',
    openId: '',
    session_id: '',
    original_price: '', //订单总价
    postage_fee: '', //邮费0不展示
    postage_copywriting: '', //邮费文案
    express_delivery_copywriting: '', //快递文案
    original_copywriting: '', //原价文案
    postcard_picture_type: 0, //	0:横图 1:竖图
    postcard_picture_width: 0, //图片宽度
    postcard_picture_height: 0, //图片高度
    postcard_front_url: '', //明信片正面
    avatarUrl: "", //getUserInfo
    city: "",
    country: "",
    gender: 1,
    nickName: "",
    province: "",
    order_no:'',
    postcard_picture_url:'',//上传到服务器端原图
    originalImage:'',//选择原图
    original_image:''//本地切图
  }
})
