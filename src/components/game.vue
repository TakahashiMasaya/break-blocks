<template>
  <div
    class="frame"
    :style="{
      transform: `scale(${scale})`
    }"
  >
    <div
      :class="{
        area: true,
        paused: isPlaying && isPaused(),
        gameover: isGameover,
        gameclear: isGameclear
      }"
      :style="{
        width: `${frame.width}px`,
        height: `${frame.height}px`,
        flex: `0 0 ${frame.width}px`
      }"
    >
      <spacewall
        v-for="(wall, index) in spacewalls"
        :key="`key___${index}`"
        :style="{
          transform: `translate(${wall.x}px, ${wall.y}px)`,
          width: `${wall.width}px`,
          height: `${wall.height}px`,
          display: wall.show ? 'block' : 'none'
        }"
      />
      <ball
        :style="{
          width: `${ball.width}px`,
          height: `${ball.height}px`,
          transform: `translate(${ball.x}px, ${ball.y}px)`
        }"
      />
      <bause
        :style="{
          width: `${bause.width}px`,
          height: `${bause.height}px`,
          transform: `translate(${store.getBause.x}px, ${store.getBause.y}px)`
        }"
      />
    </div>
    <div class="information">
      <p class="score">score: {{ score }}</p>
      <button v-if="isPlaying && isPaused()" @click.stop="start">start</button>
      <button v-if="isPlaying && !isPaused()" @click.stop="stop">pause</button>
      <button v-if="isGameover || isGameclear" @click.stop="restart">re-start</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useEventListener } from '@vueuse/core'
import { useGame } from '@/stores/game'
import { useInteractor } from '@/stores/interactor'
import Bause from '@/components/bause.vue'
import Spacewall from '@/components/spacewalls/spacewall.vue'
import Ball from '@/components/ball.vue'

import { init, add, start, stop, end, isPaused } from '@/composables/activeAnimator'
import { initController, removeController } from '@/composables/controllers'
import { actPad } from '@/composables/controllers/gamepad'

const store = useGame()
const storeInteractor = useInteractor()

const frame = computed(() => store.getFrame)
const spacewalls = computed(() => store.getSpaceWalls)
const ball = computed(() => store.getBall)
const bause = computed(() => store.getBause)
const score = computed(() => store.getScore)

const playingStatus = computed(() => store.getStatus)
const isGameover = computed(() => store.isGameover)
const isGameclear = computed(() => store.isGameclear)
const isPlaying = computed(() => store.isPlaying)

const scale = ref<number>(1)

const restart = () => {
  store.resetAll()
  store.toReady()
  start()
}

useEventListener(window, 'resize', () => {
  const app = document.querySelector('#app') as HTMLElement
  if (!app) {
    return
  }
  // TODO: リサイズはのちにリファクタリングする
  const width = app.clientWidth
  const height = app.clientHeight
  if (width > height) {
    scale.value = 400 / height
  } else {
    scale.value = width / 800
  }
})

onMounted(() => {
  init()
  initController()
  start()
  add('test', () => {
    if (storeInteractor.isLeftOn) {
      store.bauseToLeft()
    }
    if (storeInteractor.isRightOn) {
      store.bauseToRight()
    }
    switch (playingStatus.value) {
      case 'ready':
        if (storeInteractor.isSpaceOn) {
          store.toPlaying()
          store.setBallSpeed({ x: 5 * (Math.random() > 0.5 ? 1 : -1), y: 5 })
          break
        }
        // ボールも追随させる
        const { x, y, width } = bause.value
        const { width: ballWidth, height: ballHeight } = ball.value
        store.setBallPosition({ x: x + width / 2 - ballWidth / 2, y: y - ballHeight })
        break
      case 'playing':
        if (store.isBallDropped()) {
          store.toGameover()
          break
        }
        if (store.isAllSpaceWallunshow()) {
          store.toGameclear()
          break
        }
        store.moveBall()
        store.bouncingBall()
        break
      case 'gameover':
      case 'gameclear':
        stop()
        break
    }
  })
  add('gamepad', () => {
    actPad()
  })
})

onUnmounted(() => {
  end()
  removeController()
})
</script>

<style scoped lang="scss">
.frame {
  display: flex;
  transform-origin: top center;
}
.area {
  position: relative;
  background-color: #000;
  border: 10px solid #fff;
  border-bottom: none;
  box-sizing: content-box;
  &.paused::before {
    content: '';
    z-index: 2;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    color: #fff;
    width: 500px;
    text-align: center;
  }
  &.paused::after {
    content: 'PAUSED';
    z-index: 4;
  }
  &.gameover::after {
    content: 'GAMEOVER...';
    z-index: 3;
  }
  &.gameclear::after {
    content: 'GAME CLEAR!!';
    z-index: 3;
  }
}

.information {
  width: 200px;
  margin: 0px 10px;
}
.score {
  font-size: 2rem;
  text-align: center;
  padding: 10px;
  margin-bottom: 30px;
  color: #ddd;
  border-bottom: 2px dotted #ddd;
}

button {
  width: 200px;
  padding: 10px;
  border: none;
  border-radius: 10px;
}
</style>
