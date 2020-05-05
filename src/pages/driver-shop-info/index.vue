<template>
  <div class="container">
    <div class="box" v-for="(item, index) in storeInfoList" :key="index">
      <div class="shop-info">
        <span><img src="../../assets/门店.png" alt=""></span>
        <span>{{item.storeCode}}</span>
      </div>
      <div>门店：{{item.storeName}}</div>
      <div>地址：{{item.address}}</div>
      <div>店长：{{item.managerName}}</div>
      <div>手机：{{item.storePhone}}</div>
    </div>
  </div>
</template>

<script>
import req from '@/api/driver-shop-info.js'

export default {
  name: 'driver-shop-info',
  data () {
    return {
      storeInfoList: []
    }
  },
  mounted () {
    req('getStoreInfo', {}).then(data => {
      this.storeInfoList = data.data
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin-top: 10px;
  .box {
    padding: 18px 16px;
    box-sizing: border-box;
    background: #fff;
    width: 95%;
    margin: 0 auto;
    border-radius: 8px;
    margin-bottom: 10px;

    .shop-info {
      display: flex;
      width: 100%;
      height: 40px;
      align-items: center;
      padding: 10px 0;
      box-sizing: border-box;

      >span:first-child {
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        >img {
          width: 16px;
          height: 18px;
          margin-right: 9px;
        }
      }
    }

    >div {
      // height: 30px;
      line-height: 30px;
      padding-left: 25px;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
