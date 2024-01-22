import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NutritionTargetsForm from '../components/NutritionTargetsForm';
import AddMealForm from '../components/AddMealForm';
import DailyMealStats from '../components/DailyMealStats';
import WeeklyMealStats from '../components/WeeklyMealStats';
import { Grid, Typography } from '@mui/material';


const Dashboard = () => {
  const [userGoals, setUserGoals] = useState({});
  const [userMeals, setUserMeals] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
 
  useEffect(() => {
    const getTodayStart = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today;
    };

    const filterMealsForToday = (meals) => {
      const todayStart = getTodayStart();
      return meals.filter(meal => {
        const mealDate = new Date(meal.created_at);
        mealDate.setHours(0, 0, 0, 0);
        return mealDate.getTime() === todayStart.getTime();
      });
    };

    // get user's goals on page load
    axios.get('http://localhost:8000/api/goals/', { withCredentials: true })
        .then((res) => {
          if (res.data && res.data.length > 0) {
            setUserGoals(res.data[0]);
          }
          setIsLoaded(true);
        })
        .catch((err) => {
          console.log('Error fetching goals:', err);
          setIsLoaded(true);
        });

    axios.get('http://localhost:8000/api/meals/', { withCredentials: true })
        .then((res) => {
          const meals = res.data || []
          setUserMeals(meals);
        })
        .catch((err) => {
          console.log('Error fetching meals:', err);
        });
  }, []);

  const handleGoalsSubmit = (goalsData) => {
    // Check if userGoals has an _id to determine if goals exist
    if (userGoals._id) {
      // Update existing goals
      axios.patch(`http://localhost:8000/api/goals/${userGoals._id}`, goalsData, { withCredentials: true })
        .then((res) => {
          console.log('Goal update successful', res.data);
        })
        .catch((err) => {
          console.error('Error updating goals:', err);
        });
    } else {
      // Create new goals
      axios.post('http://localhost:8000/api/goals/', goalsData, { withCredentials: true })
        .then((res) => {
          console.log('Goal creation successful', res.data);
          // Update userGoals state with the newly created goals
          setUserGoals(res.data);
        })
        .catch((err) => {
          console.error('Error creating goals:', err);
        });
    }
  };

  const handleDeleteGoals = () => {
    if (userGoals._id) {
      // Delete existing goals
      axios.delete(`http://localhost:8000/api/goals/${userGoals._id}`, { withCredentials: true })
        .then((res) => {
          console.log('Goals deleted successfully', res.data);
          setUserGoals({}); // Clear userGoals state after deletion
        })
        .catch((err) => {
          console.error('Error deleting goals:', err);
        });
    }
  };

  const handleAddMeal = (mealData) => {
    axios.post('http://localhost:8000/api/meals/', mealData, { withCredentials: true })
      .then(response => {
        const addedMeal = response.data;
        setUserMeals(prevMeals => [...prevMeals, addedMeal]);
  
        // Optionally, you might want to clear a form or provide a success message
      })
      .catch(error => {
        // Handle errors here, such as displaying a notification to the user
        console.log('Error adding meal:', error);
      });
  };
  console.log("userGoals: ", userGoals)

  return (
    <>
    <Grid item xs={12}>
      <DailyMealStats userMeals={userMeals} userGoals={userGoals} />
    </Grid>
    <Grid item xs={12}>
      <WeeklyMealStats userMeals={userMeals} userGoals={userGoals} />
    </Grid>
    <Grid container spacing={8}>
      <Grid item xs={12} md={6}>
        <Typography variant="body1">
          Add/Update Daily Goals Below:
        </Typography>
        <NutritionTargetsForm
          onSubmit={ handleGoalsSubmit }
          initialValues={userGoals} // Pass userGoals as initial values for the form
        />
        {userGoals._id && (
          <button onClick={ handleDeleteGoals} >Delete Goals</button>
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="body1">
          Add New Meal Below:
        </Typography>
        <AddMealForm onSubmit={ handleAddMeal } />
      </Grid>
    </Grid>
    </>
  );
};

export default Dashboard;
