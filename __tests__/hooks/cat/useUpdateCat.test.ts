import { vi, describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useUpdateCat } from '@/hooks/cat/useUpdateCat'

// ── Mocks ──────────────────────────────────────────────────────────────────

const mockUpdateMutationFn = vi.hoisted(() => vi.fn())
const mockRefetchQueries = vi.hoisted(() => vi.fn().mockResolvedValue([]))
const mockUploadMediaAsync = vi.hoisted(() => vi.fn().mockResolvedValue({ success: true }))
const mockToast = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }))

vi.mock('@apollo/client/react', () => ({
  useMutation: vi.fn(() => [mockUpdateMutationFn, {}]),
  useApolloClient: vi.fn(() => ({ refetchQueries: mockRefetchQueries })),
}))

vi.mock('@tanstack/react-query', () => ({
  useMutation: vi.fn(() => ({
    mutateAsync: mockUploadMediaAsync,
    isPending: false,
  })),
}))

vi.mock('sonner', () => ({ toast: mockToast }))

vi.mock('@/hooks/useAuthStore', () => ({
  useAuthStore: () => ({ token: 'test-token' }),
}))

// ── Fixtures ───────────────────────────────────────────────────────────────

const catInput = { name: 'Shadow V2', color: 'white' }
const successResult = {
  data: {
    updateCat: {
      success: true,
      message: 'Updated',
      data: { id: 'cat-1', name: 'Shadow V2', color: 'white', image: null },
    },
  },
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('useUpdateCat', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUploadMediaAsync.mockResolvedValue({ success: true })
    mockRefetchQueries.mockResolvedValue([])
  })

  it('returns true and shows success toast on successful update', async () => {
    mockUpdateMutationFn.mockResolvedValue(successResult)

    const { result } = renderHook(() => useUpdateCat())
    let success: boolean
    await act(async () => {
      success = await result.current.updateCat('cat-1', catInput)
    })

    expect(success!).toBe(true)
    expect(result.current.error).toBeNull()
    expect(mockToast.success).toHaveBeenCalledWith('Cat entry updated successfully')
    expect(mockUploadMediaAsync).not.toHaveBeenCalled()
  })

  it('uploads media when a file is provided', async () => {
    mockUpdateMutationFn.mockResolvedValue(successResult)
    const file = new File(['bytes'], 'new.jpg', { type: 'image/jpeg' })

    const { result } = renderHook(() => useUpdateCat())
    await act(async () => {
      await result.current.updateCat('cat-1', catInput, file)
    })

    expect(mockUploadMediaAsync).toHaveBeenCalledWith({ catId: 'cat-1', file })
  })

  it('passes id and cat variables to the mutation', async () => {
    mockUpdateMutationFn.mockResolvedValue(successResult)

    const { result } = renderHook(() => useUpdateCat())
    await act(async () => {
      await result.current.updateCat('cat-1', catInput)
    })

    expect(mockUpdateMutationFn).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: expect.objectContaining({ id: 'cat-1' }),
      }),
    )
  })

  it('returns false and shows error toast when mutation returns success: false', async () => {
    mockUpdateMutationFn.mockResolvedValue({
      data: { updateCat: { success: false, message: 'Cat not found', data: null } },
    })

    const { result } = renderHook(() => useUpdateCat())
    let success: boolean
    await act(async () => {
      success = await result.current.updateCat('cat-missing', catInput)
    })

    expect(success!).toBe(false)
    expect(result.current.error).toBe('Cat not found')
    expect(mockToast.error).toHaveBeenCalledWith('Cat not found')
  })

  it('returns false and shows error toast when mutation throws', async () => {
    mockUpdateMutationFn.mockRejectedValue(new Error('Unauthorized'))

    const { result } = renderHook(() => useUpdateCat())
    let success: boolean
    await act(async () => {
      success = await result.current.updateCat('cat-1', catInput)
    })

    expect(success!).toBe(false)
    expect(result.current.error).toBe('Unauthorized')
    expect(mockToast.error).toHaveBeenCalledWith('Unauthorized')
  })
})
