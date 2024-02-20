import { IconButton } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { AddOutlined } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { startCreateNewNote } from '../../store/journal';

export const JournalPage = () => {

  const dispatch = useAppDispatch();
  const { isSaving, active } = useAppSelector( state => state.journal );

  const onAddNewNoteClick = () => {
    dispatch( startCreateNewNote() );
  }

  return (
    <JournalLayout>
        {
          active
          ? <NoteView/>
          : <NothingSelectedView/>
        }

        <IconButton
          size='large'
          sx={{
            color: 'white',
            backgroundColor: 'error.main',
            ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
            position: 'fixed',
            right: 50,
            bottom: 50
          }}
          disabled={ isSaving }
          onClick={ onAddNewNoteClick }
        >
          <AddOutlined sx={{ fontSize: 30 }} />
        </IconButton>
    </JournalLayout>
  )
}
