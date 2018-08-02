<template>
  <div class="page-view page-user">
    <div class="user-head">
      <img :src="userInfo && userInfo.avatar ? userInfo.avatar : '//p3.ifengimg.com/8369833f2e281cb1/2018/31/headpic.jpg'" alt="h5游戏">
      <h3>
        <span class="ellipsis">{{userInfo && userInfo.username ? userInfo.username : '请先登录'}}</span>
      </h3>
      <p>
        <button type="button" @click="logreg">{{userInfo && userInfo.username ? '退出' : '登录'}}</button>
      </p>
    </div>
    <ul class="user-cont">
      <li :key="item.id" v-for="item in userlist" @click="jump(item.path)" :class="item.class">
        <i></i>
        <span>{{item.title}}</span>
        <em></em>
      </li>
    </ul>
    <transition name="child-left">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {apiGetBind} from '@/config/api'
import {getCookie} from '@/utils/storage'
export default {
  name: 'ViewGame',
  data () {
    return {
      transitionName: 'slide-mask',
      userlist: [],
      isLogined: false
    }
  },
  computed: {
    ...mapState(['userInfo', 'isWeixin'])
  },
  created () {
    const userSid = getCookie('sid')
    if (userSid) {
      if (!this.userInfo) {
        this.popLoadFn(true)
        this.getUserinfo()
      }
    }
    if (this.isWeixin) {
      this.userlist = [
        // {title: '实名验证', path: '/user/user-real', class: 'item-real'},
        {title: '我的礼包', path: '/gift', class: 'item-gift'},
        {title: '手机验证', path: '/user/user-phone', class: 'item-phone'}
        // {title: '修改密码', path: '/user/user-pwd', class: 'item-pwd'}
      ]
    } else {
      this.userlist = [
        // {title: '实名验证', path: '/user/user-real', class: 'item-real'},
        {title: '我的礼包', path: '/gift', class: 'item-gift'},
        {title: '手机验证', path: '/user/user-phone', class: 'item-phone'},
        {title: '修改密码', path: '/user/user-pwd', class: 'item-pwd'}
      ]
    }
  },
  methods: {
    ...mapMutations(['setUserInfo', 'popInfoFn', 'popLoadFn']),
    jump (path) {
      let userSid = getCookie('sid')
      if (userSid) {
        if (path === '/user/user-phone') {
          if (this.userInfo.isbindmobile === '1') {
            this.popInfoFn('您已完成手机绑定')
            return false
          }
        }
        this.$router.push({path: path})
      } else {
        this.setUserInfo(null)
        this.$router.push({path: this.$route.fullPath, query: {logreg: true}})
      }
    },
    logreg () {
      if (this.userInfo && this.userInfo.username) {
        location.href = 'https://sy.ifeng.com/service/logout?ref=' + encodeURIComponent('https://wan.ifeng.com/#/index')
      } else {
        this.$router.push({path: this.$route.fullPath, query: {logreg: true}})
      }
    },
    getUserinfo () {
      apiGetBind()
        .then(json => {
          let jsonData = JSON.parse(json.data.slice(1, (json.data.length - 1))).datas
          this.setUserInfo(jsonData)
          this.popLoadFn(false)
        })
        .catch((err) => {
          if (err) {
            console.log(err)
          }
          this.popLoadFn(false)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*page-user*/
.page-user{padding-bottom: .8rem;background: #fff;min-height: 100%;}
/*user-head*/
.user-head{border-bottom: .1rem solid #f2f2f2;padding: .4rem .2rem;display: flex;}
.user-head img{width: 1rem;height: 1rem;border-radius: 50%;}
.user-head h3{flex: 1;line-height: 1rem;padding-left: .1rem;display:block;}
.user-head button{border: 1px solid #f54343;display: block;height: .4rem;width: .8rem;border-radius: .06rem;margin-top: .3rem;color: #f54343;font-size: .24rem;}
/*user-cont*/
.user-cont li{line-height: .8rem;border-bottom: 1px solid #eae9e9;padding: 0 .2rem;display: flex;}
.user-cont li i{width: .3rem;height: .3rem;background: url(../assets/images/user-icon.png) no-repeat;background-size: 1.2rem;margin: .25rem .2rem 0 0;}
.user-cont li.item-real i{background-position: 0 0;}
.user-cont li.item-gift i{background-position: -.3rem 0;}
.user-cont li.item-phone i{background-position: -.6rem 0;}
.user-cont li.item-pwd i{background-position: -.9rem 0;}
.user-cont li span{flex: auto;}
.user-cont li em{width: .16rem;height: .28rem;background: url(../assets/images/arrow-right.png) no-repeat;background-size: 100% 100%;margin-top: .26rem;}
</style>
