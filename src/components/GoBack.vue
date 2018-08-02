<template>
  <div class="goback" :class="theme">
    <i class="goback-btn" @click="goback"></i>
    <span class="goback-title">{{title}}</span>
    <!-- <button class="goback-more">其他</button> -->
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: ['theme', 'title'],
  data () {
    return {
      navs: [
        {path: '/index', title: '首页'},
        {path: '/game', title: '游戏'},
        {path: '/user', title: '个人'}
      ]
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goback{height: .8rem;line-height: .32rem;padding: .24rem;background: rgba(254,254,254,.6);}
.goback .goback-btn{width: .3rem;height: .3rem;background: url() no-repeat;float: left;background-size: .16rem 100%;margin-right: .12rem;}
.goback .goback-title{font-size: .26rem;float: left;}
.goback .goback-more{float: right;}
.dark-theme .goback-btn{background-image: url(../assets/images/arrow-left.png);}
.dark-theme .goback-title{color: #1a1a1a;}
.dark-theme .goback-more{color: #1a1a1a;}
.light-theme .goback-btn{background-image: url(../assets/images/arrow-left1.png);}
.light-theme .goback-title{color: #fff;}
.light-theme .goback-more{color: #fff;}
</style>
