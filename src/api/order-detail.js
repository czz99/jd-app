import req from '../fetch/index.js'

const config = {
  // 获取订单详情
  getClientDetail: {
    url: 'app/order/findOrderById',
    method: 'post'
  }
  // getShopDetail: {
  //   url: '/app/managerOrder/listManagerOrderDeepen',
  //   method: 'post'
  // }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
