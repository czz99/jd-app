import req from '../fetch/index.js'

const config = {
  // 查询一级分类接口
  getOneClassify: {
    url: 'app/goods/findGoodsClassOne',
    method: 'post'
  },
  // 查询二级分类接口
  getTwoClassify: {
    url: 'app/goods/findGoodsClassTwo',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
