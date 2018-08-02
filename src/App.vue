<template>
  <div id="app" :class="{'no-scroll': isLogined}">
    <transition :name="parentTransitionName">
      <router-view :class="{'parent-view': isParentView}"></router-view>
    </transition>
    <transition name="logreg">
      <Logreg v-if="isLogined"></Logreg>
    </transition>
    <transition name="fade">
      <Foot v-if="isParentRoute"></Foot>
    </transition>
    <!-- 加载动画 -->
    <div class="pop-mask pop-load" v-if="popLoad">
      <span>
        <i></i>
      </span>
    </div>
    <!-- 提示消息弹出框 -->
    <div class="pop-mask pop-info" v-if="popInfo">
      <span>{{popInfo}}</span>
    </div>
    <!-- 确认信息弹出框 -->
    <div class="pop-mask pop-firm" v-if="popFirm">
      <div>
        <h3>友情提示</h3>
        <h4>{{popFirm}}</h4>
        <p>
          <button type="button" @click="popCanceil">取消</button>
          <button type="button" @click="popConfirm">确定</button>
        </p>
      </div>
    </div>
    <!-- 返回顶部 -->
    <div class="gotop" @click="backTop" v-if="goTop">
      <i></i>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

import Foot from '@/components/Foot'
import Logreg from '@/pages/ViewLogreg'
import {getCookie} from '@/utils/storage'
import {isWeiXin} from '@/utils/isweixin'
import {apiGetBind} from '@/config/api'

