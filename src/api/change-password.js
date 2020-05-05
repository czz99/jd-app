import req from '../fetch/index.js'

const config = {
  // 修改密码接口
  changePassword: {
    url: '/app/user/updatePwd',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
