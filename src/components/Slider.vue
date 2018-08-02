<template>
  <swiper :options="swiperOption" class="slider" :class="flag ? 'active' : ''">
    <swiper-slide :key="item.id" v-for="item in slider">
      <div @click="jump(item.game_id, item.href)" class="slider-cont">
        <img :src="item.ico" :alt="item.game_name">
        <em class="ellipsis">{{item.game_name}}</em>
        <span>打开</span>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
export default {
  name: 'Slider',
  props: ['slider'],
  data () {
    return {
      swiperOption: {
        // 初始化index
        initialSlide: 0,
        // 轮播方向 horizontal vertical
        direction: 'horizontal',
        slidesPerView: 3.5,
        spaceBetween: 6
      },
      flag: false
    }
  },
  mounted () {
    this.flag = true
  },
  methods: {
    jump (id, href) {
      if (href) {
        setTimeout(() => {
          window.open(href)
        }, 0)
        return false
      }
      this.$emit('launch', id)
    }
  },
  beforeDestroy () {
    this.flag = false
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.swiper-slide{border: 1px solid #a0a0a0;border-radius: .15rem;box-shadow: 0 0 .1rem rgba(0,0,0,.2);}

.slider{position: relative;height: 1.78rem;padding-top: .2rem;opacity: 0;}
.slider.active{opacity: 1;}
.slider-cont{cursor: pointer;text-align: center;}
.slider-cont img{display: block;width: 52%;margin: -.2rem auto .1rem;border-radius: .1rem;}
.slider-cont em{display: block;line-height: .3rem;padding: 0 .12rem;margin-bottom: .06rem;}
.slider-cont span{display: block;width: 60%;line-height: .32rem;border-radius: .1rem;border: 1px solid #f54343;margin: 0 auto;font-size: .26rem;color: #f54343;}
</style>
