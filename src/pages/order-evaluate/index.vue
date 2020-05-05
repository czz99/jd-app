<template>
  <div class="container">
    <div class="comm" v-for="(item, index) in evaluateList" :key="index">
      <div class="pic-info">
        <img :src="item.goodsPhoto" alt="">

        <div class="star">
          <!-- <span>宝贝描述</span> -->
          <el-rate v-model="item.commentLevel"></el-rate>
          <span v-show="item.commentLevel === 1">非常差</span>
          <span v-show="item.commentLevel === 2">差</span>
          <span v-show="item.commentLevel === 3">一般</span>
          <span v-show="item.commentLevel === 4">好</span>
          <span v-show="item.commentLevel === 5">非常好</span>
        </div>
      </div>

      <div class="eva-box">
        <div class="title">分享你的使用体验吧</div>

        <el-input v-model="item.evaluateContent" style="display: block;width:95%;margin: 0 auto;" type="textarea" :rows="5" placeholder="请输入您的评价"></el-input>
      </div>
    </div>
    <el-button class="submit-btn" type="primary" @click="addEvaluate">提交</el-button>
  </div>
</template>

<script>
// import req from '@/api/order-evaluate.js'
import axios from 'axios'
// const qs = require('qs')

export default {
  name: 'order-evaluate',
  data () {
    return {
      evaluateList: [],
      isEvaluate: true,
      map: true
    }
  },
  mounted () {
    this.evaluateList = this.$route.query.orderDetailsInfos
  },
  methods: {
    addEvaluate () {
      this.isEvaluate = true
      this.map = true // 让提示不再循环遍历

      // 检查是否有评选星级
      this.evaluateList.map(item => {
        if (!item.commentLevel && this.map === true) {
          this.$message.info('请评选星级')
          this.isEvaluate = false
          this.map = false
        }
      })
      if (this.isEvaluate) {
        axios({
          method: 'post',
          url: 'http://112.74.100.14:8080/app/order/saveOrderComment', // http://112.74.100.14:8080 http://2r991680e8.qicp.vip
          data: JSON.stringify({
            orderId: this.$route.query.orderId,
            list: this.evaluateList.map(item => {
              // console.log(item.commentLevel)
              return Object.assign({}, {goodsCode: item.goodsCode, comment: item.evaluateContent, commentLevel: item.commentLevel})
            })
          }),
          headers: {
            'Content-Type': 'application/json;',
            Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('userInfo')).access_token
          }
        }).then(data => {
          if (data.data.code === 0) {
            this.$message.success('评价成功')

            this.$router.push({path: '/order-list'})
          } else {
            this.$message.error(data.data.msg)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 10px;
  padding-bottom: 50px;
  box-sizing: border-box;

  .comm {
    width: 95%;
    margin: 0 auto;
    border-radius: 10px;
    background: #fff;
    padding-bottom: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;

    .pic-info {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      box-sizing: border-box;

      img {
        width: 150px;
        height: 150px;
      }

      .star {
        display: flex;
        position: absolute;
        left: 170px;
        /deep/ .el-rate__item {
              height: 30px;
          .el-rate__icon {
            font-size: 25px;
            line-height: 30px
          }
        }
        >span {
          height: 30px;
          line-height: 30px;
          margin-left: 10px;
          color: rgb(247, 186, 42);
        }
      }
    }

    .eva-box {
      width: 100%;
      .title {
        padding-left: 10px;
        line-height: 40px;
      }
      /deep/ .el-textarea {
        display: block;
        width: 95%;
        margin: 0px auto;
        border: 1px solid #ddd;
        border-radius: 5px;
        .el-textarea__inner {
          border: none;
        }
      }
    }
  }

  .submit-btn {
    display: block;
    width: 94%;
    height: 50px;
    line-height: 50px;
    position: fixed;
    bottom: 0;
    left: 3%;
    border-radius: 10px;
    border: rgb(195, 152, 98);
    background: rgb(195, 152, 98);
    font-size: 18px;
  }
}
</style>
