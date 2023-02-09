<template>
  <div class="app">
    <Header @onSearch="onSearch" />
    <main v-if="config.length">
      <Menu :config="config" :active="active" @changeActive="manuChange"></Menu>
      <Panels ref="panels" :config="config" @change="changeActive" @toKeep="toKeep"></Panels>
    </main>
    <NoData v-else />
    <AddDialog />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import Menu from './components/menu.vue'
import Panels from './components/panels.vue'
import Header from './components/header.vue'
import NoData from './components/noData.vue'
import AddDialog from './components/addDialog.vue'
import _config from './config'
import { getKeep, setKeep } from './utils/getLocal'
const flatConfig = []
const config = ref(_config.filter(item => {
  flatConfig.push(...item.label)
  return item.label.length
}))
// 一顿操作,把local里面存的对象 排序后放到 我的关注里
const myAttention = ref({
  id: 1,
  menu: '我的关注',
  label: []
})
const keep = getKeep()
const keepArr = Object.entries(keep)
keepArr.sort(([, a], [, b]) => b - a)
myAttention.value.label = keepArr.map(([name]) => flatConfig.find(item => item.name === name)).filter(item => item)
myAttention.value.label.splice(10)
if (myAttention.value.label.length) {
  config.value.unshift(myAttention.value)
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
// 根据返回的key 去查找所有标签的 name des 和 url
function onSearch(_key) {
  const key = _key.trim()
  if (key) {
    config.value = _config.map(config => {
      return {
        ...config,
        label: config.label.filter(label => {
          const { name, des, url } = label
          return name.includes(key) || des.includes(key) || url.includes(key)
        })
      }
    }).filter(config => config.label.length)
  } else {
    const resConfig = _config.filter(config => config.label.length)
    if (myAttention.value.label.length) {
      resConfig.unshift(myAttention.value)
    }
    config.value = resConfig
  }
}
</script>
<style lang="scss" scoped>
.app {
  width: 100vw;
  max-width: 1286px;
  margin: 0 auto;
  padding: 20px;
  height: 100vh;
  box-sizing: border-box;
  main {
    display: flex;
    align-items: flex-start;
  }
}
</style>