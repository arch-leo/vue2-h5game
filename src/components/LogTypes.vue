<template>
  <div class="log-types" :class="{'has-border': hasBorder}">
    <span class="logreg-weixin" @click="launch('weixin')" v-if="isWeixin || isApp"><em></em></span>
    <span class="logreg-qq" @click="launch('qq')" v-if="!isWeixin"><em></em></span>
    <span class="logreg-mobile" @click="launch('phone')" v-if="!isWeixin"><em></em></span>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'LogTypes',
  props: ['has-border'],
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['isWeixin', 'isApp'])
  },
  methods: {
    launch (name) {
      this.$emit('launch', name)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.log-types{font-size: 0;margin-bottom: .6rem;text-align: center;}
.log-types span{padding:.12rem;display: inline-block;border: 1px solid transparent;margin: 0 .2rem;border-radius: 50%;}
.log-types em{width: .48rem;height: .48rem;background: url(../assets/images/logreg-icon.png) no-repeat;background-size: 1.44rem;display: block;}
.log-types span.logreg-weixin em{background-position: 0 0;}
.log-types span.logreg-qq em{background-position: -.48rem 0;}
.log-types span.logreg-mobile em{background-position: -.96rem 0;}
.log-types.has-border span.logreg-weixin{border-color: #1fd32a;}
.log-types.has-border span.logreg-qq{border-color: #52aaed;}
.log-types.has-border span.logreg-mobile{border-color: #55eaca;}
</style>
