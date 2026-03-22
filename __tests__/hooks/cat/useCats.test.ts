import { vi, describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useQuery } from '@apollo/client/react'
import { useCats } from '@/hooks/cat/useCats'
import type { ErrorLike } from '@apollo/client'

vi.mock('@apollo/client/react', () => ({
  useQuery: vi.fn(),
}))

// ── Fixtures ───────────────────────────────────────────────────────────────

const mockCat = {
  id: 'cat-1',
  name: 'Shadow',
  color: 'black',
  image: 'img.jpg',
  sourceName: 'Archive',
  category: { id: 'c-1', name: 'Cyberpunk', mediaTypeHint: 'image' },
}

const mockPaginationData = {
  result: [mockCat],
  currentPage: 0,
  totalPages: 2,
  totalItems: 20,
  pageSize: 12,
  hasNext: true,
  hasPrevious: false,
}

const mockRefetch = vi.fn().mockResolvedValue({})

function makeQueryReturn(overrides = {}) {
  return {
    data: undefined,
    loading: false,
    error: undefined,
    refetch: mockRefetch,
    networkStatus: 7,
    ...overrides,
  } as unknown as ReturnType<typeof useQuery>
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('useCats', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useQuery).mockReturnValue(makeQueryReturn())
  })

  it('returns empty cats and null pagination when there is no data', () => {
    const { result } = renderHook(() => useCats())
    expect(result.current.cats).toEqual([])
    expect(result.current.pagination).toBeNull()
    expect(result.current.success).toBe(false)
  })

  it('returns loading state', () => {
    vi.mocked(useQuery).mockReturnValue(makeQueryReturn({ loading: true }))
    const { result } = renderHook(() => useCats())
    expect(result.current.loading).toBe(true)
  })

  it('returns cats and pagination on a successful query', () => {
    vi.mocked(useQuery).mockReturnValue(
      makeQueryReturn({
        data: {
          cats: {
            success: true,
            message: 'OK',
            data: mockPaginationData,
          },
        },
      }),
    )

    const { result } = renderHook(() => useCats())

    expect(result.current.cats).toHaveLength(1)
    expect(result.current.cats[0].name).toBe('Shadow')
    expect(result.current.pagination?.totalItems).toBe(20)
    expect(result.current.pagination?.hasNext).toBe(true)
    expect(result.current.success).toBe(true)
    expect(result.current.message).toBe('OK')
  })

  it('exposes the Apollo error when the query fails', () => {
    const apolloError = { message: 'Network error', graphQLErrors: [] } as unknown as ErrorLike
    vi.mocked(useQuery).mockReturnValue(makeQueryReturn({ error: apolloError }))

    const { result } = renderHook(() => useCats())
    expect(result.current.error).toBe(apolloError)
  })

  it('increments refetchCount and calls refetch when handleRefetch is called', async () => {
    vi.mocked(useQuery).mockReturnValue(makeQueryReturn())

    const { result } = renderHook(() => useCats())
    expect(result.current.refetchCount).toBe(0)

    await act(async () => {
      result.current.handleRefetch()
    })

    expect(result.current.refetchCount).toBe(1)
    expect(mockRefetch).toHaveBeenCalledOnce()
  })

  it('calls refetch with the new page when handlePageChange is called', async () => {
    vi.mocked(useQuery).mockReturnValue(makeQueryReturn())

    const { result } = renderHook(() => useCats(0, 12))

    await act(async () => {
      result.current.handlePageChange(3)
    })

    expect(mockRefetch).toHaveBeenCalledWith({ page: 3, size: 12 })
  })

  it('passes filter variables to useQuery', () => {
    renderHook(() => useCats(0, 12, 'Cyberpunk', 'Shadow', 'black', 'Archive'))

    expect(vi.mocked(useQuery)).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        variables: {
          page: 0,
          size: 12,
          category: 'Cyberpunk',
          name: 'Shadow',
          color: 'black',
          source: 'Archive',
        },
      }),
    )
  })
})