export default {
  name: 'App',
  data () {
    return {
      parentTransitionName: 'parent-left',
      isParentRoute: true,
      isParentView: false,
      isLogined: false
    }
  },
  computed: {
    ...mapState(['userInfo', 'popLoad', 'popInfo', 'popFirm', 'goTop'])
  },
  watch: {
    $route (to, from) {
      // 切换路由 隐藏gotop
      this.goTopFn(false)
      // 唤起登陆
      if (to.query.logreg === true || to.query.logreg === 'true') {
        if (getCookie('sid')) {
        } else {
          this.isLogined = true
          return false
        }
      } else {
        this.isLogined = false
      }
      // 判断是否是子路由间跳转
      if (to.meta.isChild && from.meta.isChild) return
      // 判断是否是父子间路由跳转
      if (to.meta.isParent === from.meta.isParent) {
        this.parentTransitionName = 'parent-none'
        this.isParentView = false
      } else if (to.meta.isParent) {
        this.parentTransitionName = 'parent-right'
        this.isParentView = true
        setTimeout(() => {
          this.isParentView = false
        }, 500)
      } else {
        this.parentTransitionName = 'parent-left'
        this.isParentView = true
      }
      // 判断是否隐藏底部导航
      if (to.meta.isParent) {
        this.isParentRoute = true
      } else {
        this.isParentRoute = false
      }
    }
  },
  created () {
    // 检测是否为微信
    const isweixin = isWeiXin()
    this.setWeixin(isweixin)
    // 检测是否登录
    const userSid = getCookie('sid')
    if (userSid) {
      this.getUserinfo()
    } else {
      this.setUserInfo(null)
    }
    if (this.$route.query.logreg) {
      this.isLogined = true
    } else {
      this.isLogined = false
    }
    if (!this.$route.meta.isParent) this.isParentRoute = false
  },
  components: {
    Foot,
    Logreg
  },
  methods: {
    ...mapMutations(['setUserInfo', 'popLoadFn', 'popInfoFn', 'popFirmFn', 'goTopFn', 'setWeixin']),
    popCanceil () {
      this.popFirmFn(null)
    },
    popConfirm () {
      this.$router.push({path: this.$route.fullPath, query: {logreg: true}})
      this.popFirmFn(null)
    },
    backTop () {
      this.goTopFn(false)
      this.$root.$emit('ScrollTop', 0)
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

<style>
* {-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent;}
html,body,div,p,a,span,b,em,i,strong,h1,h2,h3,h4,h5,h6,img,ul,li,button,textarea,input,form,iframe,table,tr,td{margin:0;padding:0;border:0;box-sizing:border-box;}
header,footer,nav,section,article,main,aside,summary,details,figcaption,figure,menu{display:block;margin:0;padding:0;}
a,a:active,a:hover {text-decoration:none;outline:0;}
img{border:0;max-width:100%;}
table{border-collapse:collapse;border-spacing:0;}
i,em,b,strong{font-style:normal;font-weight:normal;}
button{-webkit-appearance:button;cursor:pointer;border:none;background:none;outline:none;}
input,textarea{font-family:Helvetica,sans-serif;outline:none;}
ol,ul,li{list-style:none;}
:focus{outline:none}
button,input,textarea{border:none;outline:none;padding:0;-webkit-appearance:none;-moz-appearance:none;-webkit-tap-highlight-color:transparent;font-size:.24rem;}
button::-moz-focus-inner,input::-moz-focus-inner{border:0}
input::-webkit-input-placeholder{color:#cecece}
input:-ms-input-placeholder{color:#cecece}
input::placeholder{color:#cecece}
blockquote,q{quotes:none}
blockquote:after,blockquote:before,q:after,q:before{content:"";content:none}
a{text-decoration:none;color:#1a1a1a}
h1,h2,h3,h4,h5,h6{font-weight:normal;}
html{-webkit-text-size-adjust:none;min-height:100%;height:100%;font-family:Arial, Helvetica, sans-self, "Microsoft YaHei";}
body{-webkit-font-smoothing:antialiased;word-wrap:break-word;-webkit-hyphens:auto;hyphens:auto;position:relative}
body{color:#1a1a1a;font-weight:400;font-size:0.24rem;line-height:1.6;height:100%;background:#000;}
/* float */
.clearfix:after{content:"200B";display:block;height:0;clear:both;overflow:hidden;}
/* ellipsis */
.ellipsis{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;}
/* app */
#app{margin:0 auto;background:#fff;height:100%;max-width:100%;font-size:.24rem;}
#app .page-view{width:100%;max-width:100%;overflow:hidden;overflow-y:auto;}
#app.no-scroll{overflow: hidden;height: 100%;}
#app .maxwidth{position:fixed;bottom:0;width:100%;z-index:10;}
#app .goback{position:fixed;top:0;width:100%;}
@media screen and (min-width:750px) {
  #app{max-width:5.4rem;}
  #app .maxwidth{max-width:5.4rem;}
  #app .parent-view{max-width:5.4rem;}
  #app .child-view{max-width:5.4rem;}
  #app .page-view{max-width:5.4rem;}
  #app .goback{max-width:5.4rem;}
  #app .pop-mask{max-width:5.4rem;}
}
.gotop{position: fixed;bottom: 1.18rem;right: .18rem;width: .64rem;height: .64rem;padding-top: .22rem;background: #fff;z-index: 12;}
.gotop{box-shadow: 0 0 .1rem rgba(0, 0, 0, .5);border-radius: 50%;}
.gotop i{width: .36rem;height: .2rem;background: url(./assets/images/arrow-up.png) no-repeat;background-size: 100% 100%;display: block;margin: 0 auto;}
/*main*/
.main{padding:0 .12rem;}
/*路由切换 主view销毁  => 平移*/
.parent-view{position:absolute;top:0;width:100%;height:100%;transition:all .5s cubic-bezier(.55,0,.1,1);z-index:5;}
.parent-right-enter-active,.parent-right-leave-active,.parent-left-enter-active,.parent-left-leave-active {will-change:transform;transition:all 500ms;position:absolute;}
.parent-right-enter {opacity:0;transform:translate3d(-100%,0,0);}
.parent-right-leave-active{opacity:0;transform:translate3d(100%,0,0);}
.parent-left-enter{opacity:0;transform:translate3d(100%, 0, 0);}
.parent-left-leave-active{opacity:0;transform:translate3d(-100%,0,0);}
/*路由切换 主view不销毁  => 覆盖*/
.child-view{position:fixed;top:0;width:100%;height:100%;transition:all .5s cubic-bezier(.55,0,.1,1);z-index:15;}
.child-left-enter-active,.child-left-leave-active{will-change:transform;transition:all 500ms;position:absolute;}
.child-left-enter{opacity:0;transform:translate3d(100%, 0, 0);}
.child-left-leave-active{opacity:0;transform:translate3d(100%, 0, 0);}
/*底部导航显示隐藏*/
.fade-enter-active,.fade-leave-active{will-change:transform;transition:opacity .5s;}
.fade-enter,.fade-leave-active{opacity:0;}
/*登录注册底部弹出*/
.logreg-enter-active,.logreg-leave-active{will-change:transform;transition:transform .5s;}
.logreg-enter,.logreg-leave-active{transform:translate3d(0, 100%, 0);}

/*全局loading*/
.pop-mask{width: 100%;height: 100%;position: fixed;top: 0;z-index: 15;}
.pop-load span{background:rgba(0,0,0,.7);border-radius:.1rem;padding:.3rem;position:absolute;left:50%;top:50%;width:1rem;height:1rem;transform:translate(-50%, -50%);}
.pop-load i{display:block;width:100%;height:100%;border:.06rem solid rgb(204, 204, 204);border-right-color:transparent;border-radius:50%;}
.pop-load i{animation:rotateLoad .8s infinite linear;}
@keyframes rotateLoad {
  from{transform:rotate(0deg);}
  to{transform:rotate(360deg);}
}
.pop-info span{position:fixed;left:50%;top:50%;transform:translate(-50%, -50%);background:rgba(0,0,0,.7);border-radius:.1rem;padding:.1rem .3rem;color:#fff;}
.pop-firm{background:rgba(0,0,0,.7);}
.pop-firm div{width: 80%;background: #fff;border-radius: .1rem;position: absolute;left: 50%;top: 50%;margin-left: -40%;margin-top: -1rem;overflow: hidden;}
.pop-firm h3{text-align: center;line-height: .6rem;}
.pop-firm h4{border-bottom: 1px solid #bfbfbf;padding: .2rem 0;text-align: center;font-size: .26rem;color: #999;}
.pop-firm p{font-size: 0;}
.pop-firm button{font-size: .24rem;width: 50%;height: .8rem;font-size: .28rem;}
.pop-firm button:first-child{border-right: 1px solid #bfbfbf;color: #999;}

/*logreg input*/
.logreg-input{padding-top: .2rem;}
.logreg-input li{margin-bottom: .36rem;position: relative;}
.logreg-input label{width: .3rem;height: .3rem;background: url(./assets/images/input-icon.png) no-repeat;position: absolute;left: .15rem;top: .15rem;background-size: auto .6rem;}
.logreg-input label.icon-img-user{background-position: 0 0;}
.logreg-input label.icon-img-card{background-position: -.3rem 0;}
.logreg-input label.icon-img-user.active{background-position: 0 -.3rem;}
.logreg-input label.icon-img-card.active{background-position: -.3rem -.3rem;}

.logreg-input label.icon-img-phone{background-position: -.9rem 0;}
.logreg-input label.icon-img-code{background-position: -1.2rem 0;}
.logreg-input label.icon-img-msg{background-position: -1.5rem 0;}
.logreg-input label.icon-img-pwd{background-position: -.6rem 0;}
.logreg-input label.icon-img-phone.active{background-position: -.9rem -.3rem;}
.logreg-input label.icon-img-code.active{background-position: -1.2rem -.3rem;}
.logreg-input label.icon-img-msg.active{background-position: -1.5rem -.3rem;}
.logreg-input label.icon-img-pwd.active{background-position: -.6rem -.3rem;}

.logreg-input input{width: 100%;border: 1px solid #aaa;border-radius: .1rem;line-height: .6rem;text-indent: .6rem;}
.logreg-input li.active input{border-color: #1a1a1a;}
.logreg-input em{position: absolute;left: .6rem;bottom: -.3rem;line-height: .3rem;color: #999;}
.logreg-input i{position: absolute;right: .15rem;top: .15rem;width: .3rem;height: .3rem;background: url(./assets/images/clear-icon.png) no-repeat;background-size: 100% 100%;}
.logreg-input img{position: absolute;right: 0;top: 0;width: 1.62rem;height: .62rem;border: 1px solid #aaa;border-radius: .1rem;}
.logreg-input button{position: absolute;right: 0;top: 0;width: 1.62rem;height: .62rem;border: 1px solid #aaa;border-radius: .1rem;color: #f54343;}
.logreg-btn{text-align: center;}
.logreg-btn button{width: 100%;height: .6rem;background: #f54343;border-radius: .1rem;color: #fff;font-size: .26rem;margin-bottom: .3rem;opacity: .5;}
.logreg-btn button.active{opacity: 1;}
.logreg-btn span{text-decoration: underline;color: #999;}
.logreg-other{text-align: center;}
.logreg-other h4{color: #999;margin-bottom: .3rem;}
.logreg-other button{color: #999;}
.logreg-other span{color: #f54343;}

</style>
