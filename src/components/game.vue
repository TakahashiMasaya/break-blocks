<template>
  <div
    ref="divFrame"
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
        :x="store.getBause.x"
        :y="store.getBause.y"
        :width="bause.width"
        :height="bause.height"
        :is-explode="isGameover"
      />
    </div>
    <div
      class="information"
      :style="{
        height: `${frame.height}px`
      }"
    >
      <p class="score">SCORE<br />{{ score }}</p>
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
import { useSound } from '@vueuse/sound'

const store = useGame()
const storeInteractor = useInteractor()

const divFrame = ref<HTMLDivElement>()

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

const resize = () => {
  if (!divFrame.value) {
    return
  }
  const width = window.innerWidth - 40
  const height = window.innerHeight - 40
  const { width: w, height: h } = divFrame.value.getBoundingClientRect()
  // NOTE: 画面サイズから割り出し、縦横比を維持したまま、短辺に合わせる
  if (width > height) {
    console.log('width >')
    if (width / height > w / h) {
      console.log('width > :', width / height, w / h)
      scale.value = height / 600
    } else {
      console.log('height > :', width / height, w / h)
      scale.value = width / 850
    }
  } else {
    console.log('height >')
    scale.value = width / 850
  }
}

useEventListener(window, 'resize', resize)

const { play: playCollision } = useSound('./sound/collision.mp3', {
  volume: 0.1
})
const { play: playCollidedWall } = useSound('./sound/collidedWall.mp3', {
  volume: 0.1
})
const { play: playCollidedBouse } = useSound('./sound/collidedBouse.mp3', {
  volume: 0.1
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
        if (store.collided === 'spaceWall' || store.collided === 'wall') {
          playCollidedWall()
        } else if (store.collided === 'bause') {
          playCollidedBouse()
        }
        break
      case 'gameover':
        playCollision()
        stop()
        break
      case 'gameclear':
        stop()
        break
    }
  })
  add('gamepad', () => {
    actPad()
  })
  resize()
})

onUnmounted(() => {
  end()
  removeController()
})
</script>

<style scoped lang="scss">
.frame {
  display: flex;
}
.area {
  position: relative;
  background-color: #000;
  box-shadow: 0px -5px 0px 5px #ffffff;
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
  width: 250px;
  padding: 0px 10px;
  flex: 0 0 250px;
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
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 10px;
  font-size: 2rem;
}
</style>
