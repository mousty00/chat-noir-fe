import { vi, describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMutation } from '@apollo/client/react'
import { useToggleFavorite } from '@/hooks/favorites/useToggleFavorite'

// ── Mocks ──────────────────────────────────────────────────────────────────

const mockAddMutationFn = vi.hoisted(() => vi.fn())
const mockRemoveMutationFn = vi.hoisted(() => vi.fn())
const mockToast = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }))
const mockIsFavorite = vi.hoisted(() => vi.fn())
const mockAddFavoriteId = vi.hoisted(() => vi.fn())
const mockRemoveFavoriteId = vi.hoisted(() => vi.fn())

// useMutation is called twice per render: ADD_FAVORITE, then REMOVE_FAVORITE.
// We cycle using mockImplementationOnce + mockImplementation.
vi.mock('@apollo/client/react', () => ({
  useMutation: vi.fn(),
}))

vi.mock('sonner', () => ({ toast: mockToast }))

vi.mock('@/hooks/useAuthStore', () => ({
  useAuthStore: () => ({ token: 'auth-token' }),
}))

vi.mock('@/hooks/useFavoriteStore', () => ({
  useFavoriteStore: () => ({
    isFavorite: mockIsFavorite,
    addFavoriteId: mockAddFavoriteId,
    removeFavoriteId: mockRemoveFavoriteId,
  }),
}))

// ── Helper ─────────────────────────────────────────────────────────────────

function setupMutationMocks() {
  // Hook calls useMutation(ADD_FAVORITE) first, then useMutation(REMOVE_FAVORITE)
  vi.mocked(useMutation)
    .mockImplementationOnce(() => [mockAddMutationFn, {} as never])
    .mockImplementation(() => [mockRemoveMutationFn, {} as never])
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('useToggleFavorite', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setupMutationMocks()
  })

  describe('when the cat is NOT yet favorited', () => {
    beforeEach(() => {
      mockIsFavorite.mockReturnValue(false)
    })

    it('calls addFavorite mutation and updates the store', async () => {
      mockAddMutationFn.mockResolvedValue({
        data: {
          addFavorite: { success: true, data: { id: 'fav-1', cat: { id: 'cat-1' } } },
        },
      })

      const { result } = renderHook(() => useToggleFavorite())
      await act(async () => {
        await result.current.toggleFavorite('cat-1')
      })

      expect(mockAddMutationFn).toHaveBeenCalledWith(
        expect.objectContaining({ variables: { catId: 'cat-1' } }),
      )
      expect(mockAddFavoriteId).toHaveBeenCalledWith('cat-1')
      expect(mockToast.success).toHaveBeenCalledWith('Added to favorites')
      expect(mockRemoveMutationFn).not.toHaveBeenCalled()
    })

    it('shows error toast when addFavorite returns success: false', async () => {
      mockAddMutationFn.mockResolvedValue({
        data: { addFavorite: { success: false, message: 'Limit reached' } },
      })

      const { result } = renderHook(() => useToggleFavorite())
      await act(async () => {
        await result.current.toggleFavorite('cat-1')
      })

      expect(mockToast.error).toHaveBeenCalledWith('Limit reached')
      expect(mockAddFavoriteId).not.toHaveBeenCalled()
    })

    it('shows error toast when mutation throws', async () => {
      mockAddMutationFn.mockRejectedValue(new Error('Unexpected error'))

      const { result } = renderHook(() => useToggleFavorite())
      await act(async () => {
        await result.current.toggleFavorite('cat-1')
      })

      expect(mockToast.error).toHaveBeenCalledWith('Unexpected error')
    })
  })

  describe('when the cat IS already favorited', () => {
    beforeEach(() => {
      mockIsFavorite.mockReturnValue(true)
    })

    it('calls removeFavorite mutation and removes from store', async () => {
      mockRemoveMutationFn.mockResolvedValue({
        data: { removeFavorite: { success: true } },
      })

      const { result } = renderHook(() => useToggleFavorite())
      await act(async () => {
        await result.current.toggleFavorite('cat-1')
      })

      expect(mockRemoveMutationFn).toHaveBeenCalledWith(
        expect.objectContaining({ variables: { catId: 'cat-1' } }),
      )
      expect(mockRemoveFavoriteId).toHaveBeenCalledWith('cat-1')
      expect(mockToast.success).toHaveBeenCalledWith('Removed from favorites')
      expect(mockAddMutationFn).not.toHaveBeenCalled()
    })

    it('shows error toast when removeFavorite returns success: false', async () => {
      mockRemoveMutationFn.mockResolvedValue({
        data: { removeFavorite: { success: false, message: 'Not found' } },
      })

      const { result } = renderHook(() => useToggleFavorite())
      await act(async () => {
        await result.current.toggleFavorite('cat-1')
      })

      expect(mockToast.error).toHaveBeenCalledWith('Not found')
      expect(mockRemoveFavoriteId).not.toHaveBeenCalled()
    })
  })

  it('passes the Authorization header to the mutation', async () => {
    mockIsFavorite.mockReturnValue(false)
    mockAddMutationFn.mockResolvedValue({
      data: { addFavorite: { success: true, data: { id: 'fav-1' } } },
    })

    const { result } = renderHook(() => useToggleFavorite())
    await act(async () => {
      await result.current.toggleFavorite('cat-1')
    })

    expect(mockAddMutationFn).toHaveBeenCalledWith(
      expect.objectContaining({
        context: { headers: { Authorization: 'Bearer auth-token' } },
      }),
    )
  })
})
