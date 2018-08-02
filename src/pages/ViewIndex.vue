<template>
  <div class="page-view page-index">
    <MyScroll :pull-down="pullDown" :pull-up="pullUp" :get-scroll-top="getScrollTop" :can-refresh="false">
    <!-- 焦点图 -->
    <div class="focus">
      <span class="focus-fill"></span>
      <Focus :focus="focus" v-if="focus.length > 0" class="focus-cont"></Focus>
    </div>
    <!-- 最近在玩 -->
    <div class="recent" v-if="recent.length > 0">
      <div class="recent-title">
        <span>最</span>
        <span>近</span>
        <span>在</span>
        <span>玩</span>
      </div>
      <Slider :slider="recent" @launch="openGame"></Slider>
    </div>
    <!-- 热门 活动 礼包 （次级导航） -->
    <ul class="clearfix subnav">
      <li :key="item.id" v-for="(item, index) in subnavs" :class="item.active ? 'active' : ''" @click="selectSubnav(index)">{{item.title}}</li>
    </ul>
    <!-- cont -->
    <div class="main">
      <template v-if="subflag === 'hot'">
        <Gamelist :game-list="hotList" @open-game="openGame"></Gamelist>
      </template>
      <template v-else-if="subflag === 'act'">
        <Actlist :act-list="actList"></Actlist>
      </template>
      <template v-else-if="subflag === 'gift'">
        <Giftlist :gift-list="giftList"></Giftlist>
      </template>
      <template v-else>
      </template>
    </div>
    </MyScroll>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import MyScroll from '@/components/MyScroll'
import Focus from '@/components/Focus'
import Slider from '@/components/Slider'
import Gamelist from '@/components/Gamelist'
import Actlist from '@/components/Actlist'
import Giftlist from '@/components/Giftlist'
import {apiGetRecords, apiGetHot, apiGetAct, apiGetGift} from '@/config/api'
import {getCookie} from '@/utils/storage'
const apiObj = {
  hot: apiGetHot,
  act: apiGetAct,
  gift: apiGetGift
}
export default {
  name: 'ViewIndex',
  data () {
    return {
      focus: [],
      recent: [],
      subnavs: [
        {title: '热门', key: 'hot', active: true},
        {title: '活动', key: 'act', active: false},
        {title: '礼包', key: 'gift', active: false}
      ],
      subflag: 'hot',
      hotList: [],
      actList: [],
      giftList: [],

      hotIndex: 0,
      hotSize: 10,
      hotTotal: 1,
      hotFinish: false,

      actIndex: 0,
      actSize: 10,
      actTotal: 1,
      actFinish: false,

      giftIndex: 0,
      giftSize: 15,
      giftTotal: 1,
      giftFinish: false
    }
  },
  computed: {
    ...mapState(['userInfo']),
    hotPost () {
      return {
        rank_id: 52,
        pageindex: this.hotIndex,
        pagesize: this.hotSize,
        os_type: 'html5'
      }
    },
    actPost () {
      return {
        pageindex: this.actIndex,
        pagesize: this.actSize,
        type: 4
      }
    },
    giftPost () {
      return {
        pageindex: this.giftIndex,
        pagesize: this.giftSize,
        system: 'h5'
      }
    }
  },
  components: {
    MyScroll,
    Focus,
    Slider,
    Gamelist,
    Actlist,
    Giftlist
  },
  created () {
    this.getFocus()
    this.getRecords()
    this.getDataFn('hot')
    this.getDataFn('act')
    this.getDataFn('gift')
  },
  methods: {
    ...mapMutations(['popLoadFn', 'popInfoFn', 'goTopFn', 'setUserInfo']),
    getFocus () {
      apiGetAct({type: 3})
        .then(json => {
          let jsonData = JSON.parse(json.data.slice(1, (json.data.length - 1))).datas
          this.focus = jsonData
        })
        .catch((err) => {
          if (err) {
            console.log(err)
          }
        })
    },
    getRecords () {
      apiGetRecords({os_type: 'html5', limit: 5})
        .then(json => {
          let jsonData = JSON.parse(json.data.slice(1, (json.data.length - 1))).datas
          this.recent = jsonData
        })
        .catch((err) => {
          if (err) {
            console.log(err)
          }
        })
    },
    getDataFn (name) {
      apiObj[name](this[name + 'Post'])
        .then(json => {
          this.getDataCb(json, name)
          this[name + 'Finish'] = true
        })
        .catch((err) => {
          if (err) {
            console.log(err)
          }
          this[name + 'Finish'] = true
        })
    },
    getDataCb (json, name) {
      let jsonData = JSON.parse(json.data.slice(1, (json.data.length - 1))).datas
      this[name + 'List'] = this[name + 'List'].concat(jsonData)
      if (this[name + 'Index'] > 0) {
        this.$root.$emit('setState', 5)
      } else {
        let jsonCount = JSON.parse(json.data.slice(1, (json.data.length - 1))).count
        this[name + 'Total'] = jsonCount / this[name + 'Size'] ? Math.ceil(jsonCount / this[name + 'Size']) - 1 : 1
      }
      this[name + 'Index']++
    },
    openGame (param) {
      // param 游戏id
      if (getCookie('sid')) {
        window.open('//sy.ifeng.com/service/download?game_id=' + param)
      } else {
        this.setUserInfo(null)
        this.$router.push({path: this.$route.fullPath, query: {logreg: true}})
      }
    },
    selectSubnav (index) {
      for (let i = 0; i < this.subnavs.length; i++) {
        this.$set(this.subnavs[i], 'active', false)
      }
      this.$set(this.subnavs[index], 'active', true)
      this.subflag = this.subnavs[index].key
      this.$root.$emit('setState', 0)
    },
    pullDown () {
      setTimeout(() => {
        this.$root.$emit('setState', 3)
      }, 500)
    },
    pullUp (mun) { // 加载回调
      if (this[this.subflag + 'Index'] <= this[this.subflag + 'Total']) {
        this.getDataFn(this.subflag)
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
/*page-index*/
.page-index{height: 100%;padding-bottom: .8rem;}
/*focus*/
.focus{overflow: hidden;position: relative;border-bottom: .1rem solid #f2f2f2;}
.focus-fill{height: 0;padding-bottom: 40%;width: 100%;display: block;}
.focus-cont{height: 100%;width: 100%;position: absolute;left: 0;top: 0;}
.focus-cont img{display: block;}
/*recent*/
.recent{height: 2.62rem;padding: .36rem 0;padding-left: .67rem;border-bottom: .1rem solid #f2f2f2;}
.recent-title{float: left;width: .55rem;height: 1.8rem;font-size: .26rem;text-align: center;color: #fff;margin-left: -.67rem;}
.recent-title{background: url(../assets/images/recent-bg.png) no-repeat 0 0;background-size: 100% 100%;}
.recent-title>span{display: block;}
.recent-cont{width: 100%;background: #f54343;height: 2.2rem;}
/*subnav*/
.subnav{font-size: .26rem;line-height: .4rem;}
.subnav li{float: left;text-align: center;border-bottom: .04rem solid #bfbfbf;padding: .15rem 0;transition: all .2s;}
.subnav li:nth-child(1){width: 33.3%;}
.subnav li:nth-child(2){width: 33.4%;}
.subnav li:nth-child(3){width: 33.3%;}
.subnav li.active{border-bottom-color: #f54343;color: #f54343;}
</style>
