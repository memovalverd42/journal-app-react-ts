import { ChangeEvent, useEffect, useMemo, useRef } from "react";
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components";
import { useAppDispatch, useAppSelector, useForm } from "../../hooks";
import { Note, setNoteAsActive, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {

  const dispatch = useAppDispatch();
  const { active: activeNote, messageSaved, isSaving } = useAppSelector( state => state.journal );

  const { title, body, date, onInputChange, formState } = useForm<Note>( activeNote! );

  const dateString = useMemo(() => {
    const newDate = new Date( date );
    return newDate.toUTCString();
  }, [ date ])

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch( setNoteAsActive( formState ) );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ formState ])

  useEffect(() => {
    if ( messageSaved.length > 0) {
      Swal.fire({
        title: 'Nota actualizada',
        text: messageSaved,
        icon: 'success',
      })
    }
  }, [ messageSaved ])

  const onFileInputChange = ( { target }: ChangeEvent<HTMLInputElement> ) => {
    if ( target.files?.length === 0 ) return;
    dispatch( startUploadingFiles( target.files! ) );
  }

  const onDeleteClick = () => {
    dispatch( startDeletingNote() );
  }

  const onSaveClick = () => {
    dispatch( startSaveNote() );
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      sx={{ mb: 1 }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light" alignItems="center">
          { dateString }
        </Typography>
      </Grid>
      <Grid item>



        <input 
          type="file"
          multiple
          ref={ fileInputRef }
          onChange={ event => onFileInputChange(event) }
          style={{ display: "none" }}
        />

        <IconButton 
          color="primary"
          disabled={ isSaving }
          onClick={ () => fileInputRef.current?.click() }
        >
          <UploadOutlined/>
        </IconButton>

        <Button 
          color="primary" 
          sx={{ padding: 2 }}
          disabled={ isSaving }
          onClick={ onSaveClick }
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Enter a title"
          label="Title"
          sx={{ border: "none", mb: 1 }}

          name="title"
          value={ title }
          onChange={ onInputChange }
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="What happened today?"
          minRows={5}

          name="body"
          value={ body }
          onChange={ onInputChange }
        />
      </Grid>

      <Grid
          container
          justifyContent="end"
        >
          <Button
            color="error"
            disabled={ isSaving }
            onClick={ onDeleteClick }
            sx={{ mt: 2 }}
          >
            <DeleteOutline/>
          </Button>
      </Grid>

      {
        activeNote?.imageUrls?.length! > 0 && (
          <ImageGallery imageUrls={ activeNote?.imageUrls } />
        )
      }
    </Grid>
  );
};
