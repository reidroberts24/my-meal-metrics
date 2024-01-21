// NutritionTargetsForm.jsx

import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, InputLabel } from '@mui/material';

const NutritionTargetsForm = ({ onSubmit, onDelete, initialValues }) => {
  const [formValues, setFormValues] = useState(initialValues || {
    dailyCalories: undefined, 
    dailyProtein: undefined, 
    dailyFat: undefined, 
    dailyCarbs: undefined, 
  });

  useEffect(() => {
    setFormValues(initialValues || {
      dailyCalories: undefined,
      dailyProtein: undefined,
      dailyFat: undefined, 
      dailyCarbs: undefined,
    });
  }, [initialValues]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <Box component="form" onSubmit={ handleSubmit }>
      
      <InputLabel htmlFor="dailyCalories">Daily Calories Goal</InputLabel>
      <TextField
        name="dailyCalories"
        margin="normal"
        fullWidth
        value={ formValues.dailyCalories }
        onChange={handleChange} // Add onChange handler to update formValues
      />
      
      <InputLabel htmlFor="dailyProtein">Daily Protein Goal</InputLabel>
      <TextField
        name="dailyProtein"
        margin="normal"
        fullWidth
        value={ formValues.dailyProtein }
        onChange={handleChange} // Add onChange handler to update formValues
      />
      
      <InputLabel htmlFor="dailyFat">Daily Fat Goal</InputLabel>
      <TextField
        name="dailyFat"
        margin="normal"
        fullWidth
        value={ formValues.dailyFat }
        onChange={handleChange} // Add onChange handler to update formValues
      />
  
      <InputLabel htmlFor="dailyCarbs">Daily Carbs Goal</InputLabel>
      <TextField
        name="dailyCarbs"
        margin="normal"
        fullWidth
        value={ formValues.dailyCarbs }
        onChange={handleChange} // Add onChange handler to update formValues
      />
      <Button type="submit" variant="contained" color="primary">
        Save Goals
      </Button>
    </Box>
  );
};

export default NutritionTargetsForm;
