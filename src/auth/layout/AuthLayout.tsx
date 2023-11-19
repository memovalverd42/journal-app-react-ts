import { Grid, Typography } from "@mui/material"
import { FC } from "react"

interface AuthLayoutProps {
    children: JSX.Element | JSX.Element[]
    title: string
}

export const AuthLayout: FC<AuthLayoutProps> = ( {children, title} ) => {
  return (
    <Grid 
        container 
        spacing={ 0 }
        direction="column"
        alignItems="center"  
        justifyContent="center"
        sx={{ minHeight: '100vh', backgroundColor: 'primary.main', p: 4 }}
    >
        <Grid item
            className="box-shadow"
            xs={ 3 }
            sx={{ 
                width: { md: 450 },
                backgroundColor: 'white', 
                padding: 3, 
                borderRadius: 2,
            }}
        >
            <Typography variant="h5" sx={{ mb: 1 }}>{ title }</Typography>

            { children }

        </Grid>
    </Grid>
  )
}
