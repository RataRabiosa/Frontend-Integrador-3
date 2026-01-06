
import { create } from "zustand";

export const manageDrawer = create((set) => ({
  checked: false,

  toggle: () =>
    set((state) => ({
      checked: !state.checked
    })),

  setChecked: (value) => set({ checked: value }),
}));


export default manageDrawer