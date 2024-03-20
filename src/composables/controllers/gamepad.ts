import { ref } from 'vue'

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

const connectedGamepadIndex = ref<number | null>(null)

const axesDeadzone = 0.5

export const init = ({ leftOff, leftOn, rightOff, rightOn, spaceOn, spaceOff }: typeof command) => {
  command.leftOff = leftOff
  command.leftOn = leftOn
  command.rightOff = rightOff
  command.rightOn = rightOn
  command.spaceOn = spaceOn
  command.spaceOff = spaceOff
}

const connect = (e: GamepadEvent) => {
  connectedGamepadIndex.value = e.gamepad.index
}

const disconnected = (e: GamepadEvent) => {
  connectedGamepadIndex.value = null
}

export const addEvent = () => {
  window.addEventListener('gamepadconnected', connect)
  window.addEventListener('gamepaddisconnected', disconnected)
}

export const removeEvent = () => {
  window.removeEventListener('gamepadconnected', connect)
  window.removeEventListener('gamepaddisconnected', disconnected)
}

export const actPad = () => {
  if (connectedGamepadIndex.value === null) {
    return
  }
  const gamepads = window.navigator.getGamepads()
  const gp = gamepads[connectedGamepadIndex.value]

  // ボタンが押されているかどうかを取得。
  //   BUTTON_A_INDEX: 0,
  //   BUTTON_B_INDEX: 1,
  //   BUTTON_X_INDEX: 2,
  //   BUTTON_Y_INDEX: 3,
  //   BUTTON_LB_INDEX: 4,
  //   BUTTON_RB_INDEX: 5,
  //   BUTTON_LT_INDEX: 6,
  //   BUTTON_RT_INDEX: 7,
  //   BUTTON_BACK_INDEX: 8,
  //   BUTTON_START_INDEX: 9,
  //   BUTTON_L3_INDEX: 10,
  //   BUTTON_R3_INDEX: 11,
  //   BUTTON_UP_INDEX: 12,
  //   BUTTON_DOWN_INDEX: 13,
  //   BUTTON_LEFT_INDEX: 14,
  //   BUTTON_RIGHT_INDEX: 15,
  //   BUTTON_HOME_INDEX: 16,

  //   十字ボタン制御
  //   AXIS_L_HORIZONTAL_INDEX: 0,
  //   AXIS_L_VERTICAL_INDEX: 1,
  //   AXIS_R_HORIZONTAL_INDEX: 2,
  //   AXIS_R_VERTICAL_INDEX: 3,

  if (gp?.buttons[0]?.pressed === true) {
    command.spaceOn()
  }
  if (gp?.buttons[0]?.pressed === false) {
    command.spaceOff()
  }
  if (gp?.buttons[14]?.pressed === true) {
    command.leftOn()
  }
  if (gp?.buttons[14]?.pressed === false) {
    command.leftOff()
  }
  if (gp?.buttons[15]?.pressed === true) {
    command.rightOn()
  }
  if (gp?.buttons[15]?.pressed === false) {
    command.rightOff()
  }

  // スティック設定
  setAxes(gp?.axes)
}

const setAxes = (axes?: Gamepad['axes']) => {
  const [leftAxesHorizontal, leftAxesVertical] = axes ?? [0, 0]
  if (leftAxesHorizontal > axesDeadzone && Math.abs(leftAxesVertical) < axesDeadzone) {
    // console.log('R');
    command.rightOn()
  } else if (leftAxesHorizontal < axesDeadzone * -1 && Math.abs(leftAxesVertical) < axesDeadzone) {
    // console.log('L');
    command.leftOn()
  } else if (Math.abs(leftAxesHorizontal) < axesDeadzone && leftAxesVertical > axesDeadzone) {
    // console.log('D');
  } else if (Math.abs(leftAxesHorizontal) < axesDeadzone && leftAxesVertical < axesDeadzone * -1) {
    // console.log('U');
  } else if (leftAxesHorizontal >= axesDeadzone && leftAxesVertical >= axesDeadzone) {
    // console.log('RD');
  } else if (leftAxesHorizontal <= axesDeadzone * -1 && leftAxesVertical >= axesDeadzone) {
    // console.log('LD');
  } else if (leftAxesHorizontal >= axesDeadzone && leftAxesVertical <= axesDeadzone * -1) {
    // console.log('RU');
  } else if (leftAxesHorizontal <= axesDeadzone * -1 && leftAxesVertical <= axesDeadzone * -1) {
    // console.log('LU');
  }
}
