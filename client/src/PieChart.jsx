import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Typography, CircularProgress, Box } from '@material-ui/core';
import axios from 'axios';

const CaloriePieChart = ({ dailyTarget }) => {
  const [calorieData, setCalorieData] = useState(null);

  useEffect(() => {
    fetchMeals()
      .then(data => {
        const totalCalories = data.reduce((acc, meal) => acc + meal.calories, 0);
        setCalorieData({
          datasets: [{
            data: [totalCalories, dailyTarget - totalCalories],
            backgroundColor: ['#FF6384', '#36A2EB']
          }],
          labels: ['Calories Consumed', 'Remaining Calories']
        });
      })
      .catch(error => console.error('Error fetching meals:', error));
  }, []);

  const fetchMeals = () => {
    return axios.get('/api/meals') // Replace '/api/meals' with your actual API endpoint
      .then(response => response.data) // Assuming the response contains the array of meals
      .catch(error => {
        console.error('Error fetching meals:', error);
        return []; // Return an empty array in case of error
      });
  };

  return (
    <Box>
      <Typography variant="h6" align="center">Daily Calorie Intake</Typography>
      {calorieData ? (
        <Pie data={calorieData} />
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default CaloriePieChart;