import { Animator } from '@/libs/animator'
import { ref } from 'vue'

let anim: Animator | null = null

const paused = ref(false)

export const init = () => {
  anim = new Animator({ fps: 60, enableControllFps: true })
}

export const add = (keyName: string, act: (animatedTime?: number) => void) => {
  anim?.addAnimation({
    keyName,
    act
  })
}
/**
 * アニメーションを開始する
 *
 */
export const start = () => {
  anim?.start()
  paused.value = false
}

/**
 * アニメーションを一時停止する
 *
 */
export const stop = () => {
  anim?.pause()
  paused.value = true
}

export const end = () => {
  anim?.exit()
  paused.value = false
}

/**
 * アニメーションが一時停止てであるかを返す
 *
 */
export const isPaused = () => paused.value === true
