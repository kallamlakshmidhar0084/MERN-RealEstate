import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    singInSuccess: (state, action) => {
      state.loading = false;
      (state.currentUser = action.payload), (state.error = null);
      state.error=null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state ,action) => {
      state.loading = false;
      state.currentUser.data=action.payload;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart:(state)=>{
        state.loading=true;
    },
    deleteUserSuccess:(state)=>{
        state.currentUser=null;
        state.loading=false;
        state.error=null;
    },
    signOutUserStart: (state) => {
        state.loading = true;
      },
      signOutUserSuccess: (state ) => {
        state.loading = false;
        state.currentUser=null;
        state.error = null;
      },
      signOutUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    
    

  },
});

export const {
  signInStart,
  singInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
