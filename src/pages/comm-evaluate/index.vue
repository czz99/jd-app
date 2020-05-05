<template>
  <div class="container">
    <div class="evaluate-title">
      <span :class="{active: evaluateBtnType === 'all'}" @click="getEvaluate('', 'all')">全部评价</span>
      <span :class="{active: evaluateBtnType === 'perfect'}" @click="getEvaluate('0', 'perfect')">好评</span>
      <span :class="{active: evaluateBtnType === 'good'}" @click="getEvaluate('1', 'good')">中评</span>
      <span :class="{active: evaluateBtnType === 'differ'}" @click="getEvaluate('2', 'differ')">差评</span>
    </div>

    <ul class="evaluate-list">
      <li v-for="(item, index) in evaluateList" :key="index">
        <!-- <div class="head-pic">
          <img src="../../assets/head_pic.png" alt="">
        </div> -->

        <div class="content">
          <div class="title">
            <div class="user-info">
              <div class="name">{{item.userAcct}}</div>
              <div class="date">{{item.gmtCreate}}</div>
            </div>

            <div
              class="star"
              :style="{backgroundPosition: `${90 - item.commentLevel*18}px 0`}">
            </div>
          </div>
          <div class="msg">{{item.comment}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/comm-evaluate.js'

export default {
  name: 'comm-evaluate',
  data () {
    return {
      evaluateList: [],
      evaluateBtnType: 'all'
    }
  },
  mounted () {
    this.getEvaluate('', 'all')
  },
  methods: {
    getEvaluate (star, type) {
      this.evaluateBtnType = type

      let reqData = {
        goodsCode: JSON.parse(sessionStorage.getItem('currentComm')).goodsCode,
        star: star,
        pageSize: 100,
        pageNum: 1
      }
      // 做一个判断，因为不传为全部，传空默认为好评0
      if (!star) {
        delete reqData.star
      }
      // 查询商品评价
      req('getEvaluate', {...reqData}).then(data => {
        this.evaluateList = data.data.list
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #f2f2f2;
  // padding-bottom: 10px;
  margin-top: 50PX;
  box-sizing: border-box;

  .evaluate-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    box-sizing: border-box;
    position: fixed;
    background: #f2f2f2;
    top: 49px;

    span {
      padding: 0 10px;
    }

    .active {
      color: #C39862;
      font-size: 20px;
    }
  }

  .evaluate-list {
    width: 95%;
    margin: 0 auto;

    li {
      display: flex;
      background: #fff;
      border-radius: 10px;
      margin-bottom: 10px;

      // .head-pic {
      //   width: 50px;
      //   height: 50px;
      //   padding: 10px;

      //   img {
      //     width: 100%;
      //     height: 100%;
      //   }
      // }

      .content {
        flex: 1;
        padding: 10px;
        box-sizing: border-box;

        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 50px;

          .user-info {
            .name {
              overflow: hidden;
              width: 250px;
              text-overflow: ellipsis;
            }
            .date {
              color: #a8a8a8;
              font-size: 14px;
            }
          }

          .star {
            width: 90px;
            height: 18px;
            background-image: url('../../assets/stars.png');
            background-position: 0 0;
            background-repeat: no-repeat;
          }
        }
        .msg {
          // padding: 5px 0 5px;
          // box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
