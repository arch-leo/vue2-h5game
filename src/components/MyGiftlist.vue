<template>
  <ul class="mygift-list">
    <li :key="item.id" v-for="item in mygiftList">
      <div>
        <h3>{{item.booktitle}}</h3>
        <p>领取时间：{{item.intime}}</p>
        <h4>卡号：<span>{{item.code_str}}</span></h4>
      </div>
      <img :src="item.ico" :alt="item.game">
      <h5>
        <button :data-clipboard-text="item.code_str" class="copyText" @click="copyText">复制卡号</button>
        <em></em>
      </h5>
    </li>
  </ul>
</template>

<script>
import {mapMutations} from 'vuex'
import Clipboard from 'clipboard'
export default {
  name: 'MyGiftlist',
  props: ['mygift-list'],
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations(['popInfoFn']),
    copyText () {
      let clipboard = new Clipboard('.copyText')
      clipboard.on('success', e => {
        e.clearSelection()
        this.popInfoFn('复制成功')
      })
      clipboard.on('error', (e) => {
        this.popInfoFn('复制失败，请手动复制')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mygift-list{}
.mygift-list li{padding: .2rem 1.2rem .2rem 1rem;border-top: 1px solid #bfbfbf;overflow: hidden;}
.mygift-list li:first-child{border-top: none;}
.mygift-list div{width: 100%;padding: 0 .12rem;float: left;position: relative;}
.mygift-list div h3{font-size: .26rem;line-height: .44rem;}
.mygift-list div p{color: #999;line-height: .24rem;margin-bottom: .04rem;}
.mygift-list div h4{line-height: .28rem;}
.mygift-list div h4 span{color: #999;}
.mygift-list img{float: left;margin-left: -100%;width: 1rem;left: -1rem;position: relative;border-radius: .2rem;}
.mygift-list h5{float: left;margin-left: -1.2rem;width: 1.2rem;right: -1.2rem;position: relative;padding-top: .4rem;}
.mygift-list h5 button{border: 1px solid #f54343;border-radius: .1rem;color: #f54343;line-height: .4rem;width: 100%;}
</style>
