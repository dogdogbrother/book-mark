<template>
  <div class="app">
    <Menu :config="config" :active="active" @changeActive="manuChange"></Menu>
    <Panels ref="panels" :config="config" @change="changeActive"></Panels>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import Menu from './components/menu.vue'
import Panels from './components/panels.vue'

const _config = [
  {
    id: 1,
    menu: '我的关注',
    label: []
  },
  {
    id: 2,
    menu: '文档官网',
    label: [
      {
        name: 'nodejs',
        des: '官网,无汉化,英语渣的痛',
        url: 'https://nodejs.org/zh-cn/docs/',
        icon: 'nodejs.png'
      },
      {
        name: 'nodejs中文网',
        des: '汉化,但版本落后,聊胜于无吧',
        url: 'https://www.nodeapp.cn/',
        icon: 'nodejs.png'
      },
      {
        name: 'Vue.js 2.0',
        des: '为了生计,总是要碰一碰2的',
        url: 'https://vuejs.zcopy.site/',
        icon: 'vuejs.png'
      },
      {
        name: 'Vue.js 3.0',
        des: 'hook -- 永远的神',
        url: 'https://www.javascriptc.com/vue3js/',
        icon: 'vuejs.png'
      },
      {
        name: 'Element-ui',
        des: 'vue2的好搭档',
        url: 'https://element.eleme.cn/#/zh-CN',
        icon: 'element.png'
      },
      {
        name: 'Vant',
        des: 'vue2/vue3都在这里',
        url: 'https://vant-contrib.gitee.io/vant/v4/#/zh-CN',
        icon: 'vant.png'
      },
      {
        name: 'ant design',
        des: 'react的pc组件搭档',
        url: 'https://ant.design/index-cn',
        icon: 'antd.png'
      },
      {
        name: 'Ant Design of Vue',
        des: 'vue版本的antd',
        url: 'https://antdv.com/docs/vue/introduce-cn/',
        icon: 'antd.png'
      },
      {
        name: 'webpack 中文文档',
        des: 'webpack4和5都在这里',
        url: 'https://webpack.docschina.org/',
        icon: 'webpack.png'
      },
      {
        name: 'vite 中文网',
        des: '集合了vite2和3',
        url: 'https://vitejs.cn/',
        icon: 'vite.png'
      },
      {
        name: 'pinia',
        des: 'vue3的状态管理工具',
        url: 'https://pinia.vuejs.org/',
        icon: 'pinia.png'
      },
      {
        name: 'TS中文文档',
        des: '虽然是中文,但版本较低3.x',
        url: 'https://www.tslang.cn/index.html',
        icon: 'ts.png'
      },
      {
        name: 'TypeScript',
        des: '英文文档',
        url: 'https://www.typescriptlang.org/',
        icon: 'ts.png'
      },
      {
        name: 'sequelize V6',
        des: 'node连接mysql的好帮手',
        url: 'https://www.sequelize.cn/other-topics/upgrade-to-v6',
        icon: 'sequelize.png'
      },
    ]
  },
  {
    id: 3,
    menu: '设计资源',
    label: [
      {
        name: 'mycolor-space',
        des: '生成漂亮的渐变色和css',
        url: 'https://mycolor.space/',
        icon: 'mycolor.png'
      },
      {
        name: 'burst 图片',
        des: '各种高清图片',
        url: 'https://burst.shopify.com/',
        icon: 'burst.png'
      },
    ]
  },
  {
    id: 4,
    menu: '开发社区',
    label: [
      {
        name: '掘金',
        des: '越来越拉胯',
        url: 'https://juejin.cn/',
        icon: 'juejin.png'
      },
      {
        name: 'github',
        des: '全球最大的同性交友',
        url: 'https://github.com/',
        icon: 'github.png'
      },
      {
        name: '慕课',
        des: '花冤枉钱,买视频课',
        url: 'https://github.com/',
        icon: 'mock.png'
      },
      {
        name: '极客时间',
        des: '视频课程啥都有',
        url: 'https://time.geekbang.org/',
        icon: 'jike.png'
      },
      {
        name: 'LeetCode 力扣',
        des: '刷题',
        url: 'https://leetcode.cn/',
        icon: 'leetcode.png'
      },
    ]
  }
]
const config = _config.filter(item => item.label.length)

const active = ref(1)
const panels = ref(null)
function changeActive(id) {
  if (active.value !== id) {
    active.value = id
  }
}
function manuChange(id) {
  panels.value.setId(id)
}
</script>
<style lang="scss" scoped>
.app {
  width: 100vw;
  max-width: 1080px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  height: 100vh;
  box-sizing: border-box;
}
</style>
