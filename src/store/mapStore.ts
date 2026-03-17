import { create } from 'zustand';
import type { Place, PlaceCategory } from '@t/place';

type CategoryFilter = PlaceCategory | 'all';

interface MapStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  activeCategory: CategoryFilter;
  setActiveCategory: (category: CategoryFilter) => void;

  selectedPlace: Place | null;
  setSelectedPlace: (place: Place | null) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  activeCategory: 'all',
  setActiveCategory: (category) => set({ activeCategory: category }),

  selectedPlace: null,
  setSelectedPlace: (place) => set({ selectedPlace: place }),
}));
