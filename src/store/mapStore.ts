import { create } from 'zustand';
import type { Place, PlaceCategory } from '@t/place';

interface MapStore {
  activeCategory: PlaceCategory | null;
  setActiveCategory: (category: PlaceCategory | null) => void;

  selectedPlace: Place | null;
  setSelectedPlace: (place: Place | null) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  activeCategory: null,
  setActiveCategory: (category) => set({ activeCategory: category }),

  selectedPlace: null,
  setSelectedPlace: (place) => set({ selectedPlace: place }),
}));
