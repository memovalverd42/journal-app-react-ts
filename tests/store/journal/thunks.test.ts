import { Note, startCreateNewNote } from "../../../src/store/journal";

/* eslint-disable no-unused-vars */
describe('Pruebas en el journal Thunks', () => {
  
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach( () => jest.clearAllMocks() );

  test('startCreateNewNote debe de crear una nueva nota en blanco', async() => {
  
    const uid = 'sdfgwerttwef24rg2';
    getState.mockReturnValue({ auth: { uid: uid } });

    const response = await startCreateNewNote()(dispatch, getState, undefined);
    const note = (response.payload) as Note;

    expect( note.body ).toBeFalsy();
    expect( note.title ).toBeFalsy();
    expect( note.date ).toEqual( expect.any(Number) );
    expect( note.id ).toEqual( expect.any(String) );
    
  });

});