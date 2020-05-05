import req from '../fetch/index.js'

const config = {
  // 查询购物车信息接口
  getShopData: {
    url: 'app/shopcart/listShopcart',
    method: 'post'
  },
  // 新增订单接口
  addOrder: {
    url: 'app/order/addOrder',
    method: 'post'
  },
  // 购物车删除接口
  deleteShopCar: {
    url: 'app/shopcart/deleteCart',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
