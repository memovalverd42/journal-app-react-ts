import { User, onAuthStateChanged } from "firebase/auth";
import { useAppDispatch, useAppSelector } from ".";
import { FirebaseAuth } from "../firebase/config";
import { useEffect } from "react";
import { login, logout } from "../store/auth";

export const useCheckAuth = () => {

  const { status } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {

    onAuthStateChanged(FirebaseAuth, async(user: User | null) => {
      if( !user ) return dispatch( logout() );
      const { displayName, email, photoURL, uid } = user;

      dispatch( login({
        ok: true,
        displayName: displayName!,
        email: email!,
        photoURL: photoURL!,
        uid: uid!
      }));
    });
    
  });

  return status;

}