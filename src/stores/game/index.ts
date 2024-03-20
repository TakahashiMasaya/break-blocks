import { defineStore } from 'pinia'
import * as actions from './actions'
import * as getters from './getters'
import { state } from './state'

export const useGame = defineStore('game', () => {
  return { state, ...actions, ...getters }
})
