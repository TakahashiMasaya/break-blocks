import { state } from './state'
import { computed } from 'vue'

export const getStatus = computed(() => state.value.status)

export const isPlaying = computed(() => state.value.status === 'playing')

export const isGameover = computed(() => state.value.status === 'gameover')

export const isGameclear = computed(() => state.value.status === 'gameclear')

export const getFrame = computed(() => state.value.frame)

export const getSpaceWalls = computed(() =>
  state.value.spaceWalls.map((spaceWall) => {
    const { position, width, height, show } = spaceWall
    return {
      x: position.getVec().x,
      y: position.getVec().y,
      width,
      height,
      show
    }
  })
)

export const getBall = computed(() => {
  const { position, width, height } = state.value.ball
  return {
    x: position.getVec().x,
    y: position.getVec().y,
    width,
    height
  }
})

export const getBause = computed(() => {
  const { position, width, height } = state.value.bause
  return {
    x: position.getVec().x,
    y: position.getVec().y,
    width,
    height
  }
})

export const getScore = computed(() => state.value.score)

export const collided = computed(() => state.value.collided)
