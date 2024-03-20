import { state } from './state'
import { computed } from 'vue'

export const getStatus = computed(() => state.value.status)

export const isPlaying = computed(() => state.value.status === 'playing')

export const isGameover = computed(() => state.value.status === 'gameover')

export const isGameclear = computed(() => state.value.status === 'gameclear')

export const getFrame = computed(() => state.value.frame)

export const getSpaceWalls = computed(() => state.value.spaceWalls)

export const getBall = computed(() => state.value.ball)

export const getBause = computed(() => state.value.bause)

export const getScore = computed(() => state.value.score)
