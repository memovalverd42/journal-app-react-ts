import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Note, setNoteAsActive } from "../../store/journal";
import { useMemo } from "react";
import { useAppDispatch } from "../../hooks";

export const SideBarItem = (note: Note) => {

  const { title, body } = note;

  const dispatch = useAppDispatch();

  const newTitle = useMemo(() => {
    return title.length > 20 
              ? title.slice(0, 17) + '...' 
              : title;
  }, [title]);

  const newBody = useMemo(() => {
    return body.length > 30 
              ? body.slice(0, 40) + '...' 
              : body;
  }, [body]);

  const onNoteClick = () => {
    dispatch( setNoteAsActive( note ) );
  }
  
  return (
    <>
      <ListItem disablePadding onClick={ onNoteClick }>
        <ListItemButton>
          <ListItemIcon>
            <TurnedInNot />
          </ListItemIcon>
          <Grid container>
            <ListItemText primary={ newTitle } />
            <ListItemText secondary={ newBody } />
          </Grid>
        </ListItemButton>
      </ListItem>
    </>
  )
}
