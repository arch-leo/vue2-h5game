<template>
  <div class="page-view page-gift">
    <Goback theme="dark-theme" title="我的礼包"></Goback>
    <!-- 游戏分类列表 -->
    <MyScroll :pull-down="pullDown" :pull-up="pullUp" :get-scroll-top="getScrollTop">
      <MyGiftlist :mygift-list="cardList"></MyGiftlist>
    </MyScroll>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import Goback from '@/components/Goback'
import MyScroll from '@/components/MyScroll'
import MyGiftlist from '@/components/MyGiftlist'
import {apiGetMyCard} from '@/config/api'
const apiObj = {
  card: apiGetMyCard
}
export default {
  name: 'ViewGift',
  data () {
    return {
      cardList: [],

      cardIndex: 0,
      cardSize: 10,
      cardTotal: 1
    }
  },
  computed: {
    cardPost () {
      return {
        pageindex: this.cardIndex,
        pagesize: this.cardSize,
        os_type: 'html5'
      }
    }
  },
  components: {
    Goback,
    MyScroll,
    MyGiftlist
  },
  created () {
    this.popLoadFn(true)
    this.getDataFn('card')
  },
  methods: {
    ...mapMutations(['popLoadFn', 'popInfoFn', 'goTopFn']),
    getDataFn (name, bool, refresh) {
      apiObj[name](this[name + 'Post'])
        .then(json => {
          this.getDataCb(json, name, bool, refresh)
          this.popLoadFn(false)
        })
        .catch((err) => {
          if (err) {
            console.log(err)
          }
          this.popLoadFn(false)
        })
    },
    getDataCb (json, name, bool, refresh) {
      let jsonData = JSON.parse(json.data.slice(1, (json.data.length - 1))).datas
      if (jsonData.length === 0) {
        this.popInfoFn('暂无礼包')
        return false
      }
      if (bool) {
        this.$set(this.$data, name + 'List', [])
      }
      this[name + 'List'] = this[name + 'List'].concat(jsonData)
      if (this[name + 'Index'] > 0) {
        this.$root.$emit('setState', 5)
      } else {
        let jsonCount = JSON.parse(json.data.slice(1, (json.data.length - 1))).count
        this[name + 'Total'] = jsonCount / this[name + 'Size'] ? Math.ceil(jsonCount / this[name + 'Size']) - 1 : 1
        if (refresh) {
          this.$root.$emit('setState', 3)
        }
      }
      this[name + 'Index']++
    },
    pullDown () {
      this.cardIndex = 0
      this.cardTotal = 1
      this.getDataFn('card', true, true)
      this.$root.$emit('setState', 0)
    },
    pullUp (mun) { // 加载回调
      if (this.cardIndex <= this.cardTotal) {
        this.getDataFn('card')
      } else {
        this.$root.$emit('setState', 7)
      }
    },
    getScrollTop (top) {
      if (top > 300) {
        this.goTopFn(true)
      } else {
        this.goTopFn(false)
      }
    },
    backTop () {
      this.$root.$emit('ScrollTop', 0)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-gift{height: 100%;padding: .8rem .12rem 0;}
/* .page-gift-cont{padding: .8rem .12rem 0;background: #fff;min-height: 100%;} */
</style>
