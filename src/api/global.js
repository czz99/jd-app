import req from '../fetch/index.js'

const config = {
  // 获取个人信息接口
  getUserInfo: {
    url: 'app/customer/appInformation',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
