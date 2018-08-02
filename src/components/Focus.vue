<template>
  <swiper :options="swiperOption">
    <swiper-slide :key="item.id" v-for="item in focus">
      <a :href="item.url" target="_blank">
        <img :src="item.img_url" alt="h5游戏" width="100%">
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
    <!-- <div class="swiper-button-next" slot="button-next"></div> -->
  </swiper>
</template>

<script>
export default {
  name: 'Focus',
  props: ['focus'],
  data () {
    return {
      swiperOption: {
        // 初始化index
        initialSlide: 0,
        // 轮播方向 horizontal vertical
        direction: 'horizontal',
        autoplay: {
          // 触碰后是否停止轮播
          disableOnInteraction: false
        },
        // 修改swiper自己或子元素时 自动初始化swiper
        observer: true,
        // 修改swiper的父元素时 自动初始化swiper
        observeParents: true,
        loop: true,
        pagination: {
          // 分页器
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  methods: {
    jump (url) {
      console.log(111)
      this.$emit('launch-url', url)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
