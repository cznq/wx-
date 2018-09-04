const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const mformatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()+1
  return [year, month, day].map(mformatNumber).join('-')
}

const mformatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
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
  wx.request({
    url: url,
    data: reqbody,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
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
module.exports = {
  formatTime,
  mformatTime,
  http,
  mHttp
}
