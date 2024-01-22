// NutritionTargetsForm.jsx

import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button, Box, InputLabel } from '@mui/material';

const NutritionTargetsForm = ({ onSubmit }) => {
  const [userGoals, setUserGoals] = useState({
    dailyCalories: '',
    dailyProtein: '',
    dailyFat: '',
    dailyCarbs: ''
  });
  

  const handleChange = (e) => {
    setUserGoals({ ...userGoals, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userGoals);
    setUserGoals({
      dailyCalories: '',
      dailyProtein: '',
      dailyFat: '',
      dailyCarbs: ''
    });
  };
  
  return (
    <Box component="form" onSubmit={ handleSubmit }>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <InputLabel htmlFor="dailyCalories">Calories Goal</InputLabel>
        </Grid>
        <Grid item xs={8}>
          <TextField
            name="dailyCalories"
            margin="normal"
            fullWidth
            value={ userGoals.dailyCalories }
            onChange={handleChange} // Add onChange handler to update formValues
          />
        </Grid>

        <Grid item xs={4}>
          <InputLabel htmlFor="dailyProtein">Protein Goal</InputLabel>
        </Grid>
        <Grid item xs={8}>
          <TextField
            name="dailyProtein"
            margin="normal"
            fullWidth
            value={ userGoals.dailyProtein }
            onChange={handleChange} // Add onChange handler to update formValues
          />
        </Grid>
      
        <Grid item xs={4}>
          <InputLabel htmlFor="dailyFat">Fat Goal</InputLabel>
        </Grid>
        <Grid item xs={8}>
          <TextField
            name="dailyFat"
            margin="normal"
            fullWidth
            value={ userGoals.dailyFat }
            onChange={handleChange} // Add onChange handler to update formValues
          />
        </Grid>

        <Grid item xs={4}>
          <InputLabel htmlFor="dailyCarbs">Carbs Goal</InputLabel>
        </Grid>
        
        <Grid item xs={8}>
          <TextField
            name="dailyCarbs"
            margin="normal"
            fullWidth
            value={ userGoals.dailyCarbs }
            onChange={handleChange} // Add onChange handler to update formValues
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary">
        Save Goals
      </Button>
    </Box>
  );
};

export default NutritionTargetsForm;
