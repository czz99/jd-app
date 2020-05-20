<template>
  <div>
    <div class="content">
        <div class="con-top">
            <div class="top-item">
                <div class="top-img-con">
                    <img src="../../assets/门店.png">
                </div>
                <span>取货门店:{{orderDetail.storeName}}</span>
            </div>
            <div class="top-item">
                <div class="top-img-con">
                    <img src="../../assets/position2.png">
                </div>
                <span>{{orderDetail.storeAddress}}</span>
            </div>
        </div>
        <!-- <div class="line"></div> -->
        <div class="order-item" v-for="item of orderDetail.orderDetailsInfos" :key="item.id">
            <div class="item-center">
                <div class="img-con">
                    <img :src="item.goodsPhoto">
                </div>
                <div class="text">
                    <div class="text-con">{{item.goodsName}}</div>
                    <div class="props-con">{{item.goodsProduce}}</div>
                    <div class="price-con">
                        <!-- <span>￥</span> -->
                        <span>￥{{item.sellPrice}} </span>
                        <span>x{{item.buyNum}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="item-bottom">
            <span>共&nbsp;{{orderDetail.buyNums}}&nbsp;件商品，合计</span>
            <span>￥{{orderDetail.orderPrice}}</span>
        </div>
        <!-- 店长 -->
        <div class="shop-user-info" v-show="userType === '1'">
          <div>
            <span><img src="../../assets/mine.png" alt=""></span>
            <span>{{orderDetail.userName}}</span>
          </div>
          <div>
            <span><img src="../../assets/手机.png" alt=""></span>
            <span>{{orderDetail.phone}}</span>
          </div>
        </div>
    </div>
    <div class="order-msg">
        <ul>
            <li>订单信息</li>
            <li>订单编号：</li>
            <li>创建时间：</li>
            <li>订单状态：</li>
        </ul>
        <ul>
            <li></li>
            <li>{{orderDetail.orderId}}</li>
            <li>{{orderDetail.payTime}}</li>
            <li style="color: red;">{{orderType}}</li>
        </ul>
    </div>
  </div>
</template>

<script>
import req from '@/api/order-detail.js'

export default {
  name: 'order-detail',
  data () {
    return {
      orderDetail: {}
    }
  },
  computed: {
    userType () {
      return JSON.parse(sessionStorage.getItem('roleInfo')).role
    },
    orderType () {
      if (this.orderDetail.orderState === '0') {
        return '已下单'
      } else if (this.orderDetail.orderState === '1') {
        return '已取消'
      } else if (this.orderDetail.orderState === '2') {
        return '已到货'
      } else if (this.orderDetail.orderState === '3') {
        return '已取货'
      } else if (this.orderDetail.orderState === '4') {
        return '已完成未评价'
      } else {
        return '已完成已评价'
      }
    }
  },
  mounted () {
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail () {
      // if (this.userType === '2') {
      req('getClientDetail', {orderId: this.$route.query.orderId}).then(data => {
        // console.log(data)
        this.orderDetail = data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
      width: 95%;
      margin: 10px auto 10px;
      background-color: white;
      border-radius: 8px;
      padding: 13px 20px 0;
      box-sizing: border-box;
      .con-top {
          width: 100%;
          border-bottom: 1px solid #ddd;
          .top-item {
              display: flex;
              padding: 5px 0 22px;
              box-sizing: border-box;
              align-items: center;
              .top-img-con {
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
              span {
                font-size: 15px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
          }
      }
      // .line {
      //     width: 100%;
      //     height: 1px;
      //     background-color: rgb(204,204,204);
      //     margin: 5px 0;
      // }
      .order-item {
          width: 95%;
          margin: 0 auto;
          background-color: white;
          border-radius: 8px;
          padding: 10px 15px;
          box-sizing: border-box;
          .item-center {
              width: 100%;
              display: flex;
              box-sizing: border-box;
              padding-top: 5px;
              .img-con {
                  flex: 1;
                  text-align: center;
                  img {
                      width: 84px;
                  }
              }
              .text {
                  flex: 2;
                  position: relative;
                  .text-con {
                      font-size: 15px;
                      line-height: 22px;
                      overflow : hidden;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-line-clamp: 1;
                      -webkit-box-orient: vertical;
                  }
                  .props-con {
                      font-size: 12px;
                      line-height: 26px;
                      color: rgb(168,168,168);
                      overflow : hidden;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-line-clamp: 2;
                      -webkit-box-orient: vertical;
                  }
                  .price-con {
                      text-align: right;
                      // line-height: 26px;
                      position: absolute;
                      bottom: 0;
                      right: 0;
                      // span:nth-child(1) {
                      //     font-size: 11px;
                      //     color: rgb(242,0,0);
                      // }
                      span:nth-child(1) {
                          font-size: 15px;
                          color: rgb(242,0,0);
                      }
                      span:nth-child(2) {
                          font-size: 11px;
                          color: rgb(168,168,168);
                      }
                  }
              }
          }
      }
    .item-bottom {
        width: 100%;
        line-height: 40px;
        text-align: right;
        padding-top: 5px;
        box-sizing: border-box;
        span:nth-child(1) {
            font-size: 15px;
        }
        span:nth-child(2) {
            font-size: 20px;
            color: red;
        }
    }

      .shop-user-info {
        width: 100%;
        border-top: 1px solid #ddd;
        padding: 10px 0;
        box-sizing: border-box;

        >div {
          display: flex;
          width: 100%;
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
              height:18px;
              margin-right: 9px;
            }
          }
          >span:nth-child(2) {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }

          // img {
          //   vertical-align: middle;
          // }
        }
      }
  }
  .order-msg {
      width: 95%;
      background-color: white;
      box-sizing: border-box;
      padding: 8px 0 12px;
      margin: 0 auto;
      display: flex;
      border-radius: 8px;
      margin-bottom: 10px;
      ul:nth-child(1) {
          margin: 0;
          padding: 0;
          flex: 1;
          li:nth-child(1) {
              margin: 0;
              padding: 0 0 0 20%;
              box-sizing: border-box;
              list-style: none;
              font-size: 16.5px;
              font-weight: bold;
              line-height: 42px;
          }
          li:nth-child(2) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(3) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(4) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
      }
      ul:nth-child(2) {
          margin: 0;
          padding: 0;
          flex: 2;
          li:nth-child(1) {
              margin: 0;
              padding: 0;
              list-style: none;
              height: 42px;
          }
          li:nth-child(2) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(3) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(4) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
              color: rgb(195,152,98) !important;
          }
          .active {
              color: rgb(195,152,98);
          }
      }
  }
</style>
