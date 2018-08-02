<template>
  <div class="page-view page-pwd">
    <Goback theme="dark-theme"></Goback>
    <div class="pwd-cont">
      <h3>重置密码</h3>
      <h4>请牢记您的账号密码！</h4>
      <ul class="logreg-input">
        <li :class="oldpwdOk ? 'active' : ''">
          <label class="icon-img icon-img-pwd" :class="oldpwdOk ? 'active' : ''"></label>
          <input
            type="password"
            placeholder="请输入您的原密码"
            v-model="oldpwdVal"
            @keyup="inputKeyup('oldpwd')"
            @focus="inputFocusBlur('oldpwd')"
            @input="inputInput('oldpwd')"
            @blur="inputFocusBlur('oldpwd')">
          <em v-if="oldpwdErr">请输入您的原密码</em>
          <i v-if="oldpwdVal.length > 0" @click="inputClear('oldpwd')"></i>
        </li>
        <li :class="newpwdOk ? 'active' : ''">
          <label class="icon-img icon-img-pwd" :class="newpwdOk ? 'active' : ''"></label>
          <input
            type="password"
            placeholder="请输入您要设置的新密码"
            v-model="newpwdVal"
            @keyup="inputKeyup('newpwd')"
            @focus="inputFocusBlur('newpwd')"
            @input="inputInput('newpwd')"
            @blur="inputFocusBlur('newpwd')">
          <em v-if="newpwdErr">{{inputErrDesc}}</em>
          <i v-if="newpwdVal.length > 0" @click="inputClear('newpwd')"></i>
        </li>
        <li :class="firmpwdOk ? 'active' : ''">
          <label class="icon-img icon-img-pwd" :class="firmpwdOk ? 'active' : ''"></label>
          <input
            type="password"
            placeholder="再次输入您要设置的新密码"
            v-model="firmpwdVal"
            @keyup="inputKeyup('firmpwd')"
            @focus="inputFocusBlur('firmpwd')"
            @input="inputInput('firmpwd')"
            @blur="inputFocusBlur('firmpwd')">
          <em v-if="firmpwdErr">再次输入您要设置的新密码</em>
          <i v-if="firmpwdVal.length > 0" @click="inputClear('firmpwd')"></i>
        </li>
      </ul>
      <div class="logreg-btn">
        <button type="button" :class="inputIsValid ? 'active' : ''" @click="submit">确定修改</button>
        <span @click="gohelp">无法修改？联系客服</span>
      </div>
    </div>
    <!-- <transition name="child-left">
      <router-view class="child-view"></router-view>
    </transition> -->
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import Goback from '@/components/Goback'
import {apiResetPwd} from '@/config/api'

const regTypes = {
  pwd: /^[\w!@#$%^&+\-*/._=()]{6,30}$/
}
export default {
  name: 'ViewSetPwd',
  data () {
    return {
      oldpwdVal: '',
      oldpwdOk: false,
      oldpwdErr: false,
      newpwdVal: '',
      newpwdOk: false,
      newpwdErr: false,
      firmpwdVal: '',
      firmpwdOk: false,
      firmpwdErr: false,
      inputErrDesc: '6-18位数字/字母/下划线'
    }
  },
  computed: {
    inputIsValid () {
      return this.oldpwdOk && this.newpwdOk && this.firmpwdOk
    },
    inputPost () {
      return {
        password: this.oldpwdVal,
        newpassword: this.newpwdVal
      }
    }
  },
  components: {
    Goback
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
        if (regTypes['pwd'].test(this[name + 'Val'])) {
          if (name === 'newpwd') {
            if (this.newpwdVal === this.oldpwdVal) {
              this.inputErrDesc = '新密码不能与原密码相同'
              return false
            }
          }
          if (name === 'firmpwd') {
            if (this.firmpwdVal !== this.newpwdVal) {
              this.inputErrDesc = '新密码与确认密码输入不一致'
              return false
            }
          }
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
      this.resetPwd()
    },
    resetPwd () {
      apiResetPwd(this.inputPost)
        .then(json => {
          let jsonData = json.data
          if (jsonData === '("success")') {
            this.popInfoFn('修改成功')
          } else {
            this.popInfoFn('修改失败')
          }
          setTimeout(() => {
            this.goback()
          }, 1500)
        })
        .catch((err) => {
          if (err) {
            console.log(err)
          }
          this.popInfoFn('系统错误，请稍后重试')
        })
    },
    gohelp () {
      console.log('客服帮助')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-pwd{background: #fff;}
.pwd-cont{padding: .8rem .3rem 0;}
.pwd-cont h3{text-align: center;font-size: .28rem;padding: .2rem 0;border-bottom: 1px solid #bfbfbf;margin-bottom: .3rem;font-weight: bold;}
.pwd-cont h4{text-indent: .6rem;line-height: .48rem;font-weight: bold;margin-bottom: .18rem;}
.pwd-cont h4 span{color: #f54343;}
.pwd-cont p{text-indent: .36rem;color: #999;}
</style>
