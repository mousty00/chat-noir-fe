import { vi, describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDeleteCat } from '@/hooks/cat/useDeleteCat'

// ── Mocks ──────────────────────────────────────────────────────────────────

const mockDeleteMutationFn = vi.hoisted(() => vi.fn())
const mockToast = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }))

vi.mock('@apollo/client/react', () => ({
  useMutation: vi.fn(() => [mockDeleteMutationFn, {}]),
}))

vi.mock('sonner', () => ({ toast: mockToast }))

vi.mock('@/hooks/useAuthStore', () => ({
  useAuthStore: () => ({ token: 'test-token' }),
}))

// ── Tests ──────────────────────────────────────────────────────────────────

describe('useDeleteCat', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns true and shows success toast on successful deletion', async () => {
    mockDeleteMutationFn.mockResolvedValue({
      data: { deleteCat: { success: true, message: 'Deleted' } },
    })

    const { result } = renderHook(() => useDeleteCat())
    let success: boolean
    await act(async () => {
      success = await result.current.deleteCat('cat-1')
    })

    expect(success!).toBe(true)
    expect(result.current.error).toBeNull()
    expect(mockToast.success).toHaveBeenCalledWith('Cat removed from archive')
    expect(mockDeleteMutationFn).toHaveBeenCalledWith(
      expect.objectContaining({ variables: { id: 'cat-1' } }),
    )
  })

  it('passes the Authorization header to the mutation', async () => {
    mockDeleteMutationFn.mockResolvedValue({
      data: { deleteCat: { success: true } },
    })

    const { result } = renderHook(() => useDeleteCat())
    await act(async () => {
      await result.current.deleteCat('cat-1')
    })

    expect(mockDeleteMutationFn).toHaveBeenCalledWith(
      expect.objectContaining({
        context: { headers: { Authorization: 'Bearer test-token' } },
      }),
    )
  })

  it('returns false and shows error toast when mutation returns success: false', async () => {
    mockDeleteMutationFn.mockResolvedValue({
      data: { deleteCat: { success: false, message: 'Not found' } },
    })

    const { result } = renderHook(() => useDeleteCat())
    let success: boolean
    await act(async () => {
      success = await result.current.deleteCat('cat-missing')
    })

    expect(success!).toBe(false)
    expect(result.current.error).toBe('Not found')
    expect(mockToast.error).toHaveBeenCalledWith('Not found')
  })

  it('returns false and shows error toast when mutation throws', async () => {
    mockDeleteMutationFn.mockRejectedValue(new Error('Server error'))

    const { result } = renderHook(() => useDeleteCat())
    let success: boolean
    await act(async () => {
      success = await result.current.deleteCat('cat-1')
    })

    expect(success!).toBe(false)
    expect(result.current.error).toBe('Server error')
    expect(mockToast.error).toHaveBeenCalledWith('Server error')
  })
})
