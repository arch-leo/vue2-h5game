<template>
  <div class="page-view page-real">
    <Goback theme="dark-theme"></Goback>
    <div class="real-cont">
      <h3>实名验证</h3>
      <h4>您的账号 <span>{{username}}</span> 尚未进行实名注册。按照文化部《网络游戏管理暂行办法》的相关要求，网络游戏用户需使用有效身份证件进行实名注册才可登陆游戏。</h4>
      <p>* 身份信息只能提交一次不可修改，请慎重填写；</p>
      <p>* 此信息属于个人隐私，本平台承诺绝不公开、编辑或透露给第三方。</p>
      <ul class="logreg-input">
        <li :class="realnameOk ? 'active' : ''">
          <label class="icon-img icon-img-user" :class="realnameOk ? 'active' : ''"></label>
          <input
            type="text"
            placeholder="请输入您的真实姓名"
            v-model="realnameVal"
            @keyup="inputKeyup('realname')"
            @focus="inputFocusBlur('realname')"
            @input="inputInput('realname')"
            @blur="inputFocusBlur('realname')">
          <em v-if="realnameErr">请输入您的真实姓名</em>
          <i v-if="realnameVal.length > 0" @click="inputClear('realname')"></i>
        </li>
        <li :class="realcardOk ? 'active' : ''">
          <label class="icon-img icon-img-card" :class="realcardOk ? 'active' : ''"></label>
          <input
            type="text"
            placeholder="请输入您的身份证号"
            v-model="realcardVal"
            @keyup="inputKeyup('realcard')"
            @focus="inputFocusBlur('realcard')"
            @input="inputInput('realcard')"
            @blur="inputFocusBlur('realcard')">
          <em v-if="realcardErr">请输入您的身份证号</em>
          <i v-if="realcardVal.length > 0" @click="inputClear('realcard')"></i>
        </li>
      </ul>
      <div class="logreg-btn">
        <button type="button" :class="inputIsValid ? 'active' : ''" @click="submit">提交认证</button>
        <span @click="goback">跳过本次认证</span>
      </div>
    </div>
    <!-- <transition name="child-left">
      <router-view class="child-view"></router-view>
    </transition> -->
  </div>
</template>

<script>
import Goback from '@/components/Goback'
const regTypes = {
  realname: /^[\u4e00-\u9fa5|·]{2,16}$/,
  realcard: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
}
export default {
  name: 'ViewSetReal',
  data () {
    return {
      username: 'arch_leo',
      realnameVal: '',
      realnameOk: false,
      realnameErr: false,
      realcardVal: '',
      realcardOk: false,
      realcardErr: false
    }
  },
  computed: {
    inputIsValid () {
      return this.realnameOk && this.realcardOk
    },
    inputPost () {
      return {
        username: 'arch_leo',
        realname: this.realnameVal,
        realcard: this.realcardVal
      }
    }
  },
  components: {
    Goback
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
      console.log('可以提交了')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-real{background: #fff;}
.real-cont{padding: .8rem .3rem 0;}
.real-cont h3{text-align: center;font-size: .28rem;padding: .2rem 0;border-bottom: 1px solid #bfbfbf;margin-bottom: .3rem;font-weight: bold;}
.real-cont h4{text-indent: .6rem;line-height: .48rem;font-weight: bold;margin-bottom: .18rem;}
.real-cont h4 span{color: #f54343;}
.real-cont p{text-indent: .36rem;color: #999;}
</style>
