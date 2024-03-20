type Animation = {
  keyName: string // キー名
  act: (animatedTime?: number) => void // アニメーション実行メソッド
}

type AddAnimation = Omit<Animation, 'animationCount'>

export class Animator {
  private animationId = 0

  private animations: Array<Animation> = []

  private fps = 60

  private previousTime = performance.now()

  private interval = 0

  private deltaTime = 0

  private enableControllFps = false

  constructor(param?: {
    fps?: number // FPS
    enableControllFps?: boolean // FPS制御有無
  }) {
    this.animations = []
    this.fps = param?.fps || 60
    this.interval = 1000 / this.fps
    this.enableControllFps = param?.enableControllFps ?? false
  }

  /**
   * アニメーションをリセットする
   *
   * @memberof SceneAnimator
   */
  public reset = () => {
    this.animations = []
  }

  /**
   * アニメーションを追加する
   *
   * @param {Animation} animation
   * @memberof SceneAnimator
   */
  public addAnimation = (animation: AddAnimation) => {
    if (this.animations.some((anim) => anim.keyName === animation.keyName)) {
      // 既存の場合は追加しない
      return
    }
    this.animations = [...this.animations, { ...animation }]
  }

  /**
   * アニメーションを削除する
   *
   * @param {string} animationKeyName
   * @memberof SceneAnimator
   */
  public removeAnimation = (animationKeyName: string) => {
    this.animations = this.animations?.filter(
      (animation: Animation) => animation.keyName !== animationKeyName
    )
  }

  /**
   * アニメーションを実行する
   *
   * @private
   * @memberof SceneAnimator
   */
  private actAnimate = (currentTime: number) => {
    if (this.enableControllFps) {
      // FPS制御有効の場合
      if (!this.isOverFrameInterval(currentTime)) {
        // FPSよりも小さい場合は何もしない
        return
      }
    }

    this.animations.forEach((animation: Animation) => {
      animation.act(currentTime)
    })
  }

  /**
   * フレームインターバルがFPSよりも大きいかどうか
   *
   * @private
   * @param {number} currentTime
   * @memberof SceneAnimator
   */
  private isOverFrameInterval = (currentTime: number) => {
    this.deltaTime = currentTime - this.previousTime
    if (this.deltaTime > this.interval) {
      this.previousTime = currentTime - (this.deltaTime % this.interval)
    }
    return this.deltaTime > this.interval
  }

  /**
   * アニメーション開始
   *
   * @memberof SceneAnimator
   */
  public start = () => {
    if (this.animationId !== 0) {
      return
    }
    const loop = (currentTime: number) => {
      this.animationId = window.requestAnimationFrame(loop)
      this.actAnimate(currentTime)
    }
    this.animationId = window.requestAnimationFrame(loop)
  }

  /**
   * アニメーション終了
   *
   * @memberof SceneAnimator
   */
  public exit = () => {
    window.cancelAnimationFrame(this.animationId)
    this.animationId = 0
  }

  /**
   * アニメーション一時停止
   *
   * @memberof SceneAnimator
   */
  public pause = () => {
    window.cancelAnimationFrame(this.animationId)
    this.animationId = 0
  }
}
