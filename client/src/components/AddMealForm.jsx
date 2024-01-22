import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, InputLabel, Grid } from '@mui/material';

const AddMealForm = ({ onSubmit }) => {
  const [meal, setMeal] = useState({
    description: '',
    calories: '',
    fat: '',
    carbs: '',
    protein: ''
  });

  const handleChange = (e) => {
    setMeal({ ...meal, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(meal);
    setMeal({
      description: '',
      calories: '',
      fat: '',
      carbs: '',
      protein: ''
    });
  };


    return (
        <Box component="form" onSubmit={ handleSubmit }>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                    <InputLabel htmlFor="description">Description</InputLabel>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        name="description"
                        margin="normal"
                        fullWidth
                        value={ meal.description }
                        onChange={handleChange} // Add onChange handler to update formValues
                    />
                </Grid>

            <Grid item xs={4}>
                <InputLabel htmlFor="calories">Calories</InputLabel>
            </Grid>
            <Grid item xs={8}>
                <TextField
                    name="calories"
                    margin="normal"
                    fullWidth
                    value={ meal.calories }
                    onChange={handleChange} // Add onChange handler to update formValues
                />
            </Grid>

            <Grid item xs={4}>
                <InputLabel htmlFor="protein">Protein (g)</InputLabel>
            </Grid>
            <Grid item xs={8}>
                <TextField
                    name="protein"
                    margin="normal"
                    fullWidth
                    value={ meal.protein }
                    onChange={handleChange} // Add onChange handler to update formValues
                />
            </Grid>

            <Grid item xs={4}>
                <InputLabel htmlFor="fat">Fat (g)</InputLabel>
            </Grid>
            <Grid item xs={8}>
                <TextField
                    name="fat"
                    margin="normal"
                    fullWidth
                    value={ meal.fat }
                    onChange={handleChange} // Add onChange handler to update formValues
                />
            </Grid>

            <Grid item xs={4}>
                <InputLabel htmlFor="carbs">Carbs (g)</InputLabel>
            </Grid>
            <Grid item xs={8}>
                <TextField
                    name="carbs"
                    margin="normal"
                    fullWidth
                    value={ meal.carbs }
                    onChange={handleChange} // Add onChange handler to update formValues
                />
            </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
                    Add Meal
        </Button>
        </Box>
    );
};

export default AddMealForm;


