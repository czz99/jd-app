<template>
  <div class="container">
    <div class="leader">
        <ul>
            <li :class="{active: this.orderType === 'all'}" @click="getOrderList('', 'all')">全部订单</li>
            <li :class="{active: this.orderType === 'payed'}" @click="getOrderList('0', 'payed')">已付款</li>
            <li :class="{active: this.orderType === 'pickup'}" @click="getOrderList('2', 'pickup')">待取货</li>
            <li :class="{active: this.orderType === 'confirm'}" @click="getOrderList('4', 'confirm')">已完成</li>
        </ul>
    </div>
    <div class="order-item" v-for="item of list" :key="item.id" @click="toPage(item)">
        <div class="item-top">
            <img src="../../assets/订单.png" alt="">
            <span>{{item.orderId}}</span>
            <span>
                {{
                    item.orderState === '0' ? '已下单' :
                    item.orderState === '1' ? '已取消' :
                    item.orderState === '2' ? '已到货' :
                    item.orderState === '3' ? '已取货' :
                    item.orderState === '4' ? '已完成未评价' :
                    '已完成已评价'
                }}
            </span>
        </div>
        <div class="item-center" v-for="(childItem, index) in item.orderDetailsInfos" :key="index">
            <div class="img-con">
                <img :src="childItem.goodsPhoto" alt="">
            </div>
            <div class="text">
                <div class="text-con">
                    {{childItem.goodsName}}
                </div>
                <div class="props-con">
                    {{childItem.goodsProduce}}
                </div>
                <div class="price-con">
                    <!-- <span></span> -->
                    <span>￥{{childItem.sellPrice}} &nbsp;</span>
                    <span>x{{childItem.buyNum}}</span>
                </div>
            </div>
        </div>
        <!-- 店长端 -->
        <div class="shop-user-info" v-show="userType === '1'">
            <span><img src="../../assets/mine.png" alt=""></span>
            <span>{{item.userName}}</span>
            <span><img src="../../assets/手机.png" alt=""></span>
            <span>{{item.phone}}</span>
        </div>
        <div class="item-bottom">
            <span>共&nbsp;{{item.buyNums}}&nbsp;件商品，合计</span>
            <span>￥{{item.orderPrice}}</span>
        </div>
        <!-- 客户 -->
        <div class="item-more" v-show="userType === '2'">
            <div
              class="btn"
              @click.stop="changeOrderStatus(item, '1')"
              v-show="item.orderState === '0' || item.orderState === '2' || item.orderState === '3'">
                <span>取消订单</span>
            </div>
            <div class="btn" @click.stop="evaluate(item)" v-show="item.orderState === '4'">
                <span>评价</span>
            </div>
            <div class="btn" @click.stop="changeOrderStatus(item, '4')" v-show="item.orderState === '3'">
                <span>确认收货</span>
            </div>
        </div>
        <!-- 店长 -->
        <div class="item-more" v-show="userType === '1'">
            <div
              class="btn"
              @click.stop="changeOrderStatus(item, '1')"
              v-show="item.orderState === '0'">
                <span>取消订单</span>
            </div>
            <div class="btn" @click.stop="changeOrderStatus(item, '2')" v-show="item.orderState === '0'">
                <span>确认到货</span>
            </div>
            <div class="btn" @click.stop="changeOrderStatus(item, '0')" v-show="item.orderState === '2'">
                <span>取消到货</span>
            </div>
            <div class="btn" @click.stop="changeOrderStatus(item, '3')" v-show="item.orderState === '2'">
                <span>确认取货</span>
            </div>
            <div class="btn" @click.stop="changeOrderStatus(item, '2')" v-show="item.orderState === '3'">
                <span>取消取货</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/order-list.js'

