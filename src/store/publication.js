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
  removePublication: (url) => {
    set((state) => ({
      publication: state.publication.filter(item => item.urlVideo !== url)
    }));
  },
}))


export default useStore;