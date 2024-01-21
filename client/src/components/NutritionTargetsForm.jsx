import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const NutritionTargetsForm = () => {
  const [nutritionTargets, setNutritionTargets] = useState({
    calories: '',
    fat: '',
    carbs: '',
    protein: ''
  });

  const handleChange = (event) => {
    setNutritionTargets({
      ...nutritionTargets,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Replace URL with your API endpoint
      const response = await axios.post('http://your-api-endpoint/update-nutrition-targets', nutritionTargets);
      console.log(response.data);
    } catch (error) {
      console.error('Error updating nutrition targets:', error);
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        name="calories"
        label="Daily Calories Goal"
        value={nutritionTargets.calories}
        onChange={handleChange}
        margin="normal"
        fullWidth
      />
      <TextField
        name="fat"
        label="Daily Fat Goal (g)"
        value={nutritionTargets.fat}
        onChange={handleChange}
        margin="normal"
        fullWidth
      />
      <TextField
        name="carbs"
        label="Daily Carbs Goal (g)"
        value={nutritionTargets.carbs}
        onChange={handleChange}
        margin="normal"
        fullWidth
      />
      <TextField
        name="protein"
        label="Daily Protein Goal (g)"
        value={nutritionTargets.Goal}
        onChange={handleChange}
        margin="normal"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Update Goals
      </Button>
    </Box>
  );
};

export default NutritionTargetsForm;
