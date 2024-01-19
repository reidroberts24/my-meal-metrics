import React, { useEffect, useState } from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);
import { Typography, CircularProgress, Box } from '@mui/material';
import axios from 'axios';





// IMPORTANT: NOW THAT WE ARE USING COOKIES FOR AUTHENTICATION AND AUTHORIZATION, WE WILL MAKE SURE EACH REQUEST IS SENT WITH { withCredentials: true }. 
// THIS WILL SEND THE COOKIES WITH EACH REQUEST SO OUR MIDDLEWARE WILL VERIFY WHO IS LOGGED IN.




const PieChart = ({ dailyTarget }) => {
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
  return axios.get('http://localhost:8000/api/meals') // Update with your server's URL
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching meals:', error);
      return [];
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

export default PieChart;