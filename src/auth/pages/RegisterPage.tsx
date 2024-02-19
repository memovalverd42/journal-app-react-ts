import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useAppDispatch, useAppSelector, useForm } from "../../hooks";
import { FormEvent, useMemo, useState } from "react";
import { FormValidations } from '../../hooks/useForm';
import { RegisterData } from "../types/types";
import { startCreateUserWithEmailAndPasswordAction } from "../../store/auth";

const formData: RegisterData = {
  displayName: '',
  email: '',
  password: ''
}

const formValidations: FormValidations<RegisterData> = {
  email: [(value: string) => value.includes('@'), 'Email must have an @ at least'],
  password: [(value: string) => value.length >= 6, 'Password must be longer than 6 characters'],
  displayName: [(value: string) => value.length >= 1, 'Name is Required'],
};

export const RegisterPage = () => {

  const dispatch = useAppDispatch();
  const [formSubmited, setFormSubmited] = useState<boolean>(false);

  const { status, errorMessage } = useAppSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'cheking', [status]);

  const {onInputChange, formState, displayName, email, password, formValidation, isFormValid
  } = useForm<RegisterData>(formData, formValidations);

  const onSubmit = ( event: FormEvent ) => {
    event.preventDefault();
    setFormSubmited(true);

    if ( !isFormValid && !isCheckingAuthentication ) return;

    dispatch( startCreateUserWithEmailAndPasswordAction( formState ) );
  }

  return (
    <AuthLayout title="Register">
      <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Full Name"
              type="text"
              placeholder="Your Name"
              fullWidth

              name="displayName"
              value={ displayName }
              onChange={ onInputChange }

              error={ !!formValidation.displayNameValid && formSubmited }
              helperText={ formValidation.displayNameValid }
              />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="email@google.com"
              fullWidth
              
              name="email"
              value={ email }
              onChange={ onInputChange }

              error={ !!formValidation.emailValid && formSubmited  }
              helperText={ formValidation.emailValid }
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

              error={ !!formValidation.passwordValid && formSubmited  }
              helperText={ formValidation.passwordValid }
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
                variant="contained" 
                fullWidth
                type="submit"
                disabled={ isCheckingAuthentication }
              >
                Create account
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }} >Do you have an account already?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
