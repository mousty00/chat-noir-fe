import { vi, describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useQuery } from '@apollo/client/react'
import { useMyFavorites } from '@/hooks/favorites/useMyFavorites'
import type { ApolloError } from '@apollo/client'

vi.mock('@apollo/client/react', () => ({
  useQuery: vi.fn(),
}))

// ── Fixtures ───────────────────────────────────────────────────────────────

const mockFavorite = {
  id: 'fav-1',
  cat: {
    id: 'cat-1',
    name: 'Shadow',
    color: 'black',
    image: 'img.jpg',
    sourceName: null,
    category: { id: 'c-1', name: 'Cyberpunk', mediaTypeHint: 'image' },
  },
}

const mockPaginationData = {
  result: [mockFavorite],
  currentPage: 0,
  totalPages: 1,
  totalItems: 1,
  pageSize: 12,
  hasNext: false,
  hasPrevious: false,
}

const mockRefetch = vi.fn().mockResolvedValue({})

function makeQueryReturn(overrides = {}) {
  return {
    data: undefined,
    loading: false,
    error: undefined,
    refetch: mockRefetch,
    ...overrides,
  } as ReturnType<typeof useQuery>
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('useMyFavorites', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useQuery).mockReturnValue(makeQueryReturn())
  })

  it('returns empty favorites and null pagination when there is no data', () => {
    const { result } = renderHook(() => useMyFavorites())
    expect(result.current.favorites).toEqual([])
    expect(result.current.pagination).toBeNull()
  })

  it('returns favorites and pagination on successful query', () => {
    vi.mocked(useQuery).mockReturnValue(
      makeQueryReturn({
        data: {
          myFavorites: { success: true, data: mockPaginationData },
        },
      }),
    )

    const { result } = renderHook(() => useMyFavorites())

    expect(result.current.favorites).toHaveLength(1)
    expect(result.current.favorites[0].cat.name).toBe('Shadow')
    expect(result.current.pagination?.totalItems).toBe(1)
    expect(result.current.pagination?.hasNext).toBe(false)
  })

  it('returns loading state', () => {
    vi.mocked(useQuery).mockReturnValue(makeQueryReturn({ loading: true }))
    const { result } = renderHook(() => useMyFavorites())
    expect(result.current.loading).toBe(true)
  })

  it('returns the Apollo error when the query fails', () => {
    const err = { message: 'Unauthorized', graphQLErrors: [] } as unknown as ApolloError
    vi.mocked(useQuery).mockReturnValue(makeQueryReturn({ error: err }))

    const { result } = renderHook(() => useMyFavorites())
    expect(result.current.error).toBe(err)
  })

  it('calls refetch with new page when handlePageChange is called', async () => {
    vi.mocked(useQuery).mockReturnValue(makeQueryReturn())

    const { result } = renderHook(() => useMyFavorites(0, 12))
    await act(async () => {
      result.current.handlePageChange(2)
    })

    expect(mockRefetch).toHaveBeenCalledWith({ page: 2, size: 12 })
  })

  it('exposes a refetch function', () => {
    vi.mocked(useQuery).mockReturnValue(makeQueryReturn({ refetch: mockRefetch }))
    const { result } = renderHook(() => useMyFavorites())
    expect(result.current.refetch).toBe(mockRefetch)
  })
})
