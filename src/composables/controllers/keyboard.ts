const command: {
  leftOff: () => void
  leftOn: () => void
  rightOff: () => void
  righOn: () => void
  spaceOn: () => void
  spaceOff: () => void
} = {
  leftOff: () => {},
  leftOn: () => {},
  rightOff: () => {},
  righOn: () => {},
  spaceOn: () => {},
  spaceOff: () => {}
}

export const init = ({ leftOff, leftOn, rightOff, righOn, spaceOn, spaceOff }: typeof command) => {
  command.leftOff = leftOff
  command.leftOn = leftOn
  command.rightOff = rightOff
  command.righOn = righOn
  command.spaceOn = spaceOn
  command.spaceOff = spaceOff
}

export const addEvent = () => {
  window.addEventListener('keyup', onKeyUp)
  window.addEventListener('keydown', onKeyDown)
}

export const removeEvent = () => {
  window.removeEventListener('keyup', onKeyUp)
  window.removeEventListener('keydown', onKeyDown)
}

const onKeyUp = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowLeft':
      command.leftOff()
      break
    case 'ArrowRight':
      command.rightOff()
      break
    case ' ':
      command.spaceOff()
      break
    default:
  }
}

const onKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowLeft':
      command.leftOn()
      break
    case 'ArrowRight':
      command.righOn()
      break
    case ' ':
      command.spaceOn()
      break
    default:
  }
}
