<template>
  <div>
    <div class="user">
        <div class="img-con">
            <i-file @fileData='fileData' v-show="userType === '2'" class="i-file"></i-file>
            <img :src="userInfo.photo">
        </div>
        <div class="text-con">{{userInfo.userAcct}}</div>
    </div>

    <!-- 店长 -->
    <div class="shop-info" v-show="userType === '1'">
      <div>
        <span><img src="../../assets/门店.png" alt=""></span>
        <span>门店：{{userInfo.storeName}}</span>
      </div>
      <div>
        <span><img src="../../assets/邀请码.png" alt=""></span>
        <span>邀请码：{{userInfo.inviteCode}}</span>
      </div>
      <div>
        <span><img src="../../assets/position2.png" alt=""></span>
        <span class="address">{{userInfo.address}}</span>
      </div>
    </div>

    <!-- 司机 -->
    <div class="driver-info" v-show="userType === '3'">
      <div>
        <span><img src="../../assets/卡车.png" alt="" class="carImg"></span>
        <span>{{userInfo.userName}}</span>
      </div>
      <div>
        <span><img src="../../assets/手机.png" alt="" class="phoneImg"></span>
        <span>{{userInfo.phone}}</span>
      </div>
    </div>

    <div class="content">
        <div class="con-item" @click="$router.push('/order-list')" v-show="userType === '2'">
            <div>
                <img src="../../assets/订单.png" alt="">
            </div>
            <div><span>我的订单</span></div>
            <div>
                <img src="../../assets/右.png" alt="">
            </div>
        </div>
        <div class="con-item" @click="$router.push('/change-password')">
            <div>
                <img src="../../assets/修改密码.png" alt="">
            </div>
            <div><span>修改密码</span></div>
            <div>
                <img src="../../assets/右.png" alt="">
            </div>
        </div>
        <div class="con-item" @click="$router.push('/change-store-code')" v-show="userType === '2'">
            <div>
                <img src="../../assets/邀请码.png" alt="">
            </div>
            <div><span>修改店铺邀请码</span></div>
            <div>
                <img src="../../assets/右.png" alt="">
            </div>
        </div>
        <div class="con-item" @click="signOut">
            <div>
                <img src="../../assets/退出.png" alt="">
            </div>
            <div><span>退出登录</span></div>
            <div>
                <img src="../../assets/右.png" alt="">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/mine.js'
import IFile from '@/components/common/i-file.vue'

export default {
  name: 'mine',
  components: {
    IFile
  },
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    userType () {
      return JSON.parse(sessionStorage.getItem('roleInfo')).role
    }
  },
  mounted () {
    // 获取用户信息
    req('getUserInfo', {}).then(data => {
      this.userInfo = data.data
    })
  },
  methods: {
    signOut () {
      this.$router.push('/login')
      sessionStorage.clear('userInfo')
      sessionStorage.clear('roleInfo')
      sessionStorage.clear('currentComm')
    },
    // 修改头像后的接收函数
    fileData (value) {
      this.userInfo.photo = value
    }
  }
}
</script>

<style lang="scss" scoped>
  .user {
      width: 100%;
      display: flex;
      .img-con {
          flex: 1;
          display: flex;
          align-items: center;
          position: relative;
          img {
            width: 70px;
            height: 70px;
            position: absolute;
            left: 38%;
            border-radius: 50%;
          }
          .i-file {
            position: absolute;
            left: 38%;
          //   width: 70px;
          //   height: 70px;
          //   position: relative;
          //   left: 38%;
          //   border-radius: 50%;
          //   z-index: 1;
          }
      }
      .text-con {
          flex: 2;
          line-height: 105px;
          font-size: 22px;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
      }
  }

  .shop-info {
    padding: 18px 16px;
    box-sizing: border-box;
    background: #fff;
    width: 95%;
    margin: 0 auto;
    border-radius: 8px;
    margin-bottom: 10px;

    >div {
      display: flex;
      width: 100%;
      align-items: center;
      padding: 10px 0;
      // height: 40px;

      >span:first-child {
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        >img {
          width: 16px;
          height:18px;
          margin-right: 9px;
        }
      }
      >span:nth-child(2) {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

      .address {
        overflow: hidden;
        overflow-wrap: break-word;
      }
    }
  }

  .driver-info {
    padding: 18px 16px;
    box-sizing: border-box;
    background: #fff;
    width: 95%;
    margin: 0 auto;
    border-radius: 8px;
    margin-bottom: 10px;

    >div {
      display: flex;
      width: 100%;
      align-items: center;
      padding: 10px 0;
      >span:first-child {
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        .carImg {
          width: 20px;
          height: 18px;
          margin-right: 5px;
        }
        .phoneImg {
          width: 16px;
          height: 18px;
          margin-right: 6px;
          margin-left: 3px;
        }
      }
      >span:nth-child(2) {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }

  .content {
      width: 95%;
      // height: 206px;
      padding: 18px 16px;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background-color: white;
      border-radius: 8px;
      .con-item {
          width: 100%;
          flex: 1;
          display: flex;
          div:nth-child(1) {
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                  width: 14px;
                  height: 16px;
              }
          }
          div:nth-child(2) {
              flex: 1;
              line-height: 42.5px;
              font-size: 17px;
              span {
                  position: relative;
                  left: 10px;
              }
          }
          div:nth-child(3) {
              width: 10px;
              display: flex;
              align-items: center;
              img {
                  width: 100%;
                  height: 14px;
              }
          }
      }
  }
  .img-spc {
      width: 15px;
      height: 15px;
  }
</style>
