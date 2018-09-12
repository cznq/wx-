const utils = require('./utils/util.js');
//app.js
App({
  onLaunch: function() {

    try {
      var res = wx.getSystemInfoSync();
      this.globalData.platform = res.platform;
      this.globalData.language = res.language;
      console.log(this.globalData.language);
      console.log(res);
    } catch (e) {
      console.log('获取系统信息失败');
    }

    // var userInfo = {};
    // userInfo = wx.getStorageSync('userInfo'); //读取本地userInfo
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
          // if (userInfo != '') {
          //   console.log('调用登陆接口');
          //   var url = this.globalData.baseUrl + 'maternal/user/login';
          //   console.log('userInfo.openId',userInfo.openId);
          //   var reqbody = {
          //     openId: userInfo.openId
          //   }
          //   utils.http(url, (dataStr) => {
          //     if (dataStr.success) {
          //       console.log('dataStr',dataStr);
          //     this.globalData.openId = dataStr.data.openId;
          //     this.globalData.sessionKey = dataStr.data.sessionKey;
          //     this.globalData.id = dataStr.data.id;
          //     console.log('this.globalData.id',this.globalData.id);
          //     }
          //   }, reqbody);
          // }
    //   }
    // })
  },
  getOpenid: function() {
    var userInfo = {};
    userInfo = wx.getStorageSync('userInfo');
    console.log('userInfo',userInfo);
    var _that = this;
    return new Promise(function(resolve, reject) {
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log('res.coded', res.code);
          _that.globalData.code = res.code;
          // 首次登陆调注册接口获取openid&&userid
          if (!userInfo.userId || userInfo.userId == undefined) {
            console.log('主动注册接口');
            var url = _that.globalData.baseUrlT + 'api/applet/loginByCode';
            var reqbody = {
              "common": {
                "uid": 198490817408925696,
                "platform": _that.globalData.platform,
                "language": _that.globalData.language
              },
              "params": {
                "code": res.code
              }
            }
            utils.http(url, (dataStr) => {
              console.log('dataStr',dataStr);
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
                console.log('userInfo111',userInfo);
                resolve(userInfo);
              }else {
                console.log('失败',dataStr);
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
    baseUrlT: 'http://192.168.1.232:8883/',
    baseUrlTpost: 'http://192.168.1.232:8886/postcard/',
    baseUrlPost: 'https://pcd.api.moji.com',
    baseUrl: 'https://nbmp.moji.com/',
    language: '',
    platform: '',
    userId:'',
    openId:'',
    session_id:''
  }
})
