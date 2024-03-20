import { defineStore } from 'pinia'
import * as actions from './actions'
import * as getters from './getters'
import { state } from './state'

export const useInteractor = defineStore('interactor', () => {
  return { state, ...actions, ...getters }
})
