import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Note } from ".";
import { doc, setDoc, collection, deleteDoc } from "firebase/firestore";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helper";


// export const startNewNote = () => {

//   return async ( dispatch: Dispatch<UnknownAction>, getState: () => unknown ) => {
//     dispatch( closeNote() );

//     const state = getState() as RootState;
//     const uid = state .auth.uid;
//   }

// }

export const startLoadingNotes = createAsyncThunk(
  'journal/startLoadingNotes',
  async(_, { getState }) => {
    
    const state = getState() as RootState;
    const uid = state.auth.uid;

    if ( !uid ) throw new Error('El UID no existe o es incorrecto');

    return await loadNotes( uid );
    // return await collection( FirebaseDB, `${uid}/journal/notes` );
  }
);

export const startCreateNewNote = createAsyncThunk(
  'journal/startCreateNewNote',
  async(_, { getState }) => {
    const state = getState() as RootState;
    const uid = state.auth.uid;

    const newNote: Note = {
      title: "",
      body: "",
      date: new Date().getTime(),
    }

    const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ) );
    
    // await setDoc( newDoc, newNote );
    // para los tests
    setDoc( newDoc, newNote );

    newNote.id = newDoc.id;

    return newNote;
  }
);


export const startSaveNote = createAsyncThunk(
  'journal/startSaveNote',
  async( _, { getState }) => {
    const state = getState() as RootState;
    const uid = state.auth.uid;
    const note = state.journal.active;

    const noteToSave = { ...note };
    delete noteToSave?.id;

    const noteDoc = doc( FirebaseDB, `${uid}/journal/notes/${ note?.id }` );
    await setDoc( noteDoc, noteToSave, { merge: true } );
  }
);


export const startUploadingFiles = createAsyncThunk(
  'journal/startUploadingFiles',
  async( files: FileList) => {

    const fileUploadPromises: Promise<string>[] = [];
    for (let i = 0; i < files.length; i++) {
      fileUploadPromises.push( fileUpload( files[i] ) );
    }

    const photosUrls = await Promise.all( fileUploadPromises );

    return photosUrls;

  }
);

export const startDeletingNote = createAsyncThunk(
  'journal/startDeletingNote',
  async( _, { getState } ) => {

    const state = getState() as RootState;
    const uid = state.auth.uid;
    const noteId = state.journal.active?.id;

    const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ noteId }` );
    await deleteDoc( docRef );

  }
);