import { describe, expect, it, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useGame } from '@/stores/game'

describe('actions', () => {
  let ug: ReturnType<typeof useGame>
  beforeEach(() => {
    setActivePinia(createPinia())
    ug = useGame()
  })
  it('resetAll except having Vec2', () => {
    ug.resetAll()
    expect(ug.state.status).toBe('ready')
    expect(ug.state.frame).toEqual({
      width: 600,
      height: 600
    })
    expect(ug.state.score).toBe(0)
    expect(ug.state.collided).toBe(null)
  })
})
