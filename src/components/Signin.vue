<template>
  <div class="logreg-log">
    <ul class="logreg-input" v-if="type === 'user'">
      <li :class="userOk ? 'active' : ''">
        <label class="icon-img icon-img-user" :class="userOk ? 'active' : ''"></label>
        <input
          type="text"
          placeholder="请输入您的账号"
          v-model="userVal"
          @keyup="inputKeyup('user')"
          @focus="inputFocusBlur('user')"
          @input="inputInput('user')"
          @blur="inputFocusBlur('user')">
        <em v-if="userErr">请输入您的账号</em>
        <i v-if="userVal.length > 0" @click="inputClear('user')"></i>
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
        <em v-if="pwdErr">请输入您的密码</em>
        <i v-if="pwdVal.length > 0" @click="inputClear('pwd')"></i>
      </li>
    </ul>
    <ul class="logreg-input" v-else>
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
        <em v-if="pwdErr">请输入您的密码</em>
        <i v-if="pwdVal.length > 0" @click="inputClear('pwd')"></i>
      </li>
    </ul>
    <div class="logreg-btn">
      <button type="button" :class="{'active': inputIsValid}" @click="submit">登录</button>
    </div>
    <div class="logreg-other" v-if="type === 'user'">
      <h4>其他登录方式</h4>
      <LogTypes @launch="launch"></LogTypes>
    </div>
    <div class="logreg-other" v-else>
      <button type="button" @click="switchView">返回其他方式登录</button>
      <span @click="launch('reg')">还没注册？立即注册</span>
    </div>
  </div>
</template>

<script>
import LogTypes from '@/components/LogTypes'
const regTypes = {
  user: /^[\w|\d|_]{6,18}$/,
  phone: /^1\d{10}$/,
  pwd: /^[\w!@#$%^&+\-*/._=()]{6,30}$/
}
export default {
  name: 'Signin',
  props: ['type'],
  data () {
    return {
      userVal: '',
      userOk: false,
      userErr: false,
      pwdVal: '',
      pwdOk: false,
      pwdErr: false,
      phoneVal: '',
      phoneOk: false,
      phoneErr: false
    }
  },
  computed: {
    inputIsValid () {
      if (this.type === 'user') {
        return this.userOk && this.pwdOk
      } else {
        return this.phoneOk && this.pwdOk
      }
    },
    inputPost () {
      if (this.type === 'user') {
        return {
          username: this.userVal,
          password: this.pwdVal
        }
      } else {
        return {
          username: this.phoneVal,
          password: this.pwdVal
        }
      }
    }
  },
  components: {
    LogTypes
  },
  methods: {
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
    submit () {
      if (!this.inputIsValid) return false
      this.$emit('signin-submit', this.inputPost)
    },
    launch (type) {
      this.$emit('launch', type)
    },
    switchView () {
      this.$emit('switchView')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logreg-log{padding: 0 .3rem;}
</style>
