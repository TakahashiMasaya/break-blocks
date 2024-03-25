export class Vec2 {
  public x: number
  public y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  public getVec() {
    return { x: this.x, y: this.y }
  }
  public setVec(x: number, y: number) {
    this.x = x
    this.y = y
  }
  // このベクトルと、引数のベクトルbの和を計算する
  public add(b: Vec2) {
    const { x, y } = b.getVec()
    return new Vec2(this.x + x, this.y + y)
  }
  // このベクトルを実数s倍したベクトルを計算する
  public mul(s: number) {
    return new Vec2(s * this.x, s * this.y)
  }
  // このベクトルの大きさを求める
  public mag() {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }
  // このベクトルと引数のベクトルbの差を求める
  public sub(b: Vec2) {
    const { x, y } = b.getVec()
    return new Vec2(this.x - x, this.y - y)
  }
  // このベクトルを正規化したベクトルを求める
  public norm() {
    return this.mul(1 / this.mag())
  }
  // このベクトルと引数のベクトルbの、ドット積（内積）を求める
  public dot(b: Vec2) {
    const { x, y } = b.getVec()
    return this.x * x + this.y * y
  }
  // このベクトルの反射ベクトルを求める。
  // wは、法線ベクトルとする（大きさは問わない）
  public reflect(w: Vec2) {
    let cosTheta = this.mul(-1).dot(w) / (this.mul(-1).mag() * w.mag())
    let n = w.norm().mul(this.mag() * cosTheta)
    let r = this.add(n.mul(2))
    return r
  }
}
