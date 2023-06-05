<template>
  <div class="mask" @click="onMask" v-if="addMarkStatus">
    <div class="dialog" @click="outLick">
      <h4>更新了{{ diffMarks.length }}个书签:</h4>
      <ul>
        <li v-for="mark in diffMarks" @click="toUrl(mark)">
          <div>
            <img :src='`/img/${mark.icon}`' :alt="mark.name " />
            <span>{{ mark.name }}</span>
          </div>
          <p>{{ mark.des }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import _config from '../config'
const flatConfig = _config.reduce((pre, cur) => {
  return [...pre, ...cur.label]
}, [])
// 根据本地存的时候,对比新的配置数组(flatConfig),多出来的就是新增的内容,给个弹窗提示.
const preMarks = JSON.parse(localStorage.getItem('mark') || '[]')

// 新增的书签
const diffMarks = flatConfig.reduce((pre, cur) => {
  const findExitMark = preMarks.find(mark => JSON.stringify(mark) === JSON.stringify(cur))
  if (!findExitMark) {
    return [...pre, cur]
  } else return pre
}, [])

const addMarkStatus = ref(false)
// 第一次就不显示弹窗了 并且有新增标签时候才显示弹窗
if (preMarks.length > 0 && diffMarks.length) {
  addMarkStatus.value = true
}
localStorage.setItem('mark', JSON.stringify(flatConfig))
function onMask() {
  addMarkStatus.value = false
}
function outLick(e) {
  e.stopPropagation()
}
function toUrl(info) {
  window.open(info.url)
}
</script>
<style lang="scss" scoped>
.mask {
  position: fixed;
  z-index: 99;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba($color: #fff, $alpha: 0.45);
  .dialog {
    padding: 20px 15px;
    background-color: #fff;
    border-radius: 10px;
    max-height: 80vh;
    width: 470px;
    box-shadow: rgb(0 0 0 / 20%) 0px 0px 0px 0px, rgb(0 0 0 / 15%) 0px 2px 14px 0px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    transform: translateY(-5vh);
  }
  h4 {
    padding-left: 10px;
    margin-bottom: 10px;
    font-size: 18px;
  }
  li {
    display: flex;
    align-items: center;
    padding: 7px 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: 0.3s;
    background-color: rgba(0, 0, 255, 0);
    &:hover {
      background-color: rgba(0, 0, 255, 0.2);
    }
    div {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      margin-right: 10px;
    }
    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
    span {
      font-size: 16px;
      font-weight: bold;
      width: 145px;
      flex-shrink: 0;
    }
    p {
      flex: 1;
    }
  }
}
</style>