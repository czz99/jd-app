<template>
  <div class="container">
    <div class="banner-pic-list">
      <el-carousel height="200px">
        <el-carousel-item v-for="(item, index) in slideshowList" :key="index">
          <img :src="item.photo" alt="" @click="toDetailPage(item)">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="module-title">热门商品</div>

    <ul class="comm-list">
      <li
        v-for="(item, index) in commList"
        :key="index"
        @click="toDetailPage(item)">
        <img :src="item.photo" alt="">
        <div class="book-info">{{item.goodsName}}</div>
        <div>￥{{item.sellPrice}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/comm-home.js'

export default {
  name: 'comm-home',
  data () {
    return {
      slideshowList: [],
      commList: []
    }
  },
  mounted () {
    // 获取轮播图
    req('getSliderPicList', {}).then(data => {
      this.slideshowList = data.data
    })
    // 获取热门商品
    req('getHotComm', {}).then(data => {
      this.commList = data.data
    })
  },
  methods: {
    // 存储商品详情，跳转到商品详情页
    toDetailPage (item) {
      sessionStorage.setItem('currentComm', JSON.stringify(item))
      this.$router.push({path: '/comm-detail'})
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: rgb(246, 246, 246);
}

.el-carousel {
  background: #fff;
  .el-carousel__container {
    .el-carousel__item {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.module-title {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: rgb(195, 152, 98);
  margin-top: 10px;
  font-size: 18px;
}

.comm-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 98%;
  margin: 0 auto;
  // margin-top: 10px;

  li {
    position: relative;
    width: 48%;
    background: #fff;
    padding: 10px;
    box-sizing: border-box;
    margin: 5px 1%;
    border-radius: 10px;

    img {
      width: 100%;
      height: 170px;
    }

    div:nth-child(2) {
      font-size: 14px;
      margin-left: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    div:nth-child(3) {
      font-size: 14px;
      margin: 10px 0 0 10px;
      color: red;
    }
  }
}
</style>
