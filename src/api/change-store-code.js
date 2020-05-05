import req from '../fetch/index.js'

const config = {
  // 修改店铺邀请码接口
  changeStoreInviteCode: {
    url: 'app/customer/updateCustomerInviteCode',
    method: 'post'
  },
  // 保存个人信息接口
  getUserInfo: {
    url: 'app/customer/appInformation',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
