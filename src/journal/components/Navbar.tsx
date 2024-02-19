import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { FC } from "react";
import { useAppDispatch } from "../../hooks";
import { startLogoutAction } from "../../store/auth";

interface NavbarProps {
  drawerWidth: number;
}

export const Navbar: FC<NavbarProps> = ({ drawerWidth }) => {

  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch( startLogoutAction() );
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div">
            JournalApp
          </Typography>
          <IconButton color="error" onClick={ onLogout }>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
