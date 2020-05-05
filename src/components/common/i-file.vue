<template>
  <div>
    <div class="file-box">
      <el-button @click="addImg" type="primary" class="chose-btn">选择</el-button>
      <span v-show="imgPath">{{imgPath}}</span>
    </div>
    <input type="file" id="file" ref="file" @change="fileChange($event)" style="display:none">
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'i-file',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      imgPath: ''
    }
  },
  watch: {
    value: {
      handler (value) {
        this.imgPath = value

        if (!value) {
          document.getElementById('file').value = ''
        }
      },
      deep: true
    }
  },
  methods: {
    addImg () {
      this.$refs.file.click()
    },
    fileChange (event) {
      // 判断文件是否是图片格式
      let suffix = event.target.value.substring(event.target.value.lastIndexOf('.') + 1) // 获取文件的后缀名
      if (suffix !== 'jpg' && suffix !== 'png' && suffix !== 'jpeg') {
        this.$message.error('文件格式不正确')
        return
      }

      if (event.target.files.length) {
        let form = new FormData()
        let imageFile = document.getElementById('file').files[0]
        // console.log('123', imageFile)
        form.append('file', imageFile) //
        form.append('access_token', JSON.parse(sessionStorage.getItem('userInfo')).access_token)
        axios({
          method: 'post',
          url: 'http://112.74.100.14:8080/app/image/uploadImage', // http://112.74.100.14:8080 http://2r991680e8.qicp.vip
          data: form,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(data => {
          this.modifyImg(data.data.data)
        })
      } else {
        this.imgPath = ''
        this.$eimt('input', this.imgPath)
      }
    },
    modifyImg (photo) {
      let form = new FormData()
      form.append('photo', photo)
      form.append('access_token', JSON.parse(sessionStorage.getItem('userInfo')).access_token)
      axios({
        method: 'post',
        url: 'http://112.74.100.14:8080/app/customer/upCustomerPhoto', // http://112.74.100.14:8080 http://2r991680e8.qicp.vip
        data: form,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(data => {
        if (data.data.code === 0) {
          this.$message.success('修改成功')
          this.$emit('fileData', photo)
        } else {
          this.$message.error(data.data.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.file-box {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space:nowrap;

  .chose-btn {
    width: 70px;
    height: 70px;
    position: relative;
    border-radius: 50%;
    z-index: 1;
    background: rgba(0,0,0,0);
    color: rgba(0,0,0,0);
    border: none;
  }
}
</style>
