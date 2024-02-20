import {
  Box,
  Divider,
  Drawer,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useAppSelector } from "../../hooks";
import { SideBarItem } from ".";

interface SideBarProps {
  drawerWidth: number;
}

export const SideBar: FC<SideBarProps> = ({ drawerWidth }) => {

  const { displayName } = useAppSelector(state => state.auth);
  const { notes } = useAppSelector(state => state.journal);

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            { displayName ? displayName : "JournalApp" }
          </Typography>
        </Toolbar>
        <Divider />

        <List>
          {notes.map((note) => (
            <SideBarItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
