import req from '../fetch/index.js'

const config = {
  // 获取门店信息
  getStoreInfo: {
    url: 'app/driver/findStoreById',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
