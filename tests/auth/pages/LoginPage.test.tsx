import React from 'react';
// eslint-disable-next-line no-redeclare
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { notAuthenticatedState } from '../../fixtures/authFixtures';
import { authSlice } from '../../../src/store/auth';
// import { useAppDispatch } from '../../../src/hooks';
// import { useAppDispatch } from '../../../src/hooks/useTypeSelector';
// import { startGoogleSignInAction, startLoginWithEmailAndPasswordAction } from '../../../src/store/auth/thunks';

const mockStartGoogleSignInAction = jest.fn();
const mockStartLoginWithEmailAndPasswordAction = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleSignInAction: () => mockStartGoogleSignInAction,
  startLoginWithEmailAndPasswordAction: ({ email, password }) => {
    return () => mockStartLoginWithEmailAndPasswordAction({ email, password });
  }
}));

jest.mock('../../../src/hooks/useTypeSelector', () => ({
  ...jest.requireActual('../../../src/hooks/useTypeSelector'),
  useAppDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState
  }
});

describe('Pruebas en el componente <LoginPage />', () => {

  beforeEach(() => jest.clearAllMocks());
  
  test('debe de renderizar el componente correctamente', () => {
    
    render(
      <Provider store={ store } >
        <MemoryRouter>
          <LoginPage/>
        </MemoryRouter>
      </Provider>
    );

    // screen.debug();

    expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);

  });

  test('boton de google debe de llamar la accion de startGoogleSignInAction', () => {
    
    render(
      <Provider store={ store } >
        <MemoryRouter>
          <LoginPage/>
        </MemoryRouter>
      </Provider>
    );

    // screen.debug();

    const googleButton = screen.getByLabelText<HTMLButtonElement>('google btn');
    // console.log(googleButton);

    fireEvent.click( googleButton );

    expect( mockStartGoogleSignInAction ).toHaveBeenCalled(); 

  });

  test('debe de llamar a startLoginWithEmailAndPasswordAction', () => {

    const email = 'example@gmail.com';
    const password = '123456';
    
    render(
      <Provider store={ store } >
        <MemoryRouter>
          <LoginPage/>
        </MemoryRouter>
      </Provider>
    );

    // screen.debug();

    const emailField = screen.getByRole<HTMLInputElement>('textbox', { name: 'Email' });
    const passwordField = screen.getByTestId('password');
    const loginForm = screen.getByLabelText('login-form');

    fireEvent.change( emailField, { target: { name: 'email', value: email } } );
    fireEvent.change( passwordField, { target: { value: password } } );
    fireEvent.submit( loginForm );

    
    // screen.debug();

    expect( mockStartLoginWithEmailAndPasswordAction ).toHaveBeenCalledWith({ email, password });

  });

});