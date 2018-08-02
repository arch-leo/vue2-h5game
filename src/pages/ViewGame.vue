<template>
  <div class="page-view page-game">
    <!-- 分类导航 -->
    <div class="game-nav">
      <Gamenav :game-nav="gameNav" v-if="gameNav.length > 0" @select-subnav="selectSubnav"></Gamenav>
    </div>
    <!-- 游戏分类列表 -->
    <MyScroll :pull-down="pullDown" :pull-up="pullUp" :get-scroll-top="getScrollTop">
      <div class="main game-cont">
        <Gamelist :game-list="gamesList" @open-game="openGame"></Gamelist>
      </div>
    </MyScroll>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import MyScroll from '@/components/MyScroll'
import Gamenav from '@/components/Gamenav'
import Gamelist from '@/components/Gamelist'
import {apiGetClass, apiGetGames} from '@/config/api'
import {getCookie} from '@/utils/storage'
const apiObj = {
  class: apiGetClass,
  games: apiGetGames
}
export default {
  name: 'ViewGame',
  data () {
    return {
      gameNav: [],
      gamesList: [],

      category_id: 0,
      gamesIndex: 0,
      gamesSize: 10,
      gamesTotal: 1
    }
  },
  computed: {
    ...mapState(['userInfo']),
    gamesPost () {
      return {
        category_id: this.category_id,
        pageindex: this.gamesIndex,
        pagesize: this.gamesSize,
        os_type: 'h5'
      }
    }
  },
  components: {
    MyScroll,
    Gamenav,
    Gamelist
  },
  created () {
    this.popLoadFn(true)
    this.getCalss()
    this.getDataFn('games')
  },
  methods: {
    ...mapMutations(['popLoadFn', 'popInfoFn', 'goTopFn', 'setUserInfo']),
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
    openGame (param) {
      // param 游戏id
      if (getCookie('sid')) {
        window.open('//sy.ifeng.com/service/download?game_id=' + param)
      } else {
        this.setUserInfo(null)
        this.$router.push({path: this.$route.fullPath, query: {logreg: true}})
      }
    },
    getCalss () {
      apiObj['class']({os_type: 'html5'})
        .then(json => {
          let jsonData = JSON.parse(json.data.slice(1, (json.data.length - 1))).datas
          jsonData.unshift({category_name: '全部'})
          this.gameNav = jsonData
        })
        .catch((err) => {
          if (err) {
            console.log(err)
          }
        })
    },
    selectSubnav (id) {
      this.category_id = id
      this.gamesIndex = 0
      this.gamesTotal = 1
      this.popLoadFn(true)
      this.getDataFn('games', true)
      this.$root.$emit('setState', 0)
    },
    pullDown () {
      this.gamesIndex = 0
      this.gamesTotal = 1
      this.getDataFn('games', true, true)
      this.$root.$emit('setState', 0)
    },
    pullUp (mun) { // 加载回调
      if (this['gamesIndex'] <= this['gamesTotal']) {
        this.getDataFn('games')
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
/*page-game*/
.page-game{height: 100%;padding: .76rem 0 1rem;}
.game-nav{overflow: hidden;position: relative;width: 100%;height: .76rem;line-height: .72rem;text-align: center;margin-top: -.76rem;}
.game-cont{height: 100%;}
</style>
