<template>
  <div class="panels">
    <div
      class="panel"
      :class="menu.id"
      v-for="menu in config" 
      :key="menu.id"
      :id="menu.id"
    >
      <h2>{{menu.menu}}</h2>
      <ul>
        <li v-for="label in menu.label" :key="label.name" @click="toUrl(label.url)">
          <img :src="`/img/${label.icon}`" alt="icon">
          <h4>{{label.name}}</h4>
          <p>{{label.des}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { nextTick } from 'vue'
const props = defineProps({
  config: Array
})
function setId(id) {
  const dom = document.getElementById(`${id}`)
  console.log(dom);
  dom.scrollIntoView({block: 'start', behavior: 'smooth'})
}
defineExpose({
  setId
})
const emit = defineEmits(['change'])
function emitScroll(id) {
  emit('change', id)
}
nextTick(() => {
  const observer = new IntersectionObserver((changes) => {
    // 如果能找到一个隐藏起来 并且在上面的 就显示下一个
    const findHide = changes.find(item => {
      return item.intersectionRatio < 0.2 && item.boundingClientRect.top < 0
    })
    if (findHide) {
      return emitScroll(Number(findHide.target.id) + 1)
    }
    // 如果能找到一个显示完全的  并且在上面的 就显示这一个
    const findShow = changes.find(item => {
      return item.intersectionRatio > 0.9 && item.boundingClientRect.top < 100
    })
    if (findShow) {
      return emitScroll(Number(findShow.target.id))
    }
  }, { 
    threshold: [0.1, 1],
    root: document.querySelector('.panels')
  })
  const panels = document.querySelectorAll('.panel')
  panels.forEach(panel => {
    observer.observe(panel)
  })
})
function toUrl(url) {
  window.open(url)
}
</script>

<style lang="scss" scoped>
.panels {
  padding: 0 30px;
  margin-bottom: -40px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  h2 {
    font-size: 18px;
    margin-bottom: 15px;
  }
  .panel {
    margin-bottom: 40px;
  }
}
ul {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  margin-right: -20px;
  margin-bottom: -20px;
  li {
    cursor: pointer;
    padding: 10px;
    width: 180px;
    margin-right: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid rgba($color: #ccc, $alpha: 0.8);
    img {
      width: 40px;
      height: 40px;
    }
    h4 {
      margin-bottom: 10px;
      font-size: 18px;
      line-height: 28px;
      height: 28px;
    }
    p {
      font-size: 14px;
      line-height: 22px;
      height: 22px;
      color: #777;
    }
  }
}
</style>