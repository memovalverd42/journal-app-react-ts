import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { FC } from 'react';
import { purpleTheme } from '.';

interface AppThemeProps {
    children: JSX.Element | JSX.Element[]
}

export const AppTheme: FC<AppThemeProps> = ( {children} ) => {
  return (
    <ThemeProvider theme={ purpleTheme } >
        <CssBaseline />
        { children }
    </ThemeProvider>
  )
}
