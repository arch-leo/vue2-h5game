<template>
  <ul class="games-list">
    <li :key="item.id" v-for="item in gamesList" class="clearfix">
      <div>
        <h3>{{item.game_name}}</h3>
        <b class="ellipsis">{{item.comment | delHtmlTag}}</b>
      </div>
      <img :src="item.ico" :alt="item.title">
      <p>
        <span @click="jump(item.game_id)">打开</span>
        <em>{{item.assess_number}}人在玩</em>
      </p>
    </li>
  </ul>
</template>

<script>
import {delHtmlTag} from '@/utils/delHtmlTag'
export default {
  name: 'Viewlist',
  props: ['games-list'],
  data () {
    return {
    }
  },
  methods: {
    jump (param) {
      this.$emit('open-game', param)
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
.games-list{}
.games-list li{padding: .2rem 1.6rem .2rem 1rem;border-top: 1px solid #bfbfbf;overflow: hidden;}
.games-list li:first-child{border-top: none;}
.games-list div{width: 100%;padding: 0 .12rem;float: left;position: relative;}
.games-list img{float: left;margin-left: -100%;width: 1rem;left: -1rem;position: relative;border-radius: .2rem;}
.games-list p{float: left;margin-left: -1.6rem;width: 1.6rem;right: -1.6rem;position: relative;}
.games-list h3{font-size: .28rem;padding: .06rem 0;}
.games-list b{display: block;color: #999;}
.games-list span{display: block;width: .96rem;height: .48rem;line-height: .46rem;border: 1px solid #f54343;text-align: center;border-radius: .1rem;margin: 0 auto;cursor: pointer;color: #f54343;}
.games-list em{display: block;text-align: center;}
</style>
