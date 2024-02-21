import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  startCreateUserWithEmailAndPasswordAction,
  startGoogleSignInAction,
  startLoginWithEmailAndPasswordAction,
  startLogoutAction,
} from ".";
import { UserCredentialsGoogleResponse } from "../../firebase/providers";


export interface AuthState {
  status: "cheking" | "not-authenticated" | "authenticated";
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  errorMessage: string | null;
}

const initialState: AuthState = {
  status: "cheking",
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkingCredentials: (state) => {
      state.status = "cheking";
    },
    login: (
      state,
      { payload }: PayloadAction<UserCredentialsGoogleResponse>
    ) => {
      state.status = "authenticated";
      state.uid = payload.uid!;
      state.email = payload.email!;
      state.displayName = payload.displayName!;
      state.photoURL = payload.photoURL!;
      state.errorMessage = payload.message!;
    },
    logout: ( state ) => {
      state.status = "not-authenticated";
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startGoogleSignInAction.pending, (state) => {
        state.status = "cheking";
      })
      .addCase(startGoogleSignInAction.fulfilled, (state, { payload }) => {
        state.status = "authenticated";
        state.uid = payload.uid!;
        state.email = payload.email!;
        state.displayName = payload.displayName!;
        state.photoURL = payload.photoURL!;
        state.errorMessage = null;
      })
      .addCase(startGoogleSignInAction.rejected, (state, payload) => {
        state.status = "not-authenticated";
        state.errorMessage = payload.error.message!;
      })
      .addCase(startCreateUserWithEmailAndPasswordAction.pending, (state) => {
        state.status = "cheking";
      })
      .addCase(
        startCreateUserWithEmailAndPasswordAction.fulfilled,
        (state, payload) => {
          state.status = "authenticated";
          state.uid = payload.payload.uid!;
          state.email = payload.payload.email!;
          state.displayName = payload.payload.displayName!;
          state.photoURL = payload.payload.photoURL!;
          state.errorMessage = null;
        }
      )
      .addCase(
        startCreateUserWithEmailAndPasswordAction.rejected,
        (state, payload) => {
          state.status = "not-authenticated";
          state.errorMessage = payload.error.message!;
        }
      )
      .addCase(startLoginWithEmailAndPasswordAction.pending, (state) => {
        state.status = "cheking";
      })
      .addCase(
        startLoginWithEmailAndPasswordAction.fulfilled,
        (state, payload) => {
          state.status = "authenticated";
          state.uid = payload.payload.uid!;
          state.email = payload.payload.email!;
          state.displayName = payload.payload.displayName!;
          state.photoURL = payload.payload.photoURL!;
          state.errorMessage = null;
        }
      )
      .addCase(
        startLoginWithEmailAndPasswordAction.rejected,
        (state, payload) => {
          state.status = "not-authenticated";
          state.errorMessage = payload.error.message!;
        }
      )
      .addCase(startLogoutAction.fulfilled, ( state ) => {
        state.status = "not-authenticated";
        state.uid = null;
        state.email = null;
        state.displayName = null;
        state.photoURL = null;
        state.errorMessage = null;
      })
  },
});

export const { checkingCredentials, login, logout } = authSlice.actions;
