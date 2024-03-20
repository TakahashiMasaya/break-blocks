import { init, addEvent, removeEvent } from './keyboard'
import {
  init as initGamepad,
  addEvent as addEventGamepad,
  removeEvent as removeEventGamepad
} from './gamepad'
import { useInteractor } from '@/stores/interactor'

export const initController = () => {
  const store = useInteractor()
  init({
    leftOff: () => {
      store.leftOff()
    },
    leftOn: () => {
      store.leftOn()
    },
    rightOff: () => {
      store.rightOff()
    },
    rightOn: () => {
      store.rightOn()
    },
    spaceOn: () => {
      store.spaceOn()
    },
    spaceOff: () => {
      store.spaceOff()
    }
  })
  addEvent()
  initGamepad({
    leftOff: () => {
      store.leftOff()
    },
    leftOn: () => {
      store.leftOn()
    },
    rightOff: () => {
      store.rightOff()
    },
    rightOn: () => {
      store.rightOn()
    },
    spaceOn: () => {
      store.spaceOn()
    },
    spaceOff: () => {
      store.spaceOff()
    }
  })
  addEventGamepad()
}

export const removeController = () => {
  removeEvent()
  removeEventGamepad()
}
