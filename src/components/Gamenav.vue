<template>
  <swiper :options="swiperOption">
    <swiper-slide :key="item.id" v-for="item in gameNav">
      <span>{{item.category_name}}</span>
    </swiper-slide>
  </swiper>
</template>

<script>
let vm = null
export default {
  name: 'Gamenav',
  props: ['game-nav'],
  data () {
    return {
      currentIndex: 0,
      swiperOption: {
        // 初始化index
        initialSlide: 0,
        // 轮播方向 horizontal vertical
        direction: 'horizontal',
        slidesPerView: 3.6,
        on: {
          init () {
            this.slides.css('border-bottom-color', '#a0a0a0')
            this.slides.eq(0).css('border-bottom-color', '#f54343')
          },
          tap () {
            let clickIndex = this.clickedIndex
            if (vm.currentIndex !== clickIndex) {
              let clickSlide = this.slides.eq(clickIndex)
              this.slides.css('border-bottom-color', '#a0a0a0')
              clickSlide.css('border-bottom-color', '#f54343')
              vm.currentIndex = clickIndex
              vm.handleClickSlide(clickIndex)
            }
          }
        }
      }
    }
  },
  created () {
    vm = this
  },
  methods: {
    handleClickSlide (index) {
      this.$emit('select-subnav', this.gameNav[index].category_id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.swiper-slide{border-bottom: .04rem solid #a0a0a0;}
</style>
