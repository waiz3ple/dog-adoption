import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesStore {
  favorites: string[];
  addFavorite: (dogId: string) => void;
  removeFavorite: (dogId: string) => void;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (dogId) => set((state) => ({ favorites: [...state.favorites, dogId] })),
      removeFavorite: (dogId) => set((state) => ({ favorites: state.favorites.filter((id) => id !== dogId) })),
      clearFavorites: () => set({ favorites: [] }),
    }),
    { name: 'favorites-storage' }
  )
);