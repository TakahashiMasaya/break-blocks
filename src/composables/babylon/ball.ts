import * as BABYLON from 'babylonjs'

export class Ball {
  private ball: BABYLON.Mesh | null = null

  private scene: BABYLON.Scene | null = null

  constructor(scene: BABYLON.Scene) {
    this.scene = scene
    this.ball = BABYLON.MeshBuilder.CreateSphere(
      'ball',
      { segments: 16, diameter: 10, sideOrientation: BABYLON.Mesh.FRONTSIDE },
      this.scene
    )
  }

  public getBall = () => this.ball

  public setPosition: (params: { x?: number; y?: number; z?: number }) => void = ({ x, y, z }) => {
    if (this.ball) {
      this.ball.position.x = x || 0
      this.ball.position.y = y || 0
      this.ball.position.z = z || 0
    }
  }
}
