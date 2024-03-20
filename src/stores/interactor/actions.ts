import { state } from './state'

export const leftOn = () => {
  state.value.direction.left = true
}

export const leftOff = () => {
  state.value.direction.left = false
}

export const rightOn = () => {
  state.value.direction.right = true
}

export const rightOff = () => {
  state.value.direction.right = false
}

export const spaceOn = () => {
  state.value.space = true
}

export const spaceOff = () => {
  state.value.space = false
}
