import { UserCredentialsGoogleResponse } from "../../src/firebase/providers";
import { AuthState } from "../../src/store/auth";

export const checkingState: AuthState = {
  status: "cheking",
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authenticatedState: AuthState = {
  status: "authenticated",
  uid: "45 34t24trtreg234",
  email: 'example.test@gmail.com',
  displayName: 'Example Test',
  photoURL: 'https://www.example.com/image.jpg',
  errorMessage: null,
};

export const notAuthenticatedState: AuthState = {
  status: "not-authenticated",
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const demoUser: UserCredentialsGoogleResponse = {
  displayName: 'Example Test',
  email: 'example.test@gmail.com',
  photoURL: 'https://www.example.com/image.jpg',
  uid: "45 34t24trtreg234",
  message: null,
}

export const demoUserWithError: UserCredentialsGoogleResponse = {
  message: 'Credential error',
}