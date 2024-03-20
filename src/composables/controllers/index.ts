import { init, addEvent, removeEvent } from './keyboard'
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
    righOn: () => {
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
}

export const removeController = () => {
  removeEvent()
}
