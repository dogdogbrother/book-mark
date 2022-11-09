<template>
  <ul class="menu">
    <li 
      v-for="menu in config" 
      :key="menu.id"
      :class="{active: active == menu.id}"
      @click="changeActive(menu.id)"
    >{{menu.menu}}</li>
  </ul>
</template>

<script setup>

const props = defineProps({
  config: Array,
  active: Number
})
const emit = defineEmits(['changeActive'])
function changeActive(id) {
  if (props.active === id) return
  emit('changeActive', id)
}
</script>

<style lang="scss" scoped>
.menu {
  padding: 15px 10px;
  border-radius: 10px;
  border: 1px solid rgba($color: #ccc, $alpha: 0.7);
  margin-bottom: -5px;
  flex-shrink: 0;
  li {
    cursor: pointer;
    padding: 4px 10px;
    border-radius: 4px;
    margin-bottom: 5px;
    &:hover {
      background-color: rgba($color: #eee, $alpha: 0.4);
    }
    &.active {
      background-color: rgba($color: blue, $alpha: 0.7);
      color: #fff;
    }
  }
}
</style>
