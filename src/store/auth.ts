import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axiosClient from '../api/clients/axiosClient';

interface AuthState {
  isAuthenticated: boolean;
  checkAuth: () => Promise<void>;
  login: (credentials: { name: string; email: string }) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      checkAuth: async () => {
        try {
          await axiosClient.get('/dogs/breeds');
          set({ isAuthenticated: true });
        } catch (error) {
          set({ isAuthenticated: false });
        }
      },
      login: async (credentials: { name: string; email: string }) => {
        await axiosClient.post('/auth/login', credentials);
        set({ isAuthenticated: true });
      },
      logout: async () => {
        await axiosClient.post('/auth/logout');
        set({ isAuthenticated: false });
      },
    }),
    { name: 'auth-storage', partialize: (state) => ({ isAuthenticated: state.isAuthenticated }) }
  )
);