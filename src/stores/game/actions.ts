import { initialSpaceWalls, state } from './state'

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

export const setBallRadian = (radian: number) => {
  state.value.ball.radian = radian
}

export const setBallPosition = (params: { x?: number; y?: number }) => {
  state.value.ball.x = params.x || state.value.ball.x
  state.value.ball.y = params.y || state.value.ball.y
}

const getBallSpeed = () => ({
  x: Math.trunc(Math.cos(state.value.ball.radian) * state.value.ball.speed),
  y: Math.trunc(Math.sin(state.value.ball.radian) * state.value.ball.speed)
})
/**
 * ボールを動かす
 *
 */
export const moveBall = () => {
  state.value.ball.x += getBallSpeed().x
  state.value.ball.y += getBallSpeed().y
}

const increaseBallSpeed = () => {
  state.value.ball.speed += state.value.ball.speed >= 12 ? 0 : 1
}

/**
 * ボールを跳ねる
 *
 */
export const bouncingBall = () => {
  const { x, y, width, height, radian } = state.value.ball

  // 壁に当たったら跳ね返る(横)
  if (x < 0 || x + width > state.value.frame.width) {
    state.value.ball.radian = Math.PI - radian
  }

  // 壁に当たったら跳ね返る(天井)
  if (y < 0) {
    state.value.ball.radian = -state.value.ball.radian
  }

  // スペースウォールとボールの衝突判定
  state.value.spaceWalls.forEach((spaceWall) => {
    if (!spaceWall.show) {
      return
    }
    const { x: sX, y: sY, width: sWidth, height: sHeight } = spaceWall
    if (x < sX + sWidth && x + width > sX && y < sY + sHeight && y + height > sY) {
      spaceWall.show = false
      addScore(100)
      increaseBallSpeed()
      // 横にバウンドする条件
      if (Math.abs(sX + sWidth - x) < 10 || Math.abs(x + width - sX) < 10) {
        state.value.ball.radian = Math.PI - radian
        return
      }
      // 縦にバウンドする条件
      state.value.ball.radian = -state.value.ball.radian
    }
  })

  // ボールがバウスより下の場合は何もしない
  if (y > state.value.bause.y) {
    return
  }

  // バウスに当たったら跳ね返る
  if (
    y + height + getBallSpeed().y > state.value.bause.y &&
    x + getBallSpeed().x < state.value.bause.x + state.value.bause.width &&
    x + width + getBallSpeed().x > state.value.bause.x
  ) {
    state.value.ball.radian = -state.value.ball.radian
  }
}

/**
 * ボールが画面上から落ちたかどうか
 *
 */
export const isBallDropped = () => state.value.ball.y > state.value.frame.height

export const bauseToLeft = () => {
  if (state.value.bause.x - state.value.bause.speed <= 0) {
    state.value.bause.x = 0
    return
  }
  state.value.bause.x -= state.value.bause.speed
}

export const bauseToRight = () => {
  if (
    state.value.bause.x + state.value.bause.speed >=
    state.value.frame.width - state.value.bause.width
  ) {
    state.value.bause.x = state.value.frame.width - state.value.bause.width
    return
  }
  state.value.bause.x += state.value.bause.speed
}

/**
 * ステータスを全てリセットする
 *
 */
export const resetAll = () => {
  state.value = {
    status: 'ready',
    frame: {
      width: 600,
      height: 600
    },
    spaceWalls: JSON.parse(JSON.stringify(initialSpaceWalls)),
    ball: { x: 290, y: 480, width: 20, height: 20, speed: 10, radian: 0 },
    bause: { x: 250, y: 500, width: 100, height: 20, speed: 10 },
    score: 0
  }
}
