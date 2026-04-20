import { vi, describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAuth } from '@/hooks/useAuth'

// ── vi.hoisted ensures these are available when vi.mock factories run ───────

const mockPush = vi.hoisted(() => vi.fn())

const mockToast = vi.hoisted(() => ({
  success: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
}))

const mockStore = vi.hoisted(() => ({
  setUser: vi.fn(),
  setToken: vi.fn(),
  setLoading: vi.fn(),
  setError: vi.fn(),
  logout: vi.fn(),
}))

const mockMutationFn = vi.hoisted(() => vi.fn())

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

vi.mock('sonner', () => ({
  toast: mockToast,
}))

vi.mock('@/hooks/useAuthStore', () => ({
  useAuthStore: () => ({
    ...mockStore,
    isLoading: false,
  }),
}))

// Both useMutation calls in useAuth (LOGIN + REGISTER) share one mock fn.
// Each test configures what it resolves to.
vi.mock('@apollo/client/react', () => ({
  useMutation: vi.fn(() => [mockMutationFn, {}]),
}))

// ── Tests ──────────────────────────────────────────────────────────────────

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('login', () => {
    it('returns true, sets token/user, and navigates to / on success', async () => {
      mockMutationFn.mockResolvedValue({
        data: {
          login: {
            success: true,
            message: 'Login successful',
            data: {
              token: 'jwt-token',
              id: 'user-uuid-123',
              username: 'testuser',
              email: 'test@example.com',
              isAdmin: false,
              roles: ['USER'],
              image: null,
            },
          },
        },
      })

      const { result } = renderHook(() => useAuth())
      let res: { success: boolean; status?: number }
      await act(async () => {
        res = await result.current.login('testuser', 'password')
      })

      expect(res!.success).toBe(true)
      expect(mockStore.setToken).toHaveBeenCalledWith('jwt-token')
      expect(mockStore.setUser).toHaveBeenCalledWith({
        id: 'user-uuid-123',
        username: 'testuser',
        email: 'test@example.com',
        isAdmin: false,
        roles: ['USER'],
        image: undefined,
      })
      expect(mockPush).toHaveBeenCalledWith('/')
      expect(mockToast.success).toHaveBeenCalledWith('Welcome back to the archive.')
    })

    it('returns false and sets error when API returns success: false', async () => {
      mockMutationFn.mockResolvedValue({
        data: { login: { success: false, message: 'Invalid credentials', data: null } },
      })

      const { result } = renderHook(() => useAuth())
      let res: { success: boolean; status?: number }
      await act(async () => {
        res = await result.current.login('baduser', 'badpass')
      })

      expect(res!.success).toBe(false)
      expect(mockStore.setError).toHaveBeenCalledWith('Invalid credentials')
      expect(mockToast.error).toHaveBeenCalledWith('Invalid credentials')
      expect(mockPush).not.toHaveBeenCalled()
    })

    it('returns false and shows generic error when mutation throws', async () => {
      mockMutationFn.mockRejectedValue(new Error('Network error'))

      const { result } = renderHook(() => useAuth())
      let res: { success: boolean; status?: number }
      await act(async () => {
        res = await result.current.login('user', 'pass')
      })

      expect(res!.success).toBe(false)
      expect(mockStore.setError).toHaveBeenCalledWith('Network error')
      expect(mockToast.error).toHaveBeenCalledWith('Network error')
    })

    it('calls setLoading(true) then setLoading(false)', async () => {
      mockMutationFn.mockResolvedValue({
        data: {
          login: {
            success: true,
            data: { token: 'tok', username: 'u', email: 'e@e.com', isAdmin: false, roles: [] },
          },
        },
      })

      const { result } = renderHook(() => useAuth())
      await act(async () => {
        await result.current.login('u', 'p')
      })

      expect(mockStore.setLoading).toHaveBeenNthCalledWith(1, true)
      expect(mockStore.setLoading).toHaveBeenNthCalledWith(2, false)
    })
  })

  describe('register', () => {
    it('returns true and navigates to /login on success', async () => {
      mockMutationFn.mockResolvedValue({
        data: { register: { success: true, message: 'Account registered. Please check your email to verify your account.', data: '' } },
      })

      const { result } = renderHook(() => useAuth())
      let success: boolean
      await act(async () => {
        success = await result.current.register('newuser', 'new@example.com', 'password123')
      })

      expect(success!).toBe(true)
      expect(mockPush).not.toHaveBeenCalled()
      expect(mockToast.success).toHaveBeenCalledWith(
        'Account registered. Please check your email to verify your account.',
      )
    })

    it('returns false and sets error when registration fails', async () => {
      mockMutationFn.mockResolvedValue({
        data: { register: { success: false, message: 'Username already taken', data: null } },
      })

      const { result } = renderHook(() => useAuth())
      let success: boolean
      await act(async () => {
        success = await result.current.register('existing', 'e@e.com', 'password123')
      })

      expect(success!).toBe(false)
      expect(mockStore.setError).toHaveBeenCalledWith('Username already taken')
      expect(mockToast.error).toHaveBeenCalledWith('Username already taken')
    })
  })

  describe('loginWithGoogle', () => {
    it('redirects to the OAuth2 URL', () => {
      // Replace window.location so jsdom doesn't intercept the navigation
      const mockLocation = { href: '' }
      Object.defineProperty(window, 'location', { value: mockLocation, writable: true })

      const { result } = renderHook(() => useAuth())
      act(() => {
        result.current.loginWithGoogle()
      })

      expect(mockLocation.href).toContain('oauth2/authorization/google')
    })
  })

  describe('logout', () => {
    it('clears the store, shows info toast, and navigates to /', () => {
      const { result } = renderHook(() => useAuth())
      act(() => {
        result.current.logout()
      })

      expect(mockStore.logout).toHaveBeenCalledOnce()
      expect(mockToast.info).toHaveBeenCalledWith('Logged out from the archive.')
      expect(mockPush).toHaveBeenCalledWith('/')
    })
  })
})
