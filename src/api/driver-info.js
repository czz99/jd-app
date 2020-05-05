import req from '../fetch/index.js'

const config = {
  // 查询司机信息详情接口
  getDriverInfo: {
    url: 'app/manager/findDriverById',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
