<template>
  <div>
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>

    <el-form :model="formData" ref="form" :rules="formRules" inline label-width="65px">
      <el-form-item prop="username">
        <span>
          <img src="../assets/用户名.png" alt="">
        </span>
        <el-input v-model="formData.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span>
            <img src="../assets/密码.png" alt="">
        </span>
        <el-input type="password" v-model="formData.password" placeholder="密码"></el-input>
      </el-form-item>
    </el-form>
    <div class="login-btn" @click="login">
        <img src="../assets/按钮.png" >
        <span>登录</span>
    </div>
    <div class="register-btn">
      <el-button type="text" @click="$router.push({path: '/register'})">我要注册</el-button>
    </div>
  </div>
</template>

<script>
import req from '@/api/global.js'
import axios from 'axios'
const qs = require('qs')

export default {
  name: 'login',
  data () {
    return {
      formData: {
        username: '',
        password: ''
      },
      formRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'change'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.form.validate(valid => {
        if (valid) {
          axios({
            method: 'post',
            url: 'http://112.74.100.14:8080/uaa/auth/form', // http://112.74.100.14:8080 http://2r991680e8.qicp.vip
            data: qs.stringify(this.formData),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;'
            }
          }).then(data => {
            if (data.data.code === 0) {
              this.$message.success('登录成功')

              sessionStorage.setItem('userInfo', JSON.stringify(data.data.data))
              this.getUserInfo()
            } else {
              this.$message.error(data.data.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    // 获取登录的用户的信息
    getUserInfo () {
      req('getUserInfo', {}).then(data => {
        sessionStorage.setItem('roleInfo', JSON.stringify(data.data))
        // 根据不同用户选择登录后跳转的页面（店长，客户，司机）
        if (data.data.role === '1') {
          this.$router.push({path: '/order-list'})
        } else if (data.data.role === '2') {
          this.$router.push({path: '/comm-home'})
        } else if (data.data.role === '3') {
          this.$router.push({path: '/driver-shop-info'})
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  margin: 0px auto;
  padding: 120px 0 120px 0;
  box-sizing: border-box;

  img {
    width: 50%;
    margin: 0px auto;
    display: block;
  }
}

.el-form {
  .el-form-item {
    width: 100%;
    text-align: center;
    margin-right: 0;
    margin-bottom: 45px;

    // /deep/ .el-form-item__label {
    //   text-align: left;
    // }

    /deep/ .el-form-item__content {
      width: 75%;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;

      .el-input {
        .el-input__inner {
          outline: none;
          border: none;
          padding: inherit;
        }
      }

      .el-form-item__error {
        left: 65px;
      }

      >span {
        height: 30px;
        width: 30px;
        margin: 0px 20px;
        >img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}

.register-btn {
  font-size: 14px;
  text-align: right;
  margin: 0px 55px 0 0;
  .el-button {
    color: rgb(153, 153, 153);
  }
}

  .login-btn {
      width: 70%;
      height: 65px;
      margin: 0 auto;
      position: relative;
      img {
          width: 100%;
          height: 100%;
      }
      span {
          font-size: 22px;
          color: white;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -14.4px;
          margin-left: -22px;
      }
  }
</style>
