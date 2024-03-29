import { init, addEvent, removeEvent } from './keyboard'
import {
  init as initGamepad,
  addEvent as addEventGamepad,
  removeEvent as removeEventGamepad
} from './gamepad'
import {
  init as initTouch,
  addEvent as addEventTouch,
  removeEvent as removeEventTouch
} from './touch'
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
  initTouch({
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
  addEventTouch()
}

export const removeController = () => {
  removeEvent()
  removeEventGamepad()
  removeEventTouch()
}
