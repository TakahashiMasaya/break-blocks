import { Vec2 } from '@/libs/vec2'
import { initialSpaceWalls, initialState, state } from './state'

export const toReady = () => {
  state.value.status = 'ready'
}

export const toPlaying = () => {
  state.value.status = 'playing'
}

export const toGameover = () => {
  state.value.status = 'gameover'
}

export const toGameclear = () => {
  state.value.status = 'gameclear'
}

export const resetSpaceWall = () => {
  state.value.spaceWalls = [...initialSpaceWalls]
}

/**
 * スペースウォールが全て空であるかを返す
 *
 */
export const isAllSpaceWallunshow = () =>
  state.value.spaceWalls.every((spaceWall) => !spaceWall.show)

/**
 * スコアを加算する
 *
 * @param {number} score
 */
export const addScore = (score: number) => {
  state.value.score += score
}

/**
 * スコアをリセットする
 *
 */
export const resetScore = () => {
  state.value.score = 0
}

export const setBallSpeed = (params: { x?: number; y?: number }) => {
  state.value.ball.speed.setVec(params.x ?? 0, params.y ?? 0)
}

export const setBallPosition = (params: { x?: number; y?: number }) => {
  state.value.ball.position.setVec(params.x ?? 0, params.y ?? 0)
}

/**
 * ボールを動かす
 *
 */
export const moveBall = () => {
  adoptiveBallSpeed()
  state.value.ball.position = state.value.ball.position.add(state.value.ball.speed)
}

/**
 * スピードを上げる
 *
 */
const increaseBallSpeed = () => {
  const mag = state.value.ball.speed.mag()
  state.value.ball.speed = state.value.ball.speed.mul(mag <= 10 ? 1.1 : 0.9)
}

/**
 * ボールスピードを調整する
 *
 */
const adoptiveBallSpeed = () => {
  // ボールスピードが2未満にならないよう調整する
  const { x, y } = state.value.ball.speed.getVec()
  state.value.ball.speed.setVec(
    Math.abs(x) <= 2 ? (x < 0 ? -2 : 2) : x,
    Math.abs(y) <= 2 ? (y < 0 ? -2 : 2) : y
  )
}

/**
 * ボールを跳ねる
 *
 */
export const bouncingBall = () => {
  state.value.collided = null

  const { position, width, speed } = state.value.ball
  const { x, y } = position.add(speed)

  // 壁に当たったら跳ね返る(横)
  if (x < 0 || x + width > state.value.frame.width) {
    const { x: speedX, y: speedY } = state.value.ball.speed.getVec()
    state.value.ball.speed.setVec(speedX * -1, speedY)
    state.value.collided = 'wall'
  }

  // 壁に当たったら跳ね返る(天井)
  if (y < 0) {
    const { x: speedX, y: speedY } = state.value.ball.speed.getVec()
    state.value.ball.speed.setVec(speedX, speedY * -1)
    state.value.collided = 'wall'
  }

  // スペースウォールとボールの衝突判定
  const collidedSpaceWall = state.value.spaceWalls.find((spaceWall) => {
    if (!spaceWall.show) {
      return false
    }
    const { x: spaceWallX, y: spaceWallY } = spaceWall.position.getVec()
    return [...new Array(6)].some((_, i) => {
      const vecPosition = new Vec2(spaceWallX + i * 10, spaceWallY)
      const distance = vecPosition.sub(position.add(speed)).mag()
      // 衝突したら
      if (distance < state.value.ball.radius + 10) {
        const w = state.value.ball.position.sub(vecPosition)
        const r = state.value.ball.speed.reflect(w)
        state.value.ball.speed = r
        return true
      }
    })
  })
  if (collidedSpaceWall) {
    collidedSpaceWall.show = false
    addScore(100)
    increaseBallSpeed()
    state.value.collided = 'spaceWall'
  }

  // バウスに当たったら跳ね返る
  // NOTE: バウスを10こ円を並べるイメージで衝突判定する
  const { x: bauseX, y: bauseY } = state.value.bause.position.getVec()
  const collidedBauseIndex = [...new Array(10)].findIndex((_, i) => {
    const vecPosition = new Vec2(bauseX + i * 10, bauseY)
    const distance = vecPosition.sub(position.add(speed)).mag()
    return distance < state.value.ball.radius + state.value.bause.radius
  })
  // 衝突したら
  if (collidedBauseIndex >= 0) {
    const vecPosition = new Vec2(bauseX + collidedBauseIndex * 10, bauseY)
    const w = state.value.ball.position.sub(vecPosition)
    const r = state.value.ball.speed.reflect(w)
    state.value.ball.speed = r
    state.value.collided = 'bause'
  }
}

/**
 * ボールが画面上から落ちたかどうか
 *
 */
export const isBallDropped = () => state.value.ball.position.getVec().y > state.value.frame.height

/**
 * 左へ移動する
 *
 */
export const bauseToLeft = () => {
  const { x, y } = state.value.bause.position.getVec()
  const { x: speedx } = state.value.bause.speed.getVec()
  if (x - speedx <= 0) {
    state.value.bause.position.setVec(0, y)
    return
  }
  state.value.bause.position = state.value.bause.position.sub(state.value.bause.speed)
}

/**
 *　右へ移動する
 *
 */
export const bauseToRight = () => {
  const { x, y } = state.value.bause.position.getVec()
  const { x: speedx } = state.value.bause.speed.getVec()
  if (x + speedx >= state.value.frame.width - state.value.bause.width) {
    state.value.bause.position.setVec(state.value.frame.width - state.value.bause.width, y)
    return
  }
  state.value.bause.position = state.value.bause.position.add(state.value.bause.speed)
}

/**
 * ステータスを全てリセットする
 *
 */
export const resetAll = () => {
  state.value = {
    ...initialState()
  }
}
