<template>
  <div
    :class="{
      spacewall1: true,
      exploded__parts: props.isExplode
    }"
  >
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  isExplode: boolean
}>()
</script>

<style scoped lang="scss">
@use '@/assets/exploded.scss';

.spacewall1 {
  position: absolute;
  background-color: #ff0000;
  border: 1px solid #ffaaaa;
  &.exploded__parts {
    border: none;
    background-color: transparent;
  }
}
</style>
