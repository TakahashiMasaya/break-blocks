import { ref } from 'vue'

export type State = {
  status: 'ready' | 'playing' | 'gameover' | 'gameclear'
  frame: {
    width: number
    height: number
  }
  spaceWalls: {
    show: boolean
    type: number
    width: number
    height: number
    x: number
    y: number
  }[]
  ball: {
    x: number
    y: number
    width: number
    height: number
    speed: number
    radian: number
  }
  bause: {
    x: number
    y: number
    width: number
    height: number
    speed: number
  }
  score: number
}

export const initialSpaceWalls = [...new Array(48)].map((_, i) => {
  const cols = i % 8
  const rows = Math.floor(i / 8)
  return { show: true, type: 0, x: 100 + cols * 50, y: 50 + rows * 20, width: 50, height: 20 }
})

export const state = ref<State>({
  status: 'ready',
  frame: {
    width: 600,
    height: 600
  },
  spaceWalls: JSON.parse(JSON.stringify(initialSpaceWalls)),
  ball: { x: 290, y: 480, width: 20, height: 20, speed: 8, radian: 0 },
  bause: { x: 250, y: 500, width: 100, height: 20, speed: 10 },
  score: 0
})
