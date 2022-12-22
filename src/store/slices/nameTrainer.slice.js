import { createSlice } from "@reduxjs/toolkit";

const nameTrainerSlice = createSlice({
    name: 'nameTrainer',
    initialState: localStorage.getItem('nameTrainer') ?? '',
    //Reducers son acciones
    reducers: {
        setNameTrainerGloba: (state, action) => action.payload
    }   
});

export const {setNameTrainerGloba} = nameTrainerSlice.actions;

export default nameTrainerSlice.reducer