import req from '../fetch/index.js'

const config = {
  // 查询商品评价接口
  getEvaluate: {
    url: 'app/goods/GoodsEvaluationList',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