export default {
  name: 'order-list',
  data () {
    return {
      list: [],
      orderType: 'all'
    }
  },
  computed: {
    userType () {
      return JSON.parse(sessionStorage.getItem('roleInfo')).role
    }
  },
  mounted () {
    this.getOrderList('', 'all')
  },
  methods: {
    getOrderList (orderState = '', type) {
      let data = {
        orderState: orderState,
        pageSize: 100,
        pageNum: 1
      }

      if (!orderState) {
        delete data.orderState
      }

      this.orderType = type
      // 客户端获取订单列表
      if (JSON.parse(sessionStorage.getItem('roleInfo')).role === '2') {
        req('getOrderList', {
          ...data, userCode: JSON.parse(sessionStorage.getItem('roleInfo')).customerCode
        }).then(data => {
          if (data.code === 0) {
            this.list = data.data.list
          } else {
            this.$message.info(data.msg)
          }
        })
        // 店长端获取订单列表
      } else {
        req('getOrderList', {
          ...data, storeId: JSON.parse(sessionStorage.getItem('roleInfo')).storeCode
        }).then(data => {
          // console.log(data)
          if (data.code === 0) {
            this.list = data.data.list
          } else {
            this.$message.info(data.msg)
          }
        })
      }
    },
    toPage (data) {
      this.$router.push({path: '/order-detail', query: data})
    },
    evaluate (data) {
      // console.log(data)
      this.$router.push({path: '/order-evaluate', query: data})
    },
    changeOrderStatus (item, changeStatus) {
      this.$confirm('确定进行该操作吗?').then(() => {
        req('changeOrderStatus', {orderId: item.orderId, orderState: changeStatus}).then(data => {
          if (data.code === 0) {
            this.$message.success('修改成功')
            // 刷新列表
            if (this.orderType === 'all') {
              this.getOrderList('', this.orderType)
            } else if (this.orderType === 'payed') {
              this.getOrderList('0', this.orderType)
            } else if (this.orderType === 'pickup') {
              this.getOrderList('2', this.orderType)
            } else if (this.orderType === 'confirm') {
              this.getOrderList('4', this.orderType)
            }
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 64px;
}
  .leader {
      height: 64px;
      width: 100%;
      position: fixed;
      background: #f2f2f2;
      top: 49px;
      z-index: 1;
      ul {
          height: 100%;
          padding: 0 0 0 2.5%;
          margin: 0;
          display: flex;
          li {
              line-height: 64px;
              padding: 0;
              margin: 0;
              list-style: none;
              padding: 0 13px;
              font-size: 15px;
          }
          .active {
              font-size: 17px;
              color: rgb(195,152,98);
          }
      }
  }
  .order-item {
      width: 95%;
      margin: 0 auto;
      background-color: white;
      border-radius: 8px;
      padding: 10px 15px;
      box-sizing: border-box;
      margin-bottom: 10px;
      .item-top {
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;
          img {
              width: 13px;
              height: 16px;
          }
          span:nth-child(2) {
              font-size: 16px;
              flex: 1;
              line-height: 38px;
              position: relative;
              left: 8px;
          }
          span:nth-child(3) {
              position: absolute;
              right: 0;
              font-size: 13px;
              color: rgb(195,152,98);
          }
      }
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
              flex: 2.2;
              .text-con {
                  font-size: 15px;
                  line-height: 22px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
              }
              .props-con {
                  font-size: 12px;
                  line-height: 26px;
                  color: rgb(168,168,168);
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
              }
              .price-con {
                  text-align: right;
                  line-height: 26px;
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
      .shop-user-info {
        display: flex;
        align-items: center;
        line-height: 40px;
        >span:first-child,:nth-child(3){
          width: 25px;
          height: 25px;
          display: flex;
          align-items: center;
          >img {
            width: 16px;
            height: 18px;
          }
        }
        >span:nth-child(2) {
          margin-right: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }

      }
      .item-bottom {
          width: 100%;
          line-height: 40px;
          text-align: right;
          span:nth-child(1) {
              font-size: 15px;
          }
          span:nth-child(2) {
              font-size: 20px;
              color: red;
          }
      }
      .item-more {
          width: 100%;
          display: flex;
          justify-content: flex-end;

          .btn {
              width: 85px;
              height: 25px;
              border-radius: 20px;
              position: relative;
              border: 1px solid rgb(195,152,98);
              margin-left: 5px;
              margin-top: 10px;
              margin-bottom: 6px;
              span {
                  font-size: 15px;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                //   margin-top: -10.4px;
                //   margin-left: -16px;
                    width: 100%;
                    text-align:center;
                  color: rgb(195,152,98);
              }
          }
      }
  }
</style>
