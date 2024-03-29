<script setup lang="ts">
import { ref } from 'vue'
import Game from '@/components/game.vue'
import GameTitle from '@/components/gameTitle.vue'
import { useEventListener } from '@vueuse/core'

const ready = ref(true)

useEventListener(document, 'click', (e) => {
  new AudioContext()
  ready.value = false
})
</script>

<template>
  <div v-if="ready">
    <GameTitle />
  </div>
  <div v-else>
    <Game />
  </div>
</template>

<style scoped lang="scss"></style>
