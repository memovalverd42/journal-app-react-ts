import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";
// eslint-disable-next-line no-unused-vars
import { FirebaseError } from "firebase/app";
import { LoginData, RegisterData } from "../auth/types/types";

const googleProvider = new GoogleAuthProvider();

export interface UserCredentialsGoogleResponse {
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
  uid?: string | null;
  message?: string | null;
}

export const signInWithGoogle = async (): Promise<UserCredentialsGoogleResponse> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);

    const { displayName, email, photoURL, uid } = result.user;

    return {
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error: FirebaseError | any) {
    // console.log(error);
    throw error;
  }
};

export const registerWithEmail = async ({ email, password, displayName: name }: RegisterData): Promise<UserCredentialsGoogleResponse> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
    const { email: userEmail, photoURL, uid } = response.user;
    
    await updateProfile( FirebaseAuth.currentUser!, { displayName: name } );
    
    return {
      displayName: FirebaseAuth.currentUser!.displayName!,
      email: userEmail,
      photoURL,
      uid,
    };
    
  } catch (error: FirebaseError | any) {
    // console.log(error);
    throw error;
  }
}

export const singInWithEmailAndPassword = async ( { email, password }: LoginData ): Promise<UserCredentialsGoogleResponse> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await signInWithEmailAndPassword( FirebaseAuth, email, password );

    return {
      displayName: response.user.displayName!,
      email: response.user.email!,
      photoURL: response.user.photoURL!,
      uid: response.user.uid!,
    }
  } catch(error: FirebaseError | any) {
    throw error;
  }
}

export const logoutFirebase = async() => {
  return await FirebaseAuth.signOut();
}
