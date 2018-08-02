<template>
  <ul class="gift-list">
    <li :key="item.id" v-for="item in giftList" @click="getGift(item.bookId)">
      <div class="gift-list-cont">
        <img :src="item.ico" :alt="item.title">
        <h3>{{item.game}}</h3>
        <p class="ellipsis">{{item.description | delHtmlTag}}</p>
      </div>
      <div class="gift-list-desc">
        <div>
          <h4><span>{{item.stat_desc}}</span>{{item.title}}</h4>
          <b>{{item.gameinfo | delHtmlTag}}</b>
        </div>
        <p>
          <button type="button">领取</button>
          <em>剩余{{item.freeCodeCount}}个</em>
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {delHtmlTag} from '@/utils/delHtmlTag'
import {getCookie} from '@/utils/storage'
import {apiGetCard} from '@/config/api'

export default {
  name: 'Giftlist',
  props: ['gift-list'],
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapMutations(['setUserInfo', 'popInfoFn', 'popFirmFn']),
    getGift (id) {
      let userSid = getCookie('sid')
      if (userSid) {
        this.getCard(id)
      } else {
        this.setUserInfo(null)
        this.popFirmFn('礼包需要登录后才能领取')
      }
    },
    getCard (id) {
      apiGetCard({bookid: id})
        .then(json => {
          this.popInfoFn('领取成功，前往个人中心查看')
        })
        .catch((err) => {
          if (err) {
            console.log(err)
          }
          this.popInfoFn('领取失败，请稍后重试')
        })
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
.gift-list{}
.gift-list li{padding: .2rem 0;border-top: 1px solid #bfbfbf;overflow: hidden;}
.gift-list li:first-child{border-top: none;}
.gift-list-cont{width: 100%;height: 1rem;overflow: hidden;margin-bottom: .1rem;}
.gift-list-cont img{float: left;width: 1rem;border-radius: .2rem;margin-right: .12rem;}
.gift-list-cont h3{font-size: .28rem;padding: .06rem 0;}
.gift-list-cont p{color: #999;}
.gift-list-desc{position: relative;padding-right: 1.2rem;}
.gift-list-desc p{position: absolute;right: 0;top: 0;color: #f54343;}
.gift-list-desc h4{font-size: .26rem;padding: .06rem 0;}
.gift-list-desc h4 span{padding: 0 .1rem;border: 1px solid #f54343;color: #f54343;border-radius: .1rem;margin-right: .2rem;}
.gift-list-desc b{display: block;color: #999;}
.gift-list-desc button{height: .48rem;width: .96rem;display: block;margin: 0 auto .06rem;border: 1px solid #f54343;color: #f54343;border-radius: .1rem;}

</style>
