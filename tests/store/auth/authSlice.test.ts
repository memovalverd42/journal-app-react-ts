/* eslint-disable no-undef */

import { UnknownAction } from "@reduxjs/toolkit";
import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth";
import { authenticatedState, checkingState, demoUser, demoUserWithError, notAuthenticatedState } from '../../fixtures/authFixtures';


describe('Pruebas del authSlice', () => {
  
  test('debe de regresar el estado checking y llamarse auth', () => {
  
    
    const state = authSlice.reducer( checkingState, {} as UnknownAction );
    
    expect( authSlice.name ).toBe('auth');
    expect( state ).toEqual( checkingState );
    
  });
  
  test('debe de realizar la autenticación', () => {
    
    const state = authSlice.reducer( checkingState, login( demoUser ) );

    expect( state ).toEqual({
      status: 'authenticated',
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: demoUser.message,
    });

  });

  test('debe de realizar la autenticación y mandar error de credenciales', () => {
    
    const state = authSlice.reducer( checkingState, login( demoUserWithError ) );
    
    expect( state.errorMessage ).toBe( demoUserWithError.message );

  });

  test('debe de realizar el logout', () => {
    
    const state = authSlice.reducer( authenticatedState, logout() );
    expect( state ).toEqual( notAuthenticatedState );

  });

  test('debe de cambiar el estado a checking', () => {
    
    const state = authSlice.reducer( checkingState, checkingCredentials() );

    expect( state.status ).toEqual( 'cheking' );

  });

});