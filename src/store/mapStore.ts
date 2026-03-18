import { create } from 'zustand';
import type { Place, PlaceCategory } from '@t/place';

type CategoryFilter = PlaceCategory | 'all';

interface MapStore {
  activeCategory: CategoryFilter;
  setActiveCategory: (category: CategoryFilter) => void;

  selectedPlace: Place | null;
  setSelectedPlace: (place: Place | null) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  activeCategory: 'all',
  setActiveCategory: (category) => set({ activeCategory: category }),

  selectedPlace: null,
  setSelectedPlace: (place) => set({ selectedPlace: place }),
}));
