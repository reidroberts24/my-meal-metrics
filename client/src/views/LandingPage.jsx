import React from 'react';
import RegistrationForm from "../components/Registration";
import LoginForm from "../components/Login";
import { Container, Grid, Typography } from '@mui/material';

const LandingPage = () => {
  return (
    <Container>
      <Typography variant="h4" align="center" style={{ margin: '20px 0' }}>
        Welcome to MyMealMetrics!
      </Typography>
      <Grid container spacing={2} justifyContent="center" justifyItems="auto" style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={6}>
          <RegistrationForm />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LoginForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
