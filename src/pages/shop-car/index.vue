<template>
  <div class="container">
    <ul class="book-list">
      <li class="book-list-item" v-for="(item, index) in list" :key="index">

        <!-- 选择按钮 -->
        <div class="select-btn-box">
          <div>
            <input type="checkbox" @change="inputChange(item)">
            <div class="action" :style="{display: item.checked ? 'block' : 'none'}"></div>
          </div>
        </div>
        <!-- 书本信息 -->
        <div class="book-count-info">
          <img :src="item.goodsPhoto" alt="">
          <div>
            <div>{{item.goodsName}}</div>
            <!-- <div>这里要删除这里要删除这里要删除这里要删除这里要删除这里要删除</div> -->
            <div>
              <span>￥{{item.sellPrice}}</span>
              <div class="change-count-box">
                <div @click="countDelete(item)">-</div>
                <div>{{item.goodsCnt}}</div>
                <div @click="countAdd(item)">+</div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div class="close-count">
      <div class="all-box">
        <div>
          <input type="checkbox" @change="allInputChange">
          <div class="action" :style="{display: allChecked ? 'block' : 'none'}"></div>
        </div>
        <span>全选</span>
      </div>

      <div class="total-box">
        <div>
          <span>合计:</span>
          <span>￥{{totalPrice.toFixed(2)}}</span>
        </div>

        <button @click="settlement">结算({{totalType}})</button>
        <button @click="deleteShopCar">删除</button>
      </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/shop-car.js'
import axios from 'axios'

