import { vi, describe, it, expect, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useQuery } from '@apollo/client/react'
import { useCatById } from '@/hooks/cat/useCatById'
import type { ApolloError } from '@apollo/client'

vi.mock('@apollo/client/react', () => ({
  useQuery: vi.fn(),
}))

const mockCat = {
  id: 'cat-1',
  name: 'Ghost',
  color: 'white',
  image: 'ghost.jpg',
  sourceName: null,
  category: { id: 'c-1', name: 'Neo-Tokyo', mediaTypeHint: 'image' },
}

function makeQueryReturn(overrides = {}) {
  return {
    data: undefined,
    loading: false,
    error: undefined,
    refetch: vi.fn(),
    ...overrides,
  } as ReturnType<typeof useQuery>
}

describe('useCatById', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useQuery).mockReturnValue(makeQueryReturn())
  })

  it('returns cat data when query succeeds', () => {
    vi.mocked(useQuery).mockReturnValue(
      makeQueryReturn({
        data: { catById: { success: true, data: mockCat } },
      }),
    )

    const { result } = renderHook(() => useCatById('cat-1'))

    expect(result.current.cat).toEqual(mockCat)
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeUndefined()
  })

  it('returns null when there is no data', () => {
    const { result } = renderHook(() => useCatById('cat-1'))
    expect(result.current.cat).toBeNull()
  })

  it('skips the query when id is null', () => {
    renderHook(() => useCatById(null))

    expect(vi.mocked(useQuery)).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ skip: true }),
    )
  })

  it('returns loading state', () => {
    vi.mocked(useQuery).mockReturnValue(makeQueryReturn({ loading: true }))
    const { result } = renderHook(() => useCatById('cat-1'))
    expect(result.current.loading).toBe(true)
  })

  it('returns the Apollo error when the query fails', () => {
    const err = { message: 'Not found', graphQLErrors: [] } as unknown as ApolloError
    vi.mocked(useQuery).mockReturnValue(makeQueryReturn({ error: err }))

    const { result } = renderHook(() => useCatById('cat-1'))
    expect(result.current.error).toBe(err)
  })

  it('exposes a refetch function', () => {
    const mockRefetch = vi.fn()
    vi.mocked(useQuery).mockReturnValue(makeQueryReturn({ refetch: mockRefetch }))

    const { result } = renderHook(() => useCatById('cat-1'))
    expect(result.current.refetch).toBe(mockRefetch)
  })
})
