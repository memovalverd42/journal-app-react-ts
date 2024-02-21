import { AsyncThunkAction, Dispatch } from "@reduxjs/toolkit";
import { chekingAuthenticationAction } from "../../../src/store/auth/thunks";
import { checkingCredentials, startGoogleSignInAction, startLoginWithEmailAndPasswordAction, startLogoutAction } from "../../../src/store/auth";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { logoutFirebase, signInWithGoogle, singInWithEmailAndPassword } from "../../../src/firebase/providers";
import { demoUser } from "../../fixtures/authFixtures";
import { store } from "../../../src/store";
import { clearNotesOnLogout } from "../../../src/store/journal";

jest.mock("../../../src/firebase/providers");

describe('Pruebas sobre thunks de auth', () => {
    
    let dispatch: Dispatch;        // Create the "spy" properties
    let getState: () => unknown;
    // let arg: IRegisterProps;
    // let result: IAuthSuccess;
    
    beforeEach(() => {
      dispatch = jest.fn();
      getState = jest.fn();
      // api.register.mockClear();
      // api.register.mockResolvedValue(result);
      // arg = { email: 'me@myemail.com', password: 'yeetmageet123' };
      // result = { accessToken: 'access token', refreshToken: 'refresh token' };
    });
    
    test('debe de invocar el checkingCredentials', async () => {
      let action: AsyncThunkAction<void, void, AsyncThunkConfig>;
      action = chekingAuthenticationAction();
      await action(dispatch, getState, undefined);
      expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    });

    test('startGoogleSignInAction debe de pasar por pending', async() => {

      // Configurar el mock de signInWithGoogle
      (signInWithGoogle as jest.Mock).mockResolvedValueOnce(demoUser);
      
      // Ejecutar el thunk
      await startGoogleSignInAction()(dispatch, getState, undefined);
      
      // Primero que se dispare el pending
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'auth/startGoogleSignIn/pending' })
      );
      
      // Luego que se dispare el fulfilled
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'auth/startGoogleSignIn/fulfilled' })
        );
        
        // verificar que devuelva el usuario esperado
        expect( dispatch ).toHaveBeenCalledWith( 
          expect.objectContaining({payload: demoUser})
          );
          
    });
        
      test('startGoogleSignInAction debe de pasar por pending y mandar error', async() => {
          
        // Configurar el mock de signInWithGoogle
        (signInWithGoogle as jest.Mock).mockRejectedValueOnce("error de autentificacion");
          
        // Ejecutar el thunk
        await startGoogleSignInAction()(dispatch, getState, undefined);

        expect(dispatch).toHaveBeenCalledWith(
          expect.objectContaining({ type: 'auth/startGoogleSignIn/pending' })
        );

        // Primero que se dispare el rejected
        expect(dispatch).toHaveBeenCalledWith(
          expect.objectContaining({ type: 'auth/startGoogleSignIn/rejected' })
        );
               
      });
          
    test('debe cambiar el status a cheking mientras se realiza la operación', async () => {

      (signInWithGoogle as jest.Mock).mockResolvedValueOnce(demoUser);
      store.dispatch(startGoogleSignInAction());
      
      const state = store.getState();
      expect(state.auth.status).toBe('cheking');
      
      // Esperar a que la promesa se resuelva
      (signInWithGoogle as jest.Mock).mockResolvedValueOnce(demoUser);
      await startGoogleSignInAction()(store.dispatch, store.getState, undefined);

      // Verificar si el estado cambia a 'authenticated'
      const state2 = store.getState();
      expect(state2.auth.status).toBe('authenticated');

    });


    test('startLoginWithEmailAndPassword debe de pasar por pending y login exitoso', async() => {
      
      // Configurar el mock de signInWithGoogle
      (singInWithEmailAndPassword as jest.Mock).mockResolvedValue( demoUser );

      const loginData = {
        email: 'example.test@gmail.com',
        password: 'password',
      }
      
      // Ejecutar el thunk
      await startLoginWithEmailAndPasswordAction( loginData )(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'auth/startLoginWithEmailAndPasswordAction/pending' })
      );

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'auth/startLoginWithEmailAndPasswordAction/fulfilled' })
      );

    });

    test('startLogout debe de llamar a logoutFirebase, clearNotes y logout', async() => {
      
      // Configurar el mock de signInWithGoogle
      (singInWithEmailAndPassword as jest.Mock).mockResolvedValue( demoUser );

      await startLogoutAction()(dispatch, getState, undefined);

      expect( logoutFirebase ).toHaveBeenCalled();

      expect( dispatch ).toHaveBeenCalledWith( clearNotesOnLogout() );

    });

});