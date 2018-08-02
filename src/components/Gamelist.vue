<template>
  <ul class="hot-list">
    <li :key="item.id" v-for="item in gameList" class="clearfix" @click="jump(item.game_id)">
      <div>
        <h3>{{item.game_name}}</h3>
        <b class="ellipsis">{{item.comment | delHtmlTag}}</b>
      </div>
      <img :src="item.ico" :alt="item.title">
      <p>
        <span>打开</span>
        <em>{{item.assess_number}}人在玩</em>
      </p>
    </li>
  </ul>
</template>

<script>
import {delHtmlTag} from '@/utils/delHtmlTag'

export default {
  name: 'Gamelist',
  props: ['game-list'],
  data () {
    return {
    }
  },
  methods: {
    jump (id) {
      this.$emit('open-game', id)
    }
  },
  filters: {
    delHtmlTag (text) {
      return delHtmlTag(text)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hot-list{}
.hot-list li{padding: .2rem 1.6rem .2rem 1rem;border-top: 1px solid #bfbfbf;overflow: hidden;}
.hot-list li:first-child{border-top: none;}
.hot-list div{width: 100%;padding: 0 .12rem;float: left;position: relative;}
.hot-list img{float: left;margin-left: -100%;width: 1rem;left: -1rem;position: relative;border-radius: .2rem;}
.hot-list p{float: left;margin-left: -1.6rem;width: 1.6rem;right: -1.6rem;position: relative;}
.hot-list h3{font-size: .28rem;padding: .06rem 0;}
.hot-list b{display: block;color: #999;}
.hot-list span{display: block;width: .96rem;height: .48rem;line-height: .46rem;border: 1px solid #f54343;text-align: center;border-radius: .1rem;margin: 0 auto;cursor: pointer;color: #f54343;}
.hot-list em{display: block;text-align: center;}
</style>
