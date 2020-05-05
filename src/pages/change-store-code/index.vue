<template>
  <div>
    <div class="content">
        <div class="con-left">新邀请码</div>
        <input type="text" v-model="newInviteCode" placeholder="请输入邀请码">
    </div>
    <div class="btn" @click="submit">
        <img src="../../assets/按钮.png" >
        <span>确认</span>
    </div>
  </div>
</template>

<script>
import req from '@/api/change-store-code.js'

export default {
  name: 'change-store-code',
  data () {
    return {
      newInviteCode: ''
    }
  },
  methods: {
    submit () {
      if (!this.newInviteCode) {
        this.$message.info('请输入邀请码')
        return
      }
      // 修改店铺邀请码接口
      req('changeStoreInviteCode', {newInviteCode: this.newInviteCode}).then(data => {
        if (data.code === 0) {
          this.$message.success('修改成功,可以开始购物啦~')
          // 修改后重新获取并保存个人信息，将对应的门店信息保存起来
          req('getUserInfo', {}).then(data => {
            sessionStorage.setItem('roleInfo', JSON.stringify(data.data))
          })

          setTimeout(() => {
            this.$router.push({path: '/shop-car'})
          })
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
      width: 95%;
      height: 90px;
      margin: 12px auto;
      background-color: white;
      display: flex;
      border-radius: 8px;
      font-size: 17px;
      padding: 12px 24px;
      box-sizing: border-box;
      .con-left {
          flex: 1;
          line-height: 66px;
          text-align: center;
      }
      input {
          flex: 2;
          border: none;
          outline: none;
          padding-left: 20px;
          box-sizing: border-box;
          font-size: 17px;
          color: rgb(168,168,168);
          &::placeholder {
              color: rgb(168,168,168)
          }
      }
  }
  .btn {
      width: 70%;
      height: 65px;
      margin: 0 auto;
      margin-top: 440px;
      position: relative;
      img {
          width: 100%;
          height: 100%;
      }
      span {
          font-size: 22px;
          color: white;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -14.4px;
          margin-left: -22px;
      }
  }
</style>
