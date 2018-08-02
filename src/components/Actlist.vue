<template>
  <ul class="act-list">
    <li :key="item.id" v-for="item in actList" @click="jump(item.url)">
      <img :src="item.img_url" :alt="item.ad_name">
      <div>
        <h3 class="ellipsis">{{item.ad_name}}</h3>
        <i>{{item.stat ? item.stat : '进行中'}}</i>
      </div>
      <div class="clearfix">
        <p>活动时间：{{item.act_time}}</p>
        <!-- <span>{{item.hot}}人在玩</span> -->
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Actlist',
  props: ['act-list'],
  data () {
    return {
    }
  },
  methods: {
    jump (url) {
      window.open(url)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.act-list{}
.act-list li{padding: .2rem 0;border-top: 1px solid #bfbfbf;overflow: hidden;}
.act-list li:first-child{border-top: none;}
.act-list img{display: block;margin-bottom: .1rem;}
.act-list div{padding-right: 1.5rem;position: relative;}
.act-list h3{width: 100%;font-size: .28rem;line-height: .48rem;}
.act-list p{width: 100%;color: #999;}
.act-list i{position: absolute;right: 0;top: .1rem;width: 1.2rem;height: .48rem;line-height: .48rem;background: #f54343;color: #fff;text-align: center;border-radius: .1rem;}
.act-list span{position: absolute;right: 0;top: 0;width: 1.8rem;color: #999;text-align: right;}
</style>
