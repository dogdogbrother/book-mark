<template>
  <div class="headr">
    <input type="text" title="会根据内容优先筛选 名称 > 描述 > url" @input="onInput" placeholder="名称/描述/URL">
    <a href="https://github.com/dogdogbrother/book-mark" target="_blank" title="去github提个PR吧">加个书签</a>
  </div>
</template>
<script setup>
const emit = defineEmits(["onSearch"])
function onInput(e) {
  emit('onSearch', e.target.value)
}
</script>

<style lang="scss" scoped>
.headr {
  height: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 146px;
  padding-right: 10px;
  padding-bottom: 15px;
  input {
    border: 1px solid #ccc;
    height: 25px;
    border-radius: 4px;
    padding: 0 10px;
    outline-color: rgba(blue, 0.6);
    width: 100px;
    transition: 0.2s;
    color: rgba(#333, 0.85);
    &:focus {
      outline-width: 1px;
      outline-style: solid;
      width: 180px;
    }
    &::-webkit-input-placeholder {
      color: rgba(#666, 0.5);
      font-size: 12px;
    }
  }
  a {
    text-decoration: none;
    color: rgba(blue, 0.8);
    transition: 0.2s;
    font-size: 12px;
    font-weight: bold;
    &:hover {
      color: rgba(blue, 1);
    }
  }
}
</style>