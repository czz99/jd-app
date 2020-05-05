<template>
  <div class="container">
    <div class="book-banner">
      <img :src="commDetailData[0].goodsPhoto" alt="">
    </div>

    <div class="book-detail">
      <div class="book-price">￥{{commDetailData[0].sellPrice}}</div>
      <div class="book-name">{{commDetailData[0].goodsName}}</div>
      <div class="book-Describe">{{commDetailData[0].goodsDetail}}</div>
      <div class="comm-evaluate">
        评分:&nbsp;&nbsp;
        <div><span>{{commDetailData[0].evaluationlevel}}</span>&nbsp;分&nbsp;&nbsp;</div>
        <el-rate v-model="commDetailData[0].evaluationlevel" disabled></el-rate>
      </div>
      <div class="comm-saleCnt-inventory">
        <span>销量：{{commDetailData[0].saleCnt}}&nbsp;件</span>
        <span>库存：{{commDetailData[0].inventory}}&nbsp;件</span>
      </div>
      <div class="count-box">
        <span>数量</span>
        <div class="handler-box">
          <div @click="deleteCount">-</div>
          <div>{{bookCount}}</div>
          <div @click="addCount">+</div>
        </div>
      </div>
      <div class="address">
        <span>送至</span>
        <span class="iconfont iconhtmal5icon14"></span>
        <span>{{address}}</span>
      </div>
    </div>

    <div class="footer">
      <div @click="toShopCar">
        <img src="../../assets/shop_car2.png" alt="">
        <span>购物车</span>
      </div>

      <div @click="addShopCar">加入购物车</div>
      <div @click="payNow">立即购买</div>
    </div>
  </div>
</template>

<script>
import req from '@/api/comm-detail.js'
import axios from 'axios'

export default {
  name: 'comm-detail',
  data () {
    return {
      commDetailData: [
        {

        }
      ],
      bookCount: 1,
      address: ''
    }
  },
  computed: {
  },
  mounted () {
    // 获取商品详情
    req('getCommDetail', {goodsCode: JSON.parse(sessionStorage.getItem('currentComm')).goodsCode}).then(data => {
      this.commDetailData[0] = Object.assign({}, data.data, {
        evaluationlevel: Number(data.data.evaluationlevel)
      })
      this.address = JSON.parse(sessionStorage.getItem('roleInfo')).storeName
    })
  },
  methods: {
    deleteCount () {
      if (this.bookCount > 1) {
        this.bookCount--
      }
    },
    addCount () {
      if (this.bookCount >= this.commDetailData[0].inventory) {
        this.$message.info('库存不足~')
      } else {
        this.bookCount++
      }
    },
    toShopCar () {
      this.$router.push({path: '/shop-car'})
    },
    // 新增订单  数据格式为数组对象
    payNow () {
      if (this.bookCount > this.commDetailData[0].inventory) {
        this.$message.info('库存不足,无法购买~')
      } else {
        this.$confirm('确定立即购买该商品吗?').then(() => {
          if (!JSON.parse(sessionStorage.getItem('roleInfo')).storeId) {
            this.$message.info('请绑定店铺邀请码再进行购买')
            return
          }

          axios({
            method: 'post',
            url: 'http://112.74.100.14:8080/app/order/addOrder', // http://112.74.100.14:8080 http://2r991680e8.qicp.vip
            data: JSON.stringify({
              storeId: JSON.parse(sessionStorage.getItem('roleInfo')).storeId,
              orderDetailsInfos: this.commDetailData.map(item => {
                return Object.assign({}, {goodsCode: item.goodsCode, sellPrice: item.sellPrice, buyNum: this.bookCount})
              })
            }),
            headers: {
              'Content-Type': 'application/json;',
              Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('userInfo')).access_token
            }
          }).then(data => {
            if (data.data.code === 0) {
              this.$message.success('购买成功,请查看您的订单~')

              this.$router.push({path: '/order-list'})
            } else {
              this.$message.error(data.data.msg)
            }
          })
        }).catch(() => {})
      }
    },
    addShopCar () {
      if (this.bookCount > this.commDetailData[0].inventory) {
        this.$message.info('库存不足,无法加购~')
      } else {
        req('addShopCar', {goodsCode: this.commDetailData[0].goodsCode, goodsCnt: this.bookCount}).then(data => {
          if (data.code === 0) {
            this.$message.success('加购成功')

            // this.$router.push({path: '/shop-car'})
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: rgb(242, 242, 242);
}

.book-banner {
  width: 95%;
  height: 300px;
  padding: 10px;
  background: #fff;
  box-sizing: border-box;
  border-radius: 10px;
  margin: 10px auto;

  img {
    display: block;
    width: 80%;
    height: 100%;
    margin: 0 auto;
  }
}

.book-detail {
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
  width: 95%;
  border-radius: 10px;
  margin: 0 auto;
  margin-bottom: 60px;

  .book-price {
    height: 30px;
    line-height: 30px;
    font-size: 22px;
    color: red;
  }

  .book-name {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    // font-weight: bold;
  }

  .book-Describe {
    font-size: 14px;
    color: #a8a8a8;
    border-bottom: 1px solid #ddd;
    // padding: 5px 0 10px;\
    line-height: 30px;
    box-sizing: border-box;
    // word-wrap: break-word;
    // word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;  // 控制多行的行数
    -webkit-box-orient: vertical;
  }

  .comm-evaluate {
    margin-top: 10px;
    display: flex;
    align-items: center;
    height: 30px;
    line-height: 30px;
    div {
      display: flex;
      align-items: center;
      span {
        color: #f7ba2a;;
        font-size: 20px;
      }
    }
  }

  .comm-saleCnt-inventory {
    display: flex;
    justify-content: space-between;
    height: 30px;
    align-items: center;
  }

  .count-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 30px;

    .handler-box {
      display: flex;
      height: 25px;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 5px;

      div:first-child {
        width: 30px;
        height: 25px;
        text-align: center;
        line-height: 25px;
      }

      div:nth-child(2) {
        width: 40px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
      }

      div:nth-child(3) {
        width: 30px;
        height: 25px;
        text-align: center;
        line-height: 25px;
      }
    }
  }

  .address {
    // height: 30px;
    line-height: 30px;
    display: flex;
    align-items: center;

    .iconhtmal5icon14 {
      color: rgb(195, 152, 98);
      font-size: 20px;
    }
    span:nth-child(3) {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}

.footer {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  background: #fff;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  align-items: center;

   div:first-child {
    width: 50px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 12px;

    img {
      width: 25px;
      height: 25px;
    }
  }

  div:nth-child(2) {
    width: 100px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    border: 1px solid rgb(195, 152, 98);
    background: #fff;
    border-radius: 10px;
    margin-left: 10px;
    color: rgb(195,152,98);
  }

  div:nth-child(3) {
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: rgb(195, 152, 98);
    color: #fff;
    border-radius: 10px;
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
