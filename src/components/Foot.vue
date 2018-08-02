<template>
  <div class="maxwidth foot">
    <router-link :to="item.path" :key="item.id" v-for="item in navs">
      <i></i>
      <span>{{item.title}}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  data () {
    return {
      navs: [
        {path: '/index', title: '首页'},
        {path: '/game', title: '游戏'},
        {path: '/user', title: '个人'}
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.foot{height: .8rem;padding-top: .02rem;background: #f2f2f2;border-top: 1px solid #bfbfbf;}
.foot a{float: left;text-align: center;color: #999;}
.foot a i{display: block;width: .48rem;height: .4rem;background: url(../assets/images/nav-icon.png) no-repeat 0 0;background-size: 1.44rem;margin: 0 auto;}
.foot a:nth-child(1){width: 33.3%;}
.foot a:nth-child(2){width: 33.4%;}
.foot a:nth-child(3){width: 33.3%;}
.foot a:nth-child(1) i{background-position: 0 0;}
.foot a:nth-child(2) i{background-position: -.48rem 0;}
.foot a:nth-child(3) i{background-position: -.96rem 0;}
.foot a.is-active{color: #f54343;}
.foot a.is-active i{background-position-y: -.4rem;}
</style>
