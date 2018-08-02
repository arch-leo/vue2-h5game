<template>
  <li :class="realnameOk ? 'active' : ''">
    <label class="icon-img icon-img-user" :class="realnameOk ? 'active' : ''"></label>
    <input
      type="text"
      placeholder="请输入您的真实姓名"
      v-model="realnameVal"
      @keyup="inputKeyup('realname')"
      @focus="inputFocusBlur('realname')"
      @input="inputInput('realname')"
      @blur="inputFocusBlur('realname')">
    <em v-if="realnameErr">请输入您的真实姓名</em>
    <i v-if="realnameVal.length > 0" @click="inputClear('realname')"></i>
  </li>
</template>

<script>
export default {
  name: 'Slider',
  props: ['input-name', 'icon-name','placehold'],
  data () {
    return {
      navs: [
        {path: '/index', title: '首页'},
        {path: '/game', title: '游戏'},
        {path: '/user', title: '个人'}
      ]
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
