<template>
  <canvas id="renderCanvas"></canvas>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onMounted, onUnmounted } from 'vue'
import * as BABYLON from 'babylonjs'
import { useEventListener } from '@vueuse/core'
import { useGame } from '@/stores/game'
import { useInteractor } from '@/stores/interactor'
import { initController, removeController } from '@/composables/controllers'
import { Ball } from '@/composables/babylon/ball'

const store = useGame()
const storeInteractor = useInteractor()

const bause = computed(() => store.getBause)

const scale = ref<number>(1)

useEventListener(window, 'resize', (event) => {
  const app = document.querySelector('#app') as HTMLElement
  if (!app) {
    return
  }
  // TODO: リサイズはのちにリファクタリングする
  const width = app.clientWidth
  const height = app.clientHeight
  if (width > height) {
    scale.value = 400 / height
  } else {
    scale.value = width / 800
  }
})

onMounted(() => {
  initController()
  // Get the canvas DOM element
  const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement
  if (!canvas) {
    return
  }
  // Load the 3D engine
  const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true })
  let ball: Ball | null = null
  // CreateScene function that creates and return the scene
  const createScene = () => {
    // Create a basic BJS Scene object
    const scene = new BABYLON.Scene(engine)
    // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
    const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 0, -200), scene)
    // Target the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero())
    // Attach the camera to the canvas
    camera.attachControl(canvas, false)
    // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene)
    // Create a built-in "sphere" shape using the SphereBuilder
    ball = new Ball(scene)
    // Create a built-in "ground" shape;
    const ground = BABYLON.MeshBuilder.CreateGround(
      'ground1',
      { width: 200, height: 60, subdivisions: 50, updatable: false },
      scene
    )
    ground.position.y = -10
    // Return the created scene
    return scene
  }
  // call the createScene function
  const scene = createScene()
  // scene.debugLayer.show()
  // run the render loop
  engine.runRenderLoop(() => {
    if (storeInteractor.isLeftOn) {
      store.bauseToLeft()
    }
    if (storeInteractor.isRightOn) {
      store.bauseToRight()
    }
    if (ball) {
      // console.log(bause.value.x, bause.value.y)
      ball.setPosition({ x: bause.value.x - 250, y: bause.value.y - 550 })
      // sphere.position.x = bause.value.x - 250
      // sphere.position.y = bause.value.y - 550
    }
    scene.render()
  })
  // the canvas/window resize event handler
  useEventListener(window, 'resize', () => {
    engine.resize()
  })
})

onUnmounted(() => {
  removeController()
})
</script>

<style lang="scss" scoped>
canvas {
  width: 1000px;
  height: 500px;
}
</style>
