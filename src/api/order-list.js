import req from '../fetch/index.js'

const config = {
  // 获取订单列表接口
  getOrderList: {
    url: 'app/order/listOrder',
    method: 'post'
  },
  // getShopOrderList: {
  //   url: '/app/managerOrder/listManagerOrders',
  //   method: 'post'
  // },
  changeOrderStatus: {
    url: 'app/order/updateOrderState',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