export default {
  name: 'shop-car',
  data () {
    return {
      allChecked: false,
      totalPrice: 0,
      list: [],
      totalType: 0
    }
  },
  mounted () {
    this.getShopCarList()
  },
  methods: {
    // 查询购物车列表
    getShopCarList () {
      req('getShopData', {pageSize: 100, pageNum: 1}).then(data => {
        this.list = data.data.list.map(item => {
          // 为每一个item都加上checked字段
          return Object.assign({}, item, {checked: false})
        })

        this.allChecked = false
        this.totalPrice = this.getTotal()
        this.totalType = this.getTotalType()
      })
    },
    // 结算
    settlement () {
      let payCommList = this.list.filter(item => {
        return item.checked === true
      })

      if (!payCommList.length) {
        this.$message.info('请先选择需要购买的商品')
        return
      }

      if (!JSON.parse(sessionStorage.getItem('roleInfo')).storeId) {
        this.$message.info('请绑定店铺邀请码再进行购买')
        return
      }

      axios({
        method: 'post',
        url: 'http://112.74.100.14:8080/app/order/addOrder', // http://112.74.100.14:8080 http://2r991680e8.qicp.vip
        data: JSON.stringify({
          storeId: JSON.parse(sessionStorage.getItem('roleInfo')).storeId,
          orderDetailsInfos: this.list.filter(item => {
            return item.checked === true
          }).map(item => {
            return Object.assign({}, {goodsCode: item.goodsCode, sellPrice: item.sellPrice, buyNum: item.goodsCnt, cartId: item.cartId})
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
    },
    deleteShopCar () {
      let payCommList = this.list.filter(item => {
        return item.checked === true
      })

      if (!payCommList.length) {
        this.$message.info('请先选择需要删除的商品')

        return
      }

      let shopCartIds = this.list.filter(item => {
        return item.checked === true
      }).map(item => {
        return item.cartId
      }).toString()

      req('deleteShopCar', {cartId: shopCartIds}).then(data => {
        if (data.code === 0) {
          this.$message.success('删除成功')

          this.getShopCarList()
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 全选按钮
    allInputChange () {
      this.allChecked = !this.allChecked

      this.list.forEach(item => {
        item.checked = this.allChecked
      })

      this.totalPrice = this.getTotal()
      this.totalType = this.getTotalType()
    },
    // 单选按钮
    inputChange (item) {
      item.checked = !item.checked

      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].checked === false) {
          this.allChecked = false

          break
        } else {
          this.allChecked = true
        }
      }

      this.totalPrice = this.getTotal()
      this.totalType = this.getTotalType()
    },
    countDelete (item) {
      if (item.goodsCnt > 1) {
        item.goodsCnt = item.goodsCnt - 1
      }

      this.totalPrice = this.getTotal()
    },
    countAdd (item) {
      item.goodsCnt = item.goodsCnt + 1

      this.totalPrice = this.getTotal()
    },
    getTotal () {
      let total = 0

      this.list.forEach(item => {
        if (item.checked) {
          total = total + parseFloat(item.goodsCnt * item.sellPrice)
        }
      })
      // 取到小数点后两位数
      return parseFloat(total.toFixed(2))
    },
    // 获取购物车书籍类型总数
    getTotalType () {
      let payCommList = this.list.filter(item => {
        return item.checked === true
      })
      return payCommList.length
    }
  }
}
</script>

<style lang="scss" scoped>
  .book-list {
    width: 100%;
    // position: absolute;
    // left: 50%;
    // bottom: 55px;
    overflow: auto;
    padding: 10px 10px 50px 10px;
    box-sizing: border-box;
    // transform: translate(-50%, 0);

    li {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 150px;
      background: #fff;
      border-radius: 10px;
      padding: 10px 10px;
      box-sizing: border-box;
      margin-bottom: 10px;

      .select-btn-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 100%;

        >div {
          position: relative;
          width: 15px;
          height: 15px;
          border: 2px solid #ddd;
          border-radius: 50%;

          input {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            padding: 0;
            margin: 0;
            width: 15px;
            height: 15px;
            z-index: 1;
            opacity: 0;
          }

          .action {
            display: none;
            position: absolute;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: rgb(197, 156, 104);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 0;
          }
        }
      }

      .book-count-info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex: 1;
        height: 100%;

        >img {
          width: 25%;
          height: 80%;
          vertical-align: middle;
          align-self: center;
        }

        >div {
          width: 75%;
          > div:first-child {
            font-size: 14px;
            width: 100%;
            height: 40px;
            line-height: 40px;
            padding-left: 10px;
            box-sizing: border-box;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }

          // > div:nth-child(2) {
          //   font-size: 14px;
          //   width: 100%;
          //   height: 30px;
          //   padding-left: 10px;
          //   box-sizing: border-box;
          //   color: #ddd;
          // }

          > div:nth-child(2) {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            width: 100%;
            height: 40px;
            line-height: 40px;
            padding-left: 10px;
            box-sizing: border-box;
            margin-top: 20px;

            > span {
              color: red;
            }

            .change-count-box {
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
        }
      }
    }
  }

.close-count {
  position: fixed;
  bottom: 59px;
  width: 100%;
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;

  .all-box {
    display: flex;
    width: 57px;
    height: 50px;
    align-items: center;
    margin-left: 5px;
    margin-right: 5px;

    >div {
      position: relative;
      width: 15px;
      height: 15px;
      border: 2px solid #ddd;
      border-radius: 50%;
      margin-right: 5px;

      input {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 0;
        margin: 0;
        width: 15px;
        height: 15px;
        z-index: 1;
        opacity: 0;
      }

      .action {
        display: none;
        position: absolute;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: rgb(197, 156, 104);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 0;
      }
    }
    > span {
      font-size: 14px;
    }
  }

  .total-box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 50px;
    flex: 1;

    >div:first-child {
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      flex: 1;
      // margin-left: 10px;
      display: flex;
      align-items: center;
      span:first-child {

      }

      span:nth-child(2) {
        font-size: 18px;
        color: red;
        overflow: hidden;
        text-overflow: ellipsis;
        /* display: -webkit-box; */
        // -webkit-line-clamp: 1;
        // -webkit-box-orient: vertical;
        width: 115px;
      }
    }

    button {
      width: 80px;
      height: 40px;
      background: rgb(197, 156, 104);
      color: #fff;
      outline: none;
      line-height: 40px;
      text-align: center;
      border: none;
      border-radius: 10px;
      margin-left: 10px;
    }

    button:nth-child(3) {
      background: red;
    }
  }
}

</style>
