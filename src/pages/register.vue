<template>
  <div>
    <div class="header">
      <span class="iconfont iconzuojiantou" @click="$router.push({path: '/login'})"></span>
      <span>注册</span>
    </div>

    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>

    <el-form ref="form" :model="formData" :rules="formRules" inline label-width="80px">
      <el-form-item prop="userAcct">
        <span>
          <img src="../assets/用户名.png" alt="">
        </span>
        <el-input v-model="formData.userAcct" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span>
          <img src="../assets/密码.png" alt="">
        </span>
        <el-input type="password" v-model="formData.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <span>
          <img src="../assets/确认密码.png" alt="">
        </span>
        <el-input type="password" v-model="formData.confirmPassword" placeholder="请确认密码"></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <span>
          <img src="../assets/手机.png" alt="">
        </span>
        <el-input v-model="formData.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="userName">
        <span>
          <img src="../assets/姓名.png" alt="">
        </span>
        <el-input v-model="formData.userName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item prop="sex" class="sex-box">
        <span>
          <img src="../assets/性别.png" alt="">
        </span>
        <el-radio-group v-model="formData.sex" size="medium">
          <el-radio border label="1">男</el-radio>
          <el-radio border label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="idCard">
        <span>
          <img src="../assets/身份证.png" alt="">
        </span>
        <el-input v-model="formData.idCard" placeholder="请输入身份证号"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <span>
          <img src="../assets/邮箱.png" alt="">
        </span>
        <el-input v-model="formData.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="inviteCode">
        <span>
          <img src="../assets/邀请码.png" alt="">
        </span>
        <el-input v-model="formData.inviteCode" placeholder="请输入邀请码"></el-input>
      </el-form-item>
    </el-form>
    <div class="register-btn" @click="register">
        <img src="../assets/按钮.png" >
        <span>注册</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const qs = require('qs')

export default {
  name: 'register',
  data () {
    return {
      formData: {},
      formRules: {
        userAcct: [
          {required: true, message: '请输入用户名', trigger: 'change'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'change'}
        ],
        confirmPassword: [
          {required: true, message: '请确认密码', trigger: 'change'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'change'},
          { pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/, message: '请输入合法手机号/电话号', trigger: 'blur' }
        ],
        userName: [
          {required: true, message: '请输入姓名', trigger: 'change'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
        idCard: [
          {required: true, message: '请输入身份证号', trigger: 'change'},
          { pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入合法的身份证号', trigger: 'blur' }
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    register () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.formData.password !== this.formData.confirmPassword) {
            this.$message.info('两次输入的密码不一致')
            return
          }

          axios({
            method: 'post',
            url: 'http://112.74.100.14:8080/app/customer/saveCustomer', // http://112.74.100.14:8080 http://2r991680e8.qicp.vip
            data: qs.stringify(this.formData),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;'
            }
          }).then(data => {
            if (data.data.code === 0) {
              this.$message.success('注册成功，请登录')
              this.$router.push({path: '/login'})
            } else {
              this.$message.error(data.data.msg)
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #fff;
  font-size: 20px;
  color: rgb(195, 152, 98);

  span.iconzuojiantou {
    position: absolute;
    top: 50%;
    left: 30px;
    transform: translate(0, -50%);
  }
}

.logo {
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 0;
    box-sizing: border-box;

  img {
    width: 50%;
  }
}

.el-form {
  .el-form-item {
    width: 100%;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 10px;

    /deep/ .el-form-item__content {
      width: 75%;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      height: 40px;

      .el-radio-group {
        margin-left: -140px;
      }

      .el-input {
        .el-input__inner {
          outline: none;
          border: none;
          padding: inherit;
          // border-bottom: 1px solid #ddd;
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

  /deep/ .sex-box {
    .el-form-item__content {
      position: relative;
      >span {
        position: absolute;
        left: -3px;
        top: 7px;
      }
      .el-radio-group {
        position: absolute;
        left: 200px;
        top: 7px;
        .el-radio {
          padding: 7px 10px 0 10px;
          height: 30px;
        }
        .is-checked {
          border-color:  rgb(195, 152, 98);
          .el-radio__input {
            .el-radio__inner {
              border-color:  rgb(195, 152, 98);
              background:  rgb(195, 152, 98);
            }
          }
          .el-radio__label {
            color: rgb(195, 152, 98);
          }
        }
      }
    }
  }
}

.register-btn {
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
