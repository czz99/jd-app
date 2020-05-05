<template>
  <div class="container">
    <ul class="book-classify">
      <li :class="{active: item.cateCode === currentClassify.cateCode}" v-for="(item, index) in oneClassifyList" :key="index" @click="getTwoClassify(item)">
        <b></b>
        <span>{{item.cateName}}</span>
      </li>
    </ul>

    <ul class="book-classify-conteiner">
      <li class="book-classify-item" v-for="(item, index) in commList" :key="index">
        <div class="book-classify-item-title">{{item.cateName}}</div>
        <ul class="book-list">
          <li v-for="(childItem, childIndex) in item.goodsInfoList" :key="childIndex" @click="toDetailPage(childItem)">
            <img :src="childItem.goodsPhoto" alt="">
            <div>{{childItem.goodsName}}</div>
            <div>
              ￥{{childItem.sellPrice}}
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/comm-classify.js'

export default {
  name: 'comm-classify',
  data () {
    return {
      oneClassifyList: [],
      currentClassify: {},
      commList: []
    }
  },
  mounted () {
    // 获取一级分类
    req('getOneClassify', {}).then(data => {
      this.oneClassifyList = data.data

      this.currentClassify = this.oneClassifyList[0]

      this.getTwoClassify(this.currentClassify)
    })
  },
  methods: {
    // 获取二级分类
    getTwoClassify (item) {
      this.currentClassify = item
      req('getTwoClassify', {classificationlOneId: item.cateCode}).then(data => {
        this.commList = data.data
      })
    },
    // 存储当前的商品信息，跳转到商品详情页
    toDetailPage (item) {
      sessionStorage.setItem('currentComm', JSON.stringify(item))
      this.$router.push({path: '/comm-detail'})
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #f2f2f2;

  .book-classify {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 20%;
    background: #fff;

    li {
      position: relative;
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 14px;

      >span {
        display: inline-block;
        width: 100%;
        height: 100%;
      }

    }
    li.active {
      color: rgb(197, 156, 104);
      background: #f2f2f2;

      b {
        position: absolute;
        left: 0;
        top: 50%;
        width: 3px;
        height: 20px;
        background: rgb(197, 156, 104);
        margin-top: -10px;
      }
    }
  }

  .book-classify-conteiner {
    position: absolute;
    top: 0;
    left: 22%;
    bottom: 0;
    overflow: auto;
    width: 76%;

    .book-classify-item {
      .book-classify-item-title {
        width: 100%;
        height: 40px;
        padding-left: 10px;
        box-sizing: border-box;
        line-height: 40px;
        font-size: 14px;
      }

      .book-list {
        width: 100%;
        background: #fff;
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;
        box-sizing: border-box;
        border-radius: 10px;

        li {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          width: 50%;
          margin-bottom: 10px;

          img {
            width: 70%;
          }

          div:nth-child(2) {
            font-size: 14px;
            width: 70%;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          div:nth-child(3) {
            color: red;
            font-size: 14px;
            font-weight: bold;
            width: 70%;

            // span {
            //   color: #ddd;
            //   font-weight: normal;
            //   font-size: 12px;
            // }
          }
        }
      }
    }
  }
}
</style>
