import { ref } from 'vue'
import { Vec2 } from '@/libs/vec2'

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
    position: Vec2
  }[]
  ball: {
    width: number
    height: number
    position: Vec2
    speed: Vec2
    radius: number
  }
  bause: {
    width: number
    height: number
    position: Vec2
    speed: Vec2
    radius: number
  }
  score: number
  collided: 'wall' | 'bause' | 'spaceWall' | null
}

/**
 * 初期値を返す
 *
 * @return {*}  {State}
 */
export const initialState = (): State => ({
  status: 'ready',
  frame: {
    width: 600,
    height: 600
  },
  spaceWalls: [...new Array(48)].map((_, i) => {
    const cols = i % 8
    const rows = Math.floor(i / 8)
    return {
      show: true,
      type: 0,
      position: new Vec2(60 + cols * 60, 50 + rows * 20),
      width: 60,
      height: 20
    }
  }),
  ball: { position: new Vec2(290, 530), speed: new Vec2(5, -5), width: 20, height: 20, radius: 10 },
  bause: {
    position: new Vec2(250, 550),
    speed: new Vec2(10, 0),
    width: 100,
    height: 20,
    radius: 10
  },
  score: 0,
  collided: null
})

export const state = ref<State>({
  ...initialState()
})
