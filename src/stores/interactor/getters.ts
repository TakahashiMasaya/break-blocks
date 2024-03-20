import { state } from './state'
import { computed } from 'vue'

export const isLeftOn = computed(() => state.value.direction.left)

export const isRightOn = computed(() => state.value.direction.right)

export const isSpaceOn = computed(() => state.value.space)
