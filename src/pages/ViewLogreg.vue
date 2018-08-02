<template>
  <div class="page-view page-logreg">
    <i class="logreg-close" @click="goback"></i>
    <h3 class="logreg-title">
      <span>登录/注册 畅玩精彩游戏</span>
    </h3>
    <template v-if="logType === 'other'">
      <!-- 第三方登陆 -->
      <div class="logreg-other">
        <LogTypes has-border="true" @launch="switchType"></LogTypes>
        <p v-if="!isWeixin">
          <span @click="switchType('user')">凤凰账号登录</span>
        </p>
      </div>
    </template>
    <template v-else-if="logType === 'reg'">
      <!-- 账号注册 -->
      <Signup @switchView="switchView"></Signup>
    </template>
    <template v-else>
      <!-- 账号/手机号登陆 -->
      <Signin :type="logType" @launch="switchType" @switchView="switchView" @signin-submit="signinSubmit"></Signin>
    </template>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import LogTypes from '@/components/LogTypes'
import {apiSignin, apiGetBind} from '@/config/api'

export default {
  name: 'ViewLogreg',
  data () {
    return {
      logType: 'other'
    }
  },
  components: {
    Signin,
    Signup,
    LogTypes
  },
  computed: {
    ...mapState(['isWeixin'])
  },
  methods: {
    ...mapMutations(['popLoadFn', 'popInfoFn', 'setUserInfo', 'setUserProp']),
    goback () {
      this.$router.go(-1)
    },
    switchType (type) {
      if (type === 'weixin') {
        location.href = 'https://sy.ifeng.com/oauthwx/login?ref=' + encodeURIComponent('https://wan.ifeng.com/#/index')
      } else if (type === 'qq') {
        location.href = 'https://sy.ifeng.com/oauth/qqlogin?ref=' + encodeURIComponent('https://wan.ifeng.com/#/index')
      } else {
        this.logType = type
      }
    },
    switchView () {
      this.logType = 'other'
    },
    signinSubmit (params) {
      this.popLoadFn(true)
      apiSignin(params)
        .then(json => {
          this.popLoadFn(false)
          let jsonData = json.data.slice(2, json.data.length - 2)
          if (jsonData === 'success') {
            this.popInfoFn('登录成功')
            this.getUserinfo()
            setTimeout(() => {
              this.$router.push({path: this.$route.path})
            }, 1500)
          } else {
            this.popInfoFn('登录失败，请稍后重试')
          }
        })
        .catch((err) => {
          if (err) {
            console.log(err)
          }
        })
    },
    getUserinfo () {
      apiGetBind()
        .then(json => {
          let jsonData = JSON.parse(json.data.slice(1, (json.data.length - 1))).datas
          this.setUserInfo(jsonData)
        })
        .catch((err) => {
          if (err) {
            console.log(err)
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-logreg{position: fixed;top: 0;width: 100%;height: 100%;background:#fff;z-index: 15;}
.logreg-close{width: .3rem;height: .3rem;position: absolute;right: .2rem;top: .2rem;background: url(../assets/images/close-icon.png) no-repeat;background-size: 100%;}
.logreg-close{animation: rotateLogreg .5s ease-in-out;}
@keyframes rotateLogreg {
  from {transform: rotate(0deg);}
  to {transform: rotate(1800deg);}
}
.logreg-title{padding: 1rem .3rem 0;margin-bottom: .6rem;text-align: center;}
.logreg-title span{display: block;border-bottom: 1px solid #eee;line-height: 1rem;}
.logreg-other{text-align: center;}
.logreg-other p{}
.logreg-other p span{color: #999;text-decoration: underline;}
</style>
