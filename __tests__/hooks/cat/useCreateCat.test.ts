import { vi, describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCreateCat } from '@/hooks/cat/useCreateCat'

// ── Mocks ──────────────────────────────────────────────────────────────────

const mockCreateMutationFn = vi.fn()
const mockRefetchQueries = vi.fn().mockResolvedValue([])
vi.mock('@apollo/client/react', () => ({
  useMutation: vi.fn(() => [mockCreateMutationFn, {}]),
  useApolloClient: vi.fn(() => ({ refetchQueries: mockRefetchQueries })),
}))

const mockUploadMediaAsync = vi.fn().mockResolvedValue({ success: true })
vi.mock('@tanstack/react-query', () => ({
  useMutation: vi.fn(() => ({
    mutateAsync: mockUploadMediaAsync,
    isPending: false,
  })),
}))

vi.mock('@/hooks/useAuthStore', () => ({
  useAuthStore: () => ({ token: 'test-token' }),
}))

// ── Fixtures ───────────────────────────────────────────────────────────────

const catInput = { name: 'Shadow', color: 'black', sourceName: 'Archive' }

const mockCreatedCat = {
  id: 'cat-new',
  name: 'Shadow',
  color: 'black',
  image: null,
  sourceName: 'Archive',
  category: null,
}

const successResult = {
  data: {
    createCat: { success: true, message: 'Created', data: mockCreatedCat },
  },
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('useCreateCat', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUploadMediaAsync.mockResolvedValue({ success: true })
    mockRefetchQueries.mockResolvedValue([])
  })

  it('returns true on successful cat creation without media', async () => {
    mockCreateMutationFn.mockResolvedValue(successResult)

    const { result } = renderHook(() => useCreateCat())
    let success: boolean
    await act(async () => {
      success = await result.current.createCat(catInput)
    })

    expect(success!).toBe(true)
    expect(result.current.error).toBeNull()
    expect(mockUploadMediaAsync).not.toHaveBeenCalled()
    expect(mockRefetchQueries).toHaveBeenCalledOnce()
  })

  it('returns true and uploads media when a file is provided', async () => {
    mockCreateMutationFn.mockResolvedValue(successResult)
    const file = new File(['data'], 'cat.jpg', { type: 'image/jpeg' })

    const { result } = renderHook(() => useCreateCat())
    let success: boolean
    await act(async () => {
      success = await result.current.createCat(catInput, file)
    })

    expect(success!).toBe(true)
    expect(mockUploadMediaAsync).toHaveBeenCalledWith({
      catId: 'cat-new',
      file,
    })
  })

  it('returns false and sets error when the mutation returns success: false', async () => {
    mockCreateMutationFn.mockResolvedValue({
      data: { createCat: { success: false, message: 'Forbidden', data: null } },
    })

    const { result } = renderHook(() => useCreateCat())
    let success: boolean
    await act(async () => {
      success = await result.current.createCat(catInput)
    })

    expect(success!).toBe(false)
    expect(result.current.error).toBe('Forbidden')
    expect(mockRefetchQueries).not.toHaveBeenCalled()
  })

  it('returns false and sets error when the mutation throws', async () => {
    mockCreateMutationFn.mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useCreateCat())
    let success: boolean
    await act(async () => {
      success = await result.current.createCat(catInput)
    })

    expect(success!).toBe(false)
    expect(result.current.error).toBe('Network error')
  })

  it('returns false and sets error when media upload fails', async () => {
    mockCreateMutationFn.mockResolvedValue(successResult)
    mockUploadMediaAsync.mockRejectedValue(new Error('Upload failed'))
    const file = new File(['data'], 'cat.jpg', { type: 'image/jpeg' })

    const { result } = renderHook(() => useCreateCat())
    let success: boolean
    await act(async () => {
      success = await result.current.createCat(catInput, file)
    })

    expect(success!).toBe(false)
    expect(result.current.error).toBe('Upload failed')
  })
})
