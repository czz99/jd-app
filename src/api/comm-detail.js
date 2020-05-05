
import req from '../fetch/index.js'

const config = {
  // 查询商品详情接口
  getCommDetail: {
    url: 'app/goods/findAppGoodsById',
    method: 'post'
  },
  // // 立即购买接口
  // payNow: {
  //   url: 'app/order/addOrder',
  //   method: 'post'
  // },
  // 购物车商品新增接口
  addShopCar: {
    url: 'app/shopcart/saveCart',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
