<template>
  <div class="container">
    <div class='box' v-for="(item, index) in driverInfoList" :key="index">
      <div>
        <span><img src="../../assets/卡车.png" alt="" class="carImg"></span>
        <span>{{item.userName}}</span>
      </div>
      <div>
        <span><img src="../../assets/手机.png" alt="" class="phoneImg"></span>
        <span>{{item.phone}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/driver-info.js'

export default {
  name: 'driver-info',
  data () {
    return {
      driverInfoList: []
    }
  },
  mounted () {
    req('getDriverInfo', {}).then(data => {
      this.driverInfoList = data.data
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin-top: 10px;

  .box {
    // padding-left: 15px;
    // box-sizing: border-box;
    // border-bottom: 1px solid #ddd;
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
}
</style>
