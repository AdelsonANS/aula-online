import { create } from 'zustand'

const useStore = create((set) => ({
  publication: [],
  addPublication: (publication) => {

    const publicationWithTime = {
      ...publication,
      time: new Date().toLocaleTimeString(),
    };
    set((state) => ( {publication: [...state.publication, publicationWithTime]} ))
  },
  removePublication: (index) => set({ publication: 0 }),
}))


export default useStore;