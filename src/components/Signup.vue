<template>
  <div class="logreg-reg">
    <ul class="logreg-input">
      <li :class="phoneOk ? 'active' : ''">
        <label class="icon-img icon-img-phone" :class="phoneOk ? 'active' : ''"></label>
        <input
          type="text"
          placeholder="请输入您的手机号"
          v-model="phoneVal"
          @keyup="inputKeyup('phone')"
          @focus="inputFocusBlur('phone')"
          @input="inputInput('phone')"
          @blur="inputFocusBlur('phone')">
        <em v-if="phoneErr">请输入您的手机号</em>
        <i v-if="phoneVal.length > 0" @click="inputClear('phone')"></i>
      </li>
      <li :class="codeOk ? 'active' : ''" style="padding-right:1.8rem;">
        <label class="icon-img icon-img-code" :class="codeOk ? 'active' : ''"></label>
        <input
          type="text"
          placeholder="请输入图片验证码"
          v-model="codeVal"
          @keyup="inputKeyup('code')"
          @focus="inputFocusBlur('code')"
          @input="inputInput('code')"
          @blur="inputFocusBlur('code')">
        <img :src="'http://play.ifeng.com/?_c=user&_a=code&time=' + imgTime" alt="h5游戏" @click="changeCode">
        <em v-if="codeErr">请输入图片验证码</em>
        <i v-if="codeVal.length > 0" @click="inputClear('code')" style="right:1.92rem;"></i>
      </li>
      <li :class="msgOk ? 'active' : ''" style="padding-right:1.8rem;">
        <label class="icon-img icon-img-msg" :class="msgOk ? 'active' : ''"></label>
        <input
          type="text"
          placeholder="请输入短信验证码"
          v-model="msgVal"
          @keyup="inputKeyup('msg')"
          @focus="inputFocusBlur('msg')"
          @input="inputInput('msg')"
          @blur="inputFocusBlur('msg')">
        <button type="button" @click="sendMsg">{{msgSendDesc}}</button>
        <em v-if="msgErr">请输入短信验证码</em>
        <i v-if="msgVal.length > 0" @click="inputClear('msg')" style="right:1.92rem;"></i>
      </li>
      <li :class="pwdOk ? 'active' : ''">
        <label class="icon-img icon-img-pwd" :class="pwdOk ? 'active' : ''"></label>
        <input
          type="password"
          placeholder="请输入您的密码"
          v-model="pwdVal"
          @keyup="inputKeyup('pwd')"
          @focus="inputFocusBlur('pwd')"
          @input="inputInput('pwd')"
          @blur="inputFocusBlur('pwd')">
        <em v-if="pwdErr">6-18位数字/字母/下划线</em>
        <i v-if="pwdVal.length > 0" @click="inputClear('pwd')"></i>
      </li>
    </ul>
    <div class="logreg-btn">
      <button type="button" :class="{'active': inputIsValid}" @click="submit">登录</button>
    </div>
    <div class="logreg-other">
      <button type="button" @click="switchView">返回其他方式登录</button>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {apiRegMobile, apiSendRegMsg} from '@/config/api'
const regTypes = {
  phone: /^1\d{10}$/,
  code: /^[\w|\d]{4}$/,
  msg: /^[\d]{6}$/,
  pwd: /^[\w!@#$%^&+\-*/._=()]{6,30}$/
}
export default {
  name: 'Signup',
  props: ['type'],
  data () {
    return {
      phoneVal: '',
      phoneOk: false,
      phoneErr: false,
      codeVal: '',
      codeOk: false,
      codeErr: false,
      msgVal: '',
      msgOk: false,
      msgErr: false,
      pwdVal: '',
      pwdOk: false,
      pwdErr: false,
      imgTime: new Date().getTime(),
      msgSendDesc: '获取验证码',
      msgSended: false,
      timer: null
    }
  },
  computed: {
    inputIsValid () {
      return this.phoneOk && this.codeOk && this.msgOk && this.pwdOk
    },
    inputPost () {
      return {
        mobile: this.phoneVal,
        password: this.pwdVal,
        cpassword: this.pwdVal,
        phonecode: this.msgVal
      }
    }
  },
  methods: {
    ...mapMutations(['popInfoFn']),
    goback () {
      this.$router.go(-1)
    },
    inputKeyup (name) {
      this[name + 'Val'] = this[name + 'Val'].replace(/\s+/g, '')
    },
    inputFocusBlur (name) {
      this.inputValid(name)
    },
    inputInput (name) {
      this.inputValid(name)
    },
    inputClear (name) {
      this[name + 'Ok'] = false
      this[name + 'Err'] = false
      this[name + 'Val'] = ''
    },
    inputValid (name) {
      if (this[name + 'Val'].length === 0) {
        this[name + 'Ok'] = false
        this[name + 'Err'] = false
      } else {
        if (regTypes[name].test(this[name + 'Val'])) {
          this[name + 'Ok'] = true
          this[name + 'Err'] = false
        } else {
          this[name + 'Ok'] = false
          this[name + 'Err'] = true
        }
      }
    },
    changeCode () {
      this.imgTime = new Date().getTime()
    },
    sendMsg () {
      if (!this.phoneOk) {
        this.popInfoFn('请先输入正确的手机号')
      } else if (!this.codeOk) {
        this.popInfoFn('请先输入正确的图片验证码')
      } else {
        if (this.msgSended) {
          this.popInfoFn('验证码已发送，请稍后重试')
        } else {
          this.sendRegMsg()
          this.msgSended = true
          let count = 120
          this.timer = setInterval(() => {
            count--
            this.msgSendDesc = count + 's后重新发送'
            if (!count) {
              this.msgSended = false
              this.msgSendDesc = '获取验证码'
              clearInterval(this.timer)
            }
          }, 1000)
        }
      }
    },
    submit () {
      if (!this.inputIsValid) return false
      this.regMobile()
    },
    sendRegMsg () {
      apiSendRegMsg({mobile: this.phoneVal, type: 0})
        .then(json => {
          this.popInfoFn('短信验证码已发送')
        })
        .catch((err) => {
          if (err) {
            console.log(err)
          }
          this.popInfoFn('短信验证码发送失败')
        })
    },
    regMobile () {
      apiRegMobile(this.inputPost)
        .then(json => {
          let jsonData = json.data.replace(/[\r\n]/g, '').replace(/[\s]/g, '')
          let jsonRes = jsonData.slice(1, (jsonData.length - 1))
          if (jsonRes === 'success') {
            this.popInfoFn('注册成功')
            setTimeout(() => {
              this.goback()
            }, 1500)
          } else {
            this.popInfoFn('注册失败')
          }
        })
        .catch((err) => {
          if (err) {
            // console.log(err)
          }
          this.popInfoFn('注册失败')
        })
    },
    launch (type) {
      this.$emit('launch', type)
    },
    switchView () {
      this.$emit('switchView')
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logreg-reg{padding: 0 .3rem;}
</style>
