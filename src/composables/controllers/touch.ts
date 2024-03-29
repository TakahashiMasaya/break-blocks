const command: {
  leftOff: () => void
  leftOn: () => void
  rightOff: () => void
  rightOn: () => void
  spaceOn: () => void
  spaceOff: () => void
} = {
  leftOff: () => {},
  leftOn: () => {},
  rightOff: () => {},
  rightOn: () => {},
  spaceOn: () => {},
  spaceOff: () => {}
}

const position: { x: number; y: number } = { x: 0, y: 0 }

let timeStamp: number = 0

export const init = ({ leftOff, leftOn, rightOff, rightOn, spaceOn, spaceOff }: typeof command) => {
  command.leftOff = leftOff
  command.leftOn = leftOn
  command.rightOff = rightOff
  command.rightOn = rightOn
  command.spaceOn = spaceOn
  command.spaceOff = spaceOff
}

export const addEvent = () => {
  window.addEventListener('touchend', onTouchend)
  window.addEventListener('touchmove', onTouchmove)
  window.addEventListener('touchstart', onTouchstart)
}

export const removeEvent = () => {
  window.removeEventListener('touchend', onTouchend)
  window.removeEventListener('touchmove', onTouchmove)
  window.removeEventListener('touchstart', onTouchstart)
}

const onTouchend = (e: TouchEvent) => {
  if (Math.abs(timeStamp - e.timeStamp) < 100) {
    command.leftOff()
    command.rightOff()
    command.spaceOn()
    timeStamp = e.timeStamp
  }
}

const onTouchmove = (e: TouchEvent) => {
  if (Math.abs(e.touches[0].clientX - position.x) < 0.5) {
    command.leftOff()
    command.rightOff()
    position.x = e.touches[0].clientX
    position.y = e.touches[0].clientY
    return
  }
  if (e.touches[0].clientX < position.x) {
    // toLeft
    command.rightOff()
    command.leftOn()
  }
  if (e.touches[0].clientX > position.x) {
    // toRight
    command.leftOff()
    command.rightOn()
  }
  position.x = e.touches[0].clientX
  position.y = e.touches[0].clientY
}

const onTouchstart = (e: TouchEvent) => {
  timeStamp = e.timeStamp
}
