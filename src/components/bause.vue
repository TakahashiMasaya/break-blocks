<template>
  <div
    :class="{
      bause: true,
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
  x: number
  y: number
  width: number
  height: number
  isExplode: boolean
}>()
</script>

<style scoped lang="scss">
@use '@/assets/exploded.scss';

.bause {
  position: absolute;
  background-color: #4444dd;
  border-radius: 10px;
  width: v-bind('`${props.width}px`');
  height: v-bind('`${props.height}px`');
  transform: translate(v-bind('`${props.x}px`'), v-bind('`${props.y}px`'));
  &.exploded__parts {
    background-color: transparent;
  }
}
</style>
