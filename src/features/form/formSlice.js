import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    forms: [], // Alterar para uma lista de formulários
  },
  reducers: {
    addFormData: (state, action) => {
      state.forms.push(action.payload); // Adicionar novo formulário à lista
    },
    clearFormData: (state) => {
      state.forms = []; // Limpar a lista de formulários
    },
  },
});

export const { addFormData, clearFormData } = formSlice.actions;
export default formSlice.reducer;