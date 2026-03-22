import { vi, describe, it, expect, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useQuery } from '@apollo/client/react'
import { useCategories } from '@/hooks/cat/useCategories'
import type { ErrorLike } from '@apollo/client'

vi.mock('@apollo/client/react', () => ({
  useQuery: vi.fn(),
}))

const mockCategories = [
  { id: 'c-1', name: 'Cyberpunk', mediaTypeHint: 'image' },
  { id: 'c-2', name: 'Mech', mediaTypeHint: 'video' },
]

function makeQueryReturn(overrides = {}) {
  return {
    data: undefined,
    loading: false,
    error: undefined,
    ...overrides,
  } as unknown as ReturnType<typeof useQuery>
}

describe('useCategories', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useQuery).mockReturnValue(makeQueryReturn())
  })

  it('returns an empty array when there is no data', () => {
    const { result } = renderHook(() => useCategories())
    expect(result.current.categories).toEqual([])
  })

  it('returns categories from a successful query', () => {
    vi.mocked(useQuery).mockReturnValue(
      makeQueryReturn({
        data: { categories: { success: true, data: mockCategories } },
      }),
    )

    const { result } = renderHook(() => useCategories())

    expect(result.current.categories).toHaveLength(2)
    expect(result.current.categories[0].name).toBe('Cyberpunk')
    expect(result.current.categories[1].name).toBe('Mech')
  })

  it('returns loading state', () => {
    vi.mocked(useQuery).mockReturnValue(makeQueryReturn({ loading: true }))
    const { result } = renderHook(() => useCategories())
    expect(result.current.loading).toBe(true)
  })

  it('returns the Apollo error when the query fails', () => {
    const err = { message: 'Forbidden', graphQLErrors: [] } as unknown as ErrorLike
    vi.mocked(useQuery).mockReturnValue(makeQueryReturn({ error: err }))

    const { result } = renderHook(() => useCategories())
    expect(result.current.error).toBe(err)
  })
})
