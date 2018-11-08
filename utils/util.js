const md5 = require('./md5.js');
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const mformatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(mformatNumber).join('-')
}

const mformatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
 // 将时间戳转换成日期格式
function timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0'+ date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
        var m = formatNumber(date.getMinutes());
        // var s = date.getSeconds();
        return Y+M+D+h+m;
    }
/**
 * 获取数据模块
 *
 * @param    {string}  url                 服务器地址
 * @param    {string}  callback             回调函数
 * @param    {Object}  reqbody             请求参数
 * @returns  void
 *
 * @date     2018-08-10
 * @author   wzj
 */
function http(url, callBack, reqbody) {
  wx.showLoading({
    title: '加载中',
  })
  var reqbody = reqbody ? reqbody : {};
  // console.log('reqbody',reqbody);
  wx.request({
    url: url,
    data: reqbody,
    method: 'POST',
    header: {
      'content-type': 'application/json'
    },
    success: function(res) {
      wx.hideLoading();
      callBack(res.data);
    },
    fail: function(error) {
      wx.hideLoading();
      console.log(error)
    }
  })
}
/**
 * 获取数据模块
 *
 * @param    {string}  url                 服务器地址
 * @param    {string}  callback             回调函数
 * @param    {Object}  reqbody             请求参数
 * @returns  void
 *
 * @date     2018-08-10
 * @author   wzj
 */
function Md5http(url, callBack, reqbody) {
  wx.showLoading({
    title: '加载中',
  })
  var value;
  var reqbody = reqbody ? reqbody : {};
  console.log('reqbody',reqbody);
    reqbody = JSON.stringify(reqbody)
  // if (platform == 'iphone') {
  //   value = reqbody + 'MojiWeather_iOS';
  //   console.log(value);
  // }else{
  //   value = reqbody + 'KAndroid';
  // }
  // value = md5.hex_md5(value).toUpperCase()
  // console.log('url::',url + 'sign='+value);
  wx.request({
    url: url + 'fromType=1',
    data: reqbody,
    method: 'POST',
    header: {
      'content-type': 'application/json'
    },
    success: function(res) {
      wx.hideLoading();
      callBack(res.data);
    },
    fail: function(error) {
      wx.hideLoading();
      console.log(error)
    }
  })
}
// 请求
function mHttp(url, data = {}, callBack, method = 'get', header = { 'content-type': 'application/json'}) {
  wx.request({
    url,
    data,
    method,
    header,
    success(res) {
      callBack(res.data);
    },
    fail(res) {
     console.log(res)
    }
  })
}
/**
 * 节流函数
 * @param method 事件触发的操作
 * @param mustRunDelay 间隔多少毫秒需要触发一次事件
 */
function throttle(method, mustRunDelay) {
    let timer,
        args = arguments,
        start;
    return function loop() {
        let self = this;
        let now = Date.now();
        if(!start){
            start = now;
        }
        if(timer){
            clearTimeout(timer);
        }
        if(now - start >= mustRunDelay){
            method.apply(self, args);
            start = now;
        }else {
            timer = setTimeout(function () {
                loop.apply(self, args);
            }, 50);
        }
    }
}
function howSize(limit){ //图片尺寸
  var size = '';
  if(limit  <  1024){    //小于0.1KB，则转化成B
    size = limit.toFixed(0) + '-' + 'B'
  }else if(limit <  1024 *1024){ //小于0.1MB，则转化成KB
    size = (limit / 1000).toFixed(0) + '-' + 'KB'
  }else if(limit <  1024 *1024 *1024){ //小于0.1GB，则转化成MB
    size = (limit / (1024 *1024)).toFixed(1) + '-' +  'MB'
  }else{                               //其他转化成GB
      size = (limit/(1024 * 1024 * 1024)).toFixed(0) + '-' +  "GB"
  }
   var sizeStr = size + "";                            //转成字符串
   var index = sizeStr.indexOf(".");                    //获取小数点处的索引
   var dou = sizeStr.substr(index + 1 ,2)            //获取小数点后两位的值
   if(dou == "00"){                                //判断后两位是否为00，如果是则删除00
       return sizeStr.substring(0, index) +'-'+ sizeStr.substr(index + 3, 2)
   }
  return size
}


module.exports = {
  formatTime,
  mformatTime,
  http,
  mHttp,
  Md5http,
  throttle,
  howSize,
  timestampToTime
}
