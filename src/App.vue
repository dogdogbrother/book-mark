<template>
  <div class="app">
    <Menu :config="config" :active="active" @changeActive="manuChange"></Menu>
    <Panels ref="panels" :config="config" @change="changeActive" @toKeep="toKeep"></Panels>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import Menu from './components/menu.vue'
import Panels from './components/panels.vue'
import _config from './config'
import { getKeep, setKeep } from './utils/getLocal'
const flatConfig = []
const config = _config.filter(item => {
  flatConfig.push(...item.label)
  return item.label.length
})
// 一顿操作,把local里面存的对象 排序后放到 我的关注里
const myAttention = _config.find(item => item.menu === '我的关注')
const keep = getKeep()
const keepArr = Object.entries(keep)
keepArr.sort(([, a], [, b]) => b - a)
myAttention.label = keepArr.map(([name]) => flatConfig.find(item => item.name === name)).filter(item => item)
myAttention.label.splice(8)
if (myAttention.label.length) {
  config.unshift(myAttention)
}

const active = ref()
const panels = ref(null)
function changeActive(id) {
  if (active.value !== id) {
    active.value = id
  }
}
function manuChange(id) {
  panels.value.setId(id)
}
// 点击去了网站,记录在本地,下次打开显示在我的关注下
function toKeep(name) {
  const keep = getKeep()
  if (keep[name]) {
    keep[name]++
  } else keep[name] = 1
  setKeep(keep)
}
</script>
<style lang="scss" scoped>
.app {
  width: 100vw;
  max-width: 1306px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  height: 100vh;
  box-sizing: border-box;
}
</style>
