import { createAsyncThunk } from '@reduxjs/toolkit';
import { logoutFirebase, registerWithEmail, signInWithGoogle, singInWithEmailAndPassword } from '../../firebase/providers';
import { LoginData, RegisterData } from '../../auth/types/types';

interface AuthenticationPayload {
  email: string;
  password: string;
}
  
export const chekingAuthenticationAction = createAsyncThunk(
    'auth/chekingAuthentication',
    async ( payload: AuthenticationPayload ) => {
      console.log(payload);
    }
)

export const startGoogleSignInAction = createAsyncThunk(
    'auth/startGoogleSignIn',
    async () => {
      const response = await signInWithGoogle();
      return response;
    }
);

export const startCreateUserWithEmailAndPasswordAction = createAsyncThunk(
  'auth/startCreateUserWithEmailAndPasswordAction',
  async ( payload: RegisterData ) => {
    const response = await registerWithEmail( payload );
    return response;
  }
);

export const startLoginWithEmailAndPasswordAction = createAsyncThunk(
  'auth/startLoginWithEmailAndPasswordAction',
  async ( payload: LoginData ) => {
    const response = await singInWithEmailAndPassword( payload );
    return response;
  } 
);

export const startLogoutAction = createAsyncThunk(

  'auth/startLogoutAction',
  async () => {
    await logoutFirebase();
  }

);