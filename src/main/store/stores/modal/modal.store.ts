import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const modalStore = createSlice({
  name: "modal",
  initialState: "",
  reducers: {
    setGlobalModal(_state, action: PayloadAction<string>) {
      return action.payload;
    },
    invalidateModal() {
      return "";
    },
  },
});

export default modalStore;

export const { setGlobalModal, invalidateModal } = modalStore.actions;
