import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { startCreateNewNote, startDeletingNote, startLoadingNotes, startSaveNote, startUploadingFiles } from '.';

export interface Note {
  id?: string;
  title: string;
  body: string;
  date: number;
  imageUrls?: string[];
}

export interface JournalState {
  isSaving: boolean;
  messageSaved: string;
  notes: Note[];
  active: Note | null;
}

const initialState: JournalState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: null,
}


export const journalSlice = createSlice({
  name: 'jorunal',
  initialState,
  reducers: {
    closeNote: ( state ) => {
      state.active = null;
    },
    setNoteAsActive: ( state, { payload }: PayloadAction<Note>) => {
      state.active = payload;
      state.messageSaved = '';
    },
    clearNotesOnLogout: ( state ) => {
      state.notes = [];
      state.active = null;
    }
  },
  extraReducers: ( builder ) => {
    builder
      .addCase( startCreateNewNote.pending, ( state ) => {
        state.isSaving = true;
      })
      .addCase( startCreateNewNote.fulfilled, ( state, { payload }) => {
        state.isSaving = false;
        state.active = payload;
        state.notes.push( payload );
      })

      .addCase( startLoadingNotes.fulfilled, ( state, { payload }) => {
        state.notes = payload;
      })

      .addCase( startSaveNote.pending, ( state ) => {
        state.isSaving = true;
        state.messageSaved = '';
      })
      .addCase( startSaveNote.fulfilled, ( state ) => {
        state.isSaving = false;
        const activeNote = state.active;
        state.notes = state.notes.map( note => note.id === activeNote?.id ? activeNote! : note);
        state.messageSaved = `${ activeNote?.title } actualizada correctamente`;
      })
      .addCase( startSaveNote.rejected, ( state ) => {
        state.isSaving = false;
        state.messageSaved = 'Error al guardar la nota';
      })

      .addCase( startUploadingFiles.pending, ( state ) => {
        state.isSaving = true;
      })
      .addCase( startUploadingFiles.fulfilled, ( state, { payload }) => {
        state.isSaving = false;
        const lastUrls = state.active?.imageUrls;
        state.active!.imageUrls = lastUrls ? [ ...lastUrls, ...payload ] : payload;
      })

      .addCase(startDeletingNote.fulfilled, ( state ) => {
        state.notes = state.notes.filter( note => note.id !== state.active?.id );
        state.active = null;
      })
  }
})

export const { closeNote, setNoteAsActive, clearNotesOnLogout } = journalSlice.actions;