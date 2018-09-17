const utils = require('./utils/util.js');
//app.js
App({
  onLaunch: function() {

    try {
      var res = wx.getSystemInfoSync();
      this.globalData.platform = res.platform;
      this.globalData.language = res.language;
      console.log('获取设备信息',res);
    } catch (e) {
      console.log('获取系统信息失败');
    }

  },
  getOpenid: function() {
    var userInfo = {};
    userInfo = wx.getStorageSync('userInfo');
    console.log('获取登陆成功userInfo',userInfo);
    var _that = this;
    return new Promise(function(resolve, reject) {
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log('当前coded为', res.code);
          _that.globalData.code = res.code;
          // 首次登陆调注册接口获取openid&&userid
          if (!userInfo.userId || userInfo.userId == undefined) {
            console.log('登陆接口');
            var url = _that.globalData.baseUrlT + 'applet/loginByCode';
            var reqbody = {
              "common": {
                "uid": 0,//先写死--
                "platform": _that.globalData.platform,
                "language": _that.globalData.language
              },
              "params": {
                "code": res.code
              }
            }
            utils.http(url, (dataStr) => {
              console.log('据code获取登陆信息',dataStr);
              if (dataStr.code == 0) {
                _that.globalData.userId = dataStr.sns_id;
                _that.globalData.openId = dataStr.open_id;
                _that.globalData.session_id = dataStr.session_id;
                userInfo = {
                  userId: _that.globalData.userId,
                  openId: _that.globalData.openId,
                  session_id:_that.globalData.session_id
                }
                wx.setStorageSync('userInfo', userInfo);
                resolve(userInfo);
              }else {
                console.log('登陆接口失败',dataStr);
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
    userInfo: null,
    baseUrlT: 'http://192.168.1.232:8883/api/',
    baseUrl:'https://uc.api.moji.com/mapi/',
    baseUrlTpost: 'http://192.168.1.232:8886/postcard/',
    baseUrlPost: 'https://pcd.api.moji.com/',
    language: '',
    platform: '',
    userId:'',
    openId:'',
    session_id:'',
    original_price:'',//订单总价
    postage_fee:'',//邮费0不展示
    postage_copywriting:'',//邮费文案
    express_delivery_copywriting:'',//快递文案
    original_copywriting:''	//原价文案
  }
})
