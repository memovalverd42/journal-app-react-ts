import { Link as RouterLink } from "react-router-dom";
import { FormEvent, useMemo } from "react";

import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";

import { useForm } from "../../hooks";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { startGoogleSignInAction, startLoginWithEmailAndPasswordAction } from "../../store/auth";
import { LoginData } from "../types/types";


const formData: LoginData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const dispatch = useAppDispatch();

  const { status, errorMessage } = useAppSelector(state => state.auth)

  const { email, password, onInputChange, formState } = useForm<LoginData>(formData);

  const isAuthenticating = useMemo( () => status === 'cheking', [status] );

  const onSubmit = ( event: FormEvent ) => {
    event.preventDefault();
    dispatch( startLoginWithEmailAndPasswordAction( formState ) );
  }
  
  const onGoogleSignIn = () => {
    dispatch(startGoogleSignInAction());
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="email@google.com"
              fullWidth

              name="email"
              value={ email }
              onChange={ onInputChange }
              />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="password"
              fullWidth

              name="password"
              value={ password }
              onChange={ onInputChange }
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

          <Grid 
              item 
              xs={12}
              display={ errorMessage ? '' : 'none'}
            >
              <Alert severity="error">{ errorMessage }</Alert>
            </Grid>


            <Grid item xs={12} sm={6}>
              <Button 
                disabled={ isAuthenticating }
                type="submit"  
                variant="contained" 
                fullWidth
                >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button 
                disabled={ isAuthenticating }
                variant="contained" 
                fullWidth
                onClick={ onGoogleSignIn }
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Create an account
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
