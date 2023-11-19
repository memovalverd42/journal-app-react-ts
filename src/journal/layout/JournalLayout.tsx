import { Box, Toolbar } from "@mui/material"
import { FC } from "react"
import { Navbar, SideBar } from "../components"

interface JournalLayoutProps {
    children: JSX.Element | JSX.Element[]
}

const drawerWidth = 240;

export const JournalLayout: FC<JournalLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }} >

        {/* Navbar */}
        <Navbar drawerWidth={drawerWidth} />

        {/* Sidebar */}
        <SideBar drawerWidth={drawerWidth} />

        <Box 
            component='main'
            sx={{ flexGrow: 1, p: 3 }}
        >
          <Toolbar></Toolbar>

            { children }
        </Box>

    </Box>
  )
}
